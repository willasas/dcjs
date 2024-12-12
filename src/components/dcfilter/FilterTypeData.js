/**
 * 筛选器分类数据配置
 * @description 所有筛选分类配置都在这里管理
 */

// 视频相关分类
const videoCategories = [
    {
        key: 'type',
        name: '类型',
        children: [
            { value: 'movie', name: '电影' },
            { value: 'tv', name: '电视剧' },
            { value: 'anime', name: '动画' },
            { value: 'doc', name: '纪录片' }
        ]
    },
    {
        key: 'genre',
        name: '题材',
        children: [
            { value: 'action', name: '动作' },
            { value: 'comedy', name: '喜剧' },
            { value: 'drama', name: '剧情' },
            { value: 'scifi', name: '科幻' },
            { value: 'horror', name: '恐怖' },
            { value: 'romance', name: '爱情' },
            { value: 'fantasy', name: '奇幻' },
            { value: 'adventure', name: '冒险' }
        ]
    },
    {
        key: 'area',
        name: '地区',
        children: [
            { value: 'china', name: '中国大陆' },
            { value: 'hongkong', name: '中国香港' },
            { value: 'taiwan', name: '中国台湾' },
            { value: 'japan', name: '日本' },
            { value: 'korea', name: '韩国' },
            { value: 'usa', name: '美国' },
            { value: 'europe', name: '欧洲' }
        ]
    },
    {
        key: 'year',
        name: '年代',
        children: [
            { value: '2024', name: '2024' },
            { value: '2023', name: '2023' },
            { value: '2022', name: '2022' },
            { value: '2021', name: '2021' },
            { value: '2020', name: '2020' },
            { value: 'earlier', name: '更早' }
        ]
    }
];

// 书籍相关分类
const bookCategories = [
    {
        key: 'type',
        name: '类型',
        children: [
            { value: 'novel', name: '小说' },
            { value: 'literature', name: '文学' },
            { value: 'education', name: '教育' },
            { value: 'technology', name: '科技' },
            { value: 'life', name: '生活' },
            { value: 'art', name: '艺术' }
        ]
    },
    {
        key: 'genre',
        name: '题材',
        children: [
            { value: 'fantasy', name: '玄幻' },
            { value: 'wuxia', name: '武侠' },
            { value: 'romance', name: '言情' },
            { value: 'scifi', name: '科幻' },
            { value: 'mystery', name: '悬疑' },
            { value: 'history', name: '历史' }
        ]
    },
    {
        key: 'status',
        name: '状态',
        children: [
            { value: 'serialize', name: '连载中' },
            { value: 'complete', name: '已完结' }
        ]
    },
    {
        key: 'length',
        name: '字数',
        children: [
            { value: 'short', name: '30万字以下' },
            { value: 'medium', name: '30-100万字' },
            { value: 'long', name: '100-200万字' },
            { value: 'epic', name: '200万字以上' }
        ]
    }
];

// 商品相关分类
const shopCategories = [
    {
        key: 'type',
        name: '分类',
        children: [
            { value: 'clothing', name: '服装' },
            { value: 'electronics', name: '电子产品' },
            { value: 'food', name: '食品' },
            { value: 'furniture', name: '家具' },
            { value: 'beauty', name: '美妆' },
            { value: 'sports', name: '运动' }
        ]
    },
    {
        key: 'price',
        name: '价格',
        children: [
            { value: 'under100', name: '100元以下' },
            { value: '100to500', name: '100-500元' },
            { value: '500to1000', name: '500-1000元' },
            { value: 'above1000', name: '1000元以上' }
        ]
    },
    {
        key: 'brand',
        name: '品牌',
        children: [
            { value: 'domestic', name: '国产' },
            { value: 'foreign', name: '进口' }
        ]
    },
    {
        key: 'rating',
        name: '评分',
        children: [
            { value: '5star', name: '5星好评' },
            { value: '4star', name: '4星以上' },
            { value: '3star', name: '3星以上' }
        ]
    }
];

// 导出所有分类
const FilterTypeData = {
    video: videoCategories,
    book: bookCategories,
    shop: shopCategories
};

// 为了兼容全局变量方式
window.DC = window.DC || {};
window.DC.FilterTypeData = FilterTypeData;

// export default FilterTypeData; 