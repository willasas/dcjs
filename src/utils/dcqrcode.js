/**
 * 二维码生成工具类
 * 一个简单易用、扩展性好、性能良好的二维码生成器
 */
class dcQRCode {
  constructor() {
    // QR码版本信息，定义不同版本的二维码参数
    this.qrData = {
      version: 1,
      errorCorrectionLevel: 'M', // L, M, Q, H
      modules: [],
      moduleCount: 0,
    }

    // 二维码版本与尺寸对应表
    this.versionSizes = [
      21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77, 81, 85, 89, 93, 97, 101, 105, 109, 113, 117, 121, 125, 129, 133, 137, 141, 145, 149, 153, 157, 161, 165, 169, 173, 177,
    ]
  }

  /**
   * 生成二维码
   * @param {string} text - 要编码的文本
   * @param {Object} options - 选项配置
   * @param {number} options.size - 二维码尺寸，默认200
   * @param {string} options.bgColor - 背景色，默认#FFFFFF
   * @param {string} options.fgColor - 前景色，默认#000000
   * @param {number} options.margin - 边距，默认4
   * @param {string} options.errorCorrectionLevel - 纠错级别，默认M
   * @returns {string} 二维码的data URL
   */
  generate(text, options = {}) {
    const { size = 200, bgColor = '#FFFFFF', fgColor = '#000000', margin = 4, errorCorrectionLevel = 'M' } = options

    // 创建二维码矩阵
    const qrMatrix = this.createQRMatrix(text, errorCorrectionLevel)
    const moduleCount = qrMatrix.length

    // 计算每个模块的像素大小
    const moduleSize = Math.floor((size - 2 * margin) / moduleCount)
    const canvasSize = moduleCount * moduleSize + 2 * margin

    // 创建canvas元素
    const canvas = document.createElement('canvas')
    canvas.width = canvasSize
    canvas.height = canvasSize
    const ctx = canvas.getContext('2d')

    // 填充背景色
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvasSize, canvasSize)

    // 绘制二维码模块
    ctx.fillStyle = fgColor
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (qrMatrix[row][col]) {
          ctx.fillRect(col * moduleSize + margin, row * moduleSize + margin, moduleSize, moduleSize)
        }
      }
    }

    // 返回data URL
    return canvas.toDataURL('image/png')
  }

  /**
   * 创建二维码矩阵
   * @param {string} text - 要编码的文本
   * @param {string} errorCorrectionLevel - 纠错级别
   * @returns {Array<Array<boolean>>} 二维码矩阵
   */
  createQRMatrix(text, errorCorrectionLevel) {
    // 简化的二维码生成算法
    // 实际的二维码生成算法非常复杂，这里实现一个简化的版本

    // 计算需要的版本（尺寸）
    const version = this.calculateVersion(text, errorCorrectionLevel)
    const size = this.versionSizes[version - 1]

    // 初始化矩阵
    const matrix = Array(size)
      .fill()
      .map(() => Array(size).fill(false))

    // 添加位置探测图案（三个角的方块）
    this.addPositionDetectionPatterns(matrix, size)

    // 添加分隔符
    this.addSeparators(matrix, size)

    // 添加定时图案
    this.addTimingPatterns(matrix, size)

    // 添加对齐图案（除了最小版本）
    if (version > 1) {
      this.addAlignmentPatterns(matrix, version, size)
    }

    // 添加格式信息
    this.addFormatInfo(matrix, errorCorrectionLevel, size)

    // 添加版本信息（版本7及以上）
    if (version >= 7) {
      this.addVersionInfo(matrix, version, size)
    }

    // 将文本数据编码并添加到矩阵中
    this.addData(matrix, text, errorCorrectionLevel)

    // 应用掩码模式
    this.applyMask(matrix, errorCorrectionLevel, size)

    return matrix
  }

  /**
   * 计算二维码版本
   * @param {string} text - 要编码的文本
   * @param {string} errorCorrectionLevel - 纠错级别
   * @returns {number} 版本号
   */
  calculateVersion(text, errorCorrectionLevel) {
    // 简化的版本计算
    // 实际算法需要考虑数据容量和纠错级别
    const length = text.length

    // 根据文本长度估算版本
    if (length < 20) return 1
    if (length < 40) return 2
    if (length < 80) return 3
    if (length < 120) return 4
    if (length < 160) return 5

    // 对于更长的文本，估算更高级别的版本
    return Math.min(10, Math.floor(length / 20) + 1)
  }

  /**
   * 添加位置探测图案
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {number} size - 二维码尺寸
   */
  addPositionDetectionPatterns(matrix, size) {
    const posSize = 7 // 位置探测图案的大小

    // 左上角
    this.drawPositionDetectionPattern(matrix, 0, 0, posSize)

    // 右上角
    this.drawPositionDetectionPattern(matrix, size - posSize, 0, posSize)

    // 左下角
    this.drawPositionDetectionPattern(matrix, 0, size - posSize, posSize)
  }

  /**
   * 绘制位置探测图案
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {number} size - 图案大小
   */
  drawPositionDetectionPattern(matrix, x, y, size) {
    // 绘制外部黑色方框
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // 外框和内框都是黑色，中间是白色
        if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || (i >= 2 && i <= size - 3 && j >= 2 && j <= size - 3)) {
          matrix[y + i][x + j] = true
        }
      }
    }

    // 绘制内部白色区域
    for (let i = 2; i <= size - 3; i++) {
      for (let j = 2; j <= size - 3; j++) {
        if (i !== 2 && i !== size - 3 && j !== 2 && j !== size - 3) {
          matrix[y + i][x + j] = false
        }
      }
    }
  }

  /**
   * 添加分隔符
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {number} size - 二维码尺寸
   */
  addSeparators(matrix, size) {
    const separatorSize = 8

    // 上方分隔符
    for (let i = 0; i < 7; i++) {
      matrix[7][i] = false // 上方
      matrix[i][7] = false // 左侧
      matrix[size - 8][i] = false // 下方
      matrix[size - 1 - i][7] = false // 右侧
      matrix[7][size - 8 + i] = false // 上方右侧
      matrix[size - 1 - i][size - 8] = false // 右侧下方
    }
  }

  /**
   * 添加定时图案
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {number} size - 二维码尺寸
   */
  addTimingPatterns(matrix, size) {
    // 水平定时图案
    for (let i = 8; i < size - 8; i++) {
      if (i % 2 === 0) {
        matrix[6][i] = true // 水平
        matrix[i][6] = true // 垂直
      } else {
        matrix[6][i] = false // 水平
        matrix[i][6] = false // 垂直
      }
    }
  }

  /**
   * 添加对齐图案
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {number} version - 二维码版本
   * @param {number} size - 二维码尺寸
   */
  addAlignmentPatterns(matrix, version, size) {
    // 对齐图案位置
    const positions = this.getAlignmentPatternPositions(version)

    for (const x of positions) {
      for (const y of positions) {
        // 避免与位置探测图案重叠
        if (!((x < 9 && y < 9) || (x < 9 && y >= size - 9) || (x >= size - 9 && y < 9))) {
          this.drawAlignmentPattern(matrix, x, y)
        }
      }
    }
  }

  /**
   * 获取对齐图案位置
   * @param {number} version - 二维码版本
   * @returns {Array<number>} 位置数组
   */
  getAlignmentPatternPositions(version) {
    // 简化的对齐图案位置
    const positions = [6] // 所有版本都有一个在(6, x)和(x, 6)的位置

    if (version >= 2) {
      const step = Math.floor((this.versionSizes[version - 1] - 14) / (2 * (version - 1)))
      for (let i = 1; i < version; i++) {
        positions.push(6 + i * step)
      }
    }

    // 确保最后一个位置不会太靠近边缘
    if (positions.length > 0) {
      const lastPos = positions[positions.length - 1]
      if (lastPos > this.versionSizes[version - 1] - 7) {
        positions.pop()
      }
    }

    return positions
  }

  /**
   * 绘制对齐图案
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   */
  drawAlignmentPattern(matrix, x, y) {
    const size = 5
    const centerX = x - 2
    const centerY = y - 2

    // 绘制外部黑色方框
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
          matrix[centerY + i][centerX + j] = true
        } else if (i === 1 && j === 1) {
          matrix[centerY + i][centerX + j] = true // 中心点
        } else {
          matrix[centerY + i][centerX + j] = false // 内部白色
        }
      }
    }
  }

  /**
   * 添加格式信息
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {string} errorCorrectionLevel - 纠错级别
   * @param {number} size - 二维码尺寸
   */
  addFormatInfo(matrix, errorCorrectionLevel, size) {
    // 格式信息的掩码模式
    const formatInfo = this.getFormatInfo(errorCorrectionLevel, 0) // 使用默认掩码模式

    // 上方格式信息
    for (let i = 0; i < 6; i++) {
      matrix[8][i] = (formatInfo & (1 << i)) !== 0
    }
    matrix[8][7] = (formatInfo & (1 << 6)) !== 0
    matrix[8][8] = (formatInfo & (1 << 7)) !== 0
    matrix[7][8] = (formatInfo & (1 << 8)) !== 0

    // 左侧格式信息（反向）
    for (let i = 0; i < 8; i++) {
      if (i < 6) {
        matrix[i][8] = (formatInfo & (1 << (14 - i))) !== 0
      } else {
        matrix[i + 1][8] = (formatInfo & (1 << (14 - i))) !== 0
      }
    }

    // 右侧格式信息
    for (let i = 0; i < 7; i++) {
      matrix[size - 1 - i][8] = (formatInfo & (1 << i)) !== 0
    }

    // 下方格式信息
    for (let i = 0; i < 8; i++) {
      matrix[8][size - 8 + i] = (formatInfo & (1 << (7 - i))) !== 0
    }
  }

  /**
   * 获取格式信息
   * @param {string} errorCorrectionLevel - 纠错级别
   * @param {number} maskPattern - 掩码模式
   * @returns {number} 格式信息
   */
  getFormatInfo(errorCorrectionLevel, maskPattern) {
    let levelBits
    switch (errorCorrectionLevel) {
      case 'L':
        levelBits = 1
        break
      case 'M':
        levelBits = 0
        break
      case 'Q':
        levelBits = 3
        break
      case 'H':
        levelBits = 2
        break
      default:
        levelBits = 0
    }

    // 组合纠错级别和掩码模式
    const data = (levelBits << 3) | maskPattern

    // BCH编码 - 简化处理
    const bchCode = this.calculateBCHFormat(data)

    return (data << 10) | bchCode
  }

  /**
   * 计算BCH格式码
   * @param {number} data - 数据
   * @returns {number} BCH码
   */
  calculateBCHFormat(data) {
    // QR码格式信息的BCH多项式是 10100110111
    const g = 0x537
    let d = data << 10

    // BCH校验
    while (d >> 14 !== 0) {
      d ^= g << (14 - Math.floor(Math.log2(d)))
    }

    return d
  }

  /**
   * 添加版本信息
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {number} version - 二维码版本
   * @param {number} size - 二维码尺寸
   */
  addVersionInfo(matrix, version, size) {
    const versionInfo = this.getVersionInfo(version)

    // 右上角
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        const bitIndex = j * 6 + i
        const isDark = (versionInfo >> bitIndex) & 1

        // 右上角
        matrix[i][size - 11 + j] = isDark
        // 左下角
        matrix[size - 11 + j][i] = isDark
      }
    }
  }

  /**
   * 获取版本信息
   * @param {number} version - 二维码版本
   * @returns {number} 版本信息
   */
  getVersionInfo(version) {
    // BCH版本编码
    let d = version << 12

    // 版本信息的BCH多项式是 1111100100101
    const g = 0x1f25

    while (d >> 17 !== 0) {
      d ^= g << (17 - Math.floor(Math.log2(d)))
    }

    return (version << 12) | d
  }

  /**
   * 添加数据
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {string} text - 要编码的文本
   * @param {string} errorCorrectionLevel - 纠错级别
   */
  addData(matrix, text, errorCorrectionLevel) {
    // 将文本编码为二进制数据
    const dataBits = this.encodeText(text)

    // 确定数据放置位置
    let row = matrix.length - 1
    let col = matrix.length - 1
    let up = true
    let bitIndex = 0

    // 数据放置算法
    while (row > 0) {
      // 跳过垂直定时图案列
      if (col === 6) {
        col--
      }

      // 在当前单元格放置数据
      for (let c = 0; c < 2; c++) {
        if (col - c < 0) continue

        if (!this.isFunctionalModule(row, col - c, matrix.length)) {
          if (bitIndex < dataBits.length) {
            matrix[row][col - c] = dataBits[bitIndex] === '1'
            bitIndex++
          } else {
            matrix[row][col - c] = false // 填充0
          }
        }
      }

      if (up) {
        if (row % 2 === 0) {
          col -= 2
        } else {
          row--
          if (col === 0) {
            col = 1
            up = false
          }
        }
      } else {
        if (row % 2 === 1) {
          col -= 2
        } else {
          row--
          if (col === 0) {
            col = 1
            up = true
          }
        }
      }
    }
  }

  /**
   * 检查是否为功能模块
   * @param {number} row - 行
   * @param {number} col - 列
   * @param {number} size - 尺寸
   * @returns {boolean} 是否为功能模块
   */
  isFunctionalModule(row, col, size) {
    // 位置探测图案区域
    if (row < 9 && col < 9) return true // 左上
    if (row < 9 && col >= size - 9) return true // 右上
    if (row >= size - 9 && col < 9) return true // 左下

    // 定时图案
    if (row === 6 || col === 6) return true

    return false
  }

  /**
   * 将文本编码为二进制
   * @param {string} text - 文本
   * @returns {string} 二进制字符串
   */
  encodeText(text) {
    // 简化的文本编码 - 将文本转换为字节序列
    let binary = ''

    // 添加模式指示符 (01 = 数字模式, 0001 = 字节模式)
    binary += '0100' // 字节模式

    // 添加字符计数（4位版本）
    const charCount = text.length.toString(2)
    binary += charCount.padStart(8, '0') // 假设是8位计数

    // 添加实际数据
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i)
      binary += code.toString(2).padStart(8, '0')
    }

    return binary
  }

  /**
   * 应用掩码
   * @param {Array<Array<boolean>>} matrix - 二维码矩阵
   * @param {string} errorCorrectionLevel - 纠错级别
   * @param {number} size - 二维码尺寸
   */
  applyMask(matrix, errorCorrectionLevel, size) {
    // 简化的掩码应用 - 这里使用固定的掩码模式
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        // 避开功能模块
        if (!this.isFunctionalModule(row, col, size) && col !== 6 && row !== 6) {
          // 避开定时图案
          // 使用掩码模式1 (row + col) % 2 === 0
          if ((row + col) % 2 === 0) {
            matrix[row][col] = !matrix[row][col]
          }
        }
      }
    }
  }

  /**
   * 将二维码渲染到指定的元素
   * @param {string|HTMLElement} element - 目标元素或元素ID
   * @param {string} text - 要编码的文本
   * @param {Object} options - 选项配置
   */
  render(element, text, options = {}) {
    const targetElement = typeof element === 'string' ? document.getElementById(element) : element

    if (!targetElement) {
      throw new Error(`Element with id '${element}' not found`)
    }

    const qrCodeDataUrl = this.generate(text, options)
    const img = document.createElement('img')
    img.src = qrCodeDataUrl
    img.style.display = 'block'
    img.style.maxWidth = '100%'

    // 清空目标元素并添加二维码图片
    targetElement.innerHTML = ''
    targetElement.appendChild(img)
  }
}

// 将类添加到全局DC对象
window.DC = window.DC || {}
window.DC.QRCode = dcQRCode

// export default dcQRCode;
