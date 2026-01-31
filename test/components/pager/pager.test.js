// 分页组件测试
const DCPager = require('../../../src/components/pager/dcpager.js');

// 模拟DOM环境
beforeEach(() => {
    // 模拟document对象
    global.document = {
        querySelector: jest.fn(),
        createElement: jest.fn(),
        head: {
            insertBefore: jest.fn()
        },
        body: {
            appendChild: jest.fn(),
            children: []
        },
        addEventListener: jest.fn(),
        readyState: 'complete'
    };

    // 模拟querySelector返回值
    document.querySelector.mockImplementation((selector) => {
        if (selector === 'title') {
            return { tagName: 'TITLE' };
        }
        if (selector === '.dc-dataTable-wrapper') {
            return {
                className: 'dc-dataTable-wrapper'
            };
        }
        if (selector === '.dc-dataTable-container') {
            return {
                className: 'dc-dataTable-container',
                children: [
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} },
                    { style: {} }
                ]
            };
        }
        if (selector === '.dc-dataTable-info-number') {
            return {
                className: 'dc-dataTable-info-number',
                textContent: ''
            };
        }
        if (selector === '.dc-dataTable-info-sum') {
            return {
                className: 'dc-dataTable-info-sum',
                textContent: ''
            };
        }
        if (selector === '.dc-dataTable-pagination-list') {
            return {
                className: 'dc-dataTable-pagination-list',
                innerHTML: '',
                addEventListener: jest.fn()
            };
        }
        if (selector === '.dc-first-pager') {
            return {
                className: 'dc-first-pager',
                addEventListener: jest.fn(),
                classList: {
                    toggle: jest.fn()
                }
            };
        }
        if (selector === '.dc-last-pager') {
            return {
                className: 'dc-last-pager',
                addEventListener: jest.fn(),
                classList: {
                    toggle: jest.fn()
                }
            };
        }
        if (selector === '.dc-prev-pager') {
            return {
                className: 'dc-prev-pager',
                addEventListener: jest.fn(),
                classList: {
                    toggle: jest.fn()
                }
            };
        }
        if (selector === '.dc-next-pager') {
            return {
                className: 'dc-next-pager',
                addEventListener: jest.fn(),
                classList: {
                    toggle: jest.fn()
                }
            };
        }
        if (selector === '.dc-dataTable-input') {
            return {
                addEventListener: jest.fn()
            };
        }
        if (selector === '#test-container') {
            return {
                appendChild: jest.fn()
            };
        }
        return null;
    });

    // 模拟createElement返回值
    document.createElement.mockImplementation((tagName) => {
        return {
            setAttribute: jest.fn(),
            className: '',
            textContent: '',
            innerHTML: '',
            appendChild: jest.fn(),
            querySelector: jest.fn(),
            querySelectorAll: jest.fn(),
            addEventListener: jest.fn(),
            style: {},
            children: []
        };
    });
});

afterEach(() => {
    // 清除所有模拟
    jest.clearAllMocks();
});

describe('DCPager 组件测试', () => {
    test('初始化组件时应该使用默认配置', () => {
        // 初始化组件
        const pager = new DCPager();

        // 验证默认配置
        expect(pager.options.container).toBe('body');
        expect(pager.options.itemsPerPage).toBe(10);
        expect(pager.options.visiblePages).toBe(7);
        expect(pager.currentPage).toBe(1);
    });

    test('初始化组件时应该使用自定义配置', () => {
        // 自定义配置
        const customOptions = {
            container: '#test-container',
            itemsPerPage: 5,
            visiblePages: 5
        };

        // 初始化组件
        const pager = new DCPager(customOptions);

        // 验证自定义配置
        expect(pager.options.container).toBe('#test-container');
        expect(pager.options.itemsPerPage).toBe(5);
        expect(pager.options.visiblePages).toBe(5);
        expect(pager.currentPage).toBe(1);
    });

    test('showFirstPage方法应该显示第一页的项目', () => {
        // 初始化组件
        const pager = new DCPager();

        // 模拟必要的属性
        pager.dataContainer = document.querySelector('.dc-dataTable-container');
        pager.totalItems = pager.dataContainer.children.length;
        pager.totalPages = Math.ceil(pager.totalItems / pager.options.itemsPerPage);
        pager.currentPageEl = document.querySelector('.dc-dataTable-info-number');
        pager.totalPagesEl = document.querySelector('.dc-dataTable-info-sum');
        pager.paginationList = document.querySelector('.dc-dataTable-pagination-list');

        // 调用showFirstPage方法
        pager.showFirstPage();

        // 验证第一页的项目是否显示
        expect(pager.dataContainer.children[0].style.display).toBe('');
        expect(pager.dataContainer.children[9].style.display).toBe('');
        expect(pager.dataContainer.children[10].style.display).toBe('none');
        expect(pager.currentPage).toBe(1);
    });

    test('hideAllItems方法应该隐藏所有项目', () => {
        // 初始化组件
        const pager = new DCPager();

        // 模拟必要的属性
        pager.dataContainer = document.querySelector('.dc-dataTable-container');

        // 调用hideAllItems方法
        pager.hideAllItems();

        // 验证所有项目是否隐藏
        pager.dataContainer.children.forEach(item => {
            expect(item.style.display).toBe('none');
        });
    });

    test('showPage方法应该显示指定页面的项目', () => {
        // 初始化组件
        const pager = new DCPager({ itemsPerPage: 5 });

        // 模拟必要的属性
        pager.dataContainer = document.querySelector('.dc-dataTable-container');
        pager.totalItems = pager.dataContainer.children.length;
        pager.totalPages = Math.ceil(pager.totalItems / pager.options.itemsPerPage);
        pager.currentPageEl = document.querySelector('.dc-dataTable-info-number');
        pager.totalPagesEl = document.querySelector('.dc-dataTable-info-sum');
        pager.paginationList = document.querySelector('.dc-dataTable-pagination-list');

        // 调用showPage方法显示第二页
        pager.showPage(2);

        // 验证第二页的项目是否显示
        expect(pager.dataContainer.children[4].style.display).toBe('none');
        expect(pager.dataContainer.children[5].style.display).toBe('');
        expect(pager.dataContainer.children[9].style.display).toBe('');
        expect(pager.dataContainer.children[10].style.display).toBe('none');
        expect(pager.currentPage).toBe(2);
    });

    test('showPage方法应该忽略无效的页面编号', () => {
        // 初始化组件
        const pager = new DCPager();

        // 模拟必要的属性
        pager.dataContainer = document.querySelector('.dc-dataTable-container');
        pager.totalItems = pager.dataContainer.children.length;
        pager.totalPages = Math.ceil(pager.totalItems / pager.options.itemsPerPage);
        pager.currentPage = 1;

        // 调用showPage方法显示无效页面
        const originalPage = pager.currentPage;
        pager.showPage(0); // 无效页面
        expect(pager.currentPage).toBe(originalPage);

        pager.showPage(10); // 无效页面
        expect(pager.currentPage).toBe(originalPage);

        pager.showPage(1); // 当前页面
        expect(pager.currentPage).toBe(originalPage);
    });

    test('updatePaginationState方法应该更新分页按钮的状态', () => {
        // 初始化组件
        const pager = new DCPager();

        // 模拟必要的属性
        pager.currentPage = 1;
        pager.totalPages = 3;

        // 调用updatePaginationState方法
        pager.updatePaginationState();

        // 验证分页按钮的状态
        const firstPager = document.querySelector('.dc-first-pager');
        const lastPager = document.querySelector('.dc-last-pager');
        const prevPager = document.querySelector('.dc-prev-pager');
        const nextPager = document.querySelector('.dc-next-pager');

        expect(firstPager.classList.toggle).toHaveBeenCalledWith('disabled', true);
        expect(prevPager.classList.toggle).toHaveBeenCalledWith('disabled', true);
        expect(lastPager.classList.toggle).toHaveBeenCalledWith('disabled', false);
        expect(nextPager.classList.toggle).toHaveBeenCalledWith('disabled', false);
    });

    test('当只有一页时，所有分页按钮应该被禁用', () => {
        // 初始化组件
        const pager = new DCPager();

        // 模拟必要的属性
        pager.currentPage = 1;
        pager.totalPages = 1;

        // 调用updatePaginationState方法
        pager.updatePaginationState();

        // 验证分页按钮的状态
        const firstPager = document.querySelector('.dc-first-pager');
        const lastPager = document.querySelector('.dc-last-pager');
        const prevPager = document.querySelector('.dc-prev-pager');
        const nextPager = document.querySelector('.dc-next-pager');

        expect(firstPager.classList.toggle).toHaveBeenCalledWith('disabled', true);
        expect(prevPager.classList.toggle).toHaveBeenCalledWith('disabled', true);
        expect(lastPager.classList.toggle).toHaveBeenCalledWith('disabled', true);
        expect(nextPager.classList.toggle).toHaveBeenCalledWith('disabled', true);
    });

    test('当在最后一页时，末页和下一页按钮应该被禁用', () => {
        // 初始化组件
        const pager = new DCPager();

        // 模拟必要的属性
        pager.currentPage = 2;
        pager.totalPages = 2;

        // 调用updatePaginationState方法
        pager.updatePaginationState();

        // 验证分页按钮的状态
        const firstPager = document.querySelector('.dc-first-pager');
        const lastPager = document.querySelector('.dc-last-pager');
        const prevPager = document.querySelector('.dc-prev-pager');
        const nextPager = document.querySelector('.dc-next-pager');

        expect(firstPager.classList.toggle).toHaveBeenCalledWith('disabled', false);
        expect(prevPager.classList.toggle).toHaveBeenCalledWith('disabled', false);
        expect(lastPager.classList.toggle).toHaveBeenCalledWith('disabled', true);
        expect(nextPager.classList.toggle).toHaveBeenCalledWith('disabled', true);
    });

    test('renderPagination方法应该生成分页导航HTML', () => {
        // 初始化组件
        const pager = new DCPager();

        // 模拟必要的属性
        pager.currentPage = 2;
        pager.totalPages = 5;
        pager.paginationList = document.querySelector('.dc-dataTable-pagination-list');

        // 调用renderPagination方法
        pager.renderPagination();

        // 验证分页导航HTML是否生成
        expect(pager.paginationList.innerHTML).toContain('data-page="1"');
        expect(pager.paginationList.innerHTML).toContain('data-page="2"');
        expect(pager.paginationList.innerHTML).toContain('data-page="3"');
        expect(pager.paginationList.innerHTML).toContain('data-page="4"');
        expect(pager.paginationList.innerHTML).toContain('data-page="5"');
        expect(pager.paginationList.innerHTML).toContain('active');
    });
});
