# Security Policy

## Reporting a vulnerability

If you find a security issue in this project, please don't open a public GitHub issue. Public disclosure before a fix is in place puts everyone using the project at risk.

Instead, send a private report by emailing the maintainer directly. You can find the contact on the [GitHub profile](https://github.com/muneer-ahmed-khan).

Include as much detail as you can:

- A description of the vulnerability and what it affects
- Steps to reproduce (a proof-of-concept is very helpful)
- The potential impact — what an attacker could do if they exploited it
- Any suggested fix if you have one

---

## What to expect

You'll receive an acknowledgment within a few days. After that, the maintainer will investigate, work on a fix, and keep you in the loop on the timeline. Once a patch is released, the vulnerability will be disclosed publicly with credit to the reporter (unless you prefer to stay anonymous).

---

## Things worth noting about this project

A few areas where security is particularly relevant:

- **Firebase credentials** — The `NUXT_PUBLIC_FIREBASE_*` variables are intentionally public (they're in the browser bundle). The Admin SDK credentials (`FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`) must never be exposed. If you think you've found a way to extract server-side credentials from the client, that's a critical issue.
- **Comment and like routes** — These routes authenticate users via Firebase ID tokens. If you find a way to bypass authentication or manipulate another user's data through these endpoints, please report it.
- **Content sanitization** — Series content fetched from GitHub is parsed and sanitized with DOMPurify before rendering. Any XSS bypass through this path is worth reporting.

---

## Out of scope

The following are not considered vulnerabilities for this project:

- Issues in third-party services (Firebase, Vercel, GitHub) — report those to the respective vendors
- Missing rate limiting on public read endpoints
- Self-XSS (attacks that require tricking the victim into running code themselves)
- Theoretical issues without a working proof of concept
