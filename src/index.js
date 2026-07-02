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
import './utils/dcDailyQuote' // 添加每日一言工具
import './utils/dcScreenshot' // 添加截图工具
import './utils/dcImageViewer' // 添加图片查看器工具
import './utils/dcpicolor' // 添加颜色工具
import './utils/dcStorage' // 添加存储工具

// 导入所有组件模块，它们会自动注册到 window.DC 对象
import './components/animate/dcanimator'
import './components/article/dcarticlecard'
import './components/article/dcarticletopinfo'
import './components/article/dccourseaccordion'
import './components/bgm/dcontrolsound'
import './components/bgm/dcsamplebgm'
import './components/cookies/dcookiespopup'
import './components/dcanswer/dcanswer'
import './components/dcbottombar/dcbottombar'
import './components/dcdateselector/dcdateselector'
import './components/dcfileupload/dcfileupload'
import './components/dcfilter/dcfilter'
import './components/dcity/dcity'
import './components/dclocal/dclang'
import './components/dclocal/dclangselector'
import './components/dclocal/dclocalselector'
import './components/dclocal/dcphoneselector'
import './components/dcolor/dcolor'
import './components/dcpartner/dcpartner'
import './components/dcpricing/dcpricing'
import './components/dcproductivityslider/dcproductivityslider'
import './components/dcprogressbar/dcprogressbar'
import './components/dcsearch/dcsearch'
import './components/dcsidebar/dcsidebar'
import './components/dcsidenav/dcsidenav'
import './components/dcslider/dcslider'
import './components/dctheme/dctheme'
import './components/dctopbar/dctopbar'
import './components/dcvirtualcard/dcvirtualcard'
import './components/dcvirtualscroller/dcvirtualscroller'
import './components/designby/designby'
import './components/followus/dcfollowbtn'
import './components/followus/dcfollowus'
import './components/footer/dcfooter'
import './components/header/dcheader'
import './components/icons/dciconlist'
import './components/pager/dcpager'
import './components/popup/dcpopup'
import './components/dcmarquee/dcmarquee'

// 各个工具类和组件已在各自文件中注册到 window.DC 对象
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
