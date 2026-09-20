# AstroPaper blog

This repository stores only the files that differ from the
[AstroPaper](https://github.com/satnaing/astro-paper) template. The files use
their normal AstroPaper paths; no patch file is required.

## How deployment works

On every push to `main`, GitHub Actions:

1. downloads the AstroPaper version pinned in `scripts/prepare-site.sh`;
2. removes the template's sample posts and pages;
3. copies this repository's overrides into the downloaded project;
4. reads the authoritative site URL, origin, and base path from GitHub Pages;
5. builds the site and deploys the result to GitHub Pages.

The workflow also uses GitHub's built-in repository environment variables for
the author, profile, social, and edit links. No owner, repository URL, or Pages
base path needs to be stored in this repository. The same workflow therefore
supports both root-hosted user/organization Pages and subdirectory-hosted
project Pages, including custom domains configured through GitHub Pages.

In the repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**.

## Preview locally

The preparation script creates a complete Astro project outside this repository:

```sh
scripts/prepare-site.sh /tmp/astropaper-blog
cd /tmp/astropaper-blog
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Edit `astro-paper.config.ts`, `src/content/pages/`, or
`src/content/posts/` here—not in the generated project. Delete the generated
project when you are finished.

To upgrade AstroPaper, change `ASTRO_PAPER_VERSION` in
`scripts/prepare-site.sh`, then run a local build to check whether any overrides
need updating.
