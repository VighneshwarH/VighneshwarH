import { jobs } from '../data/portfolio'
import { Section } from './ui/Section'

export function Experience() {
  return (
    <Section id="experience" number="04" title="Experience">
      <div>
        {jobs.map((job) => (
          <article className="job-row" key={job.period} data-cursor-target>
            <span aria-hidden="true" className="section-rule" />
            <p className="job-period">{job.period}</p>
            <h3 className="job-title">{job.role}<span>{job.company}</span></h3>
            <p className="job-copy">{job.description}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
