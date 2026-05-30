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

- Use the Docker workflow from `INSTALL.md` and `LOCAL_DOCKER_NOTES.md`:
  `docker compose up --build`, then view the site at `http://localhost:8080`.
- Use `docker compose up` when the image is already current.
- The slim image is available with
  `docker compose -f docker-compose-slim.yml up`.
- Do not run host-system Ruby, Bundler, `gem`, or `bundle exec jekyll ...` as a
  fallback when Docker is unavailable. If Docker fails because the daemon is not
  running or the image cannot be pulled, report Docker as the verification blocker
  and ask for Docker Desktop to be started or network access to be fixed.
- Do not run host-system Node package tooling (`npm`, `npx`, `yarn`, `pnpm`) for
  site/theme tasks. Run Node-based theme tools inside the Docker service instead,
  for example `docker compose exec jekyll npx prettier assets/js/common.js --write`
  when the site container is already running, or
  `docker compose run --rm jekyll npx prettier assets/js/common.js --write` for a
  one-off command.
- Only use the legacy non-Docker setup (`bundle install`, Jupyter if needed, then
  `bundle exec jekyll serve`) when the user explicitly requests host-based local
  setup or debugging.
- Changes to `_config.yml` require a Jekyll rebuild or server restart; most content
  edits only need a browser refresh after Jekyll rebuilds.

## Notebook Blog Posts

- al-folio notebook posts should use a Markdown wrapper in `_posts/` that embeds a
  notebook stored under `assets/jupyter/` with the `jekyll-jupyter-notebook`
  Liquid tag. Do not make `_posts/*.ipynb` posts unless the theme workflow is
  intentionally changed.
- Treat notebooks as pre-executed artifacts. Run and save notebook outputs locally,
  then let Docker/Jekyll convert the saved `.ipynb` to HTML during the site build.
  Do not rely on the Jekyll Docker build to execute notebooks.
- Use `uv` for local notebook dependencies. This keeps a reusable local cache and is
  sufficient for the Python-only notebooks currently used by the blog. Prefer
  `pixi` only if a future notebook needs non-Python packages, system libraries, or
  a more complex cross-platform environment.
- Notebook dependency metadata lives in `pyproject.toml`. Keep shared tools such as
  `jupyterlab`, `ipykernel`, and `nbconvert` in `[project].dependencies`; put
  notebook- or series-specific packages in a named dependency group, for example
  `tiny-convex-layer`.
- After changing notebook dependencies, run `uv sync --group <group-name>` locally
  and commit both `pyproject.toml` and `uv.lock` when `uv.lock` is created or
  updated.
- To edit the tiny convex layer series notebook, use:
  `uv run --group tiny-convex-layer jupyter lab`.
- Before handing off or committing notebook changes, execute the notebook in place
  so outputs are stored in git:
  `uv run --group tiny-convex-layer jupyter nbconvert --to notebook --execute assets/jupyter/tiny-convex-layer-part-1.ipynb --inplace`.

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
  Prettier inside the Docker service after dependencies are available, for example
  `docker compose exec jekyll npx prettier . --write` if the site container is
  running, or `docker compose run --rm jekyll npx prettier . --write` for a
  one-off formatting command. Do not run host `npx prettier ...` unless the user
  explicitly requests host-based tooling.
- Before handing off non-trivial site changes, verify with Docker
  (`docker compose up --build`) whenever a build check is needed. If Docker is not
  available, say so directly and do not substitute host Ruby/Bundler or host
  Node/npm checks unless the user asks for that fallback.
- If upstream updates change `Gemfile.lock` or `package-lock.json`, follow
  `UPDATE.md` first, then use `LOCAL_DOCKER_NOTES.md` for Docker-specific recovery:
  rebuild Docker, regenerate needed lockfile platforms, and commit lockfile changes
  together with the upstream merge or rebase.
