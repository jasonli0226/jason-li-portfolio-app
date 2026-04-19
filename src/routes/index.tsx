import { createFileRoute } from '@tanstack/react-router'
import About from '../sections/About'
import Awards from '../sections/Awards'
import Contact from '../sections/Contact'
// import Experience from '../sections/Experience'
import Hero from '../sections/Hero'
import Projects from '../sections/Projects'
import Research from '../sections/Research'
import Skills from '../sections/Skills'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      {/* <Experience /> */}
      <Projects />
      <Skills />
      <Research />
      <Awards />
      <Contact />
    </main>
  )
}
