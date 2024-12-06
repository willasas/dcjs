class dcWaterfall {
  // 定义列宽和列间距的字符串值，以百分比形式表示
  constructor(containerSelector) {
    this.columnWidthStr = '22%';
    this.columnGapStr = '2%';

    // 获取瀑布流容器元素和其初始宽度
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      throw new Error(`Container not found: ${containerSelector}`);
    }
    const containerRect = this.container.getBoundingClientRect();
    this.containerWidth = containerRect.width;

    // 根据容器宽度和列宽、列间距的百分比值，计算实际的列宽和列间距
    this.columnWidth = this.parsePercentage(this.columnWidthStr) * this.containerWidth;
    this.columnGap = this.parsePercentage(this.columnGapStr) * this.containerWidth;

    // 计算可以容纳的列数
    this.columnCount = Math.floor(this.containerWidth / (this.columnWidth + this.columnGap));
    // 初始化每列的高度数组
    this.columnHeights = Array(this.columnCount).fill(0);

    // 初始化布局：对已存在的瀑布流项进行布局
    const initItems = Array.from(this.container.getElementsByClassName('waterfall-item'));
    this.layoutItems(initItems);

    // 监听窗口resize事件，以动态调整瀑布流布局
    window.addEventListener('resize', () => this.onResize());
  }

  /**
   * 解析百分比字符串为数字值
   * @param {string} str - 百分比字符串
   * @returns {number} - 解析后的数字值
   * @throws {Error} - 如果字符串不是有效的百分比形式，则抛出错误
   */
  parsePercentage(str) {
    const match = str.match(/^(\d+(\.\d+)?)(%)?$/);
    if (!match) throw new Error('Invalid percentage string');
    const num = parseFloat(match[1]);
    return match[3] ? num / 100 : num;
  }

  /**
   * 布局瀑布流项
   * @param {Array} items - 待布局的瀑布流项元素数组
   */
  layoutItems(items) {
    items.forEach((item) => {
      const minColumnIndex = this.columnHeights.indexOf(Math.min(...this.columnHeights));
      const top = this.columnHeights[minColumnIndex];
      const left = minColumnIndex * (this.columnWidth + this.columnGap);

      item.style.top = `${top}px`;
      item.style.left = `${left}px`;

      this.columnHeights[minColumnIndex] += item.offsetHeight + this.columnGap;
    });

    this.container.style.height = `${Math.max(...this.columnHeights)}px`;
  }

  /**
   * 重置瀑布流布局。
   */
  resetLayout() {
    this.columnHeights.fill(0);
    const allItems = Array.from(this.container.getElementsByClassName('waterfall-item'));
    this.layoutItems(allItems);
  }

  /**
   * 动态加载更多瀑布流项。
   * @param {number} count - 要加载的项数。
   */
  dynamicLoadMoreItems(count = 10) {
    const newItems = Array.from({ length: count }, () => {
      const newItem = document.createElement('div');
      newItem.className = 'waterfall-item';
      newItem.style.height = `${Math.floor(Math.random() * 200) + 100}px`; // 扩大高度范围
      this.container.appendChild(newItem);
      return newItem;
    });
    this.layoutItems(newItems);
  }

  /**
   * 处理窗口大小调整事件。
   */
  onResize() {
    const newContainerRect = this.container.getBoundingClientRect();
    this.containerWidth = newContainerRect.width;

    this.columnWidth = this.parsePercentage(this.columnWidthStr) * this.containerWidth;
    this.columnGap = this.parsePercentage(this.columnGapStr) * this.containerWidth;

    this.columnCount = Math.floor(this.containerWidth / (this.columnWidth + this.columnGap));
    this.columnHeights = Array(this.columnCount).fill(0);

    const allItems = Array.from(this.container.getElementsByClassName('waterfall-item'));
    this.layoutItems(allItems);
  }
}

window.DC = window.DC || {};
window.DC.Waterfall = dcWaterfall;