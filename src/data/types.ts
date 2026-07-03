export interface CorpusItem {
  id: string;
  language: string;
  category: string;
  title: string;
  original: string;
  translation: string;
  annotations: Annotation[];
  source: string;
  difficulty: string;
  tags: string[];
}

export interface Annotation {
  word: string;
  phonetic: string;
  meaning: string;
  grammar?: string;
}

export interface ExamPaper {
  id: string;
  language: string;
  examType: string;
  year: string;
  title: string;
  sections: ExamSection[];
  source: string;
}

export interface ExamSection {
  title: string;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  type: 'reading' | 'listening' | 'writing' | 'speaking' | 'grammar' | 'vocabulary';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  original?: string;
  translation?: string;
}

export interface Article {
  id: string;
  language: string;
  source: string;
  sourceUrl: string;
  title: string;
  author: string;
  publishedAt: string;
  category: string;
  content: ContentBlock[];
  difficulty: string;
  tags: string[];
  coverImage?: string;
}

export interface ContentBlock {
  type: 'text' | 'annotation' | 'translation' | 'highlight';
  content: string;
  annotation?: Annotation;
}

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  language: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  replies: ForumReply[];
  createdAt: string;
}

export interface ForumReply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  language: string;
  type: 'pdf' | 'audio' | 'video' | 'ebook' | 'dataset';
  size: string;
  description: string;
  downloadUrl: string;
  source: string;
  tags: string[];
  downloads: number;
}

export const languages = [
  { code: 'english', label: '英语', flag: '🇬🇧', color: 'from-blue-500 to-indigo-500' },
  { code: 'japanese', label: '日语', flag: '🇯🇵', color: 'from-red-500 to-rose-500' },
  { code: 'korean', label: '韩语', flag: '🇰🇷', color: 'from-purple-500 to-violet-500' },
  { code: 'french', label: '法语', flag: '🇫🇷', color: 'from-sky-500 to-blue-500' },
  { code: 'german', label: '德语', flag: '🇩🇪', color: 'from-amber-500 to-yellow-500' },
  { code: 'spanish', label: '西班牙语', flag: '🇪🇸', color: 'from-orange-500 to-red-500' },
  { code: 'russian', label: '俄语', flag: '🇷🇺', color: 'from-slate-500 to-blue-700' },
  { code: 'chinese', label: '中文', flag: '🇨🇳', color: 'from-red-600 to-amber-500' },
];
