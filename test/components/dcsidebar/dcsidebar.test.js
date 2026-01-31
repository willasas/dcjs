/**
 * DCSidebar 测试文件
 * 测试侧边栏组件的功能和API
 */

describe('DCSidebar', () => {
  let container;
  let sidebar;
  const testMenuData = [
    { title: '首页', link: '#', icon: '<svg class="icon" width="24" height="24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>' },
    { title: '关于我们', link: '#about', icon: '<svg class="icon" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>' },
    { title: '联系我们', link: '#contact', icon: '<svg class="icon" width="24" height="24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>' }
  ];

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 清理测试容器
    if (sidebar) {
      // 移除组件元素
      if (container && container.firstChild) {
        container.firstChild.remove();
      }
    }
    if (container) {
      container.remove();
    }
    // 清理样式
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
      if (style.innerHTML.includes('.common-sidebar')) {
        style.remove();
      }
    });
  });

  test('should initialize with default options', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    expect(sidebar.data).toEqual(testMenuData);
    expect(sidebar.isExpanded).toBe(false);
  });

  test('should initialize with custom backTop options', () => {
    const customBackTop = {
      text: '返回顶部',
      icon: '<svg class="icon" width="24" height="24"><path d="M7 14l5-5 5 5z"/></svg>'
    };

    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData,
      backTop: customBackTop
    });

    expect(sidebar.backTop).toEqual(customBackTop);
  });

  test('should render menus correctly', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    const menuItems = container.querySelectorAll('.sidebar-item');
    expect(menuItems.length).toBe(testMenuData.length);
    
    menuItems.forEach((item, index) => {
      const link = item.querySelector('.item-link');
      expect(link.textContent).toBe(testMenuData[index].title);
      expect(link.href).toContain(testMenuData[index].link);
    });
  });

  test('should set data correctly', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: []
    });

    // 设置新的菜单数据
    sidebar.setData(testMenuData);

    const menuItems = container.querySelectorAll('.sidebar-item');
    expect(menuItems.length).toBe(testMenuData.length);
  });

  test('should add menu item correctly', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    // 添加新的菜单项
    const newItem = {
      title: '服务',
      link: '#services',
      icon: '<svg class="icon" width="24" height="24"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'
    };

    sidebar.addMenuItem(newItem);

    const menuItems = container.querySelectorAll('.sidebar-item');
    expect(menuItems.length).toBe(testMenuData.length + 1);
    
    const lastItem = menuItems[menuItems.length - 1];
    const link = lastItem.querySelector('.item-link');
    expect(link.textContent).toBe(newItem.title);
  });

  test('should add menu item at specific index', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    // 在指定位置添加菜单项
    const newItem = {
      title: '服务',
      link: '#services',
      icon: '<svg class="icon" width="24" height="24"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'
    };

    sidebar.addMenuItem(newItem, 1);

    const menuItems = container.querySelectorAll('.sidebar-item');
    expect(menuItems.length).toBe(testMenuData.length + 1);
    
    const insertedItem = menuItems[1];
    const link = insertedItem.querySelector('.item-link');
    expect(link.textContent).toBe(newItem.title);
  });

  test('should remove menu item correctly', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    // 移除第一个菜单项
    sidebar.removeMenuItem(0);

    const menuItems = container.querySelectorAll('.sidebar-item');
    expect(menuItems.length).toBe(testMenuData.length - 1);
    
    const firstItem = menuItems[0];
    const link = firstItem.querySelector('.item-link');
    expect(link.textContent).toBe(testMenuData[1].title);
  });

  test('should update menu item correctly', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    // 更新第一个菜单项
    const updatedData = {
      title: '首页更新',
      link: '#home'
    };

    sidebar.updateMenuItem(0, updatedData);

    const menuItems = container.querySelectorAll('.sidebar-item');
    const firstItem = menuItems[0];
    const link = firstItem.querySelector('.item-link');
    expect(link.textContent).toBe(updatedData.title);
    expect(link.href).toContain(updatedData.link);
  });

  test('should expand sidebar correctly', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    // 展开侧边栏
    sidebar.expand();

    expect(sidebar.isExpanded).toBe(true);
    const sidebarDefault = container.querySelector('.sidebar-default');
    expect(sidebarDefault.classList.contains('show')).toBe(true);
  });

  test('should collapse sidebar correctly', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    // 先展开侧边栏
    sidebar.expand();
    expect(sidebar.isExpanded).toBe(true);

    // 然后收起侧边栏
    sidebar.collapse();
    expect(sidebar.isExpanded).toBe(false);
  });

  test('should toggle sidebar correctly', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    // 初始状态应该是收起的
    expect(sidebar.isExpanded).toBe(false);

    // 切换到展开状态
    sidebar.toggle();
    expect(sidebar.isExpanded).toBe(true);

    // 切换到收起状态
    sidebar.toggle();
    expect(sidebar.isExpanded).toBe(false);
  });

  test('should call onClick callback when menu item is clicked', (done) => {
    const onClickMock = jest.fn((item, index) => {
      expect(item).toEqual(testMenuData[0]);
      expect(index).toBe(0);
      done();
    });

    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData,
      onClick: onClickMock
    });

    // 模拟点击第一个菜单项
    const firstMenuItem = container.querySelector('.sidebar-item');
    firstMenuItem.click();
  });

  test('should handle scroll event for back to top button', () => {
    sidebar = new window.DC.Sidebar({
      container: '#test-container',
      data: testMenuData
    });

    const btnTop = container.querySelector('.btn-top');
    
    // 模拟滚动到200px以上
    window.scrollTo(0, 300);
    // 触发滚动事件
    window.dispatchEvent(new Event('scroll'));
    
    expect(btnTop.style.display).toBe('flex');

    // 模拟滚动到顶部
    window.scrollTo(0, 0);
    // 触发滚动事件
    window.dispatchEvent(new Event('scroll'));
    
    expect(btnTop.style.display).toBe('none');
  });
});
