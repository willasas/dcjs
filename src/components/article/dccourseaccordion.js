// 常见问题FAQ组件
class DCourseAccordion {
  /**
   * 创建一个 DCourseAccordion 实例
   * @param {Object} config - 配置对象
   * @param {string} config.title - 标题
   * @param {string} config.text - 文本
   * @param {string} config.link - 链接
   * @param {string} [containerSelector='body'] - 容器选择器，默认为 'body'
   */
  constructor({ title, text, link }, containerSelector = 'body') {
    this.title = title;
    this.text = text;
    this.link = link;
    this.containerSelector = containerSelector;
    this.container = null;
    
    // 创建样式
    this.createStyles();
    
    // 初始化容器
    this.init();
  }
  
  /**
   * 创建样式
   * 该方法用于创建并添加样式到页面中
   * @method createStyles
   * @memberof DCourseAccordion
   * @param {string} eleStyleInit - 样式字符串
   * @returns {void} - 该方法不返回任何值
   */
  createStyles() {
    const courseCssRules = `
      @media screen and (min-width: 1025px) {
        .course-container { position: relative; margin: 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; box-sizing: border-box; padding: 0 20px; min-width: 800px; min-height: 316px; }
        .course-detail-item { position: relative; overflow: hidden; margin: 0 auto; width: 100%; border: 1px solid #000; }
        .course-detail-item:first-child { border-top-left-radius: 8px; border-top-right-radius: 8px; }
        .course-detail-item:last-child { border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; }
        .course-detail-item[open] { border-bottom: 1px solid #000; }
        .course-detail-item[open] .course-detail-title { background: rgba(0, 0, 0, 0.4); }
        .course-detail-item .course-detail-title { position: relative; background: rgba(0, 0, 0, 0.1); padding: 8px 8px; cursor: pointer; transition: background .2s ease, color .2s ease; font-size: 22px; text-align: left; color: #000; line-height: 1.2; border-bottom: 1px solid rgba(0, 0, 0, 0.2); text-decoration: underline; text-decoration-color: rgba(255, 255, 255, 0.8); text-decoration-thickness: 2px; text-decoration-style: wavy; text-decoration-skip-ink: none; }
        .course-detail-item .course-detail-title::before { display: none; content: counter(chapter); background: rgba(0, 0, 0, 0.5); font-size: 16px; text-align: center; line-height: 24px; color: #fff; height: 24px; aspect-ratio: 1; text-align: center; border-radius: 50%; margin-right: 8px; }
        .course-detail-item .course-detail-text { margin: 0 auto; font-size: 16px; text-align: left; color: #000; line-height: 1.2; padding: 8px 8px; }
        .course-detail-item .course-link { margin: 0; position: relative; padding: 16px 8px 8px; max-width: 200px; }
        .course-detail-item .course-link .course-detail-link { display: block; background: black; color: rgba(255, 255, 255, 0.8); text-decoration: none; padding: 10px 12px; font-size: 18px; line-height: 1.2; text-align: center; text-transform: uppercase; border-radius: 4px; }
        .course-detail-item .course-link .course-detail-link:hover { background: #3ff8ef; color: #000; } 
      }

      @media screen and (max-width: 1024px) { 
        .course-container { position: relative; margin: 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; max-width: 690px; min-height: 316px; }
        .course-detail-item { position: relative; overflow: hidden; margin: 0 auto; width: 100%; border: 1px solid #000; }
        .course-detail-item:first-child { border-top-left-radius: 8px; border-top-right-radius: 8px; }
        .course-detail-item:last-child { border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; }
        .course-detail-item[open] { border-bottom: 1px solid #000; }
        .course-detail-item[open] .course-detail-title { background: rgba(0, 0, 0, 0.4); }
        .course-detail-item .course-detail-title { position: relative; background: rgba(0, 0, 0, 0.1); padding: 8px 8px; cursor: pointer; transition: background .2s ease, color .2s ease; font-size: 20px; text-align: left; color: #000; line-height: 1.2; border-bottom: 1px solid rgba(0, 0, 0, 0.2); text-decoration: underline; text-decoration-color: rgba(255, 255, 255, 0.8); text-decoration-thickness: 2px; text-decoration-style: wavy; text-decoration-skip-ink: none; }
        .course-detail-item .course-detail-title::before { display: none; content: counter(chapter); background: rgba(0, 0, 0, 0.5); font-size: 16px; text-align: center; line-height: 24px; color: #fff; height: 24px; aspect-ratio: 1; text-align: center; border-radius: 50%; margin-right: 8px; }
        .course-detail-item .course-detail-text { margin: 0 auto; font-size: 16px; text-align: left; color: #000; line-height: 1.2; padding: 8px 8px; }
        .course-detail-item .course-link { margin: 0; position: relative; padding: 16px 8px 8px; max-width: 200px; }
        .course-detail-item .course-link .course-detail-link { display: block; background: black; color: rgba(255, 255, 255, 0.8); text-decoration: none; padding: 10px 12px; font-size: 18px; line-height: 1.2; text-align: center; text-transform: uppercase; border-radius: 4px; }
        .course-detail-item .course-link .course-detail-link:hover { background: #3ff8ef; color: #000; } 
      }
    `;
    const addStyle = (eleStyleInit) => {
      const fa = document.querySelector('title');
      const eleStyle = document.createElement('style');
      eleStyle.innerHTML = eleStyleInit;
      document.head.insertBefore(eleStyle, fa);
    };
    addStyle(courseCssRules);
  }

  /**
   * 初始化组件
   * 该方法用于查找并设置组件的容器元素
   * @method init
   * @memberof DCourseAccordion
   * @returns {void} - 该方法不返回任何值
   */
  init() {
    // 尝试根据选择器获取容器元素，如果没有则使用 body 作为默认容器
    this.container = document.querySelector(this.containerSelector) || document.body;
  }

  /**
   * 渲染组件
   * 该方法用于创建并返回一个包含课程详细信息的 details 元素
   * @method render
   * @memberof DCourseAccordion
   * @returns {HTMLElement} - 渲染后的 details 元素
   */
  render() {
    // 创建一个 details 元素
    const details = document.createElement('details');
    // 为 details 元素添加 course-detail-item 类
    details.className = 'course-detail-item';
    // 设置 details 元素的 data-name 属性为 learn-css
    details.setAttribute('data-name', 'learn-css');
    // 打开 details 元素
    details.open = true;

    // 创建一个 summary 元素
    const summary = document.createElement('summary');
    // 为 summary 元素添加 course-detail-title 类
    summary.className = 'course-detail-title';
    // 设置 summary 元素的文本内容为 this.title
    summary.textContent = this.title;

    // 创建一个 p 元素
    const pText = document.createElement('p');
    // 为 p 元素添加 course-detail-text 类
    pText.className = 'course-detail-text';
    // 设置 p 元素的文本内容为 this.text
    pText.textContent = this.text;

    // 创建一个 p 元素
    const pLink = document.createElement('p');
    // 为 p 元素添加 course-link 类
    pLink.className = 'course-link';

    // 创建一个 a 元素
    const a = document.createElement('a');
    // 设置 a 元素的 href 属性为 this.link
    a.href = this.link;
    // 为 a 元素添加 course-detail-link 类
    a.className = 'course-detail-link';
    // 设置 a 元素的文本内容为 Read Article
    a.textContent = 'Read Article';

    // 将 a 元素添加到 pLink 元素中
    pLink.appendChild(a);

    // 将 summary 元素添加到 details 元素中
    details.appendChild(summary);
    // 将 pText 元素添加到 details 元素中
    details.appendChild(pText);
    // 将 pLink 元素添加到 details 元素中
    details.appendChild(pLink);

    // 返回渲染后的 details 元素
    return details;
  }

  /**
   * 批量渲染课程详情组件
   * 该方法用于根据提供的配置项数组，批量创建并渲染课程详情组件
   * @static
   * @method renderItems
   * @memberof DCourseAccordion
   * @param {Array} items - 包含课程详情配置项的数组
   * @param {string} [containerSelector='body'] - 容器选择器，默认为 'body'
   * @returns {void} - 该方法不返回任何值
   */
  static renderItems(items, containerSelector = 'body') {
    const container = document.querySelector(containerSelector) || document.body;
    items.forEach(item => {
      const accordionItem = new DCourseAccordion(item, containerSelector);
      container.appendChild(accordionItem.render());
    });
    DCourseAccordion.addToggleEventListeners(container);
  }

  /**
   * 添加切换事件监听器
   * 该方法用于为指定容器内的所有 details 元素添加事件监听器，以实现当一个 details 元素被打开时，自动关闭其他已打开的 details 元素的功能
   * @static
   * @method addToggleEventListeners
   * @memberof DCourseAccordion
   * @param {HTMLElement} container - 要添加事件监听器的容器元素
   * @returns {void} - 该方法不返回任何值
   */
  static addToggleEventListeners(container) {
    container.querySelectorAll("details[data-name]").forEach(($details) => {
      $details.addEventListener("toggle", (e) => {
        const name = $details.getAttribute("data-name");

        if (e.target.open) {
          container
            .querySelectorAll(`details[data-name="${name}"][open]`)
            .forEach(($openDetails) => {
              if (!($openDetails === $details)) {
                $openDetails.removeAttribute("open");
              }
            });
        }
      });
    });
  }
  
  /**
   * 切换指定名称的 details 元素的打开或关闭状态
   * 该方法用于根据提供的名称和布尔值来切换指定 details 元素的打开或关闭状态
   * @static
   * @method toggle
   * @memberof DCourseAccordion
   * @param {string} name - 要切换的 details 元素的名称
   * @param {boolean} isOpen - 是否打开 details 元素
   * @returns {void} - 该方法不返回任何值
   */
  static toggle(name, isOpen) {
    const details = document.querySelector(`details[data-name="${name}"]`);
    if (details) {
      details.open = isOpen;
    }
  }
}

// 导出全局变量
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCourseAccordion;
} else {
  window.DC = window.DC || {};
  window.DC.CourseAccordion = DCourseAccordion;
}
