# DC.Screenshot 工具类使用说明

## 概述

DC.Screenshot 是一个强大的前端截图工具类，支持全页面截图、元素截图、区域截图等多种截图方式，并提供水印、格式转换、质量控制等高级功能。

## 功能特性

- 支持全页面截图
- 支持指定元素截图
- 支持指定区域截图
- 支持多种图片格式（PNG、JPEG、WebP）
- 支持自定义水印
- 支持质量控制
- 支持跨域图片处理
- 提供性能监控
- 完善的错误处理

## 基本用法

### 1. 引入工具类

```html
<script src="dist/dc.js"></script>
```

### 2. 创建截图实例

```javascript
// 使用默认配置
const screenshot = new DC.Screenshot();

// 使用自定义配置
const screenshot = new DC.Screenshot({
    format: 'png',      // 图片格式：'png', 'jpeg', 'webp'
    quality: 0.8,       // 图片质量：0-1，仅对JPEG和WebP有效
    useCORS: true,      // 是否启用跨域
    watermark: {        // 水印配置
        text: 'DC.Screenshot',
        position: 'bottom-right',  // 水印位置：'top-left', 'top-right', 'bottom-left', 'bottom-right'
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16
    }
});
```

## API 参考

### 构造函数

```javascript
new DC.Screenshot(options)
```

参数：
- `options` (Object): 可选配置对象

配置选项：
- `format` (String): 图片格式，默认为 'png'，可选值：'png', 'jpeg', 'webp'
- `quality` (Number): 图片质量，范围 0-1，默认为 0.8，仅对 JPEG 和 WebP 格式有效
- `useCORS` (Boolean): 是否启用跨域，默认为 false
- `watermark` (Object): 水印配置，默认不添加水印
  - `text` (String): 水印文本
  - `position` (String): 水印位置，默认为 'bottom-right'
  - `color` (String): 水印颜色，默认为 'rgba(255, 255, 255, 0.7)'
  - `fontSize` (Number): 水印字体大小，默认为 16

### 方法

#### captureFullPage()

捕获整个页面的截图。

```javascript
screenshot.captureFullPage()
    .then(result => {
        // 处理截图结果
    })
    .catch(error => {
        // 处理错误
    });
```

返回值：
- 返回一个 Promise，解析为 DCScreenshotResult 对象

#### captureElement(element)

捕获指定元素的截图。

```javascript
const element = document.getElementById('my-element');
screenshot.captureElement(element)
    .then(result => {
        // 处理截图结果
    })
    .catch(error => {
        // 处理错误
    });
```

参数：
- `element` (HTMLElement): 要截图的 DOM 元素

返回值：
- 返回一个 Promise，解析为 DCScreenshotResult 对象

#### captureRegion(x, y, width, height)

捕获指定区域的截图。

```javascript
screenshot.captureRegion(100, 100, 400, 300)
    .then(result => {
        // 处理截图结果
    })
    .catch(error => {
        // 处理错误
    });
```

参数：
- `x` (Number): 区域左上角的 X 坐标
- `y` (Number): 区域左上角的 Y 坐标
- `width` (Number): 区域宽度
- `height` (Number): 区域高度

返回值：
- 返回一个 Promise，解析为 DCScreenshotResult 对象

#### updateConfig(newOptions)

更新截图配置。

```javascript
screenshot.updateConfig({
    format: 'jpeg',
    quality: 0.9
});
```

参数：
- `newOptions` (Object): 新的配置选项

#### addPlugin(plugin)

添加插件。

```javascript
const customPlugin = {
    name: 'customPlugin',
    beforeCapture: function(options) {
        // 截图前处理
        return options;
    },
    afterCapture: function(result, options) {
        // 截图后处理
        return result;
    }
};

screenshot.addPlugin(customPlugin);
```

参数：
- `plugin` (Object): 插件对象，必须包含 name 属性

#### removePlugin(pluginName)

移除插件。

```javascript
screenshot.removePlugin('customPlugin');
```

参数：
- `pluginName` (String): 要移除的插件名称

#### getPerformanceMetrics()

获取性能指标。

```javascript
const metrics = screenshot.getPerformanceMetrics();
console.log('截图次数:', metrics.captureCount);
console.log('平均耗时:', metrics.averageTime);
console.log('总耗时:', metrics.totalTime);
```

返回值：
- 返回一个包含性能指标的对象

## DCScreenshotResult 对象

所有截图方法返回的 Promise 都会解析为一个 DCScreenshotResult 对象，包含以下属性：

- `success` (Boolean): 截图是否成功
- `dataUrl` (String): 截图的 Data URL
- `width` (Number): 截图宽度
- `height` (Number): 截图高度
- `format` (String): 图片格式
- `size` (Number): 图片大小（字节）
- `error` (String): 错误信息（仅在失败时存在）

## 使用示例

### 基本全页面截图

```javascript
const screenshot = new DC.Screenshot();

screenshot.captureFullPage()
    .then(result => {
        if (result.success) {
            // 创建图片元素显示截图
            const img = document.createElement('img');
            img.src = result.dataUrl;
            document.body.appendChild(img);

            console.log('截图尺寸:', result.width + 'x' + result.height);
            console.log('文件大小:', (result.size / 1024).toFixed(2) + ' KB');
        } else {
            console.error('截图失败:', result.error);
        }
    })
    .catch(error => {
        console.error('截图过程中发生错误:', error);
    });
```

### 元素截图

```javascript
const screenshot = new DC.Screenshot();
const element = document.getElementById('my-element');

screenshot.captureElement(element)
    .then(result => {
        if (result.success) {
            // 下载截图
            const link = document.createElement('a');
            link.download = 'element-screenshot.png';
            link.href = result.dataUrl;
            link.click();
        } else {
            console.error('元素截图失败:', result.error);
        }
    })
    .catch(error => {
        console.error('元素截图过程中发生错误:', error);
    });
```

### 区域截图

```javascript
const screenshot = new DC.Screenshot();

// 截图页面左上角 400x300 的区域
screenshot.captureRegion(0, 0, 400, 300)
    .then(result => {
        if (result.success) {
            // 上传截图到服务器
            fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: result.dataUrl
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('上传成功:', data);
            })
            .catch(error => {
                console.error('上传失败:', error);
            });
        } else {
            console.error('区域截图失败:', result.error);
        }
    })
    .catch(error => {
        console.error('区域截图过程中发生错误:', error);
    });
```

### 带水印的截图

```javascript
const screenshot = new DC.Screenshot({
    format: 'png',
    watermark: {
        text: '我的水印',
        position: 'bottom-right',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16
    }
});

screenshot.captureFullPage()
    .then(result => {
        if (result.success) {
            // 显示带水印的截图
            const img = document.createElement('img');
            img.src = result.dataUrl;
            document.body.appendChild(img);
        } else {
            console.error('带水印截图失败:', result.error);
        }
    })
    .catch(error => {
        console.error('带水印截图过程中发生错误:', error);
    });
```

### 高质量 JPEG 截图

```javascript
const screenshot = new DC.Screenshot({
    format: 'jpeg',
    quality: 0.9
});

screenshot.captureFullPage()
    .then(result => {
        if (result.success) {
            // 显示高质量 JPEG 截图
            const img = document.createElement('img');
            img.src = result.dataUrl;
            document.body.appendChild(img);

            console.log('JPEG 文件大小:', (result.size / 1024).toFixed(2) + ' KB');
        } else {
            console.error('JPEG 截图失败:', result.error);
        }
    })
    .catch(error => {
        console.error('JPEG 截图过程中发生错误:', error);
    });
```

### 使用插件扩展功能

```javascript
const screenshot = new DC.Screenshot();

// 添加一个插件，在截图前添加加载动画
const loadingPlugin = {
    name: 'loadingPlugin',
    beforeCapture: function(options) {
        // 显示加载动画
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'screenshot-loading';
        loadingDiv.style.position = 'fixed';
        loadingDiv.style.top = '0';
        loadingDiv.style.left = '0';
        loadingDiv.style.width = '100%';
        loadingDiv.style.height = '100%';
        loadingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        loadingDiv.style.color = 'white';
        loadingDiv.style.display = 'flex';
        loadingDiv.style.alignItems = 'center';
        loadingDiv.style.justifyContent = 'center';
        loadingDiv.style.fontSize = '24px';
        loadingDiv.style.zIndex = '9999';
        loadingDiv.textContent = '正在截图...';
        document.body.appendChild(loadingDiv);

        return options;
    },
    afterCapture: function(result, options) {
        // 移除加载动画
        const loadingDiv = document.getElementById('screenshot-loading');
        if (loadingDiv) {
            document.body.removeChild(loadingDiv);
        }

        return result;
    }
};

screenshot.addPlugin(loadingPlugin);

// 使用插件进行截图
screenshot.captureFullPage()
    .then(result => {
        if (result.success) {
            const img = document.createElement('img');
            img.src = result.dataUrl;
            document.body.appendChild(img);
        } else {
            console.error('带插件截图失败:', result.error);
        }
    })
    .catch(error => {
        console.error('带插件截图过程中发生错误:', error);
    });
```

## 注意事项

1. **浏览器兼容性**：DC.Screenshot 依赖于 HTML5 Canvas API，现代浏览器都支持此功能。

2. **跨域图片**：如果页面包含跨域图片，需要设置 `useCORS: true` 并确保服务器返回正确的 CORS 头。

3. **性能考虑**：全页面截图可能会消耗较多资源，特别是对于大型页面。建议在必要时使用，并考虑使用区域截图作为替代方案。

4. **水印位置**：水印会添加在截图的边缘，确保水印不会遮挡重要内容。

5. **图片格式**：
   - PNG：无损压缩，适合需要保持图片质量的场景
   - JPEG：有损压缩，适合照片类内容，文件较小
   - WebP：现代格式，提供更好的压缩率，但兼容性不如 PNG 和 JPEG

6. **错误处理**：始终检查 `result.success` 属性，并处理可能的错误情况。

## 版本历史

- v1.0.0: 初始版本，支持基本截图功能
- v1.1.0: 添加水印支持
- v1.2.0: 添加插件系统
- v1.3.0: 添加性能监控
- v1.4.0: 添加 WebP 格式支持

## 许可证

MIT License