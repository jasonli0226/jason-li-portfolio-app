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
                <h3 className="text-lg font-semibold text-[var(--text)]">Awards</h3>
              </div>
              <ul className="space-y-3">
                {awards.map((a) => (
                  <li key={a.title} className="text-sm leading-relaxed text-[var(--text-soft)]">
                    <span className="text-[var(--text)]">{a.title}</span>
                    {a.year && (
                      <span className="ml-2 text-[var(--text-muted)]">· {a.year}</span>
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
                <h3 className="text-lg font-semibold text-[var(--text)]">Publications</h3>
              </div>
              <ul className="space-y-4">
                {publications.map((p) => (
                  <li key={p.title} className="text-sm leading-relaxed text-[var(--text-soft)]">
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
