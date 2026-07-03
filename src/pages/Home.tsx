import { Link } from 'react-router-dom';
import {
  Route, Compass, MessageCircle, Trophy, GraduationCap,
  Users, Zap, BookOpen, Target, ArrowRight, Sparkles,
  Globe2, Mic, PenTool, Brain, Calendar, TrendingUp, Briefcase
} from 'lucide-react';
import { languages, corpusData, forumData } from '../data/content';

export default function Home() {
  const learningPaths = [
    {
      icon: Target,
      title: '考试冲刺',
      desc: 'TOEFL·IELTS·JLPT·TOPIK·DELF',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      learners: '12.8k',
      path: '/exams'
    },
    {
      icon: MessageCircle,
      title: '日常交流',
      desc: '旅行·购物·交友·社交',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500',
      learners: '28.5k',
      path: '/corpus'
    },
    {
      icon: Briefcase,
      title: '职场商务',
      desc: '邮件·会议·谈判·演讲',
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      learners: '8.3k',
      path: '/corpus'
    }
  ];

  const coreValues = [
    {
      icon: Zap,
      title: '最快学习路径',
      desc: '科学规划学习路线，少走弯路',
      highlight: '效率提升 3倍'
    },
    {
      icon: Brain,
      title: '语法技巧精华',
      desc: '提炼核心语法规则与记忆技巧',
      highlight: '1000+ 语法点'
    },
    {
      icon: MessageCircle,
      title: '语言的本质是交流',
      desc: '真实场景对话，告别哑巴外语',
      highlight: '真实语料驱动'
    },
    {
      icon: Users,
      title: '社区互助学习',
      desc: '找到语伴，互相监督共同进步',
      highlight: '10000+ 学习者'
    }
  ];

  const quickStats = [
    { label: '活跃学习者', value: '50,000+', icon: Users },
    { label: '语料数量', value: '10,000+', icon: BookOpen },
    { label: '学习社区', value: '500+', icon: MessageCircle },
    { label: '语种覆盖', value: '8种', icon: Globe2 },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6">
      <section className="py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">公共开放 · 永久免费 · 无需登录</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              最快学会
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                新语言的路径
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              科学的学习路径 + 实用的语法技巧 + 真实的交流场景
              <br />
              <span className="text-emerald-600 font-semibold">语言的本质在于交流</span> — 帮助人们更好地沟通与分享
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/path"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
              >
                <Route className="w-5 h-5" />
                查看学习路径
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/forum"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <Users className="w-5 h-5" />
                加入学习社区
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center">
                    <Icon className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl transform rotate-3 opacity-50" />
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-emerald-500/10 p-6 border border-emerald-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Globe2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">英语学习路径</h3>
                  <p className="text-sm text-slate-500">目标：3个月达到商务沟通水平</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { week: '第1-4周', topic: '基础发音与日常词汇', progress: 100 },
                  { week: '第5-8周', topic: '核心语法与句型', progress: 75 },
                  { week: '第9-12周', topic: '商务场景实战', progress: 30 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-16 text-xs font-medium text-slate-600 ${item.progress === 100 ? 'text-emerald-600' : ''}`}>
                      {item.week}
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <div className="w-10 text-xs font-medium text-slate-500">{item.progress}%</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to="/path/english"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  查看完整路径 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            为什么选择我们？
          </h2>
          <p className="text-slate-600">我们相信：最好的语言学习，是让交流变得更简单</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={i}
                className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{value.desc}</p>
                <div className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {value.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            选择你的学习目标
          </h2>
          <p className="text-slate-600">无论是为了考试、日常交流还是职场需求，我们都有专属路径</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {learningPaths.map((path, i) => {
            const Icon = path.icon;
            return (
              <Link
                key={i}
                to={path.path}
                className="group relative overflow-hidden p-6 bg-white rounded-2xl border border-slate-200 hover:border-transparent hover:shadow-xl transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${path.gradient} flex items-center justify-center mb-4 shadow-lg shadow-${path.color}-500/20`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{path.title}</h3>
                <p className="text-sm text-slate-600 mb-4">{path.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {path.learners} 人在学
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-emerald-500" />
              社区热议
            </h2>
            <p className="text-slate-600 mt-1">学习者们正在讨论这些话题</p>
          </div>
          <Link
            to="/forum"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            进入社区 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {forumData.slice(0, 4).map((post) => {
            const lang = languages.find((l) => l.code === post.language);
            return (
              <Link
                key={post.id}
                to={`/forum/${post.id}`}
                className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{post.avatar}</span>
                  <div>
                    <div className="font-medium text-slate-800">{post.author}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{lang?.flag} {lang?.label}</span>
                      <span>·</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Mic className="w-4 h-4" />
                    {post.likes} 点赞
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.replies.length} 回复
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="py-12">
        <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/0" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              开始你的语言学习之旅
            </h2>
            <p className="text-lg text-white/90 mb-8">
              加入 thousands of learners，从今天开始，与全球学习者一起进步
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/path"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <Compass className="w-5 h-5" />
                探索学习路径
              </Link>
              <Link
                to="/corpus"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                浏览语料库
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-emerald-500" />
          支持的语种
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              to={`/corpus?lang=${lang.code}`}
              className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all text-center"
            >
              <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform shadow-md`}>
                {lang.flag}
              </div>
              <p className="text-sm font-medium text-slate-700">{lang.label}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
