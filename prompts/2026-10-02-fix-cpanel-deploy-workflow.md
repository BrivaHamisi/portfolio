# Fix cPanel deployment workflow

## Goal

Fix the first GitHub Actions run failures and warnings so pushes to `master` can deploy the production build to cPanel.

## Files touched

- `.github/workflows/deploy-cpanel.yml`
- Remove the empty invalid `.github/workflows/actions.yaml`
- This implementation prompt

## Approach

- Upgrade checkout and setup-node actions to Node 24-compatible releases and pin the runner to Ubuntu 24.04.
- Keep the current passphrase-protected RSA key and add support for a `CPANEL_SSH_PASSPHRASE` GitHub Actions secret through `ssh-agent`/askpass; do not log the passphrase.
- Remove the empty workflow file that GitHub reports as having no event triggers.
- Keep the existing build, SSH host-key pin, and upload destination behavior.

## Verification

- Run `npm run build` and check the workflow diff.
- Add the `CPANEL_SSH_PASSPHRASE` secret in GitHub, push the fix to `master`, inspect the GitHub Actions run, and confirm the upload step succeeds.
- The separate Dependabot security-update failure is caused by the Vue CLI 5 dependency chain and is outside this deployment repair; do not change package versions in this task.
