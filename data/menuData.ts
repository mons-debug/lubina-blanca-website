export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  images?: string[]; // Multiple images for gallery view
  preparationOptions?: string; // e.g., "Available: Grilled, Tagine, Plancha, Fried"
  imagePosition?: { x: number; y: number; zoom: number }; // Main image positioning
  imagesPositions?: Array<{ x: number; y: number; zoom: number }>; // Gallery images positioning
}

export const menuCategories = [
  "All",
  "Paella",
  "Couscous",
  "Salads",
  "Soups",
  "Fish Dishes",
  "Fish by Kilo",
  "Desserts",
  "Drinks"
];

export const menuItems: MenuItem[] = [
  {
    "name": "Paella Special (1 person)",
    "description": "Traditional Spanish paella with saffron rice, seafood, and authentic spices",
    "price": "50.00 DH",
    "category": "Paella",
    "image": "/uploads/1762788129342-WhatsApp-Image-2024-06-29-at-16.23.18-(1).jpg",
    "id": "1",
    "nameTranslations": {
      "en": "Paella Special (1 person)",
      "ar": "باييلا سبيسيال (شخص واحد)",
      "fr": "Paella Spéciale (1 personne)",
      "es": "Paella Especial (1 persona)"
    },
    "descriptionTranslations": {
      "en": "Traditional Spanish paella with saffron rice, seafood, and authentic spices",
      "ar": "باييلا إسبانية تقليدية مع أرز الزعفران والمأكولات البحرية والتوابل الأصيلة",
      "fr": "Paella espagnole traditionnelle avec riz au safran, fruits de mer et épices authentiques",
      "es": "Paella española tradicional con arroz con azafrán, mariscos y especias auténticas"
    },
    "sortOrder": 9
  },
  {
    "name": "Paella Spécial (2 persons)",
    "description": "Traditional Spanish paella with saffron rice, seafood, and authentic spices for two",
    "price": "100.00 DH",
    "category": "Paella",
    "image": "/uploads/1764977359883-paella.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "2",
    "nameTranslations": {
      "en": "Paella Special (2 persons)",
      "ar": "باييلا سبيسيال (شخصين)",
      "fr": "Paella Spéciale (2 personnes)",
      "es": "Paella Especial (2 personas)"
    },
    "descriptionTranslations": {
      "en": "Traditional Spanish paella with saffron rice, seafood, and authentic spices for two",
      "ar": "باييلا إسبانية تقليدية لشخصين",
      "fr": "Paella traditionnelle pour deux",
      "es": "Paella tradicional para dos"
    },
    "sortOrder": 8
  },
  {
    "name": "Couscous au Poulet",
    "description": "Traditional Moroccan couscous with tender chicken and vegetables",
    "price": "60.00 DH",
    "category": "Couscous",
    "image": "/uploads/1764977380588-couscous.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "3",
    "nameTranslations": {
      "en": "Couscous with Chicken",
      "ar": "كسكس بالدجاج",
      "fr": "Couscous au Poulet",
      "es": "Cuscús con Pollo"
    },
    "descriptionTranslations": {
      "en": "Traditional Moroccan couscous with tender chicken and vegetables",
      "ar": "كسكس مغربي تقليدي مع دجاج طري وخضروات",
      "fr": "Couscous marocain avec poulet tendre et légumes",
      "es": "Cuscús marroquí con pollo tierno y verduras"
    },
    "sortOrder": 10
  },
  {
    "name": "Couscous au Poulet (Beldi)",
    "description": "Authentic Beldi-style couscous with free-range chicken and seven vegetables",
    "price": "70.00 DH",
    "category": "Couscous",
    "image": "/uploads/1764977395960-couscous.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "4",
    "nameTranslations": {
      "en": "Couscous with Chicken (Beldi)",
      "ar": "كسكس بالدجاج البلدي",
      "fr": "Couscous au Poulet (Beldi)",
      "es": "Cuscús con Pollo (Beldi)"
    },
    "descriptionTranslations": {
      "en": "Authentic Beldi-style couscous with free-range chicken",
      "ar": "كسكس بلدي أصيل مع دجاج بلدي",
      "fr": "Couscous Beldi avec poulet fermier",
      "es": "Cuscús Beldi con pollo de corral"
    },
    "sortOrder": 11
  },
  {
    "name": "Couscous à la Viande",
    "description": "Traditional couscous with tender lamb or beef and aromatic vegetables",
    "price": "80.00 DH",
    "category": "Couscous",
    "image": "/uploads/1765022746123-couscous.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "5",
    "nameTranslations": {
      "en": "Couscous with Meat",
      "ar": "كسكس باللحم",
      "fr": "Couscous à la Viande",
      "es": "Cuscús con Carne"
    },
    "descriptionTranslations": {
      "en": "Traditional couscous with tender lamb or beef",
      "ar": "كسكس تقليدي مع لحم غنم أو بقر طري",
      "fr": "Couscous traditionnel avec agneau ou bœuf",
      "es": "Cuscús tradicional con cordero o ternera"
    },
    "sortOrder": 12
  },
  {
    "name": "Couscous aux Poissons",
    "description": "Fresh fish couscous with seasonal catch and rich broth",
    "price": "Sur demande",
    "category": "Couscous",
    "image": "/uploads/1765022630017-IMG_2780-2.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "6",
    "nameTranslations": {
      "en": "Couscous with Fish",
      "ar": "كسكس بالسمك",
      "fr": "Couscous aux Poissons",
      "es": "Cuscús con Pescado"
    },
    "descriptionTranslations": {
      "en": "Fresh fish couscous with seasonal catch",
      "ar": "كسكس السمك الطازج مع صيد الموسم",
      "fr": "Couscous au poisson frais",
      "es": "Cuscús de pescado fresco"
    },
    "sortOrder": 13
  },
  {
    "name": "Salade Niçoise",
    "description": "Classic French salad with tuna, eggs, olives, and fresh vegetables",
    "price": "40.00 DH",
    "category": "Salads",
    "image": "/uploads/1764973421829-IMG_1038.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "7",
    "nameTranslations": {
      "en": "Niçoise Salad",
      "ar": "سلطة نيسواز",
      "fr": "Salade Niçoise",
      "es": "Ensalada Niçoise"
    },
    "descriptionTranslations": {
      "en": "Classic French salad with tuna and vegetables",
      "ar": "سلطة فرنسية كلاسيكية مع التونة",
      "fr": "Salade classique avec thon",
      "es": "Ensalada clásica con atún"
    },
    "sortOrder": 14
  },
  {
    "name": "Salade Fruits de Mer",
    "description": "Fresh seafood salad with mixed shellfish and citrus dressing",
    "price": "100.00 DH",
    "category": "Salads",
    "image": "/uploads/1765021047660-frt.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "8",
    "nameTranslations": {
      "en": "Seafood Salad",
      "ar": "سلطة فواكه البحر",
      "fr": "Salade Fruits de Mer",
      "es": "Ensalada de Mariscos"
    },
    "descriptionTranslations": {
      "en": "Fresh seafood salad with shellfish",
      "ar": "سلطة المأكولات البحرية الطازجة",
      "fr": "Salade de fruits de mer frais",
      "es": "Ensalada de mariscos frescos"
    },
    "sortOrder": 15
  },
  {
    "name": "Salade Verte",
    "description": "Fresh green salad with seasonal lettuce and house vinaigrette",
    "price": "40.00 DH",
    "category": "Salads",
    "image": "/uploads/1764977309371-salade-vert_.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "9",
    "nameTranslations": {
      "en": "Green Salad",
      "ar": "سلطة خضراء",
      "fr": "Salade Verte",
      "es": "Ensalada Verde"
    },
    "descriptionTranslations": {
      "en": "Fresh green salad with house vinaigrette",
      "ar": "سلطة خضراء طازجة",
      "fr": "Salade verte fraîche",
      "es": "Ensalada verde fresca"
    },
    "sortOrder": 16
  },
  {
    "name": "Salade Arabe",
    "description": "Traditional Arabic salad with tomatoes, cucumbers, and mint",
    "price": "40.00 DH",
    "category": "Salads",
    "image": "/uploads/1764977323004-salade.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "10",
    "nameTranslations": {
      "en": "Arabian Salad",
      "ar": "سلطة عربية",
      "fr": "Salade Arabe",
      "es": "Ensalada Árabe"
    },
    "descriptionTranslations": {
      "en": "Traditional Arabic salad",
      "ar": "سلطة عربية تقليدية",
      "fr": "Salade arabe traditionnelle",
      "es": "Ensalada árabe tradicional"
    },
    "sortOrder": 17
  },
  {
    "name": "Salade Russe",
    "description": "Russian-style potato salad with vegetables and mayonnaise",
    "price": "40.00 DH",
    "category": "Salads",
    "image": "/uploads/1764973655792-salade-rosa.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "11",
    "nameTranslations": {
      "en": "Russian Salad",
      "ar": "سلطة روسية",
      "fr": "Salade Russe",
      "es": "Ensalada Rusa"
    },
    "descriptionTranslations": {
      "en": "Russian-style potato salad",
      "ar": "سلطة البطاطس الروسية",
      "fr": "Salade russe de pommes de terre",
      "es": "Ensalada rusa de patatas"
    },
    "sortOrder": 18
  },
  {
    "name": "Salade Special",
    "description": "Chef's special salad with seasonal ingredients",
    "price": "Sur demande",
    "category": "Salads",
    "image": "/uploads/1765022711356-WhatsApp-Image-2024-07-25-at-20.38.39.jpeg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "12",
    "nameTranslations": {
      "en": "Special Salad",
      "ar": "سلطة خاصة",
      "fr": "Salade Spéciale",
      "es": "Ensalada Especial"
    },
    "descriptionTranslations": {
      "en": "Chef's special salad",
      "ar": "سلطة الشيف الخاصة",
      "fr": "Salade spéciale du chef",
      "es": "Ensalada especial del chef"
    },
    "sortOrder": 2
  },
  {
    "name": "Soupe Special",
    "description": "Chef's special soup of the day with fresh ingredients",
    "price": "50.00 DH",
    "category": "Soups",
    "image": "/uploads/1764977468871-souo.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "13",
    "nameTranslations": {
      "en": "Special Soup",
      "ar": "حساء خاص",
      "fr": "Soupe Spéciale",
      "es": "Sopa Especial"
    },
    "descriptionTranslations": {
      "en": "Chef's special soup of the day",
      "ar": "حساء الشيف الخاص لليوم",
      "fr": "Soupe spéciale du jour",
      "es": "Sopa especial del día"
    },
    "sortOrder": 19
  },
  {
    "name": "Soupe Royal",
    "description": "Premium seafood soup with lobster, fish, and aromatic herbs",
    "price": "150.00 DH",
    "category": "Soups",
    "image": "/uploads/1765022886397-IMG_1073.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "14",
    "nameTranslations": {
      "en": "Royal Soup",
      "ar": "حساء رويال",
      "fr": "Soupe Royale",
      "es": "Sopa Royal"
    },
    "descriptionTranslations": {
      "en": "Premium seafood soup with lobster",
      "ar": "حساء المأكولات البحرية الفاخر",
      "fr": "Soupe de fruits de mer premium",
      "es": "Sopa de mariscos premium"
    },
    "sortOrder": 20
  },
  {
    "name": "Friture Spéciale (1 person)",
    "description": "Special mixed fried fish platter with seasonal catch",
    "price": "180.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1764977550753-friture-special.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "15",
    "nameTranslations": {
      "en": "Special Fried Fish",
      "ar": "فريتورا خاصة",
      "fr": "Friture Spéciale",
      "es": "Fritura Especial"
    },
    "descriptionTranslations": {
      "en": "Special mixed fried fish platter",
      "ar": "طبق سمك مقلي مشكل خاص",
      "fr": "Assiette de poisson frit",
      "es": "Plato de pescado frito"
    },
    "sortOrder": 21
  },
  {
    "name": "Calamars",
    "description": "Grilled or fried calamari with lemon and garlic sauce",
    "price": "120.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765021209853-IMG_2778-2.jpg",
    "images": [],
    "preparationOptions": "Available: Grilled, Fried, Plancha",
    "imagesPositions": [],
    "id": "16",
    "nameTranslations": {
      "en": "Calamari",
      "ar": "كالاماري",
      "fr": "Calamars",
      "es": "Calamares"
    },
    "descriptionTranslations": {
      "en": "Grilled or fried calamari",
      "ar": "حبار مشوي أو مقلي",
      "fr": "Calamars grillés ou frits",
      "es": "Calamares a la plancha o fritos"
    },
    "sortOrder": 22
  },
  {
    "name": "Gambas Pil Pil",
    "description": "Sizzling prawns in spicy garlic oil, traditional Spanish style",
    "price": "100.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1764977570482-tajine.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "17",
    "nameTranslations": {
      "en": "Gambas Pil Pil",
      "ar": "جمبري بيل بيل",
      "fr": "Gambas Pil Pil",
      "es": "Gambas al Pil Pil"
    },
    "descriptionTranslations": {
      "en": "Sizzling prawns in garlic oil",
      "ar": "قريدس ساخن في زيت الثوم",
      "fr": "Crevettes à l'huile d'ail",
      "es": "Gambas al ajillo"
    },
    "sortOrder": 23
  },
  {
    "name": "Saumon pour Assiette",
    "description": "Fresh grilled salmon steak with herbs and lemon",
    "price": "120.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765030055953-salmon.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "18",
    "nameTranslations": {
      "en": "Salmon Plate",
      "ar": "طبق سلمون",
      "fr": "Saumon pour Assiette",
      "es": "Plato de Salmón"
    },
    "descriptionTranslations": {
      "en": "Fresh grilled salmon steak",
      "ar": "شريحة سلمون مشوية طازجة",
      "fr": "Steak de saumon grillé",
      "es": "Filete de salmón a la parrilla"
    },
    "sortOrder": 24
  },
  {
    "name": "Rigamonte",
    "description": "Traditional Portuguese-style fish preparation",
    "price": "100.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1764977601883-IMG_4153-5.jpg",
    "images": [
      "/uploads/1765023026232-355316642_635235201970949_4477364875249452850_n-(1).jpg"
    ],
    "preparationOptions": "",
    "imagesPositions": [
      {
        "x": 0,
        "y": 0,
        "zoom": 1
      }
    ],
    "id": "19",
    "nameTranslations": {
      "en": "Rigamonte",
      "ar": "ريغامونتي",
      "fr": "Rigamonte",
      "es": "Rigamonte"
    },
    "descriptionTranslations": {
      "en": "Portuguese-style fish",
      "ar": "سمك على الطريقة البرتغالية",
      "fr": "Poisson style portugais",
      "es": "Pescado estilo portugués"
    },
    "sortOrder": 25
  },
  {
    "name": "Merlan",
    "description": "Grilled whiting fish with olive oil and herbs",
    "price": "100.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1768845785199-i8323-filet-de-merlan-et-ses-pommes-de-terre-au-four.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 26,
    "id": "20"
  },
  {
    "id": "21",
    "name": "Kotcha",
    "description": "Local specialty fish grilled to perfection",
    "price": "80.00 DH",
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop",
    "category": "Fish Dishes",
    "sortOrder": 27
  },
  {
    "name": "Meja",
    "description": "Fresh local fish prepared Mediterranean style",
    "price": "Sur demande",
    "category": "Fish Dishes",
    "image": "/uploads/1764973251675-cociage.jpg",
    "images": [],
    "preparationOptions": "",
    "imagePosition": {
      "x": 4,
      "y": 0,
      "zoom": 1
    },
    "imagesPositions": [],
    "id": "22",
    "nameTranslations": {
      "en": "Meja",
      "ar": "ميخا",
      "fr": "Meja",
      "es": "Meja"
    },
    "descriptionTranslations": {
      "en": "Fresh local fish Mediterranean style",
      "ar": "سمك محلي طازج",
      "fr": "Poisson local style méditerranéen",
      "es": "Pescado local estilo mediterráneo"
    },
    "sortOrder": 28
  },
  {
    "name": "Les Huîtres (Unité)",
    "description": "Fresh oysters served on ice with lemon",
    "price": "20.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765021889150-hute.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "23",
    "nameTranslations": {
      "en": "Oysters (Unit)",
      "ar": "المحار (وحدة)",
      "fr": "Huîtres (Unité)",
      "es": "Ostras (Unidad)"
    },
    "descriptionTranslations": {
      "en": "Fresh oysters on ice",
      "ar": "محار طازج على الثلج",
      "fr": "Huîtres fraîches sur glace",
      "es": "Ostras frescas sobre hielo"
    },
    "sortOrder": 29
  },
  {
    "name": "Crab",
    "description": "Fresh crab prepared to your preference",
    "price": "100.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1764982593367-crab.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "24",
    "nameTranslations": {
      "en": "Crab",
      "ar": "سلطعون",
      "fr": "Crabe",
      "es": "Cangrejo"
    },
    "descriptionTranslations": {
      "en": "Fresh crab",
      "ar": "سلطعون طازج",
      "fr": "Crabe frais",
      "es": "Cangrejo fresco"
    },
    "sortOrder": 30
  },
  {
    "name": "Anchois (Chthoun)",
    "description": "Fresh anchovies grilled or marinated",
    "price": "60.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765021977497-anchois.jpg",
    "images": [
      "/uploads/1768845640742-WhatsApp-Image-2026-01-17-at-21.52.41-(1).jpeg"
    ],
    "preparationOptions": "",
    "imagesPositions": [
      {
        "x": 0,
        "y": 0,
        "zoom": 1
      }
    ],
    "hidden": false,
    "sortOrder": 31,
    "id": "25"
  },
  {
    "name": "Pilpil Royal",
    "description": "Royal seafood pil pil with premium ingredients",
    "price": "Sur demande",
    "category": "Fish Dishes",
    "image": "/uploads/1764982637215-royall-pilpil.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "26",
    "nameTranslations": {
      "en": "Royal Pil Pil",
      "ar": "بيل بيل رويال",
      "fr": "Pilpil Royal",
      "es": "Pil Pil Royal"
    },
    "descriptionTranslations": {
      "en": "Royal seafood pil pil",
      "ar": "طبق بيل بيل ملكي",
      "fr": "Pil pil royal aux fruits de mer",
      "es": "Pil pil real de mariscos"
    },
    "sortOrder": 3
  },
  {
    "name": "Gambas Planchat",
    "description": "Grilled prawns on plancha with garlic butter",
    "price": "120.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765030096546-gamba-plancha.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "27",
    "nameTranslations": {
      "en": "Grilled Prawns",
      "ar": "جمبري مشوي",
      "fr": "Gambas Plancha",
      "es": "Gambas a la Plancha"
    },
    "descriptionTranslations": {
      "en": "Grilled prawns on plancha",
      "ar": "قريدس مشوي على البلانشا",
      "fr": "Crevettes grillées à la plancha",
      "es": "Gambas a la plancha"
    },
    "sortOrder": 32
  },
  {
    "name": "Mandrita",
    "description": "Fresh sea bream grilled with Mediterranean herbs",
    "price": "120.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765022573105-IMG_2779-2.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "28",
    "nameTranslations": {
      "en": "Mandrita",
      "ar": "ماندريتا",
      "fr": "Mandrita",
      "es": "Mandrita"
    },
    "descriptionTranslations": {
      "en": "Fresh sea bream",
      "ar": "سمك الدنيس الطازج",
      "fr": "Daurade fraîche",
      "es": "Dorada fresca"
    },
    "sortOrder": 6
  },
  {
    "name": "Spadon",
    "description": "Swordfish steak grilled or pan-seared",
    "price": "120.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765030506464-melousa.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "29",
    "nameTranslations": {
      "en": "Swordfish",
      "ar": "سمك أبو سيف",
      "fr": "Espadon",
      "es": "Pez Espada"
    },
    "descriptionTranslations": {
      "en": "Swordfish steak",
      "ar": "شريحة سمك أبو سيف",
      "fr": "Steak d'espadon",
      "es": "Filete de pez espada"
    },
    "sortOrder": 7
  },
  {
    "name": "Meloussa",
    "description": "Fresh local fish with traditional preparation",
    "price": "100.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765030484046-melousaa.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "30",
    "nameTranslations": {
      "en": "Meloussa",
      "ar": "ملوسة",
      "fr": "Meloussa",
      "es": "Meloussa"
    },
    "descriptionTranslations": {
      "en": "Fresh local fish",
      "ar": "سمك محلي طازج",
      "fr": "Poisson local frais",
      "es": "Pescado local fresco"
    },
    "sortOrder": 33
  },
  {
    "name": "Rouget",
    "description": "Red mullet grilled with olive oil and lemon",
    "price": "100.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1768845728958-filets-de-rouget-poeles-au-poivre-de-sichuan-et-zestes-d-agrumes.avif",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 34,
    "id": "31"
  },
  {
    "name": "Laouzi",
    "description": "Fresh local specialty fish",
    "price": "90.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1768844798852-29b88093-e93a-48d1-945c-8ccd1e4e8ca7.JPG",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 35,
    "id": "32"
  },
  {
    "name": "Œufs des Poissons",
    "description": "Fish roe prepared Mediterranean style",
    "price": "100.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1768845503609-WhatsApp-Image-2026-01-17-at-21.51.32.jpeg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 36,
    "id": "33"
  },
  {
    "name": "Marrajo",
    "description": "Shark steak grilled with spices",
    "price": "100.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1768847229095-marrajo-a-la-plancha-con-ajada-y-cachelos--lg-128003p192238.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 37,
    "id": "34"
  },
  {
    "name": "Croquette",
    "description": "Fish croquette with crispy coating",
    "price": "10.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1768846349452-1080x1080-Photo-2_1309-How-to-Make-POTATO-CROQUETTES-Like-an-Italian-V1-2.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 38,
    "id": "35"
  },
  {
    "name": "Plat de Poisson Royal",
    "description": "Royal fish platter with chef's selection of premium seafood",
    "price": "Sur demande",
    "category": "Fish Dishes",
    "image": "/uploads/1765018954650-WhatsApp-Image-2024-07-26-at-15.48.57.jpeg",
    "images": [
      "/uploads/1765018983506-3.jpg"
    ],
    "preparationOptions": "",
    "imagesPositions": [
      {
        "x": 0,
        "y": 0,
        "zoom": 1
      }
    ],
    "id": "36",
    "nameTranslations": {
      "en": "Royal Fish Platter",
      "ar": "طبق السمك الملكي",
      "fr": "Plat de Poisson Royal",
      "es": "Plato de Pescado Real"
    },
    "descriptionTranslations": {
      "en": "Royal fish platter",
      "ar": "طبق سمك ملكي",
      "fr": "Assiette royale de poisson",
      "es": "Plato real de pescado"
    },
    "sortOrder": 1
  },
  {
    "name": "Spilinka",
    "description": "Traditional coastal fish specialty",
    "price": "90.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1768844916595-WhatsApp-Image-2026-01-17-at-21.43.53.jpeg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 39,
    "id": "37"
  },
  {
    "name": "Thon",
    "description": "Fresh tuna steak grilled or seared",
    "price": "120.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765029973591-tuna.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "38",
    "nameTranslations": {
      "en": "Tuna",
      "ar": "تونة",
      "fr": "Thon",
      "es": "Atún"
    },
    "descriptionTranslations": {
      "en": "Fresh tuna steak",
      "ar": "شريحة تونة طازجة",
      "fr": "Steak de thon frais",
      "es": "Filete de atún fresco"
    },
    "sortOrder": 5
  },
  {
    "name": "Angolas",
    "description": "Premium specialty fish preparation",
    "price": "400.00 DH",
    "category": "Fish Dishes",
    "image": "/uploads/1765020046413-angola.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "39",
    "nameTranslations": {
      "en": "Angolas",
      "ar": "أنغولاس",
      "fr": "Angolas",
      "es": "Angolas"
    },
    "descriptionTranslations": {
      "en": "Premium specialty fish",
      "ar": "سمك متخصص فاخر",
      "fr": "Poisson spécialité premium",
      "es": "Pescado especialidad premium"
    },
    "sortOrder": 4
  },
  {
    "name": "Bogavante (KG)",
    "description": "Fresh lobster sold by weight",
    "price": "600.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1768845863423-bogavante.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 40,
    "id": "41"
  },
  {
    "name": "Langusta (KG)",
    "description": "Fresh spiny lobster sold by weight",
    "price": "600.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1765020171811-langusta.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "42",
    "nameTranslations": {
      "en": "Spiny Lobster (KG)",
      "ar": "لانغوستا (كجم)",
      "fr": "Languste (KG)",
      "es": "Langosta (KG)"
    },
    "descriptionTranslations": {
      "en": "Spiny lobster by weight",
      "ar": "جراد البحر بالوزن",
      "fr": "Langouste au poids",
      "es": "Langosta por peso"
    },
    "sortOrder": 41
  },
  {
    "name": "Royal (KG)",
    "description": "Premium royal fish selection",
    "price": "1500.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1765020898734-royal.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "43",
    "nameTranslations": {
      "en": "Royal Fish (KG)",
      "ar": "رويال (كجم)",
      "fr": "Royal (KG)",
      "es": "Royal (KG)"
    },
    "descriptionTranslations": {
      "en": "Premium royal fish",
      "ar": "سمك ملكي فاخر",
      "fr": "Poisson royal premium",
      "es": "Pescado real premium"
    },
    "sortOrder": 42
  },
  {
    "name": "Pardio Découpé (KG)",
    "description": "Filleted pardio fish sold by weight",
    "price": "500.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1768845434837-WhatsApp-Image-2026-01-17-at-21.41.45.jpeg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 43,
    "id": "44"
  },
  {
    "name": "Rapel Lalote (KG)",
    "description": "Fresh lalote fish sold by weight",
    "price": "500.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1768846608198-Screenshot-2026-01-19-at-19.16.20.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 44,
    "id": "45"
  },
  {
    "name": "Langusta Gris (KG)",
    "description": "Grey lobster sold by weight",
    "price": "500.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1768845930402-closeup-view-fresh-spiny-lobsters-260nw-2659304455.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 45,
    "id": "46"
  },
  {
    "id": "47",
    "name": "Langostinos (KG)",
    "description": "Large prawns sold by weight",
    "price": "600.00 DH/KG",
    "image": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&h=600&fit=crop",
    "category": "Fish by Kilo",
    "sortOrder": 46
  },
  {
    "name": "Sigala (KG)",
    "description": "Premium sigala fish sold by weight",
    "price": "800.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1768846052752-images.jpeg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 47,
    "id": "48"
  },
  {
    "name": "Filet Lalote (KG)",
    "description": "Lalote fillets sold by weight",
    "price": "500.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1768846631995-Screenshot-2026-01-19-at-19.16.20.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 48,
    "id": "49"
  },
  {
    "name": "Filet Lubina (KG)",
    "description": "Sea bass fillets sold by weight",
    "price": "600.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1768845347723-WhatsApp-Image-2026-01-17-at-21.40.54.jpeg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 49,
    "id": "50"
  },
  {
    "name": "Filet Merou (KG)",
    "description": "Grouper fillets sold by weight",
    "price": "600.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1768845013153-WhatsApp-Image-2026-01-17-at-21.46.30.jpeg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 50,
    "id": "51"
  },
  {
    "name": "Boracci (KG)",
    "description": "Fresh boracci fish sold by weight",
    "price": "400.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1764972504821-borassi.jpg",
    "images": [
      "/uploads/1764972440771-borassi.jpg"
    ],
    "preparationOptions": "",
    "imagesPositions": [
      {
        "x": 0,
        "y": 52,
        "zoom": 1
      }
    ],
    "id": "52",
    "nameTranslations": {
      "en": "Boracci (KG)",
      "ar": "بوراسي (كجم)",
      "fr": "Boracci (KG)",
      "es": "Boracci (KG)"
    },
    "descriptionTranslations": {
      "en": "Fresh boracci fish",
      "ar": "سمك بوراسي طازج",
      "fr": "Poisson boracci frais",
      "es": "Pescado boracci fresco"
    },
    "sortOrder": 51
  },
  {
    "name": "Mero Découpé (KG)",
    "description": "Filleted grouper sold by weight",
    "price": "550.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1764977863468-meru.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "53",
    "nameTranslations": {
      "en": "Grouper Cuts (KG)",
      "ar": "ميرو مقطع (كجم)",
      "fr": "Mérou Découpé (KG)",
      "es": "Mero en Cortes (KG)"
    },
    "descriptionTranslations": {
      "en": "Filleted grouper",
      "ar": "ميرو مقطع",
      "fr": "Mérou en filets",
      "es": "Mero en filetes"
    },
    "sortOrder": 52
  },
  {
    "name": "Shatra (KG)",
    "description": "Fresh shatra fish sold by weight",
    "price": "300.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1762788716377-chatra.jpg",
    "id": "54",
    "nameTranslations": {
      "en": "Shatra (KG)",
      "ar": "شطرة (كجم)",
      "fr": "Shatra (KG)",
      "es": "Shatra (KG)"
    },
    "descriptionTranslations": {
      "en": "Fresh shatra fish",
      "ar": "سمك شطرة طازج",
      "fr": "Poisson shatra frais",
      "es": "Pescado shatra fresco"
    },
    "sortOrder": 53
  },
  {
    "name": "Baghar (KG)",
    "description": "Fresh baghar fish sold by weight",
    "price": "400.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1765020278708-fish1.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "55",
    "nameTranslations": {
      "en": "Baghar (KG)",
      "ar": "بغار (كجم)",
      "fr": "Baghar (KG)",
      "es": "Baghar (KG)"
    },
    "descriptionTranslations": {
      "en": "Fresh baghar fish",
      "ar": "سمك بغار طازج",
      "fr": "Poisson baghar frais",
      "es": "Pescado baghar fresco"
    },
    "sortOrder": 54
  },
  {
    "name": "Dourada (KG)",
    "description": "Sea bream sold by weight",
    "price": "400.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1764977977000-dorada.jpg",
    "images": [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580959375944-620a7c78ea41?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800&h=600&fit=crop"
    ],
    "preparationOptions": "Available: Grilled, Tagine, Plancha, Baked, Salt-Crusted",
    "imagesPositions": [],
    "id": "56",
    "nameTranslations": {
      "en": "Sea Bream (KG)",
      "ar": "دورادا (كجم)",
      "fr": "Daurade (KG)",
      "es": "Dorada (KG)"
    },
    "descriptionTranslations": {
      "en": "Sea bream by weight",
      "ar": "سمك الدوراد بالوزن",
      "fr": "Daurade au poids",
      "es": "Dorada por peso"
    },
    "sortOrder": 55
  },
  {
    "name": "Sole (KG)",
    "description": "Fresh sole fish sold by weight",
    "price": "300.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1765022614647-IMG_2781-2.jpg",
    "images": [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580959375944-620a7c78ea41?w=800&h=600&fit=crop"
    ],
    "preparationOptions": "Available: Grilled, Tagine, Plancha, Fried",
    "imagesPositions": [],
    "id": "57",
    "nameTranslations": {
      "en": "Sole (KG)",
      "ar": "سمك موسى (كجم)",
      "fr": "Sole (KG)",
      "es": "Lenguado (KG)"
    },
    "descriptionTranslations": {
      "en": "Fresh sole fish",
      "ar": "سمك موسى الطازج",
      "fr": "Sole fraîche",
      "es": "Lenguado fresco"
    },
    "sortOrder": 56
  },
  {
    "name": "Torbo (KG)",
    "description": "Fresh turbot sold by weight",
    "price": "350.00 DH/KG",
    "category": "Fish by Kilo",
    "image": "/uploads/1765020339789-fidh3.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "id": "58",
    "nameTranslations": {
      "en": "Turbot (KG)",
      "ar": "توربو (كجم)",
      "fr": "Turbot (KG)",
      "es": "Rodaballo (KG)"
    },
    "descriptionTranslations": {
      "en": "Fresh turbot",
      "ar": "سمك التوربو الطازج",
      "fr": "Turbot frais",
      "es": "Rodaballo fresco"
    },
    "sortOrder": 57
  },
  {
    "name": "Rouget (KG)",
    "description": "Red mullet sold by weight",
    "price": "Sur demande",
    "category": "Fish by Kilo",
    "image": "/uploads/1768846437426-images-(1).jpeg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 58,
    "id": "59"
  },
  {
    "name": "Flan (Crème Caramel)",
    "description": "Classic caramel custard dessert",
    "price": "20.00 DH",
    "category": "Desserts",
    "image": "/uploads/1768845253854-IMG_3468.jpg",
    "images": [],
    "preparationOptions": "",
    "imagesPositions": [],
    "hidden": false,
    "sortOrder": 59,
    "id": "60"
  },
  {
    "name": "Fruits de Saison",
    "description": "Fresh seasonal fruit platter",
    "price": "Sur demande",
    "category": "Desserts",
    "image": "/uploads/1768846722477-WhatsApp-Image-2026-01-17-at-21.36.55.jpeg",
    "images": [
      "/uploads/1768846739961-WhatsApp-Image-2026-01-17-at-21.36.17.jpeg"
    ],
    "preparationOptions": "",
    "imagesPositions": [
      {
        "x": 0,
        "y": 0,
        "zoom": 1
      }
    ],
    "hidden": false,
    "sortOrder": 60,
    "id": "61"
  },
  {
    "id": "62",
    "name": "Eau (0.5 litre)",
    "description": "Bottled water 0.5L",
    "price": "10.00 DH",
    "image": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=600&fit=crop",
    "category": "Drinks",
    "sortOrder": 61
  },
  {
    "id": "63",
    "name": "Eau (1 litre/verre)",
    "description": "Bottled water 1L or glass",
    "price": "15.00 DH",
    "image": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=600&fit=crop",
    "category": "Drinks",
    "sortOrder": 62
  },
  {
    "id": "64",
    "name": "Boissons Gazeuses 0.5L",
    "description": "Soft drinks 0.5L",
    "price": "10.00 DH",
    "image": "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=800&h=600&fit=crop",
    "category": "Drinks",
    "sortOrder": 63
  }
];
