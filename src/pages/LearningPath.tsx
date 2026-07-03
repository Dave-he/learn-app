import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Route, Compass, GraduationCap, Trophy, Target,
  MessageCircle, Briefcase, Clock, Users, CheckCircle,
  ChevronRight, Play, BookOpen, Mic, PenTool, ArrowRight
} from 'lucide-react';
import { languages } from '../data/content';

const learningPathData = {
  english: {
    name: '英语',
    flag: '🇬🇧',
    levels: [
      {
        name: '零基础 → 日常交流',
        duration: '2-3个月',
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-500',
        bgGradient: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        borderColor: 'border-emerald-200',
        description: '掌握发音规则、基础词汇和日常会话，能够进行简单的日常交流',
        modules: [
          { icon: Mic, name: '发音入门', lessons: 20, duration: '1周', completed: false },
          { icon: BookOpen, name: '基础词汇1000', lessons: 50, duration: '3周', completed: false },
          { icon: MessageCircle, name: '日常对话', lessons: 30, duration: '2周', completed: false },
          { icon: PenTool, name: '基础语法', lessons: 25, duration: '2周', completed: false },
        ],
        skills: ['自我介绍', '购物交流', '餐厅点餐', '问路指引', '简单电话沟通'],
      },
      {
        name: '日常 → 商务沟通',
        duration: '3-4个月',
        color: 'blue',
        gradient: 'from-blue-500 to-indigo-500',
        bgGradient: 'bg-gradient-to-br from-blue-50 to-indigo-50',
        borderColor: 'border-blue-200',
        description: '掌握职场用语、商务写作和会议沟通，能够处理日常商务场景',
        modules: [
          { icon: BookOpen, name: '商务词汇2000', lessons: 60, duration: '3周', completed: false },
          { icon: MessageCircle, name: '商务对话', lessons: 40, duration: '3周', completed: false },
          { icon: PenTool, name: '商务写作', lessons: 30, duration: '2周', completed: false },
          { icon: Target, name: '会议英语', lessons: 25, duration: '2周', completed: false },
        ],
        skills: ['邮件写作', '会议发言', '电话会议', '商务谈判', '演讲汇报'],
      },
      {
        name: '商务 → 流利精通',
        duration: '4-6个月',
        color: 'purple',
        gradient: 'from-purple-500 to-pink-500',
        bgGradient: 'bg-gradient-to-br from-purple-50 to-pink-50',
        borderColor: 'border-purple-200',
        description: '达到接近母语水平，能够流利参与各种复杂场景的专业讨论',
        modules: [
          { icon: BookOpen, name: '高级词汇5000', lessons: 80, duration: '4周', completed: false },
          { icon: MessageCircle, name: '深度对话', lessons: 50, duration: '4周', completed: false },
          { icon: PenTool, name: '学术写作', lessons: 40, duration: '3周', completed: false },
          { icon: Trophy, name: '专家口音', lessons: 30, duration: '3周', completed: false },
        ],
        skills: ['学术论文', '专业演讲', '辩论讨论', '文化深入', '行业专业术语'],
      },
    ],
    examPaths: [
      { name: 'CET-4', score: '450分', duration: '3个月', color: 'emerald' },
      { name: 'CET-6', score: '450分', duration: '4个月', color: 'blue' },
      { name: 'IELTS 6.5', score: '6.5分', duration: '6个月', color: 'purple' },
      { name: 'TOEFL 90', score: '90分', duration: '6个月', color: 'amber' },
    ],
  },
  japanese: {
    name: '日语',
    flag: '🇯🇵',
    levels: [
      {
        name: '五十音 → N5水平',
        duration: '2-3个月',
        color: 'rose',
        gradient: 'from-rose-500 to-pink-500',
        bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-50',
        borderColor: 'border-rose-200',
        description: '掌握五十音图、基础汉字和简单会话，能够进行最基本的日常交流',
        modules: [
          { icon: BookOpen, name: '五十音图', lessons: 15, duration: '1周', completed: false },
          { icon: PenTool, name: '基础汉字100', lessons: 30, duration: '2周', completed: false },
          { icon: MessageCircle, name: 'N5词汇', lessons: 40, duration: '2周', completed: false },
          { icon: Target, name: 'N5语法', lessons: 30, duration: '2周', completed: false },
        ],
        skills: ['简单自我介绍', '购物用语', '问路', '基本寒暄', '看懂简单标识'],
      },
      {
        name: 'N5 → N3水平',
        duration: '6-8个月',
        color: 'amber',
        gradient: 'from-amber-500 to-orange-500',
        bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50',
        borderColor: 'border-amber-200',
        description: '掌握N3级别词汇和语法，能够理解日常对话和简单文章',
        modules: [
          { icon: BookOpen, name: 'N4词汇', lessons: 50, duration: '3周', completed: false },
          { icon: PenTool, name: 'N4语法', lessons: 40, duration: '3周', completed: false },
          { icon: BookOpen, name: 'N3词汇', lessons: 60, duration: '4周', completed: false },
          { icon: Target, name: 'N3语法', lessons: 50, duration: '4周', completed: false },
        ],
        skills: ['日常对话', '简单新闻', '邮件读写', '工作沟通', '旅行交流'],
      },
      {
        name: 'N3 → N1精通',
        duration: '12-18个月',
        color: 'purple',
        gradient: 'from-purple-500 to-indigo-500',
        bgGradient: 'bg-gradient-to-br from-purple-50 to-indigo-50',
        borderColor: 'border-purple-200',
        description: '达到N1水平，能够流利阅读各种文章、理解复杂对话',
        modules: [
          { icon: BookOpen, name: 'N2词汇语法', lessons: 100, duration: '2个月', completed: false },
          { icon: BookOpen, name: 'N1词汇', lessons: 80, duration: '2个月', completed: false },
          { icon: PenTool, name: 'N1语法', lessons: 80, duration: '2个月', completed: false },
          { icon: Trophy, name: '专项突破', lessons: 60, duration: '2个月', completed: false },
        ],
        skills: ['商务日语', '新闻阅读', '学术写作', '演讲表达', '文化理解'],
      },
    ],
    examPaths: [
      { name: 'JLPT N5', score: '通过', duration: '3个月', color: 'rose' },
      { name: 'JLPT N4', score: '通过', duration: '6个月', color: 'amber' },
      { name: 'JLPT N3', score: '通过', duration: '12个月', color: 'blue' },
      { name: 'JLPT N2', score: '通过', duration: '18个月', color: 'purple' },
      { name: 'JLPT N1', score: '通过', duration: '24个月', color: 'indigo' },
    ],
  },
  korean: {
    name: '韩语',
    flag: '🇰🇷',
    levels: [
      {
        name: '入门 → TOPIK I',
        duration: '3-4个月',
        color: 'violet',
        gradient: 'from-violet-500 to-purple-500',
        bgGradient: 'bg-gradient-to-br from-violet-50 to-purple-50',
        borderColor: 'border-violet-200',
        description: '掌握韩文字母、基本语法和日常会话，能够进行简单交流',
        modules: [
          { icon: BookOpen, name: '韩文字母', lessons: 20, duration: '1周', completed: false },
          { icon: PenTool, name: '基础语法', lessons: 40, duration: '3周', completed: false },
          { icon: BookOpen, name: 'TOPIK I词汇', lessons: 50, duration: '3周', completed: false },
          { icon: MessageCircle, name: '日常会话', lessons: 35, duration: '2周', completed: false },
        ],
        skills: ['自我介绍', '购物交流', '餐厅点餐', '问路', '简单电话'],
      },
      {
        name: 'TOPIK I → TOPIK II',
        duration: '8-12个月',
        color: 'cyan',
        gradient: 'from-cyan-500 to-blue-500',
        bgGradient: 'bg-gradient-to-br from-cyan-50 to-blue-50',
        borderColor: 'border-cyan-200',
        description: '达到TOPIK II中高级水平，能够处理较复杂的日常和部分专业场景',
        modules: [
          { icon: BookOpen, name: '中级词汇', lessons: 60, duration: '3周', completed: false },
          { icon: PenTool, name: '中级语法', lessons: 50, duration: '3周', completed: false },
          { icon: BookOpen, name: '高级词汇', lessons: 70, duration: '4周', completed: false },
          { icon: Target, name: '高级语法', lessons: 60, duration: '4周', completed: false },
        ],
        skills: ['日常对话', '新闻理解', '邮件写作', '工作沟通', '旅行深度游'],
      },
      {
        name: 'TOPIK II → 精通',
        duration: '12-18个月',
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-500',
        bgGradient: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        borderColor: 'border-emerald-200',
        description: '达到高级水平，能够流利参与各种专业讨论和深度文化交流',
        modules: [
          { icon: BookOpen, name: '专业词汇', lessons: 80, duration: '2个月', completed: false },
          { icon: PenTool, name: '高级写作', lessons: 60, duration: '2个月', completed: false },
          { icon: MessageCircle, name: '深度会话', lessons: 50, duration: '2个月', completed: false },
          { icon: Trophy, name: '文化专题', lessons: 40, duration: '1个月', completed: false },
        ],
        skills: ['商务韩语', '新闻时事', '学术写作', '演讲表达', '文化深入'],
      },
    ],
    examPaths: [
      { name: 'TOPIK I', score: '通过', duration: '4个月', color: 'violet' },
      { name: 'TOPIK II 3级', score: '3级', duration: '10个月', color: 'cyan' },
      { name: 'TOPIK II 5级', score: '5级', duration: '16个月', color: 'blue' },
      { name: 'TOPIK II 6级', score: '6级', duration: '24个月', color: 'emerald' },
    ],
  },
};

export default function LearningPath() {
  const [selectedLang, setSelectedLang] = useState<'english' | 'japanese' | 'korean'>('english');
  const pathData = learningPathData[selectedLang];

  return (
    <div className="max-w-[1440px] mx-auto px-6">
      <section className="py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-4">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">系统化学习路径</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            最快学会新语言的路径
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            科学规划学习路线，从零基础到精通。每条路径都经过验证，帮助你少走弯路
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          {Object.entries(learningPathData).map(([key, lang]) => (
            <button
              key={key}
              onClick={() => setSelectedLang(key as typeof selectedLang)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                selectedLang === key
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="pb-12">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-3xl" />
          <div className="relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-3xl shadow-lg">
                {pathData.flag}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{pathData.name}学习路径</h2>
                <p className="text-slate-600">从零基础到精通的完整路线图</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-slate-600">预计总时长</span>
                <span className="font-semibold text-slate-800">8-12个月</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-slate-600">学习模块</span>
                <span className="font-semibold text-slate-800">12个核心模块</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-slate-600">学习人数</span>
                <span className="font-semibold text-slate-800">28.5k</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 hidden md:block" />

          <div className="space-y-8">
            {pathData.levels.map((level, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-2 top-8 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 border-4 border-white shadow-lg hidden md:block" />

                <div className={`${level.bgGradient} p-6 rounded-2xl border ${level.borderColor} ml-0 md:ml-12`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 px-2 py-1 rounded">
                          阶段 {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-slate-800">{level.name}</h3>
                      </div>
                      <p className="text-slate-600 mb-3">{level.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-4 h-4" />
                          {level.duration}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <BookOpen className="w-4 h-4" />
                          {level.modules.reduce((acc, m) => acc + m.lessons, 0)} 课时
                        </span>
                      </div>
                    </div>
                    <button className={`hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${level.gradient} text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all`}>
                      <Play className="w-4 h-4" />
                      开始学习
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {level.modules.map((module, i) => {
                      const Icon = module.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${level.gradient} flex items-center justify-center shadow-sm`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 text-sm truncate">{module.name}</p>
                            <p className="text-xs text-slate-500">{module.lessons}课时 · {module.duration}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-slate-500 mr-2">掌握技能：</span>
                    {level.skills.map((skill, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-full text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            考试路径
          </h2>
          <p className="text-slate-600 mt-2">根据目标考试，制定专属备考计划</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {pathData.examPaths.map((exam, index) => (
            <div
              key={index}
              className="group p-5 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all text-center cursor-pointer"
            >
              <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${
                exam.color === 'emerald' ? 'from-emerald-500 to-teal-500' :
                exam.color === 'blue' ? 'from-blue-500 to-indigo-500' :
                exam.color === 'purple' ? 'from-purple-500 to-pink-500' :
                exam.color === 'amber' ? 'from-amber-500 to-orange-500' :
                exam.color === 'rose' ? 'from-rose-500 to-pink-500' :
                exam.color === 'violet' ? 'from-violet-500 to-purple-500' :
                exam.color === 'cyan' ? 'from-cyan-500 to-blue-500' :
                'from-indigo-500 to-purple-500'
              } flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{exam.name}</h3>
              <p className="text-sm text-slate-500 mb-2">目标: {exam.score}</p>
              <p className="text-xs text-slate-400">预计 {exam.duration}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/exams"
            className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700"
          >
            查看更多考试真题 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="pb-12">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
          </div>
          <div className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                语言的本质在于交流
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                我们的学习路径不仅教你语法和词汇，更注重真实的交流能力。
                加入社区，找到你的语言伙伴，一起练习、共同进步。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/forum"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
                >
                  <Users className="w-5 h-5" />
                  加入学习社区
                </Link>
                <Link
                  to="/corpus"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  浏览真实语料
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
