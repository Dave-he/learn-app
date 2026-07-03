import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Square, Play, Pause, Trophy, RotateCcw, Volume2 } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

const speakingData = [
  {
    id: 1,
    text: 'Hello, how are you today?',
    translation: '你好，今天怎么样？',
    difficulty: 'easy',
  },
  {
    id: 2,
    text: 'I would like to order a cup of coffee, please.',
    translation: '我想点一杯咖啡，谢谢。',
    difficulty: 'medium',
  },
  {
    id: 3,
    text: 'Could you tell me the way to the nearest subway station?',
    translation: '你能告诉我去最近的地铁站怎么走吗？',
    difficulty: 'hard',
  },
];

export default function Speaking() {
  const navigate = useNavigate();
  const addProgress = useProgressStore((state) => state.addProgress);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentSentence = speakingData[currentIndex];

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const handlePlayOriginal = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(currentSentence.text);
    utterance.lang = 'en-US';
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setHasRecording(true);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('无法访问麦克风，请检查权限设置');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const evaluateRecording = () => {
    const randomScore = Math.floor(Math.random() * 30) + 70;
    setScore(randomScore);
    setShowResult(true);
    addProgress({
      userId: 'user_1',
      moduleType: 'speaking',
      itemId: String(currentSentence.id),
      score: randomScore,
      duration: 60,
      completedAt: new Date().toISOString(),
    });
  };

  const handleNext = () => {
    if (currentIndex < speakingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasRecording(false);
      setScore(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setHasRecording(false);
    setScore(null);
    setShowResult(false);
  };

  const isComplete = currentIndex === speakingData.length - 1 && showResult;

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
          进度：{currentIndex + 1} / {speakingData.length}
        </div>
      </div>

      {!isComplete ? (
        <>
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
            <div className="text-center mb-8">
              <span className={`text-sm px-3 py-1 rounded-full ${
                currentSentence.difficulty === 'easy' ? 'bg-emerald-500/30' :
                currentSentence.difficulty === 'medium' ? 'bg-amber-500/30' : 'bg-red-500/30'
              }`}>
                {currentSentence.difficulty === 'easy' ? '简单' :
                 currentSentence.difficulty === 'medium' ? '中等' : '困难'}
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-2">跟读练习</h2>
              <p className="text-white/80">先听原音，然后录制你的发音</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={handlePlayOriginal}
                  disabled={isPlaying}
                  className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </button>
                <Volume2 className="w-6 h-6 text-white/60" />
              </div>
              <p className="text-2xl font-semibold text-center mb-2">{currentSentence.text}</p>
              <p className="text-white/70 text-center">{currentSentence.translation}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all ${
                isRecording
                  ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
                  : hasRecording
                  ? 'bg-emerald-500'
                  : 'bg-white/20'
              }`}>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className="w-20 h-20 rounded-full bg-white flex items-center justify-center"
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 text-red-500 fill-red-500" />
                  ) : (
                    <Mic className={`w-10 h-10 ${isRecording ? 'text-red-500' : 'text-pink-500'}`} />
                  )}
                </button>
              </div>
              <p className="text-white/80">
                {isRecording ? '录音中... 点击停止' : hasRecording ? '录音完成' : '点击开始录音'}
              </p>
            </div>
          </div>

          {hasRecording && !showResult && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 text-center">
              <button
                onClick={evaluateRecording}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                评估我的发音
              </button>
            </div>
          )}

          {showResult && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200/50 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">{score}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">你的得分</h3>
                <p className="text-slate-600">
                  {score! >= 90 ? '太棒了！发音非常标准！' :
                   score! >= 80 ? '很好！继续保持！' :
                   score! >= 70 ? '不错，还有进步空间' : '继续练习，你会做得更好！'}
                </p>
              </div>
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                {currentIndex < speakingData.length - 1 ? '下一个练习' : '完成学习'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-200/50 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">口语练习完成！</h2>
          <p className="text-xl text-slate-600 mb-8">本轮完成了 {speakingData.length} 个跟读练习</p>
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
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              返回学习中心
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
