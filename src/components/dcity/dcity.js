/**
 * 省市区选择器类
 * 用于实现省市区三级联动选择
 */
class DCity {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {string} options.container - 容器选择器
   * @param {string} options.jsonPath - 城市数据JSON文件路径
   * @param {Function} options.onChange - 选择变更回调
   */
  constructor(options) {
    this.container = document.querySelector(options.container);
    this.data = [];
    this.onChange = options.onChange;
    this.currentProvince = '';
    this.currentCity = '';
    this.currentArea = '';
    this.dataLoaded = new Promise((resolve) => {
      this.resolveDataLoaded = resolve;
    });

    // 必须提供 jsonPath
    if (!options.jsonPath) {
      console.error('必须提供 jsonPath');
      this.resolveDataLoaded(false);
      return;
    }

    // 加载城市数据
    this.loadCityData(options.jsonPath).then(() => {
      this.init();
      this.resolveDataLoaded(true);
    });
  }

  /**
   * 初始化组件
   * @private
   */
  init() {
    const wrapper = document.createElement('div');
    wrapper.className = 'dc-city-selector';
    wrapper.innerHTML = `
      <div class="dc-city-selects">
        <select class="dc-province-select">
          <option value="">请选择省份</option>
        </select>
        <select class="dc-city-select" disabled>
          <option value="">请选择城市</option>
        </select>
        <select class="dc-area-select" disabled>
          <option value="">请选择区县</option>
        </select>
      </div>
      <input type="text" class="dc-street-input" placeholder="请输入详细门牌号">
    `;

    // 添加样式
    const cssRules = `
      .dc-city-selector { width: 100%; min-width: 280px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; }
      .dc-city-selector .dc-city-selects { display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap; flex-direction: column; gap: 10px; }
      .dc-city-selector .dc-city-selects select { flex: 1; padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; width: 100%; }
      .dc-city-selector .dc-city-selects select::-webkit-scrollbar { width: 8px; background-color: #f5f5f5; }
      .dc-city-selector .dc-city-selects select::-webkit-scrollbar-thumb { border-radius: 4px; background-color: #ccc; }
      .dc-city-selector .dc-city-selects select::-webkit-scrollbar-thumb:hover { background-color: #000000; }
      .dc-city-selector .dc-city-selects select::-webkit-scrollbar-track { border-radius: 4px; background-color: #f5f5f5; }
      .dc-city-selector .dc-city-selects select:disabled { background: #f5f5f5; cursor: not-allowed; color: #999; }
      .dc-city-selector .dc-city-selects select:focus { border-color: #666; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2); }
      .dc-city-selector .dc-city-selects select option { padding: 8px 16px; color: #000; background: #fff; }
      .dc-city-selector .dc-city-selects select option:hover, .dc-city-selector .dc-city-selects select option:focus { background: #fca607; color: #616161; }
      .dc-city-selector .dc-street-input { margin-top: 10px; width: 100%; box-sizing: border-box; padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; }
      .dc-city-selector .dc-street-input:focus { border-color: #666; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2); }

      @media screen and (max-width: 1024px) { 
        .dc-city-selector .dc-city-selects select { padding: 8px 14px; } 
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
    this.renderProvinces();
  }

  /**
   * 绑定事件
   * @private
   */
  bindEvents() {
    const provinceSelect = this.container.querySelector('.dc-province-select');
    const citySelect = this.container.querySelector('.dc-city-select');
    const areaSelect = this.container.querySelector('.dc-area-select');

    // 省份选择
    provinceSelect.addEventListener('change', (e) => {
      const province = e.target.value;
      this.currentProvince = province;
      this.currentCity = '';
      this.currentArea = '';
      
      if (province) {
        this.renderCities(province);
        citySelect.disabled = false;
        areaSelect.disabled = true;
        areaSelect.innerHTML = '<option value="">请选择区县</option>';
      } else {
        citySelect.disabled = true;
        areaSelect.disabled = true;
        citySelect.innerHTML = '<option value="">请选择城市</option>';
        areaSelect.innerHTML = '<option value="">请选择��县</option>';
      }

      this.emitChange();
    });

    // 城市选择
    citySelect.addEventListener('change', (e) => {
      const city = e.target.value;
      this.currentCity = city;
      this.currentArea = '';
      
      if (city) {
        this.renderAreas(this.currentProvince, city);
        areaSelect.disabled = false;
      } else {
        areaSelect.disabled = true;
        areaSelect.innerHTML = '<option value="">请选择区县</option>';
      }

      this.emitChange();
    });

    // 区县选择
    areaSelect.addEventListener('change', (e) => {
      this.currentArea = e.target.value;
      this.emitChange();
    });
  }

  /**
   * 触发变更事件
   * @private
   */
  emitChange() {
    if (this.onChange) {
      this.onChange({
        province: this.currentProvince,
        city: this.currentCity,
        area: this.currentArea
      });
    }
  }

  /**
   * 渲染省份列表
   * @private
   */
  renderProvinces() {
    const provinceSelect = this.container.querySelector('.dc-province-select');
    const provinces = this.data.map(item => item.name);
    
    provinceSelect.innerHTML = `
      <option value="">请选择省份</option>
      ${provinces.map(province => `
        <option value="${province}">${province}</option>
      `).join('')}
    `;
  }

  /**
   * 渲染城市列表
   * @param {string} province - 省份名称
   * @private
   */
  renderCities(province) {
    const citySelect = this.container.querySelector('.dc-city-select');
    const provinceData = this.data.find(item => item.name === province);
    
    if (provinceData) {
      const cities = provinceData.children.map(item => item.name);
      citySelect.innerHTML = `
        <option value="">请选择城市</option>
        ${cities.map(city => `
          <option value="${city}">${city}</option>
        `).join('')}
      `;
    }
  }

  /**
   * 渲染区县列表
   * @param {string} province - 省份名称
   * @param {string} city - 城市名称
   * @private
   */
  renderAreas(province, city) {
    const areaSelect = this.container.querySelector('.dc-area-select');
    const provinceData = this.data.find(item => item.name === province);
    
    if (provinceData) {
      const cityData = provinceData.children.find(item => item.name === city);
      if (cityData) {
        const areas = cityData.children.map(item => item.name);
        areaSelect.innerHTML = `
          <option value="">请选择区县</option>
          ${areas.map(area => `
            <option value="${area}">${area}</option>
          `).join('')}
        `;
      }
    }
  }

  /**
   * 从JSON文��加载城市数据
   * @param {string} jsonPath - JSON文件路径
   * @private
   * @returns {Promise}
   */
  loadCityData(jsonPath) {
    return fetch(jsonPath)
      .then(response => response.json())
      .then(data => {
        this.data = this.formatCityData(data);
        return this.data;
      })
      .catch(error => {
        console.error('加载城市数据失败:', error);
        this.container.innerHTML = `
          <div style="color: red; text-align: center; padding: 20px;">
            加载城市数据失败，请刷新页面重试
          </div>
        `;
        throw error;
      });
  }

  /**
   * 获取当前选择的地址
   * @returns {{province: string, city: string, area: string}} 地址对象
   */
  getValue() {
    return {
      province: this.currentProvince,
      city: this.currentCity,
      area: this.currentArea
    };
  }

  /**
   * 设置选中的地址
   * @param {Object} address - 地址对象
   * @param {string} address.province - 省份名称
   * @param {string} address.city - 城市名称
   * @param {string} address.area - 区县名称
   */
  setValue(address) {
    if (address.province) {
      this.currentProvince = address.province;
      this.renderCities(address.province);
      
      const citySelect = this.container.querySelector('.dc-city-select');
      citySelect.disabled = false;
      citySelect.value = address.city || '';

      if (address.city) {
        this.currentCity = address.city;
        this.renderAreas(address.province, address.city);
        
        const areaSelect = this.container.querySelector('.dc-area-select');
        areaSelect.disabled = false;
        areaSelect.value = address.area || '';

        if (address.area) {
          this.currentArea = address.area;
        }
      }

      const provinceSelect = this.container.querySelector('.dc-province-select');
      provinceSelect.value = address.province;
    }
  }

  /**
   * 转换城市数据格式
   * @param {Object} rawData - 原始数据
   * @returns {Array} 转换后的数据
   */
  formatCityData(rawData) {
    // 按省份名称排序
    const sortedProvinces = Object.entries(rawData).sort(([a], [b]) => a.localeCompare(b, 'zh-CN'));

    return sortedProvinces.map(([provinceName, provinceData]) => {
      // 获取城市列表并排序
      const cities = Object.entries(provinceData.city).sort(([a], [b]) => a.localeCompare(b, 'zh-CN'));

      return {
        name: provinceName,
        code: provinceData.code,
        children: cities.map(([cityName, cityData]) => {
          // 获取区县列表并排序
          const areas = Object.entries(cityData.country || {})
            .sort(([a], [b]) => a.localeCompare(b, 'zh-CN'));

          return {
            name: cityName,
            code: cityData.code,
            children: areas.map(([areaName, areaData]) => {
              return {
                name: areaName,
                code: areaData.code,
                fullName: `${provinceName}${cityName}${areaName}`
              };
            })
          };
        })
      };
    });
  }

  /**
   * 根据行政区划代码获取地址信息
   * @param {string} code - 行政区划代码
   * @returns {Object|null} 地址信息
   */
  getAddressByCode(code) {
    for (const province of this.data) {
      if (province.code === code) {
        return { province: province.name };
      }
      for (const city of province.children) {
        if (city.code === code) {
          return { 
            province: province.name,
            city: city.name 
          };
        }
        for (const area of city.children) {
          if (area.code === code) {
            return {
              province: province.name,
              city: city.name,
              area: area.name,
              fullName: area.fullName
            };
          }
        }
      }
    }
    return null;
  }

  /**
   * 获取指定地区的所有下级地区
   * @param {string} code - 行政区划代码
   * @returns {Array} 下级地区列表
   */
  getChildrenByCode(code) {
    for (const province of this.data) {
      if (province.code === code) {
        return province.children;
      }
      for (const city of province.children) {
        if (city.code === code) {
          return city.children;
        }
      }
    }
    return [];
  }

  /**
   * 获取完整的地址信息
   * @returns {Object} 完整地址信息
   */
  getFullAddress() {
    const address = this.getValue();
    if (!address.province) return null;

    const provinceData = this.data.find(p => p.name === address.province);
    if (!provinceData) return null;

    const result = {
      province: {
        name: address.province,
        code: provinceData.code
      }
    };

    if (address.city) {
      const cityData = provinceData.children.find(c => c.name === address.city);
      if (cityData) {
        result.city = {
          name: address.city,
          code: cityData.code
        };

        if (address.area) {
          const areaData = cityData.children.find(a => a.name === address.area);
          if (areaData) {
            result.area = {
              name: address.area,
              code: areaData.code,
              fullName: areaData.fullName
            };
          }
        }
      }
    }

    return result;
  }
}

// 导出
window.DC = window.DC || {};
window.DC.DCity = DCity;
