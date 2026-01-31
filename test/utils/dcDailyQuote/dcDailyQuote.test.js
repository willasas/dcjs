/**
 * dcDailyQuote 测试用例
 */
const DailyQuote = require('../../../src/utils/dcDailyQuote');

describe('DailyQuote', () => {
  // Mock DOM 环境
  beforeEach(() => {
    global.window = {
      speechSynthesis: {
        speak: jest.fn(),
        cancel: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        getVoices: jest.fn(() => [
          { name: 'Google Chinese (Simplified)', lang: 'zh-CN' },
          { name: 'Google Chinese (Traditional)', lang: 'zh-TW' }
        ])
      }
    };

    global.document = {
      querySelector: jest.fn(() => ({
        innerHTML: '',
        querySelector: jest.fn((selector) => {
          if (selector === '.quote-content') return { textContent: '' };
          if (selector === '.quote-index') return { textContent: '' };
          if (selector === '.quote-prev') return { addEventListener: jest.fn() };
          if (selector === '.quote-play') return { addEventListener: jest.fn() };
          if (selector === '.quote-next') return { addEventListener: jest.fn() };
          return null;
        }),
        addEventListener: jest.fn()
      })),
      head: {
        appendChild: jest.fn()
      },
      createElement: jest.fn(() => ({
        id: '',
        innerHTML: '',
        appendChild: jest.fn()
      })),
      querySelectorAll: jest.fn(() => [])
    };

    global.SpeechSynthesisUtterance = jest.fn(function(text) {
      this.text = text;
      this.lang = 'zh-CN';
      this.rate = 1;
      this.pitch = 1;
      this.onend = null;
      this.onerror = null;
    });

    global.Date = jest.fn(() => ({
      getFullYear: jest.fn(() => 2024),
      getMonth: jest.fn(() => 0),
      getDate: jest.fn(() => 1)
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('初始化 DailyQuote', () => {
      const container = document.querySelector('.container');
      const quote = new DailyQuote({ container });
      expect(quote).toBeInstanceOf(DailyQuote);
    });

    test('初始化失败', () => {
      console.error = jest.fn();
      const quote = new DailyQuote({ container: null });
      expect(quote).toBeInstanceOf(DailyQuote);
    });
  });

  describe('getCurrentQuote', () => {
    test('获取当前语句', () => {
      const quote = new DailyQuote();
      const currentQuote = quote.getCurrentQuote();
      expect(typeof currentQuote).toBe('string');
    });
  });

  describe('getCurrentIndex', () => {
    test('获取当前索引', () => {
      const quote = new DailyQuote();
      const index = quote.getCurrentIndex();
      expect(typeof index).toBe('number');
      expect(index).toBeGreaterThanOrEqual(0);
    });
  });

  describe('next', () => {
    test('切换到下一句', () => {
      const quote = new DailyQuote();
      const initialIndex = quote.getCurrentIndex();
      quote.next();
      const newIndex = quote.getCurrentIndex();
      expect(newIndex).toBe((initialIndex + 1) % quote.quotes.length);
    });
  });

  describe('previous', () => {
    test('切换到上一句', () => {
      const quote = new DailyQuote();
      const initialIndex = quote.getCurrentIndex();
      quote.previous();
      const newIndex = quote.getCurrentIndex();
      expect(newIndex).toBe((initialIndex - 1 + quote.quotes.length) % quote.quotes.length);
    });
  });

  describe('speak', () => {
    test('朗读当前语句', () => {
      const quote = new DailyQuote();
      quote.speak();
      expect(window.speechSynthesis.speak).toHaveBeenCalled();
    });
  });

  describe('stop', () => {
    test('停止朗读', () => {
      const quote = new DailyQuote();
      quote.stop();
      expect(window.speechSynthesis.cancel).toHaveBeenCalled();
    });
  });

  describe('pause', () => {
    test('暂停朗读', () => {
      const quote = new DailyQuote();
      quote.pause();
      expect(window.speechSynthesis.pause).toHaveBeenCalled();
    });
  });

  describe('resume', () => {
    test('恢复朗读', () => {
      const quote = new DailyQuote();
      quote.resume();
      expect(window.speechSynthesis.resume).toHaveBeenCalled();
    });
  });

  describe('setLanguage', () => {
    test('设置朗读语言', () => {
      const quote = new DailyQuote();
      quote.setLanguage('zh-TW');
      expect(quote.options.language).toBe('zh-TW');
    });
  });

  describe('setRate', () => {
    test('设置朗读语速', () => {
      const quote = new DailyQuote();
      quote.setRate(2);
      expect(quote.options.rate).toBe(2);
    });

    test('设置语速超出范围', () => {
      const quote = new DailyQuote();
      quote.setRate(20);
      expect(quote.options.rate).toBe(10);

      quote.setRate(0);
      expect(quote.options.rate).toBe(0.1);
    });
  });

  describe('setPitch', () => {
    test('设置音调', () => {
      const quote = new DailyQuote();
      quote.setPitch(1.5);
      expect(quote.options.pitch).toBe(1.5);
    });

    test('设置音调超出范围', () => {
      const quote = new DailyQuote();
      quote.setPitch(3);
      expect(quote.options.pitch).toBe(2);

      quote.setPitch(-1);
      expect(quote.options.pitch).toBe(0);
    });
  });

  describe('getVoices', () => {
    test('获取可用的语音列表', () => {
      const quote = new DailyQuote();
      const voices = quote.getVoices();
      expect(Array.isArray(voices)).toBe(true);
    });
  });

  describe('setVoice', () => {
    test('设置特定语音', () => {
      const quote = new DailyQuote();
      quote.currentUtterance = {};
      quote.setVoice('Google Chinese (Simplified)');
      expect(quote.currentUtterance.voice).toBeDefined();
    });
  });

  describe('destroy', () => {
    test('销毁实例', () => {
      const quote = new DailyQuote({ container: '.container' });
      quote.destroy();
      expect(quote.options).toBeNull();
      expect(quote.quotes).toBeNull();
      expect(quote.currentIndex).toBe(0);
    });
  });
});
