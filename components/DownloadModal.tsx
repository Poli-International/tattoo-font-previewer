import React, { useRef, useState, useEffect } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { TattooFont } from '../types';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    font: TattooFont | null;
    text: string;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, font, text }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Generate high-res preview when modal opens
    useEffect(() => {
        if (isOpen && font && canvasRef.current) {
            generatePreview();
        }
    }, [isOpen, font, text]);

    const generatePreview = async () => {
        setIsGenerating(true);
        const canvas = canvasRef.current;
        if (!canvas || !font) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // High resolution setup (2400x800)
        canvas.width = 2400;
        canvas.height = 800;

        // Wait for font to ensure it's loaded
        try {
            await document.fonts.load(`100px "${font.name}"`);
        } catch (e) {
            console.error("Font loading error", e);
        }

        // Draw Background (Transparent or White - Defaulting to transparent for PNG utility, but maybe white for visibility?)
        // User requested: "Background color selector (White/Black/Transparent) for preview"
        // But for specific download modal, usually transparent is best, or maybe what the user selected. 
        // The prompt says "Download as PNG (standard quality 2400x800px)".
        // I'll make it transparent background by default for versatility, or maybe add a toggle later.
        // For now, let's just clear rect.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Styling
        ctx.font = `200px "${font.name}"`; // Large size for high res
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000'; // Default black text

        // Draw Text
        // Handle long text ? For now just center it.
        ctx.fillText(text || 'Tattoo Preview', canvas.width / 2, canvas.height / 2);

        // Generate URL
        setPreviewUrl(canvas.toDataURL('image/png'));
        setIsGenerating(false);
    };

    const handleDownload = () => {
        if (!previewUrl || !font) return;
        const link = document.createElement('a');
        link.download = `tattoo-font-${font.name.replace(/\s+/g, '-').toLowerCase()}-preview.png`;
        link.href = previewUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
    };

    if (!isOpen || !font) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl max-w-4xl w-full p-6 relative animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <X size={24} />
                </button>

                <h3 className="text-2xl font-bold mb-2 text-[#1A1A1A] dark:text-white">Download Preview</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    High-quality PNG (2400x800px) with {font.name} font.
                </p>

                {/* Canvas hidden but used for generation */}
                <canvas ref={canvasRef} className="hidden" />

                <div className="bg-checkered rounded-xl overflow-hidden border border-gray-200 dark:border-[#333] mb-6 min-h-[200px] flex items-center justify-center bg-gray-100">
                    {isGenerating ? (
                        <div className="flex flex-col items-center gap-3 text-purple-600">
                            <Loader2 className="animate-spin" size={32} />
                            <span>Rendering high-res preview...</span>
                        </div>
                    ) : previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
                    ) : null}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-100 dark:bg-[#242424] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
                    >
                        <Download size={20} />
                        Download PNG
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadModal;
