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
- ⚡️ Integration with PWA
- 🔥 Awesome markdown parser
- 🌗 Switching dark mode
- 🗺 Generating a sitemap
- ☄️ Generating RSS feeds
- 🏄‍♂️ Infinite scrolling for UX
- 👩‍🎓 Integration with Google Analytics
- 💰 Integration with Google Adsense

## Requirements
- Node.js: 12+
- API Key for Contentful

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
- 💖 StyleLint - CSS linter
- 🐶 Husky — Use git hooks with ease
- 🤖 Dependabot - Dependency update
- 👷 PR Workflow - Linters on pull requests
- 🗂 Absolute import - Import folders and files using the @ prefix

## Security
We are using [GitGuardian](https://www.gitguardian.com/) to try to protect our secrets. If you see any security risks, please let me know.