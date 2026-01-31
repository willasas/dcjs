/**
 * DCity 测试
 */
const DCity = require('../../../src/components/dcity/dcity');

// 模拟 DOM 环境
if (typeof document === 'undefined') {
    global.document = {
        querySelector: () => ({
            appendChild: () => {},
            innerHTML: '',
            querySelector: () => ({
                addEventListener: () => {},
                disabled: false,
                innerHTML: '',
                value: ''
            }),
            querySelectorAll: () => []
        }),
        createElement: () => ({
            innerHTML: '',
            insertBefore: () => {}
        }),
        head: { insertBefore: () => {} }
    };
    global.window = {};
    global.fetch = () => Promise.resolve({
        json: () => Promise.resolve({
            '北京市': {
                code: '110000',
                city: {
                    '北京市': {
                        code: '110100',
                        country: {
                            '东城区': { code: '110101' },
                            '西城区': { code: '110102' }
                        }
                    }
                }
            },
            '上海市': {
                code: '310000',
                city: {
                    '上海市': {
                        code: '310100',
                        country: {
                            '黄浦区': { code: '310101' },
                            '徐汇区': { code: '310104' }
                        }
                    }
                }
            }
        })
    });
    global.console = {
        error: () => {}
    };
}

/**
 * 测试 DCity 类
 */
describe('DCity', () => {
    let dcity;
    let container;
    let onChangeCallback;

    beforeEach(() => {
        // 创建测试容器
        container = {
            appendChild: jest.fn(),
            innerHTML: '',
            querySelector: jest.fn((selector) => {
                if (selector === '.dc-province-select') {
                    return {
                        addEventListener: jest.fn(),
                        innerHTML: '',
                        value: ''
                    };
                }
                if (selector === '.dc-city-select') {
                    return {
                        addEventListener: jest.fn(),
                        disabled: true,
                        innerHTML: '',
                        value: ''
                    };
                }
                if (selector === '.dc-area-select') {
                    return {
                        addEventListener: jest.fn(),
                        disabled: true,
                        innerHTML: '',
                        value: ''
                    };
                }
            }),
            querySelectorAll: jest.fn()
        };
        
        // 创建测试回调
        onChangeCallback = jest.fn();

        // 模拟 document.querySelector
        const originalQuerySelector = document.querySelector;
        document.querySelector = jest.fn((selector) => {
            if (selector === '#test-container') {
                return container;
            }
            return originalQuerySelector(selector);
        });

        // 实例化 DCity
        dcity = new DCity({
            container: '#test-container',
            jsonPath: 'test-city-data.json',
            onChange: onChangeCallback
        });
    });

    afterEach(() => {
        // 清理
        dcity = null;
    });

    /**
     * 测试构造函数
     */
    describe('constructor', () => {
        test('should initialize with required parameters', () => {
            expect(dcity.container).toBe(container);
            expect(dcity.onChange).toBe(onChangeCallback);
            expect(dcity.data).toBeDefined();
        });

        test('should handle missing jsonPath', () => {
            expect(() => {
                new DCity({
                    container: '#test-container'
                });
            }).not.toThrow();
        });

        test('should load city data', async () => {
            // 等待数据加载完成
            await dcity.dataLoaded;
            expect(dcity.data.length).toBeGreaterThan(0);
        });
    });

    /**
     * 测试获取值
     */
    describe('getValue', () => {
        test('should return current address', () => {
            const address = dcity.getValue();
            expect(address).toBeDefined();
            expect(address.province).toBe('');
            expect(address.city).toBe('');
            expect(address.area).toBe('');
        });
    });

    /**
     * 测试设置值
     */
    describe('setValue', () => {
        test('should set address', async () => {
            // 等待数据加载完成
            await dcity.dataLoaded;

            // 设置地址
            dcity.setValue({
                province: '北京市',
                city: '北京市',
                area: '东城区'
            });

            // 验证地址是否被设置
            const address = dcity.getValue();
            expect(address.province).toBe('北京市');
            expect(address.city).toBe('北京市');
            expect(address.area).toBe('东城区');
        });

        test('should set only province', async () => {
            // 等待数据加载完成
            await dcity.dataLoaded;

            // 设置地址
            dcity.setValue({
                province: '北京市'
            });

            // 验证地址是否被设置
            const address = dcity.getValue();
            expect(address.province).toBe('北京市');
            expect(address.city).toBe('');
            expect(address.area).toBe('');
        });
    });

    /**
     * 测试获取完整地址
     */
    describe('getFullAddress', () => {
        test('should return full address', async () => {
            // 等待数据加载完成
            await dcity.dataLoaded;

            // 设置地址
            dcity.setValue({
                province: '北京市',
                city: '北京市',
                area: '东城区'
            });

            // 获取完整地址
            const fullAddress = dcity.getFullAddress();
            expect(fullAddress).toBeDefined();
            expect(fullAddress.province).toBeDefined();
            expect(fullAddress.city).toBeDefined();
            expect(fullAddress.area).toBeDefined();
        });

        test('should return null when no province selected', async () => {
            // 等待数据加载完成
            await dcity.dataLoaded;

            // 获取完整地址
            const fullAddress = dcity.getFullAddress();
            expect(fullAddress).toBeNull();
        });
    });

    /**
     * 测试根据代码获取地址
     */
    describe('getAddressByCode', () => {
        test('should return address by code', async () => {
            // 等待数据加载完成
            await dcity.dataLoaded;

            // 获取地址
            const address = dcity.getAddressByCode('110000');
            expect(address).toBeDefined();
            expect(address.province).toBe('北京市');
        });

        test('should return null when code not found', async () => {
            // 等待数据加载完成
            await dcity.dataLoaded;

            // 获取地址
            const address = dcity.getAddressByCode('999999');
            expect(address).toBeNull();
        });
    });

    /**
     * 测试获取子级地区
     */
    describe('getChildrenByCode', () => {
        test('should return children by code', async () => {
            // 等待数据加载完成
            await dcity.dataLoaded;

            // 获取子级地区
            const children = dcity.getChildrenByCode('110000');
            expect(children).toBeDefined();
            expect(Array.isArray(children)).toBe(true);
        });

        test('should return empty array when code not found', async () => {
            // 等待数据加载完成
            await dcity.dataLoaded;

            // 获取子级地区
            const children = dcity.getChildrenByCode('999999');
            expect(children).toEqual([]);
        });
    });

    /**
     * 测试格式化城市数据
     */
    describe('formatCityData', () => {
        test('should format city data', () => {
            const rawData = {
                '北京市': {
                    code: '110000',
                    city: {
                        '北京市': {
                            code: '110100',
                            country: {
                                '东城区': { code: '110101' }
                            }
                        }
                    }
                }
            };

            const formattedData = dcity.formatCityData(rawData);
            expect(formattedData).toBeDefined();
            expect(Array.isArray(formattedData)).toBe(true);
            expect(formattedData.length).toBe(1);
        });
    });

    /**
     * 测试错误处理
     */
    describe('error handling', () => {
        test('should handle missing container gracefully', () => {
            // 模拟 document.querySelector 返回 null
            const originalQuerySelector = document.querySelector;
            document.querySelector = jest.fn(() => null);

            expect(() => {
                new DCity({
                    container: '#non-existent-container',
                    jsonPath: 'test-city-data.json'
                });
            }).not.toThrow();

            // 恢复 originalQuerySelector
            document.querySelector = originalQuerySelector;
        });

        test('should handle invalid jsonPath gracefully', () => {
            // 模拟 fetch 失败
            const originalFetch = global.fetch;
            global.fetch = () => Promise.reject(new Error('Network error'));

            expect(() => {
                new DCity({
                    container: '#test-container',
                    jsonPath: 'invalid-path.json'
                });
            }).not.toThrow();

            // 恢复 originalFetch
            global.fetch = originalFetch;
        });
    });
});
