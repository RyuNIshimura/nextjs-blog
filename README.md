---
title: "README"
date: "2021-11-20"
---

<p align="center">
  <img src="https://img.shields.io/badge/PRS-Welcome-7D83FD" />

  <img src="https://img.shields.io/badge/LICENSE-MIT-7D83FD" />
</p>

# Next.js Contentful Blog 💍

![giphy](https://user-images.githubusercontent.com/40055484/137597358-11a56edc-e311-4aac-b8d1-2a4b773ba8eb.gif)

Keep all your information in one blog.

> This project, while the source code is publicly available. It's not planned, it's just a project for me to play with and implement features as I see fit.

## 💡 Requirements

- [Node.js: 14.x+](https://nodejs.org/)
- [Content Delivery API | Contentful](https://www.contentful.com/developers/docs/references/content-delivery-api/)

> Content Delivery API is read-only.

## 👀 Tech Stack

### Open Source

- [Next.js (React Framewotk)](https://nextjs.org/)
- [Tailwind CSS (UI Framework)](https://tailwindcss.com/)

### Infra/Services

- [Vercel (Hosting)](https://vercel.com/)
- [GitHub Actions (CI/CD)](https://github.co.jp/features/actions)
- [Contentful (Headless CMS)](https://www.contentful.com/)
- [Google Analytics (Optional)](https://marketingplatform.google.com/intl/ja/about/analytics/)
- [Google Analytics Reporting API (Optional. Used to display articles with the highest number of views.)](https://developers.google.com/analytics/devguides/reporting/core/v4)
- [Google AdSense (Optional)](https://www.google.com/intl/ja_jp/adsense/start/)

I'm using Contentful, but you can use any other Headless CMS service, or you can use your own database or filesystem markdown files. ([docs](https://github.com/RyuNIshimura/nextjs-blog/tree/main/docs) directory is an example of this.) Basically, I would be happy if you refer to the UI and other modules.

## ⚡️ Setup

Copy the `.env.example` and set the API Keys.

```bash
cp .env.example .env
```

```bash
yarn install
yarn dev
```
