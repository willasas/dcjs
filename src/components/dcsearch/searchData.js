/**
 * 搜索数据配置
 * @description 所有可搜索的内容都在这里配置
 */

// 搜索数据对象
const searchData = {
    // 组件文档
    components: [
        {
            id: 'dcsearch',
            title: '如何使用DCSearch组件',
            content: 'DCSearch是一个简单但功能强大的站内搜索组件，支持模糊查找和精确查找两种方式...',
            url: '/docs/dcsearch.html',
            category: 'components',
            tags: ['搜索', '组件', 'DCSearch']
        },
        {
            id: 'dctheme',
            title: '如何使用DCTheme组件',
            content: 'DCTheme是一个简单换肤组件，支持多种主题切换...',
            url: '/docs/dctheme.html',
            category: 'components',
            tags: ['主题', '换肤', 'DCTheme']
        }
    ],
    
    // 教程文档
    tutorials: [
        {
            id: 'search-mode',
            title: '模糊搜索与精确搜索的区别',
            content: '模糊搜索会匹配包含关键词的内容，而精确搜索需要完全匹配关键词...',
            url: '/docs/search-mode.html',
            category: 'tutorials',
            tags: ['教程', '搜索模式']
        }
    ],
    
    // API文档
    api: [
        {
            id: 'dcsearch-api',
            title: 'DCSearch API文档',
            content: 'DCSearch组件API完整参考文档...',
            url: '/docs/api/dcsearch.html',
            category: 'api',
            tags: ['API', 'DCSearch']
        }
    ]
};

// 工具函数
const utils = {
    // 将所有数据扁平化为数组
    flattenSearchData: () => {
        return Object.values(searchData).reduce((acc, curr) => acc.concat(curr), []);
    },

    // 按分类获取数据
    getDataByCategory: (category) => {
        return searchData[category] || [];
    },

    // 按标签获取数据
    getDataByTag: (tag) => {
        return utils.flattenSearchData().filter(item => 
            item.tags && item.tags.includes(tag)
        );
    }
};

// 导出
const SearchData = {
    searchData,
    ...utils
};

// 为了兼容全局变量方式
window.DC = window.DC || {};
window.DC.SearchData = SearchData;

// export default SearchData; 