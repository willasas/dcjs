# SimpleAdapt 工具类文档

## 1. 工具类介绍

`SimpleAdapt` 是一个简单的页面适配工具，用于实现响应式布局，支持 rem 和 vw 两种适配方案。该工具类可以根据设计尺寸和窗口大小自动计算缩放比例，设置 CSS 变量，并在窗口大小改变时自动调整布局。

## 2. 安装和引入

### 2.1 直接引入

```html
<script src="path/to/sampleadapt.js"></script>
```

### 2.2 ES6 模块引入

```javascript
import SimpleAdapt from 'path/to/sampleadapt.js';
```

### 2.3 CommonJS 引入

```javascript
const SimpleAdapt = require('path/to/sampleadapt.js');
```

## 3. API 参考

### 3.1 构造函数

```javascript
const simpleAdapt = new SimpleAdapt(options);
```

**参数**：
- `options` (Object): 配置选项
  - `unit` (String): 适配单位，可选 'rem' 或 'vw'，默认为 'rem'
  - `rootFontSize` (Number): 基准字体大小，默认为 100
  - `designSize` (Object): 设计尺寸配置
    - `sizes` (Array): 支持的设计尺寸列表，每个尺寸包含 width 和 height 属性

**默认配置**：

```javascript
{
  unit: 'rem',
  rootFontSize: 100,
  designSize: {
    sizes: [
      { width: 3840, height: 2160 }, // 4K
      { width: 2560, height: 1440 }, // 2K
      { width: 1920, height: 1080 }, // PC
      { width: 750, height: 1624 }, // Mobile
    ],
  },
}
```

### 3.2 方法

#### 3.2.1 adapt()

执行适配处理，根据当前窗口大小计算并应用缩放比例。

#### 3.2.2 setUnit(unit)

切换适配单位。

**参数**：
- `unit` (String): 适配单位，可选 'rem' 或 'vw'

#### 3.2.3 setDesignSizes(sizes)

设置新的设计尺寸列表。

**参数**：
- `sizes` (Array): 设计尺寸列表，每个尺寸包含 width 和 height 属性

#### 3.2.4 destroy()

销毁适配实例，移除事件监听器并重置样式。

#### 3.2.5 px2rem(px)

将 px 转换为 rem。

**参数**：
- `px` (Number): 像素值

**返回值**：
- (String): 转换后的 rem 值

#### 3.2.6 px2vw(px)

将 px 转换为 vw。

**参数**：
- `px` (Number): 像素值

**返回值**：
- (String): 转换后的 vw 值

#### 3.2.7 px2vh(px)

将 px 转换为 vh。

**参数**：
- `px` (Number): 像素值

**返回值**：
- (String): 转换后的 vh 值

## 4. CSS 变量

SimpleAdapt 会在文档根元素上设置以下 CSS 变量，方便在样式中使用：

| 变量名 | 描述 | 示例值 |
|--------|------|--------|
| `--scale` | 缩放比例 | 1 |
| `--design-width` | 设计宽度 | 1920px |
| `--design-height` | 设计高度 | 1080px |
| `--window-width` | 窗口宽度 | 1920px |
| `--window-height` | 窗口高度 | 1080px |
| `--vw` | 1vw 对应的像素值 | 0.0520833333vw |
| `--vh` | 1vh 对应的像素值 | 0.0925925926vh |
| `--rem-base` | 基准字体大小 | 100px |

## 5. 使用示例

### 5.1 基本使用

```javascript
// 初始化 SimpleAdapt
const simpleAdapt = new SimpleAdapt({
  unit: 'rem',
  rootFontSize: 100,
  designSize: {
    sizes: [
      { width: 1920, height: 1080 }, // PC端设计尺寸
      { width: 750, height: 1624 }, // 移动端设计尺寸
    ],
  },
});

// 手动执行适配
simpleAdapt.adapt();

// 切换适配单位
simpleAdapt.setUnit('vw');

// 设置新的设计尺寸
simpleAdapt.setDesignSizes([
  { width: 3840, height: 2160 }, // 4K 设计尺寸
  { width: 1920, height: 1080 }, // PC 设计尺寸
]);

// 销毁适配实例
simpleAdapt.destroy();
```

### 5.2 单位转换

```javascript
// 初始化 SimpleAdapt
const simpleAdapt = new SimpleAdapt();

// px 转 rem
const remValue = simpleAdapt.px2rem(200); // 输出: "2rem"

// px 转 vw
const vwValue = simpleAdapt.px2vw(100); // 输出: "5.2083333333vw" (基于 1920px 设计宽度)

// px 转 vh
const vhValue = simpleAdapt.px2vh(100); // 输出: "9.2592592593vh" (基于 1080px 设计高度)
```

### 5.3 CSS 使用示例

```css
/* 使用 rem 单位 */
.element {
  width: 10rem;
  height: 10rem;
  font-size: 1.4rem;
  margin: 1rem;
}

/* 使用 vw 单位 */
.mobile-element {
  width: calc(50 * var(--vw));
  height: calc(50 * var(--vw));
  font-size: calc(14 * var(--vw));
  margin: calc(10 * var(--vw));
}

/* 使用 CSS 变量 */
.container {
  max-width: var(--design-width);
  max-height: var(--design-height);
  transform: scale(var(--scale));
  background-color: #f0f0f0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .element {
    width: 50vw;
    height: 50vw;
  }
}
```

## 6. 浏览器兼容性

| 浏览器 | 支持情况 |
|--------|----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| IE 11 | ❌ (不支持 CSS 变量) |

## 7. 注意事项

1. **CSS 变量支持**：该工具类使用 CSS 变量，不支持 IE 11 等旧浏览器。如需支持旧浏览器，请使用其他适配方案。

2. **设计尺寸配置**：建议根据实际项目的设计尺寸配置 `designSize.sizes` 数组，以获得最佳适配效果。

3. **性能优化**：工具类使用防抖处理窗口 resize 事件，减少频繁计算，提高性能。

4. **单位选择**：
   - `rem` 单位适合需要保持元素比例的场景
   - `vw` 单位适合需要完全适配视口宽度的场景

5. **移动端适配**：工具类会自动检测移动设备，可以为移动端和 PC 端配置不同的设计尺寸。

6. **基准字体大小**：默认基准字体大小为 100px，便于计算（1rem = 100px），可根据需要调整。

7. **销毁实例**：在不需要适配时，应调用 `destroy()` 方法销毁实例，移除事件监听器，避免内存泄漏。

## 8. 常见问题

### 8.1 适配效果不理想

**解决方案**：
- 检查设计尺寸配置是否正确
- 尝试切换不同的适配单位
- 调整基准字体大小
- 确保元素使用了正确的单位（rem 或 vw）

### 8.2 窗口 resize 时适配不及时

**解决方案**：
- 工具类使用了防抖处理，默认延迟 250ms，这是正常现象
- 如需立即适配，可手动调用 `adapt()` 方法

### 8.3 移动端适配问题

**解决方案**：
- 确保在 `designSize.sizes` 中配置了移动端设计尺寸
- 检查移动设备检测是否正确（可通过 `simpleAdapt.isMobile` 查看）
- 考虑使用媒体查询结合适配方案

## 9. 测试

测试文件位于 `test/utils/sampleadapt/sampleadapt.test.js`，包含了对所有方法的测试用例。

### 9.1 运行测试

```bash
# 在项目根目录运行
npm test

# 或者直接运行特定测试文件
node test/utils/sampleadapt/sampleadapt.test.js
```

## 10. 示例代码

示例代码位于 `examples/utils/sampleadapt/index.html`，提供了一个完整的适配示例，包括：

- 适配效果演示
- 控制按钮（切换单位、销毁实例、重新初始化）
- CSS 变量显示
- 代码示例

### 10.1 打开示例

在浏览器中打开 `examples/utils/sampleadapt/index.html` 文件即可查看和测试适配效果。

## 11. 总结

`SimpleAdapt` 工具类是一个轻量级的页面适配解决方案，具有以下特点：

1. **简单易用**：配置简单，API 清晰
2. **灵活适配**：支持 rem 和 vw 两种适配方案
3. **智能计算**：自动检测最接近的设计尺寸，计算缩放比例
4. **CSS 变量**：设置丰富的 CSS 变量，方便在样式中使用
5. **性能优化**：防抖处理窗口 resize 事件
6. **单位转换**：提供 px 转 rem、vw、vh 的方法
7. **响应式设计**：支持移动端和 PC 端适配

该工具类适用于需要实现响应式布局的项目，特别是同时包含 PC 端和移动端的项目。通过简单的配置，可以快速实现不同设备的适配效果，提高开发效率。