# dcDailyQuote

每日一言工具类 - 每天展示一句《千字文》并支持语音朗读

## 安装

将 `dcDailyQuote.js` 文件引入到项目中：

```html
<script src="path/to/dcDailyQuote.js"></script>
```

## API 参考

### 1. 构造函数

```javascript
const quote = new DC.DailyQuote(options);
```

**参数**：
- `options`：配置选项
  - `container`：容器元素或选择器
  - `language`：朗读语言 ('zh-CN', 'zh-TW')
  - `rate`：朗读语速 (0.1-10)
  - `pitch`：音调 (0-2)
  - `autoPlay`：是否自动朗读
  - `onQuoteChange`：语句切换回调
  - `onError`：错误回调

**示例**：

```javascript
const quote = new DC.DailyQuote({
  container: '#quote-container',
  language: 'zh-CN',
  rate: 1,
  pitch: 1,
  autoPlay: true,
  onQuoteChange: function(data) {
    console.log('语句切换:', data);
  }
});
```

### 2. getCurrentQuote()

获取当前语句

**返回值**：当前语句内容

**示例**：

```javascript
const currentQuote = quote.getCurrentQuote();
console.log(currentQuote); // 例如：天地玄黄，宇宙洪荒。
```

### 3. getCurrentIndex()

获取当前索引

**返回值**：当前索引

**示例**：

```javascript
const index = quote.getCurrentIndex();
console.log(index); // 例如：0
```

### 4. next()

切换到下一句

**示例**：

```javascript
quote.next();
```

### 5. previous()

切换到上一句

**示例**：

```javascript
quote.previous();
```

### 6. speak()

朗读当前语句

**示例**：

```javascript
quote.speak();
```

### 7. stop()

停止朗读

**示例**：

```javascript
quote.stop();
```

### 8. pause()

暂停朗读

**示例**：

```javascript
quote.pause();
```

### 9. resume()

恢复朗读

**示例**：

```javascript
quote.resume();
```

### 10. setLanguage(language)

设置朗读语言

**参数**：
- `language`：语言代码

**示例**：

```javascript
quote.setLanguage('zh-TW');
```

### 11. setRate(rate)

设置朗读语速

**参数**：
- `rate`：语速 (0.1-10)

**示例**：

```javascript
quote.setRate(1.5);
```

### 12. setPitch(pitch)

设置音调

**参数**：
- `pitch`：音调 (0-2)

**示例**：

```javascript
quote.setPitch(1.2);
```

### 13. getVoices()

获取可用的语音列表

**返回值**：语音对象数组

**示例**：

```javascript
const voices = quote.getVoices();
console.log(voices);
```

### 14. setVoice(voiceName)

设置特定语音

**参数**：
- `voiceName`：语音名称

**示例**：

```javascript
quote.setVoice('Google Chinese (Simplified)');
```

### 15. destroy()

销毁实例

**示例**：

```javascript
quote.destroy();
```

## 浏览器兼容性

- Chrome ≥ 33
- Firefox ≥ 49
- Safari ≥ 7
- Edge ≥ 14

## 注意事项

1. 语音朗读功能依赖于浏览器的 Web Speech API，部分浏览器可能不支持
2. 自动播放功能可能会被浏览器的自动播放策略限制
3. 语句索引基于当前日期计算，每天会自动切换到对应的语句
4. 容器元素需要存在于 DOM 中，否则初始化时会抛出错误

## 示例

查看 `examples/utils/dcDailyQuote/index.html` 获取交互式示例。

## 测试

运行 `npm test test/utils/dcDailyQuote/dcDailyQuote.test.js` 查看测试结果。
