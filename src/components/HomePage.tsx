import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "./site/SiteLayout";
import { Hero } from "./site/Hero";
import { ServiceCard } from "./site/ServiceCard";
import { StatsBand } from "./site/StatsBand";
import { CallToAction } from "./site/CallToAction";
import { Button } from "./ui/button";
import { services } from "./site/data";

export function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <ServicesPreview />
      <StatsBand className="mx-5 mb-24 lg:mx-10" />
      <AboutPreview />
      <CallToAction />
    </SiteLayout>
  );
}

function ServicesPreview() {
  return (
    <section className="section-shell bg-surface">
      <div className="section-heading grid gap-8 lg:grid-cols-[220px_1fr]">
        <span className="flex items-start gap-4 text-xs font-semibold uppercase text-primary">
          01<span className="mt-2 h-px w-12 bg-primary" aria-hidden="true" />Services
        </span>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display max-w-3xl text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Production without <span className="text-primary">limits.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground lg:text-lg">
              From the first signal to the final master, we bring every technical and creative layer together for your event.
            </p>
          </div>
          <Button asChild variant="cinematic" size="lg" className="shrink-0">
            <Link to="/services">
              All Services <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 6).map((service) => (
          <div key={service.title} className="bg-surface">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="section-shell bg-background">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <span className="section-kicker">02 — About</span>
          <div className="mt-10 border-l-4 border-primary pl-6">
            <p className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-foreground sm:text-6xl">
              ESH
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              Ebenezer Streaming House Ltd
            </p>
          </div>
        </div>
        <div>
          <p className="font-display text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
            Beyond the venue. <span className="text-primary">Into the world.</span>
          </p>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            Based in Kigali, Rwanda, with over 8 years of experience, we specialize in live event streaming,
            podcast production, documentary filming, and comprehensive event coverage for clients across East Africa.
          </p>
          <div className="mt-8">
            <Button asChild variant="gold" size="lg">
              <Link to="/about">
                More About Us <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}