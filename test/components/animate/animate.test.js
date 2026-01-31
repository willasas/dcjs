/**
 * DCAnimator 组件测试
 */

const DCAnimator = require('../../../src/components/animate/dcanimator');

// 模拟 DOM 环境
if (typeof window === 'undefined') {
  global.window = {
    DC: {}
  };

  global.document = {
    querySelector: jest.fn(),
    querySelectorAll: jest.fn()
  };

  global.HTMLElement = class MockHTMLElement {
    constructor() {
      this.style = {};
      this.offsetHeight = 50;
    }
  };

  global.HTMLImageElement = class MockHTMLImageElement extends MockHTMLElement {
    constructor() {
      super();
      this.src = '';
    }
  };

  global.HTMLDivElement = class MockHTMLDivElement extends MockHTMLElement {
    constructor() {
      super();
    }
  };

  global.HTMLCanvasElement = class MockHTMLCanvasElement extends MockHTMLElement {
    constructor() {
      super();
      this.width = 100;
      this.height = 100;
      this.getContext = jest.fn(() => ({
        clearRect: jest.fn(),
        drawImage: jest.fn()
      }));
    }
  };

  global.requestAnimationFrame = jest.fn(callback => {
    setTimeout(callback, 0);
  });

  global.Image = global.HTMLImageElement;
}

describe('DCAnimator', () => {
  let animator;
  let mockElement;
  let mockFrames;

  beforeEach(() => {
    // 重置 mock
    jest.clearAllMocks();

    // 创建模拟元素
    mockElement = new global.HTMLImageElement();

    // 创建模拟帧数组
    mockFrames = [
      'frame1.png',
      'frame2.png',
      'frame3.png'
    ];
  });

  describe('构造函数', () => {
    test('应该创建序列帧动画实例', () => {
      animator = new DCAnimator('sequence', mockFrames, mockElement, 30);
      expect(animator.type).toBe('sequence');
      expect(animator.frames).toEqual(mockFrames);
      expect(animator.domElement).toBe(mockElement);
      expect(animator.fps).toBe(30);
    });

    test('应该创建滚动动画实例', () => {
      // 模拟容器和列表元素
      const mockContainer = new global.HTMLDivElement();
      const mockUl = new global.HTMLDivElement();
      const mockLi = new global.HTMLDivElement();

      global.document.querySelector.mockImplementation(selector => {
        if (selector === '.container') return mockContainer;
        if (selector === '.list') return mockUl;
        return null;
      });

      global.document.querySelectorAll.mockImplementation(selector => {
        if (selector === '.item') return [mockLi, mockLi, mockLi];
        return [];
      });

      animator = new DCAnimator('scroll', '.container', '.list', '.item', 1);
      expect(animator.type).toBe('scroll');
      expect(animator.speed).toBe(1);
    });

    test('应该抛出无效类型错误', () => {
      expect(() => {
        new DCAnimator('invalid');
      }).toThrow('Invalid animator type');
    });
  });

  describe('序列帧动画方法', () => {
    beforeEach(() => {
      animator = new DCAnimator('sequence', mockFrames, mockElement, 30);
    });

    test('should preload images', () => {
      animator.preloadImages();
      expect(animator.images).toBeDefined();
      expect(animator.loadCount).toBe(0);
    });

    test('should start animation', () => {
      animator.startAnimation();
      expect(animator.isAnimating).toBe(true);
    });

    test('should stop animation', () => {
      animator.startAnimation();
      expect(animator.isAnimating).toBe(true);

      animator.stopAnimation();
      expect(animator.isAnimating).toBe(false);
    });

    test('should set FPS', () => {
      animator.setFps(60);
      expect(animator.fps).toBe(60);
    });

    test('should check if images are loaded', () => {
      // 模拟所有图像已加载
      animator.loadCount = mockFrames.length;
      animator.loadErrors = [];
      expect(animator.areImagesLoaded()).toBe(true);

      // 模拟有错误
      animator.loadErrors = ['frame1.png'];
      expect(animator.areImagesLoaded()).toBe(false);
    });
  });

  describe('滚动动画方法', () => {
    beforeEach(() => {
      // 模拟容器和列表元素
      const mockContainer = new global.HTMLDivElement();
      const mockUl = new global.HTMLDivElement();
      const mockLi = new global.HTMLDivElement();

      global.document.querySelector.mockImplementation(selector => {
        if (selector === '.container') return mockContainer;
        if (selector === '.list') return mockUl;
        return null;
      });

      global.document.querySelectorAll.mockImplementation(selector => {
        if (selector === '.item') return [mockLi, mockLi, mockLi];
        return [];
      });

      animator = new DCAnimator('scroll', '.container', '.list', '.item', 1);
    });

    test('should start animation', () => {
      animator.startAnimation();
      expect(animator.isAnimating).toBe(true);
    });

    test('should stop animation', () => {
      animator.startAnimation();
      expect(animator.isAnimating).toBe(true);

      animator.stopAnimation();
      expect(animator.isAnimating).toBe(false);
    });
  });
});
