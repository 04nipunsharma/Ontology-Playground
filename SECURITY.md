# Security

This repository is maintained for Komatsu Australia. It contains no production
data and no credentials; secrets live in GitHub Actions secrets and Azure.

To report a vulnerability or a leaked credential, contact the repository
owners privately (Security → *Report a vulnerability* if private vulnerability
reporting is enabled, or the internal security channel) — do not open a public
issue. Rotate any exposed credential immediately.

Automated safeguards: `.github/workflows/secret-scan.yml` (gitleaks) runs on
every push and pull request, and Dependabot keeps dependencies patched.
