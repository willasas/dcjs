// dcBrowser 工具类浏览器环境测试
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

global.DC.Browser = {
    isMobile: function() {},
    getBrowserName: function() {}
};

// 导入要测试的模块
const dcBrowser = require('../../../src/utils/dcBrowser.js');

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

  // 浏览器检测测试
  test('isMobile: 在浏览器环境下识别移动设备', () => {
    // 保存原始userAgent
    const originalUA = navigator.userAgent;
    
    // 模拟移动设备userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)',
      configurable: true
    });
    
    const result = dcBrowser.isMobile();
    
    // 恢复原始userAgent
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUA,
      configurable: true
    });
    
    return result === true;
  });

  test('isMobile: 在浏览器环境下识别桌面设备', () => {
    const originalUA = navigator.userAgent;
    
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      configurable: true
    });
    
    const result = dcBrowser.isMobile();
    
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUA,
      configurable: true
    });
    
    return result === false;
  });

  test('getBrowserName: 在浏览器环境下识别Chrome浏览器', () => {
    const originalUA = navigator.userAgent;
    
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      configurable: true
    });
    
    const result = dcBrowser.getBrowserName();
    
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUA,
      configurable: true
    });
    
    return result === 'Chrome';
  });

  test('getBrowserName: 在浏览器环境下识别Firefox浏览器', () => {
    const originalUA = navigator.userAgent;
    
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      configurable: true
    });
    
    const result = dcBrowser.getBrowserName();
    
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUA,
      configurable: true
    });
    
    return result === 'Firefox';
  });

  // 边界情况测试
  test('isMobile: 空userAgent处理', () => {
    const originalUA = navigator.userAgent;
    
    Object.defineProperty(navigator, 'userAgent', {
      value: '',
      configurable: true
    });
    
    const result = dcBrowser.isMobile();
    
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUA,
      configurable: true
    });
    
    return result === false;
  });

  test('getBrowserName: 未知浏览器处理', () => {
    const originalUA = navigator.userAgent;
    
    Object.defineProperty(navigator, 'userAgent', {
      value: 'CustomBrowser/1.0',
      configurable: true
    });
    
    const result = dcBrowser.getBrowserName();
    
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUA,
      configurable: true
    });
    
    return result === 'Unknown';
  });

  console.log(`\n浏览器环境测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}