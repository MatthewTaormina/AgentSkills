---
name: responsive-web-design
description: >-
  Authoritative guide on responsive web design, fluid layouts and media, media queries, and semantic
  HTML5 markup based on Ben Frain's "Responsive Web Design with HTML5 and CSS". Use when building or
  reviewing web pages, templates, or page layouts; writing HTML document boilerplate (doctype, lang,
  charset); choosing semantic sectioning, grouping, or interactive elements instead of div soup;
  adding the viewport meta tag; making images, video, audio, and iframe embeds fluid; setting
  content-driven rather than device-driven breakpoints; mobile-first progressive enhancement; native
  dialog, details, and heading structure; lazy loading and autoplay rules; or deciding browser
  support scope.
---

# Responsive Web Design & Semantic HTML

This skill provides an authoritative operational framework for responsive web design and standards-based HTML/CSS authoring, based on Ben Frain's *Responsive Web Design with HTML5 and CSS* (Fifth Edition), Chapter 1 "The Essentials of Responsive Web Design" (viewport, fluid media, media queries, breakpoints, browser-support economics) and Chapter 2 "Writing HTML Markup" (semantic structure, grouping and interactive elements, media embedding, native dialogs, accessibility foundations).

Agents must apply these rules whenever creating or modifying web pages, HTML templates, CSS layout, embedded media, or markup under review.

### Detailed References
* [Responsive Design Foundations and Breakpoints](./references/responsive-design-foundations-and-breakpoints.md) (*Chapter 1 — The Essentials of Responsive Web Design*)
* [Semantic HTML Markup and Media](./references/semantic-html-markup-and-media.md) (*Chapter 2 — Writing HTML Markup*)

> [!NOTE]
> **Regulatory and component-level accessibility compliance** (AODA, WCAG 2.1/2.2 Level AA criteria, live regions, contrast) is owned by the sibling `accessibility` skill. This skill covers the *markup and layout* foundations that make those criteria achievable in the first place.

---

## 1. What Responsive Web Design Actually Means

> **Responsive Web Design (RWD) is the presentation of web content in the most relevant format for the viewport, input type, and device/browser capabilities accessing it.**

RWD is not an optional feature or a nice-to-have polish pass. It is the *de facto* baseline standard of web development, and the default expectation for any page an agent writes.

### The Three Foundational Pillars (Ethan Marcotte, 2010)

```
                     RESPONSIVE WEB DESIGN
                              |
       +--------------------+--------------------+
       |                    |                    |
       v                    v                    v
+----------------+   +-----------------+   +----------------+
| 1. FLEXIBLE    |   | 2. FLEXIBLE     |   | 3. MEDIA       |
|    GRID        |   |    MEDIA        |   |    QUERIES     |
|----------------|   |-----------------|   |----------------|
| Proportional,  |   | Fluid images,   |   | Adapt layout   |
| fluid layout   |   | video, embeds;  |   | to viewport /  |
| structure      |   | never overflow  |   | device features|
|                |   | containers      |   |                |
+----------------+   +-----------------+   +----------------+
```

All three must be present. A page with media queries but fixed-width images is **not** responsive; a fluid grid with device-targeted breakpoints is fragile.

---

## 2. The Eight Core Rules (Operating Index)

| # | Rule | Failure it prevents |
| :--- | :--- | :--- |
| 1 | **Mobile-first via progressive enhancement** | Feature-stripped, broken small-screen layouts |
| 2 | **Design for an extreme device landscape** | Sub-4-inch and 40-inch ultrawide both breaking |
| 3 | **The web is inherently flexible by default** | Rigid fixed widths destroying native reflow |
| 4 | **Browser support is an economic decision** | Maintaining bespoke workarounds for negligible audiences |
| 5 | **Always declare the viewport meta tag** | Unreadable 980px shrunk-canvas mobile rendering |
| 6 | **`max-width: 100%` on media** | Horizontal scrollbars, logo blowup, clipped video |
| 7 | **Breakpoints are content-driven, never device-driven** | Fragile layouts keyed to hardware that ships once |
| 8 | **HTML is the bedrock** | Inaccessible, plugin-dependent, crawler-invisible pages |

---

## 3. Mobile-First Is Progressive Enhancement (Rules 1–3)

### Never scale down from desktop

Designing a complex desktop layout and stripping features away to squeeze it onto smaller screens is counterproductive. **Start small, build up**: establish a solid, accessible, functional experience for the smallest screens and least capable browsers first, then progressively add styling, layout complexity, and features as real estate and capability increase.

```
   BASELINE (no media query)          ENHANCEMENTS (min-width, ascending)
  ┌────────────────────────┐   ──▶   ┌──────────────────────────────────┐
  │ Semantic, accessible,  │         │ 40em+: two-column flow           │
  │ single-column, fully   │   ──▶   │ 60em+: sidebar, richer typography│
  │ functional HTML + core │         │ 80em+: multi-track grid, hover   │
  │ styles for ANY agent   │         │ (each layer adds, never removes) │
  └────────────────────────┘         └──────────────────────────────────┘
```

> **Bryan Rieger's Principle:** *"The absence of support for `@media` queries is in fact the first `@media` query."*
>
> Styles written **outside** any media query are the foundational baseline that must work on any screen and in the oldest browser. Media queries are reserved *solely* for introducing enhancements and structural reorganization as viewport width grows.

### The device landscape is extreme

Design spans sub-4-inch phones to 40-inch ultrawide monitors, plus tablets, consoles, and mixed input (touch, mouse, keyboard, screen reader). Current traffic context from the source (StatCounter): mobile **>60%**, desktop **~35%**, tablets **~2%** — weight mobile first, but never ignore either extreme.

### Flexibility is the default, not the goal

Unstyled HTML is naturally responsive: text reflows to fit any viewport. Layout problems almost always appear when fixed, rigid constraints (absolute widths) are applied on top of that native fluidity.

---

## 4. Browser Support Is an Economic Decision (Rule 4)

> [!IMPORTANT]
> **The Browser Support ROI Rule.** If the cost of developing and maintaining a custom workaround for browser *X* exceeds the revenue or benefit generated by the users on browser *X*, **do not build a solution for browser *X*.**

* **Your data trumps global data.** Global browser-share statistics are a guide; only the project's own analytics dictate support decisions.
* **Greenfield projects:** where no traffic history exists, define target audiences first and make informed demographic assumptions about devices and browser constraints *before* writing code.
* **Concede visual parity; guarantee functional parity.** Old browsers need not look pixel-perfect, but content must remain **functional and accessible**.

| Browser class | Examples | Behavior | Design implication |
| :--- | :--- | :--- | :--- |
| **Evergreen** | Chrome, Firefox, Edge | Auto-update every few weeks | Adopt modern CSS/standards quickly |
| **OS-tethered** | Safari / iOS | Locked to OS release cycles | Feature adoption lags for users on older hardware; keep fallbacks |

**Verify before relying on a feature:** check [caniuse.com](https://caniuse.com) rather than assuming support (and pair new features with a baseline path).

---

## 5. Viewport Mechanics (Rule 5)

### The Default Mobile Dilemma (the 980px canvas)

The **viewport** is strictly the rectangular area where content renders — it excludes browser chrome (URL bar, tabs, nav buttons, status bars).

By default — a convention started by Apple's Mobile Safari in 2007 — mobile browsers render an unconfigured page onto a virtual desktop canvas, traditionally **980px wide**, then shrink the whole page to fit the screen. The result is miniature, unreadable text and forced pinch-zoom.

### Always declare the viewport meta tag

In the `<head>` of **every** document:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

| Declaration | Effect |
| :--- | :--- |
| `width=device-width` | Viewport matches the device screen's independent pixel width, not a 980px canvas |
| `initial-scale=1.0` | 1:1 relationship between CSS pixels and device-independent pixels on load |

Originally a proprietary Apple addition rather than a formal W3C standard, it is now an essential *de facto* web standard.

---

## 6. Fluid Media (Rule 6)

Raw images have intrinsic dimensions. A 2000px-wide image on an unconstrained page overflows a ~400px phone viewport, producing horizontal scrollbars. Hardcoded pixel widths (e.g. `width: 402px`) fail the moment the device rotates to landscape (~874px).

### The Golden Rule of Fluid Images

```css
img {
  max-width: 100%;
}
```

* Scales **down** smoothly when the containing block is narrower than the intrinsic width.
* Never scales **beyond** 100% of native size, and never spills outside its container.
* The browser preserves the aspect ratio automatically, without distortion.

### `max-width: 100%` vs `width: 100%` — a critical distinction

| Property | Small container | Large container | Verdict |
| :--- | :--- | :--- | :--- |
| `max-width: 100%` | Shrinks proportionally | Stops at intrinsic size | **Safe default.** Preserves sharpness. |
| `width: 100%` | Shrinks proportionally | Stretches to fill container | **Logo blowup** — forces small logos/icons to full screen width: pixelation and distortion. |

### Video, audio, and embeds

```css
/* Fluid native video: omit hard width/height attributes in the markup */
video {
  max-width: 100%;
  height: auto;
}

/* Fluid iframe embeds (YouTube, Vimeo, Maps) — modern standard, not the
   padding-bottom: 56.25% hack; iframes do not preserve aspect ratio on their own */
.iframe-16-9 {
  aspect-ratio: 16 / 9;
  max-width: 100%;
  width: 100%;
}
```

`aspect-ratio` applies to any container, box, or interactive element — not only iframes.

### Codec fallbacks and playback rules

```html
<video controls preload="auto" loop poster="myVideoPoster.png">
  <source src="video/myVideo.webm" type="video/webm" />
  <source src="video/myVideo.mp4" type="video/mp4" />
  <!-- Fallback markup renders only in user agents without <video> support -->
  <p><b>Download Video:</b> <a href="video/myVideo.mp4">MP4 Format</a></p>
</video>
```

| Rule | Reason |
| :--- | :--- |
| `autoplay` **must** be paired with `muted` | Modern browsers block autoplay of audible media |
| `controls` required for a usable player UI | Without it, video shows a static freeze frame until scripted |
| Order `<source>` elements top-to-bottom | The browser plays the **first** format it understands and ignores the rest |
| Always declare `type` (MIME) on `<source>` | Browser decides playability without downloading headers or buffer |
| `preload="none"`/`"metadata"` on offscreen media | Saves bandwidth; `"auto"` preloads the whole file |
| `<audio>` shares `<video>` attributes but has no `width`, `height`, or `poster` | No visual viewport canvas |

### Native lazy loading

```html
<img src="img/scones-large.jpg" alt="A towering display of scones" loading="lazy" />
<iframe class="iframe-16-9" src="https://www.youtube.com/embed/NkFM-BI1tVwY"
        title="YouTube video player" loading="lazy" allowfullscreen></iframe>
```

`loading="lazy"` defers the request until the resource is near the visible viewport. Omitting it means `loading="eager"` (default browser behavior).

---

## 7. Media Queries & Content-Driven Breakpoints (Rule 7)

> A **breakpoint** is the point (usually a viewport width or height) at which a design **visibly breaks or degrades** and therefore needs CSS rules to adapt the layout.

> [!WARNING]
> **The Anti-Device Rule.** Add a breakpoint only when *your design* needs to change — **never to cater to a specific device model.** Targeting exactly 320px (iPhone) or 768px (iPad) is an antipattern: hardware changes constantly, so the design must stay agnostic to the viewport size accessing it.

**The correct heuristic:** slowly widen the browser window until the layout looks stretched, awkward, or unreadable. *That* is where the breakpoint belongs.

### Syntax anatomy

```css
@media screen and (min-width: 800px) {
  /* Enhanced styles applied only at 800px viewport width and above */
  .IntroWrapper {
    display: flex;
    gap: 0 20px;
    align-items: center;
  }
}
```

| Token | Meaning |
| :--- | :--- |
| `@media` | CSS directive introducing the conditional query |
| `screen` | Media type (often optional, but common) |
| `and` | Logical operator chaining conditions |
| `(min-width: 800px)` | Media feature expression; `min-width` enforces mobile-first, upward progression |

Applicable units: `px`, `em`, `rem`, `vw`, percentages. Specification: [W3C CSS Media Queries Level 3](https://www.w3.org/TR/css3-mediaqueries/) and [Level 4](https://dev.w3.org/csswg/mediaqueries-4/).

---

## 8. HTML Is the Bedrock (Rule 8)

HTML is not merely markup syntax — it is the **structural skeleton, accessibility foundation, and resilient core** of any interface. CSS and JavaScript are progressive enhancements applied *over* well-structured HTML.

* **Separation of concerns:** content can be delivered without CSS or JavaScript; it cannot be delivered human-friendly and machine-readable without HTML.
* **Semantics** means providing meaningful structural markup rather than generic wrappers. To a browser, crawler, or screen reader, `<div class="Header">` carries **no more meaning than `<div class="Sausages">`**. Semantic tags replace arbitrary class names with machine-actionable meaning.
* **Pragmatism over perfection:** choosing between `<section>` and `<div>`, or `<em>` and `<i>`, is rarely catastrophic. What matters is avoiding pure `<div>` soup and consistently preferring native semantic elements.

### The minimal standard document shell

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Web Page Structure</title>
  </head>
  <body>
    <!-- Content goes here -->
  </body>
</html>
```

| Piece | Why it is mandatory |
| :--- | :--- |
| `<!DOCTYPE html>` | Case-insensitive; forces modern **standards mode** instead of legacy quirks mode |
| `<html lang="en">` | Screen readers cannot apply correct pronunciation, pitch, or accent inflection without a declared language ([IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry)) |
| `<meta charset="utf-8" />` | Universal character encoding covering global alphabets, glyphs, and symbols |
| `<title>` | Identifies the document for tabs, history, bookmarks, and assistive tech |
| Baseline reference | [HTML5 Boilerplate](https://html5boilerplate.com) · living spec: [WHATWG HTML Standard](https://html.spec.whatwg.org/multipage/) |

### Strict authoring standard

Browsers parse *forgivingly* — unquoted attributes (`id=wrapper`), mixed casing (`SRc=`), and omitted `<head>` all "work." Professional markup does not exploit that laxity:

* Always close tags; always enclose attribute values in **double quotes**.
* Consistent lowercase element and attribute names.
* Keep the optional `/` on void tags if it aids clarity; it is legal to omit in HTML5.
* Drop redundant legacy `type` declarations (`type="text/css"` on `<link>`, `type="text/javascript"` on `<script>`).
* **Clarity trumps brevity** — minifiers strip redundant bytes in production; hand-obfuscated markup only costs readability.

---

## 9. Sectioning Elements (The Broad Strokes)

| Element | Purpose | Hard rule |
| :--- | :--- | :--- |
| `<main>` | The **dominant, unique** content of the document (excludes repeated site chrome: headers, global nav, footers, search banners) | **Exactly one per page**; never nested inside `<article>`, `<aside>`, `<header>`, `<footer>`, or `<nav>` |
| `<section>` | Thematic grouping of content, typically with a heading | Never purely for CSS/layout wrapping — use `<div>` if there is no natural heading |
| `<nav>` | **Major** navigational links (primary nav, table of contents) | Not required for every small link cluster; may wrap `<a>` directly without `<ul>`/`<li>` |
| `<article>` | **Self-contained**, reusable content that makes sense syndicated alone (post, news story, comment, card) | Nested `<article>`s must relate directly to the parent (e.g. comments on a post) |
| `<aside>` | Content **tangentially related** to surroundings (sidebars, pull quotes, cross-sell, ads) | Not a synonym for "visual sidebar" |
| `<header>` | Introductory container for page, article, or section (branding, heading, nav aids) | Usable **multiple times**; does not create a new section |
| `<footer>` | Closing container (author metadata, copyright, related links) | Author contact info belongs in `<address>` inside it |

### Headings: the document outline

Screen reader users navigate by jumping headings; search engines parse them for priority.

1. **Presence** — every page has at least one `<h1>`.
2. **No skipping** — never go `<h2>` → `<h4>`; gaps break hierarchy comprehension.
3. **Visual ≠ semantic** — never pick a level for its default font size; style sizes in CSS and keep levels accurate.

For a title plus subtitle, do **not** emit two consecutive heading tags (that fabricates an empty child section in the outline). Group them:

```html
<!-- Pattern A -->
<h1>Scones</h1>
<p>The most resplendent of snacks</p>

<!-- Pattern B: <hgroup>, for a heading with supporting sub-headings/taglines
     (deprecated in early HTML5 drafts, now fully restored in the living spec) -->
<hgroup>
  <h1>Scones</h1>
  <p>The most resplendent of snacks</p>
</hgroup>
```

---

## 10. Grouping, Media & Native Interactive Elements

| Element | Semantic weight / rule |
| :--- | :--- |
| `<div>` | **Zero** semantic weight. Last resort only — an unopinionated styling or scripting hook when no semantic element applies |
| `<p>` | Preferred over `<div>` for narrative text; explicitly signals textual content |
| `<blockquote>` | Text quoted from an external source; may wrap bare text or nested `<p>` for multi-paragraph quotes |
| `<figure>` / `<figcaption>` | Self-contained visual/callout unit (photo, diagram, code listing) with an optional visible editorial caption |
| `<details>` / `<summary>` | Native expand/collapse disclosure **without JavaScript**: `<summary>` is the toggle label; keyboard Tab + Space/Enter works for free; `<details open>` starts expanded |
| `<img>` `alt` | **Always required** — the fallback for screen readers and failed loads. Distinct from `<figcaption>`, which is optional and visible to everyone |

```html
<figure class="MoneyShot">
  <img src="img/scones.jpg" alt="Incredible scones baked to perfection and ready to eat" />
  <figcaption>Incredible scones, picture from Wikipedia</figcaption>
</figure>
```

### The HTML5 anchor: block-level wrapping

Pre-HTML5, linking a heading, paragraph, and image required duplicating anchors per element. HTML5 lets one `<a>` wrap compound blocks:

```html
<a href="index.html">
  <h2>The home page</h2>
  <p>This paragraph also links to the home page</p>
  <img src="home-image.png" alt="A rendering of the home page" />
</a>
```

> [!WARNING]
> **Boundaries:** never nest `<a>` inside `<a>`, never place an interactive element such as `<button>` inside `<a>`, and never wrap a `<form>` in `<a>`.

### The 14 void elements (no closing tag permitted)

`<area>` `<base>` `<br>` `<col>` `<embed>` `<hr>` `<img>` `<input>` `<link>` `<meta>` `<param>` `<source>` `<track>` `<wbr>` — these cannot contain children; the trailing slash is optional in HTML5 ([WHATWG void elements](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)).

### Native modals: `<dialog>` beats custom `<div>`

Hand-built `<div>` modals routinely ship broken accessibility (failed focus traps, background still interactive, no keyboard dismissal). `<dialog>` + `showModal()` gives the browser's native behavior for free:

| Built-in superpower | What it guarantees |
| :--- | :--- |
| Auto-centering, top-layer placement | Rendered above all regular `z-index` stacking |
| Inherent focus management | Focus moves inside on open |
| Inert background | Screen readers and keyboard users cannot reach underlying page |
| Native `Esc` dismissal | Closes with no custom listener |
| Auto `::backdrop` | Viewport-covering overlay pseudo-element, stylable |

```html
<button id="launchDialog" type="button">Where is the dialog?</button>
<p id="formResult"></p>

<dialog id="dialogEle">
  <form method="dialog">
    <h1>How about this? A native Dialog.</h1>
    <p>Only thing left to do is dismiss me.</p>
    <button value="Dismissed!">Dismiss Dialog</button>
  </form>
</dialog>
```

```js
const dialogEle = document.getElementById("dialogEle");
document.getElementById("launchDialog").addEventListener("click", () => {
  dialogEle.showModal(); // modal: backdrop + focus trap + blocks background + Esc
});
dialogEle.addEventListener("close", () => {
  document.getElementById("formResult").textContent = dialogEle.returnValue;
});
```

* `method="dialog"`: submitting closes the dialog and sets `returnValue` to the clicked submit button's `value`.
* `show()` is the **non-modal** variant: no backdrop, no focus trap, no blocking.
* The `open` boolean attribute is added automatically while active — a clean CSS hook.

> [!IMPORTANT]
> **The `type="button"` habit.** *"The default type of a button is submit... I recommend being in the habit of always adding `type="button"` whenever you use the `<button>` element."* — Ben Frain. A `<button>` inside any `<form>` or `<dialog>` without a declared type **will submit the form**.

---

## 11. Unicode in HTML vs CSS

| Representation | Environment | Syntax | Renders |
| :--- | :--- | :--- | :--- |
| Named entity | HTML | `&copy; 2025` | © 2025 |
| Decimal entity | HTML | `&#169; 2025` | © 2025 |
| Hexadecimal entity | HTML | `&#xA9; 2025` / `&#x00A9; 2025` (leading zeros optional) | © 2025 |
| CSS escape | CSS | `content: "\00A9 2025";` | © 2025 |

**The space-terminator rule:** in CSS escape sequences a space *immediately follows* the hex digits to terminate the sequence. To render a **visible** space after the glyph, write **two** spaces — the first terminates the escape, the second displays:

```css
/* First space terminates \00A9; second space renders visually */
body::after {
  content: "\00A9  copyright 2025";
}
```

References: [character entity list](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references) · [r12a conversion tool](https://r12a.github.io/app-conversion/).

---

## 12. Tooling Discipline and the Limits of AI

* **Editor agnosticism:** VS Code, Sublime, Vim, Nova — the editor does not dictate code quality; use what keeps you productive.
* **Standards first:** master native, standards-based HTML and CSS before binding understanding to proprietary frameworks or transient tools.
* **Tooling hierarchy:** formatters (Prettier) remove formatting friction → linters/validators catch syntax and oversight bugs → post-processors (PostCSS) automate prefixing and polyfills.
* **Validate** markup regularly with the [W3C Markup Validation Service](https://validator.w3.org/) to catch missing tags, omitted `alt`, and nesting errors.

### The "Master Builder" rule for AI-assisted frontend work

> [!CAUTION]
> **AI is an assistant, not an architect.** Treating AI as a junior developer means the human must act as the experienced master craftsman.
>
> * **The sniff test:** without strong foundational knowledge of HTML, CSS, and browser behavior you cannot reliably judge the quality, accessibility, performance, or maintainability of generated code.
> * **The temporal limitation:** LLMs are trained on historical data — they mine the past and cannot discover or adopt cutting-edge browser standards on their own. Never assume AI-generated CSS uses current best practice.
> * **Effective use:** scaffolding, boilerplate drafting, and syntax-variations testing — always subject to direct verification against current web platform standards.

---

## 13. Maturity Model: Baseline vs Best-of-Breed

| Level | Definition | Characteristics |
| :--- | :--- | :--- |
| **Baseline Responsive** | The bare minimum functional implementation | Viewport meta present; `max-width: 100%` on images; simple media-query layout shifts. Prevents horizontal overflow; lacks refined UX |
| **Best-of-Breed Responsive** | Production-grade, resilient, accessible design | Semantic HTML foundation; accessible markup; responsive typography; SVG vector assets; adaptive color schemes; fluid micro-interactions; responsive forms; container queries |

Aim every deliverable at Best-of-Breed; treat Baseline as the floor that must never be violated.

---

## 14. Practical Review Checklist

Before merging any front-end change or finishing a page-building task, verify against this checklist:

| Checkpoint | Test | Action if Violated |
| :--- | :--- | :--- |
| **Viewport declared** | Does every document ship `width=device-width, initial-scale=1.0`? | Add the meta tag to the `<head>` |
| **Mobile-first order** | Were styles written desktop-down (max-width stripping) instead of baseline-up? | Move baseline styles outside media queries; enhance with ascending `min-width` |
| **Media queries add only** | Does any media query *remove* functionality available at baseline? | Restore the baseline capability; enhance additively |
| **Fluid media** | Any `img`/`video`/`iframe` able to exceed its container, or `width: 100%` on small assets? | Apply `max-width: 100%`; reserve `width: 100%` for assets meant to fill |
| **Embed aspect ratio** | Is an iframe distorted or letterboxed, or still using the `padding-bottom` hack? | Use `aspect-ratio` (e.g. `16 / 9`) with `max-width: 100%` |
| **Content-driven breakpoints** | Does a breakpoint match a device model (320px / 768px) rather than where the design breaks? | Re-derive breakpoints by widening until the layout degrades |
| **Autoplay + muted** | Is `autoplay` present without `muted`? | Pair them, or drop autoplay — browsers block audible autoplay |
| **Codec fallbacks** | Single `src` with no `<source>` alternatives or missing `type` MIME? | Provide ordered `<source>` elements with explicit `type` |
| **Lazy loading** | Do offscreen images/iframes load eagerly on first paint? | Add `loading="lazy"` to below-the-fold media |
| **Document shell** | Missing `<!DOCTYPE html>`, `lang`, `charset`, or `<title>`? | Complete the boilerplate |
| **Semantic over generic** | Is there `<div>` soup where `<main>`/`<section>`/`<article>`/`<nav>`/`<aside>` applies? | Replace wrappers with sectioning elements; reserve `<div>` as last resort |
| **One `<main>`** | Multiple `<main>` elements, or `<main>` nested inside `<article>`/`<nav>`/`<header>`/`<footer>`/`<aside>`? | Keep exactly one, at the correct nesting level |
| **Heading integrity** | No `<h1>`, skipped levels (`h2` → `h4`), or a level chosen for its font size? | Repair the outline; restyle sizes in CSS; group subtitles with `<hgroup>` |
| **`alt` everywhere** | Any `<img>` without `alt`, or `alt` used where a visible `<figcaption>` was meant? | Add meaningful `alt`; pair captioned visuals with `<figure>`/`<figcaption>` |
| **Anchor boundaries** | Nested `<a>`, a `<button>` inside `<a>`, or a `<form>` wrapped by `<a>`? | Restructure; one HTML5 anchor may wrap blocks but never another interactive element |
| **Void elements** | Closing tag on any of the 14 void elements? | Remove the closing tag |
| **Native widgets over scripts** | Custom JS accordion/modal reimplementing `<details>` or `<dialog>`? | Use native `<details>/<summary>` and `showModal()` for free focus, keyboard, and inert-background behavior |
| **Modal accessibility** | `<div>`-based modal without a focus trap, Esc handling, or inert background? | Migrate to `<dialog>` with `::backdrop` |
| **Button discipline** | `<button>` inside a `<form>`/`<dialog>` without an explicit type? | Add `type="button"` unless submission is intended |
| **CSS Unicode escapes** | Escape sequence run together with following text, or missing visible spacing? | Terminate hex with a space; use two spaces for a visible gap |
| **Support scope justified** | Bespoke workaround maintained for a browser with negligible measured traffic? | Apply the ROI rule; concede visual parity, keep functional parity |
| **Feature support verified** | Modern CSS used without a caniuse check or baseline fallback? | Verify support; provide a functional baseline path |
| **Markup validated** | Has the W3C validator not been run on new or edited markup? | Validate and fix errors before merging |
| **AI output verified** | Was generated markup accepted without review against current standards? | Re-audit semantics, a11y, performance, and modern CSS support |
