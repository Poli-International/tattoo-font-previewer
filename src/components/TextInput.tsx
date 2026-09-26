import React from 'react';
import { RotateCcw, Info, AlignLeft, AlignCenter, AlignRight, FlipHorizontal, PenTool, Columns } from 'lucide-react';
import { BackgroundType, SupportedLanguage, TextAlignment, StencilSettings, StencilWeight, StencilColor } from '../types';
import { SIZE_PRESETS } from '../constants';
import { t } from '../i18n';

interface TextInputProps {
    text: string;
    setText: (text: string) => void;
    fontSize: number;
    setFontSize: (size: number) => void;
    letterSpacing: number;
    setLetterSpacing: (spacing: number) => void;
    lineHeight: number;
    setLineHeight: (height: number) => void;
    curveBend: number;
    setCurveBend: (curve: number) => void;
    backgroundColor: BackgroundType;
    setBackgroundColor: (bg: BackgroundType) => void;
    textAlignment: TextAlignment;
    setTextAlignment: (align: TextAlignment) => void;
    lineStagger: number;
    setLineStagger: (stagger: number) => void;
    isMirrored: boolean;
    setIsMirrored: (mirrored: boolean) => void;
    stencil: StencilSettings;
    setStencil: React.Dispatch<React.SetStateAction<StencilSettings>>;
    onOpenComparison?: () => void;
    language: SupportedLanguage;
}

const TextInput: React.FC<TextInputProps> = ({
    text,
    setText,
    fontSize,
    setFontSize,
    letterSpacing,
    setLetterSpacing,
    lineHeight,
    setLineHeight,
    curveBend,
    setCurveBend,
    backgroundColor,
    setBackgroundColor,
    textAlignment,
    setTextAlignment,
    lineStagger,
    setLineStagger,
    isMirrored,
    setIsMirrored,
    stencil,
    setStencil,
    onOpenComparison,
    language
}) => {
    return (
        <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[#262626] mb-6">
            {/* Primary Text Input Field (Multi-line support) */}
            <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="tattoo-text-input" className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {t('input.label', language)}
                    </label>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span>{text.length} {t('input.charCount', language)}</span>
                        {text.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setText('')}
                                className="text-gray-400 hover:text-red-500 transition-colors touch-target px-2 min-h-[44px]"
                            >
                                {t('input.clear', language)}
                            </button>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <textarea
                        id="tattoo-text-input"
                        rows={2}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={t('input.placeholder', language)}
                        className="w-full px-4 py-3 text-base sm:text-lg bg-gray-50 dark:bg-[#202020] text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-[#333] focus:border-purple-600 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-600/20 focus:outline-none transition-all resize-y min-h-[56px]"
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                    {t('multiline.hint', language)}
                </div>
            </div>

            {/* Typography Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-3 border-t border-gray-100 dark:border-[#2a2a2a] slider-controls-container">
                {/* 1. Font Size Control */}
                <div className="flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="font-size-slider" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {t('controls.fontSize', language)}: <span className="font-mono text-purple-600 dark:text-purple-400">{fontSize}px</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => setFontSize(48)}
                            className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1 touch-target px-2 min-h-[44px]"
                            title={t('controls.reset', language)}
                            aria-label={t('controls.reset', language)}
                        >
                            <RotateCcw size={13} />
                        </button>
                    </div>

                    <div className="py-2 flex items-center min-h-[44px]">
                        <input
                            id="font-size-slider"
                            type="range"
                            min="12"
                            max="144"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full h-2.5 bg-gray-200 dark:bg-[#333] rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                    </div>

                    {/* Presets with >= 44px touch targets */}
                    <div className="grid grid-cols-4 gap-1.5 mt-1">
                        {SIZE_PRESETS.map((preset) => (
                            <button
                                key={preset.key}
                                type="button"
                                onClick={() => setFontSize(preset.value)}
                                className={`text-xs py-2.5 px-1 min-h-[44px] rounded-lg text-center transition-colors flex items-center justify-center font-medium ${fontSize === preset.value
                                    ? 'bg-purple-600 text-white shadow-sm'
                                    : 'bg-gray-100 dark:bg-[#242424] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
                                }`}
                            >
                                {preset.value}px
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Letter Spacing Control */}
                <div className="flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="letter-spacing-slider" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {t('controls.letterSpacing', language)}: <span className="font-mono text-purple-600 dark:text-purple-400">{letterSpacing}px</span>
                        </label>
                        {letterSpacing !== 0 ? (
                            <button
                                type="button"
                                onClick={() => setLetterSpacing(0)}
                                className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1 touch-target px-2 min-h-[44px]"
                                title={t('controls.reset', language)}
                                aria-label={t('controls.reset', language)}
                            >
                                <RotateCcw size={13} />
                            </button>
                        ) : <div className="h-[44px]" />}
                    </div>

                    <div className="py-2 flex items-center min-h-[44px]">
                        <input
                            id="letter-spacing-slider"
                            type="range"
                            min="-2"
                            max="20"
                            value={letterSpacing}
                            onChange={(e) => setLetterSpacing(Number(e.target.value))}
                            className="w-full h-2.5 bg-gray-200 dark:bg-[#333] rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-1 min-h-[44px]">
                        <span>-2px</span>
                        <span>0px</span>
                        <span>+20px</span>
                    </div>
                </div>

                {/* 3. Line Height Control */}
                <div className="flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="line-height-slider" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {t('controls.lineHeight', language)}: <span className="font-mono text-purple-600 dark:text-purple-400">{lineHeight}</span>
                        </label>
                        {lineHeight !== 1.2 ? (
                            <button
                                type="button"
                                onClick={() => setLineHeight(1.2)}
                                className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1 touch-target px-2 min-h-[44px]"
                                title={t('controls.reset', language)}
                                aria-label={t('controls.reset', language)}
                            >
                                <RotateCcw size={13} />
                            </button>
                        ) : <div className="h-[44px]" />}
                    </div>

                    <div className="py-2 flex items-center min-h-[44px]">
                        <input
                            id="line-height-slider"
                            type="range"
                            min="0.8"
                            max="2.5"
                            step="0.1"
                            value={lineHeight}
                            onChange={(e) => setLineHeight(Number(e.target.value))}
                            className="w-full h-2.5 bg-gray-200 dark:bg-[#333] rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-1 min-h-[44px]">
                        <span>0.8</span>
                        <span>1.2</span>
                        <span>2.5</span>
                    </div>
                </div>

                {/* 4. Curved Text Bend Control */}
                <div className="flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="curve-bend-slider" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {t('controls.curveBend', language)}: <span className="font-mono text-purple-600 dark:text-purple-400">{curveBend}</span>
                        </label>
                        {curveBend !== 0 ? (
                            <button
                                type="button"
                                onClick={() => setCurveBend(0)}
                                className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1 touch-target px-2 min-h-[44px]"
                                title={t('controls.reset', language)}
                                aria-label={t('controls.reset', language)}
                            >
                                <RotateCcw size={13} />
                            </button>
                        ) : <div className="h-[44px]" />}
                    </div>

                    <div className="py-2 flex items-center min-h-[44px]">
                        <input
                            id="curve-bend-slider"
                            type="range"
                            min="-80"
                            max="80"
                            value={curveBend}
                            onChange={(e) => setCurveBend(Number(e.target.value))}
                            className="w-full h-2.5 bg-gray-200 dark:bg-[#333] rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                    </div>

                    {/* Curve Presets with >= 44px touch targets */}
                    <div className="grid grid-cols-3 gap-1.5 mt-1">
                        <button
                            type="button"
                            onClick={() => setCurveBend(-40)}
                            className={`text-xs py-2 px-1 min-h-[44px] rounded-lg text-center transition-colors flex items-center justify-center font-medium ${curveBend === -40
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'bg-gray-100 dark:bg-[#242424] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
                            }`}
                        >
                            {t('controls.curveArchDown', language)}
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurveBend(0)}
                            className={`text-xs py-2 px-1 min-h-[44px] rounded-lg text-center transition-colors flex items-center justify-center font-medium ${curveBend === 0
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'bg-gray-100 dark:bg-[#242424] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
                            }`}
                        >
                            {t('controls.curveFlat', language)}
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurveBend(40)}
                            className={`text-xs py-2 px-1 min-h-[44px] rounded-lg text-center transition-colors flex items-center justify-center font-medium ${curveBend === 40
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'bg-gray-100 dark:bg-[#242424] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]'
                            }`}
                        >
                            {t('controls.curveArchUp', language)}
                        </button>
                    </div>
                </div>
            </div>

            {/* Studio Tools & Layout Row: Multi-line Alignment, Stagger, Mirror, Stencil Mode */}
            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-[#2a2a2a] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Multi-line Alignment */}
                <div className="flex flex-col justify-between">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        {t('multiline.align', language)}:
                    </span>
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => setTextAlignment('left')}
                            className={`flex-1 min-h-[44px] py-2 px-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-1 ${textAlignment === 'left'
                                ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                                : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                            }`}
                            title={t('multiline.left', language)}
                        >
                            <AlignLeft size={16} />
                            <span>{t('multiline.left', language)}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setTextAlignment('center')}
                            className={`flex-1 min-h-[44px] py-2 px-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-1 ${textAlignment === 'center'
                                ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                                : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                            }`}
                            title={t('multiline.center', language)}
                        >
                            <AlignCenter size={16} />
                            <span>{t('multiline.center', language)}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setTextAlignment('right')}
                            className={`flex-1 min-h-[44px] py-2 px-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-1 ${textAlignment === 'right'
                                ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                                : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                            }`}
                            title={t('multiline.right', language)}
                        >
                            <AlignRight size={16} />
                            <span>{t('multiline.right', language)}</span>
                        </button>
                    </div>
                </div>

                {/* 2. Line Stagger Offset */}
                <div className="flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="line-stagger-slider" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {t('multiline.stagger', language)}: <span className="font-mono text-purple-600 dark:text-purple-400">{lineStagger}px</span>
                        </label>
                        {lineStagger !== 0 && (
                            <button
                                type="button"
                                onClick={() => setLineStagger(0)}
                                className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1 touch-target px-2 min-h-[44px]"
                                title={t('controls.reset', language)}
                            >
                                <RotateCcw size={13} />
                            </button>
                        )}
                    </div>
                    <div className="py-2 flex items-center min-h-[44px]">
                        <input
                            id="line-stagger-slider"
                            type="range"
                            min="0"
                            max="40"
                            value={lineStagger}
                            onChange={(e) => setLineStagger(Number(e.target.value))}
                            className="w-full h-2.5 bg-gray-200 dark:bg-[#333] rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
                        <span>0px</span>
                        <span>20px</span>
                        <span>40px</span>
                    </div>
                </div>

                {/* 3. Horizontal Mirror for Transfer Sheets */}
                <div className="flex flex-col justify-between">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        {t('mirror.toggle', language)}:
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsMirrored(!isMirrored)}
                        className={`w-full min-h-[44px] py-2 px-3 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-2 ${isMirrored
                            ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                            : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                        }`}
                    >
                        <FlipHorizontal size={16} />
                        <span>{isMirrored ? t('mirror.mirrored', language) : t('mirror.normal', language)}</span>
                    </button>
                </div>

                {/* 4. A/B Comparison Dock Quick Open */}
                {onOpenComparison && (
                    <div className="flex flex-col justify-between">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            {t('dock.title', language)}:
                        </span>
                        <button
                            type="button"
                            onClick={onOpenComparison}
                            className="w-full min-h-[44px] py-2 px-3 rounded-lg text-xs font-medium border border-purple-300 dark:border-purple-800 bg-purple-50/60 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all flex items-center justify-center gap-2"
                        >
                            <Columns size={16} />
                            <span>{t('dock.open', language)}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Thermal Stencil Outline & Carbon Mode Controls */}
            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-[#2a2a2a] p-4 bg-purple-50/40 dark:bg-[#1f1a26] rounded-xl border border-purple-100 dark:border-purple-900/40">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                            <PenTool size={18} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-900 dark:text-white block">
                                {t('stencil.toggle', language)}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                {t('stencil.toggleDesc', language)}
                            </span>
                        </div>
                    </div>

                    {/* Stencil Fill/Hollow Toggle */}
                    <div className="flex items-center gap-1.5 self-start lg:self-auto">
                        <button
                            type="button"
                            onClick={() => setStencil(prev => ({ ...prev, enabled: false }))}
                            className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${!stencil.enabled
                                ? 'border-purple-600 bg-purple-600 text-white shadow-sm'
                                : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                            }`}
                        >
                            {t('stencil.solid', language)}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStencil(prev => ({ ...prev, enabled: true }))}
                            className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${stencil.enabled
                                ? 'border-purple-600 bg-purple-600 text-white shadow-sm'
                                : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                            }`}
                        >
                            {t('stencil.hollow', language)}
                        </button>
                    </div>
                </div>

                {/* Sub-controls when stencil hollow outline is enabled */}
                {stencil.enabled && (
                    <div className="mt-4 pt-3 border-t border-purple-100 dark:border-purple-900/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Line weight */}
                        <div>
                            <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">
                                {t('stencil.lineWeight', language)}:
                            </span>
                            <div className="grid grid-cols-3 gap-1.5">
                                {([1, 2, 3] as StencilWeight[]).map((w) => (
                                    <button
                                        key={w}
                                        type="button"
                                        onClick={() => setStencil(prev => ({ ...prev, weight: w }))}
                                        className={`min-h-[44px] px-2 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${stencil.weight === w
                                            ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                                            : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                                        }`}
                                    >
                                        {t(`stencil.weight${w}`, language)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ink color */}
                        <div>
                            <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">
                                {t('stencil.color', language)}:
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setStencil(prev => ({ ...prev, color: 'purple' }))}
                                    className={`min-h-[44px] px-2 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-1.5 ${stencil.color === 'purple'
                                        ? 'border-[#5B2C82] bg-purple-50 text-[#5B2C82] dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                                        : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                                    }`}
                                >
                                    <span className="w-3 h-3 rounded-full bg-[#5B2C82] shrink-0" />
                                    <span>{t('stencil.purple', language)}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStencil(prev => ({ ...prev, color: 'blue' }))}
                                    className={`min-h-[44px] px-2 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-1.5 ${stencil.color === 'blue'
                                        ? 'border-[#1A365D] bg-blue-50 text-[#1A365D] dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-500 shadow-sm'
                                        : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                                    }`}
                                >
                                    <span className="w-3 h-3 rounded-full bg-[#1A365D] shrink-0" />
                                    <span>{t('stencil.blue', language)}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Background Selection Row */}
            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-[#2a2a2a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {t('bg.label', language)}:
                    </span>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setBackgroundColor('white')}
                            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${backgroundColor === 'white'
                                ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                                : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                            }`}
                        >
                            {t('bg.white', language)}
                        </button>
                        <button
                            type="button"
                            onClick={() => setBackgroundColor('black')}
                            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${backgroundColor === 'black'
                                ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                                : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                            }`}
                        >
                            {t('bg.black', language)}
                        </button>
                        <button
                            type="button"
                            onClick={() => setBackgroundColor('transparent')}
                            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${backgroundColor === 'transparent'
                                ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                                : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                            }`}
                        >
                            {t('bg.transparent', language)}
                        </button>
                        <button
                            type="button"
                            onClick={() => setBackgroundColor('skin')}
                            className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center ${backgroundColor === 'skin'
                                ? 'border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm'
                                : 'border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#282828]'
                            }`}
                        >
                            {t('bg.skin', language)}
                        </button>
                    </div>
                </div>

                {backgroundColor === 'skin' && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                        {t('bg.skinDisclaimer', language)}
                    </div>
                )}
            </div>

            {/* Artist Advisory Callout */}
            <div className="mt-4 p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl flex items-start gap-2.5 advisory-box-print-hide">
                <Info size={16} className="text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                    <strong className="font-semibold block mb-0.5">{t('advisory.title', language)}:</strong>
                    {t('advisory.body', language)}
                </div>
            </div>
        </div>
    );
};

export default TextInput;
