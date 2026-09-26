import React from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { CJK_CONCEPT_SAMPLES, ConceptSample } from '../constants';
import { SupportedLanguage } from '../types';
import { t } from '../i18n';

interface CjkAdvisoryProps {
    language: SupportedLanguage;
    onSelectText?: (text: string) => void;
    activeCategory: string;
}

const CjkAdvisory: React.FC<CjkAdvisoryProps> = ({ language, onSelectText, activeCategory }) => {
    // Show prominently if Japanese or Chinese category is active, or if user is viewing all fonts
    const isDedicatedCategory = activeCategory === 'japanese' || activeCategory === 'chinese';

    return (
        <aside
            aria-label={t('advisory.cjkTitle', language)}
            className={`rounded-2xl p-5 mb-6 border transition-all no-print ${
                isDedicatedCategory
                    ? 'bg-amber-50/90 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 shadow-sm'
                    : 'bg-stone-50 dark:bg-[#161616] border-stone-200 dark:border-[#282828]'
            }`}
        >
            <div className="flex items-start gap-3.5">
                <div
                    className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5"
                    aria-hidden="true"
                >
                    <AlertTriangle size={22} />
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-bold text-sm text-stone-900 dark:text-stone-100 tracking-tight">
                            {t('advisory.cjkTitle', language)}
                        </h2>
                        <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider bg-amber-200/70 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                            {t('advisory.cjkBadge', language)}
                        </span>
                    </div>

                    <p className="text-xs text-stone-700 dark:text-stone-300 mt-1.5 leading-relaxed">
                        {t('advisory.cjkBody', language)}
                    </p>

                    <div className="mt-3.5 pt-3 border-t border-amber-200/60 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 shrink-0">
                            <Sparkles size={14} className="text-amber-600 dark:text-amber-400" />
                            <span>{t('advisory.cjkSampleHeading', language)}:</span>
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            {CJK_CONCEPT_SAMPLES.map((sample: ConceptSample) => {
                                const fullLabel = t(sample.key, language);
                                const localizedMeaning = fullLabel.replace(/\s*\([^)]*\)/, '').trim() || sample.meaning;
                                return (
                                    <button
                                        key={sample.key}
                                        type="button"
                                        onClick={() => onSelectText && onSelectText(sample.text)}
                                        className="min-h-[36px] px-2.5 py-1 text-xs rounded-lg font-medium bg-white dark:bg-[#202020] text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-[#383838] hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-all flex items-center gap-1 shadow-2xs"
                                        title={`${sample.text} - ${localizedMeaning}`}
                                    >
                                        <span className="font-bold text-sm">{sample.text}</span>
                                        <span className="text-[10px] text-stone-600 dark:text-stone-300">
                                            ({localizedMeaning})
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-2">
                        {t('advisory.cjkNotice', language)}
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default CjkAdvisory;
