import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Activity, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Database } from 'lucide-react';
import { SeniorNutrientProfile, NourishMev2Response } from '../../api/NourishMev2';
import { HealthResponse } from '../../api/health';

interface LiveNutritionInspectorProps {
  seniorFontSize: boolean;
}

export const LiveNutritionInspector: React.FC<LiveNutritionInspectorProps> = ({ seniorFontSize }) => {
  const [query, setQuery] = useState('cheddar');
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NourishMev2Response | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<HealthResponse | null>(null);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const json = await res.json();
        setHealth(json);
      }
    } catch {
      // ignore
    }
  };

  const fetchLiveFoodData = async (targetQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/NourishMev2?query=${encodeURIComponent(targetQuery)}&pageSize=${pageSize}`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const json: NourishMev2Response = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to /api/NourishMev2');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    fetchLiveFoodData(query);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchLiveFoodData(query.trim());
    }
  };

  return (
    <div className={`max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-8 ${seniorFontSize ? 'text-lg leading-relaxed' : 'text-sm'}`}>
      
      {/* Header & Serverless Connection Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <Database className="w-4 h-4 text-emerald-700" />
            <span>LIVE SERVERLESS /API/NOURISHMEV2 & DATAMALL SYNC</span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-stone-900 tracking-tight">
            Live Food Nutrition & Senior Assessment
          </h1>
          <p className="text-stone-600 max-w-2xl mt-1">
            Real-time API connection querying live FoodData Central endpoints (<code className="font-mono text-xs bg-stone-100 px-1 py-0.5 rounded">/api/NourishMev2</code>) and evaluating senior clinical thresholds.
          </p>
        </div>

        {/* Server Status Badge */}
        {health && (
          <div className="p-3 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-3 shrink-0">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs">
              <span className="font-bold text-stone-900 block">{health.service}</span>
              <span className="text-stone-500 font-mono text-[11px]">
                Endpoint: <span className="text-emerald-700 font-semibold">{health.status.toUpperCase()}</span> · Up {health.uptimeSeconds}s
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Query Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search ingredient (e.g. cheddar, salmon, tofu, mackerel, spinach)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-950 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Query Live API</span>
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-stone-400 uppercase shrink-0">Test queries:</span>
          {['cheddar', 'salmon', 'silken tofu', 'mackerel', 'spinach', 'chicken breast', 'pumpkin'].map(item => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setQuery(item);
                fetchLiveFoodData(item);
              }}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer shrink-0"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* API Metadata Banner */}
      {data && (
        <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 font-mono">
          <div>
            <span>Query: <strong>&quot;{data.query}&quot;</strong></span>
            <span className="mx-2">·</span>
            <span>Source: <strong className="text-emerald-800">{data.source}</strong></span>
            <span className="mx-2">·</span>
            <span>Mode: <strong>{data.apiKeyMode}</strong></span>
          </div>
          <div className="text-stone-500">
            Hits: {data.totalHits} · Showing top {data.foods.length}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results List */}
      {data && data.foods && (
        <div className="space-y-4">
          {data.foods.map((food, idx) => (
            <div
              key={food.fdcId || idx}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-stone-400">FDC ID #{food.fdcId}</span>
                    <span className="text-xs text-stone-400">·</span>
                    <span className="text-xs font-semibold text-emerald-800">{food.dataType}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mt-0.5">
                    {food.description}
                  </h3>
                  {food.brandOwner && (
                    <p className="text-xs text-stone-500">Brand: {food.brandOwner}</p>
                  )}
                </div>

                {/* Senior Chewability Tag */}
                <div className="shrink-0">
                  <span className="text-xs px-2.5 py-1 rounded bg-stone-100 text-stone-700 font-semibold border border-stone-200">
                    Chewability: {food.seniorAssessment.chewabilitySuitability}
                  </span>
                </div>
              </div>

              {/* Nutrients per 100g */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-center text-xs">
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-semibold">Calories</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">
                    {food.nutrients.caloriesKcal} kcal
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-semibold">Protein</span>
                  <span className={`font-mono font-bold text-sm ${food.nutrients.proteinG >= 20 ? 'text-emerald-700' : 'text-stone-900'}`}>
                    {food.nutrients.proteinG}g
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-semibold">Calcium</span>
                  <span className={`font-mono font-bold text-sm ${food.nutrients.calciumMg >= 150 ? 'text-sky-700' : 'text-stone-900'}`}>
                    {food.nutrients.calciumMg}mg
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-semibold">Sodium</span>
                  <span className={`font-mono font-bold text-sm ${food.nutrients.sodiumMg <= 200 ? 'text-emerald-700' : 'text-amber-800'}`}>
                    {food.nutrients.sodiumMg}mg
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-semibold">Fiber</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">
                    {food.nutrients.fiberG}g
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 uppercase font-semibold">Lipid Fat</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">
                    {food.nutrients.fatG}g
                  </span>
                </div>
              </div>

              {/* Senior Health Assessment Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <span className={`inline-flex items-center gap-1 font-semibold ${
                  food.seniorAssessment.sarcopeniaDefense ? 'text-emerald-800' : 'text-stone-400'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sarcopenia Defense ({food.nutrients.proteinG >= 20 ? 'Adequate 20g+' : 'Low'})</span>
                </span>
                <span className="text-stone-300">·</span>
                <span className={`inline-flex items-center gap-1 font-semibold ${
                  food.seniorAssessment.boneHealthAdequate ? 'text-emerald-800' : 'text-stone-400'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Bone Health ({food.nutrients.calciumMg >= 150 ? 'High Calcium' : 'Low'})</span>
                </span>
                <span className="text-stone-300">·</span>
                <span className={`inline-flex items-center gap-1 font-semibold ${
                  food.seniorAssessment.lowSodiumSafe ? 'text-emerald-800' : 'text-amber-800'
                }`}>
                  {food.seniorAssessment.lowSodiumSafe ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>Sodium Rating ({food.seniorAssessment.lowSodiumSafe ? 'HPB Safe' : 'High Salt - Watch BP'})</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
