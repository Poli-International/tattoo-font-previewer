export interface TattooFont {
    name: string;
    category: 'blackletter' | 'script' | 'gothic' | 'decorative';
    googleFont: string;
    description: string;
}

export type FontCategory = 'all' | 'blackletter' | 'script' | 'gothic' | 'decorative';

export interface FontFilter {
    id: FontCategory;
    label: string;
    count: number;
}
