import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
<<<<<<< HEAD
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { StatsBand } from "@/components/site/StatsBand";
import { CallToAction } from "@/components/site/CallToAction";
=======
import { StatsBand, TestimonialCard } from "@/components/site/sections";
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
import { testimonials } from "@/components/site/data";

export const Route = createFileRoute("/client-stories")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "Client Stories | Ebenezer Streaming House Ltd" },
      { name: "description", content: "Discover why leading organizations across East Africa trust Ebenezer Streaming House for their media production needs." },
=======
      { title: "Client Stories | Ebenezer Streaming House LTD" },
      {
        name: "description",
        content:
          "Why leading organizations across East Africa trust Ebenezer Streaming House for live streaming, event coverage and media production.",
      },
      { property: "og:title", content: "Voices of Success | ESH" },
      {
        property: "og:description",
        content: "200+ happy clients, 450+ projects completed and a 98% satisfaction rate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
    ],
  }),
  component: ClientStoriesPage,
});

function ClientStoriesPage() {
<<<<<<< HEAD
  const [featured, ...rest] = testimonials;
=======
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Client Stories"
        title="Voices of Success"
        copy="Discover why leading organizations across East Africa trust Ebenezer Streaming House for their media production needs."
      />

<<<<<<< HEAD
      <section className="section-shell bg-background">
        <StatsBand />
      </section>

      <section className="section-shell bg-surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Quote className="h-10 w-10 text-primary" aria-hidden="true" />
            <blockquote className="mt-6 font-display text-3xl font-semibold leading-snug tracking-tight text-foreground sm:text-4xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-lg font-bold text-primary"
              >
                {featured.initial}
              </span>
              <span>
                <span className="block font-semibold text-foreground">{featured.name}</span>
                <span className="block text-sm text-muted-foreground">{featured.role}</span>
              </span>
            </figcaption>
          </div>
          <div className="border border-border bg-background p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Featured Review</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Every testimonial on this page comes from a real partnership — churches, conference venues, wedding
              planners, podcast hosts, and NGOs across East Africa.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-background">
        <div className="section-heading grid gap-8 lg:grid-cols-[220px_1fr]">
          <span className="flex items-start gap-4 text-xs font-semibold uppercase text-primary">
            Testimonials<span className="mt-2 h-px w-12 bg-primary" aria-hidden="true" />
          </span>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            What our clients <span className="text-primary">say about us.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {rest.map((testimonial) => (
            <div key={testimonial.name} className="bg-surface">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </section>

      <CallToAction />
    </SiteLayout>
  );
}
=======
      <section className="section-shell bg-background pb-0">
        <StatsBand />
      </section>

      <section className="section-shell bg-background">
        <figure className="border border-border bg-surface px-7 py-14 text-center lg:px-16">
          <Quote className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
          <blockquote className="mx-auto mt-6 max-w-3xl font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
            “Exceptional service and quality that consistently exceeds expectations.”
          </blockquote>
          <figcaption className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Featured Review
          </figcaption>
        </figure>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
