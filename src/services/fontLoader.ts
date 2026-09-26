import { TattooFont } from '../types';

export const loadFonts = (fonts: TattooFont[]) => {
    if (typeof document === 'undefined') return;
    if (!fonts || fonts.length === 0) return;

    const chunkSize = 20;
    for (let i = 0; i < fonts.length; i += chunkSize) {
        const chunk = fonts.slice(i, i + chunkSize);
        const styleId = `tattoo-font-previewer-fonts-${Math.floor(i / chunkSize)}`;
        if (document.getElementById(styleId)) continue;

        try {
            const families = chunk.map(f => {
                return f.googleFont.includes(':') ? `family=${f.googleFont}` : `family=${f.googleFont}`;
            }).join('&');
            const url = `https://fonts.googleapis.com/css2?${families}&display=swap`;

            const link = document.createElement('link');
            link.id = styleId;
            link.href = url;
            link.rel = 'stylesheet';
            link.onerror = () => {
                // Silently fall back to local font definitions if CSP blocks font stylesheet
            };

            document.head.appendChild(link);
        } catch {
            // Graceful handling under strict offline or SSR environments
        }
    }
};
