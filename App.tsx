import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import MoreTools from './components/MoreTools';
import EmbedModal from './components/EmbedModal';
import FontPreview from './components/FontPreview';
import TextInput from './components/TextInput';
import FontFilters from './components/FontFilters';
import './index.css';

const App: React.FC = () => {
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

    // Check if running in iframe
    const [isEmbedded, setIsEmbedded] = useState(false);

    useEffect(() => {
        setIsEmbedded(window.self !== window.top);
    }, []);

    return (
        <div className={`min-h-screen bg-white dark:bg-[#0D0D0D] text-[#1A1A1A] dark:text-white flex flex-col ${isEmbedded ? 'embedded' : ''}`}>
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isEmbedded={isEmbedded} />

            <div className="flex-grow">
                {/* Hero Section with 3 Buttons - Only show if NOT embedded, or simplified */}
                {!isEmbedded && (
                    <section className="bg-gray-50 dark:bg-[#1A1A1A] py-8">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                                <a
                                    href='https://ko-fi.com/C0C81NEXBV'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className="px-6 py-3 bg-white text-[#1A1A1A] rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all font-medium shadow-sm hover:shadow-md"
                                >
                                    ☕ Buy me a coffee
                                </a>

                                <a
                                    href="https://poliinternational.com/tattoo-font-previewer-documentation/"
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
                                >
                                    📄 View Documentation
                                </a>

                                <button
                                    onClick={() => setIsEmbedModalOpen(true)}
                                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-lg hover:from-pink-600 hover:to-pink-800 transition-all font-medium shadow-md hover:shadow-lg"
                                >
                                    &lt;/&gt; Embed Tool
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Controls Section */}
                <section className="max-w-7xl mx-auto px-4 py-8">
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
                <main className="max-w-7xl mx-auto px-4 py-8">
                    <FontPreview
                        text={text}
                        fontSize={fontSize}
                        category={category}
                        backgroundColor={backgroundColor}
                    />
                </main>
            </div>

            {/* Additional Sections - Hide when embedded */}
            {!isEmbedded && <MoreTools />}
            {!isEmbedded && <Footer />}

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
        <App />
    </React.StrictMode>
);
