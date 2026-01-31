# DCTheme 组件文档

## 1. 组件介绍

DCTheme 是一个功能强大的主题切换组件，支持多种内置主题和自定义主题，通过 CSS 自定义属性实现主题样式的动态切换。

**主要功能：**
- 支持 12 种内置主题（浅色、深色、灰色、红色、粉色、橙色、黄色、绿色、靛蓝、蓝色、紫色、多彩）
- 支持自定义主题配置
- 实时主题切换效果
- 响应式设计，适配不同屏幕尺寸
- 主题切换回调函数
- 完整的 API 控制方法

## 2. 安装和使用

### 2.1 引入文件

```html
<script src="path/to/dctheme.js"></script>
```

### 2.2 初始化组件

```javascript
const theme = new DC.Theme({
  container: document.getElementById('theme-container'), // 可选，默认添加到body
  defaultTheme: 'light-theme', // 默认主题
  onThemeChange: function(themeName) {
    console.log('主题已切换为:', themeName);
  }
});
```

## 3. 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | String/HTMLElement | null | 主题容器元素，不传则默认添加到body |
| `themes` | Array | 内置12种主题 | 自定义主题列表 |
| `defaultTheme` | String | 'light-theme' | 默认主题名称 |
| `onThemeChange` | Function | null | 主题切换回调函数 |

### 3.1 主题配置格式

```javascript
{
  name: 'theme-name', // 主题名称
  value: 'theme-value' // 主题值
}
```

## 4. API 方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `setTheme(themeName)` | themeName: String | 无 | 设置指定主题 |
| `getCurrentTheme()` | 无 | String | 获取当前主题名称 |
| `show()` | 无 | 无 | 显示主题切换组件 |
| `hide()` | 无 | 无 | 隐藏主题切换组件 |

## 5. 内置主题

| 主题名称 | 主题值 | 描述 |
|---------|--------|------|
| `light-theme` | light | 浅色主题 |
| `dark-theme` | dark | 深色主题 |
| `grey-theme` | grey | 灰色主题 |
| `red-theme` | red | 红色主题 |
| `pink-theme` | pink | 粉色主题 |
| `orange-theme` | orange | 橙色主题 |
| `yellow-theme` | yellow | 黄色主题 |
| `green-theme` | green | 绿色主题 |
| `indigo-theme` | indigo | 靛蓝主题 |
| `blue-theme` | blue | 蓝色主题 |
| `purple-theme` | purple | 紫色主题 |
| `colorful-theme` | colorful | 多彩主题 |

## 6. CSS 自定义属性

DCTheme 组件通过 CSS 自定义属性（CSS Variables）实现主题样式，以下是主要的自定义属性：

| 自定义属性 | 描述 |
|-----------|------|
| `--color-primary-border` | 主边框颜色 |
| `--color-primary` | 主颜色 |
| `--color-primary-font` | 主字体颜色 |
| `--color-primary-bg` | 主背景颜色 |
| `--bg-inherit` | 继承背景 |
| `--bg-current` | 当前背景 |
| `--bg-transparent` | 透明背景 |
| `--bg-black` | 黑色背景 |
| `--bg-white` | 白色背景 |
| `--bg-theme-50` | 主题浅色背景 |
| `--bg-theme-100` | 主题背景 100 |
| `--bg-theme-200` | 主题背景 200 |
| `--bg-theme-300` | 主题背景 300 |
| `--bg-theme-400` | 主题背景 400 |
| `--bg-theme-500` | 主题背景 500 |
| `--bg-theme-600` | 主题背景 600 |
| `--bg-theme-700` | 主题背景 700 |
| `--bg-theme-800` | 主题背景 800 |
| `--bg-theme-900` | 主题背景 900 |
| `--bg-theme-950` | 主题深色背景 |
| `--font-theme-50` | 主题浅色字体 |
| `--font-theme-100` | 主题字体 100 |
| `--font-theme-200` | 主题字体 200 |
| `--font-theme-300` | 主题字体 300 |
| `--font-theme-400` | 主题字体 400 |
| `--font-theme-500` | 主题字体 500 |
| `--font-theme-600` | 主题字体 600 |
| `--font-theme-700` | 主题字体 700 |
| `--font-theme-800` | 主题字体 800 |
| `--font-theme-900` | 主题字体 900 |
| `--font-theme-950` | 主题深色字体 |
| `--bg-theme-gradient` | 主题渐变背景 |

## 7. 示例代码

### 7.1 基本使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DCTheme 基本示例</title>
    <style>
        body {
            background-color: var(--bg-theme-50, #fafafa);
            color: var(--font-theme-900, #000);
            transition: all 0.3s ease;
        }

        .container {
            max-width: 600px;
            margin: 100px auto;
            padding: 20px;
            background-color: var(--bg-theme-100, #f4f4f5);
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>DCTheme 基本示例</h1>
        <p>尝试通过顶部的主题选择器切换不同的主题。</p>
    </div>

    <script src="path/to/dctheme.js"></script>
    <script>
        const theme = new DC.Theme();
    </script>
</body>
</html>
```

### 7.2 自定义主题

```javascript
const customThemes = [
  { name: 'my-light', value: 'my-light' },
  { name: 'my-dark', value: 'my-dark' }
];

const theme = new DC.Theme({
  themes: customThemes,
  defaultTheme: 'my-light',
  onThemeChange: function(themeName) {
    console.log('主题已切换为:', themeName);
  }
});
```

### 7.3 API 控制

```html
<div class="controls">
  <button onclick="setTheme('light-theme')">浅色主题</button>
  <button onclick="setTheme('dark-theme')">深色主题</button>
  <button onclick="showTheme()">显示主题选择器</button>
  <button onclick="hideTheme()">隐藏主题选择器</button>
  <button onclick="getCurrentTheme()">获取当前主题</button>
</div>

<script>
  const theme = new DC.Theme();

  function setTheme(themeName) {
    theme.setTheme(themeName);
  }

  function showTheme() {
    theme.show();
  }

  function hideTheme() {
    theme.hide();
  }

  function getCurrentTheme() {
    const currentTheme = theme.getCurrentTheme();
    alert('当前主题: ' + currentTheme);
  }
</script>
```

## 8. 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 9. 注意事项

1. DCTheme 组件会自动创建并注入必要的 CSS 样式
2. 主题切换会触发 `onThemeChange` 回调函数
3. 自定义主题需要确保在 CSS 中定义了相应的变量
4. 组件默认添加到 `body` 元素，也可以指定自定义容器
5. 响应式设计会根据屏幕尺寸自动调整主题选择器的大小

## 10. 源码结构

```
src/components/dctheme/
├── dctheme.js       # 核心组件实现
├── dctheme.scss     # 样式文件
└── dctheme.d.ts     # TypeScript 类型定义
```