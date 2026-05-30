# Local Docker Notes: Upstream Sync & Docker Workflow

This fork tracks the upstream [`alshedivat/al-folio`](https://github.com/alshedivat/al-folio) theme while hosting
our personal content. Upstream updates frequently change `Gemfile.lock` (and sometimes
`package-lock.json`), which can break local Docker builds unless we regenerate those lock files. This standalone note lives outside the theme-managed pages so it does not get clobbered during template updates.

## 1. Updating from upstream `al-folio`

1. Make sure the upstream remote exists: `git remote add upstream https://github.com/alshedivat/al-folio.git`
   (run once).
2. Fetch the latest upstream changes: `git fetch upstream`.
3. Update our main branch:
   - If you prefer merges: `git checkout main` then `git merge upstream/main`.
   - If you prefer rebases: `git checkout main` then `git rebase upstream/main`.
4. Resolve any conflicts in our content and lock files.
5. Regenerate the Docker image and lock files (see sections below), then commit the
   updated lock file(s) together with the merge/rebase before pushing to origin.

## 2. Running the site with Docker Compose

- Build (or rebuild) and start the container with live reload: `docker compose up --build`.
- The site becomes available at http://localhost:8080 with livereload on port 35729.
- Project files are bind-mounted into the container, so edits in the repo trigger
  Jekyll to rebuild automatically.
- Node-based theme tools are installed inside the Docker image from `package-lock.json`
  with `npm ci`. The compose file keeps `/srv/jekyll/node_modules` in a named volume
  so the bind mount of the repo does not hide those installed tools. Run tools such
  as Prettier inside the container, for example:
  `docker compose exec jekyll npx prettier assets/js/common.js --write`.
- Stop the container with `Ctrl+C`; restart using `docker compose up` (skip `--build`
  if the image is already current).

## 3. Fixing Docker build errors after upstream updates

When upstream replaces `Gemfile.lock`, the lock file usually lists platforms from
GitHub Actions (e.g., `x86_64-linux` only). On a different machine the setup Docker builds
then fail during `bundle install` with messages like:

```
The bundle lockfile does not include arm64-darwin; try `bundle lock --add-platform arm64-darwin`
```

To recover:

1. Rebuild the image from scratch so Bundler regenerates the lock file for our
   environment: `docker compose build --no-cache`.
2. If Bundler still complains, exec into the build container and add the platforms
   manually: `docker compose run --rm jekyll bundle lock --add-platform arm64-darwin x86_64-linux`.
3. Re-run `docker compose build` to confirm the error is gone.
4. If `package-lock.json` changes, rebuild the image so the `node_modules` volume is
   refreshed from the updated lock file. If Docker keeps using an old Node volume,
   remove it with `docker compose down -v` before rebuilding.
5. Commit the regenerated `Gemfile.lock` (and `package-lock.json` if it changed) so
   future builds remain reproducible on this machine.
