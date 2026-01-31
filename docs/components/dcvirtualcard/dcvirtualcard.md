# DCVirtualCard 组件文档

## 1. 组件介绍

DCVirtualCard 是一个功能丰富的虚拟卡片组件，支持多种主题样式和交互功能，适用于展示虚拟信用卡、会员卡等卡片信息。

**主要功能：**
- 支持 8 种预设主题样式
- 卡号格式化显示（每 4 位数字插入空格）
- 点击卡号复制到剪贴板功能
- 双击卡片翻转效果
- 响应式设计，适配不同设备
- 自定义卡片信息

## 2. 安装和使用

### 2.1 引入文件

```html
<script src="path/to/dcvirtualcard.js"></script>
```

### 2.2 初始化组件

```javascript
const card = new DC.VirtualCard({
  virtualName: 'Virtual',
  virtualDesc: 'Virtual Card',
  logoUrl: 'https://assets.codepen.io/14762/airwallex-virtual.svg',
  cardNumber: '6230567800123456828',
  cardId: '00211',
  cardName: 'Mike Trilford',
  silkLogoUrl: 'https://assets.codepen.io/14762/visa-virtual.svg',
  theme: 'one',
  targetElement: document.getElementById('card-container')
});
```

## 3. 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `virtualName` | String | 'Virtual' | 虚拟卡名称 |
| `virtualDesc` | String | 'Virtual Card' | 虚拟卡描述 |
| `logoUrl` | String | 'https://assets.codepen.io/14762/airwallex-virtual.svg' | 卡片标志URL |
| `cardNumber` | String | '6230 5678 0012 3456 828' | 卡号，会自动格式化 |
| `cardId` | String | '00211' | 卡片ID |
| `cardName` | String | 'Mike Trilford' | 持卡人姓名 |
| `silkLogoUrl` | String | 'https://assets.codepen.io/14762/visa-virtual.svg' | 支付系统标志URL |
| `theme` | String | 'one' | 卡片主题，可选值：'one' 到 'eight' |
| `targetElement` | HTMLElement | document.body | 卡片渲染的目标元素 |

## 4. 方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `init()` | 无 | 无 | 初始化组件，包括注入样式、渲染卡片和绑定事件 |
| `render()` | 无 | 无 | 渲染卡片元素 |
| `renderHeader()` | 无 | String | 渲染卡片头部HTML |
| `renderFooter()` | 无 | String | 渲染卡片底部HTML |
| `injectStyles()` | 无 | 无 | 注入卡片样式 |
| `getCardStyles()` | 无 | String | 获取卡片样式字符串 |
| `bindEvents()` | 无 | 无 | 绑定事件监听器 |
| `toggleCard()` | 无 | 无 | 切换卡片翻转状态 |
| `formatCardNumber(number)` | number: String | String | 格式化卡号，每4位插入空格 |
| `copyCardNumber()` | 无 | 无 | 复制卡号到剪贴板 |
| `legacyCopy(text)` | text: String | 无 | 使用传统方法复制文本 |
| `showFeedback()` | 无 | 无 | 显示复制成功反馈 |
| `handleCopyError(err)` | err: Error | 无 | 处理复制错误 |
| `destroy()` | 无 | 无 | 销毁组件，清理事件和DOM元素 |

## 5. 主题样式

DCVirtualCard 提供 8 种预设主题样式：

| 主题名称 | 描述 |
|---------|------|
| `one` | 主题 1（默认） |
| `two` | 主题 2 |
| `three` | 主题 3 |
| `four` | 主题 4 |
| `five` | 主题 5 |
| `six` | 主题 6 |
| `seven` | 主题 7 |
| `eight` | 主题 8 |

## 6. 交互功能

### 6.1 点击卡号
- 点击卡号会将卡号复制到剪贴板
- 显示 "✓ Copied!" 成功提示
- 支持现代浏览器的 Clipboard API
- 兼容旧浏览器的传统复制方法

### 6.2 双击卡片
- 双击卡片会触发翻转效果
- 卡片会沿 Y 轴旋转 180 度
- 再次双击可恢复原始状态

## 7. 示例代码

### 7.1 基本使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DCVirtualCard 基本示例</title>
</head>
<body>
    <div id="card-container"></div>

    <script src="path/to/dcvirtualcard.js"></script>
    <script>
        const card = new DC.VirtualCard({
            targetElement: document.getElementById('card-container')
        });
    </script>
</body>
</html>
```

### 7.2 自定义配置

```javascript
const card = new DC.VirtualCard({
  virtualName: 'Premium',
  virtualDesc: 'Premium Card',
  cardNumber: '1234567890123456',
  cardId: '54321',
  cardName: 'Jane Smith',
  theme: 'three',
  targetElement: document.getElementById('card-container')
});
```

### 7.3 主题切换

```javascript
// 初始化卡片
let currentCard = new DC.VirtualCard({
    theme: 'one',
    targetElement: document.getElementById('card-container')
});

// 切换主题
function changeTheme(theme) {
    // 销毁当前卡片
    currentCard.destroy();
    
    // 清空容器
    document.getElementById('card-container').innerHTML = '';
    
    // 创建新卡片
    currentCard = new DC.VirtualCard({
        theme: theme,
        targetElement: document.getElementById('card-container')
    });
}

// 使用示例
changeTheme('five');
```

## 8. 样式说明

### 8.1 主要 CSS 类

| CSS 类 | 描述 |
|--------|------|
| `dc-virtual-card` | 卡片容器类 |
| `digital` | 数字卡片样式类 |
| `one` 到 `eight` | 主题样式类 |
| `card-top` | 卡片顶部区域 |
| `card-center` | 卡片中间区域 |
| `card-bottom` | 卡片底部区域 |
| `card-logo` | 卡片标志容器 |
| `card-publisher` | 卡片发布者信息 |
| `card-number` | 卡号显示区域 |
| `card-name` | 持卡人姓名区域 |
| `card-id` | 卡片ID显示 |
| `card-name-text` | 持卡人姓名文本 |
| `card-silk-logo` | 支付系统标志 |
| `flipped` | 卡片翻转状态 |
| `copy-feedback` | 复制成功反馈 |

### 8.2 动画效果

- 卡片背景渐变动画
- 卡片翻转 3D 动画
- 复制成功反馈淡入淡出效果

## 9. 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 10. 注意事项

1. 组件会自动注入所需的 CSS 样式，确保样式只注入一次
2. 卡号会自动格式化，每 4 位数字插入一个空格
3. 复制功能优先使用 Clipboard API，不支持时回退到传统方法
4. 双击卡片可触发翻转效果
5. 组件支持自定义所有卡片信息和主题
6. 销毁组件时会清理所有事件监听器和 DOM 元素

## 11. 源码结构

```
src/components/dcvirtualcard/
├── dcvirtualcard.js       # 核心组件实现
├── dcvirtualcard.scss     # 样式文件
└── dcvirtualcard.d.ts     # TypeScript 类型定义
```