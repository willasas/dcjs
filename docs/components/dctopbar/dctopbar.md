# DCTopBar 组件文档

## 1. 组件介绍

DCTopBar 是一个粘性顶部导航栏组件，提供响应式设计和流畅的指示器动画效果，适用于网站的顶部导航菜单。

**主要功能：**
- 响应式设计，适配桌面和移动设备
- 平滑的指示器动画效果
- 支持自定义选项配置
- 默认第一个选项为激活状态
- 点击选项时自动切换激活状态和指示器位置

## 2. 安装和使用

### 2.1 引入文件

```html
<script src="path/to/dctopbar.js"></script>
```

### 2.2 初始化组件

```javascript
const topbar = new DC.TopBar({
  options: [
    { id: 'home', text: '首页' },
    { id: 'about', text: '关于我们' },
    { id: 'services', text: '服务' },
    { id: 'contact', text: '联系我们' }
  ]
});

// 初始化组件
topbar.init();
```

## 3. 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `options` | Array | [] | 顶部栏选项数组，每个选项包含 id 和 text 属性 |

### 3.1 选项配置格式

```javascript
{
  id: 'option-id', // 选项唯一标识符
  text: 'Option Text' // 选项显示文本
}
```

## 4. 方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `init()` | 无 | Promise | 初始化组件，包括渲染界面、创建样式和绑定事件 |
| `render()` | 无 | 无 | 渲染顶部栏按钮 |
| `createStyle()` | 无 | 无 | 创建组件所需的样式 |
| `addClickEventListeners()` | 无 | 无 | 为按钮添加点击事件监听器 |
| `moveIndicator(button)` | button: HTMLElement | 无 | 移动指示器到指定按钮位置 |
| `toggleActiveClass(button)` | button: HTMLElement | 无 | 切换按钮的激活状态 |

## 5. 响应式设计

DCTopBar 组件具有响应式设计，会根据屏幕尺寸自动调整布局：

### 5.1 桌面设备（宽度 > 1024px）
- 水平布局，选项并排显示
- 指示器在选项下方，宽度与选项相同
- 点击选项时，指示器水平移动

### 5.2 移动设备（宽度 ≤ 1024px）
- 垂直布局，选项堆叠显示
- 指示器在选项顶部，高度为4px，宽度100%
- 点击选项时，指示器垂直移动

## 6. 示例代码

### 6.1 基本使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DCTopBar 基本示例</title>
</head>
<body>
    <script src="path/to/dctopbar.js"></script>
    <script>
        const topbar = new DC.TopBar({
            options: [
                { id: 'home', text: '首页' },
                { id: 'about', text: '关于我们' },
                { id: 'services', text: '服务' },
                { id: 'contact', text: '联系我们' }
            ]
        });
        
        topbar.init();
    </script>
</body>
</html>
```

### 6.2 自定义选项

```javascript
const topbar = new DC.TopBar({
  options: [
    { id: 'dashboard', text: '仪表盘' },
    { id: 'settings', text: '设置' },
    { id: 'profile', text: '个人资料' },
    { id: 'help', text: '帮助' },
    { id: 'logout', text: '退出' }
  ]
});

topbar.init();
```

## 7. 样式说明

### 7.1 主要 CSS 类

| CSS 类 | 描述 |
|--------|------|
| `dc-topbar` | 顶部栏容器类 |
| `dc-topbar-btn` | 顶部栏按钮类 |
| `dc-topbar-btn.active` | 激活状态的按钮类 |
| `dc-topbar-indicator` | 指示器元素类 |

### 7.2 样式特点

- 使用 CSS 过渡动画实现平滑的指示器移动效果
- 粘性定位，滚动时保持在顶部
- 使用 CSS 变量，支持主题集成
- 响应式布局，适配不同屏幕尺寸

## 8. 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 9. 注意事项

1. 组件会自动添加到 `document.body` 中
2. 默认第一个选项为激活状态
3. 初始化时会自动创建并注入所需的 CSS 样式
4. 响应式布局会根据屏幕宽度自动调整
5. 点击选项时会触发指示器移动和激活状态切换

## 10. 源码结构

```
src/components/dctopbar/
├── dctopbar.js       # 核心组件实现
├── dctopbar.scss     # 样式文件
└── dctopbar.d.ts     # TypeScript 类型定义
```