import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, RotateCcw, Check, X, Trophy } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

const vocabularyData = [
  {
    id: 1,
    word: 'abundant',
    phonetic: '/əˈbʌndənt/',
    translation: '丰富的；充裕的',
    example: 'The region has abundant natural resources.',
    meaning: '这个地区有丰富的自然资源。',
  },
  {
    id: 2,
    word: 'catalyst',
    phonetic: '/ˈkætəlɪst/',
    translation: '催化剂；促进因素',
    example: 'Technology was a catalyst for social change.',
    meaning: '技术是社会变革的推动力。',
  },
  {
    id: 3,
    word: 'diligent',
    phonetic: '/ˈdɪlɪdʒənt/',
    translation: '勤勉的；刻苦的',
    example: 'She is a diligent student who always completes her homework.',
    meaning: '她是一个勤奋的学生，总是完成作业。',
  },
  {
    id: 4,
    word: 'eloquent',
    phonetic: '/ˈeləkwənt/',
    translation: '雄辩的；有说服力的',
    example: 'He gave an eloquent speech at the conference.',
    meaning: '他在会议上发表了一篇雄辩的演讲。',
  },
  {
    id: 5,
    word: 'feasible',
    phonetic: '/ˈfiːzəbl/',
    translation: '可行的；可能的',
    example: 'Is it feasible to complete the project by next month?',
    meaning: '下个月完成这个项目可行吗？',
  },
];

export default function Vocabulary() {
  const navigate = useNavigate();
  const addProgress = useProgressStore((state) => state.addProgress);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentWord = vocabularyData[currentIndex];
  const options = [
    currentWord.translation,
    '灵活的；易变的',
    '沉默的；寡言的',
    '粗糙的；粗略的',
  ].sort(() => Math.random() - 0.5);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (answer: string, index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = answer === currentWord.translation;
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
    addProgress({
      userId: 'user_1',
      moduleType: 'vocabulary',
      itemId: String(currentWord.id),
      score: isCorrect ? 100 : 0,
      duration: 30,
      completedAt: new Date().toISOString(),
    });
  };

  const handleNext = () => {
    if (currentIndex < vocabularyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowResult(false);
    setCorrectCount(0);
    setSelectedAnswer(null);
  };

  const isComplete = currentIndex === vocabularyData.length - 1 && showResult;

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
          进度：{currentIndex + 1} / {vocabularyData.length}
        </div>
      </div>

      {!isComplete ? (
        <>
          <div
            onClick={handleFlip}
            className={`relative h-96 mb-8 cursor-pointer perspective-1000 ${isFlipped ? 'flipped' : ''}`}
          >
            <div className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex flex-col items-center justify-center p-12 text-white shadow-2xl">
                <h2 className="text-6xl font-bold mb-4">{currentWord.word}</h2>
                <p className="text-2xl text-white/80 mb-8">{currentWord.phonetic}</p>
                <button className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Volume2 className="w-8 h-8" />
                </button>
                <p className="mt-8 text-white/60">点击卡片查看释义</p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl flex flex-col items-center justify-center p-12 text-white shadow-2xl rotate-y-180">
                <h3 className="text-3xl font-bold mb-4">释义</h3>
                <p className="text-4xl font-bold mb-8">{currentWord.translation}</p>
                <div className="w-full bg-white/20 rounded-2xl p-6">
                  <p className="text-lg mb-2 opacity-80">例句：</p>
                  <p className="text-xl italic mb-4">{currentWord.example}</p>
                  <p className="text-lg opacity-80">中文：</p>
                  <p className="text-xl">{currentWord.meaning}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">选择正确释义</h3>
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(option, index)}
                  disabled={showResult}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    showResult
                      ? option === currentWord.translation
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-slate-200 text-slate-600'
                      : 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                  {currentIndex < vocabularyData.length - 1 ? (
                    <>
                      下一个
                      <RotateCcw className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      完成学习
                      <Trophy className="w-4 h-4" />
                    </>
                  )}
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
          <h2 className="text-3xl font-bold text-slate-800 mb-4">学习完成！</h2>
          <p className="text-xl text-slate-600 mb-8">
            本轮学习了 {vocabularyData.length} 个单词
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-emerald-600">{correctCount}</p>
              <p className="text-slate-600">正确</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-red-600">{vocabularyData.length - correctCount}</p>
              <p className="text-slate-600">错误</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-indigo-600">
                {Math.round((correctCount / vocabularyData.length) * 100)}%
              </p>
              <p className="text-slate-600">正确率</p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              再学一遍
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
