import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import videoBg from '../assets/videos/video_bg.mp4'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Start the video from the beginning exactly once on a fresh page load.
  // No loop, no timers — when it finishes, the final frame stays on screen.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let cancelled = false
    const playOnce = () => {
      if (cancelled || video.ended) return
      video.currentTime = 0
      video.play().catch(() => {
        // Autoplay blocked — the cinematic fallback background remains visible.
      })
    }

    // Video keeps autoplay attribute, this guarantees a fresh single start
    // even if the element is reconnected (e.g. browser autoplay policy).
    const onLoaded = () => playOnce()
    video.addEventListener('loadeddata', onLoaded)
    playOnce()

    return () => {
      cancelled = true
      video.removeEventListener('loadeddata', onLoaded)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const content = contentRef.current
    if (!content || !section || !video) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      content.querySelector('.hero-eyebrow'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    )
    .fromTo(
      content.querySelector('.hero-title'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.5'
    )
    .fromTo(
      content.querySelector('.hero-subtitle'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.55'
    )
    .fromTo(
      content.querySelector('.hero-headline'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.4'
    )
    .fromTo(
      content.querySelector('.hero-desc'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.3'
    )
    .fromTo(
      content.querySelector('.hero-ctas .hero-cta'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      '-=0.3'
    )

    // Subtle parallax scroll on the video
    const parallax = gsap.to(video, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Subtle fade of hero content on scroll away
    const fade = gsap.to(content, {
      opacity: 0,
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
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
        if (t.trigger === section) t.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-screen min-h-[100svh] overflow-hidden flex items-center justify-center py-28 md:py-32"
    >
      {/* Background Video — plays once, stops on final frame, no loop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={() => {
          // Leave the final frame visible; never restart automatically.
        }}
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
        className="absolute inset-0 w-full h-[115%] object-cover -top-[7.5%]"
        aria-hidden="true"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-esh-black/80 via-esh-black/35 to-esh-black/90" />
      {/* Radial vignette behind hero content for logo/headline readability */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(28,26,29,0.6)_0%,transparent_68%)]" />
      <div className="absolute inset-0 bg-esh-black/10" />
      {/* Film grain */}
      <div className="absolute inset-0 esh-grain" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full esh-container flex flex-col items-center text-center">
        {/* EYEBROW */}
        <div className="hero-eyebrow esh-eyebrow opacity-0 mb-8 flex items-center gap-3">
          <span className="w-10 h-px bg-gold/60" />
          <span className="text-gold/90">Event Production — Live — Visuals</span>
          <span className="w-10 h-px bg-gold/60" />
        </div>

        {/* ESH / COMPANY NAME */}
        <h1 className="hero-title opacity-0 text-gold text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] leading-none mb-3">
          ESH
        </h1>

        <p className="hero-subtitle opacity-0 text-white/50 text-[10px] sm:text-xs md:text-sm tracking-[0.34em] uppercase mb-10 md:mb-14">
          Ebenezer Streaming House Ltd
        </p>

        {/* MAIN HEADLINE */}
        <h2 className="hero-headline esh-heading-xl opacity-0 text-white mb-6 md:mb-8 max-w-5xl">
          WE BRING YOUR
          <br />
          <span className="text-gold font-normal">EVENT TO LIFE.</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="hero-desc esh-body opacity-0 text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-14 leading-relaxed">
          Professional live streaming, event production and media services
          built to bring your moments to the world.
        </p>

        {/* CTA BUTTONS */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="hero-cta opacity-0 inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold-light text-esh-black px-9 sm:px-11 h-13 py-4 text-xs font-bold tracking-[0.22em] transition-all duration-300 hover:shadow-2xl hover:shadow-gold/25 hover:-translate-y-0.5 group"
          >
            BOOK ESH
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#work"
            className="hero-cta opacity-0 inline-flex items-center justify-center gap-2.5 border border-white/25 hover:border-gold text-white hover:text-gold px-9 sm:px-11 py-4 text-xs font-bold tracking-[0.22em] transition-all duration-300 hover:-translate-y-0.5 group"
          >
            VIEW OUR WORK
            <svg
              className="w-3.5 h-3.5 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-esh-black to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/25 text-[9px] tracking-[0.35em] uppercase mb-1">
          Scroll
        </span>
        <div className="w-px h-10 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-gold/60 to-transparent animate-[eshScroll_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}