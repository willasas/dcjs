# dcArray

数组处理工具类，提供丰富的数组操作方法，包括去重、扁平化、分组、排序、交集、差集、并集、切片、洗牌、随机元素、反转、求和、平均值、最大值、最小值、树形结构转换等功能。

## 安装

将 `dcArray.js` 文件引入到项目中：

```html
<script src="path/to/dcArray.js"></script>
```

## API 参考

### 1. unique(arr, key)

数组去重

- **参数**：
  - `arr`：输入数组
  - `key`：可选，对象数组去重时的键名
- **返回值**：去重后的数组

**示例**：

```javascript
// 基本数组去重
const arr = [1, 2, 2, 3, 4, 4, 5];
const result = DC.Array.unique(arr);
// 结果：[1, 2, 3, 4, 5]

// 对象数组去重
const arr = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 1, name: 'a' }
];
const result = DC.Array.unique(arr, 'id');
// 结果：[{ id: 1, name: 'a' }, { id: 2, name: 'b' }]
```

### 2. flatten(arr, depth)

数组扁平化

- **参数**：
  - `arr`：输入数组
  - `depth`：可选，扁平化深度，默认为 `Infinity`
- **返回值**：扁平化后的数组

**示例**：

```javascript
const arr = [1, [2, [3, 4], 5], 6];
const result1 = DC.Array.flatten(arr);
// 结果：[1, 2, 3, 4, 5, 6]

const result2 = DC.Array.flatten(arr, 1);
// 结果：[1, 2, [3, 4], 5, 6]
```

### 3. groupBy(arr, key)

数组分组

- **参数**：
  - `arr`：输入数组
  - `key`：分组依据，可以是字符串（属性名）或函数
- **返回值**：分组后的对象

**示例**：

```javascript
// 按属性分组
const arr = [
  { name: 'a', group: '1' },
  { name: 'b', group: '1' },
  { name: 'c', group: '2' }
];
const result = DC.Array.groupBy(arr, 'group');
// 结果：
// {
//   '1': [{ name: 'a', group: '1' }, { name: 'b', group: '1' }],
//   '2': [{ name: 'c', group: '2' }]
// }

// 按函数分组
const arr = [1, 2, 3, 4, 5];
const result = DC.Array.groupBy(arr, item => item % 2 === 0 ? 'even' : 'odd');
// 结果：
// {
//   odd: [1, 3, 5],
//   even: [2, 4]
// }
```

### 4. sort(arr, key, desc)

数组排序

- **参数**：
  - `arr`：输入数组
  - `key`：可选，排序依据，可以是字符串（属性名）或函数
  - `desc`：可选，是否降序，默认为 `false`
- **返回值**：排序后的数组

**示例**：

```javascript
// 基本数组排序
const arr = [3, 1, 4, 1, 5, 9];
const result1 = DC.Array.sort(arr);
// 结果：[1, 1, 3, 4, 5, 9]

// 对象数组排序
const arr = [{ name: 'c' }, { name: 'a' }, { name: 'b' }];
const result2 = DC.Array.sort(arr, 'name');
// 结果：[{ name: 'a' }, { name: 'b' }, { name: 'c' }]

// 降序排序
const arr = [1, 2, 3, 4, 5];
const result3 = DC.Array.sort(arr, null, true);
// 结果：[5, 4, 3, 2, 1]
```

### 5. intersection(arr1, arr2, key)

数组交集

- **参数**：
  - `arr1`：第一个数组
  - `arr2`：第二个数组
  - `key`：可选，对象数组比较的键名
- **返回值**：交集数组

**示例**：

```javascript
// 基本数组交集
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const result1 = DC.Array.intersection(arr1, arr2);
// 结果：[3, 4]

// 对象数组交集
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
const result2 = DC.Array.intersection(arr1, arr2, 'id');
// 结果：[{ id: 2 }, { id: 3 }]
```

### 6. difference(arr1, arr2, key)

数组差集

- **参数**：
  - `arr1`：第一个数组
  - `arr2`：第二个数组
  - `key`：可选，对象数组比较的键名
- **返回值**：差集数组

**示例**：

```javascript
// 基本数组差集
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const result1 = DC.Array.difference(arr1, arr2);
// 结果：[1, 2]

// 对象数组差集
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
const result2 = DC.Array.difference(arr1, arr2, 'id');
// 结果：[{ id: 1 }]
```

### 7. union(arr1, arr2, key)

数组并集

- **参数**：
  - `arr1`：第一个数组
  - `arr2`：第二个数组
  - `key`：可选，对象数组比较的键名
- **返回值**：并集数组

**示例**：

```javascript
// 基本数组合并
const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];
const result1 = DC.Array.union(arr1, arr2);
// 结果：[1, 2, 3, 4, 5]

// 对象数组合并
const arr1 = [{ id: 1 }, { id: 2 }];
const arr2 = [{ id: 2 }, { id: 3 }];
const result2 = DC.Array.union(arr1, arr2, 'id');
// 结果：[{ id: 1 }, { id: 2 }, { id: 3 }]
```

### 8. chunk(arr, size)

数组切片

- **参数**：
  - `arr`：输入数组
  - `size`：切片大小
- **返回值**：切片数组

**示例**：

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7];
const result = DC.Array.chunk(arr, 3);
// 结果：[[1, 2, 3], [4, 5, 6], [7]]
```

### 9. shuffle(arr)

数组洗牌

- **参数**：
  - `arr`：输入数组
- **返回值**：打乱后的数组

**示例**：

```javascript
const arr = [1, 2, 3, 4, 5];
const result = DC.Array.shuffle(arr);
// 结果：随机顺序的数组，例如 [3, 1, 5, 2, 4]
```

### 10. random(arr, count)

获取数组中的随机元素

- **参数**：
  - `arr`：输入数组
  - `count`：可选，获取元素的数量，默认为 `1`
- **返回值**：随机元素或元素数组

**示例**：

```javascript
const arr = [1, 2, 3, 4, 5];
const result1 = DC.Array.random(arr);
// 结果：单个随机元素，例如 3

const result2 = DC.Array.random(arr, 3);
// 结果：3个随机元素的数组，例如 [2, 5, 1]
```

### 11. reverse(arr)

反转数组

- **参数**：
  - `arr`：要反转的数组
- **返回值**：反转后的数组

**示例**：

```javascript
const arr = [1, 2, 3, 4, 5];
const result = DC.Array.reverse(arr);
// 结果：[5, 4, 3, 2, 1]
```

### 12. sum(arr, key)

数组求和

- **参数**：
  - `arr`：输入数组
  - `key`：可选，对象数组求和的键名或函数
- **返回值**：求和结果

**示例**：

```javascript
// 基本数组求和
const arr = [1, 2, 3, 4, 5];
const result1 = DC.Array.sum(arr);
// 结果：15

// 对象数组求和
const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
const result2 = DC.Array.sum(arr, 'value');
// 结果：6
```

### 13. average(arr, key)

数组平均值

- **参数**：
  - `arr`：输入数组
  - `key`：可选，对象数组求平均值的键名或函数
- **返回值**：平均值

**示例**：

```javascript
// 基本数组平均值
const arr = [1, 2, 3, 4, 5];
const result1 = DC.Array.average(arr);
// 结果：3

// 对象数组平均值
const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
const result2 = DC.Array.average(arr, 'value');
// 结果：2
```

### 14. max(arr, key)

数组最大值

- **参数**：
  - `arr`：输入数组
  - `key`：可选，对象数组求最大值的键名或函数
- **返回值**：最大值

**示例**：

```javascript
// 基本数组最大值
const arr = [1, 5, 3, 9, 2];
const result1 = DC.Array.max(arr);
// 结果：9

// 对象数组最大值
const arr = [{ value: 1 }, { value: 5 }, { value: 3 }];
const result2 = DC.Array.max(arr, 'value');
// 结果：5
```

### 15. min(arr, key)

数组最小值

- **参数**：
  - `arr`：输入数组
  - `key`：可选，对象数组求最小值的键名或函数
- **返回值**：最小值

**示例**：

```javascript
// 基本数组最小值
const arr = [1, 5, 3, 9, 2];
const result1 = DC.Array.min(arr);
// 结果：1

// 对象数组最小值
const arr = [{ value: 1 }, { value: 5 }, { value: 3 }];
const result2 = DC.Array.min(arr, 'value');
// 结果：1
```

### 16. toTree(arr, options)

数组转树形结构

- **参数**：
  - `arr`：输入数组
  - `options`：配置选项
    - `id`：ID字段名，默认为 `'id'`
    - `parentId`：父ID字段名，默认为 `'parentId'`
    - `children`：子节点字段名，默认为 `'children'`
- **返回值**：树形结构数组

**示例**：

```javascript
const arr = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 }
];
const result = DC.Array.toTree(arr);
// 结果：
// [
//   {
//     id: 1,
//     parentId: null,
//     children: [
//       {
//         id: 2,
//         parentId: 1,
//         children: [{ id: 4, parentId: 2, children: [] }]
//       },
//       { id: 3, parentId: 1, children: [] }
//     ]
//   }
// ]
```

### 17. fromTree(tree, childrenKey)

树形结构转数组

- **参数**：
  - `tree`：树形结构数组
  - `childrenKey`：可选，子节点字段名，默认为 `'children'`
- **返回值**：扁平化数组

**示例**：

```javascript
const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [{ id: 4 }]
      },
      { id: 3 }
    ]
  }
];
const result = DC.Array.fromTree(tree);
// 结果：[{ id: 1 }, { id: 2 }, { id: 4 }, { id: 3 }]
```

## 浏览器兼容性

- Chrome ≥ 45
- Firefox ≥ 40
- Safari ≥ 9
- Edge ≥ 12

## 注意事项

1. 所有方法都进行了类型检查，对于非数组输入会返回合理的默认值
2. 对于对象数组的操作，需要确保对象结构一致
3. 树形结构转换时，需要确保输入数组包含正确的 ID 和 parentId 关系
4. 随机相关方法使用 `Math.random()`，不适合需要加密级随机的场景

## 示例

查看 `examples/utils/dcArray/index.html` 获取交互式示例。

## 测试

运行 `npm test test/utils/dcArray/dcArray.test.js` 查看测试结果。
