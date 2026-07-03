import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Star, Zap, Users, TrendingUp, Lock } from 'lucide-react';

const achievementsData = [
  {
    id: 1,
    title: '初次登录',
    description: '完成账号注册',
    icon: '🎯',
    category: 'milestone',
    unlocked: true,
    unlockedAt: '2024-01-15',
  },
  {
    id: 2,
    title: '首课完成',
    description: '完成第一个课程单元',
    icon: '📚',
    category: 'milestone',
    unlocked: true,
    unlockedAt: '2024-01-16',
  },
  {
    id: 3,
    title: '连续学习 7 天',
    description: '保持连续学习 7 天',
    icon: '🔥',
    category: 'milestone',
    unlocked: true,
    unlockedAt: '2024-01-22',
  },
  {
    id: 4,
    title: '单词大师',
    description: '学习 100 个单词',
    icon: '📖',
    category: 'skill',
    unlocked: true,
    unlockedAt: '2024-01-20',
  },
  {
    id: 5,
    title: '口语达人',
    description: '完成 50 次口语练习',
    icon: '🎤',
    category: 'skill',
    unlocked: false,
  },
  {
    id: 6,
    title: '听力高手',
    description: '完成 50 次听力练习',
    icon: '🎧',
    category: 'skill',
    unlocked: false,
  },
  {
    id: 7,
    title: '全模块探索',
    description: '体验所有学习模块',
    icon: '🌟',
    category: 'exploration',
    unlocked: true,
    unlockedAt: '2024-01-18',
  },
  {
    id: 8,
    title: '社区达人',
    description: '发布 10 篇帖子',
    icon: '💬',
    category: 'social',
    unlocked: false,
  },
  {
    id: 9,
    title: '连续学习 30 天',
    description: '保持连续学习 30 天',
    icon: '🏆',
    category: 'milestone',
    unlocked: false,
  },
  {
    id: 10,
    title: '学习之星',
    description: '总学习时长超过 100 小时',
    icon: '⭐',
    category: 'milestone',
    unlocked: false,
  },
];

const leaderboard = [
  { rank: 1, nickname: '学习狂人小明', streak: 45, xp: 15800, avatar: '👨‍💻' },
  { rank: 2, nickname: '语言达人小红', streak: 38, xp: 12500, avatar: '👩‍🎨' },
  { rank: 3, nickname: '日语爱好者', streak: 32, xp: 11200, avatar: '🧑‍🎓' },
  { rank: 4, nickname: '韩语学习者', streak: 28, xp: 9800, avatar: '👨‍🎓' },
  { rank: 5, nickname: '英语小王子', streak: 25, xp: 8600, avatar: '👦' },
];

export default function Achievements() {
  const navigate = useNavigate();
  const unlockedCount = achievementsData.filter((a) => a.unlocked).length;

  const categoryLabels = {
    milestone: '里程碑',
    skill: '技能徽章',
    exploration: '探索徽章',
    social: '社交徽章',
  };

  const categoryColors = {
    milestone: 'from-amber-500 to-orange-500',
    skill: 'from-indigo-500 to-purple-500',
    exploration: 'from-emerald-500 to-teal-500',
    social: 'from-pink-500 to-rose-500',
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-slate-800">成就中心</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-1">我的成就</h2>
                <p className="text-white/80">收集更多徽章，提升等级</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-1">
                  <Trophy className="w-8 h-8" />
                </div>
                <p className="text-2xl font-bold">{unlockedCount}/{achievementsData.length}</p>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${(unlockedCount / achievementsData.length) * 100}%` }}
              />
            </div>
          </div>

          {(['milestone', 'skill', 'exploration', 'social'] as const).map((category) => {
            const categoryAchievements = achievementsData.filter((a) => a.category === category);
            return (
              <div key={category} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  {category === 'milestone' && <Trophy className="w-6 h-6 text-amber-500" />}
                  {category === 'skill' && <Star className="w-6 h-6 text-indigo-500" />}
                  {category === 'exploration' && <Zap className="w-6 h-6 text-emerald-500" />}
                  {category === 'social' && <Users className="w-6 h-6 text-pink-500" />}
                  {categoryLabels[category]}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categoryAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        achievement.unlocked
                          ? 'border-indigo-200 bg-indigo-50'
                          : 'border-slate-200 bg-slate-50 opacity-60'
                      }`}
                    >
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-3 ${
                        achievement.unlocked
                          ? `bg-gradient-to-br ${categoryColors[category]} shadow-lg`
                          : 'bg-slate-200'
                      }`}>
                        {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8 text-slate-400" />}
                      </div>
                      <h3 className="font-semibold text-slate-800 text-center mb-1">{achievement.title}</h3>
                      <p className="text-xs text-slate-500 text-center">{achievement.description}</p>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className="text-xs text-indigo-500 text-center mt-2">
                          {achievement.unlockedAt}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 sticky top-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-500" />
              学习排行榜
            </h2>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    index === 0
                      ? 'bg-amber-50 border border-amber-200'
                      : index === 1
                      ? 'bg-slate-100 border border-slate-200'
                      : index === 2
                      ? 'bg-orange-50 border border-orange-200'
                      : 'bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-amber-500 text-white' :
                    index === 1 ? 'bg-slate-400 text-white' :
                    index === 2 ? 'bg-orange-500 text-white' :
                    'bg-slate-300 text-slate-600'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">{user.nickname}</p>
                    <p className="text-xs text-slate-500">🔥 {user.streak} 天 | ⭐ {user.xp.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
