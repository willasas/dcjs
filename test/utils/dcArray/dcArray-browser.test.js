// dcArray 工具类浏览器环境测试
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

// 导入要测试的模块
const dcArray = require('../../../src/utils/dcArray.js');

// 测试套件
function runTests() {
  let passedTests = 0;
  let totalTests = 0;

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

  // 基本功能测试
  test('unique: 在浏览器环境下去除重复元素', () => {
    const input = [1, 2, 2, 3, 4, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    return JSON.stringify(dcArray.unique(input)) === JSON.stringify(expected);
  });

  test('flatten: 在浏览器环境下多层数组扁平化', () => {
    const input = [1, [2, [3, 4], 5]];
    const expected = [1, 2, 3, 4, 5];
    return JSON.stringify(dcArray.flatten(input)) === JSON.stringify(expected);
  });

  test('groupBy: 在浏览器环境下按属性分组', () => {
    const input = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' }
    ];
    const result = dcArray.groupBy(input, 'category');
    return result.fruit.length === 2 && result.vegetable.length === 1;
  });

  // 边界情况测试
  test('unique: 空数组处理', () => {
    return dcArray.unique([]).length === 0;
  });

  console.log(`\n浏览器环境测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}