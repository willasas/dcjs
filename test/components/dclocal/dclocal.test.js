/**
 * dclocal组件测试
 */
const DCLang = require('../../../src/components/dclocal/dclang');
const DCLanguageSelector = require('../../../src/components/dclocal/dclangselector');

// 模拟fetch API
global.fetch = jest.fn();

describe('DCLang类测试', () => {
  let dcLang;

  beforeEach(() => {
    // 清除fetch模拟
    global.fetch.mockClear();
    
    // 模拟fetch响应
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        countries: [
          { code: 'CN', cnName: '中国', enName: 'China', area: 'Asia', telCode: '+86', icon: '🇨🇳', langCode: 'zh-CN' },
          { code: 'US', cnName: '美国', enName: 'United States', area: 'North America', telCode: '+1', icon: '🇺🇸', langCode: 'en-US' }
        ]
      })
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        languages: [
          { langCode: 'zh-CN', langName: 'Chinese (Simplified)', langCNName: '中文(简体)' },
          { langCode: 'en-US', langName: 'English (US)', langCNName: '英语(美国)' }
        ]
      })
    });
  });

  test('初始化时应设置默认语言', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(dcLang.getCurrentLang()).toBe('zh-CN');
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(document.documentElement.getAttribute('data-lang')).toBe('CN');
  });

  test('切换语言应更新当前语言和HTML属性', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 监听语言切换事件
    const eventListener = jest.fn();
    document.addEventListener('languagechange', eventListener);
    
    // 切换语言
    const result = dcLang.switchLanguage('en-US');
    
    expect(result).toBe(true);
    expect(dcLang.getCurrentLang()).toBe('en-US');
    expect(document.documentElement.lang).toBe('en-US');
    expect(document.documentElement.getAttribute('data-lang')).toBe('US');
    expect(eventListener).toHaveBeenCalled();
    
    document.removeEventListener('languagechange', eventListener);
  });

  test('切换到不支持的语言应返回false并使用默认语言', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 监听语言切换事件
    const eventListener = jest.fn();
    document.addEventListener('languagechange', eventListener);
    
    // 切换到不支持的语言
    const result = dcLang.switchLanguage('fr-FR');
    
    expect(result).toBe(false);
    expect(dcLang.getCurrentLang()).toBe('zh-CN');
    expect(eventListener).toHaveBeenCalled();
    
    document.removeEventListener('languagechange', eventListener);
  });

  test('获取当前语言的国家列表', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const countries = dcLang.getCountriesByCurrentLang();
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.length).toBeGreaterThan(0);
  });

  test('根据国家代码获取国家信息', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const china = dcLang.getCountryByCode('CN');
    expect(china).toBeTruthy();
    expect(china.code).toBe('CN');
    
    const nonExistent = dcLang.getCountryByCode('NON-EXISTENT');
    expect(nonExistent).toBeNull();
  });

  test('获取可用的语言列表', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const availableLangs = dcLang.getAvailableLangs();
    expect(Array.isArray(availableLangs)).toBe(true);
  });

  test('根据区域获取国家列表', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const asianCountries = dcLang.getCountriesByArea('Asia');
    expect(Array.isArray(asianCountries)).toBe(true);
  });

  test('搜索国家', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const results = dcLang.searchCountries('中');
    expect(Array.isArray(results)).toBe(true);
  });

  test('获取语言选项', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const options = dcLang.getLanguageOptions();
    expect(Array.isArray(options)).toBe(true);
  });

  test('获取主流语言选项', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const mainOptions = dcLang.getMainLanguageOptions();
    expect(Array.isArray(mainOptions)).toBe(true);
  });

  test('获取所有语言选项', async () => {
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const allOptions = dcLang.getAllLanguageOptions();
    expect(Array.isArray(allOptions)).toBe(true);
  });
});

describe('DCLanguageSelector类测试', () => {
  let dcLang;
  let languageSelector;
  let container;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
    
    // 清除fetch模拟
    global.fetch.mockClear();
    
    // 模拟fetch响应
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        countries: [
          { code: 'CN', cnName: '中国', enName: 'China', area: 'Asia', telCode: '+86', icon: '🇨🇳', langCode: 'zh-CN' },
          { code: 'US', cnName: '美国', enName: 'United States', area: 'North America', telCode: '+1', icon: '🇺🇸', langCode: 'en-US' }
        ]
      })
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        languages: [
          { langCode: 'zh-CN', langName: 'Chinese (Simplified)', langCNName: '中文(简体)' },
          { langCode: 'en-US', langName: 'English (US)', langCNName: '英语(美国)' }
        ]
      })
    });
    
    // 初始化DCLang
    dcLang = new DCLang({ defaultLang: 'zh-CN' });
  });

  afterEach(() => {
    // 清理容器
    document.body.removeChild(container);
  });

  test('初始化语言选择器', async () => {
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 初始化语言选择器
    languageSelector = new DCLanguageSelector({
      dcLang,
      container: '#test-container',
      onChange: jest.fn()
    });
    
    // 验证选择器已创建
    expect(container.querySelector('.dc-language-selector')).toBeTruthy();
  });
});
