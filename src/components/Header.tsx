import { navigation, portfolio } from '../data/portfolio'
import { HoverRoll } from './ui/AnimatedText'

export function Header() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 text-white mix-blend-difference backdrop-blur-xl">
      <nav aria-label="Primary" className="site-wrap pointer-events-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
        <a aria-label={`${portfolio.name}, home`} className="nav-link" data-cursor-target href="#top">
          <HoverRoll>{`${portfolio.shortName} — Portfolio ’26`}</HoverRoll>
        </a>
        <ul className="flex w-full gap-4 overflow-x-auto font-mono text-[0.68rem] uppercase tracking-[0.12em] sm:w-auto sm:gap-7">
          {navigation.map(([id, label]) => (
            <li key={id}>
              <a className="nav-link" data-cursor-target href={`#${id}`}>
                <HoverRoll>{label}</HoverRoll>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
