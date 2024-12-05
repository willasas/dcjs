/**
 * DcAdapt 页面适配工具类
 * 支持PC端和移动端的页面自适配，包括一屏适配和长页面适配
 * 提供rem、px、vw三种适配单位的支持
 */
class DcAdapt {
  /**
   * 构造函数，初始化适配器配置和状态
   * @param {Object} options - 配置选项
   * @param {string} [options.unit='px'] - 适配单位，可选值：'px'|'rem'|'vw'
   * @param {string} [options.mode='fullscreen'] - 适配模式，可选值：'fullscreen'|'longpage'
   * @param {Object} [options.designSize] - 设计尺寸配置
   * @param {Object} [options.designSize.pc] - PC端设计尺寸
   * @param {number} [options.designSize.pc.width=1920] - PC端设计宽度
   * @param {number} [options.designSize.pc.height=1080] - PC端设计高度
   * @param {Array<{width:number,height:number}>} [options.designSize.pc.fullscreenSizes] - PC端支持的屏幕尺寸列表
   * @param {Object} [options.designSize.mobile] - 移动端设计尺寸
   * @param {number} [options.designSize.mobile.width=750] - 移动端设计宽度
   * @param {number} [options.designSize.mobile.height=1624] - 移动端设计高度
   * @param {Array<{width:number,height:number}>} [options.designSize.mobile.fullscreenSizes] - 移动端支持的屏幕尺寸列表
   */
  constructor(options = {}) {
    // 默认配置
    this.config = {
      unit: 'px', // 默认使用px单位，可选值：px, rem, vw
      mode: 'fullscreen', // 默认一屏适配，可选值：fullscreen, longpage
      device: this.detectDevice(), // 自动检测设备类型
      designSize: {
        pc: {
          width: 1920,
          height: 1080,
          fullscreenSizes: [
            { width: 3840, height: 2160 },
            { width: 2560, height: 1440 },
            { width: 1920, height: 1080 },
          ],
        },
        mobile: {
          width: 750,
          height: 1624,
          fullscreenSizes: [
            { width: 750, height: 1624 }, // 竖屏
            { width: 1624, height: 750 }, // 横屏
          ],
        },
      },
      ...options,
    }

    // 初始状态
    this.state = {
      currentUnit: this.config.unit,
      currentMode: this.config.mode,
      browserNavHeight: this.getBrowserNavHeight(),
      isInitialized: false,
      orientation: this.getScreenOrientation(),
    }

    // 初始化
    this.init()
  }

  /**
   * 获取屏幕方向
   * @returns {'portrait'|'landscape'} 返回屏幕方向：'portrait'为竖屏，'landscape'为横屏
   */
  getScreenOrientation() {
    if (window.matchMedia('(orientation: portrait)').matches) {
      return 'portrait'
    }
    return 'landscape'
  }

  /**
   * 设备类型检测
   * @returns {Object} 设备类型信息
   * @returns {boolean} returns.isMobile - 是否为移动设备
   * @returns {boolean} returns.isTablet - 是否为平板设备
   * @returns {boolean} returns.isDesktop - 是否为桌面设备
   */
  detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isTablet = this.isTablet()
    return {
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
    }
  }

  /**
   * 平板设备检测
   * @returns {boolean} 是否为平板设备
   */
  isTablet() {
    const userAgent = navigator.userAgent
    const isTabletUserAgent = /iPad|Android(?!.*Mobile)|Tablet/i.test(userAgent)

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1024px)')
      return isTabletUserAgent || mediaQuery.matches
    }

    return isTabletUserAgent
  }

  /**
   * 获取浏览器导航栏高度
   * @returns {number} 浏览器导航栏高度（像素）
   */
  getBrowserNavHeight() {
    // 使用更准确的方法计算实际可用高度
    const windowHeight = window.innerHeight;
    const screenHeight = window.screen.height;
    const pixelRatio = window.devicePixelRatio || 1;
    
    // 考虑设备像素比
    const physicalScreenHeight = screenHeight / pixelRatio;
    
    // 如果是Windows系统，考虑任务栏高度
    const isWindows = navigator.platform.indexOf('Win') > -1;
    const estimatedTaskbarHeight = isWindows ? 40 : 0;
    
    // 计算实际的导航栏高度
    const navHeight = Math.max(0, physicalScreenHeight - windowHeight - estimatedTaskbarHeight);
    
    return Math.round(navHeight);
  }

  /**
   * 获取视口高度
   * @returns {number} 视口高度（像素）
   */
  getViewportHeight() {
    const windowHeight = window.innerHeight;
    const navHeight = this.getBrowserNavHeight();
    
    // 确保返回的高度是正数且不超过窗口高度
    return Math.max(windowHeight - navHeight, 0);
  }

  /**
   * 初始化方法
   * 设置初始适配并添加事件监听
   * @private
   */
  init() {
    if (this.state.isInitialized) return

    // 设置初始适配
    this.adapt()

    // 添加事件监听
    this.addEventListeners()

    this.state.isInitialized = true
  }

  /**
   * 添加事件监听
   * 监听屏幕尺寸变化和方向变化
   * @private
   */
  addEventListeners() {
    const debouncedAdapt = this.debounce(this.adapt.bind(this), 250)

    // 添加屏幕方向变化监听
    window.matchMedia('(orientation: portrait)').addListener(() => {
      this.state.orientation = this.getScreenOrientation()
      this.adapt()
    })

    window.addEventListener('resize', debouncedAdapt)
    window.addEventListener('orientationchange', () => {
      // 等待方向变化完成后再适配
      setTimeout(() => {
        this.state.orientation = this.getScreenOrientation()
        this.adapt()
      }, 300)
    })
    document.addEventListener('DOMContentLoaded', this.adapt.bind(this))
  }

  /**
   * 适配处理主方法
   * 根据当前配置和状态执行适配
   */
  adapt() {
    const { currentUnit, currentMode } = this.state;
    const { device } = this.config;

    // 更新视口高度
    const viewportHeight = this.getViewportHeight();
    
    // 设置实际可用高度为CSS变量
    document.documentElement.style.setProperty('--client-height', `${viewportHeight}px`);
    document.documentElement.style.setProperty('--window-height', `${window.innerHeight}px`);

    if (currentMode === 'fullscreen') {
      this.handleFullscreenAdapt()
    } else {
      this.handleLongpageAdapt()
    }
  }

  /**
   * 处理一屏适配
   * 根据当前单位类型选择对应的适配方法
   * @private
   */
  handleFullscreenAdapt() {
    const { device, designSize } = this.config
    const { currentUnit } = this.state

    // 检查设备类型配置
    const deviceType = device.isMobile ? 'mobile' : 'pc'
    const designConfig = designSize?.[deviceType]

    // 设置一屏模式的基本样式
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    // 添加默认配置
    if (!designConfig) {
      console.warn(`Missing design configuration for ${deviceType}`)
      const defaultConfig = {
        width: device.isMobile ? 750 : 1920,
        height: device.isMobile ? 1624 : 1080,
      }

      const viewportWidth = window.innerWidth
      const viewportHeight = this.getViewportHeight()

      switch (currentUnit) {
        case 'rem':
          this.adaptWithRem(defaultConfig, viewportWidth, viewportHeight)
          break
        case 'vw':
          this.adaptWithVw(defaultConfig, viewportWidth, viewportHeight)
          break
        default:
          this.adaptWithPx(defaultConfig, viewportWidth, viewportHeight)
      }
      return
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = this.getViewportHeight()

    // 获取设计尺寸
    const targetDesignSize = this.getTargetDesignSize(designConfig)

    switch (currentUnit) {
      case 'rem':
        this.adaptWithRem(targetDesignSize, viewportWidth, viewportHeight)
        break
      case 'vw':
        this.adaptWithVw(targetDesignSize, viewportWidth, viewportHeight)
        break
      default:
        this.adaptWithPx(targetDesignSize, viewportWidth, viewportHeight)
    }
  }

  /**
   * 处理长页面适配
   * 根据当前单位类型选择对应的适配方法
   * @private
   */
  handleLongpageAdapt() {
    const { device, designSize } = this.config
    const { currentUnit } = this.state

    // 移除一屏模式的样式限制
    document.body.style.width = ''
    document.body.style.height = ''
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''

    const deviceType = device.isMobile ? 'mobile' : 'pc'
    const designConfig = designSize?.[deviceType]

    // 添加默认配置
    if (!designConfig) {
      console.warn('Missing design configuration')
      // 提供默认配置而不是直接返回
      const defaultConfig = {
        width: device.isMobile ? 750 : 1920,
        height: device.isMobile ? 1624 : 1080,
      }

      const viewportWidth = window.innerWidth
      const viewportHeight = this.getViewportHeight()

      switch (currentUnit) {
        case 'rem':
          this.adaptLongpageWithRem(defaultConfig, viewportWidth)
          break
        case 'vw':
          this.adaptLongpageWithVw(defaultConfig, viewportWidth)
          break
        default:
          this.adaptLongpageWithPx(defaultConfig, viewportWidth)
      }
      return
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = this.getViewportHeight()

    // 获取设计尺寸
    const targetDesignSize = this.getTargetDesignSize(designConfig)

    switch (currentUnit) {
      case 'rem':
        this.adaptLongpageWithRem(targetDesignSize, viewportWidth)
        break
      case 'vw':
        this.adaptLongpageWithVw(targetDesignSize, viewportWidth)
        break
      default:
        this.adaptLongpageWithPx(targetDesignSize, viewportWidth)
    }
  }

  /**
   * 获取目标设计尺寸
   * 根据当前视口尺寸选择最合适的设计尺寸
   * @param {Object} designConfig - 设计尺寸配置
   * @returns {Object} 目标设计尺寸对象
   */
  getTargetDesignSize(designConfig) {
    // 添加完整的空值检查
    if (!designConfig) {
      console.warn('Missing design configuration')
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    // 检查基本尺寸是否存在
    if (!designConfig.width || !designConfig.height) {
      console.warn('Invalid design dimensions')
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    // 如果没有配置 fullscreenSizes 或配置为空，使用基本配置
    if (!designConfig.fullscreenSizes || !Array.isArray(designConfig.fullscreenSizes) || designConfig.fullscreenSizes.length === 0) {
      return {
        width: designConfig.width,
        height: designConfig.height,
      }
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = this.getViewportHeight()
    const viewportRatio = viewportWidth / viewportHeight

    // 查找最佳设计尺寸
    return designConfig.fullscreenSizes.reduce((best, current) => {
      const bestRatio = best.width / best.height
      const currentRatio = current.width / current.height
      const bestDiff = Math.abs(viewportRatio - bestRatio)
      const currentDiff = Math.abs(viewportRatio - currentRatio)

      return currentDiff < bestDiff ? current : best
    }, designConfig.fullscreenSizes[0])
  }

  /**
   * 查找最佳设计尺寸
   * 根据视口比例查找最接近的设计尺寸
   * @param {Array<{width:number,height:number}>} sizes - 设计尺寸列表
   * @param {number} viewportWidth - 视口宽度
   * @param {number} viewportHeight - 视口高度
   * @returns {Object} 最佳设计尺寸对象
   */
  findBestDesignSize(sizes, viewportWidth, viewportHeight) {
    // 如果没有 sizes 数组，返回默认值
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return {
        width: viewportWidth,
        height: viewportHeight,
      }
    }

    const currentAspectRatio = viewportWidth / viewportHeight

    return sizes.reduce((best, current) => {
      const bestRatio = best.width / best.height
      const currentRatio = current.width / current.height

      const bestDiff = Math.abs(currentAspectRatio - bestRatio)
      const currentDiff = Math.abs(currentAspectRatio - currentRatio)

      return currentDiff < bestDiff ? current : best
    }, sizes[0])
  }

  /**
   * REM适配方法
   * 根据设计尺寸和视口尺寸计算根元素字体大小
   * @param {Object} designConfig - 设计尺寸配置
   * @param {number} viewportWidth - 视口宽度
   * @param {number} viewportHeight - 视口高度
   */
  adaptWithRem(designConfig, viewportWidth, viewportHeight) {
    const baseSize = 100; // 基准字号
    let scale;

    // 根据屏幕方向选择缩放方式
    if (this.config.device.isMobile) {
      const isLandscapeDesign = designConfig.width > designConfig.height
      const isLandscapeScreen = this.state.orientation === 'landscape'

      if (isLandscapeDesign === isLandscapeScreen) {
        // 设计稿方向与屏幕方向一致时
        scale = Math.min(viewportWidth / designConfig.width, viewportHeight / designConfig.height)
        const fontSize = baseSize * scale;
        document.documentElement.style.fontSize = `${fontSize}px`;
      } else {
        // 设计稿方向与屏幕方向不一致时，需要旋转适配
        scale = Math.min(viewportWidth / designConfig.height, viewportHeight / designConfig.width)
        const fontSize = baseSize * scale;
        document.documentElement.style.fontSize = `${fontSize}px`;
      }

      document.documentElement.style.setProperty('--rem-scale', scale.toFixed(6));
      document.documentElement.style.setProperty('--client-width', `${viewportWidth}px`);
      document.documentElement.style.setProperty('--client-height', `${viewportHeight}px`);
    } else {
      // PC端适配优化
      const targetDesignSize = this.getTargetDesignSize(designConfig);
      
      // 使用配置中的基准尺寸
      const baseWidth = designConfig.width;  // 1920
      const baseHeight = designConfig.height; // 1080
      
      // 计算当前目标设计尺寸相对于基准尺寸的放大倍数
      const designScale = targetDesignSize.width / baseWidth;
      
      // 计算视口相对于当前目标设计尺寸的缩放比例
      const scaleW = viewportWidth / targetDesignSize.width;
      const scaleH = viewportHeight / targetDesignSize.height;
      const viewportScale = Math.min(scaleW, scaleH);
      
      // 最终缩放比例 = 视口缩放比例 * 设计尺寸放大倍数
      scale = viewportScale * designScale;

      // 计算并设置根元素字号
      const fontSize = baseSize * scale;
      document.documentElement.style.fontSize = `${fontSize}px`;
      
      // 设置其他CSS变量
      document.documentElement.style.setProperty('--rem-scale', scale.toFixed(6));
      document.documentElement.style.setProperty('--client-width', `${viewportWidth}px`);
      document.documentElement.style.setProperty('--client-height', `${viewportHeight}px`);

      console.log('REM Debug:', {
        baseSize,
        designScale,
        viewportScale,
        finalScale: scale,
        fontSize,
        viewport: { width: viewportWidth, height: viewportHeight }
      });
    }
  }

  /**
   * VW适配方法
   * 设置vw相关的CSS变量
   * @param {Object} designConfig - 设计尺寸配置
   * @param {number} viewportWidth - 视口宽度
   * @param {number} viewportHeight - 视口高度
   */
  adaptWithVw(designConfig, viewportWidth, viewportHeight) {
    if (this.config.device.isMobile) {
      const isLandscapeDesign = designConfig.width > designConfig.height
      const isLandscapeScreen = this.state.orientation === 'landscape'

      if (isLandscapeDesign === isLandscapeScreen) {
        // 设计稿方向与屏幕方向一致
        const scale = Math.min(viewportWidth / designConfig.width, viewportHeight / designConfig.height)

        // 设置缩放比例
        document.documentElement.style.setProperty('--vw-scale', `${(scale * 100).toFixed(6)}%`)

        // 设置基准单位
        document.documentElement.style.setProperty('--vw-base', `${(100 / designConfig.width).toFixed(6)}vw`)
        document.documentElement.style.setProperty('--vh-base', `${(100 / designConfig.height).toFixed(6)}vh`)
      } else {
        // 设计稿方向与屏幕方向不一致
        const scale = Math.min(viewportWidth / designConfig.height, viewportHeight / designConfig.width)

        // 设置旋转后的缩放比例
        document.documentElement.style.setProperty('--vw-scale', `${(scale * 100).toFixed(6)}%`)

        // 设置旋转后的基准单位
        document.documentElement.style.setProperty('--vw-base', `${(100 / designConfig.height).toFixed(6)}vw`)
        document.documentElement.style.setProperty('--vh-base', `${(100 / designConfig.width).toFixed(6)}vh`)
      }
    } else {
      // PC端适配优化
      const targetDesignSize = this.getTargetDesignSize(designConfig);
      
      // 使用配置中的基准尺寸
      const baseWidth = designConfig.width;  // 1920
      const baseHeight = designConfig.height; // 1080
      
      // 计算视口相对于基准尺寸的缩放比例
      const scaleW = viewportWidth / baseWidth;
      const scaleH = viewportHeight / baseHeight;
      const scale = Math.min(scaleW, scaleH);

      // 设置基准单位
      document.documentElement.style.setProperty('--vw-base', `${(100 / baseWidth).toFixed(6)}vw`);
      document.documentElement.style.setProperty('--vh-base', `${(100 / baseHeight).toFixed(6)}vh`);
      
      // 设置缩放比例
      document.documentElement.style.setProperty('--vw-scale', scale.toFixed(6));
      document.documentElement.style.setProperty('--client-width', `${viewportWidth}px`);
      document.documentElement.style.setProperty('--client-height', `${viewportHeight}px`);

      console.log('VW Scales:', {
        scale,
        viewport: { width: viewportWidth, height: viewportHeight }
      });
    }
  }

  /**
   * PX适配方法
   * 设置px相关的CSS变量
   * @param {Object} designConfig - 设计尺寸配置
   * @param {number} viewportWidth - 视口宽度
   * @param {number} viewportHeight - 视口高度
   */
  adaptWithPx(designConfig, viewportWidth, viewportHeight) {
    let scale;

    if (this.config.device.isMobile) {
      const isLandscapeDesign = designConfig.width > designConfig.height
      const isLandscapeScreen = this.state.orientation === 'landscape'

      if (isLandscapeDesign === isLandscapeScreen) {
        // 设计稿方向与屏幕方向一致
        scale = Math.min(viewportWidth / designConfig.width, viewportHeight / designConfig.height)
      } else {
        // 设计稿方向与屏幕方向不一致
        scale = Math.min(viewportWidth / designConfig.height, viewportHeight / designConfig.width)
      }
    } else {
      // PC端适配优化
      const targetDesignSize = this.getTargetDesignSize(designConfig);
      
      // 获取配置中最小的设计尺寸作为基准
      const fullscreenSizes = designConfig?.fullscreenSizes || [];
      const baseDesignSize = fullscreenSizes.length > 0 
        ? fullscreenSizes.reduce((min, current) => {
            return current.width < min.width ? current : min;
          }, fullscreenSizes[0])
        : { width: 1920, height: 1080 }; // 默认基准尺寸
      
      // 使用配置中的基准尺寸
      const baseWidth = baseDesignSize.width;
      const baseHeight = baseDesignSize.height;
      
      // 计算当前目标设计尺寸相对于基准设计尺寸的放大倍数
      const designScale = targetDesignSize.width / baseDesignSize.width; 
      
      // 计算视口相对于当前目标设计尺寸的缩放比例
      const scaleW = viewportWidth / targetDesignSize.width;
      const scaleH = viewportHeight / targetDesignSize.height;
      const viewportScale = Math.min(scaleW, scaleH);
      
      // 最终缩放比例 = 视口缩放比例 * 设计尺寸放大倍数
      scale = viewportScale * designScale;

      // 设置CSS变量
      document.documentElement.style.setProperty('--calendar-scale', scale.toFixed(6));
      document.documentElement.style.setProperty('--organize-scale', scale.toFixed(6));
      document.documentElement.style.setProperty('--client-width', `${viewportWidth}px`);
      document.documentElement.style.setProperty('--client-height', `${viewportHeight}px`);
      document.documentElement.style.setProperty('--scale-width', scaleW.toFixed(6));
      document.documentElement.style.setProperty('--scale-height', scaleH.toFixed(6));
      document.documentElement.style.setProperty('--aspect-ratio', scale.toFixed(6));
      document.documentElement.style.setProperty('--px-scale', scale.toFixed(6));

      console.log('Scales:', {
        baseSize: { width: baseWidth, height: baseHeight },
        targetSize: targetDesignSize,
        viewportSize: { width: viewportWidth, height: viewportHeight },
        scale: { width: scaleW, height: scaleH, final: scale }
      });
    }
  }

  /**
   * 长页面REM适配
   * @param {Object} designConfig - 设计尺寸配置
   * @param {number} viewportWidth - 视口宽度
   */
  adaptLongpageWithRem(designConfig, viewportWidth) {
    const baseSize = 100
    const fontSize = (viewportWidth / designConfig.width) * baseSize
    document.documentElement.style.fontSize = `${fontSize}px`
  }

  /**
   * 长页面VW适配
   * @param {Object} designConfig - 设计尺寸配置
   * @param {number} viewportWidth - 视口宽度
   */
  adaptLongpageWithVw(designConfig, viewportWidth) {
    // 设置基准单位
    document.documentElement.style.setProperty('--vw-base', `${(100 / designConfig.width).toFixed(6)}vw`)

    // 设置缩放比例
    const scale = viewportWidth / designConfig.width
    document.documentElement.style.setProperty('--vw-scale', `${(scale * 100).toFixed(6)}%`)
  }

  /**
   * 长页面PX适配
   * @param {Object} designConfig - 设计尺寸配置
   * @param {number} viewportWidth - 视口宽度
   */
  adaptLongpageWithPx(designConfig, viewportWidth) {
    const scale = viewportWidth / designConfig.width
    document.documentElement.style.setProperty('--px-scale', scale)
  }

  /**
   * 防抖函数
   * 用于优化resize等高频事件的处理
   * @param {Function} func - 需要防抖的函数
   * @param {number} wait - 等待时间（毫秒）
   * @returns {Function} 防抖处理后的函数
   */
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  /**
   * 单位转换辅助方法
   * 在不同单位间转换数值
   * @param {number} value - 需要转换的值
   * @param {'px'|'rem'|'vw'} fromUnit - 源单位
   * @param {'px'|'rem'|'vw'} toUnit - 目标单位
   * @param {Object} designConfig - 设计尺寸配置
   * @returns {string} 转换后的值（保留6位小数）
   */
  convertUnits(value, fromUnit, toUnit, designConfig) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = this.getViewportHeight();
    const baseSize = 100; // REM基准值

    // 获取目标设计尺寸
    const targetDesignSize = this.getTargetDesignSize(designConfig);
    const baseWidth = targetDesignSize.width;
    const baseHeight = targetDesignSize.height;

    // 计算缩放比例
    const scaleW = viewportWidth / baseWidth;
    const scaleH = viewportHeight / baseHeight;
    const scale = Math.min(scaleW, scaleH);

    // 先转换为px
    let pxValue;
    switch (fromUnit) {
      case 'rem':
        pxValue = value * baseSize * scale;
        break;
      case 'vw':
        pxValue = (value / 100) * viewportWidth;
        break;
      default:
        pxValue = value;
    }

    // 再从px转换为目标单位
    switch (toUnit) {
      case 'rem':
        return (pxValue / (baseSize * scale)).toFixed(6);
      case 'vw':
        return ((pxValue / viewportWidth) * 100).toFixed(6);
      default:
        return pxValue.toFixed(6);
    }
  }

  /**
   * 设置单位并自动转换
   * 切换当前使用的适配单位并重新适配
   * @param {'px'|'rem'|'vw'} unit - 目标单位
   */
  setUnit(unit) {
    if (this.state.currentUnit === unit) return;

    const oldUnit = this.state.currentUnit;
    this.state.currentUnit = unit;

    // 更新CSS变量
    const { device, designSize } = this.config;
    const deviceType = device.isMobile ? 'mobile' : 'pc';
    const designConfig = designSize[deviceType];

    // 转换CSS变量
    const cssVars = [
      '--calendar-scale',
      '--organize-scale',
      '--scale-width',
      '--scale-height',
      '--aspect-ratio',
      '--px-scale',
      '--rem-scale',
      '--vw-scale'
    ];

    cssVars.forEach(varName => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
      if (value) {
        const newValue = this.convertUnits(parseFloat(value), oldUnit, unit, designConfig);
        document.documentElement.style.setProperty(varName, newValue);
      }
    });

    // 重新适配
    this.adapt();
  }

  /**
   * 设置设计尺寸
   * 更新指定设备类型的设计尺寸配置
   * @param {'pc'|'mobile'} type - 设备类型
   * @param {Object} size - 新的设计尺寸配置
   */
  setDesignSize(type, size) {
    if (!this.config.designSize[type]) {
      console.warn(`Invalid design size type: ${type}`);
      return;
    }

    // 验证尺寸配置
    if (!size || typeof size !== 'object') {
      console.warn('Invalid size configuration');
      return;
    }

    // 更新基本尺寸
    if (size.width && size.height) {
      this.config.designSize[type].width = size.width;
      this.config.designSize[type].height = size.height;
    }

    // 更新全屏尺寸配置
    if (Array.isArray(size.fullscreenSizes)) {
      this.config.designSize[type].fullscreenSizes = size.fullscreenSizes;
    }

    // 重新适配
    this.adapt();
  }

  /**
   * 销毁实例
   * 清理事件监听和样式设置
   */
  destroy() {
    // 移除事件监听
    window.removeEventListener('resize', this.debounce(this.adapt.bind(this), 250));
    window.removeEventListener('orientationchange', () => {
      setTimeout(() => {
        this.state.orientation = this.getScreenOrientation();
        this.adapt();
      }, 300);
    });

    // 移除样式表
    const styleSheet = document.getElementById('dc-adapt-unit-converter');
    if (styleSheet) {
      styleSheet.remove();
    }

    // 重置根元素样式
    const html = document.documentElement;
    html.style.fontSize = '';
    
    // 清除所有CSS变量
    const cssVars = [
      '--rem-base',
      '--current-unit',
      '--px-scale',
      '--vw-scale',
      '--vw-base',
      '--vh-base',
      '--calendar-scale',
      '--organize-scale',
      '--client-width',
      '--client-height',
      '--scale-width',
      '--scale-height',
      '--aspect-ratio'
    ];
    
    cssVars.forEach(varName => {
      html.style.removeProperty(varName);
    });

    // 重置文档流
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    // 清理实例状态
    this.state = {
      currentUnit: 'px',
      currentMode: 'fullscreen',
      browserNavHeight: 0,
      isInitialized: false,
      orientation: 'portrait'
    };
  }

  /**
   * 设置适配模式
   * @param {'fullscreen'|'longpage'} mode - 目标模式
   */
  setMode(mode) {
    if (['fullscreen', 'longpage'].includes(mode)) {
      this.state.currentMode = mode
      this.adapt()
    }
  }

  /**
   * 将px转换为rem
   * @param {number} value - px值
   * @returns {string} rem值（保留6位小数）
   */
  convertPxToRem(value) {
    const { device, designSize } = this.config;
    const deviceType = device.isMobile ? 'mobile' : 'pc';
    const designConfig = designSize[deviceType];
    return this.convertUnits(value, 'px', 'rem', designConfig);
  }

  /**
   * 将px转换为vw
   * @param {number} value - px值
   * @returns {string} vw值（保留6位小数）
   */
  convertPxToVw(value) {
    const { device, designSize } = this.config;
    const deviceType = device.isMobile ? 'mobile' : 'pc';
    const designConfig = designSize[deviceType];
    return this.convertUnits(value, 'px', 'vw', designConfig);
  }

  /**
   * 将rem转换为px
   * @param {number} value - rem值
   * @returns {string} px值（保留6位小数）
   */
  convertRemToPx(value) {
    const { device, designSize } = this.config;
    const deviceType = device.isMobile ? 'mobile' : 'pc';
    const designConfig = designSize[deviceType];
    return this.convertUnits(value, 'rem', 'px', designConfig);
  }

  /**
   * 将rem转换为vw
   * @param {number} value - rem值
   * @returns {string} vw值（保留6位小数）
   */
  convertRemToVw(value) {
    const { device, designSize } = this.config;
    const deviceType = device.isMobile ? 'mobile' : 'pc';
    const designConfig = designSize[deviceType];
    return this.convertUnits(value, 'rem', 'vw', designConfig);
  }

  /**
   * 将vw转换为px
   * @param {number} value - vw值
   * @returns {string} px值（保留6位小数）
   */
  convertVwToPx(value) {
    const { device, designSize } = this.config;
    const deviceType = device.isMobile ? 'mobile' : 'pc';
    const designConfig = designSize[deviceType];
    return this.convertUnits(value, 'vw', 'px', designConfig);
  }

  /**
   * 将vw转换为rem
   * @param {number} value - vw值
   * @returns {string} rem值（保留6位小数）
   */
  convertVwToRem(value) {
    const { device, designSize } = this.config;
    const deviceType = device.isMobile ? 'mobile' : 'pc';
    const designConfig = designSize[deviceType];
    return this.convertUnits(value, 'vw', 'rem', designConfig);
  }

  /**
   * 获取当前单位的值
   * 将指定单位的值转换为当前使用的单位
   * @param {number} value - 需要转换的值
   * @param {'px'|'rem'|'vw'} fromUnit - 源单位
   * @returns {string} 转换后的值（保留6位小数）
   */
  getValueInCurrentUnit(value, fromUnit) {
    const { device, designSize } = this.config;
    const deviceType = device.isMobile ? 'mobile' : 'pc';
    const designConfig = designSize[deviceType];
    return this.convertUnits(value, fromUnit, this.state.currentUnit, designConfig);
  }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
  window.DcAdapt = DcAdapt
}
