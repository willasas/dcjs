/**
 * 侧边导航组件类
 * 用于实现内容区域的导航功能
 */
class DCSidenav {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {string} options.container - 容器选择器
   * @param {Array} options.data - 导航数据
   * @param {number} [options.threshold=200] - 显示导航的滚动阈值
   * @param {number} [options.offset=0] - 滚动偏移量
   * @param {string} [options.activeClass='active'] - 激活状态的类名
   * @param {Function} [options.onClick] - 点击导航项的回调
   */
  constructor(options) {
    // 参数初始化
    if (!options.container) {
      this.container = document.createElement('div');
      this.container.className = 'dc-side-nav';
      document.body.appendChild(this.container);
    } else {
      this.container = document.querySelector(options.container);
    }
    this.data = options.data || [];
    this.threshold = options.threshold || 200;
    this.offset = options.offset || 0;
    this.activeClass = options.activeClass || 'active';
    this.onClick = options.onClick;
    
    // 内部状态
    this.isVisible = false;
    this.sections = [];
    this.currentIndex = 0;
    
    this.init();
  }

  /**
   * 初始化组件
   * @private
   */
  init() {
    // 添加样式
    this.addStyle();
    
    // 渲染导航结构
    this.render();
    
    // 获取所有带导航标记的内容区域
    this.sections = Array.from(document.querySelectorAll('[data-nav-section]'));
    
    // 绑定事件
    this.bindEvents();
    
    // 初始化第一个导航项为激活状态
    const firstNavItem = this.container.querySelector('.nav-item');
    if (firstNavItem) {
      firstNavItem.classList.add(this.activeClass);
    }
  }

  /**
   * 添加组件样式
   * @private
   */
  addStyle() {
    const cssRules = `
      .dc-side-nav { position: fixed; right: 0px; top: 50%; transform: translateY(-50%); z-index: 999; display: none; opacity: 0; background: #181818; border-radius: 8px; transition: opacity 0.3s ease; box-shadow: rgba(0, 0, 0, 0.7) 1px 4px 8px, rgba(0, 0, 0, 0.7) -6px -2px 12px; padding: 12px 16px; }
      .dc-side-nav.show { display: block; opacity: 1; }
      .dc-side-nav .nav-item { display: flex; justify-content: flex-start; align-items: center; padding: 8px 16px; margin: 0 auto; text-decoration: none; color: #fff; border-radius: 8px; position: relative; background: linear-gradient(to right, #141e30, #181d24); cursor: pointer; transition: all 0.3s ease-in-out; overflow: hidden; }
      .dc-side-nav .nav-item:not(:last-child) { margin-bottom: 8px; }
      .dc-side-nav .nav-item.active { background: linear-gradient(to right, #c5cace, #011e30); }
      .dc-side-nav .nav-item.active .nav-icon svg path { stroke: #000000; }
      .dc-side-nav .nav-item.active .nav-title { color: #000000; }
      .dc-side-nav .nav-item .nav-icon { display: block; width: 24px; height: 24px; margin-right: 8px; transition: all 0.3s ease; }
      .dc-side-nav .nav-item .nav-icon svg { width: 100%; height: 100%; }
      .dc-side-nav .nav-item .nav-icon svg path { stroke: #fff; }
      .dc-side-nav .nav-item .nav-title { font-size: 18px; text-align: left; line-height: 1.2; }

      @media screen and (max-width: 1024px) { .dc-side-nav { position: fixed; right: 0px; top: 50%; transform: translateY(-50%); z-index: 999; display: none; opacity: 0; background: #181818; border-radius: 8px; transition: opacity 0.3s ease; box-shadow: rgba(0, 0, 0, 0.7) 1px 4px 8px, rgba(0, 0, 0, 0.7) -6px -2px 12px; padding: 12px 16px; }
        .dc-side-nav.show { display: block; opacity: 1; }
        .dc-side-nav .nav-item { display: flex; justify-content: flex-start; align-items: center; padding: 8px 16px; margin: 0 auto; text-decoration: none; color: #fff; border-radius: 8px; position: relative; background: linear-gradient(to right, #141e30, #181d24); cursor: pointer; transition: all 0.3s ease-in-out; overflow: hidden; }
        .dc-side-nav .nav-item:not(:last-child) { margin-bottom: 8px; }
        .dc-side-nav .nav-item.active { background: linear-gradient(to right, #c5cace, #011e30); }
        .dc-side-nav .nav-item.active .nav-icon svg path { stroke: #000000; }
        .dc-side-nav .nav-item.active .nav-title { color: #000000; }
        .dc-side-nav .nav-item .nav-icon { display: block; width: 24px; height: 24px; margin-right: 8px; transition: all 0.3s ease; }
        .dc-side-nav .nav-item .nav-icon svg { width: 100%; height: 100%; }
        .dc-side-nav .nav-item .nav-icon svg path { stroke: #fff; }
        .dc-side-nav .nav-item .nav-title { font-size: 18px; text-align: left; line-height: 1.2; } 
      }
    `;
    const addStyle = (eleStyleInit) => {
      const fa = document.querySelector('title');
      const eleStyle = document.createElement('style');
      eleStyle.innerHTML = eleStyleInit;
      document.head.insertBefore(eleStyle, fa);
    };
    addStyle(cssRules);
  }

  /**
   * 渲染导航结构
   * @private
   */
  render() {
    this.container.innerHTML = this.data.map((item, index) => `
      <a href="${item.link || 'javascript:;'}" class="nav-item" data-index="${index}">
        <span class="nav-icon">${item.icon || ''}</span>
        <span class="nav-title">${item.title}</span>
      </a>
    `).join('');
  }

  /**
   * 绑定事件
   * @private
   */
  bindEvents() {
    // 滚动事件处理
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // 导航项点击事件
    this.container.addEventListener('click', this.handleClick.bind(this));
  }

  /**
   * 处理滚动事件
   * @private
   */
  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 控制导航显示/隐藏
    if (scrollTop > this.threshold) {
      if (!this.isVisible) {
        this.container.classList.add('show');
        this.isVisible = true;
      }
    } else {
      if (this.isVisible) {
        this.container.classList.remove('show');
        this.isVisible = false;
      }
    }
    
    // 更新导航项状态
    this.updateActiveState(scrollTop);
  }

  /**
   * 更新导航项激活状态
   * @param {number} scrollTop - 当前滚动位置
   * @private
   */
  updateActiveState(scrollTop) {
    const viewHeight = window.innerHeight;
    
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      const rect = section.getBoundingClientRect();
      
      if (rect.top <= viewHeight / 2 && rect.bottom >= viewHeight / 2) {
        if (this.currentIndex !== i) {
          // 移除旧的激活状态
          const oldItem = this.container.querySelector(`.nav-item.${this.activeClass}`);
          if (oldItem) {
            oldItem.classList.remove(this.activeClass);
          }
          
          // 添加新的激活状态
          const newItem = this.container.querySelector(`.nav-item[data-index="${i}"]`);
          if (newItem) {
            newItem.classList.add(this.activeClass);
          }
          
          this.currentIndex = i;
        }
        break;
      }
    }
  }

  /**
   * 处理导航项点击
   * @param {Event} e - 点击事件对象
   * @private
   */
  handleClick(e) {
    const navItem = e.target.closest('.nav-item');
    if (!navItem) return;
    
    const index = parseInt(navItem.dataset.index);
    const section = this.sections[index];
    
    if (section) {
      // 滚动到目标位置
      section.scrollIntoView({ behavior: 'smooth' });
      
      // 更新激活状态
      const oldItem = this.container.querySelector(`.nav-item.${this.activeClass}`);
      if (oldItem) {
        oldItem.classList.remove(this.activeClass);
      }
      navItem.classList.add(this.activeClass);
      this.currentIndex = index;
      
      // 触发点击回调
      this.onClick?.(this.data[index], index);
    }
  }

  /**
   * 添加导航项
   * @param {Object} item - 导航项数据
   * @param {string} item.title - 导航项标题
   */
  addItem(item) {
    this.data.push(item);
    this.render();
    
    // 重新获取内容区域
    this.sections = Array.from(document.querySelectorAll('[data-nav-section]'));
  }

  /**
   * 设置导航数据
   * @param {Array} data - 导航数据数组
   */
  setData(data) {
    this.data = data;
    this.render();
    
    // 重新获取内容区域
    this.sections = Array.from(document.querySelectorAll('[data-nav-section]'));
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCSidenav;
} else {
  window.DC = window.DC || {};
  window.DC.Sidenav = DCSidenav;
}
