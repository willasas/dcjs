/**
 * DCVirtualScroller 组件测试
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
    createElement: jest.fn(),
    createDocumentFragment: jest.fn()
  };
  global.performance = {
    now: jest.fn(() => Date.now())
  };
  global.requestAnimationFrame = jest.fn((fn) => fn());
  global.addEventListener = jest.fn();
  global.removeEventListener = jest.fn();
}

// 导入组件
const DCVirtualScroller = require('../../../src/components/dcvirtualscroller/dcvirtualscroller');

// 模拟document.createElement
const createElementMock = (tag) => {
  const element = {
    className: '',
    textContent: '',
    style: {},
    clientHeight: 400, // 模拟容器高度
    scrollTop: 0,
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    innerHTML: ''
  };
  
  return element;
};

document.createElement.mockImplementation(createElementMock);

// 模拟document.createDocumentFragment
const createDocumentFragmentMock = () => {
  return {
    appendChild: jest.fn(),
    childNodes: []
  };
};

document.createDocumentFragment.mockImplementation(createDocumentFragmentMock);

// 模拟window对象
window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();

describe('DCVirtualScroller', () => {
  let container;
  let scroller;
  let totalItems;
  let itemHeight;

  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks();
    
    // 模拟容器
    container = {
      clientHeight: 400,
      scrollTop: 0,
      appendChild: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };
    
    totalItems = 1000;
    itemHeight = 50;
    
    // 创建滚动器实例
    scroller = new DCVirtualScroller(container, totalItems, itemHeight);
  });

  test('should initialize correctly', () => {
    expect(scroller).toBeDefined();
    expect(scroller.container).toBe(container);
    expect(scroller.totalItems).toBe(totalItems);
    expect(scroller.itemHeight).toBe(itemHeight);
    expect(scroller.visibleCount).toBe(8); // 400 / 50 = 8
    expect(scroller.bufferSize).toBe(3);
    expect(scroller.startIndex).toBe(0);
  });

  test('should create scroll content and viewport elements', () => {
    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(container.appendChild).toHaveBeenCalled();
  });

  test('should set correct scroll content height', () => {
    const scrollContent = scroller.scrollContent;
    expect(scrollContent.style.height).toBe(`${totalItems * itemHeight}px`);
  });

  test('should render items on initialization', () => {
    expect(scroller.renderCount).toBeGreaterThan(0);
  });

  test('should use default render function when no custom render function is provided', () => {
    const defaultRenderItemSpy = jest.spyOn(scroller, 'defaultRenderItem');
    scroller.render();
    expect(defaultRenderItemSpy).toHaveBeenCalled();
    defaultRenderItemSpy.mockRestore();
  });

  test('should use custom render function when provided', () => {
    const customRenderItem = jest.fn(() => {
      const item = document.createElement('div');
      item.style.position = 'absolute';
      return item;
    });
    
    const customScroller = new DCVirtualScroller(container, totalItems, itemHeight, customRenderItem);
    customScroller.render();
    expect(customRenderItem).toHaveBeenCalled();
  });

  test('should calculate visible count correctly', () => {
    expect(scroller.visibleCount).toBe(8); // 400 / 50 = 8
    
    // 测试不同容器高度
    container.clientHeight = 500;
    const scroller2 = new DCVirtualScroller(container, totalItems, itemHeight);
    expect(scroller2.visibleCount).toBe(10); // 500 / 50 = 10
  });

  test('should handle scroll events', () => {
    // 模拟滚动
    container.scrollTop = 200; // 滚动到第4个项目
    scroller.handleScroll();
    
    expect(scroller.startIndex).toBe(4); // 200 / 50 = 4
  });

  test('should not re-render if start index does not change', () => {
    const renderSpy = jest.spyOn(scroller, 'render');
    
    // 第一次滚动
    container.scrollTop = 200;
    scroller.handleScroll();
    expect(renderSpy).toHaveBeenCalled();
    
    // 重置spy
    renderSpy.mockClear();
    
    // 再次滚动到相同位置
    container.scrollTop = 220;
    scroller.handleScroll();
    expect(renderSpy).not.toHaveBeenCalled(); // 索引未变化，不应重渲染
    
    renderSpy.mockRestore();
  });

  test('should update total items', () => {
    const newTotalItems = 2000;
    scroller.updateTotalItems(newTotalItems);
    
    expect(scroller.totalItems).toBe(newTotalItems);
    expect(scroller.scrollContent.style.height).toBe(`${newTotalItems * itemHeight}px`);
  });

  test('should update item height', () => {
    const newItemHeight = 60;
    scroller.updateItemHeight(newItemHeight);
    
    expect(scroller.itemHeight).toBe(newItemHeight);
    expect(scroller.visibleCount).toBe(7); // 400 / 60 = 6.666, ceil to 7
    expect(scroller.scrollContent.style.height).toBe(`${totalItems * newItemHeight}px`);
  });

  test('should refresh rendering', () => {
    const renderSpy = jest.spyOn(scroller, 'render');
    scroller.refresh();
    expect(renderSpy).toHaveBeenCalled();
    renderSpy.mockRestore();
  });

  test('should scroll to specified index', () => {
    const index = 50;
    scroller.scrollToIndex(index);
    
    expect(container.scrollTop).toBe(index * itemHeight);
  });

  test('should not scroll to invalid index', () => {
    const originalScrollTop = container.scrollTop;
    
    // 负数索引
    scroller.scrollToIndex(-10);
    expect(container.scrollTop).toBe(originalScrollTop);
    
    // 超出范围索引
    scroller.scrollToIndex(2000);
    expect(container.scrollTop).toBe(originalScrollTop);
  });

  test('should update data', () => {
    const newTotalItems = 1500;
    const newItemHeight = 40;
    
    scroller.updateData(newTotalItems, newItemHeight);
    
    expect(scroller.totalItems).toBe(newTotalItems);
    expect(scroller.itemHeight).toBe(newItemHeight);
    expect(scroller.visibleCount).toBe(10); // 400 / 40 = 10
    expect(scroller.scrollContent.style.height).toBe(`${newTotalItems * newItemHeight}px`);
  });

  test('should handle window resize', () => {
    const oldVisibleCount = scroller.visibleCount;
    
    // 模拟容器高度变化
    container.clientHeight = 500;
    scroller.handleResize();
    
    expect(scroller.visibleCount).toBe(10); // 500 / 50 = 10
    expect(scroller.visibleCount).not.toBe(oldVisibleCount);
  });

  test('should get scroll state', () => {
    const scrollState = scroller.getScrollState();
    
    expect(scrollState).toEqual({
      scrollTop: container.scrollTop,
      startIndex: scroller.startIndex,
      visibleCount: scroller.visibleCount
    });
  });

  test('should get performance stats', () => {
    const performanceStats = scroller.getPerformanceStats();
    
    expect(performanceStats).toEqual({
      renderCount: scroller.renderCount,
      lastRenderTime: scroller.lastRenderTime,
      averageRenderTime: scroller.renderCount > 0 ? scroller.lastRenderTime / scroller.renderCount : 0,
      totalItems: scroller.totalItems,
      visibleItems: scroller.visibleCount,
      bufferSize: scroller.bufferSize
    });
  });

  test('should reset performance stats', () => {
    scroller.renderCount = 10;
    scroller.lastRenderTime = 100;
    
    scroller.resetPerformanceStats();
    
    expect(scroller.renderCount).toBe(0);
    expect(scroller.lastRenderTime).toBe(0);
  });

  test('should destroy scroller', () => {
    scroller.destroy();
    
    expect(container.removeEventListener).toHaveBeenCalled();
    expect(window.removeEventListener).toHaveBeenCalled();
    expect(scroller.viewport.innerHTML).toBe('');
    expect(scroller.scrollContent.innerHTML).toBe('');
  });

  test('should use throttled scroll handler', () => {
    expect(scroller.boundThrottledHandleScroll).toBeDefined();
  });

  test('should handle throttled scroll', () => {
    const handleScrollSpy = jest.spyOn(scroller, 'handleScroll');
    
    scroller.throttledHandleScroll();
    expect(handleScrollSpy).toHaveBeenCalled();
    
    handleScrollSpy.mockRestore();
  });

  test('should batch render items with DocumentFragment', () => {
    expect(document.createDocumentFragment).toHaveBeenCalled();
  });

  test('should calculate render range correctly', () => {
    // 测试边界情况
    scroller.startIndex = 0;
    scroller.render();
    
    scroller.startIndex = totalItems - scroller.visibleCount;
    scroller.render();
    
    expect(scroller.renderCount).toBeGreaterThan(1);
  });
});
