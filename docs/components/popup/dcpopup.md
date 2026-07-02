非常抱歉！为了追求精简，我确实删减了太多细节，导致文档的完整性和实用性大打折扣。

我已经将您原始文档中所有**详尽的 API 参数说明、响应式布局数据、完整的事件处理机制、常见问题排查（FAQ）以及三个完整的 HTML 示例代码**全部恢复，并在此基础上**无缝融入了最新的动画功能（animationType）和 SCSS 编译配置**。

以下是为您重新整理、内容详实且功能最新的 **DCPopup 组件完整文档**：

---

# 📄 DCPopup 组件文档

## 概述
DCPopup 是一个功能完整、易于使用的弹窗 SDK，用于在网页中显示各种类型的弹窗内容（包括文本、图片、视频等）。它支持自定义背景颜色、多种 CSS3 入场动画，并提供了极佳的交互体验（如点击外部区域关闭、视频自动暂停、禁止页面滚动等）。

## ✨ 特性
- **内容灵活**：支持显示任意 HTML 内容的弹窗。
- **动画丰富**：支持多种 CSS3 动画效果（淡入、滑动、翻转、缩放等）。
- **背景自定义**：可自定义弹窗背景颜色和透明度。
- **交互友好**：点击外部区域自动关闭弹窗；弹窗显示时禁止页面滚动。
- **媒体控制**：内置视频暂停逻辑，点击视频或关闭弹窗时自动暂停。
- **响应式设计**：内置媒体查询，完美适配 PC 端和移动端。
- **结构自动创建**：无需手动编写 HTML 结构，JS 自动创建并管理 DOM。

## 📦 安装
将 `dcpopup.js` 文件引入到您的项目中：
```html
<script src="path/to/dcpopup.js"></script>
```

## 🚀 基本用法

### 步骤 1: 创建 DCPopup 实例
```javascript
const popup = new DC.Popup();
```

### 步骤 2: 准备弹窗内容
```javascript
// 创建内容元素
const content = document.createElement('div');
content.innerHTML = '<h3>弹窗标题</h3><p>弹窗内容</p>';
```

### 步骤 3: 显示弹窗
```javascript
// 1. 基础显示 (默认淡入)
popup.showPopup('my-popup', content);

// 2. 自定义背景 + 动画 (例如 slide-left, flip-x)
// 注意：动画名称对应 SCSS 中的后缀
popup.showPopup('my-popup', content, 'rgba(0, 0, 0, 0.6)', 'slide-left');
```

### 步骤 4: 隐藏弹窗
```javascript
// 隐藏指定弹窗
popup.hidePopup('my-popup');

// 隐藏当前显示的弹窗
popup.hidePopup();
```

## 🛠️ API 参考

### 构造函数
```javascript
new DC.Popup()
```
创建一个新的 DCPopup 实例。

### 实例方法

#### showPopup(popupId, content, bgColor, animationType)
显示指定 ID 的弹窗。如果弹窗不存在，会自动创建。

**参数：**
| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `popupId` | String | - | 弹窗元素的唯一 ID。 |
| `content` | HTMLElement | - | 要显示在弹窗中的 DOM 元素。 |
| `bgColor` | String | `'rgba(0,0,0,.8)'` | 弹窗背景颜色，可包含透明度（如 `rgba(255,255,255,0.5)`）。 |
| `animationType` | String | `null` | **新增**：动画类型，对应 SCSS 中的后缀（如 `'slide-left'`, `'flip-x'`, `'spring'` 等）。 |

#### hidePopup(popupId)
隐藏指定 ID 的弹窗，并清理事件监听、恢复页面滚动。

**参数：**
| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `popupId` | String | 当前显示的弹窗 ID | 要隐藏的弹窗 ID。 |

#### createPopup(popupId)
*内部方法，通常由 `showPopup` 自动调用。*
创建弹窗 DOM 结构并添加到 body。

**参数：**
| 参数名 | 类型 | 描述 |
|--------|------|------|
| `popupId` | String | 弹窗元素的唯一标识符。 |

**返回值：**
返回创建的弹窗 HTMLElement。

#### disableBodyScroll()
禁止页面滚动。

#### enableBodyScroll()
启用页面滚动。

#### handleClickOutside(event)
处理点击外部区域的事件，用于关闭弹窗。

**参数：**
| 参数名 | 类型 | 描述 |
|--------|------|------|
| `event` | MouseEvent | 点击事件对象。 |

## ⚙️ 配置选项
DCPopup 组件目前没有配置选项，所有功能通过方法调用实现。

## 🔔 事件处理

### 内置事件
DCPopup 组件内置了以下事件处理：
1. **点击关闭按钮**：点击弹窗右上角的关闭按钮会关闭弹窗。
2. **点击外部区域**：点击弹窗外部区域（遮罩层）会关闭弹窗。
3. **点击视频**：点击弹窗中的视频会自动暂停视频播放。

### 自定义事件
您可以通过为弹窗内容添加事件监听器来实现自定义事件处理：
```javascript
const content = document.createElement('div');
const button = document.createElement('button');
button.textContent = '点击我';
button.addEventListener('click', () => {
  alert('按钮被点击了！');
});
content.appendChild(button);

popup.showPopup('custom-event-popup', content);
```

## 🎨 样式定制

### Sass 编译配置
组件样式由 SCSS 编写。如果你在 VSCode 中使用 Live Sass Compiler 插件，建议在 `settings.json` 中修改输出格式，因为 Dart Sass 已移除 `compact` 格式：
```json
"liveSassCompile.settings.formats": [
  {
    "format": "expanded",  // 推荐开发环境使用
    "extensionName": ".css",
    "savePath": null
  }
]
```

### 覆盖默认样式
你可以通过在项目样式表中覆盖组件的默认类名来定制外观：
```css
/* 自定义弹窗容器样式 */
.popup { /* 自定义样式 */ }
/* 自定义弹窗内容容器样式 */
.popup-con { /* 自定义样式 */ }
/* 自定义关闭按钮样式 */
.popup-close { /* 自定义样式 */ }
```

### 使用自定义背景颜色
通过 `showPopup` 方法的 `bgColor` 参数设置自定义背景：
```javascript
// 使用半透明白色背景
popup.showPopup('my-popup', content, 'rgba(255, 255, 255, 0.7)');
// 使用蓝色背景
popup.showPopup('my-popup', content, 'rgba(0, 122, 255, 0.8)');
```

## 📱 响应式设计
DCPopup 组件内置了响应式设计，适配不同屏幕尺寸：
- **大屏幕**（> 1024px）：弹窗内容容器固定宽度 860px，高度 600px。
- **小屏幕**（≤ 1024px）：弹窗内容容器宽度为 90%，高度为 60%。

## 🌐 浏览器兼容性
- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## ❓ 常见问题

### 1. 弹窗不显示
**可能原因**：
- 弹窗 ID 不存在。
- 内容元素为空。
- DOM 结构创建失败。
**解决方案**：
- 确保弹窗 ID 正确。
- 确保内容元素存在且不为空。
- 检查浏览器控制台是否有错误信息。

### 2. 弹窗内容显示异常
**可能原因**：
- 内容元素样式冲突。
- 内容元素尺寸过大。
**解决方案**：
- 检查内容元素的样式。
- 调整内容元素的尺寸。
- 使用响应式设计确保内容适配弹窗。

### 3. 页面滚动无法恢复
**可能原因**：
- 弹窗关闭时出现错误。
- 多次调用 disableBodyScroll 但只调用一次 enableBodyScroll。
**解决方案**：
- 确保弹窗正常关闭。
- 检查代码中是否有多次禁用滚动的情况。

## 💻 示例代码

### 示例 1: 基本文本弹窗
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>基本文本弹窗示例</title>
</head>
<body>
    <button id="show-popup-btn">显示弹窗</button>

    <script src="path/to/dcpopup.js"></script>
    <script>
        const popup = new DC.Popup();
        const showBtn = document.getElementById('show-popup-btn');

        // 创建弹窗内容
        const content = document.createElement('div');
        content.innerHTML = `
            <h3>欢迎使用 DCPopup</h3>
            <p>这是一个基本的文本弹窗示例。</p>
            <p>您可以在弹窗中显示任意 HTML 内容。</p>
        `;

        // 显示弹窗（使用弹簧动画 spring）
        showBtn.addEventListener('click', () => {
            popup.showPopup('text-popup', content, 'rgba(0,0,0,0.8)', 'spring');
        });
    </script>
</body>
</html>
```

### 示例 2: 视频弹窗
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视频弹窗示例</title>
</head>
<body>
    <button id="show-video-btn">显示视频弹窗</button>

    <script src="path/to/dcpopup.js"></script>
    <script>
        const popup = new DC.Popup();
        const showBtn = document.getElementById('show-video-btn');

        // 创建视频内容
        const videoContent = document.createElement('div');
        videoContent.innerHTML = `
            <video controls style="width: 100%;">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                您的浏览器不支持视频播放。
            </video>
            <p style="text-align: center; margin-top: 10px;">示例视频：Big Buck Bunny</p>
        `;

        // 显示弹窗
        showBtn.addEventListener('click', () => {
            popup.showPopup('video-popup', videoContent);
        });
    </script>
</body>
</html>
```

### 示例 3: 自定义背景弹窗
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>自定义背景弹窗示例</title>
</head>
<body>
    <button id="show-custom-bg-btn">显示自定义背景弹窗</button>

    <script src="path/to/dcpopup.js"></script>
    <script>
        const popup = new DC.Popup();
        const showBtn = document.getElementById('show-custom-bg-btn');

        // 创建弹窗内容
        const content = document.createElement('div');
        content.innerHTML = `
            <h3>自定义背景弹窗</h3>
            <p>这个弹窗使用了自定义的背景颜色。</p>
            <p>背景色：半透明红色</p>
        `;

        // 显示带自定义背景的弹窗
        showBtn.addEventListener('click', () => {
            popup.showPopup('custom-bg-popup', content, 'rgba(255, 100, 100, 0.5)');
        });
    </script>
</body>
</html>
```