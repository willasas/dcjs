/**
 * 防抖（在一定时间间隔内，多次调用一个方法，只会执行一次）
 * @param {*} func 要进行debouce的函数
 * @param {*} wait 等待时间,默认500ms
 * @param {*} immediate 是否立即执行(immediate为true时，则会立即执行一次调用，后续的调用不会在执行)
*/
export function debounce(func, wait=500, immediate=false) {
  var timeout
  return function() {
      var context = this
      var args = arguments

      if (timeout) clearTimeout(timeout)
      if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout
          timeout = setTimeout(function() {
              timeout = null
          }, wait)
          if (callNow) func.apply(context, args)
      } else {
          timeout = setTimeout(function() {
              func.apply(context, args)
          }, wait)
      }
  }
}

/**
 * 节流，多次触发，间隔时间段执行
 * @param {Function} func
 * @param {Int} wait
 * @param {Object} options
 */
 export function throttle(func, wait=500, options) {
  //container.onmousemove = throttle(getUserAction, 1000);
  var timeout, context, args
  var previous = 0
  // leading:false，trailing:true 默认情况，即在延时结束后才会调用函数
  // leading:true，trailing:true 在延时开始时就调用，延时结束后也会调用
  // leading:true, trailing:false 只在延时开始时调用
  if (!options) options = {leading:false,trailing:true}

  var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime()
      timeout = null
      func.apply(context, args)
      if (!timeout) context = args = null
  }

  var throttled = function() {
      var now = new Date().getTime()
      if (!previous && options.leading === false) previous = now
      var remaining = wait - (now - previous)
      context = this
      args = arguments
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout)
              timeout = null
          }
          previous = now
          func.apply(context, args)
          if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining)
      }
  }
  return throttled
}

// 获取当前屏幕视口对应的设计稿尺寸
function getFontBase () {
  const windowWidth = window.innerWidth

  if (windowWidth < 1024) {
    return 360
  } else if (windowWidth >= 1024 && windowWidth < 1441) {
    return 1440
  } else if (windowWidth >= 1441 && windowWidth < 1921) {
    return 1920
  } else if (windowWidth >= 1921) {
    return 2560
  }
}

// px 转 vw
function pxToVw (px) {
  const fontBase = getFontBase()
  return (px / fontBase * 100) + 'vw'
}

const utils = {
  getFontBase,
  pxToVw,
  throttle,
}

export default utils