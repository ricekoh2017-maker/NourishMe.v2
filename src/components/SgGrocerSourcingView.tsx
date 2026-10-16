import React from 'react';
import { SG_GROCERS } from '../data/sgGrocers';
import { GrocerStore } from '../types/seniorDiet';
import { Store, Award, Clock, ShoppingCart, ExternalLink, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface SgGrocerSourcingViewProps {
  preferredGrocer: GrocerStore;
  onSelectGrocer: (store: GrocerStore) => void;
  seniorFontSize: boolean;
}

export const SgGrocerSourcingView: React.FC<SgGrocerSourcingViewProps> = ({
  preferredGrocer,
  onSelectGrocer,
  seniorFontSize,
}) => {
  return (
    <div className={`max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-10 ${seniorFontSize ? 'text-lg leading-relaxed' : 'text-sm'}`}>
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
          <Store className="w-4 h-4 text-emerald-700" />
          <span>SINGAPORE GROCERY & WET MARKET DIRECTORY</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-stone-900 tracking-tight">
          Where to Source Fresh Senior Ingredients in Singapore
        </h1>
        <p className="text-stone-600 max-w-2xl mt-1 leading-normal">
          Compare supermarket senior discount schedules, free doorstep delivery thresholds, and local wet market fishmonger ordering guides for elders above 65.
        </p>
      </div>

      {/* Grocers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(SG_GROCERS).map(grocer => {
          const isSelected = preferredGrocer === grocer.id;
          return (
            <div
              key={grocer.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-700 bg-white shadow-md ring-2 ring-emerald-700/20'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      {grocer.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {grocer.tagline}
                    </p>
                  </div>
                  {isSelected ? (
                    <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 text-xs font-bold">
                      Selected
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectGrocer(grocer.id)}
                      className="px-3 py-1 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                    >
                      Set as Default
                    </button>
                  )}
                </div>

                {/* Senior Discount Highlight */}
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs mb-4">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>Senior & Pioneer Subsidy Details</span>
                  </div>
                  <p className="text-amber-900 leading-relaxed">
                    {grocer.seniorDiscountInfo}
                  </p>
                </div>

                {/* Delivery & Best For */}
                <div className="space-y-2 text-xs text-stone-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                    <span><strong>Slots:</strong> {grocer.deliverySlots}</span>
                  </div>
                  {grocer.freeDeliveryThreshold > 0 && (
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-stone-400 shrink-0" />
                      <span><strong>Free Delivery:</strong> Orders over S${grocer.freeDeliveryThreshold}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                    Best to buy here:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {grocer.bestFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-stone-100 text-stone-700 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {grocer.websiteUrl.startsWith('http') && (
                <div className="pt-5 mt-5 border-t border-stone-100">
                  <a
                    href={grocer.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                  >
                    <span>Visit {grocer.name} Store</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Senior Wet Market Insider Guide */}
      <div id="wet-market-guide" className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-300">
            Caregiver & Senior Insider Tips
          </span>
        </div>
        <h2 className="text-2xl font-bold font-serif mb-4">
          Singapore Wet Market Fishmonger Etiquette for Seniors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-stone-300">
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
            <h4 className="font-bold text-stone-100 text-sm mb-1">
              1. Ask for &quot;Elderly Steaming Cut&quot;
            </h4>
            <p>
              Tell the fishmonger: <em>&quot;Uncle, gei ah ma / ah gong jia de, qu lin, qu gu, qie pian&quot;</em> (Descaled, fine bones removed, sliced thin for steaming).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
            <h4 className="font-bold text-stone-100 text-sm mb-1">
              2. Best Visiting Hours (7:30 AM - 9 AM)
            </h4>
            <p>
              Wet market aisles are freshest and least slippery early in the morning. Fish arrive directly from Jurong Fishery Port around 4 AM.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700">
            <h4 className="font-bold text-stone-100 text-sm mb-1">
              3. Tofu Stalls for Fresh Beancurd
            </h4>
            <p>
              Traditional wet market tofu stalls sell freshly pressed warm silken beancurd for under S$0.80 per piece with zero chemical preservatives.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
