import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import videoBg from '../assets/videos/video_bg.mp4'
import eshLogo from '../assets/images/esh_logo_no_bg.png'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current || !videoRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      contentRef.current.querySelector('.hero-logo'),
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.3 }
    )
    .fromTo(
      contentRef.current.querySelector('.hero-title'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.5'
    )
    .fromTo(
      contentRef.current.querySelector('.hero-subtitle'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    .fromTo(
      contentRef.current.querySelector('.hero-headline'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      contentRef.current.querySelector('.hero-desc'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.3'
    )
    .fromTo(
      contentRef.current.querySelectorAll('.hero-cta'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      '-=0.3'
    )

    // Subtle parallax scroll on the video
    const parallax = gsap.to(videoRef.current, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Subtle fade of hero content on scroll away
    const fade = gsap.to(contentRef.current, {
      opacity: 0,
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom 40%',
        scrub: true,
      },
    })

    return () => {
      tl.kill()
      parallax.kill()
      fade.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-[115%] object-cover -top-[7.5%]"
        aria-hidden="true"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-esh-black/60 via-esh-black/40 to-esh-black/80" />
      <div className="absolute inset-0 bg-esh-black/30" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="hero-logo mb-8 opacity-0">
          <img
            src={eshLogo}
            alt="ESH Logo"
            className="w-28 h-28 md:w-36 md:h-36 mx-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Brand Name */}
        <h1 className="hero-title opacity-0 text-gold text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] mb-2">
          ESH
        </h1>

        <p className="hero-subtitle opacity-0 text-white/60 text-sm md:text-base tracking-[0.3em] uppercase mb-10">
          Ebenezer Streaming House Ltd
        </p>

        {/* Headline */}
        <h2 className="hero-headline opacity-0 text-white text-3xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 tracking-tight">
          WE CAPTURE THE MOMENT.
          <br />
          <span className="text-gold font-medium">YOU EXPERIENCE IT.</span>
        </h2>

        {/* Description */}
        <p className="hero-desc opacity-0 text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Professional live streaming, event production and media services
          built to bring your moments to the world.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="hero-cta opacity-0 bg-gold hover:bg-gold-light text-esh-black px-10 py-4 text-sm font-bold tracking-[0.2em] transition-all duration-300 hover:shadow-xl hover:shadow-gold/20 hover:-translate-y-0.5"
          >
            BOOK A STREAM
          </a>
          <a
            href="#work"
            className="hero-cta opacity-0 border border-white/30 hover:border-gold text-white hover:text-gold px-10 py-4 text-sm font-bold tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5"
          >
            EXPLORE OUR WORK
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-esh-black to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-gold/50" />
      </div>
    </section>
  )
}