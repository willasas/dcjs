# dcMedia 媒体工具类

`dcMedia` 是一个功能强大的媒体处理工具类，提供了图片加载、媒体流处理、音频视频操作等多种功能。

## 功能特性

- 图片懒加载和渐进式加载
- 媒体流获取（摄像头、麦克风）
- 屏幕共享功能
- 媒体录制
- 音频处理和效果应用
- 视频处理和滤镜应用
- 音频可视化
- 媒体设备管理

## 安装

```javascript
// 浏览器环境直接使用
const media = DC.Media;

// Node.js 环境
const dcMedia = require('../src/utils/dcMedia.js');
```

## 核心方法

### 图片处理方法

#### graduallyLoadImg()
渐进式加载图片，使用 IntersectionObserver 实现懒加载。

**参数：**
- 无

**返回值：**
- 无

**使用示例：**
```javascript
// 为图片添加 data-src 属性
// <img data-src="image.jpg" alt="示例图片">

// 初始化渐进式加载
DC.Media.graduallyLoadImg();
```

#### preloadImage(img)
预加载单个图片并添加淡入效果。

**参数：**
- `img` (HTMLImageElement): 图片元素

**返回值：**
- 无

**使用示例：**
```javascript
const img = document.querySelector('img[data-src]');
DC.Media.preloadImage(img);
```

#### showImages()
显示所有带有 data-src 属性的图片。

**参数：**
- 无

**返回值：**
- 无

**使用示例：**
```javascript
DC.Media.showImages();
```

#### initLazyLoading()
初始化图片懒加载，支持浏览器兼容性处理。

**参数：**
- 无

**返回值：**
- 无

**使用示例：**
```javascript
DC.Media.initLazyLoading();
```

#### loadLazyImage(img)
加载单个懒加载图片。

**参数：**
- `img` (HTMLImageElement): 图片元素

**返回值：**
- 无

**使用示例：**
```javascript
const img = document.querySelector('img[data-src]');
DC.Media.loadLazyImage(img);
```

#### loadAllImages()
加载所有带有 data-src 属性的图片。

**参数：**
- 无

**返回值：**
- 无

**使用示例：**
```javascript
DC.Media.loadAllImages();
```

### 媒体流方法

#### getMediaStream(constraints)
获取用户媒体流（摄像头和/或麦克风）。

**参数：**
- `constraints` (Object): 媒体约束，默认为 `{ video: true, audio: true }`

**返回值：**
- `Promise<MediaStream>`: 媒体流

**使用示例：**
```javascript
// 获取摄像头和麦克风
DC.Media.getMediaStream()
  .then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    document.body.appendChild(video);
  })
  .catch(error => {
    console.error('获取媒体流失败:', error);
  });

// 仅获取摄像头
DC.Media.getMediaStream({ video: true, audio: false });
```

#### getDisplayMedia(options)
获取屏幕共享流。

**参数：**
- `options` (Object): 屏幕共享选项，默认为 `{ video: true }`

**返回值：**
- `Promise<MediaStream>`: 屏幕共享流

**使用示例：**
```javascript
DC.Media.getDisplayMedia()
  .then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    document.body.appendChild(video);
  })
  .catch(error => {
    console.error('获取屏幕共享流失败:', error);
  });
```

#### recordStream(stream, options)
录制媒体流。

**参数：**
- `stream` (MediaStream): 要录制的媒体流
- `options` (Object): 录制选项，默认为 `{ mimeType: 'video/webm;codecs=vp8,opus' }`

**返回值：**
- `Promise<Blob>`: 录制的数据

**使用示例：**
```javascript
DC.Media.getMediaStream()
  .then(stream => {
    const recorder = DC.Media.recordStream(stream);
    
    // 10秒后停止录制
    setTimeout(() => {
      recorder.stop();
    }, 10000);
    
    recorder.then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recording.webm';
      a.click();
    });
  });
```

### 音频处理方法

#### extractAudio(video)
从视频中提取音频流。

**参数：**
- `video` (HTMLVideoElement): 视频元素

**返回值：**
- `MediaStream`: 音频流

**使用示例：**
```javascript
const video = document.querySelector('video');
const audioStream = DC.Media.extractAudio(video);
```

#### adjustVolume(stream, volume)
调整媒体流的音量。

**参数：**
- `stream` (MediaStream): 媒体流
- `volume` (number): 音量值（0-1）

**返回值：**
- `MediaStream`: 调整后的媒体流

**使用示例：**
```javascript
DC.Media.getMediaStream()
  .then(stream => {
    // 调整音量为 50%
    const adjustedStream = DC.Media.adjustVolume(stream, 0.5);
    const audio = document.createElement('audio');
    audio.srcObject = adjustedStream;
    audio.play();
  });
```

#### applyAudioEffect(stream, effectCallback)
应用音频效果。

**参数：**
- `stream` (MediaStream): 媒体流
- `effectCallback` (Function): 效果回调函数

**返回值：**
- `MediaStream`: 处理后的媒体流

**使用示例：**
```javascript
DC.Media.getMediaStream({ audio: true, video: false })
  .then(stream => {
    // 应用回声效果
    const processedStream = DC.Media.applyAudioEffect(stream, (audioContext, source, destination) => {
      const delayNode = audioContext.createDelay(1.0);
      delayNode.delayTime.value = 0.5;
      
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.5;
      
      source.connect(delayNode);
      delayNode.connect(gainNode);
      gainNode.connect(destination);
      source.connect(destination);
    });
    
    const audio = document.createElement('audio');
    audio.srcObject = processedStream;
    audio.play();
  });
```

#### createAudioVisualization(stream, type, canvas)
创建音频可视化效果。

**参数：**
- `stream` (MediaStream): 音频流
- `type` (string): 可视化类型（'waveform' 或 'frequency'）
- `canvas` (HTMLCanvasElement): 画布元素

**返回值：**
- `Function`: 停止可视化的函数

**使用示例：**
```javascript
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 200;
document.body.appendChild(canvas);

DC.Media.getMediaStream({ audio: true, video: false })
  .then(stream => {
    // 创建波形可视化
    const stopVisualization = DC.Media.createAudioVisualization(stream, 'waveform', canvas);
    
    // 5秒后停止
    setTimeout(stopVisualization, 5000);
  });
```

#### mixAudioStreams(streams)
混合多个音频流。

**参数：**
- `streams` (MediaStream[]): 音频流数组

**返回值：**
- `MediaStream`: 混音后的流

**使用示例：**
```javascript
Promise.all([
  DC.Media.getMediaStream({ audio: true, video: false }),
  DC.Media.getMediaStream({ audio: true, video: false })
])
.then(([stream1, stream2]) => {
  const mixedStream = DC.Media.mixAudioStreams([stream1, stream2]);
  const audio = document.createElement('audio');
  audio.srcObject = mixedStream;
  audio.play();
});
```

#### detectAudioLevel(stream, callback)
检测音频音量。

**参数：**
- `stream` (MediaStream): 音频流
- `callback` (Function): 音量回调函数

**返回值：**
- `Function`: 停止检测的函数

**使用示例：**
```javascript
DC.Media.getMediaStream({ audio: true, video: false })
  .then(stream => {
    const stopDetection = DC.Media.detectAudioLevel(stream, volume => {
      console.log('当前音量:', volume);
      // 可以根据音量值做一些视觉反馈
    });
    
    // 10秒后停止
    setTimeout(stopDetection, 10000);
  });
```

### 视频处理方法

#### captureVideoFrame(video)
截取视频帧。

**参数：**
- `video` (HTMLVideoElement): 视频元素

**返回值：**
- `string`: 图片的 Data URL

**使用示例：**
```javascript
const video = document.querySelector('video');
const frame = DC.Media.captureVideoFrame(video);

const img = document.createElement('img');
img.src = frame;
document.body.appendChild(img);
```

#### applyVideoFilter(video, canvas, filterCallback)
应用视频滤镜。

**参数：**
- `video` (HTMLVideoElement): 视频元素
- `canvas` (HTMLCanvasElement): 画布元素
- `filterCallback` (Function): 滤镜回调函数

**返回值：**
- `Function`: 停止滤镜的函数

**使用示例：**
```javascript
const video = document.querySelector('video');
const canvas = document.createElement('canvas');
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
document.body.appendChild(canvas);

// 应用黑白滤镜
const stopFilter = DC.Media.applyVideoFilter(video, canvas, (data) => {
  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = gray;     // 红色
    data[i + 1] = gray; // 绿色
    data[i + 2] = gray; // 蓝色
  }
});

// 5秒后停止
setTimeout(stopFilter, 5000);
```

#### convertVideoFormat(videoBlob, targetFormat)
转换视频格式。

**参数：**
- `videoBlob` (Blob): 视频 Blob
- `targetFormat` (string): 目标格式

**返回值：**
- `Promise<Blob>`: 转换后的视频 Blob

**使用示例：**
```javascript
// 假设有一个视频 Blob
const videoBlob = new Blob([/* 视频数据 */], { type: 'video/webm' });

DC.Media.convertVideoFormat(videoBlob, 'mp4')
  .then(convertedBlob => {
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.mp4';
    a.click();
  });
```

### 设备管理方法

#### getMediaDevices()
获取媒体设备信息。

**参数：**
- 无

**返回值：**
- `Promise<Object>`: 设备信息对象，包含 audioInputs、audioOutputs、videoInputs

**使用示例：**
```javascript
DC.Media.getMediaDevices()
  .then(devices => {
    console.log('音频输入设备:', devices.audioInputs);
    console.log('音频输出设备:', devices.audioOutputs);
    console.log('视频输入设备:', devices.videoInputs);
  });
```

### 媒体保存方法

#### saveMediaStream(stream, filename)
保存媒体流为文件。

**参数：**
- `stream` (MediaStream): 媒体流
- `filename` (string): 文件名

**返回值：**
- `Promise<void>`: Promise 对象

**使用示例：**
```javascript
DC.Media.getMediaStream()
  .then(stream => {
    // 录制并保存
    setTimeout(() => {
      DC.Media.saveMediaStream(stream, 'recording.webm');
    }, 5000);
  });
```

### 实例方法

#### play(url)
播放媒体。

**参数：**
- `url` (string): 媒体文件的 URL

**返回值：**
- 无

**使用示例：**
```javascript
const mediaPlayer = new DC.Media();
mediaPlayer.play('https://example.com/video.mp4');
```

#### stop()
停止媒体播放。

**参数：**
- 无

**返回值：**
- 无

**使用示例：**
```javascript
const mediaPlayer = new DC.Media();
mediaPlayer.play('https://example.com/video.mp4');
// 稍后停止
setTimeout(() => {
  mediaPlayer.stop();
}, 5000);
```

#### isPlaying()
检查媒体是否正在播放。

**参数：**
- 无

**返回值：**
- `boolean`: 如果正在播放，则为 true

**使用示例：**
```javascript
const mediaPlayer = new DC.Media();
mediaPlayer.play('https://example.com/video.mp4');
console.log('是否正在播放:', mediaPlayer.isPlaying());
```

## 浏览器兼容性

- **现代浏览器**: Chrome, Firefox, Safari, Edge 均支持
- **IE 浏览器**: 不支持，需要使用 polyfill
- **IntersectionObserver**: 用于图片懒加载，旧浏览器会自动使用降级方案
- **MediaRecorder**: 用于媒体录制，部分浏览器可能需要前缀
- **AudioContext**: 用于音频处理，部分浏览器可能需要前缀

## 错误处理

所有异步方法都返回 Promise 对象，可通过 catch 捕获错误：

```javascript
DC.Media.getMediaStream()
  .then(stream => {
    // 处理成功
  })
  .catch(error => {
    console.error('错误:', error);
    // 错误处理
  });
```

## 最佳实践

1. **图片懒加载**:
   - 为图片添加 `data-src` 属性，而非 `src` 属性
   - 初始化时调用 `initLazyLoading()`

2. **媒体流处理**:
   - 始终处理获取媒体流可能失败的情况
   - 使用完毕后记得停止媒体流，释放资源

3. **性能优化**:
   - 对于音频可视化，合理设置 `fftSize`
   - 对于视频处理，注意画布大小不要过大

4. **用户体验**:
   - 为媒体操作添加适当的加载状态
   - 提供清晰的错误提示

## 示例应用场景

1. **视频聊天应用**:
   - 使用 `getMediaStream()` 获取摄像头和麦克风
   - 使用 `adjustVolume()` 调整音量
   - 使用 `getMediaDevices()` 选择设备

2. **屏幕录制工具**:
   - 使用 `getDisplayMedia()` 获取屏幕流
   - 使用 `recordStream()` 录制屏幕
   - 使用 `saveMediaStream()` 保存录制内容

3. **音频可视化播放器**:
   - 使用 `extractAudio()` 从视频中提取音频
   - 使用 `createAudioVisualization()` 创建可视化效果

4. **图片画廊**:
   - 使用 `graduallyLoadImg()` 实现图片懒加载
   - 使用 `showImages()` 控制图片显示

## 代码示例

### 完整的图片懒加载实现

```javascript
// HTML 结构
// <img data-src="image1.jpg" alt="图片1">
// <img data-src="image2.jpg" alt="图片2">
// <img data-src="image3.jpg" alt="图片3">

// 初始化
DC.Media.initLazyLoading();

// 滚动到页面底部时显示所有图片
window.addEventListener('scroll', () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    DC.Media.showImages();
  }
});
```

### 完整的媒体录制实现

```javascript
// HTML 结构
// <video id="preview" autoplay></video>
// <button id="start">开始录制</button>
// <button id="stop">停止录制</button>

const video = document.getElementById('preview');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
let stream;
let recorder;

// 获取媒体流
DC.Media.getMediaStream()
  .then(s => {
    stream = s;
    video.srcObject = stream;
  });

// 开始录制
startBtn.addEventListener('click', () => {
  recorder = DC.Media.recordStream(stream);
  console.log('开始录制');
});

// 停止录制
stopBtn.addEventListener('click', () => {
  if (recorder) {
    recorder.then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recording.webm';
      a.click();
      console.log('录制完成');
    });
    stream.getTracks().forEach(track => track.stop());
  }
});
```

## 总结

`dcMedia` 工具类提供了全面的媒体处理功能，从简单的图片加载到复杂的音频视频处理，都能轻松实现。通过合理使用这些方法，可以创建出功能丰富的媒体应用，提升用户体验。

无论是构建视频聊天应用、屏幕录制工具，还是实现图片画廊，`dcMedia` 都能为你提供强大的支持。