# Bryce Koning — Better Work by Design

> **I connect people, process, and technology to make complex operations feel clear—and work better in the real world.**

[Homepage](https://brycek.me/) · [Selected work](https://brycek.me/projects.html) · [LinkedIn](https://linkedin.com/in/brycek) · [GitHub](https://github.com/bk-007)

## What this site is

A cinematic, product-story portfolio about manufacturing operations, quality systems, people development, data, and practical technology. The design uses an intentionally restrained black, white, and blue system with oversized typography, full-bleed photography, spatial UI compositions, and scroll-responsive motion.

The personal portrait has been removed. Contextual manufacturing and technology photography now carries the visual story.

## Experience

- Responsive homepage and eight-case-file project archive
- Mobile-first layouts with large tap targets and zero horizontal overflow
- Scroll-responsive hero depth, image movement, and staged reveals
- Reduced-motion support and keyboard-visible focus states
- Responsive source-hosted photography with mobile-sized variants
- Custom Open Graph card for social sharing
- Static HTML, CSS, and JavaScript with a Vite/Cloudflare production build

## Photography

The contextual images are used under their source platforms’ free-use licenses:

- [ThisIsEngineering / Pexels](https://www.pexels.com/photo/engineers-in-workshop-3862619/)
- [Sven Daniel / Unsplash](https://unsplash.com/photos/a-close-up-of-a-machine-DV_rG1mjDxs)
- [Luke Chesser / Unsplash](https://unsplash.com/photos/graphs-of-performance-analytics-on-a-laptop-screen-JKUTrJ4vK00)
- [Lilian Do Khac / Unsplash](https://unsplash.com/photos/robotic-arms-assembling-a-car-chassis-on-a-factory-line-EyqUxJuOb1Q)

## Run locally

The source can still be served as a plain static site:

```powershell
python -m http.server 8000
```

For the production build:

```powershell
pnpm install
pnpm run build
```

The production artifact is emitted to `dist/` with a Cloudflare Worker-compatible ESM entrypoint and OpenAI Sites metadata.

## Publish from GitHub

The displayed photography is loaded directly from the attributed Pexels and Unsplash image CDNs, with smaller responsive variants for phones. The deployed pages no longer depend on a separate `images/` directory, so GitHub's web uploader cannot accidentally omit the visible media.

## Confidentiality

The case files are intentionally generalized. Employer information, manufacturing data, product details, and internal process specifics remain confidential.
