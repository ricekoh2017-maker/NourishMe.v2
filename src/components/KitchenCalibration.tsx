import React, { useState } from 'react';
import { 
  KitchenProfile, 
  HouseholdType, 
  CookingComplexity, 
  SeniorHealthFocus, 
  GrocerStore,
  PortionType
} from '../types/seniorDiet';
import { SG_GROCERS } from '../data/sgGrocers';
import { SENIOR_RECIPES } from '../data/seniorRecipes';
import { 
  Check, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  HeartHandshake, 
  ShoppingBag, 
  Clock, 
  Award,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  X
} from 'lucide-react';

interface KitchenCalibrationProps {
  profile: KitchenProfile;
  onSaveProfile: (updated: KitchenProfile) => void;
  onViewRecipe: (recipeId: string) => void;
  seniorFontSize: boolean;
}

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const KitchenCalibration: React.FC<KitchenCalibrationProps> = ({
  profile,
  onSaveProfile,
  onViewRecipe,
  seniorFontSize,
}) => {
  const [formData, setFormData] = useState<KitchenProfile>(profile);
  const [dislikeInput, setDislikeInput] = useState('');
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  // Suggested recipe based on current complexity
  const matchedRecipe = SENIOR_RECIPES.find(r => r.complexity === formData.complexity) || SENIOR_RECIPES[0];

  const toggleDay = (day: string) => {
    setFormData(prev => {
      const exists = prev.cookingDays.includes(day);
      const updatedDays = exists 
        ? prev.cookingDays.filter(d => d !== day)
        : [...prev.cookingDays, day];
      return { ...prev, cookingDays: updatedDays };
    });
  };

  const handleAddDislike = () => {
    if (!dislikeInput.trim()) return;
    if (!formData.dislikedIngredients.includes(dislikeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        dislikedIngredients: [...prev.dislikedIngredients, dislikeInput.trim()]
      }));
    }
    setDislikeInput('');
  };

  const handleRemoveDislike = (item: string) => {
    setFormData(prev => ({
      ...prev,
      dislikedIngredients: prev.dislikedIngredients.filter(d => d !== item)
    }));
  };

  const toggleHealthFocus = (focus: SeniorHealthFocus) => {
    setFormData(prev => {
      const exists = prev.healthFocus.includes(focus);
      const updated = exists
        ? prev.healthFocus.filter(f => f !== focus)
        : [...prev.healthFocus, focus];
      return { ...prev, healthFocus: updated };
    });
  };

  const toggleExclusion = (item: string) => {
    setFormData(prev => {
      const exists = prev.exclusions.includes(item);
      const updated = exists 
        ? prev.exclusions.filter(e => e !== item)
        : [...prev.exclusions, item];
      return { ...prev, exclusions: updated };
    });
  };

  const handleSave = () => {
    onSaveProfile(formData);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3000);
  };

  return (
    <div className={`max-w-3xl mx-auto px-4 py-8 sm:px-6 transition-all ${seniorFontSize ? 'text-lg leading-relaxed' : 'text-base'}`}>
      
      {/* Step Tracker Header matching screenshot */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider text-emerald-900 uppercase">
          <span>Step 1 of 4 · Senior Household & Dietary Profile</span>
          <div className="flex items-center gap-1.5">
            <span className="w-8 h-1.5 rounded-full bg-emerald-800"></span>
            <span className="w-3 h-1.5 rounded-full bg-stone-300"></span>
            <span className="w-3 h-1.5 rounded-full bg-stone-300"></span>
            <span className="w-3 h-1.5 rounded-full bg-stone-300"></span>
          </div>
        </div>
      </div>

      {/* Hero Headline & Guarantee */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-rose-600" />
          <span>ZERO DECISION FATIGUE FOR SENIORS & CAREGIVERS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-serif mb-3">
          Let’s calibrate your senior kitchen profile.
        </h1>
        <p className="text-stone-600 leading-normal max-w-2xl">
          Say goodbye to the 6 PM “what’s for dinner?” dilemma. Calibrate soft-chew textures, sarcopenia muscle defense, and your weekly rhythm so fresh Singapore groceries never go to waste in the crisper drawer.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* ========================================================= */}
        {/* 01 / HOUSEHOLD COMPOSITION */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-mono font-semibold tracking-wider text-stone-400 uppercase">
                01 / Household Composition
              </p>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">
                Who are you cooking for each evening?
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>

          {/* Living arrangements */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { id: 'solo', label: 'Solo Living', sub: '1 senior citizen' },
              { id: 'couple', label: 'Senior Duo', sub: '2 elderly adults' },
              { id: 'multigen', label: 'Multi-Gen Table', sub: 'Seniors + Family' },
              { id: 'caregiver', label: 'Caregiver Assisted', sub: 'Senior + Helper' },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFormData({ ...formData, household: item.id as HouseholdType })}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.household === item.id
                    ? 'border-emerald-700 bg-emerald-950 text-white shadow-sm ring-1 ring-emerald-700'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{item.label}</span>
                  {formData.household === item.id && (
                    <Check className="w-4 h-4 text-emerald-300" />
                  )}
                </div>
                <p className={`text-xs ${formData.household === item.id ? 'text-emerald-200' : 'text-stone-500'}`}>
                  {item.sub}
                </p>
              </button>
            ))}
          </div>

          {/* Senior Age Cohort */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-stone-600 mb-2">
              Primary Senior Age Cohort (Singapore Demographics):
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: '65-74', title: '65 - 74 yrs', tag: 'Active Agers' },
                { id: '75-84', title: '75 - 84 yrs', tag: 'Merdeka & Pioneer' },
                { id: '85+', title: '85+ yrs', tag: 'Frailty Defense' },
              ].map(cohort => (
                <button
                  key={cohort.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, ageBracket: cohort.id as any })}
                  className={`px-3 py-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                    formData.ageBracket === cohort.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-xs font-bold">{cohort.title}</div>
                  <div className="text-[11px] text-stone-500">{cohort.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Portions steppers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <p className="font-semibold text-sm text-stone-900">Senior Adult Portions</p>
                <p className="text-xs text-stone-500">Full nutrient-dense portion (65+)</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, seniorCount: Math.max(1, formData.seniorCount - 1) })}
                  className="w-8 h-8 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono font-bold text-base text-stone-900 w-4 text-center">
                  {formData.seniorCount}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, seniorCount: formData.seniorCount + 1 })}
                  className="w-8 h-8 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <p className="font-semibold text-sm text-stone-900">Family / Light Portions</p>
                <p className="text-xs text-stone-500">Caregiver or scaled light eaters</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, familyCount: Math.max(0, formData.familyCount - 1) })}
                  className="w-8 h-8 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono font-bold text-base text-stone-900 w-4 text-center">
                  {formData.familyCount}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, familyCount: formData.familyCount + 1 })}
                  className="w-8 h-8 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 02 / WEEKLY COOKING RHYTHM */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-mono font-semibold tracking-wider text-stone-400 uppercase">
                02 / Weekly Cooking Rhythm
              </p>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">
                Which nights do you want home-cooked food?
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <p className="text-xs text-stone-500 mb-5">
            We order exact quantities tailored to active nights, eliminating waste of half-used bunches of spring onions and ginger in your vegetable crisper.
          </p>

          {/* Day circles */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            {DAYS_OF_WEEK.map(day => {
              const active = formData.cookingDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`w-12 h-14 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    active 
                      ? 'bg-emerald-950 text-white font-bold shadow-sm' 
                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  <span className="text-[11px] font-mono">{day}</span>
                  {active ? (
                    <Check className="w-4 h-4 text-emerald-400 mt-1" />
                  ) : (
                    <span className="text-stone-300 text-xs mt-1">-</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Cadence quick preset */}
          <div className="flex items-center justify-between pt-3 text-xs text-stone-600">
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recommended cadence: Weekdays (Mon - Thu)</span>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, cookingDays: ['MON', 'TUE', 'WED', 'THU'] })}
              className="text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              Reset to Mon-Thu
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 / DINNER COMPLEXITY & ARCHITECTURE */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-mono font-semibold tracking-wider text-stone-400 uppercase">
                03 / Dinner Complexity & Kitchen Ease
              </p>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">
                How do you prefer senior dinners built?
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Flame className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {[
              {
                id: '1-dish',
                title: '1-Dish Wonder',
                tag: 'Fastest (~15-20m)',
                desc: 'Electric steamer fish with tofu bed, one-pot rice cooker meals, or hearty noodle broths. 1 appliance to wash, zero oil splatter.',
              },
              {
                id: '2-dish',
                title: '2-Dish Balanced',
                badge: 'MOST POPULAR FOR SENIORS',
                tag: 'Balanced (~20-30m)',
                desc: 'A high-protein hero (Threadfin or Batang) paired with gentle wilted greens (Chye Sim/Spinach) or nourishing clear soup.',
              },
              {
                id: '3-dish',
                title: '3-Dish Family Feast',
                tag: 'Elaborate (~35-45m)',
                desc: 'Traditional Chinese/Singapore homestyle dinner: slow-simmered herbal soup, steamed protein, and tender braised vegetables.',
              },
            ].map(arch => (
              <button
                key={arch.id}
                type="button"
                onClick={() => setFormData({ ...formData, complexity: arch.id as CookingComplexity })}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  formData.complexity === arch.id
                    ? 'border-emerald-700 bg-emerald-950 text-white shadow-sm ring-1 ring-emerald-700'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base">{arch.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                      formData.complexity === arch.id ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {arch.tag}
                    </span>
                  </div>
                  {arch.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider ${
                      formData.complexity === arch.id ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-800'
                    }`}>
                      {arch.badge}
                    </span>
                  )}
                </div>
                <p className={`text-xs ${formData.complexity === arch.id ? 'text-stone-300' : 'text-stone-600'}`}>
                  {arch.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Kitchen & Mobility Constraints for 65+ */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              Senior Pacing & Kitchen Constraints:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'softChew', label: 'Denture-Safe / Soft Chew' },
                { key: 'electricOnly', label: 'Electric Steamer / Rice Cooker (No Open Flame)' },
                { key: 'under20Mins', label: 'Under 20 Mins Flat' },
                { key: 'lowArthritisChop', label: 'Low Arthritis Chop (Pre-cut friendly)' },
                { key: 'nextDayFriendly', label: 'Next-Day Reheat Friendly' },
                { key: 'lowCleanUp', label: 'Easy Clean-up (1-Pan / 1-Pot)' },
              ].map(item => {
                const checked = formData.constraints[item.key as keyof typeof formData.constraints];
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        constraints: {
                          ...formData.constraints,
                          [item.key]: !checked
                        }
                      });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      checked
                        ? 'bg-emerald-900 border-emerald-950 text-white shadow-sm'
                        : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 / DIETARY LIFESTYLE & HEALTH HARD-LOCKS */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-mono font-semibold tracking-wider text-stone-400 uppercase">
                04 / Dietary Health Hard-Locks
              </p>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">
                What guidelines should we lock into the menu?
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <p className="text-xs text-stone-500 mb-5">
            Strictly cross-referenced with Singapore Health Promotion Board (HPB) guidelines for adults aged 65 and above.
          </p>

          {/* Health Focus Chips */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Primary Senior Health Goals:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'high_protein', label: 'High Protein (30g+)', sub: 'Sarcopenia & muscle retention' },
                { id: 'bone_calcium', label: 'High Calcium & Bone Defense', sub: 'Osteoporosis protection (1000mg)' },
                { id: 'low_sodium', label: 'Low Sodium / DASH Target', sub: 'Hypertension & cardiovascular care' },
                { id: 'diabetic_low_gi', label: 'Diabetic & Low GI', sub: 'Steady blood sugar & brown rice blends' },
                { id: 'gentle_gut', label: 'Gentle Digestion & Calming', sub: 'Low acid, soothing warm broths' },
                { id: 'gout_low_purine', label: 'Low Purine / Gout Safe', sub: 'Zero high-purine organ meats' },
              ].map(goal => {
                const active = formData.healthFocus.includes(goal.id as SeniorHealthFocus);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleHealthFocus(goal.id as SeniorHealthFocus)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-medium'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{goal.label}</span>
                      {active && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">{goal.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dietary Style */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Singapore Cuisine Preference:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'singapore_chinese', label: 'Chinese Dialect (Teochew / Cantonese)' },
                { id: 'halal_malay', label: 'Singapore Halal / Malay' },
                { id: 'indian_ayurvedic', label: 'Indian / Dhal Vegetarian' },
                { id: 'plant_forward', label: 'Plant-Forward & Tofu' },
              ].map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, eatingStyle: c.id as any })}
                  className={`p-2.5 rounded-lg border text-center text-xs transition-colors cursor-pointer ${
                    formData.eatingStyle === c.id
                      ? 'border-emerald-700 bg-emerald-900 text-white font-medium'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Strict Exclusions */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Strict Exclusions & Allergies:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Shellfish-Free',
                'No Pork / Lard',
                'Gluten-Free',
                'Dairy-Free',
                'Nut-Free',
                'Low Potassium (CKD)'
              ].map(exc => {
                const active = formData.exclusions.includes(exc);
                return (
                  <button
                    key={exc}
                    type="button"
                    onClick={() => toggleExclusion(exc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      active
                        ? 'bg-rose-100 border-rose-300 text-rose-900 font-semibold'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {exc}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disliked Ingredients */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Specific Ingredient Dislikes (e.g. Raw Cilantro, Bittergourd):
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add ingredient to omit (e.g. Bittergourd, Eggplant)"
                value={dislikeInput}
                onChange={e => setDislikeInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddDislike())}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <button
                type="button"
                onClick={handleAddDislike}
                className="px-4 py-2 bg-emerald-900 text-white text-xs font-semibold rounded-lg hover:bg-emerald-950 transition-colors cursor-pointer"
              >
                Add Dislike
              </button>
            </div>

            {formData.dislikedIngredients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.dislikedIngredients.map(item => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-200 text-stone-800 text-xs font-medium"
                  >
                    No {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveDislike(item)}
                      className="text-stone-500 hover:text-stone-900 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 / GROCER SYNC & TARGET BUDGET */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-mono font-semibold tracking-wider text-stone-400 uppercase">
                05 / SG Grocer Sourcing & Budget
              </p>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">
                Where do you prefer senior pantry supplies dispatched from?
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <p className="text-xs text-stone-500 mb-5">
            We map recipe stock keeping units to real-time availability across Singapore supermarkets and local wet markets.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              { id: 'fairprice', name: 'FairPrice Online', desc: 'National Co-op · Free over $79' },
              { id: 'shengsiong', name: 'Sheng Siong', desc: 'Fresh Fish & Greens · 4% Senior Tue/Wed' },
              { id: 'redmart', name: 'RedMart (Lazada)', desc: '2-hr slots · Heavy pantry delivery' },
              { id: 'coldstorage', name: 'Cold Storage / CS', desc: 'Premium cuts & air-flown salmon' },
              { id: 'wetmarket', name: 'Local Wet Market', desc: 'Tekka / Tiong Bahru / Chinatown' },
            ].map(store => (
              <button
                key={store.id}
                type="button"
                onClick={() => setFormData({ ...formData, preferredGrocer: store.id as GrocerStore })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.preferredGrocer === store.id
                    ? 'border-emerald-700 bg-emerald-950 text-white shadow-sm ring-1 ring-emerald-700'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs sm:text-sm">{store.name}</span>
                  {formData.preferredGrocer === store.id && (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  )}
                </div>
                <p className={`text-[11px] ${formData.preferredGrocer === store.id ? 'text-emerald-200' : 'text-stone-500'}`}>
                  {store.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Pioneer / Merdeka Generation Subsidy Toggle */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-950">
                  Singapore Pioneer & Merdeka Generation Rebate Sync
                </p>
                <p className="text-xs text-amber-800 mt-0.5">
                  Does the household possess an eligible Pioneer or Merdeka card? Automatically calculates 3% - 4% savings on fresh fish, poultry, and vegetables on designated supermarket days.
                </p>
                <div className="flex gap-2 mt-2.5">
                  {[
                    { id: 'none', label: 'None' },
                    { id: 'merdeka', label: 'Merdeka Gen (Born ≤ 1959)' },
                    { id: 'pioneer', label: 'Pioneer Gen (Born ≤ 1949)' },
                  ].map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, hasPioneerOrMerdekaCard: c.id as any })}
                      className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
                        formData.hasPioneerOrMerdekaCard === c.id
                          ? 'bg-amber-800 text-white border-amber-900 font-semibold'
                          : 'bg-white border-amber-200 text-amber-900 hover:bg-amber-100'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Budget Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Estimated Target Dinner Budget
              </span>
              <span className="text-lg font-bold text-stone-900 font-mono">
                S${formData.targetBudgetWeekly} / week
              </span>
            </div>
            
            <input
              type="range"
              min="40"
              max="200"
              step="5"
              value={formData.targetBudgetWeekly}
              onChange={e => setFormData({ ...formData, targetBudgetWeekly: Number(e.target.value) })}
              className="w-full accent-emerald-800 cursor-pointer"
            />
            
            <div className="flex items-center justify-between text-xs text-stone-500 mt-2">
              <span>S$40 (Budget Everyday)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-medium font-mono">
                ~S${(formData.targetBudgetWeekly / (formData.cookingDays.length || 4) / Math.max(1, formData.seniorCount)).toFixed(2)} per serving
              </span>
              <span>S$200 (Premium Fresh Catch)</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* DYNAMIC KITCHEN PROFILE STATUS & PREVIEW CARD */}
        {/* ========================================================= */}
        <section className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-stone-300">
                Dynamic Kitchen Profile
              </span>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-900 text-emerald-200 font-semibold">
              ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 text-xs">
            <div>
              <span className="text-stone-400 block mb-0.5">Target Table Capacity</span>
              <span className="font-semibold text-stone-100 text-sm">
                {formData.seniorCount} Senior{formData.seniorCount > 1 ? 's' : ''} {formData.familyCount > 0 ? `+ ${formData.familyCount} Family` : ''}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Cooking Schedule</span>
              <span className="font-semibold text-stone-100 text-sm">
                {formData.cookingDays.length} Dinners/Week ({formData.cookingDays.join(', ') || 'None'})
              </span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Plate Architecture</span>
              <span className="font-semibold text-stone-100 text-sm">
                {formData.complexity === '1-dish' ? '1-Dish Fast Wonder' : formData.complexity === '2-dish' ? '2-Dish Balanced Meals' : '3-Dish Herbal Feast'}
              </span>
            </div>
          </div>

          {/* Live Matched Recipe Preview */}
          <div className="bg-stone-800/80 rounded-xl p-3.5 border border-stone-700 mt-2">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PREVIEW: YOUR LIVE SENIOR MATCH</span>
              </span>
              <button
                type="button"
                onClick={() => onViewRecipe(matchedRecipe.id)}
                className="text-emerald-300 hover:text-white underline cursor-pointer"
              >
                View Full Recipe
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={matchedRecipe.heroImage}
                alt={matchedRecipe.title}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-stone-100 truncate">
                  {matchedRecipe.title}
                </p>
                <p className="text-xs text-stone-400 truncate">
                  {matchedRecipe.chineseTitle}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-emerald-400 font-mono">
                    {matchedRecipe.prepTimeMinutes + matchedRecipe.cookTimeMinutes} mins
                  </span>
                  <span className="text-stone-500">·</span>
                  <span className="text-amber-300 font-mono">
                    {matchedRecipe.nutrition.proteinGrams}g Protein
                  </span>
                  <span className="text-stone-500">·</span>
                  <span className="text-sky-300 font-mono">
                    {matchedRecipe.nutrition.calciumMg}mg Calcium
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PANTRY ENGINE NOTICE matching screenshot footer */}
        {/* ========================================================= */}
        <div className="rounded-2xl p-5 bg-rose-50/70 border border-rose-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm text-rose-950">
                SilverApron Singapore Pantry Engine
              </p>
              <p className="text-xs text-rose-900 mt-1 leading-relaxed">
                If a recipe needs 2 stalks of spring onion, fresh old ginger, or wolfberries, your other calibrated dinners this week automatically cross-utilize the remaining batch. Zero half-used vegetables going slimy in your HDB fridge crisper drawer.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Save Action */}
        <div className="sticky bottom-4 z-20">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-4 px-6 rounded-xl bg-emerald-900 text-white font-bold text-base hover:bg-emerald-950 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Save Profile & Generate Calibrated Recipes</span>
            <Check className="w-5 h-5 text-emerald-300" />
          </button>
          
          {showSavedFeedback && (
            <div className="mt-2 p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs text-center font-semibold">
              Senior kitchen profile successfully calibrated and saved!
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
