# DC.js - DarkCrystal 前端工具库

DC.js 是一个纯前端的常用组件和工具类库，旨在为前端开发提供基础组件和工具类。

## 项目特点

- 纯前端项目，不依赖任何后端服务
- 基于Parcel打包构建
- 提供JavaScript和TypeScript两个版本
- 所有组件和工具类都注册到全局的window.DC对象下
- 包含完整的测试用例、示例代码和说明文档

## 项目结构

```
dcjs/
├── src/                    # 源代码目录
│   ├── components/         # 组件目录
│   │   ├── animate/        # 动画组件
│   │   ├── article/        # 文章组件
│   │   ├── bgm/            # 背景音乐组件
│   │   ├── dcprogressbar/ # 进度条组件
│   │   └── ...             # 其他组件
│   ├── utils/              # 工具类目录
│   │   ├── dcArray.js      # 数组工具类
│   │   ├── dcBrowser.js    # 浏览器工具类
│   │   ├── dcCookie.js     # Cookie工具类
│   │   ├── dcDate.js       # 日期工具类
│   │   ├── dcDevice.js     # 设备工具类
│   │   ├── dcDom.js        # DOM工具类
│   │   ├── dcDynamicLoader.js # 动态加载工具类
│   │   ├── dcEventBus.js   # 事件总线工具类
│   │   ├── dcFile.js       # 文件工具类
│   │   ├── dcFormat.js     # 格式化工具类
│   │   ├── dcLocalStorage.js # 本地存储工具类
│   │   ├── dcMath.js       # 数学工具类
│   │   ├── dcNetwork.js    # 网络工具类
│   │   ├── dcObject.js     # 对象工具类
│   │   ├── dcRandom.js     # 随机数工具类
│   │   ├── dcScreenshot.js # 截图工具类
│   │   ├── dcSessionStorage.js # 会话存储工具类
│   │   ├── dcStorage.js    # 存储工具类
│   │   ├── dcString.js     # 字符串工具类
│   │   ├── dcUrl.js        # URL工具类
│   │   ├── dcValidate.js   # 验证工具类
│   │   ├── dcWatermark.js  # 水印工具类
│   │   ├── dcWebp.js       # WebP工具类
│   │   └── download.js     # 下载工具类
│   ├── index.js            # JavaScript版本入口文件
│   └── index.ts            # TypeScript版本入口文件
├── dist/                   # 构建输出目录
├── test/                   # 测试用例目录
├── examples/               # 示例代码目录
│   ├── components/         # 组件示例
│   └── utils/              # 工具类示例
├── docs/                   # 说明文档目录
├── scripts/                # 构建脚本目录
├── package.json            # 项目配置文件
└── tsconfig.json           # TypeScript配置文件
```

## 主要组件

### DC.ProgressBar - 进度条组件
功能丰富的进度条组件，支持自定义样式、事件回调、步长控制等多种功能。

**主要特性：**
- 支持自定义颜色、高度、范围等样式
- 支持步长控制，确保值按指定步长变化
- 提供丰富的事件回调，如值变化、完成等
- 支持显示/隐藏进度文本
- 支持增加/减少/重置等操作方法
- 支持拖拽交互（可选）

**详细文档：** [docs/dcProgressBar.md](./docs/dcProgressBar.md)

### DC.Screenshot - 截图工具类
功能强大的截图工具类，支持全页面截图、指定元素截图、指定区域截图等多种截图方式。

**主要特性：**
- 支持全页面截图
- 支持指定元素截图
- 支持指定区域截图
- 支持添加水印
- 支持多种输出格式
- 支持高级选项配置

**详细文档：** [docs/dcScreenshot.md](./docs/dcScreenshot.md)

### DC.Array - 数组工具类
提供数组操作的常用方法，包括去重、扁平化、分组、排序等功能。

**主要特性：**
- 数组去重、扁平化、分组
- 数组排序、分块、差集、交集、并集
- 数组随机排序、求和、平均值
- 数组最大值、最小值

### 其他工具类
- DC.Browser - 浏览器工具类
- DC.Cookie - Cookie工具类
- DC.Date - 日期工具类
- DC.Device - 设备工具类
- DC.Dom - DOM工具类
- DC.DynamicLoader - 动态加载工具类
- DC.EventBus - 事件总线工具类
- DC.File - 文件工具类
- DC.Format - 格式化工具类
- DC.LocalStorage - 本地存储工具类
- DC.Math - 数学工具类
- DC.Network - 网络工具类
- DC.Object - 对象工具类
- DC.Random - 随机数工具类
- DC.SessionStorage - 会话存储工具类
- DC.Storage - 存储工具类
- DC.String - 字符串工具类
- DC.Url - URL工具类
- DC.Validate - 验证工具类
- DC.Watermark - 水印工具类
- DC.Webp - WebP工具类
- Download - 下载工具类

## 安装和使用

### 直接引入
```html
<!-- JavaScript版本 -->
<script src="dist/dc-x.x.x-YYYYMMDD.js"></script>

<!-- TypeScript版本 -->
<script src="dist/dc-ts-x.x.x-YYYYMMDD.js"></script>
```

### NPM安装
```bash
npm install dcjs
```

### 使用示例
```javascript
// 使用工具类
const uniqueArray = DC.Array.unique([1, 2, 2, 3, 4, 4, 5]);
console.log(uniqueArray); // [1, 2, 3, 4, 5]

// 使用组件
const progressBar = new DC.ProgressBar({
  container: '#progress-container',
  value: 30,
  max: 100,
  color: '#4CAF50',
  showText: true
});

// 截图工具
DC.Screenshot.capturePage().then(dataUrl => {
  console.log('截图成功:', dataUrl);
});
```

## 开发指南

### 构建项目
```bash
# 构建JavaScript版本
npm run build:all

# 构建TypeScript版本
npm run build:all:ts

# 监听模式开发JavaScript版本
npm run watch

# 监听模式开发TypeScript版本
npm run watch:ts
```

### 测试
```bash
# 运行测试
npm test
```

### 添加新组件或工具类
1. 在`src/components`或`src/utils`目录下创建新的组件或工具类
2. 在`src/index.js`和`src/index.ts`中导入并注册到全局DC对象
3. 在`test`目录下创建对应的测试用例
4. 在`examples`目录下创建对应的示例代码
5. 在`docs`目录下创建对应的说明文档

## 代码规范

- 所有的js代码必须符合es6规范
- 所有的scss代码必须符合scss规范
- 所有的html代码必须符合html规范
- 所有的组件和工具类的代码必须符合js规范
- 所有的测试用例的代码必须符合js规范
- 所有的示例代码的代码必须符合html规范

## 文件命名规则

- 构建完成后的js文件名格式为：`<文件名>-<版本号>-<日期>.js`
- 构建完成后的css文件名格式为：`<文件名>-<版本号>-<日期>.css`

## 版本管理

本项目使用语义化版本管理，版本号格式为MAJOR.MINOR.PATCH

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/yourusername/dcjs/issues)
- 发送邮件至 your.email@example.com

## 更新日志

### v1.0.0 (2023-XX-XX)
- 初始版本发布
- 包含基础工具类和组件
- 支持JavaScript和TypeScript两个版本
- 提供完整的测试用例和示例代码

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

1. 打开 `test/all-tools-test.html` 文件
2. 在浏览器中测试各项功能

### Node.js测试

使用Jest进行自动化测试：

```bash
# 运行测试
npm run test
# 或者运行DOM相关的测试
npm run testdom
```

## 构建系统

我们使用自定义构建脚本替代了Parcel，以避免模块系统冲突问题。构建脚本将所有工具类文件合并成一个库文件，确保在浏览器环境中不会出现重复声明错误。

## 贡献

欢迎提交 issue 和 pull request 来改进此项目。

## 许可证

ISC