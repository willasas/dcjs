const DCHeader = require('../../../src/components/header/dcheader');

// 模拟全局配置
const mockConfig = {
  header: {
    official: {
      logo: {
        link: '/',
        src: '/assets/images/logo.png',
        alt: 'Official Logo'
      },
      mainMenu: [
        {
          id: 'home',
          link: '/',
          text: '首页'
        },
        {
          id: 'games',
          link: '/games',
          text: '游戏',
          hasSubmenu: true,
          submenu: [
            {
              link: '/games/action',
              text: '动作游戏',
              description: '刺激的动作游戏'
            },
            {
              link: '/games/rpg',
              text: '角色扮演',
              description: '丰富的角色扮演游戏'
            }
          ]
        },
        {
          id: 'about',
          link: '/about',
          text: '关于我们'
        }
      ]
    },
    gaming: {
      logo: {
        link: '/gaming',
        src: '/assets/images/gaming-logo.png',
        alt: 'Gaming Logo'
      },
      mainMenu: [
        {
          id: 'gaming-home',
          link: '/gaming',
          text: '游戏首页'
        },
        {
          id: 'gaming-news',
          link: '/gaming/news',
          text: '游戏资讯'
        }
      ]
    }
  },
  userArea: {
    search: {
      placeholder: '搜索游戏、新闻...'
    },
    auth: {
      login: {
        link: '/login',
        text: '登录'
      },
      register: {
        link: '/register',
        text: '注册'
      }
    },
    userMenu: [
      {
        link: '/profile',
        icon: '<svg class="icon" width="18" height="18"><path d="M9 11.3c0 1.4-1.1 2.5-2.5 2.5S4 12.7 4 11.3 5.1 8.8 6.5 8.8 9 10 9 11.3zm-2.5-6.8C8.5 5.8 11 8.6 11 11.3s-2.5 5.5-5.5 5.5S0 13 0 11.3 2.5 4.5 5.5 4.5zm8.5 3.8c-1 0-1.8 0.8-1.8 1.8s0.8 1.8 1.8 1.8 1.8-0.8 1.8-1.8-0.8-1.8-1.8-1.8zm0 5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm4-13h-2v1h-1v2h-2v1h-1v-1h-2v-2h-1v-1h1v-2h2v-1h1v1h2v2h1v1z"/></svg>',
        text: '个人中心'
      },
      {
        link: '/settings',
        icon: '<svg class="icon" width="18" height="18"><path d="M12.9 11.3c-0.7-1-2-1.6-3.5-1.6s-2.8 0.6-3.5 1.6l-0.1 0.1c-0.4 0.5-0.6 1.1-0.6 1.8v2.3c0 0.6 0.2 1.3 0.6 1.8l0.1 0.1c0.7 1 2 1.6 3.5 1.6s2.8-0.6 3.5-1.6l0.1-0.1c0.4-0.5 0.6-1.1 0.6-1.8v-2.3c0-0.6-0.2-1.3-0.6-1.8l-0.1-0.1zM11.4 17c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2zm0-6c-0.6 0-1.1 0.5-1.1 1.1s0.5 1.1 1.1 1.1 1.1-0.5 1.1-1.1-0.5-1.1-1.1-1.1z"/><path d="M19.1 1.1l-1.4 1.4c-2.9 2.9-7.6 2.9-10.5 0l-1.4-1.4c-0.4-0.4-0.4-1 0-1.4l1.4-1.4c0.4-0.4 1-0.4 1.4 0l1.4 1.4c1.7-1.7 4.5-1.7 6.2 0l1.4-1.4c0.4-0.4 1-0.4 1.4 0l1.4 1.4c0.4 0.4 0.4 1 0 1.4z"/></svg>',
        text: '设置'
      },
      {
        link: '/logout',
        icon: '<svg class="icon" width="18" height="18"><path d="M7.4 4.5h5.2v-2h-5.2v2zM9 18c-4.9 0-9-4.1-9-9s4.1-9 9-9 9 4.1 9 9-4.1 9-9 9zm-3.3-4.5v-9h2.3l2.7 2.7 1.4-1.4-5.5-5.5h-5.2v11h5.2l5.5-5.5-1.4-1.4-2.7 2.7h-2.3z"/></svg>',
        text: '退出登录'
      }
    ]
  }
};

// 模拟用户信息
const mockUserInfo = {
  name: {
    text: '张三',
    num: '#12345'
  },
  level: {
    text: '等级',
    num: '5'
  },
  coin: {
    text: '硬币',
    num: '100'
  },
  avatar: '/assets/images/avatar.png'
};

// 模拟fetch函数
global.fetch = jest.fn();

// 模拟document.createElement
document.createElement = jest.fn((tagName) => {
  const element = {
    tagName,
    innerHTML: '',
    className: '',
    style: {},
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      toggle: jest.fn(),
      contains: jest.fn(() => false)
    },
    firstElementChild: null
  };

  if (tagName === 'div') {
    element.firstElementChild = {
      ...element,
      tagName: 'header'
    };
  }

  return element;
});

// 模拟document.body
document.body = {
  appendChild: jest.fn(),
  insertBefore: jest.fn(),
  firstChild: null
};

// 模拟document.querySelector
document.querySelector = jest.fn(() => null);

// 模拟document.querySelectorAll
document.querySelectorAll = jest.fn(() => []);

// 模拟document.head
document.head = {
  insertBefore: jest.fn()
};

// 模拟document.createElementNS
document.createElementNS = jest.fn(() => ({
  setAttribute: jest.fn(),
  appendChild: jest.fn()
}));

// 模拟window.location
window.location = {
  href: ''
};

// 模拟window.DC
window.DC = {
  config: mockConfig
};

describe('DCHeader Component', () => {
  beforeEach(() => {
    // 重置所有模拟
    jest.clearAllMocks();
  });

  test('should initialize with default options', async () => {
    const header = new DCHeader();
    await header.init();

    expect(header.type).toBe('official');
    expect(header.selector).toBeUndefined();
    expect(header.isLoggedIn).toBe(false);
    expect(header.userInfo).toBeNull();
    expect(header.config).toEqual(mockConfig);
  });

  test('should initialize with custom options', async () => {
    const options = {
      type: 'gaming',
      selector: '#header-container',
      isLoggedIn: true,
      userInfo: mockUserInfo
    };

    const header = new DCHeader(options);
    await header.init();

    expect(header.type).toBe('gaming');
    expect(header.selector).toBe('#header-container');
    expect(header.isLoggedIn).toBe(true);
    expect(header.userInfo).toEqual(mockUserInfo);
  });

  test('should render header element', async () => {
    const header = new DCHeader();
    await header.init();

    const headerElement = header.render();
    expect(headerElement.tagName).toBe('HEADER');
    expect(headerElement.className).toBe('official-header dc-header');
  });

  test('should render logo correctly', async () => {
    const header = new DCHeader();
    await header.init();

    const logoHTML = header.renderLogo();
    expect(logoHTML).toContain('dc-header-logo');
    expect(logoHTML).toContain(mockConfig.header.official.logo.link);
    expect(logoHTML).toContain(mockConfig.header.official.logo.src);
    expect(logoHTML).toContain(mockConfig.header.official.logo.alt);
  });

  test('should render main menu correctly', async () => {
    const header = new DCHeader();
    await header.init();

    const menuHTML = header.renderMainMenu();
    expect(menuHTML).toContain('dc-header-nav');
    expect(menuHTML).toContain('dc-header-menu');

    // 检查菜单项
    mockConfig.header.official.mainMenu.forEach(item => {
      expect(menuHTML).toContain(item.text);
      expect(menuHTML).toContain(item.link);
    });
  });

  test('should render user area with auth buttons when not logged in', async () => {
    const header = new DCHeader({ isLoggedIn: false });
    await header.init();

    const userAreaHTML = header.renderUserArea();
    expect(userAreaHTML).toContain('dc-header-user');
    expect(userAreaHTML).toContain('dc-search');
    expect(userAreaHTML).toContain('dc-auth');
    expect(userAreaHTML).toContain(mockConfig.userArea.auth.login.text);
    expect(userAreaHTML).toContain(mockConfig.userArea.auth.register.text);
  });

  test('should render user area with user menu when logged in', async () => {
    const header = new DCHeader({ isLoggedIn: true, userInfo: mockUserInfo });
    await header.init();

    const userAreaHTML = header.renderUserArea();
    expect(userAreaHTML).toContain('dc-header-user');
    expect(userAreaHTML).toContain('dc-search');
    expect(userAreaHTML).toContain('dc-user');
    expect(userAreaHTML).toContain(mockUserInfo.name.text);
  });

  test('should bind events correctly', async () => {
    const header = new DCHeader();
    await header.init();

    // 模拟header元素
    const mockHeader = {
      querySelector: jest.fn((selector) => {
        if (selector === '.dc-search-btn') return { addEventListener: jest.fn() };
        if (selector === '.dc-search-panel') return { classList: { add: jest.fn(), remove: jest.fn() } };
        if (selector === '.search-btn-close') return { addEventListener: jest.fn() };
        if (selector === '.search-input') return { addEventListener: jest.fn(), focus: jest.fn(), value: '' };
        if (selector === '.search-input-wrap .icon_search') return { addEventListener: jest.fn() };
        if (selector === '.header-menu-toggle') return { addEventListener: jest.fn(), classList: { toggle: jest.fn(), contains: jest.fn(() => false) } };
        if (selector === '.dc-header-menu') return { classList: { toggle: jest.fn(), remove: jest.fn(), contains: jest.fn(() => false) } };
        if (selector === '.dc-user-avatar') return { addEventListener: jest.fn() };
        if (selector === '.dc-user-dropdown') return { classList: { toggle: jest.fn(), remove: jest.fn(), contains: jest.fn(() => false) }, contains: jest.fn(() => false) };
        return null;
      }),
      querySelectorAll: jest.fn(() => [
        {
          querySelector: jest.fn((selector) => {
            if (selector === '.dc-menu-link') return { addEventListener: jest.fn() };
            if (selector === '.dc-submenu') return { classList: { toggle: jest.fn(), contains: jest.fn(() => false) } };
            if (selector === '.icon_chevron_down .chevron-line') return { setAttribute: jest.fn() };
            return null;
          })
        }
      ]),
      contains: jest.fn(() => false)
    };

    // 模拟document.querySelector返回header元素
    document.querySelector = jest.fn(() => mockHeader);

    header.bindEvents();

    // 验证事件绑定
    expect(document.querySelector).toHaveBeenCalledWith('.official-header');
  });

  test('should create instance with static create method', () => {
    const header = DCHeader.create({ type: 'gaming' });
    expect(header).toBeInstanceOf(DCHeader);
    expect(header.type).toBe('gaming');
  });

  test('should handle error when config fails to load', async () => {
    // 模拟fetch失败
    global.fetch.mockRejectedValue(new Error('Network error'));

    // 清除window.DC.config
    delete window.DC.config;

    const header = new DCHeader();

    // 验证初始化失败
    await expect(header.init()).rejects.toThrow('Network error');
  });

  test('should fallback to body when container not found', async () => {
    const header = new DCHeader({ selector: '#non-existent' });
    await header.init();

    const headerElement = header.render();
    expect(document.body.appendChild).toHaveBeenCalledWith(headerElement);
  });
});
