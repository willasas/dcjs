/**
 * dcpicolor 工具类单元测试
 * @author DC Team
 * @version 1.0.0
 */

// 导入要测试的模块
const dcColor = require('../../../src/utils/dcpicolor.js')

// 模拟浏览器API
if (typeof window === 'undefined') {
  global.window = {}
  global.document = {
    createElement: function(tag) {
      if (tag === 'canvas') {
        return {
          width: 100,
          height: 100,
          getContext: function() {
            return {
              drawImage: function() {},
              getImageData: function() {
                return {
                  width: 100,
                  height: 100,
                  data: new Uint8ClampedArray(100 * 100 * 4).fill(0)
                }
              }
            }
          }
        }
      } else if (tag === 'img') {
        return {
          crossOrigin: '',
          src: '',
          onload: null,
          onerror: null
        }
      }
    }
  }
  global.HTMLImageElement = function() {
    return {
      crossOrigin: '',
      src: '',
      onload: null,
      onerror: null
    }
  }
  global.Image = global.HTMLImageElement
}

// 测试套件
function runTests() {
  let passedTests = 0
  let totalTests = 0

  // 测试辅助函数
  function test(description, testFunction) {
    totalTests++
    try {
      const result = testFunction()
      if (result) {
        console.log(`✓ ${description}`)
        passedTests++
      } else {
        console.error(`✗ ${description}`)
      }
    } catch (error) {
      console.error(`✗ ${description}: ${error.message}`)
    }
  }

  // 测试异步函数
  async function testAsync(description, testFunction) {
    totalTests++
    try {
      const result = await testFunction()
      if (result) {
        console.log(`✓ ${description}`)
        passedTests++
      } else {
        console.error(`✗ ${description}`)
      }
    } catch (error) {
      console.error(`✗ ${description}: ${error.message}`)
    }
  }

  // 基本功能测试
  console.log('=== 基本功能测试 ===')

  test('dcColor 工具类存在', () => {
    return typeof dcColor === 'function'
  })

  // 静态方法存在性测试
  console.log('\n=== 静态方法存在性测试 ===')

  test('getColorPalette 方法存在', () => {
    return typeof dcColor.getColorPalette === 'function'
  })

  test('getDominantColor 方法存在', () => {
    return typeof dcColor.getDominantColor === 'function'
  })

  test('getBackgroundColor 方法存在', () => {
    return typeof dcColor.getBackgroundColor === 'function'
  })

  test('getImageColors 方法存在', () => {
    return typeof dcColor.getImageColors === 'function'
  })

  test('rgbToHex 方法存在', () => {
    return typeof dcColor.rgbToHex === 'function'
  })

  test('hexToRgb 方法存在', () => {
    return typeof dcColor.hexToRgb === 'function'
  })

  test('sortColorsByBrightness 方法存在', () => {
    return typeof dcColor.sortColorsByBrightness === 'function'
  })

  // 功能测试
  console.log('\n=== 功能测试 ===')

  test('rgbToHex 方法能够正确转换RGB颜色为十六进制颜色', () => {
    const rgb = [255, 0, 0]
    const hex = dcColor.rgbToHex(rgb)
    return hex === '#ff0000'
  })

  test('hexToRgb 方法能够正确转换十六进制颜色为RGB颜色', () => {
    const hex = '#ff0000'
    const rgb = dcColor.hexToRgb(hex)
    return JSON.stringify(rgb) === JSON.stringify([255, 0, 0])
  })

  test('sortColorsByBrightness 方法能够正确排序颜色', () => {
    const colors = [[0, 0, 0], [255, 255, 255], [128, 128, 128]]
    const sortedColors = dcColor.sortColorsByBrightness(colors)
    return sortedColors[0].every((val, i) => val === colors[0][i]) &&
           sortedColors[1].every((val, i) => val === colors[2][i]) &&
           sortedColors[2].every((val, i) => val === colors[1][i])
  })

  // 异步方法测试
  console.log('\n=== 异步方法测试 ===')

  testAsync('getColorPalette 方法返回 Promise', async () => {
    // 创建模拟的ImageData
    const mockImageData = {
      width: 100,
      height: 100,
      data: new Uint8ClampedArray(100 * 100 * 4).fill(0)
    }

    // 模拟loadImage方法
    const originalLoadImage = dcColor.loadImage
    dcColor.loadImage = async () => mockImageData

    try {
      const result = dcColor.getColorPalette('https://example.com/image.jpg')
      const isPromise = result instanceof Promise
      return isPromise
    } finally {
      // 恢复原始方法
      dcColor.loadImage = originalLoadImage
    }
  })

  testAsync('getDominantColor 方法返回 Promise', async () => {
    // 创建模拟的ImageData
    const mockImageData = {
      width: 100,
      height: 100,
      data: new Uint8ClampedArray(100 * 100 * 4).fill(0)
    }

    // 模拟loadImage方法
    const originalLoadImage = dcColor.loadImage
    dcColor.loadImage = async () => mockImageData

    try {
      const result = dcColor.getDominantColor('https://example.com/image.jpg')
      const isPromise = result instanceof Promise
      return isPromise
    } finally {
      // 恢复原始方法
      dcColor.loadImage = originalLoadImage
    }
  })

  testAsync('getBackgroundColor 方法返回 Promise', async () => {
    // 创建模拟的ImageData
    const mockImageData = {
      width: 100,
      height: 100,
      data: new Uint8ClampedArray(100 * 100 * 4).fill(0)
    }

    // 模拟loadImage方法
    const originalLoadImage = dcColor.loadImage
    dcColor.loadImage = async () => mockImageData

    try {
      const result = dcColor.getBackgroundColor('https://example.com/image.jpg')
      const isPromise = result instanceof Promise
      return isPromise
    } finally {
      // 恢复原始方法
      dcColor.loadImage = originalLoadImage
    }
  })

  testAsync('getImageColors 方法返回 Promise', async () => {
    // 创建模拟的ImageData
    const mockImageData = {
      width: 100,
      height: 100,
      data: new Uint8ClampedArray(100 * 100 * 4).fill(0)
    }

    // 模拟loadImage方法
    const originalLoadImage = dcColor.loadImage
    dcColor.loadImage = async () => mockImageData

    try {
      const result = dcColor.getImageColors('https://example.com/image.jpg')
      const isPromise = result instanceof Promise
      return isPromise
    } finally {
      // 恢复原始方法
      dcColor.loadImage = originalLoadImage
    }
  })

  // 边界情况测试
  console.log('\n=== 边界情况测试 ===')

  test('rgbToHex 方法能够处理边界值', () => {
    const rgb = [0, 0, 0]
    const hex = dcColor.rgbToHex(rgb)
    return hex === '#000000'
  })

  test('hexToRgb 方法能够处理边界值', () => {
    const hex = '#000000'
    const rgb = dcColor.hexToRgb(hex)
    return JSON.stringify(rgb) === JSON.stringify([0, 0, 0])
  })

  // 输出测试结果
  console.log(`\n=== 测试完成 ===`)
  console.log(`总测试数: ${totalTests}`)
  console.log(`通过测试: ${passedTests}`)
  console.log(`失败测试: ${totalTests - passedTests}`)
  console.log(`通过率: ${((passedTests / totalTests) * 100).toFixed(2)}%`)

  return {
    total: totalTests,
    passed: passedTests,
    failed: totalTests - passedTests,
    passRate: (passedTests / totalTests) * 100
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  runTests()
}

// 导出测试函数
module.exports = runTests
