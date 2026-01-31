# DCVirtualScroller 组件文档

## 1. 组件介绍

DCVirtualScroller 是一个高性能的虚拟滚动组件，能够高效渲染大量数据列表，大幅提升滚动性能和用户体验。

**主要功能：**
- 只渲染可视区域及其缓冲区的元素，减少 DOM 节点数量
- 支持自定义渲染函数，创建复杂的列表项
- 高性能滚动处理，使用节流和 requestAnimationFrame 优化
- 动态数据更新和项高度调整
- 滚动到指定索引功能
- 性能监控和统计
- 响应式设计，支持窗口大小变化

## 2. 安装和使用

### 2.1 引入文件

```html
<script src="path/to/dcvirtualscroller.js"></script>
```

### 2.2 初始化组件

```javascript
const container = document.getElementById('scroll-container');
const totalItems = 1000;
const itemHeight = 60;

const scroller = new DC.VirtualScroller(
  container,
  totalItems,
  itemHeight,
  renderItem // 可选的自定义渲染函数
);
```

## 3. 构造函数参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | HTMLElement | 无 | 滚动容器元素 |
| `totalItems` | Number | 无 | 总项目数量 |
| `itemHeight` | Number | 无 | 每个项目的高度（像素） |
| `renderItem` | Function | 默认渲染函数 | 自定义渲染函数 |

### 3.1 自定义渲染函数

```javascript
function renderItem(index) {
  const item = document.createElement('div');
  item.textContent = `Item ${index + 1}`;
  item.style.height = `${itemHeight}px`;
  item.style.position = 'absolute';
  item.style.top = `${index * itemHeight}px`;
  // 添加其他样式和内容
  return item;
}
```

## 4. 方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `init()` | 无 | 无 | 初始化组件 |
| `render()` | 无 | 无 | 渲染可视区域的项目 |
| `handleScroll()` | 无 | 无 | 处理滚动事件 |
| `throttledHandleScroll()` | 无 | 无 | 节流处理滚动事件 |
| `defaultRenderItem(index)` | index: Number | HTMLElement | 默认渲染函数 |
| `updateTotalItems(totalItems)` | totalItems: Number | 无 | 更新总项目数 |
| `updateItemHeight(itemHeight)` | itemHeight: Number | 无 | 更新项目高度 |
| `refresh()` | 无 | 无 | 刷新渲染 |
| `destroy()` | 无 | 无 | 销毁组件，清理事件和DOM |
| `getScrollState()` | 无 | Object | 获取滚动状态 |
| `getPerformanceStats()` | 无 | Object | 获取性能统计信息 |
| `resetPerformanceStats()` | 无 | 无 | 重置性能统计 |
| `scrollToIndex(index)` | index: Number | 无 | 滚动到指定索引 |
| `updateData(newTotalItems, newItemHeight)` | newTotalItems: Number, newItemHeight: Number | 无 | 更新数据和项目高度 |
| `updateScrollHeight()` | 无 | 无 | 更新滚动高度 |
| `handleResize()` | 无 | 无 | 处理窗口大小变化 |

## 5. 性能优化

### 5.1 核心优化策略

1. **虚拟渲染**：只渲染可视区域及其缓冲区的元素
2. **节流滚动**：使用节流和 requestAnimationFrame 优化滚动事件处理
3. **批量 DOM 操作**：使用 DocumentFragment 批量添加 DOM 元素，减少重排
4. **智能渲染**：只有当起始索引变化时才重新渲染
5. **事件监听器优化**：使用 passive 选项提升滚动性能

### 5.2 性能监控

组件内置性能监控功能，可以通过 `getPerformanceStats()` 方法获取以下统计信息：

| 统计项 | 描述 |
|--------|------|
| `renderCount` | 渲染次数 |
| `lastRenderTime` | 最后渲染时间（毫秒） |
| `averageRenderTime` | 平均渲染时间（毫秒） |
| `totalItems` | 总项目数 |
| `visibleItems` | 可见项目数 |
| `bufferSize` | 缓冲区大小 |

## 6. 示例代码

### 6.1 基本使用

```javascript
const container = document.getElementById('scroll-container');
const totalItems = 1000;
const itemHeight = 60;

const scroller = new DC.VirtualScroller(
  container,
  totalItems,
  itemHeight
);
```

### 6.2 自定义渲染

```javascript
const container = document.getElementById('scroll-container');
const totalItems = 500;
const itemHeight = 100;

function customRenderItem(index) {
  const item = document.createElement('div');
  item.className = 'product-item';
  item.style.height = `${itemHeight}px`;
  item.style.position = 'absolute';
  item.style.top = `${index * itemHeight}px`;
  item.style.padding = '15px';
  item.style.borderBottom = '1px solid #eee';

  item.innerHTML = `
    <div class="product-image">${index + 1}</div>
    <div class="product-info">
      <h3>Product ${index + 1}</h3>
      <p>Product description for item ${index + 1}</p>
    </div>
  `;

  return item;
}

const scroller = new DC.VirtualScroller(
  container,
  totalItems,
  itemHeight,
  customRenderItem
);
```

### 6.3 动态数据更新

```javascript
// 初始化
const scroller = new DC.VirtualScroller(
  container,
  1000,
  60
);

// 稍后更新数据
scroller.updateData(2000, 80); // 更新为2000个项目，每个高度80px
```

### 6.4 滚动到指定位置

```javascript
// 滚动到第100个项目
scroller.scrollToIndex(99); // 索引从0开始

// 滚动到顶部
scroller.scrollToIndex(0);

// 滚动到底部
scroller.scrollToIndex(totalItems - 1);
```

### 6.5 性能监控

```javascript
// 显示性能统计
function showStats() {
  const stats = scroller.getPerformanceStats();
  console.log('性能统计:', stats);

  // 显示在页面上
  document.getElementById('stats').innerHTML = `
    渲染次数: ${stats.renderCount}<br>
    平均渲染时间: ${stats.averageRenderTime.toFixed(2)}ms<br>
    总项目数: ${stats.totalItems}<br>
    可见项目数: ${stats.visibleItems}
  `;
}

// 重置统计
function resetStats() {
  scroller.resetPerformanceStats();
  console.log('性能统计已重置');
}
```

## 7. 样式说明

### 7.1 容器样式

```css
.scroll-container {
  width: 100%;
  height: 400px; /* 设置固定高度 */
  overflow-y: auto; /* 启用垂直滚动 */
  border: 1px solid #ddd;
  position: relative;
}
```

### 7.2 列表项样式

列表项需要设置以下样式：
- `position: absolute`：确保正确的定位
- `top`：根据索引设置正确的顶部位置
- `height`：与构造函数中指定的 itemHeight 一致

## 8. 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 9. 注意事项

1. **固定项目高度**：组件目前只支持固定高度的列表项
2. **容器高度**：容器需要设置固定高度或最大高度
3. **渲染性能**：自定义渲染函数应尽量简单，避免复杂的 DOM 操作
4. **事件监听器**：组件会自动添加和移除事件监听器，确保不会内存泄漏
5. **缓冲区大小**：默认缓冲区大小为 3，可根据需要调整

## 10. 最佳实践

1. **合理设置缓冲区大小**：缓冲区大小越大，滚动越流畅，但会增加内存使用
2. **优化自定义渲染函数**：避免在渲染函数中进行复杂计算或 DOM 操作
3. **使用 DocumentFragment**：如果需要在渲染函数中创建多个元素，使用 DocumentFragment 批量添加
4. **避免频繁数据更新**：批量更新数据，减少渲染次数
5. **监控性能**：定期检查性能统计，优化渲染逻辑

## 11. 常见问题

### 11.1 滚动不流畅

**可能原因**：
- 自定义渲染函数过于复杂
- 缓冲区大小设置过小
- 项目高度设置不合理

**解决方案**：
- 简化渲染函数
- 增加缓冲区大小
- 确保项目高度与实际渲染高度一致

### 11.2 列表项显示不正确

**可能原因**：
- 项目高度与实际渲染高度不一致
- 自定义渲染函数没有正确设置定位

**解决方案**：
- 确保 itemHeight 参数与实际项目高度一致
- 在自定义渲染函数中正确设置 position: absolute 和 top 样式

### 11.3 数据更新后显示异常

**可能原因**：
- 没有调用 updateData 方法更新数据
- 项目高度变化后没有更新

**解决方案**：
- 使用 updateData 方法更新数据和项目高度
- 确保调用 updateScrollHeight 方法更新滚动高度

## 12. 源码结构

```
src/components/dcvirtualscroller/
├── dcvirtualscroller.js       # 核心组件实现
├── dcvirtualscroller.scss     # 样式文件
└── dcvirtualscroller.d.ts     # TypeScript 类型定义
```