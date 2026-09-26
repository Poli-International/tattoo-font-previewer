import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { LANGUAGE_OPTIONS, t } from '../i18n';

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    language: SupportedLanguage;
    setLanguage: (lang: SupportedLanguage) => void;
    isEmbedded?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    isDarkMode,
    setIsDarkMode,
    language,
    setLanguage,
    isEmbedded
}) => {
    return (
        <header className={`bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#242424] no-print ${isEmbedded ? 'py-2' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
                {/* Breadcrumb Navigation - Hide in Embed */}
                {!isEmbedded && (
                    <nav aria-label={t('nav.breadcrumb', language)} className="text-xs sm:text-sm mb-2.5">
                        <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <a itemProp="item" href="https://poliinternational.com" target="_top" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-1 inline-block">
                                    <span itemProp="name">{t('nav.home', language)}</span>
                                </a>
                                <meta itemProp="position" content="1" />
                            </li>
                            <span className="text-gray-400">»</span>
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <a itemProp="item" href="https://poliinternational.com/tools/" target="_top" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-1 inline-block">
                                    <span itemProp="name">{t('nav.tools', language)}</span>
                                </a>
                                <meta itemProp="position" content="2" />
                            </li>
                            <span className="text-gray-400">»</span>
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <span itemProp="name" className="text-gray-500 dark:text-gray-400">{t('app.title', language)}</span>
                                <meta itemProp="position" content="3" />
                            </li>
                        </ol>
                    </nav>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                        <h1 className={`font-bold text-[#1A1A1A] dark:text-white ${isEmbedded ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'} tracking-tight`}>
                            {t('app.title', language)}
                        </h1>
                        {!isEmbedded && (
                            <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-2xl leading-normal">
                                {t('app.subtitle', language)}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* Language Selector Dropdown with >= 44px touch target */}
                        <div className="min-h-[44px] flex items-center gap-1.5 bg-gray-100 dark:bg-[#242424] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#333]">
                            <Globe size={16} className="text-gray-600 dark:text-gray-400 shrink-0" />
                            <label htmlFor="language-selector" className="sr-only">
                                {t('lang.select', language)}
                            </label>
                            <select
                                id="language-selector"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                                className="bg-transparent text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer py-1"
                                aria-label={t('lang.select', language)}
                            >
                                {LANGUAGE_OPTIONS.map((opt) => (
                                    <option key={opt.code} value={opt.code} className="bg-white dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200">
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dark Mode Toggle with >= 44px touch target */}
                        <button
                            type="button"
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="min-w-[44px] min-h-[44px] rounded-xl bg-gray-100 dark:bg-[#242424] hover:bg-gray-200 dark:hover:bg-[#2e2e2e] text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center border border-gray-200 dark:border-[#333]"
                            aria-label={t('theme.toggle', language)}
                            title={t('theme.toggle', language)}
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
