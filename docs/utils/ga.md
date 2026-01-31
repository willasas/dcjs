# ga 工具类文档

## 1. 工具类介绍

`ga` 工具类提供了一个简单的函数 `initGoogleAnalytics`，用于初始化 Google Analytics 经典版（ga.js）跟踪代码。该工具类可以帮助开发者快速集成 Google Analytics 到前端项目中，实现网站访问数据的收集和分析。

**注意：** Google Analytics 经典版（ga.js）已于 2023 年 7 月 1 日停止服务，建议使用 Google Analytics 4（gtag.js）替代。

## 2. 安装和引入

### 2.1 ES6 模块引入

```javascript
import initGoogleAnalytics from 'path/to/ga.js';
```

### 2.2 直接引入

```html
<script type="module">
  import initGoogleAnalytics from 'path/to/ga.js';
  // 使用 initGoogleAnalytics 函数
</script>
```

## 3. API 参考

### 3.1 initGoogleAnalytics(accountId)

初始化 Google Analytics 跟踪代码。

**参数**：
- `accountId` (String): Google Analytics 账户 ID，格式为 "UA-XXXXXXXX-X"

**功能**：
1. 创建并初始化 `_gaq` 全局数组
2. 设置 Google Analytics 账户 ID
3. 发送页面浏览事件
4. 动态加载 Google Analytics 跟踪脚本
5. 根据当前协议（http/https）选择合适的脚本 URL

## 4. 使用示例

### 4.1 基本使用

```javascript
// 引入 ga 工具类
import initGoogleAnalytics from 'path/to/ga.js';

// 初始化 Google Analytics
// 注意：请替换为您自己的 Google Analytics 账户 ID
initGoogleAnalytics('UA-12345678-1');
```

### 4.2 发送自定义事件

```javascript
// 引入 ga 工具类
import initGoogleAnalytics from 'path/to/ga.js';

// 初始化 Google Analytics
initGoogleAnalytics('UA-12345678-1');

// 发送自定义事件
try {
  if (window._gaq) {
    // 发送事件：分类、操作、标签
    window._gaq.push(['_trackEvent', 'Button', 'Click', 'Submit']);

    // 发送页面浏览：虚拟页面路径
    window._gaq.push(['_trackPageview', '/virtual-page']);

    // 发送电子商务事件
    window._gaq.push(['_addTrans', 'order123', 'store', '100.00', '5.00', '10.00', 'City', 'State', 'Country']);
    window._gaq.push(['_addItem', 'order123', 'sku123', 'Product', 'Category', '50.00', '2']);
    window._gaq.push(['_trackTrans']);
  }
} catch (error) {
  console.error('发送 Google Analytics 事件失败:', error);
}
```

### 4.3 完整 HTML 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Analytics 示例</title>
</head>
<body>
  <h1>网站标题</h1>
  <p>网站内容</p>
  <button onclick="trackButtonClick()">点击按钮</button>

  <script type="module">
    // 引入 ga 工具类
    import initGoogleAnalytics from 'path/to/ga.js';

    // 初始化 Google Analytics
    initGoogleAnalytics('UA-12345678-1');

    // 跟踪按钮点击事件
    window.trackButtonClick = function() {
      try {
        if (window._gaq) {
          window._gaq.push(['_trackEvent', 'Button', 'Click', 'Demo Button']);
          alert('事件已发送到 Google Analytics');
        }
      } catch (error) {
        console.error('发送事件失败:', error);
      }
    };
  </script>
</body>
</html>
```

## 5. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| IE 11 | ❌ (不支持 ES6 模块) |

## 6. 注意事项

1. **服务停止**：Google Analytics 经典版（ga.js）已于 2023 年 7 月 1 日停止服务，建议使用 Google Analytics 4（gtag.js）替代。

2. **账户 ID**：使用时请替换为您自己的 Google Analytics 账户 ID，格式为 "UA-XXXXXXXX-X"。

3. **隐私合规**：根据 GDPR 等隐私法规，使用 Google Analytics 前请确保获得用户同意，并提供隐私政策说明。

4. **HTTPS 支持**：工具类会自动根据当前协议选择合适的脚本 URL，支持 HTTPS 和 HTTP。

5. **错误处理**：建议在使用 `_gaq` 数组时添加错误处理，以避免因 Google Analytics 脚本加载失败而导致的页面错误。

6. **ES6 模块**：该工具类使用 ES6 模块语法，不支持 IE 11 等旧浏览器。如需支持旧浏览器，请使用 Babel 等工具进行转译。

## 7. 迁移到 Google Analytics 4

由于 Google Analytics 经典版已停止服务，建议迁移到 Google Analytics 4。以下是 GA4 的初始化代码示例：

### 7.1 GA4 初始化代码

```javascript
function initGoogleAnalytics4(measurementId) {
  // 初始化 dataLayer
  window.dataLayer = window.dataLayer || [];

  // 定义 gtag 函数
  function gtag(){dataLayer.push(arguments);}

  // 设置时间戳
  gtag('js', new Date());

  // 配置 GA4 测量 ID
  gtag('config', measurementId);

  // 动态加载 gtag.js 脚本
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;

  // 插入脚本到文档中
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(script, s);
}

// 使用示例
initGoogleAnalytics4('G-XXXXXXXXXX');
```

### 7.2 GA4 事件发送示例

```javascript
// 发送页面浏览事件
gtag('config', 'G-XXXXXXXXXX', {
  'page_path': '/new-page',
  'page_title': '新页面标题'
});

// 发送自定义事件
gtag('event', 'button_click', {
  'event_category': 'Button',
  'event_label': 'Submit',
  'value': 1
});

// 发送电子商务事件
gtag('event', 'begin_checkout', {
  'items': [
    {
      'id': 'sku123',
      'name': 'Product',
      'category': 'Category',
      'quantity': 1,
      'price': '50.00'
    }
  ]
});
```

## 8. 测试

测试文件位于 `test/utils/ga/ga.test.js`，包含了对 `initGoogleAnalytics` 函数的测试用例。

### 8.1 运行测试

```bash
# 在项目根目录运行
npm test

# 或者直接运行特定测试文件
node test/utils/ga/ga.test.js
```

## 9. 示例代码

示例代码位于 `examples/utils/ga/index.html`，提供了一个完整的 Google Analytics 集成示例，包括基本使用、事件发送和迁移到 GA4 的指南。

### 9.1 打开示例

在浏览器中打开 `examples/utils/ga/index.html` 文件即可查看和测试 Google Analytics 集成示例。

## 10. 总结

`ga` 工具类提供了一个简单的方法来初始化 Google Analytics 经典版跟踪代码，具有以下特点：

1. **简单易用**：只需一行代码即可初始化 Google Analytics
2. **自动协议检测**：支持 HTTP 和 HTTPS 协议
3. **事件发送**：可通过 `_gaq` 数组发送各种类型的事件
4. **ES6 模块**：使用现代 JavaScript 模块语法

**注意**：由于 Google Analytics 经典版已停止服务，建议使用 Google Analytics 4 替代。本工具类仅作为历史代码参考。
