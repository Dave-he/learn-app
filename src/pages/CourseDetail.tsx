import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock, BookOpen, Play, CheckCircle, Lock, ChevronDown } from 'lucide-react';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedUnit, setExpandedUnit] = useState<number | null>(0);

  const course = {
    id,
    title: '日常英语口语入门',
    description: '从基础问候到日常对话，循序渐进掌握英语口语。适合零基础学习者，通过互动式学习，轻松开口说英语。',
    language: 'english',
    level: 'A1',
    totalUnits: 12,
    completedUnits: 4,
    duration: 180,
    enrolledCount: 12580,
    objectives: [
      '掌握日常问候语和自我介绍',
      '能够进行简单的购物和点餐对话',
      '学会表达日期、时间和天气',
      '能够描述日常生活和兴趣爱好',
    ],
    units: [
      {
        id: 1,
        title: '问候与介绍',
        type: 'vocabulary',
        duration: 15,
        completed: true,
        lessons: ['Hello 与 Hi 的区别', '自我介绍常用句型', '告别语与祝福'],
      },
      {
        id: 2,
        title: '数字与时间',
        type: 'vocabulary',
        duration: 20,
        completed: true,
        lessons: ['1-100 数字表达', '时间表达方式', '星期和月份'],
      },
      {
        id: 3,
        title: '家庭成员',
        type: 'grammar',
        duration: 25,
        completed: true,
        lessons: ['家庭成员词汇', '所有格代词', '描述家庭'],
      },
      {
        id: 4,
        title: '日常活动',
        type: 'dialogue',
        duration: 30,
        completed: true,
        lessons: ['日常作息表达', '频率副词', '时间顺序词'],
      },
      {
        id: 5,
        title: '购物用语',
        type: 'dialogue',
        duration: 25,
        completed: false,
        lessons: ['询问价格', '尺寸和颜色', '试穿与结账'],
      },
      {
        id: 6,
        title: '餐厅点餐',
        type: 'dialogue',
        duration: 30,
        completed: false,
        locked: false,
        lessons: ['预约座位', '点菜表达', '结账买单'],
      },
    ],
  };

  const languageColors = {
    english: 'from-blue-500 to-cyan-500',
    japanese: 'from-red-500 to-pink-500',
    korean: 'from-purple-500 to-indigo-500',
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        返回课程列表
      </button>

      <div className={`h-64 rounded-3xl bg-gradient-to-br ${languageColors[course.language as keyof typeof languageColors]} relative overflow-hidden mb-8`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm">
              {course.level} 级别
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm">
              英语
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
          <p className="text-white/80 max-w-2xl">{course.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h2 className="text-xl font-bold text-slate-800 mb-4">学习目标</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.objectives.map((objective, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-slate-700">{objective}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h2 className="text-xl font-bold text-slate-800 mb-4">课程内容</h2>
            <div className="space-y-3">
              {course.units.map((unit, index) => (
                <div
                  key={unit.id}
                  className={`border rounded-xl overflow-hidden transition-all ${
                    unit.locked ? 'opacity-60' : 'hover:border-indigo-300'
                  }`}
                >
                  <button
                    onClick={() => !unit.locked && setExpandedUnit(expandedUnit === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        unit.completed
                          ? 'bg-emerald-100 text-emerald-600'
                          : unit.locked
                          ? 'bg-slate-100 text-slate-400'
                          : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {unit.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : unit.locked ? (
                          <Lock className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-slate-800">{unit.title}</p>
                        <p className="text-sm text-slate-500">
                          {unit.completed ? '已完成' : unit.locked ? '未解锁' : `${unit.duration} 分钟`}
                        </p>
                      </div>
                    </div>
                    {!unit.locked && (
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedUnit === index ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {expandedUnit === index && !unit.locked && (
                    <div className="px-4 pb-4 bg-slate-50 border-t">
                      <ul className="pt-4 space-y-2">
                        {unit.lessons.map((lesson, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => navigate('/learn/vocabulary')}
                        className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                      >
                        开始学习
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 sticky top-8">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">学习进度</span>
                <span className="text-indigo-600 font-semibold">
                  {Math.round((course.completedUnits / course.totalUnits) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
                  style={{ width: `${(course.completedUnits / course.totalUnits) * 100}%` }}
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">
                {course.completedUnits} / {course.totalUnits} 单元已完成
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-slate-50 rounded-xl">
                <Users className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-slate-800">{course.enrolledCount.toLocaleString()}</p>
                <p className="text-xs text-slate-500">学习人数</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-xl">
                <Clock className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-slate-800">{course.duration}</p>
                <p className="text-xs text-slate-500">总分钟数</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/learn/vocabulary')}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              {course.completedUnits > 0 ? '继续学习' : '开始学习'}
            </button>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">课程包含</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>{course.totalUnits} 个学习单元</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-pink-500" />
                  <span>互动式口语练习</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>单元测试与复习</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
