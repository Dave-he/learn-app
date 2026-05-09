import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Home, BookOpen, BarChart3, MessageCircle, Award, User, LogOut, GraduationCap } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const navItems = [
    { path: '/dashboard', label: '学习中心', icon: Home },
    { path: '/courses', label: '课程', icon: BookOpen },
    { path: '/progress', label: '进度', icon: BarChart3 },
    { path: '/community', label: '社区', icon: MessageCircle },
    { path: '/achievements', label: '成就', icon: Award },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {!isAuthenticated ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen">
          <aside className="fixed left-0 top-0 z-40 w-64 h-screen bg-white/80 backdrop-blur-xl border-r border-slate-200/50 shadow-xl">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-slate-200/50">
                <Link to="/dashboard" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    LinguaLearn
                  </span>
                </Link>
              </div>

              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        active
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'animate-pulse' : ''}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-200/50">
                <Link
                  to="/profile"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-2 ${
                    isActive('/profile')
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">个人中心</span>
                </Link>
                <div className="flex items-center gap-3 px-4 py-3 text-slate-600">
                  <div className="flex-1">
                    <p className="font-medium text-sm truncate">{user?.nickname}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="退出登录"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 ml-64">
            <div className="p-8">
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
