// 定义列宽和列间距的字符串值，以百分比形式表示
let columnWidthStr = '22%';
let columnGapStr = '2%';

/**
 * 解析百分比字符串为数字值
 * @param {string} str - 百分比字符串
 * @returns {number} - 解析后的数字值
 * @throws {Error} - 如果字符串不是有效的百分比形式，则抛出错误
 */
const parsePercentage = str => {
  const match = str.match(/^(\d+(\.\d+)?)(%)?$/);
  if (!match) throw new Error('Invalid percentage string');
  const num = parseFloat(match[1]);
  return match[3] ? num / 100 : num;
};

// 获取瀑布流容器元素和其初始宽度
const container = document.getElementById('waterfall-container');
const containerRect = container.getBoundingClientRect();
let containerWidth = containerRect.width;

// 根据容器宽度和列宽、列间距的百分比值，计算实际的列宽和列间距
// 根据container的宽度动态计算列宽和间隙
let columnWidth = parsePercentage(columnWidthStr) * containerWidth;
let columnGap = parsePercentage(columnGapStr) * containerWidth;

// 计算可以容纳的列数
let columnCount = Math.floor(containerWidth / (columnWidth + columnGap));
// 初始化每列的高度数组
let columnHeights = Array(columnCount).fill(0);

/**
 * 布局瀑布流项
 * @param {Array} items - 待布局的瀑布流项元素数组
 */
function layoutItems(items) {
  // 遍历每个瀑布流项，计算其应放置的列和位置，并更新该列的高度
  items.forEach((item, index) => {
    const minColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    const top = columnHeights[minColumnIndex];
    const left = minColumnIndex * (columnWidth + columnGap);

    item.style.top = `${top}px`;
    item.style.left = `${left}px`;
    
    columnHeights[minColumnIndex] += item.offsetHeight + columnGap;
  });

  // 更新容器的高度，以适应所有瀑布流项
  container.style.height = `${Math.max(...columnHeights)}px`;
}

/**
 * 加载更多瀑布流项
 */
function loadMoreItems() {
  // 创建并添加新的瀑布流项到容器中
  const newItems = Array.from({length: 10}, () => {
    const newItem = document.createElement('div');
    newItem.className = 'waterfall-item';
    newItem.style.height = `${Math.floor(Math.random() * 100) + 100}px`;
    container.appendChild(newItem);
    return newItem;
  });
  // 布局新加载的项
  layoutItems(newItems);
}

// 监听窗口resize事件，以动态调整瀑布流布局
window.addEventListener('resize', () => {
  const newContainerRect = container.getBoundingClientRect();
  containerWidth = newContainerRect.width;

  // 根据新的容器宽度，重新计算列宽、列间距和列数
  columnWidth = parsePercentage(columnWidthStr) * containerWidth;
  columnGap = parsePercentage(columnGapStr) * containerWidth;

  // 重新计算列数
  columnCount = Math.floor(containerWidth / (columnWidth + columnGap));
  // 重置每列的高度
  columnHeights = Array(columnCount).fill(0);

  // 重新布局所有项目
  const allItems = Array.from(container.getElementsByClassName('waterfall-item'));
  layoutItems(allItems);

  // 加载更多项，以填充新出现的空白区域
  loadMoreItems();
});

// 初始化布局：对已存在的瀑布流项进行布局
const initItems = Array.from(container.getElementsByClassName('waterfall-item'));
layoutItems(initItems);