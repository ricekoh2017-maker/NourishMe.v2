import { Recipe } from '../types/seniorDiet';

export const SENIOR_RECIPES: Recipe[] = [
  {
    id: 'steamed-threadfin-goji',
    title: 'Steamed Threadfin with Julienned Ginger & Wolfberries',
    chineseTitle: '姜丝枸杞蒸午鱼 (Ngoh He)',
    subtitle: 'High Omega-3, zero oil splatter, melt-in-mouth tenderness for bone & muscle recovery.',
    heroImage: '/src/assets/images/dish_steamed_threadfin_1792134622018.jpg',
    prepTimeMinutes: 8,
    cookTimeMinutes: 10,
    complexity: '1-dish',
    chewability: 'level_1_silken',
    chewabilityLabel: 'Level 1: Silken Melt (Gentle on Dentures)',
    appliance: 'Electric Steamer / Wok',
    healthHighlights: [
      '32g High-Bioavailability Protein',
      'Rich in Omega-3 DHA (Heart & Brain)',
      'Low Sodium (Natural Goji Sweetness)',
      'Rich in Iron & Eye Health Lutein'
    ],
    seniorBenefitsDescription: 'Threadfin (Ngoh He) is prized by Singapore doctors and pediatricians alike for its tender, flakey, bone-safe flesh and digestible amino acids to counter sarcopenia. The wolfberries (Goji) and red dates deliver natural sweetness so zero sugar or MSG is required.',
    nutrition: {
      calories: 340,
      proteinGrams: 32,
      calciumMg: 140,
      sodiumMg: 380,
      fiberGrams: 2.5,
      giRating: 'Very Low',
      hpbApproved: true
    },
    ingredients: [
      {
        id: 'threadfin-fillet',
        name: 'Fresh Threadfin Fillet (Ngoh He)',
        chineseName: '新鲜午鱼肉片',
        amount: '200g (deboned & descaled)',
        category: 'seafood_poultry',
        estimatedPriceSGD: 9.50,
        sgSourceNotes: 'Available at Sheng Siong fish counter or local wet markets (ask fishmonger for "Ngoh He fillet for elderly").'
      },
      {
        id: 'old-ginger',
        name: 'Old Ginger',
        chineseName: '老姜',
        amount: '15g (cut into fine matchsticks)',
        category: 'produce',
        estimatedPriceSGD: 0.60,
        pantryEssential: true,
        sgSourceNotes: 'FairPrice / Sheng Siong fresh vegetable aisle.'
      },
      {
        id: 'wolfberries',
        name: 'Dried Wolfberries (Goji)',
        chineseName: '宁夏枸杞子',
        amount: '1 tablespoon (rinsed)',
        category: 'pantry_herbs',
        estimatedPriceSGD: 0.80,
        pantryEssential: true,
        sgSourceNotes: 'Eu Yan Sang or Sheng Siong Chinese herbs section.'
      },
      {
        id: 'silken-tofu',
        name: 'Fortified Silken Tofu',
        chineseName: '高钙水豆腐',
        amount: '1/2 block (sliced into flat pads under fish)',
        category: 'tofu_eggs',
        estimatedPriceSGD: 0.90,
        pantryEssential: true,
        sgSourceNotes: 'Unicurd / Fortune brand with Healthier Choice Symbol.'
      },
      {
        id: 'sesame-light-soy',
        name: 'Pure Pure Sesame Oil & Lower-Sodium Light Soy',
        chineseName: '纯正芝麻油与低钠生抽',
        amount: '1 tsp each',
        category: 'pantry_herbs',
        estimatedPriceSGD: 0.50,
        pantryEssential: true,
        sgSourceNotes: 'FairPrice Lower Sodium Light Soy (HPB approved).'
      },
      {
        id: 'spring-onion',
        name: 'Spring Onions & Coriander',
        chineseName: '葱花芫荽',
        amount: '1 sprig (snipped with kitchen scissors)',
        category: 'produce',
        estimatedPriceSGD: 0.40,
        pantryEssential: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Lay Tofu Base (Calcium Bed)',
        instruction: 'Slice the silken tofu into 1cm thick rectangles and arrange across a heatproof ceramic steaming plate. This absorbs the sweet fish essence and provides high calcium.',
        elderlyEaseTip: 'No knife needed: silken tofu can be sliced safely using a butter knife or plastic scraper.'
      },
      {
        stepNumber: 2,
        title: 'Season Fish Gently',
        instruction: 'Pat threadfin fillet dry with kitchen paper. Rest it directly over the tofu bed. Scatter the ginger matchsticks, rinsed red wolfberries, and 1 tsp lower-sodium light soy sauce over the top.',
        elderlyEaseTip: 'For arthritis relief: buy pre-sliced ginger matchsticks at FairPrice, or use a handheld mandoline peeler with safety guard.'
      },
      {
        stepNumber: 3,
        title: 'Steam with Rapid Heat',
        instruction: 'Place plate into electric food steamer or covered wok over boiling water. Steam over high steam for 8 to 9 minutes until flesh turns milky white and flakes effortlessly.',
        timerSeconds: 510,
        elderlyEaseTip: 'An electric timer prevents elderly forgetting pots on fire. An electric tiered steamer shuts off automatically!'
      },
      {
        stepNumber: 4,
        title: 'Aromatic Drizzle & Serve',
        instruction: 'Carefully remove plate using silicone oven mitts. Drizzle 1 tsp pure toasted sesame oil and snip spring onions directly on top. Serve warm with soft brown rice.',
        elderlyEaseTip: 'Use a wide-plate gripper tong to lift hot plates safely without wrist strain.'
      }
    ],
    substitutions: [
      {
        original: 'Threadfin (Ngoh He)',
        substitute: 'Batang (Spanish Mackerel) or Red Grouper slice',
        reason: 'Equally lean and protein-dense, readily available at lower cost in Sheng Siong.'
      },
      {
        original: 'Lower-Sodium Light Soy',
        substitute: 'Homemade Ikan Bilis Broth reduction',
        reason: 'Zero added processed sodium, ideal for severe hypertension.'
      }
    ],
    pioneerTip: 'Pioneer & Merdeka Generation members enjoy up to 4% discount on fresh threadfin at Sheng Siong on Tuesdays and Wednesdays!',
    pairingSuggestion: 'Serve alongside Warm Clear Spinach & Egg Drop Soup and Steamed Jasmine + Red Rice blend.'
  },
  {
    id: 'nourishing-cantonese-abc-soup',
    title: 'Cantonese Clear ABC Soup with Lean Pork Ribs',
    chineseTitle: '广式清润ABC排骨养生汤',
    subtitle: 'Natural vitamin A, B & C collagen broth with fork-tender sweet carrots & sweetcorn.',
    heroImage: '/src/assets/images/dish_cantonese_abc_soup_1792134622667.jpg',
    prepTimeMinutes: 10,
    cookTimeMinutes: 35,
    complexity: '2-dish',
    chewability: 'level_1_silken',
    chewabilityLabel: 'Level 1: Silken Soft (Spoon-Tender Root Vegetables)',
    appliance: 'Soup Pot',
    healthHighlights: [
      'Natural Electrolytes & Hydration',
      'Zero Salt Needed (Sweet Corn & Tomato Umami)',
      'Gentle Digestion & Calming for Stomach',
      'High Vitamin A (Macular Degeneration Defense)'
    ],
    seniorBenefitsDescription: 'Dehydration is a leading cause of confusion and urinary tract issues in seniors over 65. ABC Soup naturally hydrates the body with potassium-rich potatoes, sweet corn, and ripe tomatoes without relying on salt cubes.',
    nutrition: {
      calories: 290,
      proteinGrams: 26,
      calciumMg: 110,
      sodiumMg: 280,
      fiberGrams: 5.2,
      giRating: 'Low',
      hpbApproved: true
    },
    ingredients: [
      {
        id: 'lean-pork-ribs',
        name: 'Lean Pork Soup Ribs / Prime Ribs',
        chineseName: '新鲜排骨 / 瘦肉块',
        amount: '250g (trimmed of visible fat)',
        category: 'seafood_poultry',
        estimatedPriceSGD: 4.80,
        sgSourceNotes: 'Ask FairPrice butcher to chop into small bite-sized pieces for soup.'
      },
      {
        id: 'sweet-corn',
        name: 'Cameron Highlands Sweet Corn',
        chineseName: '金马伦甜玉米',
        amount: '1 cob (cut into small round wheels)',
        category: 'produce',
        estimatedPriceSGD: 1.20,
        sgSourceNotes: 'Available at wet market or Sheng Siong vegetable racks.'
      },
      {
        id: 'carrots',
        name: 'Australian Carrots',
        chineseName: '胡萝卜',
        amount: '1 medium (cut into roll-cut soft wedges)',
        category: 'produce',
        estimatedPriceSGD: 0.70,
        pantryEssential: true
      },
      {
        id: 'russet-potato',
        name: 'Yellow Flesh Potato',
        chineseName: '黄心马铃薯',
        amount: '1 medium (peeled, large cubes)',
        category: 'produce',
        estimatedPriceSGD: 0.60,
        pantryEssential: true
      },
      {
        id: 'ripe-tomatoes',
        name: 'Red Vine Ripe Tomatoes',
        chineseName: '熟番茄',
        amount: '2 medium (quartered)',
        category: 'produce',
        estimatedPriceSGD: 0.90,
        pantryEssential: true
      },
      {
        id: 'red-dates',
        name: 'Seedless Red Dates (Hong Zao)',
        chineseName: '无核红枣',
        amount: '4 pieces',
        category: 'pantry_herbs',
        estimatedPriceSGD: 0.50,
        pantryEssential: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Quick Blanch for Crystal Clear Broth',
        instruction: 'Place pork ribs in a small pot of boiling water for 3 minutes to remove scum. Drain and rinse with cool tap water.',
        elderlyEaseTip: 'Use a slotted wire ladle so you do not need to lift a heavy pot of boiling water.'
      },
      {
        stepNumber: 2,
        title: 'Combine in Slow Cooker or Soup Pot',
        instruction: 'In a soup pot or thermal cooker, add 1.2 liters of water, blanched ribs, sweet corn, carrots, potatoes, tomatoes, and seedless red dates.',
        elderlyEaseTip: 'A thermal cooker (vacuum pot) is ideal for seniors: boil 10 mins on stove, then insert into thermal container to cook for 2 hours with zero gas or electricity.'
      },
      {
        stepNumber: 3,
        title: 'Simmer Until Vegetables Are Spoon-Soft',
        instruction: 'Bring to a boil, then reduce heat to gentle low simmer for 35 to 40 minutes until carrots and potatoes yield easily to a spoon.',
        timerSeconds: 2100,
        elderlyEaseTip: 'Carrots and potatoes cooked until completely fork-tender minimize any choking risk.'
      },
      {
        stepNumber: 4,
        title: 'Season Only with a Pinch of White Pepper',
        instruction: 'Taste the broth. The sweet corn and tomatoes provide rich natural sweetness. Add just a dash of white pepper. No salt needed!',
        elderlyEaseTip: 'Natural acids in tomato stimulate saliva production in elderly experiencing dry mouth.'
      }
    ],
    substitutions: [
      {
        original: 'Lean Pork Ribs',
        substitute: 'Skinless Chicken Thigh or Sweet Soya Beans',
        reason: 'For halal Malay diet or gout prevention (soy beans provide gentle plant protein).'
      }
    ],
    pioneerTip: 'Pre-cut soup packs (corn + carrot + potato bundled) are sold at Sheng Siong for S$2.50, saving washing and peeling time.',
    pairingSuggestion: 'Pair with steamed brown rice and a side of steamed egg custard.'
  },
  {
    id: 'onepot-pumpkin-chicken-rice',
    title: 'One-Pot Rice Cooker Pumpkin & Shiitake Chicken Rice',
    chineseTitle: '一锅电饭煲金瓜香菇鸡肉饭',
    subtitle: 'Zero open flame, balanced low-GI whole grains with sweet steamed golden pumpkin.',
    heroImage: '/src/assets/images/dish_pumpkin_chicken_rice_1792134623306.jpg',
    prepTimeMinutes: 10,
    cookTimeMinutes: 22,
    complexity: '1-dish',
    chewability: 'level_2_tender',
    chewabilityLabel: 'Level 2: Tender Soft (Fork Mashable)',
    appliance: 'One-Pot Rice Cooker',
    healthHighlights: [
      'Single Pot, Zero Flame Safety',
      'Beta-Carotene Immune Defense',
      'Complex Low-GI Fiber (Brown + Red Rice)',
      'Lean Chicken Protein (28g / serving)'
    ],
    seniorBenefitsDescription: 'Cooking in an automatic rice cooker eliminates the danger of leaving a stove unattended. The pumpkin melts into the grains, coating the rice with natural sweetness and fiber to prevent constipation common in active agers.',
    nutrition: {
      calories: 420,
      proteinGrams: 29,
      calciumMg: 95,
      sodiumMg: 360,
      fiberGrams: 6.8,
      giRating: 'Low',
      hpbApproved: true
    },
    ingredients: [
      {
        id: 'chicken-thigh-skinless',
        name: 'Fresh Skinless Boneless Chicken Thigh',
        chineseName: '新鲜去皮去骨鸡腿肉',
        amount: '200g (cut into bite-sized tender cubes)',
        category: 'seafood_poultry',
        estimatedPriceSGD: 3.50,
        sgSourceNotes: 'FairPrice fresh chilled poultry section.'
      },
      {
        id: 'local-pumpkin',
        name: 'Fresh Japanese Kabocha / Local Pumpkin',
        chineseName: '新鲜金瓜 / 南瓜',
        amount: '200g (peeled & cubed 2cm)',
        category: 'produce',
        estimatedPriceSGD: 1.10,
        pantryEssential: true,
        sgSourceNotes: 'Pre-cut pumpkin slices available at Sheng Siong.'
      },
      {
        id: 'shiitake-mushrooms',
        name: 'Dried Shiitake Mushrooms',
        chineseName: '优质冬菇',
        amount: '4 caps (soaked in warm water & sliced)',
        category: 'pantry_herbs',
        estimatedPriceSGD: 1.20,
        pantryEssential: true
      },
      {
        id: 'mixed-grain-rice',
        name: 'HPB Approved Brown & White Rice Blend',
        chineseName: '保健促进局认证糙米白米混合米',
        amount: '1.5 measuring cups (rinsed)',
        category: 'grains',
        estimatedPriceSGD: 1.50,
        pantryEssential: true,
        sgSourceNotes: 'FairPrice Housebrand Red & Brown Rice blend.'
      },
      {
        id: 'aromatics',
        name: 'Shallot & Ginger Paste',
        chineseName: '小葱头与姜泥',
        amount: '1 tbsp',
        category: 'produce',
        estimatedPriceSGD: 0.40,
        pantryEssential: true
      },
      {
        id: 'light-marinade',
        name: 'Lower-Sodium Soy Sauce & White Pepper',
        chineseName: '低钠生抽及胡椒粉',
        amount: '1 tsp each',
        category: 'pantry_herbs',
        estimatedPriceSGD: 0.30,
        pantryEssential: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinate Chicken Briefly',
        instruction: 'Toss chicken pieces with 1 tsp lower-sodium soy sauce, a drop of sesame oil, and white pepper. Let rest 5 minutes.',
        elderlyEaseTip: 'Chicken thigh remains much juicier and easier to chew than chicken breast for seniors.'
      },
      {
        stepNumber: 2,
        title: 'Layer Grains and Broth in Rice Cooker',
        instruction: 'Add rinsed rice blend into the rice cooker inner bowl. Pour mushroom soaking liquid (strained) and water up to the 1.5 cup line.',
        elderlyEaseTip: 'Reusing mushroom water adds deep umami fragrance without needing artificial chicken bouillon cubes.'
      },
      {
        stepNumber: 3,
        title: 'Top with Pumpkin, Mushrooms & Chicken',
        instruction: 'Scatter diced golden pumpkin, sliced shiitake, and marinated chicken evenly across the rice. Do not stir—let them sit on top.',
        elderlyEaseTip: 'No stove stir-frying needed: the cooker steams everything to perfection in one push.'
      },
      {
        stepNumber: 4,
        title: 'Press "Cook" & Fluff When Done',
        instruction: 'Close lid and press standard Cook button. When it clicks to "Warm", let rest 5 minutes, then gently fluff with rice paddle.',
        timerSeconds: 1320,
        elderlyEaseTip: 'The pumpkin will become soft and creamy, naturally blending into the rice.'
      }
    ],
    substitutions: [
      {
        original: 'Chicken Thigh',
        substitute: 'Firm Tofu cubes & Dried Scallops',
        reason: 'Vegetarian or pescatarian adaptation with great calcium and umami.'
      }
    ],
    pioneerTip: 'Store any remaining portions in glass containers; it reheats in the microwave or steamer in 2 minutes for tomorrow’s lunch.',
    pairingSuggestion: 'Serve with warm Chrysanthemum Goji tea.'
  },
  {
    id: 'silken-tofu-minced-meat-steamed',
    title: 'Silken Tofu with Minced Pork & Black Fungus',
    chineseTitle: '肉碎木耳蒸滑豆腐',
    subtitle: 'Dual protein power (Soy + Lean Meat), rich in iron and bone-strengthening calcium.',
    heroImage: '/src/assets/images/hero_senior_nourish_sg_1792134622281.jpg',
    prepTimeMinutes: 7,
    cookTimeMinutes: 8,
    complexity: '1-dish',
    chewability: 'level_1_silken',
    chewabilityLabel: 'Level 1: Ultra Silken (Zero Chewing Effort)',
    appliance: 'Electric Steamer / Wok',
    healthHighlights: [
      '380mg High Calcium (Osteoporosis Defense)',
      '27g Protein Combination (Plant + Animal)',
      'Black Fungus for Blood Circulation',
      'Ultra Soft for Sore Gums or Recent Dental Work'
    ],
    seniorBenefitsDescription: 'Combining plant isoflavones from calcium-fortified tofu with lean minced pork delivers the full amino acid spectrum required to maintain leg strength and mobility in seniors above 65.',
    nutrition: {
      calories: 275,
      proteinGrams: 27,
      calciumMg: 380,
      sodiumMg: 320,
      fiberGrams: 3.1,
      giRating: 'Very Low',
      hpbApproved: true
    },
    ingredients: [
      {
        id: 'silken-tofu-box',
        name: 'Unicurd High Calcium Silken Tofu',
        chineseName: '高钙水豆腐',
        amount: '1 box (300g)',
        category: 'tofu_eggs',
        estimatedPriceSGD: 1.15,
        pantryEssential: true,
        sgSourceNotes: 'Look for the red Healthier Choice symbol on packaging.'
      },
      {
        id: 'lean-minced-pork',
        name: 'Fresh Lean Minced Pork (or Minced Chicken)',
        chineseName: '新鲜瘦肉碎 / 鸡肉碎',
        amount: '120g',
        category: 'seafood_poultry',
        estimatedPriceSGD: 2.10,
        sgSourceNotes: 'FairPrice or Sheng Siong chilled meat counter.'
      },
      {
        id: 'black-fungus',
        name: 'Soaked Cloud Ear Black Fungus',
        chineseName: '软滑黑木耳 (切细丝)',
        amount: '2 tbsp finely minced',
        category: 'pantry_herbs',
        estimatedPriceSGD: 0.60,
        pantryEssential: true
      },
      {
        id: 'water-chestnut',
        name: 'Fresh Water Chestnut (minced)',
        chineseName: '新鲜马蹄',
        amount: '2 pieces (finely diced for gentle crunch)',
        category: 'produce',
        estimatedPriceSGD: 0.50
      },
      {
        id: 'seasoning-tofu',
        name: 'Light Soy Sauce & Toasted Sesame Oil',
        chineseName: '低钠酱油和芝麻油',
        amount: '1 tsp each',
        category: 'pantry_herbs',
        estimatedPriceSGD: 0.40,
        pantryEssential: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mix Minced Topping',
        instruction: 'In a bowl, mix minced pork, finely chopped black fungus, water chestnuts, a dash of cornstarch, and 1 tbsp water to keep it tender.',
        elderlyEaseTip: 'Adding 1 tbsp of water to minced meat prevents it from clumping into hard balls when steamed.'
      },
      {
        stepNumber: 2,
        title: 'Unmold Tofu onto Heatproof Plate',
        instruction: 'Invert the box of silken tofu onto a plate. Drain excess water. Spread the seasoned meat mixture evenly over the tofu surface.',
        elderlyEaseTip: 'Snip the four bottom corners of the tofu plastic tub with scissors to release vacuum instantly without breaking the tofu.'
      },
      {
        stepNumber: 3,
        title: 'Steam on High',
        instruction: 'Steam over boiling water for 8 minutes until the minced pork is completely cooked through and steaming hot.',
        timerSeconds: 480,
        elderlyEaseTip: 'Set timer on your mobile or kitchen clock to avoid over-steaming.'
      },
      {
        stepNumber: 4,
        title: 'Garnish with Spring Onion and Soy',
        instruction: 'Sprinkle chopped scallions and drizzle 1 tsp sesame oil. Ready to enjoy immediately with soft congee or rice.',
        elderlyEaseTip: 'Extremely easy to swallow with soft congee (rice porridge).'
      }
    ],
    substitutions: [
      {
        original: 'Minced Pork',
        substitute: 'Minced Chicken Breast or Flaked Batang Fish',
        reason: 'Halal-friendly or lower purine option.'
      }
    ],
    pioneerTip: 'FairPrice offers 3% discount for Merdeka and Pioneer cards on Wednesdays.',
    pairingSuggestion: 'Perfect paired with warm sweet potato porridge.'
  },
  {
    id: 'spinach-trio-egg-superior-broth',
    title: 'Baby Spinach in Trio Egg Superior Ikan Bilis Broth',
    chineseTitle: '三蛋金银上汤浸菠菜 (苋菜)',
    subtitle: 'Packed with dietary iron, lutein for cataract defense, and calcium-dense broth.',
    heroImage: '/src/assets/images/hero_senior_nourish_sg_1792134622281.jpg',
    prepTimeMinutes: 6,
    cookTimeMinutes: 7,
    complexity: '1-dish',
    chewability: 'level_1_silken',
    chewabilityLabel: 'Level 1: Silken Soft Greens',
    appliance: 'Soup Pot',
    healthHighlights: [
      'Rich in Lutein & Zeaxanthin (Eye Vision)',
      'High Bioavailable Iron & Folate',
      'Naturally Mineral-Rich Ikan Bilis Broth',
      'Smooth, Velvety Texture Easy to Swallow'
    ],
    seniorBenefitsDescription: 'Elderly individuals frequently suffer from dry eyes and macular decline. Round leaf spinach (Po Cai) cooked in rich ikan bilis broth is naturally loaded with lutein and dietary fiber to aid bowel regularity.',
    nutrition: {
      calories: 210,
      proteinGrams: 21,
      calciumMg: 310,
      sodiumMg: 390,
      fiberGrams: 4.5,
      giRating: 'Very Low',
      hpbApproved: true
    },
    ingredients: [
      {
        id: 'baby-spinach',
        name: 'Local Round Spinach (Po Cai / Bayam)',
        chineseName: '本地圆叶菠菜 / 苋菜',
        amount: '250g (roots removed, washed)',
        category: 'produce',
        estimatedPriceSGD: 1.80,
        sgSourceNotes: 'Fresh tender bundles at Sheng Siong or local wet market.'
      },
      {
        id: 'fresh-egg',
        name: 'Pasteurized Fresh Egg',
        chineseName: '新鲜鸡蛋',
        amount: '1 egg (beaten)',
        category: 'tofu_eggs',
        estimatedPriceSGD: 0.35,
        pantryEssential: true
      },
      {
        id: 'century-egg',
        name: 'Lead-Free Century Egg',
        chineseName: '无铅皮蛋',
        amount: '1 piece (diced small)',
        category: 'tofu_eggs',
        estimatedPriceSGD: 1.00,
        pantryEssential: true
      },
      {
        id: 'salted-egg',
        name: 'Cooked Salted Egg',
        chineseName: '熟咸蛋',
        amount: '1/2 yolk & white (diced for savory touch)',
        category: 'tofu_eggs',
        estimatedPriceSGD: 0.80,
        pantryEssential: true
      },
      {
        id: 'ikan-bilis-broth',
        name: 'Homemade Ikan Bilis Broth or Low-Sodium Chicken Stock',
        chineseName: '江鱼仔上汤',
        amount: '400ml',
        category: 'pantry_herbs',
        estimatedPriceSGD: 1.00,
        pantryEssential: true
      },
      {
        id: 'wolfberries-spinach',
        name: 'Wolfberries (Goji)',
        chineseName: '红枸杞',
        amount: '1 tablespoon',
        category: 'pantry_herbs',
        estimatedPriceSGD: 0.40,
        pantryEssential: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Quick Wilt the Spinach',
        instruction: 'Bring 400ml of ikan bilis broth to a brisk boil in a small pot. Add the washed tender spinach leaves and wolfberries.',
        elderlyEaseTip: 'Round spinach leaves wilt down in just 90 seconds, becoming ultra tender.'
      },
      {
        stepNumber: 2,
        title: 'Add Century & Salted Egg Cubes',
        instruction: 'Toss in the diced century egg and salted egg pieces. Simmer gently for 2 minutes to let the flavors infuse.',
        elderlyEaseTip: 'We use only 1/2 salted egg to keep sodium within HPB safe limits for hypertension.'
      },
      {
        stepNumber: 3,
        title: 'Create Silken Egg Ribbons',
        instruction: 'Turn off the heat. Pour the beaten fresh egg in a thin stream across the surface. Let rest 20 seconds, then gently stir to create silky ribbons.',
        timerSeconds: 120,
        elderlyEaseTip: 'Residual heat cooks the egg without any boiling agitation, keeping it custard-soft.'
      },
      {
        stepNumber: 4,
        title: 'Serve in Warm Bowls',
        instruction: 'Ladle into deep ceramic bowls. Enjoy the warm comforting broth.',
        elderlyEaseTip: 'Drinkable nutrition that hydrates and nourishes at the same time.'
      }
    ],
    substitutions: [
      {
        original: 'Salted Egg',
        substitute: 'Soft Silken Egg Tofu cubes',
        reason: 'Strict zero-sodium modification for acute renal or severe blood pressure management.'
      }
    ],
    pioneerTip: 'Sheng Siong provides 4% senior discount on Tuesdays & Wednesdays.',
    pairingSuggestion: 'Serve alongside Steamed Threadfin or Batang fish.'
  },
  {
    id: 'teochew-steamed-batang-plum',
    title: 'Teochew Steamed Batang Fish with Salted Plum & Tomato',
    chineseTitle: '潮州酸梅番茄蒸马鲛鱼 (巴当鱼)',
    subtitle: 'Appetite-stimulating natural tangy broth, lean protein, and digestive ease.',
    heroImage: '/src/assets/images/dish_steamed_threadfin_1792134622018.jpg',
    prepTimeMinutes: 6,
    cookTimeMinutes: 9,
    complexity: '1-dish',
    chewability: 'level_2_tender',
    chewabilityLabel: 'Level 2: Tender Flake (Easy Fork Mash)',
    appliance: 'Electric Steamer / Wok',
    healthHighlights: [
      'Stimulates Appetite for Seniors with Low Hunger',
      'Rich in Lean Sarcopenia-Fighting Protein (34g)',
      'Rich in B-Complex Vitamins for Cognitive Alertness',
      'Teochew Tradition: Clean, Light & Non-Greasy'
    ],
    seniorBenefitsDescription: 'Senior citizens often experience diminished taste bud sensitivity, leading to skipped meals and unintentional weight loss. The gentle tartness of sour plum and tomato naturally awakens appetite without dangerous salt overload.',
    nutrition: {
      calories: 310,
      proteinGrams: 34,
      calciumMg: 120,
      sodiumMg: 410,
      fiberGrams: 2.1,
      giRating: 'Very Low',
      hpbApproved: true
    },
    ingredients: [
      {
        id: 'batang-steak',
        name: 'Fresh Batang (Spanish Mackerel) Steak',
        chineseName: '新鲜巴当鱼肉片 (厚切)',
        amount: '220g (center cut, thick steak)',
        category: 'seafood_poultry',
        estimatedPriceSGD: 5.50,
        sgSourceNotes: 'Sheng Siong fresh fish section or wet market fish stall.'
      },
      {
        id: 'sour-plum',
        name: 'Preserved Salted Sour Plum',
        chineseName: '潮州酸梅',
        amount: '1 piece (lightly mashed with fork)',
        category: 'pantry_herbs',
        estimatedPriceSGD: 0.30,
        pantryEssential: true
      },
      {
        id: 'ripe-tomato-teochew',
        name: 'Fresh Tomato',
        chineseName: '鲜番茄',
        amount: '1 piece (sliced into wedges)',
        category: 'produce',
        estimatedPriceSGD: 0.50,
        pantryEssential: true
      },
      {
        id: 'salted-vegetable-light',
        name: 'Kiam Chye (Salted Veg, soaked in water 20 mins)',
        chineseName: '咸菜丝 (淡化浸泡)',
        amount: '20g (shredded thin)',
        category: 'produce',
        estimatedPriceSGD: 0.40
      },
      {
        id: 'ginger-shreds',
        name: 'Ginger Shreds & Spring Onions',
        chineseName: '姜丝、葱段',
        amount: '15g',
        category: 'produce',
        estimatedPriceSGD: 0.40,
        pantryEssential: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Soak Salted Veg to Lower Sodium',
        instruction: 'Soak shredded salted vegetable in cold water for 15 minutes and squeeze dry. This removes 80% of excess salt while keeping pleasant flavor.',
        elderlyEaseTip: 'Soaking preserves crunch while protecting kidneys and blood pressure.'
      },
      {
        stepNumber: 2,
        title: 'Assemble on Plate',
        instruction: 'Place Batang steak on a steaming dish. Scatter tomato wedges, ginger shreds, soaked kiam chye, and the lightly mashed sour plum over the fish.',
        elderlyEaseTip: 'Batang is a thick, firm fish with very few fine bones, making it safer for elderly to eat.'
      },
      {
        stepNumber: 3,
        title: 'Steam on Rapid Boil',
        instruction: 'Steam for 9 minutes. The juices from tomato and sour plum create a fragrant, clear, light gravy.',
        timerSeconds: 540,
        elderlyEaseTip: 'Use a fork to test center: when it flakes easily, it is ready.'
      },
      {
        stepNumber: 4,
        title: 'Spoon Tangy Broth Over Rice',
        instruction: 'Spoon the warm tangy broth over soft brown rice or congee. Delicious and stimulating for poor appetites.',
        elderlyEaseTip: 'Warm steam and aromatics clear nasal passages.'
      }
    ],
    substitutions: [
      {
        original: 'Batang (Mackerel)',
        substitute: 'Snapper fillet or Sea Bass fillet',
        reason: 'Even softer texture if chewing is compromised.'
      }
    ],
    pioneerTip: 'Batang is on weekly promotional special at FairPrice and Sheng Siong across heartland estates.',
    pairingSuggestion: 'Serve with warm Teochew sweet potato congee.'
  }
];
