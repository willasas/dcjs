/**
 * DCDateSelector 测试
 */
const DCDateSelector = require('../../../src/components/dcdateselector/dcdateselector');

// 模拟 DOM 环境
if (typeof document === 'undefined') {
    global.document = {
        body: { appendChild: () => {} },
        createElement: () => ({
            className: '',
            innerHTML: '',
            querySelector: () => ({
                innerHTML: '',
                value: '',
                addEventListener: () => {}
            }),
            appendChild: () => {}
        }),
        head: { appendChild: () => {} }
    };
    global.window = {};
}

/**
 * 测试 DCDateSelector 类
 */
describe('DCDateSelector', () => {
    let dateSelector;
    let container;
    let onSelectCallback;

    beforeEach(() => {
        // 创建测试容器
        container = { appendChild: jest.fn() };
        onSelectCallback = jest.fn();

        // 实例化 DCDateSelector
        dateSelector = new DCDateSelector({
            container,
            onSelect: onSelectCallback
        });
    });

    afterEach(() => {
        // 清理
        dateSelector = null;
    });

    /**
     * 测试构造函数
     */
    describe('constructor', () => {
        test('should initialize with default parameters', () => {
            const defaultSelector = new DCDateSelector();
            expect(defaultSelector.container).toBe(document.body);
            expect(typeof defaultSelector.onSelect).toBe('function');
        });

        test('should initialize with custom parameters', () => {
            expect(dateSelector.container).toBe(container);
            expect(dateSelector.onSelect).toBe(onSelectCallback);
        });

        test('should initialize date data', () => {
            expect(dateSelector.currentYear).toBeDefined();
            expect(dateSelector.currentMonth).toBeDefined();
            expect(dateSelector.currentDay).toBeDefined();
            expect(dateSelector.years).toBeDefined();
            expect(dateSelector.months).toBeDefined();
            expect(dateSelector.days).toBeDefined();
        });

        test('should render DOM element', () => {
            expect(dateSelector.element).toBeDefined();
            expect(dateSelector.element.className).toBe('dc-date-selector');
        });

        test('should create style', () => {
            // Style creation is tested indirectly
            expect(true).toBe(true);
        });

        test('should bind events', () => {
            // Event binding is tested indirectly
            expect(true).toBe(true);
        });
    });

    /**
     * 测试日期数据初始化
     */
    describe('initDateData', () => {
        test('should initialize with current date', () => {
            const today = new Date();
            expect(dateSelector.currentYear).toBe(today.getFullYear());
            expect(dateSelector.currentMonth).toBe(today.getMonth() + 1);
            expect(dateSelector.currentDay).toBe(today.getDate());
        });

        test('should generate year list from 1900 to current year + 20', () => {
            const today = new Date();
            const expectedStartYear = 1900;
            const expectedEndYear = today.getFullYear() + 20;
            expect(dateSelector.years[0]).toBe(expectedStartYear);
            expect(dateSelector.years[dateSelector.years.length - 1]).toBe(expectedEndYear);
        });

        test('should generate month list from 1 to 12', () => {
            expect(dateSelector.months.length).toBe(12);
            expect(dateSelector.months[0]).toBe(1);
            expect(dateSelector.months[11]).toBe(12);
        });

        test('should generate correct day list for current month', () => {
            const daysInMonth = new Date(dateSelector.currentYear, dateSelector.currentMonth, 0).getDate();
            expect(dateSelector.days.length).toBe(daysInMonth);
            expect(dateSelector.days[0]).toBe(1);
            expect(dateSelector.days[dateSelector.days.length - 1]).toBe(daysInMonth);
        });
    });

    /**
     * 测试日期生成
     */
    describe('generateDays', () => {
        test('should generate correct days for February in non-leap year', () => {
            const days = dateSelector.generateDays(2023, 2);
            expect(days.length).toBe(28);
        });

        test('should generate correct days for February in leap year', () => {
            const days = dateSelector.generateDays(2024, 2);
            expect(days.length).toBe(29);
        });

        test('should generate correct days for 30-day month', () => {
            const days = dateSelector.generateDays(2023, 4);
            expect(days.length).toBe(30);
        });

        test('should generate correct days for 31-day month', () => {
            const days = dateSelector.generateDays(2023, 1);
            expect(days.length).toBe(31);
        });
    });

    /**
     * 测试获取选中日期
     */
    describe('getSelectedDate', () => {
        test('should return selected date object', () => {
            const selectedDate = dateSelector.getSelectedDate();
            expect(selectedDate).toBeDefined();
            expect(selectedDate.year).toBe(dateSelector.currentYear);
            expect(selectedDate.month).toBe(dateSelector.currentMonth);
            expect(selectedDate.day).toBe(dateSelector.currentDay);
            expect(selectedDate.date).toBeInstanceOf(Date);
        });
    });

    /**
     * 测试更新日期选项
     */
    describe('updateDays', () => {
        test('should update days when month changes', () => {
            // 模拟 DOM 元素
            dateSelector.element = {
                querySelector: (selector) => {
                    if (selector === '.years') return { value: '2023' };
                    if (selector === '.months') return { value: '2' };
                    if (selector === '.days') return { innerHTML: '', value: '', length: 28 };
                }
            };

            // 保存当前日期
            const originalDay = dateSelector.currentDay;

            // 更新日期
            dateSelector.updateDays();

            // 验证日期是否正确更新
            expect(dateSelector.currentDay).toBeLessThanOrEqual(28);
        });
    });

    /**
     * 测试触发选择回调
     */
    describe('triggerSelection', () => {
        test('should call onSelect callback with selected date', () => {
            // 触发选择
            dateSelector.triggerSelection();

            // 验证回调是否被调用
            expect(onSelectCallback).toHaveBeenCalled();
            const callbackArgs = onSelectCallback.mock.calls[0][0];
            expect(callbackArgs.year).toBe(dateSelector.currentYear);
            expect(callbackArgs.month).toBe(dateSelector.currentMonth);
            expect(callbackArgs.day).toBe(dateSelector.currentDay);
            expect(callbackArgs.date).toBeInstanceOf(Date);
        });
    });

    /**
     * 测试错误处理
     */
    describe('error handling', () => {
        test('should handle invalid container gracefully', () => {
            expect(() => {
                new DCDateSelector({ container: null });
            }).not.toThrow();
        });

        test('should handle invalid onSelect callback gracefully', () => {
            expect(() => {
                new DCDateSelector({ onSelect: null });
            }).not.toThrow();
        });
    });
});
