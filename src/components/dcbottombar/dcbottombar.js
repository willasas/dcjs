class DCBottomBar {
  /**
   * 构造函数，初始化底部栏实例
   * @param {Object} options - 包含底部栏配置的选项对象
   */
  constructor(options = {}) {
    // 初始化logo，如果没有提供则默认为空字符串
    this.logo = options.logo || '';
    // 初始化隐私政策链接，如果没有提供则默认为'#'
    this.privacyPolicy = options.privacyPolicy || '#';
    // 初始化服务条款链接，如果没有提供则默认为'#'
    this.termsOfService = options.termsOfService || '#';
    // 初始化Cookies政策链接，如果没有提供则默认为'#'
    this.cookies = options.cookies || '#';
    // 初始化反馈链接，如果没有提供则默认为'#'
    this.feedback = options.feedback || '#';
    // 初始化版权信息，如果没有提供则默认为'© 2023 Your Company'
    this.copyright = options.copyright || '© 2023 Your Company';
    // 初始化备案号，如果没有提供则默认为'备案号'
    this.recordNumber = options.recordNumber || '备案号';
    // 初始化其他版权相关信息，如果没有提供则默认为'其他版权相关内容'
    this.otherInfo = options.otherInfo || '其他版权相关内容';
    // 初始化容器选择器，如果没有提供则默认为'body'
    this.containerSelector = options.containerSelector || 'body'; // 默认容器为 body
    // 初始化自定义样式类名，如果没有提供则默认为空字符串
    this.customClass = options.customClass || ''; // 自定义样式类名
    // 创建底部栏的容器元素
    this.container = document.createElement('div');
    // 为容器元素设置类名，包含默认类名和自定义类名
    this.container.className = `dc-bottom-bar ${this.customClass}`;
  }

  /**
   * 初始化组件或页面
   *
   * 此方法在组件或页面的生命周期中只被调用一次，通常用于设置一些初始状态或执行一些只在开始时需要执行的操作
   * 在这里，init方法主要负责调用两个重要的子方法：render和createStyle，来完成初始化过程中的核心设置
   */
  init() {
    // 渲染组件或页面
    this.render();

    // 创建样式
    this.createStyle();
  }

  /**
   * 渲染底部栏
   *
   * 此方法用于将底部栏的HTML结构渲染到页面中，包括logo、链接、版权信息等
   * 它首先清空容器中的内容，然后使用innerHTML方法将HTML字符串添加到容器中
   * 最后，它将容器添加到目标容器中，以将其渲染到页面上
   */
  render() {
    this.container.innerHTML = `
      <div class="dc-bottom-bar-top">
        <div class="dc-bottom-bar-logo">
          <img src="${this.logo}" alt="Logo">
        </div>
        <div class="dc-bottom-bar-links">
          <a href="${this.privacyPolicy}" aria-label="隐私政策">隐私政策</a>
          <a href="${this.termsOfService}" aria-label="使用条款">使用条款</a>
          <a href="${this.cookies}" aria-label="Cookies">Cookies</a>
          <a href="${this.feedback}" aria-label="网站问题反馈">网站问题反馈</a>
        </div>
      </div>
      <div class="dc-bottom-bar-bottom">
        <div class="dc-bottom-bar-copyright">
          ${this.copyright}
        </div>
        <div class="dc-bottom-bar-record-number">
          ${this.recordNumber}
        </div>
        <div class="dc-bottom-bar-other-info">
          ${this.otherInfo}
        </div>
      </div>
    `;

    // 查找目标容器，如果找到则将组件容器添加到其中，否则输出错误信息
    const targetContainer = document.querySelector(this.containerSelector);
    if (targetContainer) {
      targetContainer.appendChild(this.container);
    } else {
      console.error(`Container with selector "${this.containerSelector}" not found.`);
    }
  }

  createStyle() {
    const cssRules = `
      .dc-bottom-bar { position: relative; background-color: var(--bg-theme-50); box-sizing: border-box; padding: 20px; width: 100%; }
      .dc-bottom-bar .dc-bottom-bar-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; }
      .dc-bottom-bar .dc-bottom-bar-top .dc-bottom-bar-logo { display: flex; justify-content: center; align-items: center; min-width: 120px; }
      .dc-bottom-bar .dc-bottom-bar-top .dc-bottom-bar-logo img { display: block; width: 100%; height: auto; object-fit: contain; }
      .dc-bottom-bar .dc-bottom-bar-top .dc-bottom-bar-links { display: flex; flex-wrap: wrap; gap: 14px; }
      .dc-bottom-bar .dc-bottom-bar-top .dc-bottom-bar-links a { color: var(--font-theme-600); text-decoration: none; font-size: 16px; text-align: center; line-height: 1.2; transition: all 0.3s ease; }
      .dc-bottom-bar .dc-bottom-bar-top .dc-bottom-bar-links a:hover { text-decoration: underline; color: var(--font-theme-400); }
      .dc-bottom-bar .dc-bottom-bar-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; color: var(--font-theme-800); text-decoration: none; font-size: 16px; text-align: center; line-height: 1.2; }
      .dc-bottom-bar .dc-bottom-bar-bottom .dc-bottom-bar-copyright, .dc-bottom-bar .dc-bottom-bar-bottom .dc-bottom-bar-record-number, .dc-bottom-bar .dc-bottom-bar-bottom .dc-bottom-bar-other-info { color: var(--font-theme-800); text-decoration: none; font-size: 16px; text-align: center; line-height: 1.2; }

      @media screen and (max-width: 1024px) { .dc-bottom-bar { padding: 10px; }
        .dc-bottom-bar .dc-bottom-bar-top { flex-direction: column; }
        .dc-bottom-bar .dc-bottom-bar-top .dc-bottom-bar-links { margin: 10px auto 0; justify-content: center; width: 100%; }
        .dc-bottom-bar .dc-bottom-bar-bottom { flex-direction: column; align-items: center; gap: 10px; }
      }
    `;
    const style = document.createElement('style');
    style.innerHTML = cssRules;
    document.head.appendChild(style);
  }
}

// 导出到全局
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCBottomBar;
} else {
  window.DC = window.DC || {};
  window.DC.BottomBar = DCBottomBar;
}
