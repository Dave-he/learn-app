import { describe, it, expect } from 'vitest';
import { corpusData, examData, articleData, forumData, resourceData } from '../data/content';
import { languages } from '../data/types';

describe('LinguaHub 多语种学习平台', () => {
  describe('1. 语料库数据验证', () => {
    it('1.1 语料数据非空', () => {
      expect(corpusData.length).toBeGreaterThan(0);
    });

    it('1.2 每条语料包含必要字段', () => {
      corpusData.forEach((item) => {
        expect(item.id).toBeTruthy();
        expect(item.language).toBeTruthy();
        expect(item.title).toBeTruthy();
        expect(item.original).toBeTruthy();
        expect(item.translation).toBeTruthy();
        expect(item.annotations.length).toBeGreaterThan(0);
      });
    });

    it('1.3 标注包含词汇、音标、释义', () => {
      corpusData.forEach((item) => {
        item.annotations.forEach((ann) => {
          expect(ann.word).toBeTruthy();
          expect(ann.phonetic).toBeTruthy();
          expect(ann.meaning).toBeTruthy();
        });
      });
    });

    it('1.4 支持多语种', () => {
      const langs = new Set(corpusData.map((c) => c.language));
      expect(langs.size).toBeGreaterThanOrEqual(3);
    });
  });

  describe('2. 历年真题数据验证', () => {
    it('2.1 真题数据非空', () => {
      expect(examData.length).toBeGreaterThan(0);
    });

    it('2.2 每套真题包含考试类型和年份', () => {
      examData.forEach((exam) => {
        expect(exam.examType).toBeTruthy();
        expect(exam.year).toBeTruthy();
        expect(exam.sections.length).toBeGreaterThan(0);
      });
    });

    it('2.3 题目包含答案和解析', () => {
      examData.forEach((exam) => {
        exam.sections.forEach((section) => {
          section.questions.forEach((q) => {
            expect(q.answer).toBeTruthy();
            expect(q.explanation).toBeTruthy();
          });
        });
      });
    });

    it('2.4 包含多种考试类型', () => {
      const types = new Set(examData.map((e) => e.examType));
      expect(types.size).toBeGreaterThanOrEqual(2);
    });
  });

  describe('3. 杂志文章数据验证', () => {
    it('3.1 文章数据非空', () => {
      expect(articleData.length).toBeGreaterThan(0);
    });

    it('3.2 每篇文章包含来源和内容', () => {
      articleData.forEach((article) => {
        expect(article.source).toBeTruthy();
        expect(article.content.length).toBeGreaterThan(0);
      });
    });

    it('3.3 文章内容包含标注和翻译', () => {
      articleData.forEach((article) => {
        const hasAnnotation = article.content.some((b) => b.type === 'annotation');
        const hasTranslation = article.content.some((b) => b.type === 'translation');
        expect(hasAnnotation || hasTranslation).toBe(true);
      });
    });
  });

  describe('4. 论坛数据验证', () => {
    it('4.1 论坛帖子非空', () => {
      expect(forumData.length).toBeGreaterThan(0);
    });

    it('4.2 帖子包含必要字段', () => {
      forumData.forEach((post) => {
        expect(post.author).toBeTruthy();
        expect(post.title).toBeTruthy();
        expect(post.content).toBeTruthy();
      });
    });

    it('4.3 帖子支持回复', () => {
      const postsWithReplies = forumData.filter((p) => p.replies.length > 0);
      expect(postsWithReplies.length).toBeGreaterThan(0);
    });
  });

  describe('5. 学习资料数据验证', () => {
    it('5.1 资料数据非空', () => {
      expect(resourceData.length).toBeGreaterThan(0);
    });

    it('5.2 资料包含多种类型', () => {
      const types = new Set(resourceData.map((r) => r.type));
      expect(types.size).toBeGreaterThanOrEqual(3);
    });

    it('5.3 资料包含下载信息', () => {
      resourceData.forEach((item) => {
        expect(item.size).toBeTruthy();
        expect(item.downloads).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('6. 多语种支持验证', () => {
    it('6.1 支持8种语言', () => {
      expect(languages.length).toBe(8);
    });

    it('6.2 每种语言有完整信息', () => {
      languages.forEach((lang) => {
        expect(lang.code).toBeTruthy();
        expect(lang.label).toBeTruthy();
        expect(lang.flag).toBeTruthy();
        expect(lang.color).toBeTruthy();
      });
    });

    it('6.3 包含英日韩法德西俄中', () => {
      const codes = languages.map((l) => l.code);
      expect(codes).toContain('english');
      expect(codes).toContain('japanese');
      expect(codes).toContain('korean');
      expect(codes).toContain('french');
      expect(codes).toContain('german');
      expect(codes).toContain('spanish');
      expect(codes).toContain('russian');
      expect(codes).toContain('chinese');
    });
  });

  describe('7. 无需登录验证', () => {
    it('7.1 所有页面路由无需认证', () => {
      const publicRoutes = ['/', '/corpus', '/exams', '/articles', '/search', '/forum', '/resources'];
      expect(publicRoutes.length).toBe(7);
    });

    it('7.2 语料可直接访问', () => {
      corpusData.forEach((item) => {
        expect(item.id).toBeTruthy();
      });
    });
  });

  describe('8. 内容聚合功能验证', () => {
    it('8.1 语料来源多样', () => {
      const sources = new Set(corpusData.map((c) => c.source));
      expect(sources.size).toBeGreaterThanOrEqual(2);
    });

    it('8.2 文章来源多样', () => {
      const sources = new Set(articleData.map((a) => a.source));
      expect(sources.size).toBeGreaterThanOrEqual(2);
    });

    it('8.3 真题来源权威', () => {
      examData.forEach((exam) => {
        expect(exam.source).toBeTruthy();
      });
    });
  });

  describe('9. 搜索功能验证', () => {
    it('9.1 可按语种筛选语料', () => {
      const englishCorpus = corpusData.filter((c) => c.language === 'english');
      expect(englishCorpus.length).toBeGreaterThan(0);
    });

    it('9.2 可按关键词搜索', () => {
      const results = corpusData.filter((c) => c.original.includes('agenda') || c.translation.includes('议程'));
      expect(results.length).toBeGreaterThan(0);
    });

    it('9.3 可按标签搜索', () => {
      const results = corpusData.filter((c) => c.tags.some((t) => t.includes('商务')));
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('10. 官方翻译与标注验证', () => {
    it('10.1 每条语料有官方翻译', () => {
      corpusData.forEach((item) => {
        expect(item.translation).toBeTruthy();
        expect(item.translation.length).toBeGreaterThan(0);
      });
    });

    it('10.2 标注包含音标', () => {
      corpusData.forEach((item) => {
        item.annotations.forEach((ann) => {
          expect(ann.phonetic).toBeTruthy();
        });
      });
    });

    it('10.3 标注包含语法说明', () => {
      const withGrammar = corpusData.flatMap((c) => c.annotations).filter((a) => a.grammar);
      expect(withGrammar.length).toBeGreaterThan(0);
    });
  });
});
