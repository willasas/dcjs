/**
 * 弹窗SDK类，用于管理弹窗的显示与隐藏，包括页面滚动的控制和点击外部区域关闭弹窗的功能。
 */
class PopupSDK {
  /**
   * 构造函数初始化基础属性。
   */
  constructor() {
    /** @type {HTMLElement} */
    this.documentBody = document.body;
    this.currentPopupId = null; // 当前显示的弹窗ID
    this.isBodyScrollDisabled = false; // 页面滚动状态标志
  }

  /**
   * 禁止页面滚动。
   */
  disableBodyScroll() {
    if (!this.isBodyScrollDisabled) {
      this.documentBody.style.overflow = 'hidden';
      this.isBodyScrollDisabled = true;
    }
  }

  /**
   * 启用页面滚动。
   */
  enableBodyScroll() {
    if (this.isBodyScrollDisabled) {
      this.documentBody.style.overflow = 'auto';
      this.isBodyScrollDisabled = false;
    }
  }

  /**
   * 显示指定ID的弹窗，并可选设置弹窗背景的颜色和透明度。
   * 
   * @param {string} popupId 弹窗元素的ID。
   * @param {string} [bgColor='rgba(0,0,0,.8)'] 弹窗背景的颜色，默认为透明黑色，可包含透明度信息如 'rgba(255,255,255,0.5)' 为半透明白色。
   */
  showPopup(popupId, bgColor = 'rgba(0,0,0,.8)') {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = 'block';
      popup.style.backgroundColor = bgColor; // 直接修改弹窗背景颜色及透明度

      this.currentPopupId = popupId;
      this.disableBodyScroll();
      this.documentBody.addEventListener('click', this.handleClickOutside);
    } else {
      console.error(`Popup with id ${popupId} not found.`);
    }
  }

  /**
   * 处理点击页面的事件，用于判断是否点击在弹窗外，以决定是否关闭弹窗。
   * 
   * @param {MouseEvent} event 点击事件对象。
   */
  handleClickOutside = (event) => {
    const target = event.target;
    const currentPopup = document.getElementById(this.currentPopupId);
    
    if (currentPopup && currentPopup.contains(target)) {
      this.hidePopup(this.currentPopupId);
    } else if (target.tagName === 'VIDEO') {
      target.pause();
    }
  }

  /**
   * 隐藏指定ID的弹窗，并恢复页面滚动。
   * 
   * @param {string} popupId 要隐藏的弹窗元素的ID。
   */
  hidePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      const video = popup.querySelector('video');
      if (video) {
        video.pause();
      }
      popup.style.display = 'none';
      this.currentPopupId = null;
      this.enableBodyScroll();
      this.documentBody.removeEventListener('click', this.handleClickOutside);
    } else {
      console.error(`Popup with id ${popupId} not found.`);
    }
  }
}

/**
 * 创建并返回PopupSDK实例。
 * @type {PopupSDK}
 */
const popupSDK = new PopupSDK();
