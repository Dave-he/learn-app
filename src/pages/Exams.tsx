import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, CheckCircle, XCircle } from 'lucide-react';
import { examData, languages } from '../data/content';

export default function Exams() {
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  const filtered = examData.filter((item) => {
    const matchLang = selectedLang === 'all' || item.language === selectedLang;
    const matchExam = !selectedExam || item.examType === selectedExam;
    return matchLang && matchExam;
  });

  const examTypes = [...new Set(examData.map((e) => e.examType))];

  const toggleAnswer = (qId: string) => {
    setShowAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">历年真题</h1>
        <p className="text-slate-600">TOEFL · IELTS · JLPT · TOPIK · DELF · 歌德 等考试真题及解析</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setSelectedLang('all'); setSelectedExam(null); }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedLang === 'all' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          全部语种
        </button>
        {languages.filter((l) => examData.some((e) => e.language === l.code)).map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setSelectedLang(lang.code); setSelectedExam(null); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedLang === lang.code ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {lang.flag} {lang.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedExam(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${!selectedExam ? 'bg-blue-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          全部考试
        </button>
        {examTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedExam(type)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedExam === type ? 'bg-blue-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((exam) => {
          const lang = languages.find((l) => l.code === exam.language);
          return (
            <div key={exam.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{lang?.flag}</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{exam.examType}</span>
                  <span className="text-xs text-slate-500">{exam.year}年</span>
                  <span className="text-xs text-slate-400">来源：{exam.source}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-800">{exam.title}</h2>
              </div>

              {exam.sections.map((section, si) => (
                <div key={si} className="p-5">
                  <h3 className="font-semibold text-slate-700 mb-4 text-sm">{section.title}</h3>
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
                              <div
                                key={oi}
                                className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${
                                  showAnswers[q.id] && opt === q.answer
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-white text-slate-700 border border-slate-200'
                                }`}
                              >
                                <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                  {String.fromCharCode(65 + oi)}
                                </span>
                                {opt}
                                {showAnswers[q.id] && opt === q.answer && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto" />}
                              </div>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className="text-xs text-emerald-600 font-medium hover:text-emerald-700"
                        >
                          {showAnswers[q.id] ? '隐藏解析' : '查看答案与解析'}
                        </button>

                        {showAnswers[q.id] && (
                          <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <p className="text-sm text-emerald-800 font-medium mb-1">答案：{q.answer}</p>
                            <p className="text-sm text-emerald-700">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
