/**
 * DCProgressBar 测试文件
 * 测试进度条组件的功能和API
 */

describe('DCProgressBar', () => {
  let container;
  let progressBar;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 清理测试容器
    if (progressBar) {
      progressBar.destroy();
    }
    if (container) {
      container.remove();
    }
  });

  test('should initialize with default options', () => {
    progressBar = new window.DC.ProgressBar({
      container: '#test-container'
    });

    expect(progressBar.getValue()).toBe(0);
  });

  test('should initialize with custom options', () => {
    progressBar = new window.DC.ProgressBar({
      container: '#test-container',
      value: 50,
      min: 0,
      max: 100,
      step: 5,
      color: '#ff0000'
    });

    expect(progressBar.getValue()).toBe(50);
  });

  test('should set value correctly', () => {
    progressBar = new window.DC.ProgressBar({
      container: '#test-container'
    });

    progressBar.setValue(75);
    expect(progressBar.getValue()).toBe(75);
  });

  test('should respect min and max values', () => {
    progressBar = new window.DC.ProgressBar({
      container: '#test-container',
      min: 10,
      max: 90
    });

    progressBar.setValue(5);
    expect(progressBar.getValue()).toBe(10);

    progressBar.setValue(95);
    expect(progressBar.getValue()).toBe(90);
  });

  test('should respect step value', () => {
    progressBar = new window.DC.ProgressBar({
      container: '#test-container',
      step: 10
    });

    progressBar.setValue(25);
    expect(progressBar.getValue()).toBe(20);

    progressBar.setValue(36);
    expect(progressBar.getValue()).toBe(40);
  });

  test('should trigger onChange callback when value changes', () => {
    const onChangeMock = jest.fn();

    progressBar = new window.DC.ProgressBar({
      container: '#test-container',
      value: 0,
      onChange: onChangeMock
    });

    progressBar.setValue(50);
    expect(onChangeMock).toHaveBeenCalledWith(50, 0);
  });

  test('should not trigger onChange callback when value does not change', () => {
    const onChangeMock = jest.fn();

    progressBar = new window.DC.ProgressBar({
      container: '#test-container',
      value: 50,
      onChange: onChangeMock
    });

    progressBar.setValue(50);
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  test('should update config correctly', () => {
    progressBar = new window.DC.ProgressBar({
      container: '#test-container',
      value: 50
    });

    progressBar.updateConfig({
      max: 200,
      color: '#00ff00'
    });

    progressBar.setValue(150);
    expect(progressBar.getValue()).toBe(150);
  });

  test('should handle container not found error', () => {
    // 模拟console.error
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    progressBar = new window.DC.ProgressBar({
      container: '#non-existent-container'
    });

    expect(consoleErrorMock).toHaveBeenCalledWith('Container not found:', '#non-existent-container');

    // 恢复console.error
    consoleErrorMock.mockRestore();
  });

  test('should destroy component correctly', () => {
    progressBar = new window.DC.ProgressBar({
      container: '#test-container'
    });

    progressBar.destroy();
    expect(container.innerHTML).toBe('');
  });
});
