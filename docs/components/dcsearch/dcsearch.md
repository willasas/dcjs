# DCSearch 组件文档

## 1. 组件介绍

DCSearch 是一个功能强大的原生 JavaScript 站内搜索组件，支持模糊搜索和精确搜索模式，提供关键词高亮显示、防抖处理等特性，适用于各种站内搜索场景。

### 主要特性

- ✅ 模糊搜索和精确搜索模式
- ✅ 关键词高亮显示
- ✅ 防抖处理，提升性能
- ✅ 响应式设计
- ✅ 自定义搜索字段
- ✅ 搜索结果回调
- ✅ 结果选择回调
- ✅ 无结果提示
- ✅ 支持大小写敏感控制
- ✅ 可配置最大结果数

## 2. 快速开始

### 安装

将 `dcsearch.js` 文件引入到你的项目中：

```html
<script src="path/to/dcsearch.js"></script>
```

### 基本用法

```html
<!-- 创建容器 -->
<div id="search-container"></div>

<script>
    // 测试数据
    const testData = [
        { title: 'JavaScript 教程', content: '这是一篇关于JavaScript的详细教程', tags: 'js,前端,教程' },
        { title: 'React 入门指南', content: 'React是一个用于构建用户界面的JavaScript库', tags: 'react,前端,库' },
        { title: 'Vue.js 实战', content: 'Vue.js是一个渐进式JavaScript框架', tags: 'vue,前端,框架' }
    ];

    // 初始化搜索组件
    const search = new DC.Search({
        container: '#search-container',
        data: testData,
        placeholder: '请输入关键词搜索...'
    });
</script>
```

## 3. 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | string/Element | `null` | 容器选择器或DOM元素 |
| `data` | Array | `[]` | 搜索数据源 |
| `placeholder` | string | `'请输入关键词搜索'` | 搜索框占位符 |
| `searchFields` | Array | `['title', 'content', 'tags']` | 搜索字段 |
| `searchMode` | string | `'fuzzy'` | 搜索模式: fuzzy(模糊)/exact(精确) |
| `debounceTime` | number | `300` | 防抖时间(ms) |
| `maxResults` | number | `10` | 最大结果数 |
| `highlight` | boolean | `true` | 是否高亮关键词 |
| `caseSensitive` | boolean | `false` | 是否区分大小写 |
| `onSearch` | function | `null` | 搜索回调 |
| `onSelect` | function | `null` | 选择结果回调 |
| `noResultText` | string | `'未找到相关结果'` | 无结果提示文本 |

## 4. API 方法

### setData(data)

设置搜索数据源。

**参数：**
- `data` (Array): 搜索数据源

**返回值：**
- 无

**示例：**

```javascript
const newData = [
    { title: 'Python 教程', content: 'Python是一种简单易学的编程语言', tags: 'python,后端,教程' },
    { title: 'Java 核心技术', content: 'Java是一种面向对象的编程语言', tags: 'java,后端,企业级' }
];

search.setData(newData);
```

### getSearchMode()

获取当前搜索模式。

**参数：**
- 无

**返回值：**
- (string): 当前搜索模式 ('fuzzy' 或 'exact')

**示例：**

```javascript
const mode = search.getSearchMode();
console.log('当前搜索模式:', mode);
```

### setSearchMode(mode)

设置搜索模式。

**参数：**
- `mode` (string): 搜索模式 ('fuzzy' 或 'exact')

**返回值：**
- 无

**示例：**

```javascript
// 设置为精确搜索模式
search.setSearchMode('exact');
```

### clearResults()

清空搜索结果。

**参数：**
- 无

**返回值：**
- 无

**示例：**

```javascript
// 清空搜索结果
search.clearResults();
```

## 5. 事件回调

### onSearch(keyword, results)

当执行搜索时触发的回调函数。

**参数：**
- `keyword` (string): 搜索关键词
- `results` (Array): 搜索结果数组

**示例：**

```javascript
const search = new DC.Search({
    container: '#search-container',
    data: testData,
    onSearch: (keyword, results) => {
        console.log('搜索关键词:', keyword);
        console.log('找到结果数:', results.length);
        console.log('搜索结果:', results);
    }
});
```

### onSelect(item, index)

当选择搜索结果时触发的回调函数。

**参数：**
- `item` (Object): 选中的结果项
- `index` (number): 结果项在数据源中的索引

**示例：**

```javascript
const search = new DC.Search({
    container: '#search-container',
    data: testData,
    onSelect: (item, index) => {
        console.log('选中结果:', item.title);
        console.log('结果索引:', index);
        // 可以在这里执行跳转或其他操作
    }
});
```

## 6. 数据结构

搜索数据源应该是一个对象数组，每个对象可以包含以下字段：

| 字段 | 类型 | 描述 |
|------|------|------|
| `title` | string | 结果标题（必填） |
| `content` | string | 结果内容（可选） |
| `tags` | string | 结果标签（可选） |
| `url` | string | 结果链接（可选） |

### 示例数据结构

```javascript
const data = [
    {
        title: 'JavaScript 教程',
        content: '这是一篇关于JavaScript的详细教程，包含基础语法、DOM操作、事件处理等内容。',
        tags: 'js,前端,教程',
        url: '/javascript-tutorial'
    },
    {
        title: 'React 入门指南',
        content: 'React是一个用于构建用户界面的JavaScript库，由Facebook开发和维护。',
        tags: 'react,前端,库',
        url: '/react-guide'
    }
];
```

## 7. 示例

### 示例 1: 基本搜索

```javascript
const search = new DC.Search({
    container: '#search-container',
    data: testData,
    placeholder: '请输入关键词搜索...'
});
```

### 示例 2: 自定义配置

```javascript
const search = new DC.Search({
    container: '#search-container',
    data: testData,
    placeholder: '请输入关键词搜索...',
    searchMode: 'fuzzy',
    debounceTime: 500,
    maxResults: 5,
    highlight: true,
    caseSensitive: false,
    onSearch: (keyword, results) => {
        console.log('搜索:', keyword, results);
    },
    onSelect: (item, index) => {
        console.log('选择:', item);
    }
});
```

### 示例 3: 精确搜索模式

```javascript
const search = new DC.Search({
    container: '#search-container',
    data: testData,
    placeholder: '请输入关键词搜索 (精确模式)...',
    searchMode: 'exact'
});
```

## 8. 浏览器兼容性

DCSearch 组件使用了现代 JavaScript 特性和 CSS 技术，支持以下浏览器：

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 9. 样式自定义

DCSearch 组件通过动态创建的 `<style>` 标签来应用样式。你可以通过以下方式自定义样式：

### 主要 CSS 类

- `.dc-search` - 搜索组件容器
- `.dc-search-input-wrapper` - 搜索输入框容器
- `.dc-search-input` - 搜索输入框
- `.dc-search-icon` - 搜索图标
- `.dc-search-mode` - 搜索模式切换按钮
- `.dc-search-results` - 搜索结果容器
- `.dc-search-result-item` - 搜索结果项
- `.dc-search-result-title` - 搜索结果标题
- `.dc-search-result-content` - 搜索结果内容
- `.dc-search-no-result` - 无结果提示
- `.dc-search-highlight` - 关键词高亮

### 响应式设计

组件内置了响应式设计，在屏幕宽度小于 1024px 时会自动调整样式：

- 缩小搜索图标尺寸
- 调整输入框和按钮高度
- 减小字体大小
- 调整结果项内边距

## 10. 性能优化

### 最佳实践

1. **合理设置防抖时间**：根据实际需求调整 `debounceTime`，默认值为 300ms，可根据输入速度和服务器响应时间进行调整。

2. **限制最大结果数**：通过 `maxResults` 限制返回的结果数量，减少 DOM 操作和渲染时间。

3. **优化数据源**：避免在数据源中包含过多无关数据，只包含必要的字段。

4. **使用适当的搜索模式**：对于大量数据，考虑使用后端搜索，前端只负责显示结果。

5. **避免复杂的回调函数**：回调函数中避免执行复杂操作，以免影响搜索体验。

### 防抖处理

DCSearch 组件内置了防抖处理，通过 `debounceTime` 选项控制。防抖可以有效减少频繁输入时的搜索请求，提升性能和用户体验。

## 11. 故障排除

### 常见问题

1. **搜索无结果**
   - 检查数据源是否正确设置
   - 检查搜索模式是否适合当前场景
   - 检查搜索字段是否包含在数据源中

2. **关键词高亮不显示**
   - 确保 `highlight` 选项设置为 `true`
   - 检查数据源中是否包含该关键词

3. **搜索速度慢**
   - 增加 `debounceTime` 值
   - 减少 `maxResults` 值
   - 优化数据源结构

4. **响应式布局问题**
   - 检查父容器的宽度设置
   - 避免在小屏幕上使用过宽的容器

5. **事件回调不执行**
   - 确保回调函数正确定义
   - 检查回调函数是否绑定了正确的作用域

## 12. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2023-12-01 | 初始版本 |
| 1.0.1 | 2023-12-15 | 修复防抖处理问题 |
| 1.0.2 | 2024-01-10 | 优化响应式设计 |

## 13. 贡献

如果你发现任何问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 14. 许可证

DCSearch 组件采用 MIT 许可证。
