import React from 'react';
import { FONT_CATEGORIES } from '../constants';
import { FontCategory } from '../types';

interface FontFiltersProps {
    category: string;
    setCategory: (category: string) => void;
}

const FontFilters: React.FC<FontFiltersProps> = ({ category, setCategory }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {FONT_CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat.id
                            ? 'bg-purple-600 text-white shadow-md transform scale-105'
                            : 'bg-white dark:bg-[#1A1A1A] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'
                        }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
};

export default FontFilters;
