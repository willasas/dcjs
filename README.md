## dclib

- dc库，一些通用js和组件

### 主要组件

#### DCProductivitySlider - 现代化生产力滑块组件
一个功能丰富的滑块组件，适用于展示项目、产品、图片等内容，提供流畅的切换动画和响应式设计。

**主要特性：**
- 自动播放、触摸滑动、键盘导航
- 链接支持 - 卡片按钮支持外部链接和内部锚点
- 响应式设计，支持移动端和桌面端
- 丰富的回调函数支持

**详细文档：** [docs/dcproductivityslider.md](./docs/dcproductivityslider.md)

#### DcAdapt - 页面适配工具
用于处理页面适配的工具类，支持一屏适配和长页面适配，提供 px、rem、vw/vh 三种适配单位的支持。

**详细文档：** [docs/dcadapt.md](./docs/dcadapt.md)

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