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
