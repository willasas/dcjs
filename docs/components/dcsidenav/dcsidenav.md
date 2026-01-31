# DCSidenav 组件文档

## 1. 组件介绍

DCSidenav 是一个功能强大的原生 JavaScript 侧边导航组件，用于实现内容区域的导航功能。

### 主要特性

- ✅ 滚动显示/隐藏控制
- ✅ 自动更新激活状态
- ✅ 平滑滚动到对应区域
- ✅ 自定义导航数据
- ✅ 支持事件回调
- ✅ 响应式设计
- ✅ 灵活的配置选项
- ✅ 自动创建容器（可选）

## 2. 快速开始

### 安装

将 `dcsidenav.js` 文件引入到你的项目中：

```html
<script src="path/to/dcsidenav.js"></script>
```

### 基本用法

```html
<!-- 创建容器 -->
<div id="sidenav-container"></div>

<!-- 创建内容区域 -->
<div class="section" id="section1" data-nav-section="section1">
    <h2>Section 1</h2>
    <p>Content for section 1</p>
</div>

<div class="section" id="section2" data-nav-section="section2">
    <h2>Section 2</h2>
    <p>Content for section 2</p>
</div>

<script>
    // 导航数据
    const navData = [
        {
            title: 'Section 1',
            link: '#section1',
            icon: '<svg class="icon" width="24" height="24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
        },
        {
            title: 'Section 2',
            link: '#section2',
            icon: '<svg class="icon" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
        }
    ];

    // 初始化侧边导航
    const sidenav = new DC.Sidenav({
        container: '#sidenav-container',
        data: navData,
        threshold: 200,
        onClick: (item, index) => {
            console.log('点击导航项:', item.title, '索引:', index);
        }
    });
</script>
```

## 3. 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | string/Element | 无 | 容器选择器或DOM元素（可选，不提供则自动创建） |
| `data` | Array | `[]` | 导航数据数组 |
| `threshold` | number | `200` | 显示导航的滚动阈值 |
| `offset` | number | `0` | 滚动偏移量 |
| `activeClass` | string | `'active'` | 激活状态的类名 |
| `onClick` | function | `null` | 点击导航项的回调函数 |

### 导航数据结构

```javascript
const navData = [
    {
        title: '导航项标题', // 导航项标题（必填）
        link: '#section1', // 导航项链接（可选，默认为 'javascript:;'）
        icon: '<svg>...</svg>' // 导航项图标（可选）
    },
    // 更多导航项...
];
```

### 内容区域标记

内容区域需要添加 `data-nav-section` 属性，以便组件能够识别和定位：

```html
<div id="section1" data-nav-section="section1">
    <!-- 内容 -->
</div>
```

## 4. API 方法

### addItem(item)

添加导航项。

**参数：**
- `item` (Object): 导航项数据

**返回值：**
- 无

**示例：**

```javascript
const newItem = {
    title: 'Section 3',
    link: '#section3',
    icon: '<svg class="icon" width="24" height="24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>'
};

sidenav.addItem(newItem);
```

### setData(data)

设置导航数据。

**参数：**
- `data` (Array): 导航数据数组

**返回值：**
- 无

**示例：**

```javascript
const newData = [
    {
        title: 'Home',
        link: '#home',
        icon: '<svg class="icon" width="24" height="24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
    },
    {
        title: 'About',
        link: '#about',
        icon: '<svg class="icon" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
    },
    {
        title: 'Contact',
        link: '#contact',
        icon: '<svg class="icon" width="24" height="24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>'
    }
];

sidenav.setData(newData);
```

## 5. 事件回调

### onClick(item, index)

当点击导航项时触发的回调函数。

**参数：**
- `item` (Object): 被点击的导航项数据
- `index` (number): 导航项在数据数组中的索引

**示例：**

```javascript
const sidenav = new DC.Sidenav({
    container: '#sidenav-container',
    data: navData,
    onClick: (item, index) => {
        console.log('点击导航项:', item.title);
        console.log('导航项索引:', index);
        console.log('导航项链接:', item.link);

        // 可以在这里执行自定义操作
        // 例如：发送统计数据、显示加载状态等
    }
});
```

## 6. 示例

### 示例 1: 基本侧边导航

```javascript
const sidenav = new DC.Sidenav({
    container: '#sidenav-container',
    data: navData
});
```

### 示例 2: 自定义配置

```javascript
const sidenav = new DC.Sidenav({
    container: '#sidenav-container',
    data: navData,
    threshold: 300, // 滚动超过300px时显示
    offset: 50, // 滚动偏移量
    activeClass: 'current', // 自定义激活类名
    onClick: (item, index) => {
        console.log('点击导航项:', item.title);
    }
});
```

### 示例 3: 自动创建容器

```javascript
const sidenav = new DC.Sidenav({
    data: navData,
    threshold: 200
});
```

## 7. 浏览器兼容性

DCSidenav 组件使用了现代 JavaScript 特性和 CSS 技术，支持以下浏览器：

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 8. 样式自定义

DCSidenav 组件通过动态创建的 `<style>` 标签来应用样式。你可以通过以下方式自定义样式：

### 主要 CSS 类

- `.dc-side-nav` - 侧边导航容器
- `.dc-side-nav.show` - 侧边导航显示状态
- `.nav-item` - 导航项
- `.nav-item.active` - 导航项激活状态
- `.nav-icon` - 导航项图标
- `.nav-title` - 导航项标题

### 响应式设计

组件内置了响应式设计，在屏幕宽度小于 1024px 时会自动调整样式。

## 9. 性能优化

### 最佳实践

1. **合理设置阈值**：根据页面内容长度和布局，设置合适的滚动阈值，避免导航过早或过晚显示。

2. **优化导航数据**：导航项数量不宜过多，建议保持在 5-10 个以内，以确保导航区域不会过长。

3. **优化图标**：使用 SVG 图标并确保图标代码简洁，避免使用过大的图标文件。

4. **避免频繁更新**：如果需要动态更新导航数据，建议批量更新而不是频繁单个更新。

5. **合理使用事件回调**：回调函数中避免执行复杂操作，以免影响用户体验。

### 滚动性能

组件使用了 `requestAnimationFrame` 的间接实现（通过事件监听）来处理滚动事件，以提高性能。同时，组件会在滚动时进行必要的计算，以确定当前可见的内容区域和导航项的激活状态。

## 10. 故障排除

### 常见问题

1. **侧边导航不显示**
   - 检查页面滚动是否超过了配置的阈值
   - 确保容器元素存在或允许组件自动创建容器
   - 检查是否正确引入了组件文件

2. **导航项激活状态不更新**
   - 确保内容区域添加了 `data-nav-section` 属性
   - 检查内容区域的高度是否足够，以便能够滚动到该区域

3. **点击导航项不跳转**
   - 确保内容区域的 ID 与导航项的链接对应
   - 检查内容区域是否存在于页面中

4. **响应式设计不生效**
   - 检查浏览器窗口宽度是否小于 1024px
   - 确保没有自定义 CSS 覆盖了响应式样式

5. **导航项图标不显示**
   - 检查图标 SVG 代码是否正确
   - 确保图标代码中没有语法错误

## 11. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2023-12-01 | 初始版本 |
| 1.0.1 | 2023-12-15 | 修复滚动事件处理问题 |
| 1.0.2 | 2024-01-10 | 优化激活状态更新逻辑 |

## 12. 贡献

如果你发现任何问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 13. 许可证

DCSidenav 组件采用 MIT 许可证。
