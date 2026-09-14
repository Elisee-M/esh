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
      'Full technical production and on-site support that keeps your event running flawlessly.',
  },
  {
    title: 'MULTI-CAMERA PRODUCTION',
    description:
      'Dynamic multi-angle coverage and seamless switching for broadcast-quality visuals.',
  },
  {
    title: 'VIDEO PRODUCTION',
    description:
      'Event recording, promotional content, and cinematic video crafted to tell your story.',
  },
  {
    title: 'AUDIO & VISUAL',
    description:
      'Professional sound, lighting, and visual design that elevate every experience.',
  },
  {
    title: 'POST-PRODUCTION',
    description:
      'Expert editing, highlight packages, and polished media delivery for any platform.',
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
      className="bg-esh-black border-t border-white/5 esh-section"
    >
      <div className="esh-container">
        {/* Heading */}
        <div ref={headingRef} className="mb-14 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="esh-eyebrow mb-4">What We Do</p>
            <h2 className="esh-heading-lg text-white text-balance">
              PRODUCTION WITHOUT{' '}
              <span className="text-gold font-normal">LIMITS</span>
            </h2>
          </div>
          <div className="lg:max-w-sm lg:pb-2">
            <p className="text-white/45 text-sm leading-relaxed">
              From live streaming to post-production, we manage every stage of your
              media with broadcast-grade equipment and a professional crew.
            </p>
            <div className="flex justify-center lg:justify-start mt-6">
              <Link
                to="/services"
                className="inline-flex items-center gap-3 text-white/60 hover:text-gold text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 group"
              >
                View All Services
                <span className="inline-block w-8 h-px bg-gold group-hover:w-12 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Services Grid — 3 cols desktop / 2 tablet / 1 mobile */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-item group relative bg-esh-black p-8 lg:p-9 flex flex-col min-h-[230px] hover:bg-esh-black-light/70 transition-colors duration-500"
            >
              {/* Top row: index + arrow */}
              <div className="flex items-start justify-between mb-10">
                <span className="text-gold/30 text-xs font-bold tracking-[0.25em] group-hover:text-gold transition-colors duration-500">
                  0{i + 1}
                </span>
                <span
                  className="inline-flex items-center justify-center w-9 h-9 border border-white/10 text-white/40 transition-all duration-300 group-hover:border-gold/40 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8m9 0v9" />
                  </svg>
                </span>
              </div>

              {/* Gold accent line */}
              <div className="w-8 h-px bg-gold/40 group-hover:bg-gold group-hover:w-14 transition-all duration-500 mb-5" />

              <h3 className="text-white text-sm md:text-base font-bold tracking-[0.15em] mb-3 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed group-hover:text-white/65 transition-colors duration-300">
                {service.description}
              </p>

              {/* Bottom hint */}
              <div className="mt-auto pt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase">
                  Explore
                </span>
                <svg
                  className="w-3 h-3 text-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}