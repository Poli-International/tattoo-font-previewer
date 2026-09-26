import React from 'react';
import { SupportedLanguage } from '../types';
import { t } from '../i18n';

interface FooterProps {
    language: SupportedLanguage;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
    return (
        <footer id="footer-tattoo-font-previewer" className="bg-gray-100 dark:bg-[#141414] border-t border-gray-200 dark:border-[#242424] mt-12 py-10 no-print">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Poli International Mark */}
                <div className="flex flex-col items-center justify-center mb-5">
                    <div className="font-extrabold tracking-wider text-lg text-gray-900 dark:text-white uppercase flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black text-xs">P</span>
                        <span>POLI INTERNATIONAL</span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1">
                        Professional Body Art Tools & Engineering
                    </span>
                </div>

                <div className="mb-5 flex justify-center">
                    <a
                        href="https://ko-fi.com/C0C81NEXBV"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 min-h-[44px] bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold text-xs shadow-sm transition-colors"
                    >
                        <span>☕</span>
                        <span>{t('footer.coffee', language)}</span>
                    </a>
                </div>

                <div className="flex justify-center gap-4 md:gap-6 mb-5 text-xs flex-wrap text-gray-600 dark:text-gray-400">
                    <a href="https://poliinternational.com/about/" target="_top" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2 px-1 min-h-[44px] inline-flex items-center">
                        {t('footer.about', language)}
                    </a>
                    <a href="https://poliinternational.com/tools/" target="_top" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2 px-1 min-h-[44px] inline-flex items-center">
                        {t('footer.allTools', language)}
                    </a>
                    <a href="https://poliinternational.com/privacy-policy/" target="_top" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2 px-1 min-h-[44px] inline-flex items-center">
                        {t('footer.privacy', language)}
                    </a>
                    <a href="https://poliinternational.com/terms-of-service/" target="_top" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2 px-1 min-h-[44px] inline-flex items-center">
                        {t('footer.terms', language)}
                    </a>
                    <a href="https://poliinternational.com/contact/" target="_top" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2 px-1 min-h-[44px] inline-flex items-center">
                        {t('footer.contact', language)}
                    </a>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {t('footer.rights', language)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('footer.tagline', language)}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
