# Tattoo Font Previewer

**Preview your text in 50+ professional tattoo fonts instantly**

---

## 🎨 About This Tool

The Tattoo Font Previewer helps tattoo artists and clients visualize text tattoos before committing to the design. Choose from over 50 carefully curated Google Fonts optimized for tattoo work, adjust size and background, and download perfect preview images.

**Part of the Poli International Widget Suite** - Professional free tools for the body art community.

---

## ✨ Features

- **50+ Tattoo-Optimized Fonts** - Handpicked Google Fonts perfect for tattoo designs
- **Live Text Preview** - See your text in real-time as you type
- **Size & Background Control** - Adjust font size and preview on different backgrounds
- **PNG Download** - Export high-quality preview images
- **Favorites System** - Save your preferred fonts (stored locally in your browser)
- **Dark Mode** - Easy on the eyes for long design sessions
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **Free Embed** - Add this tool to your website with one click

---

## 🚀 Technical Stack

**Note:** Unlike other tools in the Poli International Widget Suite (which are HTML/CSS/JS), this tool is built with modern React technology for enhanced performance and user experience.

### Built With:
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first styling
- **Google Fonts API** - Access to professional font library

### Why React for This Tool?

The Tattoo Font Previewer requires:
- Complex state management (50+ fonts, favorites, settings)
- Dynamic font loading and rendering
- Real-time text preview updates
- High-performance image export

React provides the best user experience for these requirements while maintaining the same professional quality and community focus as our other tools.

---

## 💻 Development Setup

### Prerequisites:
- Node.js 18+ installed
- npm or yarn package manager

### Installation:

1. **Navigate to project directory:**
   ```bash
   cd tattoo-font-previewer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Tool will be available at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```
   Output will be in `dist/` folder

---

## 📦 Deployment

### Build Output Structure:

```
dist/
├── index.html         ← Main standalone tool page
├── embed.html         ← Embeddable version for iframes
├── assets/            ← CSS, JS, and font files
└── [other files]
```

### Deploying to Production:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to server:**
   - Upload entire `dist/` folder contents to:
     ```
     https://poliinternational.com/tattoo-font-previewer/
     ```

3. **Verify deployment:**
   - Main tool: `https://poliinternational.com/tattoo-font-previewer/`
   - Embed version: `https://poliinternational.com/tattoo-font-previewer/embed.html`

---

## 🎯 Standards Compliance

While this tool uses React instead of plain HTML/CSS/JS, it still follows the Poli International Widget Suite standards:

### ✅ Follows Standards:
- Community feedback form (sends to patrick@poli-international.com)
- Ko-fi support button in footer
- Dark mode toggle
- Responsive design (mobile, tablet, desktop)
- Free embed version available
- Consistent branding and colors
- Friendly, community-focused messaging
- Professional quality and accessibility

### ⚠️ Different from Standard Structure:
- Uses React components instead of plain HTML
- Built with Vite instead of being a standalone HTML file
- Requires `npm install` and `npm run build`
- Has `node_modules/` and build process

**See:** `../STANDARD_TOOL_STRUCTURE.md` for details on standard tool architecture.

---

## 🔧 Project Structure

```
tattoo-font-previewer/
├── index.html              ← Vite entry point
├── embed.html             ← Embed version
├── App.tsx                ← Main React component
├── App.css                ← Global styles
├── components/            ← React components
│   ├── FontPreview.tsx    ← Main preview area
│   ├── FontList.tsx       ← Font selection grid
│   └── Controls.tsx       ← Size & background controls
├── constants.ts           ← Font definitions
├── types.ts               ← TypeScript types
├── services/              ← API services
├── dist/                  ← Build output (created by npm run build)
├── package.json           ← Dependencies
├── vite.config.ts         ← Vite configuration
├── tailwind.config.js     ← TailwindCSS configuration
└── tsconfig.json          ← TypeScript configuration
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready files to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run code quality checks |

---

## 🌐 Integration

### Main Tool URL:
```
https://poliinternational.com/tattoo-font-previewer/
```

### Embed on Any Website:
```html
<iframe
  src="https://poliinternational.com/tattoo-font-previewer/embed.html"
  width="100%"
  height="800"
  frameborder="0"
  title="Tattoo Font Previewer"
></iframe>
```

---

## 💬 Community & Support

### Got Ideas? Found a Bug? We're All Ears!

This tool is built for the body art community, by the community. Your feedback helps us make it better for everyone!

**Ways to Reach Us:**
- **Feedback Form:** Available directly in the tool
- **Email:** patrick@poli-international.com
- **Support Development:** [Buy us a coffee](https://ko-fi.com/poliinternational) ☕

---

## 🎨 Color Scheme

Consistent with Poli International Widget Suite:

- **Artist Purple:** `#7C3AED`
- **Ink Black:** `#1A1A1A`
- **Ko-fi Red:** `#FF5E5B`

---

## 🚨 Important Notes

### For Developers:

1. **Don't commit `dist/` folder** - It's generated by build process
2. **Don't commit `node_modules/`** - Install with `npm install`
3. **Test embed version** - Make sure `embed.html` works after builds
4. **Check responsiveness** - Test on mobile, tablet, desktop
5. **Verify feedback form** - Ensure it sends to correct email

### For Deployment:

1. **Always run `npm run build`** before deploying
2. **Upload entire `dist/` contents** to production
3. **Test both index.html and embed.html** after deployment
4. **Clear browser cache** if changes don't appear

---

## 📋 Pre-Deployment Checklist

Before deploying to production, verify:

- [ ] `npm run build` completes without errors
- [ ] All 50+ fonts load correctly
- [ ] Text preview updates in real-time
- [ ] PNG download works
- [ ] Favorites system saves/loads correctly
- [ ] Dark mode toggle works
- [ ] Feedback form submits successfully
- [ ] Ko-fi button links to correct URL
- [ ] Embed version (embed.html) works in iframe
- [ ] Responsive on mobile, tablet, desktop
- [ ] All links to other tools work
- [ ] No console errors in browser

---

## 🔗 Related Documentation

| Document | Purpose |
|----------|---------|
| `../STANDARD_TOOL_STRUCTURE.md` | Standards for all Poli tools |
| `../README.md` | Overview of entire widget suite |
| `../BUILDING_NEW_TOOLS.md` | Guide for creating new tools |
| `../EMBED_STANDARDS.md` | Standards for embed versions |

---

## 📊 Tool Status

| Feature | Status |
|---------|--------|
| Main Page (index.html) | ✅ Complete |
| Embed Page (embed.html) | ✅ Complete |
| Font Library (50+ fonts) | ✅ Complete |
| Dark Mode | ✅ Complete |
| PNG Download | ✅ Complete |
| Favorites System | ✅ Complete |
| Feedback Form | ✅ Complete |
| Mobile Responsive | ✅ Complete |
| Production Deployment | ✅ Live |

---

## 🎯 Future Enhancements

Ideas for future versions (community feedback welcome!):

- [ ] Add more specialty tattoo fonts
- [ ] Support for custom font uploads
- [ ] Text effects (bold, italic, outline)
- [ ] Color picker for font color
- [ ] Multiple text layers
- [ ] SVG export option
- [ ] Font pairing suggestions
- [ ] Share preview links

**Have more ideas?** Use the feedback form in the tool or email us!

---

## 💜 Thank You!

This tool is built with love for the tattoo and body art community. Whether you're a professional artist, apprentice, or someone planning their next piece - we're all in this together!

**Support the project:** If this tool helps your work, consider [buying us a coffee](https://ko-fi.com/poliinternational) to support development of more free professional tools! ☕

---

**Last Updated:** January 2026
**Version:** 1.0
**Part of:** Poli International Widget Suite
**Status:** ✅ Live & Production Ready

---

**Questions or feedback?** Email patrick@poli-international.com - We genuinely want to hear from you! 💜
