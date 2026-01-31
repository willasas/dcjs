/**
 * dcWaterfall 工具类测试
 */
const dcWaterfall = require('../../../src/utils/dcwaterfall')

describe('dcWaterfall 工具类测试', () => {
  // 模拟DOM环境
  let container
  let mockGetBoundingClientRect

  beforeEach(() => {
    // 创建模拟容器元素
    container = document.createElement('div')
    container.className = 'waterfall-container'
    container.style.position = 'relative'
    container.style.width = '800px'

    // 模拟getBoundingClientRect方法
    mockGetBoundingClientRect = jest.fn(() => ({
      width: 800,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 800
    }))
    container.getBoundingClientRect = mockGetBoundingClientRect

    // 添加到文档中
    document.body.appendChild(container)

    // 模拟window.resize事件
    window.resizeTo = jest.fn((width, height) => {
      window.innerWidth = width
      window.innerHeight = height
      window.dispatchEvent(new Event('resize'))
    })
  })

  afterEach(() => {
    // 清理文档
    document.body.innerHTML = ''
    // 清除所有监听器
    jest.clearAllMocks()
  })

  test('构造函数初始化测试', () => {
    const waterfall = new dcWaterfall('.waterfall-container')

    expect(waterfall.container).toBe(container)
    expect(waterfall.containerWidth).toBe(800)
    expect(waterfall.columnCount).toBeGreaterThan(0)
    expect(waterfall.columnHeights).toBeInstanceOf(Array)
    expect(waterfall.columnHeights.length).toBe(waterfall.columnCount)
  })

  test('构造函数找不到容器时抛出错误', () => {
    expect(() => {
      new dcWaterfall('.non-existent-container')
    }).toThrow('Container not found: .non-existent-container')
  })

  test('parsePercentage方法测试', () => {
    const waterfall = new dcWaterfall('.waterfall-container')

    expect(waterfall.parsePercentage('22%')).toBe(0.22)
    expect(waterfall.parsePercentage('50')).toBe(50)
    expect(waterfall.parsePercentage('100%')).toBe(1)

    expect(() => {
      waterfall.parsePercentage('invalid')
    }).toThrow('Invalid percentage string')
  })

  test('layoutItems方法测试', () => {
    const waterfall = new dcWaterfall('.waterfall-container')

    // 创建测试项
    const items = []
    for (let i = 0; i < 5; i++) {
      const item = document.createElement('div')
      item.className = 'waterfall-item'
      item.style.height = '100px'
      item.offsetHeight = 100
      items.push(item)
      container.appendChild(item)
    }

    // 布局项
    waterfall.layoutItems(items)

    // 验证每个项都有top和left样式
    items.forEach(item => {
      expect(item.style.top).not.toBe('')
      expect(item.style.left).not.toBe('')
    })

    // 验证容器高度被设置
    expect(container.style.height).not.toBe('')
  })

  test('resetLayout方法测试', () => {
    const waterfall = new dcWaterfall('.waterfall-container')

    // 创建测试项
    for (let i = 0; i < 3; i++) {
      const item = document.createElement('div')
      item.className = 'waterfall-item'
      item.style.height = '100px'
      item.offsetHeight = 100
      container.appendChild(item)
    }

    // 初始布局
    waterfall.resetLayout()

    // 验证容器高度被设置
    expect(container.style.height).not.toBe('')
  })

  test('dynamicLoadMoreItems方法测试', () => {
    const waterfall = new dcWaterfall('.waterfall-container')
    const initialItemCount = container.getElementsByClassName('waterfall-item').length

    // 加载更多项
    waterfall.dynamicLoadMoreItems(3)

    // 验证新项被创建并添加到容器
    const newItemCount = container.getElementsByClassName('waterfall-item').length
    expect(newItemCount).toBe(initialItemCount + 3)
  })

  test('onResize方法测试', () => {
    const waterfall = new dcWaterfall('.waterfall-container')
    const originalColumnCount = waterfall.columnCount

    // 模拟窗口 resize
    mockGetBoundingClientRect.mockReturnValue({
      width: 1200,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 1200
    })

    window.resizeTo(1200, 800)

    // 验证布局被重新计算
    expect(waterfall.columnCount).toBeGreaterThan(originalColumnCount)
  })
})
