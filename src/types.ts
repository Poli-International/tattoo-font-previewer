export type FontCategory =
    | 'blackletter'
    | 'script'
    | 'chicano'
    | 'fineline'
    | 'french'
    | 'italian'
    | 'german'
    | 'dutch'
    | 'spanish'
    | 'portuguese'
    | 'japanese'
    | 'chinese'
    | 'gothic'
    | 'decorative'
    | 'custom';

export interface TattooFont {
    name: string;
    category: FontCategory;
    secondaryCategory?: FontCategory;
    googleFont: string;
    description: string;
    descKey?: string;
    sampleText?: string;
    tag?: string;
    isCustom?: boolean;
    fontFileBuffer?: ArrayBuffer;
}

export interface FontFilter {
    id: string;
    labelKey: string;
    count: number;
    group?: 'style' | 'culture';
}

export type BackgroundType = 'white' | 'black' | 'transparent' | 'skin';

export type ExportResolution = 'standard' | 'print' | 'master';

export type SupportedLanguage = 'en' | 'de' | 'es' | 'fr' | 'it' | 'pt' | 'nl';

export type StencilColor = 'purple' | 'blue';
export type StencilWeight = 1 | 2 | 3;
export type TextAlignment = 'left' | 'center' | 'right';
export type ThermalDpi = 203 | 300;

export interface StencilSettings {
    enabled: boolean;
    weight: StencilWeight;
    color: StencilColor;
}

export interface TextSettings {
    text: string;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    curveBend: number;
    backgroundColor: BackgroundType;
    textAlignment: TextAlignment;
    lineStagger: number;
    isMirrored: boolean;
    stencil: StencilSettings;
}
