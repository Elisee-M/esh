import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Each project supports image/video fields for future real media.
type Project = {
  title: string
  eventType: string
  location: string
  services: string[]
  image?: string
  video?: string
}

const projects: Project[] = [
  {
    title: 'CONFERENCE BROADCAST',
    eventType: 'Corporate Conference',
    location: 'Kigali, Rwanda',
    services: ['Live Streaming', 'Multi-Camera', 'Post-Production'],
  },
  {
    title: 'WORSHIP EXPERIENCE',
    eventType: 'Church Service',
    location: 'Nairobi, Kenya',
    services: ['Live Streaming', 'Audio', 'Lighting'],
  },
  {
    title: 'MUSIC FESTIVAL',
    eventType: 'Live Concert',
    location: 'Lagos, Nigeria',
    services: ['Multi-Camera', 'Video Production', 'Post-Production'],
  },
  {
    title: 'CORPORATE GALA',
    eventType: 'Gala Event',
    location: 'Accra, Ghana',
    services: ['Live Streaming', 'Event Production', 'AV Production'],
  },
]

export default function OurWork() {
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

    const items = grid.querySelectorAll('.work-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
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
      id="work"
      className="bg-esh-black-light border-t border-white/5 py-28 lg:py-36 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 lg:mb-24">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Portfolio
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
              OUR <span className="text-gold font-medium">WORK</span>
            </h2>
            <p className="text-white/40 text-sm lg:text-base max-w-md leading-relaxed">
              Selected productions and experience across live streaming and event
              media. New work is added as each event goes live.
            </p>
          </div>
          <div className="w-16 h-[1px] bg-gold mt-8" />
        </div>

        {/* Projects Grid — 2 cols desktop / 1 col tablet & mobile */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <article
              key={project.title}
              className="work-item group bg-esh-black border border-white/5 hover:border-gold/20 transition-colors duration-500 cursor-default"
            >
              {/* Media area — drop real image/video here later */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-esh-gray/40 via-esh-black to-esh-black">
                {/* Cinematic guide lines */}
                <div className="absolute inset-0 opacity-[0.08]">
                  <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gold/40" />
                  <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gold/40" />
                  <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gold/40" />
                  <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-gold/40" />
                </div>

                {/* Filter frame */}
                <div className="absolute inset-0 border border-white/5">
                  <span className="absolute top-4 left-6 text-white/25 text-[10px] tracking-[0.3em] uppercase">
                    REC
                  </span>
                  <span className="absolute top-4 right-6 flex items-center gap-2 text-white/25 text-[10px] tracking-[0.3em] uppercase">
                    <span className="w-2 h-2 rounded-full bg-gold/50 animate-pulse" />
                    PREVIEW
                  </span>
                </div>

                {/* Center placeholder icon — replaced by project media */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border border-gold/15 flex items-center justify-center group-hover:border-gold/40 transition-colors duration-500">
                    <div className="w-5 h-5 rounded-full border-2 border-gold/25 group-hover:border-gold/50 transition-colors duration-500" />
                  </div>
                </div>

                {project.image || project.video ? (
                  <>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    ) : null}
                    {project.video ? (
                      <video
                        src={project.video}
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    ) : null}
                  </>
                ) : null}
              </div>

              {/* Project info */}
              <div className="p-7 lg:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">
                    {project.eventType}
                  </p>
                  <p className="text-white/30 text-xs tracking-wider">
                    {project.location}
                  </p>
                </div>
                <h3 className="text-white text-xl lg:text-2xl font-light tracking-wide mb-5 group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] text-white/40 tracking-wider border border-white/10 px-2.5 py-1 group-hover:text-gold/70 group-hover:border-gold/20 transition-colors duration-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}