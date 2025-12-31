// 处理页面的动画
class DCAnimator {
  /**
   * 创建一个动画实例
   * 
   * @class DCAnimator
   * @constructor
   * @param {string} type - 动画类型，可以是 'sequence' 或 'scroll'
   * @param {...any} args - 传递给初始化方法的参数，具体取决于动画类型
   * @description 这个构造函数用于创建一个 DCAnimator 类的实例，它接受两个参数：动画类型和初始化参数。动画类型可以是 'sequence' 或 'scroll'，初始化参数根据动画类型的不同而有所不同。
   * @throws {Error} 如果动画类型无效，会抛出一个错误
   */
  constructor(type, ...args) {
    this.type = type;
    this.isAnimating = false;

    switch (type) {
      case 'sequence':
        this.initSequenceFrameAnimator(...args);
        break;
      case 'scroll':
        this.initScrollYAni(...args);
        break;
      default:
        throw new Error('Invalid animator type');
    }
  }

  /**
   * 初始化序列帧动画器
   * 
   * @method initSequenceFrameAnimator
   * @param {Array} frames - 包含动画帧图像URL的数组
   * @param {HTMLElement} domElement - 要应用动画的DOM元素
   * @param {number} fps - 动画的帧率，默认为30
   * @description 这个方法用于初始化序列帧动画器。它接受三个参数：包含动画帧图像URL的数组、要应用动画的DOM元素和动画的帧率。它会预加载所有图像，并在图像加载完成后开始动画。
   */
  initSequenceFrameAnimator(frames, domElement, fps = 30) {
    this.frames = frames;
    this.domElement = domElement;
    this.fps = fps;
    this.frameIndex = 0;
    // 预加载序列帧
    this.preloadImages();
  }
  
  /**
   * 初始化滚动动画
   * 
   * @method initScrollYAni
   * @param {string} containerSelector - 容器元素的选择器
   * @param {string} ulSelector - 列表元素的选择器
   * @param {string} liSelector - 列表项元素的选择器
   * @param {number} speed - 动画速度，默认为 1
   * @description 这个方法用于初始化滚动动画。它接受四个参数：容器元素的选择器、列表元素的选择器、列表项元素的选择器和动画速度。它会初始化实例的各种属性，并设置样式和事件监听器。
   */
  initScrollYAni(containerSelector, ulSelector, liSelector, speed = 1) {
    this.container = document.querySelector(containerSelector);
    this.ul = document.querySelector(ulSelector);
    this.liSelector = liSelector;
    this.speed = speed;

    this.items = this.ul.querySelectorAll(this.liSelector);
    this.itemHeight = this.items[0].offsetHeight;
    this.totalHeight = this.items.length * this.itemHeight;
    this.currentTop = 0;

    const styles = {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      position: 'absolute',
      top: '0',
      left: '0',
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      perspective: '1000'
    };

    Object.assign(this.ul.style, styles);
    this.setupEventListeners();
  }

  /**
   * 预加载图像
   * 
   * @method preloadImages
   * @description 这个方法用于预加载图像。它会遍历 `frames` 数组中的每个图像 URL，创建一个新的 `Image` 对象，并设置其 `onload` 和 `onerror` 事件处理函数。当图像加载成功时，会将其添加到 `images` 数组中，并更新 `loadCount`。当图像加载失败时，会将其 URL 添加到 `loadErrors` 数组中，并更新 `loadCount`。当所有图像加载完成或发生错误时，会调用 `onImagesLoaded` 方法。
   */
  preloadImages() {
    this.images = [];
    this.loadCount = 0;
    this.loadErrors = [];

    this.frames.forEach((frameSrc, index) => {
      const img = new Image();
      img.src = frameSrc;
      img.onload = () => {
        this.images[index] = img;
        this.loadCount++;
        console.log(`Image loaded successfully: ${frameSrc}`);
        if (this.loadCount === this.frames.length) {
          this.onImagesLoaded();
        }
      };
      img.onerror = () => {
        this.loadErrors.push(frameSrc);
        console.error(`Failed to load image: ${frameSrc}`);
        this.loadCount++;
        if (this.loadCount === this.frames.length) {
          this.onImagesLoaded();
        }
      };
    });
  }
  
  /**
   * 处理图像加载完成后的逻辑
   * 
   * @method onImagesLoaded
   * @description 这个方法用于处理图像加载完成后的逻辑。如果所有图像都成功加载，它会启动动画；如果有图像加载失败，它会记录错误信息。
   */
  onImagesLoaded() {
    if (this.loadErrors.length > 0) {
      console.error('Some images failed to load:', this.loadErrors);
    } else {
      console.log('All images loaded successfully');
    }

    if (this.loadErrors.length === 0 && this.loadCount === this.frames.length) {
      this.startAnimation();
    } else {
      console.error('Not all images were loaded successfully. Animation will not start.');
    }
  }
  
  /**
   * 启动动画
   * 
   * @method startAnimation
   * @description 这个方法用于启动动画。如果动画当前没有在运行，它会将 `isAnimating` 属性设置为 `true`，并根据动画类型调用相应的动画方法。
   */
  startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      if (this.type === 'sequence') {
        this.animateSequence();
      } else if (this.type === 'scroll') {
        this.animateScroll();
      }
    }
  }

  /**
   * 停止动画
   * 
   * @method stopAnimation
   * @description 这个方法用于停止动画。它会将 `isAnimating` 属性设置为 `false`，从而停止动画的执行。
   */
  stopAnimation() {
    this.isAnimating = false;
  }

  /**
   * 实现序列帧动画
   * 
   * @method animateSequence
   * @description 这个方法用于实现序列帧动画。它会根据当前帧索引和元素类型，更新 DOM 元素的图像或背景图像。然后，它会计算下一帧的延迟时间，并使用 setTimeout 和 requestAnimationFrame 来调度下一次动画更新。
   * @throws {Error} 如果 DOM 元素类型不支持序列帧动画，会抛出一个错误
   */
  animateSequence() {
    if (this.isAnimating) {
      if (this.images[this.frameIndex]) {
        if (this.domElement instanceof HTMLImageElement) {
          this.domElement.src = this.images[this.frameIndex].src;
        } else if (this.domElement instanceof HTMLDivElement) {
          this.domElement.style.backgroundImage = `url(${this.images[this.frameIndex].src})`;
        } else if (this.domElement instanceof HTMLCanvasElement) {
          const ctx = this.domElement.getContext('2d');
          ctx.clearRect(0, 0, this.domElement.width, this.domElement.height);
          ctx.drawImage(this.images[this.frameIndex], 0, 0);
        } else {
          console.error('Unsupported element type for sequence animation');
        }
      } else {
        console.error(`Frame index out of bounds: ${this.frameIndex}`);
      }
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;

      const frameDuration = 1000 / this.fps;
      setTimeout(() => {
        requestAnimationFrame(() => this.animateSequence());
      }, frameDuration);
    }
  }

  /**
   * 实现滚动动画
   * 
   * @method animateScroll
   * @description 这个方法用于实现滚动动画。它会根据当前的速度和总高度来更新 `currentTop` 的值，然后使用 `transform` 属性来移动列表元素。如果 `currentTop` 的绝对值大于等于总高度，它会将 `currentTop` 重置为 0，以实现循环滚动的效果。
   * @throws {Error} 如果动画没有在运行，会抛出一个错误
   */
  animateScroll() {
    if (this.isAnimating) {
      this.currentTop -= this.speed;
      if (Math.abs(this.currentTop) >= this.totalHeight) {
        this.currentTop = 0;
        this.ul.style.transform = `translate3d(0, ${this.currentTop}px, 0)`;
        requestAnimationFrame(() => this.animateScroll());
      } else {
        this.ul.style.transform = `translate3d(0, ${this.currentTop}px, 0)`;
        requestAnimationFrame(() => this.animateScroll());
      }
    }
  }

  /**
   * 设置序列帧动画的帧率
   * 
   * @method setFps
   * @param {number} fps - 新的帧率
   * @description 这个方法用于设置序列帧动画的帧率。它只对 'sequence' 类型的动画有效。如果动画类型不是 'sequence'，则不会改变帧率。
   */
  setFps(fps) {
    if (this.type === 'sequence') {
      this.fps = fps;
    }
  }

  /**
   * 检查所有图像是否都已加载
   * 
   * @method areImagesLoaded
   * @return {boolean} 如果所有图像都已加载且没有错误，则返回 true；否则返回 false
   * @description 这个方法用于检查所有图像是否都已加载。它会检查 `loadCount` 是否等于 `frames.length`，以及 `loadErrors` 是否为空。如果这两个条件都满足，则表示所有图像都已成功加载，方法返回 true；否则返回 false。
   */
  areImagesLoaded() {
    return this.loadCount === this.frames.length && this.loadErrors.length === 0;
  }

  /**
   * 设置事件监听器
   * 
   * @method setupEventListeners
   * @description 这个方法用于设置事件监听器。它会根据动画类型添加相应的事件监听器。如果动画类型是 'scroll'，它会添加鼠标进入和离开容器的事件监听器，以及触摸开始和结束的事件监听器。当鼠标进入容器时，动画会停止；当鼠标离开容器时，动画会重新开始。当触摸开始时，动画会停止；当触摸结束时，如果触摸移动的距离小于 50 像素，动画会重新开始。
   */
  setupEventListeners() {
    if (this.type === 'scroll') {
      this.container.addEventListener('mouseenter', () => this.stopAnimation());
      this.container.addEventListener('mouseleave', () => {
        this.stopAnimation();
        this.startAnimation();
      });

      let touchStartY = 0;
      let touchEndY = 0;

      this.container.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        this.stopAnimation();
      });

      this.container.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        if (Math.abs(touchStartY - touchEndY) < 50) {
          this.startAnimation();
        }
      });
    }
  }
}

// 导出全局变量
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCAnimator;
} else {
  window.DC = window.DC || {};
  window.DC.Animator = DCAnimator;
}
