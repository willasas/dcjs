/**
 * dcproductivityslider组件测试
 */
const DCProductivitySlider = require('../../../src/components/dcproductivityslider/dcproductivityslider');

describe('DCProductivitySlider类测试', () => {
  let dcProductivitySlider;
  let testContainer;

  beforeEach(() => {
    // 创建测试容器
    testContainer = document.createElement('div');
    testContainer.id = 'test-container';
    document.body.appendChild(testContainer);
    
    // 模拟滑块项目数据
    const sliderItems = [
      {
        title: '项目1',
        backgroundImage: 'https://via.placeholder.com/800x600?text=Project+1',
        thumbnail: 'https://via.placeholder.com/200x150?text=Thumb+1',
        description: '项目1描述',
        buttonText: '了解更多',
        link: 'https://example.com/project1',
        target: '_blank'
      },
      {
        title: '项目2',
        backgroundImage: 'https://via.placeholder.com/800x600?text=Project+2',
        thumbnail: 'https://via.placeholder.com/200x150?text=Thumb+2',
        description: '项目2描述',
        buttonText: '了解更多',
        link: 'https://example.com/project2'
      },
      {
        title: '项目3',
        backgroundImage: 'https://via.placeholder.com/800x600?text=Project+3',
        thumbnail: 'https://via.placeholder.com/200x150?text=Thumb+3',
        description: '项目3描述',
        buttonText: '了解更多',
        link: 'https://example.com/project3'
      }
    ];
    
    // 初始化DCProductivitySlider
    dcProductivitySlider = new DCProductivitySlider({
      container: '#test-container',
      items: sliderItems,
      closedWidth: '100px',
      openWidth: '400px',
      gap: '20px',
      speed: '0.5s',
      accentColor: '#ff6b35',
      autoPlay: false,
      showDots: true,
      showNavigation: true,
      enableKeyboard: true,
      enableTouch: true,
      enableHover: true,
      onItemClick: jest.fn(),
      onItemActivate: jest.fn(),
      onItemDeactivate: jest.fn(),
      onChange: jest.fn(),
      onInit: jest.fn(),
      onAutoPlayStart: jest.fn(),
      onAutoPlayPause: jest.fn(),
      onLinkClick: jest.fn()
    });
  });

  afterEach(() => {
    // 清理容器
    document.body.removeChild(testContainer);
    // 清理样式
    const styles = document.querySelectorAll('style[data-dc-productivity-slider]');
    styles.forEach(style => {
      document.head.removeChild(style);
    });
    // 清理自动播放定时器
    if (dcProductivitySlider.autoPlayTimer) {
      clearInterval(dcProductivitySlider.autoPlayTimer);
    }
  });

  test('初始化DCProductivitySlider组件', () => {
    expect(testContainer.querySelector('.dc-productivity-slider')).toBeTruthy();
    expect(testContainer.querySelector('.productivity-slider')).toBeTruthy();
    expect(testContainer.querySelector('.track')).toBeTruthy();
    expect(testContainer.querySelectorAll('.project-card').length).toBe(3);
    expect(testContainer.querySelector('.productivity-dots')).toBeTruthy();
    expect(testContainer.querySelector('.productivity-controls')).toBeTruthy();
  });

  test('激活指定索引的卡片', () => {
    dcProductivitySlider.activate(1);
    expect(dcProductivitySlider.currentIndex).toBe(1);
    expect(testContainer.querySelectorAll('.project-card')[1].classList.contains('active')).toBe(true);
  });

  test('切换到上一个卡片', () => {
    dcProductivitySlider.activate(1);
    dcProductivitySlider.go(-1);
    expect(dcProductivitySlider.currentIndex).toBe(0);
  });

  test('切换到下一个卡片', () => {
    dcProductivitySlider.activate(0);
    dcProductivitySlider.go(1);
    expect(dcProductivitySlider.currentIndex).toBe(1);
  });

  test('开始自动播放', () => {
    dcProductivitySlider.config.autoPlay = true;
    dcProductivitySlider.play();
    expect(dcProductivitySlider.autoPlayTimer).toBeTruthy();
  });

  test('暂停自动播放', () => {
    dcProductivitySlider.config.autoPlay = true;
    dcProductivitySlider.play();
    dcProductivitySlider.pause();
    expect(dcProductivitySlider.autoPlayTimer).toBeNull();
  });

  test('更新滑块项目', () => {
    const newItems = [
      {
        title: '新项目1',
        backgroundImage: 'https://via.placeholder.com/800x600?text=New+Project+1',
        thumbnail: 'https://via.placeholder.com/200x150?text=New+Thumb+1',
        description: '新项目1描述',
        buttonText: '了解更多',
        link: 'https://example.com/new-project1'
      },
      {
        title: '新项目2',
        backgroundImage: 'https://via.placeholder.com/800x600?text=New+Project+2',
        thumbnail: 'https://via.placeholder.com/200x150?text=New+Thumb+2',
        description: '新项目2描述',
        buttonText: '了解更多',
        link: 'https://example.com/new-project2'
      }
    ];
    
    dcProductivitySlider.updateItems(newItems);
    expect(testContainer.querySelectorAll('.project-card').length).toBe(2);
    expect(testContainer.querySelectorAll('.dot').length).toBe(2);
  });

  test('销毁组件', () => {
    dcProductivitySlider.destroy();
    expect(testContainer.innerHTML).toBe('');
  });

  test('检查移动设备检测', () => {
    const isMobile = dcProductivitySlider.checkMobile();
    expect(typeof isMobile).toBe('boolean');
  });

  test('导航按钮事件', () => {
    const prevBtn = testContainer.querySelector('.nav-btn.prev');
    const nextBtn = testContainer.querySelector('.nav-btn.next');
    
    // 触发下一个按钮点击
    nextBtn.click();
    expect(dcProductivitySlider.currentIndex).toBe(1);
    
    // 触发上一个按钮点击
    prevBtn.click();
    expect(dcProductivitySlider.currentIndex).toBe(0);
  });

  test('分页点事件', () => {
    const dots = testContainer.querySelectorAll('.dot');
    dots[2].click();
    expect(dcProductivitySlider.currentIndex).toBe(2);
  });

  test('卡片点击事件', () => {
    const cards = testContainer.querySelectorAll('.project-card');
    cards[1].click();
    expect(dcProductivitySlider.currentIndex).toBe(1);
  });

  test('链接点击事件', () => {
    const linkClickSpy = jest.spyOn(dcProductivitySlider.config, 'onLinkClick');
    const btn = testContainer.querySelector('.project-card-btn');
    btn.click();
    expect(linkClickSpy).toHaveBeenCalled();
  });
});
