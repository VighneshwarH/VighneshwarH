import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'
import { Section } from './ui/Section'
import { EducationTimeline } from './EducationTimeline'

gsap.registerPlugin(ScrollTrigger)

function ScrubText({ children }: { children: string }) {
  return <p className="about-copy">{children.split(' ').map((word, index) => <span data-about-word key={`${word}-${index}`}>{word} </span>)}</p>
}

export function About() {
  const copyRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const copy = copyRef.current
    if (!copy || reducedMotion) return

    const words = Array.from(copy.querySelectorAll<HTMLElement>('[data-about-word]'))
    let timeline: gsap.core.Timeline | undefined
    let resizeTimer: number | undefined

    const buildTimeline = () => {
      timeline?.scrollTrigger?.kill()
      timeline?.kill()

      const lines = new Map<number, HTMLElement[]>()
      words.forEach((word) => {
        const lineTop = Math.round(word.getBoundingClientRect().top)
        const line = lines.get(lineTop) ?? []
        line.push(word)
        lines.set(lineTop, line)
      })

      gsap.set(words, { opacity: 0.22 })
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: copy,
          start: 'top 82%',
          end: 'bottom 55%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      Array.from(lines.values()).forEach((line) => {
        timeline?.to(line, { duration: 1, ease: 'none', opacity: 1 }, '+=0.12')
      })
    }

    buildTimeline()

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(buildTimeline, 100)
    })
    resizeObserver.observe(copy)

    return () => {
      resizeObserver.disconnect()
      window.clearTimeout(resizeTimer)
      timeline?.scrollTrigger?.kill()
      timeline?.kill()
      gsap.set(words, { clearProps: 'opacity' })
    }
  }, [reducedMotion])

  return (
    <Section id="about" number="01" title="About">
      <div className="space-y-3" ref={copyRef}>
        <ScrubText>Hi I am Vighneshwar Hebbar, B.E Gradute-2026. I am a Full-Stack Developer and self-taught UI/UX Designer.</ScrubText>
        <ScrubText>I started in design, sketching interfaces long before I could code them, so I still open Figma before the editor. I like knowing what a screen should do before I decide how it works.</ScrubText>
        <ScrubText>Today I can build full-stack products with React, Next.js, Node.js, Java, Springboot and with sufficent help of various AI tools, and I sweat the unglamorous parts: keyboard focus, loading states, query plans, and bundle size. I do my best work in small teams where design and engineering share one conversation.</ScrubText>
      </div>
      <EducationTimeline />
    </Section>
  )
}
