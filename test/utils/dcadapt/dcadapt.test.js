const DcAdapt = require('../../../src/utils/dcadapt');

// Mock浏览器API
global.window = {
  innerWidth: 1920,
  innerHeight: 1080,
  screen: {
    height: 1080,
    width: 1920
  },
  devicePixelRatio: 1,
  navigator: {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    platform: 'Win32'
  },
  matchMedia: jest.fn((query) => ({
    matches: query === '(orientation: portrait)',
    addListener: jest.fn()
  })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
};

global.document = {
  documentElement: {
    style: {
      fontSize: '',
      setProperty: jest.fn(),
      removeProperty: jest.fn(),
      getPropertyValue: jest.fn(() => '')
    }
  },
  body: {
    style: {
      width: '',
      height: '',
      overflow: ''
    }
  },
  addEventListener: jest.fn(),
  getElementById: jest.fn(() => null)
};

global.getComputedStyle = jest.fn(() => ({
  getPropertyValue: jest.fn(() => '')
}));

global.setTimeout = jest.fn((fn) => fn());

describe('DcAdapt', () => {
  let adaptInstance;

  beforeEach(() => {
    // 重置mock
    jest.clearAllMocks();

    // 创建实例
    adaptInstance = new DcAdapt();
  });

  afterEach(() => {
    // 销毁实例
    if (adaptInstance) {
      adaptInstance.destroy();
    }
  });

  describe('构造函数', () => {
    test('应该使用默认配置初始化', () => {
      expect(adaptInstance.config.unit).toBe('px');
      expect(adaptInstance.config.mode).toBe('fullscreen');
      expect(adaptInstance.config.device.isDesktop).toBe(true);
    });

    test('应该使用自定义配置初始化', () => {
      const customAdapt = new DcAdapt({
        unit: 'rem',
        mode: 'longpage'
      });
      expect(customAdapt.config.unit).toBe('rem');
      expect(customAdapt.config.mode).toBe('longpage');
    });
  });

  describe('设备检测', () => {
    test('应该正确检测桌面设备', () => {
      expect(adaptInstance.config.device.isDesktop).toBe(true);
      expect(adaptInstance.config.device.isMobile).toBe(false);
      expect(adaptInstance.config.device.isTablet).toBe(false);
    });

    test('应该正确检测移动设备', () => {
      const originalUserAgent = global.window.navigator.userAgent;
      global.window.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';

      const mobileAdapt = new DcAdapt();
      expect(mobileAdapt.config.device.isMobile).toBe(true);
      expect(mobileAdapt.config.device.isDesktop).toBe(false);

      global.window.navigator.userAgent = originalUserAgent;
    });
  });

  describe('屏幕方向检测', () => {
    test('应该正确检测竖屏方向', () => {
      expect(adaptInstance.state.orientation).toBe('portrait');
    });

    test('应该正确检测横屏方向', () => {
      global.window.matchMedia.mockImplementation((query) => ({
        matches: query !== '(orientation: portrait)',
        addListener: jest.fn()
      }));

      const landscapeAdapt = new DcAdapt();
      expect(landscapeAdapt.getScreenOrientation()).toBe('landscape');
    });
  });

  describe('视口高度计算', () => {
    test('应该返回正确的视口高度', () => {
      const viewportHeight = adaptInstance.getViewportHeight();
      expect(viewportHeight).toBeGreaterThan(0);
      expect(viewportHeight).toBeLessThanOrEqual(global.window.innerHeight);
    });
  });

  describe('适配方法', () => {
    test('应该执行适配操作', () => {
      const spy = jest.spyOn(adaptInstance, 'adapt');
      adaptInstance.adapt();
      expect(spy).toHaveBeenCalled();
    });

    test('应该处理全屏适配', () => {
      adaptInstance.state.currentMode = 'fullscreen';
      adaptInstance.adapt();
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--client-height', expect.any(String));
    });

    test('应该处理长页面适配', () => {
      adaptInstance.state.currentMode = 'longpage';
      adaptInstance.adapt();
      expect(document.body.style.width).toBe('');
      expect(document.body.style.height).toBe('');
    });
  });

  describe('单位转换', () => {
    test('应该在不同单位间转换值', () => {
      const designConfig = {
        width: 1920,
        height: 1080
      };

      const pxToRem = adaptInstance.convertUnits(100, 'px', 'rem', designConfig);
      expect(typeof pxToRem).toBe('string');

      const remToVw = adaptInstance.convertUnits(1, 'rem', 'vw', designConfig);
      expect(typeof remToVw).toBe('string');

      const vwToPx = adaptInstance.convertUnits(10, 'vw', 'px', designConfig);
      expect(typeof vwToPx).toBe('string');
    });

    test('应该提供便捷的单位转换方法', () => {
      expect(typeof adaptInstance.convertPxToRem(100)).toBe('string');
      expect(typeof adaptInstance.convertPxToVw(100)).toBe('string');
      expect(typeof adaptInstance.convertRemToPx(1)).toBe('string');
      expect(typeof adaptInstance.convertRemToVw(1)).toBe('string');
      expect(typeof adaptInstance.convertVwToPx(10)).toBe('string');
      expect(typeof adaptInstance.convertVwToRem(10)).toBe('string');
    });
  });

  describe('单位设置', () => {
    test('应该切换当前使用的单位', () => {
      const oldUnit = adaptInstance.state.currentUnit;
      adaptInstance.setUnit('rem');
      expect(adaptInstance.state.currentUnit).toBe('rem');
      expect(oldUnit).not.toBe('rem');
    });

    test('应该在相同单位时不执行操作', () => {
      const currentUnit = adaptInstance.state.currentUnit;
      const spy = jest.spyOn(adaptInstance, 'adapt');
      adaptInstance.setUnit(currentUnit);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('模式设置', () => {
    test('应该切换适配模式', () => {
      adaptInstance.setMode('longpage');
      expect(adaptInstance.state.currentMode).toBe('longpage');

      adaptInstance.setMode('fullscreen');
      expect(adaptInstance.state.currentMode).toBe('fullscreen');
    });

    test('应该忽略无效的模式', () => {
      const currentMode = adaptInstance.state.currentMode;
      adaptInstance.setMode('invalid');
      expect(adaptInstance.state.currentMode).toBe(currentMode);
    });
  });

  describe('设计尺寸设置', () => {
    test('应该更新设计尺寸配置', () => {
      const newSize = {
        width: 1366,
        height: 768
      };
      adaptInstance.setDesignSize('pc', newSize);
      expect(adaptInstance.config.designSize.pc.width).toBe(1366);
      expect(adaptInstance.config.designSize.pc.height).toBe(768);
    });

    test('应该忽略无效的设计尺寸类型', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation();
      adaptInstance.setDesignSize('invalid', { width: 100, height: 100 });
      expect(spy).toHaveBeenCalledWith('Invalid design size type: invalid');
      spy.mockRestore();
    });
  });

  describe('防抖函数', () => {
    test('应该返回一个防抖函数', () => {
      const fn = jest.fn();
      const debouncedFn = adaptInstance.debounce(fn, 100);
      expect(typeof debouncedFn).toBe('function');
    });
  });

  describe('销毁方法', () => {
    test('应该清理实例状态和事件监听', () => {
      adaptInstance.destroy();
      expect(adaptInstance.state.isInitialized).toBe(false);
      expect(adaptInstance.state.currentUnit).toBe('px');
      expect(adaptInstance.state.currentMode).toBe('fullscreen');
    });
  });

  describe('目标设计尺寸获取', () => {
    test('应该返回默认设计尺寸当配置不存在时', () => {
      const size = adaptInstance.getTargetDesignSize(null);
      expect(size.width).toBe(global.window.innerWidth);
      expect(size.height).toBe(global.window.innerHeight);
    });

    test('应该返回最佳设计尺寸', () => {
      const designConfig = {
        width: 1920,
        height: 1080,
        fullscreenSizes: [
          { width: 1920, height: 1080 },
          { width: 1366, height: 768 }
        ]
      };
      const size = adaptInstance.getTargetDesignSize(designConfig);
      expect(size.width).toBe(1920);
      expect(size.height).toBe(1080);
    });
  });

  describe('浏览器导航栏高度', () => {
    test('应该返回导航栏高度', () => {
      const navHeight = adaptInstance.getBrowserNavHeight();
      expect(navHeight).toBeGreaterThanOrEqual(0);
    });
  });

  describe('响应式单位适配', () => {
    test('应该使用REM单位适配', () => {
      const remAdapt = new DcAdapt({ unit: 'rem' });
      expect(remAdapt.state.currentUnit).toBe('rem');
    });

    test('应该使用VW单位适配', () => {
      const vwAdapt = new DcAdapt({ unit: 'vw' });
      expect(vwAdapt.state.currentUnit).toBe('vw');
    });

    test('应该使用PX单位适配', () => {
      const pxAdapt = new DcAdapt({ unit: 'px' });
      expect(pxAdapt.state.currentUnit).toBe('px');
    });
  });
});