/**
 * dcolor组件测试
 */
const DColor = require('../../../src/components/dcolor/dcolor');

// 模拟fetch API
global.fetch = jest.fn();

// 模拟navigator.clipboard
global.navigator = {
  clipboard: {
    writeText: jest.fn()
  }
};

describe('DColor类测试', () => {
  let dcolor;
  let container;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
    
    // 清除fetch模拟
    global.fetch.mockClear();
    global.navigator.clipboard.writeText.mockClear();
    
    // 模拟fetch响应
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([
        { name: '红色', hex: '#FF0000', rgb: 'rgb(255, 0, 0)', cmyk: 'cmyk(0, 100, 100, 0)' },
        { name: '绿色', hex: '#00FF00', rgb: 'rgb(0, 255, 0)', cmyk: 'cmyk(100, 0, 100, 0)' },
        { name: '蓝色', hex: '#0000FF', rgb: 'rgb(0, 0, 255)', cmyk: 'cmyk(100, 100, 0, 0)' }
      ])
    });
  });

  afterEach(() => {
    // 清理容器
    document.body.removeChild(container);
  });

  test('初始化DColor组件', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(container.querySelector('.dc-color-picker')).toBeTruthy();
    expect(container.querySelector('.dc-color-grid')).toBeTruthy();
  });

  test('添加颜色', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 添加单个颜色
    dcolor.addColors({
      name: '黄色',
      hex: '#FFFF00',
      rgb: 'rgb(255, 255, 0)',
      cmyk: 'cmyk(0, 0, 100, 0)'
    });
    
    expect(dcolor.getAllColors().length).toBe(4);
    
    // 添加多个颜色
    dcolor.addColors([
      {
        name: '紫色',
        hex: '#800080',
        rgb: 'rgb(128, 0, 128)',
        cmyk: 'cmyk(50, 100, 0, 50)'
      },
      {
        name: '橙色',
        hex: '#FFA500',
        rgb: 'rgb(255, 165, 0)',
        cmyk: 'cmyk(0, 35, 100, 0)'
      }
    ]);
    
    expect(dcolor.getAllColors().length).toBe(6);
  });

  test('获取所有颜色', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const colors = dcolor.getAllColors();
    expect(Array.isArray(colors)).toBe(true);
    expect(colors.length).toBe(3);
  });

  test('搜索颜色', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 搜索红色
    dcolor.searchColors('红色');
    
    // 搜索蓝色
    dcolor.searchColors('蓝色');
    
    // 搜索不存在的颜色
    dcolor.searchColors('不存在的颜色');
  });

  test('按色系分类颜色', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const categories = dcolor.getColorsByCategory();
    expect(categories).toBeTruthy();
    expect(categories.red).toBeTruthy();
    expect(categories.green).toBeTruthy();
    expect(categories.blue).toBeTruthy();
  });

  test('复制到剪贴板', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 模拟writeText成功
    global.navigator.clipboard.writeText.mockResolvedValueOnce();
    
    // 触发复制事件
    const copyBtn = container.querySelector('.dc-copy-btn');
    copyBtn.click();
    
    expect(global.navigator.clipboard.writeText).toHaveBeenCalled();
  });

  test('模糊匹配算法', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 测试模糊匹配
    const score1 = dcolor.fuzzyMatch('红色', '红');
    expect(score1).toBeGreaterThan(0);
    
    const score2 = dcolor.fuzzyMatch('红色', '蓝');
    expect(score2).toBe(0);
  });

  test('HEX转RGB', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const rgb = dcolor.hexToRgb('#FF0000');
    expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
    
    const rgb2 = dcolor.hexToRgb('FF0000');
    expect(rgb2).toEqual({ r: 255, g: 0, b: 0 });
  });

  test('颜色色系判断', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(dcolor.isRedTone('#FF0000')).toBe(true);
    expect(dcolor.isGreenTone('#00FF00')).toBe(true);
    expect(dcolor.isBlueTone('#0000FF')).toBe(true);
    expect(dcolor.isYellowTone('#FFFF00')).toBe(true);
    expect(dcolor.isPurpleTone('#800080')).toBe(true);
    expect(dcolor.isGrayTone('#808080')).toBe(true);
  });

  test('获取当前颜色', async () => {
    dcolor = new DColor({
      container: '#test-container',
      jsonPath: 'color.json'
    });
    
    // 等待数据加载完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(dcolor.getCurrentColor()).toBeNull();
  });
});
