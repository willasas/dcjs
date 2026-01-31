/**
 * DCVirtualCard 组件测试
 */

// 模拟DOM环境
if (typeof window === 'undefined') {
  global.window = {};
  global.document = {
    documentElement: {
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    },
    body: {
      appendChild: jest.fn(),
      removeChild: jest.fn()
    },
    head: {
      appendChild: jest.fn()
    },
    createElement: jest.fn(),
    getElementById: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn()
  };
  global.navigator = {
    clipboard: {
      writeText: jest.fn()
    }
  };
  global.HTMLElement = function() {};
  global.alert = jest.fn();
  global.console = {
    error: jest.fn()
  };
  global.setTimeout = jest.fn((fn) => fn());
}

// 导入组件
const DCVirtualCard = require('../../../src/components/dcvirtualcard/dcvirtualcard');

// 模拟document.createElement
const createElementMock = (tag) => {
  const element = {
    className: '',
    textContent: '',
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn(),
      contains: jest.fn()
    },
    appendChild: jest.fn(),
    remove: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn()
  };
  
  // 模拟querySelector返回值
  if (tag === 'div') {
    element.querySelector.mockImplementation((selector) => {
      if (selector === '.card-number') {
        return {
          className: 'card-number',
          addEventListener: jest.fn(),
          removeEventListener: jest.fn()
        };
      }
      return null;
    });
  }
  
  return element;
};

document.createElement.mockImplementation(createElementMock);
document.getElementById.mockReturnValue(null);
document.querySelector.mockReturnValue(null);

// 模拟navigator.clipboard.writeText
navigator.clipboard.writeText.mockResolvedValue();

describe('DCVirtualCard', () => {
  let cardInstance;
  let mockOptions;
  let mockTargetElement;

  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks();
    
    // 模拟目标元素
    mockTargetElement = {
      appendChild: jest.fn()
    };
    
    // 模拟选项
    mockOptions = {
      virtualName: 'Test Virtual',
      virtualDesc: 'Test Card',
      logoUrl: 'https://example.com/logo.svg',
      cardNumber: '1234567890123456',
      cardId: '00123',
      cardName: 'John Doe',
      silkLogoUrl: 'https://example.com/visa.svg',
      theme: 'two',
      targetElement: mockTargetElement
    };
    
    // 创建卡片实例
    cardInstance = new DCVirtualCard(mockOptions);
  });

  test('should initialize with provided options', () => {
    expect(cardInstance).toBeDefined();
    expect(cardInstance.options).toEqual({
      ...mockOptions,
      cardNumber: '1234 5678 9012 3456' // 格式化后的卡号
    });
  });

  test('should initialize with default options when not provided', () => {
    const defaultCard = new DCVirtualCard();
    expect(defaultCard.options.virtualName).toBe('Virtual');
    expect(defaultCard.options.virtualDesc).toBe('Virtual Card');
    expect(defaultCard.options.theme).toBe('one');
    expect(defaultCard.options.targetElement).toBe(document.body);
  });

  test('should format card number correctly', () => {
    const testNumber = '1234567890123456';
    const formattedNumber = cardInstance.formatCardNumber(testNumber);
    expect(formattedNumber).toBe('1234 5678 9012 3456');
  });

  test('should render card elements', () => {
    expect(mockTargetElement.appendChild).toHaveBeenCalledWith(cardInstance.elements.card);
  });

  test('should inject styles only once', () => {
    // 第一次初始化
    const card1 = new DCVirtualCard(mockOptions);
    expect(document.createElement).toHaveBeenCalledWith('style');
    expect(document.head.appendChild).toHaveBeenCalled();
    
    // 重置mock
    jest.clearAllMocks();
    document.getElementById.mockReturnValue({}); // 模拟样式已存在
    
    // 第二次初始化
    const card2 = new DCVirtualCard(mockOptions);
    expect(document.createElement).not.toHaveBeenCalledWith('style');
    expect(document.head.appendChild).not.toHaveBeenCalled();
  });

  test('should bind events', () => {
    expect(cardInstance.elements.cardNumber.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    expect(cardInstance.elements.card.addEventListener).toHaveBeenCalledWith('dblclick', expect.any(Function));
  });

  test('should toggle card flipped state', () => {
    expect(cardInstance.state.isFlipped).toBe(false);
    
    cardInstance.toggleCard();
    expect(cardInstance.state.isFlipped).toBe(true);
    expect(cardInstance.elements.card.classList.toggle).toHaveBeenCalledWith('flipped', true);
    
    cardInstance.toggleCard();
    expect(cardInstance.state.isFlipped).toBe(false);
    expect(cardInstance.elements.card.classList.toggle).toHaveBeenCalledWith('flipped', false);
  });

  test('should copy card number using clipboard API', async () => {
    // 模拟clipboard API成功
    navigator.clipboard.writeText.mockResolvedValue();
    
    // 调用copyCardNumber
    await cardInstance.copyCardNumber();
    
    // 检查是否调用了clipboard.writeText
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('1234567890123456');
    
    // 检查是否显示了反馈
    expect(cardInstance.elements.card.appendChild).toHaveBeenCalled();
  });

  test('should handle clipboard API error', async () => {
    // 模拟clipboard API失败
    navigator.clipboard.writeText.mockRejectedValue(new Error('Clipboard error'));
    
    // 调用copyCardNumber
    await cardInstance.copyCardNumber();
    
    // 检查是否调用了alert
    expect(global.alert).toHaveBeenCalledWith('Copy failed. Please manually select the card number.');
    
    // 检查是否输出了错误
    expect(global.console.error).toHaveBeenCalledWith('Copy failed:', expect.any(Error));
  });

  test('should use legacy copy method when clipboard API is not available', () => {
    // 保存原始clipboard
    const originalClipboard = navigator.clipboard;
    
    // 移除clipboard API
    delete navigator.clipboard;
    
    // 模拟document.execCommand
    document.execCommand = jest.fn(() => true);
    
    // 调用copyCardNumber
    cardInstance.copyCardNumber();
    
    // 检查是否调用了document.execCommand
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    
    // 恢复clipboard API
    navigator.clipboard = originalClipboard;
  });

  test('should handle legacy copy error', () => {
    // 保存原始clipboard
    const originalClipboard = navigator.clipboard;
    
    // 移除clipboard API
    delete navigator.clipboard;
    
    // 模拟document.execCommand失败
    document.execCommand = jest.fn(() => false);
    
    // 调用copyCardNumber
    cardInstance.copyCardNumber();
    
    // 检查是否调用了alert
    expect(global.alert).toHaveBeenCalledWith('Copy failed. Please manually select the card number.');
    
    // 恢复clipboard API
    navigator.clipboard = originalClipboard;
  });

  test('should destroy component', () => {
    // 调用destroy
    cardInstance.destroy();
    
    // 检查是否移除了事件监听器
    expect(cardInstance.elements.cardNumber.removeEventListener).toHaveBeenCalled();
    
    // 检查是否移除了卡片元素
    expect(cardInstance.elements.card.remove).toHaveBeenCalled();
  });

  test('should handle empty card number', () => {
    const cardWithEmptyNumber = new DCVirtualCard({
      ...mockOptions,
      cardNumber: ''
    });
    
    expect(cardWithEmptyNumber.options.cardNumber).toBe('');
  });

  test('should handle undefined card number', () => {
    const cardWithUndefinedNumber = new DCVirtualCard({
      ...mockOptions,
      cardNumber: undefined
    });
    
    expect(cardWithUndefinedNumber.options.cardNumber).toBeUndefined();
  });
});
