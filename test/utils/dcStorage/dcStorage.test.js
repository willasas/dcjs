// dcStorage 工具类单元测试

// 导入要测试的模块
const dcStorage = require('../../../src/utils/dcStorage.js');

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

  // 测试前清空存储
  dcStorage.clear();

  // 测试 set 方法
  test('set: 存储字符串', () => {
    dcStorage.set('username', 'john_doe');
    return dcStorage.get('username') === 'john_doe';
  });

  test('set: 存储数字', () => {
    dcStorage.set('count', 42);
    return dcStorage.get('count') === 42;
  });

  test('set: 存储布尔值', () => {
    dcStorage.set('isActive', true);
    return dcStorage.get('isActive') === true;
  });

  test('set: 存储对象', () => {
    const user = { name: '张三', age: 25, city: '北京' };
    dcStorage.set('user', user);
    const storedUser = dcStorage.get('user');
    return storedUser.name === '张三' && storedUser.age === 25 && storedUser.city === '北京';
  });

  test('set: 存储数组', () => {
    const items = [1, 2, 3, 'a', 'b', 'c'];
    dcStorage.set('items', items);
    const storedItems = dcStorage.get('items');
    return Array.isArray(storedItems) && storedItems.length === 6 && storedItems[0] === 1 && storedItems[3] === 'a';
  });

  test('set: 存储函数（应该转换为null）', () => {
    const func = () => console.log('test');
    dcStorage.set('function', func);
    return dcStorage.get('function') === null;
  });

  test('set: 存储undefined（应该转换为null）', () => {
    dcStorage.set('undefinedValue', undefined);
    return dcStorage.get('undefinedValue') === null;
  });

  test('set: 覆盖已存在的键', () => {
    dcStorage.set('username', 'john_doe');
    dcStorage.set('username', 'jane_smith');
    return dcStorage.get('username') === 'jane_smith';
  });

  test('set: 无效的键名（空字符串）', () => {
    dcStorage.set('', 'value');
    return dcStorage.get('') === null;
  });

  test('set: 无效的键名（非字符串）', () => {
    dcStorage.set(123, 'value');
    return dcStorage.get(123) === null;
  });

  // 测试 get 方法
  test('get: 获取存在的键', () => {
    dcStorage.set('testKey', 'testValue');
    return dcStorage.get('testKey') === 'testValue';
  });

  test('get: 获取不存在的键', () => {
    return dcStorage.get('nonexistentKey') === null;
  });

  test('get: 获取不存在的键但提供默认值', () => {
    return dcStorage.get('nonexistentKey', 'defaultValue') === 'defaultValue';
  });

  test('get: 获取不存在的键但提供对象默认值', () => {
    const defaultValue = { foo: 'bar' };
    const result = dcStorage.get('nonexistentKey', defaultValue);
    return result.foo === 'bar';
  });

  test('get: 获取不存在的键但提供数组默认值', () => {
    const defaultValue = [1, 2, 3];
    const result = dcStorage.get('nonexistentKey', defaultValue);
    return Array.isArray(result) && result.length === 3 && result[0] === 1;
  });

  test('get: 无效的键名（空字符串）', () => {
    return dcStorage.get('') === null;
  });

  test('get: 无效的键名（非字符串）', () => {
    return dcStorage.get(123) === null;
  });

  // 测试 remove 方法
  test('remove: 删除存在的键', () => {
    dcStorage.set('removeTest', 'value');
    dcStorage.remove('removeTest');
    return dcStorage.get('removeTest') === null;
  });

  test('remove: 删除不存在的键（不应抛出异常）', () => {
    dcStorage.remove('nonexistentKey');
    return true; // 只要不抛出异常就通过
  });

  test('remove: 无效的键名（空字符串）', () => {
    dcStorage.remove('');
    return true; // 只要不抛出异常就通过
  });

  test('remove: 无效的键名（非字符串）', () => {
    dcStorage.remove(123);
    return true; // 只要不抛出异常就通过
  });

  // 测试 clear 方法
  test('clear: 清空所有存储', () => {
    dcStorage.set('key1', 'value1');
    dcStorage.set('key2', 'value2');
    dcStorage.clear();
    return dcStorage.get('key1') === null && dcStorage.get('key2') === null;
  });

  // 测试 keys 方法
  test('keys: 获取所有键名', () => {
    dcStorage.clear();
    dcStorage.set('key1', 'value1');
    dcStorage.set('key2', 'value2');
    dcStorage.set('key3', 'value3');
    const keys = dcStorage.keys();
    return Array.isArray(keys) && keys.length === 3 && keys.includes('key1') && keys.includes('key2') && keys.includes('key3');
  });

  test('keys: 空存储', () => {
    dcStorage.clear();
    const keys = dcStorage.keys();
    return Array.isArray(keys) && keys.length === 0;
  });

  // 测试 has 方法
  test('has: 检查存在的键', () => {
    dcStorage.set('hasTest', 'value');
    return dcStorage.has('hasTest') === true;
  });

  test('has: 检查不存在的键', () => {
    return dcStorage.has('nonexistentKey') === false;
  });

  test('has: 无效的键名（空字符串）', () => {
    return dcStorage.has('') === false;
  });

  test('has: 无效的键名（非字符串）', () => {
    return dcStorage.has(123) === false;
  });

  // 测试组合操作
  test('组合操作: 设置、获取、删除、检查', () => {
    dcStorage.set('comboTest', 'value');
    const hasKey = dcStorage.has('comboTest');
    const value = dcStorage.get('comboTest');
    dcStorage.remove('comboTest');
    const hasKeyAfterRemove = dcStorage.has('comboTest');

    return hasKey === true && value === 'value' && hasKeyAfterRemove === false;
  });

  test('组合操作: 批量操作', () => {
    dcStorage.clear();

    // 设置多个键
    for (let i = 1; i <= 10; i++) {
      dcStorage.set(`key${i}`, `value${i}`);
    }

    const keys = dcStorage.keys();
    const hasAllKeys = keys.length === 10 && keys.every((key, index) => key === `key${index + 1}`);

    // 删除多个键
    for (let i = 1; i <= 5; i++) {
      dcStorage.remove(`key${i}`);
    }

    const keysAfterRemove = dcStorage.keys();
    const hasRemainingKeys = keysAfterRemove.length === 5 && keysAfterRemove.every((key, index) => key === `key${index + 6}`);

    return hasAllKeys && hasRemainingKeys;
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}

module.exports = { runTests };