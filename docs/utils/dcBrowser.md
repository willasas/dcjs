# dcBrowser

浏览器工具类，提供丰富的浏览器相关功能，包括资源加载、Cookie 操作、浏览器信息检测、设备检测、屏幕信息、网络连接信息、特性支持检测、事件中心、性能信息、全屏操作等。

## 安装

将 `dcBrowser.js` 文件引入到项目中：

```html
<script src="path/to/dcBrowser.js"></script>
```

## API 参考

### 1. loadCss(url, type)

加载CSS文件

- **参数**：
  - `url`：CSS文件的URL
  - `type`：可选，元素类型，默认为 `'link'`
- **返回值**：无

**示例**：

```javascript
DC.Browser.loadCss('styles.css');
```

### 2. loadJs(url, type)

加载JavaScript文件

- **参数**：
  - `url`：JavaScript文件的URL
  - `type`：可选，元素类型，默认为 `'script'`
- **返回值**：无

**示例**：

```javascript
DC.Browser.loadJs('script.js');
```

### 3. preloadResourcesSingle(cssFile, jsFile)

预加载单个资源（CSS或JS）

- **参数**：
  - `cssFile`：CSS文件URL
  - `jsFile`：JavaScript文件URL
- **返回值**：无

**示例**：

```javascript
DC.Browser.preloadResourcesSingle('styles.css', 'script.js');
```

### 4. preloadResources(cssFiles, jsFiles)

预加载多个资源

- **参数**：
  - `cssFiles`：CSS文件URL数组，默认为 `[]`
  - `jsFiles`：JavaScript文件URL数组，默认为 `[]`
- **返回值**：无

**示例**：

```javascript
DC.Browser.preloadResources(
  ['style1.css', 'style2.css'],
  ['script1.js', 'script2.js']
);
```

### 5. cookie(name, value, days)

获取或设置cookie

- **参数**：
  - `name`：cookie名称
  - `value`：可选，cookie值（如果设置）
  - `days`：可选，cookie有效天数（如果设置）
- **返回值**：如果只是获取，则返回cookie值

**示例**：

```javascript
// 设置cookie
DC.Browser.cookie('name', 'test', 1);

// 获取cookie
const value = DC.Browser.cookie('name');
```

### 6. isFullscreen()

检查是否处于全屏模式

- **参数**：无
- **返回值**：如果处于全屏模式则返回 `true`

**示例**：

```javascript
if (DC.Browser.isFullscreen()) {
  console.log('当前处于全屏模式');
}
```

### 7. createEventHub()

创建事件中心

- **参数**：无
- **返回值**：包含 `on`、`off`、`emit` 方法的事件中心对象

**示例**：

```javascript
const hub = DC.Browser.createEventHub();

// 监听事件
hub.on('test', (data) => {
  console.log('事件触发:', data);
});

// 触发事件
hub.emit('test', 'Hello World');

// 移除事件监听
hub.off('test', handler);
```

### 8. getBrowserInfo()

获取浏览器信息

- **参数**：无
- **返回值**：浏览器信息对象，包含 `name`、`version`、`engine`、`system`、`device` 等属性

**示例**：

```javascript
const info = DC.Browser.getBrowserInfo();
console.log('浏览器名称:', info.name);
console.log('浏览器版本:', info.version);
console.log('操作系统:', info.system);
```

### 9. supports(feature)

检查浏览器是否支持某个特性

- **参数**：
  - `feature`：特性名称
- **返回值**：是否支持

**示例**：

```javascript
if (DC.Browser.supports('webp')) {
  console.log('支持WebP格式');
}

if (DC.Browser.supports('webgl')) {
  console.log('支持WebGL');
}
```

### 10. isMobile()

检查是否是移动设备

- **参数**：无
- **返回值**：是否是移动设备

**示例**：

```javascript
if (DC.Browser.isMobile()) {
  console.log('当前是移动设备');
}
```

### 11. isTablet()

检查是否是平板设备

- **参数**：无
- **返回值**：是否是平板设备

**示例**：

```javascript
if (DC.Browser.isTablet()) {
  console.log('当前是平板设备');
}
```

### 12. getOrientation()

获取屏幕方向

- **参数**：无
- **返回值**：屏幕方向字符串

**示例**：

```javascript
const orientation = DC.Browser.getOrientation();
console.log('屏幕方向:', orientation);
```

### 13. getConnection()

获取网络连接信息

- **参数**：无
- **返回值**：网络连接信息对象

**示例**：

```javascript
const connection = DC.Browser.getConnection();
console.log('网络类型:', connection.type);
console.log('网络质量:', connection.effectiveType);
console.log('是否在线:', connection.online);
```

### 14. getBatteryInfo()

获取电池状态

- **参数**：无
- **返回值**：Promise，解析为电池状态信息对象

**示例**：

```javascript
DC.Browser.getBatteryInfo().then(info => {
  console.log('电池电量:', info.level * 100 + '%');
  console.log('是否充电:', info.charging);
});
```

### 15. getHardwareInfo()

获取硬件信息

- **参数**：无
- **返回值**：硬件信息对象

**示例**：

```javascript
const info = DC.Browser.getHardwareInfo();
console.log('CPU核心数:', info.cores);
console.log('内存大小:', info.memory);
console.log('平台:', info.platform);
```

### 16. getScreenInfo()

获取屏幕信息

- **参数**：无
- **返回值**：屏幕信息对象

**示例**：

```javascript
const info = DC.Browser.getScreenInfo();
console.log('屏幕宽度:', info.width);
console.log('屏幕高度:', info.height);
console.log('设备像素比:', info.devicePixelRatio);
```

### 17. getGeolocation()

获取地理位置

- **参数**：无
- **返回值**：Promise，解析为地理位置信息对象

**示例**：

```javascript
DC.Browser.getGeolocation().then(position => {
  console.log('纬度:', position.latitude);
  console.log('经度:', position.longitude);
  console.log('精度:', position.accuracy);
}).catch(error => {
  console.error('获取地理位置失败:', error);
});
```

### 18. supportsCSSProperty(property)

检查浏览器是否支持某个CSS属性

- **参数**：
  - `property`：CSS属性名
- **返回值**：是否支持

**示例**：

```javascript
if (DC.Browser.supportsCSSProperty('backdrop-filter')) {
  console.log('支持backdrop-filter属性');
}
```

### 19. supportsMediaQuery(query)

检查浏览器是否支持某个媒体查询

- **参数**：
  - `query`：媒体查询字符串
- **返回值**：是否支持

**示例**：

```javascript
if (DC.Browser.supportsMediaQuery('(min-width: 768px)')) {
  console.log('当前屏幕宽度大于等于768px');
}
```

### 20. getPerformance()

获取浏览器性能信息

- **参数**：无
- **返回值**：性能信息对象

**示例**：

```javascript
const info = DC.Browser.getPerformance();
console.log('页面加载时间:', info.loadTime, 'ms');
console.log('首字节时间:', info.ttfb, 'ms');
console.log('DOM解析时间:', info.domParseTime, 'ms');
```

### 21. getVisibilityState()

获取当前页面的可见性状态

- **参数**：无
- **返回值**：可见性状态字符串

**示例**：

```javascript
const state = DC.Browser.getVisibilityState();
console.log('页面可见性状态:', state);
```

### 22. onVisibilityChange(callback)

监听页面可见性变化

- **参数**：
  - `callback`：回调函数
- **返回值**：取消监听的函数

**示例**：

```javascript
const unsubscribe = DC.Browser.onVisibilityChange((state) => {
  console.log('页面可见性变化:', state);
});

// 取消监听
// unsubscribe();
```

### 23. isOnline()

检查浏览器是否在线

- **参数**：无
- **返回值**：是否在线

**示例**：

```javascript
if (DC.Browser.isOnline()) {
  console.log('当前在线');
} else {
  console.log('当前离线');
}
```

### 24. onConnectionChange(onlineCallback, offlineCallback)

监听在线状态变化

- **参数**：
  - `onlineCallback`：在线回调
  - `offlineCallback`：离线回调
- **返回值**：取消监听的函数

**示例**：

```javascript
const unsubscribe = DC.Browser.onConnectionChange(
  () => console.log('网络已连接'),
  () => console.log('网络已断开')
);

// 取消监听
// unsubscribe();
```

### 25. getUrlParams()

获取当前页面的URL参数

- **参数**：无
- **返回值**：URL参数对象

**示例**：

```javascript
// 假设URL为: https://example.com?name=test&age=20
const params = DC.Browser.getUrlParams();
console.log('name:', params.name); // 'test'
console.log('age:', params.age);   // '20'
```

### 26. supportsFullscreen()

检查浏览器是否支持全屏

- **参数**：无
- **返回值**：是否支持

**示例**：

```javascript
if (DC.Browser.supportsFullscreen()) {
  console.log('支持全屏模式');
}
```

### 27. requestFullscreen(element)

请求全屏

- **参数**：
  - `element`：要全屏的元素
- **返回值**：全屏请求的Promise

**示例**：

```javascript
const element = document.documentElement;
DC.Browser.requestFullscreen(element)
  .then(() => {
    console.log('已进入全屏');
  })
  .catch(err => {
    console.error('进入全屏失败:', err);
  });
```

### 28. exitFullscreen()

退出全屏

- **参数**：无
- **返回值**：退出全屏的Promise

**示例**：

```javascript
DC.Browser.exitFullscreen()
  .then(() => {
    console.log('已退出全屏');
  })
  .catch(err => {
    console.error('退出全屏失败:', err);
  });
```

### 29. supportsWebAPI(api)

检查是否支持某个Web API

- **参数**：
  - `api`：API名称
- **返回值**：是否支持

**示例**：

```javascript
if (DC.Browser.supportsWebAPI('fetch')) {
  console.log('支持fetch API');
}

if (DC.Browser.supportsWebAPI('WebSocket')) {
  console.log('支持WebSocket');
}
```

## 浏览器兼容性

- Chrome ≥ 45
- Firefox ≥ 40
- Safari ≥ 9
- Edge ≥ 12

## 注意事项

1. 部分功能（如地理位置、电池信息）需要用户授权
2. 全屏操作需要在用户交互事件中触发
3. 性能信息获取可能在不同浏览器中有所差异
4. 网络连接信息的准确性依赖于浏览器实现
5. 特性检测结果仅供参考，实际使用时建议进行充分测试

## 示例

查看 `examples/utils/dcBrowser/index.html` 获取交互式示例。

## 测试

运行 `npm test test/utils/dcBrowser/dcBrowser.test.js` 查看测试结果。
