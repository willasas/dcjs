# dcolor组件使用说明

## 1. 组件介绍

dcolor组件是一个用于渲染和管理传统颜色数据的组件，包含以下主要功能：

- 颜色数据的加载和管理
- 颜色选择和展示
- 颜色搜索功能
- 颜色复制到剪贴板
- 按色系分类颜色
- 响应式设计，适配移动端

## 2. 目录结构

```
src/components/dcolor/
├── color.json       # 颜色数据文件
├── dcolor.css       # 样式文件
├── dcolor.js        # 核心组件
└── dcolor.scss      # SCSS源文件
```

## 3. 核心类 - DColor

### 3.1 构造函数

```javascript
const dcolor = new DC.DColor({
  container: '#container',  // 容器选择器
  jsonPath: 'color.json',   // 颜色数据JSON文件路径
  colors: [],               // 额外的颜色数据数组（可选）
  onChange: function(color) { // 颜色变更回调（可选）
    console.log('颜色已变更:', color);
  }
});
```

### 3.2 主要方法

#### 3.2.1 addColors(colors)

添加颜色（支持单个或多个）

**参数**：
- `colors` (Object|Array): 颜色对象或颜色对象数组
  - `colors[].name` (string): 颜色名称
  - `colors[].hex` (string): 十六进制颜色值
  - `colors[].rgb` (string): RGB颜色值
  - `colors[].cmyk` (string): CMYK颜色值

**示例**：
```javascript
// 添加单个颜色
dcolor.addColors({
  name: '橙色',
  hex: '#FFA500',
  rgb: 'rgb(255, 165, 0)',
  cmyk: 'cmyk(0, 35, 100, 0)'
});

// 添加多个颜色
dcolor.addColors([
  {
    name: '紫色',
    hex: '#800080',
    rgb: 'rgb(128, 0, 128)',
    cmyk: 'cmyk(50, 100, 0, 50)'
  },
  {
    name: '黄色',
    hex: '#FFFF00',
    rgb: 'rgb(255, 255, 0)',
    cmyk: 'cmyk(0, 0, 100, 0)'
  }
]);
```

#### 3.2.2 getAllColors()

获取所有颜色

**返回值**：
- (Array): 颜色数组

**示例**：
```javascript
const colors = dcolor.getAllColors();
console.log('所有颜色:', colors);
```

#### 3.2.3 getCurrentColor()

获取当前选中的颜色

**返回值**：
- (Object|null): 当前颜色对象

**示例**：
```javascript
const currentColor = dcolor.getCurrentColor();
console.log('当前颜色:', currentColor);
```

#### 3.2.4 getColorsByCategory()

按色系分类颜色

**返回值**：
- (Object): 分类后的颜色对象，包含red、yellow、green、blue、purple、gray等属性

**示例**：
```javascript
const categories = dcolor.getColorsByCategory();
console.log('按色系分类:', categories);
```

#### 3.2.5 searchColors(keyword)

搜索颜色

**参数**：
- `keyword` (string): 搜索关键词

**示例**：
```javascript
dcolor.searchColors('红色');
```

## 4. 事件

### 4.1 copy-success

颜色复制成功时触发的事件

**示例**：
```javascript
document.addEventListener('copy-success', function(event) {
  console.log('复制成功:', event.detail);
  // event.detail包含以下属性：
  // - value: 复制的颜色值
  // - type: 颜色类型 (HEX或RGB)
});
```

## 5. 数据文件

### 5.1 color.json

颜色数据文件，格式如下：

```json
[
  {
    "name": "红色",
    "hex": "#FF0000",
    "rgb": "rgb(255, 0, 0)",
    "cmyk": "cmyk(0, 100, 100, 0)"
  },
  {
    "name": "绿色",
    "hex": "#00FF00",
    "rgb": "rgb(0, 255, 0)",
    "cmyk": "cmyk(100, 0, 100, 0)"
  }
]
```

## 6. 使用示例

### 6.1 基本用法

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>颜色选择器示例</title>
</head>
<body>
    <div id="color-picker"></div>
    
    <script>
        // 模拟模块导出
        window.module = {};
        window.module.exports = {};
    </script>
    
    <script src="path/to/dcolor.js"></script>
    
    <script>
        // 初始化DColor
        const dcolor = new DC.DColor({
            container: '#color-picker',
            jsonPath: 'color.json'
        });
        
        // 监听复制成功事件
        document.addEventListener('copy-success', function(event) {
            console.log('复制成功:', event.detail);
        });
    </script>
</body>
</html>
```

### 6.2 高级用法

```javascript
// 初始化DColor
const dcolor = new DC.DColor({
  container: '#color-picker',
  jsonPath: 'color.json',
  onChange: function(color) {
    console.log('颜色已变更:', color);
  }
});

// 等待数据加载完成
setTimeout(() => {
  // 添加颜色
  dcolor.addColors({
    name: '橙色',
    hex: '#FFA500',
    rgb: 'rgb(255, 165, 0)',
    cmyk: 'cmyk(0, 35, 100, 0)'
  });
  
  // 获取所有颜色
  const colors = dcolor.getAllColors();
  console.log('所有颜色:', colors);
  
  // 按色系分类
  const categories = dcolor.getColorsByCategory();
  console.log('按色系分类:', categories);
  
  // 搜索颜色
  dcolor.searchColors('红色');
}, 1000);
```

## 7. 响应式设计

颜色选择器组件支持响应式设计，在不同屏幕尺寸下会自动调整：

- **桌面端**：使用网格布局，每个颜色项显示完整的颜色信息
- **移动端**：使用两列布局，优化颜色项的显示方式

## 8. 注意事项

1. **数据加载**：DColor类会在初始化时异步加载颜色数据，使用前请确保数据已加载完成
2. **JSON路径**：必须提供正确的jsonPath参数，否则会显示错误信息
3. **颜色格式**：添加颜色时请确保提供正确的颜色格式，包括name、hex、rgb和cmyk属性
4. **浏览器兼容性**：支持所有现代浏览器，IE11及以下可能需要polyfill
5. **复制功能**：使用navigator.clipboard API，部分浏览器可能需要用户授权

## 9. 常见问题

### 9.1 颜色数据加载失败

**原因**：
- JSON文件路径不正确
- JSON文件格式错误
- 网络连接问题

**解决方案**：
- 检查JSON文件路径是否正确
- 验证JSON文件格式是否合法
- 确保网络连接正常

### 9.2 颜色复制失败

**原因**：
- 浏览器不支持navigator.clipboard API
- 用户未授权剪贴板访问

**解决方案**：
- 使用现代浏览器
- 确保用户已授权剪贴板访问
- 提供手动复制的备用方案

### 9.3 搜索功能不工作

**原因**：
- 搜索关键词格式不正确
- 颜色数据中没有匹配的颜色

**解决方案**：
- 使用正确的搜索关键词
- 确保颜色数据中包含要搜索的颜色

## 10. 测试

测试文件位于 `test/components/dcolor/dcolor.test.js`，包含以下测试用例：

- DColor组件初始化测试
- 添加颜色测试
- 获取所有颜色测试
- 搜索颜色测试
- 按色系分类测试
- 复制到剪贴板测试
- 模糊匹配算法测试
- HEX转RGB测试
- 颜色色系判断测试

## 11. 示例

完整的使用示例位于 `examples/components/dcolor/index.html`，展示了：

- 颜色选择器的基本用法
- 获取所有颜色
- 添加颜色
- 按色系分类
- 复制颜色值
- 响应式设计效果
