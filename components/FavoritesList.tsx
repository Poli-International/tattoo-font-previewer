import React, { useMemo } from 'react';
import { Archive, Trash2 } from 'lucide-react';

interface FavoritesListProps {
    favorites: string[];
    fonts: any[]; // Using any[] for simplicity in props, but should correspond to TATTOO_FONTS
    onRemoveFavorite: (name: string) => void;
    onClearFavorites: () => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, fonts, onRemoveFavorite, onClearFavorites }) => {

    const favoriteFonts = useMemo(() => {
        return fonts.filter(font => favorites.includes(font.name));
    }, [favorites, fonts]);

    if (favorites.length === 0) {
        return (
            <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg border border-gray-100 dark:border-[#242424] p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-[#242424] rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                    <Archive size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">No Favorites Yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click the <span className="text-rose-500">♥</span> icon on fonts you like to save them here.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg border border-gray-100 dark:border-[#242424] p-6 lg:sticky lg:top-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">Favorites</h3>
                    <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs rounded-full font-bold">
                        {favorites.length}/10
                    </span>
                </div>
                <button
                    onClick={onClearFavorites}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                    <Trash2 size={12} /> Clear
                </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                {favoriteFonts.map(font => (
                    <div key={font.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#242424] rounded-lg group">
                        <span
                            className="text-lg text-gray-800 dark:text-gray-200 truncate pr-2"
                            style={{ fontFamily: `"${font.name}", sans-serif` }}
                        >
                            {font.name}
                        </span>
                        <button
                            onClick={() => onRemoveFavorite(font.name)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                            title="Remove"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#2a2a2a]">
                <p className="text-xs text-gray-400 text-center">
                    Favorites are saved to your browser automatically.
                </p>
            </div>
        </div>
    );
};

export default FavoritesList;
