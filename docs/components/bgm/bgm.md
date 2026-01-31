# BGM 组件使用说明

## 简介

BGM 组件包含两个主要部分：
- **DControlSound**：用于控制页面上的音频播放，支持多个音频的管理、音量控制和事件绑定
- **DCSampleBGM**：用于创建美观的背景音乐播放器，支持随机播放、旋转动画和波浪线动画效果

## 安装与引入

### 直接引入

```html
<!-- 引入音频控制组件 -->
<script src="../../src/components/bgm/dcontrolsound.js"></script>

<!-- 引入示例 BGM 播放器组件 -->
<script src="../../src/components/bgm/dcsamplebgm.js"></script>
```

### 模块引入

```javascript
// 引入音频控制组件
const DControlSound = require('../../src/components/bgm/dcontrolsound.js');

// 引入示例 BGM 播放器组件
const DCSampleBGM = require('../../src/components/bgm/dcsamplebgm.js');
```

## 基本使用

### 1. 音频控制组件 (DControlSound)

#### 创建音频控制实例

```javascript
const controlSound = new DC.ControlSound({
    // BGM 元素和 URL 的映射关系
    bgmUrls: {
        '#audio-bgm1': './bgm/bgm1.mp3',
        '#audio-bgm2': './bgm/bgm2.mp3',
        '#audio-bgm3': './bgm/bgm3.mp3'
    },
    // 按钮与音频 ID 的映射关系
    buttonMap: {
        '.btn-play-bgm1': '#audio-bgm1',
        '.btn-play-bgm2': '#audio-bgm2',
        '.btn-play-bgm3': '#audio-bgm3'
    },
    // 默认音量
    defaultVolume: 0.3
});
```

#### 控制音频播放

```javascript
// 播放指定音频
controlSound.playAudio('#audio-bgm1');

// 暂停指定音频
controlSound.pauseAudio('#audio-bgm1');

// 播放所有 BGM
controlSound.playAllBgms();

// 设置音频音量
controlSound.setVolumeById('#audio-bgm1', 0.7);

// 模拟用户交互（用于自动播放）
controlSound.simulateUserInteraction();
```

### 2. 示例 BGM 播放器组件 (DCSampleBGM)

#### 创建 BGM 播放器实例

```javascript
// 单个 BGM
const bgmPlayer1 = new DC.SampleBGM(
    'bgm-audio',      // 音频元素 ID
    'bgm-btn',        // 按钮元素 ID
    'bgm-icon',       // 图标元素 ID
    './bgm/bgm1.mp3'  // BGM 文件路径
);

// 多个 BGM 随机播放
const bgmPlayer2 = new DC.SampleBGM(
    'bgm-audio',                // 音频元素 ID
    'bgm-btn',                  // 按钮元素 ID
    'bgm-icon',                 // 图标元素 ID
    ['./bgm/bgm1.mp3', './bgm/bgm2.mp3'],  // BGM 文件路径数组
    '#container'                // 容器元素选择器
);
```

#### 控制 BGM 播放器

```javascript
// 播放/暂停音乐
bgmPlayer2.play();

// 暂停音乐
bgmPlayer2.pause();
```

## API 参考

### DControlSound

#### 构造函数

```javascript
new DC.ControlSound(options)
```

- **options**：配置对象
  - **bgmUrls**：BGM 元素和 URL 的映射对象，键为选择器，值为 URL
  - **buttonMap**：按钮与音频 ID 的映射对象，键为按钮选择器，值为音频选择器
  - **defaultVolume**：默认音量，默认为 0.3

#### 方法

- **playAudio(audio)**：播放指定音频
  - **audio**：音频的 ID 或音频元素

- **pauseAudio(audio)**：暂停指定音频
  - **audio**：音频的 ID 或音频元素

- **playAllBgms()**：播放所有 BGM

- **setVolumeById(voiceId, volume)**：设置指定 ID 的音频音量
  - **voiceId**：音频的 ID
  - **volume**：音量大小，范围 0-1

- **simulateUserInteraction()**：模拟用户交互，用于自动播放

### DCSampleBGM

#### 构造函数

```javascript
new DC.SampleBGM(bgmAudioId, bgmBtnId, bgmIconId, bgmList, container)
```

- **bgmAudioId**：背景音乐音频元素的 ID
- **bgmBtnId**：背景音乐按钮元素的 ID
- **bgmIconId**：背景音乐图标元素的 ID
- **bgmList**：背景音乐文件路径列表，可以是一个字符串或字符串数组
- **container**：播放器将被附加到的容器，可以是一个 HTMLElement 或一个 CSS 选择器字符串，默认为 document.body

#### 方法

- **play()**：播放/暂停音乐

- **pause()**：暂停音乐

- **playMusic(musicSources)**：播放音乐
  - **musicSources**：音乐源数组

## 样式说明

### DControlSound 样式

- 该组件不自带样式，需要用户自定义

### DCSampleBGM 样式

- 响应式设计，适配桌面和移动设备
- 圆形播放按钮，带有旋转动画
- 音乐波浪线动画效果
- 简洁美观的布局

## 示例

完整的示例代码请参考 `examples/components/bgm/index.html` 文件。

## 浏览器兼容性

- Chrome
- Firefox
- Safari
- Edge

## 常见问题

### 1. 音频无法自动播放

**原因**：现代浏览器限制了自动播放策略，需要用户交互后才能播放音频。

**解决方案**：
- 使用 `simulateUserInteraction()` 方法模拟用户交互
- 在用户点击事件中播放音频
- 使用 `buttonMap` 配置自动绑定按钮点击事件

### 2. 音频播放失败

**可能原因**：
- 文件路径错误
- 音频格式不支持
- 浏览器权限限制

**解决方案**：
- 检查音频文件路径是否正确
- 使用浏览器支持的音频格式（如 MP3、WAV）
- 确保网站在安全上下文（HTTPS）中运行

### 3. 音量控制不生效

**解决方案**：
- 确保音频元素已正确初始化
- 检查音量值是否在 0-1 范围内
- 验证音频元素是否被正确引用

## 性能优化

1. **预加载音频**：组件会自动设置 `preload='auto'` 来预加载音频
2. **批量管理**：使用 `bgmUrls` 一次性配置多个音频
3. **事件委托**：使用 `buttonMap` 自动绑定按钮事件，减少手动事件绑定
4. **页面可见性**：DControlSound 会监听页面可见性变化，在页面不可见时暂停音频

## 自定义样式

如果需要自定义 DCSampleBGM 的样式，可以：

1. 修改组件内部的 `addStyles` 方法中的样式定义
2. 在组件初始化后添加自定义 CSS 规则覆盖默认样式
3. 通过 CSS 变量来控制样式参数