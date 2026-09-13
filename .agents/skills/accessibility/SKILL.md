---
name: accessibility
description: >-
  Authoritative guide and standards for AODA (Accessibility for Ontarians with Disabilities Act)
  and WCAG 2.1/2.2 Level AA compliance across all UI components, dialogs, forms, and desktop application windows.
  Use when creating or modifying UI templates, CSS, interactive controls, keyboard navigation, and screen reader announcements.
---

# AODA & WCAG Digital Accessibility Standards Guide

This skill provides mandatory architectural, design, and implementation standards for achieving and maintaining compliance with the **Accessibility for Ontarians with Disabilities Act, 2005 (AODA)** and its underlying regulations across all UI components and applications.

---

## 1. Legal and Regulatory Framework

### 1.1 The Statute and Regulation
* **Statutory Basis**: *Accessibility for Ontarians with Disabilities Act, 2005*, S.O. 2005, c. 11.
* **Governing Regulation**: *Integrated Accessibility Standards Regulation (IASR)*, **Ontario Regulation 191/11**, Part II: *Information and Communications Standards*.
* **Core Mandate (Section 14 - Accessible Websites and Web Content)**:
  - Obligated organizations must ensure internet websites and web content conform to the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (**WCAG 2.0 Level AA**).
  - Statutory exception noted in Section 14(1): Success criteria 1.2.4 (*Captions Live*) and 1.2.5 (*Audio Description Prerecorded*) are exempted under the minimum regulation, but all other Level A and Level AA criteria are strictly required.
* **Modern Best Practice (Standards Development Committee Recommendations)**:
  - While WCAG 2.0 Level AA is the statutory minimum in O. Reg. 191/11, the Ontario Standards Development Committee and modern digital accessibility standards mandate implementing **WCAG 2.1 and WCAG 2.2 Level AA** to properly support mobile, cognitive, low vision, and motor disabilities (such as target size, non-text contrast, focus appearance, and status messages).

---

## 2. Core Principles: The POUR Framework

Every UI element and workflow must satisfy the four foundational WCAG principles:
1. **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive (not relying exclusively on color, shape, or sound).
2. **Operable**: User interface components and navigation must be operable via keyboard, switch devices, and touch without trapping focus.
3. **Understandable**: Information and the operation of the user interface must be understandable (clear error messages, obvious input states, predictable navigation).
4. **Robust**: Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies (NVDA, VoiceOver, JAWS).

---

## 3. Statutory & Technical Criteria Mapping

| WCAG Criterion | Level | AODA / IASR Scope | Implementation Requirement in Cobalt |
|---|---|---|---|
| **1.3.1 Info and Relationships** | A | Mandatory (Sec. 14) | Semantic HTML (`<label>`, `<button>`, `<fieldset>`, ARIA roles) |
| **1.4.1 Use of Color** | A | Mandatory (Sec. 14) | Statuses (Active, Disabled, Error) never rely on color alone |
| **1.4.3 Contrast (Minimum)** | AA | Mandatory (Sec. 14) | Text contrast >= 4.5:1 for normal text, >= 3:1 for large text |
| **1.4.11 Non-Text Contrast** | AA | WCAG 2.1 Extension | UI borders, icons, and focus rings >= 3:1 against adjacent surfaces |
| **2.1.1 Keyboard** | A | Mandatory (Sec. 14) | 100% of controls operable via Tab, Enter, Space, Escape |
| **2.1.2 No Keyboard Trap** | A | Mandatory (Sec. 14) | Focus never trapped; modals close cleanly on Escape |
| **2.4.3 Focus Order** | A | Mandatory (Sec. 14) | Logical reading and Tab sequence |
| **2.4.7 Focus Visible** | AA | Mandatory (Sec. 14) | Unambiguous, prominent outline on focused elements (`:focus-visible`) |
| **2.5.3 Label in Name** | A | WCAG 2.1 Extension | Accessible name matches or contains visible text label |
| **2.5.8 Target Size (Minimum)** | AA | WCAG 2.2 Extension | Interactive targets at least 24x24 CSS pixels |
| **4.1.2 Name, Role, Value** | A | Mandatory (Sec. 14) | ARIA states (`aria-expanded`, `aria-checked`, `aria-controls`) |
| **4.1.3 Status Messages** | AA | WCAG 2.1 Extension | Asynchronous feedback announced via `role="status"` and `aria-live="polite"` |

---

## 4. Mandatory UI Component Standards

### 2.1 Interactive Controls & Keyboard Operability (WCAG 2.1.1, 2.1.2)
* **No Mouse-Only Actions**: Every click action must be operable via keyboard (`Enter` and/or `Space` for buttons/toggles, arrows for lists/selects, `Escape` for dismissals).
* **Native Elements First**: Always prefer native `<button>`, `<input>`, `<select>`, `<dialog>`, and `<a>` elements before using custom `<div>` or `<span>` elements with `role=""`.
* **Keyboard Focus Indicators (WCAG 2.4.7)**:
  - Every focusable element must have a prominent, visible focus outline when navigated via keyboard (`:focus-visible`).
  - Outline contrast against adjacent colors must be at least **3:1**.
  - Never set `outline: none` without providing an equivalent visible focus ring.
* **No Keyboard Traps (WCAG 2.1.2)**: Focus must never be trapped indefinitely within a component. Modals and popovers must release focus upon `Escape` or dismissal.

### 2.2 Collapsible Cards & Accordions (WAI-ARIA Pattern)
When implementing collapsible cards or accordion sections:
* The trigger header must be a native `<button>` or have `role="button"` with `tabindex="0"`.
* Must explicitly specify `aria-expanded="true"` or `aria-expanded="false"`.
* Must specify `aria-controls="[content-id]"` referencing the collapsible container's ID.
* The expandable content region must have `id="[content-id]"` and `role="region"` with `aria-labelledby="[button-id]"`.
* Nested interactive elements (such as toggle switches or delete buttons) must stop click propagation (`event.stopPropagation()`) so activating the child does not accidentally trigger the parent accordion.

### 2.3 Form Controls & Accessible Labeling (WCAG 1.3.1, 3.3.2, 4.1.2)
* **Explicit Association**: Every form input (`<input>`, `<select>`, `<textarea>`) must have an associated `<label for="[input-id]">` or explicit `aria-label` / `aria-labelledby`.
* **Accessible Names for Icon Buttons**: Buttons containing only SVGs or icons must have an `aria-label` (e.g. `aria-label="Toggle password visibility"` or `aria-label="Remove provider"`).
* **Password Visibility Toggles**: Must convey state using `aria-pressed="true|false"` or descriptive `aria-label` ("Show API key" vs "Hide API key").
* **Toggle Switches**: Checkbox switches must use native `<input type="checkbox">` with an accessible name, or `role="switch"` with `aria-checked="true|false"`.

### 2.4 Visual Presentation & Color Contrast (WCAG 1.4.3, 1.4.11)
* **Text Contrast**: Normal text must achieve a contrast ratio of at least **4.5:1** against its background. Large text (>=18pt or >=14pt bold) must achieve at least **3:1**.
* **UI Component & Border Contrast**: Boundaries and state indicators of interactive controls must achieve at least **3:1** against adjacent backgrounds.
* **Never Rely on Color Alone (WCAG 1.4.1)**: Statuses like "Active", "Disabled", or "Error" must combine color with distinct icons or explicit text labels.

### 2.5 Live Regions & Dynamic Announcements (WCAG 4.1.3)
* Asynchronous status changes (e.g., "Testing connection...", "Connected successfully", "Error saving settings") must use `aria-live="polite"` and `role="status"` so screen readers announce results without interrupting active speech.

### 2.6 Motion & Animation (WCAG 2.3.3)
* All animations and transitions must respect `prefers-reduced-motion: reduce` and the application's `reduceMotion` user setting (`data-reduce-motion="true"`):
  ```css
  [data-reduce-motion="true"] *,
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 5. AODA Compliance Verification Checklist

Before finalizing any UI changes, verify each item:
- [ ] Can every feature and card be navigated and operated using **Tab**, **Shift+Tab**, **Enter**, and **Space**?
- [ ] Is there a clear, high-contrast `:focus-visible` ring on every focused control?
- [ ] Do collapsible sections report correct `aria-expanded` and `aria-controls` states?
- [ ] Do all text inputs, selects, and checkboxes have programmatic labels?
- [ ] Do icon-only buttons include descriptive `aria-label` attributes?
- [ ] Are async status messages announced with `aria-live="polite"`?
- [ ] Does text meet 4.5:1 contrast in both Dark and Light themes?
- [ ] Are animations completely suppressed when `reduceMotion` is active?
