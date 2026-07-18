# Redesign Plan — Hero, Projects, Experience, Skills

Unified under the existing Clinical Noir palette (charcoal + terracotta + gold, Playfair/Inter/JetBrains Mono). No token changes — only composition, hierarchy, density, and motion.

## Shared design language
- Editorial two-column rhythm: oversized serif headings left, monospace meta right.
- Numbered section markers (`01 — HERO`, `02 — WORK`, …) in JetBrains Mono, muted.
- KPI-first: every card leads with a big serif number, supporting copy below.
- Hairline dividers (`border-border/60`) instead of card borders where possible — less "boxed", more magazine.
- Consistent motion: single fade-up on scroll, no per-element stagger noise.

---

## 01 — Hero (`HeroSection.tsx`)
Current: portrait right, KPI dl below description, three CTAs stacked.

Moves:
- Split into 7/5 grid: left = eyebrow + oversized serif name (`text-6xl md:text-8xl`), role line in mono, one-sentence positioning, CTAs.
- Right column: portrait becomes a tall portrait card (4:5) with a thin terracotta rule top-left and a "AVAILABLE · CAIRO / REMOTE" tag pinned bottom-left over the image.
- KPI strip moves *below* the hero as a full-width hairline band (3 numbers separated by vertical rules) — same slot currently held by `MarqueeStrip`, which shifts down one.
- CTAs collapse to 2 primary (Download CV, Email) + inline LinkedIn/GitHub icon row — reduces button noise.

## 02 — Projects (`ProjectsSection.tsx`)
Current: alternating asymmetric grid, all projects equal weight, `<details>` disclosure per card.

Moves:
- **Featured slot** for RehabRL: full-bleed row with left = giant KPI (e.g. "47%" reward gain), right = title + 2-line pitch + tech chips + "Read case study" link.
- **Secondary projects**: 2-column card grid, each card = KPI number (serif, huge) → title → 1-line outcome → tech chips. Narrative hidden behind a link to a dedicated view, not inline `<details>`.
- Filter chips (All · ML · Analytics · Clinical) as a mono row above the grid.
- Remove the current alternating zigzag — it fights the editorial rhythm.

## 03 — Experience (`ExperienceSection.tsx`)
Current: stacked cards with Challenge/Solution/Impact bullets.

Moves:
- True vertical timeline: left rail with year markers + terracotta node dots, right column with entries.
- Each entry: role (serif) · company (mono) · date range (mono, muted) · 2–3 outcome bullets leading with a metric where possible · stack chips row.
- Collapse Challenge/Solution into a single "Context" line; keep Impact bullets prominent (gold accent kept).
- Sticky year label on desktop as you scroll the timeline.

## 04 — Skills (`SkillsSection.tsx`)
Current: mixed list + radar.

Moves:
- Replace with a **4-column proficiency matrix**: Data · ML/AI · Clinical · Tools.
- Each column: category label (mono, uppercase) + list of skills with a 5-dot proficiency indicator (terracotta filled / border empty).
- Keep the radar chart, but move it to a smaller "At a glance" card beside the matrix on desktop, hidden on mobile.
- Add a single "Currently learning" strip at the bottom (mono, marquee-free, static).

---

## Files touched
- `src/components/HeroSection.tsx` — recomposed
- `src/components/ProjectsSection.tsx` — new featured/secondary split, remove zigzag, chip filter
- `src/components/ExperienceSection.tsx` — timeline rail + entry restructure
- `src/components/SkillsSection.tsx` — matrix layout, radar demoted
- `src/pages/Index.tsx` — reorder so KPI strip sits directly under Hero (Marquee shifts down)
- No token, font, or color changes. No new dependencies.

## Out of scope
- Navbar, footer, contact band, chatbot — untouched.
- No copy rewrites beyond structural labels; existing translations preserved.

## Sequencing
1. Hero + Index reorder (fast, high visual impact)
2. Projects (biggest structural change)
3. Experience timeline
4. Skills matrix

Each step is independently shippable — you can stop after any one if you want to review before continuing.
