# 组件

DCJS 工具库提供了丰富的前端组件，涵盖了表单、UI、布局和功能等多个类别。这些组件设计简洁、使用方便，旨在提高开发效率和用户体验。

## 组件分类

### 表单组件
- [signin](./signin/signin) - 登录组件
- [signup](./signup/signup) - 注册组件
- [resetpassword](./resetpassword/resetpassword) - 密码重置组件
- [dcfileupload](./dcfileupload/dcfileupload) - 文件上传组件
- [dcfilter](./dcfilter/dcfilter) - 过滤器组件
- [dcdateselector](./dcdateselector/dcdateselector) - 日期选择器组件

### UI组件
- [dcProgressBar](./dcprogressbar/dcProgressBar) - 进度条组件
- [dcslider](./dcslider/dcslider) - 滑块组件
- [dcpopup](./popup/dcpopup) - 弹窗组件
- [dcsearch](./dcsearch/dcsearch) - 搜索组件
- [dcsidebar](./dcsidebar/dcsidebar) - 侧边栏组件
- [dcsidenav](./dcsidenav/dcsidenav) - 侧边导航组件
- [dcvirtualcard](./dcvirtualcard/dcvirtualcard) - 虚拟卡片组件
- [dcvirtualscroller](./dcvirtualscroller/dcvirtualscroller) - 虚拟滚动组件
- [dcpager](./pager/dcpager) - 分页组件
- [dcanswer](./dcanswer/dcanswer) - 问答组件
- [dcbottombar](./dcbottombar/dcbottombar) - 底部栏组件
- [dctopbar](./dctopbar/dctopbar) - 顶部栏组件
- [dciconlist](./icons/dciconlist) - 图标列表组件

### 布局组件
- [dcheader](./header/dcheader) - 头部组件
- [dcfooter](./footer/dcfooter) - 底部组件
- [dcsidebar](./dcsidebar/dcsidebar) - 侧边栏组件
- [dcsidenav](./dcsidenav/dcsidenav) - 侧边导航组件

### 功能组件
- [dcanimator](./animate/dcanimator) - 动画组件
- [article](./article/article) - 文章组件
- [bgm](./bgm/bgm) - 背景音乐组件
- [cookies](./cookies/cookies) - Cookie 提示组件
- [dcity](./dcity/dcity) - 城市选择组件
- [dclocal](./dclocal/dclocal) - 本地存储组件
- [dcolor](./dcolor/dcolor) - 颜色选择器组件
- [dcpartner](./dcpartner/dcpartner) - 合作伙伴组件
- [dcpricing](./dcpricing/dcpricing) - 价格表组件
- [dcproductivityslider](./dcproductivityslider/dcproductivityslider) - 生产力滑块组件
- [dctheme](./dctheme/dctheme) - 主题切换组件
- [designby](./designby/designby) - 设计信息组件
- [dcfollowus](./followus/dcfollowus) - 关注我们组件

## 使用示例

### 基础使用

```html
<!-- 引入 DCJS 工具库 -->
<script src="dist/dc-latest.js"></script>

<!-- 登录组件示例 -->
<div class="sign-in-container">
  <form class="sign-in-form">
    <div class="sign-in-inner">
      <!-- 左侧登录表单 -->
      <div class="main-login-container">
        <div class="login-header">
          <h1 class="login-heading-title">欢迎回来！</h1>
          <p class="login-heading-text">很高兴再次见到您！</p>
        </div>
        <div class="login-body">
          <!-- 邮箱/电话输入 -->
          <div class="login-item">
            <label class="label-name" for="uid">
              电子邮箱地址或电话号码
              <span class="required">*</span>
            </label>
            <div class="login-input">
              <div class="input-wrapper">
                <input class="input-user-name" id="uid" name="email" type="text" placeholder="Input Email address or phone number" required>
              </div>
            </div>
          </div>

          <!-- 密码输入 -->
          <div class="login-item">
            <label class="label-password" for="pid">
              密码
              <span class="required">*</span>
            </label>
            <div class="login-input">
              <input class="input-password" id="pid" name="password" type="password" placeholder="Input Password" required>
            </div>
          </div>

          <button type="button" class="forgot-password">忘记密码？</button>
          <button type="submit" class="sign-in-submit">登录</button>
          <div class="login-need-account">
            <span class="need-account">还没有账号?</span>
            <a href="#" class="register-link">立即注册</a>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>

<script>
// 表单提交处理
document.querySelector('.sign-in-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('uid').value;
  const password = document.getElementById('pid').value;

  if (!email || !password) {
    alert('请填写所有必填字段');
    return;
  }

  // 登录逻辑
  console.log('登录:', { email, password });
});
</script>
```

### 进度条组件示例

```html
<!-- 进度条容器 -->
<div id="progress-container"></div>

<script>
// 创建进度条实例
const progressBar = new DC.ProgressBar({
  container: '#progress-container',
  value: 30,
  max: 100,
  color: '#4CAF50',
  showText: true
});

// 更新进度
setInterval(() => {
  progressBar.setValue((progressBar.getValue() + 10) % 100);
}, 1000);
</script>
```

### 弹窗组件示例

```html
<!-- 弹窗触发器 -->
<button id="open-popup">打开弹窗</button>

<!-- 弹窗容器 -->
<div id="popup-container"></div>

<script>
// 创建弹窗实例
const popup = new DC.Popup({
  container: '#popup-container',
  title: '提示',
  content: '这是一个弹窗示例',
  buttons: [
    {
      text: '取消',
      className: 'btn-cancel',
      callback: function() {
        popup.hide();
      }
    },
    {
      text: '确定',
      className: 'btn-confirm',
      callback: function() {
        console.log('用户点击了确定');
        popup.hide();
      }
    }
  ]
});

// 打开弹窗
document.getElementById('open-popup').addEventListener('click', function() {
  popup.show();
});
</script>
```

## 下载

### 最新版本

- **JavaScript 版本**: [dc-latest.js](https://example.com/dist/dc-latest.js)
- **TypeScript 版本**: [dc-ts-latest.js](https://example.com/dist/dc-ts-latest.js)

### 历史版本

请访问 [GitHub Releases](https://github.com/yourusername/dcjs/releases) 下载历史版本。

## 使用建议

1. **按需引入**: 虽然 DCJS 工具库支持全局引入，但在大型项目中，建议按需引入所需的组件，以减少打包体积。

2. **版本管理**: 建议在项目中固定使用特定版本的 DCJS 工具库，以避免因版本更新导致的兼容性问题。

3. **样式定制**: 组件默认样式可能不满足所有需求，建议根据项目设计规范进行适当的样式定制。

4. **性能优化**: 对于频繁使用的组件，建议使用虚拟滚动等技术，以提高渲染性能。

5. **错误处理**: 在使用组件时，建议添加适当的错误处理，以提高应用的稳定性。

6. **贡献代码**: 如果您发现了 bug 或有新的功能建议，欢迎贡献代码或提交 issue。

## 浏览器兼容性

DCJS 组件兼容所有现代浏览器：

- Chrome ≥ 45
- Firefox ≥ 40
- Safari ≥ 9
- Edge ≥ 12

对于旧版浏览器，可能需要添加适当的 polyfill 和样式兼容。
