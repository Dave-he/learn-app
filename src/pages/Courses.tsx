import { Link } from 'react-router-dom';
import { Search, Filter, Users, Clock, Star, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const coursesData = [
  {
    id: '1',
    title: '日常英语口语入门',
    description: '从基础问候到日常对话，循序渐进掌握英语口语',
    language: 'english',
    level: 'A1',
    totalUnits: 12,
    completedUnits: 4,
    duration: 180,
    enrolledCount: 12580,
    rating: 4.8,
  },
  {
    id: '2',
    title: '日语五十音图详解',
    description: '平假名、片假名发音规则与书写技巧',
    language: 'japanese',
    level: '入门',
    totalUnits: 8,
    completedUnits: 5,
    duration: 120,
    enrolledCount: 8960,
    rating: 4.9,
  },
  {
    id: '3',
    title: '韩语发音基础',
    description: '韩语字母表与基础发音规则',
    language: 'korean',
    level: '入门',
    totalUnits: 10,
    completedUnits: 2,
    duration: 90,
    enrolledCount: 7680,
    rating: 4.7,
  },
  {
    id: '4',
    title: '商务英语进阶',
    description: '职场邮件、会议、谈判必备英语表达',
    language: 'english',
    level: 'B1',
    totalUnits: 15,
    completedUnits: 0,
    duration: 240,
    enrolledCount: 5420,
    rating: 4.6,
  },
  {
    id: '5',
    title: '日语N3备考冲刺',
    description: 'JLPT N3 语法、词汇、阅读全面复习',
    language: 'japanese',
    level: 'N3',
    totalUnits: 20,
    completedUnits: 0,
    duration: 360,
    enrolledCount: 4230,
    rating: 4.8,
  },
  {
    id: '6',
    title: '韩语TOPIK I 备考',
    description: '韩语能力考试初级备考课程',
    language: 'korean',
    level: '初级',
    totalUnits: 16,
    completedUnits: 0,
    duration: 280,
    enrolledCount: 3890,
    rating: 4.7,
  },
];

export default function Courses() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const languageColors = {
    english: 'from-blue-500 to-cyan-500',
    japanese: 'from-red-500 to-pink-500',
    korean: 'from-purple-500 to-indigo-500',
  };

  const languageFlags = {
    english: '🇺🇸',
    japanese: '🇯🇵',
    korean: '🇰🇷',
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">课程中心</h1>
        <p className="text-slate-600">探索海量课程，找到适合你的学习内容</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="搜索课程..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: 'all', label: '全部' },
            { value: 'english', label: '🇺🇸 英语' },
            { value: 'japanese', label: '🇯🇵 日语' },
            { value: 'korean', label: '🇰🇷 韩语' },
          ].map((lang) => (
            <button
              key={lang.value}
              onClick={() => setSelectedLanguage(lang.value)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedLanguage === lang.value
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 hover:-translate-y-1"
          >
            <div className={`h-32 bg-gradient-to-br ${languageColors[course.language as keyof typeof languageColors]} relative`}>
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-sm font-medium">
                {languageFlags[course.language as keyof typeof languageFlags]} {course.language === 'english' ? '英语' : course.language === 'japanese' ? '日语' : '韩语'}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-sm">
                {course.level}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <BookIcon className="w-4 h-4" />
                  <span>{course.totalUnits} 单元</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} 分钟</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolledCount.toLocaleString()}</span>
                </div>
              </div>

              {course.completedUnits > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">学习进度</span>
                    <span className="text-indigo-600 font-medium">{Math.round((course.completedUnits / course.totalUnits) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${(course.completedUnits / course.totalUnits) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-slate-700">{course.rating}</span>
                </div>
                <span className="text-indigo-600 font-medium text-sm group-hover:underline">
                  查看详情
                  <ChevronRight className="w-4 h-4 inline ml-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
