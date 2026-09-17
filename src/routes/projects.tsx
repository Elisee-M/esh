import { createFileRoute } from "@tanstack/react-router";
import { Clapperboard } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CallToAction } from "@/components/site/CallToAction";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Ebenezer Streaming House Ltd" },
      { name: "description", content: "A selection of live streaming, event coverage, documentary and production projects delivered by Ebenezer Streaming House." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Work"
        title="Projects"
        copy="A selection of live streaming, event coverage, documentary and production work delivered for clients across East Africa."
      />
      <section className="section-shell bg-surface">
        <div className="flex flex-col items-center justify-center gap-5 border border-dashed border-border bg-background px-6 py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
            <Clapperboard className="h-8 w-8" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Project showcase coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              We&apos;re preparing our latest productions. Check back shortly to explore our live streaming, event
              coverage and documentary work.
            </p>
          </div>
        </div>
      </section>
      <CallToAction />
    </SiteLayout>
  );
}