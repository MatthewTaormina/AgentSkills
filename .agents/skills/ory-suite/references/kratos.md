# Ory Kratos Reference: Identity, Authentication & User Management

Ory Kratos is an API-first, cloud-native Identity Management and User Authentication system. It implements self-service flows (registration, login, profile management, MFA/2FA, password recovery, and email/phone verification) based on headless UI concepts, Zero Trust architecture, and strict separation of UI presentation from identity logic.

---

## 1. Core Architecture & Concepts

### 1.1 Headless Identity Architecture
Unlike legacy IAM solutions that inject rigid HTML forms, Ory Kratos separates identity orchestration from the user interface:
1. **Flow Initialization**: The client application (browser, SPA, mobile app) calls Kratos to initiate a flow (e.g., `/self-service/login/browser`).
2. **UI State Representation**: Kratos generates a unique flow ID and returns a JSON payload containing dynamic UI nodes (form fields, CSRF tokens, labels, validation messages, and submit actions).
3. **User Interaction**: Your custom frontend (React, Next.js, Vue, iOS, Android, or `@ory/elements`) renders these nodes into native UI controls.
4. **Submission & Verification**: The user submits input back to Kratos (`/self-service/login?flow=<id>`).
5. **Session Issuance**: Upon successful verification, Kratos issues an HTTP-only session cookie (browser flows) or a session token (native/API flows).

### 1.2 Two Flow Types: Browser vs. API Flows
*   **Browser Flows (`/self-service/.../browser`)**:
    *   Designed for web applications running inside a browser.
    *   Protected against Cross-Site Request Forgery (CSRF) via anti-CSRF cookies and tokens.
    *   Result in `Set-Cookie: ory_kratos_session=...` headers.
    *   Requires domain alignment or Ory Tunnel for cross-domain localhost testing.
*   **API Flows (`/self-service/.../api`)**:
    *   Designed for native mobile apps (iOS, Android), CLI tools, or server-to-server daemon clients.
    *   Does not require anti-CSRF tokens.
    *   Returns a bearer session token (`session_token`) in the JSON response body.
    *   Clients authenticate subsequent calls using the `X-Session-Token: <token>` HTTP header.

---

## 2. Identity Schemas & Traits

Kratos models user data using customizable JSON Schemas. User-defined attributes are stored inside `traits`.

### 2.1 Standard Identity Schema (`identity.default.schema.json`)
```json
{
  "$id": "https://schemas.ory.sh/presets/kratos/identity.basic.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Default User Schema",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "title": "Email Address",
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              },
              "webauthn": {
                "identifier": true
              },
              "totp": {
                "account_name": true
              },
              "code": {
                "identifier": true,
                "via": "email"
              }
            },
            "verification": {
              "via": "email"
            },
            "recovery": {
              "via": "email"
            }
          }
        },
        "name": {
          "type": "object",
          "properties": {
            "first": {
              "type": "string",
              "title": "First Name"
            },
            "last": {
              "type": "string",
              "title": "Last Name"
            }
          }
        }
      },
      "required": ["email"],
      "additionalProperties": false
    }
  }
}
```

### 2.2 Extension Keywords (`ory.sh/kratos`)
*   `credentials.password.identifier: true`: Marks the property as the unique username/identifier for password authentication.
*   `credentials.webauthn.identifier: true`: Marks the property as an identifier for WebAuthn/Passkeys.
*   `verification.via: email`: Specifies that verification tokens/codes are sent to this address.
*   `recovery.via: email`: Specifies that account recovery links/codes are delivered to this address.

---

## 3. Self-Service Flows Lifecycle

### 3.1 Login Flow
```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Frontend as Custom UI / SPA
    participant Kratos as Ory Kratos (Public)
    participant DB as SQL Database

    User->>Frontend: Navigate to /login
    Frontend->>Kratos: GET /self-service/login/browser
    Kratos-->>Frontend: 200 OK + Flow ID & UI Nodes (inputs, CSRF token)
    Frontend->>User: Render Dynamic Form
    User->>Frontend: Submit credentials (Email + Password)
    Frontend->>Kratos: POST /self-service/login?flow=<flow_id>
    Kratos->>DB: Verify credentials against argon2id hash
    Kratos-->>Frontend: 200 OK + Set-Cookie: ory_kratos_session=...
    Frontend->>User: Redirect to Authenticated Dashboard
```

### 3.2 Registration Flow
*   `GET /self-service/registration/browser` initializes flow.
*   `POST /self-service/registration?flow=<flow_id>` creates new identity.
*   Supports post-registration hooks:
    *   `session`: Automatically sign in user immediately after registration.
    *   `verification`: Trigger email verification code immediately.
    *   `web_hook`: Emit an HTTP webhook payload to backend microservices (e.g. provisioning a Stripe customer or Keto relation tuples).

### 3.3 Recovery & Verification Flows
*   **Verification**: Proves ownership of email address or phone number via 6-digit one-time code (OTP) or magic link.
*   **Recovery**: Regains account access when passwords or passkeys are lost via OTP or secure recovery link.

### 3.4 Settings Flow (Profile & Security Management)
Handles user credential updates:
*   Updating profile traits (name, preferences).
*   Changing password (with optional re-authentication / sudo mode).
*   Enrolling Multi-Factor Authentication:
    *   TOTP (Authenticator apps: Google Authenticator, 1Password).
    *   WebAuthn / Passkeys (Hardware security keys, Touch ID, Windows Hello).
    *   Lookup Secrets (Backup recovery codes).
*   Linking and unlinking Social Sign-in (OIDC / OAuth2 providers).

---

## 4. Authentication Methods & MFA

Kratos categorizes authentication into Assurance Levels:
*   **AAL1 (Assurance Level 1)**: First-factor authentication (e.g., Password, Social OIDC, Passkey first-factor).
*   **AAL2 (Assurance Level 2)**: Second-factor authentication (e.g., TOTP, WebAuthn 2FA, Backup code).

### 4.1 Supported Authentication Methods
1.  **Password**: Hashed using `argon2id` (recommended) or `bcrypt`.
2.  **OIDC / Social Login**: Sign in with Google, GitHub, Apple, Microsoft, Gitlab, Discord, Slack, generic OIDC/OAuth2.
3.  **Code (Passwordless)**: One-time login code sent via Email or SMS.
4.  **WebAuthn / Passkeys**: FIDO2 biometric authentication without passwords.
5.  **TOTP**: RFC 6238 time-based one-time passwords.
6.  **Lookup Secrets**: Pre-generated single-use emergency backup recovery codes.

---

## 5. Session Verification & Middleware Integration

### 5.1 Whoami Endpoint
To verify an active session in any backend service or API gateway:
*   **Browser**: Send incoming request cookies to `GET http://kratos:4433/sessions/whoami`.
*   **API / Native**: Pass header `X-Session-Token: <token>` to `GET http://kratos:4433/sessions/whoami`.

Response payload:
```json
{
  "id": "e22be5e0-32df-4235-961d-847e0964177d",
  "active": true,
  "expires_at": "2026-10-10T12:00:00Z",
  "authenticated_at": "2026-10-03T10:00:00Z",
  "authenticator_assurance_level": "aal1",
  "authentication_methods": [
    {
      "method": "password",
      "completed_at": "2026-10-03T10:00:00Z"
    }
  ],
  "identity": {
    "id": "a988d672-04fb-4b51-93bf-4eaee82337d1",
    "schema_id": "default",
    "schema_url": "http://kratos:4433/schemas/default",
    "state": "active",
    "traits": {
      "email": "user@example.com",
      "name": { "first": "Jane", "last": "Doe" }
    }
  }
}
```

---

## 6. Kratos Configuration Reference (`kratos.yml`)

```yaml
version: v1.3.0

dsn: postgres://kratos:secret@postgres:5432/kratos?sslmode=disable

serve:
  public:
    base_url: http://127.0.0.1:4433/
    cors:
      enabled: true
      allowed_origins:
        - http://localhost:3000
      allowed_methods:
        - POST
        - GET
        - PUT
        - PATCH
        - DELETE
      allowed_headers:
        - Authorization
        - Cookie
        - Content-Type
      allow_credentials: true
  admin:
    base_url: http://kratos:4434/

selfservice:
  default_browser_return_url: http://localhost:3000/dashboard
  allowed_return_urls:
    - http://localhost:3000

  methods:
    password:
      enabled: true
    totp:
      enabled: true
      config:
        issuer: MyCompany
    webauthn:
      enabled: true
      config:
        passwordless: true
        rp:
          display_name: My Company
          id: localhost
          origins:
            - http://localhost:3000
    code:
      enabled: true
    link:
      enabled: false

  flows:
    error:
      ui_url: http://localhost:3000/error
    settings:
      ui_url: http://localhost:3000/settings
      privileged_session_max_age: 15m
    recovery:
      enabled: true
      ui_url: http://localhost:3000/recovery
      use: code
    verification:
      enabled: true
      ui_url: http://localhost:3000/verification
      use: code
      after:
        default_browser_return_url: http://localhost:3000/
    logout:
      after:
        default_browser_return_url: http://localhost:3000/login
    login:
      ui_url: http://localhost:3000/login
      lifespan: 10m
    registration:
      ui_url: http://localhost:3000/registration
      lifespan: 10m
      after:
        password:
          hooks:
            - hook: session
            - hook: web_hook
              config:
                url: http://backend:8080/webhooks/kratos/user-created
                method: POST
                body: base64://...

identity:
  default_schema_id: default
  schemas:
    - id: default
      url: file:///etc/config/kratos/identity.default.schema.json

courier:
  smtp:
    connection_uri: smtps://test:secret@mailslurper:1025/?skip_ssl_verify=true
    from_name: Ory Kratos Support
    from_address: no-reply@example.com
```

---

## 7. CLI Reference (`kratos`)

```bash
# Apply SQL database migrations
kratos migrate sql -e --yes

# Check migration status
kratos migrate sql status -e

# Run the Kratos public and admin server
kratos serve -c /etc/config/kratos/kratos.yml --dev

# Manage identities via CLI
kratos identities list --endpoint http://127.0.0.1:4434
kratos identities get <identity-id> --endpoint http://127.0.0.1:4434
kratos identities import -f identities.json --endpoint http://127.0.0.1:4434
kratos identities delete <identity-id> --endpoint http://127.0.0.1:4434

# Validate configuration file
kratos validate config /etc/config/kratos/kratos.yml

# Validate JSON schema
kratos validate identity-schema /etc/config/kratos/identity.default.schema.json
```
