import React, { useState, useEffect } from 'react';
import { Heart, Download, Info } from 'lucide-react';
import { TattooFont } from '../types';

interface FontCardProps {
    font: TattooFont;
    text: string;
    fontSize: number;
    backgroundColor: string;
    isFavorite: boolean;
    onToggleFavorite: (fontName: string) => void;
    onDownload: (font: TattooFont) => void;
}

const FontCard: React.FC<FontCardProps> = ({
    font, text, fontSize, backgroundColor, isFavorite, onToggleFavorite, onDownload
}) => {
    // Determine text color based on background
    const textColor = backgroundColor === 'black' ? 'text-white' : 'text-[#1A1A1A]';
    const bgColorClass = backgroundColor === 'black' ? 'bg-black' : backgroundColor === 'white' ? 'bg-white' : 'bg-transparent';
    const bgStyle = backgroundColor === 'transparent' ?
        { backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8wCYBJAAQAamRUB8kI2LQAAAABJRU5ErkJggg==')" } :
        {};

    // Handle Copy Name
    const copyName = () => {
        navigator.clipboard.writeText(font.name);
        // Could show a toast, but keeping it simple for now
    };

    return (
        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm border border-gray-200 dark:border-[#242424] overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            {/* Header: Name + Category */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-[#2a2a2a] flex justify-between items-center bg-gray-50 dark:bg-[#202020]">
                <div>
                    <h3
                        className="font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-2"
                        onClick={copyName}
                        title="Click to copy font name"
                    >
                        {font.name}
                        <span className="text-xs text-gray-400 font-normal border border-gray-200 dark:border-gray-700 px-1 rounded bg-white dark:bg-[#1A1A1A]">
                            Copy
                        </span>
                    </h3>
                    <span className="text-xs text-gray-500 capitalize">{font.category}</span>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => onToggleFavorite(font.name)}
                        className={`p-2 rounded-full transition-colors ${isFavorite
                                ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
                                : 'text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                            }`}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <button
                        onClick={() => onDownload(font)}
                        className="p-2 rounded-full text-gray-400 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
                        title="Download PNG Preview"
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div
                className={`p-6 min-h-[160px] flex items-center justify-center overflow-hidden relative ${bgColorClass}`}
                style={bgStyle}
            >
                {/* We use a span with inline styles for dynamic sizing */}
                <p
                    className={`text-center break-words w-full font-preview-text leading-tight ${textColor}`}
                    style={{
                        fontFamily: `"${font.name}", sans-serif`,
                        fontSize: `${fontSize}px`
                    }}
                >
                    {text || 'Tattoo Art'}
                </p>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Footer with Google Fonts link maybe? Or just keep it clean */}
        </div>
    );
};

export default FontCard;
