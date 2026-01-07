# 动态依赖加载器使用说明

## 概述

`DCDynamicDependencyLoader` 是一个基于 `document.currentScript` 的动态依赖加载器，它可以智能地根据当前脚本路径加载相关的CSS和JavaScript资源。这个工具特别适用于模块化开发、组件库和需要按需加载资源的应用场景。

## 特性

- 基于当前脚本路径自动解析相对路径
- 支持CSS和JavaScript资源的动态加载
- 内置重试机制和超时控制
- 避免重复加载同一资源
- 支持批量加载依赖
- 提供资源卸载功能
- 详细的加载状态跟踪

## 安装与引入

```html
<!-- 直接引入 -->
<script src="path/to/dcDynamicLoader.js"></script>

<!-- 模块化引入 -->
import DynamicDependencyLoader from './src/utils/dcDynamicLoader.js';
```

## 基本用法

### 创建加载器实例

```javascript
// 创建基本实例
const loader = new DC.DynamicDependencyLoader();

// 创建带配置的实例
const loader = new DC.DynamicDependencyLoader({
    timeout: 10000,        // 超时时间（毫秒）
    retryCount: 3,         // 重试次数
    verbose: true          // 是否输出详细日志
});
```

### 加载单个资源

```javascript
// 加载CSS
loader.loadCSS('styles.css')
    .then(() => console.log('CSS加载成功'))
    .catch(error => console.error('CSS加载失败', error));

// 加载JavaScript
loader.loadScript('script.js')
    .then(() => console.log('JS加载成功'))
    .catch(error => console.error('JS加载失败', error));
```

### 批量加载资源

```javascript
// 使用字符串数组，根据扩展名自动识别类型
loader.loadDependencies([
    'styles.css',
    'script.js',
    'theme.css'
]);

// 使用对象数组，明确指定类型和选项
loader.loadDependencies([
    { type: 'css', url: 'styles.css', options: { id: 'main-style' } },
    { type: 'js', url: 'script.js', options: { async: true } },
    { type: 'css', url: 'theme.css', options: { media: 'screen' } }
]);
```

## 高级用法

### 检查资源状态

```javascript
// 检查特定资源是否已加载
if (loader.isLoaded('styles.css')) {
    console.log('CSS已加载');
}

// 获取所有已加载的资源
const loadedResources = loader.getLoadedDependencies();
console.log('已加载的资源:', loadedResources);
```

### 卸载资源

```javascript
// 卸载特定资源
loader.unload('styles.css');

// 卸载后可以重新加载
loader.loadCSS('styles.css');
```

### 自定义加载选项

```javascript
// 加载CSS时指定ID和媒体类型
loader.loadCSS('print.css', {
    id: 'print-styles',
    media: 'print'
});

// 加载JS时指定异步和延迟加载
loader.loadScript('analytics.js', {
    async: true,
    defer: true,
    charset: 'utf-8'
});
```

## 实际应用场景

### 1. 组件库加载器

```javascript
class ComponentLoader extends DC.DynamicDependencyLoader {
    async loadComponent(name) {
        try {
            await this.loadDependencies([
                `components/${name}/${name}.css`,
                `components/${name}/${name}.js`
            ]);
            console.log(`组件 ${name} 加载成功`);
            return true;
        } catch (error) {
            console.error(`组件 ${name} 加载失败:`, error);
            return false;
        }
    }
}

// 使用组件加载器
const componentLoader = new ComponentLoader();
componentLoader.loadComponent('qrcode');
```

### 2. 主题系统

```javascript
class ThemeLoader extends DC.DynamicDependencyLoader {
    async loadTheme(name) {
        // 先卸载当前主题
        const currentTheme = this.getLoadedDependencies().find(dep => dep.includes('theme-'));
        if (currentTheme) {
            this.unload(currentTheme);
        }

        // 加载新主题
        await this.loadCSS(`themes/theme-${name}.css`);
        console.log(`主题 ${name} 加载成功`);
    }
}

// 使用主题加载器
const themeLoader = new ThemeLoader();
themeLoader.loadTheme('dark');
```

### 3. 功能模块按需加载

```javascript
class ModuleLoader extends DC.DynamicDependencyLoader {
    async loadModule(name) {
        if (this.isLoaded(`modules/${name}.js`)) {
            console.log(`模块 ${name} 已加载`);
            return;
        }

        try {
            await this.loadDependencies([
                `modules/${name}/${name}.css`,
                `modules/${name}/${name}.js`
            ]);

            // 初始化模块
            if (window[name] && typeof window[name].init === 'function') {
                window[name].init();
            }

            console.log(`模块 ${name} 加载并初始化成功`);
        } catch (error) {
            console.error(`模块 ${name} 加载失败:`, error);
        }
    }
}

// 使用模块加载器
const moduleLoader = new ModuleLoader();

// 按需加载模块
document.getElementById('load-chart').addEventListener('click', () => {
    moduleLoader.loadModule('chart');
});
```

## API 参考

### 构造函数选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| timeout | number | 10000 | 资源加载超时时间（毫秒） |
| retryCount | number | 3 | 加载失败时的重试次数 |
| verbose | boolean | false | 是否输出详细日志 |

### 方法

#### loadCSS(url, options)

加载CSS文件。

**参数:**
- `url` (string): CSS文件URL
- `options` (object, 可选): 加载选项
  - `id` (string): 样式元素ID
  - `media` (string): 媒体查询

**返回:** Promise

#### loadScript(url, options)

加载JavaScript文件。

**参数:**
- `url` (string): JavaScript文件URL
- `options` (object, 可选): 加载选项
  - `id` (string): 脚本元素ID
  - `async` (boolean): 是否异步加载
  - `defer` (boolean): 是否延迟加载
  - `charset` (string): 字符编码

**返回:** Promise

#### loadDependencies(dependencies)

批量加载依赖资源。

**参数:**
- `dependencies` (Array): 依赖列表，可以是字符串数组或对象数组

**返回:** Promise

#### isLoaded(url)

检查资源是否已加载。

**参数:**
- `url` (string): 资源URL

**返回:** boolean

#### getLoadedDependencies()

获取所有已加载的资源列表。

**返回:** Array

#### unload(url)

卸载已加载的资源。

**参数:**
- `url` (string): 资源URL

## 注意事项

1. **路径解析**: 加载器会基于当前脚本路径解析相对路径，确保正确设置脚本位置。

2. **缓存机制**: 已加载的资源会被缓存，避免重复加载。

3. **错误处理**: 加载失败时会自动重试，超过重试次数后才会抛出错误。

4. **浏览器兼容性**: 需要支持 `document.currentScript` 属性的浏览器（IE11+）。

5. **CORS限制**: 加载跨域资源时，确保服务器配置了正确的CORS头。

## 示例

完整示例请参考 `test/dynamic-loader-demo.html` 文件，其中包含了基本用法、高级用法和实际应用场景的演示。

## 版本历史

- v1.0.0: 初始版本，支持基本的CSS和JavaScript动态加载功能