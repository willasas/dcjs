/**
 * cookies 组件测试
 * 测试 DCookiesPopup 组件的功能
 */

// 模拟 DOM 环境
if (typeof document === 'undefined') {
    global.document = {
        querySelector: () => ({
            appendChild: () => {}
        }),
        createElement: () => ({
            classList: {
                add: () => {}
            },
            appendChild: () => {},
            setAttribute: () => {},
            textContent: '',
            innerHTML: '',
            id: '',
            className: '',
            style: {},
            addEventListener: () => {},
            childNodes: [],
            nodeType: 1
        }),
        head: {
            appendChild: () => {}
        }
    };
    global.HTMLElement = function() {};
    global.HTMLElement.prototype = {};
}

// 引入组件
const DCookiesPopup = require('../../../src/components/cookies/dcookiespopup.js');

describe('DCookiesPopup 组件测试', () => {
    let cookiesPopup;
    
    beforeEach(() => {
        // 模拟 document.querySelector
        jest.spyOn(document, 'querySelector').mockReturnValue({
            appendChild: jest.fn()
        });
        
        // 模拟 document.createElement
        jest.spyOn(document, 'createElement').mockImplementation((tag) => {
            const element = {
                classList: {
                    add: jest.fn()
                },
                appendChild: jest.fn(),
                setAttribute: jest.fn(),
                textContent: '',
                innerHTML: '',
                id: '',
                className: '',
                style: {},
                addEventListener: () => {},
                childNodes: [],
                nodeType: 1
            };
            return element;
        });
        
        // 模拟 document.head.appendChild
        jest.spyOn(document.head, 'appendChild').mockImplementation(() => {});
        
        // 模拟 document.getElementById
        jest.spyOn(document, 'getElementById').mockImplementation((id) => {
            return {
                addEventListener: jest.fn()
            };
        });
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    test('DCookiesPopup 构造函数应该正确初始化', () => {
        const options = {
            title: 'Cookie 设置',
            description: '我们使用 Cookie 来改善您的浏览体验',
            privacyLink: 'privacy.html',
            cookiesLink: 'cookie.html',
            acceptText: '接受',
            rejectText: '拒绝',
            manageText: '管理 Cookie',
            containerSelector: '#container',
            customClass: 'custom-cookies-popup'
        };
        
        expect(() => {
            cookiesPopup = new DCookiesPopup(options);
        }).not.toThrow();
        
        // 验证属性初始化正确
        expect(cookiesPopup.title).toBe(options.title);
        expect(cookiesPopup.description).toBe(options.description);
        expect(cookiesPopup.privacyLink).toBe(options.privacyLink);
        expect(cookiesPopup.cookiesLink).toBe(options.cookiesLink);
        expect(cookiesPopup.acceptText).toBe(options.acceptText);
        expect(cookiesPopup.rejectText).toBe(options.rejectText);
        expect(cookiesPopup.manageText).toBe(options.manageText);
        expect(cookiesPopup.containerSelector).toBe(options.containerSelector);
        expect(cookiesPopup.customClass).toBe(options.customClass);
    });
    
    test('DCookiesPopup 应该使用默认值', () => {
        expect(() => {
            cookiesPopup = new DCookiesPopup();
        }).not.toThrow();
        
        // 验证默认值设置正确
        expect(cookiesPopup.title).toBe('Cookie Preferences');
        expect(cookiesPopup.containerSelector).toBe('body');
        expect(cookiesPopup.customClass).toBe('');
    });
    
    test('DCookiesPopup 应该正确初始化', () => {
        cookiesPopup = new DCookiesPopup();
        
        expect(() => {
            cookiesPopup.init();
        }).not.toThrow();
        
        // 验证 render 方法被调用（通过检查 container.innerHTML）
        expect(cookiesPopup.container.innerHTML).toBeTruthy();
    });
    
    test('DCookiesPopup 应该正确显示和隐藏', () => {
        cookiesPopup = new DCookiesPopup();
        
        // 初始化组件
        cookiesPopup.init();
        
        // 测试显示
        cookiesPopup.show();
        expect(cookiesPopup.container.style.display).toBe('block');
        
        // 测试隐藏
        cookiesPopup.hide();
        expect(cookiesPopup.container.style.display).toBe('none');
    });
    
    test('DCookiesPopup 应该处理容器选择器不存在的情况', () => {
        // 模拟 document.querySelector 返回 null
        jest.spyOn(document, 'querySelector').mockReturnValue(null);
        
        // 捕获控制台错误
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        
        cookiesPopup = new DCookiesPopup({ containerSelector: '#non-existent-container' });
        cookiesPopup.init();
        
        // 验证控制台错误被调用
        expect(consoleErrorSpy).toHaveBeenCalledWith('Container with selector "#non-existent-container" not found.');
        
        // 恢复控制台错误
        consoleErrorSpy.mockRestore();
    });
});
