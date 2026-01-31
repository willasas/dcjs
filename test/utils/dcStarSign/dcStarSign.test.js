const dcStarSign = require('../../../src/utils/dcStarSign');

describe('dcStarSign', () => {
  let starSign;
  
  beforeEach(() => {
    starSign = new dcStarSign();
  });
  
  describe('构造函数', () => {
    test('应该初始化星次数据', () => {
      expect(starSign.starSigns).toBeDefined();
      expect(Array.isArray(starSign.starSigns)).toBe(true);
      expect(starSign.starSigns.length).toBe(12);
      
      // 检查第一个星次数据
      expect(starSign.starSigns[0]).toEqual({
        name: '星纪',
        startMonth: 12,
        startDay: 8,
        endMonth: 1,
        endDay: 5
      });
      
      // 检查最后一个星次数据
      expect(starSign.starSigns[11]).toEqual({
        name: '析木',
        startMonth: 11,
        startDay: 13,
        endMonth: 12,
        endDay: 7
      });
    });
  });
  
  describe('getStarSignByDate', () => {
    test('应该根据Date对象返回正确的星次', () => {
      // 测试星纪 (12月8日 - 1月5日)
      expect(starSign.getStarSignByDate(new Date(2000, 11, 25))).toBe('您的星次为星纪'); // 2000年12月25日
      expect(starSign.getStarSignByDate(new Date(2001, 0, 1))).toBe('您的星次为星纪'); // 2001年1月1日
      
      // 测试玄枵 (1月6日 - 2月8日)
      expect(starSign.getStarSignByDate(new Date(2001, 0, 15))).toBe('您的星次为玄枵'); // 2001年1月15日
      
      // 测试娵訾 (2月9日 - 3月5日)
      expect(starSign.getStarSignByDate(new Date(2001, 1, 15))).toBe('您的星次为娵訾'); // 2001年2月15日
      
      // 测试降娄 (3月6日 - 4月4日)
      expect(starSign.getStarSignByDate(new Date(2001, 2, 15))).toBe('您的星次为降娄'); // 2001年3月15日
      
      // 测试大梁 (4月5日 - 5月5日)
      expect(starSign.getStarSignByDate(new Date(2001, 3, 15))).toBe('您的星次为大梁'); // 2001年4月15日
      
      // 测试实沈 (5月6日 - 6月5日)
      expect(starSign.getStarSignByDate(new Date(2001, 4, 15))).toBe('您的星次为实沈'); // 2001年5月15日
      
      // 测试鹑首 (6月6日 - 7月6日)
      expect(starSign.getStarSignByDate(new Date(2001, 5, 15))).toBe('您的星次为鹑首'); // 2001年6月15日
      
      // 测试鹑火 (7月7日 - 8月7日)
      expect(starSign.getStarSignByDate(new Date(2001, 6, 15))).toBe('您的星次为鹑火'); // 2001年7月15日
      
      // 测试鹑尾 (8月8日 - 9月7日)
      expect(starSign.getStarSignByDate(new Date(2001, 7, 15))).toBe('您的星次为鹑尾'); // 2001年8月15日
      
      // 测试寿星 (9月8日 - 10月7日)
      expect(starSign.getStarSignByDate(new Date(2001, 8, 15))).toBe('您的星次为寿星'); // 2001年9月15日
      
      // 测试大火 (10月8日 - 11月12日)
      expect(starSign.getStarSignByDate(new Date(2001, 9, 15))).toBe('您的星次为大火'); // 2001年10月15日
      
      // 测试析木 (11月13日 - 12月7日)
      expect(starSign.getStarSignByDate(new Date(2001, 10, 20))).toBe('您的星次为析木'); // 2001年11月20日
    });
    
    test('应该根据YYYY-MM-DD格式返回正确的星次', () => {
      expect(starSign.getStarSignByDate('2000-12-25')).toBe('您的星次为星纪');
      expect(starSign.getStarSignByDate('2001-01-15')).toBe('您的星次为玄枵');
      expect(starSign.getStarSignByDate('2001-06-15')).toBe('您的星次为鹑首');
      expect(starSign.getStarSignByDate('2001-11-20')).toBe('您的星次为析木');
    });
    
    test('应该根据YYYY/MM/DD格式返回正确的星次', () => {
      expect(starSign.getStarSignByDate('2000/12/25')).toBe('您的星次为星纪');
      expect(starSign.getStarSignByDate('2001/01/15')).toBe('您的星次为玄枵');
    });
    
    test('应该根据YYYY.MM.DD格式返回正确的星次', () => {
      expect(starSign.getStarSignByDate('2000.12.25')).toBe('您的星次为星纪');
      expect(starSign.getStarSignByDate('2001.01.15')).toBe('您的星次为玄枵');
    });
    
    test('应该根据YYYY年MM月DD日格式返回正确的星次', () => {
      expect(starSign.getStarSignByDate('2000年12月25日')).toBe('您的星次为星纪');
      expect(starSign.getStarSignByDate('2001年01月15日')).toBe('您的星次为玄枵');
    });
    
    test('应该处理无效日期', () => {
      expect(starSign.getStarSignByDate('invalid-date')).toBe('日期格式不正确');
      expect(starSign.getStarSignByDate(null)).toBe('日期格式不正确');
      expect(starSign.getStarSignByDate(undefined)).toBe('日期格式不正确');
      expect(starSign.getStarSignByDate({})).toBe('日期格式不正确');
    });
    
    test('应该处理边界日期', () => {
      // 星纪边界
      expect(starSign.getStarSignByDate('2000-12-08')).toBe('您的星次为星纪'); // 开始边界
      expect(starSign.getStarSignByDate('2001-01-05')).toBe('您的星次为星纪'); // 结束边界
      
      // 玄枵边界
      expect(starSign.getStarSignByDate('2001-01-06')).toBe('您的星次为玄枵'); // 开始边界
      expect(starSign.getStarSignByDate('2001-02-08')).toBe('您的星次为玄枵'); // 结束边界
      
      // 析木边界
      expect(starSign.getStarSignByDate('2001-11-13')).toBe('您的星次为析木'); // 开始边界
      expect(starSign.getStarSignByDate('2001-12-07')).toBe('您的星次为析木'); // 结束边界
    });
  });
  
  describe('getAllStarSigns', () => {
    test('应该返回所有星次信息', () => {
      const allStarSigns = starSign.getAllStarSigns();
      
      expect(Array.isArray(allStarSigns)).toBe(true);
      expect(allStarSigns.length).toBe(12);
      
      // 检查星次名称列表
      const starSignNames = allStarSigns.map(sign => sign.name);
      expect(starSignNames).toEqual([
        '星纪', '玄枵', '娵訾', '降娄', '大梁', '实沈',
        '鹑首', '鹑火', '鹑尾', '寿星', '大火', '析木'
      ]);
      
      // 检查每个星次对象的结构
      allStarSigns.forEach(sign => {
        expect(sign).toHaveProperty('name');
        expect(sign).toHaveProperty('startMonth');
        expect(sign).toHaveProperty('startDay');
        expect(sign).toHaveProperty('endMonth');
        expect(sign).toHaveProperty('endDay');
        
        expect(typeof sign.name).toBe('string');
        expect(typeof sign.startMonth).toBe('number');
        expect(typeof sign.startDay).toBe('number');
        expect(typeof sign.endMonth).toBe('number');
        expect(typeof sign.endDay).toBe('number');
      });
    });
  });
  
  describe('getStarSignInfo', () => {
    test('应该返回指定星次的信息', () => {
      const xingjiInfo = starSign.getStarSignInfo('星纪');
      expect(xingjiInfo).toEqual({
        name: '星纪',
        startMonth: 12,
        startDay: 8,
        endMonth: 1,
        endDay: 5
      });
      
      const xuanxiaoInfo = starSign.getStarSignInfo('玄枵');
      expect(xuanxiaoInfo).toEqual({
        name: '玄枵',
        startMonth: 1,
        startDay: 6,
        endMonth: 2,
        endDay: 8
      });
      
      const ximuInfo = starSign.getStarSignInfo('析木');
      expect(ximuInfo).toEqual({
        name: '析木',
        startMonth: 11,
        startDay: 13,
        endMonth: 12,
        endDay: 7
      });
    });
    
    test('应该返回不存在星次的null', () => {
      expect(starSign.getStarSignInfo('不存在的星次')).toBeNull();
      expect(starSign.getStarSignInfo('')).toBeNull();
      expect(starSign.getStarSignInfo(null)).toBeNull();
      expect(starSign.getStarSignInfo(undefined)).toBeNull();
    });
  });
  
  describe('isDateInRange', () => {
    test('应该正确判断日期是否在星纪范围内', () => {
      const xingji = starSign.getStarSignInfo('星纪');
      
      // 在范围内的日期
      expect(starSign.isDateInRange(new Date(2000, 11, 15), xingji)).toBe(true); // 12月15日
      expect(starSign.isDateInRange(new Date(2001, 0, 1), xingji)).toBe(true); // 1月1日
      
      // 边界日期
      expect(starSign.isDateInRange(new Date(2000, 11, 8), xingji)).toBe(true); // 开始边界
      expect(starSign.isDateInRange(new Date(2001, 0, 5), xingji)).toBe(true); // 结束边界
      
      // 不在范围内的日期
      expect(starSign.isDateInRange(new Date(2000, 11, 7), xingji)).toBe(false); // 12月7日
      expect(starSign.isDateInRange(new Date(2001, 0, 6), xingji)).toBe(false); // 1月6日
    });
    
    test('应该正确判断日期是否在玄枵范围内', () => {
      const xuanxiao = starSign.getStarSignInfo('玄枵');
      
      // 在范围内的日期
      expect(starSign.isDateInRange(new Date(2001, 0, 15), xuanxiao)).toBe(true); // 1月15日
      expect(starSign.isDateInRange(new Date(2001, 1, 1), xuanxiao)).toBe(true); // 2月1日
      
      // 边界日期
      expect(starSign.isDateInRange(new Date(2001, 0, 6), xuanxiao)).toBe(true); // 开始边界
      expect(starSign.isDateInRange(new Date(2001, 1, 8), xuanxiao)).toBe(true); // 结束边界
      
      // 不在范围内的日期
      expect(starSign.isDateInRange(new Date(2001, 0, 5), xuanxiao)).toBe(false); // 1月5日
      expect(starSign.isDateInRange(new Date(2001, 1, 9), xuanxiao)).toBe(false); // 2月9日
    });
    
    test('应该正确判断日期是否在析木范围内', () => {
      const ximu = starSign.getStarSignInfo('析木');
      
      // 在范围内的日期
      expect(starSign.isDateInRange(new Date(2001, 10, 20), ximu)).toBe(true); // 11月20日
      expect(starSign.isDateInRange(new Date(2001, 11, 1), ximu)).toBe(true); // 12月1日
      
      // 边界日期
      expect(starSign.isDateInRange(new Date(2001, 10, 13), ximu)).toBe(true); // 开始边界
      expect(starSign.isDateInRange(new Date(2001, 11, 7), ximu)).toBe(true); // 结束边界
      
      // 不在范围内的日期
      expect(starSign.isDateInRange(new Date(2001, 10, 12), ximu)).toBe(false); // 11月12日
      expect(starSign.isDateInRange(new Date(2001, 11, 8), ximu)).toBe(false); // 12月8日
    });
  });
  
  describe('parseDate', () => {
    test('应该返回Date对象', () => {
      const dateObj = new Date(2000, 11, 25);
      expect(starSign.parseDate(dateObj)).toBe(dateObj);
    });
    
    test('应该解析YYYY-MM-DD格式', () => {
      const date = starSign.parseDate('2000-12-25');
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(11); // 月份从0开始
      expect(date.getDate()).toBe(25);
    });
    
    test('应该解析YYYY/MM/DD格式', () => {
      const date = starSign.parseDate('2000/12/25');
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(25);
    });
    
    test('应该解析YYYY.MM.DD格式', () => {
      const date = starSign.parseDate('2000.12.25');
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(25);
    });
    
    test('应该解析YYYY年MM月DD日格式', () => {
      const date = starSign.parseDate('2000年12月25日');
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(25);
    });
    
    test('应该尝试直接解析其他格式', () => {
      const date = starSign.parseDate('December 25, 2000');
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2000);
      expect(date.getMonth()).toBe(11);
      expect(date.getDate()).toBe(25);
    });
    
    test('应该返回无效日期的null', () => {
      expect(starSign.parseDate('invalid-date')).toBeNull();
      expect(starSign.parseDate('')).toBeNull();
      expect(starSign.parseDate(null)).toBeNull();
      expect(starSign.parseDate(undefined)).toBeNull();
      expect(starSign.parseDate({})).toBeNull();
      expect(starSign.parseDate(123)).toBeNull();
    });
    
    test('应该处理单数月份和日期', () => {
      // 单数月份和日期
      const date1 = starSign.parseDate('2000-1-5');
      expect(date1).toBeInstanceOf(Date);
      expect(date1.getFullYear()).toBe(2000);
      expect(date1.getMonth()).toBe(0); // 1月
      expect(date1.getDate()).toBe(5);
      
      // 单数月份，双数日期
      const date2 = starSign.parseDate('2000-1-15');
      expect(date2).toBeInstanceOf(Date);
      expect(date2.getFullYear()).toBe(2000);
      expect(date2.getMonth()).toBe(0);
      expect(date2.getDate()).toBe(15);
      
      // 双数月份，单数日期
      const date3 = starSign.parseDate('2000-12-5');
      expect(date3).toBeInstanceOf(Date);
      expect(date3.getFullYear()).toBe(2000);
      expect(date3.getMonth()).toBe(11);
      expect(date3.getDate()).toBe(5);
    });
  });
  
  describe('星次数据完整性', () => {
    test('应该包含所有十二星次', () => {
      const starSignNames = starSign.getAllStarSigns().map(sign => sign.name);
      const expectedNames = [
        '星纪', '玄枵', '娵訾', '降娄', '大梁', '实沈',
        '鹑首', '鹑火', '鹑尾', '寿星', '大火', '析木'
      ];
      
      expect(starSignNames).toEqual(expectedNames);
    });
    
    test('每个星次应该有完整的日期范围数据', () => {
      starSign.getAllStarSigns().forEach(sign => {
        expect(sign.startMonth).toBeGreaterThan(0);
        expect(sign.startMonth).toBeLessThanOrEqual(12);
        expect(sign.startDay).toBeGreaterThan(0);
        expect(sign.startDay).toBeLessThanOrEqual(31);
        expect(sign.endMonth).toBeGreaterThan(0);
        expect(sign.endMonth).toBeLessThanOrEqual(12);
        expect(sign.endDay).toBeGreaterThan(0);
        expect(sign.endDay).toBeLessThanOrEqual(31);
      });
    });
  });
  
  describe('边界情况测试', () => {
    test('应该处理闰年的2月29日', () => {
      // 测试闰年2月29日
      const result = starSign.getStarSignByDate('2000-02-29'); // 2000年是闰年
      expect(result).toBe('您的星次为娵訾');
    });
    
    test('应该处理非闰年的2月29日', () => {
      // 测试非闰年2月29日（应该被视为无效日期）
      const result = starSign.getStarSignByDate('2001-02-29'); // 2001年不是闰年
      expect(result).toBe('日期格式不正确');
    });
    
    test('应该处理跨年星次的边界', () => {
      // 测试星纪（跨年星次）的边界
      expect(starSign.getStarSignByDate('2000-12-07')).toBe('您的星次为析木'); // 星纪开始前一天
      expect(starSign.getStarSignByDate('2000-12-08')).toBe('您的星次为星纪'); // 星纪开始
      expect(starSign.getStarSignByDate('2001-01-05')).toBe('您的星次为星纪'); // 星纪结束
      expect(starSign.getStarSignByDate('2001-01-06')).toBe('您的星次为玄枵'); // 星纪结束后一天
    });
  });
  
  describe('性能测试', () => {
    test('批量查询性能', () => {
      const testDates = [
        '2000-01-01', '2000-02-01', '2000-03-01', '2000-04-01',
        '2000-05-01', '2000-06-01', '2000-07-01', '2000-08-01',
        '2000-09-01', '2000-10-01', '2000-11-01', '2000-12-01'
      ];
      
      const startTime = performance.now();
      
      testDates.forEach(date => {
        starSign.getStarSignByDate(date);
      });
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // 确保批量查询在合理时间内完成
      expect(duration).toBeLessThan(100); // 应该在100ms内完成
    });
  });
});
