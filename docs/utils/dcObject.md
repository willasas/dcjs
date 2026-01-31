# dcObject 工具类

## 简介

`dcObject` 是一个功能强大的对象处理工具类，提供了一系列用于对象操作、转换和处理的静态方法。它支持深拷贝、对象合并、属性路径操作、对象转换、过滤、比较等多种常用功能，为前端开发中的对象处理提供了便捷的工具集。

## 方法列表

| 方法名 | 描述 | 参数 | 返回值 |
|-------|------|------|-------|
| `deepClone` | 深拷贝对象 | `obj` (任意类型) - 要拷贝的对象 | 拷贝后的对象 |
| `entries` | 获取对象的键值对 | `obj` (Object) - 输入对象 | 键值对数组 |
| `merge` | 合并多个对象 | `...objects` (Object[]) - 要合并的对象列表 | 合并后的对象 |
| `get` | 获取对象指定路径的值 | `obj` (Object) - 输入对象<br>`path` (string) - 属性路径<br>`defaultValue` (任意类型) - 默认值 | 属性值或默认值 |
| `set` | 设置对象指定路径的值 | `obj` (Object) - 输入对象<br>`path` (string) - 属性路径<br>`value` (任意类型) - 要设置的值 | 修改后的对象 |
| `unset` | 删除对象指定路径的值 | `obj` (Object) - 输入对象<br>`path` (string) - 属性路径 | 是否删除成功 |
| `has` | 检查对象是否包含指定路径 | `obj` (Object) - 输入对象<br>`path` (string) - 属性路径 | 是否包含 |
| `pick` | 选择对象的指定属性 | `obj` (Object) - 输入对象<br>`keys` (string[]) - 属性名数组 | 新对象 |
| `omit` | 忽略对象的指定属性 | `obj` (Object) - 输入对象<br>`keys` (string[]) - 属性名数组 | 新对象 |
| `flatten` | 扁平化对象 | `obj` (Object) - 输入对象<br>`prefix` (string) - 前缀 | 扁平化后的对象 |
| `toQueryString` | 对象转查询字符串 | `obj` (Object) - 输入对象 | 查询字符串 |
| `fromQueryString` | 查询字符串转对象 | `queryString` (string) - 查询字符串 | 转换后的对象 |
| `isEqual` | 比较两个对象是否相等 | `obj1` (任意类型) - 第一个对象<br>`obj2` (任意类型) - 第二个对象 | 是否相等 |
| `paths` | 获取对象的所有键路径 | `obj` (Object) - 输入对象<br>`prefix` (string) - 前缀 | 键路径数组 |
| `rename` | 对象属性重命名 | `obj` (Object) - 输入对象<br>`mapping` (Object) - 属性映射 | 重命名后的对象 |
| `filter` | 过滤对象属性 | `obj` (Object) - 输入对象<br>`predicate` (Function) - 过滤函数 | 过滤后的对象 |

## 方法详情

### deepClone

**功能**：创建对象的深拷贝，包括嵌套对象、数组、日期和正则表达式。

**参数**：
- `obj` (任意类型)：要拷贝的对象

**返回值**：
- 拷贝后的对象，类型与输入对象相同

**示例**：

```javascript
const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    zip: 10001
  },
  hobbies: ['reading', 'coding'],
  createdAt: new Date('2023-01-01'),
  pattern: /test/gi
};

const cloned = DC.Object.deepClone(original);
// 修改克隆对象，原始对象不受影响
cloned.address.city = 'Boston';
console.log(original.address.city); // 输出: New York
console.log(cloned.address.city); // 输出: Boston
```

### entries

**功能**：获取对象的键值对数组，与 `Object.entries()` 功能相同。

**参数**：
- `obj` (Object)：输入对象

**返回值**：
- 键值对数组

**示例**：

```javascript
const obj = { a: 1, b: 2, c: 3 };
const entries = DC.Object.entries(obj);
console.log(entries); // 输出: [['a', 1], ['b', 2], ['c', 3]]
```

### merge

**功能**：深度合并多个对象，支持嵌套对象和数组合并。

**参数**：
- `...objects` (Object[])：要合并的对象列表

**返回值**：
- 合并后的对象

**示例**：

```javascript
const obj1 = { a: 1, b: { c: 2 }, hobbies: ['reading'] };
const obj2 = { b: { d: 3 }, e: 4, hobbies: ['coding'] };
const obj3 = { f: 5 };

const merged = DC.Object.merge(obj1, obj2, obj3);
console.log(merged);
// 输出:
// {
//   a: 1,
//   b: { c: 2, d: 3 },
//   e: 4,
//   f: 5,
//   hobbies: ['reading', 'coding']
// }
```

### get

**功能**：根据路径获取对象的属性值。

**参数**：
- `obj` (Object)：输入对象
- `path` (string)：属性路径，使用点号分隔
- `defaultValue` (任意类型)：路径不存在时返回的默认值

**返回值**：
- 属性值或默认值

**示例**：

```javascript
const obj = { a: { b: { c: 42 } } };
const value = DC.Object.get(obj, 'a.b.c');
console.log(value); // 输出: 42

// 路径不存在时返回默认值
const defaultValue = DC.Object.get(obj, 'a.b.d', 'default');
console.log(defaultValue); // 输出: default
```

### set

**功能**：根据路径设置对象的属性值，路径不存在时会创建嵌套对象。

**参数**：
- `obj` (Object)：输入对象
- `path` (string)：属性路径，使用点号分隔
- `value` (任意类型)：要设置的值

**返回值**：
- 修改后的对象

**示例**：

```javascript
const obj = { a: { b: {} } };
DC.Object.set(obj, 'a.b.c', 42);
console.log(obj.a.b.c); // 输出: 42

// 路径不存在时创建嵌套对象
const emptyObj = {};
DC.Object.set(emptyObj, 'a.b.c.d', 100);
console.log(emptyObj.a.b.c.d); // 输出: 100
```

### unset

**功能**：根据路径删除对象的属性。

**参数**：
- `obj` (Object)：输入对象
- `path` (string)：属性路径，使用点号分隔

**返回值**：
- 是否删除成功

**示例**：

```javascript
const obj = { a: { b: { c: 42 } } };
const result = DC.Object.unset(obj, 'a.b.c');
console.log(result); // 输出: true
console.log('c' in obj.a.b); // 输出: false
```

### has

**功能**：检查对象是否包含指定路径的属性。

**参数**：
- `obj` (Object)：输入对象
- `path` (string)：属性路径，使用点号分隔

**返回值**：
- 是否包含指定路径

**示例**：

```javascript
const obj = { a: { b: { c: 42 } } };
console.log(DC.Object.has(obj, 'a.b.c')); // 输出: true
console.log(DC.Object.has(obj, 'a.b.d')); // 输出: false
```

### pick

**功能**：选择对象的指定属性，创建一个新对象。

**参数**：
- `obj` (Object)：输入对象
- `keys` (string[])：要选择的属性名数组

**返回值**：
- 包含指定属性的新对象

**示例**：

```javascript
const obj = { a: 1, b: 2, c: 3, d: 4 };
const picked = DC.Object.pick(obj, ['a', 'c']);
console.log(picked); // 输出: { a: 1, c: 3 }
```

### omit

**功能**：忽略对象的指定属性，创建一个新对象。

**参数**：
- `obj` (Object)：输入对象
- `keys` (string[])：要忽略的属性名数组

**返回值**：
- 不包含指定属性的新对象

**示例**：

```javascript
const obj = { a: 1, b: 2, c: 3, d: 4 };
const omitted = DC.Object.omit(obj, ['b', 'd']);
console.log(omitted); // 输出: { a: 1, c: 3 }
```

### flatten

**功能**：将嵌套对象扁平化为单层对象，使用点号分隔路径。

**参数**：
- `obj` (Object)：输入对象
- `prefix` (string)：路径前缀

**返回值**：
- 扁平化后的对象

**示例**：

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};

const flattened = DC.Object.flatten(obj);
console.log(flattened);
// 输出:
// {
//   a: 1,
//   'b.c': 2,
//   'b.d.e': 3
// }
```

### toQueryString

**功能**：将对象转换为 URL 查询字符串。

**参数**：
- `obj` (Object)：输入对象

**返回值**：
- 查询字符串

**示例**：

```javascript
const obj = { name: 'John', age: 30, hobbies: ['reading', 'coding'] };
const queryString = DC.Object.toQueryString(obj);
console.log(queryString); // 输出: "name=John&age=30&hobbies=reading&hobbies=coding"
```

### fromQueryString

**功能**：将 URL 查询字符串转换为对象。

**参数**：
- `queryString` (string)：查询字符串

**返回值**：
- 转换后的对象

**示例**：

```javascript
const queryString = "name=John&age=30&hobbies=reading&hobbies=coding";
const obj = DC.Object.fromQueryString(queryString);
console.log(obj);
// 输出:
// {
//   name: "John",
//   age: "30",
//   hobbies: ["reading", "coding"]
// }
```

### isEqual

**功能**：深度比较两个对象是否相等。

**参数**：
- `obj1` (任意类型)：第一个对象
- `obj2` (任意类型)：第二个对象

**返回值**：
- 是否相等

**示例**：

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = { a: 1, b: { c: 3 } };

console.log(DC.Object.isEqual(obj1, obj2)); // 输出: true
console.log(DC.Object.isEqual(obj1, obj3)); // 输出: false
```

### paths

**功能**：获取对象的所有键路径。

**参数**：
- `obj` (Object)：输入对象
- `prefix` (string)：路径前缀

**返回值**：
- 键路径数组

**示例**：

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};

const paths = DC.Object.paths(obj);
console.log(paths); // 输出: ["a", "b", "b.c", "b.d", "b.d.e"]
```

### rename

**功能**：根据映射关系重命名对象的属性。

**参数**：
- `obj` (Object)：输入对象
- `mapping` (Object)：属性映射，键为旧属性名，值为新属性名

**返回值**：
- 重命名后的对象

**示例**：

```javascript
const obj = { name: 'John', age: 30, city: 'New York' };
const mapping = { name: 'fullName', city: 'location' };

const renamed = DC.Object.rename(obj, mapping);
console.log(renamed);
// 输出:
// {
//   fullName: 'John',
//   age: 30,
//   location: 'New York'
// }
```

### filter

**功能**：根据条件过滤对象的属性。

**参数**：
- `obj` (Object)：输入对象
- `predicate` (Function)：过滤函数，接收三个参数：value (属性值), key (属性名), obj (原对象)

**返回值**：
- 过滤后的对象

**示例**：

```javascript
const obj = { a: 1, b: 2, c: 3, d: 4 };
const predicate = (value) => value > 2;

const filtered = DC.Object.filter(obj, predicate);
console.log(filtered); // 输出: { c: 3, d: 4 }
```

## 浏览器兼容性

`dcObject` 工具类使用了 ES6+ 的语法和 API，包括：
- `Object.entries()`
- `Object.keys()`
- 箭头函数
- 扩展运算符
- 模板字符串

在不支持这些特性的旧浏览器中，可能需要使用 Babel 等工具进行转译。

## 总结

`dcObject` 工具类提供了全面的对象处理功能，涵盖了前端开发中常见的对象操作场景。它的方法设计简洁明了，参数类型明确，返回值可预测，为开发者提供了一套统一、便捷的对象处理工具集。

通过使用 `dcObject`，开发者可以更高效地处理对象相关的任务，减少重复代码，提高代码质量和可维护性。