import { useState } from 'react';
import {
  BookOpen, Brain, Lightbulb, ArrowRight, Search,
  Star, Clock, ChevronDown, ChevronUp, Copy, CheckCheck
} from 'lucide-react';

const grammarTips = [
  {
    id: 'en-1',
    language: 'english',
    flag: '🇬🇧',
    category: '时态',
    title: '现在完成时的"经验"用法',
    difficulty: 'B1',
    color: 'blue',
    icon: '⏰',
    tips: [
      {
        title: '核心公式',
        content: 'have/has + past participle (过去分词)',
        example: 'I have visited Tokyo twice.',
        translation: '我去过东京两次。',
        note: '表示到目前为止的人生经历，不强调具体时间'
      },
      {
        title: '标志词',
        content: 'ever, never, before, yet, already, just',
        example: 'Have you ever tried sushi? — No, never.',
        translation: '你吃过寿司吗？— 没有，从来没有。',
        note: '这些词经常出现在现在完成时的题目中'
      },
      {
        title: '易错点',
        content: '不要用具体过去时间',
        example: '✗ I have visited Tokyo in 2020.',
        correct: '✓ I visited Tokyo in 2020. / ✓ I have visited Tokyo.',
        note: '具体时间要和一般过去时连用'
      }
    ],
    memoryTrick: '想象时间线从过去延伸到现在，"现在完成"就是连接点还在现在'
  },
  {
    id: 'en-2',
    language: 'english',
    flag: '🇬🇧',
    category: '从句',
    title: '条件从句的三种类型',
    difficulty: 'B2',
    color: 'purple',
    icon: '🔀',
    tips: [
      {
        title: '第一类条件（真实可能）',
        content: 'If + 一般现在时, will + 动词原形',
        example: 'If it rains tomorrow, I will stay home.',
        translation: '如果明天下雨，我就待在家里。',
        note: '事情很可能发生'
      },
      {
        title: '第二类条件（假设情况）',
        content: 'If + 一般过去时, would + 动词原形',
        example: 'If I had more money, I would travel more.',
        translation: '如果我有更多钱，我会旅行更多。',
        note: '与现在事实相反的假设'
      },
      {
        title: '第三类条件（过去假设）',
        content: 'If + 过去完成时, would have + 过去分词',
        example: 'If I had studied harder, I would have passed the exam.',
        translation: '如果我当时学习更努力，我就能通过考试了。',
        note: '与过去事实相反，无法改变'
      }
    ],
    memoryTrick: '记住"时态倒退"原则：从句比主句早一个时态'
  },
  {
    id: 'en-3',
    language: 'english',
    flag: '🇬🇧',
    category: '介词',
    title: '时间介词 in, on, at 的用法',
    difficulty: 'A2',
    color: 'emerald',
    icon: '📅',
    tips: [
      {
        title: 'in — 较长的时间',
        content: 'in + 年份/月份/季节/上午/下午/晚上',
        example: 'in 2024, in January, in winter, in the morning',
        translation: '在2024年，在1月，在冬天，在上午',
        note: '记住：in 后面跟的是"大块"时间'
      },
      {
        title: 'on — 具体某天',
        content: 'on + 日期/星期/具体节日',
        example: 'on Monday, on January 1st, on Christmas Day',
        translation: '在周一，在1月1日，在圣诞节',
        note: '具体到"一天"用 on'
      },
      {
        title: 'at — 精确时刻',
        content: 'at + 钟点/节日期间/固定搭配',
        example: 'at 8 o\'clock, at noon, at night, at the weekend',
        translation: '在8点，在中午，在晚上，在周末',
        note: 'at night 是固定搭配，没有 in'
      }
    ],
    memoryTrick: '想象时间大小：in > on > at（从大到小）'
  },
  {
    id: 'jp-1',
    language: 'japanese',
    flag: '🇯🇵',
    category: '助词',
    title: 'は和が的区别与使用',
    difficulty: 'N4',
    color: 'rose',
    icon: '🔍',
    tips: [
      {
        title: 'は — 主题标记',
        content: '强调句子的话题/主题',
        example: '私は学生です。',
        translation: '我是学生。（关于"我"的话题）',
        note: 'は揭示句子要讨论的主题'
      },
      {
        title: 'が — 主语标记',
        content: '强调动作的主体或新信息',
        example: '誰がいますか。田中さんがいます。',
        translation: '谁在？田中在。',
        note: '回答中的"田中さん"是新信息，用が'
      },
      {
        title: '区别技巧',
        content: 'が提示已知信息的回答',
        example: '—どの人が田中さんですか。—この人が田中さんです。',
        translation: '—哪个人是田中？—这个人是田中。',
        note: '问句中用は的地方，回答用が'
      }
    ],
    memoryTrick: 'は=话题（Topic），が=主语（Subject）；话题是"关于...说"，主语是"谁在做..."'
  },
  {
    id: 'jp-2',
    language: 'japanese',
    flag: '🇯🇵',
    category: '动词变形',
    title: '动词て形的多种用法',
    difficulty: 'N5',
    color: 'amber',
    icon: '🔄',
    tips: [
      {
        title: 'て形的变化规则',
        content: '一类：く→いて / ぐ→いで\n二类：る→て\n三类：する→して / 来る→来て',
        example: '書く→書いて、食べる→食べて、する→して',
        translation: '写→写着、吃→吃了/做着、做→做着、来→来着',
        note: '不规则动词只有两个：する和来る'
      },
      {
        title: '用法1：动作顺序',
        content: '表示先后发生的动作',
        example: '朝起きて、歯を磨いて、学校へ“行”きます。',
        translation: '早上起床、刷牙、去学校。',
        note: '相当于汉语的"然后...然后..."'
      },
      {
        title: '用法2：请求许可',
        content: 'て + ください/もいいですか',
        example: 'この本を開けてもいいですか。',
        translation: '可以打开这本书吗？',
        note: '请求别人让自己做某事'
      }
    ],
    memoryTrick: 'て形就像"手"，连接前后、请求别人、表示进行状态'
  },
  {
    id: 'jp-3',
    language: 'japanese',
    flag: '🇯🇵',
    category: '敬语',
    title: '日语敬语入门：尊敬语与谦让语',
    difficulty: 'N3',
    color: 'violet',
    icon: '🙇',
    tips: [
      {
        title: '尊敬语 — 抬高对方',
        content: 'お + 动词ます形 + になります\n客户/上司的行为用尊敬语',
        example: '先生はお帰りになりますか。',
        translation: '老师您要回去吗？',
        note: '用于描述长辈或客户的动作'
      },
      {
        title: '谦让语 — 降低自己',
        content: 'お + 动词ます形 + します\n自己的行为对对方用谦让语',
        example: '私は先生にお茶をお持ちします。',
        translation: '我给老师端茶。',
        note: '表示自己的行为是为了对方'
      },
      {
        title: '常见替换',
        content: '行く/来る/話す → 参る/申す/申し上げる\n見る → 拝見する　聞く → 伺う',
        example: '明日参ります。（我去。）',
        translation: '我去。',
        note: '这些是固定的谦让语词汇'
      }
    ],
    memoryTrick: '尊敬语 = 抬高对方（对方做什么）；谦让语 = 贬低自己（自己为对方做什么）'
  },
  {
    id: 'kr-1',
    language: 'korean',
    flag: '🇰🇷',
    category: '终结词尾',
    title: '韩语阶称的正确使用',
    difficulty: 'TOPIK I',
    color: 'cyan',
    icon: '🎭',
    tips: [
      {
        title: '基本阶称',
        content: '해라체：正式书面语，对象\n해요체：礼貌口语，普遍适用\n해체：非敬语，朋友间',
        example: '이것은 책입니다. / 이것은 책이에요.',
        translation: '这是书。',
        note: '日常对话主要用해요체'
      },
      {
        title: '终结词尾列表',
        content: '합쇼체：-습니다/ㅂ니다（最正式）\n해요체：-아요/어요/해요（日常）\n해체：-아/어/해（朋友）\n해라체：-다（书面/长辈对晚辈）',
        example: '밥을 먹었습니다. / 밥을 먹었어요.',
        translation: '吃饭了。',
        note: '韩国人很重视说话的分寸，选择合适的阶称很重要'
      },
      {
        title: '特殊变化',
        content: '有收音 + 아요/어요\n无收音 + 아요\n하다 → 해요',
        example: '가다 → 갔어요 / 먹다 → 먹었어요 / 하다 → 했어요',
        translation: '去→去了 / 吃→吃了 / 做→做了',
        note: '过去式在해요체后面加었/았'
      }
    ],
    memoryTrick: '记住选择原则：对不熟的人、年长者、正式场合 → 用更高的敬语级别'
  },
  {
    id: 'kr-2',
    language: 'korean',
    flag: '🇰🇷',
    category: '助词',
    title: '는/은、가/이、를/을 的区别',
    difficulty: 'TOPIK I',
    color: 'emerald',
    icon: '📝',
    tips: [
      {
        title: '은/는 — 提示主题或对比',
        content: '은用于有收音，는用于无收音\n相当于日语的"は"',
        example: '나는 학생이다. / 사과가 맛있다.',
        translation: '我是学生。 / 苹果好吃。',
        note: '은/는可以强调主题或对比'
      },
      {
        title: '이/가 — 提示主语或新信息',
        content: '이用于有收音，가用于无收音\n强调主语或引入新信息',
        example: '누가 왔어요? / 한국어가 좋아요.',
        translation: '谁来啦？ / 韩语很好。',
        note: '回答时用이/가'
      },
      {
        title: '을/를 — 宾语标记',
        content: '을用于有收音，를用于无收音\n宾语在动词前面',
        example: '밥을 먹어요. / 물을 마셔요.',
        translation: '吃饭。 / 喝水。',
        note: '韩语的宾语在动词前，和中文一样'
      }
    ],
    memoryTrick: '은/는 = 关于...（话题），이/가 = 谁/什么...（主语），을/를 = 宾语（被动作的对象）'
  },
];

const categories = ['全部', '时态', '从句', '介词', '助词', '动词变形', '敬语', '终结词尾'];
const difficulties = ['全部', 'A2', 'B1', 'B2', 'N5', 'N4', 'N3', 'TOPIK I'];

export default function Grammar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState('全部');
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({});
  const [copiedTip, setCopiedTip] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTip(id);
    setTimeout(() => setCopiedTip(null), 2000);
  };

  const filteredTips = grammarTips.filter((tip) => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || tip.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === '全部' || tip.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-6">
      <section className="py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-4">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">实用语法技巧</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            语法技巧精华
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            提炼核心语法规则，配合记忆技巧和实例讲解，让语法不再成为学习障碍
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="搜索语法技巧..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedDifficulty === diff
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleExpand(tip.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      tip.color === 'blue' ? 'from-blue-500 to-indigo-500' :
                      tip.color === 'purple' ? 'from-purple-500 to-pink-500' :
                      tip.color === 'emerald' ? 'from-emerald-500 to-teal-500' :
                      tip.color === 'rose' ? 'from-rose-500 to-pink-500' :
                      tip.color === 'amber' ? 'from-amber-500 to-orange-500' :
                      tip.color === 'violet' ? 'from-violet-500 to-purple-500' :
                      'from-cyan-500 to-blue-500'
                    } flex items-center justify-center text-2xl shadow-md`}>
                      {tip.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{tip.flag}</span>
                        <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">
                          {tip.category}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-blue-50 rounded-full text-blue-600">
                          {tip.difficulty}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{tip.title}</h3>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                    {expandedTips[tip.id] ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {expandedTips[tip.id] && (
                <div className="px-6 pb-6 border-t border-slate-100 pt-6">
                  <div className="space-y-4 mb-6">
                    {tip.tips.map((t, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-slate-800">{t.title}</h4>
                          <button
                            onClick={() => copyToClipboard(t.example, `${tip.id}-${index}`)}
                            className="p-1.5 rounded-lg hover:bg-white transition-colors"
                          >
                            {copiedTip === `${tip.id}-${index}` ? (
                              <CheckCheck className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{t.content}</p>
                        <div className="p-3 bg-white rounded-lg border border-slate-200 mb-2">
                          <p className="text-sm font-medium text-slate-800 italic">"{t.example}"</p>
                          <p className="text-sm text-slate-600">{t.translation}</p>
                        </div>
                        {t.correct && (
                          <div className="p-2 bg-emerald-50 rounded-lg">
                            <p className="text-xs text-emerald-600">
                              <span className="font-medium">正确表达：</span>{t.correct}
                            </p>
                          </div>
                        )}
                        {t.note && (
                          <p className="text-xs text-amber-600 mt-2 flex items-start gap-1">
                            <Star className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            {t.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-amber-600" />
                      <span className="font-semibold text-amber-800">记忆技巧</span>
                    </div>
                    <p className="text-sm text-amber-700">{tip.memoryTrick}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">没有找到匹配的语法技巧</p>
          </div>
        )}
      </section>

      <section className="pb-12">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              需要更多帮助？
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              加入学习社区，与其他学习者交流语法心得，互相解答疑惑
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/forum"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                进入社区讨论
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/corpus"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                查看更多语料
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
