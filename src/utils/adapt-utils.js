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
(function(win, doc) {
  // 使用 navigator.userAgent 判断是否为移动设备，此处不修改以保持功能不变
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  /**
   * 函数防抖
   * @param {Function} func 要执行的函数
   * @param {number} wait 延迟时间
   * @returns {Function} 返回一个新函数
   */
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
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
   * 安全添加事件监听器，兼容多种浏览器
   * @param {HTMLElement} element - 目标元素
   * @param {string} event - 事件类型
   * @param {Function} handler - 事件处理函数
   * @param {boolean} useCapture - 是否使用捕获
   */
  function addEventListenerSafe(element, event, handler, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, useCapture);
    } else if (element.attachEvent) { // 仅当确实需要支持旧版IE时才包含这部分
      element.attachEvent('on' + event, handler);
    }
  }

  // 设计稿的原始尺寸，将魔术数字提取成易于理解的常量名称
  const DESIGN_WIDTH_MOBILE = 1624;
  const DESIGN_HEIGHT_MOBILE = 750;
  const DESIGN_WIDTH_DESKTOP = 1920;
  const DESIGN_HEIGHT_DESKTOP = 1080;
  const designWidth = isMobileDevice ? DESIGN_WIDTH_MOBILE : DESIGN_WIDTH_DESKTOP;
  const designHeight = isMobileDevice ? DESIGN_HEIGHT_MOBILE : DESIGN_HEIGHT_DESKTOP;

  // 计算缩放比例并调整页面的公共函数
  function adjustBase() {
    const viewportWidth = win.innerWidth;
    const viewportHeight = win.innerHeight;
    
    const windowZoom = viewportWidth / viewportHeight;
    const psZoom = designWidth / designHeight;

    let scale = viewportHeight < designHeight || (viewportWidth > designWidth && windowZoom > psZoom) 
      ? viewportHeight / designHeight 
      : viewportWidth / designWidth;

    doc.documentElement.style.fontSize = `${scale * 100}px`;
  }

  // 调整页面缩放的函数（PC端），此处没有明显优化点，保持原样
  function adjustZoom() {
    adjustBase();
  }
  adjustZoom();

  // 移动端特有的调整
  function adjustMobileSpecific() {
    const html = doc.documentElement;
    const isLandscape = html.clientWidth / html.clientHeight > designWidth / designHeight;

    html.style.fontSize = `${(isLandscape ? html.clientHeight / designHeight : html.clientWidth / designWidth) * 100}px`;
    html.style.setProperty('--window-width', `${html.clientWidth}px`);
    html.style.setProperty('--window-height', `${html.clientHeight}px`);
  }

  // 合并调整逻辑
  function adjustAll() {
    adjustBase();

    if (isMobileDevice) {
      adjustMobileSpecific();
    }
  }

  // 使用防抖技术优化resize事件的性能
  const debounceAdjustAll = debounce(adjustAll, 100);

  // 页面加载时调整
  doc.addEventListener('DOMContentLoaded', adjustAll);

  // 窗口大小改变时重新调整
  win.addEventListener('resize', debounceAdjustAll);

  // 页面完全加载时再调整一次
  win.addEventListener('load', adjustAll);

  // addEventListenerSafe(win, 'resize', debounceAdjustAll, false);
  // addEventListenerSafe(doc, 'DOMContentLoaded', adjustAll, false);
  // addEventListenerSafe(win, 'load', adjustAll, false);
})(window, document);


/**
 * 页面重定向，适用于双端不是同一个文件时，DESKTOP_REDIRECT_URL和MOBILE_REDIRECT_URL变量的值改成对应的文件url即可
 * 
 * 
*/
// 封装设备检测逻辑
function isMobileDevice() {
  // 使用特性检测结合一些现代API辅助判断
  if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) {
    // 如果支持触摸并且有超过0个触点，可能是移动设备
    return true;
  }

  // 检查窗口尺寸也是一个常用的辅助判断方法，但需谨慎使用，因为桌面设备也可以调整窗口大小
  if (typeof window.matchMedia !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    // 如果屏幕宽度小于等于768px，这通常是移动设备的特征
    return true;
  }

  // 结合User Agent作为辅助，但不完全依赖它
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 通过取反移动设备检测结果来确定是否为桌面设备，增加可读性
var isDesktopDevice = !isMobileDevice();

// 定义重定向的URL作为常量，以便于维护
const DESKTOP_REDIRECT_URL = './index.html';
const MOBILE_REDIRECT_URL = './index-m.html';

// 检测设备并执行重定向(此代码放在桌面端页面中)
if (isDesktopDevice) {
  // 对于桌面设备，延迟2秒后重定向，给用户一个反应的时间
  setTimeout(function() {
    try {
      window.location.href = DESKTOP_REDIRECT_URL;
    } catch (error) {
      console.error("重定向到桌面端页面失败", error);
      // 可以添加备用的处理逻辑，比如显示错误信息或尝试再次重定向
    }
  }, 2000);
}

// 在进行重定向前检查是否已经尝试过重定向(此代码放在移动端页面中)
if (!sessionStorage.getItem('redirected')) {
  sessionStorage.setItem('redirected', 'true');

  // 检测设备并执行重定向
  if (isMobileDevice) {
    // 对于移动设备，立即重定向到移动端页面
    setTimeout(function() {
      try {
        window.location.href = MOBILE_REDIRECT_URL;
      } catch (error) {
        console.error("重定向到移动端页面失败", error);
        // 可以添加备用的处理逻辑，比如显示错误信息或尝试再次重定向
      }
    }, 2000);
  }
}


/**
 * 判断操作系统类型
 * @returns {Object} 包含设备类型信息的对象
 */
const detectOS = () => {
  const userAgent = navigator.userAgent;
  const isWindowsPhone = /(?:Windows Phone)/.test(userAgent);
  const isSymbian = /(?:SymbianOS)/.test(userAgent) || isWindowsPhone;
  const isAndroid = /(?:Android)/.test(userAgent);
  const isFireFox = /(?:Firefox)/.test(userAgent);
  const isChrome = /(?:Chrome|CriOS)/.test(userAgent);
  const isTablet = /(?:iPad|PlayBook)/.test(userAgent) || (isAndroid && !/(?:Mobile)/.test(userAgent)) || (isFireFox && /(?:Tablet)/.test(userAgent));
  const isPhone = /(?:iPhone)/.test(userAgent) && !isTablet;
  const isPc = !isPhone && !isAndroid && !isSymbian;

  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc
  };
};

// 调用detectOS函数获取操作系统信息
const osInfo = detectOS();
 if (osInfo.isAndroid || osInfo.isPhone) {
    console.log('当前设备是安卓或苹果手机');
  } else if (osInfo.isTablet) {
    console.log('当前设备是平板电脑');
  } else if (osInfo.isPc) {
    console.log('这可能是一个电脑');
  }
