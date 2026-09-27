/**
 * The GitHub repository this workbench's catalogue lives in. Used for the
 * "submit to catalogue" pull-request flow and contribute links.
 *
 * Resolution order:
 *   1. VITE_CATALOGUE_REPO=<owner>/<repo> (explicit override)
 *   2. VITE_REPOSITORY — set by the deploy workflow to github.repository, so a
 *      deployed site automatically follows the repo if it moves to another org
 *   3. the repo's original home (local dev fallback)
 */
const FALLBACK_REPO = '04nipunsharma/Ontology-Playground';

const [owner, repo] = (
  import.meta.env.VITE_CATALOGUE_REPO || import.meta.env.VITE_REPOSITORY || FALLBACK_REPO
).split('/');

export const CATALOGUE_REPO_OWNER = owner;
export const CATALOGUE_REPO_NAME = repo;
export const CATALOGUE_REPO_URL = `https://github.com/${owner}/${repo}`;
