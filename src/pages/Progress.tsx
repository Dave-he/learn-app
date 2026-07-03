import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, Flame, Target, Trophy, Calendar, BookOpen, Mic, Headphones, PenTool } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

export default function Progress() {
  const navigate = useNavigate();
  const { totalStudyTime, currentStreak, longestStreak, totalXp, level, modulesProgress, getWeeklyData } = useProgressStore();
  const weeklyData = getWeeklyData();

  const moduleIcons = {
    vocabulary: BookOpen,
    grammar: PenTool,
    speaking: Mic,
    listening: Headphones,
  };

  const moduleNames = {
    vocabulary: '单词记忆',
    grammar: '语法练习',
    speaking: '口语跟读',
    listening: '听力训练',
  };

  const moduleColors = {
    vocabulary: 'indigo',
    grammar: 'purple',
    speaking: 'pink',
    listening: 'amber',
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>
        <h1 className="text-3xl font-bold text-slate-800">学习进度</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{Math.floor(totalStudyTime / 60)}h</p>
          <p className="text-white/80 text-sm">总学习时长</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{currentStreak}</p>
          <p className="text-white/80 text-sm">当前连续天数</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{longestStreak}</p>
          <p className="text-white/80 text-sm">最长连续天数</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-500" />
              本周学习日历
            </h2>
            <div className="grid grid-cols-7 gap-3">
              {weeklyData.map((day, index) => {
                const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
                const intensity = day.minutes > 60 ? 4 : day.minutes > 30 ? 3 : day.minutes > 15 ? 2 : day.minutes > 0 ? 1 : 0;
                return (
                  <div key={index} className="text-center">
                    <p className="text-xs text-slate-500 mb-2">{dayNames[index]}</p>
                    <div
                      className={`w-full aspect-square rounded-lg flex items-center justify-center ${
                        intensity === 0
                          ? 'bg-slate-100'
                          : intensity === 1
                          ? 'bg-indigo-200'
                          : intensity === 2
                          ? 'bg-indigo-300'
                          : intensity === 3
                          ? 'bg-indigo-400'
                          : 'bg-indigo-500'
                      }`}
                    >
                      <span className={`text-xs font-medium ${intensity > 2 ? 'text-white' : 'text-slate-600'}`}>
                        {day.minutes > 0 ? `${day.minutes}m` : '-'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h2 className="text-xl font-bold text-slate-800 mb-6">学习趋势</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {weeklyData.map((day, index) => {
                const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes), 1);
                const height = (day.minutes / maxMinutes) * 100;
                const dayNames = ['一', '二', '三', '四', '五', '六', '日'];
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all" style={{ height: `${height}%`, minHeight: day.minutes > 0 ? '20px' : '0' }} />
                    <span className="text-xs text-slate-500">{dayNames[index]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h2 className="text-xl font-bold text-slate-800 mb-6">模块进度</h2>
            <div className="space-y-4">
              {(Object.keys(modulesProgress) as Array<keyof typeof modulesProgress>).map((module) => {
                const Icon = moduleIcons[module];
                const progress = modulesProgress[module];
                const color = moduleColors[module];
                return (
                  <div key={module} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-${color}-100 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${color}-500`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 font-medium">{moduleNames[module]}</span>
                        <span className="text-slate-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r from-${color}-500 to-${color}-600 h-2 rounded-full transition-all`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6" />
              <h3 className="font-bold">今日目标</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">学习 30 分钟</span>
                <span className="text-sm font-bold">25/30 分钟</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '83%' }} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-white/80 text-sm">完成目标可获得 50 XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
