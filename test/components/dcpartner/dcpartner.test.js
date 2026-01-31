/**
 * dcpartner组件测试
 */
const DCPartner = require('../../../src/components/dcpartner/dcpartner');

describe('DCPartner类测试', () => {
  let dcPartner;
  let testContainer;

  beforeEach(() => {
    // 创建测试容器
    testContainer = document.createElement('div');
    testContainer.id = 'test-container';
    document.body.appendChild(testContainer);
    
    // 模拟合作伙伴数据
    const partners = [
      { name: '合作伙伴1', logo: 'partner1.png' },
      { name: '合作伙伴2', logo: 'partner2.png' },
      { name: '合作伙伴3', logo: 'partner3.png' }
    ];
    
    // 初始化DCPartner
    dcPartner = new DCPartner(partners, {
      containerSelector: '#test-container',
      interval: 1000
    });
  });

  afterEach(() => {
    // 清理容器
    document.body.removeChild(testContainer);
    // 清理样式
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
      if (style.innerHTML.includes('.dc-partner-carousel')) {
        document.head.removeChild(style);
      }
    });
    // 清理定时器
    clearInterval(dcPartner.autoPlayInterval);
  });

  test('初始化DCPartner组件', () => {
    dcPartner.init();
    
    const carousel = testContainer.querySelector('.dc-partner-carousel');
    expect(carousel).toBeTruthy();
    
    const carouselInner = carousel.querySelector('.dc-carousel-inner');
    expect(carouselInner).toBeTruthy();
    
    const partnerItems = carouselInner.querySelectorAll('.dc-partner-item');
    expect(partnerItems.length).toBe(3);
  });

  test('移动轮播', () => {
    dcPartner.init();
    
    const carouselInner = testContainer.querySelector('.dc-carousel-inner');
    const initialFirstItem = carouselInner.firstChild;
    
    dcPartner.moveCarousel();
    
    const newFirstItem = carouselInner.firstChild;
    expect(newFirstItem).not.toBe(initialFirstItem);
  });

  test('暂停轮播', () => {
    dcPartner.init();
    
    dcPartner.pause();
    expect(dcPartner.isPlaying).toBe(false);
    
    const carouselInner = testContainer.querySelector('.dc-carousel-inner');
    expect(carouselInner.style.animationPlayState).toBe('paused');
  });

  test('播放轮播', () => {
    dcPartner.init();
    
    dcPartner.pause();
    expect(dcPartner.isPlaying).toBe(false);
    
    dcPartner.play();
    expect(dcPartner.isPlaying).toBe(true);
    
    const carouselInner = testContainer.querySelector('.dc-carousel-inner');
    expect(carouselInner.style.animationPlayState).toBe('running');
  });

  test('自动播放', () => {
    dcPartner.init();
    
    expect(dcPartner.autoPlayInterval).toBeTruthy();
  });

  test('事件监听器', () => {
    dcPartner.init();
    
    const carousel = testContainer.querySelector('.dc-partner-carousel');
    
    // 触发鼠标进入事件
    carousel.dispatchEvent(new MouseEvent('mouseenter'));
    expect(dcPartner.isPlaying).toBe(false);
    
    // 触发鼠标离开事件
    carousel.dispatchEvent(new MouseEvent('mouseleave'));
    expect(dcPartner.isPlaying).toBe(true);
  });

  test('容器不存在的情况', () => {
    // 初始化一个使用不存在容器的DCPartner
    const partners = [
      { name: '合作伙伴1', logo: 'partner1.png' }
    ];
    
    const errorPartner = new DCPartner(partners, {
      containerSelector: '#non-existent-container'
    });
    
    // 模拟console.error
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    
    errorPartner.init();
    
    expect(consoleError).toHaveBeenCalledWith('Container with selector "#non-existent-container" not found.');
    
    // 恢复console.error
    consoleError.mockRestore();
  });
});
