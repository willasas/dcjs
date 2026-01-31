# dclocal组件使用说明

## 1. 组件介绍

dclocal组件是一个用于处理多语言切换和本地化功能的组件，包含以下主要功能：

- 多语言切换和管理
- 语言选择器UI组件
- 国家和地区信息管理
- 语言相关的工具方法

## 2. 目录结构

```
src/components/dclocal/
├── dclang.js          # 多语言处理核心类
├── dclangselector.js  # 语言选择器组件
├── dclocal.css        # 样式文件
├── dclocal.scss       # SCSS源文件
├── dclocalselector.js # 本地化选择器
├── dcphoneselector.js # 电话选择器
├── languages.json     # 语言数据
└── local.json         # 本地化数据
```

## 3. 核心类 - DCLang

### 3.1 构造函数

```javascript
const dcLang = new DC.Lang({
  defaultLang: 'zh-CN',  // 默认语言代码
  fallbackLang: 'en-US', // 回退语言代码
  displayLangs: ['zh-CN', 'en-US', 'ja-JP'] // 指定显示的语言列表
});
```

### 3.2 主要方法

#### 3.2.1 switchLanguage(langCode)

切换语言

**参数**：
- `langCode` (string): 目标语言代码

**返回值**：
- (boolean): 切换是否成功

**示例**：
```javascript
const success = dcLang.switchLanguage('en-US');
console.log('语言切换成功:', success);
```

#### 3.2.2 getCurrentLang()

获取当前语言代码

**返回值**：
- (string): 当前语言代码

**示例**：
```javascript
const currentLang = dcLang.getCurrentLang();
console.log('当前语言:', currentLang);
```

#### 3.2.3 getAvailableLangs()

获取可用的语言列表

**返回值**：
- (Array): 可用的语言代码列表

**示例**：
```javascript
const availableLangs = dcLang.getAvailableLangs();
console.log('可用语言:', availableLangs);
```

#### 3.2.4 getLanguageOptions()

获取语言选项列表

**返回值**：
- (Array): 语言选项列表，每个选项包含code和name属性

**示例**：
```javascript
const options = dcLang.getLanguageOptions();
console.log('语言选项:', options);
```

#### 3.2.5 getMainLanguageOptions()

获取主流语言选项列表

**返回值**：
- (Array): 主流语言选项列表

**示例**：
```javascript
const mainOptions = dcLang.getMainLanguageOptions();
console.log('主流语言选项:', mainOptions);
```

#### 3.2.6 getAllLanguageOptions()

获取所有语言选项列表

**返回值**：
- (Array): 所有语言选项列表

**示例**：
```javascript
const allOptions = dcLang.getAllLanguageOptions();
console.log('所有语言选项:', allOptions);
```

#### 3.2.7 getCountriesByCurrentLang()

获取当前语言的国家列表

**返回值**：
- (Array): 当前语言的国家列表

**示例**：
```javascript
const countries = dcLang.getCountriesByCurrentLang();
console.log('国家列表:', countries);
```

#### 3.2.8 getCountryByCode(countryCode)

根据国家代码获取国家信息

**参数**：
- `countryCode` (string): 国家代码

**返回值**：
- (Object|null): 国家信息对象或null

**示例**：
```javascript
const china = dcLang.getCountryByCode('CN');
console.log('中国信息:', china);
```

#### 3.2.9 getCountriesByArea(area)

根据区域获取国家列表

**参数**：
- `area` (string): 区域名称

**返回值**：
- (Array): 指定区域的国家列表

**示例**：
```javascript
const asianCountries = dcLang.getCountriesByArea('Asia');
console.log('亚洲国家:', asianCountries);
```

#### 3.2.10 searchCountries(keyword)

搜索国家

**参数**：
- `keyword` (string): 搜索关键词

**返回值**：
- (Array): 匹配的国家列表

**示例**：
```javascript
const results = dcLang.searchCountries('中');
console.log('搜索结果:', results);
```

## 4. 语言选择器组件 - DCLanguageSelector

### 4.1 构造函数

```javascript
const languageSelector = new DC.LanguageSelector({
  dcLang: dcLang,         // DCLang实例
  container: '#container', // 容器选择器
  onChange: function(langCode) { // 语言切换回调
    console.log('语言已切换:', langCode);
  }
});
```

### 4.2 主要功能

- 下拉菜单式语言选择
- 常用语言和全部语言切换
- 语言搜索功能
- 响应式设计，适配移动端
- 自动更新当前选中语言

## 5. 事件

### 5.1 languagechange

语言切换时触发的事件

**示例**：
```javascript
document.addEventListener('languagechange', function(event) {
  console.log('语言切换事件:', event.detail);
  // event.detail包含以下属性：
  // - langCode: 当前语言代码
  // - success: 切换是否成功
});
```

## 6. 数据文件

### 6.1 languages.json

语言数据文件，包含语言代码、语言名称等信息

### 6.2 local.json

本地化数据文件，包含国家和地区信息

## 7. 使用示例

### 7.1 基本用法

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多语言示例</title>
</head>
<body>
    <div id="language-selector"></div>
    
    <script src="path/to/dclang.js"></script>
    <script src="path/to/dclangselector.js"></script>
    
    <script>
        // 初始化DCLang
        const dcLang = new DC.Lang({
            defaultLang: 'zh-CN',
            fallbackLang: 'en-US'
        });
        
        // 初始化语言选择器
        const languageSelector = new DC.LanguageSelector({
            dcLang,
            container: '#language-selector',
            onChange: function(langCode) {
                console.log('语言已切换:', langCode);
            }
        });
        
        // 监听语言切换事件
        document.addEventListener('languagechange', function(event) {
            console.log('语言切换事件:', event.detail);
        });
    </script>
</body>
</html>
```

### 7.2 高级用法

```javascript
// 初始化DCLang
const dcLang = new DC.Lang({
  defaultLang: 'zh-CN',
  fallbackLang: 'en-US',
  displayLangs: ['zh-CN', 'en-US', 'ja-JP', 'ko-KR']
});

// 等待数据加载完成
dcLang.dataLoaded.then(success => {
  if (success) {
    console.log('数据加载成功');
    
    // 获取主流语言选项
    const mainOptions = dcLang.getMainLanguageOptions();
    console.log('主流语言:', mainOptions);
    
    // 获取所有语言选项
    const allOptions = dcLang.getAllLanguageOptions();
    console.log('所有语言:', allOptions);
    
    // 获取国家列表
    const countries = dcLang.getCountriesByCurrentLang();
    console.log('国家列表:', countries);
  } else {
    console.error('数据加载失败');
  }
});

// 切换语言
dcLang.switchLanguage('ja-JP');
```

## 8. 响应式设计

语言选择器组件支持响应式设计，在不同屏幕尺寸下会自动调整：

- **桌面端**：显示完整的语言选择器，包含语言名称和下拉箭头
- **移动端**：只显示地球图标，点击后展开完整的选择菜单

## 9. 注意事项

1. **数据加载**：DCLang类会在初始化时异步加载语言和国家数据，使用前请确保数据已加载完成
2. **语言代码**：使用标准的语言代码格式，如 'zh-CN'、'en-US' 等
3. **浏览器兼容性**：支持所有现代浏览器，IE11及以下可能需要polyfill
4. **性能优化**：语言选择器组件使用了事件委托和防抖处理，确保在大量语言选项时仍保持良好性能

## 10. 常见问题

### 10.1 语言切换失败

**原因**：
- 语言代码不存在
- 数据加载失败

**解决方案**：
- 检查语言代码是否正确
- 确保数据文件路径正确
- 监听languagechange事件，查看详细错误信息

### 10.2 语言选择器不显示

**原因**：
- 容器选择器不正确
- 数据加载失败

**解决方案**：
- 检查容器选择器是否正确
- 确保数据文件存在且可访问
- 查看浏览器控制台是否有错误信息

### 10.3 响应式布局问题

**原因**：
- CSS样式冲突

**解决方案**：
- 检查是否有其他CSS样式影响了语言选择器
- 确保CSS文件正确加载

## 11. 测试

测试文件位于 `test/components/dclocal/dclocal.test.js`，包含以下测试用例：

- DCLang类初始化测试
- 语言切换功能测试
- 语言获取方法测试
- 国家信息获取测试
- 语言选择器组件测试

## 12. 示例

完整的使用示例位于 `examples/components/dclocal/index.html`，展示了：

- 语言选择器的基本用法
- 语言切换功能
- 各种API方法的使用
- 事件监听
