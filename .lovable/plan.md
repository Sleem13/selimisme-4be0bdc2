# Recruiter-Friendly Refinement Plan

Recruiters spend ~30 seconds on a portfolio. Every scroll must answer: *who, what, proof, contact*. These changes make that path frictionless without touching the Clinical Noir aesthetic we just committed to.

## 1. Hero — answer "who + what" in one glance
- Add a **one-line role headline** above the name: `Data Analyst · ML Engineer · Healthcare Domain`.
- Replace the typed `Healthca…` fragment with a **static, complete tagline** (typing animation slows recruiters and reads as decorative).
- Add an **availability chip** (`● Open to opportunities · Cairo / Remote`) directly under the name.
- Add a **3-metric strip** inline in the hero: `300+ patients · 15% efficiency gain · 22% faster recovery ID` — proof visible before any scroll.
- Reorder CTAs: **Download CV** (primary) → **Contact** → **LinkedIn** (new tertiary ghost button).

## 2. Sticky recruiter action bar
- Add a **slim sticky bar** that appears after scrolling past the hero:
  `Mohamed Seliem — Data Analyst · [Download CV] [Email] [LinkedIn]`
- Always-visible CTAs remove the "scroll back to top" friction.

## 3. Above-the-fold "Recruiter Snapshot" band
- New compact section right after the hero (replaces the current decorative marquee for recruiters):
  - **Role fit**: Data Analyst / ML Engineer / Healthcare Analytics
  - **Stack**: Python · SQL · Power BI · scikit-learn · Pandas
  - **Location**: Cairo, Egypt · Open to remote/hybrid
  - **Notice period / Availability**: Immediate
  - **Languages**: English (Professional) · Arabic (Native)
- One-line each. No animation. Print-friendly.

## 4. Projects — lead with outcome, not narrative
- For each case study card, promote the **impact KPI to the top** (oversized number + one-line outcome) before the description.
- Add a **"Tech" row** (chip list) and a **"Role" line** (`Lead Analyst · 3 months`) on every card.
- Keep the deep narrative but collapse Context/Challenge/Approach/Learnings behind a **"Read case study"** disclosure so the grid stays scannable.

## 5. Experience — swap prose for scannable bullets
- Convert each experience block's Challenge/Solution/Impact paragraphs to **3 bullet points max**, each starting with a verb + metric where possible.
- Keep the timeline visual, but tighten each card's vertical height ~30%.

## 6. Contact band — reduce friction
- Add a **"Copy email"** button next to the mailto link (recruiters often work from ATS tabs).
- Add **response-time expectation** (`Replies within 24h`) as a small caption — already present, make it more prominent.
- Add a **`/recruiter` deep link** that opens the existing `RecruiterOnePager` route in a new tab, surfaced from the sticky bar and contact card.

## 7. SEO / discoverability polish
- Update `<title>` to lead with role: `Mohamed Seliem — Data Analyst & ML Engineer (Healthcare)`.
- Add `JobTitle` and `knowsAbout` fields to the existing Person JSON-LD.
- Ensure the hero H1 contains the role keywords (currently just the name).

## 8. Small quality-of-life
- Add **keyboard focus rings** on all CTAs (currently muted).
- Ensure **all external links** open with `rel="noopener noreferrer"` (audit pass).
- Add a **"Last updated: <month year>"** line in the footer — signals an active candidate.

## Out of scope
- No new backend, no form submissions, no auth changes.
- No aesthetic shift — Clinical Noir palette/typography stays.
- No removal of existing sections beyond the disclosure collapse on project narratives.

## Technical touchpoints
- `src/components/HeroSection.tsx` — headline, availability chip, metric strip, CTA reorder
- New `src/components/StickyRecruiterBar.tsx` — appears on scroll past hero
- New `src/components/RecruiterSnapshot.tsx` — replaces `MarqueeStrip` position for recruiter mode (keep marquee lower)
- `src/components/ProjectsSection.tsx` — KPI-first card layout + disclosure
- `src/components/ExperienceSection.tsx` — bullet conversion
- `src/pages/Index.tsx` — CTA band copy button + `/recruiter` link
- `src/contexts/LanguageContext.tsx` — new copy keys (EN + AR)
- `index.html` — title + JSON-LD update

## Ask before I build
Which subset do you want first? Options:
1. **All of it** (bigger change, ~30 min work)
2. **Hero + Sticky bar + Snapshot** (highest impact for the 30-second scan)
3. **Projects + Experience scannability** (better for recruiters who do read)
4. **Just the SEO + JSON-LD + title** (fast, invisible-but-critical)
