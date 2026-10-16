export type HouseholdType = 'solo' | 'couple' | 'multigen' | 'caregiver';

export type AgeBracket = '65-74' | '75-84' | '85+';

export type PortionType = 'light' | 'standard' | 'dense_boost';

export type CookingComplexity = '1-dish' | '2-dish' | '3-dish';

export type ChewabilityLevel = 'level_1_silken' | 'level_2_tender' | 'level_3_normal';

export interface KitchenConstraints {
  under20Mins: boolean;
  electricOnly: boolean; // Rice cooker or steamer only (elderly fire safety)
  softChew: boolean;
  lowArthritisChop: boolean;
  nextDayFriendly: boolean;
  lowCleanUp: boolean;
}

export type SeniorHealthFocus = 
  | 'high_protein'      // Sarcopenia prevention (30g+ protein)
  | 'bone_calcium'      // Osteoporosis (1000mg+ Ca)
  | 'low_sodium'        // Hypertension & heart health
  | 'diabetic_low_gi'   // Blood sugar stability
  | 'gentle_gut'        // Digestion & acid reflux
  | 'gout_low_purine'   // Uric acid control
  | 'kidney_care';      // Moderate potassium & phosphorus

export type GrocerStore = 'fairprice' | 'shengsiong' | 'redmart' | 'coldstorage' | 'wetmarket';

export interface KitchenProfile {
  seniorName: string;
  household: HouseholdType;
  ageBracket: AgeBracket;
  portionType: PortionType;
  seniorCount: number;
  familyCount: number;
  cookingDays: string[]; // ['MON', 'TUE', 'WED', 'THU']
  complexity: CookingComplexity;
  constraints: KitchenConstraints;
  healthFocus: SeniorHealthFocus[];
  eatingStyle: 'singapore_chinese' | 'halal_malay' | 'indian_ayurvedic' | 'plant_forward';
  exclusions: string[]; // e.g. ['Shellfish', 'Pork', 'Dairy']
  dislikedIngredients: string[];
  preferredGrocer: GrocerStore;
  targetBudgetWeekly: number; // in SGD
  hasPioneerOrMerdekaCard: 'none' | 'merdeka' | 'pioneer' | 'silver_chas';
}

export interface IngredientItem {
  id: string;
  name: string;
  chineseName?: string;
  amount: string;
  category: 'seafood_poultry' | 'produce' | 'tofu_eggs' | 'pantry_herbs' | 'grains';
  estimatedPriceSGD: number;
  pantryEssential?: boolean; // Can be reused in other meals
  sgSourceNotes?: string; // e.g. "Available fresh at Sheng Siong fish counter"
}

export interface SeniorNutritionFact {
  calories: number;
  proteinGrams: number;
  calciumMg: number;
  sodiumMg: number;
  fiberGrams: number;
  giRating: 'Very Low' | 'Low' | 'Medium';
  hpbApproved: boolean; // Singapore Healthier Choice Symbol
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  elderlyEaseTip?: string; // e.g. "Use scissors instead of a knife to cut spring onions"
  timerSeconds?: number;
}

export interface Recipe {
  id: string;
  title: string;
  chineseTitle: string;
  subtitle: string;
  heroImage: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  complexity: CookingComplexity;
  chewability: ChewabilityLevel;
  chewabilityLabel: string;
  appliance: 'Electric Steamer / Wok' | 'One-Pot Rice Cooker' | 'Soup Pot' | 'Non-Stick Pan';
  healthHighlights: string[];
  seniorBenefitsDescription: string;
  nutrition: SeniorNutritionFact;
  ingredients: IngredientItem[];
  steps: CookingStep[];
  substitutions: { original: string; substitute: string; reason: string }[];
  pioneerTip?: string;
  pairingSuggestion?: string;
}
