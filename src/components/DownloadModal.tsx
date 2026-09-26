import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, Download, Loader2, AlertCircle, FileCode, Check } from 'lucide-react';
import { TattooFont, BackgroundType, ExportResolution, SupportedLanguage, StencilSettings, TextAlignment } from '../types';
import { t } from '../i18n';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    font: TattooFont | null;
    text: string;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    curveBend: number;
    initialBackground: BackgroundType;
    stencil: StencilSettings;
    isMirrored: boolean;
    textAlignment: TextAlignment;
    lineStagger: number;
    language: SupportedLanguage;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
    isOpen,
    onClose,
    font,
    text,
    fontSize,
    letterSpacing,
    lineHeight,
    curveBend,
    initialBackground,
    stencil,
    isMirrored,
    textAlignment,
    lineStagger,
    language
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [resolution, setResolution] = useState<ExportResolution>('print');
    const [exportBackground, setExportBackground] = useState<BackgroundType>(initialBackground);
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [svgNoticeOpen, setSvgNoticeOpen] = useState(false);

    // Resolution dimensions
    const dimensions: Record<ExportResolution, { width: number; height: number; scale: number }> = {
        standard: { width: 2400, height: 800, scale: 1 },
        print: { width: 4800, height: 1600, scale: 2 },
        master: { width: 7200, height: 2400, scale: 3 }
    };

    const generatePreview = useCallback(async () => {
        if (!isOpen || !font || text.trim().length === 0) return;

        setIsGenerating(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height, scale } = dimensions[resolution];
        canvas.width = width;
        canvas.height = height;

        // Ensure font is ready in document
        try {
            await document.fonts.load(`100px "${font.name}"`);
        } catch {
            // Ignore font loading errors; use fallbacks
        }

        ctx.clearRect(0, 0, width, height);

        // Fill background
        if (exportBackground === 'white') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
        } else if (exportBackground === 'black') {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);
        } else if (exportBackground === 'skin') {
            ctx.fillStyle = '#DEC0A7';
            ctx.fillRect(0, 0, width, height);
            // Add subtle procedural stipple grain
            ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
            for (let i = 0; i < width; i += 12 * scale) {
                for (let j = 0; j < height; j += 12 * scale) {
                    if ((i + j) % 24 === 0) {
                        ctx.fillRect(i, j, 2 * scale, 2 * scale);
                    }
                }
            }
        }
        // If transparent, canvas is already cleared to alpha 0

        // Handle horizontal mirroring if enabled
        ctx.save();
        if (isMirrored) {
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
        }

        // Stencil outline vs solid fill
        const stencilColorHex = stencil.color === 'purple' ? '#5B2C82' : '#1A365D';
        const textColor = exportBackground === 'black' ? '#FFFFFF' : '#111111';

        if (stencil.enabled) {
            ctx.strokeStyle = stencilColorHex;
            ctx.lineWidth = stencil.weight * 2.5 * scale;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
        } else {
            ctx.fillStyle = textColor;
        }

        // Calculate typography sizing relative to canvas width
        const baseFontSize = (fontSize / 48) * 160 * scale;
        ctx.font = `normal ${baseFontSize}px "${font.name}", sans-serif`;
        ctx.textBaseline = 'middle';

        // Letter spacing support
        const charSpacing = letterSpacing * 3 * scale;
        if ('letterSpacing' in ctx) {
            (ctx as unknown as { letterSpacing: string }).letterSpacing = `${charSpacing}px`;
        }

        const trimmedText = text.trim();

        if (curveBend === 0) {
            // Flat Layout with Multi-line Alignment and Staggering
            ctx.textAlign = textAlignment;
            const lines = trimmedText.split('\n');
            const totalLines = lines.length;
            const lineSpacingPx = baseFontSize * lineHeight;
            const startY = (height / 2) - ((totalLines - 1) * lineSpacingPx / 2);

            const baseAnchorX = textAlignment === 'center'
                ? width / 2
                : textAlignment === 'left'
                    ? width * 0.08
                    : width * 0.92;

            lines.forEach((line, index) => {
                const lineX = baseAnchorX + (lineStagger * index * scale);
                const lineY = startY + (index * lineSpacingPx);

                if (stencil.enabled) {
                    ctx.strokeText(line, lineX, lineY);
                } else {
                    ctx.fillText(line, lineX, lineY);
                }
            });
        } else {
            // Curved / Arc Layout along quadratic curve
            ctx.textAlign = 'center';
            const p0x = width * 0.1;
            const p2x = width * 0.9;
            const midY = height * 0.5;
            const bendFactor = (curveBend / 80) * (height * 0.3);

            const p0y = midY + bendFactor * 0.7;
            const p1x = width * 0.5;
            const p1y = midY - bendFactor * 1.3;
            const p2y = midY + bendFactor * 0.7;

            // Approximate curve points for character placement
            const numChars = trimmedText.length;
            if (numChars > 0) {
                const charWidths: number[] = [];
                let totalWidth = 0;
                for (let i = 0; i < numChars; i++) {
                    const char = trimmedText[i];
                    const w = ctx.measureText(char).width + charSpacing;
                    charWidths.push(w);
                    totalWidth += w;
                }

                const tSpread = Math.min(0.8, (totalWidth / width) * 0.9);
                const tStart = 0.5 - (tSpread / 2);
                const tStep = totalWidth > 0 ? tSpread / numChars : 0;

                for (let i = 0; i < numChars; i++) {
                    const tVal = tStart + (i + 0.5) * tStep;
                    const oneMinusT = 1 - tVal;

                    const bx = (oneMinusT * oneMinusT * p0x) + (2 * oneMinusT * tVal * p1x) + (tVal * tVal * p2x);
                    const by = (oneMinusT * oneMinusT * p0y) + (2 * oneMinusT * tVal * p1y) + (tVal * tVal * p2y);

                    const dx = 2 * oneMinusT * (p1x - p0x) + 2 * tVal * (p2x - p1x);
                    const dy = 2 * oneMinusT * (p1y - p0y) + 2 * tVal * (p2y - p1y);
                    const angle = Math.atan2(dy, dx);

                    ctx.save();
                    ctx.translate(bx, by);
                    ctx.rotate(angle);

                    if (stencil.enabled) {
                        ctx.strokeText(trimmedText[i], 0, 0);
                    } else {
                        ctx.fillText(trimmedText[i], 0, 0);
                    }
                    ctx.restore();
                }
            }
        }

        ctx.restore();

        // Export data URL for visual preview
        setPreviewUrl(canvas.toDataURL('image/png'));
        setIsGenerating(false);
    }, [isOpen, font, text, fontSize, letterSpacing, lineHeight, curveBend, exportBackground, resolution, stencil, isMirrored, textAlignment, lineStagger]);

    useEffect(() => {
        if (isOpen && font) {
            generatePreview();
        }
    }, [isOpen, font, generatePreview]);

    const handleDownloadPng = () => {
        if (!previewUrl || !font || text.trim().length === 0) return;
        const link = document.createElement('a');
        const sanitizedFont = font.name.replace(/\s+/g, '-').toLowerCase();
        const modeSuffix = stencil.enabled ? `-stencil-${stencil.color}` : '';
        const mirrorSuffix = isMirrored ? '-mirrored' : '';
        link.download = `tattoo-lettering-${sanitizedFont}-${resolution}${modeSuffix}${mirrorSuffix}-${Date.now()}.png`;
        link.href = previewUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
    };

    const handleDownloadSvg = () => {
        const opentypeLib = (window as unknown as { opentype?: { parse: (b: ArrayBuffer) => unknown } }).opentype;

        // If local custom font buffer is present and opentype is loaded:
        if (opentypeLib && font?.fontFileBuffer) {
            try {
                // Vector SVG path export via opentype
                const parsedFont = opentypeLib.parse(font.fontFileBuffer) as {
                    getPath: (t: string, x: number, y: number, s: number) => {
                        toPathData: () => string;
                        getBoundingBox: () => { x1: number; y1: number; x2: number; y2: number };
                    };
                };
                const glyphs = parsedFont.getPath(text, 0, 0, 72);
                const pathData = glyphs.toPathData();
                // Size the canvas to the lettering itself, so long text is never cropped.
                const bb = glyphs.getBoundingBox();
                const pad = 24;
                const vbW = Math.ceil(bb.x2 - bb.x1 + pad * 2);
                const vbH = Math.ceil(bb.y2 - bb.y1 + pad * 2);
                const strokeAttr = stencil.enabled
                    ? `stroke="${stencil.color === 'purple' ? '#5B2C82' : '#1A365D'}" stroke-width="${stencil.weight}" fill="none"`
                    : `fill="#000000"`;
                const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${Math.floor(bb.x1 - pad)} ${Math.floor(bb.y1 - pad)} ${vbW} ${vbH}" width="${vbW}" height="${vbH}">
  <path d="${pathData}" ${strokeAttr} />
</svg>`;
                const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `tattoo-lettering-${font.name.toLowerCase()}-vector.svg`;
                link.click();
                URL.revokeObjectURL(url);
                return;
            } catch (err) {
                console.error('Vector glyph export error:', err);
            }
        }

        // Show opentype security vendor requirement notice
        setSvgNoticeOpen(true);
    };

    if (!isOpen || !font) return null;

    const currentDim = dimensions[resolution];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl max-w-4xl w-full p-6 relative flex flex-col max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl"
                    aria-label={t('download.cancel', language)}
                >
                    <X size={22} />
                </button>

                <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">
                    {t('download.title', language)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-5">
                    {font.name} - {currentDim.width} x {currentDim.height} px ({resolution.toUpperCase()})
                    {stencil.enabled && ` | ${t('stencil.hollow', language)} (${t(`stencil.weight${stencil.weight}`, language)})`}
                    {isMirrored && ` | ${t('mirror.mirrored', language)}`}
                </p>

                {/* Validation Notice if text is empty */}
                {text.trim().length === 0 && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{t('download.validationError', language)}</span>
                    </div>
                )}

                {/* Options Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    {/* Resolution Choice */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            {t('download.resLabel', language)}:
                        </label>
                        <div className="space-y-1.5">
                            <button
                                type="button"
                                onClick={() => setResolution('standard')}
                                className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all ${resolution === 'standard'
                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium'
                                    : 'border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {t('download.resStandard', language)}
                            </button>
                            <button
                                type="button"
                                onClick={() => setResolution('print')}
                                className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all ${resolution === 'print'
                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium'
                                    : 'border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {t('download.resPrint', language)}
                            </button>
                            <button
                                type="button"
                                onClick={() => setResolution('master')}
                                className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all ${resolution === 'master'
                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium'
                                    : 'border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {t('download.resMaster', language)}
                            </button>
                        </div>
                    </div>

                    {/* Background Choice */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                            {t('download.bgLabel', language)}:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setExportBackground('transparent')}
                                className={`px-3 py-2.5 rounded-lg text-xs border transition-all ${exportBackground === 'transparent'
                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium'
                                    : 'border-gray-200 dark:border-[#333] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222]'
                                }`}
                            >
                                {t('bg.transparent', language)}
                            </button>
                            <button
                                type="button"
                                onClick={() => setExportBackground('white')}
                                className={`px-3 py-2.5 rounded-lg text-xs border transition-all ${exportBackground === 'white'
                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium'
                                    : 'border-gray-200 dark:border-[#333] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222]'
                                }`}
                            >
                                {t('bg.white', language)}
                            </button>
                            <button
                                type="button"
                                onClick={() => setExportBackground('black')}
                                className={`px-3 py-2.5 rounded-lg text-xs border transition-all ${exportBackground === 'black'
                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium'
                                    : 'border-gray-200 dark:border-[#333] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222]'
                                }`}
                            >
                                {t('bg.black', language)}
                            </button>
                            <button
                                type="button"
                                onClick={() => setExportBackground('skin')}
                                className={`px-3 py-2.5 rounded-lg text-xs border transition-all ${exportBackground === 'skin'
                                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium'
                                    : 'border-gray-200 dark:border-[#333] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222]'
                                }`}
                            >
                                {t('bg.skin', language)}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hidden canvas for high-resolution render */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Preview Image Container */}
                <div className="bg-checkered-pattern rounded-xl overflow-hidden border border-gray-200 dark:border-[#333] mb-5 min-h-[180px] flex items-center justify-center p-3">
                    {isGenerating ? (
                        <div className="flex flex-col items-center gap-2 text-purple-600 dark:text-purple-400 py-8">
                            <Loader2 className="animate-spin" size={28} />
                            <span className="text-xs">{t('download.rendering', language)}</span>
                        </div>
                    ) : previewUrl ? (
                        <img
                            src={previewUrl}
                            alt={t('download.previewAlt', language).replace('{name}', font.name)}
                            className="max-w-full max-h-[220px] object-contain shadow-sm"
                        />
                    ) : null}
                </div>

                {/* SVG Status or Policy Notice */}
                {svgNoticeOpen && (
                    <div className="mb-4 p-3.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 rounded-xl text-xs text-blue-900 dark:text-blue-200 leading-relaxed flex items-start gap-2">
                        <AlertCircle size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                            {t('download.svgVendorMissing', language)}
                        </div>
                    </div>
                )}

                {/* Actions Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-[#282828]">
                    {/* Vector paths need the font's own file, which only an uploaded studio font has.
                        opentype.js 1.x reads TrueType and OpenType, not WOFF2 (signature 'wOF2'). */}
                    {font.fontFileBuffer && new TextDecoder().decode(new Uint8Array(font.fontFileBuffer, 0, 4)) !== 'wOF2' ? (
                    <button
                        type="button"
                        onClick={handleDownloadSvg}
                        disabled={isGenerating || text.trim().length === 0}
                        className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] text-xs font-semibold bg-gray-100 dark:bg-[#252525] text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                        title={t('download.svgNotice', language)}
                    >
                        <FileCode size={15} />
                        <span>{t('download.svgBtn', language)}</span>
                    </button>
                    ) : <span />}

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] text-xs font-semibold bg-gray-100 dark:bg-[#242424] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2d2d2d] transition-colors"
                        >
                            {t('download.cancel', language)}
                        </button>
                        <button
                            type="button"
                            onClick={handleDownloadPng}
                            disabled={isGenerating || text.trim().length === 0}
                            className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-purple-900/20"
                        >
                            <Download size={16} />
                            <span>{t('download.btn', language)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadModal;
