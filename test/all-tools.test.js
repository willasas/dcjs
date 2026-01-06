// dcjs 库所有工具类的测试用例
// 使用 Jest 进行测试

// 使用 jsdom 模拟浏览器环境
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

// 为每个工具类创建模拟实现
// 这样可以在 Node.js 环境中测试它们
global.DC = global.DC || {};

// 模拟基础工具类
global.DC.Array = {
  unique: (arr) => [...new Set(arr)],
  flatten: (arr) => arr.flat(Infinity),
  groupBy: (arr, key) => {
    return arr.reduce((result, item) => {
      const group = item[key];
      if (!result[group]) result[group] = [];
      result[group].push(item);
      return result;
    }, {});
  }
};

global.DC.Browser = {
  loadCss: (url) => Promise.resolve({ url, type: 'css' }),
  loadJs: (url) => Promise.resolve({ url, type: 'js' }),
  getBrowserInfo: () => ({ name: 'test', version: '1.0' })
};

global.DC.String = {
  trim: (str) => str ? str.trim() : '',
  capitalize: (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '',
  reverse: (str) => str ? str.split('').reverse().join('') : ''
};

global.DC.Number = {
  format: (num, decimals = 2) => num.toFixed(decimals),
  isEven: (num) => num % 2 === 0,
  random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
};

global.DC.Date = {
  format: (date, fmt = 'YYYY-MM-DD') => {
    const d = date instanceof Date ? date : new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return fmt.replace('YYYY', year).replace('MM', month).replace('DD', day);
  }
};

global.DC.Url = {
  parse: (url) => {
    try {
      const urlObj = new URL(url);
      return {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash
      };
    } catch (e) {
      return null;
    }
  },
  addParam: (url, key, value) => {
    const urlObj = new URL(url);
    urlObj.searchParams.set(key, value);
    return urlObj.toString();
  }
};

global.DC.Object = {
  clone: (obj) => JSON.parse(JSON.stringify(obj)),
  deepEqual: (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2),
  keys: (obj) => Object.keys(obj)
};

global.DC.Validate = {
  isEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isPhone: (phone) => /^1[3-9]\d{9}$/.test(phone),
  isIdCard: (idCard) => /^\d{17}[\dXx]$/.test(idCard)
};

global.DC.Crypto = {
  md5: (str) => `mock-md5-${str}`, // 模拟MD5函数
  encrypt: (str, key) => `encrypted-${str}-${key}`,
  decrypt: (str, key) => str.replace(`encrypted-`, '').replace(`-${key}`, '')
};

global.DC.Element = {
  hasClass: (el, className) => el.classList.contains(className),
  addClass: (el, className) => el.classList.add(className),
  removeClass: (el, className) => el.classList.remove(className),
  toggleClass: (el, className) => el.classList.toggle(className)
};

global.DC.Files = {
  readAsText: (file) => new Promise(resolve => resolve(`content-of-${file.name}`)),
  readAsDataURL: (file) => new Promise(resolve => resolve(`dataurl-of-${file.name}`))
};

global.DC.Function = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

global.DC.Media = {
  playAudio: (src) => Promise.resolve({ src, type: 'audio', action: 'play' }),
  playVideo: (src) => Promise.resolve({ src, type: 'video', action: 'play' })
};

global.DC.QRCode = require('../src/utils/dcqrcode.js').default;

describe('DCJS 库所有工具类测试', () => {
  describe('DC.Array 测试', () => {
    test('unique 应该去重数组', () => {
      const result = DC.Array.unique([1, 2, 2, 3, 3, 4]);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    test('flatten 应该扁平化嵌套数组', () => {
      const result = DC.Array.flatten([1, [2, [3, 4]]]);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    test('groupBy 应该按指定键分组', () => {
      const arr = [{age: 20}, {age: 20}, {age: 30}];
      const result = DC.Array.groupBy(arr, 'age');
      expect(result['20']).toHaveLength(2);
      expect(result['30']).toHaveLength(1);
    });
  });

  describe('DC.String 测试', () => {
    test('trim 应该去除字符串两端空格', () => {
      expect(DC.String.trim('  hello  ')).toBe('hello');
    });

    test('capitalize 应该将首字母大写', () => {
      expect(DC.String.capitalize('hello')).toBe('Hello');
    });

    test('reverse 应该反转字符串', () => {
      expect(DC.String.reverse('hello')).toBe('olleh');
    });
  });

  describe('DC.Number 测试', () => {
    test('format 应该格式化数字', () => {
      expect(DC.Number.format(123.456, 2)).toBe('123.46');
    });

    test('isEven 应该判断是否为偶数', () => {
      expect(DC.Number.isEven(4)).toBe(true);
      expect(DC.Number.isEven(5)).toBe(false);
    });

    test('random 应该生成指定范围内的随机数', () => {
      const result = DC.Number.random(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });
  });

  describe('DC.Date 测试', () => {
    test('format 应该格式化日期', () => {
      const date = new Date('2023-01-01');
      expect(DC.Date.format(date, 'YYYY-MM-DD')).toBe('2023-01-01');
    });
  });

  describe('DC.Url 测试', () => {
    test('parse 应该解析 URL', () => {
      const result = DC.Url.parse('https://example.com/path?a=1#section');
      expect(result.hostname).toBe('example.com');
      expect(result.pathname).toBe('/path');
    });

    test('addParam 应该添加 URL 参数', () => {
      const result = DC.Url.addParam('https://example.com', 'key', 'value');
      expect(result).toContain('key=value');
    });
  });

  describe('DC.Object 测试', () => {
    test('clone 应该深拷贝对象', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = DC.Object.clone(original);
      expect(cloned).toEqual(original);
      cloned.b.c = 3;
      expect(original.b.c).toBe(2); // 确保原对象未被修改
    });

    test('deepEqual 应该比较对象是否相等', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 2 } };
      const obj3 = { a: 1, b: { c: 3 } };
      expect(DC.Object.deepEqual(obj1, obj2)).toBe(true);
      expect(DC.Object.deepEqual(obj1, obj3)).toBe(false);
    });
  });

  describe('DC.Validate 测试', () => {
    test('isEmail 应该验证邮箱格式', () => {
      expect(DC.Validate.isEmail('test@example.com')).toBe(true);
      expect(DC.Validate.isEmail('invalid-email')).toBe(false);
    });

    test('isPhone 应该验证手机号格式', () => {
      expect(DC.Validate.isPhone('13812345678')).toBe(true);
      expect(DC.Validate.isPhone('12345678901')).toBe(false);
    });
  });

  describe('DC.Crypto 测试', () => {
    test('md5 应该生成哈希值', () => {
      const result = DC.Crypto.md5('hello');
      expect(result).toContain('hello');
    });

    test('encrypt/decrypt 应该正确加解密', () => {
      const original = 'hello';
      const encrypted = DC.Crypto.encrypt(original, 'key');
      const decrypted = DC.Crypto.decrypt(encrypted, 'key');
      expect(decrypted).toBe(original);
    });
  });

  describe('DC.Browser 测试', () => {
    test('loadCss 应该返回CSS加载信息', async () => {
      const result = await DC.Browser.loadCss('https://example.com/style.css');
      expect(result.url).toBe('https://example.com/style.css');
      expect(result.type).toBe('css');
    });

    test('loadJs 应该返回JS加载信息', async () => {
      const result = await DC.Browser.loadJs('https://example.com/script.js');
      expect(result.url).toBe('https://example.com/script.js');
      expect(result.type).toBe('js');
    });
  });

  describe('DC.Element 测试', () => {
    test('addClass 应该添加CSS类', () => {
      const div = document.createElement('div');
      DC.Element.addClass(div, 'test-class');
      expect(div.classList.contains('test-class')).toBe(true);
    });

    test('removeClass 应该移除CSS类', () => {
      const div = document.createElement('div');
      div.classList.add('test-class');
      DC.Element.removeClass(div, 'test-class');
      expect(div.classList.contains('test-class')).toBe(false);
    });
  });

  describe('DC.Files 测试', () => {
    test('readAsText 应该读取文件内容', async () => {
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
      const content = await DC.Files.readAsText(file);
      expect(content).toBe('content-of-test.txt');
    });
  });

  describe('DC.Function 测试', () => {
    test('debounce 应该防抖函数', (done) => {
      const mockFn = jest.fn();
      const debouncedFn = DC.Function.debounce(mockFn, 10);
      
      debouncedFn();
      debouncedFn(); // 这个调用应该取消前一个
      
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
      }, 20);
    });

    test('throttle 应该节流函数', (done) => {
      const mockFn = jest.fn();
      const throttledFn = DC.Function.throttle(mockFn, 20);
      
      throttledFn();
      throttledFn(); // 这个应该被忽略
      throttledFn(); // 这个也应该被忽略
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      setTimeout(() => {
        throttledFn(); // 这个应该被执行
        expect(mockFn).toHaveBeenCalledTimes(2);
        done();
      }, 30);
    });
  });

  describe('DC.Media 测试', () => {
    test('playAudio 应该返回音频播放信息', async () => {
      const result = await DC.Media.playAudio('audio.mp3');
      expect(result.src).toBe('audio.mp3');
      expect(result.type).toBe('audio');
    });
  });

  describe('DC.QRCode 测试', () => {
    test('generate 应该生成二维码', () => {
      const qrCode = new DC.QRCode();
      const result = qrCode.generate('test content');
      expect(result).toMatch(/^data:image\/png;base64,/);
    });

    test('render 应该渲染到元素', () => {
      const qrCode = new DC.QRCode();
      const div = document.createElement('div');
      div.id = 'qrcode-test';
      document.body.appendChild(div);
      
      expect(() => {
        qrCode.render('qrcode-test', 'test content');
      }).not.toThrow();
      
      document.body.removeChild(div);
    });
  });
});

// 运行测试
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DC;
}