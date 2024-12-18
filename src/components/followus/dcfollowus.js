// followUs.js
class FollowUsSDK {
  constructor(config) {
    this.config = config;
    this.insertStyles();
    this.init();
  }
  
  /**
   * 插入样式
   */
  insertStyles() {
    const followCssRules = `
      @media screen and (min-width: 1025px) {
        .follow-us {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 20px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center
        }
        .follow-us .follow-item {
          display: inline-flex;
          text-decoration: none;
          font-size: 18px;
          width: 60px;
          height: 60px;
          color: #fff;
          justify-content: center;
          align-items: center;
          position: relative;
          margin: 0 16px
        }
        .follow-us .follow-item::before {
          content: '';
          position: absolute;
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #22a6b3, #30336b);
          border-radius: 50%;
          z-index: -1;
          transition: 0.3s ease-in
        }
        .follow-us .follow-item:hover::before {
          transform: scale(0)
        }
        .follow-us .follow-item:hover i {
          background: linear-gradient(45deg, #22a6b3, #30336b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transform: scale(2.2)
        }
        .follow-us .follow-item:hover i .icon {
          display: block;
          width: 100%;
          height: 100%
        }
        .follow-us .follow-item:hover i .icon path {
          fill: #000
        }
        .follow-us .follow-item:hover .follow-hover {
          display: flex
        }
        .follow-us .follow-item i {
          width: 32px;
          height: 32px;
          transition: 0.3s ease-in
        }
        .follow-us .follow-item i .icon {
          display: block;
          width: 100%;
          height: 100%
        }
        .follow-us .follow-item i .icon path {
          fill: #fff
        }
        .follow-us .follow-item .follow-text {
          font-size: 14px;
          text-align: center;
          color: #fff;
          position: absolute;
          top: 66px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2
        }
        .follow-us .follow-item .follow-hover {
          display: none;
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          width: 160px;
          height: 120px;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          text-align: center;
          color: #fff;
          background: #22a6b3;
          border-radius: 8px
        }
      }
      @media screen and (max-width: 1024px) {
        .follow-us {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 20px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center
        }
        .follow-us .follow-item {
          display: inline-flex;
          text-decoration: none;
          font-size: 18px;
          width: 60px;
          height: 60px;
          color: #fff;
          justify-content: center;
          align-items: center;
          position: relative;
          margin: 0 16px
        }
        .follow-us .follow-item::before {
          content: '';
          position: absolute;
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #22a6b3, #30336b);
          border-radius: 50%;
          z-index: -1;
          transition: 0.3s ease-in
        }
        .follow-us .follow-item:hover::before {
          transform: scale(0)
        }
        .follow-us .follow-item:hover i {
          background: linear-gradient(45deg, #22a6b3, #30336b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transform: scale(2.2)
        }
        .follow-us .follow-item:hover i .icon {
          display: block;
          width: 100%;
          height: 100%
        }
        .follow-us .follow-item:hover i .icon path {
          fill: #000
        }
        .follow-us .follow-item:hover .follow-hover {
          display: flex
        }
        .follow-us .follow-item i {
          width: 32px;
          height: 32px;
          transition: 0.3s ease-in
        }
        .follow-us .follow-item i .icon {
          display: block;
          width: 100%;
          height: 100%
        }
        .follow-us .follow-item i .icon path {
          fill: #fff
        }
        .follow-us .follow-item .follow-text {
          font-size: 14px;
          text-align: center;
          color: #fff;
          position: absolute;
          top: 66px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2
        }
        .follow-us .follow-item .follow-hover {
          display: none;
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          width: 160px;
          height: 120px;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          text-align: center;
          color: #fff;
          background: #22a6b3;
          border-radius: 8px
        }
      }
    `;
    
    /**
     * 插入<style>标签样式到<title>标签前
     * @param {string} eleStyleInit - 样式字符串
     * 
    */
    const addStyle = (eleStyleInit) => {
      const fa = document.querySelector('title');
      const eleStyle = document.createElement('style');
      eleStyle.innerHTML = eleStyleInit;
      document.head.insertBefore(eleStyle, fa);
    };
    addStyle(followCssRules);
  }
  
  // 生成 HTML 结构
  generateHTML() {
    const container = document.createElement('div');
    container.className = 'follow-us';
    this.config.items.forEach(item => {
      const link = document.createElement('a');
      link.href = item.link;
      link.className = 'follow-item';
      link.setAttribute('data-hover', item.text);
      const icon = document.createElement('i');
      icon.className = item.iconName;
      icon.innerHTML = item.icon;
      const text = document.createElement('span');
      text.className = 'follow-text';
      text.innerHTML = item.text;
      link.appendChild(icon);
      link.appendChild(text);
      const hoverElement = document.createElement('span');
      hoverElement.className = 'follow-hover';
      hoverElement.textContent = item.hoverText;
      hoverElement.style.display = 'none'; // 默认隐藏
      link.appendChild(hoverElement);
      container.appendChild(link);
    });
    return container;
  }
  
  // 添加事件监听器
  addEventListeners() {
    const items = document.querySelectorAll('.follow-item');
    items.forEach(item => {
      item.addEventListener('mouseover', () => {
        const hoverElement = item.querySelector('.follow-hover');
        hoverElement.style.display = 'flex';
      });
      item.addEventListener('mouseout', () => {
        const hoverElement = item.querySelector('.follow-hover');
        hoverElement.style.display = 'none';
      });
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const hoverElement = item.querySelector('.follow-hover');
        hoverElement.style.display = 'flex';
      });
    });
  }
  
  // 初始化 SDK
  init() {
    const container = this.generateHTML();
    document.body.appendChild(container);
    this.addEventListeners();
  }
}
// 配置对象
// const config = {
//   items: [
//     { link: 'https://www.facebook.com', text: 'Facebook', hoverText: 'Facebook hover text', iconName: 'icon-facebook', icon: '<svg class="icon icon_facebook" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M512 0C229.12 0 0 229.12 0 512s229.12 512 512 512 512-229.12 512-512-229.12-512-512-512z m0 949.76c-241.28 0-437.76-196.48-437.76-437.76S270.72 74.24 512 74.24 949.76 270.72 949.76 512 753.28 949.76 512 949.76zM434.56 354.56v59.52h-60.16V512h60.16v295.68h97.28V512h97.28l15.36-97.92H531.84V364.8c0-25.6 8.32-49.92 44.8-49.92h72.96V216.96H545.92c-87.68 0-111.36 57.6-111.36 137.6z" /></svg>'},
//     { link: 'https://www.twitter.com', text: 'Twitter', hoverText: 'Twitter hover text', iconName: 'icon-twitter', icon: '<svg class="icon icon_twitter" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M778.410667 96h141.141333l-308.352 352.426667 362.752 479.573333H689.92l-222.464-290.858667L212.906667 928H71.68l329.813333-376.96L53.504 96H344.746667l201.088 265.856 232.576-265.856z m-49.536 747.52h78.208L302.250667 176.042667H218.325333L728.874667 843.52z"  /></svg>'},
//     { link: 'https://www.instagram.com', text: 'Instagram', hoverText: 'Instagram hover text', iconName: 'icon-instagram', icon: '<svg class="icon icon_instagram" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M1020.416 301.568a373.76 373.76 0 0 0-24.064-124.416 240.128 240.128 0 0 0-58.368-91.136A250.368 250.368 0 0 0 847.36 27.648a374.784 374.784 0 0 0-123.904-24.064C668.672 0 651.264 0 512 0 373.76 0 358.4 0 301.568 3.072a373.76 373.76 0 0 0-123.904 24.064 249.344 249.344 0 0 0-91.136 58.88A250.368 250.368 0 0 0 27.648 176.64a374.784 374.784 0 0 0-24.064 123.904C0 355.84 0 373.248 0 512s0 156.672 3.072 210.944a373.76 373.76 0 0 0 24.064 124.416 249.856 249.856 0 0 0 59.392 90.624 250.368 250.368 0 0 0 90.112 58.88 375.296 375.296 0 0 0 124.416 24.064C358.4 1024 373.248 1024 512 1024s156.672 0 210.944-3.072a373.76 373.76 0 0 0 124.416-24.064 262.656 262.656 0 0 0 149.504-149.504 374.784 374.784 0 0 0 24.064-124.416c0-54.784 3.072-72.192 3.072-210.944s0-153.6-3.584-210.432zM929.28 716.8a280.576 280.576 0 0 1-17.408 95.232 158.208 158.208 0 0 1-38.4 58.368 160.768 160.768 0 0 1-58.88 38.4 282.112 282.112 0 0 1-95.232 17.408c-54.272 0-70.144 3.072-204.8 3.072s-153.6 0-204.8-3.072a280.576 280.576 0 0 1-95.232-17.408A158.208 158.208 0 0 1 153.6 870.4a160.768 160.768 0 0 1-38.4-58.88A281.6 281.6 0 0 1 96.256 716.8c0-54.272-3.072-70.144-3.072-204.8s0-153.6 3.072-204.8a280.576 280.576 0 0 1 17.408-97.28A158.72 158.72 0 0 1 153.6 153.6a160.256 160.256 0 0 1 57.344-40.96A282.112 282.112 0 0 1 307.2 95.232c53.76 0 70.144-3.072 204.8-3.072s153.6 0 204.8 3.072a280.064 280.064 0 0 1 95.232 17.408 158.208 158.208 0 0 1 58.88 38.4 160.768 160.768 0 0 1 38.4 58.88 282.112 282.112 0 0 1 19.968 97.28c0 54.272 3.072 70.144 3.072 204.8s-0.512 153.6-3.072 204.8z"  /><path fill="#000000" d="M786.432 238.592m-61.44 0a61.44 61.44 0 1 0 122.88 0 61.44 61.44 0 1 0-122.88 0Z"  /><path fill="#000000" d="M512 248.832A263.168 263.168 0 1 0 776.192 512 263.168 263.168 0 0 0 512 248.832z m0 433.664A170.496 170.496 0 1 1 683.52 512 170.496 170.496 0 0 1 512 682.496z"  /></svg>'},
//     { link: 'https://www.youtube.com', text: 'YouTube', hoverText: 'YouTube hover text', iconName: 'icon-youtube', icon: '<svg class="icon icon_youtobe" width="100%" height="100%" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M435.774439 640.374634l230.17522-110.791805-230.17522-110.891707z"  /><path fill="#000000" d="M512.499512 0.999024C230.075317 0.999024 0.999024 229.975415 0.999024 512.499512s228.97639 511.500488 511.500488 511.500488 511.500488-228.97639 511.500488-511.500488S795.02361 0.999024 512.499512 0.999024z m306.900293 641.173854c0 93.908293-78.423415 106.995512-102.4 108.793756l-6.793366 0.299707H311.395902c-96.505756 0-104.997463-90.91122-105.69678-106.695804l-0.099902-227.577757c0-100.002341 88.813268-108.294244 103.598829-108.99356l1.198829-0.099903h403.306146c90.211902 0 103.498927 79.322537 105.397074 102.699707l0.299707 6.393756v225.180098z"  /></svg>'},
//     { link: 'https://www.google.com', text: 'Google', hoverText: 'Google hover text', iconName: 'icon-google', icon: '<svg class="icon icon_google" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M481.672533 635.306667V404.053333h531.2l5.717334 38.826667c3.498667 23.594667 5.290667 47.445333 5.418666 71.338667C1024.008533 795.392 794.333867 1024 511.880533 1024 166.152533 1024-83.0208 690.773333 25.821867 349.866667 92.040533 142.506667 291.421867 0 511.9232 0c114.133333 0 216.192 34.56 304.512 103.296l32 24.917333-122.282667 199.978667-38.741333-22.528C614.237867 263.04 555.101867 242.346667 512.4352 242.346667a271.701333 271.701333 0 0 0-267.690667 266.410666A269.184 269.184 0 0 0 320.861867 702.72a271.530667 271.530667 0 0 0 191.018666 83.498667 272.64 272.64 0 0 0 244.48-150.869334H481.7152z m245.504-483.626667c-64-40.618667-135.381333-60.757333-215.253333-60.757333-181.077333 0-345.002667 117.205333-399.018667 286.464-90.026667 281.941333 114.688 555.690667 398.933334 555.690666 232.021333 0 420.821333-187.946667 420.821333-418.645333 0-6.485333-0.213333-12.970667-0.554667-19.456H573.021867v49.408h312.405333l-19.626667 59.605333-7.722666 23.466667c-49.28 149.205333-188.416 249.557333-347.093334 249.6a363.605333 363.605333 0 0 1-256-111.402667 359.850667 359.850667 0 0 1-101.546666-258.645333c3.925333-195.370667 160.938667-351.616 358.058666-355.541333 52.821333 0 113.450667 18.304 182.741334 54.101333l32.938666-53.888z"  /></svg>'},
//     { link: '', test: "QQ", hoverText: '官方QQ群', icon: ''},
//     { link: '', test: "WeChat", hoverText: '官网微信公众', icon: ''},
//     { link: '', test: "Weibo", hoverText: '官方微博', icon: ''},
//     { link: '', test: "抖音", hoverText: '官方抖音账号', icon: ''},
//     { link: '', test: "bilibili", hoverText: '官网B站账号', icon: ''},
//     { link: '', test: "小红书", hoverText: '官方小红书账号', icon: ''}
//   ]
// };
// 初始化 SDK
// const followUsSDK = new FollowUsSDK(config);
