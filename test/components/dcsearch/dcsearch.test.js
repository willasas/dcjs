/**
 * DCSearch 测试文件
 * 测试搜索组件的功能和API
 */

describe('DCSearch', () => {
  let container;
  let searchComponent;
  const testData = [
    { title: 'JavaScript 教程', content: '这是一篇关于JavaScript的详细教程', tags: 'js,前端,教程' },
    { title: 'React 入门指南', content: 'React是一个用于构建用户界面的JavaScript库', tags: 'react,前端,库' },
    { title: 'Vue.js 实战', content: 'Vue.js是一个渐进式JavaScript框架', tags: 'vue,前端,框架' },
    { title: 'Node.js 后端开发', content: 'Node.js允许在服务器端运行JavaScript', tags: 'nodejs,后端,服务器' },
    { title: 'TypeScript 进阶', content: 'TypeScript是JavaScript的超集，添加了类型系统', tags: 'typescript,前端,类型' }
  ];

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 清理测试容器
    if (searchComponent) {
      // 移除组件元素
      if (searchComponent.container && searchComponent.container.parentNode) {
        searchComponent.container.parentNode.removeChild(searchComponent.container);
      }
    }
    if (container) {
      container.remove();
    }
    // 清理样式
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
      if (style.innerHTML.includes('.dc-search')) {
        style.remove();
      }
    });
  });

  test('should initialize with default options', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData
    });

    expect(searchComponent.config.searchMode).toBe('fuzzy');
    expect(searchComponent.config.debounceTime).toBe(300);
    expect(searchComponent.config.maxResults).toBe(10);
    expect(searchComponent.config.highlight).toBe(true);
  });

  test('should initialize with custom options', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData,
      searchMode: 'exact',
      debounceTime: 500,
      maxResults: 5,
      highlight: false
    });

    expect(searchComponent.config.searchMode).toBe('exact');
    expect(searchComponent.config.debounceTime).toBe(500);
    expect(searchComponent.config.maxResults).toBe(5);
    expect(searchComponent.config.highlight).toBe(false);
  });

  test('should perform fuzzy search correctly', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData,
      searchMode: 'fuzzy'
    });

    // 模拟搜索
    searchComponent.search('java');

    // 检查结果
    const results = searchComponent.resultContainer.querySelectorAll('.dc-search-result-item');
    expect(results.length).toBeGreaterThan(0);
  });

  test('should perform exact search correctly', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData,
      searchMode: 'exact'
    });

    // 模拟搜索
    searchComponent.search('JavaScript 教程');

    // 检查结果
    const results = searchComponent.resultContainer.querySelectorAll('.dc-search-result-item');
    expect(results.length).toBe(1);
  });

  test('should handle empty keyword', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData
    });

    // 模拟空搜索
    searchComponent.search('');

    // 检查结果
    expect(searchComponent.resultContainer.innerHTML).toBe('');
  });

  test('should handle no results', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData
    });

    // 搜索不存在的关键词
    searchComponent.search('不存在的关键词');

    // 检查结果
    const noResultElement = searchComponent.resultContainer.querySelector('.dc-search-no-result');
    expect(noResultElement).toBeTruthy();
  });

  test('should highlight keywords when enabled', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData,
      highlight: true
    });

    // 模拟搜索
    searchComponent.search('JavaScript');

    // 检查高亮
    const highlightElements = searchComponent.resultContainer.querySelectorAll('.dc-search-highlight');
    expect(highlightElements.length).toBeGreaterThan(0);
  });

  test('should not highlight keywords when disabled', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData,
      highlight: false
    });

    // 模拟搜索
    searchComponent.search('JavaScript');

    // 检查高亮
    const highlightElements = searchComponent.resultContainer.querySelectorAll('.dc-search-highlight');
    expect(highlightElements.length).toBe(0);
  });

  test('should toggle search mode', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData
    });

    expect(searchComponent.config.searchMode).toBe('fuzzy');
    expect(searchComponent.modeToggle.textContent).toBe('模糊');

    // 模拟点击切换模式
    searchComponent.modeToggle.click();

    expect(searchComponent.config.searchMode).toBe('exact');
    expect(searchComponent.modeToggle.textContent).toBe('精确');
  });

  test('should update search mode programmatically', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData
    });

    expect(searchComponent.getSearchMode()).toBe('fuzzy');

    // 编程方式切换模式
    searchComponent.setSearchMode('exact');

    expect(searchComponent.getSearchMode()).toBe('exact');
    expect(searchComponent.modeToggle.textContent).toBe('精确');
  });

  test('should set data correctly', () => {
    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: []
    });

    // 设置测试数据
    searchComponent.setData(testData);

    // 模拟搜索
    searchComponent.search('JavaScript');

    // 检查结果
    const results = searchComponent.resultContainer.querySelectorAll('.dc-search-result-item');
    expect(results.length).toBeGreaterThan(0);
  });

  test('should call onSearch callback', (done) => {
    const onSearchMock = jest.fn((keyword, results) => {
      expect(keyword).toBe('JavaScript');
      expect(results.length).toBeGreaterThan(0);
      done();
    });

    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData,
      onSearch: onSearchMock
    });

    // 模拟搜索
    searchComponent.search('JavaScript');
  });

  test('should call onSelect callback', (done) => {
    const onSelectMock = jest.fn((item, index) => {
      expect(item).toBeTruthy();
      expect(index).toBeGreaterThanOrEqual(0);
      done();
    });

    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: testData,
      onSelect: onSelectMock
    });

    // 模拟搜索
    searchComponent.search('JavaScript');

    // 模拟点击结果
    setTimeout(() => {
      const resultItem = searchComponent.resultContainer.querySelector('.dc-search-result-item');
      if (resultItem) {
        resultItem.click();
      }
    }, 100);
  });

  test('should limit results to maxResults', () => {
    // 创建更多测试数据
    const largeTestData = [];
    for (let i = 0; i < 15; i++) {
      largeTestData.push({
        title: `测试标题 ${i}`,
        content: `测试内容 ${i}`,
        tags: `test,tag${i}`
      });
    }

    searchComponent = new window.DC.Search({
      container: '#test-container',
      data: largeTestData,
      maxResults: 5
    });

    // 模拟搜索
    searchComponent.search('测试');

    // 检查结果数量
    const results = searchComponent.resultContainer.querySelectorAll('.dc-search-result-item');
    expect(results.length).toBe(5);
  });
});
