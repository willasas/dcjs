# dcpricing组件使用说明

## 1. 组件介绍

dcpricing组件是一个用于展示价格卡片的组件，包含以下主要功能：

- 根据价格数据自动生成价格卡片
- 自动标记Basic计划为Popular
- 支持特性启用/禁用状态显示
- 响应式设计，适配不同屏幕尺寸
- 支持自定义样式（使用CSS变量）
- 购买按钮链接功能

## 2. 目录结构

```
src/components/dcpricing/
├── dcpricing.css       # 样式文件
├── dcpricing.js        # 核心组件
└── dcpricing.scss      # SCSS源文件
```

## 3. 核心类 - DCPricing

### 3.1 构造函数

```javascript
const dcPricing = new DC.Pricing(priceData, containerSelector, customClass);
```

**参数**：
- `priceData` (Array): 价格数据数组
  - `priceData[].name` (string): 计划名称（Basic计划会自动标记为Popular）
  - `priceData[].price` (number): 价格
  - `priceData[].priceUnit` (string): 价格单位（如$、¥等）
  - `priceData[].unit` (string): 计费周期（如/month、/year等）
  - `priceData[].buy` (string): 购买按钮文本
  - `priceData[].buyLink` (string): 购买链接
  - `priceData[].features` (Array): 特性列表
    - `priceData[].features[].desc` (string): 特性描述
    - `priceData[].features[].tag` (string): 特性是否可用（'true'或'false'）
- `containerSelector` (string): 容器选择器，默认为'body'
- `customClass` (string): 自定义样式类名，默认为''

### 3.2 主要方法

#### 3.2.1 init()

初始化组件并渲染价格卡片

**示例**：
```javascript
dcPricing.init();
```

## 4. 使用示例

### 4.1 基本用法

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>价格卡片示例</title>
    <!-- 自定义CSS变量 -->
    <style>
        :root {
            --bg-theme-100: #f0f0f0;
            --bg-theme-200: #e0e0e0;
            --bg-theme-500: #4CAF50;
            --bg-theme-800: #388E3C;
            --font-theme-600: #666;
            --font-theme-800: #333;
            --font-theme-900: #222;
            --font-theme-950: #000;
        }
    </style>
</head>
<body>
    <div id="pricing-container"></div>
    
    <script>
        // 模拟模块导出
        window.module = {};
        window.module.exports = {};
    </script>
    
    <script src="path/to/dcpricing.js"></script>
    
    <script>
        // 价格数据
        const priceData = [
            {
                name: 'Basic',
                price: 10,
                priceUnit: '$',
                unit: '/month',
                buy: 'Buy Now',
                buyLink: 'https://example.com/buy/basic',
                features: [
                    { desc: '10GB Storage', tag: 'true' },
                    { desc: 'Basic Support', tag: 'true' },
                    { desc: '1 User', tag: 'true' },
                    { desc: 'Advanced Features', tag: 'false' }
                ]
            },
            {
                name: 'Pro',
                price: 20,
                priceUnit: '$',
                unit: '/month',
                buy: 'Buy Now',
                buyLink: 'https://example.com/buy/pro',
                features: [
                    { desc: '50GB Storage', tag: 'true' },
                    { desc: 'Priority Support', tag: 'true' },
                    { desc: '5 Users', tag: 'true' },
                    { desc: 'Advanced Features', tag: 'true' }
                ]
            }
        ];
        
        // 初始化DCPricing
        const dcPricing = new DC.Pricing(priceData, '#pricing-container');
        
        // 渲染价格卡片
        dcPricing.init();
    </script>
</body>
</html>
```

### 4.2 高级用法

```javascript
// 价格数据
const priceData = [
    {
        name: 'Basic',
        price: 99,
        priceUnit: '¥',
        unit: '/month',
        buy: '立即购买',
        buyLink: 'https://example.com/buy/basic',
        features: [
            { desc: '基础功能', tag: 'true' },
            { desc: '10GB存储空间', tag: 'true' },
            { desc: '邮件支持', tag: 'true' },
            { desc: '高级分析', tag: 'false' }
        ]
    },
    {
        name: 'Professional',
        price: 199,
        priceUnit: '¥',
        unit: '/month',
        buy: '立即购买',
        buyLink: 'https://example.com/buy/professional',
        features: [
            { desc: '全部功能', tag: 'true' },
            { desc: '50GB存储空间', tag: 'true' },
            { desc: '电话支持', tag: 'true' },
            { desc: '高级分析', tag: 'true' }
        ]
    },
    {
        name: 'Enterprise',
        price: 499,
        priceUnit: '¥',
        unit: '/month',
        buy: '立即购买',
        buyLink: 'https://example.com/buy/enterprise',
        features: [
            { desc: '企业级功能', tag: 'true' },
            { desc: '无限存储空间', tag: 'true' },
            { desc: '24/7支持', tag: 'true' },
            { desc: '高级分析', tag: 'true' }
        ]
    }
];

// 初始化DCPricing
const dcPricing = new DC.Pricing(priceData, '.pricing-section', 'custom-pricing');

// 渲染价格卡片
dcPricing.init();
```

## 4. 样式说明

### 4.1 CSS变量

组件使用以下CSS变量定义主题色：

```css
:root {
    --bg-theme-100: #f0f0f0;
    --bg-theme-200: #e0e0e0;
    --bg-theme-500: #4CAF50;
    --bg-theme-800: #388E3C;
    --font-theme-600: #666;
    --font-theme-800: #333;
    --font-theme-900: #222;
    --font-theme-950: #000;
}
```

可以通过修改这些变量来自定义样式。

### 4.2 主要样式类

- `.dc-pricing-container`: 价格卡片容器
- `.dc-card`: 价格卡片
- `.dc-card-popular`: 热门价格卡片（Basic计划）
- `.dc-card-header`: 卡片头部
- `.dc-card-title`: 卡片标题（计划名称）
- `.dc-card-tag`: 热门标签
- `.dc-card-price`: 价格区域
- `.dc-card-price-value`: 价格值
- `.dc-card-price-unit`: 价格单位
- `.dc-card-buy`: 购买按钮
- `.dc-card-features-list`: 特性列表
- `.dc-card-feature`: 单个特性
- `.dc-card-feature-icon`: 特性图标
- `.dc-card-feature-icon-disabled`: 禁用的特性图标
- `.dc-card-feature-desc`: 特性描述
- `.dc-card-feature-desc-disabled`: 禁用的特性描述

## 5. 响应式设计

组件使用flex布局，会自动适应容器大小，在不同屏幕尺寸下都能正常显示：

- **桌面端**：水平排列价格卡片
- **平板端**：根据容器宽度自动调整卡片排列
- **移动端**：垂直排列价格卡片

## 6. 注意事项

1. **价格数据格式**：请确保提供正确的价格数据格式，包含所有必要的属性
2. **Basic计划**：名称为'Basic'的计划会自动标记为Popular
3. **特性状态**：特性的tag属性必须是字符串'true'或'false'
4. **CSS变量**：如果需要自定义样式，请修改:root中的CSS变量
5. **浏览器兼容性**：支持所有现代浏览器，IE11及以下可能需要polyfill

## 7. 常见问题

### 7.1 价格卡片不显示

**原因**：
- 容器选择器不正确
- 价格数据格式错误
- 缺少必要的属性

**解决方案**：
- 检查容器选择器是否正确
- 验证价格数据格式是否正确
- 确保每个计划都包含所有必要的属性

### 7.2 Basic计划没有Popular标记

**原因**：
- 计划名称不是完全的'Basic'

**解决方案**：
- 将计划名称设置为'Basic'，确保大小写一致

### 7.3 特性状态显示不正确

**原因**：
- tag属性不是字符串'true'或'false'

**解决方案**：
- 确保tag属性是字符串格式的'true'或'false'，而不是布尔值

### 7.4 样式自定义不生效

**原因**：
- CSS变量修改位置不正确
- 自定义CSS被组件样式覆盖

**解决方案**：
- 在:root中修改CSS变量
- 确保自定义CSS在组件样式之后加载

## 8. 测试

测试文件位于 `test/components/dcpricing/dcpricing.test.js`，包含以下测试用例：

- DCPricing组件初始化测试
- 价格卡片内容渲染测试
- Basic计划Popular标记测试
- 非Basic计划Popular标记测试
- 特性启用/禁用状态测试
- 自定义容器选择器测试

## 9. 示例

完整的使用示例位于 `examples/components/dcpricing/index.html`，展示了：

- 价格卡片的基本用法
- 价格数据格式说明
- 样式自定义方法
