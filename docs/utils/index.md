# 工具类

DCJS 工具库提供了丰富的工具类，涵盖了前端开发中常见的各种功能需求。这些工具类设计简洁、使用方便，旨在提高开发效率和代码质量。

## 工具类分类

### 基础工具
- [dcArray](./dcArray) - 数组处理工具类
- [dcObject](./dcObject) - 对象处理工具类
- [dcString](./dcString) - 字符串处理工具类
- [dcNumber](./dcNumber) - 数字处理工具类
- [dcDate](./dcDate) - 日期处理工具类
- [dcUrl](./dcUrl) - URL 处理工具类
- [dcFunction](./dcFunction) - 函数处理工具类
- [dcjson](./dcjson) - JSON 处理工具类

### 浏览器相关
- [dcBrowser](./dcBrowser) - 浏览器信息和操作工具类
- [dcplatform](./dcplatform) - 平台检测工具类
- [dcCookie](./dcCookie) - Cookie 操作工具类
- [dcStorage](./dcStorage) - 存储操作工具类
- [dcEle](./dcEle) - DOM 元素操作工具类
- [dcDynamicLoader](./dcDynamicLoader) - 动态加载工具类

### 网络与媒体
- [dcNetworkChecker](./dcNetworkChecker) - 网络连接检测工具类
- [dchttps](./dchttps) - HTTPS 相关工具类
- [dcMedia](./dcMedia) - 媒体处理工具类
- [dcImageViewer](./dcImageViewer) - 图片查看器工具类
- [dcScreenshot](./dcScreenshot) - 截图工具类

### 工具与辅助
- [dcCrypto](./dcCrypto) - 加密工具类
- [dcValidate](./dcValidate) - 验证工具类
- [dcFiles](./dcFiles) - 文件操作工具类
- [dcStarSign](./dcStarSign) - 星座工具类
- [dcDailyQuote](./dcDailyQuote) - 每日名言工具类
- [dcContentStats](./dcContentStats) - 内容统计工具类
- [dcSearch](./dcSearch) - 搜索工具类
- [dcTags](./dcTags) - 标签管理工具类
- [dclottery](./dclottery) - 抽奖工具类
- [dcqrcode](./dcqrcode) - 二维码生成工具类
- [dcwaterfall](./dcwaterfall) - 瀑布流布局工具类
- [dcinfinitescroller](./dcinfinitescroller) - 无限滚动工具类
- [dcregexp](./dcregexp) - 正则表达式工具类
- [dcpicolor](./dcpicolor) - 颜色处理工具类
- [dprettylog](./dprettylog) - 日志美化工具类
- [ga](./ga) - Google Analytics 工具类
- [dcadapt](./dcadapt) - 适配工具类
- [sampleadapt](./sampleadapt) - 示例适配工具类

## 使用示例

### 基础使用

```javascript
// 引入 DCJS 工具库
<script src="dist/dc-x.x.x-YYYYMMDD.js"></script>

// 使用工具类
const uniqueArray = DC.Array.unique([1, 2, 2, 3, 4, 4, 5]);
console.log(uniqueArray); // [1, 2, 3, 4, 5]

const formattedDate = DC.Date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
console.log(formattedDate); // 2024-01-01 12:00:00

const isEmail = DC.Validate.isEmail('test@example.com');
console.log(isEmail); // true
```

### 高级使用

```javascript
// 创建网络检测实例
const networkChecker = new DC.NetworkChecker({
  testUrls: [
    'https://your-api-domain.com/health',
    'https://api.another-service.com/status'
  ],
  timeout: 3000,
  interval: 5000
});

// 测试网络连接
networkChecker.testConnection().then(result => {
  console.log('网络连接状态:', result);
});

// 开始监控网络状态
networkChecker.startMonitoring();

// 截图示例
const screenshot = new DC.Screenshot({
  scale: 2, // 2倍分辨率
  quality: 0.9
});

// 捕获全页面并下载
screenshot.captureFullPage()
  .then(result => {
    if (result.success) {
      return result.download({ filename: 'full-page' });
    }
  });
```

## 下载

### 最新版本

- **JavaScript 版本**: [dc-latest.js](https://example.com/dist/dc-latest.js)
- **TypeScript 版本**: [dc-ts-latest.js](https://example.com/dist/dc-ts-latest.js)

### 历史版本

请访问 [GitHub Releases](https://github.com/yourusername/dcjs/releases) 下载历史版本。

## 使用建议

1. **按需引入**: 虽然 DCJS 工具库支持全局引入，但在大型项目中，建议按需引入所需的工具类，以减少打包体积。

2. **版本管理**: 建议在项目中固定使用特定版本的 DCJS 工具库，以避免因版本更新导致的兼容性问题。

3. **性能优化**: 对于频繁使用的工具方法，建议将其缓存到局部变量中，以提高执行效率。

4. **错误处理**: 在使用网络相关工具类时，建议添加适当的错误处理，以提高应用的稳定性。

5. **贡献代码**: 如果您发现了 bug 或有新的功能建议，欢迎贡献代码或提交 issue。

## 浏览器兼容性

DCJS 工具库兼容所有现代浏览器：

- Chrome ≥ 45
- Firefox ≥ 40
- Safari ≥ 9
- Edge ≥ 12

对于旧版浏览器，可能需要添加适当的 polyfill。
