/**
 * 区域选择器组件
 */
class DCLocalSelector {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {DCLang} options.dcLang - DCLang实例
   * @param {string} options.container - 容器选择器
   * @param {Function} options.onChange - 选择变更回调
   */
  constructor(options) {
    this.dcLang = options.dcLang;
    this.container = document.querySelector(options.container);
    this.onChange = options.onChange;
    // 默认显示所有地区
    this.currentArea = 'ALL';
    
    this.init();
  }

  /**
   * 初始化组件
   * @private
   */
  init() {
    const wrapper = document.createElement('div');
    wrapper.className = 'dc-area-selector';
    wrapper.innerHTML = `
      <div class="dc-area-tabs"></div>
      <div class="dc-area-content">
        <div class="dc-area-search">
          <input type="text" placeholder="搜索国家/地区" />
        </div>
        <div class="dc-area-grid"></div>
      </div>
    `;

    // 添加样式
    const cssRules = `
      .dc-area-selector { position: relative; width: 100%; height: auto; font-size: 16px; }
      .dc-area-selector .dc-area-tabs { display: flex; border-bottom: 1px solid #eee; margin-bottom: 16px; }
      .dc-area-selector .dc-area-tabs .dc-area-tab { padding: 8px 16px; cursor: pointer; background: #363636; border-radius: 4px; border-bottom: 2px solid transparent; color: #c3c3c3; box-shadow: 5px 4px 8px 6px rgba(0, 0, 0, 0.2); }
      .dc-area-selector .dc-area-tabs .dc-area-tab:not(:last-child) { margin-right: 8px; }
      .dc-area-selector .dc-area-tabs .dc-area-tab.active { color: #fff; border-bottom-color: #ffd400; }
      .dc-area-selector .dc-area-content { position: relative; width: 100%; height: auto; padding: 16px 0; background: #363636; border-radius: 4px; box-shadow: 5px 4px 8px 6px rgba(0, 0, 0, 0.2); }
      .dc-area-selector .dc-area-content .dc-area-search { margin-bottom: 16px; padding: 0 12px !important; box-sizing: border-box; }
      .dc-area-selector .dc-area-content .dc-area-search input { width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #ddd; border-radius: 4px; background: #363636; color: #fff; font-size: 14px; line-height: 1.5; }
      .dc-area-selector .dc-area-content .dc-area-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; padding: 0 12px !important; }
      .dc-area-selector .dc-area-content .dc-area-grid .dc-area-item { display: flex; align-items: center; padding: 8px; border-radius: 4px; cursor: pointer; background: #363636; color: #fff; font-size: 14px; line-height: 1.5; }
      .dc-area-selector .dc-area-content .dc-area-grid .dc-area-item:hover { background: #6b6b6b; }
      .dc-area-selector .dc-area-content .dc-area-grid .dc-area-item .dc-area-img { display: block; width: 22px; margin-right: 8px; }
      .dc-area-selector .dc-area-content .dc-area-grid .dc-area-item .dc-area-name { display: block; color: #fff; font-size: 14px; line-height: 1.5; text-align: left; white-space: nowrap; overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; }

      @media screen and (max-width: 1024px) {
        .dc-area-selector { font-size: 14px; }
        .dc-area-selector .dc-area-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
        .dc-area-selector .dc-area-tabs .dc-area-tab { padding: 0px 4px; }
        .dc-area-selector .dc-area-tabs .dc-area-tab:not(:last-child) { margin-right: 0px; }
        .dc-area-selector .dc-area-content .dc-area-grid { display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; flex-direction: row; gap: 12px; padding: 0 12px !important; }
        .dc-area-selector .dc-area-content .dc-area-grid .dc-area-item { display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; flex-direction: column; width: 144px; }
        .dc-area-selector .dc-area-content .dc-area-grid .dc-area-item .dc-area-img { margin-right: 0; }
        .dc-area-selector .dc-area-content .dc-area-grid .dc-area-item .dc-area-name { margin-top: 6px; white-space: normal; overflow: visible; -o-text-overflow: unset; text-overflow: unset; text-align: center; }
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

    this.bindEvents();
    this.render();
  }

  /**
   * 绑定事件
   * @private
   */
  bindEvents() {
    const tabs = this.container.querySelector('.dc-area-tabs');
    const search = this.container.querySelector('.dc-area-search input');
    const grid = this.container.querySelector('.dc-area-grid');

    // 切换区域
    tabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.dc-area-tab');
      if (tab) {
        this.currentArea = tab.dataset.area;
        this.render();
      }
    });

    // 搜索功能
    search.addEventListener('input', (e) => {
      this.renderGrid(e.target.value);
    });

    // 选择国家
    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.dc-area-item');
      if (item) {
        const code = item.dataset.code;
        if (this.onChange) {
          this.onChange(this.dcLang.getCountryByCode(code));
        }
      }
    });
  }

  /**
   * 渲染组件
   * @private
   */
  render() {
    // 渲染区域标签
    const areas = [...new Set(this.dcLang.getCountriesByCurrentLang().map(c => c.area))];
    // 在区域列表开头添加"全部"选项
    const allAreas = ['ALL', ...areas];
    const tabs = this.container.querySelector('.dc-area-tabs');
    
    tabs.innerHTML = allAreas.map(area => `
      <div class="dc-area-tab ${area === this.currentArea ? 'active' : ''}" 
           data-area="${area}">
        ${area === 'ALL' ? '全部' : area}
      </div>
    `).join('');

    // 渲染国家网格
    this.renderGrid();
  }

  /**
   * 渲染国家网格
   * @param {string} searchText - 搜索文本
   * @private
   */
  renderGrid(searchText = '') {
    const grid = this.container.querySelector('.dc-area-grid');
    let countries = this.dcLang.getCountriesByCurrentLang();
    
    // 区域过滤
    if (this.currentArea && this.currentArea !== 'ALL') {
      countries = countries.filter(c => c.area === this.currentArea);
    }
    
    // 搜索过滤
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      countries = countries.filter(country => 
        country.name.toLowerCase().includes(searchLower) ||
        country.code.toLowerCase().includes(searchLower)
      );
    }

    grid.innerHTML = countries.map(country => `
      <div class="dc-area-item" data-code="${country.code}">
        <img class="dc-area-img" src="${country.icon}" alt="${country.code}">
        <span class="dc-area-name">${country.name}</span>
      </div>
    `).join('');
  }
}

// 全局导出语言选择
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCLocalSelector;
} else {
  window.DC = window.DC || {};
  window.DC.LocalSelector = DCLocalSelector;
}
