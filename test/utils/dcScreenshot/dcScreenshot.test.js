const DCScreenshot = require('../../../src/utils/dcScreenshot');

// 模拟浏览器环境
if (typeof window === 'undefined') {
  global.window = {
    pageYOffset: 0,
    scrollTo: jest.fn(),
    innerWidth: 1024,
    innerHeight: 768,
    performance: {
      now: jest.fn(() => Date.now())
    }
  };
  
  global.document = {
    body: {
      scrollWidth: 1024,
      scrollHeight: 768
    },
    documentElement: {
      scrollWidth: 1024,
      scrollHeight: 768,
      scrollTop: 0
    },
    createElement: jest.fn((tag) => {
      if (tag === 'canvas') {
        return {
          width: 0,
          height: 0,
          getContext: jest.fn(() => ({
            fillStyle: '',
            fillRect: jest.fn(),
            drawImage: jest.fn(),
            font: '',
            textAlign: '',
            textBaseline: '',
            fillText: jest.fn(),
            drawWindow: jest.fn()
          })),
          toDataURL: jest.fn(() => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')
        };
      }
      return {};
    })
  };
  
  global.performance = {
    now: jest.fn(() => Date.now())
  };
}

describe('DCScreenshot', () => {
  let screenshot;
  
  beforeEach(() => {
    // 重置mock
    if (document.createElement) {
      document.createElement.mockClear();
    }
    if (window.scrollTo) {
      window.scrollTo.mockClear();
    }
    if (performance.now) {
      performance.now.mockClear();
    }
    
    // 创建新实例
    screenshot = new DCScreenshot();
  });
  
  describe('构造函数', () => {
    test('应该使用默认配置创建实例', () => {
      expect(screenshot.options).toEqual({
        format: 'png',
        quality: 0.8,
        useCORS: false,
        watermark: null,
        scale: 1,
        width: null,
        height: null,
        embedFonts: true,
        localFonts: true,
        iconFonts: true,
        excludeFonts: [],
        exclude: null,
        filter: null,
        outerTransforms: true,
        outerShadows: true
      });
      expect(screenshot.plugins).toEqual([]);
      expect(screenshot.performanceMetrics).toEqual({
        captureCount: 0,
        totalTime: 0,
        captureTimes: []
      });
    });
    
    test('应该使用自定义配置创建实例', () => {
      const customOptions = {
        format: 'jpeg',
        quality: 0.9,
        useCORS: true,
        watermark: {
          text: 'Test Watermark',
          position: 'top-left',
          color: 'rgba(0, 0, 0, 0.5)',
          fontSize: 12
        }
      };
      
      const customScreenshot = new DCScreenshot(customOptions);
      expect(customScreenshot.options).toEqual(customOptions);
    });
  });
  
  describe('updateConfig', () => {
    test('应该更新配置选项', () => {
      const newOptions = {
        format: 'webp',
        quality: 0.95
      };
      
      screenshot.updateConfig(newOptions);
      expect(screenshot.options.format).toBe('webp');
      expect(screenshot.options.quality).toBe(0.95);
      expect(screenshot.options.useCORS).toBe(false); // 保持默认值
    });
    
    test('应该更新水印配置', () => {
      const watermarkOptions = {
        watermark: {
          text: 'Updated Watermark',
          position: 'bottom-right',
          color: 'rgba(255, 0, 0, 0.6)',
          fontSize: 16
        }
      };
      
      screenshot.updateConfig(watermarkOptions);
      expect(screenshot.options.watermark).toEqual(watermarkOptions.watermark);
    });
  });
  
  describe('addPlugin 和 removePlugin', () => {
    test('应该添加插件', () => {
      const testPlugin = {
        name: 'testPlugin',
        beforeCapture: jest.fn(options => options),
        afterCapture: jest.fn(result => result)
      };
      
      screenshot.addPlugin(testPlugin);
      expect(screenshot.plugins).toHaveLength(1);
      expect(screenshot.plugins[0]).toBe(testPlugin);
    });
    
    test('应该移除插件', () => {
      const testPlugin = {
        name: 'testPlugin',
        beforeCapture: jest.fn(options => options),
        afterCapture: jest.fn(result => result)
      };
      
      screenshot.addPlugin(testPlugin);
      expect(screenshot.plugins).toHaveLength(1);
      
      screenshot.removePlugin('testPlugin');
      expect(screenshot.plugins).toHaveLength(0);
    });
    
    test('应该只移除指定名称的插件', () => {
      const plugin1 = {
        name: 'plugin1',
        beforeCapture: jest.fn(options => options)
      };
      
      const plugin2 = {
        name: 'plugin2',
        beforeCapture: jest.fn(options => options)
      };
      
      screenshot.addPlugin(plugin1);
      screenshot.addPlugin(plugin2);
      expect(screenshot.plugins).toHaveLength(2);
      
      screenshot.removePlugin('plugin1');
      expect(screenshot.plugins).toHaveLength(1);
      expect(screenshot.plugins[0]).toBe(plugin2);
    });
  });
  
  describe('getPerformanceMetrics', () => {
    test('应该返回初始性能指标', () => {
      const metrics = screenshot.getPerformanceMetrics();
      expect(metrics).toEqual({
        captureCount: 0,
        totalTime: 0,
        captureTimes: [],
        averageTime: 0
      });
    });
    
    test('应该返回更新后的性能指标', async () => {
      // 模拟_updatePerformanceMetrics方法
      screenshot._updatePerformanceMetrics = jest.fn();
      
      // 模拟捕获方法
      screenshot.captureFullPage = jest.fn().mockResolvedValue({
        success: true,
        dataUrl: 'data:image/png;base64,test',
        width: 1024,
        height: 768,
        format: 'png',
        size: 1000
      });
      
      await screenshot.captureFullPage();
      
      // 手动更新性能指标
      screenshot.performanceMetrics.captureCount = 2;
      screenshot.performanceMetrics.totalTime = 200;
      screenshot.performanceMetrics.captureTimes = [120, 80];
      
      const metrics = screenshot.getPerformanceMetrics();
      expect(metrics.captureCount).toBe(2);
      expect(metrics.totalTime).toBe(200);
      expect(metrics.captureTimes).toEqual([120, 80]);
      expect(metrics.averageTime).toBe(100);
    });
  });
  
  describe('captureFullPage', () => {
    test('应该返回成功的截图结果', async () => {
      const result = await screenshot.captureFullPage();
      
      expect(result.success).toBe(true);
      expect(result.dataUrl).toMatch(/^data:image\/png;base64,/);
      expect(result.width).toBeGreaterThan(0);
      expect(result.height).toBeGreaterThan(0);
      expect(result.format).toBe('png');
      expect(result.size).toBeGreaterThan(0);
    });
    
    test('应该处理截图失败的情况', async () => {
      // 模拟canvas.toDataURL抛出错误
      const originalCreateElement = document.createElement;
      document.createElement = jest.fn((tag) => {
        if (tag === 'canvas') {
          return {
            width: 1024,
            height: 768,
            getContext: jest.fn(() => ({
              fillStyle: '',
              fillRect: jest.fn(),
              drawImage: jest.fn(),
              font: '',
              textAlign: '',
              textBaseline: '',
              fillText: jest.fn(),
              drawWindow: jest.fn()
            })),
            toDataURL: jest.fn(() => {
              throw new Error('Canvas error');
            })
          };
        }
        return originalCreateElement(tag);
      });
      
      const result = await screenshot.captureFullPage();
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Canvas error');
      expect(result.dataUrl).toBe('');
      
      // 恢复原始方法
      document.createElement = originalCreateElement;
    });
  });
  
  describe('captureElement', () => {
    test('应该返回成功的元素截图结果', async () => {
      // 创建模拟元素
      const mockElement = {
        getBoundingClientRect: jest.fn(() => ({
          width: 500,
          height: 300,
          left: 100,
          top: 100
        }))
      };
      
      const result = await screenshot.captureElement(mockElement);
      
      expect(result.success).toBe(true);
      expect(result.dataUrl).toMatch(/^data:image\/png;base64,/);
      expect(result.width).toBe(500);
      expect(result.height).toBe(300);
      expect(result.format).toBe('png');
    });
    
    test('应该处理无效元素的情况', async () => {
      const result = await screenshot.captureElement(null);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('无效的元素');
      expect(result.dataUrl).toBe('');
    });
    
    test('应该处理元素截图失败的情况', async () => {
      // 创建模拟元素
      const mockElement = {
        getBoundingClientRect: jest.fn(() => {
          throw new Error('Element error');
        })
      };
      
      const result = await screenshot.captureElement(mockElement);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Element error');
      expect(result.dataUrl).toBe('');
    });
  });
  
  describe('captureRegion', () => {
    test('应该返回成功的区域截图结果', async () => {
      const x = 100;
      const y = 100;
      const width = 400;
      const height = 300;
      
      const result = await screenshot.captureRegion(x, y, width, height);
      
      expect(result.success).toBe(true);
      expect(result.dataUrl).toMatch(/^data:image\/png;base64,/);
      expect(result.width).toBe(width);
      expect(result.height).toBe(height);
      expect(result.format).toBe('png');
    });
    
    test('应该处理区域截图失败的情况', async () => {
      // 模拟canvas.toDataURL抛出错误
      const originalCreateElement = document.createElement;
      document.createElement = jest.fn((tag) => {
        if (tag === 'canvas') {
          return {
            width: 400,
            height: 300,
            getContext: jest.fn(() => ({
              fillStyle: '',
              fillRect: jest.fn(),
              drawImage: jest.fn(),
              font: '',
              textAlign: '',
              textBaseline: '',
              fillText: jest.fn(),
              drawWindow: jest.fn()
            })),
            toDataURL: jest.fn(() => {
              throw new Error('Canvas error');
            })
          };
        }
        return originalCreateElement(tag);
      });
      
      const result = await screenshot.captureRegion(100, 100, 400, 300);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Canvas error');
      expect(result.dataUrl).toBe('');
      
      // 恢复原始方法
      document.createElement = originalCreateElement;
    });
  });
  
  describe('插件系统', () => {
    test('应该在截图前调用插件的beforeCapture钩子', async () => {
      const testPlugin = {
        name: 'testPlugin',
        beforeCapture: jest.fn(options => {
          return {
            ...options,
            pluginApplied: true
          };
        }),
        afterCapture: jest.fn(result => result)
      };
      
      screenshot.addPlugin(testPlugin);
      
      await screenshot.captureFullPage();
      
      expect(testPlugin.beforeCapture).toHaveBeenCalled();
      expect(testPlugin.afterCapture).toHaveBeenCalled();
    });
    
    test('应该在截图后调用插件的afterCapture钩子', async () => {
      const testPlugin = {
        name: 'testPlugin',
        beforeCapture: jest.fn(options => options),
        afterCapture: jest.fn(result => {
          return {
            ...result,
            pluginProcessed: true
          };
        })
      };
      
      screenshot.addPlugin(testPlugin);
      
      const result = await screenshot.captureFullPage();
      
      expect(testPlugin.afterCapture).toHaveBeenCalled();
      expect(result.pluginProcessed).toBe(true);
    });
  });
  
  describe('水印功能', () => {
    test('应该在截图中添加水印', async () => {
      // 创建带水印配置的实例
      const watermarkScreenshot = new DCScreenshot({
        watermark: {
          text: 'Test Watermark',
          position: 'bottom-right',
          color: 'rgba(0, 0, 0, 0.5)',
          fontSize: 14
        }
      });
      
      const result = await watermarkScreenshot.captureFullPage();
      
      expect(result.success).toBe(true);
      expect(result.dataUrl).toMatch(/^data:image\/png;base64,/);
    });
  });
  
  describe('不同格式支持', () => {
    test('应该支持jpeg格式', async () => {
      const jpegScreenshot = new DCScreenshot({
        format: 'jpeg',
        quality: 0.9
      });
      
      const result = await jpegScreenshot.captureFullPage();
      
      expect(result.success).toBe(true);
      expect(result.format).toBe('jpeg');
    });
    
    test('应该支持webp格式', async () => {
      const webpScreenshot = new DCScreenshot({
        format: 'webp',
        quality: 0.95
      });
      
      const result = await webpScreenshot.captureFullPage();
      
      expect(result.success).toBe(true);
      expect(result.format).toBe('webp');
    });
  });
  
  describe('缩放功能', () => {
    test('应该支持缩放配置', async () => {
      const scaledScreenshot = new DCScreenshot({
        scale: 2
      });
      
      const result = await scaledScreenshot.captureFullPage();
      
      expect(result.success).toBe(true);
      expect(result.width).toBe(1024); // 原始宽度
      expect(result.height).toBe(768); // 原始高度
    });
    
    test('应该支持自定义宽度和高度', async () => {
      const customSizeScreenshot = new DCScreenshot({
        width: 800,
        height: 600
      });
      
      const result = await customSizeScreenshot.captureFullPage();
      
      expect(result.success).toBe(true);
      expect(result.width).toBe(800);
      expect(result.height).toBe(600);
    });
  });
  
  describe('新的导出方法', () => {
    test('应该提供toSvg方法', async () => {
      const result = await screenshot.captureFullPage();
      expect(typeof result.toSvg).toBe('function');
    });
    
    test('应该提供toCanvas方法', async () => {
      const result = await screenshot.captureFullPage();
      expect(typeof result.toCanvas).toBe('function');
    });
    
    test('应该提供toBlob方法', async () => {
      const result = await screenshot.captureFullPage();
      expect(typeof result.toBlob).toBe('function');
    });
    
    test('应该提供toPng方法', async () => {
      const result = await screenshot.captureFullPage();
      expect(typeof result.toPng).toBe('function');
    });
    
    test('应该提供toJpg方法', async () => {
      const result = await screenshot.captureFullPage();
      expect(typeof result.toJpg).toBe('function');
    });
    
    test('应该提供toWebp方法', async () => {
      const result = await screenshot.captureFullPage();
      expect(typeof result.toWebp).toBe('function');
    });
    
    test('应该提供download方法', async () => {
      const result = await screenshot.captureFullPage();
      expect(typeof result.download).toBe('function');
    });
  });
  
  describe('静态快捷方法', () => {
    test('应该提供toSvg静态方法', async () => {
      expect(typeof DCScreenshot.toSvg).toBe('function');
    });
    
    test('应该提供toCanvas静态方法', async () => {
      expect(typeof DCScreenshot.toCanvas).toBe('function');
    });
    
    test('应该提供toBlob静态方法', async () => {
      expect(typeof DCScreenshot.toBlob).toBe('function');
    });
    
    test('应该提供toPng静态方法', async () => {
      expect(typeof DCScreenshot.toPng).toBe('function');
    });
    
    test('应该提供toJpg静态方法', async () => {
      expect(typeof DCScreenshot.toJpg).toBe('function');
    });
    
    test('应该提供toWebp静态方法', async () => {
      expect(typeof DCScreenshot.toWebp).toBe('function');
    });
    
    test('应该提供download静态方法', async () => {
      expect(typeof DCScreenshot.download).toBe('function');
    });
  });
});
