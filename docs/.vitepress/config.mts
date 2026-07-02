import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'DCJS 工具库',
  description: 'DC.js 是一个纯前端的常用组件和工具类库，旨在为前端开发提供基础组件和工具类',
  ignoreDeadLinks: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    codeCopy: {
      buttonText: '复制',
      copiedText: '已复制',
      timeout: 2000,
    },
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '指南',
        items: [
          {
            text: '快速开始',
            link: '/dcjs库使用说明',
          },
          {
            text: '项目结构',
            link: '/#项目结构',
          },
          {
            text: '安装和使用',
            link: '/#安装和使用',
          },
          {
            text: '开发指南',
            link: '/#开发指南',
          },
        ],
      },
      {
        text: '工具类',
        link: '/utils/',
        items: [
          {
            text: '数组工具',
            link: '/utils/dcArray',
          },
          {
            text: '浏览器工具',
            link: '/utils/dcBrowser',
          },
          {
            text: '日期工具',
            link: '/utils/dcDate',
          },
          {
            text: '存储工具',
            link: '/utils/dcStorage',
          },
          {
            text: '字符串工具',
            link: '/utils/dcString',
          },
          {
            text: '验证工具',
            link: '/utils/dcValidate',
          },
          {
            text: '更多工具',
            link: '/utils/',
          },
        ],
      },
      {
        text: '组件',
        link: '/components/',
        items: [
          {
            text: '表单组件',
            items: [
              {
                text: '登录组件',
                link: '/components/signin/signin',
              },
              {
                text: '注册组件',
                link: '/components/signup/signup',
              },
              {
                text: '密码重置组件',
                link: '/components/resetpassword/resetpassword',
              },
            ],
          },
          {
            text: 'UI组件',
            items: [
              {
                text: '进度条组件',
                link: '/components/dcprogressbar/dcProgressBar',
              },
              {
                text: '滑块组件',
                link: '/components/dcslider/dcslider',
              },
              {
                text: '弹窗组件',
                link: '/components/popup/dcpopup',
              },
            ],
          },
          {
            text: '更多组件',
            link: '/components/',
          },
        ],
      },
      {
        text: '资源',
        items: [
          {
            text: '工具类示例',
            link: '/utils-examples',
          },
          {
            text: '组件示例',
            link: '/components-examples',
          },
        ],
      },
    ],

    // 搜索功能
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            noResultsText: '未找到结果',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    // 主题切换
    appearance: {
      defaultMode: 'light',
      switchToDarkMode: '🌙',
      switchToLightMode: '☀️',
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/willasas/dcjs',
      },
    ],

    // 侧边栏配置
    sidebar,
  },
})
