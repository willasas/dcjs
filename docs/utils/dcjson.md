# DCJson 工具类使用说明

## 1. 概述

DCJson 是一个 JSON 工具类，提供了一系列用于处理 JSON 数据的静态方法，包括验证 JSON 格式、JSON 转 CSV、合并 JSON 对象和深拷贝 JSON 对象等功能。

## 2. 安装与引入

### 2.1 浏览器端引入

```html
<!-- 在 HTML 文件中引入 DCJS 库 -->
<script src="path/to/dc.min.js"></script>
```

### 2.2 Node.js 环境引入

```javascript
// 在 Node.js 文件中引入 DCJson
const DCJson = require('path/to/dcjson.js');
```

## 3. 核心方法

### 3.1 isValidJSON(str)

验证 JSON 字符串格式是否有效。

**参数**：
- `str`：string - 需要验证的 JSON 字符串

**返回值**：
- boolean - 如果是有效的 JSON 格式返回 true，否则返回 false

**示例**：

```javascript
// 验证有效的 JSON 字符串
const validJson = '{"name": "John", "age": 30}';
const isValid = DC.Json.isValidJSON(validJson);
console.log('Is valid JSON:', isValid); // 输出: true

// 验证无效的 JSON 字符串
const invalidJson = '{"name": "John", "age": 30'; // 缺少闭合括号
const isInvalid = DC.Json.isValidJSON(invalidJson);
console.log('Is invalid JSON:', isInvalid); // 输出: false
```

### 3.2 jsonToCsv(data, columns, delimiter)

将 JSON 对象数组转换为 CSV 格式字符串。

**参数**：
- `data`：Array<Object> - 要转换的 JSON 对象数组
- `columns`：Array<string> - CSV 列名列表，必须与数据对象中的属性名称相对应
- `delimiter`：string (可选) - 分隔符，默认为 ','

**返回值**：
- string - 转换后的 CSV 格式字符串

**示例**：

```javascript
// 准备数据
const data = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Jane', age: 25, city: 'London' },
  { name: 'Bob', age: 35, city: 'Paris' }
];

// 定义列名
const columns = ['name', 'age', 'city'];

// 转换为 CSV
const csv = DC.Json.jsonToCsv(data, columns);
console.log('CSV output:', csv);

// 使用自定义分隔符
const csvSemicolon = DC.Json.jsonToCsv(data, columns, ';');
console.log('CSV with semicolon:', csvSemicolon);
```

**输出结果**：

```
name,age,city
"John","30","New York"
"Jane","25","London"
"Bob","35","Paris"
```

### 3.3 mergeJsonObjects(...jsonObjects)

合并多个 JSON 对象。

**参数**：
- `...jsonObjects`：Object - 需要合并的 JSON 对象（可传入多个）

**返回值**：
- Object - 合并后的 JSON 对象

**示例**：

```javascript
// 定义要合并的对象
const obj1 = { name: 'John', age: 30 };
const obj2 = { city: 'New York', country: 'USA' };
const obj3 = { job: 'Engineer', salary: 100000 };

// 合并对象
const merged = DC.Json.mergeJsonObjects(obj1, obj2, obj3);
console.log('Merged object:', merged);

// 处理属性冲突
const objA = { name: 'John', age: 30, city: 'Boston' };
const objB = { city: 'New York', country: 'USA' };
const mergedWithConflict = DC.Json.mergeJsonObjects(objA, objB);
console.log('Merged with conflict:', mergedWithConflict);
```

**输出结果**：

```javascript
// 合并多个对象
Merged object: { name: 'John', age: 30, city: 'New York', country: 'USA', job: 'Engineer', salary: 100000 }

// 处理属性冲突（后面的对象会覆盖前面对象的同名属性）
Merged with conflict: { name: 'John', age: 30, city: 'New York', country: 'USA' }
```

### 3.4 deepCopyJson(jsonObject)

深拷贝 JSON 对象。

**参数**：
- `jsonObject`：Object - 需要拷贝的 JSON 对象

**返回值**：
- Object - 深拷贝后的 JSON 对象

**示例**：

```javascript
// 定义原始对象
const original = {
  name: 'John',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'New York',
    zip: 10001
  },
  hobbies: ['reading', 'gaming', 'coding']
};

// 深拷贝对象
const copy = DC.Json.deepCopyJson(original);
console.log('Original object:', original);
console.log('Copied object:', copy);
console.log('Are they the same reference?', original === copy); // 输出: false
console.log('Are addresses the same reference?', original.address === copy.address); // 输出: false

// 修改原始对象的嵌套属性
original.address.city = 'Boston';
console.log('After modifying original:', original.address.city); // 输出: Boston
console.log('Copy remains unchanged:', copy.address.city); // 输出: New York
```

## 4. 使用场景

### 4.1 表单数据验证

在接收用户输入的 JSON 字符串时，可以使用 `isValidJSON` 方法验证其格式是否正确：

```javascript
function validateJsonInput(input) {
  if (DC.Json.isValidJSON(input)) {
    const data = JSON.parse(input);
    // 处理有效的 JSON 数据
    return { valid: true, data };
  } else {
    // 处理无效的 JSON 数据
    return { valid: false, error: 'Invalid JSON format' };
  }
}
```

### 4.2 数据导出

将表格数据或其他结构化数据转换为 CSV 格式，方便用户下载：

```javascript
function exportToCsv(data, filename) {
  const columns = Object.keys(data[0] || {});
  const csv = DC.Json.jsonToCsv(data, columns);
  
  // 创建下载链接
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

### 4.3 配置合并

合并多个配置对象，例如默认配置和用户配置：

```javascript
const defaultConfig = {
  theme: 'light',
  fontSize: 16,
  language: 'en'
};

const userConfig = {
  theme: 'dark',
  fontSize: 18
};

const finalConfig = DC.Json.mergeJsonObjects(defaultConfig, userConfig);
console.log('Final config:', finalConfig);
// 输出: { theme: 'dark', fontSize: 18, language: 'en' }
```

### 4.4 状态管理

在前端状态管理中，使用深拷贝避免状态引用问题：

```javascript
// 原始状态
const state = {
  user: {
    name: 'John',
    preferences: {
      theme: 'light'
    }
  }
};

// 创建状态的深拷贝
const stateCopy = DC.Json.deepCopyJson(state);

// 修改拷贝后的状态
stateCopy.user.preferences.theme = 'dark';

// 原始状态保持不变
console.log('Original theme:', state.user.preferences.theme); // 输出: light
console.log('Copied theme:', stateCopy.user.preferences.theme); // 输出: dark
```

## 5. 注意事项

### 5.1 关于 deepCopyJson 方法

- 该方法使用 `JSON.parse(JSON.stringify())` 实现，因此不能处理以下类型的值：
  - 函数
  - 正则表达式
  - Date 对象（会被转换为字符串）
  - undefined
  - Symbol
  - 循环引用

- 对于大型 JSON 对象，使用该方法可能会影响性能。如果只需要浅拷贝，可以使用 `Object.assign` 或扩展运算符。

### 5.2 关于 jsonToCsv 方法

- 该方法会自动处理以下情况：
  - 在值周围添加双引号
  - 将值中的双引号替换为两个双引号（转义）
  - 处理 null 和 undefined 值，转换为空字符串
  - 处理缺少属性的对象，对应列会显示为空字符串

- 该方法要求 `data` 参数必须是数组，`columns` 参数必须是数组且不能为空。

### 5.3 关于 isValidJSON 方法

- 该方法会在控制台输出错误信息，方便调试。
- 该方法只验证 JSON 格式是否有效，不验证 JSON 数据的结构或内容。

## 6. 浏览器兼容性

DCJson 工具类支持以下浏览器：

- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge 12+
- IE 9+

**注意**：DCJson 工具类使用了原生的 `JSON.parse` 和 `JSON.stringify` 方法，这些方法在 IE 8 及以下版本中不支持。如果需要在这些浏览器中使用，建议添加 JSON polyfill。

## 7. 错误处理

### 7.1 jsonToCsv 方法的错误处理

`jsonToCsv` 方法会在以下情况下抛出异常：

- 如果 `data` 参数不是数组
- 如果 `columns` 参数不是数组
- 如果 `delimiter` 参数不是字符串
- 如果 `columns` 数组为空

**示例**：

```javascript
try {
  const csv = DC.Json.jsonToCsv('not an array', ['name', 'age']);
} catch (error) {
  console.error('Error:', error.message); // 输出: Invalid input parameters
}

try {
  const csv = DC.Json.jsonToCsv([{ name: 'John' }], []);
} catch (error) {
  console.error('Error:', error.message); // 输出: Columns array must not be empty
}
```

### 7.2 其他方法的错误处理

- `isValidJSON` 方法：不会抛出异常，而是返回 false 并在控制台输出错误信息。
- `mergeJsonObjects` 方法：不会抛出异常，如果没有传入参数，会返回一个空对象。
- `deepCopyJson` 方法：如果传入 null，会返回 null；如果传入其他非对象类型的值，会按照 JSON 序列化规则进行转换。

## 8. 总结

DCJson 工具类提供了一组实用的 JSON 处理方法，可以帮助开发者更方便地处理 JSON 数据。无论是验证 JSON 格式、转换为 CSV、合并对象还是深拷贝，都可以通过简单的方法调用来实现。

使用 DCJson 工具类可以：
- 提高代码可读性和可维护性
- 减少重复代码
- 避免常见的 JSON 处理错误
- 简化复杂的 JSON 操作

希望本使用说明能够帮助您更好地理解和使用 DCJson 工具类。如果您有任何问题或建议，欢迎反馈。
