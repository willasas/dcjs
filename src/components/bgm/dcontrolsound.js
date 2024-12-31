// 用于控制页面上的音频播放
class DControlSound {
    /**
     * 构造函数，初始化 DControlSound 实例
     * @param {Object} options - 配置选项
     * @param {number} options.defaultVolume - 默认音量，默认为 0.3
     * @param {Object} options.bgmUrls - BGM 音频的 URL 映射
     * @param {Object} options.buttonMap - 按钮与音频 ID 的映射
     */
    constructor(options = {}) {
        this.defaultVolume = options.defaultVolume || 0.3;
        this.userInteracted = false;

        // 初始化 BGM 元素和 URL
        this.bgmElements = {};
        this.initializeBgmElements(options.bgmUrls);

        // 初始化按钮事件
        this.initButtonEvents(options.buttonMap);

        // 立即初始化
        this.init();
    }

    /**
     * 根据选择器获取页面上的元素
     * @param {string} selector - 元素的 ID 或类名
     * @returns {HTMLElement} - 获取到的元素
     */
    getElementByIdOrClass(selector) {
        if (selector.startsWith('#')) {
            return document.getElementById(selector.slice(1));
        } else if (selector.startsWith('.')) {
            return document.querySelector(selector);
        } else {
            console.error(`Invalid selector format: ${selector}`);
            return null;
        }
    }

    /**
     * 根据选择器获取页面上的音频元素
     * @param {string} selector - 音频元素的 ID 或类名
     * @returns {HTMLAudioElement} - 获取到的音频元素
     */
    getAudioElementByIdOrClass(selector) {
        return this.getElementByIdOrClass(selector);
    }

    /**
     * 创建并插入 audio 标签
     * @param {string} id - audio 标签的 ID
     * @param {string} src - audio 标签的 src 属性
     * @returns {HTMLAudioElement} - 创建的 audio 元素
     */
    createAudioElement(id, src) {
        const audio = document.createElement('audio');
        audio.id = id;
        audio.src = src;
        audio.muted = true; // 初始状态设为静音
        audio.loop = true;
        audio.hidden = true;
        audio.preload = 'auto';
        document.body.appendChild(audio);
        return audio;
    }

    /**
     * 初始化 BGM 元素和 URL
     * @param {Object} bgmUrls - BGM 的 URL 对象，键为选择器，值为 URL
     */
    initializeBgmElements(bgmUrls) {
        for (const [selector, url] of Object.entries(bgmUrls)) {
            let element = this.getAudioElementByIdOrClass(selector);
            if (!element) {
                element = this.createAudioElement(selector.slice(1), url);
            } else {
                element.src = url;
            }
            this.bgmElements[selector] = element;
        }
    }

    /**
     * 初始化按钮事件
     * @param {Object} buttonMap - 按钮映射对象，键为按钮选择器，值为对应的音频选择器
     */
    initButtonEvents(buttonMap) {
        console.log('buttonMap:', buttonMap);

        for (const [buttonSelector, audioSelector] of Object.entries(buttonMap)) {
            const buttons = document.querySelectorAll(buttonSelector);
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    if (!this.userInteracted) {
                        this.userInteracted = true;
                        this.playAudio(audioSelector);
                    } else {
                        this.playAudio(audioSelector);
                    }
                });
            });
        }
    }

    /**
     * 初始化 DControlSound 实例
     */
    init() {
        this.setAllBgmVolumes();
        this.listenPageVisibility();
    }

    /**
     * 设置所有 BGM 元素的音量
     */
    setAllBgmVolumes() {
        for (const element of Object.values(this.bgmElements)) {
            if (element) {
                element.volume = this.defaultVolume;
            }
        }
    }

    /**
     * 播放所有 BGM
     */
    playAllBgms() {
        for (const element of Object.values(this.bgmElements)) {
            if (element) {
                this.playAudio(element);
            }
        }
    }

    /**
     * 播放音频
     * @param {string|HTMLAudioElement} audio - 音频的 ID 或音频元素
     * @param {boolean} [unmute=true] - 是否取消静音
     */
    playAudio(audio, unmute = true) {
        let audioElement;
        if (typeof audio === 'string') {
            audioElement = this.getAudioElementByIdOrClass(audio);
            if (!audioElement) {
                console.error(`Invalid audio element for audioId: ${audio}`);
                return;
            }
        } else {
            audioElement = audio;
        }

        if (audioElement.paused) {
            if (unmute) {
                audioElement.muted = false; // 取消静音
            }
            audioElement.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    }

    /**
     * 暂停音频
     * @param {string|HTMLAudioElement} audio - 音频的 ID 或音频元素
     */
    pauseAudio(audio) {
        let audioElement;
        if (typeof audio === 'string') {
            audioElement = this.getAudioElementByIdOrClass(audio);
            if (!audioElement) {
                console.error(`Invalid audio element for audioId: ${audio}`);
                return;
            }
        } else {
            audioElement = audio;
        }

        if (!audioElement.paused) {
            audioElement.pause();
        }
    }

    /**
     * 设置指定 ID 的语音音量
     * @param {string} voiceId - 语音的 ID
     * @param {number} volume - 音量大小
     */
    setVolumeById(voiceId, volume) {
        const audioElement = this.getAudioElementByIdOrClass(voiceId);
        if (audioElement) {
            audioElement.volume = volume;
        } else {
            console.error(`Invalid audio element for voiceId: ${voiceId}`);
        }
    }

    /**
     * 监听页面的可见性变化
     */
    listenPageVisibility() {
        const hiddenProperty = "hidden" in document ? "hidden" : "webkitHidden" in document ? "webkitHidden" : "mozHidden" in document ? "mozHidden" : null;
        const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, "visibilitychange");

        const onVisibilityChange = () => {
            if (!document[hiddenProperty]) {
                for (const element of Object.values(this.bgmElements)) {
                    if (!element.paused) {
                        this.playAudio(element);
                    }
                }
            } else {
                for (const element of Object.values(this.bgmElements)) {
                    if (!element.paused) {
                        this.pauseAudio(element);
                    }
                }
            }
        };

        document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    }

    /**
     * 模拟用户点击body的方法
     */
    simulateUserInteraction() {
        if (!this.userInteracted) {
            this.userInteracted = true;
            document.body.click();
        }
    }
}

// 导出全局变量
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DControlSound;
} else {
  window.DC = window.DC || {};
  window.DC.ControlSound = DControlSound;
}

// 使用示例
// 初始化 DControlSound 实例
const controlSound = new DControlSound({
    // 创建 BGM 元素和 URL 的映射关系
    bgmUrls: {
        '#audio-bgm1': './ossweb-img/bgm/bgm1.mp3',
        '#audio-bgm2': './ossweb-img/bgm/bgm2.mp3',
        '#audio-bgm3': './ossweb-img/bgm/bgm3.mp3'
    },
    // 遍历按钮和音频的映射关系，如果配置了这里，按钮的点击播放事件不用再写
    buttonMap: {
        '.btn-play-bgm1': '#audio-bgm1',
        '.btn-play-bgm2': '#audio-bgm2',
        '.btn-play-bgm3': '#audio-bgm3'
    },
    // 统一将所有音量设置为0.3
    defaultVolume: 0.3
});

// 测试播放和设置音量
document.addEventListener('DOMContentLoaded', function() {
    // 模拟用户交互,实现自动播放bgm
    // controlSound.simulateUserInteraction();
    // 播放所有 BGM
    // controlSound.playAllBgms();

    // bgm1 播放 暂停 调整音量 
    // controlSound.playAudio('#audio-bgm1');
    // 暂停bgm1
    // controlSound.pauseAudio('#audio-bgm1');
    // 设置audio-bgm1的语音音量
    controlSound.setVolumeById('#audio-bgm1', 0.5);

    // bgm2 播放 暂停 调整音量 
    // controlSound.playAudio('#audio-bgm2');
    // 暂停bgm2
    // controlSound.pauseAudio('#audio-bgm2');
    // 设置audio-bgm2的语音音量
    controlSound.setVolumeById('#audio-bgm2', 0.8);

    // bgm3 播放 暂停 调整音量
    // controlSound.playAudio('#audio-bgm3');
    // 暂停bgm3
    // controlSound.pauseAudio('#audio-bgm3');
    // 设置audio-bgm3的语音音量
    controlSound.setVolumeById('#audio-bgm3', 1);
});
