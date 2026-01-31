const DCInfiniteScroller = require('../../../src/utils/dcinfinitescroller');

// Mock浏览器API
global.IntersectionObserver = jest.fn(function(callback) {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: jest.fn()
  };
});

global.requestAnimationFrame = jest.fn((fn) => {
  fn();
  return 1;
});

global.cancelAnimationFrame = jest.fn();

global.window = {
  innerHeight: 600
};

// Mock DOM元素
function createMockElement() {
  const element = {
    scrollTop: 0,
    scrollHeight: 1000,
    offsetHeight: 600,
    children: [],
    appendChild: jest.fn((child) => {
      element.children.push(child);
    }),
    removeChild: jest.fn((child) => {
      const index = element.children.indexOf(child);
      if (index > -1) {
        element.children.splice(index, 1);
      }
    }),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    getBoundingClientRect: jest.fn(() => ({
      top: 0,
      bottom: 200
    }))
  };
  return element;
}

describe('DCInfiniteScroller', () => {
  let container;
  let loadCallback;
  let scroller;

  beforeEach(() => {
    // 重置mock
    jest.clearAllMocks();
    
    // 创建mock容器
    container = createMockElement();
    
    // 创建mock回调
    loadCallback = jest.fn().mockResolvedValue();
    
    // 创建实例
    scroller = new DCInfiniteScroller(container, loadCallback);
  });

  afterEach(() => {
    // 销毁实例
    if (scroller) {
      scroller.destroy();
    }
  });

  describe('构造函数', () => {
    test('应该正确初始化实例', () => {
      expect(scroller.container).toBe(container);
      expect(scroller.loadCallback).toBe(loadCallback);
      expect(scroller.isLoading).toBe(false);
      expect(scroller.options.threshold).toBe(200);
    });

    test('应该验证container参数', () => {
      expect(() => {
        new DCInfiniteScroller('not an element', loadCallback);
      }).toThrow('container必须是有效的DOM元素');
    });

    test('应该验证loadCallback参数', () => {
      expect(() => {
        new DCInfiniteScroller(container, 'not a function');
      }).toThrow('loadCallback必须是函数');
    });

    test('应该使用自定义配置', () => {
      const customOptions = {
        threshold: 300,
        batchSize: 10,
        enableScrollRecycling: false
      };
      const customScroller = new DCInfiniteScroller(container, loadCallback, customOptions);
      expect(customScroller.options.threshold).toBe(300);
      expect(customScroller.options.batchSize).toBe(10);
      expect(customScroller.options.enableScrollRecycling).toBe(false);
    });
  });

  describe('初始化功能', () => {
    test('应该创建哨兵元素', () => {
      expect(container.appendChild).toHaveBeenCalled();
      expect(scroller.sentinel).toBeDefined();
      expect(scroller.sentinel.id).toBe('sentinel');
    });

    test('应该设置交叉观察器', () => {
      expect(IntersectionObserver).toHaveBeenCalled();
    });

    test('应该设置滚动监听', () => {
      expect(container.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('滚动加载功能', () => {
    test('应该在滚动到底部时触发加载', async () => {
      // 模拟交叉观察器回调
      const observerCallback = IntersectionObserver.mock.calls[0][0];
      const mockEntry = {
        isIntersecting: true
      };
      
      // 调用回调
      observerCallback([mockEntry]);
      
      // 等待Promise完成
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 验证回调被调用
      expect(loadCallback).toHaveBeenCalledWith(20);
      expect(scroller.isLoading).toBe(false);
    });

    test('应该在加载中时不重复触发', async () => {
      // 模拟正在加载
      scroller.isLoading = true;
      
      // 模拟交叉观察器回调
      const observerCallback = IntersectionObserver.mock.calls[0][0];
      const mockEntry = {
        isIntersecting: true
      };
      
      // 调用回调
      observerCallback([mockEntry]);
      
      // 等待Promise完成
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 验证回调未被调用
      expect(loadCallback).not.toHaveBeenCalled();
    });

    test('应该处理加载失败', async () => {
      // 模拟加载失败
      loadCallback.mockRejectedValue(new Error('加载失败'));
      
      // 模拟控制台错误
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // 模拟交叉观察器回调
      const observerCallback = IntersectionObserver.mock.calls[0][0];
      const mockEntry = {
        isIntersecting: true
      };
      
      // 调用回调
      observerCallback([mockEntry]);
      
      // 等待Promise完成
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 验证错误被处理
      expect(consoleErrorSpy).toHaveBeenCalledWith('加载失败:', expect.any(Error));
      expect(scroller.isLoading).toBe(false);
      
      // 恢复console.error
      consoleErrorSpy.mockRestore();
    });
  });

  describe('DOM回收功能', () => {
    test('应该回收不可见的DOM元素', () => {
      // 创建mock项目元素
      const item1 = {
        classList: { contains: jest.fn(() => true) },
        getBoundingClientRect: jest.fn(() => ({ top: -1200, bottom: -1000 })),
        offsetHeight: 200,
        remove: jest.fn()
      };
      
      const item2 = {
        classList: { contains: jest.fn(() => true) },
        getBoundingClientRect: jest.fn(() => ({ top: 0, bottom: 200 })),
        offsetHeight: 200,
        remove: jest.fn()
      };
      
      // 模拟容器子元素
      container.children = [item1, item2, scroller.sentinel];
      
      // 调用回收方法
      scroller.recycleDOM();
      
      // 验证只有不可见元素被移除
      expect(item1.remove).toHaveBeenCalled();
      expect(item2.remove).not.toHaveBeenCalled();
    });

    test('应该限制最大元素数量', () => {
      // 创建多个mock项目元素
      const items = [];
      for (let i = 0; i < 1500; i++) {
        items.push({
          classList: { contains: jest.fn(() => true) },
          getBoundingClientRect: jest.fn(() => ({ top: 0, bottom: 200 })),
          offsetHeight: 200,
          remove: jest.fn()
        });
      }
      
      // 模拟容器子元素
      container.children = [...items, scroller.sentinel];
      
      // 设置最大元素数
      scroller.options.maxItems = 1000;
      
      // 调用回收方法
      scroller.recycleDOM();
      
      // 验证元素被移除
      expect(items[0].remove).toHaveBeenCalled();
    });
  });

  describe('加载指示器', () => {
    test('应该显示加载指示器', () => {
      scroller.showLoadingIndicator();
      expect(container.appendChild).toHaveBeenCalled();
      expect(scroller.loadingIndicator).toBeDefined();
    });

    test('应该隐藏加载指示器', () => {
      // 先显示
      scroller.showLoadingIndicator();
      
      // 模拟loadingIndicator的remove方法
      scroller.loadingIndicator = {
        remove: jest.fn()
      };
      
      // 隐藏
      scroller.hideLoadingIndicator();
      expect(scroller.loadingIndicator.remove).toHaveBeenCalled();
    });
  });

  describe('销毁功能', () => {
    test('应该清理事件监听', () => {
      scroller.destroy();
      expect(container.removeEventListener).toHaveBeenCalled();
    });

    test('应该清理观察器', () => {
      scroller.destroy();
      expect(scroller.observer.disconnect).toHaveBeenCalled();
    });

    test('应该清理DOM元素', () => {
      // 模拟sentinel的remove方法
      scroller.sentinel = {
        remove: jest.fn()
      };
      
      // 模拟loadingIndicator的remove方法
      scroller.loadingIndicator = {
        remove: jest.fn()
      };
      
      scroller.destroy();
      expect(scroller.sentinel.remove).toHaveBeenCalled();
      expect(scroller.loadingIndicator.remove).toHaveBeenCalled();
    });

    test('应该清理缓存', () => {
      scroller._cachedItems = [1, 2, 3];
      scroller.destroy();
      expect(scroller._cachedItems).toBeNull();
    });
  });

  describe('滚动回收机制', () => {
    test('应该设置滚动回收', () => {
      expect(container.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    test('应该在滚动时触发回收', () => {
      // 获取防抖回收函数
      const scrollCallback = container.addEventListener.mock.calls.find(call => call[0] === 'scroll')[1];
      
      // 模拟滚动
      scrollCallback();
      
      // 验证回收方法被调用
      expect(requestAnimationFrame).toHaveBeenCalled();
    });
  });
});