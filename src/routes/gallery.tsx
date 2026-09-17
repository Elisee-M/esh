<<<<<<< HEAD
import { createFileRoute } from "@tanstack/react-router";
import { Images } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CallToAction } from "@/components/site/CallToAction";
=======
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { listPublishedGallery } from "@/lib/public.functions";
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
<<<<<<< HEAD
      { title: "Gallery | Ebenezer Streaming House Ltd" },
      { name: "description", content: "Moments from events, productions and live streams captured by Ebenezer Streaming House." },
    ],
  }),
=======
      { title: "Gallery | Ebenezer Streaming House LTD" },
      {
        name: "description",
        content: "Photographs from live broadcasts, conferences, church services and events covered by ESH in Rwanda.",
      },
      { property: "og:title", content: "Gallery | ESH" },
      { property: "og:description", content: "Images from ESH productions across Rwanda and East Africa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => {
    try {
      return { items: await listPublishedGallery() };
    } catch {
      return { items: [] };
    }
  },
  errorComponent: () => (
    <SiteLayout>
      <PageHeader eyebrow="Gallery" title="From the field" copy="The gallery is unavailable right now." />
    </SiteLayout>
  ),
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
  component: GalleryPage,
});

function GalleryPage() {
<<<<<<< HEAD
=======
  const { items } = Route.useLoaderData();
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category))).sort()],
    [items],
  );
  const visible = category === "All" ? items : items.filter((i) => i.category === category);
  const current = active === null ? null : visible[active] ?? null;

>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
<<<<<<< HEAD
        title="Moments we captured"
        copy="A visual collection of the events, productions and broadcasts we have been privileged to capture."
      />
      <section className="section-shell bg-surface">
        <div className="flex flex-col items-center justify-center gap-5 border border-dashed border-border bg-background px-6 py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
            <Images className="h-8 w-8" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Gallery coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              We&apos;re putting the finishing touches on our photo and video gallery. Please check back soon.
            </p>
          </div>
        </div>
      </section>
      <CallToAction />
    </SiteLayout>
  );
}
=======
        title="From the field"
        copy="Moments captured on live broadcasts, shoots and events across Rwanda."
      />

      <section className="section-shell bg-background">
        {items.length === 0 ? (
          <p className="text-base text-muted-foreground">Gallery images are being added. Check back soon.</p>
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
                    onClick={() => {
                      setCategory(item);
                      setActive(null);
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className="group relative block overflow-hidden border border-border bg-surface"
                  aria-label={item.title || "Open image"}
                >
                  <img
                    src={item.image_url}
                    alt={item.title || item.description || "ESH production photograph"}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.title ? (
                    <span className="absolute inset-x-0 bottom-0 bg-background/80 p-3 text-left text-xs uppercase tracking-[0.15em] text-foreground">
                      {item.title}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {current ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close image"
            className="absolute right-5 top-5 text-foreground"
          >
            <X className="h-7 w-7" />
          </button>
          <figure onClick={(event) => event.stopPropagation()} className="max-h-full max-w-5xl">
            <img
              src={current.image_url}
              alt={current.title || "ESH production photograph"}
              className="max-h-[80vh] w-auto object-contain"
            />
            {current.title || current.description ? (
              <figcaption className="mt-4 text-center text-sm text-muted-foreground">
                {current.title} {current.description ? `— ${current.description}` : ""}
              </figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}
    </SiteLayout>
  );
}
>>>>>>> dcee1ff81847ec873b3a53b58238b8ddcc22df01
