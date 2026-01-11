/**
 * DC Array 工具类 - TypeScript版本
 * 提供数组操作的常用方法
 */

class DCArray {
  /**
   * 数组去重
   * @param array 要去重的数组
   * @returns 去重后的新数组
   */
  static unique<T>(array: T[]): T[] {
    return [...new Set(array)]
  }

  /**
   * 数组扁平化
   * @param array 要扁平化的数组
   * @param depth 扁平化深度，默认为1
   * @returns 扁平化后的新数组
   */
  static flatten<T>(array: any[], depth: number = 1): T[] {
    return depth > 0 ? array.reduce((acc: T[], val: any) => acc.concat(Array.isArray(val) ? this.flatten(val, depth - 1) : val), []) : array.slice()
  }

  /**
   * 数组分组
   * @param array 要分组的数组
   * @param key 分组依据的键或函数
   * @returns 分组后的对象
   */
  static groupBy<T, K extends keyof T>(array: T[], key: K | ((item: T) => string)): Record<string, T[]> {
    return array.reduce((groups: Record<string, T[]>, item: T) => {
      const groupKey = typeof key === 'function' ? (key as (item: T) => string)(item) : String(item[key])

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(item)
      return groups
    }, {})
  }

  /**
   * 数组排序
   * @param array 要排序的数组
   * @param key 排序依据的键或比较函数
   * @param order 排序顺序，'asc'升序，'desc'降序
   * @returns 排序后的新数组
   */
  static sortBy<T>(array: T[], key: keyof T | ((a: T, b: T) => number), order: 'asc' | 'desc' = 'asc'): T[] {
    const sortedArray = [...array]

    sortedArray.sort((a: T, b: T) => {
      if (typeof key === 'function') {
        return (key as (a: T, b: T) => number)(a, b)
      }

      const aValue = a[key as keyof T]
      const bValue = b[key as keyof T]

      if (aValue < bValue) return order === 'asc' ? -1 : 1
      if (aValue > bValue) return order === 'asc' ? 1 : -1
      return 0
    })

    return sortedArray
  }

  /**
   * 数组分块
   * @param array 要分块的数组
   * @param size 每块的大小
   * @returns 分块后的二维数组
   */
  static chunk<T>(array: T[], size: number): T[][] {
    if (size <= 0) {
      throw new Error('分块大小必须大于0')
    }

    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  /**
   * 数组差集
   * @param array 第一个数组
   * @param arrays 其他数组
   * @returns 差集数组
   */
  static difference<T>(array: T[], ...arrays: T[][]): T[] {
    const exclude = new Set<T>(arrays.flat())
    return array.filter(item => !exclude.has(item))
  }

  /**
   * 数组交集
   * @param arrays 多个数组
   * @returns 交集数组
   */
  static intersection<T>(...arrays: T[][]): T[] {
    if (arrays.length === 0) return []

    const [firstArray, ...restArrays] = arrays
    return firstArray.filter(item => restArrays.every(array => array.includes(item)))
  }

  /**
   * 数组并集
   * @param arrays 多个数组
   * @returns 并集数组
   */
  static union<T>(...arrays: T[][]): T[] {
    return this.unique(arrays.flat())
  }

  /**
   * 数组随机排序
   * @param array 要随机排序的数组
   * @returns 随机排序后的新数组
   */
  static shuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
    return shuffledArray
  }

  /**
   * 数组求和
   * @param array 要求和的数组
   * @param key 求和依据的键或函数
   * @returns 求和结果
   */
  static sum<T>(array: T[], key?: keyof T | ((item: T) => number)): number {
    return array.reduce((sum: number, item: T) => {
      if (key) {
        if (typeof key === 'function') {
          return sum + (key as (item: T) => number)(item)
        }
        return sum + Number(item[key as keyof T])
      }
      return sum + Number(item)
    }, 0)
  }

  /**
   * 数组平均值
   * @param array 要求平均值的数组
   * @param key 求平均值依据的键或函数
   * @returns 平均值
   */
  static average<T>(array: T[], key?: keyof T | ((item: T) => number)): number {
    if (array.length === 0) return 0
    return this.sum(array, key) / array.length
  }

  /**
   * 数组最大值
   * @param array 要求最大值的数组
   * @param key 求最大值依据的键或函数
   * @returns 最大值
   */
  static max<T>(array: T[], key?: keyof T | ((item: T) => number)): T | number | undefined {
    if (array.length === 0) return undefined

    if (!key) {
      return Math.max(...(array as any[]))
    }

    return array.reduce((max: T, item: T) => {
      const maxValue = typeof key === 'function' ? (key as (item: T) => number)(max) : Number(max[key as keyof T])
      const itemValue = typeof key === 'function' ? (key as (item: T) => number)(item) : Number(item[key as keyof T])

      return itemValue > maxValue ? item : max
    })
  }

  /**
   * 数组最小值
   * @param array 要求最小值的数组
   * @param key 求最小值依据的键或函数
   * @returns 最小值
   */
  static min<T>(array: T[], key?: keyof T | ((item: T) => number)): T | number | undefined {
    if (array.length === 0) return undefined

    if (!key) {
      return Math.min(...(array as any[]))
    }

    return array.reduce((min: T, item: T) => {
      const minValue = typeof key === 'function' ? (key as (item: T) => number)(min) : Number(min[key as keyof T])
      const itemValue = typeof key === 'function' ? (key as (item: T) => number)(item) : Number(item[key as keyof T])

      return itemValue < minValue ? item : min
    })
  }
}

// 注册到全局DC对象
declare global {
  interface Window {
    DC: {
      Array: typeof DCArray
    }
  }
}

if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.Array = DCArray
}

export default DCArray
