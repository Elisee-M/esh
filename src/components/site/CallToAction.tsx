import { ArrowRight, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { company } from "./nav-items";

export function CallToAction() {
  return (
    <section className="cta-band relative overflow-hidden border-y border-border px-5 py-24 sm:py-32 lg:px-10">
      <div className="relative mx-auto max-w-[1440px]">
        <span className="section-kicker">Ready when you are</span>
        <h2 className="mt-8 max-w-4xl font-display text-5xl font-bold leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Your event deserves <span className="text-primary">to be seen.</span>
        </h2>
        <div className="mt-10 flex flex-col gap-7 border-t border-border pt-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-lg leading-7 text-muted-foreground">
            Let&apos;s turn your next event into an experience that reaches beyond the room.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link to="/book">
                Start Your Project <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="cinematic" size="xl">
              <a href={company.phoneHref}>
                <Phone /> Call {company.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}