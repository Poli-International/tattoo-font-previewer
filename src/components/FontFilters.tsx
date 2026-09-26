import React from 'react';
import { FONT_CATEGORIES } from '../constants';
import { SupportedLanguage } from '../types';
import { t } from '../i18n';

interface FontFiltersProps {
    category: string;
    setCategory: (category: string) => void;
    language: SupportedLanguage;
}

const FontFilters: React.FC<FontFiltersProps> = ({ category, setCategory, language }) => {
    return (
        <div className="mb-8 no-print">
            <div className="flex flex-wrap gap-2 justify-center items-center">
                {FONT_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                            category === cat.id
                                ? 'bg-purple-600 text-white shadow-md transform scale-105'
                                : 'bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'
                        }`}
                    >
                        <span>{t(cat.labelKey, language)}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                            category === cat.id
                                ? 'bg-purple-700/80 text-white'
                                : 'bg-gray-100 dark:bg-[#262626] text-gray-500 dark:text-gray-400'
                        }`}>
                            {cat.count}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FontFilters;
