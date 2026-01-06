/**
 * dcqrcode工具类Node.js测试用例
 */

// 模拟浏览器环境
const { JSDOM } = require('jsdom');

// 创建一个模拟的DOM环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { 
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// 导入dcqrcode模块
const dcQRCode = require('../src/utils/dcqrcode.js').default;

describe('DC.QRCode in Node.js Environment', () => {
  let qrCode;

  beforeEach(() => {
    qrCode = new dcQRCode();
  });

  test('should create QRCode instance', () => {
    expect(qrCode).toBeInstanceOf(Object);
    expect(typeof qrCode.generate).toBe('function');
    expect(typeof qrCode.render).toBe('function');
  });

  test('should generate QR code data URL', () => {
    const text = 'https://example.com';
    const dataUrl = qrCode.generate(text);
    
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl).toMatch(/^data:image\/png;base64,/);
  });

  test('should generate QR code with custom options', () => {
    const text = 'Hello World';
    const options = {
      size: 300,
      bgColor: '#FFFFFF',
      fgColor: '#FF0000',
      margin: 5
    };
    
    const dataUrl = qrCode.generate(text, options);
    
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl).toMatch(/^data:image\/png;base64,/);
  });

  test('should render QR code to element', () => {
    // 创建一个模拟的DOM元素
    document.body.innerHTML = '<div id="qrcode-container"></div>';
    const container = document.getElementById('qrcode-container');
    
    const text = 'https://example.com';
    const options = {
      size: 200,
      bgColor: '#FFFFFF',
      fgColor: '#000000'
    };
    
    // 捕获渲染异常
    expect(() => {
      qrCode.render(container, text, options);
    }).not.toThrow();
    
    // 检查容器中是否添加了img元素
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.src).toMatch(/^data:image\/png;base64,/);
    expect(img.style.display).toBe('block');
  });

  test('should render QR code by element ID', () => {
    // 创建一个模拟的DOM元素
    document.body.innerHTML = '<div id="qrcode-test"></div>';
    
    const text = 'https://example.com';
    
    // 捕获渲染异常
    expect(() => {
      qrCode.render('qrcode-test', text);
    }).not.toThrow();
    
    // 检查容器中是否添加了img元素
    const container = document.getElementById('qrcode-test');
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.src).toMatch(/^data:image\/png;base64,/);
  });

  test('should throw error for non-existent element ID', () => {
    expect(() => {
      qrCode.render('non-existent-id', 'test');
    }).toThrow("Element with id 'non-existent-id' not found");
  });

  test('should handle special characters', () => {
    const specialText = 'Special chars: !@#$%^&*()_+{}[]|\\:";?/.>,<`~';
    const dataUrl = qrCode.generate(specialText);
    
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl).toMatch(/^data:image\/png;base64,/);
  });

  test('should have default options when none provided', () => {
    const text = 'Default options test';
    const dataUrl = qrCode.generate(text); // 不传入options参数
    
    expect(typeof dataUrl).toBe('string');
    expect(dataUrl).toMatch(/^data:image\/png;base64,/);
  });
});