/**
 * 语言选择器组件
 */
class DCLanguageSelector {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {DCLang} options.dcLang - DCLang实例
   * @param {string} options.container - 容器选择器
   * @param {Function} options.onChange - 语言切换回调
   */
  constructor(options) {
    this.dcLang = options.dcLang;
    this.container = document.querySelector(options.container);
    this.onChange = options.onChange;
    // 记录当前列表类型
    this.currentListType = 'main';
    
    this.init();
  }

  /**
   * 初始化组件
   * @private
   */
  init() {
    // 创建下拉菜单容器
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'dc-language-selector';
    dropdownContainer.innerHTML = `
      <div class="dc-language-current">
        <i class="dc-icon-globe">
          <svg class="icon icon_lang" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.2857 37H39.7143M42 42L39.7143 37L42 42ZM26 42L28.2857 37L26 42ZM28.2857 37L34 24L39.7143 37H28.2857Z" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M16 6L17 9" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M6 11H28" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M10 16C10 16 11.7895 22.2609 16.2632 25.7391C20.7368 29.2174 28 32 28 32" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M24 11C24 11 22.2105 19.2174 17.7368 23.7826C13.2632 28.3478 6 32 6 32" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
        </i>
        <span class="dc-language-text"></span>
        <i class="dc-icon-arrow">
          <svg class="icon icon_down" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 18L24 30L12 18" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
          <svg class="icon icon_up" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 30L25 18L37 30" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
        </i>
      </div>
      <div class="dc-language-dropdown">
        <div class="dc-language-tabs">
          <div class="dc-language-tab active" data-type="main">常用语言</div>
          <div class="dc-language-tab" data-type="all">全部语言</div>
        </div>
        <div class="dc-language-search">
          <input type="text" placeholder="搜索语言..." />
        </div>
        <div class="dc-language-list"></div>
      </div>
    `;

    // 添加样式
    const cssRules = `
      .dc-language-selector { position: relative; font-size: 14px; max-width: 220px; }
      .dc-language-selector.active .dc-language-dropdown { display: block; }
      .dc-language-selector .dc-language-current { display: flex; align-items: center; box-sizing: border-box; padding: 8px 12px; cursor: pointer; background: #2d2d2d; border-radius: 4px; color: #fff; width: 100%; }
      .dc-language-selector .dc-language-current .dc-icon-globe { margin-right: 8px; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; }
      .dc-language-selector .dc-language-current .dc-icon-globe svg { width: 100%; height: 100%; }
      .dc-language-selector .dc-language-current .dc-icon-globe svg path { stroke: #fff; }
      .dc-language-selector .dc-language-current .dc-language-text { width: 100%; height: 100%; text-align: left; white-space: nowrap; overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; }
      .dc-language-selector .dc-language-current .dc-icon-arrow { margin-left: 8px; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; }
      .dc-language-selector .dc-language-current .dc-icon-arrow .icon_down { display: block; }
      .dc-language-selector .dc-language-current .dc-icon-arrow .icon_up { display: none; }
      .dc-language-selector .dc-language-current .dc-icon-arrow.active .icon_down { display: none; }
      .dc-language-selector .dc-language-current .dc-icon-arrow.active .icon_up { display: block; }
      .dc-language-selector .dc-language-current .dc-icon-arrow svg { width: 100%; height: 100%; }
      .dc-language-selector .dc-language-current .dc-icon-arrow svg path { stroke: #fff; }
      .dc-language-selector .dc-language-dropdown { display: none; position: absolute; z-index: 1000; top: 100%; left: 0; width: 220px; background: #2d2d2d; border-radius: 4px; margin-top: 4px; padding: 8px 0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); }
      .dc-language-selector .dc-language-dropdown .dc-language-tabs { display: flex; padding: 0 12px 8px; border-bottom: 1px solid #444; margin-bottom: 8px; }
      .dc-language-selector .dc-language-dropdown .dc-language-tabs .dc-language-tab { padding: 4px 8px; cursor: pointer; color: #888; font-size: 12px; border-radius: 2px; }
      .dc-language-selector .dc-language-dropdown .dc-language-tabs .dc-language-tab:hover { color: #fff; }
      .dc-language-selector .dc-language-dropdown .dc-language-tabs .dc-language-tab.active { color: #fff; background: #363636; }
      .dc-language-selector .dc-language-dropdown .dc-language-search { position: relative; width: 100%; box-sizing: border-box; padding: 8px 12px; }
      .dc-language-selector .dc-language-dropdown .dc-language-search input { width: 100%; box-sizing: border-box; padding: 6px 4px; border: 1px solid #444; border-radius: 4px; background: #363636; color: #fff; }
      .dc-language-selector .dc-language-dropdown .dc-language-list { position: relative; max-height: 300px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box; padding: 0 4px 0 0; }
      .dc-language-selector .dc-language-dropdown .dc-language-list::-webkit-scrollbar { width: 4px; }
      .dc-language-selector .dc-language-dropdown .dc-language-list::-webkit-scrollbar-track { width: 4px; border-radius: 2px; background-color: #9f9f9f; }
      .dc-language-selector .dc-language-dropdown .dc-language-list::-webkit-scrollbar-thumb { width: 4px; border-radius: 2px; background-color: #fff; }
      .dc-language-selector .dc-language-dropdown .dc-language-list .dc-language-item { padding: 8px 12px; cursor: pointer; color: #fff; }
      .dc-language-selector .dc-language-dropdown .dc-language-list .dc-language-item:hover { background: #363636; }
      .dc-language-selector .dc-language-dropdown .dc-language-list .dc-language-item.active { background: #404040; }
      .dc-language-selector .dc-language-dropdown .dc-language-list .dc-language-item .dc-language-name { width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-between; }

      @media screen and (max-width: 1024px) {
        .dc-language-selector { max-width: 40px; }
        .dc-language-selector.active .dc-language-dropdown { display: block; }
        .dc-language-selector .dc-language-current { padding: 0; justify-content: center; width: 40px; height: 40px; }
        .dc-language-selector .dc-language-current .dc-icon-globe { margin-right: 0; }
        .dc-language-selector .dc-language-current .dc-language-text { display: none; }
        .dc-language-selector .dc-language-current .dc-icon-arrow { display: none !important; }
      }
    `;

    const addStyle = eleStyleInit => {
      const fa = document.querySelector('title')
      const eleStyle = document.createElement('style')
      eleStyle.innerHTML = eleStyleInit
      document.head.insertBefore(eleStyle, fa)
    }
    addStyle(cssRules)
    this.container.appendChild(dropdownContainer);

    // 绑定事件
    this.bindEvents();
    
    // 初始渲染
    this.render();
  }

  /**
   * 绑定事件
   * @private
   */
  bindEvents() {
    const current = this.container.querySelector('.dc-language-current');
    const search = this.container.querySelector('.dc-language-search input');
    const list = this.container.querySelector('.dc-language-list');
    const arrow = this.container.querySelector('.dc-icon-arrow');

    // 切换下拉菜单
    current.addEventListener('click', () => {
      this.container.querySelector('.dc-language-selector').classList.toggle('active');
      arrow.classList.toggle('active');
    });

    // 搜索功能
    search.addEventListener('input', (e) => {
      this.renderList(e.target.value, this.currentListType);
    });

    // 选择语言
    list.addEventListener('click', (e) => {
      const item = e.target.closest('.dc-language-item');
      if (item) {
        const langCode = item.dataset.code;
        // 确保语言切换成功
        if (this.dcLang.switchLanguage(langCode)) {
          // 使用当前列表类型重新渲染
          this.render(this.currentListType);
          this.container.querySelector('.dc-language-selector').classList.remove('active');
          arrow.classList.remove('active');
          if (this.onChange) {
            this.onChange(langCode);
          }
        }
      }
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.container.querySelector('.dc-language-selector').classList.remove('active');
        arrow.classList.remove('active');
      }
    });

    // 切换语言列表类型
    const tabs = this.container.querySelector('.dc-language-tabs');
    tabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.dc-language-tab');
      if (tab) {
        const type = tab.dataset.type;
        this.currentListType = type; // 更新当前列表类型
        tabs.querySelectorAll('.dc-language-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderList('', type);
      }
    });
  }

  /**
   * 渲染组件
   * @private
   * @param {string} type - 列表类型：'main' 或 'all'
   */
  render(type = this.currentListType) {
    const currentLang = this.dcLang.getCurrentLang();
    const options = type === 'main' 
      ? this.dcLang.getMainLanguageOptions()
      : this.dcLang.getAllLanguageOptions();
    const currentOption = options.find(opt => opt.code === currentLang);
    
    // 更新当前选中的语言
    this.container.querySelector('.dc-language-text').textContent = currentOption?.name || currentLang;
    
    // 渲染语言列表
    this.renderList('', type);
  }

  /**
   * 渲染语言列表
   * @param {string} searchText - 搜索文本
   * @param {string} type - 列表类型：'main' 或 'all'
   * @private
   */
  renderList(searchText = '', type = 'main') {
    const list = this.container.querySelector('.dc-language-list');
    const currentLang = this.dcLang.getCurrentLang();
    
    let options = type === 'main' 
      ? this.dcLang.getMainLanguageOptions()
      : this.dcLang.getAllLanguageOptions();
    
    // 搜索过滤
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      options = options.filter(opt => 
        opt.name.toLowerCase().includes(searchLower) ||
        opt.code.toLowerCase().includes(searchLower)
      );
    }

    // 渲染列表
    list.innerHTML = options.map(opt => `
      <div class="dc-language-item ${opt.code === currentLang ? 'active' : ''}" 
           data-code="${opt.code}">
        ${opt.name}
      </div>
    `).join('');
  }
}

// 全局导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCLanguageSelector;
} else {
  window.DC = window.DC || {};
  window.DC.LanguageSelector = DCLanguageSelector;
}
