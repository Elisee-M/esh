import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'CONFERENCE BROADCAST',
    eventType: 'Corporate Conference',
    location: 'Kigali, Rwanda',
    services: ['Live Streaming', 'Multi-Camera', 'Post-Production'],
    aspect: 'landscape',
  },
  {
    title: 'WORSHIP EXPERIENCE',
    eventType: 'Church Service',
    location: 'Nairobi, Kenya',
    services: ['Live Streaming', 'Audio Production', 'Lighting'],
    aspect: 'portrait',
  },
  {
    title: 'MUSIC FESTIVAL',
    eventType: 'Live Concert',
    location: 'Lagos, Nigeria',
    services: ['Multi-Camera', 'Video Production', 'Post-Production'],
    aspect: 'landscape',
  },
  {
    title: 'CORPORATE GALA',
    eventType: 'Gala Event',
    location: 'Accra, Ghana',
    services: ['Live Streaming', 'Event Production', 'AV Production'],
    aspect: 'portrait',
  },
  {
    title: 'SPORTS BROADCAST',
    eventType: 'Live Sporting Event',
    location: 'Dar es Salaam, Tanzania',
    services: ['Multi-Camera', 'Live Streaming', 'Post-Production'],
    aspect: 'landscape',
  },
  {
    title: 'PRODUCT LAUNCH',
    eventType: 'Brand Event',
    location: 'Addis Ababa, Ethiopia',
    services: ['Video Production', 'Live Streaming', 'AV Production'],
    aspect: 'landscape',
  },
]

export default function OurWork() {
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

    const items = gridRef.current.querySelectorAll('.work-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
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
    <section ref={sectionRef} id="work" className="bg-esh-black-light py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Portfolio
          </p>
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            OUR <span className="text-gold font-medium">WORK</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mt-8" />
        </div>

        {/* Editorial Grid */}
        <div ref={gridRef} className="space-y-px">
          {/* Row 1: Full width + Half */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px">
            {projects.slice(0, 2).map((project, i) => (
              <div
                key={project.title}
                className={`work-item group relative overflow-hidden cursor-pointer ${
                  i === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                {/* Placeholder Visual */}
                <div
                  className={`w-full ${
                    i === 0 ? 'h-[400px] lg:h-[800px]' : 'h-[392px]'
                  } bg-gradient-to-br from-esh-gray/50 to-esh-black relative`}
                >
                  {/* Cinematic lines */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gold/30" />
                    <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gold/30" />
                    <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gold/30" />
                  </div>

                  {/* Center camera icon placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border border-gold/20 flex items-center justify-center group-hover:border-gold/40 transition-colors duration-500">
                      <div className="w-4 h-4 rounded-full border-2 border-gold/30 group-hover:border-gold/60 transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />

                  {/* Project info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-esh-black/90 to-transparent">
                    <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2 font-medium">
                      {project.eventType}
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-light tracking-wide mb-2 group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-xs tracking-wider">
                      {project.location}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.services.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] text-gold/70 tracking-wider border border-gold/20 px-2 py-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
            {projects.slice(2, 5).map((project) => (
              <div
                key={project.title}
                className="work-item group relative overflow-hidden cursor-pointer"
              >
                <div className="w-full h-[300px] md:h-[350px] bg-gradient-to-br from-esh-gray/40 to-esh-black relative">
                  {/* Cinematic grid lines */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gold/30" />
                    <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gold/30" />
                  </div>

                  {/* Center placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border border-gold/20 flex items-center justify-center group-hover:border-gold/40 transition-colors duration-500 rotate-45">
                      <div className="w-3 h-3 bg-gold/20 group-hover:bg-gold/40 transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-esh-black/90 to-transparent">
                    <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2 font-medium">
                      {project.eventType}
                    </p>
                    <h3 className="text-white text-lg font-light tracking-wide mb-1 group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-xs tracking-wider">
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
            {projects.slice(4, 6).map((project) => (
              <div
                key={project.title}
                className="work-item group relative overflow-hidden cursor-pointer"
              >
                <div className="w-full h-[300px] bg-gradient-to-br from-esh-gray/30 to-esh-black relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold/30" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-12 border border-gold/20 group-hover:border-gold/40 transition-colors duration-500 flex items-center justify-center">
                      <div className="w-full h-[1px] bg-gold/20 group-hover:bg-gold/40 transition-colors duration-500" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-esh-black/90 to-transparent">
                    <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2 font-medium">
                      {project.eventType}
                    </p>
                    <h3 className="text-white text-lg font-light tracking-wide mb-1 group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-xs tracking-wider">
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
