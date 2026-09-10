import { useState, useEffect } from 'react'
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
    return () => { document.body.style.overflow = '' }
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
                <span className="text-gold font-bold text-lg tracking-wider">ESH</span>
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
        className={`fixed inset-0 z-40 bg-esh-black/95 backdrop-blur-lg transition-opacity duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white text-2xl font-light tracking-[0.2em] hover:text-gold transition-colors duration-300"
              style={{
                transitionDelay: mobileOpen ? `${i * 80}ms` : '0ms',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
                transition: 'all 0.4s ease',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 bg-gold hover:bg-gold-light text-esh-black px-8 py-3 text-sm font-bold tracking-[0.15em] transition-all duration-300"
          >
            BOOK ESH
          </a>
        </div>
      </div>
    </>
  )
}
