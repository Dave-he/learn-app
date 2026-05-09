import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import {
  BookOpen,
  Mic,
  Headphones,
  PenTool,
  Trophy,
  Flame,
  Target,
  TrendingUp,
  ChevronRight,
  Zap,
} from 'lucide-react';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { totalXp, level, currentStreak, modulesProgress, getWeeklyData } = useProgressStore();
  const weeklyData = getWeeklyData();

  const languageColors = {
    english: 'from-blue-500 to-cyan-500',
    japanese: 'from-red-500 to-pink-500',
    korean: 'from-purple-500 to-indigo-500',
  };

  const languageLabels = {
    english: '英语',
    japanese: '日语',
    korean: '韩语',
  };

  const languageFlags = {
    english: '🇺🇸',
    japanese: '🇯🇵',
    korean: '🇰🇷',
  };

  const learningModules = [
    {
      path: '/learn/vocabulary',
      icon: BookOpen,
      title: '单词记忆',
      description: '闪卡学习，科学复习',
      color: 'indigo',
      progress: modulesProgress.vocabulary,
    },
    {
      path: '/learn/grammar',
      icon: PenTool,
      title: '语法练习',
      description: '互动教程，即时反馈',
      color: 'purple',
      progress: modulesProgress.grammar,
    },
    {
      path: '/learn/speaking',
      icon: Mic,
      title: '口语跟读',
      description: '录音对比，AI评分',
      color: 'pink',
      progress: modulesProgress.speaking,
    },
    {
      path: '/learn/listening',
      icon: Headphones,
      title: '听力训练',
      description: '多倍速听，精听练习',
      color: 'amber',
      progress: modulesProgress.listening,
    },
  ];

  const recommendedCourses = [
    {
      id: '1',
      title: '日常英语口语入门',
      level: 'A1-A2',
      progress: 35,
      language: 'english',
    },
    {
      id: '2',
      title: '日语五十音图详解',
      level: '入门',
      progress: 60,
      language: 'japanese',
    },
    {
      id: '3',
      title: '韩语发音基础',
      level: '入门',
      progress: 20,
      language: 'korean',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            你好，{user?.nickname || '学习者'} 👋
          </h1>
          <p className="text-slate-600">
            继续学习，保持你的学习热情！
          </p>
        </div>
        <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${languageColors[user?.targetLanguage || 'english']} text-white flex items-center gap-2`}>
          <span className="text-xl">{languageFlags[user?.targetLanguage || 'english']}</span>
          <span className="font-semibold">{languageLabels[user?.targetLanguage || 'english']}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Lv.{level}</span>
          </div>
          <p className="text-3xl font-bold mb-1">{totalXp.toLocaleString()}</p>
          <p className="text-white/80 text-sm">总经验值</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{currentStreak}</p>
          <p className="text-white/80 text-sm">连续学习天数</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">5</p>
          <p className="text-white/80 text-sm">今日目标（个）</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">12</p>
          <p className="text-white/80 text-sm">本周学习（小时）</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h2 className="text-xl font-bold text-slate-800 mb-6">学习模块</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {learningModules.map((module) => {
                const Icon = module.icon;
                return (
                  <Link
                    key={module.path}
                    to={module.path}
                    className="group bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${module.color}-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${module.color}-500`} />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">{module.title}</h3>
                    <p className="text-xs text-slate-500 mb-3">{module.description}</p>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r from-${module.color}-500 to-${module.color}-600 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{module.progress}% 完成</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">本周学习数据</h2>
              <Link to="/progress" className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center gap-1">
                查看详情
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['一', '二', '三', '四', '五', '六', '日'].map((day, index) => (
                <div key={day} className="text-center">
                  <p className="text-xs text-slate-500 mb-2">{day}</p>
                  <div
                    className={`h-24 rounded-lg flex items-end justify-center p-1 ${
                      weeklyData[index]?.minutes > 0
                        ? 'bg-gradient-to-t from-indigo-500 to-indigo-400'
                        : 'bg-slate-100'
                    }`}
                    style={{ height: `${Math.max(20, (weeklyData[index]?.minutes || 0) * 2)}px` }}
                  >
                    {weeklyData[index]?.minutes > 0 && (
                      <span className="text-white text-xs font-medium mb-1">{weeklyData[index].minutes}m</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6" />
              <h3 className="font-bold">每日目标</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">学习 10 个单词</span>
                <span className="text-sm font-bold">7/10</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-white/80 text-sm">完成所有目标获得 50 XP</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h3 className="font-bold text-slate-800 mb-4">推荐课程</h3>
            <div className="space-y-3">
              {recommendedCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${languageColors[course.language as keyof typeof languageColors]} flex items-center justify-center text-lg`}>
                    {languageFlags[course.language as keyof typeof languageFlags]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-sm">{course.title}</p>
                    <p className="text-xs text-slate-500">{course.level}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </Link>
              ))}
            </div>
            <Link
              to="/courses"
              className="mt-4 w-full py-2 text-center text-indigo-600 font-medium bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors block"
            >
              查看全部课程
            </Link>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              最新成就
            </h3>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl">
                🔥
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">连续学习 7 天</p>
                <p className="text-xs text-slate-500">今天达成</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
