import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import EmbedModal from './components/EmbedModal';
import FontPreview from './components/FontPreview';
import TextInput from './components/TextInput';
import FontFilters from './components/FontFilters';
import './index.css';

const EmbedApp: React.FC = () => {
    const DARK_MODE_KEY = 'poli-dark-mode';
    const DEFAULT_MODE = 'dark';

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem(DARK_MODE_KEY);
        return stored !== null ? stored === 'dark' : DEFAULT_MODE === 'dark';
    });

    const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
    const [text, setText] = useState('Tattoo Art');
    const [fontSize, setFontSize] = useState(48);
    const [category, setCategory] = useState('all');
    const [backgroundColor, setBackgroundColor] = useState('white');

    // Dark mode effect - applies to documentElement AND body
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        if (isDarkMode) {
            root.classList.add('dark');
            root.style.backgroundColor = '#0D0D0D';
            body.style.backgroundColor = '#0D0D0D';
            localStorage.setItem(DARK_MODE_KEY, 'dark');
        } else {
            root.classList.remove('dark');
            root.style.backgroundColor = '#FFFFFF';
            body.style.backgroundColor = '#FFFFFF';
            localStorage.setItem(DARK_MODE_KEY, 'light');
        }
    }, [isDarkMode]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0D0D0D] text-[#1A1A1A] dark:text-white">
            {/* Header with Breadcrumbs and Dark Mode Toggle */}
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isEmbedded={true} />

            {/* Hero Section with 3 Buttons */}
            <section className="bg-gray-50 dark:bg-[#1A1A1A] py-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                        {/* Ko-fi Button - CRITICAL: Use exact link */}
                        <a
                            href='https://ko-fi.com/C0C81NEXBV'
                            target='_blank'
                            rel='noopener noreferrer'
                            className="px-6 py-3 bg-white text-[#1A1A1A] rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all font-medium shadow-sm hover:shadow-md"
                        >
                            ☕ Buy me a coffee
                        </a>

                        {/* Documentation Button */}
                        <a
                            href="https://poliinternational.com/tattoo-font-previewer-documentation/"
                            target='_blank'
                            rel='noopener noreferrer'
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
                        >
                            📄 View Documentation
                        </a>

                        {/* Embed Button */}
                        <button
                            onClick={() => setIsEmbedModalOpen(true)}
                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg hover:from-pink-600 hover:to-pink-800 transition-all font-medium shadow-md hover:shadow-lg"
                        >
                            &lt;/&gt; Embed Tool
                        </button>
                    </div>
                </div>
            </section>

            {/* Controls Section */}
            <section className="container mx-auto px-4 py-8">
                <TextInput
                    text={text}
                    setText={setText}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColor}
                />

                <FontFilters
                    category={category}
                    setCategory={setCategory}
                />
            </section>

            {/* Main Font Preview Grid */}
            <main className="container mx-auto px-4 py-8">
                <FontPreview
                    text={text}
                    fontSize={fontSize}
                    category={category}
                    backgroundColor={backgroundColor}
                />
            </main>

            {/* Modals */}
            <EmbedModal
                isOpen={isEmbedModalOpen}
                onClose={() => setIsEmbedModalOpen(false)}
            />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <EmbedApp />
    </React.StrictMode>
);
