// dcFiles 测试用例

const { JSDOM } = require('jsdom');

// 创建一个模拟的浏览器环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.File = require('buffer').File || class File {
  constructor(parts, filename, options = {}) {
    this.name = filename;
    this.size = parts[0].length;
    this.type = options.type || '';
    this.lastModified = options.lastModified || Date.now();
  }
};
global.FileReader = class FileReader {
  constructor() {
    this.result = null;
    this.onload = null;
    this.onerror = null;
  }

  readAsText(file) {
    setTimeout(() => {
      this.result = 'mock file content';
      if (this.onload) this.onload();
    }, 0);
  }

  readAsDataURL(file) {
    setTimeout(() => {
      this.result = 'data:image/jpeg;base64,mockbase64data';
      if (this.onload) this.onload();
    }, 0);
  }

  readAsArrayBuffer(file) {
    setTimeout(() => {
      this.result = new ArrayBuffer(10);
      if (this.onload) this.onload();
    }, 0);
  }

  readAsBinaryString(file) {
    setTimeout(() => {
      this.result = 'mockbinarystring';
      if (this.onload) this.onload();
    }, 0);
  }
};
global.URL = {
  createObjectURL: jest.fn(() => 'blob:http://localhost/mock-blob'),
  revokeObjectURL: jest.fn()
};
global.Blob = require('buffer').Blob || class Blob {
  constructor(parts, options = {}) {
    this.size = parts[0].length;
    this.type = options.type || '';
  }
};

// 导入被测试模块
require('../../../src/utils/dcFiles');

describe('dcFiles 测试', () => {
  let mockFile;
  let mockImageFile;

  beforeEach(() => {
    // 创建模拟文件
    mockFile = new File(['mock content'], 'test.txt', { type: 'text/plain' });
    mockImageFile = new File(['mock image content'], 'test.jpg', { type: 'image/jpeg' });
  });

  describe('基础文件操作方法测试', () => {
    test('getFiles 应该从文件输入元素获取文件', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.files = [mockFile];

      const files = DC.Files.getFiles(input);
      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBe(1);
    });

    test('getFiles 应该处理无效的输入元素', () => {
      const files = DC.Files.getFiles('not an input');
      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBe(0);
    });

    test('readFile 应该读取文件内容', async () => {
      const content = await DC.Files.readFile(mockFile, 'text');
      expect(typeof content).toBe('string');
    });

    test('readFile 应该处理不同的读取方式', async () => {
      const textContent = await DC.Files.readFile(mockFile, 'text');
      expect(typeof textContent).toBe('string');

      const dataUrlContent = await DC.Files.readFile(mockFile, 'dataURL');
      expect(typeof dataUrlContent).toBe('string');

      const arrayBufferContent = await DC.Files.readFile(mockFile, 'arrayBuffer');
      expect(arrayBufferContent).toBeInstanceOf(ArrayBuffer);

      const binaryStringContent = await DC.Files.readFile(mockFile, 'binaryString');
      expect(typeof binaryStringContent).toBe('string');
    });

    test('readFile 应该处理无效的文件对象', async () => {
      await expect(DC.Files.readFile('not a file')).rejects.toThrow('无效的文件对象');
    });

    test('readImage 应该读取图片文件', async () => {
      const dataUrl = await DC.Files.readImage(mockImageFile);
      expect(typeof dataUrl).toBe('string');
      expect(dataUrl.startsWith('data:image/')).toBe(true);
    });

    test('readImage 应该处理非图片文件', async () => {
      await expect(DC.Files.readImage(mockFile)).rejects.toThrow('文件不是图片');
    });

    test('createImage 应该创建图片元素', async () => {
      const img = await DC.Files.createImage('https://example.com/image.jpg');
      expect(img).toBeInstanceOf(HTMLElement);
      expect(img.tagName).toBe('IMG');
    });

    test('loadImages 应该加载多个图片', async () => {
      const images = await DC.Files.loadImages([
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
      ]);
      expect(Array.isArray(images)).toBe(true);
      expect(images.length).toBe(2);
      expect(images[0]).toBeInstanceOf(HTMLElement);
    });

    test('loadImages 应该处理无效的输入', async () => {
      await expect(DC.Files.loadImages('not an array')).rejects.toThrow('sources必须是数组');
    });

    test('downloadFile 应该创建下载链接', () => {
      const createElementSpy = jest.spyOn(document, 'createElement');
      const appendChildSpy = jest.spyOn(document.body, 'appendChild');
      const removeChildSpy = jest.spyOn(document.body, 'removeChild');
      const clickSpy = jest.fn();

      // 模拟a标签的click方法
      const mockLink = {
        style: {},
        href: '',
        download: '',
        click: clickSpy
      };
      createElementSpy.mockReturnValue(mockLink);

      DC.Files.downloadFile('https://example.com/file.txt', 'test.txt');

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
      expect(clickSpy).toHaveBeenCalled();

      // 清理
      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });

    test('previewImage 应该预览图片', async () => {
      const previewUrl = await DC.Files.previewImage(mockImageFile);
      expect(typeof previewUrl).toBe('string');
    });

    test('previewImage 应该处理非图片文件', async () => {
      await expect(DC.Files.previewImage(mockFile)).rejects.toThrow('不是图片文件');
    });
  });

  describe('图片预加载类测试', () => {
    test('Preload 应该创建预加载实例', () => {
      expect(() => {
        new DC.Files.Preload(['https://example.com/image.jpg']);
      }).not.toThrow();
    });

    test('Preload 应该处理非数组参数', () => {
      expect(() => {
        new DC.Files.Preload('not an array');
      }).toThrow('pics必须是数组');
    });

    test('Preload 应该调用回调函数', (done) => {
      let completeCalled = false;

      new DC.Files.Preload(
        ['https://example.com/image.jpg'],
        {
          complete: (successCount, errorCount) => {
            completeCalled = true;
            expect(typeof successCount).toBe('number');
            expect(typeof errorCount).toBe('number');
            done();
          }
        }
      );
    });
  });

  describe('图片懒加载类测试', () => {
    test('LazyLoader 应该创建懒加载实例', () => {
      expect(() => {
        new DC.Files.LazyLoader();
      }).not.toThrow();
    });

    test('LazyLoader 应该初始化并观察图片', () => {
      // 创建测试图片元素
      const img = document.createElement('img');
      img.className = 'lazy';
      img.dataset.src = 'https://example.com/image.jpg';
      document.body.appendChild(img);

      // 模拟 IntersectionObserver
      global.IntersectionObserver = class IntersectionObserver {
        constructor(callback, options) {
          this.callback = callback;
          this.options = options;
        }

        observe(target) {
          // 模拟交叉观察
          setTimeout(() => {
            this.callback([{ isIntersecting: true, target }]);
          }, 0);
        }

        unobserve(target) {
        }

        disconnect() {
        }
      };

      const lazyLoader = new DC.Files.LazyLoader({ selector: '.lazy' });
      expect(lazyLoader).toBeInstanceOf(Object);

      // 清理
      if (img.parentNode) {
        img.parentNode.removeChild(img);
      }
    });

    test('LazyLoader 应该在不支持 IntersectionObserver 时加载所有图片', () => {
      // 保存原始 IntersectionObserver
      const originalIntersectionObserver = global.IntersectionObserver;

      // 删除 IntersectionObserver
      delete global.IntersectionObserver;

      // 创建测试图片元素
      const img = document.createElement('img');
      img.className = 'lazy';
      img.dataset.src = 'https://example.com/image.jpg';
      document.body.appendChild(img);

      expect(() => {
        new DC.Files.LazyLoader({ selector: '.lazy' });
      }).not.toThrow();

      // 恢复原始 IntersectionObserver
      global.IntersectionObserver = originalIntersectionObserver;

      // 清理
      if (img.parentNode) {
        img.parentNode.removeChild(img);
      }
    });

    test('LazyLoader 应该提供 destroy 和 refresh 方法', () => {
      const lazyLoader = new DC.Files.LazyLoader();
      expect(typeof lazyLoader.destroy).toBe('function');
      expect(typeof lazyLoader.refresh).toBe('function');

      expect(() => {
        lazyLoader.destroy();
        lazyLoader.refresh();
      }).not.toThrow();
    });
  });

  describe('边界情况测试', () => {
    test('resizeFile 应该处理小于最大尺寸的文件', async () => {
      const result = await DC.Files.resizeFile(mockImageFile, 1000000);
      expect(result).toBeInstanceOf(File);
    });

    test('resizeFile 应该处理非图片文件', async () => {
      await expect(DC.Files.resizeFile(mockFile, 1000)).rejects.toThrow('不支持的文件类型');
    });

    test('readImage 应该处理空文件', async () => {
      await expect(DC.Files.readImage(null)).rejects.toThrow('没有提供文件');
    });

    test('loadImages 应该处理空数组', async () => {
      const images = await DC.Files.loadImages([]);
      expect(Array.isArray(images)).toBe(true);
      expect(images.length).toBe(0);
    });
  });
});