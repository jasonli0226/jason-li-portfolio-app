import { Award, Github } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import type { Project } from '../data/projects'

export type ProjectCardVariant = 'default' | 'flagship'

type Props = {
  project: Project
  variant?: ProjectCardVariant
}

export default function ProjectCard({ project, variant = 'default' }: Props) {
  const isFlagship = variant === 'flagship'
  return (
    <div
      className={
        'surface-card project-card relative flex h-full flex-col p-6 ' +
        (isFlagship
          ? 'flagship-border border-[var(--accent)]/40 ring-1 ring-[var(--accent)]/20'
          : '')
      }
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={
            'font-semibold text-[var(--text)] ' +
            (isFlagship ? 'text-xl' : 'text-lg')
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
          <Button asChild size="sm" variant={isFlagship ? 'default' : 'outline'}>
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
