# dcContentStats

内容统计工具类 - 提供文章字数统计、阅读时间估算、文本复杂度分析和内容摘要生成等功能

## 安装

将 `dcContentStats.js` 文件引入到项目中：

```html
<script src="path/to/dcContentStats.js"></script>
```

## API 参考

### 1. countWords(text, options)

统计文本字数

**参数**：
- `text`：要统计的文本
- `options`：配置选项
  - `includeSpaces`：是否包含空格（默认：true）
  - `includePunctuation`：是否包含标点符号（默认：true）

**返回值**：字数统计结果对象，包含以下属性：
- `total`：总字符数
- `characters`：实际字符数（根据配置排除空格和标点符号）
- `words`：单词数
- `spaces`：空格数
- `punctuation`：标点符号数

**示例**：

```javascript
const text = 'Hello world! This is a test.';
const result = DC.ContentStats.countWords(text);
console.log(result);
// 输出：
// {
//   total: 23,
//   characters: 23,
//   words: 5,
//   spaces: 4,
//   punctuation: 2
// }

// 不包含空格和标点符号
const resultWithoutSpaces = DC.ContentStats.countWords(text, {
  includeSpaces: false,
  includePunctuation: false
});
console.log(resultWithoutSpaces);
// 输出：
// {
//   total: 23,
//   characters: 17,
//   words: 5,
//   spaces: 4,
//   punctuation: 2
// }
```

### 2. estimateReadingTime(text, options)

估算阅读时间

**参数**：
- `text`：要估算的文本
- `options`：配置选项
  - `wpm`：每分钟阅读单词数（默认：中文300字/分钟，英文200词/分钟）
  - `images`：图片数量（每张图片增加10秒阅读时间）
  - `roundUp`：是否向上取整（默认：true）

**返回值**：阅读时间估算结果对象，包含以下属性：
- `minutes`：分钟数
- `seconds`：秒数
- `totalSeconds`：总秒数
- `display`：显示文本

**示例**：

```javascript
const text = 'Hello world! This is a test. '.repeat(20);
const result = DC.ContentStats.estimateReadingTime(text);
console.log(result);
// 输出：
// {
//   minutes: 1,
//   seconds: 0,
//   totalSeconds: 60,
//   display: '1分钟'
// }

// 包含图片
const resultWithImages = DC.ContentStats.estimateReadingTime(text, {
  images: 3
});
console.log(resultWithImages);
// 输出：
// {
//   minutes: 1,
//   seconds: 30,
//   totalSeconds: 90,
//   display: '1分钟30秒'
// }
```

### 3. analyzeComplexity(text)

分析文本复杂度

**参数**：
- `text`：要分析的文本

**返回值**：文本复杂度分析结果对象，包含以下属性：
- `fleschScore`：Flesch阅读 ease score（0-100，分数越高越容易阅读）
- `fleschKincaidGrade`：Flesch-Kincaid年级水平
- `avgWordLength`：平均词长
- `avgSentenceLength`：平均句子长度

**示例**：

```javascript
const text = 'Hello world! This is a test. This is a longer sentence with more words.';
const result = DC.ContentStats.analyzeComplexity(text);
console.log(result);
// 输出：
// {
//   fleschScore: 90.5,
//   fleschKincaidGrade: 1.2,
//   avgWordLength: 4.2,
//   avgSentenceLength: 4.33
// }
```

### 4. generateSummary(text, options)

生成内容摘要

**参数**：
- `text`：要生成摘要的文本
- `options`：配置选项
  - `length`：摘要长度（默认：150）
  - `ellipsis`：省略号（默认：'...'）

**返回值**：内容摘要

**示例**：

```javascript
const text = 'Hello world! This is a test. '.repeat(10);
const summary = DC.ContentStats.generateSummary(text, {
  length: 100
});
console.log(summary);
// 输出：Hello world! This is a test. Hello world! This is a test. Hello world! This is a test. Hello world! This is a test. Hello...
```

## 浏览器兼容性

- Chrome ≥ 60
- Firefox ≥ 55
- Safari ≥ 12
- Edge ≥ 79

## 注意事项

1. 字数统计功能是基于简单的字符串分析，可能与专业的文字处理软件结果略有差异
2. 阅读时间估算是基于平均阅读速度，实际阅读时间会因个人阅读速度而异
3. 文本复杂度分析是基于简化的算法，仅供参考
4. 内容摘要生成是基于简单的文本截取，可能不会保留最重要的内容

## 示例

查看 `examples/utils/dcContentStats/index.html` 获取交互式示例。

## 测试

运行 `npm test test/utils/dcContentStats/dcContentStats.test.js` 查看测试结果。