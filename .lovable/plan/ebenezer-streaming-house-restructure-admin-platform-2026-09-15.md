# Ebenezer Streaming House — Restructure & Admin Platform

Keeps the existing cinematic identity, hero video and logo. Everything below evolves the current components rather than starting over.

## Site structure

The site becomes multi-page (real URLs, better for search and sharing):

1. `/` Home — hero video, short intro, service highlights, stats, featured projects
2. `/about` — About
3. `/services` — 10 services
4. `/client-stories` — stats, featured review, 6 testimonials
5. `/projects` and `/projects/:slug` — database-driven
6. `/gallery` — database-driven, with lightbox
7. `/contact` — info + form
8. `/book` — Book Service form

Header navigation follows that exact order, highlights the current page, and keeps a polished mobile menu. Header stays legible over the hero via a dark scrim.

## Typography

Replace the current Barlow Condensed / Manrope pair with a broadcast-editorial system:

- Headings: **Archivo** (tight, engineered, industrial — reads as broadcast, not startup)
- Body/UI: **Inter Tight** for dense readable copy at all sizes

A fixed type scale defines hero, section heading, subheading, body, nav, button, stat and card sizes so hierarchy is consistent everywhere. Hero headline is reduced from the current oversized treatment.

## Hero video behaviour

The video element is mounted once at the page level and never unmounts on navigation, so it does not restart when moving between sections or on re-render. Muted, `playsInline`, `preload="metadata"`, poster fallback, and a guarded single autoplay attempt. Logo sits in a clear upper-left safe zone with generous breathing room and a soft gradient behind it.

## Content sections

- **About**: intro copy plus five icon cards (Mission, Vision, Quality First, Client-Focused, Reliability) using Lucide icons — no "svg" text anywhere.
- **Services**: 10 cards in an even responsive grid, each with icon, title, description and a "Learn More" link to the matching ebenezerstreaminghouse.com page (opens in a new tab, URL never shown). Equal card heights.
- **Client Stories**: 4 prominent metrics (200+, 450+, 180+, 98%), a featured pull-quote, then 6 testimonial cards with star ratings and initial avatars.
- **Footer**: logo, description, quick links, services, contact details, and clickable YouTube + Instagram icons.

## Backend (Lovable Cloud)

Enabling the built-in backend for data, login and file storage.

Tables: `profiles`, `user_roles` (separate roles table), `projects`, `project_media`, `gallery_items`, `contact_submissions`, `booking_requests`. Storage buckets for project covers, project media and gallery images (public read, admin-only writes).

Security rules: anyone can read only published projects and gallery items; anyone can submit a contact message or booking; only signed-in admins can create, edit, delete, or read submissions and bookings. Admin status is checked server-side against the roles table, never in the browser only.

## Admin

- Hidden login at `/admin/login` (not linked from the public site).
- `/admin` dashboard: counts for projects, published projects, gallery items, bookings, messages.
- Projects manager: list, search, filter, create, edit, delete, publish toggle, featured toggle, cover + multi-image upload, category, client, date, location, services, optional video URL.
- Gallery manager: upload, edit caption/category, featured, publish toggle, delete.
- Bookings: list, filter, detail view, status (pending / contacted / confirmed / completed / cancelled).
- Messages: list, read/unread, delete.

The first admin account is created by signing up at the hidden login; I will grant that account the admin role.

## Public data pages

Projects grid with category filter and detail pages showing media gallery, client, date, location, services and video. Gallery grid with lazy loading and lightbox. Both hide themselves gracefully when there is no content yet — no broken or empty placeholder cards.

## Forms

Contact and Book Service forms validate input, show success and error states, and save to the database for admin review.

## Delivery order

Work ships in sequence with a check after each step: typography → navigation/hero → about → services → client stories → backend schema → auth/roles → projects admin + public pages → gallery admin + public page → contact → booking → dashboard polish → footer → responsive and accessibility QA.

## Technical notes

TanStack Start file routes; existing components (SectionHeading, Button variants, Hero) are refactored, not replaced. Design tokens stay in `src/styles.css`; fonts load via a link tag in the root route. Row Level Security on every table with explicit grants. Admin routes live under an authenticated layout with server-side role verification on all privileged reads and writes.
