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

Content Delivery API は読み取り専用です。

[Content Delivery API | Contentful](https://www.contentful.com/developers/docs/references/content-delivery-api/)

## Setup

Copy the .env.example and set the API Key for Contentful.

```sh
cp .env.example .env.local
```

```sh
docker-compose build
docker-compose up
docker-compose exec app bash
```

It uses Docker, but can be built locally.

```sh
yarn install
```

## Code quality
- 🔶 TypeScript — Adding static type definitions
- 📏 ESLint — JavaScript linter
- 🐶 Husky — Use git hooks with ease
- 🤖 Dependabot - Dependency update
- 👷 PR Workflow - Linters on pull requests
- 🗂 Absolute import - Import folders and files using the @ prefix

## Writing Tools
- [URL Slug Generator - slugify.online](https://slugify.online/) - Slugの作成

## Security
We are using [GitGuardian](https://www.gitguardian.com/) to try to protect our secrets. If you see any security risks, please let me know.