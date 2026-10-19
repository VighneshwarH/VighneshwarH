'use client'

import { type CSSProperties, type MouseEvent, useEffect, useRef, useState } from 'react'
import { navigation, portfolio } from '../data/portfolio'
import { HoverRoll } from './ui/AnimatedText'

const mobileNavigation = [['top', 'Home'] as const, ...navigation]
const themeStorageKey = 'portfolio-theme'

type Theme = 'light' | 'dark'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggle({ className, theme, onToggle }: { className?: string; theme: Theme | null; onToggle: () => void }) {
  const isDark = theme === 'dark'

  return (
    <button
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`theme-toggle ${className ?? ''}`}
      onClick={onToggle}
      type="button"
      data-cursor-target
    >
      {isDark ? (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      ) : (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7 5.3 5.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
        </svg>
      )}
    </button>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pendingNavigationTarget, setPendingNavigationTarget] = useState<string | null>(null)
  const [theme, setTheme] = useState<Theme | null>(null)
  const menuRef = useRef<HTMLElement>(null)

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem(themeStorageKey)
      setTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : getSystemTheme())
    } catch {
      setTheme(getSystemTheme())
    }
  }, [])

  useEffect(() => {
    if (!theme) return

    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme

    try {
      window.localStorage.setItem(themeStorageKey, theme)
    } catch {
      // Theme selection remains active for the current visit if storage is unavailable.
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const activeTheme = currentTheme ?? getSystemTheme()
      return activeTheme === 'dark' ? 'light' : 'dark'
    })
  }

  useEffect(() => {
    if (!isMenuOpen) return

    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    const desktopMediaQuery = window.matchMedia('(min-width: 768px)')
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu()
    }

    window.addEventListener('keydown', closeOnEscape)
    desktopMediaQuery.addEventListener('change', closeAtDesktop)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      desktopMediaQuery.removeEventListener('change', closeAtDesktop)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return

    const { body, documentElement } = document
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    const previousStyles = {
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      documentOverflow: documentElement.style.overflow,
    }

    body.dataset.mobileMenuOpen = 'true'
    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollbarWidth}px`
    documentElement.style.overflow = 'hidden'

    return () => {
      delete body.dataset.mobileMenuOpen
      body.style.overflow = previousStyles.bodyOverflow
      body.style.paddingRight = previousStyles.bodyPaddingRight
      documentElement.style.overflow = previousStyles.documentOverflow
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen || !pendingNavigationTarget) return

    const target = document.getElementById(pendingNavigationTarget)
    if (!target) {
      setPendingNavigationTarget(null)
      return
    }

    const animationFrame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${pendingNavigationTarget}`)
      setPendingNavigationTarget(null)
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [isMenuOpen, pendingNavigationTarget])

  const handleMenuNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget.getAttribute('href')
    if (!target?.startsWith('#')) return

    event.preventDefault()
    setPendingNavigationTarget(target.slice(1))
    closeMenu()
  }

  return (
    <>
      <header className={`site-header pointer-events-none sticky top-0 z-200 backdrop-blur-xl shadow-sm shadow-[#d4220e40] ${isMenuOpen ? 'site-header--menu-open' : ''}`}>
        <nav aria-label="Primary" className="site-wrap pointer-events-auto flex items-center justify-between gap-6 py-4">
        <a aria-label={`${portfolio.name}, home`} className="logo" data-cursor-target href="#">
          {`${portfolio.shortName}`}<span className='dot'>.</span>
        </a>
        <ul className="desktop-navigation flex items-center gap-7 font-mono text-[0.68rem] uppercase tracking-[0.12em]">
          {navigation.map(([id, label]) => (
            <li key={id}>
              <a className="nav-link" data-cursor-target href={`#${id}`}>
                <HoverRoll>{label}</HoverRoll>
              </a>
            </li>
          ))}
          <li><ThemeToggle theme={theme} onToggle={toggleTheme} /></li>
        </ul>

        <div className="header-controls">
          <ThemeToggle className="theme-toggle--mobile" theme={theme} onToggle={toggleTheme} />
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <span aria-hidden="true" className="mobile-menu-toggle__label">{isMenuOpen ? 'Close' : 'Menu'}</span>
            <span aria-hidden="true" className="mobile-menu-toggle__icon"><i /><i /></span>
          </button>
        </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="mobile-menu" onClick={closeMenu}>
          <nav aria-label="Mobile navigation" className="mobile-menu__panel" id="mobile-navigation" onClick={(event) => event.stopPropagation()} ref={menuRef}>
            <button aria-label="Close navigation menu" className="mobile-menu__close" onClick={closeMenu} type="button">
              <span>Close</span>
              <span aria-hidden="true">×</span>
            </button>
            <div className="mobile-menu__topline"><span>Navigate</span><span>01—06</span></div>
            <ul>
              {mobileNavigation.map(([id, label], index) => (
                <li key={id} style={{ '--menu-index': index } as CSSProperties}>
                  <a href={`#${id}`} onClick={handleMenuNavigation}><span>0{index + 1}</span>{label}<b aria-hidden="true">↘</b></a>
                </li>
              ))}
            </ul>
            <a className="mobile-menu__contact" href={`mailto:${portfolio.email}`} onClick={closeMenu}><span>Available for work</span>{portfolio.email}</a>
          </nav>
        </div>
      )}
    </>
  )
}
