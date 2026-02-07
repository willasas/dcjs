// ga.js - Google Analytics 4 实现
class DcGA {
  /**
   * 初始化 Google Analytics 4
   * @param {string} measurementId - Google Analytics 4 测量 ID (格式: G-XXXXXXXXXX)
   * @param {Object} options - 配置选项
   */
  static init(measurementId, options = {}) {
    if (!measurementId) {
      console.error('Google Analytics 4 测量 ID 不能为空')
      return
    }

    // 创建 gtag 函数
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }

    // 存储测量 ID
    DcGA.measurementId = measurementId
    window.DcGA = window.DcGA || {}
    window.DcGA.measurementId = measurementId

    // 初始化配置
    window.gtag('js', new Date())
    window.gtag('config', measurementId, options)

    // 加载 gtag.js 脚本
    if (!document.querySelector('script[src*="gtag.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId
      script.async = true
      const firstScript = document.getElementsByTagName('script')[0]
      firstScript.parentNode.insertBefore(script, firstScript)
    }

    console.log('Google Analytics 4 初始化成功')
    console.log('测量 ID:', measurementId)
  }

  /**
   * 发送页面浏览事件
   * @param {string} pagePath - 页面路径
   * @param {Object} options - 配置选项
   */
  static trackPageview(pagePath, options = {}) {
    if (window.gtag) {
      window.gtag('config', window.DcGA.measurementId, {
        page_path: pagePath,
        ...options,
      })
    } else {
      console.error('Google Analytics 4 未初始化')
    }
  }

  /**
   * 发送事件
   * @param {string} eventName - 事件名称
   * @param {Object} eventParams - 事件参数
   */
  static trackEvent(eventName, eventParams = {}) {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams)
    } else {
      console.error('Google Analytics 4 未初始化')
    }
  }

  /**
   * 发送用户参与度事件
   * @param {string} engagementType - 参与度类型
   * @param {Object} params - 事件参数
   */
  static trackEngagement(engagementType, params = {}) {
    this.trackEvent('engagement', {
      engagement_type: engagementType,
      ...params,
    })
  }

  /**
   * 发送转化事件
   * @param {string} conversionName - 转化名称
   * @param {Object} params - 事件参数
   */
  static trackConversion(conversionName, params = {}) {
    this.trackEvent('conversion', {
      conversion_name: conversionName,
      ...params,
    })
  }
}

// 存储测量 ID
DcGA.measurementId = ''

// 注册到全局DC对象
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.GA = DcGA
}

// CommonJS 模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DcGA
}
