// 瀑布流组件
class DCInfiniteScroller {
  /**
   * 构造函数，用于初始化无限滚动组件
   * @param {HTMLElement} container - 页面上用于显示内容的容器元素
   * @param {Function} loadCallback - 当需要加载更多内容时调用的回调函数
   * @param {Object} options - 可选配置项，用于定制化无限滚动的行为
   */
  constructor(container, loadCallback, options = {}) {
    // 参数校验
    if (!(container instanceof HTMLElement)) {
      throw new TypeError('container必须是有效的DOM元素');
    }
    if (typeof loadCallback !== 'function') {
      throw new TypeError('loadCallback必须是函数');
    }

    // 初始化成员变量
    this.container = container;
    this.loadCallback = loadCallback;
    this.isLoading = false;
    this.lastScrollTop = 0;
    this._cachedItems = null;
    this._lastCacheTime = 0;

    // 合并配置项
    this.options = {
      threshold: 200,
      recycleThreshold: 1000,
      batchSize: 20,
      enableScrollRecycling: true,
      maxItems: 1000,
      recyclingInterval: 300,
      ...options
    };

    // 初始化哨兵元素
    this.sentinel = document.createElement('div');
    this.sentinel.id = 'sentinel';
    this.container.appendChild(this.sentinel);

    // 初始化滚动监听
    this.container.addEventListener('scroll', () => {
      this.lastScrollTop = this.container.scrollTop;
    });

    // 设置核心功能
    this.setupObserver();
    this.setupRecycling();
  }

  /** 设置交叉观察器 */
  setupObserver() {
    this.observer = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting) return;

      if (entries[0].isIntersecting && !this.isLoading) {
        this.showLoadingIndicator();
        this.isLoading = true;

        this.loadCallback(this.options.batchSize)
          .then(() => {
            this.isLoading = false;
            this.recycleDOM();
            this.hideLoadingIndicator();
          })
          .catch(error => {
            console.error('加载失败:', error);
            this.isLoading = false;
            this.hideLoadingIndicator();
          });
      }
    }, {
      rootMargin: `${this.options.threshold}px`
    });

    this.observer.observe(this.sentinel);
  }

  /** 设置滚动回收机制 */
  setupRecycling() {
    // 防抖函数实现
    const debounceRAF = (fn) => {
      let ticking = false;
      const wrapper = (...args) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            fn(...args);
            ticking = false;
          });
          ticking = true;
        }
      };
      wrapper.wrapped = fn;
      return wrapper;
    };

    this.debouncedRecycle = debounceRAF(() => {
      if (this.options.enableScrollRecycling) {
        this.recycleDOM();
      }
    });

    this.container.addEventListener('scroll', this.debouncedRecycle);
  }

  /** DOM回收方法 */
  recycleDOM() {
    // 缓存优化
    if (!this._cachedItems || Date.now() - this._lastCacheTime > 1000) {
      this._cachedItems = [...this.container.children]
        .filter(el => el !== this.sentinel && el.classList.contains('item'));
      this._lastCacheTime = Date.now();
    }

    const prevHeight = this.container.scrollHeight;
    let removedHeight = 0;

    // 元素回收逻辑
    this._cachedItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.bottom < -this.options.recycleThreshold ||
          rect.top > window.innerHeight + this.options.recycleThreshold) {
        removedHeight += item.offsetHeight;
        item.remove();
      }
    });

    // 保持滚动位置
    const heightDiff = this.container.scrollHeight - prevHeight;
    this.container.scrollTop = this.lastScrollTop - (removedHeight - heightDiff);

    // 最大元素数限制
    if (this._cachedItems.length > this.options.maxItems) {
      const excess = this._cachedItems.splice(0, this.options.maxItems / 2);
      excess.forEach(item => item.remove());
    }
  }

  /** 显示加载指示器 */
  showLoadingIndicator() {
    if (!this.loadingIndicator) {
      this.loadingIndicator = document.createElement('div');
      this.loadingIndicator.style.cssText = `
        padding: 10px;
        text-align: center;
        color: #666;
      `;
      this.loadingIndicator.textContent = '加载中...';
    }
    this.container.appendChild(this.loadingIndicator);
  }

  /** 隐藏加载指示器 */
  hideLoadingIndicator() {
    this.loadingIndicator?.remove();
  }

  /** 销毁组件 */
  destroy() {
    // 清理事件监听
    this.container.removeEventListener('scroll', this.debouncedRecycle);

    // 清理观察者
    if (this.observer) {
      this.observer.disconnect();
    }

    // 清理DOM元素
    this.sentinel.remove();
    this.hideLoadingIndicator();

    // 清理缓存
    this._cachedItems = null;
  }
}

// 使用示例部分保持不变...


// 使用示例 ========================================================
// HTML结构示例：
// <div class="detailContent" style="height: 80vh; overflow: auto"></div>
// 在页面加载完成后自动创建测试容器
document.addEventListener('DOMContentLoaded', () => {
  // 创建带样式的测试容器
  const testContainer = document.createElement('div');
  testContainer.className = 'detailContent';
  testContainer.style.cssText = `
    height: 80vh;
    overflow: auto;
    border: 2px dashed #ccc;
    margin: 20px;
    padding: 10px;
  `;

  // 添加可视化提示文字
  testContainer.innerHTML = `
    <div style="color: #666; text-align: center; padding: 20px">
      无限滚动测试容器 - 请向下滚动加载内容
    </div>
  `;

  // 插入到body末尾（保持在其他元素之后）
  document.body.appendChild(testContainer);

  // 可选：添加重置按钮
  const resetButton = document.createElement('button');
  resetButton.textContent = '重置容器';
  resetButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    padding: 10px 20px;
  `;
  resetButton.onclick = () => {
    testContainer.scrollTop = 0;
    testContainer.querySelectorAll('.item').forEach(item => item.remove());
  };
  document.body.appendChild(resetButton);
});


// 模拟数据获取函数
async function fetchData(count) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  // 生成测试数据
  return Array.from({length: count}, (_, i) => ({
    id: Date.now() + i,
    content: `Item ${i + 1} - ${new Date().toLocaleTimeString()}`
  }));
}

// 渲染函数示例
function renderItems(newItems, container) {
  // 创建文档片段提升性能
  const fragment = document.createDocumentFragment();

  newItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.style.padding = '20px';
    div.style.borderBottom = '1px solid #eee';
    div.textContent = item.content;
    fragment.appendChild(div);
  });

  // 在哨兵元素前插入新内容
  const sentinel = document.getElementById('sentinel');
  container.insertBefore(fragment, sentinel);
}

// 初始化示例
const scroller = new DCInfiniteScroller(
  document.querySelector('.container'),
  async (count) => {
    const data = await fetchData(count);
    renderItems(data);
  },
  {
    threshold: 300,
    batchSize: 20,
    maxItems: 500
  }
);

// 页面卸载时
window.addEventListener('beforeunload', () => scroller.destroy());