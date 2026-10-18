import Image from 'next/image'
import { projects } from '../data/portfolio'
import { LetterRoll } from './ui/AnimatedText'
import { Section, Reveal } from './ui/Section'

function ProjectVisual({ imageSrc, imageAlt, gradient, title }: (typeof projects)[number]) {
  return (
    <div aria-label={imageAlt} className="project-visual" role="img" style={{ background: gradient }}>
      {imageSrc ? <Image alt={imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" src={imageSrc} /> : <><span className="project-visual__glass" /><span className="project-visual__orb" /><em>{title}</em></>}
    </div>
  )
}

export function Projects() {
  return (
    <Section id="work" number="03" title="Projects">
      <div className="border-t border-(--line)">
        {projects.map((project) => (
          <Reveal key={project.title}>
            <article className="project-card" data-cursor-target>
              <div className="project-card__meta"><span>{project.eyebrow}</span><span className='hidden'>Case study ↗</span></div>
              <div className="min-w-0 py-1">
                <h3 className="display project-title" data-project-title><LetterRoll>{project.title}</LetterRoll></h3>
                <p className="project-copy mt-4"><strong>Problem:</strong> {project.problem}</p>
                <p className="project-copy mt-1"><strong>Result:</strong> {project.result}</p>
                <ul aria-label={`${project.title} technologies`} className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => <li className="technology-chip" key={technology}>{technology}</li>)}
                </ul>
              </div>
              <ProjectVisual {...project} />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
