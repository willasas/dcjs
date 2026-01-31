# DCFooter 组件文档

## 概述

DCFooter 是一个功能强大的页脚组件，用于在网站底部显示导航链接、社交媒体图标、主题选择和语言切换功能。该组件支持多种页脚类型、响应式布局和自定义配置。

## 功能特性

- 支持多种页脚类型（官方、游戏、资源库、商店、产品）
- 响应式设计，自动适应不同屏幕尺寸
- 内置社交媒体链接显示
- 支持主题切换功能
- 支持语言切换功能
- 可自定义容器和配置
- 平滑的动画效果
- 完善的事件处理
- 支持回调函数

## 安装和引入

### 直接引入

```html
<script src="path/to/dcfooter.js"></script>
```

### 模块化引入

```javascript
const DCFooter = require('path/to/dcfooter');
```

## 基本用法

```javascript
// 基本配置
const footerOptions = {
  container: 'main-footer',
  defaultTheme: 'light-theme',
  defaultLang: 'en-US',
  type: 'official',
  onThemeChange: (theme) => {
    console.log('Theme changed to:', theme);
  },
  onLangChange: (lang) => {
    console.log('Language changed to:', lang);
  }
};

// 初始化组件
const footer = new DC.Footer(footerOptions);
```

## API 参考

### 构造函数

```javascript
new DC.Footer(options);
```

#### 参数

- `options` (Object, 可选): 配置对象，包含以下属性：
  - `container` (String, 可选): 容器选择器或容器ID (不含#)
  - `defaultTheme` (String, 可选): 默认主题，默认为 'light-theme'
  - `defaultLang` (String, 可选): 默认语言，默认为 'zh-CN'
  - `type` (String, 可选): 页脚类型 ('official'|'gaming'|'lib'|'shop'|'product')，默认为 'official'
  - `onThemeChange` (Function, 可选): 主题切换回调函数
  - `onLangChange` (Function, 可选): 语言切换回调函数

### 方法

#### init()

异步初始化方法，加载配置、创建样式和元素、绑定事件以及设置主题和语言。

#### loadConfig()

异步加载配置方法，从全局DC对象或服务器加载配置文件。

#### createStyle()

创建组件所需的CSS样式。

#### createElements()

创建组件的DOM元素。

#### bindEvents()

绑定事件监听器，处理点击事件和键盘事件。

#### closeAllDropdowns()

关闭所有下拉菜单。

#### setLanguage(lang, isInit)

设置语言。
- `lang` (String): 语言代码
- `isInit` (Boolean, 可选): 是否是初始化调用

#### setTheme(theme, isInit)

设置主题。
- `theme` (String): 主题名称
- `isInit` (Boolean, 可选): 是否是初始化调用

#### renderSocialLinks()

渲染社交媒体链接。

#### renderThemeSelector()

渲染主题选择器。

#### renderLanguageSelector()

渲染语言选择器。

#### renderFooterColumns()

渲染页脚栏目。

#### renderOfficialColumns(config)

渲染官方页脚栏目。
- `config` (Object): 配置数据

#### renderGamingColumns(config)

渲染游戏页脚栏目。
- `config` (Object): 配置数据

#### renderLibColumns(config)

渲染资源库页脚栏目。
- `config` (Object): 配置数据

#### renderShopColumns(config)

渲染商店页脚栏目。
- `config` (Object): 配置数据

#### renderProductColumns(config)

渲染产品页脚栏目。
- `config` (Object): 配置数据

## 配置说明

组件需要以下配置数据：

### 全局DC配置

```javascript
window.DC = {
  config: {
    languages: [
      { langCode: 'en-US', langCNName: 'English' },
      { langCode: 'zh-CN', langCNName: '中文' }
    ],
    themes: [
      { name: 'light-theme', value: 'Light' },
      { name: 'dark-theme', value: 'Dark' }
    ],
    follow: {
      local: [
        {
          link: 'https://www.facebook.com',
          text: 'Facebook',
          hoverText: 'Follow us on Facebook',
          icon: '<svg>...</svg>'
        }
        // 更多社交媒体链接...
      ]
    },
    termsOfUse: {
      link: '#',
      text: 'Terms of Use',
      CNText: '使用条款'
    },
    privacyPolicy: {
      link: '#',
      text: 'Privacy Policy',
      CNText: '隐私政策'
    },
    cookie: {
      link: '#',
      text: 'Cookie Policy',
      CNText: 'Cookie政策'
    },
    copyright: {
      text: '© 2023 Company. All rights reserved.',
      CNText: '© 2023 公司。保留所有权利。'
    },
    footer: {
      official: {
        Community: [
          { link: '#', text: 'Forums' }
          // 更多链接...
        ],
        // 更多栏目...
      },
      // 更多页脚类型...
    }
  }
};
```

## 样式说明

组件会自动创建以下CSS样式：

- `.dc-footer`: 容器样式
- `.common-footer`: 通用页脚样式
- `.footer-normal`: 页脚内容样式
- `.footer-group`: 页脚组样式
- `.social`: 社交媒体样式
- `.themes`: 主题选择样式
- `.languages`: 语言选择样式
- `.social-inner`: 社交媒体链接容器样式
- `.social-item`: 社交媒体链接项样式
- `.social-link`: 社交媒体链接样式
- `.dc-dropdown`: 下拉菜单样式
- `.dc-dropdown-trigger`: 下拉菜单触发器样式
- `.dc-dropdown-menu`: 下拉菜单列表样式
- `.dc-dropdown-item`: 下拉菜单项样式
- `.footer-column-lists`: 页脚栏目列表样式
- `.column`: 页脚栏目样式
- `.privacy-and-copyright`: 隐私和版权样式

## 响应式设计

组件使用CSS媒体查询实现响应式设计：

- 大屏幕 (min-width: 1025px): 水平排列的页脚组
- 中等屏幕 (max-width: 1024px): 垂直排列的页脚组，自动调整间距和大小

## 事件处理

组件处理以下事件：

- `click`: 处理下拉菜单的显示/隐藏和选项选择
- `keydown`: 处理键盘事件，支持Enter和Space键选择选项

## 示例

### 示例 1: 基本用法

```javascript
const footerOptions = {
  container: 'main-footer',
  defaultTheme: 'light-theme',
  defaultLang: 'en-US',
  type: 'official'
};

const footer = new DC.Footer(footerOptions);
```

### 示例 2: 自定义容器

```javascript
const customContainerOptions = {
  container: '#custom-footer',
  defaultTheme: 'dark-theme',
  defaultLang: 'zh-CN',
  type: 'gaming'
};

const customFooter = new DC.Footer(customContainerOptions);
```

### 示例 3: 动态主题和语言切换

```javascript
const dynamicFooterOptions = {
  defaultTheme: 'light-theme',
  defaultLang: 'en-US',
  type: 'official',
  onThemeChange: (theme) => {
    console.log('Theme changed to:', theme);
  },
  onLangChange: (lang) => {
    console.log('Language changed to:', lang);
  }
};

const dynamicFooter = new DC.Footer(dynamicFooterOptions);

// 稍后切换主题
dynamicFooter.setTheme('dark-theme');

// 稍后切换语言
dynamicFooter.setLanguage('zh-CN');
```

### 示例 4: 不同页脚类型

```javascript
// 游戏页脚
const gamingFooter = new DC.Footer({
  type: 'gaming'
});

// 商店页脚
const shopFooter = new DC.Footer({
  type: 'shop'
});

// 产品页脚
const productFooter = new DC.Footer({
  type: 'product'
});
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 性能优化

- 使用文档片段减少DOM操作
- 优化CSS选择器
- 使用事件委托减少事件监听器数量
- 支持异步加载配置

## 错误处理

- 当配置不存在时，会尝试从服务器加载
- 当配置数据无效时，会抛出错误
- 当语言或主题不存在时，会输出错误信息

## 扩展和定制

### 自定义样式

可以通过覆盖CSS变量来自定义组件样式：

```css
:root {
  --bg-theme-50: #f5f5f5;
  --bg-theme-500: #6b7280;
  --bg-theme-600: #4b5563;
  --bg-theme-700: #374151;
  --bg-theme-800: #1f2937;
  --font-theme-50: #f5f5f5;
  --font-theme-950: #111827;
  --color-primary-bg: #3b82f6;
}
```

### 自定义页脚类型

可以通过扩展配置对象来添加自定义页脚类型：

```javascript
window.DC.config.footer.custom = {
  CustomSection: [
    { link: '#', text: 'Custom Link 1' },
    { link: '#', text: 'Custom Link 2' }
  ],
  AnotherSection: [
    { link: '#', text: 'Another Link 1' },
    { link: '#', text: 'Another Link 2' }
  ]
};

// 然后创建对应的渲染方法
DCFooter.prototype.renderCustomColumns = function(config) {
  return `
    <li class="column">
      <h3 class="footer-label">Custom Section</h3>
      <ul class="custom-inner">
        ${config.CustomSection.map(item => `
          <li class="custom-item">
            <a href="${item.link}" class="custom-link">${item.text}</a>
          </li>
        `).join('')}
      </ul>
    </li>
    <!-- 更多栏目... -->
  `;
};
```

## 测试

组件包含完整的测试用例，测试文件位于 `test/components/footer/footer.test.js`，涵盖以下测试场景：

- 初始化测试
- 容器创建测试
- 配置加载测试
- 样式创建测试
- 元素创建测试
- 事件绑定测试
- 主题设置测试
- 语言设置测试
- 自定义容器测试
- 下拉菜单测试
- 不同页脚类型测试
- 错误处理测试

## 总结

DCFooter 组件是一个功能强大、灵活可定制的页脚组件，它提供了以下特性：

- 多种页脚类型支持
- 响应式设计
- 内置社交媒体链接
- 主题和语言切换功能
- 完善的事件处理
- 可自定义配置
- 平滑的动画效果
- 完整的测试覆盖

该组件适用于各种类型的网站，为用户提供统一、美观的页脚体验。