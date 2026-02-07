# dcqrcode

二维码生成工具类 - 提供二维码的生成、渲染等功能，支持自定义尺寸、颜色、边距和纠错级别

## 安装

将 `dcqrcode.js` 文件引入到项目中：

```html
<script src="path/to/dcqrcode.js"></script>
```

## 基本用法

### 生成二维码并获取 Data URL

```javascript
const qrCode = new DC.QRCode();
const dataUrl = qrCode.generate('https://example.com', {
  size: 200,
  bgColor: '#FFFFFF',
  fgColor: '#000000',
  margin: 4,
  errorCorrectionLevel: 'M'
});

// 使用生成的二维码
const img = document.createElement('img');
img.src = dataUrl;
document.body.appendChild(img);
```

### 直接渲染到指定元素

```javascript
const qrCode = new DC.QRCode();
qrCode.render('qrcode-container', 'https://example.com', {
  size: 250,
  bgColor: '#FFFFFF',
  fgColor: '#333333',
  margin: 8,
  errorCorrectionLevel: 'H'
});
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `size` | number | 200 | 二维码尺寸（像素） |
| `bgColor` | string | '#FFFFFF' | 背景颜色（十六进制颜色码） |
| `fgColor` | string | '#000000' | 前景颜色（十六进制颜色码） |
| `margin` | number | 4 | 边距（模块数） |
| `errorCorrectionLevel` | string | 'M' | 纠错级别（L: 7%, M: 15%, Q: 25%, H: 30%） |

## API 参考

### 1. 构造函数

```javascript
const qrCode = new DC.QRCode();
```

### 2. generate(text, options)

生成二维码并返回 Data URL

**参数**：
- `text`：要编码的文本
- `options`：选项配置

**返回值**：二维码的 Data URL

**示例**：

```javascript
const qrCode = new DC.QRCode();

// 基本用法
const dataUrl1 = qrCode.generate('Hello, World!');

// 自定义选项
const dataUrl2 = qrCode.generate('https://example.com', {
  size: 300,
  bgColor: '#F5F5F5',
  fgColor: '#0066CC',
  margin: 6,
  errorCorrectionLevel: 'H'
});

console.log(dataUrl1); // 输出：data:image/png;base64,...
console.log(dataUrl2); // 输出：data:image/png;base64,...
```

### 3. render(element, text, options)

将二维码渲染到指定的元素

**参数**：
- `element`：目标元素或元素ID
- `text`：要编码的文本
- `options`：选项配置

**示例**：

```javascript
const qrCode = new DC.QRCode();

// 通过元素ID渲染
qrCode.render('qrcode-container', 'https://example.com');

// 通过元素对象渲染
const container = document.getElementById('qrcode-container');
qrCode.render(container, 'Hello, World!', {
  size: 200,
  bgColor: '#FFFFFF',
  fgColor: '#000000'
});
```

## 纠错级别

二维码支持四个纠错级别，用于在二维码部分损坏时仍能正确解码：

| 级别 | 纠错能力 | 适用场景 |
|------|----------|----------|
| L | 7% | 环境较好，二维码不会被损坏 |
| M | 15% | 一般环境，默认选择 |
| Q | 25% | 环境较差，二维码可能被部分遮挡 |
| H | 30% | 环境恶劣，二维码可能被严重损坏 |

## 示例

### 示例 1：基本二维码

```javascript
const qrCode = new DC.QRCode();
qrCode.render('qrcode-container', 'https://example.com');
```

### 示例 2：自定义颜色

```javascript
const qrCode = new DC.QRCode();
qrCode.render('qrcode-container', 'https://example.com', {
  size: 250,
  bgColor: '#F0F8FF',
  fgColor: '#2E8B57',
  margin: 6
});
```

### 示例 3：高纠错级别

```javascript
const qrCode = new DC.QRCode();
qrCode.render('qrcode-container', 'https://example.com', {
  size: 200,
  errorCorrectionLevel: 'H'
});
```

### 示例 4：带Logo的二维码

```javascript
const qrCode = new DC.QRCode();
const dataUrl = qrCode.generate('https://example.com', {
  size: 300,
  margin: 4,
  errorCorrectionLevel: 'H' // 使用高纠错级别，以便在中间添加Logo
});

// 创建容器和二维码图片
const container = document.getElementById('qrcode-container');
const img = document.createElement('img');
img.src = dataUrl;
img.style.position = 'relative';
img.style.display = 'block';

// 创建Logo元素
const logo = document.createElement('div');
logo.style.position = 'absolute';
logo.style.top = '50%';
logo.style.left = '50%';
logo.style.transform = 'translate(-50%, -50%)';
logo.style.width = '60px';
logo.style.height = '60px';
logo.style.backgroundColor = '#FFFFFF';
logo.style.borderRadius = '8px';
logo.style.display = 'flex';
logo.style.alignItems = 'center';
logo.style.justifyContent = 'center';
logo.style.border = '2px solid #FFFFFF';

// 添加Logo图片
const logoImg = document.createElement('img');
logoImg.src = 'path/to/logo.png';
logoImg.style.maxWidth = '90%';
logoImg.style.maxHeight = '90%';
logo.appendChild(logoImg);

// 组合二维码和Logo
container.style.position = 'relative';
container.style.display = 'inline-block';
container.appendChild(img);
container.appendChild(logo);
```

## 浏览器兼容性

- Chrome ≥ 60
- Firefox ≥ 55
- Safari ≥ 12
- Edge ≥ 79

## 注意事项

1. 确保目标元素存在且具有足够的空间来显示二维码
2. 二维码尺寸不宜过小，否则可能导致扫码困难
3. 颜色对比度要足够高，确保二维码可识别
4. 对于包含Logo的二维码，建议使用较高的纠错级别（H）
5. 文本内容不宜过长，否则可能导致二维码过于复杂
6. 二维码生成过程是同步的，对于大尺寸二维码可能会阻塞主线程

## 性能提示

1. 对于频繁生成二维码的场景，建议缓存生成结果
2. 避免在滚动或动画期间生成二维码
3. 对于大尺寸二维码，考虑使用 Web Workers 进行生成

## 测试

运行 `npm test test/utils/dcqrcode/dcqrcode.test.js` 查看测试结果。