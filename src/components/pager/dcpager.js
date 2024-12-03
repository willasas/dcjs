class DCPager {
  /**
   * 构造函数，初始化分页组件
   * 
   * @param {Object} options - 用户自定义的配置选项，包括容器、每页项数和可见页数等
   *        container: 分页组件的容器，默认为'body'
   *        itemsPerPage: 每页显示的项数，默认为10
   *        visiblePages: 一次显示的页码数量，默认为7
   * 该构造函数接受一个配置对象作为参数，用于定制分页组件的行为和外观
   * 它还初始化了当前页码，并调用了init方法来完成组件的初始化
   */
  constructor(options = {}) {
    // 合并用户自定义配置和默认配置，确保所有配置项都有值
    this.options = {
      container: 'body',
      itemsPerPage: 10,
      visiblePages: 7,
      ...options
    };
    // 初始化当前页码为第1页
    this.currentPage = 1;

    // 确保DOM加载完成后再初始化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializePager();
      });
    } else {
      this.initializePager();
    }
    this.addStyles();
  }

  /**
   * 初始化分页器
   * 
   * 本方法尝试调用init方法初始化分页器如果init方法抛出异常则表明初始化失败此时尝试创建DOM结构
   */
  initializePager() {
    try {
      // 尝试初始化分页器
      this.init();
    } catch (error) {
      // 初始化失败时输出警告信息并尝试创建DOM结构
      console.warn('Attempting to create DOM structure...');
      this.createElement();
    }
  }

  /**
   * 创建分页组件的DOM结构
   * 
   * 此函数负责生成并插入分页组件所需的HTML结构
   * 它首先检查是否已经存在分页结构，如果不存在，则创建并插入
   * 通过动态创建HTML元素并将其添加到指定的容器中，构建分页组件的界面
   * 最后，重新初始化分页组件以确保其功能正常
   */
  createElement() {
    try {
      // 创建基本结构
      const wrapper = document.createElement('div');
      wrapper.className = 'dc-dataTable-wrapper';

      const structure = `
        <div class="dc-dataTable-top"></div>
        <div class="dc-dataTable-container"></div>
        <div class="dc-dataTable-bottom">
          <div class="dc-dataTable-info">
            <p class="dc-dataTable-info-text">当前为</p>
            <p class="dc-dataTable-info-number">1</p>
            <p class="dc-dataTable-info-text">共</p>
            <p class="dc-dataTable-info-sum">1</p>
            <p class="dc-dataTable-info-text">页</p>
          </div>
          <div class="dc-dataTable-pagination">
            <a class="dc-first-pager" href="#" data-page="1" data-text="起始页">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 23.9917H42" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M26 36L14 24L26 12" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M5 36V12" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
              </svg>
            </a>
            <a class="dc-prev-pager dc-pager" href="#" data-text="上一页">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31 36L19 24L31 12" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
              </svg>
            </a>
            <ul class="dc-dataTable-pagination-list"></ul>
            <a class="dc-next-pager dc-pager" href="#" data-text="下一页">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12L31 24L19 36" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
              </svg>
            </a>
            <a class="dc-last-pager" href="#" data-text="最终页">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34 24.0083H6" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M22 12L34 24L22 36" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M42 12V36" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
          <div class="dc-dataTable-selector">
            <div class="dc-dataTable-text">跳转至第</div>
            <div class="dc-dataTable-search">
              <input class="dc-dataTable-input" placeholder="1" type="text">
            </div>
            <div class="dc-dataTable-text">页</div>
          </div>
        </div>
      `;

      wrapper.innerHTML = structure;

      // 将结构添加到指定容器
      const container = this.options.container === 'body' ? 
        document.body : 
        document.querySelector(this.options.container);

      if (!container) {
        throw new Error(`Container ${this.options.container} not found`);
      }

      container.appendChild(wrapper);

      // 重新初始化
      setTimeout(() => this.init(), 0);
    } catch (error) {
      console.error('Failed to create DOM structure:', error);
      throw error;
    }
  }

  /**
   * 添加样式
   * @method addStyles
   * @memberof DCSampleBGM
   * @instance
   */
  addStyles() {
    const pagerStyle = `
      @media screen and (min-width: 1025px) { 
        .dc-dataTable-wrapper { margin: 0 auto; position: relative; width: 100%; height: auto; min-width: 1200px; min-height: 600px; }
        .dc-dataTable-wrapper .dc-dataTable-top { margin: 0 auto; position: relative; width: 100%; min-height: 100px; border: 1px solid #000; }
        .dc-dataTable-wrapper .dc-dataTable-container { margin: 0 auto; position: relative; width: 100%; min-height: 800px; border: 1px solid #000; display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; flex-direction: row; overflow: hidden; }
        .dc-dataTable-wrapper .dc-dataTable-bottom { position: relative; margin: 0 auto; position: relative; width: 100%; min-height: 60px; box-sizing: border-box; padding: 0 20px; display: flex; justify-content: center; align-items: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-info { display: flex; justify-content: center; align-items: center; min-width: 100px; margin-right: 20px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-info .dc-dataTable-info-text { font-size: 16px; color: #333; font-weight: 400; line-height: 24px; text-align: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-info .dc-dataTable-info-number { font-size: 16px; color: #0a9ba5; font-weight: 400; line-height: 24px; text-align: center; margin: 0 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-info .dc-dataTable-info-sum { font-size: 16px; color: #0a9ba5; font-weight: 400; line-height: 24px; text-align: center; margin: 0 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination { display: flex; justify-content: center; align-items: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-first-pager { width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; margin-right: 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-first-pager.disabled { cursor: not-allowed; opacity: 0.5; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-pager { width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-pager.disabled { cursor: not-allowed; opacity: 0.5; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination svg { display: block; width: 100%; height: 100%; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-prev-pager, .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-next-pager { display: flex; justify-content: center; align-items: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-list { min-width: 220px; height: 30px; display: flex; justify-content: center; align-items: center; margin: 0 18px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item { width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border: 1px solid #000; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item:not(:last-child) { margin-right: 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item.active { background-color: #0e796a; color: #fff; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item.dc-ellipsis { font-size: 0; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item a { font-size: 16px; color: #333; font-weight: 400; line-height: 24px; text-align: center; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; text-decoration: none; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-last-pager { width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; margin-left: 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-last-pager.disabled { cursor: not-allowed; opacity: 0.5; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-selector { display: flex; justify-content: center; align-items: center; margin-left: 20px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-selector .dc-dataTable-text { font-size: 16px; color: #333; font-weight: 400; line-height: 24px; text-align: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-selector .dc-dataTable-search { width: 80px; height: 30px; font-size: 16px; color: #0a9ba5; font-weight: 400; line-height: 24px; text-align: center; margin: 0 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-selector .dc-dataTable-input { font-size: 16px; color: #0a9ba5; font-weight: 400; line-height: 24px; text-align: center; width: 100%; border-radius: 20px; } 
      }

      @media screen and (max-width: 1024px) {
        .dc-dataTable-wrapper { margin: 0 auto; position: relative; width: 100%; height: auto; min-height: 600px; width: 100%; box-sizing: border-box; padding: 0 12px; }
        .dc-dataTable-wrapper .dc-dataTable-top { margin: 0 auto; position: relative; width: 100%; min-height: 100px; border: 1px solid #000; }
        .dc-dataTable-wrapper .dc-dataTable-container { margin: 0 auto; position: relative; width: 100%; min-height: 800px; border: 1px solid #000; display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; flex-direction: row; overflow: hidden; }
        .dc-dataTable-wrapper .dc-dataTable-bottom { position: relative; margin: 0 auto; position: relative; width: 100%; min-height: 60px; box-sizing: border-box; padding: 0 10px; display: flex; justify-content: center; align-items: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-info { display: flex; justify-content: center; align-items: center; min-width: 100px; margin-right: 10px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-info .dc-dataTable-info-text { font-size: 16px; color: #333; font-weight: 400; line-height: 24px; text-align: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-info .dc-dataTable-info-number { font-size: 16px; color: #0a9ba5; font-weight: 400; line-height: 24px; text-align: center; margin: 0 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-info .dc-dataTable-info-sum { font-size: 16px; color: #0a9ba5; font-weight: 400; line-height: 24px; text-align: center; margin: 0 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination { display: flex; justify-content: center; align-items: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-first-pager { width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; margin-right: 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-first-pager.disabled { cursor: not-allowed; opacity: 0.5; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-pager { width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-pager.disabled { cursor: not-allowed; opacity: 0.5; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination svg { display: block; width: 100%; height: 100%; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-prev-pager, .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-next-pager { display: flex; justify-content: center; align-items: center; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-list { min-width: 220px; height: 30px; display: flex; justify-content: center; align-items: center; margin: 0 18px; padding: 0; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item { width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border: 1px solid #000; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item:not(:last-child) { margin-right: 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item.active { background-color: #0e796a; color: #fff; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item.dc-ellipsis { font-size: 0; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-dataTable-pagination-item a { font-size: 16px; color: #333; font-weight: 400; line-height: 24px; text-align: center; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; text-decoration: none; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-last-pager { width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; margin-left: 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-pagination .dc-last-pager.disabled { cursor: not-allowed; opacity: 0.5; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-selector { display: flex; justify-content: center; align-items: center; margin-left: 10px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-selector .dc-dataTable-text { font-size: 16px; color: #333; font-weight: 400; line-height: 24px; text-align: center; width: 100%; white-space: nowrap; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-selector .dc-dataTable-search { width: 80px; height: 30px; font-size: 16px; color: #0a9ba5; font-weight: 400; line-height: 24px; text-align: center; margin: 0 8px; }
        .dc-dataTable-wrapper .dc-dataTable-bottom .dc-dataTable-selector .dc-dataTable-input { font-size: 16px; color: #0a9ba5; font-weight: 400; line-height: 24px; text-align: center; width: 100%; border-radius: 20px; } 
      }
    `;
    /**
     * 动态添加样式到页面中
     * 
     * 该函数通过创建一个style元素，并将其插入到head标签内，紧接在title元素之前的方式，来为页面添加新的CSS样式
     * 这种方法允许开发者在页面加载后，根据需要添加或修改样式，从而实现更灵活的样式控制
     * 
     * @param {string} eleStyleInit - 需要添加的CSS样式字符串这个字符串应该包含完整的CSS规则，例如选择器和相关的样式声明
     */
    const addStyle = (eleStyleInit) => {
      const fa = document.querySelector('title');
      const eleStyle = document.createElement('style');
      eleStyle.innerHTML = eleStyleInit;
      document.head.insertBefore(eleStyle, fa);
    };
  
    addStyle(pagerStyle);
  }

  /**
   * 初始化分页组件
   * 
   * 此方法负责设置分页组件的初始状态，包括定位容器、计算总页数、显示第一页的数据以及渲染分页导航
   * 它还会根据配置选项定制组件的行为，比如确定数据容器是body还是页面上的特定元素
   */
  init() {
    try {
      // 确定数据表格的容器，如果是'body'则使用document.body，否则选择指定的容器元素
      this.container = this.options.container === 'body' ? 
        document.body : 
        document.querySelector(this.options.container);

      if (!this.container) {
        throw new Error(`Container ${this.options.container} not found`);
      }

      // 检查是否需要创建基础结构
      if (!document.querySelector('.dc-dataTable-wrapper')) {
        this.createElement();
        return; // 创建后会重新调用init
      }

      // 获取分页器包装器、数据容器和当前页数等DOM元素的引用
      this.pagerWrapper = document.querySelector('.dc-dataTable-wrapper');
      this.dataContainer = document.querySelector('.dc-dataTable-container');
      this.currentPageEl = document.querySelector('.dc-dataTable-info-number');
      this.totalPagesEl = document.querySelector('.dc-dataTable-info-sum');
      this.paginationList = document.querySelector('.dc-dataTable-pagination-list');

      // 验证所有必需的元素都存在
      const requiredElements = [
        this.pagerWrapper,
        this.dataContainer,
        this.currentPageEl,
        this.totalPagesEl,
        this.paginationList
      ];

      if (requiredElements.some(el => !el)) {
        throw new Error('Required DOM elements not found');
      }
      
      // 初始化分页数据
      this.totalItems = this.dataContainer.children.length;
      this.totalPages = Math.ceil(this.totalItems / this.options.itemsPerPage);
      // 隐藏所有项目，为显示第一页做准备
      this.hideAllItems();
      // 更新当前页数和总页数的显示
      this.currentPageEl.textContent = '1';
      this.totalPagesEl.textContent = this.totalPages.toString();
      // 显示第一页的项目
      this.showFirstPage();
      // 渲染分页导航列表，并设置事件监听器以响应用户的点击事件
      this.renderPagination();
      this.setupEventListeners();
      console.log('Pager initialized successfully');
    } catch (error) {
      console.error('Initialization failed:', error);
      throw error;
    }
  }

  /**
   * 显示第一页的项目
   * 
   * 此方法用于初始化或重置分页显示到第一页它通过隐藏除第一页之外的所有项目来实现
   * 同时，它更新当前页码和分页状态
   */
  showFirstPage() {
    // 定义起始索引为0，表示从第一个项目开始
    const start = 0;
    // 定义结束索引，为每页的项目数和总项目数的较小值，确保不会超过实际项目数
    const end = Math.min(this.options.itemsPerPage, this.totalItems);
    
    // 遍历数据容器中的所有子元素
    Array.from(this.dataContainer.children).forEach((item, index) => {
      // 根据项目索引是否在起始和结束索引之间，决定项目的显示状态
      item.style.display = (index >= start && index < end) ? '' : 'none';
    });
    
    // 更新当前页码为1
    this.currentPage = 1;
    // 调用方法更新分页状态
    this.updatePaginationState();
  }

  /**
   * 隐藏所有子项
   * 
   * 此方法遍历dataContainer中的所有子元素，并将它们的display样式设置为'none'，从而将它们从文档流中移除，达到隐藏的效果
   */
  hideAllItems() {
    Array.from(this.dataContainer.children).forEach(item => {
      item.style.display = 'none';
    });
  }

  /**
   * 渲染分页导航
   * 
   * 该方法根据当前页码和总页码数，计算并生成分页导航的HTML列表项
   * 它确保在导航中始终显示一定数量的页码链接，并在必要时使用省略号(...)表示连续的页码
   */
  renderPagination() {
    // 获取配置对象中的visiblePages属性，决定显示的页码数量
    const { visiblePages } = this.options;
    let pages = [];
    
    // 计算分页导航的开始页码和结束页码
    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + visiblePages - 1);
    
    // 调整开始页码，以确保显示的页码数量不会少于visiblePages
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // 总是添加第一页的链接
    pages.push(1);
    
    // 如果开始页码大于2，则在第一页和开始页码之间添加省略号
    if (startPage > 2) {
      pages.push('...');
    }
    
    // 添加中间的页码链接，避免第一页和最后一页被重复添加
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== this.totalPages) {
        pages.push(i);
      }
    }
    
    // 如果结束页码小于总页码减1，则在结束页码和最后一页之间添加省略号
    if (endPage < this.totalPages - 1) {
      pages.push('...');
    }
    
    // 如果总页码大于1，则添加最后一页的链接
    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }

    // 生成并设置分页导航的HTML内容 
    this.paginationList.innerHTML = pages.map(page => {
      // 为省略号生成特定的HTML结构
      if (page === '...') {
        return `
          <li class="dc-dataTable-pagination-item dc-ellipsis">
            <a href="#">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="24" r="3" fill="#333"/>
                <circle cx="24" cy="24" r="3" fill="#333"/>
                <circle cx="36" cy="24" r="3" fill="#333"/>
              </svg>
            </a>
          </li>
        `;
      }
      // 为每个页码生成列表项，当前页码添加active类
      return `
        <li class="dc-dataTable-pagination-item ${page === this.currentPage ? 'active' : ''}">
          <a href="#" data-page="${page}">${page}</a>
        </li>
      `;
    }).join('');
  }

  /**
   * 更新页面信息
   * 
   * 此方法用于更新分页组件的显示信息它会将当前页码和总页数显示到界面上
   * 并通过调用其他方法来渲染分页组件并更新其状态
   */
  updatePageInfo() {
    // 更新当前页码显示
    this.currentPageEl.textContent = this.currentPage;
    // 更新总页数显示
    this.totalPagesEl.textContent = this.totalPages;
    // 渲染分页组件
    this.renderPagination();
    // 更新分页组件的状态
    this.updatePaginationState();
  }

  /**
   * 更新分页组件的状态
   * 
   * 此函数根据当前页和总页数来更新分页组件的可见状态
   * 它主要关注于禁用或启用分页按钮（首页、末页、上一页、下一页）
   * 当处于第一页或最后一页或只有一页时，相应的按钮将被禁用以防止用户导航到无效页面
   */
  updatePaginationState() {
    // 获取分页按钮元素
    const firstPager = document.querySelector('.dc-first-pager');
    const lastPager = document.querySelector('.dc-last-pager');
    const prevPager = document.querySelector('.dc-prev-pager');
    const nextPager = document.querySelector('.dc-next-pager');
    // 判断当前页是否为第一页、最后一页或只有一页
    const isFirstPage = this.currentPage === 1;
    const isLastPage = this.currentPage === this.totalPages;
    const isSinglePage = this.totalPages === 1;
    // 根据当前页和总页数的情况，禁用或启用分页按钮
    firstPager.classList.toggle('disabled', isFirstPage || isSinglePage);
    lastPager.classList.toggle('disabled', isLastPage || isSinglePage);
    prevPager.classList.toggle('disabled', isFirstPage || isSinglePage);
    nextPager.classList.toggle('disabled', isLastPage || isSinglePage);
  }

  /**
   * 显示指定页面的内容
   * @param {number} pageNumber - 需要显示的页面编号
   */
  showPage(pageNumber) {
    // 检查页面编号是否有效，如果无效则不执行后续操作
    if (pageNumber < 1 || pageNumber > this.totalPages || pageNumber === this.currentPage) {
      return;
    }
    // 隐藏当前显示的所有项目
    this.hideAllItems();
    // 计算当前页面的起始和结束索引
    const start = (pageNumber - 1) * this.options.itemsPerPage;
    const end = Math.min(start + this.options.itemsPerPage, this.totalItems);
    // 遍历所有项目，只显示当前页面的项目
    Array.from(this.dataContainer.children).forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = '';
      }
    });
    // 更新当前页面编号，并更新页面信息
    this.currentPage = pageNumber;
    this.updatePageInfo();
  }

  /**
   * 设置事件监听器
   * 为分页导航按钮和跳转输入框添加点击事件监听器
   */
  setupEventListeners() {
    // 首页按钮点击事件
    document.querySelector('.dc-first-pager').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.currentPage !== 1) {
        this.showPage(1);
      }
    });

    // 末页按钮点击事件
    document.querySelector('.dc-last-pager').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.currentPage !== this.totalPages) {
        this.showPage(this.totalPages);
      }
    });

    // 上一页按钮点击事件
    document.querySelector('.dc-prev-pager').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.currentPage > 1) {
        this.showPage(this.currentPage - 1);
      }
    });

    // 下一页按钮点击事件
    document.querySelector('.dc-next-pager').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.currentPage < this.totalPages) {
        this.showPage(this.currentPage + 1);
      }
    });

    // 页码列表点击事件
    this.paginationList.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target.closest('a[data-page]');
      if (target) {
        const pageNum = parseInt(target.dataset.page);
        if (pageNum && !isNaN(pageNum)) {
          this.showPage(pageNum);
        }
      }
    });

    // 跳转输入框回车事件
    const jumpInput = document.querySelector('.dc-dataTable-input');
    jumpInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const pageNum = parseInt(e.target.value);
        if (pageNum && pageNum <= this.totalPages && pageNum > 0) {
          this.showPage(pageNum);
          e.target.value = '';
        }
      }
    });
  }
}