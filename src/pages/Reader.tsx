import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Newspaper, Volume2, Tag } from 'lucide-react';
import { corpusData, examData, articleData, languages } from '../data/content';

export default function Reader() {
  const { id } = useParams();

  const corpus = corpusData.find((c) => c.id === id);
  const exam = examData.find((e) => e.id === id);
  const article = articleData.find((a) => a.id === id);

  if (corpus) return <CorpusReader item={corpus} />;
  if (exam) return <ExamReader item={exam} />;
  if (article) return <ArticleReader item={article} />;

  return (
    <div className="max-w-[960px] mx-auto px-6 py-8 text-center">
      <p className="text-slate-500">内容未找到</p>
      <Link to="/" className="text-emerald-600 mt-4 inline-block">返回首页</Link>
    </div>
  );
}

function CorpusReader({ item }: { item: typeof corpusData[0] }) {
  const lang = languages.find((l) => l.code === item.language);
  return (
    <div className="max-w-[960px] mx-auto px-6 py-8">
      <Link to="/corpus" className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> 返回语料库
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{lang?.flag}</span>
            <span className="text-xs font-medium text-slate-500">{lang?.label}</span>
            <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">{item.difficulty}</span>
            <span className="text-xs px-2 py-0.5 bg-emerald-50 rounded-full text-emerald-700">{item.category}</span>
            <span className="text-xs text-slate-400">来源：{item.source}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{item.title}</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200">
            <h3 className="text-sm font-semibold text-emerald-800 mb-3">原文</h3>
            <p className="text-lg text-slate-800 leading-relaxed">{item.original}</p>
          </div>

          <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-800 mb-3">官方翻译</h3>
            <p className="text-lg text-slate-800 leading-relaxed">{item.translation}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              词汇标注 ({item.annotations.length})
            </h3>
            <div className="space-y-3">
              {item.annotations.map((ann, i) => (
                <div key={i} className="p-4 bg-white rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-emerald-700">{ann.word}</span>
                    <span className="text-sm text-slate-500">{ann.phonetic}</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-1">释义：{ann.meaning}</p>
                  {ann.grammar && <p className="text-xs text-slate-500">语法：{ann.grammar}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 bg-slate-100 rounded-full text-slate-600">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamReader({ item }: { item: typeof examData[0] }) {
  const lang = languages.find((l) => l.code === item.language);
  return (
    <div className="max-w-[960px] mx-auto px-6 py-8">
      <Link to="/exams" className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> 返回真题列表
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{lang?.flag}</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{item.examType}</span>
            <span className="text-xs text-slate-500">{item.year}年</span>
            <span className="text-xs text-slate-400">来源：{item.source}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{item.title}</h1>
        </div>

        <div className="p-6 space-y-6">
          {item.sections.map((section, si) => (
            <div key={si}>
              <h2 className="text-lg font-bold text-slate-800 mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.questions.map((q) => (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-lg">
                    {q.original && (
                      <div className="mb-3 p-3 bg-white rounded-lg border border-slate-200">
                        <p className="text-sm text-slate-700 italic">{q.original}</p>
                        {q.translation && <p className="text-xs text-slate-500 mt-1">📖 {q.translation}</p>}
                      </div>
                    )}
                    <p className="text-sm font-medium text-slate-800 mb-3 whitespace-pre-line">{q.question}</p>
                    {q.options && (
                      <div className="space-y-2 mb-3">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${opt === q.answer ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-white text-slate-700 border border-slate-200'}`}>
                            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium">{String.fromCharCode(65 + oi)}</span>
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <p className="text-sm text-emerald-800 font-medium mb-1">答案：{q.answer}</p>
                      <p className="text-sm text-emerald-700">{q.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArticleReader({ item }: { item: typeof articleData[0] }) {
  const lang = languages.find((l) => l.code === item.language);
  return (
    <div className="max-w-[960px] mx-auto px-6 py-8">
      <Link to="/articles" className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> 返回文章列表
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{lang?.flag}</span>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{item.source}</span>
            <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">{item.difficulty}</span>
            <span className="text-xs text-slate-400">{item.publishedAt} · {item.author}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{item.title}</h1>
        </div>

        <div className="p-6 space-y-4">
          {item.content.map((block, i) => {
            if (block.type === 'text') {
              return <p key={i} className="text-base text-slate-800 leading-relaxed">{block.content}</p>;
            }
            if (block.type === 'annotation' && block.annotation) {
              return (
                <div key={i} className="inline-flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="font-bold text-amber-800">{block.content}</span>
                  <span className="text-xs text-amber-600">{block.annotation.phonetic}</span>
                  <span className="text-sm text-amber-700">— {block.annotation.meaning}</span>
                  {block.annotation.grammar && <span className="text-xs text-amber-500">({block.annotation.grammar})</span>}
                </div>
              );
            }
            if (block.type === 'translation') {
              return (
                <div key={i} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-800 mb-1">中文翻译</p>
                  <p className="text-base text-slate-800 leading-relaxed">{block.content}</p>
                </div>
              );
            }
            return null;
          })}

          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 bg-slate-100 rounded-full text-slate-600">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
