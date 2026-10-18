'use client'

import { type CSSProperties, useEffect, useRef, useState } from 'react'
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

const rollingDigitSequences = {
  hundreds: Array.from({ length: 2 }, (_, index) => index % 10),
  tens: Array.from({ length: 11 }, (_, index) => index % 10),
  units: Array.from({ length: 101 }, (_, index) => index % 10),
}

function RollingDigit({ digits, offset }: { digits: number[]; offset: number }) {
  return (
    <span className="page-loader__digit">
      <span className="page-loader__digit-track" style={{ '--loader-digit-translate': `-${offset * 1.1}em` } as CSSProperties}>
        {digits.map((digit, index) => <span key={`${digit}-${index}`}>{digit}</span>)}
      </span>
    </span>
  )
}

function RollingPercentage({ progress }: { progress: number }) {
  return (
    <output aria-hidden="true" className="page-loader__percentage">
      <RollingDigit digits={rollingDigitSequences.hundreds} offset={Math.floor(progress / 100)} />
      <RollingDigit digits={rollingDigitSequences.tens} offset={Math.floor(progress / 10)} />
      <RollingDigit digits={rollingDigitSequences.units} offset={progress} />
      <span className="page-loader__percentage-symbol">%</span>
    </output>
  )
}

function PageLoader() {
  const [state, setState] = useState<'loading' | 'leaving' | 'hidden'>('loading')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const loaderDuration = 1800
    const startTimer = window.setTimeout(() => setProgress(100), 32)
    const leaveTimer = window.setTimeout(() => setState('leaving'), loaderDuration + 48)
    const removeTimer = window.setTimeout(() => setState('hidden'), loaderDuration + 468)

    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (state === 'hidden') return null

  return (
    <div aria-label="Loading portfolio" className="page-loader" data-state={state} role="status">
      <p className="page-loader__eyebrow">Vighneshwar Hebbar · Portfolio 2026</p>
      <div aria-label={`${progress}% loaded`} aria-valuemax={100} aria-valuemin={0} aria-valuenow={progress} className="page-loader__progress" role="progressbar">
        <RollingPercentage progress={progress} />
      </div>
      <p className="page-loader__status">Loading the work</p>
    </div>
  )
}

function Home() {
  const pageRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useHomeAnimations(pageRef, reducedMotion)

  return (
    <div ref={pageRef}>
      <PageLoader />
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
