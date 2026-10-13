import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from 'framer-motion'
import { Section } from './ui/Section'
import { EducationTimeline } from './EducationTimeline'

function ScrubText({ children }: { children: string }) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = textRef.current
    if (!element || reducedMotion) return

    const context = gsap.context(() => {
      gsap.fromTo(element.querySelectorAll('[data-word]'), { opacity: 0.22 }, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: element, start: 'top 82%', end: 'bottom 60%', scrub: true },
      })
    }, element)

    return () => context.revert()
  }, [reducedMotion])

  return <p className="about-copy" ref={textRef}>{children.split(' ').map((word, index) => <span data-word key={`${word}-${index}`}>{word} </span>)}</p>
}

export function About() {
  return (
    <Section id="about" number="01" title="About">
      <div className="space-y-7">
        <ScrubText>I started in design, sketching interfaces long before I could code them, so I still open Figma before the editor. I like knowing what a screen should do before I decide how it works.</ScrubText>
        <ScrubText>Today I build full-stack products with React, Node and Postgres, and I sweat the unglamorous parts: keyboard focus, loading states, query plans, and bundle size. I do my best work in small teams where design and engineering share one conversation.</ScrubText>
      </div>
      <EducationTimeline />
    </Section>
  )
}
