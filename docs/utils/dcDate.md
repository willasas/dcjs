# dcDate 工具类

## 1. 简介

dcDate 是 DCJS 项目中的日期工具类，提供了丰富的日期处理、格式化、解析和计算功能，旨在简化前端开发中的日期相关操作。

## 2. 功能特性

- 日期格式化与解析
- 相对时间计算
- 日期范围生成
- 日期算术运算
- 日期差异计算
- 闰年检测
- 月份天数计算
- 周数计算
- 季度计算
- 日期选择器创建

## 3. 安装与使用

### 3.1 浏览器直接引入
```html
<script src="path/to/dcDate.js"></script>
<script>
  // 使用示例
  const formattedDate = dcDate.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  console.log(formattedDate);
</script>
```

### 3.2 模块化引入
```javascript
import * as dcDate from 'path/to/dcDate.js';

// 使用示例
const formattedDate = dcDate.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
console.log(formattedDate);
```

## 4. API 参考

### 4.1 核心方法

#### format(date, format)
格式化日期为指定格式的字符串。

**参数：**
- `date`：Date 对象、时间戳或日期字符串
- `format`：格式化字符串，支持的占位符：
  - `YYYY`：年份（4位）
  - `MM`：月份（2位）
  - `DD`：日期（2位）
  - `HH`：小时（24小时制，2位）
  - `mm`：分钟（2位）
  - `ss`：秒（2位）
  - `ms`：毫秒（3位）

**返回值：**
- 格式化后的日期字符串

**示例：**
```javascript
const date = new Date('2024-01-01 12:00:00');
const result = dcDate.format(date, 'YYYY年MM月DD日 HH:mm:ss');
// 结果: "2024年01月01日 12:00:00"
```

#### parseDate(date)
解析各种格式的日期为 Date 对象。

**参数：**
- `date`：Date 对象、时间戳或日期字符串（支持多种格式）

**返回值：**
- 解析成功返回 Date 对象，失败返回 null

**示例：**
```javascript
const result1 = dcDate.parseDate('2024-01-01');
const result2 = dcDate.parseDate('2024年01月01日');
const result3 = dcDate.parseDate(1704067200000); // 时间戳
```

#### getRelativeTime(date)
获取相对时间描述（如：3分钟前、2小时后等）。

**参数：**
- `date`：Date 对象、时间戳或日期字符串

**返回值：**
- 相对时间描述字符串

**示例：**
```javascript
const date = new Date(Date.now() - 1000 * 60 * 5); // 5分钟前
const result = dcDate.getRelativeTime(date);
// 结果: "5分钟前"
```

#### getDateRange(rangeType)
获取指定类型的日期范围。

**参数：**
- `rangeType`：范围类型，支持的值：
  - `today`：今天
  - `thisweek`：本周
  - `thismonth`：本月
  - `thisyear`：本年

**返回值：**
- 包含开始和结束日期的数组 [startDate, endDate]

**示例：**
```javascript
const [start, end] = dcDate.getDateRange('today');
console.log('开始:', dcDate.format(start, 'YYYY-MM-DD HH:mm:ss'));
console.log('结束:', dcDate.format(end, 'YYYY-MM-DD HH:mm:ss'));
```

#### add(date, amount, unit)
日期算术运算，在指定日期上添加或减去时间。

**参数：**
- `date`：Date 对象、时间戳或日期字符串
- `amount`：数量（正数为加，负数为减）
- `unit`：单位，支持的值：
  - `years`：年
  - `months`：月
  - `days`：日
  - `hours`：时
  - `minutes`：分
  - `seconds`：秒

**返回值：**
- 计算后的 Date 对象

**示例：**
```javascript
const date = new Date('2024-01-01');
const result = dcDate.add(date, 1, 'years');
// 结果: 2025年1月1日
```

#### diff(date1, date2, unit)
计算两个日期之间的差异。

**参数：**
- `date1`：起始日期
- `date2`：结束日期
- `unit`：单位，支持的值：
  - `days`：日
  - `hours`：时
  - `minutes`：分
  - `seconds`：秒

**返回值：**
- 两个日期之间的差异值（正数）

**示例：**
```javascript
const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-05');
const result = dcDate.diff(date1, date2, 'days');
// 结果: 4
```

#### isLeapYear(year)
检测是否为闰年。

**参数：**
- `year`：年份

**返回值：**
- 布尔值，表示是否为闰年

**示例：**
```javascript
const result1 = dcDate.isLeapYear(2024); // true
const result2 = dcDate.isLeapYear(2023); // false
```

#### getDaysInMonth(year, month)
获取指定月份的天数。

**参数：**
- `year`：年份
- `month`：月份（1-12）

**返回值：**
- 该月份的天数

**示例：**
```javascript
const result = dcDate.getDaysInMonth(2024, 2); // 2024年2月
// 结果: 29
```

#### getWeekOfYear(date)
获取日期在当年的周数。

**参数：**
- `date`：Date 对象、时间戳或日期字符串

**返回值：**
- 周数（1-53）

**示例：**
```javascript
const date = new Date('2024-01-01');
const result = dcDate.getWeekOfYear(date);
// 结果: 1
```

#### getDatesBetween(startDate, endDate)
获取两个日期之间的所有日期。

**参数：**
- `startDate`：开始日期
- `endDate`：结束日期

**返回值：**
- 包含所有日期的数组

**示例：**
```javascript
const start = new Date('2024-01-01');
const end = new Date('2024-01-03');
const result = dcDate.getDatesBetween(start, end);
// 结果: [Date('2024-01-01'), Date('2024-01-02'), Date('2024-01-03')]
```

#### getQuarter(date)
获取日期所在的季度。

**参数：**
- `date`：Date 对象、时间戳或日期字符串

**返回值：**
- 季度（1-4）

**示例：**
```javascript
const date = new Date('2024-04-01');
const result = dcDate.getQuarter(date);
// 结果: 2
```

#### createDatePicker(container, options)
创建日期选择器。

**参数：**
- `container`：容器元素
- `options`：配置选项（可选）

**返回值：**
- 日期选择器实例，包含以下方法：
  - `getValue()`：获取选中的日期
  - `setValue(date)`：设置日期
  - `destroy()`：销毁日期选择器

**示例：**
```javascript
const container = document.getElementById('datePickerContainer');
const datePicker = dcDate.createDatePicker(container);

// 获取值
const value = datePicker.getValue();

// 设置值
datePicker.setValue(new Date());

// 销毁
datePicker.destroy();
```

## 5. 示例代码

### 5.1 日期格式化
```javascript
// 基本格式化
const date = new Date('2024-01-01 12:00:00');
const formatted = dcDate.format(date, 'YYYY-MM-DD HH:mm:ss');
console.log(formatted); // 输出: 2024-01-01 12:00:00

// 自定义格式
const customFormatted = dcDate.format(date, 'YYYY年MM月DD日');
console.log(customFormatted); // 输出: 2024年01月01日
```

### 5.2 相对时间计算
```javascript
// 过去时间
const pastDate = new Date(Date.now() - 1000 * 60 * 30); // 30分钟前
console.log(dcDate.getRelativeTime(pastDate)); // 输出: 30分钟前

// 未来时间
const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2小时后
console.log(dcDate.getRelativeTime(futureDate)); // 输出: 2小时后
```

### 5.3 日期范围生成
```javascript
// 获取本周的日期范围
const [weekStart, weekEnd] = dcDate.getDateRange('thisweek');
console.log('本周开始:', dcDate.format(weekStart, 'YYYY-MM-DD'));
console.log('本周结束:', dcDate.format(weekEnd, 'YYYY-MM-DD'));

// 获取本月的日期范围
const [monthStart, monthEnd] = dcDate.getDateRange('thismonth');
console.log('本月开始:', dcDate.format(monthStart, 'YYYY-MM-DD'));
console.log('本月结束:', dcDate.format(monthEnd, 'YYYY-MM-DD'));
```

### 5.4 日期算术运算
```javascript
const date = new Date('2024-01-01');

// 添加1年
const nextYear = dcDate.add(date, 1, 'years');
console.log('明年:', dcDate.format(nextYear, 'YYYY-MM-DD'));

// 添加3个月
const nextMonth = dcDate.add(date, 3, 'months');
console.log('3个月后:', dcDate.format(nextMonth, 'YYYY-MM-DD'));

// 减去7天
const lastWeek = dcDate.add(date, -7, 'days');
console.log('上周:', dcDate.format(lastWeek, 'YYYY-MM-DD'));
```

### 5.5 日期差异计算
```javascript
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-01-10');

// 计算天数差异
const daysDiff = dcDate.diff(startDate, endDate, 'days');
console.log('天数差异:', daysDiff); // 输出: 9

// 计算小时差异
const hoursDiff = dcDate.diff(startDate, endDate, 'hours');
console.log('小时差异:', hoursDiff); // 输出: 216
```

## 6. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ 支持 |
| Firefox | ✅ 支持 |
| Safari | ✅ 支持 |
| Edge | ✅ 支持 |
| IE 11 | ⚠️ 部分支持（需要 polyfill） |

## 7. 注意事项

1. **时区问题**：默认使用本地时区进行计算，如需使用 UTC 时区，请自行调整。
2. **性能优化**：对于大量日期计算，建议缓存计算结果。
3. **日期选择器**：createDatePicker 方法依赖 DOM 环境，在非浏览器环境中不可用。

## 8. 测试用例

测试文件路径：`test/utils/dcDate/dcDate.test.js`

测试内容包括：
- 日期格式化测试
- 日期解析测试
- 相对时间计算测试
- 日期范围生成测试
- 日期算术运算测试
- 日期差异计算测试
- 闰年检测测试
- 月份天数计算测试
- 周数计算测试
- 日期范围生成测试
- 季度计算测试
- 日期选择器创建测试

## 9. 版本历史

### v1.0.0
- 初始版本，实现了核心日期处理功能

### v1.0.1
- 修复了日期解析中中文日期格式的问题
- 优化了相对时间计算的精度

### v1.1.0
- 添加了 createDatePicker 方法
- 增强了日期格式化的灵活性

## 10. 贡献与反馈

如有问题或建议，欢迎提交 Issue 或 Pull Request。

## 11. 相关链接

- [DCJS 项目主页](https://github.com/dcjs/dcjs)
- [示例代码](https://github.com/dcjs/dcjs/tree/master/examples/utils/dcDate)
- [测试用例](https://github.com/dcjs/dcjs/tree/master/test/utils/dcDate)