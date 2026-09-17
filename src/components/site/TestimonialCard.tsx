import { Quote } from "lucide-react";
import type { Testimonial } from "./data";
import { Stars } from "./Stars";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col border border-border bg-surface p-7">
      <div className="flex items-center justify-between gap-4">
        <Stars rating={testimonial.rating} />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          {testimonial.service}
        </span>
      </div>
      <blockquote className="mt-5 flex-1 text-sm leading-7 text-foreground/85">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-lg font-bold text-primary"
        >
          {testimonial.initial}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-foreground">{testimonial.name}</span>
          <span className="block truncate text-xs text-muted-foreground">{testimonial.role}</span>
        </span>
      </figcaption>
      <Quote className="pointer-events-none absolute right-6 top-6 h-8 w-8 text-foreground/10" aria-hidden="true" />
    </figure>
  );
}