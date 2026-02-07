# dcFiles 文档

## 概述

dcFiles 是一个功能强大的文件操作工具类，提供了丰富的方法来处理文件、图片和相关操作，包括文件读取、图片处理、文件下载、图片预加载和懒加载等功能。

## 功能特性

- 文件读取和处理
- 图片操作和转换
- 文件下载功能
- 图片预加载
- 图片懒加载
- 跨浏览器兼容性

## 方法

### 基础文件操作方法

#### getFiles(input)

从文件输入框读取文件。

**参数**:
- `input` (HTMLInputElement): 文件输入元素

**返回值**: File[] - 文件数组

#### readFile(file, readAs = 'text')

读取文件内容。

**参数**:
- `file` (File): 要读取的文件
- `readAs` (String): 读取方式：'text', 'dataURL', 'arrayBuffer', 'binaryString'

**返回值**: `Promise&lt;string|ArrayBuffer&gt;` - 文件内容

#### readImage(file)

读取图片文件并返回 Data URL。

**参数**:
- `file` (File): 要读取的图片文件

**返回值**: `Promise&lt;string&gt;` - 图片 Data URL

#### createImage(src)

从 URL 或 Data URL 创建图片元素。

**参数**:
- `src` (String): 图片 URL 或 Data URL

**返回值**: `Promise&lt;HTMLImageElement&gt;` - 图片元素

#### loadImages(sources)

加载多个图片。

**参数**:
- `sources` (String[]): 图片 URL 数组

**返回值**: `Promise&lt;HTMLImageElement[]&gt;` - 加载完成的图片数组

#### resizeFile(file, maxSize)

将文件转换为指定大小的 Blob 对象。

**参数**:
- `file` (File): 要转换的文件
- `maxSize` (Number): 最大大小（字节）

**返回值**: `Promise&lt;Blob&gt;` - 转换后的 Blob 对象

#### downloadFile(content, filename)

下载文件。

**参数**:
- `content` (Blob|String): 文件内容或 URL
- `filename` (String): 文件名

#### previewImage(file)

预览图片。

**参数**:
- `file` (File): 图片文件

**返回值**: `Promise&lt;string&gt;` - 预览 URL

### 图片预加载类

#### Preload

图片预加载类，用于批量预加载图片。

**构造函数**:
```javascript
new DC.Files.Preload(pics, options)
```

**参数**:
- `pics` (String[]): 要预加载的图片 URL 数组
- `options` (Object): 配置选项
  - `complete` (Function): 所有图片加载完成后的回调
  - `progress` (Function): 图片加载进度回调
  - `error` (Function): 图片加载错误回调

**回调函数参数**:
- `complete(successCount, errorCount)`: 成功加载的图片数量和失败的图片数量
- `progress(loaded, total, src, status)`: 已加载数量、总数量、当前加载的图片 URL、加载状态
- `error(src)`: 加载失败的图片 URL

### 图片懒加载类

#### LazyLoader

图片懒加载类，用于延迟加载图片，提高页面性能。

**构造函数**:
```javascript
new DC.Files.LazyLoader(options)
```

**参数**:
- `options` (Object): 配置选项
  - `selector` (String): 懒加载图片的选择器，默认 '.lazy'
  - `threshold` (Number): 交叉观察器的阈值，默认 0.1
  - `rootMargin` (String): 交叉观察器的根边距，默认 '50px'

**方法**:
- `init()`: 初始化懒加载
- `observe()`: 开始观察图片
- `loadImage(img)`: 加载单个图片
- `loadAllImages()`: 加载所有图片
- `destroy()`: 销毁懒加载实例
- `refresh()`: 刷新观察列表

## 使用示例

### 基础文件操作

```javascript
// 从文件输入框读取文件
const input = document.getElementById('file-input');
const files = DC.Files.getFiles(input);

// 读取文件内容
DC.Files.readFile(files[0], 'text')
  .then(content => {
    console.log('文件内容:', content);
  })
  .catch(error => {
    console.error('读取失败:', error);
  });

// 读取图片文件
DC.Files.readImage(files[0])
  .then(dataUrl => {
    const img = document.createElement('img');
    img.src = dataUrl;
    document.body.appendChild(img);
  })
  .catch(error => {
    console.error('读取失败:', error);
  });
```

### 图片操作

```javascript
// 创建图片元素
DC.Files.createImage('https://example.com/image.jpg')
  .then(img => {
    img.width = 200;
    document.body.appendChild(img);
  })
  .catch(error => {
    console.error('创建失败:', error);
  });

// 加载多个图片
const imageUrls = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
];

DC.Files.loadImages(imageUrls)
  .then(images => {
    images.forEach(img => {
      img.width = 100;
      document.body.appendChild(img);
    });
  })
  .catch(error => {
    console.error('加载失败:', error);
  });

// 调整图片大小
DC.Files.resizeFile(file, 1024 * 1024) // 1MB
  .then(resizedBlob => {
    console.log('调整后的大小:', resizedBlob.size);
    DC.Files.downloadFile(resizedBlob, 'resized-image.jpg');
  })
  .catch(error => {
    console.error('调整失败:', error);
  });
```

### 文件下载

```javascript
// 下载文本文件
const textContent = 'Hello, DCJS!';
const textBlob = new Blob([textContent], { type: 'text/plain' });
DC.Files.downloadFile(textBlob, 'example.txt');

// 下载图片
DC.Files.downloadFile('https://example.com/image.jpg', 'downloaded-image.jpg');
```

### 图片预览

```javascript
// 预览图片
const fileInput = document.getElementById('image-input');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const previewUrl = await DC.Files.previewImage(file);
      const previewImg = document.createElement('img');
      previewImg.src = previewUrl;
      previewImg.width = 200;
      document.getElementById('preview-container').appendChild(previewImg);
    } catch (error) {
      console.error('预览失败:', error);
    }
  }
});
```

### 图片预加载

```javascript
// 预加载图片
const preloader = new DC.Files.Preload(
  [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ],
  {
    complete: (successCount, errorCount) => {
      console.log(`预加载完成: 成功 ${successCount}, 失败 ${errorCount}`);
    },
    progress: (loaded, total, src, status) => {
      console.log(`加载进度: ${loaded}/${total}, ${src}, ${status}`);
    },
    error: (src) => {
      console.error(`加载失败: ${src}`);
    }
  }
);
```

### 图片懒加载

```html
<!-- HTML 结构 -->
<img class="lazy" data-src="https://example.com/image1.jpg" width="200" height="150" alt="Image 1">
<img class="lazy" data-src="https://example.com/image2.jpg" width="200" height="150" alt="Image 2">
<img class="lazy" data-src="https://example.com/image3.jpg" width="200" height="150" alt="Image 3">

<script>
// 初始化懒加载
const lazyLoader = new DC.Files.LazyLoader({
  selector: '.lazy',
  threshold: 0.2,
  rootMargin: '100px'
});

// 当页面动态添加新图片时
setTimeout(() => {
  const newImg = document.createElement('img');
  newImg.className = 'lazy';
  newImg.setAttribute('data-src', 'https://example.com/image4.jpg');
  newImg.width = 200;
  newImg.height = 150;
  newImg.alt = 'Image 4';
  document.body.appendChild(newImg);

  // 刷新懒加载观察列表
  lazyLoader.refresh();
}, 2000);
</script>
```

## 注意事项

1. 文件操作方法依赖于浏览器的 File API，在不支持 File API 的环境中可能无法使用
2. 图片懒加载使用了 IntersectionObserver API，对于不支持此 API 的浏览器，会自动降级为立即加载所有图片
3. 预加载和懒加载功能主要针对图片资源，其他类型的资源可能需要使用不同的处理方式
4. 在处理大文件时，应注意内存使用，避免浏览器崩溃
5. 下载功能依赖于浏览器的下载能力，某些浏览器可能对下载有安全限制

## 浏览器兼容性

- 现代浏览器（Chrome, Firefox, Safari, Edge）
- IE11+（部分功能可能需要 polyfill）

## 错误处理

所有异步方法都返回 Promise，应使用 try/catch 或 .catch() 方法捕获错误。常见的错误包括：
- 无效的文件对象
- 不支持的文件类型
- 文件读取失败
- 图片加载失败
- 网络错误