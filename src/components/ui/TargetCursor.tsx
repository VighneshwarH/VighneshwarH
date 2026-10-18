import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from 'framer-motion'

const TARGET_SELECTOR = '[data-cursor-target]'

const restingCornerPositions = [
  { x: -13, y: -13 },
  { x: 4, y: -13 },
  { x: 4, y: 4 },
  { x: -13, y: 4 },
]

function getInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null

  return target.closest<HTMLElement>(TARGET_SELECTOR)
}

export function TargetCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || reducedMotion) return

    const root = document.documentElement
    const desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const corners = Array.from(cursor.querySelectorAll<HTMLElement>('[data-cursor-corner]'))
    let clearDesktopCursor = () => {}

    const resetVisuals = () => {
      root.classList.remove('has-desktop-cursor')
      cursor.dataset.visible = 'false'
      cursor.dataset.target = 'false'
    }

    const setupDesktopCursor = () => {
      root.classList.add('has-desktop-cursor')

      const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      const cursorPosition = { ...pointer }
      let activeTarget: HTMLElement | null = null

      const setCornerPositions = (
        positions: { x: number; y: number }[],
        duration = 0,
      ) => {
        corners.forEach((corner, index) => {
          const position = positions[index]

          if (duration > 0) {
            gsap.to(corner, {
              ...position,
              duration,
              ease: 'power3.out',
              overwrite: 'auto',
            })
            return
          }

          gsap.set(corner, position)
        })
      }

      const getMagneticPosition = () => {
        if (!activeTarget) return pointer

        const bounds = activeTarget.getBoundingClientRect()
        const centerX = bounds.left + bounds.width / 2
        const centerY = bounds.top + bounds.height / 2
        const magnetism = Math.min(0.12, 18 / Math.max(bounds.width, bounds.height, 1))

        return {
          x: pointer.x + (centerX - pointer.x) * magnetism,
          y: pointer.y + (centerY - pointer.y) * magnetism,
        }
      }

      const positionCursor = () => {
        const nextPosition = getMagneticPosition()
        cursorPosition.x = nextPosition.x
        cursorPosition.y = nextPosition.y
        gsap.set(cursor, nextPosition)
      }

      const positionTargetFrame = (animate = false) => {
        if (!activeTarget) return

        const bounds = activeTarget.getBoundingClientRect()
        const padding = 7

        setCornerPositions([
          { x: bounds.left - cursorPosition.x - padding, y: bounds.top - cursorPosition.y - padding },
          { x: bounds.right - cursorPosition.x - 7, y: bounds.top - cursorPosition.y - padding },
          { x: bounds.right - cursorPosition.x - 7, y: bounds.bottom - cursorPosition.y - 7 },
          { x: bounds.left - cursorPosition.x - padding, y: bounds.bottom - cursorPosition.y - 7 },
        ], animate ? 0.18 : 0)
      }

      const resetTarget = () => {
        activeTarget = null
        cursor.dataset.target = 'false'
        setCornerPositions(restingCornerPositions, 0.14)
      }

      const activateTarget = (target: HTMLElement) => {
        activeTarget = target
        positionCursor()
        cursor.dataset.target = 'true'
        positionTargetFrame(true)
      }

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType && event.pointerType !== 'mouse') return

        pointer.x = event.clientX
        pointer.y = event.clientY
        cursor.dataset.visible = 'true'
        positionCursor()
        positionTargetFrame()
      }

      const onPointerOver = (event: PointerEvent) => {
        if (event.pointerType && event.pointerType !== 'mouse') return

        pointer.x = event.clientX
        pointer.y = event.clientY
        cursor.dataset.visible = 'true'
        const target = getInteractiveTarget(event.target)

        if (target) {
          activateTarget(target)
          return
        }

        positionCursor()
      }

      const onPointerOut = (event: PointerEvent) => {
        if (event.pointerType && event.pointerType !== 'mouse') return

        const fromTarget = getInteractiveTarget(event.target)
        const nextTarget = getInteractiveTarget(event.relatedTarget)

        if (fromTarget && fromTarget !== nextTarget) resetTarget()
      }

      const hideCursor = () => {
        cursor.dataset.visible = 'false'
        resetTarget()
      }

      const refreshTargetFrame = () => positionTargetFrame()

      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerover', onPointerOver, { passive: true })
      window.addEventListener('pointerout', onPointerOut, { passive: true })
      window.addEventListener('scroll', refreshTargetFrame, { passive: true })
      window.addEventListener('resize', refreshTargetFrame, { passive: true })
      window.addEventListener('blur', hideCursor)

      gsap.set(cursor, pointer)
      setCornerPositions(restingCornerPositions)

      return () => {
        root.classList.remove('has-desktop-cursor')
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerover', onPointerOver)
        window.removeEventListener('pointerout', onPointerOut)
        window.removeEventListener('scroll', refreshTargetFrame)
        window.removeEventListener('resize', refreshTargetFrame)
        window.removeEventListener('blur', hideCursor)
        gsap.killTweensOf([cursor, ...corners])
      }
    }

    const selectInputMode = () => {
      clearDesktopCursor()
      resetVisuals()

      if (desktopPointer.matches) {
        clearDesktopCursor = setupDesktopCursor()
      }
    }

    selectInputMode()
    desktopPointer.addEventListener('change', selectInputMode)

    return () => {
      clearDesktopCursor()
      desktopPointer.removeEventListener('change', selectInputMode)
      resetVisuals()
      gsap.killTweensOf([cursor, ...corners])
    }
  }, [reducedMotion])

  return (
    <div
      aria-hidden="true"
      className="target-cursor"
      data-target="false"
      data-visible="false"
      ref={cursorRef}
    >
      <span className="target-cursor__core" />
      <span className="target-cursor__orbiter" />
      <span className="target-cursor__corner target-cursor__corner--top-left" data-cursor-corner />
      <span className="target-cursor__corner target-cursor__corner--top-right" data-cursor-corner />
      <span className="target-cursor__corner target-cursor__corner--bottom-right" data-cursor-corner />
      <span className="target-cursor__corner target-cursor__corner--bottom-left" data-cursor-corner />
    </div>
  )
}
