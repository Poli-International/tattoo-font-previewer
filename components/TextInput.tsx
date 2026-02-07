import React from 'react';
import { Type, Minus, Plus } from 'lucide-react';
import { SIZE_PRESETS } from '../constants';

interface TextInputProps {
    text: string;
    setText: (text: string) => void;
    fontSize: number;
    setFontSize: (size: number) => void;
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
    text, setText, fontSize, setFontSize, backgroundColor, setBackgroundColor
}) => {
    return (
        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-[#242424]">
            {/* Main Text Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Tattoo Text
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Type className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your tattoo text here..."
                        className="block w-full pl-10 pr-3 py-4 text-lg border border-gray-300 dark:border-[#333] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-[#242424] text-[#1A1A1A] dark:text-white transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Font Size Controls */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Font Size: {fontSize}px
                    </label>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setFontSize(Math.max(12, fontSize - 4))}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-[#333] hover:bg-gray-200 dark:hover:bg-[#444] text-gray-600 dark:text-gray-300"
                            aria-label="Decrease font size"
                        >
                            <Minus size={16} />
                        </button>
                        <input
                            type="range"
                            min="12"
                            max="144"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 dark:bg-[#333] rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <button
                            onClick={() => setFontSize(Math.min(144, fontSize + 4))}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-[#333] hover:bg-gray-200 dark:hover:bg-[#444] text-gray-600 dark:text-gray-300"
                            aria-label="Increase font size"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    {/* Quick Size Presets */}
                    <div className="flex gap-2 mt-3">
                        {SIZE_PRESETS.map((preset) => (
                            <button
                                key={preset.label}
                                onClick={() => setFontSize(preset.value)}
                                className={`px-3 py-1 text-xs rounded-full border transition-colors ${fontSize === preset.value
                                        ? 'bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                                        : 'bg-transparent border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'
                                    }`}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Background Color Controls */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preview Background
                    </label>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setBackgroundColor('white')}
                            className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 ${backgroundColor === 'white'
                                    ? 'border-purple-500 ring-1 ring-purple-500 bg-white text-gray-900'
                                    : 'border-gray-200 dark:border-[#333] bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <div className="w-4 h-4 rounded-full border border-gray-300 bg-white"></div>
                            White
                        </button>
                        <button
                            onClick={() => setBackgroundColor('black')}
                            className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 ${backgroundColor === 'black'
                                    ? 'border-purple-500 ring-1 ring-purple-500 bg-gray-900 text-white'
                                    : 'border-gray-200 dark:border-[#333] bg-gray-900 text-gray-300 hover:bg-gray-800'
                                }`}
                        >
                            <div className="w-4 h-4 rounded-full border border-gray-600 bg-black"></div>
                            Black
                        </button>
                        <button
                            onClick={() => setBackgroundColor('transparent')}
                            className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 ${backgroundColor === 'transparent'
                                    ? 'border-purple-500 ring-1 ring-purple-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                    : 'border-gray-200 dark:border-[#333] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                                }`}
                        >
                            <div className="w-4 h-4 rounded-full border border-gray-300 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8wCYBJAAQAamRUB8kI2LQAAAABJRU5ErkJggg==')]"></div>
                            Trans
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextInput;
