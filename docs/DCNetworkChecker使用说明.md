# DCNetworkChecker 使用说明文档

## 概述

`DCNetworkChecker` 是一个用于检测和监控网络连接状态的工具类。它能够检测设备是否连接到网络，测量连接质量，并提供网络状态变化的监听功能。

## 功能特性

- 检测设备是否连接到互联网
- 测试网络连接质量（响应时间）
- 监控网络状态变化（上线/离线）
- 获取浏览器网络信息（连接类型、下行速度等）
- 支持自定义测试URL和配置参数
- 提供重试机制确保检测准确性

## 引入方式

```html
<!-- 在HTML中引入dc.js -->
<script src="dist/dc.js"></script>
```

```javascript
// 或在模块中使用
import { NetworkChecker } from './path/to/dc.js';
```

## API 文档

### 构造函数

```javascript
new DC.NetworkChecker(options)
```

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| options | Object | {} | 配置选项 |
| options.testUrls | Array<string> | 见下方说明 | 用于测试连接的URL数组 |
| options.timeout | number | 5000 | 请求超时时间（毫秒） |
| options.interval | number | 10000 | 定期检查间隔（毫秒） |
| options.retryAttempts | number | 3 | 重试次数 |
| options.retryDelay | number | 1000 | 重试间隔（毫秒） |
| options.onOnline | Function | null | 网络连接恢复时的回调函数 |
| options.onOffline | Function | null | 网络断开时的回调函数 |
| options.onStatusChange | Function | null | 网络状态变化时的回调函数 |

#### 默认测试URL

默认的测试URL包括：
- `https://httpbin.org/get` - 通用HTTP请求测试服务
- `https://api.github.com` - GitHub API，测试HTTPS连接
- `https://www.google.com/generate_204` - Google的无内容响应服务

### 方法

#### testConnection()

测试网络连接状态，不包含重试机制。

- **返回值**: `Promise<Object>` - 网络连接状态结果

```javascript
const result = await networkChecker.testConnection();
// 示例结果:
// { online: true, type: 'valid-response', message: '网络连接正常', responseTime: 120, url: 'https://api.github.com' }
```

#### testConnectionWithRetry()

带重试机制的网络连接测试。

- **返回值**: `Promise<Object>` - 网络连接状态结果

```javascript
const result = await networkChecker.testConnectionWithRetry();
```

#### getNetworkInfo()

获取浏览器网络信息。

- **返回值**: `Object` - 网络相关信息

```javascript
const info = networkChecker.getNetworkInfo();
// 示例结果:
// { 
//   online: true,
//   effectiveType: '4g',
//   downlink: 10,
//   rtt: 50,
//   saveData: false,
//   downlinkMax: 20
// }
```

#### startMonitoring()

开始监控网络状态变化。

```javascript
networkChecker.startMonitoring();
```

#### stopMonitoring()

停止监控网络状态变化。

```javascript
networkChecker.stopMonitoring();
```

#### getStatusSummary()

获取当前网络状态摘要。

- **返回值**: `Promise<Object>` - 包含网络状态和信息的摘要对象

```javascript
const summary = await networkChecker.getStatusSummary();
```

## 使用示例

### 基础使用

```javascript
// 使用默认配置
const networkChecker = new DC.NetworkChecker();

// 检测一次网络连接
networkChecker.testConnection().then(result => {
  if (result.online) {
    console.log('网络连接正常，响应时间:', result.responseTime, 'ms');
  } else {
    console.error('网络连接失败:', result.message);
  }
});
```

### 自定义配置

```javascript
// 自定义配置
const networkChecker = new DC.NetworkChecker({
  testUrls: [
    'https://your-api-domain.com/health',  // 自定义健康检查端点
    'https://api.another-service.com/status', // 其他API服务
    'https://www.google.com/generate_204' // 保留公共端点作为备选
  ],
  timeout: 3000,           // 3秒超时
  interval: 5000,          // 5秒检查一次
  retryAttempts: 2,        // 重试2次
  retryDelay: 500,         // 重试间隔500ms
  onOnline: () => {
    console.log('网络已连接');
    // 可以在这里尝试重新连接服务或同步数据
  },
  onOffline: () => {
    console.log('网络已断开');
    // 可以在这里切换到离线模式或显示提示
  }
});

// 获取网络状态摘要
networkChecker.getStatusSummary().then(summary => {
  console.log('网络状态摘要:', summary);
});
```

### 监控网络状态变化

```javascript
const networkChecker = new DC.NetworkChecker({
  onStatusChange: (status) => {
    console.log('网络状态变化:', status);
  }
});

// 开始监控
networkChecker.startMonitoring();

// 在适当的时候停止监控
// networkChecker.stopMonitoring();
```

### 结合 UI 反馈

```javascript
const networkChecker = new DC.NetworkChecker({
  onOnline: () => {
    // 更新UI显示网络已连接
    document.getElementById('network-status').textContent = '在线';
    document.getElementById('network-status').className = 'online';
  },
  onOffline: () => {
    // 更新UI显示网络已断开
    document.getElementById('network-status').textContent = '离线';
    document.getElementById('network-status').className = 'offline';
  },
  onStatusChange: (status) => {
    // 更新响应时间显示
    if(status.responseTime) {
      document.getElementById('response-time').textContent = 
        `响应时间: ${status.responseTime}ms`;
    }
  }
});

networkChecker.startMonitoring();
```

## 注意事项

1. **CORS 限制**: 由于使用了 fetch API，测试 URL 需要支持 CORS 才能从浏览器访问
2. **隐私考虑**: 某些浏览器可能限制获取详细的网络信息
3. **测试URL选择**: 建议使用自己的服务器端点进行测试，以减少对外部服务的依赖
4. **资源消耗**: 频繁的网络检测会消耗带宽和影响性能，合理设置检测间隔
5. **错误处理**: 始终处理异步方法的错误情况
6. **权限**: 某些网络信息可能需要用户授权才能访问

## 常见问题

### 为什么网络检测有时不准确？

- 浏览器可能报告在线状态，但实际网络连接有问题
- 测试URL可能暂时不可用，但其他服务仍然可访问
- 解决方案是使用多个测试URL和重试机制

### 如何选择合适的测试URL？

- 选择可靠的、低延迟的端点
- 使用多个不同域的URL以提高准确性
- 可以使用简单的HTTP状态端点（如返回204 No Content）

### 如何优化性能？

- 合理设置检测间隔，避免过于频繁的检测
- 根据应用需求调整重试次数和超时时间
- 在不需要监控时及时调用 [stopMonitoring](file://d:\VDhub\dcjs\src\utils\dcNetworkChecker.js#L148-L161) 停止监控