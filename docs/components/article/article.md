# Article 组件使用说明

## 简介

Article 组件包含两个主要部分：
- **DCArticleTopInfo**：用于显示文章顶部的信息，如发布日期、更新日期、文章字数、阅读时间和浏览量
- **DCArticleCard**：用于创建美观的文章卡片，显示文章标题、封面、摘要、作者、发布时间、浏览量等信息

## 安装与引入

### 直接引入

```html
<!-- 引入文章顶部信息组件 -->
<script src="../../src/components/article/dcarticletopinfo.js"></script>

<!-- 引入文章卡片组件 -->
<script src="../../src/components/article/dcarticlecard.js"></script>
```

### 模块引入

```javascript
// 引入文章顶部信息组件
const DCArticleTopInfo = require('../../src/components/article/dcarticletopinfo.js');

// 引入文章卡片组件
const DCArticleCard = require('../../src/components/article/dcarticlecard.js');
```

## 基本使用

### 1. 文章顶部信息组件 (DCArticleTopInfo)

#### 创建文章顶部信息实例

```javascript
const articleInfo = new DC.ArticleTopInfo(
    '2023-10-01',      // 发布日期
    '2023-10-10',      // 更新日期
    '1500 字',         // 文章字数
    '8 分钟',          // 阅读时间
    '2500 次',         // 浏览量
    '#article-info'    // 目标元素选择器
);
```

### 2. 文章卡片组件 (DCArticleCard)

#### 创建文章卡片实例

```javascript
// 准备文章数据
const articleData = [
    {
        title: '前端开发最佳实践',
        cover: 'cover.jpg',
        articleHref: 'article1.html',
        content: '本文介绍了前端开发中的一些最佳实践...',
        updateTime: '2023-10-01',
        views: '1200',
        author: '张三',
        authorLink: 'author.html',
        status: ['置顶', '热门'],
        tags: [
            { name: '前端', link: 'tag1.html' },
            { name: '最佳实践', link: 'tag2.html' }
        ]
    },
    // 更多文章...
];

// 创建文章卡片实例
const articleCard = new DC.ArticleCard({
    articleList: articleData,
    targetElement: '#article-container'
});
```

## API 参考

### DCArticleTopInfo

#### 构造函数

```javascript
new DC.ArticleTopInfo(postDateText, updateDateText, wordCountText, readDurationText, totalViewsText, targetElement)
```

- **postDateText**：发布日期文本
- **updateDateText**：更新日期文本
- **wordCountText**：字数文本
- **readDurationText**：阅读时间文本
- **totalViewsText**：总浏览量文本
- **targetElement**：目标元素选择器或元素，默认为 `document.body`

### DCArticleCard

#### 构造函数

```javascript
new DC.ArticleCard(options, targetElement)
```

- **options**：配置对象
  - **articleList**：文章列表数组，每个文章对象包含以下属性：
    - **title**：文章标题
    - **cover**：文章封面图片 URL
    - **articleHref**：文章链接
    - **content**：文章内容摘要
    - **updateTime**：更新时间
    - **views**：浏览量
    - **author**：作者
    - **authorLink**：作者链接
    - **status**：文章状态数组，如 ['置顶', '热门']
    - **tags**：文章标签数组，每个标签包含 name 和 link 属性
  - **targetElement**：目标元素选择器（可选）
- **targetElement**：目标元素，默认为 `document.body`（如果 options 中未指定）

## 样式说明

### DCArticleTopInfo 样式

- 响应式设计，适配桌面和移动设备
- 水平排列的信息项
- 包含图标和文本的组合
- 深色文本，清晰易读

### DCArticleCard 样式

- 响应式设计，适配桌面和移动设备
- 卡片式布局，带有阴影效果
- 封面图片和标题的组合
- 文章摘要的多行文本截断
- 底部的发布信息和标签

## 示例

完整的示例代码请参考 `examples/components/article/index.html` 文件。

## 浏览器兼容性

- Chrome
- Firefox
- Safari
- Edge

## 常见问题

### 1. 文章卡片不显示

**可能原因**：
- 文章数据格式不正确
- 目标元素不存在
- 图片路径错误

**解决方案**：
- 检查文章数据格式是否符合要求
- 确保目标元素存在于 DOM 中
- 验证图片路径是否正确

### 2. 样式不生效

**可能原因**：
- 组件未正确初始化
- CSS 冲突

**解决方案**：
- 确保在 DOM 加载完成后初始化组件
- 检查是否有其他 CSS 规则影响组件样式

### 3. 响应式布局问题

**解决方案**：
- 组件已内置响应式设计，确保在不同设备上测试
- 如需自定义响应式断点，可修改组件内部的媒体查询

## 自定义样式

如果需要自定义组件样式，可以：

1. 在组件初始化前添加自定义 CSS 规则
2. 覆盖组件默认的 CSS 类
3. 修改组件内部的样式定义

## 性能优化

- 对于大量文章卡片，建议使用分页或虚拟滚动
- 优化图片加载，使用适当大小的封面图片
- 避免在初始化时执行过多的 DOM 操作