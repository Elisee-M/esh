import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import eshLogo from '../assets/images/esh_logo_no_bg.png'

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'SERVICES', href: '#services' },
  { label: 'OUR WORK', href: '#work' },
  { label: 'CAPABILITIES', href: '#capabilities' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLAnchorElement[]>([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      )
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.1,
        }
      )
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-esh-black/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src={eshLogo}
                alt="ESH Logo"
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <span className="text-gold font-bold text-lg tracking-wider">
                  ESH
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-gold text-xs font-medium tracking-[0.15em] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <a
                href="#contact"
                className="bg-gold hover:bg-gold-light text-esh-black px-6 py-2.5 text-xs font-bold tracking-[0.15em] transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              >
                BOOK ESH
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span
                  className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${
                    mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-white transition-all duration-300 ${
                    mobileOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${
                    mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-40 bg-esh-black/95 backdrop-blur-lg lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-500`}
      >
        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        {/* Brand top */}
        <div className="absolute top-[90px] left-1/2 -translate-x-1/2 flex items-center gap-3">
          <img src={eshLogo} alt="" className="h-10 w-10 object-contain opacity-60" />
          <span className="text-gold/60 text-sm font-bold tracking-widest">
            ESH
          </span>
        </div>

        <div className="flex flex-col items-center justify-center h-full gap-5 overflow-y-auto py-28">
          {/* Decorative numbers */}
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-1 font-light">
            Menu
          </p>

          {navLinks.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => {
                if (el) linksRef.current[i] = el
              }}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="group relative text-white text-xl sm:text-2xl font-light tracking-[0.16em] hover:text-gold transition-colors duration-300"
            >
              <span className="block text-white/30 text-[10px] tracking-widest mb-1 group-hover:text-gold/50 transition-colors duration-300 text-center">
                0{i + 1}
              </span>
              {link.label}
              <span className="block mx-auto w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-500 mt-1" />
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-5 bg-gold hover:bg-gold-light text-esh-black px-10 py-3.5 text-sm font-bold tracking-[0.15em] transition-all duration-300"
          >
            BOOK ESH
          </a>
        </div>
      </div>
    </>
  )
}