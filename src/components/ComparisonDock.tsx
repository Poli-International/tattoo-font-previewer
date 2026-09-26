import React from 'react';
import { ArrowLeftRight, X, Download, Columns } from 'lucide-react';
import { TattooFont, BackgroundType, StencilSettings, TextAlignment, SupportedLanguage } from '../types';
import { t } from '../i18n';

interface ComparisonDockProps {
    isOpen: boolean;
    onClose: () => void;
    fontA: TattooFont | null;
    fontB: TattooFont | null;
    onSelectFontA: (font: TattooFont) => void;
    onSelectFontB: (font: TattooFont) => void;
    availableFonts: TattooFont[];
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
    onDownload: (font: TattooFont) => void;
    language: SupportedLanguage;
}

const ComparisonDock: React.FC<ComparisonDockProps> = ({
    isOpen,
    onClose,
    fontA,
    fontB,
    onSelectFontA,
    onSelectFontB,
    availableFonts,
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
    onDownload,
    language
}) => {
    if (!isOpen) return null;

    const handleSwap = () => {
        if (fontA && fontB) {
            const temp = fontA;
            onSelectFontA(fontB);
            onSelectFontB(temp);
        }
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

    const getStencilStyle = () => {
        if (!stencil.enabled) return {};
        const colorHex = stencil.color === 'purple' ? '#5B2C82' : '#1A365D';
        return {
            WebkitTextStroke: `${stencil.weight}px ${colorHex}`,
            color: 'transparent'
        };
    };

    const renderTextContent = (font: TattooFont | null, sideId: string) => {
        if (!font) {
            return (
                <div className="p-8 text-center text-xs text-gray-400 italic">
                    Select a font to preview
                </div>
            );
        }

        const lines = (text || font.sampleText || 'Tattoo Lettering').split('\n');

        if (curveBend !== 0) {
            const arcStartX = 40;
            const arcEndX = 560;
            const arcMidY = 110;
            const pathD = `M ${arcStartX} ${arcMidY + curveBend * 0.8} Q 300 ${arcMidY - curveBend * 1.4} ${arcEndX} ${arcMidY + curveBend * 0.8}`;
            const pathId = `dock-path-${sideId}-${font.name.replace(/[^a-zA-Z0-9]/g, '')}`;
            const strokeColor = stencil.color === 'purple' ? '#5B2C82' : '#1A365D';

            return (
                <svg viewBox="0 0 600 220" className="w-full h-auto max-h-[220px] overflow-visible">
                    <defs>
                        <path id={pathId} d={pathD} fill="none" stroke="none" />
                    </defs>
                    <text
                        fill={stencil.enabled ? 'none' : 'currentColor'}
                        stroke={stencil.enabled ? strokeColor : 'none'}
                        strokeWidth={stencil.enabled ? stencil.weight : 0}
                        textAnchor="middle"
                        style={{
                            fontFamily: `"${font.name}", sans-serif`,
                            fontSize: `${Math.min(fontSize, 56)}px`,
                            letterSpacing: `${letterSpacing}px`
                        }}
                    >
                        <textPath href={`#${pathId}`} startOffset="50%">
                            {text || font.sampleText || 'Tattoo Lettering'}
                        </textPath>
                    </text>
                </svg>
            );
        }

        return (
            <div
                className="w-full break-words select-all"
                style={{
                    textAlign: textAlignment,
                    lineHeight: lineHeight,
                    ...getStencilStyle()
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
        );
    };

    return (
        <section className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-6 rounded-2xl shadow-md border-2 border-purple-200 dark:border-purple-900/60 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-[#262626]">
                <div className="flex items-center gap-2">
                    <Columns size={20} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                            {t('dock.title', language)}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t('dock.subtitle', language)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                        type="button"
                        onClick={handleSwap}
                        disabled={!fontA || !fontB}
                        className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-[#252525] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors flex items-center gap-1.5 disabled:opacity-40"
                        title={t('dock.swap', language)}
                    >
                        <ArrowLeftRight size={14} />
                        <span>{t('dock.swap', language)}</span>
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="min-h-[44px] min-w-[44px] rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors flex items-center justify-center p-2"
                        title={t('dock.close', language)}
                        aria-label={t('dock.close', language)}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Split Dual Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {/* Panel A (Left) */}
                <div className="flex flex-col rounded-xl border border-gray-200 dark:border-[#2b2b2b] overflow-hidden bg-gray-50 dark:bg-[#181818]">
                    <div className="p-3 border-b border-gray-200 dark:border-[#2b2b2b] flex items-center justify-between gap-2 bg-white dark:bg-[#202020]">
                        <div className="flex-grow min-w-0">
                            <label htmlFor="font-select-a" className="block text-[11px] font-semibold text-purple-600 dark:text-purple-400 mb-1">
                                {t('dock.fontA', language)}
                            </label>
                            <select
                                id="font-select-a"
                                value={fontA?.name || ''}
                                onChange={(e) => {
                                    const found = availableFonts.find(f => f.name === e.target.value);
                                    if (found) onSelectFontA(found);
                                }}
                                className="w-full text-xs font-medium px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            >
                                <option value="" disabled>{t('dock.selectFontA', language)}</option>
                                {availableFonts.map(f => (
                                    <option key={f.name} value={f.name}>{f.name} ({t(`category.${f.category}`, language)})</option>
                                ))}
                            </select>
                        </div>

                        {fontA && (
                            <button
                                type="button"
                                onClick={() => onDownload(fontA)}
                                className="min-h-[44px] min-w-[44px] p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-center shrink-0"
                                title={t('card.download', language)}
                            >
                                <Download size={16} />
                            </button>
                        )}
                    </div>

                    <div
                        className={`p-6 min-h-[220px] flex items-center justify-center flex-grow relative overflow-hidden transition-colors ${getBgClass()}`}
                        style={{ transform: isMirrored ? 'scaleX(-1)' : 'none' }}
                    >
                        {renderTextContent(fontA, 'a')}
                    </div>
                </div>

                {/* Panel B (Right) */}
                <div className="flex flex-col rounded-xl border border-gray-200 dark:border-[#2b2b2b] overflow-hidden bg-gray-50 dark:bg-[#181818]">
                    <div className="p-3 border-b border-gray-200 dark:border-[#2b2b2b] flex items-center justify-between gap-2 bg-white dark:bg-[#202020]">
                        <div className="flex-grow min-w-0">
                            <label htmlFor="font-select-b" className="block text-[11px] font-semibold text-purple-600 dark:text-purple-400 mb-1">
                                {t('dock.fontB', language)}
                            </label>
                            <select
                                id="font-select-b"
                                value={fontB?.name || ''}
                                onChange={(e) => {
                                    const found = availableFonts.find(f => f.name === e.target.value);
                                    if (found) onSelectFontB(found);
                                }}
                                className="w-full text-xs font-medium px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-[#181818] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                            >
                                <option value="" disabled>{t('dock.selectFontB', language)}</option>
                                {availableFonts.map(f => (
                                    <option key={f.name} value={f.name}>{f.name} ({t(`category.${f.category}`, language)})</option>
                                ))}
                            </select>
                        </div>

                        {fontB && (
                            <button
                                type="button"
                                onClick={() => onDownload(fontB)}
                                className="min-h-[44px] min-w-[44px] p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-center shrink-0"
                                title={t('card.download', language)}
                            >
                                <Download size={16} />
                            </button>
                        )}
                    </div>

                    <div
                        className={`p-6 min-h-[220px] flex items-center justify-center flex-grow relative overflow-hidden transition-colors ${getBgClass()}`}
                        style={{ transform: isMirrored ? 'scaleX(-1)' : 'none' }}
                    >
                        {renderTextContent(fontB, 'b')}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonDock;
