// dcDom 工具类单元测试

// 导入要测试的模块
const dcDom = require('../../../src/utils/dcDom.js');

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

  // 元素选择测试
  test('query: 选择单个元素', () => {
    // 创建测试环境
    const div = document.createElement('div');
    div.id = 'testDiv';
    div.className = 'test-class';
    document.body.appendChild(div);
    
    const element = dcDom.query('#testDiv');
    return element === div;
  });

  test('query: 选择不存在的元素', () => {
    const element = dcDom.query('#nonexistent');
    return element === null;
  });

  test('queryAll: 选择多个元素', () => {
    // 创建测试环境
    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div');
      div.className = 'multi-test';
      document.body.appendChild(div);
    }
    
    const elements = dcDom.queryAll('.multi-test');
    return elements.length === 3;
  });

  test('queryAll: 选择不存在的元素', () => {
    const elements = dcDom.queryAll('.nonexistent');
    return elements.length === 0;
  });

  // DOM创建测试
  test('createElement: 创建简单元素', () => {
    const div = dcDom.createElement('div');
    return div.tagName.toLowerCase() === 'div';
  });

  test('createElement: 创建带属性的元素', () => {
    const input = dcDom.createElement('input', {
      type: 'text',
      name: 'username',
      value: 'john_doe'
    });
    
    return input.tagName.toLowerCase() === 'input' &&
           input.type === 'text' &&
           input.name === 'username' &&
           input.value === 'john_doe';
  });

  test('createElement: 创建带子元素的元素', () => {
    const container = dcDom.createElement('div', {}, [
      dcDom.createElement('h1', {}, ['Title']),
      dcDom.createElement('p', {}, ['Content'])
    ]);
    
    return container.children.length === 2 &&
           container.children[0].tagName.toLowerCase() === 'h1' &&
           container.children[1].tagName.toLowerCase() === 'p';
  });

  // 属性操作测试
  test('attr: 获取属性', () => {
    const div = dcDom.createElement('div', { id: 'attr-test' });
    const id = dcDom.attr(div, 'id');
    return id === 'attr-test';
  });

  test('attr: 设置属性', () => {
    const div = dcDom.createElement('div');
    dcDom.attr(div, 'data-test', 'value');
    return div.getAttribute('data-test') === 'value';
  });

  test('attr: 设置多个属性', () => {
    const div = dcDom.createElement('div');
    dcDom.attr(div, {
      'data-test1': 'value1',
      'data-test2': 'value2'
    });
    
    return div.getAttribute('data-test1') === 'value1' &&
           div.getAttribute('data-test2') === 'value2';
  });

  test('removeAttr: 移除属性', () => {
    const div = dcDom.createElement('div', { 'data-test': 'value' });
    dcDom.removeAttr(div, 'data-test');
    return div.getAttribute('data-test') === null;
  });

  // 样式操作测试
  test('css: 获取样式', () => {
    const div = dcDom.createElement('div');
    div.style.color = 'red';
    const color = dcDom.css(div, 'color');
    return color === 'red';
  });

  test('css: 设置单个样式', () => {
    const div = dcDom.createElement('div');
    dcDom.css(div, 'color', 'blue');
    return div.style.color === 'blue';
  });

  test('css: 设置多个样式', () => {
    const div = dcDom.createElement('div');
    dcDom.css(div, {
      color: 'green',
      fontSize: '16px',
      backgroundColor: '#f0f0f0'
    });
    
    return div.style.color === 'green' &&
           div.style.fontSize === '16px' &&
           div.style.backgroundColor === 'rgb(240, 240, 240)';
  });

  // 类名操作测试
  test('addClass: 添加单个类', () => {
    const div = dcDom.createElement('div');
    dcDom.addClass(div, 'test-class');
    return div.classList.contains('test-class');
  });

  test('addClass: 添加多个类', () => {
    const div = dcDom.createElement('div');
    dcDom.addClass(div, 'class1 class2');
    return div.classList.contains('class1') && div.classList.contains('class2');
  });

  test('removeClass: 移除单个类', () => {
    const div = dcDom.createElement('div', { class: 'class1 class2' });
    dcDom.removeClass(div, 'class1');
    return div.classList.contains('class1') === false && div.classList.contains('class2');
  });

  test('removeClass: 移除多个类', () => {
    const div = dcDom.createElement('div', { class: 'class1 class2 class3' });
    dcDom.removeClass(div, 'class1 class2');
    return div.classList.contains('class1') === false &&
           div.classList.contains('class2') === false &&
           div.classList.contains('class3');
  });

  test('toggleClass: 切换类', () => {
    const div = dcDom.createElement('div');
    
    // 添加类
    dcDom.toggleClass(div, 'active');
    if (!div.classList.contains('active')) return false;
    
    // 移除类
    dcDom.toggleClass(div, 'active');
    return div.classList.contains('active') === false;
  });

  test('hasClass: 检查类', () => {
    const div = dcDom.createElement('div', { class: 'test-class' });
    return dcDom.hasClass(div, 'test-class');
  });

  // DOM操作测试
  test('append: 添加子元素', () => {
    const parent = dcDom.createElement('div');
    const child = dcDom.createElement('span');
    dcDom.append(parent, child);
    return parent.children.length === 1 && parent.children[0] === child;
  });

  test('prepend: 在开头添加子元素', () => {
    const parent = dcDom.createElement('div');
    dcDom.append(parent, dcDom.createElement('span', {}, ['1']));
    dcDom.prepend(parent, dcDom.createElement('span', {}, ['0']));
    return parent.children[0].textContent === '0';
  });

  test('before: 在元素前插入', () => {
    const parent = dcDom.createElement('div');
    const target = dcDom.createElement('div', {}, ['Target']);
    parent.appendChild(target);
    
    const newElement = dcDom.createElement('div', {}, ['Before']);
    dcDom.before(target, newElement);
    
    return parent.children[0] === newElement;
  });

  test('after: 在元素后插入', () => {
    const parent = dcDom.createElement('div');
    const target = dcDom.createElement('div', {}, ['Target']);
    parent.appendChild(target);
    
    const newElement = dcDom.createElement('div', {}, ['After']);
    dcDom.after(target, newElement);
    
    return parent.children[1] === newElement;
  });

  test('remove: 移除元素', () => {
    const parent = dcDom.createElement('div');
    const child = dcDom.createElement('div');
    parent.appendChild(child);
    dcDom.remove(child);
    return parent.children.length === 0;
  });

  test('empty: 清空元素内容', () => {
    const div = dcDom.createElement('div');
    div.appendChild(dcDom.createElement('span'));
    dcDom.empty(div);
    return div.children.length === 0;
  });

  // 边界情况测试
  test('query: 无效选择器', () => {
    try {
      dcDom.query('invalid[selector');
      return false;
    } catch (error) {
      return true;
    }
  });

  test('createElement: 无效标签名', () => {
    try {
      dcDom.createElement('invalid<tag>');
      return false;
    } catch (error) {
      return true;
    }
  });

  test('attr: 在非元素对象上操作', () => {
    try {
      dcDom.attr({}, 'test', 'value');
      return false;
    } catch (error) {
      return true;
    }
  });

  test('css: 在非元素对象上操作', () => {
    try {
      dcDom.css({}, 'color', 'red');
      return false;
    } catch (error) {
      return true;
    }
  });

  // 事件处理测试
  test('on: 绑定事件', () => {
    const div = dcDom.createElement('div');
    let clicked = false;
    
    dcDom.on(div, 'click', () => {
      clicked = true;
    });
    
    // 模拟点击
    div.dispatchEvent(new Event('click'));
    return clicked;
  });

  test('off: 移除事件', () => {
    const div = dcDom.createElement('div');
    let clicked = false;
    
    const handler = () => {
      clicked = true;
    };
    
    dcDom.on(div, 'click', handler);
    dcDom.off(div, 'click', handler);
    
    // 模拟点击
    div.dispatchEvent(new Event('click'));
    return !clicked;
  });

  test('once: 绑定一次性事件', () => {
    const div = dcDom.createElement('div');
    let count = 0;
    
    dcDom.once(div, 'click', () => {
      count++;
    });
    
    // 模拟多次点击
    div.dispatchEvent(new Event('click'));
    div.dispatchEvent(new Event('click'));
    
    return count === 1;
  });

  test('trigger: 触发事件', () => {
    const div = dcDom.createElement('div');
    let triggered = false;
    
    dcDom.on(div, 'customEvent', () => {
      triggered = true;
    });
    
    dcDom.trigger(div, 'customEvent');
    return triggered;
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}