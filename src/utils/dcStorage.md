# dcStorage 工具类

## 概述
`dcStorage` 是一个轻量级的客户端数据存储工具库，提供简单的键值对存储功能，用于在JavaScript应用中临时保存数据。它封装了基本的存储操作，提供了更友好的API接口。

## 功能特性
- **简单易用**: 提供简洁的set/get/remove等方法
- **类型支持**: 支持存储字符串、数字、布尔值、对象、数组等多种数据类型
- **内存存储**: 数据保存在内存中，不依赖localStorage或sessionStorage
- **默认值支持**: get方法支持提供默认值
- **存在性检查**: has方法可以检查键是否存在
- **批量操作**: keys方法可以获取所有键名

## 引入方式

### 方式1: 通过script标签引入
```html
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { dcStorage } from './src/utils/dcStorage.js';
```

## API文档

### set(key, value)
存储数据。

**参数**:
- `key` (string): 键名
- `value` (any): 要存储的值，可以是任意JavaScript数据类型

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 存储字符串
dcStorage.set('username', 'john_doe');

// 存储数字
dcStorage.set('count', 42);

// 存储布尔值
dcStorage.set('isActive', true);

// 存储对象
dcStorage.set('user', {
    name: '张三',
    age: 25,
    city: '北京'
});

// 存储数组
dcStorage.set('items', [1, 2, 3, 'a', 'b', 'c']);
```

### get(key, defaultValue)
获取存储的数据。

**参数**:
- `key` (string): 要获取的键名
- `defaultValue` (any, 可选): 如果键不存在时返回的默认值

**返回值**:
- (any | null): 找到的值，如果键不存在则返回null（如果没有提供默认值）或默认值

**示例**:
```javascript
// 获取存在的键
const username = dcStorage.get('username');
console.log(username); // 输出: john_doe

// 获取不存在的键
const nonExistent = dcStorage.get('nonexistent_key');
console.log(nonExistent); // 输出: null

// 获取不存在的键但提供默认值
const withDefault = dcStorage.get('nonexistent_key', 'default_value');
console.log(withDefault); // 输出: default_value
```

### remove(key)
删除指定的键值对。

**参数**:
- `key` (string): 要删除的键名

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 删除已存在的键
dcStorage.remove('username');

// 删除后尝试获取，应该返回null
const username = dcStorage.get('username');
console.log(username); // 输出: null

// 删除不存在的键（不会抛出异常）
dcStorage.remove('nonexistent_key');
```

### clear()
清空所有存储的数据。

**参数**: 无

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 清空所有数据
dcStorage.clear();

// 此时所有之前存储的数据都将无法访问
```

### keys()
获取所有存储的键名。

**参数**: 无

**返回值**:
- (Array<string>): 包含所有键名的数组

**示例**:
```javascript
// 获取所有键名
const allKeys = dcStorage.keys();
console.log(allKeys); // 输出: ['key1', 'key2', 'key3']

// 遍历所有键值对
allKeys.forEach(key => {
    const value = dcStorage.get(key);
    console.log(`${key}: ${JSON.stringify(value)}`);
});
```

### has(key)
检查指定的键是否存在。

**参数**:
- `key` (string): 要检查的键名

**返回值**:
- (boolean): 如果键存在返回true，否则返回false

**示例**:
```javascript
// 检查键是否存在
if (dcStorage.has('username')) {
    console.log('用户名已设置');
    const username = dcStorage.get('username');
    // 进行后续处理
} else {
    console.log('用户名未设置');
}
```

## 使用示例

### 基础使用
```javascript
// 设置用户信息
dcStorage.set('userInfo', {
    id: 123,
    name: 'Alice',
    email: 'alice@example.com',
    preferences: {
        theme: 'dark',
        language: 'zh-CN'
    }
});

// 获取用户信息
const userInfo = dcStorage.get('userInfo');
if (userInfo) {
    console.log('欢迎,', userInfo.name);
}

// 更新部分信息
const updatedUser = { ...userInfo };
updatedUser.preferences.theme = 'light';
dcStorage.set('userInfo', updatedUser);

// 或者直接删除某个字段
// 注意：这只是一个示例，实际可能需要更复杂的逻辑
if (dcStorage.has('tempData')) {
    dcStorage.remove('tempData');
}
```

### 表单数据管理
```javascript
// 保存表单草稿
function saveFormDraft(formId, formData) {
    // 添加时间戳
    formData.lastSaved = new Date().toISOString();
    dcStorage.set(`form_draft_${formId}`, formData);
    console.log('表单草稿已保存');
}

// 加载表单草稿
function loadFormDraft(formId) {
    return dcStorage.get(`form_draft_${formId}`, {});
}

// 清除表单草稿
function clearFormDraft(formId) {
    dcStorage.remove(`form_draft_${formId}`);
    console.log('表单草稿已清除');
}

// 示例使用
const formId = 'user_profile';
const formData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '13800138000'
};

// 保存
dcStorage.saveFormDraft(formId, formData);

// 加载
const draft = dcStorage.loadFormDraft(formId);
console.log('加载的草稿:', draft);
```

### 状态管理
```javascript
// 应用状态管理器
const AppState = {
    // 设置状态
    set(key, value) {
        dcStorage.set(`app_state_${key}`, value);
    },
    
    // 获取状态
    get(key, defaultValue) {
        return dcStorage.get(`app_state_${key}`, defaultValue);
    },
    
    // 移除状态
    remove(key) {
        dcStorage.remove(`app_state_${key}`);
    },
    
    // 检查状态是否存在
    has(key) {
        return dcStorage.has(`app_state_${key}`);
    },
    
    // 清空所有状态
    clear() {
        // 获取所有以app_state_开头的键并删除
        const allKeys = dcStorage.keys();
        const stateKeys = allKeys.filter(key => key.startsWith('app_state_'));
        stateKeys.forEach(key => {
            dcStorage.remove(key);
        });
    }
};

// 使用状态管理器
AppState.set('currentUser', {
    id: 1,
    name: 'Admin'
});

AppState.set('sidebarCollapsed', false);

// 在应用各处获取状态
if (AppState.has('currentUser')) {
    const user = AppState.get('currentUser');
    console.log('当前用户:', user.name);
}

// 页面切换时保持状态
AppState.set('lastPage', '/dashboard');
```

## 注意事项
- **数据持久化**: dcStorage使用内存存储，页面刷新后数据会丢失。如果需要持久化存储，请考虑使用localStorage或sessionStorage
- **数据大小**: 由于数据保存在内存中，不适合存储大量数据，以免影响应用性能
- **并发安全**: 在单线程环境下使用是安全的，但在Web Worker等多线程环境下需要注意同步问题
- **数据类型**: 支持所有JavaScript基本数据类型和复杂对象，但函数和undefined会被转换为null
- **键名限制**: 键名应为字符串，避免使用特殊字符，尽管大部分字符都支持
- **错误处理**: 大多数操作不会抛出异常，而是静默失败或返回合理的默认值

## 常见问题

**Q: dcStorage和localStorage有什么区别？**
A: 主要区别在于存储位置和持久性：
- localStorage是浏览器提供的持久化存储，数据会保存在磁盘上，即使关闭浏览器也不会丢失
- dcStorage是内存存储，数据只存在于当前JavaScript运行环境中，页面刷新后就会丢失
- 选择建议：需要持久化的数据用localStorage，临时数据用dcStorage

**Q: 如何实现数据的持久化？**
A: dcStorage本身不提供持久化功能。如果需要持久化，可以：
1. 直接使用localStorage/sessionStorage
2. 创建一个包装器，将dcStorage的数据定期同步到localStorage
3. 使用IndexedDB进行更复杂的持久化存储

**Q: 存储的数据有大小限制吗？**
A: 理论上没有硬性限制，但由于数据保存在内存中，过大的数据会影响应用性能，可能导致内存不足。建议：
- 小于1MB的数据通常没问题
- 大于10MB的数据建议考虑其他存储方案
- 定期清理不再使用的数据

**Q: 如何备份和恢复数据？**
A: 可以通过以下方式实现：
```javascript
// 导出所有数据
function exportData() {
    const allKeys = dcStorage.keys();
    const data = {};
    allKeys.forEach(key => {
        data[key] = dcStorage.get(key);
    });
    return JSON.stringify(data);
}

// 导入数据
function importData(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        Object.keys(data).forEach(key => {
            dcStorage.set(key, data[key]);
        });
        return true;
    } catch (error) {
        console.error('导入失败:', error);
        return false;
    }
}
```

**Q: 是否支持异步操作？**
A: 不支持。dcStorage的所有操作都是同步的，因为内存读写非常快。如果你需要异步API，可以自己包装：
```javascript
function asyncSet(key, value) {
    return Promise.resolve().then(() => {
        dcStorage.set(key, value);
    });
}

function asyncGet(key, defaultValue) {
    return Promise.resolve(dcStorage.get(key, defaultValue));
}
```