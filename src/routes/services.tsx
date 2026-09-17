import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
<<<<<<< HEAD
import { ServiceCard } from "@/components/site/ServiceCard";
import { StatsBand } from "@/components/site/StatsBand";
import { CallToAction } from "@/components/site/CallToAction";
=======
import { ServiceCard } from "@/components/site/sections";
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
import { services } from "@/components/site/data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "Services | Ebenezer Streaming House Ltd" },
      { name: "description", content: "Live event streaming, podcast production, video and audio production, documentary production, event coverage, technical support, sound, LED screens, photography and lighting." },
=======
      { title: "Services | Ebenezer Streaming House LTD" },
      {
        name: "description",
        content:
          "Live event streaming, podcast production, documentary filming, event coverage, sound, LED screens, lighting and photography in Kigali, Rwanda.",
      },
      { property: "og:title", content: "Professional Media Solutions | ESH" },
      {
        property: "og:description",
        content: "Comprehensive media services to meet all your content creation needs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Services"
<<<<<<< HEAD
        title="Production without limits"
        copy="From the first signal to the final master, we bring every technical and creative layer together for your event, broadcast, or film."
      />

      <section className="section-shell bg-surface">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="bg-surface">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell bg-background">
        <StatsBand />
      </section>

      <CallToAction />
    </SiteLayout>
  );
}
=======
        title="Professional Media Solutions"
        copy="From live streaming to documentary production, we offer comprehensive media services to meet all your content creation needs."
      />
      <section className="section-shell bg-background">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
