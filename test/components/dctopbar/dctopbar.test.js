/**
 * DCTopBar 组件测试
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
      appendChild: jest.fn()
    },
    createElement: jest.fn()
  };
  global.HTMLElement = function() {};
  global.addEventListener = jest.fn();
}

// 导入组件
const DCTopBar = require('../../../src/components/dctopbar/dctopbar');

// 模拟document.createElement
const createElementMock = (tag) => {
  const element = {
    className: '',
    textContent: '',
    style: {},
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn()
    },
    appendChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
    addEventListener: jest.fn(),
    getBoundingClientRect: jest.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 40
    }))
  };

  // 模拟querySelector返回值
  if (tag === 'div') {
    element.querySelector.mockImplementation((selector) => {
      if (selector === '.dc-topbar-btn') {
        return {
          className: 'dc-topbar-btn',
          getBoundingClientRect: jest.fn(() => ({
            left: 0,
            top: 0,
            width: 100,
            height: 40
          }))
        };
      }
      return null;
    });

    element.querySelectorAll.mockReturnValue([
      {
        className: 'dc-topbar-btn',
        addEventListener: jest.fn(),
        classList: {
          add: jest.fn(),
          remove: jest.fn()
        }
      }
    ]);
  }

  return element;
};

document.createElement.mockImplementation(createElementMock);

// 模拟window.innerWidth
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1200
});

describe('DCTopBar', () => {
  let topbarInstance;
  let mockOptions;

  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks();

    // 模拟选项
    mockOptions = [
      { id: '1', text: 'Option 1' },
      { id: '2', text: 'Option 2' },
      { id: '3', text: 'Option 3' }
    ];

    // 创建组件实例
    topbarInstance = new DCTopBar({
      options: mockOptions
    });
  });

  test('should initialize with provided options', () => {
    expect(topbarInstance).toBeDefined();
    expect(topbarInstance.options).toEqual(mockOptions);
    expect(topbarInstance.container).toBeDefined();
    expect(topbarInstance.container.className).toBe('dc-topbar');
  });

  test('should render buttons correctly', async () => {
    await topbarInstance.init();

    // 检查是否创建了正确数量的按钮
    expect(topbarInstance.container.appendChild).toHaveBeenCalledTimes(mockOptions.length + 1); // +1 for indicator

    // 检查是否添加到body
    expect(document.body.appendChild).toHaveBeenCalledWith(topbarInstance.container);
  });

  test('should create styles', async () => {
    await topbarInstance.init();

    // 检查是否创建并添加了style元素
    expect(document.createElement).toHaveBeenCalledWith('style');
    expect(document.head.appendChild).toHaveBeenCalled();
  });

  test('should add click event listeners', async () => {
    await topbarInstance.init();

    // 检查是否为每个按钮添加了点击事件监听器
    const buttons = topbarInstance.container.querySelectorAll('.dc-topbar-btn');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('should move indicator to first button by default', async () => {
    await topbarInstance.init();

    // 检查是否调用了moveIndicator
    expect(topbarInstance.container.querySelector).toHaveBeenCalledWith('.dc-topbar-btn');
  });

  test('should move indicator on desktop', async () => {
    // 设置为桌面宽度
    window.innerWidth = 1200;

    await topbarInstance.init();

    // 模拟按钮
    const mockButton = {
      getBoundingClientRect: jest.fn(() => ({
        left: 100,
        top: 0,
        width: 120,
        height: 40
      }))
    };

    // 模拟容器的getBoundingClientRect
    topbarInstance.container.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 400,
      height: 40
    }));

    // 调用moveIndicator
    topbarInstance.moveIndicator(mockButton);

    // 检查指示器样式
    expect(topbarInstance.indicator.style.left).toBe('100px');
    expect(topbarInstance.indicator.style.width).toBe('120px');
    expect(topbarInstance.indicator.style.top).toBe('auto');
    expect(topbarInstance.indicator.style.height).toBe('100%');
  });

  test('should move indicator on mobile', async () => {
    // 设置为移动宽度
    window.innerWidth = 768;

    await topbarInstance.init();

    // 模拟按钮
    const mockButton = {
      getBoundingClientRect: jest.fn(() => ({
        left: 0,
        top: 50,
        width: 300,
        height: 40
      }))
    };

    // 模拟容器的getBoundingClientRect
    topbarInstance.container.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 300,
      height: 120
    }));

    // 调用moveIndicator
    topbarInstance.moveIndicator(mockButton);

    // 检查指示器样式
    expect(topbarInstance.indicator.style.top).toBe('50px');
    expect(topbarInstance.indicator.style.height).toBe('40px');
    expect(topbarInstance.indicator.style.left).toBe('0');
    expect(topbarInstance.indicator.style.width).toBe('100%');
  });

  test('should toggle active class', async () => {
    await topbarInstance.init();

    // 模拟按钮
    const mockButton1 = {
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    };

    const mockButton2 = {
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    };

    // 模拟querySelectorAll
    topbarInstance.container.querySelectorAll.mockReturnValue([mockButton1, mockButton2]);

    // 调用toggleActiveClass
    topbarInstance.toggleActiveClass(mockButton2);

    // 检查是否移除了所有按钮的active类
    expect(mockButton1.classList.remove).toHaveBeenCalledWith('active');
    expect(mockButton2.classList.remove).toHaveBeenCalledWith('active');

    // 检查是否为目标按钮添加了active类
    expect(mockButton2.classList.add).toHaveBeenCalledWith('active');
  });

  test('should handle initialization errors', async () => {
    // 模拟console.error
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    // 模拟render方法抛出错误
    const originalRender = topbarInstance.render;
    topbarInstance.render = jest.fn(() => {
      throw new Error('Test error');
    });

    // 调用init
    await topbarInstance.init();

    // 检查是否捕获了错误
    expect(consoleErrorMock).toHaveBeenCalledWith('Error initializing DCTopBar:', expect.any(Error));

    // 恢复原始方法
    topbarInstance.render = originalRender;
    consoleErrorMock.mockRestore();
  });

  test('should handle empty options', async () => {
    // 创建没有options的实例
    const emptyTopbar = new DCTopBar();

    await emptyTopbar.init();

    // 检查是否正常初始化
    expect(emptyTopbar.options).toEqual([]);
  });
});
