'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { navItems } from '@/constants/navigation'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const [themeToggled, setThemeToggled] = useState(false)
  const lastScrollYRef = useRef(0)
  const { theme, setTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  // Scroll handler: auto-hide + scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Auto-hide on scroll down
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      // Scrolled state for enhanced styling
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

  const handleNavClick = useCallback(() => {
    setMenuOpen(false)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeToggled(true)
    setTheme(theme === 'dark' ? 'light' : 'dark')
    setTimeout(() => setThemeToggled(false), 600)
  }, [theme, setTheme])

  const isNavItemActive = (href: string) => activeSection === href

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
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
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3 min-h-[80px]">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-2 group relative" aria-label="Answer ST — Ir al inicio">
            <div className="relative h-10 w-10 flex-shrink-0">
              {/* Glow effect on hover */}
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
                <motion.div
                  className="relative z-10 w-full h-full"
                  animate={{
                    scale: [1, 1.03, 1],
                    opacity: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Image
                    src="/Logo_letra.png"
                    alt=""
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    priority
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </div>
            <span className="font-bold text-lg sm:text-xl text-foreground whitespace-nowrap relative">
              ANSWER<span className="text-secondary">.st</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
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
                  {/* Hover pill background */}
                  <span
                    className={`
                      absolute inset-0 rounded-lg transition-all duration-300 ease-out
                      ${isActive ? 'bg-secondary/10' : 'bg-transparent group-hover:bg-foreground/5'}
                    `}
                    aria-hidden="true"
                  />

                  {/* Active indicator dot */}
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
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme === 'dark' ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="flex items-center justify-center"
                >
                  <Sun className="h-5 w-5 hidden dark:block" aria-hidden="true" />
                  <Moon className="h-5 w-5 block dark:hidden" aria-hidden="true" />
                </motion.span>
              </AnimatePresence>
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle Mobile */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`
                p-2 rounded-full transition-all duration-300 ease-out
                hover:bg-foreground/5
                ${themeToggled ? 'text-secondary' : 'text-foreground/70 hover:text-foreground'}
              `}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme === 'dark' ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="flex items-center justify-center"
                >
                  <Sun className="h-5 w-5 hidden dark:block" aria-hidden="true" />
                  <Moon className="h-5 w-5 block dark:hidden" aria-hidden="true" />
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-foreground/5 transition-colors duration-200 text-foreground/70 hover:text-foreground"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="flex items-center justify-center"
                >
                  {menuOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!menuOpen}
        >
          <nav
            className="px-6 py-4 space-y-1 bg-background/95 backdrop-blur-xl border-t border-border/70"
            aria-label="Navegación móvil"
          >
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ease-out
                    ${
                      isActive
                        ? 'text-secondary bg-secondary/10'
                        : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                    }
                  `}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-secondary"
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
