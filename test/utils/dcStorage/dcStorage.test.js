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

  // 基本存储操作测试
  test('set: 存储字符串数据', () => {
    const key = 'testString';
    const value = 'Hello World';
    
    dcStorage.set(key, value);
    const retrieved = dcStorage.get(key);
    
    return retrieved === value;
  });

  test('set: 存储数字数据', () => {
    const key = 'testNumber';
    const value = 12345;
    
    dcStorage.set(key, value);
    const retrieved = dcStorage.get(key);
    
    return retrieved === value;
  });

  test('set: 存储布尔值', () => {
    const key = 'testBoolean';
    const value = true;
    
    dcStorage.set(key, value);
    const retrieved = dcStorage.get(key);
    
    return retrieved === value;
  });

  test('set: 存储对象数据', () => {
    const key = 'testObject';
    const value = { name: '张三', age: 25, city: '北京' };
    
    dcStorage.set(key, value);
    const retrieved = dcStorage.get(key);
    
    return JSON.stringify(retrieved) === JSON.stringify(value);
  });

  test('set: 存储数组数据', () => {
    const key = 'testArray';
    const value = [1, 2, 3, 'a', 'b', 'c'];
    
    dcStorage.set(key, value);
    const retrieved = dcStorage.get(key);
    
    return JSON.stringify(retrieved) === JSON.stringify(value);
  });

  // get方法测试
  test('get: 获取存在的键', () => {
    const key = 'existingKey';
    const value = 'some value';
    
    dcStorage.set(key, value);
    const retrieved = dcStorage.get(key);
    
    return retrieved === value;
  });

  test('get: 获取不存在的键', () => {
    const retrieved = dcStorage.get('nonexistentKey');
    
    return retrieved === null;
  });

  test('get: 获取不存在的键并提供默认值', () => {
    const defaultValue = 'default value';
    const retrieved = dcStorage.get('nonexistentKey', defaultValue);
    
    return retrieved === defaultValue;
  });

  // remove方法测试
  test('remove: 删除存在的键', () => {
    const key = 'keyToRemove';
    const value = 'value to remove';
    
    dcStorage.set(key, value);
    dcStorage.remove(key);
    const retrieved = dcStorage.get(key);
    
    return retrieved === null;
  });

  test('remove: 删除不存在的键', () => {
    // 删除不存在的键不应该抛出异常
    try {
      dcStorage.remove('nonexistentKey');
      return true;
    } catch (error) {
      return false;
    }
  });

  // clear方法测试
  test('clear: 清空所有存储', () => {
    // 先设置一些数据
    dcStorage.set('key1', 'value1');
    dcStorage.set('key2', 'value2');
    
    // 清空
    dcStorage.clear();
    
    // 检查是否都为空
    const value1 = dcStorage.get('key1');
    const value2 = dcStorage.get('key2');
    
    return value1 === null && value2 === null;
  });

  // keys方法测试
  test('keys: 获取所有键名', () => {
    // 先清空
    dcStorage.clear();
    
    // 设置多个键值对
    dcStorage.set('key1', 'value1');
    dcStorage.set('key2', 'value2');
    dcStorage.set('key3', 'value3');
    
    const keys = dcStorage.keys();
    
    return Array.isArray(keys) && 
           keys.length === 3 && 
           keys.includes('key1') && 
           keys.includes('key2') && 
           keys.includes('key3');
  });

  // has方法测试
  test('has: 检查存在的键', () => {
    const key = 'existingKey';
    dcStorage.set(key, 'some value');
    
    return dcStorage.has(key) === true;
  });

  test('has: 检查不存在的键', () => {
    return dcStorage.has('nonexistentKey') === false;
  });

  // 边界情况测试
  test('set: 空键名处理', () => {
    try {
      dcStorage.set('', 'value');
      return true;
    } catch (error) {
      return false;
    }
  });

  test('set: 空值处理', () => {
    const key = 'emptyValueKey';
    dcStorage.set(key, '');
    const retrieved = dcStorage.get(key);
    
    return retrieved === '';
  });

  test('set: null值处理', () => {
    const key = 'nullValueKey';
    dcStorage.set(key, null);
    const retrieved = dcStorage.get(key);
    
    return retrieved === null;
  });

  test('get: 空键名处理', () => {
    const retrieved = dcStorage.get('');
    
    return retrieved === null;
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}