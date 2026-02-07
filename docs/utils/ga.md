# Google Analytics 4 工具使用说明

## 简介

`DC.GA` 是一个基于 Google Analytics 4 (gtag.js) 的封装工具类，用于在网页中集成和使用 Google Analytics 4 分析服务。该工具类提供了简洁易用的 API，帮助开发者快速实现网站数据统计和用户行为分析。

## 功能特性

- ✅ 初始化 Google Analytics 4 测量 ID
- ✅ 发送页面浏览事件
- ✅ 发送自定义事件
- ✅ 发送用户参与度事件
- ✅ 发送转化事件
- ✅ 动态加载 Google Analytics 4 gtag.js 脚本
- ✅ 提供完整的 Google Analytics 4 API 封装
- ✅ 支持 HTTP/HTTPS 协议自动切换
- ✅ 提供错误处理和日志输出

## 快速开始

### 1. 引入工具类

在 HTML 文件中引入 DC 库：

```html
<script src="../../../dist/dc.iife.js"></script>
```

### 2. 初始化 Google Analytics 4

使用您的 Google Analytics 4 测量 ID 初始化：

```javascript
// 初始化 Google Analytics 4
// 注意：请替换为您自己的 Google Analytics 4 测量 ID
DC.GA.init('G-XXXXXXXXXX');
```

### 3. 发送页面浏览事件

```javascript
// 发送页面浏览事件
DC.GA.trackPageview('/home');

// 带自定义参数的页面浏览事件
DC.GA.trackPageview('/product/123', {
  page_title: '产品详情页',
  user_type: 'registered'
});
```

### 4. 发送自定义事件

```javascript
// 发送自定义事件
DC.GA.trackEvent('button_click', {
  event_category: 'engagement',
  event_label: 'homepage',
  value: 1
});

// 发送表单提交事件
DC.GA.trackEvent('form_submit', {
  event_category: 'conversion',
  event_label: 'contact_form',
  form_name: '联系表单'
});
```

### 5. 发送用户参与度事件

```javascript
// 发送用户参与度事件
DC.GA.trackEngagement('scroll', {
  percent_scrolled: 75
});

// 发送视频观看事件
DC.GA.trackEngagement('video_watch', {
  video_title: '产品介绍视频',
  percent_watched: 50
});
```

### 6. 发送转化事件

```javascript
// 发送转化事件
DC.GA.trackConversion('signup', {
  value: 100,
  currency: 'CNY'
});

// 发送购买转化事件
DC.GA.trackConversion('purchase', {
  value: 299,
  currency: 'CNY',
  product_id: 'P123',
  quantity: 1
});
```

## API 文档

### 1. init(measurementId, options)

初始化 Google Analytics 4。

**参数：**
- `measurementId`：Google Analytics 4 测量 ID (格式: G-XXXXXXXXXX)
- `options`：配置选项（可选）

**返回值：**
- 无

**示例：**
```javascript
DC.GA.init('G-XXXXXXXXXX', {
  debug_mode: true,
  page_title: '首页'
});
```

### 2. trackPageview(pagePath, options)

发送页面浏览事件。

**参数：**
- `pagePath`：页面路径
- `options`：配置选项（可选）

**返回值：**
- 无

**示例：**
```javascript
DC.GA.trackPageview('/about', {
  page_title: '关于我们',
  user_type: 'guest'
});
```

### 3. trackEvent(eventName, eventParams)

发送自定义事件。

**参数：**
- `eventName`：事件名称
- `eventParams`：事件参数（可选）

**返回值：**
- 无

**示例：**
```javascript
DC.GA.trackEvent('search', {
  event_category: 'engagement',
  event_label: 'site_search',
  search_term: '产品'
});
```

### 4. trackEngagement(engagementType, params)

发送用户参与度事件。

**参数：**
- `engagementType`：参与度类型
- `params`：事件参数（可选）

**返回值：**
- 无

**示例：**
```javascript
DC.GA.trackEngagement('time_on_page', {
  seconds: 300
});
```

### 5. trackConversion(conversionName, params)

发送转化事件。

**参数：**
- `conversionName`：转化名称
- `params`：事件参数（可选）

**返回值：**
- 无

**示例：**
```javascript
DC.GA.trackConversion('subscription', {
  value: 50,
  currency: 'CNY',
  plan_type: 'premium'
});
```

## 完整示例

### 基本用法

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Analytics 4 示例</title>
  <script src="../../../dist/dc.iife.js"></script>
</head>
<body>
  <h1>Google Analytics 4 集成示例</h1>

  <button id="clickButton">点击我</button>
  <button id="convertButton">转化按钮</button>

  <script>
    // 初始化 Google Analytics 4
    DC.GA.init('G-XXXXXXXXXX');

    // 发送页面浏览事件
    DC.GA.trackPageview('/demo');

    // 点击事件跟踪
    document.getElementById('clickButton').addEventListener('click', function() {
      DC.GA.trackEvent('button_click', {
        event_category: 'engagement',
        event_label: 'demo_button'
      });
    });

    // 转化事件跟踪
    document.getElementById('convertButton').addEventListener('click', function() {
      DC.GA.trackConversion('demo_conversion', {
        value: 100,
        currency: 'CNY'
      });
    });
  </script>
</body>
</html>
```

### 高级用法

```javascript
// 初始化时设置用户属性
DC.GA.init('G-XXXXXXXXXX', {
  user_properties: {
    membership_level: 'gold',
    user_age: 25
  },
  debug_mode: true
});

// 发送复杂事件
DC.GA.trackEvent('product_view', {
  event_category: 'ecommerce',
  event_label: 'product_detail',
  product_id: 'P12345',
  product_name: '高端智能手机',
  price: 5999,
  currency: 'CNY',
  brand: 'Example Brand',
  category: 'electronics'
});

// 跟踪用户滚动深度
window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);

  if (scrollPercent >= 25 && !window.scrolled25) {
    DC.GA.trackEngagement('scroll', { percent_scrolled: 25 });
    window.scrolled25 = true;
  }

  if (scrollPercent >= 50 && !window.scrolled50) {
    DC.GA.trackEngagement('scroll', { percent_scrolled: 50 });
    window.scrolled50 = true;
  }

  if (scrollPercent >= 75 && !window.scrolled75) {
    DC.GA.trackEngagement('scroll', { percent_scrolled: 75 });
    window.scrolled75 = true;
  }

  if (scrollPercent >= 90 && !window.scrolled90) {
    DC.GA.trackEngagement('scroll', { percent_scrolled: 90 });
    window.scrolled90 = true;
  }
});
```

## 注意事项

1. **测量 ID 获取**：
   - 登录 Google Analytics 4 管理界面
   - 创建或选择现有属性
   - 在 "数据收集" > "数据流" 中获取测量 ID
   - 测量 ID 格式为 `G-XXXXXXXXXX`

2. **权限设置**：
   - 确保您的网站域名已在 Google Analytics 4 中添加为允许的来源
   - 检查浏览器的内容安全策略 (CSP) 设置，确保允许加载 gtag.js 脚本

3. **隐私合规**：
   - 根据 GDPR、CCPA 等隐私法规，确保在使用前获取用户同意
   - 提供隐私政策和 Cookie 同意选项

4. **调试模式**：
   - 在开发环境中，可启用调试模式查看详细日志
   - 在生产环境中，建议禁用调试模式

5. **性能优化**：
   - 脚本会异步加载，不会阻塞页面渲染
   - 事件发送采用队列机制，确保数据可靠传输

## 常见问题

### Q: 为什么事件没有显示在 Google Analytics 4 中？

**A:** 可能的原因：
- 测量 ID 不正确
- 网络连接问题
- 数据处理延迟（Google Analytics 4 可能需要 24-48 小时处理数据）
- 浏览器广告拦截器阻止了跟踪脚本
- 事件参数格式不正确

### Q: 如何在单页应用中使用？

**A:** 在路由变更时发送页面浏览事件：

```javascript
// 路由变更时
function onRouteChange(newPath) {
  DC.GA.trackPageview(newPath);
}
```

### Q: 如何跟踪电子商务事件？

**A:** 使用标准的电子商务事件参数：

```javascript
// 跟踪产品点击
DC.GA.trackEvent('select_item', {
  items: [{
    item_id: 'P123',
    item_name: '产品名称',
    price: 99.99,
    quantity: 1
  }]
});

// 跟踪购买
DC.GA.trackEvent('purchase', {
  transaction_id: 'T12345',
  value: 299.99,
  tax: 29.99,
  shipping: 10,
  currency: 'CNY',
  items: [{
    item_id: 'P123',
    item_name: '产品名称',
    price: 99.99,
    quantity: 3
  }]
});
```

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

## 版本历史

### v1.0.0
- 初始版本
- 基于 Google Analytics 4 (gtag.js) 实现
- 提供完整的事件跟踪 API
- 支持所有 Google Analytics 4 标准事件

## 相关资源

- [Google Analytics 4 官方文档](https://support.google.com/analytics/answer/10089681)
- [gtag.js 开发者指南](https://developers.google.com/analytics/devguides/collection/gtagjs)
- [Google Analytics 4 事件参数参考](https://support.google.com/analytics/answer/9267735)

## 许可证

MIT License