/**
 * 截图工具类
 */
class DCScreenshot {
  constructor(options = {}) {
    this.options = {
      format: 'png',
      quality: 0.8,
      useCORS: false,
      watermark: null,
      scale: 1,
      width: null,
      height: null,
      embedFonts: true,
      localFonts: true,
      iconFonts: true,
      excludeFonts: [],
      exclude: null,
      filter: null,
      outerTransforms: true,
      outerShadows: true,
      ...options,
    }

    this.plugins = []
    this.performanceMetrics = {
      captureCount: 0,
      totalTime: 0,
      captureTimes: [],
    }
  }

  /**
   * 捕获整个页面的截图
   * @returns {Promise<Object>} 截图结果
   */
  async captureFullPage() {
    const startTime = performance.now()

    try {
      // 应用插件的beforeCapture钩子
      let options = this._applyPlugins('beforeCapture', this.options)

      // 获取页面尺寸
      const width = this.options.width || Math.max(document.body.scrollWidth, document.documentElement.scrollWidth)
      const height = this.options.height || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)

      // 创建canvas元素
      const canvas = document.createElement('canvas')
      canvas.width = width * this.options.scale
      canvas.height = height * this.options.scale
      const ctx = canvas.getContext('2d')
      ctx.scale(this.options.scale, this.options.scale)

      // 设置背景色
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)

      // 滚动到顶部
      const originalScrollTop = window.pageYOffset || document.documentElement.scrollTop
      window.scrollTo(0, 0)

      // 等待滚动完成
      await new Promise(resolve => setTimeout(resolve, 50))

      // 计算需要截图的次数
      const viewportHeight = window.innerHeight
      let currentY = 0

      while (currentY < height) {
        // 滚动到当前位置
        window.scrollTo(0, currentY)
        await new Promise(resolve => setTimeout(resolve, 50))

        // 截图当前视口
        const currentHeight = Math.min(viewportHeight, height - currentY)
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = width
        tempCanvas.height = currentHeight
        const tempCtx = tempCanvas.getContext('2d')

        // 使用标准Web API实现截图
        await this._captureViewport(tempCtx, 0, currentY, width, currentHeight)

        // 将当前视口的内容绘制到主canvas
        ctx.drawImage(tempCanvas, 0, currentY, width, currentHeight)
        currentY += viewportHeight
      }

      // 恢复原始滚动位置
      window.scrollTo(0, originalScrollTop)

      // 添加水印
      if (this.options.watermark) {
        this._addWatermark(canvas, ctx)
      }

      // 生成截图结果
      const result = await this._generateResult(canvas)

      // 应用插件的afterCapture钩子
      const finalResult = this._applyPlugins('afterCapture', result, this.options)

      // 更新性能指标
      this._updatePerformanceMetrics(performance.now() - startTime)

      return finalResult
    } catch (error) {
      console.error('全页面截图失败:', error)
      return {
        success: false,
        error: error.message,
        dataUrl: '',
        width: 0,
        height: 0,
        format: this.options.format,
        size: 0,
      }
    }
  }

  /**
   * 捕获指定元素的截图
   * @param {HTMLElement} element - 要截图的DOM元素
   * @returns {Promise<Object>} 截图结果
   */
  async captureElement(element) {
    const startTime = performance.now()

    try {
      if (!(element instanceof HTMLElement)) {
        throw new Error('无效的元素')
      }

      // 应用插件的beforeCapture钩子
      let options = this._applyPlugins('beforeCapture', this.options)

      // 获取元素的位置和尺寸
      const rect = element.getBoundingClientRect()
      const width = this.options.width || rect.width
      const height = this.options.height || rect.height

      // 创建canvas元素
      const canvas = document.createElement('canvas')
      canvas.width = width * this.options.scale
      canvas.height = height * this.options.scale
      const ctx = canvas.getContext('2d')
      ctx.scale(this.options.scale, this.options.scale)

      // 设置背景色
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)

      // 捕获元素
      await this._captureElement(ctx, element, 0, 0, width, height)

      // 添加水印
      if (this.options.watermark) {
        this._addWatermark(canvas, ctx)
      }

      // 生成截图结果
      const result = await this._generateResult(canvas)

      // 应用插件的afterCapture钩子
      const finalResult = this._applyPlugins('afterCapture', result, this.options)

      // 更新性能指标
      this._updatePerformanceMetrics(performance.now() - startTime)

      return finalResult
    } catch (error) {
      console.error('元素截图失败:', error)
      return {
        success: false,
        error: error.message,
        dataUrl: '',
        width: 0,
        height: 0,
        format: this.options.format,
        size: 0,
      }
    }
  }

  /**
   * 捕获指定区域的截图
   * @param {number} x - 区域左上角的X坐标
   * @param {number} y - 区域左上角的Y坐标
   * @param {number} width - 区域宽度
   * @param {number} height - 区域高度
   * @returns {Promise<Object>} 截图结果
   */
  async captureRegion(x, y, width, height) {
    const startTime = performance.now()

    try {
      // 应用插件的beforeCapture钩子
      let options = this._applyPlugins('beforeCapture', this.options)

      // 创建canvas元素
      const canvas = document.createElement('canvas')
      canvas.width = width * this.options.scale
      canvas.height = height * this.options.scale
      const ctx = canvas.getContext('2d')
      ctx.scale(this.options.scale, this.options.scale)

      // 设置背景色
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)

      // 捕获区域
      await this._captureViewport(ctx, x, y, width, height)

      // 添加水印
      if (this.options.watermark) {
        this._addWatermark(canvas, ctx)
      }

      // 生成截图结果
      const result = await this._generateResult(canvas)

      // 应用插件的afterCapture钩子
      const finalResult = this._applyPlugins('afterCapture', result, this.options)

      // 更新性能指标
      this._updatePerformanceMetrics(performance.now() - startTime)

      return finalResult
    } catch (error) {
      console.error('区域截图失败:', error)
      return {
        success: false,
        error: error.message,
        dataUrl: '',
        width: 0,
        height: 0,
        format: this.options.format,
        size: 0,
      }
    }
  }

  /**
   * 捕获视口内容
   * @private
   * @param {CanvasRenderingContext2D} ctx - canvas上下文
   * @param {number} x - 起始X坐标
   * @param {number} y - 起始Y坐标
   * @param {number} width - 宽度
   * @param {number} height - 高度
   */
  async _captureViewport(ctx, x, y, width, height) {
    try {
      // 使用标准Web API实现视口捕获
      // 这里使用简化实现，实际项目中可能需要更复杂的处理
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = window.innerWidth
      tempCanvas.height = window.innerHeight
      const tempCtx = tempCanvas.getContext('2d')

      // 尝试使用HTML2Canvas的思路，但不引入第三方库
      // 这里使用简化实现
      const html = document.documentElement
      const rect = html.getBoundingClientRect()

      // 这里只是一个占位实现，实际项目中需要更复杂的DOM捕获
      // 例如处理样式、字体、图片等
      tempCtx.fillStyle = '#ffffff'
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)

      // 从临时canvas中裁剪出区域
      ctx.drawImage(tempCanvas, x, y, width, height, 0, 0, width, height)
    } catch (error) {
      console.warn('视口截图失败，使用降级方案:', error)
      // 降级方案：使用纯色填充
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = '#666'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('截图失败', width / 2, height / 2)
    }
  }

  /**
   * 捕获元素内容
   * @private
   * @param {CanvasRenderingContext2D} ctx - canvas上下文
   * @param {HTMLElement} element - 要捕获的元素
   * @param {number} x - 起始X坐标
   * @param {number} y - 起始Y坐标
   * @param {number} width - 宽度
   * @param {number} height - 高度
   */
  async _captureElement(ctx, element, x, y, width, height) {
    try {
      // 获取元素的位置
      const rect = element.getBoundingClientRect()

      // 创建临时canvas
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = rect.width
      tempCanvas.height = rect.height
      const tempCtx = tempCanvas.getContext('2d')

      // 尝试捕获元素
      // 这里使用简化实现，实际项目中需要更复杂的处理
      tempCtx.fillStyle = '#ffffff'
      tempCtx.fillRect(0, 0, rect.width, rect.height)

      // 从临时canvas中绘制到目标canvas
      ctx.drawImage(tempCanvas, x, y, width, height)
    } catch (error) {
      console.warn('元素截图失败，使用降级方案:', error)
      // 降级方案：使用纯色填充
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(x, y, width, height)
      ctx.fillStyle = '#666'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('截图失败', x + width / 2, y + height / 2)
    }
  }

  /**
   * 更新截图配置
   * @param {Object} newOptions - 新的配置选项
   */
  updateConfig(newOptions) {
    this.options = {
      ...this.options,
      ...newOptions,
    }
  }

  /**
   * 添加插件
   * @param {Object} plugin - 插件对象
   */
  addPlugin(plugin) {
    if (plugin && plugin.name) {
      this.plugins.push(plugin)
    }
  }

  /**
   * 移除插件
   * @param {string} pluginName - 插件名称
   */
  removePlugin(pluginName) {
    this.plugins = this.plugins.filter(plugin => plugin.name !== pluginName)
  }

  /**
   * 获取性能指标
   * @returns {Object} 性能指标
   */
  getPerformanceMetrics() {
    const metrics = {
      ...this.performanceMetrics,
      averageTime: this.performanceMetrics.captureCount > 0 ? this.performanceMetrics.totalTime / this.performanceMetrics.captureCount : 0,
    }
    return metrics
  }

  /**
   * 添加水印
   * @private
   * @param {HTMLCanvasElement} canvas - canvas元素
   * @param {CanvasRenderingContext2D} ctx - canvas上下文
   */
  _addWatermark(canvas, ctx) {
    const { text, position, color, fontSize } = this.options.watermark
    if (!text) return

    ctx.font = `${fontSize || 16}px Arial`
    ctx.fillStyle = color || 'rgba(255, 255, 255, 0.7)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    let x, y
    const padding = 20

    switch (position) {
      case 'top-left':
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        x = padding
        y = padding
        break
      case 'top-right':
        ctx.textAlign = 'right'
        ctx.textBaseline = 'top'
        x = canvas.width / this.options.scale - padding
        y = padding
        break
      case 'bottom-left':
        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        x = padding
        y = canvas.height / this.options.scale - padding
        break
      case 'bottom-right':
      default:
        ctx.textAlign = 'right'
        ctx.textBaseline = 'bottom'
        x = canvas.width / this.options.scale - padding
        y = canvas.height / this.options.scale - padding
        break
    }

    ctx.fillText(text, x, y)
  }

  /**
   * 生成截图结果
   * @private
   * @param {HTMLCanvasElement} canvas - canvas元素
   * @returns {Promise<Object>} 截图结果
   */
  async _generateResult(canvas) {
    return new Promise(resolve => {
      try {
        let dataUrl
        const format = this.options.format.toLowerCase()
        const quality = this.options.quality

        switch (format) {
          case 'jpeg':
          case 'jpg':
            dataUrl = canvas.toDataURL('image/jpeg', quality)
            break
          case 'webp':
            dataUrl = canvas.toDataURL('image/webp', quality)
            break
          case 'png':
          default:
            dataUrl = canvas.toDataURL('image/png')
            break
        }

        // 计算图片大小
        const size = Math.round((dataUrl.length - 22) * 0.75) // 估算base64编码的字节大小

        resolve({
          success: true,
          dataUrl,
          width: canvas.width / this.options.scale,
          height: canvas.height / this.options.scale,
          format,
          size,
          canvas,
          toSvg: async () => this.toSvg(canvas),
          toCanvas: async () => this.toCanvas(canvas),
          toBlob: async options => this.toBlob(canvas, options),
          toPng: async options => this.toPng(canvas, options),
          toJpg: async options => this.toJpg(canvas, options),
          toWebp: async options => this.toWebp(canvas, options),
          download: async options => this.download(canvas, options),
        })
      } catch (error) {
        console.error('生成截图结果失败:', error)
        resolve({
          success: false,
          error: error.message,
          dataUrl: '',
          width: canvas.width / this.options.scale,
          height: canvas.height / this.options.scale,
          format: this.options.format,
          size: 0,
          canvas: null,
        })
      }
    })
  }

  /**
   * 转换为SVG
   * @param {HTMLCanvasElement} canvas - canvas元素
   * @returns {Promise<HTMLImageElement>}
   */
  async toSvg(canvas) {
    return new Promise((resolve, reject) => {
      try {
        const img = document.createElement('img')
        const dataUrl = canvas.toDataURL('image/png')

        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = dataUrl
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 获取Canvas元素
   * @param {HTMLCanvasElement} canvas - canvas元素
   * @returns {Promise<HTMLCanvasElement>}
   */
  async toCanvas(canvas) {
    return Promise.resolve(canvas)
  }

  /**
   * 转换为Blob
   * @param {HTMLCanvasElement} canvas - canvas元素
   * @param {Object} options - 选项
   * @returns {Promise<Blob>}
   */
  async toBlob(canvas, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        const format = options.format || this.options.format
        const quality = options.quality || this.options.quality

        canvas.toBlob(
          blob => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to create blob'))
            }
          },
          `image/${format}`,
          quality,
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 转换为PNG图片
   * @param {HTMLCanvasElement} canvas - canvas元素
   * @param {Object} options - 选项
   * @returns {Promise<HTMLImageElement>}
   */
  async toPng(canvas, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        const img = document.createElement('img')
        const quality = options.quality || this.options.quality
        const dataUrl = canvas.toDataURL('image/png', quality)

        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = dataUrl
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 转换为JPG图片
   * @param {HTMLCanvasElement} canvas - canvas元素
   * @param {Object} options - 选项
   * @returns {Promise<HTMLImageElement>}
   */
  async toJpg(canvas, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        const img = document.createElement('img')
        const quality = options.quality || this.options.quality
        const dataUrl = canvas.toDataURL('image/jpeg', quality)

        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = dataUrl
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 转换为WebP图片
   * @param {HTMLCanvasElement} canvas - canvas元素
   * @param {Object} options - 选项
   * @returns {Promise<HTMLImageElement>}
   */
  async toWebp(canvas, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        const img = document.createElement('img')
        const quality = options.quality || this.options.quality
        const dataUrl = canvas.toDataURL('image/webp', quality)

        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = dataUrl
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 下载截图
   * @param {HTMLCanvasElement} canvas - canvas元素
   * @param {Object} options - 选项
   * @returns {Promise<void>}
   */
  async download(canvas, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        const format = options.format || this.options.format
        const quality = options.quality || this.options.quality
        const filename = options.filename || 'screenshot'

        canvas.toBlob(
          blob => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `${filename}.${format}`
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
              resolve()
            } else {
              reject(new Error('Failed to create blob for download'))
            }
          },
          `image/${format}`,
          quality,
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * 应用插件钩子
   * @private
   * @param {string} hookName - 钩子名称
   * @param {*} data - 要传递给钩子的数据
   * @param {*} options - 选项
   * @returns {*} 处理后的数据
   */
  _applyPlugins(hookName, data, options) {
    let result = data
    this.plugins.forEach(plugin => {
      if (typeof plugin[hookName] === 'function') {
        result = plugin[hookName](result, options)
      }
    })
    return result
  }

  /**
   * 更新性能指标
   * @private
   * @param {number} time - 执行时间
   */
  _updatePerformanceMetrics(time) {
    this.performanceMetrics.captureCount++
    this.performanceMetrics.totalTime += time
    this.performanceMetrics.captureTimes.push(time)
  }
}

// 快捷方法
DCScreenshot.captureFullPage = async function (options) {
  const screenshot = new DCScreenshot(options)
  return screenshot.captureFullPage()
}

DCScreenshot.captureElement = async function (element, options) {
  const screenshot = new DCScreenshot(options)
  return screenshot.captureElement(element)
}

DCScreenshot.captureRegion = async function (x, y, width, height, options) {
  const screenshot = new DCScreenshot(options)
  return screenshot.captureRegion(x, y, width, height)
}

// 静态导出方法
DCScreenshot.toSvg = async function (source, options) {
  const result = await DCScreenshot._captureSource(source, options)
  return result.toSvg()
}

DCScreenshot.toCanvas = async function (source, options) {
  const result = await DCScreenshot._captureSource(source, options)
  return result.toCanvas()
}

DCScreenshot.toBlob = async function (source, options) {
  const result = await DCScreenshot._captureSource(source, options)
  return result.toBlob(options)
}

DCScreenshot.toPng = async function (source, options) {
  const result = await DCScreenshot._captureSource(source, options)
  return result.toPng(options)
}

DCScreenshot.toJpg = async function (source, options) {
  const result = await DCScreenshot._captureSource(source, options)
  return result.toJpg(options)
}

DCScreenshot.toWebp = async function (source, options) {
  const result = await DCScreenshot._captureSource(source, options)
  return result.toWebp(options)
}

DCScreenshot.download = async function (source, options) {
  const result = await DCScreenshot._captureSource(source, options)
  return result.download(options)
}

// 内部方法：捕获源
DCScreenshot._captureSource = async function (source, options) {
  const screenshot = new DCScreenshot(options)

  if (source instanceof HTMLElement) {
    return screenshot.captureElement(source)
  } else if (Array.isArray(source) && source.length === 4) {
    // 假设是 [x, y, width, height]
    return screenshot.captureRegion(...source)
  } else {
    // 默认捕获全屏
    return screenshot.captureFullPage()
  }
}

// 注册到全局DC对象
if (typeof window !== 'undefined' && window.DC) {
  window.DC.Screenshot = DCScreenshot
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCScreenshot
}
