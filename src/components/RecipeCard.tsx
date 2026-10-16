import React from 'react';
import { Recipe, GrocerStore } from '../types/seniorDiet';
import { SG_GROCERS } from '../data/sgGrocers';
import { Clock, Plus, Flame, Heart, Volume2, ShieldCheck, ChevronRight } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  preferredGrocer: GrocerStore;
  onSelect: (recipe: Recipe) => void;
  onAddToCart: (recipe: Recipe) => void;
  seniorFontSize: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  preferredGrocer,
  onSelect,
  onAddToCart,
  seniorFontSize,
}) => {
  const grocer = SG_GROCERS[preferredGrocer] || SG_GROCERS.fairprice;
  
  // Total recipe ingredient cost
  const totalCostSGD = recipe.ingredients.reduce((acc, curr) => acc + curr.estimatedPriceSGD, 0);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
      
      {/* Visual Slot with zero-broken-image fallback */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img
          src={recipe.heroImage}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          onError={(e) => {
            // Styled CSS fallback
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Soft contrast scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

        {/* Appliance & Chewability overlay tags */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded bg-stone-900/85 backdrop-blur-sm text-white text-[11px] font-medium border border-stone-700">
            {recipe.appliance}
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-950/90 backdrop-blur-sm text-emerald-200 text-[11px] font-semibold border border-emerald-700/60">
            {recipe.chewabilityLabel.split(':')[0]}
          </span>
        </div>

        {/* Bottom card title overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-xs text-stone-300 font-medium">
            {recipe.chineseTitle}
          </p>
          <h3 className="text-lg font-bold tracking-tight text-white line-clamp-1">
            {recipe.title}
          </h3>
        </div>
      </div>

      {/* Body content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean unboxed metadata with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
            <span className="font-semibold text-emerald-800">
              {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins total
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{recipe.prepTimeMinutes}m prep</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{recipe.complexity.replace('-', ' ')}</span>
          </div>

          <p className={`text-stone-600 line-clamp-2 mb-4 ${seniorFontSize ? 'text-base' : 'text-xs'}`}>
            {recipe.subtitle}
          </p>

          {/* Senior Nutritional Highlights Grid */}
          <div className="grid grid-cols-4 gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200/80 mb-4 text-center">
            <div>
              <span className="block text-[10px] text-stone-500 uppercase font-semibold">Protein</span>
              <span className="font-mono font-bold text-sm text-stone-900">
                {recipe.nutrition.proteinGrams}g
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-stone-500 uppercase font-semibold">Calcium</span>
              <span className="font-mono font-bold text-sm text-stone-900">
                {recipe.nutrition.calciumMg}mg
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-stone-500 uppercase font-semibold">Sodium</span>
              <span className="font-mono font-bold text-sm text-emerald-800">
                {recipe.nutrition.sodiumMg}mg
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-stone-500 uppercase font-semibold">GI Index</span>
              <span className="font-mono font-bold text-sm text-stone-900">
                {recipe.nutrition.giRating}
              </span>
            </div>
          </div>

          {/* Sourcing summary */}
          <div className="flex items-center justify-between text-xs text-stone-500 pt-1 pb-3 border-b border-stone-100">
            <span>Sourced via {grocer.name}:</span>
            <span className="font-mono font-bold text-stone-900 text-sm">
              ~S${totalCostSGD.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
          <button
            type="button"
            onClick={() => onSelect(recipe)}
            className="py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>View Steps</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(recipe)}
            className="py-2.5 px-3 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-950 transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-300" />
            <span>Add SG Cart</span>
          </button>
        </div>

      </div>

    </div>
  );
};
