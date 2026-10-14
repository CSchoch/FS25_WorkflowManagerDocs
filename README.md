# Website

**Live**: https://cschoch.github.io/FS25_WorkflowManagerDocs/

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Translations

The site is published in English (default) and German (`/de/`). The German pages live in
`i18n/de/`:

- `docusaurus-plugin-content-docs/current/` — one translated copy of every page in `docs/`, same
  file names. When you change a doc, change its German copy too. Headings that other pages link to
  carry the English anchor (`## Speichern {#saving}`) so links work in both languages.
- `code.json` — strings of the home page (`src/pages/index.tsx`, wrapped in `<Translate>` /
  `translate()`) and the theme.
- `docusaurus-theme-classic/` — navbar and footer labels.

After adding a new translatable string or sidebar category, run
`npm run write-translations -- --locale de` and translate the new entries. The dev server only
serves one language at a time: `npm start -- --locale de` previews the German site.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
