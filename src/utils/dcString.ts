/**
 * 字符串处理工具类
 */
class dcString {
  /**
   * 首字母大写
   * @param str - 输入字符串
   * @returns 首字母大写的字符串
   */
  static capitalize(str: string): string {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * 驼峰命名转换
   * @param str - 输入字符串
   * @param isUpperCamelCase - 是否转换为大驼峰
   * @returns 驼峰命名字符串
   */
  static toCamelCase(str: string, isUpperCamelCase: boolean = false): string {
    if (!str) return ''
    const result = str.toLowerCase().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    return isUpperCamelCase ? this.capitalize(result) : result
  }

  /**
   * 下划线命名转换
   * @param str - 输入字符串
   * @returns 下划线命名字符串
   */
  static toSnakeCase(str: string): string {
    if (!str) return ''
    return str
      .replace(/([A-Z])/g, '_$1')
      .replace(/[-\s]+/g, '_')
      .toLowerCase()
      .replace(/^_/, '')
  }

  /**
   * 短横线命名转换
   * @param str - 输入字符串
   * @returns 短横线命名字符串
   */
  static toKebabCase(str: string): string {
    if (!str) return ''
    return str
      .replace(/([A-Z])/g, '-$1')
      .replace(/[-_\s]+/g, '-')
      .toLowerCase()
      .replace(/^-/, '')
  }

  /**
   * 截取字符串并添加省略号
   * @param str - 输入字符串
   * @param length - 截取长度
   * @param ellipsis - 省略号
   * @returns 截取后的字符串
   */
  static truncate(str: string, length: number, ellipsis: string = '...'): string {
    if (!str) return ''
    if (str.length <= length) return str
    return str.slice(0, length) + ellipsis
  }

  /**
   * 将字符串转换为大写
   * @param str - 要转换的字符串
   * @returns 转换后的字符串
   */
  static toUpperCase(str: string): string {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string')
    }
    return str.toUpperCase()
  }

  /**
   * 反转字符串
   * @param str - 输入字符串
   * @returns 反转后的字符串
   */
  static reverse(str: string): string {
    if (!str) return ''
    return str.split('').reverse().join('')
  }

  /**
   * 去除HTML标签
   * @param str - 输入字符串
   * @returns 去除HTML标签后的字符串
   */
  static stripHtml(str: string): string {
    if (!str) return ''
    return str.replace(/<[^>]*>/g, '')
  }

  /**
   * 转义HTML特殊字符
   * @param str - 输入字符串
   * @returns 转义后的字符串
   */
  static escapeHtml(str: string): string {
    if (!str) return ''
    const htmlEscapes: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    }
    return str.replace(/[&<>"'/]/g, char => htmlEscapes[char])
  }

  /**
   * 解码HTML特殊字符
   * @param str - 输入字符串
   * @returns 解码后的字符串
   */
  static unescapeHtml(str: string): string {
    if (!str) return ''
    const htmlUnescapes: { [key: string]: string } = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x2F;': '/',
    }
    return str.replace(/&(?:amp|lt|gt|quot|#x27|#x2F);/g, entity => htmlUnescapes[entity])
  }

  /**
   * 生成指定长度的随机字符串
   * @param length - 字符串长度
   * @param chars - 字符集
   * @returns 随机字符串
   */
  static random(length: number, chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let result = ''
    const len = chars.length
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * len))
    }
    return result
  }

  /**
   * 计算字符串的字节长度
   * @param str - 输入字符串
   * @returns 字节长度
   */
  static byteLength(str: string): number {
    if (!str) return 0
    return new Blob([str]).size
  }

  /**
   * 格式化模板字符串
   * @param template - 模板字符串
   * @param data - 数据对象
   * @returns 格式化后的字符串
   */
  static template(template: string, data: { [key: string]: any }): string {
    if (!template) return ''
    return template.replace(/\${(\w+)}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match
    })
  }

  /**
   * 检查字符串是否包含特定字符串
   * @param str - 输入字符串
   * @param search - 搜索字符串或字符串数组
   * @param caseSensitive - 是否区分大小写
   * @returns 是否包含
   */
  static contains(str: string, search: string | string[], caseSensitive: boolean = true): boolean {
    if (!str) return false
    if (!caseSensitive) str = str.toLowerCase()

    if (Array.isArray(search)) {
      return search.some(s => {
        const searchStr = caseSensitive ? s : s.toLowerCase()
        return str.includes(searchStr)
      })
    }

    const searchStr = caseSensitive ? search : search.toLowerCase()
    return str.includes(searchStr)
  }

  /**
   * 计算两个字符串的相似度（Levenshtein距离）
   * @param str1 - 第一个字符串
   * @param str2 - 第二个字符串
   * @returns 相似度（0-1之间）
   */
  static similarity(str1: string, str2: string): number {
    if (!str1 || !str2) return 0

    const len1 = str1.length
    const len2 = str2.length
    const matrix: number[][] = Array(len2 + 1)
      .fill(null)
      .map(() => Array(len1 + 1).fill(0))

    for (let i = 0; i <= len1; i++) matrix[0][i] = i
    for (let j = 0; j <= len2; j++) matrix[j][0] = j

    for (let j = 1; j <= len2; j++) {
      for (let i = 1; i <= len1; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + cost)
      }
    }

    const maxLen = Math.max(len1, len2)
    return 1 - matrix[len2][len1] / maxLen
  }

  /**
   * 将字符串转换为单词数组
   * @param str - 输入字符串
   * @returns 单词数组
   */
  static words(str: string): string[] {
    if (!str) return []
    return str.trim().split(/\s+/)
  }

  /**
   * 计算字符串中的单词数
   * @param str - 输入字符串
   * @returns 单词数
   */
  static wordCount(str: string): number {
    return this.words(str).length
  }

  /**
   * 将字符串填充到指定长度
   * @param str - 输入字符串
   * @param length - 目标长度
   * @param char - 填充字符
   * @param end - 是否在末尾填充
   * @returns 填充后的字符串
   */
  static pad(str: string, length: number, char: string = ' ', end: boolean = true): string {
    if (!str) return ''
    const padLength = length - str.length
    if (padLength <= 0) return str

    const padding = char.repeat(padLength)
    return end ? str + padding : padding + str
  }

  /**
   * 检查字符串是否为有效的JSON
   * @param str - 输入字符串
   * @returns 是否为有效的JSON
   */
  static isJSON(str: string): boolean {
    if (!str) return false
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * 将字符串转换为URL友好的slug
   * @param str - 输入字符串
   * @returns slug字符串
   */
  static slug(str: string): string {
    if (!str) return ''
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  /**
   * 统计字符串中字符的出现次数
   * @param str - 输入字符串
   * @param char - 要统计的字符
   * @returns 出现次数
   */
  static countChar(str: string, char: string): number {
    if (!str || !char) return 0
    return (str.match(new RegExp(char, 'g')) || []).length
  }
}

// 全局注册
declare global {
  interface Window {
    DC: any
  }
}

window.DC = window.DC || {}
window.DC.String = dcString

export default dcString
