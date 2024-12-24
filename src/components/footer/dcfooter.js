/**
 * 页脚基类
 */
class DCFooter {
  /**
   * 创建页脚实例
   * @param {Object} options - 配置选项
   * @param {string} options.container - 容器选择器或容器ID(不含#)
   * @param {string} options.defaultTheme - 默认主题
   * @param {string} options.defaultLang - 默认语言
   * @param {Function} options.onThemeChange - 主题切换回调
   * @param {Function} options.onLangChange - 语言切换回调
   * @param {string} options.type - 页脚类型 ('official'|'gaming'|'lib'|'shop'|'product')
   */
  constructor(options = {}) {
    // 处理容器
    const containerId = options.container?.startsWith('#') ?
      options.container.slice(1) : options.container || `dc-footer-${Date.now()}`;

    // 创建容器元素
    this.container = document.createElement('footer');
    this.container.id = containerId;
    this.container.classList.add(containerId, 'dc-footer');
    // 插入到body结束标签前
    document.body.appendChild(this.container);

    // 保存配置
    this.defaultTheme = options.defaultTheme || 'light-theme';
    this.defaultLang = options.defaultLang || 'zh-CN';
    this.onThemeChange = options.onThemeChange;
    this.onLangChange = options.onLangChange;
    this.type = options.type || 'official';

    // 当前状态
    this.currentTheme = null;
    this.currentLang = null;
    this.config = null;

    // 初始化组件
    this.init();
    console.log('Footer initialized with:', {
      containerId,
      defaultTheme: this.defaultTheme,
      defaultLang: this.defaultLang,
      type: this.type
    });
  }

  /**
   * 异步初始化方法
   *
   * 该方法用于初始化脚注组件它包括加载配置、创建样式和元素、绑定事件以及设置主题和语言
   * 使用async/await语法确保所有异步操作在继续执行后续代码之前完成
   *
   * @throws {Error} 如果初始化过程中出现错误，将抛出错误
   */
  async init() {
    try {
      // 等待加载配置完成loadConfig是一个异步方法
      await this.loadConfig();

      // 创建脚注组件的样式
      this.createStyle();

      // 创建脚注组件所需的元素
      this.createElements();

      // 绑定必要的事件处理函数
      this.bindEvents();

      // 设置默认主题true表示强制应用该主题，即使已有主题存在
      this.setTheme(this.defaultTheme, true);

      // 设置默认语言true表示强制应用该语言，即使已有语言设置存在
      this.setLanguage(this.defaultLang, true);
    } catch (error) {
      // 捕获初始化过程中可能发生的错误
      console.error('Error initializing footer:', error);
      throw error;
    }
  }

  /**
   * 异步加载配置方法
   * 此方法首先检查全局变量DC中是否存在config配置，如果存在，则直接使用该配置
   * 如果不存在，则尝试从服务器加载配置文件dcsites.json，并将其内容设置为配置
   * 在加载配置过程中，如果fetch操作失败或响应状态不是成功状态，则抛出错误
   */
  async loadConfig() {
    try {
      // 检查全局变量DC中是否存在config配置
      if (window.DC && window.DC.config) {
        this.config = window.DC.config;
      } else {
        // 从服务器加载配置文件
        const response = await fetch('./dcsites.json');
        // 检查响应状态
        if (!response.ok) {
          throw new Error('Failed to load config');
        }
        // 解析响应内容为JSON格式并设置为配置
        this.config = await response.json();
        // 在全局变量DC中设置config配置
        window.DC = window.DC || {};
        window.DC.config = this.config;
      }
    } catch (error) {
      // 捕获并处理加载配置过程中发生的错误
      console.error('Error loading config:', error);
      throw error;
    }
  }

  /**
   * 创建样式
   *
   * 该方法用于创建脚注组件的样式，包括设置背景色、字体颜色、字体大小、字体样式等
   * 这些样式通过CSS变量的方式定义，以便在主题切换时动态修改
   *
   * @throws {Error} 如果创建样式过程中出现错误，将抛出错误
   */
  createStyle() {
    const cssRules = `
      .dc-footer { position: relative; width: 100%; height: auto; display: flex; justify-content: center; align-items: center; }
      .dc-footer .common-footer { position: relative; width: 100%; background-color: var(--bg-theme-50); color: var(--bg-theme-800); padding: 40px 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
      .dc-footer .common-footer .footer-normal { min-width: 1200px; margin: 0 auto; box-sizing: border-box; padding: 0 120px; }
      .dc-footer .common-footer .footer-group { display: flex; justify-content: space-between; padding-bottom: 30px; border-bottom: 1px solid var(--font-theme-900); }
      .dc-footer .common-footer .footer-group .social, .dc-footer .common-footer .footer-group .themes, .dc-footer .common-footer .footer-group .languages { flex: 1; margin-right: 20px; display: flex; justify-content: flex-start; align-items: center; }
      .dc-footer .common-footer .footer-group .social:last-child, .dc-footer .common-footer .footer-group .themes:last-child, .dc-footer .common-footer .footer-group .languages:last-child { margin-right: 0; }
      .dc-footer .common-footer .footer-group .themes { justify-content: center; }
      .dc-footer .common-footer .footer-group .languages { justify-content: flex-end; }
      .dc-footer .common-footer .footer-label { font-size: 22px; font-weight: bold; text-align: left; line-height: 1.2; color: var(--font-theme-950); margin-right: 18px; margin-bottom: 0; }
      .dc-footer .common-footer .social-inner { list-style: none; padding: 0; margin: 0; display: flex; justify-content: flex-start; align-items: center; }
      .dc-footer .common-footer .social-inner .social-item { position: relative; width: 56px; height: 56px; }
      .dc-footer .common-footer .social-inner .social-item:not(:last-child) { margin-right: 12px; }
      .dc-footer .common-footer .social-inner .social-item:last-child { display: none; margin-right: 0; }
      .dc-footer .common-footer .social-inner .social-item .social-link { position: relative; width: 56px; height: 56px; display: flex; justify-content: center; align-items: center; text-decoration: none; position: relative; background: var(--color-primary-bg); border: 2px solid var(--bg-theme-700); border-radius: 50%; box-sizing: border-box; padding: 12px 12px; box-shadow: -4px -2px 16px 0px var(--bg-theme-50), 4px 2px 16px 0px var(--bg-theme-500); }
      .dc-footer .common-footer .social-inner .social-item .social-link:hover { background: var(--bg-theme-50); box-shadow: -2px -1px 8px 0px var(--bg-theme-50), 2px 1px 8px 0px var(--bg-theme-500); }
      .dc-footer .common-footer .social-inner .social-item .social-link:hover span { display: block; opacity: 1; visibility: visible; top: -30px; }
      .dc-footer .common-footer .social-inner .social-item .social-link .icon { display: block; width: 32px; height: 32px; }
      .dc-footer .common-footer .social-inner .social-item .social-link .icon path { stroke: var(--bg-current); }
      .dc-footer .common-footer .social-inner .social-item .social-link span { display: none; font-size: 14px; line-height: 20px; font-weight: 400; background: var(--bg-theme-500); color: var(--font-theme-50); position: absolute; top: 0px; left: 50%; transform: translateX(-50%); z-index: 99; white-space: nowrap; padding: 2px 8px; border-radius: 4px; box-shadow: var(--bg-theme-300); opacity: 0; pointer-events: none; transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1) 0.2s; transition-property: opacity,transform; }
      .dc-footer .common-footer .dc-dropdown { position: relative; width: 120px; }
      .dc-footer .common-footer .dc-dropdown.lang-dropdown { width: 180px; }
      .dc-footer .common-footer .dc-dropdown .dc-dropdown-trigger { padding: 8px 12px; background-color: var(--bg-theme-600); border: 1px solid var(--bg-theme-300); border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; color: var(--font-theme-50); }
      .dc-footer .common-footer .dc-dropdown .dc-dropdown-trigger::after { content: ''; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid currentColor; margin-left: 10px; transition: transform 0.2s; }
      .dc-footer .common-footer .dc-dropdown .dc-dropdown-trigger span { font-size: 18px; line-height: 1.2; text-align: left; color: var(--font-theme-50); }
      .dc-footer .common-footer .dc-dropdown.active .dc-dropdown-trigger::after { transform: rotate(180deg); }
      .dc-footer .common-footer .dc-dropdown.active .dc-dropdown-menu { display: block; animation: dropdownFadeIn 0.2s ease-out; }
      .dc-footer .common-footer .dc-dropdown .dc-dropdown-menu { display: none; position: absolute; top: 100%; left: 0; width: 100%; background-color: var(--bg-theme-600); border: 1px solid var(--bg-theme-300); border-radius: 4px; margin-top: 4px; max-height: 300px; overflow-y: auto; z-index: 1000; box-shadow: 0 2px 8px var(--bg-theme-900); }
      .dc-footer .common-footer .dc-dropdown .dc-dropdown-menu::-webkit-scrollbar { width: 4px; }
      .dc-footer .common-footer .dc-dropdown .dc-dropdown-menu::-webkit-scrollbar-track { width: 4px; border-radius: 2px; background-color: var(--bg-theme-600); }
      .dc-footer .common-footer .dc-dropdown .dc-dropdown-menu::-webkit-scrollbar-thumb { width: 4px; border-radius: 2px; background-color: var(--bg-theme-50); }
      .dc-footer .common-footer .dc-dropdown .dc-dropdown-item { font-size: 18px; line-height: 1.2; text-align: left; color: var(--font-theme-50); padding: 10px 12px; cursor: pointer; transition: all 0.2s; }
      .dc-footer .common-footer .dc-dropdown .dc-dropdown-item:hover, .dc-footer .common-footer .dc-dropdown .dc-dropdown-item.active { background-color: var(--bg-theme-800); }
      .dc-footer .common-footer .footer-column-lists { display: grid; grid-template-columns: repeat(auto-fill, minmax(236px, 1fr)); gap: 30px; list-style: none; padding-top: 30px; margin: 0 0 30px 0; }
      .dc-footer .common-footer .footer-column-lists .column { position: relative; width: 100%; list-style: none; }
      .dc-footer .common-footer .footer-column-lists .column .footer-label { font-size: 22px; font-weight: bold; text-align: left; line-height: 1.2; color: var(--font-theme-950); margin-right: 0; margin-bottom: 10px; }
      .dc-footer .common-footer .footer-column-lists .column ul { list-style: none; padding: 0; margin: 0; }
      .dc-footer .common-footer .footer-column-lists .column ul li { margin-bottom: 8px; }
      .dc-footer .common-footer .footer-column-lists .column ul li a { text-decoration: none; font-size: 16px; line-height: 1.2; text-align: left; color: var(--font-theme-800); transition: color 0.2s; }
      .dc-footer .common-footer .footer-column-lists .column ul li a:hover { color: var(--font-theme-950); }
      .dc-footer .common-footer .privacy-and-copyright { position: relative; padding-top: 30px; width: 100%; border-top: 1px solid var(--font-theme-900); text-align: center; font-size: 16px; }
      .dc-footer .common-footer .privacy-and-copyright .links-privacy { margin-bottom: 12px; }
      .dc-footer .common-footer .privacy-and-copyright .links-privacy a { text-decoration: none; font-size: 16px; line-height: 1.2; text-align: center; color: var(--font-theme-800); margin: 0 12px; transition: color 0.2s; }
      .dc-footer .common-footer .privacy-and-copyright .links-privacy a:hover { color: var(--font-theme-950); }
      .dc-footer .common-footer .privacy-and-copyright .copyright { font-size: 16px; line-height: 1.2; text-align: center; color: var(--font-theme-950); }
      .dc-footer .common-footer .privacy-and-copyright .copyright span { font-size: 16px; line-height: 1.2; text-align: center; color: var(--font-theme-950); }

      @media screen and (max-width: 1024px) { .common-footer { padding: 30px 0; }
        .common-footer .footer-normal { min-width: 660px; padding: 0 30px; }
        .common-footer .footer-group { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; flex-direction: column; padding-bottom: 30px; border-bottom: 1px solid var(--font-theme-900); }
        .common-footer .footer-group .social, .common-footer .footer-group .themes, .common-footer .footer-group .languages { display: flex; justify-content: center; align-items: center; margin-right: 0; }
        .common-footer .footer-group .social:last-child, .common-footer .footer-group .themes:last-child, .common-footer .footer-group .languages:last-child { margin-right: 0; }
        .common-footer .footer-group .themes { justify-content: center; margin-top: 20px; }
        .common-footer .footer-group .languages { justify-content: center; margin-top: 20px; }
        .common-footer .footer-label { font-size: 20px; margin-right: 12px; }
        .common-footer .social-inner .social-item { position: relative; width: 36px; height: 36px; }
        .common-footer .social-inner .social-item:not(:last-child) { margin-right: 12px; }
        .common-footer .social-inner .social-item:last-child { display: none; margin-right: 0; }
        .common-footer .social-inner .social-item .social-link { position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; text-decoration: none; position: relative; background: var(--color-primary-bg); border: 2px solid var(--bg-theme-700); border-radius: 50%; box-sizing: border-box; padding: 6px 6px; box-shadow: -4px -2px 16px 0px var(--bg-theme-50), 4px 2px 16px 0px var(--bg-theme-500); }
        .common-footer .social-inner .social-item .social-link:hover { background: var(--bg-theme-50); box-shadow: -2px -1px 8px 0px var(--bg-theme-50), 2px 1px 8px 0px var(--bg-theme-500); }
        .common-footer .social-inner .social-item .social-link:hover span { display: block; opacity: 1; }
        .common-footer .social-inner .social-item .social-link .icon { display: block; width: 22px; height: 22px; }
        .common-footer .social-inner .social-item .social-link .icon path { stroke: var(--bg-current); }
        .common-footer .social-inner .social-item .social-link span { display: none; font-size: 14px; line-height: 20px; font-weight: 400; background: var(--bg-theme-500); color: var(--font-theme-50); position: absolute; top: -28px; left: 50%; transform: translateX(-50%); z-index: 99; white-space: nowrap; padding: 2px 8px; border-radius: 4px; box-shadow: var(--bg-theme-300); opacity: 0; pointer-events: none; transition: cubic-bezier(0.19, 1, 0.22, 1) 0.2s; transition-property: opacity,transform; }
        .common-footer .footer-column-lists { width: 100%; gap: 16px; list-style: none; box-sizing: border-box; padding-top: 16px; margin: 0 0 30px 0; }
        .common-footer .footer-column-lists .column { position: relative; width: 100%; list-style: none; }
        .common-footer .footer-column-lists .column .footer-label { font-size: 20px; font-weight: bold; text-align: left; line-height: 1.2; color: var(--font-theme-950); margin-right: 0; margin-bottom: 10px; }
        .common-footer .privacy-and-copyright { position: relative; padding-top: 30px; width: 100%; border-top: 1px solid var(--font-theme-900); text-align: center; font-size: 16px; }
        .common-footer .privacy-and-copyright .links-privacy { margin-bottom: 12px; }
        .common-footer .privacy-and-copyright .links-privacy a { text-decoration: none; font-size: 16px; line-height: 1.2; text-align: center; color: var(--font-theme-800); margin: 0 12px; transition: color 0.2s; }
        .common-footer .privacy-and-copyright .links-privacy a:hover { color: var(--font-theme-950); }
        .common-footer .privacy-and-copyright .copyright { font-size: 16px; line-height: 1.2; text-align: center; color: var(--font-theme-950); }
        .common-footer .privacy-and-copyright .copyright span { font-size: 16px; line-height: 1.2; text-align: center; color: var(--font-theme-950); }
      }

      @keyframes dropdownFadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
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
   * 创建DOM元素
   * @private
   */
  createElements() {
    // 从配置对象中解构获取语言和主题数组
    const { languages, themes } = this.config;

    // 检查语言或主题数组的有效性，如果无效则抛出错误
    if (!languages?.length || !themes?.length) {
      console.error('Invalid configuration:', this.config);
      throw new Error('Invalid configuration data');
    }

    // 使用模板字符串构建HTML字符串并设置为容器的innerHTML
    this.container.innerHTML = `
      <div class="common-footer">
        <div class="footer-normal">
          <div class="footer-group">
            <div class="social">
              <h3 class="footer-label">Social</h3>
              <ul class="social-inner">
                ${this.renderSocialLinks()}
              </ul>
            </div>
            <div class="themes">
              <h3 class="footer-label">Themes</h3>
              <div class="themes-container" id="themes-container">
                ${this.renderThemeSelector()}
              </div>
            </div>
            <div class="languages">
              <h3 class="footer-label">Language</h3>
              <div class="language-container" id="languages-container">
                ${this.renderLanguageSelector()}
              </div>
            </div>
          </div>
          <ul class="footer-column-lists">
            ${this.renderFooterColumns()}
          </ul>
          <div class="privacy-and-copyright">
            <div class="links-privacy">
              <a href="${this.config.termsOfUse.link}" title="${this.config.termsOfUse.CNText}">${this.config.termsOfUse.text}</a>
              <a href="${this.config.privacyPolicy.link}" title="${this.config.privacyPolicy.CNText}">${this.config.privacyPolicy.text}</a>
              <a href="${this.config.cookie.link}" title="${this.config.cookie.CNText}">${this.config.cookie.text}</a>
            </div>
            <div class="copyright">
              <span class="copyright-text" title="${this.config.copyright.CNText}">
                ${this.config.copyright.text.replace('2023', new Date().getFullYear())}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;

    // 日志输出，确认元素已创建
    console.log('Elements created');
  }

  /**
   * 渲染语言选择器
   * @private
   * @returns {string} HTML字符串
   */
  renderLanguageSelector() {
    // 获取配置中的语言列表，如果没有则默认为空数组
    const languages = this.config.languages || [];
    // 查找默认语言
    const defaultLang = languages.find(l => l.langCode === this.defaultLang);
    // 如果没有找到默认语言，输出错误信息并返回空字符串
    if (!defaultLang) {
      console.error('Default language not found:', this.defaultLang);
      return '';
    }

    // 日志输出语言选择器的渲染信息
    console.log('Rendering language selector with:', { languages, defaultLang });

    // 构造语言选择器的HTML字符串
    return `
      <div class="dc-dropdown lang-dropdown">
        <div class="dc-dropdown-trigger">
          <span class="dc-dropdown-text">${defaultLang.langCNName}</span>
        </div>
        <div class="dc-dropdown-menu">
          ${languages.map(lang => `
            <div class="dc-dropdown-item${lang.langCode === this.defaultLang ? ' active' : ''}"
                 data-lang="${lang.langCode}"
                 data-lang-name="${lang.langCNName}"
                 role="button"
                 tabindex="0">
              ${lang.langCNName}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * 渲染页脚栏目
   * @private
   * @returns {string} HTML字符串
   */
  renderFooterColumns() {
    // 获取页脚配置
    const config = this.config.footer;

    // 根据不同的类型渲染对应的页脚栏目
    switch (this.type) {
      case 'official':
        // 渲染官方类型的页脚栏目
        return this.renderOfficialColumns(config.official);
      case 'gaming':
        // 渲染游戏类型的页脚栏目
        return this.renderGamingColumns(config.gaming);
      case 'lib':
        // 渲染资源库类型的页脚栏目
        return this.renderLibColumns(config.lib);
      case 'shop':
        // 渲染商店类型的页脚栏目
        return this.renderShopColumns(config.shop);
      case 'product':
        // 渲染产品类型的页脚栏目
        return this.renderProductColumns(config.product);
      default:
        // 如果类型未知，输出警告并返回空字符串
        console.warn('Unknown footer type:', this.type);
        return '';
    }
  }

  /**
   * 渲染官网页脚栏目
   * @private
   * @param {Object} config 配置数据
   * @returns {string} HTML字符串
   */
  renderOfficialColumns(config) {
    return `
      <li class="column">
        <h3 class="footer-label">Community</h3>
        <ul class="community-inner">
          ${config.Community.map(item => `
            <li class="community-item">
              <a href="${item.link}" class="community-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Game Developers</h3>
        <ul class="game-developers-inner">
          ${config.GameDevelopers.map(item => `
            <li class="game-developers-item">
              <a href="${item.link}" class="game-developers-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Support</h3>
        <ul class="support-inner">
          ${config.Support.map(item => `
            <li class="support-item">
              <a href="${item.link}" class="support-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Company</h3>
        <ul class="company-inner">
          ${config.Company.map(item => `
            <li class="company-item">
              <a href="${item.link}" class="company-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Partner</h3>
        <ul class="partner-inner">
          ${config.Partner.map(item => `
            <li class="partner-item">
              <a href="${item.link}" class="partner-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
    `;
  }

  /**
   * 渲染游戏页脚栏目
   * @private
   * @param {Object} config 配置数据
   * @returns {string} HTML字符串
   */
  renderGamingColumns(config) {
    return `
      <li class="column">
        <h3 class="footer-label">Games</h3>
        <ul class="games-inner">
          ${config.Games.map(item => `
            <li class="games-item">
              <a href="${item.link}" class="games-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Support</h3>
        <ul class="support-inner">
          ${config.Support.map(item => `
            <li class="support-item">
              <a href="${item.link}" class="support-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Company</h3>
        <ul class="company-inner">
          ${config.Company.map(item => `
            <li class="company-item">
              <a href="${item.link}" class="company-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
    `;
  }

  /**
   * 渲染资源站页脚栏目
   * @private
   * @param {Object} config 配置数据
   * @returns {string} HTML字符串
   */
  renderLibColumns(config) {
    return `
      <li class="column">
        <h3 class="footer-label">Resources</h3>
        <ul class="resources-inner">
          ${config.Resources.map(item => `
            <li class="resources-item">
              <a href="${item.link}" class="resources-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Support</h3>
        <ul class="support-inner">
          ${config.Support.map(item => `
            <li class="support-item">
              <a href="${item.link}" class="support-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Company</h3>
        <ul class="company-inner">
          ${config.Company.map(item => `
            <li class="company-item">
              <a href="${item.link}" class="company-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
    `;
  }

  /**
   * 渲染商城页脚栏目
   * @private
   * @param {Object} config 配置数据
   * @returns {string} HTML字符串
   */
  renderShopColumns(config) {
    return `
      <li class="column">
        <h3 class="footer-label">Shop</h3>
        <ul class="shop-inner">
          ${config.Shop.map(item => `
            <li class="shop-item">
              <a href="${item.link}" class="shop-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Support</h3>
        <ul class="support-inner">
          ${config.Support.map(item => `
            <li class="support-item">
              <a href="${item.link}" class="support-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Company</h3>
        <ul class="company-inner">
          ${config.Company.map(item => `
            <li class="company-item">
              <a href="${item.link}" class="company-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
    `;
  }

  /**
   * 渲染产品站页脚栏目
   * @private
   * @param {Object} config 配置数据
   * @returns {string} HTML字符串
   */
  renderProductColumns(config) {
    return `
      <li class="column">
        <h3 class="footer-label">Products</h3>
        <ul class="products-inner">
          ${config.Products.map(item => `
            <li class="products-item">
              <a href="${item.link}" class="products-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Support</h3>
        <ul class="support-inner">
          ${config.Support.map(item => `
            <li class="support-item">
              <a href="${item.link}" class="support-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
      <li class="column">
        <h3 class="footer-label">Company</h3>
        <ul class="company-inner">
          ${config.Company.map(item => `
            <li class="company-item">
              <a href="${item.link}" class="company-link">${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </li>
    `;
  }

  /**
   * 绑定事件
   * @private
   */
  bindEvents() {
    // 移除旧的事件监听器（如果有）
    if (this._handleClick) {
      document.removeEventListener('click', this._handleClick);
    }

    // 创建新的事件处理函数
    this._handleClick = (e) => {
      console.log('Click event:', e.target);

      const target = e.target;
      const dropdown = target.closest('.dc-dropdown');

      // 如果点击的不是下拉菜单相关元素,则关闭所有下拉菜单
      if (!dropdown) {
        this.closeAllDropdowns();
        return;
      }

      // 确定点击的是哪种下拉菜单
      const isLangDropdown = dropdown.classList.contains('lang-dropdown');
      const isThemeDropdown = dropdown.classList.contains('theme-dropdown');

      const trigger = target.closest('.dc-dropdown-trigger');
      const menuItem = target.closest('.dc-dropdown-item');

      console.log('Click targets:', {
        dropdown: dropdown.className,
        trigger: trigger?.className,
        isLangDropdown,
        isThemeDropdown,
        menuItem: menuItem?.className
      });

      // 处理下拉菜单的显示/隐藏
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = dropdown.classList.contains('active');
        this.closeAllDropdowns();
        if (!isActive) {
          dropdown.classList.add('active');
          console.log('Opened dropdown:', dropdown.className);
        }
        return;
      }

      // 处理菜单项选择
      if (menuItem) {
        e.preventDefault();
        e.stopPropagation();

        if (isLangDropdown && menuItem.hasAttribute('data-lang')) {
          const lang = menuItem.dataset.lang;
          const langName = menuItem.dataset.langName;
          console.log('Language item clicked:', { lang, langName });
          this.setLanguage(lang);
        } else if (isThemeDropdown && menuItem.hasAttribute('data-theme')) {
          const theme = menuItem.dataset.theme;
          console.log('Theme item clicked:', theme);
          this.setTheme(theme);
        } else {
          console.log('Unknown menu item clicked:', menuItem);
        }

        this.closeAllDropdowns();
        return;
      }
    };

    // 添加点击事件监听器
    document.addEventListener('click', this._handleClick);

    // 添加键盘事件支持
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        if (target.classList.contains('dc-dropdown-item')) {
          e.preventDefault();
          target.click();
        }
      }
    });

    console.log('Events bound successfully');
  }

  /**
   * 关闭所有下拉菜单
   * @private
   */
  closeAllDropdowns() {
    // 获取当前容器内所有处于激活状态的下拉菜单
    const activeDropdowns = this.container.querySelectorAll('.dc-dropdown.active');

    // 遍历每个激活的下拉菜单并关闭它们
    activeDropdowns.forEach(dropdown => {
      // 移除激活类，以关闭下拉菜单
      dropdown.classList.remove('active');
      // 打印关闭的下拉菜单的类名，用于调试目的
      console.log('Closed dropdown:', dropdown.className);
    });
  }

  /**
   * 设置语言
   * @param {string} lang 语言代码
   * @param {boolean} [isInit=false] 是否是初始化调用
   */
  setLanguage(lang, isInit = false) {
    console.log('setLanguage called:', { lang, isInit });

    if (!lang || (!isInit && this.currentLang === lang)) {
      console.log('Invalid language or no change needed');
      return;
    }

    // 验证语言代码是否有效
    const languages = this.config.languages || [];
    const langData = languages.find(l => l.langCode === lang);

    if (!langData) {
      console.error('Invalid language code:', lang);
      return;
    }

    // 保存旧值以便检查是否真的改变了
    const oldLang = this.currentLang;
    this.currentLang = lang;

    // 更新 HTML lang 属性
    document.documentElement.setAttribute('lang', lang);

    // 更新下拉菜单
    const dropdown = this.container.querySelector('.lang-dropdown');
    if (dropdown) {
      // 更新显示文本
      const text = dropdown.querySelector('.dc-dropdown-text');
      if (text) text.textContent = langData.langCNName;

      // 更新选中状态
      dropdown.querySelectorAll('.dc-dropdown-item[data-lang]').forEach(item => {
        item.classList.toggle('active', item.dataset.lang === lang);
      });
    } else {
      console.error('Language dropdown not found');
      return;
    }

    // 触发回调
    if (!isInit && this.onLangChange && oldLang !== lang) {
      console.log('Calling language change callback with:', lang);
      this.onLangChange(lang);
    }

    console.log('Language set successfully:', {
      from: oldLang,
      to: lang
    });
  }

  /**
   * 渲染社交链接
   * @private
   * @returns {string} HTML字符串
   */
  renderSocialLinks() {
    const socialData = this.config.follow.local;
    return socialData.map(item => `
      <li class="social-item">
        <a href="${item.link}" class="social-link" title="${item.hoverText}">
          ${item.icon}
          <span>${item.text}</span>
        </a>
      </li>
    `).join('');
  }

  /**
   * 渲染主题选择器
   * @private
   * @returns {string} HTML字符串
   */
  renderThemeSelector() {
    // 获取主题配置，如果没有定义，则默认为空数组
    const themes = this.config.themes || [];
    // 查找默认主题
    const defaultTheme = themes.find(t => t.name === this.defaultTheme);

    // 如果没有找到默认主题，则输出错误信息并返回空字符串
    if (!defaultTheme) {
      console.error('Default theme not found:', this.defaultTheme);
      return '';
    }

    // 输出日志信息，包含所有主题和默认主题
    console.log('Rendering theme selector with:', { themes, defaultTheme });

    // 构造并返回主题选择器的HTML字符串
    return `
      <div class="dc-dropdown theme-dropdown">
        <div class="dc-dropdown-trigger">
          <span class="dc-dropdown-text">${defaultTheme.value}</span>
        </div>
        <div class="dc-dropdown-menu">
          ${themes.map(theme => `
            <div class="dc-dropdown-item${theme.name === this.defaultTheme ? ' active' : ''}"
                 data-theme="${theme.name}"
                 data-theme-name="${theme.value}"
                 role="button"
                 tabindex="0">
              ${theme.value}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * 设置主题
   * @param {string} theme 主题名称
   * @param {boolean} [isInit=false] 是否是初始化调用
   */
  setTheme(theme, isInit = false) {
    if (!isInit && this.currentTheme === theme) return;

    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);

    // 更新显示的主题文本
    const themeData = this.config.themes.find(t => t.name === theme);
    if (themeData) {
      const text = this.container.querySelector('.theme-dropdown .dc-dropdown-text');
      if (text) text.textContent = themeData.value;

      // 更新选中状态
      this.container.querySelectorAll('.theme-dropdown [data-theme]').forEach(item => {
        item.classList.toggle('active', item.dataset.theme === theme);
      });
    }

    // 触发回调
    if (!isInit && this.onThemeChange) {
      this.onThemeChange(theme);
    }
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCFooter;
} else {
  window.DC = window.DC || {};
  window.DC.Footer = DCFooter;
}