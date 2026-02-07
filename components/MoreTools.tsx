import React from 'react';

const MoreTools: React.FC = () => {
    return (
        <section className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-[#1A1A1A] dark:text-white">Related Tattoo Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="https://poliinternational.com/tattoo-price-estimator/"
                        className="group block p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 hover:shadow-xl transition-all bg-white dark:bg-[#1A1A1A]">
                        <div className="text-4xl mb-3">💰</div>
                        <h3 className="font-bold text-xl mb-2 text-[#1A1A1A] dark:text-white group-hover:text-purple-600">Tattoo Pricing Calculator</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Calculate accurate tattoo costs with AI-powered pricing estimates based on size, complexity, and location</p>
                    </a>

                    <a href="https://poliinternational.com/tools/stencil-calculator/"
                        className="group block p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 hover:shadow-xl transition-all bg-white dark:bg-[#1A1A1A]">
                        <div className="text-4xl mb-3">📏</div>
                        <h3 className="font-bold text-xl mb-2 text-[#1A1A1A] dark:text-white group-hover:text-purple-600">Tattoo Stencil Calculator</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Calculate proper stencil sizes with curvature compensation for perfect tattoo placement on body curves</p>
                    </a>

                    <a href="https://poliinternational.com/tools/ink-mixer/"
                        className="group block p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 hover:shadow-xl transition-all bg-white dark:bg-[#1A1A1A]">
                        <div className="text-4xl mb-3">🎨</div>
                        <h3 className="font-bold text-xl mb-2 text-[#1A1A1A] dark:text-white group-hover:text-purple-600">Tattoo Ink Color Mixer</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Create custom tattoo ink formulas, save recipes, and experiment with color combinations for perfect results</p>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default MoreTools;
