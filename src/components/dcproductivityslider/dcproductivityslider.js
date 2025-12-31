/**
 * DCProductivitySlider - 现代化生产力滑块组件
 *
 * 一个功能丰富的滑块组件，支持自动播放、触摸滑动、键盘导航等功能
 * 适用于展示项目、产品、图片等内容，提供流畅的切换动画和响应式设计
 *
 * @class DCProductivitySlider
 * @param {Object} options - 组件配置选项
 * @param {string|HTMLElement} options.container - 容器元素选择器或DOM元素
 * @param {Array} options.items - 滑块项目数组
 * @param {string} options.closedWidth - 非激活状态卡片宽度
 * @param {string} options.openWidth - 激活状态卡片宽度
 * @param {string} options.gap - 卡片间距
 * @param {string} options.speed - 动画速度
 * @param {string} options.accentColor - 主题色
 * @param {boolean} options.autoPlay - 是否自动播放
 * @param {number} options.autoPlayInterval - 自动播放间隔(毫秒)
 * @param {boolean} options.loop - 是否循环播放
 * @param {boolean} options.showDots - 是否显示分页点
 * @param {boolean} options.showNavigation - 是否显示导航按钮
 * @param {boolean} options.enableKeyboard - 是否启用键盘导航
 * @param {boolean} options.enableTouch - 是否启用触摸滑动
 * @param {boolean} options.enableHover - 是否启用悬停效果
 * @param {Function} options.onItemClick - 卡片点击回调
 * @param {Function} options.onItemActivate - 卡片激活回调
 * @param {Function} options.onItemDeactivate - 卡片失活回调
 * @param {Function} options.onChange - 切换回调
 * @param {Function} options.onInit - 初始化完成回调
 * @param {Function} options.onAutoPlayStart - 自动播放开始回调
 * @param {Function} options.onAutoPlayPause - 自动播放暂停回调
 * @param {Function} options.onLinkClick - 链接点击回调
 */
class DCProductivitySlider {
  /**
   * 构造函数 - 初始化组件配置和状态
   * @param {Object} options - 组件配置选项
   */
  constructor(options = {}) {
    // 组件配置对象
    this.config = {
      container: options.container || '#slider-container',
      items: options.items || [],
      closedWidth: options.closedWidth || '5rem',
      openWidth: options.openWidth || '30rem',
      gap: options.gap || '1.25rem',
      speed: options.speed || '0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      accentColor: options.accentColor || '#ff6b35',
      autoPlay: options.autoPlay || false,
      autoPlayInterval: options.autoPlayInterval || 3000,
      loop: options.loop !== false, // 默认启用循环播放
      showDots: options.showDots !== false,
      showNavigation: options.showNavigation !== false,
      enableKeyboard: options.enableKeyboard !== false,
      enableTouch: options.enableTouch !== false,
      enableHover: options.enableHover !== false,
      onItemClick: options.onItemClick || (() => {}),
      onItemActivate: options.onItemActivate || (() => {}),
      onItemDeactivate: options.onItemDeactivate || (() => {}),
      onChange: options.onChange || (() => {}),
      onInit: options.onInit || (() => {}),
      onAutoPlayStart: options.onAutoPlayStart || (() => {}),
      onAutoPlayPause: options.onAutoPlayPause || (() => {}),
      onLinkClick: options.onLinkClick || (() => {}), // 添加链接点击回调
    }

    // 组件状态
    this.currentIndex = 0 // 当前激活的卡片索引
    this.isMobile = this.checkMobile() // 是否为移动设备
    this.elements = {} // DOM元素引用
    this.autoPlayTimer = null // 自动播放定时器

    // 初始化组件
    this.init()
  }

  /**
   * 检查是否为移动设备
   * @returns {boolean} 是否为移动设备
   */
  checkMobile() {
    return window.innerWidth <= 1024
  }

  /**
   * 初始化组件 - 执行组件初始化流程
   */
  init() {
    this.createElements() // 创建DOM元素
    this.initStyles() // 初始化样式
    this.bindEvents() // 绑定事件
    this.activate(0) // 激活第一个卡片
    this.initAutoPlay() // 初始化自动播放
    this.config.onInit() // 触发初始化完成回调
  }

  /**
   * 创建DOM元素 - 构建组件的HTML结构
   */
  createElements() {
    const container = typeof this.config.container === 'string' ? document.querySelector(this.config.container) : this.config.container

    if (!container) {
      console.error('Container element not found:', this.config.container)
      return
    }

    container.innerHTML = ''
    container.className = 'dc-productivity-slider'

    // 创建头部区域
    const head = document.createElement('div')
    head.className = 'productivity-controls'

    // 创建导航按钮
    if (this.config.showNavigation) {
      const navControls = document.createElement('div')
      navControls.className = 'nav-controls'

      const prevBtn = document.createElement('button')
      prevBtn.className = 'nav-btn prev'
      prevBtn.innerHTML =
        '<svg class="icon icon_prev" width="64px" height="64px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M662.954667 102.698667l-394.496 380.330666a39.893333 39.893333 0 0 0 0 57.941334L662.954667 921.301333a63.232 63.232 0 0 0 87.04 0 57.898667 57.898667 0 0 0 0-83.925333l-337.45066699-325.418667 337.49333299-325.290666a57.941333 57.941333 0 0 0 0-83.968 63.232 63.232 0 0 0-87.082666 0" /></svg>'

      prevBtn.disabled = true

      const nextBtn = document.createElement('button')
      nextBtn.className = 'nav-btn next'
      nextBtn.innerHTML =
        '<svg class="icon icon_next" width="64px" height="64px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M361.045333 921.301333l394.496-380.330666a39.893333 39.893333 0 0 0 0-57.941334L361.045333 102.698667a63.232 63.232 0 0 0-87.04 0 57.898667 57.898667 0 0 0 0 83.925333l337.45066699 325.418667-337.49333299 325.290666a57.941333 57.941333 0 0 0 0 83.968 63.232 63.232 0 0 0 87.082666 0" /></svg>'
      navControls.appendChild(prevBtn)
      navControls.appendChild(nextBtn)
      head.appendChild(navControls)

      this.elements.prevBtn = prevBtn
      this.elements.nextBtn = nextBtn
    }

    // 创建滑块容器
    const slider = document.createElement('div')
    slider.className = 'productivity-slider'

    // 创建轨道
    const track = document.createElement('div')
    track.className = 'track'

    // 创建卡片
    this.config.items.forEach((item, index) => {
      const card = this.createCard(item, index)
      track.appendChild(card)
    })

    slider.appendChild(track)

    // 创建分页点
    if (this.config.showDots) {
      const dots = document.createElement('div')
      dots.className = 'productivity-dots'

      this.config.items.forEach((_, index) => {
        const dot = document.createElement('div')
        dot.className = 'dot'
        dot.dataset.index = index
        dots.appendChild(dot)
      })

      this.elements.dots = dots
    }

    container.appendChild(head)
    container.appendChild(slider)
    if (this.elements.dots) {
      container.appendChild(this.elements.dots)
    }

    this.elements.container = container
    this.elements.track = track
    this.elements.cards = Array.from(track.querySelectorAll('.project-card'))
  }

  /**
   * 创建单个卡片元素
   * @param {Object} item - 卡片数据对象
   * @param {number} index - 卡片索引
   * @returns {HTMLElement} 创建的卡片元素
   *
   * 卡片包含以下元素：
   * - 背景图片 (project-card-bg)
   * - 标题 (project-card-title)
   * - 缩略图 (project-card-thumb)
   * - 描述 (project-card-desc)
   * - 按钮 (project-card-btn) - 使用a标签支持链接跳转
   *
   * 按钮支持以下配置：
   * - link: 链接地址，支持外部链接和内部锚点
   * - target: 链接打开方式（_blank, _self等）
   * - buttonText: 按钮文本，默认为"了解更多"
   * - onLinkClick: 自定义链接点击回调函数
   */
  createCard(item, index) {
    const card = document.createElement('div')
    card.className = 'project-card'
    card.dataset.index = index

    // 背景图片
    const bg = document.createElement('img')
    bg.className = 'project-card-bg'
    bg.src = item.backgroundImage
    bg.alt = item.title

    // 卡片内容
    const content = document.createElement('div')
    content.className = 'project-card-content'

    // 标题
    const title = document.createElement('div')
    title.className = 'project-card-title'
    title.textContent = item.title

    // 缩略图
    const thumb = document.createElement('img')
    thumb.className = 'project-card-thumb'
    thumb.src = item.thumbnail
    thumb.alt = item.title

    // 描述
    const desc = document.createElement('div')
    desc.className = 'project-card-desc'
    desc.textContent = item.description

    // 按钮 - 改为a标签，支持链接跳转
    const btn = document.createElement('a')
    btn.className = 'project-card-btn'
    btn.textContent = item.buttonText || '了解更多'
    btn.href = item.link || '#' // 添加链接字段支持
    btn.target = item.target || '_self' // 支持target属性

    // 如果提供了链接，添加点击事件处理
    if (item.link && item.link !== '#') {
      btn.addEventListener('click', e => {
        // 阻止事件冒泡，避免触发卡片点击事件
        e.stopPropagation()
        // 可以在这里添加自定义的链接处理逻辑
        if (this.config.onLinkClick) {
          this.config.onLinkClick(item, index, e)
        }
      })
    }

    content.appendChild(title)
    content.appendChild(thumb)
    content.appendChild(desc)
    content.appendChild(btn)

    card.appendChild(bg)
    card.appendChild(content)

    return card
  }

  /**
   * 初始化样式 - 动态注入CSS变量和组件样式
   *
   * 该方法会检查是否已存在样式标签，避免重复插入多个style标签
   * 通过data-dc-productivity-slider属性标识组件样式标签
   * 每次调用会先移除已存在的样式标签，再插入新的样式
   *
   * 注入的样式包括：
   * - CSS自定义变量（--gap, --speed, --closed, --open, --accent）
   * - 组件基础样式和响应式布局
   * - 移动端适配样式（max-width: 1024px）
   * - 卡片激活状态和悬停效果
   */
  initStyles() {
    // 检查是否已经存在样式标签，避免重复插入
    const existingStyle = document.querySelector('style[data-dc-productivity-slider]')
    if (existingStyle) {
      existingStyle.remove() // 移除已存在的样式标签
    }
    const style = document.createElement('style')
    style.setAttribute('data-dc-productivity-slider', 'true') // 添加标识属性
    style.textContent = `
      .dc-productivity-slider {
          --gap: ${this.config.gap};
          --speed: ${this.config.speed};
          --closed: ${this.config.closedWidth};
          --open: ${this.config.openWidth};
          --accent: ${this.config.accentColor};
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }

      .dc-productivity-slider { --gap: 10px; --speed: 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94); --closed: 96px; --open: 580px; --accent: #ff6b35; position: relative; width: 100%; height: 540px; }

      .dc-productivity-slider .productivity-controls { margin: 0 auto; padding: 0; display: flex; justify-content: space-between; align-items: center; width: 100%; height: 100%; position: absolute; top: 0; left: 0; pointer-events: none; }

      .dc-productivity-slider .productivity-controls .nav-controls { position: relative; display: flex; justify-content: space-between; align-items: center; width: 100%; height: 100%; z-index: 10; }

      .dc-productivity-slider .productivity-controls .nav-controls .nav-btn { width: 60px; height: 60px; border: none; border-radius: 50%; background: #fff; color: #fff; font-size: 0; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); cursor: pointer; transition: 0.3s; pointer-events: all; position: absolute; top: 50%; transform: translateY(-50%); }

      .dc-productivity-slider .productivity-controls .nav-controls .nav-btn:hover { background: var(--accent); }

      .dc-productivity-slider .productivity-controls .nav-controls .nav-btn:disabled { cursor: default; opacity: 0.5; }

      .dc-productivity-slider .productivity-controls .nav-controls .nav-btn.prev { left: 10px; }

      .dc-productivity-slider .productivity-controls .nav-controls .nav-btn.next { right: 10px; }

      .dc-productivity-slider .productivity-controls .nav-controls .nav-btn .icon { width: 32px; height: 32px; }

      .dc-productivity-slider .productivity-slider { width: 100%; margin: 0 auto; position: relative; overflow: hidden; height: 100%; }

      .dc-productivity-slider .productivity-slider .track { display: flex; gap: var(--gap); scroll-snap-type: x mandatory; align-items: flex-start; justify-content: center; scroll-behavior: smooth; padding: 0; }

      .dc-productivity-slider .productivity-slider .track::-webkit-scrollbar { display: none; }

      .dc-productivity-slider .productivity-slider .track .project-card { position: relative; flex: 0 0 var(--closed); height: 500px; border-radius: 12px; overflow: hidden; cursor: pointer; transition: flex-basis var(--speed), transform var(--speed); scroll-snap-align: center; }

      .dc-productivity-slider .productivity-slider .track .project-card.active { flex-basis: var(--open); box-shadow: 0 18px 55px rgba(0, 0, 0, 0.45); }

      .dc-productivity-slider .productivity-slider .track .project-card.active .project-card-content { justify-content: flex-start; align-items: flex-start; padding: 20px 12px; }

      .dc-productivity-slider .productivity-slider .track .project-card.active .project-card-content .project-card-title { writing-mode: horizontal-tb; transform: none; }

      .dc-productivity-slider .productivity-slider .track .project-card.active .project-card-content .project-card-thumb, .dc-productivity-slider .productivity-slider .track .project-card.active .project-card-content .project-card-desc, .dc-productivity-slider .productivity-slider .track .project-card.active .project-card-content .project-card-btn { display: block !important; }

      .dc-productivity-slider .productivity-slider .track .project-card:hover .project-card-bg { filter: brightness(0.9) saturate(100%); transform: scale(1.06); }

      .dc-productivity-slider .productivity-slider .track .project-card .project-card-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(0.75) saturate(75%); transition: filter 0.3s, transform var(--speed); }

      .dc-productivity-slider .productivity-slider .track .project-card .project-card-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px; padding: 0; background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.85) 100%); z-index: 2; }

      .dc-productivity-slider .productivity-slider .track .project-card .project-card-content .project-card-title { color: #fff; font-weight: 700; font-size: 28px; text-align: center; writing-mode: vertical-rl; transform: rotate(0deg); }

      .dc-productivity-slider .productivity-slider .track .project-card .project-card-content .project-card-thumb { display: none !important; width: 90%; height: 62%; border-radius: 12px; object-fit: cover; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4); }

      .dc-productivity-slider .productivity-slider .track .project-card .project-card-content .project-card-desc { display: none !important; color: #ddd; font-size: 16px; line-height: 1.2; max-width: 100%; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }

      .dc-productivity-slider .productivity-slider .track .project-card .project-card-content .project-card-btn { display: none !important; padding: 8px 12px; border: none; border-radius: 9999px; background: #fff; color: #000; font-size: 18px; font-weight: 600; cursor: pointer; line-height: 1.2; text-decoration: none; /* 移除a标签下划线 */ text-align: center; /* 确保文本居中 */ }

      .dc-productivity-slider .productivity-slider .track .project-card .project-card-content .project-card-btn:hover { background: var(--accent); color: #fff; /* 悬停时文字颜色变为白色 */ text-decoration: none; /* 确保悬停时没有下划线 */ }

      .dc-productivity-slider .productivity-dots { display: flex; justify-content: center; align-items: center; gap: 8px; padding: 0; height: 40px; width: 100%; position: absolute; bottom: 0; }

      .dc-productivity-slider .productivity-dots .dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255, 255, 255, 0.8); cursor: pointer; transition: 0.3s; }

      .dc-productivity-slider .productivity-dots .dot.active { background: var(--accent); transform: scale(1.2); }

      @media screen and (max-width: 1024px) { .dc-productivity-slider { height: 340px; --closed: 96px; --open: 580px; }
        .dc-productivity-slider .productivity-controls .nav-controls .nav-btn { width: 24px; height: 24px; }
        .dc-productivity-slider .productivity-controls .nav-controls .nav-btn:hover { background: var(--accent); }
        .dc-productivity-slider .productivity-controls .nav-controls .nav-btn:disabled { cursor: default; opacity: 0.5; }
        .dc-productivity-slider .productivity-controls .nav-controls .nav-btn.prev { left: 4px; }
        .dc-productivity-slider .productivity-controls .nav-controls .nav-btn.next { right: 4px; }
        .dc-productivity-slider .productivity-controls .nav-controls .nav-btn .icon { width: 12px; height: 12px; }
        .dc-productivity-slider .productivity-slider .track { gap: 6px; }
        .dc-productivity-slider .productivity-slider .track::-webkit-scrollbar { display: none; }
        .dc-productivity-slider .productivity-slider .track .project-card { flex: 0 0 22px; height: 300px; border-radius: 8px; }
        .dc-productivity-slider .productivity-slider .track .project-card.active { flex-basis: 200px; transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45); }
        .dc-productivity-slider .productivity-slider .track .project-card.active .project-card-content { padding: 16px 8px; }
        .dc-productivity-slider .productivity-slider .track .project-card .project-card-content { gap: 6px; }
        .dc-productivity-slider .productivity-slider .track .project-card .project-card-content .project-card-title { font-size: 20px; }
        .dc-productivity-slider .productivity-slider .track .project-card .project-card-content .project-card-thumb { width: 90%; height: 42%; border-radius: 8px; }
        .dc-productivity-slider .productivity-slider .track .project-card .project-card-content .project-card-desc { font-size: 14px; }
        .dc-productivity-slider .productivity-slider .track .project-card .project-card-content .project-card-btn { padding: 4px 8px; font-size: 16px; }
        .dc-productivity-slider .productivity-dots { gap: 6px; height: 20px; }
        .dc-productivity-slider .productivity-dots .dot { width: 10px; height: 10px; }
      }
    `
    document.head.appendChild(style)
  }

  /**
   * 绑定事件 - 为组件元素添加事件监听器
   */
  bindEvents() {
    // 卡片点击事件
    this.elements.cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        this.activate(index)
        this.config.onItemClick(this.config.items[index], index)
      })
    })

    // 导航按钮事件
    if (this.config.showNavigation) {
      this.elements.prevBtn.addEventListener('click', () => this.go(-1))
      this.elements.nextBtn.addEventListener('click', () => this.go(1))
    }

    // 分页点事件
    if (this.config.showDots) {
      this.elements.dots.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => this.activate(index))
      })
    }

    // 键盘导航
    if (this.config.enableKeyboard) {
      document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') this.go(-1)
        if (e.key === 'ArrowRight') this.go(1)
      })
    }

    // 触摸滑动
    if (this.config.enableTouch) {
      let startX = 0
      let currentX = 0
      let isSwiping = false

      this.elements.track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX
        isSwiping = true
      })

      this.elements.track.addEventListener('touchmove', e => {
        if (!isSwiping) return
        currentX = e.touches[0].clientX
      })

      this.elements.track.addEventListener('touchend', () => {
        if (!isSwiping) return

        const diff = startX - currentX
        if (Math.abs(diff) > 50) {
          if (diff > 0) this.go(1)
          else this.go(-1)
        }

        isSwiping = false
      })
    }

    // 窗口大小变化
    window.addEventListener('resize', () => {
      this.isMobile = this.checkMobile()
      this.updateUI()
    })
  }

  /**
   * 激活指定索引的卡片
   * @param {number} index - 要激活的卡片索引
   */
  activate(index) {
    if (index < 0 || index >= this.config.items.length) return

    // 失活当前卡片
    if (this.elements.cards[this.currentIndex]) {
      this.elements.cards[this.currentIndex].classList.remove('active')
      this.config.onItemDeactivate(this.config.items[this.currentIndex], this.currentIndex)
    }

    // 激活新卡片
    this.currentIndex = index
    this.elements.cards[index].classList.add('active')
    this.config.onItemActivate(this.config.items[index], index)
    this.config.onChange(this.config.items[index], index)

    this.updateUI()
    this.center()
  }

  /**
   * 更新用户界面状态
   * - 更新导航按钮的禁用状态
   * - 更新分页点的激活状态
   */
  updateUI() {
    // 更新导航按钮状态
    if (this.config.showNavigation) {
      this.elements.prevBtn.disabled = this.currentIndex === 0
      this.elements.nextBtn.disabled = this.currentIndex === this.config.items.length - 1
    }

    // 更新分页点状态
    if (this.config.showDots) {
      this.elements.dots.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex)
      })
    }
  }

  /**
   * 将当前激活的卡片居中显示
   * - 统一使用水平滚动，移动端和PC端都保持左右切换
   */
  center() {
    if (!this.elements.cards[this.currentIndex]) return

    const card = this.elements.cards[this.currentIndex]
    const track = this.elements.track

    // 统一使用水平滚动，移动端和PC端都保持左右切换
    const cardRect = card.getBoundingClientRect()
    const trackRect = track.getBoundingClientRect()
    const scrollLeft = card.offsetLeft - (trackRect.width - cardRect.width) / 2

    track.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    })
  }

  /**
   * 切换到指定方向的卡片
   * @param {number} direction - 切换方向：-1表示上一个，1表示下一个
   */
  go(direction) {
    const newIndex = this.currentIndex + direction
    if (newIndex >= 0 && newIndex < this.config.items.length) {
      this.activate(newIndex)
    } else if (this.config.loop) {
      // 循环播放：到达末尾时回到开头，到达开头时跳到末尾
      if (newIndex >= this.config.items.length) {
        this.activate(0)
      } else if (newIndex < 0) {
        this.activate(this.config.items.length - 1)
      }
    }
  }

  /**
   * 开始自动播放
   * - 设置定时器按指定间隔切换卡片
   * - 触发自动播放开始事件
   */
  play() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer)
    }
    this.autoPlayTimer = setInterval(() => {
      this.go(1)
    }, this.config.autoPlayInterval || 3000)

    // 触发自动播放开始事件
    if (typeof this.config.onAutoPlayStart === 'function') {
      this.config.onAutoPlayStart()
    }
  }

  /**
   * 暂停自动播放
   * - 清除自动播放定时器
   * - 触发自动播放暂停事件
   */
  pause() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer)
      this.autoPlayTimer = null
    }

    // 触发自动播放暂停事件
    if (typeof this.config.onAutoPlayPause === 'function') {
      this.config.onAutoPlayPause()
    }
  }

  /**
   * 初始化自动播放
   * - 如果配置了自动播放，则开始播放
   */
  initAutoPlay() {
    if (this.config.autoPlay) {
      this.play()
    }
  }

  /**
   * 更新组件数据项
   * @param {Array} newItems - 新的数据项数组
   */
  updateItems(newItems) {
    this.config.items = newItems

    // 清空现有内容
    this.elements.track.innerHTML = ''
    if (this.elements.dots) {
      this.elements.dots.innerHTML = ''
    }

    // 重新创建卡片
    this.config.items.forEach((item, index) => {
      const card = this.createCard(item, index)
      this.elements.track.appendChild(card)
    })

    // 重新创建分页点
    if (this.config.showDots) {
      this.config.items.forEach((_, index) => {
        const dot = document.createElement('div')
        dot.className = 'dot'
        dot.dataset.index = index
        this.elements.dots.appendChild(dot)
      })
    }

    // 重新绑定事件
    this.elements.cards = Array.from(this.elements.track.querySelectorAll('.project-card'))
    this.bindEvents()

    // 激活第一个卡片
    this.currentIndex = 0
    this.activate(0)
  }

  /**
   * 销毁组件
   * - 清空容器内容
   * - 释放资源
   */
  destroy() {
    if (this.elements.container) {
      this.elements.container.innerHTML = ''
    }
  }
}

// 导出到全局
window.DC = window.DC || {}
window.DC.ProductivitySlider = DCProductivitySlider
