# dcproductivityslider组件使用说明

## 1. 组件介绍

dcproductivityslider组件是一个现代化的生产力滑块组件，用于展示项目、产品或图片等内容，包含以下主要功能：

- 卡片激活/失活动画效果
- 自动播放功能
- 导航按钮控制
- 分页点控制
- 键盘导航（左右箭头）
- 触摸滑动支持
- 响应式设计，适配移动端
- 链接跳转功能

## 2. 目录结构

```
src/components/dcproductivityslider/
├── dcproductivityslider-demo.html       # 演示文件
├── dcproductivityslider.css             # 样式文件
├── dcproductivityslider.html            # 示例文件
├── dcproductivityslider.js              # 核心组件
├── dcproductivityslider.scss            # SCSS源文件
└── README.md                            # 组件说明
```

## 3. 核心类 - DCProductivitySlider

### 3.1 构造函数

```javascript
const dcProductivitySlider = new DC.ProductivitySlider({
  container: '#container',              // 容器元素选择器或DOM元素
  items: [],                            // 滑块项目数组
  closedWidth: '5rem',                  // 非激活状态卡片宽度
  openWidth: '30rem',                   // 激活状态卡片宽度
  gap: '1.25rem',                       // 卡片间距
  speed: '0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // 动画速度
  accentColor: '#ff6b35',               // 主题色
  autoPlay: false,                      // 是否自动播放
  autoPlayInterval: 3000,               // 自动播放间隔(毫秒)
  loop: true,                           // 是否循环播放
  showDots: true,                       // 是否显示分页点
  showNavigation: true,                 // 是否显示导航按钮
  enableKeyboard: true,                 // 是否启用键盘导航
  enableTouch: true,                    // 是否启用触摸滑动
  enableHover: true,                    // 是否启用悬停效果
  onItemClick: function(item, index) {}, // 卡片点击回调
  onItemActivate: function(item, index) {}, // 卡片激活回调
  onItemDeactivate: function(item, index) {}, // 卡片失活回调
  onChange: function(item, index) {},   // 切换回调
  onInit: function() {},                // 初始化完成回调
  onAutoPlayStart: function() {},        // 自动播放开始回调
  onAutoPlayPause: function() {},        // 自动播放暂停回调
  onLinkClick: function(item, index, event) {} // 链接点击回调
});
```

### 3.2 主要方法

#### 3.2.1 activate(index)

激活指定索引的卡片

**参数**：
- `index` (number): 要激活的卡片索引

**示例**：
```javascript
dcProductivitySlider.activate(1); // 激活第二个卡片
```

#### 3.2.2 go(direction)

切换到指定方向的卡片

**参数**：
- `direction` (number): 切换方向：-1表示上一个，1表示下一个

**示例**：
```javascript
dcProductivitySlider.go(1); // 切换到下一个卡片
dcProductivitySlider.go(-1); // 切换到上一个卡片
```

#### 3.2.3 play()

开始自动播放

**示例**：
```javascript
dcProductivitySlider.play();
```

#### 3.2.4 pause()

暂停自动播放

**示例**：
```javascript
dcProductivitySlider.pause();
```

#### 3.2.5 updateItems(newItems)

更新滑块项目

**参数**：
- `newItems` (Array): 新的滑块项目数组

**示例**：
```javascript
dcProductivitySlider.updateItems([
  {
    title: '新项目1',
    backgroundImage: 'new-project1.jpg',
    thumbnail: 'new-thumb1.jpg',
    description: '新项目1描述',
    buttonText: '了解更多',
    link: 'https://example.com/new-project1'
  }
]);
```

#### 3.2.6 destroy()

销毁组件

**示例**：
```javascript
dcProductivitySlider.destroy();
```

## 4. 使用示例

### 4.1 基本用法

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生产力滑块示例</title>
</head>
<body>
    <div id="slider-container"></div>
    
    <script>
        // 模拟模块导出
        window.module = {};
        window.module.exports = {};
    </script>
    
    <script src="path/to/dcproductivityslider.js"></script>
    
    <script>
        // 滑块项目数据
        const sliderItems = [
            {
                title: '项目1',
                backgroundImage: 'https://via.placeholder.com/800x600?text=Project+1',
                thumbnail: 'https://via.placeholder.com/200x150?text=Thumb+1',
                description: '项目1描述',
                buttonText: '了解更多',
                link: 'https://example.com/project1'
            },
            {
                title: '项目2',
                backgroundImage: 'https://via.placeholder.com/800x600?text=Project+2',
                thumbnail: 'https://via.placeholder.com/200x150?text=Thumb+2',
                description: '项目2描述',
                buttonText: '了解更多',
                link: 'https://example.com/project2'
            }
        ];
        
        // 初始化DCProductivitySlider
        const dcProductivitySlider = new DC.ProductivitySlider({
            container: '#slider-container',
            items: sliderItems
        });
    </script>
</body>
</html>
```

### 4.2 高级用法

```javascript
// 滑块项目数据
const sliderItems = [
    {
        title: '项目1',
        backgroundImage: 'https://via.placeholder.com/800x600?text=Project+1',
        thumbnail: 'https://via.placeholder.com/200x150?text=Thumb+1',
        description: '项目1详细描述',
        buttonText: '查看详情',
        link: 'https://example.com/project1',
        target: '_blank'
    },
    {
        title: '项目2',
        backgroundImage: 'https://via.placeholder.com/800x600?text=Project+2',
        thumbnail: 'https://via.placeholder.com/200x150?text=Thumb+2',
        description: '项目2详细描述',
        buttonText: '查看详情',
        link: 'https://example.com/project2'
    },
    {
        title: '项目3',
        backgroundImage: 'https://via.placeholder.com/800x600?text=Project+3',
        thumbnail: 'https://via.placeholder.com/200x150?text=Thumb+3',
        description: '项目3详细描述',
        buttonText: '查看详情',
        link: 'https://example.com/project3'
    }
];

// 初始化DCProductivitySlider
const dcProductivitySlider = new DC.ProductivitySlider({
    container: '#slider-container',
    items: sliderItems,
    closedWidth: '100px',
    openWidth: '580px',
    gap: '20px',
    speed: '0.5s',
    accentColor: '#4CAF50',
    autoPlay: true,
    autoPlayInterval: 4000,
    loop: true,
    showDots: true,
    showNavigation: true,
    enableKeyboard: true,
    enableTouch: true,
    enableHover: true,
    onItemClick: function(item, index) {
        console.log('点击了项目:', item.title, '索引:', index);
    },
    onItemActivate: function(item, index) {
        console.log('激活了项目:', item.title, '索引:', index);
    },
    onItemDeactivate: function(item, index) {
        console.log('失活了项目:', item.title, '索引:', index);
    },
    onChange: function(item, index) {
        console.log('切换到项目:', item.title, '索引:', index);
    },
    onInit: function() {
        console.log('组件初始化完成');
    },
    onAutoPlayStart: function() {
        console.log('自动播放开始');
    },
    onAutoPlayPause: function() {
        console.log('自动播放暂停');
    },
    onLinkClick: function(item, index, event) {
        console.log('点击了链接:', item.link, '项目:', item.title);
    }
});

// 手动控制
document.getElementById('prev-btn').addEventListener('click', function() {
    dcProductivitySlider.go(-1);
});

document.getElementById('next-btn').addEventListener('click', function() {
    dcProductivitySlider.go(1);
});

document.getElementById('play-btn').addEventListener('click', function() {
    dcProductivitySlider.play();
});

document.getElementById('pause-btn').addEventListener('click', function() {
    dcProductivitySlider.pause();
});
```

## 5. 样式说明

组件会自动注入以下样式：

- CSS自定义变量（--gap, --speed, --closed, --open, --accent）
- 组件基础样式和响应式布局
- 移动端适配样式（max-width: 1024px）
- 卡片激活状态和悬停效果

可以通过修改构造函数中的配置项来自定义样式，如closedWidth、openWidth、gap、speed和accentColor等。

## 6. 响应式设计

组件支持响应式设计，在不同屏幕尺寸下会自动调整：

- **桌面端**：完整显示所有功能，包括导航按钮、分页点等
- **移动端**：适配屏幕尺寸，调整卡片大小、导航按钮大小和布局

## 7. 注意事项

1. **项目数据格式**：请确保提供正确的滑块项目数据格式，包含所有必要的属性
2. **图片路径**：请确保提供正确的图片路径，否则会显示图片加载失败
3. **容器大小**：请为容器设置合适的高度，建议至少540px（桌面端）或340px（移动端）
4. **浏览器兼容性**：支持所有现代浏览器，IE11及以下可能需要polyfill
5. **性能优化**：如果滑块项目较多，建议优化图片大小，避免影响页面加载速度
6. **自动播放**：如果启用自动播放，建议设置合适的autoPlayInterval，避免切换过快影响用户体验

## 8. 常见问题

### 8.1 滑块不显示

**原因**：
- 容器选择器不正确
- 滑块项目数据为空
- 容器高度不够

**解决方案**：
- 检查容器选择器是否正确
- 确保滑块项目数据不为空
- 为容器设置合适的高度

### 8.2 自动播放不工作

**原因**：
- autoPlay配置为false
- autoPlayInterval设置不合理

**解决方案**：
- 将autoPlay设置为true
- 设置合适的autoPlayInterval

### 8.3 导航按钮不显示

**原因**：
- showNavigation配置为false

**解决方案**：
- 将showNavigation设置为true

### 8.4 链接点击不跳转

**原因**：
- link属性未设置
- 链接格式不正确

**解决方案**：
- 为每个项目设置正确的link属性
- 确保链接格式正确

### 8.5 响应式布局不生效

**原因**：
- 屏幕尺寸检测不准确
- CSS媒体查询未正确应用

**解决方案**：
- 检查窗口大小是否正确
- 确保CSS样式已正确注入

## 9. 测试

测试文件位于 `test/components/dcproductivityslider/dcproductivityslider.test.js`，包含以下测试用例：

- DCProductivitySlider组件初始化测试
- 卡片激活测试
- 卡片切换测试
- 自动播放测试
- 项目更新测试
- 组件销毁测试
- 移动设备检测测试
- 导航按钮事件测试
- 分页点事件测试
- 卡片点击事件测试
- 链接点击事件测试

## 10. 示例

完整的使用示例位于 `examples/components/dcproductivityslider/index.html`，展示了：

- 生产力滑块的基本用法
- 测试功能按钮
- 详细的使用说明
- 滑块项目数据格式说明
- 主要功能介绍
