# DCSidebar 组件文档

## 1. 组件介绍

DCSidebar 是一个功能强大的原生 JavaScript 侧边栏组件，用于实现可折叠的侧边栏菜单和返回顶部功能。

### 主要特性

- ✅ 可折叠的侧边栏菜单
- ✅ 自定义菜单项和图标
- ✅ 返回顶部功能
- ✅ 响应式设计
- ✅ 平滑的动画效果
- ✅ 丰富的API接口
- ✅ 支持事件回调
- ✅ 可定制的返回顶部按钮

## 2. 快速开始

### 安装

将 `dcsidebar.js` 文件引入到你的项目中：

```html
<script src="path/to/dcsidebar.js"></script>
```

### 基本用法

```html
<!-- 创建容器 -->
<div id="sidebar-container"></div>

<script>
    // 测试数据
    const menuData = [
        {
            title: '首页',
            link: '#',
            icon: '<svg class="icon" width="24" height="24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
        },
        {
            title: '关于我们',
            link: '#about',
            icon: '<svg class="icon" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
        },
        {
            title: '联系我们',
            link: '#contact',
            icon: '<svg class="icon" width="24" height="24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>'
        }
    ];

    // 初始化侧边栏
    const sidebar = new DC.Sidebar({
        container: '#sidebar-container',
        data: menuData,
        onClick: (item, index) => {
            console.log('点击菜单项:', item.title, '索引:', index);
        }
    });
</script>
```

## 3. 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | string/Element | 无 | 容器选择器或DOM元素（必填） |
| `data` | Array | `[]` | 菜单数据数组 |
| `onClick` | function | `null` | 点击菜单项回调函数 |
| `backTop` | Object | `{ text: 'TOP', icon: '<svg>...</svg>' }` | 返回顶部按钮配置 |

### 菜单数据结构

```javascript
const menuData = [
    {
        title: '菜单项标题', // 菜单项标题（必填）
        link: '#', // 菜单项链接（必填）
        icon: '<svg>...</svg>' // 菜单项图标（必填）
    },
    // 更多菜单项...
];
```

### 返回顶部按钮配置

```javascript
const backTopConfig = {
    text: 'TOP', // 返回顶部按钮文本
    icon: '<svg>...</svg>' // 返回顶部按钮图标
};
```

## 4. API 方法

### setData(data)

设置菜单数据。

**参数：**
- `data` (Array): 菜单数据数组

**返回值：**
- 无

**示例：**

```javascript
const newData = [
    {
        title: '首页',
        link: '#',
        icon: '<svg class="icon" width="24" height="24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
    },
    {
        title: '产品',
        link: '#products',
        icon: '<svg class="icon" width="24" height="24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>'
    }
];

sidebar.setData(newData);
```

### addMenuItem(item, index)

添加菜单项。

**参数：**
- `item` (Object): 菜单项数据
- `index` (number): 插入位置索引（可选，默认为末尾）

**返回值：**
- 无

**示例：**

```javascript
// 添加到末尾
const newItem = {
    title: '服务',
    link: '#services',
    icon: '<svg class="icon" width="24" height="24"><path d="M17 11h-4v-1h4V8h-5v7h2v1h-2v2h5v-4h-4v-1h4v-2zm3-9H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 2v16H4V4h16z"/></svg>'
};

sidebar.addMenuItem(newItem);

// 添加到指定位置
sidebar.addMenuItem(newItem, 1); // 添加到第二个位置
```

### removeMenuItem(index)

移除菜单项。

**参数：**
- `index` (number): 要移除的菜单项索引

**返回值：**
- 无

**示例：**

```javascript
// 移除第一个菜单项
sidebar.removeMenuItem(0);
```

### updateMenuItem(index, newData)

更新菜单项。

**参数：**
- `index` (number): 菜单项索引
- `newData` (Object): 新的菜单项数据

**返回值：**
- 无

**示例：**

```javascript
// 更新第一个菜单项
const updatedData = {
    title: '首页更新',
    link: '#home'
};

sidebar.updateMenuItem(0, updatedData);
```

### expand()

展开侧边栏。

**参数：**
- 无

**返回值：**
- 无

**示例：**

```javascript
// 展开侧边栏
sidebar.expand();
```

### collapse()

收起侧边栏。

**参数：**
- 无

**返回值：**
- 无

**示例：**

```javascript
// 收起侧边栏
sidebar.collapse();
```

### toggle()

切换侧边栏展开/收起状态。

**参数：**
- 无

**返回值：**
- 无

**示例：**

```javascript
// 切换侧边栏状态
sidebar.toggle();
```

## 5. 事件回调

### onClick(item, index)

当点击菜单项时触发的回调函数。

**参数：**
- `item` (Object): 被点击的菜单项数据
- `index` (number): 菜单项在数据数组中的索引

**示例：**

```javascript
const sidebar = new DC.Sidebar({
    container: '#sidebar-container',
    data: menuData,
    onClick: (item, index) => {
        console.log('点击菜单项:', item.title);
        console.log('菜单项索引:', index);
        console.log('菜单项链接:', item.link);

        // 可以在这里执行页面跳转或其他操作
        window.location.href = item.link;
    }
});
```

## 6. 示例

### 示例 1: 基本侧边栏

```javascript
const sidebar = new DC.Sidebar({
    container: '#sidebar-container',
    data: menuData
});
```

### 示例 2: 自定义返回顶部按钮

```javascript
const sidebar = new DC.Sidebar({
    container: '#sidebar-container',
    data: menuData,
    backTop: {
        text: '顶部',
        icon: '<svg class="icon" width="24" height="24"><path d="M18 15l-6-6-6 6"/></svg>'
    }
});
```

### 示例 3: 带事件回调的侧边栏

```javascript
const sidebar = new DC.Sidebar({
    container: '#sidebar-container',
    data: menuData,
    onClick: (item, index) => {
        console.log('点击菜单项:', item.title);
        // 执行自定义操作
    }
});
```

## 7. 浏览器兼容性

DCSidebar 组件使用了现代 JavaScript 特性和 CSS 技术，支持以下浏览器：

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 8. 样式自定义

DCSidebar 组件通过动态创建的 `<style>` 标签来应用样式。你可以通过以下方式自定义样式：

### 主要 CSS 类

- `.common-sidebar` - 侧边栏容器
- `.sidebar-btn` - 侧边栏按钮
- `.sidebar-cb` - 侧边栏复选框（用于控制展开/收起）
- `.sidebar-default` - 侧边栏默认内容
- `.sidebar-lists` - 侧边栏菜单列表
- `.sidebar-item` - 侧边栏菜单项
- `.item-icon` - 菜单项图标
- `.item-link` - 菜单项链接
- `.btn-top` - 返回顶部按钮
- `.btn-icon` - 返回顶部按钮图标
- `.btn-text` - 返回顶部按钮文本

### 响应式设计

组件内置了响应式设计，在屏幕宽度小于 1024px 时会自动调整样式：

- 缩小侧边栏宽度
- 调整按钮大小和边框半径
- 减小菜单项间距和内边距
- 缩小图标和文字大小

## 9. 性能优化

### 最佳实践

1. **合理使用菜单数据**：避免一次性加载过多菜单项，建议保持在 5-10 个以内。

2. **优化图标**：使用 SVG 图标并确保图标代码简洁，避免使用过大的图标文件。

3. **避免频繁更新**：如果需要动态更新菜单数据，建议批量更新而不是频繁单个更新。

4. **合理使用事件回调**：回调函数中避免执行复杂操作，以免影响用户体验。

### 动画性能

组件使用了 CSS 动画来实现平滑的展开/收起效果，这些动画使用了硬件加速，不会影响页面性能。

## 10. 故障排除

### 常见问题

1. **侧边栏不显示**
   - 检查容器选择器是否正确
   - 确保容器元素存在于 DOM 中
   - 检查是否正确引入了组件文件

2. **菜单项不显示**
   - 检查菜单数据格式是否正确
   - 确保每个菜单项都包含 `title`、`link` 和 `icon` 属性

3. **返回顶部按钮不显示**
   - 尝试向下滚动页面，按钮会在滚动超过 200px 时显示
   - 检查 `backTop` 配置是否正确

4. **响应式设计不生效**
   - 检查浏览器窗口宽度是否小于 1024px
   - 确保没有自定义 CSS 覆盖了响应式样式

5. **点击菜单项无反应**
   - 检查 `onClick` 回调函数是否正确设置
   - 确保菜单项的 `link` 属性格式正确

## 11. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2023-12-01 | 初始版本 |
| 1.0.1 | 2023-12-15 | 修复响应式设计问题 |
| 1.0.2 | 2024-01-10 | 优化动画效果和性能 |

## 12. 贡献

如果你发现任何问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 13. 许可证

DCSidebar 组件采用 MIT 许可证。
