## dclib

- dc库，一些通用js和组件

#### 项目结构

```
.
|— fonts/                    // 字体文件夹
|  |
|  
|— image/                    // 图片文件夹
|  |                
|  |
|  |– components/ (or modules/)   // 包含网页上的一些组件，如滑块、按钮等
|  |   |– _alerts.scss       // Alerts【网页自定义alert】
|  |   |– _buttons.scss      // Buttons【按钮组件】
|  |   |– _carousel.scss     // Carousel【旋转木马】
|  |   |– _slider.scss       // Slider【滑块】
|  |   |– _loading.scss       // Loading【加载】
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

```bash
# 安装依赖
npm install
# 更新parcel至最新版
npm install -g parcel@latest
# 打包
npm run bulid 
```