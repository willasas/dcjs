class DCPartner {
  constructor(partners = [], options = {}) {
    this.partners = partners;
    this.currentIndex = 0;
    this.interval = options.interval || 3000; // 默认轮播间隔为 3000 毫秒
    this.containerSelector = options.containerSelector || 'body'; // 默认容器为 body
    this.isPlaying = true;
    this.container = document.createElement('div');
    this.container.className = 'dc-partner-carousel';
  }

  init() {
    this.render();
    this.createStyle();
    this.startAutoPlay();
    this.addEventListeners();
  }

  render() {
    this.container.innerHTML = ''; // 清空容器内容

    const carouselInner = document.createElement('div');
    carouselInner.className = 'dc-carousel-inner';

    this.partners.forEach((partner) => {
      const partnerElement = document.createElement('div');
      partnerElement.className = 'dc-partner-item';
      const img = document.createElement('img');
      img.src = partner.logo;
      img.alt = partner.name;
      partnerElement.appendChild(img);
      carouselInner.appendChild(partnerElement);
    });

    this.container.appendChild(carouselInner);

    const targetContainer = document.querySelector(this.containerSelector);
    if (targetContainer) {
      targetContainer.appendChild(this.container);
    } else {
      console.error(`Container with selector "${this.containerSelector}" not found.`);
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      if (this.isPlaying) {
        this.moveCarousel();
      }
    }, this.interval);
  }

  moveCarousel() {
    if (!this.isPlaying) return;

    const carouselInner = this.container.querySelector('.dc-carousel-inner');
    const firstItem = carouselInner.querySelector('.dc-partner-item');
    carouselInner.appendChild(firstItem.cloneNode(true));
    carouselInner.removeChild(firstItem);
  }

  addEventListeners() {
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => this.play());
  }

  pause() {
    this.isPlaying = false;
    const carouselInner = this.container.querySelector('.dc-carousel-inner');
    carouselInner.style.animationPlayState = 'paused';
  }

  play() {
    this.isPlaying = true;
    const carouselInner = this.container.querySelector('.dc-carousel-inner');
    carouselInner.style.animationPlayState = 'running';
  }

  createStyle() {
    const cssRules = `
      .dc-partner-carousel {
        margin: 0 auto;
        position: relative;
        max-width: 800px;
        width: 100%;
        min-height: 56px;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 12px 20px;
      }
      .dc-carousel-inner {
        position: absolute;
        display: flex;
        white-space: nowrap;
        animation: ani-scroll-left 10s linear infinite;
        animation-play-state: running;
      }
      .dc-partner-item {
        display: inline-block;
        width: 150px;
        margin-right: 10px;
      }
      .dc-partner-item img {
        display: block;
        margin: 0 auto;
        width: 100%;
        height: auto;
        object-fit: contain;
      }

      @keyframes ani-scroll-left {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `;
    const style = document.createElement('style');
    style.innerHTML = cssRules;
    document.head.appendChild(style);
  }
}

// 导出到全局
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCPartner;
} else {
  window.DC = window.DC || {};
  window.DC.Partner = DCPartner;
}
