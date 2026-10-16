/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  KitchenProfile, 
  Recipe, 
  GrocerStore 
} from './types/seniorDiet';
import { SENIOR_RECIPES } from './data/seniorRecipes';
import { SG_GROCERS } from './data/sgGrocers';
import { Header } from './components/Header';
import { KitchenCalibration } from './components/KitchenCalibration';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { GrocerCartDrawer } from './components/GrocerCartDrawer';
import { SeniorNutritionGuideModal } from './components/SeniorNutritionGuideModal';
import { AiSeniorNutritionistModal } from './components/AiSeniorNutritionistModal';
import { SgGrocerSourcingView } from './components/SgGrocerSourcingView';
import { LiveNutritionInspector } from './components/LiveNutritionInspector';
import { TalkToUsView } from './components/TalkToUsView';
import { 
  Sliders, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Award, 
  Clock, 
  Flame, 
  ShoppingBag, 
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

const DEFAULT_PROFILE: KitchenProfile = {
  seniorName: 'Ah Ma & Ah Gong',
  household: 'couple',
  ageBracket: '75-84',
  portionType: 'standard',
  seniorCount: 2,
  familyCount: 0,
  cookingDays: ['MON', 'TUE', 'WED', 'THU'],
  complexity: '2-dish',
  constraints: {
    under20Mins: true,
    electricOnly: true,
    softChew: true,
    lowArthritisChop: true,
    nextDayFriendly: true,
    lowCleanUp: true,
  },
  healthFocus: ['high_protein', 'bone_calcium', 'low_sodium'],
  eatingStyle: 'singapore_chinese',
  exclusions: ['Shellfish-Free'],
  dislikedIngredients: ['Raw Cilantro'],
  preferredGrocer: 'shengsiong',
  targetBudgetWeekly: 110,
  hasPioneerOrMerdekaCard: 'merdeka',
};

export default function App() {
  const [profile, setProfile] = useState<KitchenProfile>(DEFAULT_PROFILE);
  const [activeView, setActiveView] = useState<'recipes' | 'calibration' | 'grocer_sources' | 'live_data' | 'talk_to_us'>('recipes');
  const [seniorFontSize, setSeniorFontSize] = useState<boolean>(false);
  const [cartRecipes, setCartRecipes] = useState<Recipe[]>([SENIOR_RECIPES[0], SENIOR_RECIPES[1]]);
  
  // Modals
  const [selectedRecipeForDetail, setSelectedRecipeForDetail] = useState<Recipe | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isNutritionGuideOpen, setIsNutritionGuideOpen] = useState<boolean>(false);
  const [isAiConsultOpen, setIsAiConsultOpen] = useState<boolean>(false);

  // Filter in recipe list
  const [recipeFilter, setRecipeFilter] = useState<'all' | '1-dish' | 'calcium' | 'soups'>('all');

  const grocer = SG_GROCERS[profile.preferredGrocer] || SG_GROCERS.shengsiong;

  const handleAddToCart = (recipe: Recipe) => {
    if (!cartRecipes.some(r => r.id === recipe.id)) {
      setCartRecipes(prev => [...prev, recipe]);
    }
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (recipeId: string) => {
    setCartRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  const filteredRecipes = SENIOR_RECIPES.filter(recipe => {
    if (recipeFilter === '1-dish') return recipe.complexity === '1-dish';
    if (recipeFilter === 'calcium') return recipe.nutrition.calciumMg >= 250;
    if (recipeFilter === 'soups') return recipe.appliance === 'Soup Pot';
    return true;
  });

  return (
    <div className={`min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans ${seniorFontSize ? 'text-lg' : 'text-base'}`}>
      
      {/* Top Bar */}
      <Header
        onOpenCalibration={() => setActiveView('calibration')}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNutritionGuide={() => setIsNutritionGuideOpen(true)}
        onOpenAiConsult={() => setIsAiConsultOpen(true)}
        cartItemCount={cartRecipes.length}
        seniorFontSize={seniorFontSize}
        onToggleFontSize={() => setSeniorFontSize(!seniorFontSize)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: RECIPES & WEEKLY RECOMMENDATIONS */}
        {activeView === 'recipes' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            
            {/* Hero Banner Section */}
            <div className="relative rounded-3xl overflow-hidden bg-emerald-950 text-white shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
                
                {/* Hero Left Content */}
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between z-10">
                  <div>
                    {/* Quiet Editorial Tag (Zero-Pill compliant) */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 tracking-wider uppercase mb-3">
                      <span>Singapore Health Promotion Board Guidelines</span>
                      <span aria-hidden="true">·</span>
                      <span>Ages 65+</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-white leading-tight mb-4">
                      Nutrient-Dense, Easy-Prep Meals for Singapore Seniors.
                    </h1>

                    <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-xl">
                      Tailored specifically for active agers and Pioneer generation: high protein to prevent sarcopenia, high calcium for bone density, lower sodium, and tender soft-chew textures with zero flame hazards.
                    </p>
                  </div>

                  {/* Active Calibration Bar */}
                  <div className="pt-6 mt-6 border-t border-emerald-900/80">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-emerald-200">
                        <span className="text-emerald-400 block font-semibold mb-0.5">Current Calibrated Profile:</span>
                        <span>{profile.seniorCount} Seniors · {profile.complexity.replace('-', ' ')} · Sourced via {grocer.name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveView('calibration')}
                          className="px-4 py-2 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Sliders className="w-3.5 h-3.5 text-emerald-800" />
                          <span>Recalibrate Kitchen Profile</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Right Media */}
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                  <img
                    src="/src/assets/images/hero_senior_nourish_sg_1792134622281.jpg"
                    alt="Nutritious Singapore senior meal setup"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover lg:absolute lg:inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent lg:bg-gradient-to-r lg:from-emerald-950 lg:via-transparent lg:to-transparent" />
                </div>

              </div>
            </div>

            {/* Senior Health KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 font-semibold block">Sarcopenia Defense</span>
                <span className="text-2xl font-bold font-mono text-emerald-950">30g+</span>
                <span className="text-xs text-stone-600 block mt-0.5">High-bioavailable protein per meal</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 font-semibold block">Bone Density Target</span>
                <span className="text-2xl font-bold font-mono text-emerald-950">1,000mg</span>
                <span className="text-xs text-stone-600 block mt-0.5">Daily calcium via fortified foods</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 font-semibold block">Preparation Ease</span>
                <span className="text-2xl font-bold font-mono text-emerald-950">&le; 20m</span>
                <span className="text-xs text-stone-600 block mt-0.5">Electric steamer & rice cooker safe</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 font-semibold block">Pioneer Subsidy Sync</span>
                <span className="text-2xl font-bold font-mono text-emerald-950">3% - 4%</span>
                <span className="text-xs text-stone-600 block mt-0.5">FairPrice & Sheng Siong senior days</span>
              </div>
            </div>

            {/* Recipe Collection Header & Segmented Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
              <div>
                <h2 className="text-2xl font-bold font-serif text-stone-900">
                  Recommended Calibrated Senior Recipes
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Cross-referenced with your texture preferences, cooking rhythm, and local Singapore ingredients.
                </p>
              </div>

              {/* Segmented Filter Controls */}
              <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl">
                {[
                  { id: 'all', label: 'All Recommendations' },
                  { id: '1-dish', label: '1-Dish Wonder (Steamer/Rice Cooker)' },
                  { id: 'calcium', label: 'High Calcium (300mg+)' },
                  { id: 'soups', label: 'Nourishing Soups' },
                ].map(filter => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setRecipeFilter(filter.id as any)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      recipeFilter === filter.id
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipe Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  preferredGrocer={profile.preferredGrocer}
                  onSelect={r => setSelectedRecipeForDetail(r)}
                  onAddToCart={handleAddToCart}
                  seniorFontSize={seniorFontSize}
                />
              ))}
            </div>

            {/* Singapore Wet Market & Grocer Quick Callout */}
            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-950 text-base">
                    Sourcing for Pioneer & Merdeka Generation (65+)
                  </h3>
                  <p className="text-xs text-amber-900 mt-0.5 leading-normal max-w-2xl">
                    Get fresh Threadfin (Ngoh He) and Batang deboned and descaled at your neighborhood wet market (Tekka, Tiong Bahru, Bedok 85) or enjoy 4% off at Sheng Siong on Tuesdays and Wednesdays.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveView('grocer_sources')}
                className="px-4 py-2 rounded-xl bg-amber-900 text-white text-xs font-bold hover:bg-amber-950 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>View SG Grocer Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* VIEW 2: KITCHEN PROFILE CALIBRATION (Matching Screenshot) */}
        {activeView === 'calibration' && (
          <KitchenCalibration
            profile={profile}
            onSaveProfile={(updated) => {
              setProfile(updated);
              setActiveView('recipes');
            }}
            onViewRecipe={(id) => {
              const r = SENIOR_RECIPES.find(x => x.id === id);
              if (r) setSelectedRecipeForDetail(r);
            }}
            seniorFontSize={seniorFontSize}
          />
        )}

        {/* VIEW 3: SG GROCER SOURCING DIRECTORY */}
        {activeView === 'grocer_sources' && (
          <SgGrocerSourcingView
            preferredGrocer={profile.preferredGrocer}
            onSelectGrocer={(store) => setProfile(prev => ({ ...prev, preferredGrocer: store }))}
            seniorFontSize={seniorFontSize}
          />
        )}

        {/* VIEW 4: LIVE FDC DATAMALL SYNC */}
        {activeView === 'live_data' && (
          <LiveNutritionInspector
            seniorFontSize={seniorFontSize}
          />
        )}

        {/* VIEW 5: TALK TO US / DISQUS COMMUNITY FEEDBACK */}
        {activeView === 'talk_to_us' && (
          <TalkToUsView
            seniorFontSize={seniorFontSize}
          />
        )}

      </main>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipeForDetail}
        preferredGrocer={profile.preferredGrocer}
        onClose={() => setSelectedRecipeForDetail(null)}
        onAddToCart={handleAddToCart}
        seniorFontSize={seniorFontSize}
        onToggleFontSize={() => setSeniorFontSize(!seniorFontSize)}
      />

      {/* Consolidated Grocery Drawer */}
      <GrocerCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        recipesInCart={cartRecipes}
        onRemoveRecipe={handleRemoveFromCart}
        preferredGrocer={profile.preferredGrocer}
        onSelectGrocer={(store) => setProfile(prev => ({ ...prev, preferredGrocer: store }))}
        hasPioneerOrMerdekaCard={profile.hasPioneerOrMerdekaCard}
      />

      {/* HPB Nutrition Guide Modal */}
      <SeniorNutritionGuideModal
        isOpen={isNutritionGuideOpen}
        onClose={() => setIsNutritionGuideOpen(false)}
        seniorFontSize={seniorFontSize}
      />

      {/* AI Senior Nutritionist Modal */}
      <AiSeniorNutritionistModal
        isOpen={isAiConsultOpen}
        onClose={() => setIsAiConsultOpen(false)}
        seniorFontSize={seniorFontSize}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-10 mt-16 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 font-serif text-sm">SilverApron SG</span>
              <span>·</span>
              <span>Nourishing Everyday Living for Singapore Seniors (65+)</span>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsNutritionGuideOpen(true)}
                className="hover:text-stone-900 underline cursor-pointer"
              >
                Singapore HPB Dietary Reference
              </button>
              <button 
                onClick={() => setActiveView('grocer_sources')}
                className="hover:text-stone-900 underline cursor-pointer"
              >
                SG Supermarkets & Wet Markets
              </button>
              <button 
                onClick={() => setActiveView('calibration')}
                className="hover:text-stone-900 underline cursor-pointer"
              >
                Calibrate Kitchen
              </button>
              <button 
                onClick={() => setActiveView('talk_to_us')}
                className="hover:text-stone-900 underline cursor-pointer"
              >
                Talk to Us (Disqus)
              </button>
            </div>
          </div>
          <p className="text-center sm:text-left text-[11px] text-stone-400 mt-4">
            Designed for older adults, caregivers, and families in Singapore. Compliant with Singapore Health Promotion Board &quot;My Healthy Plate&quot; guidelines.
          </p>
        </div>
      </footer>

    </div>
  );
}
