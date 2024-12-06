/**
 * 处理HTTP请求的工具类。
 */
class dcHttps {
  /**
   * 发起GET请求。
   * @param {string} url - 请求的URL。
   * @returns {Promise<Object>} 返回解析后的JSON数据。
   */
  static async get(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  /**
   * 发起POST请求。
   * @param {string} url - 请求的URL。
   * @param {Object} data - 发送的数据。
   * @returns {Promise<Object>} 返回解析后的JSON数据。
   */
  static async post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }
}

window.DC = window.DC || {};
window.DC.Https = dcHttps;