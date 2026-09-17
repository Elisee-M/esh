import { ArrowUpRight, Star } from "lucide-react";
import {
  Award,
  HeartHandshake,
  ShieldCheck,
  Target,
  Eye,
  type LucideIcon,
} from "lucide-react";
import type { Service, Testimonial } from "./data";
import { stats } from "./data";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="section-kicker">{eyebrow}</span>
      <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-muted-foreground">{copy}</p> : null}
    </div>
  );
}

export const aboutFeatures: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Our Mission",
    description:
      "To provide exceptional media production services that empower our clients to reach wider audiences with professional, high-quality content.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "To be East Africa's leading media production and live streaming company, setting the standard for quality and innovation.",
    icon: Eye,
  },
  {
    title: "Quality First",
    description:
      "We use professional-grade equipment and follow industry best practices to deliver broadcast-standard results every time.",
    icon: Award,
  },
  {
    title: "Client-Focused",
    description:
      "Your success is our priority. We work closely with you to understand your needs and deliver tailored solutions.",
    icon: HeartHandshake,
  },
  {
    title: "Reliability",
    description:
      "Punctual delivery, seamless execution and consistent quality — the standard our clients rely on.",
    icon: ShieldCheck,
  },
];

export function AboutFeatureGrid() {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {aboutFeatures.map((feature) => (
        <article key={feature.title} className="reveal-group flex h-full flex-col bg-surface p-7">
          <feature.icon className="h-7 w-7 text-primary" aria-hidden="true" />
          <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{feature.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
        </article>
      ))}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="reveal-group flex h-full flex-col border border-border bg-surface p-7 transition-colors duration-300 hover:border-primary/60">
      <service.icon className="h-7 w-7 text-primary" aria-hidden="true" />
      <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{service.description}</p>
      <a
        href={service.href}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary"
      >
        Learn More <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}

export function StatsBand() {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface px-6 py-10 text-center">
          <p className="font-display text-4xl font-bold text-primary lg:text-5xl">{stat.value}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="reveal-group flex h-full flex-col border border-border bg-surface p-7">
      <div className="flex items-center justify-between">
        <Stars rating={testimonial.rating} />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          {testimonial.service}
        </span>
      </div>
      <p className="mt-5 flex-1 text-sm leading-7 text-foreground/85">“{testimonial.quote}”</p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span className="flex h-11 w-11 items-center justify-center bg-primary/15 font-display text-lg font-bold text-primary">
          {testimonial.initial}
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}
