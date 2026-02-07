# DC.Screenshot 工具类使用说明

## 1. 概述

DC.Screenshot 是一个截图工具类，提供了网页截图功能，支持全屏截图、元素截图、区域截图等多种截图方式，以及水印添加、插件系统等扩展功能。

## 2. 安装与引入

### 2.1 浏览器端引入

```html
<!-- 在 HTML 文件中引入 DCJS 库 -->
<script src="path/to/dc.min.js"></script>
```

### 2.2 使用示例

```javascript
// 创建截图实例
const screenshot = new DC.Screenshot();

// 捕获元素截图
screenshot.capture(document.getElementById('main-content'))
  .then(image => {
    // 显示截图
    document.body.appendChild(image);
  })
  .catch(error => {
    console.error('截图失败:', error);
  });

// 捕获全屏截图
screenshot.captureFullPage()
  .then(image => {
    // 下载截图
    screenshot.download(image, 'full-page');
  });
```

## 3. 核心方法

- `capture(source)` - 捕获指定源的截图
- `captureFullPage()` - 捕获整个页面的截图
- `captureElement(element)` - 捕获指定元素的截图
- `captureRegion(region)` - 捕获指定区域的截图
- `toCanvas(source)` - 将源转换为 Canvas 元素
- `toBlob(source)` - 将源转换为 Blob 对象
- `toDataURL(source)` - 将源转换为 DataURL
- `toSVG(source)` - 将源转换为 SVG 元素
- `download(source, filename)` - 下载截图
- `addPlugin(plugin)` - 添加插件
- `removePlugin(pluginName)` - 移除插件

## 4. 静态方法

- `toPng(source, options)` - 将源转换为 PNG 图片
- `toJpg(source, options)` - 将源转换为 JPG 图片
- `toWebp(source, options)` - 将源转换为 WebP 图片
- `download(source, options)` - 直接下载源的截图

## 5. 注意事项

- 支持现代浏览器（Chrome、Firefox、Safari、Edge）
- 不支持 IE 浏览器
- 全屏截图可能会消耗较多内存，特别是对于长页面
- 如果页面中包含跨域图片，可能会导致截图失败或图片无法显示