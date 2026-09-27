# Moving the Repo into the Organisation's GitHub

The repo is ready to move from a personal account into the Komatsu
organisation's GitHub. Nothing in the code is tied to the current owner:

- The deployed workbench uses the repo it was built from for its
  "submit to catalogue" and contribute links (`VITE_REPOSITORY`, set by the
  deploy workflow). `VITE_CATALOGUE_REPO` is only needed to override that.
- Workflows reference secrets and variables by name, never by owner.

## 1. Transfer (5 minutes)

Needs: admin on the repo, and permission to create repositories in the org.

1. **Settings → General → Danger Zone → Transfer ownership** → choose the
   organisation → optionally rename (e.g. `komatsu-ontology-workbench`).
2. GitHub redirects the old URL, but update local clones:
   `git remote set-url origin https://github.com/<org>/<repo>.git`
3. Set **visibility** to *Private* or *Internal*. The research docs and
   bindings describe internal systems.

Transferring moves issues, PRs, branches, releases and Actions history.
**Secrets, variables and environments do not move.** Re-create them (step 3).

## 2. Organisation settings to check

| Setting | Where | Recommended |
|---|---|---|
| GitHub Actions allowed | Org → Settings → Actions → General | Allow; permit `Azure/*`, `azure/*`, `actions/*` if the org restricts actions |
| Workflow permissions | Repo → Settings → Actions | Read repository contents; PR creation not needed |
| Claude GitHub App (to keep working with Claude Code) | Org owner installs at https://github.com/apps/claude/installations/select_target | Grant access to this repo |
| Branch protection / ruleset on `main` | Repo → Settings → Rules | Require PR + 1 review, require the **CI** check, block force-push |
| Code owners | `.github/CODEOWNERS` | Replace placeholder teams with real org teams, uncomment |
| Secret scanning + push protection, Dependabot alerts | Repo → Settings → Code security | On |

## 3. Re-create secrets and variables

Repo → Settings → Secrets and variables → Actions. You can also define them
at org level and share them with the repo.

| Kind | Name | For |
|---|---|---|
| Secret | `AZURE_STATIC_WEB_APPS_API_TOKEN` | Web app deploy |
| Secret | `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` | OIDC login (infra + Fabric deploy) |
| Secret | `VITE_GITHUB_CLIENT_ID` | Optional GitHub OAuth for the PR flow |
| Variable | `AZURE_SWA_ENABLED`, `FABRIC_DEPLOY_ENABLED` | Turn deployments on |
| Variable | `AZURE_RESOURCE_GROUP`, `FABRIC_WORKSPACE_ID` | Targets |

## 4. Update the Azure OIDC trust

The federated credential's subject names the repo, so it must change after a
transfer or rename:

```
repo:<org>/<repo>:ref:refs/heads/main
```

In Entra ID → App registrations (or the managed identity) → Certificates &
secrets → Federated credentials, edit the subject (or add a new credential
and remove the old one after testing).

## 5. Tidy-ups after the move

- The local-dev fallback repo in `src/lib/repoConfig.ts` and the
  "original home" link can be switched to `<org>/<repo>` in one line.
- If a GitHub OAuth app is used for the PR flow, create it under the org
  and update its callback URL to the new Static Web App hostname.
- Add the repo to the org's Azure DevOps / ServiceNow CMDB entry if required.

## What I need from you

- The **organisation name** (and the new repo name, if you're renaming it).
- The GitHub **teams** for CODEOWNERS (data architecture, data platform, cloud platform).
- Confirmation that an org owner will install the **Claude GitHub App** on the new repo, so this session can keep pushing after the move.
