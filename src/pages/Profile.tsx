import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Globe2, Bell, Shield, CreditCard, LogOut, Save } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nickname: user?.nickname || '',
    email: user?.email || '',
    targetLanguage: user?.targetLanguage || 'english',
  });

  const handleSave = () => {
    alert('保存成功！');
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      logout();
      navigate('/');
    }
  };

  const tabs = [
    { id: 'profile', label: '个人信息', icon: User },
    { id: 'preferences', label: '学习设置', icon: Globe2 },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'security', label: '账户安全', icon: Shield },
  ];

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

  const languageLabels = {
    english: '英语',
    japanese: '日语',
    korean: '韩语',
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-slate-800">个人中心</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-5xl text-white mb-4">
                {user?.nickname?.[0] || 'U'}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{user?.nickname}</h2>
              <p className="text-slate-500 text-sm">{user?.email}</p>
              <div className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${languageColors[user?.targetLanguage || 'english']} text-white text-sm font-medium`}>
                {languageFlags[user?.targetLanguage || 'english']}
                {languageLabels[user?.targetLanguage || 'english']}
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                退出登录
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">个人信息</h2>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    isEditing
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  }`}
                >
                  {isEditing ? '保存' : '编辑'}
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-600 mb-1">昵称</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.nickname}
                        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-lg font-medium text-slate-800">{formData.nickname}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-600 mb-1">邮箱</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <p className="text-lg font-medium text-slate-800">{formData.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <Globe2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-600 mb-1">学习语言</label>
                    {isEditing ? (
                      <select
                        value={formData.targetLanguage}
                        onChange={(e) => setFormData({ ...formData, targetLanguage: e.target.value as any })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="english">🇺🇸 英语</option>
                        <option value="japanese">🇯🇵 日语</option>
                        <option value="korean">🇰🇷 韩语</option>
                      </select>
                    ) : (
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${languageColors[formData.targetLanguage]} text-white text-sm font-medium`}>
                        {languageFlags[formData.targetLanguage]}
                        {languageLabels[formData.targetLanguage]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
              <h2 className="text-xl font-bold text-slate-800 mb-6">学习设置</h2>
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <label className="block text-sm font-medium text-slate-600 mb-2">每日学习目标</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>15 分钟</option>
                    <option>30 分钟</option>
                    <option selected>45 分钟</option>
                    <option>60 分钟</option>
                  </select>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <label className="block text-sm font-medium text-slate-600 mb-2">学习提醒时间</label>
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <label className="block text-sm font-medium text-slate-600 mb-2">单词复习提醒</label>
                  <div className="flex items-center gap-4">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-indigo-500" />
                    <span>开启复习提醒</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
              <h2 className="text-xl font-bold text-slate-800 mb-6">通知设置</h2>
              <div className="space-y-4">
                {[
                  { label: '学习提醒', desc: '每日学习提醒' },
                  { label: '成就解锁', desc: '获得新成就时通知' },
                  { label: '社区互动', desc: '帖子被点赞或评论时通知' },
                  { label: '系统公告', desc: '平台重要通知' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-indigo-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
              <h2 className="text-xl font-bold text-slate-800 mb-6">账户安全</h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-slate-600" />
                      <span className="font-medium text-slate-800">修改密码</span>
                    </div>
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                      修改
                    </button>
                  </div>
                  <p className="text-sm text-slate-500">上次修改于 30 天前</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-slate-600" />
                      <span className="font-medium text-slate-800">双重验证</span>
                    </div>
                    <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-100">
                      未开启
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-800">删除账户</p>
                      <p className="text-sm text-red-600">永久删除您的账户和所有数据</p>
                    </div>
                    <button className="px-4 py-1.5 bg-red-100 text-red-600 text-sm font-medium rounded-lg hover:bg-red-200">
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
