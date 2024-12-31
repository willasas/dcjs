class DCDesignBy {
  /**
   * 构造函数，用于初始化组件
   *
   * @param {string} targetSelector - 目标元素的选择器，默认为'body'
   * @param {Array} data - 用于设计的数据数组，默认为空数组
   */
  constructor(targetSelector = 'body', data = []) {
    // 获取目标元素，以便后续操作
    this.targetElement = document.querySelector(targetSelector);
    // 存储设计所需的数据
    this.designByData = data;
    // 初始化组件
    this.init();
  }

  /**
   * 初始化组件或页面
   *
   * 此方法在组件或页面的生命周期中只被调用一次，通常用于设置和渲染初始状态
   * 它首先调用render方法来渲染组件结构，然后创建或应用必要的CSS样式
  */
  init() {
    // 渲染组件或页面的结构
    this.render();

    // 创建并应用组件或页面所需的CSS样式
    this.createCss();
  }

  createCss(){
    // 添加CSS样式
    const fa = document.querySelector('title');
    const eleStyle = document.createElement('style');
    eleStyle.innerHTML = `
      .designby-list { margin: 0 auto; min-width: 600px; height: auto; display: flex; justify-content: space-around; align-items: flex-start; flex-wrap: wrap; gap: 10px; }
      .designby-list .designby-item { display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; flex-direction: column; width: 120px; height: 140px; }
      .designby-list .designby-item:hover .designby-icon { box-shadow: 0px 0px 0px var(--bg-theme-200), 0px 0px 0px var(--bg-theme-50), inset 18px 18px 30px var(--bg-theme-100), inset -18px -18px 30px var(--bg-theme-50); transition: box-shadow .2s ease-out; }
      .designby-list .designby-item .designby-icon { display: block; width: 120px; height: 120px; box-sizing: border-box; padding: 10px; box-shadow: 18px 18px 30px var(--bg-theme-100), -18px -18px 30px var(--bg-theme-50); border-radius: 8px; display: flex; align-items: center; justify-content: center; background: var(--bg-theme-50); transition: box-shadow .2s ease-out; position: relative; }
      .designby-list .designby-item .designby-icon svg { width: 64px; height: 64px; }
      .designby-list .designby-item .designby-icon svg path { stroke: var(--bg-theme-950); }
      .designby-list .designby-item .designby-text { margin: 0 auto; width: 100%; font-size: 16px; line-height: 1.2; text-align: center; color: var(--font-theme-950); }
    `;
    document.head.insertBefore(eleStyle, fa);
  }

  /**
   * 渲染组件或页面的结构
   *
   * 此方法用于根据提供的数据渲染组件或页面的结构，通常包括创建DOM元素和设置属性
   * 它会遍历数据数组，为每个项目创建一个div元素，并设置其className和innerHTML属性
  */
  render() {
    const designList = document.createElement('div');
    designList.className = 'designby-list';
    this.targetElement.appendChild(designList);

    const designByList = this.targetElement.querySelector('.designby-list');
    if (!designByList) {
      console.error('DesignBy list element not found');
      return;
    }

    this.designByData.forEach(item => {
      const designByItem = document.createElement('div');
      designByItem.className = 'designby-item';

      const designByIcon = document.createElement('i');
      designByIcon.className = 'designby-icon';
      designByIcon.innerHTML = item.icon;

      const designByText = document.createElement('span');
      designByText.className = 'designby-text';
      designByText.textContent = item.name;

      designByItem.appendChild(designByIcon);
      designByItem.appendChild(designByText);
      designByList.appendChild(designByItem);
    });
  }
}

// 导出全局变量
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCDesignBy;
} else {
  window.DC = window.DC || {};
  window.DC.DesignBy = DCDesignBy;
}
