# Tattoo Font Previewer: Technical Documentation

Technical architecture, rendering pipeline, stencil generation, and hardware DPI integration specifications for Poli International Tattoo Font Previewer.

## 1. System Architecture

The Tattoo Font Previewer is a client-side React single-page application built on Vite and Tailwind CSS. All text rendering, canvas computations, font loading, arc geometry transformations, and stencil image generation run entirely in client browser memory with zero telemetry and zero server transmission.

```
+-----------------------------------------------------------------------------------+
| Browser Viewport                                                                  |
| +-------------------------------------------------------------------------------+ |
| | Input & Geometry Controls (Size, Kerning, Arc/Bend, Stencil, A/B Comparison)   |
| +-------------------------------------------------------------------------------+ |
| | Render Engine: HTML5 Canvas + SVG Path Vectorization Pipeline                 |
| +-------------------------------------------------------------------------------+ |
| | Typographic Catalog: 85 Curated Tattoo Fonts + Local TTF/OTF Memory Loader     |
| +-------------------------------------------------------------------------------+ |
| | Stencil Engine: 203 DPI / 300 DPI Thermal Transfer Matrix + Outline Math      |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

## 2. Rendering & Geometry Pipeline

### 2.1 Arc & Curvature Transformation
Text curvature transforms horizontal glyph offsets along an elliptical arc:
- **Radius calculation**: $R = \frac{W^2 + 4H^2}{8H}$, where $W$ is total string bounding width and $H$ is vertical sagitta determined by the user bend slider (-100 to +100).
- **Angular mapping**: Each character $\theta_i$ is mapped radially perpendicular to the curve tangent:
  $$\phi_i = \arctan2(y_i - y_c, x_i - x_c) + \frac{\pi}{2}$$
- The canvas applies rotational context transforms per character, preserving letter kerning and stroke integrity without distorting rasterized glyph boundaries.

### 2.2 Stencil Outline Generation
Thermal stencil transfer papers require crisp perimeter outlines:
- High-resolution offscreen canvas (203 or 300 DPI equivalent).
- Stroke dilation pass at specified line weights (1 pt, 2 pt, 3 pt).
- Hex-coded thermal stencil colors (`#5B2C82` stencil purple, `#1A365D` carbon blue, or `#111827` carbon black) optimized for thermal transfer exposure units (e.g., Brother PocketJet, Phomemo, Opaque).

## 3. Physical Print & DPI Calculation

Physical dimensions are calculated purely from pixel dimensions and target hardware DPI:
$$\text{Width (inches)} = \frac{\text{Width (pixels)}}{\text{DPI}}$$
$$\text{Width (mm)} = \text{Width (inches)} \times 25.4$$

Standard thermal transfer resolutions:
- **203 DPI**: 8.00 dots/mm (standard for mobile thermal stencil printers)
- **300 DPI**: 11.81 dots/mm (standard for high-resolution thermal stencil printers)

## 4. Internationalization (i18n)

Full linguistic parity across 7 supported languages:
- English (`en`)
- German (`de`)
- Spanish (`es`)
- French (`fr`)
- Italian (`it`)
- Portuguese (`pt`)
- Dutch (`nl`)

All user-visible strings, labels, placeholders, option tags, and dynamic tokens `{count}` are verified for strict 1:1 key parity.
