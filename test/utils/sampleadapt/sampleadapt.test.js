/**
 * sampleadapt 工具类测试
 */
const SimpleAdapt = require('../../../src/utils/sampleadapt.js')

describe('sampleadapt 工具类测试', () => {
  beforeEach(() => {
    // 模拟浏览器环境
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      writable: true
    })
    
    // 模拟文档元素
    Object.defineProperty(document, 'documentElement', {
      value: {
        clientWidth: 1920,
        clientHeight: 1080,
        style: {
          setProperty: jest.fn(),
          removeProperty: jest.fn(),
          fontSize: ''
        }
      },
      writable: true
    })
    
    // 模拟事件监听器
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
    document.addEventListener = jest.fn()
    
    // 模拟requestAnimationFrame
    global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0))
  })
  
  afterEach(() => {
    // 清理所有监听器
    jest.clearAllMocks()
  })
  
  test('构造函数初始化测试', () => {
    const simpleAdapt = new SimpleAdapt({
      unit: 'rem',
      rootFontSize: 100,
      designSize: {
        sizes: [
          { width: 1920, height: 1080 },
          { width: 750, height: 1624 }
        ]
      }
    })
    
    expect(simpleAdapt.config.unit).toBe('rem')
    expect(simpleAdapt.config.rootFontSize).toBe(100)
    expect(simpleAdapt.config.designSize.sizes).toHaveLength(2)
    expect(simpleAdapt.isMobile).toBe(false)
  })
  
  test('getClosestDesignSize 方法测试', () => {
    const simpleAdapt = new SimpleAdapt()
    
    // 模拟窗口大小为 1920x1080
    document.documentElement.clientWidth = 1920
    document.documentElement.clientHeight = 1080
    
    const designSize = simpleAdapt.getClosestDesignSize()
    expect(designSize.width).toBe(1920)
    expect(designSize.height).toBe(1080)
    
    // 模拟窗口大小为 750x1624
    document.documentElement.clientWidth = 750
    document.documentElement.clientHeight = 1624
    
    const mobileDesignSize = simpleAdapt.getClosestDesignSize()
    expect(mobileDesignSize.width).toBe(750)
    expect(mobileDesignSize.height).toBe(1624)
  })
  
  test('getScale 方法测试', () => {
    const simpleAdapt = new SimpleAdapt()
    const designSize = { width: 1920, height: 1080 }
    
    // 模拟窗口大小与设计尺寸相同
    document.documentElement.clientWidth = 1920
    document.documentElement.clientHeight = 1080
    let scale = simpleAdapt.getScale(designSize)
    expect(scale).toBe(1)
    
    // 模拟窗口大小为设计尺寸的一半
    document.documentElement.clientWidth = 960
    document.documentElement.clientHeight = 540
    scale = simpleAdapt.getScale(designSize)
    expect(scale).toBe(0.5)
  })
  
  test('setCSSVariables 方法测试', () => {
    const simpleAdapt = new SimpleAdapt({ unit: 'rem' })
    const scale = 1
    const designSize = { width: 1920, height: 1080 }
    
    simpleAdapt.setCSSVariables(scale, designSize)
    
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--scale', scale)
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--design-width', '1920px')
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--design-height', '1080px')
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--vw', 100 / 1920 + 'vw')
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--vh', 100 / 1080 + 'vh')
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--rem-base', '100px')
    expect(document.documentElement.style.fontSize).toBe('100px')
  })
  
  test('adapt 方法测试', () => {
    const simpleAdapt = new SimpleAdapt()
    
    // 模拟getClosestDesignSize和getScale方法
    simpleAdapt.getClosestDesignSize = jest.fn(() => ({ width: 1920, height: 1080 }))
    simpleAdapt.getScale = jest.fn(() => 1)
    simpleAdapt.setCSSVariables = jest.fn()
    
    simpleAdapt.adapt()
    
    expect(simpleAdapt.getClosestDesignSize).toHaveBeenCalled()
    expect(simpleAdapt.getScale).toHaveBeenCalledWith({ width: 1920, height: 1080 })
    expect(simpleAdapt.setCSSVariables).toHaveBeenCalledWith(1, { width: 1920, height: 1080 })
  })
  
  test('setUnit 方法测试', () => {
    const simpleAdapt = new SimpleAdapt({ unit: 'rem' })
    simpleAdapt.adapt = jest.fn()
    
    // 切换到vw单位
    simpleAdapt.setUnit('vw')
    expect(simpleAdapt.config.unit).toBe('vw')
    expect(simpleAdapt.adapt).toHaveBeenCalled()
    
    // 切换到无效单位
    simpleAdapt.setUnit('invalid')
    expect(simpleAdapt.config.unit).toBe('vw') // 应该保持不变
  })
  
  test('setDesignSizes 方法测试', () => {
    const simpleAdapt = new SimpleAdapt()
    simpleAdapt.adapt = jest.fn()
    
    const newSizes = [
      { width: 3840, height: 2160 },
      { width: 1920, height: 1080 }
    ]
    
    simpleAdapt.setDesignSizes(newSizes)
    expect(simpleAdapt.config.designSize.sizes).toEqual(newSizes)
    expect(simpleAdapt.adapt).toHaveBeenCalled()
  })
  
  test('destroy 方法测试', () => {
    const simpleAdapt = new SimpleAdapt()
    
    simpleAdapt.destroy()
    
    expect(window.removeEventListener).toHaveBeenCalled()
    expect(document.documentElement.style.fontSize).toBe('')
  })
  
  test('px2rem 方法测试', () => {
    const simpleAdapt = new SimpleAdapt({ rootFontSize: 100 })
    
    const remValue = simpleAdapt.px2rem(200)
    expect(remValue).toBe('2rem')
  })
  
  test('px2vw 方法测试', () => {
    const simpleAdapt = new SimpleAdapt()
    simpleAdapt.getClosestDesignSize = jest.fn(() => ({ width: 1920, height: 1080 }))
    
    const vwValue = simpleAdapt.px2vw(192)
    expect(vwValue).toBe('10vw')
  })
  
  test('px2vh 方法测试', () => {
    const simpleAdapt = new SimpleAdapt()
    simpleAdapt.getClosestDesignSize = jest.fn(() => ({ width: 1920, height: 1080 }))
    
    const vhValue = simpleAdapt.px2vh(108)
    expect(vhValue).toBe('10vh')
  })
  
  test('debounce 方法测试', () => {
    const simpleAdapt = new SimpleAdapt()
    const mockFn = jest.fn()
    const debouncedFn = simpleAdapt.debounce(mockFn, 100)
    
    // 连续调用多次
    debouncedFn()
    debouncedFn()
    debouncedFn()
    
    // 立即检查，应该还没有调用
    expect(mockFn).not.toHaveBeenCalled()
    
    // 等待150ms后检查
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1)
    }, 150)
  })
  
  test('移动设备检测测试', () => {
    // 模拟移动设备
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15',
      writable: true
    })
    
    const simpleAdapt = new SimpleAdapt()
    expect(simpleAdapt.isMobile).toBe(true)
  })
})
