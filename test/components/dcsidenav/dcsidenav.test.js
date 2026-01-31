/**
 * DCSidenav 测试文件
 * 测试侧边导航组件的功能和API
 */

describe('DCSidenav', () => {
  let container;
  let sidenav;
  const testNavData = [
    { title: '导航1', link: '#section1', icon: '<svg class="icon" width="24" height="24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>' },
    { title: '导航2', link: '#section2', icon: '<svg class="icon" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>' },
    { title: '导航3', link: '#section3', icon: '<svg class="icon" width="24" height="24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>' }
  ];

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);

    // 创建测试内容区域
    for (let i = 1; i <= 3; i++) {
      const section = document.createElement('div');
      section.id = `section${i}`;
      section.dataset.navSection = `section${i}`;
      section.style.height = '800px';
      section.style.padding = '20px';
      section.style.backgroundColor = `#f${i}f${i}f${i}`;
      section.innerHTML = `<h2>Section ${i}</h2><p>Content for section ${i}</p>`;
      document.body.appendChild(section);
    }
  });

  afterEach(() => {
    // 清理测试容器
    if (sidenav) {
      // 移除组件元素
      if (sidenav.container && sidenav.container.parentNode) {
        sidenav.container.parentNode.removeChild(sidenav.container);
      }
    }
    if (container) {
      container.remove();
    }
    // 清理测试内容区域
    const sections = document.querySelectorAll('[data-nav-section]');
    sections.forEach(section => section.remove());
    // 清理样式
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
      if (style.innerHTML.includes('.dc-side-nav')) {
        style.remove();
      }
    });
  });

  test('should initialize with default options', () => {
    sidenav = new window.DC.Sidenav({
      container: '#test-container',
      data: testNavData
    });

    expect(sidenav.data).toEqual(testNavData);
    expect(sidenav.threshold).toBe(200);
    expect(sidenav.offset).toBe(0);
    expect(sidenav.activeClass).toBe('active');
    expect(sidenav.isVisible).toBe(false);
  });

  test('should initialize with custom options', () => {
    const customOptions = {
      container: '#test-container',
      data: testNavData,
      threshold: 300,
      offset: 50,
      activeClass: 'current',
      onClick: jest.fn()
    };

    sidenav = new window.DC.Sidenav(customOptions);

    expect(sidenav.threshold).toBe(customOptions.threshold);
    expect(sidenav.offset).toBe(customOptions.offset);
    expect(sidenav.activeClass).toBe(customOptions.activeClass);
    expect(sidenav.onClick).toBe(customOptions.onClick);
  });

  test('should render nav items correctly', () => {
    sidenav = new window.DC.Sidenav({
      container: '#test-container',
      data: testNavData
    });

    const navItems = container.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(testNavData.length);

    navItems.forEach((item, index) => {
      const title = item.querySelector('.nav-title');
      const icon = item.querySelector('.nav-icon');
      expect(title.textContent).toBe(testNavData[index].title);
      expect(icon.innerHTML).toBe(testNavData[index].icon);
    });
  });

  test('should add nav item correctly', () => {
    sidenav = new window.DC.Sidenav({
      container: '#test-container',
      data: testNavData
    });

    const newItem = {
      title: '导航4',
      link: '#section4',
      icon: '<svg class="icon" width="24" height="24"><path d="M17 11h-4v-1h4V8h-5v7h2v1h-2v2h5v-4h-4v-1h4v-2zm3-9H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 2v16H4V4h16z"/></svg>'
    };

    sidenav.addItem(newItem);

    const navItems = container.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(testNavData.length + 1);

    const lastItem = navItems[navItems.length - 1];
    const title = lastItem.querySelector('.nav-title');
    expect(title.textContent).toBe(newItem.title);
  });

  test('should set data correctly', () => {
    sidenav = new window.DC.Sidenav({
      container: '#test-container',
      data: []
    });

    // 设置新的导航数据
    sidenav.setData(testNavData);

    const navItems = container.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(testNavData.length);
  });

  test('should handle scroll event correctly', () => {
    sidenav = new window.DC.Sidenav({
      container: '#test-container',
      data: testNavData,
      threshold: 100
    });

    // 模拟滚动到阈值以上
    window.scrollTo(0, 150);
    // 触发滚动事件
    window.dispatchEvent(new Event('scroll'));

    expect(sidenav.isVisible).toBe(true);
    expect(container.classList.contains('show')).toBe(true);

    // 模拟滚动到阈值以下
    window.scrollTo(0, 50);
    // 触发滚动事件
    window.dispatchEvent(new Event('scroll'));

    expect(sidenav.isVisible).toBe(false);
    expect(container.classList.contains('show')).toBe(false);
  });

  test('should update active state on scroll', () => {
    sidenav = new window.DC.Sidenav({
      container: '#test-container',
      data: testNavData,
      threshold: 100
    });

    // 模拟滚动到第二个区域
    const section2 = document.getElementById('section2');
    section2.scrollIntoView({ behavior: 'smooth' });
    // 触发滚动事件
    window.dispatchEvent(new Event('scroll'));

    // 检查激活状态
    const navItems = container.querySelectorAll('.nav-item');
    expect(navItems[1].classList.contains('active')).toBe(true);
  });

  test('should handle nav item click correctly', (done) => {
    const onClickMock = jest.fn((item, index) => {
      expect(item).toEqual(testNavData[0]);
      expect(index).toBe(0);
      done();
    });

    sidenav = new window.DC.Sidenav({
      container: '#test-container',
      data: testNavData,
      onClick: onClickMock
    });

    // 模拟点击第一个导航项
    const firstNavItem = container.querySelector('.nav-item');
    firstNavItem.click();
  });

  test('should create container if not provided', () => {
    sidenav = new window.DC.Sidenav({
      data: testNavData
    });

    expect(sidenav.container).toBeTruthy();
    expect(sidenav.container.classList.contains('dc-side-nav')).toBe(true);
    expect(sidenav.container.parentNode).toBe(document.body);
  });
});
