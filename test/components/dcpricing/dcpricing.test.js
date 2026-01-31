/**
 * dcpricing组件测试
 */
const DCPricing = require('../../../src/components/dcpricing/dcpricing');

describe('DCPricing类测试', () => {
  let dcPricing;
  let testContainer;

  beforeEach(() => {
    // 创建测试容器
    testContainer = document.createElement('div');
    testContainer.id = 'test-container';
    document.body.appendChild(testContainer);
    
    // 模拟价格数据
    const priceData = [
      {
        name: 'Basic',
        price: 10,
        priceUnit: '$',
        unit: '/month',
        buy: 'Buy Now',
        buyLink: 'https://example.com/buy/basic',
        features: [
          { desc: '10GB Storage', tag: 'true' },
          { desc: 'Basic Support', tag: 'true' },
          { desc: '1 User', tag: 'true' },
          { desc: 'Advanced Features', tag: 'false' }
        ]
      },
      {
        name: 'Pro',
        price: 20,
        priceUnit: '$',
        unit: '/month',
        buy: 'Buy Now',
        buyLink: 'https://example.com/buy/pro',
        features: [
          { desc: '50GB Storage', tag: 'true' },
          { desc: 'Priority Support', tag: 'true' },
          { desc: '5 Users', tag: 'true' },
          { desc: 'Advanced Features', tag: 'true' }
        ]
      },
      {
        name: 'Enterprise',
        price: 50,
        priceUnit: '$',
        unit: '/month',
        buy: 'Buy Now',
        buyLink: 'https://example.com/buy/enterprise',
        features: [
          { desc: 'Unlimited Storage', tag: 'true' },
          { desc: '24/7 Support', tag: 'true' },
          { desc: 'Unlimited Users', tag: 'true' },
          { desc: 'Advanced Features', tag: 'true' }
        ]
      }
    ];
    
    // 初始化DCPricing
    dcPricing = new DCPricing(priceData, '#test-container');
  });

  afterEach(() => {
    // 清理容器
    document.body.removeChild(testContainer);
    // 清理样式
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
      if (style.innerHTML.includes('.dc-pricing-container')) {
        document.head.removeChild(style);
      }
    });
  });

  test('初始化DCPricing组件', () => {
    dcPricing.init();
    
    const pricingContainer = testContainer.querySelector('.dc-pricing-container');
    expect(pricingContainer).toBeTruthy();
    
    const cards = pricingContainer.querySelectorAll('.dc-card');
    expect(cards.length).toBe(3);
  });

  test('渲染价格卡片内容', () => {
    dcPricing.init();
    
    const cards = testContainer.querySelectorAll('.dc-card');
    
    // 检查第一个卡片（Basic）
    const basicCard = cards[0];
    expect(basicCard.querySelector('.dc-card-title').textContent).toBe('Basic');
    expect(basicCard.querySelector('.dc-card-tag')).toBeTruthy();
    expect(basicCard.querySelector('.dc-card-price-value').textContent).toBe('$10');
    expect(basicCard.querySelector('.dc-card-price-unit').textContent).toBe('/month');
    expect(basicCard.querySelector('.dc-card-buy').href).toBe('https://example.com/buy/basic');
    expect(basicCard.querySelector('.dc-card-buy').textContent).toBe('Buy Now');
    
    // 检查特性列表
    const features = basicCard.querySelectorAll('.dc-card-feature');
    expect(features.length).toBe(4);
  });

  test('Basic计划应该有popular标记', () => {
    dcPricing.init();
    
    const basicCard = testContainer.querySelector('.dc-card0');
    expect(basicCard.classList.contains('dc-card-popular')).toBe(true);
    expect(basicCard.querySelector('.dc-card-tag')).toBeTruthy();
  });

  test('非Basic计划不应该有popular标记', () => {
    dcPricing.init();
    
    const proCard = testContainer.querySelector('.dc-card1');
    const enterpriseCard = testContainer.querySelector('.dc-card2');
    
    expect(proCard.classList.contains('dc-card-popular')).toBe(false);
    expect(proCard.querySelector('.dc-card-tag')).toBeFalsy();
    expect(enterpriseCard.classList.contains('dc-card-popular')).toBe(false);
    expect(enterpriseCard.querySelector('.dc-card-tag')).toBeFalsy();
  });

  test('特性应该正确显示启用和禁用状态', () => {
    dcPricing.init();
    
    const basicCard = testContainer.querySelector('.dc-card0');
    const features = basicCard.querySelectorAll('.dc-card-feature');
    
    // 检查启用的特性
    expect(features[0].querySelector('.dc-card-feature-icon').classList.contains('dc-card-feature-icon-disabled')).toBe(false);
    expect(features[0].querySelector('.dc-card-feature-desc').classList.contains('dc-card-feature-desc-disabled')).toBe(false);
    
    // 检查禁用的特性
    expect(features[3].querySelector('.dc-card-feature-icon').classList.contains('dc-card-feature-icon-disabled')).toBe(true);
    expect(features[3].querySelector('.dc-card-feature-desc').classList.contains('dc-card-feature-desc-disabled')).toBe(true);
  });

  test('使用自定义容器选择器', () => {
    // 创建另一个测试容器
    const customContainer = document.createElement('div');
    customContainer.id = 'custom-container';
    document.body.appendChild(customContainer);
    
    // 初始化DCPricing
    const customDCPricing = new DCPricing([
      {
        name: 'Test',
        price: 5,
        priceUnit: '$',
        unit: '/month',
        buy: 'Buy Now',
        buyLink: 'https://example.com/buy/test',
        features: [
          { desc: 'Test Feature', tag: 'true' }
        ]
      }
    ], '#custom-container');
    
    customDCPricing.init();
    
    const pricingContainer = customContainer.querySelector('.dc-pricing-container');
    expect(pricingContainer).toBeTruthy();
    
    // 清理
    document.body.removeChild(customContainer);
  });
});
