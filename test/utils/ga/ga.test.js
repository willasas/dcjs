/**
 * ga 工具类测试
 */
const DcGA = require('../../../src/utils/ga.js')

describe('ga 工具类测试', () => {
  beforeEach(() => {
    // 清理全局变量
    delete window.dataLayer
    delete window.gtag
    delete window.DcGA
    // 模拟文档和脚本元素
    document.getElementsByTagName = jest.fn(() => [
      {
        parentNode: {
          insertBefore: jest.fn(),
        },
      },
    ])
    // 模拟document.createElement
    document.createElement = jest.fn(() => ({
      async: false,
      src: '',
    }))
    // 模拟document.querySelector
    document.querySelector = jest.fn(() => null)
  })

  afterEach(() => {
    // 清理所有监听器
    jest.clearAllMocks()
  })

  test('DcGA 类初始化测试', () => {
    const measurementId = 'G-XXXXXXXXXX'

    // 调用初始化方法
    DcGA.init(measurementId)

    // 验证 dataLayer 数组被创建
    expect(window.dataLayer).toBeDefined()
    expect(Array.isArray(window.dataLayer)).toBe(true)

    // 验证 gtag 函数被创建
    expect(window.gtag).toBeDefined()
    expect(typeof window.gtag).toBe('function')

    // 验证 DcGA.measurementId 被设置
    expect(DcGA.measurementId).toBe(measurementId)
    expect(window.DcGA).toBeDefined()
    expect(window.DcGA.measurementId).toBe(measurementId)

    // 验证脚本元素被创建
    expect(document.createElement).toHaveBeenCalledWith('script')

    // 验证脚本元素属性被设置
    const scriptElement = document.createElement.mock.results[0].value
    expect(scriptElement.async).toBe(true)
    expect(scriptElement.src).toBe('https://www.googletagmanager.com/gtag/js?id=' + measurementId)
  })

  test('DcGA.trackPageview 方法测试', () => {
    const measurementId = 'G-XXXXXXXXXX'
    const pagePath = '/home'

    // 初始化 DcGA
    DcGA.init(measurementId)

    // 模拟 gtag 函数
    const gtagMock = jest.fn()
    window.gtag = gtagMock

    // 调用 trackPageview 方法
    DcGA.trackPageview(pagePath)

    // 验证 gtag 函数被调用
    expect(gtagMock).toHaveBeenCalledWith('config', measurementId, {
      page_path: pagePath,
    })
  })

  test('DcGA.trackEvent 方法测试', () => {
    const measurementId = 'G-XXXXXXXXXX'
    const eventName = 'button_click'
    const eventParams = {
      event_category: 'engagement',
      event_label: 'homepage',
    }

    // 初始化 DcGA
    DcGA.init(measurementId)

    // 模拟 gtag 函数
    const gtagMock = jest.fn()
    window.gtag = gtagMock

    // 调用 trackEvent 方法
    DcGA.trackEvent(eventName, eventParams)

    // 验证 gtag 函数被调用
    expect(gtagMock).toHaveBeenCalledWith('event', eventName, eventParams)
  })

  test('DcGA.trackEngagement 方法测试', () => {
    const measurementId = 'G-XXXXXXXXXX'
    const engagementType = 'scroll'
    const params = {
      percent_scrolled: 75,
    }

    // 初始化 DcGA
    DcGA.init(measurementId)

    // 模拟 gtag 函数
    const gtagMock = jest.fn()
    window.gtag = gtagMock

    // 调用 trackEngagement 方法
    DcGA.trackEngagement(engagementType, params)

    // 验证 gtag 函数被调用
    expect(gtagMock).toHaveBeenCalledWith('event', 'engagement', {
      engagement_type: engagementType,
      ...params,
    })
  })

  test('DcGA.trackConversion 方法测试', () => {
    const measurementId = 'G-XXXXXXXXXX'
    const conversionName = 'signup'
    const params = {
      value: 100,
      currency: 'CNY',
    }

    // 初始化 DcGA
    DcGA.init(measurementId)

    // 模拟 gtag 函数
    const gtagMock = jest.fn()
    window.gtag = gtagMock

    // 调用 trackConversion 方法
    DcGA.trackConversion(conversionName, params)

    // 验证 gtag 函数被调用
    expect(gtagMock).toHaveBeenCalledWith('event', 'conversion', {
      conversion_name: conversionName,
      ...params,
    })
  })
})
