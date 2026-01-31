const DCPopup = require('../../../src/components/popup/dcpopup');

// 模拟DOM环境
beforeEach(() => {
  // 模拟document.body
  document.body = {
    style: {},
    appendChild: jest.fn(),
    removeEventListener: jest.fn(),
    addEventListener: jest.fn()
  };
  
  // 模拟document.querySelector
  document.querySelector = jest.fn((selector) => {
    if (selector === 'title') {
      return { parentNode: { insertBefore: jest.fn() } };
    }
    return null;
  });
  
  // 模拟document.getElementById
  document.getElementById = jest.fn();
  
  // 模拟document.createElement
  document.createElement = jest.fn((tagName) => {
    const element = {
      tagName,
      className: '',
      id: '',
      style: {},
      href: '',
      onclick: null,
      appendChild: jest.fn(),
      contains: jest.fn(() => false)
    };
    
    if (tagName === 'video') {
      element.pause = jest.fn();
    }
    
    return element;
  });
  
  // 模拟requestAnimationFrame
  global.requestAnimationFrame = jest.fn((callback) => setTimeout(callback, 0));
});

// 清理模拟
afterEach(() => {
  jest.clearAllMocks();
});

describe('DCPopup Component', () => {
  test('should initialize correctly', () => {
    const popup = new DCPopup();
    
    expect(popup.documentBody).toBe(document.body);
    expect(popup.currentPopupId).toBeNull();
    expect(popup.isBodyScrollDisabled).toBe(false);
    expect(popup.originalParent).toBeNull();
  });
  
  test('should create popup element', () => {
    const popup = new DCPopup();
    const content = document.createElement('div');
    content.textContent = 'Test Content';
    
    const createdPopup = popup.createPopup('test-popup', content);
    
    expect(createdPopup.id).toBe('test-popup');
    expect(createdPopup.className).toBe('popup');
    expect(createdPopup.style.display).toBe('none');
    expect(document.body.appendChild).toHaveBeenCalledWith(createdPopup);
  });
  
  test('should show popup', () => {
    const popup = new DCPopup();
    const content = document.createElement('div');
    content.textContent = 'Test Content';
    content.parentNode = document.body;
    
    // 创建并模拟popup元素
    const mockPopup = document.createElement('div');
    mockPopup.id = 'test-popup';
    mockPopup.style = {};
    mockPopup.querySelector = jest.fn(() => {
      const popInfo = document.createElement('div');
      popInfo.appendChild = jest.fn();
      return popInfo;
    });
    
    document.getElementById.mockReturnValue(mockPopup);
    
    popup.showPopup('test-popup', content, 'rgba(0,0,0,0.5)');
    
    expect(popup.currentPopupId).toBe('test-popup');
    expect(mockPopup.style.display).toBe('flex');
    expect(mockPopup.style.backgroundColor).toBe('rgba(0,0,0,0.5)');
    expect(popup.isBodyScrollDisabled).toBe(true);
  });
  
  test('should hide popup', () => {
    const popup = new DCPopup();
    
    // 创建并模拟popup元素
    const mockContent = document.createElement('div');
    const mockPopInfo = document.createElement('div');
    mockPopInfo.firstChild = mockContent;
    
    const mockPopup = document.createElement('div');
    mockPopup.id = 'test-popup';
    mockPopup.style = {};
    mockPopup.querySelector = jest.fn((selector) => {
      if (selector === '.pop-info') return mockPopInfo;
      return null;
    });
    
    document.getElementById.mockReturnValue(mockPopup);
    
    // 设置原始父节点
    popup.originalParent = document.body;
    popup.currentPopupId = 'test-popup';
    popup.isBodyScrollDisabled = true;
    
    popup.hidePopup('test-popup');
    
    expect(mockPopup.style.display).toBe('none');
    expect(popup.isBodyScrollDisabled).toBe(false);
    expect(popup.originalParent.appendChild).toHaveBeenCalledWith(mockContent);
  });
  
  test('should handle click outside popup', () => {
    const popup = new DCPopup();
    popup.currentPopupId = 'test-popup';
    
    // 创建并模拟popup元素
    const mockPopupCon = document.createElement('div');
    mockPopupCon.contains = jest.fn(() => false);
    
    const mockPopup = document.createElement('div');
    mockPopup.querySelector = jest.fn(() => mockPopupCon);
    
    document.getElementById.mockReturnValue(mockPopup);
    
    // 模拟点击外部
    const mockEvent = {
      target: document.createElement('div')
    };
    
    // 模拟hidePopup方法
    popup.hidePopup = jest.fn();
    
    popup.handleClickOutside(mockEvent);
    
    expect(popup.hidePopup).toHaveBeenCalled();
  });
  
  test('should not hide popup when clicking inside', () => {
    const popup = new DCPopup();
    popup.currentPopupId = 'test-popup';
    
    // 创建并模拟popup元素
    const mockPopupCon = document.createElement('div');
    mockPopupCon.contains = jest.fn(() => true);
    
    const mockPopup = document.createElement('div');
    mockPopup.querySelector = jest.fn(() => mockPopupCon);
    
    document.getElementById.mockReturnValue(mockPopup);
    
    // 模拟点击内部
    const mockEvent = {
      target: document.createElement('div')
    };
    
    // 模拟hidePopup方法
    popup.hidePopup = jest.fn();
    
    popup.handleClickOutside(mockEvent);
    
    expect(popup.hidePopup).not.toHaveBeenCalled();
  });
  
  test('should pause video when clicking on it', () => {
    const popup = new DCPopup();
    popup.currentPopupId = 'test-popup';
    
    // 创建并模拟popup元素
    const mockPopupCon = document.createElement('div');
    mockPopupCon.contains = jest.fn(() => true);
    
    const mockPopup = document.createElement('div');
    mockPopup.querySelector = jest.fn(() => mockPopupCon);
    
    document.getElementById.mockReturnValue(mockPopup);
    
    // 模拟视频元素
    const mockVideo = document.createElement('video');
    mockVideo.pause = jest.fn();
    
    // 模拟点击视频
    const mockEvent = {
      target: mockVideo
    };
    
    popup.handleClickOutside(mockEvent);
    
    expect(mockVideo.pause).toHaveBeenCalled();
  });
  
  test('should disable body scroll', () => {
    const popup = new DCPopup();
    popup.isBodyScrollDisabled = false;
    
    popup.disableBodyScroll();
    
    expect(popup.isBodyScrollDisabled).toBe(true);
    expect(document.body.style.position).toBe('relative');
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.height).toBe('100vh');
  });
  
  test('should enable body scroll', () => {
    const popup = new DCPopup();
    popup.isBodyScrollDisabled = true;
    
    popup.enableBodyScroll();
    
    expect(popup.isBodyScrollDisabled).toBe(false);
    expect(document.body.style.position).toBe('relative');
    expect(document.body.style.overflow).toBe('auto');
    expect(document.body.style.height).toBe('auto');
  });
  
  test('should handle non-existent popup', () => {
    const popup = new DCPopup();
    document.getElementById.mockReturnValue(null);
    
    // 模拟console.error
    console.error = jest.fn();
    
    popup.showPopup('non-existent-popup');
    expect(console.error).toHaveBeenCalledWith('Popup with id non-existent-popup not found.');
    
    popup.hidePopup('non-existent-popup');
    expect(console.error).toHaveBeenCalledWith('Popup with id non-existent-popup not found.');
  });
});
