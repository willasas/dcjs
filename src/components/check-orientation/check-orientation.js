function replaceDoc(){
  console.log('正在替换文档。。。');
}

// 检查是否支持 window.orientation 属性
function supportsOrientation() {
  return 'orientation' in window;
}

// 封装检测方向的逻辑
function checkOrientation() {
  if (window.orientation === 180 || window.orientation === 0) {
    console.log('竖屏');
    alert('竖屏');
    replaceDoc();
  } else if (window.orientation === 90 || window.orientation === -90) {
    console.log('横屏');
    alert('横屏');
  }
}

// 防抖函数，减少频繁调用带来的性能问题
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// 使用防抖封装 replaceDoc 函数调用
var debouncedReplaceDoc = debounce(replaceDoc, 250);

// 监听屏幕方向变化或大小变化事件
if (supportsOrientation()) {
  window.addEventListener("onorientationchange" in window ? "orientationchange" : 'resize', () => {
    checkOrientation();

    // 只在竖屏状态下替换文档，以减少性能消耗
    if (window.orientation === 180 || window.orientation === 0) {
      debouncedReplaceDoc();
    }
  }, false);
} else {
  console.log("该浏览器不支持检测屏幕方向");
}