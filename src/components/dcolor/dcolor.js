/**
 * 颜色管理类
 * 用于渲染和管理传统颜色数据
 */
class DColor {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {string} options.container - 容器选择器
   * @param {Array} options.colors - 颜色数据数组
   * @param {Function} options.onChange - 颜色变更回调
   */
  constructor(options) {
    this.container = document.querySelector(options.container);
    this.colors = [];
    this.onChange = options.onChange;
    this.dataLoaded = new Promise((resolve) => {
      this.resolveDataLoaded = resolve;
    });
    
    // 必须提供 jsonPath
    if (!options.jsonPath) {
      console.error('必须提供 jsonPath');
      this.resolveDataLoaded(false);
      return;
    }

    // 加载基础颜色数据
    this.loadColorsFromJson(options.jsonPath).then(() => {
      // 如果提供了额外的颜色数据，添加到基础数据中
      if (options.colors && Array.isArray(options.colors)) {
        this.colors.push(...options.colors);
      }
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
    wrapper.className = 'dc-color-picker';
    wrapper.innerHTML = `
      <div class="dc-color-search">
        <input type="text" placeholder="搜索颜色..." />
      </div>
      <div class="dc-color-grid"></div>
      <div class="dc-copy-tips">已复制</div>
    `;

    // 添加样式
    const cssRules = `
      .dc-color-picker { position: relative; width: 100%; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; }
      .dc-color-picker .dc-color-search { width: 100%; box-sizing: border-box; margin: 20px 0; padding: 0 20px; }
      .dc-color-picker .dc-color-search input { width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; outline: none; }
      .dc-color-picker .dc-color-search input:focus { border-color: #000; }
      .dc-color-picker .dc-color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 0 20px; }
      .dc-color-picker .dc-color-grid .dc-color-item { display: flex; justify-content: flex-start; align-items: center; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
      .dc-color-picker .dc-color-grid .dc-color-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
      .dc-color-picker .dc-color-grid .dc-color-item .dc-color-swatch { width: 120px; height: 120px; border-radius: 8px; }
      .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 8px; }
      .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-name { font-size: 18px; font-weight: 500; margin-bottom: 4px; }
      .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-value { font-size: 14px; color: #666; display: flex; align-items: center; justify-content: space-between; transition: color 0.2s; }
      .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-value:hover { color: #000; }
      .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-value .dc-color-text { flex: 1; }
      .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-value .dc-copy-btn { width: 16px; height: 16px; cursor: pointer; opacity: 0.6; transition: opacity 0.2s; }
      .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-value .dc-copy-btn:hover { opacity: 1; }
      .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-value .dc-copy-btn svg { width: 100%; height: 100%; }
      .dc-color-picker .dc-copy-tips { position: fixed; top: 0; left: 50%; transform: translateX(-50%); background: white; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: opacity 0.3s, box-shadow 0.2s; color: #fff; padding: 8px 16px; border-radius: 4px; font-size: 14px; pointer-events: none; opacity: 0; }
      .dc-color-picker .dc-copy-tips.show { color: #000; }
      
      @media screen and (max-width: 1024px) { .dc-color-picker .dc-color-search { margin: 10px 0; padding: 0 10px; }
        .dc-color-picker .dc-color-search input { padding: 8px 4px; border-radius: 4px; font-size: 14px; }
        .dc-color-picker .dc-color-search input:focus { border-color: #000; }
        .dc-color-picker .dc-color-grid { display: grid; grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr); gap: 8px; padding: 0 10px; }
        .dc-color-picker .dc-color-grid .dc-color-item { position: relative; display: flex; justify-content: flex-start; align-items: center; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .dc-color-picker .dc-color-grid .dc-color-item .dc-color-swatch { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 4px; }
        .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info { position: relative; z-index: 2; flex: 1; padding: 8px 4px; display: flex; flex-direction: column; gap: 4px; }
        .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-name { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
        .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-value { font-size: 14px; }
        .dc-color-picker .dc-color-grid .dc-color-item .dc-color-info .dc-color-value .dc-color-text { flex: 1; font-size: 12px; } 
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

    // 绑定搜索事件
    const searchInput = this.container.querySelector('.dc-color-search input');
    searchInput.addEventListener('input', (e) => {
      this.searchColors(e.target.value);
    });

    this.bindEvents();
    this.render();
  }

  /**
   * 绑定事件
   * @private
   */
  bindEvents() {
    const grid = this.container.querySelector('.dc-color-grid');
    
    // 选择颜色
    grid.addEventListener('click', (e) => {
      // 查找最近的复制按钮
      const copyBtn = e.target.closest('.dc-copy-btn');
      if (copyBtn) {
        const value = copyBtn.dataset.value;
        this.copyToClipboard(value);
      }
    });
  }

  /**
   * 渲染颜色网格
   * @private
   */
  render() {
    const grid = this.container.querySelector('.dc-color-grid');
    
    grid.innerHTML = this.colors.map((color, index) => `
      <div class="dc-color-item" data-index="${index}">
        <div class="dc-color-swatch" style="background-color: ${color.hex}"></div>
        <div class="dc-color-info">
          <div class="dc-color-name">${color.name}</div>
          <div class="dc-color-value">
            <span class="dc-color-text">HEX: ${color.hex}</span>
            <span class="dc-copy-btn" data-value="${color.hex}">
              <svg class="icon icon_copy" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <div class="dc-color-value">
            <span class="dc-color-text">RGB: ${color.rgb}</span>
            <span class="dc-copy-btn" data-value="${color.rgb}">
              <svg class="icon icon_copy" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <div class="dc-color-value">
            <span class="dc-color-text">CMYK: ${color.cmyk}</span>
            <span class="dc-copy-btn" data-value="${color.cmyk}">
              <svg class="icon icon_copy" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * 复制文本到剪贴板
   * @param {string} text - 要复制的文本
   * @private
   */
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      // 触发复制成功事件
      const event = new CustomEvent('copy-success', {
        detail: {
          value: text,
          type: text.startsWith('#') ? 'HEX' : 'RGB'
        }
      });
      document.dispatchEvent(event);
      
      // 显示复制成功提示
      const tips = this.container.querySelector('.dc-copy-tips');
      tips.textContent = `已复制: ${text}`;
      tips.classList.add('show');
      tips.style.opacity = '1';
      
      // 1秒后隐藏提示
      setTimeout(() => {
        tips.style.opacity = '0';
        setTimeout(() => {
          tips.classList.remove('show');
        }, 300);
      }, 1000);
    }).catch(err => {
      console.error('复制失败:', err);
      const tips = this.container.querySelector('.dc-copy-tips');
      tips.textContent = '复制失败，请重试';
      tips.classList.add('show');
      tips.style.opacity = '1';
      setTimeout(() => {
        tips.style.opacity = '0';
        setTimeout(() => {
          tips.classList.remove('show');
        }, 300);
      }, 1000);
    });
  }

  /**
   * 添加颜色（支持单个或多个）
   * @param {Object|Array<Object>} colors - 颜色对象或颜色对象数组
   * @param {string} colors[].name - 颜色名称
   * @param {string} colors[].hex - 十六进制颜色值
   * @param {string} colors[].rgb - RGB颜色值
   * @param {string} colors[].cmyk - CMYK颜色值
   */
  addColors(colors) {
    // 如果是单个颜色对象，转换为数组
    if (!Array.isArray(colors)) {
      if (typeof colors === 'object' && colors !== null) {
        colors = [colors];
      } else {
        console.error('addColors方法参数格式错误');
        return;
      }
    }

    // 验证颜色对象格式
    const isValidColor = color => (
      color &&
      typeof color.name === 'string' &&
      typeof color.hex === 'string' &&
      typeof color.rgb === 'string' &&
      typeof color.cmyk === 'string'
    );

    // 过滤无效的颜色对象
    const validColors = colors.filter(color => {
      const isValid = isValidColor(color);
      if (!isValid) {
        console.warn('忽略无效的颜色对象:', color);
      }
      return isValid;
    });

    if (validColors.length === 0) {
      console.error('没有有效的颜色对象可添加');
      return;
    }
    
    this.colors.push(...validColors);
    this.render();
  }

  /**
   * 获取当前选中的颜色
   * @returns {Object|null} 当前颜色对象
   */
  getCurrentColor() {
    return null;
  }

  /**
   * 获取所有颜色
   * @returns {Array} 颜色数组
   */
  getAllColors() {
    return this.colors;
  }

  /**
   * 搜索颜色
   * @param {string} keyword - 搜索关键词
   */
  searchColors(keyword) {
    // 如果搜索关键词为空，显示所有颜色
    if (!keyword.trim()) {
      this.render();
      return;
    }
    
    const searchTerm = keyword.toLowerCase();
    const filteredColors = this.colors.filter(color => {
      // 计算每个属性的匹配分数
      const nameScore = this.fuzzyMatch(color.name.toLowerCase(), searchTerm);
      const hexScore = this.fuzzyMatch(color.hex.toLowerCase(), searchTerm);
      const rgbScore = this.fuzzyMatch(color.rgb.toLowerCase(), searchTerm);
      
      // 任一属性匹配度过阈值即视为匹配
      return nameScore > 0.3 || hexScore > 0.5 || rgbScore > 0.5;
    });
    this.renderFilteredColors(filteredColors);
  }

  /**
   * 模糊匹配算法
   * @param {string} str - 待匹配字符串
   * @param {string} pattern - 匹配模式
   * @returns {number} 匹配度分数 (0-1)
   * @private
   */
  fuzzyMatch(str, pattern) {
    if (!str || !pattern) return 0;
    if (str === pattern) return 1;
    if (str.includes(pattern)) return 0.8;

    let score = 0;
    let patternIdx = 0;
    let prevMatchIdx = -1;
    let prevGapSize = null;

    // 遍历字符串寻找匹配
    for (let strIdx = 0; strIdx < str.length && patternIdx < pattern.length; strIdx++) {
      if (str[strIdx] === pattern[patternIdx]) {
        // 计算匹配分数
        const matchScore = 1;
        
        // 连续匹配加分
        if (prevMatchIdx !== -1) {
          const gapSize = strIdx - prevMatchIdx;
          if (gapSize === 1) {
            score += 0.3;
          } else if (prevGapSize !== null && gapSize === prevGapSize) {
            score += 0.2;
          }
          prevGapSize = gapSize;
        }

        score += matchScore;
        prevMatchIdx = strIdx;
        patternIdx++;
      }
    }

    // 归一化分数
    if (patternIdx === pattern.length) {
      return score / (pattern.length * 2);
    }
    return 0;
  }

  /**
   * 渲染过滤后的颜色
   * @param {Array} colors - 颜色数组
   * @private
   */
  renderFilteredColors(colors) {
    const grid = this.container.querySelector('.dc-color-grid');
    // 如果没有匹配结果，显示提示信息
    if (colors.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
          未找到匹配的颜色
        </div>
      `;
      return;
    }
    
    grid.innerHTML = colors.map((color) => `
      <div class="dc-color-item" data-index="${this.colors.indexOf(color)}">
        <div class="dc-color-swatch" style="background-color: ${color.hex}"></div>
        <div class="dc-color-info">
          <div class="dc-color-name">${color.name}</div>
          <div class="dc-color-value">
            <span class="dc-color-text">HEX: ${color.hex}</span>
            <span class="dc-copy-btn" data-value="${color.hex}">
              <svg class="icon icon_copy" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <div class="dc-color-value">
            <span class="dc-color-text">RGB: ${color.rgb}</span>
            <span class="dc-copy-btn" data-value="${color.rgb}">
              <svg class="icon icon_copy" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <div class="dc-color-value">
            <span class="dc-color-text">CMYK: ${color.cmyk}</span>
            <span class="dc-copy-btn" data-value="${color.cmyk}">
              <svg class="icon icon_copy" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * 按色系分类颜色
   * @returns {Object} 分类后的颜色对象
   */
  getColorsByCategory() {
    return {
      red: this.colors.filter(c => this.isRedTone(c.hex)),
      yellow: this.colors.filter(c => this.isYellowTone(c.hex)),
      green: this.colors.filter(c => this.isGreenTone(c.hex)),
      blue: this.colors.filter(c => this.isBlueTone(c.hex)),
      purple: this.colors.filter(c => this.isPurpleTone(c.hex)),
      gray: this.colors.filter(c => this.isGrayTone(c.hex))
    };
  }

  /**
   * 断颜色色系
   * @private
   */
  isRedTone(hex) {
    const rgb = this.hexToRgb(hex);
    return rgb.r > rgb.g && rgb.r > rgb.b;
  }

  isYellowTone(hex) {
    const rgb = this.hexToRgb(hex);
    return rgb.r > 180 && rgb.g > 180 && rgb.b < 100;
  }

  isGreenTone(hex) {
    const rgb = this.hexToRgb(hex);
    return rgb.g > rgb.r && rgb.g > rgb.b;
  }

  isBlueTone(hex) {
    const rgb = this.hexToRgb(hex);
    return rgb.b > rgb.r && rgb.b > rgb.g;
  }

  isPurpleTone(hex) {
    const rgb = this.hexToRgb(hex);
    return rgb.r > rgb.g && rgb.b > rgb.g;
  }

  isGrayTone(hex) {
    const rgb = this.hexToRgb(hex);
    const avg = (rgb.r + rgb.g + rgb.b) / 3;
    return Math.abs(rgb.r - avg) < 20 && Math.abs(rgb.g - avg) < 20 && Math.abs(rgb.b - avg) < 20;
  }

  /**
   * HEX转RGB
   * @private
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * 从JSON文件加载颜色数据
   * @param {string} jsonPath - JSON文件路径
   * @private
   * @returns {Promise}
   */
  loadColorsFromJson(jsonPath) {
    return fetch(jsonPath)
      .then(response => response.json())
      .then(colors => {
        this.colors = colors;
        return colors;
      })
      .catch(error => {
        console.error('加载颜色数据失败:', error);
        this.container.innerHTML = `
          <div style="color: red; text-align: center; padding: 20px;">
            加载颜色数据失败，请刷新页面重试
          </div>
        `;
        throw error;
      });
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DColor;
} else {
  window.DC = window.DC || {};
  window.DC.DColor = DColor;
}
