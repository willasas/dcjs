/**
 * 内容统计工具类
 * 提供文章字数统计、阅读时间估算等功能
 */
class DCContentStats {
  /**
   * 统计文本字数
   * @param {string} text - 要统计的文本
   * @param {Object} options - 配置选项
   * @param {boolean} options.includeSpaces - 是否包含空格
   * @param {boolean} options.includePunctuation - 是否包含标点符号
   * @returns {Object} 字数统计结果
   */
  static countWords(text, options = {}) {
    const {
      includeSpaces = true,
      includePunctuation = true
    } = options;

    if (!text) {
      return {
        total: 0,
        characters: 0,
        words: 0,
        spaces: 0,
        punctuation: 0
      };
    }

    // 统计总字符数
    const total = text.length;

    // 统计空格数
    const spaces = (text.match(/\s/g) || []).length;

    // 统计标点符号数
    const punctuation = (text.match(/[.,?!;:"'()\[\]{}]/g) || []).length;

    // 统计单词数（简单实现，按空格分割）
    const words = text
      .split(/\s+/)
      .filter(word => word.length > 0)
      .length;

    // 统计实际字符数（根据配置排除空格和标点符号）
    let characters = total;
    if (!includeSpaces) {
      characters -= spaces;
    }
    if (!includePunctuation) {
      characters -= punctuation;
    }

    return {
      total,
      characters,
      words,
      spaces,
      punctuation
    };
  }

  /**
   * 估算阅读时间
   * @param {string} text - 要估算的文本
   * @param {Object} options - 配置选项
   * @param {number} options.wpm - 每分钟阅读单词数（默认值：中文300字/分钟，英文200词/分钟）
   * @param {number} options.images - 图片数量（每张图片增加10秒阅读时间）
   * @param {boolean} options.roundUp - 是否向上取整
   * @returns {Object} 阅读时间估算结果
   */
  static estimateReadingTime(text, options = {}) {
    const {
      wpm,
      images = 0,
      roundUp = true
    } = options;

    if (!text) {
      return {
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        display: '0分钟'
      };
    }

    // 统计字数
    const wordCount = this.countWords(text).words;
    
    // 自动检测语言并设置默认阅读速度
    let readingSpeed = wpm;
    if (!readingSpeed) {
      // 检测是否主要为中文
      const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
      const isChinese = chineseChars / text.length > 0.5;
      readingSpeed = isChinese ? 300 : 200;
    }

    // 计算阅读时间（分钟）
    const minutes = wordCount / readingSpeed;
    
    // 为图片增加阅读时间（每张图片10秒）
    const imageSeconds = images * 10;
    
    // 转换为总秒数
    const totalSeconds = Math.floor(minutes * 60 + imageSeconds);
    
    // 计算分钟和秒数
    let calculatedMinutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // 向上取整
    if (roundUp && seconds > 0) {
      calculatedMinutes++;
      seconds = 0;
    }

    // 生成显示文本
    let display;
    if (calculatedMinutes > 0) {
      display = `${calculatedMinutes}分钟`;
      if (!roundUp && seconds > 0) {
        display += `${seconds}秒`;
      }
    } else {
      display = `${seconds}秒`;
    }

    return {
      minutes: calculatedMinutes,
      seconds,
      totalSeconds,
      display
    };
  }

  /**
   * 分析文本复杂度
   * @param {string} text - 要分析的文本
   * @returns {Object} 文本复杂度分析结果
   */
  static analyzeComplexity(text) {
    if (!text) {
      return {
        fleschScore: 0,
        fleschKincaidGrade: 0,
        avgWordLength: 0,
        avgSentenceLength: 0
      };
    }

    // 统计句子数（简单实现，按句号、问号、感叹号分割）
    const sentences = text
      .split(/[.!?]+/)
      .filter(sentence => sentence.trim().length > 0);
    const sentenceCount = sentences.length;

    // 统计单词数
    const wordCount = this.countWords(text).words;

    // 统计音节数（简单实现，基于单词长度）
    let syllableCount = 0;
    text
      .split(/\s+/)
      .forEach(word => {
        if (word.length > 0) {
          // 简单估算：单词长度小于3为1个音节，3-5为2个音节，大于5为3个音节
          if (word.length < 3) {
            syllableCount += 1;
          } else if (word.length < 6) {
            syllableCount += 2;
          } else {
            syllableCount += 3;
          }
        }
      });

    // 计算平均词长
    const avgWordLength = wordCount > 0 ? text.length / wordCount : 0;

    // 计算平均句子长度
    const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;

    // 计算Flesch阅读 ease score（简化版）
    // 公式：206.835 - (1.015 × 平均句子长度) - (84.6 × 每100词的音节数)
    const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * (syllableCount / wordCount));

    // 计算Flesch-Kincaid年级水平
    // 公式：0.39 × 平均句子长度 + 11.8 × (每100词的音节数) - 15.59
    const fleschKincaidGrade = (0.39 * avgSentenceLength) + (11.8 * (syllableCount / wordCount)) - 15.59;

    return {
      fleschScore: Math.max(0, Math.min(100, fleschScore)),
      fleschKincaidGrade: Math.max(0, fleschKincaidGrade),
      avgWordLength,
      avgSentenceLength
    };
  }

  /**
   * 生成内容摘要
   * @param {string} text - 要生成摘要的文本
   * @param {Object} options - 配置选项
   * @param {number} options.length - 摘要长度（默认值：150）
   * @param {string} options.ellipsis - 省略号（默认值：'...'）
   * @returns {string} 内容摘要
   */
  static generateSummary(text, options = {}) {
    const {
      length = 150,
      ellipsis = '...'
    } = options;

    if (!text) {
      return '';
    }

    if (text.length <= length) {
      return text;
    }

    // 截取文本
    let summary = text.substring(0, length);

    // 尝试在单词边界或句子边界截取
    const lastSpaceIndex = summary.lastIndexOf(' ');
    const lastPunctuationIndex = summary.search(/[.!?,;:"'()\[\]{}]$/);

    if (lastSpaceIndex > length * 0.8) {
      summary = summary.substring(0, lastSpaceIndex);
    } else if (lastPunctuationIndex > length * 0.8) {
      summary = summary.substring(0, lastPunctuationIndex + 1);
    }

    return summary + ellipsis;
  }
}

// 注册到全局DC对象
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.ContentStats = DCContentStats
}

// CommonJS 模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCContentStats
}
