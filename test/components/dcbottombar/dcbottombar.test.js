/**
 * dcbottombar 组件测试
 * 测试 DCBottomBar 组件的功能
 */

// 模拟 DOM 环境
if (typeof document === 'undefined') {
    global.document = {
        querySelector: () => null,
        querySelectorAll: () => [],
        createElement: () => ({
            classList: {
                add: () => {},
                remove: () => {},
                contains: () => false
            },
            appendChild: () => {},
            setAttribute: () => {},
            textContent: '',
            innerHTML: '',
            id: '',
            className: '',
            style: {},
            disabled: false,
            addEventListener: () => {},
            childNodes: [],
            nodeType: 1
        }),
        body: {
            appendChild: () => {}
        },
        head: {
            appendChild: () => {}
        }
    };
    global.HTMLElement = function() {};
    global.HTMLElement.prototype = {};
}

// 引入组件
const DCBottomBar = require('../../../src/components/dcbottombar/dcbottombar.js');

describe('DCBottomBar 组件测试', () => {
    let dcBottomBar;

    beforeEach(() => {
        // 模拟 document.querySelector
        jest.spyOn(document, 'querySelector').mockReturnValue({
            appendChild: jest.fn()
        });

        // 模拟 document.createElement
        jest.spyOn(document, 'createElement').mockImplementation((tag) => {
            const element = {
                classList: {
                    add: jest.fn(),
                    remove: jest.fn(),
                    contains: () => false
                },
                appendChild: jest.fn(),
                setAttribute: jest.fn(),
                textContent: '',
                innerHTML: '',
                id: '',
                className: '',
                style: {},
                disabled: false,
                addEventListener: () => {},
                childNodes: [],
                nodeType: 1
            };
            return element;
        });

        // 模拟 document.head.appendChild
        jest.spyOn(document.head, 'appendChild').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('DCBottomBar 构造函数应该正确初始化', () => {
        const options = {
            logo: 'logo.png',
            privacyPolicy: 'privacy.html',
            termsOfService: 'terms.html',
            cookies: 'cookies.html',
            feedback: 'feedback.html',
            copyright: '© 2023 Test Company',
            recordNumber: '京ICP备12345678号',
            otherInfo: 'All rights reserved',
            containerSelector: '#footer',
            customClass: 'custom-bottom-bar'
        };

        expect(() => {
            dcBottomBar = new DCBottomBar(options);
        }).not.toThrow();

        // 验证属性初始化正确
        expect(dcBottomBar.logo).toBe(options.logo);
        expect(dcBottomBar.privacyPolicy).toBe(options.privacyPolicy);
        expect(dcBottomBar.termsOfService).toBe(options.termsOfService);
        expect(dcBottomBar.cookies).toBe(options.cookies);
        expect(dcBottomBar.feedback).toBe(options.feedback);
        expect(dcBottomBar.copyright).toBe(options.copyright);
        expect(dcBottomBar.recordNumber).toBe(options.recordNumber);
        expect(dcBottomBar.otherInfo).toBe(options.otherInfo);
        expect(dcBottomBar.containerSelector).toBe(options.containerSelector);
        expect(dcBottomBar.customClass).toBe(options.customClass);
    });

    test('DCBottomBar 应该正确处理默认参数', () => {
        expect(() => {
            dcBottomBar = new DCBottomBar();
        }).not.toThrow();

        // 验证默认值设置正确
        expect(dcBottomBar.logo).toBe('');
        expect(dcBottomBar.privacyPolicy).toBe('#');
        expect(dcBottomBar.termsOfService).toBe('#');
        expect(dcBottomBar.cookies).toBe('#');
        expect(dcBottomBar.feedback).toBe('#');
        expect(dcBottomBar.copyright).toBe('© 2023 Your Company');
        expect(dcBottomBar.recordNumber).toBe('备案号');
        expect(dcBottomBar.otherInfo).toBe('其他版权相关内容');
        expect(dcBottomBar.containerSelector).toBe('body');
        expect(dcBottomBar.customClass).toBe('');
    });

    test('DCBottomBar 应该正确初始化', () => {
        dcBottomBar = new DCBottomBar();

        expect(() => {
            dcBottomBar.init();
        }).not.toThrow();

        // 验证 render 方法被调用（通过检查 container.innerHTML）
        expect(dcBottomBar.container.innerHTML).toBeTruthy();
    });

    test('DCBottomBar 应该正确渲染', () => {
        const options = {
            logo: 'logo.png',
            copyright: '© 2023 Test Company'
        };

        dcBottomBar = new DCBottomBar(options);
        dcBottomBar.init();

        // 验证渲染内容包含正确的信息
        expect(dcBottomBar.container.innerHTML).toContain('logo.png');
        expect(dcBottomBar.container.innerHTML).toContain('© 2023 Test Company');
        expect(dcBottomBar.container.innerHTML).toContain('隐私政策');
        expect(dcBottomBar.container.innerHTML).toContain('使用条款');
        expect(dcBottomBar.container.innerHTML).toContain('Cookies');
        expect(dcBottomBar.container.innerHTML).toContain('网站问题反馈');
    });

    test('DCBottomBar 应该处理容器选择器不存在的情况', () => {
        dcBottomBar = new DCBottomBar({ containerSelector: '#non-existent-container' });

        // 捕获控制台错误
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        dcBottomBar.init();

        // 验证控制台错误被调用
        expect(consoleErrorSpy).toHaveBeenCalledWith('Container with selector "#non-existent-container" not found.');

        // 恢复控制台
        consoleErrorSpy.mockRestore();
    });
});
