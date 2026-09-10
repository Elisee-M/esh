import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  { name: 'LIVE BROADCAST', icon: '01' },
  { name: 'MULTI-CAMERA', icon: '02' },
  { name: 'EVENT COVERAGE', icon: '03' },
  { name: 'VIDEO PRODUCTION', icon: '04' },
  { name: 'AUDIO', icon: '05' },
  { name: 'LIGHTING', icon: '06' },
  { name: 'STREAMING', icon: '07' },
  { name: 'POST-PRODUCTION', icon: '08' },
]

export default function Capabilities() {
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

    const items = gridRef.current.querySelectorAll('.cap-item')
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
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
    <section
      ref={sectionRef}
      id="capabilities"
      className="bg-esh-black border-t border-white/5 py-28 lg:py-36 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 lg:mb-24 text-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Equipment & Expertise
          </p>
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            THE PRODUCTION BEHIND{' '}
            <span className="text-gold font-medium">THE MOMENT</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mt-8 mx-auto" />
        </div>

        {/* Capabilities Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-px">
          {capabilities.map((cap) => (
            <div
              key={cap.name}
              className="cap-item group relative aspect-square flex flex-col items-center justify-center bg-esh-black-light hover:bg-esh-gray/30 transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Number */}
              <span className="text-gold/20 text-6xl md:text-7xl font-bold absolute top-4 right-4 group-hover:text-gold/40 transition-colors duration-500">
                {cap.icon}
              </span>

              {/* Center ring */}
              <div className="w-16 h-16 rounded-full border border-white/10 group-hover:border-gold/30 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110">
                <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-gold/50 flex items-center justify-center transition-all duration-500">
                  <div className="w-2 h-2 bg-gold/40 group-hover:bg-gold rounded-full transition-colors duration-500" />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-white/60 text-[11px] md:text-xs font-bold tracking-[0.2em] group-hover:text-gold transition-colors duration-300 text-center px-4">
                {cap.name}
              </h3>

              {/* Corner lines on hover */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gold/0 group-hover:w-full group-hover:bg-gold/30 transition-all duration-700" />
              <div className="absolute top-0 left-0 w-[1px] h-0 bg-gold/0 group-hover:h-full group-hover:bg-gold/30 transition-all duration-700" />
              <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-gold/0 group-hover:w-full group-hover:bg-gold/30 transition-all duration-700" />
              <div className="absolute bottom-0 right-0 w-[1px] h-0 bg-gold/0 group-hover:h-full group-hover:bg-gold/30 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
