# dcpartner组件使用说明

## 1. 组件介绍

dcpartner组件是一个用于展示合作伙伴Logo轮播的组件，包含以下主要功能：

- 合作伙伴Logo自动轮播
- 支持鼠标悬停暂停
- 可配置轮播间隔
- 可指定容器选择器
- 响应式设计

## 2. 目录结构

```
src/components/dcpartner/
└── dcpartner.js        # 核心组件
```

## 3. 核心类 - DCPartner

### 3.1 构造函数

```javascript
const dcPartner = new DC.Partner(partners, {
  containerSelector: '#container',  // 容器选择器，默认为'body'
  interval: 3000                    // 轮播间隔，默认为3000毫秒
});
```

**参数**：
- `partners` (Array): 合作伙伴数据数组
  - `partners[].name` (string): 合作伙伴名称
  - `partners[].logo` (string): 合作伙伴Logo图片路径
- `options` (Object): 配置选项
  - `options.containerSelector` (string): 容器选择器，默认为'body'
  - `options.interval` (number): 轮播间隔，默认为3000毫秒

### 3.2 主要方法

#### 3.2.1 init()

初始化组件并开始轮播

**示例**：
```javascript
dcPartner.init();
```

#### 3.2.2 pause()

暂停轮播

**示例**：
```javascript
dcPartner.pause();
```

#### 3.2.3 play()

播放轮播

**示例**：
```javascript
dcPartner.play();
```

#### 3.2.4 moveCarousel()

移动轮播（手动触发一次轮播）

**示例**：
```javascript
dcPartner.moveCarousel();
```

## 4. 使用示例

### 4.1 基本用法

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>合作伙伴轮播示例</title>
</head>
<body>
    <div id="partner-carousel"></div>
    
    <script>
        // 模拟模块导出
        window.module = {};
        window.module.exports = {};
    </script>
    
    <script src="path/to/dcpartner.js"></script>
    
    <script>
        // 合作伙伴数据
        const partners = [
            { name: '合作伙伴1', logo: 'partner1.png' },
            { name: '合作伙伴2', logo: 'partner2.png' },
            { name: '合作伙伴3', logo: 'partner3.png' }
        ];
        
        // 初始化DCPartner
        const dcPartner = new DC.Partner(partners, {
            containerSelector: '#partner-carousel',
            interval: 2000
        });
        
        // 启动轮播
        dcPartner.init();
    </script>
</body>
</html>
```

### 4.2 高级用法

```javascript
// 合作伙伴数据
const partners = [
    { name: '合作伙伴1', logo: 'partner1.png' },
    { name: '合作伙伴2', logo: 'partner2.png' },
    { name: '合作伙伴3', logo: 'partner3.png' },
    { name: '合作伙伴4', logo: 'partner4.png' },
    { name: '合作伙伴5', logo: 'partner5.png' }
];

// 初始化DCPartner
const dcPartner = new DC.Partner(partners, {
    containerSelector: '.partner-section',
    interval: 2500
});

// 启动轮播
dcPartner.init();

// 手动控制轮播
document.getElementById('pause-btn').addEventListener('click', function() {
    dcPartner.pause();
});

document.getElementById('play-btn').addEventListener('click', function() {
    dcPartner.play();
});
```

## 5. 样式说明

组件会自动生成以下样式：

```css
.dc-partner-carousel {
  margin: 0 auto;
  position: relative;
  max-width: 800px;
  width: 100%;
  min-height: 56px;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 12px 20px;
}
.dc-carousel-inner {
  position: absolute;
  display: flex;
  white-space: nowrap;
  animation: ani-scroll-left 10s linear infinite;
  animation-play-state: running;
}
.dc-partner-item {
  display: inline-block;
  width: 150px;
  margin-right: 10px;
}
.dc-partner-item img {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: auto;
  object-fit: contain;
}

@keyframes ani-scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

## 6. 响应式设计

组件使用百分比宽度，会自动适应容器大小，在不同屏幕尺寸下都能正常显示。

## 7. 注意事项

1. **图片路径**：请确保提供正确的合作伙伴Logo图片路径，否则会显示图片加载失败
2. **容器选择器**：请确保提供正确的容器选择器，否则组件会显示错误信息
3. **轮播间隔**：轮播间隔不宜设置过短，建议设置在2000-5000毫秒之间
4. **性能优化**：如果合作伙伴数量较多，建议优化图片大小，避免影响页面加载速度
5. **浏览器兼容性**：支持所有现代浏览器，IE11及以下可能需要polyfill

## 8. 常见问题

### 8.1 轮播不显示

**原因**：
- 容器选择器不正确
- 合作伙伴数据为空
- 图片路径不正确

**解决方案**：
- 检查容器选择器是否正确
- 确保合作伙伴数据不为空
- 验证图片路径是否正确

### 8.2 轮播速度过快或过慢

**原因**：
- interval参数设置不合适

**解决方案**：
- 调整interval参数，设置合适的轮播间隔

### 8.3 鼠标悬停不暂停

**原因**：
- 事件监听器未正确绑定

**解决方案**：
- 确保调用了init()方法
- 检查是否有其他代码干扰了事件监听

## 9. 测试

测试文件位于 `test/components/dcpartner/dcpartner.test.js`，包含以下测试用例：

- DCPartner组件初始化测试
- 移动轮播测试
- 暂停轮播测试
- 播放轮播测试
- 自动播放测试
- 事件监听器测试
- 容器不存在的情况测试

## 10. 示例

完整的使用示例位于 `examples/components/dcpartner/index.html`，展示了：

- 合作伙伴轮播的基本用法
- 暂停和播放轮播的功能
- 详细的使用说明
