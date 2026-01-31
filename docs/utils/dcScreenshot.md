# dcScreenshot 工具类文档

## 1. 类介绍

`dcScreenshot` 是 DCJS 库中的截图工具类，提供了丰富的网页截图功能，支持全屏截图、指定元素截图、指定区域截图等功能。该类还支持水印添加、插件扩展、性能监控等高级特性。

### 主要功能
- 捕获整个页面的截图（包括滚动区域）
- 捕获指定DOM元素的截图
- 捕获指定坐标区域的截图
- 支持多种图片格式（PNG、JPEG、WebP）
- 可添加自定义水印
- 支持插件扩展系统
- 提供性能监控指标
- 支持配置更新
- 支持缩放功能以获取更高分辨率的截图
- 提供多种导出格式和方法（SVG、Canvas、Blob等）
- 提供静态快捷方法以方便使用

### 应用场景
- 网页内容分享
- 页面状态保存
- 错误报告截图
- 自动化测试截图
- 用户操作流程记录

## 2. 构造函数

```javascript
const screenshot = new DC.Screenshot(options);
```

### 参数说明

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `options` | Object | `{}` | 配置选项对象 |
| `options.format` | String | `'png'` | 截图格式，支持 'png', 'jpeg', 'jpg', 'webp' |
| `options.quality` | Number | `0.8` | 截图质量（0-1），仅对 JPEG 和 WebP 格式有效 |
| `options.useCORS` | Boolean | `false` | 是否使用 CORS 模式加载图片 |
| `options.watermark` | Object | `null` | 水印配置，为 null 时不添加水印 |
| `options.watermark.text` | String | - | 水印文本内容 |
| `options.watermark.position` | String | `'bottom-right'` | 水印位置，支持 'top-left', 'top-right', 'bottom-left', 'bottom-right' |
| `options.watermark.color` | String | `'rgba(255, 255, 255, 0.7)'` | 水印文字颜色 |
| `options.watermark.fontSize` | Number | `16` | 水印文字大小（像素） |
| `options.scale` | Number | `1` | 缩放因子，用于高分辨率截图 |
| `options.width` | Number | `null` | 自定义宽度 |
| `options.height` | Number | `null` | 自定义高度 |
| `options.embedFonts` | Boolean | `true` | 是否嵌入字体 |
| `options.localFonts` | Boolean | `true` | 是否包含本地字体 |
| `options.iconFonts` | Boolean | `true` | 是否包含图标字体 |
| `options.excludeFonts` | Array | `[]` | 排除的字体 |
| `options.exclude` | Array | `[]` | 排除的元素 |
| `options.filter` | Function | `null` | 过滤器函数 |
| `options.outerTransforms` | Boolean | `true` | 是否应用外部变换 |
| `options.outerShadows` | Boolean | `true` | 是否应用外部阴影 |

### 示例

```javascript
// 创建默认配置的截图实例
const screenshot = new DC.utils.dcScreenshot();

// 创建带水印的截图实例
const screenshotWithWatermark = new DC.utils.dcScreenshot({
  format: 'jpeg',
  quality: 0.9,
  watermark: {
    text: 'DCJS Screenshot',
    position: 'bottom-right',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 14
  }
});
```

## 3. 实例方法

### 3.1 captureFullPage()

捕获整个页面的截图，包括滚动区域。

#### 语法

```javascript
const result = await screenshot.captureFullPage();
```

#### 返回值

返回一个 Promise，解析为包含截图结果的对象：

| 属性 | 类型 | 描述 |
|------|------|------|
| `success` | Boolean | 截图是否成功 |
| `dataUrl` | String | 截图的 Base64 编码数据 URL |
| `width` | Number | 截图宽度（像素） |
| `height` | Number | 截图高度（像素） |
| `format` | String | 截图格式 |
| `size` | Number | 截图大小（字节） |
| `canvas` | HTMLCanvasElement | 截图的 Canvas 元素 |
| `error` | String | 错误信息（仅当 success 为 false 时存在） |
| `toSvg()` | Function | 转换为 SVG 格式 |
| `toCanvas()` | Function | 获取 Canvas 元素 |
| `toBlob(options)` | Function | 转换为 Blob 对象 |
| `toPng(options)` | Function | 转换为 PNG 图片 |
| `toJpg(options)` | Function | 转换为 JPG 图片 |
| `toWebp(options)` | Function | 转换为 WebP 图片 |
| `download(options)` | Function | 下载截图 |

#### 示例

```javascript
// 捕获整个页面
const result = await screenshot.captureFullPage();

if (result.success) {
  // 创建图片元素显示截图
  const img = document.createElement('img');
  img.src = result.dataUrl;
  document.body.appendChild(img);

  console.log(`截图成功：${result.width}x${result.height}，大小：${result.size} 字节`);
} else {
  console.error('截图失败:', result.error);
}
```

### 3.2 captureElement(element)

捕获指定DOM元素的截图。

#### 语法

```javascript
const result = await screenshot.captureElement(element);
```

#### 参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `element` | HTMLElement | 是 | 要截图的DOM元素 |

#### 返回值

同 `captureFullPage()` 方法的返回值。

#### 示例

```javascript
// 获取要截图的元素
const targetElement = document.getElementById('main-content');

// 捕获元素截图
const result = await screenshot.captureElement(targetElement);

if (result.success) {
  // 下载截图
  const link = document.createElement('a');
  link.href = result.dataUrl;
  link.download = 'element-screenshot.png';
  link.click();
}
```

### 3.3 captureRegion(x, y, width, height)

捕获指定坐标区域的截图。

#### 语法

```javascript
const result = await screenshot.captureRegion(x, y, width, height);
```

#### 参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `x` | Number | 是 | 区域左上角的X坐标 |
| `y` | Number | 是 | 区域左上角的Y坐标 |
| `width` | Number | 是 | 区域宽度 |
| `height` | Number | 是 | 区域高度 |

#### 返回值

同 `captureFullPage()` 方法的返回值。

#### 示例

```javascript
// 捕获页面顶部 800x600 区域
const result = await screenshot.captureRegion(0, 0, 800, 600);

if (result.success) {
  console.log('区域截图成功');
  // 使用截图数据...
}
```

### 3.4 updateConfig(newOptions)

更新截图配置选项。

#### 语法

```javascript
screenshot.updateConfig(newOptions);
```

#### 参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `newOptions` | Object | 是 | 新的配置选项，会与现有配置合并 |

#### 示例

```javascript
// 更新配置，更改格式和质量
screenshot.updateConfig({
  format: 'webp',
  quality: 0.95
});

// 更新水印配置
screenshot.updateConfig({
  watermark: {
    text: 'Updated Watermark',
    position: 'top-left',
    color: 'rgba(255, 0, 0, 0.6)'
  }
});
```

### 3.5 addPlugin(plugin)

添加插件以扩展截图功能。

#### 语法

```javascript
screenshot.addPlugin(plugin);
```

#### 参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `plugin` | Object | 是 | 插件对象，包含名称和钩子方法 |

#### 插件结构

```javascript
const plugin = {
  name: 'pluginName',
  beforeCapture: (options) => {
    // 截图前的处理逻辑
    return options;
  },
  afterCapture: (result, options) => {
    // 截图后的处理逻辑
    return result;
  }
};
```

#### 示例

```javascript
// 创建一个简单的插件
const timestampPlugin = {
  name: 'timestamp',
  afterCapture: (result) => {
    // 在截图结果中添加时间戳
    return {
      ...result,
      timestamp: Date.now()
    };
  }
};

// 添加插件
screenshot.addPlugin(timestampPlugin);
```

### 3.6 removePlugin(pluginName)

移除指定名称的插件。

#### 语法

```javascript
screenshot.removePlugin(pluginName);
```

#### 参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `pluginName` | String | 是 | 要移除的插件名称 |

#### 示例

```javascript
// 移除之前添加的插件
screenshot.removePlugin('timestamp');
```

### 3.7 getPerformanceMetrics()

获取截图性能指标。

#### 语法

```javascript
const metrics = screenshot.getPerformanceMetrics();
```

#### 返回值

| 属性 | 类型 | 描述 |
|------|------|------|
| `captureCount` | Number | 截图次数 |
| `totalTime` | Number | 总执行时间（毫秒） |
| `captureTimes` | Array<Number> | 每次截图的执行时间数组 |
| `averageTime` | Number | 平均执行时间（毫秒） |

#### 示例

```javascript
// 获取性能指标
const metrics = screenshot.getPerformanceMetrics();
console.log('截图次数:', metrics.captureCount);
console.log('平均执行时间:', metrics.averageTime.toFixed(2), 'ms');
console.log('总执行时间:', metrics.totalTime.toFixed(2), 'ms');
```

## 4. 静态快捷方法

`dcScreenshot` 类提供了一系列静态快捷方法，方便用户直接使用而无需创建实例。

### 4.1 捕获方法

#### captureFullPage(options)

直接捕获整个页面的截图。

```javascript
const result = await DC.Screenshot.captureFullPage(options);
```

#### captureElement(element, options)

直接捕获指定元素的截图。

```javascript
const result = await DC.Screenshot.captureElement(element, options);
```

#### captureRegion(x, y, width, height, options)

直接捕获指定区域的截图。

```javascript
const result = await DC.Screenshot.captureRegion(x, y, width, height, options);
```

### 4.2 导出方法

#### toSvg(source, options)

将源（元素、区域或整个页面）转换为 SVG 格式。

```javascript
const svgImage = await DC.Screenshot.toSvg(source, options);
```

#### toCanvas(source, options)

将源转换为 Canvas 元素。

```javascript
const canvas = await DC.Screenshot.toCanvas(source, options);
```

#### toBlob(source, options)

将源转换为 Blob 对象。

```javascript
const blob = await DC.Screenshot.toBlob(source, options);
```

#### toPng(source, options)

将源转换为 PNG 图片。

```javascript
const pngImage = await DC.Screenshot.toPng(source, options);
```

#### toJpg(source, options)

将源转换为 JPG 图片。

```javascript
const jpgImage = await DC.Screenshot.toJpg(source, options);
```

#### toWebp(source, options)

将源转换为 WebP 图片。

```javascript
const webpImage = await DC.Screenshot.toWebp(source, options);
```

#### download(source, options)

直接下载源的截图。

```javascript
await DC.Screenshot.download(source, options);
```

### 4.3 静态方法参数说明

| 参数 | 类型 | 描述 |
|------|------|------|
| `source` | HTMLElement  Array<Number> | 源对象，可以是 DOM 元素或表示区域的数组 [x, y, width, height] |
| `options` | Object | 配置选项，同构造函数的 options 参数 |

### 4.4 静态方法示例

```javascript
// 示例 1: 使用静态方法捕获元素并转换为 PNG
const element = document.getElementById('main-content');
const pngImage = await DC.Screenshot.toPng(element);
document.body.appendChild(pngImage);

// 示例 2: 使用静态方法下载整个页面的截图
await DC.Screenshot.download(document.body, {
  format: 'png',
  quality: 0.9,
  filename: 'full-page-screenshot'
});

// 示例 3: 使用静态方法捕获指定区域并转换为 Blob
const region = [100, 100, 600, 400];
const blob = await DC.Screenshot.toBlob(region, {
  format: 'jpeg',
  quality: 0.8
});

// 示例 4: 使用静态方法捕获元素并转换为 Canvas
const canvas = await DC.Screenshot.toCanvas(element);
document.body.appendChild(canvas);
```

## 5. 核心方法实现细节

### 5.1 全屏截图实现

全屏截图的实现步骤如下：

1. 应用插件的 `beforeCapture` 钩子
2. 获取页面的完整尺寸（包括滚动区域）
3. 创建与页面尺寸相同的 canvas 元素
4. 滚动页面到顶部并等待滚动完成
5. 分批次截取视口内容，拼接成完整页面
6. 恢复原始滚动位置
7. 添加水印（如果配置了）
8. 生成截图结果
9. 应用插件的 `afterCapture` 钩子
10. 更新性能指标

### 5.2 元素截图实现

元素截图的实现步骤如下：

1. 应用插件的 `beforeCapture` 钩子
2. 获取目标元素的位置和尺寸
3. 创建与元素尺寸相同的 canvas 元素
4. 截取整个视口，然后从其中裁剪出元素部分
5. 添加水印（如果配置了）
6. 生成截图结果
7. 应用插件的 `afterCapture` 钩子
8. 更新性能指标

### 5.3 区域截图实现

区域截图的实现步骤如下：

1. 应用插件的 `beforeCapture` 钩子
2. 创建与指定区域尺寸相同的 canvas 元素
3. 截取整个视口，然后从其中裁剪出指定区域
4. 添加水印（如果配置了）
5. 生成截图结果
6. 应用插件的 `afterCapture` 钩子
7. 更新性能指标

### 5.4 水印添加实现

水印添加的实现步骤如下：

1. 解析水印配置（文本、位置、颜色、字体大小）
2. 根据位置计算水印的坐标
3. 在 canvas 上绘制水印文本
4. 支持的位置包括：左上角、右上角、左下角、右下角

### 5.5 插件系统实现

插件系统的实现步骤如下：

1. 维护一个插件数组
2. 在截图前后调用对应钩子的所有插件方法
3. 传递相关数据给插件方法，并接收处理后的数据
4. 支持插件的添加和移除

## 6. 技术要点和注意事项

### 6.1 技术要点

1. **Canvas 绘图**：使用 HTML5 Canvas API 进行图像绘制和处理
2. **异步操作**：使用 async/await 和 Promise 处理异步操作
3. **页面滚动处理**：在全屏截图时需要处理页面滚动，确保捕获完整内容
4. **分批次截图**：对于长页面，分批次截取视口内容并拼接
5. **Base64 编码**：使用 canvas.toDataURL() 生成 Base64 编码的图像数据
6. **性能监控**：记录截图次数和执行时间，提供性能指标
7. **插件系统**：通过钩子机制支持功能扩展
8. **缩放功能**：支持通过 scale 选项获取更高分辨率的截图
9. **多种导出格式**：支持 SVG、Canvas、Blob 等多种导出格式
10. **静态快捷方法**：提供静态方法方便直接使用

### 6.2 注意事项

1. **跨域图片**：如果页面中包含跨域图片，可能会导致截图失败或图片无法显示。可以设置 `useCORS` 选项尝试解决。

2. **浏览器兼容性**：
   - 支持现代浏览器（Chrome、Firefox、Safari、Edge）
   - 不支持 IE 浏览器
   - `drawWindow` 方法在某些浏览器中可能不可用，会自动降级处理

3. **性能考虑**：
   - 全屏截图可能会消耗较多内存，特别是对于长页面
   - 高缩放因子会增加内存使用和处理时间
   - 建议在用户交互时添加加载提示
   - 可以通过插件系统添加压缩功能，减小截图大小

4. **安全限制**：
   - 在某些浏览器中，可能会受到 Content Security Policy (CSP) 的限制
   - 本地文件系统中运行时可能会有安全限制

5. **分辨率问题**：
   - 截图分辨率取决于设备像素比 (DPR)
   - 可以通过调整 canvas 尺寸和缩放因子来提高截图质量

## 7. 完整使用示例

### 7.1 基本用法示例

```javascript
// 创建截图实例
const screenshot = new DC.Screenshot({
  format: 'png',
  quality: 0.8,
  watermark: {
    text: '© 2026 DCJS',
    position: 'bottom-right',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 14
  }
});

// 1. 全屏截图
document.getElementById('capture-full').addEventListener('click', async () => {
  const result = await screenshot.captureFullPage();
  if (result.success) {
    const img = document.createElement('img');
    img.src = result.dataUrl;
    img.style.maxWidth = '100%';
    document.getElementById('result-container').appendChild(img);
  }
});

// 2. 元素截图
document.getElementById('capture-element').addEventListener('click', async () => {
  const element = document.getElementById('target-element');
  const result = await screenshot.captureElement(element);
  if (result.success) {
    const link = document.createElement('a');
    link.href = result.dataUrl;
    link.download = 'element-screenshot.png';
    link.click();
  }
});

// 3. 区域截图
document.getElementById('capture-region').addEventListener('click', async () => {
  const result = await screenshot.captureRegion(100, 100, 600, 400);
  if (result.success) {
    console.log('区域截图成功:', result);
  }
});

// 4. 查看性能指标
document.getElementById('show-metrics').addEventListener('click', () => {
  const metrics = screenshot.getPerformanceMetrics();
  console.log('性能指标:', metrics);
});
```

### 7.2 高级用法示例（带插件）

```javascript
// 创建截图实例
const screenshot = new DC.Screenshot();

// 创建压缩插件
const compressionPlugin = {
  name: 'compression',
  afterCapture: (result) => {
    // 这里可以添加图片压缩逻辑
    console.log('应用压缩插件');
    return result;
  }
};

// 创建日志插件
const logPlugin = {
  name: 'logger',
  beforeCapture: (options) => {
    console.log('开始截图，配置:', options);
    return options;
  },
  afterCapture: (result) => {
    console.log('截图完成，结果:', {
      success: result.success,
      size: result.size,
      dimensions: `${result.width}x${result.height}`
    });
    return result;
  }
};

// 添加插件
screenshot.addPlugin(compressionPlugin);
screenshot.addPlugin(logPlugin);

// 捕获全屏并下载
document.getElementById('capture-and-download').addEventListener('click', async () => {
  const result = await screenshot.captureFullPage();
  if (result.success) {
    const link = document.createElement('a');
    link.href = result.dataUrl;
    link.download = `screenshot-${Date.now()}.png`;
    link.click();
  }
});

// 移除插件
document.getElementById('remove-plugin').addEventListener('click', () => {
  screenshot.removePlugin('compression');
  console.log('已移除压缩插件');
});
```

### 7.3 新功能示例

#### 7.3.1 缩放功能示例

```javascript
// 创建高分辨率截图
const highResScreenshot = new DC.Screenshot({
  scale: 2, // 2倍分辨率
  quality: 0.9
});

// 捕获元素的高分辨率截图
document.getElementById('capture-high-res').addEventListener('click', async () => {
  const element = document.getElementById('target-element');
  const result = await highResScreenshot.captureElement(element);

  if (result.success) {
    // 直接下载高分辨率截图
    await result.download({ filename: 'high-res-element' });
  }
});

// 自定义尺寸截图
document.getElementById('capture-custom-size').addEventListener('click', async () => {
  const customSizeScreenshot = new DC.Screenshot({
    width: 1200,
    height: 800,
    scale: 1.5
  });

  const result = await customSizeScreenshot.captureFullPage();
  if (result.success) {
    console.log('自定义尺寸截图成功:', result);
  }
});
```

#### 7.3.2 新导出方法示例

```javascript
// 测试新的导出方法
document.getElementById('test-export-methods').addEventListener('click', async () => {
  const screenshot = new DC.Screenshot();
  const element = document.getElementById('target-element');

  try {
    const result = await screenshot.captureElement(element);

    // 测试 toSvg 方法
    const svgImage = await result.toSvg();
    document.getElementById('result-svg').appendChild(svgImage);

    // 测试 toCanvas 方法
    const canvas = await result.toCanvas();
    document.getElementById('result-canvas').appendChild(canvas);

    // 测试 toBlob 方法
    const blob = await result.toBlob({ format: 'jpeg', quality: 0.8 });
    console.log('Blob 大小:', blob.size);

    // 测试 toPng 方法
    const pngImage = await result.toPng({ quality: 0.9 });
    document.getElementById('result-png').appendChild(pngImage);

    // 测试 toJpg 方法
    const jpgImage = await result.toJpg({ quality: 0.8 });
    document.getElementById('result-jpg').appendChild(jpgImage);

    // 测试 toWebp 方法
    const webpImage = await result.toWebp({ quality: 0.9 });
    document.getElementById('result-webp').appendChild(webpImage);

    console.log('所有导出方法测试完成！');
  } catch (error) {
    console.error('测试导出方法失败:', error);
  }
});
```

#### 7.3.3 静态快捷方法示例

```javascript
// 直接使用静态方法
document.getElementById('use-static-methods').addEventListener('click', async () => {
  const element = document.getElementById('target-element');

  try {
    // 示例 1: 直接转换为 PNG 并显示
    const pngImage = await DC.Screenshot.toPng(element);
    document.getElementById('static-result').appendChild(pngImage);

    // 示例 2: 直接下载
    await DC.Screenshot.download(element, {
      format: 'png',
      filename: 'static-download',
      quality: 0.9
    });

    // 示例 3: 捕获区域并转换为 Blob
    const region = [100, 100, 400, 300];
    const blob = await DC.Screenshot.toBlob(region, {
      format: 'jpeg',
      quality: 0.8
    });
    console.log('区域截图 Blob 大小:', blob.size);

    console.log('静态方法测试完成！');
  } catch (error) {
    console.error('静态方法测试失败:', error);
  }
});
```

## 8. 浏览器兼容性

| 浏览器 | 支持情况 | 备注 |
|--------|----------|------|
| Chrome | ✅ 完全支持 | 推荐使用 |
| Firefox | ✅ 完全支持 | 推荐使用 |
| Safari | ✅ 完全支持 | 推荐使用 |
| Edge | ✅ 完全支持 | 推荐使用 |
| IE 11 | ❌ 不支持 | 不兼容 Canvas API 和现代 JavaScript 特性 |

## 9. 错误处理

`dcScreenshot` 类内置了完善的错误处理机制，所有方法都会捕获异常并返回包含错误信息的结果对象。常见错误包括：

1. **元素不存在**：当传入的元素参数无效时
2. **Canvas 操作失败**：当浏览器不支持某些 Canvas 操作时
3. **内存不足**：当页面过大，无法创建足够大的 Canvas 时
4. **安全限制**：当受到浏览器安全策略限制时

错误处理示例：

```javascript
try {
  const result = await screenshot.captureFullPage();
  if (result.success) {
    // 处理成功结果
  } else {
    // 处理失败结果
    console.error('截图失败:', result.error);
    // 显示用户友好的错误信息
    showErrorMessage('截图失败，请重试');
  }
} catch (error) {
  // 捕获其他未预料的错误
  console.error('发生未知错误:', error);
  showErrorMessage('系统错误，请稍后重试');
}
```

## 10. 代码优化建议

### 10.1 性能优化

1. **使用 OffscreenCanvas**：在支持的浏览器中，使用 OffscreenCanvas 可以在后台线程中进行 Canvas 操作，提高性能。

2. **图片压缩**：对于大型截图，可以添加自动压缩功能，减小图片大小。

3. **懒加载处理**：在截图前可以检查并触发懒加载图片，确保所有内容都被捕获。

4. **防抖处理**：对于用户频繁触发的截图操作，可以添加防抖处理，避免性能浪费。

### 10.2 功能增强

1. **支持更多格式**：可以添加对 SVG、PDF 等格式的支持。

2. **高级水印选项**：支持图片水印、旋转水印、重复水印等高级选项。

3. **截图编辑功能**：添加简单的截图编辑功能，如裁剪、标注、文字添加等。

4. **批量截图**：支持批量捕获多个元素或区域的截图。

5. **云存储集成**：添加对云存储服务的集成，直接上传截图。

### 10.3 代码质量

1. **类型定义**：添加 TypeScript 类型定义，提高代码可维护性。

2. **单元测试**：为核心功能添加单元测试，确保代码质量。

3. **文档完善**：继续完善文档，添加更多使用示例和最佳实践。

4. **错误处理增强**：添加更详细的错误类型和错误代码，便于调试。

5. **代码模块化**：将核心功能拆分为更小的模块，提高代码可维护性。

## 11. 总结

`dcScreenshot` 是一个功能强大、易于使用的网页截图工具类，提供了多种截图方式和丰富的配置选项。它支持水印添加、插件扩展、性能监控等高级特性，可以满足各种网页截图需求。

通过合理使用 `dcScreenshot`，可以为用户提供更好的网页内容分享体验，为开发人员提供更便捷的测试和调试工具。

### 典型应用场景

- **用户分享**：允许用户一键分享当前页面或特定内容的截图
- **错误报告**：在发生错误时自动捕获页面状态，帮助开发人员调试
- **自动化测试**：与测试框架集成，自动捕获测试过程中的页面状态
- **内容存档**：定期捕获重要页面的截图，作为内容存档
- **视觉回归测试**：比较不同版本页面的截图，检测视觉变化

`dcScreenshot` 工具类的设计考虑了灵活性和可扩展性，通过插件系统可以轻松添加新功能，适应不同的业务需求。