// 创建一个辅助函数用于设置图片源并观察元素是否进入视口
function lazyLoad(imgElement) {
  // 创建一个Intersection Observer实例
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // 当图片进入视口时
        const img = entry.target;
        // 设置实际图片地址
        img.src = img.dataset.src;
        // 如果不再需要监听，可以解绑观察者
        observer.unobserve(img);
      }
    });
  });

  // 开始观察该元素
  observer.observe(imgElement);
}

// 遍历所有待延迟加载的图片
document.querySelectorAll('img[data-src]').forEach(img => {
  lazyLoad(img); // 对每个图片调用lazyLoad函数
});