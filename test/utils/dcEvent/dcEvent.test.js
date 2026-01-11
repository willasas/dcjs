// dcEvent 工具类单元测试

// 导入要测试的模块
const dcEvent = require('../../../src/utils/dcEvent.js');

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

  // 事件绑定测试
  test('on: 绑定事件', () => {
    let triggered = false;
    
    const handler = () => {
      triggered = true;
    };
    
    dcEvent.on(window, 'testEvent', handler);
    dcEvent.trigger(window, 'testEvent');
    
    return triggered;
  });

  test('on: 绑定多个事件', () => {
    let count = 0;
    
    const handler1 = () => count++;
    const handler2 = () => count++;
    
    dcEvent.on(window, 'multiEvent', handler1);
    dcEvent.on(window, 'multiEvent', handler2);
    
    dcEvent.trigger(window, 'multiEvent');
    
    return count === 2;
  });

  test('on: 绑定命名空间事件', () => {
    let count1 = 0;
    let count2 = 0;
    
    const handler1 = () => count1++;
    const handler2 = () => count2++;
    
    dcEvent.on(window, 'namespace.event1', handler1);
    dcEvent.on(window, 'namespace.event2', handler2);
    
    dcEvent.trigger(window, 'namespace.event1');
    dcEvent.trigger(window, 'namespace.event2');
    
    return count1 === 1 && count2 === 1;
  });

  // 事件解绑测试
  test('off: 解绑指定事件', () => {
    let count = 0;
    
    const handler = () => count++;
    
    dcEvent.on(window, 'unbindEvent', handler);
    dcEvent.off(window, 'unbindEvent', handler);
    
    dcEvent.trigger(window, 'unbindEvent');
    
    return count === 0;
  });

  test('off: 解绑命名空间事件', () => {
    let count1 = 0;
    let count2 = 0;
    
    const handler1 = () => count1++;
    const handler2 = () => count2++;
    
    dcEvent.on(window, 'ns.event1', handler1);
    dcEvent.on(window, 'ns.event2', handler2);
    
    dcEvent.off(window, 'ns.event1');
    
    dcEvent.trigger(window, 'ns.event1');
    dcEvent.trigger(window, 'ns.event2');
    
    return count1 === 0 && count2 === 1;
  });

  test('off: 解绑所有命名空间事件', () => {
    let count1 = 0;
    let count2 = 0;
    
    const handler1 = () => count1++;
    const handler2 = () => count2++;
    
    dcEvent.on(window, 'ns.event1', handler1);
    dcEvent.on(window, 'ns.event2', handler2);
    
    dcEvent.off(window, 'ns.*');
    
    dcEvent.trigger(window, 'ns.event1');
    dcEvent.trigger(window, 'ns.event2');
    
    return count1 === 0 && count2 === 0;
  });

  test('off: 解绑所有事件', () => {
    let count = 0;
    
    const handler = () => count++;
    
    dcEvent.on(window, 'event1', handler);
    dcEvent.on(window, 'event2', handler);
    
    dcEvent.off(window);
    
    dcEvent.trigger(window, 'event1');
    dcEvent.trigger(window, 'event2');
    
    return count === 0;
  });

  // 一次性事件测试
  test('once: 绑定一次性事件', () => {
    let count = 0;
    
    const handler = () => count++;
    
    dcEvent.once(window, 'onceEvent', handler);
    
    dcEvent.trigger(window, 'onceEvent');
    dcEvent.trigger(window, 'onceEvent');
    
    return count === 1;
  });

  test('once: 与命名空间一起使用', () => {
    let count = 0;
    
    const handler = () => count++;
    
    dcEvent.once(window, 'ns.onceEvent', handler);
    
    dcEvent.trigger(window, 'ns.onceEvent');
    dcEvent.trigger(window, 'ns.onceEvent');
    
    return count === 1;
  });

  // 事件触发测试
  test('trigger: 触发事件', () => {
    let triggered = false;
    
    dcEvent.on(window, 'triggerEvent', () => {
      triggered = true;
    });
    
    dcEvent.trigger(window, 'triggerEvent');
    
    return triggered;
  });

  test('trigger: 触发带参数的事件', () => {
    let data = null;
    
    dcEvent.on(window, 'paramEvent', (e, param) => {
      data = param;
    });
    
    dcEvent.trigger(window, 'paramEvent', { value: 42 });
    
    return data && data.value === 42;
  });

  test('trigger: 触发命名空间事件', () => {
    let count = 0;
    
    dcEvent.on(window, 'ns.triggerEvent', () => count++);
    
    dcEvent.trigger(window, 'ns.triggerEvent');
    
    return count === 1;
  });

  // 事件代理测试
  test('delegate: 基本事件代理', () => {
    const container = document.createElement('div');
    const child = document.createElement('button');
    container.appendChild(child);
    
    let triggered = false;
    
    dcEvent.delegate(container, 'button', 'click', () => {
      triggered = true;
    });
    
    // 模拟点击
    child.dispatchEvent(new Event('click'));
    
    return triggered;
  });

  test('delegate: 嵌套元素事件代理', () => {
    const container = document.createElement('div');
    const inner = document.createElement('div');
    const button = document.createElement('button');
    inner.appendChild(button);
    container.appendChild(inner);
    
    let count = 0;
    
    dcEvent.delegate(container, 'button', 'click', () => {
      count++;
    });
    
    // 模拟点击
    button.dispatchEvent(new Event('click'));
    
    return count === 1;
  });

  test('delegate: 移除代理事件', () => {
    const container = document.createElement('div');
    const button = document.createElement('button');
    container.appendChild(button);
    
    let count = 0;
    
    const handler = () => count++;
    
    dcEvent.delegate(container, 'button', 'click', handler);
    dcEvent.undelegate(container, 'button', 'click', handler);
    
    // 模拟点击
    button.dispatchEvent(new Event('click'));
    
    return count === 0;
  });

  // 事件命名空间测试
  test('namespace: 事件命名空间', () => {
    let count1 = 0;
    let count2 = 0;
    
    const handler1 = () => count1++;
    const handler2 = () => count2++;
    
    dcEvent.on(window, 'event.ns1', handler1);
    dcEvent.on(window, 'event.ns2', handler2);
    
    dcEvent.trigger(window, 'event.ns1');
    dcEvent.trigger(window, 'event.ns2');
    
    return count1 === 1 && count2 === 1;
  });

  test('namespace: 按命名空间解绑', () => {
    let count1 = 0;
    let count2 = 0;
    
    const handler1 = () => count1++;
    const handler2 = () => count2++;
    
    dcEvent.on(window, 'event.ns1', handler1);
    dcEvent.on(window, 'event.ns2', handler2);
    
    dcEvent.off(window, '.ns1');
    
    dcEvent.trigger(window, 'event.ns1');
    dcEvent.trigger(window, 'event.ns2');
    
    return count1 === 0 && count2 === 1;
  });

  // 事件数据传递测试
  test('data: 事件数据传递', () => {
    let eventData = null;
    
    dcEvent.on(window, 'dataEvent', (e, data) => {
      eventData = data;
    });
    
    dcEvent.trigger(window, 'dataEvent', { key: 'value' });
    
    return eventData && eventData.key === 'value';
  });

  test('data: 多次触发传递不同数据', () => {
    let results = [];
    
    dcEvent.on(window, 'multiDataEvent', (e, data) => {
      results.push(data);
    });
    
    dcEvent.trigger(window, 'multiDataEvent', { id: 1 });
    dcEvent.trigger(window, 'multiDataEvent', { id: 2 });
    
    return results.length === 2 && 
           results[0].id === 1 && 
           results[1].id === 2;
  });

  // 边界情况测试
  test('on: 绑定空事件名', () => {
    try {
      dcEvent.on(window, '', () => {});
      return false;
    } catch (error) {
      return true;
    }
  });

  test('on: 绑定null事件名', () => {
    try {
      dcEvent.on(window, null, () => {});
      return false;
    } catch (error) {
      return true;
    }
  });

  test('on: 绑定空处理函数', () => {
    try {
      dcEvent.on(window, 'invalidEvent', null);
      return false;
    } catch (error) {
      return true;
    }
  });

  test('trigger: 触发空事件名', () => {
    try {
      dcEvent.trigger(window, '');
      return false;
    } catch (error) {
      return true;
    }
  });

  test('trigger: 触发null事件名', () => {
    try {
      dcEvent.trigger(window, null);
      return false;
    } catch (error) {
      return true;
    }
  });

  // 事件冒泡测试
  test('bubbling: 事件冒泡', () => {
    const parent = document.createElement('div');
    const child = document.createElement('button');
    parent.appendChild(child);
    
    let parentTriggered = false;
    let childTriggered = false;
    
    dcEvent.on(parent, 'bubbleEvent', () => {
      parentTriggered = true;
    });
    
    dcEvent.on(child, 'bubbleEvent', (e) => {
      childTriggered = true;
      // 不阻止冒泡
    });
    
    // 模拟点击
    child.dispatchEvent(new Event('bubbleEvent', { bubbles: true }));
    
    return childTriggered && parentTriggered;
  });

  test('bubbling: 阻止事件冒泡', () => {
    const parent = document.createElement('div');
    const child = document.createElement('button');
    parent.appendChild(child);
    
    let parentTriggered = false;
    let childTriggered = false;
    
    dcEvent.on(parent, 'stopBubbleEvent', () => {
      parentTriggered = true;
    });
    
    dcEvent.on(child, 'stopBubbleEvent', (e) => {
      childTriggered = true;
      e.stopPropagation();
    });
    
    // 模拟点击
    child.dispatchEvent(new Event('stopBubbleEvent', { bubbles: true }));
    
    return childTriggered && !parentTriggered;
  });

  // 事件捕获测试
  test('capture: 事件捕获阶段', () => {
    const parent = document.createElement('div');
    const child = document.createElement('button');
    parent.appendChild(child);
    
    let captureTriggered = false;
    let bubbleTriggered = false;
    
    dcEvent.on(parent, 'captureEvent', () => {
      captureTriggered = true;
    }, true);
    
    dcEvent.on(child, 'captureEvent', () => {
      bubbleTriggered = true;
    });
    
    // 模拟点击
    child.dispatchEvent(new Event('captureEvent', { bubbles: true, cancelable: true }));
    
    return captureTriggered && bubbleTriggered;
  });

  // 性能测试
  test('performance: 大量事件绑定', () => {
    const start = Date.now();
    const count = 1000;
    
    for (let i = 0; i < count; i++) {
      dcEvent.on(window, `perfEvent${i}`, () => {});
    }
    
    const bindTime = Date.now() - start;
    
    // 触发事件
    const triggerStart = Date.now();
    for (let i = 0; i < count; i++) {
      dcEvent.trigger(window, `perfEvent${i}`);
    }
    const triggerTime = Date.now() - triggerStart;
    
    // 清理
    for (let i = 0; i < count; i++) {
      dcEvent.off(window, `perfEvent${i}`);
    }
    
    // 控制性能阈值
    return bindTime < 50 && triggerTime < 50;
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}