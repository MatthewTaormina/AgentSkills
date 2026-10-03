# Responsive Web Design Reference Library

Authoritative, modular reference guides for responsive web design and standards-based HTML5/CSS authoring, based on Ben Frain's *Responsive Web Design with HTML5 and CSS* (Fifth Edition).

## Reference Directory

| Guide | Primary Topics Covered |
| :--- | :--- |
| **[1. Foundations & Browser Support Strategy](./foundations-and-browser-support.md)** | Core RWD definition, Ethan Marcotte's 3 Pillars, progressive enhancement, Bryan Rieger's principle, device landscape, Browser Support ROI Rule, evergreen vs OS-tethered browsers, maturity model, and the AI "Master Builder" rule. |
| **[2. Viewport Mechanics & Media Queries](./viewport-and-media-queries.md)** | Viewport definition, 980px mobile canvas dilemma, `<meta name="viewport">` declaration, content-driven breakpoints vs device targeting (Anti-Device Rule), Bryan Rieger base styles, media query syntax anatomy, and Level 4 range syntax. |
| **[3. HTML Boilerplate, Syntax & Foundations](./html-boilerplate-and-syntax.md)** | Role of HTML, standard minimal document template (`<!DOCTYPE html>`, `<html lang>`, `<meta charset>`), strict authoring discipline, 14 void elements, HTML5 block-level anchor (`<a>`) revolution, and Unicode handling in HTML and CSS (space-terminator rule). |
| **[4. Semantic Sectioning, Structure & Grouping](./semantic-sectioning-and-structure.md)** | Semantic philosophy (`<div class="Sausages">`), sectioning tags (`<main>`, `<section>`, `<nav>`, `<article>`, `<aside>`, `<header>`, `<footer>`), heading hierarchy & `<hgroup>`, grouping elements (`<div>`, `<p>`, `<blockquote>`, `<figure>`/`<figcaption>`, `<details>`/`<summary>`), and the *Scone O'Clock* practical layout case study. |
| **[5. Embedded & Fluid Media](./embedded-and-fluid-media.md)** | Fluid images Golden Rule (`max-width: 100%`), `max-width: 100%` vs `width: 100%` (preventing logo blowup), native `<video>` & `<audio>`, ordered multi-codec `<source>` with MIME types, responsive local video, modern CSS `aspect-ratio: 16 / 9` for `<iframe>` embeds, and native `loading="lazy"`. |
| **[6. Native Popups & Modals: The `<dialog>` Element](./native-dialogs-and-modals.md)** | Solving accessibility failures of custom `<div>` modals, built-in superpowers of `showModal()` (top-layer placement, focus trapping, inert background, Esc dismissal, auto `::backdrop`), `<form method="dialog">`, CSS backdrop animation, and the critical button `type="button"` gotcha. |
| **[7. Accessibility Standards & Review Checklists](./accessibility-and-review-checklists.md)** | Semantic HTML as accessibility bedrock, WCAG conformance tiers (Level A, AA, AAA), WAI-ARIA guidelines & First Rule of ARIA, accessibility testing tools (NVDA, Axe, DevTools), rwd.education layout blueprint, and the master 25-point pre-merge review checklist. |
