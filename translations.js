// Multi-language translations
const translations = {
    ar: {
        'page-title': 'Mina Boules Tools - أدوات الصور والفيديو المجانية',
        'site-name': 'Mina Boules Tools',
        'visit-website': 'زيارة الموقع',
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
        'tool-video-converter-title': 'تحويل الفيديو',
        'tool-video-converter-desc': 'تحويل الفيديوهات بين صيغ MP4, WebM, MOV, AVI مع ضبط الجودة',
        'tool-scale-title': 'تكبير وتصغير الصور',
        'tool-scale-desc': 'تغيير أبعاد الصورة، تغيير حجم الصور، وتحويل الصيغة في خطوة واحدة',
        'video-bg-info': 'ملاحظة: إزالة خلفية الفيديو ميزة تجريبية. التنفيذ الكامل يتطلب معالجة من جانب الخادم للحصول على أفضل النتائج.',
        'upload-video-converter-note': 'يدعم صيغ MP4, WebM, MOV, AVI',
        'video-quality': 'جودة الفيديو:',
        'btn-convert-video': 'تحويل الفيديو',
        'scale-width': 'العرض (بكسل):',
        'scale-height': 'الارتفاع (بكسل):',
        'maintain-aspect': 'الحفاظ على نسبة الأبعاد',
        'btn-scale': 'تكبير/تصغير الكل',
        'scale-error': 'الرجاء إدخال العرض أو الارتفاع على الأقل',
        'seo-heading': 'أدوات الصور والفيديو المجانية على الإنترنت - تحويل، ضغط، تعديل',
        'seo-intro': 'مرحباً بك في Mina Boules Tools - مجموعة أدوات تحرير الصور والفيديو المجانية الكاملة عبر الإنترنت. حول الصور بين الصيغ مثل PNG إلى JPG، JPG إلى PNG، تحويل إلى WebP، ضغط الصور، إزالة الخلفيات، تكبير الصور، وتحويل الفيديوهات - كل ذلك بدون رفع ملفاتك إلى أي خادم. كل شيء يحدث محلياً في متصفحك للحصول على خصوصية وأمان كاملين.',
        'seo-converter-title': 'محول صيغ الصور',
        'seo-converter-desc': 'تحويل الصور بين جميع الصيغ الشائعة: PNG، JPEG، JPG، WebP، SVG، BMP، ICO، GIF. اختر صيغة المصدر والصيغة المستهدفة مع التحكم في الجودة حتى دقة 8K. مثالي لتحويل الصور والرسومات والشعارات والأيقونات. يدعم التحويل الجماعي - معالجة عدة صور في وقت واحد.',
        'seo-compress-title': 'أداة ضغط الصور',
        'seo-compress-desc': 'تقليل حجم ملف الصورة مع الحفاظ على الجودة. ضغط صور JPG، PNG، WebP مع مستويات ضغط قابلة للتعديل. تحويل تلقائي إلى صيغة WebP للحصول على أفضل ضغط. شاهد توفير حجم الملف الفوري. مثالي لتحسين الصور للويب أو البريد الإلكتروني أو التخزين.',
        'seo-background-title': 'إزالة الخلفية',
        'seo-background-desc': 'إزالة خلفيات الصور تلقائياً باستخدام خوارزميات متقدمة. لا حاجة للتحميل - يعمل 100٪ دون اتصال بالإنترنت. إنشاء صور PNG شفافة للشعارات وصور المنتجات وصور الملف الشخصي. معالجة صور متعددة بشكل جماعي. مثالي للتجارة الإلكترونية والتصميم الجرافيكي ووسائل التواصل الاجتماعي.',
        'seo-scale-title': 'تكبير وتصغير الصور',
        'seo-scale-desc': 'تغيير حجم الصور، تكبير الصور، تغيير أبعاد الصورة. الحفاظ على نسبة الأبعاد أو تعيين عرض وارتفاع مخصصين. تغيير الصيغة أثناء تغيير الحجم. مثالي لإنشاء الصور المصغرة أو صور وسائل التواصل الاجتماعي أو تلبية متطلبات حجم معينة.',
        'seo-video-title': 'محول الفيديو وإزالة الخلفية',
        'seo-video-desc': 'تحويل مقاطع الفيديو بين صيغ MP4، WebM، MOV، AVI. إزالة خلفيات الفيديو إطار بإطار مع دعم الشفافية. خيارات التحكم في الجودة للمعالجة السريعة أو عالية الجودة. مثالي لمنشئي المحتوى ومحرري الفيديو.',
        'seo-keywords-title': 'المهام الشائعة',
        'seo-benefits-title': 'لماذا تختار Mina Boules Tools؟',
        'seo-benefit-1': '100٪ مجاني - بدون اشتراكات، بدون تكاليف مخفية، استخدام غير محدود',
        'seo-benefit-2': 'خصوصية كاملة - جميع المعالجات تحدث محلياً، لا يتم تحميل الملفات',
        'seo-benefit-3': 'بدون تسجيل - ابدأ الاستخدام فوراً بدون إنشاء حساب',
        'seo-benefit-4': 'يعمل دون اتصال - استخدم بدون إنترنت بعد تحميل الصفحة الأولي',
        'seo-benefit-5': 'معالجة جماعية - تحويل أو ضغط أو تحرير ملفات متعددة في وقت واحد',
        'seo-benefit-6': 'جودة عالية - دعم صور بدقة تصل إلى 8K',
        'seo-benefit-7': 'متعدد اللغات - متاح بالعربية والإنجليزية والألمانية والروسية',
        'seo-benefit-8': 'معالجة سريعة - معالجة من جانب العميل للحصول على نتائج فورية',
        'about-title': 'عن Mina Boules Tools',
        'contact-title': 'التواصل والدعم',
        'support-paypal': 'الدعم عبر PayPal',

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
        'page-title': 'Mina Boules Tools - Free Image & Video Tools',
        'site-name': 'Mina Boules Tools',
        'visit-website': 'Visit Website',
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
        'tool-video-converter-title': 'Video Converter',
        'tool-video-converter-desc': 'Convert videos between MP4, WebM, MOV, AVI formats with quality control',
        'tool-scale-title': 'Scale & Resize Images',
        'tool-scale-desc': 'Change image dimensions, resize photos, and convert formats in one step',
        'video-bg-info': 'Note: Video background removal is a demo feature. Full implementation requires server-side processing for best results.',
        'upload-video-converter-note': 'Supports MP4, WebM, MOV, AVI formats',
        'video-quality': 'Video Quality:',
        'btn-convert-video': 'Convert Video',
        'scale-width': 'Width (px):',
        'scale-height': 'Height (px):',
        'maintain-aspect': 'Maintain Aspect Ratio',
        'btn-scale': 'Scale All',
        'scale-error': 'Please enter at least width or height',
        'seo-heading': 'Free Online Image & Video Tools - Convert, Compress, Edit',
        'seo-intro': 'Welcome to Mina Boules Tools - your complete free online image and video editing suite. Convert images between formats like PNG to JPG, JPG to PNG, convert to WebP, compress images, remove backgrounds, scale photos, and convert videos - all without uploading your files to any server. Everything happens locally in your browser for complete privacy and security.',
        'seo-converter-title': 'Image Format Converter',
        'seo-converter-desc': 'Convert images between all popular formats: PNG, JPEG, JPG, WebP, SVG, BMP, ICO, GIF. Choose your source format and target format with quality control up to 8K resolution. Perfect for converting photos, graphics, logos, and icons. Supports bulk conversion - process multiple images at once.',
        'seo-compress-title': 'Image Compression Tool',
        'seo-compress-desc': 'Reduce image file size while maintaining quality. Compress JPG, PNG, WebP images with adjustable compression levels. Automatically convert to WebP format for best compression. See instant file size savings. Ideal for optimizing photos for web, email, or storage.',
        'seo-background-title': 'Background Remover',
        'seo-background-desc': 'Remove image backgrounds automatically using advanced algorithms. No uploads needed - works 100% offline. Create transparent PNG images for logos, product photos, profile pictures. Process multiple images in bulk. Perfect for e-commerce, graphic design, and social media.',
        'seo-scale-title': 'Image Scale & Resize',
        'seo-scale-desc': 'Resize images, scale photos, change image dimensions. Maintain aspect ratio or set custom width and height. Change format while resizing. Perfect for creating thumbnails, social media images, or fitting specific size requirements.',
        'seo-video-title': 'Video Converter & Background Removal',
        'seo-video-desc': 'Convert videos between MP4, WebM, MOV, AVI formats. Remove video backgrounds frame by frame with transparency support. Quality control options for fast or high-quality processing. Perfect for content creators and video editors.',
        'seo-keywords-title': 'Common Tasks',
        'seo-benefits-title': 'Why Choose Mina Boules Tools?',
        'seo-benefit-1': '100% Free - No subscriptions, no hidden costs, unlimited use',
        'seo-benefit-2': 'Complete Privacy - All processing happens locally, files never uploaded',
        'seo-benefit-3': 'No Registration - Start using immediately without creating an account',
        'seo-benefit-4': 'Works Offline - Use without internet after initial page load',
        'seo-benefit-5': 'Bulk Processing - Convert, compress, or edit multiple files at once',
        'seo-benefit-6': 'High Quality - Support for up to 8K resolution images',
        'seo-benefit-7': 'Multi-Language - Available in Arabic, English, German, and Russian',
        'seo-benefit-8': 'Fast Processing - Client-side processing for instant results',
        'about-title': 'About Mina Boules Tools',
        'contact-title': 'Contact & Support',
        'support-paypal': 'Support via PayPal',

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
        'tool-video-converter-title': 'Videokonverter',
        'tool-video-converter-desc': 'Konvertieren Sie Videos zwischen MP4, WebM, MOV, AVI Formaten mit Qualitätskontrolle',
        'tool-scale-title': 'Bilder Skalieren & Größe Ändern',
        'tool-scale-desc': 'Bildabmessungen ändern, Fotos in der Größe ändern und Formate in einem Schritt konvertieren',
        'video-bg-info': 'Hinweis: Video-Hintergrundentfernung ist eine Demo-Funktion. Vollständige Implementierung erfordert serverseitige Verarbeitung für beste Ergebnisse.',
        'upload-video-converter-note': 'Unterstützt MP4, WebM, MOV, AVI Formate',
        'video-quality': 'Videoqualität:',
        'btn-convert-video': 'Video Konvertieren',
        'scale-width': 'Breite (px):',
        'scale-height': 'Höhe (px):',
        'maintain-aspect': 'Seitenverhältnis Beibehalten',
        'btn-scale': 'Alle Skalieren',
        'scale-error': 'Bitte geben Sie mindestens Breite oder Höhe ein',
        'seo-heading': 'Kostenlose Online-Bild- und Video-Tools - Konvertieren, Komprimieren, Bearbeiten',
        'seo-intro': 'Willkommen bei Mina Boules Tools - Ihre vollständige kostenlose Online-Bild- und Videobearbeitungssuite. Konvertieren Sie Bilder zwischen Formaten wie PNG zu JPG, JPG zu PNG, zu WebP konvertieren, Bilder komprimieren, Hintergründe entfernen, Fotos skalieren und Videos konvertieren - alles ohne Ihre Dateien auf einen Server hochzuladen. Alles geschieht lokal in Ihrem Browser für vollständige Privatsphäre und Sicherheit.',
        'seo-converter-title': 'Bildformat-Konverter',
        'seo-converter-desc': 'Konvertieren Sie Bilder zwischen allen gängigen Formaten: PNG, JPEG, JPG, WebP, SVG, BMP, ICO, GIF. Wählen Sie Ihr Quellformat und Zielformat mit Qualitätskontrolle bis zu 8K-Auflösung. Perfekt zum Konvertieren von Fotos, Grafiken, Logos und Symbolen. Unterstützt Massenkonvertierung - verarbeiten Sie mehrere Bilder auf einmal.',
        'seo-compress-title': 'Bildkomprimierungstool',
        'seo-compress-desc': 'Reduzieren Sie die Bilddateigröße bei gleichbleibender Qualität. Komprimieren Sie JPG-, PNG-, WebP-Bilder mit einstellbaren Kompressionsstufen. Automatische Konvertierung in das WebP-Format für beste Kompression. Sehen Sie sofortige Dateigr��ßeneinsparungen. Ideal zur Optimierung von Fotos für Web, E-Mail oder Speicherung.',
        'seo-background-title': 'Hintergrundentferner',
        'seo-background-desc': 'Entfernen Sie Bildhintergründe automatisch mit fortschrittlichen Algorithmen. Keine Uploads erforderlich - funktioniert 100% offline. Erstellen Sie transparente PNG-Bilder für Logos, Produktfotos, Profilbilder. Verarbeiten Sie mehrere Bilder in großen Mengen. Perfekt für E-Commerce, Grafikdesign und soziale Medien.',
        'seo-scale-title': 'Bild Skalieren & Größe Ändern',
        'seo-scale-desc': 'Bildgröße ändern, Fotos skalieren, Bildabmessungen ändern. Seitenverhältnis beibehalten oder benutzerdefinierte Breite und Höhe festlegen. Format während der Größenänderung ändern. Perfekt zum Erstellen von Miniaturansichten, Social-Media-Bildern oder zum Erfüllen spezifischer Größenanforderungen.',
        'seo-video-title': 'Videokonverter & Hintergrundentfernung',
        'seo-video-desc': 'Konvertieren Sie Videos zwischen MP4-, WebM-, MOV-, AVI-Formaten. Entfernen Sie Video-Hintergründe Frame für Frame mit Transparenzunterstützung. Qualitätskontrolloptionen für schnelle oder hochwertige Verarbeitung. Perfekt für Content-Ersteller und Video-Editoren.',
        'seo-keywords-title': 'Häufige Aufgaben',
        'seo-benefits-title': 'Warum Mina Boules Tools Wählen?',
        'seo-benefit-1': '100% Kostenlos - Keine Abonnements, keine versteckten Kosten, unbegrenzte Nutzung',
        'seo-benefit-2': 'Vollständige Privatsphäre - Alle Verarbeitung erfolgt lokal, Dateien werden nie hochgeladen',
        'seo-benefit-3': 'Keine Registrierung - Sofort ohne Kontoerstellung verwenden',
        'seo-benefit-4': 'Funktioniert Offline - Nach dem ersten Laden ohne Internet verwenden',
        'seo-benefit-5': 'Massenverarbeitung - Konvertieren, komprimieren oder bearbeiten Sie mehrere Dateien auf einmal',
        'seo-benefit-6': 'Hohe Qualität - Unterstützung für Bilder bis zu 8K-Auflösung',
        'seo-benefit-7': 'Mehrsprachig - Verfügbar in Arabisch, Englisch, Deutsch und Russisch',
        'seo-benefit-8': 'Schnelle Verarbeitung - Clientseitige Verarbeitung für sofortige Ergebnisse',
        'about-title': 'Über Mina Boules Tools',
        'contact-title': 'Kontakt & Unterstützung',
        'support-paypal': 'Unterstützung via PayPal',

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
        'tool-video-converter-title': 'Конвертер Видео',
        'tool-video-converter-desc': 'Конвертируйте видео между форматами MP4, WebM, MOV, AVI с контролем качества',
        'tool-scale-title': 'Масштабировать и Изменить Размер Изображений',
        'tool-scale-desc': 'Изменяйте размеры изображения, меняйте размер фотографий и конвертируйте форматы за один шаг',
        'video-bg-info': 'Примечание: Удаление фона видео - это демонстрационная функция. Полная реализация требует серверной обработки для лучших результатов.',
        'upload-video-converter-note': 'Поддерживает форматы MP4, WebM, MOV, AVI',
        'video-quality': 'Качество Видео:',
        'btn-convert-video': 'Конвертировать Видео',
        'scale-width': 'Ширина (px):',
        'scale-height': 'Высота (px):',
        'maintain-aspect': 'Сохранить Соотношение Сторон',
        'btn-scale': 'Масштабировать Все',
        'scale-error': 'Пожалуйста, введите хотя бы ширину или высоту',
        'seo-heading': 'Бесплатные Онлайн Инструменты для Изображений и Видео - Конвертация, Сжатие, Редактирование',
        'seo-intro': 'Добро пожаловать в Mina Boules Tools - ваш полный бесплатный онлайн-пакет для редактирования изображений и видео. Конвертируйте изображения между форматами, такими как PNG в JPG, JPG в PNG, конвертируйте в WebP, сжимайте изображения, удаляйте фон, масштабируйте фотографии и конвертируйте видео - всё без загрузки файлов на сервер. Всё происходит локально в вашем браузере для полной конфиденциальности и безопасности.',
        'seo-converter-title': 'Конвертер Форматов Изображений',
        'seo-converter-desc': 'Конвертируйте изображения между всеми популярными форматами: PNG, JPEG, JPG, WebP, SVG, BMP, ICO, GIF. Выбирайте исходный формат и целевой формат с контролем качества до разрешения 8K. Идеально подходит для конвертации фотографий, графики, логотипов и иконок. Поддерживает массовую конвертацию - обработку нескольких изображений одновременно.',
        'seo-compress-title': 'Инструмент Сжатия Изображений',
        'seo-compress-desc': 'Уменьшайте размер файла изображения с сохранением качества. Сжимайте изображения JPG, PNG, WebP с настраиваемыми уровнями сжатия. Автоматическая конвертация в формат WebP для лучшего сжатия. Мгновенная экономия размера файла. Идеально для оптимизации фотографий для веб, электронной почты или хранения.',
        'seo-background-title': 'Удаление Фона',
        'seo-background-desc': 'Автоматически удаляйте фон изображений с помощью передовых алгоритмов. Загрузка не требуется - работает 100% офлайн. Создавайте прозрачные PNG-изображения для логотипов, фотографий продуктов, изображений профиля. Обрабатывайте несколько изображений массово. Идеально для электронной коммерции, графического дизайна и социальных сетей.',
        'seo-scale-title': 'Масштабирование и Изменение Размера Изображений',
        'seo-scale-desc': 'Изменяйте размер изображений, масштабируйте фотографии, меняйте размеры изображения. Сохраняйте соотношение сторон или устанавливайте пользовательскую ширину и высоту. Меняйте формат при изменении размера. Идеально для создания миниатюр, изображений для социальных сетей или соответствия определённым требованиям к размеру.',
        'seo-video-title': 'Конвертер Видео и Удаление Фона',
        'seo-video-desc': 'Конвертируйте видео между форматами MP4, WebM, MOV, AVI. Удаляйте фон видео кадр за кадром с поддержкой прозрачности. Опции контроля качества для быстрой или высококачественной обработки. Идеально для создателей контента и видеоредакторов.',
        'seo-keywords-title': 'Распространённые Задачи',
        'seo-benefits-title': 'Почему Выбрать Mina Boules Tools?',
        'seo-benefit-1': '100% Бесплатно - Без подписок, без скрытых расходов, неограниченное использование',
        'seo-benefit-2': 'Полная Конфиденциальность - Вся обработка происходит локально, файлы никогда не загружаются',
        'seo-benefit-3': 'Без Регистрации - Начните использовать немедленно без создания учётной записи',
        'seo-benefit-4': 'Работает Офлайн - Используйте без интернета после первой загрузки страницы',
        'seo-benefit-5': 'Массовая Обработка - Конвертируйте, сжимайте или редактируйте несколько файлов одновременно',
        'seo-benefit-6': 'Высокое Качество - Поддержка изображений до разрешения 8K',
        'seo-benefit-7': 'Многоязычность - Доступно на арабском, английском, немецком и русском языках',
        'seo-benefit-8': 'Быстрая Обработка - Клиентская обработка для мгновенных результатов',
        'about-title': 'О Mina Boules Tools',
        'contact-title': 'Контакт и Поддержка',
        'support-paypal': 'Поддержка через PayPal',

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
