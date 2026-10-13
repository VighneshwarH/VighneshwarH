import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from 'framer-motion'

const inactiveCornerPositions = [
  { x: -18, y: -18 },
  { x: 6, y: -18 },
  { x: 6, y: 6 },
  { x: -18, y: 6 },
]

const TARGET_SELECTOR = [
  'h1',
  'h4',
  '.hero-intro',
  '.hero-title',
  '.skill-row',
  'img',
  'education-card',
  'project-card',
  '.caption',
  '.label',
  'p[data-cursor-target]',
  'a',
].join(',')

export function TargetCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const cursor = cursorRef.current

    if (!cursor || reducedMotion) return

    const isTouchDevice = window.matchMedia(
      '(hover: none), (pointer: coarse)',
    ).matches

    /*
     * Desktop / mouse only.
     *
     * On touch and tablet devices we don't create a fake
     * cursor because there is no persistent pointer to follow.
     */
    if (isTouchDevice) {
      document.documentElement.classList.add('has-touch-interface')

      return () => {
        document.documentElement.classList.remove('has-touch-interface')
      }
    }

    const corners = Array.from(
      cursor.querySelectorAll<HTMLElement>('[data-cursor-corner]'),
    )

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    let activeTarget: Element | null = null

    document.documentElement.classList.add('has-target-cursor')

    /*
     * The original cursor was too responsive because its movement
     * duration was very short.
     *
     * 0.55s gives the cursor a softer, more editorial movement.
     */
    const moveX = gsap.quickTo(cursor, 'x', {
      duration: 0.55,
      ease: 'power3.out',
    })

    const moveY = gsap.quickTo(cursor, 'y', {
      duration: 0.55,
      ease: 'power3.out',
    })

    const moveCorners = (
      positions: { x: number; y: number }[],
      duration = 0.55,
    ) => {
      corners.forEach((corner, index) => {
        gsap.to(corner, {
          ...positions[index],
          duration,
          ease: 'expo.out',
          overwrite: 'auto',
        })
      })
    }

    const deactivate = () => {
      activeTarget = null

      cursor.dataset.active = 'false'

      moveCorners(inactiveCornerPositions, 0.45)
    }

    const activate = (target: Element) => {
      const bounds = target.getBoundingClientRect()

      const cursorX =
        Number(gsap.getProperty(cursor, 'x')) || pointer.x

      const cursorY =
        Number(gsap.getProperty(cursor, 'y')) || pointer.y

      activeTarget = target

      cursor.dataset.active = 'true'

      moveCorners(
        [
          {
            x: bounds.left - cursorX - 3,
            y: bounds.top - cursorY - 3,
          },
          {
            x: bounds.right - cursorX - 9,
            y: bounds.top - cursorY - 3,
          },
          {
            x: bounds.right - cursorX - 9,
            y: bounds.bottom - cursorY - 9,
          },
          {
            x: bounds.left - cursorX - 3,
            y: bounds.bottom - cursorY - 9,
          },
        ],
        0.6,
      )
    }

    const onMouseMove = (event: MouseEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY

      moveX(pointer.x)
      moveY(pointer.y)

      if (activeTarget) {
        activate(activeTarget)
      }
    }

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null

      if (!target) return

      const nextTarget = target.closest(TARGET_SELECTOR)

      if (nextTarget) {
        activate(nextTarget)
      }
    }

    const onMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null

      if (!target) return

      const fromTarget = target.closest(TARGET_SELECTOR)

      const relatedTarget =
        event.relatedTarget as HTMLElement | null

      const toTarget =
        relatedTarget?.closest?.(TARGET_SELECTOR)

      if (fromTarget && fromTarget !== toTarget) {
        deactivate()
      }
    }

    const onScroll = () => {
      if (activeTarget) {
        activate(activeTarget)
      }
    }

    window.addEventListener(
      'mousemove',
      onMouseMove,
      { passive: true },
    )

    window.addEventListener(
      'mouseover',
      onMouseOver,
    )

    window.addEventListener(
      'mouseout',
      onMouseOut,
    )

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true },
    )

    moveCorners(
      inactiveCornerPositions,
      0,
    )

    return () => {
      document.documentElement.classList.remove(
        'has-target-cursor',
      )

      window.removeEventListener(
        'mousemove',
        onMouseMove,
      )

      window.removeEventListener(
        'mouseover',
        onMouseOver,
      )

      window.removeEventListener(
        'mouseout',
        onMouseOut,
      )

      window.removeEventListener(
        'scroll',
        onScroll,
      )

      gsap.killTweensOf(cursor)
      corners.forEach((corner) => {
        gsap.killTweensOf(corner)
      })
    }
  }, [reducedMotion])

  return (
    <div
      aria-hidden="true"
      className="target-cursor"
      data-active="false"
      ref={cursorRef}
    >
      <div className="target-cursor__dot" />

      <div
        className="target-cursor__corner target-cursor__corner--tl"
        data-cursor-corner
      />

      <div
        className="target-cursor__corner target-cursor__corner--tr"
        data-cursor-corner
      />

      <div
        className="target-cursor__corner target-cursor__corner--br"
        data-cursor-corner
      />

      <div
        className="target-cursor__corner target-cursor__corner--bl"
        data-cursor-corner
      />
    </div>
  )
}