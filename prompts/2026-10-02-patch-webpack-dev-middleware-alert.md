# Patch webpack-dev-middleware Dependabot alert

## Goal

Resolve the open high-severity Dependabot alert for the development-only transitive `webpack-dev-middleware` dependency and let GitHub close the alert after it scans the updated default branch.

## Files touched

- `package.json`
- `package-lock.json`
- This implementation prompt

## Approach

- Add an npm override pinning transitive `webpack-dev-middleware` to `7.4.6`, the first patched 7.x version identified by the repository's Dependabot alert metadata.
- Regenerate the npm lockfile and confirm the dependency tree no longer installs the vulnerable 5.x version.
- Do not change Vue CLI or webpack-dev-server major versions.

## Verification

- Run `npm ci`, confirm the resolved middleware version, and run `npm run build`.
- Start `npm run serve` and verify the local homepage responds, then stop the server.
- Push to `master`, check the deployment run, and confirm Dependabot alert #89 closes after GitHub rescans the lockfile.
