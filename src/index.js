// index.js - dcjs 库的统一入口文件
// 导入所有工具模块，它们会自动注册到 window.DC 对象
import './utils/dcArray'
import './utils/dcBrowser'
import './utils/dcCrypto'
import './utils/dcDate'
import './utils/dcEle'
import './utils/dcFiles'
import './utils/dcFunction'
import './utils/dcMedia'
import './utils/dcNetworkChecker'
import './utils/dcNumber'
import './utils/dcObject'
import './utils/dcString'
import './utils/dcUrl'
import './utils/dcValidate'
import './utils/dcadapt'
import './utils/dchttps'
import './utils/dcinfinitescroller'
import './utils/dcjson'
import './utils/dclottery'
import './utils/dcplatform'
import './utils/dcqrcode'
import './utils/dcregexp'
import './utils/dcwaterfall'
import './utils/dprettylog'
import './utils/ga'
import './utils/sampleadapt'

// 各个工具类已在各自文件中注册到 window.DC 对象
// 此文件提供跨环境（浏览器、CommonJS、AMD）的兼容性支持
;(function (global, factory) {
  // 浏览器环境检查
  var isBrowser = typeof window !== 'undefined'

  if (typeof exports === 'object' && typeof module !== 'undefined' && !isBrowser) {
    // CommonJS 环境（非浏览器）
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    // AMD 环境
    define(factory)
  } else {
    // 浏览器全局环境
    global.DC = global.DC || factory()
  }
})(typeof window !== 'undefined' ? window : this, function () {
  // 确保 window.DC 对象存在
  if (typeof window !== 'undefined') {
    window.DC = window.DC || {}
  }

  // 获取已注册的 DC 对象
  var DC = typeof window !== 'undefined' ? window.DC : {}

  // 返回 DC 对象
  return DC
})
