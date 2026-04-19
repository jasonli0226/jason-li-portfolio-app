import FadeIn from '../components/FadeIn'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'

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
              <ProjectCard project={clawix} variant="flagship" />
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
