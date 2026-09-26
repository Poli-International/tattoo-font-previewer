# Tattoo Font Previewer - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Schemas](#data-schemas)
3. [Calculation / Logic Algorithms](#calculation--logic-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization](#customization)
7. [Performance](#performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Security](#security)
10. [Version History](#version-history)
11. [Support / Contact](#support--contact)

---

## Architecture Overview

### Technology Stack

The Tattoo Font Previewer is a static, client-side web application. There is no backend, no server-side rendering, and no database.

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (`index.html`, `embed.html`) |
| Styling | Inline CSS custom properties (CSS variables) with dark/light theming |
| Application logic | React 19.3.0 (bundled, minified) |
| Font parsing | OpenType.js (`js/vendor/opentype.min.js`) for user-uploaded fonts |
| Font delivery | Google Fonts (loaded at runtime by the browser) |
| Persistence | Browser `localStorage` only |
| Export | HTML5 `<canvas>` rendering to PNG (and SVG for user-loaded fonts) |

The application is dependency-free in the sense that it ships as static files. The only external runtime dependency is Google Fonts, which the browser fetches to render the 107 catalog typefaces.

### File Structure

From the provided file headers:

```
/tools/tattoo-font-previewer/
├── index.html                          # Main entry, tab shell, embed tab
├── embed.html                          # Standalone embed variant (same shell)
├── documentation.html                  # English guide (loaded in docs iframe)
├── documentation-de.html               # German guide
├── documentation-es.html               # Spanish guide
├── documentation-fr.html               # French guide
├── documentation-it.html               # Italian guide
├── documentation-nl.html               # Dutch guide
├── documentation-pt.html               # Portuguese guide
├── assets/
│   ├── index-DI64JvvS.js               # Bundled React application (minified)
│   └── index-DuE1SxM6.css              # Bundled application styles
└── js/
    └── vendor/
        └── opentype.min.js             # OpenType.js font parser
```

Shared assets referenced from the site root:

- `/js/input-guards.js` (input sanitization/guard script)
- `/tools/shared/print.css` (print stylesheet, `media="print"`)
- `/tools/shared/a11y.css` (accessibility stylesheet)

### Component / Logic Breakdown

**Shell layer (`index.html`)**

The page is a three-tab shell. Tab switching is handled by a plain inline script, independent of the React bundle:

- `#toolTabsBar` holds three `.tool-tab-btn` buttons: `tool`, `docs`, `embed`.
- Each tab maps to a `.wrapper-tab-content` container: `#tab-tool`, `#tab-docs`, `#tab-embed`.
- Clicking a tab removes `.active` from all buttons, adds it to the clicked one, hides all content wrappers with `.hidden`, then reveals `#tab-<name>`.

**Tool layer (`#root`)**

The React application mounts into `<div id="root">` inside `<main class="tool-main-content">`. This is where the font gallery, controls, filters, comparison panel, and export logic live.

**Docs layer (`#tab-docs`)**

An `<iframe id="docsFrame">` loads `documentation.html` lazily (`loading="lazy"`, `min-height: 80vh`). The iframe follows the tool's selected language.

**Embed layer (`#tab-embed`)**

A read-only `<textarea id="embedCodeTab">` holds the iframe snippet, with a copy button (`#tabCopyBtn`).

**Theme bridge**

When the tool is embedded (`window.self !== window.top`), a `message` listener accepts `{ type: 'poli-theme', light: boolean }` events. It toggles `dark-mode` / `light-mode` classes on `<body>`, sets `data-theme` on `<html>`, writes `poli-dark-mode` to `localStorage`, and dispatches a `StorageEvent` so other listeners react.

---

## Data Schemas

The following structures are defined or referenced in the provided source. Field names are taken verbatim from the code and documentation.

### Font catalog entry

Each of the 107 catalog fonts is represented as a card in the gallery. Based on the documented filters and card actions, a font entry carries:

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `name` | string | `"Old English Text MT"` | Display name; copyable via "Copy name" |
| `style` | string | `"blackletter"` | One of: blackletter, script, chicano, fineline, gothic, decorative |
| `tradition` | string | `"french"` | One of: french, italian, german, dutch, spanish, portuguese, japanese, chinese |
| `source` | string | `"catalog"` | Distinguishes catalog fonts from user-loaded (`"studio"`) |

A single font may belong to one style and one tradition, and appears under both filters.

### Filter counts (catalog constants)

| Filter | Count |
|--------|-------|
| All fonts | 107 |
| Blackletter / Old English | 17 |
| Script / Cursive | 22 |
| Chicano / Ornamented script | 8 |
| Fineline / Minimalist | 14 |
| Gothic / Dark | 13 |
| Decorative | 16 |
| Each cultural tradition (French, Italian, German, Dutch, Spanish, Portuguese, Japanese, Chinese) | 8 |

### Control state

| Field | Type | Range / Values | Default |
|-------|------|----------------|---------|
| `text` | string | any | placeholder: "Enter your lettering (e.g. names, dates, quotes)..." |
| `fontSize` | number (px) | 12 to 144 | presets: 24, 48, 72, 96 |
| `letterSpacing` | number | slider | default |
| `lineHeight` | number | slider | default |
| `arc` | number | -80 to +80 | 0 (flat) |
| `background` | enum | `white`, `black`, `transparent`, `skin` | default |
| `thermalStencil` | boolean | on/off | off |
| `stencilStrokeWidth` | number (pt) | 1, 2, 3 | 2 |
| `transferInkColor` | enum | `thermal-purple`, `carbon-blue` | default |
| `exportResolution` | enum | `standard`, `high`, `master` | default |
| `exportBackground` | enum | `transparent`, `white`, `black`, `skin` | default |
| `language` | enum | `en`, `de`, `es`, `fr`, `it`, `nl`, `pt` | `en` |
| `colorMode` | enum | `dark`, `light` | `dark` |

### Export resolutions

| Key | Dimensions | Purpose |
|-----|-----------|---------|
| `standard` | 2400 x 800 px | Screen reference |
| `high` | 4800 x 1600 px | Stencil preparation |
| `master` | 7200 x 2400 px | High-precision tracing |

### DPI options

| DPI | Use |
|-----|-----|
| 203 | Standard thermal printer |
| 300 | High resolution |

### localStorage keys

| Key | Value | Purpose |
|-----|-------|---------|
| `poli-lang` | language code | Selected UI language |
| `poli-dark-mode` | `"dark"` / `"light"` | Color mode |
| `tattoo-font-favorites` | array of font names | Pinned favorites (max 10) |

### Japanese / Chinese sample concepts

29 example concepts are provided, including `勇` (Courage), `自由` (Freedom), `平和` (Peace), `愛` (Love), `感謝` (Gratitude).

---

## Calculation / Logic Algorithms

### Arc bending

The `arc` control ranges from -80 to +80. Positive values bow the text upward (chest rocker), negative values bow it downward (inverted curve). Presets: `Flat` (0), `Arc up`, `Arc down`. The value is applied as a per-character vertical offset across the rendered string.

### DPI / physical print size

The DPI calculator converts on-screen lettering to printed dimensions:

```
width_cm  = pixels / DPI * 2.54
height_cm = pixels / DPI * 2.54
```

The formula is displayed in the UI. At 203 DPI (standard thermal) or 300 DPI (high resolution), the tool reports printed width and height in both centimeters and inches.

### Thermal stencil outline

When `thermalStencil` is enabled, the lettering is converted to hollow outlines for thermal transfer printers and carbon copiers. Stroke width options:

- 1 pt: fineline and detail
- 2 pt: standard thermal stencil
- 3 pt: bold carbon transfer

Transfer ink color options: thermal purple or carbon blue.

### Export rendering

PNG export draws the lettering onto an HTML5 `<canvas>` at the selected resolution (2400x800, 4800x1600, or 7200x2400) with the selected background (transparent, white, black, or simulated skin). Exported files contain only the lettering and the chosen background.

For user-loaded studio fonts in `.ttf` or `.otf` format, an additional SVG export path renders the lettering as vector paths via OpenType.js, suitable for cutting plotters and vector editors. The 107 catalog fonts export as PNG only.

### Font loading

Catalog fonts are fetched from Google Fonts at runtime. User-uploaded fonts (`.ttf`, `.otf`, `.woff2`) are read in browser memory via OpenType.js and never uploaded.

### Favorites

Pinned fonts are stored in `localStorage` under `tattoo-font-favorites`, capped at 10. The A/B comparison panel shares size and spacing between both sides, so the visible difference is purely the typeface.

---

## API Reference

The tool exposes the following public handlers and functions in the provided source.

### `copyEmbedCodeTab()`

Defined in `index.html` and `embed.html`.

- **Params:** none
- **Behavior:** Selects `#embedCodeTab`, writes its value to the clipboard via `navigator.clipboard.writeText`. On success, sets `#tabCopyBtn` text to the localized "Copied!" string (via `window.t('tab.copied')` if available, else `'Copied!'`) for 2000 ms, then restores the original label. On failure, falls back to `document.execCommand('copy')`.
- **Returns:** void

### Tab click handler (inline)

Bound to each `.tool-tab-btn`.

- **Params:** none (reads `tab.dataset.tab`)
- **Behavior:** Removes `.active` from all tab buttons, adds `.active` to the clicked button, adds `.hidden` to all `.wrapper-tab-content`, then removes `.hidden` from `#tab-<tabName>`.
- **Returns:** void

### Theme message listener

Bound to `window` `message` events.

- **Params:** `e` (MessageEvent)
- **Behavior:** If `e.data.type === 'poli-theme'`, applies light or dark mode based on `e.data.light`, persists to `localStorage['poli-dark-mode']`, and dispatches a `StorageEvent`.
- **Returns:** void

### UI actions (documented, React-rendered)

| Action | Label | Behavior |
|--------|-------|----------|
| Clear text | `Clear text` | Empties the text input |
| Reset | `Reset` | Restores default size/spacing |
| Add to favorites | `Add to favorites` | Pins a font (max 10) |
| Compare A/B | `Compare A/B` | Opens comparison panel |
| Swap fonts | `Swap fonts` | Switches A and B sides |
| Copy name | `Copy name` | Copies a font's name |
| Clear favorites | `Clear favorites` | Empties the favorites list |
| Download PNG | `Download PNG` | Opens export options and downloads |
| Download vector SVG | `Download vector SVG` | Available only for user-loaded `.ttf`/`.otf` fonts |
| Remove font | `Remove font` | Removes a user-loaded studio font |

---

## Integration Guide

### Standalone embedding via iframe

The tool is designed to be embedded. The embed tab provides a ready snippet:

```html
<iframe src="https://poliinternational.com/tools/tattoo-font-previewer/index.html"
        width="100%" height="1000" frameborder="0"
        style="border-radius:12px;"></iframe>
```

### Live URL

```
https://poliinternational.com/tools/tattoo-font-previewer/
```

### Theme synchronization

When embedded, the parent page can push theme changes by posting a message to the iframe:

```js
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');
```

The tool applies the theme, persists it to `localStorage`, and dispatches a `StorageEvent` so any sibling listeners update.

### Dependency-free static hosting

The tool is a static HTML/CSS/JS bundle. It can be served from any static host. The only runtime network dependency is Google Fonts for the 107 catalog typefaces. OpenType.js is vendored locally at `js/vendor/opentype.min.js`.

---

## Customization

- **Theming:** Colors are driven by CSS custom properties (`--tab-bg`, `--tab-active-bg`, `--card-bg`, `--code-bg`, `--text-primary`, `--text-secondary`, `--border-subtle`, and others) defined in `:root` and overridden under `[data-theme=light]` / `body.light-mode`. Override these variables to rebrand.
- **Language:** Seven languages are supported (`en`, `fr`, `de`, `es`, `it`, `nl`, `pt`). The docs iframe follows the selected language.
- **Custom fonts:** Studio owners can load proprietary `.ttf`, `.otf`, or `.woff2` fonts at runtime. These are labeled "Studio Custom" and support all controls plus SVG export.

---

## Performance

- **Lazy docs loading:** The documentation iframe uses `loading="lazy"` and `min-height: 80vh`.
- **Module preload:** The bundle includes a modulepreload polyfill that scans `link[rel="modulepreload"]` and observes DOM mutations for added preload links.
- **Canvas export:** Exports are rendered locally on an HTML5 canvas; no server round-trip.
- **Font caching:** Catalog fonts are cached by the browser after the first Google Fonts fetch.

---

## Browser Compatibility

- **JavaScript required.** The application is a React bundle.
- **HTML5 required** for canvas export.
- **Clipboard API:** `navigator.clipboard.writeText` is used for the embed copy button, with a fallback to `document.execCommand('copy')` for older browsers.
- **Operating system:** Any (per the JSON-LD `operatingSystem: "Any"`).
- **Responsive:** A media query at `width <= 480px` reduces tab padding and font sizes; the tab bar scrolls horizontally on narrow screens.

---

## Security

- **Input handling:** The page loads `/js/input-guards.js`, a shared guard script, before the application bundle.
- **No server transmission:** User text, favorites, and exported images are processed entirely in the browser and never sent to Poli International or third parties.
- **User font files:** Uploaded `.ttf`/`.otf`/`.woff2` files are read in browser memory and never uploaded.
- **Third-party requests:** Google Fonts receives requests for font files only, not the user's text.
- **Embed isolation:** The tool runs inside an iframe when embedded; theme messages are validated by `e.data.type === 'poli-theme'`.
- **localStorage:** Only `poli-lang`, `poli-dark-mode`, and `tattoo-font-favorites` are persisted. Users can clear them via browser site-data settings or the "Clear favorites" button.

---

## Version History

### 1.0.0

- Initial release of the Tattoo Font Previewer.
- 107 open-source tattoo fonts across six style filters and eight cultural traditions.
- Real-time controls: font size (12 to 144 px), letter spacing, line height, arc bending (-80 to +80).
- Background options: white, black, transparent, simulated skin.
- Thermal stencil outline mode with 1/2/3 pt stroke widths and thermal purple / carbon blue ink colors.
- DPI calculator (203 DPI and 300 DPI) with printed width/height in cm and inches.
- A/B font comparison with shared size and spacing.
- Favorites system (max 10) persisted to `localStorage`.
- PNG export at 2400x800, 4800x1600, and 7200x2400 px.
- SVG vector export for user-loaded `.ttf`/`.otf` fonts.
- Seven UI languages: English, French, German, Spanish, Italian, Dutch, Portuguese.
- Dark and light color modes with iframe theme synchronization.
- Embeddable via iframe with copy-to-clipboard snippet.

---

## Support / Contact

For questions, bug reports, or feature requests:

**Email:** support@poliinternational.com

**Publisher:** Poli International (https://poliinternational.com)

**License:** MIT (per the JSON-LD `license` field)
