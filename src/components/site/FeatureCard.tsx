import type { LucideIcon } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <article className="flex h-full flex-col border border-border bg-surface p-7 transition-colors hover:border-primary/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">{feature.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.copy}</p>
    </article>
  );
}