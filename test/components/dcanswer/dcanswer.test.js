/**
 * dcanswer 组件测试
 * 测试 DCAnswer 组件的功能
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
const DCAnswer = require('../../../src/components/dcanswer/dcanswer.js');

describe('DCAnswer 组件测试', () => {
    let dcAnswer;

    beforeEach(() => {
        // 模拟 document.querySelector
        jest.spyOn(document, 'querySelector').mockReturnValue(null);

        // 模拟 document.querySelectorAll
        jest.spyOn(document, 'querySelectorAll').mockReturnValue([]);

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

        // 模拟 document.body.appendChild
        jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});

        // 模拟 document.head.appendChild
        jest.spyOn(document.head, 'appendChild').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('DCAnswer 构造函数应该正确初始化', () => {
        const questions = [
            {
                text: '问题 1',
                options: ['选项 1', '选项 2', '选项 3'],
                type: 'single'
            },
            {
                text: '问题 2',
                options: ['选项 A', '选项 B', '选项 C', '选项 D'],
                type: 'multiple'
            }
        ];

        expect(() => {
            dcAnswer = new DCAnswer(questions);
        }).not.toThrow();

        // 验证属性初始化正确
        expect(dcAnswer.questions).toEqual(questions);
        expect(dcAnswer.currentQuestionIndex).toBe(0);
        expect(dcAnswer.answers).toEqual([]);
        expect(dcAnswer.isSubmitted).toBe(false);
    });

    test('DCAnswer 应该正确处理默认参数', () => {
        expect(() => {
            dcAnswer = new DCAnswer();
        }).not.toThrow();

        // 验证默认值设置正确
        expect(dcAnswer.questions).toEqual([]);
        expect(dcAnswer.currentQuestionIndex).toBe(0);
        expect(dcAnswer.answers).toEqual([]);
    });

    test('DCAnswer 应该正确初始化', () => {
        const questions = [
            {
                text: '问题 1',
                options: ['选项 1', '选项 2'],
                type: 'single'
            }
        ];

        dcAnswer = new DCAnswer(questions);

        expect(() => {
            dcAnswer.init();
        }).not.toThrow();

        // 验证 render 方法被调用（通过检查 container.innerHTML）
        expect(dcAnswer.container.innerHTML).toBeTruthy();
    });

    test('DCAnswer 应该正确处理选项点击事件（单选）', () => {
        const questions = [
            {
                text: '问题 1',
                options: ['选项 1', '选项 2', '选项 3'],
                type: 'single'
            }
        ];

        dcAnswer = new DCAnswer(questions);
        dcAnswer.init();

        // 模拟选项元素
        const mockOptionElement = {
            classList: {
                add: jest.fn(),
                remove: jest.fn()
            }
        };

        // 测试单选逻辑
        dcAnswer.handleOptionClick(1, mockOptionElement, 'single');

        // 验证答案存储正确
        expect(dcAnswer.answers[0]).toEqual([1]);

        // 验证选项元素的选中状态被设置
        expect(mockOptionElement.classList.add).toHaveBeenCalledWith('selected');
    });

    test('DCAnswer 应该正确处理选项点击事件（多选）', () => {
        const questions = [
            {
                text: '问题 1',
                options: ['选项 1', '选项 2', '选项 3'],
                type: 'multiple'
            }
        ];

        dcAnswer = new DCAnswer(questions);
        dcAnswer.init();

        // 模拟选项元素
        const mockOptionElement = {
            classList: {
                add: jest.fn(),
                remove: jest.fn()
            }
        };

        // 测试多选逻辑 - 第一次点击（选中）
        dcAnswer.handleOptionClick(0, mockOptionElement, 'multiple');
        expect(dcAnswer.answers[0]).toEqual([0]);
        expect(mockOptionElement.classList.add).toHaveBeenCalledWith('selected');

        // 测试多选逻辑 - 第二次点击（取消选中）
        dcAnswer.handleOptionClick(0, mockOptionElement, 'multiple');
        expect(dcAnswer.answers[0]).toEqual([]);
        expect(mockOptionElement.classList.remove).toHaveBeenCalledWith('selected');
    });

    test('DCAnswer 应该正确处理问题导航', () => {
        const questions = [
            {
                text: '问题 1',
                options: ['选项 1', '选项 2'],
                type: 'single'
            },
            {
                text: '问题 2',
                options: ['选项 A', '选项 B'],
                type: 'single'
            },
            {
                text: '问题 3',
                options: ['选项 X', '选项 Y'],
                type: 'single'
            }
        ];

        dcAnswer = new DCAnswer(questions);
        dcAnswer.init();

        // 模拟 render 方法
        const renderSpy = jest.spyOn(dcAnswer, 'render').mockImplementation(() => {});

        // 测试下一题
        dcAnswer.nextQuestion();
        expect(dcAnswer.currentQuestionIndex).toBe(1);
        expect(renderSpy).toHaveBeenCalled();

        // 测试上一题
        dcAnswer.prevQuestion();
        expect(dcAnswer.currentQuestionIndex).toBe(0);
        expect(renderSpy).toHaveBeenCalled();

        // 测试边界情况 - 当前是第一题时点击上一题
        dcAnswer.prevQuestion();
        expect(dcAnswer.currentQuestionIndex).toBe(0);

        // 测试边界情况 - 当前是最后一题时点击下一题
        dcAnswer.currentQuestionIndex = 2;
        dcAnswer.nextQuestion();
        expect(dcAnswer.currentQuestionIndex).toBe(2);
    });

    test('DCAnswer 应该正确处理完成答题', () => {
        const questions = [
            {
                text: '问题 1',
                options: ['选项 1', '选项 2'],
                type: 'single'
            }
        ];

        dcAnswer = new DCAnswer(questions);
        dcAnswer.init();

        // 模拟完成按钮
        const mockFinishButton = {
            disabled: false
        };

        // 测试第一次完成答题
        dcAnswer.finishQuiz(mockFinishButton);
        expect(dcAnswer.isSubmitted).toBe(true);
        expect(mockFinishButton.disabled).toBe(true);

        // 测试重复完成答题
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        dcAnswer.finishQuiz(mockFinishButton);
        expect(consoleSpy).toHaveBeenCalledWith('答题结果已提交，不能重复提交。');

        // 恢复控制台
        consoleSpy.mockRestore();
    });
});
