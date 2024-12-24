class DCHeader {
  constructor(options = {}) {
    const { type = 'official', selector } = options;
    this.type = type;
    this.selector = selector;
    this.isLoggedIn = options.isLoggedIn || false;
    this.userInfo = options.userInfo || null;
    this.config = null;

    this.init();
  }

  async init() {
    try {
      await this.loadConfig();
      this.render();
      this.bindEvents();
    } catch (error) {
      console.error('Error initializing header:', error);
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

    return headerElement;
  }

  renderLogo() {
    const { logo } = this.config.header[this.type];
    return `
      <div class="dc-header-logo">
        <a class="dc-header-logo-link" href="${logo.link}">
          <img src="${logo.src}" alt="${logo.alt}">
        </a>
      </div>
    `;
  }

  renderMainMenu() {
    const { mainMenu } = this.config.header[this.type];
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

  renderMenuItem(item) {
    if (item.hasSubmenu) {
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
    const header = document.querySelector(`.${this.type}-header`);
    if (!header) return;

    // 搜索面板
    const searchBtn = header.querySelector('.dc-search-btn');
    const searchPanel = header.querySelector('.dc-search-panel');
    const searchBtnClose = header.querySelector('.search-btn-close');
    const searchInput = header.querySelector('.search-input');
    const searchButton = header.querySelector('.search-input-wrap .icon_search');

    if (searchBtn && searchPanel && searchBtnClose) {
      searchBtn.addEventListener('click', () => {
        searchPanel.classList.add('active');
        // 聚焦输入框
        if (searchInput) {
          searchInput.focus();
        }
      });

      searchBtnClose.addEventListener('click', () => {
        searchPanel.classList.remove('active');
      });
    }

    // 搜索功能
    if (searchInput && searchButton) {
      // 执行搜索的函数
      const performSearch = () => {
        const searchTerm = searchInput.value.trim();
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

      // 移动端子菜单切换
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
