/**
 * dcBrowser 测试用例
 */
const dcBrowser = require('../../../src/utils/dcBrowser');

describe('dcBrowser', () => {
  // Mock DOM 环境
  beforeEach(() => {
    global.document = {
      createElement: jest.fn((tag) => ({
        tagName: tag.toUpperCase(),
        rel: '',
        href: '',
        src: '',
        type: '',
        getContext: jest.fn(() => ({
          toDataURL: jest.fn((format) => format === 'image/webp' ? 'data:image/webp;base64,...' : 'data:image/png;base64,...')
        }))
      })),
      getElementsByTagName: jest.fn(() => [{
        appendChild: jest.fn()
      }]),
      head: {
        appendChild: jest.fn()
      },
      fullscreenElement: null,
      mozFullScreenElement: null,
      webkitFullscreenElement: null,
      msFullscreenElement: null,
      documentElement: {
        style: {}
      },
      hidden: false,
      visibilityState: 'visible',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      exitFullscreen: jest.fn(() => Promise.resolve()),
      webkitExitFullscreen: jest.fn(() => Promise.resolve()),
      mozCancelFullScreen: jest.fn(() => Promise.resolve()),
      msExitFullscreen: jest.fn(() => Promise.resolve()),
      fullscreenEnabled: true,
      webkitFullscreenEnabled: true,
      mozFullScreenEnabled: true,
      msFullscreenEnabled: true
    };

    global.window = {
      screen: {
        width: 1920,
        height: 1080,
        availWidth: 1920,
        availHeight: 1040,
        colorDepth: 24,
        pixelDepth: 24,
        orientation: {
          type: 'landscape-primary'
        }
      },
      innerWidth: 1920,
      innerHeight: 1080,
      devicePixelRatio: 1,
      matchMedia: jest.fn(() => ({
        matches: true
      })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      onLine: true,
      location: {
        search: '?name=test&age=20'
      },
      performance: {
        timing: {
          navigationStart: 0,
          loadEventEnd: 1000,
          domComplete: 800,
          domLoading: 200,
          responseStart: 100,
          domainLookupEnd: 50,
          domainLookupStart: 20,
          connectEnd: 80,
          connectStart: 60,
          domContentLoadedEventEnd: 600
        },
        navigation: {
          type: 0,
          redirectCount: 0
        }
      }
    };

    global.navigator = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      platform: 'Win32',
      language: 'zh-CN',
      languages: ['zh-CN', 'zh', 'en'],
      cookieEnabled: true,
      doNotTrack: '1',
      maxTouchPoints: 0,
      hardwareConcurrency: 8,
      deviceMemory: 16,
      onLine: true,
      connection: {
        type: 'wifi',
        effectiveType: '4g',
        downlink: 10,
        downlinkMax: 100,
        rtt: 50,
        saveData: false
      },
      getBattery: jest.fn(() => Promise.resolve({
        charging: true,
        level: 0.8,
        chargingTime: 0,
        dischargingTime: Infinity
      })),
      geolocation: {
        getCurrentPosition: jest.fn((success) => {
          success({
            coords: {
              latitude: 39.9042,
              longitude: 116.4074,
              accuracy: 10,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null
            },
            timestamp: Date.now()
          });
        })
      }
    };

    global.WebGLRenderingContext = jest.fn();
    global.WebGL2RenderingContext = jest.fn();
    global.Worker = jest.fn();
    global.WebSocket = jest.fn();
    global.fetch = jest.fn();
    global.AudioContext = jest.fn();
    global.webkitAudioContext = jest.fn();
    global.RTCPeerConnection = jest.fn();
    global.URLSearchParams = jest.fn((query) => ({
      entries: jest.fn(() => [['name', 'test'], ['age', '20']])
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadCss', () => {
    test('加载CSS文件', () => {
      dcBrowser.loadCss('test.css');
      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(document.getElementsByTagName('head')[0].appendChild).toHaveBeenCalled();
    });

    test('无效的URL', () => {
      console.error = jest.fn();
      dcBrowser.loadCss(123);
      expect(console.error).toHaveBeenCalledWith('URL must be a string');
    });
  });

  describe('loadJs', () => {
    test('加载JavaScript文件', () => {
      dcBrowser.loadJs('test.js');
      expect(document.createElement).toHaveBeenCalledWith('script');
      expect(document.getElementsByTagName('head')[0].appendChild).toHaveBeenCalled();
    });

    test('无效的URL', () => {
      console.error = jest.fn();
      dcBrowser.loadJs(123);
      expect(console.error).toHaveBeenCalledWith('URL must be a string');
    });
  });

  describe('preloadResourcesSingle', () => {
    test('预加载CSS和JS资源', () => {
      dcBrowser.preloadResourcesSingle('test.css', 'test.js');
      expect(document.head.appendChild).toHaveBeenCalledTimes(2);
    });
  });

  describe('preloadResources', () => {
    test('预加载多个资源', () => {
      dcBrowser.preloadResources(['style1.css', 'style2.css'], ['script1.js', 'script2.js']);
      expect(document.head.appendChild).toHaveBeenCalledTimes(4);
    });
  });

  describe('cookie', () => {
    test('获取cookie', () => {
      global.document.cookie = 'name=test; age=20';
      const result = dcBrowser.cookie('name');
      expect(result).toBe('test');
    });

    test('设置cookie', () => {
      dcBrowser.cookie('name', 'test', 1);
      expect(document.cookie).toContain('name=test');
    });
  });

  describe('isFullscreen', () => {
    test('检查全屏模式', () => {
      const result = dcBrowser.isFullscreen();
      expect(result).toBe(false);

      // Mock 全屏状态
      global.document.fullscreenElement = {};
      const result2 = dcBrowser.isFullscreen();
      expect(result2).toBe(true);
    });
  });

  describe('createEventHub', () => {
    test('创建事件中心', () => {
      const hub = dcBrowser.createEventHub();
      expect(typeof hub.emit).toBe('function');
      expect(typeof hub.on).toBe('function');
      expect(typeof hub.off).toBe('function');

      // 测试事件触发
      const callback = jest.fn();
      hub.on('test', callback);
      hub.emit('test', 'data');
      expect(callback).toHaveBeenCalledWith('data');

      // 测试移除事件
      hub.off('test', callback);
      hub.emit('test', 'data2');
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBrowserInfo', () => {
    test('获取浏览器信息', () => {
      const info = dcBrowser.getBrowserInfo();
      expect(info).toHaveProperty('name');
      expect(info).toHaveProperty('version');
      expect(info).toHaveProperty('engine');
      expect(info).toHaveProperty('system');
      expect(info).toHaveProperty('device');
    });
  });

  describe('supports', () => {
    test('检查特性支持', () => {
      expect(dcBrowser.supports('canvas')).toBe(true);
      expect(dcBrowser.supports('webp')).toBe(true);
      expect(dcBrowser.supports('touch')).toBe(false);
    });
  });

  describe('isMobile', () => {
    test('检查是否是移动设备', () => {
      const result = dcBrowser.isMobile();
      expect(result).toBe(false);

      // Mock 移动设备UA
      global.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
      const result2 = dcBrowser.isMobile();
      expect(result2).toBe(true);
    });
  });

  describe('isTablet', () => {
    test('检查是否是平板设备', () => {
      const result = dcBrowser.isTablet();
      expect(result).toBe(false);

      // Mock 平板设备UA
      global.navigator.userAgent = 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
      const result2 = dcBrowser.isTablet();
      expect(result2).toBe(true);
    });
  });

  describe('getOrientation', () => {
    test('获取屏幕方向', () => {
      const result = dcBrowser.getOrientation();
      expect(result).toBe('landscape-primary');
    });
  });

  describe('getConnection', () => {
    test('获取网络连接信息', () => {
      const result = dcBrowser.getConnection();
      expect(result).toHaveProperty('online');
      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('effectiveType');
    });
  });

  describe('getBatteryInfo', () => {
    test('获取电池状态', async () => {
      const result = await dcBrowser.getBatteryInfo();
      expect(result).toHaveProperty('charging');
      expect(result).toHaveProperty('level');
    });
  });

  describe('getHardwareInfo', () => {
    test('获取硬件信息', () => {
      const result = dcBrowser.getHardwareInfo();
      expect(result).toHaveProperty('cores');
      expect(result).toHaveProperty('memory');
      expect(result).toHaveProperty('platform');
    });
  });

  describe('getScreenInfo', () => {
    test('获取屏幕信息', () => {
      const result = dcBrowser.getScreenInfo();
      expect(result).toHaveProperty('width');
      expect(result).toHaveProperty('height');
      expect(result).toHaveProperty('devicePixelRatio');
    });
  });

  describe('getGeolocation', () => {
    test('获取地理位置', async () => {
      const result = await dcBrowser.getGeolocation();
      expect(result).toHaveProperty('latitude');
      expect(result).toHaveProperty('longitude');
    });
  });

  describe('supportsCSSProperty', () => {
    test('检查CSS属性支持', () => {
      const result = dcBrowser.supportsCSSProperty('color');
      expect(result).toBe(false); // Mock 中没有 color 属性
    });
  });

  describe('supportsMediaQuery', () => {
    test('检查媒体查询支持', () => {
      const result = dcBrowser.supportsMediaQuery('(min-width: 768px)');
      expect(result).toBe(true);
    });
  });

  describe('getPerformance', () => {
    test('获取浏览器性能信息', () => {
      const result = dcBrowser.getPerformance();
      expect(result).toHaveProperty('loadTime');
      expect(result).toHaveProperty('domParseTime');
      expect(result).toHaveProperty('ttfb');
    });
  });

  describe('getVisibilityState', () => {
    test('获取页面可见性状态', () => {
      const result = dcBrowser.getVisibilityState();
      expect(result).toBe('visible');
    });
  });

  describe('onVisibilityChange', () => {
    test('监听页面可见性变化', () => {
      const callback = jest.fn();
      const unsubscribe = dcBrowser.onVisibilityChange(callback);
      expect(document.addEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));

      unsubscribe();
      expect(document.removeEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    });
  });

  describe('isOnline', () => {
    test('检查浏览器是否在线', () => {
      const result = dcBrowser.isOnline();
      expect(result).toBe(true);
    });
  });

  describe('onConnectionChange', () => {
    test('监听在线状态变化', () => {
      const onlineCallback = jest.fn();
      const offlineCallback = jest.fn();
      const unsubscribe = dcBrowser.onConnectionChange(onlineCallback, offlineCallback);
      expect(window.addEventListener).toHaveBeenCalledWith('online', onlineCallback);
      expect(window.addEventListener).toHaveBeenCalledWith('offline', offlineCallback);

      unsubscribe();
      expect(window.removeEventListener).toHaveBeenCalledWith('online', onlineCallback);
      expect(window.removeEventListener).toHaveBeenCalledWith('offline', offlineCallback);
    });
  });

  describe('getUrlParams', () => {
    test('获取URL参数', () => {
      const result = dcBrowser.getUrlParams();
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('age');
    });
  });

  describe('supportsFullscreen', () => {
    test('检查全屏支持', () => {
      const result = dcBrowser.supportsFullscreen();
      expect(result).toBe(true);
    });
  });

  describe('requestFullscreen', () => {
    test('请求全屏', () => {
      const element = {
        requestFullscreen: jest.fn(() => Promise.resolve())
      };
      const result = dcBrowser.requestFullscreen(element);
      expect(element.requestFullscreen).toHaveBeenCalled();
    });
  });

  describe('exitFullscreen', () => {
    test('退出全屏', () => {
      const result = dcBrowser.exitFullscreen();
      expect(document.exitFullscreen).toHaveBeenCalled();
    });
  });

  describe('supportsWebAPI', () => {
    test('检查Web API支持', () => {
      const result = dcBrowser.supportsWebAPI('fetch');
      expect(result).toBe(true);
    });
  });
});
