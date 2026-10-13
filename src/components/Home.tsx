import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useHomeAnimations } from '../hooks/useHomeAnimations'
import { About } from './About'
import { Experience } from './Experience'
import { Footer } from './Footer'
import { Header } from './Header'
import { Hero } from './Hero'
import { Projects } from './Projects'
import { Skills } from './Skills'
import { TargetCursor } from './ui/TargetCursor'

function Home() {
  const pageRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useHomeAnimations(pageRef, reducedMotion)

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <TargetCursor />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
      </main>
      <Footer />
    </div>
  )
}

export default Home
