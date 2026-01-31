# DCProgressBar 组件文档

## 1. 组件介绍

DCProgressBar 是一个功能强大的原生 JavaScript 进度条组件，基于 CodePen 示例简化版本，移除了主题切换功能，专注于核心的进度条功能。

### 主要特性

- ✅ 拖拽调整进度
- ✅ 点击轨道调整进度
- ✅ 支持触摸事件
- ✅ 自定义颜色和样式
- ✅ 支持步长设置
- ✅ 值变化回调
- ✅ 响应式设计
- ✅ 动画效果

## 2. 快速开始

### 安装

将 `dcprogressbar.js` 文件引入到你的项目中：

```html
<script src="path/to/dcprogressbar.js"></script>
```

### 基本用法

```html
<!-- 创建容器 -->
<div id="progress-container"></div>

<script>
    // 初始化进度条
    const progressBar = new DC.ProgressBar({
        container: '#progress-container',
        value: 50, // 初始值
        color: '#4CAF50' // 进度条颜色
    });
</script>
```

## 3. 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | string/Element | `'#progress-container'` | 容器选择器或DOM元素 |
| `value` | number | `0` | 初始值 (0-100) |
| `min` | number | `0` | 最小值 |
| `max` | number | `100` | 最大值 |
| `step` | number | `1` | 步长值 |
| `color` | string | `'#4CAF50'` | 进度条颜色 |
| `bgColor` | string | `'#f0f0f0'` | 背景颜色 |
| `onChange` | function | `null` | 值改变时的回调函数 |

## 4. API 方法

### setValue(value)

设置进度条的值。

**参数：**
- `value` (number): 要设置的值

**返回值：**
- 无

**示例：**

```javascript
progressBar.setValue(75); // 设置为75%
```

### getValue()

获取当前进度值。

**参数：**
- 无

**返回值：**
- (number): 当前进度值

**示例：**

```javascript
const currentValue = progressBar.getValue();
console.log('Current value:', currentValue);
```

### updateConfig(newOptions)

更新进度条配置。

**参数：**
- `newOptions` (object): 新的配置选项

**返回值：**
- 无

**示例：**

```javascript
progressBar.updateConfig({
    max: 200,
    color: '#ff0000'
});
```

### destroy()

销毁进度条组件，清理事件监听器和DOM元素。

**参数：**
- 无

**返回值：**
- 无

**示例：**

```javascript
progressBar.destroy();
```

## 5. 事件回调

### onChange(newValue, oldValue)

当进度值发生变化时触发的回调函数。

**参数：**
- `newValue` (number): 新的进度值
- `oldValue` (number): 旧的进度值

**示例：**

```javascript
const progressBar = new DC.ProgressBar({
    container: '#progress-container',
    onChange: (newValue, oldValue) => {
        console.log('Value changed from', oldValue, 'to', newValue);
        // 可以在这里更新UI或执行其他操作
    }
});
```

## 6. 示例

### 示例 1: 基本进度条

```javascript
const progressBar = new DC.ProgressBar({
    container: '#progress-container',
    value: 30
});
```

### 示例 2: 自定义颜色和范围

```javascript
const progressBar = new DC.ProgressBar({
    container: '#progress-container',
    value: 50,
    min: 0,
    max: 200,
    color: '#2196F3',
    onChange: (newValue) => {
        console.log('Progress:', newValue);
    }
});
```

### 示例 3: 带步长控制

```javascript
const progressBar = new DC.ProgressBar({
    container: '#progress-container',
    value: 0,
    step: 10, // 每次增加10%
    color: '#FF9800'
});
```

## 7. 浏览器兼容性

DCProgressBar 组件使用了现代 JavaScript 特性和 CSS 技术，支持以下浏览器：

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 8. 样式自定义

DCProgressBar 组件通过动态创建的 `<style>` 标签来应用样式。你可以通过以下方式自定义样式：

1. **通过配置选项**：使用 `color` 和 `bgColor` 选项来自定义颜色
2. **通过 CSS 覆盖**：在你的 CSS 文件中覆盖组件的默认样式

### 主要 CSS 类

- `.dc-progress-bar` - 进度条容器
- `.dc-progress-track` - 进度条轨道
- `.dc-progress-fill` - 进度条填充
- `.dc-progress-handle` - 进度条手柄
- `.dc-progress-nub` - 手柄的小圆点
- `.dc-progress-value` - 进度值显示
- `.dc-progress-pips` - 刻度标记

## 9. 性能优化

### 最佳实践

1. **避免频繁创建和销毁**：尽量重用同一个进度条实例
2. **合理设置步长**：对于大范围的值，使用较大的步长以提高性能
3. **优化回调函数**：回调函数中避免执行复杂操作，以免影响拖拽体验

### 内存管理

当你不再需要进度条时，记得调用 `destroy()` 方法来清理事件监听器和DOM元素，避免内存泄漏。

```javascript
// 不再需要进度条时
progressBar.destroy();
progressBar = null;
```

## 10. 故障排除

### 常见问题

1. **容器未找到**
   - 错误信息：`Container not found: #progress-container`
   - 解决方案：确保容器元素存在，并且选择器正确

2. **进度条不显示**
   - 检查容器是否有足够的高度
   - 确保 CSS 没有被其他样式覆盖

3. **拖拽不工作**
   - 检查是否有其他元素阻止了事件冒泡
   - 确保容器元素是可交互的

4. **触摸事件不工作**
   - 检查浏览器是否支持触摸事件
   - 确保没有其他触摸事件监听器干扰

## 11. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2023-12-01 | 初始版本 |
| 1.0.1 | 2023-12-15 | 修复触摸事件处理 |
| 1.0.2 | 2024-01-10 | 优化动画效果 |

## 12. 贡献

如果你发现任何问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 13. 许可证

DCProgressBar 组件采用 MIT 许可证。
