/**
 * SimpleAdapt - 简单的页面适配工具
 * 支持rem和vw两种适配方案
 */
class SimpleAdapt {
  /**
   * @param {Object} options 配置选项
   * @param {string} [options.unit='rem'] 适配单位，可选 'rem' 或 'vw'
   * @param {Object} [options.designSize] 设计尺寸配置
   * @param {Array} [options.designSize.sizes] 支持的设计尺寸列表
   * @param {number} [options.rootFontSize=100] 基准字体大小
   */
  constructor(options = {}) {
    // 默认配置
    this.config = {
      unit: options.unit || 'rem',
      rootFontSize: options.rootFontSize || 100,
      designSize: {
        sizes: options.designSize?.sizes || [
          { width: 3840, height: 2160 }, // 4K
          { width: 2560, height: 1440 }, // 2K
          { width: 1920, height: 1080 }, // PC
          { width: 750, height: 1624 }   // Mobile
        ]
      }
    };

    // 设备检测
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 初始化
    this.init();
  }

  /**
   * 初始化方法
   * @private
   */
  init() {
    // 添加事件监听
    this.addEventListeners();
    // 执行首次适配
    this.adapt();
  }

  /**
   * 添加事件监听
   * @private
   */
  addEventListeners() {
    // 使用防抖处理resize事件
    const debouncedAdapt = this.debounce(this.adapt.bind(this), 250);
    
    // 监听窗口大小变化
    window.addEventListener('resize', debouncedAdapt);
    // 监听屏幕方向变化
    window.addEventListener('orientationchange', debouncedAdapt);
    // 页面加载完成后适配
    document.addEventListener('DOMContentLoaded', this.adapt.bind(this));
  }

  /**
   * 防抖函数
   * @private
   */
  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * 获取最接近的设计尺寸
   * @private
   */
  getClosestDesignSize() {
    const { clientWidth, clientHeight } = document.documentElement;
    const currentRatio = clientWidth / clientHeight;

    return this.config.designSize.sizes.reduce((closest, current) => {
      const currentAspectRatio = current.width / current.height;
      const closestAspectRatio = closest.width / closest.height;
      const currentDiff = Math.abs(currentRatio - currentAspectRatio);
      const closestDiff = Math.abs(currentRatio - closestAspectRatio);

      return currentDiff < closestDiff ? current : closest;
    });
  }

  /**
   * 获取缩放比例
   * @private
   */
  getScale(designSize) {
    const { clientWidth, clientHeight } = document.documentElement;
    const widthScale = clientWidth / designSize.width;
    const heightScale = clientHeight / designSize.height;

    // 选择较小的缩放比例以确保内容完全显示
    return Math.min(widthScale, heightScale);
  }

  /**
   * 设置CSS变量
   * @private
   */
  setCSSVariables(scale, designSize) {
    const html = document.documentElement;
    const { clientWidth, clientHeight } = html;

    // 设置基础变量
    html.style.setProperty('--scale', scale);
    html.style.setProperty('--design-width', designSize.width + 'px');
    html.style.setProperty('--design-height', designSize.height + 'px');
    html.style.setProperty('--window-width', clientWidth + 'px');
    html.style.setProperty('--window-height', clientHeight + 'px');

    // 设置vw/vh相关变量
    html.style.setProperty('--vw', (100 / designSize.width) + 'vw');
    html.style.setProperty('--vh', (100 / designSize.height) + 'vh');

    // 设置rem相关变量
    const remBase = this.config.rootFontSize * scale;
    html.style.setProperty('--rem-base', remBase + 'px');
    if (this.config.unit === 'rem') {
      html.style.fontSize = remBase + 'px';
    }
  }

  /**
   * 适配处理
   * @public
   */
  adapt() {
    // 获取设计尺寸
    const designSize = this.getClosestDesignSize();
    // 计算缩放比例
    const scale = this.getScale(designSize);
    // 设置CSS变量
    this.setCSSVariables(scale, designSize);
  }

  /**
   * 切换适配单位
   * @public
   * @param {string} unit - 'rem' 或 'vw'
   */
  setUnit(unit) {
    if (['rem', 'vw'].includes(unit)) {
      this.config.unit = unit;
      this.adapt();
    }
  }

  /**
   * 设置设计尺寸
   * @public
   * @param {Array} sizes - 设计尺寸列表
   */
  setDesignSizes(sizes) {
    if (Array.isArray(sizes) && sizes.length > 0) {
      this.config.designSize.sizes = sizes;
      this.adapt();
    }
  }

  /**
   * 销毁实例
   * @public
   */
  destroy() {
    // 移除事件监听
    window.removeEventListener('resize', this.debounce(this.adapt.bind(this), 250));
    window.removeEventListener('orientationchange', this.debounce(this.adapt.bind(this), 250));
    
    // 重置样式
    const html = document.documentElement;
    html.style.fontSize = '';
    
    // 清除CSS变量
    ['--scale', '--design-width', '--design-height', '--window-width', 
     '--window-height', '--vw', '--vh', '--rem-base'].forEach(variable => {
      html.style.removeProperty(variable);
    });
  }

  /**
   * px转rem
   * @public
   */
  px2rem(px) {
    return px / this.config.rootFontSize + 'rem';
  }

  /**
   * px转vw
   * @public
   */
  px2vw(px) {
    const designSize = this.getClosestDesignSize();
    return (px / designSize.width) * 100 + 'vw';
  }

  /**
   * px转vh
   * @public
   */
  px2vh(px) {
    const designSize = this.getClosestDesignSize();
    return (px / designSize.height) * 100 + 'vh';
  }
}

// 使用示例
const simpleAdapt = new SimpleAdapt({
  unit: 'rem', // 适配单位：'rem'或'vw'
  rootFontSize: 100, // 基准字体大小
  designSize: { // 设计尺寸配置
    sizes: [
      { width: 1920, height: 1080 }, // PC端设计尺寸
      { width: 750, height: 1624 }   // 移动端设计尺寸
    ]
  }
});

// 导出工具类
window.SimpleAdapt = SimpleAdapt;