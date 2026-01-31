/**
 * article 组件测试
 * 测试 DCArticleCard 和 DCArticleTopInfo 两个组件的功能
 */

// 模拟 DOM 环境
if (typeof document === 'undefined') {
    global.document = {
        querySelector: () => null,
        querySelectorAll: () => [],
        createElement: () => ({
            classList: {
                add: () => {}
            },
            appendChild: () => {},
            setAttribute: () => {},
            textContent: '',
            innerHTML: '',
            href: '',
            src: '',
            alt: '',
            style: {},
            childNodes: [],
            nodeType: 1
        }),
        body: {
            appendChild: () => {}
        },
        head: {
            insertBefore: () => {}
        }
    };
    global.HTMLElement = function() {};
    global.HTMLElement.prototype = {};
}

// 引入组件
const DCArticleCard = require('../../../src/components/article/dcarticlecard.js');
const DCArticleTopInfo = require('../../../src/components/article/dcarticletopinfo.js');

describe('DCArticleCard 组件测试', () => {
    let container;
    
    beforeEach(() => {
        // 创建测试容器
        container = {
            appendChild: jest.fn()
        };
        
        // 模拟 document.querySelector
        jest.spyOn(document, 'querySelector').mockReturnValue(null);
        
        // 模拟 document.createElement
        jest.spyOn(document, 'createElement').mockImplementation((tag) => {
            const element = {
                tagName: tag.toUpperCase(),
                classList: {
                    add: jest.fn()
                },
                appendChild: jest.fn(),
                setAttribute: jest.fn(),
                textContent: '',
                innerHTML: '',
                href: '',
                src: '',
                alt: '',
                style: {},
                childNodes: [],
                nodeType: 1
            };
            return element;
        });
        
        // 模拟 document.head.insertBefore
        jest.spyOn(document.head, 'insertBefore').mockImplementation(() => {});
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    test('DCArticleCard 构造函数应该正确初始化', () => {
        const mockArticleList = [
            {
                title: '测试文章 1',
                cover: 'test.jpg',
                articleHref: 'test1.html',
                content: '这是测试文章内容',
                updateTime: '2023-10-01',
                views: '1000',
                author: '测试作者',
                authorLink: 'author.html',
                status: ['置顶', '热门'],
                tags: [
                    { name: '测试', link: 'tag1.html' },
                    { name: '示例', link: 'tag2.html' }
                ]
            }
        ];
        
        const options = {
            articleList: mockArticleList
        };
        
        expect(() => {
            new DCArticleCard(options, container);
        }).not.toThrow();
        
        // 验证 createArticleStyle 被调用
        expect(document.head.insertBefore).toHaveBeenCalled();
        
        // 验证 createArticleCard 被调用
        expect(container.appendChild).toHaveBeenCalled();
    });
    
    test('DCArticleCard 应该处理空的文章列表', () => {
        const options = {
            articleList: []
        };
        
        expect(() => {
            new DCArticleCard(options, container);
        }).not.toThrow();
        
        // 验证 createArticleStyle 被调用
        expect(document.head.insertBefore).toHaveBeenCalled();
        
        // 验证 container.appendChild 没有被调用（因为文章列表为空）
        expect(container.appendChild).not.toHaveBeenCalled();
    });
    
    test('DCArticleCard 应该处理缺少属性的文章对象', () => {
        const mockArticleList = [
            {
                title: '测试文章 1'
                // 缺少其他属性
            }
        ];
        
        const options = {
            articleList: mockArticleList
        };
        
        expect(() => {
            new DCArticleCard(options, container);
        }).not.toThrow();
        
        // 验证 createArticleStyle 被调用
        expect(document.head.insertBefore).toHaveBeenCalled();
        
        // 验证 container.appendChild 被调用
        expect(container.appendChild).toHaveBeenCalled();
    });
});

describe('DCArticleTopInfo 组件测试', () => {
    let container;
    
    beforeEach(() => {
        // 创建测试容器
        container = {
            appendChild: jest.fn()
        };
        
        // 模拟 document.querySelector
        jest.spyOn(document, 'querySelector').mockReturnValue(null);
        
        // 模拟 document.createElement
        jest.spyOn(document, 'createElement').mockImplementation((tag) => {
            const element = {
                tagName: tag.toUpperCase(),
                classList: {
                    add: jest.fn()
                },
                appendChild: jest.fn(),
                setAttribute: jest.fn(),
                textContent: '',
                innerHTML: '',
                href: '',
                src: '',
                alt: '',
                style: {},
                childNodes: [],
                nodeType: 1
            };
            return element;
        });
        
        // 模拟 document.head.insertBefore
        jest.spyOn(document.head, 'insertBefore').mockImplementation(() => {});
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    test('DCArticleTopInfo 构造函数应该正确初始化', () => {
        expect(() => {
            new DCArticleTopInfo(
                '2023-10-01',
                '2023-10-10',
                '1000 字',
                '5 分钟',
                '1000 次',
                container
            );
        }).not.toThrow();
        
        // 验证 insertStyles 被调用
        expect(document.head.insertBefore).toHaveBeenCalled();
        
        // 验证 render 被调用
        expect(container.appendChild).toHaveBeenCalled();
    });
    
    test('DCArticleTopInfo 应该处理字符串选择器作为目标元素', () => {
        // 模拟 document.querySelector 返回容器
        jest.spyOn(document, 'querySelector').mockReturnValue(container);
        
        expect(() => {
            new DCArticleTopInfo(
                '2023-10-01',
                '2023-10-10',
                '1000 字',
                '5 分钟',
                '1000 次',
                '#test-container'
            );
        }).not.toThrow();
        
        // 验证 insertStyles 被调用
        expect(document.head.insertBefore).toHaveBeenCalled();
        
        // 验证 render 被调用
        expect(container.appendChild).toHaveBeenCalled();
    });
    
    test('DCArticleTopInfo 应该在目标元素无效时抛出错误', () => {
        expect(() => {
            new DCArticleTopInfo(
                '2023-10-01',
                '2023-10-10',
                '1000 字',
                '5 分钟',
                '1000 次',
                null
            );
        }).toThrow('Invalid targetElement. It must be a string selector or an HTMLElement.');
    });
});
