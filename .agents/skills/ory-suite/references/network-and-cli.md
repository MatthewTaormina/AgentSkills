# Ory Network, Elements & CLI Reference

Ory Network is the managed, serverless, globally distributed platform for the Ory Suite. It provides managed instances of Ory Kratos, Ory Hydra, and Ory Keto with automatic database management, low-latency edge deployment, global replication, and the unified `ory` CLI.

---

## 1. Ory Network Overview

### 1.1 Architecture & Edge Distribution
*   **Global Low Latency**: Ory Network runs on a multi-region Anycast edge network with points-of-presence (PoPs) worldwide.
*   **Unified API Endpoints**: All Ory services are reachable via a single project domain:
    $$\text{https://}\{\text{project-slug}\}\text{.projects.oryapis.com}$$
*   **Built-in Data Isolation**: Every project runs its own isolated storage and encryption realms with compliance for GDPR, SOC 2, and HIPAA.
*   **Ory Console**: Web dashboard for visualizing identities, sessions, OAuth2 clients, permission graphs, audit logs, and security policies.

### 1.2 Ory Network API Key Types
*   **Project API Key (`ory_pat_...`)**: Required for administrative and server-to-server operations (`IdentityApi`, `OAuth2Api`, `RelationshipApi`). Keep secret.
*   **Workspace API Key**: Required for organization-level actions (creating projects, managing billing).

---

## 2. Ory CLI (`ory`)

The Ory CLI is the command-line interface for managing Ory Network projects, self-hosted deployments, database migrations, and local development tunnels.

### 2.1 Installation
```bash
# Via npm
npm install -g @ory/cli

# Via Homebrew (macOS / Linux)
brew install ory/tap/ory

# Via Shell script (Linux / Docker)
curl -sSL https://raw.githubusercontent.com/ory/meta/master/install.sh | bash -s -- -b /usr/local/bin
```

### 2.2 Core CLI Commands
```bash
# Authenticate CLI with Ory Network
ory auth

# Project Management
ory list projects
ory use project <project-id-or-slug>

# Local Development Tunnel (Replaces deprecated 'ory proxy')
# Exposes Ory APIs on localhost alongside your local application to eliminate CORS & cookie domain issues
ory tunnel --project <project-slug> http://localhost:3000

# Permission & Zanzibar Management (Keto)
ory patch opl --project <project-slug> -f file://./namespaces.ts
ory parse relation-tuples -f file://./tuples.json

# Identity & User Management (Kratos)
ory list identities --project <project-slug>
ory get identity <identity-id> --project <project-slug>
ory import identities -f ./users-import.json --project <project-slug>
ory delete identity <identity-id> --project <project-slug>

# OAuth 2.0 Client Management (Hydra)
ory list oauth2-clients --project <project-slug>
ory create oauth2-client \
  --project <project-slug> \
  --name "My Next.js Frontend" \
  --grant-type authorization_code,refresh_token \
  --response-type code \
  --scope openid,offline_access,profile,email \
  --redirect-uri http://localhost:3000/api/auth/callback
```

---

## 3. Ory Elements (Pre-Built UI Components)

`@ory/elements` is an official component library designed to render Ory Kratos self-service UI nodes into accessible, themeable React forms.

### 3.1 Installation
```bash
npm install @ory/elements @ory/client
```

### 3.2 Next.js (App Router) Integration Example
```tsx
// app/login/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Configuration, FrontendApi, LoginFlow } from '@ory/client';
import { UserAuthCard } from '@ory/elements';
import '@ory/elements/style.css';

const frontend = new FrontendApi(
  new Configuration({
    basePath: process.env.NEXT_PUBLIC_ORY_SDK_URL || 'http://localhost:4000',
    baseOptions: { withCredentials: true },
  })
);

export default function LoginPage() {
  const [flow, setFlow] = useState<LoginFlow | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const flowId = searchParams.get('flow');
  const returnTo = searchParams.get('return_to');

  useEffect(() => {
    // 1. If flowId exists in URL, fetch existing flow
    if (flowId) {
      frontend.getLoginFlow({ id: flowId })
        .then(({ data }) => setFlow(data))
        .catch(() => router.push('/login'));
      return;
    }

    // 2. Otherwise initialize a fresh browser login flow
    frontend.createBrowserLoginFlow({
      returnTo: returnTo ? String(returnTo) : undefined,
    }).then(({ data }) => setFlow(data));
  }, [flowId, returnTo, router]);

  if (!flow) {
    return <div>Loading authentication form...</div>;
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <UserAuthCard
        flow={flow}
        flowType="login"
        title="Sign In"
        additionalProps={{
          forgotPasswordURL: '/recovery',
          signupURL: '/registration',
        }}
      />
    </div>
  );
}
```

---

## 4. SDK Architecture & Client Initialization

Ory provides unified client libraries across multiple programming languages.

### 4.1 Node.js / TypeScript (`@ory/client`)
```typescript
import {
  Configuration,
  FrontendApi,
  IdentityApi,
  OAuth2Api,
  PermissionApi,
  RelationshipApi,
} from '@ory/client';

// 1. Browser / Frontend Client (Session-based, withCredentials)
export const frontendClient = new FrontendApi(
  new Configuration({
    basePath: process.env.NEXT_PUBLIC_ORY_SDK_URL, // e.g. https://<project>.projects.oryapis.com
    baseOptions: {
      withCredentials: true, // Sends and receives HTTP-only ory_kratos_session cookies
    },
  })
);

// 2. Backend / Admin Client (Privileged API Key)
const adminConfig = new Configuration({
  basePath: process.env.ORY_SDK_URL,
  accessToken: process.env.ORY_API_KEY, // Project API key (ory_pat_...)
});

export const identityAdmin = new IdentityApi(adminConfig);
export const oauth2Admin = new OAuth2Api(adminConfig);
export const permissionClient = new PermissionApi(adminConfig);
export const relationshipClient = new RelationshipApi(adminConfig);
```

### 4.2 Python (`ory-client`)
```python
import os
import ory_client
from ory_client.api import frontend_api, identity_api, o_auth2_api, permission_api

# Admin client configuration
admin_configuration = ory_client.Configuration(
    host=os.environ.get("ORY_SDK_URL", "https://<project-slug>.projects.oryapis.com"),
    access_token=os.environ.get("ORY_API_KEY")
)

with ory_client.ApiClient(admin_configuration) as api_client:
    identities = identity_api.IdentityApi(api_client)
    oauth2 = o_auth2_api.OAuth2Api(api_client)
    permissions = permission_api.PermissionApi(api_client)
```

---

## 5. Ory Tunnel vs. Ory Proxy (Deprecation Alert)

> [!WARNING]
> **`ory proxy` is deprecated.**
> In modern workflows, use `ory tunnel` during local development.
>
> **Why `ory tunnel`?**
> Browser security blocks cookies set across distinct domains (e.g. `localhost:3000` vs. `https://my-project.projects.oryapis.com`).
> `ory tunnel` mirrors the Ory project endpoints onto `http://localhost:4000`, allowing your frontend app on `http://localhost:3000` to share first-party cookies and avoid CORS cross-origin restrictions seamlessly.
