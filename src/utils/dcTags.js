/**
 * Tags管理工具类
 * 提供标签的添加、删除、修改、查询等功能
 */
class DCTags {
  constructor() {
    // 存储标签数据
    this.tags = new Map();
    // 存储标签与项目的关联
    this.itemTags = new Map();
  }

  /**
   * 添加标签
   * @param {string} tagName - 标签名称
   * @param {Object} options - 标签选项
   * @param {string} options.color - 标签颜色
   * @param {string} options.description - 标签描述
   * @returns {DCTags} 当前实例
   */
  addTag(tagName, options = {}) {
    const {
      color = '#3b82f6', // 默认蓝色
      description = ''
    } = options;

    this.tags.set(tagName, {
      name: tagName,
      color,
      description,
      createdAt: new Date().toISOString()
    });

    return this;
  }

  /**
   * 批量添加标签
   * @param {Array} tags - 标签数组
   * @returns {DCTags} 当前实例
   */
  addTags(tags) {
    tags.forEach(tag => {
      if (typeof tag === 'string') {
        this.addTag(tag);
      } else if (typeof tag === 'object' && tag.name) {
        this.addTag(tag.name, tag);
      }
    });

    return this;
  }

  /**
   * 删除标签
   * @param {string} tagName - 标签名称
   * @returns {boolean} 是否删除成功
   */
  removeTag(tagName) {
    // 从标签存储中删除
    const removed = this.tags.delete(tagName);

    // 从所有项目的标签中删除
    this.itemTags.forEach((tags, itemId) => {
      const newTags = tags.filter(tag => tag !== tagName);
      this.itemTags.set(itemId, newTags);
    });

    return removed;
  }

  /**
   * 更新标签
   * @param {string} tagName - 标签名称
   * @param {Object} options - 标签选项
   * @param {string} options.color - 标签颜色
   * @param {string} options.description - 标签描述
   * @returns {boolean} 是否更新成功
   */
  updateTag(tagName, options = {}) {
    if (!this.tags.has(tagName)) {
      return false;
    }

    const tag = this.tags.get(tagName);
    const updatedTag = {
      ...tag,
      ...options,
      updatedAt: new Date().toISOString()
    };

    this.tags.set(tagName, updatedTag);
    return true;
  }

  /**
   * 获取标签信息
   * @param {string} tagName - 标签名称
   * @returns {Object|null} 标签信息
   */
  getTag(tagName) {
    return this.tags.get(tagName) || null;
  }

  /**
   * 获取所有标签
   * @returns {Array} 标签数组
   */
  getAllTags() {
    return Array.from(this.tags.values());
  }

  /**
   * 检查标签是否存在
   * @param {string} tagName - 标签名称
   * @returns {boolean} 是否存在
   */
  hasTag(tagName) {
    return this.tags.has(tagName);
  }

  /**
   * 为项目添加标签
   * @param {string} itemId - 项目ID
   * @param {string|Array} tags - 标签名称或标签数组
   * @returns {DCTags} 当前实例
   */
  addTagsToItem(itemId, tags) {
    const itemTagList = this.itemTags.get(itemId) || [];
    const tagsToAdd = Array.isArray(tags) ? tags : [tags];

    tagsToAdd.forEach(tag => {
      // 确保标签存在
      if (!this.tags.has(tag)) {
        this.addTag(tag);
      }

      // 添加标签到项目
      if (!itemTagList.includes(tag)) {
        itemTagList.push(tag);
      }
    });

    this.itemTags.set(itemId, itemTagList);
    return this;
  }

  /**
   * 从项目中删除标签
   * @param {string} itemId - 项目ID
   * @param {string|Array} tags - 标签名称或标签数组
   * @returns {DCTags} 当前实例
   */
  removeTagsFromItem(itemId, tags) {
    const itemTagList = this.itemTags.get(itemId) || [];
    const tagsToRemove = Array.isArray(tags) ? tags : [tags];

    const newTagList = itemTagList.filter(tag => !tagsToRemove.includes(tag));
    this.itemTags.set(itemId, newTagList);

    return this;
  }

  /**
   * 替换项目的标签
   * @param {string} itemId - 项目ID
   * @param {Array} tags - 新的标签数组
   * @returns {DCTags} 当前实例
   */
  setItemTags(itemId, tags) {
    // 确保所有标签都存在
    tags.forEach(tag => {
      if (!this.tags.has(tag)) {
        this.addTag(tag);
      }
    });

    this.itemTags.set(itemId, tags);
    return this;
  }

  /**
   * 获取项目的标签
   * @param {string} itemId - 项目ID
   * @returns {Array} 标签数组
   */
  getItemTags(itemId) {
    return this.itemTags.get(itemId) || [];
  }

  /**
   * 获取项目的标签详情
   * @param {string} itemId - 项目ID
   * @returns {Array} 标签详情数组
   */
  getItemTagDetails(itemId) {
    const tagNames = this.itemTags.get(itemId) || [];
    return tagNames.map(tagName => this.tags.get(tagName)).filter(Boolean);
  }

  /**
   * 搜索标签
   * @param {string} query - 搜索关键词
   * @returns {Array} 匹配的标签
   */
  searchTags(query) {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.tags.values()).filter(tag => 
      tag.name.toLowerCase().includes(lowerQuery) ||
      tag.description.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * 按标签获取项目
   * @param {string} tagName - 标签名称
   * @returns {Array} 包含该标签的项目ID数组
   */
  getItemsByTag(tagName) {
    const items = [];
    this.itemTags.forEach((tags, itemId) => {
      if (tags.includes(tagName)) {
        items.push(itemId);
      }
    });
    return items;
  }

  /**
   * 获取标签统计
   * @returns {Object} 标签统计信息
   */
  getTagStats() {
    const stats = {};
    
    // 统计每个标签的使用次数
    this.itemTags.forEach(tags => {
      tags.forEach(tag => {
        if (!stats[tag]) {
          stats[tag] = 0;
        }
        stats[tag]++;
      });
    });

    // 转换为数组并排序
    return Object.entries(stats)
      .map(([name, count]) => ({
        name,
        count,
        ...this.tags.get(name)
      }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * 导出标签数据
   * @returns {Object} 标签数据
   */
  exportData() {
    return {
      tags: Array.from(this.tags.entries()).map(([name, data]) => ({ name, ...data })),
      itemTags: Array.from(this.itemTags.entries())
    };
  }

  /**
   * 导入标签数据
   * @param {Object} data - 标签数据
   * @returns {DCTags} 当前实例
   */
  importData(data) {
    // 导入标签
    if (data.tags) {
      data.tags.forEach(tag => {
        this.tags.set(tag.name, tag);
      });
    }

    // 导入项目标签关联
    if (data.itemTags) {
      data.itemTags.forEach(([itemId, tags]) => {
        this.itemTags.set(itemId, tags);
      });
    }

    return this;
  }

  /**
   * 清除所有标签
   * @returns {DCTags} 当前实例
   */
  clear() {
    this.tags.clear();
    this.itemTags.clear();
    return this;
  }
}

// 注册到全局DC对象
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.Tags = DCTags
}

// CommonJS 模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCTags
}
