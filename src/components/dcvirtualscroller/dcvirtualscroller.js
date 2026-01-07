class DCVirtualScroller {
  constructor(container, totalItems, itemHeight, renderItem) {
    this.container = container
    this.totalItems = totalItems
    this.itemHeight = itemHeight
    // 添加自定义渲染函数
    this.renderItem = renderItem || this.defaultRenderItem

    // 可见数据
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight)

    // 缓冲区：前后各多渲染3项
    this.bufferSize = 3

    this.startIndex = 0

    // 滚动优化相关
    this.isScrolling = false
    this.scrollTimeout = null
    this.throttleDelay = 16 // 约60fps

    // 保存绑定的方法引用，以便后续移除事件监听器
    this.boundThrottledHandleScroll = this.throttledHandleScroll.bind(this)

    // 性能监控
    this.renderCount = 0
    this.lastRenderTime = 0

    // 窗口大小变化处理
    this.boundHandleResize = this.handleResize.bind(this)

    this.init()
  }

  init() {
    // 占位容器
    this.scrollContent = document.createElement('div')
    this.scrollContent.style.height = `${this.totalItems * this.itemHeight}px`
    this.scrollContent.style.position = 'relative'
    this.container.appendChild(this.scrollContent)

    // 渲染容器
    this.viewport = document.createElement('div')
    this.viewport.style.position = 'absolute'
    this.viewport.style.top = '0'
    this.viewport.style.left = '0'
    this.viewport.style.right = '0'
    // 修复拼写错误
    this.scrollContent.appendChild(this.viewport)

    // 监听滚动 - 使用 passive 优化滚动性能
    this.container.addEventListener('scroll', this.boundThrottledHandleScroll, { passive: true })

    // 监听窗口大小变化
    window.addEventListener('resize', this.boundHandleResize, { passive: true })

    // 首次渲染
    this.render()
  }

  // 节流处理滚动事件
  throttledHandleScroll() {
    if (this.isScrolling) return

    this.isScrolling = true

    // 使用 requestAnimationFrame 优化渲染
    requestAnimationFrame(() => {
      this.handleScroll()
      this.isScrolling = false
    })
  }

  handleScroll() {
    const scrollTop = this.container.scrollTop

    // 计算起始索引
    const newStartIndex = Math.floor(scrollTop / this.itemHeight)

    // 只有当索引变化时才重新渲染
    if (newStartIndex !== this.startIndex) {
      this.startIndex = newStartIndex
      this.render()
    }
  }

  // 默认渲染函数
  defaultRenderItem(index) {
    const item = document.createElement('div')
    item.textContent = `商品 ${index + 1}`
    item.style.height = `${this.itemHeight}px`
    item.style.position = 'absolute'
    item.style.top = `${index * this.itemHeight}px`
    item.style.borderBottom = '1px solid #ddd'
    return item
  }

  render() {
    // 性能监控
    const startTime = performance.now()

    // 计算实际渲染范围（包含缓冲区）
    const start = Math.max(0, this.startIndex - this.bufferSize)
    const end = Math.min(this.totalItems, this.startIndex + this.visibleCount + this.bufferSize)

    // 清空并重新渲染
    this.viewport.innerHTML = ''

    // 使用 DocumentFragment 批量添加DOM，减少重排
    const fragment = document.createDocumentFragment()

    for (let i = start; i < end; i++) {
      const item = this.renderItem(i)
      // 确保项目有正确的定位样式
      if (!item.style.position || item.style.position !== 'absolute') {
        item.style.position = 'absolute'
        item.style.top = `${i * this.itemHeight}px`
      }
      fragment.appendChild(item)
    }

    // 一次性添加到DOM，减少重排次数
    this.viewport.appendChild(fragment)

    // 更新性能统计
    this.renderCount++
    this.lastRenderTime = performance.now() - startTime
  }

  // 更新总项目数
  updateTotalItems(totalItems) {
    this.totalItems = totalItems
    this.scrollContent.style.height = `${this.totalItems * this.itemHeight}px`
    this.render()
  }

  // 更新项目高度
  updateItemHeight(itemHeight) {
    this.itemHeight = itemHeight
    this.visibleCount = Math.ceil(this.container.clientHeight / itemHeight)
    this.scrollContent.style.height = `${this.totalItems * this.itemHeight}px`
    this.render()
  }

  // 刷新渲染
  refresh() {
    this.render()
  }

  // 销毁虚拟滚动器，清理事件监听器
  destroy() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout)
      this.scrollTimeout = null
    }

    // 移除事件监听器
    this.container.removeEventListener('scroll', this.boundThrottledHandleScroll, { passive: true })
    window.removeEventListener('resize', this.boundHandleResize, { passive: true })

    // 清空内容
    this.viewport.innerHTML = ''
    this.scrollContent.innerHTML = ''
  }

  // 获取当前滚动状态
  getScrollState() {
    return {
      scrollTop: this.container.scrollTop,
      startIndex: this.startIndex,
      visibleCount: this.visibleCount,
    }
  }

  // 获取性能统计信息
  getPerformanceStats() {
    return {
      renderCount: this.renderCount,
      lastRenderTime: this.lastRenderTime,
      averageRenderTime: this.renderCount > 0 ? this.lastRenderTime / this.renderCount : 0,
      totalItems: this.totalItems,
      visibleItems: this.visibleCount,
      bufferSize: this.bufferSize,
    }
  }

  // 重置性能统计
  resetPerformanceStats() {
    this.renderCount = 0
    this.lastRenderTime = 0
  }

  // 滚动到指定索引
  scrollToIndex(index) {
    if (index < 0 || index >= this.totalItems) return

    const scrollTop = index * this.itemHeight
    this.container.scrollTop = scrollTop
  }

  // 更新数据
  updateData(newTotalItems, newItemHeight) {
    const needsResize = newItemHeight && newItemHeight !== this.itemHeight
    const needsDataUpdate = newTotalItems && newTotalItems !== this.totalItems

    if (newItemHeight) {
      this.itemHeight = newItemHeight
    }

    if (newTotalItems) {
      this.totalItems = newTotalItems
      this.visibleCount = Math.ceil(this.container.clientHeight / this.itemHeight)
    }

    // 如果需要调整大小或数据更新，重新渲染
    if (needsResize || needsDataUpdate) {
      this.updateScrollHeight()
      this.render()
    }
  }

  // 更新滚动高度
  updateScrollHeight() {
    this.scrollContent.style.height = `${this.totalItems * this.itemHeight}px`
  }

  // 处理窗口大小变化
  handleResize() {
    // 重新计算可见项数量
    const oldVisibleCount = this.visibleCount
    this.visibleCount = Math.ceil(this.container.clientHeight / this.itemHeight)

    // 如果可见项数量发生变化，重新渲染
    if (oldVisibleCount !== this.visibleCount) {
      this.render()
    }
  }
}

// 全局命名空间
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.VirtualScroller = DCVirtualScroller
}
