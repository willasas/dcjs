/**
 * 弹窗SDK类，用于管理弹窗的显示与隐藏，包括页面滚动的控制和点击外部区域关闭弹窗的功能。
 */
class DCPopup {
  /**
   * 构造函数初始化基础属性。
   */
  constructor() {
    this.documentBody = document.body
    this.currentPopupId = null // 当前显示的弹窗ID
    this.isBodyScrollDisabled = false // 页面滚动状态标志
    this.originalParent = null // 保存元素的原始父节点
    this.currentAnimationType = null // 记录当前使用的动画类型
    this.init()
  }

  init() {
    const popCssRules = `
      @media screen and (min-width: 1025px) {
        .popup {
          width: 100vw;
          height: 100vh;
          outline: none;
          display: none;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.8);
        }
        .popup .popup-con {
          position: relative;
          margin: 0 auto;
        }
        .popup .popup-con .pop-info {
          margin: 0 auto;
          width: 96%;
          height: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          flex-direction: column;
        }
        .popup .popup-con .pop-info .popup-title {
          font-family: "Microsoft YaHei";
          font-size: 48px;
          font-weight: bold;
          font-style: normal;
          line-height: 48px;
          color: #fff;
          text-align: center;
          letter-spacing: normal;
          text-decoration: none;
        }
        .popup .popup-con .pop-info .popup-desc {
          margin: 20px auto 0;
          width: 100%;
          height: auto;
          font-family: "Microsoft YaHei";
          font-size: 20px;
          font-weight: normal;
          font-style: normal;
          line-height: 20px;
          color: #fff;
          text-align: center;
          letter-spacing: normal;
          text-decoration: none;
        }
        .popup .popup-con .pop-info video {
          width: 100%;
          height: 100%;
        }
        .popup .popup-bg {
          background-color: #000;
          width: 860px;
          height: 600px;
        }
        .popup .popup-close {
          display: block;
          position: absolute;
          top: -20px;
          right: -20px;
          background: #006155;
          color: #12ded2;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          line-height: 40px;
          text-align: center;
          font-size: 30px;
          padding: 1px;
          text-decoration: none;
        }
        .popup .popup-close::before {
          content: "✖";
        }
      }
      @media screen and (max-width: 1024px) {
        .popup {
          width: 100vw;
          height: 100vh;
          outline: none;
          display: none;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.8);
        }
        .popup .popup-con {
          position: relative;
          margin: 0 auto;
        }
        .popup .popup-con .pop-info {
          margin: 0 auto;
          width: 96%;
          height: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          flex-direction: column;
        }
        .popup .popup-con .pop-info .popup-title {
          font-family: "Microsoft YaHei";
          font-size: 48px;
          font-weight: bold;
          font-style: normal;
          line-height: 48px;
          color: #fff;
          text-align: center;
          letter-spacing: normal;
          text-decoration: none;
        }
        .popup .popup-con .pop-info .popup-desc {
          margin: 20px auto 0;
          width: 100%;
          height: auto;
          font-family: "Microsoft YaHei";
          font-size: 20px;
          font-weight: normal;
          font-style: normal;
          line-height: 20px;
          color: #fff;
          text-align: center;
          letter-spacing: normal;
          text-decoration: none;
        }
        .popup .popup-con .pop-info video {
          width: 100%;
          height: 100%;
        }
        .popup .popup-bg {
          background-color: #000;
          width: 90%;
          height: 60%;
        }
        .popup .popup-close {
          display: block;
          position: absolute;
          top: -20px;
          right: -20px;
          background: #006155;
          color: #12ded2;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          line-height: 40px;
          text-align: center;
          font-size: 30px;
          padding: 1px;
          text-decoration: none;
        }
        .popup .popup-close::before {
          content: "✖";
        }
      }

      .popup {
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .popup.open {
        visibility: visible;
        opacity: 1;
      }

      .popup-animation-top .popup-con {
        transform: rotateX(90deg);
        transform-origin: top center;
        transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-top.open .popup-con {
        transform: rotateX(0deg);
      }

      .popup-animation-left .popup-con {
        transform: rotateY(90deg);
        transform-origin: left center;
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-left.open .popup-con {
        transform: rotateY(0deg);
      }

      .popup-animation-bottom .popup-con {
        transform: rotateX(-90deg);
        transform-origin: bottom center;
        transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-bottom.open .popup-con {
        transform: rotateX(0deg);
      }

      .popup-animation-right .popup-con {
        transform: rotateY(-90deg);
        transform-origin: right center;
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-right.open .popup-con {
        transform: rotateY(0deg);
      }

      .popup-animation-slide-left .popup-con {
        transform: translate3d(-150%, 0, 0) rotateY(90deg);
        transform-origin: left center;
        transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-slide-left.open .popup-con {
        transform: translate3d(0, 0, 0) rotateY(0deg);
      }

      .popup-animation-slide-right .popup-con {
        transform: translate3d(150%, 0, 0) rotateY(-90deg);
        transform-origin: right center;
        transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-slide-right.open .popup-con {
        transform: translate3d(0, 0, 0) rotateY(0deg);
      }

      .popup-animation-slide-top .popup-con {
        transform: translate3d(0, -150%, 0) rotateX(90deg);
        transform-origin: top center;
        transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-slide-top.open .popup-con {
        transform: translate3d(0, 0, 0) rotateX(0deg);
      }

      .popup-animation-slide-bottom .popup-con {
        transform: translate3d(0, 150%, 0) rotateX(-90deg);
        transform-origin: bottom center;
        transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-slide-bottom.open .popup-con {
        transform: translate3d(0, 0, 0) rotateX(0deg);
      }

      .popup-animation-spring .popup-con {
        transform: scale(0);
        transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      }

      .popup-animation-spring.open .popup-con {
        transform: scale(1);
      }

      .popup-animation-zoomrotate .popup-con {
        transform: scale(0) rotate(45deg);
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-zoomrotate.open .popup-con {
        transform: scale(1) rotate(0deg);
      }

      .popup-animation-perspective {
        perspective: 600px;
      }

      .popup-animation-perspective .popup-con {
        transform: translateZ(-300px) rotateX(30deg);
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-perspective.open .popup-con {
        transform: translateZ(0) rotateX(0deg);
      }

      .popup-animation-origami .popup-con {
        transform: rotate(-90deg) scale(0.3) skewX(20deg);
        transform-origin: top left;
        transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-origami.open .popup-con {
        transform: rotate(0deg) scale(1) skewX(0deg);
      }

      @keyframes bounceIn {
        0% {
          transform: scale(0.3);
          opacity: 0;
        }
        50% {
          transform: scale(1.1);
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .popup-animation-bounce .popup-con {
        transform: scale(0.3);
        opacity: 0;
      }

      .popup-animation-bounce.open .popup-con {
        animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
      }

      .popup-animation-flip-x {
        perspective: 800px;
      }

      .popup-animation-flip-x .popup-con {
        transform: rotateX(180deg);
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-flip-x.open .popup-con {
        transform: rotateX(0deg);
      }

      .popup-animation-flip-ys {
        perspective: 800px;
      }

      .popup-animation-flip-ys .popup-con {
        transform: rotateY(180deg) scale(0.3);
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-flip-ys.open .popup-con {
        transform: rotateY(0deg) scale(1);
      }

      .popup-animation-convex {
        perspective: 800px;
      }

      .popup-animation-convex .popup-con {
        transform: scale(0.3) rotateX(20deg) rotateY(20deg);
        border-radius: 50%;
        opacity: 0;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 -20px 40px rgba(0, 0, 0, 0.1);
        transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-convex.open .popup-con {
        transform: scale(1) rotateX(0deg) rotateY(0deg);
        border-radius: 24px;
        opacity: 1;
      }

      .popup-animation-diagonal .popup-con {
        transform: translate3d(-100%, -100%, 0);
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-diagonal.open .popup-con {
        transform: translate3d(0, 0, 0);
      }

      .popup-animation-scalefade .popup-con {
        transform: scale(0.5);
        opacity: 0;
        transition: all 0.6s ease-out;
      }

      .popup-animation-scalefade.open .popup-con {
        transform: scale(1);
        opacity: 1;
      }

      .popup-animation-rotate360 .popup-con {
        transform: rotate(-360deg) scale(0);
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-rotate360.open .popup-con {
        transform: rotate(0deg) scale(1);
      }

      .popup-animation-blurin .popup-con {
        filter: blur(20px);
        opacity: 0;
        transition: all 0.6s ease-out;
      }

      .popup-animation-blurin.open .popup-con {
        filter: blur(0);
        opacity: 1;
      }

      .popup-animation-newspaper .popup-con {
        transform: scale(0) rotate(720deg);
        opacity: 0;
        transition: all 0.7s ease-out;
      }

      .popup-animation-newspaper.open .popup-con {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }

      .popup-animation-fall .popup-con {
        transform: translateY(-100vh);
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-fall.open .popup-con {
        transform: translateY(0);
      }

      .popup-animation-sidefall .popup-con {
        transform: translate3d(-100vw, -100vh, 0) rotate(-180deg);
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .popup-animation-sidefall.open .popup-con {
        transform: translate3d(0, 0, 0) rotate(0deg);
      }
    `
    const addStyle = eleStyleInit => {
      const fa = document.querySelector('title')
      const eleStyle = document.createElement('style')
      eleStyle.innerHTML = eleStyleInit
      document.head.insertBefore(eleStyle, fa)
    }
    addStyle(popCssRules)
  }

  /**
   * 创建弹窗元素。
   *
   * @param {string} popupId 弹窗元素的ID。
   * @returns {HTMLElement} 创建的弹窗元素。
   */
  createPopup(popupId) {
    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.id = popupId
    popup.style.display = 'none'

    const popupCon = document.createElement('div')
    popupCon.className = 'popup-con popup-bg'

    const popInfo = document.createElement('div')
    popInfo.className = 'pop-info'

    const popupClose = document.createElement('a')
    popupClose.className = 'popup-close'
    popupClose.href = 'javascript:;'
    // 点击关闭按钮时阻止事件冒泡，避免触发 document 的点击外部关闭逻辑
    popupClose.onclick = e => {
      e.stopPropagation()
      this.hidePopup(popupId)
    }

    popupCon.appendChild(popInfo)
    popupCon.appendChild(popupClose)
    popup.appendChild(popupCon)

    this.documentBody.appendChild(popup)

    return popup
  }

  /**
   * 显示指定ID的弹窗，并可选设置弹窗背景的颜色、透明度和动画效果。
   *
   * @param {string} popupId 弹窗元素的ID。
   * @param {HTMLElement} content 弹窗内容的DOM元素。
   * @param {string} [bgColor='rgba(0,0,0,.8)'] 弹窗背景的颜色。
   * @param {string} [animationType=null] 动画类型，对应SCSS中的后缀，如 'slide-left', 'flip-x' 等。
   */
  showPopup(popupId, content, bgColor = 'rgba(0,0,0,.8)', animationType = null) {
    let popup = document.getElementById(popupId)
    console.log('当前弹窗ID:', popupId)

    // 如果弹窗不存在，则自动创建
    if (!popup) {
      popup = this.createPopup(popupId)
    }

    // 1. 处理动画类名
    this.currentAnimationType = animationType
    // 重置基础类名
    popup.className = 'popup'
    if (animationType) {
      popup.classList.add(`popup-animation-${animationType}`)
    }

    // 2. 设置背景色
    popup.style.backgroundColor = bgColor

    // 3. 确保 open 类被移除（重置动画初始状态）
    popup.classList.remove('open')

    // 4. 将内容移入弹窗
    if (content) {
      this.originalParent = content.parentNode // 保存元素的原始父节点
      popup.querySelector('.pop-info').appendChild(content) // 将内容添加到弹窗中
    }

    // 5. 显示弹窗并触发动画
    requestAnimationFrame(() => {
      popup.style.display = 'flex'

      // 使用 setTimeout 确保浏览器完成重绘后再添加 open 类，从而触发 CSS transition/animation
      setTimeout(() => {
        popup.classList.add('open')
      }, 10)

      this.currentPopupId = popupId
      this.disableBodyScroll()
      this.documentBody.addEventListener('click', this.handleClickOutside.bind(this))
    })
  }

  /**
   * 隐藏当前显示的弹窗，并恢复页面滚动。
   */
  hidePopup(popupId = this.currentPopupId) {
    const popup = document.getElementById(popupId)
    if (popup) {
      // 1. 暂停视频
      const video = popup.querySelector('video')
      if (video) {
        video.pause()
      }

      // 2. 移除 open 类以触发 CSS 反向动画
      popup.classList.remove('open')

      // 3. 监听动画/过渡结束事件，结束后再隐藏 DOM 并清理
      const onAnimationEnd = () => {
        popup.style.display = 'none'

        // 将内容放回原位置
        const content = popup.querySelector('.pop-info').firstChild
        if (content && this.originalParent) {
          this.originalParent.appendChild(content)
        }

        this.enableBodyScroll()
        this.documentBody.removeEventListener('click', this.handleClickOutside.bind(this))
        this.currentPopupId = null

        // 清理事件监听，防止内存泄漏
        popup.removeEventListener('transitionend', onAnimationEnd)
        popup.removeEventListener('animationend', onAnimationEnd)
      }

      // 同时监听 transitionend 和 animationend，兼容不同类型的动画
      popup.addEventListener('transitionend', onAnimationEnd, { once: true })
      popup.addEventListener('animationend', onAnimationEnd, { once: true })
    } else {
      this.currentPopupId = null
      console.error(`Popup with id ${popupId} not found.`)
    }
  }

  /**
   * 处理点击页面的事件，用于判断是否点击在(.popup-con)元素外，以决定是否关闭弹窗。
   *
   * @param {MouseEvent} event 点击事件对象。
   */
  handleClickOutside = event => {
    const target = event.target
    const currentPopup = document.getElementById(this.currentPopupId)

    if (currentPopup) {
      const popupCon = currentPopup.querySelector('.popup-con')
      if (popupCon && !popupCon.contains(target)) {
        console.log('点击了弹窗外部')
        this.hidePopup() // 关闭当前弹窗
      } else if (target.tagName === 'VIDEO') {
        target.pause()
      }
    }
  }

  /**
   * 禁止页面滚动。
   */
  disableBodyScroll() {
    if (!this.isBodyScrollDisabled) {
      this.documentBody.style.position = 'relative'
      this.documentBody.style.overflow = 'hidden'
      this.documentBody.style.height = '100vh'
      this.isBodyScrollDisabled = true
    }
  }

  /**
   * 启用页面滚动。
   */
  enableBodyScroll() {
    if (this.isBodyScrollDisabled) {
      this.documentBody.style.position = 'relative'
      this.documentBody.style.overflow = 'auto'
      this.documentBody.style.height = 'auto'
      this.isBodyScrollDisabled = false
    }
  }
}

// 导出全局变量
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCPopup
} else {
  window.DC = window.DC || {}
  window.DC.Popup = DCPopup
}
