
// 基于vw的一屏适配
// 1. 在scss中使用下面函数将px转为vw或vh
// $design-width: 2560;
// $design-height: 1440;
// @function vw($pixels) {
//   @return $pixels / $design-width * 100vw;
// }
// @function vh($pixels) {
//   @return $pixels / $design-height * 100vh;
// }
// 2.使用： .ele{margin: vh(20) auto 0;width:vw(200);height:vw(120);}
// 3.注意$design-width和$design-height的值与js中传入的值保持一致
// 4.引入下面js并调用
class VwAdapt {
  constructor(designDimensions) {
    this.designDimensions = designDimensions;
    this.userDesignWidth = 2560;
    this.userDesignHeight = 1440;
    this.elementWidth = 2560;
    this.elementHeight = 1440;

    this.init();
  }

  init() {
    this.setDesignDimensions(window.innerWidth, window.innerHeight);
    this.setElementDimensions(this.elementWidth, this.elementHeight);
    window.addEventListener('resize', this.debounce(() => {
      this.setDesignDimensions(window.innerWidth, window.innerHeight);
    }, 200));
  }

  setDesignDimensions(width, height) {
    this.userDesignWidth = width;
    this.userDesignHeight = height;
    this.updateCssVariables();
  }

  setElementDimensions(width, height) {
    this.elementWidth = width;
    this.elementHeight = height;
    this.updateCssVariables();
  }

  findClosestDesign(width, height) {
    return this.designDimensions.reduce((closest, current) => {
      const currentAspectRatio = current.width / current.height;
      const closestAspectRatio = closest.width / closest.height;
      const currentDiff = Math.abs(width / height - currentAspectRatio);
      const closestDiff = Math.abs(width / height - closestAspectRatio);

      return currentDiff < closestDiff ? current : closest;
    }, this.designDimensions[0]);
  }

  px2vw(pixels, designWidth) {
    if (typeof pixels !== 'number' || pixels <= 0) {
      throw new Error('pixels must be a positive number.');
    }
    return (pixels / designWidth) * 100 + 'vw';
  }

  px2vh(pixels, designHeight) {
    if (typeof pixels !== 'number' || pixels <= 0) {
      throw new Error('pixels must be a positive number.');
    }
    return (pixels / designHeight) * 100 + 'vh';
  }

  updateCssVariables() {
    const closestDesign = this.findClosestDesign(this.userDesignWidth, this.userDesignHeight);

    // 计算并设置 CSS 变量
    document.documentElement.style.setProperty('--pixel-width', this.px2vw(this.elementWidth, closestDesign.width));
    document.documentElement.style.setProperty('--pixel-height', this.px2vh(this.elementHeight, closestDesign.height));
  }

  debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
}

// 创建 VwAdapt 实例
const vwAdapt = new VwAdapt([
  { width: 3840, height: 2560 },
  { width: 2560, height: 1440 },
  { width: 1920, height: 1080 },
  { width: 750, height: 1624 }
]);
// 设置新的设计稿尺寸
vwAdapt.setDesignDimensions(1920, 1080);
// 设置新的元素尺寸
vwAdapt.setElementDimensions(1920, 1080);



// 一屏适配（基于根字体的rem适配）
function remAdapt() {
  // 定义多种设计稿尺寸
  const designDimensions = [
    { width: 3840, height: 2560, rootFontSize: 100 },
    { width: 2560, height: 1440, rootFontSize: 100 },
    { width: 1920, height: 1080, rootFontSize: 100 },
    { width: 750, height: 1624, rootFontSize: 100 }
  ];

  // 获取当前屏幕尺寸
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  // 找到最接近的设计稿尺寸
  let closestDesign = designDimensions.reduce((closest, current) => {
    const currentAspectRatio = current.width / current.height;
    const closestAspectRatio = closest.width / closest.height;
    const currentDiff = Math.abs(clientWidth / clientHeight - currentAspectRatio);
    const closestDiff = Math.abs(clientWidth / clientHeight - closestAspectRatio);

    return currentDiff < closestDiff ? current : closest;
  }, designDimensions[0]);

  // 计算字体大小
  let fontSize;
  if (clientWidth / clientHeight < closestDesign.width / closestDesign.height) {
    fontSize = (clientWidth / closestDesign.width) * closestDesign.rootFontSize;
  } else {
    fontSize = (clientHeight / closestDesign.height) * closestDesign.rootFontSize;
  }

  // 设置字体大小
  document.documentElement.style.fontSize = `${fontSize}px`;
}

// 使用rem适配，初始化
remAdapt();
// 页面加载时调整
document.addEventListener('DOMContentLoaded', remAdapt);
// 窗口大小改变时重新调整
window.addEventListener('resize', remAdapt);
// 页面完全加载时再调整一次
window.addEventListener('load', remAdapt);



// 基于rem或px的长页面双端适配 
// unit：设置单位为px或rem
(function(win, doc, unit) {
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

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

  function addEventListenerSafe(element, event, handler, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, useCapture);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, handler);
    }
  }

  let designWidth = 1920; // 默认 PC 端宽度
  let designHeight = 1080; // 默认 PC 端高度
  let useRem = true; // 默认使用rem单位

  if (isMobileDevice) {
    designWidth = 750; // 默认移动端宽度
    designHeight = 1624; // 默认移动端高度
  }

  function setDesignDimensions(width, height) {
    designWidth = width;
    designHeight = height;
  }

  function setUnit(unit) {
    useRem = unit === 'rem';
  }

  function adjustBase() {
    const viewportWidth = win.innerWidth;
    const scale = viewportWidth / designWidth;

    if (useRem) {
      doc.documentElement.style.fontSize = `${scale * 100}px`;
    } else {
      doc.documentElement.style.fontSize = '100%'; // 不进行缩放
    }
  }

  function adjustZoom() {
    adjustBase();
  }

  function adjustMobileSpecific() {
    const html = doc.documentElement;

    if (useRem) {
      html.style.fontSize = `${html.clientWidth / designWidth * 100}px`;
    }
    html.style.setProperty('--window-width', `${html.clientWidth}px`);
    html.style.setProperty('--window-height', `${html.clientHeight}px`);
  }

  function adjustAll() {
    adjustBase();

    if (isMobileDevice) {
      adjustMobileSpecific();
    }
  }

  const debounceAdjustAll = debounce(adjustAll, 100);

  doc.addEventListener('DOMContentLoaded', adjustAll);
  win.addEventListener('resize', debounceAdjustAll);
  win.addEventListener('load', adjustAll);

  setDesignDimensions(2560, 1440); // PC 端
  // setDesignDimensions(750, 1624); // 移动端

  // 初始化时调用 setUnit 函数
  setUnit(unit);

  addEventListenerSafe(win, 'resize', debounceAdjustAll, false);
  addEventListenerSafe(doc, 'DOMContentLoaded', adjustAll, false);
  addEventListenerSafe(win, 'load', adjustAll, false);
})(window, document, 'rem');



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
 * 函数防抖，减少函数调用频率(此函数在别的工具中存在，使用时只保留一个即可)
 * @param {Function} func 要执行的函数
 * @param {number} wait 等待时间
 * @return {Function} 返回节流后的函数
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
 * 判断当前设备是否可能是平板
 * @returns {boolean} 如果设备的屏幕宽高比接近常见平板的宽高比，则返回true，否则返回false
 */
function isProbablyTablet() {
  const userAgent = navigator.userAgent;
  const isTabletUserAgent = /iPad|GT-P|SM-T|Galaxy Tab|HUAWEI|MediaPad|MatePad|Lenovo|Yoga Tab|Kindle|KFOT|Surface|Mi Pad|Mi Note Pad|Nexus|LG-V|LG-F|vivoPad|G Pad/i.test(userAgent);

  // 缓存屏幕宽高
  if (!window.screenCachedWidth || !window.screenCachedHeight) {
    window.screenCachedWidth = window.screen.width;
    window.screenCachedHeight = window.screen.height;
  }
  // 获取当前屏幕宽高
  const screenWidth = window.screenCachedWidth;
  const screenHeight = window.screenCachedHeight;
  // 计算屏幕的宽高比
  const screenAspectRatio = Math.max(screenWidth, screenHeight) / Math.min(screenWidth, screenHeight);
  // 平板常见的宽高比范围 4:3 和 16:9
  const tabletAspectRatioRange = [1.33, 1.78]; 
  // 检查屏幕宽高比是否在平板的范围内
  return (screenAspectRatio >= tabletAspectRatioRange[0] && screenAspectRatio <= tabletAspectRatioRange[1]) || isTabletUserAgent;
}

// 更新wrap元素的类名，根据是否为平板设备
function updateWrapClass() {
  const wrapElement = document.querySelector('.wrap');
  if (isProbablyTablet()) {
      // 平板
    wrapElement.classList.add('isPad');
  } else {
    // 非平板
    wrapElement.classList.remove('isPad');
  }
}

// 初始化时设置wrap元素的类名
updateWrapClass();

// 监听窗口大小变化，使用防抖函数以减少频繁调用
window.addEventListener('resize', debounce(updateWrapClass, 100));



/**
 * 外链平台活动链接
 * 定义一个对象，用于存储不同平台的链接列表，包括电脑端和移动端
 * 平台包含：虎牙平台、WeGame、新浪微博、斗鱼、抖音、快手平台、B站
 */
const platformLinkList = {
  huya: {
    pc: 'https://zt.huya.com/pc/index.html?client=auto',
    m: 'https://zt.huya.com/m/index.html?client=auto',
  },
  wegame: {
    pc: 'https://act.wegame.com.cn/example/index.html',
    m: 'https://act.wegame.com.cn/example/index-m.html',
  },
  weibo: {
    pc: '',
    m: '',
  },
  douyu: {
    pc: 'https://www.douyu.com/indx.html',
    m: 'https://www.douyu.com/h5/index.html',
  },
  kuaishou: {
    pc: '',
    m: 'https://ppg.viviv.com/index-m.html',
  },
  bilibili: {
    pc: 'https://www.bilibili.com/activity-azOzm1lCWd.html',
    m: 'https://www.bilibili.com/activity-azOzm1lCWd.html',
  }
};

/**
* 双端跳转链接
* @param {string} name 平台
* @returns {Object|string} 返回一个对象或字符串表示链接是否成功打开
*/
function jumpLink(name) {
  if (!platformLinkList[name]) {
    console.error(`Platform "${name}" not found.`);
    return `Platform "${name}" not found.`;
  }
  let link = '';
  if (isMobileDevice()) {
    // mobile
    if (platformLinkList[name].m) {
      window.open(platformLinkList[name].m, '_blank');
      link = platformLinkList[name].m;
      // return { status: 'success', type: 'mobile' };
    } else {
      console.warn(`No mobile link available for platform "${name}".`);
      // return `No mobile link available for platform "${name}".`;
    }
  } else {
    // pc
    if (platformLinkList[name].pc) {
      window.open(platformLinkList[name].pc, '_blank');
      link = platformLinkList[name].pc;
      return { status: 'success', type: 'pc' };
    } else {
      console.warn(`No PC link available for platform "${name}".`);
      // return `No PC link available for platform "${name}".`;
    }
  }
  // 返回链接
  if (link) {
    window.open(link, '_blank');
  }
  return link;
}

// 使用示例
jumpLink('huya');
jumpLink('wegame');
jumpLink('weibo');
jumpLink('douyu');
jumpLink('kuaishou');
jumpLink('bilibili');
