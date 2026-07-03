import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Globe2, BookOpen, FileText, Newspaper, Search, MessageCircle,
  Download, GraduationCap, Compass, Lightbulb, Route, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', label: '首页', icon: Globe2 },
  { path: '/path', label: '学习路径', icon: Route },
  { path: '/grammar', label: '语法技巧', icon: Lightbulb },
  { path: '/corpus', label: '语料库', icon: BookOpen },
  { path: '/exams', label: '历年真题', icon: FileText },
  { path: '/forum', label: '学习社区', icon: MessageCircle },
  { path: '/resources', label: '学习资料', icon: Download },
];

export default function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              LinguaHub
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/search"
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors hidden md:block"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/60 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all lg:hidden"
              >
                <Search className="w-4 h-4" />
                内容搜索
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="pt-[104px] md:pt-20 pb-12">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-700">LinguaHub</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                语言的本质在于交流 — 帮助人们更好地沟通与分享
              </p>
              <div className="flex gap-3">
                {['🇬🇧', '🇯🇵', '🇰🇷', '🇫🇷', '🇩🇪', '🇪🇸'].map((flag, i) => (
                  <span key={i} className="text-xl opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                    {flag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">学习资源</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/path" className="hover:text-emerald-600 transition-colors">学习路径</Link></li>
                <li><Link to="/grammar" className="hover:text-emerald-600 transition-colors">语法技巧</Link></li>
                <li><Link to="/corpus" className="hover:text-emerald-600 transition-colors">语料库</Link></li>
                <li><Link to="/exams" className="hover:text-emerald-600 transition-colors">历年真题</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">社区</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/forum" className="hover:text-emerald-600 transition-colors">学习论坛</Link></li>
                <li><Link to="/forum/partners" className="hover:text-emerald-600 transition-colors">语言伙伴</Link></li>
                <li><Link to="/resources" className="hover:text-emerald-600 transition-colors">学习资料</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-4">关于</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><span className="hover:text-emerald-600 cursor-pointer transition-colors">关于我们</span></li>
                <li><span className="hover:text-emerald-600 cursor-pointer transition-colors">使用指南</span></li>
                <li><span className="hover:text-emerald-600 cursor-pointer transition-colors">反馈建议</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2024 LinguaHub. 公共开放的语言学习平台</p>
            <p className="text-sm text-slate-400">汇聚全球语料，让语言学习更简单</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
