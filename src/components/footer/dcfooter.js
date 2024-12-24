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
    this.container.className = containerId;
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

  async init() {
    try {
      await this.loadConfig();
      this.createElements();
      this.bindEvents();
      this.setTheme(this.defaultTheme, true);
      this.setLanguage(this.defaultLang, true);
    } catch (error) {
      console.error('Error initializing footer:', error);
      throw error;
    }
  }

  async loadConfig() {
    try {
      if (window.DC && window.DC.config) {
        this.config = window.DC.config;
      } else {
        const response = await fetch('./dcsites.json');
        if (!response.ok) {
          throw new Error('Failed to load config');
        }
        this.config = await response.json();
        window.DC = window.DC || {};
        window.DC.config = this.config;
      }
    } catch (error) {
      console.error('Error loading config:', error);
      throw error;
    }
  }

  /**
   * 创建DOM元素
   * @private
   */
  createElements() {
    const { languages, themes } = this.config;

    if (!languages?.length || !themes?.length) {
      console.error('Invalid configuration:', this.config);
      throw new Error('Invalid configuration data');
    }

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

    console.log('Elements created');
  }

  /**
   * 渲染语言选择器
   * @private
   * @returns {string} HTML字符串
   */
  renderLanguageSelector() {
    const languages = this.config.languages || [];
    const defaultLang = languages.find(l => l.langCode === this.defaultLang);

    if (!defaultLang) {
      console.error('Default language not found:', this.defaultLang);
      return '';
    }

    console.log('Rendering language selector with:', { languages, defaultLang });

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
    const config = this.config.footer;

    switch (this.type) {
      case 'official':
        return this.renderOfficialColumns(config.official);
      case 'gaming':
        return this.renderGamingColumns(config.gaming);
      case 'lib':
        return this.renderLibColumns(config.lib);
      case 'shop':
        return this.renderShopColumns(config.shop);
      case 'product':
        return this.renderProductColumns(config.product);
      default:
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
    const activeDropdowns = this.container.querySelectorAll('.dc-dropdown.active');
    activeDropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
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
    const themes = this.config.themes || [];
    const defaultTheme = themes.find(t => t.name === this.defaultTheme);

    if (!defaultTheme) {
      console.error('Default theme not found:', this.defaultTheme);
      return '';
    }

    console.log('Rendering theme selector with:', { themes, defaultTheme });

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
window.DC = window.DC || {};
window.DC.Footer = DCFooter;