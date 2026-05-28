# Karl · Studio

> [karl-studio.vercel.app](https://karl-studio.vercel.app)

Personal portfolio of **Karl (佳飞)** — autonomous driving engineer, embodied-AI explorer, father of one.

> *An engineer who builds machines that move.*
> *A father who learns from someone still learning to walk.*
> *Both, all the time.*

A single-page cinematic site: one large AI-painted scene, scroll-driven dolly zoom through five chapters of a small life.

---

## Tech

- **Vite 6 + React 18 + TypeScript**
- **Tailwind CSS** for design tokens & layout
- **GSAP 3.13** — `ScrollTrigger` + `SplitText` (both free since 3.13)
- **Lenis** for smooth inertial scroll
- **Google Fonts** — Inter / Fraunces / JetBrains Mono / Noto Sans SC

All copy lives in [`src/data/site.ts`](src/data/site.ts) — edit there to change the site's text.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5174
npm run build
npm run preview
```

## Project layout

```
karl-studio/
├── public/images/         ← responsive WebP variants (1024 / 1920 / 3000 / 5000w)
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── StageBackground.tsx  ← fixed full-viewport image, dolly-zoomed by Stage
│   │   ├── Stage.tsx            ← pinned 600vh cinematic stage; mobile fallback
│   │   ├── Hero.tsx
│   │   ├── IdCard.tsx           ← hover-triggered hanging ID tag with pendulum
│   │   ├── Manifesto.tsx
│   │   ├── Chapter.tsx          ← shared template for all 5 chapters
│   │   ├── FeaturedWork.tsx     ← gated by site.featured.enabled
│   │   └── FooterCta.tsx
│   ├── data/site.ts             ← all copy, in one file
│   ├── hooks/useMediaQuery.ts
│   ├── lib/
│   │   ├── gsap.ts              ← plugin registration
│   │   └── lenis.tsx            ← smooth-scroll provider (desktop, non-touch only)
│   └── styles/globals.css
├── vercel.json                  ← deploy config + long-term asset caching
├── tailwind.config.ts
└── vite.config.ts
```

## Deploy

This site is configured for **Vercel** out of the box. Push to `main` and Vercel rebuilds automatically.

```bash
# first time
npm i -g vercel
vercel              # link the directory, pick defaults
vercel --prod
```

Defaults:
- Build: `npm run build`
- Output: `dist/`
- Long-term caching for `/images/*` and `/assets/*` (see `vercel.json`)

## Accessibility & performance

- Large images served as **WebP** with responsive `srcset` (1024 / 1920 / 3000 / 5000w). First-screen weight ~110 KB.
- The pinned cinematic stage runs only on `(min-width: 1024px)` **and** only when the user has **not** opted into `prefers-reduced-motion`. Phones and reduced-motion users see a stacked-sections fallback.
- Lenis smooth-scroll is disabled on touch devices and for reduced-motion users — native momentum is better there anyway.

## Inspiration

Site rhythm — one big scene + scroll-as-narrative — is inspired by **[ETHAN WANG · STUDIO](https://v.douyin.com/2kB1H0Ur7Uo/)** by 王十三. The story, copy, scene, and code are mine.

## License

MIT — see [LICENSE](LICENSE).
