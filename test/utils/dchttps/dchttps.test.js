const dcHttps = require('../../../src/utils/dchttps');

// Mock fetch API
global.fetch = jest.fn();

const mockResponse = (data, status = 200) => ({
  ok: status === 200,
  status,
  json: jest.fn().mockResolvedValue(data)
});

describe('dcHttps', () => {
  afterEach(() => {
    // 重置mock
    jest.clearAllMocks();
  });

  describe('get方法', () => {
    test('应该成功发起GET请求并返回数据', async () => {
      // 模拟成功响应
      const testData = { message: 'Success' };
      fetch.mockResolvedValue(mockResponse(testData));

      // 执行GET请求
      const result = await dcHttps.get('https://example.com/api');

      // 验证结果
      expect(result).toEqual(testData);
      expect(fetch).toHaveBeenCalledWith('https://example.com/api');
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('应该处理GET请求失败的情况', async () => {
      // 模拟失败响应
      fetch.mockResolvedValue(mockResponse({}, 500));

      // 执行GET请求并验证错误
      await expect(dcHttps.get('https://example.com/api')).rejects.toThrow('HTTP error! status: 500');
      expect(fetch).toHaveBeenCalledWith('https://example.com/api');
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('应该处理网络错误', async () => {
      // 模拟网络错误
      const networkError = new Error('Network error');
      fetch.mockRejectedValue(networkError);

      // 执行GET请求并验证错误
      await expect(dcHttps.get('https://example.com/api')).rejects.toThrow('Network error');
      expect(fetch).toHaveBeenCalledWith('https://example.com/api');
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('post方法', () => {
    test('应该成功发起POST请求并返回数据', async () => {
      // 模拟成功响应
      const testData = { message: 'Success' };
      const postData = { username: 'test', password: '123456' };
      fetch.mockResolvedValue(mockResponse(testData));

      // 执行POST请求
      const result = await dcHttps.post('https://example.com/api', postData);

      // 验证结果
      expect(result).toEqual(testData);
      expect(fetch).toHaveBeenCalledWith(
        'https://example.com/api',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('应该处理POST请求失败的情况', async () => {
      // 模拟失败响应
      const postData = { username: 'test', password: '123456' };
      fetch.mockResolvedValue(mockResponse({}, 401));

      // 执行POST请求并验证错误
      await expect(dcHttps.post('https://example.com/api', postData)).rejects.toThrow('HTTP error! status: 401');
      expect(fetch).toHaveBeenCalledWith(
        'https://example.com/api',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('应该处理POST请求的网络错误', async () => {
      // 模拟网络错误
      const networkError = new Error('Network error');
      const postData = { username: 'test', password: '123456' };
      fetch.mockRejectedValue(networkError);

      // 执行POST请求并验证错误
      await expect(dcHttps.post('https://example.com/api', postData)).rejects.toThrow('Network error');
      expect(fetch).toHaveBeenCalledWith(
        'https://example.com/api',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('应该处理空数据的POST请求', async () => {
      // 模拟成功响应
      const testData = { message: 'Success' };
      fetch.mockResolvedValue(mockResponse(testData));

      // 执行POST请求（空数据）
      const result = await dcHttps.post('https://example.com/api', {});

      // 验证结果
      expect(result).toEqual(testData);
      expect(fetch).toHaveBeenCalledWith(
        'https://example.com/api',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        }
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('错误处理', () => {
    test('应该在GET请求失败时打印错误信息', async () => {
      // 模拟console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      // 模拟网络错误
      const networkError = new Error('Network error');
      fetch.mockRejectedValue(networkError);

      // 执行GET请求
      await expect(dcHttps.get('https://example.com/api')).rejects.toThrow('Network error');

      // 验证错误信息被打印
      expect(consoleErrorSpy).toHaveBeenCalledWith('GET request failed:', networkError);

      // 恢复console.error
      consoleErrorSpy.mockRestore();
    });

    test('应该在POST请求失败时打印错误信息', async () => {
      // 模拟console.error
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      // 模拟网络错误
      const networkError = new Error('Network error');
      fetch.mockRejectedValue(networkError);

      // 执行POST请求
      await expect(dcHttps.post('https://example.com/api', {})).rejects.toThrow('Network error');

      // 验证错误信息被打印
      expect(consoleErrorSpy).toHaveBeenCalledWith('POST request failed:', networkError);

      // 恢复console.error
      consoleErrorSpy.mockRestore();
    });
  });
});