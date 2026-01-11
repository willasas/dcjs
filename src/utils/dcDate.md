# dcDate 工具类

## 概述
`dcDate` 是一个轻量级的日期处理工具库，提供了一系列实用的日期格式化、解析和计算方法，帮助开发者更方便地处理JavaScript中的日期操作。

## 功能特性
- **灵活格式化**: `format` 方法支持多种日期格式模式
- **智能解析**: `parse` 方法可以解析标准和自定义格式的日期字符串
- **日期计算**: 提供 `addDays`、`addMonths`、`addYears` 等方法进行日期运算
- **边界处理**: 正确处理闰年、月份天数变化等边界情况
- **简单易用**: API简洁直观，无需复杂配置

## 引入方式

### 方式1: 通过script标签引入
```html
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { dcDate } from './src/utils/dcDate.js';
```

## API文档

### format(date, pattern)
将日期对象格式化为指定格式的字符串。

**参数**:
- `date` (Date | null): 要格式化的日期对象，可以为null
- `pattern` (string): 格式模式字符串

**返回值**:
- (string): 格式化后的字符串，如果输入无效则返回空字符串

**格式模式说明**:
- `yyyy`: 四位年份
- `MM`: 两位月份（01-12）
- `dd`: 两位日期（01-31）
- `HH`: 两位小时（00-23）
- `mm`: 两位分钟（00-59）
- `ss`: 两位秒钟（00-59）

**示例**:
```javascript
const now = new Date();

// 标准格式
const format1 = dcDate.format(now, 'yyyy-MM-dd HH:mm:ss');
// 结果: "2023-12-25 10:30:45"

// 中文格式
const format2 = dcDate.format(now, 'yyyy年MM月dd日 HH时mm分ss秒');
// 结果: "2023年12月25日 10时30分45秒"

// 自定义格式
const format3 = dcDate.format(now, 'yyyyMMdd-HHmmss');
// 结果: "20231225-103045"
```

### parse(dateString, pattern)
将日期字符串解析为日期对象。

**参数**:
- `dateString` (string): 要解析的日期字符串
- `pattern` (string, 可选): 解析格式模式，如果不提供则尝试自动识别

**返回值**:
- (Date | null): 解析成功的日期对象，如果解析失败则返回null或无效Date对象

**示例**:
```javascript
// 解析标准格式
const date1 = dcDate.parse('2023-12-25 10:30:45', 'yyyy-MM-dd HH:mm:ss');
console.log(date1); // Date对象

// 解析中文格式
const date2 = dcDate.parse('2023年12月25日 10时30分45秒', 'yyyy年MM月dd日 HH时mm分ss秒');
console.log(date2); // Date对象

// 自动解析ISO格式
const date3 = dcDate.parse('2023-12-25T10:30:45.000Z');
console.log(date3); // Date对象
```

### addDays(date, days)
给日期添加指定天数。

**参数**:
- `date` (Date): 基准日期
- `days` (number): 要添加的天数（可为负数）

**返回值**:
- (Date): 新的日期对象，原日期不变

**示例**:
```javascript
const today = new Date('2023-12-25');
const nextWeek = dcDate.addDays(today, 7);
console.log(nextWeek); // 2024-01-01
```

### addMonths(date, months)
给日期添加指定月数。

**参数**:
- `date` (Date): 基准日期
- `months` (number): 要添加的月数（可为负数）

**返回值**:
- (Date): 新的日期对象，原日期不变

**示例**:
```javascript
const today = new Date('2023-12-25');
const nextYearSameMonth = dcDate.addMonths(today, 12);
console.log(nextYearSameMonth); // 2024-12-25
```

### addYears(date, years)
给日期添加指定年数。

**参数**:
- `date` (Date): 基准日期
- `years` (number): 要添加的年数（可为负数）

**返回值**:
- (Date): 新的日期对象，原日期不变

**示例**:
```javascript
const today = new Date('2023-12-25');
const inFiveYears = dcDate.addYears(today, 5);
console.log(inFiveYears); // 2028-12-25
```

## 使用示例

### 基础使用
```javascript
// 获取当前时间并格式化
const now = new Date();
const formatted = dcDate.format(now, 'yyyy-MM-dd HH:mm:ss');
console.log(formatted); // "2023-12-25 10:30:45"

// 解析日期字符串
const dateString = '2023-12-25 10:30:45';
const parsed = dcDate.parse(dateString, 'yyyy-MM-dd HH:mm:ss');
if (parsed) {
    console.log(parsed); // Date对象
}

// 日期计算
const today = new Date();
const tomorrow = dcDate.addDays(today, 1);
const nextMonth = dcDate.addMonths(today, 1);
const nextYear = dcDate.addYears(today, 1);

console.log('明天:', dcDate.format(tomorrow, 'yyyy-MM-dd'));
console.log('下个月:', dcDate.format(nextMonth, 'yyyy-MM-dd'));
console.log('明年:', dcDate.format(nextYear, 'yyyy-MM-dd'));
```

### 处理用户输入
```javascript
// 假设用户输入了日期
const userInput = document.getElementById('dateInput').value; // 如: "2023年12月25日"

// 解析用户输入
const date = dcDate.parse(userInput, 'yyyy年MM月dd日');
if (date) {
    // 成功解析，进行后续处理
    const formatted = dcDate.format(date, 'yyyy-MM-dd');
    console.log('存储格式:', formatted);
} else {
    console.error('日期格式不正确，请检查输入');
}
```

### 计算业务日期
```javascript
// 计算账单到期日（30天后）
function calculateDueDate(issueDate) {
    return dcDate.addDays(issueDate, 30);
}

// 计算会员有效期（1年后）
function calculateMembershipExpiry(startDate) {
    return dcDate.addYears(startDate, 1);
}

// 示例
const issueDate = new Date('2023-12-01');
const dueDate = calculateDueDate(issueDate);
const expiryDate = calculateMembershipExpiry(issueDate);

console.log('账单到期日:', dcDate.format(dueDate, 'yyyy年MM月dd日'));
console.log('会员有效期至:', dcDate.format(expiryDate, 'yyyy年MM月dd日'));
```

## 注意事项
- `format` 方法会返回空字符串而不是抛出异常来处理无效输入
- `parse` 方法在解析失败时返回无效的Date对象，请使用 `isNaN(date.getTime())` 进行验证
- 日期计算方法会正确处理月份天数变化和闰年等边界情况
- 所有日期计算方法都返回新的Date对象，不会修改原始对象
- 在处理时区敏感的应用时，需要特别注意本地时间和UTC时间的区别

## 常见问题

**Q: dcDate支持哪些浏览器？**
A: dcDate基于标准的JavaScript Date对象，支持所有现代浏览器（Chrome、Firefox、Safari、Edge等）以及IE9及以上版本。

**Q: 如何处理时区问题？**
A: dcDate主要基于浏览器的本地时间进行操作。对于需要精确时区控制的场景，建议先将日期转换为UTC时间再进行操作，或者使用专门的时区处理库。

**Q: 为什么解析某些日期字符串会失败？**
A: 请确保：
1. 日期字符串格式与提供的模式匹配
2. 日期本身是有效的（如不存在2月30日）
3. 字符串中没有多余的空格或特殊字符

**Q: 日期计算会不会有精度误差？**
A: 不会。dcDate的日期计算基于正确的算法，会考虑每个月的实际天数、闰年等因素，确保计算结果准确。

**Q: 可以同时添加天数、月份和年数吗？**
A: 可以，但建议按顺序调用不同的方法，因为一次性添加可能会导致意外的结果。例如：
```javascript
let result = date;
result = dcDate.addYears(result, 1);
result = dcDate.addMonths(result, 6);
result = dcDate.addDays(result, 15);
```