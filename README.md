# Hot Cups — Eleventy scaffold + Docker

This repository contains a small static site scaffold for the Hot Cups stall using Eleventy (11ty). The Eleventy build outputs to `docs/` so the site can be deployed directly to GitHub Pages from the `docs` folder on the `main` branch.

Local development (node installed)

```powershell
# install deps
npm install

# start Eleventy dev server (live reload)
npm run dev
```

Build (produce static files into `docs/`)

```powershell
npm run build
# then serve docs locally
npx http-server docs -p 8080
```

Docker (build + run static server)

```powershell
# build the image
docker build -t hot-cups:local .
# run container (serves at http://localhost:8080)
docker run --rm -p 8080:8080 hot-cups:local

# or with docker-compose for dev (bind mounts + dev server)
docker-compose up --build
```

GitHub Pages

- Because Eleventy writes to the `docs/` directory by default in this scaffold, enable GitHub Pages for this repository by choosing `main` branch / `docs` folder in the Pages settings.

Notes
- If you prefer GitHub Pages via `gh-pages` branch instead, change the Eleventy output directory and CI accordingly.

Credits
- **GitHub Copilot**: Assisted in scaffolding, templating, and generating helper code and components for this project. Thank you to GitHub Copilot for speeding up development.

Owner note
- The site footer includes a "Meet the couple" panel where you can add a photo and short description of the shop owners. Edit translations in `_data/i18n/*.json` using the keys `footer.meet.title`, `footer.meet.desc`, and `footer.meet.image` to localize and change the image path.

Notes for GitHub Pages and local development
------------------------------------------
- This project is configured to publish to a GitHub Project Pages URL like `https://<user>.github.io/hot-cups/`.
- Eleventy uses `pathPrefix` to generate correct URLs for assets and language pages when deployed under a repository path. The site will use `/hot-cups/` as the base path in production builds and `/` for local development.

How to run locally (dev)
- Install dependencies: `npm install`
- Start Eleventy with live reload (local builds use `/` path prefix):
	```powershell
	npm run dev
	```

How to run a production build (simulate CI / GitHub Pages)
- To reproduce the same output the Pages workflow produces (pathPrefix set to `/hot-cups/`), run:
	```powershell
	$Env:ELEVENTY_ENV='production'; npm run build
	```
- After this build, open files under `docs/` and confirm asset URLs include `/hot-cups/assets/...`.

Troubleshooting deployed assets
- If assets 404 after deployment, check your Actions run and confirm the Eleventy build logged `Using pathPrefix: /hot-cups/` and that the `Upload artifact` step uploaded the `docs/` folder containing `assets/`.
- You can fetch the deployed HTML and inspect URLs:
	```powershell
	curl https://<user>.github.io/hot-cups/ -UseBasicParsing | Select-String -Pattern 'assets/' -Context 0,1
	```

If you want me to, I can add a short section in this README with a Pages status badge and a link to the last successful Actions run.
