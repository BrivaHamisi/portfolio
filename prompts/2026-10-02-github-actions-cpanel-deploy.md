# GitHub Actions deployment to cPanel

## Goal

Deploy the production build to cPanel automatically whenever changes are pushed to the repository's current `master` branch, while retaining Vue Router deep links and the site's security headers.

## Files touched

- Add a GitHub Actions workflow under `.github/workflows/`.
- Add or update `public/.htaccess` for Vue Router fallback and Apache security headers.

## Approach

- Use Node 22, `npm ci`, and `npm run build`; deploy the contents of `dist/` over SSH to the document root held in GitHub secrets.
- Use the provided cPanel host, port, username, SSH private key, and remote path secrets. Pin the SSH server host key rather than trusting a runtime `ssh-keyscan` result; add a host-key secret if needed.
- Restrict automatic production deploys to pushes on `master`. Upload without deleting remote files, since the document root's other contents have not been confirmed.
- Configure Apache to serve `index.html` for Vue Router routes and carry over the existing Vercel security-header intent, adjusting directives for cPanel hosting.
- Leave Vercel analytics behavior unchanged in this deployment task; note that its endpoint may not operate on cPanel.

## Verification

- Confirm `npm run build` succeeds.
- Review the workflow's branch trigger, secrets, SSH host-key check, and destination before merging/pushing.
- After deployment, check the Actions run, homepage, direct load and refresh of `/work/development`, `/work/designs`, and `/work/photography`, HTTPS, and response security headers.
- Confirm the cPanel document root contains only this site before considering any future remote-delete sync.
