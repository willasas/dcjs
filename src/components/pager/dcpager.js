class DCPager {
  constructor(options = {}) {
    this.options = {
      container: 'body',
      itemsPerPage: 10,
      visiblePages: 7,
      ...options
    };

    this.currentPage = 1;
    this.init();
  }

  init() {
    this.container = this.options.container === 'body' ? 
      document.body : 
      document.querySelector(this.options.container);
    
    this.pagerWrapper = document.querySelector('.dc-dataTable-wrapper');
    this.dataContainer = document.querySelector('.dc-dataTable-container');
    this.currentPageEl = document.querySelector('.dc-dataTable-info-number');
    this.totalPagesEl = document.querySelector('.dc-dataTable-info-sum');
    this.paginationList = document.querySelector('.dc-dataTable-pagination-list');
    
    this.totalItems = this.dataContainer.children.length;
    this.totalPages = Math.ceil(this.totalItems / this.options.itemsPerPage);
    
    this.hideAllItems();
    
    this.currentPageEl.textContent = '1';
    this.totalPagesEl.textContent = this.totalPages.toString();
    
    this.showFirstPage();
    
    this.renderPagination();
    this.setupEventListeners();
  }

  showFirstPage() {
    const start = 0;
    const end = Math.min(this.options.itemsPerPage, this.totalItems);
    
    Array.from(this.dataContainer.children).forEach((item, index) => {
      item.style.display = (index >= start && index < end) ? '' : 'none';
    });
    
    this.currentPage = 1;
    this.updatePaginationState();
  }

  hideAllItems() {
    Array.from(this.dataContainer.children).forEach(item => {
      item.style.display = 'none';
    });
  }

  renderPagination() {
    const { visiblePages } = this.options;
    let pages = [];
    
    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + visiblePages - 1);
    
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    pages.push(1);
    
    if (startPage > 2) {
      pages.push('...');
    }
    
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== this.totalPages) {
        pages.push(i);
      }
    }
    
    if (endPage < this.totalPages - 1) {
      pages.push('...');
    }
    
    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }

    this.paginationList.innerHTML = pages.map(page => {
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
      return `
        <li class="dc-dataTable-pagination-item ${page === this.currentPage ? 'active' : ''}">
          <a href="#" data-page="${page}">${page}</a>
        </li>
      `;
    }).join('');
  }

  updatePageInfo() {
    this.currentPageEl.textContent = this.currentPage;
    this.totalPagesEl.textContent = this.totalPages;
    this.renderPagination();
    this.updatePaginationState();
  }

  updatePaginationState() {
    const firstPager = document.querySelector('.dc-first-pager');
    const lastPager = document.querySelector('.dc-last-pager');
    const prevPager = document.querySelector('.dc-prev-pager');
    const nextPager = document.querySelector('.dc-next-pager');
    
    const isFirstPage = this.currentPage === 1;
    const isLastPage = this.currentPage === this.totalPages;
    const isSinglePage = this.totalPages === 1;
    
    firstPager.classList.toggle('disabled', isFirstPage || isSinglePage);
    lastPager.classList.toggle('disabled', isLastPage || isSinglePage);
    prevPager.classList.toggle('disabled', isFirstPage || isSinglePage);
    nextPager.classList.toggle('disabled', isLastPage || isSinglePage);
  }

  showPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > this.totalPages || pageNumber === this.currentPage) {
      return;
    }
    
    this.hideAllItems();
    
    const start = (pageNumber - 1) * this.options.itemsPerPage;
    const end = Math.min(start + this.options.itemsPerPage, this.totalItems);
    
    Array.from(this.dataContainer.children).forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = '';
      }
    });
    
    this.currentPage = pageNumber;
    this.updatePageInfo();
  }

  setupEventListeners() {
    document.querySelector('.dc-first-pager').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.currentPage !== 1) {
        this.showPage(1);
      }
    });

    document.querySelector('.dc-last-pager').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.currentPage !== this.totalPages) {
        this.showPage(this.totalPages);
      }
    });

    document.querySelector('.dc-prev-pager').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.currentPage > 1) {
        this.showPage(this.currentPage - 1);
      }
    });

    document.querySelector('.dc-next-pager').addEventListener('click', (e) => {
      e.preventDefault();
      if (this.currentPage < this.totalPages) {
        this.showPage(this.currentPage + 1);
      }
    });

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