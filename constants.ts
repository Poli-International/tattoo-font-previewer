import { TattooFont, FontFilter } from './types';

export const TATTOO_FONTS: TattooFont[] = [
    // Blackletter / Old English (12)
    { name: 'UnifrakturMaguntia', category: 'blackletter', googleFont: 'UnifrakturMaguntia', description: 'Classic blackletter style' },
    { name: 'IM Fell English SC', category: 'blackletter', googleFont: 'IM+Fell+English+SC', description: 'Small caps old english' },
    { name: 'Almendra SC', category: 'blackletter', googleFont: 'Almendra+SC', description: 'Medieval small caps' },
    { name: 'Caudex', category: 'blackletter', googleFont: 'Caudex', description: 'Traditional blackletter' },
    { name: 'Cinzel Decorative', category: 'blackletter', googleFont: 'Cinzel+Decorative', description: 'Ornate capitals' },
    { name: 'Pirata One', category: 'blackletter', googleFont: 'Pirata+One', description: 'Pirate/nautical' },
    { name: 'Grenze Gotisch', category: 'blackletter', googleFont: 'Grenze+Gotisch', description: 'Modern gothic' },
    { name: 'MedievalSharp', category: 'blackletter', googleFont: 'MedievalSharp', description: 'Sharp medieval' },
    { name: 'Germania One', category: 'blackletter', googleFont: 'Germania+One', description: 'Germanic style' },
    { name: 'Metal Mania', category: 'blackletter', googleFont: 'Metal+Mania', description: 'Heavy metal' },
    { name: 'Smokum', category: 'blackletter', googleFont: 'Smokum', description: 'Western vintage' },
    { name: 'Rye', category: 'blackletter', googleFont: 'Rye', description: 'Decorative vintage' },

    // Script / Cursive (15)
    { name: 'Great Vibes', category: 'script', googleFont: 'Great+Vibes', description: 'Elegant script' },
    { name: 'Satisfy', category: 'script', googleFont: 'Satisfy', description: 'Casual handwritten' },
    { name: 'Pacifico', category: 'script', googleFont: 'Pacifico', description: 'Surf/beach style' },
    { name: 'Dancing Script', category: 'script', googleFont: 'Dancing+Script', description: 'Flowing cursive' },
    { name: 'Sacramento', category: 'script', googleFont: 'Sacramento', description: 'Formal script' },
    { name: 'Allura', category: 'script', googleFont: 'Allura', description: 'Romantic script' },
    { name: 'Tangerine', category: 'script', googleFont: 'Tangerine', description: 'Classic calligraphy' },
    { name: 'Rochester', category: 'script', googleFont: 'Rochester', description: 'Vintage script' },
    { name: 'Yellowtail', category: 'script', googleFont: 'Yellowtail', description: 'Playful script' },
    { name: 'Kaushan Script', category: 'script', googleFont: 'Kaushan+Script', description: 'Modern brush' },
    { name: 'Monoton', category: 'script', googleFont: 'Monoton', description: 'Art deco' },
    { name: 'Righteous', category: 'script', googleFont: 'Righteous', description: 'Bold script' },
    { name: 'Lobster', category: 'script', googleFont: 'Lobster', description: 'Thick script' },
    { name: 'Permanent Marker', category: 'script', googleFont: 'Permanent+Marker', description: 'Marker style' },
    { name: 'Fredericka the Great', category: 'script', googleFont: 'Fredericka+the+Great', description: 'Victorian' },

    // Gothic / Dark (13)
    { name: 'Creepster', category: 'gothic', googleFont: 'Creepster', description: 'Horror style' },
    { name: 'Butcherman', category: 'gothic', googleFont: 'Butcherman', description: 'Dark gothic' },
    { name: 'Nosifer', category: 'gothic', googleFont: 'Nosifer', description: 'Dripping horror' },
    { name: 'Eater', category: 'gothic', googleFont: 'Eater', description: 'Decayed style' },
    { name: 'Caesar Dressing', category: 'gothic', googleFont: 'Caesar+Dressing', description: 'Brushed gothic' },
    { name: 'Jolly Lodger', category: 'gothic', googleFont: 'Jolly+Lodger', description: 'Circus horror' },
    { name: 'Henny Penny', category: 'gothic', googleFont: 'Henny+Penny', description: 'Gothic decorative' },
    { name: 'Freckle Face', category: 'gothic', googleFont: 'Freckle+Face', description: 'Quirky gothic' },
    { name: 'Risque', category: 'gothic', googleFont: 'Risque', description: 'Bold gothic' },
    { name: 'Black Ops One', category: 'gothic', googleFont: 'Black+Ops+One', description: 'Military stencil' },
    { name: 'Rubik Mono One', category: 'gothic', googleFont: 'Rubik+Mono+One', description: 'Modern mono' },
    { name: 'Faster One', category: 'gothic', googleFont: 'Faster+One', description: 'Racing style' },
    { name: 'Kranky', category: 'gothic', googleFont: 'Kranky', description: 'Hand-drawn' },

    // Decorative / Unique (10)
    { name: 'Vast Shadow', category: 'decorative', googleFont: 'Vast+Shadow', description: '3D shadow' },
    { name: 'Rammetto One', category: 'decorative', googleFont: 'Rammetto+One', description: 'Bold display' },
    { name: 'Shrikhand', category: 'decorative', googleFont: 'Shrikhand', description: 'Indian-inspired' },
    { name: 'Chicle', category: 'decorative', googleFont: 'Chicle', description: 'Rounded' },
    { name: 'Bungee Shade', category: 'decorative', googleFont: 'Bungee+Shade', description: 'Layered shadow' },
    { name: 'Knewave', category: 'decorative', googleFont: 'Knewave', description: 'Wavy decorative' },
    { name: 'Fontdiner Swanky', category: 'decorative', googleFont: 'Fontdiner+Swanky', description: 'Retro diner' },
    { name: 'Ewert', category: 'decorative', googleFont: 'Ewert', description: 'Victorian ornate' },
    { name: 'Erica One', category: 'decorative', googleFont: 'Erica+One', description: 'Chunky display' },
    { name: 'Bungee Inline', category: 'decorative', googleFont: 'Bungee+Inline', description: 'Inline decorative' }
];

export const FONT_CATEGORIES: FontFilter[] = [
    { id: 'all', label: 'All Fonts (50)', count: 50 },
    { id: 'blackletter', label: 'Blackletter / Old English', count: 12 },
    { id: 'script', label: 'Script / Cursive', count: 15 },
    { id: 'gothic', label: 'Gothic / Dark', count: 13 },
    { id: 'decorative', label: 'Decorative / Unique', count: 10 }
];

export const SIZE_PRESETS = [
    { label: 'Small', value: 24 },
    { label: 'Medium', value: 48 },
    { label: 'Large', value: 72 },
    { label: 'Extra Large', value: 96 }
];

export const DEFAULT_PREVIEW_TEXT = 'Tattoo Art';
