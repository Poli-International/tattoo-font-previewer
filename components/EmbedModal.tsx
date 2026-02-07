import React from 'react';
import { X, Copy, Check } from 'lucide-react';

interface EmbedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose }) => {
    const [copied, setCopied] = React.useState(false);

    // The exact embed code from the request
    const embedCode = '<iframe src="https://poliinternational.com/wp-content/standalone-tools/tattoo-font-previewer/embed.html" width="100%" height="1400" frameborder="0" style="border:none; border-radius: 1rem;"></iframe>';

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 relative animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <X size={24} />
                </button>

                <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A] dark:text-white">Embed Tattoo Font Previewer</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Want to add this tool to your own website? Copy and paste the code below to embed the full Tattoo Font Previewer for free.
                </p>

                <div className="relative mb-6">
                    <textarea
                        readOnly
                        value={embedCode}
                        className="w-full h-32 p-4 pr-12 text-sm font-mono bg-gray-50 dark:bg-[#0D0D0D] border border-gray-200 dark:border-[#333] rounded-xl text-gray-800 dark:text-gray-200 resize-none focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 bg-white dark:bg-[#242424] rounded-lg shadow-sm border border-gray-200 dark:border-[#444] text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </button>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleCopy}
                        className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                    >
                        {copied ? 'Copied!' : 'Copy Embed Code'}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-100 dark:bg-[#242424] text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmbedModal;
