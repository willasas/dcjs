/**
 * 文章顶部信息类
 * 包含发布时间,更新日期,文章字数,阅读时间和浏览量
*/
class ArticleTopInfo {
    /**
     * 构造函数
     * @param {string} postDateText - 发布日期文本
     * @param {string} updateDateText - 更新日期文本
     * @param {string} wordCountText - 字数文本
     * @param {string} readDurationText - 阅读时间文本
     * @param {string} totalViewsText - 总浏览量文本
     * @param {string|HTMLElement} [targetElement=document.body] - 目标元素选择器或元素(不传则默认为body)
     */
    constructor(postDateText, updateDateText, wordCountText, readDurationText, totalViewsText, targetElement = document.body) {
      this.postDateText = postDateText;
      this.updateDateText = updateDateText;
      this.wordCountText = wordCountText;
      this.readDurationText = readDurationText;
      this.totalViewsText = totalViewsText;
      // 确保 targetElement 是一个有效的 DOM 元素
      if (typeof targetElement === 'string') {
        this.targetElement = document.querySelector(targetElement);
      } else if (targetElement instanceof HTMLElement) {
        this.targetElement = targetElement;
      } else {
        throw new Error('Invalid targetElement. It must be a string selector or an HTMLElement.');
      }
      this.insertStyles();
      this.render();
    }

    /**
     * 插入样式
     */
    insertStyles() {
      const cssRules = `
        @media screen and (min-width: 1025px) { .article-top-info { width: 100%; box-sizing: border-box; padding: 6px 16px; display: flex; justify-content: center; align-items: center; position: relative; margin: 0 auto; }
          .article-top-info .article-top-item { display: flex; justify-content: center; align-items: center; margin-right: 16px; }
          .article-top-info .article-top-item i { display: block; width: 16px; height: 16px; margin-right: 4px; }
          .article-top-info .article-top-item i svg { display: block; width: 100%; height: 100%; }
          .article-top-info .article-top-item i svg path { fill: #000; }
          .article-top-info .article-top-item span { display: block; font-size: 16px; line-height: 1.2; text-align: left; color: #333; margin-right: 8px; }
          .article-top-info .article-top-item span:last-child { font-weight: bold; color: #000 !important; margin-right: 0; } 
        }

        @media screen and (max-width: 1024px) { .article-top-info { width: 100%; box-sizing: border-box; padding: 6px 16px; display: flex; justify-content: center; align-items: flex-start; flex-wrap: wrap; flex-direction: row; position: relative; margin: 0 auto; }
          .article-top-info .article-top-item { display: flex; justify-content: center; align-items: center; margin-right: 8px; margin-top: 4px; }
          .article-top-info .article-top-item i { display: block; width: 16px; height: 16px; margin-right: 4px; }
          .article-top-info .article-top-item i svg { display: block; width: 100%; height: 100%; }
          .article-top-info .article-top-item i svg path { fill: #000; }
          .article-top-info .article-top-item span { display: block; font-size: 16px; line-height: 1.2; text-align: left; color: #333; margin-right: 8px; }
          .article-top-info .article-top-item span:last-child { font-weight: bold; color: #000 !important; margin-right: 0; } 
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

      addStyle(cssRules);
    }

    /**
     * 创建项目元素
     * @param {string} className - 类名
     * @param {string} icon - 图标 HTML
     * @param {string} label - 标签文本
     * @param {string} text - 内容文本
     * @returns {HTMLElement} - 创建的项目元素
     */
    createItem(className, icon, label, text) {
      const item = document.createElement('div');
      item.className = `article-top-item ${className}`;

      const iconContainer = document.createElement('i');
      iconContainer.className = `${className}-icon`;
      iconContainer.innerHTML = icon;

      const labelElement = document.createElement('span');
      labelElement.className = `${className}-label`;
      labelElement.textContent = label;

      const textElement = document.createElement('span');
      textElement.className = `${className}-text`;
      textElement.textContent = text;

      item.appendChild(iconContainer);
      item.appendChild(labelElement);
      item.appendChild(textElement);

      return item;
    }
    
    /**
     * 渲染文章顶部信息
     */
    render() {
      // 父容器
      const articleTopInfo = document.createElement('div');
      articleTopInfo.className = 'article-top-info';

      // Post Date
      const postDateItem = this.createItem(
        'post-date',
        '<svg class="icon post_date_icon" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M881.5 185.4H760.7v-15.2c0-13.3-10.8-24.1-24.1-24.1h-47.8c-13.3 0-24.1 10.8-24.1 24.1v15.2H359.5v-15.2c0-13.3-10.8-24.1-24.1-24.1h-47.8c-13.3 0-24.1 10.8-24.1 24.1v15.2h-119C94 185.4 53 226.5 53 276.9v567.5c0 50.5 41.1 91.5 91.5 91.5h736.9c50.5 0 91.5-41.1 91.5-91.5V276.9c0.1-50.4-41-91.5-91.4-91.5zM877 840H149V281.4h114.5V338c0 13.3 10.8 24.1 24.1 24.1h47.8c13.3 0 24.1-10.8 24.1-24.1v-56.6h305.3V338c0 13.3 10.8 24.1 24.1 24.1h47.8c13.3 0 24.1-10.8 24.1-24.1v-56.6H877V840z"  /><path fill="#000000" d="M639.6 624H401.8c-13.3 0-24.1-10.8-24.1-24.1v-47.8c0-13.3 10.8-24.1 24.1-24.1h237.8c13.3 0 24.1 10.8 24.1 24.1V600c0 13.3-10.8 24-24.1 24z"  /></svg>',
        '发布日期',
        this.postDateText
      );

      // Update Date
      const updateDateItem = this.createItem(
        'update-date',
        '<svg class="icon update_icon" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M512 960A448 448 0 1 1 512 64a448 448 0 0 1 0 896zM512 114.752a397.248 397.248 0 1 0 0 794.496A397.248 397.248 0 0 0 512 114.752z m229.504 509.568a26.432 26.432 0 0 1-35.2 12.736l-210.496-70.4a26.368 26.368 0 0 1-15.104-25.408c-0.128-1.024-0.64-1.92-0.64-3.008V247.424a26.432 26.432 0 1 1 52.928 0v276.288l195.776 65.472a26.432 26.432 0 0 1 12.736 35.2z"  /></svg>',
        '更新日期',
        this.updateDateText
      );

      // Word Count
      const wordCountItem = this.createItem(
        'word-count',
        '<svg class="icon word_count_icon" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M841.155053 1024H181.382826c-54.766249-0.644309-98.579249-44.457308-98.579249-99.223558V108.437174C82.803577 53.670924 126.616576 9.857925 181.382826 9.213616h385.296671c23.839426 0 47.034544 9.020323 64.430882 25.128044l277.05279 245.481658c21.262191 18.684956 33.504058 45.101617 32.85975 73.451205v571.501919c0 26.416661-10.308941 52.189014-28.993897 70.229661-19.329264 18.684956-44.457308 28.993897-70.873969 28.993897zM148.523076 108.437174v816.339268c0 18.040647 14.819103 32.85975 32.85975 32.85975h659.772227c18.040647 0 32.215441-14.819103 32.21544-32.85975v-571.501919a30.346945 30.346945 0 0 0-10.308941-23.839426l-277.05279-245.481658a33.053042 33.053042 0 0 0-21.9065-8.376015H181.382826c-18.040647 0-32.85975 14.819103-32.85975 32.85975zM446.515903 356.947084h-160.432895a33.826213 33.826213 0 0 1-24.483735-32.215441c0-14.819103 10.308941-27.705279 24.483735-32.215441h160.432895c14.174794-3.865853 28.349588 1.288618 36.725603 12.886176 8.376015 11.597559 8.376015 27.06097 0 38.658529s-22.550809 16.752029-36.725603 12.886177z m221.642233 194.581262h-382.075128a33.053042 33.053042 0 0 1-26.416661-32.215441c0-16.10772 10.95325-28.993897 26.416661-32.215441h382.075128c14.819103 3.221544 26.416661 16.10772 26.416661 32.215441 0 15.463412-11.597559 28.993897-26.416661 32.215441z m0 194.581262h-382.075128a33.826213 33.826213 0 0 1-24.483735-32.215441c0-14.819103 10.308941-28.349588 24.483735-32.215441h382.075128c14.174794 3.865853 23.839426 17.396338 23.839426 32.215441 0 14.819103-9.664632 28.349588-23.839426 32.215441z m216.487762-384.652363h-321.510099c-9.020323 0-17.396338-3.221544-23.839426-9.020323a35.952432 35.952432 0 0 1-9.664633-23.839426V42.524382c-3.865853-13.530485 1.288618-28.349588 12.886177-36.081294a32.85975 32.85975 0 0 1 38.658529 0c11.597559 7.731706 16.752029 22.550809 12.886176 36.081294v253.213364h287.361731c12.886176-2.577235 26.416661 3.221544 33.504059 14.174794 7.731706 10.95325 7.731706 25.128044 0 36.725603-7.087397 10.95325-20.617882 16.10772-33.504059 13.530485z" /></svg>',
        '文章字数',
        this.wordCountText
      );

      // Read Duration
      const readDurationItem = this.createItem(
        'read-duration',
        '<svg class="icon read_duration_icon" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M809.472 442.368c118.272 0 214.528 96.256 214.528 214.528s-96.256 214.528-214.528 214.528-214.528-96.256-214.528-214.528 96.768-214.528 214.528-214.528m0 369.664c85.504 0 155.136-69.632 155.136-155.136S894.976 501.76 809.472 501.76c-41.984 0-80.896 16.384-110.592 46.08-29.184 29.184-45.056 68.096-44.544 109.568 0 84.992 69.632 154.624 155.136 154.624M865.792 0c53.248 0 98.816 42.496 105.984 98.304v0.512c0.512 4.096 0.512 8.192 0.512 12.288v282.624c0 9.216-6.656 16.384-15.36 16.384-3.072 0-5.12-0.512-7.68-2.048-42.496-26.112-90.624-40.448-139.264-40.448-64 0-126.464 23.552-175.104 66.56-33.28 27.648-58.88 64.512-74.752 104.96-53.76 135.168-2.048 290.304 120.32 360.448 7.168 4.096 10.24 13.312 7.168 20.992-2.048 4.096-5.632 7.68-9.728 8.704-57.344 17.408-112.128 45.056-162.304 81.92-7.168 7.68-17.92 12.288-28.16 12.288h-2.048c-10.752 0-20.992-4.608-28.16-12.288-101.888-69.12-219.136-108.032-339.968-113.152l-22.528-2.56C40.448 889.344 0 842.24 0 785.408V110.592C0 49.664 47.616 0 105.984 0c4.096 0 7.68 0 11.776 0.512 130.56 15.36 257.536 62.976 367.616 137.728l0.512 0.512 0.512-0.512C594.944 63.488 721.92 15.872 853.504 0.512c4.096-0.512 8.192-0.512 12.288-0.512m-5.12 59.392c-120.832 13.824-238.592 57.856-340.992 127.488L485.376 209.92l-34.304-23.04C348.672 117.248 230.4 73.216 110.08 59.392h-1.024c-1.536-0.512-2.56-0.512-4.096-0.512-26.112 0-47.104 23.04-47.104 51.712v675.328c0 26.624 17.92 49.152 41.472 51.712l20.48 2.048c129.024 5.632 254.976 47.104 363.52 119.808l0.512 0.512 0.512-0.512c32.256-23.04 64-41.472 96.256-56.32l1.536-1.024-1.536-1.536c-99.84-97.28-131.072-250.88-78.336-381.952 18.944-49.664 50.688-93.696 91.648-128.512 59.904-52.224 135.68-80.896 213.504-80.896 34.304 0 68.096 5.632 101.376 16.384l1.536 0.512V111.616c0-1.024 0-2.56-0.512-3.584v-3.584c-3.072-26.624-22.528-45.568-46.592-45.568 1.024 0-1.024 0-2.56 0.512M783.36 567.296c15.36 0 28.16 12.8 28.16 28.16V670.208h74.752c15.36 0 28.16 12.8 28.16 28.16s-12.8 28.16-28.16 28.16H783.36c-5.632 0-10.752-1.536-15.36-4.608-1.536-1.024-3.072-2.048-4.096-3.584-5.12-5.12-8.192-12.288-8.192-19.968v-102.912c0-15.872 12.288-28.16 27.648-28.16" /></svg>',
        '阅读时间',
        this.readDurationText
      );

      // Total Views
      const totalViewsItem = this.createItem(
        'total-views',
        '<svg class="icon views_icon" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M512 416a96 96 0 1 1-96 96 96 96 0 0 1 96-96m0-64a160 160 0 1 0 160 160 160 160 0 0 0-160-160z"  /><path fill="#000000" d="M512 298.88c188.64 0 288 113.92 366.72 213.12C800 611.36 700.64 725.12 512 725.12S224 611.36 145.28 512C224 412.64 323.36 298.88 512 298.88m0-64C264.64 234.88 147.52 406.56 64 512c83.52 105.44 200.64 277.12 448 277.12S876.48 617.44 960 512c-83.52-105.44-200.64-277.12-448-277.12z"  /></svg>',
        '浏览量',
        this.totalViewsText
      );

      // 将所有项目添加到父容器中
      articleTopInfo.appendChild(postDateItem);
      articleTopInfo.appendChild(updateDateItem);
      articleTopInfo.appendChild(wordCountItem);
      articleTopInfo.appendChild(readDurationItem);
      articleTopInfo.appendChild(totalViewsItem);

      // 将父容器添加到页面中
      this.targetElement.appendChild(articleTopInfo);
    }
}


// 使用示例
// const articleInfo = new ArticleTopInfo(
//   '2023-10-01',
//   '2023-10-10',
//   '1000 字',
//   '5 分钟',
//   '1000 次',
//   '#article'
// );