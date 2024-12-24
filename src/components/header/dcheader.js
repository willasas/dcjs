class DCHeader {
  /**
   * 构造函数，用于初始化用户类的实例
   * @param {Object} options - 初始化选项对象
   *   - type {string} - 用户类型，默认为'official'
   *   - selector {string} - 用于选择用户元素的字符串
   *   - isLoggedIn {boolean} - 用户登录状态，默认为false
   *   - userInfo {Object} - 用户信息对象，默认为null
   */
  constructor(options = {}) {
    // 解构赋值从options中提取type和selector属性，设置默认值， 可选值('official'|'gaming'|'lib'|'shop'|'product')
    const { type = 'official', selector } = options;
    this.type = type; // 设置用户类型
    this.selector = selector; // 设置用户选择器
    // 设置用户登录状态，如果options中未提供，则默认为false
    this.isLoggedIn = options.isLoggedIn || true;
    // 设置用户信息，如果options中未提供，则默认为null
    this.userInfo = options.userInfo || null;
    this.config = null; // 初始化配置，设置为null

    this.init(); // 调用初始化方法
  }

  /**
   * 异步初始化方法
   *
   * 该方法旨在异步地初始化一个组件或应用它包括加载配置、渲染界面、绑定事件和创建样式
   * 使用async/await语法确保每个步骤在下一个步骤之前完成，增强了代码的可读性和维护性
   */
  async init() {
    try {
      // 等待配置加载完成
      await this.loadConfig();
      // 渲染界面组件
      this.render();
      // 绑定必要的事件处理函数
      this.bindEvents();
      // 创建组件所需的样式
      this.createStyle();
    } catch (error) {
      // 捕获初始化过程中可能发生的错误，并输出到控制台
      console.error('Error initializing header:', error);
    }
  }

  /**
   * 异步加载配置方法
   * 此方法首先检查全局变量DC中是否存在config配置，如果存在，则直接使用该配置
   * 如果不存在，则尝试从服务器加载配置文件dcsites.json，并将其内容作为配置使用
   * 在加载配置后，会将配置保存到全局变量DC中，以便后续使用
   */
  async loadConfig() {
    try {
      // 检查全局变量DC中是否存在config配置
      if (window.DC && window.DC.config) {
        this.config = window.DC.config;
      } else {
        // 从服务器加载配置文件dcsites.json
        const response = await fetch('./dcsites.json');
        // 检查响应状态，如果响应状态不是ok，则抛出错误
        if (!response.ok) {
          throw new Error('Failed to load config');
        }
        // 将响应内容解析为JSON，并保存为配置
        this.config = await response.json();
        // 在全局变量DC中保存配置，以便后续使用
        window.DC = window.DC || {};
        window.DC.config = this.config;
      }
    } catch (error) {
      // 捕获错误，并将其输出到控制台
      console.error('Error loading config:', error);
      // 重新抛出错误，以便外部调用者可以处理
      throw error;
    }
  }

  /**
   * 创建样式方法
   * 该方法用于创建组件所需的样式，以确保组件的外观和布局与交互的方式
   */
  createStyle() {
    const cssRules = `
      .dc-header { position: fixed; top: 0; left: 0; width: 100%; height: 80px; box-sizing: border-box; padding: 0 40px; background: var(--bg-theme-50); display: flex; align-items: center; z-index: 1000; }
      .dc-header .dc-header-logo { min-width: 220px; margin-right: 40px; }
      .dc-header .dc-header-logo .dc-header-logo-link { display: block; width: 100%; height: 100%; cursor: pointer; }
      .dc-header .dc-header-logo img { display: block; height: 100%; width: 100%; object-fit: cover; }
      .dc-header .dc-header-nav { position: relative; display: flex; align-items: center; flex: 1; height: 100%; }
      .dc-header .dc-header-nav .dc-header-menu { display: flex; align-items: center; margin: 0; padding: 0; list-style: none; height: 100%; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item { position: relative; margin: 0; min-width: 120px; width: auto; height: 100%; display: flex; justify-content: center; align-items: center; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item:hover { color: var(--font-theme-700); border-bottom: 2px solid var(--bg-theme-700); }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item:not(:last-child) { margin-right: 20px; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item.has-submenu:hover .dc-submenu { opacity: 1; visibility: visible; transform: translateY(0); }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-menu-link { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: var(--font-theme-950); text-decoration: none; font-size: 20px; font-weight: bold; text-align: center; line-height: 1.2; transition: color 0.3s; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-menu-link .icon_chevron_down { width: 24px; height: 24px; margin-left: 4px; vertical-align: middle; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-menu-link .icon_chevron_down .chevron-line { transition: all 0.3s ease; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-menu-link:hover { color: var(--font-theme-700); }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu { position: absolute; top: 100%; left: 0; min-width: 200px; background: var(--bg-theme-50); border-radius: 8px; box-shadow: 0 2px 8px var(--bg-theme-950); opacity: 0; visibility: hidden; transform: translateY(20px); transition: all 0.3s; z-index: 300; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu.active { opacity: 1; visibility: visible; transform: translateY(0); }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu .dc-submenu-content { position: relative; box-sizing: border-box; padding: 8px 0; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu .dc-submenu-content .dc-submenu-item { display: block; padding: 8px 16px; color: var(--font-theme-900); text-decoration: none; transition: background-color 0.3s; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu .dc-submenu-content .dc-submenu-item:hover { background: var(--bg-theme-300); }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu .dc-submenu-content .dc-submenu-item .dc-submenu-title { font-size: 18px; text-align: left; color: var(--font-theme-900); line-height: 1.2; }
      .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu .dc-submenu-content .dc-submenu-item .dc-submenu-desc { font-size: 16px; text-align: left; line-height: 1.2; width: 80%; color: var(--font-theme-600); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dc-header .dc-header-nav .header-menu-toggle { display: none; cursor: pointer; }
      .dc-header .dc-header-nav .header-menu-toggle .icon_menu { margin: 0 auto; width: 24px; height: 24px; }
      .dc-header .dc-header-nav .header-menu-toggle .icon_menu .menu-line { transition: all 0.3s ease; }
      .dc-header .dc-header-nav .header-menu-toggle.active .icon_menu .menu-line-2 { opacity: 0; }
      .dc-header .dc-header-user { display: flex; align-items: center; gap: 16px; }
      .dc-header .dc-header-user .dc-search { position: relative; }
      .dc-header .dc-header-user .dc-search .dc-search-btn { display: block; width: 40px; height: 40px; border-radius: 50%; background: var(--bg-theme-100); display: flex; justify-content: center; align-items: center; border-color: var(--bg-theme-600); border: none; background: transparent; cursor: pointer; }
      .dc-header .dc-header-user .dc-search .dc-search-btn .icon_search { display: block; width: 24px; height: 24px; }
      .dc-header .dc-header-user .dc-search .dc-search-panel { display: none; }
      .dc-header .dc-header-user .dc-search .dc-search-panel.active { display: block; width: 100%; position: fixed; top: 0; left: 0; background: var(--bg-theme-50); z-index: 1000; width: 100%; height: 80px; box-sizing: border-box; padding: 0 40px; animation: fadeIn 0.3s ease-in-out; }
      .dc-header .dc-header-user .dc-search .dc-search-panel .search-form { position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
      .dc-header .dc-header-user .dc-search .dc-search-panel .search-form .search-input-wrap { position: relative; width: 824px; margin-right: 12px; }
      .dc-header .dc-header-user .dc-search .dc-search-panel .search-form .search-input-wrap .icon_search { display: block; width: 24px; height: 24px; position: absolute; right: 1px; top: 50%; transform: translateY(-50%); cursor: pointer; transition: all 0.3s ease-in-out; padding: 7px; border-radius: 50%; background: var(--bg-theme-50); }
      .dc-header .dc-header-user .dc-search .dc-search-panel .search-form .search-input-wrap .icon_search path { fill: var(--font-theme-50); }
      .dc-header .dc-header-user .dc-search .dc-search-panel .search-form .search-input-wrap .search-input { width: 100%; height: 40px; border-radius: 50px; background: var(--bg-theme-100); border: 1px solid var(--bg-theme-600); box-sizing: border-box; padding: 0 16px; font-size: 16px; color: var(--font-theme-900); text-align: left; line-height: 1.2; outline: none; transition: all 0.3s cubic-bezier(0, 0.105, 0.035, 1.57); }
      .dc-header .dc-header-user .dc-search .dc-search-panel .search-form .search-btn-close { border: none; background: none; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; }
      .dc-header .dc-header-user .dc-search .dc-search-panel .search-form .search-btn-close .icon_close { display: block; width: 24px; height: 24px; }
      .dc-header .dc-header-user .dc-auth { position: relative; display: flex; justify-content: center; align-items: center; }
      .dc-header .dc-header-user .dc-auth .dc-btn { display: block; max-width: 120px; font-size: 18px; text-align: left; line-height: 1.2; width: 80%; color: var(--font-theme-50); text-decoration: none; position: relative; cursor: pointer; padding: 8px 16px; border-radius: 8px; box-shadow: inset 0 0 0 1px color(var(--bg-theme-50), opacity(0.1)); background: radial-gradient(ellipse at bottom, var(--bg-theme-500) 0%, var(--bg-theme-950) 45%); transition: all 1s cubic-bezier(0.15, 0.83, 0.66, 1); }
      .dc-header .dc-header-user .dc-auth .dc-btn::before { content: ""; width: 70%; height: 1px; position: absolute; bottom: 0; left: 15%; background: var(--bg-theme-50); background: linear-gradient(90deg, transparent 0%, var(--bg-theme-50) 50%, transparent 100%); opacity: 0.2; transition: all 1s cubic-bezier(0.15, 0.83, 0.66, 1); }
      .dc-header .dc-header-user .dc-auth .dc-btn:hover { color: var(--font-theme-50); transform: scale(1.1) translateY(-3px); }
      .dc-header .dc-header-user .dc-auth .dc-btn:hover::before { opacity: 1; }
      .dc-header .dc-header-user .dc-auth .dc-btn-primary { margin-left: 12px; }
      .dc-header .dc-header-user .dc-user { position: relative; display: flex; justify-content: center; align-items: center; }
      .dc-header .dc-header-user .dc-user .dc-user-avatar { position: relative; display: block; width: 40px; height: 40px; border-radius: 50%; overflow: hidden; background: var(--bg-theme-100); padding: 0; }
      .dc-header .dc-header-user .dc-user .dc-user-avatar img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown { position: absolute; top: 100%; right: 0; width: 300px; background: var(--bg-theme-50); border-radius: 8px; box-shadow: 0 2px 8px var(--bg-theme-950); opacity: 0; visibility: hidden; transform: translateY(-20px); transition: all 0.3s ease-in-out; z-index: 300; display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; flex-direction: column; box-sizing: border-box; padding: 18px 24px; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown.active { opacity: 1; visibility: visible; transform: translateY(20px); }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info { position: relative; display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap; flex-direction: column; gap: 12px; width: 100%; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-name { display: flex; justify-content: center; align-items: center; width: 100%; font-size: 20px; font-weight: bold; color: var(--font-theme-900); text-align: center; line-height: 1.2; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-name .dc-user-name-text { color: var(--font-theme-400); }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-name .dc-user-name-num { margin-left: 8px; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-level, .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-coins { display: flex; justify-content: center; align-items: center; width: 100%; font-size: 16px; color: var(--font-theme-600); text-align: left; line-height: 1.2; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-level .dc-user-level-text, .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-level .dc-user-coins-text, .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-coins .dc-user-level-text, .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-coins .dc-user-coins-text { color: var(--font-theme-400); }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-level .dc-user-level-num, .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-level .dc-user-coins-num, .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-coins .dc-user-level-num, .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-avatar-info .dc-user-coins .dc-user-coins-num { margin-left: 8px; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-menu { position: relative; width: 100%; margin: 12px auto 0; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-menu .dc-user-menu-item { display: flex; justify-content: flex-start; align-items: center; width: 100%; height: 38px; text-decoration: none; box-sizing: border-box; border-radius: 8px; padding: 0 12px; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-menu .dc-user-menu-item:not(:last-child) { margin-bottom: 12px; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-menu .dc-user-menu-item:hover { background: var(--bg-theme-300); }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-menu .dc-user-menu-item .icon { display: block; width: 18px; height: 18px; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-menu .dc-user-menu-item .icon path { stroke: #000; }
      .dc-header .dc-header-user .dc-user .dc-user-dropdown .dc-user-menu .dc-user-menu-item .dc-user-item-text { font-size: 16px; color: var(--font-theme-900); text-align: left; line-height: 1.2; margin-left: 12px; }

      @media screen and (max-width: 1024px) { .dc-header { padding: 0 20px; }
        .dc-header .dc-header-logo { min-width: 80px; width: 120px; margin-right: 20px; }
        .dc-header .dc-header-nav .header-menu-toggle { display: block; margin-left: auto; width: 24px; height: 24px; border: none; background: none; padding: 0; cursor: pointer; }
        .dc-header .dc-header-nav .header-menu-toggle .icon_menu { margin: 0 auto; width: 24px; height: 24px; }
        .dc-header .dc-header-nav .header-menu-toggle .icon_menu .menu-line { transition: all 0.3s ease; }
        .dc-header .dc-header-nav .header-menu-toggle.active .icon_menu .menu-line-2 { opacity: 0; }
        .dc-header .dc-header-nav .dc-header-menu { position: fixed; top: 80px; left: 0; z-index: 999; width: 100%; height: calc(100vh - 80px); background: var(--bg-theme-50); flex-direction: column; align-items: flex-start; box-sizing: border-box; padding: 20px; transform: translateX(-100%); transition: transform 0.3s ease-in-out; overflow-y: auto; }
        .dc-header .dc-header-nav .dc-header-menu.active { transform: translateX(0); }
        .dc-header .dc-header-nav .dc-header-menu .dc-menu-item { width: 100%; height: auto; margin: 0; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; flex-direction: column; }
        .dc-header .dc-header-nav .dc-header-menu .dc-menu-item:not(:last-child) { margin-right: 0; }
        .dc-header .dc-header-nav .dc-header-menu .dc-menu-item:hover { border-bottom: none; }
        .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-menu-link { padding: 12px 0; width: 100%; height: auto; justify-content: space-between; }
        .dc-header .dc-header-nav .dc-header-menu .dc-menu-item.has-submenu:hover .dc-submenu { transform: none; }
        .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu { position: static; min-width: auto; width: 100%; opacity: 1; visibility: visible; transform: none; box-shadow: none; display: none; }
        .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu.active { display: block; }
        .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu .dc-submenu-content { padding: 0; }
        .dc-header .dc-header-nav .dc-header-menu .dc-menu-item .dc-submenu .dc-submenu-content .dc-submenu-item { padding: 0 0 12px; }
        .dc-header .dc-header-user { margin-left: 12px; gap: 12px; }
        .dc-header .dc-header-user .dc-search .dc-search-btn { width: 24px; height: 24px; padding: 0; border: none; }
        .dc-header .dc-header-user .dc-auth .dc-btn { font-size: 16px; padding: 4px 8px; max-width: fit-content; }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    const addStyle = eleStyleInit => {
      const fa = document.querySelector('title')
      const eleStyle = document.createElement('style')
      eleStyle.innerHTML = eleStyleInit
      document.head.insertBefore(eleStyle, fa)
    }
    addStyle(cssRules)
  }

  /**
   * 渲染header组件
   *
   * 此函数负责生成一个header元素，包含logo、主菜单和用户区域，并将其插入到页面中指定的位置
   * 如果没有指定位置，默认将header插入到body的最前面
   *
   * @returns {HTMLElement} 返回生成的header元素
   */
  render() {
    // 生成header元素的HTML字符串，包含logo、主菜单和用户区域
    const headerHTML = `
      <header class="${this.type}-header dc-header" id="${this.type}-header">
        ${this.renderLogo()}
        ${this.renderMainMenu()}
        ${this.renderUserArea()}
      </header>
    `;

    // 创建一个临时div来解析HTML字符串
    const temp = document.createElement('div');
    temp.innerHTML = headerHTML;
    const headerElement = temp.firstElementChild;

    // 如果指定了selector，插入到指定元素中
    if (this.selector) {
      const container = document.querySelector(this.selector);
      if (container) {
        container.appendChild(headerElement);
      } else {
        // 如果未找到指定的容器，输出警告并默认插入到body
        console.warn(`Container with selector "${this.selector}" not found, falling back to body`);
        const body = document.body;
        const firstChild = body.firstChild;
        if (firstChild) {
          body.insertBefore(headerElement, firstChild);
        } else {
          body.appendChild(headerElement);
        }
      }
    } else {
      // 默认插入到body的最前面
      const body = document.body;
      const firstChild = body.firstChild;
      if (firstChild) {
        body.insertBefore(headerElement, firstChild);
      } else {
        body.appendChild(headerElement);
      }
    }

    // 返回生成的header元素
    return headerElement;
  }

  /**
   * 渲染徽标图像的函数
   *
   * 该函数根据当前类型从配置对象中提取徽标信息，并返回包含徽标图像的HTML字符串
   * 它用于动态地在页面头部渲染出徽标，确保徽标可以链接到指定的页面
   */
  renderLogo() {
    // 从配置对象中解构获取当前类型的徽标信息
    const { logo } = this.config.header[this.type];

    // 返回包含徽标图像和链接的HTML字符串
    return `
      <div class="dc-header-logo">
        <a class="dc-header-logo-link" href="${logo.link}">
          <img src="${logo.src}" alt="${logo.alt}">
        </a>
      </div>
    `;
  }

  /**
   * 渲染主菜单
   *
   * 此方法根据当前类型从配置中获取主菜单项，然后生成并返回一个包含主菜单的HTML字符串
   * 它还定义了一个菜单切换按钮，用于在小屏幕上显示和隐藏菜单
   */
  renderMainMenu() {
    // 从配置中获取当前类型的主菜单项
    const { mainMenu } = this.config.header[this.type];
    // 返回包含导航和菜单项的HTML字符串
    return `
      <nav class="dc-header-nav">
        <button class="header-menu-toggle" aria-label="Toggle menu">
          <svg class="icon icon_menu" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="menu-line menu-line-1" d="M7.94977 11.9498H39.9498" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
            <path class="menu-line menu-line-2" d="M7.94977 23.9498H39.9498" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
            <path class="menu-line menu-line-3" d="M7.94977 35.9498H39.9498" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
          </svg>
        </button>
        <ul class="dc-header-menu">
          ${mainMenu.map(item => this.renderMenuItem(item)).join('')}
        </ul>
      </nav>
    `;
  }

  /**
   * 渲染菜单项
   *
   * 此函数根据菜单项是否有子菜单来决定渲染的HTML结构
   * 如果菜单项有子菜单，则会递归调用renderSubmenu方法来渲染子菜单
   *
   * @param {Object} item 菜单项的数据对象，包含id、link、text和submenu等属性
   * @return {String} 返回渲染后的菜单项HTML字符串
   */
  renderMenuItem(item) {
    // 判断菜单项是否有子菜单
    if (item.hasSubmenu) {
      // 如果有子菜单，渲染带有子菜单的菜单项
      return `
        <li class="dc-menu-item has-submenu" data-menu-id="${item.id}">
          <a href="${item.link}" class="dc-menu-link">
            ${item.text}
            <svg class="icon icon_chevron_down" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="chevron-line" d="M36 18L24 30L12 18" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
            </svg>
          </a>
          ${this.renderSubmenu(item.submenu)}
        </li>
      `;
    }
    // 如果没有子菜单，渲染普通的菜单项
    return `
      <li class="dc-menu-item">
        <a href="${item.link}" class="dc-menu-link">${item.text}</a>
      </li>
    `;
  }

  /**
   * 渲染子菜单
   *
   * 此函数负责将给定的子菜单数据转换为HTML字符串，用于在页面上显示子菜单
   * 它遍历子菜单数组，为每个子菜单项生成相应的HTML代码，包括链接、标题和描述
   *
   * @param {Array} submenu 子菜单数组，每个子菜单项包含link（链接）、text（标题）和description（描述）属性
   * @returns {String} 返回渲染后的子菜单HTML字符串
   */
  renderSubmenu(submenu) {
    // 使用模板字符串构建子菜单的HTML，内部包含子菜单项的映射
    return `
      <div class="dc-submenu">
        <div class="dc-submenu-content">
          ${submenu.map(item => `
            <a href="${item.link}" class="dc-submenu-item">
              <div class="dc-submenu-title">${item.text}</div>
              ${item.description ? `<div class="dc-submenu-desc">${item.description}</div>` : ''}
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * 渲染用户区域组件
   *
   * 此函数负责根据配置信息渲染页面头部的用户区域包括搜索功能和用户菜单或认证按钮
   * 它通过判断用户是否已登录来决定渲染用户菜单还是认证按钮体现了组件的动态性
   */
  renderUserArea() {
    // 从配置中解构出用户区域的配置信息
    const { userArea } = this.config.header;
    // 返回用户区域的HTML字符串
    // 包含搜索功能和根据用户登录状态动态渲染的用户菜单或认证按钮
    return `
      <div class="dc-header-user">
        ${this.renderSearch(userArea.search)}
        ${this.isLoggedIn ? this.renderUserMenu(userArea.userMenu) : this.renderAuth(userArea.auth)}
      </div>
    `;
  }

  /**
   * 渲染搜索组件
   *
   * @param {Object} search - 搜索组件的配置对象
   * @param {string} search.placeholder - 搜索输入框的占位符文本
   * @returns {string} 返回搜索组件的HTML字符串
   */
  renderSearch(search) {
    // 使用模板字符串构建搜索组件的HTML结构
    return `
      <div class="dc-search">
        <button class="dc-search-btn" aria-label="Search">
          <svg class="icon icon_search" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M33.2216 33.2217L41.7069 41.707" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
        </button>
        <div class="dc-search-panel">
          <div class="search-form">
            <div class="search-input-wrap">
              <svg class="icon icon_search" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M33.2216 33.2217L41.7069 41.707" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
              <input type="text" placeholder="${search.placeholder}" class="search-input">
            </div>
            <button type="button" class="search-btn-close">
              <svg class="icon icon_close" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8L40 40" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M8 40L40 8" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 渲染认证按钮
   *
   * 此函数根据传入的认证信息生成登录和注册按钮的HTML字符串
   * 它通过模板字符串插入登录和注册的链接以及文本，确保页面上的按钮与认证信息保持一致
   *
   * @param {Object} auth - 认证信息对象，包含登录和注册的链接和文本
   * @returns {String} 返回包含登录和注册按钮的HTML字符串
   */
  renderAuth(auth) {
    return `
      <div class="dc-auth">
        <a href="${auth.login.link}" class="dc-btn dc-btn-text">${auth.login.text}</a>
        <a href="${auth.register.link}" class="dc-btn dc-btn-primary">${auth.register.text}</a>
      </div>
    `;
  }

  /**
   * 渲染用户菜单
   *
   * 此函数负责生成用户菜单的HTML字符串，包括用户头像和下拉菜单项
   * 它使用了模板字符串来构建HTML，并利用数组的map方法来迭代用户菜单项
   *
   * @param {Array} userMenu - 用户菜单项数组，每个菜单项包含link、icon和text属性
   * @returns {String} 返回包含用户菜单的HTML字符串
   */
  renderUserMenu(userMenu) {
    return `
      <div class="dc-user">
        <button class="dc-user-avatar" aria-label="User Menu">
          <img src="${this.userInfo?.avatar || '/assets/images/default-avatar.png'}" alt="User Avatar">
        </button>
        <div class="dc-user-dropdown">
          <div class="dc-user-avatar-info">
            <div class="dc-user-name">
              <span class="dc-user-name-text">${this.userInfo?.name.text || '用户名'}</span>
              <span class="dc-user-name-num">${this.userInfo?.name.num || 'xxx'}</span>
            </div>
            <div class="dc-user-level">
              <span class="dc-user-level-text">${this.userInfo?.level.text || '等级'}</span>
              <span class="dc-user-level-num">${this.userInfo?.level.num || '0'}</span>
            </div>
            <div class="dc-user-coins">
              <span class="dc-user-coins-text">${this.userInfo?.coin.text || '硬币'}</span>
              <span class="dc-user-coins-num">${this.userInfo?.coin.num || '0'}</span>
            </div>
          </div>
          <div class="dc-user-menu">
            ${userMenu.map(item => `
              <a href="${item.link}" class="dc-user-menu-item">
                ${item.icon}
                <span class="dc-user-item-text">${item.text}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 绑定事件
   *
   * 此函数负责为页面上的元素绑定事件处理程序
   * 它根据当前类型选择对应的header元素，并为其中的元素添加事件监听器
   */
  bindEvents() {
    // 选择对应的header元素
    const header = document.querySelector(`.${this.type}-header`);
    // 如果没有找到对应的header元素，则不执行后续操作
    if (!header) return;

    // 搜索面板
    const searchBtn = header.querySelector('.dc-search-btn');
    const searchPanel = header.querySelector('.dc-search-panel');
    const searchBtnClose = header.querySelector('.search-btn-close');
    const searchInput = header.querySelector('.search-input');
    const searchButton = header.querySelector('.search-input-wrap .icon_search');

    // 如果搜索按钮、搜索面板和关闭按钮都存在，则添加相应的事件监听器
    if (searchBtn && searchPanel && searchBtnClose) {
      // 点击搜索按钮时，显示搜索面板
      searchBtn.addEventListener('click', () => {
        searchPanel.classList.add('active');
        // 聚焦输入框
        if (searchInput) {
          searchInput.focus();
        }
      });

      // 点击关闭按钮时，隐藏搜索面板
      searchBtnClose.addEventListener('click', () => {
        searchPanel.classList.remove('active');
      });
    }

    // 搜索功能
    if (searchInput && searchButton) {
      // 执行搜索的函数
      const performSearch = () => {
        const searchTerm = searchInput.value.trim();
        // 如果输入框中有内容，则进行搜索
        if (searchTerm) {
          // 这里可以根据实际需求修改搜索URL
          const searchUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
          window.location.href = searchUrl;
        }
      };

      // 搜索按钮点击事件
      searchButton.addEventListener('click', performSearch);

      // 输入框回车事件
      searchInput.addEventListener('keypress', (e) => {
        // 当按下回车键时，执行搜索
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch();
        }
      });
    }

    // 移动端菜单切换
    const menuToggle = header.querySelector('.header-menu-toggle');
    const menu = header.querySelector('.dc-header-menu');
    const menuItems = header.querySelectorAll('.dc-menu-item.has-submenu');

    // 如果菜单切换按钮和菜单本身都存在，则添加相应的事件监听器
    if (menuToggle && menu) {
      // 调整SVG路径长度的函数
      const updateMenuLines = (isActive) => {
        const lines = menuToggle.querySelectorAll('.menu-line');
        lines.forEach((line, index) => {
          if (isActive) {
            // 激活状态：交叉线条
            if (index === 0) {
              line.setAttribute('d', 'M8 8L40 40');
            } else if (index === 1) {
              line.setAttribute('d', '');  // 中间线消失
            } else if (index === 2) {
              line.setAttribute('d', 'M8 40L40 8');
            }
          } else {
            // 默认状态：三条横线
            const y = index === 0 ? 11.9498 : (index === 1 ? 23.9498 : 35.9498);
            line.setAttribute('d', `M7.94977 ${y}H39.9498`);
          }
        });
      };

      // 点击菜单切换按钮时，显示或隐藏菜单
      menuToggle.addEventListener('click', () => {
        const isActive = !menuToggle.classList.contains('active');
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
        updateMenuLines(isActive);
      });

      // 点击外部时恢复原始长度
      document.addEventListener('click', (e) => {
        const isClickInside = header.contains(e.target);
        if (!isClickInside && menu.classList.contains('active')) {
          menu.classList.remove('active');
          menuToggle.classList.remove('active');
          updateMenuLines(false);
        }
      });

      // 子菜单切换
      menuItems.forEach(item => {
        const link = item.querySelector('.dc-menu-link');
        const submenu = item.querySelector('.dc-submenu');
        const chevron = item.querySelector('.icon_chevron_down .chevron-line');

        if (link && submenu && chevron) {
          const updateChevron = (isActive) => {
            if (isActive) {
              chevron.setAttribute('d', 'M36 30L24 18L12 30');
            } else {
              chevron.setAttribute('d', 'M36 18L24 30L12 18');
            }
          };

          // 点击菜单项时，显示或隐藏子菜单
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = !submenu.classList.contains('active');
            submenu.classList.toggle('active');
            updateChevron(isActive);
          });
        }
      });
    }

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
      const isClickInside = header.contains(e.target);
      if (!isClickInside && menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });

    // 用户头像点击事件
    const userAvatar = header.querySelector('.dc-user-avatar');
    const userDropdown = header.querySelector('.dc-user-dropdown');

    if (userAvatar && userDropdown) {
      // 点击用户头像时，切换下拉菜单的active类
      userAvatar.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡，防止点击外部时立即关闭
        userDropdown.classList.toggle('active');
      });

      // 点击外部关闭下拉菜单
      document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target) && userDropdown.classList.contains('active')) {
          userDropdown.classList.remove('active');
        }
      });
    }
  }

  /**
   * 静态方法，用于快速创建实例
   *
   * 该方法是一个静态方法，允许在不实例化类的情况下直接调用
   * 它的主要作用是提供一个便捷的方式来创建类的实例，通过传递一个配置对象来定制实例的创建过程
   *
   * @param {Object} options - 一个包含配置信息的对象，默认为空对象
   * 这里接受一个options参数，使得用户可以在创建实例时传递自定义的配置信息
   *
   * @returns {DCHeader} 返回一个DCHeader类的实例
   * 该方法返回一个新的DCHeader实例，该实例根据传入的options配置信息创建
   */
  static create(options = {}) {
    return new DCHeader(options);
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCHeader;
} else {
  window.DC = window.DC || {};
  window.DC.Header = DCHeader;
}
