import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MoreTools from './components/MoreTools';
import EmbedModal from './components/EmbedModal';
import DocModal from './components/DocModal';
import FontPreview from './components/FontPreview';
import TextInput from './components/TextInput';
import FontFilters from './components/FontFilters';
import PhysicalDpiCalculator from './components/PhysicalDpiCalculator';
import CustomFontLoader from './components/CustomFontLoader';
import ComparisonDock from './components/ComparisonDock';
import DownloadModal from './components/DownloadModal';
import { TATTOO_FONTS } from './constants';
import { BackgroundType, SupportedLanguage, TextAlignment, StencilSettings, TattooFont } from './types';
import { getInitialLanguage, setLanguage as setLanguageStorage, translateDom, t } from './i18n';

const App: React.FC = () => {
    const DARK_MODE_KEY = 'poli-dark-mode';
    const DEFAULT_MODE = 'dark';

    const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const stored = localStorage.getItem(DARK_MODE_KEY);
            return stored !== null ? stored === 'dark' : DEFAULT_MODE === 'dark';
        } catch {
            return true;
        }
    });

    const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);

    // Rule 3: EVERY INPUT STARTS EMPTY
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(48);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [lineHeight, setLineHeight] = useState(1.2);
    const [curveBend, setCurveBend] = useState(0);
    const [category, setCategory] = useState('all');
    const [backgroundColor, setBackgroundColor] = useState<BackgroundType>('white');
    const [isEmbedded, setIsEmbedded] = useState(false);

    // Approved Improvement States
    const [textAlignment, setTextAlignment] = useState<TextAlignment>('center');
    const [lineStagger, setLineStagger] = useState<number>(0);
    const [isMirrored, setIsMirrored] = useState<boolean>(false);
    const [stencil, setStencil] = useState<StencilSettings>({
        enabled: false,
        weight: 1,
        color: 'purple'
    });

    // Custom Local Font Loader State
    const [customFonts, setCustomFonts] = useState<TattooFont[]>([]);

    // A/B Comparison Dock State
    const [isComparisonOpen, setIsComparisonOpen] = useState(false);
    const [comparisonFontA, setComparisonFontA] = useState<TattooFont | null>(null);
    const [comparisonFontB, setComparisonFontB] = useState<TattooFont | null>(null);
    const [comparisonDownloadFont, setComparisonDownloadFont] = useState<TattooFont | null>(null);
    const [isComparisonDownloadOpen, setIsComparisonDownloadOpen] = useState(false);

    const allFonts = useMemo(() => {
        return [...customFonts, ...TATTOO_FONTS];
    }, [customFonts]);

    const handleSetLanguage = (newLang: SupportedLanguage) => {
        setLanguageState(newLang);
        setLanguageStorage(newLang);
        translateDom(newLang);
    };

    // Dark mode effect - uses classes and CSS variables (Ban 9)
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        if (isDarkMode) {
            root.classList.add('dark');
            root.setAttribute('data-theme', 'dark');
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            try {
                localStorage.setItem(DARK_MODE_KEY, 'dark');
            } catch (e) {
                console.error(e);
            }
        } else {
            root.classList.remove('dark');
            root.setAttribute('data-theme', 'light');
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            try {
                localStorage.setItem(DARK_MODE_KEY, 'light');
            } catch (e) {
                console.error(e);
            }
        }
    }, [isDarkMode]);

    useEffect(() => {
        setIsEmbedded(window.self !== window.top);
        translateDom(language);
    }, [language]);

    const handleAddCustomFont = (font: TattooFont) => {
        setCustomFonts(prev => [font, ...prev]);
    };

    const handleRemoveCustomFont = (fontName: string) => {
        setCustomFonts(prev => prev.filter(f => f.name !== fontName));
        if (comparisonFontA?.name === fontName) setComparisonFontA(null);
        if (comparisonFontB?.name === fontName) setComparisonFontB(null);
    };

    const handleOpenComparison = (initialFont?: TattooFont) => {
        if (initialFont) {
            setComparisonFontA(initialFont);
            if (!comparisonFontB || comparisonFontB.name === initialFont.name) {
                const other = allFonts.find(f => f.name !== initialFont.name) || allFonts[0];
                setComparisonFontB(other || null);
            }
        } else {
            if (!comparisonFontA) setComparisonFontA(allFonts[0] || null);
            if (!comparisonFontB) setComparisonFontB(allFonts[1] || allFonts[0] || null);
        }
        setIsComparisonOpen(true);
    };

    const handleDownloadFromComparison = (font: TattooFont) => {
        setComparisonDownloadFont(font);
        setIsComparisonDownloadOpen(true);
    };

    return (
        <div className={`min-h-screen bg-white dark:bg-[#0D0D0D] text-[#1A1A1A] dark:text-white flex flex-col ${isEmbedded ? 'embedded' : ''}`}>
            <Header
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                language={language}
                setLanguage={handleSetLanguage}
                isEmbedded={isEmbedded}
            />

            <div className="flex-grow">
                {/* Printable Output Header Stamp - Visible only during printing */}
                <div className="print-only-header max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-400">
                        <div>
                            <span className="font-bold text-sm tracking-wide">{t('print.title', language)}</span>
                            <div className="text-xs text-gray-600 mt-0.5">
                                {t('print.sample', language)}: "{text || t('print.defaultText', language)}" | {t('print.size', language)}: {fontSize}px | {t('print.spacing', language)}: {letterSpacing}px {curveBend !== 0 ? `| ${t('print.curve', language)}: ${curveBend}` : ''}
                                {stencil.enabled && ` | ${t('stencil.hollow', language)} (${stencil.weight}pt ${stencil.color})`}
                                {isMirrored && ` | ${t('mirror.mirrored', language)}`}
                            </div>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                            poliinternational.com/tools/tattoo-font-previewer/
                        </div>
                    </div>
                </div>

                {/* Hero Action Buttons - Only show if NOT embedded, hidden on print */}
                {!isEmbedded && (
                    <section className="bg-gray-50 dark:bg-[#161616] py-3 border-b border-gray-100 dark:border-[#222] no-print">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs">
                                <a
                                    href="https://ko-fi.com/C0C81NEXBV"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="min-h-[44px] px-4 py-2 bg-white dark:bg-[#202020] text-gray-800 dark:text-gray-200 rounded-xl border border-gray-300 dark:border-[#333] hover:border-gray-400 dark:hover:border-[#555] transition-all font-medium shadow-sm flex items-center justify-center gap-1.5"
                                >
                                    <span>☕</span>
                                    <span>{t('nav.coffee', language)}</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => handleOpenComparison()}
                                    className="min-h-[44px] px-4 py-2 bg-white dark:bg-[#202020] text-gray-800 dark:text-gray-200 rounded-xl border border-gray-300 dark:border-[#333] hover:border-gray-400 dark:hover:border-[#555] transition-all font-medium shadow-sm flex items-center justify-center gap-1.5"
                                >
                                    <span>⚖️</span>
                                    <span>{t('dock.open', language)}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsDocModalOpen(true)}
                                    className="min-h-[44px] px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all font-medium shadow-sm flex items-center justify-center gap-1.5"
                                >
                                    <span>📖</span>
                                    <span>{t('nav.docs', language)}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsEmbedModalOpen(true)}
                                    className="min-h-[44px] px-4 py-2 bg-white dark:bg-[#202020] text-gray-800 dark:text-gray-200 rounded-xl border border-gray-300 dark:border-[#333] hover:border-gray-400 dark:hover:border-[#555] transition-all font-medium shadow-sm flex items-center justify-center gap-1.5"
                                >
                                    <span>&lt;/&gt;</span>
                                    <span>{t('nav.embed', language)}</span>
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Controls Section - hidden on print */}
                <section className="max-w-7xl mx-auto px-4 pt-5 pb-2 no-print">
                    <TextInput
                        text={text}
                        setText={setText}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        letterSpacing={letterSpacing}
                        setLetterSpacing={setLetterSpacing}
                        lineHeight={lineHeight}
                        setLineHeight={setLineHeight}
                        curveBend={curveBend}
                        setCurveBend={setCurveBend}
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        textAlignment={textAlignment}
                        setTextAlignment={setTextAlignment}
                        lineStagger={lineStagger}
                        setLineStagger={setLineStagger}
                        isMirrored={isMirrored}
                        setIsMirrored={setIsMirrored}
                        stencil={stencil}
                        setStencil={setStencil}
                        onOpenComparison={() => handleOpenComparison()}
                        language={language}
                    />

                    {/* Physical Print Dimension Calculator (Arithmetic only, DPI math) */}
                    <PhysicalDpiCalculator
                        text={text}
                        fontSize={fontSize}
                        letterSpacing={letterSpacing}
                        lineHeight={lineHeight}
                        language={language}
                    />

                    {/* Local Custom Font Loader (Browser memory only) */}
                    <CustomFontLoader
                        customFonts={customFonts}
                        onAddCustomFont={handleAddCustomFont}
                        onRemoveCustomFont={handleRemoveCustomFont}
                        language={language}
                    />

                    <FontFilters
                        category={category}
                        setCategory={setCategory}
                        language={language}
                    />
                </section>

                {/* Main Font Preview Grid */}
                <main className="max-w-7xl mx-auto px-4 pb-8">
                    <FontPreview
                        text={text}
                        onSelectText={setText}
                        fontSize={fontSize}
                        letterSpacing={letterSpacing}
                        lineHeight={lineHeight}
                        curveBend={curveBend}
                        category={category}
                        backgroundColor={backgroundColor}
                        stencil={stencil}
                        isMirrored={isMirrored}
                        textAlignment={textAlignment}
                        lineStagger={lineStagger}
                        customFonts={customFonts}
                        onCompareWith={(font) => handleOpenComparison(font)}
                        language={language}
                    />
                </main>
            </div>

            {/* Side-by-Side A/B Font Comparison Dock */}
            <ComparisonDock
                isOpen={isComparisonOpen}
                onClose={() => setIsComparisonOpen(false)}
                fontA={comparisonFontA}
                fontB={comparisonFontB}
                onSelectFontA={setComparisonFontA}
                onSelectFontB={setComparisonFontB}
                availableFonts={allFonts}
                text={text}
                fontSize={fontSize}
                letterSpacing={letterSpacing}
                lineHeight={lineHeight}
                curveBend={curveBend}
                backgroundColor={backgroundColor}
                stencil={stencil}
                isMirrored={isMirrored}
                textAlignment={textAlignment}
                lineStagger={lineStagger}
                onDownload={handleDownloadFromComparison}
                language={language}
            />

            {/* Comparison Download Modal */}
            <DownloadModal
                isOpen={isComparisonDownloadOpen}
                onClose={() => setIsComparisonDownloadOpen(false)}
                font={comparisonDownloadFont}
                text={text}
                fontSize={fontSize}
                letterSpacing={letterSpacing}
                lineHeight={lineHeight}
                curveBend={curveBend}
                initialBackground={backgroundColor}
                stencil={stencil}
                isMirrored={isMirrored}
                textAlignment={textAlignment}
                lineStagger={lineStagger}
                language={language}
            />

            {/* Additional Sections - Hide when embedded & on print */}
            {!isEmbedded && <MoreTools language={language} />}
            {!isEmbedded && <Footer language={language} />}

            {/* Embed Modal */}
            <EmbedModal
                isOpen={isEmbedModalOpen}
                onClose={() => setIsEmbedModalOpen(false)}
                language={language}
            />

            {/* In-App Documentation Modal */}
            <DocModal
                isOpen={isDocModalOpen}
                onClose={() => setIsDocModalOpen(false)}
                language={language}
            />
        </div>
    );
};

export default App;
