import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'LIVE STREAMING',
    description:
      'Professional multi-camera live streaming for events, conferences, churches, concerts and organizations.',
  },
  {
    title: 'EVENT PRODUCTION',
    description:
      'Technical production and live event support.',
  },
  {
    title: 'MULTI-CAMERA PRODUCTION',
    description:
      'Professional multi-camera coverage and switching.',
  },
  {
    title: 'VIDEO PRODUCTION',
    description:
      'Event recording, promotional content and cinematic video.',
  },
  {
    title: 'AUDIO & VISUAL PRODUCTION',
    description:
      'Professional sound, lighting and visual production.',
  },
  {
    title: 'POST-PRODUCTION',
    description:
      'Editing, highlights, recordings and media delivery.',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heading = headingRef.current
    const grid = gridRef.current
    if (!heading || !grid) return

    gsap.fromTo(
      heading.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          once: true,
        },
      }
    )

    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-esh-black border-t border-white/5 py-28 lg:py-36 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="max-w-2xl mb-14 lg:mb-20">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-5 font-medium">
            What We Do
          </p>
          <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] text-balance">
            PRODUCTION WITHOUT{' '}
            <span className="text-gold font-medium">LIMITS</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mt-7 mb-7" />
          <p className="text-white/50 text-base leading-relaxed">
            From live streaming to post-production, we manage every stage of your
            media with broadcast-grade equipment and a professional crew.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-3 mt-8 text-white/60 hover:text-gold text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 group"
          >
            View All Services
            <span className="inline-block w-8 h-[2px] bg-gold group-hover:w-12 transition-all duration-300" />
          </Link>
        </div>

        {/* Services Grid — 3 cols desktop / 2 tablet / 1 mobile */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative bg-esh-black-light/40 border border-white/10 p-8 lg:p-10 flex flex-col min-h-[250px] hover:bg-esh-black-light hover:border-gold/40 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Index */}
              <span className="text-gold/40 text-xs font-bold tracking-[0.25em] mb-8 group-hover:text-gold transition-colors duration-300">
                0{i + 1}
              </span>

              <h3 className="text-white text-base md:text-lg font-bold tracking-[0.12em] mb-4 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                {service.description}
              </p>

              {/* Bottom accent */}
              <div className="mt-auto pt-10">
                <div className="w-8 h-[2px] bg-gold/40 group-hover:bg-gold transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}