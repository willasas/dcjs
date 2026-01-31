/**
 * DCFilter 测试
 */
const DCFilter = require('../../../src/components/dcfilter/dcfilter');

// 模拟 DOM 环境
if (typeof document === 'undefined') {
    global.document = {
        body: { appendChild: () => {} },
        createElement: () => ({
            className: '',
            innerHTML: '',
            querySelector: () => ({
                innerHTML: '',
                className: '',
                textContent: '',
                appendChild: () => {},
                closest: () => ({
                    querySelector: () => ({
                        className: '',
                        textContent: ''
                    }),
                    classList: {
                        toggle: () => {},
                        contains: () => false
                    }
                })
            }),
            querySelectorAll: () => [],
            appendChild: () => {},
            classList: {
                add: () => {},
                toggle: () => {},
                remove: () => {},
                contains: () => false
            }
        }),
        createElementNS: () => ({
            setAttribute: () => {},
            innerHTML: ''
        }),
        head: { insertBefore: () => {} },
        querySelector: () => ({ appendChild: () => {} })
    };
    global.window = {
        innerWidth: 1200,
        addEventListener: () => {}
    };
    global.console = {
        warn: () => {}
    };
}

/**
 * 测试 DCFilter 类
 */
describe('DCFilter', () => {
    let dcFilter;
    let container;
    let resultContainer;
    let callbacks;

    beforeEach(() => {
        // 创建测试容器
        container = { appendChild: jest.fn() };
        resultContainer = { innerHTML: '', appendChild: jest.fn() };
        
        // 创建测试数据
        const testData = [
            { id: 1, title: '产品1', category: 'category1', price: 'price1' },
            { id: 2, title: '产品2', category: 'category2', price: 'price1' },
            { id: 3, title: '产品3', category: 'category1', price: 'price2' },
            { id: 4, title: '产品4', category: 'category2', price: 'price2' }
        ];

        // 创建测试分类
        const testCategories = [
            {
                key: 'category',
                name: '分类',
                children: [
                    { name: '分类1', value: 'category1' },
                    { name: '分类2', value: 'category2' }
                ]
            },
            {
                key: 'price',
                name: '价格',
                children: [
                    { name: '价格1', value: 'price1' },
                    { name: '价格2', value: 'price2' }
                ]
            }
        ];

        // 创建测试回调
        callbacks = {
            onFilter: jest.fn(),
            onReset: jest.fn()
        };

        // 实例化 DCFilter
        dcFilter = new DCFilter({
            container,
            data: testData,
            categories: testCategories,
            resultContainer,
            ...callbacks
        });
    });

    afterEach(() => {
        // 清理
        dcFilter = null;
    });

    /**
     * 测试构造函数
     */
    describe('constructor', () => {
        test('should initialize with default parameters', () => {
            const defaultFilter = new DCFilter();
            expect(defaultFilter.config).toBeDefined();
            expect(defaultFilter.currentFilters).toBeDefined();
        });

        test('should initialize with custom parameters', () => {
            expect(dcFilter.config.container).toBe(container);
            expect(dcFilter.config.data.length).toBe(4);
            expect(dcFilter.config.categories.length).toBe(2);
            expect(dcFilter.config.resultContainer).toBe(resultContainer);
            expect(dcFilter.config.onFilter).toBe(callbacks.onFilter);
            expect(dcFilter.config.onReset).toBe(callbacks.onReset);
        });

        test('should initialize current filters', () => {
            const currentFilters = dcFilter.getCurrentFilters();
            expect(currentFilters).toBeDefined();
            expect(currentFilters.category).toEqual(['all']);
            expect(currentFilters.price).toEqual(['all']);
        });

        test('should initialize isMobile based on window width', () => {
            expect(dcFilter.isMobile).toBe(false);
        });
    });

    /**
     * 测试重置功能
     */
    describe('reset', () => {
        test('should reset filters to default', () => {
            // 修改筛选条件
            dcFilter.setFilters({ category: ['category1'] });
            
            // 重置筛选条件
            dcFilter.reset();
            
            // 验证筛选条件是否被重置
            const currentFilters = dcFilter.getCurrentFilters();
            expect(currentFilters.category).toEqual(['all']);
            expect(currentFilters.price).toEqual(['all']);
            
            // 验证回调是否被调用
            expect(callbacks.onReset).toHaveBeenCalled();
        });
    });

    /**
     * 测试获取当前筛选条件
     */
    describe('getCurrentFilters', () => {
        test('should return current filters', () => {
            const currentFilters = dcFilter.getCurrentFilters();
            expect(currentFilters).toBeDefined();
            expect(currentFilters.category).toEqual(['all']);
            expect(currentFilters.price).toEqual(['all']);
        });
    });

    /**
     * 测试设置筛选条件
     */
    describe('setFilters', () => {
        test('should set filters', () => {
            const filters = { category: ['category1'], price: ['price1'] };
            dcFilter.setFilters(filters);
            
            const currentFilters = dcFilter.getCurrentFilters();
            expect(currentFilters.category).toEqual(['category1']);
            expect(currentFilters.price).toEqual(['price1']);
        });

        test('should handle single value filters', () => {
            const filters = { category: 'category1' };
            dcFilter.setFilters(filters);
            
            const currentFilters = dcFilter.getCurrentFilters();
            expect(currentFilters.category).toEqual(['category1']);
        });
    });

    /**
     * 测试筛选功能
     */
    describe('applyFilters', () => {
        test('should apply filters and return results', () => {
            // 设置筛选条件
            dcFilter.setFilters({ category: ['category1'] });
            
            // 验证回调是否被调用
            expect(callbacks.onFilter).toHaveBeenCalled();
        });

        test('should handle no results', () => {
            // 设置一个没有结果的筛选条件
            dcFilter.setFilters({ category: ['nonexistent'] });
            
            // 验证回调是否被调用
            expect(callbacks.onFilter).toHaveBeenCalled();
        });
    });

    /**
     * 测试更新筛选条件
     */
    describe('updateFilter', () => {
        test('should update filter in single select mode', () => {
            // 创建单选模式的筛选器
            const singleSelectFilter = new DCFilter({
                container,
                data: [],
                categories: [{
                    key: 'category',
                    name: '分类',
                    children: [
                        { name: '分类1', value: 'category1' }
                    ]
                }],
                multiple: false
            });
            
            // 模拟更新筛选条件
            const mockItem = {
                dataset: { parent: 'category', value: 'category1' },
                closest: () => ({ querySelector: () => ({}) })
            };
            
            // 更新筛选条件
            singleSelectFilter.updateFilter('category', 'category1', mockItem);
            
            // 验证筛选条件是否被更新
            const currentFilters = singleSelectFilter.getCurrentFilters();
            expect(currentFilters.category).toEqual(['category1']);
        });

        test('should update filter in multiple select mode', () => {
            // 模拟更新筛选条件
            const mockItem = {
                dataset: { parent: 'category', value: 'category1' },
                closest: () => ({ querySelector: () => ({}) })
            };
            
            // 更新筛选条件
            dcFilter.updateFilter('category', 'category1', mockItem);
            
            // 验证筛选条件是否被更新
            const currentFilters = dcFilter.getCurrentFilters();
            expect(currentFilters.category).toEqual(['category1']);
        });

        test('should handle max selection limit', () => {
            // 模拟更新筛选条件
            const mockItem1 = {
                dataset: { parent: 'category', value: 'category1' },
                closest: () => ({ querySelector: () => ({}) })
            };
            
            const mockItem2 = {
                dataset: { parent: 'category', value: 'category2' },
                closest: () => ({ querySelector: () => ({}) })
            };
            
            // 设置最大选择数量为 1
            dcFilter.config.maxSelection = 1;
            
            // 更新筛选条件
            dcFilter.updateFilter('category', 'category1', mockItem1);
            dcFilter.updateFilter('category', 'category2', mockItem2);
            
            // 验证筛选条件是否被正确限制
            const currentFilters = dcFilter.getCurrentFilters();
            expect(currentFilters.category).toEqual(['category1']);
        });

        test('should handle all option', () => {
            // 模拟更新筛选条件
            const mockItem = {
                dataset: { parent: 'category', value: 'all' },
                closest: () => ({ querySelector: () => ({}) })
            };
            
            // 更新筛选条件
            dcFilter.updateFilter('category', 'all', mockItem);
            
            // 验证筛选条件是否被更新
            const currentFilters = dcFilter.getCurrentFilters();
            expect(currentFilters.category).toEqual(['all']);
        });
    });

    /**
     * 测试错误处理
     */
    describe('error handling', () => {
        test('should handle missing container gracefully', () => {
            expect(() => {
                new DCFilter({
                    data: [],
                    categories: []
                });
            }).not.toThrow();
        });

        test('should handle missing result container gracefully', () => {
            expect(() => {
                new DCFilter({
                    container,
                    data: [],
                    categories: []
                });
            }).not.toThrow();
        });

        test('should handle empty data gracefully', () => {
            expect(() => {
                new DCFilter({
                    container,
                    data: [],
                    categories: [{
                        key: 'category',
                        name: '分类',
                        children: []
                    }]
                });
            }).not.toThrow();
        });

        test('should handle empty categories gracefully', () => {
            expect(() => {
                new DCFilter({
                    container,
                    data: [],
                    categories: []
                });
            }).not.toThrow();
        });
    });
});
