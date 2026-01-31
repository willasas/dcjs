/**
 * DCFooter 组件测试
 */

// 模拟DOM环境
if (typeof window === 'undefined') {
  global.window = {};
  global.document = {
    documentElement: {
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      },
      setAttribute: jest.fn()
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
    error: jest.fn(),
    log: jest.fn(),
    warn: jest.fn()
  };
  global.fetch = jest.fn();
  global.Date.now = jest.fn(() => 1234567890);
}

// 模拟document.createElement
const createElementMock = (tag) => {
  const element = {
    className: '',
    id: '',
    innerHTML: '',
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn()
    },
    appendChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    closest: jest.fn()
  };

  return element;
};

document.createElement.mockImplementation(createElementMock);

// 模拟document.querySelector
document.querySelector.mockImplementation((selector) => {
  if (selector === 'title') {
    return {};
  }
  if (selector === '.dc-dropdown') {
    return {
      className: 'dc-dropdown active',
      classList: {
        contains: jest.fn((cls) => cls === 'dc-dropdown'),
        add: jest.fn(),
        remove: jest.fn()
      },
      querySelector: jest.fn()
    };
  }
  if (selector === '.lang-dropdown') {
    return {
      className: 'dc-dropdown lang-dropdown active',
      classList: {
        contains: jest.fn((cls) => cls === 'lang-dropdown'),
        add: jest.fn(),
        remove: jest.fn()
      },
      querySelector: jest.fn((sel) => {
        if (sel === '.dc-dropdown-text') {
          return {
            textContent: ''
          };
        }
        if (sel === '.dc-dropdown-item[data-lang]') {
          return {
            classList: {
              toggle: jest.fn()
            }
          };
        }
        return null;
      }),
      querySelectorAll: jest.fn(() => [])
    };
  }
  if (selector === '.theme-dropdown') {
    return {
      className: 'dc-dropdown theme-dropdown active',
      classList: {
        contains: jest.fn((cls) => cls === 'theme-dropdown'),
        add: jest.fn(),
        remove: jest.fn()
      },
      querySelector: jest.fn((sel) => {
        if (sel === '.dc-dropdown-text') {
          return {
            textContent: ''
          };
        }
        return null;
      }),
      querySelectorAll: jest.fn(() => [])
    };
  }
  return null;
});

// 模拟document.querySelectorAll
document.querySelectorAll.mockImplementation((selector) => {
  if (selector === '.dc-dropdown.active') {
    return [
      {
        className: 'dc-dropdown active',
        classList: {
          remove: jest.fn()
        }
      }
    ];
  }
  if (selector === '.theme-dropdown [data-theme]') {
    return [
      {
        dataset: {
          theme: 'light-theme'
        },
        classList: {
          toggle: jest.fn()
        }
      }
    ];
  }
  return [];
});

// 模拟fetch
fetch.mockImplementation(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      languages: [
        { langCode: 'en-US', langCNName: 'English' },
        { langCode: 'zh-CN', langCNName: '中文' }
      ],
      themes: [
        { name: 'light-theme', value: 'Light' },
        { name: 'dark-theme', value: 'Dark' }
      ],
      follow: {
        local: [
          {
            link: 'https://www.facebook.com',
            text: 'Facebook',
            hoverText: 'Follow us on Facebook',
            icon: '<svg class="icon" width="32" height="32"><path fill="currentColor" d="M16 0C7.167 0 0 7.167 0 16s7.167 16 16 16 16-7.167 16-16S24.833 0 16 0zm-2 26h-2v-10h-2v-4h2v-2h2v2h2v4h-2v10z"/></svg>'
          }
        ]
      },
      termsOfUse: {
        link: '#',
        text: 'Terms of Use',
        CNText: '使用条款'
      },
      privacyPolicy: {
        link: '#',
        text: 'Privacy Policy',
        CNText: '隐私政策'
      },
      cookie: {
        link: '#',
        text: 'Cookie Policy',
        CNText: 'Cookie政策'
      },
      copyright: {
        text: '© 2023 Company. All rights reserved.',
        CNText: '© 2023 公司。保留所有权利。'
      },
      footer: {
        official: {
          Community: [
            { link: '#', text: 'Forums' },
            { link: '#', text: 'Discord' }
          ],
          GameDevelopers: [
            { link: '#', text: 'Developer Portal' },
            { link: '#', text: 'API Documentation' }
          ],
          Support: [
            { link: '#', text: 'Help Center' },
            { link: '#', text: 'Contact Us' }
          ],
          Company: [
            { link: '#', text: 'About Us' },
            { link: '#', text: 'Careers' }
          ],
          Partner: [
            { link: '#', text: 'Become a Partner' },
            { link: '#', text: 'Partner Portal' }
          ]
        }
      }
    })
  });
});

// 导入组件
const DCFooter = require('../../../src/components/footer/dcfooter');

describe('DCFooter', () => {
  let footer;
  let mockOptions;

  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks();

    // 模拟配置
    mockOptions = {
      container: 'test-footer',
      defaultTheme: 'light-theme',
      defaultLang: 'en-US',
      type: 'official',
      onThemeChange: jest.fn(),
      onLangChange: jest.fn()
    };

    // 模拟全局DC对象
    window.DC = {
      config: {
        languages: [
          { langCode: 'en-US', langCNName: 'English' },
          { langCode: 'zh-CN', langCNName: '中文' }
        ],
        themes: [
          { name: 'light-theme', value: 'Light' },
          { name: 'dark-theme', value: 'Dark' }
        ],
        follow: {
          local: [
            {
              link: 'https://www.facebook.com',
              text: 'Facebook',
              hoverText: 'Follow us on Facebook',
              icon: '<svg class="icon" width="32" height="32"><path fill="currentColor" d="M16 0C7.167 0 0 7.167 0 16s7.167 16 16 16 16-7.167 16-16S24.833 0 16 0zm-2 26h-2v-10h-2v-4h2v-2h2v2h2v4h-2v10z"/></svg>'
            }
          ]
        },
        termsOfUse: {
          link: '#',
          text: 'Terms of Use',
          CNText: '使用条款'
        },
        privacyPolicy: {
          link: '#',
          text: 'Privacy Policy',
          CNText: '隐私政策'
        },
        cookie: {
          link: '#',
          text: 'Cookie Policy',
          CNText: 'Cookie政策'
        },
        copyright: {
          text: '© 2023 Company. All rights reserved.',
          CNText: '© 2023 公司。保留所有权利。'
        },
        footer: {
          official: {
            Community: [
              { link: '#', text: 'Forums' },
              { link: '#', text: 'Discord' }
            ],
            GameDevelopers: [
              { link: '#', text: 'Developer Portal' },
              { link: '#', text: 'API Documentation' }
            ],
            Support: [
              { link: '#', text: 'Help Center' },
              { link: '#', text: 'Contact Us' }
            ],
            Company: [
              { link: '#', text: 'About Us' },
              { link: '#', text: 'Careers' }
            ],
            Partner: [
              { link: '#', text: 'Become a Partner' },
              { link: '#', text: 'Partner Portal' }
            ]
          }
        }
      }
    };
  });

  test('should initialize correctly', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    expect(footer).toBeDefined();
    expect(footer.container).toBeDefined();
    expect(footer.defaultTheme).toBe(mockOptions.defaultTheme);
    expect(footer.defaultLang).toBe(mockOptions.defaultLang);
    expect(footer.type).toBe(mockOptions.type);
  });

  test('should create container element', () => {
    footer = new DCFooter(mockOptions);

    expect(document.createElement).toHaveBeenCalledWith('footer');
    expect(document.body.appendChild).toHaveBeenCalled();
  });

  test('should load config from global DC object', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    expect(footer.config).toBeDefined();
    expect(footer.config.languages).toBeDefined();
    expect(footer.config.themes).toBeDefined();
  });

  test('should create CSS styles', () => {
    footer = new DCFooter(mockOptions);

    expect(document.createElement).toHaveBeenCalledWith('style');
    expect(document.head.insertBefore).toHaveBeenCalled();
  });

  test('should create DOM elements', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    expect(footer.container.innerHTML).toBeDefined();
  });

  test('should bind events', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    expect(footer._handleClick).toBeDefined();
  });

  test('should set default theme', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    expect(footer.currentTheme).toBe(mockOptions.defaultTheme);
  });

  test('should set default language', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    expect(footer.currentLang).toBe(mockOptions.defaultLang);
  });

  test('should handle container with # prefix', () => {
    const optionsWithHash = {
      ...mockOptions,
      container: '#prefixed-container'
    };

    footer = new DCFooter(optionsWithHash);

    expect(footer.container.id).toBe('prefixed-container');
  });

  test('should generate container ID if not provided', () => {
    const optionsWithoutContainer = {
      ...mockOptions
    };
    delete optionsWithoutContainer.container;

    footer = new DCFooter(optionsWithoutContainer);

    expect(footer.container.id).toMatch(/dc-footer-/);
  });

  test('should close all dropdowns', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    footer.closeAllDropdowns();

    expect(document.querySelectorAll).toHaveBeenCalledWith('.dc-dropdown.active');
  });

  test('should set language', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    footer.setLanguage('zh-CN');

    expect(footer.currentLang).toBe('zh-CN');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('lang', 'zh-CN');
  });

  test('should set theme', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    footer.setTheme('dark-theme');

    expect(footer.currentTheme).toBe('dark-theme');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark-theme');
  });

  test('should handle click events', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    const mockEvent = {
      target: {
        closest: jest.fn(() => null)
      },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };

    footer._handleClick(mockEvent);

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  test('should handle invalid language', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    footer.setLanguage('invalid-lang');

    expect(footer.currentLang).not.toBe('invalid-lang');
  });

  test('should handle invalid theme', async () => {
    footer = new DCFooter(mockOptions);
    await footer.init();

    footer.setTheme('invalid-theme');

    expect(footer.currentTheme).toBe('invalid-theme');
  });

  test('should handle different footer types', async () => {
    const types = ['gaming', 'lib', 'shop', 'product'];

    for (const type of types) {
      const typeOptions = {
        ...mockOptions,
        type
      };

      window.DC.config.footer[type] = {
        Games: [{ link: '#', text: 'Game 1' }],
        Support: [{ link: '#', text: 'Support' }],
        Company: [{ link: '#', text: 'Company' }]
      };

      footer = new DCFooter(typeOptions);
      await footer.init();

      expect(footer.type).toBe(type);
    }
  });

  test('should handle unknown footer type', async () => {
    const unknownTypeOptions = {
      ...mockOptions,
      type: 'unknown'
    };

    footer = new DCFooter(unknownTypeOptions);
    await footer.init();

    expect(footer.type).toBe('unknown');
  });

  test('should handle fetch failure', async () => {
    // 重置mock
    jest.clearAllMocks();

    // 模拟fetch失败
    fetch.mockImplementation(() => {
      return Promise.resolve({
        ok: false
      });
    });

    // 删除全局DC配置
    delete window.DC.config;

    try {
      footer = new DCFooter(mockOptions);
      await footer.init();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('should handle invalid configuration', async () => {
    // 重置mock
    jest.clearAllMocks();

    // 设置无效配置
    window.DC.config = {
      languages: [],
      themes: []
    };

    try {
      footer = new DCFooter(mockOptions);
      await footer.init();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});