class DcAdapt {
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

  // 添加获取屏幕方向的方法
  getScreenOrientation() {
    if (window.matchMedia('(orientation: portrait)').matches) {
      return 'portrait'
    }
    return 'landscape'
  }

  // 设备检测
  detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isTablet = this.isTablet()
    return {
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
    }
  }

  // 平板检测
  isTablet() {
    const userAgent = navigator.userAgent
    const isTabletUserAgent = /iPad|Android(?!.*Mobile)|Tablet/i.test(userAgent)

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1024px)')
      return isTabletUserAgent || mediaQuery.matches
    }

    return isTabletUserAgent
  }

  // 获取浏览器导航栏高度
  getBrowserNavHeight() {
    return window.outerHeight - window.innerHeight
  }

  // 初始化方法
  init() {
    if (this.state.isInitialized) return

    // 设置初始适配
    this.adapt()

    // 添加事件监听
    this.addEventListeners()

    this.state.isInitialized = true
  }

  // 添加事件监听
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

  // 适配处理主方法
  adapt() {
    const { currentUnit, currentMode } = this.state
    const { device } = this.config

    if (currentMode === 'fullscreen') {
      this.handleFullscreenAdapt()
    } else {
      this.handleLongpageAdapt()
    }
  }

  // 处理一屏适配
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
      const viewportHeight = window.innerHeight - this.state.browserNavHeight

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
    const viewportHeight = window.innerHeight - this.state.browserNavHeight

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

  // 处理长页面适配
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
      const viewportHeight = window.innerHeight - this.state.browserNavHeight

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
    const viewportHeight = window.innerHeight - this.state.browserNavHeight

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

  // 新增获取目标设计尺寸的方法
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
    const viewportHeight = window.innerHeight - this.state.browserNavHeight
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

  // 添加查找最佳设计尺寸的方法
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

  // REM适配方法
  adaptWithRem(designConfig, viewportWidth, viewportHeight) {
    const baseSize = 100
    let scale

    // 根据屏幕方向选择缩放方式
    if (this.config.device.isMobile) {
      const isLandscapeDesign = designConfig.width > designConfig.height
      const isLandscapeScreen = this.state.orientation === 'landscape'

      if (isLandscapeDesign === isLandscapeScreen) {
        // 设计稿方向与屏幕方向一致时
        scale = Math.min(viewportWidth / designConfig.width, viewportHeight / designConfig.height)
      } else {
        // 设计稿方向与屏幕方向不一致时，需要旋转适配
        scale = Math.min(viewportWidth / designConfig.height, viewportHeight / designConfig.width)
      }
    } else {
      // PC端适配优化
      const targetDesignSize = this.getTargetDesignSize(designConfig)
      scale = Math.min(viewportWidth / targetDesignSize.width, viewportHeight / targetDesignSize.height)

      // 添加调试信息
      console.debug('PC REM Adapt:', {
        designSize: targetDesignSize,
        viewport: { width: viewportWidth, height: viewportHeight },
        scale,
        fontSize: scale * baseSize,
      })
    }

    const fontSize = scale * baseSize
    document.documentElement.style.fontSize = `${fontSize}px`
  }

  // VW适配方法
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
      // PC端适配
      const targetDesignSize = this.getTargetDesignSize(designConfig)
      const scale = Math.min(viewportWidth / targetDesignSize.width, viewportHeight / targetDesignSize.height)

      document.documentElement.style.setProperty('--px-scale', scale.toFixed(6))

      // 添加额外的辅助变量
      document.documentElement.style.setProperty('--design-width', `${targetDesignSize.width}px`)
      document.documentElement.style.setProperty('--design-height', `${targetDesignSize.height}px`)
    }
  }

  // PX适配方法
  adaptWithPx(designConfig, viewportWidth, viewportHeight) {
    let scale

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
      const targetDesignSize = this.getTargetDesignSize(designConfig)
      const scale = Math.min(viewportWidth / targetDesignSize.width, viewportHeight / targetDesignSize.height)

      // 设置基准单位和缩放比例
      document.documentElement.style.setProperty('--vw-scale', `${(scale * 100).toFixed(6)}%`)
      document.documentElement.style.setProperty('--vw-base', `${(100 / targetDesignSize.width).toFixed(6)}vw`)
      document.documentElement.style.setProperty('--vh-base', `${(100 / targetDesignSize.height).toFixed(6)}vh`)
    }

    document.documentElement.style.setProperty('--px-scale', scale)
  }

  // 长页面REM适配
  adaptLongpageWithRem(designConfig, viewportWidth) {
    const baseSize = 100
    const fontSize = (viewportWidth / designConfig.width) * baseSize
    document.documentElement.style.fontSize = `${fontSize}px`
  }

  // 长页面VW适配
  adaptLongpageWithVw(designConfig, viewportWidth) {
    // 设置基准单位
    document.documentElement.style.setProperty('--vw-base', `${(100 / designConfig.width).toFixed(6)}vw`)

    // 设置缩放比例
    const scale = viewportWidth / designConfig.width
    document.documentElement.style.setProperty('--vw-scale', `${(scale * 100).toFixed(6)}%`)
  }

  // 长页面PX适配
  adaptLongpageWithPx(designConfig, viewportWidth) {
    const scale = viewportWidth / designConfig.width
    document.documentElement.style.setProperty('--px-scale', scale)
  }

  // 工具方法：防抖
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

  // 添加单位转换辅助方法
  convertUnits() {
    const { currentUnit } = this.state
    const html = document.documentElement
    const originalFontSize = parseFloat(getComputedStyle(html).fontSize)

    // 添加转换用的 CSS 变量
    html.style.setProperty('--rem-base', `${originalFontSize}px`)

    // 添加单位转换规则
    const styleSheet = document.createElement('style')
    styleSheet.id = 'dc-adapt-unit-converter'

    // 移除旧的转换规则（如果存在）
    const oldSheet = document.getElementById('dc-adapt-unit-converter')
    if (oldSheet) {
      oldSheet.remove()
    }

    if (currentUnit === 'px') {
      // rem 转 px
      styleSheet.textContent = `
        [class*="rem"] {
          --rem-to-px: calc(var(--rem-base) * var(--px-scale));
        }
        [class*="rem"] * {
          font-size: calc(var(--rem-to-px) * var(--px-scale)) !important;
        }
      `
    } else if (currentUnit === 'vw') {
      // rem 转 vw
      styleSheet.textContent = `
        [class*="rem"] {
          --rem-to-vw: calc(var(--rem-base) * var(--vw-scale));
        }
        [class*="rem"] * {
          font-size: calc(var(--rem-to-vw)) !important;
        }
      `
    }

    document.head.appendChild(styleSheet)
  }

  // 公共API方法
  setUnit(unit) {
    if (['px', 'rem', 'vw'].includes(unit)) {
      this.state.currentUnit = unit
      this.adapt()
      this.convertUnits() // 添加单位转换
    }
  }

  setMode(mode) {
    if (['fullscreen', 'longpage'].includes(mode)) {
      this.state.currentMode = mode
      this.adapt()
    }
  }

  setDesignSize(type, size) {
    const validType = ['pc', 'mobile'].includes(type)
    const validSize = size && typeof size.width === 'number' && typeof size.height === 'number'

    if (validType && validSize) {
      this.config.designSize[type] = {
        ...this.config.designSize[type],
        ...size,
      }
      this.adapt()
    }
  }

  destroy() {
    // 清除样式设置
    document.body.style.width = ''
    document.body.style.height = ''
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''

    window.removeEventListener('resize', this.adapt.bind(this))
    window.removeEventListener('orientationchange', this.adapt.bind(this))
    document.removeEventListener('DOMContentLoaded', this.adapt.bind(this))
    this.state.isInitialized = false
  }
}

// 导出实例
// export default DcAdapt
window.DcAdapt = DcAdapt

// =============== PC端示例 ===============

// 1. PC端一屏适配示例
// REM适配
const pcFullscreenRem = new DcAdapt({
  unit: 'rem',
  mode: 'fullscreen',
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
  },
})

// PX适配
const pcFullscreenPx = new DcAdapt({
  unit: 'px',
  mode: 'fullscreen',
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
  },
})

// VW适配
const pcFullscreenVw = new DcAdapt({
  unit: 'vw',
  mode: 'fullscreen',
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
  },
})

// 2. PC端长页面适配示例
// REM适配
const pcLongpageRem = new DcAdapt({
  unit: 'rem',
  mode: 'longpage',
  designSize: {
    pc: {
      width: 1920,
      height: 1080, // 长页面模式下高度不影响适配
    },
  },
})

// PX适配
const pcLongpagePx = new DcAdapt({
  unit: 'px',
  mode: 'longpage',
  designSize: {
    pc: {
      width: 1920,
      height: 1080,
    },
  },
})

// VW适配
const pcLongpageVw = new DcAdapt({
  unit: 'vw',
  mode: 'longpage',
  designSize: {
    pc: {
      width: 1920,
      height: 1080,
    },
  },
})

// =============== 移动端示例 ===============

// 1. 移动端竖屏一屏适配示例
// REM适配
const mobilePortraitRem = new DcAdapt({
  unit: 'rem',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
    },
  },
})

// PX适配
const mobilePortraitPx = new DcAdapt({
  unit: 'px',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
    },
  },
})

// VW适配
const mobilePortraitVw = new DcAdapt({
  unit: 'vw',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
    },
  },
})

// 2. 移动端横屏一屏适配示例
// REM适配
const mobileLandscapeRem = new DcAdapt({
  unit: 'rem',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 1624,
      height: 750,
    },
  },
})

// PX适配
const mobileLandscapePx = new DcAdapt({
  unit: 'px',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 1624,
      height: 750,
    },
  },
})

// VW适配
const mobileLandscapeVw = new DcAdapt({
  unit: 'vw',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 1624,
      height: 750,
    },
  },
})

// 3. 移动端横竖屏同时适配示例
// REM适配
const mobileDualOrientationRem = new DcAdapt({
  unit: 'rem',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
      fullscreenSizes: [
        { width: 750, height: 1624 }, // 竖屏设计尺寸
        { width: 1624, height: 750 }, // 横屏设计尺寸
      ],
    },
  },
})

// PX适配
const mobileDualOrientationPx = new DcAdapt({
  unit: 'px',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
      fullscreenSizes: [
        { width: 750, height: 1624 }, // 竖屏设计尺寸
        { width: 1624, height: 750 }, // 横屏设计尺寸
      ],
    },
  },
})

// VW适配
const mobileDualOrientationVw = new DcAdapt({
  unit: 'vw',
  mode: 'fullscreen',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
      fullscreenSizes: [
        { width: 750, height: 1624 }, // 竖屏设计尺寸
        { width: 1624, height: 750 }, // 横屏设计尺寸
      ],
    },
  },
})

// 4. 移动端长页面适配示例
// REM适配
const mobileLongpageRem = new DcAdapt({
  unit: 'rem',
  mode: 'longpage',
  designSize: {
    mobile: {
      width: 750,
      height: 1624, // 长页面模式下高度不影响适配
    },
  },
})

// PX适配
const mobileLongpagePx = new DcAdapt({
  unit: 'px',
  mode: 'longpage',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
    },
  },
})

// VW适配
const mobileLongpageVw = new DcAdapt({
  unit: 'vw',
  mode: 'longpage',
  designSize: {
    mobile: {
      width: 750,
      height: 1624,
    },
  },
})
