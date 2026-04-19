# Portfolio UI Refresh — Design Spec

**Date:** 2026-04-19
**Status:** Approved
**Author:** Jason Li (brainstormed with Claude)

## 1. Intent

Make the portfolio read as **"modern, AI/tech-forward"** within the first three seconds — the impression a recruiter should form before scrolling. The bar is "frontier AI" (Anthropic, OpenAI, Vercel marketing pages) without tipping into cliché ("particle neural-network" aesthetic) or design-portfolio territory that undercuts the senior-architect positioning.

## 2. Scope

In scope:

- Theme system refinements (dark-default + polished light mode).
- Hero background replacement with an aurora/gradient-mesh backdrop.
- Moderate motion layer across the site: nav blur-on-scroll, parallax, staggered reveals, flagship project card treatment.
- Introduction of `framer-motion` as the motion primitive.

Out of scope (explicit non-goals):

- Scramble-text hero name.
- Magnetic buttons.
- Animated numeric counters.
- Scroll-linked hero fade-out.
- Interactive particle networks.
- Content changes (copy, project list, section structure).

## 3. Theme system

- **Dark remains default.** Both modes are first-class — both polished, both walked through during manual validation.
- Theme toggle continues to persist in `localStorage` (existing `ThemeToggle` component retained).
- Token pass in `src/index.css`:
  - **Dark:** deep navy/near-black surface, cyan primary. Aurora palette — cyan, sky-blue, indigo, violet, magenta — used **only** on the hero backdrop, never in text or UI chrome.
  - **Light:** off-white surface, cyan primary darkened for AA contrast against the light background. Aurora blobs desaturated to pastel plus a soft white radial wash so text stays legible.

## 4. Aurora hero background

- New component: `src/components/AuroraBackdrop.tsx`.
- Mounted behind `Hero` content: `position: absolute; inset: 0; -z-10; pointer-events: none; aria-hidden`.
- **4–5 large, blurred radial-gradient blobs** (cyan, sky-blue, indigo, violet, magenta) layered at differing opacities.
- Slow drift via CSS `@keyframes` translating each blob on independent 18–30s loops. No per-frame JS.
  - `will-change: transform`, `transform: translate3d(...)` for GPU compositing.
- Grain overlay: one small SVG noise texture at ~4% opacity over the blobs to kill banding on cheap displays.
- **Light-mode variant:** same blob composition, lower saturation/opacity, plus white radial wash.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` freezes drift, keeps the static composition.
- Replaces the inline radial gradient currently at `src/sections/Hero.tsx:12-19`.

## 5. Motion scope (Moderate / Level B)

**Library:** add `framer-motion`. Keep the existing `FadeIn` component contract, but reimplement it on top of `motion.div` + `whileInView` so the site has one motion primitive.

**Motion inventory:**

| Element | Behavior | Implementation notes |
|---|---|---|
| Sticky nav | Transparent at top; gains `backdrop-blur` + subtle border-bottom after 40px of scroll | New `useScrolled(threshold)` hook |
| Aurora parallax | Blobs drift 8–15% slower than scroll | `useScroll` + `useTransform` inside `AuroraBackdrop` |
| Section entry | Fade + small upward translate on first viewport entry | `FadeIn` reimplementation, `whileInView`, `once: true` |
| Experience timeline | Each role card slides in from left with 100ms stagger | `whileInView` + `transition.delay` per index |
| Skills tags | Staggered fade-in, 30ms between chips | Parent `staggerChildren` |
| Project cards | Hover lift (`translateY(-4px)`) + soft cyan glow | CSS transitions; Framer Motion not required for hover |
| **Clawix card (flagship)** | Permanent animated gradient border — conic-gradient rotating on a 6s loop | Pseudo-element with `background: conic-gradient(...)` + `animation: spin 6s linear infinite` |
| Buttons | Scale-on-press (`0.97`) | Existing shadcn hover retained |

**Accessibility:** every item above respects `prefers-reduced-motion: reduce`:

- Transitions snap to end state.
- Aurora drift freezes.
- Clawix gradient-border animation freezes (border still visible, just static).

## 6. Component & file impact

**New files:**

- `src/components/AuroraBackdrop.tsx` — blob composition + noise overlay + parallax wiring.
- `src/components/ProjectCard.tsx` — extracted card; accepts `variant?: 'default' | 'flagship'`. Flagship variant renders the animated gradient border.
- `src/hooks/useScrolled.ts` — returns `boolean` indicating scroll past a given threshold. Single responsibility; listens to `scroll` with a passive listener.

**Modified files:**

- `src/index.css` — aurora color tokens (light + dark), blob keyframes, reduced-motion guards.
- `src/components/Header.tsx` — consume `useScrolled` for blur-on-scroll.
- `src/components/FadeIn.tsx` — reimplement on `motion.div` + `whileInView`.
- `src/sections/Hero.tsx` — replace inline radial gradient (lines 12–19) with `<AuroraBackdrop />`.
- `src/sections/Experience.tsx` — staggered slide-in per role.
- `src/sections/Skills.tsx` — staggered chip reveal.
- `src/sections/Projects.tsx` — swap inline markup for `<ProjectCard />`; pass `variant="flagship"` for Clawix.
- `package.json` — add `framer-motion`.

## 7. Validation

Automated tests are deferred for this build stage — no unit or component tests are written as part of this work. Validation is manual via the dev server:

- `npm run dev`, walk through both themes.
- Verify reduced-motion behavior in devtools.
- Check mobile viewport rendering and touch interactions.

## 8. Risks & mitigations

- **Perf on low-end mobile:** 4–5 large blurred gradients + backdrop-blur nav is not free. Mitigation: keep blob count ≤5, cap blur radius, test on a throttled mobile profile before shipping.
- **Light-mode legibility:** aurora blobs can wash out text if not tuned. Mitigation: a dedicated light-mode radial wash layer, and a QA pass on hero contrast ratios.
- **Motion fatigue:** combining parallax + staggered reveals + animated flagship border can feel busy. Mitigation: the "out of scope" list above is the discipline that keeps this at Level B, not Level C.

## 9. Success criteria

- Hero reads as "frontier AI" in both themes without any text/UI chrome taking on violet/magenta.
- Clawix card is unmistakably the flagship on first glance.
- Lighthouse performance score stays >95 desktop (CLAUDE.md target), >90 on throttled mobile. Motion work must not regress desktop below this bar.
- `prefers-reduced-motion` users get a fully static, fully usable experience.
- Nav blur-on-scroll, parallax, and staggered reveals all present and feel coordinated, not independently ticking.
