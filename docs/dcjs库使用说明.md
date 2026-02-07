# dcjs 库使用说明

## 概述

dcjs 是一个前端工具库，提供通用的 JavaScript 工具函数和可复用的 Web 组件，用于加速网页开发。该库包含数组处理、浏览器检测、加密、日期处理、DOM 操作等多种工具类。

## 功能特性

- **通用工具函数**: 包括数组、字符串、日期、URL、文件、浏览器检测、加密等操作
- **UI 组件库**: 提供多个可复用的前端组件
- **数据管理**: 内置城市、颜色、链接等静态数据
- **SCSS 样式系统**: 支持模块化 SCSS 编写，输出 CSS 文件
- **二维码生成**: 提供简单易用的二维码生成功能

## 构建项目

### 安装依赖

```bash
npm install
```

### 构建命令

```bash
# 构建生产版本
npm run build

# 开发模式监听文件变化
npm run watch
```

构建后的文件将输出到 `dist/` 目录。

## 引入方式

### 方式一：直接引入构建文件

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

### 方式二：ES6 模块导入

```javascript
// 导入整个库
import DC from './path/to/dc.js';

// 或导入特定工具
import { NetworkChecker, Array, QRCode } from './path/to/dc.js';
```

## API 文档

### DC.Array

数组处理工具类，提供去重、扁平化、分组等功能。

```javascript
// 数组去重
const uniqueArr = DC.Array.unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]

// 数组扁平化
const flatArr = DC.Array.flatten([1, [2, [3, 4]]]); // [1, 2, 3, 4]

// 数组分组
const grouped = DC.Array.groupBy([{age: 20}, {age: 20}, {age: 30}], 'age');
```

### DC.Browser

浏览器工具类，提供加载CSS/JS、检测浏览器信息等功能。

```javascript
// 加载CSS文件
DC.Browser.loadCss('https://example.com/style.css');

// 加载JS文件
DC.Browser.loadJs('https://example.com/script.js');
```

### DC.Crypto

加密工具类，提供各种加密解密功能。

### DC.Date

日期处理工具类，提供日期格式化、计算等功能。

### DC.Element

DOM 元素操作工具类，提供元素选择、操作等功能。

### DC.Files

文件处理工具类，提供文件读取、操作等功能。

### DC.Function

函数工具类，提供函数操作、高阶函数等功能。

### DC.Media

媒体处理工具类，提供音频、视频处理等功能。

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

### DC.Number

数字处理工具类，提供数字格式化、计算等功能。

### DC.Object

对象处理工具类，提供对象操作、深拷贝等功能。

### DC.String

字符串处理工具类，提供字符串操作、格式化等功能。

### DC.Url

URL 处理工具类，提供 URL 解析、构建等功能。

### DC.Validate

验证工具类，提供数据验证功能。

### DC.Platform

平台检测工具类，提供设备、操作系统检测功能。

### DC.RegExp

正则表达式工具类，提供正则表达式操作功能。

### DC.QRCode

二维码生成工具类，提供简单易用的二维码生成功能。

### DC.adapt

屏幕适配工具类，提供响应式设计支持。

### DC.https

HTTPS 相关工具函数。

### DC.infinitescroller

无限滚动组件，提供滚动加载功能。

### DC.json

JSON 处理工具类，提供 JSON 操作功能。

### DC.lottery

抽奖工具类，提供抽奖相关功能。

### DC.waterfall

瀑布流布局组件，提供瀑布流布局功能。

### DC.prettylog

美化日志输出工具，提供格式化日志功能。

### DC.sampleadapt

示例适配工具。

### DC.ContentStats

内容统计工具类，提供内容统计功能。

### DC.DailyQuote

每日名言工具类，提供每日名言获取功能。

### DC.DynamicLoader

动态加载工具类，提供动态加载脚本和样式功能。

### DC.Ele

DOM 元素操作工具类，提供元素选择、操作等功能。

### DC.ImageViewer

图片查看器工具类，提供图片查看功能。

### DC.Media

媒体处理工具类，提供音频、视频处理等功能。

### DC.NetworkChecker

网络连接检测工具类，提供网络连接状态检测功能。

### DC.Screenshot

截图工具类，提供网页截图功能。

### DC.Search

搜索工具类，提供搜索功能。

### DC.StarSign

星座工具类，提供星座相关功能。

### DC.Storage

存储工具类，提供本地存储操作功能。

### DC.Tags

标签管理工具类，提供标签操作功能。

### DC.cookie

Cookie 操作工具类，提供 Cookie 读写功能。

### DC.picolor

颜色处理工具类，提供颜色操作功能。

### DC.ga

Google Analytics 工具类，提供 GA 跟踪功能。

## 组件

### 表单组件

#### signin

登录组件，提供用户登录功能。

#### signup

注册组件，提供用户注册功能。

#### resetpassword

密码重置组件，提供密码重置功能。

#### dcfileupload

文件上传组件，提供文件上传功能。

#### dcfilter

筛选组件，提供数据筛选功能。

#### dcdateselector

日期选择器组件，提供日期选择功能。

### UI组件

#### dcprogressbar

进度条组件，提供进度显示功能。

#### dcslider

滑块组件，提供滑块交互功能。

#### dcpopup

弹窗组件，提供弹窗显示功能。

#### dcsearch

搜索组件，提供搜索输入功能。

#### dcsidebar

侧边栏组件，提供侧边栏导航功能。

#### dcsidenav

侧边导航组件，提供侧边导航功能。

#### dcvirtualcard

虚拟卡片组件，提供卡片展示功能。

#### dcvirtualscroller

虚拟滚动组件，提供高效滚动功能。

#### dcpager

分页组件，提供分页导航功能。

#### dcanswer

回答组件，提供回答展示功能。

#### dcbottombar

底部栏组件，提供底部导航功能。

#### dctopbar

顶部栏组件，提供顶部导航功能。

#### dciconlist

图标列表组件，提供图标展示功能。

### 布局组件

#### dcheader

头部组件，提供页面头部功能。

#### dcfooter

底部组件，提供页面底部功能。

#### dcsidebar

侧边栏组件，提供侧边栏布局功能。

#### dcsidenav

侧边导航组件，提供侧边导航布局功能。

### 功能组件

#### dcanimator

动画组件，提供动画效果功能。

#### article

文章组件，提供文章展示功能。

#### bgm

背景音乐组件，提供背景音乐功能。

#### cookies

Cookie 提示组件，提供 Cookie 同意功能。

#### dcity

城市选择组件，提供城市选择功能。

#### dclocal

本地化组件，提供语言和地区选择功能。

#### dcolor

颜色选择组件，提供颜色选择功能。

#### dcpartner

合作伙伴组件，提供合作伙伴展示功能。

#### dcpricing

定价组件，提供价格展示功能。

#### dcproductivityslider

生产力滑块组件，提供生产力评估功能。

#### dctheme

主题组件，提供主题切换功能。

#### designby

设计by组件，提供设计 credits 功能。

#### dcfollowus

关注我们组件，提供社交媒体关注功能。

## 测试

dcjs库提供多种测试方式：

### 浏览器测试

使用提供的测试HTML页面进行功能测试：

1. 打开 `test/all-tools-test.html` 文件
2. 在浏览器中测试各项功能
3. 或者打开 `test/validation-test.html` 进行库加载验证
4. 或者打开 `test/dcqrcode-test.html` 专门测试二维码功能

### Node.js测试

使用Jest进行自动化测试：

```bash
# 运行所有工具类测试
npm run test

# 运行所有测试
npm run test:all
```

测试文件说明：
- `test/all-tools.test.js` - 所有工具类的自动化测试
- `test/all-tools-browser.test.js` - 浏览器环境下的测试
- `test/all-tools-test.html` - 浏览器测试页面
- `test/validation-test.html` - 库加载验证测试
- `test/dcqrcode.test.js` - 二维码工具的测试
- `test/dcqrcode-node.test.js` - 二维码Node.js环境测试
- `test/dcqrcode-test.html` - 二维码功能测试页面

## 注意事项

1. **浏览器兼容性**: 该库支持主流浏览器，具体兼容性请参考项目配置
2. **性能考虑**: 使用工具类时要注意性能影响，特别是频繁操作的场景
3. **安全**: 在使用加密工具时，确保遵循安全最佳实践
4. **错误处理**: 使用异步方法时要妥善处理错误情况

## 扩展和定制

如需添加新的工具类或功能，可以在 `src/utils/` 目录下创建新文件，并确保在文件末尾添加以下代码：

```javascript
// 将类添加到全局DC对象
window.DC = window.DC || {};
window.DC.ToolName = ToolClass;
```

确保遵循现有的代码风格和规范。

## 构建问题解决

如果在构建过程中遇到"cross-device link not permitted"错误，可以使用以下命令：

```bash
npx parcel build src/index.js --dist-dir dist --no-source-maps --no-cache
```

该命令将禁用缓存，避免跨设备链接错误。