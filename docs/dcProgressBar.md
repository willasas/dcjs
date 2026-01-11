# DC.ProgressBar 组件使用说明

## 概述

DC.ProgressBar 是一个功能丰富的进度条组件，支持自定义样式、事件回调、步长控制等多种功能，适用于各种需要显示进度的场景。

## 功能特性

- 支持自定义颜色、高度、范围等样式
- 支持步长控制，确保值按指定步长变化
- 提供丰富的事件回调，如值变化、完成等
- 支持显示/隐藏进度文本
- 支持增加/减少/重置等操作方法
- 支持拖拽交互（可选）
- 完善的错误处理和边界值处理

## 基本用法

### 1. 引入组件

```html
<script src="dist/dc.js"></script>
```

### 2. 创建进度条实例

```javascript
// 使用默认配置
const progressBar = new DC.ProgressBar({
    container: '#progress-container'
});

// 使用自定义配置
const progressBar = new DC.ProgressBar({
    container: '#progress-container',
    value: 50,              // 初始值
    min: 0,                 // 最小值
    max: 100,               // 最大值
    step: 1,                // 步长
    color: '#2196F3',       // 进度条颜色
    height: 10,             // 进度条高度
    showText: true,         // 是否显示文本
    draggable: false,       // 是否可拖拽
    onChange: function(value, oldValue) {
        console.log('值变化:', value, oldValue);
    },
    onComplete: function() {
        console.log('进度完成');
    }
});
```

## API 参考

### 构造函数

```javascript
new DC.ProgressBar(options)
```

参数：
- `options` (Object): 配置对象

配置选项：
- `container` (String|HTMLElement): 必需，进度条容器的选择器或DOM元素
- `value` (Number): 初始值，默认为 0
- `min` (Number): 最小值，默认为 0
- `max` (Number): 最大值，默认为 100
- `step` (Number): 步长，默认为 1
- `color` (String): 进度条颜色，默认为 '#2196F3'
- `height` (Number): 进度条高度（像素），默认为 10
- `showText` (Boolean): 是否显示进度文本，默认为 false
- `draggable` (Boolean): 是否可拖拽，默认为 false
- `onChange` (Function): 值变化时的回调函数
- `onComplete` (Function): 达到最大值时的回调函数

### 方法

#### getValue()

获取当前值。

```javascript
const value = progressBar.getValue();
console.log('当前值:', value);
```

返回值：
- 返回当前进度条的值

#### setValue(value)

设置进度条的值。

```javascript
progressBar.setValue(75);
```

参数：
- `value` (Number): 要设置的值

#### getPercentage()

获取当前值的百分比。

```javascript
const percentage = progressBar.getPercentage();
console.log('当前百分比:', percentage + '%');
```

返回值：
- 返回当前值的百分比（0-100）

#### increase()

按步长增加值。

```javascript
progressBar.increase();
```

#### decrease()

按步长减少值。

```javascript
progressBar.decrease();
```

#### reset()

重置为最小值。

```javascript
progressBar.reset();
```

#### updateConfig(newOptions)

更新配置。

```javascript
progressBar.updateConfig({
    color: '#4CAF50',
    height: 15
});
```

参数：
- `newOptions` (Object): 新的配置选项

#### destroy()

销毁进度条实例。

```javascript
progressBar.destroy();
```

## 使用示例

### 基本进度条

```html
<div id="basic-progress"></div>
<button onclick="setValue(25)">25%</button>
<button onclick="setValue(50)">50%</button>
<button onclick="setValue(75)">75%</button>
<button onclick="setValue(100)">100%</button>

<script>
    const progressBar = new DC.ProgressBar({
        container: '#basic-progress',
        value: 30
    });

    function setValue(value) {
        progressBar.setValue(value);
    }
</script>
```

### 带文本的进度条

```html
<div id="text-progress"></div>

<script>
    const progressBar = new DC.ProgressBar({
        container: '#text-progress',
        value: 60,
        showText: true
    });
</script>
```

### 自定义样式的进度条

```html
<div id="custom-progress"></div>

<script>
    const progressBar = new DC.ProgressBar({
        container: '#custom-progress',
        value: 40,
        color: '#FF5722',
        height: 20,
        showText: true
    });
</script>
```

### 自定义范围的进度条

```html
<div id="range-progress"></div>
<button onclick="setRangeValue(50)">50</button>
<button onclick="setRangeValue(100)">100</button>
<button onclick="setRangeValue(150)">150</button>
<button onclick="setRangeValue(200)">200</button>

<script>
    const progressBar = new DC.ProgressBar({
        container: '#range-progress',
        value: 50,
        min: 0,
        max: 200,
        showText: true,
        onChange: function(value, oldValue) {
            console.log('值变化:', value, oldValue);
        }
    });

    function setRangeValue(value) {
        progressBar.setValue(value);
    }
</script>
```

### 带步长的进度条

```html
<div id="step-progress"></div>
<button onclick="increaseStep()">增加</button>
<button onclick="decreaseStep()">减少</button>

<script>
    const progressBar = new DC.ProgressBar({
        container: '#step-progress',
        value: 20,
        step: 10,
        showText: true
    });

    function increaseStep() {
        progressBar.increase();
    }

    function decreaseStep() {
        progressBar.decrease();
    }
</script>
```

### 带事件回调的进度条

```html
<div id="event-progress"></div>
<div id="event-log"></div>
<button onclick="startProgress()">开始进度</button>

<script>
    const progressBar = new DC.ProgressBar({
        container: '#event-progress',
        value: 0,
        showText: true,
        onChange: function(value, oldValue) {
            logEvent('值变化: ' + oldValue + ' → ' + value);
        },
        onComplete: function() {
            logEvent('进度完成！');
        }
    });

    let progressInterval;

    function startProgress() {
        clearInterval(progressInterval);
        progressBar.setValue(0);

        progressInterval = setInterval(() => {
            const currentValue = progressBar.getValue();
            if (currentValue >= 100) {
                clearInterval(progressInterval);
            } else {
                progressBar.setValue(currentValue + 5);
            }
        }, 200);
    }

    function logEvent(message) {
        const log = document.getElementById('event-log');
        const entry = document.createElement('div');
        entry.textContent = new Date().toLocaleTimeString() + ': ' + message;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    }
</script>
```

### 可拖拽的进度条

```html
<div id="draggable-progress"></div>
<div id="draggable-value">当前值: 0</div>

<script>
    const progressBar = new DC.ProgressBar({
        container: '#draggable-progress',
        value: 30,
        draggable: true,
        onChange: function(value, oldValue) {
            document.getElementById('draggable-value').textContent = '当前值: ' + value;
        }
    });
</script>
```

### 动态更新配置

```html
<div id="dynamic-progress"></div>
<button onclick="changeColor()">更改颜色</button>
<button onclick="changeHeight()">更改高度</button>
<button onclick="toggleText()">切换文本</button>

<script>
    const progressBar = new DC.ProgressBar({
        container: '#dynamic-progress',
        value: 60,
        color: '#2196F3',
        height: 10,
        showText: false
    });

    const colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'];
    let colorIndex = 0;

    function changeColor() {
        colorIndex = (colorIndex + 1) % colors.length;
        progressBar.updateConfig({ color: colors[colorIndex] });
    }

    function changeHeight() {
        const currentHeight = progressBar.options.height;
        const newHeight = currentHeight === 10 ? 20 : 10;
        progressBar.updateConfig({ height: newHeight });
    }

    let showText = false;
    function toggleText() {
        showText = !showText;
        progressBar.updateConfig({ showText: showText });
    }
</script>
```

## 注意事项

1. **容器元素**：确保容器元素在创建进度条之前已经存在于DOM中。

2. **值范围**：设置的值会自动限制在最小值和最大值之间。

3. **步长对齐**：如果设置了步长，设置的值会自动对齐到最近的步长倍数。

4. **事件回调**：事件回调中的 `this` 指向进度条实例。

5. **拖拽交互**：启用拖拽功能后，用户可以通过拖拽来改变进度条的值。

6. **性能考虑**：频繁更新进度条值可能会影响性能，特别是在移动设备上。

7. **销毁实例**：不再需要进度条时，应调用 `destroy()` 方法来清理资源。

## 版本历史

- v1.0.0: 初始版本，支持基本进度条功能
- v1.1.0: 添加步长控制和事件回调
- v1.2.0: 添加拖拽交互功能
- v1.3.0: 添加动态配置更新功能
- v1.4.0: 优化性能和错误处理

## 许可证

MIT License