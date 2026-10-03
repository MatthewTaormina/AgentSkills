# Ory Hydra Reference: OAuth 2.0 & OpenID Connect Authorization Server

Ory Hydra is an OpenID Foundation certified OAuth 2.0 and OpenID Connect (OIDC) engine. It delegates user authentication and user consent to custom applications while managing the complete OAuth 2.0 / OIDC protocol state machine, token generation (JWT or Opaque), cryptographic signing keys (JWKS), token revocation, and introspection.

---

## 1. Core Architecture & Philosophy

### 1.1 Decoupled Authorization Server
Unlike traditional IAM monoliths (e.g. Keycloak, Auth0) that combine user database, login screens, and OAuth2 engine into one process:
*   **Ory Hydra does not store user passwords or credentials.**
*   Hydra does not render HTML login or consent forms.
*   Instead, Hydra exposes a bridge called the **Login & Consent Flow**. When an OAuth 2.0 flow is initiated, Hydra redirects the user to your own Login and Consent endpoints (which frequently leverage Ory Kratos for the actual identity session).

### 1.2 OAuth 2.0 Grants Supported
1.  **Authorization Code Flow with PKCE (Proof Key for Code Exchange)**: Standard for web apps, SPAs, and mobile applications.
2.  **Client Credentials Flow**: Standard for server-to-server and daemon machine-to-machine (M2M) communication.
3.  **Refresh Token Flow**: Allows clients to obtain new access tokens without prompting the user.
4.  **Device Authorization Grant (RFC 8628)**: For input-constrained devices (smart TVs, CLI tools, IoT).

---

## 2. The Login & Consent Workflow

The Login & Consent workflow is the core mechanism enabling Hydra to work with any identity provider.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant ClientApp as Third-Party / Client App
    participant Hydra as Ory Hydra (Public & Admin)
    participant LoginConsent as Login & Consent Provider (Your Backend)
    participant Kratos as Ory Kratos / Identity Store

    ClientApp->>Hydra: GET /oauth2/auth?client_id=...&response_type=code&scope=openid profile
    Hydra->>Hydra: Create Login Challenge
    Hydra-->>User: 302 Redirect to /login?login_challenge=xyz
    User->>LoginConsent: GET /login?login_challenge=xyz
    LoginConsent->>Hydra: GET /admin/oauth2/auth/requests/login?login_challenge=xyz
    Hydra-->>LoginConsent: Login request details (skip, subject, client info)
    
    alt User Not Authenticated
        LoginConsent->>User: Render Login Screen (or authenticate via Kratos session)
        User->>LoginConsent: Submit credentials / authenticate
    end
    
    LoginConsent->>Hydra: PUT /admin/oauth2/auth/requests/login/accept?login_challenge=xyz { subject: "user_123" }
    Hydra-->>LoginConsent: 200 OK + { redirectTo: "/oauth2/auth?client_id=...&login_verifier=abc" }
    LoginConsent-->>User: 302 Redirect to returned redirectTo URL
    User->>Hydra: GET /oauth2/auth?...&login_verifier=abc
    
    Hydra->>Hydra: Create Consent Challenge
    Hydra-->>User: 302 Redirect to /consent?consent_challenge=uvw
    User->>LoginConsent: GET /consent?consent_challenge=uvw
    LoginConsent->>Hydra: GET /admin/oauth2/auth/requests/consent?consent_challenge=uvw
    Hydra-->>LoginConsent: Consent request details (requested_scope, client)
    
    LoginConsent->>Hydra: PUT /admin/oauth2/auth/requests/consent/accept?consent_challenge=uvw { grant_scope: ["openid", "profile"], session: { id_token: {...} } }
    Hydra-->>LoginConsent: 200 OK + { redirectTo: "/callback?code=AUTH_CODE_123" }
    LoginConsent-->>User: 302 Redirect to returned redirectTo URL
    User->>ClientApp: GET /callback?code=AUTH_CODE_123
    ClientApp->>Hydra: POST /oauth2/token (code + code_verifier + client credentials)
    Hydra-->>ClientApp: 200 OK + { access_token, id_token, refresh_token }
```

### 2.1 Login Provider Contract
*   `GET /admin/oauth2/auth/requests/login`: Fetch challenge metadata. If `skip: true`, user already has a valid Hydra session—accept immediately without prompting.
*   `PUT /admin/oauth2/auth/requests/login/accept`: Accept login by providing `subject` (the user's identity ID), `remember` (boolean), and `remember_for` (seconds).
*   `PUT /admin/oauth2/auth/requests/login/reject`: Reject login if authentication failed or user canceled.

### 2.2 Consent Provider Contract
*   `GET /admin/oauth2/auth/requests/consent`: Inspect requested scopes and audiences. If `skip: true`, client was previously granted consent—accept immediately.
*   `PUT /admin/oauth2/auth/requests/consent/accept`: Approve scopes and inject custom claims into `id_token` or `access_token` session.
*   `PUT /admin/oauth2/auth/requests/consent/reject`: Deny consent.

---

## 3. Token Strategy & Cryptography

### 3.1 Access Token Strategies
*   **Opaque Tokens**: Cryptographically random strings (e.g. `ory_at_...`). Validated exclusively via Token Introspection (`/admin/oauth2/introspect`). Provides instant revocability.
*   **JWT Tokens**: Cryptographically signed JSON Web Tokens. Validated statelessly by resource servers using Hydra's public JSON Web Key Set (`/.well-known/jwks.json`).

### 3.2 OpenID Connect ID Tokens
*   Always signed JWTs conforming to the OIDC Core specification.
*   Keys are rotated automatically or manually via the Hydra Admin JWKS API.

---

## 4. Configuration Reference (`hydra.yml`)

```yaml
version: v2.2.0

dsn: postgres://hydra:secret@postgres:5432/hydra?sslmode=disable

serve:
  public:
    port: 4444
    cors:
      enabled: true
      allowed_origins:
        - http://localhost:3000
      allowed_methods:
        - POST
        - GET
        - OPTIONS
  admin:
    port: 4445

urls:
  self:
    issuer: http://localhost:4444/
    public: http://localhost:4444/
    admin: http://hydra:4445/
  login: http://localhost:3000/oauth2/login
  consent: http://localhost:3000/oauth2/consent
  logout: http://localhost:3000/oauth2/logout
  error: http://localhost:3000/oauth2/error

secrets:
  system:
    - THIS_IS_A_VERY_SECRET_KEY_CHANGE_IN_PRODUCTION_32_BYTES_MIN

strategies:
  access_token: jwt # or 'opaque'
  scope: wildcard

oidc:
  subject_identifiers:
    supported_types:
      - pairwise
      - public
    pairwise:
      salt: SOME_SALT_FOR_PAIRWISE_IDENTIFIERS_RANDOM_VALUE
```

---

## 5. Client Management & CLI Reference (`hydra`)

### 5.1 Creating OAuth2 Clients
```bash
# Register an SPA / Mobile Client (PKCE, public, authorization_code)
hydra create client \
  --endpoint http://localhost:4445 \
  --id my-spa-client \
  --grant-type authorization_code,refresh_token \
  --response-type code \
  --scope openid,offline_access,profile,email \
  --redirect-uri http://localhost:3000/callback \
  --token-endpoint-auth-method none

# Register a Machine-to-Machine Client (Client Credentials)
hydra create client \
  --endpoint http://localhost:4445 \
  --id m2m-service-client \
  --secret super-secret-m2m-token \
  --grant-type client_credentials \
  --response-type token \
  --scope internal:sync,read:reports \
  --token-endpoint-auth-method client_secret_post
```

### 5.2 Database Migrations & Server Execution
```bash
# Run SQL schema migrations
hydra migrate sql -e --yes

# Start Hydra server
hydra serve all -c /etc/config/hydra/hydra.yml --dev

# Introspect an access token
hydra introspect token <access-token> --endpoint http://localhost:4445

# Revoke an access or refresh token
hydra revoke token <token> --endpoint http://localhost:4444 --client-id my-spa-client
```

---

## 6. Token Introspection Protocol (RFC 7662)

Internal microservices or API gateways can validate incoming tokens via the Admin Introspection endpoint:

```http
POST /admin/oauth2/introspect HTTP/1.1
Host: hydra:4445
Content-Type: application/x-www-form-urlencoded

token=ory_at_xyz123&scope=read:reports
```

Response:
```json
{
  "active": true,
  "scope": "openid profile read:reports",
  "client_id": "my-spa-client",
  "sub": "a988d672-04fb-4b51-93bf-4eaee82337d1",
  "exp": 1791000000,
  "iat": 1790996400,
  "iss": "http://localhost:4444/",
  "token_type": "Bearer",
  "ext": {
    "role": "editor",
    "organization_id": "org_4812"
  }
}
```
