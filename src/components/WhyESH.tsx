import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    title: 'PROFESSIONAL PRODUCTION',
    description:
      'Broadcast-grade equipment and experienced crew for every project.',
  },
  {
    title: 'MULTI-CAMERA COVERAGE',
    description:
      'Dynamic multi-angle coverage that captures every moment from the best perspective.',
  },
  {
    title: 'LIVE + ON-DEMAND',
    description:
      'Real-time streaming and professional post-production delivery for lasting impact.',
  },
  {
    title: 'RELIABLE DELIVERY',
    description:
      'Dependable technical execution that ensures your event goes off without a hitch.',
  },
  {
    title: 'TECHNOLOGY + CREATIVITY',
    description:
      'Cutting-edge production technology combined with creative storytelling.',
  },
]

export default function WhyESH() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headingRef.current || !listRef.current) return

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

    const items = listRef.current.querySelectorAll('.why-item')
    gsap.fromTo(
      items,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-esh-black-light border-t border-white/5 py-28 lg:py-36 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="max-w-2xl mx-auto mb-16 lg:mb-20 text-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            The ESH Difference
          </p>
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            WHY <span className="text-gold font-medium">ESH</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mt-8 mb-8 mx-auto" />
          <p className="text-white/50 text-base leading-relaxed max-w-md mx-auto">
            When your event matters, you need a production partner who understands both
            the technology and the story. ESH delivers both.
          </p>
        </div>

        {/* Reasons List */}
        <div ref={listRef} className="max-w-2xl mx-auto space-y-0">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="why-item group border-t border-white/10 py-8 hover:border-gold/30 transition-colors duration-500 cursor-default"
            >
              <div className="flex items-start gap-6 justify-center">
                <span className="text-gold/30 text-sm font-bold tracking-wider group-hover:text-gold transition-colors duration-300 mt-1 shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-white text-sm font-bold tracking-[0.15em] mb-2 group-hover:text-gold transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  )
}
