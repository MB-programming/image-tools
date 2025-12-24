// Multi-language translations
const translations = {
    ar: {
        'page-title': 'أدوات الصور والفيديو المجانية - تحويل، ضغط، إزالة الخلفية',
        'site-name': 'أدوات الصور',
        'hero-title': 'أدوات احترافية للصور والفيديو',
        'hero-subtitle': 'حول، اضغط، وعدل الصور والفيديوهات مباشرة في متصفحك - مجاني 100%، خاص، وبدون حدود',
        'feature-private': 'خصوصية 100%',
        'feature-fast': 'سريع كالبرق',
        'feature-free': 'مجاني بالكامل',
        'feature-quality': 'جودة عالية',

        'tool-converter-title': 'تحويل الصور',
        'tool-converter-desc': 'التحويل بين PNG, JPEG, WebP, SVG, BMP, ICO مع إعدادات جودة مخصصة',
        'tool-background-title': 'إزالة الخلفية',
        'tool-background-desc': 'إزالة خلفيات الصور تلقائياً باستخدام خوارزميات ذكاء اصطناعي متقدمة',
        'tool-compress-title': 'ضغط الصور',
        'tool-compress-desc': 'تقليل حجم الملف مع الحفاظ على الجودة - تحويل تلقائي إلى WebP',
        'tool-video-bg-title': 'إزالة خلفية الفيديو',
        'tool-video-bg-desc': 'إزالة الخلفيات من الفيديوهات إطار بإطار مع دعم الشفافية',

        'btn-start': 'ابدأ الآن',
        'btn-convert': 'تحويل الكل',
        'btn-remove-bg': 'إزالة الخلفية',
        'btn-compress': 'ضغط الكل',
        'btn-process-video': 'معالجة الفيديو',

        'convert-from': 'تحويل من:',
        'convert-to': 'تحويل إلى:',
        'format-auto': 'كشف تلقائي',
        'upload-title': 'اسحب الملفات هنا أو انقر للتصفح',
        'upload-note': 'يدعم الرفع الدُفعي - اختر عدة ملفات مرة واحدة',
        'upload-note-bg': 'يدعم الرفع الدُفعي',
        'upload-note-compress': 'الضغط الدُفعي مدعوم',
        'upload-video-title': 'اسحب الفيديو هنا أو انقر للتصفح',
        'upload-video-note': 'يدعم صيغ MP4, WebM, MOV (يُنصح بحد أقصى 100 ميجابايت)',

        'quality': 'الجودة:',
        'max-resolution': 'الدقة القصوى:',
        'original': 'الأصلية',
        'output-format': 'صيغة الحفظ:',
        'png-transparent': 'PNG (شفاف)',
        'webp-transparent': 'WebP (شفاف)',
        'jpeg-white': 'JPEG (خلفية بيضاء)',
        'convert-webp': 'تحويل إلى WebP (أفضل ضغط)',
        'compression-level': 'مستوى الضغط:',
        'resize': 'تغيير الحجم:',
        'keep-original': 'الحفاظ على الأصلي',

        'video-output-format': 'صيغة الفيديو:',
        'webm-transparent': 'WebM (شفاف - VP9)',
        'mov-transparent': 'MOV (شفاف - ProRes)',
        'mp4-green': 'MP4 (شاشة خضراء)',
        'processing-quality': 'جودة المعالجة:',
        'quality-fast': 'سريع (جودة أقل)',
        'quality-balanced': 'متوازن',
        'quality-high': 'عالي (أبطأ)',

        'footer-privacy': '🔒 جميع المعالجات تحدث محلياً على جهازك - ملفاتك لا تغادر متصفحك أبداً',
        'footer-free': '✨ مجاني 100% وبدون حدود - لا يتطلب تسجيل',

        'download': 'تحميل',
        'download-all': 'تحميل الكل',
        'processing': 'جاري المعالجة...',
        'completed': 'تم الإنتهاء',
        'error': 'خطأ'
    },

    en: {
        'page-title': 'Free Image & Video Tools - Convert, Compress, Remove Background',
        'site-name': 'ImageTools',
        'hero-title': 'Professional Image & Video Tools',
        'hero-subtitle': 'Convert, compress, and edit images and videos directly in your browser - 100% free, private, and unlimited',
        'feature-private': '100% Private',
        'feature-fast': 'Lightning Fast',
        'feature-free': 'Completely Free',
        'feature-quality': 'High Quality',

        'tool-converter-title': 'Image Converter',
        'tool-converter-desc': 'Convert between PNG, JPEG, WebP, SVG, BMP, ICO with custom quality settings',
        'tool-background-title': 'Remove Background',
        'tool-background-desc': 'Automatically remove backgrounds from images using advanced AI algorithms',
        'tool-compress-title': 'Compress Images',
        'tool-compress-desc': 'Reduce file size while maintaining quality - auto convert to WebP',
        'tool-video-bg-title': 'Video Background Removal',
        'tool-video-bg-desc': 'Remove backgrounds from videos frame by frame with transparency support',

        'btn-start': 'Start Now',
        'btn-convert': 'Convert All',
        'btn-remove-bg': 'Remove Background',
        'btn-compress': 'Compress All',
        'btn-process-video': 'Process Video',

        'convert-from': 'Convert From:',
        'convert-to': 'Convert To:',
        'format-auto': 'Auto Detect',
        'upload-title': 'Drop files here or click to browse',
        'upload-note': 'Supports bulk upload - select multiple files at once',
        'upload-note-bg': 'Supports bulk upload',
        'upload-note-compress': 'Bulk compression supported',
        'upload-video-title': 'Drop video here or click to browse',
        'upload-video-note': 'Supports MP4, WebM, MOV formats (max 100MB recommended)',

        'quality': 'Quality:',
        'max-resolution': 'Max Resolution:',
        'original': 'Original',
        'output-format': 'Output Format:',
        'png-transparent': 'PNG (Transparent)',
        'webp-transparent': 'WebP (Transparent)',
        'jpeg-white': 'JPEG (White Background)',
        'convert-webp': 'Convert to WebP (Best Compression)',
        'compression-level': 'Compression Level:',
        'resize': 'Resize:',
        'keep-original': 'Keep Original',

        'video-output-format': 'Video Format:',
        'webm-transparent': 'WebM (Transparent - VP9)',
        'mov-transparent': 'MOV (Transparent - ProRes)',
        'mp4-green': 'MP4 (Green Screen)',
        'processing-quality': 'Processing Quality:',
        'quality-fast': 'Fast (Lower Quality)',
        'quality-balanced': 'Balanced',
        'quality-high': 'High (Slower)',

        'footer-privacy': '🔒 All processing happens locally on your device - your files never leave your browser',
        'footer-free': '✨ 100% Free & Unlimited - No registration required',

        'download': 'Download',
        'download-all': 'Download All',
        'processing': 'Processing...',
        'completed': 'Completed',
        'error': 'Error'
    },

    de: {
        'page-title': 'Kostenlose Bild- und Video-Tools - Konvertieren, Komprimieren, Hintergrund entfernen',
        'site-name': 'BildWerkzeuge',
        'hero-title': 'Professionelle Bild- und Video-Tools',
        'hero-subtitle': 'Konvertieren, komprimieren und bearbeiten Sie Bilder und Videos direkt in Ihrem Browser - 100% kostenlos, privat und unbegrenzt',
        'feature-private': '100% Privat',
        'feature-fast': 'Blitzschnell',
        'feature-free': 'Völlig Kostenlos',
        'feature-quality': 'Hohe Qualität',

        'tool-converter-title': 'Bildkonverter',
        'tool-converter-desc': 'Konvertieren zwischen PNG, JPEG, WebP, SVG, BMP, ICO mit benutzerdefinierten Qualitätseinstellungen',
        'tool-background-title': 'Hintergrund Entfernen',
        'tool-background-desc': 'Entfernen Sie Hintergründe automatisch mit fortschrittlichen KI-Algorithmen',
        'tool-compress-title': 'Bilder Komprimieren',
        'tool-compress-desc': 'Reduzieren Sie die Dateigröße bei gleichbleibender Qualität - automatische Konvertierung zu WebP',
        'tool-video-bg-title': 'Video-Hintergrund Entfernung',
        'tool-video-bg-desc': 'Entfernen Sie Hintergründe aus Videos Frame für Frame mit Transparenzunterstützung',

        'btn-start': 'Jetzt Starten',
        'btn-convert': 'Alle Konvertieren',
        'btn-remove-bg': 'Hintergrund Entfernen',
        'btn-compress': 'Alle Komprimieren',
        'btn-process-video': 'Video Verarbeiten',

        'convert-from': 'Konvertieren Von:',
        'convert-to': 'Konvertieren Zu:',
        'format-auto': 'Auto-Erkennung',
        'upload-title': 'Dateien hierher ziehen oder klicken zum Durchsuchen',
        'upload-note': 'Unterstützt Massen-Upload - wählen Sie mehrere Dateien auf einmal',
        'upload-note-bg': 'Unterstützt Massen-Upload',
        'upload-note-compress': 'Massen-Komprimierung unterstützt',
        'upload-video-title': 'Video hierher ziehen oder klicken zum Durchsuchen',
        'upload-video-note': 'Unterstützt MP4, WebM, MOV Formate (max. 100MB empfohlen)',

        'quality': 'Qualität:',
        'max-resolution': 'Max. Auflösung:',
        'original': 'Original',
        'output-format': 'Ausgabeformat:',
        'png-transparent': 'PNG (Transparent)',
        'webp-transparent': 'WebP (Transparent)',
        'jpeg-white': 'JPEG (Weißer Hintergrund)',
        'convert-webp': 'Zu WebP konvertieren (Beste Kompression)',
        'compression-level': 'Kompressionsstufe:',
        'resize': 'Größe ändern:',
        'keep-original': 'Original Behalten',

        'video-output-format': 'Videoformat:',
        'webm-transparent': 'WebM (Transparent - VP9)',
        'mov-transparent': 'MOV (Transparent - ProRes)',
        'mp4-green': 'MP4 (Grüner Bildschirm)',
        'processing-quality': 'Verarbeitungsqualität:',
        'quality-fast': 'Schnell (Niedrigere Qualität)',
        'quality-balanced': 'Ausgewogen',
        'quality-high': 'Hoch (Langsamer)',

        'footer-privacy': '🔒 Alle Verarbeitung erfolgt lokal auf Ihrem Gerät - Ihre Dateien verlassen nie Ihren Browser',
        'footer-free': '✨ 100% Kostenlos & Unbegrenzt - Keine Registrierung erforderlich',

        'download': 'Herunterladen',
        'download-all': 'Alle Herunterladen',
        'processing': 'Verarbeitung...',
        'completed': 'Abgeschlossen',
        'error': 'Fehler'
    },

    ru: {
        'page-title': 'Бесплатные Инструменты для Изображений и Видео - Конвертация, Сжатие, Удаление Фона',
        'site-name': 'ИнструментыИзображений',
        'hero-title': 'Профессиональные Инструменты для Изображений и Видео',
        'hero-subtitle': 'Конвертируйте, сжимайте и редактируйте изображения и видео прямо в браузере - 100% бесплатно, конфиденциально и без ограничений',
        'feature-private': '100% Конфиденциально',
        'feature-fast': 'Молниеносно',
        'feature-free': 'Полностью Бесплатно',
        'feature-quality': 'Высокое Качество',

        'tool-converter-title': 'Конвертер Изображений',
        'tool-converter-desc': 'Конвертация между PNG, JPEG, WebP, SVG, BMP, ICO с настраиваемыми параметрами качества',
        'tool-background-title': 'Удалить Фон',
        'tool-background-desc': 'Автоматически удаляйте фон с изображений с помощью передовых алгоритмов ИИ',
        'tool-compress-title': 'Сжать Изображения',
        'tool-compress-desc': 'Уменьшите размер файла с сохранением качества - автоматическая конвертация в WebP',
        'tool-video-bg-title': 'Удаление Фона Видео',
        'tool-video-bg-desc': 'Удаляйте фон из видео кадр за кадром с поддержкой прозрачности',

        'btn-start': 'Начать Сейчас',
        'btn-convert': 'Конвертировать Все',
        'btn-remove-bg': 'Удалить Фон',
        'btn-compress': 'Сжать Все',
        'btn-process-video': 'Обработать Видео',

        'convert-from': 'Конвертировать Из:',
        'convert-to': 'Конвертировать В:',
        'format-auto': 'Авто-Определение',
        'upload-title': 'Перетащите файлы сюда или нажмите для выбора',
        'upload-note': 'Поддерживается массовая загрузка - выберите несколько файлов одновременно',
        'upload-note-bg': 'Поддерживается массовая загрузка',
        'upload-note-compress': 'Массовое сжатие поддерживается',
        'upload-video-title': 'Перетащите видео сюда или нажмите для выбора',
        'upload-video-note': 'Поддерживает форматы MP4, WebM, MOV (рекомендуется макс. 100МБ)',

        'quality': 'Качество:',
        'max-resolution': 'Макс. Разрешение:',
        'original': 'Оригинал',
        'output-format': 'Формат Вывода:',
        'png-transparent': 'PNG (Прозрачный)',
        'webp-transparent': 'WebP (Прозрачный)',
        'jpeg-white': 'JPEG (Белый Фон)',
        'convert-webp': 'Конвертировать в WebP (Лучшее Сжатие)',
        'compression-level': 'Уровень Сжатия:',
        'resize': 'Изменить Размер:',
        'keep-original': 'Сохранить Оригинал',

        'video-output-format': 'Формат Видео:',
        'webm-transparent': 'WebM (Прозрачный - VP9)',
        'mov-transparent': 'MOV (Прозрачный - ProRes)',
        'mp4-green': 'MP4 (Зелёный Экран)',
        'processing-quality': 'Качество Обработки:',
        'quality-fast': 'Быстро (Низкое Качество)',
        'quality-balanced': 'Сбалансированно',
        'quality-high': 'Высокое (Медленнее)',

        'footer-privacy': '🔒 Вся обработка происходит локально на вашем устройстве - ваши файлы никогда не покидают браузер',
        'footer-free': '✨ 100% Бесплатно и Без Ограничений - Регистрация не требуется',

        'download': 'Скачать',
        'download-all': 'Скачать Все',
        'processing': 'Обработка...',
        'completed': 'Завершено',
        'error': 'Ошибка'
    }
};

// Current language
let currentLang = 'ar';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check stored language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }

    setLanguage(currentLang);

    // Language switcher buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);

            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

// Set language function
function setLanguage(lang) {
    if (!translations[lang]) return;

    currentLang = lang;
    localStorage.setItem('preferred-language', lang);

    // Update HTML lang and dir attributes
    const html = document.documentElement;
    html.lang = lang;
    html.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // For input placeholders
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// Helper function to translate text programmatically
function translate(key) {
    return translations[currentLang][key] || key;
}
