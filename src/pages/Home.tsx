import { Link } from 'react-router-dom';
import { Globe2, BookOpen, Mic, BarChart3, Users, Zap, ChevronRight, Star, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LinguaLearn
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 text-slate-600 font-medium hover:text-indigo-600 transition-colors"
            >
              登录
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              免费开始
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-lg mb-8">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-slate-600">超过 100,000 名学习者正在使用</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                沉浸式语言学习
              </span>
              <br />
              <span className="text-slate-800">让世界触手可及</span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              通过互动式学习体验、智能进度追踪和个性化学习路径，高效掌握英语、日语、韩语等主流语言
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                立即开始学习
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
              >
                已有账号？登录
              </Link>
            </div>
          </div>

          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">分级课程</h3>
                  <p className="text-slate-400 text-sm">从零基础到流利表达，科学分级</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                    <Mic className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">口语跟读</h3>
                  <p className="text-slate-400 text-sm">AI 评分，实时反馈</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">进度追踪</h3>
                  <p className="text-slate-400 text-sm">可视化数据，见证成长</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">支持多语种学习</h2>
            <p className="text-slate-600 text-lg">选择你的目标语言，开启学习之旅</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                language: '英语',
                flag: '🇺🇸',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-500/10',
                learners: '45,000+',
                description: '全球通用语言，职场必备技能',
              },
              {
                language: '日语',
                flag: '🇯🇵',
                color: 'from-red-500 to-pink-500',
                bgColor: 'bg-red-500/10',
                learners: '28,000+',
                description: '动漫、游戏、文化爱好者的首选',
              },
              {
                language: '韩语',
                flag: '🇰🇷',
                color: 'from-purple-500 to-indigo-500',
                bgColor: 'bg-purple-500/10',
                learners: '22,000+',
                description: 'K-pop、韩剧爱好者集聚地',
              },
            ].map((lang) => (
              <div
                key={lang.language}
                className={`relative group rounded-3xl p-8 ${lang.bgColor} hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {lang.flag}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{lang.language}</h3>
                <p className="text-slate-600 mb-4">{lang.description}</p>
                <div className="flex items-center gap-2 text-slate-500">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{lang.learners} 学习者</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">为什么选择 LinguaLearn？</h2>
            <p className="text-slate-600 text-lg">科学的学习方法，让语言学习更高效</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: '互动式学习',
                description: '告别枯燥记忆，在互动中掌握知识',
                color: 'indigo',
              },
              {
                icon: BarChart3,
                title: '智能追踪',
                description: '详细数据分析，清晰了解学习进度',
                color: 'purple',
              },
              {
                icon: Zap,
                title: '个性化推荐',
                description: 'AI 智能推荐，为你定制学习路径',
                color: 'amber',
              },
              {
                icon: Award,
                title: '成就激励',
                description: '徽章系统，持续获得学习动力',
                color: 'pink',
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${feature.color}-500`} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">学习者怎么说</h2>
            <p className="text-slate-600 text-lg">来自真实用户的评价</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: '张小明',
                role: '大学生',
                avatar: '👨‍🎓',
                content: '通过 LinguaLearn 学习英语三个月，托福成绩提高了 20 分！',
                rating: 5,
              },
              {
                name: '李美玲',
                role: '日语爱好者',
                avatar: '👩‍💼',
                content: '日语课程非常有趣，现在可以无压力看生肉动漫了！',
                rating: 5,
              },
              {
                name: '王建国',
                role: '职场人士',
                avatar: '👨‍💻',
                content: '每天通勤时练习听力，韩语学习效率大大提升。',
                rating: 5,
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-200/50 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">准备好开始你的语言学习之旅了吗？</h2>
          <p className="text-xl text-white/80 mb-10">加入超过 100,000 名学习者，开始你的沉浸式语言学习体验</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            免费注册
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">LinguaLearn</span>
            </div>
            <p className="text-slate-400 text-sm">© 2024 LinguaLearn. 让语言学习更简单。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
