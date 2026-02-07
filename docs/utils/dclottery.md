# dclottery

抽奖组件类 - 提供方形和圆形两种抽奖界面，支持自定义奖项数量、位置、样式等，具有动画效果和响应式布局

## 安装

将 `dclottery.js` 文件引入到项目中：

```html
<script src="path/to/dclottery.js"></script>
```

## 基本用法

### HTML 结构

```html
<div id="lottery-container"></div>
```

### JavaScript 初始化

```javascript
const lottery = new DC.Lottery({
  // 容器ID
  contentId: 'lottery-container',
  // 总奖项数量
  total: 8,
  // 奖项位置
  position: '0_0,120_0,240_0,240_120,240_240,120_240,0_240,0_120',
  // 奖项宽度和高度
  boxw: 100,
  boxh: 100,
  // 开始按钮位置和尺寸
  sbtnx: 120,
  sbtny: 120,
  sbtnw: 100,
  sbtnh: 100,
  // 开始按钮图片
  starturl: 'path/to/start-btn.png',
  // 灯光效果图片
  lighturl: 'path/to/light.png',
  // 奖品配置
  prizes: [
    { name: '一等奖', image: 'path/to/prize1.png' },
    { name: '二等奖', image: 'path/to/prize2.png' },
    { name: '三等奖', image: 'path/to/prize3.png' },
    { name: '鼓励奖', image: 'path/to/prize4.png' },
    { name: '谢谢参与', image: 'path/to/prize5.png' },
    { name: '鼓励奖', image: 'path/to/prize6.png' },
    { name: '三等奖', image: 'path/to/prize7.png' },
    { name: '二等奖', image: 'path/to/prize8.png' }
  ],
  // 点击开始按钮时的回调
  onClickRollEvent: function() {
    console.log('开始抽奖');
  },
  // 抽奖完成时的回调
  onCompleteRollEvent: function(prize) {
    console.log('抽奖完成，中奖：', prize.name);
    alert('恭喜您获得：' + prize.name);
  }
});
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `lighturl` | string | '' | 抽奖界面灯光效果图片URL |
| `starturl` | string | '' | 开始按钮图片URL |
| `width` | number | 800 | 抽奖容器宽度 |
| `height` | number | 660 | 抽奖容器高度 |
| `total` | number | 18 | 总奖项数量 |
| `sbtnx` | number | 239 | 开始按钮在容器中的X坐标 |
| `sbtny` | number | 130 | 开始按钮在容器中的Y坐标 |
| `sbtnw` | number | 320 | 开始按钮宽度 |
| `sbtnh` | number | 100 | 开始按钮高度 |
| `boxw` | number | 100 | 奖项的宽度 |
| `boxh` | number | 100 | 奖项的高度 |
| `position` | string | "0_0,128_20,238_20,..." | 奖项在容器中的位置，格式为："x1_y1,x2_y2,..." |
| `contentId` | string | 'swfcontent' | 抽奖容器ID |
| `onClickRollEvent` | function | () => {} | 点击开始按钮时触发的事件 |
| `onCompleteRollEvent` | function | () => {} | 抽奖完成时触发的事件 |
| `r` | number | null | 旋转半径 |
| `b` | string | '' | 抽奖背景图片URL |
| `s` | string | '' | 开始抽奖按钮图片URL |
| `bx` | number | 0 | 背景图片在容器中的X坐标 |
| `by` | number | 0 | 背景图片在容器中的Y坐标 |
| `sx` | number | 0 | 开始抽奖按钮在容器中的X坐标 |
| `sy` | number | 0 | 开始抽奖按钮在容器中的Y坐标 |
| `unit` | string | 'px' | 单位（px、rem、vw） |
| `isResponsive` | number | 1 | 是否响应式布局 |
| `shape` | string | 'square' | 抽奖形状（方形：square、圆形：circle） |
| `prizes` | array | [] | 奖品列表配置 |
| `prizeConfig` | object | {} | 奖品显示配置 |

### 奖品配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `fontSize` | string | '14px' | 奖品文字大小 |
| `fontColor` | string | '#333' | 奖品文字颜色 |
| `bgColor` | string | '#fff' | 奖品背景颜色 |
| `padding` | string | '10px' | 奖品内边距 |
| `textAlign` | string | 'center' | 奖品文字对齐方式 |

## API 参考

### 1. 构造函数

```javascript
const lottery = new DC.Lottery(options);
```

### 2. startLottery(index)

开始抽奖

**参数**：
- `index`：可选，指定中奖的奖品索引，不传则随机

**示例**：

```javascript
// 随机抽奖
lottery.startLottery();

// 指定中奖索引
lottery.startLottery(0); // 第一个奖品
```

### 3. disable()

禁用抽奖按钮

**返回值**：是否成功禁用

**示例**：

```javascript
const disabled = lottery.disable();
console.log(disabled); // 输出：true
```

### 4. enable()

启用抽奖按钮

**示例**：

```javascript
lottery.enable();
```

### 5. reset()

重置抽奖状态

**示例**：

```javascript
lottery.reset();
```

## 事件回调

### 1. onClickRollEvent

点击开始按钮时触发的事件

**示例**：

```javascript
const lottery = new DC.Lottery({
  // 其他配置...
  onClickRollEvent: function() {
    console.log('开始抽奖');
    // 可以在这里添加抽奖前的逻辑，如验证用户是否有抽奖机会
  }
});
```

### 2. onCompleteRollEvent

抽奖完成时触发的事件

**参数**：
- `prize`：中奖的奖品信息对象

**示例**：

```javascript
const lottery = new DC.Lottery({
  // 其他配置...
  onCompleteRollEvent: function(prize) {
    console.log('抽奖完成，中奖：', prize.name);
    alert('恭喜您获得：' + prize.name);
    // 可以在这里添加抽奖后的逻辑，如保存中奖记录等
  }
});
```

## 形状配置

### 方形抽奖

```javascript
const lottery = new DC.Lottery({
  shape: 'square',
  // 其他配置...
});
```

### 圆形抽奖

```javascript
const lottery = new DC.Lottery({
  shape: 'circle',
  // 其他配置...
});
```

## 响应式布局

组件支持响应式布局，在移动设备上会自动缩放以适应屏幕宽度：

```javascript
const lottery = new DC.Lottery({
  isResponsive: 1, // 启用响应式布局
  // 其他配置...
});
```

## 单位配置

组件支持多种单位，包括 `px`、`rem` 和 `vw`：

```javascript
const lottery = new DC.Lottery({
  unit: 'vw', // 使用视窗宽度作为单位
  // 其他配置...
});
```

## 示例

### 示例 1：基础方形抽奖

```javascript
const lottery = new DC.Lottery({
  contentId: 'lottery-container',
  total: 8,
  position: '0_0,120_0,240_0,240_120,240_240,120_240,0_240,0_120',
  boxw: 100,
  boxh: 100,
  sbtnx: 120,
  sbtny: 120,
  sbtnw: 100,
  sbtnh: 100,
  starturl: 'start-btn.png',
  lighturl: 'light.png',
  prizes: [
    { name: '一等奖' },
    { name: '二等奖' },
    { name: '三等奖' },
    { name: '鼓励奖' },
    { name: '谢谢参与' },
    { name: '鼓励奖' },
    { name: '三等奖' },
    { name: '二等奖' }
  ],
  onClickRollEvent: function() {
    console.log('开始抽奖');
  },
  onCompleteRollEvent: function(prize) {
    alert('恭喜您获得：' + prize.name);
  }
});
```

### 示例 2：圆形抽奖

```javascript
const lottery = new DC.Lottery({
  contentId: 'lottery-container',
  shape: 'circle',
  total: 6,
  position: '150_0,250_100,200_250,100_250,50_100,100_0',
  boxw: 80,
  boxh: 80,
  sbtnx: 150,
  sbtny: 150,
  sbtnw: 80,
  sbtnh: 80,
  starturl: 'start-btn.png',
  lighturl: 'light.png',
  prizes: [
    { name: '一等奖' },
    { name: '二等奖' },
    { name: '三等奖' },
    { name: '鼓励奖' },
    { name: '谢谢参与' },
    { name: '鼓励奖' }
  ],
  onClickRollEvent: function() {
    console.log('开始抽奖');
  },
  onCompleteRollEvent: function(prize) {
    alert('恭喜您获得：' + prize.name);
  }
});
```

## 浏览器兼容性

- Chrome ≥ 60
- Firefox ≥ 55
- Safari ≥ 12
- Edge ≥ 79

## 注意事项

1. 确保容器元素存在且具有唯一的ID
2. 提供有效的图片URL，特别是开始按钮和灯光效果图片
3. 正确配置奖项位置，确保位置格式为 "x1_y1,x2_y2,..."
4. 抽奖过程中会禁用开始按钮，防止重复触发
5. 响应式布局在移动设备上会自动缩放，确保配置的基础尺寸合理
6. 圆形模式下，建议使用圆形的图片和适当的位置配置

## 示例

查看 `examples/utils/dclottery/index.html` 获取交互式示例。

## 测试

运行 `npm test test/utils/dclottery/dclottery.test.js` 查看测试结果。