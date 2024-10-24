
// 定义一个向上轮播的动画类
class DCScrollYAni {
	/**
	 * 构造函数，用于初始化 ScrollSwiperAni 类的实例
	 * 
	 * @class ScrollSwiperAni
	 * @constructor
	 * @param {string} containerSelector - 容器元素的选择器
	 * @param {string} ulSelector - 列表元素的选择器
	 * @param {string} liSelector - 列表项元素的选择器
	 * @param {number} speed - 动画速度，默认为 1，值越大速度越快
	 * @description 这个构造函数用于创建一个 ScrollSwiperAni 类的实例，它接受四个参数：容器元素的选择器、列表元素的选择器、列表项元素的选择器和动画速度。它会初始化实例的各种属性，并设置样式和事件监听器。
	 */
  constructor(containerSelector, ulSelector, liSelector, speed = 1) {
		// 获取ul的父容器
    this.container = document.querySelector(containerSelector);
		// 获取ul元素
    this.ul = document.querySelector(ulSelector);
		// 存储列表项选择器
    this.liSelector = liSelector;
		// 设置动画速度
    this.speed = speed;

		// 获取列表项元素
    this.items = this.ul.querySelectorAll(this.liSelector);
		// 获取列表项高度
    this.itemHeight = this.items[0].offsetHeight;
		// 计算列表总高度
    this.totalHeight = this.items.length * this.itemHeight;
		// 初始化动画状态为false
    this.isAnimating = false;
		// 初始化当前滚动位置为0
    this.currentTop = 0;

    // 定义样式对象
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

    // 应用样式
    Object.assign(this.ul.style, styles);

    // 绑定事件
    this.setupEventListeners();
  }

  /**
	 * 启动动画
	 * 
	 * @method startAnimation
	 * @description 这个方法用于启动动画。如果动画当前没有在运行，它会将 `isAnimating` 属性设置为 `true`，并调用 `animateScroll` 方法来开始动画。
	 */
  startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animateScroll();
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
   * 实现动画滚动效果
   * 
   * @method animateScroll
   * @description 这个方法用于实现动画滚动效果。它会不断更新 `ul` 元素的 `transform` 属性，使其向上滚动。当滚动到列表底部时，会重置滚动位置。
   */
  animateScroll() {
    if (this.isAnimating) {
      this.currentTop -= this.speed;
      if (Math.abs(this.currentTop) >= this.totalHeight) {
        this.currentTop = 0; // 重置滚动位置为 0
        this.ul.style.transform = `translate3d(0, ${this.currentTop}px, 0)`; // 立即重置
        requestAnimationFrame(() => this.animateScroll()); // 重置后立即调用下一次动画
      } else {
        this.ul.style.transform = `translate3d(0, ${this.currentTop}px, 0)`;
        requestAnimationFrame(() => this.animateScroll());
      }
    }
  }

  /**
	 * 设置事件监听器
	 * 
	 * @method setupEventListeners
	 * @description 这个方法用于设置事件监听器。它会为容器元素添加鼠标进入和离开事件监听器，以及触摸开始和结束事件监听器。当鼠标进入容器时，动画会停止；当鼠标离开容器时，动画会重新开始。当用户在容器上触摸时，动画也会停止；当用户触摸结束时，如果触摸距离小于 50 像素，则动画会重新开始。
	 */
  setupEventListeners() {
    // 鼠标事件
    this.container.addEventListener('mouseenter', () => this.stopAnimation());
    this.container.addEventListener('mouseleave', () => {
			this.stopAnimation();
			// 鼠标移出时重新启动动画
			this.startAnimation();
		});

    // 触摸事件
    let touchStartY = 0;
    let touchEndY = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      this.stopAnimation();
    });

    this.container.addEventListener('touchend', (e) => {
      touchEndY = e.changedTouches[0].clientY;
      if (Math.abs(touchStartY - touchEndY) < 50) { 
				// 确保是点击而不是滑动
        this.startAnimation();
      }
    });
  }
}

// 使用示例
const srollYAni = new DCScrollYAni('#show-cont', '#show-ul', '.get-prop-show-content-item', .5);

// 外部调用方法
srollYAni.startAnimation(); // 启动动画
// swiperAni.stopAnimation();  // 暂停动画