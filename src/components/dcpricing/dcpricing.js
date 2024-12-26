/**
 * @class DCPricing
 * @description 根据 priceData 数据生成价格卡片
 */
class DCPricing {
  /**
   * @constructor
   * @param {Array} priceData - 价格数据数组
   * @param {string} containerSelector - 容器选择器, 默认 body
   * @param {string} customClass - 自定义样式类名
   */
  constructor(priceData, containerSelector = 'body', customClass = '') {
    this.priceData = priceData;
    this.containerSelector = containerSelector;
    this.customClass = customClass;
    this.container = document.querySelector(containerSelector);
  }

  /**
   * @method init
   * @description 初始化组件
   */
  init() {
    this.render();
    this.createStyle();
  }

  /**
   * @method render
   * @description 渲染价格卡片
   */
  render() {
    const dcPricingContainer = document.createElement('div');
    dcPricingContainer.setAttribute('class', 'dc-pricing-container');
    this.container.appendChild(dcPricingContainer);

    dcPricingContainer.innerHTML = this.priceData.map((plan, index) => `
      <div class="dc-card dc-card${index} ${plan.name === 'Basic' ? 'dc-card-popular' : ''}">
        <div class="dc-card-header">
          <h2 class="dc-card-title">${plan.name}</h2>
          ${plan.name === 'Basic' ? '<span class="dc-card-tag">Popular</span>' : ''}
        </div>
        <div class="dc-card-price">
          <span class="dc-card-price-value">${plan.priceUnit}${plan.price}</span>
          <span class="dc-card-price-unit">${plan.unit}</span>
        </div>
        <a href="${plan.buyLink}" class="dc-card-buy">${plan.buy}</a>
        <div class="dc-card-features-list">
          ${plan.features.map(feature => `
            <div class="dc-card-feature">
              ${feature.tag === 'true' ? '<span class="dc-card-feature-icon"><svg class="icon icon_right" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M16 24L22 30L34 18" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg></span>' : '<span class="dc-card-feature-icon dc-card-feature-icon-disabled"><svg class="icon icon_false" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M29.6567 18.3432L18.343 29.6569" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M18.3433 18.3432L29.657 29.6569" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg></span>'}
              <span class="dc-card-feature-desc ${feature.tag === 'false' ? 'dc-card-feature-desc-disabled' : ''}">${feature.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  /**
   * @method createStyle
   * @description 创建样式
   */
  createStyle() {
    const cssRules = `
      .dc-pricing-container { display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap; gap: 20px; max-width: 1290px; margin: 0 auto; }
      .dc-pricing-container .dc-card { background-color: var(--bg-theme-100); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); box-sizing: border-box; padding: 20px; text-align: center; transition: transform 0.3s; max-width: 416px; width: 100%; }
      .dc-pricing-container .dc-card:hover { transform: translateY(-10px); }
      .dc-pricing-container .dc-card.dc-card-popular { border: 2px solid var(--bg-theme-500); }
      .dc-pricing-container .dc-card .dc-card-header { display: flex; justify-content: flex-start; align-items: center; gap: 10px; }
      .dc-pricing-container .dc-card .dc-card-header .dc-card-title { font-size: 24px; line-height: 1.2; text-align: left; color: var(--font-theme-950); margin: 0; }
      .dc-pricing-container .dc-card .dc-card-header .dc-card-tag { background-color: var(--bg-theme-100); padding: 5px 10px; border-radius: 20px; font-size: 14px; text-align: center; line-height: 1.2; color: var(--font-theme-900); border: 1px solid var(--bg-theme-500); }
      .dc-pricing-container .dc-card .dc-card-price { margin: 20px 0; display: flex; justify-content: flex-start; align-items: flex-end; }
      .dc-pricing-container .dc-card .dc-card-price .dc-card-price-value { font-size: 56px; font-weight: bold; text-align: left; color: var(--font-theme-950); margin-right: 6px; line-height: 1.1; }
      .dc-pricing-container .dc-card .dc-card-price .dc-card-price-unit { font-size: 20px; color: var(--font-theme-600); text-align: left; line-height: 1.4; }
      .dc-pricing-container .dc-card .dc-card-buy { display: block; box-sizing: border-box; padding: 12px 30px; background-color: var(--bg-theme-50); font-size: 18px; color: var(--font-theme-900); line-height: 1.2; text-decoration: none; border-radius: 8px; transition: background-color 0.3s; min-width: 142px; border: 1px solid var(--bg-theme-800); }
      .dc-pricing-container .dc-card .dc-card-buy:hover { background-color: var(--bg-theme-200); }
      .dc-pricing-container .dc-card .dc-card-features-list { position: relative; text-align: left; margin: 20px auto 0; border-top: 1px solid var(--bg-theme-200); }
      .dc-pricing-container .dc-card .dc-card-features-list .dc-card-feature { display: flex; align-items: center; margin: 10px 0; }
      .dc-pricing-container .dc-card .dc-card-features-list .dc-card-feature-icon { margin-right: 10px; width: 24px; height: 24px; display: flex; justify-content: center; align-items: center; }
      .dc-pricing-container .dc-card .dc-card-features-list .dc-card-feature-icon .icon { width: 100%; height: 100%; }
      .dc-pricing-container .dc-card .dc-card-features-list .dc-card-feature-icon .icon path { fill: #03fa41; stroke: var(--bg-theme-50); }
      .dc-pricing-container .dc-card .dc-card-features-list .dc-card-feature-icon-disabled .icon path { fill: #ff0000; stroke: var(--bg-theme-50); }
      .dc-pricing-container .dc-card .dc-card-features-list .dc-card-feature-desc { font-size: 16px; line-height: 1.2; text-align: left; color: var(--font-theme-800); }
      .dc-pricing-container .dc-card .dc-card-features-list .dc-card-feature-desc-disabled { text-decoration: line-through; color: var(--font-theme-600); }
    `;
    const style = document.createElement('style');
    style.innerHTML = cssRules;
    document.head.appendChild(style);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCPricing;
} else {
  window.DC = window.DC || {};
  window.DC.Pricing = DCPricing;
}
