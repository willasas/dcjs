## dclib

- dc库，包含样式、通用js、测试文件

#### 项目结构

```
.
|— fonts/                    // 字体文件夹
|  |
|  
|— image/                    // 图片文件夹
|  |
|  
|- sass/                     // scss源文件
|  |
|  |– abstracts/ (or utilities/)   // 包含工具、助手、变量、混合等
|  |   |– _variables.scss          // Variables【全局变量】
|  |   |– _mixins.scss             // Mixins【全局混合器】
|  |   |– _function.scss           // Functions【全局函数】
|  |   |– _placeholders.scss       // Placeholders【占位符选择器】
|  |                               // etc.
|  |
|  |– base/                        // 包含重置排版等
|  |   |– _reset.scss              // Reset/normalize【页面重置样式表】
|  |   |– _typography.scss         // Typography rules【页面设计规则】
|  |   |– _animations.scss         // Animations【动画】
|  |   |– _breakpoints.scss        // Breakpoints【页面媒体查询】
|  |   |– _colors.scss             // Colors【页面颜色】
|  |   |– _filter.scss             // Filter【滤镜】
|  |   |– _graphical.scss          // Graphical【css图形绘制】
|  |   |– _shadow.scss             // Shadow【阴影投影】
|  |   |– _unitConvert.scss        // Unit Convert【单位转换】
|  |   |– _dcfont.scss             // Dcfont【字体】
|  |                               // etc.
|  |
|  |– components/ (or modules/)   // 包含网页上的一些组件，如滑块、按钮等
|  |   |– _alerts.scss       // Alerts【网页自定义alert】
|  |   |– _buttons.scss      // Buttons【按钮组件】
|  |   |– _carousel.scss     // Carousel【旋转木马】
|  |   |– _slider.scss       // Slider【滑块】
|  |   |– _loading.scss       // Loading【加载】
|  |                         // etc.
|  |
|  |– layout/                     // 包含布局样式，如页眉、页脚等
|  |   |– _header.scss       // Header【页头】
|  |   |– _footer.scss       // Footer【页脚】
|  |   |– _sidebar.scss      // Sidebar【侧边栏】
|  |   |– _navigation.scss   // Navigation【导航】
|  |   |– _forms.scss        // Forms【表单】
|  |                         // etc.
|  |
|  |– pages/                      // 页面样式
|  |   |– _home.scss         // Home specific styles【主页样式】
|  |   |– _about.scss        // About specific styles【关于我们样式】
|  |   |– _contact.scss      // Contact specific styles【联系我们样式】
|  |                         // etc.
|  |
|  |– themes/                     // 主题
|  |   |– _theme.scss        // Default theme【默认主题】
|  |   |– _admin.scss        // Admin theme【管理主题】
|  |                         // etc.
|  |
|  |– vendors/                    // 第三方库等
|  |   |– _normalize.scss    // Vendor specific【第三方库】
|  |                         // etc.
|  |
|  |– main.scss              // SCSS entry file【scss入口文件】
|
|— css/
|  |
|  |— main.css               // Compiled CSS file【编译后的css文件】
|  
|— ts/
|  |
|  |—
|
|— js/                       // 编译后的js文件
|  |
|  |—
|
|— index.html                // 主页面
|— header.html               // 头部菜单
|— footer.html               // 底部菜单&版权
|— index-test.html           // index测试页
|— temp.html                 // 临时测试文件
|
```

#### 使用方法

1. 安装scss，运行如下命令：
```bash
npm install -g sass
```

2. 安装scss编译插件Easy Sass，直接在vs code编辑器中搜索并安装。然后在vs code编辑器的设置中(即settings,json文件)配置如下代码：

```json
/** Easy Sass 插件 **/
"easysass.formats": [
  { //nested：嵌套缩进的 css 代码。//expanded：没有缩进的、扩展的css代码。//compact：简洁格式的 css 代码。//compressed：压缩后的 css 代码
    "format": "compressed", // 压缩
    "extension": ".css"
  }
],
// 自定义css输出文件路径
"easysass.targetDir": "", 
```

3. 保存修改后的设置文件

4. 编辑scss文件后保存即可自动将scss文件编译为对应的css文件，一般情况下只需要复制编译后的css文件到项目中即可。

5. 将编译后的文件复制到要使用的项目中，再引入对应的文件即可。

## 规范参考

- [css样式书写顺序及规范](https://blog.csdn.net/WangMinGirl/article/details/109013005)