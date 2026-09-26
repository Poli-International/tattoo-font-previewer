import React from 'react';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { t } from '../i18n';

interface DocModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: SupportedLanguage;
}

const DocModal: React.FC<DocModalProps> = ({ isOpen, onClose, language }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm no-print" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl max-w-3xl w-full p-6 md:p-8 relative max-h-[85vh] overflow-y-auto custom-scrollbar"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl"
                    aria-label={t('doc.close', language)}
                >
                    <X size={22} />
                </button>

                <div className="flex items-center gap-2.5 mb-2 text-purple-600 dark:text-purple-400">
                    <BookOpen size={22} />
                    <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">
                        {t('doc.title', language)}
                    </h3>
                </div>

                <div className="space-y-6 mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {/* About Section */}
                    <div className="p-4 bg-gray-50 dark:bg-[#222] rounded-xl border border-gray-100 dark:border-[#333]">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {t('doc.aboutTitle', language)}
                        </h4>
                        <p>{t('doc.aboutBody', language)}</p>
                    </div>

                    {/* Categories Section */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {t('doc.catTitle', language)}
                        </h4>
                        <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                            {t('doc.catIntro', language)}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-[#2e2e2e]">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">
                                    {t('doc.catBlackletterTitle', language)}
                                </strong>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('doc.catBlackletterDesc', language)}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-[#2e2e2e]">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">
                                    {t('doc.catScriptTitle', language)}
                                </strong>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('doc.catScriptDesc', language)}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-[#2e2e2e]">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">
                                    {t('doc.catChicanoTitle', language)}
                                </strong>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('doc.catChicanoDesc', language)}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-[#2e2e2e]">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">
                                    {t('doc.catFinelineTitle', language)}
                                </strong>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('doc.catFinelineDesc', language)}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-[#2e2e2e]">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">
                                    {t('doc.catJapaneseTitle', language)}
                                </strong>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('doc.catJapaneseDesc', language)}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-[#2e2e2e]">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">
                                    {t('doc.catChineseTitle', language)}
                                </strong>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('doc.catChineseDesc', language)}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-[#2e2e2e]">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">
                                    {t('doc.catGothicTitle', language)}
                                </strong>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('doc.catGothicDesc', language)}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-200 dark:border-[#2e2e2e]">
                                <strong className="text-purple-600 dark:text-purple-400 block mb-1">
                                    {t('doc.catDecorativeTitle', language)}
                                </strong>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t('doc.catDecorativeDesc', language)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {t('doc.faqTitle', language)}
                        </h4>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-100 dark:border-[#2a2a2a]">
                                <strong className="block text-xs font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                    {t('doc.faq1Q', language)}
                                </strong>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {t('doc.faq1A', language)}
                                </p>
                            </div>

                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-100 dark:border-[#2a2a2a]">
                                <strong className="block text-xs font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                    {t('doc.faq2Q', language)}
                                </strong>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {t('doc.faq2A', language)}
                                </p>
                            </div>

                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-100 dark:border-[#2a2a2a]">
                                <strong className="block text-xs font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                    {t('doc.faq3Q', language)}
                                </strong>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {t('doc.faq3A', language)}
                                </p>
                            </div>

                            <div className="p-3 bg-gray-50 dark:bg-[#202020] rounded-lg border border-gray-100 dark:border-[#2a2a2a]">
                                <strong className="block text-xs font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                    {t('doc.faq4Q', language)}
                                </strong>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {t('doc.faq4A', language)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Link to external static documentation */}
                    <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                const docsTab = document.querySelector('[data-tab="docs"]');
                                if (docsTab) (docsTab as HTMLElement).click();
                            }}
                            className="text-purple-600 dark:text-purple-400 hover:underline min-h-[44px] flex items-center gap-1 font-medium text-left"
                        >
                            <span>{t('doc.viewTabDocs', language)}</span>
                            <ExternalLink size={14} />
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-2.5 min-h-[44px] bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
                        >
                            {t('doc.close', language)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocModal;
