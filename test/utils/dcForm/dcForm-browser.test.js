// dcForm 工具类浏览器环境测试
// 使用 jsdom 模拟浏览器环境
const { JSDOM } = require('jsdom');

// 创建一个模拟的浏览器环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { 
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

global.DC = global.DC || {};

global.DC.Form = {
    serialize: function() {},
    validate: function() {},
    reset: function() {},
    submit: function() {}
};

// 导入要测试的模块
const dcForm = require('../../../src/utils/dcForm.js');

// 测试套件
function runTests() {
  let passedTests = 0;
  let totalTests = 0;

  // 测试辅助函数
  function test(description, testFunction) {
    totalTests++;
    try {
      const result = testFunction();
      if (result) {
        console.log(`✓ ${description}`);
        passedTests++;
      } else {
        console.error(`✗ ${description}`);
      }
    } catch (error) {
      console.error(`✗ ${description}: ${error.message}`);
    }
  }

  // 表单序列化测试
  test('serialize: 在浏览器环境下序列化表单', () => {
    // 创建测试表单
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" value="testuser">
      <input type="email" name="email" value="test@example.com">
      <input type="password" name="password" value="secret">
      <input type="checkbox" name="terms" value="1" checked>
      <input type="radio" name="gender" value="male" checked>
      <input type="radio" name="gender" value="female">
      <select name="country">
        <option value="us">United States</option>
        <option value="ca" selected>Canada</option>
      </select>
    `;
    document.body.appendChild(form);

    const data = dcForm.serialize(form);
    
    return data.username === 'testuser' &&
           data.email === 'test@example.com' &&
           data.password === 'secret' &&
           data.terms === '1' &&
           data.gender === 'male' &&
           data.country === 'ca';
  });

  test('serialize: 在浏览器环境下处理多选下拉框', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <select name="colors" multiple>
        <option value="red" selected>Red</option>
        <option value="green">Green</option>
        <option value="blue" selected>Blue</option>
      </select>
    `;
    document.body.appendChild(form);

    const data = dcForm.serialize(form);
    
    return Array.isArray(data.colors) &&
           data.colors.length === 2 &&
           data.colors.includes('red') &&
           data.colors.includes('blue');
  });

  test('serialize: 在浏览器环境下处理文件输入', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="file" name="avatar" multiple>
    `;
    document.body.appendChild(form);

    // 模拟文件
    const fileInput = form.querySelector('input[type="file"]');
    const files = [
      new window.File(['content1'], 'file1.jpg', {type: 'image/jpeg'}),
      new window.File(['content2'], 'file2.png', {type: 'image/png'})
    ];
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false
    });

    const data = dcForm.serialize(form);
    
    return data.avatar &&
           data.avatar.length === 2 &&
           data.avatar[0].name === 'file1.jpg' &&
           data.avatar[1].name === 'file2.png';
  });

  test('serialize: 在浏览器环境下处理隐藏字段', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="hidden" name="token" value="abc123">
      <input type="hidden" name="userId" value="456">
    `;
    document.body.appendChild(form);

    const data = dcForm.serialize(form);
    
    return data.token === 'abc123' &&
           data.userId === '456';
  });

  test('serialize: 在浏览器环境下处理禁用字段', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="active" value="active">
      <input type="text" name="disabled" value="disabled" disabled>
    `;
    document.body.appendChild(form);

    const data = dcForm.serialize(form);
    
    return data.active === 'active' &&
           !data.hasOwnProperty('disabled');
  });

  // 表单验证测试
  test('validate: 在浏览器环境下基本验证', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" required>
      <input type="email" name="email" required>
      <input type="password" name="password" required minlength="6">
    `;
    document.body.appendChild(form);

    // 有效数据
    form.username.value = 'testuser';
    form.email.value = 'test@example.com';
    form.password.value = 'password123';

    const result = dcForm.validate(form);
    
    return result.isValid && Object.keys(result.errors).length === 0;
  });

  test('validate: 在浏览器环境下验证失败', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" required>
      <input type="email" name="email" required>
      <input type="password" name="password" required minlength="6">
    `;
    document.body.appendChild(form);

    // 无效数据
    form.username.value = '';
    form.email.value = 'invalid-email';
    form.password.value = 'short';

    const result = dcForm.validate(form);
    
    return !result.isValid &&
           result.errors.username === '必填字段' &&
           result.errors.email === '无效的电子邮件格式' &&
           result.errors.password === '密码至少需要6个字符';
  });

  test('validate: 在浏览器环境下自定义验证规则', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" required>
      <input type="text" name="phone" data-validate="phone">
    `;
    document.body.appendChild(form);

    // 设置自定义验证规则
    dcForm.addValidationRule('phone', (value) => {
      return /^\d{10}$/.test(value) ? '' : '无效的电话号码';
    });

    // 有效数据
    form.username.value = 'testuser';
    form.phone.value = '1234567890';
    const result1 = dcForm.validate(form);

    // 无效数据
    form.phone.value = '123';
    const result2 = dcForm.validate(form);

    return result1.isValid && !result2.isValid &&
           result2.errors.phone === '无效的电话号码';
  });

  test('validate: 在浏览器环境下异步验证', async () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" required data-validate="async">
    `;
    document.body.appendChild(form);

    // 模拟异步验证
    dcForm.addValidationRule('async', async (value) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(value === 'available' ? '' : '用户名已存在');
        }, 10);
      });
    });

    // 有效数据
    form.username.value = 'available';
    const result1 = await dcForm.validateAsync(form);

    // 无效数据
    form.username.value = 'taken';
    const result2 = await dcForm.validateAsync(form);

    return result1.isValid && !result2.isValid &&
           result2.errors.username === '用户名已存在';
  });

  test('validate: 在浏览器环境下验证分组', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <div data-group="contact">
        <input type="email" name="email" required>
        <input type="tel" name="phone" required>
      </div>
      <div data-group="address">
        <input type="text" name="street" required>
        <input type="text" name="city" required>
      </div>
    `;
    document.body.appendChild(form);

    // 有效数据
    form.email.value = 'test@example.com';
    form.phone.value = '1234567890';
    form.street.value = '123 Main St';
    form.city.value = 'Anytown';

    const result = dcForm.validate(form);
    
    return result.isValid && Object.keys(result.errors).length === 0;
  });

  // 表单重置测试
  test('reset: 在浏览器环境下重置表单', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" value="testuser">
      <input type="email" name="email" value="test@example.com">
      <input type="checkbox" name="terms" checked>
      <select name="country">
        <option value="us">United States</option>
        <option value="ca" selected>Canada</option>
      </select>
    `;
    document.body.appendChild(form);

    // 修改表单值
    form.username.value = 'newuser';
    form.email.value = 'new@example.com';
    form.terms.checked = false;
    form.country.value = 'us';

    // 重置表单
    dcForm.reset(form);

    return form.username.value === 'testuser' &&
           form.email.value === 'test@example.com' &&
           form.terms.checked === true &&
           form.country.value === 'ca';
  });

  test('reset: 在浏览器环境下重置表单并保留特定字段', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" value="testuser">
      <input type="text" name="search" value="query" class="no-reset">
    `;
    document.body.appendChild(form);

    // 修改表单值
    form.username.value = 'newuser';
    form.search.value = 'new query';

    // 重置表单
    dcForm.reset(form, { exclude: ['.no-reset'] });

    return form.username.value === 'testuser' &&
           form.search.value === 'new query';
  });

  // 表单提交测试
  test('submit: 在浏览器环境下阻止默认提交', () => {
    const form = document.createElement('form');
    document.body.appendChild(form);

    let submitted = false;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitted = true;
    });

    // 模拟提交
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    return !submitted;
  });

  test('submit: 在浏览器环境下自定义提交处理', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" value="testuser">
    `;
    document.body.appendChild(form);

    let submitted = false;
    let data = null;

    // 设置自定义提交处理
    dcForm.onSubmit(form, (formData) => {
      submitted = true;
      data = formData;
    });

    // 模拟提交
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    return submitted && data.username === 'testuser';
  });

  test('submit: 在浏览器环境下异步提交处理', async () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" value="testuser">
    `;
    document.body.appendChild(form);

    let submitted = false;
    let data = null;

    // 设置异步提交处理
    dcForm.onSubmit(form, async (formData) => {
      // 模拟异步操作
      return new Promise((resolve) => {
        setTimeout(() => {
          submitted = true;
          data = formData;
          resolve();
        }, 10);
      });
    });

    // 模拟提交
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    // 等待异步操作完成
    await new Promise(resolve => setTimeout(resolve, 20));

    return submitted && data.username === 'testuser';
  });

  // 表单状态测试
  test('state: 在浏览器环境下设置表单状态', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username">
      <div class="status"></div>
    `;
    document.body.appendChild(form);

    // 设置加载状态
    dcForm.setState(form, 'loading');
    
    return form.classList.contains('is-loading') &&
           !form.classList.contains('is-success') &&
           !form.classList.contains('is-error');
  });

  test('state: 在浏览器环境下设置成功状态', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username">
      <div class="status"></div>
    `;
    document.body.appendChild(form);

    // 设置成功状态
    dcForm.setState(form, 'success', '提交成功！');
    
    return !form.classList.contains('is-loading') &&
           form.classList.contains('is-success') &&
           !form.classList.contains('is-error');
  });

  test('state: 在浏览器环境下设置错误状态', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username">
      <div class="status"></div>
    `;
    document.body.appendChild(form);

    // 设置错误状态
    dcForm.setState(form, 'error', '提交失败，请重试');
    
    return !form.classList.contains('is-loading') &&
           !form.classList.contains('is-success') &&
           form.classList.contains('is-error');
  });

  // 表单数据测试
  test('data: 在浏览器环境下获取表单数据', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username" value="testuser">
      <input type="email" name="email" value="test@example.com">
      <input type="checkbox" name="terms" value="1" checked>
      <select name="country">
        <option value="us">United States</option>
        <option value="ca" selected>Canada</option>
      </select>
    `;
    document.body.appendChild(form);

    const data = dcForm.getData(form);
    
    return data.username === 'testuser' &&
           data.email === 'test@example.com' &&
           data.terms === '1' &&
           data.country === 'ca';
  });

  test('data: 在浏览器环境下设置表单数据', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input type="text" name="username">
      <input type="email" name="email">
      <input type="checkbox" name="terms" value="1">
      <select name="country">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </select>
    `;
    document.body.appendChild(form);

    // 设置数据
    dcForm.setData(form, {
      username: 'newuser',
      email: 'new@example.com',
      terms: '1',
      country: 'us'
    });

    
    return form.username.value === 'newuser' &&
           form.email.value === 'new@example.com' &&
           form.terms.checked === true &&
           form.country.value === 'us';
  });

  // 边界情况测试
  test('edge: 在浏览器环境下序列化空表单', () => {
    const form = document.createElement('form');
    document.body.appendChild(form);

    const data = dcForm.serialize(form);
    
    return typeof data === 'object' &&
           Object.keys(data).length === 0;
  });

  test('edge: 在浏览器环境下验证不存在的表单', () => {
    try {
      dcForm.validate(null);
      return false;
    } catch (error) {
      return true;
    }
  });

  test('edge: 在浏览器环境下重置不存在的表单', () => {
    try {
      dcForm.reset(null);
      return false;
    } catch (error) {
      return true;
    }
  });

  test('edge: 在浏览器环境下设置不存在的状态', () => {
    const form = document.createElement('form');
    document.body.appendChild(form);

    try {
      dcForm.setState(form, 'invalid-state');
      return false;
    } catch (error) {
      return true;
    }
  });

  // 性能测试
  test('performance: 在浏览器环境下大量表单字段序列化', () => {
    const start = Date.now();
    const count = 100;
    
    // 创建包含大量字段的表单
    const form = document.createElement('form');
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `<input type="text" name="field${i}" value="value${i}">`;
    }
    form.innerHTML = html;
    document.body.appendChild(form);
    
    // 执行序列化
    const data = dcForm.serialize(form);
    
    const duration = Date.now() - start;
    
    // 清理
    document.body.removeChild(form);
    
    return duration < 20; // 20ms阈值
  });

  console.log(`\n浏览器环境测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}