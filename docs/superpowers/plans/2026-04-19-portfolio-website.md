# Jason Li Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio website for Jason Li (AI Data Architect) on the existing TanStack Start scaffold, ready to deploy to Vercel.

**Architecture:** Single route `/` composes seven section components in scroll order. Sections read content from typed data files in `src/data/`. Animations use a custom `useInView` IntersectionObserver hook + Tailwind transitions (no `motion`/`framer-motion`). Dark mode default; `ThemeToggle` already exists and is restyled in place.

**Tech Stack:** TanStack Start (Vite), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (new-york, zinc), lucide-react, vitest + jsdom + @testing-library/react.

**Source spec:** `docs/superpowers/specs/2026-04-19-portfolio-website-design.md`. CV content at `references/cv.md`.

---

## File Structure

**New files:**

| Path                                       | Purpose                                            |
| ------------------------------------------ | -------------------------------------------------- |
| `vitest.config.ts`                         | Vitest config (jsdom, setup file)                  |
| `src/test/setup.ts`                        | jest-dom matchers, JSDOM IntersectionObserver mock |
| `src/hooks/useInView.ts`                   | IntersectionObserver hook                          |
| `src/hooks/useInView.test.ts`              | Unit tests for hook                                |
| `src/components/FadeIn.tsx`                | Wrapper applying fade/slide-up on view             |
| `src/components/FadeIn.test.tsx`           | Smoke test                                         |
| `src/components/SectionHeading.tsx`        | Shared kicker + h2                                 |
| `src/components/ui/button.tsx`             | shadcn Button (added via CLI)                      |
| `src/components/ui/badge.tsx`              | shadcn Badge (added via CLI)                       |
| `src/components/ui/card.tsx`               | shadcn Card (added via CLI)                        |
| `src/data/profile.ts`                      | Name, title, summary, links                        |
| `src/data/skills.ts`                       | Grouped skill categories                           |
| `src/data/experience.ts`                   | Roles with bullets                                 |
| `src/data/projects.ts`                     | Featured projects                                  |
| `src/data/research.ts`                     | Research projects                                  |
| `src/data/awards.ts`                       | Awards + publications                              |
| `src/sections/Hero.tsx`                    | Hero                                               |
| `src/sections/About.tsx`                   | About                                              |
| `src/sections/Skills.tsx`                  | Skills                                             |
| `src/sections/Experience.tsx`              | Experience timeline                                |
| `src/sections/Projects.tsx`                | Projects (Clawix featured)                         |
| `src/sections/Research.tsx`                | Research grid                                      |
| `src/sections/Awards.tsx`                  | Awards + publications                              |
| `src/sections/Contact.tsx`                 | Contact (mailto + socials)                         |
| `src/sections/__tests__/Hero.test.tsx`     | Smoke test                                         |
| `src/sections/__tests__/Projects.test.tsx` | Smoke test (Clawix prominence)                     |

**Modified files:**

| Path                             | Change                                                                     |
| -------------------------------- | -------------------------------------------------------------------------- |
| `src/styles.css`                 | Replace lagoon palette with navy/cyan; replace Manrope/Fraunces with Inter |
| `src/routes/__root.tsx`          | New meta tags, default-dark bootstrap script                               |
| `src/components/ThemeToggle.tsx` | Default mode `'dark'` instead of `'auto'`                                  |
| `src/components/Header.tsx`      | Rewrite as portfolio nav with anchor links + GitHub icon                   |
| `src/components/Footer.tsx`      | Rewrite with copyright + social icons                                      |
| `src/routes/index.tsx`           | Compose all sections                                                       |

**Deleted files:**

| Path                   | Reason                                   |
| ---------------------- | ---------------------------------------- |
| `src/routes/about.tsx` | Single-page design, no separate `/about` |

---

## Task 0: Set up Vitest + Testing Library

**Files:**

- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Add `@testing-library/jest-dom` package**

Run: `pnpm add -D @testing-library/jest-dom`
Expected: Package added to devDependencies.

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [viteReact()],
  resolve: {
    alias: {
      '#': new URL('./src', import.meta.url).pathname,
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
```

- [ ] **Step 3: Create `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class MockIntersectionObserver {
  callback: IntersectionObserverCallback
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb
  }
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
  root = null
  rootMargin = ''
  thresholds = []
  trigger(entries: Array<Partial<IntersectionObserverEntry>>) {
    this.callback(
      entries as IntersectionObserverEntry[],
      this as unknown as IntersectionObserver,
    )
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
```

- [ ] **Step 4: Update `tsconfig.json` to include `vitest/globals`**

In `compilerOptions.types`, change `"types": ["vite/client"]` to `"types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"]`.

- [ ] **Step 5: Add a smoke test to verify setup**

Create `src/test/setup.test.ts`:

```ts
import { describe, it, expect } from 'vitest'

describe('test setup', () => {
  it('jsdom is available', () => {
    expect(typeof document).toBe('object')
  })

  it('IntersectionObserver mock is installed', () => {
    expect(typeof IntersectionObserver).toBe('function')
  })
})
```

Run: `pnpm test`
Expected: 2 tests pass.

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts src/test/setup.ts src/test/setup.test.ts tsconfig.json package.json pnpm-lock.yaml
git commit -m "chore: configure vitest with jsdom and IntersectionObserver mock"
```

---

## Task 1: Rewrite `styles.css` with navy/cyan palette + Inter

**Files:**

- Modify: `src/styles.css` (full rewrite)

- [ ] **Step 1: Replace `src/styles.css` entirely with the new palette**

Overwrite `src/styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import 'tailwindcss';
@plugin '@tailwindcss/typography';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  /* Light mode (slate background, cyan/blue accents) */
  --bg-base: #f8fafc;
  --bg-grad-a: rgba(6, 182, 212, 0.06);
  --bg-grad-b: rgba(59, 130, 246, 0.05);
  --surface: rgba(255, 255, 255, 0.7);
  --surface-strong: rgba(255, 255, 255, 0.92);
  --line: rgba(15, 23, 42, 0.08);
  --text: #0f172a;
  --text-soft: #475569;
  --text-muted: #64748b;
  --accent: #0891b2; /* cyan-600 */
  --accent-soft: #06b6d4; /* cyan-500 */
  --accent-2: #2563eb; /* blue-600 */
  --header-bg: rgba(248, 250, 252, 0.8);
  --chip-bg: rgba(255, 255, 255, 0.75);
  --chip-line: rgba(8, 145, 178, 0.25);
  --link-bg-hover: rgba(255, 255, 255, 0.95);
  --kicker: #0891b2;

  /* shadcn tokens (zinc base, kept for shadcn components) */
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.141 0.005 285.823);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.55 0.18 220);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent-shadcn: oklch(0.967 0.001 286.375);
  --accent-foreground: oklch(0.21 0.006 285.885);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.92 0.004 286.32);
  --input: oklch(0.92 0.004 286.32);
  --ring: oklch(0.71 0.12 220);
  --radius: 0.625rem;
}

.dark {
  /* Dark mode (deep navy, cyan/blue accents) — DEFAULT */
  --bg-base: #05080f;
  --bg-grad-a: rgba(6, 182, 212, 0.12);
  --bg-grad-b: rgba(59, 130, 246, 0.08);
  --surface: rgba(255, 255, 255, 0.03);
  --surface-strong: rgba(255, 255, 255, 0.06);
  --line: rgba(255, 255, 255, 0.08);
  --text: #e2e8f0;
  --text-soft: #94a3b8;
  --text-muted: #64748b;
  --accent: #22d3ee; /* cyan-400 */
  --accent-soft: #06b6d4; /* cyan-500 */
  --accent-2: #60a5fa; /* blue-400 */
  --header-bg: rgba(5, 8, 15, 0.7);
  --chip-bg: rgba(255, 255, 255, 0.04);
  --chip-line: rgba(34, 211, 238, 0.3);
  --link-bg-hover: rgba(255, 255, 255, 0.06);
  --kicker: #22d3ee;

  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.18 0.01 240);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.18 0.01 240);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.78 0.16 220);
  --primary-foreground: oklch(0.141 0.005 285.823);
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.274 0.006 286.033);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --accent-shadcn: oklch(0.274 0.006 286.033);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.27 0.01 240);
  --input: oklch(0.27 0.01 240);
  --ring: oklch(0.62 0.14 220);
}

@theme inline {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent-shadcn);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

html,
body,
#app {
  min-height: 100%;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--text);
  font-family: var(--font-sans);
  background-color: var(--bg-base);
  background:
    radial-gradient(900px 520px at 12% -10%, var(--bg-grad-a), transparent 60%),
    radial-gradient(900px 520px at 95% -8%, var(--bg-grad-b), transparent 62%),
    linear-gradient(180deg, var(--bg-base) 0%, var(--bg-base) 100%);
  background-attachment: fixed;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  opacity: 0.06;
  background-image:
    linear-gradient(currentColor 1px, transparent 1px),
    linear-gradient(90deg, currentColor 1px, transparent 1px);
  background-size: 28px 28px;
  color: var(--text);
  mask-image: radial-gradient(ellipse at 50% 0%, black, transparent 70%);
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  color: var(--accent-soft);
}

.page-wrap {
  width: min(1120px, calc(100% - 2rem));
  margin-inline: auto;
}

.kicker {
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.7rem;
  color: var(--kicker);
}

.surface-card {
  background: var(--surface-strong);
  border: 1px solid var(--line);
  border-radius: 1rem;
  backdrop-filter: blur(8px);
}

.gradient-text {
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    background-color: var(--bg-base);
    color: var(--text);
  }
}
```

- [ ] **Step 2: Verify dev server compiles**

Run: `pnpm dev`
Expected: Server starts on `http://localhost:3000` without CSS errors. Stop the server (Ctrl+C) once verified.

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "style: replace lagoon palette with navy/cyan dark theme + Inter font"
```

---

## Task 2: Update `__root.tsx` with portfolio meta + dark default

**Files:**

- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Replace `__root.tsx`**

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark')?stored:'dark';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(mode);root.setAttribute('data-theme',mode);root.style.colorScheme=mode;}catch(e){document.documentElement.classList.add('dark');}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Jason Li – AI Data Architect | Senior Data Scientist' },
      {
        name: 'description',
        content:
          'Jason Li is an AI Data Architect with 10+ years designing scalable GenAI and AI/ML data architectures, Agentic AI systems, and MLOps on AWS.',
      },
      { property: 'og:title', content: 'Jason Li – AI Data Architect' },
      {
        property: 'og:description',
        content:
          'Portfolio of Jason Li — Agentic AI, LLM integration, multi-modal pipelines, and enterprise MLOps.',
      },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat: portfolio meta tags and dark-mode default theme bootstrap"
```

---

## Task 3: Default `ThemeToggle` to dark mode

**Files:**

- Modify: `src/components/ThemeToggle.tsx`

- [ ] **Step 1: Replace `ThemeToggle.tsx` with simplified dark/light toggle (drop `auto`)**

```tsx
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('theme')
  return stored === 'light' || stored === 'dark' ? stored : 'dark'
}

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(mode)
  document.documentElement.setAttribute('data-theme', mode)
  document.documentElement.style.colorScheme = mode
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('dark')

  useEffect(() => {
    const initial = getInitialMode()
    setMode(initial)
    applyThemeMode(initial)
  }, [])

  function toggle() {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    applyThemeMode(next)
    window.localStorage.setItem('theme', next)
  }

  const label = `Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text)] transition hover:bg-[var(--link-bg-hover)]"
    >
      {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ThemeToggle.tsx
git commit -m "feat: simplify ThemeToggle to dark/light with lucide icons"
```

---

## Task 4: `useInView` IntersectionObserver hook (TDD)

**Files:**

- Create: `src/hooks/useInView.ts`
- Create: `src/hooks/useInView.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useInView } from './useInView'

describe('useInView', () => {
  it('starts with inView=false', () => {
    const { result } = renderHook(() => useInView<HTMLDivElement>())
    expect(result.current[1]).toBe(false)
  })

  it('returns inView=true once observer fires with isIntersecting', () => {
    let observer: any
    const OriginalIO = window.IntersectionObserver
    ;(window as any).IntersectionObserver = vi.fn(function (
      cb: IntersectionObserverCallback,
    ) {
      observer = {
        cb,
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
      return observer
    })

    const { result } = renderHook(() => useInView<HTMLDivElement>())
    const div = document.createElement('div')
    act(() => {
      result.current[0](div)
    })

    act(() => {
      observer.cb([{ isIntersecting: true, target: div }] as any)
    })
    expect(result.current[1]).toBe(true)
    ;(window as any).IntersectionObserver = OriginalIO
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/hooks/useInView.test.ts`
Expected: FAIL — module `./useInView` not found.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useInView.ts`:

```ts
import { useCallback, useEffect, useRef, useState } from 'react'

export type UseInViewOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends Element>(
  options: UseInViewOptions = {},
): [(node: T | null) => void, boolean] {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -10% 0px',
    once = true,
  } = options
  const [inView, setInView] = useState(false)
  const elementRef = useRef<T | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      elementRef.current = node
      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setInView(true)
              if (once) observer.disconnect()
            } else if (!once) {
              setInView(false)
            }
          },
          { threshold, rootMargin },
        )
        observer.observe(node)
        observerRef.current = observer
      }
    },
    [threshold, rootMargin, once],
  )

  useEffect(() => () => observerRef.current?.disconnect(), [])

  return [setRef, inView]
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test src/hooks/useInView.test.ts`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useInView.ts src/hooks/useInView.test.ts
git commit -m "feat: add useInView IntersectionObserver hook"
```

---

## Task 5: `FadeIn` component

**Files:**

- Create: `src/components/FadeIn.tsx`
- Create: `src/components/FadeIn.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FadeIn from './FadeIn'

describe('FadeIn', () => {
  it('renders children', () => {
    render(
      <FadeIn>
        <span>hello</span>
      </FadeIn>,
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('applies the initial hidden classes', () => {
    const { container } = render(
      <FadeIn>
        <span>x</span>
      </FadeIn>,
    )
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toContain('opacity-0')
    expect(wrapper.className).toContain('translate-y-3')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/components/FadeIn.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `FadeIn.tsx`**

```tsx
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: 0 | 100 | 200 | 300 | 400
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'li'
  className?: string
}

const DELAY_CLASS: Record<number, string> = {
  0: 'delay-0',
  100: 'delay-100',
  200: 'delay-200',
  300: 'delay-300',
  400: 'delay-400',
}

export default function FadeIn({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: FadeInProps) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref as any}
      className={cn(
        'transition-all duration-500 ease-out',
        DELAY_CLASS[delay],
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm test src/components/FadeIn.test.tsx`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/FadeIn.tsx src/components/FadeIn.test.tsx
git commit -m "feat: add FadeIn wrapper using useInView"
```

---

## Task 6: `SectionHeading` component

**Files:**

- Create: `src/components/SectionHeading.tsx`

- [ ] **Step 1: Implement**

```tsx
import { cn } from '../lib/utils'
import type { ReactNode } from 'react'

type SectionHeadingProps = {
  kicker?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn('mb-10', align === 'center' && 'text-center', className)}
    >
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base text-[var(--text-soft)]">
          {description}
        </p>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/SectionHeading.tsx
git commit -m "feat: add SectionHeading shared component"
```

---

## Task 7: Add shadcn `button`, `badge`, `card`

**Files:**

- Create: `src/components/ui/button.tsx` (via CLI)
- Create: `src/components/ui/badge.tsx` (via CLI)
- Create: `src/components/ui/card.tsx` (via CLI)

- [ ] **Step 1: Install components**

Run: `pnpm dlx shadcn@latest add button badge card --yes`
Expected: Three new files in `src/components/ui/`. May also create `src/lib/utils.ts` (already exists — verify it's unchanged).

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui package.json pnpm-lock.yaml
git commit -m "feat: add shadcn button, badge, and card components"
```

---

## Task 8: `data/profile.ts`

**Files:**

- Create: `src/data/profile.ts`

- [ ] **Step 1: Implement**

```ts
export const profile = {
  name: 'LI KWAN HO JASON',
  shortName: 'Jason Li',
  title: 'AI Data Architect | Senior Data Scientist',
  summary:
    'Results-driven AI Data Architect with 10+ years designing scalable GenAI and AI/ML data architectures for enterprise applications. Expertise in Agentic AI (multi-agent orchestration, MCPs), LLM integration (RAG, prompt engineering, model governance), multi-modal pipelines, and MLOps on AWS (40% cost reduction).',
  subtitle:
    'Proven in translating business, healthcare, and regulatory priorities into production-ready AI strategies, ensuring data quality SLAs, governance, and compliance. International collaborator with experience presenting at global conferences (USA, Europe, Australia).',
  email: 'jasonli72016@gmail.com',
  phone: '+852-6134-1504',
  links: {
    github: 'https://github.com/jasonli0226',
    linkedin: 'https://www.linkedin.com/in/jasonli0226',
  },
  education: [
    {
      school: 'Chinese University of Hong Kong',
      degrees: [
        {
          name: 'Master of Science in Information Engineering',
          years: '2021 – 2023',
        },
        {
          name: "Bachelor's Degree in Information Engineering",
          years: '2017 – 2019',
        },
      ],
    },
    {
      school: 'Monash University, Melbourne',
      degrees: [
        { name: "Bachelor's Degree in Psychology and Business", years: '2012' },
      ],
    },
  ],
} as const
```

- [ ] **Step 2: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: add profile data"
```

---

## Task 9: `data/skills.ts`

**Files:**

- Create: `src/data/skills.ts`

- [ ] **Step 1: Implement**

```ts
import type { LucideIcon } from 'lucide-react'
import { Cloud, Code2, Shield, Sparkles } from 'lucide-react'

export type SkillCategory = {
  title: string
  icon: LucideIcon
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI Data Architecture & GenAI',
    icon: Sparkles,
    items: [
      'Agentic AI & Multi-Agent Orchestration',
      'Autonomous Agents & Reasoning',
      'Tool Integration & MCPs',
      'LLM Applications (RAG, Prompt Engineering)',
      'Chatbots & Model Governance',
      'Generative AI & Transformers',
      'Explainable AI (SHAP, LUCID)',
      'Multi-Modal Data Fusion',
      'Data Ingestion & Preprocessing',
    ],
  },
  {
    title: 'MLOps & Cloud Infrastructure',
    icon: Cloud,
    items: [
      'AWS SageMaker',
      'AWS S3',
      'AWS Lambda',
      'Azure (transferable)',
      'CI/CD Pipelines',
      'Model Deployment & Monitoring',
      'Cost Optimization',
      'Docker',
      'ETL / Data Pipelines',
    ],
  },
  {
    title: 'Data Governance & Enterprise',
    icon: Shield,
    items: [
      'AI Model Governance',
      'RBAC',
      'Token Budgeting',
      'Audit Logging & Compliance',
      'Data Strategy & Roadmaps',
      'Enterprise Architecture Frameworks',
    ],
  },
  {
    title: 'Programming & Tools',
    icon: Code2,
    items: [
      'Python',
      'SQL',
      'TypeScript',
      'Go',
      'PyTorch',
      'TensorFlow',
      'Keras',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Tableau',
      'Power BI',
      'React',
      'Next.js',
      'FastAPI',
    ],
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/skills.ts
git commit -m "feat: add skills data with lucide icons"
```

---

## Task 10: `data/experience.ts`

**Files:**

- Create: `src/data/experience.ts`

- [ ] **Step 1: Implement**

```ts
export type Experience = {
  role: string
  company: string
  period: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Data Team Lead, Data Scientist',
    company: 'XTRA Sensing Limited',
    period: 'Jan 2024 – Present',
    bullets: [
      'Architected enterprise AI data architecture strategies and scalable MLOps pipelines on AWS for GenAI/AI workloads, processing millions of sensor readings daily; achieved 40% reduction in operational costs while meeting performance SLAs, data quality monitoring, and production scalability requirements.',
      'Designed multi-modal data ingestion and fusion architecture using Transformer-based models for vibration analysis of 16+ high-capacity industrial pumps, collaborating with international teams to enable real-time predictive maintenance for government stakeholders.',
      'Led development of audio-based machine health monitoring solution as a cost-effective alternative to traditional vibration sensors (Gold Medal – International Exhibition of Inventions of Geneva), delivering end-to-end data pipelines in collaboration with overseas teams.',
    ],
  },
  {
    role: 'Deputy General Manager, Data Scientist',
    company: 'Tecky Academy',
    period: 'Jul 2019 – Dec 2023',
    bullets: [
      'Led data team in delivering enterprise AI projects while establishing standardized architecture practices and reporting frameworks, reducing cross-team hand-off time by 30% and improving project delivery efficiency.',
      'Designed and managed AI training programs and course architectures supporting 1,000+ students transitioning into data science and AI roles.',
    ],
  },
  {
    role: 'Business Intelligence Analyst, Programmer',
    company: 'Myndar Co.',
    period: 'Jul 2015 – Jul 2019',
    bullets: [
      'Designed and built data pipelines and visualization architectures for Cold Chain/Healthcare systems, delivering dashboards tracking 50K+ daily readings to support real-time operational decisions in healthcare logistics.',
    ],
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/experience.ts
git commit -m "feat: add experience data"
```

---

## Task 11: `data/projects.ts`

**Files:**

- Create: `src/data/projects.ts`

- [ ] **Step 1: Implement**

```ts
export type ProjectCategory = 'agentic' | 'aiot'

export type Project = {
  title: string
  category: ProjectCategory
  bullets: string[]
  badges: string[]
  github?: string
  award?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title:
      'Clawix: Open-Source Self-Hosted Multi-Agent AI Orchestration Platform',
    category: 'agentic',
    featured: true,
    github: 'https://github.com/ClawixAI/clawix',
    badges: ['TypeScript', 'Docker', 'Multi-Agent', 'RBAC', 'LLM', 'MCP'],
    bullets: [
      'Designed and developed Clawix, an open-source self-hosted multi-agent AI orchestration platform that enables secure execution of agent swarms in isolated Docker containers.',
      'Architected enterprise-grade features including swarm coordination, RBAC, token governance, immutable audit logging, multi-channel integration (Telegram + web dashboard), and pluggable skill registry with approval workflows.',
      'Built core reasoning engine with multi-turn context retention, tool calling, and multi-LLM provider support, delivering a governed, scalable, zero-trust environment for GenAI and Agentic AI use cases.',
    ],
  },
  {
    title:
      'EAI-Powered Psychological Analysis Platform for Video Consultation Sessions',
    category: 'agentic',
    badges: [
      'Next.js',
      'FastAPI',
      'PostgreSQL',
      'MinIO',
      'Whisper',
      'Computer Vision',
      'Health-Tech',
    ],
    bullets: [
      'Architected end-to-end multi-modal AI data pipeline and Agentic AI orchestration platform for healthcare/psychological mentoring: integrated Whisper transcription, computer vision (posture analysis), LLM psychological assessment, speaker diarization, and automated PDF report generation.',
      'Built secure, role-based full-stack architecture (Next.js + FastAPI + PostgreSQL + MinIO + Docker) with governed data flows, supporting healthcare providers and AI-generated insights.',
    ],
  },
  {
    title: 'Sales Data Chatbot for Restaurant Using Catering LLM on Telegram',
    category: 'agentic',
    badges: ['Python', 'LLM', 'Telegram'],
    bullets: [
      'Developed LLM-powered chatbot architecture with real-time sales data ingestion, visualization, and decision-support capabilities via Telegram integration.',
    ],
  },
  {
    title:
      'Analysis of Industrial Machine Vibration Using Multi-Modal Data Fusion and Transformer',
    category: 'aiot',
    award: 'Best Paper Award – Euro Academic Conference',
    badges: ['PyTorch', 'Transformer', 'EMD', 'GAF', 'IoT'],
    bullets: [
      'Designed and implemented multi-modal data ingestion and fusion architecture using Transformers, Empirical Mode Decomposition, and Gramian Angular Field for predictive maintenance in industrial IoT environments.',
    ],
  },
  {
    title:
      'LUCID: Resolving Attribution Diffusion in Explainable AI for PCA-Reduced Feature Spaces',
    category: 'aiot',
    award: 'HKIE Paper 2026',
    badges: ['XAI', 'SHAP', 'PCA', 'Explainability'],
    bullets: [
      'Developed novel post-hoc XAI method (LUCID) to improve diagnostic precision by 18% in PCA-reduced industrial vibration data, enhancing model governance and explainability.',
    ],
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add projects data with Clawix featured"
```

---

## Task 12: `data/research.ts`

**Files:**

- Create: `src/data/research.ts`

- [ ] **Step 1: Implement**

```ts
export type ResearchProject = {
  title: string
  context: string
  description: string
}

export const research: ResearchProject[] = [
  {
    title:
      'Multivariate Time Series Vibration Analysis Using Deep Learning Approaches',
    context: 'Research Project with WPI University, USA',
    description:
      'Led development of LSTM and Transformer architectures for multivariate time series vibration data analysis, improving predictive maintenance and anomaly detection.',
  },
  {
    title: 'Data In-painting for LiDAR Sensing using Deep Learning Approach',
    context: 'MSc, Grade: 3.7/4.0',
    description:
      'Implemented GAN + U-Net architecture for multi-modal sensor data in-painting to enhance LiDAR data quality.',
  },
  {
    title: 'Image Captioning with Deep Learning Approach',
    context: "Bachelor's Final Year Project, Grade: 3.7/4.0",
    description:
      'Developed CNN + RNN/LSTM model with attention mechanism for automated image captioning.',
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/research.ts
git commit -m "feat: add research projects data"
```

---

## Task 13: `data/awards.ts`

**Files:**

- Create: `src/data/awards.ts`

- [ ] **Step 1: Implement**

```ts
export type Award = {
  title: string
  year?: string
}

export type Publication = {
  title: string
  venue: string
  doi?: string
  doiUrl?: string
  note?: string
}

export const awards: Award[] = [
  { title: 'Best Paper Award at NCTA Conference', year: '2024' },
  {
    title: 'Gold Medal – International Exhibition of Inventions of Geneva',
    year: '2024',
  },
  { title: 'Presenter at FCNDT Conference', year: '2024' },
  { title: 'Certified Instructor, NVIDIA Deep Learning Institute (DLI)' },
  {
    title: 'Recipient of the Academic Performance Award at CUHK',
    year: '2022',
  },
  { title: 'Finalist in the Cathay Pacific Hackathon', year: '2017' },
]

export const publications: Publication[] = [
  {
    title:
      'META: Deep Learning Pipeline for Detecting Anomalies on Multimodal Vibration Sewage Treatment Plant Data',
    venue: 'NCTA 2024',
    doi: '10.5220/0013031600003837',
    doiUrl: 'https://doi.org/10.5220/0013031600003837',
    note: 'Best Paper Award',
  },
  {
    title:
      'LUCID: Resolving Attribution Diffusion in Explainable AI for PCA-Reduced Feature Spaces',
    venue: 'HKIE',
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/awards.ts
git commit -m "feat: add awards and publications data"
```

---

## Task 14: Rewrite `Header.tsx` (portfolio nav)

**Files:**

- Modify: `src/components/Header.tsx` (full rewrite)

- [ ] **Step 1: Rewrite**

```tsx
import { Github, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#awards', label: 'Awards' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={
        'sticky top-0 z-50 transition-colors duration-200 ' +
        (scrolled
          ? 'bg-[var(--header-bg)] backdrop-blur-lg border-b border-[var(--line)]'
          : 'bg-transparent border-b border-transparent')
      }
    >
      <nav className="page-wrap flex items-center justify-between gap-4 py-3 sm:py-4">
        <a
          href="#hero"
          className="flex items-center gap-2 text-base font-bold text-[var(--text)]"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
          {profile.shortName}
        </a>

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--text-soft)] transition hover:text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text)] transition hover:bg-[var(--link-bg-hover)]"
          >
            <Github size={16} />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text)]"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-lg">
          <div className="page-wrap flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-[var(--text-soft)] hover:text-[var(--text)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: rewrite Header as portfolio nav with anchor links and mobile menu"
```

---

## Task 15: Rewrite `Footer.tsx`

**Files:**

- Modify: `src/components/Footer.tsx` (full rewrite)

- [ ] **Step 1: Rewrite**

```tsx
import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-transparent">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-[var(--text-muted)]">
          © {year} Li Kwan Ho Jason. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-soft)] transition hover:text-[var(--text)] hover:bg-[var(--link-bg-hover)]"
          >
            <Mail size={16} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-soft)] transition hover:text-[var(--text)] hover:bg-[var(--link-bg-hover)]"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-soft)] transition hover:text-[var(--text)] hover:bg-[var(--link-bg-hover)]"
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: rewrite Footer with copyright and social icons"
```

---

## Task 16: `Hero` section

**Files:**

- Create: `src/sections/Hero.tsx`
- Create: `src/sections/__tests__/Hero.test.tsx`

- [ ] **Step 1: Write smoke test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the name and title', () => {
    render(<Hero />)
    expect(screen.getByText(/LI KWAN HO JASON/i)).toBeInTheDocument()
    expect(screen.getByText(/AI Data Architect/)).toBeInTheDocument()
  })

  it('shows View Projects and Contact CTA links', () => {
    render(<Hero />)
    expect(
      screen.getByRole('link', { name: /view projects/i }),
    ).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: /contact me/i })).toHaveAttribute(
      'href',
      '#contact',
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/sections/__tests__/Hero.test.tsx`
Expected: FAIL — `../Hero` not found.

- [ ] **Step 3: Implement `Hero.tsx`**

```tsx
import { Github } from 'lucide-react'
import { Button } from '../components/ui/button'
import FadeIn from '../components/FadeIn'
import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-4 pt-24 pb-20 sm:pt-32 sm:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(900px 480px at 50% -10%, rgba(34,211,238,0.15), transparent 60%)',
        }}
      />
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

- [ ] **Step 4: Run tests**

Run: `pnpm test src/sections/__tests__/Hero.test.tsx`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Hero.tsx src/sections/__tests__/Hero.test.tsx
git commit -m "feat: add Hero section"
```

---

## Task 17: `About` section

**Files:**

- Create: `src/sections/About.tsx`

- [ ] **Step 1: Implement**

```tsx
import FadeIn from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="px-4 py-20 sm:py-28">
      <div className="page-wrap">
        <SectionHeading kicker="About" title="Who I am" />
        <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
          <FadeIn>
            <div
              aria-hidden
              className="flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-5xl font-extrabold text-white shadow-lg sm:h-64 sm:w-64"
            >
              JL
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="space-y-5 text-base leading-relaxed text-[var(--text-soft)] sm:text-lg">
              <p>{profile.summary}</p>
              <p>{profile.subtitle}</p>
              <div className="grid gap-3 pt-4 text-sm sm:grid-cols-2">
                {profile.education.map((school) => (
                  <div key={school.school} className="surface-card p-4">
                    <p className="font-semibold text-[var(--text)]">
                      {school.school}
                    </p>
                    <ul className="mt-2 space-y-1 text-[var(--text-muted)]">
                      {school.degrees.map((d) => (
                        <li key={d.name}>
                          {d.name}{' '}
                          <span className="text-[var(--text-muted)]">
                            · {d.years}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/About.tsx
git commit -m "feat: add About section with JL placeholder and education cards"
```

---

## Task 18: `Skills` section

**Files:**

- Create: `src/sections/Skills.tsx`

- [ ] **Step 1: Implement**

```tsx
import { Badge } from '../components/ui/badge'
import FadeIn from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import { skillCategories } from '../data/skills'

export default function Skills() {
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
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="border-[var(--chip-line)] text-[var(--text-soft)]"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
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

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Skills.tsx
git commit -m "feat: add Skills section with grouped categories"
```

---

## Task 19: `Experience` section (timeline)

**Files:**

- Create: `src/sections/Experience.tsx`

- [ ] **Step 1: Implement**

```tsx
import FadeIn from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="px-4 py-20 sm:py-28">
      <div className="page-wrap">
        <SectionHeading kicker="Experience" title="Career timeline" />
        <ol className="relative space-y-8 border-l border-[var(--line)] pl-6 sm:pl-8">
          {experience.map((role, i) => (
            <FadeIn
              key={role.company}
              delay={Math.min(i * 100, 300) as 0 | 100 | 200 | 300}
              as="li"
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
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Experience.tsx
git commit -m "feat: add Experience section with vertical timeline"
```

---

## Task 20: `Projects` section (Clawix featured)

**Files:**

- Create: `src/sections/Projects.tsx`
- Create: `src/sections/__tests__/Projects.test.tsx`

- [ ] **Step 1: Write smoke test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Projects from '../Projects'

describe('Projects', () => {
  it('renders the LLM and AIoT subsection headings', () => {
    render(<Projects />)
    expect(
      screen.getByText(/LLM, Agentic & Autonomous AI/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/AIoT & Predictive Maintenance/i),
    ).toBeInTheDocument()
  })

  it('renders Clawix as featured with a GitHub link', () => {
    render(<Projects />)
    expect(screen.getByText(/Clawix/i)).toBeInTheDocument()
    const clawixLink = screen
      .getAllByRole('link')
      .find(
        (a) => a.getAttribute('href') === 'https://github.com/ClawixAI/clawix',
      )
    expect(clawixLink).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/sections/__tests__/Projects.test.tsx`
Expected: FAIL — `../Projects` not found.

- [ ] **Step 3: Implement `Projects.tsx`**

```tsx
import { Award, Github } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import FadeIn from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

function ProjectCard({
  project,
  featured,
}: {
  project: Project
  featured?: boolean
}) {
  return (
    <div
      className={
        'surface-card flex h-full flex-col p-6 ' +
        (featured
          ? 'border-[var(--accent)]/40 ring-1 ring-[var(--accent)]/20'
          : '')
      }
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={
            'font-semibold text-[var(--text)] ' +
            (featured ? 'text-xl' : 'text-lg')
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
          <Button asChild size="sm" variant={featured ? 'default' : 'outline'}>
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
              <ProjectCard project={clawix} featured />
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

- [ ] **Step 4: Run tests**

Run: `pnpm test src/sections/__tests__/Projects.test.tsx`
Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Projects.tsx src/sections/__tests__/Projects.test.tsx
git commit -m "feat: add Projects section with Clawix featured"
```

---

## Task 21: `Research` section

**Files:**

- Create: `src/sections/Research.tsx`

- [ ] **Step 1: Implement**

```tsx
import FadeIn from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import { research } from '../data/research'

export default function Research() {
  return (
    <section id="research" className="px-4 py-20 sm:py-28">
      <div className="page-wrap">
        <SectionHeading kicker="Research" title="Academic projects" />
        <div className="grid gap-5 md:grid-cols-3">
          {research.map((r, i) => (
            <FadeIn key={r.title} delay={(i * 100) as 0 | 100 | 200}>
              <article className="surface-card h-full p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  {r.context}
                </p>
                <h3 className="mt-2 text-base font-semibold text-[var(--text)]">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">
                  {r.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Research.tsx
git commit -m "feat: add Research section"
```

---

## Task 22: `Awards` section

**Files:**

- Create: `src/sections/Awards.tsx`

- [ ] **Step 1: Implement**

```tsx
import { Award as AwardIcon, BookOpen } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import { awards, publications } from '../data/awards'

export default function Awards() {
  return (
    <section id="awards" className="px-4 py-20 sm:py-28">
      <div className="page-wrap">
        <SectionHeading kicker="Awards" title="Recognition & publications" />
        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div className="surface-card h-full p-6">
              <div className="mb-4 flex items-center gap-2 text-[var(--accent)]">
                <AwardIcon size={18} />
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  Awards
                </h3>
              </div>
              <ul className="space-y-3">
                {awards.map((a) => (
                  <li
                    key={a.title}
                    className="text-sm leading-relaxed text-[var(--text-soft)]"
                  >
                    <span className="text-[var(--text)]">{a.title}</span>
                    {a.year && (
                      <span className="ml-2 text-[var(--text-muted)]">
                        · {a.year}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="surface-card h-full p-6">
              <div className="mb-4 flex items-center gap-2 text-[var(--accent)]">
                <BookOpen size={18} />
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  Publications
                </h3>
              </div>
              <ul className="space-y-4">
                {publications.map((p) => (
                  <li
                    key={p.title}
                    className="text-sm leading-relaxed text-[var(--text-soft)]"
                  >
                    <p className="text-[var(--text)]">{p.title}</p>
                    <p className="mt-1 text-[var(--text-muted)]">
                      {p.venue}
                      {p.note && <span> · {p.note}</span>}
                    </p>
                    {p.doiUrl && (
                      <a
                        href={p.doiUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block text-xs"
                      >
                        DOI: {p.doi}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Awards.tsx
git commit -m "feat: add Awards section with publications"
```

---

## Task 23: `Contact` section

**Files:**

- Create: `src/sections/Contact.tsx`

- [ ] **Step 1: Implement**

```tsx
import { Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import FadeIn from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/profile'

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:py-28">
      <div className="page-wrap">
        <SectionHeading
          kicker="Contact"
          title="Let's talk"
          description="Open to senior AI/data architecture roles, advisory work, and research collaborations."
          align="center"
        />
        <FadeIn>
          <div className="mx-auto flex max-w-md flex-col items-center gap-6">
            <Button asChild size="lg" className="w-full">
              <a href={`mailto:${profile.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                Email me
              </a>
            </Button>
            <p className="text-sm text-[var(--text-muted)]">{profile.email}</p>
            <div className="flex items-center gap-3">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-soft)] transition hover:text-[var(--text)] hover:bg-[var(--link-bg-hover)]"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-soft)] transition hover:text-[var(--text)] hover:bg-[var(--link-bg-hover)]"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Contact.tsx
git commit -m "feat: add Contact section with mailto and socials"
```

---

## Task 24: Compose `routes/index.tsx`

**Files:**

- Modify: `src/routes/index.tsx` (full rewrite)

- [ ] **Step 1: Rewrite**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import About from '../sections/About'
import Awards from '../sections/Awards'
import Contact from '../sections/Contact'
import Experience from '../sections/Experience'
import Hero from '../sections/Hero'
import Projects from '../sections/Projects'
import Research from '../sections/Research'
import Skills from '../sections/Skills'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Research />
      <Awards />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: compose home page from all section components"
```

---

## Task 25: Delete `routes/about.tsx`

**Files:**

- Delete: `src/routes/about.tsx`
- Modify: `src/routeTree.gen.ts` (regenerated automatically)

- [ ] **Step 1: Delete the file**

Run: `rm src/routes/about.tsx`

- [ ] **Step 2: Run dev server to regenerate routeTree**

Run: `pnpm dev` (let it start, then Ctrl+C)
Expected: `src/routeTree.gen.ts` updated, no `/about` route reference remains.

- [ ] **Step 3: Verify type-check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors. If `routeTree.gen.ts` still references `/about`, run `pnpm dev` once more to regenerate.

- [ ] **Step 4: Commit**

```bash
git add -A src/routes src/routeTree.gen.ts
git commit -m "chore: remove unused /about route for single-page design"
```

---

## Task 26: Final verification (lint, typecheck, tests, build, preview)

**Files:** none

- [ ] **Step 1: Run linter**

Run: `pnpm lint`
Expected: No errors. Fix any reported issues inline (likely unused imports).

- [ ] **Step 2: Run formatter check**

Run: `pnpm format`
Expected: All files formatted. If any aren't, run `pnpm check` to auto-fix and review the diff.

- [ ] **Step 3: Run typecheck**

Run: `pnpm exec tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Run tests**

Run: `pnpm test`
Expected: All tests pass (setup, useInView, FadeIn, Hero, Projects).

- [ ] **Step 5: Run production build**

Run: `pnpm build`
Expected: Build succeeds, no errors.

- [ ] **Step 6: Preview build and visually verify**

Run: `pnpm preview` in background.

Open `http://localhost:3000` (or whatever port preview reports) and check:

- Dark mode is the default on first load.
- Theme toggle switches dark↔light and persists across reload.
- Navbar anchor links smooth-scroll to each section.
- Mobile menu opens/closes (resize browser to <1024px).
- Hero CTAs work; GitHub button opens `https://github.com/jasonli0226` in a new tab.
- Clawix card is visually emphasized; "View on GitHub" opens `https://github.com/ClawixAI/clawix`.
- All sections render without broken layout on 360px / 768px / 1280px widths.
- Mailto button on Contact opens email client.
- No console errors.

Stop the preview server when done.

- [ ] **Step 7: Commit any final fixes**

If you made fixes after Step 1-6:

```bash
git add -A
git commit -m "chore: lint and format fixes"
```

If no fixes needed, skip the commit.

---

## Vercel deployment notes (post-implementation)

These are for the user to run after the plan completes — not part of the engineering work:

1. Push the repo to GitHub.
2. In Vercel dashboard → "Add New Project" → import the repo.
3. Framework preset: leave auto-detected (TanStack Start has a Vercel preset).
4. Build command: `pnpm build`. Install command: `pnpm install`. Output: auto.
5. Deploy. Add a custom domain later if desired.
6. No `vercel.json` is required.
