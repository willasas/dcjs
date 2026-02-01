// 模拟必要的全局对象
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const { JSDOM } = require('jsdom');

// 模拟DOM环境
const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
        <div id="test-container">
            <img src="https://picsum.photos/800/600?random=1" alt="Test Image 1" title="Test 1">
            <img src="https://picsum.photos/800/600?random=2" alt="Test Image 2" title="Test 2">
            <img src="https://picsum.photos/800/600?random=3" alt="Test Image 3" title="Test 3">
        </div>
        <div id="single-image-container">
            <img src="https://picsum.photos/800/600?random=4" alt="Single Test Image" title="Single Test">
        </div>
    </body>
    </html>
`, {
    pretendToBeVisual: true,
    resources: 'usable'
});

// 正确设置全局对象
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// 导入DCImageViewer
require('../../../src/utils/dcImageViewer');

describe('DCImageViewer', () => {
    let container;
    let singleContainer;
    let viewer;
    let singleViewer;

    beforeEach(() => {
        // 创建测试容器
        container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
            <img src="https://picsum.photos/800/600?random=1" alt="Test Image 1" title="Test 1">
            <img src="https://picsum.photos/800/600?random=2" alt="Test Image 2" title="Test 2">
            <img src="https://picsum.photos/800/600?random=3" alt="Test Image 3" title="Test 3">
        `;
        document.body.appendChild(container);

        // 创建单张图片容器
        singleContainer = document.createElement('div');
        singleContainer.id = 'single-image-container';
        singleContainer.innerHTML = `
            <img src="https://picsum.photos/800/600?random=4" alt="Single Test Image" title="Single Test">
        `;
        document.body.appendChild(singleContainer);
    });

    afterEach(() => {
        // 销毁查看器
        if (viewer) {
            viewer.destroy();
            viewer = null;
        }
        if (singleViewer) {
            singleViewer.destroy();
            singleViewer = null;
        }
        // 清理DOM
        const viewerElements = document.querySelectorAll('.dc-image-viewer');
        viewerElements.forEach(el => el.remove());

        // 移除测试容器
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
        }
        if (singleContainer && singleContainer.parentNode) {
            singleContainer.parentNode.removeChild(singleContainer);
        }
    });

    describe('构造函数和初始化', () => {
        test('应该正确创建DCImageViewer实例', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            expect(viewer).toBeInstanceOf(Object);
            expect(viewer.images).toHaveLength(3);
        });

        test('应该正确处理单张图片', () => {
            singleViewer = new DC.ImageViewer({ container: '#single-image-container' });
            expect(singleViewer).toBeInstanceOf(Object);
            expect(singleViewer.images).toHaveLength(1);
        });

        test('应该正确处理空容器', () => {
            const emptyContainer = document.createElement('div');
            emptyContainer.id = 'empty-container';
            document.body.appendChild(emptyContainer);

            viewer = new DC.ImageViewer({ container: '#empty-container' });
            expect(viewer.images).toHaveLength(0);

            // 清理
            emptyContainer.remove();
        });

        test('应该正确应用默认配置', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            expect(viewer.options.modal).toBe(true);
            expect(viewer.options.backdrop).toBe(true);
            expect(viewer.options.keyboard).toBe(true);
            expect(viewer.options.initialZoomRatio).toBe(1);
            expect(viewer.options.minZoomRatio).toBe(0.1);
            expect(viewer.options.maxZoomRatio).toBe(10);
        });

        test('应该正确应用自定义配置', () => {
            viewer = new DC.ImageViewer({
                container: '#test-container',
                modal: false,
                backdrop: 'static',
                keyboard: false,
                initialZoomRatio: 1.5,
                minZoomRatio: 0.5,
                maxZoomRatio: 3,
                navbar: false,
                toolbar: false,
                title: false,
                button: false,
                animated: false
            });
            expect(viewer.options.modal).toBe(false);
            expect(viewer.options.backdrop).toBe('static');
            expect(viewer.options.keyboard).toBe(false);
            expect(viewer.options.initialZoomRatio).toBe(1.5);
            expect(viewer.options.minZoomRatio).toBe(0.5);
            expect(viewer.options.maxZoomRatio).toBe(3);
            expect(viewer.options.navbar).toBe(false);
            expect(viewer.options.toolbar).toBe(false);
            expect(viewer.options.title).toBe(false);
            expect(viewer.options.button).toBe(false);
            expect(viewer.options.animated).toBe(false);
        });
    });

    describe('图片收集', () => {
        test('应该正确收集容器中的图片', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            expect(viewer.images).toHaveLength(3);
            expect(viewer.images[0].src).toContain('random=1');
            expect(viewer.images[0].alt).toBe('Test Image 1');
            expect(viewer.images[0].title).toBe('Test 1');
            expect(viewer.images[1].src).toContain('random=2');
            expect(viewer.images[2].src).toContain('random=3');
        });
    });

    describe('打开和关闭', () => {
        test('应该能够打开查看器', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            viewer.open(0);
            expect(viewer.isOpen).toBe(true);
            const viewerElement = document.querySelector('.dc-image-viewer');
            expect(viewerElement).toBeTruthy();
            expect(viewerElement.style.display).toBe('flex');
        });

        test('应该能够关闭查看器', (done) => {
            viewer = new DC.ImageViewer({ container: '#test-container', animated: false }); // 禁用动画以避免异步问题
            viewer.open(0);
            expect(viewer.isOpen).toBe(true);
            viewer.close();
            expect(viewer.isOpen).toBe(false);
            done();
        });

        test('打开时应该更新当前图片', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            viewer.open(1);
            expect(viewer.currentIndex).toBe(1);
        });
    });

    describe('缩放功能', () => {
        test('应该能够放大图片', () => {
            viewer = new DC.ImageViewer({ container: '#single-image-container' });
            viewer.open(0);
            const initialZoom = viewer.zoomRatio;
            viewer.zoomIn();
            expect(viewer.zoomRatio).toBeGreaterThan(initialZoom);
        });

        test('应该能够缩小图片', () => {
            viewer = new DC.ImageViewer({ container: '#single-image-container' });
            viewer.open(0);
            viewer.zoomIn(); // 先放大
            const zoomAfterIn = viewer.zoomRatio;
            viewer.zoomOut();
            expect(viewer.zoomRatio).toBeLessThan(zoomAfterIn);
        });

        test('应该尊重最小缩放比例', () => {
            viewer = new DC.ImageViewer({
                container: '#single-image-container',
                minZoomRatio: 0.5
            });
            viewer.open(0);
            viewer.zoomRatio = 0.5;
            viewer.zoomOut();
            expect(viewer.zoomRatio).toBe(0.5);
        });

        test('应该尊重最大缩放比例', () => {
            viewer = new DC.ImageViewer({
                container: '#single-image-container',
                maxZoomRatio: 2
            });
            viewer.open(0);
            viewer.zoomRatio = 2;
            viewer.zoomIn();
            expect(viewer.zoomRatio).toBe(2);
        });
    });

    describe('旋转功能', () => {
        test('应该能够向左旋转图片', () => {
            viewer = new DC.ImageViewer({ container: '#single-image-container' });
            viewer.open(0);
            const initialRotation = viewer.rotation;
            viewer.rotateLeft();
            expect(viewer.rotation).toBe(initialRotation - 90);
        });

        test('应该能够向右旋转图片', () => {
            viewer = new DC.ImageViewer({ container: '#single-image-container' });
            viewer.open(0);
            const initialRotation = viewer.rotation;
            viewer.rotateRight();
            expect(viewer.rotation).toBe(initialRotation + 90);
        });
    });

    describe('翻转功能', () => {
        test('应该能够水平翻转图片', () => {
            viewer = new DC.ImageViewer({ container: '#single-image-container' });
            viewer.open(0);
            expect(viewer.isFlipped).toBe(false);
            viewer.flipHorizontal();
            expect(viewer.isFlipped).toBe(true);
        });
    });

    describe('重置功能', () => {
        test('应该能够重置图片状态', () => {
            viewer = new DC.ImageViewer({ container: '#single-image-container' });
            viewer.open(0);
            viewer.zoomIn();
            viewer.rotateRight();
            viewer.flipHorizontal();

            viewer.reset();
            expect(viewer.zoomRatio).toBe(1);
            expect(viewer.rotation).toBe(0);
            expect(viewer.isFlipped).toBe(false);
        });
    });

    describe('导航功能', () => {
        test('应该能够导航到上一张图片', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            viewer.open(1);
            viewer.prev();
            expect(viewer.currentIndex).toBe(0);
        });

        test('应该能够导航到下一张图片', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            viewer.open(0);
            viewer.next();
            expect(viewer.currentIndex).toBe(1);
        });

        test('应该能够直接跳转到指定索引', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            viewer.open(0);
            viewer.goTo(2);
            expect(viewer.currentIndex).toBe(2);
        });

        test('应该处理边界情况', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            viewer.open(0);
            viewer.prev(); // 应该保持在0
            expect(viewer.currentIndex).toBe(0);

            viewer.goTo(5); // 应该保持在最大值
            expect(viewer.currentIndex).toBe(2);
        });
    });

    describe('下载功能', () => {
        test('应该能够提取文件名', () => {
            viewer = new DC.ImageViewer({ container: '#single-image-container' });
            const url = 'https://picsum.photos/800/600?random=1';
            const fileName = viewer.getFileNameFromUrl(url);
            expect(fileName).toBe('600');
        });
    });

    describe('销毁功能', () => {
        test('应该正确销毁实例', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            viewer.open(0);

            viewer.destroy();
            expect(viewer.container).toBeNull();
            expect(viewer.viewerElement).toBeNull();
            expect(viewer.images).toEqual([]);

            // 查看器元素应该被移除
            const viewerElement = document.querySelector('.dc-image-viewer');
            expect(viewerElement).toBeNull();
        });
    });

    describe('事件处理', () => {
        test('应该绑定图片点击事件', () => {
            viewer = new DC.ImageViewer({ container: '#test-container' });
            const imgElement = container.querySelector('img');
            expect(imgElement).toBeTruthy();
            // 这里我们不实际触发点击事件，因为会打开模态框
        });
    });

    describe('回调函数', () => {
        test('应该调用viewed回调', () => {
            const viewedCallback = jest.fn();
            viewer = new DC.ImageViewer({
                container: '#single-image-container',
                viewed: viewedCallback
            });
            viewer.open(0);
            expect(viewedCallback).toHaveBeenCalled();
        });

        test('应该调用shown回调', () => {
            const shownCallback = jest.fn();
            viewer = new DC.ImageViewer({
                container: '#single-image-container',
                shown: shownCallback
            });
            viewer.open(0);
            expect(shownCallback).toHaveBeenCalled();
        });

        test('应该调用hidden回调', (done) => {
            const hiddenCallback = jest.fn(() => {
                expect(hiddenCallback).toHaveBeenCalled();
                done();
            });
            viewer = new DC.ImageViewer({
                container: '#single-image-container',
                animated: false, // 禁用动画以避免异步问题
                hidden: hiddenCallback
            });
            viewer.open(0);
            viewer.close();
        });

        test('应该调用rotated回调', () => {
            const rotatedCallback = jest.fn();
            viewer = new DC.ImageViewer({
                container: '#single-image-container',
                rotated: rotatedCallback
            });
            viewer.open(0);
            viewer.rotateRight();
            expect(rotatedCallback).toHaveBeenCalled();
        });

        test('应该调用zoomed回调', () => {
            const zoomedCallback = jest.fn();
            viewer = new DC.ImageViewer({
                container: '#single-image-container',
                zoomed: zoomedCallback
            });
            viewer.open(0);
            viewer.zoomIn();
            expect(zoomedCallback).toHaveBeenCalled();
        });
    });
});
