# SEO and social sharing pass

## Goal

When `https://brivahamisi.tech` is shared on WhatsApp/LinkedIn/X/Slack/Facebook it should show the favicon, title, image and description reliably, and search engines should get a clean, consistent signal about who the site is for. Basic OG/Twitter tags exist (from `2026-09-11-social-preview-meta.md`); this pass fixes the gaps found while auditing them.

### Problems found

- `apple-touch-icon.png` is a white "Briva Hamisi" wordmark on a transparent background. iOS fills transparency with black and squashes the wordmark, so it reads poorly as an icon. There is also no 48px+ icon (Google Search only shows favicons that are a multiple of 48px) and no web app manifest.
- `<title>`, `name="title"`, `og:title` and `twitter:title` all say different things ("Web Developer & Designer" in one, "Communications Officer" in the others), and the description is generic.
- There is no `<link rel="canonical">`, `og:locale`, `twitter:site`/`twitter:creator` (`@hamisi_briva` already exists in the code), `og:image:type` or secure URL.
- There is no structured data (JSON-LD `Person` + `WebSite`), so Google can't connect the site to the GitHub/LinkedIn/Behance/Dribbble/Instagram/X/Pinterest profiles that are already linked in `src/`.
- There is no `robots.txt` and no `sitemap.xml`.
- The `/work/*` pages never set `document.title`, so every browser tab and every Google result for those pages reads like the homepage.
- `<noscript>` only says "enable JavaScript". It should give a crawler or no-JS visitor a short real summary with links.

## Files touched

- `public/index.html`: rewrite the `<head>` meta block and the `<noscript>` content.
- `public/robots.txt` (new): allow all, plus a `Sitemap:` line.
- `public/sitemap.xml` (new): `/`, `/work/development`, `/work/designs`, `/work/photography`.
- `public/site.webmanifest` (new): name, short_name, `void` theme/background colours, 192/512 icons.
- `public/apple-touch-icon.png` (regenerated), `public/icon-192.png` and `public/icon-512.png` (new), `public/favicon.ico` (regenerated with a 48px size added). All are generated from the same circular profile-photo mark that `favicon-32x32.png` already uses, placed on a `#08090a` background so they are opaque.
- `src/router/index.js`: add `meta: { title, description }` per route, plus a small `router.afterEach` that sets `document.title`, the description meta and the canonical `href`.
- `AGENTS.md`: update the line about "the `generateMetadata()`/`route.meta` scaffolding was removed" to describe this new, small per-route title setup, and record the SEO files.

## Approach

- **One consistent identity string.** Title: `Briva Hamisi | Software Engineer & Creative Designer`. Description (about 155 characters): "Portfolio of Briva Hamisi, a software engineer and full-stack developer who also works as a creative designer. Web and mobile projects, graphic design and photography." All the title tags and all the description tags (`description`, `og:`, `twitter:`) will use these same two strings.
- **Drop `meta name="keywords"`**, because Google ignores it. Drop the redundant `meta name="title"`.
- **Keep the existing `og-image.jpg`** (1200×630, a real photo, 82 KB, under WhatsApp's ~300 KB limit). Add `og:image:secure_url`, `og:image:type`, `og:locale=en_US` and `twitter:site`/`twitter:creator=@hamisi_briva`.
- **Add JSON-LD** as `<script type="application/ld+json">` with:
  - a `Person` (name, url, image, jobTitle, `sameAs` = the 7 profile URLs already in the code);
  - a `WebSite`.
  - It is non-executable, so the `script-src 'self'` CSP in `.htaccess`/`vercel.json` doesn't block it and no CSP change is needed.
- **Per-route titles** are client-side only. Google renders JS, so they help search results. Social scrapers do not run JS, so every shared link (including `/work/*`) keeps the homepage preview card. Giving each page its own card would need prerendering or SSR, which is out of scope for this static SPA (see below).
- **Domain:** keep `https://brivahamisi.tech` as canonical. It and `briva.co.ke` resolve to the same cPanel host. I couldn't fetch either domain over HTTPS from this environment, so I haven't verified which one serves the site live.

## Out of scope (suggestions only, not doing unless asked)

- A designed OG card (name and role set in type over the photo) instead of the plain photo crop.
- Build-time prerendering (e.g. `prerender-spa-plugin`) so each `/work/*` URL gets its own static `<head>` and a real 404 status.
- Submitting the sitemap in Google Search Console / Bing Webmaster Tools. This needs your account.

## Verification

- `npm run build` succeeds, and `dist/` contains `robots.txt`, `sitemap.xml`, `site.webmanifest`, the icons and the new `<head>`.
- Validate the JSON-LD by parsing it out of `dist/index.html`.
- `npm run serve`: confirm the tab title changes on `/`, `/work/development`, `/work/designs`, `/work/photography` and on a 404 page, and that the favicon shows.
- View the regenerated icons to confirm they are opaque and recognisable.
- After deploy (your step): paste the URL into opengraph.xyz, LinkedIn Post Inspector and the Facebook Sharing Debugger (which also clears cached previews), and check Google's Rich Results Test.
