import React from 'react';
import { ShoppingBag, Sparkles, HeartPulse, Sliders, Volume2, Type } from 'lucide-react';

interface HeaderProps {
  onOpenCalibration: () => void;
  onOpenCart: () => void;
  onOpenNutritionGuide: () => void;
  onOpenAiConsult: () => void;
  cartItemCount: number;
  seniorFontSize: boolean;
  onToggleFontSize: () => void;
  activeView: 'calibration' | 'recipes' | 'grocer_sources' | 'live_data' | 'talk_to_us';
  setActiveView: (view: 'calibration' | 'recipes' | 'grocer_sources' | 'live_data' | 'talk_to_us') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCalibration,
  onOpenCart,
  onOpenNutritionGuide,
  onOpenAiConsult,
  cartItemCount,
  seniorFontSize,
  onToggleFontSize,
  activeView,
  setActiveView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveView('recipes')}
              className="text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 font-serif">
                  SilverApron
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                  SG 65+
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                Singapore Senior Nutrition & Kitchen Calibration
              </p>
            </button>
          </div>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => setActiveView('recipes')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeView === 'recipes' ? 'text-emerald-900 border-b-2 border-emerald-700 font-semibold' : ''
              }`}
            >
              Senior Recipes
            </button>
            <button
              onClick={() => setActiveView('calibration')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeView === 'calibration' ? 'text-emerald-900 border-b-2 border-emerald-700 font-semibold' : ''
              }`}
            >
              Kitchen Profile
            </button>
            <button
              onClick={() => setActiveView('grocer_sources')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeView === 'grocer_sources' ? 'text-emerald-900 border-b-2 border-emerald-700 font-semibold' : ''
              }`}
            >
              SG Grocer Sourcing
            </button>
            <button
              onClick={() => setActiveView('live_data')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeView === 'live_data' ? 'text-emerald-900 border-b-2 border-emerald-700 font-semibold' : ''
              }`}
            >
              Live FDC Datamall
            </button>
            <button
              onClick={() => setActiveView('talk_to_us')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeView === 'talk_to_us' ? 'text-emerald-900 border-b-2 border-emerald-700 font-semibold' : ''
              }`}
            >
              Talk to Us
            </button>
            <button
              onClick={onOpenNutritionGuide}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer text-stone-700"
            >
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <span>HPB Senior Guide</span>
            </button>
          </nav>

          {/* Zone 3: Primary action & accessibility tools */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Senior Large Font Switcher */}
            <button
              onClick={onToggleFontSize}
              title={seniorFontSize ? 'Switch to Standard Font' : 'Enable Large Senior Font for Easy Reading'}
              aria-label="Toggle Senior Font Size"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                seniorFontSize 
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-sm' 
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{seniorFontSize ? 'Text: Large (65+)' : 'Text: Normal'}</span>
            </button>

            {/* AI Senior Dietitian Button */}
            <button
              onClick={onOpenAiConsult}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Ask Dietitian</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900 text-white hover:bg-emerald-950 transition-colors text-xs font-semibold shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">SG Basket</span>
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-600 text-white font-mono text-[11px] font-bold">
                {cartItemCount}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
