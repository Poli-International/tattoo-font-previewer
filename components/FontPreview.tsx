import React, { useState, useEffect, useMemo } from 'react';
import { TATTOO_FONTS } from '../constants';
import { TattooFont } from '../types';
import FontCard from './FontCard';
import DownloadModal from './DownloadModal';
import FavoritesList from './FavoritesList';
import { loadFonts } from '../services/fontLoader';

interface FontPreviewProps {
    text: string;
    fontSize: number;
    category: string;
    backgroundColor: string;
}

const FontPreview: React.FC<FontPreviewProps> = ({ text, fontSize, category, backgroundColor }) => {
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

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('tattoo-font-favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Load fonts
    useEffect(() => {
        // Load all fonts at once
        loadFonts(TATTOO_FONTS);
    }, []);

    const filteredFonts = useMemo(() => {
        if (category === 'all') return TATTOO_FONTS;
        return TATTOO_FONTS.filter(font => font.category === category);
    }, [category]);

    const toggleFavorite = (fontName: string) => {
        setFavorites(prev => {
            if (prev.includes(fontName)) {
                return prev.filter(f => f !== fontName);
            } else {
                if (prev.length >= 10) {
                    alert("You can save up to 10 favorites in the free version.");
                    return prev;
                }
                return [...prev, fontName];
            }
        });
    };

    const clearFavorites = () => {
        if (window.confirm('Are you sure you want to clear all favorites?')) {
            setFavorites([]);
        }
    };

    const handleDownload = (font: TattooFont) => {
        setDownloadFont(font);
        setIsDownloadOpen(true);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area - Fonts Grid */}
            <div className="lg:col-span-3">
                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Showing {filteredFonts.length} fonts
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredFonts.map((font) => (
                        <FontCard
                            key={font.name}
                            font={font}
                            text={text}
                            fontSize={fontSize}
                            backgroundColor={backgroundColor}
                            isFavorite={favorites.includes(font.name)}
                            onToggleFavorite={toggleFavorite}
                            onDownload={handleDownload}
                        />
                    ))}
                </div>

                {filteredFonts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No fonts found in this category.</p>
                    </div>
                )}
            </div>

            {/* Sidebar - Favorites */}
            <div className="lg:col-span-1">
                <FavoritesList
                    favorites={favorites}
                    fonts={TATTOO_FONTS}
                    onRemoveFavorite={toggleFavorite}
                    onClearFavorites={clearFavorites}
                />
            </div>

            {/* Download Modal */}
            <DownloadModal
                isOpen={isDownloadOpen}
                onClose={() => setIsDownloadOpen(false)}
                font={downloadFont}
                text={text}
            />
        </div>
    );
};

export default FontPreview;
