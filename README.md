# Nest of Blogs

A full-stack blogging platform built with **Nuxt 3**, featuring markdown-driven content, Google authentication, real-time comments & likes via Firebase, dark/light theming, and full mobile responsiveness.

**Live:** [nest-of-blogs.vercel.app](https://nest-of-blogs.vercel.app/)

---

## Features

- **Markdown content** — blog posts authored in `.md` files under `content/`, rendered via `@nuxt/content`
- **Dynamic article view** — per-article pages at `/blogs/[slug]` with header image, tags, meta bar, scroll-progress indicator, and author footer
- **Table of Contents** — sticky sidebar TOC on desktop; collapsible inline TOC on mobile with active-heading tracking
- **Topic filtering** — filter posts by topic via `/topic/[name]`
- **Series** — curated multi-part series at `/series` and `/series/[slug]`
- **Google Sign-In** — Firebase Auth with Google provider; session persisted in `localStorage` via Pinia store
- **Comments** — per-article threaded comments stored in Firestore via server API routes
- **Likes** — per-article like counts with toggle support via server API routes
- **Dark / Light mode** — `@nuxtjs/color-mode`; preference persisted across sessions
- **Mobile-first navbar** — collapsible hamburger menu with Topics accordion; closes on navigation
- **SEO** — `useSeoMeta` + Open Graph + Twitter Card + canonical URLs on every article
- **Deployed on Vercel** — with `vercel.json` config

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3 (Vue 3 `<script setup>`, Composition API) |
| Language | TypeScript 5 |
| Content | `@nuxt/content` v2 — markdown with frontmatter |
| Styling | Tailwind CSS v3 + `@tailwindcss/typography` |
| Icons | Nuxt Icon (`nuxt-icon`) |
| Auth | Firebase Auth (Google provider) |
| Database | Firebase Firestore (via Firebase Admin SDK on server) |
| State | Pinia (`store/index.ts` — user store) |
| Color mode | `@nuxtjs/color-mode` |
| Hosting | Vercel |

---

## Project Structure

```
my-blog-app/
├── assets/
│   └── css/
│       └── tailwind.css          # Tailwind entry + custom components, animations, prose overrides
├── components/
│   ├── Navbar.vue                # Fixed navbar — desktop nav + mobile hamburger + Topics accordion
│   ├── Header.vue                # Page hero header
│   ├── BlogHeader.vue            # Blog listing header
│   ├── BlogInner.vue             # Full article layout — header image, meta, body, mobile TOC, author footer
│   ├── TableOfContent.vue        # TOC with active-heading tracking (desktop sidebar + mobile panel)
│   ├── Footer.vue
│   ├── LikeBtn.vue               # Like toggle — calls /api/likes/*
│   ├── BlogShare.vue             # Social share buttons
│   ├── Comments.vue              # Comment thread — calls /api/comments/*
│   └── Alert.vue                 # Transient toast notifications
├── composables/
│   └── useCheckAuth.ts           # Auth state helper
├── content/
│   └── *.md                      # Blog post markdown files (frontmatter + body)
├── pages/
│   ├── index.vue                 # Blog listing
│   ├── about.vue
│   ├── blogs/[slug].vue          # Article view — SEO meta + BlogInner
│   ├── topic/[name].vue          # Topic-filtered listing
│   └── series/
│       ├── index.vue             # All series
│       └── [slug].vue            # Single series
├── plugins/
│   └── firebase.ts               # Firebase client init ($auth, $provider injected)
├── server/
│   ├── api/
│   │   ├── comments/
│   │   │   ├── [pid].ts          # GET comments for article
│   │   │   ├── post-comment.ts   # POST new comment
│   │   │   └── delete-comment.ts # DELETE comment
│   │   └── likes/
│   │       ├── [id].ts           # GET like count
│   │       └── like-blog.ts      # POST like toggle
│   ├── services/
│   │   └── firebase-admin.ts     # Firebase Admin SDK (server-only)
│   └── tsconfig.json
├── store/
│   └── index.ts                  # Pinia user store (name, photo, token, uid)
├── public/                       # Static assets (article images, favicon)
├── nuxt.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Article Frontmatter

Each `.md` file under `content/` supports these frontmatter fields:

```yaml
---
title: "Your Article Title"
abstract: "Short description for SEO and cards"
topic: "Vue"           # used for topic filtering
tags: "vue nuxt composition-api"   # space-separated
author: "Muneer Ahmed"
readingTime: "8 min read"
headerImage: "/BL-1001/header.jpg" # relative to /public
---
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Firebase client (public — safe to expose to browser)
NUXT_PUBLIC_FIREBASE_API_KEY=
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NUXT_PUBLIC_FIREBASE_PROJECT_ID=
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NUXT_PUBLIC_FIREBASE_SENDER_ID=
NUXT_PUBLIC_FIREBASE_APP_ID=
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin (private — server-side only, never exposed to client)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> `FIREBASE_PRIVATE_KEY` must include literal `\n` characters. Wrap it in double quotes in `.env`.
> Never commit `.env` — it is already in `.gitignore`.

For Vercel deployment, add all variables in **Project → Settings → Environment Variables**.

---

## Local Development

```bash
# 1. Clone
git clone https://github.com/muneer-ahmed-khan/nest-of-blogs.git
cd nest-of-blogs

# 2. Install dependencies
npm install

# 3. Copy env template and fill in values
cp .env.example .env

# 4. Start dev server (http://localhost:3000)
npm run dev
```

### Other scripts

```bash
npm run build      # Production build
npm run preview    # Preview production build locally
npm run generate   # Static site generation
```

---

## Key Patterns

- **`<script setup lang="ts">` everywhere** — Composition API, no Options API.
- **Server API routes** (`server/api/`) handle all Firestore reads/writes using Firebase Admin SDK — credentials never reach the client.
- **Pinia user store** — Google auth result is serialized to `localStorage` and rehydrated on mount; `userStore.setUser()` / `userStore.clearUser()` are the only mutation points.
- **`@nuxt/content`** — articles are queried with `queryContent()`. The `body.toc` field is used by `TableOfContent.vue` for heading navigation.
- **Mobile TOC** — `BlogInner.vue` renders a `lg:hidden` collapsible TOC panel above the article body; the sidebar TOC is hidden on mobile via CSS (`.toc { display: none }` at `max-width: 1023px`).
- **Mobile navbar Topics** — the Topics section in the mobile hamburger menu is a collapsible accordion (`topicsMobileOpen` ref), preventing the menu from becoming an unmanageable flat list.
- **Color mode** — `useColorMode()` from `@nuxtjs/color-mode`; toggled via `colorMode.preference`. Dark styles use the `dark:` Tailwind variant.
- **Design tokens** — teal (`#2dd4bf` dark / `#0d9488` light) and amber (`#fbbf24` / `#d97706`) are the primary palette; ocean-dark (`#040d10`) background.

---

## API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/comments/[pid]` | Fetch comments for article `pid` |
| `POST` | `/api/comments/post-comment` | Add a comment (requires auth token) |
| `DELETE` | `/api/comments/delete-comment` | Delete a comment (requires auth token) |
| `GET` | `/api/likes/[id]` | Get like count and user like status |
| `POST` | `/api/likes/like-blog` | Toggle like on an article (requires auth token) |

---

## Deployment

The app is deployed on **Vercel** via the Nuxt 3 Vercel preset.

1. Push to `main` — Vercel auto-deploys.
2. Ensure all environment variables are set in Vercel dashboard.
3. The `vercel.json` at the project root handles routing.

---

## Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit your changes with a clear message.
4. Open a pull request against `main` with a description of what changed and why.

---

## License

[MIT](LICENSE) — © Muneer Ahmed Khan
