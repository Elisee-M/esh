# ESH — Ebenezer Streaming House Ltd

A premium, cinematic landing website for **ESH (Ebenezer Streaming House Ltd)** — a professional live-streaming, event production and media production company.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- GSAP (animations + ScrollTrigger)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start Vite dev server            |
| `npm run build`   | Type-check + production build    |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run Oxlint                       |

## Project Structure

```
src/
  assets/
    images/          # esh_logo_no_bg.png (official ESH logo)
    videos/          # video_bg.mp4 (hero background video)
  components/
    Navbar.tsx       # Transparent nav → dark on scroll + mobile menu
    Hero.tsx         # Cinematic hero with background video
    Services.tsx     # Production services grid
    OurWork.tsx      # Editorial portfolio placeholders
    Capabilities.tsx # Production capability grid
    WhyESH.tsx       # Value propositions
    About.tsx        # About ESH
    CTA.tsx          # Cinematic call-to-action
    Contact.tsx      # Quote request form
    Footer.tsx       # Premium footer
  App.tsx
  main.tsx
  index.css          # Tailwind v4 theme with ESH brand colors
```

## Brand Identity

- **Gold** `#F2B323` — primary CTAs, highlights, accents, hover states
- **Green** `#145A32` — secondary accents, supporting details
- **Black** `#1C1A1D` — dark sections, overlays, nav after scroll
- **White** `#FFFFFF` — primary typography, contrast

## Media Placeholders

No client project media has been provided yet, so the **Our Work** section uses elegant, media-ready placeholder components. Each project entry supports `title`, `event type`, `location`, `services`, and `image/video` — drop real assets into `OurWork.tsx` when available.