# nest-of-blogs

A full-stack blog platform built with **Nuxt 3** — markdown-driven articles, Google authentication, Firestore-backed comments and likes, dark/light theming, and mobile-first layout.

**Live site:** [muneer-dev.vercel.app](https://muneer-dev.vercel.app/)

---

## What it does

Posts are plain Markdown files in `content/`. Drop a file in, and it becomes a fully rendered article with a table of contents, reading time, tags, header image, social share, like counter, and comment section — no database entries to manage for the content itself.

Authentication runs through Firebase with the Google provider. Comments and likes are stored in Firestore and accessed only through server-side API routes, so Firebase Admin credentials never leave the server.

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | Nuxt 3 — `<script setup>` + Composition API throughout |
| Language | TypeScript 5 |
| Content | `@nuxt/content` v2 — Markdown with frontmatter |
| Styling | Tailwind CSS v3 + `@tailwindcss/typography` |
| Icons | `@nuxt/icon` |
| Auth | Firebase Auth — Google provider |
| Database | Firestore via Firebase Admin SDK (server-side only) |
| State | Pinia — user store at `store/index.ts` |
| Theme | `@nuxtjs/color-mode` — class-based dark/light switching |
| Hosting | Vercel |

---

## Prerequisites

- **Node.js 20+** (the CI pipeline runs on Node 20 — match it locally to avoid surprises)
- **npm** (project uses `package-lock.json`, so stick with npm rather than yarn or pnpm)
- A **Firebase project** with Firestore and Google Auth enabled — you need both the client SDK config and a service account key for the Admin SDK

---

## Getting started

```bash
# Clone the repo
git clone https://github.com/muneer-ahmed-khan/nest-of-blogs.git
cd nest-of-blogs

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Open .env and fill in your Firebase credentials (see the section below)

# Start the dev server
npm run dev
```

The app runs at `http://localhost:3000`. Hot reload is on by default.

---

## Environment variables

Create a `.env` file at the project root. Use `.env.example` as the starting point.

```env
# Firebase client keys — these are bundled into the browser build
NUXT_PUBLIC_FIREBASE_API_KEY=
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NUXT_PUBLIC_FIREBASE_PROJECT_ID=
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NUXT_PUBLIC_FIREBASE_SENDER_ID=
NUXT_PUBLIC_FIREBASE_APP_ID=
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin SDK — server-side only, never sent to the client
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

A few things worth knowing:

- `NUXT_PUBLIC_*` variables are exposed to the browser. Everything else stays on the server.
- `FIREBASE_PRIVATE_KEY` must include literal `\n` sequences for the newlines inside the key — wrap the whole value in double quotes in `.env`.
- Get the client config from **Firebase Console → Project Settings → Your apps**.
- Get the Admin credentials from **Firebase Console → Project Settings → Service accounts → Generate new private key**.
- **Never commit `.env`** — it's already in `.gitignore`.

For Vercel deployments, add all variables in **Project → Settings → Environment Variables**.

---

## Available scripts

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Build for production (SSR)
npm run generate   # Build as a static site (.output/public)
npm run preview    # Preview the production build locally
npm run postinstall  # Run automatically after npm install — generates Nuxt types
```

---

## Project structure

```
nest-of-blogs/
├── assets/css/
│   └── tailwind.css          # Tailwind entry point — custom components, animations, prose overrides
├── components/
│   ├── Navbar.vue             # Fixed top navbar — auth state, dark mode toggle, mobile hamburger + Topics accordion
│   ├── Header.vue             # Generic page hero header
│   ├── BlogHeader.vue         # Header specific to the blog listing page
│   ├── BlogInner.vue          # Full article layout — header image, meta bar, body, mobile TOC, author footer
│   ├── TableOfContent.vue     # TOC with active-heading tracking; desktop sidebar + collapsible mobile panel
│   ├── Footer.vue
│   ├── LikeBtn.vue            # Like toggle button — calls /api/likes/*
│   ├── BlogShare.vue          # Social share buttons
│   ├── Comments.vue           # Comment thread — calls /api/comments/*
│   └── Alert.vue              # Toast notifications (transient, scoped to user feedback)
├── composables/
│   ├── useArticles.ts         # Query articles by topic or slug, compute reading time
│   ├── useCheckAuth.ts        # Read auth state from localStorage
│   ├── useGithubSeries.ts     # Fetch series posts from GitHub, 10-minute cache
│   └── useReducedMotion.ts    # Respect OS reduced-motion preference
├── content/
│   └── *.md                   # Blog post files — frontmatter + Markdown body
├── pages/
│   ├── index.vue              # Home — blog listing + GitHub series preview
│   ├── about.vue
│   ├── blogs/[slug].vue       # Article view — SEO meta, BlogInner component
│   ├── topic/[name].vue       # Topic-filtered article listing
│   └── series/
│       ├── index.vue          # All series
│       └── [slug].vue         # Single series article
├── plugins/
│   └── firebase.ts            # Firebase client init — injects $auth and $provider
├── server/
│   ├── api/
│   │   ├── comments/
│   │   │   ├── [pid].ts           # GET comments for an article
│   │   │   ├── post-comment.ts    # POST a new comment
│   │   │   └── delete-comment.ts  # DELETE a comment
│   │   └── likes/
│   │       ├── [id].ts            # GET like count + current user's like status
│   │       └── like-blog.ts       # POST toggle like (IP-based deduplication)
│   ├── services/
│   │   └── firebase-admin.ts      # Firebase Admin SDK — Firestore client (server-only)
│   └── tsconfig.json
├── store/
│   └── index.ts               # Pinia user store — name, photo URL, auth token, UID
├── public/                    # Static files served as-is — images, favicon, robots.txt
├── utils/
│   └── index.ts               # titleToSlug(), calculateReadTime()
├── app.vue                    # Root component — loading bar, Navbar, page outlet, Footer
├── nuxt.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## Writing a blog post

Create a `.md` file in `content/` with this frontmatter:

```yaml
---
title: "Your post title"
abstract: "One or two sentences — used on cards and for SEO description"
topic: "Vue"
tags: "vue nuxt composition-api"
author: "Muneer Ahmed"
readingTime: "8 min read"
headerImage: "/BL-1001/header.jpg"
---
```

- `topic` drives the `/topic/[name]` filter pages
- `tags` is space-separated
- `headerImage` is relative to `/public`

The slug is derived from the file name, so `my-first-post.md` → `/blogs/my-first-post`.

---

## API reference

These routes live in `server/api/` and run on the Nitro server. They use Firebase Admin to talk to Firestore — no client SDK credentials involved.

| Method | Path | What it does |
|---|---|---|
| GET | `/api/comments/[pid]` | Fetch all comments for article `pid` |
| POST | `/api/comments/post-comment` | Add a comment (requires auth token) |
| DELETE | `/api/comments/delete-comment` | Delete a comment (author or admin only) |
| GET | `/api/likes/[id]` | Get like count + whether current user has liked |
| POST | `/api/likes/like-blog` | Toggle like — deduplicates by hashed IP |

---

## Design system

Colors live in `tailwind.config.js` as `ocean` (dark) and `mist` (light) palettes. The main tokens:

- **Primary:** teal-400 `#2dd4bf` (dark) / teal-600 `#0d9488` (light)
- **Accent:** amber-400 `#fbbf24` (dark) / amber-600 `#d97706` (light)
- **Dark background:** `#040d10`
- **Light background:** `#d0ede8`

Fonts: **Space Grotesk** for headings, **Inter** for body text, **JetBrains Mono** for code.

Theme switching is class-based — `@nuxtjs/color-mode` adds a `dark` class to `<html>` and persists the preference. Use `useColorMode().preference` to read or change it.

---

## Deployment

The app deploys to Vercel automatically on every push to `master`. There is also a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds a static export and publishes it to GitHub Pages.

To deploy manually:

```bash
# For Vercel (SSR)
npm run build

# For static hosting
npm run generate
# Output lands in .output/public
```

---

## Contributing

Contributions, fixes, and suggestions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow — branch naming, commit style, and PR process.

If you find a security issue, please follow the process in [SECURITY.md](SECURITY.md) rather than opening a public issue.

---

## License

[MIT](LICENSE) — © 2025 Muneer Ahmed
