import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Newspaper, ExternalLink } from 'lucide-react';
import { articleData, languages } from '../data/content';

export default function Articles() {
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articleData.filter((item) => {
    const matchLang = selectedLang === 'all' || item.language === selectedLang;
    const matchSearch = !searchQuery || item.title.includes(searchQuery) || item.tags.some((t) => t.includes(searchQuery));
    return matchLang && matchSearch;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">杂志文章</h1>
        <p className="text-slate-600">The Economist · 朝日新聞 · Le Monde · 한겨레 等权威媒体文章，附官方翻译与标注</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedLang('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedLang === 'all' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          全部
        </button>
        {languages.filter((l) => articleData.some((a) => a.language === l.code)).map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedLang === lang.code ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {lang.flag} {lang.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((article) => {
          const lang = languages.find((l) => l.code === article.language);
          return (
            <Link
              key={article.id}
              to={`/reader/${article.id}`}
              className="group block bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{lang?.flag}</span>
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{article.source}</span>
                  <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">{article.difficulty}</span>
                  <span className="text-xs text-slate-400">{article.publishedAt}</span>
                  <span className="text-xs text-slate-400">by {article.author}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors">{article.title}</h2>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                  {article.content.find((b) => b.type === 'text')?.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-slate-50 rounded text-slate-500">#{tag}</span>
                    ))}
                  </div>
                  <span className="text-xs text-purple-500 font-medium flex items-center gap-1">
                    阅读全文 <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
