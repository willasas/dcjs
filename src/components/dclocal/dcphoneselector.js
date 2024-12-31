/**
 * 手机号选择器组件
 */
class DCPhoneSelector {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {DCLang} options.dcLang - DCLang实例
   * @param {string} options.container - 容器选择器
   * @param {Function} options.onChange - 选择变更回调
   */
  constructor(options) {
    this.dcLang = options.dcLang;
    this.container = document.querySelector(options.container);
    this.onChange = options.onChange;
    // 存储国家电话号码规则
    this.phoneRules = {
      'CN': {
        pattern: /^1[3-9]\d{9}$/,
        maxLength: 11,
        minLength: 11,
        errorMsg: {
          pattern: '请输入正确的手机号码',
          length: '手机号必须是11位数字'
        }
      },
      'US': {
        pattern: /^\d{10}$/,
        maxLength: 10,
        minLength: 10,
        errorMsg: {
          pattern: 'Please enter a valid phone number',
          length: 'Phone number must be 10 digits'
        }
      },
      'JP': {
        pattern: /^0[789]0\d{8}$/,
        maxLength: 11,
        minLength: 11,
        errorMsg: {
          pattern: '请输入正确的日本手机号码',
          length: '日本手机号必须是11位数字'
        }
      },
      'KR': {
        pattern: /^01[0-9]\d{7,8}$/,
        maxLength: 11,
        minLength: 10,
        errorMsg: {
          pattern: '请输入正确的韩国手机号码',
          length: '韩国手机号必须是10-11位数字'
        }
      },
      'GB': {
        pattern: /^07\d{9}$/,
        maxLength: 11,
        minLength: 11,
        errorMsg: {
          pattern: '请输入正确的英国手机号码',
          length: '英国手机号必须是11位数字'
        }
      },
      'DE': {
        pattern: /^01[567]\d{8,9}$/,
        maxLength: 12,
        minLength: 11,
        errorMsg: {
          pattern: '请输入正确的德国手机号码',
          length: '德国手机号必须是11-12位数字'
        }
      },
      'FR': {
        pattern: /^0[67]\d{8}$/,
        maxLength: 10,
        minLength: 10,
        errorMsg: {
          pattern: '请输入正确的法国手机号码',
          length: '法国手机号必须是10位数字'
        }
      },
      'IT': {
        pattern: /^3\d{9}$/,
        maxLength: 10,
        minLength: 10,
        errorMsg: {
          pattern: '请输入正确的意大利手机号码',
          length: '意大利手机号必须是10位数字'
        }
      },
      'ES': {
        pattern: /^[67]\d{8}$/,
        maxLength: 9,
        minLength: 9,
        errorMsg: {
          pattern: '请输入正确的西班牙手机号码',
          length: '西班牙手机号必须是9位数字'
        }
      },
      'AU': {
        pattern: /^04\d{8}$/,
        maxLength: 10,
        minLength: 10,
        errorMsg: {
          pattern: '请输入正确的澳大利亚手机号码',
          length: '澳大利亚手机号必须是10位数字'
        }
      },
      'RU': {
        pattern: /^[789]\d{9}$/,
        maxLength: 10,
        minLength: 10,
        errorMsg: {
          pattern: '请输入正确的俄罗斯手机号码',
          length: '俄罗斯手机号必须是10位数字'
        }
      },
      'IN': {
        pattern: /^[6789]\d{9}$/,
        maxLength: 10,
        minLength: 10,
        errorMsg: {
          pattern: '请输入正确的印度手机号码',
          length: '印度手机号必须是10位数字'
        }
      },
      'BR': {
        pattern: /^[1-9][1-9]\d{8}$/,
        maxLength: 10,
        minLength: 10,
        errorMsg: {
          pattern: '请输入正确的巴西手机号码',
          length: '巴西手机号必须是10位数字'
        }
      },
      // 默认规则
      'default': {
        pattern: /^\d{6,15}$/,
        maxLength: 15,
        minLength: 6,
        errorMsg: {
          pattern: '请输入有效的电话号码',
          length: '电话号码长度必须在6-15位之间'
        }
      }
    };
    
    this.init();
  }

  /**
   * 初始化组件
   * @private
   */
  init() {
    const wrapper = document.createElement('div');
    wrapper.className = 'dc-phone-selector';
    wrapper.innerHTML = `
      <div class="dc-phone-area">
        <div class="dc-area-current">
          <img class="dc-area-flag" src="" alt="">
          <span class="dc-area-code">+86</span>
          <i class="dc-icon-arrow">
            <svg class="icon icon_down" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 18L24 30L12 18" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
            <svg class="icon icon_up" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 30L25 18L37 30" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
          </i>
        </div>
        <div class="dc-area-dropdown">
          <div class="dc-area-search">
            <input type="text" placeholder="搜索国家/地区" />
          </div>
          <div class="dc-area-list"></div>
        </div>
      </div>
      <input type="tel" class="dc-phone-input" placeholder="请输入手机号">
    `;

    // 添加样式
    const cssRules = `
      .dc-phone-selector { display: flex; align-items: center; gap: 8px; max-width: 360px; }
      .dc-phone-selector .dc-phone-area { position: relative; min-width: 100px; }
      .dc-phone-selector .dc-phone-area.active .dc-area-dropdown { display: block; }
      .dc-phone-selector .dc-phone-area .dc-area-current { display: flex; align-items: center; box-sizing: border-box; padding: 8px 12px; background: #2d2d2d; border-radius: 4px; cursor: pointer; color: #fff; }
      .dc-phone-selector .dc-phone-area .dc-area-current .dc-area-flag { width: 22px; margin-right: 8px; }
      .dc-phone-selector .dc-phone-area .dc-area-current .dc-area-code { width: 100%; height: 100%; text-align: left; white-space: nowrap; overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; }
      .dc-phone-selector .dc-phone-area .dc-area-current .dc-icon-arrow { margin-left: 8px; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; }
      .dc-phone-selector .dc-phone-area .dc-area-current .dc-icon-arrow .icon_down { display: block; }
      .dc-phone-selector .dc-phone-area .dc-area-current .dc-icon-arrow .icon_up { display: none; }
      .dc-phone-selector .dc-phone-area .dc-area-current .dc-icon-arrow.active .icon_down { display: none; }
      .dc-phone-selector .dc-phone-area .dc-area-current .dc-icon-arrow.active .icon_up { display: block; }
      .dc-phone-selector .dc-phone-area .dc-area-current .dc-icon-arrow svg { width: 100%; height: 100%; }
      .dc-phone-selector .dc-phone-area .dc-area-current .dc-icon-arrow svg path { stroke: #fff; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown { z-index: 1000; display: none; position: absolute; top: 100%; left: 0; width: 280px; background: #2d2d2d; border-radius: 4px; margin-top: 4px; padding: 8px 0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-search { position: relative; width: 100%; box-sizing: border-box; padding: 8px 12px; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-search input { width: 100%; box-sizing: border-box; padding: 6px 4px; border: 1px solid #444; border-radius: 4px; background: #363636; color: #fff; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list { position: relative; max-height: 300px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box; padding: 0 4px 0 0; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list::-webkit-scrollbar { width: 4px; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list::-webkit-scrollbar-track { width: 4px; border-radius: 2px; background-color: #9f9f9f; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list::-webkit-scrollbar-thumb { width: 4px; border-radius: 2px; background-color: #fff; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list .dc-area-item { display: flex; align-items: center; padding: 8px 12px; cursor: pointer; border: none !important; font-size: 14px; color: #fff; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list .dc-area-item:hover { background: #3d3d3d !important; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list .dc-area-item .dc-area-img { width: 22px; margin-right: 8px; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list .dc-area-item .dc-area-name { font-size: 14px; }
      .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list .dc-area-item .dc-area-tel { margin-left: auto; font-size: 14px; }
      .dc-phone-selector .dc-phone-input { flex: 1; width: 100%; height: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; background: #363636; font-size: 20px; color: #fff; line-height: 1.5; transition: border-color 0.3s; }
      .dc-phone-selector .dc-phone-input.invalid { border-color: #ff4d4f; }

      @media screen and (max-width: 1024px) {
        .dc-phone-selector .dc-phone-area { min-width: 100px; }
        .dc-phone-selector .dc-phone-area.active .dc-area-dropdown { display: block; }
        .dc-phone-selector .dc-phone-area .dc-area-current { display: flex; align-items: center; box-sizing: border-box; padding: 8px 12px; background: #2d2d2d; border-radius: 4px; cursor: pointer; color: #fff; }
        .dc-phone-selector .dc-phone-area .dc-area-current .dc-area-flag { display: none; }
        .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list .dc-area-item { display: flex; align-items: center; padding: 8px 12px; cursor: pointer; border: none !important; font-size: 14px; color: #fff; }
        .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list .dc-area-item:hover { background: #3d3d3d !important; }
        .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list .dc-area-item span { font-size: 14px; }
        .dc-phone-selector .dc-phone-area .dc-area-dropdown .dc-area-list .dc-area-item img { display: none; }
      }
    `;

    const addStyle = eleStyleInit => {
      const fa = document.querySelector('title')
      const eleStyle = document.createElement('style')
      eleStyle.innerHTML = eleStyleInit
      document.head.insertBefore(eleStyle, fa)
    }
    addStyle(cssRules)
    this.container.appendChild(wrapper);

    this.bindEvents();
    this.setDefaultCountry('CN');
  }

  /**
   * 绑定事件
   * @private
   */
  bindEvents() {
    const areaSelector = this.container.querySelector('.dc-phone-area');
    const search = this.container.querySelector('.dc-area-search input');
    const list = this.container.querySelector('.dc-area-list');
    const phoneInput = this.container.querySelector('.dc-phone-input');

    // 切换下拉菜单
    areaSelector.querySelector('.dc-area-current').addEventListener('click', () => {
      areaSelector.classList.toggle('active');
    });

    // 搜索功能
    search.addEventListener('input', (e) => {
      this.renderList(e.target.value);
    });

    // 选择国家/地区
    list.addEventListener('click', (e) => {
      const item = e.target.closest('.dc-area-item');
      if (item) {
        const code = item.dataset.code;
        this.setCountry(code);
        areaSelector.classList.remove('active');
      }
    });

    // 手机号输入
    phoneInput.addEventListener('input', () => {
      const phoneNumber = phoneInput.value;
      const validation = this.validatePhoneNumber(phoneNumber);
      
      // 添加验证状态样式
      phoneInput.classList.toggle('invalid', !validation.isValid);
      
      if (this.onChange) {
        this.onChange({
          countryCode: this.currentCountry.code,
          phoneNumber: phoneNumber,
          isValid: validation.isValid,
          errorMsg: validation.errorMsg
        });
      }
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
      if (!areaSelector.contains(e.target)) {
        areaSelector.classList.remove('active');
      }
    });
  }

  /**
   * 验证手机号码
   * @param {string} phoneNumber - 手机号码
   * @returns {{isValid: boolean, errorMsg: string}} 验证结果
   */
  validatePhoneNumber(phoneNumber) {
    if (!phoneNumber || !this.currentCountry) {
      return {
        isValid: false,
        errorMsg: '请输入手机号码'
      };
    }
    
    // 获取当前国家的规则，如果没有则使用默认规则
    const rules = this.phoneRules[this.currentCountry.code] || this.phoneRules.default;
    
    // 检查长度
    if (phoneNumber.length < rules.minLength || phoneNumber.length > rules.maxLength) {
      return {
        isValid: false,
        errorMsg: rules.errorMsg.length
      };
    }
    
    // 检查格式
    const isValid = rules.pattern.test(phoneNumber);
    return {
      isValid,
      errorMsg: isValid ? '' : rules.errorMsg.pattern
    };
  }

  /**
   * 添加国家电话号码规则
   * @param {string} countryCode - 国家代码
   * @param {Object} rule - 验证规则
   * @param {RegExp} rule.pattern - 正则表达式
   * @param {number} rule.maxLength - 最大长度
   * @param {number} rule.minLength - 最小长度
   */
  addPhoneRule(countryCode, rule) {
    this.phoneRules[countryCode] = rule;
  }

  /**
   * 设置当前选中的国家
   * @param {string} countryCode - 国家代码
   */
  setCountry(countryCode) {
    const country = this.dcLang.getCountryByCode(countryCode);
    if (country) {
      this.currentCountry = country;
      const current = this.container.querySelector('.dc-area-current');
      current.querySelector('.dc-area-flag').src = country.icon;
      current.querySelector('.dc-area-code').textContent = `+${country.telCode}`;
      
      if (this.onChange) {
        this.onChange({
          countryCode: country.code,
          phoneNumber: this.container.querySelector('.dc-phone-input').value
        });
      }
    }
  }

  /**
   * 设置默认国家
   * @param {string} countryCode - 国家代码
   */
  setDefaultCountry(countryCode) {
    this.setCountry(countryCode);
    this.renderList();
  }

  /**
   * 渲染国家列表
   * @param {string} searchText - 搜索文本
   * @private
   */
  renderList(searchText = '') {
    const list = this.container.querySelector('.dc-area-list');
    let countries = this.dcLang.getCountriesByCurrentLang();
    
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      countries = countries.filter(country => 
        country.name.toLowerCase().includes(searchLower) ||
        country.code.toLowerCase().includes(searchLower) ||
        country.telCode.includes(searchLower)
      );
    }

    list.innerHTML = countries.map(country => `
      <div class="dc-area-item" data-code="${country.code}">
        <img class="dc-area-img" src="${country.icon}" alt="${country.code}">
        <span class="dc-area-name">${country.name}</span>
        <span class="dc-area-tel">+${country.telCode}</span>
      </div>
    `).join('');
  }

  /**
   * 获取当前值
   * @returns {{countryCode: string, phoneNumber: string, isValid: boolean, errorMsg: string}}
   */
  getValue() {
    const phoneNumber = this.container.querySelector('.dc-phone-input').value;
    const validation = this.validatePhoneNumber(phoneNumber);
    return {
      countryCode: this.currentCountry.code,
      phoneNumber: phoneNumber,
      isValid: validation.isValid,
      errorMsg: validation.errorMsg
    };
  }

  /**
   * 设置手机号
   * @param {string} phoneNumber - 手机号
   * @returns {boolean} 设置是否成功
   */
  setPhoneNumber(phoneNumber) {
    if (this.validatePhoneNumber(phoneNumber)) {
      this.container.querySelector('.dc-phone-input').value = phoneNumber;
      return true;
    }
    return false;
  }
}

// 全局导出手机号区域选择
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCPhoneSelector;
} else {
  window.DC = window.DC || {};
  window.DC.PhoneSelector = DCPhoneSelector;
}
