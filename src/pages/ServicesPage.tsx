import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'LIVE EVENT STREAMING',
    description:
      'Broadcast your events to a global audience with crystal-clear HD streaming. Multi-camera setups, graphics, and real-time production.',
  },
  {
    title: 'PODCAST PRODUCTION',
    description:
      'Full-service podcast recording and production. Professional audio quality, editing, and post-production for engaging content.',
  },
  {
    title: 'VIDEO & AUDIO PRODUCTION',
    description:
      'High-quality video and audio content creation. Commercials, promotional videos, music production, and voice-overs.',
  },
  {
    title: 'DOCUMENTARY PRODUCTION',
    description:
      'Compelling documentary storytelling with cinematic visuals. Research, filming, interviews, and complete post-production.',
  },
  {
    title: 'EVENT COVERAGE',
    description:
      'Comprehensive media coverage for conferences, weddings, church events, and corporate gatherings. Photos, videos, and live streams.',
  },
  {
    title: 'TECHNICAL SUPPORT',
    description:
      'Media setup, equipment rental, and technical consultation. Ensure your production runs smoothly with our expert support.',
  },
  {
    title: 'SOUND SYSTEM',
    description:
      'Professional sound system setup and rental for events, conferences, and performances. Crystal-clear audio that fills any venue.',
  },
  {
    title: 'LED SCREEN',
    description:
      'High-resolution LED screen rental for events, stages, and venues. Stunning visuals that captivate your audience.',
  },
  {
    title: 'PHOTOGRAPHS',
    description:
      'Professional photography services for portraits, events, branding, and product shoots. High-quality images that tell your story.',
  },
  {
    title: 'LIGHTING',
    description:
      'Professional lighting setup for events, studios, film shoots, and stage productions. Create the perfect atmosphere with expert illumination.',
  },
]

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
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
            Our Services
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-8">
            Professional <span className="text-gold font-medium">Media</span>{' '}
            Solutions
          </h1>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            From live streaming to documentary production, we offer comprehensive
            media services to meet all your content creation needs.
          </p>
          <div className="w-20 h-[1px] bg-gold mx-auto" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            {services.map((service, i) => (
              <div
                key={service.title}
                className="group relative bg-esh-black-light/40 border border-white/10 p-8 lg:p-10 hover:bg-esh-black-light hover:border-gold/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-default flex flex-col min-h-[260px]"
              >
                {/* Index */}
                <span className="text-gold/40 text-xs font-bold tracking-[0.25em] mb-8 group-hover:text-gold transition-colors duration-300">
                  0{i + 1}
                </span>

                <h3 className="text-white text-base md:text-lg font-bold tracking-[0.12em] mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300 mb-6">
                  {service.description}
                </p>

                {/* Learn More link */}
                <div className="mt-auto">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-2 text-gold text-xs font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Learn More
                    <span className="inline-block w-6 h-[1px] bg-gold" />
                  </Link>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold/0 group-hover:bg-gold transition-colors duration-500 scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}