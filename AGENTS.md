# Repository Guidelines

## Project Context

This is Pablo Rodriguez-Mier's personal GitHub Pages site, built with Jekyll and the
`al-folio` academic theme. Treat the upstream theme docs as authoritative:

- `README.md` gives the feature overview.
- `INSTALL.md` describes local setup and deployment.
- `CUSTOMIZE.md` describes where site content and configuration live.
- `UPDATE.md` describes the preferred workflow for pulling in new upstream
  al-folio releases.
- `LOCAL_DOCKER_NOTES.md` records this fork's Docker and upstream-sync workflow.

## Branch and Deployment Rules

- Make source changes on `main` or a feature branch that targets `main`.
- Do not edit `gh-pages`; it is generated and overwritten by deployment.
- For this personal GitHub Pages site, keep `_config.yml` configured with
  `url: https://pablormier.github.io` and an empty `baseurl:` unless the deployment
  target intentionally changes.
- If a custom domain is introduced, follow the FAQ guidance and add a source-branch
  `CNAME` file rather than hand-editing deployment output.

## Local Development

- Prefer the Docker workflow from `INSTALL.md` and `LOCAL_DOCKER_NOTES.md`:
  `docker compose up --build`, then view the site at `http://localhost:8080`.
- Use `docker compose up` when the image is already current.
- The slim image is available with
  `docker compose -f docker-compose-slim.yml up`.
- The legacy non-Docker fallback is `bundle install`, install Jupyter if needed, then
  `bundle exec jekyll serve` and view `http://localhost:4000`.
- Changes to `_config.yml` require a Jekyll rebuild or server restart; most content
  edits only need a browser refresh after Jekyll rebuilds.

## Content Locations

- Site-wide configuration: `_config.yml`.
- CV content: `assets/json/resume.json` is preferred; `_data/cv.yml` is the fallback
  only when the JSON resume file is absent.
- Social/contact links: `_data/socials.yml`.
- Repository/user cards: `_data/repositories.yml`.
- Publications: `_bibliography/papers.bib`, with display behavior controlled by the
  `Jekyll Scholar` section in `_config.yml`.
- Coauthor linking metadata: `_data/coauthors.yml`; keys must be lowercase and
  accent-free.
- Pages: `_pages/`.
- Blog posts: `_posts/`, named `YYYY-MM-DD-title.md`; use `_drafts/` for unpublished
  drafts that should stay in git.
- News items: `_news/`.
- Projects: `_projects/`.
- Theme styles: `_sass/`, with theme colors in `_sass/_themes.scss` and variables in
  `_sass/_variables.scss`.
- Assets: `assets/`, keeping images under `assets/img/` and PDFs under
  `assets/pdf/` when used by publication buttons.

## Customization Practices

- Follow existing front matter patterns by copying nearby pages, posts, news items,
  or projects before creating new ones.
- When removing theme-provided sections, prefer adding files or directories to
  `_config.yml` `exclude:` instead of deleting upstream files. This reduces conflicts
  during future al-folio updates.
- If deleting pages anyway, update navigation ordering and all references to the
  removed page.
- Preserve Liquid/Jekyll conventions already present in `_includes`, `_layouts`, and
  `_plugins`; avoid broad rewrites of theme internals for content-only changes.
- For new social media providers, keep the files listed in `CONTRIBUTING.md` in sync
  and preserve alphabetical ordering where the theme expects it.

## Formatting and Checks

- al-folio uses Prettier for formatting. For broad formatting fixes, run
  `npx prettier . --write` after dependencies are available.
- Before handing off non-trivial site changes, run the most relevant available check:
  Docker serve/build for local site behavior, or `bundle exec jekyll build` if using
  the legacy local setup.
- If upstream updates change `Gemfile.lock` or `package-lock.json`, follow
  `UPDATE.md` first, then use `LOCAL_DOCKER_NOTES.md` for Docker-specific recovery:
  rebuild Docker, regenerate needed lockfile platforms, and commit lockfile changes
  together with the upstream merge or rebase.
