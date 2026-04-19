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
