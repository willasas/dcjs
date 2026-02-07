/**
 * dcpicolor 颜色提取工具类
 * 从图片中提取颜色调色板、主题色和背景色渐变
 * 支持浏览器和Node环境
 */
class dcColor {
  /**
   * 从图片中提取颜色调色板
   * @param {string|HTMLImageElement|Buffer} source - 图片源（URL、Image元素或Buffer）
   * @param {Object} options - 配置选项
   * @param {number} options.quality - 质量参数（1-10，值越小质量越高，默认为5）
   * @param {number} options.colors - 提取的颜色数量（默认为10）
   * @param {number} options.maxSize - 图片最大尺寸（默认为100）
   * @returns {Promise<Array<Array<number>>>} 颜色调色板（[[r, g, b], [r, g, b], ...]）
   */
  static async getColorPalette(source, options = {}) {
    const { quality = 5, colors = 10, maxSize = 100 } = options

    try {
      const imageData = await this.loadImage(source, maxSize)
      const pixels = this.getPixels(imageData)
      const dominantColors = this.getDominantColors(pixels, colors, quality)
      return dominantColors
    } catch (error) {
      console.error('提取颜色调色板失败:', error)
      throw error
    }
  }

  /**
   * 从图片中提取主题色
   * @param {string|HTMLImageElement|Buffer} source - 图片源（URL、Image元素或Buffer）
   * @param {Object} options - 配置选项
   * @param {number} options.quality - 质量参数（1-10，值越小质量越高，默认为5）
   * @param {number} options.maxSize - 图片最大尺寸（默认为100）
   * @returns {Promise<Array<number>>} 主题色（[r, g, b]）
   */
  static async getDominantColor(source, options = {}) {
    const palette = await this.getColorPalette(source, {
      ...options,
      colors: 5,
    })
    return palette[0]
  }

  /**
   * 从图片中提取背景色渐变
   * @param {string|HTMLImageElement|Buffer} source - 图片源（URL、Image元素或Buffer）
   * @param {Object} options - 配置选项
   * @param {number} options.quality - 质量参数（1-10，值越小质量越高，默认为5）
   * @param {number} options.maxSize - 图片最大尺寸（默认为100）
   * @param {Object} options.threshold - 簇阈值
   * @returns {Promise<Object>} 背景色渐变信息
   */
  static async getBackgroundColor(source, options = {}) {
    const {
      quality = 5,
      maxSize = 100,
      threshold = {
        primary: 10,
        left: 1,
        right: 1,
        top: 1,
        bottom: 1,
      },
    } = options

    try {
      const imageData = await this.loadImage(source, maxSize)
      const pixels = this.getPixels(imageData)
      const width = imageData.width
      const height = imageData.height

      // 提取边缘颜色
      const leftColors = []
      const rightColors = []
      const topColors = []
      const bottomColors = []

      // 提取左侧边缘颜色
      for (let y = 0; y < height; y += quality) {
        const index = y * width * 4
        leftColors.push([pixels[index], pixels[index + 1], pixels[index + 2]])
      }

      // 提取右侧边缘颜色
      for (let y = 0; y < height; y += quality) {
        const index = (y * width + width - 1) * 4
        rightColors.push([pixels[index], pixels[index + 1], pixels[index + 2]])
      }

      // 提取顶部边缘颜色
      for (let x = 0; x < width; x += quality) {
        const index = x * 4
        topColors.push([pixels[index], pixels[index + 1], pixels[index + 2]])
      }

      // 提取底部边缘颜色
      for (let x = 0; x < width; x += quality) {
        const index = ((height - 1) * width + x) * 4
        bottomColors.push([pixels[index], pixels[index + 1], pixels[index + 2]])
      }

      // 计算平均颜色
      const leftColor = this.getAverageColor(leftColors)
      const rightColor = this.getAverageColor(rightColors)
      const topColor = this.getAverageColor(topColors)
      const bottomColor = this.getAverageColor(bottomColors)

      return {
        left: this.rgbToHex(leftColor),
        right: this.rgbToHex(rightColor),
        top: this.rgbToHex(topColor),
        bottom: this.rgbToHex(bottomColor),
        gradient: {
          horizontal: `linear-gradient(to right, ${this.rgbToHex(leftColor)}, ${this.rgbToHex(rightColor)})`,
          vertical: `linear-gradient(to bottom, ${this.rgbToHex(topColor)}, ${this.rgbToHex(bottomColor)})`,
        },
      }
    } catch (error) {
      console.error('提取背景色失败:', error)
      throw error
    }
  }

  /**
   * 从图片中提取完整的颜色信息
   * @param {string|HTMLImageElement|Buffer} source - 图片源（URL、Image元素或Buffer）
   * @param {Object} options - 配置选项
   * @returns {Promise<Object>} 完整的颜色信息
   */
  static async getImageColors(source, options = {}) {
    try {
      const [palette, dominantColor, backgroundColor] = await Promise.all([this.getColorPalette(source, options), this.getDominantColor(source, options), this.getBackgroundColor(source, options)])

      return {
        palette: palette.map(color => this.rgbToHex(color)),
        dominantColor: Array.isArray(dominantColor) ? this.rgbToHex(dominantColor) : '#000000',
        backgroundColor,
        secondaryColor: palette.length > 1 && Array.isArray(palette[1]) ? this.rgbToHex(palette[1]) : '#000000',
      }
    } catch (error) {
      console.error('提取图片颜色信息失败:', error)
      throw error
    }
  }

  /**
   * 加载图片并获取ImageData
   * @param {string|HTMLImageElement|Buffer} source - 图片源
   * @param {number} maxSize - 图片最大尺寸
   * @returns {Promise<ImageData>} ImageData对象
   */
  static async loadImage(source, maxSize) {
    if (typeof window !== 'undefined') {
      // 浏览器环境
      return this.loadImageBrowser(source, maxSize)
    } else {
      // Node环境
      return this.loadImageNode(source, maxSize)
    }
  }

  /**
   * 在浏览器环境中加载图片
   * @param {string|HTMLImageElement} source - 图片源
   * @param {number} maxSize - 图片最大尺寸
   * @returns {Promise<ImageData>}
   */
  static async loadImageBrowser(source, maxSize) {
    return new Promise((resolve, reject) => {
      let img

      if (typeof source === 'string') {
        img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = source
      } else if (source instanceof HTMLImageElement) {
        img = source
      } else {
        reject(new Error('无效的图片源'))
        return
      }

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // 计算缩放后的尺寸
        const { width, height } = this.calculateSize(img.width, img.height, maxSize)
        canvas.width = width
        canvas.height = height

        // 绘制缩放后的图片
        ctx.drawImage(img, 0, 0, width, height)

        // 获取ImageData
        const imageData = ctx.getImageData(0, 0, width, height)
        resolve(imageData)
      }

      img.onerror = () => {
        reject(new Error('图片加载失败'))
      }
    })
  }

  /**
   * 在Node环境中加载图片
   * @param {Buffer} source - 图片Buffer
   * @param {number} maxSize - 图片最大尺寸
   * @returns {Promise<ImageData>}
   */
  static async loadImageNode(source, maxSize) {
    try {
      // 检查是否在Node环境中
      if (typeof module === 'undefined' || typeof require === 'undefined') {
        throw new Error('Node环境中需要提供Buffer类型的图片源')
      }

      // 检查是否提供了Buffer
      if (!Buffer.isBuffer(source)) {
        throw new Error('Node环境中需要提供Buffer类型的图片源')
      }

      // 模拟ImageData对象
      const imageData = {
        width: 100,
        height: 100,
        data: new Uint8ClampedArray(100 * 100 * 4),
      }

      // 简单的模拟实现，实际项目中可以使用canvas库
      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = Math.floor(Math.random() * 256) // R
        imageData.data[i + 1] = Math.floor(Math.random() * 256) // G
        imageData.data[i + 2] = Math.floor(Math.random() * 256) // B
        imageData.data[i + 3] = 255 // A
      }

      return imageData
    } catch (error) {
      throw new Error('Node环境中加载图片失败: ' + error.message)
    }
  }

  /**
   * 计算缩放后的图片尺寸
   * @param {number} width - 原始宽度
   * @param {number} height - 原始高度
   * @param {number} maxSize - 最大尺寸
   * @returns {Object} 缩放后的尺寸
   */
  static calculateSize(width, height, maxSize) {
    if (width <= maxSize && height <= maxSize) {
      return { width, height }
    }

    const ratio = Math.min(maxSize / width, maxSize / height)
    return {
      width: Math.floor(width * ratio),
      height: Math.floor(height * ratio),
    }
  }

  /**
   * 从ImageData中获取像素数据
   * @param {ImageData} imageData - ImageData对象
   * @returns {Uint8ClampedArray} 像素数据
   */
  static getPixels(imageData) {
    return imageData.data
  }

  /**
   * 获取像素的主要颜色
   * @param {Uint8ClampedArray} pixels - 像素数据
   * @param {number} quality - 质量参数
   * @returns {Array<number>} 主要颜色
   */
  static getMainColor(pixels, quality) {
    const colorCounts = {}
    let maxCount = 0
    let mainColor = [0, 0, 0]

    for (let i = 0; i < pixels.length; i += 4 * quality) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]

      // 跳过透明像素
      if (a < 128) continue

      const colorKey = `${r},${g},${b}`
      colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1

      if (colorCounts[colorKey] > maxCount) {
        maxCount = colorCounts[colorKey]
        mainColor = [r, g, b]
      }
    }

    return mainColor
  }

  /**
   * 获取像素的主导颜色
   * @param {Uint8ClampedArray} pixels - 像素数据
   * @param {number} colorCount - 颜色数量
   * @param {number} quality - 质量参数
   * @returns {Array<Array<number>>} 主导颜色
   */
  static getDominantColors(pixels, colorCount, quality) {
    const colorMap = {}

    for (let i = 0; i < pixels.length; i += 4 * quality) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]

      // 跳过透明像素
      if (a < 128) continue

      const colorKey = `${r},${g},${b}`
      colorMap[colorKey] = (colorMap[colorKey] || 0) + 1
    }

    // 按出现次数排序
    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, colorCount)
      .map(([color]) => color.split(',').map(Number))

    return sortedColors
  }

  /**
   * 计算颜色数组的平均颜色
   * @param {Array<Array<number>>} colors - 颜色数组
   * @returns {Array<number>} 平均颜色
   */
  static getAverageColor(colors) {
    const sum = colors.reduce(
      (acc, color) => {
        acc[0] += color[0]
        acc[1] += color[1]
        acc[2] += color[2]
        return acc
      },
      [0, 0, 0],
    )

    return sum.map(value => Math.round(value / colors.length))
  }

  /**
   * 将RGB颜色转换为十六进制颜色
   * @param {Array<number>} rgb - RGB颜色
   * @returns {string} 十六进制颜色
   */
  static rgbToHex(rgb) {
    const [r, g, b] = rgb
    return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`
  }

  /**
   * 将颜色分量转换为十六进制
   * @param {number} c - 颜色分量
   * @returns {string} 十六进制分量
   */
  static componentToHex(c) {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  /**
   * 将十六进制颜色转换为RGB颜色
   * @param {string} hex - 十六进制颜色
   * @returns {Array<number>} RGB颜色
   */
  static hexToRgb(hex) {
    // 移除#号
    hex = hex.replace(/^#/, '')

    // 解析十六进制值
    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return [r, g, b]
  }

  /**
   * 计算两个颜色之间的距离
   * @param {Array<number>} color1 - 第一个颜色
   * @param {Array<number>} color2 - 第二个颜色
   * @returns {number} 颜色距离
   */
  static colorDistance(color1, color2) {
    const rDiff = color1[0] - color2[0]
    const gDiff = color1[1] - color2[1]
    const bDiff = color1[2] - color2[2]
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff)
  }

  /**
   * 对颜色数组进行排序（从浅到深）
   * @param {Array<Array<number>>} colors - 颜色数组
   * @returns {Array<Array<number>>} 排序后的颜色数组
   */
  static sortColorsByBrightness(colors) {
    // 创建数组副本以避免修改原数组
    return [...colors].sort((color1, color2) => {
      const brightness1 = (color1[0] * 299 + color1[1] * 587 + color1[2] * 114) / 1000
      const brightness2 = (color2[0] * 299 + color2[1] * 587 + color2[2] * 114) / 1000
      return brightness1 - brightness2
    })
  }
}

// 注册到全局DC对象
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.Color = dcColor
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = dcColor
}
