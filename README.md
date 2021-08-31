<p align="center">
<img src="https://img.shields.io/badge/PRS-Welcome-7D83FD" />

<img src="https://img.shields.io/badge/LICENSE-MIT-7D83FD" />
</p>

# Next.js Contentful Blog 💍

Keep all your information in one blog 🖌

## Features
- ✨ Integration with Contentful
- 🔎 Full-text search using Contentful
- ⭐️ Integration with TailwindCSS
- 🔥 Awesome markdown parser
- 🌗 Switching dark mode
- 🗺 Generating a sitemap
- ☄️ Generating RSS feeds
- 🏄‍♂️ Infinite scrolling for UX
- 👩‍🎓 Integration with Google Analytics
- 💰 Integration with Google Adsense

## Requirements
- Node.js: 14.x+
- API Key for Contentful

Content Delivery API is read-only.

[Content Delivery API | Contentful](https://www.contentful.com/developers/docs/references/content-delivery-api/)

## Setup

Copy the .env.example and set the API Key for Contentful.

```bash
cp .env.local.example .env.local
```

```bash
docker-compose build
docker run --rm exec app yarn install
docker-compose up
```

It can be built without using Docker.

```bash
yarn install
yarn dev
```

### Contentful type generation

Refer to the following library to generate the Contentful type.

[intercom/contentful-typescript-codegen: Generate TypeScript interfaces from a Contentful environment](https://github.com/intercom/contentful-typescript-codegen)

```bash
cp .env.example .env
```

```bash
yarn contentful-typescript-codegen
```

Generated in `@types/generated/contentful.d.ts`.

## Code quality
- 🔶 TypeScript — Adding static type definitions
- 📏 ESLint — JavaScript linter
- 🐶 Husky — Use git hooks with ease
- 🤖 Dependabot - Dependency update
- 👷 PR Workflow - Linters on pull requests
- 🗂 Absolute import - Import folders and files using the @ prefix

## Writing Tools
- [URL Slug Generator - slugify.online](https://slugify.online/) - Generate a slug

## Security
We are using [GitGuardian](https://www.gitguardian.com/) to try to protect our secrets. If you see any security risks, please let me know.