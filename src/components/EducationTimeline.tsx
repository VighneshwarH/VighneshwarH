
import { motion, useReducedMotion } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { education } from '../data/portfolio'

type RoutePoint = {
  left: number
  right: number
  x: number
  y: number
}

type Route = {
  height: number
  path: string
  width: number
}

type RouteWaypoint = RoutePoint & {
  tangentX: number
  tangentY: number
}

const CARD_REVEAL_DURATION = 0.5
const CARD_REVEAL_STAGGER = 0.65
const PATH_DURATION = 2

function curveTo(from: RouteWaypoint, to: RouteWaypoint): string {
  return ` C ${from.x + from.tangentX} ${from.y + from.tangentY}, ${to.x - to.tangentX} ${to.y - to.tangentY}, ${to.x} ${to.y}`
}

// Original wave design, preserved as one continuous SVG path.
function createRoute(points: RoutePoint[]): string {
  const [firstPoint, ...remainingPoints] = points

  if (!firstPoint) return ''

  let path = `M ${firstPoint.x} ${firstPoint.y}`
  let previousPoint = firstPoint

  for (const [index, point] of remainingPoints.entries()) {
    const leftCardHalf = previousPoint.right - previousPoint.x
    const rightCardHalf = point.x - point.left
    const isTallWave = index % 2 === 1

    const crestLift = Math.min(
      isTallWave ? 150 : 82,
      Math.max(
        isTallWave ? 72 : 38,
        leftCardHalf * (isTallWave ? 1.5 : 0.65),
      ),
    )

    const valleyClearance = Math.min(
      56,
      Math.max(24, rightCardHalf * 0.45),
    )

    const startPoint: RouteWaypoint = {
      ...previousPoint,
      tangentX: leftCardHalf * 0.1,
      tangentY: 0,
    }

    const risePoint: RouteWaypoint = {
      left: previousPoint.left,
      right: previousPoint.right,
      x: previousPoint.x + leftCardHalf * 0.52,
      y: Math.max(12, previousPoint.y - crestLift * 0.7),
      tangentX: leftCardHalf * 0.15,
      tangentY: 0,
    }

    const crestPoint: RouteWaypoint = {
      left: previousPoint.left,
      right: previousPoint.right,
      x: previousPoint.right,
      y: Math.max(12, previousPoint.y - crestLift),
      tangentX: leftCardHalf * 0.07,
      tangentY: 0,
    }

    const settlePoint: RouteWaypoint = {
      left: point.left,
      right: point.right,
      x: point.left + rightCardHalf * (isTallWave ? 0.32 : 0.48),
      y: Math.max(12, point.y - valleyClearance),
      tangentX: rightCardHalf * 0.17,
      tangentY: valleyClearance * 0.12,
    }

    const endPoint: RouteWaypoint = {
      ...point,
      tangentX: rightCardHalf * 0.1,
      tangentY: 0,
    }

    path += curveTo(startPoint, risePoint)
    path += curveTo(risePoint, crestPoint)
    path += curveTo(crestPoint, settlePoint)

    if (isTallWave) {
      const ripplePoint: RouteWaypoint = {
        left: point.left,
        right: point.right,
        x: point.x - rightCardHalf * 0.25,
        y: point.y - valleyClearance * 1.1,
        tangentX: rightCardHalf * 0.1,
        tangentY: 0,
      }

      path += curveTo(settlePoint, ripplePoint)
      path += curveTo(ripplePoint, endPoint)
    } else {
      path += curveTo(settlePoint, endPoint)
    }

    previousPoint = point
  }

  return path
}

export function EducationTimeline() {
  const reducedMotion = useReducedMotion()
  const mapRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLLIElement | null>>([])
  const [route, setRoute] = useState<Route | null>(null)
  const [isInView, setIsInView] = useState(false)

  useLayoutEffect(() => {
    const map = mapRef.current

    if (!map) return

    let cancelled = false
    let frameId = 0

    const measureRoute = () => {
      if (cancelled) return

      cancelAnimationFrame(frameId)

      frameId = requestAnimationFrame(() => {
        if (cancelled) return

        const mapBounds = map.getBoundingClientRect()

        if (!mapBounds.width || !mapBounds.height) return

        const points: RoutePoint[] = cardRefs.current.flatMap((card) => {
          if (!card) return []

          const bounds = card.getBoundingClientRect()

          return [
            {
              left: bounds.left - mapBounds.left,
              right: bounds.right - mapBounds.left,
              x: bounds.left - mapBounds.left + bounds.width / 2,
              y: bounds.top - mapBounds.top,
            },
          ]
        })

        if (points.length !== education.length) return

        setRoute({
          width: mapBounds.width,
          height: mapBounds.height,
          path: createRoute(points),
        })
      })
    }

    // Measure before revealing cards so the path uses stable positions.
    const fontsReady = document.fonts?.ready ?? Promise.resolve()

    fontsReady.then(() => {
      if (!cancelled) measureRoute()
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 },
    )

    observer.observe(map)

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [])

  const shouldAnimate = Boolean(route && isInView)

  return (
    <section
      aria-labelledby="education-title"
      className="education-timeline"
    >
      <div className="education-heading">
        <div>
          <p className="eyebrow">Education</p>
          <h3 id="education-title">Learning never ends.</h3>
        </div>

        <p>
          Milestones that shaped how I think, make, and keep learning.
        </p>
      </div>

      <div className="education-map" ref={mapRef}>
        {route && (
          <svg
            aria-hidden="true"
            className="education-path"
            viewBox={`0 0 ${route.width} ${route.height}`}
            preserveAspectRatio="none"
          >
            <motion.path
              d={route.path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: shouldAnimate ? 1 : 0,
              }}
              transition={{
                pathLength: {
                  duration: reducedMotion ? 0 : PATH_DURATION,
                  ease: 'linear',
                },
              }}
            />
          </svg>
        )}

        <ol className="education-list">
          {education.map((item, index) => (
            <motion.li
              className="education-card rounded-lg"
              data-cursor-target
              key={`${item.period}-${item.degree}`}
              ref={(card) => {
                cardRefs.current[index] = card
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: shouldAnimate ? 1 : 0,
              }}
              transition={{
                duration: reducedMotion ? 0 : CARD_REVEAL_DURATION,
                delay: reducedMotion
                  ? 0
                  : index * CARD_REVEAL_STAGGER,
                ease: 'linear',
              }}
            >
              <span className="education-card__period">
                {item.period}
              </span>

              <h4>{item.degree}</h4>

              <p className="education-card__institution">
                {item.institution}
              </p>

              <p className="education-card__detail">
                {item.percent_or_cgpa}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
