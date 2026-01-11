# dcUrl 工具类

## 概述
`dcUrl` 是一个URL处理工具库，提供了一系列实用的URL解析、构建和查询参数处理方法，帮助开发者更方便地在JavaScript应用中处理URL相关的操作。

## 功能特性
- **URL解析**: `parse` 方法可以将完整的URL字符串解析为各个组成部分
- **URL构建**: `build` 方法可以根据部件对象构建完整的URL
- **查询参数处理**: 提供专门的方法来解析和修改查询参数
- **兼容性好**: 支持各种URL格式，包括标准URL、相对路径等
- **错误处理**: 对无效输入进行合理处理，避免程序崩溃
- **性能优化**: 高效的解析和构建算法

## 引入方式

### 方式1: 通过script标签引入
```html
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { dcUrl } from './src/utils/dcUrl.js';
```

## API文档

### parse(url)
将URL字符串解析为包含各部分属性的对象。

**参数**:
- `url` (string): 要解析的URL字符串

**返回值**:
- (object): 包含URL各部分的解析结果对象，可能包含以下属性：
  - `protocol`: 协议（如 'http:' 或 'https:'）
  - `auth`: 认证信息（如 'username:password'）
  - `hostname`: 主机名（如 'www.example.com'）
  - `port`: 端口号（如 '8080'）
  - `pathname`: 路径（如 '/path/to/page'）
  - `search`: 查询字符串（如 '?param=value'）
  - `hash`: 哈希片段（如 '#section'）

**示例**:
```javascript
const url = 'https://username:password@www.example.com:8080/path/to/page?param1=value1&param2=value2#section';
const parsed = dcUrl.parse(url);

console.log(parsed.protocol); // 'https:'
console.log(parsed.auth); // 'username:password'
console.log(parsed.hostname); // 'www.example.com'
console.log(parsed.port); // '8080'
console.log(parsed.pathname); // '/path/to/page'
console.log(parsed.search); // '?param1=value1&param2=value2'
console.log(parsed.hash); // '#section'
```

### build(parts)
根据部件对象构建完整的URL字符串。

**参数**:
- `parts` (object): 包含URL各部分的部件对象，支持以下属性：
  - `protocol`: 协议
  - `auth`: 认证信息
  - `hostname`: 主机名
  - `port`: 端口号
  - `pathname`: 路径
  - `search`: 查询字符串
  - `hash`: 哈希片段

**返回值**:
- (string): 构建完成的URL字符串

**示例**:
```javascript
const parts = {
    protocol: 'https:',
    auth: 'username:password',
    hostname: 'www.example.com',
    port: '8080',
    pathname: '/path/to/page',
    search: '?param1=value1&param2=value2',
    hash: '#section'
};

const built = dcUrl.build(parts);
// 结果: 'https://username:password@www.example.com:8080/path/to/page?param1=value1&param2=value2#section'
```

### getQueryParams(url)
从URL中提取查询参数并返回一个键值对对象。

**参数**:
- `url` (string): 包含查询字符串的URL

**返回值**:
- (object): 包含所有查询参数的键值对对象

**注意事项**:
- 参数值会自动进行URL解码
- 如果同一个参数出现多次，默认取第一个值（具体行为取决于实现）

**示例**:
```javascript
const url = 'https://example.com/page?name=John&age=30&city=New+York';
const params = dcUrl.getQueryParams(url);

console.log(params.name); // 'John'
console.log(params.age); // '30'
console.log(params.city); // 'New York' (空格已正确解码)
```

### addQueryParam(url, paramName, paramValue)
向URL添加或修改查询参数。

**参数**:
- `url` (string): 基础URL
- `paramName` (string): 参数名
- `paramValue` (string): 参数值

**返回值**:
- (string): 添加了新参数的URL字符串

**注意事项**:
- 参数值会自动进行URL编码
- 如果参数名已存在，则会替换原值
- 如果URL没有查询字符串，会自动添加问号

**示例**:
```javascript
// 向没有查询参数的URL添加参数
let url1 = 'https://example.com/page';
url1 = dcUrl.addQueryParam(url1, 'name', 'John');
// 结果: 'https://example.com/page?name=John'

// 向已有查询参数的URL添加新参数
let url2 = 'https://example.com/page?existing=value';
url2 = dcUrl.addQueryParam(url2, 'newParam', 'newValue');
// 结果: 'https://example.com/page?existing=value&newParam=newValue'

// 修改已存在的参数
let url3 = 'https://example.com/page?name=John';
url3 = dcUrl.addQueryParam(url3, 'name', 'Jane');
// 结果: 'https://example.com/page?name=Jane'

// 处理特殊字符
let url4 = 'https://example.com/search';
url4 = dcUrl.addQueryParam(url4, 'q', 'value with spaces & special chars!');
// 结果: 'https://example.com/search?q=value%20with%20spaces%20%26%20special%20chars%21'
```

## 使用示例

### 基础使用
```javascript
// 解析URL
const url = 'https://www.example.com:8080/path/to/page?param1=value1&param2=value2#section';
const parsed = dcUrl.parse(url);
console.log('主机名:', parsed.hostname); // www.example.com
console.log('端口:', parsed.port); // 8080

// 构建URL
const parts = {
    protocol: 'https:',
    hostname: 'api.example.com',
    pathname: '/v1/users',
    search: '?limit=10&offset=0'
};
const apiUrl = dcUrl.build(parts);
console.log('API URL:', apiUrl);

// 处理查询参数
const userUrl = 'https://example.com/profile?user_id=123&tab=settings';
const params = dcUrl.getQueryParams(userUrl);
console.log('用户ID:', params.user_id); // 123

// 添加跟踪参数
const trackingUrl = dcUrl.addQueryParam(userUrl, 'utm_source', 'social');
console.log('跟踪URL:', trackingUrl);
```

### 动态URL构建
```javascript
// 根据配置动态构建API请求URL
function buildApiUrl(endpoint, queryParams = {}, config = {}) {
    const parts = {
        protocol: config.protocol || 'https:',
        hostname: config.hostname || 'api.example.com',
        port: config.port,
        pathname: `/api/v1${endpoint}`
    };
    
    // 构建查询字符串
    if (Object.keys(queryParams).length > 0) {
        const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
        parts.search = `?${queryString}`;
    }
    
    return dcUrl.build(parts);
}

// 使用示例
const usersUrl = buildApiUrl('/users', {
    status: 'active',
    role: 'admin'
}, {
    hostname: 'internal-api.example.com',
    port: '8080'
});

console.log('Users URL:', usersUrl);
// 输出: https://internal-api.example.com:8080/api/v1/users?status=active&role=admin
```

### URL参数管理器
```javascript
// 创建一个URL参数管理器
class UrlParamManager {
    constructor(url = '') {
        this.url = url;
        this.params = {};
        this._parse();
    }
    
    // 解析现有URL的参数
    _parse() {
        if (this.url) {
            this.params = dcUrl.getQueryParams(this.url);
        }
    }
    
    // 获取参数
    get(key, defaultValue = null) {
        return this.params[key] !== undefined ? this.params[key] : defaultValue;
    }
    
    // 设置参数
    set(key, value) {
        this.params[key] = value;
        return this;
    }
    
    // 删除参数
    delete(key) {
        delete this.params[key];
        return this;
    }
    
    // 批量设置参数
    setMultiple(obj) {
        Object.assign(this.params, obj);
        return this;
    }
    
    // 构建最终URL
    build(basePath) {
        let url = basePath || '';
        
        if (Object.keys(this.params).length > 0) {
            const queryString = Object.keys(this.params)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.params[key])}`)
                .join('&');
            
            url += (url.includes('?') ? '&' : '?') + queryString;
        }
        
        return url;
    }
    
    // 更新基础URL
    setUrl(url) {
        this.url = url;
        this._parse();
        return this;
    }
}

// 使用示例
const manager = new UrlParamManager();

manager
    .set('page', 1)
    .set('limit', 20)
    .set('sort', 'name')
    .set('order', 'asc');

const finalUrl = manager.build('/api/users');
console.log('Final URL:', finalUrl);
// 输出: /api/users?page=1&limit=20&sort=name&order=asc
```

## 注意事项
- **安全性**: 在处理用户输入的URL时，需要进行适当的验证和清理，防止XSS攻击
- **编码**: 查询参数的值会自动进行URL编码，但键名不会
- **重复参数**: 当同一参数名出现多次时，`getQueryParams` 的行为可能因实现而异，建议避免使用重复参数名
- **浏览器兼容性**: 虽然大部分现代浏览器都支持，但在旧版本IE中可能存在兼容性问题
- **性能**: 对于大量URL操作，建议缓存解析结果以提高性能
- **相对路径**: 支持相对路径的解析和构建，但在某些场景下可能需要额外处理

## 常见问题

**Q: 如何处理URL中的中文字符？**
A: dcUrl会自动处理URL编码和解码。当使用`addQueryParam`添加包含中文的参数时，它会自动进行URL编码；当使用`getQueryParams`获取参数时，会自动解码。例如：
```javascript
// 添加中文参数
dcUrl.addQueryParam('https://example.com', 'keyword', '中文搜索');
// 结果: 'https://example.com?keyword=%E4%B8%AD%E6%96%87%E6%90%9C%E7%B4%A2'

// 解析时会自动解码
const params = dcUrl.getQueryParams('https://example.com?keyword=%E4%B8%AD%E6%96%87%E6%90%9C%E7%B4%A2');
console.log(params.keyword); // '中文搜索'
```

**Q: 如何判断URL是否有效？**
A: 可以通过解析后的结果来判断：
```javascript
function isValidUrl(url) {
    try {
        const parsed = dcUrl.parse(url);
        // 至少要有主机名或路径
        return !!(parsed.hostname || parsed.pathname);
    } catch (error) {
        return false;
    }
}

console.log(isValidUrl('https://example.com')); // true
console.log(isValidUrl('/path/to/resource')); // true
console.log(isValidUrl('invalid-url')); // false
```

**Q: 如何移除URL中的某个查询参数？**
A: 目前没有直接的remove方法，但可以通过重新构建URL来实现：
```javascript
function removeQueryParam(url, paramName) {
    const parsed = dcUrl.parse(url);
    const params = dcUrl.getQueryParams(url);
    
    // 删除指定参数
    delete params[paramName];
    
    // 重新构建查询字符串
    if (Object.keys(params).length > 0) {
        const queryString = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
        parsed.search = `?${queryString}`;
    } else {
        delete parsed.search;
    }
    
    return dcUrl.build(parsed);
}

// 使用示例
const originalUrl = 'https://example.com/page?param1=value1&param2=value2';
const newUrl = removeQueryParam(originalUrl, 'param1');
// 结果: 'https://example.com/page?param2=value2'
```

**Q: 如何处理哈希路由？**
A: dcUrl可以正常处理包含哈希的URL。对于SPA应用中的哈希路由，可以这样处理：
```javascript
// 解析哈希路由
const url = 'https://example.com/#/users/123?tab=profile';
const parsed = dcUrl.parse(url);
console.log(parsed.hash); // '#/users/123?tab=profile'

// 注意：哈希内部的查询参数不会被单独解析
// 如果需要解析哈希内的查询参数，需要额外处理
function getHashParams(hash) {
    if (!hash) return {};
    
    // 移除开头的#
    const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;
    
    // 查找?的位置
    const queryIndex = cleanHash.indexOf('?');
    if (queryIndex === -1) return {};
    
    // 提取查询字符串部分
    const queryString = cleanHash.substring(queryIndex);
    return dcUrl.getQueryParams(`dummy://${queryString}`);
}

const hashParams = getHashParams(parsed.hash);
console.log(hashParams.tab); // 'profile'
```

**Q: 如何比较两个URL是否相同？**
A: 可以通过解析后比较各部分来实现：
```javascript
function urlsEqual(url1, url2) {
    const parsed1 = dcUrl.parse(url1);
    const parsed2 = dcUrl.parse(url2);
    
    // 比较主要部分
    return parsed1.protocol === parsed2.protocol &&
           parsed1.hostname === parsed2.hostname &&
           parsed1.port === parsed2.port &&
           parsed1.pathname === parsed2.pathname &&
           normalizeSearch(parsed1.search) === normalizeSearch(parsed2.search) &&
           parsed1.hash === parsed2.hash;
}

// 标准化查询字符串（忽略参数顺序）
function normalizeSearch(search) {
    if (!search || search.length <= 1) return '';
    
    const params = search.substring(1).split('&')
        .map(param => param.trim())
        .filter(param => param.length > 0)
        .sort();
    
    return '?' + params.join('&');
}

// 使用示例
console.log(urlsEqual(
    'https://example.com/page?b=2&a=1',
    'https://example.com/page?a=1&b=2'
)); // true
```