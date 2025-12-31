class DCVirtualScroller {
  constructor(container, totalItems, itemHeight, renderItem) {
    this.container = container;
    this.totalItems = totalItems;
    this.itemHeight = itemHeight;
    // 添加自定义渲染函数
    this.renderItem = renderItem || this.defaultRenderItem;

    // 可见数据
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);

    // 缓冲区：前后各多渲染3项
    this.bufferSize = 3;

    this.startIndex = 0;
    this.init();
  }

  init() {
    // 占位容器
    this.scrollContent = document.createElement('div');
    this.scrollContent.style.height = `${this.totalItems * this.itemHeight}px`;
    this.scrollContent.style.position = 'relative';
    this.container.appendChild(this.scrollContent);

    // 渲染容器
    this.viewport = document.createElement('div');
    this.viewport.style.position = 'absolute';
    this.viewport.style.top = '0';
    this.viewport.style.left = '0';
    this.viewport.style.right = '0';
    // 修复拼写错误
    this.scrollContent.appendChild(this.viewport);

    // 监听滚动
    this.container.addEventListener('scroll', () => {
      this.handleScroll();
    });

    // 首次渲染
    this.render();
  }

  handleScroll() {
    const scrollTop = this.container.scrollTop;

    // 计算起始索引
    this.startIndex = Math.floor(scrollTop / this.itemHeight);

    // 重新渲染
    this.render();
  }

  // 默认渲染函数
  defaultRenderItem(index) {
    const item = document.createElement('div');
    item.textContent = `商品 ${index + 1}`;
    item.style.height = `${this.itemHeight}px`;
    item.style.position = 'absolute';
    item.style.top = `${index * this.itemHeight}px`;
    item.style.borderBottom = '1px solid #ddd';
    return item;
  }

  render() {
    // 计算实际渲染范围（包含缓冲区）
    const start = Math.max(0, this.startIndex - this.bufferSize);
    const end = Math.min(this.totalItems, this.startIndex + this.visibleCount + this.bufferSize);

    // 清空并重新渲染
    this.viewport.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = start; i < end; i++) {
      const item = this.renderItem(i);
      // 确保项目有正确的定位样式
      if (!item.style.position || item.style.position !== 'absolute') {
        item.style.position = 'absolute';
        item.style.top = `${i * this.itemHeight}px`;
      }
      fragment.appendChild(item);
    }

    this.viewport.appendChild(fragment);
  }

  // 更新总项目数
  updateTotalItems(totalItems) {
    this.totalItems = totalItems;
    this.scrollContent.style.height = `${this.totalItems * this.itemHeight}px`;
    this.render();
  }

  // 更新项目高度
  updateItemHeight(itemHeight) {
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(this.container.clientHeight / itemHeight);
    this.scrollContent.style.height = `${this.totalItems * this.itemHeight}px`;
    this.render();
  }

  // 刷新渲染
  refresh() {
    this.render();
  }
}

// 全局命名空间
if (typeof window !== 'undefined') {
  window.DC = window.DC || {};
  window.DC.VirtualScroller = DCVirtualScroller;
}