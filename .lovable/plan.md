
# Portfolio Refinement Plan

Scope: 3/5 — meaningful restructure + aesthetic evolution, without a full rebuild. Existing components, routes, MCP setup, chatbot, and bilingual support stay intact.

---

## 1. Section consolidation (homepage)

Current homepage stacks 15 sections. Trim to a tighter narrative of ~9:

```text
Hero
MarqueeStrip
About  (merge StorySection + AboutSection + ChallengeSolutionSection)
Services + HowIWork  (merge into one "Services & Process")
ImpactStrip
Projects  (case studies — hero of the page)
GitHub Repos  (secondary, collapsed by default)
Experience + Career Timeline  (merge into one unified timeline)
Education + Skills  (side-by-side in one section)
Footer/CTA
```

Remove: `RepoHealthBadgeSection` (duplicates GitHub grid signal), `ChallengeSolutionSection` (folds into About), standalone `CareerTimeline` (merged with Experience).

Files touched: `src/pages/Index.tsx`, plus the merged section components. Old components stay on disk but are unimported (safe to delete after review).

## 2. Aesthetic evolution

Keep the midnight-navy base but evolve away from the generic "cyan-on-dark tech" look toward a more editorial, distinctive direction. I'll use `design--create_directions` to render 3 rendered previews of the new hero + case study card (screenshot-based), then let you pick one. Direction will only touch design tokens in `src/index.css` + typography in `tailwind.config.ts`; component structure stays the same so the pick applies globally.

Locked constraints across all 3 directions: dark base, bilingual/RTL safe, WCAG AA contrast, keeps LiquidEther-friendly background.

## 3. Content & copy sharpening

- **Hero**: tighten headline to one line + one subline; remove redundant tagline duplication.
- **About**: single 3-paragraph story (origin → pivot → present) instead of three overlapping sections.
- **Case studies**: rewrite each to the same 5-beat structure — Context · Role · Approach · Impact (with a headline KPI) · Stack. RehabRL stays #1.
- **Services**: 3 crisp offerings with a one-line outcome each (no feature soup).
- Update `src/contexts/LanguageContext.tsx` EN + AR in lockstep.

## 4. Case studies depth

- Promote Projects visually: larger cards, one "headline KPI" per project rendered oversized, GitHub link + live demo link where available.
- Add a compact "Selected Work" index at the top of the section (jump links).
- Pull real repo metadata (stars, last updated) into RehabRL card from the existing GitHub fetch.

## 5. Performance & SEO

- Lazy-load below-the-fold sections (`GitHubReposSection`, `Projects` details, `AIChatbot`) via `React.lazy` + `Suspense`.
- Memoize `LIQUID_COLORS` confirm; drop unused imports in `Index.tsx` (`Phone`, `useState`, `useEffect`).
- Per-route head with `react-helmet-async` on `/`, `/recruiter`, `/admin/chat-logs`, `/login` — unique title + description + canonical + og:url.
- Add `Person` + `WebSite` JSON-LD sitewide (Person already exists — verify), plus `BreadcrumbList` on `/recruiter`.
- Update `public/sitemap.xml` with all public routes + lastmod.
- Trigger an SEO rescan at the end.

## 6. Order of execution

1. Ask design directions (Section 2) — you pick before I code the aesthetic.
2. Consolidate sections (Section 1).
3. Rewrite copy in `LanguageContext.tsx` (Section 3).
4. Rebuild Projects section (Section 4).
5. Apply chosen design tokens (Section 2 pick).
6. Perf + SEO pass (Section 5).
7. Playwright smoke on desktop + mobile; SEO rescan.

## Out of scope

- MCP server, chatbot logic, auth, admin dashboard, Supabase schema — untouched.
- No new backend tables or edge functions.
- No custom domain / publishing changes.

## Technical notes

- Deleted-from-index components will be removed from disk in a follow-up cleanup pass once you confirm nothing is missing.
- All color changes go through `src/index.css` HSL tokens — no hardcoded hex in components.
- Bilingual parity: every new/edited key added to both `en` and `ar` maps in the same edit.
