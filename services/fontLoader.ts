import { TattooFont } from '../types';

export const loadFonts = (fonts: TattooFont[]) => {
    if (!fonts || fonts.length === 0) return;

    // Create a unique ID for our style tag
    const styleId = 'tattoo-font-previewer-fonts';

    // Check if fonts are already loaded
    if (document.getElementById(styleId)) return;

    // Batch font loading - Google Fonts API allows multiple families
    // Format: family=Font1&family=Font2
    const families = fonts.map(f => `family=${f.googleFont}:wght@400`).join('&');
    const url = `https://fonts.googleapis.com/css2?${families}&display=swap`;

    const link = document.createElement('link');
    link.id = styleId;
    link.href = url;
    link.rel = 'stylesheet';

    document.head.appendChild(link);
};
