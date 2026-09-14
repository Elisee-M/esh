import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import eshLogo from '../assets/images/esh_logo_no_bg.png'

const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'SERVICES', to: '/services' },
  { label: 'OUR WORK', to: '/#work' },
  { label: 'CAPABILITIES', to: '/#capabilities' },
  { label: 'ABOUT', to: '/about' },
  { label: 'CONTACT', to: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLAnchorElement[]>([])
  const location = useLocation()

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

  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const target = document.querySelector(location.hash)
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-esh-black/85 backdrop-blur-xl border-b border-white/[0.07]'
            : 'bg-gradient-to-b from-esh-black/60 to-transparent backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="esh-container">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={eshLogo}
                alt="ESH Logo"
                className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="text-gold font-bold text-base tracking-[0.2em]">
                  ESH
                </span>
                <span className="text-white/30 text-[9px] tracking-[0.22em] uppercase mt-1">
                  Ebenezer Streaming House
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/60 hover:text-white text-[11px] font-medium tracking-[0.16em] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 bg-gold text-esh-black pl-5 pr-4 h-10 text-[11px] font-bold tracking-[0.16em] transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 group"
              >
                BOOK ESH
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
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
        <div className="absolute top-[84px] left-1/2 -translate-x-1/2 flex items-center gap-3">
          <img src={eshLogo} alt="" className="h-9 w-9 object-contain opacity-60" />
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
            <Link
              key={link.to}
              to={link.to}
              ref={(el) => {
                if (el) linksRef.current[i] = el
              }}
              onClick={() => setMobileOpen(false)}
              className="group relative text-white text-xl sm:text-2xl font-light tracking-[0.16em] hover:text-gold transition-colors duration-300"
            >
              <span className="block text-white/30 text-[10px] tracking-widest mb-1 group-hover:text-gold/50 transition-colors duration-300 text-center">
                0{i + 1}
              </span>
              {link.label}
              <span className="block mx-auto w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-500 mt-1" />
            </Link>
          ))}

          <Link
            to="/#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-5 bg-gold hover:bg-gold-light text-esh-black px-10 py-3.5 text-sm font-bold tracking-[0.15em] transition-all duration-300"
          >
            BOOK ESH
          </Link>
        </div>
      </div>
    </>
  )
}