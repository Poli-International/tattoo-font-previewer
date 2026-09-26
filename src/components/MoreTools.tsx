import React from 'react';
import { SupportedLanguage } from '../types';
import { t } from '../i18n';

interface MoreToolsProps {
    language: SupportedLanguage;
}

const MoreTools: React.FC<MoreToolsProps> = ({ language }) => {
    return (
        <section className="bg-white dark:bg-[#151515] border-t border-gray-200 dark:border-[#242424] py-12 no-print">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center text-[#1A1A1A] dark:text-white">
                    {t('moreTools.title', language)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a
                        href="https://poliinternational.com/tattoo-price-estimator/"
                        target="_top"
                        className="group block p-6 border border-gray-200 dark:border-[#2a2a2a] rounded-xl hover:border-purple-500 hover:shadow-lg transition-all bg-white dark:bg-[#1A1A1A]"
                    >
                        <h3 className="font-bold text-lg mb-2 text-[#1A1A1A] dark:text-white group-hover:text-purple-600 transition-colors">
                            {t('moreTools.pricingTitle', language)}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {t('moreTools.pricingDesc', language)}
                        </p>
                    </a>

                    <a
                        href="https://poliinternational.com/stencil-calculator/"
                        target="_top"
                        className="group block p-6 border border-gray-200 dark:border-[#2a2a2a] rounded-xl hover:border-purple-500 hover:shadow-lg transition-all bg-white dark:bg-[#1A1A1A]"
                    >
                        <h3 className="font-bold text-lg mb-2 text-[#1A1A1A] dark:text-white group-hover:text-purple-600 transition-colors">
                            {t('moreTools.stencilTitle', language)}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {t('moreTools.stencilDesc', language)}
                        </p>
                    </a>

                    <a
                        href="https://poliinternational.com/ink-mixer/"
                        target="_top"
                        className="group block p-6 border border-gray-200 dark:border-[#2a2a2a] rounded-xl hover:border-purple-500 hover:shadow-lg transition-all bg-white dark:bg-[#1A1A1A]"
                    >
                        <h3 className="font-bold text-lg mb-2 text-[#1A1A1A] dark:text-white group-hover:text-purple-600 transition-colors">
                            {t('moreTools.inkTitle', language)}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {t('moreTools.inkDesc', language)}
                        </p>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default MoreTools;
