import { useState } from 'react';
import { Download, FileText, Music, Video, BookOpen, Database, Search } from 'lucide-react';
import { resourceData, languages } from '../data/content';

export default function Resources() {
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const typeIcons = { pdf: FileText, audio: Music, video: Video, ebook: BookOpen, dataset: Database };
  const typeLabels = { pdf: 'PDF', audio: '音频', video: '视频', ebook: '电子书', dataset: '数据集' };

  const filtered = resourceData.filter((item) => {
    const matchLang = selectedLang === 'all' || item.language === selectedLang;
    const matchType = selectedType === 'all' || item.type === selectedType;
    const matchSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.some((t) => t.includes(searchQuery));
    return matchLang && matchType && matchSearch;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">学习资料</h1>
        <p className="text-slate-600">PDF · 音频 · 视频 · 电子书 · 数据集 — 免费下载</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索资料..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedLang('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedLang === 'all' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          全部语种
        </button>
        {languages.filter((l) => resourceData.some((r) => r.language === l.code)).map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedLang === lang.code ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {lang.flag} {lang.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedType === 'all' ? 'bg-indigo-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          全部类型
        </button>
        {(Object.keys(typeLabels) as Array<keyof typeof typeLabels>).map((type) => {
          const Icon = typeIcons[type];
          return (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${selectedType === type ? 'bg-indigo-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {typeLabels[type]}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const Icon = typeIcons[item.type];
          const lang = languages.find((l) => l.code === item.language);
          return (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{typeLabels[item.type]}</span>
                </div>
                <span className="text-sm">{lang?.flag}</span>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span>{item.size}</span>
                <span>来源：{item.source}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-slate-50 rounded text-slate-500">#{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400">{item.downloads.toLocaleString()} 次下载</span>
                <button className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> 下载
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
