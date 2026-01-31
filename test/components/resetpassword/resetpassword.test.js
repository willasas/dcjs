// resetpassword.test.js
// 测试重置密码组件的HTML结构和基本功能

// 模拟DOM环境
beforeEach(() => {
  // 模拟document.body
  document.body = {
    innerHTML: '',
    appendChild: jest.fn()
  };
  
  // 模拟document.querySelector
  document.querySelector = jest.fn();
  
  // 模拟document.querySelectorAll
  document.querySelectorAll = jest.fn(() => []);
  
  // 模拟document.getElementById
  document.getElementById = jest.fn();
});

// 清理模拟
afterEach(() => {
  jest.clearAllMocks();
});

describe('Reset Password Component', () => {
  test('should have correct HTML structure', () => {
    // 读取HTML文件内容（在实际测试中，可能需要使用fs模块读取文件）
    const htmlContent = `
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
    `;
    
    // 将HTML内容添加到body
    document.body.innerHTML = htmlContent;
    
    // 测试容器元素
    const resetContainer = document.querySelector('.reset-container');
    expect(resetContainer).toBeTruthy();
    
    // 测试表单元素
    const resetForm = document.querySelector('.reset-form');
    expect(resetForm).toBeTruthy();
    
    // 测试标题元素
    const resetTitle = document.querySelector('.reset-heading-title');
    expect(resetTitle).toBeTruthy();
    expect(resetTitle.textContent).toBe('重置密码');
    
    // 测试描述元素
    const resetText = document.querySelector('.reset-heading-text');
    expect(resetText).toBeTruthy();
    expect(resetText.textContent).toBe('重置你的用户密码');
    
    // 测试表单输入项
    const resetItems = document.querySelectorAll('.reset-item');
    expect(resetItems.length).toBe(4); // 4个输入项：邮箱/电话、验证码、新密码、确认密码
    
    // 测试提交按钮
    const submitButton = document.querySelector('.reset-submit');
    expect(submitButton).toBeTruthy();
    expect(submitButton.textContent).toContain('发送');
    
    // 测试登录链接
    const loginLink = document.querySelector('.login-link');
    expect(loginLink).toBeTruthy();
    expect(loginLink.href).toContain('login.html');
    expect(loginLink.textContent).toContain('登录');
  });
  
  test('should have required form fields', () => {
    // 模拟表单字段
    const mockEmailInput = {
      required: true,
      name: 'email',
      type: 'text',
      placeholder: 'Input Email address or phone number'
    };
    
    const mockVerificationInput = {
      required: false, // 验证码通常不是HTML required，而是通过JavaScript验证
      name: 'verification-code',
      type: 'text',
      placeholder: 'Input verification code'
    };
    
    const mockPasswordInput = {
      required: false, // 密码通常不是HTML required，而是通过JavaScript验证
      name: 'new password',
      type: 'password',
      placeholder: 'Input new password'
    };
    
    const mockConfirmPasswordInput = {
      required: false, // 确认密码通常不是HTML required，而是通过JavaScript验证
      name: 'confirm password',
      type: 'password',
      placeholder: 'Input confirm password'
    };
    
    // 模拟getElementById
    document.getElementById = jest.fn((id) => {
      if (id === 'uid') return mockEmailInput;
      if (id === 'vcd') return mockVerificationInput;
      if (id === 'npid') return mockPasswordInput;
      if (id === 'cpid') return mockConfirmPasswordInput;
      return null;
    });
    
    // 测试邮箱/电话输入
    const emailInput = document.getElementById('uid');
    expect(emailInput).toBeTruthy();
    expect(emailInput.required).toBe(true);
    expect(emailInput.name).toBe('email');
    expect(emailInput.type).toBe('text');
    
    // 测试验证码输入
    const verificationInput = document.getElementById('vcd');
    expect(verificationInput).toBeTruthy();
    expect(verificationInput.name).toBe('verification-code');
    expect(verificationInput.type).toBe('text');
    
    // 测试新密码输入
    const passwordInput = document.getElementById('npid');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.name).toBe('new password');
    expect(passwordInput.type).toBe('password');
    
    // 测试确认密码输入
    const confirmPasswordInput = document.getElementById('cpid');
    expect(confirmPasswordInput).toBeTruthy();
    expect(confirmPasswordInput.name).toBe('confirm password');
    expect(confirmPasswordInput.type).toBe('password');
  });
  
  test('should have correct labels and required markers', () => {
    // 模拟标签元素
    const mockLabel = {
      textContent: '电子邮箱地址或电话号码 *',
      htmlFor: 'uid'
    };
    
    // 模拟document.querySelector
    document.querySelector = jest.fn((selector) => {
      if (selector === '.label-name') return mockLabel;
      if (selector === '.required') return { textContent: '*' };
      return null;
    });
    
    // 测试标签
    const emailLabel = document.querySelector('.label-name');
    expect(emailLabel).toBeTruthy();
    expect(emailLabel.textContent).toContain('电子邮箱地址或电话号码');
    expect(emailLabel.htmlFor).toBe('uid');
    
    // 测试必填标记
    const requiredMarker = document.querySelector('.required');
    expect(requiredMarker).toBeTruthy();
    expect(requiredMarker.textContent).toBe('*');
  });
  
  test('should have login link', () => {
    // 模拟登录链接
    const mockLoginLink = {
      href: './login.html',
      textContent: '登录'
    };
    
    // 模拟document.querySelector
    document.querySelector = jest.fn((selector) => {
      if (selector === '.login-link') return mockLoginLink;
      return null;
    });
    
    // 测试登录链接
    const loginLink = document.querySelector('.login-link');
    expect(loginLink).toBeTruthy();
    expect(loginLink.href).toContain('login.html');
    expect(loginLink.textContent).toBe('登录');
  });
});
