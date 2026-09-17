import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { SectionHeading, ServiceCard, StatsBand } from "@/components/site/sections";
import { services } from "@/components/site/data";
import { Button } from "@/components/ui/button";
import { listPublishedProjects } from "@/lib/public.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ebenezer Streaming House LTD | Live Streaming & Media Production Kigali" },
      {
        name: "description",
        content:
          "Professional live streaming, event coverage and media production in Kigali, Rwanda. Broadcast-quality content for churches, conferences, weddings and national events.",
      },
      { property: "og:title", content: "Ebenezer Streaming House LTD" },
      {
        property: "og:description",
        content: "Broadcast-quality live streaming and media production services based in Kigali, Rwanda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => {
    try {
      return { projects: await listPublishedProjects() };
    } catch {
      return { projects: [] };
    }
  },
  errorComponent: () => (
    <SiteLayout>
      <Hero />
    </SiteLayout>
  ),
  component: HomePage,
});

function HomePage() {
  const { projects } = Route.useLoaderData();
  const featured = projects.slice(0, 3);

  return (
    <SiteLayout>
      <Hero />

      <section className="section-shell bg-surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="About ESH"
            title="Rwanda's Premier Media Production House"
          />
          <div>
            <p className="text-base leading-8 text-muted-foreground">
              Ebenezer Streaming House LTD is a professional media production company based in Kigali,
              Rwanda. With over 8 years of experience, we specialize in live event streaming, podcast
              production, documentary filming, and comprehensive event coverage.
            </p>
            <Button asChild variant="cinematic" size="lg" className="mt-8">
              <Link to="/about">
                More about us <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-shell bg-background">
        <SectionHeading
          eyebrow="Services"
          title="Professional Media Solutions"
          copy="From live streaming to documentary production, we offer comprehensive media services to meet all your content creation needs."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
        <Button asChild variant="gold" size="lg" className="mt-10">
          <Link to="/services">
            All services <ArrowRight />
          </Link>
        </Button>
      </section>

      <section className="section-shell bg-surface">
        <SectionHeading eyebrow="By the numbers" title="Trusted across East Africa" align="center" />
        <div className="mt-12">
          <StatsBand />
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="section-shell bg-background">
          <SectionHeading eyebrow="Projects" title="Selected productions" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.id}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group flex h-full flex-col border border-border bg-surface transition-colors hover:border-primary/60"
              >
                {project.cover_image_url ? (
                  <img
                    src={project.cover_image_url}
                    alt={project.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {project.category}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {project.short_description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Button asChild variant="cinematic" size="lg" className="mt-10">
            <Link to="/projects">
              View all projects <ArrowRight />
            </Link>
          </Button>
        </section>
      ) : null}

      <section className="cta-band border-y border-border px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Your event deserves to be seen.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Let's turn your next event into an experience that reaches beyond the room.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link to="/book">
                Book a Service <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="cinematic" size="xl">
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
