/**
 * 筛选器示例数据
 * @description 用于展示不同类型筛选器的效果
 */

// 视频示例数据
const videoData = [
  {
    id: 1,
    title: '流浪地球2',
    type: 'movie',
    genre: 'scifi',
    area: 'china',
    year: '2023',
  },
  {
    id: 2,
    title: '满江红',
    type: 'movie',
    genre: 'action',
    area: 'china',
    year: '2023',
  },
  {
    id: 3,
    title: '狂飙',
    type: 'tv',
    genre: 'drama',
    area: 'china',
    year: '2023',
  },
  {
    id: 4,
    title: '鬼灭之刃',
    type: 'anime',
    genre: 'action',
    area: 'japan',
    year: '2023',
  },
]

// 书籍示例数据
const bookData = [
  {
    id: 1,
    title: '三体',
    type: 'novel',
    genre: 'scifi',
    status: 'complete',
    length: 'long',
  },
  {
    id: 2,
    title: '天龙八部',
    type: 'novel',
    genre: 'wuxia',
    status: 'complete',
    length: 'epic',
  },
  {
    id: 3,
    title: '斗破苍穹',
    type: 'novel',
    genre: 'fantasy',
    status: 'complete',
    length: 'epic',
  },
]

// 图片示例数据
const pictureData = [
  {
    id: 1,
    title: 'Abstract Art',
    type: 'art',
    genre: 'abstract',
    resolution: 'high',
  },
  {
    id: 2,
    title: 'Landscape',
    type: 'nature',
    genre: 'landscape',
    resolution: 'medium',
  },
]

// 漫话示例数据
const comicData = [
  {
    id: 1,
    title: '龙王',
    type: 'anime',
    genre: 'action',
    status: 'ongoing',
    length: 'long',
  },
  {
    id: 2,
    title: '龙王2',
    type: 'anime',
    genre: 'action',
    status: 'ongoing',
  },
]

// 游戏示例数据
const gameData = [
  {
    id: 1,
    title: 'Minecraft',
    type: 'sandbox',
    genre: 'sandbox',
    platform: 'pc',
  },
  {
    id: 2,
    title: 'Valorant',
    type: 'fps',
    genre: 'fps',
    platform: 'pc',
  },
]

// 音频示例数据
const audioData = [
  {
    id: 1,
    title: 'Daft Punk - Get Lucky',
    type: 'music',
    genre: 'electronic',
    length: 'short',
  },
  {
    id: 2,
    title: 'Metallica - Enter Sandman',
    type: 'music',
    genre: 'metal',
  },
]

// 商品示例数据
const shopData = [
  {
    id: 1,
    title: 'iPhone 15',
    type: 'electronics',
    price: 'above1000',
    brand: 'foreign',
    rating: '5star',
  },
  {
    id: 2,
    title: '小米手机',
    type: 'electronics',
    price: '500to1000',
    brand: 'domestic',
    rating: '4star',
  },
  {
    id: 3,
    title: '耐克运动鞋',
    type: 'sports',
    price: '100to500',
    brand: 'foreign',
    rating: '4star',
  },
]

// 导出示例数据
const FilterAllData = {
  video: videoData,
  book: bookData,
  picture: pictureData,
  comic: comicData,
  game: gameData,
  audio: audioData,
  shop: shopData,
}

// 为了兼容全局变量方式
window.DC = window.DC || {}
window.DC.FilterAllData = FilterAllData

// export default FilterAllData;
