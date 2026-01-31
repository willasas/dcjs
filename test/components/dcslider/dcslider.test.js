/**
 * DCSlider 测试文件
 * 测试轮播组件的功能和API
 */

describe('DCSlider', () => {
  let container;
  let slider;
  const testSlides = [
    '<div><h2>Slide 1</h2><p>Content for slide 1</p></div>',
    '<div><h2>Slide 2</h2><p>Content for slide 2</p></div>',
    '<div><h2>Slide 3</h2><p>Content for slide 3</p></div>'
  ];

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 清理测试容器
    if (slider) {
      // 停止自动播放
      slider.stopAutoplay();
      // 移除组件元素
      if (slider.container && slider.container.parentNode) {
        slider.container.parentNode.removeChild(slider.container);
      }
    }
    if (container) {
      container.remove();
    }
    // 清理样式
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
      if (style.innerHTML.includes('.slider-container')) {
        style.remove();
      }
    });
  });

  test('should initialize with default options', () => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides
    });

    expect(slider.config.direction).toBe('horizontal');
    expect(slider.config.autoplay).toBe(false);
    expect(slider.config.loop).toBe(true);
    expect(slider.currentIndex).toBe(0);
  });

  test('should initialize with custom options', () => {
    const customOptions = {
      container: '#test-container',
      slides: testSlides,
      direction: 'vertical',
      autoplay: true,
      autoplayDelay: 2000,
      loop: false
    };

    slider = new window.DC.Slider(customOptions);

    expect(slider.config.direction).toBe(customOptions.direction);
    expect(slider.config.autoplay).toBe(customOptions.autoplay);
    expect(slider.config.autoplayDelay).toBe(customOptions.autoplayDelay);
    expect(slider.config.loop).toBe(customOptions.loop);
  });

  test('should create slider elements correctly', () => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides
    });

    const sliderContainer = container.querySelector('.slider-container');
    const carousel = container.querySelector('.slider-carousel');
    const carouselInner = container.querySelector('.slider-carousel-inner');
    const slides = container.querySelectorAll('.slide');
    const pagination = container.querySelector('.slider-pagin-ctrl');
    const prevBtn = container.querySelector('.slider-prev');
    const nextBtn = container.querySelector('.slider-next');

    expect(sliderContainer).toBeTruthy();
    expect(carousel).toBeTruthy();
    expect(carouselInner).toBeTruthy();
    expect(slides.length).toBe(testSlides.length);
    expect(pagination).toBeTruthy();
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
  });

  test('should slide to next slide', (done) => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides,
      onChange: (index) => {
        expect(index).toBe(1);
        done();
      }
    });

    // 切换到下一个slide
    slider.next();
  });

  test('should slide to previous slide', (done) => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides,
      onChange: (index) => {
        // 由于循环播放，从0切换到前一个会变成2
        expect(index).toBe(2);
        done();
      }
    });

    // 先切换到下一个slide
    slider.next();
    // 然后切换到前一个slide
    setTimeout(() => {
      slider.prev();
    }, 400);
  });

  test('should slide to specific index', (done) => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides,
      onChange: (index) => {
        expect(index).toBe(2);
        done();
      }
    });

    // 切换到指定索引
    slider.slideTo(2);
  });

  test('should update pagination correctly', () => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides
    });

    // 检查初始状态
    const paginationPoints = container.querySelectorAll('.pagin-bullet');
    expect(paginationPoints[0].classList.contains('active')).toBe(true);
    expect(paginationPoints[1].classList.contains('active')).toBe(false);
    expect(paginationPoints[2].classList.contains('active')).toBe(false);

    // 切换到下一个slide
    slider.next();

    // 检查状态更新
    setTimeout(() => {
      expect(paginationPoints[0].classList.contains('active')).toBe(false);
      expect(paginationPoints[1].classList.contains('active')).toBe(true);
      expect(paginationPoints[2].classList.contains('active')).toBe(false);
    }, 400);
  });

  test('should start and stop autoplay', () => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides,
      autoplay: true,
      autoplayDelay: 100
    });

    expect(slider.autoplayTimer).toBeTruthy();

    // 停止自动播放
    slider.stopAutoplay();
    expect(slider.autoplayTimer).toBeNull();

    // 开始自动播放
    slider.startAutoplay();
    expect(slider.autoplayTimer).toBeTruthy();
  });

  test('should handle loop correctly', () => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides,
      loop: true
    });

    // 从最后一个slide切换到下一个应该回到第一个
    slider.slideTo(2);

    setTimeout(() => {
      slider.next();
      setTimeout(() => {
        expect(slider.currentIndex).toBe(0);
      }, 400);
    }, 400);
  });

  test('should call onInit callback', (done) => {
    const onInitMock = jest.fn((sliderInstance) => {
      expect(sliderInstance).toBeTruthy();
      done();
    });

    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides,
      onInit: onInitMock
    });
  });

  test('should call onChange callback', (done) => {
    const onChangeMock = jest.fn((index) => {
      expect(index).toBe(1);
      done();
    });

    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides,
      onChange: onChangeMock
    });

    // 切换slide触发回调
    slider.next();
  });

  test('should handle vertical direction', () => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides,
      direction: 'vertical'
    });

    expect(slider.config.direction).toBe('vertical');
  });

  test('should not slide when animating', () => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides
    });

    // 手动设置动画状态为true
    slider.isAnimating = true;
    const initialIndex = slider.currentIndex;

    // 尝试切换slide
    slider.next();

    // 索引应该保持不变
    expect(slider.currentIndex).toBe(initialIndex);
  });

  test('should not slide when index is the same', () => {
    slider = new window.DC.Slider({
      container: '#test-container',
      slides: testSlides
    });

    const initialIndex = slider.currentIndex;

    // 尝试切换到相同索引
    slider.slideTo(initialIndex);

    // 索引应该保持不变
    expect(slider.currentIndex).toBe(initialIndex);
  });
});
