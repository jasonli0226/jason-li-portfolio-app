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
            <FadeIn key={role.company} delay={Math.min(i * 100, 300) as 0 | 100 | 200 | 300} as="li">
              <span
                aria-hidden
                className="absolute -left-[7px] mt-2 block h-3 w-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg-base)]"
              />
              <div className="surface-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">{role.role}</h3>
                    <p className="text-sm text-[var(--accent)]">{role.company}</p>
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
