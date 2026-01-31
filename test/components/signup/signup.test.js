describe('Signup Component', () => {
  let container;
  
  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.innerHTML = `
      <div class="sign-up-container">
        <form class="sign-up-form">
          <div class="sign-up-inner">
            <h1 class="sign-up-title">创建账号</h1>
            <div class="main-register-container">
              <div class="register-item">
                <label class="label-name" id="rc" for="eid">
                  电子邮箱地址或电话号码
                  <span class="required">*</span>
                </label>
                <div class="register-input">
                  <div class="input-phone hidden">
                    <div class="countryCode" role="button" tabindex="0">HK +852</div>
                  </div>
                  <div class="input-wrapper">
                    <input class="input-user-name" id="eid" name="email" type="text" placeholder="Input Email address or phone number" aria-label="电子邮箱地址或电话号码" required="" autocomplete="webauthn" autocapitalize="none" autocorrect="off" maxlength="999" spellcheck="false" value="">
                  </div>
                </div>
              </div>
              <div class="register-item">
                <label class="label-name" id="r1" for="nid">昵称</label>
                <div class="input-wrapper">
                  <input class="input-nick-name" name="global_name" type="text" placeholder="昵称" aria-label="昵称" maxlength="32" id="nid" aria-labelledby="r1" value="">
                </div>
                <div class="text-tips">这是其他人所看到的您的名称。可以使用特殊字符和表情符号。</div>
              </div>
              <div class="register-item">
                <label class="label-name" id="r2" for="uuid">用户名<span class="required">*</span></label>
                <div class="input-wrapper">
                  <input class="input-user-name" name="username" type="text" placeholder="用户名" aria-label="用户名" maxlength="32" id="uuid" aria-labelledby="r2" value="">
                </div>
                <div class="text-tips">只能使用数字、字母、下划线（_）或者英文句号。</div>
              </div>
              <div class="register-item">
                <label class="label-name" id="r3" for="pwid">密码<span class="required">*</span></label>
                <div class="input-wrapper">
                  <input class="input-password" name="password" type="password" placeholder="密码" aria-label="密码" maxlength="999" id="pwid" aria-labelledby="r3" value="">
                </div>
                <div class="text-tips">只能使用数字、字母大小写、下划线（_）或者英文句号。</div>
              </div>
      
              <fieldset class="date-container">
                <legend class="label-legend">出生日期<span class="required">*</span></legend>
                <div class="date-ul-list">
                  <div tabindex="1" class="item-year">
                    <div class="select-container">
                      <input placeholder="年" autocapitalize="none" autocomplete="off" autocorrect="off" id="select-year" spellcheck="false" tabindex="1" type="text" aria-autocomplete="list" aria-label="年" value="">
                    </div>
                    <div class="indicator-container">
                      <svg class="icon icon-down-up" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </div>
                  </div>
                  <div tabindex="2" class="item-month">
                    <div class="select-container">
                      <input placeholder="月" autocapitalize="none" autocomplete="off" autocorrect="off" id="select-month" spellcheck="false" tabindex="2" type="text" aria-autocomplete="list" aria-label="月" value="">
                    </div>
                    <div class="indicator-container">
                      <svg class="icon icon-down-up" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </div>
                  </div>
                  <div tabindex="3" class="item-day">
                    <div class="select-container">
                      <input placeholder="日" autocapitalize="none" autocomplete="off" autocorrect="off" id="select-day" spellcheck="false" tabindex="3" type="text" aria-autocomplete="list" aria-label="日" value="">
                    </div>
                    <div class="indicator-container">
                      <svg class="icon icon-down-up" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </fieldset>
      
              <fieldset class="address-container">
                <legend class="label-legend">收货地址<span class="required">*</span></legend>
                <div class="address-ul-list">
                  <div tabindex="4" class="item-province">
                    <div class="select-container">
                      <input placeholder="省份" autocapitalize="none" autocomplete="off" autocorrect="off" id="select-province" spellcheck="false" tabindex="4" type="text" aria-autocomplete="list" aria-label="省份" value="">
                    </div>
                    <div class="indicator-container">
                      <svg class="icon icon-down-up" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </div>
                  </div>
                  <div tabindex="5" class="item-urban-district">
                    <div class="select-container">
                      <input placeholder="市区" autocapitalize="none" autocomplete="off" autocorrect="off" id="select-urban-district" spellcheck="false" tabindex="5" type="text" aria-autocomplete="list" aria-label="市区" value="">
                    </div>
                    <div class="indicator-container">
                      <svg class="icon icon-down-up" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </div>
                  </div>
                  <div tabindex="6" class="item-county-town">
                    <div class="select-container">
                      <input placeholder="县" autocapitalize="none" autocomplete="off" autocorrect="off" id="select-county-town" spellcheck="false" tabindex="6" type="text" aria-autocomplete="list" aria-label="县" value="">
                    </div>
                    <div class="indicator-container">
                      <svg class="icon icon-down-up" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="input-wrapper">
                  <input class="input-detailed-address" name="detailed-address" type="text" placeholder="详细地址" aria-label="详细地址" maxlength="999" id="detailed-address" value="">
                </div>
              </fieldset>
      
              <div class="subscribe-to-updates">
                <label class="checkbox-wrapper">
                  <input class="input-checkbox" type="checkbox">
                  <div class="checkbox-checked">
                    <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path fill="#fff" d="M21.7 5.3a1 1 0 0 1 0 1.4l-12 12a1 1 0 0 1-1.4 0l-6-6a1 1 0 1 1 1.4-1.4L9 16.58l11.3-11.3a1 1 0 0 1 1.4 0Z" class=""></path>
                    </svg>
                  </div>
                  <div class="label-forward">
                    （可选）我愿意接收含有 DC 更新内容、小贴士，以及特惠内容的电子邮件。您可以随时退订。
                  </div>
                </label>
              </div>
              <button type="submit" class="sign-up-submit"><span>注册</span></button>
      
              <div class="service-teams-container">
                进行注册即表示您同意 DC 的
                <a class="service-teams-link" href="./terms.html" rel="noreferrer noopener" target="_blank">服务条款</a>
                和
                <a class="privacy-policy-link" href="./privacy.html" rel="noreferrer noopener" target="_blank">隐私权政策</a>。
              </div>
              
              <div class="login-need-account">
                <span class="need-account">已经拥有帐号?</span>
                <a href="./login.html" type="button" class="login-link">
                  <span class="login-link-text">登录</span>
                </a>
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
  
  test('should render signup form correctly', () => {
    // 测试表单容器
    const signupContainer = document.querySelector('.sign-up-container');
    expect(signupContainer).toBeTruthy();
    
    // 测试表单元素
    const signupForm = document.querySelector('.sign-up-form');
    expect(signupForm).toBeTruthy();
    
    // 测试标题
    const title = document.querySelector('.sign-up-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toBe('创建账号');
  });
  
  test('should have email/phone input field', () => {
    const emailInput = document.querySelector('.input-user-name');
    expect(emailInput).toBeTruthy();
    expect(emailInput.id).toBe('eid');
    expect(emailInput.name).toBe('email');
    expect(emailInput.type).toBe('text');
    expect(emailInput.placeholder).toBe('Input Email address or phone number');
    expect(emailInput.required).toBeTruthy();
  });
  
  test('should have nickname input field', () => {
    const nicknameInput = document.querySelector('.input-nick-name');
    expect(nicknameInput).toBeTruthy();
    expect(nicknameInput.id).toBe('nid');
    expect(nicknameInput.name).toBe('global_name');
    expect(nicknameInput.type).toBe('text');
    expect(nicknameInput.placeholder).toBe('昵称');
    expect(nicknameInput.maxLength).toBe(32);
  });
  
  test('should have username input field', () => {
    const usernameInput = document.querySelector('input[name="username"]');
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.id).toBe('uuid');
    expect(usernameInput.name).toBe('username');
    expect(usernameInput.type).toBe('text');
    expect(usernameInput.placeholder).toBe('用户名');
    expect(usernameInput.maxLength).toBe(32);
  });
  
  test('should have password input field', () => {
    const passwordInput = document.querySelector('input[name="password"]');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.id).toBe('pwid');
    expect(passwordInput.name).toBe('password');
    expect(passwordInput.type).toBe('password');
    expect(passwordInput.placeholder).toBe('密码');
  });
  
  test('should have date of birth fields', () => {
    const yearInput = document.querySelector('#select-year');
    const monthInput = document.querySelector('#select-month');
    const dayInput = document.querySelector('#select-day');
    
    expect(yearInput).toBeTruthy();
    expect(yearInput.placeholder).toBe('年');
    
    expect(monthInput).toBeTruthy();
    expect(monthInput.placeholder).toBe('月');
    
    expect(dayInput).toBeTruthy();
    expect(dayInput.placeholder).toBe('日');
  });
  
  test('should have address fields', () => {
    const provinceInput = document.querySelector('#select-province');
    const cityInput = document.querySelector('#select-urban-district');
    const countyInput = document.querySelector('#select-county-town');
    const detailInput = document.querySelector('#detailed-address');
    
    expect(provinceInput).toBeTruthy();
    expect(provinceInput.placeholder).toBe('省份');
    
    expect(cityInput).toBeTruthy();
    expect(cityInput.placeholder).toBe('市区');
    
    expect(countyInput).toBeTruthy();
    expect(countyInput.placeholder).toBe('县');
    
    expect(detailInput).toBeTruthy();
    expect(detailInput.placeholder).toBe('详细地址');
    expect(detailInput.name).toBe('detailed-address');
  });
  
  test('should have subscribe checkbox', () => {
    const subscribeCheckbox = document.querySelector('.input-checkbox');
    expect(subscribeCheckbox).toBeTruthy();
    expect(subscribeCheckbox.type).toBe('checkbox');
  });
  
  test('should have required fields marked with asterisk', () => {
    const requiredFields = document.querySelectorAll('.required');
    expect(requiredFields.length).toBeGreaterThan(0);
    
    // 检查必填字段标签
    const emailLabel = document.querySelector('label[for="eid"]');
    expect(emailLabel.querySelector('.required')).toBeTruthy();
    
    const usernameLabel = document.querySelector('label[for="uuid"]');
    expect(usernameLabel.querySelector('.required')).toBeTruthy();
    
    const passwordLabel = document.querySelector('label[for="pwid"]');
    expect(passwordLabel.querySelector('.required')).toBeTruthy();
    
    const dobLabel = document.querySelector('.date-container .label-legend');
    expect(dobLabel.querySelector('.required')).toBeTruthy();
    
    const addressLabel = document.querySelector('.address-container .label-legend');
    expect(addressLabel.querySelector('.required')).toBeTruthy();
  });
  
  test('should have signup submit button', () => {
    const submitBtn = document.querySelector('.sign-up-submit');
    expect(submitBtn).toBeTruthy();
    expect(submitBtn.textContent.trim()).toBe('注册');
    expect(submitBtn.type).toBe('submit');
  });
  
  test('should have login link', () => {
    const loginLink = document.querySelector('.login-link');
    expect(loginLink).toBeTruthy();
    expect(loginLink.href).toContain('login.html');
    expect(loginLink.querySelector('.login-link-text').textContent).toBe('登录');
  });
  
  test('should have terms and privacy links', () => {
    const termsLink = document.querySelector('.service-teams-link');
    expect(termsLink).toBeTruthy();
    expect(termsLink.href).toContain('terms.html');
    
    const privacyLink = document.querySelector('.privacy-policy-link');
    expect(privacyLink).toBeTruthy();
    expect(privacyLink.href).toContain('privacy.html');
  });
  
  test('should handle form submission', () => {
    const signupForm = document.querySelector('.sign-up-form');
    const submitBtn = document.querySelector('.sign-up-submit');
    
    let formSubmitted = false;
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formSubmitted = true;
    });
    
    // 触发表单提交
    submitBtn.click();
    expect(formSubmitted).toBeTruthy();
  });
  
  test('should have country code selector', () => {
    const countryCodeSelector = document.querySelector('.countryCode');
    expect(countryCodeSelector).toBeTruthy();
    expect(countryCodeSelector.textContent).toBe('HK +852');
    expect(countryCodeSelector.getAttribute('role')).toBe('button');
    expect(countryCodeSelector.getAttribute('tabindex')).toBe('0');
  });
  
  test('should have text tips for input fields', () => {
    const textTips = document.querySelectorAll('.text-tips');
    expect(textTips.length).toBeGreaterThan(0);
    
    // 检查昵称提示
    const nicknameTip = textTips[0];
    expect(nicknameTip.textContent).toBe('这是其他人所看到的您的名称。可以使用特殊字符和表情符号。');
    
    // 检查用户名提示
    const usernameTip = textTips[1];
    expect(usernameTip.textContent).toBe('只能使用数字、字母、下划线（_）或者英文句号。');
    
    // 检查密码提示
    const passwordTip = textTips[2];
    expect(passwordTip.textContent).toBe('只能使用数字、字母大小写、下划线（_）或者英文句号。');
  });
  
  test('should have subscribe label', () => {
    const subscribeLabel = document.querySelector('.label-forward');
    expect(subscribeLabel).toBeTruthy();
    expect(subscribeLabel.textContent).toBe('（可选）我愿意接收含有 DC 更新内容、小贴士，以及特惠内容的电子邮件。您可以随时退订。');
  });
  
  test('should have service terms container', () => {
    const serviceTermsContainer = document.querySelector('.service-teams-container');
    expect(serviceTermsContainer).toBeTruthy();
    expect(serviceTermsContainer.textContent).toContain('进行注册即表示您同意 DC 的');
    expect(serviceTermsContainer.textContent).toContain('服务条款');
    expect(serviceTermsContainer.textContent).toContain('隐私权政策');
  });
  
  test('should have login need account container', () => {
    const loginNeedAccount = document.querySelector('.login-need-account');
    expect(loginNeedAccount).toBeTruthy();
    expect(loginNeedAccount.querySelector('.need-account').textContent).toBe('已经拥有帐号?');
  });
});
