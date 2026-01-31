/**
 * dcEle 测试用例
 */
const dcEle = require('../../../src/utils/dcEle');

// 模拟DOM环境
if (typeof document === 'undefined') {
  global.document = {
    createElement: jest.fn((tagName) => {
      const element = {
        tagName: tagName.toUpperCase(),
        innerHTML: '',
        textContent: '',
        className: '',
        id: '',
        style: {},
        attributes: {},
        dataset: {},
        firstElementChild: null,
        firstChild: null,
        parentNode: null,
        nextSibling: null,
        children: [],
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
          toggle: jest.fn(),
          contains: jest.fn()
        },
        setAttribute: jest.fn((name, value) => {
          element.attributes[name] = value;
        }),
        getAttribute: jest.fn((name) => {
          return element.attributes[name];
        }),
        removeAttribute: jest.fn((name) => {
          delete element.attributes[name];
        }),
        appendChild: jest.fn((child) => {
          element.children.push(child);
          child.parentNode = element;
          return child;
        }),
        insertBefore: jest.fn((newNode, referenceNode) => {
          const index = element.children.indexOf(referenceNode);
          if (index === -1) {
            element.appendChild(newNode);
          } else {
            element.children.splice(index, 0, newNode);
            newNode.parentNode = element;
          }
          return newNode;
        }),
        removeChild: jest.fn((child) => {
          const index = element.children.indexOf(child);
          if (index !== -1) {
            element.children.splice(index, 1);
            child.parentNode = null;
          }
          return child;
        }),
        cloneNode: jest.fn((deep) => {
          const cloned = global.document.createElement(tagName);
          cloned.innerHTML = element.innerHTML;
          cloned.textContent = element.textContent;
          cloned.className = element.className;
          cloned.id = element.id;
          return cloned;
        }),
        matches: jest.fn((selector) => {
          return true;
        }),
        getBoundingClientRect: jest.fn(() => {
          return {
            top: 0,
            left: 0,
            width: 100,
            height: 100,
            bottom: 100,
            right: 100
          };
        }),
        contains: jest.fn((child) => {
          return element.children.includes(child);
        })
      };
      return element;
    }),
    querySelector: jest.fn(() => {
      return global.document.createElement('div');
    }),
    querySelectorAll: jest.fn(() => {
      return [global.document.createElement('div')];
    }),
    getElementById: jest.fn(() => {
      return global.document.createElement('div');
    }),
    getElementsByClassName: jest.fn(() => {
      return [global.document.createElement('div')];
    }),
    getElementsByTagName: jest.fn(() => {
      return [global.document.createElement('head')];
    }),
    body: {
      appendChild: jest.fn()
    }
  };
  global.window = {
    getComputedStyle: jest.fn(() => {
      return {
        display: 'block',
        visibility: 'visible',
        opacity: '1'
      };
    })
  };
  global.console = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  };
}

describe('dcEle', () => {
  describe('元素创建方法', () => {
    test('createElement - 从HTML字符串创建元素', () => {
      const element = dcEle.createElement('<div class="test">测试</div>');
      expect(element).toBeTruthy();
      expect(element.tagName).toBe('DIV');
    });

    test('createElement - 无效HTML字符串', () => {
      const element = dcEle.createElement('');
      expect(element).toBeTruthy();
      expect(element.tagName).toBe('DIV');
    });

    test('createElementByTag - 通过标签名创建元素', () => {
      const element = dcEle.createElementByTag('div', {
        id: 'test',
        className: 'test-class',
        style: {
          color: 'red',
          fontSize: '16px'
        },
        dataset: {
          test: 'value'
        }
      });
      expect(element).toBeTruthy();
      expect(element.tagName).toBe('DIV');
    });

    test('createElementByTag - 无效标签名', () => {
      const element = dcEle.createElementByTag('<div>');
      expect(element).toBeNull();
    });

    test('createElementByTagName - 通过标签名创建元素', () => {
      const element = dcEle.createElementByTagName('div');
      expect(element).toBeTruthy();
      expect(element.tagName).toBe('DIV');
    });

    test('createElementWithClassAndId - 创建带类和ID的元素', () => {
      const element = dcEle.createElementWithClassAndId('div', 'test-class', 'test-id');
      expect(element).toBeTruthy();
      expect(element.tagName).toBe('DIV');
      expect(element.className).toBe('test-class');
      expect(element.id).toBe('test-id');
    });
  });

  describe('元素查找方法', () => {
    test('find - 查找单个元素', () => {
      const element = dcEle.find('.test');
      expect(element).toBeTruthy();
    });

    test('findAll - 查找多个元素', () => {
      const elements = dcEle.findAll('.test');
      expect(Array.isArray(elements)).toBe(true);
    });
  });

  describe('元素内容操作', () => {
    test('text - 获取元素文本', () => {
      const element = document.createElement('div');
      element.textContent = '测试文本';
      const text = dcEle.text(element);
      expect(text).toBe('测试文本');
    });

    test('text - 设置元素文本', () => {
      const element = document.createElement('div');
      dcEle.text(element, '新文本');
      expect(element.textContent).toBe('新文本');
    });

    test('html - 获取元素HTML', () => {
      const element = document.createElement('div');
      element.innerHTML = '<span>测试</span>';
      const html = dcEle.html(element);
      expect(html).toBe('<span>测试</span>');
    });

    test('html - 设置元素HTML', () => {
      const element = document.createElement('div');
      dcEle.html(element, '<span>新内容</span>');
      expect(element.innerHTML).toBe('<span>新内容</span>');
    });
  });

  describe('元素属性操作', () => {
    test('attr - 获取元素属性', () => {
      const element = document.createElement('div');
      element.setAttribute('id', 'test');
      const id = dcEle.attr(element, 'id');
      expect(id).toBe('test');
    });

    test('attr - 设置元素属性', () => {
      const element = document.createElement('div');
      dcEle.attr(element, 'id', 'test');
      expect(element.getAttribute('id')).toBe('test');
    });

    test('removeAttr - 移除元素属性', () => {
      const element = document.createElement('div');
      element.setAttribute('id', 'test');
      dcEle.removeAttr(element, 'id');
      expect(element.getAttribute('id')).toBeNull();
    });
  });

  describe('样式操作', () => {
    test('addClass - 添加类名', () => {
      // 由于addClass方法现在通过选择器查找元素，这里需要模拟document.querySelectorAll
      document.querySelectorAll = jest.fn(() => {
        const element = document.createElement('div');
        element.classList = {
          add: jest.fn()
        };
        return [element];
      });
      
      expect(() => {
        dcEle.addClass('test', 'new-class');
      }).not.toThrow();
    });

    test('removeClass - 移除类名', () => {
      const element = document.createElement('div');
      element.classList = {
        remove: jest.fn()
      };
      dcEle.removeClass(element, 'test-class');
      expect(element.classList.remove).toHaveBeenCalledWith('test-class');
    });

    test('toggleClass - 切换类名', () => {
      const element = document.createElement('div');
      element.classList = {
        toggle: jest.fn(),
        contains: jest.fn(() => true)
      };
      const result = dcEle.toggleClass(element, 'test-class');
      expect(element.classList.toggle).toHaveBeenCalledWith('test-class');
    });

    test('css - 设置元素样式', () => {
      const element = document.createElement('div');
      element.style = {};
      dcEle.css(element, {
        color: 'red',
        fontSize: '16px'
      });
      expect(element.style.color).toBe('red');
      expect(element.style.fontSize).toBe('16px');
    });

    test('css - 获取元素样式', () => {
      const element = document.createElement('div');
      const color = dcEle.css(element, 'color');
      expect(color).toBeDefined();
    });

    test('setStyle - 设置元素样式', () => {
      const element = document.createElement('div');
      element.style = {};
      dcEle.setStyle(element, 'color', 'red');
      expect(element.style.color).toBe('red');
    });

    test('addSheet - 添加样式表', () => {
      expect(() => {
        dcEle.addSheet('.test { color: red; }');
      }).not.toThrow();
    });
  });

  describe('元素操作', () => {
    test('insertBefore - 插入元素到目标元素之前', () => {
      const newElement = document.createElement('div');
      const referenceElement = document.createElement('div');
      const parentElement = document.createElement('div');
      referenceElement.parentNode = parentElement;
      parentElement.insertBefore = jest.fn();
      
      dcEle.insertBefore(newElement, referenceElement);
      expect(parentElement.insertBefore).toHaveBeenCalledWith(newElement, referenceElement);
    });

    test('insertAfter - 插入元素到目标元素之后', () => {
      const newElement = document.createElement('div');
      const referenceElement = document.createElement('div');
      const parentElement = document.createElement('div');
      referenceElement.parentNode = parentElement;
      parentElement.insertBefore = jest.fn();
      
      dcEle.insertAfter(newElement, referenceElement);
      expect(parentElement.insertBefore).toHaveBeenCalled();
    });

    test('append - 将元素添加到父元素末尾', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      
      dcEle.append(parent, child);
      expect(parent.appendChild).toHaveBeenCalledWith(child);
    });

    test('prepend - 将元素添加到父元素开头', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      parent.insertBefore = jest.fn();
      
      dcEle.prepend(parent, child);
      expect(parent.insertBefore).toHaveBeenCalledWith(child, parent.firstChild);
    });

    test('remove - 移除元素', () => {
      const element = document.createElement('div');
      const parentElement = document.createElement('div');
      element.parentNode = parentElement;
      parentElement.removeChild = jest.fn();
      
      dcEle.remove(element);
      expect(parentElement.removeChild).toHaveBeenCalledWith(element);
    });

    test('empty - 清空元素内容', () => {
      const element = document.createElement('div');
      const child = document.createElement('div');
      element.appendChild(child);
      
      dcEle.empty(element);
      expect(element.children.length).toBe(0);
    });

    test('clone - 克隆元素', () => {
      const element = document.createElement('div');
      const cloned = dcEle.clone(element);
      expect(cloned).toBeTruthy();
    });

    test('replace - 替换元素', () => {
      const oldElement = document.createElement('div');
      const newElement = document.createElement('div');
      const parentElement = document.createElement('div');
      oldElement.parentNode = parentElement;
      parentElement.replaceChild = jest.fn();
      
      dcEle.replace(oldElement, newElement);
      expect(parentElement.replaceChild).toHaveBeenCalledWith(newElement, oldElement);
    });

    test('addToBody - 将元素添加到文档主体', () => {
      const element = document.createElement('div');
      
      dcEle.addToBody(element);
      expect(document.body.appendChild).toHaveBeenCalledWith(element);
    });
  });

  describe('其他辅助方法', () => {
    test('matches - 检查元素是否匹配选择器', () => {
      const element = document.createElement('div');
      element.matches = jest.fn(() => true);
      
      const result = dcEle.matches(element, '.test');
      expect(result).toBe(true);
    });

    test('getBoundingRect - 获取元素位置和尺寸', () => {
      const element = document.createElement('div');
      element.getBoundingClientRect = jest.fn(() => ({
        top: 0,
        left: 0,
        width: 100,
        height: 100
      }));
      
      const rect = dcEle.getBoundingRect(element);
      expect(rect).toBeTruthy();
      expect(rect.width).toBe(100);
    });

    test('isVisible - 检查元素是否可见', () => {
      const element = document.createElement('div');
      const result = dcEle.isVisible(element);
      expect(result).toBe(true);
    });

    test('setVisible - 设置元素显示状态', () => {
      const element = document.createElement('div');
      element.style = {};
      
      dcEle.setVisible(element, false);
      expect(element.style.display).toBe('none');
      
      dcEle.setVisible(element, true);
      expect(element.style.display).toBe('');
    });

    test('elementContains - 检查元素是否包含另一个元素', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');
      parent.appendChild(child);
      
      const result = dcEle.elementContains(parent, child);
      expect(result).toBe(true);
    });

    test('hasClass - 检查元素是否具有某个类', () => {
      const element = document.createElement('div');
      element.classList = {
        contains: jest.fn(() => true)
      };
      
      const result = dcEle.hasClass(element, 'test-class');
      expect(result).toBe(true);
    });

    test('addInlineStyleById - 为元素添加内联样式', () => {
      document.getElementById = jest.fn(() => {
        const element = document.createElement('div');
        element.style = {
          cssText: ''
        };
        return element;
      });
      
      dcEle.addInlineStyleById('test', 'color: red;');
      expect(document.getElementById).toHaveBeenCalledWith('test');
    });

    test('addInlineStyleByClass - 为元素添加内联样式', () => {
      document.getElementsByClassName = jest.fn(() => {
        const element = document.createElement('div');
        element.style = {
          cssText: ''
        };
        return [element];
      });
      
      dcEle.addInlineStyleByClass('test', 'color: red;');
      expect(document.getElementsByClassName).toHaveBeenCalledWith('test');
    });

    test('setTextContentByIdOrClassName - 设置元素文本内容', () => {
      document.querySelectorAll = jest.fn(() => {
        const element = document.createElement('div');
        return [element];
      });
      
      expect(() => {
        dcEle.setTextContentByIdOrClassName('test', '测试文本');
      }).not.toThrow();
    });

    test('tabSwitcher - 设置标签切换功能', () => {
      document.querySelector = jest.fn((selector) => {
        const element = document.createElement('div');
        element.children = [];
        element.addEventListener = jest.fn();
        return element;
      });
      
      dcEle.tabSwitcher('.tabs', '.contents');
      expect(document.querySelector).toHaveBeenCalled();
    });

    test('setupTabSwitching - 设置选项卡切换功能', () => {
      document.querySelectorAll = jest.fn(() => {
        const element = document.createElement('div');
        element.addEventListener = jest.fn();
        element.classList = {
          remove: jest.fn(),
          add: jest.fn()
        };
        return [element];
      });
      
      dcEle.setupTabSwitching('.tab-headers', '.tab-bodies');
      expect(document.querySelectorAll).toHaveBeenCalled();
    });
  });
});