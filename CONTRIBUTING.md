# Contributing

Thanks for taking the time to contribute. Here's everything you need to know to get your changes in cleanly.

## Before you start

- Check the [open issues](https://github.com/muneer-ahmed-khan/nest-of-blogs/issues) to see if what you want to work on is already being tracked.
- For significant changes — new features, architectural shifts, large refactors — open an issue first and describe what you have in mind. It's much better to align before you write the code than after.
- Small fixes (typos, broken links, minor bugs) don't need an issue — just open a PR.

---

## Setting up locally

```bash
git clone https://github.com/muneer-ahmed-khan/nest-of-blogs.git
cd nest-of-blogs
npm install
cp .env.example .env
# Fill in your Firebase credentials
npm run dev
```

You'll need a Firebase project with Firestore and Google Auth enabled. See the [README](README.md#environment-variables) for the full list of variables and how to get them.

---

## Branch workflow

All changes go through pull requests. Direct pushes to `master` are restricted.

```bash
# Start from an up-to-date master
git checkout master
git pull origin master

# Create a branch
git checkout -b <type>/<short-description>
```

Branch naming examples:

| Prefix | When to use |
|---|---|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `refactor/` | Code changes that don't add features or fix bugs |
| `docs/` | Documentation only |
| `chore/` | Dependency bumps, config changes, CI tweaks |

---

## Commit messages

Write commits in the imperative — "add comment pagination" rather than "added comment pagination" or "adds comment pagination".

Keep the subject line under 72 characters. If you need to explain the why, add a blank line and a short body:

```
fix: prevent duplicate likes from the same IP

The hashed-IP check in like-blog.ts was only comparing against existing
documents but wasn't handling the edge case where Firestore hadn't flushed
the previous write yet. Added a short-circuit check before the query.
```

Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`) are preferred but not strictly enforced for now.

---

## Pull request checklist

Before opening a PR:

- [ ] `npm run build` completes without errors
- [ ] Any new Firestore queries go through `server/api/` — not directly from the client
- [ ] TypeScript errors are resolved (run `npx nuxi typecheck` to verify)
- [ ] New components follow the existing `<script setup lang="ts">` pattern
- [ ] If you added a new page, it uses `useSeoMeta` for Open Graph and canonical URL
- [ ] Environment variables, if added, are documented in `.env.example` and in the README

When writing the PR description, explain what the change does and why. If it's a visual change, a screenshot helps a lot.

---

## Code style

The project uses ESLint and Prettier. Run a check before pushing:

```bash
npx eslint . --ext .ts,.vue
```

A few conventions worth following:

- Use `<script setup lang="ts">` in every component — no Options API, no `defineComponent()`
- Content queries use `queryContent()` from `@nuxt/content`
- Theme reads go through `useColorMode()` — don't reach into the DOM for the `dark` class
- State mutations for the user session go through `useUserStore()` in `store/index.ts`
- No hardcoded strings where a type or composable already exists

---

## Project structure notes

- **`content/`** — Markdown files only. No logic here.
- **`server/api/`** — All Firestore reads and writes happen here via the Admin SDK. Client components fetch through these routes.
- **`composables/`** — Reusable composition functions. If a component needs the same logic as another, extract it here.
- **`utils/index.ts`** — Pure functions with no Vue dependencies.
- **`store/index.ts`** — Only the user session lives here. Don't add unrelated state.

---

## Reporting a bug

Open an issue and include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser and OS (for frontend issues)
- Any relevant console errors

If it's a security vulnerability, don't open a public issue — see [SECURITY.md](SECURITY.md).

---

## Questions

If something here is unclear or you're stuck on setup, open an issue with the `question` label and someone will follow up.
