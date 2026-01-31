/**
 * ga 工具类测试
 */
import initGoogleAnalytics from '../../../src/utils/ga.js'

describe('ga 工具类测试', () => {
  beforeEach(() => {
    // 清理全局变量
    delete window._gaq
    // 模拟文档和脚本元素
    document.getElementsByTagName = jest.fn(() => [
      {
        parentNode: {
          insertBefore: jest.fn()
        }
      }
    ])
    // 模拟document.createElement
    document.createElement = jest.fn(() => ({
      type: '',
      async: false,
      src: ''
    }))
    // 模拟document.location.protocol
    Object.defineProperty(document, 'location', {
      value: {
        protocol: 'http:'
      },
      writable: true
    })
  })
  
  afterEach(() => {
    // 清理所有监听器
    jest.clearAllMocks()
  })
  
  test('initGoogleAnalytics 函数测试', () => {
    const accountId = 'UA-12345678-1'
    
    // 调用初始化函数
    initGoogleAnalytics(accountId)
    
    // 验证 _gaq 数组被创建
    expect(window._gaq).toBeDefined()
    expect(Array.isArray(window._gaq)).toBe(true)
    
    // 验证 _gaq 数组包含正确的命令
    expect(window._gaq).toContainEqual(['_setAccount', accountId])
    expect(window._gaq).toContainEqual(['_trackPageview'])
    
    // 验证脚本元素被创建
    expect(document.createElement).toHaveBeenCalledWith('script')
    
    // 验证脚本元素属性被设置
    const scriptElement = document.createElement.mock.results[0].value
    expect(scriptElement.type).toBe('text/javascript')
    expect(scriptElement.async).toBe(true)
    expect(scriptElement.src).toBe('http://www.google-analytics.com/ga.js')
    
    // 验证脚本元素被插入到文档中
    const scripts = document.getElementsByTagName('script')
    expect(scripts[0].parentNode.insertBefore).toHaveBeenCalledWith(scriptElement, scripts[0])
  })
  
  test('initGoogleAnalytics 函数在 https 协议下的测试', () => {
    // 设置 https 协议
    Object.defineProperty(document, 'location', {
      value: {
        protocol: 'https:'
      },
      writable: true
    })
    
    const accountId = 'UA-12345678-1'
    
    // 调用初始化函数
    initGoogleAnalytics(accountId)
    
    // 验证脚本元素 src 使用 https
    const scriptElement = document.createElement.mock.results[0].value
    expect(scriptElement.src).toBe('https://ssl.google-analytics.com/ga.js')
  })
  
  test('initGoogleAnalytics 函数在已有 _gaq 数组时的测试', () => {
    // 初始化已有 _gaq 数组
    window._gaq = [['_trackEvent', 'category', 'action']]
    
    const accountId = 'UA-12345678-1'
    
    // 调用初始化函数
    initGoogleAnalytics(accountId)
    
    // 验证 _gaq 数组被扩展而不是替换
    expect(window._gaq.length).toBe(3)
    expect(window._gaq[0]).toEqual(['_trackEvent', 'category', 'action'])
    expect(window._gaq[1]).toEqual(['_setAccount', accountId])
    expect(window._gaq[2]).toEqual(['_trackPageview'])
  })
})
