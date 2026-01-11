// dcBrowser 工具类单元测试

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
  test('isMobile: 识别移动设备', () => {
    // 模拟移动设备的userAgent
    const originalUA = global.navigator ? global.navigator.userAgent : '';
    global.navigator = { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)' };
    
    const result = dcBrowser.isMobile();
    
    // 恢复原始userAgent
    global.navigator = originalUA ? { userAgent: originalUA } : undefined;
    
    return result === true;
  });

  test('isMobile: 识别桌面设备', () => {
    const originalUA = global.navigator ? global.navigator.userAgent : '';
    global.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
    
    const result = dcBrowser.isMobile();
    
    global.navigator = originalUA ? { userAgent: originalUA } : undefined;
    
    return result === false;
  });

  test('getBrowserName: 识别Chrome浏览器', () => {
    const originalUA = global.navigator ? global.navigator.userAgent : '';
    global.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' };
    
    const result = dcBrowser.getBrowserName();
    
    global.navigator = originalUA ? { userAgent: originalUA } : undefined;
    
    return result === 'Chrome';
  });

  test('getBrowserName: 识别Firefox浏览器', () => {
    const originalUA = global.navigator ? global.navigator.userAgent : '';
    global.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0' };
    
    const result = dcBrowser.getBrowserName();
    
    global.navigator = originalUA ? { userAgent: originalUA } : undefined;
    
    return result === 'Firefox';
  });

  // 边界情况测试
  test('isMobile: 空userAgent处理', () => {
    const originalUA = global.navigator ? global.navigator.userAgent : '';
    global.navigator = { userAgent: '' };
    
    const result = dcBrowser.isMobile();
    
    global.navigator = originalUA ? { userAgent: originalUA } : undefined;
    
    return result === false;
  });

  test('getBrowserName: 未知浏览器处理', () => {
    const originalUA = global.navigator ? global.navigator.userAgent : '';
    global.navigator = { userAgent: 'CustomBrowser/1.0' };
    
    const result = dcBrowser.getBrowserName();
    
    global.navigator = originalUA ? { userAgent: originalUA } : undefined;
    
    return result === 'Unknown';
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}