import React, { useState, useEffect, useMemo } from 'react';
import { TATTOO_FONTS } from '../constants';
import { TattooFont, BackgroundType, SupportedLanguage, StencilSettings, TextAlignment } from '../types';
import FontCard from './FontCard';
import DownloadModal from './DownloadModal';
import FavoritesList from './FavoritesList';
import CjkAdvisory from './CjkAdvisory';
import { loadFonts } from '../services/fontLoader';
import { t } from '../i18n';

interface FontPreviewProps {
    text: string;
    onSelectText?: (text: string) => void;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    curveBend: number;
    category: string;
    backgroundColor: BackgroundType;
    stencil: StencilSettings;
    isMirrored: boolean;
    textAlignment: TextAlignment;
    lineStagger: number;
    customFonts: TattooFont[];
    onCompareWith?: (font: TattooFont) => void;
    language: SupportedLanguage;
}

const FontPreview: React.FC<FontPreviewProps> = ({
    text,
    onSelectText,
    fontSize,
    letterSpacing,
    lineHeight,
    curveBend,
    category,
    backgroundColor,
    stencil,
    isMirrored,
    textAlignment,
    lineStagger,
    customFonts,
    onCompareWith,
    language
}) => {
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('tattoo-font-favorites');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [downloadFont, setDownloadFont] = useState<TattooFont | null>(null);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Save favorites to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('tattoo-font-favorites', JSON.stringify(favorites));
        } catch (e) {
            console.error('Failed to save favorites to localStorage', e);
        }
    }, [favorites]);

    // Load fonts
    useEffect(() => {
        loadFonts(TATTOO_FONTS);
    }, []);

    const allFonts = useMemo(() => {
        return [...customFonts, ...TATTOO_FONTS];
    }, [customFonts]);

    const filteredFonts = useMemo(() => {
        if (category === 'all') return allFonts;
        if (category === 'custom') return customFonts;
        return allFonts.filter(font => font.category === category || font.secondaryCategory === category);
    }, [category, allFonts, customFonts]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const toggleFavorite = (fontName: string) => {
        setFavorites(prev => {
            if (prev.includes(fontName)) {
                return prev.filter(f => f !== fontName);
            } else {
                if (prev.length >= 10) {
                    showToast(t('favorites.limit', language));
                    return prev;
                }
                return [...prev, fontName];
            }
        });
    };

    const clearFavorites = () => {
        setFavorites([]);
        showToast(t('favorites.clearedToast', language));
    };

    const handleDownload = (font: TattooFont) => {
        setDownloadFont(font);
        setIsDownloadOpen(true);
    };

    return (
        <div className="relative">
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700 text-sm animate-in fade-in slide-in-from-bottom-2">
                    {toastMessage}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area - Fonts Grid */}
                <div className="lg:col-span-3">
                    {/* Kanji & Hanzi Translation Advisory Banner */}
                    <CjkAdvisory
                        language={language}
                        onSelectText={onSelectText}
                        activeCategory={category}
                    />

                    <div className="mb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                        {t('filter.showing', language).replace('{count}', String(filteredFonts.length))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filteredFonts.map((font) => (
                            <FontCard
                                key={font.name}
                                font={font}
                                text={text}
                                fontSize={fontSize}
                                letterSpacing={letterSpacing}
                                lineHeight={lineHeight}
                                curveBend={curveBend}
                                backgroundColor={backgroundColor}
                                stencil={stencil}
                                isMirrored={isMirrored}
                                textAlignment={textAlignment}
                                lineStagger={lineStagger}
                                isFavorite={favorites.includes(font.name)}
                                onToggleFavorite={toggleFavorite}
                                onDownload={handleDownload}
                                onCompareWith={onCompareWith}
                                language={language}
                            />
                        ))}
                    </div>

                    {filteredFonts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">{t('filter.noFonts', language)}</p>
                        </div>
                    )}
                </div>

                {/* Sidebar - Favorites */}
                <div className="lg:col-span-1">
                    <FavoritesList
                        favorites={favorites}
                        fonts={allFonts}
                        onRemoveFavorite={toggleFavorite}
                        onClearFavorites={clearFavorites}
                        language={language}
                    />
                </div>

                {/* High-Resolution Download Modal */}
                <DownloadModal
                    isOpen={isDownloadOpen}
                    onClose={() => setIsDownloadOpen(false)}
                    font={downloadFont}
                    text={text}
                    fontSize={fontSize}
                    letterSpacing={letterSpacing}
                    lineHeight={lineHeight}
                    curveBend={curveBend}
                    initialBackground={backgroundColor}
                    stencil={stencil}
                    isMirrored={isMirrored}
                    textAlignment={textAlignment}
                    lineStagger={lineStagger}
                    language={language}
                />
            </div>
        </div>
    );
};

export default FontPreview;
