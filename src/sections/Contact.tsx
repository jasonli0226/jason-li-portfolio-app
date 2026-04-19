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
