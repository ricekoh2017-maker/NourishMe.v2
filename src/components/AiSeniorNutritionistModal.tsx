import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

interface AiSeniorNutritionistModalProps {
  isOpen: boolean;
  onClose: () => void;
  seniorFontSize: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  dysphagia: `For seniors with dysphagia (difficulty swallowing or coughing while eating):
1. **Texture Modification (IDDSI Level 4/5):** Transition from flake fish to pureed steamed tofu mixed with flaked threadfin and a gentle cornstarch slurry.
2. **Moisture & Lubrication:** Never serve dry chicken or rice. Always blend with warm ikan bilis broth or chicken bone broth so the bolus slides smoothly down the esophagus.
3. **Appliance:** Use an electric stick immersion blender right in the bowl for 15 seconds.
4. **Positioning:** Ensure the senior sits upright at a strict 90-degree angle during meals and remains upright for 30 minutes after dining.`,

  substitute: `If Threadfin (Ngoh He) is out of stock at Sheng Siong or FairPrice:
1. **Best Local Swap:** Fresh Batang (Spanish Mackerel) - center cut. It is high in protein, rich in Omega-3 DHA, and very easy to debone.
2. **Softer Budget Option:** Fresh Seabass (Siakap) or Red Snapper fillet. Steam for 7 minutes with ginger and wolfberries.
3. **High Calcium Non-Fish Swap:** Unicurd High Calcium Silken Tofu layered with minced lean pork and pasteurized egg custard.`,

  flame: `Safe Zero-Open-Flame Cooking for Singapore Seniors:
1. **Automatic Rice Cooker Meals:** Put whole grain rice, cubed pumpkin, skinless chicken thigh, and mushroom broth into a Tiger or Cuckoo rice cooker. Press 'Cook' once. It switches to 'Keep Warm' automatically with zero fire danger.
2. **Tiered Electric Food Steamer:** Simply pour water into the base, set dial for 10-15 minutes, and walk away. Steaming prevents oil splatters and eliminates stove burns.
3. **Induction Cooktop with Auto-Shutoff:** If using pots, use an induction hob with a 30-minute auto timer.`,

  diabetes: `Adapting Meals for Singapore Seniors with Type 2 Diabetes & Hypertension:
1. **Glycemic Index (GI) Management:** Replace white Jasmine rice with a 50/50 blend of brown rice and red rice or whole grain bee hoon.
2. **Natural Sodium Reducers:** Do not use plain salt. Use dried Ningxia wolfberries, soaked red dates, dried shiitake mushrooms, and fresh old ginger for natural sweetness and aroma.
3. **Bittergourd Integration:** Thinly slice bittergourd and steam with egg white or lean minced pork to assist natural blood glucose sensitivity.`
};

export const AiSeniorNutritionistModal: React.FC<AiSeniorNutritionistModalProps> = ({
  isOpen,
  onClose,
  seniorFontSize,
}) => {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your Singapore Senior Nutrition & Kitchen AI Assistant. Ask me anything about tailoring recipes for seniors aged 65+, managing chewability/denture comfort, preventing muscle loss (sarcopenia), or finding local substitutes at Sheng Siong and FairPrice.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate intelligent response
    setTimeout(() => {
      let reply = `Here are senior-friendly nutritional recommendations based on Singapore Health Promotion Board (HPB) guidelines:

• **Protein Retention:** Aim for 25g-35g digestible protein per meal (e.g. fresh steamed fish fillet, silken tofu, eggs) to counter sarcopenia.
• **Ease of Prep:** Prioritize electric steaming or one-pot rice cooker meals to eliminate open flames and heavy oil cleanup.
• **Sourcing:** You can easily grab these at FairPrice or Sheng Siong on Pioneer / Merdeka senior discount days.`;

      const lower = query.toLowerCase();
      if (lower.includes('dysphagia') || lower.includes('swallow') || lower.includes('chok')) {
        reply = KNOWLEDGE_RESPONSES.dysphagia;
      } else if (lower.includes('substitute') || lower.includes('fish') || lower.includes('sheng siong') || lower.includes('out of stock')) {
        reply = KNOWLEDGE_RESPONSES.substitute;
      } else if (lower.includes('flame') || lower.includes('safe') || lower.includes('fire') || lower.includes('electric') || lower.includes('rice cooker')) {
        reply = KNOWLEDGE_RESPONSES.flame;
      } else if (lower.includes('diabet') || lower.includes('sugar') || lower.includes('hypertension') || lower.includes('blood pressure') || lower.includes('salt')) {
        reply = KNOWLEDGE_RESPONSES.diabetes;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-900 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Senior Nutritionist & Prep Advisor
              </h2>
              <p className="text-xs text-stone-500">
                Singapore HPB Senior Guidelines & Kitchen Safety
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className={`flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50/50 ${seniorFontSize ? 'text-lg leading-relaxed' : 'text-sm'}`}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  AI
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-[85%] whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-emerald-900 text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-800 shadow-xs'
                }`}
              >
                {m.content}
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-stone-400 text-xs pl-10">
              <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce [animation-delay:0.4s]"></span>
              <span>Consulting senior clinical nutrition guidelines...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="p-3 bg-white border-t border-stone-100 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
          <span className="text-[11px] font-bold text-stone-400 uppercase shrink-0">Try:</span>
          {[
            { label: 'Dysphagia / Soft Texture tips', query: 'How to adapt recipes for dysphagia and swallowing ease?' },
            { label: 'Out of stock at Sheng Siong?', query: 'What are good fish substitutes if Threadfin is out of stock at Sheng Siong?' },
            { label: 'Zero open flame safety', query: 'How to cook complete senior meals with no open gas flames?' },
            { label: 'Diabetic & Low GI adjustments', query: 'Adjust meals for diabetic senior blood sugar control' },
          ].map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt.query)}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs shrink-0 cursor-pointer"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-4 border-t border-stone-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about senior dietary requirements, textures, or prep..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-emerald-900 text-white disabled:opacity-40 hover:bg-emerald-950 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-stone-400 mt-2 text-center">
            Frontend UI mock ready for your serverless backend Gemini API integration.
          </p>
        </div>

      </div>
    </div>
  );
};
