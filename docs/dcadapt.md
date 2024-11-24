# DcAdapt 页面适配工具

## 简介
DcAdapt 是一个用于处理页面适配的工具类，支持一屏适配和长页面适配，并提供了 px、rem、vw/vh 三种适配单位的支持。

## 特性

- PC端一屏适配（支持4K、2K屏幕）
- PC端长页面适配
- 移动端竖屏一屏适配
- 移动端横屏一屏适配
- 移动端横竖屏同时适配
- 移动端长页面适配
- 每种场景都提供了三种单位的适配方案：
  - REM适配
  - PX适配
  - VW适配
- 自动检测设备类型
- 响应式适配支持
- 支持浏览器导航栏高度自适应

## 使用方法

- PC端一屏/长页面/移动端长页面测试页（三种单位）
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* 测试样式 */
    .test-container {
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 9999;
    }
    .test-controls {
      margin-bottom: 10px;
    }
    .test-controls button {
      margin: 2px;
      padding: 4px 8px;
    }
    .test-box {
      width: 200px;
      height: 200px;
      background: rgba(255, 0, 0, 0.3);
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="test-container">
    <div class="test-controls">
      <button onclick="switchUnit('rem')">REM</button>
      <button onclick="switchUnit('px')">PX</button>
      <button onclick="switchUnit('vw')">VW</button>
      <button onclick="switchMode('fullscreen')">一屏</button>
      <button onclick="switchMode('longpage')">长页面</button>
    </div>
    <div id="info">
      当前单位：-<br>
      当前模式：-<br>
      设备类型：-<br>
      屏幕尺寸：-<br>
      缩放比例：-
    </div>
  </div>
  
  <div class="test-box">
    200x200 测试框<br>
    点击按钮切换单位和模式
  </div>
<script src="../utils/dcAdapt.js"></script>
  <script>
    // 初始化适配实例
    const adapt = new DcAdapt({
      unit: 'rem',
      mode: 'fullscreen',
      designSize: {
        pc: {
          width: 1920,
          height: 1080,
          fullscreenSizes: [
            { width: 3840, height: 2160 },
            { width: 2560, height: 1440 },
            { width: 1920, height: 1080 }
          ]
        }
      }
    });

    // 切换单位
    function switchUnit(unit) {
      adapt.setUnit(unit);
      updateInfo();
    }

    // 切换模式
    function switchMode(mode) {
      adapt.setMode(mode);
      updateInfo();
    }

    // 更新信息显示
    function updateInfo() {
      const info = document.getElementById('info');
      const html = document.documentElement;
      const currentUnit = adapt.state.currentUnit;
      
      let scale;
      if (currentUnit === 'rem') {
        scale = parseFloat(html.style.fontSize) / 100;
      } else if (currentUnit === 'px') {
        scale = parseFloat(getComputedStyle(html).getPropertyValue('--px-scale'));
      } else {
        scale = parseFloat(getComputedStyle(html).getPropertyValue('--vw-scale'));
      }
      
      info.innerHTML = `
        当前单位：${currentUnit.toUpperCase()}<br>
        当前模式：${adapt.state.currentMode}<br>
        设备类型：${adapt.config.device.isMobile ? '移动端' : 'PC端'}<br>
        屏幕尺寸：${window.innerWidth}x${window.innerHeight}<br>
        缩放比例：${scale ? scale.toFixed(3) : '-'}
      `;
    }

    // 监听屏幕变化
    window.addEventListener('resize', updateInfo);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateInfo, 300);
    });
    updateInfo();
  </script>
</body>
</html>
```

- 移动端一屏测试页（含横屏或竖屏和横竖屏一起的三种单位）
```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    .test-container {
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 9999;
      font-size: 14px;
    }
    .test-controls {
      margin-bottom: 10px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5px;
    }
    .test-controls button {
      margin: 2px;
      padding: 8px 4px;
      font-size: 12px;
    }
    .test-box {
      width: 200px;
      height: 200px;
      background: rgba(255, 0, 0, 0.3);
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 14px;
    }
    .orientation-indicator {
      position: fixed;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="test-container">
    <div class="test-controls">
      <button onclick="switchUnit('rem')">REM</button>
      <button onclick="switchUnit('px')">PX</button>
      <button onclick="switchUnit('vw')">VW</button>
      <button onclick="switchMode('portrait')">仅竖屏</button>
      <button onclick="switchMode('landscape')">仅横屏</button>
      <button onclick="switchMode('dual')">横竖屏</button>
    </div>
    <div id="info">
      当前单位：-<br>
      当前模式：-<br>
      屏幕方向：-<br>
      屏幕尺寸：-<br>
      缩放比例：-
    </div>
  </div>
  
  <div class="test-box">
    200x200 测试框<br>
    <small>点击按钮切换模式</small>
  </div>

  <div class="orientation-indicator" id="orientationInfo">
    当前方向：竖屏
  </div>
  <script src="../utils/dcAdapt.js"></script>
  <script>
    // 适配实例配置
    const configs = {
      portrait: {
        mobile: {
          width: 750,
          height: 1624
        }
      },
      landscape: {
        mobile: {
          width: 1624,
          height: 750
        }
      },
      dual: {
        mobile: {
          width: 750,
          height: 1624,
          fullscreenSizes: [
            { width: 750, height: 1624 },
            { width: 1624, height: 750 }
          ]
        }
      }
    };

    // 当前实例
    let adapt = createAdapt('dual');

    // 创建适配实例
    function createAdapt(mode) {
      return new DcAdapt({
        unit: 'rem',
        mode: 'fullscreen',
        designSize: {
          mobile: configs[mode].mobile
        }
      });
    }

    // 切换单位
    function switchUnit(unit) {
      adapt.setUnit(unit);
      updateInfo();
    }

    // 切换模式
    function switchMode(mode) {
      // 销毁当前实例
      adapt.destroy();
      // 创建新实例
      adapt = createAdapt(mode);
      updateInfo();
    }

    // 更新信息显示
    function updateInfo() {
      const info = document.getElementById('info');
      const orientationInfo = document.getElementById('orientationInfo');
      const html = document.documentElement;
      const currentUnit = adapt.state.currentUnit;
      
      let scale;
      if (currentUnit === 'rem') {
        scale = parseFloat(html.style.fontSize) / 100;
      } else if (currentUnit === 'px') {
        scale = parseFloat(getComputedStyle(html).getPropertyValue('--px-scale'));
      } else {
        scale = parseFloat(getComputedStyle(html).getPropertyValue('--vw-scale'));
      }
      
      const orientation = adapt.state.orientation;
      
      info.innerHTML = `
        当前单位：${currentUnit.toUpperCase()}<br>
        当前模式：${adapt.state.currentMode}<br>
        屏幕方向：${orientation === 'portrait' ? '竖屏' : '横屏'}<br>
        屏幕尺寸：${window.innerWidth}x${window.innerHeight}<br>
        缩放比例：${scale ? scale.toFixed(3) : '-'}
      `;
      
      orientationInfo.textContent = `当前方向：${orientation === 'portrait' ? '竖屏' : '横屏'}`;
    }

    // 监听屏幕变化
    window.addEventListener('resize', updateInfo);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateInfo, 300);
    });
    updateInfo();
  </script>
</body>
</html>
```

```scss
// REM单位示例
.rem-example {
  // 假设设计稿是1920px宽度，我们设置基准fontSize为100px
  // 则1rem = 100px，所以设计稿中的100px就是1rem
  width: 2rem;     // 相当于设计稿中的200px
  height: 1rem;    // 相当于设计稿中的100px
  margin: 0.5rem;  // 相当于设计稿中的50px
  font-size: 0.16rem; // 相当于设计稿中的16px
}

// VW单位示例
.vw-element {
  // 使用vw作为单位
  width: calc(200 * var(--vw-base)); // 200是设计稿上的像素值
  height: calc(100 * var(--vh-base));
  
  // 或者使用缩放比例
  font-size: calc(16px * var(--vw-scale) / 100);
  margin: calc(20px * var(--vw-scale) / 100);
  
  // 混合使用
  padding: calc(10 * var(--vw-base));
  border-radius: calc(4px * var(--vw-scale) / 100);
}

// vw横屏适配
@media screen and (orientation: landscape) {
  .vw-element {
    // 自动使用旋转后的基准单位
    width: calc(200 * var(--vw-base));
    height: calc(100 * var(--vh-base));
  }
}

// PX单位示例
.px-example {
  width: calc(200px * var(--px-scale));
  height: calc(100px * var(--px-scale));
  margin: calc(50px * var(--px-scale));
  font-size: calc(16px * var(--px-scale));
}

// 长页面布局示例
.longpage-layout {
  // 容器宽度
  .container {
    width: 100%;
    max-width: calc(1920px * var(--px-scale)); // PX适配
    // 或
    max-width: 19.2rem; // REM适配
    // 或
    max-width: calc(1920 * var(--vw-scale)); // VW适配
    margin: 0 auto;
  }
}
```

```js
// 基础使用示例
const adapt = new DcAdapt({
  unit: 'px', // 可选：'px', 'rem', 'vw'
  mode: 'fullscreen', // 可选：'fullscreen', 'longpage'
  designSize: {
    pc: {
      width: 1920,
      height: 1080
    },
    mobile: {
      width: 750,
      height: 1624
    }
  }
});

// =============== PC端示例 ===============

// 1. PC端一屏适配示例
// REM适配
const pcFullscreenRem = new DcAdapt({
  unit: 'rem',
  mode: 'fullscreen',
  designSize: {
    pc: {
      width: 1920,
      height: 1080,
      fullscreenSizes: [
        { width: 3840, height: 2160 },
        { width: 2560, height: 1440 },
        { width: 1920, height: 1080 }
      ]
    }
  }
});

// PX适配
const pcFullscreenPx = new DcAdapt({
  unit: 'px',
  mode: 'fullscreen',
  designSize: {
    pc: {
      width: 1920,
      height: 1080,
      fullscreenSizes: [
        { width: 3840, height: 2160 },
        { width: 2560, height: 1440 },
        { width: 1920, height: 1080 }
      ]
    }
  }
});

// VW适配
const pcFullscreenVw = new DcAdapt({
  unit: 'vw',
  mode: 'fullscreen',
  designSize: {
    pc: {
      width: 1920,
      height: 1080,
      fullscreenSizes: [
        { width: 3840, height: 2160 },
        { width: 2560, height: 1440 },
        { width: 1920, height: 1080 }
      ]
    }
  }
});

// 2. PC端长页面适配示例
// REM适配
const pcLongpageRem = new DcAdapt({
  unit: 'rem',
  mode: 'longpage',
  designSize: {
    pc: {
      width: 1920,
      height: 1080 // 长页面模式下高度不影响适配
    }
  }
});

// PX适配
const pcLongpagePx = new DcAdapt({
  unit: 'px',
  mode: 'longpage',
  designSize: {
    pc: {
      width: 1920,
      height: 1080
    }
  }
});

// VW适配
const pcLongpageVw = new DcAdapt({
  unit: 'vw',
  mode: 'longpage',
  designSize: {
    pc: {
      width: 1920,
      height: 1080
    }
  }
});

// =============== 移动端示例 ===============

// 1. 移动端竖屏一屏适配示例
// REM适配
const mobilePortraitRem = new DcAdapt({
  unit: 'rem',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624
    }
  }
});

// PX适配
const mobilePortraitPx = new DcAdapt({
  unit: 'px',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624
    }
  }
});

// VW适配
const mobilePortraitVw = new DcAdapt({
  unit: 'vw',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624
    }
  }
});

// 2. 移动端横屏一屏适配示例
// REM适配
const mobileLandscapeRem = new DcAdapt({
  unit: 'rem',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 1624,
      height: 750
    }
  }
});

// PX适配
const mobileLandscapePx = new DcAdapt({
  unit: 'px',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 1624,
      height: 750
    }
  }
});

// VW适配
const mobileLandscapeVw = new DcAdapt({
  unit: 'vw',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 1624,
      height: 750
    }
  }
});

// 3. 移动端横竖屏同时适配示例
// REM适配
const mobileDualOrientationRem = new DcAdapt({
  unit: 'rem',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
      fullscreenSizes: [
        { width: 750, height: 1624 },  // 竖屏设计尺寸
        { width: 1624, height: 750 }   // 横屏设计尺寸
      ]
    }
  }
});

// PX适配
const mobileDualOrientationPx = new DcAdapt({
  unit: 'px',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
      fullscreenSizes: [
        { width: 750, height: 1624 },  // 竖屏设计尺寸
        { width: 1624, height: 750 }   // 横屏设计尺寸
      ]
    }
  }
});

// VW适配
const mobileDualOrientationVw = new DcAdapt({
  unit: 'vw',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
      fullscreenSizes: [
        { width: 750, height: 1624 },  // 竖屏设计尺寸
        { width: 1624, height: 750 }   // 横屏设计尺寸
      ]
    }
  }
});

// 4. 移动端长页面适配示例
// REM适配
const mobileLongpageRem = new DcAdapt({
  unit: 'rem',
  mode: 'longpage',
  designSize: {
    mobile: {
      width: 750,
      height: 1624 // 长页面模式下高度不影响适配
    }
  }
});

// PX适配
const mobileLongpagePx = new DcAdapt({
  unit: 'px',
  mode: 'longpage',
  designSize: {
    mobile: {
      width: 750,
      height: 1624
    }
  }
});

// VW适配
const mobileLongpageVw = new DcAdapt({
  unit: 'vw',
  mode: 'longpage',
  designSize: {
    mobile: {
      width: 750,
      height: 1624
    }
  }
});
```

## API 方法

#### setUnit(unit)

- 设置适配单位

```js
adapt.setUnit('rem'); // 'px', 'rem', 'vw'
```

#### setMode(mode)

- 设置适配模式

```js
adapt.setMode('longpage'); // 'fullscreen', 'longpage'
```

#### setDesignSize(type, size)

- 设置设计稿尺寸

```js
adapt.setDesignSize('pc', { width: 1920, height: 1080 });
```

#### destroy()

- 销毁实例，移除事件监听

```js
adapt.destroy();
```

## 注意

1. 确保在页面初始化时创建 DcAdapt 实例
2. 根据实际需求选择合适的适配单位和模式
3. 注意设计稿尺寸的正确配置
4. 考虑浏览器导航栏高度的影响
5. PC端一屏适配时，建议配置 fullscreenSizes 以支持不同分辨率
6. 移动端横竖屏同时适配时，必须配置 fullscreenSizes
7. 长页面模式下，height 配置不影响适配计算
8. 不同单位的CSS写法略有不同，需要按照示例使用对应的变量