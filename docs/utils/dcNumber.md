# dcNumber 数字处理工具类

`dcNumber` 是一个功能强大的数字处理工具类，提供了丰富的静态方法来处理各种数字相关的操作。

## 功能特性

- 数字格式化和美化
- 中文大写金额转换
- 数字精确计算
- 数字范围限制
- 随机数生成
- 文件大小转换
- 罗马数字转换
- 质数判断和阶乘计算
- 基本算术运算

## 安装

```javascript
// 浏览器环境直接使用
const dcNumber = DC.Number;

// Node.js 环境
const dcNumber = require('../src/utils/dcNumber.js');
```

## 核心方法

### format(num, decimals, decPoint, thousandsSep)
格式化数字，添加千分位分隔符和指定小数位数。

**参数：**
- `num` (number): 需要格式化的数字
- `decimals` (number): 小数位数，默认 2
- `decPoint` (string): 小数点符号，默认 '.'
- `thousandsSep` (string): 千分位分隔符，默认 ','

**返回值：**
- `string`: 格式化后的数字字符串

**使用示例：**
```javascript
// 格式化数字
const formatted = DC.Number.format(12345.6789);
console.log(formatted); // 输出: "12,345.68"

// 自定义小数位数和分隔符
const customFormatted = DC.Number.format(12345.6789, 3, ',', '.');
console.log(customFormatted); // 输出: "12.345,679"
```

### toChinese(num)
将数字转换为中文大写金额。

**参数：**
- `num` (number): 数字

**返回值：**
- `string`: 中文大写金额

**使用示例：**
```javascript
// 转换为中文大写金额
const chinese = DC.Number.toChinese(1234.56);
console.log(chinese); // 输出: "壹仟贰佰叁拾肆元伍角陆分"

// 处理整数
const chineseInt = DC.Number.toChinese(1234);
console.log(chineseInt); // 输出: "壹仟贰佰叁拾肆元整"
```

### calculate(num1, num2, operation)
数字精确计算，避免浮点数精度问题。

**参数：**
- `num1` (number): 第一个数
- `num2` (number): 第二个数
- `operation` (string): 运算类型（'add'|'subtract'|'multiply'|'divide'）

**返回值：**
- `number`: 计算结果

**使用示例：**
```javascript
// 加法
const sum = DC.Number.calculate(0.1, 0.2, 'add');
console.log(sum); // 输出: 0.3

// 减法
const difference = DC.Number.calculate(1, 0.1, 'subtract');
console.log(difference); // 输出: 0.9

// 乘法
const product = DC.Number.calculate(0.1, 0.2, 'multiply');
console.log(product); // 输出: 0.02

// 除法
const quotient = DC.Number.calculate(0.3, 0.1, 'divide');
console.log(quotient); // 输出: 3
```

### clamp(num, min, max)
限制数字在指定范围内。

**参数：**
- `num` (number): 数字
- `min` (number): 最小值
- `max` (number): 最大值

**返回值：**
- `number`: 限制后的数字

**使用示例：**
```javascript
// 限制数字范围
const clamped = DC.Number.clamp(15, 0, 10);
console.log(clamped); // 输出: 10

const clamped2 = DC.Number.clamp(5, 0, 10);
console.log(clamped2); // 输出: 5

const clamped3 = DC.Number.clamp(-5, 0, 10);
console.log(clamped3); // 输出: 0
```

### sqrt(num)
计算平方根。

**参数：**
- `num` (number): 要计算平方根的数字

**返回值：**
- `number`: 平方根

**使用示例：**
```javascript
// 计算平方根
const squareRoot = DC.Number.sqrt(9);
console.log(squareRoot); // 输出: 3

const squareRoot2 = DC.Number.sqrt(2);
console.log(squareRoot2); // 输出: 1.4142135623730951
```

### random(min, max, isInteger)
生成指定范围内的随机数。

**参数：**
- `min` (number): 最小值
- `max` (number): 最大值
- `isInteger` (boolean): 是否为整数，默认 false

**返回值：**
- `number`: 随机数

**使用示例：**
```javascript
// 生成随机小数
const randomFloat = DC.Number.random(0, 1);
console.log(randomFloat); // 输出: 0 到 1 之间的随机小数

// 生成随机整数
const randomInt = DC.Number.random(1, 10, true);
console.log(randomInt); // 输出: 1 到 10 之间的随机整数
```

### pad(num, length)
数字补零，将数字转换为指定长度的字符串，不足部分在前面补零。

**参数：**
- `num` (number): 数字
- `length` (number): 目标长度

**返回值：**
- `string`: 补零后的字符串

**使用示例：**
```javascript
// 数字补零
const padded = DC.Number.pad(5, 3);
console.log(padded); // 输出: "005"

const padded2 = DC.Number.pad(123, 5);
console.log(padded2); // 输出: "00123"
```

### isInteger(num)
判断是否为整数。

**参数：**
- `num` (number): 数字

**返回值：**
- `boolean`: 是否为整数

**使用示例：**
```javascript
// 判断是否为整数
console.log(DC.Number.isInteger(5)); // 输出: true
console.log(DC.Number.isInteger(5.5)); // 输出: false
console.log(DC.Number.isInteger(0)); // 输出: true
```

### percentage(num, total, decimals)
计算百分比。

**参数：**
- `num` (number): 数字
- `total` (number): 总数
- `decimals` (number): 小数位数，默认 2

**返回值：**
- `string`: 百分比字符串

**使用示例：**
```javascript
// 计算百分比
const percent = DC.Number.percentage(25, 100);
console.log(percent); // 输出: "25.00%"

const percent2 = DC.Number.percentage(3, 15, 1);
console.log(percent2); // 输出: "20.0%"
```

### toFileSize(bytes, decimals)
将字节数转换为可读的文件大小格式。

**参数：**
- `bytes` (number): 字节数
- `decimals` (number): 小数位数，默认 2

**返回值：**
- `string`: 文件大小字符串

**使用示例：**
```javascript
// 转换文件大小
console.log(DC.Number.toFileSize(1024)); // 输出: "1.00 KB"
console.log(DC.Number.toFileSize(1048576)); // 输出: "1.00 MB"
console.log(DC.Number.toFileSize(1073741824)); // 输出: "1.00 GB"
```

### round(num, decimals)
数字四舍五入到指定小数位数。

**参数：**
- `num` (number): 数字
- `decimals` (number): 小数位数

**返回值：**
- `number`: 四舍五入后的数字

**使用示例：**
```javascript
// 四舍五入
console.log(DC.Number.round(1.2345, 2)); // 输出: 1.23
console.log(DC.Number.round(1.235, 2)); // 输出: 1.24
console.log(DC.Number.round(1.2, 0)); // 输出: 1
```

### toRoman(num)
将数字转换为罗马数字（1-3999）。

**参数：**
- `num` (number): 数字（1-3999）

**返回值：**
- `string`: 罗马数字

**使用示例：**
```javascript
// 转换为罗马数字
console.log(DC.Number.toRoman(1)); // 输出: "I"
console.log(DC.Number.toRoman(5)); // 输出: "V"
console.log(DC.Number.toRoman(10)); // 输出: "X"
console.log(DC.Number.toRoman(50)); // 输出: "L"
console.log(DC.Number.toRoman(100)); // 输出: "C"
console.log(DC.Number.toRoman(500)); // 输出: "D"
console.log(DC.Number.toRoman(1000)); // 输出: "M"
console.log(DC.Number.toRoman(1994)); // 输出: "MCMXCIV"
```

### isPrime(num)
判断是否为质数。

**参数：**
- `num` (number): 数字

**返回值：**
- `boolean`: 是否为质数

**使用示例：**
```javascript
// 判断是否为质数
console.log(DC.Number.isPrime(2)); // 输出: true
console.log(DC.Number.isPrime(3)); // 输出: true
console.log(DC.Number.isPrime(4)); // 输出: false
console.log(DC.Number.isPrime(17)); // 输出: true
console.log(DC.Number.isPrime(18)); // 输出: false
```

### factorial(num)
计算阶乘。

**参数：**
- `num` (number): 数字

**返回值：**
- `number`: 阶乘结果

**使用示例：**
```javascript
// 计算阶乘
console.log(DC.Number.factorial(0)); // 输出: 1
console.log(DC.Number.factorial(1)); // 输出: 1
console.log(DC.Number.factorial(5)); // 输出: 120
console.log(DC.Number.factorial(10)); // 输出: 3628800
```

### sum(a, b)
计算两个数字的和。

**参数：**
- `a` (string|number): 第一个加数
- `b` (string|number): 第二个加数

**返回值：**
- `number`: 两个参数的和

**使用示例：**
```javascript
// 计算两个数字的和
console.log(DC.Number.sum(5, 3)); // 输出: 8
console.log(DC.Number.sum('10', '20')); // 输出: 30
```

### subtract(a, b)
计算两个数字的差。

**参数：**
- `a` (string|number): 被减数
- `b` (string|number): 减数

**返回值：**
- `number`: 两个参数的差

**使用示例：**
```javascript
// 计算两个数字的差
console.log(DC.Number.subtract(10, 3)); // 输出: 7
console.log(DC.Number.subtract('20', '5')); // 输出: 15
```

### multiply(a, b)
计算两个数字的乘积。

**参数：**
- `a` (string|number): 第一个乘数
- `b` (string|number): 第二个乘数

**返回值：**
- `number`: 两个参数的乘积

**使用示例：**
```javascript
// 计算两个数字的乘积
console.log(DC.Number.multiply(5, 3)); // 输出: 15
console.log(DC.Number.multiply('10', '20')); // 输出: 200
```

### divide(a, b)
计算两个数字的商。

**参数：**
- `a` (string|number): 被除数
- `b` (string|number): 除数

**返回值：**
- `number`: 两个参数的商

**使用示例：**
```javascript
// 计算两个数字的商
console.log(DC.Number.divide(10, 2)); // 输出: 5
console.log(DC.Number.divide('20', '5')); // 输出: 4
```

### count(a, b, operator)
执行两个数字之间的算术运算。

**参数：**
- `a` (string|number): 第一个数字
- `b` (string|number): 第二个数字
- `operator` (string): 运算符，可以是 "+", "-", "*" 或 "/"

**返回值：**
- `number`: 运算结果

**使用示例：**
```javascript
// 执行算术运算
console.log(DC.Number.count(5, 3, '+')); // 输出: 8
console.log(DC.Number.count(10, 3, '-')); // 输出: 7
console.log(DC.Number.count(5, 3, '*')); // 输出: 15
console.log(DC.Number.count(10, 2, '/')); // 输出: 5
```

## 浏览器兼容性

- **现代浏览器**: Chrome, Firefox, Safari, Edge 均支持
- **IE 浏览器**: IE 10+ 支持，IE 9 及以下可能需要 polyfill

## 错误处理

部分方法会在输入无效时抛出错误：

```javascript
// 计算平方根时输入负数
try {
  DC.Number.sqrt(-1);
} catch (error) {
  console.error('错误:', error.message); // 输出: "Input must be a non-negative number"
}

// 除法运算时除数为零
try {
  DC.Number.calculate(1, 0, 'divide');
} catch (error) {
  console.error('错误:', error.message); // 输出: "除数不能为零"
}
```

## 最佳实践

1. **数字格式化**:
   - 用于显示金额、统计数据等需要美观展示的场景
   - 根据不同地区的习惯设置不同的分隔符

2. **精确计算**:
   - 用于金融计算等需要精确结果的场景
   - 避免浮点数精度问题

3. **随机数生成**:
   - 用于游戏、抽奖等需要随机值的场景
   - 注意设置合理的范围

4. **文件大小转换**:
   - 用于显示文件大小、带宽等需要可读性的场景

5. **输入验证**:
   - 在调用方法前验证输入值的有效性
   - 处理可能的错误情况

## 示例应用场景

1. **金融应用**:
   - 使用 `format` 方法格式化金额
   - 使用 `toChinese` 方法转换为中文大写金额
   - 使用 `calculate` 方法进行精确计算

2. **数据可视化**:
   - 使用 `format` 方法美化数字显示
   - 使用 `percentage` 方法计算和显示百分比
   - 使用 `toFileSize` 方法转换数据大小

3. **游戏开发**:
   - 使用 `random` 方法生成随机数
   - 使用 `clamp` 方法限制游戏参数范围

4. **表单验证**:
   - 使用 `isInteger` 方法验证输入是否为整数
   - 使用 `clamp` 方法限制输入范围

## 代码示例

### 金融计算示例

```javascript
// 金融计算示例
const amount = 12345.67;
const taxRate = 0.08;

// 计算税额
const tax = DC.Number.calculate(amount, taxRate, 'multiply');
console.log('税额:', DC.Number.format(tax)); // 输出: "987.65"

// 计算总金额
const total = DC.Number.calculate(amount, tax, 'add');
console.log('总金额:', DC.Number.format(total)); // 输出: "13333.32"

// 转换为中文大写金额
console.log('中文大写:', DC.Number.toChinese(total)); // 输出: "壹万叁仟叁佰叁拾叁元叁角贰分"
```

### 数据格式化示例

```javascript
// 数据格式化示例
const data = {
  users: 123456,
  revenue: 9876543.21,
  growth: 0.1567,
  fileSize: 104857600
};

// 格式化用户数
console.log('用户数:', DC.Number.format(data.users)); // 输出: "123,456"

// 格式化收入
console.log('收入:', DC.Number.format(data.revenue)); // 输出: "9,876,543.21"

// 格式化增长率为百分比
console.log('增长率:', DC.Number.percentage(data.growth * 100, 100)); // 输出: "15.67%"

// 格式化文件大小
console.log('文件大小:', DC.Number.toFileSize(data.fileSize)); // 输出: "100.00 MB"
```

### 游戏开发示例

```javascript
// 游戏开发示例
const playerLevel = 5;
const enemyLevel = 3;

// 生成随机伤害值
const minDamage = playerLevel * 5;
const maxDamage = playerLevel * 10;
const damage = DC.Number.random(minDamage, maxDamage, true);
console.log('伤害值:', damage);

// 限制生命值在合理范围内
let enemyHealth = enemyLevel * 20;
enemyHealth = DC.Number.calculate(enemyHealth, damage, 'subtract');
enemyHealth = DC.Number.clamp(enemyHealth, 0, enemyLevel * 20);
console.log('敌人生命值:', enemyHealth);

// 生成随机掉落物品数量
const itemCount = DC.Number.random(1, 5, true);
console.log('掉落物品数量:', itemCount);
```

## 总结

`dcNumber` 工具类提供了全面的数字处理功能，从简单的格式化到复杂的计算，都能轻松实现。通过合理使用这些方法，可以提高代码的可读性和可维护性，同时避免常见的数字处理问题。

无论是金融计算、数据可视化还是游戏开发，`dcNumber` 都能为你提供强大的支持，帮助你处理各种数字相关的任务。