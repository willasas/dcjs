/**
 * 星次工具类
 * 根据中国传统的十二星次来确定用户的星次归属
 * 十二星次：星纪、玄枵、娵訾、降娄、大梁、实沈、鹑首、鹑火、鹑尾、寿星、大火、析木
 */
class dcStarSign {
  constructor() {
    // 定义十二星次及其对应的日期范围
    this.starSigns = [
      { name: '星纪', startMonth: 12, startDay: 8, endMonth: 1, endDay: 5 },
      { name: '玄枵', startMonth: 1, startDay: 6, endMonth: 2, endDay: 8 },
      { name: '娵訾', startMonth: 2, startDay: 9, endMonth: 3, endDay: 5 },
      { name: '降娄', startMonth: 3, startDay: 6, endMonth: 4, endDay: 4 },
      { name: '大梁', startMonth: 4, startDay: 5, endMonth: 5, endDay: 5 },
      { name: '实沈', startMonth: 5, startDay: 6, endMonth: 6, endDay: 5 },
      { name: '鹑首', startMonth: 6, startDay: 6, endMonth: 7, endDay: 6 },
      { name: '鹑火', startMonth: 7, startDay: 7, endMonth: 8, endDay: 7 },
      { name: '鹑尾', startMonth: 8, startDay: 8, endMonth: 9, endDay: 7 },
      { name: '寿星', startMonth: 9, startDay: 8, endMonth: 10, endDay: 7 },
      { name: '大火', startMonth: 10, startDay: 8, endMonth: 11, endDay: 12 },
      { name: '析木', startMonth: 11, startDay: 13, endMonth: 12, endDay: 7 },
    ]
  }

  /**
   * 根据出生日期获取对应的星次
   * @param {Date|string} birthDate - 出生日期，可以是Date对象或日期字符串
   * @returns {string} 返回星次信息
   */
  getStarSignByDate(birthDate) {
    const date = this.parseDate(birthDate)
    if (!date) {
      return '日期格式不正确'
    }

    const month = date.getMonth() + 1 // 月份从0开始，需要加1
    const day = date.getDate()

    // 查找对应的星次
    for (const starSign of this.starSigns) {
      if (this.isDateInRange(date, starSign)) {
        return `您的星次为${starSign.name}`
      }
    }

    return '无法确定星次'
  }

  /**
   * 判断日期是否在指定星次范围内
   * @param {Date} date - 要检查的日期
   * @param {Object} starSign - 星次对象
   * @returns {boolean} 是否在范围内
   */
  isDateInRange(date, starSign) {
    const month = date.getMonth() + 1
    const day = date.getDate()

    // 如果星次跨越年份（如星纪：12月8日至1月5日）
    if (starSign.startMonth > starSign.endMonth) {
      // 对于跨年的星次，需要分别判断
      if ((month === starSign.startMonth && day >= starSign.startDay) || (month === starSign.endMonth && day <= starSign.endDay)) {
        return true
      }
      // 如果是1月份且在星纪范围内
      if (starSign.name === '星纪' && month === 1 && day <= starSign.endDay) {
        return true
      }
    } else {
      // 不跨年的星次
      if (month === starSign.startMonth && day >= starSign.startDay) {
        return true
      }
      if (month === starSign.endMonth && day <= starSign.endDay) {
        return true
      }
      if (month > starSign.startMonth && month < starSign.endMonth) {
        return true
      }
    }

    return false
  }

  /**
   * 解析日期
   * @param {Date|string} date - 日期对象或日期字符串
   * @returns {Date|null} 日期对象
   */
  parseDate(date) {
    if (!date) return null
    if (date instanceof Date) return date

    if (typeof date === 'string') {
      // 尝试解析多种日期格式
      const formats = [
        /^\d{4}-\d{1,2}-\d{1,2}$/, // YYYY-MM-DD
        /^\d{4}\/\d{1,2}\/\d{1,2}$/, // YYYY/MM/DD
        /^\d{4}\.\d{1,2}\.\d{1,2}$/, // YYYY.MM.DD
        /^\d{4}年\d{1,2}月\d{1,2}日$/, // YYYY年MM月DD日
      ]

      const cleanDate = date.trim()
      for (const format of formats) {
        if (format.test(cleanDate)) {
          const d = new Date(cleanDate.replace(/年|月|日/g, '/'))
          if (!isNaN(d.getTime())) return d
        }
      }

      // 尝试直接解析
      const d = new Date(date)
      if (!isNaN(d.getTime())) return d
    }

    return null
  }

  /**
   * 获取所有星次信息
   * @returns {Array} 星次数组
   */
  getAllStarSigns() {
    return this.starSigns
  }

  /**
   * 获取指定星次的日期范围
   * @param {string} starSignName - 星次名称
   * @returns {Object|null} 星次日期范围信息
   */
  getStarSignInfo(starSignName) {
    for (const starSign of this.starSigns) {
      if (starSign.name === starSignName) {
        return starSign
      }
    }
    return null
  }
}

// 注册到全局DC对象
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.StarSign = dcStarSign
}

// CommonJS 模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dcStarSign
}
