# dcArray 工具类

## 概述
`dcArray` 是一个JavaScript数组操作工具库，提供了一系列实用的数组处理方法，包括去重、扁平化、分组等功能，帮助开发者更高效地处理数组数据。

## 功能特性
- **去重**: `unique` 方法可以去除数组中的重复元素
- **扁平化**: `flatten` 方法可以将多层嵌套的数组扁平化为一维数组
- **分组**: `groupBy` 方法可以根据指定属性对数组元素进行分组
- **灵活性**: 支持各种类型的数组元素（数字、字符串、对象等）

## 引入方式

### 方式1: 通过script标签引入
```html
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { dcArray } from './src/utils/dcArray.js';
```

## API文档

### unique(arr)
去除数组中的重复元素。

**参数**:
- `arr` (Array): 要去重的数组

**返回值**:
- (Array): 去重后的新数组

**示例**:
```javascript
const result = dcArray.unique([1, 2, 2, 3, 4, 4, 5]);
// 结果: [1, 2, 3, 4, 5]
```

### flatten(arr)
将多层嵌套的数组扁平化为一维数组。

**参数**:
- `arr` (Array): 要扁平化的数组

**返回值**:
- (Array): 扁平化后的一维数组

**示例**:
```javascript
const result = dcArray.flatten([1, [2, [3, 4], 5]]);
// 结果: [1, 2, 3, 4, 5]
```

### groupBy(arr, key)
根据指定属性对数组元素进行分组。

**参数**:
- `arr` (Array): 要分组的数组
- `key` (string): 用于分组的属性名

**返回值**:
- (Object): 以分组键为属性的对象，每个属性值为该组的元素数组

**示例**:
```javascript
const data = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' }
];
const result = dcArray.groupBy(data, 'category');
/*
结果:
{
  fruit: [
    { category: 'fruit', name: 'apple' },
    { category: 'fruit', name: 'banana' }
  ],
  vegetable: [
    { category: 'vegetable', name: 'carrot' }
  ]
}
*/
```

## 使用示例

### 基础使用
```javascript
// 去重
const uniqueArray = dcArray.unique([1, 1, 2, 2, 3]);
console.log(uniqueArray); // [1, 2, 3]

// 扁平化
const flatArray = dcArray.flatten([1, [2, 3], [4, [5, 6]]]);
console.log(flatArray); // [1, 2, 3, 4, 5, 6]

// 分组
const grouped = dcArray.groupBy([
  { type: 'A', value: 1 },
  { type: 'B', value: 2 },
  { type: 'A', value: 3 }
], 'type');
console.log(grouped.A); // [{ type: 'A', value: 1 }, { type: 'A', value: 3 }]
```

## 注意事项
- `unique` 方法使用 `JSON.stringify` 进行比较，对于复杂对象可能不准确，建议配合 `groupBy` 使用
- `flatten` 方法会递归展开所有嵌套层级
- `groupBy` 方法要求数组元素为对象，且存在指定的属性

## 常见问题

**Q: `unique` 方法对对象数组去重有效吗？**
A: 由于使用 `JSON.stringify` 进行比较，只有当两个对象的字符串表示完全相同时才会被视为重复。对于引用不同但内容相同的对象，可能无法正确去重。

**Q: `flatten` 方法会影响原数组吗？**
A: 不会，`flatten` 方法返回一个新数组，不会修改原数组。

**Q: 如何处理更深的嵌套层级？**
A: `flatten` 方法会自动处理任意深度的嵌套，无需额外配置。