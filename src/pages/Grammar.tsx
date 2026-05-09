import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

const grammarData = [
  {
    id: 1,
    title: '一般现在时',
    description: '表示经常发生的动作或存在的状态',
    rules: [
      '主语 + 动词原形 (+s/es)',
      'He works every day.',
      'She likes coffee.',
    ],
    exercise: {
      question: '我每天早上喝咖啡。',
      options: ['I drinks coffee every morning.', 'I drink coffee every morning.', 'I drinking coffee every morning.'],
      correct: 1,
    },
  },
  {
    id: 2,
    title: '现在进行时',
    description: '表示正在进行的动作',
    rules: [
      '主语 + am/is/are + 动词-ing',
      'I am reading a book.',
      'She is cooking dinner.',
    ],
    exercise: {
      question: '他现在在打电话。',
      options: ['He is calling now.', 'He call now.', 'He is calls now.'],
      correct: 0,
    },
  },
  {
    id: 3,
    title: '一般过去时',
    description: '表示过去发生的动作或状态',
    rules: [
      '主语 + 动词过去式',
      'I visited Paris last year.',
      'She watched a movie yesterday.',
    ],
    exercise: {
      question: '他们昨天去了学校。',
      options: ['They go to school yesterday.', 'They goed to school yesterday.', 'They went to school yesterday.'],
      correct: 2,
    },
  },
];

export default function Grammar() {
  const navigate = useNavigate();
  const addProgress = useProgressStore((state) => state.addProgress);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const currentGrammar = grammarData[currentIndex];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === currentGrammar.exercise.correct;
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
    addProgress({
      userId: 'user_1',
      moduleType: 'grammar',
      itemId: String(currentGrammar.id),
      score: isCorrect ? 100 : 0,
      duration: 45,
      completedAt: new Date().toISOString(),
    });
  };

  const handleNext = () => {
    if (currentIndex < grammarData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowRules(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setShowRules(false);
  };

  const isComplete = currentIndex === grammarData.length - 1 && showResult;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回学习中心
        </button>
        <div className="text-sm text-slate-600">
          进度：{currentIndex + 1} / {grammarData.length}
        </div>
      </div>

      {!isComplete ? (
        <>
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">语法点</span>
                <h2 className="text-3xl font-bold mt-3">{currentGrammar.title}</h2>
                <p className="text-white/80 mt-2">{currentGrammar.description}</p>
              </div>
              <button
                onClick={() => setShowRules(!showRules)}
                className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
              >
                <Lightbulb className="w-6 h-6" />
              </button>
            </div>

            {showRules && (
              <div className="mt-6 bg-white/10 rounded-2xl p-6 backdrop-blur">
                <h3 className="font-bold mb-3">语法规则</h3>
                <ul className="space-y-2">
                  {currentGrammar.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className={index === 0 ? 'font-semibold' : ''}>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              请将以下句子翻译成英文：
            </h3>
            <p className="text-2xl text-slate-700 mb-8 font-medium">
              {currentGrammar.exercise.question}
            </p>

            <div className="space-y-3">
              {currentGrammar.exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                    showResult
                      ? index === currentGrammar.exercise.correct
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-slate-200 text-slate-600'
                      : 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-800'
                  }`}
                >
                  <span className="text-lg">{option}</span>
                  {showResult && (
                    index === currentGrammar.exercise.correct ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : selectedAnswer === index ? (
                      <XCircle className="w-6 h-6 text-red-500" />
                    ) : null
                  )}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                  {currentIndex < grammarData.length - 1 ? '下一个练习' : '完成学习'}
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-200/50 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">语法练习完成！</h2>
          <p className="text-xl text-slate-600 mb-8">本轮完成了 {grammarData.length} 个语法练习</p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-emerald-600">{correctCount}</p>
              <p className="text-slate-600">正确</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-red-600">{grammarData.length - correctCount}</p>
              <p className="text-slate-600">错误</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-indigo-600">
                {Math.round((correctCount / grammarData.length) * 100)}%
              </p>
              <p className="text-slate-600">正确率</p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all"
            >
              再练一遍
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              返回学习中心
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
