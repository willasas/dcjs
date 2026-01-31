/**
 * dcDynamicLoader 测试用例
 */
const DCDynamicDependencyLoader = require('../../../src/utils/dcDynamicLoader');

// 模拟DOM环境
if (typeof document === 'undefined') {
  global.document = {
    currentScript: {
      src: 'http://localhost:8080/src/utils/dcDynamicLoader.js'
    },
    head: {
      appendChild: jest.fn(),
      querySelectorAll: jest.fn(() => [])
    },
    querySelectorAll: jest.fn(() => [])
  };
  global.console = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  };
}

describe('DCDynamicDependencyLoader', () => {
  let loader;

  beforeEach(() => {
    // 重置模拟
    jest.clearAllMocks();

    // 创建新的加载器实例
    loader = new DCDynamicDependencyLoader({
      verbose: true
    });
  });

  describe('constructor', () => {
    test('初始化加载器', () => {
      expect(loader).toBeInstanceOf(DCDynamicDependencyLoader);
      expect(loader.basePath).toBe('http://localhost:8080/src/utils/');
      expect(loader.loadedDependencies).toBeInstanceOf(Set);
      expect(loader.loadingPromises).toBeInstanceOf(Map);
    });

    test('使用默认选项', () => {
      const defaultLoader = new DCDynamicDependencyLoader();
      expect(defaultLoader.options.timeout).toBe(10000);
      expect(defaultLoader.options.retryCount).toBe(3);
      expect(defaultLoader.options.verbose).toBe(false);
    });

    test('自定义选项', () => {
      const customLoader = new DCDynamicDependencyLoader({
        timeout: 5000,
        retryCount: 2,
        verbose: true
      });
      expect(customLoader.options.timeout).toBe(5000);
      expect(customLoader.options.retryCount).toBe(2);
      expect(customLoader.options.verbose).toBe(true);
    });
  });

  describe('getBasePath', () => {
    test('获取当前脚本路径', () => {
      const path = loader.getBasePath();
      expect(path).toBe('http://localhost:8080/src/utils/');
    });

    test('当无法获取当前脚本时使用默认路径', () => {
      const originalCurrentScript = document.currentScript;
      document.currentScript = null;

      const defaultLoader = new DCDynamicDependencyLoader();
      const path = defaultLoader.getBasePath();
      expect(path).toBe('./');
      expect(console.warn).toHaveBeenCalledWith('无法获取当前脚本路径，使用默认路径');

      // 恢复原值
      document.currentScript = originalCurrentScript;
    });
  });

  describe('resolveUrl', () => {
    test('解析绝对URL', () => {
      const url1 = 'http://example.com/style.css';
      const url2 = 'https://example.com/script.js';
      const url3 = '/assets/style.css';

      expect(loader.resolveUrl(url1)).toBe(url1);
      expect(loader.resolveUrl(url2)).toBe(url2);
      expect(loader.resolveUrl(url3)).toBe(url3);
    });

    test('解析相对URL', () => {
      const url = 'style.css';
      const resolvedUrl = loader.resolveUrl(url);
      expect(resolvedUrl).toBe('http://localhost:8080/src/utils/style.css');
    });
  });

  describe('loadCSS', () => {
    test('加载CSS文件', () => {
      const url = 'style.css';
      const fullUrl = loader.resolveUrl(url);

      // 模拟link元素
      const mockLink = {
        rel: 'stylesheet',
        href: fullUrl,
        onload: null,
        onerror: null
      };

      // 模拟createElement
      global.document.createElement = jest.fn(tag => {
        if (tag === 'link') {
          return mockLink;
        }
        return {};
      });

      const promise = loader.loadCSS(url);
      expect(promise).toBeInstanceOf(Promise);
      expect(document.head.appendChild).toHaveBeenCalledWith(mockLink);

      // 模拟加载成功
      mockLink.onload();

      return promise.then(() => {
        expect(loader.loadedDependencies.has(fullUrl)).toBe(true);
        expect(loader.loadingPromises.has(fullUrl)).toBe(false);
      });
    });

    test('加载已加载的CSS文件', () => {
      const url = 'style.css';
      const fullUrl = loader.resolveUrl(url);

      // 标记为已加载
      loader.loadedDependencies.add(fullUrl);

      return loader.loadCSS(url).then(() => {
        expect(document.head.appendChild).not.toHaveBeenCalled();
      });
    });

    test('加载失败时重试', () => {
      const url = 'style.css';
      const fullUrl = loader.resolveUrl(url);

      // 模拟link元素
      const mockLink = {
        rel: 'stylesheet',
        href: fullUrl,
        onload: null,
        onerror: null
      };

      // 模拟createElement
      global.document.createElement = jest.fn(tag => {
        if (tag === 'link') {
          return mockLink;
        }
        return {};
      });

      // 模拟setTimeout
      global.setTimeout = jest.fn((fn) => {
        fn();
      });

      const promise = loader.loadCSS(url);

      // 模拟加载失败
      mockLink.onerror();

      return promise.catch(error => {
        expect(error.message).toContain('加载CSS失败');
      });
    });
  });

  describe('loadScript', () => {
    test('加载JavaScript文件', () => {
      const url = 'script.js';
      const fullUrl = loader.resolveUrl(url);

      // 模拟script元素
      const mockScript = {
        src: fullUrl,
        onload: null,
        onerror: null
      };

      // 模拟createElement
      global.document.createElement = jest.fn(tag => {
        if (tag === 'script') {
          return mockScript;
        }
        return {};
      });

      const promise = loader.loadScript(url);
      expect(promise).toBeInstanceOf(Promise);
      expect(document.head.appendChild).toHaveBeenCalledWith(mockScript);

      // 模拟加载成功
      mockScript.onload();

      return promise.then(() => {
        expect(loader.loadedDependencies.has(fullUrl)).toBe(true);
        expect(loader.loadingPromises.has(fullUrl)).toBe(false);
      });
    });

    test('加载已加载的JavaScript文件', () => {
      const url = 'script.js';
      const fullUrl = loader.resolveUrl(url);

      // 标记为已加载
      loader.loadedDependencies.add(fullUrl);

      return loader.loadScript(url).then(() => {
        expect(document.head.appendChild).not.toHaveBeenCalled();
      });
    });

    test('加载失败时重试', () => {
      const url = 'script.js';
      const fullUrl = loader.resolveUrl(url);

      // 模拟script元素
      const mockScript = {
        src: fullUrl,
        onload: null,
        onerror: null
      };

      // 模拟createElement
      global.document.createElement = jest.fn(tag => {
        if (tag === 'script') {
          return mockScript;
        }
        return {};
      });

      // 模拟setTimeout
      global.setTimeout = jest.fn((fn) => {
        fn();
      });

      const promise = loader.loadScript(url);

      // 模拟加载失败
      mockScript.onerror();

      return promise.catch(error => {
        expect(error.message).toContain('加载脚本失败');
      });
    });
  });

  describe('loadDependencies', () => {
    test('批量加载依赖', () => {
      const dependencies = [
        'style.css',
        'script.js'
      ];

      // 模拟加载方法
      loader.loadCSS = jest.fn(() => Promise.resolve());
      loader.loadScript = jest.fn(() => Promise.resolve());

      return loader.loadDependencies(dependencies).then(() => {
        expect(loader.loadCSS).toHaveBeenCalledWith('style.css');
        expect(loader.loadScript).toHaveBeenCalledWith('script.js');
      });
    });

    test('加载对象格式的依赖', () => {
      const dependencies = [
        { type: 'css', url: 'style.css', options: { id: 'main-style' } },
        { type: 'js', url: 'script.js', options: { async: true } }
      ];

      // 模拟加载方法
      loader.loadCSS = jest.fn(() => Promise.resolve());
      loader.loadScript = jest.fn(() => Promise.resolve());

      return loader.loadDependencies(dependencies).then(() => {
        expect(loader.loadCSS).toHaveBeenCalledWith('style.css', { id: 'main-style' });
        expect(loader.loadScript).toHaveBeenCalledWith('script.js', { async: true });
      });
    });

    test('加载无效的依赖配置', () => {
      const dependencies = [
        { type: 'invalid', url: 'file.txt' }
      ];

      return loader.loadDependencies(dependencies).catch(error => {
        expect(error.message).toContain('无效的依赖配置');
      });
    });
  });

  describe('isLoaded', () => {
    test('检查已加载的依赖', () => {
      const url = 'style.css';
      const fullUrl = loader.resolveUrl(url);

      // 标记为已加载
      loader.loadedDependencies.add(fullUrl);

      expect(loader.isLoaded(url)).toBe(true);
    });

    test('检查未加载的依赖', () => {
      const url = 'style.css';
      expect(loader.isLoaded(url)).toBe(false);
    });
  });

  describe('getLoadedDependencies', () => {
    test('获取已加载的依赖列表', () => {
      const url1 = 'style.css';
      const url2 = 'script.js';
      const fullUrl1 = loader.resolveUrl(url1);
      const fullUrl2 = loader.resolveUrl(url2);

      // 添加到已加载列表
      loader.loadedDependencies.add(fullUrl1);
      loader.loadedDependencies.add(fullUrl2);

      const loaded = loader.getLoadedDependencies();
      expect(loaded).toHaveLength(2);
      expect(loaded).toContain(fullUrl1);
      expect(loaded).toContain(fullUrl2);
    });
  });

  describe('unload', () => {
    test('卸载依赖', () => {
      const url = 'style.css';
      const fullUrl = loader.resolveUrl(url);

      // 添加到已加载列表
      loader.loadedDependencies.add(fullUrl);

      // 模拟querySelectorAll返回元素
      const mockElement = { remove: jest.fn() };
      document.querySelectorAll = jest.fn(selector => {
        if (selector.includes(fullUrl)) {
          return [mockElement];
        }
        return [];
      });

      loader.unload(url);
      expect(loader.loadedDependencies.has(fullUrl)).toBe(false);
      expect(mockElement.remove).toHaveBeenCalled();
    });
  });

  describe('log', () => {
    test('记录日志', () => {
      loader.log('测试日志');
      expect(console.log).toHaveBeenCalledWith('[DynamicDependencyLoader] 测试日志');
    });

    test('记录错误日志', () => {
      loader.log('错误日志', 'error');
      expect(console.error).toHaveBeenCalledWith('[DynamicDependencyLoader] 错误日志');
    });

    test('记录警告日志', () => {
      loader.log('警告日志', 'warn');
      expect(console.warn).toHaveBeenCalledWith('[DynamicDependencyLoader] 警告日志');
    });

    test('当verbose为false时不记录日志', () => {
      const silentLoader = new DCDynamicDependencyLoader({ verbose: false });
      silentLoader.log('测试日志');
      expect(console.log).not.toHaveBeenCalledWith('[DynamicDependencyLoader] 测试日志');
    });
  });
});