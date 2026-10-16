import React, { useState, useEffect } from 'react';
import { Recipe, GrocerStore } from '../types/seniorDiet';
import { SG_GROCERS } from '../data/sgGrocers';
import { 
  X, 
  Clock, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Plus, 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Info,
  Type
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  preferredGrocer: GrocerStore;
  onClose: () => void;
  onAddToCart: (recipe: Recipe) => void;
  seniorFontSize: boolean;
  onToggleFontSize: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  preferredGrocer,
  onClose,
  onAddToCart,
  seniorFontSize,
  onToggleFontSize,
}) => {
  if (!recipe) return null;

  const [activeStepTimer, setActiveStepTimer] = useState<number | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const grocer = SG_GROCERS[preferredGrocer] || SG_GROCERS.fairprice;

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && timerRunning) {
      setTimerRunning(false);
      // Play a soft sound alert
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          osc.connect(ctx.destination);
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.start();
          osc.stop(ctx.currentTime + 0.4);
        } catch (e) {
          // ignore
        }
      }
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSecondsLeft]);

  // Voice narration for senior hands-free cooking
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech reader is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${recipe.title}. ${recipe.subtitle}. Preparation time: ${recipe.prepTimeMinutes} minutes. Cooking time: ${recipe.cookTimeMinutes} minutes. Steps: ${recipe.steps.map(s => `Step ${s.stepNumber}: ${s.title}. ${s.instruction}`).join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // Slightly slower, clear cadence for seniors
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Stop speech when closing
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const startTimerForStep = (stepNumber: number, durationSeconds: number) => {
    setActiveStepTimer(stepNumber);
    setTimerSecondsLeft(durationSeconds);
    setTimerRunning(true);
  };

  const toggleIngredientCheck = (id: string) => {
    setCheckedIngredients(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] animate-in fade-in duration-200">
        
        {/* Sticky Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
              Singapore HPB 65+
            </span>
            <span className="text-xs text-stone-500 font-medium">
              {recipe.chewabilityLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Reader Button */}
            <button
              type="button"
              onClick={handleToggleSpeech}
              title={isSpeaking ? 'Pause Voice Reader' : 'Listen to Cooking Steps Aloud'}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSpeaking 
                  ? 'bg-emerald-800 text-white border-emerald-900' 
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-emerald-300" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Stop Voice' : 'Read Aloud'}</span>
            </button>

            {/* Senior Font Size Switcher */}
            <button
              type="button"
              onClick={onToggleFontSize}
              title="Toggle Large Senior Text Size"
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                seniorFontSize ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Type className="w-4 h-4" />
              <span className="hidden sm:inline">{seniorFontSize ? 'Normal Font' : 'Large Font'}</span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className={`overflow-y-auto p-6 sm:p-8 space-y-8 ${seniorFontSize ? 'text-lg leading-relaxed' : 'text-base'}`}>
          
          {/* Hero Banner */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100">
            <img
              src={recipe.heroImage}
              alt={recipe.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs sm:text-sm font-semibold text-emerald-300 block mb-1">
                {recipe.chineseTitle}
              </span>
              <h2 className="text-xl sm:text-3xl font-bold font-serif leading-tight">
                {recipe.title}
              </h2>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-semibold block">Protein (Per Serving)</span>
              <span className="text-lg font-bold font-mono text-emerald-950">
                {recipe.nutrition.proteinGrams}g
              </span>
              <span className="text-[10px] text-stone-500 block">Sarcopenia protection</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-semibold block">Bone Calcium</span>
              <span className="text-lg font-bold font-mono text-emerald-950">
                {recipe.nutrition.calciumMg}mg
              </span>
              <span className="text-[10px] text-stone-500 block">Osteoporosis defense</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-semibold block">Lower Sodium</span>
              <span className="text-lg font-bold font-mono text-emerald-900">
                {recipe.nutrition.sodiumMg}mg
              </span>
              <span className="text-[10px] text-stone-500 block">Hypertension safe</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 uppercase font-semibold block">Preparation Ease</span>
              <span className="text-sm font-bold text-stone-900 block truncate">
                {recipe.prepTimeMinutes + recipe.cookTimeMinutes} Mins
              </span>
              <span className="text-[10px] text-stone-500 block">{recipe.appliance}</span>
            </div>
          </div>

          {/* Senior Benefits Narrative */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-stone-900">
                  Senior Nutritional Health Assessment (65+)
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-normal">
                  {recipe.seniorBenefitsDescription}
                </p>
                {recipe.pioneerTip && (
                  <p className="text-xs text-amber-900 mt-2 font-medium bg-amber-50 p-2 rounded border border-amber-200">
                    💡 <strong>Pioneer / Merdeka Sourcing Tip:</strong> {recipe.pioneerTip}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Ingredient Sourcing Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>Ingredients & Local SG Sourcing</span>
                <span className="text-xs font-normal text-stone-500">
                  ({recipe.ingredients.length} items from {grocer.name})
                </span>
              </h3>
              <span className="text-xs text-stone-500">Check off items you already own</span>
            </div>

            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden bg-white">
              {recipe.ingredients.map(ing => {
                const checked = checkedIngredients[ing.id];
                return (
                  <div
                    key={ing.id}
                    onClick={() => toggleIngredientCheck(ing.id)}
                    className={`p-3.5 flex items-start justify-between gap-4 cursor-pointer hover:bg-stone-50 transition-colors ${
                      checked ? 'bg-stone-50/70 text-stone-400' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors ${
                        checked ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-stone-300'
                      }`}>
                        {checked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${checked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                            {ing.name}
                          </span>
                          {ing.chineseName && (
                            <span className="text-xs text-stone-400">
                              {ing.chineseName}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {ing.amount} {ing.sgSourceNotes && `· ${ing.sgSourceNotes}`}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-sm font-bold text-stone-900">
                        S${ing.estimatedPriceSGD.toFixed(2)}
                      </span>
                      {ing.pantryEssential && (
                        <span className="block text-[10px] text-emerald-800">
                          Cross-used pantry
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cooking Steps with Senior Ease Tips and Timers */}
          <div>
            <h3 className="text-lg font-bold text-stone-900 mb-4">
              Easy Step-by-Step Preparation
            </h3>

            <div className="space-y-4">
              {recipe.steps.map(step => (
                <div
                  key={step.stepNumber}
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-emerald-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-stone-900 text-base">
                        {step.title}
                      </h4>
                    </div>

                    {step.timerSeconds && (
                      <div className="shrink-0">
                        {activeStepTimer === step.stepNumber ? (
                          <div className="flex items-center gap-2 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl">
                            <span className="font-mono font-bold text-emerald-950 text-sm">
                              {formatTimer(timerSecondsLeft)}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTimerRunning(!timerRunning);
                              }}
                              className="p-1 text-emerald-800 hover:text-emerald-950"
                            >
                              {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTimerSecondsLeft(step.timerSeconds || 0);
                                setTimerRunning(false);
                              }}
                              className="p-1 text-stone-500 hover:text-stone-800"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => startTimerForStep(step.stepNumber, step.timerSeconds!)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 cursor-pointer"
                          >
                            <Clock className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Timer ({Math.round(step.timerSeconds / 60)}m)</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="text-stone-700 text-sm leading-relaxed mb-3 pl-10">
                    {step.instruction}
                  </p>

                  {step.elderlyEaseTip && (
                    <div className="ml-10 p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2">
                      <span className="font-bold shrink-0">Elderly Ease Tip:</span>
                      <span>{step.elderlyEaseTip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Substitutions */}
          {recipe.substitutions.length > 0 && (
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
                Singapore Ingredient Substitutions:
              </h4>
              <div className="space-y-1.5 text-xs text-stone-700">
                {recipe.substitutions.map((sub, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-800 font-bold">•</span>
                    <span>
                      <strong>Swap {sub.original} with {sub.substitute}:</strong> {sub.reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Bottom Action */}
        <div className="p-4 border-t border-stone-200 bg-white flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-500 block">Total Est. Ingredients:</span>
            <span className="font-mono font-bold text-lg text-stone-900">
              S${recipe.ingredients.reduce((a, b) => a + b.estimatedPriceSGD, 0).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onAddToCart(recipe);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-950 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span>Add to Singapore Grocer Basket</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
