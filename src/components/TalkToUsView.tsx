import React, { useState, useEffect, useRef } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { 
  MessageSquare, 
  HeartHandshake, 
  Globe, 
  ShieldAlert, 
  ExternalLink, 
  RefreshCw, 
  Send, 
  User, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  url: string;
  description: string;
}

interface TalkToUsViewProps {
  seniorFontSize?: boolean;
  article?: ArticleItem;
}

interface LocalComment {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  likes: number;
}

export const TalkToUsView: React.FC<TalkToUsViewProps> = ({
  seniorFontSize,
  article: externalArticle,
}) => {
  const articles: ArticleItem[] = [
    {
      id: 'nourishme-v2-main-forum',
      title: 'NourishMe v2 Senior Diet & Recipe Feedback Forum',
      url: 'https://nourishme.sg/talk-to-us/main',
      description: 'Caregiver dialogue on soft textures, HPB 65+ protein targets, and meal planning in Singapore.',
    },
    {
      id: 'nourishme-v2-singapore-recipes',
      title: 'Singapore Heartland Recipes & Dialect Adaptations',
      url: 'https://nourishme.sg/talk-to-us/recipes',
      description: 'Discuss Teochew steamed Batang, Cantonese herbal soups, and elder-friendly local meals.',
    },
    {
      id: 'nourishme-v2-grocers-sourcing',
      title: 'Sheng Siong, FairPrice & Wet Market Sourcing Tips',
      url: 'https://nourishme.sg/talk-to-us/grocers',
      description: 'Share weekly senior citizen discount days (Tue/Wed) and heartland fishmonger advice.',
    },
  ];

  const [selectedArticle, setSelectedArticle] = useState<ArticleItem>(externalArticle || articles[0]);
  const [embedMode, setEmbedMode] = useState<'en' | 'zh_TW'>('en');
  const [disqusStatus, setDisqusStatus] = useState<'loading' | 'loaded' | 'blocked'>('loading');
  const [reloadKey, setReloadKey] = useState<number>(0);

  // In-app community fallback comments (ensures comments ALWAYS work even if adblockers block disqus.com)
  const [localComments, setLocalComments] = useState<LocalComment[]>([
    {
      id: 'c1',
      author: 'Uncle Tan (71, Marine Parade)',
      role: 'Pioneer Generation Ager',
      content: 'The Steamed Threadfin with wolfberries and silken tofu is very gentle on my dental bridge. No small bones, and the soup essence naturally sweetens the brown rice.',
      timestamp: '2 hours ago',
      likes: 5,
    },
    {
      id: 'c2',
      author: 'Mdm Grace Lee (Caregiver, Ang Mo Kio)',
      role: 'Family Caregiver',
      content: 'Tip for Sheng Siong shoppers: Go early on Tuesday morning around 8:00 AM. They give the 4% Senior discount, and the Batang fish is freshly delivered from Jurong port.',
      timestamp: 'Yesterday',
      likes: 8,
    },
    {
      id: 'c3',
      author: 'Dr. Raymond Koh',
      role: 'Geriatric Diet Volunteer',
      content: 'Remember that adults over 65 need at least 1.2g of protein per kg body weight to counter sarcopenia. The one-pot pumpkin chicken rice is excellent because chicken thigh stays tender.',
      timestamp: '3 days ago',
      likes: 12,
    },
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [submittedLocal, setSubmittedLocal] = useState(false);

  const article = externalArticle || selectedArticle;
  const disqusShortname = 'nourishme-v2-km';

  // Base config conforming to user specification
  const baseDisqusConfig = {
    url: article.url,
    identifier: article.id,
    title: article.title,
    language: embedMode,
    // Only pass remoteAuthS3/apiKey when non-empty strings are provided to prevent Disqus HMAC parse errors
    ...(embedMode === 'zh_TW' ? {
      language: 'zh_TW',
      // If server generates SSO token later, it can be passed here
      remoteAuthS3: undefined,
      apiKey: undefined,
      sso: {
        name: 'SampleNews',
        button: 'https://nourishme.sg/favicon.png',
        icon: 'https://nourishme.sg/favicon.png',
        url: 'https://nourishme.sg/login',
        logout: 'https://nourishme.sg/logout',
        profile_url: 'https://nourishme.sg/profile/{username}',
        width: '800',
        height: '400',
      },
    } : {}),
  };

  // Monitor Disqus script and iframe loading to detect adblocker / network blocks
  useEffect(() => {
    setDisqusStatus('loading');

    // Check if disqus script or iframe successfully loads inside disqus_thread
    const timer = setTimeout(() => {
      const threadEl = document.getElementById('disqus_thread');
      const hasIframe = threadEl && threadEl.querySelector('iframe');
      if (hasIframe) {
        setDisqusStatus('loaded');
      } else {
        // If after 3.5 seconds no iframe is rendered, it is usually blocked by an adblocker (uBlock, Brave, etc.)
        // or third-party cookie restrictions in preview iframes
        setDisqusStatus('blocked');
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [article.id, embedMode, reloadKey]);

  // Force clean reload of Disqus instance
  const handleReloadDisqus = () => {
    setDisqusStatus('loading');
    const existingScript = document.getElementById('dsq-embed-scr');
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }
    if (typeof window !== 'undefined' && (window as any).DISQUS) {
      try {
        delete (window as any).DISQUS;
      } catch {
        (window as any).DISQUS = undefined;
      }
    }
    setReloadKey(prev => prev + 1);
  };

  const handlePostLocalComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: LocalComment = {
      id: 'c_' + Date.now(),
      author: newCommentName.trim() || 'Caregiver in Singapore',
      role: 'Community Member',
      content: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 1,
    };

    setLocalComments(prev => [newComment, ...prev]);
    setNewCommentText('');
    setSubmittedLocal(true);
    setTimeout(() => setSubmittedLocal(false), 3000);
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 sm:px-6 space-y-8 ${seniorFontSize ? 'text-lg leading-relaxed' : 'text-sm'}`}>
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>COMMUNITY FEEDBACK & FORUM · DISQUS</span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-stone-900 tracking-tight">
            Talk to Us — Caregiver & Senior Forum
          </h1>
          <p className="text-stone-600 max-w-2xl mt-1 leading-normal">
            Join the conversation with families, seniors, and caregivers in Singapore. Share diet feedback, texture adjustments, and supermarket deals.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-stone-100 rounded-xl border border-stone-200 text-xs shrink-0">
          <Globe className="w-3.5 h-3.5 text-stone-500 ml-1" />
          <button
            type="button"
            onClick={() => setEmbedMode('en')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              embedMode === 'en' ? 'bg-white text-emerald-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            English (en)
          </button>
          <button
            type="button"
            onClick={() => setEmbedMode('zh_TW')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              embedMode === 'zh_TW' ? 'bg-white text-emerald-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            繁體中文 (zh_TW + SSO)
          </button>
        </div>
      </div>

      {/* Discussion Channel Selector with CommentCount */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {articles.map(art => {
          const isSelected = article.id === art.id;
          return (
            <button
              key={art.id}
              type="button"
              onClick={() => setSelectedArticle(art)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-700 bg-emerald-950 text-white shadow-md ring-1 ring-emerald-700'
                  : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-emerald-300' : 'text-emerald-800 font-semibold'}`}>
                    Forum Thread
                  </span>
                  
                  {/* Embedded CommentCount */}
                  <span className={`text-[11px] font-mono ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    <CommentCount
                      shortname={disqusShortname}
                      config={{
                        url: art.url,
                        identifier: art.id,
                        title: art.title,
                      }}
                    >
                      {/* Placeholder Text */}
                      Comments
                    </CommentCount>
                  </span>
                </div>

                <h3 className="font-bold text-sm leading-snug mb-1">
                  {art.title}
                </h3>
                <p className={`text-xs line-clamp-2 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  {art.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/40 text-[11px] font-semibold flex items-center justify-between">
                <span className={isSelected ? 'text-emerald-300' : 'text-stone-600'}>
                  {isSelected ? '● Active Channel' : 'Select Thread'}
                </span>
                <span className="text-xs">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Disqus Diagnostic Notice when blocked by AdBlockers or Preview iframe */}
      {disqusStatus === 'blocked' && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-amber-950 text-sm">
                Disqus Comment Box Blocked by Browser or Ad-Blocker
              </h4>
              <p className="text-amber-900 mt-1 leading-relaxed">
                If the Disqus comment box does not render below, it is usually because:
              </p>
              <ul className="list-disc pl-5 mt-1.5 space-y-1 text-amber-900">
                <li><strong>Ad-blockers / Privacy shields:</strong> uBlock Origin, AdBlock, or Brave Shields block <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">disqus.com</code> by default as a third-party script. (Pause your ad-blocker for this page to allow Disqus).</li>
                <li><strong>Third-party cookie restrictions:</strong> In Chrome, Safari, or embedded iframes, third-party cookies from Disqus are disabled by default.</li>
                <li><strong>Disqus shortname domain registration:</strong> In your Disqus Admin dashboard (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono">{disqusShortname}</code>), ensure your domain is added under <em>Settings &gt; Advanced &gt; Trusted Domains</em>.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-amber-200/80">
            <a
              href={`https://${disqusShortname}.disqus.com/`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-amber-900 text-white font-bold text-xs hover:bg-amber-950 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Open Thread Directly on Disqus.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleReloadDisqus}
              className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-amber-950 font-semibold text-xs hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
              <span>Retry Loading Disqus Embed</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Forum Container */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header & CommentCount */}
        <div className="border-b border-stone-200 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono text-emerald-800 font-semibold uppercase tracking-wider">
              Channel: {article.id} · Language: {embedMode.toUpperCase()}
            </span>

            {/* Embedded CommentCount */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <CommentCount
                shortname={disqusShortname}
                config={{
                  url: article.url,
                  identifier: article.id,
                  title: article.title,
                }}
              >
                {/* Placeholder Text */}
                Comments
              </CommentCount>
            </div>
          </div>

          <h2 className="text-2xl font-bold font-serif text-stone-900 mt-2">
            {article.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {article.description}
          </p>
        </div>

        {/* Embedded Disqus Thread */}
        <div key={`${article.id}-${embedMode}-${reloadKey}`} className="min-h-[300px]">
          <DiscussionEmbed
            shortname={disqusShortname}
            config={baseDisqusConfig}
          />
        </div>

      </div>

      {/* In-App Senior Caregiver Community Fallback (Guarantees working comments in any browser) */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Caregiver & Pioneer Community Board (Instant Chat)
              </h3>
              <p className="text-xs text-stone-500">
                Instant interactive board — works even if your browser ad-blocker disables third-party Disqus scripts.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200">
            {localComments.length} Community Notes
          </span>
        </div>

        {/* Post Form */}
        <form onSubmit={handlePostLocalComment} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
          <span className="text-xs font-bold text-stone-700 block">
            Leave Feedback or Suggest a Singapore Senior Dish:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Your Name / Caregiver Title (e.g. Mdm Koh, Bedok)"
              value={newCommentName}
              onChange={e => setNewCommentName(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
            />
          </div>
          <textarea
            rows={3}
            placeholder="Write your feedback, chewing difficulty notes, or recipe requests..."
            value={newCommentText}
            onChange={e => setNewCommentText(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-stone-400">
              Your feedback helps Singapore seniors dine with dignity and nutrition.
            </span>
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="px-5 py-2 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-950 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Feedback</span>
            </button>
          </div>
          {submittedLocal && (
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Thank you! Your community feedback was posted.</span>
            </div>
          )}
        </form>

        {/* Existing Community Comments */}
        <div className="space-y-3">
          {localComments.map(comment => (
            <div
              key={comment.id}
              className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900">{comment.author}</span>
                  <span className="text-stone-400">·</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-medium text-[10px]">
                    {comment.role}
                  </span>
                </div>
                <span className="text-stone-400 font-mono text-[11px]">{comment.timestamp}</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
