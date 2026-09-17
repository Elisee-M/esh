import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/images/esh-logo.png.asset.json";
import { navItems } from "./nav-items";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? "border-border bg-background/95 backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 lg:h-22 lg:px-10" aria-label="Main">
        <Link to="/" className="relative z-10 flex items-center gap-3" aria-label={`${"Ebenezer Streaming House"} home`}>
          <img src={logoAsset.url} alt="Ebenezer Streaming House LTD" className="h-11 w-auto lg:h-13" />
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {navItems.slice(0, 7).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="nav-link text-foreground/75 hover:text-foreground data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="gold" size="lg">
            <Link to="/book">Book Service</Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="icon"
          size="iconLg"
          className="relative z-10 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full overflow-hidden border-b border-border bg-background transition-[max-height,opacity] duration-400 xl:hidden ${
          open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 py-6">
          {navItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="flex items-center justify-between border-b border-border py-3.5 font-display text-lg font-semibold tracking-tight text-foreground data-[status=active]:text-primary"
            >
              {item.label}
              <span className="font-sans text-xs text-muted-foreground">0{index + 1}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
