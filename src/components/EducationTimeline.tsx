import { motion, useReducedMotion } from 'framer-motion'
import { education } from '../data/portfolio'

const pathDefinition = 'M 18 300 C 200 85, 345 80, 500 208 S 790 355, 982 94'
const timelineNodes = [
  { x: 214, y: 140 },
  { x: 500, y: 208 },
  { x: 805, y: 245 },
]

export function EducationTimeline() {
  const reducedMotion = useReducedMotion()

  return (
    <section aria-labelledby="education-title" className="education-timeline">
      <div className="education-heading">
        <div>
          <p className="eyebrow">Education</p>
          <h3 id="education-title">Learning never ends.</h3>
        </div>
        <p>Milestones that shaped how I think, make, and keep learning.</p>
      </div>

      <div className="education-map">
        <svg aria-hidden="true" className="education-path" viewBox="0 0 1000 380" preserveAspectRatio="none">
          <motion.path
            d={pathDefinition}
            fill="none"
            initial={reducedMotion ? false : { pathLength: 0 }}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.55 }}
            whileInView={reducedMotion ? undefined : { pathLength: 1 }}
          />
          {timelineNodes.map((node, index) => (
            <circle className="education-node" cx={node.x} cy={node.y} key={index} r="7" />
          ))}
        </svg>

        <ol className="education-list">
          {education.map((item, index) => (
            <motion.li
              className="education-card"
              data-cursor-target
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              key={`${item.period}-${item.degree}`}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.45 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <span className="education-card__period">{item.period}</span>
              <h4>{item.degree}</h4>
              <p className="education-card__institution">{item.institution}</p>
              <p className="education-card__detail">{item.percent_or_cgpa}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
