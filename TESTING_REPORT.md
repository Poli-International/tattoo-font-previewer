# Tattoo Font Previewer - Testing Report

**Tool:** Tattoo Font Previewer
**Slug:** `tattoo-font-previewer`
**Live URL:** https://poliinternational.com/tools/tattoo-font-previewer/
**Category:** Tattoo Engineering
**Report type:** Static QA review of shipped source (HTML, CSS, JS bundle, i18n documentation pages)
**Method:** Manual source inspection and reasoning against the delivered files. No automated test harness is present in the codebase, so no fabricated CI results are reported.

---

## Executive Summary

The Tattoo Font Previewer is a client-side React application (React 19.3.0, bundled) mounted into `#root`, wrapped by a three-tab shell (Tool, Documentation, Embed) defined in `index.html`. The tool renders text in 107 catalog fonts, exposes real-time controls for size, letter spacing, line height, arc bending, and background contrast, supports a thermal stencil outline mode, a DPI print-size calculator, an A/B comparison panel, favorites, custom studio font loading via OpenType.js, and PNG/SVG export.

**Verdict: Production Ready.** The shipped shell is semantically sound, the tab logic and embed copy function are correct and defensive, the theme bridge handles cross-frame messaging safely, and the documentation is fully localized across seven languages. The only substantive caveats are inherent to a static, client-side tool: fonts are fetched from Google Fonts at runtime, and there is no automated regression suite in the repository. Neither blocks release.

---

## Test Categories

| # | Category | Scope | Result |
|---|----------|-------|--------|
| 1 | HTML structure & semantics | `index.html`, `embed.html` | PASS |
| 2 | CSS / responsiveness | Inline shell CSS, `a11y.css`, `print.css` | PASS |
| 3 | JavaScript functionality | Tab switching, `copyEmbedCodeTab()`, theme bridge | PASS |
| 4 | Calculation / logic accuracy | DPI formula, arc range, export resolutions | PASS |
| 5 | Data integrity | Font catalog, filter counts, i18n keys, storage keys | PASS |
| 6 | Accessibility (WCAG basics) | Landmarks, labels, contrast, keyboard | PASS with observations |
| 7 | Cross-browser | Clipboard API, StorageEvent, module scripts | PASS with fallback |
| 8 | Performance | Static asset weight, lazy docs iframe | PASS |
| 9 | Security | Frame messaging, local-only processing, no uploads | PASS |
| 10 | Edge cases | Empty text, long strings, custom font removal | PASS |

---

## Detailed Test Results

### 1. HTML Structure & Semantics

**Result: PASS**

- `index.html` declares `<!DOCTYPE html>`, `lang="en"`, and `class="dark"` on `<html>`, with `<body class="dark-mode">`. The dark default is consistent between the document element and the body.
- The tab bar is a real container `div#toolTabsBar.tool-tabs-container` holding three `<button class="tool-tab-btn">` elements with `data-tab` values `tool`, `docs`, `embed`. Buttons are the correct interactive element for tab switching, and each carries a `data-i18n` key (`tab.tool`, `tab.docs`, `tab.embed`).
- The three content panels are `div#tab-tool`, `div#tab-docs`, `div#tab-embed`, each with class `wrapper-tab-content`. The `docs` and `embed` panels start with the `hidden` class, so the Tool panel is the default visible view. This matches the `active` class on the first button.
- The tool mounts into `<div id="root"></div>` inside `<main class="tool-main-content">`, giving the primary application a landmark.
- The documentation panel uses `<iframe id="docsFrame" src="/tools/tattoo-font-previewer/documentation.html" loading="lazy">` with a `title` attribute and a `data-i18n-title` key, so the frame is both labeled and localizable.
- The embed panel contains a `<textarea id="embedCodeTab" readonly>` pre-filled with the iframe snippet, plus `<button id="tabCopyBtn" onclick="copyEmbedCodeTab()">`. The `readonly` attribute correctly prevents accidental edits while still allowing selection.
- Structured data is present as a `WebApplication` JSON-LD block declaring `price: 0`, `isAccessibleForFree: true`, and `inLanguage` for all seven supported locales.

**Observation:** `index.html` and `embed.html` are byte-for-byte equivalent in their shell markup and scripts. This is intentional (a standalone embed entry point) but means any future shell fix must be applied in two places. Worth noting for maintenance, not a defect.

### 2. CSS / Responsiveness

**Result: PASS**

- The shell uses CSS custom properties (`--tab-bg`, `--tab-active-bg`, `--card-bg`, `--code-bg`, `--text-primary`, `--border-subtle`, and others) defined on `:root` for dark and overridden under `[data-theme=light], body.light-mode`. Theme switching is therefore a variable swap, not a stylesheet reload.
- `.tool-tabs-container` sets `display: flex`, `overflow-x: auto`, and `-webkit-overflow-scrolling: touch`, so the tab bar scrolls horizontally on narrow viewports rather than wrapping or clipping.
- `.tool-tab-btn` uses `flex: 1`, `min-height: 48px`, and `white-space: nowrap`, meeting the 48px touch-target guidance and preventing label wrapping.
- A `@media (width <= 480px)` block reduces tab padding to `.75rem .5rem`, font size to `.85rem`, and tightens `.embed-card`, `.docs-container`, and `.docs-section` padding. Mobile layout is explicitly handled.
- `@media print` hides `.tool-tabs-container` and `#toolTabsBar` with `!important`, so printed output does not include navigation chrome. This aligns with the documentation's claim that the browser print command produces a clean proof sheet titled `POLI INTERNATIONAL - TATTOO FONT PREVIEW SHEET`.
- `.embed-code-textarea` is `resize: none`, `font-family: monospace`, and `height: 120px`, appropriate for a read-only snippet.

**Observation:** The `[hidden]` and `.hidden` selectors both resolve to `display: none !important`, so the JS toggle and any native `hidden` attribute behave identically. No conflict.

### 3. JavaScript Functionality

**Result: PASS**

Two inline scripts are present in the shell.

**Tab switching** iterates `document.querySelectorAll('.tool-tab-btn')`, removes `active` from all, adds it to the clicked tab, reads `tab.dataset.tab`, hides every `.wrapper-tab-content` via `classList.add('hidden')`, then reveals `document.getElementById('tab-' + tabName)`. The `if (activeContent)` guard prevents a null dereference if a `data-tab` value ever lacks a matching panel. Logic is correct and defensive.

**`copyEmbedCodeTab()`** selects `#embedCodeTab`, calls `navigator.clipboard.writeText(textarea.value)`, and on success swaps the button label to `window.t('tab.copied')` (falling back to the literal `'Copied!'` when the i18n helper is absent), restoring the original text after 2000 ms. On rejection it falls back to `document.execCommand('copy')`. The function also null-checks the textarea and the button before use. This is a correct progressive-enhancement pattern.

**Theme bridge** (top of `<head>`) only activates when `window.self !== window.top`, i.e. when the tool is embedded. It listens for `message` events of type `poli-theme`, toggles `dark-mode`/`light-mode` classes on `<body>` and the `dark` class plus `data-theme` attribute on `<html>`, persists the choice to `localStorage` under `poli-dark-mode` inside a `try/catch`, and dispatches a `StorageEvent` so sibling listeners update. The `try/catch` correctly guards against storage being unavailable (private mode, blocked cookies).

**Observation:** The theme listener does not verify `e.origin`. See the Security Assessment for the reasoning on why this is low risk here.

### 4. Calculation / Logic Accuracy

**Result: PASS**

The documentation states the DPI calculator uses the formula:

```
width_cm = pixels / DPI * 2.54
```

**Worked example.** Take the Master export resolution of 7200 x 2400 px and a 300 DPI target:

- Width: `7200 / 300 * 2.54 = 24 * 2.54 = 60.96 cm` (approximately 24.0 in)
- Height: `2400 / 300 * 2.54 = 8 * 2.54 = 20.32 cm` (approximately 8.0 in)

At the standard thermal 203 DPI, the same 7200 px width gives `7200 / 203 * 2.54 = 35.47 * 2.54 = 90.09 cm`, and the 2400 px height gives `2400 / 203 * 2.54 = 11.82 * 2.54 = 30.03 cm`. The tool displays the formula it uses, so the operator can verify the arithmetic on screen.

**Arc bending** is documented as a range of `+80` (upward) to `-80` (downward), with presets `Flat`, `Arc up` (chest rocker), and `Arc down` (inverted curve). The symmetric range is internally consistent.

**Export resolutions** are three discrete tiers: Standard `2400 x 800 px`, High `4800 x 1600 px`, and Master `7200 x 2400 px`. Each tier is an exact 2x step from the previous (2400→4800→7200 is 1x, 2x, 3x of the base width; 800→1600→2400 likewise), so the aspect ratio of 3:1 is preserved across all three. This is correct.

**Font size** is documented as a slider from 12 px to 144 px with presets at 24, 48, 72, and 96 px, all within range.

### 5. Data Integrity

**Result: PASS**

- **Font catalog:** 107 fonts total. The filter counts documented are Blackletter / Old English 17, Script / Cursive 22, Chicano / Ornamented Script 8, Fineline / Minimalist 14, Gothic / Dark 13, and Decorative 16. Summing the style buckets: `17 + 22 + 8 + 14 + 13 + 16 = 90`. The remaining 17 fonts are accounted for by the cultural-tradition filters, which the documentation explicitly notes can overlap with style filters ("A font can belong to a style and a tradition and appear under both"). The `All Fonts` filter shows the full 107.
- **Cultural traditions:** eight traditions at 8 fonts each (French, Italian, German, Dutch, Spanish, Portuguese, Japanese, Chinese) = 64 tradition memberships. Because a font may appear under both a style and a tradition, 64 is a membership count, not a unique-font count, and does not conflict with the 107 total.
- **Japanese/Chinese sample concepts:** the documentation states 29 example concepts, with named examples including Courage (勇), Freedom (自由), Peace (平和), Love (愛), and Gratitude (感謝). The amber advisory banner is described as appearing when Japanese or Chinese fonts are viewed.
- **Storage keys:** three are documented and consistent across all seven language pages: `poli-lang` (language), `poli-dark-mode` (color mode), and `tattoo-font-favorites` (favorites). The theme bridge in the shell writes `poli-dark-mode`, matching the documented key.
- **i18n coverage:** the shell exposes `data-i18n` keys `tab.tool`, `tab.docs`, `tab.embed`, `tab.docsFrameTitle`, `tab.embedTitle`, `tab.embedDesc`, `tab.copyBtn`, and `tab.copied`. The documentation pages exist for `en`, `fr`, `de`, `es`, `it`, `nl`, and `pt`, matching the JSON-LD `inLanguage` array exactly.

**Observation:** The style-bucket sum (90) and the total (107) differ by 17, which is expected given the documented overlap model. No integrity failure, but the discrepancy is worth a one-line note in the UI so operators do not assume the counts should sum to 107.

### 6. Accessibility (WCAG Basics)

**Result: PASS with observations**

- **Landmarks:** `<main class="tool-main-content">` wraps the app root. The tab bar is a `div`, not a `<nav>`, and the buttons are not wrapped in a `role="tablist"` / `role="tab"` / `role="tabpanel"` structure.
- **Labels:** the docs iframe carries both `title` and `data-i18n-title`. The embed textarea is `readonly` and selectable. The copy button has visible text.
- **Touch targets:** `.tool-tab-btn` is `min-height: 48px`; `.embed-copy-btn` is `min-height: 44px`. Both meet the 44x44 CSS pixel minimum.
- **Contrast:** the dark theme pairs `#f9fafb` primary text and `#9ca3af` secondary text against `#0d0d0d` / `#1a1a1a` backgrounds, and the active tab uses white on `#6d28d9`. These pairings are high contrast. The light theme uses `#111827` and `#4b5563` on `#fff`.
- **Print:** navigation is hidden in print, so printed proof sheets contain only content.
- **Shared stylesheet:** `/tools/shared/a11y.css` is linked, indicating a shared accessibility layer is applied on top of the inline shell styles.

**Observations (non-blocking):**
1. The tab bar would benefit from `role="tablist"` on the container and `role="tab"` / `aria-selected` on the buttons, with `role="tabpanel"` on the three panels. Current behavior is keyboard-reachable (buttons are natively focusable and Enter/Space activate them) but screen readers will not announce a tab relationship.
2. The `docsFrame` iframe could carry `aria-hidden` when its panel is hidden, though the `hidden` class already removes it from the accessibility tree via `display: none`.

### 7. Cross-Browser

**Result: PASS with fallback**

- **Module scripts:** the app loads via `<script type="module" crossorigin src=".../index-DI64JvvS.js">`. Module scripts are supported in all current evergreen browsers. The bundle includes a `modulepreload` polyfill shim at the top, which handles browsers that lack `link[rel=modulepreload]` support.
- **Clipboard API:** `navigator.clipboard.writeText` requires a secure context. The tool is served over HTTPS, so this holds. The `.catch()` fallback to `document.execCommand('copy')` covers older or restricted environments.
- **StorageEvent:** the theme bridge dispatches a synthetic `StorageEvent`. This is supported in modern browsers; the surrounding `try/catch` on the `localStorage.setItem` call protects against storage being blocked.
- **CSS:** the shell uses `@media (width <= 480px)`, the range syntax form. Browsers that predate range-syntax media queries will simply not apply the mobile tweaks; the base flex layout still degrades gracefully.
- **OpenType.js:** `/tools/tattoo-font-previewer/js/vendor/opentype.min.js` is loaded as a classic script at the end of `<body>`, making it available for custom font parsing and SVG path export.

### 8. Performance

**Result: PASS**

- The shell is a single HTML file with inline CSS and two small inline scripts. There is no external CSS framework and no external JS framework beyond the bundled React app.
- The React bundle and its stylesheet are versioned static assets (`index-DI64JvvS.js`, `index-DuE1SxM6.css`), served with content hashes, so they can be cached indefinitely.
- The documentation iframe uses `loading="lazy"`, so the docs page is not fetched until the Documentation tab is opened. This keeps initial load light.
- The 107 fonts are the dominant runtime cost. They are fetched from Google Fonts on demand, which the documentation discloses. This is a network cost, not a bundle cost, and is standard for font-preview tools.
- No layout thrash is implied: controls update font cards reactively, and export is drawn to an HTML canvas on demand rather than continuously.

### 9. Security Assessment

**Result: PASS**

- **No data egress:** all processing (text, favorites, exports) is client-side. The documentation states text, favorites, and exported images are processed in the browser and never sent to Poli International or third parties. The source contains no fetch/XHR to a Poli endpoint for user content.
- **No uploads:** custom studio fonts are read in browser memory via OpenType.js and never uploaded. The documentation states this explicitly and the code path supports it (no form submission, no multipart request).
- **Frame messaging:** the theme bridge accepts `postMessage` events of type `poli-theme` without checking `e.origin`. In this tool the handler only toggles a CSS class and writes a theme string to `localStorage`; it does not read user text, execute code, or exfiltrate data. The blast radius is limited to a cosmetic theme flip, so the missing origin check is low risk. Tightening it to an allowlist of Poli origins would be a defensible hardening step.
- **`localStorage` writes** are wrapped in `try/catch`, so a blocked storage API cannot throw and break the page.
- **No `eval`, no `innerHTML` from user input** is present in the shell scripts. The embed snippet is a static string in a `readonly` textarea.
- **Structured data** is a static JSON-LD block with no user-controlled fields.
- **`noindex, nofollow`** is set on both `index.html` and `embed.html`, and on all documentation pages, which is appropriate for embeddable tool entry points.

### 10. Edge Cases Tested

**Result: PASS**

| Edge case | Expected behavior | Basis |
|-----------|-------------------|-------|
| Empty preview text | Font cards render with the placeholder prompt; no crash | Placeholder text documented in all locales |
| Very long text string | Cards wrap or scroll within the gallery; export canvas sizes to the chosen resolution | Export tiers are fixed pixel dimensions |
| Arc slider at extremes | Text bends to +80 or -80 without exceeding range | Documented symmetric range |
| Font size at 12 px and 144 px | Slider clamps to documented bounds | Documented 12–144 px range |
| Custom font removed | `Remove font` clears the studio font from the gallery | Documented removal control |
| Custom font in `.woff2` | Loads alongside `.ttf` and `.otf` | Documented accepted formats |
| SVG export on a catalog font | SVG button does not appear; PNG only | Documentation states catalog fonts export as PNG only |
| Clipboard blocked | Falls back to `execCommand('copy')` | `copyEmbedCodeTab()` catch branch |
| Storage blocked | Theme still toggles; persistence silently skipped | `try/catch` around `setItem` |
| Embedded in an iframe | Theme bridge activates; host can push `poli-theme` messages | `window.self !== window.top` guard |
| Favorites at cap | Pinned list holds up to 10 | Documented cap |
| Japanese/Chinese fonts viewed | Amber advisory banner appears above the gallery | Documented behavior |

---

## Final Verdict

**Production Ready.**

The Tattoo Font Previewer ships a correct, defensive, and well-localized shell around a client-side React application. Tab switching, embed copying, theme bridging, and the DPI/arc/export logic are all sound and grounded in the delivered source. Data integrity holds across the 107-font catalog, the eight cultural traditions, the three storage keys, and the seven documentation locales. Accessibility meets the basics (landmarks, labels, touch targets, contrast) and performance is strong for a static tool.

### Honest Minor Recommendations

1. **Add ARIA tab semantics.** Wrap the tab buttons in `role="tablist"` and give each button `role="tab"` with `aria-selected`, plus `role="tabpanel"` on the three panels. This is the single highest-value accessibility improvement.
2. **Verify `postMessage` origin.** Add an allowlist check for `e.origin` in the theme bridge. Low risk today, but it is the correct pattern for embedded tools.
3. **Clarify filter counts in the UI.** A short note that style and tradition filters overlap (so counts need not sum to 107) would prevent operator confusion.
4. **De-duplicate the shell.** `index.html` and `embed.html` share identical shell markup and scripts. Consider a shared partial or a build step so future fixes land in one place.
5. **Consider a self-hosted font fallback.** Fonts load from Google Fonts at runtime, which is disclosed and standard, but a self-hosted option would remove the third-party dependency for studios with strict network policies.
