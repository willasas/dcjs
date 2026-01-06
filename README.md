# DCJS - 前端工具库

DCJS 是一个前端工具库，提供通用的 JavaScript 工具函数和可复用的 Web 组件，用于加速网页开发。该库包含数组处理、浏览器检测、加密、日期处理、DOM 操作等多种工具类，以及一系列常用的 UI 组件。

## 主要特性

- **通用工具函数**: 包括数组、字符串、日期、URL、文件、浏览器检测、加密等操作
- **UI 组件库**: 提供多个可复用的前端组件
- **数据管理**: 内置城市、颜色、链接等静态数据
- **SCSS 样式系统**: 支持模块化 SCSS 编写，输出 CSS 文件
- **二维码生成**: 提供简单易用的二维码生成功能

## 主要组件

### DCProductivitySlider - 现代化生产力滑块组件
一个功能丰富的滑块组件，适用于展示项目、产品、图片等内容，提供流畅的切换动画和响应式设计。

**主要特性：**
- 自动播放、触摸滑动、键盘导航
- 链接支持 - 卡片按钮支持外部链接和内部锚点
- 响应式设计，支持移动端和桌面端
- 丰富的回调函数支持

**详细文档：** [docs/dcproductivityslider.md](./docs/dcproductivityslider.md)

### DcAdapt - 页面适配工具
用于处理页面适配的工具类，支持一屏适配和长页面适配，提供 px、rem、vw/vh 三种适配单位的支持。

**详细文档：** [docs/dcadapt.md](./docs/dcadapt.md)

### DCNetworkChecker - 网络连接检测工具
网络连接检测工具类，提供网络连接状态检测功能。

**详细文档：** [docs/DCNetworkChecker使用说明.md](./docs/DCNetworkChecker使用说明.md)

### DCQRCode - 二维码生成工具
二维码生成工具类，提供简单易用的二维码生成功能。

**详细文档：** [docs/dcjs库使用说明.md](./docs/dcjs库使用说明.md)

## 项目结构

```
.
├─ dist/                       // 构建输出目录
├─ docs/                       // 文档目录
│   ├─ dcjs库使用说明.md        // 主要使用说明
│   ├─ DCNetworkChecker使用说明.md  // 网络检测器说明
│   └─ dcproductivityslider.md // 滑块组件说明
├─ src/                        // 源代码目录
│   ├─ index.js                // 库的统一入口文件
│   └─ utils/                  // 工具类目录
│       ├─ dcArray.js          // 数组工具类
│       ├─ dcBrowser.js        // 浏览器工具类
│       ├─ dcCrypto.js         // 加密工具类
│       ├─ dcDate.js           // 日期工具类
│       ├─ dcEle.js            // DOM元素工具类
│       ├─ dcFiles.js          // 文件工具类
│       ├─ dcFunction.js       // 函数工具类
│       ├─ dcMedia.js          // 媒体工具类
│       ├─ dcNetworkChecker.js // 网络检测工具类
│       ├─ dcNumber.js         // 数字工具类
│       ├─ dcObject.js         // 对象工具类
│       ├─ dcPlatform.js       // 平台检测工具类
│       ├─ dcQRCode.js         // 二维码生成工具类
│       ├─ dcString.js         // 字符串工具类
│       ├─ dcUrl.js            // URL工具类
│       ├─ dcValidate.js       // 验证工具类
│       └─ ...                 // 其他工具类
├─ test/                       // 测试文件目录
│   ├─ dcqrcode-test.html      // 二维码测试页面
│   ├─ dcqrcode.test.js        // 二维码浏览器测试
│   └─ dcqrcode-node.test.js   // 二维码Node.js测试
├─ .parcelrc                   // Parcel构建配置
├─ package.json                // 项目配置文件
└─ README.md                   // 项目说明文件
```

## 安装和使用

### 安装依赖

```bash
# 安装项目依赖
npm install
```

### 构建项目

```bash
# 构建生产版本
npm run build

# 开发模式监听文件变化
npm run watch
```

构建后的文件将输出到 `dist/` 目录。

### 引入方式

#### 方式一：直接引入构建文件

```html
<!DOCTYPE html>
<html>
<head>
  <title>dcjs 示例</title>
</head>
<body>
  <!-- 在 HTML 中引入构建后的文件 -->
  <script src="dist/dc.js"></script>
  <script>
    // 使用库中的工具类
    const networkChecker = new DC.NetworkChecker();
    console.log('DC 库已加载');
  </script>
</body>
</html>
```

#### 方式二：ES6 模块导入

```javascript
// 导入整个库
import DC from './path/to/dc.js';

// 或导入特定工具
import { NetworkChecker, QRCode } from './path/to/dc.js';
```

## API 文档

### DC.Array

数组处理工具类，提供去重、扁平化、分组等功能。

```javascript
// 数组去重
const uniqueArr = DC.Array.unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
```

### DC.Browser

浏览器工具类，提供加载CSS/JS、检测浏览器信息等功能。

### DC.Crypto

加密工具类，提供各种加密解密功能。

### DC.Date

日期处理工具类，提供日期格式化、计算等功能。

### DC.Element

DOM 元素操作工具类，提供元素选择、操作等功能。

### DC.NetworkChecker

网络连接检测工具类，提供网络连接状态检测功能。

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
```

### DC.QRCode

二维码生成工具类，提供简单易用的二维码生成功能。

```javascript
// 创建二维码实例
const qrCode = new DC.QRCode();

// 生成二维码并获取data URL
const qrCodeDataUrl = qrCode.generate('https://example.com', {
  size: 200,
  bgColor: '#FFFFFF',
  fgColor: '#000000',
  margin: 4,
  errorCorrectionLevel: 'M'
});

// 将二维码渲染到指定元素
qrCode.render('qrcode-container', 'https://example.com', {
  size: 250,
  bgColor: '#FFFFFF',
  fgColor: '#0000FF'
});
```

## 测试

dcjs库提供多种测试方式：

### 浏览器测试

使用提供的测试HTML页面进行功能测试：

1. 打开 `test/dcqrcode-test.html` 文件
2. 在浏览器中测试各项功能

### Node.js测试

使用Jest进行自动化测试：

```bash
# 运行测试
npm run test
# 或者运行DOM相关的测试
npm run testdom
```

## 贡献

欢迎提交 issue 和 pull request 来改进此项目。

## 许可证

ISC