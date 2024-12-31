/**
 * DCLang类 - 用于处理多语言切换功能
 * @class
 */
class DCLang {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {string} options.defaultLang - 默认语言代码，例如 'zh-CN'
   * @param {string} options.fallbackLang - 回退语言代码，当默认语言不可用时使用
   */
  constructor(options = {}) {
    // 初始化配置
    this.defaultLang = options.defaultLang || 'zh-CN';
    this.fallbackLang = options.fallbackLang || 'en-US';
    this.currentLang = this.defaultLang;
    // 指定显示的语言列表，如果没有指定则显示所有语言
    this.displayLangs = options.displayLangs || null;
    // 主流语言列表
    this.mainLanguages = [
      'zh-CN',  // 中文(简体)
      'zh-TW',  // 中文(繁体)
      'zh-HK',  // 中文(粤语)
      'en-US',  // 英语(美国)
      'en-GB',  // 英语(英国)
      'ja-JP',  // 日语
      'ko-KR',  // 韩语
      'es-ES',  // 西班牙语
      'fr-FR',  // 法语
      'de-DE',  // 德语
      'ru-RU',  // 俄语
      'ar-SA',  // 阿拉伯语
      'hi-IN',  // 印地语
      'pt-BR',  // 葡萄牙语(巴西)
      'id-ID',  // 印度尼西亚语
      'th-TH',  // 泰语
      'vi-VN',  // 越南语
      'it-IT',  // 意大利语
      'tr-TR',  // 土耳其语
      'nl-NL'   // 荷兰语
    ];
    
    // 存储语言数据
    this.langData = new Map();
    
    // 创建一个 Promise 来跟踪数据加载状态
    this.dataLoaded = new Promise((resolve) => {
      this.resolveDataLoaded = resolve;
    });

    // 设置默认语言
    document.documentElement.lang = 'zh-CN';
    document.documentElement.setAttribute('data-lang', 'CN');
  
    
    // 加载国家/地区数据和语言数据
    this.loadData();
    
    // 初始化时设置HTML语言属性
    this.updateHtmlLangAttributes(this.defaultLang);
  }

  /**
   * 加载所有必要的数据
   * @private
   */
  async loadData() {
    try {
      // 并行加载数据
      const [countryResponse, languagesResponse] = await Promise.all([
        fetch('./local.json'),
        fetch('./languages.json')
      ]);

      // 解析数据
      this.countries = await countryResponse.json();
      const languagesData = await languagesResponse.json();
      this.languages = languagesData.languages;

      // 提取可用的语言代码
      this.availableLangs = this.languages.map(lang => lang.langCode);
      
      this.resolveDataLoaded(true);
    } catch (error) {
      console.error('加载数据失败:', error);
      this.countries = [];
      this.languages = [];
      this.availableLangs = [];
      this.resolveDataLoaded(false);
    }
  }

  /**
   * 更新HTML元素的语言相关属性
   * @param {string} langCode - 语言代码
   * @private
   */
  updateHtmlLangAttributes(langCode) {
    if (langCode) {
      // 设置语言代码
      document.documentElement.lang = langCode;
      
      // 提取并设置国家/地区代码
      let countryCode = '';
      const parts = langCode.split('-');
      if (parts.length > 1) {
        // 处理标准格式的语言代码 (如 'zh-CN')
        countryCode = parts[parts.length - 1];
      } else {
        // 处理单段的语言代码，使用默认区域代码
        countryCode = 'UN';
      }
      
      // 特殊情况处理
      switch (langCode) {
        case 'eo-001':
        case 'ia-001':
        case 'jbo-001':
        case 'tlh-001':
        case 'qya-001':
          countryCode = 'WORLD'; // 人工语言使用特殊标识
          break;
        case 'grc-GR':
        case 'lat-VA':
        case 'egy-EG':
          countryCode = 'ANCIENT'; // 古代语言使用特殊标识
          break;
      }
      
      document.documentElement.setAttribute('data-lang', countryCode);
    }
  }

  /**
   * 切换语言
   * @param {string} langCode - 目标语言代码
   * @returns {boolean} 切换是否成功
   */
  switchLanguage(langCode) {
    if (this.availableLangs.includes(langCode)) {
      this.currentLang = langCode;
      this.updateHtmlLangAttributes(langCode);
      // 触发一个自定义事件，通知语言切换
      const event = new CustomEvent('languagechange', { 
        detail: { 
          langCode,
          success: true 
        } 
      });
      document.dispatchEvent(event);
      return true;
    }
    console.warn(`不支持的语言代码: ${langCode}, 将使用默认语言: ${this.defaultLang}`);
    this.currentLang = this.defaultLang;
    this.updateHtmlLangAttributes(this.defaultLang);
    // 触发失败事件
    const event = new CustomEvent('languagechange', { 
      detail: { 
        langCode: this.defaultLang,
        success: false 
      } 
    });
    document.dispatchEvent(event);
    return false;
  }

  /**
   * 获取当前语言的国家列表
   * @returns {Array} 当前语言的国家列表
   */
  getCountriesByCurrentLang() {
    return this.countries.map(country => ({
      name: this.currentLang.startsWith('zh') ? country.cnName : country.enName,
      code: country.code,
      area: country.area,
      telCode: country.telCode,
      icon: country.icon
    }));
  }

  /**
   * 根据国家代码获取国家信息
   * @param {string} countryCode - 国家代码
   * @returns {Object|null} 国家信息对象或null
   */
  getCountryByCode(countryCode) {
    const country = this.countries.find(c => c.code === countryCode.toUpperCase());
    if (!country) return null;

    return {
      name: this.currentLang.startsWith('zh') ? country.cnName : country.enName,
      code: country.code,
      area: country.area,
      telCode: country.telCode,
      icon: country.icon,
      langCode: country.langCode
    };
  }

  /**
   * 获取当前语言代码
   * @returns {string} 当前语言代码
   */
  getCurrentLang() {
    return this.currentLang;
  }

  /**
   * 获取可用的语言列表
   * @returns {Array<string>} 可用的语言代码列表
   */
  getAvailableLangs() {
    return this.availableLangs;
  }

  /**
   * 根据区域获取国家列表
   * @param {string} area - 区域名称
   * @returns {Array} 指定区域的国家列表
   */
  getCountriesByArea(area) {
    return this.countries
      .filter(country => country.area === area)
      .map(country => ({
        name: this.currentLang.startsWith('zh') ? country.cnName : country.enName,
        code: country.code,
        telCode: country.telCode,
        icon: country.icon
      }));
  }

  /**
   * 搜索国家
   * @param {string} keyword - 搜索关键词
   * @returns {Array} 匹配的国家列表
   */
  searchCountries(keyword) {
    const searchTerm = keyword.toLowerCase();
    return this.countries
      .filter(country => 
        country.cnName.toLowerCase().includes(searchTerm) ||
        country.enName.toLowerCase().includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm) ||
        country.telCode.includes(searchTerm)
      )
      .map(country => ({
        name: this.currentLang.startsWith('zh') ? country.cnName : country.enName,
        code: country.code,
        telCode: country.telCode,
        icon: country.icon
      }));
  }

  /**
   * 获取可用的语言选项
   * @returns {Array<{code: string, name: string}>} 语言选项列表
   */
  getLanguageOptions() {
    let langs = this.availableLangs;
    
    // 如果指定了显示语言列表，则过滤
    if (this.displayLangs) {
      langs = langs.filter(lang => this.displayLangs.includes(lang));
    } else {
      // 如果没有指定显示语言列表，则显示主流语言
      langs = this.mainLanguages;
    }
    
    // 确保默认语言和回退语言总是存在
    if (!langs.includes(this.defaultLang)) {
      langs.unshift(this.defaultLang);
    }
    if (!langs.includes(this.fallbackLang)) {
      langs.push(this.fallbackLang);
    }
    
    // 返回语言选项列表
    return langs.map(langCode => {
      const language = this.languages.find(lang => lang.langCode === langCode);
      if (!language) return { code: langCode, name: langCode };
      return {
        code: langCode,
        name: this.currentLang.startsWith('zh') ? language.langCNName : language.langName
      };
    });
  }

  /**
   * 获取主流语言选项
   * @returns {Array<{code: string, name: string}>} 主流语言选项列表
   */
  getMainLanguageOptions() {
    return this.mainLanguages
      .map(langCode => {
        const language = this.languages.find(lang => lang.langCode === langCode);
        if (!language) return null;
        return {
          code: langCode,
          name: this.currentLang.startsWith('zh') ? language.langCNName : language.langName
        };
      })
      .filter(Boolean);
  }

  /**
   * 获取所有语言选项
   * @returns {Array<{code: string, name: string}>} 所有语言选项列表
   */
  getAllLanguageOptions() {
    return this.availableLangs.map(langCode => {
      const language = this.languages.find(lang => lang.langCode === langCode);
      if (!language) return { code: langCode, name: langCode };
      return {
        code: langCode,
        name: this.currentLang.startsWith('zh') ? language.langCNName : language.langName
      };
    });
  }
}

// 全局导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCLang;
} else {
  window.DC = window.DC || {};
  window.DC.Lang = DCLang;
}
