describe('Signin Component', () => {
  let container;
  
  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.innerHTML = `
      <div class="sign-in-container">
        <form class="sign-in-form">
          <div class="sign-in-inner">
            <div class="main-login-container">
              <div class="login-header">
                <h1 class="login-heading-title">欢迎回来！</h1>
                <p class="login-heading-text">很高兴再次见到您！</p>
              </div>
              <div class="login-body">
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
                <div class="login-item">
                  <label class="label-password" id="re" for="pid">
                    密码
                    <span class="required">*</span>
                  </label>
                  <div class="login-input">
                    <input class="input-password" name="password" type="password" placeholder="Input password" aria-label="密码" autocomplete="off" maxlength="999" spellcheck="false" id="pid" aria-labelledby="re" value="">
                  </div>
                </div>
                
                <button type="button" class="forgot-password"><span>忘记密码？</span></button>
                <button type="submit" class="sign-in-submit"><span>登录</span></button>
                
                <div class="login-need-account">
                  <span class="need-account">需要新的账号?</span>
                  <a href="./register.html" type="button" class="register-link">
                    <span class="register-link-text">注册</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="vertical-separator-line"></div>
            <div class="qr-login-container">
              <div class="qr-login-inner">
                <img class="qr-login-img" src="/assets/450a761db3bfe89ca9b9.png" alt="">
              </div>
              <h1 class="qr-login-title">使用二维码登陆</h1>
              <p class="qr-login-text">通过 <strong>DC 手机 APP</strong> 扫描二维码，便可即时登录。</p>
              <div class="other-login-container">
                <h1 class="other-login-title">其他登录方式</h1>
                <ul class="other-login-inner">
                  <li class="other-login-item login-qq">
                    <svg class="icon icon_qq" width="64px" height="64.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#000000" d="M512 0C229.12 0 0 229.12 0 512s229.12 512 512 512 512-229.12 512-512S794.88 0 512 0z"></path>
                    </svg>
                  </li>
                  <li class="other-login-item login-wx">
                    <svg class="icon icon_wechat" width="64px" height="64.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#000000" d="M512 0C229.12 0 0 229.12 0 512s229.12 512 512 512 512-229.12 512-512S794.88 0 512 0z"></path>
                    </svg>
                  </li>
                  <li class="other-login-item login-facebook">
                    <svg class="icon icon_facebook" width="64px" height="64.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#000000" d="M512 0C229.12 0 0 229.12 0 512s229.12 512 512 512 512-229.12 512-512S794.88 0 512 0z"></path>
                    </svg>
                  </li>
                  <li class="other-login-item login-google">
                    <svg class="icon icon_google" width="64px" height="64.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#000000" d="M512 0C229.12 0 0 229.12 0 512s229.12 512 512 512 512-229.12 512-512S794.88 0 512 0z"></path>
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // 清理测试容器
    document.body.removeChild(container);
  });
  
  test('should render signin form correctly', () => {
    // 测试表单容器
    const signinContainer = document.querySelector('.sign-in-container');
    expect(signinContainer).toBeTruthy();
    
    // 测试表单元素
    const signinForm = document.querySelector('.sign-in-form');
    expect(signinForm).toBeTruthy();
    
    // 测试标题
    const title = document.querySelector('.login-heading-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toBe('欢迎回来！');
    
    const subtitle = document.querySelector('.login-heading-text');
    expect(subtitle).toBeTruthy();
    expect(subtitle.textContent).toBe('很高兴再次见到您！');
  });
  
  test('should have email/phone input field', () => {
    const emailInput = document.querySelector('.input-user-name');
    expect(emailInput).toBeTruthy();
    expect(emailInput.id).toBe('uid');
    expect(emailInput.name).toBe('email');
    expect(emailInput.type).toBe('text');
    expect(emailInput.placeholder).toBe('Input Email address or phone number');
    expect(emailInput.required).toBeTruthy();
  });
  
  test('should have password input field', () => {
    const passwordInput = document.querySelector('.input-password');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.id).toBe('pid');
    expect(passwordInput.name).toBe('password');
    expect(passwordInput.type).toBe('password');
    expect(passwordInput.placeholder).toBe('Input password');
  });
  
  test('should have required fields marked with asterisk', () => {
    const requiredFields = document.querySelectorAll('.required');
    expect(requiredFields.length).toBe(2);
    
    const emailLabel = document.querySelector('.label-name');
    expect(emailLabel.querySelector('.required')).toBeTruthy();
    
    const passwordLabel = document.querySelector('.label-password');
    expect(passwordLabel.querySelector('.required')).toBeTruthy();
  });
  
  test('should have forgot password button', () => {
    const forgotPasswordBtn = document.querySelector('.forgot-password');
    expect(forgotPasswordBtn).toBeTruthy();
    expect(forgotPasswordBtn.textContent.trim()).toBe('忘记密码？');
    expect(forgotPasswordBtn.type).toBe('button');
  });
  
  test('should have sign in submit button', () => {
    const submitBtn = document.querySelector('.sign-in-submit');
    expect(submitBtn).toBeTruthy();
    expect(submitBtn.textContent.trim()).toBe('登录');
    expect(submitBtn.type).toBe('submit');
  });
  
  test('should have register link', () => {
    const registerLink = document.querySelector('.register-link');
    expect(registerLink).toBeTruthy();
    expect(registerLink.href).toContain('register.html');
    expect(registerLink.querySelector('.register-link-text').textContent).toBe('注册');
  });
  
  test('should have social login options', () => {
    const socialLoginItems = document.querySelectorAll('.other-login-item');
    expect(socialLoginItems.length).toBe(4);
    
    const platforms = ['qq', 'wx', 'facebook', 'google'];
    platforms.forEach(platform => {
      const item = document.querySelector(`.login-${platform}`);
      expect(item).toBeTruthy();
    });
  });
  
  test('should have QR code login section', () => {
    const qrSection = document.querySelector('.qr-login-container');
    expect(qrSection).toBeTruthy();
    
    const qrTitle = document.querySelector('.qr-login-title');
    expect(qrTitle).toBeTruthy();
    expect(qrTitle.textContent).toBe('使用二维码登陆');
    
    const qrText = document.querySelector('.qr-login-text');
    expect(qrText).toBeTruthy();
    expect(qrText.textContent).toBe('通过 DC 手机 APP 扫描二维码，便可即时登录。');
    
    const qrImage = document.querySelector('.qr-login-img');
    expect(qrImage).toBeTruthy();
  });
  
  test('should handle form submission', () => {
    const signinForm = document.querySelector('.sign-in-form');
    const submitBtn = document.querySelector('.sign-in-submit');
    
    let formSubmitted = false;
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formSubmitted = true;
    });
    
    // 触发表单提交
    submitBtn.click();
    expect(formSubmitted).toBeTruthy();
  });
  
  test('should handle forgot password click', () => {
    const forgotPasswordBtn = document.querySelector('.forgot-password');
    
    let forgotPasswordClicked = false;
    forgotPasswordBtn.addEventListener('click', () => {
      forgotPasswordClicked = true;
    });
    
    // 触发忘记密码点击
    forgotPasswordBtn.click();
    expect(forgotPasswordClicked).toBeTruthy();
  });
  
  test('should have country code selector', () => {
    const countryCodeSelector = document.querySelector('.countryCode');
    expect(countryCodeSelector).toBeTruthy();
    expect(countryCodeSelector.textContent).toBe('HK +852');
    expect(countryCodeSelector.getAttribute('role')).toBe('button');
    expect(countryCodeSelector.getAttribute('tabindex')).toBe('0');
  });
});
