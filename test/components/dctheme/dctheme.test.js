/**
 * DCTheme 组件测试
 */

// 模拟DOM环境
if (typeof window === 'undefined') {
  global.window = {};
  global.document = {
    documentElement: {
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
        toggle: jest.fn()
      },
      setAttribute: jest.fn(),
      getAttribute: jest.fn()
    },
    head: {
      insertBefore: jest.fn()
    },
    querySelector: jest.fn(),
    createElement: jest.fn()
  };
  global.HTMLElement = function() {};
}

// 导入组件
const DCTheme = require('../../../src/components/dctheme/dctheme');

// 模拟document.createElement
const createElementMock = (tag) => {
  const element = {
    innerHTML: '',
    firstChild: null,
    appendChild: jest.fn(),
    append: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
    addEventListener: jest.fn(),
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn(),
      contains: jest.fn()
    },
    setAttribute: jest.fn(),
    getAttribute: jest.fn()
  };
  
  // 模拟innerHTML设置后firstChild的行为
  Object.defineProperty(element, 'innerHTML', {
    set: function(value) {
      this._innerHTML = value;
      // 简单模拟firstChild
      this.firstChild = {
        innerHTML: '',
        appendChild: jest.fn(),
        append: jest.fn(),
        querySelector: jest.fn(),
        querySelectorAll: jest.fn(),
        addEventListener: jest.fn(),
        style: {},
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
          toggle: jest.fn(),
          contains: jest.fn()
        }
      };
    },
    get: function() {
      return this._innerHTML;
    }
  });
  
  return element;
};

document.createElement.mockImplementation(createElementMock);
document.querySelector.mockReturnValue({
  innerHTML: ''
});

describe('DCTheme', () => {
  let themeInstance;
  let container;

  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks();
    
    // 创建测试容器
    container = {
      appendChild: jest.fn()
    };
    
    // 创建主题实例
    themeInstance = new DCTheme({
      container: container,
      defaultTheme: 'light-theme'
    });
  });

  test('should initialize with default theme', () => {
    expect(themeInstance).toBeDefined();
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light-theme');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('light-theme');
  });

  test('should create DOM elements', () => {
    expect(container.appendChild).toHaveBeenCalled();
  });

  test('should change theme when setTheme is called', () => {
    // 模拟themeItem
    const themeItem = {
      getAttribute: jest.fn((attr) => {
        if (attr === 'data-theme-name') return 'dark-theme';
        return null;
      }),
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    };
    
    // 模拟querySelector
    themeInstance.themeInner.querySelector.mockReturnValue(themeItem);
    
    // 调用setTheme
    themeInstance.setTheme('dark-theme');
    
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark-theme');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark-theme');
  });

  test('should get current theme', () => {
    document.documentElement.getAttribute.mockReturnValue('light-theme');
    const currentTheme = themeInstance.getCurrentTheme();
    expect(currentTheme).toBe('light-theme');
  });

  test('should show theme component', () => {
    themeInstance.show();
    expect(themeInstance.themeElement.style.display).toBe('flex');
  });

  test('should hide theme component', () => {
    themeInstance.hide();
    expect(themeInstance.themeElement.style.display).toBe('none');
  });

  test('should toggle theme list visibility', () => {
    // 初始状态
    expect(themeInstance.isThemeContainerVisible).toBe(true);
    
    // 切换一次
    themeInstance.toggleThemeList();
    expect(themeInstance.isThemeContainerVisible).toBe(false);
    
    // 切换回来
    themeInstance.toggleThemeList();
    expect(themeInstance.isThemeContainerVisible).toBe(true);
  });

  test('should trigger onThemeChange callback when theme changes', () => {
    const mockCallback = jest.fn();
    
    // 创建新实例带回调
    const themeWithCallback = new DCTheme({
      container: container,
      defaultTheme: 'light-theme',
      onThemeChange: mockCallback
    });
    
    // 模拟themeItem
    const themeItem = {
      getAttribute: jest.fn((attr) => {
        if (attr === 'data-theme-name') return 'dark-theme';
        return null;
      }),
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    };
    
    // 模拟querySelector
    themeWithCallback.themeInner.querySelector.mockReturnValue(themeItem);
    
    // 调用setTheme
    themeWithCallback.setTheme('dark-theme');
    
    expect(mockCallback).toHaveBeenCalledWith('dark-theme');
  });

  test('should handle custom themes', () => {
    const customThemes = [
      { name: 'custom-light', value: 'custom-light' },
      { name: 'custom-dark', value: 'custom-dark' }
    ];
    
    const customThemeInstance = new DCTheme({
      container: container,
      themes: customThemes,
      defaultTheme: 'custom-light'
    });
    
    expect(customThemeInstance.config.themes).toEqual(customThemes);
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'custom-light');
  });

  test('should use body as container when no container is provided', () => {
    // 模拟body
    const mockBody = {
      appendChild: jest.fn()
    };
    document.body = mockBody;
    
    // 创建实例不指定container
    const themeWithoutContainer = new DCTheme({
      defaultTheme: 'light-theme'
    });
    
    expect(mockBody.appendChild).toHaveBeenCalled();
  });
});
