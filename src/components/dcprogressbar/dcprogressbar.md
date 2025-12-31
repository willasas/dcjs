# DC Progress Bar

现代化、可定制的进度条组件 - 优雅的交互体验

## ✨ 特性

- 🎨 **现代化设计** - 采用渐变色彩、阴影效果和流畅动画
- 🖱️ **交互友好** - 支持拖拽、点击跳转、键盘操作
- 📱 **响应式** - 完美适配各种屏幕尺寸
- ⚡ **高性能** - 轻量级实现，无依赖原生JavaScript
- 🔧 **高度可定制** - 丰富的配置选项和事件回调

## 🚀 快速开始

### 基本用法

```html
<!DOCTYPE html>
<html>
<head>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="progress-container"></div>

    <script src="dcprogressbar.js"></script>
    <script>
        // 创建进度条实例
        const progressBar = new DC.ProgressBar({
            container: '#progress-container',
            value: 50, // 初始值
            min: 0,    // 最小值
            max: 100,  // 最大值
            step: 1,   // 步长
            color: '#4CAF50', // 进度条颜色
            bgColor: '#f0f0f0', // 背景颜色
            onChange: function(newValue, oldValue) {
                console.log(`值改变: ${oldValue} → ${newValue}`);
            }
        });

        // 设置值
        progressBar.setValue(75);

        // 获取当前值
        const currentValue = progressBar.getValue();
        console.log('当前值:', currentValue);
    </script>
</body>
</html>
```

## 📖 API 文档

### 构造函数选项

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | `string` | `'#progress-container'` | 容器选择器或DOM元素 |
| `value` | `number` | `0` | 初始进度值 |
| `min` | `number` | `0` | 最小值 |
| `max` | `number` | `100` | 最大值 |
| `step` | `number` | `1` | 步长值 |
| `color` | `string` | `'#4CAF50'` | 进度条颜色 |
| `bgColor` | `string` | `'#f0f0f0'` | 背景颜色 |
| `onChange` | `Function` | `null` | 值改变时的回调函数 |

### 方法

#### `setValue(value)`
设置进度条的值。

**参数：**
- `value` (`number`): 要设置的值

**示例：**
```javascript
progressBar.setValue(75);
```

#### `getValue()`
获取当前进度值。

**返回值：** `number` - 当前进度值

**示例：**
```javascript
const value = progressBar.getValue();
console.log('当前值:', value);
```

#### `updateConfig(newOptions)`
更新组件配置。

**参数：**
- `newOptions` (`Object`): 新的配置选项

**示例：**
```javascript
progressBar.updateConfig({
    color: '#FF5722',
    min: 0,
    max: 200,
    step: 10
});
```

#### `destroy()`
销毁组件实例，清理事件监听器。

**示例：**
```javascript
progressBar.destroy();
```

### 事件

#### `onChange` 回调
当进度值改变时触发。

**参数：**
- `newValue` (`number`): 新的值
- `oldValue` (`number`): 旧的值

**示例：**
```javascript
const progressBar = new DC.ProgressBar({
    container: '#progress-container',
    value: 50,
    onChange: function(newValue, oldValue) {
        console.log(`进度改变: ${oldValue} → ${newValue}`);
    }
});
```

## 🎨 自定义配置

### 颜色定制

```javascript
// 自定义颜色
const customProgressBar = new DC.ProgressBar({
    container: '#progress-custom',
    value: 30,
    color: '#FF5722',      // 橙色进度条
    bgColor: '#E0E0E0'     // 浅灰色背景
});
```

### 范围设置

```javascript
// 自定义范围
const rangeProgressBar = new DC.ProgressBar({
    container: '#progress-range',
    value: 150,
    min: 100,
    max: 200
});
```

### 步长设置

```javascript
// 设置步长
const steppedProgressBar = new DC.ProgressBar({
    container: '#progress-stepped',
    value: 50,
    step: 10  // 值将按10的倍数对齐
});
```

## 🔧 交互方式

### 鼠标拖拽
- 拖动手柄可以精确调整进度值
- 支持平滑的拖拽动画效果

### 点击跳转
- 点击进度条轨道可以快速跳转到相应位置
- 自动计算点击位置对应的值

### 编程控制
- 通过API方法精确控制进度值
- 支持动态配置更新

## 📱 响应式设计

组件自动适配不同屏幕尺寸：
- **桌面端**: 完整的交互体验
- **移动端**: 优化的触摸交互
- **平板端**: 自适应布局

## 🛠️ 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔍 故障排除

### 常见问题

**Q: 进度条不显示？**
A: 检查容器选择器是否正确，确保DOM元素存在。

**Q: 拖拽功能不工作？**
A: 检查是否在移动设备上，确保启用了触摸事件支持。

**Q: 值显示为NaN%？**
A: 确保初始值在min和max范围内。

### 调试技巧

```javascript
// 检查组件状态
console.log('当前值:', progressBar.getValue());
console.log('配置:', progressBar.options);

// 验证DOM元素
console.log('容器:', progressBar.container);
console.log('进度填充:', progressBar.progressFill);
console.log('手柄:', progressBar.handle);
```

## 📄 许可证

MIT License - 可自由使用、修改和分发。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进组件！

## 🔗 相关链接

- [Demo页面](./demo.html) - 查看组件演示
- [源代码](./dcprogressbar.js) - 查看实现细节
- [API文档](#api-文档) - 详细的方法说明

---

**DC Progress Bar** - 让进度展示更加优雅！