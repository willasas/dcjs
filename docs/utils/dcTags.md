# dcTags

标签管理工具类 - 提供标签的添加、删除、修改、查询等功能，支持为项目添加标签、按标签搜索项目等

## 安装

将 `dcTags.js` 文件引入到项目中：

```html
<script src="path/to/dcTags.js"></script>
```

## API 参考

### 1. 构造函数

```javascript
const tags = new DC.Tags();
```

### 2. addTag(tagName, options)

添加单个标签

**参数**：
- `tagName`：标签名称
- `options`：标签选项
  - `color`：标签颜色（默认：'#3b82f6'）
  - `description`：标签描述（默认：''）

**返回值**：当前实例，支持链式调用

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTag('JavaScript', {
  color: '#f59e0b',
  description: 'JavaScript 相关内容'
});
```

### 3. addTags(tags)

批量添加标签

**参数**：
- `tags`：标签数组，可以是字符串数组或包含name和选项的对象数组

**返回值**：当前实例，支持链式调用

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTags([
  'Python',
  {
    name: 'React',
    color: '#61dafb',
    description: 'React 相关内容'
  },
  {
    name: 'Node.js',
    color: '#339933',
    description: 'Node.js 相关内容'
  }
]);
```

### 4. removeTag(tagName)

删除标签

**参数**：
- `tagName`：标签名称

**返回值**：是否删除成功

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTag('JavaScript');
const removed = tags.removeTag('JavaScript');
console.log(removed); // 输出：true
```

### 5. updateTag(tagName, options)

更新标签

**参数**：
- `tagName`：标签名称
- `options`：标签选项
  - `color`：标签颜色
  - `description`：标签描述

**返回值**：是否更新成功

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTag('JavaScript');
const updated = tags.updateTag('JavaScript', {
  color: '#f59e0b',
  description: '更新后的描述'
});
console.log(updated); // 输出：true
```

### 6. getTag(tagName)

获取标签信息

**参数**：
- `tagName`：标签名称

**返回值**：标签信息对象或null

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTag('JavaScript', { color: '#f59e0b' });
const tag = tags.getTag('JavaScript');
console.log(tag);
// 输出：
// {
//   name: 'JavaScript',
//   color: '#f59e0b',
//   description: '',
//   createdAt: '2023-12-01T00:00:00.000Z'
// }
```

### 7. getAllTags()

获取所有标签

**返回值**：标签数组

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTag('JavaScript').addTag('Python');
const allTags = tags.getAllTags();
console.log(allTags);
// 输出：
// [
//   {
//     name: 'JavaScript',
//     color: '#3b82f6',
//     description: '',
//     createdAt: '2023-12-01T00:00:00.000Z'
//   },
//   {
//     name: 'Python',
//     color: '#3b82f6',
//     description: '',
//     createdAt: '2023-12-01T00:00:01.000Z'
//   }
// ]
```

### 8. hasTag(tagName)

检查标签是否存在

**参数**：
- `tagName`：标签名称

**返回值**：是否存在

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTag('JavaScript');
const exists = tags.hasTag('JavaScript');
console.log(exists); // 输出：true
```

### 9. addTagsToItem(itemId, tags)

为项目添加标签

**参数**：
- `itemId`：项目ID
- `tags`：标签名称或标签数组

**返回值**：当前实例，支持链式调用

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTags(['JavaScript', 'React']);
tags.addTagsToItem('item1', 'JavaScript');
tags.addTagsToItem('item2', ['JavaScript', 'React']);
```

### 10. removeTagsFromItem(itemId, tags)

从项目中删除标签

**参数**：
- `itemId`：项目ID
- `tags`：标签名称或标签数组

**返回值**：当前实例，支持链式调用

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTags(['JavaScript', 'React']);
tags.addTagsToItem('item1', ['JavaScript', 'React']);
tags.removeTagsFromItem('item1', 'React');
```

### 11. setItemTags(itemId, tags)

替换项目的标签

**参数**：
- `itemId`：项目ID
- `tags`：新的标签数组

**返回值**：当前实例，支持链式调用

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTags(['JavaScript', 'React', 'Node.js']);
tags.addTagsToItem('item1', 'JavaScript');
tags.setItemTags('item1', ['React', 'Node.js']);
```

### 12. getItemTags(itemId)

获取项目的标签

**参数**：
- `itemId`：项目ID

**返回值**：标签数组

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTags(['JavaScript', 'React']);
tags.addTagsToItem('item1', ['JavaScript', 'React']);
const itemTags = tags.getItemTags('item1');
console.log(itemTags); // 输出：['JavaScript', 'React']
```

### 13. getItemTagDetails(itemId)

获取项目的标签详情

**参数**：
- `itemId`：项目ID

**返回值**：标签详情数组

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTag('JavaScript', { color: '#f59e0b' });
tags.addTag('React', { color: '#61dafb' });
tags.addTagsToItem('item1', ['JavaScript', 'React']);
const tagDetails = tags.getItemTagDetails('item1');
console.log(tagDetails);
// 输出：
// [
//   {
//     name: 'JavaScript',
//     color: '#f59e0b',
//     description: '',
//     createdAt: '2023-12-01T00:00:00.000Z'
//   },
//   {
//     name: 'React',
//     color: '#61dafb',
//     description: '',
//     createdAt: '2023-12-01T00:00:01.000Z'
//   }
// ]
```

### 14. searchTags(query)

搜索标签

**参数**：
- `query`：搜索关键词

**返回值**：匹配的标签数组

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTag('JavaScript', { description: 'JavaScript 相关内容' });
tags.addTag('TypeScript', { description: 'TypeScript 相关内容' });
tags.addTag('Python', { description: 'Python 相关内容' });
const results = tags.searchTags('script');
console.log(results);
// 输出：
// [
//   {
//     name: 'JavaScript',
//     color: '#3b82f6',
//     description: 'JavaScript 相关内容',
//     createdAt: '2023-12-01T00:00:00.000Z'
//   },
//   {
//     name: 'TypeScript',
//     color: '#3b82f6',
//     description: 'TypeScript 相关内容',
//     createdAt: '2023-12-01T00:00:01.000Z'
//   }
// ]
```

### 15. getItemsByTag(tagName)

按标签获取项目

**参数**：
- `tagName`：标签名称

**返回值**：包含该标签的项目ID数组

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTags(['JavaScript', 'React']);
tags.addTagsToItem('item1', 'JavaScript');
tags.addTagsToItem('item2', ['JavaScript', 'React']);
tags.addTagsToItem('item3', 'React');
const items = tags.getItemsByTag('JavaScript');
console.log(items); // 输出：['item1', 'item2']
```

### 16. getTagStats()

获取标签统计

**返回值**：标签统计信息数组，按使用次数排序

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTags(['JavaScript', 'React', 'Node.js']);
tags.addTagsToItem('item1', ['JavaScript', 'React']);
tags.addTagsToItem('item2', ['JavaScript', 'Node.js']);
tags.addTagsToItem('item3', 'JavaScript');
const stats = tags.getTagStats();
console.log(stats);
// 输出：
// [
//   {
//     name: 'JavaScript',
//     count: 3,
//     color: '#3b82f6',
//     description: '',
//     createdAt: '2023-12-01T00:00:00.000Z'
//   },
//   {
//     name: 'React',
//     count: 1,
//     color: '#3b82f6',
//     description: '',
//     createdAt: '2023-12-01T00:00:01.000Z'
//   },
//   {
//     name: 'Node.js',
//     count: 1,
//     color: '#3b82f6',
//     description: '',
//     createdAt: '2023-12-01T00:00:02.000Z'
//   }
// ]
```

### 17. exportData()

导出标签数据

**返回值**：标签数据对象

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTags(['JavaScript', 'React']);
tags.addTagsToItem('item1', ['JavaScript', 'React']);
const data = tags.exportData();
console.log(data);
// 输出：
// {
//   tags: [
//     {
//       name: 'JavaScript',
//       color: '#3b82f6',
//       description: '',
//       createdAt: '2023-12-01T00:00:00.000Z'
//     },
//     {
//       name: 'React',
//       color: '#3b82f6',
//       description: '',
//       createdAt: '2023-12-01T00:00:01.000Z'
//     }
//   ],
//   itemTags: [
//     ['item1', ['JavaScript', 'React']]
//   ]
// }
```

### 18. importData(data)

导入标签数据

**参数**：
- `data`：标签数据对象

**返回值**：当前实例，支持链式调用

**示例**：

```javascript
const tags = new DC.Tags();
const data = {
  tags: [
    {
      name: 'JavaScript',
      color: '#f59e0b',
      description: 'JavaScript 相关内容',
      createdAt: '2023-12-01T00:00:00.000Z'
    }
  ],
  itemTags: [
    ['item1', ['JavaScript']]
  ]
};
tags.importData(data);
```

### 19. clear()

清除所有标签

**返回值**：当前实例，支持链式调用

**示例**：

```javascript
const tags = new DC.Tags();
tags.addTag('JavaScript');
tags.clear();
console.log(tags.getAllTags()); // 输出：[]
```

## 浏览器兼容性

- Chrome ≥ 60
- Firefox ≥ 55
- Safari ≥ 12
- Edge ≥ 79

## 注意事项

1. 标签名称是唯一的标识符，相同名称的标签会被覆盖
2. 为项目添加标签时，如果标签不存在，会自动创建
3. 导出的数据可以保存到本地存储或服务器，以便后续导入使用
4. 标签统计功能会计算每个标签的使用次数，并按使用次数排序

## 示例

查看 `examples/utils/dcTags/index.html` 获取交互式示例。

## 测试

运行 `npm test test/utils/dcTags/dcTags.test.js` 查看测试结果。