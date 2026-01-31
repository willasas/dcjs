# 重置密码组件文档

## 概述

重置密码组件是一个用于用户重置密码的表单组件，包含电子邮箱地址或电话号码输入、验证码、新密码和确认密码字段。该组件提供了完整的表单结构和样式，便于集成到登录/注册系统中。

## 特性

- 完整的重置密码表单结构
- 支持电子邮箱地址或电话号码输入
- 包含验证码输入字段
- 支持新密码和确认密码输入
- 响应式设计，适配不同屏幕尺寸
- 清晰的视觉层次和用户引导
- 支持表单验证

## 安装

将 `resetpassword.css` 和 `resetpassword.html` 文件引入到您的项目中：

```html
<link rel="stylesheet" href="path/to/resetpassword.css">
```

## 基本用法

### 方法 1: 直接使用HTML文件

直接使用完整的 `resetpassword.html` 文件作为重置密码页面：

```html
<!-- 直接链接到重置密码页面 -->
<a href="path/to/resetpassword.html">忘记密码？</a>
```

### 方法 2: 嵌入到现有页面

将重置密码表单嵌入到现有页面中：

```html
<!-- 在现有页面中嵌入重置密码表单 -->
<div class="reset-container">
  <form class="reset-form">
    <!-- 表单内容 -->
  </form>
</div>
```

## HTML 结构

重置密码组件的HTML结构如下：

```html
<div class="reset-container">
  <form class="reset-form">
    <div class="reset-inner">
        <div class="reset-header">
          <h1 class="reset-heading-title">重置密码</h1>
          <p class="reset-heading-text">重置你的用户密码</p>
        </div>
        <div class="reset-body">
          <div class="reset-item">
            <label class="label-name" id="rc" for="uid">
              电子邮箱地址或电话号码
              <span class="required">*</span>
            </label>
            <div class="reset-input">
              <div class="input-phone hidden">
                <div class="countryCode" role="button" tabindex="0">HK +852</div>
              </div>
              <div class="reset-wrapper">
                <input class="reset-user-name" id="uid" name="email" type="text" placeholder="Input Email address or phone number" aria-label="电子邮箱地址或电话号码" required="" autocomplete="webauthn" autocapitalize="none" autocorrect="off" maxlength="999" spellcheck="false" value="">
              </div>
            </div>
          </div>
          <div class="reset-item">
            <label class="label-verification-code" id="re" for="vcd">
              验证码
              <span class="required">*</span>
            </label>
            <div class="reset-input">
              <input class="input-verification-code" name="verification-code" type="text" placeholder="Input verification code" aria-label="验证码" autocomplete="off" maxlength="999" spellcheck="false" id="vcd" aria-labelledby="re" value="">
            </div>
          </div>
          <div class="reset-item">
            <label class="label-new-password" id="re" for="npid">
              新密码
              <span class="required">*</span>
            </label>
            <div class="reset-input">
              <input class="input-new-password" name="new password" type="password" placeholder="Input new password" aria-label="新密码" autocomplete="off" maxlength="999" spellcheck="false" id="npid" aria-labelledby="re" value="">
            </div>
          </div>
          <div class="reset-item">
            <label class="label-confirm-password" id="re" for="cpid">
              确认密码
              <span class="required">*</span>
            </label>
            <div class="reset-input">
              <input class="input-confirm-password" name="confirm password" type="password" placeholder="Input confirm password" aria-label="确认密码" autocomplete="off" maxlength="999" spellcheck="false" id="cpid" aria-labelledby="re" value="">
            </div>
          </div>
          <button type="submit" class="reset-submit"><span>发送</span></button>
          <a href="./login.html" type="button" class="login-link">
            <span class="login-link-text">登录</span>
          </a>
        </div>
    </div>
  </form>
</div>
```

## CSS 类参考

| 类名 | 描述 |
|------|------|
| `reset-container` | 重置密码表单的容器 |
| `reset-form` | 重置密码表单 |
| `reset-inner` | 表单内部容器 |
| `reset-header` | 表单头部，包含标题和描述 |
| `reset-heading-title` | 表单标题 |
| `reset-heading-text` | 表单描述文本 |
| `reset-body` | 表单主体，包含输入字段 |
| `reset-item` | 单个表单输入项 |
| `label-name` | 电子邮箱/电话号码标签 |
| `required` | 必填字段标记 |
| `reset-input` | 输入字段容器 |
| `input-phone` | 电话号码输入容器 |
| `countryCode` | 国家代码选择器 |
| `reset-wrapper` | 输入字段包装器 |
| `reset-user-name` | 电子邮箱/电话号码输入框 |
| `label-verification-code` | 验证码标签 |
| `input-verification-code` | 验证码输入框 |
| `label-new-password` | 新密码标签 |
| `input-new-password` | 新密码输入框 |
| `label-confirm-password` | 确认密码标签 |
| `input-confirm-password` | 确认密码输入框 |
| `reset-submit` | 提交按钮 |
| `login-link` | 登录链接 |
| `login-link-text` | 登录链接文本 |

## 表单验证

### 客户端验证

为重置密码表单添加客户端验证：

```javascript
document.querySelector('.reset-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // 获取表单数据
  const email = document.getElementById('uid').value;
  const verificationCode = document.getElementById('vcd').value;
  const newPassword = document.getElementById('npid').value;
  const confirmPassword = document.getElementById('cpid').value;
  
  // 表单验证
  if (!email) {
    alert('请输入电子邮箱地址或电话号码');
    return;
  }
  
  if (!verificationCode) {
    alert('请输入验证码');
    return;
  }
  
  if (!newPassword) {
    alert('请输入新密码');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    alert('两次输入的密码不一致');
    return;
  }
  
  // 发送重置密码请求
  console.log('提交重置密码请求:', {
    email,
    verificationCode,
    newPassword
  });
  
  // 模拟成功响应
  alert('密码重置成功！');
});
```

### 验证码发送功能

添加验证码发送功能：

```javascript
// 添加验证码发送按钮
const verificationInputDiv = document.querySelector('.reset-item:nth-child(2) .reset-input');
const sendCodeButton = document.createElement('button');
sendCodeButton.type = 'button';
sendCodeButton.className = 'reset-submit';
sendCodeButton.textContent = '发送验证码';
verificationInputDiv.style.display = 'flex';
verificationInputDiv.style.gap = '10px';
verificationInputDiv.querySelector('input').style.flex = '1';
verificationInputDiv.appendChild(sendCodeButton);

// 验证码发送按钮点击事件
sendCodeButton.addEventListener('click', function() {
  const email = document.getElementById('uid').value;
  
  if (!email) {
    alert('请先输入电子邮箱地址或电话号码');
    return;
  }
  
  // 模拟发送验证码
  console.log('发送验证码到:', email);
  
  // 显示倒计时
  const originalText = sendCodeButton.textContent;
  let countdown = 60;
  
  sendCodeButton.disabled = true;
  sendCodeButton.textContent = `${countdown}秒后重新发送`;
  
  const timer = setInterval(() => {
    countdown--;
    sendCodeButton.textContent = `${countdown}秒后重新发送`;
    
    if (countdown <= 0) {
      clearInterval(timer);
      sendCodeButton.disabled = false;
      sendCodeButton.textContent = originalText;
    }
  }, 1000);
});
```

### 密码强度检查

添加密码强度检查功能：

```javascript
// 密码强度检查
document.getElementById('npid').addEventListener('input', function() {
  const password = this.value;
  let strength = 0;
  
  // 检查密码长度
  if (password.length >= 8) strength++;
  // 检查是否包含数字
  if (/\d/.test(password)) strength++;
  // 检查是否包含小写字母
  if (/[a-z]/.test(password)) strength++;
  // 检查是否包含大写字母
  if (/[A-Z]/.test(password)) strength++;
  // 检查是否包含特殊字符
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  
  // 显示密码强度
  console.log('密码强度:', strength, '/ 5');
  
  // 添加密码强度指示器
  let strengthText = '';
  let strengthColor = '';
  
  switch (strength) {
    case 0:
    case 1:
      strengthText = '弱';
      strengthColor = 'red';
      break;
    case 2:
    case 3:
      strengthText = '中';
      strengthColor = 'orange';
      break;
    case 4:
    case 5:
      strengthText = '强';
      strengthColor = 'green';
      break;
  }
  
  // 检查是否已存在强度指示器
  let strengthIndicator = document.getElementById('password-strength');
  if (!strengthIndicator) {
    strengthIndicator = document.createElement('div');
    strengthIndicator.id = 'password-strength';
    strengthIndicator.style.marginTop = '5px';
    strengthIndicator.style.fontSize = '12px';
    this.parentElement.appendChild(strengthIndicator);
  }
  
  strengthIndicator.textContent = `密码强度: ${strengthText}`;
  strengthIndicator.style.color = strengthColor;
});
```

## 自定义样式

### 自定义颜色和字体

```css
/* 自定义标题颜色 */
.reset-heading-title {
  color: #333;
  font-family: 'Arial', sans-serif;
}

/* 自定义按钮样式 */
.reset-submit {
  background-color: #006155;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.reset-submit:hover {
  background-color: #004d44;
}
```

### 自定义布局

```css
/* 自定义表单宽度 */
.reset-container {
  max-width: 500px;
  margin: 0 auto;
}

/* 自定义输入字段样式 */
.reset-user-name,
.input-verification-code,
.input-new-password,
.input-confirm-password {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

/* 自定义响应式布局 */
@media (max-width: 768px) {
  .reset-container {
    padding: 0 20px;
  }
  
  .reset-heading-title {
    font-size: 24px;
  }
}
```

## 响应式设计

重置密码组件已经内置了响应式设计，适配不同屏幕尺寸：

- **大屏幕**：表单居中显示，固定宽度
- **中屏幕**：表单宽度自适应
- **小屏幕**：表单宽度100%，适配移动设备

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 常见问题

### 1. 表单提交不工作

**可能原因**：
- 缺少表单提交事件监听器
- 表单验证失败
- 网络请求失败

**解决方案**：
- 添加表单提交事件监听器
- 检查表单验证逻辑
- 检查网络连接和服务器响应

### 2. 验证码发送功能不工作

**可能原因**：
- 缺少验证码发送按钮
- 缺少发送验证码的事件监听器
- 倒计时功能实现错误

**解决方案**：
- 添加验证码发送按钮
- 实现发送验证码的事件监听器
- 检查倒计时逻辑

### 3. 密码强度检查不显示

**可能原因**：
- 缺少密码强度检查代码
- DOM 元素选择器错误
- 样式问题导致不显示

**解决方案**：
- 添加密码强度检查代码
- 检查DOM元素选择器
- 检查CSS样式

## 示例代码

### 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>重置密码</title>
  <link rel="stylesheet" href="path/to/resetpassword.css">
</head>
<body>
  <div class="reset-container">
    <form class="reset-form">
      <div class="reset-inner">
          <div class="reset-header">
            <h1 class="reset-heading-title">重置密码</h1>
            <p class="reset-heading-text">重置你的用户密码</p>
          </div>
          <div class="reset-body">
            <div class="reset-item">
              <label class="label-name" id="rc" for="uid">
                电子邮箱地址或电话号码
                <span class="required">*</span>
              </label>
              <div class="reset-input">
                <div class="input-phone hidden">
                  <div class="countryCode" role="button" tabindex="0">HK +852</div>
                </div>
                <div class="reset-wrapper">
                  <input class="reset-user-name" id="uid" name="email" type="text" placeholder="Input Email address or phone number" aria-label="电子邮箱地址或电话号码" required="" autocomplete="webauthn" autocapitalize="none" autocorrect="off" maxlength="999" spellcheck="false" value="">
                </div>
              </div>
            </div>
            <div class="reset-item">
              <label class="label-verification-code" id="re" for="vcd">
                验证码
                <span class="required">*</span>
              </label>
              <div class="reset-input">
                <input class="input-verification-code" name="verification-code" type="text" placeholder="Input verification code" aria-label="验证码" autocomplete="off" maxlength="999" spellcheck="false" id="vcd" aria-labelledby="re" value="">
              </div>
            </div>
            <div class="reset-item">
              <label class="label-new-password" id="re" for="npid">
                新密码
                <span class="required">*</span>
              </label>
              <div class="reset-input">
                <input class="input-new-password" name="new password" type="password" placeholder="Input new password" aria-label="新密码" autocomplete="off" maxlength="999" spellcheck="false" id="npid" aria-labelledby="re" value="">
              </div>
            </div>
            <div class="reset-item">
              <label class="label-confirm-password" id="re" for="cpid">
                确认密码
                <span class="required">*</span>
              </label>
              <div class="reset-input">
                <input class="input-confirm-password" name="confirm password" type="password" placeholder="Input confirm password" aria-label="确认密码" autocomplete="off" maxlength="999" spellcheck="false" id="cpid" aria-labelledby="re" value="">
              </div>
            </div>
            <button type="submit" class="reset-submit"><span>发送</span></button>
            <a href="./login.html" type="button" class="login-link">
              <span class="login-link-text">登录</span>
            </a>
          </div>
      </div>
    </form>
  </div>

  <script>
    // 表单提交处理
    document.querySelector('.reset-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 获取表单数据
      const email = document.getElementById('uid').value;
      const verificationCode = document.getElementById('vcd').value;
      const newPassword = document.getElementById('npid').value;
      const confirmPassword = document.getElementById('cpid').value;
      
      // 表单验证
      if (!email) {
        alert('请输入电子邮箱地址或电话号码');
        return;
      }
      
      if (!verificationCode) {
        alert('请输入验证码');
        return;
      }
      
      if (!newPassword) {
        alert('请输入新密码');
        return;
      }
      
      if (newPassword !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
      }
      
      // 发送重置密码请求
      console.log('提交重置密码请求:', {
        email,
        verificationCode,
        newPassword
      });
      
      // 模拟成功响应
      alert('密码重置成功！');
      // 跳转到登录页面
      window.location.href = 'login.html';
    });

    // 添加验证码发送功能
    const verificationInputDiv = document.querySelector('.reset-item:nth-child(2) .reset-input');
    const sendCodeButton = document.createElement('button');
    sendCodeButton.type = 'button';
    sendCodeButton.className = 'reset-submit';
    sendCodeButton.textContent = '发送验证码';
    verificationInputDiv.style.display = 'flex';
    verificationInputDiv.style.gap = '10px';
    verificationInputDiv.querySelector('input').style.flex = '1';
    verificationInputDiv.appendChild(sendCodeButton);

    // 验证码发送按钮点击事件
    sendCodeButton.addEventListener('click', function() {
      const email = document.getElementById('uid').value;
      
      if (!email) {
        alert('请先输入电子邮箱地址或电话号码');
        return;
      }
      
      // 模拟发送验证码
      console.log('发送验证码到:', email);
      
      // 显示倒计时
      const originalText = sendCodeButton.textContent;
      let countdown = 60;
      
      sendCodeButton.disabled = true;
      sendCodeButton.textContent = `${countdown}秒后重新发送`;
      
      const timer = setInterval(() => {
        countdown--;
        sendCodeButton.textContent = `${countdown}秒后重新发送`;
        
        if (countdown <= 0) {
          clearInterval(timer);
          sendCodeButton.disabled = false;
          sendCodeButton.textContent = originalText;
        }
      }, 1000);
    });

    // 密码强度检查
    document.getElementById('npid').addEventListener('input', function() {
      const password = this.value;
      let strength = 0;
      
      // 检查密码长度
      if (password.length >= 8) strength++;
      // 检查是否包含数字
      if (/\d/.test(password)) strength++;
      // 检查是否包含小写字母
      if (/[a-z]/.test(password)) strength++;
      // 检查是否包含大写字母
      if (/[A-Z]/.test(password)) strength++;
      // 检查是否包含特殊字符
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
      
      // 检查是否已存在强度指示器
      let strengthIndicator = document.getElementById('password-strength');
      if (!strengthIndicator) {
        strengthIndicator = document.createElement('div');
        strengthIndicator.id = 'password-strength';
        strengthIndicator.style.marginTop = '5px';
        strengthIndicator.style.fontSize = '12px';
        this.parentElement.appendChild(strengthIndicator);
      }
      
      // 设置强度文本和颜色
      let strengthText = '';
      let strengthColor = '';
      
      switch (strength) {
        case 0:
        case 1:
          strengthText = '弱';
          strengthColor = 'red';
          break;
        case 2:
        case 3:
          strengthText = '中';
          strengthColor = 'orange';
          break;
        case 4:
        case 5:
          strengthText = '强';
          strengthColor = 'green';
          break;
      }
      
      strengthIndicator.textContent = `密码强度: ${strengthText}`;
      strengthIndicator.style.color = strengthColor;
    });
  </script>
</body>
</html>
```

## 结论

重置密码组件是一个功能完整、易于集成的表单组件，为用户提供了便捷的密码重置功能。通过本文档的指导，您应该能够轻松地在您的项目中使用和自定义重置密码组件，为用户提供流畅的密码重置体验。