import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-esh-black py-36 px-6 lg:px-8 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gold/30" />
        <div className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-gold/30" />
      </div>

      {/* Cinematic glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[200px] h-[200px] bg-gold/10 blur-[100px] pointer-events-none" />

      <div ref={contentRef} className="relative max-w-4xl mx-auto text-center">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-medium">
          Let's Work Together
        </p>

        <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight mb-8">
          YOUR EVENT DESERVES
          <br />
          <span className="text-gold font-medium">TO BE SEEN.</span>
        </h2>

        <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Let's turn your next event into an experience that reaches beyond the room.
        </p>

        <a
          href="#contact"
          className="inline-block bg-gold hover:bg-gold-light text-esh-black px-12 py-5 text-sm font-bold tracking-[0.2em] transition-all duration-300 hover:shadow-xl hover:shadow-gold/20 hover:-translate-y-0.5"
        >
          START YOUR PROJECT
        </a>
      </div>
    </section>
  )
}