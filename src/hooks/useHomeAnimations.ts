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

      gsap.utils.toArray<HTMLElement>('.section-shell, .footer-shell').forEach((section) => {
        gsap.fromTo(section, {
          autoAlpha: 0,
          y: 28,
        }, {
          autoAlpha: 1,
          duration: 0.72,
          ease: 'power3.out',
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            end: 'bottom 16%',
            toggleActions: 'play reverse play reverse',
          },
        })
      })

      root.querySelectorAll<HTMLElement>('[data-project-title]').forEach((title) => {
        const letters = Array.from(title.querySelectorAll<HTMLElement>('.roll-character'))

        const titleTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: title,
            start: 'top 82%',
            end: 'bottom 18%',
            toggleActions: 'play reverse play reverse',
          },
        })

        letters.forEach((letter, index) => {
          titleTimeline.to(Array.from(letter.children), {
            yPercent: -100,
            duration: 0.46,
            ease: 'power3.out',
          }, index * 0.028)
        })
      })

      gsap.utils.toArray<HTMLElement>('.section-rule').forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rule,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          },
        })
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion, scope])
}
