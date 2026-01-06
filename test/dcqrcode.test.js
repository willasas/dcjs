/**
 * dcqrcode工具类测试用例
 */

// 使用Jest进行测试
describe('DC.QRCode', () => {
  let qrCode

  // 在每个测试前初始化
  beforeEach(() => {
    // 确保DC对象存在
    if (typeof window !== 'undefined' && window.DC && window.DC.QRCode) {
      qrCode = new window.DC.QRCode()
    } else {
      // 如果在Node.js环境中运行，需要手动导入
      qrCode = new (require('../src/utils/dcqrcode.js').default)()
    }
  })

  test('should create QRCode instance', () => {
    expect(qrCode).toBeInstanceOf(Object)
    expect(typeof qrCode.generate).toBe('function')
    expect(typeof qrCode.render).toBe('function')
  })

  test('should generate QR code data URL', () => {
    const text = 'https://example.com'
    const dataUrl = qrCode.generate(text)

    expect(typeof dataUrl).toBe('string')
    expect(dataUrl).toMatch(/^data:image\/png;base64,/)
  })

  test('should generate QR code with custom options', () => {
    const text = 'Hello World'
    const options = {
      size: 300,
      bgColor: '#FFFFFF',
      fgColor: '#FF0000',
      margin: 5,
    }

    const dataUrl = qrCode.generate(text, options)

    expect(typeof dataUrl).toBe('string')
    expect(dataUrl).toMatch(/^data:image\/png;base64,/)
  })

  test('should render QR code to element', () => {
    // 创建一个模拟的DOM元素
    document.body.innerHTML = '<div id="qrcode-container"></div>'
    const container = document.getElementById('qrcode-container')

    const text = 'https://example.com'
    const options = {
      size: 200,
      bgColor: '#FFFFFF',
      fgColor: '#000000',
    }

    // 捕获渲染异常
    expect(() => {
      qrCode.render(container, text, options)
    }).not.toThrow()

    // 检查容器中是否添加了img元素
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img.src).toMatch(/^data:image\/png;base64,/)
    expect(img.style.display).toBe('block')
  })

  test('should render QR code by element ID', () => {
    // 创建一个模拟的DOM元素
    document.body.innerHTML = '<div id="qrcode-test"></div>'

    const text = 'Test Text'

    // 捕获渲染异常
    expect(() => {
      qrCode.render('qrcode-test', text)
    }).not.toThrow()

    // 检查容器中是否添加了img元素
    const container = document.getElementById('qrcode-test')
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img.src).toMatch(/^data:image\/png;base64,/)
  })

  test('should throw error for non-existent element ID', () => {
    expect(() => {
      qrCode.render('non-existent-id', 'test')
    }).toThrow("Element with id 'non-existent-id' not found")
  })

  test('should handle long text input', () => {
    const longText = 'A'.repeat(100) // 使用较短的文本以避免性能问题
    const dataUrl = qrCode.generate(longText)

    expect(typeof dataUrl).toBe('string')
    expect(dataUrl).toMatch(/^data:image\/png;base64,/)
  })

  test('should handle special characters', () => {
    const specialText = 'Special chars: !@#$%^&*()_+{}[]|\\:";?/.>,<`~'
    const dataUrl = qrCode.generate(specialText)

    expect(typeof dataUrl).toBe('string')
    expect(dataUrl).toMatch(/^data:image\/png;base64,/)
  })

  test('should have default options when none provided', () => {
    const text = 'Default options test'
    const dataUrl = qrCode.generate(text) // 不传入options参数

    expect(typeof dataUrl).toBe('string')
    expect(dataUrl).toMatch(/^data:image\/png;base64,/)
  })
})
