import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer id="footer-tattoo-font-previewer-unique" className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12 py-12">
            <div className="container mx-auto px-4 text-center">
                <img
                    src="https://poliinternational.com/wp-content/uploads/2024/11/Poli-International-Co.webp"
                    alt="Poli International - Professional Tattoo and Piercing Tools"
                    className="mx-auto mb-6 h-[60px] w-auto"
                    loading="lazy"
                />

                <div className="mb-6 flex justify-center">
                    <a href='https://ko-fi.com/C0C81NEXBV' target='_blank' rel='noopener noreferrer' className="hover:opacity-90 transition-opacity">
                        <img
                            height='36'
                            style={{ height: '36px', border: '0px' }}
                            src='https://storage.ko-fi.com/cdn/kofi2.png?v=3'
                            alt='Buy Me a Coffee at ko-fi.com'
                            loading="lazy"
                        />
                    </a>
                </div>

                <div className="flex justify-center gap-4 md:gap-8 mb-6 text-sm flex-wrap text-gray-600 dark:text-gray-400">
                    <a href="https://poliinternational.com/about/" className="hover:text-purple-600 transition-colors">About Us</a>
                    <a href="https://poliinternational.com/tools/" className="hover:text-purple-600 transition-colors">All Tools</a>
                    <a href="https://poliinternational.com/privacy-policy/" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
                    <a href="https://poliinternational.com/terms-of-service/" className="hover:text-purple-600 transition-colors">Terms of Service</a>
                    <a href="https://poliinternational.com/contact/" className="hover:text-purple-600 transition-colors">Contact</a>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    © 2025 Poli International Co., Ltd. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Professional tattoo and piercing tools since 2008 | Based in Thailand 🇹🇭
                </p>
            </div>
        </footer>
    );
};

export default Footer;
