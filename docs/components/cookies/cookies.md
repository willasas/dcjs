# Cookies 组件使用说明

## 简介

Cookies 组件（DCookiesPopup）用于创建美观的 Cookie 偏好设置弹窗，支持自定义配置和响应式设计。该组件可以帮助网站遵守隐私法规，如 GDPR、CCPA 等，通过向用户显示 Cookie 政策并获取用户的同意。

## 安装与引入

### 直接引入

```html
<script src="../../src/components/cookies/dcookiespopup.js"></script>
```

### 模块引入

```javascript
const DCookiesPopup = require('../../src/components/cookies/dcookiespopup.js');
```

## 基本使用

### 创建默认配置的 Cookie 弹窗

```javascript
// 创建默认配置的 Cookie 弹窗
const cookiesPopup = new DC.CookiesPopup();

// 初始化弹窗
cookiesPopup.init();

// 显示弹窗
cookiesPopup.show();

// 隐藏弹窗
cookiesPopup.hide();
```

### 创建自定义配置的 Cookie 弹窗

```javascript
// 创建自定义配置的 Cookie 弹窗
const cookiesPopup = new DC.CookiesPopup({
    title: 'Cookie 设置',
    description: '我们使用 Cookie 来改善您的浏览体验，为您提供个性化内容和广告。您可以选择接受或拒绝可选的 Cookie。',
    privacyLink: 'privacy.html',
    cookiesLink: 'cookie.html',
    acceptText: '接受',
    rejectText: '拒绝',
    manageText: '管理 Cookie',
    containerSelector: 'body',
    customClass: 'custom-cookies-popup'
});

// 初始化弹窗
cookiesPopup.init();

// 显示弹窗
cookiesPopup.show();
```

## API 参考

### 构造函数

```javascript
new DC.CookiesPopup(options)
```

- **options**：配置对象（可选）
  - **title**：弹窗标题，默认为 'Cookie Preferences'
  - **description**：弹窗描述文本，默认为一段关于 Cookie 使用的说明
  - **privacyLink**：隐私政策链接，默认为 'privacy.html'
  - **cookiesLink**：Cookie 政策链接，默认为 'cookie.html'
  - **acceptText**：接受按钮文本，默认为 'Accept'
  - **rejectText**：拒绝按钮文本，默认为 'Reject'
  - **manageText**：管理按钮文本，默认为 'Manage Cookies'
  - **containerSelector**：容器选择器，默认为 'body'
  - **customClass**：自定义样式类名，默认为 ''

### 方法

#### init()

初始化 Cookie 弹窗，创建 DOM 元素、添加样式和事件监听器。

#### show()

显示 Cookie 弹窗。

#### hide()

隐藏 Cookie 弹窗。

## 样式说明

### 内置样式

- 响应式设计，适配桌面和移动设备
- 现代化的卡片式布局
- 渐变背景和按钮效果
- 悬停动画效果
- 关闭按钮图标

### 自定义样式

组件使用 CSS 变量来定义主题颜色，您可以通过覆盖这些变量来自定义样式：

```css
:root {
    --bg-theme-50: #f0f9ff;
    --bg-theme-200: #bae6fd;
    --bg-theme-500: #0ea5e9;
    --bg-theme-700: #0369a1;
    --bg-theme-800: #0c4a6e;
    --font-theme-200: #e0f2fe;
    --font-theme-600: #0369a1;
    --font-theme-800: #0c4a6e;
}
```

您也可以通过 `customClass` 选项添加自定义类名，然后使用 CSS 规则覆盖默认样式。

## 示例

完整的示例代码请参考 `examples/components/cookies/index.html` 文件。

## 浏览器兼容性

- Chrome
- Firefox
- Safari
- Edge

## 常见问题

### 1. 弹窗不显示

**可能原因**：
- 容器选择器不存在
- 样式冲突
- 组件未正确初始化

**解决方案**：
- 确保容器选择器指向一个存在的元素
- 检查是否有 CSS 规则覆盖了弹窗的显示
- 确保在调用 `show()` 方法前已经调用了 `init()` 方法

### 2. 样式不符合预期

**解决方案**：
- 覆盖 CSS 变量来自定义颜色主题
- 使用 `customClass` 选项添加自定义样式类
- 检查是否有其他 CSS 规则影响弹窗样式

### 3. 响应式布局问题

**解决方案**：
- 组件已内置响应式设计，确保在不同设备上测试
- 如需自定义响应式断点，可修改组件内部的媒体查询

## 最佳实践

1. **在页面加载时初始化**：在 DOM 加载完成后初始化 Cookie 弹窗
2. **合理设置默认值**：根据网站的隐私政策设置合适的默认文本
3. **提供清晰的隐私链接**：确保隐私政策和 Cookie 政策链接指向有效的页面
4. **考虑用户体验**：弹窗设计应简洁明了，避免干扰用户浏览
5. **测试不同设备**：确保弹窗在桌面和移动设备上都能正常显示和操作

## 扩展功能

如果需要扩展组件功能，可以：

1. **添加回调函数**：在用户点击接受/拒绝按钮时执行自定义逻辑
2. **存储用户偏好**：使用 localStorage 或 Cookie 存储用户的 Cookie 偏好设置
3. **添加更多按钮**：根据需要添加更多功能按钮
4. **自定义动画效果**：修改 CSS 样式添加入场和退场动画