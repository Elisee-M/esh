import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import eshLogo from '../assets/images/esh_logo_no_bg.png'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    }

    if (contentRef.current) {
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
            start: 'top 80%',
            once: true,
          },
        }
      )
    }

    if (valuesRef.current) {
      gsap.fromTo(
        valuesRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }
  }, [])

  return (
    <div className="bg-esh-black min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-8 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-medium">
            About Us
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-8">
            Rwanda's Premier{' '}
            <span className="text-gold font-medium">Media Production</span>{' '}
            House
          </h1>
          <div className="w-20 h-[1px] bg-gold mx-auto" />
        </div>
      </section>

      {/* Company Description */}
      <section
        ref={contentRef}
        className="py-20 lg:py-28 px-6 lg:px-8 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Logo & Company Name */}
            <div>
              <div className="flex items-center gap-8 mb-8">
                <img
                  src={eshLogo}
                  alt="ESH Logo"
                  className="w-36 h-36 md:w-44 md:h-44 object-contain"
                />
                <div>
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
              <div className="w-16 h-[1px] bg-gold" />
            </div>

            {/* Right: Description */}
            <div className="space-y-8">
              <p className="text-white/70 text-lg leading-loose">
                Ebenezer Streaming House LTD is a professional media production
                company based in Kigali, Rwanda. With over 8 years of
                experience, we specialize in live event streaming, podcast
                production, documentary filming, and comprehensive event
                coverage.
              </p>
              <p className="text-white/50 leading-relaxed text-base">
                Our team of skilled professionals uses state-of-the-art
                equipment to deliver broadcast-quality content that exceeds
                expectations. From corporate conferences to church services, from
                weddings to national events, we bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {/* Mission */}
            <div className="bg-esh-black p-10 lg:p-14">
              <div className="w-8 h-[2px] bg-gold mb-8" />
              <h2 className="text-white text-2xl md:text-3xl font-light tracking-tight mb-6">
                Our <span className="text-gold font-medium">Mission</span>
              </h2>
              <p className="text-white/60 text-base leading-loose">
                To provide exceptional media production services that empower
                our clients to reach wider audiences.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-esh-black p-10 lg:p-14">
              <div className="w-8 h-[2px] bg-gold mb-8" />
              <h2 className="text-white text-2xl md:text-3xl font-light tracking-tight mb-6">
                Our <span className="text-gold font-medium">Vision</span>
              </h2>
              <p className="text-white/60 text-base leading-loose">
                To be East Africa's leading media production and live streaming
                company, setting the standard for quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {/* Quality First */}
            <div className="bg-esh-black p-10 lg:p-12 group hover:bg-esh-black-light transition-colors duration-500">
              <div className="w-6 h-[1px] bg-gold mb-6 group-hover:w-12 transition-all duration-500" />
              <h3 className="text-white text-sm font-bold tracking-[0.2em] mb-4 group-hover:text-gold transition-colors duration-300">
                QUALITY FIRST
              </h3>
              <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                We use professional-grade equipment and employ industry best
                practices to ensure every project meets broadcast standards.
              </p>
            </div>

            {/* Client-Focused */}
            <div className="bg-esh-black p-10 lg:p-12 group hover:bg-esh-black-light transition-colors duration-500">
              <div className="w-6 h-[1px] bg-gold mb-6 group-hover:w-12 transition-all duration-500" />
              <h3 className="text-white text-sm font-bold tracking-[0.2em] mb-4 group-hover:text-gold transition-colors duration-300">
                CLIENT-FOCUSED
              </h3>
              <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                Your success is our priority. We work closely with you to
                understand your needs and deliver tailored solutions.
              </p>
            </div>

            {/* Reliability */}
            <div className="bg-esh-black p-10 lg:p-12 group hover:bg-esh-black-light transition-colors duration-500">
              <div className="w-6 h-[1px] bg-gold mb-6 group-hover:w-12 transition-all duration-500" />
              <h3 className="text-white text-sm font-bold tracking-[0.2em] mb-4 group-hover:text-gold transition-colors duration-300">
                RELIABILITY
              </h3>
              <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                Count on us for punctual delivery, seamless execution, and
                consistent quality across all our services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
