/**
 * dcDate 测试用例
 */
const dcDate = require('../../../src/utils/dcDate');

describe('dcDate', () => {
  describe('format', () => {
    test('格式化日期', () => {
      const date = new Date('2024-01-01 12:00:00');
      const result = dcDate.format(date, 'YYYY-MM-DD HH:mm:ss');
      expect(result).toBe('2024-01-01 12:00:00');
    });

    test('无效日期', () => {
      const result = dcDate.format(null);
      expect(result).toBe('');
    });

    test('不同格式', () => {
      const date = new Date('2024-01-01 12:34:56');
      const result1 = dcDate.format(date, 'YYYY/MM/DD');
      expect(result1).toBe('2024/01/01');

      const result2 = dcDate.format(date, 'HH:mm');
      expect(result2).toBe('12:34');

      const result3 = dcDate.format(date, 'YYYY年MM月DD日');
      expect(result3).toBe('2024年01月01日');
    });
  });

  describe('parseDate', () => {
    test('解析日期对象', () => {
      const date = new Date('2024-01-01');
      const result = dcDate.parseDate(date);
      expect(result).toBeInstanceOf(Date);
    });

    test('解析时间戳', () => {
      const timestamp = new Date('2024-01-01').getTime();
      const result = dcDate.parseDate(timestamp);
      expect(result).toBeInstanceOf(Date);
    });

    test('解析日期字符串', () => {
      const dateStr = '2024-01-01';
      const result = dcDate.parseDate(dateStr);
      expect(result).toBeInstanceOf(Date);
    });

    test('解析中文日期字符串', () => {
      const dateStr = '2024年01月01日';
      const result = dcDate.parseDate(dateStr);
      expect(result).toBeInstanceOf(Date);
    });

    test('无效日期', () => {
      const result = dcDate.parseDate('invalid');
      expect(result).toBeNull();
    });
  });

  describe('getRelativeTime', () => {
    test('获取相对时间描述', () => {
      const date = new Date(Date.now() - 1000 * 60 * 5); // 5分钟前
      const result = dcDate.getRelativeTime(date);
      expect(result).toBe('5分钟前');
    });

    test('未来时间', () => {
      const date = new Date(Date.now() + 1000 * 60 * 5); // 5分钟后
      const result = dcDate.getRelativeTime(date);
      expect(result).toBe('5分钟后');
    });

    test('刚刚', () => {
      const date = new Date(Date.now() - 1000); // 1秒前
      const result = dcDate.getRelativeTime(date);
      expect(result).toBe('刚刚');
    });
  });

  describe('getDateRange', () => {
    test('获取今天的日期范围', () => {
      const [start, end] = dcDate.getDateRange('today');
      expect(start).toBeInstanceOf(Date);
      expect(end).toBeInstanceOf(Date);
      expect(start.getHours()).toBe(0);
      expect(end.getHours()).toBe(23);
    });

    test('获取本周的日期范围', () => {
      const [start, end] = dcDate.getDateRange('thisweek');
      expect(start).toBeInstanceOf(Date);
      expect(end).toBeInstanceOf(Date);
    });

    test('获取本月的日期范围', () => {
      const [start, end] = dcDate.getDateRange('thismonth');
      expect(start).toBeInstanceOf(Date);
      expect(end).toBeInstanceOf(Date);
      expect(start.getDate()).toBe(1);
    });

    test('获取本年的日期范围', () => {
      const [start, end] = dcDate.getDateRange('thisyear');
      expect(start).toBeInstanceOf(Date);
      expect(end).toBeInstanceOf(Date);
      expect(start.getMonth()).toBe(0);
      expect(start.getDate()).toBe(1);
    });

    test('无效范围', () => {
      const [start, end] = dcDate.getDateRange('invalid');
      expect(start).toBeNull();
      expect(end).toBeNull();
    });
  });

  describe('add', () => {
    test('添加年', () => {
      const date = new Date('2024-01-01');
      const result = dcDate.add(date, 1, 'years');
      expect(result.getFullYear()).toBe(2025);
    });

    test('添加月', () => {
      const date = new Date('2024-01-01');
      const result = dcDate.add(date, 1, 'months');
      expect(result.getMonth()).toBe(1);
    });

    test('添加天', () => {
      const date = new Date('2024-01-01');
      const result = dcDate.add(date, 1, 'days');
      expect(result.getDate()).toBe(2);
    });

    test('添加小时', () => {
      const date = new Date('2024-01-01 12:00:00');
      const result = dcDate.add(date, 1, 'hours');
      expect(result.getHours()).toBe(13);
    });

    test('添加分钟', () => {
      const date = new Date('2024-01-01 12:00:00');
      const result = dcDate.add(date, 30, 'minutes');
      expect(result.getMinutes()).toBe(30);
    });

    test('添加秒', () => {
      const date = new Date('2024-01-01 12:00:00');
      const result = dcDate.add(date, 30, 'seconds');
      expect(result.getSeconds()).toBe(30);
    });

    test('无效日期', () => {
      const result = dcDate.add(null, 1, 'days');
      expect(result).toBeNull();
    });
  });

  describe('diff', () => {
    test('计算天数差异', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-05');
      const result = dcDate.diff(date1, date2, 'days');
      expect(result).toBe(4);
    });

    test('计算小时差异', () => {
      const date1 = new Date('2024-01-01 12:00:00');
      const date2 = new Date('2024-01-01 14:00:00');
      const result = dcDate.diff(date1, date2, 'hours');
      expect(result).toBe(2);
    });

    test('计算分钟差异', () => {
      const date1 = new Date('2024-01-01 12:00:00');
      const date2 = new Date('2024-01-01 12:30:00');
      const result = dcDate.diff(date1, date2, 'minutes');
      expect(result).toBe(30);
    });

    test('计算秒差异', () => {
      const date1 = new Date('2024-01-01 12:00:00');
      const date2 = new Date('2024-01-01 12:00:30');
      const result = dcDate.diff(date1, date2, 'seconds');
      expect(result).toBe(30);
    });

    test('无效日期参数', () => {
      const result = dcDate.diff('invalid', new Date(), 'days');
      expect(result).toBe(0);
    });

    test('无效单位参数', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-05');
      console.warn = jest.fn();
      const result = dcDate.diff(date1, date2, 'invalid');
      expect(result).toBe(4);
      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe('isLeapYear', () => {
    test('闰年', () => {
      const result = dcDate.isLeapYear(2024);
      expect(result).toBe(true);
    });

    test('非闰年', () => {
      const result = dcDate.isLeapYear(2023);
      expect(result).toBe(false);
    });
  });

  describe('getDaysInMonth', () => {
    test('获取月份的天数', () => {
      const result = dcDate.getDaysInMonth(2024, 2); // 2024年2月
      expect(result).toBe(29);
    });

    test('获取31天的月份', () => {
      const result = dcDate.getDaysInMonth(2024, 1); // 2024年1月
      expect(result).toBe(31);
    });

    test('获取30天的月份', () => {
      const result = dcDate.getDaysInMonth(2024, 4); // 2024年4月
      expect(result).toBe(30);
    });
  });

  describe('getWeekOfYear', () => {
    test('获取一年中的第几周', () => {
      const date = new Date('2024-01-01');
      const result = dcDate.getWeekOfYear(date);
      expect(typeof result).toBe('number');
    });

    test('无效日期', () => {
      const result = dcDate.getWeekOfYear('invalid');
      expect(result).toBeNull();
    });
  });

  describe('getDatesBetween', () => {
    test('获取两个日期之间的所有日期', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-03');
      const result = dcDate.getDatesBetween(startDate, endDate);
      expect(result).toHaveLength(3);
      result.forEach(date => {
        expect(date).toBeInstanceOf(Date);
      });
    });

    test('无效日期', () => {
      const result = dcDate.getDatesBetween('invalid', new Date());
      expect(result).toEqual([]);
    });
  });

  describe('getQuarter', () => {
    test('获取日期的季度', () => {
      const date = new Date('2024-01-01');
      const result = dcDate.getQuarter(date);
      expect(result).toBe(1);
    });

    test('第二季度', () => {
      const date = new Date('2024-04-01');
      const result = dcDate.getQuarter(date);
      expect(result).toBe(2);
    });

    test('第三季度', () => {
      const date = new Date('2024-07-01');
      const result = dcDate.getQuarter(date);
      expect(result).toBe(3);
    });

    test('第四季度', () => {
      const date = new Date('2024-10-01');
      const result = dcDate.getQuarter(date);
      expect(result).toBe(4);
    });

    test('无效日期', () => {
      const result = dcDate.getQuarter('invalid');
      expect(result).toBeNull();
    });
  });

  describe('createDatePicker', () => {
    test('创建日期时间选择器', () => {
      const container = {
        appendChild: jest.fn()
      };
      const result = dcDate.createDatePicker(container);
      expect(result).toHaveProperty('getValue');
      expect(result).toHaveProperty('setValue');
      expect(result).toHaveProperty('destroy');
    });
  });
});
