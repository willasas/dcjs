# dcRegexp 工具类文档

## 1. 工具类介绍

`dcRegexp` 是 DCJS 项目中的正则表达式工具类，提供了一组常用的正则表达式，用于验证各种格式的数据。该工具类包含了数字、字符、常用格式等多种类型的正则表达式，方便开发者在前端验证中使用。

## 2. 安装和引入

### 2.1 直接引入

```html
<script src="path/to/dcRegexp.js"></script>
```

### 2.2 ES6 模块引入

```javascript
import dcRegexp from 'path/to/dcRegexp.js';
```

### 2.3 CommonJS 引入

```javascript
const dcRegexp = require('path/to/dcRegexp.js');
```

## 3. API 参考

### 3.1 数字相关正则表达式

| 方法/属性 | 描述 | 正则表达式 |
|----------|------|-----------|
| `NUMBER` | 匹配数字 | `/^-?[0-9]+$/` |
| `nDigits(n)` | 匹配 n 位数字 | 动态生成 |
| `atLeastNDigits(n)` | 匹配至少 n 位数字 | 动态生成 |
| `mToNDigits(m, n)` | 匹配 m 到 n 位数字 | 动态生成 |
| `ZERO_OR_NON_ZERO_START_NUMBER` | 匹配零和非零开头的数字 | `/^(0|[1-9][0-9]*)$/` |
| `NON_ZERO_START_NUMBER_WITH_TWO_DECIMALS` | 匹配非零开头的最多带两位小数的数字 | `/^([1-9][0-9]*)+(\.[0-9]{1,2})?$/` |
| `NUMBER_WITH_ONE_TO_TWO_DECIMALS` | 匹配带1-2位小数的正数或负数 | `/^(\-)?\d+(\.\d{1,2})?$/` |
| `NUMBER_OR_DECIMAL` | 匹配正数、负数、和小数 | `/^(\-|\+)?\d+(\.\d+)?$/` |
| `POSITIVE_NUMBER_WITH_TWO_DECIMALS` | 匹配有两位小数的正实数 | `/^[0-9]+(\.[0-9]{2})?$/` |
| `POSITIVE_NUMBER_WITH_ONE_TO_THREE_DECIMALS` | 匹配有1~3位小数的正实数 | `/^[0-9]+(\.[0-9]{1,3})?$/` |
| `NON_ZERO_POSITIVE_INTEGER` | 匹配非零的正整数 | `/^[1-9]\d*$/` |
| `NON_ZERO_NEGATIVE_INTEGER` | 匹配非零的负整数 | `/^-[1-9]\d*$/` |
| `NON_NEGATIVE_INTEGER` | 匹配非负整数 | `/^\d+$/` |
| `NON_POSITIVE_INTEGER` | 匹配非正整数 | `/^-[1-9]\d*|0$/` |
| `NON_NEGATIVE_FLOAT` | 匹配非负浮点数 | `/^\d+(\.\d+)?$/` |
| `NON_POSITIVE_FLOAT` | 匹配非正浮点数 | `/^((-\d+(\.\d+)?)|(0+(\.0+)?))$/` |
| `POSITIVE_FLOAT` | 匹配正浮点数 | `/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/` |
| `NEGATIVE_FLOAT` | 匹配负浮点数 | `/^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/` |
| `FLOAT` | 匹配浮点数 | `/^(-?\d+)(\.\d+)?$/` |

### 3.2 字符相关正则表达式

| 方法/属性 | 描述 | 正则表达式 |
|----------|------|-----------|
| `CHINESE_CHARACTERS` | 匹配汉字 | `/^[\u4e00-\u9fa5]{0,}$/` |
| `ENGLISH_AND_NUMBERS` | 匹配英文和数字 | `/^[A-Za-z0-9]+$/` |
| `LENGTH_3_TO_20` | 匹配长度为3-20的所有字符 | `/^.{3,20}$/` |
| `ENGLISH_LETTERS` | 匹配由26个英文字母组成的字符串 | `/^[A-Za-z]+$/` |
| `UPPERCASE_ENGLISH_LETTERS` | 匹配由26个大写英文字母组成的字符串 | `/^[A-Z]+$/` |
| `LOWERCASE_ENGLISH_LETTERS` | 匹配由26个小写英文字母组成的字符串 | `/^[a-z]+$/` |
| `NUMBERS_AND_ENGLISH_LETTERS` | 匹配由数字和26个英文字母组成的字符串 | `/^[A-Za-z0-9]+$/` |
| `WORD_CHARACTERS` | 匹配由数字、26个英文字母或者下划线组成的字符串 | `/^\w+$/` |
| `CHINESE_ENGLISH_NUMBERS_AND_UNDERSCORE` | 匹配中文、英文、数字包括下划线 | `/^[\u4E00-\u9FA5A-Za-z0-9_]+$/` |
| `CHINESE_ENGLISH_NUMBERS_NO_SYMBOLS` | 匹配中文、英文、数字但不包括下划线等符号 | `/^[\u4E00-\u9FA5A-Za-z0-9]+$/` |

### 3.3 常用格式正则表达式

| 方法/属性 | 描述 | 正则表达式 |
|----------|------|-----------|
| `EMAIL` | 匹配Email地址 | `/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/` |
| `DOMAIN` | 匹配域名 | `/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/` |
| `INTERNET_URL` | 匹配Internet URL | `/[a-zA-Z]+:\/\/[^\s]*/` |
| `CHINA_MOBILE_PHONE` | 匹配手机号码 | `/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/` |
| `TELEPHONE_NUMBER` | 匹配电话号码 | `/^(\(\d{3,4}-\)|\d{3,4}-)?\d{7,8}$/` |
| `CHINA_TELEPHONE_NUMBER` | 匹配国内电话号码 | `/\d{3}-\d{8}|\d{4}-\d{7}/` |
| `ID_CARD_NUMBER` | 匹配身份证号 | `/^\d{15}|\d{18}$/` |
| `SHORT_ID_CARD_NUMBER` | 匹配短身份证号码 | `/^([0-9]){7,18}(x|X)?$/` |
| `VALID_ACCOUNT` | 匹配账号是否合法 | `/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/` |
| `PASSWORD` | 匹配密码 | `/^[a-zA-Z]\w{5,17}$/` |
| `STRONG_PASSWORD` | 匹配强密码 | `/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/` |
| `DATE_FORMAT` | 匹配日期格式 | `/^\d{4}-\d{1,2}-\d{1,2}$/` |
| `MONTH` | 匹配一年的12个月 | `/^(0?[1-9]|1[0-2])$/` |
| `DAY` | 匹配一个月的31天 | `/^((0?[1-9])|((1|2)[0-9])|30|31)$/` |
| `XML_FILE` | 匹配xml文件 | `/^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/` |
| `CHINESE_CHARACTER` | 匹配中文字符 | `/[\u4e00-\u9fa5]/` |
| `DOUBLE_BYTE_CHARACTER` | 匹配双字节字符 | `/[^\x00-\xff]/` |
| `BLANK_LINE` | 匹配空白行 | `/\n\s*\r/` |
| `LEADING_OR_TRAILING_WHITESPACE` | 匹配首尾空白字符 | `/^\s*|\s*$/` |
| `QQ_NUMBER` | 匹配腾讯QQ号 | `/[1-9][0-9]{4,}/` |
| `CHINA_POSTAL_CODE` | 匹配中国邮政编码 | `/[1-9]\d{5}(?!\d)/` |
| `IP_ADDRESS` | 匹配IP地址 | `/\d+\.\d+\.\d+\.\d+/` |
| `IPV4_ADDRESS` | 匹配IP-v4地址 | `/\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d?d)\\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?d)\b/` |
| `SUBNET_MASK` | 匹配子网掩码 | `/((?:(?:25[0-5]|2[0-4]\d|[01]?\d?d)\\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?d))/` |
| `VALIDATE_DATE` | 匹配校验日期 | `/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/` |

## 4. 使用示例

### 4.1 基本使用

```javascript
// 验证数字
const isNumber = dcRegexp.NUMBER.test('123'); // true

// 验证邮箱
const isEmail = dcRegexp.EMAIL.test('test@example.com'); // true

// 验证手机号码
const isPhone = dcRegexp.CHINA_MOBILE_PHONE.test('13812345678'); // true

// 验证身份证号码
const isIdCard = dcRegexp.ID_CARD_NUMBER.test('110101199001011234'); // true
```

### 4.2 动态生成正则表达式

```javascript
// 验证3位数字
const is3Digits = dcRegexp.nDigits(3).test('123'); // true

// 验证至少5位数字
const isAtLeast5Digits = dcRegexp.atLeastNDigits(5).test('12345'); // true

// 验证2-4位数字
const is2To4Digits = dcRegexp.mToNDigits(2, 4).test('123'); // true
```

### 4.3 表单验证示例

```javascript
// 表单验证函数
function validateForm(formData) {
  const errors = [];

  // 验证用户名
  if (!dcRegexp.VALID_ACCOUNT.test(formData.username)) {
    errors.push('用户名格式不正确');
  }

  // 验证密码
  if (!dcRegexp.STRONG_PASSWORD.test(formData.password)) {
    errors.push('密码强度不够');
  }

  // 验证邮箱
  if (!dcRegexp.EMAIL.test(formData.email)) {
    errors.push('邮箱格式不正确');
  }

  // 验证手机号码
  if (!dcRegexp.CHINA_MOBILE_PHONE.test(formData.phone)) {
    errors.push('手机号码格式不正确');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// 使用示例
const formData = {
  username: 'user123',
  password: 'Password123',
  email: 'test@example.com',
  phone: '13812345678'
};

const validationResult = validateForm(formData);
if (validationResult.isValid) {
  console.log('表单验证通过');
} else {
  console.log('表单验证失败:', validationResult.errors);
}
```

## 5. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| IE 11 | ✅ |

## 6. 注意事项

1. **性能考虑**：正则表达式匹配可能会影响性能，特别是在处理大量数据时，建议合理使用。

2. **验证强度**：不同的正则表达式验证强度不同，开发者应根据实际需求选择合适的正则表达式。

3. **边界情况**：某些正则表达式可能无法覆盖所有边界情况，建议在使用时进行充分测试。

4. **动态正则表达式**：使用 `nDigits`、`atLeastNDigits` 和 `mToNDigits` 方法生成的正则表达式会每次创建新对象，如有性能要求，建议缓存这些正则表达式。

## 7. 测试

测试文件位于 `test/utils/dcregexp/dcregexp.test.js`，包含了对所有正则表达式的测试用例。

### 7.1 运行测试

```bash
# 在项目根目录运行
npm test

# 或者直接运行特定测试文件
node test/utils/dcregexp/dcregexp.test.js
```

## 8. 示例代码

示例代码位于 `examples/utils/dcregexp/index.html`，提供了一个交互式的示例页面，展示了各种正则表达式的使用方法。

### 8.1 打开示例

在浏览器中打开 `examples/utils/dcregexp/index.html` 文件即可查看和测试各种正则表达式。

## 9. 总结

`dcRegexp` 工具类提供了丰富的正则表达式，涵盖了前端开发中常见的验证场景。通过使用这些正则表达式，开发者可以更加方便地进行表单验证、数据校验等操作，提高开发效率和代码质量。

该工具类设计简洁，使用方便，兼容性好，是前端开发中处理数据验证的得力助手。
