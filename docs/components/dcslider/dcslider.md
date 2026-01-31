# DCSlider 组件文档

## 1. 组件介绍

DCSlider 是一个功能强大的轮播图组件，支持水平和垂直方向的滑动，提供了丰富的配置选项和方法。

**主要功能：**
- 支持水平和垂直方向的轮播
- 支持自动播放功能
- 支持循环播放
- 支持分页指示器和导航按钮
- 支持自定义动画时长
- 提供完整的 API 方法控制轮播
- 支持事件监听

## 2. 安装和使用

### 2.1 引入文件

```html
<link rel="stylesheet" href="path/to/dcslider.css">
<script src="path/to/dcslider.js"></script>
```

### 2.2 基本结构

```html
<div id="slider-container">
  <div class="dc-slider">
    <div class="dc-slider-wrapper">
      <div class="dc-slider-item">Slide 1</div>
      <div class="dc-slider-item">Slide 2</div>
      <div class="dc-slider-item">Slide 3</div>
    </div>
  </div>
</div>
```

### 2.3 初始化组件

```javascript
const slider = new DC.DCSlider('#slider-container', {
  direction: 'horizontal',
  autoplay: true,
  interval: 3000,
  loop: true,
  pagination: true,
  navigation: true,
  animationDuration: 500
});
```

## 3. 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `direction` | String | 'horizontal' | 轮播方向，可选值：'horizontal' 或 'vertical' |
| `autoplay` | Boolean | false | 是否自动播放 |
| `interval` | Number | 3000 | 自动播放间隔时间（毫秒） |
| `loop` | Boolean | false | 是否循环播放 |
| `pagination` | Boolean | false | 是否显示分页指示器 |
| `navigation` | Boolean | false | 是否显示导航按钮 |
| `animationDuration` | Number | 300 | 动画时长（毫秒） |

## 4. API 方法

### 4.1 控制方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `prev()` | 无 | 无 | 切换到上一张幻灯片 |
| `next()` | 无 | 无 | 切换到下一张幻灯片 |
| `slideTo(index)` | index: Number | 无 | 切换到指定索引的幻灯片 |
| `startAutoplay()` | 无 | 无 | 开始自动播放 |
| `stopAutoplay()` | 无 | 无 | 停止自动播放 |

### 4.2 获取状态方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `getCurrentIndex()` | 无 | Number | 获取当前幻灯片索引 |
| `getSlideCount()` | 无 | Number | 获取幻灯片总数 |
| `isAnimating()` | 无 | Boolean | 获取是否正在动画中 |
| `isAutoplaying()` | 无 | Boolean | 获取是否正在自动播放 |

## 5. 事件监听

| 事件 | 描述 |
|------|------|
| `slideChange` | 幻灯片切换完成时触发 |
| `slideStart` | 幻灯片开始切换时触发 |
| `autoplayStart` | 自动播放开始时触发 |
| `autoplayStop` | 自动播放停止时触发 |

**使用示例：**

```javascript
slider.on('slideChange', (newIndex) => {
  console.log('当前幻灯片索引:', newIndex);
});
```

## 6. 示例代码

### 6.1 水平轮播（带自动播放）

```html
<div id="horizontal-slider">
  <div class="dc-slider">
    <div class="dc-slider-wrapper">
      <div class="dc-slider-item">Slide 1</div>
      <div class="dc-slider-item">Slide 2</div>
      <div class="dc-slider-item">Slide 3</div>
    </div>
  </div>
</div>

<script>
  const horizontalSlider = new DC.DCSlider('#horizontal-slider', {
    direction: 'horizontal',
    autoplay: true,
    interval: 2000,
    loop: true,
    pagination: true,
    navigation: true
  });
</script>
```

### 6.2 垂直轮播

```html
<div id="vertical-slider">
  <div class="dc-slider">
    <div class="dc-slider-wrapper">
      <div class="dc-slider-item">Slide 1</div>
      <div class="dc-slider-item">Slide 2</div>
      <div class="dc-slider-item">Slide 3</div>
    </div>
  </div>
</div>

<script>
  const verticalSlider = new DC.DCSlider('#vertical-slider', {
    direction: 'vertical',
    loop: true,
    pagination: true,
    navigation: true
  });
</script>
```

### 6.3 自定义控制

```html
<div id="custom-slider">
  <div class="dc-slider">
    <div class="dc-slider-wrapper">
      <div class="dc-slider-item">Slide 1</div>
      <div class="dc-slider-item">Slide 2</div>
      <div class="dc-slider-item">Slide 3</div>
    </div>
  </div>
  <button id="prev-btn">上一张</button>
  <button id="next-btn">下一张</button>
  <button id="slide-to-btn">跳到第2张</button>
</div>

<script>
  const customSlider = new DC.DCSlider('#custom-slider', {
    loop: true
  });

  document.getElementById('prev-btn').addEventListener('click', () => {
    customSlider.prev();
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    customSlider.next();
  });

  document.getElementById('slide-to-btn').addEventListener('click', () => {
    customSlider.slideTo(1); // 索引从0开始
  });
</script>
```

## 7. 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 8. 注意事项

1. 确保轮播容器有明确的宽度和高度
2. 幻灯片内容应保持一致的尺寸
3. 当启用自动播放时，建议同时启用循环播放以获得更好的用户体验
4. 在移动设备上，轮播组件支持触摸滑动操作

## 9. 常见问题

### 9.1 轮播不显示
- 检查容器尺寸是否正确设置
- 确保幻灯片数量大于1
- 检查CSS文件是否正确引入

### 9.2 自动播放不工作
- 确保 `autoplay` 选项设置为 `true`
- 检查 `interval` 值是否合理
- 确保没有其他代码调用了 `stopAutoplay()` 方法

### 9.3 导航按钮不显示
- 确保 `navigation` 选项设置为 `true`
- 检查CSS样式是否正确

## 10. 源码结构

```
src/components/dcslider/
├── dcslider.js       # 核心组件实现
├── dcslider.scss     # 样式文件
└── dcslider.d.ts     # TypeScript 类型定义
```