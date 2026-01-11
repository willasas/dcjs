// dcCookie 工具类浏览器环境测试
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

global.DC = global.DC || {};

global.DC.Cookie = {
    set: function() {},
    get: function() {},
    remove: function() {}
};

// 导入要测试的模块
const dcCookie = require('../../../src/utils/dcCookie.js');

// 测试套件
function runTests() {
  let passedTests = 0;
  let totalTests = 0;

  // 测试辅助函数
  function test(description, testFunction) {
    totalTests++;
    try {
      const result = testFunction();
      if (result) {
        console.log(`✓ ${description}`);
        passedTests++;
      } else {
        console.error(`✗ ${description}`);
      }
    } catch (error) {
      console.error(`✗ ${description}: ${error.message}`);
    }
  }

  // 基本Cookie操作测试
  test('set: 在浏览器环境下设置简单Cookie', () => {
    dcCookie.set('username', 'john_doe');
    const value = dcCookie.get('username');
    return value === 'john_doe';
  });

  test('set: 在浏览器环境下设置带有效期的Cookie', () => {
    dcCookie.set('session', '123456', 1); // 1天有效期
    const value = dcCookie.get('session');
    return value === '123456';
  });

  test('set: 在浏览器环境下设置带路径的Cookie', () => {
    dcCookie.set('admin_token', 'secret', null, '/admin');
    const value = dcCookie.get('admin_token');
    return value === 'secret';
  });

  test('set: 在浏览器环境下设置带域的Cookie', () => {
    dcCookie.set('site_pref', 'dark', null, '/', 'example.com');
    const value = dcCookie.get('site_pref');
    return value === 'dark';
  });

  test('set: 在浏览器环境下设置带安全标志的Cookie', () => {
    dcCookie.set('secure_token', 'abc123', null, '/', '', true);
    const value = dcCookie.get('secure_token');
    return value === 'abc123';
  });

  // get方法测试
  test('get: 在浏览器环境下获取存在的Cookie', () => {
    dcCookie.set('color', 'blue');
    const value = dcCookie.get('color');
    return value === 'blue';
  });

  test('get: 在浏览器环境下获取不存在的Cookie', () => {
    const value = dcCookie.get('nonexistent');
    return value === null;
  });

  test('get: 在浏览器环境下获取不存在的Cookie并提供默认值', () => {
    const value = dcCookie.get('nonexistent', 'default');
    return value === 'default';
  });

  // remove方法测试
  test('remove: 在浏览器环境下删除存在的Cookie', () => {
    dcCookie.set('temp', 'value');
    dcCookie.remove('temp');
    const value = dcCookie.get('temp');
    return value === null;
  });

  test('remove: 在浏览器环境下删除不存在的Cookie', () => {
    try {
      dcCookie.remove('nonexistent');
      return true;
    } catch (error) {
      return false;
    }
  });

  test('remove: 在浏览器环境下删除带路径的Cookie', () => {
    dcCookie.set('path_cookie', 'value', null, '/test');
    dcCookie.remove('path_cookie', '/test');
    const value = dcCookie.get('path_cookie');
    return value === null;
  });

  test('remove: 在浏览器环境下删除带域的Cookie', () => {
    dcCookie.set('domain_cookie', 'value', null, '/', 'example.com');
    dcCookie.remove('domain_cookie', '/', 'example.com');
    const value = dcCookie.get('domain_cookie');
    return value === null;
  });

  // 边界情况测试
  test('set: 在浏览器环境下处理空Cookie名', () => {
    try {
      dcCookie.set('', 'value');
      return true;
    } catch (error) {
      return false;
    }
  });

  test('set: 在浏览器环境下处理空Cookie值', () => {
    dcCookie.set('empty_value', '');
    const value = dcCookie.get('empty_value');
    return value === '';
  });

  test('set: 在浏览器环境下处理特殊字符', () => {
    const specialValue = 'value!@#$%^&*()_+-={}:<>?,./;\|[]';
    dcCookie.set('special', specialValue);
    const value = dcCookie.get('special');
    return value === specialValue;
  });

  test('set: 在浏览器环境下处理中文字符', () => {
    const chineseValue = '中文测试';
    dcCookie.set('chinese', chineseValue);
    const value = dcCookie.get('chinese');
    return value === chineseValue;
  });

  test('get: 在浏览器环境下获取值包含特殊字符的Cookie', () => {
    const specialValue = 'value with spaces & special chars!';
    dcCookie.set('special_chars', specialValue);
    const value = dcCookie.get('special_chars');
    return value === specialValue;
  });

  // 有效期测试
  test('set: 在浏览器环境下设置有效期为0（会话Cookie）', () => {
    dcCookie.set('session_cookie', 'value', 0);
    const value = dcCookie.get('session_cookie');
    return value === 'value';
  });

  test('set: 在浏览器环境下过期时间测试', () => {
    dcCookie.set('expired_cookie', 'value', -1); // 过期
    const value = dcCookie.get('expired_cookie');
    return value === null;
  });

  // 批量操作测试
  test('getAll: 在浏览器环境下获取所有Cookie', () => {
    // 清空
    document.cookie.split(';').forEach(c => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    
    // 设置多个Cookie
    dcCookie.set('user', 'john');
    dcCookie.set('theme', 'dark');
    dcCookie.set('language', 'zh-CN');
    
    const allCookies = dcCookie.getAll();
    
    return allCookies.user === 'john' &&
           allCookies.theme === 'dark' &&
           allCookies.language === 'zh-CN';
  });

  test('removeAll: 在浏览器环境下删除所有Cookie', () => {
    // 设置多个Cookie
    dcCookie.set('cookie1', 'value1');
    dcCookie.set('cookie2', 'value2');
    
    dcCookie.removeAll();
    
    const allCookies = dcCookie.getAll();
    return Object.keys(allCookies).length === 0;
  });

  console.log(`\n浏览器环境测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}