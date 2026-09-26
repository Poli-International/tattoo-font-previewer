import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { t } from '../i18n';

interface EmbedModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: SupportedLanguage;
}

const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose, language }) => {
    const [copied, setCopied] = useState(false);

    // Follows Ban 18: absolute URL https://poliinternational.com/tools/<slug>/index.html
    const embedCode = '<iframe src="https://poliinternational.com/tools/tattoo-font-previewer/index.html" width="100%" height="1000" frameborder="0" style="border-radius: 12px;"></iframe>';

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm no-print" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl"
                    aria-label={t('embed.close', language)}
                >
                    <X size={22} />
                </button>

                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A] dark:text-white">
                    {t('embed.title', language)}
                </h3>
                <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
                    {t('embed.desc', language)}
                </p>

                <div className="relative mb-5">
                    <textarea
                        readOnly
                        value={embedCode}
                        className="w-full h-28 p-3.5 pr-14 text-xs font-mono bg-gray-50 dark:bg-[#0D0D0D] border border-gray-200 dark:border-[#333] rounded-xl text-gray-800 dark:text-gray-200 resize-none focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute top-2.5 right-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white dark:bg-[#242424] rounded-lg shadow-sm border border-gray-200 dark:border-[#444] text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        title={t('embed.copy', language)}
                        aria-label={t('embed.copy', language)}
                    >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t('embed.previewNotice', language)}
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium text-sm transition-colors flex items-center justify-center"
                    >
                        {t('embed.done', language)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmbedModal;
