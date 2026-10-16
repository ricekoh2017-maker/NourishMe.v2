import React, { useState } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { MessageSquare, HeartHandshake, Sparkles, Send, ShieldCheck, Globe, ThumbsUp, HelpCircle } from 'lucide-react';

interface TalkToUsViewProps {
  seniorFontSize: boolean;
}

interface FeedbackTopic {
  id: string;
  title: string;
  chineseTitle: string;
  description: string;
  url: string;
}

const FEEDBACK_TOPICS: FeedbackTopic[] = [
  {
    id: 'nourishme-v2-general-feedback',
    title: 'General Senior Diet Feedback & Caregiver Experiences',
    chineseTitle: '长者饮食回馈与照护经验分享',
    description: 'Share your thoughts on meal planning for seniors above 65, portion sizes, or day-to-day nutrition challenges in Singapore.',
    url: typeof window !== 'undefined' ? `${window.location.origin}/talk-to-us/general` : 'https://nourishme.sg/talk-to-us/general',
  },
  {
    id: 'nourishme-v2-recipe-requests',
    title: 'Local Singapore Recipe Requests & Dialect Favorites',
    chineseTitle: '本地食谱建议与传统家常菜交流',
    description: 'Request traditional Teochew, Cantonese, Hainanese, Malay Halal, or Indian vegetarian senior-adapted recipes.',
    url: typeof window !== 'undefined' ? `${window.location.origin}/talk-to-us/recipes` : 'https://nourishme.sg/talk-to-us/recipes',
  },
  {
    id: 'nourishme-v2-grocer-tips',
    title: 'Sheng Siong, FairPrice & Wet Market Sourcing Tips',
    chineseTitle: '超市及巴刹新鲜食材采购心得',
    description: 'Post tips on fresh fish availability, Pioneer/Merdeka discount deals, and heartland wet market fishmonger recommendations.',
    url: typeof window !== 'undefined' ? `${window.location.origin}/talk-to-us/grocers` : 'https://nourishme.sg/talk-to-us/grocers',
  },
];

export const TalkToUsView: React.FC<TalkToUsViewProps> = ({ seniorFontSize }) => {
  const [selectedTopic, setSelectedTopic] = useState<FeedbackTopic>(FEEDBACK_TOPICS[0]);
  const [language, setLanguage] = useState<'en' | 'zh_TW'>('en');

  const disqusShortname = 'nourishme-v2-km';

  const disqusConfig = {
    url: selectedTopic.url,
    identifier: selectedTopic.id,
    title: selectedTopic.title,
    language: language,
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 sm:px-6 space-y-8 ${seniorFontSize ? 'text-lg leading-relaxed' : 'text-sm'}`}>
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>COMMUNITY DIALOGUE & FEEDBACK · DISQUS</span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-stone-900 tracking-tight">
            Talk to Us & Caregiver Community
          </h1>
          <p className="text-stone-600 max-w-2xl mt-1 leading-normal">
            We value your voice! Share recipes your elderly parents love, report difficulties with ingredient textures, or ask questions to the community.
          </p>
        </div>

        {/* Language Switcher for Disqus */}
        <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-xl border border-stone-200 text-xs shrink-0">
          <Globe className="w-3.5 h-3.5 text-stone-500 ml-1" />
          <span className="text-stone-500 text-[11px] font-semibold">Language:</span>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              language === 'en' ? 'bg-white text-emerald-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('zh_TW')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              language === 'zh_TW' ? 'bg-white text-emerald-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            中文 (繁體)
          </button>
        </div>
      </div>

      {/* Discussion Channel Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FEEDBACK_TOPICS.map(topic => {
          const isSelected = selectedTopic.id === topic.id;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopic(topic)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-700 bg-emerald-950 text-white shadow-md ring-1 ring-emerald-700'
                  : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[11px] font-semibold ${isSelected ? 'text-emerald-300' : 'text-emerald-800'}`}>
                    {topic.chineseTitle}
                  </span>
                  <div className={`text-[11px] font-mono ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    <CommentCount
                      shortname={disqusShortname}
                      config={{
                        url: topic.url,
                        identifier: topic.id,
                        title: topic.title,
                      }}
                    >
                      Comments
                    </CommentCount>
                  </div>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-1">
                  {topic.title}
                </h3>
                <p className={`text-xs line-clamp-2 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  {topic.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/40 text-[11px] font-semibold flex items-center justify-between">
                <span className={isSelected ? 'text-emerald-300' : 'text-stone-600'}>
                  {isSelected ? '● Active Channel' : 'Switch channel'}
                </span>
                <span className="text-xs">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Discussion Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Topic Header */}
        <div className="border-b border-stone-200 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-emerald-800 uppercase tracking-wider">
              Channel: {selectedTopic.chineseTitle}
            </span>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <CommentCount
                shortname={disqusShortname}
                config={disqusConfig}
              >
                Discussions
              </CommentCount>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-1">
            {selectedTopic.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {selectedTopic.description}
          </p>
        </div>

        {/* Embedded Disqus Thread */}
        <div className="min-h-[380px] disqus-thread-container">
          <DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>

      </div>

      {/* Community Guidelines & Direct Support Note */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <HeartHandshake className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-bold text-amber-950">
            SilverApron SG Community Kindness Policy
          </p>
          <p className="text-amber-900 mt-0.5">
            This space is dedicated to supporting seniors, Pioneer & Merdeka citizens, family members, and caregivers. Please share constructive advice regarding textures, dietary needs, low-sodium cooking tips, and grocery deals in Singapore.
          </p>
        </div>
      </div>

    </div>
  );
};
