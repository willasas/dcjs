# dcStorage 工具类

## 简介

`dcStorage` 是一个轻量级的内存存储工具类，提供了简单而强大的键值对存储功能。它适用于需要在内存中临时存储数据的场景，如表单草稿、应用状态管理、临时数据缓存等。

## 特点

- **轻量级**：纯内存存储，无需依赖任何外部库
- **简单易用**：提供直观的API接口
- **类型支持**：支持存储字符串、数字、布尔值、对象、数组等多种类型
- **边界处理**：包含完善的输入验证和错误处理
- **静态方法**：所有方法都是静态的，无需实例化即可使用

## 方法列表

| 方法名 | 描述 | 参数 | 返回值 |
|-------|------|------|-------|
| `set` | 存储数据 | `key` (string) - 键名<br>`value` (任意类型) - 要存储的值 | 无 |
| `get` | 获取存储的数据 | `key` (string) - 键名<br>`defaultValue` (任意类型) - 默认值 | 存储的值或默认值 |
| `remove` | 删除指定的键值对 | `key` (string) - 键名 | 无 |
| `clear` | 清空所有存储的数据 | 无 | 无 |
| `keys` | 获取所有存储的键名 | 无 | 键名数组 |
| `has` | 检查指定的键是否存在 | `key` (string) - 键名 | 是否存在 |

## 方法详情

### set

**功能**：存储数据到内存中。

**参数**：
- `key` (string)：键名，必须是非空字符串
- `value` (任意类型)：要存储的值

**注意**：
- 如果 `key` 不是非空字符串，会输出警告信息并返回
- 如果 `value` 是 `undefined` 或 `function` 类型，会被转换为 `null`

**示例**：

```javascript
// 存储字符串
DC.Storage.set('username', 'john_doe');

// 存储数字
DC.Storage.set('count', 42);

// 存储布尔值
DC.Storage.set('isActive', true);

// 存储对象
DC.Storage.set('user', { name: '张三', age: 25, city: '北京' });

// 存储数组
DC.Storage.set('items', [1, 2, 3, 'a', 'b', 'c']);

// 存储函数（会被转换为null）
DC.Storage.set('function', () => console.log('test'));

// 存储undefined（会被转换为null）
DC.Storage.set('undefinedValue', undefined);
```

### get

**功能**：从内存中获取存储的数据。

**参数**：
- `key` (string)：键名，必须是非空字符串
- `defaultValue` (任意类型)：当键不存在时返回的默认值，默认为 `null`

**返回值**：
- 如果键存在，返回存储的值
- 如果键不存在，返回默认值

**示例**：

```javascript
// 获取存在的键
const username = DC.Storage.get('username');
console.log(username); // 输出: "john_doe"

// 获取不存在的键
const nonexistent = DC.Storage.get('nonexistentKey');
console.log(nonexistent); // 输出: null

// 获取不存在的键但提供默认值
const defaultValue = DC.Storage.get('nonexistentKey', 'default');
console.log(defaultValue); // 输出: "default"

// 获取不存在的键但提供对象默认值
const defaultObj = DC.Storage.get('nonexistentKey', { foo: 'bar' });
console.log(defaultObj); // 输出: { foo: "bar" }
```

### remove

**功能**：从内存中删除指定的键值对。

**参数**：
- `key` (string)：键名，必须是非空字符串

**注意**：
- 如果 `key` 不是非空字符串，会输出警告信息并返回
- 如果键不存在，不会执行任何操作

**示例**：

```javascript
// 删除存在的键
DC.Storage.remove('username');

// 删除不存在的键（不会报错）
DC.Storage.remove('nonexistentKey');
```

### clear

**功能**：清空内存中所有存储的数据。

**参数**：无

**示例**：

```javascript
// 清空所有存储
DC.Storage.clear();
```

### keys

**功能**：获取内存中所有存储的键名。

**返回值**：
- 键名数组

**示例**：

```javascript
// 获取所有键名
const keys = DC.Storage.keys();
console.log(keys); // 输出: ["username", "count", "isActive"]

// 空存储
DC.Storage.clear();
const emptyKeys = DC.Storage.keys();
console.log(emptyKeys); // 输出: []
```

### has

**功能**：检查内存中是否存在指定的键。

**参数**：
- `key` (string)：键名，必须是非空字符串

**返回值**：
- 如果键存在，返回 `true`
- 如果键不存在或 `key` 不是非空字符串，返回 `false`

**示例**：

```javascript
// 检查存在的键
const hasUsername = DC.Storage.has('username');
console.log(hasUsername); // 输出: true

// 检查不存在的键
const hasNonexistent = DC.Storage.has('nonexistentKey');
console.log(hasNonexistent); // 输出: false
```

## 实现原理

`dcStorage` 使用静态属性 `_storage` 作为内部存储对象，所有数据都存储在这个对象中。当调用 `set` 方法时，数据会被存储到 `_storage` 对象中；当调用 `get` 方法时，会从 `_storage` 对象中读取数据。

### 核心实现

```javascript
class dcStorage {
  constructor() {
    this._storage = {}
  }

  static set(key, value) {
    // 验证键名
    if (!key || typeof key !== 'string') {
      console.warn('Key must be a non-empty string')
      return
    }

    // 处理特殊值
    if (value === undefined || typeof value === 'function') {
      value = null
    }

    // 存储数据
    this._storage = this._storage || {}
    this._storage[key] = value
  }

  // 其他方法实现...
}

// 初始化存储对象
dcStorage._storage = {}
```

## 应用场景

### 1. 表单数据管理

使用 `dcStorage` 存储表单草稿，防止用户意外刷新页面导致数据丢失：

```javascript
// 保存表单草稿
function saveFormDraft() {
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    lastSaved: new Date().toISOString()
  };

  DC.Storage.set('form_draft', formData);
  console.log('表单草稿已保存');
}

// 加载表单草稿
function loadFormDraft() {
  const formData = DC.Storage.get('form_draft', {});
  
  if (formData.name) {
    document.getElementById('name').value = formData.name;
  }
  if (formData.email) {
    document.getElementById('email').value = formData.email;
  }
  if (formData.phone) {
    document.getElementById('phone').value = formData.phone;
  }
  
  console.log('表单草稿已加载');
}
```

### 2. 应用状态管理

使用 `dcStorage` 管理简单的应用状态：

```javascript
// 设置应用状态
function setAppState(key, value) {
  DC.Storage.set(`app_state_${key}`, value);
  console.log(`状态 ${key} 已设置`);
}

// 获取应用状态
function getAppState(key) {
  return DC.Storage.get(`app_state_${key}`);
}

// 清空所有状态
function clearAppState() {
  const keys = DC.Storage.keys();
  keys.forEach(key => {
    if (key.startsWith('app_state_')) {
      DC.Storage.remove(key);
    }
  });
  console.log('所有状态已清空');
}
```

### 3. 临时数据缓存

使用 `dcStorage` 实现简单的临时数据缓存：

```javascript
// 设置缓存
function setCache(key, value, ttl = 60000) { // 默认1分钟过期
  const cacheItem = {
    data: value,
    expires: Date.now() + ttl,
    timestamp: Date.now()
  };

  DC.Storage.set(`cache_${key}`, cacheItem);
  console.log('缓存已设置');
}

// 获取缓存
function getCache(key) {
  const cacheItem = DC.Storage.get(`cache_${key}`);
  
  if (!cacheItem) {
    console.log('缓存不存在');
    return null;
  }
  
  // 检查是否过期
  if (Date.now() > cacheItem.expires) {
    DC.Storage.remove(`cache_${key}`);
    console.log('缓存已过期');
    return null;
  }
  
  console.log('缓存已获取');
  return cacheItem.data;
}
```

## 浏览器兼容性

`dcStorage` 工具类使用了 ES6+ 的语法，包括：
- 类声明
- 静态方法
- 箭头函数
- 模板字符串

在不支持这些特性的旧浏览器中，可能需要使用 Babel 等工具进行转译。

## 总结

`dcStorage` 是一个简单而实用的内存存储工具类，它提供了基本的键值对存储功能，适用于各种临时数据存储场景。通过使用 `dcStorage`，开发者可以更方便地管理应用中的临时数据，提高用户体验和开发效率。

## 代码示例

### 完整使用示例

```javascript
// 1. 存储数据
DC.Storage.set('username', 'john_doe');
DC.Storage.set('user', { name: '张三', age: 25, city: '北京' });
DC.Storage.set('scores', [85, 90, 95]);

// 2. 获取数据
const username = DC.Storage.get('username');
const user = DC.Storage.get('user');
const scores = DC.Storage.get('scores');
const nonexistent = DC.Storage.get('nonexistent', 'default');

console.log(username); // 输出: "john_doe"
console.log(user); // 输出: { name: "张三", age: 25, city: "北京" }
console.log(scores); // 输出: [85, 90, 95]
console.log(nonexistent); // 输出: "default"

// 3. 检查键是否存在
const hasUsername = DC.Storage.has('username');
const hasNonexistent = DC.Storage.has('nonexistent');

console.log(hasUsername); // 输出: true
console.log(hasNonexistent); // 输出: false

// 4. 获取所有键名
const keys = DC.Storage.keys();
console.log(keys); // 输出: ["username", "user", "scores"]

// 5. 删除数据
DC.Storage.remove('scores');
console.log(DC.Storage.has('scores')); // 输出: false

// 6. 清空所有数据
DC.Storage.clear();
console.log(DC.Storage.keys()); // 输出: []
```

## 注意事项

1. **内存限制**：由于是纯内存存储，存储的数据量受限于浏览器的内存限制
2. **会话限制**：页面刷新或关闭后，存储的数据会丢失
3. **类型处理**：函数和 `undefined` 会被转换为 `null`
4. **键名验证**：键名必须是非空字符串，否则会输出警告信息
5. **性能考虑**：对于大量数据的存储，可能会影响应用性能，建议只存储必要的数据