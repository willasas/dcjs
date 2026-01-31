# dcNetworkChecker 网络连接检测工具类

`dcNetworkChecker` 是一个功能强大的网络连接检测工具类，提供了网络连接状态检测、监控和相关信息获取功能。

## 功能特性

- 网络连接状态测试（支持多URL测试）
- 带重试机制的网络连接测试
- 获取详细的网络信息（连接类型、速度等）
- 实时网络状态监控
- 网络状态变化事件回调
- 支持自定义配置选项

## 安装

```javascript
// 浏览器环境直接使用
const networkChecker = new DC.NetworkChecker();

// Node.js 环境
const DCNetworkChecker = require('../src/utils/dcNetworkChecker.js');
const networkChecker = new DCNetworkChecker();
```

## 构造函数

```javascript
const networkChecker = new DC.NetworkChecker({
  testUrls: ['https://httpbin.org/get', 'https://api.github.com'], // 测试URL数组
  timeout: 5000, // 请求超时时间（毫秒）
  interval: 10000, // 定期检查间隔（毫秒）
  retryAttempts: 3, // 重试次数
  retryDelay: 1000, // 重试间隔（毫秒）
  onOnline: () => console.log('网络已连接'), // 网络连接恢复时的回调
  onOffline: () => console.log('网络已断开'), // 网络断开时的回调
  onStatusChange: (status) => console.log('网络状态变化:', status) // 网络状态变化时的回调
});
```

## 核心方法

### testConnection()
测试网络连接状态。

**参数：**
- 无

**返回值：**
- `Promise<Object>`: 网络连接状态结果

**返回对象结构：**
```javascript
{
  online: boolean, // 是否在线
  type: string, // 连接类型
  message: string, // 状态消息
  responseTime?: number, // 响应时间（毫秒）
  url?: string // 使用的测试URL
}
```

**使用示例：**
```javascript
networkChecker.testConnection()
  .then(result => {
    console.log('网络连接测试结果:', result);
    if (result.online) {
      console.log('网络连接正常');
    } else {
      console.log('网络连接失败');
    }
  })
  .catch(error => {
    console.error('测试网络连接时出错:', error);
  });
```

### testConnectionWithRetry()
带重试机制的网络连接测试。

**参数：**
- 无

**返回值：**
- `Promise<Object>`: 网络连接状态结果

**返回对象结构：**
与 `testConnection()` 相同

**使用示例：**
```javascript
networkChecker.testConnectionWithRetry()
  .then(result => {
    console.log('带重试的网络连接测试结果:', result);
  })
  .catch(error => {
    console.error('测试网络连接时出错:', error);
  });
```

### getNetworkInfo()
获取详细的网络信息。

**参数：**
- 无

**返回值：**
- `Object`: 网络信息对象

**返回对象结构：**
```javascript
{
  online: boolean, // 浏览器报告的在线状态
  effectiveType: string, // 网络连接类型 ('slow-2g', '2g', '3g', '4g' 或 'unknown')
  downlink: number, // 估计下行带宽（Mbps）
  rtt: number, // 估计往返时间（毫秒）
  saveData: boolean, // 是否启用了数据节省模式
  downlinkMax: number // 最大下行带宽（Mbps）
}
```

**使用示例：**
```javascript
const networkInfo = networkChecker.getNetworkInfo();
console.log('网络信息:', networkInfo);
console.log('网络类型:', networkInfo.effectiveType);
console.log('下行带宽:', networkInfo.downlink, 'Mbps');
```

### startMonitoring()
开始监控网络状态。

**参数：**
- 无

**返回值：**
- 无

**使用示例：**
```javascript
// 创建网络检查器实例
const networkChecker = new DC.NetworkChecker({
  onOnline: () => {
    console.log('网络已连接，重新加载数据');
    // 重新加载数据或执行其他操作
  },
  onOffline: () => {
    console.log('网络已断开，切换到离线模式');
    // 切换到离线模式或执行其他操作
  },
  onStatusChange: (status) => {
    console.log('网络状态变化:', status);
    // 根据网络状态执行不同的操作
  }
});

// 开始监控
networkChecker.startMonitoring();
console.log('网络监控已启动');
```

### stopMonitoring()
停止监控网络状态。

**参数：**
- 无

**返回值：**
- 无

**使用示例：**
```javascript
networkChecker.stopMonitoring();
console.log('网络监控已停止');
```

### getStatusSummary()
获取当前网络状态摘要，包含网络信息和连接测试结果。

**参数：**
- 无

**返回值：**
- `Promise<Object>`: 网络状态摘要对象

**返回对象结构：**
```javascript
{
  // 网络信息
  online: boolean,
  effectiveType: string,
  downlink: number,
  rtt: number,
  saveData: boolean,
  downlinkMax: number,

  // 连接测试结果
  type: string,
  message: string,
  responseTime?: number,
  url?: string,

  // 其他信息
  lastChecked: string // 最后检查时间（ISO格式）
}
```

**使用示例：**
```javascript
networkChecker.getStatusSummary()
  .then(summary => {
    console.log('网络状态摘要:', summary);
    console.log('最后检查时间:', summary.lastChecked);
  })
  .catch(error => {
    console.error('获取网络状态摘要时出错:', error);
  });
```

## 浏览器兼容性

- **现代浏览器**: Chrome, Firefox, Safari, Edge 均支持
- **IE 浏览器**: 不支持，因为依赖 `navigator.connection` 和 `AbortController`
- **网络信息 API**: 部分浏览器可能只支持部分属性
- **离线事件**: 所有现代浏览器都支持 `online` 和 `offline` 事件

## 错误处理

所有异步方法都返回 Promise 对象，可通过 catch 捕获错误：

```javascript
networkChecker.testConnection()
  .then(result => {
    // 处理成功
  })
  .catch(error => {
    console.error('错误:', error);
    // 错误处理
  });
```

## 最佳实践

1. **初始化配置**:
   - 根据应用需求调整 `timeout` 和 `retryAttempts`
   - 提供有意义的 `onOnline` 和 `onOffline` 回调

2. **网络状态监控**:
   - 在应用启动时开始监控
   - 在组件卸载时停止监控
   - 根据网络状态调整应用行为

3. **性能优化**:
   - 不要过于频繁地测试网络连接
   - 考虑在用户交互时才进行网络测试

4. **用户体验**:
   - 为网络状态变化提供清晰的用户反馈
   - 在网络断开时提供离线模式
   - 在网络恢复时自动重新连接

## 示例应用场景

1. **在线/离线模式切换**:
   - 检测网络状态并自动切换应用模式
   - 在离线时使用本地存储的数据

2. **网络质量检测**:
   - 根据网络类型调整图片质量
   - 根据网络速度决定是否加载视频

3. **网络异常处理**:
   - 在网络断开时显示友好的错误信息
   - 在网络恢复时自动重试失败的请求

4. **性能监控**:
   - 定期检查网络状态并记录日志
   - 根据网络状态调整应用行为

## 代码示例

### 完整的网络状态监控示例

```javascript
// 创建网络检查器实例
const networkChecker = new DC.NetworkChecker({
  testUrls: [
    'https://httpbin.org/get',
    'https://api.github.com',
    'https://www.google.com/generate_204'
  ],
  timeout: 3000,
  interval: 5000,
  retryAttempts: 2,
  retryDelay: 500,
  onOnline: () => {
    console.log('📶 网络已连接');
    document.getElementById('status-indicator').className = 'online';
    document.getElementById('status-message').textContent = '网络已连接';

    // 重新加载应用数据
    loadAppData();
  },
  onOffline: () => {
    console.log('📴 网络已断开');
    document.getElementById('status-indicator').className = 'offline';
    document.getElementById('status-message').textContent = '网络已断开';

    // 切换到离线模式
    switchToOfflineMode();
  },
  onStatusChange: (status) => {
    console.log('🔄 网络状态变化:', status);
    document.getElementById('status-details').textContent = JSON.stringify(status, null, 2);
  }
});

// 开始监控
networkChecker.startMonitoring();
console.log('网络监控已启动');

// 加载应用数据
function loadAppData() {
  console.log('加载应用数据...');
  // 执行数据加载操作
}

// 切换到离线模式
function switchToOfflineMode() {
  console.log('切换到离线模式...');
  // 执行离线模式切换操作
}

// 定期获取网络状态摘要
setInterval(async () => {
  try {
    const summary = await networkChecker.getStatusSummary();
    console.log('网络状态摘要:', summary);
  } catch (error) {
    console.error('获取网络状态摘要时出错:', error);
  }
}, 30000);
```

### 网络质量检测示例

```javascript
// 创建网络检查器实例
const networkChecker = new DC.NetworkChecker();

// 检测网络质量并调整应用行为
async function adjustForNetworkQuality() {
  try {
    const networkInfo = networkChecker.getNetworkInfo();
    const connectionResult = await networkChecker.testConnection();

    console.log('网络质量检测结果:', {
      networkInfo,
      connectionResult
    });

    // 根据网络类型调整图片质量
    if (networkInfo.effectiveType === '4g') {
      console.log('网络良好，加载高清图片');
      loadImages('high');
    } else if (networkInfo.effectiveType === '3g') {
      console.log('网络一般，加载中清图片');
      loadImages('medium');
    } else {
      console.log('网络较差，加载低清图片');
      loadImages('low');
    }

    // 根据网络速度决定是否加载视频
    if (networkInfo.downlink >= 5) {
      console.log('网络速度快，加载视频');
      loadVideos();
    } else {
      console.log('网络速度慢，不加载视频');
      showVideoPlaceholders();
    }

  } catch (error) {
    console.error('检测网络质量时出错:', error);
    // 降级到默认行为
    loadImages('medium');
    showVideoPlaceholders();
  }
}

// 加载图片
function loadImages(quality) {
  // 根据质量加载不同分辨率的图片
}

// 加载视频
function loadVideos() {
  // 加载视频内容
}

// 显示视频占位符
function showVideoPlaceholders() {
  // 显示视频占位符
}

// 初始检测
adjustForNetworkQuality();

// 监听网络状态变化
window.addEventListener('online', adjustForNetworkQuality);
window.addEventListener('offline', adjustForNetworkQuality);
```

## 总结

`dcNetworkChecker` 工具类提供了全面的网络连接检测和监控功能，帮助开发者：

- 实时了解网络状态
- 根据网络质量调整应用行为
- 提供更好的离线体验
- 自动处理网络状态变化

通过合理使用这些功能，可以显著提升应用的用户体验，尤其是在网络条件不稳定的环境中。