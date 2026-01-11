/**
 * DC.js - TypeScript版本入口文件
 * 导入所有工具类和组件，并注册到全局DC对象
 */

// 导入工具类
import dcArray from './utils/dcArray'
import dcString from './utils/dcString'

// 导入组件
import dcProgressBar from './components/dcprogressbar/dcprogressbar'

// 确保全局DC对象存在
declare global {
  interface Window {
    DC: any
  }
}

if (typeof window !== 'undefined') {
  window.DC = window.DC || {}

  // 注册所有工具类到全局DC对象
  window.DC.Array = dcArray
  window.DC.String = dcString

  // 注册所有组件到全局DC对象
  window.DC.ProgressBar = dcProgressBar
}

// 导出所有模块
export { dcArray, dcString, dcProgressBar }

// 默认导出
export default {
  Array: dcArray,
  String: dcString,
  ProgressBar: dcProgressBar,
}
