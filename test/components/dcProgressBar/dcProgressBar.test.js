const { JSDOM } = require('jsdom');

// 模拟 DOM 环境
const { window } = new JSDOM('<!DOCTYPE html><html><body><div id="progress-container"></div></body></html>');
global.window = window;
global.document = window.document;
global.navigator = window.navigator;

// 模拟 DC 命名空间
global.DC = global.DC || {};

// 测试前导入组件
const fs = require('fs');
const path = require('path');
const componentPath = path.join(__dirname, '../../..', 'src/components/dcprogressbar/dcprogressbar.js');
const componentCode = fs.readFileSync(componentPath, 'utf8');
eval(componentCode);

// 测试 DCProgressBar 组件
describe('DCProgressBar 组件测试', () => {
    let progressBar;
    let container;

    beforeEach(() => {
        // 创建测试容器
        container = document.createElement('div');
        container.id = 'test-progress';
        document.body.appendChild(container);
    });

    afterEach(() => {
        // 清理测试容器
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
        progressBar = null;
    });

    test('应该能够初始化进度条组件', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 0,
            max: 100,
            color: '#007bff'
        });

        expect(progressBar).toBeDefined();
        expect(progressBar.container).toBe(container);
        expect(progressBar.options.value).toBe(0);
        expect(progressBar.options.max).toBe(100);
    });

    test('应该能够正确渲染进度条', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 50,
            max: 100,
            color: '#28a745'
        });

        const progressElement = container.querySelector('.dc-progress-bar');
        const progressFill = container.querySelector('.dc-progress-fill');

        expect(progressElement).toBeDefined();
        expect(progressFill).toBeDefined();
        expect(progressFill.style.width).toBe('50%');
        expect(progressFill.style.backgroundColor).toBe('#28a745');
    });

    test('应该能够更新进度值', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 0,
            max: 100
        });

        progressBar.setValue(75);
        const progressFill = container.querySelector('.dc-progress-fill');

        expect(progressBar.getValue()).toBe(75);
        expect(progressFill.style.width).toBe('75%');
    });

    test('应该能够设置最大值', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 50,
            max: 100
        });

        progressBar.setMax(200);
        const progressFill = container.querySelector('.dc-progress-fill');

        expect(progressBar.getMax()).toBe(200);
        expect(progressFill.style.width).toBe('25%'); // 50/200 = 25%
    });

    test('应该能够设置颜色', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 50,
            max: 100,
            color: '#dc3545'
        });

        progressBar.setColor('#ffc107');
        const progressFill = container.querySelector('.dc-progress-fill');

        expect(progressBar.getColor()).toBe('#ffc107');
        expect(progressFill.style.backgroundColor).toBe('#ffc107');
    });

    test('应该能够重置进度条', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 75,
            max: 100
        });

        progressBar.reset();
        const progressFill = container.querySelector('.dc-progress-fill');

        expect(progressBar.getValue()).toBe(0);
        expect(progressFill.style.width).toBe('0%');
    });

    test('应该能够销毁进度条', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 50,
            max: 100
        });

        progressBar.destroy();
        const progressElement = container.querySelector('.dc-progress-bar');

        expect(progressElement).toBeNull();
    });

    test('应该能够处理边界值', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 0,
            max: 100
        });

        // 测试最小值
        progressBar.setValue(-10);
        expect(progressBar.getValue()).toBe(0);

        // 测试最大值
        progressBar.setValue(150);
        expect(progressBar.getValue()).toBe(100);

        // 测试零最大值
        expect(() => {
            progressBar.setMax(0);
        }).not.toThrow();
    });

    test('应该能够处理自定义样式', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 50,
            max: 100,
            height: '20px',
            borderRadius: '10px',
            backgroundColor: '#e9ecef'
        });

        const progressElement = container.querySelector('.dc-progress-bar');
        const progressFill = container.querySelector('.dc-progress-fill');

        expect(progressElement.style.height).toBe('20px');
        expect(progressElement.style.borderRadius).toBe('10px');
        expect(progressElement.style.backgroundColor).toBe('#e9ecef');
    });

    test('应该能够处理动画效果', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 0,
            max: 100,
            animated: true
        });

        const progressFill = container.querySelector('.dc-progress-fill');
        expect(progressFill.classList.contains('dc-progress-fill-animated')).toBe(true);

        // 测试更新动画
        progressBar.setValue(75);
        expect(progressBar.getValue()).toBe(75);
    });

    test('应该能够获取当前进度百分比', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 75,
            max: 100
        });

        const percentage = progressBar.getPercentage();
        expect(percentage).toBe(75);

        // 测试不同最大值的情况
        progressBar.setMax(200);
        const percentage2 = progressBar.getPercentage();
        expect(percentage2).toBe(37.5); // 75/200 = 37.5%
    });

    test('应该能够处理未找到容器的情况', () => {
        // 测试不存在的容器
        expect(() => {
            progressBar = new DC.ProgressBar('non-existent-container', {
                value: 0,
                max: 100
            });
        }).not.toThrow();
        expect(progressBar).toBeDefined();
        expect(progressBar.container).toBeNull();
    });

    test('应该能够处理无效的参数', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 'invalid',
            max: 'invalid'
        });

        expect(progressBar.options.value).toBe(0);
        expect(progressBar.options.max).toBe(100);
    });

    test('应该能够链式调用方法', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 0,
            max: 100
        });

        // 测试链式调用
        const result = progressBar.setValue(50).setColor('#28a745').setMax(200);
        expect(result).toBe(progressBar);
        expect(progressBar.getValue()).toBe(50);
        expect(progressBar.getMax()).toBe(200);
        expect(progressBar.getColor()).toBe('#28a745');
    });

    test('应该能够响应配置选项的变化', () => {
        progressBar = new DC.ProgressBar('test-progress', {
            value: 0,
            max: 100,
            color: '#007bff'
        });

        // 更新配置
        progressBar.setOptions({
            value: 60,
            max: 150,
            color: '#17a2b8'
        });

        const progressFill = container.querySelector('.dc-progress-fill');
        expect(progressBar.getValue()).toBe(60);
        expect(progressBar.getMax()).toBe(150);
        expect(progressBar.getColor()).toBe('#17a2b8');
        expect(progressFill.style.width).toBe('40%'); // 60/150 = 40%
        expect(progressFill.style.backgroundColor).toBe('#17a2b8');
    });
});

// 测试 DCProgressBar 静态方法
describe('DCProgressBar 静态方法测试', () => {
    test('应该能够创建默认进度条', () => {
        const container = document.createElement('div');
        container.id = 'default-progress';
        document.body.appendChild(container);

        const progressBar = DC.ProgressBar.create('default-progress');
        expect(progressBar).toBeDefined();
        expect(progressBar.options.value).toBe(0);
        expect(progressBar.options.max).toBe(100);

        // 清理
        container.parentNode.removeChild(container);
    });

    test('应该能够创建带配置的进度条', () => {
        const container = document.createElement('div');
        container.id = 'custom-progress';
        document.body.appendChild(container);

        const progressBar = DC.ProgressBar.create('custom-progress', {
            value: 30,
            max: 200,
            color: '#dc3545'
        });

        expect(progressBar).toBeDefined();
        expect(progressBar.options.value).toBe(30);
        expect(progressBar.options.max).toBe(200);
        expect(progressBar.options.color).toBe('#dc3545');

        // 清理
        container.parentNode.removeChild(container);
    });
});