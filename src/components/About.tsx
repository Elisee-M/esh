import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import eshLogo from '../assets/images/esh_logo_no_bg.png'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headingRef.current || !contentRef.current) return

    gsap.fromTo(
      headingRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-esh-black border-t border-white/5 py-28 lg:py-36 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14 lg:mb-20">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Who We Are
          </p>
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8">
            ABOUT <span className="text-gold font-medium">ESH</span>
          </h2>

          <div className="flex items-center justify-center gap-8">
            <img
              src={eshLogo}
              alt="ESH Logo"
              className="w-40 h-40 md:w-48 md:h-48 object-contain"
            />
            <div className="text-left">
              <p className="text-gold text-2xl md:text-3xl font-bold tracking-wider">
                ESH
              </p>
              <p className="text-white/50 text-xs md:text-sm tracking-[0.25em] mt-2 leading-relaxed uppercase">
                Ebenezer Streaming
                <br />
                House Ltd
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div ref={contentRef}>
          <div className="space-y-8 max-w-2xl mx-auto text-center">
            <p className="text-white/60 text-lg leading-loose">
              EbenEzer Streaming House Ltd is a professional live-streaming and
              media production company helping events and organizations reach
              audiences beyond the physical venue.
            </p>
            <p className="text-white/40 leading-relaxed text-base">
              From live multi-camera broadcasts to full-scale event production,
              we combine technical precision with creative storytelling. Whether
              it's a live service, a conference, a celebration, or a corporate
              production, we make sure every moment is captured, produced and
              delivered to the exact standard it deserves.
            </p>

            {/* Value highlights */}
            <div className="grid grid-cols-2 gap-px bg-white/5 mt-8 text-left">
              <div className="bg-esh-black p-6">
                <div className="w-6 h-[1px] bg-gold mb-4" />
                <h3 className="text-white text-xs font-bold tracking-[0.2em] mb-2">
                  LIVE DELIVERY
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  Real-time broadcast quality streaming.
                </p>
              </div>
              <div className="bg-esh-black p-6">
                <div className="w-6 h-[1px] bg-gold mb-4" />
                <h3 className="text-white text-xs font-bold tracking-[0.2em] mb-2">
                  FULL PRODUCTION
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  Complete event media production.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-white/60 hover:text-gold text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 group"
              >
                Learn More About Us
                <span className="inline-block w-8 h-[1px] bg-gold group-hover:w-12 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}