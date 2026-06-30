'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon, Home, Briefcase, MessageCircle, Mail } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { navItems } from '@/constants/navigation'

/* Nav icon mapping for mobile menu */
const navIconMap: Record<string, React.ElementType> = {
  '#hero': Home,
  '#servicios': Briefcase,
  '#asesorias': MessageCircle,
  '#contacto': Mail,
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const [themeToggled, setThemeToggled] = useState(false)
  const [iconTransition, setIconTransition] = useState(false)
  const [menuReady, setMenuReady] = useState(false)
  const lastScrollYRef = useRef(0)
  const headerRef = useRef<HTMLElement>(null)
  const { theme, setTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync header CSS variable with actual height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight
        document.documentElement.style.setProperty('--header-height', `${height}px`)
      }
    }
    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [scrolled])

  // Scroll handler: auto-hide + scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      setScrolled(currentScrollY > 50)
      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver for active section
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Lock body scroll + trigger staggered animation when mobile menu opens
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      if (!prefersReducedMotion) {
        setMenuReady(false)
        const timer = setTimeout(() => setMenuReady(true), 50)
        return () => clearTimeout(timer)
      }
    } else {
      document.body.style.overflow = ''
      setMenuReady(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, prefersReducedMotion])

  const handleNavClick = useCallback(() => {
    setMenuOpen(false)
    setMenuReady(false)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeToggled(true)
    setIconTransition(true)
    setTheme(theme === 'dark' ? 'light' : 'dark')
    setTimeout(() => {
      setThemeToggled(false)
      setIconTransition(false)
    }, 600)
  }, [theme, setTheme])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
    setIconTransition(true)
    setTimeout(() => setIconTransition(false), 300)
  }, [])

  const isNavItemActive = (href: string) => activeSection === href

  return (
    <>
      {/* ══════════════════════════════════════════════
          Mobile Menu Backdrop Overlay
          ══════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════
          Header Bar
          ══════════════════════════════════════════════ */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        role="banner"
      >
        <div
          className={`
            transition-all duration-500 ease-out
            ${
              scrolled
                ? 'bg-background/90 backdrop-blur-xl border-b border-border/70 shadow-lg shadow-black/5 dark:shadow-black/20'
                : 'bg-background/80 backdrop-blur-md border-b border-border/50'
            }
          `}
        >
          <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5">
            {/* ═══ Logo ═══ */}
            <Link href="#hero" className="flex items-center gap-2 group relative" aria-label="Answer ST — Ir al inicio">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-full bg-secondary/20 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                {prefersReducedMotion ? (
                  <Image
                    src="/Logo_letra.png"
                    alt=""
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110 relative z-10"
                    priority
                    aria-hidden="true"
                  />
                ) : (
                  <div className="relative z-10 w-full h-full logo-pulse">
                    <Image
                      src="/Logo_letra.png"
                      alt=""
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      priority
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <span className="font-bold text-[15px] sm:text-lg lg:text-xl text-foreground whitespace-nowrap relative tracking-tight">
                {/* Light mode — ANSWER.st */}
                <span className="dark:hidden">
                  ANSWER<span className="text-secondary">.st</span>
                </span>
                {/* Dark mode — ANSWER st */}
                <span className="hidden dark:inline">
                  ANSWER<span className="text-green-500 dark:text-green-400"> st</span>
                </span>
              </span>
            </Link>

            {/* ═══ Desktop Navigation ═══ */}
            <nav className="hidden md:flex items-center gap-0.5" aria-label="Navegación principal">
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out
                      group overflow-hidden
                      ${
                        isActive
                          ? 'text-secondary'
                          : 'text-foreground/70 hover:text-foreground'
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute inset-0 rounded-lg transition-all duration-300 ease-out
                        ${isActive ? 'bg-secondary/10' : 'bg-transparent group-hover:bg-foreground/5'}
                      `}
                      aria-hidden="true"
                    />

                    <span
                      className={`
                        absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary
                        transition-all duration-300 ease-out
                        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-50 group-hover:scale-75'}
                      `}
                      aria-hidden="true"
                    />

                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )
              })}

              {/* Divider */}
              <span className="w-px h-6 bg-border/50 mx-2" aria-hidden="true" />

              {/* Theme Toggle */}
              {mounted && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`
                    relative p-2.5 rounded-full transition-all duration-300 ease-out
                    hover:bg-foreground/5
                    ${themeToggled ? 'text-secondary' : 'text-foreground/70 hover:text-foreground'}
                  `}
                  aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                  <span
                    className={`theme-icon flex items-center justify-center transition-all duration-400 ease-in-out ${
                      iconTransition ? 'icon-exit' : 'icon-enter'
                    }`}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Moon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </button>
              )}
            </nav>

            {/* ═══ Mobile Controls ═══ */}
            <div className="flex items-center gap-0.5 md:hidden">
              {/* Theme Toggle Mobile */}
              {mounted && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`
                    p-2 rounded-full transition-all duration-300 ease-out
                    hover:bg-foreground/5 min-w-[44px] min-h-[44px] flex items-center justify-center
                    ${themeToggled ? 'text-secondary' : 'text-foreground/70 hover:text-foreground'}
                  `}
                  aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                  <span
                    className={`theme-icon flex items-center justify-center transition-all duration-400 ease-in-out ${
                      iconTransition ? 'icon-exit' : 'icon-enter'
                    }`}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Moon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </button>
              )}

              {/* Menu Toggle */}
              <button
                onClick={toggleMenu}
                className={`
                  p-2 rounded-full transition-all duration-300 ease-out
                  hover:bg-foreground/5 min-w-[44px] min-h-[44px] flex items-center justify-center
                  ${menuOpen ? 'text-foreground bg-foreground/5' : 'text-foreground/70 hover:text-foreground'}
                `}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span
                  className={`theme-icon flex items-center justify-center transition-all duration-200 ease-in-out ${
                    iconTransition ? 'icon-exit' : 'icon-enter'
                  }`}
                >
                  {menuOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          Mobile Menu — Full-screen overlay
          ══════════════════════════════════════════════ */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-0 z-40 md:hidden transition-all duration-500 ease-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <nav
          className="pt-[calc(var(--header-height)+env(safe-area-inset-top,0px))] pb-8 px-6 min-h-screen bg-background/95 backdrop-blur-2xl border-b border-border/50"
        >
          {/* Mobile nav items with staggered animation */}
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = isNavItemActive(item.href)
              const Icon = navIconMap[item.href] ?? Home
              const delay = menuReady ? index * 0.08 : 0
              return (
                <li
                  key={item.href}
                  className={`transition-all duration-500 ease-out ${
                    menuReady
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${delay}s` }}
                >
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className={`
                      relative flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 ease-out
                      min-h-[56px] active:scale-[0.98]
                      ${
                        isActive
                          ? 'text-secondary bg-secondary/10'
                          : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/5'
                      }
                    `}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-secondary"
                        aria-hidden="true"
                      />
                    )}

                    {/* Icon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                      isActive ? 'bg-secondary/15' : 'bg-foreground/5'
                    }`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    {/* Label */}
                    <span className="flex-1">{item.label}</span>

                    {/* Arrow indicator */}
                    <svg
                      className={`h-5 w-5 transition-transform ${isActive ? 'text-secondary translate-x-0' : 'text-foreground/30'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Bottom divider + theme toggle in mobile menu */}
          <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tema</span>
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors min-h-[48px]"
                aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">Modo claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 text-slate-500" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">Modo oscuro</span>
                  </>
                )}
              </button>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
