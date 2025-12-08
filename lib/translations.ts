// Translation dictionary for all supported languages
// Languages: English (en), Arabic (ar), French (fr), Spanish (es)

export type Language = 'en' | 'ar' | 'fr' | 'es';

export interface LanguageInfo {
    code: Language;
    name: string;
    nativeName: string;
    flag: string;
    direction: 'ltr' | 'rtl';
}

export const languages: LanguageInfo[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', direction: 'ltr' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇲🇦', direction: 'rtl' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' },
];

export const translations = {
    // ===== COMMON =====
    common: {
        viewMenu: {
            en: 'View Menu',
            ar: 'عرض القائمة',
            fr: 'Voir le Menu',
            es: 'Ver Menú',
        },
        reservations: {
            en: 'Reservations',
            ar: 'الحجوزات',
            fr: 'Réservations',
            es: 'Reservas',
        },
        callNow: {
            en: 'Call Now',
            ar: 'اتصل الآن',
            fr: 'Appeler',
            es: 'Llamar Ahora',
        },
        getDirections: {
            en: 'Get Directions',
            ar: 'احصل على الاتجاهات',
            fr: 'Itinéraire',
            es: 'Cómo Llegar',
        },
        readMore: {
            en: 'Read More',
            ar: 'اقرأ المزيد',
            fr: 'Lire Plus',
            es: 'Leer Más',
        },
        close: {
            en: 'Close',
            ar: 'إغلاق',
            fr: 'Fermer',
            es: 'Cerrar',
        },
        call: {
            en: 'Call',
            ar: 'اتصل',
            fr: 'Appeler',
            es: 'Llamar',
        },
    },

    // ===== LANGUAGE SELECTOR =====
    languageSelector: {
        title: {
            en: 'Choose Your Language',
            ar: 'اختر لغتك',
            fr: 'Choisissez Votre Langue',
            es: 'Elige Tu Idioma',
        },
        subtitle: {
            en: 'Welcome to Lubina Blanca',
            ar: 'مرحباً بكم في لوبينا بلانكا',
            fr: 'Bienvenue à Lubina Blanca',
            es: 'Bienvenido a Lubina Blanca',
        },
        continue: {
            en: 'Continue',
            ar: 'متابعة',
            fr: 'Continuer',
            es: 'Continuar',
        },
    },

    // ===== NAVIGATION =====
    nav: {
        home: {
            en: 'Home',
            ar: 'الرئيسية',
            fr: 'Accueil',
            es: 'Inicio',
        },
        about: {
            en: 'About',
            ar: 'من نحن',
            fr: 'À Propos',
            es: 'Nosotros',
        },
        menu: {
            en: 'Menu',
            ar: 'القائمة',
            fr: 'Menu',
            es: 'Menú',
        },
        gallery: {
            en: 'Gallery',
            ar: 'معرض الصور',
            fr: 'Galerie',
            es: 'Galería',
        },
        contact: {
            en: 'Contact',
            ar: 'اتصل بنا',
            fr: 'Contact',
            es: 'Contacto',
        },
        language: {
            en: 'Language',
            ar: 'اللغة',
            fr: 'Langue',
            es: 'Idioma',
        },
    },

    // ===== HERO =====
    hero: {
        afconLive: {
            en: 'Live',
            ar: 'مباشر',
            fr: 'En Direct',
            es: 'En Vivo',
        },
        afcon2025: {
            en: 'AFCON 2025',
            ar: 'كأس أفريقيا 2025',
            fr: 'CAN 2025',
            es: 'CAN 2025',
        },
        // Slide content translations - keyed by slide title patterns
        slides: {
            // Welcome/Main slide
            welcome: {
                title: { en: 'Lubina Blanca', ar: 'لوبينا بلانكا', fr: 'Lubina Blanca', es: 'Lubina Blanca' },
                subtitle: { en: 'Seafood Restaurant', ar: 'مطعم المأكولات البحرية', fr: 'Restaurant de Fruits de Mer', es: 'Restaurante de Mariscos' },
                description: { en: 'Experience the finest Mediterranean seafood in Tangier', ar: 'تجربة أفضل المأكولات البحرية المتوسطية في طنجة', fr: 'Découvrez les meilleurs fruits de mer méditerranéens à Tanger', es: 'Experimente los mejores mariscos mediterráneos en Tánger' },
            },
            // Fresh fish slide
            freshFish: {
                title: { en: 'Fresh from the Sea', ar: 'طازج من البحر', fr: 'Frais de la Mer', es: 'Fresco del Mar' },
                subtitle: { en: 'Daily Catch', ar: 'صيد اليوم', fr: 'Pêche du Jour', es: 'Pesca del Día' },
                description: { en: 'Enjoy the freshest catch prepared to perfection', ar: 'استمتع بأطيب صيد طازج محضر بإتقان', fr: 'Dégustez la pêche la plus fraîche préparée à la perfection', es: 'Disfrute de la captura más fresca preparada a la perfección' },
            },
            // Dining experience
            dining: {
                title: { en: 'Fine Dining', ar: 'تجربة فاخرة', fr: 'Gastronomie', es: 'Alta Cocina' },
                subtitle: { en: 'Mediterranean Cuisine', ar: 'المطبخ المتوسطي', fr: 'Cuisine Méditerranéenne', es: 'Cocina Mediterránea' },
                description: { en: 'Authentic flavors in an elegant atmosphere', ar: 'نكهات أصيلة في أجواء أنيقة', fr: 'Saveurs authentiques dans une ambiance élégante', es: 'Sabores auténticos en un ambiente elegante' },
            },
            // Specialties
            specialties: {
                title: { en: 'Our Specialties', ar: 'تخصصاتنا', fr: 'Nos Spécialités', es: 'Nuestras Especialidades' },
                subtitle: { en: 'Premium Selection', ar: 'اختيار فاخر', fr: 'Sélection Premium', es: 'Selección Premium' },
                description: { en: 'Paella, Couscous, and the finest fish dishes', ar: 'باييلا، كسكس، وأفضل أطباق السمك', fr: 'Paella, Couscous et les meilleurs plats de poisson', es: 'Paella, Cuscús y los mejores platos de pescado' },
            },
        },
    },

    // ===== ABOUT =====
    about: {
        ourStory: {
            en: 'Our Story',
            ar: 'قصتنا',
            fr: 'Notre Histoire',
            es: 'Nuestra Historia',
        },
        title: {
            en: 'About Us',
            ar: 'من نحن',
            fr: 'À Propos',
            es: 'Sobre Nosotros',
        },
        description: {
            en: 'Experience the finest Mediterranean cuisine with fresh seafood and traditional recipes passed down through generations. Our restaurant combines authentic flavors with modern culinary techniques to create an unforgettable dining experience.',
            ar: 'استمتع بأفضل المأكولات المتوسطية مع المأكولات البحرية الطازجة والوصفات التقليدية المتوارثة عبر الأجيال. يجمع مطعمنا بين النكهات الأصيلة وتقنيات الطهي الحديثة لخلق تجربة طعام لا تُنسى.',
            fr: 'Découvrez la meilleure cuisine méditerranéenne avec des fruits de mer frais et des recettes traditionnelles transmises de génération en génération. Notre restaurant allie saveurs authentiques et techniques culinaires modernes pour créer une expérience gastronomique inoubliable.',
            es: 'Experimente la mejor cocina mediterránea con mariscos frescos y recetas tradicionales transmitidas de generación en generación. Nuestro restaurante combina sabores auténticos con técnicas culinarias modernas para crear una experiencia gastronómica inolvidable.',
        },
        commitment: {
            en: 'Our commitment to quality and authenticity shines through in every dish we serve. From the freshest seafood to carefully selected ingredients, we bring the flavors of the Mediterranean coast directly to your table.',
            ar: 'يتجلى التزامنا بالجودة والأصالة في كل طبق نقدمه. من أطيب المأكولات البحرية إلى المكونات المختارة بعناية، نحضر نكهات ساحل البحر المتوسط مباشرة إلى طاولتك.',
            fr: 'Notre engagement envers la qualité et l\'authenticité transparaît dans chaque plat que nous servons. Des fruits de mer les plus frais aux ingrédients soigneusement sélectionnés, nous apportons les saveurs de la côte méditerranéenne directement à votre table.',
            es: 'Nuestro compromiso con la calidad y la autenticidad se refleja en cada plato que servimos. Desde los mariscos más frescos hasta ingredientes cuidadosamente seleccionados, traemos los sabores de la costa mediterránea directamente a su mesa.',
        },
        statsYears: {
            en: 'Years',
            ar: 'سنة',
            fr: 'Ans',
            es: 'Años',
        },
        statsDishes: {
            en: 'Dishes',
            ar: 'أطباق',
            fr: 'Plats',
            es: 'Platos',
        },
        statsRating: {
            en: 'Rating',
            ar: 'تقييم',
            fr: 'Étoiles',
            es: 'Calificación',
        },
    },

    // ===== MENU SECTION =====
    menu: {
        title: {
            en: 'Our Menu',
            ar: 'قائمتنا',
            fr: 'Notre Menu',
            es: 'Nuestro Menú',
        },
        subtitle: {
            en: 'Discover our selection of Mediterranean delights',
            ar: 'اكتشف مجموعتنا من المأكولات المتوسطية',
            fr: 'Découvrez notre sélection de délices méditerranéens',
            es: 'Descubre nuestra selección de delicias mediterráneas',
        },
        viewFullMenu: {
            en: 'View Full Menu',
            ar: 'عرض القائمة الكاملة',
            fr: 'Voir le Menu Complet',
            es: 'Ver Menú Completo',
        },
        showLess: {
            en: 'Show Less',
            ar: 'عرض أقل',
            fr: 'Voir Moins',
            es: 'Ver Menos',
        },
        preparationOptions: {
            en: 'Preparation Options',
            ar: 'خيارات التحضير',
            fr: 'Options de Préparation',
            es: 'Opciones de Preparación',
        },
        moreImages: {
            en: 'More Images',
            ar: 'المزيد من الصور',
            fr: 'Plus d\'Images',
            es: 'Más Imágenes',
        },
        optionsAvailable: {
            en: 'Options available',
            ar: 'خيارات متاحة',
            fr: 'Options disponibles',
            es: 'Opciones disponibles',
        },
        // Category translations
        categories: {
            all: {
                en: 'All',
                ar: 'الكل',
                fr: 'Tout',
                es: 'Todo',
            },
            paella: {
                en: 'Paella',
                ar: 'الباييلا',
                fr: 'Paella',
                es: 'Paella',
            },
            couscous: {
                en: 'Couscous',
                ar: 'الكسكس',
                fr: 'Couscous',
                es: 'Cuscús',
            },
            salads: {
                en: 'Salads',
                ar: 'سلطات',
                fr: 'Salades',
                es: 'Ensaladas',
            },
            soups: {
                en: 'Soups',
                ar: 'الحساء',
                fr: 'Soupes',
                es: 'Sopas',
            },
            fishDishes: {
                en: 'Fish Dishes',
                ar: 'أطباق السمك',
                fr: 'Plats de Poisson',
                es: 'Platos de Pescado',
            },
            fishByKilo: {
                en: 'Fish by Kilo',
                ar: 'السمك بالكيلو',
                fr: 'Poisson au Kilo',
                es: 'Pescado por Kilo',
            },
            desserts: {
                en: 'Desserts',
                ar: 'الحلويات',
                fr: 'Desserts',
                es: 'Postres',
            },
            drinks: {
                en: 'Drinks',
                ar: 'المشروبات',
                fr: 'Boissons',
                es: 'Bebidas',
            },
        },
    },

    // ===== GALLERY =====
    gallery: {
        title: {
            en: 'Gallery',
            ar: 'معرض الصور',
            fr: 'Galerie',
            es: 'Galería',
        },
        subtitle: {
            en: 'A glimpse into our culinary world',
            ar: 'لمحة عن عالمنا الطهوي',
            fr: 'Un aperçu de notre monde culinaire',
            es: 'Un vistazo a nuestro mundo culinario',
        },
    },

    // ===== INTERIOR =====
    interior: {
        title: {
            en: 'Our Space',
            ar: 'قاعتنا',
            fr: 'Notre Espace',
            es: 'Nuestro Espacio',
        },
        subtitle: {
            en: 'Elegant dining spaces for every occasion',
            ar: 'مساحات طعام أنيقة لكل مناسبة',
            fr: 'Des espaces élégants pour chaque occasion',
            es: 'Espacios elegantes para cada ocasión',
        },
    },

    // ===== CONTACT =====
    contact: {
        title: {
            en: 'Visit Us',
            ar: 'زورونا',
            fr: 'Visitez-Nous',
            es: 'Visítenos',
        },
        subtitle: {
            en: 'Experience exceptional Mediterranean cuisine in Tangier',
            ar: 'استمتع بتجربة مأكولات البحر المتوسط الاستثنائية في طنجة',
            fr: 'Découvrez une cuisine méditerranéenne exceptionnelle à Tanger',
            es: 'Experimente la excepcional cocina mediterránea en Tánger',
        },
        callForReservations: {
            en: 'Call for Reservations',
            ar: 'اتصل للحجز',
            fr: 'Appelez pour Réserver',
            es: 'Llame para Reservar',
        },
        speakWithUs: {
            en: 'Speak with us directly',
            ar: 'تحدث معنا مباشرة',
            fr: 'Parlez-nous directement',
            es: 'Hable con nosotros directamente',
        },
        open24Hours: {
            en: 'Open 24 hours - Call anytime!',
            ar: 'مفتوح 24 ساعة - اتصل في أي وقت!',
            fr: 'Ouvert 24h/24 - Appelez quand vous voulez!',
            es: '¡Abierto 24 horas - Llame cuando quiera!',
        },
        address: {
            en: 'Address',
            ar: 'العنوان',
            fr: 'Adresse',
            es: 'Dirección',
        },
        email: {
            en: 'Email',
            ar: 'البريد الإلكتروني',
            fr: 'Email',
            es: 'Correo',
        },
        hours: {
            en: 'Hours',
            ar: 'ساعات العمل',
            fr: 'Horaires',
            es: 'Horario',
        },
        openAllDay: {
            en: 'Open 24 Hours',
            ar: 'مفتوح 24 ساعة',
            fr: 'Ouvert 24h/24',
            es: 'Abierto 24 Horas',
        },
        everyDay: {
            en: 'Every day of the week',
            ar: 'كل يوم من أيام الأسبوع',
            fr: 'Tous les jours de la semaine',
            es: 'Todos los días de la semana',
        },
    },

    // ===== FOOTER =====
    footer: {
        copyright: {
            en: 'All rights reserved',
            ar: 'جميع الحقوق محفوظة',
            fr: 'Tous droits réservés',
            es: 'Todos los derechos reservados',
        },
        followUs: {
            en: 'Follow Us',
            ar: 'تابعنا',
            fr: 'Suivez-Nous',
            es: 'Síguenos',
        },
    },

    // ===== TABLET MENU =====
    tabletMenu: {
        items: {
            en: 'items',
            ar: 'عناصر',
            fr: 'articles',
            es: 'artículos',
        },
        item: {
            en: 'item',
            ar: 'عنصر',
            fr: 'article',
            es: 'artículo',
        },
        in: {
            en: 'in',
            ar: 'في',
            fr: 'dans',
            es: 'en',
        },
        tapToView: {
            en: 'Tap any item to view details',
            ar: 'انقر على أي عنصر لعرض التفاصيل',
            fr: 'Appuyez sur un article pour voir les détails',
            es: 'Toque cualquier artículo para ver detalles',
        },
        loadingMenu: {
            en: 'Loading menu...',
            ar: 'جاري تحميل القائمة...',
            fr: 'Chargement du menu...',
            es: 'Cargando menú...',
        },
        noItems: {
            en: 'No items found in this category.',
            ar: 'لم يتم العثور على عناصر في هذه الفئة.',
            fr: 'Aucun article trouvé dans cette catégorie.',
            es: 'No se encontraron artículos en esta categoría.',
        },
    },

    // ===== AFCON WATCH =====
    afcon: {
        title: {
            en: 'Watch AFCON 2025',
            ar: 'شاهد كأس أفريقيا 2025',
            fr: 'Regardez la CAN 2025',
            es: 'Ver CAN 2025',
        },
        subtitle: {
            en: 'Enjoy the matches with us',
            ar: 'استمتع بالمباريات معنا',
            fr: 'Profitez des matchs avec nous',
            es: 'Disfruta los partidos con nosotros',
        },
        live: {
            en: 'LIVE',
            ar: 'مباشر',
            fr: 'EN DIRECT',
            es: 'EN VIVO',
        },
        watchWith: {
            en: 'Watch With Us',
            ar: 'شاهد معنا',
            fr: 'Regardez Avec Nous',
            es: 'Mira Con Nosotros',
        },
        africaCup: {
            en: 'Africa Cup 2025 🇲🇦',
            ar: 'كأس أفريقيا 2025 🇲🇦',
            fr: 'Coupe d\'Afrique 2025 🇲🇦',
            es: 'Copa de África 2025 🇲🇦',
        },
        watchLiveTitle: {
            en: 'Watch Live at Lubina Blanca',
            ar: 'شاهد البث المباشر في لوبينا بلانكا',
            fr: 'Regardez en Direct à Lubina Blanca',
            es: 'Ver en Vivo en Lubina Blanca',
        },
        supportMorocco: {
            en: 'Support Morocco\'s journey with great food, drinks & atmosphere',
            ar: 'ادعم رحلة المغرب مع طعام ومشروبات وأجواء رائعة',
            fr: 'Soutenez le Maroc avec de la bonne nourriture, des boissons et une ambiance',
            es: 'Apoya a Marruecos con buena comida, bebidas y ambiente',
        },
        noReservation: {
            en: 'No Reservation Needed',
            ar: 'لا حاجة للحجز',
            fr: 'Pas de Réservation Requise',
            es: 'Sin Reserva Necesaria',
        },
        justWalkIn: {
            en: 'Just walk in and enjoy the match!',
            ar: 'ادخل واستمتع بالمباراة!',
            fr: 'Entrez et profitez du match!',
            es: '¡Entra y disfruta del partido!',
        },
        joinUs: {
            en: 'Join us at Lubina Blanca to celebrate every goal, every victory! Enjoy the game with delicious Mediterranean cuisine and an amazing atmosphere.',
            ar: 'انضم إلينا في لوبينا بلانكا للاحتفال بكل هدف، كل انتصار! استمتع باللعبة مع المأكولات المتوسطية اللذيذة والأجواء الرائعة.',
            fr: 'Rejoignez-nous à Lubina Blanca pour célébrer chaque but, chaque victoire! Profitez du match avec une délicieuse cuisine méditerranéenne et une ambiance incroyable.',
            es: '¡Únete a nosotros en Lubina Blanca para celebrar cada gol, cada victoria! Disfruta del partido con deliciosa cocina mediterránea y un ambiente increíble.',
        },
        viewOurMenu: {
            en: 'View Our Menu',
            ar: 'عرض قائمتنا',
            fr: 'Voir Notre Menu',
            es: 'Ver Nuestro Menú',
        },
        watchAllMatches: {
            en: 'Watch All Matches Here!',
            ar: 'شاهد جميع المباريات هنا!',
            fr: 'Regardez Tous les Matchs Ici!',
            es: '¡Mira Todos los Partidos Aquí!',
        },
        freshFood: {
            en: 'Fresh food • Cold drinks • Great atmosphere',
            ar: 'طعام طازج • مشروبات باردة • أجواء رائعة',
            fr: 'Nourriture fraîche • Boissons froides • Bonne ambiance',
            es: 'Comida fresca • Bebidas frías • Gran ambiente',
        },
        moroccoGroupStage: {
            en: 'Morocco Group Stage',
            ar: 'مرحلة مجموعات المغرب',
            fr: 'Phase de Groupes du Maroc',
            es: 'Fase de Grupos de Marruecos',
        },
        celebrateEveryGoal: {
            en: '🏟️ Celebrate every goal with us • Open during all match times 🏟️',
            ar: '🏟️ احتفل بكل هدف معنا • مفتوح خلال جميع أوقات المباريات 🏟️',
            fr: '🏟️ Célébrez chaque but avec nous • Ouvert pendant tous les matchs 🏟️',
            es: '🏟️ Celebra cada gol con nosotros • Abierto durante todos los partidos 🏟️',
        },
    },

    // ===== MENU ITEM DESCRIPTIONS =====
    menuDescriptions: {
        // Paella
        paellaSpecial: {
            en: 'Traditional Spanish paella with saffron rice, seafood, and authentic spices',
            ar: 'باييلا إسبانية تقليدية مع أرز الزعفران والمأكولات البحرية والتوابل الأصيلة',
            fr: 'Paella espagnole traditionnelle avec riz au safran, fruits de mer et épices authentiques',
            es: 'Paella española tradicional con arroz con azafrán, mariscos y especias auténticas',
        },
        paellaSpecial2: {
            en: 'Traditional Spanish paella with saffron rice, seafood, and authentic spices for two',
            ar: 'باييلا إسبانية تقليدية مع أرز الزعفران والمأكولات البحرية والتوابل الأصيلة لشخصين',
            fr: 'Paella espagnole traditionnelle avec riz au safran, fruits de mer et épices authentiques pour deux',
            es: 'Paella española tradicional con arroz con azafrán, mariscos y especias auténticas para dos',
        },
        // Couscous
        couscousPoulet: {
            en: 'Traditional Moroccan couscous with tender chicken and vegetables',
            ar: 'كسكس مغربي تقليدي مع دجاج طري وخضروات',
            fr: 'Couscous marocain traditionnel avec poulet tendre et légumes',
            es: 'Cuscús marroquí tradicional con pollo tierno y verduras',
        },
        couscousBeldi: {
            en: 'Authentic Beldi-style couscous with free-range chicken and seven vegetables',
            ar: 'كسكس بلدي أصيل مع دجاج بلدي وسبع خضروات',
            fr: 'Couscous authentique style Beldi avec poulet fermier et sept légumes',
            es: 'Cuscús auténtico estilo Beldi con pollo de corral y siete verduras',
        },
        couscousViande: {
            en: 'Traditional couscous with tender lamb or beef and aromatic vegetables',
            ar: 'كسكس تقليدي مع لحم غنم أو لحم بقر طري وخضروات عطرية',
            fr: 'Couscous traditionnel avec agneau ou bœuf tendre et légumes aromatiques',
            es: 'Cuscús tradicional con cordero o ternera tierna y verduras aromáticas',
        },
        couscousPoissons: {
            en: 'Fresh fish couscous with seasonal catch and rich broth',
            ar: 'كسكس السمك الطازج مع صيد الموسم ومرق غني',
            fr: 'Couscous de poisson frais avec prise de saison et bouillon riche',
            es: 'Cuscús de pescado fresco con pesca de temporada y caldo rico',
        },
        // Salads
        saladeNicoise: {
            en: 'Classic French salad with tuna, eggs, olives, and fresh vegetables',
            ar: 'سلطة فرنسية كلاسيكية مع التونة والبيض والزيتون والخضروات الطازجة',
            fr: 'Salade française classique avec thon, œufs, olives et légumes frais',
            es: 'Ensalada francesa clásica con atún, huevos, aceitunas y verduras frescas',
        },
        saladeFruitsDeMer: {
            en: 'Fresh seafood salad with mixed shellfish and citrus dressing',
            ar: 'سلطة المأكولات البحرية الطازجة مع المحار المشكل وتتبيلة الحمضيات',
            fr: 'Salade de fruits de mer frais avec coquillages mélangés et vinaigrette aux agrumes',
            es: 'Ensalada de mariscos frescos con mariscos mixtos y aderezo cítrico',
        },
        saladeVerte: {
            en: 'Fresh green salad with seasonal lettuce and house vinaigrette',
            ar: 'سلطة خضراء طازجة مع خس موسمي وصلصة فينغريت المنزل',
            fr: 'Salade verte fraîche avec laitue de saison et vinaigrette maison',
            es: 'Ensalada verde fresca con lechuga de temporada y vinagreta de la casa',
        },
        saladeArabe: {
            en: 'Traditional Arabic salad with tomatoes, cucumbers, and mint',
            ar: 'سلطة عربية تقليدية مع الطماطم والخيار والنعناع',
            fr: 'Salade arabe traditionnelle avec tomates, concombres et menthe',
            es: 'Ensalada árabe tradicional con tomates, pepinos y menta',
        },
        saladeRusse: {
            en: 'Russian-style potato salad with vegetables and mayonnaise',
            ar: 'سلطة البطاطس على الطريقة الروسية مع الخضروات والمايونيز',
            fr: 'Salade de pommes de terre à la russe avec légumes et mayonnaise',
            es: 'Ensalada rusa de patatas con verduras y mayonesa',
        },
        saladeSpecial: {
            en: 'Chef\'s special salad with seasonal ingredients',
            ar: 'سلطة الشيف الخاصة مع مكونات موسمية',
            fr: 'Salade spéciale du chef avec ingrédients de saison',
            es: 'Ensalada especial del chef con ingredientes de temporada',
        },
        // Soups
        soupeSpecial: {
            en: 'Chef\'s special soup of the day with fresh ingredients',
            ar: 'حساء الشيف الخاص لليوم مع مكونات طازجة',
            fr: 'Soupe spéciale du chef du jour avec ingrédients frais',
            es: 'Sopa especial del chef del día con ingredientes frescos',
        },
        soupeRoyal: {
            en: 'Premium seafood soup with lobster, fish, and aromatic herbs',
            ar: 'حساء المأكولات البحرية الفاخر مع الكركند والسمك والأعشاب العطرية',
            fr: 'Soupe de fruits de mer premium avec homard, poisson et herbes aromatiques',
            es: 'Sopa de mariscos premium con langosta, pescado y hierbas aromáticas',
        },
        // Fish Dishes
        fritureSpeciale: {
            en: 'Special mixed fried fish platter with seasonal catch',
            ar: 'طبق سمك مقلي مشكل خاص مع صيد الموسم',
            fr: 'Assiette de poisson frit mixte spécial avec prise de saison',
            es: 'Plato especial de pescado frito mixto con pesca de temporada',
        },
        calamars: {
            en: 'Grilled or fried calamari with lemon and garlic sauce',
            ar: 'حبار مشوي أو مقلي مع صلصة الليمون والثوم',
            fr: 'Calamars grillés ou frits avec sauce citron et ail',
            es: 'Calamares a la plancha o fritos con salsa de limón y ajo',
        },
        gambasPilPil: {
            en: 'Sizzling prawns in spicy garlic oil, traditional Spanish style',
            ar: 'قريدس ساخن في زيت ثوم حار، على الطريقة الإسبانية التقليدية',
            fr: 'Crevettes grésillantes dans l\'huile d\'ail épicée, style espagnol traditionnel',
            es: 'Gambas chisporroteantes en aceite de ajo picante, estilo español tradicional',
        },
        saumonAssiette: {
            en: 'Fresh grilled salmon steak with herbs and lemon',
            ar: 'شريحة سلمون مشوية طازجة مع الأعشاب والليمون',
            fr: 'Steak de saumon grillé frais avec herbes et citron',
            es: 'Filete de salmón a la parrilla fresco con hierbas y limón',
        },
        huitres: {
            en: 'Fresh oysters served on ice with lemon',
            ar: 'محار طازج يقدم على الثلج مع الليمون',
            fr: 'Huîtres fraîches servies sur glace avec citron',
            es: 'Ostras frescas servidas sobre hielo con limón',
        },
        crab: {
            en: 'Fresh crab prepared to your preference',
            ar: 'سلطعون طازج محضر حسب رغبتك',
            fr: 'Crabe frais préparé selon vos préférences',
            es: 'Cangrejo fresco preparado a su gusto',
        },
        anchois: {
            en: 'Fresh anchovies grilled or marinated',
            ar: 'أنشوجة طازجة مشوية أو متبلة',
            fr: 'Anchois frais grillés ou marinés',
            es: 'Anchoas frescas a la parrilla o marinadas',
        },
        pilpilRoyal: {
            en: 'Royal seafood pil pil with premium ingredients',
            ar: 'طبق بيل بيل ملكي للمأكولات البحرية مع مكونات فاخرة',
            fr: 'Pil pil royal aux fruits de mer avec ingrédients premium',
            es: 'Pil pil real de mariscos con ingredientes premium',
        },
        gambasPlanchat: {
            en: 'Grilled prawns on plancha with garlic butter',
            ar: 'قريدس مشوي على البلانشا مع زبدة الثوم',
            fr: 'Crevettes grillées à la plancha avec beurre à l\'ail',
            es: 'Gambas a la plancha con mantequilla de ajo',
        },
        platPoissonRoyal: {
            en: 'Royal fish platter with chef\'s selection of premium seafood',
            ar: 'طبق سمك ملكي مع اختيار الشيف من المأكولات البحرية الفاخرة',
            fr: 'Assiette royale de poisson avec sélection du chef de fruits de mer premium',
            es: 'Plato real de pescado con selección del chef de mariscos premium',
        },
        thon: {
            en: 'Fresh tuna steak grilled or seared',
            ar: 'شريحة تونة طازجة مشوية أو محمرة',
            fr: 'Steak de thon frais grillé ou saisi',
            es: 'Filete de atún fresco a la parrilla o sellado',
        },
        angola: {
            en: 'Premium specialty fish preparation',
            ar: 'تحضير سمك متخصص فاخر',
            fr: 'Préparation de poisson spécialité premium',
            es: 'Preparación de pescado especialidad premium',
        },
        // Fish by Kilo
        bogavante: {
            en: 'Fresh lobster sold by weight',
            ar: 'كركند طازج يباع بالوزن',
            fr: 'Homard frais vendu au poids',
            es: 'Langosta fresca vendida por peso',
        },
        langusta: {
            en: 'Fresh spiny lobster sold by weight',
            ar: 'جراد البحر الشائك الطازج يباع بالوزن',
            fr: 'Langouste fraîche vendue au poids',
            es: 'Langosta espinosa fresca vendida por peso',
        },
        royalKg: {
            en: 'Premium royal fish selection',
            ar: 'اختيار سمك ملكي فاخر',
            fr: 'Sélection de poisson royal premium',
            es: 'Selección de pescado real premium',
        },
        dourada: {
            en: 'Sea bream sold by weight',
            ar: 'سمك الدوراد يباع بالوزن',
            fr: 'Daurade vendue au poids',
            es: 'Dorada vendida por peso',
        },
        sole: {
            en: 'Fresh sole fish sold by weight',
            ar: 'سمك موسى الطازج يباع بالوزن',
            fr: 'Sole fraîche vendue au poids',
            es: 'Lenguado fresco vendido por peso',
        },
        // Desserts
        flan: {
            en: 'Classic caramel custard dessert',
            ar: 'حلوى الكريم كراميل الكلاسيكية',
            fr: 'Dessert classique de crème caramel',
            es: 'Postre clásico de flan de caramelo',
        },
        fruitsSaison: {
            en: 'Fresh seasonal fruit platter',
            ar: 'طبق فواكه موسمية طازجة',
            fr: 'Assiette de fruits frais de saison',
            es: 'Plato de frutas frescas de temporada',
        },
        // Drinks
        eau05: {
            en: 'Bottled water 0.5L',
            ar: 'ماء معبأ 0.5 لتر',
            fr: 'Eau en bouteille 0,5L',
            es: 'Agua embotellada 0,5L',
        },
        eau1: {
            en: 'Bottled water 1L or glass',
            ar: 'ماء معبأ 1 لتر أو كوب',
            fr: 'Eau en bouteille 1L ou verre',
            es: 'Agua embotellada 1L o vaso',
        },
        boissonsGazeuses: {
            en: 'Soft drinks 0.5L',
            ar: 'مشروبات غازية 0.5 لتر',
            fr: 'Boissons gazeuses 0,5L',
            es: 'Refrescos 0,5L',
        },
        // Preparation options
        prepGrilled: {
            en: 'Grilled',
            ar: 'مشوي',
            fr: 'Grillé',
            es: 'A la parrilla',
        },
        prepFried: {
            en: 'Fried',
            ar: 'مقلي',
            fr: 'Frit',
            es: 'Frito',
        },
        prepTagine: {
            en: 'Tagine',
            ar: 'طاجين',
            fr: 'Tajine',
            es: 'Tajín',
        },
        prepPlancha: {
            en: 'Plancha',
            ar: 'بلانشا',
            fr: 'Plancha',
            es: 'Plancha',
        },
        available: {
            en: 'Available:',
            ar: 'متوفر:',
            fr: 'Disponible:',
            es: 'Disponible:',
        },
        onRequest: {
            en: 'On request',
            ar: 'عند الطلب',
            fr: 'Sur demande',
            es: 'Bajo pedido',
        },
    },
} as const;

// Helper type for accessing translations
export type TranslationKey = keyof typeof translations;
export type TranslationSection<T extends TranslationKey> = keyof typeof translations[T];

