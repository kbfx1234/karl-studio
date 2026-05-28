# Karl · Studio

Personal portfolio of **Karl (佳飞)** — autonomous driving engineer, embodied-AI explorer, father of one.

> *An engineer who builds machines that move.*
> *A father who learns from someone still learning to walk.*
> *Both, all the time.*

A single-page cinematic site: one big AI-painted scene, scroll-driven dolly zoom through five chapters of a small life.

---

## Tech

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** for design tokens & layout
- **GSAP 3.13** + **ScrollTrigger** + **SplitText** (all free since 3.13)
- **Lenis** for smooth inertial scroll
- **Google Fonts** — Inter / Fraunces / JetBrains Mono / Noto Sans SC

No build-time CMS. Copy lives in [`src/data/site.ts`](src/data/site.ts).

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
├── PLAN.md                      ← full design + animation rationale
├── docs/
│   └── ai-prompts.md            ← prompts used to generate the main scene
├── reference/                   ← annotated frame studies of the inspiration site
├── public/images/               ← main-stage.png + featured-placeholder.png
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Stage.tsx            ← single pinned cinematic stage
│   │   ├── Hero.tsx
│   │   ├── IdCard.tsx           ← hover-triggered hanging tag
│   │   ├── Manifesto.tsx
│   │   ├── Chapter.tsx          ← reused for all 5 chapters
│   │   ├── FeaturedWork.tsx
│   │   └── FooterCta.tsx
│   ├── data/site.ts             ← all copy, in one file
│   ├── lib/
│   │   ├── gsap.ts
│   │   └── lenis.tsx
│   └── styles/globals.css
└── …
```

## Deploy

This site is configured for Vercel out of the box:

```bash
npm i -g vercel
vercel             # follow the prompts; pick the karl-studio directory
vercel --prod      # ship it
```

Defaults:
- Build command: `npm run build`
- Output: `dist/`
- Long-term caching for `/images/*` and `/assets/*` (see `vercel.json`)

After the first deploy, in Vercel dashboard you can add `karl-studio.vercel.app` (or any custom domain).

## Accessibility & Performance

- All large images served as WebP with responsive `srcset` (1024w / 1920w / 3000w / 5000w). First-screen weight ~110 KB.
- The cinematic stage runs only on `(min-width: 1024px)` and only when `prefers-reduced-motion` is **not** set. On phones / reduced-motion users see a stacked-sections fallback.
- Lenis smooth-scroll is disabled on touch devices and for reduced-motion users.

## Inspiration

Inspired by the cinematic structure of **[ETHAN WANG · STUDIO](https://v.douyin.com/2kB1H0Ur7Uo/)** by 王十三. The story, copy, scene, and code are mine — the rhythm of *one big scene + scroll-as-narrative* is borrowed.

## License

MIT — see [LICENSE](LICENSE).
