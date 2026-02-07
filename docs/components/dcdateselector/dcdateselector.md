# DCDateSelector 组件

## 1. 组件介绍

DCDateSelector 是一个轻量级的日期选择器组件，用于在网页中选择年、月、日。它提供了简单易用的接口，支持自定义容器和选择回调，适用于各种需要日期输入的场景，如表单提交、用户信息填写等。

### 1.1 主要功能

- 年份、月份、日期的联动选择
- 自动计算每月的天数（支持闰年）
- 自定义容器和选择回调
- 响应式设计，适配不同屏幕尺寸
- 美观的默认样式
- 支持获取当前选中的日期

### 1.2 应用场景

- 用户注册/登录表单中的出生日期选择
- 订单提交中的日期选择
- 活动报名中的日期选择
- 任何需要用户输入日期的场景

## 2. API 文档

### 2.1 构造函数

```javascript
new DC.DateSelector(options)
```

#### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| options | Object | {} | 配置选项 |
| options.container | HTMLElement | document.body | 容器元素，日期选择器将被添加到此元素中 |
| options.onSelect | Function | () => {} | 选择回调函数，当日期发生变化时触发 |

### 2.2 方法

#### getSelectedDate()

获取当前选中的日期。

**返回值**：
- Object: 包含选中日期信息的对象
  - year: Number - 年份
  - month: Number - 月份
  - day: Number - 日期
  - date: Date - 对应的 Date 对象

#### 内部方法

以下是组件内部使用的方法，一般不需要外部调用：

- initDateData(): 初始化日期数据
- generateDays(year, month): 生成日期列表
- render(): 渲染组件
- createStyle(): 创建样式
- populateSelect(selector, values, suffix, initialValue): 填充下拉框选项
- bindEvents(): 绑定事件
- updateDays(): 更新日期选项
- triggerSelection(): 触发选择回调
- highlightSelectedItems(): 高亮显示当前选中的年月日

## 3. 使用示例

### 3.1 基础使用

```javascript
// 引入 DCDateSelector
// <script src="path/to/dcdateselector.js"></script>

// 初始化日期选择器
const dateSelector = new DC.DateSelector({
    onSelect: function(date) {
        console.log('选择的日期:', date);
        // 可以在这里处理选择结果，如更新 UI 或提交表单
    }
});

// 获取当前选中的日期
const selectedDate = dateSelector.getSelectedDate();
console.log('当前选中的日期:', selectedDate);
```

### 3.2 自定义容器

```javascript
// 创建自定义容器
const container = document.getElementById('date-selector-container');

// 初始化日期选择器
const dateSelector = new DC.DateSelector({
    container: container,
    onSelect: function(date) {
        console.log('选择的日期:', date);
    }
});
```

### 3.3 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DCDateSelector 示例</title>
</head>
<body>
    <div id="date-selector-container"></div>
    <div id="result"></div>
    
    <script src="path/to/dcdateselector.js"></script>
    <script>
        // 初始化日期选择器
        const dateSelector = new DC.DateSelector({
            container: document.getElementById('date-selector-container'),
            onSelect: function(date) {
                const resultElement = document.getElementById('result');
                resultElement.innerHTML = `
                    <p>选择的日期: ${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}</p>
                    <p>对应的 Date 对象: ${date.date}</p>
                `;
            }
        });
        
        // 页面加载完成后获取默认选中的日期
        window.onload = function() {
            const selectedDate = dateSelector.getSelectedDate();
            console.log('默认选中的日期:', selectedDate);
        };
    </script>
</body>
</html>
```

## 4. 样式说明

### 4.1 默认样式

DCDateSelector 会自动创建以下默认样式：

```css
.dc-date-selector {
    position: relative;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 10px 4px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dc-date-selector .picker-wrapper {
    display: flex;
    gap: 10px;
    justify-content: space-between;
}

.dc-date-selector .picker-select {
    flex: 1;
    height: 40px;
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.dc-date-selector .picker-select:focus {
    border-color: #1890ff;
    box-shadow: 0 0 4px rgba(24, 144, 255, 0.3);
}

.dc-date-selector .picker-select option {
    padding: 5px;
}
```

### 4.2 自定义样式

如果需要自定义样式，可以通过覆盖默认 CSS 类来实现：

```css
/* 自定义日期选择器容器样式 */
.dc-date-selector {
    background: #f5f5f5;
    border: 1px solid #eee;
}

/* 自定义下拉框样式 */
.dc-date-selector .picker-select {
    font-family: 'Arial', sans-serif;
    background: #fff;
}

/* 自定义聚焦样式 */
.dc-date-selector .picker-select:focus {
    border-color: #52c41a;
    box-shadow: 0 0 4px rgba(82, 196, 26, 0.3);
}
```

## 5. 最佳实践

### 5.1 性能优化

- **合理使用容器**：尽量指定具体的容器元素，而不是使用默认的 document.body，这样可以减少 DOM 遍历的开销。
- **避免频繁创建**：如果页面中需要多个日期选择器，建议复用实例而不是频繁创建新实例。
- **合理处理回调**：回调函数中避免执行复杂的操作，以免影响用户体验。

### 5.2 兼容性

- DCDateSelector 使用原生 JavaScript 实现，不依赖任何第三方库，兼容所有现代浏览器。
- 对于 IE 11 等老旧浏览器，可能需要添加一些 polyfill 来支持 ES6 特性。

### 5.3 无障碍性

- 所有表单元素都有适当的标签和描述。
- 支持键盘导航和屏幕阅读器。
- 聚焦状态有明显的视觉反馈。

### 5.4 常见问题

#### 问题：日期选择器不显示

**可能原因**：
- 容器元素不存在或不可见。
- CSS 样式冲突导致元素被隐藏。

**解决方案**：
- 检查容器元素是否正确指定。
- 检查是否有 CSS 样式冲突。

#### 问题：日期联动不正确

**可能原因**：
- 浏览器兼容性问题。
- 自定义样式影响了元素结构。

**解决方案**：
- 确保浏览器支持 ES6 特性。
- 避免修改组件的 DOM 结构。

#### 问题：回调函数不触发

**可能原因**：
- 回调函数未正确指定。
- 事件绑定失败。

**解决方案**：
- 检查回调函数是否正确传递。
- 检查容器元素是否存在。

## 6. 版本历史

### 1.0.0

- 初始版本
- 支持年份、月份、日期的联动选择
- 支持自定义容器和选择回调
- 自动计算每月的天数（支持闰年）
- 美观的默认样式

## 7. 贡献指南

如果您发现了 bug 或有新的功能建议，欢迎提交 issue 或 pull request。

### 开发流程

1. Fork 本仓库
2. 创建 feature 分支
3. 提交代码
4. 运行测试
5. 提交 pull request

### 代码规范

- 遵循 ES6 语法规范
- 代码风格保持一致
- 为新功能添加测试用例
- 为新功能添加文档

## 8. 许可证

DCDateSelector 组件采用 MIT 许可证，详见 [LICENSE](../../LICENSE.md) 文件。
