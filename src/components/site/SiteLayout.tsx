import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <section className="border-b border-border bg-surface px-5 pb-14 pt-32 lg:px-10 lg:pb-20 lg:pt-44">
      <div className="mx-auto max-w-[1440px]">
        <span className="section-kicker">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {copy ? <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{copy}</p> : null}
      </div>
    </section>
  );
}
