// 浏览器相关

/**
 * 检查浏览器视口是否已滚动到页面底部
 * @returns {boolean} true:已滚动到页面底部 false:未滚动到页面底部
 * 如果页面高度小于视口高度，则返回true
 * 
*/
function bottomVisibleDebounced() {
  // 增加错误处理
  try {
    // 使用requestAnimationFrame进行性能优化
    // 如果在上一个requestAnimationFrame之后调用了该函数，则取消之前的请求
    if (bottomVisibleDebounced.cancel) {
      bottomVisibleDebounced.cancel();
    }

    // 使用debounce技术限制函数调用频率
    bottomVisibleDebounced.timeout = setTimeout(() => {
      const docViewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const docScrollHeight = document.documentElement.scrollHeight || document.documentElement.clientHeight;
      const scrollHeight = docScrollHeight - docViewHeight;
      const pageYOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      if (pageYOffset >= scrollHeight) {
        // 页面已滚动到接近底部
        console.log("Bottom visible");
      }
    }, 100); // 100ms内最多调用一次
  } catch (error) {
    console.error("An error occurred in bottomVisibleDebounced:", error);
  }
}

// 使用一个变量来存储cancel函数，如果需要则取消requestAnimationFrame
bottomVisibleDebounced.cancel = null;

// 示例调用
bottomVisibleDebounced();



/**
 * 异步复制文本到剪贴板的函数。
 * @param {string} val 需要被复制的文本。
 * @returns {void} 不返回任何内容。
 */
const copyText = async (val) => {
  try {
    // 尝试使用 Clipboard API 进行复制
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(val);
        console.log('复制成功');
        return;
      } catch (error) {
        console.error('使用 Clipboard API 复制失败:', error);
      }
    }

    // 对不支持 Clipboard API 的浏览器采用兼容性处理方案
    const textArea = document.createElement('textarea');
    // 配置 textarea 的属性，以隐藏并防止用户选中
    Object.assign(textArea, {
      value: val,
      style: {
        position: 'fixed',
        left: '-999px',
        top: '0',
        width: '0',
        height: '0',
        opacity: '0',
        zIndex: '-999',
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
      },
      readonly: true,
    });

    // 将 textarea 添加到 DOM 中，并尝试选择文本以执行复制操作
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');

    // 完成复制后，从 DOM 中移除 textarea
    document.body.removeChild(textArea);

    // 检查复制是否成功，如果失败则抛出错误
    if (!success) {
      throw new Error('无法复制文本');
    }
  } catch (error) {
    console.error('复制失败:', error);
  }
};

/**
 * 监听文档点击事件，以绑定复制事件。
 */
document.addEventListener('click', async () => {
  const textToCopy = '这是要复制到剪贴板的内容';
  try {
    await copyText(textToCopy);
  } catch (error) {
    console.error('复制失败:', error);
  }
});



/**
 * 安全地将给定字符串复制到剪贴板。
 * @param {string} str 需要被复制的字符串。
 */
const copyToClipboard = str => {
  // 对输入字符串进行基本的清理，避免XSS攻击。这里只是一个简单的示例，具体实现应根据实际情况进行调整。
  if (typeof str !== 'string' || !str) {
    console.error('Invalid input');
    return;
  }
  str = escapeHTML(str);

  try {
    // 创建一个隐藏的textarea元素
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);

    // 保存当前的选区，以便之后恢复
    const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    
    // 选中文本并执行复制命令
    el.select();
    document.execCommand('copy');

    // 清理DOM，恢复之前的选区
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }

    // 成功复制后，可以在这里提供用户反馈
    console.log('Text copied to clipboard successfully.');
  } catch (err) {
    // 处理可能的异常，例如在不支持execCommand的浏览器中运行
    console.error('Failed to copy text to clipboard.', err);
  }
};

// 用于防止XSS的简单HTML转义函数
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[tag] || tag));
}

// 示例调用
copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.



/**
 * 一个计数器函数，通过指定时长更新DOM元素的内容。
 * @param {string} selector 要更新内容的元素的CSS选择器。
 * @param {number} start 计数器的起始值。
 * @param {number} end 计数器的结束值。
 * @param {number} step 每一步的增量或减量值。正数为递增，负数为递减。
 * @param {number} duration 计数器运行的总时长（毫秒）。
 * @returns {number} 定时器的间隔ID。
 */
const counter = (selector, start, end, step = 1, duration = 2000) => {
  // 输入验证
  if (typeof start !== 'number' || typeof end !== 'number' || typeof step !== 'number' || typeof duration !== 'number') {
    console.error('Invalid input types.');
    return -1;
  }
  if (start === end || step === 0) {
    console.error('Invalid counter configuration: start must be different from end, and step must not be zero.');
    return -1;
  }

  let current = start;
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Element with selector '${selector}' not found.`);
    return -1;
  }

  // 根据起始和结束值确保步进方向正确
  const _step = (end - start) * step < 0 ? -step : step;

  // 根据持续时间和范围计算更新间隔
  const updateInterval = Math.abs(Math.floor(duration / (end - start)));

  const timer = setInterval(() => {
    current += _step;
    
    // 更新元素的文本内容
    element.textContent = current;
    
    // 当当前值达到或超过结束值时，停止计时器
    if (current >= end) {
      element.textContent = end;
      clearInterval(timer);
    }
  }, updateInterval);

  return timer;
};

// 示例用法
counter('#my-id', 1, 1000, 5, 2000); // 为id为"my-id"的元素创建一个2秒的计时器



/**
 * 获取当前页面的URL。
 * 该函数返回浏览器当前加载页面的完整URL。
 * 
 * @returns {string} 当前页面的URL。
 */
const getCurrentURL = () => {
  try {
    // 尝试获取当前页面的URL，考虑到极端情况下可能对window对象或location属性的访问会抛出异常。
    return window.location.href;
  } catch (error) {
    // 在出现异常时，记录错误或返回一个默认URL。
    console.error("无法获取当前页面的URL：", error);
    // 根据具体情况，这里可以选择返回一个默认的URL，或者null。
    // 这里假设我们返回null作为错误指示。
    return null;
  }
};

// 调用函数以获取当前URL。
const currentURL = getCurrentURL();
console.log(currentURL); // 'https://www.google.com/'



/**
 * 检测当前设备类型（移动端或桌面端）。
 * @returns {string} 表示设备类型的字符串（'Mobile' 或 'Desktop'）。
 * 
*/
const detectDeviceType = (() => {
  // 使用闭包来缓存结果
  let cachedType;

  // 使用一个函数来生成正则表达式，以便于未来更新和维护
  const getDeviceTypeRegex = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  };

  // 私有函数，用于实际的检测逻辑
  const detect = () => {
    const userAgent = navigator.userAgent;
    // 使用缓存的正则表达式进行匹配
    const isMobile = getDeviceTypeRegex().test(userAgent);

    // 根据是否是移动设备返回对应的结果
    return isMobile ? 'Mobile' : 'Desktop';
  };

  // 公共接口，确保只计算一次并缓存结果
  return () => {
    if (!cachedType) {
      cachedType = detect();
    }
    return cachedType;
  };
})();

// 使用示例
console.log(detectDeviceType()); // "Mobile" 或 "Desktop"



// 定义一个节流函数，用于减少函数调用频率
function throttle(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 更新视口尺寸的缓存
let cachedInnerHeight = window.innerHeight;
let cachedInnerWidth = window.innerWidth;

// 实际的检测函数
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  // 参数有效性检查
  if (!(el instanceof Element)) {
    throw new TypeError('Expected an element');
  }

  // 获取元素边界和缓存的视口尺寸
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const windowHeight = cachedInnerHeight || window.innerHeight;
  const windowWidth = cachedInnerWidth || window.innerWidth;

  // 判断元素是否可见
  if (partiallyVisible) {
    const isPartiallyVisibleHorizontal = (left > 0 && left < windowWidth) || (right > 0 && right < windowWidth);
    const isPartiallyVisibleVertical = (top > 0 && top < windowHeight) || (bottom > 0 && bottom < windowHeight);
    return isPartiallyVisibleHorizontal && isPartiallyVisibleVertical;
  } else {
    return top >= 0 && left >= 0 && bottom <= windowHeight && right <= windowWidth;
  }
};

// 监听窗口大小改变事件，更新缓存的视口尺寸
function updateCachedViewportSize() {
  cachedInnerHeight = window.innerHeight;
  cachedInnerWidth = window.innerWidth;
}

// 使用节流技术监听窗口大小改变事件，以减少对updateCachedViewportSize的调用频率
window.addEventListener('resize', throttle(updateCachedViewportSize, 100));

// 示例调用
// 假定 'el' 是一个有效的 DOM 元素引用
// elementIsVisibleInViewport(el); // 根据实际位置和大小返回true或false



/**
 * 将HTML表单数据转换为JavaScript对象。
 *
 * @function formToObject
 * @param {HTMLFormElement} form - 需要转换的HTML表单元素。
 * @returns {Object.<string, (string|Array.<string>)>} - 表单字段名与对应的值组成的对象。如果表单中有多个具有相同name属性的元素（如复选框或radio按钮），则该名称对应的值将是一个包含所有选中值的数组。
 * @throws {Error} - 如果传入的参数不是HTMLFormElement实例，则抛出错误。
 */
const formToObject = (form) => {
  // 异常处理：确保传入的是一个有效的HTMLFormElement
  if (!(form instanceof HTMLFormElement)) {
    throw new Error('Invalid form: form parameter must be an HTMLFormElement.');
  }

  /**
   * 使用reduce方法遍历FormData，并将结果累加到目标对象中。
   *
   * @param {Object.<string, (string|Array.<string>)>} acc - 累加器对象，用于存储已处理的数据。
   * @param {[string, string]} entry - 当前FormData键值对，由reduce提供的数组项。
   * @returns {Object.<string, (string|Array.<string>)>} - 更新后的累加器对象。
   */
  const reducer = (acc, [key, value]) => {
    // 处理具有相同name属性的表单元素，将其值合并到数组中
    acc[key] = acc[key] instanceof Array ? acc[key].concat(value) : [acc[key], value];
    return acc;
  };

  // 转换表单数据并应用reducer函数
  return Array.from(new FormData(form)).reduce(reducer, {});
};

try {
  // 假设 '#form' 是页面上有效的表单ID
  console.log(formToObject(document.querySelector('#form')));
} catch (error) {
  console.error(error.message);
}



/**
 * 获取URL的基础部分，即到查询参数（问号 "?" 之前的部分）。
 * @param {string} url - 待处理的URL字符串。
 * @returns {string} - 处理后的URL基础部分。
 * @throws {TypeError} - 如果传入的参数不是字符串。
 */
const getBaseURL = url => {
  // 类型检查，确保url是字符串
  if (typeof url !== 'string') {
    throw new TypeError('Expected a string as the URL argument');
  }

  // 使用正则表达式提取URL的基础部分
  const regex = /^https?:\/\/[^?]+/;
  const match = url.match(regex);
  
  // 如果匹配成功，返回匹配到的字符串；否则，返回原始URL。
  return match ? match[0] : url;
};

// 测试例子
console.log(getBaseURL('http://url.com/page?name=Adam&surname=Smith')); // 'http://url.com/page'
console.log(getBaseURL('?name=Adam')); // '?name=Adam', 由于正则表达式的限制，这种情况下返回原字符串可能是更合理的行为
console.log(getBaseURL('not-a-url')); // 'not-a-url', 因为没有有效的URL格式，返回原字符串
console.log(getBaseURL(null)); // 抛出TypeError: Expected a string as the URL argument



/**
 * 获取当前页面URL的查询参数。
 * @returns {string|undefined} 返回查询参数字符串，如果不存在则返回undefined。
 */
function getUrlParam() {
  const url = document.location.toString();
  const urlParts = url.split("?");
  
  // 检查是否存在查询参数
  if (urlParts.length > 1) {
    return urlParts[1];
  }
  
  // 如果不存在查询参数，返回undefined
  return undefined;
}

// 调用函数
getUrlParam();



/**
 * 从URL的查询字符串中获取指定参数的值。
 * @param {string} name 参数的名称。
 * @returns {string} 参数的值，如果不存在则返回空字符串。
 */
function GetQueryString(name) {
  // 使用try-catch处理可能的异常，例如当location.search为空时。
  try {
      // 创建一个预编译的正则表达式，避免每次调用时重复编译，提高性能。
      var reg = new RegExp("(^|&)" + encodeURIComponent(name) + "=([^&]*)(&|$)", "i");
      var r = window.location.search.slice(1).match(reg); // 使用slice而不是substr来提高兼容性
      var context = r ? r[2] : ""; // 简化对结果的处理，无需检查"undefined"

      // 对获取的值进行解码，以确保正确解析特殊字符。
      return decodeURIComponent(context);
  } catch (e) {
      console.error("Error parsing query string:", e);
      return ""; // 在异常情况下返回空字符串，或根据需求进行其他处理。
  }
}

// 获取URL中vfm参数的值
console.log(GetQueryString("vfm"));



/**
 * 获取当前页面URL的查询参数，并解析为一个对象。
 * 该函数不接受任何参数。
 * 
 * @returns {Object} 返回一个包含查询参数的对象。每个参数都是对象的键，对应的值是参数的值。
 */
function GetRequest() {
  // 创建一个URLSearchParams实例，用于解析当前URL的查询字符串
  const urlSearchParams = new URLSearchParams(location.search);
  // 用于存储解析后的查询参数的对象
  const theRequest = {};

  // 遍历查询参数，将它们以键值对的形式存入theRequest对象
  for (const [key, value] of urlSearchParams.entries()) {
      theRequest[key] = value;
  }

  // 返回包含查询参数的对象
  return theRequest;
}

// 利用GetRequest函数获取当前页面的查询参数
const Request = GetRequest();

// 示例：如何访问参数
// 下面的代码展示了如何以安全的方式处理和访问参数，如果参数未定义，则提供一个默认值
console.log(Request['vfm'] ?? '参数1未定义');
console.log(Request['fv'] ?? '参数2未定义');



/**
 * 获取给定元素内所有<img>标签的src属性值。
 * 如果includeDuplicates为false，则返回去重后的图片源列表。
 * 
 * @param {Element} el - DOM元素，从中获取<img>标签。
 * @param {boolean} includeDuplicates - 是否包括重复的图片源。
 * @returns {Array} 包含图片源URL的数组。
 */
const getUniqueImageSrcs = (el, includeDuplicates = false) => {
  // 检查el是否为有效的DOM元素
  if (!(el instanceof Element)) {
    throw new TypeError('提供的参数不是一个有效的DOM元素。');
  }

  try {
    // 获取所有的<img>元素，并提取src属性值
    let images = [...el.getElementsByTagName('img')].map(img => {
      const src = img.getAttribute('src');
      // 这里可以添加对src的校验，以避免XSS攻击，示例略
      return src;
    });

    // 如果不包括重复项，则使用Set去重
    if (!includeDuplicates) {
      images = [...new Set(images)];
    }

    return images;
  } catch (error) {
    // 捕获并处理可能出现的异常
    console.error('获取图片源时发生错误：', error);
    throw error; // 重新抛出异常，以便调用者能够处理
  }
};

// 示例调用
try {
  console.log(getUniqueImageSrcs(document.body, true)); // 包括重复项
  console.log(getUniqueImageSrcs(document.body, false)); // 不包括重复项
} catch (error) {
  // 处理可能的异常，例如显示错误信息
  console.error('无法获取图片源：', error);
}



/**
 * 获取给定元素的滚动位置。默认元素为window。
 * 该函数考虑了兼容性，适用于大多数现代浏览器。
 * 
 * @param {Object} el - 需要获取滚动位置的元素，默认为window。
 * @returns {Object} 包含x和y属性的对象，表示滚动位置。
 */
const getScrollPosition = (el = window) => {
  // 验证传入的el是否为DOM元素或window对象
  if (!(el === window || el instanceof HTMLElement)) {
    console.warn('getScrollPosition: 传入的元素不是DOM元素或window对象。');
    return { x: 0, y: 0 };
  }

  // 使用ES6的特性简化代码，同时保持逻辑的清晰
  return {
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  };
};

// 示例调用
getScrollPosition(); // {x: 0, y: 200}



/**
 * 获取当前窗口中选中的文本。
 * @returns {string} 当前选中的文本。
 */
const getSelectedText = () => {
  try {
    // 尝试获取当前选中的文本。
    return window.getSelection().toString();
  } catch (error) {
    // 在出现异常时，记录错误并返回一个空字符串。
    console.error("获取选中文本时发生错误:", error);
    return "";
  }
};

// 示例调用
getSelectedText(); // 例如：'Lorem ipsum' 或者在无选中文本时返回空字符串



/**
 * 获取给定元素的所有同级元素（兄弟姐妹元素）。
 * @param {Element} el - 待查询的DOM元素。
 * @return {Array<Element>} - 元素的同级元素数组。
 * @throws {TypeError} - 如果传入的不是DOM元素。
 */
const getSiblings = el => {
  // 检查是否为有效的DOM元素
  if (!(el instanceof Element)) {
    throw new TypeError('Expected a DOM element');
  }

  // 使用el.parentNode.children来直接获取元素节点列表，
  // 这样不需要过滤非元素节点，提高性能。
  const children = Array.from(el.parentNode.children);

  // 确保el在children列表中，以避免边界条件错误
  // （例如，当el是document时）
  const index = children.indexOf(el);
  if (index > -1) {
    children.splice(index, 1);
  }

  return children;
};

// 示例调用：获取<head>元素的同级元素
// 注意：这里的输出将是一个空数组，因为<head>没有同级元素
console.log(getSiblings(document.querySelector('head')));



/**
 * 获取指定元素的指定样式值。
 * @param {Element} el - DOM元素。
 * @param {string} ruleName - 样式名。
 * @returns {string} - 样式值。
 * @throws {TypeError} - 如果ruleName不是字符串类型。
 * @throws {Error} - 如果元素不存在或无法获取计算样式。
 */
const getStyle = (el, ruleName) => {
  if (typeof ruleName !== 'string') {
    throw new TypeError('ruleName must be a string');
  }
  
  // 检查el是否是有效的DOM元素
  if (!el || !(el instanceof Element)) {
    throw new Error('Invalid element provided');
  }
  
  const computedStyle = getComputedStyle(el);
  if (!computedStyle) {
    throw new Error('Unable to get computed style for element');
  }
  
  // 确保能够获取到ruleName对应的样式值
  if (!(ruleName in computedStyle)) {
    throw new Error('Invalid ruleName provided');
  }
  
  return computedStyle[ruleName];
};

// 示例调用
const paragraphElement = document.querySelector('p');
if (paragraphElement) {
  const fontSize = getStyle(paragraphElement, 'font-size');
  console.log(fontSize); // '22px'
}



/**
 * 解析URL查询参数。
 * @param {string} url - 包含查询参数的URL字符串。
 * @returns {Object} 包含查询参数的对象。
 */
const getURLParameters = (url) => {
  // 验证输入是否为字符串
  if (typeof url !== 'string') {
    throw new TypeError('URL参数解析函数期望一个字符串作为输入');
  }

  try {
    // 创建一个URL实例，这将自动处理无效URL的情况
    const urlObject = new URL(url);
    // 使用URLSearchParams API解析查询参数，更加高效和安全
    const searchParams = urlObject.searchParams;
    // 返回一个对象，包含所有的查询参数
    return Object.fromEntries(searchParams.entries());
  } catch (error) {
    console.error('解析URL参数时出错:', error);
    // 在出现异常时返回一个空对象，或根据需要抛出错误
    return {};
  }
};

// 测试示例
console.log(getURLParameters('http://url.com/page?name=Adam&surname=Smith'));
// 预期输出: { name: 'Adam', surname: 'Smith' }
console.log(getURLParameters('google.com'));
// 预期输出: {}
console.log(getURLParameters('http://url.com/page?&'));
// 预期输出: {} 与原函数相同，但处理更加合理



/**
 * 使用浏览器内置的Web Cryptography API计算给定字符串的SHA-256哈希值。
 *
 * @param {string} val - 需要进行哈希计算的UTF-8编码的字符串。
 * @returns {Promise<string>} - 返回一个包含SHA-256哈希值的Promise对象，该值为小写16进制字符串。
 * @throws {Error} - 如果浏览器不支持Web Cryptography API或输入不是一个字符串，则抛出错误。
 */
const hashBrowser = async val => {
  try {
    // 检查浏览器是否支持Web Cryptography API
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error('Your browser does not support the Web Cryptography API.');
    }

    // 验证输入是否为字符串
    if (typeof val !== 'string') {
      throw new Error('Input must be a string.');
    }
    
    // 使用crypto API进行SHA-256哈希计算
    const hashed = await window.crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val));
    const hexes = Array.from(new Uint8Array(hashed), byte => byte.toString(16).padStart(2, '0'));
    return hexes.join('');
  } catch (error) {
    console.error('Error hashing browser:', error);
    throw error;
  }
};

hashBrowser(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } }))
  .then(console.log)
  .catch(console.error);



/**
 * 执行HTTP DELETE请求到指定的URL。
 * @param {string} url - 要发送DELETE请求的URL。
 * @param {Function} callback - 请求成功时执行的回调函数。
 * @param {Function} err - 请求失败时执行的错误回调函数，默认为console.error。
 * @param {Object} options - 请求的附加选项，如headers。
 */
const performHttpDelete = (url, callback, err = console.error, options = {}) => {
  const request = new XMLHttpRequest();

  // 在设置headers之前打开请求
  request.open('DELETE', url, true);

  // 如果提供了headers，则设置请求头
  if (options.headers) {
    Object.keys(options.headers).forEach(key => {
      request.setRequestHeader(key, options.headers[key]);
    });
  }

  request.onload = () => {
    // 请求成功时的处理逻辑
    if (request.status >= 200 && request.status < 300) {
      callback(request);
    } else {
      // 请求失败时执行错误回调
      err(request);
    }
  };
  request.onerror = () => err(request); // 请求发生错误时的处理逻辑

  // 显式发送空body的请求，因为DELETE方法可能不需要body
  request.send();
};

performHttpDelete('https://jsonplaceholder.typicode.com/posts/1', response => {
  console.log(response.responseText);
}, {}, {
  headers: {
    'Content-Type': 'application/json',
  }
});



/**
 * 使用XMLHttpRequest执行GET请求。
 * @param {string} url 请求的URL。
 * @param {Function} callback 请求成功时的回调函数，接收响应文本作为参数。
 * @param {Function} [err=console.error] 请求错误时的回调函数，接收Error对象作为参数。
 */
const httpGet = (url, callback, err = console.error) => {
  // 对URL进行简单的格式校验，避免明显的错误URL
  if (!/^https?:\/\/[^ "]+$/.test(url)) {
    err(new Error('Invalid URL format'));
    return;
  }
  
  // 使用encodeURIComponent对URL进行编码
  const encodedUrl = encodeURIComponent(url);

  const request = new XMLHttpRequest();
  request.open('GET', encodedUrl, true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      // 成功响应
      callback(request.responseText);
    } else {
      // 处理非成功状态
      err(new Error(`Request failed. Returned status of ${request.status}`));
    }
  };

  // 统一错误处理，包括网络错误和服务器错误
  request.onerror = () => {
    err(new Error('Network error'));
  };

  // 跨域请求可能不触发onerror，而是触发onreadystatechange，因此增加对其的处理
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 0) {
        err(new Error('Network error or CORS issue'));
      }
    }
  };

  request.send();
};

// 定义一个成功回调函数
const successCallback = (responseText) => {
  console.log('Response:', responseText);
  // 在这里可以对返回的数据进行进一步处理或解析JSON等操作
};

// 定义一个自定义错误处理函数（也可以使用默认的console.error）
const errorCallback = (error) => {
  console.error('Error fetching data:', error.message);
  // 在这里可以进行错误处理，如显示错误提示信息给用户等
};

// 使用httpGet函数发送GET请求
const urlToFetch = 'https://api.example.com/data';
httpGet(urlToFetch, successCallback, errorCallback);



/**
 * 优化HTTP POST请求功能 
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} data - The data to be sent in the POST request.
 * @param {Function} callback - The function to call on successful request.
 * @param {Function} err - The function to call on request error. Defaults to console.error.
 */
const httpPost = (url, data, callback, err = console.error) => {
  // 基本输入验证
  if (typeof url !== 'string' || !url.trim() || typeof data !== 'object' || typeof callback !== 'function') {
    err(new Error('Invalid input parameters'));
    return;
  }

  // 准备请求
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  
  // 增强的错误处理
  request.onerror = () => {
    const errorMsg = `Request failed. Status: ${request.status}. Response: ${request.responseText}`;
    err(new Error(errorMsg));
  };

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      // 成功的请求
      callback(request.responseText);
    } else {
      // 处理错误状态
      const errorMsg = `Request failed with status ${request.status}: ${request.statusText}`;
      err(new Error(errorMsg));
    }
  };

  // 安全地发送数据
  try {
    const sanitizedData = JSON.stringify(data);
    request.send(sanitizedData);
  } catch (error) {
    err(new Error('Data serialization failed: ' + error.message));
  }
};

// 示例数据
const newPost = {
  userId: 1,
  id: 1337,
  title: 'Foo',
  body: 'bar bar bar'
};

// 转换数据并发送post请求
const data2 = JSON.stringify(newPost);
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  data2,
  console.log
);



/**
 * 优化的HTTP PUT请求函数，具有增强的错误处理和安全性。
 * @param {string} url - 要发送PUT请求的URL。
 * @param {Object} data - PUT请求中要发送的数据。
 * @param {Function} callback - 请求成功时调用的函数。
 * @param {Function} err - 请求错误时调用的函数，默认为console.error。
 */
const httpPut = (url, data, callback, err = console.error) => {
  // 基本输入验证
  if (typeof url !== 'string' || !url.trim() || typeof data !== 'object' || typeof callback !== 'function') {
    err(new Error('Invalid input parameters'));
    return;
  }

  // 准备请求
  const request = new XMLHttpRequest();
  request.open('PUT', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  
  // 增强的错误处理
  request.onerror = () => {
    const errorMsg = `Request failed. Status: ${request.status}.`;
    err(new Error(errorMsg));
  };

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      // 请求成功
      callback(request.responseText);
    } else {
      // 处理错误状态
      const errorMsg = `Request failed with status ${request.status}: ${request.statusText}`;
      err(new Error(errorMsg));
    }
  };

  // 安全地发送数据
  try {
    const sanitizedData = JSON.stringify(data);
    request.send(sanitizedData);
  } catch (error) {
    err(new Error('Data serialization failed: ' + error.message));
  }
};

// 示例数据
const updatedPost = {
  userId: 1,
  id: 1,
  title: 'Updated Foo',
  body: 'Updated bar bar bar'
};

// 确保这里的回调函数是一个有效的函数引用
httpPut(
  'https://jsonplaceholder.typicode.com/posts/1', // 验证URL是否正确且支持PUT请求
  updatedPost, // 直接使用数据对象，不需要JSON.stringify在此处（但在实际发送请求时会进行序列化）
  (response) => {
    console.log('PUT request succeeded:', response);
  },
  (error) => {
    console.error('PUT request failed:', error.message);
  }
);



/**
 * 如果当前通过 HTTPS 访问，则将页面重定向到 HTTP.
 *  
 */
const httpsRedirect = () => {
  const HTTP_PROTOCOL = 'http:';
  const HTTPS_PROTOCOL = 'https:';

  if (location.protocol === HTTP_PROTOCOL) {
    try {
      // 拆分URL以获得域，并确保保留原始路径、查询参数和锚(如果有的话)。
      const urlParts = location.href.split('//');
      const domainAndPath = urlParts[1].split('/')[0] + (urlParts[1].includes('/') ? '/' : '');
      const newUrl = HTTPS_PROTOCOL + '//' + domainAndPath + location.href.substring(domainAndPath.length);

      // 执行重定向
      location.replace(newUrl);
    } catch (error) {
      console.error('Error occurred while redirecting to HTTPS:', error);
      // todo: 在这里提供回退操作或默认操作
    }
  }
};

httpsRedirect();



/**
 * 安全地将HTML字符串插入到DOM中
 * @param {string} el - 要插入HTML的元素的ID。
 * @param {string} htmlString - 要插入的HTML字符串。
*/
const safeInsertHTML = (el, htmlString) => {
  // 创建一个文档片段
  const fragment = document.createDocumentFragment();

  // 使用innerHTML解析并创建DOM节点（同时进行XSS预防）
  const div = document.createElement('div');
  div.innerHTML = htmlString;

  // 将解析后的所有子节点移动到文档片段中
  while (div.firstChild) {
    fragment.appendChild(div.firstChild);
  }

  // 在原元素后插入文档片段中的所有子节点
  el.insertAdjacentElement('afterend', fragment);
};


/**
 * 增加异常处理和边界条件检查的insertAfter函数
 * @param {string} elId - 要插入HTML的元素的ID。
 * @param {string} htmlString - 要插入的HTML字符串。
 */
const insertAfter = (elId, htmlString) => {
  const el = document.getElementById(elId);

  // 检查目标元素是否存在
  if (!el) {
    console.error(`Element with ID: ${elId} not found.`);
    return;
  }
  
  try {
    safeInsertHTML(el, htmlString);
  } catch (error) {
    console.error(`Error inserting HTML after element: ${error}`);
  }
};

// 使用示例
insertAfter('common-footer', '<p>after</p>');



/**
 * 判断给定的URL是否为绝对URL
 * @param {string} str - 要检查的URL。
 * @return {boolean} 如果给定的URL是绝对URL，则返回true，否则返回false。
 */
const isAbsoluteURL = str => {
  // 使用更新的正则表达式以支持更广泛的有效URL格式
  // 同时增加了对常见协议的显式排除（如javascript:），增强了安全性
  // 注意：这个正则表达式仍然不完全支持所有合法的URL格式，但对于简单使用场景来说已经足够安全和灵活。
  const urlRegex = /^(https?|ftp|file|data|chrome-extension):\/\/[\w.-]+(\.[\w.-]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
  return urlRegex.test(str);
};

isAbsoluteURL('https://google.com'); // true
isAbsoluteURL('ftp://www.myserver.net'); // true
isAbsoluteURL('/foo/bar'); // false
isAbsoluteURL('javascript:alert(1)'); // false



/**
 * 检测当前执行环境是否为浏览器环境。
 * 通过检查 `window` 和 `document` 对象的存在性来判断。
 * 注意：此方法不适用于 Web Workers 和 Service Workers 等特殊环境。
 * 
 * @returns {boolean} 如果当前环境为浏览器环境，则返回 true，否则返回 false。
 */
const isBrowser = () => {
  // 尽量避免直接依赖于全局对象，使用 try-catch 来增强代码的健壮性。
  try {
    // 检查 `window` 和 `document` 的存在性。
    // 为了应对更多边缘情况，例如 Web Workers (where `window` may exist but `document` is undefined)
    // 和 Service Workers (可能没有 `window`，但有 `self`)，进行如下检查：
    const isWindowDefined = typeof window !== 'undefined' && window !== null;
    const isDocumentDefined = typeof document !== 'undefined' && document !== null;

    // 当且仅当 `window` 和 `document` 都存在时，才认为是传统的浏览器环境。
    return isWindowDefined && isDocumentDefined;
  } catch (error) {
    // 在出现异常时，例如在 Node.js 环境中访问 `window` 或 `document` 会抛出错误，
    // 我们可以捕获这个错误并安全地返回 false。
    console.warn('An error occurred while detecting the execution environment. Defaulting to non-browser environment.');
    return false;
  }
};

// 测试代码
console.log(isBrowser()); // 在浏览器中应该输出 true
// 如果在 Node.js 环境或 Web Workers、Service Workers 等特殊环境中运行，将输出 false。



/**
 * 检测当前浏览器标签是否处于活动状态。
 * 依赖于document.hidden属性，属于浏览器环境特有API。
 * 
 * @returns {boolean} 如果当前标签页是活动的，则返回true；否则返回false。
 */
const isBrowserTabFocused = (documentObj = document) => {
  // 检查传入的document对象是否存在，以增加代码的健壮性。
  if (!documentObj) {
    console.error('Document object is not available. This function is intended to be used in a browser environment.');
    // 在非浏览器环境中调用时给出默认行为或抛出错误是值得考虑的，这里选择返回false作为默认行为。
    return false;
  }

  // 检测document.hidden属性是否存在，以应对未来可能的API变动。
  if (!('hidden' in documentObj)) {
    console.warn('document.hidden is not available. This function may not behave as expected.');
    // 同样，返回false作为默认行为。
    return false;
  }

  // 返回document.hidden的值，表示当前标签页是否被隐藏。
  return !documentObj.hidden;
};

// 通常情况下，直接调用函数即可。
isBrowserTabFocused(); // true 或 false，取决于当前标签页的状态。



/**
 * 优化后的 listenOnce 函数，包含元素存在性检查和更健壮的错误处理
 * @param {Element|String} el - DOM 元素或其 ID 字符串
 * @param {String} evt - 事件类型
 * @param {Function} fn - 事件处理函数
 */
const listenOnce = (el, evt, fn) => {
  // 允许传入元素ID字符串，将其转换为元素
  if (typeof el === 'string') {
    el = document.getElementById(el);
  }
  
  // 检查元素是否存在
  if (!el) {
    console.warn(`Element with ID: '${typeof el === 'string' ? el : el.id}' not found.`);
    return;
  }

  try {
    el.addEventListener(evt, fn, { once: true });
  } catch (error) {
    console.error(`Error while trying to add event listener: ${error}`);
  }
};

// 使用改进后的 listenOnce 函数
listenOnce('my-id', 'click', () => console.log('Hello world'));



/**
 * 将 NodeList 对象转换为数组。
 * 为了兼容性和性能，使用 Array.from() 方法代替扩展运算符。
 * 同时增加了类型检查以确保传入参数的有效性。
 * 
 * @param {NodeList} nodeList 需要转换的 NodeList 对象。
 * @return {Array} 转换后的数组。
 */
const convertNodeListToArray = (nodeList) => {
  // 类型检查以确保传入的是 NodeList 类型
  if (!NodeList.prototype.isPrototypeOf(nodeList)) {
    throw new TypeError('传入的参数不是一个有效的 NodeList 对象');
  }
  
  // 使用 Array.from() 来转换 NodeList 以提高兼容性和性能
  return Array.from(nodeList);
};

// 示例使用
try {
  const result = convertNodeListToArray(document.childNodes);
  console.log(result); // [ <!DOCTYPE html>, html ]
} catch (error) {
  console.error(error.message);
}



/**
 * 观察指定元素的变动。
 * @param {Element} element - 需要被观察变动的元素。
 * @param {Function} callback - 当观察到变动时执行的回调函数，接收一个mutation对象作为参数。
 * @param {Object} options - 可选参数，用于配置观察行为。
 * @returns {MutationObserver} 返回创建的MutationObserver实例，以便于外部调用disconnect方法停止观察。
 */
const observeMutations = (element, callback, options) => {
  // 使用try-catch包裹MutationObserver的回调，以处理可能的异常
  const safeCallback = (mutation) => {
    try {
      callback(mutation);
    } catch (error) {
      console.error("Error handling mutation:", error);
    }
  };

  // 创建MutationObserver实例
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(safeCallback);
  });

  // 使用Object.assign来合并默认选项和用户提供的选项
  observer.observe(
    element,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true,
      },
      options
    )
  );

  // 返回observer实例，以便于外部调用disconnect
  return observer;
};

// 示例使用，这里使用一个匿名函数代替console.log以提高示例的通用性
// 在实际应用中，可以根据需要传入不同的回调函数
const obs = observeMutations(document, (mutation) => {
  console.log("Mutation observed:", mutation);
});

// 当需要停止观察时，调用disconnect
obs.disconnect();



/**
 * 从指定元素上移除指定事件的监听器。
 * @param {HTMLElement} el - 需要移除事件监听器的DOM元素。
 * @param {string} evt - 需要移除的事件名称。
 * @param {Function} fn - 事件监听器函数。
 * @param {boolean} [opts=false] - 事件监听选项，true 表示在捕获阶段监听，false 表示在冒泡阶段监听。
 */
const removeEventListenerWrapper = (el, evt, fn, opts = false) => {
  if (!(el instanceof HTMLElement)) {
    console.warn('removeEventListenerWrapper: 第一个参数必须是一个HTMLElement。');
    return;
  }
  if (typeof fn !== 'function') {
    console.warn('removeEventListenerWrapper: 第三个参数必须是一个函数。');
    return;
  }
  el.removeEventListener(evt, fn, opts);
};

const logExclamationMark = () => console.log('!');

document.body.addEventListener('click', logExclamationMark);
removeEventListenerWrapper(document.body, 'click', logExclamationMark); // 不再在页面点击时输出 '!' 



/**
 * 为元素绑定事件监听器。
 * @param {HTMLElement} el - 需要绑定事件的元素。
 * @param {string} evt - 事件类型。
 * @param {Function} fn - 事件触发时执行的函数。
 * @param {Object} [opts={}] - 额外选项，可包含target和options。
 * @returns {Function|null} 如果使用了事件委托，返回委托函数；否则返回null。
 */
const on = (el, evt, fn, opts = {}) => {
  // 参数有效性检查
  if (!(el instanceof HTMLElement)) {
    console.error('Invalid element provided');
    return;
  }
  if (typeof evt !== 'string' || !evt.trim()) {
    console.error('Invalid event type provided');
    return;
  }
  if (typeof fn !== 'function') {
    console.error('Invalid function provided');
    return;
  }

  // 创建一个委托函数，用于选择性地执行事件处理函数
  const delegatorFn = e => {
    if (!e.target.matches(opts.target)) return;
    return fn.call(e.target, e);
  };

  try {
    // 根据是否提供额外选项来绑定事件监听器
    el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);
  } catch (error) {
    console.error('Error occurred while adding event listener:', error);
    return;
  }

  // 如果使用了事件委托，返回委托函数
  if (opts.target) return delegatorFn;
};

const fn = () => console.log('!');

// 示例用法
on(document.body, 'click', fn); // 在点击body时输出'!'
on(document.body, 'click', fn, { target: 'p' }); // 在点击body内的p元素时输出'!'
on(document.body, 'click', fn, { options: true }); // 使用捕获模式而不是冒泡



/**
 * 监听用户输入设备的变化，并通过回调函数通知输入类型的变化。
 * @param {Function} callback - 当输入类型变化时调用的回调函数，接收一个参数表示当前的输入类型（'mouse' 或 'touch'）。
 */

const onUserInputChange = callback => {
  let type = 'mouse',
    lastTime = 0;
  let mouseMoveHandlerInstalled = false; // 跟踪mousemove处理器是否已安装

  // 封装添加事件监听器的逻辑，以捕获可能的错误
  const addEventListenerSafe = (event, handler) => {
    try {
      document.addEventListener(event, handler);
    } catch (error) {
      console.error(`Error while trying to add event listener for ${event}:`, error);
    }
  };

  // 封装移除事件监听器的逻辑，以捕获可能的错误
  const removeEventListenerSafe = (event, handler) => {
    try {
      document.removeEventListener(event, handler);
    } catch (error) {
      console.error(`Error while trying to remove event listener for ${event}:`, error);
    }
  };

  // 处理鼠标移动事件，以识别用户的输入类型
  const mousemoveHandler = () => {
    const now = performance.now();
    // 如果连续两次触发时间间隔小于20ms，则认为是鼠标输入
    if (now - lastTime < 20) {
      (type = 'mouse'), callback(type);
      // 防止重复监听，移除mousemove事件监听器
      if (mouseMoveHandlerInstalled) {
        removeEventListenerSafe('mousemove', mousemoveHandler);
        mouseMoveHandlerInstalled = false;
      }
    }
    lastTime = now;
  };

  // 处理触摸开始事件，以识别用户的输入类型
  const touchstartHandler = () => {
    // 如果已经识别为触摸输入，则不再处理
    if (type === 'touch') return;
    (type = 'touch'), callback(type);
    // 当触摸开始时，监听mousemove事件以准备切换回鼠标输入
    if (!mouseMoveHandlerInstalled) {
      addEventListenerSafe('mousemove', mousemoveHandler);
      mouseMoveHandlerInstalled = true;
    }
    // 添加对触摸结束事件的处理来移除mousemove监听器
    addEventListenerSafe('touchend', touchendHandler);
  };

  // 处理触摸结束事件，移除相应的事件监听器
  const touchendHandler = () => {
    // 在触摸结束时移除mousemove监听器
    removeEventListenerSafe('mousemove', mousemoveHandler);
    mouseMoveHandlerInstalled = false;
    // 移除触摸结束事件的监听器
    removeEventListenerSafe('touchend', touchendHandler);
  };

  // 安全地添加事件监听器
  addEventListenerSafe('touchstart', touchstartHandler);
  addEventListenerSafe('mousemove', mousemoveHandler);
};

// 示例使用：输出用户当前的输入方法
onUserInputChange(type => {
  console.log('The user is now using', type, 'as an input method.');
});



/**
 * 解析cookie字符串为键值对对象。
 * @param {string} str - 待解析的cookie字符串。
 * @returns {Object} - 包含键值对的对象。
 * @throws {URIError} - 如果URI解码失败。
 */
const parseCookie = str => {
  // 去除整个字符串的首尾空白字符，避免不必要的trim()调用
  str = str.trim();
  
  try {
    // 分割cookie字符串为键值对数组，再处理每个键值对
    return str.split(';').map(v => v.split('=')).reduce((acc, [key, value]) => {
      // 对键和值进行URI解码
      acc[decodeURIComponent(key)] = decodeURIComponent(value);
      return acc;
    }, {});
  } catch (error) {
    // 处理可能的URIError
    if (error instanceof URIError) {
      console.error('URI解码失败，请检查cookie字符串的编码。');
      throw error; // 可以选择重新抛出异常，或者处理异常保证程序继续运行
    } else {
      throw error;
    }
  }
};

// 测试
console.log(parseCookie('foo=bar; equation=E%3Dmc%5E2')); // 应该输出: { foo: 'bar', equation: 'E=mc^2' }



/**
 * 将给定的cookie名称和值序列化为一个安全的HTTP cookie字符串。
 * @param {string} name - Cookie的名称。
 * @param {string} val - Cookie的值。
 * @returns {string} - 序列化后的cookie字符串。
 * @throws {TypeError} - 如果name或val不是字符串类型，则抛出TypeError。
 */
const serializeCookie = (name, val) => {
  // 输入验证：确保name和val都是字符串类型
  if (typeof name !== 'string' || typeof val !== 'string') {
    throw new TypeError('name and val must be strings');
  }

  // 使用encodeURIComponent对名称和值进行编码
  const encodedName = encodeURIComponent(name);
  const encodedVal = encodeURIComponent(val);

  // 检查编码后的名称或值是否为空，如果是，则抛出错误
  // 这是出于安全考虑，避免设置无意义的cookie
  if (encodedName === '' || encodedVal === '') {
    throw new Error('Encoded name or value cannot be empty');
  }

  // 返回编码后的cookie字符串
  return `${encodedName}=${encodedVal}`;
};

// 示例调用
serializeCookie('foo', 'bar'); // 'foo=bar'



/**
 * 检测用户是否更喜欢暗色主题。
 * 该函数首先检查当前执行环境是否为浏览器，
 * 然后检查`matchMedia`是否可用，最后执行媒体查询并返回结果。
 * 
 * @returns {boolean|undefined} 如果检测成功则返回布尔值，表示用户是否喜欢暗色主题；
 *                               如果无法执行检测，则返回undefined。
 */
const checkPreferredColorScheme = () => {
  // 检查是否在浏览器环境中执行
  if (typeof window === 'undefined' || !('matchMedia' in window)) {
    // 如果不在浏览器环境或`matchMedia`不可用，返回undefined
    return undefined;
  }

  try {
    // 执行媒体查询并返回结果
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode;
  } catch (error) {
    // 处理可能的错误，例如媒体查询语法错误
    console.error('Error occurred while checking preferred color scheme:', error);
    return undefined;
  }
};

// 调用示例
const preferredColorScheme = checkPreferredColorScheme();
console.log(preferredColorScheme);



/**
 * 检查当前用户的颜色偏好是否为浅色主题。
 * 使用浏览器的 matchMedia API 来查询用户的颜色偏好。
 * 
 * @returns {boolean} 如果用户更喜欢浅色主题，则返回 true，否则返回 false。
 */
const prefersLightColorScheme = () => {
  // 检查 window 对象和 matchMedia 方法的存在性
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    console.warn('无法执行颜色偏好检查：环境不支持 matchMedia。');
    return false; // 默认返回值，适用于不支持的情况
  }

  try {
    // 尝试查询用户的颜色偏好
    const colorSchemeQuery = '(prefers-color-scheme: light)';
    const colorSchemeMatch = window.matchMedia(colorSchemeQuery);

    // 检查查询是否成功
    if (typeof colorSchemeMatch.matches === 'undefined') {
      console.warn('无法获取 matchMedia 查询结果。');
      return false; // 默认返回值，适用于无法获取结果的情况
    }

    // 返回查询结果
    return colorSchemeMatch.matches;
  } catch (error) {
    console.error('执行颜色偏好查询时发生错误：', error);
    return false; // 在异常情况下返回默认值
  }
};

// 示例调用
console.log(prefersLightColorScheme()); // true 或 false，取决于用户的颜色偏好



const prefix = prop => {
  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);
  const prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
  const i = prefixes.findIndex(
    prefix => typeof document.body.style[prefix ? prefix + capitalizedProp : prop] !== 'undefined'
  );
  return i !== -1 ? (i === 0 ? prop : prefixes[i] + capitalizedProp) : null;
};

prefix('appearance'); // 'appearance' on a supported browser, otherwise 'webkitAppearance', 'mozAppearance', 'msAppearance' or 'oAppearance'



// 定义一个常量存储所有已知的浏览器前缀
const KNOWN_PREFIXES = ['', 'webkit', 'moz', 'ms', 'o'];
// 创建一个缓存对象来存储已查询过的属性及其前缀
const prefixCache = {};

/**
 * 获取CSS属性的浏览器前缀
 * @param {string} prop 需要查询前缀的CSS属性名
 * @returns {string|null} 返回找到的前缀，如果没有找到则返回null
 */
const getCSSPrefix = prop => {
  // 确保传入的属性是非空字符串
  if (typeof prop !== 'string' || prop.trim() === '') {
    throw new Error('Invalid input: property must be a non-empty string.');
  }

  // 尝试从缓存中直接获取前缀
  if (prefixCache[prop]) {
    return prefixCache[prop];
  }

  // 将属性首字母大写，方便后续拼接前缀
  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);
  
  // 遍历所有已知前缀，找出适用的前缀
  const i = KNOWN_PREFIXES.findIndex(
    prefix => typeof document.body.style[prefix ? prefix + capitalizedProp : prop] !== 'undefined'
  );
  
  // 如果找到了适用的前缀，将其存入缓存并返回
  if (i !== -1) {
    const prefix = i === 0 ? prop : `${prefixes[i]}${capitalizedProp}`;
    prefixCache[prop] = prefix;
    return prefix;
  }

  // 如果没有找到适用的前缀，将null存入缓存并返回
  prefixCache[prop] = null;
  return null;
};

// 示例调用
console.log(getCSSPrefix('appearance'));



/**
 * 记录动画帧的函数，提供开始、停止控制，并可在创建时自动开始。
 * @param {function} callback 每一帧执行的回调函数。
 * @param {boolean} autoStart 是否在创建后自动开始动画帧循环，默认为true。
 * @returns {Object} 返回一个包含start和stop方法的对象，用于控制动画帧的开始和停止。
 */
const recordAnimationFrames = (callback, autoStart = true) => {
  // 验证回调函数是否为函数类型
  if (typeof callback !== 'function') {
    throw new TypeError('The callback provided is not a function');
  }

  let running = true; // 控制动画是否运行的标志
  let raf; // 保存requestAnimationFrame的ID

  // 创建一个控制器对象，提供start和stop方法
  const controller = {
    /**
     * 停止动画帧循环。
     */
    stop: () => {
      running = false;
      cancelAnimationFrame(raf);
    },
    
    /**
     * 开始或恢复动画帧循环。
     */
    start: () => {
      running = true;
      run();
    }
  };

  // 动画帧循环的实际运行逻辑
  const run = () => {
    if (!running) return; // 如果动画未运行，则避免不必要的requestAnimationFrame调用

    raf = requestAnimationFrame(() => {
      callback(); // 执行每一帧的回调
      if (running) run(); // 如果动画仍运行，则继续下一帧
    });
  };

  // 根据参数决定是否自动开始动画
  if (autoStart) controller.start();

  return controller;
};

// 示例用法不变
const cb = () => console.log('Animation frame fired');
const recorder = recordAnimationFrames(cb); // 每一帧都会打印'Animation frame fired'
recorder.stop(); // 停止打印
recorder.start(); // 重新开始
const recorder2 = recordAnimationFrames(cb, false); // 创建时不自动开始，需要显式调用start来开始记录帧



/**
 * 安全地重定向到指定的URL。
 * @param {string} url 需要重定向到的目标URL。
 * @param {boolean} permanentRedirect 是否执行永久性重定向（即使用`window.location.replace`）。
 */
const redirect = (url, permanentRedirect = true) => {
  // 输入验证：确保URL是一个字符串并且不是空字符串
  if (typeof url !== 'string' || url.trim() === '') {
    console.error('无效的URL: ', url);
    return;
  }

  // URL格式验证，使用正则表达式简单校验URL格式
  const urlPattern = new RegExp('^(https?|ftp)://[^\s/$.?#].[^\s]*$', 'i');
  if (!urlPattern.test(url)) {
    console.error('格式不正确的URL: ', url);
    return;
  }

  try {
    // 根据permanentRedirect参数选择重定向方式
    if (permanentRedirect) {
      window.location.replace(url);
    } else {
      window.location.href = url;
    }
  } catch (error) {
    // 异常处理：捕获并输出错误
    console.error('重定向发生错误: ', error);
  }
};

// 调用示例，重定向到Google
redirect('https://google.com');



/**
 * 创建并执行一个异步工作线程来运行提供的函数。
 * @param {Function} fn - 需要在异步工作线程中执行的函数。
 * @returns {Promise} 返回一个Promise，该Promise在工作线程完成时解析其结果，或在工作线程出错时被拒绝。
 */
const runAsync = fn => {
  // 创建一个新的Worker实例来执行异步任务
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
      type: 'application/javascript; charset=utf-8'
    })
  );
  
  // 返回一个新的Promise，以便调用者可以异步地获取函数执行的结果或错误
  return new Promise((res, rej) => {
    // 当工作线程发送消息（即函数执行完成）时，解析Promise
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate(); // 完成后解析结果并终止工作线程
    };
    
    // 当工作线程发生错误时，拒绝Promise
    worker.onerror = err => {
      rej(err), worker.terminate(); // 发生错误时拒绝并终止工作线程
    };
  });
};

/**
 * 一个执行时间较长的计算函数，用于演示。
 * @returns {number} 返回一个通过复杂计算得到的结果。
 */
const longRunningFunction = () => {
  let result = 0;
  // 一个用于耗时的计算循环
  for (let i = 0; i < 1000; i++)
    for (let j = 0; j < 700; j++) for (let k = 0; k < 300; k++) result = result + i + j + k;

  return result;
};

/*
  注意：由于函数在不同的上下文中运行，不支持闭包。
  提供给 `runAsync` 的函数会被字符串化，所以一切都将成为字面量。
  所有变量和函数都必须在内部定义。
*/

// 示例用法，演示如何使用 runAsync 函数并处理返回的 Promise
runAsync(longRunningFunction).then(console.log); // 输出计算结果
runAsync(() => 10 ** 3).then(console.log); // 输出 1000，一个简单的示例
let outsideVariable = 50;
runAsync(() => typeof outsideVariable).then(console.log); // 输出 'undefined'，因为工作线程中没有访问外部变量的闭包



/**
 * 平滑滚动到页面顶部
*/
// 定义一个变量来控制动画是否应该继续
let isScrolling = true;

const scrollToTop = () => {
  // 使用变量来控制是否继续滚动
  if (!isScrolling) return;
  
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    // 使用setTimeout代替递归调用
    setTimeout(() => {
      window.scrollTo(0, c - c / 8);
      scrollToTop();
    }, 16); // 使用16ms的间隔，相当于每秒60帧，这是大多数动画的基础帧率
    
  } else {
    // 当滚动到顶部时，取消滚动状态
    isScrolling = false;
  }
};

// 启动滚动动画
scrollToTop();



/**
 * 平滑滚动到指定元素。
 * @param {string} element CSS选择器字符串。
 */
const smoothScroll = (element) => {
  // 参数校验：确保element是字符串且非空
  if (typeof element !== 'string' || element.trim() === '') {
    console.error('smoothScroll: 请提供一个有效的CSS选择器。');
    return;
  }

  try {
    // 获取元素并检查是否找到
    const targetElement = document.querySelector(element);
    if (!targetElement) {
      console.error(`smoothScroll: 无法找到指定的选择器"${element}"对应的元素。`);
      return;
    }

    // 检查浏览器是否支持smooth滚动
    if (typeof targetElement.scrollIntoView !== 'function' || !('behavior' in targetElement.scrollIntoView)) {
      console.warn(`smoothScroll: 浏览器不支持平滑滚动到"${element}"。`);
      // 如果不支持，可以考虑一个回退方案，比如使用动画来模拟平滑滚动效果
      return;
    }

    // 执行平滑滚动
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  } catch (error) {
    // 异常处理：捕获并记录可能的错误
    console.error(`smoothScroll: 操作发生异常 - ${error.message}`);
  }
};
// 示例调用
smoothScroll('#fooBar'); // 滚动到ID为fooBar的元素
smoothScroll('.fooBar'); // 滚动到第一个类名为fooBar的元素



/**
 * 序列化表单数据为URL编码的字符串。
 * @param {HTMLFormElement} form - 需要被序列化的表单元素。
 * @returns {string} 表单数据的URL编码字符串。
 */
const serializeForm = form => {
  // 异常处理：确保传入的是有效的表单元素
  if (!(form instanceof HTMLFormElement)) {
    throw new TypeError('提供的参数不是一个有效的表单元素');
  }

  try {
    // 使用Map来收集所有字段和值，以提高性能和可维护性
    const formData = new Map();
    Array.from(new FormData(form), field => {
      const [name, value] = field;
      // 对字段名称和值都进行URL编码
      const encodedName = encodeURIComponent(name);
      const encodedValue = encodeURIComponent(value);
      formData.set(encodedName, encodedValue);
    });

    // 一次性转换Map为字符串
    return Array.from(formData.entries())
      .map(([name, value]) => `${name}=${value}`)
      .join('&');
  } catch (error) {
    // 异常处理：处理可能的错误，例如FormData的构造函数可能抛出异常
    console.error('表单数据序列化时发生错误:', error);
    throw error; // 重新抛出错误，以便调用者能够处理
  }
};

try {
  console.log(serializeForm(document.querySelector('#form')));
} catch (error) {
  // 错误处理示例
  console.error('无法序列化表单:', error);
}



/**
 * 检测当前环境是否支持触摸事件。
 * 通过检查'ontouchstart'事件是否存在于window对象中，
 * 或者检查document对象是否是window.DocumentTouch的实例来判断。
 * @returns {boolean} 如果支持触摸事件则返回true，否则返回false。
 */
const supportsTouchEvents = () => {
  // 确保window对象存在，以及尝试执行触摸事件检测之前的基本检查。
  if (!window || !document) {
    // 如果在非浏览器环境中运行，或window/document对象不存在，安全返回false。
    return false;
  }

  try {
    // 使用'ontouchstart'特性检测，或DocumentTouch的实例检测来判断是否支持触摸事件。
    return 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;
  } catch (error) {
    // 捕获在执行触摸事件检测过程中可能发生的任何异常，确保函数安全退出。
    console.error("An error occurred while detecting touch support:", error);
    return false;
  }
};

// 调用函数验证结果（注：这里的调用只是为了示例，实际代码中可能根据需要进行调用）。
supportsTouchEvents(); // 可能返回true或false，取决于环境支持情况。



/**
 * 触发指定DOM元素上的自定义事件。
 * @param {Element} el - 目标DOM元素。
 * @param {string} eventType - 事件类型（必须是字符串）。
 * @param {Object|number|string|null} detail - 事件携带的详细信息。
 * @returns {boolean} - 事件是否成功触发。
 */
const triggerEvent = (el, eventType, detail = null) => {
  // 参数校验
  if (!el || typeof el !== 'object' || !(el instanceof Element)) {
    console.error('Invalid element provided.');
    return false;
  }
  
  if (typeof eventType !== 'string') {
    console.error('Event type must be a string.');
    return false;
  }

  try {
    // 创建CustomEvent时，允许对detail参数的类型有更宽松的控制，支持null、对象、数字和字符串
    const event = new CustomEvent(eventType, { detail });
    return el.dispatchEvent(event);
  } catch (error) {
    console.error('Failed to trigger event:', error);
    return false;
  }
};

// 使用示例，这里不需要更改原有的功能调用方式
triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });



/**
 * 生成一个V4版本的UUID。
 * 使用 crypto.getRandomValues 来获取安全的随机值，生成一个符合UUID V4规范的唯一标识符。
 * @returns {string} 生成的UUID字符串。
 */
const UUIDGeneratorBrowser = () => {
  try {
    // 创建一个用于存储随机字节的数组
    const bytes = new Uint8Array(16);
    
    // 使用crypto.getRandomValues填充数组
    crypto.getRandomValues(bytes);

    // 设置UUID的版本为4
    bytes[6] = (bytes[6] & 0x0f) | 0x40; 
    bytes[8] = (bytes[8] & 0x3f) | 0x80; 

    // 将字节转换为十六进制字符串
    let uuid = '';
    for (let i = 0; i < bytes.length; i++) {
      const hex = bytes[i].toString(16);
      uuid += hex.length === 1 ? `0${hex}` : hex;
    }

    // 格式化UUID字符串
    return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
  } catch (error) {
    console.error('无法生成UUID:', error);
    // 处理异常，根据实际情况返回一个错误值或者重新抛出异常
    throw new Error('无法生成UUID');
  }
};

console.log(UUIDGeneratorBrowser()); // 示例输出：'7982fcfe-5721-4632-bede-6000885be57d'



/**
 * 获取当前文档的语言设置。
 * @return {string} 返回文档的语言设置，如果没有找到则返回undefined。
 */
function getLang() {
  try {
      // 尝试从html标签获取lang属性，如果不存在则从document.documentElement获取
      const htmlElement = document.getElementsByTagName('html')[0];
      
      if (htmlElement) {
          return htmlElement.getAttribute('lang') || document.documentElement.lang;
      }

      // 如果无法从html元素获取lang属性，同时document.documentElement.lang也不存在，则返回undefined
      return document.documentElement.lang || undefined;
  } catch (error) {
      console.error("获取文档语言设置时发生错误:", error);
      // 根据实际情况选择合适的错误处理方式，这里简单返回undefined
      return undefined;
  }
}

// 示例
getLang();



/**
 * 优化且安全的浏览器CSS属性支持检测函数
 * 
 * @param {string} propertyName 要检测的CSS属性名称
 * @returns {boolean} 如果浏览器支持指定的CSS属性，则返回true；否则返回false。
 */
function browserSupportsCSSProperty(propertyName) {
  // 确保输入为字符串类型
  if (typeof propertyName !== 'string' || !propertyName.trim()) {
    console.warn('browserSupportsCSSProperty expected a non-empty string as input.');
    return false;
  }
  
  // 使用文档中已存在的元素进行检测，以避免不必要的DOM操作
  const elm = document.createElement('div');
  const normalizedPropertyName = propertyName.toLowerCase();

  // 检测标准属性
  if (elm.style[normalizedPropertyName] !== undefined) {
    return true;
  }

  // 检测带前缀的属性
  const propertyNameCapital = normalizedPropertyName.charAt(0).toUpperCase() + normalizedPropertyName.substr(1);
  const domPrefixes = ['Webkit', 'Moz', 'ms', 'O'];

  for (let i = 0; i < domPrefixes.length; i++) {
    if (elm.style[domPrefixes[i] + propertyNameCapital] !== undefined) {
      return true;
    }
  }

  // 如果都不支持，则返回false
  return false;
}

// 示例调用：检查浏览器是否支持animation属性
if (!browserSupportsCSSProperty('animation')) {
  // 如果不支持，执行相应的降级或替代操作
  console.log('Animation is not supported.');
}



/**
       * 创建一个异步池来限制并发处理的任务数量。
       * @param {number} poolLimit 并发池的限制数量。
       * @param {Iterable} iterable 可迭代对象，包含需要处理的任务。
       * @param {Function} iteratorFn 一个函数，用于执行给定的任务，并返回一个Promise。
       * @returns {Promise<Array>} 当所有任务完成时，返回一个包含任务结果的数组。
       */
async function asyncPool(poolLimit, iterable, iteratorFn) {
  const ret = []; // 用于存储所有任务的Promise
  const executing = new Set(); // 用于跟踪当前正在执行的任务

  // 封装单个任务的处理逻辑
  async function handleTask(item) {
    try {
      // 控制并发，如果当前执行的任务数达到限制，则等待
      while (executing.size >= poolLimit) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
      executing.add(true); // 表示一个任务开始执行
      const result = await iteratorFn(item, iterable); // 执行任务，并等待结果
      executing.delete(true); // 任务完成，移除执行标记
      return result;
    } catch (error) {
      executing.delete(true); // 发生错误时，也要移除执行标记
      throw error; // 重新抛出错误，以便在调用链中处理
    }
  }

  // 遍历可迭代对象，为每个任务构造一个Promise
  for (const item of iterable) {
    ret.push(handleTask(item).then(result => [item, result]));
  }

  // 等待所有任务的Promise解决
  return Promise.all(ret).then(values => {
    // 提取结果，只返回任务的解决值，不包括原始项
    return values.map(v => v[1]);
  });
}

// 使用方法示例
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => {
  console.log(results); // 打印各个任务的结果
}).catch(error => {
  console.error("An error occurred:", error); // 打印任何发生的错误
});



// 定义一个函数，用于禁止用户手势缩放
function disablePinchZoom() {
  // 添加 touchstart 事件监听器，阻止同时按下两个手指的事件
  document.addEventListener('touchstart', function(event) {
    // 如果检测到超过一个手指触摸屏幕，阻止默认的触摸行为
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });

  // 添加 touchend 事件监听器，防止快速连续触摸
  var lastTouchEnd = 0;

  document.addEventListener('touchend', function(event) {
    // 获取当前时间戳
    var now = new Date().getTime();

    // 检查两次触摸之间的时间差是否小于300ms，如果是，则阻止事件
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }

    // 更新最后的触摸结束时间
    lastTouchEnd = now;
  });
}

// 当页面加载完成时，调用 disablePinchZoom 函数
window.addEventListener('load', disablePinchZoom);