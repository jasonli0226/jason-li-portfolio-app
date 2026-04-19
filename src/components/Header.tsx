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
        <a href="#hero" className="flex items-center gap-2 text-base font-bold text-[var(--text)]">
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
