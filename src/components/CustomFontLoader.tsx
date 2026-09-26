import React, { useRef, useState } from 'react';
import { Upload, ShieldCheck, FileText, Trash2, CheckCircle2 } from 'lucide-react';
import { TattooFont, SupportedLanguage } from '../types';
import { t } from '../i18n';

interface CustomFontLoaderProps {
    customFonts: TattooFont[];
    onAddCustomFont: (font: TattooFont) => void;
    onRemoveCustomFont: (fontName: string) => void;
    language: SupportedLanguage;
}

const CustomFontLoader: React.FC<CustomFontLoaderProps> = ({
    customFonts,
    onAddCustomFont,
    onRemoveCustomFont,
    language
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const handleFile = async (file: File) => {
        const validExtensions = ['.ttf', '.otf', '.woff2'];
        const fileNameLower = file.name.toLowerCase();
        const hasValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));

        if (!hasValidExt) {
            setStatusMessage(t('customFont.invalidFile', language));
            return;
        }

        try {
            // Read array buffer for native FontFace
            const buffer = await file.arrayBuffer();
            const rawName = file.name.replace(/\.[^/.]+$/, '').trim();
            // Sanitize font name for CSS font-family
            const sanitizedName = rawName.replace(/[^a-zA-Z0-9_\-\s]/g, '') || `StudioFont_${Date.now()}`;

            const fontFace = new FontFace(sanitizedName, buffer);
            await fontFace.load();
            document.fonts.add(fontFace);

            const newFont: TattooFont = {
                name: sanitizedName,
                category: 'custom',
                googleFont: '',
                description: 'Custom font loaded locally via FontFace API',
                tag: t('customFont.customTag', language),
                isCustom: true,
                fontFileBuffer: buffer
            };

            onAddCustomFont(newFont);
            setStatusMessage(null);
        } catch (err) {
            console.error('Failed to parse font file locally:', err);
            setStatusMessage(t('customFont.parseError', language));
        }
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1A1A1A] p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-[#262626] mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                    <FileText size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {t('customFont.title', language)}
                    </h4>
                </div>

                {/* Honest Client-Side Privacy Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
                    <ShieldCheck size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{t('customFont.privacyBadge', language)}</span>
                </div>
            </div>

            {/* Privacy Explanation Callout */}
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {t('customFont.privacyNotice', language)}
            </p>

            {/* Drag & Drop Zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 ${isDragging
                    ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/20'
                    : 'border-gray-200 dark:border-[#333] hover:border-purple-400 dark:hover:border-purple-500 bg-gray-50/50 dark:bg-[#202020]'
                }`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            handleFile(e.target.files[0]);
                        }
                    }}
                    accept=".ttf,.otf,.woff2"
                    className="hidden"
                />

                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                    <Upload size={18} />
                </div>

                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {t('customFont.dropzone', language)}
                </div>

                <div className="text-[10px] text-gray-500 dark:text-gray-400">
                    {t('customFont.supportedFormats', language)}
                </div>
            </div>

            {statusMessage && (
                <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                    {statusMessage}
                </div>
            )}

            {/* Loaded Custom Fonts List */}
            {customFonts.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#262626]">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                        {t('customFont.loaded', language)} ({customFonts.length}):
                    </span>
                    <div className="space-y-2">
                        {customFonts.map((f) => (
                            <div
                                key={f.name}
                                className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-[#222] rounded-lg border border-gray-200 dark:border-[#2f2f2f]"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                    <span
                                        className="text-sm font-semibold truncate text-gray-900 dark:text-gray-100"
                                        style={{ fontFamily: `"${f.name}", sans-serif` }}
                                    >
                                        {f.name}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onRemoveCustomFont(f.name)}
                                    className="min-h-[44px] px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors flex items-center gap-1 shrink-0"
                                    title={t('customFont.remove', language)}
                                >
                                    <Trash2 size={13} />
                                    <span>{t('customFont.remove', language)}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomFontLoader;
