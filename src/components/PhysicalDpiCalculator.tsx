import React, { useState } from 'react';
import { Calculator, ExternalLink, Ruler } from 'lucide-react';
import { ThermalDpi, SupportedLanguage } from '../types';
import { t } from '../i18n';

interface PhysicalDpiCalculatorProps {
    text: string;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    language: SupportedLanguage;
}

const PhysicalDpiCalculator: React.FC<PhysicalDpiCalculatorProps> = ({
    text,
    fontSize,
    letterSpacing,
    lineHeight,
    language
}) => {
    const [dpi, setDpi] = useState<ThermalDpi>(203);

    // Calculate approximate text bounding box in render pixels
    const lines = text.length > 0 ? text.split('\n') : [''];
    const maxLineLength = Math.max(...lines.map(l => l.length), 0);
    const lineCount = Math.max(lines.length, 1);

    // Typographic estimation based on standard letterform proportions
    // Average glyph advance is approximately 0.55 * fontSize
    const avgGlyphWidth = fontSize * 0.55;
    const estWidthPx = maxLineLength > 0
        ? Math.round(maxLineLength * avgGlyphWidth + (maxLineLength - 1) * letterSpacing)
        : 0;
    const estHeightPx = Math.round(lineCount * fontSize * lineHeight);

    // DPI math
    const widthInches = estWidthPx > 0 ? (estWidthPx / dpi) : 0;
    const heightInches = estHeightPx > 0 ? (estHeightPx / dpi) : 0;
    const widthCm = widthInches * 2.54;
    const heightCm = heightInches * 2.54;

    return (
        <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-[#262626] mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-[#262626]">
                <div className="flex items-center gap-2">
                    <Ruler size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {t('dpi.title', language)}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t('dpi.subtitle', language)}
                        </p>
                    </div>
                </div>

                {/* Resolution selector */}
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => setDpi(203)}
                        className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${dpi === 203
                            ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                            : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                        }`}
                    >
                        {t('dpi.res203', language)}
                    </button>
                    <button
                        type="button"
                        onClick={() => setDpi(300)}
                        className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${dpi === 300
                            ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                            : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                        }`}
                    >
                        {t('dpi.res300', language)}
                    </button>
                </div>
            </div>

            {/* Arithmetic and Dimensions Readout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-3.5 bg-gray-50 dark:bg-[#222] rounded-xl border border-gray-100 dark:border-[#2d2d2d]">
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 block mb-1">
                        {t('dpi.renderedPixels', language)}
                    </span>
                    <div className="text-base sm:text-lg font-mono font-bold text-gray-900 dark:text-white">
                        {estWidthPx} px x {estHeightPx} px
                    </div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 block mt-1">
                        {t('dpi.fontSpecs', language, { size: fontSize, spacing: letterSpacing })}
                    </span>
                </div>

                <div className="p-3.5 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/40">
                    <span className="text-[11px] font-medium text-purple-700 dark:text-purple-300 block mb-1">
                        {t('dpi.printWidth', language)} ({dpi} DPI)
                    </span>
                    <div className="text-base sm:text-lg font-mono font-bold text-purple-900 dark:text-purple-100">
                        {widthCm.toFixed(2)} cm
                    </div>
                    <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 block mt-0.5">
                        {widthInches.toFixed(2)} in
                    </span>
                </div>

                <div className="p-3.5 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/40">
                    <span className="text-[11px] font-medium text-purple-700 dark:text-purple-300 block mb-1">
                        {t('dpi.printHeight', language)} ({dpi} DPI)
                    </span>
                    <div className="text-base sm:text-lg font-mono font-bold text-purple-900 dark:text-purple-100">
                        {heightCm.toFixed(2)} cm
                    </div>
                    <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 block mt-0.5">
                        {heightInches.toFixed(2)} in
                    </span>
                </div>
            </div>

            {/* Arithmetic Formula Display */}
            <div className="mt-3.5 p-3 bg-gray-50 dark:bg-[#202020] rounded-xl border border-gray-200 dark:border-[#2d2d2d] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calculator size={14} className="shrink-0 text-purple-600 dark:text-purple-400" />
                    <span>
                        <strong className="text-gray-800 dark:text-gray-200">{t('dpi.formula', language)}:</strong>{' '}
                        {t('dpi.formulaExplanation', language)}
                    </span>
                </div>
            </div>

            {/* Mandatory Cross-Tool Stencil Calculator Link (Strictly no anatomical placement claims here) */}
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#262626] flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{t('dpi.stencilCalculatorLink', language)}</span>
                <a
                    href="https://poliinternational.com/stencil-calculator/"
                    target="_top"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-purple-600 dark:text-purple-400 hover:underline min-h-[44px] px-2 shrink-0"
                >
                    <span>{t('dpi.stencilCalculatorBtn', language)}</span>
                    <ExternalLink size={13} />
                </a>
            </div>
        </div>
    );
};

export default PhysicalDpiCalculator;
