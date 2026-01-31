/**
 * @file dcqrcode.test.js
 * @description 二维码生成工具类测试
 * @author DC.js Team
 * @version 1.0.0
 */

// 保存原始的document对象
const originalDocument = global.document;

// 模拟Canvas API
class MockCanvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.context = new MockCanvasContext();
  }
  
  getContext(type) {
    if (type === '2d') {
      return this.context;
    }
    return null;
  }
  
  toDataURL(format) {
    return `data:${format || 'image/png'};base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==`;
  }
}

class MockCanvasContext {
  constructor() {
    this.fillStyle = '#000000';
    this.fillRectCalls = [];
  }
  
  fillRect(x, y, width, height) {
    this.fillRectCalls.push({ x, y, width, height, fillStyle: this.fillStyle });
  }
  
  set fillStyle(value) {
    this._fillStyle = value;
  }
  
  get fillStyle() {
    return this._fillStyle;
  }
}

describe('dcQRCode', () => {
  let qrCode

  beforeEach(() => {
    // 重置mock
    jest.clearAllMocks()
    
    // 模拟document对象
    global.document = {
      createElement: jest.fn((tagName) => {
        if (tagName === 'canvas') {
          return new MockCanvas(200, 200);
        }
        return {
          style: {},
          innerHTML: '',
          appendChild: jest.fn()
        };
      }),
      getElementById: jest.fn((id) => {
        if (id === 'test-element') {
          return {
            innerHTML: '',
            appendChild: jest.fn()
          };
        }
        return null;
      })
    };
    
    // 引入并创建实例
    const DCQRCode = require('../../../src/utils/dcqrcode');
    qrCode = new DCQRCode();
  })

  afterEach(() => {
    // 恢复原始document对象
    if (originalDocument) {
      global.document = originalDocument;
    }
    qrCode = null;
  })

  test('should create instance successfully', () => {
    expect(qrCode).toBeInstanceOf(require('../../../src/utils/dcqrcode'));
  })

  test('should generate QR code data URL', () => {
    const text = 'Hello, World!';
    const options = {
      size: 200,
      bgColor: '#FFFFFF',
      fgColor: '#000000',
      margin: 4,
      errorCorrectionLevel: 'M'
    };
    
    const dataUrl = qrCode.generate(text, options);
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl.startsWith('data:image/png;base64')).toBe(true);
  })

  test('should generate QR code with default options', () => {
    const text = 'Hello, World!';
    const dataUrl = qrCode.generate(text);
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl.startsWith('data:image/png;base64')).toBe(true);
  })

  test('should generate QR code with custom colors', () => {
    const text = 'Hello, World!';
    const options = {
      bgColor: '#EEEEEE',
      fgColor: '#FF0000'
    };
    
    const dataUrl = qrCode.generate(text, options);
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl.startsWith('data:image/png;base64')).toBe(true);
  })

  test('should generate QR code with custom size', () => {
    const text = 'Hello, World!';
    const options = {
      size: 300
    };
    
    const dataUrl = qrCode.generate(text, options);
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl.startsWith('data:image/png;base64')).toBe(true);
  })

  test('should generate QR code with custom margin', () => {
    const text = 'Hello, World!';
    const options = {
      margin: 10
    };
    
    const dataUrl = qrCode.generate(text, options);
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl.startsWith('data:image/png;base64')).toBe(true);
  })

  test('should generate QR code with different error correction levels', () => {
    const text = 'Hello, World!';
    const errorCorrectionLevels = ['L', 'M', 'Q', 'H'];
    
    errorCorrectionLevels.forEach(level => {
      const options = {
        errorCorrectionLevel: level
      };
      const dataUrl = qrCode.generate(text, options);
      expect(typeof dataUrl).toBe('string');
      expect(dataUrl.startsWith('data:image/png;base64')).toBe(true);
    });
  })

  test('should render QR code to element by id', () => {
    const text = 'Hello, World!';
    const options = {
      size: 200
    };
    
    expect(() => {
      qrCode.render('test-element', text, options);
    }).not.toThrow();
    
    expect(global.document.getElementById).toHaveBeenCalledWith('test-element');
  })

  test('should render QR code to element object', () => {
    const text = 'Hello, World!';
    const options = {
      size: 200
    };
    
    const element = {
      innerHTML: '',
      appendChild: jest.fn()
    };
    
    expect(() => {
      qrCode.render(element, text, options);
    }).not.toThrow();
    
    expect(element.appendChild).toHaveBeenCalled();
  })

  test('should throw error when element not found', () => {
    const text = 'Hello, World!';
    
    expect(() => {
      qrCode.render('non-existent-element', text);
    }).toThrow("Element with id 'non-existent-element' not found");
  })

  test('should calculate version based on text length', () => {
    // 测试calculateVersion方法（虽然是私有方法，但我们可以通过调用generate间接测试）
    const shortText = 'Short';
    const mediumText = 'Medium text '.repeat(2); // ~20 characters
    const longText = 'Long text '.repeat(10); // ~100 characters
    
    // 调用generate方法
    const shortDataUrl = qrCode.generate(shortText);
    const mediumDataUrl = qrCode.generate(mediumText);
    const longDataUrl = qrCode.generate(longText);
    
    // 验证都能成功生成
    expect(typeof shortDataUrl).toBe('string');
    expect(typeof mediumDataUrl).toBe('string');
    expect(typeof longDataUrl).toBe('string');
  })

  test('should handle empty text', () => {
    const text = '';
    const dataUrl = qrCode.generate(text);
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl.startsWith('data:image/png;base64')).toBe(true);
  })

  test('should handle special characters', () => {
    const text = 'Hello, World! 你好，世界！';
    const dataUrl = qrCode.generate(text);
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl.startsWith('data:image/png;base64')).toBe(true);
  })

  test('should handle URLs', () => {
    const text = 'https://www.example.com';
    const dataUrl = qrCode.generate(text);
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl.startsWith('data:image/png;base64')).toBe(true);
  })
})
