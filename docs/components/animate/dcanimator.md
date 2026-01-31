# DCAnimator 组件使用说明

## 简介

DCAnimator 是一个用于处理页面动画的组件，支持两种类型的动画：
- **序列帧动画**：通过切换一系列图像帧来实现动画效果
- **滚动动画**：通过滚动列表项来实现动画效果

## 安装与引入

### 直接引入

```html
<script src="../../src/components/animate/dcanimator.js"></script>
```

### 模块引入

```javascript
const DCAnimator = require('../../src/components/animate/dcanimator.js');
```

## 基本使用

### 1. 序列帧动画

#### 创建序列帧动画实例

```javascript
// 准备动画帧图像URL数组
const frames = [
    'frame1.png',
    'frame2.png',
    'frame3.png',
    // 更多帧...
];

// 获取目标DOM元素
const element = document.getElementById('animation-element');

// 创建动画实例（帧率为30）
const animator = new DC.Animator('sequence', frames, element, 30);
```

#### 控制序列帧动画

```javascript
// 启动动画
animator.startAnimation();

// 停止动画
animator.stopAnimation();

// 设置帧率
animator.setFps(60);

// 检查图像是否加载完成
const isLoaded = animator.areImagesLoaded();
console.log('All images loaded:', isLoaded);
```

### 2. 滚动动画

#### 创建滚动动画实例

```html
<!-- HTML结构 -->
<div id="container">
    <ul id="list">
        <li>项目 1</li>
        <li>项目 2</li>
        <li>项目 3</li>
        <!-- 更多项目... -->
    </ul>
</div>
```

```javascript
// 创建动画实例（速度为1）
const animator = new DC.Animator('scroll', '#container', '#list', 'li', 1);
```

#### 控制滚动动画

```javascript
// 启动动画
animator.startAnimation();

// 停止动画
animator.stopAnimation();
```

## API 参考

### 构造函数

```javascript
new DC.Animator(type, ...args)
```

- **type**：动画类型，可选值为 `'sequence'` 或 `'scroll'`
- **...args**：根据动画类型不同，传递不同的参数

### 序列帧动画参数

```javascript
new DC.Animator('sequence', frames, domElement, fps)
```

- **frames**：包含动画帧图像URL的数组
- **domElement**：要应用动画的DOM元素
- **fps**：动画的帧率，默认为30

### 滚动动画参数

```javascript
new DC.Animator('scroll', containerSelector, ulSelector, liSelector, speed)
```

- **containerSelector**：容器元素的选择器
- **ulSelector**：列表元素的选择器
- **liSelector**：列表项元素的选择器
- **speed**：动画速度，默认为 1

### 方法

#### startAnimation()

启动动画。如果动画当前没有在运行，它会将 `isAnimating` 属性设置为 `true`，并根据动画类型调用相应的动画方法。

#### stopAnimation()

停止动画。它会将 `isAnimating` 属性设置为 `false`，从而停止动画的执行。

#### setFps(fps)

设置序列帧动画的帧率。它只对 'sequence' 类型的动画有效。

- **fps**：新的帧率

#### areImagesLoaded()

检查所有图像是否都已加载。

- **返回值**：如果所有图像都已加载且没有错误，则返回 true；否则返回 false

## 事件处理

### 滚动动画事件

滚动动画会自动添加以下事件监听器：

- **鼠标进入容器**：停止动画
- **鼠标离开容器**：重新开始动画
- **触摸开始**：停止动画
- **触摸结束**：如果触摸移动的距离小于 50 像素，重新开始动画

## 注意事项

1. **图像预加载**：序列帧动画会自动预加载所有图像，确保动画流畅播放。
2. **错误处理**：如果图像加载失败，会在控制台显示错误信息，但不会阻止动画启动（如果有可用的图像）。
3. **性能优化**：滚动动画使用 `transform: translate3d` 来实现平滑滚动，利用 GPU 加速。
4. **兼容性**：该组件使用原生 JavaScript 实现，不依赖任何第三方库，具有良好的浏览器兼容性。

## 示例

完整的示例代码请参考 `examples/components/animate/index.html` 文件。

## 浏览器兼容性

- Chrome
- Firefox
- Safari
- Edge

## 常见问题

### 1. 序列帧动画不播放

**可能原因**：
- 图像路径不正确
- 图像加载失败
- 未调用 `startAnimation()` 方法

**解决方案**：
- 检查控制台是否有错误信息
- 确保图像路径正确
- 确保调用了 `startAnimation()` 方法

### 2. 滚动动画不流畅

**可能原因**：
- 列表项过多
- 速度设置过快
- 浏览器性能问题

**解决方案**：
- 减少列表项数量
- 降低速度设置
- 确保使用的是现代浏览器

### 3. 滚动动画在触摸设备上不工作

**解决方案**：确保触摸事件处理正常，检查是否有其他事件监听器干扰。