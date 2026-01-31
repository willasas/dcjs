/**
 * DCDesignBy 组件测试
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
      querySelector: jest.fn(),
      querySelectorAll: jest.fn()
    },
    head: {
      appendChild: jest.fn(),
      insertBefore: jest.fn()
    },
    createElement: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn()
  };
  global.HTMLElement = function() {};
  global.console = {
    error: jest.fn()
  };
}

// 导入组件
const DCDesignBy = require('../../../src/components/designby/designby');

// 模拟document.createElement
const createElementMock = (tag) => {
  const element = {
    className: '',
    textContent: '',
    innerHTML: '',
    appendChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn()
  };

  return element;
};

document.createElement.mockImplementation(createElementMock);

// 模拟document.querySelector
document.querySelector.mockImplementation((selector) => {
  if (selector === 'body') {
    return {
      appendChild: jest.fn(),
      querySelector: jest.fn((sel) => {
        if (sel === '.designby-list') {
          return {
            appendChild: jest.fn()
          };
        }
        return null;
      })
    };
  }
  if (selector === 'title') {
    return {};
  }
  return null;
});

describe('DCDesignBy', () => {
  let designBy;
  let mockData;
  let targetSelector;

  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks();

    // 模拟数据
    mockData = [
      {
        name: 'Designer 1',
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8L8 24L32 40L56 24L32 8Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      },
      {
        name: 'Designer 2',
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="24" stroke="currentColor" stroke-width="4"/></svg>'
      }
    ];

    targetSelector = 'body';

    // 创建组件实例
    designBy = new DCDesignBy(targetSelector, mockData);
  });

  test('should initialize correctly', () => {
    expect(designBy).toBeDefined();
    expect(designBy.targetElement).toBeDefined();
    expect(designBy.designByData).toEqual(mockData);
  });

  test('should render design items', () => {
    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(designBy.targetElement.appendChild).toHaveBeenCalled();
  });

  test('should create CSS styles', () => {
    expect(document.createElement).toHaveBeenCalledWith('style');
    expect(document.head.insertBefore).toHaveBeenCalled();
  });

  test('should handle empty data', () => {
    // 重置mock
    jest.clearAllMocks();

    // 创建空数据实例
    const emptyDesignBy = new DCDesignBy(targetSelector, []);

    expect(emptyDesignBy.designByData).toEqual([]);
    expect(document.createElement).toHaveBeenCalledWith('div');
  });

  test('should handle missing target element', () => {
    // 重置mock
    jest.clearAllMocks();

    // 模拟查询不到目标元素
    document.querySelector.mockImplementation(() => null);

    // 创建实例
    const missingTargetDesignBy = new DCDesignBy('#non-existent', mockData);

    expect(missingTargetDesignBy.targetElement).toBeNull();
  });

  test('should handle missing designby-list element', () => {
    // 重置mock
    jest.clearAllMocks();

    // 模拟目标元素但查询不到designby-list
    document.querySelector.mockImplementation((selector) => {
      if (selector === 'body') {
        return {
          appendChild: jest.fn(),
          querySelector: jest.fn(() => null)
        };
      }
      if (selector === 'title') {
        return {};
      }
      return null;
    });

    // 创建实例
    const missingListDesignBy = new DCDesignBy(targetSelector, mockData);

    // 检查是否输出错误
    expect(console.error).toHaveBeenCalledWith('DesignBy list element not found');
  });

  test('should use default parameters when not provided', () => {
    // 重置mock
    jest.clearAllMocks();

    // 创建默认参数实例
    const defaultDesignBy = new DCDesignBy();

    expect(defaultDesignBy.targetElement).toBeDefined();
    expect(defaultDesignBy.designByData).toEqual([]);
  });

  test('should render each design item correctly', () => {
    // 重置mock
    jest.clearAllMocks();

    // 模拟更详细的DOM操作
    const mockBody = {
      appendChild: jest.fn(),
      querySelector: jest.fn((sel) => {
        if (sel === '.designby-list') {
          return {
            appendChild: jest.fn()
          };
        }
        return null;
      })
    };

    document.querySelector.mockImplementation((selector) => {
      if (selector === 'body') {
        return mockBody;
      }
      if (selector === 'title') {
        return {};
      }
      return null;
    });

    // 创建实例
    const detailedDesignBy = new DCDesignBy('body', mockData);

    // 检查是否为每个数据项创建了元素
    expect(document.createElement).toHaveBeenCalledTimes(mockData.length * 3 + 2); // 每个数据项创建3个元素，加上列表容器和style
  });

  test('should set correct class names and content', () => {
    // 重置mock
    jest.clearAllMocks();

    // 模拟DOM元素
    const mockDesignByList = {
      appendChild: jest.fn((item) => {
        // 检查每个设计项的结构
        expect(item.className).toBe('designby-item');
        expect(item.appendChild).toHaveBeenCalledTimes(2);
      })
    };

    const mockBody = {
      appendChild: jest.fn(),
      querySelector: jest.fn(() => mockDesignByList)
    };

    document.querySelector.mockImplementation((selector) => {
      if (selector === 'body') {
        return mockBody;
      }
      if (selector === 'title') {
        return {};
      }
      return null;
    });

    // 创建实例
    const contentDesignBy = new DCDesignBy('body', mockData);

    expect(mockDesignByList.appendChild).toHaveBeenCalledTimes(mockData.length);
  });
});
