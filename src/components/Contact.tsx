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

const inputClass =
  'w-full bg-esh-black border border-white/10 px-4 py-3.5 text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-gold/60 hover:border-white/20'

const labelClass =
  'block text-white/60 text-[11px] tracking-[0.18em] font-medium mb-2 uppercase'

const contactInfo = [
  { label: 'Email', value: 'hello@esh.example' },
  { label: 'Phone', value: '+000 000 000 000' },
  { label: 'Studio', value: 'Kigali, Rwanda' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const heading = headingRef.current
    const form = formRef.current
    if (!heading || !form) return

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
      form,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: form,
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
    <section
      ref={sectionRef}
      id="contact"
      className="bg-esh-black border-t border-white/5 py-32 lg:py-36 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: Heading & Info */}
          <div ref={headingRef} className="flex flex-col">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-medium">
              Get In Touch
            </p>
            <h2 className="text-white text-4xl md:text-5xl lg:text-[3.4rem] font-light tracking-tight leading-[1.05] mb-8">
              LET'S TALK ABOUT
              <br />
              <span className="text-gold font-medium">YOUR EVENT</span>
            </h2>
            <div className="w-16 h-[1px] bg-gold mb-8" />

            <p className="text-white/50 text-base leading-relaxed mb-14 max-w-md">
              Tell us about your upcoming event, service, or production. We'll get
              back to you with everything you need to bring it to life.
            </p>

            {/* Contact information */}
            <div className="space-y-6 mt-auto">
              <div className="w-16 h-[1px] bg-white/10 mb-8 lg:hidden" />
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-5">
                  <div className="w-11 h-11 border border-white/10 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 border border-gold/50" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[11px] font-bold tracking-[0.18em] uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-white/50 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:border-l lg:border-white/5 lg:pl-16">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input id="name" type="text" required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="organization" className={labelClass}>
                    Organization
                  </label>
                  <input
                    id="organization"
                    type="text"
                    placeholder="Church, company, institution"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input id="email" type="email" required placeholder="you@example.com" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input id="phone" type="tel" placeholder="+000 000 000 000" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="eventType" className={labelClass}>
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    className={`${inputClass} cursor-pointer [&>option]:bg-esh-black-light`}
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className={labelClass}>
                    Event Date
                  </label>
                  <input id="eventDate" type="date" className={`${inputClass} [color-scheme:dark]`} />
                </div>
              </div>

              <div>
                <label htmlFor="location" className={labelClass}>
                  Location
                </label>
                <input id="location" type="text" placeholder="City, country" className={inputClass} />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your event..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-gold hover:bg-gold-light text-esh-black px-12 py-4 text-sm font-bold tracking-[0.2em] transition-all duration-300 hover:shadow-xl hover:shadow-gold/20 hover:-translate-y-0.5"
                >
                  REQUEST A QUOTE
                </button>
              </div>

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