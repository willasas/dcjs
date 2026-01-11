# dcbottombar 组件

## 概述
`dcbottombar` 是一个可定制的底部栏组件，用于在网页底部显示固定内容（如版权信息、导航链接、操作按钮等）。它提供了简单的API来控制显示、隐藏和切换状态，支持自定义样式和内容。

## 功能特性
- **固定定位**: 底部栏始终固定在页面底部
- **简单API**: 提供 `init`、`show`、`hide`、`toggle` 方法控制组件
- **自定义样式**: 支持通过CSS类或内联样式自定义外观
- **响应式设计**: 适配不同屏幕尺寸
- **事件支持**: 可以添加自定义事件监听器

## 引入方式

### 方式1: 通过script标签引入
```html
<!-- 引入CSS样式 -->
<link rel="stylesheet" href="dist/dcbottombar.css">

<!-- 引入JavaScript代码 -->
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { DC } from './src/components/dcbottombar/dcbottombar.js';
import './src/components/dcbottombar/dcbottombar.css';
```

## API文档

### init()
初始化底部栏组件，创建必要的DOM元素。

**参数**: 无

**返回值**: 无

**示例**:
```javascript
DC.bottomBar.init();
```

### show()
显示底部栏。

**参数**: 无

**返回值**: 无

**示例**:
```javascript
DC.bottomBar.show();
```

### hide()
隐藏底部栏。

**参数**: 无

**返回值**: 无

**示例**:
```javascript
DC.bottomBar.hide();
```

### toggle()
切换底部栏的显示状态（显示变隐藏，隐藏变显示）。

**参数**: 无

**返回值**: 无

**示例**:
```javascript
DC.bottomBar.toggle();
```

## 使用示例

### 基础使用
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/dcbottombar.css">
</head>
<body>
    <!-- 页面内容 -->
    
    <!-- 引入脚本 -->
    <script src="dist/dc.js"></script>
    <script>
        // 初始化并显示底部栏
        DC.bottomBar.init();
        DC.bottomBar.show();
    </script>
</body>
</html>
```

### 自定义内容
```javascript
// 初始化后自定义内容
DC.bottomBar.init();
DC.bottomBar.show();

// 获取底部栏元素并更新内容
const bottomBar = document.getElementById('dc-bottombar');
if (bottomBar) {
    bottomBar.innerHTML = `
        <div style="display: flex; justify-content: space-between; padding: 0 20px;">
            <span>© 2024 公司名称. 保留所有权利.</span>
            <a href="#privacy">隐私政策</a>
        </div>
    `;
}
```

### 事件处理
```javascript
// 添加点击事件
const bottomBar = document.getElementById('dc-bottombar');
if (bottomBar) {
    bottomBar.addEventListener('click', function() {
        alert('感谢点击底部栏！');
    });
}
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| 高度 | number | 60 | 底部栏的高度（像素） |
| 背景颜色 | string | #333 | 底部栏的背景颜色 |
| 文本颜色 | string | #fff | 底部栏的文本颜色 |
| 显示动画 | boolean | true | 是否启用显示/隐藏动画 |

可以通过CSS覆盖这些默认样式：
```css
#dc-bottombar {
    height: 80px !important;
    background-color: #2c3e50 !important;
    transition: all 0.3s ease;
}
```

## 注意事项
- 确保在调用任何方法之前先调用 `init()` 方法
- 底部栏的z-index为1000，确保它显示在其他内容之上
- 在移动设备上测试时，注意底部栏可能会影响页面滚动
- 如果页面内容较少，底部栏可能会遮挡部分内容，建议在页面底部留出足够的空白

## 常见问题

**Q: 如何修改底部栏的高度？**
A: 可以通过CSS直接设置：
```css
#dc-bottombar {
    height: 80px;
    line-height: 80px; /* 确保文字垂直居中 */
}
```

**Q: 底部栏在某些浏览器中不显示怎么办？**
A: 请检查：
1. 是否正确引入了CSS文件
2. 是否调用了 `init()` 方法
3. 浏览器控制台是否有JavaScript错误
4. CSS选择器是否被其他样式覆盖

**Q: 如何在底部栏中添加动态内容？**
A: 可以通过JavaScript获取底部栏元素并更新其内容：
```javascript
const bottomBar = document.getElementById('dc-bottombar');
if (bottomBar) {
    bottomBar.innerHTML = '新的动态内容';
}
```

**Q: 底部栏影响了页面布局怎么办？**
A: 这是正常现象。底部栏使用fixed定位，会脱离文档流。如果需要调整页面内容，可以在页面底部添加相应的padding-bottom。