import React, { useState } from 'react';
import { Heart, Download, Copy, Check, Columns } from 'lucide-react';
import { TattooFont, BackgroundType, SupportedLanguage, StencilSettings, TextAlignment } from '../types';
import { t } from '../i18n';

interface FontCardProps {
    font: TattooFont;
    text: string;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    curveBend: number;
    backgroundColor: BackgroundType;
    stencil: StencilSettings;
    isMirrored: boolean;
    textAlignment: TextAlignment;
    lineStagger: number;
    isFavorite: boolean;
    onToggleFavorite: (fontName: string) => void;
    onDownload: (font: TattooFont) => void;
    onCompareWith?: (font: TattooFont) => void;
    language: SupportedLanguage;
}

const FontCard: React.FC<FontCardProps> = ({
    font,
    text,
    fontSize,
    letterSpacing,
    lineHeight,
    curveBend,
    backgroundColor,
    stencil,
    isMirrored,
    textAlignment,
    lineStagger,
    isFavorite,
    onToggleFavorite,
    onDownload,
    onCompareWith,
    language
}) => {
    const [copied, setCopied] = useState(false);

    const copyName = () => {
        navigator.clipboard.writeText(font.name);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getBgClass = () => {
        switch (backgroundColor) {
            case 'black':
                return 'bg-black text-white';
            case 'transparent':
                return 'bg-checkered-pattern text-black dark:text-white';
            case 'skin':
                return 'bg-simulated-skin text-black';
            case 'white':
            default:
                return 'bg-white text-black';
        }
    };

    const stencilColorHex = stencil.color === 'purple' ? '#5B2C82' : '#1A365D';

    const isCurved = curveBend !== 0;
    const sanitizedId = `curve-path-${font.name.replace(/[^a-zA-Z0-9]/g, '')}`;

    const arcStartX = 40;
    const arcEndX = 560;
    const arcMidY = 110;
    const pathD = `M ${arcStartX} ${arcMidY + curveBend * 0.8} Q 300 ${arcMidY - curveBend * 1.4} ${arcEndX} ${arcMidY + curveBend * 0.8}`;

    const lines = text.split('\n');

    return (
        <div className="font-card-container bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm border border-gray-200 dark:border-[#282828] overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
            {/* Header: Name + Category + Actions */}
            <div className="px-4 py-2 border-b border-gray-100 dark:border-[#262626] flex justify-between items-center bg-gray-50/80 dark:bg-[#1f1f1f]">
                <div className="min-w-0 pr-2">
                    <button
                        type="button"
                        className="font-semibold text-sm text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-1.5 transition-colors text-left truncate min-h-[44px]"
                        onClick={copyName}
                        title={t('card.copy', language)}
                    >
                        <span className="truncate">{font.name}</span>
                        {copied ? (
                            <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 px-2 py-0.5 rounded flex items-center gap-1 shrink-0 font-normal">
                                <Check size={12} />
                                {t('card.copied', language)}
                            </span>
                        ) : (
                            <span className="text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded bg-white dark:bg-[#1A1A1A] flex items-center gap-1 shrink-0 font-normal">
                                <Copy size={12} />
                                {t('card.copy', language)}
                            </span>
                        )}
                    </button>
                    <div className="flex items-center gap-2 flex-wrap -mt-0.5">
                        <span className="text-xs text-gray-500">
                            {font.category === 'custom' ? 'Studio Custom' : t(`category.${font.category}`, language)}
                        </span>
                        {font.tag && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-medium">
                                {font.tag}
                            </span>
                        )}
                        {(font.category === 'japanese' || font.category === 'chinese') && (
                            <span
                                className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-medium flex items-center gap-1"
                                title={t('advisory.cjkTitle', language)}
                            >
                                <span aria-hidden="true">⚠️</span>
                                <span>{t(font.category === 'japanese' ? 'category.kanjiKana' : 'category.hanziTag', language)}</span>
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 no-print">
                    {onCompareWith && (
                        <button
                            type="button"
                            onClick={() => onCompareWith(font)}
                            className="min-w-[44px] min-h-[44px] p-2.5 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors flex items-center justify-center"
                            title={t('dock.compareBtn', language)}
                            aria-label={t('dock.compareBtn', language)}
                        >
                            <Columns size={17} />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => onToggleFavorite(font.name)}
                        className={`min-w-[44px] min-h-[44px] p-2.5 rounded-lg transition-colors flex items-center justify-center ${isFavorite
                                ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/30'
                                : 'text-gray-500 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                            }`}
                        title={isFavorite ? t('card.favoriteRemove', language) : t('card.favoriteAdd', language)}
                        aria-label={isFavorite ? t('card.favoriteRemove', language) : t('card.favoriteAdd', language)}
                    >
                        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDownload(font)}
                        className="min-w-[44px] min-h-[44px] p-2.5 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors flex items-center justify-center"
                        title={t('card.download', language)}
                        aria-label={t('card.download', language)}
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Preview Box with Mirroring and Stencil Outlines */}
            <div
                className={`p-6 min-h-[160px] flex items-center justify-center flex-grow transition-colors relative overflow-hidden ${getBgClass()}`}
                style={{ transform: isMirrored ? 'scaleX(-1)' : 'none' }}
            >
                {text.trim().length === 0 ? (
                    font.sampleText ? (
                        <div className="text-center py-4 flex flex-col items-center justify-center gap-1">
                            <span
                                className="font-preview-text text-3xl tracking-widest opacity-85 select-all"
                                style={{
                                    fontFamily: `"${font.name}", sans-serif`,
                                    ...(stencil.enabled ? {
                                        WebkitTextStroke: `${stencil.weight}px ${stencilColorHex}`,
                                        color: 'transparent'
                                    } : {})
                                }}
                            >
                                {font.sampleText}
                            </span>
                            <span className="text-[11px] opacity-60">
                                {t('card.emptyPrompt', language)}
                            </span>
                        </div>
                    ) : (
                        <div className="text-center text-xs opacity-50 italic py-6 text-gray-500 dark:text-gray-400">
                            {t('card.emptyPrompt', language)}
                        </div>
                    )
                ) : isCurved ? (
                    // Curved Text via SVG textPath
                    <svg
                        viewBox="0 0 600 220"
                        className="w-full h-auto max-h-[220px] overflow-visible"
                    >
                        <defs>
                            <path id={sanitizedId} d={pathD} fill="none" stroke="none" />
                        </defs>
                        <text
                            fill={stencil.enabled ? 'none' : 'currentColor'}
                            stroke={stencil.enabled ? stencilColorHex : 'none'}
                            strokeWidth={stencil.enabled ? stencil.weight : 0}
                            textAnchor="middle"
                            style={{
                                fontFamily: `"${font.name}", sans-serif`,
                                fontSize: `${Math.min(fontSize, 64)}px`,
                                letterSpacing: `${letterSpacing}px`
                            }}
                        >
                            <textPath href={`#${sanitizedId}`} startOffset="50%">
                                {text}
                            </textPath>
                        </text>
                    </svg>
                ) : (
                    // Standard Flat Text Layout with Multi-line Alignment and Stencil Outlines
                    <div
                        className="w-full break-words select-all"
                        style={{
                            textAlign: textAlignment,
                            lineHeight: lineHeight,
                            ...(stencil.enabled ? {
                                WebkitTextStroke: `${stencil.weight}px ${stencilColorHex}`,
                                color: 'transparent'
                            } : {})
                        }}
                    >
                        {lines.map((line, idx) => (
                            <div
                                key={idx}
                                style={{
                                    fontFamily: `"${font.name}", sans-serif`,
                                    fontSize: `${fontSize}px`,
                                    letterSpacing: `${letterSpacing}px`,
                                    transform: lineStagger !== 0 ? `translateX(${idx * lineStagger}px)` : 'none'
                                }}
                            >
                                {line}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FontCard;
