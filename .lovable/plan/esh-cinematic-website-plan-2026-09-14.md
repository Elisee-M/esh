# ESH Cinematic Website Plan

## Goal
Build a premium, single-page website for Ebenezer Streaming House Ltd that immediately reads as a professional broadcast and media production company. The supplied logo and camera video remain the visual source of truth.

## Visual direction
- Use a cinematic black foundation with restrained gold and green accents sampled from the official identity.
- Pair large condensed display typography with a clean sans-serif body face.
- Keep sections editorial and continuous: strong rules, numbered labels, asymmetrical grids, and generous spacing instead of rounded card stacks.
- Use the supplied camera animation full-screen in the opening section with a subtle vignette and readable typography layered directly over it.
- Apply measured GSAP entrances, scroll reveals, media scale, and light parallax, with reduced-motion support.

## Build
1. **Prepare media**
   - Store the logo and video through the project’s production asset pipeline under organized image/video pointers.
   - Generate a lightweight poster frame from the supplied video for fast loading and fallback display.
   - Create a padded square favicon from the official logo without recoloring or redesigning it.
2. **Create the design system**
   - Define semantic black, gold, green, white, surface, border, typography, spacing, and motion tokens.
   - Add ESH-specific button treatments while preserving accessible focus and interaction states.
3. **Build the page as focused components**
   - Sticky transparent-to-dark navigation with active section tracking and an accessible mobile menu.
   - Full-screen video opening with the official logo, company name, supplied headline, supporting copy, and two actions.
   - Services, portfolio-ready project slots, editorial capability list, Why ESH, concise About, cinematic call-to-action, contact form, and minimal footer.
   - Use only the supplied logo/video; portfolio areas will be deliberate media-ready frames, not fake photography.
4. **Interaction and accessibility**
   - Smooth in-page navigation with correct focus targets.
   - Keyboard-accessible menu and form controls, clear labels, useful validation, reduced-motion behavior, and accessible video fallback text.
   - Quote form remains presentation-only because no delivery address or storage destination was provided.
5. **Metadata and verification**
   - Add ESH-specific page title, description, social metadata, favicon, and semantic page structure.
   - Verify video playback, logo rendering, links, mobile menu, form behavior, responsive layouts, animation behavior, asset requests, console output, and production build status.

## Technical details
- Keep the existing TanStack Start/Vite/React architecture and implement the landing page at `/`.
- Add GSAP with ScrollTrigger and clean up animation contexts on unmount.
- Use native responsive video attributes (`autoplay`, `muted`, `playsInline`, `loop`, `poster`, no controls) and avoid unnecessary media loading below the fold.
- Desktop and mobile checks will cover 1280px and a narrow phone viewport.
