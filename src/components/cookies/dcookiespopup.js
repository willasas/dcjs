class DCookiesPopup {
  constructor(options = {}) {
    this.title = options.title || 'Cookie Preferences';
    this.description = options.description || 'We use optional cookies to improve your experience on our websites, such as through social media connections, and to display personalized advertising based on your online activity. If you reject optional cookies, only cookies necessary to provide you the services will be used. You may change your selection by clicking "Manage Cookies" at the bottom of the page.';
    this.privacyLink = options.privacyLink || 'privacy.html';
    this.cookiesLink = options.cookiesLink || 'cookie.html';
    this.acceptText = options.acceptText || 'Accept';
    this.rejectText = options.rejectText || 'Reject';
    this.manageText = options.manageText || 'Manage Cookies';
    this.containerSelector = options.containerSelector || 'body'; // 默认容器为 body
    this.customClass = options.customClass || ''; // 自定义样式类名
    this.container = document.createElement('div');
    this.container.className = `popup-cookies ${this.customClass}`;
    this.container.id = 'popup-cookies';
  }

  init() {
    this.render();
    this.createStyle();
    this.addEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="popup-container">
        <!-- cookies-content -->
        <div class="cookies-content">
          <h3 class="cookies-title">${this.title}</h3>
          <p class="cookies-text">
            ${this.description}
            <a target="_blank" href="${this.privacyLink}" class="cookies-link">Privacy Statement</a>
            <a target="_blank" href="${this.cookiesLink}" class="cookies-link">Third-Party Cookies</a>
          </p>
        </div>
        <!-- cookies-btns -->
        <div class="cookies-btns">
          <button type="button" class="cookies-btn" id="cookies-accept-btn"><span>${this.acceptText}</span></button>
          <button type="button" class="cookies-btn" id="cookies-reject-btn"><span>${this.rejectText}</span></button>
          <button type="button" class="cookies-btn" id="cookies-manage-btn"><span>${this.manageText}</span></button>
        </div>
        <!-- close button -->
        <button type="button" class="cookies-close-btn" id="cookies-close-btn">
          <svg class="icon icon_close" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 42L33 33M6 6L15 15L6 6Z" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M6 42L15 33M42 6L33 15L42 6Z" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>
        </button>
      </div>
    `;

    const targetContainer = document.querySelector(this.containerSelector);
    if (targetContainer) {
      targetContainer.appendChild(this.container);
    } else {
      console.error(`Container with selector "${this.containerSelector}" not found.`);
    }
  }

  createStyle() {
    const cssRules = `
      .popup-cookies { display: block; box-sizing: border-box; padding: 20px 20px; position: fixed; bottom: 0; left: 0; overflow-x: visible; background: var(--bg-theme-50); width: 100%; height: auto; box-shadow: 0px 0px 2.5px rgba(0, 0, 0, 0.12), 0px 0px 7px rgba(0, 0, 0, 0.14), 0px 0px 16.9px rgba(0, 0, 0, 0.15), 0px 0px 56px rgba(0, 0, 0, 0.17); background-image: radial-gradient(currentColor 2px, transparent 2px), radial-gradient(currentColor 2px, transparent 2px); background-size: calc(20 * 2px) calc(20 * 2px); background-position: 0 0, calc(10 * 2px) calc(10 * 2px); color: rgba(255, 255, 255, 0.2) !important; }
      .popup-cookies .popup-container { position: relative; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; max-width: 1800px; }
      .popup-cookies .popup-container .cookies-content { overflow-x: visible; max-width: 1200px; min-width: 540px; }
      .popup-cookies .popup-container .cookies-content .cookies-title { margin: 0; font-size: 22px; line-height: 1.2; text-align: left; color: var(--font-theme-800); }
      .popup-cookies .popup-container .cookies-content .cookies-text { font-size: 16px; line-height: 1.2; text-align: left; color: var(--font-theme-600); }
      .popup-cookies .popup-container .cookies-content .cookies-text .cookies-link { color: var(--font-theme-800); }
      .popup-cookies .popup-container .cookies-btns { display: flex; justify-content: space-between; align-items: center; max-width: 560px; width: 100%; min-width: 400px; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn { min-width: 130px; height: 40px; color: var(--font-theme-200); font-family: 'Lato', sans-serif; font-weight: 500; text-transform: uppercase; background: transparent; cursor: pointer; transition: all 0.3s ease; position: relative; display: inline-block; box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.4), inset -2px -2px 5px rgba(0, 0, 0, 0.1); outline: none; background-color: var(--font-theme-200); background-image: linear-gradient(315deg, var(--bg-theme-200) 1%, var(--bg-theme-800) 60%); line-height: 42px; padding: 0; border: none; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn::before, .popup-cookies .popup-container .cookies-btns .cookies-btn::after { position: absolute; content: ""; right: 0; bottom: 0; background: var(--bg-theme-500); transition: all 0.3s ease; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn::before { height: 0%; width: 2px; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn::after { width: 0%; height: 2px; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn:hover:before { height: 100%; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn:hover:after { width: 100%; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn:hover { background: transparent; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn span { position: relative; display: block; width: 100%; height: 100%; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn span:hover { color: var(--bg-theme-700); }
      .popup-cookies .popup-container .cookies-btns .cookies-btn span:hover::before { height: 100%; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn span:hover::after { width: 100%; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn span::before, .popup-cookies .popup-container .cookies-btns .cookies-btn span::after { position: absolute; content: ""; left: 0; top: 0; background: var(--bg-theme-500); }
      .popup-cookies .popup-container .cookies-btns .cookies-btn span::before { width: 2px; height: 0%; }
      .popup-cookies .popup-container .cookies-btns .cookies-btn span::after { height: 2px; width: 0%; }
      .popup-cookies .popup-container .cookies-close-btn { position: absolute; top: -10px; right: -116px; background: none; border: none; width: 32px; height: 32px; cursor: pointer; }
      .popup-cookies .popup-container .cookies-close-btn .icon_close path { stroke: var(--bg-theme-700); }

      @media screen and (max-width: 1024px) { .popup-cookies { padding: 20px 12px; }
        .popup-cookies .popup-container { justify-content: center; flex-wrap: wrap; flex-direction: column; }
        .popup-cookies .popup-container .cookies-content { width: 100%; max-width: max-content; min-width: min-content; }
        .popup-cookies .popup-container .cookies-btns { justify-content: center; flex-wrap: wrap; flex-direction: column; margin-top: 10px; width: 100%; min-width: max-content; gap: 10px; }
        .popup-cookies .popup-container .cookies-btns .cookies-btn { width: 100%; }
        .popup-cookies .popup-container .cookies-close-btn { top: 0; right: 0; }
      }
    `;
    const style = document.createElement('style');
    style.innerHTML = cssRules;
    document.head.appendChild(style);
  }

  addEventListeners() {
    document.getElementById('cookies-accept-btn').addEventListener('click', () => this.hide());
    document.getElementById('cookies-reject-btn').addEventListener('click', () => this.hide());
    document.getElementById('cookies-close-btn').addEventListener('click', () => this.hide());
  }

  show() {
    this.container.style.display = 'block';
  }

  hide() {
    this.container.style.display = 'none';
  }
}

// 导出到全局
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCookiesPopup;
} else {
  window.DC = window.DC || {};
  window.DC.CookiesPopup = DCookiesPopup;
}