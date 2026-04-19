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
