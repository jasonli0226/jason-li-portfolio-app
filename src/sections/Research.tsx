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
