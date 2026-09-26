import { TattooFont, FontFilter } from './types';
import { t } from './i18n';

export interface ConceptSample {
    key: string;
    text: string;
    meaning: string;
}

export const CJK_CONCEPT_SAMPLES: ConceptSample[] = [
    { key: 'sample.courage', text: '勇', meaning: 'Courage' },
    { key: 'sample.freedom', text: '自由', meaning: 'Freedom' },
    { key: 'sample.perseverance', text: '忍', meaning: 'Perseverance' },
    { key: 'sample.peace', text: '平和', meaning: 'Peace' },
    { key: 'sample.love', text: '愛', meaning: 'Love' },
    { key: 'sample.dream', text: '夢', meaning: 'Dream' },
    { key: 'sample.strength', text: '力', meaning: 'Strength' },
    { key: 'sample.eternity', text: '永遠', meaning: 'Eternity' },
    { key: 'sample.family', text: '家族', meaning: 'Family' },
    { key: 'sample.bond', text: '絆', meaning: 'Bond' },
    { key: 'sample.hope', text: '希望', meaning: 'Hope' },
    { key: 'sample.wisdom', text: '智慧', meaning: 'Wisdom' },
    { key: 'sample.honor', text: '信義', meaning: 'Honor' },
    { key: 'sample.indomitable', text: '不屈', meaning: 'Indomitable' },
    { key: 'sample.awakening', text: '覚醒', meaning: 'Awakening' },
    { key: 'sample.light', text: '光', meaning: 'Light' },
    { key: 'sample.soul', text: '魂', meaning: 'Soul' },
    { key: 'sample.destiny', text: '運命', meaning: 'Destiny' },
    { key: 'sample.happiness', text: '幸福', meaning: 'Happiness' },
    { key: 'sample.passion', text: '情熱', meaning: 'Passion' },
    { key: 'sample.harmony', text: '調和', meaning: 'Harmony' },
    { key: 'sample.bravery', text: '勇気', meaning: 'Bravery' },
    { key: 'sample.rebirth', text: '再生', meaning: 'Rebirth' },
    { key: 'sample.truth', text: '真実', meaning: 'Truth' },
    { key: 'sample.beauty', text: '美', meaning: 'Beauty' },
    { key: 'sample.loyalty', text: '忠誠', meaning: 'Loyalty' },
    { key: 'sample.serenity', text: '静寂', meaning: 'Serenity' },
    { key: 'sample.challenge', text: '挑戦', meaning: 'Challenge' },
    { key: 'sample.gratitude', text: '感謝', meaning: 'Gratitude' },
];

export const TATTOO_FONTS: TattooFont[] = [
    // Blackletter / Old English (15)
    { name: 'UnifrakturMaguntia', category: 'blackletter', secondaryCategory: 'german', googleFont: 'UnifrakturMaguntia', description: t('font.desc.unifrakturmaguntia'), descKey: 'font.desc.unifrakturmaguntia' },
    { name: 'IM Fell English SC', category: 'blackletter', googleFont: 'IM+Fell+English+SC', description: t('font.desc.imfellenglishsc'), descKey: 'font.desc.imfellenglishsc' },
    { name: 'Almendra SC', category: 'blackletter', secondaryCategory: 'spanish', googleFont: 'Almendra+SC', description: t('font.desc.almendrasc'), descKey: 'font.desc.almendrasc' },
    { name: 'Caudex', category: 'blackletter', secondaryCategory: 'italian', googleFont: 'Caudex', description: t('font.desc.caudex'), descKey: 'font.desc.caudex' },
    { name: 'Cinzel Decorative', category: 'blackletter', secondaryCategory: 'italian', googleFont: 'Cinzel+Decorative', description: t('font.desc.cinzeldecorative'), descKey: 'font.desc.cinzeldecorative' },
    { name: 'Pirata One', category: 'blackletter', secondaryCategory: 'spanish', googleFont: 'Pirata+One', description: t('font.desc.pirataone'), descKey: 'font.desc.pirataone' },
    { name: 'Grenze Gotisch', category: 'blackletter', secondaryCategory: 'dutch', googleFont: 'Grenze+Gotisch', description: t('font.desc.grenzegotisch'), descKey: 'font.desc.grenzegotisch' },
    { name: 'MedievalSharp', category: 'blackletter', secondaryCategory: 'german', googleFont: 'MedievalSharp', description: t('font.desc.medievalsharp'), descKey: 'font.desc.medievalsharp' },
    { name: 'Germania One', category: 'blackletter', secondaryCategory: 'german', googleFont: 'Germania+One', description: t('font.desc.germaniaone'), descKey: 'font.desc.germaniaone' },
    { name: 'Metal Mania', category: 'blackletter', secondaryCategory: 'german', googleFont: 'Metal+Mania', description: t('font.desc.metalmania'), descKey: 'font.desc.metalmania' },
    { name: 'Smokum', category: 'blackletter', secondaryCategory: 'dutch', googleFont: 'Smokum', description: t('font.desc.smokum'), descKey: 'font.desc.smokum' },
    { name: 'Rye', category: 'blackletter', secondaryCategory: 'dutch', googleFont: 'Rye', description: t('font.desc.rye'), descKey: 'font.desc.rye' },
    { name: 'UnifrakturCook', category: 'blackletter', secondaryCategory: 'german', googleFont: 'UnifrakturCook:wght@700', description: t('font.desc.unifrakturcook'), descKey: 'font.desc.unifrakturcook' },
    { name: 'Fruktur', category: 'blackletter', secondaryCategory: 'german', googleFont: 'Fruktur', description: t('font.desc.fruktur'), descKey: 'font.desc.fruktur' },
    { name: 'New Rocker', category: 'blackletter', secondaryCategory: 'german', googleFont: 'New+Rocker', description: t('font.desc.newrocker'), descKey: 'font.desc.newrocker' },

    // Script / Cursive (15)
    { name: 'Great Vibes', category: 'script', googleFont: 'Great+Vibes', description: t('font.desc.greatvibes'), descKey: 'font.desc.greatvibes' },
    { name: 'Satisfy', category: 'script', googleFont: 'Satisfy', description: t('font.desc.satisfy'), descKey: 'font.desc.satisfy' },
    { name: 'Pacifico', category: 'script', googleFont: 'Pacifico', description: t('font.desc.pacifico'), descKey: 'font.desc.pacifico' },
    { name: 'Dancing Script', category: 'script', googleFont: 'Dancing+Script', description: t('font.desc.dancingscript'), descKey: 'font.desc.dancingscript' },
    { name: 'Sacramento', category: 'script', secondaryCategory: 'portuguese', googleFont: 'Sacramento', description: t('font.desc.sacramento'), descKey: 'font.desc.sacramento' },
    { name: 'Allura', category: 'script', googleFont: 'Allura', description: t('font.desc.allura'), descKey: 'font.desc.allura' },
    { name: 'Tangerine', category: 'script', googleFont: 'Tangerine', description: t('font.desc.tangerine'), descKey: 'font.desc.tangerine' },
    { name: 'Rochester', category: 'script', secondaryCategory: 'portuguese', googleFont: 'Rochester', description: t('font.desc.rochester'), descKey: 'font.desc.rochester' },
    { name: 'Yellowtail', category: 'script', googleFont: 'Yellowtail', description: t('font.desc.yellowtail'), descKey: 'font.desc.yellowtail' },
    { name: 'Kaushan Script', category: 'script', googleFont: 'Kaushan+Script', description: t('font.desc.kaushanscript'), descKey: 'font.desc.kaushanscript' },
    { name: 'Monoton', category: 'script', googleFont: 'Monoton', description: t('font.desc.monoton'), descKey: 'font.desc.monoton' },
    { name: 'Righteous', category: 'script', googleFont: 'Righteous', description: t('font.desc.righteous'), descKey: 'font.desc.righteous' },
    { name: 'Lobster', category: 'script', googleFont: 'Lobster', description: t('font.desc.lobster'), descKey: 'font.desc.lobster' },
    { name: 'Permanent Marker', category: 'script', googleFont: 'Permanent+Marker', description: t('font.desc.permanentmarker'), descKey: 'font.desc.permanentmarker' },
    { name: 'Fredericka the Great', category: 'script', googleFont: 'Fredericka+the+Great', description: t('font.desc.frederickathegreat'), descKey: 'font.desc.frederickathegreat' },

    // Chicano / Ornate Script (8)
    { name: 'Alex Brush', category: 'chicano', secondaryCategory: 'french', googleFont: 'Alex+Brush', description: t('font.desc.alexbrush'), descKey: 'font.desc.alexbrush', tag: 'Trending Chicano' },
    { name: 'Monsieur La Doulaise', category: 'chicano', googleFont: 'Monsieur+La+Doulaise', description: t('font.desc.monsieurladoulaise'), descKey: 'font.desc.monsieurladoulaise', tag: 'Chicano Flourish' },
    { name: 'Pinyon Script', category: 'chicano', googleFont: 'Pinyon+Script', description: t('font.desc.pinyonscript'), descKey: 'font.desc.pinyonscript', tag: 'Ornate Calligraphy' },
    { name: 'Herr Von Muellerhoff', category: 'chicano', googleFont: 'Herr+Von+Muellerhoff', description: t('font.desc.herrvonmuellerhoff'), descKey: 'font.desc.herrvonmuellerhoff', tag: 'Vintage Filigree' },
    { name: 'Italianno', category: 'chicano', secondaryCategory: 'italian', googleFont: 'Italianno', description: t('font.desc.italianno'), descKey: 'font.desc.italianno', tag: 'Fast Cursive' },
    { name: 'Rouge Script', category: 'chicano', googleFont: 'Rouge+Script', description: t('font.desc.rougescript'), descKey: 'font.desc.rougescript', tag: 'Soft Script' },
    { name: 'Berkshire Swash', category: 'chicano', secondaryCategory: 'spanish', googleFont: 'Berkshire+Swash', description: t('font.desc.berkshireswash'), descKey: 'font.desc.berkshireswash', tag: 'Swash Lettering' },
    { name: 'Ruthie', category: 'chicano', googleFont: 'Ruthie', description: t('font.desc.ruthie'), descKey: 'font.desc.ruthie', tag: 'Airy Flourish' },

    // Fineline / Minimalist (8)
    { name: 'Special Elite', category: 'fineline', secondaryCategory: 'dutch', googleFont: 'Special+Elite', description: t('font.desc.specialelite'), descKey: 'font.desc.specialelite', tag: 'Vintage Typewriter' },
    { name: 'Courier Prime', category: 'fineline', secondaryCategory: 'dutch', googleFont: 'Courier+Prime', description: t('font.desc.courierprime'), descKey: 'font.desc.courierprime', tag: 'Minimal Monospace' },
    { name: 'Cinzel', category: 'fineline', secondaryCategory: 'italian', googleFont: 'Cinzel', description: t('font.desc.cinzel'), descKey: 'font.desc.cinzel', tag: 'Roman Inscription' },
    { name: 'Cormorant Garamond', category: 'fineline', googleFont: 'Cormorant+Garamond', description: t('font.desc.cormorantgaramond'), descKey: 'font.desc.cormorantgaramond', tag: 'Delicate Serif' },
    { name: 'Playfair Display', category: 'fineline', googleFont: 'Playfair+Display', description: t('font.desc.playfairdisplay'), descKey: 'font.desc.playfairdisplay', tag: 'High-Contrast Serif' },
    { name: 'Marcellus', category: 'fineline', secondaryCategory: 'italian', googleFont: 'Marcellus', description: t('font.desc.marcellus'), descKey: 'font.desc.marcellus', tag: 'Classical Titling' },
    { name: 'Bodoni Moda', category: 'fineline', secondaryCategory: 'italian', googleFont: 'Bodoni+Moda', description: t('font.desc.bodonimoda'), descKey: 'font.desc.bodonimoda', tag: 'Didone Editorial' },
    { name: 'Bellefair', category: 'fineline', secondaryCategory: 'italian', googleFont: 'Bellefair', description: t('font.desc.bellefair'), descKey: 'font.desc.bellefair', tag: 'Slender Minimal' },

    // French / Art Nouveau & Script (7 primary + Alex Brush = 8)
    { name: 'Parisienne', category: 'french', secondaryCategory: 'script', googleFont: 'Parisienne', description: t('font.desc.parisienne'), descKey: 'font.desc.parisienne', tag: 'Belle Époque' },
    { name: 'La Belle Aurore', category: 'french', secondaryCategory: 'fineline', googleFont: 'La+Belle+Aurore', description: t('font.desc.labelleaurore'), descKey: 'font.desc.labelleaurore', tag: 'French Cursive' },
    { name: 'Lovers Quarrel', category: 'french', secondaryCategory: 'script', googleFont: 'Lovers+Quarrel', description: t('font.desc.loversquarrel'), descKey: 'font.desc.loversquarrel', tag: 'Salon Flourish' },
    { name: 'Fondamento', category: 'french', secondaryCategory: 'dutch', googleFont: 'Fondamento', description: t('font.desc.fondamento'), descKey: 'font.desc.fondamento', tag: 'Humanist Bastarda' },
    { name: 'Elsie', category: 'french', secondaryCategory: 'decorative', googleFont: 'Elsie', description: t('font.desc.elsie'), descKey: 'font.desc.elsie', tag: 'Haute Couture' },
    { name: 'Federo', category: 'french', secondaryCategory: 'fineline', googleFont: 'Federo', description: t('font.desc.federo'), descKey: 'font.desc.federo', tag: '1909 Parisian' },
    { name: 'Uncial Antiqua', category: 'french', secondaryCategory: 'blackletter', googleFont: 'Uncial+Antiqua', description: t('font.desc.uncialantiqua'), descKey: 'font.desc.uncialantiqua', tag: 'Breton Celtic' },

    // Italian / Roman & Cancelleresca (1 primary + 7 secondary = 8)
    { name: 'Cardo', category: 'italian', secondaryCategory: 'fineline', googleFont: 'Cardo', description: t('font.desc.cardo'), descKey: 'font.desc.cardo', tag: 'Aldine Humanist' },

    // German / Fraktur & Gotisch (1 primary + 7 secondary = 8)
    { name: 'Eagle Lake', category: 'german', secondaryCategory: 'blackletter', googleFont: 'Eagle+Lake', description: t('font.desc.eaglelake'), descKey: 'font.desc.eaglelake', tag: 'Germanic Manuscript' },

    // Dutch / Old Style & Maritime (2 primary + 6 secondary = 8)
    { name: 'Staatliches', category: 'dutch', secondaryCategory: 'decorative', googleFont: 'Staatliches', description: t('font.desc.staatliches'), descKey: 'font.desc.staatliches', tag: 'De Stijl Poster' },
    { name: 'Goudy Bookletter 1911', category: 'dutch', secondaryCategory: 'fineline', googleFont: 'Goudy+Bookletter+1911', description: t('font.desc.goudybookletter1911'), descKey: 'font.desc.goudybookletter1911', tag: 'Van Dijck Baroque' },

    // Spanish / Rotunda & Caligrafía (5 primary + 3 secondary = 8)
    { name: 'Almendra Display', category: 'spanish', secondaryCategory: 'decorative', googleFont: 'Almendra+Display', description: t('font.desc.almendradisplay'), descKey: 'font.desc.almendradisplay', tag: 'Iberian Rotunda' },
    { name: 'Mate SC', category: 'spanish', secondaryCategory: 'fineline', googleFont: 'Mate+SC', description: t('font.desc.matesc'), descKey: 'font.desc.matesc', tag: 'Madrid Colonial' },
    { name: 'Courgette', category: 'spanish', secondaryCategory: 'script', googleFont: 'Courgette', description: t('font.desc.courgette'), descKey: 'font.desc.courgette', tag: 'Spanish Brush' },
    { name: 'Sancreek', category: 'spanish', secondaryCategory: 'decorative', googleFont: 'Sancreek', description: t('font.desc.sancreek'), descKey: 'font.desc.sancreek', tag: 'Iberian Display' },
    { name: 'Trade Winds', category: 'spanish', secondaryCategory: 'decorative', googleFont: 'Trade+Winds', description: t('font.desc.tradewinds'), descKey: 'font.desc.tradewinds', tag: 'Galleon Maritime' },

    // Portuguese / Manueline & Fado (6 primary + 2 secondary = 8)
    { name: 'Mea Culpa', category: 'portuguese', secondaryCategory: 'script', googleFont: 'Mea+Culpa', description: t('font.desc.meaculpa'), descKey: 'font.desc.meaculpa', tag: 'Fado Flourish' },
    { name: 'Sail', category: 'portuguese', secondaryCategory: 'decorative', googleFont: 'Sail', description: t('font.desc.sail'), descKey: 'font.desc.sail', tag: 'Manueline Nautical' },
    { name: 'Charm', category: 'portuguese', secondaryCategory: 'script', googleFont: 'Charm', description: t('font.desc.charm'), descKey: 'font.desc.charm', tag: 'Portuguese Lyric' },
    { name: 'Bilbo Swash Caps', category: 'portuguese', secondaryCategory: 'script', googleFont: 'Bilbo+Swash+Caps', description: t('font.desc.bilboswashcaps'), descKey: 'font.desc.bilboswashcaps', tag: 'Manueline Swash' },
    { name: 'Arizonia', category: 'portuguese', secondaryCategory: 'script', googleFont: 'Arizonia', description: t('font.desc.arizonia'), descKey: 'font.desc.arizonia', tag: 'Azulejo Coastal' },
    { name: 'WindSong', category: 'portuguese', secondaryCategory: 'fineline', googleFont: 'WindSong', description: t('font.desc.windsong'), descKey: 'font.desc.windsong', tag: 'Lisbon Fineline' },

    // Japanese / Kanji & Kana (8)
    { name: 'Yuji Boku', category: 'japanese', googleFont: 'Yuji+Boku', description: t('font.desc.yujiboku'), descKey: 'font.desc.yujiboku', sampleText: '勇気 自由', tag: 'Brush Calligraphy' },
    { name: 'Yuji Mai', category: 'japanese', googleFont: 'Yuji+Mai', description: t('font.desc.yujimai'), descKey: 'font.desc.yujimai', sampleText: '永遠 平和', tag: 'Flowing Kana' },
    { name: 'Noto Serif JP', category: 'japanese', googleFont: 'Noto+Serif+JP', description: t('font.desc.notoserifjp'), descKey: 'font.desc.notoserifjp', sampleText: '不撓不屈', tag: 'Mincho Kanji' },
    { name: 'Noto Sans JP', category: 'japanese', googleFont: 'Noto+Sans+JP', description: t('font.desc.notosansjp'), descKey: 'font.desc.notosansjp', sampleText: '東京 無限', tag: 'Modern Sans' },
    { name: 'Dela Gothic One', category: 'japanese', googleFont: 'Dela+Gothic+One', description: t('font.desc.delagothicone'), descKey: 'font.desc.delagothicone', sampleText: '雷神 龍', tag: 'Heavy Gothic' },
    { name: 'Kaisei Decol', category: 'japanese', googleFont: 'Kaisei+Decol', description: t('font.desc.kaiseidecol'), descKey: 'font.desc.kaiseidecol', sampleText: '櫻花 夢想', tag: 'Ornamental Mincho' },
    { name: 'Hachi Maru Pop', category: 'japanese', googleFont: 'Hachi+Maru+Pop', description: t('font.desc.hachimarupop'), descKey: 'font.desc.hachimarupop', sampleText: '星空 希望', tag: 'Brush Pop' },
    { name: 'Shippori Mincho', category: 'japanese', googleFont: 'Shippori+Mincho', description: t('font.desc.shipporimincho'), descKey: 'font.desc.shipporimincho', sampleText: '一期一会', tag: 'Vintage Mincho' },

    // Chinese / Hanzi Calligraphy (8)
    { name: 'Ma Shan Zheng', category: 'chinese', googleFont: 'Ma+Shan+Zheng', description: t('font.desc.mashanzheng'), descKey: 'font.desc.mashanzheng', sampleText: '龍騰虎躍', tag: 'Xingshu Running' },
    { name: 'Zhi Mang Xing', category: 'chinese', googleFont: 'Zhi+Mang+Xing', description: t('font.desc.zhimangxing'), descKey: 'font.desc.zhimangxing', sampleText: '道法自然', tag: 'Caoshu Cursive' },
    { name: 'Long Cang', category: 'chinese', googleFont: 'Long+Cang', description: t('font.desc.longcang'), descKey: 'font.desc.longcang', sampleText: '海納百川', tag: 'Poetic Brush' },
    { name: 'ZCOOL XiaoWei', category: 'chinese', googleFont: 'ZCOOL+XiaoWei', description: t('font.desc.zcoolxiaowei'), descKey: 'font.desc.zcoolxiaowei', sampleText: '風骨 凌雲', tag: 'Elegant Display' },
    { name: 'ZCOOL QingKe HuangYou', category: 'chinese', googleFont: 'ZCOOL+QingKe+HuangYou', description: t('font.desc.zcoolqingkehuangyou'), descKey: 'font.desc.zcoolqingkehuangyou', sampleText: '志在千里', tag: 'Geometric Hanzi' },
    { name: 'Noto Serif TC', category: 'chinese', googleFont: 'Noto+Serif+TC', description: t('font.desc.notoseriftc'), descKey: 'font.desc.notoseriftc', sampleText: '堅忍不拔', tag: 'Traditional Songti' },
    { name: 'Noto Serif SC', category: 'chinese', googleFont: 'Noto+Serif+SC', description: t('font.desc.notoserifsc'), descKey: 'font.desc.notoserifsc', sampleText: '天道酬勤', tag: 'Simplified Songti' },
    { name: 'Noto Sans SC', category: 'chinese', googleFont: 'Noto+Sans+SC', description: t('font.desc.notosanssc'), descKey: 'font.desc.notosanssc', sampleText: '自強不息', tag: 'Modern Hanzi' },

    // Gothic / Dark (13)
    { name: 'Creepster', category: 'gothic', googleFont: 'Creepster', description: t('font.desc.creepster'), descKey: 'font.desc.creepster' },
    { name: 'Butcherman', category: 'gothic', googleFont: 'Butcherman', description: t('font.desc.butcherman'), descKey: 'font.desc.butcherman' },
    { name: 'Nosifer', category: 'gothic', googleFont: 'Nosifer', description: t('font.desc.nosifer'), descKey: 'font.desc.nosifer' },
    { name: 'Eater', category: 'gothic', googleFont: 'Eater', description: t('font.desc.eater'), descKey: 'font.desc.eater' },
    { name: 'Caesar Dressing', category: 'gothic', googleFont: 'Caesar+Dressing', description: t('font.desc.caesardressing'), descKey: 'font.desc.caesardressing' },
    { name: 'Jolly Lodger', category: 'gothic', googleFont: 'Jolly+Lodger', description: t('font.desc.jollylodger'), descKey: 'font.desc.jollylodger' },
    { name: 'Henny Penny', category: 'gothic', googleFont: 'Henny+Penny', description: t('font.desc.hennypenny'), descKey: 'font.desc.hennypenny' },
    { name: 'Freckle Face', category: 'gothic', googleFont: 'Freckle+Face', description: t('font.desc.freckleface'), descKey: 'font.desc.freckleface' },
    { name: 'Risque', category: 'gothic', googleFont: 'Risque', description: t('font.desc.risque'), descKey: 'font.desc.risque' },
    { name: 'Black Ops One', category: 'gothic', googleFont: 'Black+Ops+One', description: t('font.desc.blackopsone'), descKey: 'font.desc.blackopsone' },
    { name: 'Rubik Mono One', category: 'gothic', googleFont: 'Rubik+Mono+One', description: t('font.desc.rubikmonoone'), descKey: 'font.desc.rubikmonoone' },
    { name: 'Faster One', category: 'gothic', googleFont: 'Faster+One', description: t('font.desc.fasterone'), descKey: 'font.desc.fasterone' },
    { name: 'Kranky', category: 'gothic', googleFont: 'Kranky', description: t('font.desc.kranky'), descKey: 'font.desc.kranky' },

    // Decorative / Unique (10)
    { name: 'Vast Shadow', category: 'decorative', googleFont: 'Vast+Shadow', description: t('font.desc.vastshadow'), descKey: 'font.desc.vastshadow' },
    { name: 'Rammetto One', category: 'decorative', googleFont: 'Rammetto+One', description: t('font.desc.rammettoone'), descKey: 'font.desc.rammettoone' },
    { name: 'Shrikhand', category: 'decorative', googleFont: 'Shrikhand', description: t('font.desc.shrikhand'), descKey: 'font.desc.shrikhand' },
    { name: 'Chicle', category: 'decorative', googleFont: 'Chicle', description: t('font.desc.chicle'), descKey: 'font.desc.chicle' },
    { name: 'Bungee Shade', category: 'decorative', googleFont: 'Bungee+Shade', description: t('font.desc.bungeeshade'), descKey: 'font.desc.bungeeshade' },
    { name: 'Knewave', category: 'decorative', googleFont: 'Knewave', description: t('font.desc.knewave'), descKey: 'font.desc.knewave' },
    { name: 'Fontdiner Swanky', category: 'decorative', googleFont: 'Fontdiner+Swanky', description: t('font.desc.fontdinerswanky'), descKey: 'font.desc.fontdinerswanky' },
    { name: 'Ewert', category: 'decorative', googleFont: 'Ewert', description: t('font.desc.ewert'), descKey: 'font.desc.ewert' },
    { name: 'Erica One', category: 'decorative', googleFont: 'Erica+One', description: t('font.desc.ericaone'), descKey: 'font.desc.ericaone' },
    { name: 'Bungee Inline', category: 'decorative', googleFont: 'Bungee+Inline', description: t('font.desc.bungeeinline'), descKey: 'font.desc.bungeeinline' }
];

// Counted from the data, so a badge can never disagree with what the filter shows.
const countIn = (id: string) => TATTOO_FONTS.filter((f) => f.category === id || f.secondaryCategory === id).length;

export const FONT_CATEGORIES: FontFilter[] = [
    { id: 'all', labelKey: 'filter.all', count: TATTOO_FONTS.length },
    { id: 'blackletter', labelKey: 'filter.blackletter', count: countIn('blackletter'), group: 'style' },
    { id: 'script', labelKey: 'filter.script', count: countIn('script'), group: 'style' },
    { id: 'chicano', labelKey: 'filter.chicano', count: countIn('chicano'), group: 'style' },
    { id: 'fineline', labelKey: 'filter.fineline', count: countIn('fineline'), group: 'style' },
    { id: 'gothic', labelKey: 'filter.gothic', count: countIn('gothic'), group: 'style' },
    { id: 'decorative', labelKey: 'filter.decorative', count: countIn('decorative'), group: 'style' },
    { id: 'french', labelKey: 'filter.french', count: countIn('french'), group: 'culture' },
    { id: 'italian', labelKey: 'filter.italian', count: countIn('italian'), group: 'culture' },
    { id: 'german', labelKey: 'filter.german', count: countIn('german'), group: 'culture' },
    { id: 'dutch', labelKey: 'filter.dutch', count: countIn('dutch'), group: 'culture' },
    { id: 'spanish', labelKey: 'filter.spanish', count: countIn('spanish'), group: 'culture' },
    { id: 'portuguese', labelKey: 'filter.portuguese', count: countIn('portuguese'), group: 'culture' },
    { id: 'japanese', labelKey: 'filter.japanese', count: countIn('japanese'), group: 'culture' },
    { id: 'chinese', labelKey: 'filter.chinese', count: countIn('chinese'), group: 'culture' }
];

export const SIZE_PRESETS = [
    { key: 'preset.small', value: 24 },
    { key: 'preset.medium', value: 48 },
    { key: 'preset.large', value: 72 },
    { key: 'preset.xl', value: 96 }
];

export const DEFAULT_PREVIEW_TEXT = '';
