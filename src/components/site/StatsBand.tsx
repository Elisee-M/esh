import { stats } from "./data";
import { cn } from "@/lib/utils";

export function StatsBand({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface px-6 py-10 text-center lg:py-14">
          <p className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            {stat.value}
          </p>
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}