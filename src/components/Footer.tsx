import { portfolio } from '../data/portfolio'
import { HoverRoll } from './ui/AnimatedText'

export function Footer() {
  return (
    <footer className="site-wrap footer-shell" id="contact">
      <span aria-hidden="true" className="section-rule" />
      <div className="section-label cursor-target" data-cursor-target><span>05</span><h2>Contact</h2></div>
      <div>
        <p className="footer-prompt">Let’s build something worth keeping.</p>
        <a className="footer-email" data-cursor-target href={`mailto:${portfolio.email}`}><HoverRoll>{portfolio.email}</HoverRoll></a>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.68rem] uppercase tracking-[0.12em]">
          <li><a data-cursor-target href={portfolio.links.github} rel="noreferrer" target="_blank"><HoverRoll>GitHub ↗</HoverRoll></a></li>
          <li><a data-cursor-target href={portfolio.links.linkedin} rel="noreferrer" target="_blank"><HoverRoll>LinkedIn ↗</HoverRoll></a></li>
          <li><a data-cursor-target href={`mailto:${portfolio.email}`}><HoverRoll>Email ↗</HoverRoll></a></li>
        </ul>
        <p className="footer-bottom"><span>© 2026 {portfolio.name}</span><a data-cursor-target href="#top"><HoverRoll>Back to top ↑</HoverRoll></a></p>
      </div>
    </footer>
  )
}
