/**
 * DCImageViewer - 图片预览和下载工具类
 * 类似 viewerjs 的功能，支持图片预览、放大、缩小、旋转、下载等
 */

class DCImageViewer {
  constructor(options = {}) {
    this.options = {
      // 容器选择器或元素
      container: options.container || document.body,
      // 是否启用模态框模式
      modal: options.modal !== undefined ? options.modal : true,
      // 是否显示导航栏
      navbar: options.navbar !== undefined ? options.navbar : true,
      // 是否显示工具栏
      toolbar: options.toolbar !== undefined ? options.toolbar : true,
      // 是否显示标题
      title: options.title !== undefined ? options.title : true,
      // 是否显示按钮
      button: options.button !== undefined ? options.button : true,
      // 是否启用动画
      animated: options.animated !== undefined ? options.animated : true,
      // 背景色
      backdrop: options.backdrop !== undefined ? options.backdrop : true,
      // 键盘支持
      keyboard: options.keyboard !== undefined ? options.keyboard : true,
      // 初始缩放比例
      initialZoomRatio: options.initialZoomRatio || 1,
      // 最小缩放比例
      minZoomRatio: options.minZoomRatio || 0.1,
      // 最大缩放比例
      maxZoomRatio: options.maxZoomRatio || 10,
      // 回调函数
      viewed: options.viewed || null,
      shown: options.shown || null,
      hidden: options.hidden || null,
      rotated: options.rotated || null,
      zoomed: options.zoomed || null,
    }

    // 状态
    this.isOpen = false
    this.currentIndex = 0
    this.images = []
    this.zoomRatio = this.options.initialZoomRatio
    this.rotation = 0
    this.isFlipped = false

    // DOM 元素
    this.container = typeof this.options.container === 'string' ? document.querySelector(this.options.container) : this.options.container
    this.viewerElement = null
    this.backdropElement = null
    this.navbarElement = null
    this.toolbarElement = null
    this.titleElement = null
    this.buttonElement = null
    this.imageElement = null

    // 绑定方法
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleBackdropClick = this.handleBackdropClick.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleRotateLeft = this.handleRotateLeft.bind(this)
    this.handleRotateRight = this.handleRotateRight.bind(this)
    this.handleFlipHorizontal = this.handleFlipHorizontal.bind(this)
    this.handleFlipVertical = this.handleFlipVertical.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleNext = this.handleNext.bind(this)

    // 初始化
    if (this.container) {
      this.init()
    } else {
      console.error('Container not found:', this.options.container)
    }
  }

  /**
   * 初始化方法
   */
  init() {
    // 收集容器中的图片
    this.collectImages()

    // 绑定事件
    this.bindEvents()

    // 创建查看器元素
    this.createViewer()
  }

  /**
   * 收集容器中的图片
   */
  collectImages() {
    const imgElements = this.container.querySelectorAll('img')
    this.images = Array.from(imgElements).map(img => ({
      element: img,
      src: img.src,
      alt: img.alt,
      title: img.title || img.alt,
    }))
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    // 为图片绑定点击事件
    this.images.forEach((image, index) => {
      image.element.addEventListener('click', e => {
        e.preventDefault()
        this.open(index)
      })
    })

    // 键盘事件
    if (this.options.keyboard) {
      document.addEventListener('keydown', this.handleKeyDown)
    }
  }

  /**
   * 创建查看器元素
   */
  createViewer() {
    // 创建模态框容器
    this.viewerElement = document.createElement('div')
    this.viewerElement.className = 'dc-image-viewer'
    this.viewerElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
        `

    // 创建背景
    this.backdropElement = document.createElement('div')
    this.backdropElement.className = 'dc-image-viewer-backdrop'
    this.backdropElement.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            cursor: pointer;
        `
    this.backdropElement.addEventListener('click', this.handleBackdropClick)

    // 创建图片容器
    const imageContainer = document.createElement('div')
    imageContainer.className = 'dc-image-viewer-container'
    imageContainer.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            overflow: hidden;
        `

    // 创建图片元素
    this.imageElement = document.createElement('img')
    this.imageElement.className = 'dc-image-viewer-image'
    this.imageElement.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            transition: transform 0.3s ease;
            cursor: grab;
        `

    // 创建导航栏
    if (this.options.navbar && this.images.length > 1) {
      this.navbarElement = document.createElement('div')
      this.navbarElement.className = 'dc-image-viewer-navbar'
      this.navbarElement.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 5px;
                background-color: rgba(0, 0, 0, 0.5);
                padding: 10px;
                border-radius: 20px;
            `

      // 添加导航按钮
      this.images.forEach((_, index) => {
        const navButton = document.createElement('button')
        navButton.className = 'dc-image-viewer-nav-button'
        navButton.style.cssText = `
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: none;
                    background-color: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                `
        navButton.addEventListener('click', () => this.goTo(index))
        this.navbarElement.appendChild(navButton)
      })
    }

    // 创建工具栏
    if (this.options.toolbar) {
      this.toolbarElement = document.createElement('div')
      this.toolbarElement.className = 'dc-image-viewer-toolbar'
      this.toolbarElement.style.cssText = `
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 10px;
                background-color: rgba(0, 0, 0, 0.5);
                padding: 10px;
                border-radius: 25px;
            `

      // 工具栏按钮
      const buttons = [
        { id: 'zoom-in', label: '+', click: this.handleZoomIn },
        { id: 'zoom-out', label: '-', click: this.handleZoomOut },
        { id: 'rotate-left', label: '↺', click: this.handleRotateLeft },
        { id: 'rotate-right', label: '↻', click: this.handleRotateRight },
        { id: 'flip-horizontal', label: '⇄', click: this.handleFlipHorizontal },
        { id: 'flip-vertical', label: '⇅', click: this.handleFlipVertical },
        { id: 'reset', label: '⟲', click: this.handleReset },
        { id: 'download', label: '↓', click: this.handleDownload },
      ]

      buttons.forEach(button => {
        const btn = document.createElement('button')
        btn.id = `dc-image-viewer-${button.id}`
        btn.className = 'dc-image-viewer-toolbar-button'
        btn.style.cssText = `
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: none;
                    background-color: rgba(255, 255, 255, 0.2);
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.2s;
                `
        btn.textContent = button.label
        btn.addEventListener('click', button.click)
        btn.addEventListener('mouseenter', () => {
          btn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
        })
        btn.addEventListener('mouseleave', () => {
          btn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
        })
        this.toolbarElement.appendChild(btn)
      })
    }

    // 创建标题
    if (this.options.title) {
      this.titleElement = document.createElement('div')
      this.titleElement.className = 'dc-image-viewer-title'
      this.titleElement.style.cssText = `
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 16px;
                text-align: center;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
                max-width: 80%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `
    }

    // 创建关闭按钮
    if (this.options.button) {
      this.buttonElement = document.createElement('button')
      this.buttonElement.className = 'dc-image-viewer-close'
      this.buttonElement.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: none;
                background-color: rgba(255, 255, 255, 0.2);
                color: white;
                font-size: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.2s;
            `
      this.buttonElement.textContent = '×'
      this.buttonElement.addEventListener('click', this.handleClose)
      this.buttonElement.addEventListener('mouseenter', () => {
        this.buttonElement.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
      })
      this.buttonElement.addEventListener('mouseleave', () => {
        this.buttonElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
      })
    }

    // 组装元素
    imageContainer.appendChild(this.imageElement)
    this.viewerElement.appendChild(this.backdropElement)
    this.viewerElement.appendChild(imageContainer)

    if (this.navbarElement) {
      this.viewerElement.appendChild(this.navbarElement)
    }

    if (this.toolbarElement) {
      this.viewerElement.appendChild(this.toolbarElement)
    }

    if (this.titleElement) {
      this.viewerElement.appendChild(this.titleElement)
    }

    if (this.buttonElement) {
      this.viewerElement.appendChild(this.buttonElement)
    }

    // 添加到文档
    document.body.appendChild(this.viewerElement)
  }

  /**
   * 打开查看器
   * @param {number} index - 图片索引
   */
  open(index = 0) {
    if (this.images.length === 0) {
      console.warn('No images found in container')
      return
    }

    this.currentIndex = Math.max(0, Math.min(index, this.images.length - 1))
    this.isOpen = true
    this.zoomRatio = this.options.initialZoomRatio
    this.rotation = 0
    this.isFlipped = false

    // 更新图片
    this.updateImage()

    // 显示查看器
    this.viewerElement.style.display = 'flex'

    // 添加动画效果
    if (this.options.animated) {
      this.viewerElement.style.opacity = '0'
      setTimeout(() => {
        this.viewerElement.style.transition = 'opacity 0.3s'
        this.viewerElement.style.opacity = '1'
      }, 10)
    }

    // 调用回调
    if (typeof this.options.shown === 'function') {
      this.options.shown(this)
    }
  }

  /**
   * 关闭查看器
   */
  close() {
    if (!this.isOpen) return

    // 添加动画效果
    if (this.options.animated) {
      this.viewerElement.style.opacity = '0'
      setTimeout(() => {
        this.viewerElement.style.display = 'none'
        this.viewerElement.style.transition = ''
        this.isOpen = false
        // 调用回调
        if (typeof this.options.hidden === 'function') {
          this.options.hidden(this)
        }
      }, 300)
    } else {
      this.viewerElement.style.display = 'none'
      this.isOpen = false
      // 调用回调
      if (typeof this.options.hidden === 'function') {
        this.options.hidden(this)
      }
    }
  }

  /**
   * 更新图片
   */
  updateImage() {
    const currentImage = this.images[this.currentIndex]
    if (!currentImage) return

    // 更新图片源
    this.imageElement.src = currentImage.src
    this.imageElement.alt = currentImage.alt

    // 更新标题
    if (this.titleElement) {
      this.titleElement.textContent = currentImage.title || `Image ${this.currentIndex + 1}/${this.images.length}`
    }

    // 更新导航栏
    if (this.navbarElement) {
      const navButtons = this.navbarElement.querySelectorAll('.dc-image-viewer-nav-button')
      navButtons.forEach((button, index) => {
        button.style.backgroundColor = index === this.currentIndex ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)'
      })
    }

    // 重置变换
    this.updateTransform()

    // 调用回调
    if (typeof this.options.viewed === 'function') {
      this.options.viewed(this)
    }
  }

  /**
   * 更新变换
   */
  updateTransform() {
    let transform = `scale(${this.zoomRatio}) rotate(${this.rotation}deg)`
    if (this.isFlipped) {
      transform += ' scaleX(-1)'
    }
    this.imageElement.style.transform = transform
  }

  /**
   * 转到指定索引的图片
   * @param {number} index - 图片索引
   */
  goTo(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.images.length - 1))
    this.updateImage()
  }

  /**
   * 上一张
   */
  prev() {
    this.goTo(this.currentIndex - 1)
  }

  /**
   * 下一张
   */
  next() {
    this.goTo(this.currentIndex + 1)
  }

  /**
   * 放大
   */
  zoomIn() {
    if (this.zoomRatio < this.options.maxZoomRatio) {
      this.zoomRatio *= 1.2
      this.updateTransform()
      if (typeof this.options.zoomed === 'function') {
        this.options.zoomed(this)
      }
    }
  }

  /**
   * 缩小
   */
  zoomOut() {
    if (this.zoomRatio > this.options.minZoomRatio) {
      this.zoomRatio /= 1.2
      this.updateTransform()
      if (typeof this.options.zoomed === 'function') {
        this.options.zoomed(this)
      }
    }
  }

  /**
   * 重置缩放
   */
  resetZoom() {
    this.zoomRatio = this.options.initialZoomRatio
    this.updateTransform()
    if (typeof this.options.zoomed === 'function') {
      this.options.zoomed(this)
    }
  }

  /**
   * 向左旋转
   */
  rotateLeft() {
    this.rotation -= 90
    this.updateTransform()
    if (typeof this.options.rotated === 'function') {
      this.options.rotated(this)
    }
  }

  /**
   * 向右旋转
   */
  rotateRight() {
    this.rotation += 90
    this.updateTransform()
    if (typeof this.options.rotated === 'function') {
      this.options.rotated(this)
    }
  }

  /**
   * 水平翻转
   */
  flipHorizontal() {
    this.isFlipped = !this.isFlipped
    this.updateTransform()
  }

  /**
   * 垂直翻转
   */
  flipVertical() {
    this.imageElement.style.transform += ' scaleY(-1)'
  }

  /**
   * 重置
   */
  reset() {
    this.zoomRatio = this.options.initialZoomRatio
    this.rotation = 0
    this.isFlipped = false
    this.updateTransform()
  }

  /**
   * 下载图片
   */
  download() {
    const currentImage = this.images[this.currentIndex]
    if (!currentImage) return

    const link = document.createElement('a')
    link.href = currentImage.src
    link.download = this.getFileNameFromUrl(currentImage.src)
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /**
   * 从URL获取文件名
   * @param {string} url - 图片URL
   * @returns {string} 文件名
   */
  getFileNameFromUrl(url) {
    const parts = url.split('/')
    const lastPart = parts[parts.length - 1]
    const fileName = lastPart.split('?')[0]
    return fileName
  }

  /**
   * 处理点击事件
   * @param {Event} e - 事件对象
   */
  handleClick(e) {
    if (!this.isOpen) return

    // 点击图片区域外关闭
    if (e.target === this.viewerElement || e.target === this.backdropElement) {
      this.close()
    }
  }

  /**
   * 处理键盘事件
   * @param {KeyboardEvent} e - 键盘事件对象
   */
  handleKeyDown(e) {
    if (!this.isOpen) return

    switch (e.key) {
      case 'Escape':
        this.close()
        break
      case 'ArrowLeft':
        this.prev()
        break
      case 'ArrowRight':
        this.next()
        break
      case '+':
      case '=':
        this.zoomIn()
        break
      case '-':
        this.zoomOut()
        break
      case '0':
        this.reset()
        break
      case 'r':
        this.rotateRight()
        break
      case 'l':
        this.rotateLeft()
        break
      case 'f':
        this.flipHorizontal()
        break
    }
  }

  /**
   * 处理背景点击
   */
  handleBackdropClick() {
    if (this.options.backdrop !== 'static') {
      this.close()
    }
  }

  /**
   * 处理放大
   */
  handleZoomIn() {
    this.zoomIn()
  }

  /**
   * 处理缩小
   */
  handleZoomOut() {
    this.zoomOut()
  }

  /**
   * 处理向左旋转
   */
  handleRotateLeft() {
    this.rotateLeft()
  }

  /**
   * 处理向右旋转
   */
  handleRotateRight() {
    this.rotateRight()
  }

  /**
   * 处理水平翻转
   */
  handleFlipHorizontal() {
    this.flipHorizontal()
  }

  /**
   * 处理垂直翻转
   */
  handleFlipVertical() {
    this.flipVertical()
  }

  /**
   * 处理重置
   */
  handleReset() {
    this.reset()
  }

  /**
   * 处理下载
   */
  handleDownload() {
    this.download()
  }

  /**
   * 处理关闭
   */
  handleClose() {
    this.close()
  }

  /**
   * 处理上一张
   */
  handlePrev() {
    this.prev()
  }

  /**
   * 处理下一张
   */
  handleNext() {
    this.next()
  }

  /**
   * 销毁查看器
   */
  destroy() {
    // 移除事件监听器
    document.removeEventListener('keydown', this.handleKeyDown)
    this.images.forEach(image => {
      image.element.removeEventListener('click', this.handleClick)
    })

    // 移除DOM元素
    if (this.viewerElement && this.viewerElement.parentNode) {
      this.viewerElement.parentNode.removeChild(this.viewerElement)
    }

    // 清理引用
    this.container = null
    this.viewerElement = null
    this.backdropElement = null
    this.navbarElement = null
    this.toolbarElement = null
    this.titleElement = null
    this.buttonElement = null
    this.imageElement = null
    this.images = []
  }
}

// 注册到全局DC对象
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.ImageViewer = DCImageViewer
}

// 导出
try {
  module.exports = DCImageViewer
} catch (e) {
  // 浏览器环境
}
