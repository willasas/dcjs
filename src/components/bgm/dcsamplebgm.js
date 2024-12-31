// 在网页中创建和控制背景音乐播放器。
class DCSampleBGM {
  /**
   * 创建一个背景音乐播放器实例
   * @class DCSampleBGM
   * @constructor
   * @param {string} bgmAudioId - 背景音乐音频元素的 ID
   * @param {string} bgmBtnId - 背景音乐按钮元素的 ID
   * @param {string} bgmIconId - 背景音乐图标元素的 ID
   * @param {Array<string>|string} bgmList - 背景音乐文件路径列表，可以是一个字符串或字符串数组
   * @param {HTMLElement|string} [container=document.body] - 播放器将被附加到的容器，可以是一个 HTMLElement 或一个 CSS 选择器字符串
   */
  constructor(bgmAudioId, bgmBtnId, bgmIconId, bgmList, container = document.body) {
    this.bgmAudio = bgmAudioId;
    this.bgmBtn = bgmBtnId;
    this.bgmIcon = bgmIconId;
    this.bgmList = Array.isArray(bgmList) ? bgmList : [bgmList];
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    } else if (container instanceof HTMLElement) {
      this.container = container;
    } else {
      throw new Error('Invalid container. It must be a string selector or an HTMLElement.');
    }
    this.rotateVal = 0;
    this.interval = null;
    this.bgmIconDef = `<svg class="icon icon_note_play" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" style="fill-rule:evenodd;" xmlns="http://www.w3.org/2000/svg">
                <path d="M563.5 9.5c20.896-2.649 37.729 4.351 50.5 21 5.761 13.38 8.095 27.38 7 42 8.26 89.742 50.426 158.242 126.5 205.5 42.355 24.34 88.022 36.34 137 36 24.988 5.487 38.321 20.987 40 46.5-1.48 24.646-14.147 40.146-38 46.5-104.93 1.715-193.43-35.118-265.5-110.5-.05 158.006-.717 316.006-2 474-10.092 91.418-53.926 161.251-131.5 209.5-67.697 38.04-139.031 46.7-214 26-91.167-29.833-151.667-90.333-181.5-181.5-25.32-97.438-5.32-184.105 60-260 67.583-68.973 149.416-96.473 245.5-82.5 38.667 7.514 74 21.514 106 42l21 13.5a118703.92 118703.92 0 0 0 1.5-487c4.044-21.539 16.544-35.206 37.5-41zm-216 563c74.004 2.577 127.837 36.577 161.5 102 28.237 69.237 18.57 132.57-29 190-53.871 54.342-117.371 69.842-190.5 46.5-44.365-17.365-76.865-47.531-97.5-90.5-28.237-69.237-18.57-132.57 29-190 34.329-36.389 76.496-55.723 126.5-58z" opacity=".988"/>
               </svg>`
    this.bgmIconAfter = `<svg class="icon icon_note_pause" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#000000" d="M573.56288 9.99424c25.88672 0 46.8992 21.05344 46.8992 46.94016a257.8432 257.8432 0 0 0 257.51552 257.47456c25.88672 0 46.8992 21.05344 46.6944 46.57152 0 25.88672-20.97152 46.8992-46.85824 46.8992a349.92128 349.92128 0 0 1-257.51552-112.76288v328.66304l220.24192 220.28288a40.96 40.96 0 1 1-57.91744 57.91744l-162.36544-162.36544v12.4928a19.08736 19.08736 0 0 1-0.16384 2.49856l-0.32768 2.53952c-5.20192 143.85152-123.53536 259.23584-268.61568 259.23584a269.47584 269.47584 0 0 1-269.1072-269.1072 269.47584 269.47584 0 0 1 276.84864-269.1072L87.49056 206.848A40.96 40.96 0 1 1 145.408 148.93056l381.21472 381.21472V75.3664c0-0.6144 0.08192-1.2288 0.12288-1.80224l0.24576-1.8432a409.1904 409.1904 0 0 1-0.36864-14.7456c0-25.88672 21.05344-46.94016 46.94016-46.94016zM351.31392 571.8016a175.67744 175.67744 0 0 0-175.47264 175.47264 175.67744 175.67744 0 0 0 175.47264 175.5136 175.67744 175.67744 0 0 0 175.5136-175.5136 175.67744 175.67744 0 0 0-175.5136-175.47264z" />
                    </svg>`
    this.initDOM();
    this.addStyles();
    this.initEvents();
  }

  /**
   * 初始化 DOM 结构
   * @method initDOM
   * @memberof DCSampleBGM
   * @instance
   */
  initDOM() {
    const bgmContainer = document.createElement('div');
    bgmContainer.className = 'dc-smp-bgm';

    const bgmBtn = document.createElement('a');
    bgmBtn.href = "javascript:";
    bgmBtn.className = 'bgm-btn';
    bgmBtn.id = this.bgmBtn;
    bgmBtn.title = '背景音乐';
    bgmBtn.dataset.status = 'off';

    const bgmIcon = document.createElement('span');
    bgmIcon.className = 'bgm-icon';
    bgmIcon.id = this.bgmIcon;
    bgmIcon.innerHTML = this.bgmIconAfter;
    bgmBtn.appendChild(bgmIcon);

    const bgmAudio = document.createElement('audio');
    bgmAudio.src = '';
    bgmAudio.id = this.bgmAudio;
    bgmAudio.preload = 'auto';
    bgmAudio.loop = true;
    bgmBtn.appendChild(bgmAudio);

    const voiceWave = document.createElement('div');
    voiceWave.className = 'voice-wave';
    for (let i = 1; i <= 9; i++) {
      const waveLine = document.createElement('div');
      waveLine.className = `wave-line line-${i} delay-${i}`;
      voiceWave.appendChild(waveLine);
    }

    bgmContainer.appendChild(bgmBtn);
    bgmContainer.appendChild(voiceWave);
    this.container.appendChild(bgmContainer);

    this.bgmAudio = bgmAudio;
    this.bgmBtn = bgmBtn;
    this.bgmIcon = bgmIcon;
  }

  /**
   * 添加样式
   * @method addStyles
   * @memberof DCSampleBGM
   * @instance
   */
  addStyles() {
    const bgmStyle = `
      @keyframes wave { 0% { transform: scaleY(1); }
        10% { transform: scaleY(0.2); }
        20% { transform: scaleY(1); }
        30% { transform: scaleY(0.2); }
        40% { height: 40px;
          transform: scaleY(1); }
        50% { transform: scaleY(0.2); }
        60% { transform: scaleY(1); }
        70% { transform: scaleY(0.2); }
        80% { transform: scaleY(1); }
        90% { transform: scaleY(0.2); }
        100% { transform: scaleY(1); } 
      }

      @media screen and (min-width: 1025px) { .dc-smp-bgm { position: relative; width: 100%; height: 60px; display: flex; justify-content: center; align-items: center; }
        .dc-smp-bgm .bgm-btn { display: block; position: relative; width: 28px; height: 28px; }
        .dc-smp-bgm .bgm-btn.active .bgm-icon { background: none; background-size: 100% 100%; width: 100%; height: 100%; }
        .dc-smp-bgm .bgm-btn .bgm-icon { display: block; background-size: 100% 100%; width: 100%; height: 100%; }
        .dc-smp-bgm .bgm-btn .bgm-icon svg { fill: #000; }
        .dc-smp-bgm .voice-wave { display: flex; align-items: center; position: relative; width: 68px; margin-left: 10px; }
        .dc-smp-bgm .voice-wave.play .wave-line { animation: wave 3s linear infinite; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-1 { animation-delay: 0.1s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-2 { animation-delay: 0.14s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-3 { animation-delay: 0.18s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-4 { animation-delay: 0.22s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-5 { animation-delay: 0.26s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-6 { animation-delay: 0.3s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-7 { animation-delay: 0.34s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-8 { animation-delay: 0.38s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-9 { animation-delay: 0.42s; }
        .dc-smp-bgm .wave-line { position: relative; width: 4px; height: 24px; background-color: #000; transform-origin: center center; }
        .dc-smp-bgm .wave-line:not(:first-of-type) { margin-left: 4px; }
        .dc-smp-bgm .wave-line.line-1 { height: 24px; }
        .dc-smp-bgm .wave-line.line-2 { height: 18px; }
        .dc-smp-bgm .wave-line.line-3 { height: 12px; }
        .dc-smp-bgm .wave-line.line-4 { height: 8px; }
        .dc-smp-bgm .wave-line.line-5 { height: 12px; }
        .dc-smp-bgm .wave-line.line-6 { height: 18px; }
        .dc-smp-bgm .wave-line.line-7 { height: 24px; }
        .dc-smp-bgm .wave-line.line-8 { height: 16px; }
        .dc-smp-bgm .wave-line.line-9 { height: 20px; } 
      }

      @media screen and (max-width: 1024px) { .dc-smp-bgm { position: relative; width: 100%; height: 60px; display: flex; justify-content: center; align-items: center; }
        .dc-smp-bgm .bgm-btn { display: block; position: relative; width: 28px; height: 28px; }
        .dc-smp-bgm .bgm-btn.active .bgm-icon { background: none; background-size: 100% 100%; width: 100%; height: 100%; }
        .dc-smp-bgm .bgm-btn .bgm-icon { display: block; background-size: 100% 100%; width: 100%; height: 100%; }
        .dc-smp-bgm .bgm-btn .bgm-icon svg { fill: #000; }
        .dc-smp-bgm .voice-wave { display: flex; align-items: center; position: relative; width: 68px; margin-left: 10px; }
        .dc-smp-bgm .voice-wave.play .wave-line { animation: wave 3s linear infinite; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-1 { animation-delay: 0.1s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-2 { animation-delay: 0.14s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-3 { animation-delay: 0.18s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-4 { animation-delay: 0.22s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-5 { animation-delay: 0.26s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-6 { animation-delay: 0.3s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-7 { animation-delay: 0.34s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-8 { animation-delay: 0.38s; }
        .dc-smp-bgm .voice-wave.play .wave-line.delay-9 { animation-delay: 0.42s; }
        .dc-smp-bgm .wave-line { position: relative; width: 4px; height: 24px; background-color: #000; transform-origin: center center; }
        .dc-smp-bgm .wave-line:not(:first-of-type) { margin-left: 4px; }
        .dc-smp-bgm .wave-line.line-1 { height: 24px; }
        .dc-smp-bgm .wave-line.line-2 { height: 18px; }
        .dc-smp-bgm .wave-line.line-3 { height: 12px; }
        .dc-smp-bgm .wave-line.line-4 { height: 8px; }
        .dc-smp-bgm .wave-line.line-5 { height: 12px; }
        .dc-smp-bgm .wave-line.line-6 { height: 18px; }
        .dc-smp-bgm .wave-line.line-7 { height: 24px; }
        .dc-smp-bgm .wave-line.line-8 { height: 16px; }
        .dc-smp-bgm .wave-line.line-9 { height: 20px; } 
      }
    `;
    /**
     * 动态添加样式到页面中
     * 
     * 该函数通过创建一个style元素，并将其插入到head标签内，紧接在title元素之前的方式，来为页面添加新的CSS样式
     * 这种方法允许开发者在页面加载后，根据需要添加或修改样式，从而实现更灵活的样式控制
     * 
     * @param {string} eleStyleInit - 需要添加的CSS样式字符串这个字符串应该包含完整的CSS规则，例如选择器和相关的样式声明
     */
    const addStyle = (eleStyleInit) => {
      const fa = document.querySelector('title');
      const eleStyle = document.createElement('style');
      eleStyle.innerHTML = eleStyleInit;
      document.head.insertBefore(eleStyle, fa);
    };

    addStyle(bgmStyle);
  }
  
  /**
   * 旋转元素
   * @method rotate
   * @memberof DCSampleBGM
   * @instance
   * @description 该方法通过设置元素的 CSS 变换属性来实现旋转效果。它会在指定的时间间隔内不断增加旋转角度，从而产生动画效果。
   * @param {number} rotateVal - 当前的旋转角度。
   * @param {HTMLElement} bgmBtn - 要旋转的元素。
   * @param {number} interval - 旋转动画的时间间隔（毫秒）。
   */
  rotate() {
    this.interval = setInterval(() => {
      this.rotateVal += 4;
      this.bgmBtn.style.transform = `rotate(${this.rotateVal}deg)`;
      this.bgmBtn.style.transition = '5s linear infinite';
    }, 100);
  }

  /**
   * 获取数组的随机索引
   * @method getRandomIndex
   * @memberof DCSampleBGM
   * @instance
   * @param {Array} array - 要从中获取随机索引的数组。
   * @returns {number} - 数组的一个随机索引值。
   * @description 该方法通过生成一个0到数组长度减1之间的随机数来获取数组的随机索引。
   */
  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  /**
   * 播放音乐
   * @method playMusic
   * @memberof DCSampleBGM
   * @instance
   * @param {Array} musicSources - 音乐源数组。
   * @description 该方法用于播放音乐。如果音乐当前处于暂停状态，则从音乐源数组中随机选择一个音乐并播放。如果音乐当前正在播放，则暂停音乐。
   * @returns {void} - 该方法没有返回值。
   */
  playMusic(musicSources) {
    if (this.bgmAudio.paused) {
      const randomBgm = musicSources && musicSources.length > 0 
        ? musicSources[this.getRandomIndex(musicSources)] 
        : this.bgmList[0];

      this.bgmAudio.src = randomBgm;
      this.bgmIcon.innerHTML = this.bgmIconDef;
      this.bgmAudio.play();
      this.rotate(); // 启动旋转动画
      this.bgmBtn.classList.remove('active'); // 使用classList API移除类
      // 启动波浪线动画
      document.querySelector('.voice-wave').classList.add('play');
    } else {
      this.bgmAudio.pause();
      this.bgmBtn.style.transform = 'none';
      this.bgmIcon.innerHTML = this.bgmIconAfter;
      clearInterval(this.interval);
      this.bgmBtn.classList.add('active'); // 使用classList API添加类
      document.querySelector('.voice-wave').classList.remove('play');
    }
  }

  /**
   * 初始化事件监听器
   * @method initEvents
   * @memberof DCSampleBGM
   * @instance
   * @description 该方法用于初始化背景音乐播放器的事件监听器。它会为背景音乐按钮添加一个点击事件监听器，当按钮被点击时，会调用 `playMusic` 方法来播放或暂停音乐。
   * @returns {void} - 该方法没有返回值。
   */
  initEvents() {
    this.bgmBtn.addEventListener('click', () => {
      this.playMusic(this.bgmList);
    });
  }

   /**
   * 外部调用播放音乐
   * @method play
   * @memberof DCSampleBGM
   * @instance
   */
   play() {
    this.playMusic(this.bgmList);
  }

  /**
   * 外部调用暂停音乐
   * @method pause
   * @memberof DCSampleBGM
   * @instance
   */
  pause() {
    if (!this.bgmAudio.paused) {
      this.bgmAudio.pause();
      this.bgmBtn.style.transform = 'none';
      this.bgmIcon.innerHTML = this.bgmIconAfter;
      clearInterval(this.interval);
      this.bgmBtn.classList.add('active'); // 使用classList API添加类
      document.querySelector('.voice-wave').classList.remove('play');
    }
  }
}

// 导出全局变量
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCSampleBGM;
} else {
  window.DC = window.DC || {};
  window.DC.SampleBGM = DCSampleBGM;
}

// 单bgm
// const bgmPlayer1 = new DCSampleBGM('bgm-audio-container', 'bgm-audio-btn', 'bgm-icon', './bgm1.mp3');
// 多bgm随机播放,最后一个参数为需要将bgm元素插入到那个元素中,不传则默认是body
// const bgmPlayer2 = new DCSampleBGM('bgm-audio-container', 'bgm-audio-btn', 'bgm-icon', ['./bgm1.mp3', './bgm2.mp3', './bgm3.mp3'], '#sec1');
// document.querySelector('.btn-play').addEventListener('click', () => {
//   // 播放音乐
//   bgmPlayer2.play();
// });

// document.querySelector('.btn-pause').addEventListener('click', () => {
//   // 暂停音乐
//   bgmPlayer2.pause();
// });
