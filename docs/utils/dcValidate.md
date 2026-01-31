# dcValidate 工具类

## 简介

`dcValidate` 是一个功能丰富的验证工具类，提供了一系列用于验证各种数据类型和格式的静态方法。它支持常见的验证场景，如邮箱、手机号码、身份证号、URL、密码强度等验证，同时也提供了基本的数据类型检查功能。

## 方法列表

| 方法名 | 描述 | 参数 | 返回值 |
|-------|------|------|-------|
| `isEmpty` | 检查值是否为空 | `value` (任意类型) - 要检查的值 | 是否为空 |
| `isNumber` | 检查值是否为数字 | `value` (任意类型) - 要检查的值 | 是否为数字 |
| `isInteger` | 检查值是否为整数 | `value` (任意类型) - 要检查的值 | 是否为整数 |
| `isPhone` | 验证是否为有效的手机号码 | `phone` (string) - 要验证的手机号码 | 是否为有效手机号码 |
| `isEmail` | 验证是否为有效的电子邮件地址 | `email` (string) - 要验证的电子邮件地址 | 是否为有效电子邮件 |
| `isUrl` | 检查值是否为有效的URL | `value` (string) - 要检查的URL | 是否为有效URL |
| `isIdCard` | 检查值是否为有效的身份证号 | `value` (string) - 要检查的身份证号 | 是否为有效身份证号 |
| `isDate` | 检查值是否为有效的日期 | `value` (任意类型) - 要检查的值 | 是否为有效日期 |
| `isObject` | 检查值是否为对象 | `value` (任意类型) - 要检查的值 | 是否为对象 |
| `isArray` | 检查值是否为数组 | `value` (任意类型) - 要检查的值 | 是否为数组 |
| `isLengthBetween` | 检查字符串长度是否在指定范围内 | `value` (string) - 要检查的字符串<br>`min` (number) - 最小长度<br>`max` (number) - 最大长度 | 长度是否在范围内 |
| `isChinese` | 检查值是否为中文字符 | `value` (string) - 要检查的字符串 | 是否为中文字符 |
| `isPassword` | 检查值是否为有效的密码 | `value` (string) - 要检查的密码 | 是否为有效密码 |

## 方法详情

### isEmpty

**功能**：检查值是否为空。

**参数**：
- `value` (任意类型)：要检查的值

**返回值**：
- `boolean`：如果值为空返回 `true`，否则返回 `false`

**说明**：
- 以下值被视为空：`undefined`、`null`、空字符串 `''`、空数组 `[]`、空对象 `{}`
- 以下值不被视为空：`0`、`false`、非空字符串、非空数组、非空对象

**示例**：

```javascript
DC.Validate.isEmpty(undefined); // true
DC.Validate.isEmpty(null); // true
DC.Validate.isEmpty(''); // true
DC.Validate.isEmpty([]); // true
DC.Validate.isEmpty({}); // true

DC.Validate.isEmpty(0); // false
DC.Validate.isEmpty(false); // false
DC.Validate.isEmpty('Hello'); // false
DC.Validate.isEmpty([1, 2, 3]); // false
DC.Validate.isEmpty({ name: 'John' }); // false
```

### isNumber

**功能**：检查值是否为数字。

**参数**：
- `value` (任意类型)：要检查的值

**返回值**：
- `boolean`：如果是数字返回 `true`，否则返回 `false`

**说明**：
- 仅当值的类型为 `number` 且不是 `NaN` 时才返回 `true`
- 字符串形式的数字（如 `'42'`）会返回 `false`

**示例**：

```javascript
DC.Validate.isNumber(42); // true
DC.Validate.isNumber(0); // true
DC.Validate.isNumber(-10); // true
DC.Validate.isNumber(3.14); // true

DC.Validate.isNumber(NaN); // false
DC.Validate.isNumber('42'); // false
DC.Validate.isNumber(null); // false
DC.Validate.isNumber(undefined); // false
```

### isInteger

**功能**：检查值是否为整数。

**参数**：
- `value` (任意类型)：要检查的值

**返回值**：
- `boolean`：如果是整数返回 `true`，否则返回 `false`

**说明**：
- 使用 `Number.isInteger()` 实现，仅当值为整数时返回 `true`
- 字符串形式的整数会返回 `false`

**示例**：

```javascript
DC.Validate.isInteger(42); // true
DC.Validate.isInteger(0); // true
DC.Validate.isInteger(-10); // true

DC.Validate.isInteger(42.5); // false
DC.Validate.isInteger('42'); // false
DC.Validate.isInteger(null); // false
```

### isPhone

**功能**：验证是否为有效的手机号码。

**参数**：
- `phone` (string)：要验证的手机号码

**返回值**：
- `boolean`：如果是有效的手机号码返回 `true`，否则返回 `false`

**说明**：
- 使用正则表达式 `/^\+?[1-9]\d{1,14}$/` 验证
- 支持国际格式的手机号码，如 `+8613800138000`

**示例**：

```javascript
DC.Validate.isPhone('+15551234567'); // true
DC.Validate.isPhone('15551234567'); // true
DC.Validate.isPhone('+8613800138000'); // true

DC.Validate.isPhone('123'); // false
DC.Validate.isPhone('abc'); // false
DC.Validate.isPhone(''); // false
```

### isEmail

**功能**：验证是否为有效的电子邮件地址。

**参数**：
- `email` (string)：要验证的电子邮件地址

**返回值**：
- `boolean`：如果是有效的电子邮件地址返回 `true`，否则返回 `false`

**说明**：
- 使用正则表达式 `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` 验证
- 基本的邮箱格式验证，不保证邮箱实际存在

**示例**：

```javascript
DC.Validate.isEmail('user@example.com'); // true
DC.Validate.isEmail('user.name@example.co.uk'); // true
DC.Validate.isEmail('user+tag@example.com'); // true

DC.Validate.isEmail('user@'); // false
DC.Validate.isEmail('@example.com'); // false
DC.Validate.isEmail('user@.com'); // false
DC.Validate.isEmail('abc'); // false
```

### isUrl

**功能**：检查值是否为有效的URL。

**参数**：
- `value` (string)：要检查的URL

**返回值**：
- `boolean`：如果是有效的URL返回 `true`，否则返回 `false`

**说明**：
- 使用 `new URL(value)` 尝试解析URL
- 如果解析成功返回 `true`，否则返回 `false`

**示例**：

```javascript
DC.Validate.isUrl('https://www.example.com'); // true
DC.Validate.isUrl('http://example.com/path'); // true
DC.Validate.isUrl('ftp://ftp.example.com'); // true

DC.Validate.isUrl('www.example.com'); // false
DC.Validate.isUrl('example.com'); // false
DC.Validate.isUrl('abc'); // false
```

### isIdCard

**功能**：检查值是否为有效的身份证号。

**参数**：
- `value` (string)：要检查的身份证号

**返回值**：
- `boolean`：如果是有效的身份证号返回 `true`，否则返回 `false`

**说明**：
- 使用正则表达式 `/^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/` 验证
- 支持18位身份证号，包括末尾为X的情况
- 仅验证格式，不验证身份证号的真实性

**示例**：

```javascript
DC.Validate.isIdCard('110101199001011234'); // true
DC.Validate.isIdCard('11010119900101123X'); // true

DC.Validate.isIdCard('1101011990010112'); // false
DC.Validate.isIdCard('1101011990010112345'); // false
DC.Validate.isIdCard('abc123456789012345'); // false
```

### isDate

**功能**：检查值是否为有效的日期。

**参数**：
- `value` (任意类型)：要检查的值

**返回值**：
- `boolean`：如果是有效的日期返回 `true`，否则返回 `false`

**说明**：
- 如果值是 `Date` 对象，检查是否为有效日期（不是 `Invalid Date`）
- 如果值是字符串，尝试转换为 `Date` 对象后检查
- 其他类型返回 `false`

**示例**：

```javascript
DC.Validate.isDate(new Date()); // true
DC.Validate.isDate('2023-01-01'); // true
DC.Validate.isDate('2023/01/01'); // true

DC.Validate.isDate('invalid-date'); // false
DC.Validate.isDate('2023-02-30'); // false
DC.Validate.isDate(42); // false
DC.Validate.isDate(null); // false
```

### isObject

**功能**：检查值是否为对象。

**参数**：
- `value` (任意类型)：要检查的值

**返回值**：
- `boolean`：如果是对象返回 `true`，否则返回 `false`

**说明**：
- 仅当值不为 `null`，类型为 `object`，且不是数组时返回 `true`
- 数组、字符串、数字等其他类型返回 `false`

**示例**：

```javascript
DC.Validate.isObject({}); // true
DC.Validate.isObject({ name: 'John' }); // true

DC.Validate.isObject(null); // false
DC.Validate.isObject([]); // false
DC.Validate.isObject('{}'); // false
DC.Validate.isObject(42); // false
DC.Validate.isObject('string'); // false
```

### isArray

**功能**：检查值是否为数组。

**参数**：
- `value` (任意类型)：要检查的值

**返回值**：
- `boolean`：如果是数组返回 `true`，否则返回 `false`

**说明**：
- 使用 `Array.isArray()` 实现

**示例**：

```javascript
DC.Validate.isArray([]); // true
DC.Validate.isArray([1, 2, 3]); // true

DC.Validate.isArray({}); // false
DC.Validate.isArray('[]'); // false
DC.Validate.isArray(42); // false
DC.Validate.isArray('string'); // false
DC.Validate.isArray(null); // false
```

### isLengthBetween

**功能**：检查字符串长度是否在指定范围内。

**参数**：
- `value` (string)：要检查的字符串
- `min` (number)：最小长度
- `max` (number)：最大长度

**返回值**：
- `boolean`：如果字符串长度在范围内返回 `true`，否则返回 `false`

**说明**：
- 如果输入不是字符串，直接返回 `false`
- 长度包含边界值，即长度等于 `min` 或 `max` 时返回 `true`

**示例**：

```javascript
DC.Validate.isLengthBetween('Hello', 3, 10); // true
DC.Validate.isLengthBetween('Hi', 2, 5); // true
DC.Validate.isLengthBetween('', 0, 0); // true

DC.Validate.isLengthBetween('Hi', 3, 10); // false
DC.Validate.isLengthBetween('Hello World', 3, 10); // false
DC.Validate.isLengthBetween('', 1, 5); // false
DC.Validate.isLengthBetween(42, 3, 10); // false
```

### isChinese

**功能**：检查值是否为中文字符。

**参数**：
- `value` (string)：要检查的字符串

**返回值**：
- `boolean`：如果仅包含中文字符返回 `true`，否则返回 `false`

**说明**：
- 使用正则表达式 `/^[\u4e00-\u9fa5]+$/` 验证
- 字符串必须完全由中文字符组成，不能包含其他字符

**示例**：

```javascript
DC.Validate.isChinese('你好'); // true
DC.Validate.isChinese('中文测试'); // true

DC.Validate.isChinese('Hello'); // false
DC.Validate.isChinese('中文123'); // false
DC.Validate.isChinese('中文English'); // false
DC.Validate.isChinese(''); // false
DC.Validate.isChinese(42); // false
```

### isPassword

**功能**：检查值是否为有效的密码。

**参数**：
- `value` (string)：要检查的密码

**返回值**：
- `boolean`：如果是有效的密码返回 `true`，否则返回 `false`

**说明**：
- 使用正则表达式 `/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/` 验证
- 密码必须满足以下条件：
  - 至少包含一个字母
  - 至少包含一个数字
  - 长度在 8-16 位之间
  - 只能包含字母和数字

**示例**：

```javascript
DC.Validate.isPassword('Password123'); // true
DC.Validate.isPassword('Pass1234'); // true
DC.Validate.isPassword('12345678Abc'); // true

DC.Validate.isPassword('password'); // false（缺少数字）
DC.Validate.isPassword('12345678'); // false（缺少字母）
DC.Validate.isPassword('Pass123'); // false（长度不足）
DC.Validate.isPassword('Password12345678'); // false（长度过长）
DC.Validate.isPassword(''); // false
```

## 应用场景

### 表单验证

```javascript
function validateForm(formData) {
  const errors = [];

  // 验证邮箱
  if (!DC.Validate.isEmail(formData.email)) {
    errors.push('请输入有效的邮箱地址');
  }

  // 验证手机号码
  if (!DC.Validate.isPhone(formData.phone)) {
    errors.push('请输入有效的手机号码');
  }

  // 验证密码
  if (!DC.Validate.isPassword(formData.password)) {
    errors.push('密码必须包含至少一个字母和数字，长度 8-16 位');
  }

  // 验证字符串长度
  if (!DC.Validate.isLengthBetween(formData.name, 2, 20)) {
    errors.push('姓名长度必须在 2-20 之间');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// 使用示例
const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '13800138000',
  password: 'Password123'
};

const validationResult = validateForm(formData);
if (validationResult.isValid) {
  console.log('表单验证通过');
} else {
  console.log('表单验证失败:', validationResult.errors);
}
```

### 数据类型检查

```javascript
function processData(data) {
  // 检查是否为空
  if (DC.Validate.isEmpty(data)) {
    console.log('数据为空');
    return;
  }

  // 检查数据类型
  if (DC.Validate.isArray(data)) {
    console.log('处理数组数据');
    data.forEach(item => console.log(item));
  } else if (DC.Validate.isObject(data)) {
    console.log('处理对象数据');
    console.log('姓名:', data.name);
    console.log('年龄:', data.age);
  } else if (DC.Validate.isString(data)) {
    console.log('处理字符串数据');
    console.log('长度:', data.length);
  } else if (DC.Validate.isNumber(data)) {
    console.log('处理数字数据');
    console.log('值:', data);
  }
}

// 使用示例
processData([1, 2, 3]);
processData({ name: 'John', age: 30 });
processData('Hello');
processData(42);
processData(null);
```

### 输入验证

```javascript
function validateInput(inputType, value) {
  switch (inputType) {
    case 'email':
      return DC.Validate.isEmail(value);
    case 'phone':
      return DC.Validate.isPhone(value);
    case 'url':
      return DC.Validate.isUrl(value);
    case 'idCard':
      return DC.Validate.isIdCard(value);
    case 'password':
      return DC.Validate.isPassword(value);
    case 'chinese':
      return DC.Validate.isChinese(value);
    default:
      return false;
  }
}

// 使用示例
console.log('邮箱验证:', validateInput('email', 'user@example.com'));
console.log('手机号验证:', validateInput('phone', '13800138000'));
console.log('URL验证:', validateInput('url', 'https://www.example.com'));
console.log('身份证验证:', validateInput('idCard', '110101199001011234'));
console.log('密码验证:', validateInput('password', 'Password123'));
```

## 浏览器兼容性

`dcValidate` 工具类使用了 ES6+ 的语法和 API，包括：
- 类声明
- 静态方法
- 正则表达式
- `Number.isInteger()`
- `Array.isArray()`
- `new URL()` 构造函数

在不支持这些特性的旧浏览器中，可能需要使用 Babel 等工具进行转译。

## 总结

`dcValidate` 是一个实用的验证工具类，提供了丰富的验证方法，可以满足前端开发中常见的各种验证需求。它的方法设计简洁明了，参数类型明确，返回值可预测，为开发者提供了一套统一、便捷的验证工具集。

通过使用 `dcValidate`，开发者可以更高效地进行表单验证、数据类型检查和输入验证等操作，提高用户体验和数据安全性。