# DCProductivitySlider 组件

一个现代化的生产力滑块组件，支持卡片展开/收缩效果、触摸滑动、键盘导航和响应式设计。

## 🚀 功能特性

- ✅ **智能交互** - 支持触摸滑动、键盘导航、悬停效果
- ✅ **响应式设计** - 完美适配桌面、平板和移动设备
- ✅ **动画效果** - 流畅的卡片展开/收缩动画
- ✅ **自动播放** - 可配置的自动轮播功能
- ✅ **事件系统** - 完整的事件回调机制
- ✅ **高度可定制** - 丰富的配置选项和主题系统
- ✅ **轻量级** - 性能优化，无外部依赖

## 📦 快速开始

### 基本用法

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dcproductivityslider.css">
</head>
<body>
    <div id="slider-container"></div>

    <script src="dcproductivityslider.js"></script>
    <script>
        const slider = new DC.ProductivitySlider({
            container: '#slider-container',
            items: [
                {
                    title: '设计工具',
                    description: '专业的设计软件套件',
                    backgroundImage: 'path/to/image.jpg',
                    thumbnail: 'path/to/thumb.jpg',
                    buttonText: '了解更多'
                }
            ]
        });
    </script>
</body>
</html>
```

### 通过 npm 安装

```bash
npm install dc-productivity-slider
```

```javascript
import DCProductivitySlider from 'dc-productivity-slider';

const slider = new DCProductivitySlider({
    container: '#slider-container',
    items: [...]
});
```

## ⚙️ 配置选项

### 基本配置

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | `string/Element` | `'#slider-container'` | 容器元素或选择器 |
| `items` | `Array` | `[]` | 卡片项目数组 |
| `gap` | `string` | `'1.25rem'` | 卡片间距 |
| `speed` | `string` | `'0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)'` | 动画速度 |
| `closedWidth` | `string` | `'5rem'` | 收缩状态宽度 |
| `openWidth` | `string` | `'30rem'` | 展开状态宽度 |
| `accentColor` | `string` | `'#ff6b35'` | 强调色 |

### 功能配置

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `autoPlay` | `boolean` | `false` | 是否自动播放 |
| `autoPlayInterval` | `number` | `5000` | 自动播放间隔(ms) |
| `showDots` | `boolean` | `true` | 是否显示分页点 |
| `showNavigation` | `boolean` | `true` | 是否显示导航按钮 |
| `enableKeyboard` | `boolean` | `true` | 是否启用键盘导航 |
| `enableTouch` | `boolean` | `true` | 是否启用触摸滑动 |
| `enableHover` | `boolean` | `true` | 是否启用悬停效果 |

### 卡片项目配置

每个卡片项目支持以下属性：

```javascript
{
    title: '项目标题',                    // 卡片标题（必需）
    description: '项目描述',              // 卡片描述
    backgroundImage: 'path/to/bg.jpg',    // 背景图片URL
    thumbnail: 'path/to/thumb.jpg',       // 缩略图URL
    buttonText: '按钮文字',               // 按钮文字
    customButtonHTML: '<span>HTML</span>', // 自定义按钮HTML
    customHTML: '<div>自定义内容</div>',   // 自定义HTML内容
    customAttributes: {                   // 自定义卡片属性
        'data-id': '123',
        'data-category': 'design'
    }
}
```

### 事件回调

组件支持完整的事件回调系统：

```javascript
const slider = new DC.ProductivitySlider({
    container: '#slider-container',
    items: [...],

    // 事件回调
    onItemClick: (item, index) => {
        console.log('点击了:', item.title);
    },

    onItemActivate: (item, index) => {
        console.log('激活了:', item.title);
    },

    onItemDeactivate: (item, index) => {
        console.log('失活了:', item.title);
    },

    onChange: (item, index) => {
        console.log('切换到:', item.title);
    },

    onInit: () => {
        console.log('组件初始化完成');
    }
});
```

## 🔧 API 方法

### 实例方法

#### `activate(index, scroll = false)`
激活指定索引的卡片。

- `index`: 卡片索引（0开始）
- `scroll`: 是否滚动到该卡片

#### `go(step)`
切换到相对位置的卡片。

- `step`: 步长（正数前进，负数后退）

#### `play()`
开始自动播放。

#### `pause()`
暂停自动播放。

#### `destroy()`
销毁组件实例，清理事件监听器。

#### `updateItems(newItems)`
更新卡片项目。

- `newItems`: 新的项目数组

### 属性访问

#### `currentIndex`
获取当前激活卡片的索引。

#### `items`
获取当前卡片项目数组。

#### `config`
获取当前配置对象。

## 🎨 样式定制

### CSS 变量

组件使用 CSS 变量进行样式定制：

```css
.dc-productivity-slider {
    --gap: 2rem;                    /* 卡片间距 */
    --speed: 0.3s ease;             /* 动画速度 */
    --closed: 6rem;                 /* 收缩宽度 */
    --open: 35rem;                  /* 展开宽度 */
    --accent: #007bff;              /* 强调色 */
}
```

### SCSS 支持

组件提供 SCSS 版本，支持更灵活的定制：

```scss
// 自定义变量
$gap: 2rem !default;
$speed: 0.3s ease !default;
$closed-width: 6rem !default;
$open-width: 35rem !default;
$accent-color: #007bff !default;

// 导入组件样式
@import './dcproductivityslider.scss';
```

### 主题系统

组件内置主题系统：

```scss
// 使用内置主题
.dc-productivity-slider {
    &.theme-light {
        --background: #ffffff;
        --text: #333333;
        --accent: #ff6b35;
    }

    &.theme-dark {
        --background: #1a1a1a;
        --text: #ffffff;
        --accent: #ff6b35;
    }
}
```

## 📱 响应式设计

组件自动适配不同屏幕尺寸：

- **桌面端** (> 1024px): 水平布局，卡片展开/收缩效果
- **平板端** (768px - 1024px): 垂直布局，优化触摸体验
- **移动端** (< 768px): 全宽布局，简化交互

## 🌐 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 移动端浏览器

## 📂 项目结构

```
dcproductivityslider/
├── dcproductivityslider.js      # 组件主文件
├── dcproductivityslider.css     # 压缩版样式
├── dcproductivityslider.scss    # SCSS 源码
├── demo.html                   # 综合演示
├── example.html                # 基础示例
├── test.html                   # 功能测试
├── nav-test.html               # 导航测试
└── README.md                   # 文档
```

## 🚀 演示和测试

### 综合演示

查看 `demo.html` 获取完整的组件演示，包含：
- 基本用法展示
- 自定义配置演示
- 事件回调示例
- 功能测试区域

### 功能测试

使用 `test.html` 进行组件功能测试：
- 基本功能测试
- 导航功能测试
- 数据更新测试
- 配置选项测试

### 快速测试

```bash
# 启动本地服务器
cd dcproductivityslider
python -m http.server 8000

# 访问演示页面
http://localhost:8000/demo.html
http://localhost:8000/test.html
```

## 🔧 开发指南

### 扩展组件

组件采用模块化设计，易于扩展：

```javascript
class CustomSlider extends DC.ProductivitySlider {
    constructor(options) {
        super(options);

        // 自定义功能
        this.customMethod = () => {
            // 自定义逻辑
        };
    }

    // 重写方法
    createElements() {
        super.createElements();

        // 自定义DOM结构
        this.customElement = document.createElement('div');
        this.element.appendChild(this.customElement);
    }
}
```

### 自定义主题

创建自定义主题：

```scss
.custom-theme {
    .dc-productivity-slider {
        --gap: 1rem;
        --speed: 0.4s ease-in-out;
        --closed: 4rem;
        --open: 40rem;
        --accent: #8a2be2;
    }

    .project-card {
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
}
```

## 🐛 问题排查

### 常见问题

1. **容器未找到**
   - 确保容器元素存在且选择器正确
   - 检查 DOM 加载时机

2. **图片加载失败**
   - 检查图片路径是否正确
   - 确保图片可访问

3. **触摸滑动不工作**
   - 检查 `enableTouch` 配置
   - 确保容器有足够的触摸区域

### 调试模式

启用调试模式查看详细日志：

```javascript
const slider = new DC.ProductivitySlider({
    container: '#slider-container',
    items: [...],
    debug: true  // 启用调试模式
});
```

## 📄 许可证

MIT License

## 📞 支持与反馈

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件至 support@example.com
- 访问项目主页

## 🔄 更新日志

### v1.1.0 (当前版本)
- 新增综合演示页面
- 完善事件回调系统
- 优化触摸滑动体验
- 改进响应式设计
- 修复已知问题

### v1.0.0
- 初始版本发布
- 基础滑块功能
- 响应式设计
- 事件回调系统
- SCSS 样式支持

---

**DCProductivitySlider** - 让内容展示更优雅、更高效！