# DCDesignBy 组件文档

## 概述

DCDesignBy 是一个用于展示设计相关项目或类别的组件，它以卡片形式展示每个设计项目，包含图标和名称。该组件支持自定义数据、响应式布局和悬停效果。

## 功能特性

- 以卡片形式展示设计项目
- 支持自定义图标和名称
- 响应式布局，自动适应不同屏幕尺寸
- 悬停效果，增强用户交互体验
- 简单易用的 API
- 支持空数据处理

## 安装和引入

### 直接引入

```html
<script src="path/to/designby.js"></script>
```

### 模块化引入

```javascript
const DCDesignBy = require('path/to/designby');
```

## 基本用法

```javascript
// 创建设计数据
const designData = [
    {
        name: 'UI Design',
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 16H48V48H16V16Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 32H48" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M32 16V48" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>'
    },
    {
        name: 'Web Development',
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18L24 6L38 18L52 6V48L38 36L24 48L10 36V18Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 6V48" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M38 18V36" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>'
    }
    // 更多设计项目...
];

// 初始化组件
const designBy = new DC.DesignBy('#container', designData);
```

## API 参考

### 构造函数

```javascript
new DC.DesignBy(targetSelector, data);
```

#### 参数

- `targetSelector` (String, 可选): 目标元素的选择器，默认为 'body'
- `data` (Array, 可选): 设计数据数组，默认为空数组

#### 数据结构

`data` 数组中的每个对象应包含以下属性：

- `name` (String): 设计项目的名称
- `icon` (String): 设计项目的图标，支持 SVG 字符串

### 方法

#### init()

初始化组件，调用 render() 和 createCss() 方法。

#### render()

渲染组件结构，根据提供的数据创建 DOM 元素。

#### createCss()

创建并应用组件所需的 CSS 样式。

## 样式说明

组件会自动创建以下 CSS 样式：

- `.designby-list`: 容器样式，使用 flex 布局
- `.designby-item`: 单个设计项目的样式
- `.designby-icon`: 图标容器样式，包含悬停效果
- `.designby-text`: 文本样式

样式使用 CSS 自定义属性（如 `--bg-theme-200`）进行主题化，确保与整体设计风格一致。

## 响应式设计

组件使用 `flex-wrap: wrap` 和 `gap` 属性实现响应式布局，在不同屏幕尺寸下会自动调整布局：

- 大屏幕：多列布局
- 中等屏幕：减少列数
- 小屏幕：单列布局

## 示例

### 示例 1: 基本用法

```javascript
const designData = [
    {
        name: 'UI Design',
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 16H48V48H16V16Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 32H48" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M32 16V48" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>'
    },
    {
        name: 'Web Development',
        icon: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18L24 6L38 18L52 6V48L38 36L24 48L10 36V18Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 6V48" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M38 18V36" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>'
    }
];

const designBy = new DC.DesignBy('#designby-container', designData);
```

### 示例 2: 空数据

```javascript
// 初始化时不提供数据
const emptyDesignBy = new DC.DesignBy('#empty-container', []);
```

### 示例 3: 默认参数

```javascript
// 使用默认参数，会将组件添加到 body 元素
const defaultDesignBy = new DC.DesignBy();
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 性能优化

- 使用文档片段减少 DOM 操作
- 优化 CSS 选择器
- 支持大量设计项目的渲染

## 错误处理

- 当目标元素不存在时，组件会继续执行，但可能无法正确渲染
- 当数据数组为空时，组件会创建空的容器
- 当设计列表元素不存在时，组件会输出错误信息到控制台

## 扩展和定制

### 自定义样式

可以通过覆盖 CSS 变量来自定义组件样式：

```css
:root {
    --bg-theme-50: #f5f5f5;
    --bg-theme-100: #e0e0e0;
    --bg-theme-200: #bdbdbd;
    --font-theme-950: #212121;
}
```

### 自定义图标

可以使用任何 SVG 图标作为设计项目的图标，确保图标尺寸适合容器。

## 测试

组件包含完整的测试用例，测试文件位于 `test/components/designby/designby.test.js`，涵盖以下测试场景：

- 初始化测试
- 渲染测试
- CSS 创建测试
- 空数据测试
- 目标元素不存在测试
- 设计列表元素不存在测试
- 默认参数测试
- 详细渲染测试
- 类名和内容设置测试

## 总结

DCDesignBy 组件是一个功能强大、易于使用的设计项目展示组件，它提供了以下特性：

- 简洁美观的卡片式布局
- 支持自定义图标和名称
- 响应式设计，适应不同屏幕尺寸
- 平滑的悬停效果
- 易于集成和扩展
- 完整的测试覆盖

该组件适用于展示设计服务、设计作品集或任何需要以卡片形式展示的项目列表。