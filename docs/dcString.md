# dcString 工具类使用说明

## 概述

`dcString` 是 DarkCrystal 工具库中的字符串处理工具类，提供了丰富的字符串操作方法，包括字符串转换、处理、验证等功能。该工具类同时提供 JavaScript 和 TypeScript 版本，使用原生 JavaScript 实现，无需依赖第三方库。

## 安装与引入

### JavaScript 版本

```html
<script src="./dist/dc.js"></script>
```

### TypeScript 版本

```typescript
import { String } from './dist/types/dc';
```

### NPM 安装

```bash
npm install dcjs
```

```typescript
// 引入整个库
import DC from 'dcjs';

// 或者只引入 dcString 工具类
import { String } from 'dcjs';
```

## API 文档

### 字符串转换方法

#### capitalize(str: string): string

将字符串的首字母转换为大写。

**参数:**
- `str`: 要转换的字符串

**返回值:**
- 首字母大写的字符串

**示例:**
```javascript
DC.String.capitalize('hello world'); // 'Hello world'
DC.String.capitalize(''); // ''
```

#### toCamelCase(str: string, pascalCase?: boolean): string

将字符串转换为驼峰命名法。

**参数:**
- `str`: 要转换的字符串
- `pascalCase`: 是否使用帕斯卡命名法（首字母大写），默认为 false

**返回值:**
- 驼峰命名字符串

**示例:**
```javascript
DC.String.toCamelCase('hello-world'); // 'helloWorld'
DC.String.toCamelCase('hello-world', true); // 'HelloWorld'
```

#### toSnakeCase(str: string): string

将字符串转换为下划线命名法。

**参数:**
- `str`: 要转换的字符串

**返回值:**
- 下划线命名字符串

**示例:**
```javascript
DC.String.toSnakeCase('helloWorld'); // 'hello_world'
```

#### toKebabCase(str: string): string

将字符串转换为短横线命名法。

**参数:**
- `str`: 要转换的字符串

**返回值:**
- 短横线命名字符串

**示例:**
```javascript
DC.String.toKebabCase('helloWorld'); // 'hello-world'
```

#### toUpperCase(str: string): string

将字符串转换为大写。

**参数:**
- `str`: 要转换的字符串

**返回值:**
- 大写字符串

**示例:**
```javascript
DC.String.toUpperCase('hello world'); // 'HELLO WORLD'
```

#### reverse(str: string): string

反转字符串。

**参数:**
- `str`: 要反转的字符串

**返回值:**
- 反转后的字符串

**示例:**
```javascript
DC.String.reverse('hello'); // 'olleh'
```

### 字符串处理方法

#### truncate(str: string, length: number, suffix?: string): string

截取字符串，并在超出指定长度时添加后缀。

**参数:**
- `str`: 要截取的字符串
- `length`: 最大长度
- `suffix`: 超出长度时的后缀，默认为 '...'

**返回值:**
- 截取后的字符串

**示例:**
```javascript
DC.String.truncate('hello world', 5); // 'hello...'
DC.String.truncate('hello', 10); // 'hello'
```

#### stripHtml(str: string): string

去除字符串中的 HTML 标签。

**参数:**
- `str`: 要处理的字符串

**返回值:**
- 去除 HTML 标签后的字符串

**示例:**
```javascript
DC.String.stripHtml('<p>hello <b>world</b></p>'); // 'hello world'
```

#### escapeHtml(str: string): string

转义字符串中的 HTML 特殊字符。

**参数:**
- `str`: 要转义的字符串

**返回值:**
- 转义后的字符串

**示例:**
```javascript
DC.String.escapeHtml('<div>hello</div>'); // '&lt;div&gt;hello&lt;/div&gt;'
```

#### unescapeHtml(str: string): string

解码字符串中的 HTML 特殊字符。

**参数:**
- `str`: 要解码的字符串

**返回值:**
- 解码后的字符串

**示例:**
```javascript
DC.String.unescapeHtml('&lt;div&gt;hello&lt;/div&gt;'); // '<div>hello</div>'
```

#### random(length?: number): string

生成指定长度的随机字符串。

**参数:**
- `length`: 字符串长度，默认为 10

**返回值:**
- 随机字符串

**示例:**
```javascript
DC.String.random(10); // 'aB3xY9zP2Q'
DC.String.random(); // 'aB3xY9zP2Q' (默认长度为10)
```

#### byteLength(str: string): number

计算字符串的字节长度。

**参数:**
- `str`: 要计算的字符串

**返回值:**
- 字节长度

**示例:**
```javascript
DC.String.byteLength('hello'); // 5
DC.String.byteLength('你好'); // 6 (中文字符占3个字节)
```

#### template(str: string, data: object): string

使用数据对象格式化模板字符串。

**参数:**
- `str`: 模板字符串
- `data`: 数据对象

**返回值:**
- 格式化后的字符串

**示例:**
```javascript
DC.String.template('Hello ${name}, welcome to ${place}!', {name: 'John', place: 'Earth'});
// 'Hello John, welcome to Earth!'
```

#### contains(str: string, search: string | string[]): boolean

检查字符串是否包含指定的子字符串或多个子字符串中的任意一个。

**参数:**
- `str`: 要检查的字符串
- `search`: 要搜索的子字符串或子字符串数组

**返回值:**
- 是否包含

**示例:**
```javascript
DC.String.contains('hello world', 'world'); // true
DC.String.contains('hello world', ['hello', 'earth']); // true
DC.String.contains('hello world', ['earth', 'moon']); // false
```

#### similarity(str1: string, str2: string): number

计算两个字符串的相似度（0-1 之间的数值）。

**参数:**
- `str1`: 第一个字符串
- `str2`: 第二个字符串

**返回值:**
- 相似度（0-1 之间的数值）

**示例:**
```javascript
DC.String.similarity('hello', 'hallo'); // 0.8
DC.String.similarity('hello', 'world'); // 0.2
```

#### words(str: string): string[]

将字符串分割为单词数组。

**参数:**
- `str`: 要分割的字符串

**返回值:**
- 单词数组

**示例:**
```javascript
DC.String.words('hello world test'); // ['hello', 'world', 'test']
```

#### wordCount(str: string): number

计算字符串中的单词数量。

**参数:**
- `str`: 要计算的字符串

**返回值:**
- 单词数量

**示例:**
```javascript
DC.String.wordCount('hello world test'); // 3
```

#### pad(str: string, length: number, fillString?: string, end?: boolean): string

填充字符串到指定长度。

**参数:**
- `str`: 要填充的字符串
- `length`: 目标长度
- `fillString`: 填充字符，默认为 ' '
- `end`: 是否在末尾填充，默认为 true

**返回值:**
- 填充后的字符串

**示例:**
```javascript
DC.String.pad('hello', 10, '*'); // 'hello*****'
DC.String.pad('hello', 10, '*', false); // '*****hello'
```

#### slug(str: string): string

将字符串转换为 URL 友好的 slug。

**参数:**
- `str`: 要转换的字符串

**返回值:**
- URL 友好的 slug

**示例:**
```javascript
DC.String.slug('Hello World!'); // 'hello-world'
DC.String.slug('This is a test'); // 'this-is-a-test'
```

#### countChar(str: string, char: string): number

统计字符串中指定字符的出现次数。

**参数:**
- `str`: 要统计的字符串
- `char`: 要统计的字符

**返回值:**
- 字符出现次数

**示例:**
```javascript
DC.String.countChar('hello world', 'l'); // 3
DC.String.countChar('banana', 'a'); // 3
```

### 字符串验证方法

#### isJSON(str: string): boolean

检查字符串是否为有效的 JSON。

**参数:**
- `str`: 要检查的字符串

**返回值:**
- 是否为有效的 JSON

**示例:**
```javascript
DC.String.isJSON('{"name": "John"}'); // true
DC.String.isJSON('not json'); // false
```

## 使用示例

### 基本使用

```javascript
// 字符串转换
const camelCase = DC.String.toCamelCase('hello-world');
console.log(camelCase); // 'helloWorld'

// 字符串处理
const truncated = DC.String.truncate('This is a long string', 10);
console.log(truncated); // 'This is a...'

// 字符串验证
const isValidJSON = DC.String.isJSON('{"name": "John"}');
console.log(isValidJSON); // true
```

### 复杂示例

```javascript
// 格式化用户输入
function formatUserInput(input) {
    // 去除HTML标签
    const cleanInput = DC.String.stripHtml(input);

    // 转换为驼峰命名
    const camelCase = DC.String.toCamelCase(cleanInput);

    // 截取到合适长度
    const truncated = DC.String.truncate(camelCase, 20);

    return truncated;
}

const userInput = '<div>Hello World Example</div>';
const formatted = formatUserInput(userInput);
console.log(formatted); // 'helloWorldExam...'
```

### 模板字符串示例

```javascript
const template = 'Dear ${title} ${name},\n\nThank you for your purchase of ${product}.\n\nBest regards,\n${company}';
const data = {
    title: 'Mr.',
    name: 'John Doe',
    product: 'DC.js License',
    company: 'DarkCrystal Team'
};

const formattedLetter = DC.String.template(template, data);
console.log(formattedLetter);
/*
Dear Mr. John Doe,

Thank you for your purchase of DC.js License.

Best regards,
DarkCrystal Team
*/
```

## 注意事项

1. 所有方法都是静态方法，通过 `DC.String.methodName()` 调用
2. 字符串处理方法不会修改原始字符串，而是返回新的字符串
3. 在处理用户输入时，建议先使用 `escapeHtml` 方法转义特殊字符
4. `byteLength` 方法对于中文字符返回的是 UTF-8 编码下的字节数
5. `similarity` 方法使用的是简单的字符匹配算法，对于复杂的相似度计算可能不够精确

## 测试

要测试 `dcString` 工具类，可以打开 `test/dcString.html` 文件在浏览器中运行测试。

## 示例

要查看 `dcString` 工具类的示例，可以打开 `examples/dcString.html` 文件在浏览器中查看交互式示例。