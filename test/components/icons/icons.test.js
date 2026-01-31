// 图标列表组件测试
const DCIconList = require('../../../src/components/icons/dciconlist.js');

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
            appendChild: jest.fn()
        }
    };
    
    // 模拟querySelector返回值
    document.querySelector.mockImplementation((selector) => {
        if (selector === 'title') {
            return { tagName: 'TITLE' };
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
            addEventListener: jest.fn()
        };
    });
    
    // 模拟navigator.clipboard
    global.navigator = {
        clipboard: {
            writeText: jest.fn().mockResolvedValue(undefined)
        }
    };
    
    // 模拟alert
    global.alert = jest.fn();
});

afterEach(() => {
    // 清除所有模拟
    jest.clearAllMocks();
});

describe('DCIconList 组件测试', () => {
    test('初始化组件时应该创建图标列表容器', () => {
        // 测试数据
        const iconData = {
            browser: [
                {
                    name: 'icon_add',
                    description: '加号',
                    url: '<svg class="icon icon_add" width="64px" height="64px" viewBox="0 0 1024 1024"><path fill="#000000" d="M884.392 476.688h-336.6v-336.6c0-19.422-15.891-35.312-35.313-35.312-19.421 0-35.311 15.89-35.311 35.312v336.6H140.567c-19.421 0-35.312 15.89-35.312 35.311 0 19.422 15.89 35.312 35.312 35.312h336.6v336.6c0 19.421 15.89 35.311 35.311 35.311 19.422 0 35.312-15.89 35.312-35.312V547.312h336.6c19.421 0 35.312-15.89 35.312-35.312 0.001-19.421-15.89-35.312-35.31-35.312z" /></svg>'
                }
            ]
        };
        
        // 初始化组件
        const iconList = new DCIconList('#test-container', iconData);
        
        // 验证是否创建了图标列表容器
        expect(document.createElement).toHaveBeenCalledWith('div');
        expect(document.body.appendChild).toHaveBeenCalled();
    });
    
    test('渲染图标列表时应该为每个类别创建标题和图标项', () => {
        // 测试数据
        const iconData = {
            browser: [
                {
                    name: 'icon_add',
                    description: '加号',
                    url: '<svg class="icon icon_add" width="64px" height="64px" viewBox="0 0 1024 1024"><path fill="#000000" d="M884.392 476.688h-336.6v-336.6c0-19.422-15.891-35.312-35.313-35.312-19.421 0-35.311 15.89-35.311 35.312v336.6H140.567c-19.421 0-35.312 15.89-35.312 35.311 0 19.422 15.89 35.312 35.312 35.312h336.6v336.6c0 19.421 15.89 35.311 35.311 35.311 19.422 0 35.312-15.89 35.312-35.312V547.312h336.6c19.421 0 35.312-15.89 35.312-35.312 0.001-19.421-15.89-35.312-35.31-35.312z" /></svg>'
                },
                {
                    name: 'icon_reduce',
                    description: '减号',
                    url: '<svg class="icon icon_reduce" width="64px" height="64px" viewBox="0 0 1024 1024"><path fill="#000000" d="M918.1 514.9c0 22.336-18.275 40.61-40.61 40.61H146.51c-22.336 0-40.61-18.274-40.61-40.61v-5.801c0-22.336 18.274-40.61 40.61-40.61h730.98c22.335 0 40.61 18.274 40.61 40.61v5.801z" /></svg>'
                }
            ]
        };
        
        // 初始化组件
        const iconList = new DCIconList('#test-container', iconData);
        
        // 验证是否创建了标题和图标项
        expect(document.createElement).toHaveBeenCalledWith('h2');
        expect(document.createElement).toHaveBeenCalledWith('li');
        expect(document.createElement).toHaveBeenCalledWith('h3');
        expect(document.createElement).toHaveBeenCalledWith('div');
    });
    
    test('添加复制功能时应该为图标项添加点击事件监听器', () => {
        // 测试数据
        const iconData = {
            browser: [
                {
                    name: 'icon_add',
                    description: '加号',
                    url: '<svg class="icon icon_add" width="64px" height="64px" viewBox="0 0 1024 1024"><path fill="#000000" d="M884.392 476.688h-336.6v-336.6c0-19.422-15.891-35.312-35.313-35.312-19.421 0-35.311 15.89-35.311 35.312v336.6H140.567c-19.421 0-35.312 15.89-35.312 35.311 0 19.422 15.89 35.312 35.312 35.312h336.6v336.6c0 19.421 15.89 35.311 35.311 35.311 19.422 0 35.312-15.89 35.312-35.312V547.312h336.6c19.421 0 35.312-15.89 35.312-35.312 0.001-19.421-15.89-35.312-35.31-35.312z" /></svg>'
                }
            ]
        };
        
        // 初始化组件
        const iconList = new DCIconList('#test-container', iconData);
        
        // 获取创建的容器元素
        const containerElement = document.createElement.mock.results.find(result => 
            result.value.setAttribute && result.value.className === 'icons-container'
        ).value;
        
        // 验证是否添加了点击事件监听器
        expect(containerElement.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });
    
    test('添加新图标时应该更新图标列表数据和DOM', () => {
        // 测试数据
        const initialData = {
            browser: [
                {
                    name: 'icon_add',
                    description: '加号',
                    url: '<svg class="icon icon_add" width="64px" height="64px" viewBox="0 0 1024 1024"><path fill="#000000" d="M884.392 476.688h-336.6v-336.6c0-19.422-15.891-35.312-35.313-35.312-19.421 0-35.311 15.89-35.311 35.312v336.6H140.567c-19.421 0-35.312 15.89-35.312 35.311 0 19.422 15.89 35.312 35.312 35.312h336.6v336.6c0 19.421 15.89 35.311 35.311 35.311 19.422 0 35.312-15.89 35.312-35.312V547.312h336.6c19.421 0 35.312-15.89 35.312-35.312 0.001-19.421-15.89-35.312-35.31-35.312z" /></svg>'
                }
            ]
        };
        
        // 初始化组件
        const iconList = new DCIconList('#test-container', initialData);
        
        // 模拟document.querySelector返回容器元素
        document.querySelector.mockImplementation((selector) => {
            if (selector === '#iconsContainer') {
                return {
                    querySelectorAll: jest.fn().mockReturnValue([]),
                    appendChild: jest.fn()
                };
            }
            return null;
        });
        
        // 新图标数据
        const newIcons = [
            {
                name: 'icon_new',
                description: '新图标',
                url: '<svg class="icon icon_new" width="64px" height="64px" viewBox="0 0 1024 1024"><path fill="#000000" d="M512 0C229.25 0 0 229.25 0 512s229.25 512 512 512 512-229.25 512-512S794.75 0 512 0z" /></svg>'
            }
        ];
        
        // 添加新图标
        iconList.addIcon('newCategory', newIcons);
        
        // 验证图标列表数据是否更新
        expect(iconList.iconList.newCategory).toBeDefined();
        expect(iconList.iconList.newCategory.length).toBe(1);
    });
    
    test('当指定的容器不存在时应该使用body作为默认容器', () => {
        // 测试数据
        const iconData = {
            browser: [
                {
                    name: 'icon_add',
                    description: '加号',
                    url: '<svg class="icon icon_add" width="64px" height="64px" viewBox="0 0 1024 1024"><path fill="#000000" d="M884.392 476.688h-336.6v-336.6c0-19.422-15.891-35.312-35.313-35.312-19.421 0-35.311 15.89-35.311 35.312v336.6H140.567c-19.421 0-35.312 15.89-35.312 35.311 0 19.422 15.89 35.312 35.312 35.312h336.6v336.6c0 19.421 15.89 35.311 35.311 35.311 19.422 0 35.312-15.89 35.312-35.312V547.312h336.6c19.421 0 35.312-15.89 35.312-35.312 0.001-19.421-15.89-35.312-35.31-35.312z" /></svg>'
                }
            ]
        };
        
        // 初始化组件，不指定容器
        const iconList = new DCIconList(null, iconData);
        
        // 验证是否使用了body作为容器
        expect(document.body.appendChild).toHaveBeenCalled();
    });
    
    test('当指定的容器不存在时应该抛出错误', () => {
        // 测试数据
        const iconData = {
            browser: [
                {
                    name: 'icon_add',
                    description: '加号',
                    url: '<svg class="icon icon_add" width="64px" height="64px" viewBox="0 0 1024 1024"><path fill="#000000" d="M884.392 476.688h-336.6v-336.6c0-19.422-15.891-35.312-35.313-35.312-19.421 0-35.311 15.89-35.311 35.312v336.6H140.567c-19.421 0-35.312 15.89-35.312 35.311 0 19.422 15.89 35.312 35.312 35.312h336.6v336.6c0 19.421 15.89 35.311 35.311 35.311 19.422 0 35.312-15.89 35.312-35.312V547.312h336.6c19.421 0 35.312-15.89 35.312-35.312 0.001-19.421-15.89-35.312-35.31-35.312z" /></svg>'
                }
            ]
        };
        
        // 模拟querySelector返回null
        document.querySelector.mockImplementation((selector) => {
            if (selector === '#non-existent-container') {
                return null;
            }
            if (selector === 'title') {
                return { tagName: 'TITLE' };
            }
            return null;
        });
        
        // 初始化组件，指定不存在的容器
        expect(() => {
            new DCIconList('#non-existent-container', iconData);
        }).toThrow('指定的容器 #non-existent-container 不存在');
    });
});
