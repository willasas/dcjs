/**
 * @file dcplatform.test.js
 * @description 环境判断工具类测试
 * @author DC.js Team
 * @version 1.0.0
 */

// 保存原始的navigator对象
const originalNavigator = global.navigator;
const originalWindow = global.window;
const originalDocument = global.document;

describe('DCPlatform', () => {
  let platform

  beforeEach(() => {
    // 重置mock
    jest.clearAllMocks()
  })

  afterEach(() => {
    // 恢复原始对象
    if (originalNavigator) {
      global.navigator = originalNavigator
    }
    if (originalWindow) {
      global.window = originalWindow
    }
    if (originalDocument) {
      global.document = originalDocument
    }
    platform = null
  })

  // 模拟PC端环境
  function mockPCEvironment() {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      platform: 'Win32'
    }
    global.window = {}
    global.document = {
      fullscreenElement: null,
      webkitFullscreenElement: null,
      mozFullScreenElement: null,
      msFullscreenElement: null
    }
  }

  // 模拟移动端环境
  function mockMobileEnvironment() {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      platform: 'iPhone'
    }
    global.window = {}
    global.document = {
      fullscreenElement: null,
      webkitFullscreenElement: null,
      mozFullScreenElement: null,
      msFullscreenElement: null
    }
  }

  // 模拟平板环境
  function mockTabletEnvironment() {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      platform: 'iPad'
    }
    global.window = {}
    global.document = {
      fullscreenElement: null,
      webkitFullscreenElement: null,
      mozFullScreenElement: null,
      msFullscreenElement: null
    }
  }

  // 模拟微信环境
  function mockWeChatEnvironment() {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0',
      platform: 'iPhone'
    }
    global.window = {}
    global.document = {
      fullscreenElement: null,
      webkitFullscreenElement: null,
      mozFullScreenElement: null,
      msFullscreenElement: null
    }
  }

  // 模拟QQ环境
  function mockQQEnvironment() {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 QQ/8.5.0',
      platform: 'iPhone'
    }
    global.window = {}
    global.document = {
      fullscreenElement: null,
      webkitFullscreenElement: null,
      mozFullScreenElement: null,
      msFullscreenElement: null
    }
  }

  // 模拟微信小程序环境
  function mockWeChatMiniProgramEnvironment() {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0',
      platform: 'iPhone'
    }
    global.window = {
      __wxjs_environment: 'miniprogram'
    }
    global.document = {
      fullscreenElement: null,
      webkitFullscreenElement: null,
      mozFullScreenElement: null,
      msFullscreenElement: null
    }
  }

  // 模拟全屏模式
  function mockFullscreenEnvironment() {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      platform: 'Win32'
    }
    global.window = {}
    global.document = {
      fullscreenElement: {},
      webkitFullscreenElement: null,
      mozFullScreenElement: null,
      msFullscreenElement: null
    }
  }

  test('should create instance successfully', () => {
    mockPCEvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform).toBeInstanceOf(require('../../../src/utils/dcplatform'))
  })

  test('should detect PC environment', () => {
    mockPCEvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isPC()).toBe(true)
    expect(platform.isMobile()).toBe(false)
    expect(platform.isTablet()).toBe(false)
    expect(platform.getDeviceType()).toBe('pc')
  })

  test('should detect mobile environment', () => {
    mockMobileEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isPC()).toBe(false)
    expect(platform.isMobile()).toBe(true)
    expect(platform.isTablet()).toBe(false)
    expect(platform.getDeviceType()).toBe('mobile')
  })

  test('should detect tablet environment', () => {
    mockTabletEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isPC()).toBe(false)
    expect(platform.isMobile()).toBe(false)
    expect(platform.isTablet()).toBe(true)
    expect(platform.getDeviceType()).toBe('tablet')
  })

  test('should detect WeChat environment', () => {
    mockWeChatEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isWeChat()).toBe(true)
    expect(platform.isWeChatApp()).toBe(true)
  })

  test('should detect QQ environment', () => {
    mockQQEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isQQ()).toBe(true)
    expect(platform.isQQApp()).toBe(true)
  })

  test('should detect WeChat Mini Program environment', () => {
    mockWeChatMiniProgramEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isWeChatMiniProgram()).toBe(true)
  })

  test('should detect fullscreen mode', () => {
    mockFullscreenEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isFullscreen()).toBe(true)
  })

  test('should get device type correctly', () => {
    // 测试PC
    mockPCEvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getDeviceType()).toBe('pc')

    // 测试移动
    mockMobileEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getDeviceType()).toBe('mobile')

    // 测试平板
    mockTabletEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getDeviceType()).toBe('tablet')
  })

  test('should get OS correctly', () => {
    // 测试Windows
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36',
      platform: 'Win32'
    }
    global.window = {}
    global.document = {}
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getOS()).toBe('windows')

    // 测试Mac
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
      platform: 'MacIntel'
    }
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getOS()).toBe('mac')

    // 测试Linux
    global.navigator = {
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      platform: 'Linux x86_64'
    }
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getOS()).toBe('linux')

    // 测试iOS
    mockMobileEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getOS()).toBe('ios')

    // 测试Android
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
      platform: 'Linux armv8l'
    }
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getOS()).toBe('android')
  })

  test('should get browser correctly', () => {
    // 测试Chrome
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      platform: 'Win32'
    }
    global.window = {}
    global.document = {}
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getBrowser()).toBe('chrome')

    // 测试Firefox
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      platform: 'Win32'
    }
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getBrowser()).toBe('firefox')

    // 测试Safari
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
      platform: 'MacIntel'
    }
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getBrowser()).toBe('safari')

    // 测试QQ浏览器
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 QQBrowser/9.0.2524.400',
      platform: 'Win32'
    }
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getBrowser()).toBe('qq')
  })

  test('should detect iOS device', () => {
    mockMobileEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isIOS()).toBe(true)
    expect(platform.isIPhone()).toBe(true)
    expect(platform.isAndroid()).toBe(false)
  })

  test('should detect Android device', () => {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
      platform: 'Linux armv8l'
    }
    global.window = {}
    global.document = {}
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isIOS()).toBe(false)
    expect(platform.isAndroid()).toBe(true)
  })

  test('should detect fullscreen mode correctly', () => {
    // 非全屏
    mockPCEvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isFullscreen()).toBe(false)

    // 全屏
    mockFullscreenEnvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isFullscreen()).toBe(true)
  })

  test('should detect webkit browser', () => {
    mockPCEvironment()
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.isWebkit()).toBe(true)
  })

  test('should handle unknown environment', () => {
    global.navigator = {
      userAgent: 'Unknown browser',
      platform: 'Unknown platform'
    }
    global.window = {}
    global.document = {
      fullscreenElement: null,
      webkitFullscreenElement: null,
      mozFullScreenElement: null,
      msFullscreenElement: null
    }
    platform = new require('../../../src/utils/dcplatform')()
    expect(platform.getOS()).toBe('unknown')
    expect(platform.getBrowser()).toBe('unknown')
  })
})
