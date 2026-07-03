import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, FileText, Newspaper, ExternalLink } from 'lucide-react';
import { corpusData, examData, articleData, languages } from '../data/content';

type SearchResult = {
  id: string;
  type: 'corpus' | 'exam' | 'article';
  language: string;
  title: string;
  snippet: string;
  source: string;
  tags: string[];
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const allResults: SearchResult[] = [
    ...corpusData.map((c) => ({
      id: c.id,
      type: 'corpus' as const,
      language: c.language,
      title: c.title,
      snippet: `${c.original}\n${c.translation}`,
      source: c.source,
      tags: c.tags,
    })),
    ...examData.map((e) => ({
      id: e.id,
      type: 'exam' as const,
      language: e.language,
      title: e.title,
      snippet: e.sections.flatMap((s) => s.questions.map((q) => q.question)).join(' '),
      source: e.source,
      tags: [e.examType, e.year],
    })),
    ...articleData.map((a) => ({
      id: a.id,
      type: 'article' as const,
      language: a.language,
      title: a.title,
      snippet: a.content.filter((b) => b.type === 'text').map((b) => b.content).join(' '),
      source: a.source,
      tags: a.tags,
    })),
  ];

  const filtered = allResults.filter((item) => {
    const matchType = selectedType === 'all' || item.type === selectedType;
    const q = query.toLowerCase();
    const matchQuery = !query || item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q) || item.tags.some((t) => t.toLowerCase().includes(q));
    return matchType && matchQuery;
  });

  const typeIcons = { corpus: BookOpen, exam: FileText, article: Newspaper };
  const typeLabels = { corpus: '语料', exam: '真题', article: '文章' };
  const typeColors = { corpus: 'emerald', exam: 'blue', article: 'purple' };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">内容搜索</h1>
        <p className="text-slate-600">聚合全网学习资源，一键搜索语料、真题、文章</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="输入关键词搜索（支持原文、翻译、标签）..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            autoFocus
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'corpus', 'exam', 'article'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === type
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {type === 'all' ? '全部' : typeLabels[type]} ({type === 'all' ? allResults.length : allResults.filter((r) => r.type === type).length})
            </button>
          ))}
        </div>
      </div>

      {query && (
        <p className="text-sm text-slate-500 mb-4">找到 {filtered.length} 条结果</p>
      )}

      <div className="space-y-3">
        {filtered.map((item) => {
          const Icon = typeIcons[item.type];
          const color = typeColors[item.type];
          const lang = languages.find((l) => l.code === item.language);
          return (
            <Link
              key={`${item.type}-${item.id}`}
              to={`/reader/${item.id}`}
              className="group block p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg bg-${color}-100 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 text-${color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{lang?.flag}</span>
                    <span className={`text-xs font-medium text-${color}-600 bg-${color}-50 px-2 py-0.5 rounded`}>{typeLabels[item.type]}</span>
                    <span className="text-xs text-slate-400">{item.source}</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.snippet}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 bg-slate-50 rounded text-slate-500">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {!query && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">输入关键词开始搜索</p>
          <p className="text-sm text-slate-400 mt-1">支持搜索语料、真题、文章的原文、翻译和标签</p>
        </div>
      )}

      {query && filtered.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">没有找到匹配的内容</p>
        </div>
      )}
    </div>
  );
}
