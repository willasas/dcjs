class DCHeader {
  constructor(options = {}) {
    this.selector = options.selector;
    this.type = options.type || 'official';
    this.isLoggedIn = options.isLoggedIn || false;
    this.userInfo = options.userInfo || null;
    this.config = null;
    
    this.init();
  }

  async init() {
    try {
      await this.loadConfig();
      this.createContainer();
      this.render();
      this.bindEvents();
    } catch (error) {
      console.error('Error initializing header:', error);
    }
  }

  createContainer() {
    // 如果用户指定了选择器，检查是否存在
    if (this.selector) {
      const container = document.querySelector(this.selector);
      if (!container) {
        // 如果容器不存在，创建一个新的
        const newContainer = document.createElement('div');
        // 从选择器中提取 ID 或类名
        if (this.selector.startsWith('#')) {
          newContainer.id = this.selector.substring(1);
        } else if (this.selector.startsWith('.')) {
          newContainer.className = this.selector.substring(1);
        }
        const firstChild = document.body.firstChild;
        document.body.insertBefore(newContainer, firstChild);
      }
    } else {
      // 如果没有指定选择器，创建默认容器
      const container = document.createElement('div');
      container.id = 'dc-header';
      const firstChild = document.body.firstChild;
      document.body.insertBefore(container, firstChild);
      this.selector = '#dc-header';
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

  render() {
    const container = document.querySelector(this.selector);
    if (!container) {
      console.error(`Container ${this.selector} not found`);
      return;
    }

    container.innerHTML = `
      <header class="dc-header ${this.type}">
        ${this.renderLogo()}
        ${this.renderMainMenu()}
        ${this.renderUserArea()}
      </header>
    `;
  }

  renderLogo() {
    const { logo } = this.config.header[this.type];
    return `
      <div class="dc-header-logo">
        <a href="${logo.link}">
          <img src="${logo.src}" alt="${logo.alt}">
        </a>
      </div>
    `;
  }

  renderMainMenu() {
    const { mainMenu } = this.config.header[this.type];
    return `
      <nav class="dc-header-nav">
        <ul class="dc-header-menu">
          ${mainMenu.map(item => this.renderMenuItem(item)).join('')}
        </ul>
        <button class="header-menu-toggle" aria-label="Toggle Menu">
          <span class="menu-icon">
            <span class="navicon"></span>
          </span>
        </button>
      </nav>
    `;
  }

  renderMenuItem(item) {
    if (item.hasSubmenu) {
      return `
        <li class="dc-menu-item has-submenu" data-menu-id="${item.id}">
          <a href="${item.link}" class="dc-menu-link">
            ${item.text}
            <i class="bx bx-chevron-down"></i>
          </a>
          ${this.renderSubmenu(item.submenu)}
        </li>
      `;
    }
    return `
      <li class="dc-menu-item">
        <a href="${item.link}" class="dc-menu-link">${item.text}</a>
      </li>
    `;
  }

  renderSubmenu(submenu) {
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

  renderUserArea() {
    const { userArea } = this.config.header;
    return `
      <div class="dc-header-user">
        ${this.renderSearch(userArea.search)}
        ${this.isLoggedIn ? this.renderUserMenu(userArea.userMenu) : this.renderAuth(userArea.auth)}
      </div>
    `;
  }

  renderSearch(search) {
    return `
      <div class="dc-search">
        <button class="dc-search-btn" aria-label="Search">
          <i class="bx bx-search"></i>
        </button>
        <div class="dc-search-panel">
          <div class="search-form">
            <div class="search-input-wrap">
              <i class="bx bx-search"></i>
              <input type="text" placeholder="${search.placeholder}" class="search-input">
            </div>
            <button type="button" class="search-btn-close">
              <i class="bx bx-x"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderAuth(auth) {
    return `
      <div class="dc-auth">
        <a href="${auth.login.link}" class="dc-btn dc-btn-text">${auth.login.text}</a>
        <a href="${auth.register.link}" class="dc-btn dc-btn-primary">${auth.register.text}</a>
      </div>
    `;
  }

  renderUserMenu(userMenu) {
    return `
      <div class="dc-user">
        <button class="dc-user-avatar" aria-label="User Menu">
          <img src="${this.userInfo?.avatar || '/assets/images/default-avatar.png'}" alt="User Avatar">
        </button>
        <div class="dc-user-dropdown">
          ${userMenu.map(item => `
            <a href="${item.link}" class="dc-user-menu-item">
              <i class="bx bx-${item.icon}"></i>
              <span>${item.text}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    const header = document.querySelector(this.selector)?.querySelector('.dc-header');
    if (!header) return;

    // 搜索面板
    const searchBtn = header.querySelector('.dc-search-btn');
    const searchPanel = header.querySelector('.dc-search-panel');
    const searchClose = header.querySelector('.search-btn-close');

    searchBtn?.addEventListener('click', () => {
      searchPanel?.classList.add('active');
      searchPanel?.querySelector('input')?.focus();
    });

    searchClose?.addEventListener('click', () => {
      searchPanel?.classList.remove('active');
    });

    // 移动端菜单切换
    const menuToggle = header.querySelector('.header-menu-toggle');
    const nav = header.querySelector('.dc-header-nav');

    menuToggle?.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav?.classList.toggle('active');
    });

    // 子菜单交互
    const menuItems = header.querySelectorAll('.dc-menu-item.has-submenu');
    menuItems.forEach(item => {
      const link = item.querySelector('.dc-menu-link');

      if (window.innerWidth > 768) {
        // 桌面端使用hover
        item.addEventListener('mouseenter', () => {
          item.classList.add('active');
        });
        item.addEventListener('mouseleave', () => {
          item.classList.remove('active');
        });
      } else {
        // 移动端使用点击
        link?.addEventListener('click', (e) => {
          e.preventDefault();
          // 关闭其他打开的子菜单
          menuItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          item.classList.toggle('active');
        });
      }
    });

    // 用户菜单交互
    const userAvatar = header.querySelector('.dc-user-avatar');
    const userDropdown = header.querySelector('.dc-user-dropdown');

    userAvatar?.addEventListener('click', () => {
      userDropdown?.classList.toggle('active');
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        // 关闭所有激活的菜单
        header.querySelectorAll('.active').forEach(el => {
          if (!el.classList.contains('dc-header')) {
            el.classList.remove('active');
          }
        });
      }
    });

    // 窗口大小变化时处理
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        // 重置移动端菜单状态
        menuToggle?.classList.remove('active');
        nav?.classList.remove('active');
        // 重置子菜单状态
        menuItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    });

    // 滚动效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 添加滚动样式
      if (scrollTop > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // 向下滚动隐藏，向上滚动显示
      if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // 静态方法，用于快速创建实例
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
