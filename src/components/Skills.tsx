import { skills } from '../data/portfolio'
import { Section, Reveal } from './ui/Section'

export function Skills() {
  return (
    <Section id="skills" number="02" title="Capabilities">
      <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 2xl:grid-cols-4">
        {skills.map((group, index) => (
          <Reveal key={group.category}>
            <h3 className="skill-category"><span>{group.category}</span><b>0{index + 1}</b></h3>
            <ul>
              {group.items.map((skill) => <li className="skill-row" data-cursor-target key={skill}><span>{skill}</span><span className='hidden' aria-hidden="true">↗</span></li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
