import { ArrowUpRight } from "lucide-react";
import type { Service } from "./data";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="group flex h-full flex-col border border-border bg-surface p-6 transition-colors hover:border-primary/50">
      <div className="flex h-12 w-12 items-center justify-center border border-primary/40 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{service.description}</p>
      <a
        href={service.href}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-6 inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:text-primary-foreground"
      >
        Learn More
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </a>
    </article>
  );
}