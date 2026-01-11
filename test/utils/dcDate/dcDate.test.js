// dcDate 工具类单元测试

// 导入要测试的模块
const dcDate = require('../../../src/utils/dcDate.js');

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

  // 日期格式化测试
  test('format: 格式化当前日期', () => {
    const now = new Date();
    const formatted = dcDate.format(now, 'yyyy-MM-dd HH:mm:ss');
    
    // 检查格式是否正确
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(formatted);
  });

  test('format: 格式化指定日期', () => {
    const date = new Date('2023-12-25T10:30:00');
    const formatted = dcDate.format(date, 'yyyy年MM月dd日 HH时mm分ss秒');
    const expected = '2023年12月25日 10时30分00秒';
    
    return formatted === expected;
  });

  test('format: 支持多种格式化模式', () => {
    const date = new Date('2023-06-15T08:45:30');
    
    // 测试不同格式
    const format1 = dcDate.format(date, 'yyyy-MM-dd');
    const format2 = dcDate.format(date, 'HH:mm');
    const format3 = dcDate.format(date, 'yyyy年MM月dd日');
    
    return format1 === '2023-06-15' && 
           format2 === '08:45' && 
           format3 === '2023年06月15日';
  });

  // 日期解析测试
  test('parse: 解析标准日期字符串', () => {
    const dateString = '2023-12-25T10:30:00';
    const parsed = dcDate.parse(dateString);
    
    return parsed instanceof Date && !isNaN(parsed.getTime());
  });

  test('parse: 解析自定义格式日期', () => {
    const dateString = '2023年12月25日 10:30:00';
    const parsed = dcDate.parse(dateString, 'yyyy年MM月dd日 HH:mm:ss');
    
    return parsed instanceof Date && !isNaN(parsed.getTime());
  });

  // 日期计算测试
  test('addDays: 添加天数', () => {
    const date = new Date('2023-12-25');
    const result = dcDate.addDays(date, 10);
    const expected = new Date('2024-01-04');
    
    return result.getFullYear() === expected.getFullYear() &&
           result.getMonth() === expected.getMonth() &&
           result.getDate() === expected.getDate();
  });

  test('addMonths: 添加月份', () => {
    const date = new Date('2023-12-25');
    const result = dcDate.addMonths(date, 3);
    const expected = new Date('2024-03-25');
    
    return result.getFullYear() === expected.getFullYear() &&
           result.getMonth() === expected.getMonth() &&
           result.getDate() === expected.getDate();
  });

  test('addYears: 添加年份', () => {
    const date = new Date('2023-12-25');
    const result = dcDate.addYears(date, 2);
    const expected = new Date('2025-12-25');
    
    return result.getFullYear() === expected.getFullYear() &&
           result.getMonth() === expected.getMonth() &&
           result.getDate() === expected.getDate();
  });

  // 边界情况测试
  test('format: 空日期处理', () => {
    const formatted = dcDate.format(null, 'yyyy-MM-dd');
    return formatted === '';
  });

  test('format: 无效日期处理', () => {
    const formatted = dcDate.format(new Date('invalid'), 'yyyy-MM-dd');
    return formatted === '';
  });

  test('parse: 空字符串处理', () => {
    const parsed = dcDate.parse('');
    return !(parsed instanceof Date) || isNaN(parsed.getTime());
  });

  test('parse: 无效格式处理', () => {
    const parsed = dcDate.parse('invalid-date-string', 'yyyy-MM-dd');
    return !(parsed instanceof Date) || isNaN(parsed.getTime());
  });

  // 闰年测试
  test('addDays: 闰年日期计算', () => {
    const date = new Date('2024-02-28'); // 2024是闰年
    const result = dcDate.addDays(date, 2);
    const expected = new Date('2024-03-01');
    
    return result.getFullYear() === expected.getFullYear() &&
           result.getMonth() === expected.getMonth() &&
           result.getDate() === expected.getDate();
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}