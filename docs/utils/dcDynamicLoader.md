# dcDynamicLoader 工具类

## 1. 简介

dcDynamicLoader 是 DCJS 项目中的动态依赖加载器，提供了基于当前脚本路径的依赖加载功能，支持加载 CSS 和 JavaScript 文件，并具有重试机制、超时处理和详细的日志记录。

## 2. 功能特性

- 动态加载 CSS 和 JavaScript 文件
- 基于当前脚本路径的相对路径解析
- 批量依赖加载
- 自动去重（避免重复加载）
- 加载失败时的重试机制
- 加载超时处理
- 详细的日志记录
- 依赖状态管理（检查、获取、卸载）

## 3. 安装与使用

### 3.1 浏览器直接引入
```html
<script src="path/to/dcDynamicLoader.js"></script>
<script>
  // 使用示例
  const loader = new DC.DynamicDependencyLoader();

  // 加载CSS
  loader.loadCSS('style.css')
    .then(() => console.log('CSS加载成功'))
    .catch(error => console.error('CSS加载失败:', error));

  // 加载JavaScript
  loader.loadScript('script.js')
    .then(() => console.log('JavaScript加载成功'))
    .catch(error => console.error('JavaScript加载失败:', error));
</script>
```

### 3.2 模块化引入
```javascript
import * as DCDynamicDependencyLoader from 'path/to/dcDynamicLoader.js';

// 使用示例
const loader = new DCDynamicDependencyLoader();

// 批量加载依赖
loader.loadDependencies([
  'style.css',
  'script.js'
])
  .then(() => console.log('所有依赖加载成功'))
  .catch(error => console.error('依赖加载失败:', error));
```

## 4. API 参考

### 4.1 构造函数

#### DCDynamicDependencyLoader(options)
创建一个新的动态依赖加载器实例。

**参数：**
- `options`：配置选项（可选）
  - `timeout`：加载超时时间（毫秒），默认 10000
  - `retryCount`：加载失败时的重试次数，默认 3
  - `verbose`：是否开启详细日志，默认 false

**返回值：**
- 动态依赖加载器实例

**示例：**
```javascript
// 默认配置
const loader1 = new DC.DynamicDependencyLoader();

// 自定义配置
const loader2 = new DC.DynamicDependencyLoader({
  timeout: 5000,
  retryCount: 2,
  verbose: true
});
```

### 4.2 核心方法

#### loadCSS(url, options)
动态加载 CSS 文件。

**参数：**
- `url`：CSS 文件 URL（支持相对路径）
- `options`：加载选项（可选）
  - `id`：为 link 元素设置的 ID
  - `media`：为 link 元素设置的 media 属性

**返回值：**
- Promise，加载成功时解析，失败时拒绝

**示例：**
```javascript
// 加载CSS文件
loader.loadCSS('styles/main.css')
  .then(linkElement => {
    console.log('CSS加载成功:', linkElement);
  })
  .catch(error => {
    console.error('CSS加载失败:', error);
  });

// 带选项加载
loader.loadCSS('styles/print.css', {
  id: 'print-styles',
  media: 'print'
});
```

#### loadScript(url, options)
动态加载 JavaScript 文件。

**参数：**
- `url`：JavaScript 文件 URL（支持相对路径）
- `options`：加载选项（可选）
  - `id`：为 script 元素设置的 ID
  - `async`：是否异步加载，默认 false
  - `defer`：是否延迟加载，默认 false
  - `charset`：脚本字符集

**返回值：**
- Promise，加载成功时解析，失败时拒绝

**示例：**
```javascript
// 加载JavaScript文件
loader.loadScript('scripts/main.js')
  .then(scriptElement => {
    console.log('JavaScript加载成功:', scriptElement);
  })
  .catch(error => {
    console.error('JavaScript加载失败:', error);
  });

// 异步加载
loader.loadScript('scripts/analytics.js', {
  async: true
});
```

#### loadDependencies(dependencies)
批量加载依赖。

**参数：**
- `dependencies`：依赖列表，支持两种格式：
  - 字符串格式：直接指定文件路径，根据扩展名自动判断类型
  - 对象格式：`{ type: 'css|js', url: 'path/to/file', options: {} }`

**返回值：**
- Promise，所有依赖加载成功时解析，任一失败时拒绝

**示例：**
```javascript
// 批量加载依赖
loader.loadDependencies([
  // 字符串格式
  'styles/main.css',
  'scripts/main.js',

  // 对象格式
  { type: 'css', url: 'styles/theme.css', options: { id: 'theme-styles' } },
  { type: 'js', url: 'scripts/utils.js', options: { async: true } }
])
  .then(() => {
    console.log('所有依赖加载成功');
  })
  .catch(error => {
    console.error('依赖加载失败:', error);
  });
```

#### resolveUrl(url)
解析 URL，处理相对路径。

**参数：**
- `url`：原始 URL

**返回值：**
- 解析后的完整 URL

**示例：**
```javascript
// 解析绝对URL
const absUrl = loader.resolveUrl('https://example.com/style.css');
console.log(absUrl); // 输出: https://example.com/style.css

// 解析相对URL
const relUrl = loader.resolveUrl('styles/main.css');
console.log(relUrl); // 输出: 基础路径 + 'styles/main.css'
```

#### isLoaded(url)
检查依赖是否已加载。

**参数：**
- `url`：资源 URL

**返回值：**
- 布尔值，表示依赖是否已加载

**示例：**
```javascript
if (loader.isLoaded('styles/main.css')) {
  console.log('CSS已加载');
} else {
  console.log('CSS未加载');
}
```

#### getLoadedDependencies()
获取已加载的依赖列表。

**返回值：**
- 已加载依赖的 URL 数组

**示例：**
```javascript
const loaded = loader.getLoadedDependencies();
console.log('已加载的依赖:', loaded);
```

#### unload(url)
卸载依赖。

**参数：**
- `url`：资源 URL

**示例：**
```javascript
// 卸载依赖
loader.unload('styles/main.css');
console.log('CSS已卸载');
```

## 5. 示例代码

### 5.1 基本用法
```javascript
// 初始化加载器
const loader = new DC.DynamicDependencyLoader({
  verbose: true
});

// 加载单个CSS文件
loader.loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css')
  .then(() => {
    console.log('Bootstrap CSS加载成功');
  })
  .catch(error => {
    console.error('Bootstrap CSS加载失败:', error);
  });

// 加载单个JavaScript文件
loader.loadScript('https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js')
  .then(() => {
    console.log('jQuery加载成功');
    // 现在可以使用jQuery
    if (typeof $ !== 'undefined') {
      console.log('jQuery版本:', $.fn.jquery);
    }
  })
  .catch(error => {
    console.error('jQuery加载失败:', error);
  });
```

### 5.2 批量加载
```javascript
// 批量加载多个依赖
loader.loadDependencies([
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
])
  .then(() => {
    console.log('所有依赖加载成功');
    // 现在可以使用Bootstrap和jQuery
    if (typeof $ !== 'undefined' && typeof bootstrap !== 'undefined') {
      console.log('Bootstrap和jQuery都已加载');
    }
  })
  .catch(error => {
    console.error('依赖加载失败:', error);
  });
```

### 5.3 依赖管理
```javascript
// 检查依赖状态
console.log('Bootstrap CSS已加载:', loader.isLoaded('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'));

// 获取已加载的依赖
const loadedDependencies = loader.getLoadedDependencies();
console.log('已加载的依赖数量:', loadedDependencies.length);
loadedDependencies.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

// 卸载依赖
loader.unload('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
console.log('Bootstrap CSS已卸载:', !loader.isLoaded('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'));
```

## 6. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ 支持 |
| Firefox | ✅ 支持 |
| Safari | ✅ 支持 |
| Edge | ✅ 支持 |
| IE 11 | ⚠️ 部分支持（需要 polyfill） |

## 7. 注意事项

1. **路径解析**：相对路径会基于当前脚本的路径进行解析，确保脚本路径正确。
2. **加载顺序**：默认情况下，脚本会按顺序同步加载，如需并行加载，请使用 `async` 选项。
3. **错误处理**：务必为加载 Promise 添加 catch 处理，以避免未捕获的错误。
4. **性能优化**：对于大型应用，建议合理规划依赖加载顺序，避免阻塞页面渲染。
5. **安全考虑**：只从可信来源加载依赖，避免加载未知或恶意脚本。

## 8. 测试用例

测试文件路径：`test/utils/dcDynamicLoader/dcDynamicLoader.test.js`

测试内容包括：
- 加载器初始化测试
- 基础路径获取测试
- URL 解析测试
- CSS 文件加载测试
- JavaScript 文件加载测试
- 批量依赖加载测试
- 依赖状态检查测试
- 依赖卸载测试
- 日志记录测试
- 错误处理测试

## 9. 版本历史

### v1.0.0
- 初始版本，实现了核心依赖加载功能

### v1.0.1
- 修复了相对路径解析的问题
- 优化了加载失败时的错误信息

### v1.1.0
- 添加了批量依赖加载功能
- 增强了错误处理和日志记录
- 优化了重试机制，添加了递增延迟

## 10. 贡献与反馈

如有问题或建议，欢迎提交 Issue 或 Pull Request。

## 11. 相关链接

- [DCJS 项目主页](https://github.com/dcjs/dcjs)
- [示例代码](https://github.com/dcjs/dcjs/tree/master/examples/utils/dcDynamicLoader)
- [测试用例](https://github.com/dcjs/dcjs/tree/master/test/utils/dcDynamicLoader)