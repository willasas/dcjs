/**
 * DCSlider 轮播组件类
 * @class DCSlider
 * @description 一个简单的JavaScript轮播组件，支持上下/左右切换，支持自动轮播
 */
class DCSlider {
  /**
   * @private
   * @description 默认配置
   */
  defaultConfig = {
      container: null,           // 容器元素
      direction: 'horizontal',   // 切换方向: horizontal/vertical
      autoplay: false,          // 是否自动播放
      autoplayDelay: 3000,      // 自动播放间隔(ms)
      loop: true,               // 是否循环播放
      slides: [],               // slide内容配置
      pagination: {             // 分页器配置
          enable: true,         // 是否启用分页器
          clickable: true,      // 分页器是否可点击
          renderBullet: null,   // 自定义分页器渲染函数
          bulletClass: 'slider-point', // 分页器项类名
          bulletActiveClass: 'active'  // 分页器激活项类名
      },
      navigation: {            // 前进后退按钮配置
          enable: true,        // 是否启用导航按钮
          prevEl: null,        // 前进按钮元素
          nextEl: null         // 后退按钮元素
      },
      onChange: null,          // slide切换回调
      onInit: null            // 初始化完成回调
  }

  /**
   * 创建轮播实例
   * @constructor
   * @param {Object} options - 配置选项
   */
  constructor(options = {}) {
      this.defaultConfig = {
          container: null,
          direction: 'horizontal',
          autoplay: false,
          autoplayDelay: 3000,
          loop: true,
          slides: [],
          pagination: {
              enable: true,
              clickable: true,
              renderBullet: null,
              bulletClass: 'slider-point',
              bulletActiveClass: 'active'
          },
          navigation: {
              enable: true,
              prevEl: null,
              nextEl: null
          },
          onChange: null,
          onInit: null
      };
      
      this.config = { ...this.defaultConfig, ...options };
      this.currentIndex = 0;
      this.isAnimating = false;
      this.autoplayTimer = null;
      this.init();
  }

  /**
   * 初始化轮播组件
   * @private
   */
  init() {
      this.createElements();
      this.initStyles();
      this.bindEvents();
      this.initAutoplay();
      
      if (typeof this.config.onInit === 'function') {
          this.config.onInit(this);
      }
  }

  /**
   * 创建DOM元素
   * @private
   */
  createElements() {
      // 创建容器
      this.container = document.createElement('section');
      this.container.className = 'slider-container';
      
      // 创建轮播区域
      this.carousel = document.createElement('div');
      this.carousel.className = 'slider-carousel';
      
      // 创建轮播内容容器
      this.carouselInner = document.createElement('div');
      this.carouselInner.className = 'slider-carousel-inner';

      // 创建slides
      this.slides = this.config.slides.map((slideContent, index) => {
          const slide = document.createElement('div');
          slide.className = 'slide';
          
          if (typeof slideContent === 'string') {
              slide.innerHTML = slideContent;
          } else if (slideContent instanceof HTMLElement) {
              slide.appendChild(slideContent.cloneNode(true));
          }
          
          return slide;
      });
      
      this.slides.forEach(slide => this.carouselInner.appendChild(slide));
      this.carousel.appendChild(this.carouselInner);
      this.container.appendChild(this.carousel);

      // 创建分页器
      if (this.config.pagination.enable) {
          this.pagination = document.createElement('div');
          this.pagination.className = 'slider-pagin-ctrl';
          
          // 将原始的 slides 数据保存到实例中，以便在渲染分页器时使用
          this.slidesData = this.config.slides;
          
          this.paginationPoints = this.slides.map((_, index) => {
              let point;
              
              if (typeof this.config.pagination.renderBullet === 'function') {
                  // 使用自定义渲染函数，传入原始数据而不是DOM元素
                  const bulletHtml = this.config.pagination.renderBullet(
                      index, 
                      this.slidesData[index]
                  );
                  const temp = document.createElement('div');
                  temp.innerHTML = bulletHtml.trim();
                  point = temp.firstElementChild;
              } else {
                  // 默认分页器样式
                  point = document.createElement('span');
                  point.className = 'pagin-bullet';
              }
              
              // 如果是默认分页器，使用 active 类名，如果是自定义分页器，使用用户配置的类名
              if (point.classList.contains('pagin-bullet')) {
                  this.config.pagination.bulletActiveClass = 'active';
              }
              
              return point;
          });
          
          // 添加分页器到容器
          this.paginationPoints.forEach(point => {
              if (point) {
                  this.pagination.appendChild(point);
              }
          });
          this.container.appendChild(this.pagination);
      }

      // 创建导航按钮
      if (this.config.navigation.enable) {
          this.prevBtn = this.config.navigation.prevEl || this.createNavButton('prev');
          this.nextBtn = this.config.navigation.nextEl || this.createNavButton('next');
          this.container.appendChild(this.prevBtn);
          this.container.appendChild(this.nextBtn);
      }

      // 添加到指定容器
      const parentElement = this.config.container 
          ? (typeof this.config.container === 'string' 
              ? document.querySelector(this.config.container) 
              : this.config.container)
          : document.body;
          
      parentElement.appendChild(this.container);
  }

  /**
   * 创建导航按钮
   * @private
   * @param {string} type - 按钮类型(prev/next)
   * @returns {HTMLElement}
   */
  createNavButton(type) {
      const btn = document.createElement('button');
      btn.className = `slider-${type}`;
      btn.innerHTML = type === 'prev' ? this.prevBtnSVG : this.nextBtnSVG;
      return btn;
  }

  /**
   * 初始化样式
   * @private
   */
  initStyles() {
      this.carouselInner.style.display = 'grid';
      this.carouselInner.style.gridTemplateColumns = 
          this.config.direction === 'horizontal' 
              ? `repeat(${this.slides.length}, 100%)` 
              : '100%';
      this.carouselInner.style.gridTemplateRows = 
          this.config.direction === 'vertical' 
              ? `repeat(${this.slides.length}, 100%)` 
              : '100%';
      this.updatePagination();

    const cssRules = `
      @media screen and (min-width: 1025px) { 
        img { display: block; object-fit: cover; }
        .slider-container { position: relative; width: 100%; height: 100vh; overflow: hidden; touch-action: pan-y pinch-zoom; /* Carousel */ /* Navigation Buttons */ /* Pagination */ }
        .slider-container.vertical { touch-action: pan-x pinch-zoom; }
        .slider-container .slider-carousel { width: 100%; height: 100%; overflow: hidden; }
        .slider-container .slider-carousel .slider-carousel-inner { width: 100%; height: 100%; transition: transform 0.3s ease-in-out; /* Optional: GPU Acceleration */ transform: translate3d(0, 0, 0); backface-visibility: hidden; perspective: 1000px; /* Horizontal Layout */ /* Vertical Layout */ /* Slides */ }
        .slider-container .slider-carousel .slider-carousel-inner.horizontal { display: grid; grid-auto-flow: column; grid-auto-columns: 100%; }
        .slider-container .slider-carousel .slider-carousel-inner.vertical { display: grid; grid-auto-flow: row; grid-auto-rows: 100%; }
        .slider-container .slider-carousel .slider-carousel-inner .slide { width: 100%; height: 100%; position: relative; display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 20px; padding: 20px; box-sizing: border-box; }
        .slider-container .slider-carousel .slider-carousel-inner .slide.active { z-index: 1; }
        .slider-container .slider-prev, .slider-container .slider-next { position: absolute; top: 50%; transform: translateY(-50%); width: 64px; height: 64px; background: transparent; border: none; outline: none; cursor: pointer; z-index: 2; transition: opacity 0.3s; padding: 0; }
        .slider-container .slider-prev:hover svg path, .slider-container .slider-next:hover svg path { stroke: #666; }
        .slider-container .slider-prev.disabled, .slider-container .slider-next.disabled { opacity: 0.5; pointer-events: none; }
        .slider-container .slider-prev svg, .slider-container .slider-next svg { width: 100%; height: 100%; }
        .slider-container .slider-prev svg path, .slider-container .slider-next svg path { stroke: #000; transition: stroke 0.3s; }
        .slider-container .slider-prev { left: 20px; }
        .slider-container .slider-next { right: 20px; }
        .slider-container .slider-pagin-ctrl { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 2; padding: 10px; border-radius: 8px; cursor: pointer; /* Horizontal Layout */ /* Vertical Layout */ }
        .slider-container .slider-pagin-ctrl.horizontal { flex-direction: row; }
        .slider-container .slider-pagin-ctrl.vertical { flex-direction: column; bottom: 50%; left: auto; right: 20px; transform: translateY(50%); }
        .slider-container .slider-pagin-ctrl .pagin-bullet { width: 10px; height: 10px; border-radius: 50%; background: #666; }
        .slider-container .slider-pagin-ctrl .pagin-bullet:hover, .slider-container .slider-pagin-ctrl .pagin-bullet.active { background: #000; }
        .slider-container { scrollbar-width: thin; scrollbar-color: rgba(0, 0, 0, 0.3) transparent; }
        .slider-container::-webkit-scrollbar { width: 6px; height: 6px; }
        .slider-container::-webkit-scrollbar-track { background: transparent; }
        .slider-container::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.3); border-radius: 3px; }
        .slider-container::-webkit-scrollbar-thumb:hover { background-color: rgba(0, 0, 0, 0.5); }
        .slider-fade-enter-active, .slider-fade-leave-active { transition: opacity 0.3s ease; }
        .slider-fade-enter-from, .slider-fade-leave-to { opacity: 0; } 
      }
      @media screen and (max-width: 1024px) { 
        img { display: block; object-fit: cover; }
        .slider-container { position: relative; width: 100%; height: 100vh; overflow: hidden; touch-action: pan-y pinch-zoom; /* Carousel */ /* Navigation Buttons */ /* Pagination */ }
        .slider-container.vertical { touch-action: pan-x pinch-zoom; }
        .slider-container .slider-carousel { width: 100%; height: 100%; overflow: hidden; }
        .slider-container .slider-carousel .slider-carousel-inner { width: 100%; height: 100%; transition: transform 0.3s ease-in-out; /* Optional: GPU Acceleration */ transform: translate3d(0, 0, 0); backface-visibility: hidden; perspective: 1000px; /* Horizontal Layout */ /* Vertical Layout */ /* Slides */ }
        .slider-container .slider-carousel .slider-carousel-inner.horizontal { display: grid; grid-auto-flow: column; grid-auto-columns: 100%; }
        .slider-container .slider-carousel .slider-carousel-inner.vertical { display: grid; grid-auto-flow: row; grid-auto-rows: 100%; }
        .slider-container .slider-carousel .slider-carousel-inner .slide { width: 100%; height: 100%; position: relative; display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 20px; padding: 20px; box-sizing: border-box; }
        .slider-container .slider-carousel .slider-carousel-inner .slide.active { z-index: 1; }
        .slider-container .slider-prev, .slider-container .slider-next { position: absolute; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; background: transparent; border: none; outline: none; cursor: pointer; z-index: 2; transition: opacity 0.3s; padding: 0; }
        .slider-container .slider-prev:hover svg path, .slider-container .slider-next:hover svg path { stroke: #666; }
        .slider-container .slider-prev.disabled, .slider-container .slider-next.disabled { opacity: 0.5; pointer-events: none; }
        .slider-container .slider-prev svg, .slider-container .slider-next svg { width: 100%; height: 100%; }
        .slider-container .slider-prev svg path, .slider-container .slider-next svg path { stroke: #000; transition: stroke 0.3s; }
        .slider-container .slider-prev { left: 0px; }
        .slider-container .slider-next { right: 0px; }
        .slider-container .slider-pagin-ctrl { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 2; padding: 10px; border-radius: 8px; cursor: pointer; /* Horizontal Layout */ /* Vertical Layout */ }
        .slider-container .slider-pagin-ctrl.horizontal { flex-direction: row; }
        .slider-container .slider-pagin-ctrl.vertical { flex-direction: column; bottom: 50%; left: auto; right: 20px; transform: translateY(50%); }
        .slider-container .slider-pagin-ctrl .pagin-bullet { width: 10px; height: 10px; border-radius: 50%; background: #666; }
        .slider-container .slider-pagin-ctrl .pagin-bullet:hover, .slider-container .slider-pagin-ctrl .pagin-bullet.active { background: #000; }
        .slider-container { scrollbar-width: thin; scrollbar-color: rgba(0, 0, 0, 0.3) transparent; }
        .slider-container::-webkit-scrollbar { width: 6px; height: 6px; }
        .slider-container::-webkit-scrollbar-track { background: transparent; }
        .slider-container::-webkit-scrollbar-thumb { background-color: rgba(0, 0, 0, 0.3); border-radius: 3px; }
        .slider-container::-webkit-scrollbar-thumb:hover { background-color: rgba(0, 0, 0, 0.5); }
        .slider-fade-enter-active, .slider-fade-leave-active { transition: opacity 0.3s ease; }
        .slider-fade-enter-from, .slider-fade-leave-to { opacity: 0; } 
      }
    `;
    const addStyle = (eleStyleInit) => {
      const fa = document.querySelector('title');
      const eleStyle = document.createElement('style');
      eleStyle.innerHTML = eleStyleInit;
      document.head.insertBefore(eleStyle, fa);
    };

    addStyle(cssRules);
  }

  /**
   * 绑定事件
   * @private
   */
  bindEvents() {
      if (this.config.navigation.enable) {
          this.prevBtn.addEventListener('click', () => {
              this.stopAutoplay();
              this.prev();
          });
          
          this.nextBtn.addEventListener('click', () => {
              this.stopAutoplay();
              this.next();
          });
      }

      if (this.config.pagination.enable && this.config.pagination.clickable) {
          this.paginationPoints.forEach((point, index) => {
              point.addEventListener('click', () => {
                  this.stopAutoplay();
                  this.slideTo(index);
              });
          });
      }

      this.container.addEventListener('mouseenter', () => {
          if (this.config.autoplay) {
              this.stopAutoplay();
          }
      });

      this.container.addEventListener('mouseleave', () => {
          if (this.config.autoplay) {
              this.startAutoplay();
          }
      });
  }

  /**
   * 初始化自动播放
   * @private
   */
  initAutoplay() {
      if (this.config.autoplay) {
          this.startAutoplay();
      }
  }

  /**
   * 开始自动播放
   * @public
   */
  startAutoplay() {
      if (this.autoplayTimer) return;
      this.autoplayTimer = setInterval(() => {
          this.next();
      }, this.config.autoplayDelay);
  }

  /**
   * 停止自动播放
   * @public
   */
  stopAutoplay() {
      if (this.autoplayTimer) {
          clearInterval(this.autoplayTimer);
          this.autoplayTimer = null;
      }
  }

  /**
   * 切换到上一个slide
   * @public
   */
  prev() {
      if (this.isAnimating) return;
      const newIndex = this.currentIndex - 1;
      this.slideTo(newIndex < 0 ? (this.config.loop ? this.slides.length - 1 : 0) : newIndex);
  }

  /**
   * 切换到下一个slide
   * @public
   */
  next() {
      if (this.isAnimating) return;
      const newIndex = this.currentIndex + 1;
      this.slideTo(newIndex >= this.slides.length ? (this.config.loop ? 0 : this.slides.length - 1) : newIndex);
  }

  /**
   * 切换到指定slide
   * @public
   * @param {number} index - 目标索引
   */
  slideTo(index) {
      if (this.isAnimating || index === this.currentIndex) return;
      
      this.isAnimating = true;
      const translateValue = this.config.direction === 'horizontal' 
          ? `translateX(${-index * 100}%)`
          : `translateY(${-index * 100}%)`;
          
      this.carouselInner.style.transform = translateValue;
      this.carouselInner.style.transition = 'transform 0.3s ease-in-out';
      
      setTimeout(() => {
          this.isAnimating = false;
          this.currentIndex = index;
          this.updatePagination();
          
          if (typeof this.config.onChange === 'function') {
              this.config.onChange(this.currentIndex);
          }
      }, 300);
  }

  /**
   * 更新分页器状态
   * @private
   */
  updatePagination() {
      if (!this.config.pagination.enable || !this.paginationPoints) return;
      
      this.paginationPoints.forEach((point, index) => {
          if (point) {
            // 根据分页器类型使用对应的激活类名
            const activeClass = point.classList.contains('pagin-bullet') 
                ? 'active' 
                : this.config.pagination.bulletActiveClass;
            if (index === this.currentIndex) {
              point.classList.add(activeClass);
            } else {
              point.classList.remove(activeClass);
            }
          }
      });
  }

  /**
   * 导航按钮SVG
   * @private
   */
  get prevBtnSVG() {
    return `
      <svg class="icon icon_prev" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31 36L19 24L31 12" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
    `;
  }

  get nextBtnSVG() {
    return `
      <svg class="icon icon_next" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12L31 24L19 36" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
    `;
  }
}

// 导出到全局
window.DC = window.DC || {};
window.DC.Slider = DCSlider;
