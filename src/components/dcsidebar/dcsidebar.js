/**
 * 侧边栏组件类
 * 用于实现可折叠的侧边栏菜单
 */
class DCSidebar {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {string} options.container - 容器选择器
   * @param {Array} options.data - 菜单数据
   * @param {Function} options.onClick - 点击菜单项回调
   * @param {Object} options.backTop - 返回顶部配置
   * @param {string} options.backTop.text - 返回顶部文案
   * @param {string} options.backTop.icon - 返回顶部图标
   */
  constructor(options) {
    this.container = document.querySelector(options.container);
    this.data = options.data || [];
    this.onClick = options.onClick;
    this.isExpanded = false;
    this.backTop = options.backTop || {
      text: 'TOP',
      icon: `
        <svg class="icon icon_to_top" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.0083 14.1006V42.0001" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M12 26L24 14L36 26" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M12 6H36" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
      `
    };

    this.init();
  }

  /**
   * 初始化组件
   * @private
   */
  init() {
    const wrapper = document.createElement('div');
    wrapper.className = 'common-sidebar';
    
    // 渲染基础结构
    wrapper.innerHTML = `
      <label class="sidebar-btn" for="sidebar-cb">
        <input class="sidebar-cb" id="sidebar-cb" type="checkbox" />
        <svg class="icon icon_theme" width="100%" height="100%" viewBox="0 0 32 32">
          <path d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" class="line line-top-bottom"></path>
          <path d="M7 16 27 16" class="line"></path>
        </svg>
      </label>
      <div class="sidebar-default">
        <ul class="sidebar-lists"></ul>
        <button class="btn-top">
          <span class="btn-icon">${this.backTop.icon}</span>
          <span class="btn-text">${this.backTop.text}</span>
        </button>
      </div>
    `;

    // 添加样式
    const cssRules = `
      .common-sidebar { width: 64px; height: auto; background: #fff; position: fixed; top: 50%; transform: translateY(-50%); right: 0; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; flex-direction: column-reverse; border-radius: 12px; box-shadow: 0 8px 24px rgba(65, 105, 225, 0.2); }
      .common-sidebar .sidebar-btn { position: relative; display: flex; justify-content: center; align-items: center; right: 0; top: 0; width: 64px; height: 64px; cursor: pointer; border-radius: 8px; }
      .common-sidebar .sidebar-btn:hover { background-color: #383838; }
      .common-sidebar .sidebar-btn:hover .icon_theme .line { stroke: #fff; }
      .common-sidebar .sidebar-btn .sidebar-cb { display: none; }
      .common-sidebar .sidebar-btn .sidebar-cb:checked + .icon_theme { transform: rotate(-45deg); }
      .common-sidebar .sidebar-btn .sidebar-cb:checked + .icon_theme .line-top-bottom { stroke-dasharray: 20 300; stroke-dashoffset: -32.42; }
      .common-sidebar .sidebar-btn .sidebar-cb:checked ~ .sidebar-default { display: block; }
      .common-sidebar .sidebar-btn .icon_theme { height: 36px; transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1); }
      .common-sidebar .sidebar-btn .icon_theme .line { fill: none; stroke: #000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 3; transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1); }
      .common-sidebar .sidebar-btn .icon_theme .line-top-bottom { stroke-dasharray: 12 63; }
      .common-sidebar .sidebar-default { display: none; opacity: 0; overflow: hidden; margin: 0 auto; width: 100%; height: auto; }
      .common-sidebar .sidebar-default.show { display: block; animation: fadeIn 0.3s ease forwards; }
      .common-sidebar .sidebar-default.hide { animation: fadeOut 0.3s ease forwards; }
      .common-sidebar .sidebar-default .sidebar-lists { padding: 0; margin: 0; list-style: none; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; flex-direction: column; }
      .common-sidebar .sidebar-default .sidebar-lists .sidebar-item { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; flex-direction: column; cursor: pointer; width: 100%; border-radius: 8px; box-sizing: border-box; padding: 6px 0; }
      .common-sidebar .sidebar-default .sidebar-lists .sidebar-item:not(:first-child) { margin-top: 10px; }
      .common-sidebar .sidebar-default .sidebar-lists .sidebar-item:hover, .common-sidebar .sidebar-default .sidebar-lists .sidebar-item:focus, .common-sidebar .sidebar-default .sidebar-lists .sidebar-item.active { background-color: #383838; }
      .common-sidebar .sidebar-default .sidebar-lists .sidebar-item:hover .item-icon svg path, .common-sidebar .sidebar-default .sidebar-lists .sidebar-item:focus .item-icon svg path, .common-sidebar .sidebar-default .sidebar-lists .sidebar-item.active .item-icon svg path { stroke: #fff; }
      .common-sidebar .sidebar-default .sidebar-lists .sidebar-item:hover .item-link, .common-sidebar .sidebar-default .sidebar-lists .sidebar-item:focus .item-link, .common-sidebar .sidebar-default .sidebar-lists .sidebar-item.active .item-link { color: #fff; }
      .common-sidebar .sidebar-default .sidebar-lists .sidebar-item .item-icon { display: flex; justify-content: center; align-items: center; width: 100%; height: auto; }
      .common-sidebar .sidebar-default .sidebar-lists .sidebar-item .item-icon svg { width: 24px; height: 24px; }
      .common-sidebar .sidebar-default .sidebar-lists .sidebar-item .item-link { margin: 8px 0 0 0; display: block; font-size: 16px; line-height: 1.2; text-align: center; color: #000; text-decoration: none; }
      .common-sidebar .sidebar-default .btn-top { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; flex-direction: column; width: 100%; height: 64px; background: transparent; color: #000; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px; }
      .common-sidebar .sidebar-default .btn-top:hover, .common-sidebar .sidebar-default .btn-top:focus { background: #383838; }
      .common-sidebar .sidebar-default .btn-top:hover .btn-icon svg path, .common-sidebar .sidebar-default .btn-top:focus .btn-icon svg path { stroke: #fff; }
      .common-sidebar .sidebar-default .btn-top:hover .btn-text, .common-sidebar .sidebar-default .btn-top:focus .btn-text { color: #fff; }
      .common-sidebar .sidebar-default .btn-top .btn-icon { display: flex; justify-content: center; align-items: center; width: 24px; height: 24px; margin: 0 auto; }
      .common-sidebar .sidebar-default .btn-top .btn-text { font-size: 16px; line-height: 1.2; text-align: center; color: #000; }

      @keyframes fadeIn { from { opacity: 0; }
        to { opacity: 1; } }

      @keyframes fadeOut { from { opacity: 1; }
        to { opacity: 0; } }

      @media screen and (max-width: 1024px) { .common-sidebar { width: 42px; border-radius: 6px; }
        .common-sidebar .sidebar-btn { width: 42px; height: 42px; border-radius: 6px; }
        .common-sidebar .sidebar-default .sidebar-lists .sidebar-item { border-radius: 6px; padding: 2px 0; }
        .common-sidebar .sidebar-default .sidebar-lists .sidebar-item:not(:first-child) { margin-top: 4px; }
        .common-sidebar .sidebar-default .sidebar-lists .sidebar-item .item-icon svg { width: 20px; height: 20px; }
        .common-sidebar .sidebar-default .sidebar-lists .sidebar-item .item-link { margin: 4px 0 0 0; font-size: 14px; }
        .common-sidebar .sidebar-default .btn-top { height: 42px; border-radius: 6px; margin-top: 4px; }
        .common-sidebar .sidebar-default .btn-top .btn-icon { width: 20px; height: 20px; }
        .common-sidebar .sidebar-default .btn-top .btn-text { font-size: 14px; } 
      }
    `;
    const addStyle = eleStyleInit => {
      const fa = document.querySelector('title')
      const eleStyle = document.createElement('style')
      eleStyle.innerHTML = eleStyleInit
      document.head.insertBefore(eleStyle, fa)
    }
    addStyle(cssRules)

    this.container.appendChild(wrapper);
    
    // 绑定事件
    this.bindEvents();
    
    // 渲染菜单数据
    this.renderMenus();
  }

  /**
   * 绑定事件
   * @private 
   */
  bindEvents() {
    // 展开/收起
    const checkbox = this.container.querySelector('#sidebar-cb');
    checkbox.addEventListener('change', (e) => {
      this.isExpanded = e.target.checked;
      const sidebarDefault = this.container.querySelector('.sidebar-default');
      
      if (this.isExpanded) {
        // 显示菜单
        sidebarDefault.classList.remove('hide');
        sidebarDefault.classList.add('show');
      } else {
        // 隐藏菜单
        sidebarDefault.classList.remove('show');
        sidebarDefault.classList.add('hide');
        // 动画结束后隐藏元素
        sidebarDefault.addEventListener('animationend', () => {
          if (!this.isExpanded) {
            sidebarDefault.classList.remove('hide');
            sidebarDefault.style.display = 'none';
          }
        }, { once: true });
      }
    });

    // 返回顶部
    const btnTop = this.container.querySelector('.btn-top');
    btnTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // 菜单点击
    const menuList = this.container.querySelector('.sidebar-lists');
    menuList.addEventListener('click', (e) => {
      const item = e.target.closest('.sidebar-item');
      if (item) {
        const index = item.dataset.index;
        this.onClick?.(this.data[index], index);
      }
    });

    // 监听滚动事件，控制返回顶部按钮显示
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const btnTop = this.container.querySelector('.btn-top');
      if (scrollTop > 200) {
        btnTop.style.display = 'flex';
      } else {
        btnTop.style.display = 'none';
      }
    });
  }

  /**
   * 渲染菜单列表
   * @private
   */
  renderMenus() {
    const menuList = this.container.querySelector('.sidebar-lists');
    menuList.innerHTML = this.data.map((item, index) => `
      <li class="sidebar-item" data-index="${index}">
        <div class="item-icon">${item.icon}</div>
        <a href="${item.link}" class="item-link">${item.title}</a>
      </li>
    `).join('');
  }

  /**
   * 设置菜单数据
   * @param {Array} data - 菜单数据数组
   */
  setData(data) {
    this.data = data;
    this.renderMenus();
  }

  /**
   * 添加菜单项
   * @param {Object} item - 菜单项数据
   * @param {number} index - 插入位置索引，可选
   */
  addMenuItem(item, index) {
    if (typeof index === 'number') {
      this.data.splice(index, 0, item);
    } else {
      this.data.push(item);
    }
    this.renderMenus();
  }

  /**
   * 移除菜单项
   * @param {number} index - 要移除的菜单项索引
   */
  removeMenuItem(index) {
    this.data.splice(index, 1);
    this.renderMenus();
  }

  /**
   * 更新菜单项
   * @param {number} index - 菜单项索引
   * @param {Object} newData - 新的菜单项数据
   */
  updateMenuItem(index, newData) {
    this.data[index] = { ...this.data[index], ...newData };
    this.renderMenus();
  }

  /**
   * 展开侧边栏
   */
  expand() {
    const checkbox = this.container.querySelector('#sidebar-cb');
    checkbox.checked = true;
    this.isExpanded = true;
    const sidebarDefault = this.container.querySelector('.sidebar-default');
    sidebarDefault.classList.remove('hide');
    sidebarDefault.classList.add('show');
  }

  /**
   * 收起侧边栏
   */
  collapse() {
    const checkbox = this.container.querySelector('#sidebar-cb');
    checkbox.checked = false;
    this.isExpanded = false;
    const sidebarDefault = this.container.querySelector('.sidebar-default');
    sidebarDefault.classList.remove('show');
    sidebarDefault.classList.add('hide');
    sidebarDefault.addEventListener('animationend', () => {
      if (!this.isExpanded) {
        sidebarDefault.classList.remove('hide');
        sidebarDefault.style.display = 'none';
      }
    }, { once: true });
  }

  /**
   * 切换展开/收起状态
   */
  toggle() {
    if (this.isExpanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }
}

// 导出
window.DC = window.DC || {};
window.DC.Sidebar = DCSidebar;
