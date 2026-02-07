# Signin Component

## 1. 组件概述

Signin组件是一个功能完整的登录表单组件，支持以下特性：
- 邮箱或电话号码登录
- 密码输入和验证
- 忘记密码功能
- 社交账号登录（QQ、微信、Facebook、Google）
- 二维码登录
- 响应式设计，适配不同屏幕尺寸
- 表单验证和错误提示
- 国家/地区代码选择器

## 2. HTML结构

### 基础结构

```html
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
            <label class="label-name" id="rc" for="uid">
              电子邮箱地址或电话号码
              <span class="required">*</span>
            </label>
            <div class="login-input">
              <div class="input-phone hidden">
                <div class="countryCode" role="button" tabindex="0">HK +852</div>
              </div>
              <div class="input-wrapper">
                <input class="input-user-name" id="uid" name="email" type="text" placeholder="Input Email address or phone number" aria-label="电子邮箱地址或电话号码" required="" autocomplete="webauthn" autocapitalize="none" autocorrect="off" maxlength="999" spellcheck="false" value="">
              </div>
            </div>
          </div>
          
          <!-- 密码输入 -->
          <div class="login-item">
            <label class="label-password" id="re" for="pid">
              密码
              <span class="required">*</span>
            </label>
            <div class="login-input">
              <input class="input-password" name="password" type="password" placeholder="Input password" aria-label="密码" autocomplete="off" maxlength="999" spellcheck="false" id="pid" aria-labelledby="re" value="">
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <button type="button" class="forgot-password"><span>忘记密码？</span></button>
          <button type="submit" class="sign-in-submit"><span>登录</span></button>
          
          <!-- 注册链接 -->
          <div class="login-need-account">
            <span class="need-account">需要新的账号?</span>
            <a href="./register.html" type="button" class="register-link">
              <span class="register-link-text">注册</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- 分隔线 -->
      <div class="vertical-separator-line"></div>
      
      <!-- 右侧二维码和社交登录 -->
      <div class="qr-login-container">
        <div class="qr-login-inner">
          <img class="qr-login-img" src="/assets/450a761db3bfe89ca9b9.png" alt="">
        </div>
        <h1 class="qr-login-title">使用二维码登陆</h1>
        <p class="qr-login-text">通过 <strong>DC 手机 APP</strong> 扫描二维码，便可即时登录。</p>
        
        <!-- 社交登录 -->
        <div class="other-login-container">
          <h1 class="other-login-title">其他登录方式</h1>
          <ul class="other-login-inner">
            <li class="other-login-item login-qq">
              <!-- QQ图标 -->
            </li>
            <li class="other-login-item login-wx">
              <!-- 微信图标 -->
            </li>
            <li class="other-login-item login-facebook">
              <!-- Facebook图标 -->
            </li>
            <li class="other-login-item login-google">
              <!-- Google图标 -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </form>
</div>
```

### 国家代码选择器

```html
<div class="popup popup-country-code" id="popupCountryCode" style="display: none">
  <div class="popup-con popup-bg">
    <div class="popup-info">
      <div class="popup-input-search">
        <input class="input_c18ec9" placeholder="搜索国家" autocomplete="off" aria-label="搜索" value="">
        <div class="popup-icon-container">
          <!-- 搜索图标 -->
          <svg class="icon_c18ec9 visible_c18ec9" aria-label="搜索" aria-hidden="false" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" fill-rule="evenodd" d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" clip-rule="evenodd" class=""></path>
          </svg>
          <!-- 清除图标 -->
          <svg class="clear_c18ec9 icon_c18ec9" aria-label="清除" aria-hidden="false" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z" class=""></path>
          </svg>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="popup-line"></div>
      <!-- 国家列表 -->
      <div class="popup-country-info">
        <ul class="phone-country-list">
          <!-- 动态生成国家列表 -->
        </ul>
      </div>
    </div>
    <a class="popup-close" href="javascript:;"></a>
  </div>
</div>
```

## 3. CSS类参考

| 类名 | 描述 | 应用元素 |
|------|------|----------|
| `sign-in-container` | 登录表单容器 | 最外层容器 |
| `sign-in-form` | 登录表单 | 表单元素 |
| `sign-in-inner` | 表单内部容器 | 包含左右两部分 |
| `main-login-container` | 左侧登录表单容器 | 包含登录输入区域 |
| `login-header` | 登录标题区域 | 包含欢迎语 |
| `login-heading-title` | 登录主标题 | h1标题 |
| `login-heading-text` | 登录副标题 | p文本 |
| `login-body` | 登录表单主体 | 包含输入项和按钮 |
| `login-item` | 登录输入项 | 包含标签和输入框 |
| `label-name` | 用户名/邮箱标签 | 标签元素 |
| `label-password` | 密码标签 | 标签元素 |
| `required` | 必填字段标记 | 红色星号 |
| `login-input` | 输入框容器 | 包含输入框 |
| `input-phone` | 电话输入容器 | 包含国家代码 |
| `countryCode` | 国家代码选择器 | 可点击元素 |
| `input-wrapper` | 输入框包装器 | 包裹输入框 |
| `input-user-name` | 用户名/邮箱输入框 | 文本输入框 |
| `input-password` | 密码输入框 | 密码输入框 |
| `forgot-password` | 忘记密码按钮 | 按钮元素 |
| `sign-in-submit` | 登录提交按钮 | 提交按钮 |
| `login-need-account` | 注册提示区域 | 包含注册链接 |
| `need-account` | 注册提示文本 | 文本元素 |
| `register-link` | 注册链接 | 链接元素 |
| `register-link-text` | 注册链接文本 | 链接文本 |
| `vertical-separator-line` | 垂直分隔线 | 分割左右两部分 |
| `qr-login-container` | 二维码登录容器 | 右侧区域 |
| `qr-login-inner` | 二维码容器 | 包含二维码图片 |
| `qr-login-img` | 二维码图片 | 图片元素 |
| `qr-login-title` | 二维码登录标题 | h1标题 |
| `qr-login-text` | 二维码登录说明 | p文本 |
| `other-login-container` | 其他登录方式容器 | 包含社交登录 |
| `other-login-title` | 其他登录方式标题 | h1标题 |
| `other-login-inner` | 社交登录图标容器 | ul列表 |
| `other-login-item` | 社交登录图标项 | li列表项 |
| `login-qq` | QQ登录图标 | li列表项 |
| `login-wx` | 微信登录图标 | li列表项 |
| `login-facebook` | Facebook登录图标 | li列表项 |
| `login-google` | Google登录图标 | li列表项 |
| `popup-country-code` | 国家代码弹窗 | 弹窗容器 |
| `error` | 错误状态 | 输入框错误状态 |
| `error-message` | 错误提示信息 | 错误文本 |
| `success` | 成功状态 | 输入框成功状态 |

## 4. JavaScript功能

### 4.1 国家代码数据

```javascript
const countryCodeData = [
  { name: '阿富汗', code: '+93' },
  { name: '中国', code: '+86' },
  { name: '中国香港特别行政区', code: '+852' },
  // 更多国家代码...
];
```

### 4.2 动态生成国家列表

```javascript
// 获取容器元素
const countryList = document.getElementsByClassName('phone-country-list')[0];

// 遍历数据并创建列表项
countryCodeData.forEach(country => {
    const li = document.createElement('li');
    li.className = 'country-item';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'country-name';
    nameSpan.textContent = country.name;

    const codeSpan = document.createElement('span');
    codeSpan.className = 'country-code';
    codeSpan.textContent = country.code;

    li.appendChild(nameSpan);
    li.appendChild(codeSpan);

    countryList.appendChild(li);
});
```

### 4.3 表单提交处理

```javascript
document.getElementById('basicLoginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('uid').value;
  const password = document.getElementById('pid').value;
  
  if (!email || !password) {
    alert('请填写所有必填字段');
    return;
  }
  
  // 这里可以添加AJAX请求或其他登录逻辑
  console.log('登录表单提交:', { email, password });
});
```

### 4.4 表单验证

```javascript
document.getElementById('validationLoginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  
  let isValid = true;
  
  // 验证邮箱
  if (!email.value) {
    email.classList.add('error');
    emailError.textContent = '请输入电子邮箱';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    email.classList.add('error');
    emailError.textContent = '请输入有效的电子邮箱';
    isValid = false;
  } else {
    email.classList.remove('error');
    email.classList.add('success');
    emailError.textContent = '';
  }
  
  // 验证密码
  if (!password.value) {
    password.classList.add('error');
    passwordError.textContent = '请输入密码';
    isValid = false;
  } else if (password.value.length < 6) {
    password.classList.add('error');
    passwordError.textContent = '密码长度至少为6位';
    isValid = false;
  } else {
    password.classList.remove('error');
    password.classList.add('success');
    passwordError.textContent = '';
  }
  
  if (isValid) {
    // 登录成功逻辑
    console.log('登录成功:', { email: email.value });
  }
});
```

### 4.5 社交登录处理

```javascript
document.querySelectorAll('.other-login-item').forEach(item => {
  item.addEventListener('click', function() {
    const platform = this.classList.contains('login-qq') ? 'QQ' :
                    this.classList.contains('login-wx') ? '微信' :
                    this.classList.contains('login-facebook') ? 'Facebook' : 'Google';
    
    // 这里可以添加社交登录逻辑
    console.log(`${platform}登录`);
  });
});
```

### 4.6 忘记密码处理

```javascript
document.querySelectorAll('.forgot-password').forEach(btn => {
  btn.addEventListener('click', function() {
    // 这里可以添加忘记密码逻辑
    console.log('忘记密码');
  });
});
```

### 4.7 注册链接处理

```javascript
document.querySelectorAll('.register-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // 这里可以添加注册逻辑
    console.log('注册');
  });
});
```

## 5. 使用示例

### 5.1 基础登录表单

```html
<div class="sign-in-container">
  <form class="sign-in-form" id="loginForm">
    <!-- 表单内容 -->
    <div class="sign-in-inner">
      <div class="main-login-container">
        <div class="login-header">
          <h1 class="login-heading-title">欢迎回来！</h1>
          <p class="login-heading-text">很高兴再次见到您！</p>
        </div>
        <div class="login-body">
          <div class="login-item">
            <label class="label-name" for="email">
              电子邮箱
              <span class="required">*</span>
            </label>
            <div class="login-input">
              <div class="input-wrapper">
                <input class="input-user-name" id="email" name="email" type="email" placeholder="请输入电子邮箱" required>
              </div>
            </div>
          </div>
          <div class="login-item">
            <label class="label-password" for="password">
              密码
              <span class="required">*</span>
            </label>
            <div class="login-input">
              <input class="input-password" id="password" name="password" type="password" placeholder="请输入密码" required>
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
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (!email || !password) {
    alert('请填写所有必填字段');
    return;
  }
  
  // 登录逻辑
  console.log('登录:', { email, password });
});
</script>
```

### 5.2 带二维码和社交登录的完整表单

```html
<div class="sign-in-container">
  <form class="sign-in-form">
    <div class="sign-in-inner">
      <!-- 左侧登录表单 -->
      <div class="main-login-container">
        <!-- 登录表单内容 -->
      </div>
      
      <!-- 分隔线 -->
      <div class="vertical-separator-line"></div>
      
      <!-- 右侧二维码和社交登录 -->
      <div class="qr-login-container">
        <div class="qr-login-inner">
          <img class="qr-login-img" src="https://via.placeholder.com/150" alt="登录二维码">
        </div>
        <h1 class="qr-login-title">使用二维码登陆</h1>
        <p class="qr-login-text">通过 <strong>DC 手机 APP</strong> 扫描二维码，便可即时登录。</p>
        
        <div class="other-login-container">
          <h1 class="other-login-title">其他登录方式</h1>
          <ul class="other-login-inner">
            <li class="other-login-item login-qq" title="QQ登录">
              <!-- QQ图标 -->
            </li>
            <li class="other-login-item login-wx" title="微信登录">
              <!-- 微信图标 -->
            </li>
            <li class="other-login-item login-facebook" title="Facebook登录">
              <!-- Facebook图标 -->
            </li>
            <li class="other-login-item login-google" title="Google登录">
              <!-- Google图标 -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </form>
</div>
```

## 6. 响应式设计

Signin组件采用响应式设计，适配不同屏幕尺寸：

```css
/* 响应式设计 */
@media (max-width: 768px) {
  .sign-in-inner {
    flex-direction: column;
  }
  
  .vertical-separator-line {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }
  
  .qr-login-container {
    border-top: 1px solid #ddd;
    padding-top: 30px;
  }
}
```

- 在屏幕宽度小于768px时，左右布局变为上下布局
- 垂直分隔线变为水平分隔线
- 二维码登录区域添加顶部边框，形成视觉分隔

## 7. 无障碍支持

Signin组件支持无障碍访问：

- 使用适当的ARIA属性（如 `aria-label`、`aria-labelledby`）
- 所有可交互元素都有适当的 `tabindex`
- 表单字段有明确的标签关联
- 错误提示信息清晰可见
- 社交登录图标有 `title` 属性

## 8. 浏览器兼容性

Signin组件兼容所有现代浏览器：
- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 9. 注意事项

1. **安全性**：
   - 密码输入框使用 `autocomplete="off"` 提高安全性
   - 建议在后端进行密码验证和加密存储

2. **性能**：
   - 国家代码列表较长时，建议使用虚拟滚动或分页加载
   - 社交登录图标使用SVG格式，减少加载时间

3. **用户体验**：
   - 添加表单验证实时反馈
   - 优化移动端触摸体验
   - 提供清晰的错误提示

4. **国际化**：
   - 支持多语言切换
   - 国家代码选择器支持搜索功能

5. **可扩展性**：
   - 可以轻松添加新的社交登录方式
   - 支持自定义主题和样式

## 10. 常见问题

### Q: 如何添加新的社交登录方式？
A: 在 `other-login-inner` 中添加新的 `li` 元素，设置相应的类名和图标。

### Q: 如何自定义登录表单样式？
A: 可以通过覆盖CSS类来自定义样式，或修改SCSS文件。

### Q: 如何实现记住密码功能？
A: 可以添加一个复选框，使用localStorage或cookie存储用户凭证。

### Q: 如何处理登录错误？
A: 在表单提交后，根据后端返回的错误信息显示相应的错误提示。

### Q: 如何优化二维码登录体验？
A: 可以添加二维码刷新功能，或显示登录状态提示。

## 11. 相关组件

- [Reset Password Component](./../resetpassword/resetpassword.md) - 密码重置组件
- [Signup Component](./../signup/signup.md) - 注册组件
- [Popup Component](./../popup/dcpopup.md) - 弹窗组件（用于国家代码选择器）

## 12. 完整示例

完整的Signin组件示例可以在 `examples/components/signin/index.html` 中找到，包含以下功能：

- 基础登录表单
- 带验证的登录表单
- 社交登录按钮
- 二维码登录
- 响应式布局
- 表单验证和错误提示

## 13. 测试

Signin组件的测试文件位于 `test/components/signin/signin.test.js`，包含以下测试用例：

- 表单渲染测试
- 输入字段测试
- 按钮功能测试
- 社交登录测试
- 二维码登录测试
- 表单提交测试
- 表单验证测试

## 14. 总结

Signin组件是一个功能完整、用户友好的登录表单解决方案，支持多种登录方式和响应式设计。它提供了良好的用户体验，同时易于集成和扩展。通过合理的HTML结构、CSS样式和JavaScript功能，Signin组件可以满足大多数网站和应用的登录需求。