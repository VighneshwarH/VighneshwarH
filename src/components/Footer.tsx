import { ArrowUp, Phone } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { HoverRoll } from './ui/AnimatedText'
import { LuGithub, LuInstagram, LuLinkedin } from 'react-icons/lu'
import { FiGithub } from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="site-wrap footer-shell" id="contact">
      <span aria-hidden="true" className="section-rule" />
      <div className="section-label"><span>05</span><h2>Contact</h2></div>
      <div>
        <p className="footer-prompt">Let’s build something worth keeping.</p>
        <a className="footer-email" href={`mailto:${portfolio.email}`}><HoverRoll>{portfolio.email}</HoverRoll></a>
        <ul className="mt-10 flex items-center flex-wrap gap-x-8 gap-y-3 font-mono text-[0.68rem] uppercase tracking-[0.12em]">
          <li><a href={portfolio.links.github} rel="noreferrer" target="_blank" data-cursor-target><FiGithub size={18}/></a></li>
          <li><a href={portfolio.links.linkedin} rel="noreferrer" target="_blank" data-cursor-target><LuLinkedin size={18}/></a></li>
          <li><a href={portfolio.links.instagram} rel="noreferrer" target="_blank" data-cursor-target><LuInstagram size={18}/></a></li>
          <li><a href={portfolio.links.phone} className='flex items-center justify-center text-[0.9rem] gap-1' rel="noreferrer" target="_blank" data-cursor-target><Phone size={18}/><span>+91-9110445487</span></a></li>
        </ul>
        <p className="footer-bottom"><span>&copy; {new Date().getFullYear()} {portfolio.name}</span><a aria-label="Back to top" href="#" id="btt" data-cursor-target><ArrowUp aria-hidden="true" size={16} /></a></p>
      </div>
    </footer>
  )
}
