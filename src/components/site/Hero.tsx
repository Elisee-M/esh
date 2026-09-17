import { memo, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/images/esh-logo.png.asset.json";
import videoAsset from "@/assets/videos/esh-hero.mp4.asset.json";
import posterAsset from "@/assets/images/esh-hero-poster.jpg.asset.json";

function HeroBase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.paused) return;
    void video.play().catch(() => undefined);
  }, []);

  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-background">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterAsset.url}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={videoAsset.url} type="video/mp4" />
      </video>
      <div className="hero-overlay absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-36 lg:px-10 lg:pb-24">
        <div className="hero-mark mb-10 inline-flex items-center gap-4 rounded-sm bg-background/35 px-4 py-3 backdrop-blur-sm">
          <img src={logoAsset.url} alt="Ebenezer Streaming House LTD" className="h-12 w-auto sm:h-14" />
          <span className="hidden border-l border-foreground/25 pl-4 text-[11px] font-semibold uppercase leading-4 tracking-[0.18em] text-foreground/80 sm:block">
            Ebenezer Streaming
            <br />
            House LTD
          </span>
        </div>

        <p className="hero-copy text-xs font-semibold uppercase tracking-[0.3em] text-primary">Kigali, Rwanda</p>
        <h1 className="hero-title mt-5 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-tight text-foreground">
          We capture the moment.
          <br />
          <span className="text-primary">You experience it.</span>
        </h1>

        <div className="hero-copy mt-8 flex flex-col gap-6 border-t border-foreground/20 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-base leading-7 text-foreground/80">
            Broadcast-quality live streaming, event coverage and media production for organizations across East Africa.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link to="/book">
                Book a Service <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="cinematic" size="xl">
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Hero = memo(HeroBase);
