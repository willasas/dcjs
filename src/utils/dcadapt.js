class VwAdapt {
  constructor(designDimensions, unit = 'rem', isOneScreen = false) {
    this.designDimensions = designDimensions;
    this.userDesignWidth = 2560;
    this.userDesignHeight = 1440;
    this.elementWidth = 2560;
    this.elementHeight = 1440;
    this.unit = unit;
    this.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.isOneScreen = isOneScreen;

    this.init();
  }

  init() {
    this.setDesignDimensions(window.innerWidth, window.innerHeight);
    this.setElementDimensions(this.elementWidth, this.elementHeight);
    window.addEventListener('resize', this.debounce(() => {
      this.setDesignDimensions(window.innerWidth, window.innerHeight);
      this.adjustAll();
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

    document.documentElement.style.setProperty('--pixel-width', this.px2vw(this.elementWidth, closestDesign.width));
    document.documentElement.style.setProperty('--pixel-height', this.px2vh(this.elementHeight, closestDesign.height));

    this.adjustBase(closestDesign);
  }

  adjustBase(closestDesign) {
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    let fontSize;

    if (clientWidth / clientHeight < closestDesign.width / closestDesign.height) {
      fontSize = (clientWidth / closestDesign.width) * closestDesign.rootFontSize;
    } else {
      fontSize = (clientHeight / closestDesign.height) * closestDesign.rootFontSize;
    }

    if (this.unit === 'rem') {
      document.documentElement.style.fontSize = `${fontSize}px`;
    } else {
      document.documentElement.style.fontSize = '100%'; // 不进行缩放
    }
  }

  adjustMobileSpecific() {
    const html = document.documentElement;

    if (this.unit === 'rem') {
      if (this.isOneScreen) {
        // 移动端一屏
        html.style.fontSize = `${html.clientHeight / this.userDesignHeight * 100}px`;
      } else {
        // 移动端长页面
        html.style.fontSize = `${html.clientWidth / this.userDesignWidth * 100}px`;
      }
    }

    html.style.setProperty('--window-width', `${html.clientWidth}px`);
    html.style.setProperty('--window-height', `${html.clientHeight}px`);
  }

  adjustPcSpecific() {
    const html = document.documentElement;

    if (this.unit === 'rem') {
      if (this.isOneScreen) {
        // PC端一屏
        html.style.fontSize = `${html.clientHeight / this.userDesignHeight * 100}px`;
      } else {
        // PC端长页面
        html.style.fontSize = `${html.clientWidth / this.userDesignWidth * 100}px`;
      }
    }

    html.style.setProperty('--window-width', `${html.clientWidth}px`);
    html.style.setProperty('--window-height', `${html.clientHeight}px`);
  }

  adjustAll() {
    this.adjustBase(this.findClosestDesign(this.userDesignWidth, this.userDesignHeight));

    if (this.isMobileDevice) {
      this.adjustMobileSpecific();
    } else {
      this.adjustPcSpecific();
    }
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

  throttle(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  addEventListenerSafe(element, event, handler, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, useCapture);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, handler);
    }
  }

  setUnit(unit) {
    this.unit = unit;
    this.adjustAll();
  }

  setDesignDimensions(width, height) {
    this.userDesignWidth = width;
    this.userDesignHeight = height;
    this.adjustAll();
  }

  setElementDimensions(width, height) {
    this.elementWidth = width;
    this.elementHeight = height;
    this.adjustAll();
  }

  setIsOneScreen(isOneScreen) {
    this.isOneScreen = isOneScreen;
    this.adjustAll();
  }
}

// 创建 VwAdapt 实例
const vwAdapt = new VwAdapt([
  { width: 3840, height: 2560, rootFontSize: 100 },
  { width: 3440, height: 1440, rootFontSize: 100 },
  { width: 2560, height: 1440, rootFontSize: 100 },
  { width: 1920, height: 1080, rootFontSize: 100 },
  { width: 1624, height: 750, rootFontSize: 100 },
  { width: 750, height: 1624, rootFontSize: 100 }
], 'rem', true); // 设置为一屏布局

// 设置新的设计稿尺寸
vwAdapt.setDesignDimensions(1920, 1080);
// 设置新的元素尺寸
vwAdapt.setElementDimensions(1920, 1080);

// 初始化时调用 setUnit 函数
vwAdapt.setUnit('rem');

// 如果需要切换到长页面布局
// vwAdapt.setIsOneScreen(false);