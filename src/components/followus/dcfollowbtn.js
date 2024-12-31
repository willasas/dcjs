class DCFollowBtn {
  /**
   * 构造函数
   *
   * @param {Object} options - 配置选项对象，包含初始化时所需的各种设置
   * @param {Array} [options.followData] - 关注数据数组，用于存储关注信息，默认为空数组
   */
  constructor(options) {
    this.options = options; // 保存配置选项
    // 初始化关注数据，如果options中没有提供，则使用空数组作为默认值
    this.followData = options.followData || [];
    this.init(); // 调用init方法进行初始化
  }

  /**
   * 初始化函数
   *
   * 本函数负责初始化过程中的核心操作，包括创建CSS样式和首次渲染
   * 它在对象或应用的启动阶段被调用，确保所有视觉元素和样式正确加载和应用
   */
  init() {
    this.createCss(); // 创建必要的CSS样式，确保界面样式的一致性和正确性
    this.render();    // 执行首次渲染，将界面元素呈现到页面上
  }

  // 创建必要的CSS样式
  createCss() {
    document.head.innerHTML += `
      <style>
        .follow-btn {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background-color: transparent;
          position: relative;
          padding: 0;
          border-radius: 8px;
          cursor: pointer;
          transition: all .3s;
        }

        .follow-btn:hover .follow-bg {
          transform: rotate(35deg);
          transform-origin: bottom;
        }

        .follow-btn:hover .svg-container {
          background-color: var(--bg-theme-200);
          backdrop-filter: blur(4px);
        }

        .svg-container{
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          backdrop-filter: blur(0px);
          letter-spacing: 0.8px;
          border-radius: 10px;
          transition: all .3s;
          width: 100%;
          height: 100%;
          border: 1px solid var(--bg-theme-200);
        }

        .svg-container svg{
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .svg-container svg path{
          fill: white;
        }

        .follow-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--bg-theme-900);
          z-index: -1;
          border-radius: 10px;
          pointer-events: none;
          transition: all .3s;
        }

        .follow-text {
          font-size: 16px;
          line-height: 1.2;
          text-align: center;
          color: var(--font-theme-50);
          margin: 0 auto;
          position: absolute;
          bottom: -18px;
        }
      </style>
    `;
  }

  /**
   * 渲染关注按钮
   *
   * 此函数负责根据followData数据在页面上渲染关注按钮每个按钮由图标、背景和文本组成
   * 它通过创建相应的HTML元素并将它们添加到目标元素中来实现这一点
   */
  render() {
    // 清空目标元素的内容，以便重新渲染
    this.options.targetElement.innerHTML = '';

    // 遍历关注数据数组，为每个项目创建一个关注按钮
    this.followData.forEach(item => {
      // 创建按钮元素
      const button = document.createElement('button');
      button.className = 'follow-btn';

      // 创建svg容器元素
      const svgContainer = document.createElement('a');
      svgContainer.className = 'svg-container';
      svgContainer.href = item.url;
      svgContainer.innerHTML = item.icon;

      // 创建背景元素
      const followBg = document.createElement('span');
      followBg.className = 'follow-bg';

      // 创建文本元素
      const followText = document.createElement('span');
      followText.className = 'follow-text';
      followText.textContent = item.name;

      // 将所有子元素添加到按钮中
      button.appendChild(svgContainer);
      button.appendChild(followBg);
      button.appendChild(followText);

      // 将按钮添加到目标元素中
      this.options.targetElement.appendChild(button);
    });
  }

  /**
   * 向关注数据数组中添加新的数据
   *
   * @param {Object} newData - 新的关注数据对象
   */
  addFollowData(newData) {
    // 将新的关注数据添加到关注数据数组的末尾
    this.followData.push(newData);

    // 重新渲染关注数据，以在界面上显示新增的数据
    this.render();
  }
}

const followData = [
  {
    name: "Github",
    url: "https://github.com/",
    icon: "<svg viewBox='0 0 496 512' height='1.6em' xmlns='http://www.w3.org/2000/svg' class='svgIcon' fill='white'><path d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'></path></svg>",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: "<svg viewBox='0 0 448 512' height='1.6em' xmlns='http://www.w3.org/2000/svg' class='svgIcon' fill='white'><path d='M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z'></path></svg>",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon:"<svg viewBox='0 0 320 512' height='1.3em' xmlns='http://www.w3.org/2000/svg' class='svgIcon' fill='white'><path d='M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z'></path></svg>",
  },
  {
    name: "x",
    url: "https://x.com/",
    icon:"<svg viewBox='0 0 512 512' height='1.7em' xmlns='http://www.w3.org/2000/svg' class='svgIcon' fill='white'><path d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z'></path></svg>",
  },
  {
    name: "Youtube",
    url: "https://youtube.com/",
    icon:"<svg viewBox='0 0 576 512' height='1.6em' xmlns='http://www.w3.org/2000/svg' class='svgIcon' fill='white'><path d='M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z'></path></svg>",
  },
  {
    name: "Telegram",
    url: "https://telegram.org/",
    icon:"<svg viewBox='0 0 512 512' height='1.7em' xmlns='http://www.w3.org/2000/svg' class='svgIcon' fill='white'><path d='M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z'></path></svg>",
  },
  {
    name: "Discord",
    url: "https://discord.com/",
    icon:"<svg viewBox='0 0 640 512' height='1.7em' xmlns='http://www.w3.org/2000/svg' class='svgIcon' fill='white'><path d='M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z'></path></svg>",
  },
]

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCFollowBtn;
} else {
  window.DC = window.DC || {};
  window.DC.FollowBtn = DCFollowBtn;
}