# DCMarquee SDK 使用文档

DCMarquee 是一个基于原生 ES6 开发的通用无缝滚动跑马灯工具。它支持四向滚动（左、右、上、下），高度可配置，并且针对移动端进行了深度优化，支持无障碍模式。

## 快速开始

### 1. 引入 SDK

将 `dcmarquee.js` 引入到您的 HTML 页面中：

```html
<script src="dcmarquee.js"></script>
```

### 2. 准备容器

在页面中预留一个 DOM 元素作为跑马灯的挂载容器：

```html
<style>
/* 页面整体重置与背景 */
body {
  margin: 0;
  padding: 20px;
  background-color: #f9f9f9;
  font-family: sans-serif;
}

/* 跑马灯挂载容器的基础样式 */
.my-marquee-container {
  margin-bottom: 30px; /* 多个跑马灯之间的间距 */
  max-width: 800px;    /* 限制最大宽度，防止在大屏上过长 */
  margin-left: auto;
  margin-right: auto;
}

/* 针对垂直滚动（up/down）容器的特殊建议 */
/* 垂直滚动时，建议给容器一个固定的高度，以获得最佳的视觉体验 */
.vertical-marquee-box {
  height: 150px;
  overflow: hidden; /* 隐藏超出固定高度的部分 */
}
</style>

<div id="my-marquee-container"></div>
```

### 3. 初始化实例

使用 `window.DC.Marquee` 进行实例化：

```javascript
const marquee = new window.DC.Marquee({
  container: '#my-marquee-container',
  items: ['前端开发', 'UI设计', '全栈架构', 'DevOps'],
  direction: 'left',
  duration: 15
});
```

---

## 配置参数

在初始化 `new window.DC.Marquee(options)` 时，支持以下配置项：

| 参数名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `container` | `string \| HTMLElement` | `document.body` | 挂载容器的 CSS 选择器或 DOM 元素对象 |
| `items` | `string[]` | `[]` | 需要滚动的文本内容数组 |
| `separator` | `string` | `'✦'` | 文本之间的分隔符 |
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | `'left'` | 滚动方向（left: 从右向左, right: 从左向右, up: 从下向上, down: 从上向下） |
| `duration` | `number` | `22` | 滚动一圈的动画周期（单位：秒） |
| `fontSize` | `string` | `'1.1rem'` | 文本字体大小 |
| `fontWeight` | `string` | `'200'` | 文本字体粗细 |
| `fontFamily` | `string` | `'sans-serif'` | 文本字体族 |
| `textColor` | `string` | `'#666666'` | 文本默认颜色 |
| `hoverColor` | `string` | `'#007bff'` | 鼠标悬停时的文本颜色（仅桌面端生效） |
| `separatorColor` | `string` | `'#ff4081'` | 分隔符颜色 |
| `bgColor` | `string` | `'transparent'` | 跑马灯背景颜色 |
| `borderColor` | `string` | `'#eeeeee'` | 上下边框颜色 |

---

## 实例方法

### 1. 销毁实例 `destroy()`

当组件不再需要时（例如在单页应用切换路由或卸载组件时），调用此方法可以彻底清理 DOM 节点和注入的样式，防止内存泄漏。

```javascript
marquee.destroy();
```

## 高级示例

### 示例 1：移动端从左向右滚动

适用于移动端 Banner 通告，字体较小，滚动速度较快。

```javascript
new window.DC.Marquee({
  container: '#mobile-banner',
  items: [" 新用户注册送 100 元优惠券", " 全站服务器升级完成", " 周末大促即将开始"],
  direction: 'right', // 从左向右
  duration: 10,
  fontSize: '0.9rem',
  textColor: '#333',
  separator: '|',
  bgColor: '#f0f9ff'
});
```

### 示例 2：垂直向上滚动（新闻列表）

适用于侧边栏或新闻快讯，垂直展示多条信息。

```javascript
new window.DC.Marquee({
  container: '#news-ticker',
  items: [
    "公司荣获 2026 年度最佳技术团队奖",
    "新产品线将于下个月正式公测",
    "本周五下午 3 点全员技术分享会"
  ],
  direction: 'up', // 从下向上
  duration: 12,
  fontSize: '1rem',
  fontWeight: '400',
  textColor: '#555',
  separator: '●',
  bgColor: '#fff',
  borderColor: '#ddd'
});
```

## 移动端与无障碍适配

DCMarquee 在设计之初就充分考虑了移动端体验和无障碍访问需求：

### 1. 自动适配触摸设备

SDK 内部使用了 CSS 媒体查询 `@media (hover: hover)`。这意味着鼠标悬停变色（`hoverColor`）和悬停暂停动画的效果**仅在桌面端生效**。在移动端触摸设备上，不会触发奇怪的悬停状态，保证了纯粹的浏览体验。同时，SDK 自动去除了移动端点击时的半透明高亮色块（`-webkit-tap-highlight-color: transparent`）。

### 2. 尊重系统“减弱动态效果”

如果用户在手机或电脑的系统设置中开启了“减弱动态效果”（`prefers-reduced-motion: reduce`），SDK 会自动停止所有滚动动画，将跑马灯变为静态展示。这能有效避免部分用户因连续动画产生眩晕或不适感，符合现代 Web 无障碍（Accessibility）开发标准。

### 3. 性能优化

采用纯 CSS3 `transform` 属性进行动画位移，能够触发浏览器的 GPU 硬件加速，确保在低端移动设备上也能保持 60FPS 的流畅滚动，不会出现页面卡顿或掉帧现象。