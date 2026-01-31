# dcHttps 网络请求工具类文档

## 1. 简介

dcHttps 是一个简化网络请求的工具类，基于浏览器原生的 Fetch API，提供了简洁的方法来发起 GET 和 POST 请求。它封装了常见的网络请求操作，包括请求配置、响应处理和错误捕获，使网络请求更加易用和可靠。

### 主要功能
- 简化的 GET 请求方法，自动处理响应解析
- 简化的 POST 请求方法，支持 JSON 数据发送
- 统一的错误处理机制
- 详细的错误日志输出
- 基于现代的 Fetch API
- 支持 Promise 链式调用

### 应用场景
- 与 RESTful API 交互
- 提交表单数据
- 获取远程数据
- 任何需要网络请求的前端应用

## 2. 安装和使用

### 2.1 直接引入

```html
<script src="path/to/dchttps.js"></script>
<script>
  // 使用示例
  async function fetchData() {
    try {
      const data = await DC.Https.get('https://api.example.com/data');
      console.log('获取数据成功:', data);
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  }
  
  fetchData();
</script>
```

### 2.2 模块化引入

```javascript
// ES6 模块引入
import dcHttps from './path/to/dchttps.js';

// CommonJS 模块引入
const dcHttps = require('./path/to/dchttps.js');

// 使用示例
async function submitData() {
  try {
    const response = await dcHttps.post('https://api.example.com/submit', {
      name: 'John',
      email: 'john@example.com'
    });
    console.log('提交数据成功:', response);
  } catch (error) {
    console.error('提交数据失败:', error);
  }
}

submitData();
```

## 3. API 参考

### 3.1 get 方法

```javascript
dcHttps.get(url)
```

#### 参数
- `url` (string): 请求的 URL 地址

#### 返回值
- `Promise<Object>`: 返回解析后的 JSON 数据

#### 示例

```javascript
// 基本用法
const data = await dcHttps.get('https://api.example.com/users');

// 带查询参数
const userData = await dcHttps.get('https://api.example.com/users?id=123');
```

### 3.2 post 方法

```javascript
dcHttps.post(url, data)
```

#### 参数
- `url` (string): 请求的 URL 地址
- `data` (Object): 要发送的数据，会被转换为 JSON 格式

#### 返回值
- `Promise<Object>`: 返回解析后的 JSON 数据

#### 示例

```javascript
// 基本用法
const response = await dcHttps.post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// 发送复杂数据
const orderResponse = await dcHttps.post('https://api.example.com/orders', {
  userId: 123,
  items: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 }
  ],
  total: 99.99
});
```

## 4. 错误处理

### 4.1 错误类型

dcHttps 会捕获并抛出以下类型的错误：

1. **网络错误**：当网络连接失败时抛出
2. **HTTP 错误**：当服务器返回非 200 状态码时抛出
3. **解析错误**：当响应无法解析为 JSON 时抛出

### 4.2 错误处理示例

```javascript
// 基本错误处理
async function fetchData() {
  try {
    const data = await dcHttps.get('https://api.example.com/data');
    console.log('成功:', data);
  } catch (error) {
    console.error('失败:', error.message);
    // 处理错误
  }
}

// 详细错误处理
async function submitForm() {
  try {
    const response = await dcHttps.post('https://api.example.com/submit', formData);
    console.log('提交成功:', response);
    // 显示成功消息
  } catch (error) {
    console.error('提交失败:', error);
    
    // 根据错误类型显示不同的错误消息
    if (error.message.includes('401')) {
      console.error('未授权，请登录');
    } else if (error.message.includes('404')) {
      console.error('请求的资源不存在');
    } else if (error.message.includes('Network')) {
      console.error('网络连接失败，请检查网络设置');
    } else {
      console.error('未知错误，请稍后重试');
    }
  }
}
```

## 5. 使用示例

### 5.1 基本 GET 请求

```javascript
// 获取用户列表
async function getUsers() {
  try {
    const users = await DC.Https.get('https://jsonplaceholder.typicode.com/users');
    console.log('用户列表:', users);
    
    // 渲染用户列表
    users.forEach(user => {
      console.log(`${user.id}: ${user.name} (${user.email})`);
    });
  } catch (error) {
    console.error('获取用户列表失败:', error);
  }
}

// 调用函数
getUsers();
```

### 5.2 基本 POST 请求

```javascript
// 创建新帖子
async function createPost() {
  try {
    const postData = {
      title: '新帖子标题',
      body: '帖子内容...',
      userId: 1
    };
    
    const response = await DC.Https.post('https://jsonplaceholder.typicode.com/posts', postData);
    console.log('创建帖子成功:', response);
    console.log('新帖子 ID:', response.id);
  } catch (error) {
    console.error('创建帖子失败:', error);
  }
}

// 调用函数
createPost();
```

### 5.3 链式调用示例

```javascript
// 先获取用户，再获取用户的帖子
async function getUserWithPosts() {
  try {
    // 获取用户信息
    const user = await DC.Https.get('https://jsonplaceholder.typicode.com/users/1');
    console.log('用户信息:', user);
    
    // 获取用户的帖子
    const posts = await DC.Https.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    console.log('用户帖子:', posts);
    
    // 处理数据
    console.log(`${user.name} 共有 ${posts.length} 个帖子`);
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

// 调用函数
getUserWithPosts();
```

### 5.4 实际应用示例

```javascript
// 登录功能
async function login(username, password) {
  try {
    const response = await DC.Https.post('https://api.example.com/login', {
      username,
      password
    });
    
    // 保存 token
    localStorage.setItem('token', response.token);
    console.log('登录成功');
    return response.user;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
}

// 获取用户资料
async function getUserProfile() {
  try {
    const token = localStorage.getItem('token');
    
    // 注意：实际应用中，需要在请求头中添加认证信息
    // 这里为了简化，使用了查询参数的方式
    const profile = await DC.Https.get(`https://api.example.com/profile?token=${token}`);
    console.log('用户资料:', profile);
    return profile;
  } catch (error) {
    console.error('获取用户资料失败:', error);
    throw error;
  }
}

// 使用示例
async function initApp() {
  try {
    // 登录
    const user = await login('admin', 'password123');
    console.log('欢迎:', user.name);
    
    // 获取用户资料
    const profile = await getUserProfile();
    console.log('邮箱:', profile.email);
    console.log('头像:', profile.avatar);
  } catch (error) {
    console.error('应用初始化失败:', error);
  }
}

// 初始化应用
initApp();
```

## 6. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ 完全支持 |
| Firefox | ✅ 完全支持 |
| Safari | ✅ 完全支持 |
| Edge | ✅ 完全支持 |
| IE 11 | ❌ 不支持（需要 Fetch API  polyfill） |
| iOS Safari | ✅ 完全支持 |
| Android Chrome | ✅ 完全支持 |

### 6.1 兼容性说明

dcHttps 基于浏览器原生的 Fetch API，因此需要浏览器支持 Fetch API。对于不支持 Fetch API 的浏览器（如 IE 11），需要使用 polyfill 来提供兼容支持。

### 6.2 添加 Fetch API Polyfill

```html
<!-- 引入 Fetch API polyfill -->
<script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3.6.2/dist/fetch.umd.min.js"></script>

<!-- 然后引入 dcHttps -->
<script src="path/to/dchttps.js"></script>
```

## 7. 性能优化

### 7.1 请求优化建议

1. **使用适当的缓存策略**：对于不经常变化的数据，考虑使用浏览器缓存
2. **减少请求次数**：合并多个请求，使用批量 API
3. **压缩数据**：确保服务器端启用了 GZIP 压缩
4. **使用 CDN**：对于静态资源，使用 CDN 加速
5. **避免不必要的请求**：在发起请求前检查数据是否已经存在

### 7.2 代码优化建议

1. **使用 async/await**：比 Promise 链式调用更简洁易读
2. **合理使用 try/catch**：只捕获必要的错误
3. **避免在循环中发起请求**：使用 Promise.all 并行处理多个请求
4. **添加请求超时**：防止请求无限期挂起

```javascript
// 并行处理多个请求
async function fetchMultipleData() {
  try {
    const [users, posts, comments] = await Promise.all([
      DC.Https.get('https://api.example.com/users'),
      DC.Https.get('https://api.example.com/posts'),
      DC.Https.get('https://api.example.com/comments')
    ]);
    
    console.log('用户数:', users.length);
    console.log('帖子数:', posts.length);
    console.log('评论数:', comments.length);
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}
```

## 8. 扩展功能

### 8.1 添加请求超时

```javascript
// 添加超时功能的封装
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('请求超时');
    }
    throw error;
  }
}

// 使用示例
async function fetchWithTimeoutExample() {
  try {
    const data = await fetchWithTimeout('https://api.example.com/data', {}, 5000);
    console.log('成功:', data);
  } catch (error) {
    console.error('失败:', error.message);
  }
}
```

### 8.2 添加请求头

```javascript
// 添加请求头的封装
async function fetchWithHeaders(url, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// 使用示例
async function fetchWithAuth() {
  try {
    const data = await fetchWithHeaders('https://api.example.com/protected');
    console.log('成功:', data);
  } catch (error) {
    console.error('失败:', error.message);
  }
}
```

## 9. 常见问题

### 9.1 CORS 跨域问题

**问题**：发起请求时出现 "CORS policy" 错误

**解决方案**：
- 确保服务器端正确配置了 CORS 头
- 对于开发环境，可以使用代理服务器
- 对于公共 API，检查是否提供了 JSONP 或其他跨域解决方案

### 9.2 401 未授权错误

**问题**：发起请求时返回 401 状态码

**解决方案**：
- 确保提供了正确的认证信息（如 token）
- 检查认证信息是否过期
- 确保用户有足够的权限访问请求的资源

### 9.3 404 资源不存在错误

**问题**：发起请求时返回 404 状态码

**解决方案**：
- 检查请求 URL 是否正确
- 确保 API 端点存在
- 检查路径参数是否正确

### 9.4 网络连接失败

**问题**：出现 "Network error" 或 "Failed to fetch" 错误

**解决方案**：
- 检查网络连接是否正常
- 确保服务器正在运行
- 检查防火墙设置
- 尝试访问其他网站确认网络连接

### 9.5 JSON 解析错误

**问题**：出现 "Unexpected token in JSON at position 0" 错误

**解决方案**：
- 确保服务器返回的是有效的 JSON 格式
- 检查 API 文档，确认返回格式
- 对于非 JSON 响应，需要使用不同的解析方法

## 10. 总结

dcHttps 是一个轻量级但功能强大的网络请求工具类，它简化了基于 Fetch API 的网络请求操作，使开发者能够更专注于业务逻辑而不是网络请求的细节。

通过提供简洁的 `get` 和 `post` 方法，dcHttps 大大减少了重复代码，同时保持了足够的灵活性来处理各种网络请求场景。它的错误处理机制确保了即使在网络不稳定的情况下，应用也能优雅地处理错误。

无论是构建简单的表单提交还是复杂的单页应用，dcHttps 都能为您提供可靠的网络请求支持，帮助您的应用与后端服务无缝集成。