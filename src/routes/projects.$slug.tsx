import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { getPublishedProject } from "@/lib/public.functions";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const result = await getPublishedProject({ data: { slug: params.slug } });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project unavailable | ESH" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const description = project.short_description || `${project.title} — a production by Ebenezer Streaming House LTD.`;
    return {
      meta: [
        { title: `${project.title} | ESH Projects` },
        { name: "description", content: description },
        { property: "og:title", content: project.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <section className="section-shell bg-background pt-40">
        <h1 className="font-display text-3xl font-bold text-foreground">Project not found</h1>
        <p className="mt-3 text-muted-foreground">This project may have been removed or unpublished.</p>
        <Button asChild variant="gold" size="lg" className="mt-8">
          <Link to="/projects">Back to projects</Link>
        </Button>
      </section>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <section className="section-shell bg-background pt-40">
        <h1 className="font-display text-3xl font-bold text-foreground">This project didn't load</h1>
        <Button asChild variant="gold" size="lg" className="mt-8">
          <Link to="/projects">Back to projects</Link>
        </Button>
      </section>
    </SiteLayout>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project, media } = Route.useLoaderData();

  const facts = [
    ["Client", project.client_name],
    ["Date", project.project_date],
    ["Location", project.location],
    ["Category", project.category],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface px-5 pb-14 pt-32 lg:px-10 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-[1440px]">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          {project.short_description ? (
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {project.short_description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="section-shell bg-background">
        {project.cover_image_url ? (
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="mb-14 w-full border border-border object-cover"
          />
        ) : null}

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            {project.full_description ? (
              <div className="whitespace-pre-line text-base leading-8 text-muted-foreground">
                {project.full_description}
              </div>
            ) : null}

            {project.video_url ? (
              <a
                href={project.video_url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-primary"
              >
                Watch the video
              </a>
            ) : null}
          </div>

          <aside className="h-fit border border-border bg-surface p-7">
            <dl className="space-y-5">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-sm text-foreground">{value}</dd>
                </div>
              ))}
              {project.services.length > 0 ? (
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span key={service} className="border border-border px-2 py-1 text-xs text-foreground">
                        {service}
                      </span>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>

        {media.length > 0 ? (
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {media.map((item) => (
              <figure key={item.id} className="border border-border bg-surface">
                <img
                  src={item.image_url}
                  alt={item.caption ?? project.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                {item.caption ? (
                  <figcaption className="p-4 text-xs text-muted-foreground">{item.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ) : null}
      </section>
    </SiteLayout>
  );
}
