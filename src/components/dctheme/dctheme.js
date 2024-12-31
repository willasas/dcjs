/**
 * DCTheme 主题切换组件类
 * @class DCTheme
 * @description 一个简单的JavaScript主题切换组件，支持多种主题切换，支持自定义主题
 */
class DCTheme {
    /**
     * @private
     * @description 默认配置
     * @type {Object}
     */
    defaultConfig = {
      // 容器元素,不传则默认添加到body
      container: null,
      // 主题列表
      themes: [
        { name: 'light-theme', value: 'light' },
        { name: 'dark-theme', value: 'dark' },
        { name: 'grey-theme', value: 'grey' },
        { name: 'red-theme', value: 'red' },
        { name: 'pink-theme', value: 'pink' },
        { name: 'orange-theme', value: 'orange' },
        { name: 'yellow-theme', value: 'yellow' },
        { name: 'green-theme', value: 'green' },
        { name: 'indigo-theme', value: 'indigo' },
        { name: 'blue-theme', value: 'blue' },
        { name: 'purple-theme', value: 'purple' },
        { name: 'colorful-theme', value: 'colorful' }
      ],
      defaultTheme: 'light-theme', // 默认主题
      onThemeChange: null // 主题切换回调
    };

    /**
     * @private
     * @description 组件DOM结构
     * @type {Object}
     */
    template = {
      container: '<div class="theme-container"></div>',
      inner: '<div class="theme-inner"></div>',
      switch: '<a class="theme-switch" href="javascript:;"></a>',
      iconUp: '<svg class="icon icon_up" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 30L25 18L37 30" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>',
      iconDown: '<svg class="icon icon_down" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 18L24 30L12 18" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>'
    };

    /**
     * 创建主题切换实例
     * @constructor
     * @param {Object} options - 配置选项
     */
    constructor(options = {}) {
      this.config = { ...this.defaultConfig, ...options };
      this.isThemeContainerVisible = true;
      this.init();
    }

    /**
     * 初始化主题组件
     * @private
     */
    init() {
      this.createElements();
      this.createStyle();
      this.initDefaultTheme();
      this.bindEvents();
    }

    /**
     * 创建样式
     * @private
     */
    createStyle() {
      const themeCssRules = `
        @charset "UTF-8";
        [data-theme=light-theme] { --color-primary-border: #fdf9f5; --color-primary: #fdf9f5; --color-primary-font: #000; --color-primary-bg: #fdf9f5; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #fafafa; --bg-theme-100: #f4f4f5; --bg-theme-200: #e4e4e7; --bg-theme-300: #d4d4d8; --bg-theme-400: #a1a1aa; --bg-theme-500: #71717a; --bg-theme-600: #52525b; --bg-theme-700: #3f3f46; --bg-theme-800: #27272a; --bg-theme-900: #18181b; --bg-theme-950: #09090b; --font-theme-50: #fafafa; --font-theme-100: #f0f0f0; --font-theme-200: gainsboro; --font-theme-300: #c8c8c8; --font-theme-400: #b4b4b4; --font-theme-500: #a0a0a0; --font-theme-600: #8c8c8c; --font-theme-700: #787878; --font-theme-800: #646464; --font-theme-900: #505050; --font-theme-950: #3c3c3c; --bg-theme-gradient: linear-gradient(to left, #FFFFFF, #FFEFBA); }
        [data-theme=dark-theme] { --color-primary-border: #030303; --color-primary: #030303; --color-primary-font: #fff; --color-primary-bg: #030303; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #fafafa; --bg-theme-100: whitesmoke; --bg-theme-200: #e5e5e5; --bg-theme-300: #d4d4d4; --bg-theme-400: #a3a3a3; --bg-theme-500: #737373; --bg-theme-600: #525252; --bg-theme-700: #404040; --bg-theme-800: #262626; --bg-theme-900: #171717; --bg-theme-950: #0a0a0a; --font-theme-50: #fafafa; --font-theme-100: #f5f5f5; --font-theme-200: #e5e5e5; --font-theme-300: #d4d4d4; --font-theme-400: #a3a3a3; --font-theme-500: #737373; --font-theme-600: #525252; --font-theme-700: #404040; --font-theme-800: #262626; --font-theme-900: #171717; --font-theme-950: #0a0a0a; --bg-theme-gradient: linear-gradient(to left, #000000, #434343); }
        [data-theme=grey-theme] { --color-primary-border: #323535; --color-primary: #323535; --color-primary-font: #323535; --color-primary-bg: #323535; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #f9fafb; --bg-theme-100: #f3f4f6; --bg-theme-200: #e5e7eb; --bg-theme-300: #d1d5db; --bg-theme-400: #9ca3af; --bg-theme-500: #6b7280; --bg-theme-600: #4b5563; --bg-theme-700: #374151; --bg-theme-800: #1f2937; --bg-theme-900: #111827; --bg-theme-950: #030712; --font-theme-50: #f9fafb; --font-theme-100: #f3f4f6; --font-theme-200: #e5e7eb; --font-theme-300: #d1d5db; --font-theme-400: #9ca3af; --font-theme-500: #6b7280; --font-theme-600: #4b5563; --font-theme-700: #374151; --font-theme-800: #1f2937; --font-theme-900: #111827; --font-theme-950: #030712; --bg-theme-gradient: linear-gradient(to left, #232526, #414345); }
        [data-theme=red-theme] { --color-primary-border: #ff0000; --color-primary: #ff0000; --color-primary-font: #ff0000; --color-primary-bg: #ff0000; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #fef2f2; --bg-theme-100: #fee2e2; --bg-theme-200: #fecaca; --bg-theme-300: #fca5a5; --bg-theme-400: #f87171; --bg-theme-500: #ef4444; --bg-theme-600: #dc2626; --bg-theme-700: #b91c1c; --bg-theme-800: #991b1b; --bg-theme-900: #7f1d1d; --bg-theme-950: #450a0a; --font-theme-50: #fef2f2; --font-theme-100: #fee2e2; --font-theme-200: #fecaca; --font-theme-300: #fca5a5; --font-theme-400: #f87171; --font-theme-500: #ef4444; --font-theme-600: #dc2626; --font-theme-700: #b91c1c; --font-theme-800: #991b1b; --font-theme-900: #7f1d1d; --font-theme-950: #450a0a; --bg-theme-gradient: linear-gradient(to left, #d31027, #ea384d); }
        [data-theme=pink-theme] { --color-primary-border: #ff006a; --color-primary: #ff006a; --color-primary-font: #ff006a; --color-primary-bg: #ff006a; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #fdf2f8; --bg-theme-100: #fce7f3; --bg-theme-200: #fbcfe8; --bg-theme-300: #f9a8d4; --bg-theme-400: #f472b6; --bg-theme-500: #ec4899; --bg-theme-600: #db2777; --bg-theme-700: #be185d; --bg-theme-800: #9d174d; --bg-theme-900: #831843; --bg-theme-950: #500724; --font-theme-50: #fdf2f8; --font-theme-100: #ffe4e6; --font-theme-200: #fecdd3; --font-theme-300: #fda4af; --font-theme-400: #fb7185; --font-theme-500: #f43f5e; --font-theme-600: #e11d48; --font-theme-700: #be123c; --font-theme-800: #9f1239; --font-theme-900: #881337; --font-theme-950: #4c0519; --bg-theme-gradient: linear-gradient(to left, #ec008c, #fc6767); }
        [data-theme=orange-theme] { --color-primary-border: #fa7900; --color-primary: #fa7900; --color-primary-font: #fa7900; --color-primary-bg: #fa7900; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #fff7ed; --bg-theme-100: #ffedd5; --bg-theme-200: #fed7aa; --bg-theme-300: #fdba74; --bg-theme-400: #fb923c; --bg-theme-500: #f97316; --bg-theme-600: #ea580c; --bg-theme-700: #c2410c; --bg-theme-800: #9a3412; --bg-theme-900: #7c2d12; --bg-theme-950: #431407; --font-theme-50: #fff7ed; --font-theme-100: #ffedd5; --font-theme-200: #fed7aa; --font-theme-300: #fdba74; --font-theme-400: #fb923c; --font-theme-500: #f97316; --font-theme-600: #ea580c; --font-theme-700: #c2410c; --font-theme-800: #9a3412; --font-theme-900: #7c2d12; --font-theme-950: #431407; --bg-theme-gradient: linear-gradient(to left, #ff8008, #ffc837); }
        [data-theme=yellow-theme] { --color-primary-border: #faf600; --color-primary: #faf600; --color-primary-font: #faf600; --color-primary-bg: #faf600; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #fefce8; --bg-theme-100: #fef9c3; --bg-theme-200: #fef08a; --bg-theme-300: #fde047; --bg-theme-400: #facc15; --bg-theme-500: #eab308; --bg-theme-600: #ca8a04; --bg-theme-700: #a16207; --bg-theme-800: #854d0e; --bg-theme-900: #713f12; --bg-theme-950: #422006; --font-theme-50: #fefce8; --font-theme-100: #fef9c3; --font-theme-200: #fef08a; --font-theme-300: #fde047; --font-theme-400: #facc15; --font-theme-500: #eab308; --font-theme-600: #ca8a04; --font-theme-700: #a16207; --font-theme-800: #854d0e; --font-theme-900: #713f12; --font-theme-950: #422006; --bg-theme-gradient: linear-gradient(to left, #f7971e, #ffd200); }
        [data-theme=green-theme] { --color-primary-border: #03fa41; --color-primary: #03fa41; --color-primary-font: #03fa41; --color-primary-bg: #03fa41; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #f0fdf4; --bg-theme-100: #dcfce7; --bg-theme-200: #bbf7d0; --bg-theme-300: #86efac; --bg-theme-400: #4ade80; --bg-theme-500: #22c55e; --bg-theme-600: #16a34a; --bg-theme-700: #15803d; --bg-theme-800: #166534; --bg-theme-900: #14532d; --bg-theme-950: #052e16; --font-theme-50: #f0fdf4; --font-theme-100: #dcfce7; --font-theme-200: #bbf7d0; --font-theme-300: #86efac; --font-theme-400: #4ade80; --font-theme-500: #22c55e; --font-theme-600: #16a34a; --font-theme-700: #15803d; --font-theme-800: #166534; --font-theme-900: #14532d; --font-theme-950: #052e16; --bg-theme-gradient: linear-gradient(to left, #56ab2f, #a8e063); }
        [data-theme=indigo-theme] { --color-primary-border: #03f7ff; --color-primary: #03f7ff; --color-primary-font: #03f7ff; --color-primary-bg: #03f7ff; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #f0fdfa; --bg-theme-100: #ccfbf1; --bg-theme-200: #99f6e4; --bg-theme-300: #5eead4; --bg-theme-400: #2dd4bf; --bg-theme-500: #14b8a6; --bg-theme-600: #0d9488; --bg-theme-700: #0f766e; --bg-theme-800: #115e59; --bg-theme-900: #134e4a; --bg-theme-950: #042f2e; --font-theme-50: #ecfeff; --font-theme-100: #cffafe; --font-theme-200: #a5f3fc; --font-theme-300: #67e8f9; --font-theme-400: #22d3ee; --font-theme-500: #06b6d4; --font-theme-600: #0891b2; --font-theme-700: #0e7490; --font-theme-800: #155e75; --font-theme-900: #164e63; --font-theme-950: #083344; --bg-theme-gradient: linear-gradient(to left, #00c9ff, #92fe9d); }
        [data-theme=blue-theme] { --color-primary-border: #0905f3; --color-primary: #0905f3; --color-primary-font: #0905f3; --color-primary-bg: #0905f3; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #eff6ff; --bg-theme-100: #dbeafe; --bg-theme-200: #bfdbfe; --bg-theme-300: #93c5fd; --bg-theme-400: #60a5fa; --bg-theme-500: #3b82f6; --bg-theme-600: #2563eb; --bg-theme-700: #1d4ed8; --bg-theme-800: #1e40af; --bg-theme-900: #1e3a8a; --bg-theme-950: #172554; --font-theme-50: #eff6ff; --font-theme-100: #dbeafe; --font-theme-200: #bfdbfe; --font-theme-300: #93c5fd; --font-theme-400: #60a5fa; --font-theme-500: #3b82f6; --font-theme-600: #2563eb; --font-theme-700: #1d4ed8; --font-theme-800: #1e40af; --font-theme-900: #1e3a8a; --font-theme-950: #172554; --bg-theme-gradient: linear-gradient(to left, #005c97, #363795); }
        [data-theme=purple-theme] { --color-primary-border: #ff00ea; --color-primary: #ff00ea; --color-primary-font: #ff00ea; --color-primary-bg: #ff00ea; --bg-inherit: inherit; --bg-current: #64748b; --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: #fdf4ff; --bg-theme-100: #fae8ff; --bg-theme-200: #f5d0fe; --bg-theme-300: #f0abfc; --bg-theme-400: #e879f9; --bg-theme-500: #d946ef; --bg-theme-600: #c026d3; --bg-theme-700: #a21caf; --bg-theme-800: #86198f; --bg-theme-900: #701a75; --bg-theme-950: #4a044e; --font-theme-50: #faf5ff; --font-theme-100: #f3e8ff; --font-theme-200: #e9d5ff; --font-theme-300: #d8b4fe; --font-theme-400: #c084fc; --font-theme-500: #a855f7; --font-theme-600: #9333ea; --font-theme-700: #7e22ce; --font-theme-800: #6b21a8; --font-theme-900: #581c87; --font-theme-950: #3b0764; --bg-theme-gradient: linear-gradient(to left, #9d50bb, #6e48aa); }
        [data-theme=colorful-theme] { --color-primary-border: #f5ce62; --color-primary: linear-gradient(to left, #c6ffdd, #fbd786, #f7797d); --color-primary-font: #fff; --color-primary-bg: linear-gradient(to left, #c6ffdd, #fbd786, #f7797d); --bg-inherit: inherit; --bg-current: linear-gradient(to left, #c6ffdd, #fbd786, #f7797d); --bg-transparent: transparent; --bg-black: black; --bg-white: white; --bg-theme-50: linear-gradient(to left, #f7fee7, #fffbeb, #fff1f2); --bg-theme-100: linear-gradient(to left, #ecfccb, #fef3c7, #ffe4e6); --bg-theme-200: linear-gradient(to left, #d9f99d, #fde68a, #fecdd3); --bg-theme-300: linear-gradient(to left, #bef264, #fcd34d, #fda4af); --bg-theme-400: linear-gradient(to left, #a3e635, #fbbf24, #fb7185); --bg-theme-500: linear-gradient(to left, #84cc16, #f59e0b, #f43f5e); --bg-theme-600: linear-gradient(to left, #65a30d, #d97706, #e11d48); --bg-theme-700: linear-gradient(to left, #4d7c0f, #b45309, #be123c); --bg-theme-800: linear-gradient(to left, #3f6212, #92400e, #9f1239); --bg-theme-900: linear-gradient(to left, #365314, #78350f, #881337); --bg-theme-950: linear-gradient(to left, #1a2e05, #451a03, #4c0519); --font-theme-50: #fafaf9; --font-theme-100: #f5f5f4; --font-theme-200: #e7e5e4; --font-theme-300: #d6d3d1; --font-theme-400: #a8a29e; --font-theme-500: #78716c; --font-theme-600: #57534e; --font-theme-700: #44403c; --font-theme-800: #292524; --font-theme-900: #1c1917; --font-theme-950: #0c0a09; --bg-theme-gradient: linear-gradient(to left, #c9ffbf, #ffafbd); }
        [data-theme=colorful-theme] .gradient-text { background: var(--color-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        @media screen and (min-width: 1025px) { 
          .theme-container { position: fixed; top: 0; left: 50%; transform: translateX(-50%); z-index: 99; width: 100%; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; flex-direction: column; }
          .theme-inner { position: relative; display: flex; justify-content: center; align-items: center; width: 100%; height: 0; overflow: hidden; transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out; background: rgba(253, 249, 245, 0.8); box-shadow: rgba(3, 3, 3, 0.4) 0px 0px 50px 8px; }
          .theme-inner.visible { opacity: 1; height: 60px; }
          .theme-inner .theme-lists { margin: 0 auto; position: relative; display: flex; justify-content: center; align-items: center; flex-wrap: nowrap; flex-direction: row; padding: 0; }
          .theme-inner .theme-lists .theme-item { position: relative; width: 32px; height: 32px; border-radius: 50%; background: #fdf9f5; margin: 0 10px; aspect-ratio: 1 / 1; outline-offset: 0; list-style: none; }
          .theme-inner .theme-lists .theme-item:nth-child(1) { background: #fdf9f5; }
          .theme-inner .theme-lists .theme-item:nth-child(2) { background: #030303; }
          .theme-inner .theme-lists .theme-item:nth-child(3) { background: #323535; }
          .theme-inner .theme-lists .theme-item:nth-child(4) { background: #ff0000; }
          .theme-inner .theme-lists .theme-item:nth-child(5) { background: #ff006a; }
          .theme-inner .theme-lists .theme-item:nth-child(6) { background: #fa7900; }
          .theme-inner .theme-lists .theme-item:nth-child(7) { background: #faf600; }
          .theme-inner .theme-lists .theme-item:nth-child(8) { background: #03fa41; }
          .theme-inner .theme-lists .theme-item:nth-child(9) { background: #03f7ff; }
          .theme-inner .theme-lists .theme-item:nth-child(10) { background: #0905f3; }
          .theme-inner .theme-lists .theme-item:nth-child(11) { background: #ff00ea; }
          .theme-inner .theme-lists .theme-item:nth-child(12) { background-image: repeating-conic-gradient(red, orange 0.33turn, yellow 0.66turn, green 1turn, #007382 1.33turn, blue 1.66turn, purple 2turn); }
          .theme-inner .theme-lists .theme-item:hover, .theme-inner .theme-lists .theme-item.active { cursor: pointer; transition: all .5s ease; outline: 2px solid rgba(250, 121, 0, 0.8); outline-offset: 2px; }
          .theme-switch { width: 32px; height: 28px; display: flex; justify-content: center; align-items: center; position: relative; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; position: absolute; right: 0; bottom: -28px; }
          .theme-switch::before, .theme-switch::after { display: none; content: ''; position: absolute; top: 0; z-index: 2; width: 50px; height: 100%; background: #fdf9f5; }
          .theme-switch::before { right: 64px; clip-path: path("M 0,0 C 25,0 25,50 50,50 L 0, 50 Z"); transform: rotate(180deg); }
          .theme-switch::after { left: 64px; clip-path: path("M 0,50 C 25,50 25,0 50,0 L 50, 50 Z"); transform: rotate(180deg); }
          .theme-switch .icon { display: block; width: 24px; height: 24px; margin: 0 auto; } 
        }

        @media screen and (max-width: 1024px) { 
          .theme-container { position: fixed; top: 0; left: 50%; transform: translateX(-50%); z-index: 99; width: 100%; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; flex-direction: column; }
          .theme-inner { position: relative; display: flex; justify-content: center; align-items: center; width: 100%; height: 0; overflow: hidden; transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out; background: rgba(253, 249, 245, 0.8); box-shadow: rgba(3, 3, 3, 0.4) 0px 0px 50px 8px; }
          .theme-inner.visible { opacity: 1; height: 60px; }
          .theme-inner .theme-lists { margin: 0 auto; position: relative; display: flex; justify-content: center; align-items: center; flex-wrap: nowrap; flex-direction: row; padding: 0; }
          .theme-inner .theme-lists .theme-item { position: relative; width: 16px; height: 16px; border-radius: 50%; background: #fdf9f5; margin: 0 6px; aspect-ratio: 1 / 1; outline-offset: 0; list-style: none; }
          .theme-inner .theme-lists .theme-item:nth-child(1) { background: #fdf9f5; }
          .theme-inner .theme-lists .theme-item:nth-child(2) { background: #030303; }
          .theme-inner .theme-lists .theme-item:nth-child(3) { background: #323535; }
          .theme-inner .theme-lists .theme-item:nth-child(4) { background: #ff0000; }
          .theme-inner .theme-lists .theme-item:nth-child(5) { background: #ff006a; }
          .theme-inner .theme-lists .theme-item:nth-child(6) { background: #fa7900; }
          .theme-inner .theme-lists .theme-item:nth-child(7) { background: #faf600; }
          .theme-inner .theme-lists .theme-item:nth-child(8) { background: #03fa41; }
          .theme-inner .theme-lists .theme-item:nth-child(9) { background: #03f7ff; }
          .theme-inner .theme-lists .theme-item:nth-child(10) { background: #0905f3; }
          .theme-inner .theme-lists .theme-item:nth-child(11) { background: #ff00ea; }
          .theme-inner .theme-lists .theme-item:nth-child(12) { background-image: repeating-conic-gradient(red, orange 0.33turn, yellow 0.66turn, green 1turn, #007382 1.33turn, blue 1.66turn, purple 2turn); }
          .theme-inner .theme-lists .theme-item:hover, .theme-inner .theme-lists .theme-item.active { cursor: pointer; transition: all .5s ease; outline: 2px solid rgba(250, 121, 0, 0.8); outline-offset: 2px; }
          .theme-switch { width: 24px; height: 20px; display: flex; justify-content: center; align-items: center; position: relative; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; position: absolute; right: 0; bottom: -20px; }
          .theme-switch::before, .theme-switch::after { display: none; content: ''; position: absolute; top: 0; z-index: 2; width: 50px; height: 100%; background: #fdf9f5; }
          .theme-switch::before { right: 34px; clip-path: path("M 0,0 C 25,0 25,50 50,50 L 0, 50 Z"); transform: rotate(180deg); }
          .theme-switch::after { left: 34px; clip-path: path("M 0,50 C 25,50 25,0 50,0 L 50, 50 Z"); transform: rotate(180deg); }
          .theme-switch .icon { display: block; width: 18px; height: 18px; margin: 0 auto; } 
        }
      `;
      /**
       * 动态向文档头部添加样式
       * 
       * 该函数创建了一个新的<style>元素，并将其插入到<head>标签内，位于第一个<title>元素之前
       * 主要用途是在运行时向页面添加自定义样式，而无需手动编辑HTML文档
       * 
       * @param {string} eleStyleInit - 要添加的CSS样式字符串
       */
      const addStyle = (eleStyleInit) => {
        const fa = document.querySelector('title');
        const eleStyle = document.createElement('style');
        eleStyle.innerHTML = eleStyleInit;
        document.head.insertBefore(eleStyle, fa);
      };
      addStyle(themeCssRules);
    }

    /**
     * 创建DOM元素
     * @private
     */
    createElements() {
        // 创建主题列表HTML
        const themeListHtml = `
            <ul class="theme-lists">
                ${this.config.themes.map(theme => 
                    `<li class="theme-item${theme.name === this.config.defaultTheme ? ' active' : ''}" 
                         data-theme="${theme.value}" 
                         data-theme-name="${theme.name}">
                    </li>`
                ).join('')}
            </ul>
        `;

        // 创建主题容器
        const container = document.createElement('div');
        container.innerHTML = this.template.container;
        this.themeElement = container.firstChild;

        // 创建内部容器
        const inner = document.createElement('div');
        inner.innerHTML = this.template.inner;
        this.themeInner = inner.firstChild;
        this.themeInner.innerHTML = themeListHtml;

        // 创建切换按钮
        const switchBtn = document.createElement('div');
        switchBtn.innerHTML = this.template.switch;
        this.themeSwitch = switchBtn.firstChild;
        this.themeSwitch.innerHTML = this.template.iconUp;

        // 组装DOM
        this.themeElement.append(this.themeInner, this.themeSwitch);

        // 添加到指定容器或body
        const parentElement = this.config.container 
            ? (typeof this.config.container === 'string' 
                ? document.querySelector(this.config.container) 
                : this.config.container)
            : document.body;
            
        parentElement.appendChild(this.themeElement);
    }

    /**
     * 初始化默认主题
     * @private
     */
    initDefaultTheme() {
        const htmlElement = document.documentElement;
        htmlElement.classList.add(this.config.defaultTheme);
        htmlElement.setAttribute('data-theme', this.config.defaultTheme);
    }

    /**
     * 绑定事件
     * @private
     */
    bindEvents() {
        // 主题列表点击事件
        this.themeInner.querySelector('.theme-lists').addEventListener('click', (event) => {
            if (event.target.classList.contains('theme-item')) {
                this.changeTheme(event.target);
            }
        });

        // 展开/折叠主题列表
        this.themeSwitch.addEventListener('click', () => {
            this.toggleThemeList();
        });
    }

    /**
     * 切换主题
     * @private
     * @param {HTMLElement} target - 被点击的主题元素
     */
    changeTheme(target) {
        const htmlElement = document.documentElement;
        const themeName = target.getAttribute('data-theme-name');

        // 更新active状态
        this.themeInner.querySelectorAll('.theme-item').forEach(item => {
            item.classList.remove('active');
        });
        target.classList.add('active');

        // 移除所有主题类名
        this.config.themes.forEach(theme => {
            htmlElement.classList.remove(theme.name);
        });

        // 添加新主题
        htmlElement.classList.add(themeName);
        htmlElement.setAttribute('data-theme', themeName);

        // 触发回调
        if (typeof this.config.onThemeChange === 'function') {
            this.config.onThemeChange(themeName);
        }
    }

    /**
     * 切换主题列表显示状态
     * @private
     */
    toggleThemeList() {
        this.isThemeContainerVisible = !this.isThemeContainerVisible;
        this.themeSwitch.innerHTML = this.isThemeContainerVisible 
            ? this.template.iconUp 
            : this.template.iconDown;
        this.themeInner.classList.toggle('visible');
    }

    /**
     * 设置主题
     * @public
     * @param {string} themeName - 主题名称
     */
    setTheme(themeName) {
        const themeItem = this.themeInner.querySelector(`[data-theme-name="${themeName}"]`);
        if (themeItem) {
            this.changeTheme(themeItem);
        }
    }

    /**
     * 获取当前主题
     * @public
     * @returns {string} 当前主题名称
     */
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme');
    }

    /**
     * 显示主题切换组件
     * @public
     */
    show() {
        this.themeElement.style.display = 'flex';
    }

    /**
     * 隐藏主题切换组件
     * @public
     */
    hide() {
        this.themeElement.style.display = 'none';
    }
}

// 导出到全局
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCTheme;
} else {
  window.DC = window.DC || {};
  window.DC.Theme = DCTheme;
}
