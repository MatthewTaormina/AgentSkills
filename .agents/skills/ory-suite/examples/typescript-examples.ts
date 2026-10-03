/**
 * Ory Suite Complete TypeScript / Node.js SDK Examples
 * Demonstrates:
 * 1. FrontendApi: Browser/API flows & Session validation (Ory Kratos)
 * 2. IdentityApi: Administrative User CRUD & Recovery (Ory Kratos)
 * 3. OAuth2Api: OAuth2 Client management & Custom Login/Consent Provider (Ory Hydra)
 * 4. PermissionApi & RelationshipApi: Google Zanzibar ReBAC & Permissions (Ory Keto)
 * 5. Keto OPL Schema Definition (@ory/keto-namespace-types)
 */

import {
  Configuration,
  FrontendApi,
  IdentityApi,
  OAuth2Api,
  PermissionApi,
  RelationshipApi,
  Session,
  Identity,
  OAuth2Client,
  AcceptOAuth2ConsentRequestSession,
} from '@ory/client';
import { Namespace, Context } from '@ory/keto-namespace-types';

// ============================================================================
// 1. Client Configurations
// ============================================================================

// Frontend client (Runs in Browser or Edge Server with cookies enabled)
export const frontendClient = new FrontendApi(
  new Configuration({
    basePath: process.env.NEXT_PUBLIC_ORY_SDK_URL || 'http://localhost:4000',
    baseOptions: {
      withCredentials: true, // Critical for receiving & sending HTTP-only cookies
    },
  })
);

// Privileged Backend client (Runs in Node.js backend using Project API Key)
const adminConfig = new Configuration({
  basePath: process.env.ORY_SDK_URL || 'http://localhost:4434',
  accessToken: process.env.ORY_API_KEY, // e.g. "ory_pat_..."
});

export const identityAdmin = new IdentityApi(adminConfig);
export const oauth2Admin = new OAuth2Api(adminConfig);
export const permissionClient = new PermissionApi(adminConfig);
export const relationshipClient = new RelationshipApi(adminConfig);

// ============================================================================
// 2. Ory Kratos: Frontend & Session Verification
// ============================================================================

/**
 * Validates the caller's session from an incoming HTTP request cookie or token.
 */
export async function verifyUserSession(
  cookieHeader?: string,
  sessionTokenHeader?: string
): Promise<Session | null> {
  try {
    const { data: session } = await frontendClient.toSession({
      cookie: cookieHeader,
      xSessionToken: sessionTokenHeader,
    });
    return session;
  } catch (error) {
    // 401 Unauthorized means no active session
    return null;
  }
}

/**
 * Programmatic API Registration Flow (e.g. for Mobile Apps or CLI tools)
 */
export async function registerUserViaApi(email: string, password: string): Promise<Session> {
  // Step 1: Initialize API registration flow
  const { data: flow } = await frontendClient.createNativeRegistrationFlow();

  // Step 2: Submit credentials to Kratos
  const { data: result } = await frontendClient.updateRegistrationFlow({
    flow: flow.id,
    updateRegistrationFlowBody: {
      method: 'password',
      password,
      traits: {
        email,
        name: { first: 'Test', last: 'User' },
      },
    },
  });

  if (!result.session) {
    throw new Error('Registration completed but session was not issued.');
  }

  return result.session;
}

// ============================================================================
// 3. Ory Kratos: Admin User Management (IdentityApi)
// ============================================================================

/**
 * Creates an identity as an administrator (skipping registration forms).
 */
export async function adminCreateUser(email: string, initialRole: string): Promise<Identity> {
  const { data: identity } = await identityAdmin.createIdentity({
    createIdentityBody: {
      schema_id: 'default',
      traits: {
        email,
        role: initialRole,
        metadata_public: {
          tier: 'enterprise',
        },
      },
      verifiable_addresses: [
        {
          value: email,
          via: 'email',
          status: 'completed', // Pre-verify email
        },
      ],
    },
  });

  return identity;
}

/**
 * Generates an administrative password recovery link for a user.
 */
export async function adminCreateRecoveryLink(identityId: string): Promise<string> {
  const { data } = await identityAdmin.createRecoveryCodeForIdentity({
    createRecoveryCodeForIdentityBody: {
      identity_id: identityId,
      expires_in: '1h',
    },
  });

  return data.recovery_link;
}

// ============================================================================
// 4. Ory Hydra: OAuth 2.0 & Consent Provider Handlers
// ============================================================================

/**
 * Express / Next.js Route Handler: Login Provider (Handles Hydra Login Challenge)
 */
export async function handleHydraLogin(
  loginChallenge: string,
  currentUserSession: Session | null
) {
  // 1. Fetch challenge details from Hydra Admin
  const { data: loginReq } = await oauth2Admin.getOAuth2LoginRequest({
    loginChallenge,
  });

  // 2. If user already has a valid session with Hydra, accept immediately
  if (loginReq.skip) {
    const { data: acceptRes } = await oauth2Admin.acceptOAuth2LoginRequest({
      loginChallenge,
      acceptOAuth2LoginRequest: {
        subject: loginReq.subject,
      },
    });
    return { redirectTo: acceptRes.redirect_to };
  }

  // 3. If user is authenticated in Kratos, link identity to Hydra
  if (currentUserSession) {
    const { data: acceptRes } = await oauth2Admin.acceptOAuth2LoginRequest({
      loginChallenge,
      acceptOAuth2LoginRequest: {
        subject: currentUserSession.identity?.id || '',
        remember: true,
        remember_for: 3600 * 24 * 30, // 30 days
      },
    });
    return { redirectTo: acceptRes.redirect_to };
  }

  // 4. Otherwise, user must be prompted to authenticate
  return { promptLogin: true };
}

/**
 * Express / Next.js Route Handler: Consent Provider (Handles Hydra Consent Challenge)
 */
export async function handleHydraConsent(
  consentChallenge: string,
  userIdentity: Identity
) {
  // 1. Fetch consent request details
  const { data: consentReq } = await oauth2Admin.getOAuth2ConsentRequest({
    consentChallenge,
  });

  // 2. If client previously received consent, skip prompt
  if (consentReq.skip) {
    const { data: acceptRes } = await oauth2Admin.acceptOAuth2ConsentRequest({
      consentChallenge,
      acceptOAuth2ConsentRequest: {
        grant_scope: consentReq.requested_scope,
        grant_access_token_audience: consentReq.requested_access_token_audience,
      },
    });
    return { redirectTo: acceptRes.redirect_to };
  }

  // 3. Inject claims into ID token and Access token sessions
  const traits = userIdentity.traits as { email?: string; role?: string };
  const sessionData: AcceptOAuth2ConsentRequestSession = {
    id_token: {
      email: traits.email,
      role: traits.role,
    },
    access_token: {
      user_id: userIdentity.id,
      tenant: 'acme-corp',
    },
  };

  const { data: acceptRes } = await oauth2Admin.acceptOAuth2ConsentRequest({
    consentChallenge,
    acceptOAuth2ConsentRequest: {
      grant_scope: consentReq.requested_scope,
      grant_access_token_audience: consentReq.requested_access_token_audience,
      remember: true,
      remember_for: 3600 * 24 * 7,
      session: sessionData,
    },
  });

  return { redirectTo: acceptRes.redirect_to };
}

// ============================================================================
// 5. Ory Keto: ReBAC Permissions & Zanzibar Relationships
// ============================================================================

/**
 * Grants a user a role/relation on an object (Creates a Zanzibar Relation Tuple)
 */
export async function grantAccess(
  namespace: string,
  object: string,
  relation: string,
  userId: string
): Promise<void> {
  await relationshipClient.createRelationship({
    createRelationshipBody: {
      namespace,
      object,
      relation,
      subject_id: userId,
    },
  });
}

/**
 * Links a resource to a parent workspace (Subject Set inheritance)
 */
export async function attachResourceToWorkspace(
  resourceId: string,
  workspaceId: string
): Promise<void> {
  await relationshipClient.createRelationship({
    createRelationshipBody: {
      namespace: 'Document',
      object: resourceId,
      relation: 'workspace',
      subject_set: {
        namespace: 'Workspace',
        object: workspaceId,
        relation: 'members',
      },
    },
  });
}

/**
 * High-speed permission check (Evaluates ReBAC graph and OPL rules)
 */
export async function canUserAccessDocument(
  userId: string,
  documentId: string,
  action: 'read' | 'write'
): Promise<boolean> {
  try {
    const { data } = await permissionClient.checkPermission({
      namespace: 'Document',
      object: documentId,
      relation: action,
      subjectId: userId,
    });
    return Boolean(data.allowed);
  } catch (error) {
    return false;
  }
}

// ============================================================================
// 6. Ory Keto: Ory Permission Language (OPL) Definition
// ============================================================================

class User implements Namespace {}

class WorkspaceNamespace implements Namespace {
  related: {
    members: User[];
    admins: User[];
  };

  permits = {
    view: (ctx: Context): boolean =>
      this.related.members.includes(ctx.subject) ||
      this.related.admins.includes(ctx.subject),

    edit: (ctx: Context): boolean =>
      this.related.admins.includes(ctx.subject),
  };
}

class DocumentNamespace implements Namespace {
  related: {
    workspace: WorkspaceNamespace[];
    owners: User[];
    editors: User[];
    viewers: User[];
  };

  permits = {
    read: (ctx: Context): boolean =>
      this.related.viewers.includes(ctx.subject) ||
      this.permits.write(ctx) ||
      this.related.workspace.traverse((w) => w.permits.view(ctx)),

    write: (ctx: Context): boolean =>
      this.related.editors.includes(ctx.subject) ||
      this.permits.admin(ctx) ||
      this.related.workspace.traverse((w) => w.permits.edit(ctx)),

    admin: (ctx: Context): boolean =>
      this.related.owners.includes(ctx.subject),
  };
}
