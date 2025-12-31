/**
 * 弹窗SDK类，用于管理弹窗的显示与隐藏，包括页面滚动的控制和点击外部区域关闭弹窗的功能。
 */
class DCPopup {
  /**
   * 构造函数初始化基础属性。
   */
  constructor() {
      this.documentBody = document.body;
      this.currentPopupId = null; // 当前显示的弹窗ID
      this.isBodyScrollDisabled = false; // 页面滚动状态标志
      this.originalParent = null; // 保存元素的原始父节点
      this.init()
  }

  init(){
    const popCssRules = `
      @media screen and (min-width: 1025px) { .popup { width: 100vw; height: 100vh; outline: none; display: none; justify-content: center; align-items: center; position: fixed; z-index: 9999; left: 0; top: 0; background-color: rgba(0, 0, 0, 0.8); }
        .popup .popup-con { position: relative; margin: 0 auto; }
        .popup .popup-con .pop-info { margin: 0 auto; width: 96%; height: 100%; overflow: hidden; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; flex-direction: column; }
        .popup .popup-con .pop-info .popup-title { font-family: "Microsoft YaHei"; font-size: 48px; font-weight: bold; font-style: normal; line-height: 48px; color: #fff; text-align: center; letter-spacing: normal; text-decoration: none; }
        .popup .popup-con .pop-info .popup-desc { margin: 20px auto 0; width: 100%; height: auto; font-family: "Microsoft YaHei"; font-size: 20px; font-weight: normal; font-style: normal; line-height: 20px; color: #fff; text-align: center; letter-spacing: normal; text-decoration: none; }
        .popup .popup-con .pop-info video { width: 100%; height: 100%; }
        .popup .popup-bg { background-color: #000; width: 860px; height: 600px; }
        .popup .popup-close { display: block; position: absolute; top: -20px; right: -20px; background: #006155; color: #12ded2; width: 40px; height: 40px; border-radius: 50%; line-height: 40px; text-align: center; font-size: 30px; padding: 1px; text-decoration: none; }
        .popup .popup-close::before { content: '\\2716'; } 
      }

      @media screen and (max-width: 1024px) { .popup { width: 100vw; height: 100vh; outline: none; display: none; justify-content: center; align-items: center; position: fixed; z-index: 9999; left: 0; top: 0; background-color: rgba(0, 0, 0, 0.8); }
        .popup .popup-con { position: relative; margin: 0 auto; }
        .popup .popup-con .pop-info { margin: 0 auto; width: 96%; height: 100%; overflow: hidden; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; flex-direction: column; }
        .popup .popup-con .pop-info .popup-title { font-family: "Microsoft YaHei"; font-size: 48px; font-weight: bold; font-style: normal; line-height: 48px; color: #fff; text-align: center; letter-spacing: normal; text-decoration: none; }
        .popup .popup-con .pop-info .popup-desc { margin: 20px auto 0; width: 100%; height: auto; font-family: "Microsoft YaHei"; font-size: 20px; font-weight: normal; font-style: normal; line-height: 20px; color: #fff; text-align: center; letter-spacing: normal; text-decoration: none; }
        .popup .popup-con .pop-info video { width: 100%; height: 100%; }
        .popup .popup-bg { background-color: #000; width: 90%; height: 60%; }
        .popup .popup-close { display: block; position: absolute; top: -20px; right: -20px; background: #006155; color: #12ded2; width: 40px; height: 40px; border-radius: 50%; line-height: 40px; text-align: center; font-size: 30px; padding: 1px; text-decoration: none; }
        .popup .popup-close::before { content: '\\2716'; } 
      }
    `;
    const addStyle = (eleStyleInit) => {
      const fa = document.querySelector('title');
      const eleStyle = document.createElement('style');
      eleStyle.innerHTML = eleStyleInit;
      document.head.insertBefore(eleStyle, fa);
    };
    addStyle(popCssRules);
  }

  /**
   * 创建弹窗元素。
   * 
   * @param {string} popupId 弹窗元素的ID。
   * @param {HTMLElement} content 弹窗内容的DOM元素。
   * @returns {HTMLElement} 创建的弹窗元素。
   */
  createPopup(popupId, content) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = popupId;
    popup.style.display = 'none';

    const popupCon = document.createElement('div');
    popupCon.className = 'popup-con popup-bg';

    const popInfo = document.createElement('div');
    popInfo.className = 'pop-info';
    popInfo.appendChild(content);

    const popupClose = document.createElement('a');
    popupClose.className = 'popup-close';
    popupClose.href = 'javascript:;';
    popupClose.onclick = () => this.hidePopup(popupId);

    popupCon.appendChild(popInfo);
    popupCon.appendChild(popupClose);
    popup.appendChild(popupCon);

    this.documentBody.appendChild(popup);

    return popup;
  }

  /**
   * 显示指定ID的弹窗，并可选设置弹窗背景的颜色和透明度。
   *
   * @param {string} popupId 弹窗元素的ID。
   * @param {string} content 复制的dom元素
   * @param {string} [bgColor='rgba(0,0,0,.8)'] 弹窗背景的颜色，默认为透明黑色，可包含透明度信息如 'rgba(255,255,255,0.5)' 为半透明白色。
   */
  showPopup(popupId, content, bgColor = 'rgba(0,0,0,.8)') {
    const popup = document.getElementById(popupId);
    console.log('当前弹窗ID:', popupId);

    if (popup) {
      if (content) {
        this.originalParent = content.parentNode; // 保存元素的原始父节点
        popup.querySelector('.pop-info').appendChild(content); // 将内容添加到弹窗中
      }
      
      requestAnimationFrame(() => {
        popup.style.display = 'flex';
        popup.style.backgroundColor = bgColor;
        this.currentPopupId = popupId;
        this.disableBodyScroll();
        this.documentBody.addEventListener('click', this.handleClickOutside.bind(this));
      });
    } else {
      console.error(`Popup with id ${popupId} not found.`);
    }
  }
  
  /**
   * 隐藏当前显示的弹窗，并恢复页面滚动。
   */
  hidePopup(popupId = this.currentPopupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      const video = popup.querySelector('video');
      if (video) {
        video.pause();
      }

      const content = popup.querySelector('.pop-info').firstChild;
      if (content && this.originalParent) {
        this.originalParent.appendChild(content); // 将内容放回原位置
      }

      popup.style.display = 'none';
      this.enableBodyScroll();
      this.documentBody.removeEventListener('click', this.handleClickOutside.bind(this));
    } else {
      this.currentPopupId = null;
      console.error(`Popup with id ${popupId} not found.`);
    }
  }

  /**
   * 处理点击页面的事件，用于判断是否点击在(.popup-con)元素外，以决定是否关闭弹窗。
   *
   * @param {MouseEvent} event 点击事件对象。
   */
  handleClickOutside = (event) => {
    const target = event.target;
    const currentPopup = document.getElementById(this.currentPopupId);

    if (currentPopup) {
      const popupCon = currentPopup.querySelector('.popup-con');
      if (popupCon && !popupCon.contains(target)) {
        console.log('点击了弹窗外部');
        this.hidePopup(); // 关闭当前弹窗
      } else if (target.tagName === 'VIDEO') {
        target.pause();
      }
    }
  }

  /**
   * 禁止页面滚动。
   */
  disableBodyScroll() {
    if (!this.isBodyScrollDisabled) {
      this.documentBody.style.position = 'relative';
      this.documentBody.style.overflow = 'hidden';
      this.documentBody.style.height = '100vh';
      this.isBodyScrollDisabled = true;
    }
  }

  /**
   * 启用页面滚动。
   */
  enableBodyScroll() {
    if (this.isBodyScrollDisabled) {
      this.documentBody.style.position = 'relative';
      this.documentBody.style.overflow = 'auto';
      this.documentBody.style.height = 'auto';
      this.isBodyScrollDisabled = false;
    }
  }
}

// 导出全局变量
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCPopup;
} else {
  window.DC = window.DC || {};
  window.DC.Popup = DCPopup;
}
