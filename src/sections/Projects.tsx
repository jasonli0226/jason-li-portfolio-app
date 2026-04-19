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
