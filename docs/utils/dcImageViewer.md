# DCImageViewer 工具类文档

## 1. 工具类介绍

DCImageViewer 是一个功能强大的图片预览和下载工具类，类似 viewerjs 的功能，支持图片预览、放大、缩小、旋转、翻转、下载等操作。该工具类提供了美观的界面和丰富的配置选项，可根据不同需求进行自定义。

### 主要特性

- 支持图片预览和画廊功能
- 支持鼠标和触摸操作
- 支持放大、缩小、旋转、翻转等操作
- 支持键盘快捷键
- 支持图片下载
- 响应式设计，适配不同屏幕尺寸
- 丰富的配置选项
- 优雅的动画效果
- 支持回调函数

## 2. 快速开始

### 安装

将工具类文件引入到您的项目中：

```html
<!-- 引入工具类脚本 -->
<script src="path/to/dcImageViewer.js"></script>
```

### 基本使用

```html
<!-- HTML 结构 -->
<div id="image-gallery">
    <img src="path/to/image1.jpg" alt="图片 1" title="美丽的风景">
    <img src="path/to/image2.jpg" alt="图片 2" title="城市夜景">
    <img src="path/to/image3.jpg" alt="图片 3" title="海滩日落">
</div>

<script>
// 初始化查看器
const viewer = new DC.ImageViewer({
    container: '#image-gallery', // 图片容器选择器
    navbar: true,                 // 显示导航栏
    toolbar: true,                // 显示工具栏
    title: true,                  // 显示标题
    button: true,                 // 显示按钮
    backdrop: true,               // 显示背景
    keyboard: true,               // 启用键盘支持
    loading: true,                // 显示加载状态
    transition: true,             // 启用过渡动画
    fullscreen: true,             // 支持全屏
    zoomRatio: 0.1,               // 缩放比例
    minZoomRatio: 0.1,             // 最小缩放比例
    maxZoomRatio: 10,              // 最大缩放比例
    rotateRatio: 90,               // 旋转角度
    tooltip: true,                // 显示工具提示
    movable: true,                // 可移动
    zoomable: true,                // 可缩放
    rotatable: true,               // 可旋转
    scalable: true,                // 可翻转
    transitionDuration: 0.3,       // 过渡动画时长
    zIndex: 2015,                  // z-index
    buttonSize: 'medium',          // 按钮大小
    navbarButtonSize: 'medium',    // 导航栏按钮大小
    toolbarButtonSize: 'medium',    // 工具栏按钮大小
    navbarTooltip: true,           // 导航栏提示
    toolbarTooltip: true,          // 工具栏提示
    imageTitle: true,              // 图片标题
    functionButton: true,          // 功能按钮
    zoomIn: true,                  // 放大
    zoomOut: true,                 // 缩小
    oneToOne: true,                // 原始大小
    reset: true,                   // 重置
    prev: true,                    // 上一张
    play: true,                    // 播放
    next: true,                    // 下一张
    rotateLeft: true,              // 向左旋转
    rotateRight: true,             // 向右旋转
    flipHorizontal: true,          // 水平翻转
    flipVertical: true,            // 垂直翻转
    download: true,                // 下载
    close: true                    // 关闭
});
</script>
```

## 3. API 参考

### 构造函数

```javascript
new DC.ImageViewer(options)
```

#### 参数

- `options` (Object): 配置选项

#### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | StringElement | document.body | 图片容器选择器或DOM元素 |
| `modal` | Boolean | true | 是否启用模态框模式 |
| `navbar` | Boolean | true | 是否显示导航栏 |
| `toolbar` | Boolean | true | 是否显示工具栏 |
| `title` | Boolean | true | 是否显示标题 |
| `button` | Boolean | true | 是否显示关闭按钮 |
| `animated` | Boolean | true | 是否启用动画效果 |
| `backdrop` | BooleanString | true | 背景，设为'static'时点击背景不关闭 |
| `keyboard` | Boolean | true | 是否启用键盘支持 |
| `initialZoomRatio` | Number | 1 | 初始缩放比例 |
| `minZoomRatio` | Number | 0.1 | 最小缩放比例 |
| `maxZoomRatio` | Number | 10 | 最大缩放比例 |
| `viewed` | Function | null | 图片查看回调 |
| `shown` | Function | null | 查看器显示回调 |
| `hidden` | Function | null | 查看器隐藏回调 |
| `rotated` | Function | null | 图片旋转回调 |
| `zoomed` | Function | null | 图片缩放回调 |

### 方法

#### `open(index)`

打开查看器并显示指定索引的图片。

**参数**:
- `index` (Number): 图片索引，默认为 0

**示例**:
```javascript
viewer.open(2); // 打开第三张图片
```

#### `close()`

关闭查看器。

**示例**:
```javascript
viewer.close();
```

#### `goTo(index)`

跳转到指定索引的图片。

**参数**:
- `index` (Number): 图片索引

**示例**:
```javascript
viewer.goTo(1); // 跳转到第二张图片
```

#### `prev()`

显示上一张图片。

**示例**:
```javascript
viewer.prev();
```

#### `next()`

显示下一张图片。

**示例**:
```javascript
viewer.next();
```

#### `zoomIn()`

放大图片。

**示例**:
```javascript
viewer.zoomIn();
```

#### `zoomOut()`

缩小图片。

**示例**:
```javascript
viewer.zoomOut();
```

#### `rotateLeft()`

向左旋转图片。

**示例**:
```javascript
viewer.rotateLeft();
```

#### `rotateRight()`

向右旋转图片。

**示例**:
```javascript
viewer.rotateRight();
```

#### `flipHorizontal()`

水平翻转图片。

**示例**:
```javascript
viewer.flipHorizontal();
```

#### `flipVertical()`

垂直翻转图片。

**示例**:
```javascript
viewer.flipVertical();
```

#### `reset()`

重置图片状态（缩放、旋转、翻转）。

**示例**:
```javascript
viewer.reset();
```

#### `download()`

下载当前图片。

**示例**:
```javascript
viewer.download();
```

#### `destroy()`

销毁查看器实例，清理事件监听器和DOM元素。

**示例**:
```javascript
viewer.destroy();
```

## 4. 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Escape` | 关闭查看器 |
| `ArrowLeft` | 上一张图片 |
| `ArrowRight` | 下一张图片 |
| `+` / `=` | 放大图片 |
| `-` | 缩小图片 |
| `0` | 重置图片 |
| `r` | 向右旋转图片 |
| `l` | 向左旋转图片 |
| `f` | 水平翻转图片 |

## 5. 使用示例

### 示例1: 基本图片画廊

```html
<div id="basic-gallery">
    <img src="https://picsum.photos/id/1/800/600" alt="图片 1" title="山脉风景">
    <img src="https://picsum.photos/id/2/800/600" alt="图片 2" title="海滩">
    <img src="https://picsum.photos/id/3/800/600" alt="图片 3" title="森林">
    <img src="https://picsum.photos/id/4/800/600" alt="图片 4" title="城市">
    <img src="https://picsum.photos/id/5/800/600" alt="图片 5" title="湖泊">
</div>

<script>
// 初始化基本画廊
const basicGallery = new DC.ImageViewer({
    container: '#basic-gallery',
    title: true,
    navbar: true,
    toolbar: true
});
</script>
```

### 示例2: 自定义配置

```html
<div id="custom-gallery">
    <img src="https://picsum.photos/id/10/800/600" alt="图片 1">
    <img src="https://picsum.photos/id/11/800/600" alt="图片 2">
    <img src="https://picsum.photos/id/12/800/600" alt="图片 3">
</div>

<script>
// 自定义配置
const viewer = new DC.ImageViewer({
    container: '#custom-gallery',
    navbar: true,
    toolbar: true,
    title: true,
    button: true,
    backdrop: 'static', // 点击背景不关闭
    keyboard: true,
    loading: true,
    transition: true,
    fullscreen: true,
    zoomRatio: 0.2,
    minZoomRatio: 0.5,
    maxZoomRatio: 5,
    rotateRatio: 45,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transitionDuration: 0.5,
    zIndex: 1000,
    buttonSize: 'large',
    navbarButtonSize: 'large',
    toolbarButtonSize: 'large',
    navbarTooltip: true,
    toolbarTooltip: true,
    imageTitle: true,
    functionButton: true,
    zoomIn: true,
    zoomOut: true,
    oneToOne: true,
    reset: true,
    prev: true,
    play: true,
    next: true,
    rotateLeft: true,
    rotateRight: true,
    flipHorizontal: true,
    flipVertical: true,
    download: true,
    close: true,
    // 回调函数
    viewed: function() {
        console.log('图片已查看');
    },
    shown: function() {
        console.log('查看器已显示');
    },
    hidden: function() {
        console.log('查看器已隐藏');
    },
    rotated: function() {
        console.log('图片已旋转');
    },
    zoomed: function() {
        console.log('图片已缩放');
    },
    played: function() {
        console.log('幻灯片已播放');
    },
    stopped: function() {
        console.log('幻灯片已停止');
    },
    flipped: function() {
        console.log('图片已翻转');
    },
    dragged: function() {
        console.log('图片已拖动');
    },
    clicked: function() {
        console.log('查看器已点击');
    },
    ready: function() {
        console.log('查看器已就绪');
    },
    destroy: function() {
        console.log('查看器已销毁');
    }
});
</script>
```

### 示例3: 单个图片预览

```html
<div id="single-image">
    <img src="https://picsum.photos/id/20/1200/800" alt="单个图片" title="美丽的风景">
</div>

<script>
// 初始化单个图片预览
const singleImage = new DC.ImageViewer({
    container: '#single-image',
    navbar: false, // 单个图片不需要导航栏
    toolbar: true,
    title: true
});
</script>
```

### 示例4: 禁用工具栏

```html
<div id="no-toolbar-gallery">
    <img src="https://picsum.photos/id/30/800/600" alt="图片 1">
    <img src="https://picsum.photos/id/31/800/600" alt="图片 2">
    <img src="https://picsum.photos/id/32/800/600" alt="图片 3">
</div>

<script>
// 初始化禁用工具栏的画廊
const noToolbarGallery = new DC.ImageViewer({
    container: '#no-toolbar-gallery',
    toolbar: false, // 禁用工具栏
    navbar: true,
    title: true
});
</script>
```

## 6. 样式定制

DCImageViewer 使用内联样式，您可以通过以下方式进行定制：

### 1. 通过配置选项定制

```javascript
const viewer = new DC.ImageViewer({
    container: '#gallery',
    // 其他配置...
});
```

### 2. 通过 CSS 覆盖定制

您可以通过覆盖以下 CSS 类来自定义样式：

```css
/* 查看器容器 */
.dc-image-viewer {
    /* 自定义样式 */
}

/* 背景 */
.dc-image-viewer-backdrop {
    /* 自定义样式 */
}

/* 图片容器 */
.dc-image-viewer-container {
    /* 自定义样式 */
}

/* 图片 */
.dc-image-viewer-image {
    /* 自定义样式 */
}

/* 导航栏 */
.dc-image-viewer-navbar {
    /* 自定义样式 */
}

/* 导航按钮 */
.dc-image-viewer-nav-button {
    /* 自定义样式 */
}

/* 工具栏 */
.dc-image-viewer-toolbar {
    /* 自定义样式 */
}

/* 工具栏按钮 */
.dc-image-viewer-toolbar-button {
    /* 自定义样式 */
}

/* 标题 */
.dc-image-viewer-title {
    /* 自定义样式 */
}

/* 关闭按钮 */
.dc-image-viewer-close {
    /* 自定义样式 */
}
```

## 7. 浏览器兼容性

| 浏览器 | 版本 | 支持情况 |
|--------|------|----------|
| Chrome | 60+ | ✅ 完全支持 |
| Firefox | 55+ | ✅ 完全支持 |
| Safari | 12+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| IE | 11 | ⚠️ 部分支持（可能缺少一些动画效果） |

## 8. 常见问题

### Q: 如何添加更多图片到已初始化的查看器？

A: 目前 DCImageViewer 初始化后不支持动态添加图片。如果需要添加图片，您需要重新初始化查看器。

```javascript
// 重新初始化查看器
const newViewer = new DC.ImageViewer({
    container: '#gallery',
    // 配置选项...
});
```

### Q: 如何获取当前查看的图片信息？

A: 您可以在回调函数中获取查看器实例，然后访问其属性：

```javascript
const viewer = new DC.ImageViewer({
    container: '#gallery',
    viewed: function(viewer) {
        console.log('当前图片索引:', viewer.currentIndex);
        console.log('当前图片:', viewer.images[viewer.currentIndex]);
    }
});
```

### Q: 如何禁用特定的工具栏按钮？

A: 目前 DCImageViewer 不支持单独禁用特定的工具栏按钮。您可以通过 CSS 隐藏特定按钮：

```css
/* 隐藏下载按钮 */
#dc-image-viewer-download {
    display: none;
}
```

### Q: 如何自定义下载文件名？

A: 目前 DCImageViewer 使用图片 URL 中的文件名作为下载文件名。如果需要自定义，您可以修改工具类中的 `getFileNameFromUrl` 方法。

### Q: 如何实现图片懒加载？

A: DCImageViewer 本身不包含图片懒加载功能，但您可以与其他懒加载库配合使用。确保在初始化 DCImageViewer 之前，所有需要预览的图片都已经加载完成。

## 9. 性能优化

### 1. 图片数量

建议一个查看器中不要包含过多图片（建议不超过 50 张），否则可能会影响性能。

### 2. 图片大小

建议使用适当大小的图片，过大的图片可能会导致加载缓慢。

### 3. 按需初始化

只在需要时初始化查看器，避免页面加载时初始化多个查看器。

### 4. 销毁不需要的实例

当不需要使用查看器时，调用 `destroy()` 方法销毁实例，释放资源。

```javascript
// 销毁查看器实例
viewer.destroy();
```

## 10. 总结

DCImageViewer 是一个功能强大、界面美观的图片预览和下载工具类，它提供了：

- ✅ 完整的图片预览和画廊功能
- ✅ 丰富的图片操作（放大、缩小、旋转、翻转）
- ✅ 图片下载功能
- ✅ 键盘快捷键支持
- ✅ 优雅的动画效果
- ✅ 丰富的配置选项
- ✅ 响应式设计

通过使用本工具类，您可以为用户提供专业、流畅的图片浏览体验，提升网站的整体质量。

## 11. 版本历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| 1.0.0 | 2024-01-01 | 初始版本 |
| 1.0.1 | 2024-01-15 | 修复图片旋转bug |
| 1.1.0 | 2024-02-01 | 添加垂直翻转功能 |
| 1.1.1 | 2024-02-15 | 优化动画效果和性能 |

## 12. 贡献指南

如果您发现任何问题或有改进建议，请随时提交 issue 或 pull request。

### 开发环境设置

1. 克隆仓库
2. 安装依赖：`npm install`
3. 运行开发服务器：`npm run dev`
4. 运行测试：`npm run test`

### 代码规范

- 遵循 ES6 语法规范
- 使用 2 空格缩进
- 文件名使用小写字母，单词之间用连字符连接
- 类名使用 PascalCase 命名规范
- 方法和变量名使用 camelCase 命名规范

## 13. 许可证

本工具类采用 MIT 许可证，详情请查看 LICENSE 文件。