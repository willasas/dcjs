/**
 * DCTopBar 顶部栏组件类
 * @class DCTopBar
 * @description 粘性导航栏
 */
class DCTopBar {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {Array} options.options - 选项数组，每个选项包含 id, text 等属性
   */
  constructor(options = {}) {
    this.options = options.options || [];
    this.container = document.createElement('div');
    this.container.className = 'dc-topbar';
    this.indicator = document.createElement('span');
    this.indicator.className = 'dc-topbar-indicator';
    this.container.appendChild(this.indicator); // 确保指示器被添加到容器中
  }

  async init() {
    try {
      // 渲染界面组件
      this.render();
      // 创建组件所需的样式
      this.createStyle();
      // 添加按钮点击事件监听器
      this.addClickEventListeners();
      // 默认将指示器放置在第一个按钮的位置上
      this.moveIndicator(this.container.querySelector('.dc-topbar-btn'));
    } catch (error) {
      // 捕获初始化过程中可能发生的错误，并输出到控制台
      console.error('Error initializing DCTopBar:', error);
    }
  }

  render() {
    // 渲染按钮
    this.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'dc-topbar-btn';
      button.textContent = option.text;
      if (index === 0) {
        button.classList.add('active'); // 默认第一个按钮为激活状态
      }
      this.container.appendChild(button);
    });
    document.body.appendChild(this.container); // 将容器添加到文档中
  }

  // 添加按钮点击事件监听器
  addClickEventListeners() {
    const buttons = this.container.querySelectorAll('.dc-topbar-btn');
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        this.moveIndicator(event.target);
        this.toggleActiveClass(event.target);
      });
    });
  }

  // 移动指示器到对应按钮的位置
  // moveIndicator(button) {
  //   const rect = button.getBoundingClientRect();
  //   const containerRect = this.container.getBoundingClientRect();
  //   this.indicator.style.left = `${rect.left - containerRect.left}px`;
  //   this.indicator.style.width = `${rect.width}px`;
  // }

  moveIndicator(button) {
    const rect = button.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    if (window.innerWidth <= 1024) {
      // 移动端逻辑
      this.indicator.style.top = `${rect.top - containerRect.top}px`;
      this.indicator.style.height = `${rect.height}px`;
      this.indicator.style.left = '0';
      this.indicator.style.width = '100%';
    } else {
      // 桌面端逻辑
      this.indicator.style.left = `${rect.left - containerRect.left}px`;
      this.indicator.style.width = `${rect.width}px`;
      this.indicator.style.top = 'auto';
      this.indicator.style.height = '100%';
    }
  }

  // 切换按钮的激活状态
  toggleActiveClass(button) {
    const buttons = this.container.querySelectorAll('.dc-topbar-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  }

  /**
   * 创建样式方法
   * 该方法用于创建组件所需的样式，以确保组件的外观和布局与交互的方式
   */
  createStyle() {
    const cssRules = `
      .dc-topbar { position: -webkit-sticky; position: sticky; top: 0; z-index: 200; width: 100%; display: flex; justify-content: center; align-items: center; background-color: var(--bg-theme-50); border-bottom: 1px solid var(--bg-theme-200); }
      .dc-topbar .dc-topbar-btn { position: relative; cursor: pointer; padding: 10px 20px; border: none; background: none; font-size: 16px; text-align: center; line-height: 1.2; transition: color 0.3s ease; color: var(--font-theme-800); }
      .dc-topbar .dc-topbar-btn.active { color: var(--font-theme-50); }
      .dc-topbar .dc-topbar-btn:hover { color: var(--font-theme-600); }
      .dc-topbar .dc-topbar-indicator { position: absolute; bottom: 0; height: 100%; border-radius: 20px; background-color: var(--bg-theme-700); transition: left 0.3s ease, width 0.3s ease; }

      @media screen and (max-width: 1024px) { .dc-topbar { flex-direction: column; }
        .dc-topbar .dc-topbar-btn { padding: 15px; font-size: 18px; width: 100%; }
        .dc-topbar .dc-topbar-indicator { height: 4px; width: 100%; left: 0; bottom: auto; border-radius: 40px; }
      }
    `;
    const addStyle = eleStyleInit => {
      const eleStyle = document.createElement('style');
      eleStyle.innerHTML = eleStyleInit;
      document.head.appendChild(eleStyle);
    };
    addStyle(cssRules);
  }
}

// 导出到全局
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCTopBar;
} else {
  window.DC = window.DC || {};
  window.DC.TopBar = DCTopBar;
}
