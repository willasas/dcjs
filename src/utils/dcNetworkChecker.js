/**
 * 网络连接检测工具类
 * 提供网络连接状态检测、监控和相关信息获取功能
 */
class DCNetworkChecker {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {Array<string>} options.testUrls - 用于测试连接的URL数组，默认使用一些公共API
   * @param {number} options.timeout - 请求超时时间（毫秒），默认5000
   * @param {number} options.interval - 定期检查间隔（毫秒），默认10000
   * @param {number} options.retryAttempts - 重试次数，默认3次
   * @param {number} options.retryDelay - 重试间隔（毫秒），默认1000
   * @param {Function} options.onOnline - 网络连接恢复时的回调函数
   * @param {Function} options.onOffline - 网络断开时的回调函数
   * @param {Function} options.onStatusChange - 网络状态变化时的回调函数
   */
  constructor(options = {}) {
    // 默认测试URL，用户可以通过options.testUrls覆盖
    const defaultTestUrls = [
      'https://httpbin.org/get',      // 通用HTTP请求测试服务
      'https://api.github.com',       // GitHub API，测试HTTPS连接
      'https://www.google.com/generate_204'  // Google的无内容响应服务
    ];
    
    this.testUrls = options.testUrls || defaultTestUrls;
    this.timeout = options.timeout || 5000;
    this.interval = options.interval || 10000; // 定期检查间隔
    this.retryAttempts = options.retryAttempts || 3; // 重试次数
    this.retryDelay = options.retryDelay || 1000; // 重试间隔
    this._isMonitoring = false;
    this._monitorInterval = null;
    
    // 事件回调
    this.onOnline = options.onOnline || null;
    this.onOffline = options.onOffline || null;
    this.onStatusChange = options.onStatusChange || null;
  }

  /**
   * 测试网络连接
   * @returns {Promise<Object>} 网络连接状态结果
   */
  async testConnection() {
    // 首先检查浏览器认为是否在线
    if (!navigator.onLine) {
      return { 
        online: false, 
        type: 'browser-offline', 
        message: '浏览器报告离线' 
      };
    }

    // 尝试连接到测试URL
    for (const url of this.testUrls) {
      try {
        const start = Date.now();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const responseTime = Date.now() - start;

        // 对于204 No Content响应的特殊处理
        if (url.includes('generate_204')) {
          if (response.status === 204) {
            return {
              online: true,
              type: 'fast-response',
              message: '网络连接正常',
              responseTime,
              url
            };
          }
        } else {
          // 对于其他URL，检查是否返回有效响应
          if (response.ok) {
            return {
              online: true,
              type: 'valid-response',
              message: '网络连接正常',
              responseTime,
              url
            };
          }
        }
      } catch (error) {
        console.log(`测试 ${url} 时出错:`, error.message);
        // 继续尝试下一个URL
      }
    }

    return { 
      online: false, 
      type: 'connection-failed', 
      message: '无法连接到任何测试服务器' 
    };
  }

  /**
   * 带重试机制的网络连接测试
   * @returns {Promise<Object>} 网络连接状态结果
   */
  async testConnectionWithRetry() {
    for (let i = 0; i < this.retryAttempts; i++) {
      const result = await this.testConnection();
      
      if (result.online) {
        return result; // 如果连接成功，直接返回
      }
      
      // 如果不是最后一次尝试，等待一段时间后重试
      if (i < this.retryAttempts - 1) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }
    
    // 所有重试都失败后，返回失败结果
    return { 
      online: false, 
      type: 'connection-failed-after-retry', 
      message: `经过${this.retryAttempts}次重试后仍然无法连接` 
    };
  }

  /**
   * 获取网络信息
   * @returns {Object} 网络相关信息
   */
  getNetworkInfo() {
    const connection = navigator.connection || 
                      navigator.mozConnection || 
                      navigator.webkitConnection;

    return {
      online: navigator.onLine,
      effectiveType: connection ? connection.effectiveType : 'unknown',
      downlink: connection ? connection.downlink : 'unknown',
      rtt: connection ? connection.rtt : 'unknown',
      saveData: connection ? connection.saveData : 'unknown',
      downlinkMax: connection ? connection.downlinkMax : 'unknown'
    };
  }

  /**
   * 开始监控网络状态
   */
  startMonitoring() {
    if (this._isMonitoring) {
      console.warn('网络监控已在运行中');
      return;
    }

    this._isMonitoring = true;
    
    // 添加浏览器原生事件监听器
    window.addEventListener('online', this._handleOnline.bind(this));
    window.addEventListener('offline', this._handleOffline.bind(this));
    
    // 定期检查网络连接
    this._monitorInterval = setInterval(async () => {
      const result = await this.testConnectionWithRetry();
      if (this.onStatusChange) {
        this.onStatusChange(result);
      }
    }, this.interval);
    
    console.log('网络监控已启动');
  }

  /**
   * 停止监控网络状态
   */
  stopMonitoring() {
    if (!this._isMonitoring) {
      console.warn('网络监控未在运行');
      return;
    }

    this._isMonitoring = false;
    if (this._monitorInterval) {
      clearInterval(this._monitorInterval);
      this._monitorInterval = null;
    }
    
    // 移除事件监听器
    window.removeEventListener('online', this._handleOnline.bind(this));
    window.removeEventListener('offline', this._handleOffline.bind(this));
    
    console.log('网络监控已停止');
  }

  // 处理上线事件
  _handleOnline() {
    console.log('网络已连接');
    if (this.onOnline) {
      this.onOnline();
    }
    
    // 尝试重新连接服务或同步数据
    this.testConnectionWithRetry().then(result => {
      if (this.onStatusChange) {
        this.onStatusChange(result);
      }
    });
  }

  // 处理离线事件
  _handleOffline() {
    console.log('网络已断开');
    if (this.onOffline) {
      this.onOffline();
    }
    
    if (this.onStatusChange) {
      this.onStatusChange({ 
        online: false, 
        type: 'browser-offline', 
        message: '浏览器报告离线' 
      });
    }
  }

  /**
   * 获取当前网络状态摘要
   * @returns {Promise<Object>} 包含网络状态和信息的摘要对象
   */
  async getStatusSummary() {
    const networkInfo = this.getNetworkInfo();
    const connectionResult = await this.testConnectionWithRetry();
    
    return {
      ...networkInfo,
      ...connectionResult,
      lastChecked: new Date().toISOString()
    };
  }
}

window.DC = window.DC || {};
window.DC.NetworkChecker = DCNetworkChecker;