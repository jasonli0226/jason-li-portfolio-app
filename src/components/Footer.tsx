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
