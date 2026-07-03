import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Trophy, Volume2, CheckCircle, XCircle } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

const listeningData = [
  {
    id: 1,
    title: '日常对话：问路',
    audio: 'wizard-of-oz',
    transcript: 'Excuse me, could you tell me how to get to the nearest subway station?',
    translation: '打扰一下，你能告诉我最近的地铁站在哪里吗？',
    question: '问路人要去哪里？',
    options: ['最近的地铁站', '最近的公交站', '最近的医院', '最近的学校'],
    correct: 0,
  },
  {
    id: 2,
    title: '餐厅对话：点餐',
    audio: 'shining',
    transcript: 'I would like to order the grilled salmon with vegetables, please.',
    translation: '我想点烤三文鱼配蔬菜，谢谢。',
    question: '这位顾客点了什么？',
    options: ['烤牛排', '烤三文鱼配蔬菜', '炸鸡配薯条', '海鲜意面'],
    correct: 1,
  },
  {
    id: 3,
    title: '电话对话：预约',
    audio: 'taxi-driver',
    transcript: 'Hello, I would like to make a reservation for two people at 7 PM this Saturday.',
    translation: '你好，我想预订这个星期六晚上7点两位。',
    question: '预约了几个人？',
    options: ['一位', '两位', '三位', '四位'],
    correct: 1,
  },
];

export default function Listening() {
  const navigate = useNavigate();
  const addProgress = useProgressStore((state) => state.addProgress);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentExercise = listeningData[currentIndex];

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    utteranceRef.current = new SpeechSynthesisUtterance(currentExercise.transcript);
    utteranceRef.current.lang = 'en-US';
    utteranceRef.current.rate = playbackSpeed;
    utteranceRef.current.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    speechSynthesis.speak(utteranceRef.current);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      speechSynthesis.cancel();
      utteranceRef.current = new SpeechSynthesisUtterance(currentExercise.transcript);
      utteranceRef.current.lang = 'en-US';
      utteranceRef.current.rate = speed;
      utteranceRef.current.onend = () => setIsPlaying(false);
      setIsPlaying(true);
      speechSynthesis.speak(utteranceRef.current);
    }
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === currentExercise.correct;
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
    addProgress({
      userId: 'user_1',
      moduleType: 'listening',
      itemId: String(currentExercise.id),
      score: isCorrect ? 100 : 0,
      duration: 60,
      completedAt: new Date().toISOString(),
    });
  };

  const handleNext = () => {
    if (currentIndex < listeningData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
  };

  const isComplete = currentIndex === listeningData.length - 1 && showResult;

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
          进度：{currentIndex + 1} / {listeningData.length}
        </div>
      </div>

      {!isComplete ? (
        <>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
            <div className="text-center mb-8">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">听力练习</span>
              <h2 className="text-3xl font-bold mt-4">{currentExercise.title}</h2>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={handlePlay}
                  className="p-5 bg-white text-amber-600 rounded-full hover:bg-amber-50 transition-colors shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </button>
                <Volume2 className="w-6 h-6 text-white/70" />
              </div>

              <p className="text-xl text-center mb-4 italic">"{currentExercise.transcript}"</p>
              <p className="text-white/70 text-center">{currentExercise.translation}</p>
            </div>

            <div className="flex justify-center gap-2">
              {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    playbackSpeed === speed
                      ? 'bg-white text-amber-600'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50">
            <h3 className="text-xl font-bold text-slate-800 mb-6">{currentExercise.question}</h3>

            <div className="space-y-3">
              {currentExercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                    showResult
                      ? index === currentExercise.correct
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-slate-200 text-slate-600'
                      : 'border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-slate-800'
                  }`}
                >
                  <span className="text-lg">{option}</span>
                  {showResult && (
                    index === currentExercise.correct ? (
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
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                >
                  {currentIndex < listeningData.length - 1 ? '下一个练习' : '完成学习'}
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
          <h2 className="text-3xl font-bold text-slate-800 mb-4">听力练习完成！</h2>
          <p className="text-xl text-slate-600 mb-8">本轮完成了 {listeningData.length} 个听力练习</p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-emerald-600">{correctCount}</p>
              <p className="text-slate-600">正确</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-red-600">{listeningData.length - correctCount}</p>
              <p className="text-slate-600">错误</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-600">
                {Math.round((correctCount / listeningData.length) * 100)}%
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
              再练一遍
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              返回学习中心
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
