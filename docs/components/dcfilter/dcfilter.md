# DCFilter 组件

## 1. 组件介绍

DCFilter 是一个功能强大的筛选器组件，支持多级分类筛选、单选/多选模式、移动端适配等功能。它提供了丰富的配置选项和回调函数，可以满足各种筛选场景的需求。

### 1.1 主要功能

- 支持多级分类筛选
- 支持单选和多选模式
- 移动端自适应布局
- 支持自定义筛选条件
- 实时显示筛选结果
- 支持重置筛选条件
- 支持显示已选数量
- 支持最大选择数量限制
- 支持自动收起其他展开的分类
- 丰富的回调函数

### 1.2 应用场景

- 电商网站的商品筛选
- 内容管理系统的内容筛选
- 数据可视化的维度筛选
- 任何需要多级分类筛选的场景

## 2. API 文档

### 2.1 构造函数

```javascript
new DC.Filter(options)
```

#### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| options | Object | {} | 配置选项 |
| options.container | HTMLElement/String | null | 容器元素或选择器 |
| options.data | Array | [] | 筛选数据源 |
| options.categories | Array | [] | 筛选分类配置 |
| options.resultContainer | HTMLElement/String | null | 结果容器或选择器 |
| options.defaultValue | String | 'all' | 默认选中值 |
| options.multiple | Boolean | true | 是否支持多选 |
| options.mobileBreakpoint | Number | 1024 | 移动端断点 |
| options.onFilter | Function | null | 筛选回调 |
| options.onReset | Function | null | 重置回调 |
| options.noResultText | String | '暂无相关内容' | 无结果提示文本 |
| options.allText | String | '全部' | "全部"选项的文本 |
| options.maxSelection | Number | 3 | 每个分类最多可选数量 |
| options.autoCollapse | Boolean | true | 移动端是否自动收起其他展开的分类 |
| options.showSelectedCount | Boolean | true | 是否显示已选数量 |

### 2.2 方法

#### reset()

重置筛选条件为默认状态。

#### getCurrentFilters()

获取当前选中的筛选条件。

**返回值**：
- Object: 当前筛选条件对象，键为分类key，值为选中值数组

#### setFilters(filters)

设置筛选条件。

**参数**：
- filters: Object - 筛选条件对象，键为分类key，值为选中值数组或单个值

## 3. 使用示例

### 3.1 基本使用

```javascript
// 引入 DCFilter
// <script src="path/to/dcfilter.js"></script>

// 准备数据
const products = [
    { id: 1, name: '产品1', category: 'electronics', price: 'high' },
    { id: 2, name: '产品2', category: 'clothing', price: 'medium' },
    { id: 3, name: '产品3', category: 'electronics', price: 'low' }
];

// 准备分类配置
const categories = [
    {
        key: 'category',
        name: '分类',
        children: [
            { name: '电子产品', value: 'electronics' },
            { name: '服装', value: 'clothing' }
        ]
    },
    {
        key: 'price',
        name: '价格',
        children: [
            { name: '高', value: 'high' },
            { name: '中', value: 'medium' },
            { name: '低', value: 'low' }
        ]
    }
];

// 初始化筛选器
const filter = new DC.Filter({
    container: '#filter-container',
    data: products,
    categories: categories,
    resultContainer: '#result-container',
    onFilter: (results, filters) => {
        console.log('筛选结果:', results);
        console.log('当前筛选条件:', filters);
    },
    onReset: () => {
        console.log('筛选条件已重置');
    }
});
```

### 3.2 单选模式

```javascript
const filter = new DC.Filter({
    container: '#filter-container',
    data: products,
    categories: categories,
    resultContainer: '#result-container',
    multiple: false,
    onFilter: (results, filters) => {
        console.log('筛选结果:', results);
    }
});
```

### 3.3 自定义配置

```javascript
const filter = new DC.Filter({
    container: '#filter-container',
    data: products,
    categories: categories,
    resultContainer: '#result-container',
    maxSelection: 2, // 每个分类最多选择2个
    showSelectedCount: true, // 显示已选数量
    autoCollapse: true, // 自动收起其他展开的分类
    noResultText: '没有找到相关产品', // 无结果提示
    allText: '全部分类', // "全部"选项文本
    onFilter: (results, filters) => {
        console.log('筛选结果:', results);
    }
});
```

### 3.4 动态数据

```javascript
// 动态获取数据
fetch('api/products')
    .then(response => response.json())
    .then(data => {
        const filter = new DC.Filter({
            container: '#filter-container',
            data: data.products,
            categories: data.categories,
            resultContainer: '#result-container',
            onFilter: (results, filters) => {
                console.log('筛选结果:', results);
            }
        });
    });
```

### 3.5 自定义结果展示

```javascript
const filter = new DC.Filter({
    container: '#filter-container',
    data: products,
    categories: categories,
    onFilter: (results, filters) => {
        // 自定义结果展示
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = '';

        if (results.length === 0) {
            resultContainer.innerHTML = '<div class="no-result">暂无相关产品</div>';
            return;
        }

        results.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>分类: ${product.category}</p>
                <p>价格: ${product.price}</p>
            `;
            resultContainer.appendChild(productItem);
        });
    }
});
```

## 4. 样式说明

### 4.1 默认样式

DCFilter 会自动创建以下默认样式：

```css
.dc-filter { width: 100%; background: #fff; border-radius: 4px; padding: 15px; box-sizing: border-box; }
.dc-filter .dc-filter-group { display: flex; justify-content: flex-start; align-items: flex-start; }
.dc-filter .dc-filter-group:not(:last-child) { padding-bottom: 15px; }
.dc-filter .dc-filter-group .dc-filter-parent { font-size: 16px; color: #303133; font-weight: bold; line-height: 32px; cursor: default; min-width: 60px; padding: 0 10px;z-index:3; }
.dc-filter .dc-filter-group .dc-filter-parent .icon { display: none; }
.dc-filter .dc-filter-group .dc-filter-children { display: flex; flex-wrap: wrap; gap: 10px; min-height: 32px; flex: 1; }
.dc-filter .dc-filter-group .dc-filter-item { display: flex; justify-content: center; align-items: center; padding: 6px 12px; font-size: 14px; line-height: 1.2; color: #303133; background: #fff; border: 1px solid #dcdfe6; border-radius: 4px; cursor: pointer; transition: all 0.3s; box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1); outline: none; }
.dc-filter .dc-filter-group .dc-filter-item:hover { color: #000; background: #f5f7fa; }
.dc-filter .dc-filter-group .dc-filter-item.active { color: #ffa704; border-color: #ffa704; background: rgba(255, 167, 4, 0.1); }
.dc-filter-results { margin-top: 20px; }
.dc-filter-results .dc-filter-result-item { padding: 10px; margin-bottom: 10px; background: #fff; border: 1px solid #dcdfe6; border-radius: 4px; }
.dc-filter-results .dc-filter-result-item:hover { background: #f5f7fa; }
.dc-filter-results .dc-filter-no-result { text-align: center; padding: 20px; color: #909399; font-size: 14px; }

/* 移动端样式 */
@media screen and (max-width: 1024px) {
    .dc-filter { padding: 10px; }
    .dc-filter.dc-filter-mobile { display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; flex-direction: row; }
    .dc-filter.dc-filter-mobile .dc-filter-group { position: relative; flex-wrap: wrap; flex-direction: column; min-width: 78px; min-height: 44px; }
    .dc-filter.dc-filter-mobile .dc-filter-group:not(:last-child) { margin-right: 20px; }
    .dc-filter.dc-filter-mobile .dc-filter-group.expanded .dc-filter-children { display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; flex-direction: column; opacity: 1; transform: translateY(0); max-height: 542px; }
    .dc-filter.dc-filter-mobile .dc-filter-group.expanded .dc-filter-parent .icon.icon_down { display: none; }
    .dc-filter.dc-filter-mobile .dc-filter-group.expanded .dc-filter-parent .icon.icon_up { display: block; }
    .dc-filter.dc-filter-mobile .dc-filter-group .dc-filter-parent { width: 100%; position: relative; padding: 0; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; margin: 0; }
    .dc-filter.dc-filter-mobile .dc-filter-group .dc-filter-parent .icon { display: block; position: absolute; right: 0; top: 18px; transform: translateY(-50%); width: 20px; height: 20px; transition: transform 0.3s ease; }
    .dc-filter.dc-filter-mobile .dc-filter-group .dc-filter-parent .icon.icon_up { display: none; }
    .dc-filter.dc-filter-mobile .dc-filter-group .dc-filter-parent .icon path { stroke: #303133; }
    .dc-filter.dc-filter-mobile .dc-filter-group .dc-filter-parent .selected-count { margin-left: 5px; font-size: 14px; color: #ffa704; }
    .dc-filter.dc-filter-mobile .dc-filter-group .dc-filter-children { position: absolute; top: 34px; display: none; padding: 0; background: #f5f7fa; opacity: 0; line-height: 1.2; transform: translateY(-10px); transition: opacity 0.3s ease, transform 0.3s ease; gap: 8px; flex-wrap: wrap; }
    .dc-filter.dc-filter-mobile .dc-filter-group .dc-filter-children .dc-filter-item { padding: 4px 8px; font-size: 14px; min-width: 60px; text-align: center; }
}
```

### 4.2 自定义样式

如果需要自定义样式，可以通过覆盖默认 CSS 类来实现：

```css
/* 自定义筛选器容器样式 */
.dc-filter {
    background: #f5f7fa;
    border: 1px solid #e8e8e8;
}

/* 自定义筛选项样式 */
.dc-filter .dc-filter-item {
    font-size: 13px;
    padding: 4px 10px;
}

/* 自定义激活状态样式 */
.dc-filter .dc-filter-item.active {
    color: #52c41a;
    border-color: #52c41a;
    background: rgba(82, 196, 26, 0.1);
}

/* 自定义移动端样式 */
@media screen and (max-width: 1024px) {
    .dc-filter.dc-filter-mobile .dc-filter-group .dc-filter-children {
        background: #fff;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
}
```

## 5. 最佳实践

### 5.1 性能优化

- **合理设置数据量**：对于大量数据的筛选，建议在服务端进行筛选，客户端只负责展示筛选结果。
- **使用防抖**：对于频繁触发的筛选操作，可以使用防抖来减少计算次数。
- **合理设置最大选择数量**：根据实际需求设置合理的最大选择数量，避免用户选择过多选项导致性能下降。
- **避免复杂的回调函数**：回调函数中避免执行复杂的操作，以免影响用户体验。

### 5.2 移动端适配

- **合理设置移动端断点**：根据实际需求设置合理的移动端断点。
- **使用自动收起功能**：在移动端启用自动收起功能，可以减少屏幕占用，提高用户体验。
- **优化触摸交互**：确保在移动设备上的触摸交互流畅。

### 5.3 无障碍性

- 所有筛选项都有适当的标签和描述。
- 支持键盘导航和屏幕阅读器。
- 聚焦状态有明显的视觉反馈。
- 错误信息有明确的提示。

### 5.4 常见问题

#### 问题：筛选结果不正确

**可能原因**：
- 数据结构与分类配置不匹配。
- 筛选逻辑有误。

**解决方案**：
- 检查数据结构是否与分类配置匹配。
- 检查筛选逻辑是否正确。

#### 问题：移动端布局错乱

**可能原因**：
- 移动端断点设置不合理。
- 自定义样式与默认样式冲突。

**解决方案**：
- 调整移动端断点设置。
- 检查自定义样式是否与默认样式冲突。

#### 问题：筛选器不显示

**可能原因**：
- 容器元素不存在。
- 分类配置为空。

**解决方案**：
- 检查容器元素是否正确指定。
- 检查分类配置是否正确。

#### 问题：筛选速度慢

**可能原因**：
- 数据量过大。
- 回调函数执行复杂操作。

**解决方案**：
- 减少数据量或在服务端进行筛选。
- 优化回调函数，避免执行复杂操作。

## 6. 版本历史

### 1.0.0

- 初始版本
- 支持多级分类筛选
- 支持单选和多选模式
- 移动端自适应布局
- 支持自定义筛选条件
- 实时显示筛选结果
- 支持重置筛选条件
- 支持显示已选数量
- 支持最大选择数量限制
- 支持自动收起其他展开的分类
- 丰富的回调函数

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

DCFilter 组件采用 MIT 许可证，详见 [LICENSE](../../LICENSE.md) 文件。
