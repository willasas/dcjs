/**
 * DCMarquee - 通用无缝滚动跑马灯工具 (支持四向滚动)
 */
class DCMarquee {
  /**
   * @param {Object} options - 配置项
   * @param {string} options.container - 容器选择器或 DOM 元素 (默认: document.body)
   * @param {string[]} options.items - 滚动的文本数组
   * @param {string} options.separator - 分隔符 (默认: ✦)
   * @param {number} options.duration - 动画周期秒数 (默认: 22)
   * @param {'left' | 'right' | 'up' | 'down'} options.direction - 滚动方向
   * @param {string} options.fontSize - 字体大小 (默认: 1.1rem)
   * @param {string} options.fontWeight - 字体粗细 (默认: 200)
   * @param {string} options.textColor - 文本颜色 (默认: #666)
   * @param {string} options.hoverColor - 鼠标悬停文本颜色 (默认: #007bff)
   * @param {string} options.separatorColor - 分隔符颜色 (默认: #ff4081)
   * @param {string} options.bgColor - 背景颜色 (默认: transparent)
   * @param {string} options.borderColor - 边框颜色 (默认: #eee)
   * @param {string} options.fontFamily - 字体族 (默认: sans-serif)
   */
  constructor(options = {}) {
    this.config = {
      container: document.body,
      items: [],
      separator: '✦',
      duration: 22,
      direction: 'left', // 默认从右向左
      fontSize: '1.1rem',
      fontWeight: '200',
      textColor: '#666666',
      hoverColor: '#007bff',
      separatorColor: '#ff4081',
      bgColor: 'transparent',
      borderColor: '#eeeeee',
      fontFamily: 'sans-serif',
      ...options,
    }

    this.container = typeof this.config.container === 'string' ? document.querySelector(this.config.container) : this.config.container

    if (!this.container) {
      console.error('DCMarquee: 未找到指定的容器元素')
      return
    }

    this.uniqueId = `dc-marquee-${Date.now()}`
    this.init()
  }

  init() {
    this.injectStyles()
    this.render()
  }

  /**
   * 动态注入 CSS 样式
   */
  injectStyles() {
    const { duration, fontSize, fontWeight, textColor, hoverColor, separatorColor, bgColor, borderColor, fontFamily, direction } = this.config

    // 判断是否为垂直方向
    const isVertical = direction === 'up' || direction === 'down'

    // 动态生成动画关键帧
    let keyframes = ''
    if (direction === 'right') {
      keyframes = `from { transform: translateX(-50%); } to { transform: translateX(0); }`
    } else if (direction === 'up') {
      keyframes = `from { transform: translateY(0); } to { transform: translateY(-50%); }`
    } else if (direction === 'down') {
      keyframes = `from { transform: translateY(-50%); } to { transform: translateY(0); }`
    } else {
      // 默认 left
      keyframes = `from { transform: translateX(0); } to { transform: translateX(-50%); }`
    }

    const style = document.createElement('style')
    style.textContent = `
      .${this.uniqueId}-wrap {
        width: 100%;
        overflow: hidden;
        border-top: 1px solid ${borderColor};
        border-bottom: 1px solid ${borderColor};
        padding: 1.2rem 0;
        background-color: ${bgColor};
      }

      .${this.uniqueId}-track {
        display: flex;
        width: max-content;
        /* 如果是垂直方向，改为纵向布局 */
        flex-direction: ${isVertical ? 'column' : 'row'};
        animation: ${this.uniqueId}-scroll ${duration}s linear infinite;
        gap: 3rem;
        -webkit-tap-highlight-color: transparent;
      }

      /* 桌面端：鼠标悬停暂停 */
      @media (hover: hover) {
        .${this.uniqueId}-wrap:hover .${this.uniqueId}-track {
          animation-play-state: paused;
        }
      }

      .${this.uniqueId}-item {
        font-family: ${fontFamily};
        font-size: ${fontSize};
        font-weight: ${fontWeight};
        letter-spacing: 0.08em;
        text-transform: uppercase;
        white-space: nowrap;
        color: ${textColor};
        transition: color 0.3s;
        cursor: default;
      }

      /* 桌面端：鼠标悬停变色 */
      @media (hover: hover) {
        .${this.uniqueId}-item:hover {
          color: ${hoverColor};
        }
      }

      .${this.uniqueId}-sep {
        color: ${separatorColor};
        margin: 0;
      }

      /* 移动端无障碍：如果用户开启“减弱动态效果”，停止动画 */
      @media (prefers-reduced-motion: reduce) {
        .${this.uniqueId}-track {
          animation: none;
        }
      }

      @keyframes ${this.uniqueId}-scroll {
        ${keyframes}
      }
    `
    document.head.appendChild(style)
  }

  /**
   * 渲染 DOM 结构
   */
  render() {
    const { items, separator } = this.config
    if (!items || items.length === 0) return

    const wrapEl = document.createElement('div')
    wrapEl.className = `${this.uniqueId}-wrap`
    wrapEl.setAttribute('aria-hidden', 'true')

    const trackEl = document.createElement('div')
    trackEl.className = `${this.uniqueId}-track`

    const generateContent = () => items.map(text => `<span class="${this.uniqueId}-item">${text}</span><span class="${this.uniqueId}-sep">${separator}</span>`).join('')

    // 复制一份内容以实现无缝循环
    trackEl.innerHTML = generateContent() + generateContent()

    wrapEl.appendChild(trackEl)
    this.container.appendChild(wrapEl)
  }

  /**
   * 销毁实例，移除 DOM 和 样式
   */
  destroy() {
    const wrapEl = this.container.querySelector(`.${this.uniqueId}-wrap`)
    if (wrapEl) {
      wrapEl.remove()
    }
    const styles = document.head.querySelectorAll('style')
    for (let style of styles) {
      if (style.textContent.includes(this.uniqueId)) {
        style.remove()
        break
      }
    }
  }
}

// 挂载到全局命名空间 window.DC.Marquee
// 兼容 CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCMarquee
} else {
  window.DC = window.DC || {}
  window.DC.Marquee = DCMarquee
}
