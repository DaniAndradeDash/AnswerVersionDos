'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { navItems } from '@/constants/navigation'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false) // Scrolling down
      } else {
        setVisible(true) // Scrolling up
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      role="banner"
    >
      <div className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3 min-h-[80px]">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-2 group" aria-label="Answer ST — Ir al inicio">
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src="/Logo_letra.png"
                alt=""
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                priority
                aria-hidden="true"
              />
            </div>
            <span className="font-bold text-lg sm:text-xl text-foreground whitespace-nowrap">
              ANSWER<span className="text-secondary">.st</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-secondary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface transition-colors duration-200"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <Sun className="h-5 w-5 hidden dark:block" aria-hidden="true" />
              <Moon className="h-5 w-5 block dark:hidden" aria-hidden="true" />
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface transition-colors duration-200"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <Sun className="h-5 w-5 hidden dark:block" aria-hidden="true" />
              <Moon className="h-5 w-5 block dark:hidden" aria-hidden="true" />
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-surface transition-colors duration-200"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!menuOpen}
        >
          <nav
            className="px-6 py-4 space-y-4 bg-background/95 backdrop-blur-md border-t border-border"
            aria-label="Navegación móvil"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="block text-base font-medium text-foreground/70 hover:text-secondary transition-colors duration-200 py-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
