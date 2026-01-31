# DCPager 组件文档

## 概述

DCPager 是一个功能完整的响应式分页组件，用于在网页中实现数据的分页显示和导航。它支持自定义容器、每页显示项数、可见页码数量，以及首页、末页、上一页、下一页导航和页码跳转功能。

## 特性

- 响应式设计，适配不同屏幕尺寸
- 支持自定义容器、每页项数和可见页码数量
- 自动创建DOM结构（如果不存在）
- 动态添加样式
- 完整的分页导航功能（首页、末页、上一页、下一页）
- 页码跳转功能
- 视觉反馈（禁用状态、当前页高亮）

## 安装

将 `dcpager.js` 文件引入到您的项目中：

```html
<script src="path/to/dcpager.js"></script>
```

## 基本用法

### 方法 1: 自动创建DOM结构

如果页面中不存在分页结构，DCPager 会自动创建：

```javascript
const pager = new DC.Pager({
  container: '#pager-container',
  itemsPerPage: 5,
  visiblePages: 5
});
```

### 方法 2: 使用现有DOM结构

如果页面中已经存在符合结构的分页HTML，DCPager 会直接使用：

```javascript
const pager = new DC.Pager({
  container: '#existing-pager-container'
});
```

## API 参考

### 构造函数

```javascript
new DC.Pager(options)
```

#### 参数

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `options` | Object | `{}` | 配置选项对象 |
| `options.container` | String | `'body'` | 分页组件的容器选择器 |
| `options.itemsPerPage` | Number | `10` | 每页显示的项数 |
| `options.visiblePages` | Number | `7` | 一次显示的页码数量 |

### 实例方法

#### showPage(pageNumber)

显示指定页码的内容：

```javascript
pager.showPage(3); // 显示第3页
```

#### 参数

| 参数名 | 类型 | 描述 |
|--------|------|------|
| `pageNumber` | Number | 要显示的页码 |

#### showFirstPage()

显示第一页的内容：

```javascript
pager.showFirstPage();
```

#### updatePageInfo()

更新页面信息显示：

```javascript
pager.updatePageInfo();
```

#### updatePaginationState()

更新分页组件的状态（禁用/启用导航按钮）：

```javascript
pager.updatePaginationState();
```

#### renderPagination()

重新渲染分页导航：

```javascript
pager.renderPagination();
```

## 内部方法

以下方法主要用于组件内部使用，但也可以在需要时调用：

### initializePager()

初始化分页器，处理DOM加载状态：

```javascript
pager.initializePager();
```

### createElement()

创建分页组件的DOM结构：

```javascript
pager.createElement();
```

### addStyles()

添加分页组件所需的样式：

```javascript
pager.addStyles();
```

### init()

初始化分页组件，设置容器、计算总页数、显示第一页数据：

```javascript
pager.init();
```

### hideAllItems()

隐藏所有数据项：

```javascript
pager.hideAllItems();
```

### setupEventListeners()

设置事件监听器：

```javascript
pager.setupEventListeners();
```

## 配置示例

### 示例 1: 基本配置

```javascript
const pager = new DC.Pager({
  container: '#pager-container',
  itemsPerPage: 10,
  visiblePages: 7
});
```

### 示例 2: 自定义配置

```javascript
const pager = new DC.Pager({
  container: '.data-container',
  itemsPerPage: 5,
  visiblePages: 5
});
```

### 示例 3: 使用默认配置

```javascript
const pager = new DC.Pager();
```

## DOM 结构

DCPager 组件创建的DOM结构如下：

```html
<div class="dc-dataTable-wrapper">
  <div class="dc-dataTable-top"></div>
  <div class="dc-dataTable-container">
    <!-- 数据项将在这里显示 -->
  </div>
  <div class="dc-dataTable-bottom">
    <div class="dc-dataTable-info">
      <p class="dc-dataTable-info-text">当前为</p>
      <p class="dc-dataTable-info-number">1</p>
      <p class="dc-dataTable-info-text">共</p>
      <p class="dc-dataTable-info-sum">1</p>
      <p class="dc-dataTable-info-text">页</p>
    </div>
    <div class="dc-dataTable-pagination">
      <a class="dc-first-pager" href="#" data-page="1" data-text="起始页">
        <!-- SVG 图标 -->
      </a>
      <a class="dc-prev-pager dc-pager" href="#" data-text="上一页">
        <!-- SVG 图标 -->
      </a>
      <ul class="dc-dataTable-pagination-list">
        <!-- 页码项将在这里生成 -->
      </ul>
      <a class="dc-next-pager dc-pager" href="#" data-text="下一页">
        <!-- SVG 图标 -->
      </a>
      <a class="dc-last-pager" href="#" data-text="最终页">
        <!-- SVG 图标 -->
      </a>
    </div>
    <div class="dc-dataTable-selector">
      <div class="dc-dataTable-text">跳转至第</div>
      <div class="dc-dataTable-search">
        <input class="dc-dataTable-input" placeholder="1" type="text">
      </div>
      <div class="dc-dataTable-text">页</div>
    </div>
  </div>
</div>
```

## 样式定制

DCPager 组件会自动添加所需的样式。您可以通过以下方式定制样式：

1. **覆盖默认样式**：在您的项目样式表中覆盖组件的默认样式

```css
/* 自定义当前页样式 */
.dc-dataTable-pagination-item.active {
  background-color: #0066cc;
  color: white;
}

/* 自定义分页按钮样式 */
.dc-first-pager, .dc-last-pager, .dc-prev-pager, .dc-next-pager {
  color: #333;
}

/* 自定义禁用状态样式 */
.dc-first-pager.disabled, .dc-last-pager.disabled, .dc-prev-pager.disabled, .dc-next-pager.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
```

2. **修改组件的 addStyles 方法**：如果您需要更彻底的样式定制，可以修改组件的 addStyles 方法

## 响应式设计

DCPager 组件内置了响应式设计，适配不同屏幕尺寸：

- **大屏幕**（> 1024px）：完整显示所有分页元素
- **小屏幕**（≤ 1024px）：调整布局和间距，确保在小屏幕上也能正常显示

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 常见问题

### 1. 分页组件不显示

**可能原因**：
- 容器选择器指定的元素不存在
- DOM 结构创建失败
- 初始化时发生错误

**解决方案**：
- 确保容器选择器指向存在的元素
- 检查浏览器控制台是否有错误信息
- 尝试使用默认的 'body' 容器

### 2. 分页功能不工作

**可能原因**：
- 数据容器中没有子元素
- 事件监听器未正确绑定
- 页码计算错误

**解决方案**：
- 确保数据容器中有子元素
- 检查浏览器控制台是否有错误信息
- 验证分页配置是否正确

### 3. 样式显示异常

**可能原因**：
- 样式冲突
- 响应式设计问题

**解决方案**：
- 检查是否有样式冲突
- 测试在不同屏幕尺寸下的显示效果
- 尝试覆盖默认样式

## 示例代码

### 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DCPager 示例</title>
</head>
<body>
    <h1>DCPager 组件示例</h1>
    
    <!-- 数据容器 -->
    <div id="data-container">
        <!-- 动态生成的测试数据 -->
    </div>
    
    <!-- 分页容器 -->
    <div id="pager-container"></div>

    <!-- 引入 DCPager 组件 -->
    <script src="path/to/dcpager.js"></script>

    <script>
        // 生成测试数据
        function generateTestData() {
            const dataContainer = document.getElementById('data-container');
            dataContainer.innerHTML = '';
            
            for (let i = 1; i <= 30; i++) {
                const item = document.createElement('div');
                item.className = 'test-item';
                item.style.padding = '10px';
                item.style.margin = '5px 0';
                item.style.border = '1px solid #ddd';
                item.style.backgroundColor = '#f9f9f9';
                item.textContent = `测试数据项 ${i}`;
                dataContainer.appendChild(item);
            }
        }
        
        // 生成测试数据
        generateTestData();
        
        // 初始化分页组件
        const pager = new DC.Pager({
            container: '#pager-container',
            itemsPerPage: 5,
            visiblePages: 5
        });
    </script>
</body>
</html>
```

### 自定义配置示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>自定义 DCPager 示例</title>
    <style>
        /* 自定义样式 */
        .dc-dataTable-pagination-item.active {
            background-color: #0066cc;
            color: white;
        }
        
        .test-item {
            padding: 15px;
            margin: 10px 0;
            border: 1px solid #ccc;
            background-color: #f0f0f0;
        }
    </style>
</head>
<body>
    <h1>自定义 DCPager 示例</h1>
    
    <div id="custom-container">
        <h2>测试数据</h2>
        <div id="data-list">
            <!-- 数据项将在这里生成 -->
        </div>
    </div>

    <!-- 引入 DCPager 组件 -->
    <script src="path/to/dcpager.js"></script>

    <script>
        // 生成测试数据
        function generateData() {
            const dataList = document.getElementById('data-list');
            dataList.innerHTML = '';
            
            for (let i = 1; i <= 25; i++) {
                const item = document.createElement('div');
                item.className = 'test-item';
                item.textContent = `数据项 ${i}`;
                dataList.appendChild(item);
            }
        }
        
        // 生成数据
        generateData();
        
        // 初始化自定义配置的分页组件
        const customPager = new DC.Pager({
            container: '#custom-container',
            itemsPerPage: 3,
            visiblePages: 3
        });
    </script>
</body>
</html>
```

## 结论

DCPager 是一个功能完整、易于使用的分页组件，适用于各种需要分页显示数据的网页场景。它提供了丰富的配置选项和完整的分页导航功能，同时支持响应式设计和自动DOM结构创建，为开发者提供了便捷的分页解决方案。

通过本文档的指导，您应该能够轻松地在您的项目中集成和使用 DCPager 组件，并根据您的需求进行定制和扩展。