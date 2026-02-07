# DCity 组件

## 1. 组件介绍

DCity 是一个功能强大的省市区选择器组件，支持三级联动选择、数据加载、地址预设等功能。它使用 JSON 文件存储城市数据，支持自定义数据来源，提供了丰富的 API 接口，可以满足各种地址选择场景的需求。

### 1.1 主要功能

- 省市区三级联动选择
- 支持从 JSON 文件加载城市数据
- 支持预设地址
- 支持获取完整的地址信息（包括行政区划代码）
- 支持根据行政区划代码获取地址信息
- 支持获取指定地区的所有下级地区
- 响应式设计，适配不同屏幕尺寸
- 丰富的回调函数

### 1.2 应用场景

- 电商网站的收货地址选择
- 表单中的地址填写
- 地理位置相关的应用
- 任何需要省市区选择的场景

## 2. API 文档

### 2.1 构造函数

```javascript
new DC.DCity(options)
```

#### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| options | Object | {} | 配置选项 |
| options.container | String | 无 | 容器选择器，必须提供 |
| options.jsonPath | String | 无 | 城市数据 JSON 文件路径，必须提供 |
| options.onChange | Function | null | 地址变更回调函数 |

### 2.2 方法

#### getValue()

获取当前选择的地址。

**返回值**：
- Object: 当前地址对象
  - province: String - 省份名称
  - city: String - 城市名称
  - area: String - 区县名称

#### setValue(address)

设置选中的地址。

**参数**：
- address: Object - 地址对象
  - province: String - 省份名称
  - city: String - 城市名称
  - area: String - 区县名称

#### getFullAddress()

获取完整的地址信息，包括行政区划代码。

**返回值**：
- Object|null: 完整地址信息对象或 null（未选择完整地址时）
  - province: Object - 省份信息
    - name: String - 省份名称
    - code: String - 行政区划代码
  - city: Object - 城市信息（可选）
    - name: String - 城市名称
    - code: String - 行政区划代码
  - area: Object - 区县信息（可选）
    - name: String - 区县名称
    - code: String - 行政区划代码
    - fullName: String - 完整地址名称

#### getAddressByCode(code)

根据行政区划代码获取地址信息。

**参数**：
- code: String - 行政区划代码

**返回值**：
- Object|null: 地址信息对象或 null（未找到时）
  - province: String - 省份名称
  - city: String - 城市名称（可选）
  - area: String - 区县名称（可选）
  - fullName: String - 完整地址名称（可选）

#### getChildrenByCode(code)

获取指定地区的所有下级地区。

**参数**：
- code: String - 行政区划代码

**返回值**：
- Array: 下级地区列表

### 2.3 属性

#### dataLoaded

数据加载完成的 Promise 对象。

**类型**：Promise
**说明**：可以通过 `await dcity.dataLoaded` 等待数据加载完成

## 3. 使用示例

### 3.1 基本使用

```javascript
// 引入 DCity
// <script src="path/to/dcity.js"></script>

// 初始化省市区选择器
const citySelector = new DC.DCity({
    container: '#address-container',
    jsonPath: 'city-data.json',
    onChange: (address) => {
        console.log('选择的地址:', address);
        // 可以在这里处理选择结果，如更新 UI 或提交表单
    }
});
```

### 3.2 获取完整地址信息

```javascript
// 初始化省市区选择器
const citySelector = new DC.DCity({
    container: '#address-container',
    jsonPath: 'city-data.json'
});

// 等待数据加载完成
citySelector.dataLoaded.then(() => {
    // 获取完整地址信息
    const fullAddress = citySelector.getFullAddress();
    if (fullAddress) {
        console.log('完整地址信息:', fullAddress);
        // 省份信息
        console.log('省份:', fullAddress.province.name, '代码:', fullAddress.province.code);
        // 城市信息
        if (fullAddress.city) {
            console.log('城市:', fullAddress.city.name, '代码:', fullAddress.city.code);
        }
        // 区县信息
        if (fullAddress.area) {
            console.log('区县:', fullAddress.area.name, '代码:', fullAddress.area.code);
            console.log('完整名称:', fullAddress.area.fullName);
        }
    }
});
```

### 3.3 预设地址

```javascript
// 初始化省市区选择器
const citySelector = new DC.DCity({
    container: '#address-container',
    jsonPath: 'city-data.json'
});

// 等待数据加载完成后预设地址
citySelector.dataLoaded.then(() => {
    // 预设地址
    citySelector.setValue({
        province: '北京市',
        city: '北京市',
        area: '东城区'
    });
    console.log('地址已预设');
});
```

### 3.4 根据行政区划代码获取地址

```javascript
// 初始化省市区选择器
const citySelector = new DC.DCity({
    container: '#address-container',
    jsonPath: 'city-data.json'
});

// 等待数据加载完成
citySelector.dataLoaded.then(() => {
    // 根据行政区划代码获取地址
    const address = citySelector.getAddressByCode('110101');
    if (address) {
        console.log('根据代码获取的地址:', address);
    }
});
```

### 3.5 获取下级地区

```javascript
// 初始化省市区选择器
const citySelector = new DC.DCity({
    container: '#address-container',
    jsonPath: 'city-data.json'
});

// 等待数据加载完成
citySelector.dataLoaded.then(() => {
    // 获取北京市的所有城市（区）
    const cities = citySelector.getChildrenByCode('110000');
    console.log('北京市的城市（区）:', cities);
});
```

## 4. 数据格式

### 4.1 JSON 数据格式

DCity 使用 JSON 文件存储城市数据，数据格式如下：

```json
{
  "北京市": {
    "code": "110000",
    "city": {
      "北京市": {
        "code": "110100",
        "country": {
          "东城区": { "code": "110101" },
          "西城区": { "code": "110102" },
          "朝阳区": { "code": "110105" }
        }
      }
    }
  },
  "上海市": {
    "code": "310000",
    "city": {
      "上海市": {
        "code": "310100",
        "country": {
          "黄浦区": { "code": "310101" },
          "徐汇区": { "code": "310104" },
          "长宁区": { "code": "310105" }
        }
      }
    }
  }
}
```

### 4.2 数据字段说明

- **顶级键**：省份名称
- **code**：行政区划代码
- **city**：城市对象，键为城市名称
- **country**：区县对象，键为区县名称

## 5. 样式说明

### 5.1 默认样式

DCity 会自动创建以下默认样式：

```css
.dc-city-selector { width: 100%; min-width: 280px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; }
.dc-city-selector .dc-city-selects { display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap; flex-direction: column; gap: 10px; }
.dc-city-selector .dc-city-selects select { flex: 1; padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; width: 100%; }
.dc-city-selector .dc-city-selects select::-webkit-scrollbar { width: 8px; background-color: #f5f5f5; }
.dc-city-selector .dc-city-selects select::-webkit-scrollbar-thumb { border-radius: 4px; background-color: #ccc; }
.dc-city-selector .dc-city-selects select::-webkit-scrollbar-thumb:hover { background-color: #000000; }
.dc-city-selector .dc-city-selects select::-webkit-scrollbar-track { border-radius: 4px; background-color: #f5f5f5; }
.dc-city-selector .dc-city-selects select:disabled { background: #f5f5f5; cursor: not-allowed; color: #999; }
.dc-city-selector .dc-city-selects select:focus { border-color: #666; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2); }
.dc-city-selector .dc-city-selects select option { padding: 8px 16px; color: #000; background: #fff; }
.dc-city-selector .dc-city-selects select option:hover, .dc-city-selector .dc-city-selects select option:focus { background: #fca607; color: #616161; }
.dc-city-selector .dc-street-input { margin-top: 10px; width: 100%; box-sizing: border-box; padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; }
.dc-city-selector .dc-street-input:focus { border-color: #666; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2); }

@media screen and (max-width: 1024px) { 
    .dc-city-selector .dc-city-selects select { padding: 8px 14px; } 
}
```

### 5.2 自定义样式

如果需要自定义样式，可以通过覆盖默认 CSS 类来实现：

```css
/* 自定义选择器容器样式 */
.dc-city-selector {
    max-width: 500px;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
}

/* 自定义选择框样式 */
.dc-city-selector .dc-city-selects select {
    font-size: 16px;
    padding: 10px 20px;
    border-color: #1890ff;
}

/* 自定义输入框样式 */
.dc-city-selector .dc-street-input {
    font-size: 16px;
    padding: 10px 20px;
    border-color: #1890ff;
}

/* 自定义聚焦样式 */
.dc-city-selector .dc-city-selects select:focus,
.dc-city-selector .dc-street-input:focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.3);
}
```

## 6. 最佳实践

### 6.1 性能优化

- **使用适当的 JSON 文件**：使用精简的 JSON 文件，只包含必要的城市数据，以减少加载时间。
- **缓存城市数据**：如果页面中多次使用省市区选择器，可以考虑缓存城市数据，避免重复加载。
- **合理处理数据加载**：使用 `dataLoaded` Promise 等待数据加载完成后再进行操作，避免因数据未加载完成导致的错误。

### 6.2 数据管理

- **定期更新城市数据**：城市数据可能会发生变化（如行政区划调整），应定期更新 JSON 文件。
- **使用标准的行政区划代码**：使用国家统计局发布的最新行政区划代码，确保数据的准确性。
- **考虑使用 CDN**：对于大型应用，可以考虑将城市数据 JSON 文件托管在 CDN 上，以提高加载速度。

### 6.3 无障碍性

- 所有选择框都有适当的标签和描述。
- 支持键盘导航和屏幕阅读器。
- 聚焦状态有明显的视觉反馈。
- 错误信息有明确的提示。

### 6.4 常见问题

#### 问题：城市数据加载失败

**可能原因**：
- JSON 文件路径不正确。
- JSON 文件格式错误。
- 网络连接问题。

**解决方案**：
- 检查 JSON 文件路径是否正确。
- 验证 JSON 文件格式是否正确。
- 检查网络连接是否正常。

#### 问题：选择框显示异常

**可能原因**：
- CSS 样式冲突。
- 容器大小不合适。

**解决方案**：
- 检查是否有 CSS 样式冲突。
- 确保容器有足够的空间显示选择框。

#### 问题：预设地址不生效

**可能原因**：
- 数据未加载完成就调用了 `setValue` 方法。
- 地址信息不正确。

**解决方案**：
- 使用 `dataLoaded` Promise 等待数据加载完成后再调用 `setValue` 方法。
- 确保地址信息与 JSON 文件中的数据一致。

## 7. 版本历史

### 1.0.0

- 初始版本
- 支持省市区三级联动选择
- 支持从 JSON 文件加载城市数据
- 支持预设地址
- 支持获取完整的地址信息
- 支持根据行政区划代码获取地址信息
- 支持获取指定地区的所有下级地区
- 响应式设计，适配不同屏幕尺寸

## 8. 贡献指南

如果您发现了 bug 或有新的功能建议，欢迎提交 issue 或 pull request。

### 开发流程

1. Fork 本仓库
2. 创建 feature 分支
3. 提交代码
4. 运行测试
5. 提交 pull request

### 代码规范

- 遵循 ES6 语法规范
- 代码风格保持一致
- 为新功能添加测试用例
- 为新功能添加文档

## 9. 许可证

DCity 组件采用 MIT 许可证，详见 [LICENSE](../../LICENSE.md) 文件。
