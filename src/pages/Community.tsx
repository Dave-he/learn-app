import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ThumbsUp, User, Plus, Search, Filter } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    author: { nickname: '英语达人小王', avatar: '👨‍💻' },
    language: 'english',
    title: '分享我的英语学习心得',
    content: '学习英语最重要的是坚持每天听力和口语练习。我每天会用 LinguaLearn 练习30分钟，效果非常好！',
    likes: 128,
    comments: 32,
    createdAt: '2小时前',
  },
  {
    id: 2,
    author: { nickname: '日语学习者', avatar: '👩‍🎨' },
    language: 'japanese',
    title: 'JLPT N3 备考经验分享',
    content: '准备 N3 考试的同学注意了，语法和词汇同样重要。我建议每天背30个单词，做10道语法题。',
    likes: 89,
    comments: 21,
    createdAt: '5小时前',
  },
  {
    id: 3,
    author: { nickname: '韩语萌新', avatar: '🧑‍🎓' },
    language: 'korean',
    title: '韩语发音太难了怎么办？',
    content: '刚开始学韩语，发音总是发不准，有没有大神可以教教我？特别是收音部分完全搞不懂。',
    likes: 45,
    comments: 56,
    createdAt: '1天前',
  },
];

export default function Community() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const filteredPosts = mockPosts.filter((post) => {
    const matchesLanguage = selectedLanguage === 'all' || post.language === selectedLanguage;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

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

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      alert('帖子发布成功！');
      setShowNewPost(false);
      setNewPostTitle('');
      setNewPostContent('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">社区广场</h1>
        </div>
        <button
          onClick={() => setShowNewPost(!showNewPost)}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          发布帖子
        </button>
      </div>

      {showNewPost && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">发布新帖子</h3>
          <input
            type="text"
            placeholder="标题"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="分享你的学习心得..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowNewPost(false)}
              className="px-6 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleCreatePost}
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              发布
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="搜索帖子..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: 'all', label: '全部' },
            { value: 'english', label: '🇺🇸' },
            { value: 'japanese', label: '🇯🇵' },
            { value: 'korean', label: '🇰🇷' },
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

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${languageColors[post.language as keyof typeof languageColors]} flex items-center justify-center text-2xl`}>
                {post.author.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-800">{post.author.nickname}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${languageColors[post.language as keyof typeof languageColors]} text-white`}>
                    {languageFlags[post.language as keyof typeof languageFlags]} {languageLabels[post.language as keyof typeof languageLabels]}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{post.createdAt}</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-3">{post.title}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">{post.content}</p>

            <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
              <button className="flex items-center gap-2 text-slate-600 hover:text-pink-500 transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-600 hover:text-indigo-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
