import React, { useMemo } from 'react';
import { Archive, Trash2 } from 'lucide-react';
import { TattooFont, SupportedLanguage } from '../types';
import { t } from '../i18n';

interface FavoritesListProps {
    favorites: string[];
    fonts: TattooFont[];
    onRemoveFavorite: (name: string) => void;
    onClearFavorites: () => void;
    language: SupportedLanguage;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
    favorites,
    fonts,
    onRemoveFavorite,
    onClearFavorites,
    language
}) => {
    const favoriteFonts = useMemo(() => {
        return fonts.filter(font => favorites.includes(font.name));
    }, [favorites, fonts]);

    if (favorites.length === 0) {
        return (
            <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm border border-gray-200 dark:border-[#242424] p-5 text-center no-print">
                <div className="w-12 h-12 bg-gray-100 dark:bg-[#242424] rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                    <Archive size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">{t('favorites.title', language)}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t('favorites.empty', language)}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm border border-gray-200 dark:border-[#242424] p-4 sm:p-5 lg:sticky lg:top-8 no-print">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100 dark:border-[#282828]">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{t('favorites.title', language)}</h3>
                    <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs rounded-full font-bold">
                        {favorites.length}/10
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onClearFavorites}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors min-h-[44px] px-2"
                    title={t('favorites.clearAll', language)}
                >
                    <Trash2 size={13} /> {t('favorites.clearAll', language)}
                </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t('favorites.limit', language)}</p>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                {favoriteFonts.map(font => (
                    <div
                        key={font.name}
                        className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-100 dark:border-[#2b2b2b]"
                    >
                        <div className="min-w-0 pr-2">
                            <span
                                className="block text-sm text-gray-900 dark:text-white truncate"
                                style={{ fontFamily: `"${font.name}", sans-serif` }}
                            >
                                {font.name}
                            </span>
                            <span className="text-xs text-gray-500 block">{t(`category.${font.category}`, language)}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => onRemoveFavorite(font.name)}
                            className="text-gray-400 hover:text-red-500 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors shrink-0 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                            title={t('card.favoriteRemove', language)}
                            aria-label={t('card.favoriteRemove', language)}
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesList;
