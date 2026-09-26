/**
 * The GitHub repository this workbench's catalogue lives in. Used for the
 * "submit to catalogue" pull-request flow and contribute links.
 * Override with VITE_CATALOGUE_REPO=<owner>/<repo> (e.g. after moving the repo
 * into a Komatsu GitHub organisation).
 */
const DEFAULT_REPO = '04nipunsharma/Ontology-Playground';

const [owner, repo] = (import.meta.env.VITE_CATALOGUE_REPO || DEFAULT_REPO).split('/');

export const CATALOGUE_REPO_OWNER = owner;
export const CATALOGUE_REPO_NAME = repo;
export const CATALOGUE_REPO_URL = `https://github.com/${owner}/${repo}`;
