/**
 * 动态依赖加载器
 * 使用 document.currentScript 实现基于当前脚本路径的依赖加载
 */
class DCDynamicDependencyLoader {
  constructor(options = {}) {
    this.basePath = this.getBasePath()
    this.loadedDependencies = new Set()
    this.loadingPromises = new Map()
    this.options = {
      timeout: options.timeout || 10000,
      retryCount: options.retryCount || 3,
      verbose: options.verbose || false,
    }
  }

  /**
   * 获取当前脚本的路径
   * @returns {string} 基础路径
   */
  getBasePath() {
    // 尝试获取当前脚本路径
    if (document.currentScript) {
      const src = document.currentScript.src
      if (src) {
        return src.substring(0, src.lastIndexOf('/') + 1)
      }
    }

    // 如果无法获取当前脚本，使用默认路径
    console.warn('无法获取当前脚本路径，使用默认路径')
    return './'
  }

  /**
   * 动态加载CSS文件
   * @param {string} url - CSS文件URL
   * @param {Object} options - 加载选项
   * @returns {Promise} 加载Promise
   */
  loadCSS(url, options = {}) {
    const fullUrl = this.resolveUrl(url)

    // 检查是否已加载
    if (this.loadedDependencies.has(fullUrl)) {
      this.log(`CSS已加载: ${fullUrl}`)
      return Promise.resolve()
    }

    // 检查是否正在加载
    if (this.loadingPromises.has(fullUrl)) {
      return this.loadingPromises.get(fullUrl)
    }

    this.log(`开始加载CSS: ${fullUrl}`)

    const loadPromise = this.createLoadPromise(() => this.createStyleElement(fullUrl, options), fullUrl, 'CSS')

    this.loadingPromises.set(fullUrl, loadPromise)

    return loadPromise
  }

  /**
   * 动态加载JavaScript文件
   * @param {string} url - JavaScript文件URL
   * @param {Object} options - 加载选项
   * @returns {Promise} 加载Promise
   */
  loadScript(url, options = {}) {
    const fullUrl = this.resolveUrl(url)

    // 检查是否已加载
    if (this.loadedDependencies.has(fullUrl)) {
      this.log(`脚本已加载: ${fullUrl}`)
      return Promise.resolve()
    }

    // 检查是否正在加载
    if (this.loadingPromises.has(fullUrl)) {
      return this.loadingPromises.get(fullUrl)
    }

    this.log(`开始加载脚本: ${fullUrl}`)

    const loadPromise = this.createLoadPromise(() => this.createScriptElement(fullUrl, options), fullUrl, 'JavaScript')

    this.loadingPromises.set(fullUrl, loadPromise)

    return loadPromise
  }

  /**
   * 批量加载依赖
   * @param {Array} dependencies - 依赖列表
   * @returns {Promise} 加载Promise
   */
  loadDependencies(dependencies) {
    const loadPromises = dependencies.map(dep => {
      if (typeof dep === 'string') {
        // 根据扩展名判断类型
        if (dep.endsWith('.css')) {
          return this.loadCSS(dep)
        } else if (dep.endsWith('.js')) {
          return this.loadScript(dep)
        } else {
          // 默认作为JavaScript处理
          return this.loadScript(dep)
        }
      } else if (typeof dep === 'object') {
        // 对象格式：{ type: 'css|js', url: 'path/to/file', options: {} }
        const { type, url, options = {} } = dep
        if (type === 'css') {
          return this.loadCSS(url, options)
        } else if (type === 'js') {
          return this.loadScript(url, options)
        }
      }

      return Promise.reject(new Error(`无效的依赖配置: ${dep}`))
    })

    return Promise.all(loadPromises)
  }

  /**
   * 解析URL，处理相对路径
   * @param {string} url - 原始URL
   * @returns {string} 解析后的URL
   */
  resolveUrl(url) {
    // 如果是绝对URL，直接返回
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
      return url
    }

    // 否则拼接基础路径
    return this.basePath + url
  }

  /**
   * 创建样式元素
   * @param {string} url - CSS文件URL
   * @param {Object} options - 选项
   * @returns {Promise} 加载Promise
   */
  createStyleElement(url, options) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url

      // 添加属性
      if (options.id) link.id = options.id
      if (options.media) link.media = options.media

      // 设置超时
      const timeout = setTimeout(() => {
        reject(new Error(`加载CSS超时: ${url}`))
      }, this.options.timeout)

      link.onload = () => {
        clearTimeout(timeout)
        this.loadedDependencies.add(url)
        this.loadingPromises.delete(url)
        resolve(link)
      }

      link.onerror = () => {
        clearTimeout(timeout)
        this.loadingPromises.delete(url)
        reject(new Error(`加载CSS失败: ${url}`))
      }

      document.head.appendChild(link)
    })
  }

  /**
   * 创建脚本元素
   * @param {string} url - JavaScript文件URL
   * @param {Object} options - 选项
   * @returns {Promise} 加载Promise
   */
  createScriptElement(url, options) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = url

      // 添加属性
      if (options.id) script.id = options.id
      if (options.async) script.async = options.async
      if (options.defer) script.defer = options.defer
      if (options.charset) script.charset = options.charset

      // 设置超时
      const timeout = setTimeout(() => {
        reject(new Error(`加载脚本超时: ${url}`))
      }, this.options.timeout)

      script.onload = () => {
        clearTimeout(timeout)
        this.loadedDependencies.add(url)
        this.loadingPromises.delete(url)
        resolve(script)
      }

      script.onerror = () => {
        clearTimeout(timeout)
        this.loadingPromises.delete(url)
        reject(new Error(`加载脚本失败: ${url}`))
      }

      document.head.appendChild(script)
    })
  }

  /**
   * 创建带重试的加载Promise
   * @param {Function} loadFunction - 加载函数
   * @param {string} url - 资源URL
   * @param {string} type - 资源类型
   * @returns {Promise} 加载Promise
   */
  createLoadPromise(loadFunction, url, type) {
    let retryCount = 0

    const attemptLoad = () => {
      return loadFunction().catch(error => {
        retryCount++
        this.log(`${type}加载失败，尝试第${retryCount}次重试: ${url}`)

        if (retryCount <= this.options.retryCount) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(attemptLoad())
            }, 1000 * retryCount) // 递增延迟
          })
        } else {
          this.log(`${type}加载失败，已达到最大重试次数: ${url}`, 'error')
          throw error
        }
      })
    }

    return attemptLoad()
  }

  /**
   * 记录日志
   * @param {string} message - 日志消息
   * @param {string} level - 日志级别
   */
  log(message, level = 'info') {
    if (this.options.verbose) {
      switch (level) {
        case 'error':
          console.error(`[DynamicDependencyLoader] ${message}`)
          break
        case 'warn':
          console.warn(`[DynamicDependencyLoader] ${message}`)
          break
        default:
          console.log(`[DynamicDependencyLoader] ${message}`)
      }
    }
  }

  /**
   * 检查依赖是否已加载
   * @param {string} url - 资源URL
   * @returns {boolean} 是否已加载
   */
  isLoaded(url) {
    const fullUrl = this.resolveUrl(url)
    return this.loadedDependencies.has(fullUrl)
  }

  /**
   * 获取已加载的依赖列表
   * @returns {Array} 已加载的依赖列表
   */
  getLoadedDependencies() {
    return Array.from(this.loadedDependencies)
  }

  /**
   * 卸载依赖
   * @param {string} url - 资源URL
   */
  unload(url) {
    const fullUrl = this.resolveUrl(url)

    // 查找并移除CSS
    const links = document.querySelectorAll(`link[href="${fullUrl}"]`)
    links.forEach(link => link.remove())

    // 查找并移除JavaScript
    const scripts = document.querySelectorAll(`script[src="${fullUrl}"]`)
    scripts.forEach(script => script.remove())

    // 从已加载列表中移除
    this.loadedDependencies.delete(fullUrl)

    this.log(`已卸载: ${fullUrl}`)
  }
}

// 导出到全局
window.DC = window.DC || {}
window.DC.DynamicDependencyLoader = DCDynamicDependencyLoader
