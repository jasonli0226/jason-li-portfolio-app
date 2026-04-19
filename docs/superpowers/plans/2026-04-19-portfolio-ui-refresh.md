# Portfolio UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the portfolio UI to a "frontier AI" aesthetic — aurora-blob hero backdrop, blur-on-scroll nav, scroll-driven parallax, staggered section reveals, and an animated gradient border marking Clawix as the flagship project — while keeping dark/light theme toggle polished.

**Architecture:** Introduce `framer-motion` as the single motion primitive. Replace the hero's inline radial gradient with a new `<AuroraBackdrop />` component that renders 5 large blurred blobs drifting on independent CSS keyframe loops with scroll-linked parallax. Extract `useScrolled` and `ProjectCard` for reuse. All motion respects `prefers-reduced-motion: reduce`.

**Tech Stack:** React 19 + TypeScript, Tailwind v4, shadcn-ui, Framer Motion (new), existing custom `FadeIn` reimplemented on top of `motion.div`.

**Testing note:** Per user instruction, automated tests are deferred for this build stage. Each task ends with manual validation in the dev server and a commit.

**Reference spec:** `docs/superpowers/specs/2026-04-19-portfolio-ui-refresh-design.md`

---

## Task 1: Install framer-motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install**

Run:
```bash
npm install framer-motion
```

Expected: adds `framer-motion` to `dependencies` in `package.json`; updates `package-lock.json`.

- [ ] **Step 2: Verify build still passes**

Run:
```bash
npm run build
```

Expected: build succeeds without errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion dependency"
```

---

## Task 2: Add aurora color tokens and keyframes to styles.css

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add aurora tokens to `:root` (light mode)**

In `src/styles.css`, inside the `:root { ... }` block (ends around line 47, just before the closing brace), add these lines just before the closing `}`:

```css
  /* Aurora hero backdrop tokens (light) */
  --aurora-blob-1: rgba(14, 165, 233, 0.28);   /* sky-blue */
  --aurora-blob-2: rgba(34, 211, 238, 0.24);   /* cyan */
  --aurora-blob-3: rgba(99, 102, 241, 0.18);   /* indigo */
  --aurora-blob-4: rgba(168, 85, 247, 0.14);   /* violet */
  --aurora-blob-5: rgba(236, 72, 153, 0.12);   /* magenta */
  --aurora-wash: rgba(255, 255, 255, 0.55);
  --aurora-noise-opacity: 0.035;
```

- [ ] **Step 2: Add aurora tokens to `.dark` (dark mode)**

In `src/styles.css`, inside the `.dark { ... }` block, add just before its closing `}`:

```css
  /* Aurora hero backdrop tokens (dark) */
  --aurora-blob-1: rgba(34, 211, 238, 0.38);   /* cyan */
  --aurora-blob-2: rgba(59, 130, 246, 0.30);   /* blue */
  --aurora-blob-3: rgba(129, 140, 248, 0.26);  /* indigo */
  --aurora-blob-4: rgba(168, 85, 247, 0.24);   /* violet */
  --aurora-blob-5: rgba(236, 72, 153, 0.20);   /* magenta */
  --aurora-wash: rgba(5, 8, 15, 0.1);
  --aurora-noise-opacity: 0.05;
```

- [ ] **Step 3: Append aurora keyframes + utility classes + Clawix border keyframe at the bottom of `styles.css`**

Append to the end of `src/styles.css`:

```css
/* ----- Aurora backdrop ----- */
@keyframes aurora-drift-a {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(6%, 4%, 0) scale(1.08); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes aurora-drift-b {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(-5%, 6%, 0) scale(1.12); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes aurora-drift-c {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(4%, -5%, 0) scale(0.95); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes aurora-drift-d {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(-6%, -4%, 0) scale(1.1); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes aurora-drift-e {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(3%, 5%, 0) scale(1.05); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}

.aurora-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

@media (prefers-reduced-motion: reduce) {
  .aurora-blob {
    animation: none !important;
  }
}

/* ----- Flagship gradient border (Clawix) ----- */
@keyframes flagship-border-spin {
  to { transform: rotate(1turn); }
}

@media (prefers-reduced-motion: reduce) {
  .flagship-border::before {
    animation: none !important;
  }
}
```

- [ ] **Step 4: Start dev server and eyeball hero still renders**

Run:
```bash
npm run dev
```

Expected: dev server starts on port 3000; existing hero still renders (no visual change yet — tokens are unused). Kill the server with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add src/styles.css
git commit -m "style: add aurora backdrop color tokens and keyframes"
```

---

## Task 3: Create AuroraBackdrop component

**Files:**
- Create: `src/components/AuroraBackdrop.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/AuroraBackdrop.tsx` with:

```tsx
const BLOBS = [
  {
    token: 'var(--aurora-blob-1)',
    animation: 'aurora-drift-a 22s ease-in-out infinite',
    style: { top: '-10%', left: '-10%', width: '52%', height: '55%' },
  },
  {
    token: 'var(--aurora-blob-2)',
    animation: 'aurora-drift-b 26s ease-in-out infinite',
    style: { top: '-5%', right: '-15%', width: '50%', height: '60%' },
  },
  {
    token: 'var(--aurora-blob-3)',
    animation: 'aurora-drift-c 30s ease-in-out infinite',
    style: { top: '30%', left: '20%', width: '45%', height: '45%' },
  },
  {
    token: 'var(--aurora-blob-4)',
    animation: 'aurora-drift-d 24s ease-in-out infinite',
    style: { bottom: '-20%', right: '5%', width: '55%', height: '55%' },
  },
  {
    token: 'var(--aurora-blob-5)',
    animation: 'aurora-drift-e 28s ease-in-out infinite',
    style: { bottom: '-10%', left: '-5%', width: '40%', height: '45%' },
  },
] as const

export default function AuroraBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="aurora-blob"
          style={{
            ...blob.style,
            background: blob.token,
            animation: blob.animation,
          }}
        />
      ))}
      {/* Theme-aware wash softens blobs in light mode and deepens contrast in dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, var(--aurora-wash), transparent 70%)',
        }}
      />
      {/* Noise overlay to kill gradient banding */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 'var(--aurora-noise-opacity)',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify typecheck passes**

Run:
```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AuroraBackdrop.tsx
git commit -m "feat: add AuroraBackdrop component with drifting blurred blobs"
```

---

## Task 4: Swap Hero's inline gradient for AuroraBackdrop

**Files:**
- Modify: `src/sections/Hero.tsx`

- [ ] **Step 1: Replace the inline gradient div with AuroraBackdrop**

In `src/sections/Hero.tsx`, replace lines 12–19 (the `<div aria-hidden ...>` block that applies the single radial gradient) and the `import FadeIn` line's neighbors with the new import + component use.

Final file content of `src/sections/Hero.tsx` should be:

```tsx
import { Github } from 'lucide-react'
import { Button } from '../components/ui/button'
import AuroraBackdrop from '../components/AuroraBackdrop'
import FadeIn from '../components/FadeIn'
import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-4 pt-24 pb-20 sm:pt-32 sm:pb-28"
    >
      <AuroraBackdrop />
      <div className="page-wrap">
        <FadeIn>
          <p className="kicker mb-4">Portfolio</p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="mt-4 text-lg font-semibold gradient-text sm:text-2xl">
            {profile.title}
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-soft)] sm:text-lg">
            {profile.summary}
          </p>
        </FadeIn>
        <FadeIn delay={400}>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            {profile.subtitle}
          </p>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Contact Me</a>
            </Button>
            <Button asChild variant="ghost" size="lg" aria-label="GitHub">
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Start dev server and visually validate both themes**

Run:
```bash
npm run dev
```

Expected: hero shows drifting aurora blobs; both light mode and dark mode look correct (toggle via theme toggle); text remains legible. Kill the server with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Hero.tsx
git commit -m "feat: swap hero inline gradient for AuroraBackdrop"
```

---

## Task 5: Add scroll-linked parallax to AuroraBackdrop

**Files:**
- Modify: `src/components/AuroraBackdrop.tsx`

- [ ] **Step 1: Rewrite AuroraBackdrop to apply scroll parallax with framer-motion**

Replace the contents of `src/components/AuroraBackdrop.tsx` with:

```tsx
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const BLOBS = [
  {
    token: 'var(--aurora-blob-1)',
    animation: 'aurora-drift-a 22s ease-in-out infinite',
    style: { top: '-10%', left: '-10%', width: '52%', height: '55%' },
    parallax: 0.08,
  },
  {
    token: 'var(--aurora-blob-2)',
    animation: 'aurora-drift-b 26s ease-in-out infinite',
    style: { top: '-5%', right: '-15%', width: '50%', height: '60%' },
    parallax: 0.12,
  },
  {
    token: 'var(--aurora-blob-3)',
    animation: 'aurora-drift-c 30s ease-in-out infinite',
    style: { top: '30%', left: '20%', width: '45%', height: '45%' },
    parallax: 0.06,
  },
  {
    token: 'var(--aurora-blob-4)',
    animation: 'aurora-drift-d 24s ease-in-out infinite',
    style: { bottom: '-20%', right: '5%', width: '55%', height: '55%' },
    parallax: 0.15,
  },
  {
    token: 'var(--aurora-blob-5)',
    animation: 'aurora-drift-e 28s ease-in-out infinite',
    style: { bottom: '-10%', left: '-5%', width: '40%', height: '45%' },
    parallax: 0.1,
  },
] as const

export default function AuroraBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  // One hook call per blob, in a fixed order — complies with Rules of Hooks.
  const y0 = useTransform(scrollY, (v) => v * BLOBS[0].parallax)
  const y1 = useTransform(scrollY, (v) => v * BLOBS[1].parallax)
  const y2 = useTransform(scrollY, (v) => v * BLOBS[2].parallax)
  const y3 = useTransform(scrollY, (v) => v * BLOBS[3].parallax)
  const y4 = useTransform(scrollY, (v) => v * BLOBS[4].parallax)
  const yValues = [y0, y1, y2, y3, y4]

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="aurora-blob"
          style={{
            ...blob.style,
            background: blob.token,
            animation: shouldReduceMotion ? 'none' : blob.animation,
            y: shouldReduceMotion ? 0 : yValues[i],
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, var(--aurora-wash), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: 'var(--aurora-noise-opacity)',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
```

Notes on why this shape: `useTransform` must be called unconditionally and in a consistent order. Calling it inside `.map()` would violate Rules of Hooks if `BLOBS.length` ever changed. Hard-coding 5 calls is fine because blob count is fixed by design.

- [ ] **Step 2: Start dev server, scroll, verify parallax**

Run:
```bash
npm run dev
```

Expected: scrolling causes the aurora blobs to drift at different rates relative to the hero content, giving depth. Toggle OS-level reduced-motion on — blobs go still (no drift, no parallax). Kill the server.

- [ ] **Step 3: Commit**

```bash
git add src/components/AuroraBackdrop.tsx
git commit -m "feat: add scroll-linked parallax to aurora blobs"
```

---

## Task 6: Create useScrolled hook

**Files:**
- Create: `src/hooks/useScrolled.ts`

- [ ] **Step 1: Write the hook**

Create `src/hooks/useScrolled.ts` with:

```ts
import { useEffect, useState } from 'react'

/**
 * Returns true when window.scrollY exceeds `threshold`.
 * Uses a passive scroll listener. SSR-safe: returns false on the server.
 */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
```

- [ ] **Step 2: Verify typecheck passes**

Run:
```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useScrolled.ts
git commit -m "feat: add useScrolled hook for scroll-threshold detection"
```

---

## Task 7: Refactor Header to use useScrolled and raise threshold to 40px

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Replace inline scroll state with useScrolled**

In `src/components/Header.tsx`:

1. Remove the `useEffect` import if only used for the scroll effect (keep `useState`).
2. Replace lines 2 and 17–25 (the inline `useEffect` scroll detection) with a call to `useScrolled(40)`.

Final imports block should be:

```tsx
import { Github, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../data/profile'
import { useScrolled } from '../hooks/useScrolled'
import ThemeToggle from './ThemeToggle'
```

And the opening of the component:

```tsx
export default function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(40)
```

Delete the original `useEffect` block (previously lines 20–25). Leave the rest of the component unchanged.

- [ ] **Step 2: Start dev server, verify nav behavior**

Run:
```bash
npm run dev
```

Expected: at top of page, nav is transparent with no border. After scrolling past ~40px, nav gains backdrop-blur + border-bottom. Scrolling back up returns it to transparent. Kill the server.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "refactor: use useScrolled hook in Header, raise blur threshold to 40px"
```

---

## Task 8: Reimplement FadeIn on framer-motion

**Files:**
- Modify: `src/components/FadeIn.tsx`

- [ ] **Step 1: Rewrite FadeIn to use motion.div + whileInView**

Replace the full contents of `src/components/FadeIn.tsx` with:

```tsx
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: 0 | 100 | 200 | 300 | 400
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'li'
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  as = 'div',
  className,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (shouldReduceMotion) {
    const Tag = as as 'div'
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay: delay / 1000,
      }}
    >
      {children}
    </MotionTag>
  )
}
```

Note: the existing `useInView` hook in `src/hooks/useInView.ts` is no longer used by `FadeIn`. Leave the file in place — other code may consume it; deletion is out of scope for this refresh unless a later grep shows no consumers.

- [ ] **Step 2: Grep for any remaining consumers of the old useInView hook**

Run:
```bash
grep -rn "from '../hooks/useInView'" src/ || true
grep -rn "from '../../hooks/useInView'" src/ || true
grep -rn "useInView" src/ || true
```

Expected: any lingering usage shows here. If only `src/hooks/useInView.ts` appears, the hook is orphaned but leave it (not part of the scope).

- [ ] **Step 3: Start dev server, verify all FadeIn usages still reveal on scroll**

Run:
```bash
npm run dev
```

Expected: scroll through the page — every section and card fades in once when it enters the viewport. Scroll back up and down: no re-firing (enters once only). Toggle OS reduced-motion on: content appears immediately with no fade. Kill the server.

- [ ] **Step 4: Commit**

```bash
git add src/components/FadeIn.tsx
git commit -m "refactor: reimplement FadeIn on framer-motion with reduced-motion guard"
```

---

## Task 9: Add staggered slide-in to Experience timeline

**Files:**
- Modify: `src/sections/Experience.tsx`

- [ ] **Step 1: Replace FadeIn with a motion.li that slides in from the left**

Replace the full contents of `src/sections/Experience.tsx` with:

```tsx
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { experience } from '../data/experience'

export default function Experience() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="experience" className="px-4 py-20 sm:py-28">
      <div className="page-wrap">
        <SectionHeading kicker="Experience" title="Career timeline" />
        <ol className="relative space-y-8 border-l border-[var(--line)] pl-6 sm:pl-8">
          {experience.map((role, i) => (
            <motion.li
              key={role.company}
              initial={
                shouldReduceMotion ? false : { opacity: 0, x: -24 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: shouldReduceMotion ? 0 : i * 0.1,
              }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -left-[7px] mt-2 block h-3 w-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg-base)]"
              />
              <div className="surface-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      {role.role}
                    </h3>
                    <p className="text-sm text-[var(--accent)]">
                      {role.company}
                    </p>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    {role.period}
                  </p>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--text-soft)]">
                  {role.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

Note: the `-left-[7px]` on the bullet circle remains positioned relative to the `<li>` — confirm visually that the stagger does not offset the dot away from the timeline border.

- [ ] **Step 2: Start dev server, scroll to Experience section**

Run:
```bash
npm run dev
```

Expected: roles slide in from the left one after another (100ms stagger). Bullet dots stay aligned to the left border of the timeline. Reduced-motion on: all roles appear in place with no slide. Kill the server.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Experience.tsx
git commit -m "feat: staggered slide-in reveal for experience timeline"
```

---

## Task 10: Add staggered chip reveal to Skills

**Files:**
- Modify: `src/sections/Skills.tsx`

- [ ] **Step 1: Wrap the chip container in a motion container with staggered children**

Replace the full contents of `src/sections/Skills.tsx` with:

```tsx
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '../components/ui/badge'
import FadeIn from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import { skillCategories } from '../data/skills'

const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
}

const chipItem = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="skills" className="px-4 py-20 sm:py-28">
      <div className="page-wrap">
        <SectionHeading kicker="Skills" title="Technical expertise" />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, i) => {
            const Icon = category.icon
            return (
              <FadeIn key={category.title} delay={((i % 2) * 100) as 0 | 100}>
                <div className="surface-card h-full p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      {category.title}
                    </h3>
                  </div>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={chipContainer}
                    initial={shouldReduceMotion ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  >
                    {category.items.map((item) => (
                      <motion.div key={item} variants={chipItem}>
                        <Badge
                          variant="outline"
                          className="border-[var(--chip-line)] text-[var(--text-soft)]"
                        >
                          {item}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Start dev server, scroll to Skills**

Run:
```bash
npm run dev
```

Expected: each skill category card enters via FadeIn; chips inside stagger-fade-in at 30ms intervals. Reduced-motion on: chips appear instantly. Kill the server.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Skills.tsx
git commit -m "feat: staggered chip reveal in Skills section"
```

---

## Task 11: Extract ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Modify: `src/sections/Projects.tsx`

- [ ] **Step 1: Create the new ProjectCard component**

Create `src/components/ProjectCard.tsx` with:

```tsx
import { Award, Github } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import type { Project } from '../data/projects'

export type ProjectCardVariant = 'default' | 'flagship'

type Props = {
  project: Project
  variant?: ProjectCardVariant
}

export default function ProjectCard({ project, variant = 'default' }: Props) {
  const isFlagship = variant === 'flagship'
  return (
    <div
      className={
        'surface-card project-card flex h-full flex-col p-6 ' +
        (isFlagship
          ? 'border-[var(--accent)]/40 ring-1 ring-[var(--accent)]/20'
          : '')
      }
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={
            'font-semibold text-[var(--text)] ' +
            (isFlagship ? 'text-xl' : 'text-lg')
          }
        >
          {project.title}
        </h3>
        {project.award && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--accent)]/10 px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
            <Award size={12} />
            {project.award}
          </span>
        )}
      </div>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--text-soft)]">
        {project.bullets.map((b, idx) => (
          <li key={idx}>{b}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.badges.map((b) => (
          <Badge
            key={b}
            variant="outline"
            className="border-[var(--chip-line)] text-[var(--text-soft)]"
          >
            {b}
          </Badge>
        ))}
      </div>
      {project.github && (
        <div className="mt-5">
          <Button asChild size="sm" variant={isFlagship ? 'default' : 'outline'}>
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Update Projects.tsx to use the extracted component**

Replace the full contents of `src/sections/Projects.tsx` with:

```tsx
import FadeIn from '../components/FadeIn'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'

export default function Projects() {
  const agentic = projects.filter((p) => p.category === 'agentic')
  const aiot = projects.filter((p) => p.category === 'aiot')
  const clawix = agentic.find((p) => p.featured)
  const otherAgentic = agentic.filter((p) => !p.featured)

  return (
    <section id="projects" className="px-4 py-20 sm:py-28">
      <div className="page-wrap">
        <SectionHeading kicker="Projects" title="Featured work" />

        <div className="mb-14">
          <p className="kicker mb-5">LLM, Agentic & Autonomous AI</p>
          {clawix && (
            <FadeIn>
              <ProjectCard project={clawix} variant="flagship" />
            </FadeIn>
          )}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {otherAgentic.map((p, i) => (
              <FadeIn key={p.title} delay={(i * 100) as 0 | 100}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>

        <div>
          <p className="kicker mb-5">AIoT & Predictive Maintenance</p>
          <div className="grid gap-6 md:grid-cols-2">
            {aiot.map((p, i) => (
              <FadeIn key={p.title} delay={(i * 100) as 0 | 100}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify typecheck and dev server**

Run:
```bash
npx tsc --noEmit && npm run dev
```

Expected: no type errors; all project cards render identically to before (Clawix highlighted, others normal). Kill the server.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx src/sections/Projects.tsx
git commit -m "refactor: extract ProjectCard component with variant prop"
```

---

## Task 12: Add animated gradient border to flagship Clawix card

**Files:**
- Modify: `src/styles.css`
- Modify: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Add `.flagship-border` styles to styles.css**

Append to the end of `src/styles.css`, immediately after the existing `@keyframes flagship-border-spin` block (added in Task 2):

```css
.flagship-border {
  position: relative;
  background-clip: padding-box;
}

.flagship-border::before {
  content: '';
  position: absolute;
  inset: -1.5px;
  z-index: -1;
  border-radius: inherit;
  background: conic-gradient(
    from var(--flagship-angle, 0deg),
    var(--accent),
    #6366f1,
    #a855f7,
    #ec4899,
    var(--accent)
  );
  animation: flagship-border-spin 6s linear infinite;
  transform-origin: center;
}
```

Note: `@keyframes flagship-border-spin` currently animates `transform: rotate(1turn)`. Since the pseudo-element is already positioned with `inset: -1.5px`, rotating it directly is simpler and correct — no angle CSS variable is needed. The `--flagship-angle` custom property in the conic-gradient above is a fallback; the `transform: rotate` in the keyframe does the actual motion.

- [ ] **Step 2: Apply `.flagship-border` class when variant is flagship**

In `src/components/ProjectCard.tsx`, update the outer `<div>` className composition to include the border class for flagship. Replace the outer div's className line with:

```tsx
      className={
        'surface-card project-card relative flex h-full flex-col p-6 ' +
        (isFlagship
          ? 'flagship-border border-[var(--accent)]/40 ring-1 ring-[var(--accent)]/20'
          : '')
      }
```

(Add `relative` so `::before` absolute positioning is scoped; add `flagship-border` class for flagship variant.)

- [ ] **Step 3: Start dev server, scroll to Projects**

Run:
```bash
npm run dev
```

Expected: Clawix card shows a thin rotating conic-gradient border (cyan → indigo → violet → magenta → cyan) making a full revolution every 6s. Other cards unchanged. Reduced-motion on: border is visible as a static gradient ring, no rotation. Kill the server.

- [ ] **Step 4: Commit**

```bash
git add src/styles.css src/components/ProjectCard.tsx
git commit -m "feat: add animated gradient border to flagship project card"
```

---

## Task 13: Add button press-scale and audit reduced-motion globally

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Append project-card hover, button press-scale, and reduced-motion CSS**

Append to the end of `src/styles.css`:

```css
/* Project card hover: lift + soft cyan glow */
.project-card {
  transition:
    transform 220ms ease-out,
    box-shadow 220ms ease-out;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 28px -6px var(--accent);
}

/* Subtle press feedback on all primary/outline/ghost buttons */
button:active:not(:disabled),
a[role='button']:active {
  transform: scale(0.97);
  transition: transform 80ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card:hover {
    transform: none;
    transition: none;
    box-shadow: none;
  }

  button:active:not(:disabled),
  a[role='button']:active {
    transform: none;
  }

  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 2: Start dev server, press buttons, hover cards, toggle reduced-motion**

Run:
```bash
npm run dev
```

Expected:
- Hovering any project card lifts it ~4px with a soft cyan glow; releasing returns it smoothly.
- Clicking any button shows a very subtle press-down (scale 0.97) then returns.
- With OS reduced-motion on: card hover is static (no lift, no glow); button press no longer scales; all aurora/parallax/FadeIn/stagger/flagship motion is frozen; smooth scroll is disabled.

Kill the server.

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "style: project-card hover, button press, reduced-motion guards"
```

---

## Task 14: Final validation pass

**Files:** none modified — this is a manual QA checkpoint that must pass before marking the refresh complete.

- [ ] **Step 1: Full dev-server walkthrough, dark mode**

Run:
```bash
npm run dev
```

Walk through with dark mode active:
- Hero: aurora blobs drift, colors are cyan/blue/indigo/violet/magenta, text is fully legible, noise overlay subtle, scrolling triggers parallax drift.
- Nav: transparent at top; after scrolling past ~40px, gains blur + border; mobile hamburger still works.
- About section: fades in once as it enters the viewport.
- Experience: roles slide in from the left with stagger; timeline dots stay on the border line.
- Skills: cards fade in; chips within each card stagger-fade.
- Projects: Clawix has the rotating conic-gradient border; all cards lift + glow softly on hover.
- Awards and Contact: fade in.
- Buttons: slight press-scale when clicked.

- [ ] **Step 2: Repeat with light mode active**

Toggle to light mode and repeat Step 1. Verify aurora palette is pastel/softer; hero text retains AA contrast; no element is washed out; all motion still works identically.

- [ ] **Step 3: Repeat with OS-level reduced-motion on**

Enable reduced-motion in OS settings (macOS: System Settings → Accessibility → Display → Reduce motion; Linux/GNOME: Settings → Accessibility → Seeing → Reduce animation). Reload:
- Aurora blobs: still composed, but frozen (no drift, no parallax).
- Clawix border: static (no rotation), but gradient still visible.
- All FadeIn / stagger reveals: content appears in place without animation.
- Button press: no scale.
- Smooth scroll disabled.

- [ ] **Step 4: Mobile viewport check**

In browser devtools, toggle device toolbar (e.g., iPhone 14 / 390px width). Verify:
- Hero text wraps cleanly; aurora fills behind.
- Nav hamburger works and mobile menu opens/closes.
- Experience cards full width, still slide in.
- Project cards stack; Clawix border still rotates.

- [ ] **Step 5: Lighthouse performance check**

In Chrome devtools → Lighthouse → run a Performance audit on the dev build (or preferably `npm run build && npm run preview` for accurate numbers).

Expected: performance ≥95 desktop, ≥90 throttled mobile (per spec success criteria). If below, investigate: blob blur radius, number of compositing layers, aurora `overflow-x` leaks.

- [ ] **Step 6: Commit if any tuning changes were made, then close out**

If Step 5 surfaced tweaks (reduced blur, dropped a blob, etc.) commit them:

```bash
git add -A
git commit -m "perf: tune aurora blur/layer count for mobile Lighthouse target"
```

Then run:

```bash
git log --oneline -20
```

Expected: each task above shows as its own commit. The UI refresh is complete.
