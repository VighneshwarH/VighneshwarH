import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type SectionProps = {
  id: string
  number: string
  title: string
  children: ReactNode
}

export function Section({ id, number, title, children }: SectionProps) {
  return (
    <section className="site-wrap section-shell" id={id}>
      <span aria-hidden="true" className="section-rule" />
      <div className="section-label" data-cursor-target>
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  )
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-8%' }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}
