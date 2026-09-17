import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { listPublishedProjects } from "@/lib/public.functions";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects | Ebenezer Streaming House LTD" },
      {
        name: "description",
        content:
          "Selected live streaming, event coverage, documentary and video production work by Ebenezer Streaming House LTD in Kigali, Rwanda.",
      },
      { property: "og:title", content: "Projects | ESH" },
      { property: "og:description", content: "A production archive of ESH live streams, events and films." },
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
      <PageHeader eyebrow="Projects" title="Our Work" copy="Projects are unavailable right now. Please try again shortly." />
    </SiteLayout>
  ),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category))).sort()],
    [projects],
  );
  const visible = category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Projects"
        title="Our Work"
        copy="Live broadcasts, event coverage and films produced by the ESH team."
      />

      <section className="section-shell bg-background">
        {projects.length === 0 ? (
          <p className="text-base text-muted-foreground">
            New project case studies are being prepared. Check back soon.
          </p>
        ) : (
          <>
            {categories.length > 2 ? (
              <div className="mb-10 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant={item === category ? "gold" : "cinematic"}
                    size="sm"
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => (
                <Link
                  key={project.id}
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="flex h-full flex-col border border-border bg-surface transition-colors hover:border-primary/60"
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
                    <h2 className="mt-3 font-display text-xl font-semibold text-foreground">{project.title}</h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {project.short_description}
                    </p>
                    {project.location ? (
                      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {project.location}
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}
