export default {
    content: [
        './index.html',
        './embed.html',
        './*.tsx',
        './src/**/*.tsx',
        './components/**/*.tsx'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'poli-blue': '#3B82F6',
                'poli-purple': '#8B5CF6',
                'poli-pink': '#FF006E',
                'poli-green': '#10B981'
            }
        }
    },
    plugins: []
};
