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
      { opacity: 1, y: 0, duration: 0.8 },
    )
    .fromTo(
      content.querySelector('.hero-title'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    )
    .fromTo(
      content.querySelector('.hero-headline'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.5'
    )
    .fromTo(
      content.querySelector('.hero-desc'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    )
    .fromTo(
      content.querySelector('.hero-ctas .hero-cta'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
      '-=0.3'
    )

    // Subtle parallax scroll on the video
    const parallax = gsap.to(video, {
      yPercent: 8,
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
      yPercent: -6,
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
      className="relative w-full min-h-screen min-h-[100svh] overflow-hidden"
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
        className="absolute inset-0 w-full h-[110%] object-cover -top-[5%]"
        aria-hidden="true"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-esh-black/80 via-esh-black/60 to-esh-black/90" />
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold)_0%,transparent_40%)] bg-[length:200%_200%] bg-[opacity:0.03]" />
      <div className="absolute inset-0 bg-esh-black/30" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex h-[100svh] items-center px-6 lg:px-12">
        {/* Container with max-width */}
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Flex layout for left/right composition */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">

            {/* LEFT SIDE - Content */}
            <div className="flex flex-col space-y-6 lg:w-[48%]">
              {/* Eyebrow */}
              <div className="hero-eyebrow flex items-center gap-3 opacity-0">
                <span className="w-2 h-2 bg-gold rounded-full"></span>
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
                  EVENT PRODUCTION • LIVE • VISUALS
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="hero-title text-white/90 text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tighter mb-4 opacity-0">
                WE BRING YOUR
                <br className="hidden lg:inline-block" />
                EVENT TO LIFE.
              </h1>

              {/* Description */}
              <p className="hero-desc text-white/60 text-base lg:text-lg max-w-xl leading-relaxed opacity-0">
                Professional event production and media services that transform moments into unforgettable experiences.
              </p>

              {/* CTA Buttons */}
              <div className="hero-ctas flex flex-col lg:flex-row gap-6 mt-8 opacity-0">
                <a
                  href="#contact"
                  className="hero-cta flex items-center gap-3 bg-gold hover:bg-gold-light text-esh-black px-6 lg:px-8 py-4 font-bold text-sm tracking-[0.2em] transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
                >
                  BOOK ESH
                  <span className="w-3 h-[1px] bg-esh-black transition-all duration-300 group-hover:w-6"></span>
                </a>
                <a
                  href="#work"
                  className="hero-cta flex items-center gap-3 border border-white/20 hover:border-gold text-white hover:text-gold px-6 lg:px-8 py-4 font-bold text-sm tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5"
                >
                  VIEW OUR WORK
                  <span className="w-3 h-[1px] bg-white/30 transition-all duration-300 group-hover:bg-gold group-hover:w-6"></span>
                </a>
              </div>
            </div>

            {/* RIGHT SIDE - Visual */}
            <div className="hidden lg:block lg:w-[48%] relative">
              {/* Visual treatment with abstract elements */}
              <div className="relative h-[480px] rounded-xl overflow-hidden bg-[length:200%_200%] bg-[opacity:0.02]">
                {/* Abstract gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-gold)_0%,transparent_40%)] opacity-10"></div>
                {/* Subtle video or animated element placeholder */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321497487-e2885193eed2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-15"></div>
                {/* Moving light particles */}
                <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><circle cx=%2250%22 cy=%2250%22 r=%2230%22 fill=%22%23F2B323%22 fill-opacity=%220.1%22 filter=%22url(%23noiseFilter)%22/><circle cx=%2230%22 cy=%2270%22 r=%2215%22 fill=%22%23F2B323%22 fill-opacity=%220.08%22 filter=%22url(%23noiseFilter)%22/><circle cx=%2280%22 cy=%2220%22 r=%2220%22 fill=%22%23F2B323%22 fill-opacity=%220.12%22 filter=%22url(%23noiseFilter)%22/></svg>')] bg-[length:200%_200%] animate-[move_15s_linear_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}