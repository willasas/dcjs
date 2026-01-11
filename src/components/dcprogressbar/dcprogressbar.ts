/**
 * DC ProgressBar 组件 - TypeScript版本
 * 提供可自定义的进度条组件
 */

interface ProgressBarOptions {
  container: string | HTMLElement
  value?: number
  min?: number
  max?: number
  step?: number
  color?: string
  height?: number
  showText?: boolean
  draggable?: boolean
  onChange?: (value: number, oldValue: number) => void
  onComplete?: () => void
}

class DCProgressBar {
  private options: Required<ProgressBarOptions>
  private container: HTMLElement
  private progressBar: HTMLElement
  private progressFill: HTMLElement
  private progressText: HTMLElement | null = null
  private isDragging: boolean = false

  constructor(options: ProgressBarOptions) {
    // 设置默认选项
    this.options = {
      container: options.container,
      value: options.value || 0,
      min: options.min || 0,
      max: options.max || 100,
      step: options.step || 1,
      color: options.color || '#2196F3',
      height: options.height || 10,
      showText: options.showText || false,
      draggable: options.draggable || false,
      onChange: options.onChange || (() => {}),
      onComplete: options.onComplete || (() => {}),
    }

    // 初始化
    this.init()
  }

  /**
   * 初始化进度条
   */
  private init(): void {
    // 获取容器元素
    if (typeof this.options.container === 'string') {
      this.container = document.querySelector(this.options.container) as HTMLElement
    } else {
      this.container = this.options.container
    }

    if (!this.container) {
      throw new Error('找不到容器元素')
    }

    // 创建进度条DOM
    this.createDOM()

    // 设置初始值
    this.setValue(this.options.value)

    // 绑定事件
    this.bindEvents()
  }

  /**
   * 创建进度条DOM结构
   */
  private createDOM(): void {
    // 创建进度条容器
    this.progressBar = document.createElement('div')
    this.progressBar.className = 'dc-progress-bar'
    this.progressBar.style.position = 'relative'
    this.progressBar.style.width = '100%'
    this.progressBar.style.backgroundColor = '#e0e0e0'
    this.progressBar.style.borderRadius = '4px'
    this.progressBar.style.overflow = 'hidden'
    this.progressBar.style.cursor = this.options.draggable ? 'pointer' : 'default'
    this.progressBar.style.height = `${this.options.height}px`

    // 创建进度填充
    this.progressFill = document.createElement('div')
    this.progressFill.className = 'dc-progress-fill'
    this.progressFill.style.position = 'absolute'
    this.progressFill.style.top = '0'
    this.progressFill.style.left = '0'
    this.progressFill.style.height = '100%'
    this.progressFill.style.backgroundColor = this.options.color
    this.progressFill.style.transition = 'width 0.3s ease'
    this.progressFill.style.width = '0%'

    // 添加到容器
    this.progressBar.appendChild(this.progressFill)
    this.container.appendChild(this.progressBar)

    // 如果需要显示文本
    if (this.options.showText) {
      this.progressText = document.createElement('div')
      this.progressText.className = 'dc-progress-text'
      this.progressText.style.position = 'absolute'
      this.progressText.style.top = '50%'
      this.progressText.style.left = '50%'
      this.progressText.style.transform = 'translate(-50%, -50%)'
      this.progressText.style.color = '#fff'
      this.progressText.style.fontSize = '12px'
      this.progressText.style.fontWeight = 'bold'
      this.progressText.style.textShadow = '0 0 2px rgba(0,0,0,0.5)'
      this.progressText.style.userSelect = 'none'
      this.progressBar.appendChild(this.progressText)
    }
  }

  /**
   * 绑定事件
   */
  private bindEvents(): void {
    if (!this.options.draggable) return

    // 鼠标按下事件
    this.progressBar.addEventListener('mousedown', e => {
      this.isDragging = true
      this.updateValueFromEvent(e)
      e.preventDefault()
    })

    // 鼠标移动事件
    document.addEventListener('mousemove', e => {
      if (this.isDragging) {
        this.updateValueFromEvent(e)
      }
    })

    // 鼠标释放事件
    document.addEventListener('mouseup', () => {
      this.isDragging = false
    })

    // 触摸事件
    this.progressBar.addEventListener('touchstart', e => {
      this.isDragging = true
      this.updateValueFromEvent(e.touches[0])
      e.preventDefault()
    })

    document.addEventListener('touchmove', e => {
      if (this.isDragging) {
        this.updateValueFromEvent(e.touches[0])
      }
    })

    document.addEventListener('touchend', () => {
      this.isDragging = false
    })
  }

  /**
   * 根据事件更新值
   */
  private updateValueFromEvent(e: MouseEvent | Touch): void {
    const rect = this.progressBar.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const value = this.options.min + (percentage / 100) * (this.options.max - this.options.min)
    this.setValue(value)
  }

  /**
   * 获取当前值
   */
  getValue(): number {
    return this.options.value
  }

  /**
   * 设置进度条的值
   */
  setValue(value: number): void {
    // 限制值在最小值和最大值之间
    value = Math.max(this.options.min, Math.min(this.options.max, value))

    // 按步长对齐
    if (this.options.step > 0) {
      const steps = Math.round((value - this.options.min) / this.options.step)
      value = this.options.min + steps * this.options.step
    }

    const oldValue = this.options.value
    this.options.value = value

    // 更新UI
    const percentage = ((value - this.options.min) / (this.options.max - this.options.min)) * 100
    this.progressFill.style.width = `${percentage}%`

    // 更新文本
    if (this.progressText) {
      this.progressText.textContent = `${Math.round(percentage)}%`
    }

    // 触发回调
    if (value !== oldValue) {
      this.options.onChange(value, oldValue)

      // 如果达到最大值，触发完成回调
      if (value >= this.options.max) {
        this.options.onComplete()
      }
    }
  }

  /**
   * 获取当前值的百分比
   */
  getPercentage(): number {
    return ((this.options.value - this.options.min) / (this.options.max - this.options.min)) * 100
  }

  /**
   * 按步长增加值
   */
  increase(): void {
    this.setValue(this.options.value + this.options.step)
  }

  /**
   * 按步长减少值
   */
  decrease(): void {
    this.setValue(this.options.value - this.options.step)
  }

  /**
   * 重置为最小值
   */
  reset(): void {
    this.setValue(this.options.min)
  }

  /**
   * 更新配置
   */
  updateConfig(newOptions: Partial<ProgressBarOptions>): void {
    // 更新选项
    this.options = { ...this.options, ...newOptions }

    // 更新样式
    if (newOptions.color !== undefined) {
      this.progressFill.style.backgroundColor = newOptions.color
    }

    if (newOptions.height !== undefined) {
      this.progressBar.style.height = `${newOptions.height}px`
    }

    // 更新拖拽状态
    if (newOptions.draggable !== undefined) {
      this.progressBar.style.cursor = newOptions.draggable ? 'pointer' : 'default'
    }

    // 更新文本显示
    if (newOptions.showText !== undefined) {
      if (newOptions.showText && !this.progressText) {
        this.progressText = document.createElement('div')
        this.progressText.className = 'dc-progress-text'
        this.progressText.style.position = 'absolute'
        this.progressText.style.top = '50%'
        this.progressText.style.left = '50%'
        this.progressText.style.transform = 'translate(-50%, -50%)'
        this.progressText.style.color = '#fff'
        this.progressText.style.fontSize = '12px'
        this.progressText.style.fontWeight = 'bold'
        this.progressText.style.textShadow = '0 0 2px rgba(0,0,0,0.5)'
        this.progressText.style.userSelect = 'none'
        this.progressBar.appendChild(this.progressText)

        // 更新文本内容
        const percentage = this.getPercentage()
        this.progressText.textContent = `${Math.round(percentage)}%`
      } else if (!newOptions.showText && this.progressText) {
        this.progressBar.removeChild(this.progressText)
        this.progressText = null
      }
    }

    // 更新值以触发UI更新
    this.setValue(this.options.value)
  }

  /**
   * 销毁进度条实例
   */
  destroy(): void {
    // 移除事件监听器
    if (this.options.draggable) {
      this.progressBar.removeEventListener('mousedown', () => {})
      document.removeEventListener('mousemove', () => {})
      document.removeEventListener('mouseup', () => {})
      this.progressBar.removeEventListener('touchstart', () => {})
      document.removeEventListener('touchmove', () => {})
      document.removeEventListener('touchend', () => {})
    }

    // 移除DOM元素
    if (this.container.contains(this.progressBar)) {
      this.container.removeChild(this.progressBar)
    }
  }
}

// 注册到全局DC对象
declare global {
  interface Window {
    DC: {
      ProgressBar: typeof DCProgressBar
    }
  }
}

if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.ProgressBar = DCProgressBar
}

export default DCProgressBar
