# dcBrowser 工具类

## 概述
`dcBrowser` 是一个浏览器检测工具库，提供了一系列实用的浏览器环境检测方法，帮助开发者识别用户使用的设备类型、浏览器名称等信息，以便进行针对性的页面适配和功能优化。

## 功能特性
- **设备检测**: `isMobile` 方法可以准确判断用户是否使用移动设备访问
- **浏览器识别**: `getBrowserName` 方法可以识别主流浏览器（Chrome、Firefox、Safari等）
- **兼容性好**: 支持现代浏览器和主流移动设备
- **轻量级**: 代码简洁，不依赖第三方库

## 引入方式

### 方式1: 通过script标签引入
```html
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { dcBrowser } from './src/utils/dcBrowser.js';
```

## API文档

### isMobile()
判断当前是否为移动设备访问。

**参数**: 无

**返回值**:
- (boolean): 如果是移动设备返回true，否则返回false

**示例**:
```javascript
if (dcBrowser.isMobile()) {
    console.log('用户正在使用移动设备');
    // 可以在这里进行移动端适配
} else {
    console.log('用户正在使用桌面设备');
}
```

### getBrowserName()
获取当前使用的浏览器名称。

**参数**: 无

**返回值**:
- (string): 浏览器名称（如 'Chrome', 'Firefox', 'Safari', 'Unknown'）

**示例**:
```javascript
const browser = dcBrowser.getBrowserName();
console.log(`当前浏览器: ${browser}`);

// 根据不同浏览器进行特殊处理
switch(browser) {
    case 'Chrome':
        // Chrome特定的优化
        break;
    case 'Firefox':
        // Firefox特定的优化
        break;
    case 'Safari':
        // Safari特定的优化
        break;
}