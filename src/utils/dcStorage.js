/**
 * 内存存储工具类
 */
class dcStorage {
  constructor() {
    this._storage = {}
  }

  /**
   * 存储数据
   * @param {string} key - 键名
   * @param {any} value - 要存储的值
   */
  static set(key, value) {
    if (!key || typeof key !== 'string') {
      console.warn('Key must be a non-empty string')
      return
    }

    // 处理函数和undefined
    if (value === undefined || typeof value === 'function') {
      value = null
    }

    this._storage = this._storage || {}
    this._storage[key] = value
  }

  /**
   * 获取存储的数据
   * @param {string} key - 键名
   * @param {any} [defaultValue] - 默认值
   * @returns {any} 存储的值或默认值
   */
  static get(key, defaultValue = null) {
    if (!key || typeof key !== 'string') {
      console.warn('Key must be a non-empty string')
      return defaultValue
    }

    this._storage = this._storage || {}
    return key in this._storage ? this._storage[key] : defaultValue
  }

  /**
   * 删除指定的键值对
   * @param {string} key - 键名
   */
  static remove(key) {
    if (!key || typeof key !== 'string') {
      console.warn('Key must be a non-empty string')
      return
    }

    this._storage = this._storage || {}
    if (key in this._storage) {
      delete this._storage[key]
    }
  }

  /**
   * 清空所有存储的数据
   */
  static clear() {
    this._storage = {}
  }

  /**
   * 获取所有存储的键名
   * @returns {Array<string>} 键名数组
   */
  static keys() {
    this._storage = this._storage || {}
    return Object.keys(this._storage)
  }

  /**
   * 检查指定的键是否存在
   * @param {string} key - 键名
   * @returns {boolean} 是否存在
   */
  static has(key) {
    if (!key || typeof key !== 'string') {
      console.warn('Key must be a non-empty string')
      return false
    }

    this._storage = this._storage || {}
    return key in this._storage
  }
}

// 初始化存储对象
dcStorage._storage = {}

// 注册到全局DC对象
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.Storage = dcStorage
}

// CommonJS 模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dcStorage
}
