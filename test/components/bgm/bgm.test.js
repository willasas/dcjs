/**
 * bgm 组件测试
 * 测试 DControlSound 和 DCSampleBGM 两个组件的功能
 */

// 模拟 DOM 环境
if (typeof document === 'undefined') {
    global.document = {
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
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
            href: '',
            src: '',
            id: '',
            className: '',
            style: {},
            paused: true,
            muted: false,
            volume: 0,
            loop: false,
            preload: '',
            play: () => Promise.resolve(),
            pause: () => {},
            dataset: {},
            addEventListener: () => {},
            childNodes: [],
            nodeType: 1
        }),
        body: {
            appendChild: () => {}
        },
        head: {
            insertBefore: () => {}
        },
        hidden: false,
        addEventListener: () => {}
    };
    global.HTMLElement = function() {};
    global.HTMLElement.prototype = {};
    global.HTMLAudioElement = function() {};
    global.HTMLAudioElement.prototype = {
        play: () => Promise.resolve(),
        pause: () => {},
        paused: true,
        muted: false,
        volume: 0,
        loop: false,
        preload: '',
        src: ''
    };
}

// 引入组件
const DControlSound = require('../../../src/components/bgm/dcontrolsound.js');
const DCSampleBGM = require('../../../src/components/bgm/dcsamplebgm.js');

describe('DControlSound 组件测试', () => {
    let controlSound;
    
    beforeEach(() => {
        // 模拟 document.querySelector
        jest.spyOn(document, 'querySelector').mockReturnValue(null);
        
        // 模拟 document.querySelectorAll
        jest.spyOn(document, 'querySelectorAll').mockReturnValue([]);
        
        // 模拟 document.getElementById
        jest.spyOn(document, 'getElementById').mockReturnValue(null);
        
        // 模拟 document.createElement
        jest.spyOn(document, 'createElement').mockImplementation((tag) => {
            const element = {
                tagName: tag.toUpperCase(),
                classList: {
                    add: jest.fn(),
                    remove: jest.fn(),
                    contains: jest.fn(() => false)
                },
                appendChild: jest.fn(),
                setAttribute: jest.fn(),
                textContent: '',
                innerHTML: '',
                href: '',
                src: '',
                id: '',
                className: '',
                style: {},
                paused: true,
                muted: false,
                volume: 0,
                loop: false,
                preload: '',
                play: () => Promise.resolve(),
                pause: () => {},
                dataset: {},
                addEventListener: () => {},
                childNodes: [],
                nodeType: 1
            };
            if (tag === 'audio') {
                element.play = () => Promise.resolve();
                element.pause = () => {};
                element.paused = true;
                element.muted = false;
                element.volume = 0;
                element.loop = false;
                element.preload = '';
                element.src = '';
            }
            return element;
        });
        
        // 模拟 document.head.insertBefore
        jest.spyOn(document.head, 'insertBefore').mockImplementation(() => {});
        
        // 模拟 document.body.appendChild
        jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
        
        // 模拟 document.addEventListener
        jest.spyOn(document, 'addEventListener').mockImplementation(() => {});
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    test('DControlSound 构造函数应该正确初始化', () => {
        const options = {
            bgmUrls: {
                '#audio-bgm1': './bgm1.mp3',
                '#audio-bgm2': './bgm2.mp3'
            },
            buttonMap: {
                '.btn-play': '#audio-bgm1'
            },
            defaultVolume: 0.5
        };
        
        expect(() => {
            controlSound = new DControlSound(options);
        }).not.toThrow();
        
        // 验证默认音量设置正确
        expect(controlSound.defaultVolume).toBe(0.5);
        
        // 验证 BGM 元素初始化
        expect(Object.keys(controlSound.bgmElements)).toHaveLength(2);
    });
    
    test('DControlSound 应该正确处理音频播放', () => {
        const options = {
            bgmUrls: {
                '#audio-bgm1': './bgm1.mp3'
            }
        };
        
        controlSound = new DControlSound(options);
        
        // 模拟音频元素
        const mockAudio = {
            paused: true,
            muted: true,
            volume: 0,
            play: jest.fn(() => Promise.resolve()),
            pause: jest.fn()
        };
        
        // 模拟 getAudioElementByIdOrClass 方法
        controlSound.getAudioElementByIdOrClass = jest.fn(() => mockAudio);
        
        // 测试播放音频
        controlSound.playAudio('#audio-bgm1');
        expect(mockAudio.play).toHaveBeenCalled();
        expect(mockAudio.muted).toBe(false);
        
        // 测试暂停音频
        mockAudio.paused = false;
        controlSound.pauseAudio('#audio-bgm1');
        expect(mockAudio.pause).toHaveBeenCalled();
    });
    
    test('DControlSound 应该正确设置音量', () => {
        const options = {
            bgmUrls: {
                '#audio-bgm1': './bgm1.mp3'
            }
        };
        
        controlSound = new DControlSound(options);
        
        // 模拟音频元素
        const mockAudio = {
            volume: 0
        };
        
        // 模拟 getAudioElementByIdOrClass 方法
        controlSound.getAudioElementByIdOrClass = jest.fn(() => mockAudio);
        
        // 测试设置音量
        controlSound.setVolumeById('#audio-bgm1', 0.7);
        expect(mockAudio.volume).toBe(0.7);
    });
    
    test('DControlSound 应该正确播放所有 BGM', () => {
        const options = {
            bgmUrls: {
                '#audio-bgm1': './bgm1.mp3',
                '#audio-bgm2': './bgm2.mp3'
            }
        };
        
        controlSound = new DControlSound(options);
        
        // 模拟音频元素
        const mockAudio1 = {
            paused: true,
            muted: true,
            play: jest.fn(() => Promise.resolve())
        };
        
        const mockAudio2 = {
            paused: true,
            muted: true,
            play: jest.fn(() => Promise.resolve())
        };
        
        // 替换 bgmElements
        controlSound.bgmElements = {
            '#audio-bgm1': mockAudio1,
            '#audio-bgm2': mockAudio2
        };
        
        // 测试播放所有 BGM
        controlSound.playAllBgms();
        expect(mockAudio1.play).toHaveBeenCalled();
        expect(mockAudio2.play).toHaveBeenCalled();
        expect(mockAudio1.muted).toBe(false);
        expect(mockAudio2.muted).toBe(false);
    });
});

describe('DCSampleBGM 组件测试', () => {
    let sampleBGM;
    
    beforeEach(() => {
        // 模拟 DOM 元素
        jest.spyOn(document, 'querySelector').mockReturnValue({
            classList: {
                add: jest.fn(),
                remove: jest.fn()
            }
        });
        
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
                href: '',
                src: '',
                id: '',
                className: '',
                style: {},
                paused: true,
                muted: false,
                volume: 0,
                loop: false,
                preload: '',
                play: () => Promise.resolve(),
                pause: () => {},
                dataset: {},
                addEventListener: () => {},
                childNodes: [],
                nodeType: 1
            };
            return element;
        });
        
        jest.spyOn(document.head, 'insertBefore').mockImplementation(() => {});
        
        // 模拟容器元素
        const mockContainer = {
            appendChild: jest.fn()
        };
        
        jest.spyOn(document, 'querySelector').mockReturnValue(mockContainer);
    });
    
    afterEach(() => {
        jest.clearAllMocks();
        // 清除定时器
        if (sampleBGM && sampleBGM.interval) {
            clearInterval(sampleBGM.interval);
        }
    });
    
    test('DCSampleBGM 构造函数应该正确初始化', () => {
        const bgmList = ['./bgm1.mp3', './bgm2.mp3'];
        
        expect(() => {
            sampleBGM = new DCSampleBGM('bgm-audio', 'bgm-btn', 'bgm-icon', bgmList, 'body');
        }).not.toThrow();
        
        // 验证 BGM 列表初始化正确
        expect(sampleBGM.bgmList).toEqual(bgmList);
    });
    
    test('DCSampleBGM 应该正确处理音乐播放', () => {
        const bgmList = ['./bgm1.mp3', './bgm2.mp3'];
        sampleBGM = new DCSampleBGM('bgm-audio', 'bgm-btn', 'bgm-icon', bgmList, 'body');
        
        // 模拟音频元素
        sampleBGM.bgmAudio = {
            paused: true,
            src: '',
            play: jest.fn(() => Promise.resolve()),
            pause: jest.fn()
        };
        
        // 模拟 DOM 操作方法
        sampleBGM.rotate = jest.fn();
        
        // 测试播放音乐
        sampleBGM.playMusic(bgmList);
        expect(sampleBGM.bgmAudio.play).toHaveBeenCalled();
        expect(sampleBGM.rotate).toHaveBeenCalled();
        
        // 测试暂停音乐
        sampleBGM.bgmAudio.paused = false;
        sampleBGM.playMusic(bgmList);
        expect(sampleBGM.bgmAudio.pause).toHaveBeenCalled();
    });
    
    test('DCSampleBGM 应该正确获取随机索引', () => {
        const bgmList = ['./bgm1.mp3', './bgm2.mp3', './bgm3.mp3'];
        sampleBGM = new DCSampleBGM('bgm-audio', 'bgm-btn', 'bgm-icon', bgmList, 'body');
        
        const index = sampleBGM.getRandomIndex(bgmList);
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(bgmList.length);
    });
});
