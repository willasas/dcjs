# dcWaterfall 工具类文档

## 1. 工具类介绍

`dcWaterfall` 是 DCJS 项目中的瀑布流布局工具类，用于实现响应式的瀑布流布局效果。该工具类可以根据容器宽度自动计算列数，对不同高度的元素进行智能布局，并在窗口大小改变时自动调整布局。

## 2. 安装和引入

### 2.1 直接引入

```html
<script src="path/to/dcWaterfall.js"></script>
```

### 2.2 ES6 模块引入

```javascript
import dcWaterfall from 'path/to/dcWaterfall.js';
```

### 2.3 CommonJS 引入

```javascript
const dcWaterfall = require('path/to/dcWaterfall.js');
```

## 3. API 参考

### 3.1 构造函数

```javascript
const waterfall = new dcWaterfall(containerSelector);
```

**参数**：
- `containerSelector` (String): 瀑布流容器的选择器

**返回值**：
- `dcWaterfall` 实例

**抛出错误**：
- 如果找不到指定的容器元素，会抛出错误

### 3.2 方法

#### 3.2.1 parsePercentage(str)

解析百分比字符串为数字值。

**参数**：
- `str` (String): 百分比字符串，如 "22%"

**返回值**：
- (Number): 解析后的数字值

**抛出错误**：
- 如果字符串不是有效的百分比形式，会抛出错误

#### 3.2.2 layoutItems(items)

布局瀑布流项。

**参数**：
- `items` (Array): 待布局的瀑布流项元素数组

#### 3.2.3 resetLayout()

重置瀑布流布局。

#### 3.2.4 dynamicLoadMoreItems(count)

动态加载更多瀑布流项。

**参数**：
- `count` (Number): 要加载的项数，默认为 10

#### 3.2.5 onResize()

处理窗口大小调整事件，自动调整瀑布流布局。

## 4. 使用示例

### 4.1 基本使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>瀑布流示例</title>
  <style>
    .waterfall-container {
      position: relative;
      width: 100%;
      min-height: 400px;
    }

    .waterfall-item {
      position: absolute;
      width: 22%;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 15px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="waterfall-container" id="waterfall-container">
    <!-- 瀑布流项 -->
    <div class="waterfall-item">
      <h3>项目 1</h3>
      <p>这是一个瀑布流项目</p>
    </div>
    <div class="waterfall-item">
      <h3>项目 2</h3>
      <p>这是一个更高的瀑布流项目</p>
      <p>额外的内容</p>
    </div>
    <!-- 更多瀑布流项 -->
  </div>

  <script src="path/to/dcWaterfall.js"></script>
  <script>
    // 初始化瀑布流
    const waterfall = new dcWaterfall('#waterfall-container');
  </script>
</body>
</html>
```

### 4.2 动态加载更多项

```javascript
// 初始化瀑布流
const waterfall = new dcWaterfall('#waterfall-container');

// 加载更多项
function loadMoreItems() {
  waterfall.dynamicLoadMoreItems(5);
}

// 绑定加载更多按钮
document.getElementById('load-more-btn').addEventListener('click', loadMoreItems);
```

### 4.3 重置布局

```javascript
// 初始化瀑布流
const waterfall = new dcWaterfall('#waterfall-container');

// 重置布局
function resetLayout() {
  waterfall.resetLayout();
}

// 绑定重置按钮
document.getElementById('reset-btn').addEventListener('click', resetLayout);
```

## 5. 配置和样式

### 5.1 容器样式

瀑布流容器需要设置为相对定位：

```css
.waterfall-container {
  position: relative;
  width: 100%;
  min-height: 400px;
  /* 其他样式 */
}
```

### 5.2 瀑布流项样式

瀑布流项需要设置为绝对定位，并指定宽度：

```css
.waterfall-item {
  position: absolute;
  width: 22%; /* 与工具类中的 columnWidthStr 一致 */
  /* 其他样式 */
}
```

### 5.3 自定义列宽和列间距

可以通过修改 `dcWaterfall` 类中的 `columnWidthStr` 和 `columnGapStr` 属性来自定义列宽和列间距：

```javascript
class dcWaterfall {
  constructor(containerSelector) {
    this.columnWidthStr = '20%'; // 自定义列宽
    this.columnGapStr = '2.5%'; // 自定义列间距
    // 其余代码不变
  }
  // 其余方法不变
}
```

## 6. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| IE 11 | ✅ |

## 7. 注意事项

1. **容器选择器**：确保传入的容器选择器能够唯一标识瀑布流容器元素。

2. **样式设置**：瀑布流容器必须设置为 `position: relative`，瀑布流项必须设置为 `position: absolute`。

3. **性能考虑**：对于大量瀑布流项，动态加载可能会影响性能，建议合理控制每次加载的数量。

4. **响应式设计**：工具类会自动处理窗口大小变化，但在某些复杂布局中可能需要手动调用 `resetLayout()` 方法。

5. **初始化时机**：确保在 DOM 加载完成后初始化瀑布流，否则可能找不到容器元素。

## 8. 测试

测试文件位于 `test/utils/dcwaterfall/dcwaterfall.test.js`，包含了对所有方法的测试用例。

### 8.1 运行测试

```bash
# 在项目根目录运行
npm test

# 或者直接运行特定测试文件
node test/utils/dcwaterfall/dcwaterfall.test.js
```

## 9. 示例代码

示例代码位于 `examples/utils/dcwaterfall/index.html`，提供了一个完整的瀑布流示例，包括初始布局、动态加载和重置布局功能。

### 9.1 打开示例

在浏览器中打开 `examples/utils/dcwaterfall/index.html` 文件即可查看和测试瀑布流效果。

## 10. 总结

`dcWaterfall` 工具类提供了一个简单而强大的瀑布流布局实现，具有以下特点：

1. **自动计算列数**：根据容器宽度和列宽自动计算可以容纳的列数。

2. **智能布局**：对不同高度的元素进行智能布局，确保布局紧凑。

3. **响应式设计**：在窗口大小改变时自动调整布局。

4. **动态加载**：支持动态加载更多瀑布流项。

5. **易于使用**：提供简洁的 API，易于集成到项目中。

该工具类适用于需要展示大量不同高度内容的场景，如图片画廊、产品列表等。
