// 设计稿的宽度和高度
const designWidth = 2560;
const designHeight = 1440;

/**
 * 将像素值转换为指定单位（vw或vh）的值。
 * @param {string} unit 转换目标单位，'vw'或'vh'。
 * @param {number} _px 原始像素值。
 * @returns {string} 转换后的值，包含单位。
 */
function px2Unit(unit, _px) {
    // 验证参数是否合法
    if (typeof _px !== 'number' || _px <= 0) {
        throw new Error('_px must be a positive number.');
    }
    // 计算并返回转换后的值
    return (_px * 100.0) / (unit === 'vw' ? designWidth : designHeight) + unit;
}

// 缩放函数，根据窗口大小调整缩放比例
let scale;
const updateScale = () => {
    // 根据当前窗口宽高比与设计稿宽高比，确定适当的缩放比例
    scale = document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight ? 
                (document.documentElement.clientWidth / designWidth) :
                (document.documentElement.clientHeight / designHeight);
};

// 初始化缩放比例
updateScale();

// 监听窗口大小改变事件，以动态更新缩放比例
window.addEventListener('resize', debounce(updateScale, 200));

/**
 * 防抖函数，用于限制函数的调用频率。
 * @param {Function} func 要被延迟执行的函数。
 * @param {number} wait 延迟时间，单位为毫秒。
 * @returns {Function} 返回一个新函数，该函数具有防抖功能。
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        // 设置延迟，以避免频繁调用
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 将关键函数绑定到全局对象上，以便在页面的其他脚本中调用
window.px2vw = (_px) => px2Unit('vw', _px);
window.px2vh = (_px) => px2Unit('vh', _px);
window.updateScale = updateScale;





/**
 * 侦听文档的滚动和按键事件，以禁止页面缩放。
 * 当用户按下 Ctrl 键（或 Mac 上的 Command 键）并滚动鼠标，或按下与缩放相关的键时，阻止默认行为。
 */
// 监听滚动事件以禁止页面缩放
document.addEventListener('wheel', function (e) {
  e = e || window.event;
  
  // 兼容不同浏览器的滚动事件处理，统一使用 e.deltaY
  let isScrolling = e.deltaY !== undefined ? e.deltaY : (e.wheelDelta ? e.wheelDelta : 0);
  
  // 当按下 Ctrl 键（或 Mac 上的 Command 键）并有滚动操作时，阻止默认行为
  if ((e.ctrlKey || e.metaKey) && isScrolling !== 0) {
    e.preventDefault();
  }
}, { capture: false, passive: false });

// 监听按键事件以禁止页面缩放
document.addEventListener('keydown', function (event) {
  // 简化按键判断逻辑，使用 event.key 替代 keyCode
  const zoomKeys = ['Equal', 'Minus', 'ArrowUp', 'ArrowDown']; // 定义与缩放相关的按键
  
  // 当按下 Ctrl 键（或 Mac 上的 Command 键）并按下缩放相关按键时，阻止默认行为
  if ((event.ctrlKey || event.metaKey) && zoomKeys.includes(event.key)) {
    event.preventDefault();
  }
}, false);



// ====================移动端设备的缩放比例====================
(function() {
  // 定义常量以避免字符串字面量的重复使用
  const DEVICE_TYPE_PC = 'pc';
  const DEVICE_TYPE_WAP = 'wap';

  // 封装RSRem相关代码到一个模块内
  const RSRemModule = (function() {
    const defaultSize = 750; // 默认字体大小为750

    /**
     * 创建ID为RSRem的元素节点
     * @param {string} eleID 元素的ID
     * @param {number} ReFontSize 元素的data-size属性值
     */
    function createEl(eleID, ReFontSize) {
      let RSRem = document.createElement('div');
      RSRem.setAttribute('id', eleID);
      RSRem.setAttribute('data-size', ReFontSize);
      document.body.appendChild(RSRem);
    }

    let RSRem = {
      el: document.getElementById('RSRem'), // 获取id为RSRem的元素节点
      defaultSize: defaultSize, // 默认字体大小为750
      /**
       * 设置字体大小
       * @param {string|number} size 要设置的字体大小
       */
      setSize: function(size) {
        try {
          this.size = parseInt(size, 10) || defaultSize; // 将传入的size转换为整数，若为空则使用默认字体大小
          this.remReSize(); // 调用remReSize方法重新设置字体大小
        } catch (error) {
          console.error('Error setting font size:', error);
        }
      },
      /**
       * 重新设置字体大小
       */
      remReSize: function() {
        let t = (document.documentElement.clientWidth / this.size).toFixed(2); // 计算字体大小比例
        document.documentElement.style.setProperty('font-size', 100 * t + 'px'); // 设置页面字体大小
      },
      /**
       * 初始化方法
       * @returns {Object} 返回包含移除监听器方法的对象
       */
      init: function() {
        let size = this.defaultSize; // 默认字体大小
        if (this.el) {
          // 如果存在id为RSRem的元素节点
          size = parseInt(this.el.getAttribute('data-size'), 10) || defaultSize; // 获取元素节点data-size属性值，若为空则使用默认字体大小
          console.log('font-size: ' + size);
        }
        this.setSize(size); // 设置字体大小

        // 添加事件监听器，并使用函数闭包来存储事件处理函数，以便未来移除监听器
        let resizeHandler = debounce(() => {
          RSRem.remReSize(); // 调用remReSize方法重新设置字体大小
        }, 100); // 使用100毫秒的防抖时间

        let loadHandler = () => {
          RSRem.remReSize(); // 调用remReSize方法重新设置字体大小
        };

        window.addEventListener('resize', resizeHandler, false);
        window.addEventListener('load', loadHandler, false);

        // 返回处理函数以便未来移除监听器
        return {
          removeResizeListener: function() {
            window.removeEventListener('resize', resizeHandler, false);
          },
          removeLoadListener: function() {
            window.removeEventListener('load', loadHandler, false);
          }
        };
      }
    };

    // 返回公共接口
    return RSRem;
  })();

  // 初始化RSRem对象
  RSRemModule.init();

  // 判断设备类型，pc表示pc端，wap表示移动端
  function getDevice() {
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      return DEVICE_TYPE_WAP; // 设备类型为移动端
    } else {
      return DEVICE_TYPE_PC; // 设备类型为pc端
    }
  }

  // 使用IIFE封装以避免全局变量污染
  (function() {
    let headDom = document.getElementsByTagName('head')[0];
    let deviceType = getDevice();

    if (deviceType === DEVICE_TYPE_PC) {
      // 如果设备类型为pc
      document.addEventListener('DOMContentLoaded', () => createEl('RSRem', '1920'));
      RSRemModule.init();
    } else {
      // 如果设备类型为移动端
      document.addEventListener('DOMContentLoaded', () => createEl('RSRem', '750'));
      RSRemModule.init();
    }
  })();

  // 防抖函数
  /**
   * 函数防抖
   * @param {Function} func 要执行的函数
   * @param {number} wait 延迟时间
   * @returns {Function} 返回一个新函数
   */
  // function debounce(func, wait) {
  //   let timeout;
  //   return function() {
  //     const context = this, args = arguments;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func.apply(context, args), wait);
  //   };
  // }
})();



// 适配2
(function (win, doc) {
  /**
   * 安全添加事件监听器，兼容多种浏览器
   * @param {HTMLElement} element - 目标元素
   * @param {string} event - 事件类型
   * @param {Function} handler - 事件处理函数
   * @param {boolean} useCapture - 是否使用捕获
   */
  function addEventListenerSafe(element, event, handler, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, useCapture);
    } else {
      // 兼容旧版IE浏览器
      element.attachEvent('on' + event, handler);
    }
  }

  /**
   * 节流函数，优化频繁触发的事件处理，如resize
   * @param {Function} func - 待节流的函数
   * @param {number} wait - 延迟时间，单位ms
   * @return {Function} 返回一个节流后的函数
   */
  function throttle(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  /**
   * 根据窗口大小动态设置html元素的字体大小
   */
  function setFont() {
    var html = document.documentElement;
    var k = 1920; // 设定的基准宽度

    // 窗口宽度与基准宽度的比例用于调整字体大小
    if (html.clientWidth / k * 100 >= 100) {
      html.style.fontSize = '100px';
    } else if (html.clientWidth / k * 100 <= 64) {
      html.style.fontSize = '64px';
    } else {
      html.style.fontSize = html.clientWidth / k * 100 + 'px';
    }
  }

  /**
   * 初始化函数，页面加载以及窗口大小改变时调用setFont函数
   */
  function init() {
    setFont();
    // 使用节流函数优化resize事件的处理
    addEventListenerSafe(window, 'resize', throttle(setFont, 100), false);
  }

  // 页面加载完成后执行初始化
  // 兼容性处理，添加事件监听器
  addEventListenerSafe(doc, 'DOMContentLoaded', init, false);
  addEventListenerSafe(win, 'load', init, false);
})(window, document);