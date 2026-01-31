// dcFunction 测试用例

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
global.performance = {
  now: () => Date.now()
};

// 导入被测试模块
require('../../../src/utils/dcFunction');

describe('dcFunction 测试', () => {
  describe('函数防抖和节流测试', () => {
    test('debounce 应该延迟执行函数', (done) => {
      let called = false;

      const debouncedFn = DC.Function.debounce(() => {
        called = true;
        done();
      }, 100);

      debouncedFn();
      expect(called).toBe(false);

      // 150ms 后检查函数是否被调用
      setTimeout(() => {
        expect(called).toBe(true);
      }, 150);
    });

    test('throttle 应该限制函数执行频率', (done) => {
      let callCount = 0;

      const throttledFn = DC.Function.throttle(() => {
        callCount++;
      }, 100);

      // 连续调用多次
      throttledFn();
      throttledFn();
      throttledFn();

      expect(callCount).toBe(1);

      // 150ms 后检查是否可以再次调用
      setTimeout(() => {
        throttledFn();
        expect(callCount).toBe(2);
        done();
      }, 150);
    });
  });

  describe('函数柯里化和组合测试', () => {
    test('curry 应该将多参数函数转换为单参数函数', () => {
      const add = DC.Function.curry((a, b, c) => a + b + c);
      const add5 = add(5);
      const add5And3 = add5(3);

      expect(add5And3(2)).toBe(10);
    });

    test('compose 应该从右到左组合函数', () => {
      const double = x => x * 2;
      const square = x => x * x;
      const doubleThenSquare = DC.Function.compose(square, double);

      expect(doubleThenSquare(5)).toBe(100);
    });

    test('pipe 应该从左到右组合函数', () => {
      const double = x => x * 2;
      const square = x => x * x;
      const squareThenDouble = DC.Function.pipe(square, double);

      expect(squareThenDouble(5)).toBe(50);
    });
  });

  describe('函数记忆化测试', () => {
    test('memoize 应该缓存函数执行结果', () => {
      let callCount = 0;

      const fibonacci = DC.Function.memoize(n => {
        callCount++;
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
      });

      const result1 = fibonacci(10);
      const result2 = fibonacci(10);

      expect(result1).toBe(55);
      expect(result2).toBe(55);
      expect(callCount).toBeLessThan(10); // 因为有缓存，调用次数会少于10
    });
  });

  describe('函数重试和超时测试', () => {
    test('retry 应该在失败时重试函数', async () => {
      let attemptCount = 0;

      const failingFn = DC.Function.retry(() => {
        attemptCount++;
        if (attemptCount < 3) {
          throw new Error('Test error');
        }
        return 'Success';
      }, 3, 10);

      const result = await failingFn();
      expect(result).toBe('Success');
      expect(attemptCount).toBe(3);
    });

    test('timeout 应该在超时后抛出错误', async () => {
      const longRunningFn = DC.Function.timeout(() => {
        return new Promise(resolve => {
          setTimeout(resolve, 200, 'Success');
        });
      }, 100);

      await expect(longRunningFn()).rejects.toThrow('Function timeout');
    });
  });

  describe('异步函数执行测试', () => {
    test('series 应该串行执行异步函数', async () => {
      const asyncFn1 = () => Promise.resolve(1);
      const asyncFn2 = x => Promise.resolve(x * 2);
      const asyncFn3 = x => Promise.resolve(x + 3);

      const serialFn = DC.Function.series(asyncFn1, asyncFn2, asyncFn3);
      const result = await serialFn();

      expect(result).toBe(5);
    });

    test('parallel 应该并行执行异步函数', async () => {
      const asyncFn1 = () => Promise.resolve(1);
      const asyncFn2 = () => Promise.resolve(2);
      const asyncFn3 = () => Promise.resolve(3);

      const parallelFn = DC.Function.parallel(asyncFn1, asyncFn2, asyncFn3);
      const results = await parallelFn();

      expect(results).toEqual([1, 2, 3]);
    });
  });

  describe('函数重载测试', () => {
    test('overload 应该根据参数类型选择不同的实现', () => {
      const calculator = DC.Function.overload()
        .addImpl((a, b) => a + b, 'number', 'number')
        .addImpl((str1, str2) => str1 + str2, 'string', 'string')
        .addImpl((arr1, arr2) => [...arr1, ...arr2], 'array', 'array');

      expect(calculator.implementation(1, 2)).toBe(3);
      expect(calculator.implementation('Hello', ' World')).toBe('Hello World');
      expect(calculator.implementation([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    });
  });

  describe('实用工具方法测试', () => {
    test('escapeHTML 应该转义 HTML 特殊字符', () => {
      const html = '<div>Test & "quoted"</div>';
      const escaped = DC.Function.escapeHTML(html);
      expect(escaped).toBe('&lt;div&gt;Test &amp; &quot;quoted&quot;&lt;/div&gt;');
    });

    test('elo 应该计算 ELO 等级分', () => {
      const ratings = [1000, 1200, 1400];
      const newRatings = DC.Function.elo(ratings);
      expect(newRatings).toHaveLength(3);
      expect(typeof newRatings[0]).toBe('number');
    });

    test('hasFlags 应该检查命令行参数', () => {
      // 模拟 process.argv
      const originalArgv = process.argv;
      process.argv = ['node', 'test.js', '--test', '--flag'];

      expect(DC.Function.hasFlags('test')).toBe(true);
      expect(DC.Function.hasFlags('nonexistent')).toBe(false);

      // 恢复原始 argv
      process.argv = originalArgv;
    });
  });

  describe('DOM 操作方法测试', () => {
    const container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);

    test('renderDataList 应该渲染数据列表', () => {
      const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

      DC.Function.renderDataList(data, container, item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        return li;
      });

      expect(container.children.length).toBe(2);
    });
  });

  test('renderElement 应该根据配置渲染 DOM 元素', () => {
    const config = {
      type: 'div',
      props: {
        className: 'test-div',
        children: [
          {
            type: 'h1',
            props: {
              nodeValue: 'Hello DCJS'
            }
          }
        ]
      }
    };

    const element = DC.Function.renderElement(config, container);
    expect(element.tagName).toBe('DIV');
    expect(element.children[0].textContent).toBe('Hello DCJS');
  });

  test('insertBefore 应该在元素前插入 HTML', () => {
    const testElement = document.createElement('div');
    testElement.id = 'target';
    document.body.appendChild(testElement);

    DC.Function.insertBefore(testElement, '<p>Inserted content</p>');
    expect(testElement.previousSibling.textContent).toBe('Inserted content');
  });
});

  describe('函数装饰器和测量测试', () => {
    test('decorate 应该使用装饰器装饰函数', () => {
      const originalFn = () => 'Original';
      const decorator = fn => () => `Decorated: ${fn()}`;

      const decoratedFn = DC.Function.decorate(originalFn, decorator);
      expect(decoratedFn()).toBe('Decorated: Original');
    });

    test('measure 应该测量函数执行时间', () => {
      const originalLog = console.log;
      console.log = jest.fn();

      const measuredFn = DC.Function.measure(() => 'Test');
      const result = measuredFn();

      expect(result).toBe('Test');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Function execution time:'));

      // 恢复原始 console.log
      console.log = originalLog;
    });
  });

  describe('函数限制并发测试', () => {
    test('limitConcurrency 应该限制并发执行数量', async () => {
      let runningCount = 0;
      const maxRunning = 2;
      const executionOrder = [];

      const asyncFn = DC.Function.limitConcurrency(async (id) => {
        runningCount++;
        expect(runningCount).toBeLessThanOrEqual(maxRunning);

        await new Promise(resolve => setTimeout(resolve, 50));

        executionOrder.push(id);
        runningCount--;
        return id;
      }, maxRunning);

      // 并行执行多个调用
      const results = await Promise.all([
        asyncFn(1),
        asyncFn(2),
        asyncFn(3),
        asyncFn(4)
      ]);

      expect(results).toEqual([1, 2, 3, 4]);
      expect(executionOrder).toEqual([1, 2, 3, 4]);
    });
  });

  describe('函数延迟和只执行一次测试', () => {
    test('delay 应该延迟执行函数', async () => {
      const result = await DC.Function.delay(x => x * 2, 50, 5);
      expect(result).toBe(10);
    });

    test('once 应该只执行函数一次', () => {
      let callCount = 0;

      const onceFn = DC.Function.once(() => {
        callCount++;
        return 'Once';
      });

      const result1 = onceFn();
      const result2 = onceFn();

      expect(result1).toBe('Once');
      expect(result2).toBe('Once');
      expect(callCount).toBe(1);
    });
  });
});