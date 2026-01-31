# dcEle 工具类

## 1. 简介

dcEle 是 DCJS 项目中的 DOM 元素操作工具类，提供了丰富的元素创建、查找、内容操作、属性操作、样式操作和元素操作方法，旨在简化前端开发中的 DOM 操作。

## 2. 功能特性

- 元素创建（从 HTML 字符串或标签名）
- 元素查找（单个或多个）
- 元素内容操作（文本和 HTML）
- 元素属性操作（设置、获取、移除）
- 样式操作（类名和内联样式）
- 元素操作（添加、删除、插入、克隆）
- 辅助方法（可见性检查、位置获取、包含关系检查）
- 选项卡功能

## 3. 安装与使用

### 3.1 浏览器直接引入
```html
<script src="path/to/dcEle.js"></script>
<script>
  // 使用示例
  const element = DC.Ele.createElement('<div class="test">测试</div>');
  document.body.appendChild(element);
</script>
```

### 3.2 模块化引入
```javascript
import * as dcEle from 'path/to/dcEle.js';

// 使用示例
const element = dcEle.createElement('<div class="test">测试</div>');
document.body.appendChild(element);
```

## 4. API 参考

### 4.1 元素创建方法

#### createElement(str)
从 HTML 字符串创建新的 DOM 元素。

**参数：**
- `str`：HTML 字符串

**返回值：**
- 创建的 DOM 元素

**示例：**
```javascript
const element = DC.Ele.createElement('<div class="test">测试</div>');
document.body.appendChild(element);
```

#### createElementByTag(tagName, attributes)
通过标签名创建元素。

**参数：**
- `tagName`：元素标签名
- `attributes`：元素属性对象

**返回值：**
- 创建的元素

**示例：**
```javascript
const element = DC.Ele.createElementByTag('div', {
  id: 'test',
  className: 'test-class',
  style: {
    color: 'red',
    fontSize: '16px'
  },
  dataset: {
    test: 'value'
  }
});
document.body.appendChild(element);
```

#### createElementByTagName(tagName)
通过标签名创建元素（简化版本）。

**参数：**
- `tagName`：元素标签名

**返回值：**
- 创建的元素或 null（如果无效）

**示例：**
```javascript
const element = DC.Ele.createElementByTagName('div');
element.textContent = '测试';
document.body.appendChild(element);
```

#### createElementWithClassAndId(elementTag, cssClassName, htmlId)
创建带有类和 ID 的元素。

**参数：**
- `elementTag`：元素标签名
- `cssClassName`：CSS 类名
- `htmlId`：HTML ID

**返回值：**
- 创建的元素

**示例：**
```javascript
const element = DC.Ele.createElementWithClassAndId('div', 'test-class', 'test-id');
element.textContent = '测试';
document.body.appendChild(element);
```

### 4.2 元素查找方法

#### find(selector, context)
查找单个元素。

**参数：**
- `selector`：CSS 选择器
- `context`：搜索上下文（可选，默认 document）

**返回值：**
- 找到的元素或 null

**示例：**
```javascript
const element = DC.Ele.find('.test-class');
if (element) {
  console.log('找到元素:', element);
}
```

#### findAll(selector, context)
查找多个元素。

**参数：**
- `selector`：CSS 选择器
- `context`：搜索上下文（可选，默认 document）

**返回值：**
- 找到的元素数组

**示例：**
```javascript
const elements = DC.Ele.findAll('.test-class');
elements.forEach(element => {
  console.log('元素:', element);
});
```

### 4.3 元素内容操作

#### text(element, text)
设置或获取元素的文本内容。

**参数：**
- `element`：目标元素
- `text`：要设置的文本（可选，不提供则获取文本）

**返回值：**
- 获取模式下返回文本内容

**示例：**
```javascript
// 设置文本
DC.Ele.text(element, '新文本');

// 获取文本
const text = DC.Ele.text(element);
console.log('文本内容:', text);
```

#### html(element, html)
设置或获取元素的 HTML 内容。

**参数：**
- `element`：目标元素
- `html`：要设置的 HTML（可选，不提供则获取 HTML）

**返回值：**
- 获取模式下返回 HTML 内容

**示例：**
```javascript
// 设置 HTML
DC.Ele.html(element, '<strong>加粗文本</strong>');

// 获取 HTML
const html = DC.Ele.html(element);
console.log('HTML内容:', html);
```

### 4.4 元素属性操作

#### attr(element, name, value)
设置或获取元素的属性。

**参数：**
- `element`：目标元素
- `name`：属性名
- `value`：属性值（可选，不提供则获取属性）

**返回值：**
- 获取模式下返回属性值

**示例：**
```javascript
// 设置属性
DC.Ele.attr(element, 'title', '测试标题');

// 获取属性
const title = DC.Ele.attr(element, 'title');
console.log('标题:', title);
```

#### removeAttr(element, name)
移除元素的属性。

**参数：**
- `element`：目标元素
- `name`：属性名

**示例：**
```javascript
DC.Ele.removeAttr(element, 'title');
```

### 4.5 样式操作

#### addClass(element, ...classNames)
添加类名（注意：此方法现在通过选择器查找元素）。

**参数：**
- `element`：元素 ID 或类名
- `...classNames`：要添加的类名

**示例：**
```javascript
DC.Ele.addClass('test-element', 'highlight', 'active');
```

#### removeClass(element, ...classNames)
移除类名。

**参数：**
- `element`：目标元素
- `...classNames`：要移除的类名

**示例：**
```javascript
DC.Ele.removeClass(element, 'highlight', 'active');
```

#### toggleClass(element, className, force)
切换类名。

**参数：**
- `element`：目标元素
- `className`：要切换的类名
- `force`：强制添加或移除（可选）

**返回值：**
- 如果类被添加，则为 true；如果类被删除，则为 false

**示例：**
```javascript
const result = DC.Ele.toggleClass(element, 'active');
console.log('类状态:', result ? '已添加' : '已移除');
```

#### css(element, property, value)
设置或获取元素的样式。

**参数：**
- `element`：目标元素
- `property`：样式属性名或样式对象
- `value`：样式值（可选，不提供则获取样式）

**返回值：**
- 获取模式下返回样式值

**示例：**
```javascript
// 设置单个样式
DC.Ele.css(element, 'color', 'red');

// 设置多个样式
DC.Ele.css(element, {
  color: 'red',
  fontSize: '16px'
});

// 获取样式
const color = DC.Ele.css(element, 'color');
console.log('颜色:', color);
```

#### setStyle(el, ruleName, val)
设置元素的样式。

**参数：**
- `el`：要设置样式的元素
- `ruleName`：样式规则名
- `val`：样式值

**示例：**
```javascript
DC.Ele.setStyle(element, 'fontSize', '18px');
```

#### addSheet(styleRule)
添加样式表到文档。

**参数：**
- `styleRule`：CSS 样式规则

**示例：**
```javascript
DC.Ele.addSheet('.test { color: red; }');
```

#### addInlineStyleById(eleId, eleCss)
为元素添加内联样式（通过 ID）。

**参数：**
- `eleId`：元素 ID
- `eleCss`：CSS 样式文本

**示例：**
```javascript
DC.Ele.addInlineStyleById('test', 'color: red; font-size: 16px;');
```

#### addInlineStyleByClass(eleClass, eleCss)
为元素添加内联样式（通过类名）。

**参数：**
- `eleClass`：元素类名
- `eleCss`：CSS 样式文本

**示例：**
```javascript
DC.Ele.addInlineStyleByClass('test-class', 'color: red; font-size: 16px;');
```

### 4.6 元素操作

#### insertBefore(newElement, referenceElement)
插入元素到目标元素之前。

**参数：**
- `newElement`：要插入的元素
- `referenceElement`：参考元素

**示例：**
```javascript
const newElement = DC.Ele.createElement('<div>新元素</div>');
const referenceElement = document.getElementById('reference');
DC.Ele.insertBefore(newElement, referenceElement);
```

#### insertAfter(newElement, referenceElement)
插入元素到目标元素之后。

**参数：**
- `newElement`：要插入的元素
- `referenceElement`：参考元素

**示例：**
```javascript
const newElement = DC.Ele.createElement('<div>新元素</div>');
const referenceElement = document.getElementById('reference');
DC.Ele.insertAfter(newElement, referenceElement);
```

#### append(parent, child)
将元素添加到父元素的末尾。

**参数：**
- `parent`：父元素
- `child`：子元素

**示例：**
```javascript
const parent = document.getElementById('parent');
const child = DC.Ele.createElement('<div>子元素</div>');
DC.Ele.append(parent, child);
```

#### prepend(parent, child)
将元素添加到父元素的开头。

**参数：**
- `parent`：父元素
- `child`：子元素

**示例：**
```javascript
const parent = document.getElementById('parent');
const child = DC.Ele.createElement('<div>子元素</div>');
DC.Ele.prepend(parent, child);
```

#### remove(element)
移除元素。

**参数：**
- `element`：要移除的元素

**示例：**
```javascript
const element = document.getElementById('to-remove');
DC.Ele.remove(element);
```

#### empty(element)
清空元素的内容。

**参数：**
- `element`：要清空的元素

**示例：**
```javascript
const container = document.getElementById('container');
DC.Ele.empty(container);
```

#### clone(element, deep)
克隆元素。

**参数：**
- `element`：要克隆的元素
- `deep`：是否深度克隆（默认 true）

**返回值：**
- 克隆的元素

**示例：**
```javascript
const original = document.getElementById('original');
const cloned = DC.Ele.clone(original);
document.body.appendChild(cloned);
```

#### replace(oldElement, newElement)
替换元素。

**参数：**
- `oldElement`：要替换的元素
- `newElement`：新元素

**示例：**
```javascript
const oldElement = document.getElementById('old');
const newElement = DC.Ele.createElement('<div>新元素</div>');
DC.Ele.replace(oldElement, newElement);
```

#### addToBody(element)
将元素添加到文档主体。

**参数：**
- `element`：要添加的元素

**示例：**
```javascript
const element = DC.Ele.createElement('<div>测试</div>');
DC.Ele.addToBody(element);
```

### 4.7 辅助方法

#### matches(element, selector)
检查元素是否匹配选择器。

**参数：**
- `element`：要检查的元素
- `selector`：CSS 选择器

**返回值：**
- 是否匹配

**示例：**
```javascript
const element = document.getElementById('test');
const isMatch = DC.Ele.matches(element, '.test-class');
console.log('是否匹配:', isMatch);
```

#### getBoundingRect(element)
获取元素的位置和尺寸信息。

**参数：**
- `element`：目标元素

**返回值：**
- 元素的位置和尺寸信息

**示例：**
```javascript
const rect = DC.Ele.getBoundingRect(element);
console.log('宽度:', rect.width);
console.log('高度:', rect.height);
console.log('位置:', rect.top, rect.left);
```

#### isVisible(element)
检查元素是否可见。

**参数：**
- `element`：目标元素

**返回值：**
- 元素是否可见

**示例：**
```javascript
const isVisible = DC.Ele.isVisible(element);
console.log('元素可见:', isVisible);
```

#### setVisible(element, visible)
设置元素的显示状态。

**参数：**
- `element`：目标元素
- `visible`：是否显示

**示例：**
```javascript
// 隐藏元素
DC.Ele.setVisible(element, false);

// 显示元素
DC.Ele.setVisible(element, true);
```

#### elementContains(parent, child)
检查元素是否包含另一个元素。

**参数：**
- `parent`：父元素
- `child`：子元素

**返回值：**
- 如果父元素包含子元素，则为 true

**示例：**
```javascript
const contains = DC.Ele.elementContains(parent, child);
console.log('包含关系:', contains);
```

#### hasClass(el, className)
检查元素是否具有某个类。

**参数：**
- `el`：要检查的元素
- `className`：要检查的类名

**返回值：**
- 如果元素具有该类，则为 true

**示例：**
```javascript
const hasClass = DC.Ele.hasClass(element, 'active');
console.log('具有active类:', hasClass);
```

#### setTextContentByIdOrClassName(ele, eleText)
设置元素的文本内容（通过 ID 或类名）。

**参数：**
- `ele`：元素 ID 或类名
- `eleText`：要设置的文本内容

**示例：**
```javascript
DC.Ele.setTextContentByIdOrClassName('test', '新文本内容');
```

### 4.8 选项卡功能

#### tabSwitcher(tabContainerSelector, contentContainerSelector)
设置标签切换功能（悬停和点击事件）。

**参数：**
- `tabContainerSelector`：标签容器选择器
- `contentContainerSelector`：内容容器选择器

**示例：**
```javascript
DC.Ele.tabSwitcher('.tab-headers', '.tab-contents');
```

#### setupTabSwitching(headSelector, bodySelector)
设置选项卡切换功能（点击事件）。

**参数：**
- `headSelector`：选项卡头部选择器
- `bodySelector`：选项卡内容选择器

**示例：**
```javascript
DC.Ele.setupTabSwitching('.tab-header', '.tab-body');
```

## 5. 示例代码

### 5.1 基本用法
```javascript
// 创建元素
const element = DC.Ele.createElement('<div class="test">测试</div>');
document.body.appendChild(element);

// 设置内容
DC.Ele.text(element, '新文本内容');

// 添加样式
DC.Ele.css(element, 'color', 'red');

// 添加类名
DC.Ele.addClass('test', 'highlight');
```

### 5.2 元素操作
```javascript
// 创建父元素和子元素
const parent = DC.Ele.createElement('<div class="parent"></div>');
const child1 = DC.Ele.createElement('<div class="child">子元素1</div>');
const child2 = DC.Ele.createElement('<div class="child">子元素2</div>');

// 添加子元素
DC.Ele.append(parent, child1);
DC.Ele.append(parent, child2);

// 插入元素到指定位置
const newChild = DC.Ele.createElement('<div class="child">新子元素</div>');
DC.Ele.insertBefore(newChild, child1);

// 克隆元素
const clonedChild = DC.Ele.clone(child1);
DC.Ele.append(parent, clonedChild);

// 移除元素
DC.Ele.remove(child2);
```

### 5.3 选项卡功能
```html
<div class="tab-container">
  <div class="tab-headers">
    <div class="tab-header active">标签1</div>
    <div class="tab-header">标签2</div>
    <div class="tab-header">标签3</div>
  </div>
  <div class="tab-bodies">
    <div class="tab-body active">标签1内容</div>
    <div class="tab-body">标签2内容</div>
    <div class="tab-body">标签3内容</div>
  </div>
</div>

<script>
  // 设置选项卡切换
  DC.Ele.setupTabSwitching('.tab-header', '.tab-body');
</script>
```

## 6. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ 支持 |
| Firefox | ✅ 支持 |
| Safari | ✅ 支持 |
| Edge | ✅ 支持 |
| IE 11 | ⚠️ 部分支持（需要 polyfill） |

## 7. 注意事项

1. **元素选择**：部分方法通过选择器查找元素时，确保选择器正确且元素存在。
2. **错误处理**：使用时应添加适当的错误处理，避免因元素不存在或操作失败导致的异常。
3. **性能优化**：对于大量 DOM 操作，建议批量处理以减少重排和重绘。
4. **样式操作**：优先使用类名操作样式，避免频繁修改内联样式。
5. **选项卡功能**：确保选项卡头部和内容的数量匹配。

## 8. 测试用例

测试文件路径：`test/utils/dcEle/dcEle.test.js`

测试内容包括：
- 元素创建测试
- 元素查找测试
- 元素内容操作测试
- 元素属性操作测试
- 样式操作测试
- 元素操作测试
- 辅助方法测试
- 选项卡功能测试

## 9. 版本历史

### v1.0.0
- 初始版本，实现了核心 DOM 操作功能

### v1.0.1
- 修复了元素创建和属性操作的问题
- 优化了样式操作方法

### v1.1.0
- 添加了选项卡功能
- 增强了辅助方法
- 改进了错误处理

## 10. 贡献与反馈

如有问题或建议，欢迎提交 Issue 或 Pull Request。

## 11. 相关链接

- [DCJS 项目主页](https://github.com/dcjs/dcjs)
- [示例代码](https://github.com/dcjs/dcjs/tree/master/examples/utils/dcEle)
- [测试用例](https://github.com/dcjs/dcjs/tree/master/test/utils/dcEle)