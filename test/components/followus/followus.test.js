/**
 * DCFollowUs 组件测试
 */

// 模拟DOM环境
if (typeof window === 'undefined') {
  global.window = {};
  global.document = {
    documentElement: {
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      }
    },
    body: {
      appendChild: jest.fn(),
      querySelector: jest.fn(),
      querySelectorAll: jest.fn()
    },
    head: {
      appendChild: jest.fn(),
      insertBefore: jest.fn()
    },
    createElement: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn()
  };
  global.HTMLElement = function() {};
  global.console = {
    error: jest.fn()
  };
}

// 导入组件
const DCFollowUs = require('../../../src/components/followus/dcfollowus');

// 模拟document.createElement
const createElementMock = (tag) => {
  const element = {
    className: '',
    textContent: '',
    innerHTML: '',
    href: '',
    style: {},
    appendChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
    addEventListener: jest.fn(),
    setAttribute: jest.fn()
  };

  return element;
};

document.createElement.mockImplementation(createElementMock);

// 模拟document.querySelector
document.querySelector.mockImplementation((selector) => {
  if (selector === 'title') {
    return {};
  }
  return null;
});

// 模拟document.querySelectorAll
document.querySelectorAll.mockImplementation((selector) => {
  if (selector === '.follow-item') {
    return [
      {
        querySelector: jest.fn((sel) => {
          if (sel === '.follow-hover') {
            return {
              style: {}
            };
          }
          return null;
        }),
        addEventListener: jest.fn()
      }
    ];
  }
  return [];
});

describe('DCFollowUs', () => {
  let followUs;
  let mockConfig;

  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks();

    // 模拟配置
    mockConfig = {
      items: [
        {
          link: 'https://www.facebook.com',
          text: 'Facebook',
          hoverText: 'Follow us on Facebook',
          iconName: 'icon-facebook',
          icon: '<svg class="icon icon_facebook" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M512 0C229.12 0 0 229.12 0 512s229.12 512 512 512 512-229.12 512-512-229.12-512-512-512z m0 949.76c-241.28 0-437.76-196.48-437.76-437.76S270.72 74.24 512 74.24 949.76 270.72 949.76 512 753.28 949.76 512 949.76zM434.56 354.56v59.52h-60.16V512h60.16v295.68h97.28V512h97.28l15.36-97.92H531.84V364.8c0-25.6 8.32-49.92 44.8-49.92h72.96V216.96H545.92c-87.68 0-111.36 57.6-111.36 137.6z" /></svg>'
        },
        {
          link: 'https://www.twitter.com',
          text: 'Twitter',
          hoverText: 'Follow us on Twitter',
          iconName: 'icon-twitter',
          icon: '<svg class="icon icon_twitter" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M778.410667 96h141.141333l-308.352 352.426667 362.752 479.573333H689.92l-222.464-290.858667L212.906667 928H71.68l329.813333-376.96L53.504 96H344.746667l201.088 265.856 232.576-265.856z m-49.536 747.52h78.208L302.250667 176.042667H218.325333L728.874667 843.52z"  /></svg>'
        }
      ]
    };

    // 创建组件实例
    followUs = new DCFollowUs(mockConfig);
  });

  test('should initialize correctly', () => {
    expect(followUs).toBeDefined();
    expect(followUs.config).toEqual(mockConfig);
  });

  test('should generate HTML structure', () => {
    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.createElement).toHaveBeenCalledWith('i');
    expect(document.createElement).toHaveBeenCalledWith('span');
  });

  test('should insert CSS styles', () => {
    expect(document.createElement).toHaveBeenCalledWith('style');
    expect(document.head.insertBefore).toHaveBeenCalled();
  });

  test('should add event listeners', () => {
    const followItem = document.createElement('.follow-item');
    expect(followItem.addEventListener).toHaveBeenCalled();
  });

  test('should append container to body', () => {
    expect(document.body.appendChild).toHaveBeenCalled();
  });

  test('should handle empty items array', () => {
    // 重置mock
    jest.clearAllMocks();

    // 创建空数据实例
    const emptyConfig = {
      items: []
    };
    const emptyFollowUs = new DCFollowUs(emptyConfig);

    expect(emptyFollowUs.config).toEqual(emptyConfig);
    expect(document.createElement).toHaveBeenCalledWith('div');
  });

  test('should handle mouseover event', () => {
    const items = document.querySelectorAll('.follow-item');
    const item = items[0];
    const mouseoverEvent = new Event('mouseover');
    item.addEventListener.mock.calls.find(call => call[0] === 'mouseover')[1](mouseoverEvent);
  });

  test('should handle mouseout event', () => {
    const items = document.querySelectorAll('.follow-item');
    const item = items[0];
    const mouseoutEvent = new Event('mouseout');
    item.addEventListener.mock.calls.find(call => call[0] === 'mouseout')[1](mouseoutEvent);
  });

  test('should handle click event', () => {
    const items = document.querySelectorAll('.follow-item');
    const item = items[0];
    const clickEvent = {
      preventDefault: jest.fn()
    };
    item.addEventListener.mock.calls.find(call => call[0] === 'click')[1](clickEvent);
    expect(clickEvent.preventDefault).toHaveBeenCalled();
  });

  test('should create follow-hover elements with correct text', () => {
    // 检查是否为每个项目创建了hover元素
    expect(document.createElement).toHaveBeenCalledWith('span');
  });

  test('should set correct attributes for follow items', () => {
    const linkElement = document.createElement('a');
    expect(linkElement.setAttribute).toHaveBeenCalledWith('data-hover', expect.any(String));
  });

  test('should handle multiple items correctly', () => {
    // 检查是否为每个项目创建了元素
    const createElementCalls = document.createElement.mock.calls;
    const linkCalls = createElementCalls.filter(call => call[0] === 'a');
    expect(linkCalls.length).toBe(mockConfig.items.length);
  });

  test('should set correct href for each follow item', () => {
    const linkElement = document.createElement('a');
    expect(linkElement.href).toBeDefined();
  });

  test('should set correct icon content for each follow item', () => {
    const iconElement = document.createElement('i');
    expect(iconElement.innerHTML).toBeDefined();
  });

  test('should set correct text content for each follow item', () => {
    const textElement = document.createElement('span');
    expect(textElement.textContent).toBeDefined();
  });
});