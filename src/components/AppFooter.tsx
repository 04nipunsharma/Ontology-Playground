export function AppFooter() {
  const deployedCommitSha = import.meta.env.VITE_DEPLOYED_COMMIT_SHA;
  const deployedRepo = import.meta.env.VITE_REPOSITORY;
  const shortCommit = deployedCommitSha ? deployedCommitSha.slice(0, 7) : null;
  const commitUrl = deployedCommitSha && deployedRepo
    ? `https://github.com/${deployedRepo}/commit/${deployedCommitSha}`
    : null;

  return (
    <footer className="app-footer">
      <span>Komatsu Australia Ontology Workbench</span>
      <span className="app-footer-sep">&middot;</span>
      <a href="https://github.com/microsoft/Ontology-Playground" target="_blank" rel="noopener noreferrer">
        Based on Microsoft Ontology Playground (MIT)
      </a>
      {shortCommit && (
        <>
          <span className="app-footer-sep">&middot;</span>
          {commitUrl ? (
            <a href={commitUrl} target="_blank" rel="noopener noreferrer" title={deployedCommitSha}>
              Deployed commit {shortCommit}
            </a>
          ) : (
            <span title={deployedCommitSha}>Deployed commit {shortCommit}</span>
          )}
        </>
      )}
    </footer>
  );
}
