# DCHeader 组件文档

## 概述

DCHeader 是一个功能丰富的响应式头部组件，支持多种类型的头部样式，包含logo、主菜单、用户区域和搜索功能。该组件支持用户登录状态切换、响应式设计和自定义配置。

## 特性

- 支持多种头部类型（official、gaming、lib、shop、product）
- 响应式设计，适配不同屏幕尺寸
- 支持用户登录状态切换
- 内置搜索功能
- 支持下拉子菜单
- 自定义容器插入
- 自动加载和管理配置

## 安装

将 `dcheader.js` 文件引入到您的项目中：

```html
<script src="path/to/dcheader.js"></script>
```

## 基本用法

### 创建默认官方头部

```javascript
const header = new DC.Header();
```

### 创建游戏类型头部

```javascript
const header = new DC.Header({
  type: 'gaming'
});
```

### 创建已登录状态头部

```javascript
const userInfo = {
  name: {
    text: '张三',
    num: '#12345'
  },
  level: {
    text: '等级',
    num: '5'
  },
  coin: {
    text: '硬币',
    num: '100'
  },
  avatar: '/assets/images/avatar.png'
};

const header = new DC.Header({
  type: 'official',
  isLoggedIn: true,
  userInfo: userInfo
});
```

### 在自定义容器中创建头部

```javascript
const header = new DC.Header({
  type: 'official',
  selector: '#header-container'
});
```

## API 参考

### 构造函数

```javascript
new DC.Header(options)
```

#### 参数

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `options` | Object | `{}` | 配置选项对象 |
| `options.type` | String | `'official'` | 头部类型，可选值：'official'、'gaming'、'lib'、'shop'、'product' |
| `options.selector` | String | 无 | 用于选择容器元素的选择器字符串 |
| `options.isLoggedIn` | Boolean | `false` | 用户登录状态 |
| `options.userInfo` | Object | `null` | 用户信息对象 |

#### userInfo 对象结构

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `name` | Object | 用户名称对象 |
| `name.text` | String | 用户显示名称 |
| `name.num` | String | 用户编号 |
| `level` | Object | 用户等级对象 |
| `level.text` | String | 等级文本 |
| `level.num` | String | 等级数值 |
| `coin` | Object | 用户硬币对象 |
| `coin.text` | String | 硬币文本 |
| `coin.num` | String | 硬币数值 |
| `avatar` | String | 用户头像URL |

### 静态方法

#### create

快速创建 DCHeader 实例的静态方法：

```javascript
const header = DC.Header.create(options);
```

#### 参数

与构造函数相同。

#### 返回值

返回一个新的 DCHeader 实例。

### 实例方法

#### init()

初始化头部组件，加载配置、渲染界面、绑定事件和创建样式。

```javascript
await header.init();
```

#### 返回值

返回一个 Promise 对象。

#### render()

渲染头部元素并插入到指定容器或body中。

```javascript
const headerElement = header.render();
```

#### 返回值

返回渲染后的 header HTML 元素。

#### renderLogo()

渲染 logo 部分。

```javascript
const logoHTML = header.renderLogo();
```

#### 返回值

返回 logo 的 HTML 字符串。

#### renderMainMenu()

渲染主菜单部分。

```javascript
const menuHTML = header.renderMainMenu();
```

#### 返回值

返回主菜单的 HTML 字符串。

#### renderUserArea()

渲染用户区域部分，根据登录状态显示不同内容。

```javascript
const userAreaHTML = header.renderUserArea();
```

#### 返回值

返回用户区域的 HTML 字符串。

#### bindEvents()

绑定事件处理程序。

```javascript
header.bindEvents();
```

## 配置结构

DCHeader 组件依赖于全局配置对象 `window.DC.config`，其结构如下：

```javascript
window.DC.config = {
  header: {
    [type]: {
      logo: {
        link: String,  // logo链接
        src: String,   // logo图片地址
        alt: String    // logo替代文本
      },
      mainMenu: [     // 主菜单项
        {
          id: String,      // 菜单项ID
          link: String,    // 菜单项链接
          text: String,    // 菜单项文本
          hasSubmenu: Boolean,  // 是否有子菜单
          submenu: [       // 子菜单项
            {
              link: String,    // 子菜单项链接
              text: String,    // 子菜单项文本
              description: String  // 子菜单项描述
            }
          ]
        }
      ]
    }
  },
  userArea: {
    search: {
      placeholder: String  // 搜索框占位符
    },
    auth: {
      login: {
        link: String,  // 登录链接
        text: String   // 登录文本
      },
      register: {
        link: String,  // 注册链接
        text: String   // 注册文本
      }
    },
    userMenu: [    // 用户菜单
      {
        link: String,  // 菜单项链接
        icon: String,  // 菜单项图标（SVG字符串）
        text: String   // 菜单项文本
      }
    ]
  }
};
```

## 事件处理

### 内置事件

DCHeader 组件内置了以下事件处理：

1. **搜索功能**：点击搜索按钮显示搜索面板，支持回车搜索
2. **菜单切换**：在移动设备上点击菜单按钮显示/隐藏菜单
3. **子菜单切换**：点击带下拉箭头的菜单项显示/隐藏子菜单
4. **用户菜单**：点击用户头像显示/隐藏用户下拉菜单
5. **外部点击**：点击外部区域关闭打开的菜单和面板

### 自定义事件

您可以通过获取头部元素并添加自定义事件监听器来扩展功能：

```javascript
const headerElement = document.querySelector('.dc-header');
headerElement.addEventListener('click', (e) => {
  // 自定义点击事件处理
});
```

## 样式定制

DCHeader 组件会自动创建并插入所需的样式。您可以通过以下方式定制样式：

1. **修改 CSS 变量**：组件使用了 CSS 变量来定义颜色和主题，可以通过修改这些变量来定制外观

2. **覆盖样式**：在您的项目样式表中覆盖组件的默认样式

```css
/* 自定义头部背景色 */
.dc-header {
  background-color: #f5f5f5;
}

/* 自定义菜单项颜色 */
.dc-menu-item .dc-menu-link {
  color: #333;
}
```

## 响应式设计

DCHeader 组件内置了响应式设计，适配不同屏幕尺寸：

- **大屏幕**（> 1024px）：显示完整的水平菜单
- **小屏幕**（≤ 1024px）：显示汉堡菜单按钮，点击展开垂直菜单

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 常见问题

### 1. 头部不显示

**可能原因**：
- 配置对象 `window.DC.config` 未正确设置
- 选择器指定的容器不存在
- 网络错误导致配置加载失败

**解决方案**：
- 确保配置对象正确设置
- 检查选择器是否指向存在的元素
- 检查网络连接和配置文件路径

### 2. 搜索功能不工作

**可能原因**：
- 搜索按钮或输入框未正确渲染
- 事件监听器未正确绑定

**解决方案**：
- 检查组件初始化是否成功
- 确保事件绑定代码执行正常

### 3. 响应式菜单不显示

**可能原因**：
- 屏幕尺寸检测错误
- 菜单切换按钮事件未正确绑定

**解决方案**：
- 检查浏览器窗口大小
- 确保菜单切换事件监听器正确绑定

## 示例代码

### 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DCHeader 示例</title>
</head>
<body>
    <!-- 模拟配置数据 -->
    <script>
        window.DC = window.DC || {};
        window.DC.config = {
            header: {
                official: {
                    logo: {
                        link: '/',
                        src: 'https://via.placeholder.com/200x50?text=Official+Logo',
                        alt: 'Official Logo'
                    },
                    mainMenu: [
                        {
                            id: 'home',
                            link: '/',
                            text: '首页'
                        },
                        {
                            id: 'games',
                            link: '/games',
                            text: '游戏',
                            hasSubmenu: true,
                            submenu: [
                                {
                                    link: '/games/action',
                                    text: '动作游戏',
                                    description: '刺激的动作游戏'
                                },
                                {
                                    link: '/games/rpg',
                                    text: '角色扮演',
                                    description: '丰富的角色扮演游戏'
                                }
                            ]
                        },
                        {
                            id: 'about',
                            link: '/about',
                            text: '关于我们'
                        }
                    ]
                }
            },
            userArea: {
                search: {
                    placeholder: '搜索游戏、新闻...'
                },
                auth: {
                    login: {
                        link: '/login',
                        text: '登录'
                    },
                    register: {
                        link: '/register',
                        text: '注册'
                    }
                },
                userMenu: [
                    {
                        link: '/profile',
                        icon: '<svg class="icon" width="18" height="18"><path d="M9 11.3c0 1.4-1.1 2.5-2.5 2.5S4 12.7 4 11.3 5.1 8.8 6.5 8.8 9 10 9 11.3zm-2.5-6.8C8.5 5.8 11 8.6 11 11.3s-2.5 5.5-5.5 5.5S0 13 0 11.3 2.5 4.5 5.5 4.5zm8.5 3.8c-1 0-1.8 0.8-1.8 1.8s0.8 1.8 1.8 1.8 1.8-0.8 1.8-1.8-0.8-1.8-1.8-1.8zm0 5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm4-13h-2v1h-1v2h-2v1h-1v-1h-2v-2h-1v-1h1v-2h2v-1h1v1h2v2h1v1z"/></svg>',
                        text: '个人中心'
                    },
                    {
                        link: '/settings',
                        icon: '<svg class="icon" width="18" height="18"><path d="M12.9 11.3c-0.7-1-2-1.6-3.5-1.6s-2.8 0.6-3.5 1.6l-0.1 0.1c-0.4 0.5-0.6 1.1-0.6 1.8v2.3c0 0.6 0.2 1.3 0.6 1.8l0.1 0.1c0.7 1 2 1.6 3.5 1.6s2.8-0.6 3.5-1.6l0.1-0.1c0.4-0.5 0.6-1.1 0.6-1.8v-2.3c0-0.6-0.2-1.3-0.6-1.8l-0.1-0.1zM11.4 17c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2zm0-6c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z"/><path d="M19.1 1.1l-1.4 1.4c-2.9 2.9-7.6 2.9-10.5 0l-1.4-1.4c-0.4-0.4-0.4-1 0-1.4l1.4-1.4c0.4-0.4 1-0.4 1.4 0l1.4 1.4c1.7-1.7 4.5-1.7 6.2 0l1.4-1.4c0.4-0.4 1-0.4 1.4 0l1.4 1.4c0.4 0.4 0.4 1 0 1.4z"/></svg>',
                        text: '设置'
                    },
                    {
                        link: '/logout',
                        icon: '<svg class="icon" width="18" height="18"><path d="M7.4 4.5h5.2v-2h-5.2v2zM9 18c-4.9 0-9-4.1-9-9s4.1-9 9-9 9 4.1 9 9-4.1 9-9 9zm-3.3-4.5v-9h2.3l2.7 2.7 1.4-1.4-5.5-5.5h-5.2v11h5.2l5.5-5.5-1.4-1.4-2.7 2.7h-2.3z"/></svg>',
                        text: '退出登录'
                    }
                ]
            }
        };
    </script>

    <!-- 引入 DCHeader 组件 -->
    <script src="path/to/dcheader.js"></script>

    <script>
        // 创建头部
        const header = new DC.Header({
            type: 'official'
        });
    </script>
</body>
</html>
```

## 结论

DCHeader 是一个功能强大、灵活可定制的头部组件，适用于各种类型的网站。它提供了丰富的功能和良好的用户体验，同时保持了代码的可维护性和扩展性。通过本文档的指导，您应该能够轻松地在您的项目中集成和使用 DCHeader 组件。