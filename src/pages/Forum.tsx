import { useState } from 'react';
import {
  MessageCircle, ThumbsUp, Plus, Send, Users, Heart,
  Share2, Bookmark, Search, Filter, TrendingUp,
  UserPlus, Star, Clock, Award, Globe, MessageSquare
} from 'lucide-react';
import { forumData, languages } from '../data/content';

const languagePartners = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: '👨‍💻',
    nativeLang: '🇨🇳 中文',
    learningLang: '🇬🇧 英语',
    level: 'C1',
    goal: '商务英语',
    bio: '5年工作经验，希望提升商务沟通能力',
    online: true,
    activeTime: '早上 7:00-9:00',
    tags: ['商务', '职场', '口语']
  },
  {
    id: 2,
    name: ' Sakura',
    avatar: '👩‍🎨',
    nativeLang: '🇯🇵 日语',
    learningLang: '🇨🇳 中文',
    level: 'N2',
    goal: 'HSK5备考',
    bio: '在日本工作的中国人，想学习日语',
    online: true,
    activeTime: '晚上 20:00-22:00',
    tags: ['HSK', '日常', '文化']
  },
  {
    id: 3,
    name: 'Min-jun',
    avatar: '🧑‍🎓',
    nativeLang: '🇰🇷 韩语',
    learningLang: '🇯🇵 日语',
    level: 'TOPIK II 4级',
    goal: 'JLPT N3',
    bio: '大学生，Kpop爱好者，想去日本留学',
    online: false,
    activeTime: '下午 14:00-18:00',
    tags: ['留学', '追星', '动漫']
  },
];

const discussionTopics = [
  {
    id: 't1',
    title: '大家每天学习多长时间？',
    icon: '⏰',
    posts: 156,
    participants: 89,
    hot: true
  },
  {
    id: 't2',
    title: '最有效的背单词方法讨论',
    icon: '📚',
    posts: 234,
    participants: 167,
    hot: true
  },
  {
    id: 't3',
    title: '怎样克服不敢开口说外语',
    icon: '🗣️',
    posts: 98,
    participants: 76,
    hot: false
  },
  {
    id: 't4',
    title: '推荐你喜欢的学习资源',
    icon: '🎯',
    posts: 312,
    participants: 201,
    hot: false
  },
];

export default function Forum() {
  const [activeTab, setActiveTab] = useState<'posts' | 'partners' | 'topics'>('posts');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const filtered = forumData.filter((p) => selectedLang === 'all' || p.language === selectedLang);

  const handlePost = () => {
    if (newTitle.trim() && newContent.trim()) {
      alert('帖子发布成功！');
      setShowNewPost(false);
      setNewTitle('');
      setNewContent('');
    }
  };

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 flex items-center gap-3">
              <Globe className="w-8 h-8 text-emerald-500" />
              学习社区
            </h1>
            <p className="text-slate-600">语言的本质在于交流 — 与全球学习者一起进步</p>
          </div>
          <button
            onClick={() => setShowNewPost(!showNewPost)}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            发布帖子
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: 'posts', label: '帖子', icon: MessageSquare },
            { key: 'partners', label: '语言伙伴', icon: UserPlus },
            { key: 'topics', label: '热门话题', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {showNewPost && (
        <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-lg">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-500" />
            发布新帖
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">标题</label>
              <input
                type="text"
                placeholder="分享你的学习心得、经验、资源..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">内容</label>
              <textarea
                placeholder="详细描述你的想法、经验或问题..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">选择语种</option>
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.flag} {lang.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handlePost}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  发布
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'posts' && (
        <section>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedLang('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedLang === 'all'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
              }`}
            >
              全部
            </button>
            {languages.filter((l) => forumData.some((f) => f.language === l.code)).map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedLang === lang.code
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
                }`}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {filtered.map((post) => {
                const lang = languages.find((l) => l.code === post.language);
                const isExpanded = expandedPost === post.id;
                const isLiked = likedPosts.has(post.id);
                return (
                  <div key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <span className="text-4xl">{post.avatar}</span>
                          {post.author.includes('老师') && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                              <Award className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-800">{post.author}</span>
                            <span className="text-sm px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">{lang?.flag}</span>
                            <span className="text-xs text-slate-400">{post.createdAt}</span>
                          </div>
                          <h2 className="text-lg font-bold text-slate-800 mb-2 hover:text-emerald-600 cursor-pointer transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{post.content}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2.5 py-1 bg-emerald-50 rounded-full text-emerald-600">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-1.5 text-sm font-medium transition-all ${
                              isLiked ? 'text-pink-500' : 'text-slate-500 hover:text-pink-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            {post.likes + (isLiked ? 1 : 0)}
                          </button>
                          <button
                            onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-500 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {post.replies.length} 回复
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                            <Bookmark className="w-4 h-4 text-slate-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                            <Share2 className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50 p-6">
                        <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          回复 ({post.replies.length})
                        </h4>
                        <div className="space-y-3 mb-4">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="p-4 bg-white rounded-xl border border-slate-200">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">{reply.avatar}</span>
                                <div>
                                  <span className="font-medium text-slate-800">{reply.author}</span>
                                  <span className="text-xs text-slate-400 ml-2">{reply.createdAt}</span>
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 ml-8">{reply.content}</p>
                              <div className="flex items-center gap-1 mt-2 ml-8">
                                <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-pink-500">
                                  <ThumbsUp className="w-3 h-3" />
                                  {reply.likes}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="写下你的回复..."
                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <button className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            回复
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  活跃用户
                </h3>
                <div className="space-y-3">
                  {[
                    { name: '语言探索者', posts: 28, avatar: '🧑‍🎓' },
                    { name: '东京留学生', posts: 21, avatar: '👨‍🎓' },
                    { name: '韩语达人', posts: 18, avatar: '🧑‍💼' },
                    { name: '法语老师', posts: 15, avatar: '👨‍🏫' },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                      <span className="text-2xl">{user.avatar}</span>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 text-sm">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.posts} 帖子</p>
                      </div>
                      <span className="text-xs text-amber-500 font-medium">#{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
                <h3 className="font-bold mb-2">💡 社区准则</h3>
                <ul className="text-sm space-y-2 text-white/90">
                  <li>• 友善交流，互相尊重</li>
                  <li>• 分享真实学习经验</li>
                  <li>• 帮助新手成长</li>
                  <li>• 禁止广告和垃圾信息</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'partners' && (
        <section>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full mb-4">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">找到你的语言伙伴</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              语言伙伴匹配
            </h2>
            <p className="text-slate-600">与目标语言为母语的人结对学习，互相帮助</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languagePartners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-purple-200 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <span className="text-5xl">{partner.avatar}</span>
                    {partner.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800">{partner.name}</h3>
                      {partner.online && (
                        <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full">在线</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      <span className="text-emerald-600">{partner.nativeLang}</span>
                      {' → '}
                      <span className="text-blue-600">{partner.learningLang}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">水平: {partner.level}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4">{partner.bio}</p>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  可用时间: {partner.activeTime}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {partner.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    发起聊天
                  </button>
                  <button className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
                    查看资料
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-white border-2 border-purple-300 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              查看更多语言伙伴
            </button>
          </div>
        </section>
      )}

      {activeTab === 'topics' && (
        <section>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-rose-600" />
              <span className="text-sm font-medium text-rose-700">热门讨论</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              热门话题
            </h2>
            <p className="text-slate-600">加入讨论，与其他学习者一起交流心得</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {discussionTopics.map((topic) => (
              <div key={topic.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-rose-200 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-3xl">
                    {topic.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-slate-800">{topic.title}</h3>
                      {topic.hot && (
                        <span className="text-xs px-2 py-0.5 bg-rose-100 text-rose-600 rounded-full flex items-center gap-1">
                          🔥 热门
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {topic.posts} 帖子
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {topic.participants} 参与
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
