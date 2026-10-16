import React, { useState } from 'react';
import { Recipe, GrocerStore } from '../types/seniorDiet';
import { SG_GROCERS } from '../data/sgGrocers';
import { 
  X, 
  Trash2, 
  Share2, 
  Check, 
  ExternalLink, 
  Copy, 
  Award, 
  Sparkles, 
  ShoppingBag,
  Store,
  Printer
} from 'lucide-react';

interface GrocerCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recipesInCart: Recipe[];
  onRemoveRecipe: (recipeId: string) => void;
  preferredGrocer: GrocerStore;
  onSelectGrocer: (store: GrocerStore) => void;
  hasPioneerOrMerdekaCard: 'none' | 'merdeka' | 'pioneer' | 'silver_chas';
}

export const GrocerCartDrawer: React.FC<GrocerCartDrawerProps> = ({
  isOpen,
  onClose,
  recipesInCart,
  onRemoveRecipe,
  preferredGrocer,
  onSelectGrocer,
  hasPioneerOrMerdekaCard,
}) => {
  if (!isOpen) return null;

  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const grocer = SG_GROCERS[preferredGrocer] || SG_GROCERS.fairprice;

  // Consolidate all ingredients from recipes in cart
  const consolidatedIngredientsMap = new Map<string, {
    name: string;
    chineseName?: string;
    amounts: string[];
    category: string;
    totalEstPrice: number;
    sgSourceNotes?: string;
  }>();

  recipesInCart.forEach(recipe => {
    recipe.ingredients.forEach(item => {
      if (consolidatedIngredientsMap.has(item.id)) {
        const existing = consolidatedIngredientsMap.get(item.id)!;
        existing.amounts.push(item.amount);
        existing.totalEstPrice += item.estimatedPriceSGD;
      } else {
        consolidatedIngredientsMap.set(item.id, {
          name: item.name,
          chineseName: item.chineseName,
          amounts: [item.amount],
          category: item.category,
          totalEstPrice: item.estimatedPriceSGD,
          sgSourceNotes: item.sgSourceNotes
        });
      }
    });
  });

  const consolidatedList = Array.from(consolidatedIngredientsMap.values());

  const rawSubtotal = consolidatedList.reduce((acc, curr) => acc + curr.totalEstPrice, 0);

  // Pioneer & Merdeka Discount Calculation
  let seniorDiscountPercent = 0;
  if (hasPioneerOrMerdekaCard === 'pioneer') {
    seniorDiscountPercent = preferredGrocer === 'shengsiong' ? 4 : preferredGrocer === 'fairprice' ? 3 : 2;
  } else if (hasPioneerOrMerdekaCard === 'merdeka') {
    seniorDiscountPercent = 3;
  }

  const seniorSavings = (rawSubtotal * seniorDiscountPercent) / 100;
  const finalTotal = Math.max(0, rawSubtotal - seniorSavings);

  const handleCopyWhatsApp = () => {
    let msg = `🛒 *Singapore Senior Grocery List (SilverApron SG)*\n`;
    msg += `Store: ${grocer.name}\n`;
    msg += `Planned Meals: ${recipesInCart.map(r => r.title).join(', ')}\n\n`;
    msg += `*Consolidated Ingredients:*\n`;

    consolidatedList.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (${item.chineseName || ''}) - ${item.amounts.join(' + ')}\n`;
    });

    msg += `\nEstimated Total: S$${finalTotal.toFixed(2)}`;
    if (seniorSavings > 0) {
      msg += ` (Incl. S$${seniorSavings.toFixed(2)} Pioneer/Merdeka Rebate)`;
    }

    navigator.clipboard.writeText(msg);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl border-l border-stone-200 flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <div>
                <h2 className="text-base font-bold text-stone-900">
                  Consolidated SG Grocer Basket
                </h2>
                <p className="text-xs text-stone-500">
                  {recipesInCart.length} Calibrated Recipe{recipesInCart.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Store Switcher Tab */}
          <div className="p-3 bg-stone-100 border-b border-stone-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                Select SG Grocer / Market:
              </span>
              <span className="text-[11px] text-emerald-800 font-medium">
                Free Delivery over S${grocer.freeDeliveryThreshold}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(['fairprice', 'shengsiong', 'redmart', 'coldstorage', 'wetmarket'] as GrocerStore[]).map(storeKey => {
                const store = SG_GROCERS[storeKey];
                const active = preferredGrocer === storeKey;
                return (
                  <button
                    key={storeKey}
                    type="button"
                    onClick={() => onSelectGrocer(storeKey)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all text-center cursor-pointer ${
                      active
                        ? 'bg-emerald-950 text-white border-emerald-950 shadow-xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="block truncate">{store.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
            
            <p className="text-[11px] text-stone-500 mt-2">
              💡 {grocer.seniorDiscountInfo}
            </p>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Recipes in basket */}
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                Planned Senior Meals:
              </span>

              {recipesInCart.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">
                  No recipes added yet. Click &quot;Add SG Cart&quot; on any senior recipe.
                </div>
              ) : (
                <div className="space-y-2">
                  {recipesInCart.map(recipe => (
                    <div
                      key={recipe.id}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={recipe.heroImage}
                          alt={recipe.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-900 truncate">
                            {recipe.title}
                          </p>
                          <p className="text-[11px] text-emerald-800">
                            {recipe.chewabilityLabel.split(':')[0]} · {recipe.nutrition.proteinGrams}g Protein
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveRecipe(recipe.id)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 cursor-pointer"
                        title="Remove from basket"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Consolidated Shopping List */}
            {consolidatedList.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Consolidated Ingredients ({consolidatedList.length} items):
                  </span>
                  <span className="text-[11px] text-emerald-800 font-medium">
                    Zero Duplicate Waste
                  </span>
                </div>

                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl bg-white overflow-hidden">
                  {consolidatedList.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-stone-900 truncate">
                          {item.name} {item.chineseName && <span className="text-stone-400 font-normal">({item.chineseName})</span>}
                        </p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {item.amounts.join(' + ')}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-stone-800 shrink-0">
                        S${item.totalEstPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pantry Engine Guarantee */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Happy Aprons Pantry Engine</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Items like garlic, ginger, light soy, and wolfberries have been consolidated into single efficient pantry units.
                </p>
              </div>
            </div>

          </div>

          {/* Footer Subtotals & Actions */}
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Estimated Groceries Subtotal:</span>
                <span className="font-mono font-semibold text-stone-800">
                  S${rawSubtotal.toFixed(2)}
                </span>
              </div>

              {seniorSavings > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Pioneer / Merdeka Discount ({seniorDiscountPercent}%):</span>
                  </span>
                  <span className="font-mono">
                    -S${seniorSavings.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Estimated Cost:</span>
                <span className="font-mono text-emerald-950 text-lg">
                  S${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* WhatsApp Share & Print buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopyWhatsApp}
                className="py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedWhatsApp ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-600" />}
                <span>{copiedWhatsApp ? 'Copied List!' : 'Copy WhatsApp'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Print List</span>
              </button>
            </div>

            {/* Direct Link to Supermarket */}
            {grocer.websiteUrl.startsWith('http') && (
              <a
                href={grocer.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-950 transition-colors flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <span>Dispatch / Order on {grocer.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
              </a>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
