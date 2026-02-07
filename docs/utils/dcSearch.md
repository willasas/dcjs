# dcSearch

搜索工具类 - 提供全文搜索、索引创建、搜索建议等功能

## 安装

将 `dcSearch.js` 文件引入到项目中：

```html
<script src="path/to/dcSearch.js"></script>
```

## API 参考

### 1. 构造函数

```javascript
const search = new DC.Search();
```

### 2. createIndex(indexName, data, options)

创建搜索索引

**参数**：
- `indexName`：索引名称
- `data`：要索引的数据数组
- `options`：配置选项
  - `fields`：要索引的字段数组（默认：['title', 'content', 'description']）
  - `idField`：唯一标识字段（默认：'id'）

**返回值**：当前实例，支持链式调用

**示例**：

```javascript
const data = [
  { id: 1, title: 'JavaScript 基础教程', content: '这是一本关于 JavaScript 基础知识的教程' },
  { id: 2, title: 'Python 进阶指南', content: 'Python 高级特性和最佳实践' },
  { id: 3, title: 'React 组件开发', content: 'React 组件设计和开发技巧' }
];

const search = new DC.Search();
search.createIndex('documents', data, {
  fields: ['title', 'content']
});
```

### 3. search(indexName, query, options)

搜索

**参数**：
- `indexName`：索引名称
- `query`：搜索关键词
- `options`：搜索选项
  - `limit`：限制返回结果数量（默认：10）
  - `offset`：偏移量（默认：0）

**返回值**：搜索结果数组

**示例**：

```javascript
const results = search.search('documents', 'javascript');
console.log(results);
// 输出：
// [
//   { id: 1, title: 'JavaScript 基础教程', content: '这是一本关于 JavaScript 基础知识的教程' }
// ]

// 带分页
const paginatedResults = search.search('documents', 'python', {
  limit: 5,
  offset: 0
});
```

### 4. getSuggestions(indexName, prefix, limit)

搜索建议

**参数**：
- `indexName`：索引名称
- `prefix`：前缀
- `limit`：限制返回数量（默认：5）

**返回值**：搜索建议数组

**示例**：

```javascript
const suggestions = search.getSuggestions('documents', 'ja');
console.log(suggestions);
// 输出：['javascript']
```

### 5. getIndexInfo(indexName)

获取索引信息

**参数**：
- `indexName`：索引名称

**返回值**：索引信息对象，包含以下属性：
- `name`：索引名称
- `itemCount`：项目数量
- `fields`：索引字段
- `tokenCount`：分词数量

**示例**：

```javascript
const info = search.getIndexInfo('documents');
console.log(info);
// 输出：
// {
//   name: 'documents',
//   itemCount: 3,
//   fields: ['title', 'content'],
//   tokenCount: 20
// }
```

### 6. deleteIndex(indexName)

删除索引

**参数**：
- `indexName`：索引名称

**返回值**：是否删除成功

**示例**：

```javascript
const deleted = search.deleteIndex('documents');
console.log(deleted); // 输出：true
```

### 7. clearAllIndexes()

清除所有索引

**返回值**：当前实例，支持链式调用

**示例**：

```javascript
search.clearAllIndexes();
```

### 8. static search(data, query, options)

简单的全文搜索（不创建索引）

**参数**：
- `data`：要搜索的数据数组
- `query`：搜索关键词
- `options`：搜索选项
  - `fields`：要搜索的字段数组（默认：['title', 'content', 'description']）
  - `limit`：限制返回结果数量（默认：10）

**返回值**：搜索结果数组

**示例**：

```javascript
const data = [
  { id: 1, title: 'JavaScript 基础教程', content: '这是一本关于 JavaScript 基础知识的教程' },
  { id: 2, title: 'Python 进阶指南', content: 'Python 高级特性和最佳实践' }
];

const results = DC.Search.search(data, 'javascript');
console.log(results);
// 输出：
// [
//   { id: 1, title: 'JavaScript 基础教程', content: '这是一本关于 JavaScript 基础知识的教程' }
// ]
```

## 浏览器兼容性

- Chrome ≥ 60
- Firefox ≥ 55
- Safari ≥ 12
- Edge ≥ 79

## 注意事项

1. 本工具类提供的是简单的全文搜索功能，不支持复杂的搜索语法
2. 对于大量数据，建议在服务器端进行搜索，客户端搜索适合数据量较小的场景
3. 搜索结果按照相关性排序，相关性计算基于简单的词频统计

## 示例

查看 `examples/utils/dcSearch/index.html` 获取交互式示例。

## 测试

运行 `npm test test/utils/dcSearch/dcSearch.test.js` 查看测试结果。