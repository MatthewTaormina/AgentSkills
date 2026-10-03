# Semantic Sectioning, Structure & Grouping

*Book Reference: Responsive Web Design with HTML5 and CSS (Fifth Edition) by Ben Frain — Chapter 2*

## 1. The Pragmatic Philosophy of Semantic Markup

* **Semantics Defined:** The branch of linguistics and logic concerned with meaning. In HTML, semantics means using tags that communicate the structural purpose of content to browsers, assistive technologies, and web crawlers.
* **The "div class='Sausages'" Dilemma:** To a browser, search crawler, or screen reader, `<div class="Header">` carries **no more inherent meaning than `<div class="Sausages">`**. Semantic elements replace arbitrary class conventions with standardized, machine-actionable meaning.
* **Pragmatism Over Perfection:** Choosing between `<section>` and `<div>`, or `<em>` and `<i>`, is rarely catastrophic. The critical imperative is to **eliminate `<div>` soup** and consistently prefer native semantic elements whenever their definition fits the content.

### The Three Specification Categories

1. **Sectioning Elements:** The broadest strokes of a document outline (`<main>`, `<section>`, `<nav>`, `<article>`, `<aside>`, `<header>`, `<footer>`).
2. **Grouping Elements:** Organizing blocks of content within sections (`<div>`, `<p>`, `<blockquote>`, `<figure>`, `<figcaption>`, `<details>`, `<summary>`).
3. **Interactive & Embedded Elements:** Self-contained widgets and media (`<dialog>`, `<video>`, `<audio>`, `<iframe>`).

---

## 2. Sectioning Elements (The Broad Strokes)

Sectioning elements establish the primary structural landmarks of a document.

| Element | Semantic Purpose & Authoring Rules | Specification Link |
| :--- | :--- | :--- |
| `<main>` | Represents the **dominant, unique content** of the document. Excludes repeated site-wide chrome (global headers, footers, search bars, global navigation).<br>**Hard Rules:** Exactly **one** `<main>` per document; never nest `<main>` inside `<article>`, `<aside>`, `<header>`, `<footer>`, or `<nav>`. | [WHATWG `<main>`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element) |
| `<section>` | Represents a distinct thematic grouping of content, typically introduced by a heading (`<h1>`–`<h6>`). Used for chapters, tab panels, contact modules, or distinct feature groups.<br>**Rule:** Never use purely for CSS styling or layout wrapping—use a `<div>` if there is no natural heading or thematic theme. | [WHATWG `<section>`](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) |
| `<nav>` | Wraps **major navigational link blocks** (e.g. primary site menu, breadcrumbs, table of contents). Not required for every small utility link cluster. May wrap `<a>` links directly without mandatory `<ul>`/`<li>` wrappers. | [WHATWG `<nav>`](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element) |
| `<article>` | Wraps a **self-contained, reusable piece of content** that makes sense syndicated or distributed independently (blog post, news article, interactive widget, card, forum comment).<br>**Rule:** When nested, inner `<article>` elements must relate directly to the parent article (e.g., user comments under a blog post). | [WHATWG `<article>`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) |
| `<aside>` | Contains content **tangentially related** to the primary content (sidebars, pull quotes, advertising clusters, related product links). It represents an informational relationship, not merely a visual layout sidebar. | [WHATWG `<aside>`](https://html.spec.whatwg.org/multipage/sections.html#the-aside-element) |
| `<header>` | Introductory container for a page, article, or section. Often houses branding, headings, or navigational aids. Can be used **multiple times** in a document; does not introduce an independent section in the outline algorithm. | [WHATWG `<header>`](https://html.spec.whatwg.org/multipage/sections.html#the-header-element) |
| `<footer>` | Concluding container for a document, article, or section. Houses author metadata, copyright notices, and secondary links.<br>**Rule:** Contact info for the author/owner should be nested inside an `<address>` element within the footer. | [WHATWG `<footer>`](https://html.spec.whatwg.org/multipage/sections.html#the-footer-element) |

---

## 3. Heading Hierarchy & Subheadings (`<h1>`–`<h6>`, `<hgroup>`)

### The Heading Hierarchy Rules

Assistive technology users routinely navigate documents by jumping between headings. Search engines also parse headings to construct document outlines and index relevancy.

1. **Presence:** Every page must contain at least one `<h1>` defining the primary subject.
2. **No Skipping:** Never skip heading levels downwards (e.g., jumping from `<h2>` directly to `<h4>`). Skipping creates broken hierarchies in accessibility trees.
3. **Visual ≠ Semantic:** Never select a heading tag because of its default visual font size. Choose the heading level that matches the structural outline, and adjust visual font sizes in CSS.

### Subheadings and the `<hgroup>` Element

Placing two consecutive headings (e.g. `<h1>Title</h1><h2>Subtitle</h2>`) creates an artificial child section in the outline with zero content. Choose one of two standard patterns:

#### Pattern A: Heading + Paragraph

```html
<header>
  <h1>Scones</h1>
  <p class="SubHeading">The most resplendent of snacks</p>
</header>
```

#### Pattern B: The `<hgroup>` Element (Best Practice)

Use `<hgroup>` to group an `<h1>`–`<h6>` element with supporting sub-headings, taglines, or paragraphs without polluting the document outline:

```html
<hgroup>
  <h1>Scones</h1>
  <p>The most resplendent of snacks</p>
</hgroup>
```

> [!NOTE]
> `<hgroup>` was briefly deprecated in earlier HTML5 drafts but has been **fully restored** in the WHATWG Living Standard and is widely supported by modern browsers and screen readers.

---

## 4. Grouping Elements (Wrapping Associated Content)

Grouping elements structure blocks of text, visuals, and widgets within sections.

### 1. The `<div>` Element

* **Semantic Weight:** Zero. An unopinionated generic container conveying no information to browsers or screen readers.
* **Usage Rule:** Use `<div>` **strictly as a last resort** when no semantic element applies—primarily as an unopinionated styling hook or flex/grid wrapper.

### 2. The `<p>` Element

* **Semantic Weight:** Represents a paragraph of running narrative text.
* **Usage Rule:** Always prefer `<p>` over `<div>` for general text because it explicitly signals textual content to assistive technology.

### 3. The `<blockquote>` Element

* Represents a section of text quoted from an external source.
* Can contain bare text or nested `<p>` elements for multi-paragraph quotations:

```html
<p>In *Responsive Web Design with HTML5 and CSS*, Ben Frain notes:</p>
<blockquote>
  <p>All this writing about scones in our sample page and there's no image of the beauties!
  I'm going to add in an image of a scone near the top of the page; a sort of 'hero' image
  to entice users to read the page.</p>
</blockquote>
```

### 4. Visual Media: `<figure>` and `<figcaption>`

* **`<figure>`:** Wraps self-contained visual media, illustrations, diagrams, or code listings referenced in the main flow.
* **`<figcaption>`:** Provides an optional textual caption or description directly associated with the `<figure>`.

```html
<figure class="MoneyShot">
  <img src="img/scones.jpg" alt="Incredible scones baked to perfection and ready to eat" />
  <figcaption>Incredible scones, picture from Wikipedia</figcaption>
</figure>
```

> [!IMPORTANT]
> **`alt` vs. `<figcaption>`:**
> * `alt`: **Mandatory** on every `<img>`. Crucial fallback text for screen readers or failed network loads.
> * `<figcaption>`: **Optional**. An editorial caption visible to all readers directly on the page.

### 5. Native Interactive Disclosure: `<details>` and `<summary>`

Native expand/collapse disclosure accordion **without requiring any JavaScript**:

```html
<details>
  <summary>I ate 15 scones in one day</summary>
  <p>Of course I didn't. It would probably kill me if I did. What a way to go. Mmmmm, scones!</p>
</details>

<!-- Displayed expanded by default -->
<details open>
  <summary>Recipe Notes</summary>
  <p>Always pre-heat your baking sheet before placing the dough.</p>
</details>
```

* **Keyboard Accessible:** Users can Tab to the `<summary>` and toggle open/closed using Space or Enter natively.
* **CSS Hook:** The boolean `open` attribute (`details[open]`) provides an immediate styling state selector.

---

## 5. Comprehensive Practical Case Study (*Scone O'Clock*)

The following production pattern integrates semantic sectioning and grouping elements into a cohesive, accessible article structure:

```html
<article class="Post">
  <!-- Article Header with Branding and Title -->
  <header class="PostHeader">
    <a href="/" class="LogoWrapper">
      <img src="img/SOC-Logo.png" alt="Scone O'Clock logo" />
    </a>
    <h1 class="Strap">Scones: The Most Resplendent of Snacks</h1>
  </header>

  <!-- Editorial Intro Section with Figure -->
  <section class="IntroWrapper">
    <p class="IntroText">
      Occasionally maligned and misunderstood, the scone is a quintessentially British classic.
    </p>
    <figure class="MoneyShot">
      <img
        class="MoneyShotImg"
        src="img/scones.jpg"
        alt="Incredible scones baked to perfection and ready to eat"
      />
      <figcaption class="ImageCaption">
        Incredible scones, picture from Wikipedia
      </figcaption>
    </figure>
  </section>

  <p>Recipe and serving suggestions follow.</p>

  <!-- Dedicated Sub-Sections -->
  <section class="Ingredients">
    <h2>Ingredients</h2>
    <ul>
      <li>500g plain white flour</li>
      <li>2 tsp baking powder</li>
      <li>80g butter, cubed</li>
    </ul>
  </section>

  <section class="HowToMake">
    <h2>Method</h2>
    <ol>
      <li>Preheat oven to 220°C (425°F / Gas 7).</li>
      <li>Rub butter into sifted flour and baking powder until breadcrumb texture.</li>
    </ol>
  </section>

  <!-- Article Footer with Dedicated Address Tag -->
  <footer class="PostFooter">
    <p>Made for the book, <a href="https://rwd.education">Responsive Web Design with HTML5 and CSS</a> by</p>
    <address><a href="https://benfrain.com">Ben Frain</a></address>
  </footer>
</article>
```

---

## Related References

* [HTML Boilerplate & Syntax](./html-boilerplate-and-syntax.md) — Minimal document shell, void tags, strict rules, and Unicode.
* [Native Dialogs & Modals](./native-dialogs-and-modals.md) — The `<dialog>` element, `showModal()`, focus trapping, and button gotchas.
* [Embedded & Fluid Media](./embedded-and-fluid-media.md) — Fluid images, `<video>`, `<audio>`, and `aspect-ratio` iframes.
* [Accessibility & Review Checklists](./accessibility-and-review-checklists.md) — WCAG standards, ARIA guidelines, and master checklist.
