# dcpicolor 颜色提取工具

## 简介

dcpicolor 是一个基于原生 JavaScript 实现的颜色提取工具，参考了 [color-thief](https://github.com/lokesh/color-thief) 和 [autohue.js](https://github.com/Auto-Plugin/autohue.js/) 的实现原理。该工具可以从图片中提取颜色调色板、主题色、背景色渐变等信息，支持浏览器和 Node.js 环境。

## 功能特性

- ✅ 从图片中提取颜色调色板
- ✅ 提取图片的主题色
- ✅ 提取图片的背景色渐变
- ✅ 支持浏览器和 Node.js 环境
- ✅ 支持 Promise 异步操作
- ✅ 提供颜色空间转换工具
- ✅ 支持图片尺寸优化，提高处理速度

## 安装使用

### 浏览器环境

```html
<!-- 引入 dcpicolor 工具 -->
<script src="../../../src/utils/dcpicolor.js"></script>

<!-- 使用示例 -->
<script>
    // 提取图片颜色信息
    async function extractColors() {
        const imageUrl = 'https://via.placeholder.com/300x200';
        const colors = await DC.Color.getImageColors(imageUrl);
        console.log('颜色信息:', colors);
    }
</script>
```

### Node.js 环境

```javascript
// 引入 dcpicolor 工具
const dcColor = require('../../../src/utils/dcpicolor.js');

// 使用示例
async function extractColors() {
    const fs = require('fs');
    const imageBuffer = fs.readFileSync('path/to/image.jpg');
    const colors = await dcColor.getImageColors(imageBuffer);
    console.log('颜色信息:', colors);
}
```

## API 文档

### 1. getColorPalette(source, options)

从图片中提取颜色调色板。

**参数：**
- `source`：图片源（URL、HTMLImageElement 或 Buffer）
- `options`：配置选项
  - `quality`：质量参数（1-10，值越小质量越高，默认为 5）
  - `colors`：提取的颜色数量（默认为 10）
  - `maxSize`：图片最大尺寸（默认为 100）

**返回值：**
- `Promise<Array<Array<number>>>`：颜色调色板（[[r, g, b], [r, g, b], ...]）

**示例：**
```javascript
const palette = await DC.Color.getColorPalette('https://via.placeholder.com/300x200', {
    quality: 3,
    colors: 15
});
console.log('颜色调色板:', palette);
```

### 2. getDominantColor(source, options)

从图片中提取主题色。

**参数：**
- `source`：图片源（URL、HTMLImageElement 或 Buffer）
- `options`：配置选项
  - `quality`：质量参数（1-10，值越小质量越高，默认为 5）
  - `maxSize`：图片最大尺寸（默认为 100）

**返回值：**
- `Promise<Array<number>>`：主题色（[r, g, b]）

**示例：**
```javascript
const dominantColor = await DC.Color.getDominantColor('https://via.placeholder.com/300x200');
console.log('主题色:', dominantColor);
```

### 3. getBackgroundColor(source, options)

从图片中提取背景色渐变。

**参数：**
- `source`：图片源（URL、HTMLImageElement 或 Buffer）
- `options`：配置选项
  - `quality`：质量参数（1-10，值越小质量越高，默认为 5）
  - `maxSize`：图片最大尺寸（默认为 100）
  - `threshold`：簇阈值

**返回值：**
- `Promise<Object>`：背景色渐变信息

**示例：**
```javascript
const background = await DC.Color.getBackgroundColor('https://via.placeholder.com/300x200');
console.log('背景色渐变:', background);
```

### 4. getImageColors(source, options)

从图片中提取完整的颜色信息。

**参数：**
- `source`：图片源（URL、HTMLImageElement 或 Buffer）
- `options`：配置选项（同 getColorPalette）

**返回值：**
- `Promise<Object>`：完整的颜色信息

**示例：**
```javascript
const colors = await DC.Color.getImageColors('https://via.placeholder.com/300x200');
console.log('完整颜色信息:', colors);
```

### 5. rgbToHex(rgb)

将 RGB 颜色转换为十六进制颜色。

**参数：**
- `rgb`：RGB 颜色（[r, g, b]）

**返回值：**
- `string`：十六进制颜色

**示例：**
```javascript
const hex = DC.Color.rgbToHex([255, 0, 0]);
console.log('十六进制颜色:', hex); // #ff0000
```

### 6. hexToRgb(hex)

将十六进制颜色转换为 RGB 颜色。

**参数：**
- `hex`：十六进制颜色

**返回值：**
- `Array<number>`：RGB 颜色（[r, g, b]）

**示例：**
```javascript
const rgb = DC.Color.hexToRgb('#ff0000');
console.log('RGB颜色:', rgb); // [255, 0, 0]
```

### 7. sortColorsByBrightness(colors)

对颜色数组进行排序（从浅到深）。

**参数：**
- `colors`：颜色数组（[[r, g, b], [r, g, b], ...]）

**返回值：**
- `Array<Array<number>>`：排序后的颜色数组

**示例：**
```javascript
const colors = [[0, 0, 0], [255, 255, 255], [128, 128, 128]];
const sortedColors = DC.Color.sortColorsByBrightness(colors);
console.log('排序后的颜色:', sortedColors);
```

## 示例代码

### 基本使用示例

```javascript
// 提取完整颜色信息
async function extractColors() {
    const imageUrl = 'https://via.placeholder.com/300x200';
    const colors = await DC.Color.getImageColors(imageUrl);
    
    console.log('主题色:', colors.dominantColor);
    console.log('次要色:', colors.secondaryColor);
    console.log('调色板:', colors.palette);
    console.log('背景色渐变:', colors.backgroundColor);
}
```

### 高级使用示例

```javascript
// 自定义配置提取调色板
async function extractCustomPalette() {
    const imageUrl = 'https://via.placeholder.com/300x200';
    const palette = await DC.Color.getColorPalette(imageUrl, {
        quality: 1, // 最高质量
        colors: 20, // 提取20种颜色
        maxSize: 200 // 更大的图片尺寸
    });
    
    // 转换为十六进制颜色
    const hexPalette = palette.map(color => DC.Color.rgbToHex(color));
    console.log('十六进制调色板:', hexPalette);
}
```

## 浏览器兼容性

- ✅ Chrome 45+
- ✅ Firefox 40+
- ✅ Safari 10+
- ✅ Edge 14+

## Node.js 兼容性

- ✅ Node.js 8+

## 性能优化

1. **图片尺寸优化**：默认会将图片缩小到 100x100 像素进行处理，可通过 `maxSize` 参数调整
2. **采样质量**：通过 `quality` 参数控制采样间隔，值越大性能越好但质量越低
3. **并行处理**：`getImageColors` 方法使用 `Promise.all` 并行处理多个颜色提取任务
4. **透明像素过滤**：自动跳过透明度较低的像素，减少计算量

## 错误处理

```javascript
try {
    const colors = await DC.Color.getImageColors('invalid-image-url');
} catch (error) {
    console.error('提取颜色失败:', error.message);
}
```

## 测试用例

测试文件位于 `test/utils/dcpicolor/dcpicolor.test.js`，包含以下测试：

- 工具类存在性测试
- 静态方法存在性测试
- 功能测试（颜色转换等）
- 异步方法测试
- 边界情况测试

## 版本历史

### v1.0.0
- 初始版本
- 实现基本颜色提取功能
- 支持浏览器和 Node.js 环境
- 提供完整的 API 文档和示例代码

## 贡献者

- DC Team

## 许可证

MIT License