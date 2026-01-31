# dcCookie 工具类

## 概述
`dcCookie` 是一个简单易用的浏览器Cookie操作工具库，提供了一套简洁的API来设置、获取和删除Cookie，帮助开发者更方便地在JavaScript应用中处理Cookie相关的操作。

## 功能特性
- **简单易用**: 提供直观的set/get/remove等方法
- **全面支持**: 支持设置有效期、路径、域和安全标志等所有Cookie属性
- **类型安全**: 对特殊字符进行自动编码和解码
- **错误处理**: 合理处理边界情况和异常输入
- **性能优化**: 高效的Cookie操作算法
- **兼容性好**: 兼容各种浏览器环境

## 引入方式

### 方式1: 通过script标签引入
```html
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { dcCookie } from './src/utils/dcCookie.js';
```

## API文档

### set(key, value, expires, path, domain, secure)
设置Cookie。

**参数**:
- `key` (string): Cookie键名
- `value` (string): Cookie值
- `expires` (number | null, 可选): 有效期（天数），0表示会话Cookie，负数表示立即过期，默认为null（会话Cookie）
- `path` (string, 可选): 路径限制，默认为'/'
- `domain` (string, 可选): 域限制，默认为空
- `secure` (boolean, 可选): 是否仅通过HTTPS传输，默认为false

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 设置普通Cookie
dcCookie.set('username', 'john_doe');

// 设置带有效期的Cookie（1天）
dcCookie.set('session_id', 'abc123', 1);

// 设置会话Cookie（关闭浏览器后失效）
dcCookie.set('temp_data', 'value', 0);

// 设置带路径限制的Cookie
dcCookie.set('admin_token', 'secret', null, '/admin');

// 设置带域限制的Cookie
dcCookie.set('site_pref', 'dark', null, '/', 'example.com');

// 设置安全Cookie（仅通过HTTPS传输）
dcCookie.set('secure_token', 'abc123', null, '/', '', true);

// 设置复杂Cookie
dcCookie.set('user_pref', 'lang=zh-CN&theme=dark', 7, '/user', 'example.com', true);
```

### get(key, defaultValue)
获取指定名称的Cookie值。

**参数**:
- `key` (string): 要获取的Cookie键名
- `defaultValue` (any, 可选): 如果Cookie不存在时返回的默认值

**返回值**:
- (string | null): 找到的Cookie值，如果不存在则返回null（如果没有提供默认值）或默认值

**示例**:
```javascript
// 获取存在的Cookie
dcCookie.set('username', 'john_doe');
const username = dcCookie.get('username');
console.log(username); // 输出: john_doe

// 获取不存在的Cookie
dcCookie.remove('nonexistent');
const nonExistent = dcCookie.get('nonexistent');
console.log(nonExistent); // 输出: null

// 获取不存在的Cookie但提供默认值
dcCookie.remove('color');
const color = dcCookie.get('color', 'blue');
console.log(color); // 输出: blue

// 获取包含特殊字符的Cookie
dcCookie.set('special', 'value!@#$%^&*()');
const special = dcCookie.get('special');
console.log(special); // 输出: value!@#$%^&*()

// 获取中文Cookie
dcCookie.set('chinese', '中文测试');
const chinese = dcCookie.get('chinese');
console.log(chinese); // 输出: 中文测试
```

### remove(key, path, domain)
删除指定的Cookie。

**参数**:
- `key` (string): 要删除的Cookie键名
- `path` (string, 可选): 路径限制，必须与设置时一致
- `domain` (string, 可选): 域限制，必须与设置时一致

**返回值**:
- (void): 无返回值

**注意事项**:
- 删除Cookie实际上是设置其过期时间为过去的时间
- 路径和域参数必须与原始设置时完全匹配才能正确删除

**示例**:
```javascript
// 删除普通Cookie
dcCookie.set('temp', 'value');
dcCookie.remove('temp');

// 删除带路径限制的Cookie
dcCookie.set('admin_cookie', 'value', null, '/admin');
dcCookie.remove('admin_cookie', '/admin');

// 删除带域限制的Cookie
dcCookie.set('site_cookie', 'value', null, '/', 'example.com');
dcCookie.remove('site_cookie', '/', 'example.com');

// 尝试删除不存在的Cookie（不会抛出异常）
dcCookie.remove('nonexistent_cookie');
```

### getAll()
获取所有可用的Cookie并返回一个键值对对象。

**参数**: 无

**返回值**:
- (object): 包含所有Cookie的键值对对象

**示例**:
```javascript
// 设置多个Cookie
dcCookie.set('user', 'john');
dcCookie.set('theme', 'dark');
dcCookie.set('language', 'zh-CN');

// 获取所有Cookie
const allCookies = dcCookie.getAll();
console.log(allCookies);
// 输出: {
//   user: 'john',
//   theme: 'dark',
//   language: 'zh-CN'
// }

// 遍历所有Cookie
Object.keys(allCookies).forEach(key => {
    console.log(`${key}: ${allCookies[key]}`);
});
```

### removeAll()
删除所有Cookie。

**参数**: 无

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 设置多个Cookie
dcCookie.set('cookie1', 'value1');
dcCookie.set('cookie2', 'value2');
dcCookie.set('cookie3', 'value3');

// 查看当前所有Cookie
console.log(dcCookie.getAll()); // 有3个Cookie

// 删除所有Cookie
dcCookie.removeAll();

// 再次查看
console.log(dcCookie.getAll()); // 空对象 {}
```

## 使用示例

### 基础使用
```javascript
// 设置用户信息
dcCookie.set('userInfo', JSON.stringify({
    id: 123,
    name: 'Alice',
    email: 'alice@example.com',
    preferences: {
        theme: 'dark',
        language: 'zh-CN'
    }
}), 30); // 30天有效期

// 获取用户信息
const userInfoStr = dcCookie.get('userInfo');
if (userInfoStr) {
    const userInfo = JSON.parse(userInfoStr);
    console.log('欢迎,', userInfo.name);
} else {
    console.log('未找到用户信息，需要重新登录');
}

// 更新部分信息
const updatedUser = { ...userInfo };
updatedUser.preferences.theme = 'light';
dcCookie.set('userInfo', JSON.stringify(updatedUser), 30);

// 用户登出时清除信息
function logout() {
    dcCookie.remove('userInfo');
    window.location.href = '/login';
}
```

### 用户偏好设置
```javascript
// 用户偏好管理器
class UserPreferences {
    constructor(cookieName = 'user_prefs', daysToExpire = 365) {
        this.cookieName = cookieName;
        this.daysToExpire = daysToExpire;
        this.load();
    }
    
    load() {
        const prefsStr = dcCookie.get(this.cookieName);
        this.prefs = prefsStr ? JSON.parse(prefsStr) : {};
    }
    
    save() {
        dcCookie.set(this.cookieName, JSON.stringify(this.prefs), this.daysToExpire);
    }
    
    get(key, defaultValue = null) {
        return this.prefs[key] !== undefined ? this.prefs[key] : defaultValue;
    }
    
    set(key, value) {
        this.prefs[key] = value;
        this.save();
        return this;
    }
    
    remove(key) {
        delete this.prefs[key];
        this.save();
        return this;
    }
    
    clear() {
        this.prefs = {};
        dcCookie.remove(this.cookieName);
        return this;
    }
}

// 使用示例
const prefs = new UserPreferences();

// 设置偏好
prefs
    .set('theme', 'dark')
    .set('language', 'zh-CN')
    .set('fontSize', 14);

// 获取偏好
const theme = prefs.get('theme', 'light');
const language = prefs.get('language', 'en-US');

// 清除特定偏好
prefs.remove('fontSize');
```

### 购物车管理
```javascript
// 购物车管理器
class ShoppingCart {
    constructor(cookieName = 'cart_items', daysToExpire = 7) {
        this.cookieName = cookieName;
        this.daysToExpire = daysToExpire;
        this.items = this.load();
    }
    
    load() {
        const itemsStr = dcCookie.get(this.cookieName);
        return itemsStr ? JSON.parse(itemsStr) : [];
    }
    
    save() {
        dcCookie.set(this.cookieName, JSON.stringify(this.items), this.daysToExpire);
    }
    
    addItem(item) {
        // 检查是否已存在
        const existingItem = this.items.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += item.quantity || 1;
        } else {
            this.items.push({...item, quantity: item.quantity || 1});
        }
        
        this.save();
        return this;
    }
    
    removeItem(itemId) {
        this.items = this.items.filter(i => i.id !== itemId);
        this.save();
        return this;
    }
    
    updateQuantity(itemId, quantity) {
        if (quantity <= 0) {
            this.removeItem(itemId);
        } else {
            const item = this.items.find(i => i.id === itemId);
            if (item) {
                item.quantity = quantity;
                this.save();
            }
        }
        return this;
    }
    
    getTotalCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
    
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    clear() {
        this.items = [];
        dcCookie.remove(this.cookieName);
        return this;
    }
}

// 使用示例
const cart = new ShoppingCart();

// 添加商品
cart.addItem({
    id: 1,
    name: 'iPhone 14',
    price: 999.99,
    quantity: 1
});

cart.addItem({
    id: 2,
    name: 'AirPods',
    price: 199.99,
    quantity: 2
});

// 显示购物车信息
console.log(`商品总数: ${cart.getTotalCount()}`);
console.log(`总价: $${cart.getTotalPrice().toFixed(2)}`);
```

## 注意事项
- **安全性**: Cookie是不安全的存储方式，不要在Cookie中存储敏感信息（如密码、支付信息等）
- **大小限制**: 单个Cookie大小通常不能超过4KB，每个域名下的Cookie总数也有限制
- **跨域限制**: Cookie遵循同源策略，无法跨域访问
- **隐私政策**: 在设置Cookie前，确保遵守相关隐私法规（如GDPR），必要时显示Cookie同意横幅
- **HTTPOnly标志**: `dcCookie`目前不支持设置HTTPOnly标志，这需要服务器端设置
- **性能影响**: 过多的Cookie会影响每次HTTP请求的性能，因为Cookie会随每个请求发送
- **移动端考虑**: 在移动设备上，Cookie的行为可能略有不同，需要充分测试

## 常见问题

**Q: 如何处理Cookie中的特殊字符？**
A: `dcCookie`会自动处理URL编码和解码。当设置包含特殊字符的Cookie时，它会自动进行编码；当获取时，会自动解码：
```javascript
// 特殊字符会自动处理
dcCookie.set('special', 'value with spaces & special chars!');
const value = dcCookie.get('special');
console.log(value); // 'value with spaces & special chars!'

// 中文字符也能正常工作
dcCookie.set('chinese', '中文测试');
const chinese = dcCookie.get('chinese');
console.log(chinese); // '中文测试'
```

**Q: 为什么设置了Cookie却获取不到？**
A: 可能的原因包括：
1. 路径或域设置不匹配
2. 有效期已过期
3. 浏览器禁用了Cookie
4. 安全Cookie在非HTTPS环境下无法设置

解决方法：
```javascript
// 检查是否可以访问document.cookie
if (typeof document.cookie === 'undefined') {
    console.error('无法访问Cookie，可能被浏览器禁用');
}

// 检查具体设置
console.log('当前所有Cookie:', dcCookie.getAll());

// 确保路径和域匹配
// 如果设置时指定了路径或域，删除时也必须指定相同的值
```

**Q: 如何实现跨子域共享Cookie？**
A: 通过设置domain参数：
```javascript
// 在 example.com 下设置，使得 *.example.com 都可以访问
dcCookie.set('token', 'abc123', null, '/', '.example.com');

// 这样 www.example.com, api.example.com, admin.example.com 都可以访问这个Cookie
```

**Q: 如何检测浏览器是否支持Cookie？**
A: 可以通过以下方法检测：
```javascript
function isCookieEnabled() {
    try {
        // 尝试设置一个测试Cookie
        dcCookie.set('test_cookie', 'test_value');
        
        // 尝试读取
        const testValue = dcCookie.get('test_cookie');
        
        // 清理
        dcCookie.remove('test_cookie');
        
        // 返回检测结果
        return testValue === 'test_value';
    } catch (e) {
        return false;
    }
}

// 使用
if (!isCookieEnabled()) {
    alert('您的浏览器不支持或禁用了Cookie，请启用Cookie以获得完整功能');
}
```

**Q: 如何实现Cookie的加密存储？**
A: `dcCookie`本身不提供加密功能，但可以与其他加密库结合使用：
```javascript
// 使用简单的Base64编码（不是真正的加密）
function encrypt(data) {
    return btoa(encodeURIComponent(JSON.stringify(data)));
}

function decrypt(data) {
    return JSON.parse(decodeURIComponent(atob(data)));
}

// 存储时加密
const userData = { id: 123, name: 'Alice' };
dcCookie.set('secure_user', encrypt(userData), 30);

// 读取时解密
try {
    const encryptedData = dcCookie.get('secure_user');
    if (encryptedData) {
        const userData = decrypt(encryptedData);
        console.log('用户数据:', userData);
    }
} catch (error) {
    console.error('解密失败，可能是数据损坏或格式错误');
}

// 注意：对于真正的敏感数据，应该使用专业的加密库和服务器端存储
```

**Q: 如何实现Cookie的同步？**
A: 可以监听storage事件来实现多标签页间的Cookie同步：
```javascript
// 在页面加载时初始化
let lastSyncTime = 0;

// 监听storage事件
window.addEventListener('storage', function(e) {
    // 忽略自己触发的事件
    if (e.key === 'cookie_sync' && e.newValue) {
        try {
            const syncData = JSON.parse(e.newValue);
            
            // 检查时间戳，避免无限循环
            if (syncData.timestamp > lastSyncTime) {
                lastSyncTime = syncData.timestamp;
                
                // 应用其他标签页的更改
                Object.keys(syncData.cookies).forEach(key => {
                    if (syncData.cookies[key] === null) {
                        dcCookie.remove(key);
                    } else {
                        // 解析过期时间等信息
                        const cookieInfo = syncData.cookies[key];
                        dcCookie.set(
                            key, 
                            cookieInfo.value, 
                            cookieInfo.expires, 
                            cookieInfo.path, 
                            cookieInfo.domain, 
                            cookieInfo.secure
                        );
                    }
                });
            }
        } catch (error) {
            console.error('同步数据解析失败:', error);
        }
    }
});

// 同步Cookie更改
function syncCookieChange(key, value, expires, path, domain, secure) {
    const now = Date.now();
    if (now - lastSyncTime < 100) return; // 防抖
    
    lastSyncTime = now;
    
    // 通过localStorage广播更改
    const syncData = {
        timestamp: now,
        cookies: {
            [key]: value === null ? null : {
                value,
                expires,
                path,
                domain,
                secure
            }
        }
    };
    
    localStorage.setItem('cookie_sync', JSON.stringify(syncData));
}

// 包装dcCookie的方法
const originalSet = dcCookie.set;
const originalRemove = dcCookie.remove;

dcCookie.set = function(key, value, expires, path, domain, secure) {
    originalSet.call(this, key, value, expires, path, domain, secure);
    syncCookieChange(key, value, expires, path, domain, secure);
};

dcCookie.remove = function(key, path, domain) {
    originalRemove.call(this, key, path, domain);
    syncCookieChange(key, null, null, path, domain, null);
};
```