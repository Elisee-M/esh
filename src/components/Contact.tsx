import { useEffect, useRef, useState, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const eventTypes = [
  'Live Streaming',
  'Event Production',
  'Multi-Camera Production',
  'Video Production',
  'Audio & Visual Production',
  'Post-Production',
  'Other',
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!headingRef.current || !formRef.current) return

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
      formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section ref={sectionRef} id="contact" className="bg-esh-black-light py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Left: Heading & Info */}
          <div ref={headingRef} className="lg:col-span-2">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">
              Get In Touch
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-light tracking-tight mb-8">
              LET'S TALK ABOUT
              <br />
              <span className="text-gold font-medium">YOUR EVENT</span>
            </h2>
            <div className="w-16 h-[1px] bg-gold mb-8" />

            <p className="text-white/50 text-base leading-relaxed mb-12 max-w-md">
              Tell us about your upcoming event, service, or production. We'll get
              back to you with everything you need to bring it to life.
            </p>

            {/* Placeholder contact info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                  <div className="w-3 h-3 border border-gold/40" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-bold tracking-wider mb-1">
                    EMAIL
                  </p>
                  <p className="text-white/40 text-sm">hello@esh.example</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                  <div className="w-3 h-3 border border-gold/40" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-bold tracking-wider mb-1">
                    PHONE
                  </p>
                  <p className="text-white/40 text-sm">+000 000 000 000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                  <div className="w-3 h-3 border border-gold/40" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-bold tracking-wider mb-1">
                    STUDIO
                  </p>
                  <p className="text-white/40 text-sm">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white/60 text-xs tracking-wider font-medium mb-2 uppercase">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-esh-black border border-white/10 px-4 py-3.5 text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-gold/50"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-white/60 text-xs tracking-wider font-medium mb-2 uppercase">
                    Organization
                  </label>
                  <input
                    id="organization"
                    type="text"
                    placeholder="Church, company, institution"
                    className="w-full bg-esh-black border border-white/10 px-4 py-3.5 text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-gold/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-white/60 text-xs tracking-wider font-medium mb-2 uppercase">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-esh-black border border-white/10 px-4 py-3.5 text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-gold/50"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white/60 text-xs tracking-wider font-medium mb-2 uppercase">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+000 000 000 000"
                    className="w-full bg-esh-black border border-white/10 px-4 py-3.5 text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-gold/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventType" className="block text-white/60 text-xs tracking-wider font-medium mb-2 uppercase">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    className="w-full bg-esh-black border border-white/10 px-4 py-3.5 text-white outline-none transition-colors duration-300 focus:border-gold/50 cursor-pointer"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-white/60 text-xs tracking-wider font-medium mb-2 uppercase">
                    Event Date
                  </label>
                  <input
                    id="eventDate"
                    type="date"
                    className="w-full bg-esh-black border border-white/10 px-4 py-3.5 text-white outline-none transition-colors duration-300 focus:border-gold/50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-white/60 text-xs tracking-wider font-medium mb-2 uppercase">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="City, country"
                  className="w-full bg-esh-black border border-white/10 px-4 py-3.5 text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-gold/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/60 text-xs tracking-wider font-medium mb-2 uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your event..."
                  className="w-full bg-esh-black border border-white/10 px-4 py-3.5 text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-gold/50 resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-gold hover:bg-gold-light text-esh-black px-12 py-4 text-sm font-bold tracking-[0.2em] transition-all duration-300 hover:shadow-xl hover:shadow-gold/20 hover:-translate-y-0.5"
              >
                REQUEST A QUOTE
              </button>

              {submitted && (
                <p className="text-gold text-sm tracking-wider pt-2">
                  Thank you. Your request has been received — we'll be in touch.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}