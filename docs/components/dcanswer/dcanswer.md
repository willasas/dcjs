# DCAnswer 组件使用说明

## 简介

DCAnswer 组件是一个用于创建交互式问答测试的组件，支持单选和多选题型，具有以下功能：
- 支持单选和多选题型
- 自动生成问题导航界面
- 实时显示答题进度
- 支持上一题/下一题导航
- 答案自动保存
- 完成答题功能
- 响应式设计

## 安装与引入

### 直接引入

```html
<script src="../../src/components/dcanswer/dcanswer.js"></script>
```

### 模块引入

```javascript
const DCAnswer = require('../../src/components/dcanswer/dcanswer.js');
```

## 基本使用

### 创建问答测试实例

```javascript
// 准备问题数据
const questions = [
    {
        text: '1. 下列哪个是 JavaScript 的数据类型？',
        options: ['A. String', 'B. Integer', 'C. Float', 'D. Character'],
        type: 'single' // 单选
    },
    {
        text: '2. 下列哪些是前端框架？（可多选）',
        options: ['A. React', 'B. Vue', 'C. Angular', 'D. Node.js'],
        type: 'multiple' // 多选
    }
];

// 创建 DCAnswer 实例
const dcAnswer = new DC.Answer(questions);

// 初始化组件
dcAnswer.init();
```

## API 参考

### 构造函数

```javascript
new DC.Answer(questions)
```

- **questions**：问题数组（可选，默认为空数组）
  - **text**：问题文本
  - **options**：选项数组
  - **type**：题型，'single' 表示单选，'multiple' 表示多选

### 方法

#### init()

初始化问答组件，创建 DOM 元素、添加样式和事件监听器。

#### render()

渲染问答界面，显示当前问题、选项和导航按钮。

#### handleOptionClick(selectedIndex, optionElement, type)

处理选项点击事件。

- **selectedIndex**：被点击选项的索引
- **optionElement**：被点击的选项元素
- **type**：选项类型，'single' 表示单选，'multiple' 表示多选

#### prevQuestion()

跳转到上一个问题。

#### nextQuestion()

跳转到下一个问题。

#### finishQuiz(finishButton)

完成答题，提交答案。

- **finishButton**：完成按钮元素

## 样式说明

### 内置样式

- 响应式设计，适配不同屏幕尺寸
- 现代化的卡片式布局
- 清晰的问题和选项样式
- 选中状态的视觉反馈
- 悬停效果和过渡动画
- 导航按钮的样式

### 自定义样式

组件使用 CSS 变量来定义主题颜色，您可以通过覆盖这些变量来自定义样式：

```css
:root {
    --bg-theme-50: #f0f9ff;
    --bg-theme-100: #e0f2fe;
    --bg-theme-300: #bae6fd;
    --bg-theme-400: #60a5fa;
    --bg-theme-600: #2563eb;
    --bg-theme-800: #1e40af;
    --font-theme-50: #f8fafc;
    --font-theme-100: #f1f5f9;
    --font-theme-400: #94a3b8;
    --font-theme-500: #64748b;
    --font-theme-800: #1e293b;
}
```

## 示例

完整的示例代码请参考 `examples/components/dcanswer/index.html` 文件。

## 浏览器兼容性

- Chrome
- Firefox
- Safari
- Edge

## 常见问题

### 1. 组件不显示

**可能原因**：
- 问题数组为空
- 组件未正确初始化
- 样式冲突

**解决方案**：
- 确保提供了有效的问题数组
- 调用 `init()` 方法初始化组件
- 检查是否有 CSS 规则覆盖了组件样式

### 2. 选项点击无响应

**解决方案**：
- 确保问题对象中包含正确的 `type` 属性
- 检查是否有其他事件监听器阻止了点击事件

### 3. 导航按钮不显示

**解决方案**：
- 确保问题数组长度大于 1
- 检查是否有 CSS 规则隐藏了按钮

## 最佳实践

1. **准备清晰的问题数据**：确保问题文本和选项清晰明了
2. **合理设置题型**：根据问题性质选择单选或多选题型
3. **提供足够的选项**：单选题一般提供 3-4 个选项，多选题可提供更多
4. **测试不同设备**：确保在桌面和移动设备上都能正常显示和操作
5. **添加适当的反馈**：可以在完成答题后添加结果反馈

## 扩展功能

如果需要扩展组件功能，可以：

1. **添加结果反馈**：在完成答题后显示得分或正确答案
2. **添加计时器**：限制答题时间
3. **添加题目分类**：按类别组织题目
4. **添加跳过功能**：允许用户跳过某些题目
5. **添加进度条**：使用可视化进度条显示答题进度
6. **支持键盘导航**：允许用户使用键盘导航和选择选项
7. **添加题目解析**：在完成答题后显示题目解析

## 数据结构示例

### 完整的问题数据结构

```javascript
const questions = [
    {
        text: '问题文本',
        options: ['选项 1', '选项 2', '选项 3', '选项 4'],
        type: 'single', // 或 'multiple'
        // 可选字段
        points: 10, // 分值
        explanation: '题目解析', // 题目解析
        category: '类别' // 题目类别
    }
];
```

### 答案数据结构

```javascript
// 单选答案：[选中选项的索引]
answers = [[1]]; // 第一题选中了第二个选项

// 多选答案：[选中选项的索引数组]
answers = [[0, 2]]; // 第一题选中了第一个和第三个选项
```

## 性能优化

1. **减少 DOM 操作**：组件已使用批量 DOM 操作，减少了重排和重绘
2. **事件委托**：使用事件委托处理选项点击事件
3. **样式优化**：使用 CSS 变量和类选择器，提高样式应用效率
4. **内存管理**：及时清理事件监听器，避免内存泄漏

## 安全注意事项

1. **输入验证**：确保问题数据来自可信来源，避免注入攻击
2. **答案存储**：敏感测试的答案应加密存储
3. **防止作弊**：重要测试应添加防作弊措施，如时间限制、IP 限制等