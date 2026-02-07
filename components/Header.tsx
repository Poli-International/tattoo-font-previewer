import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    isEmbedded?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode, isEmbedded }) => {
    return (
        <header className={`bg-white dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#242424] ${isEmbedded ? 'py-2' : ''}`}>
            <div className="container mx-auto px-4 py-4">
                {/* Breadcrumb Navigation - SEO CRITICAL (Hide in Embed) */}
                {!isEmbedded && (
                    <nav aria-label="Breadcrumb" className="text-sm mb-4">
                        <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex items-center gap-2">
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <a itemProp="item" href="https://poliinternational.com" className="hover:text-purple-600">
                                    <span itemProp="name">Home</span>
                                </a>
                                <meta itemProp="position" content="1" />
                            </li>
                            <span className="text-gray-400">»</span>
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <a itemProp="item" href="https://poliinternational.com/tools/" className="hover:text-purple-600">
                                    <span itemProp="name">Tools</span>
                                </a>
                                <meta itemProp="position" content="2" />
                            </li>
                            <span className="text-gray-400">»</span>
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <span itemProp="name" className="text-gray-600 dark:text-gray-400">Tattoo Font Previewer</span>
                                <meta itemProp="position" content="3" />
                            </li>
                        </ol>
                    </nav>
                )}

                {/* H1 with Primary Keyword or Simple Title */}
                <div className={`flex items-center ${isEmbedded ? 'justify-center' : 'justify-between'}`}>
                    <h1 className={`font-bold text-[#1A1A1A] dark:text-white ${isEmbedded ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
                        Tattoo Font Previewer
                    </h1>

                    {/* Dark Mode Toggle - always visible */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-lg bg-gray-100 dark:bg-[#242424] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] ${isEmbedded ? 'ml-4' : ''}`}
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Description - Only if NOT embedded (save space) */}
                {!isEmbedded && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Preview text in 50+ professional tattoo fonts including blackletter, script, gothic, and decorative styles. Free tool for tattoo artists and enthusiasts.
                    </p>
                )}
            </div>
        </header>
    );
};

export default Header;
