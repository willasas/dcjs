/**
 * 搜索工具类
 * 提供各种搜索相关功能
 */
class DCSearch {
  constructor() {
    this.indexes = new Map();
  }

  /**
   * 创建搜索索引
   * @param {string} indexName - 索引名称
   * @param {Array} data - 要索引的数据
   * @param {Object} options - 配置选项
   * @param {Array} options.fields - 要索引的字段
   * @param {Function} options.idField - 唯一标识字段
   */
  createIndex(indexName, data, options = {}) {
    const {
      fields = ['title', 'content', 'description'],
      idField = 'id'
    } = options;

    const index = {
      data,
      fields,
      idField,
      // 构建倒排索引
      invertedIndex: this._buildInvertedIndex(data, fields)
    };

    this.indexes.set(indexName, index);
    return this;
  }

  /**
   * 构建倒排索引
   * @private
   * @param {Array} data - 要索引的数据
   * @param {Array} fields - 要索引的字段
   * @returns {Object} 倒排索引
   */
  _buildInvertedIndex(data, fields) {
    const index = {};

    data.forEach((item, itemIndex) => {
      fields.forEach(field => {
        if (item[field]) {
          const text = String(item[field]).toLowerCase();
          const tokens = this._tokenize(text);

          tokens.forEach(token => {
            if (!index[token]) {
              index[token] = [];
            }
            if (!index[token].includes(itemIndex)) {
              index[token].push(itemIndex);
            }
          });
        }
      });
    });

    return index;
  }

  /**
   * 分词
   * @private
   * @param {string} text - 要分词的文本
   * @returns {Array} 分词结果
   */
  _tokenize(text) {
    // 简单的分词实现，去除标点符号并分词
    return text
      .replace(/[.,?!;:/"'()\[\]{}]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 0);
  }

  /**
   * 搜索
   * @param {string} indexName - 索引名称
   * @param {string} query - 搜索关键词
   * @param {Object} options - 搜索选项
   * @param {number} options.limit - 限制返回结果数量
   * @param {number} options.offset - 偏移量
   * @returns {Array} 搜索结果
   */
  search(indexName, query, options = {}) {
    const { limit = 10, offset = 0 } = options;
    const index = this.indexes.get(indexName);

    if (!index) {
      throw new Error(`Index ${indexName} not found`);
    }

    const queryTokens = this._tokenize(query.toLowerCase());
    const results = new Set();

    // 搜索每个token
    queryTokens.forEach(token => {
      if (index.invertedIndex[token]) {
        index.invertedIndex[token].forEach(itemIndex => {
          results.add(itemIndex);
        });
      }
    });

    // 转换为实际数据并排序
    const matchedItems = Array.from(results)
      .map(itemIndex => index.data[itemIndex])
      .sort((a, b) => {
        // 简单的相关性排序
        const scoreA = this._calculateScore(a, queryTokens, index.fields);
        const scoreB = this._calculateScore(b, queryTokens, index.fields);
        return scoreB - scoreA;
      });

    // 应用limit和offset
    return matchedItems.slice(offset, offset + limit);
  }

  /**
   * 计算相关性分数
   * @private
   * @param {Object} item - 要计算分数的项
   * @param {Array} tokens - 搜索关键词分词结果
   * @param {Array} fields - 要搜索的字段
   * @returns {number} 相关性分数
   */
  _calculateScore(item, tokens, fields) {
    let score = 0;

    fields.forEach(field => {
      if (item[field]) {
        const text = String(item[field]).toLowerCase();
        tokens.forEach(token => {
          if (text.includes(token)) {
            // 完全匹配分数更高
            if (text === token) {
              score += 3;
            } else if (text.startsWith(token)) {
              score += 2;
            } else {
              score += 1;
            }
          }
        });
      }
    });

    return score;
  }

  /**
   * 删除索引
   * @param {string} indexName - 索引名称
   * @returns {boolean} 是否删除成功
   */
  deleteIndex(indexName) {
    return this.indexes.delete(indexName);
  }

  /**
   * 清除所有索引
   * @returns {DCSearch} 当前实例
   */
  clearAllIndexes() {
    this.indexes.clear();
    return this;
  }

  /**
   * 获取索引信息
   * @param {string} indexName - 索引名称
   * @returns {Object|null} 索引信息
   */
  getIndexInfo(indexName) {
    const index = this.indexes.get(indexName);
    if (!index) {
      return null;
    }

    return {
      name: indexName,
      itemCount: index.data.length,
      fields: index.fields,
      tokenCount: Object.keys(index.invertedIndex).length
    };
  }

  /**
   * 搜索建议
   * @param {string} indexName - 索引名称
   * @param {string} prefix - 前缀
   * @param {number} limit - 限制返回数量
   * @returns {Array} 搜索建议
   */
  getSuggestions(indexName, prefix, limit = 5) {
    const index = this.indexes.get(indexName);
    if (!index) {
      throw new Error(`Index ${indexName} not found`);
    }

    const prefixLower = prefix.toLowerCase();
    const suggestions = new Set();

    // 从倒排索引中查找前缀匹配的token
    Object.keys(index.invertedIndex).forEach(token => {
      if (token.startsWith(prefixLower)) {
        suggestions.add(token);
      }
    });

    return Array.from(suggestions).sort().slice(0, limit);
  }

  /**
   * 简单的全文搜索（不创建索引）
   * @param {Array} data - 要搜索的数据
   * @param {string} query - 搜索关键词
   * @param {Object} options - 搜索选项
   * @param {Array} options.fields - 要搜索的字段
   * @param {number} options.limit - 限制返回结果数量
   * @returns {Array} 搜索结果
   */
  static search(data, query, options = {}) {
    const {
      fields = ['title', 'content', 'description'],
      limit = 10
    } = options;

    const queryLower = query.toLowerCase();
    const results = [];

    data.forEach(item => {
      let score = 0;

      fields.forEach(field => {
        if (item[field]) {
          const text = String(item[field]).toLowerCase();
          if (text.includes(queryLower)) {
            score += 1;
          }
        }
      });

      if (score > 0) {
        results.push({ item, score });
      }
    });

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(result => result.item);
  }
}

// 注册到全局DC对象
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.Search = DCSearch
}

// CommonJS 模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCSearch
}
