import React from 'react';
import { X, Heart, ShieldAlert, Award, Sparkles, Check, CheckCircle2 } from 'lucide-react';

interface SeniorNutritionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  seniorFontSize: boolean;
}

export const SeniorNutritionGuideModal: React.FC<SeniorNutritionGuideModalProps> = ({
  isOpen,
  onClose,
  seniorFontSize,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                Singapore HPB
              </span>
              <span className="text-xs text-stone-500 font-semibold uppercase">
                Clinical Guidelines (65+)
              </span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 mt-1 font-serif">
              Senior Nutrition & Diet Requirements
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className={`p-6 sm:p-8 overflow-y-auto space-y-6 ${seniorFontSize ? 'text-lg leading-relaxed' : 'text-sm'}`}>
          
          {/* Section 1: My Healthy Plate */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <h3 className="font-bold text-emerald-950 text-base mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Singapore HPB &quot;My Healthy Plate&quot; for Seniors</span>
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs mt-3">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                <span className="font-bold text-emerald-900 block text-sm">1/2 Plate</span>
                <span className="text-stone-600 block mt-0.5">Vegetables & Fruits (Fiber & Eye Lutein)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                <span className="font-bold text-emerald-900 block text-sm">1/4 Plate</span>
                <span className="text-stone-600 block mt-0.5">Lean Protein (Fish, Tofu, Eggs, Poultry)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                <span className="font-bold text-emerald-900 block text-sm">1/4 Plate</span>
                <span className="text-stone-600 block mt-0.5">Wholegrains (Brown/Red Rice, Oats)</span>
              </div>
            </div>
          </div>

          {/* Section 2: Combating Sarcopenia */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-base">
              1. Combat Sarcopenia (Preserving Muscle & Mobility)
            </h3>
            <p className="text-stone-600 leading-normal">
              After age 65, muscle mass naturally declines by 1-2% annually. Seniors require <strong>1.2g of protein per kg of body weight</strong> (e.g. 72g daily for a 60kg adult), higher than younger adults, to prevent falls and maintain independent walking.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700 border border-stone-200">
              💡 <strong>SilverApron Strategy:</strong> We calibrate at least 25g - 34g of easily digestible protein per meal via fresh steamed threadfin, batang mackerel, silken tofu, and soft minced chicken.
            </div>
          </div>

          {/* Section 3: Bone Density & Osteoporosis */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-base">
              2. Calcium & Vitamin D (Osteoporosis Defense)
            </h3>
            <p className="text-stone-600 leading-normal">
              Singapore health recommendations specify <strong>1,000 mg of calcium daily</strong> for adults over 50. Combining dietary calcium (fortified tofu, ikan bilis soup, dark leafy greens like Chye Sim) with 15 minutes of gentle morning sunlight aids bone density without gastric distress.
            </p>
          </div>

          {/* Section 4: Low Sodium Hacks */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-base">
              3. Blood Pressure & Sodium Control (&lt;1,500mg/day)
            </h3>
            <p className="text-stone-600 leading-normal">
              Over 1 in 3 Singapore seniors have hypertension. Instead of plain boiled food which diminishes appetite, SilverApron recipes utilize natural umami aromatics:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-sm">
              <li><strong>Ningxia Wolfberries (Goji):</strong> Releases gentle natural fructose and eye-protective carotenoids.</li>
              <li><strong>Seedless Red Dates (Hong Zao):</strong> Sweetens herbal and Cantonese soups without sugar.</li>
              <li><strong>Shiitake & Tomato Umami:</strong> Naturally rich in glutamates, completely replacing MSG.</li>
            </ul>
          </div>

          {/* Section 5: Dysphagia & Chewing Ease Scale */}
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-base">
              4. Texture & Chewing Scale for Dental Health
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50">
                <span className="font-bold text-stone-900 block">Level 1: Silken</span>
                <span className="text-stone-500">Silken tofu, egg custard, pureed broths. Zero chew needed.</span>
              </div>
              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50">
                <span className="font-bold text-stone-900 block">Level 2: Tender Soft</span>
                <span className="text-stone-500">Steamed Batang/Threadfin flakes, soft pumpkin, stewed carrot.</span>
              </div>
              <div className="p-3 rounded-xl border border-stone-200 bg-stone-50">
                <span className="font-bold text-stone-900 block">Level 3: Normal Bite</span>
                <span className="text-stone-500">Tender chicken thigh, wilted chye sim with soft stalks.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white font-semibold text-xs hover:bg-emerald-950 transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
