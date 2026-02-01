/**
 * @file dcDailyQuote.test.js
 * @description 每日一言工具类测试
 * @author DC.js Team
 * @version 1.0.0
 */

// 模拟浏览器API
if (typeof window === 'undefined') {
  global.window = {}
  global.document = {
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
    createElement: jest.fn(() => ({
      id: '',
      innerHTML: '',
      appendChild: jest.fn(),
      addEventListener: jest.fn()
    })),
    head: {
      appendChild: jest.fn()
    }
  }
  global.SpeechSynthesisUtterance = class MockSpeechSynthesisUtterance {
    constructor(text) {
      this.text = text
      this.lang = 'zh-CN'
      this.rate = 1
      this.pitch = 1
      this.voice = null
      this.onend = null
      this.onerror = null
    }
  }
  global.window.speechSynthesis = {
    speak: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn(() => [
      { name: 'Chinese Female', lang: 'zh-CN' },
      { name: 'Chinese Male', lang: 'zh-CN' }
    ])
  }
}

const DailyQuote = require('../../../src/utils/dcDailyQuote')

describe('DailyQuote', () => {
  let dailyQuote
  let container

  beforeEach(() => {
    // 重置mock
    jest.clearAllMocks()
    
    // 创建模拟容器
    container = {
      innerHTML: '',
      querySelector: jest.fn((selector) => {
        if (selector === '.quote-prev') return { addEventListener: jest.fn() }
        if (selector === '.quote-play') return { addEventListener: jest.fn() }
        if (selector === '.quote-next') return { addEventListener: jest.fn() }
        if (selector === '.quote-content') return { textContent: '' }
        if (selector === '.quote-index') return { textContent: '' }
        return null
      }),
      querySelectorAll: jest.fn()
    }
    
    // 模拟document.querySelector
    if (global.document) {
      global.document.querySelector = jest.fn((selector) => {
        if (selector === '#test-container') return container
        return null
      })
    }
  })

  afterEach(() => {
    if (dailyQuote) {
      dailyQuote.destroy()
      dailyQuote = null
    }
  })

  test('should create instance with default options', () => {
    dailyQuote = new DailyQuote()
    expect(dailyQuote).toBeInstanceOf(DailyQuote)
    expect(dailyQuote.getCurrentQuote()).toBeTruthy()
  })

  test('should create instance with custom options', () => {
    const onQuoteChange = jest.fn()
    const onError = jest.fn()
    
    dailyQuote = new DailyQuote({
      container: '#test-container',
      language: 'zh-TW',
      rate: 1.5,
      pitch: 1.2,
      autoPlay: false,
      onQuoteChange,
      onError
    })
    
    expect(dailyQuote).toBeInstanceOf(DailyQuote)
  })

  test('should get current quote', () => {
    dailyQuote = new DailyQuote()
    const quote = dailyQuote.getCurrentQuote()
    expect(typeof quote).toBe('string')
    expect(quote.length).toBeGreaterThan(0)
  })

  test('should get current index', () => {
    dailyQuote = new DailyQuote()
    const index = dailyQuote.getCurrentIndex()
    expect(typeof index).toBe('number')
    expect(index).toBeGreaterThanOrEqual(0)
  })

  test('should navigate to next quote', () => {
    dailyQuote = new DailyQuote()
    const initialIndex = dailyQuote.getCurrentIndex()
    dailyQuote.next()
    const newIndex = dailyQuote.getCurrentIndex()
    expect(newIndex).toBe((initialIndex + 1) % 100)
  })

  test('should navigate to previous quote', () => {
    dailyQuote = new DailyQuote()
    const initialIndex = dailyQuote.getCurrentIndex()
    dailyQuote.previous()
    const newIndex = dailyQuote.getCurrentIndex()
    expect(newIndex).toBe((initialIndex - 1 + 100) % 100)
  })

  test('should speak current quote', () => {
    dailyQuote = new DailyQuote()
    dailyQuote.speak()
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  test('should stop speaking', () => {
    dailyQuote = new DailyQuote()
    dailyQuote.stop()
    expect(window.speechSynthesis.cancel).toHaveBeenCalled()
  })

  test('should pause speaking', () => {
    dailyQuote = new DailyQuote()
    dailyQuote.pause()
    expect(window.speechSynthesis.pause).toHaveBeenCalled()
  })

  test('should resume speaking', () => {
    dailyQuote = new DailyQuote()
    dailyQuote.resume()
    expect(window.speechSynthesis.resume).toHaveBeenCalled()
  })

  test('should set language', () => {
    dailyQuote = new DailyQuote()
    dailyQuote.setLanguage('zh-TW')
    // 测试speak方法是否使用新的语言设置
    dailyQuote.speak()
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  test('should set rate', () => {
    dailyQuote = new DailyQuote()
    dailyQuote.setRate(2)
    dailyQuote.speak()
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  test('should set pitch', () => {
    dailyQuote = new DailyQuote()
    dailyQuote.setPitch(1.5)
    dailyQuote.speak()
    expect(window.speechSynthesis.speak).toHaveBeenCalled()
  })

  test('should get voices', () => {
    dailyQuote = new DailyQuote()
    const voices = dailyQuote.getVoices()
    expect(Array.isArray(voices)).toBe(true)
  })

  test('should set voice', () => {
    dailyQuote = new DailyQuote()
    dailyQuote.setVoice('Chinese Female')
    // 测试是否调用了getVoices
    expect(window.speechSynthesis.getVoices).toHaveBeenCalled()
  })

  test('should handle speech synthesis not available', () => {
    // 保存原始speechSynthesis
    const originalSpeechSynthesis = window.speechSynthesis
    window.speechSynthesis = null
    
    dailyQuote = new DailyQuote()
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    
    dailyQuote.speak()
    expect(consoleErrorSpy).toHaveBeenCalled()
    
    // 恢复原始speechSynthesis
    window.speechSynthesis = originalSpeechSynthesis
    consoleErrorSpy.mockRestore()
  })

  test('should destroy instance', () => {
    dailyQuote = new DailyQuote({ container: '#test-container' })
    dailyQuote.destroy()
    expect(dailyQuote.options).toBeNull()
    expect(dailyQuote.quotes).toBeNull()
    expect(dailyQuote.currentIndex).toBe(0)
  })

  test('should handle container not found', () => {
    if (global.document) {
      global.document.querySelector = jest.fn(() => null)
    }
    
    expect(() => {
      dailyQuote = new DailyQuote({ container: '#non-existent-container' })
    }).toThrow('容器元素未找到')
  })

  test('should trigger onQuoteChange callback', () => {
    const onQuoteChange = jest.fn()
    dailyQuote = new DailyQuote({ onQuoteChange })
    
    dailyQuote.next()
    expect(onQuoteChange).toHaveBeenCalledWith(expect.objectContaining({
      index: expect.any(Number),
      quote: expect.any(String),
      total: 100
    }))
  })

  test('should handle errors', () => {
    const onError = jest.fn()
    dailyQuote = new DailyQuote({ onError })
    
    // 模拟speechSynthesis错误
    if (window.speechSynthesis) {
      window.speechSynthesis.speak = jest.fn(() => {
        throw new Error('Speech synthesis error')
      })
    }
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    dailyQuote.speak()
    
    expect(consoleErrorSpy).toHaveBeenCalled()
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.any(String),
      error: expect.any(Error)
    }))
    
    consoleErrorSpy.mockRestore()
  })

  test('should render DOM structure when container is provided', () => {
    dailyQuote = new DailyQuote({ container: '#test-container' })
    expect(container.innerHTML).toContain('dc-daily-quote')
    expect(container.innerHTML).toContain('quote-content')
    expect(container.innerHTML).toContain('quote-controls')
  })

  test('should update display when quote changes', () => {
    dailyQuote = new DailyQuote({ container: '#test-container' })
    const initialQuote = dailyQuote.getCurrentQuote()
    
    dailyQuote.next()
    const newQuote = dailyQuote.getCurrentQuote()
    expect(newQuote).not.toBe(initialQuote)
  })

  test('should handle autoPlay option', () => {
    const speakSpy = jest.spyOn(DailyQuote.prototype, 'speak').mockImplementation()
    
    dailyQuote = new DailyQuote({ autoPlay: true })
    
    // 等待setTimeout执行
    setTimeout(() => {
      expect(speakSpy).toHaveBeenCalled()
      speakSpy.mockRestore()
    }, 1100)
  })
})
