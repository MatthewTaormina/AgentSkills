# Ory Keto Reference: Fine-Grained Authorization (Google Zanzibar & OPL)

Ory Keto is an open-source, ultra-low-latency authorization server based on Google's Zanzibar paper (*"Zanzibar: Google's Consistent, Global Authorization System"*). It implements Relationship-Based Access Control (ReBAC), Role-Based Access Control (RBAC), and Access Control Lists (ACLs) by traversing a directed graph of relationship tuples.

---

## 1. Core Architecture & Zanzibar Concepts

### 1.1 The Zanzibar Data Model
Permissions are modeled as relationships between **Subjects** (who) and **Objects** (what), structured as **Relation Tuples**:

$$\text{Namespace}:\text{Object}\#\text{Relation}@\text{Subject}$$

Where:
*   **Namespace**: The category or type of entity (e.g., `Document`, `Folder`, `Organization`, `Project`).
*   **Object**: The specific entity identifier (e.g., `doc_9812`, `org_finance`).
*   **Relation**: The relationship type (e.g., `owner`, `editor`, `viewer`, `member`, `parent`).
*   **Subject**: Either:
    *   A **Subject ID** (a specific identity string, e.g., `user:alice` or a Kratos UUID).
    *   A **Subject Set** (a set of subjects derived from another relation, e.g., `Group:devops#member`).

### 1.2 Graph Traversal & Inheritance
Because a subject can be another relation tuple (Subject Set), Keto resolves permissions through recursive graph traversal. For example:
1. `Document:spec.pdf#parent@Folder:specs`
2. `Folder:specs#viewer@Group:engineering#member`
3. `Group:engineering#member@user:alice`

When querying: *"Can `user:alice` view `Document:spec.pdf`?"*, Keto traverses the graph from `alice` $\to$ `engineering#member` $\to$ `specs#viewer` $\to$ `spec.pdf#viewer` and returns `allowed: true`.

---

## 2. Ory Permission Language (OPL)

Ory Permission Language is a TypeScript-based configuration language that defines the schema, relations, and computed permissions for your application.

### 2.1 OPL Schema Definition (`namespaces.ts`)

```typescript
import { Namespace, Context } from "@ory/keto-namespace-types";

// User identity namespace
class User implements Namespace {}

// Organization namespace with role hierarchies
class Organization implements Namespace {
  related: {
    owners: User[];
    admins: User[];
    members: User[];
  };

  permits = {
    // Admins and owners are also considered members
    isMember: (ctx: Context): boolean =>
      this.related.members.includes(ctx.subject) ||
      this.related.admins.includes(ctx.subject) ||
      this.related.owners.includes(ctx.subject),

    manageBilling: (ctx: Context): boolean =>
      this.related.owners.includes(ctx.subject),

    inviteMembers: (ctx: Context): boolean =>
      this.related.admins.includes(ctx.subject) ||
      this.permits.manageBilling(ctx),
  };
}

// Workspace namespace nested under Organization
class Workspace implements Namespace {
  related: {
    org: Organization[];
    admins: User[];
    members: User[];
  };

  permits = {
    view: (ctx: Context): boolean =>
      this.related.members.includes(ctx.subject) ||
      this.related.admins.includes(ctx.subject) ||
      this.related.org.traverse((o) => o.permits.isMember(ctx)),

    edit: (ctx: Context): boolean =>
      this.related.admins.includes(ctx.subject) ||
      this.related.org.traverse((o) => o.permits.inviteMembers(ctx)),
  };
}

// Fine-grained Document resource with parent inheritance
class Document implements Namespace {
  related: {
    workspace: Workspace[];
    owners: User[];
    editors: (User | Organization)[];
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
```

### 2.2 Key OPL Rules & Constraints
*   **Deterministic Execution**: OPL execution is restricted to pure logic to guarantee fast execution without side-effects.
*   **Graph Traversal**: Use `.traverse((target) => ...)` to evaluate permissions across parent/child hierarchies.
*   **Compile-Time Verification**: Use `@ory/keto-namespace-types` in `package.json` to enable strict TypeScript compilation and type checks.

---

## 3. Relation Tuples: Format & Syntax

### 3.1 String Representation
```text
<namespace>:<object>#<relation>@<subject_id>
<namespace>:<object>#<relation>@<subject_namespace>:<subject_object>#<subject_relation>
```

Examples:
```text
Document:budget-2026.xlsx#owners@user:a988d672-04fb-4b51-93bf-4eaee82337d1
Document:budget-2026.xlsx#workspace@Workspace:finance-team
Workspace:finance-team#members@user:bob
```

### 3.2 JSON Representation (REST API / SDK)
```json
{
  "namespace": "Document",
  "object": "budget-2026.xlsx",
  "relation": "workspace",
  "subject_set": {
    "namespace": "Workspace",
    "object": "finance-team",
    "relation": "members"
  }
}
```

---

## 4. Keto APIs: Check, Expand & Mutate

Keto separates **Read** operations (Check, Expand, List) from **Write** operations (Create, Delete, Patch) across distinct network ports.

### 4.1 Check API (Evaluation)
Evaluates whether a subject is authorized.
*   **HTTP**: `POST /relation-tuples/check` or `GET /relation-tuples/check?namespace=...&object=...&relation=...&subject_id=...`
*   **Port**: 4466 (Read)
*   **Response**: `{"allowed": true}` or `{"allowed": false}`

```http
POST /relation-tuples/check HTTP/1.1
Host: keto:4466
Content-Type: application/json

{
  "namespace": "Document",
  "object": "budget-2026.xlsx",
  "relation": "read",
  "subject_id": "user:a988d672-04fb-4b51-93bf-4eaee82337d1"
}
```

### 4.2 Expand API (Graph Introspection & Debugging)
Returns the complete authorization tree evaluated for an object-relation pair. Used for UI permission graphs and access auditing.
*   **HTTP**: `GET /relation-tuples/expand?namespace=Document&object=budget-2026.xlsx&relation=read&max-depth=5`
*   **Port**: 4466 (Read)

### 4.3 Write / Mutate API
*   **Create**: `PUT /admin/relation-tuples`
*   **Delete**: `DELETE /admin/relation-tuples?namespace=...&object=...`
*   **Patch (Batch Updates)**: `PATCH /admin/relation-tuples`
*   **Port**: 4467 (Write)

---

## 5. Configuration Reference (`keto.yml`)

```yaml
version: v0.11.0

dsn: postgres://keto:secret@postgres:5432/keto?sslmode=disable

serve:
  read:
    host: 0.0.0.0
    port: 4466
  write:
    host: 0.0.0.0
    port: 4467

namespaces:
  location: file:///etc/config/keto/namespaces.ts

log:
  level: debug
  format: json
```

---

## 6. CLI Reference (`keto`)

```bash
# Apply SQL database migrations
keto migrate up -c /etc/config/keto/keto.yml -y

# Run Keto read and write servers
keto serve -c /etc/config/keto/keto.yml

# Create a relationship tuple
keto relation-tuple create Document doc-42 read user:alice \
  --endpoint http://127.0.0.1:4467

# Check permission
keto check user:alice read Document doc-42 \
  --endpoint http://127.0.0.1:4466

# Expand permission tree
keto expand read Document doc-42 \
  --endpoint http://127.0.0.1:4466

# Delete relationship tuple
keto relation-tuple delete Document doc-42 read user:alice \
  --endpoint http://127.0.0.1:4467
```
