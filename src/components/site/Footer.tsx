import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logoAsset from "@/assets/images/esh-logo.png.asset.json";
import { company } from "./nav-items";

const quickLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
] as const;

const services = [
  "Live Streaming",
  "Podcast Production",
  "Video Production",
  "Documentary",
  "Event Coverage",
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 pb-8 pt-16 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logoAsset.url} alt={company.legal} className="h-16 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
              Professional live streaming and media production services based in Kigali, Rwanda.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={company.youtube} target="_blank" rel="noreferrer noopener" aria-label="YouTube" className="social-chip">
                <Youtube className="h-4 w-4" />
              </a>
              <a href={company.instagram} target="_blank" rel="noreferrer noopener" aria-label="Instagram" className="social-chip">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="footer-label">Quick Links</p>
            {quickLinks.map(([label, to]) => (
              <Link key={to} to={to} className="footer-link">
                {label}
              </Link>
            ))}
          </div>

          <div>
            <p className="footer-label">Services</p>
            {services.map((service) => (
              <Link key={service} to="/services" className="footer-link">
                {service}
              </Link>
            ))}
          </div>

          <div>
            <p className="footer-label">Contact</p>
            <a href={company.phoneHref} className="footer-link flex items-center gap-2 normal-case">
              <Phone className="h-4 w-4 text-primary" /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="footer-link flex items-center gap-2 normal-case break-all">
              <Mail className="h-4 w-4 shrink-0 text-primary" /> {company.email}
            </a>
            <p className="footer-link flex items-center gap-2 normal-case">
              <MapPin className="h-4 w-4 text-primary" /> {company.address}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legal}. All rights reserved.</p>
          <p>Kigali, Rwanda</p>
        </div>
      </div>
    </footer>
  );
}
