# DcAdapt 页面适配工具类文档

## 1. 简介

DcAdapt 是一个功能强大的页面适配工具类，专门设计用于处理 PC 端和移动端的页面自适配问题。它支持多种适配单位和适配模式，能够根据不同设备类型和屏幕尺寸自动调整页面布局，确保页面在各种设备上都能呈现最佳效果。

### 主要功能
- 支持多种适配单位：px（像素）、rem（相对单位）、vw（视口宽度）
- 支持两种适配模式：全屏适配（fullscreen）和长页面适配（longpage）
- 自动检测设备类型（桌面、移动、平板）和屏幕方向（横屏、竖屏）
- 提供单位转换功能，方便在不同单位间进行换算
- 响应式调整，支持窗口大小变化和屏幕方向切换
- 自定义设计尺寸配置，满足不同项目需求
- 防抖处理，优化窗口 resize 等高频事件的性能

## 2. 安装和使用

### 2.1 直接引入

```html
<script src="path/to/dcadapt.js"></script>
<script>
  // 初始化适配
  const adapt = new DC.adapt({
    unit: 'rem',
    mode: 'fullscreen'
  });
</script>
```

### 2.2 模块化引入

```javascript
// ES6 模块引入
import DcAdapt from './path/to/dcadapt.js';

// CommonJS 模块引入
const DcAdapt = require('./path/to/dcadapt.js');

// 初始化适配
const adapt = new DcAdapt({
  unit: 'vw',
  mode: 'longpage'
});
```

## 3. API 参考

### 3.1 构造函数

```javascript
new DcAdapt(options)
```

#### 参数
- `options` (Object, 可选): 配置选项
  - `unit` (string, 可选): 适配单位，可选值：'px'|'rem'|'vw'，默认值：'px'
  - `mode` (string, 可选): 适配模式，可选值：'fullscreen'|'longpage'，默认值：'fullscreen'
  - `designSize` (Object, 可选): 设计尺寸配置
    - `pc` (Object, 可选): PC端设计尺寸
      - `width` (number, 可选): PC端设计宽度，默认值：1920
      - `height` (number, 可选): PC端设计高度，默认值：1080
      - `fullscreenSizes` (Array<{width:number,height:number}>, 可选): PC端支持的屏幕尺寸列表
    - `mobile` (Object, 可选): 移动端设计尺寸
      - `width` (number, 可选): 移动端设计宽度，默认值：750
      - `height` (number, 可选): 移动端设计高度，默认值：1624
      - `fullscreenSizes` (Array<{width:number,height:number}>, 可选): 移动端支持的屏幕尺寸列表

### 3.2 核心方法

#### `adapt()`
- **描述**：执行适配操作，根据当前配置和状态调整页面
- **参数**：无
- **返回值**：无

#### `setUnit(unit)`
- **描述**：设置适配单位并重新适配
- **参数**：
  - `unit` (string): 目标单位，可选值：'px'|'rem'|'vw'
- **返回值**：无

#### `setMode(mode)`
- **描述**：设置适配模式并重新适配
- **参数**：
  - `mode` (string): 目标模式，可选值：'fullscreen'|'longpage'
- **返回值**：无

#### `setDesignSize(type, size)`
- **描述**：更新指定设备类型的设计尺寸配置
- **参数**：
  - `type` (string): 设备类型，可选值：'pc'|'mobile'
  - `size` (Object): 新的设计尺寸配置
    - `width` (number): 设计宽度
    - `height` (number): 设计高度
    - `fullscreenSizes` (Array<{width:number,height:number}>, 可选): 支持的屏幕尺寸列表
- **返回值**：无

#### `destroy()`
- **描述**：销毁适配实例，清理事件监听和样式设置
- **参数**：无
- **返回值**：无

### 3.3 辅助方法

#### `getScreenOrientation()`
- **描述**：获取当前屏幕方向
- **参数**：无
- **返回值**：('portrait'|'landscape'): 屏幕方向，'portrait'为竖屏，'landscape'为横屏

#### `getViewportHeight()`
- **描述**：获取视口高度（考虑浏览器导航栏）
- **参数**：无
- **返回值**：(number): 视口高度（像素）

#### `getBrowserNavHeight()`
- **描述**：获取浏览器导航栏高度
- **参数**：无
- **返回值**：(number): 浏览器导航栏高度（像素）

#### `convertUnits(value, fromUnit, toUnit, designConfig)`
- **描述**：在不同单位间转换值
- **参数**：
  - `value` (number): 需要转换的值
  - `fromUnit` (string): 源单位，可选值：'px'|'rem'|'vw'
  - `toUnit` (string): 目标单位，可选值：'px'|'rem'|'vw'
  - `designConfig` (Object): 设计尺寸配置
- **返回值**：(string): 转换后的值（保留6位小数）

#### `getTargetDesignSize(designConfig)`
- **描述**：根据当前视口尺寸选择最合适的设计尺寸
- **参数**：
  - `designConfig` (Object): 设计尺寸配置
- **返回值**：(Object): 目标设计尺寸对象

### 3.4 单位转换便捷方法

#### `convertPxToRem(value)`
- **描述**：将 px 值转换为 rem 值
- **参数**：
  - `value` (number): px 值
- **返回值**：(string): rem 值（保留6位小数）

#### `convertPxToVw(value)`
- **描述**：将 px 值转换为 vw 值
- **参数**：
  - `value` (number): px 值
- **返回值**：(string): vw 值（保留6位小数）

#### `convertRemToPx(value)`
- **描述**：将 rem 值转换为 px 值
- **参数**：
  - `value` (number): rem 值
- **返回值**：(string): px 值（保留6位小数）

#### `convertRemToVw(value)`
- **描述**：将 rem 值转换为 vw 值
- **参数**：
  - `value` (number): rem 值
- **返回值**：(string): vw 值（保留6位小数）

#### `convertVwToPx(value)`
- **描述**：将 vw 值转换为 px 值
- **参数**：
  - `value` (number): vw 值
- **返回值**：(string): px 值（保留6位小数）

#### `convertVwToRem(value)`
- **描述**：将 vw 值转换为 rem 值
- **参数**：
  - `value` (number): vw 值
- **返回值**：(string): rem 值（保留6位小数）

#### `getValueInCurrentUnit(value, fromUnit)`
- **描述**：将指定单位的值转换为当前使用的单位
- **参数**：
  - `value` (number): 需要转换的值
  - `fromUnit` (string): 源单位，可选值：'px'|'rem'|'vw'
- **返回值**：(string): 转换后的值（保留6位小数）

## 4. 配置选项

### 4.1 默认配置

```javascript
{
  unit: 'px', // 默认使用px单位
  mode: 'fullscreen', // 默认全屏适配
  device: { // 自动检测设备类型
    isMobile: false,
    isTablet: false,
    isDesktop: true
  },
  designSize: {
    pc: {
      width: 1920,
      height: 1080,
      fullscreenSizes: [
        { width: 3840, height: 2160 },
        { width: 2560, height: 1440 },
        { width: 1920, height: 1080 }
      ]
    },
    mobile: {
      width: 750,
      height: 1624,
      fullscreenSizes: [
        { width: 750, height: 1624 }, // 竖屏
        { width: 1624, height: 750 } // 横屏
      ]
    }
  }
}
```

### 4.2 自定义配置示例

```javascript
const adapt = new DC.adapt({
  unit: 'rem',
  mode: 'fullscreen',
  designSize: {
    pc: {
      width: 1366,
      height: 768,
      fullscreenSizes: [
        { width: 1366, height: 768 },
        { width: 1024, height: 768 }
      ]
    },
    mobile: {
      width: 375,
      height: 812,
      fullscreenSizes: [
        { width: 375, height: 812 },
        { width: 812, height: 375 }
      ]
    }
  }
});
```

## 5. 使用示例

### 5.1 基本适配示例

```javascript
// 初始化全屏适配（rem单位）
const adapt = new DC.adapt({
  unit: 'rem',
  mode: 'fullscreen'
});

// 更新适配配置
adapt.setUnit('vw'); // 切换到vw单位
adapt.setMode('longpage'); // 切换到长页面模式

// 自定义设计尺寸
adapt.setDesignSize('pc', {
  width: 1600,
  height: 900
});

// 手动触发适配
adapt.adapt();

// 销毁适配
// adapt.destroy();
```

### 5.2 响应式适配示例

```javascript
// 初始化适配
const adapt = new DC.adapt({
  unit: 'rem',
  mode: 'fullscreen'
});

// 监听窗口大小变化
window.addEventListener('resize', function() {
  // DcAdapt 内部已经做了防抖处理
  // 这里可以添加其他需要响应的逻辑
  console.log('窗口大小变化，已自动适配');
});

// 监听屏幕方向变化
window.addEventListener('orientationchange', function() {
  console.log('屏幕方向变化，已自动适配');
});
```

### 5.3 单位转换示例

```javascript
// 初始化适配
const adapt = new DC.adapt();

// 单位转换
const pxToRem = adapt.convertPxToRem(100);
console.log('100px = ' + pxToRem + 'rem');

const remToVw = adapt.convertRemToVw(1);
console.log('1rem = ' + remToVw + 'vw');

const vwToPx = adapt.convertVwToPx(10);
console.log('10vw = ' + vwToPx + 'px');
```

### 5.4 设备信息获取示例

```javascript
// 初始化适配
const adapt = new DC.adapt();

// 获取设备信息
const deviceInfo = adapt.config.device;
console.log('设备类型:', {
  desktop: deviceInfo.isDesktop,
  mobile: deviceInfo.isMobile,
  tablet: deviceInfo.isTablet
});

// 获取屏幕方向
const orientation = adapt.getScreenOrientation();
console.log('屏幕方向:', orientation);

// 获取视口高度
const viewportHeight = adapt.getViewportHeight();
console.log('视口高度:', viewportHeight + 'px');

// 获取浏览器导航栏高度
const navHeight = adapt.getBrowserNavHeight();
console.log('导航栏高度:', navHeight + 'px');
```

## 6. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ 完全支持 |
| Firefox | ✅ 完全支持 |
| Safari | ✅ 完全支持 |
| Edge | ✅ 完全支持 |
| IE 11 | ❌ 不支持 |
| iOS Safari | ✅ 完全支持 |
| Android Chrome | ✅ 完全支持 |

## 7. 注意事项

1. **性能优化**：DcAdapt 内部已经对窗口 resize 事件做了防抖处理，无需再手动添加防抖

2. **单位选择建议**：
   - `px`：适合固定尺寸的页面，兼容性最好
   - `rem`：适合需要自适应不同屏幕尺寸的页面，推荐使用
   - `vw`：适合现代浏览器，实现真正的响应式布局

3. **适配模式选择**：
   - `fullscreen`：适合全屏展示的页面，如登录页、活动页
   - `longpage`：适合内容较长的页面，如文章页、列表页

4. **设计尺寸配置**：
   - 建议根据实际设计稿尺寸配置 `designSize`
   - 对于移动端，建议同时配置竖屏和横屏尺寸

5. **内存管理**：
   - 在不需要适配时，应调用 `destroy()` 方法清理实例，避免内存泄漏
   - 特别是在单页应用中，页面切换时应销毁旧的适配实例

6. **CSS 变量**：
   - DcAdapt 会设置一些 CSS 变量，可在样式中直接使用：
     - `--client-width`：视口宽度
     - `--client-height`：视口高度
     - `--px-scale`：px 缩放比例
     - `--rem-scale`：rem 缩放比例
     - `--vw-scale`：vw 缩放比例

7. **调试建议**：
   - 可通过浏览器开发者工具查看控制台输出的适配信息
   - 调整窗口大小或旋转设备，观察适配效果

## 8. 常见问题

### 8.1 适配不生效

**可能原因**：
- 未正确初始化 DcAdapt 实例
- 初始化时配置参数有误
- 页面元素样式冲突

**解决方案**：
- 检查 DcAdapt 实例是否正确创建
- 验证配置参数是否符合要求
- 检查页面 CSS 是否有固定宽度/高度限制

### 8.2 单位转换结果不准确

**可能原因**：
- 设计尺寸配置与实际不符
- 设备类型检测错误
- 屏幕方向与设计方向不一致

**解决方案**：
- 确保设计尺寸配置正确
- 检查设备类型检测结果
- 同时配置竖屏和横屏设计尺寸

### 8.3 窗口 resize 时性能不佳

**可能原因**：
- 页面元素过多
- 其他脚本也在监听 resize 事件
- 复杂的计算逻辑

**解决方案**：
- 优化页面结构，减少不必要的元素
- 合并 resize 事件监听器
- 使用 CSS 硬件加速，如 transform: translateZ(0)

## 9. 代码示例

### 9.1 完整使用示例

```javascript
// 初始化适配
const adapt = new DC.adapt({
  unit: 'rem',
  mode: 'fullscreen',
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

// 监听页面加载完成
window.addEventListener('load', function() {
  console.log('页面加载完成，开始适配');
  adapt.adapt();
});

// 页面切换时销毁适配
function onPageChange() {
  adapt.destroy();
  console.log('适配已销毁');
}

// 示例：响应式导航栏
function updateNavbar() {
  const viewportHeight = adapt.getViewportHeight();
  const nav = document.getElementById('navbar');

  if (viewportHeight < 600) {
    nav.classList.add('compact');
  } else {
    nav.classList.remove('compact');
  }
}

// 监听窗口变化
window.addEventListener('resize', updateNavbar);
```

### 9.2 多设备适配示例

```javascript
// 检测设备类型并初始化适配
function initAdaptByDevice() {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  const config = {
    unit: isMobile ? 'rem' : 'vw',
    mode: 'fullscreen',
    designSize: isMobile ? {
      // 移动端配置
      pc: {
        width: 1920,
        height: 1080
      },
      mobile: {
        width: 375,
        height: 812,
        fullscreenSizes: [
          { width: 375, height: 812 },
          { width: 812, height: 375 }
        ]
      }
    } : {
      // PC端配置
      pc: {
        width: 1920,
        height: 1080,
        fullscreenSizes: [
          { width: 1920, height: 1080 },
          { width: 1366, height: 768 }
        ]
      },
      mobile: {
        width: 750,
        height: 1624
      }
    }
  };

  return new DC.adapt(config);
}

// 初始化适配
const adapt = initAdaptByDevice();
console.log('根据设备类型初始化适配完成');
```

## 10. 总结

DcAdapt 是一个功能全面、灵活易用的页面适配工具类，它通过提供多种适配单位和适配模式，满足了不同项目的需求。无论是全屏展示的活动页，还是内容丰富的长页面，DcAdapt 都能轻松应对。

通过自动检测设备类型和屏幕方向，结合自定义设计尺寸配置，DcAdapt 能够在各种设备上实现精准的页面适配。同时，它还提供了丰富的单位转换方法和辅助函数，方便开发者在不同场景下使用。

在性能方面，DcAdapt 通过防抖处理和优化的计算逻辑，确保了在窗口 resize 等高频事件下的流畅运行。而 CSS 变量的使用，也为开发者提供了更多的样式控制能力。

总之，DcAdapt 是一个值得信赖的页面适配解决方案，它能够帮助开发者快速实现响应式布局，提升用户体验，减少适配工作的复杂度。