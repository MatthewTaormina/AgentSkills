"""
Ory Suite Complete Python SDK Examples
Demonstrates:
1. Session verification middleware / dependency using FrontendApi (Ory Kratos)
2. Administrative User CRUD operations using IdentityApi (Ory Kratos)
3. OAuth 2.0 Login & Consent route handling using OAuth2Api (Ory Hydra)
4. Fine-grained Zanzibar permission checking using PermissionApi (Ory Keto)
"""

import os
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, Header, Cookie, Request
from fastapi.responses import RedirectResponse
import ory_client
from ory_client.api import frontend_api, identity_api, o_auth2_api, permission_api
from ory_client.models.create_identity_body import CreateIdentityBody
from ory_client.models.accept_o_auth2_login_request import AcceptOAuth2LoginRequest
from ory_client.models.accept_o_auth2_consent_request import AcceptOAuth2ConsentRequest
from ory_client.models.accept_o_auth2_consent_request_session import AcceptOAuth2ConsentRequestSession

# ============================================================================
# 1. SDK Configuration & Client Setup
# ============================================================================

ORY_SDK_URL = os.environ.get("ORY_SDK_URL", "http://localhost:4434")
ORY_API_KEY = os.environ.get("ORY_API_KEY", "")

# Admin / privileged configuration
admin_configuration = ory_client.Configuration(
    host=ORY_SDK_URL,
    access_token=ORY_API_KEY
)

# Frontend configuration (for session checks)
frontend_configuration = ory_client.Configuration(
    host=os.environ.get("ORY_FRONTEND_URL", "http://localhost:4433")
)

app = FastAPI(title="Ory Integration Service")

# ============================================================================
# 2. Ory Kratos: Session Authentication Dependency
# ============================================================================

async def get_current_session(
    request: Request,
    x_session_token: Optional[str] = Header(None, alias="X-Session-Token")
):
    """
    FastAPI dependency that extracts and validates the Ory Kratos session
    from either the incoming cookie or the X-Session-Token header.
    """
    cookie_header = request.headers.get("cookie")
    
    with ory_client.ApiClient(frontend_configuration) as api_client:
        api = frontend_api.FrontendApi(api_client)
        try:
            session = api.to_session(
                cookie=cookie_header,
                x_session_token=x_session_token
            )
            return session
        except ory_client.ApiException as exc:
            if exc.status == 401:
                raise HTTPException(status_code=401, detail="Invalid or expired session")
            raise HTTPException(status_code=500, detail=f"Ory Kratos error: {exc.body}")

# ============================================================================
# 3. Ory Kratos: Admin User Provisioning (IdentityApi)
# ============================================================================

def create_admin_user(email: str, first_name: str, last_name: str, role: str = "member"):
    """
    Creates an identity directly via Kratos Admin API.
    """
    with ory_client.ApiClient(admin_configuration) as api_client:
        api = identity_api.IdentityApi(api_client)
        body = CreateIdentityBody(
            schema_id="default",
            traits={
                "email": email,
                "name": {"first": first_name, "last": last_name},
                "role": role,
            }
        )
        identity = api.create_identity(create_identity_body=body)
        return identity

# ============================================================================
# 4. Ory Hydra: OAuth 2.0 Login & Consent Handlers (OAuth2Api)
# ============================================================================

@app.get("/oauth2/login")
async def oauth2_login(
    login_challenge: str,
    session=Depends(get_current_session)
):
    """
    Handles Hydra's redirect to the Login endpoint.
    If the user has an active Kratos session, accepts login automatically.
    """
    with ory_client.ApiClient(admin_configuration) as api_client:
        hydra_api = o_auth2_api.OAuth2Api(api_client)
        
        # 1. Fetch the login request details
        login_request = hydra_api.get_o_auth2_login_request(login_challenge=login_challenge)
        
        # 2. If Hydra already remembers this user, accept immediately
        if login_request.skip:
            accept_res = hydra_api.accept_o_auth2_login_request(
                login_challenge=login_challenge,
                accept_o_auth2_login_request=AcceptOAuth2LoginRequest(subject=login_request.subject)
            )
            return RedirectResponse(accept_res.redirect_to)
        
        # 3. Link the authenticated Kratos identity ID as the OAuth2 Subject
        user_id = session.identity.id
        accept_res = hydra_api.accept_o_auth2_login_request(
            login_challenge=login_challenge,
            accept_o_auth2_login_request=AcceptOAuth2LoginRequest(
                subject=user_id,
                remember=True,
                remember_for=3600 * 24 * 7
            )
        )
        return RedirectResponse(accept_res.redirect_to)


@app.get("/oauth2/consent")
async def oauth2_consent(consent_challenge: str):
    """
    Handles Hydra's redirect to the Consent endpoint.
    Grants requested scopes and populates ID token claims.
    """
    with ory_client.ApiClient(admin_configuration) as api_client:
        hydra_api = o_auth2_api.OAuth2Api(api_client)
        
        consent_req = hydra_api.get_o_auth2_consent_request(consent_challenge=consent_challenge)
        
        # Accept consent and inject user claims
        accept_body = AcceptOAuth2ConsentRequest(
            grant_scope=consent_req.requested_scope,
            grant_access_token_audience=consent_req.requested_access_token_audience,
            remember=True,
            remember_for=3600 * 24 * 30,
            session=AcceptOAuth2ConsentRequestSession(
                id_token={"org": "enterprise-customer"},
                access_token={"role": "editor"}
            )
        )
        
        accept_res = hydra_api.accept_o_auth2_consent_request(
            consent_challenge=consent_challenge,
            accept_o_auth2_consent_request=accept_body
        )
        return RedirectResponse(accept_res.redirect_to)

# ============================================================================
# 5. Ory Keto: Zanzibar Permission Verification (PermissionApi)
# ============================================================================

def check_user_permission(
    user_id: str,
    action: str,
    namespace: str,
    object_id: str
) -> bool:
    """
    Evaluates fine-grained Zanzibar relationship check with Ory Keto.
    """
    with ory_client.ApiClient(admin_configuration) as api_client:
        api = permission_api.PermissionApi(api_client)
        try:
            result = api.check_permission(
                namespace=namespace,
                object=object_id,
                relation=action,
                subject_id=user_id
            )
            return bool(result.allowed)
        except ory_client.ApiException as exc:
            if exc.status == 404:
                return False
            raise
