import { createFileRoute } from "@tanstack/react-router";
<<<<<<< HEAD
import { Eye, Gem, Handshake, ShieldCheck, Target } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { FeatureCard, type Feature } from "@/components/site/FeatureCard";
import { StatsBand } from "@/components/site/StatsBand";
import { CallToAction } from "@/components/site/CallToAction";
=======
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { AboutFeatureGrid } from "@/components/site/sections";
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "About | Ebenezer Streaming House Ltd" },
      { name: "description", content: "Rwanda's premier media production house. With over 8 years of experience in live streaming, podcast production, documentary filming and event coverage." },
=======
      { title: "About | Ebenezer Streaming House LTD" },
      {
        name: "description",
        content:
          "Ebenezer Streaming House LTD is a professional media production company in Kigali, Rwanda with over 8 years of experience in live streaming and event coverage.",
      },
      { property: "og:title", content: "About Ebenezer Streaming House LTD" },
      {
        property: "og:description",
        content: "Rwanda's premier media production house — live streaming, podcasts, documentaries and event coverage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
    ],
  }),
  component: AboutPage,
});

<<<<<<< HEAD
const features: Feature[] = [
  {
    icon: Target,
    title: "Our Mission",
    copy: "To provide exceptional media production services that empower our clients to reach wider audiences.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    copy: "To be East Africa's leading media production and live streaming company, setting the standard for quality.",
  },
  {
    icon: Gem,
    title: "Quality First",
    copy: "We use professional-grade equipment and employ industry best practices to ensure every project meets broadcast standards.",
  },
  {
    icon: Handshake,
    title: "Client-Focused",
    copy: "Your success is our priority. We work closely with you to understand your needs and deliver tailored solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    copy: "Count on us for punctual delivery, seamless execution, and consistent quality across all our services.",
  },
];

=======
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
<<<<<<< HEAD
        eyebrow="About Us"
        title="Rwanda's Premier Media Production House"
        copy="Ebenezer Streaming House LTD is a professional media production company based in Kigali, Rwanda. With over 8 years of experience, we specialize in live event streaming, podcast production, documentary filming, and comprehensive event coverage."
      />

      <section className="section-shell bg-background">
        <div className="grid gap-6 lg:grid-cols-3">
          <p className="lg:col-span-2 max-w-3xl text-lg leading-8 text-muted-foreground">
            Our team of skilled professionals uses state-of-the-art equipment to deliver broadcast-quality content
            that exceeds expectations. From corporate conferences to church services, from weddings to national
            events, we bring your vision to life.
          </p>
          <div className="flex items-center gap-4 border border-primary/40 bg-primary/5 px-6 py-5">
            <span className="font-display text-6xl font-bold text-primary">8+</span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Years of
              <br />
              Experience
            </span>
          </div>
        </div>

        <div className="mt-20 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-surface">
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="section-heading grid gap-8 lg:grid-cols-[220px_1fr]">
          <span className="flex items-start gap-4 text-xs font-semibold uppercase text-primary">
            Track Record<span className="mt-2 h-px w-12 bg-primary" aria-hidden="true" />
          </span>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            Trusted by leading organizations <span className="text-primary">across East Africa.</span>
          </h2>
        </div>
        <StatsBand className="mt-14" />
      </section>

      <CallToAction />
    </SiteLayout>
  );
}
=======
        eyebrow="About"
        title="Rwanda's Premier Media Production House"
        copy="Ebenezer Streaming House LTD is a professional media production company based in Kigali, Rwanda."
      />

      <section className="section-shell bg-background">
        <div className="grid gap-10 lg:grid-cols-2">
          <p className="text-base leading-8 text-muted-foreground">
            With over 8 years of experience, we specialize in live event streaming, podcast production,
            documentary filming, and comprehensive event coverage. Our team of skilled professionals uses
            state-of-the-art equipment to deliver broadcast-quality content that exceeds expectations.
          </p>
          <p className="text-base leading-8 text-muted-foreground">
            From corporate conferences to church services, from weddings to national events, we bring your
            vision to life.
          </p>
        </div>
      </section>

      <section className="section-shell bg-surface pt-0">
        <AboutFeatureGrid />
      </section>
    </SiteLayout>
  );
}
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
