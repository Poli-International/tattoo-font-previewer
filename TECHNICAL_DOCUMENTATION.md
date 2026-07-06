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
11. [Support and Contact](#support-and-contact)

## Architecture Overview

### Technology Stack

- **Runtime**: Client-side only, no server dependencies
- **Framework**: React 18 (production build via Vite)
- **Language**: JavaScript (ES modules)
- **Styling**: Tailwind CSS (utility classes)
- **Build Tool**: Vite (module bundler)
- **Font Loading**: Google Fonts API (preconnect + dns-prefetch)

### File Structure

```
tattoo-font-previewer/
├── index.html                    # Main entry point with tab navigation
├── dist/
│   └── index.html               # Distribution build (iframe-ready)
├── assets/
│   ├── main-BgHeG9R-.js         # Main application bundle
│   ├── main-CdN-bXBv.js         # Alternative main bundle variant
│   ├── main-ryfWM3cm.js         # Alternative main bundle variant
│   ├── embed-CGmfNtOL.js        # Embed mode bundle
│   ├── embed-CtIviMj1.js        # Alternative embed bundle
│   ├── embed-CTTgRztb.js        # Alternative embed bundle
│   ├── embed-wUpM7niT.js        # Alternative embed bundle
│   ├── embed-ZC4Cv35N.js        # Alternative embed bundle
│   ├── index-BFb-GsAn.js        # Shared component library
│   ├── index-N9TX4OH5.js        # Alternative shared library
│   ├── index-Dwr0Y3_D.js        # Alternative shared library
│   ├── index-AagzsUJ8.js        # Alternative shared library
│   ├── vendor-DF3nNwgj.js       # React + ReactDOM vendor bundle
│   └── index-CKwCImN9.css       # Compiled stylesheet
└── css/
    └── poli-standard.css         # Standard Poli styling overrides
```

### Component Architecture

The application follows a single-page component hierarchy:

```
App (root component)
├── Header (breadcrumb + dark mode toggle)
├── ActionBar (Buy me a coffee, Documentation, Embed buttons)
├── TextInputPanel (text input, font size, background color)
├── CategoryFilter (font category selector)
├── FontPreviewGrid (renders all matching fonts)
├── RelatedToolsSection
├── Footer
└── EmbedModal (modal dialog for embed code)
```

### State Management

All state is managed via React `useState` hooks within the root component. No external state management library is used.

## Data Schemas

### Application State

The root component (`App` in `main-BgHeG9R-.js`) maintains the following state variables:

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `isDarkMode` | boolean | `true` (from localStorage or default dark) | Controls dark/light theme |
| `isModalOpen` | boolean | `false` | Controls embed modal visibility |
| `text` | string | `"Tattoo Art"` | The text to preview in all fonts |
| `fontSize` | number | `48` | Font size in pixels for preview |
| `category` | string | `"all"` | Font category filter |
| `backgroundColor` | string | `"white"` | Background color for preview area |
| `isEmbedded` | boolean | `false` (detected via `window.self !== window.top`) | Whether tool is in iframe |

### Local Storage Schema

| Key | Value Type | Example |
|-----|------------|---------|
| `poli-dark-mode` | string | `"dark"` or `"light"` |

### Font Data Structure

Fonts are defined in the shared component library (`index-BFb-GsAn.js`) as an array of objects:

```javascript
{
  name: "string",          // Display name of the font
  family: "string",        // CSS font-family value
  category: "string",      // Font category (e.g., "blackletter", "script", "gothic", "decorative")
  googleFont: "string"     // Google Fonts API name for loading
}
```

### Category Filter Options

| Value | Display Label |
|-------|---------------|
| `"all"` | All Fonts |
| `"blackletter"` | Blackletter |
| `"script"` | Script |
| `"gothic"` | Gothic |
| `"decorative"` | Decorative |

## Calculation / Logic Algorithms

### Dark Mode Persistence

**Function**: `useEffect` in root component

**Logic**:
1. On mount, read `poli-dark-mode` from `localStorage`
2. If value is `null` or `"dark"`, set dark mode as default
3. On state change, update `localStorage`, toggle `dark` class on `<html>`, and set background colors on `<html>` and `<body>`

### Embed Detection

**Logic**:
1. Compare `window.self` with `window.top`
2. If they differ, set `isEmbedded` state to `true`
3. When embedded, hide header action bar, related tools section, and footer

### Font Preview Rendering

**Logic**:
1. Accept `text`, `fontSize`, `category`, and `backgroundColor` as props
2. Filter font array based on `category` (if not `"all"`)
3. For each matching font, render a preview card showing the input text styled with that font family
4. Apply the selected `fontSize` and `backgroundColor` to each preview card

## API Reference

### Public Functions

#### `copyEmbedCode()`

**Location**: `index.html` (inline script)

**Parameters**: None

**Behavior**: Selects the content of the embed code textarea and copies it to clipboard using `document.execCommand('copy')`. Displays an alert on success.

#### `toggleDarkMode()`

**Location**: `Header` component (via `setIsDarkMode` prop)

**Parameters**: None (uses closure over `isDarkMode` state)

**Behavior**: Toggles the `isDarkMode` boolean state, which triggers the dark mode persistence effect.

### Event Handlers

#### Tab Navigation Handlers

**Location**: `index.html` (inline script)

**Behavior**: Click handlers on `.tool-tab` buttons toggle visibility of `.wrapper-tab-content` divs and update active tab styling.

#### Embed Modal Handlers

**Location**: Main application bundle

**Behavior**: `isModalOpen` state controls visibility of the embed modal component. Open/close triggered by button clicks.

### Props Interface

#### `Header` Component

| Prop | Type | Description |
|------|------|-------------|
| `isDarkMode` | boolean | Current dark mode state |
| `setIsDarkMode` | function | State setter for dark mode |
| `isEmbedded` | boolean | Whether running in iframe |

#### `TextInputPanel` Component

| Prop | Type | Description |
|------|------|-------------|
| `text` | string | Current preview text |
| `setText` | function | Text state setter |
| `fontSize` | number | Font size in pixels |
| `setFontSize` | function | Font size state setter |
| `backgroundColor` | string | Background color value |
| `setBackgroundColor` | function | Background color state setter |

#### `CategoryFilter` Component

| Prop | Type | Description |
|------|------|-------------|
| `category` | string | Current category filter |
| `setCategory` | function | Category state setter |

#### `FontPreviewGrid` Component

| Prop | Type | Description |
|------|------|-------------|
| `text` | string | Text to render |
| `fontSize` | number | Font size in pixels |
| `category` | string | Category filter |
| `backgroundColor` | string | Background color |

## Integration Guide

### Standalone Embedding via iframe

The tool is designed for easy embedding on any website. Use the following iframe code:

```html
<iframe 
  src="https://poliinternational.com/tools/tattoo-font-previewer/index.html" 
  width="100%" 
  height="1000" 
  frameborder="0" 
  style="border-radius:12px;">
</iframe>
```

### Embed Behavior

When loaded in an iframe (`window.self !== window.top`), the tool automatically:
- Hides the header action bar (Buy me a coffee, Documentation, Embed buttons)
- Hides the Related Tools section
- Hides the Footer
- Forces full-width layout on all internal containers
- Applies dark theme by default
- Listens for `postMessage` events with type `poli-theme` for parent-controlled theme switching

### Theme Control from Parent Page

Send a `postMessage` to the iframe to control dark/light mode:

```javascript
// Set light mode
iframe.contentWindow.postMessage({ type: 'poli-theme', light: true }, '*');

// Set dark mode
iframe.contentWindow.postMessage({ type: 'poli-theme', light: false }, '*');
```

### Direct URL Access

The tool is fully functional at:
```
https://poliinternational.com/tools/tattoo-font-previewer/
```

No API keys, server-side processing, or external dependencies are required for basic functionality.

## Customization

### Font Size

Users can adjust font size via the `fontSize` input (default: 48px). The value is passed directly as a CSS `font-size` property to each preview card.

### Background Color

Users can set a background color via the `backgroundColor` input (default: `"white"`). This value is applied as the background of each preview card.

### Text Input

Users can type any text into the `text` input field (default: `"Tattoo Art"`). The text is rendered in all available fonts.

### Dark/Light Mode

Toggle via the sun/moon icon button in the header. Preference is persisted in `localStorage`.

## Performance

### Bundle Size

The application uses three main JavaScript bundles:
- **Vendor bundle** (`vendor-DF3nNwgj.js`): Contains React 18 and ReactDOM (production minified)
- **Shared library** (`index-BFb-GsAn.js`): Contains shared components and font data
- **Main bundle** (`main-BgHeG9R-.js`): Contains the root application component

### Font Loading

- Google Fonts are loaded with `preconnect` and `dns-prefetch` hints for faster initial load
- Fonts are loaded on demand via Google Fonts API when the application renders
- No font subsetting or optimization is applied

### Rendering

- All fonts render simultaneously on page load
- No lazy loading or virtualization is implemented for the font grid
- For 50+ fonts, all preview cards render in a single pass

## Browser Compatibility

### Supported Browsers

The application uses standard web technologies and should work in:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Opera 47+

### Mobile Support

- Fully responsive layout via Tailwind CSS utility classes
- Touch-friendly interface with adequate tap targets
- Viewport meta tag configured for mobile: `width=device-width, initial-scale=1.0, maximum-scale=5.0`

### Known Limitations

- Internet Explorer is not supported (ES module syntax, modern APIs)
- Font rendering depends on Google Fonts availability
- Some decorative fonts may not render correctly on all browsers

## Security

### Input Handling

- User text input is rendered directly into the DOM via React's JSX, which automatically escapes HTML entities
- No `dangerouslySetInnerHTML` is used in the application code
- The text input is treated as plain text, not HTML

### XSS Prevention

- React's built-in XSS protection handles all user input
- No raw HTML injection points exist in the application
- The embed code textarea is read-only and populated server-side

### iframe Security

- The distribution build (`dist/index.html`) sets `noindex, nofollow` meta tags
- The tool does not access or transmit user data to any server
- No cookies are set by the application (only `localStorage` for theme preference)
- The tool operates entirely client-side with no network requests after initial load

### Content Security

- No external scripts are loaded beyond Google Fonts
- All JavaScript is bundled and served from the same origin
- No user data is collected, stored, or transmitted

## Version History

### Version 1.0.0 (Current)

- Initial release of Tattoo Font Previewer
- 50+ professional tattoo fonts including blackletter, script, gothic, and decorative styles
- Real-time text preview with adjustable font size
- Category filtering for font discovery
- Dark/light mode with persistence
- Embeddable via iframe with parent-controlled theming
- Responsive design for all devices
- Free to use with no attribution required

## Support and Contact

For technical support, feature requests, or bug reports:

- **Email**: support@poliinternational.com
- **Website**: https://poliinternational.com
- **Documentation**: https://poliinternational.com/tattoo-font-previewer-documentation/
- **Company**: Poli International Co., Ltd.
- **Location**: Thailand

### Community Support

- **Ko-fi**: https://ko-fi.com/C0C81NEXBV (support development)

### Related Tools

- Tattoo Pricing Calculator: https://poliinternational.com/tattoo-price-estimator/
- Tattoo Stencil Calculator: https://poliinternational.com/tools/stencil-calculator/
- Tattoo Ink Color Mixer: https://poliinternational.com/tools/ink-mixer/
