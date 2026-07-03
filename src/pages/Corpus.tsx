import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen } from 'lucide-react';
import { corpusData, languages } from '../data/content';

export default function Corpus() {
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = corpusData.filter((item) => {
    const matchLang = selectedLang === 'all' || item.language === selectedLang;
    const matchSearch = !searchQuery || item.title.includes(searchQuery) || item.original.includes(searchQuery) || item.translation.includes(searchQuery);
    return matchLang && matchSearch;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">语料库</h1>
        <p className="text-slate-600">官方翻译·词汇标注·多语种学习语料</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索语料（原文、翻译、标题）..."
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
          全部语种
        </button>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedLang === lang.code ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {lang.flag} {lang.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const lang = languages.find((l) => l.code === item.language);
          return (
            <Link
              key={item.id}
              to={`/reader/${item.id}`}
              className="group p-5 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{lang?.flag}</span>
                <span className="text-xs font-medium text-slate-500">{lang?.label}</span>
                <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">{item.difficulty}</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-50 rounded-full text-emerald-700">{item.category}</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2 mb-2">{item.original}</p>
              <p className="text-xs text-slate-500 line-clamp-1">📖 {item.translation}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-slate-50 rounded text-slate-500">#{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  {item.annotations.length} 标注
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">没有找到匹配的语料</p>
        </div>
      )}
    </div>
  );
}
