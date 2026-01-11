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
  test('unique: 去除重复元素', () => {
    const input = [1, 2, 2, 3, 4, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    return JSON.stringify(dcArray.unique(input)) === JSON.stringify(expected);
  });

  test('flatten: 多层数组扁平化', () => {
    const input = [1, [2, [3, 4], 5]];
    const expected = [1, 2, 3, 4, 5];
    return JSON.stringify(dcArray.flatten(input)) === JSON.stringify(expected);
  });

  test('groupBy: 按属性分组', () => {
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

  test('flatten: 嵌套深度测试', () => {
    const input = [1, [2, [3, [4, [5]]]]];
    const expected = [1, 2, 3, 4, 5];
    return JSON.stringify(dcArray.flatten(input)) === JSON.stringify(expected);
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}