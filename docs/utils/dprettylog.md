# dprettylog 工具类文档

## 1. 简介

dprettylog 是一个美化日志输出的工具类，提供了多种日志级别和特殊功能，使控制台日志更加美观和易读。

### 主要功能
- 支持多种日志级别（info、error、warning、success），每种级别有不同的颜色标识
- 提供表格形式的日志输出，便于查看结构化数据
- 支持图片日志，可在控制台中显示图片预览
- 提供环境信息检测功能，可显示当前浏览器环境详情
- 所有日志均包含时间戳，便于追踪日志产生的时间

## 2. 安装和使用

### 2.1 直接引入

```html
<script src="path/to/dprettylog.js"></script>
<script>
  // 使用全局实例
  DC.PrettyLog.info('Hello, world!');
  
  // 或使用局部变量
  const logger = DC.PrettyLog;
  logger.success('Operation completed successfully!');
</script>
```

### 2.2 模块化引入

```javascript
// ES6 模块引入
import dprettylog from './path/to/dprettylog.js';

// CommonJS 模块引入
const dprettylog = require('./path/to/dprettylog.js');

// 使用
const logger = dprettylog;
logger.info('Hello, world!');
```

## 3. API 参考

### 3.1 基本日志方法

#### `info(message)`
- **参数**：
  - `message` (string): 日志消息内容
- **返回值**：无
- **描述**：输出信息级别的日志，显示为灰色

#### `error(message)`
- **参数**：
  - `message` (string): 日志消息内容
- **返回值**：无
- **描述**：输出错误级别的日志，显示为红色

#### `warning(message)`
- **参数**：
  - `message` (string): 日志消息内容
- **返回值**：无
- **描述**：输出警告级别的日志，显示为橙色

#### `success(message)`
- **参数**：
  - `message` (string): 日志消息内容
- **返回值**：无
- **描述**：输出成功级别的日志，显示为绿色

### 3.2 特殊功能方法

#### `table(data)`
- **参数**：
  - `data` (Array): 要显示为表格的数据数组，每个元素应为对象
- **返回值**：无
- **描述**：以表格形式输出数据，自动提取列名

#### `picture(url, scale, color)`
- **参数**：
  - `url` (string): 图片的 URL 地址
  - `scale` (number, 可选): 图片的缩放比例，默认为 1
  - `color` (string, 可选): 图片信息的颜色，默认为信息级别的颜色
- **返回值**：无
- **描述**：在控制台中显示图片的详细信息和预览

#### `environment()`
- **参数**：无
- **返回值**：无
- **描述**：显示当前浏览器环境的详细信息，包括浏览器名称、版本和用户代理字符串

## 4. 使用示例

### 4.1 基本日志示例

```javascript
// 输出不同级别的日志
DC.PrettyLog.info('这是一条信息日志');
DC.PrettyLog.success('操作成功完成');
DC.PrettyLog.warning('这是一条警告信息');
DC.PrettyLog.error('发生了错误');
```

### 4.2 表格日志示例

```javascript
// 输出表格数据
const users = [
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 28, city: '广州' }
];
DC.PrettyLog.table(users);
```

### 4.3 图片日志示例

```javascript
// 输出图片日志
DC.PrettyLog.picture('https://via.placeholder.com/150', 0.5);
```

### 4.4 环境信息示例

```javascript
// 输出环境信息
DC.PrettyLog.environment();
```

## 5. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ 完全支持 |
| Firefox | ✅ 完全支持 |
| Safari | ✅ 完全支持 |
| Edge | ✅ 完全支持 |
| IE 11 | ❌ 不支持 |

## 6. 注意事项

1. **控制台输出**：所有日志输出都会显示在浏览器控制台中，需要打开开发者工具查看
2. **图片日志**：图片日志功能依赖于 Canvas API，某些浏览器可能不支持
3. **环境检测**：环境检测功能基于 navigator.userAgent，可能不够准确
4. **性能考虑**：频繁使用图片日志可能会影响性能，建议仅在必要时使用

## 7. 代码示例

### 7.1 完整使用示例

```javascript
// 初始化日志工具
const logger = DC.PrettyLog;

// 1. 基本日志
logger.info('应用启动');
try {
  // 执行某些操作
  logger.success('操作成功');
} catch (error) {
  logger.error(`操作失败: ${error.message}`);
}

// 2. 表格日志
const products = [
  { id: 1, name: '产品A', price: 100 },
  { id: 2, name: '产品B', price: 200 },
  { id: 3, name: '产品C', price: 300 }
];
logger.table(products);

// 3. 图片日志
logger.picture('https://example.com/logo.png');

// 4. 环境信息
logger.environment();
```

### 7.2 实际应用场景

#### 场景1：API 调用日志

```javascript
async function fetchData(url) {
  logger.info(`开始请求 API: ${url}`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    logger.success(`API 请求成功，返回 ${data.length} 条数据`);
    return data;
  } catch (error) {
    logger.error(`API 请求失败: ${error.message}`);
    throw error;
  }
}
```

#### 场景2：用户操作跟踪

```javascript
function trackUserAction(action, details) {
  logger.info(`用户执行操作: ${action}`);
  if (details) {
    logger.table([details]);
  }
}

// 调用示例
trackUserAction('登录', { username: 'user123', timestamp: new Date().toISOString() });
trackUserAction('购买', { productId: 'p123', amount: 2, totalPrice: 200 });
```

## 8. 总结

dprettylog 工具类提供了丰富的日志功能，不仅支持基本的日志级别，还提供了表格日志、图片日志和环境信息等特殊功能，使控制台日志更加美观和实用。通过使用 dprettylog，可以提高开发和调试效率，使日志信息更加清晰易读。

无论是在开发环境还是生产环境，dprettylog 都能为您提供良好的日志记录体验，帮助您更好地理解和调试应用程序。