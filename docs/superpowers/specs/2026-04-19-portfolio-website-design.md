# Jason Li Portfolio Website — Design

**Date:** 2026-04-19
**Status:** Approved (ready for implementation plan)
**Source spec:** `CLAUDE.md` in repo root + `references/cv.md`

## Goal

Build a single-page portfolio for Jason Li (AI Data Architect / Senior Data Scientist) on the existing TanStack Start scaffold, deployable to Vercel. Premium, scannable, dark-mode-default, fully responsive, Lighthouse > 95.

## Confirmed decisions (Q&A from brainstorming)

| #   | Decision                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | Single scroll page on `/`. Delete `src/routes/about.tsx`.                                                          |
| 2   | No "Download CV" button. Use a GitHub link in its place (Hero + Navbar).                                           |
| 3   | No `motion`/`framer-motion`. Use a `useInView` IntersectionObserver hook + Tailwind transitions for fade/slide-up. |
| 4   | About-section photo: SVG/CSS placeholder with initials `JL`. Swappable later.                                      |
| 5   | Contact: `mailto:` + LinkedIn/GitHub icons. No form.                                                               |
| 6   | Projects: show all CV bullets directly on cards. No "View Details" modal.                                          |

## Architecture

- **Framework:** Existing TanStack Start scaffold (built on Vite). No re-scaffold.
- **Routing:** Single route `/` (file: `src/routes/index.tsx`) composes all sections.
- **Styling:** Tailwind v4 + shadcn/ui (style: `new-york`, baseColor: `zinc`, already configured).
- **Theme:** Dark default, light supported via existing `ThemeToggle.tsx`. Default mode in `getInitialMode()` changes from `'auto'` to `'dark'`.
- **Animations:** No JS animation library. `useInView` hook + Tailwind utilities (`opacity-0 → opacity-100`, `translate-y-3 → translate-y-0`, `transition-all duration-300`).
- **Icons:** `lucide-react` (already installed).
- **Deployment:** Vercel, zero-config. TanStack Start auto-detected.

## File structure

```
src/
├── components/
│   ├── ui/                 ← shadcn (button, badge, card — added on demand)
│   ├── Header.tsx          ← rewritten: navbar with anchor links + GitHub + ThemeToggle
│   ├── Footer.tsx          ← rewritten: copyright + social icons
│   ├── ThemeToggle.tsx     ← keep behavior; default mode → 'dark'
│   ├── SectionHeading.tsx  ← shared kicker + h2 pattern
│   └── FadeIn.tsx          ← <FadeIn delay?>{children}</FadeIn>
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Research.tsx
│   ├── Awards.tsx
│   └── Contact.tsx
├── data/
│   ├── profile.ts          ← name, title, summary, email, social URLs
│   ├── skills.ts           ← grouped categories with items + lucide icon names
│   ├── experience.ts       ← roles array (company, title, dates, bullets)
│   ├── projects.ts         ← projects with category, badges, GitHub link
│   ├── research.ts
│   └── awards.ts           ← awards + publications (with DOI link for the META paper)
├── hooks/
│   └── useInView.ts        ← IntersectionObserver hook, returns [ref, inView]
├── lib/utils.ts            ← unchanged
├── routes/
│   ├── __root.tsx          ← updated meta (title, description, og); remove TanStack devtools branding optional
│   └── index.tsx           ← composes all <Section /> components
├── styles.css              ← rewritten palette + Inter font; keep shadcn @theme block
└── router.tsx              ← unchanged
```

**Files to delete:** `src/routes/about.tsx`.

**Files to leave untouched:** `package.json`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `prettier.config.js`, `components.json`, `router.tsx`, `lib/utils.ts`.

## Visual design

**Color palette (dark mode, default):**

- Background base: deep navy `#0A0F1C` → near-black `#05080F` gradient
- Surface (cards): `rgba(255, 255, 255, 0.03)` with `border: rgba(255, 255, 255, 0.08)`
- Primary accent: cyan `#06B6D4` (Tailwind `cyan-500`)
- Secondary accent: blue `#3B82F6` (Tailwind `blue-500`)
- Text primary: `#E2E8F0` (slate-200)
- Text muted: `#94A3B8` (slate-400)

**Color palette (light mode):**

- Background: `#F8FAFC` (slate-50) → white gradient
- Surface: white with `border: rgba(0, 0, 0, 0.06)`
- Same cyan/blue accents, darker shades for AA contrast (`cyan-600`, `blue-600`)
- Text: `#0F172A` (slate-900) / `#475569` (slate-600)

**Typography:** Inter (Google Fonts via `@import url(...)` at top of `styles.css`). Weights 400/500/600/700/800. Replace existing Manrope + Fraunces fully.

**Background detail:** Very subtle CSS-only grid pattern (1px lines, 28×28 px, ~6% opacity) layered with a radial cyan glow in the hero area. No image assets required.

## Section-by-section content

### 1. Hero (`#hero`)

- Full-viewport min-height (`min-h-[90vh]`).
- `<h1>` "LI KWAN HO JASON" — Inter 800, large clamp-sized (clamp(2.5rem, 6vw, 5rem)).
- Subtitle "AI Data Architect | Senior Data Scientist" — gradient cyan→blue text.
- Summary paragraph (CV summary verbatim, with `**Agentic AI**`, `**LLM integration**`, `**40% cost reduction**` styled in accent color).
- CTAs (shadcn Button):
  - Primary: "View Projects" → `#projects`
  - Secondary: "Contact Me" → `#contact`
  - Icon ghost: GitHub link → `https://github.com/jasonli0226`
- Background: radial cyan glow + grid pattern.

### 2. About (`#about`)

- 2-column desktop / stacked mobile.
- Left: 256×256 rounded square with gradient cyan→blue fill, big serif "JL" centered. Class `bg-gradient-to-br from-cyan-500 to-blue-600`.
- Right: bio paragraph (CV summary + International collaborator sentence).

### 3. Skills (`#skills`)

- 2×2 responsive grid (1 col mobile, 2 col tablet+).
- Categories (verbatim from CV):
  - **AI Data Architecture & GenAI** — icon: `Sparkles`
  - **MLOps & Cloud Infrastructure** — icon: `Cloud`
  - **Data Governance & Enterprise** — icon: `Shield`
  - **Programming & Tools** — icon: `Code2`
- Each item rendered as a shadcn `Badge` (variant `outline` with cyan hover ring).

### 4. Experience (`#experience`)

- Vertical timeline with left-side rail (`absolute` line + dots).
- 3 role cards (most recent first): XTRA Sensing → Tecky Academy → Myndar Co.
- Each card shows: role · company · dates · bullets (CV verbatim, 2–3 strongest per role).

### 5. Projects (`#projects`)

- Two subsections with kicker headings:

  **LLM, Agentic & Autonomous AI**
  - **Clawix** — full-width feature card. Cyan accent border (`border-cyan-500/30`), prominent GitHub button. Three CV bullets verbatim. Tech badges: `TypeScript`, `Docker`, `Multi-Agent`, `RBAC`, `LLM`, `MCP`.
  - **EAI-Powered Psychological Analysis Platform** — 2-col card. Both CV bullets. Badges: `Next.js`, `FastAPI`, `PostgreSQL`, `MinIO`, `Whisper`, `Computer Vision`.
  - **Sales Data Chatbot (Telegram)** — 2-col card. CV bullet. Badges: `Python`, `LLM`, `Telegram`.

  **AIoT & Predictive Maintenance**
  - **Industrial Machine Vibration Analysis (Multi-Modal Transformer)** — card with `Best Paper Award` badge. Badges: `PyTorch`, `Transformer`, `EMD`, `GAF`, `IoT`.
  - **LUCID (XAI for PCA-Reduced Feature Spaces)** — card with `HKIE 2026` badge. Badges: `XAI`, `SHAP`, `PCA`, `Explainability`.

### 6. Research (`#research`)

- 3-col grid (1 col mobile), smaller cards, no badges.
- Multivariate Time Series (WPI USA) · Data In-painting (MSc) · Image Captioning (FYP).

### 7. Awards (`#awards`)

- 2-col layout: Awards left (6 items as a clean list with year), Publications right (2 items, DOI link for META paper).

### 8. Contact (`#contact`)

- Centered. Large primary button: "Email me" → `mailto:jasonli72016@gmail.com`.
- Below: 3 icon links (Mail, Linkedin, Github) — `48px` clickable areas.

### Footer

- Copyright `© 2026 Li Kwan Ho Jason`.
- Social icons row.
- Remove "Built with TanStack Start" tag.

## Header / Nav

- Sticky top, transparent → translucent on scroll (existing pattern works).
- Left: text logo "Jason Li" with cyan accent dot.
- Center/Right: anchor links (Home, About, Experience, Projects, Skills, Awards, Contact) — each scrolls smoothly to its `id`.
- Right cluster: GitHub icon link · ThemeToggle.
- Mobile: hamburger menu — simple disclosure (`useState` open/close + slide-down panel), no extra shadcn dep.

## Data shapes

```ts
// data/profile.ts
export const profile = {
  name: 'Li Kwan Ho Jason',
  title: 'AI Data Architect | Senior Data Scientist',
  summary: '...verbatim from CV...',
  subtitle: '...verbatim from CV...',
  email: 'jasonli72016@gmail.com',
  links: {
    github: 'https://github.com/jasonli0226',
    linkedin: 'https://www.linkedin.com/in/jasonli0226',
  },
} as const

// data/projects.ts
type Project = {
  title: string
  category: 'agentic' | 'aiot'
  bullets: string[]
  badges: string[]
  github?: string
  award?: string
  featured?: boolean
}
```

## Animation approach

- `useInView(options?)` returns `[ref, inView]`. IntersectionObserver, `threshold: 0.15`, `rootMargin: '0px 0px -10% 0px'`, `once: true`.
- `<FadeIn delay={0|100|200|300}>` wraps a child in a div with `useInView`. Applies `opacity-0 translate-y-3` initially, transitions to `opacity-100 translate-y-0` over `300ms` when in view. Tailwind classes only.
- Staggering: section heading `delay-0`, body `delay-100`, secondary content `delay-200`.

## SEO / meta

In `__root.tsx`:

- `<title>Jason Li – AI Data Architect | Senior Data Scientist</title>`
- `<meta name="description" content="..." />` — first sentence of CV summary
- `<meta property="og:title" />`, `<meta property="og:description" />`
- `<html lang="en">` already set.

## Vercel deployment

- TanStack Start auto-detected by Vercel (uses the official Vercel preset under the hood).
- Steps to deploy:
  1. Push repo to GitHub.
  2. In Vercel dashboard, click "Add New → Project", import the repo.
  3. Framework preset: leave as auto-detected. Build command: `pnpm build`. Output: auto.
  4. Deploy. Custom domain optional.
- No `vercel.json` needed.

## Testing scope

Per project rules (80% coverage target), but content components are mostly static markup. Practical scope:

- **Unit:** `useInView` hook (mock IntersectionObserver), data shape exports (snapshot), `cn()` util untouched.
- **Component:** Render smoke tests for each section (renders without error, shows expected headings/data).
- **No E2E** for v1 (no critical interactive flows beyond anchor scrolling and theme toggle).

## Out of scope

- CV PDF download
- Contact form / Formspree
- Project detail modals or "show more" interaction
- Blog or CMS integration
- Custom domain configuration (left to deploy time)
- Analytics
- i18n
- Playwright E2E tests
- Real headshot photo (placeholder used; user drops file later)

## Implementation order (for the plan)

1. Update `styles.css`: palette, Inter font, remove sea/lagoon vars.
2. Update `__root.tsx`: meta tags, default-dark theme bootstrap.
3. Update `ThemeToggle.tsx`: default mode `'dark'`.
4. Add `hooks/useInView.ts` and `components/FadeIn.tsx`.
5. Add `components/SectionHeading.tsx`.
6. Add shadcn `button`, `badge`, `card`.
7. Build all `data/*.ts` files from CV.
8. Rewrite `Header.tsx` and `Footer.tsx`.
9. Build each `sections/*.tsx` (Hero → Contact).
10. Rewrite `routes/index.tsx` to compose sections.
11. Delete `routes/about.tsx`.
12. Run lint + typecheck + tests + Lighthouse check on `pnpm preview`.
13. Commit and document Vercel deploy steps.
