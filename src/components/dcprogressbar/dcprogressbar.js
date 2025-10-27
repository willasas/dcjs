/**
 * DCProgressBar - 原生JavaScript进度条组件
 * 基于CodePen示例简化版本，移除主题切换功能
 *
 * @class DCProgressBar
 * @param {Object} options - 配置选项
 * @param {string} options.container - 容器选择器
 * @param {number} options.value - 初始值 (0-100)
 * @param {number} options.min - 最小值 (默认0)
 * @param {number} options.max - 最大值 (默认100)
 * @param {number} options.step - 步长值 (默认1)
 * @param {string} options.color - 进度条颜色
 * @param {string} options.bgColor - 背景颜色
 * @param {Function} options.onChange - 值改变时的回调函数
 */
class DCProgressBar {
  constructor(options = {}) {
    this.options = {
      container: options.container || '#progress-container',
      value: options.value || 0,
      min: options.min || 0,
      max: options.max || 100,
      step: options.step || 1,
      color: options.color || '#4CAF50',
      bgColor: options.bgColor || '#f0f0f0',
      onChange: options.onChange || null,
    }

    this.container = null
    this.progressBar = null
    this.handle = null
    this.valueDisplay = null
    this.isDragging = false
    this.value = this.options.value || 0

    this.init()
  }

  /**
   * 初始化组件
   */
  init() {
    this.createDOM()
    this.bindEvents()
    this.updateDisplay()
  }

  /**
   * 创建DOM结构
   */
  createDOM() {
    // 获取容器
    this.container = typeof this.options.container === 'string' ? document.querySelector(this.options.container) : this.options.container

    if (!this.container) {
      console.error('Container not found:', this.options.container)
      return
    }

    // 清空容器
    this.container.innerHTML = ''

    // 创建进度条结构
    const progressBarHTML = `
            <div class="dc-progress-bar">
                <div class="dc-progress-track">
                    <div class="dc-progress-fill"></div>
                </div>
                <div class="dc-progress-handle">
                    <div class="dc-progress-nub"></div>
                    <div class="dc-progress-value">${this.options.value}%</div>
                </div>
                <div class="dc-progress-pips">
                    <span class="dc-pip">${this.options.min}</span>
                    <span class="dc-pip">${this.options.max}</span>
                </div>
            </div>
        `

    this.container.innerHTML = progressBarHTML

    // 获取DOM元素引用
    this.progressBar = this.container.querySelector('.dc-progress-bar')
    this.progressFill = this.container.querySelector('.dc-progress-fill')
    this.handle = this.container.querySelector('.dc-progress-handle')
    this.valueDisplay = this.container.querySelector('.dc-progress-value')

    // 应用样式
    this.applyStyles()
  }

  /**
   * 应用样式
   */
  applyStyles() {
    const style = document.createElement('style')
    style.textContent = `
            .dc-progress-bar {
                position: relative;
                width: 100%;
                height: 80px;
                margin: 30px 0;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                --progress-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                --handle-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            }

            .dc-progress-track {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 12px;
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border-radius: 8px;
                transform: translateY(-50%);
                overflow: hidden;
                box-shadow: var(--progress-shadow);
                border: 1px solid rgba(0, 0, 0, 0.05);
            }

            .dc-progress-fill {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background: linear-gradient(135deg,
                    ${this.options.color} 0%,
                    ${this.lightenColor(this.options.color, 20)} 100%);
                border-radius: 8px;
                transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                width: ${this.getPercentage()}%;
                box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
            }

            .dc-progress-handle {
                position: absolute;
                top: 50%;
                left: ${this.getPercentage()}%;
                transform: translate(-50%, -50%);
                cursor: pointer;
                z-index: 10;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .dc-progress-nub {
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                border: 3px solid ${this.options.color};
                border-radius: 50%;
                box-shadow: var(--handle-shadow);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }

            .dc-progress-nub::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg,
                    rgba(255, 255, 255, 0.8) 0%,
                    rgba(255, 255, 255, 0.2) 100%);
                border-radius: 50%;
            }

            .dc-progress-handle:hover .dc-progress-nub {
                transform: scale(1.15);
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
                border-color: ${this.darkenColor(this.options.color, 10)};
            }

            .dc-progress-handle.dragging .dc-progress-nub {
                transform: scale(1.25);
                box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
                border-color: ${this.darkenColor(this.options.color, 20)};
            }

            .dc-progress-value {
                position: absolute;
                top: -45px;
                left: 50%;
                transform: translateX(-50%);
                background: ${this.options.color};
                color: #000;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                white-space: nowrap;
                // opacity: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: var(--handle-shadow);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .dc-progress-value::after {
                content: '';
                position: absolute;
                bottom: -6px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid ${this.options.color};
            }

            .dc-progress-handle:hover .dc-progress-value,
            .dc-progress-handle.dragging .dc-progress-value {
                opacity: 1;
                transform: translateX(-50%) translateY(-5px);
            }

            .dc-progress-pips {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: space-between;
                margin-top: 8px;
            }

            .dc-pip {
                font-size: 12px;
                color: #6c757d;
                font-weight: 500;
                padding: 4px 8px;
                background: rgba(108, 117, 125, 0.1);
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            .dc-pip:hover {
                background: rgba(108, 117, 125, 0.2);
                color: #495057;
            }

            /* 添加动画效果 */
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            .dc-progress-bar.loading .dc-progress-fill {
                animation: pulse 2s ease-in-out infinite;
            }
        `

    document.head.appendChild(style)
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    if (!this.handle) return

    // 鼠标事件
    this.handle.addEventListener('mousedown', this.onMouseDown.bind(this))

    // 触摸事件
    this.handle.addEventListener('touchstart', this.onTouchStart.bind(this))

    // 点击轨道事件
    this.progressBar.addEventListener('click', this.onTrackClick.bind(this))
  }

  /**
   * 鼠标按下事件
   */
  onMouseDown(e) {
    e.preventDefault()
    this.startDrag(e.clientX)

    document.addEventListener('mousemove', this.onMouseMove.bind(this))
    document.addEventListener('mouseup', this.onMouseUp.bind(this))
  }

  /**
   * 触摸开始事件
   */
  onTouchStart(e) {
    e.preventDefault()
    const touch = e.touches[0]
    this.startDrag(touch.clientX)

    document.addEventListener('touchmove', this.onTouchMove.bind(this))
    document.addEventListener('touchend', this.onTouchEnd.bind(this))
  }

  /**
   * 开始拖拽
   */
  startDrag(startX) {
    this.isDragging = true
    this.startX = startX
    this.startValue = this.value
    this.handle.classList.add('dragging')
  }

  /**
   * 鼠标移动事件
   */
  onMouseMove(e) {
    if (!this.isDragging) return
    this.updateValueFromPosition(e.clientX)
  }

  /**
   * 触摸移动事件
   */
  onTouchMove(e) {
    if (!this.isDragging) return
    const touch = e.touches[0]
    this.updateValueFromPosition(touch.clientX)
  }

  /**
   * 鼠标释放事件
   */
  onMouseUp() {
    this.endDrag()
    document.removeEventListener('mousemove', this.onMouseMove.bind(this))
    document.removeEventListener('mouseup', this.onMouseUp.bind(this))
  }

  /**
   * 触摸结束事件
   */
  onTouchEnd() {
    this.endDrag()
    document.removeEventListener('touchmove', this.onTouchMove.bind(this))
    document.removeEventListener('touchend', this.onTouchEnd.bind(this))
  }

  /**
   * 结束拖拽
   */
  endDrag() {
    this.isDragging = false
    this.handle.classList.remove('dragging')
  }

  /**
   * 点击轨道事件
   */
  onTrackClick(e) {
    const rect = this.progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = (clickX / rect.width) * 100

    this.setValue(this.options.min + (percentage / 100) * (this.options.max - this.options.min))
  }

  /**
   * 根据位置更新值
   */
  updateValueFromPosition(clientX) {
    const rect = this.progressBar.getBoundingClientRect()
    const positionX = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (positionX / rect.width) * 100))

    const newValue = this.options.min + (percentage / 100) * (this.options.max - this.options.min)
    this.setValue(newValue)
  }

  /**
   * 获取百分比值
   */
  getPercentage() {
    const range = this.options.max - this.options.min
    return ((this.value - this.options.min) / range) * 100
  }

  /**
   * 颜色变亮
   */
  lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return '#' + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)
  }

  /**
   * 颜色变暗
   */
  darkenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) - amt
    const G = ((num >> 8) & 0x00ff) - amt
    const B = (num & 0x0000ff) - amt
    return '#' + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)
  }

  /**
   * 设置值
   */
  setValue(value) {
    const oldValue = this.value

    // 应用步长限制
    if (this.options.step > 0) {
      const steps = Math.round((value - this.options.min) / this.options.step)
      this.value = this.options.min + steps * this.options.step
    } else {
      this.value = value
    }

    // 确保值在范围内
    this.value = Math.max(this.options.min, Math.min(this.options.max, this.value))

    if (oldValue !== this.value) {
      this.updateDisplay()

      if (this.options.onChange) {
        this.options.onChange(this.value, oldValue)
      }
    }
  }

  /**
   * 获取当前值
   */
  getValue() {
    return this.value
  }

  /**
   * 更新显示
   */
  updateDisplay() {
    if (!this.progressFill || !this.handle || !this.valueDisplay) return

    const percentage = this.getPercentage()

    // 更新进度条填充
    this.progressFill.style.width = percentage + '%'

    // 更新手柄位置
    this.handle.style.left = percentage + '%'

    // 更新值显示
    this.valueDisplay.textContent = Math.round(this.value) + '%'
  }

  /**
   * 更新配置
   */
  updateConfig(newOptions) {
    Object.assign(this.options, newOptions)

    // 确保当前值在新的范围内
    this.value = Math.max(this.options.min, Math.min(this.options.max, this.value))

    // 如果颜色配置改变，重新应用样式
    if (newOptions.color || newOptions.bgColor) {
      this.applyStyles()
    }

    this.updateDisplay()
  }

  /**
   * 销毁组件
   */
  destroy() {
    if (this.handle) {
      this.handle.removeEventListener('mousedown', this.onMouseDown.bind(this))
      this.handle.removeEventListener('touchstart', this.onTouchStart.bind(this))
    }

    if (this.progressBar) {
      this.progressBar.removeEventListener('click', this.onTrackClick.bind(this))
    }

    if (this.container) {
      this.container.innerHTML = ''
    }
  }
}

// 全局命名空间
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.ProgressBar = DCProgressBar
}
