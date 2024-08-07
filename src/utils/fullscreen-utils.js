/**
 * FullscreenManager 全屏管理器类
 * 用于操作和管理元素的全屏显示状态。
 */
class FullscreenManager {
    /**
     * 构造函数
     * @param {Element} element - 需要进行全屏操作的元素。若未提供，则默认使用文档的根元素。
     */
    constructor(element) {
      this.el = element || document.documentElement; // 默认使用文档根元素
      this.addFullscreenChangeHandler();
      // 内容区域宽度和高度
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
      // 窗口边框宽度和高度
      this.outerWidth = window.outerWidth;
      this.outerHeight = window.outerHeight;
      // 文档元素宽度和高度
      this.docElementWidth = document.documentElement.offsetWidth;
      this.docElementHeight = document.documentElement.offsetHeight;
      // 文档滚动宽度和高度
      this.docScrollWidth = document.documentElement.scrollWidth;
      this.docScrollHeight = document.documentElement.scrollHeight;
      // 文档可视区宽度和高度
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
      // 屏幕可用宽度和高度
      this.availWidth = window.screen.availWidth;
      this.availHeight = window.screen.availHeight;
      // 屏幕总宽度和高度
      this.screenTotalWidth = window.screen.width;
      this.screenTotalHeight = window.screen.height;
      // 屏幕不可用高度
      this.screenUnusedHeight = screenTotalHeight - availHeight;
    }
  
    /**
     * 进入全屏模式
     */
    enterFullScreen() {
      // 尝试调用各种浏览器兼容的全屏方法
      if (this.el.requestFullscreen) {
        this.el.requestFullscreen();
      } else if (this.el.mozRequestFullScreen) {
        this.el.mozRequestFullScreen();
      } else if (this.el.webkitRequestFullscreen) {
        this.el.webkitRequestFullscreen();
      } else if (this.el.msRequestFullscreen) {
        this.el.msRequestFullscreen();
      }
    }
  
    /**
     * 退出全屏模式
     */
    exitFullscreen() {
      // 尝试调用各种浏览器兼容的退出全屏方法
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  
    /**
     * 检查当前是否处于全屏模式
     * @returns {boolean} 当前是否处于全屏状态
     */
    isFullscreen() {
      // 检查各种浏览器兼容的全屏状态属性
      return !!document.fullscreenElement || !!document.webkitFullscreenElement || !!document.mozFullScreenElement || !!document.msFullscreenElement;
    }
  
    /**
     * 切换当前的全屏状态
     */
    toggleFullScreen() {
      // 根据当前全屏状态，调用进入或退出全屏方法
      if (this.isFullscreen()) {
        this.exitFullscreen();
      } else {
        this.enterFullScreen(this.el);
      }
    }
  
    /**
     * 添加全屏状态变化事件监听
     */
    addFullscreenChangeHandler() {
      // 为各种浏览器兼容的全屏状态变化事件添加监听
      document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
      document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange.bind(this));
      document.addEventListener('mozfullscreenchange', this.handleFullscreenChange.bind(this));
      document.addEventListener('MSFullscreenChange', this.handleFullscreenChange.bind(this));
    }
  
    /**
     * 处理全屏状态变化事件
     */
    handleFullscreenChange() {
      console.log('Fullscreen change event handled.');
      // 这里可以添加状态变化后的逻辑处理
    }
  
    /**
     * 创建并添加全屏切换按钮到页面
     */
    createToggleBtn() {
      // 创建按钮元素并设置样式
      const changeBtn = document.createElement('button');
      changeBtn.innerText = '进入全屏';
      changeBtn.style.position = 'absolute';
      changeBtn.style.top = '10px';
      changeBtn.style.left = '10px';
      changeBtn.style.zIndex = '9999';
      changeBtn.style.background = '#ccc';
      changeBtn.style.width = '100px';
      changeBtn.style.height = '40px';
      
      // 将按钮添加到页面，并绑定全屏切换事件
      document.body.appendChild(changeBtn);
      changeBtn.addEventListener('click', this.toggleFullScreen.bind(this));
    }

    printDimensions() {
      return {
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        docElementWidth,
        docElementHeight,
        docScrollWidth,
        docScrollHeight,
        clientWidth,
        clientHeight,
        availWidth,
        availHeight,
        screenTotalWidth,
        screenTotalHeight,
        screenUnusedHeight
      };
    }
}
  
// 实例化FullscreenManager并创建按钮
const manager = new FullscreenManager();
manager.createToggleBtn();
manager.printDimensions();