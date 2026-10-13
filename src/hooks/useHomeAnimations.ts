import { type RefObject, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHomeAnimations(
  scope: RefObject<HTMLElement | null>,
  reducedMotion: boolean | null,
) {
  useEffect(() => {
    const root = scope.current
    if (!root || reducedMotion) return

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('[data-hero-character]', {
          yPercent: 118,
          duration: 1.2,
          stagger: 0.03,
        })
        .from(
          '[data-hero-reveal]',
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.75,
            stagger: 0.08,
          },
          '-=0.8',
        )
        .from(
          '[data-hero-portrait] img',
          {
            yPercent: 2,
            opacity:0,
            duration: 1.8,
            ease: 'expo.out',
          },
          '-=0.9',
        )

      gsap.utils.toArray<HTMLElement>('.section-rule').forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rule,
            start: 'top 90%',
          },
        })
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion, scope])
}