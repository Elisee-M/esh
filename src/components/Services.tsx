import { useEffect, useRef } from 'react'
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
    if (!headingRef.current || !gridRef.current) return

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
      gridRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="services" className="bg-esh-black py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            What We Do
          </p>
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            PRODUCTION WITHOUT{' '}
            <span className="text-gold font-medium">LIMITS</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mt-8" />
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-esh-black p-8 lg:p-10 hover:bg-esh-black-light transition-colors duration-500 relative overflow-hidden cursor-default"
            >
              {/* Hover accent line */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gold transition-all duration-500 group-hover:w-full" />

              <h3 className="text-white text-sm font-bold tracking-[0.2em] mb-4 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                {service.description}
              </p>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
