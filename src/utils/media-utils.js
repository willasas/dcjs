// 视频、音频操作

// dom: <video src="ossweb-img/kv-mv2.webm" id="video2" class="video2" muted="muted" loop="" autoplay="" preload="auto" playsinline="" webkit-playsinline=""></video>
// 封装视频事件设置函数
function setupVideoEvents(vidId) {
    // 使用const代替var，提高变量声明的清晰度
    const elevideo = document.getElementById(vidId);
  
    // 异常处理：检查视频元素是否存在
    if (!elevideo) {
      console.error("视频元素未找到");
      return; // 提前退出，防止后续执行
    }
  
    // 使用更简洁的箭头函数来定义事件处理器
    // 加载数据时的处理
    elevideo.addEventListener('loadedmetadata', () => {
      console.log(elevideo.duration, '总时长');
    });
  
    // 播放开始时的处理
    elevideo.addEventListener('play', () => console.log("开始播放"));
  
    // 播放中时的处理
    elevideo.addEventListener('playing', () => console.log("播放中"));
  
    // 加载中时的处理
    elevideo.addEventListener('waiting', () => console.log("加载中"));
  
    // 暂停开始时的处理
    elevideo.addEventListener('pause', () => console.log("暂停播放"));
  
    // 播放结束时的处理
    elevideo.addEventListener('ended', () => console.log("播放结束"), false);
  }
  
  // 调用函数，设置视频事件
  setupVideoEvents('video2');