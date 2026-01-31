/**
 * dclottery 测试用例
 */
const DCLottery = require('../../../src/utils/dclottery');

// 模拟DOM环境
if (typeof document === 'undefined') {
  global.document = {
    createElement: jest.fn((tagName) => {
      const element = {
        tagName: tagName.toUpperCase(),
        innerHTML: '',
        style: {},
        className: '',
        id: '',
        attributes: {},
        sheet: {
          insertRule: jest.fn()
        },
        setAttribute: jest.fn((name, value) => {
          element.attributes[name] = value;
        }),
        getAttribute: jest.fn((name) => {
          return element.attributes[name];
        }),
        appendChild: jest.fn((child) => {
          return child;
        }),
        querySelector: jest.fn(),
        querySelectorAll: jest.fn(() => [])
      };
      return element;
    }),
    getElementById: jest.fn((id) => {
      if (id === 'test-lottery') {
        return {
          id: id,
          innerHTML: '',
          querySelector: jest.fn((selector) => {
            if (selector.includes('start')) {
              return {
                classList: {
                  add: jest.fn(),
                  remove: jest.fn(),
                  contains: jest.fn(() => false)
                },
                addEventListener: jest.fn()
              };
            } else if (selector.includes('hover')) {
              return {
                style: {}
              };
            }
            return null;
          }),
          parentNode: {
            clientWidth: 800
          }
        };
      }
      return null;
    }),
    querySelector: jest.fn(() => null),
    head: {
      appendChild: jest.fn()
    }
  };
  global.window = {
    navigator: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    innerWidth: 1920
  };
  global.console = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  };
}

describe('DCLottery', () => {
  let lottery = null;
  let mockContainer = null;

  beforeEach(() => {
    // 重置模拟
    jest.clearAllMocks();

    // 模拟容器元素
    mockContainer = {
      id: 'test-lottery',
      innerHTML: '',
      querySelector: jest.fn((selector) => {
        if (selector.includes('start')) {
          return {
            classList: {
              add: jest.fn(),
              remove: jest.fn(),
              contains: jest.fn(() => false)
            },
            addEventListener: jest.fn()
          };
        } else if (selector.includes('hover')) {
          return {
            style: {}
          };
        }
        return null;
      }),
      parentNode: {
        clientWidth: 800
      }
    };

    // 模拟getElementById
    document.getElementById = jest.fn((id) => {
      if (id === 'test-lottery') {
        return mockContainer;
      }
      return null;
    });
  });

  describe('构造函数', () => {
    test('初始化抽奖组件', () => {
      expect(() => {
        lottery = new DCLottery({
          contentId: 'test-lottery',
          total: 8,
          position: '0_0,100_0,200_0,0_100,200_100,0_200,100_200,200_200'
        });
      }).not.toThrow();
      expect(lottery).toBeInstanceOf(DCLottery);
    });

    test('当容器不存在时抛出错误', () => {
      document.getElementById = jest.fn(() => null);
      expect(() => {
        new DCLottery({ contentId: 'non-existent' });
      }).toThrow('找不到容器元素: non-existent');
    });

    test('使用默认配置', () => {
      expect(() => {
        lottery = new DCLottery({
          contentId: 'test-lottery'
        });
      }).not.toThrow();
      expect(lottery.config.total).toBe(18);
    });
  });

  describe('方法测试', () => {
    beforeEach(() => {
      lottery = new DCLottery({
        contentId: 'test-lottery',
        total: 8,
        position: '0_0,100_0,200_0,0_100,200_100,0_200,100_200,200_200'
      });
    });

    test('disable - 禁用抽奖按钮', () => {
      const result = lottery.disable();
      expect(result).toBe(true);
    });

    test('enable - 启用抽奖按钮', () => {
      lottery.disable();
      lottery.enable();
      // 由于我们模拟的是addEventListener，这里无法直接验证，但至少确保方法不抛出错误
      expect(() => lottery.enable()).not.toThrow();
    });

    test('reset - 重置抽奖状态', () => {
      expect(() => lottery.reset()).not.toThrow();
    });

    test('startLottery - 开始抽奖', () => {
      // 模拟setTimeout
      global.setTimeout = jest.fn((fn) => {
        fn();
      });

      // 模拟clearInterval
      global.clearInterval = jest.fn();

      // 模拟setInterval
      global.setInterval = jest.fn((fn) => {
        fn();
        return 1;
      });

      expect(() => lottery.startLottery(0)).not.toThrow();
    });

    test('stopRoll - 停止在指定奖项', () => {
      // 模拟setTimeout
      global.setTimeout = jest.fn((fn) => {
        fn();
      });

      expect(() => lottery.stopRoll(0)).not.toThrow();
    });
  });

  describe('工具方法测试', () => {
    beforeEach(() => {
      lottery = new DCLottery({
        contentId: 'test-lottery',
        total: 8,
        position: '0_0,100_0,200_0,0_100,200_100,0_200,100_200,200_200'
      });
    });

    test('utils.getBrowser - 检测浏览器类型', () => {
      const browser = lottery.utils.getBrowser();
      expect(typeof browser).toBe('string');
    });

    test('utils.isMobile - 检测是否为移动设备', () => {
      const isMobile = lottery.utils.isMobile();
      expect(typeof isMobile).toBe('boolean');
    });

    test('utils.detectCSSPrefix - 检测CSS前缀', () => {
      const prefix = lottery.utils.detectCSSPrefix();
      expect(prefix).toHaveProperty('js');
      expect(prefix).toHaveProperty('css');
    });

    test('utils.convertUnit - 单位转换', () => {
      const pxValue = lottery.utils.convertUnit(100, 'px');
      expect(pxValue).toBe('100px');

      const remValue = lottery.utils.convertUnit(100, 'rem');
      expect(remValue).toBe('1.00rem');

      const vwValue = lottery.utils.convertUnit(100, 'vw');
      expect(vwValue).toContain('vw');
    });

    test('utils.zoom - 缩放抽奖配置', () => {
      const config = {
        width: 800,
        height: 600,
        total: 8
      };
      lottery.utils.zoom(config, 0.5);
      expect(config.width).toBe(400);
      expect(config.height).toBe(300);
      expect(config.total).toBe(8); // total 不应该被缩放
    });
  });
});