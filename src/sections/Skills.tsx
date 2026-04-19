import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '../components/ui/badge'
import FadeIn from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import { skillCategories } from '../data/skills'

const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
}

const chipItem = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="skills" className="px-4 py-20 sm:py-28">
      <div className="page-wrap">
        <SectionHeading kicker="Skills" title="Technical expertise" />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, i) => {
            const Icon = category.icon
            return (
              <FadeIn key={category.title} delay={((i % 2) * 100) as 0 | 100}>
                <div className="surface-card h-full p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      {category.title}
                    </h3>
                  </div>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={chipContainer}
                    initial={shouldReduceMotion ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  >
                    {category.items.map((item) => (
                      <motion.div key={item} variants={chipItem}>
                        <Badge
                          variant="outline"
                          className="border-[var(--chip-line)] text-[var(--text-soft)]"
                        >
                          {item}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
