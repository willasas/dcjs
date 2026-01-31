/**
 * dcNetworkChecker 工具类单元测试
 * @author DC Team
 * @version 1.0.0
 */

// 导入要测试的模块
const DCNetworkChecker = require('../../../src/utils/dcNetworkChecker.js')

// 模拟浏览器API
if (typeof window === 'undefined') {
  global.window = {
    addEventListener: () => {},
    removeEventListener: () => {},
    clearInterval: () => {},
    setInterval: () => 1,
  }
  global.navigator = {
    onLine: true,
    connection: {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false,
      downlinkMax: 100,
    },
  }
  global.AbortController = class {
    constructor() {
      this.signal = {}
    }
    abort() {}
  }
  global.fetch = () =>
    Promise.resolve({
      ok: true,
      status: 200,
    })
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

  test('DCNetworkChecker 工具类存在', () => {
    return typeof DCNetworkChecker === 'function'
  })

  test('DCNetworkChecker 可以实例化', () => {
    const checker = new DCNetworkChecker()
    return typeof checker === 'object'
  })

  test('DCNetworkChecker 可以使用自定义配置实例化', () => {
    const options = {
      testUrls: ['https://example.com'],
      timeout: 3000,
      interval: 5000,
      retryAttempts: 2,
      retryDelay: 500,
    }
    const checker = new DCNetworkChecker(options)
    return typeof checker === 'object'
  })

  // 方法存在性测试
  console.log('\n=== 方法存在性测试 ===')

  test('testConnection 方法存在', () => {
    const checker = new DCNetworkChecker()
    return typeof checker.testConnection === 'function'
  })

  test('testConnectionWithRetry 方法存在', () => {
    const checker = new DCNetworkChecker()
    return typeof checker.testConnectionWithRetry === 'function'
  })

  test('getNetworkInfo 方法存在', () => {
    const checker = new DCNetworkChecker()
    return typeof checker.getNetworkInfo === 'function'
  })

  test('startMonitoring 方法存在', () => {
    const checker = new DCNetworkChecker()
    return typeof checker.startMonitoring === 'function'
  })

  test('stopMonitoring 方法存在', () => {
    const checker = new DCNetworkChecker()
    return typeof checker.stopMonitoring === 'function'
  })

  test('getStatusSummary 方法存在', () => {
    const checker = new DCNetworkChecker()
    return typeof checker.getStatusSummary === 'function'
  })

  // 功能测试
  console.log('\n=== 功能测试 ===')

  test('getNetworkInfo 方法返回正确的网络信息', () => {
    const checker = new DCNetworkChecker()
    const info = checker.getNetworkInfo()
    return typeof info === 'object' && 'online' in info && 'effectiveType' in info && 'downlink' in info && 'rtt' in info && 'saveData' in info && 'downlinkMax' in info
  })

  test('testConnection 方法返回 Promise', () => {
    const checker = new DCNetworkChecker()
    const result = checker.testConnection()
    return result instanceof Promise
  })

  test('testConnectionWithRetry 方法返回 Promise', () => {
    const checker = new DCNetworkChecker()
    const result = checker.testConnectionWithRetry()
    return result instanceof Promise
  })

  test('getStatusSummary 方法返回 Promise', () => {
    const checker = new DCNetworkChecker()
    const result = checker.getStatusSummary()
    return result instanceof Promise
  })

  test('startMonitoring 方法可以启动监控', () => {
    const checker = new DCNetworkChecker()
    try {
      checker.startMonitoring()
      return true
    } catch (error) {
      return false
    }
  })

  test('stopMonitoring 方法可以停止监控', () => {
    const checker = new DCNetworkChecker()
    try {
      checker.startMonitoring()
      checker.stopMonitoring()
      return true
    } catch (error) {
      return false
    }
  })

  test('stopMonitoring 方法在未启动监控时不会抛出错误', () => {
    const checker = new DCNetworkChecker()
    try {
      checker.stopMonitoring()
      return true
    } catch (error) {
      return false
    }
  })

  test('startMonitoring 方法在已启动监控时不会抛出错误', () => {
    const checker = new DCNetworkChecker()
    try {
      checker.startMonitoring()
      checker.startMonitoring()
      return true
    } catch (error) {
      return false
    } finally {
      checker.stopMonitoring()
    }
  })

  // 边界情况测试
  console.log('\n=== 边界情况测试 ===')

  test('使用空配置对象实例化不会抛出错误', () => {
    try {
      const checker = new DCNetworkChecker({})
      return typeof checker === 'object'
    } catch (error) {
      return false
    }
  })

  test('使用部分配置对象实例化不会抛出错误', () => {
    try {
      const checker = new DCNetworkChecker({ timeout: 1000 })
      return typeof checker === 'object'
    } catch (error) {
      return false
    }
  })

  // 模拟离线状态测试
  console.log('\n=== 模拟离线状态测试 ===')

  test('模拟离线状态时 getNetworkInfo 返回正确的状态', () => {
    const originalOnline = global.navigator.onLine
    global.navigator.onLine = false

    const checker = new DCNetworkChecker()
    const info = checker.getNetworkInfo()

    global.navigator.onLine = originalOnline
    return info.online === false
  })

  // 测试事件回调
  console.log('\n=== 事件回调测试 ===')

  test('可以设置事件回调', () => {
    let onlineCalled = false
    let offlineCalled = false
    let statusChangeCalled = false

    const checker = new DCNetworkChecker({
      onOnline: () => {
        onlineCalled = true
      },
      onOffline: () => {
        offlineCalled = true
      },
      onStatusChange: () => {
        statusChangeCalled = true
      },
    })

    return typeof checker.onOnline === 'function' && typeof checker.onOffline === 'function' && typeof checker.onStatusChange === 'function'
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
    passRate: (passedTests / totalTests) * 100,
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  runTests()
}

// 导出测试函数
module.exports = runTests
