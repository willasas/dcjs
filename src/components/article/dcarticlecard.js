// 定义一个文章列表类
class DCArticleCard {
  /**
   * 构造函数
   * 
   * @param {Object} options - 配置对象，包含文章列表和目标元素等信息
   * @param {HTMLElement} [targetElement=document.body] - 默认将文章渲染到的元素，如果没有指定或指定无效则使用document.body
   */
  constructor(options, targetElement = document.body) {
    this.options = options;
    this.articleList = options.articleList;
    // 文章日期图标
    this.articleDateIcon = `
      <svg class="icon update_icon" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" d="M512 960A448 448 0 1 1 512 64a448 448 0 0 1 0 896zM512 114.752a397.248 397.248 0 1 0 0 794.496A397.248 397.248 0 0 0 512 114.752z m229.504 509.568a26.432 26.432 0 0 1-35.2 12.736l-210.496-70.4a26.368 26.368 0 0 1-15.104-25.408c-0.128-1.024-0.64-1.92-0.64-3.008V247.424a26.432 26.432 0 1 1 52.928 0v276.288l195.776 65.472a26.432 26.432 0 0 1 12.736 35.2z"  />
      </svg>
    `;
    // 文章浏览量图标
    this.articleViewIcon = `
      <svg class="icon views_icon" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" d="M512 416a96 96 0 1 1-96 96 96 96 0 0 1 96-96m0-64a160 160 0 1 0 160 160 160 160 0 0 0-160-160z"  />
        <path fill="#000000" d="M512 298.88c188.64 0 288 113.92 366.72 213.12C800 611.36 700.64 725.12 512 725.12S224 611.36 145.28 512C224 412.64 323.36 298.88 512 298.88m0-64C264.64 234.88 147.52 406.56 64 512c83.52 105.44 200.64 277.12 448 277.12S876.48 617.44 960 512c-83.52-105.44-200.64-277.12-448-277.12z"  />
      </svg>
    `;
    // 文章作者图标
    this.articleAuthorIcon = `
      <svg class="icon icon_default_user" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 929.959184c-230.4 0-417.959184-187.559184-417.959184-417.959184s187.559184-417.959184 417.959184-417.959184 417.959184 187.559184 417.959184 417.959184-187.559184 417.959184-417.959184 417.959184z m0-794.122449c-207.412245 0-376.163265 168.75102-376.163265 376.163265s168.75102 376.163265 376.163265 376.163265 376.163265-168.75102 376.163265-376.163265-168.75102-376.163265-376.163265-376.163265z" fill="#333333" />
        <path d="M512 715.755102c-46.497959 0-90.383673-6.269388-123.297959-17.240816-55.379592-18.808163-67.395918-47.020408-67.395919-67.918368 0-71.57551 46.497959-135.836735 119.118368-162.481632 7.836735-3.134694 16.718367-1.044898 22.465306 5.22449 13.061224 14.106122 30.82449 21.942857 49.110204 21.942857s35.526531-7.836735 49.110204-21.942857c5.746939-6.269388 14.628571-8.359184 22.465306-5.22449 72.097959 27.167347 119.118367 90.906122 119.118368 162.481632-0.522449 62.693878-102.922449 85.159184-190.693878 85.159184zM443.559184 512.522449c-49.110204 22.987755-79.934694 68.440816-79.934694 118.595918 0 20.37551 61.126531 43.363265 148.37551 43.363266s148.37551-22.465306 148.37551-43.363266c0-50.155102-30.82449-95.608163-79.934694-118.595918-19.853061 16.195918-43.363265 25.077551-68.440816 25.077551s-49.110204-8.881633-68.440816-25.077551z" fill="#333333" />
        <path d="M512 532.897959c-62.171429 0-112.326531-50.677551-112.326531-112.32653S449.828571 308.244898 512 308.244898s112.326531 50.677551 112.326531 112.326531S574.171429 532.897959 512 532.897959z m0-182.857143c-39.183673 0-70.530612 31.869388-70.530612 70.530613S472.816327 491.102041 512 491.102041s70.530612-31.869388 70.530612-70.530612S551.183673 350.040816 512 350.040816z" fill="#333333" />
      </svg>
    `;
    // 确保 targetElement 是一个有效的 DOM 元素
    if(options.targetElement){
      if (typeof options.targetElement === 'string') {
        this.targetElement = document.querySelector(options.targetElement);
      } else if (options.targetElement instanceof HTMLElement) {
        this.targetElement = options.targetElement;
      } else {
        throw new Error('Invalid targetElement. It must be a string selector or an HTMLElement.');
      };
    } else {
      this.targetElement = targetElement;
    }
    // 调用初始化
    this.init();
  }
  // 创建文章列表样式
  createArticleStyle() {
    const articleListCssRules = `
      @media screen and (min-width: 1025px){
        .article-list{display:flex;justify-content:center;align-items:center}
        .article-card{position:relative;overflow:hidden;max-width:420px;min-height:340px;border-radius:4px;box-shadow:0 10px 35px 2px rgba(0,0,0,0.15),0 5px 15px rgba(0,0,0,0.07),0 2px 5px -5px rgba(0,0,0,0.1);transition:box-shadow .2s ease-in-out}
        .article-card .article-link{display:block;position:relative;width:100%;height:220px}
        .article-card .article-link .article-card-cover{position:relative;background-color:#000;border-radius:8px;width:100%;height:100%}
        .article-card .article-link .article-responsive-img{display:block;position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:1}
        .article-card .article-link .article-card-title{position:absolute;bottom:12px;left:0;z-index:3;width:100%;height:auto;box-sizing:border-box;padding:0px 12px;font-size:30px;text-align:left;color:#fff;line-height:1.2;font-weight:bold}
        .article-card .article-card-status{position:absolute;top:0;left:0;width:100%;height:auto;z-index:3;display:flex;justify-content:flex-end;align-items:center}
        .article-card .article-card-status .card-status-text{display:block;font-size:14px;color:#fff;text-align:center;line-height:1.2;box-sizing:border-box;padding:1px 6px;border-radius:0 8px 0 8px;background:linear-gradient(45deg, #5c6fe6, #8899f5);display:block;margin-left:8px}
        .article-content{width:100%;position:relative;box-sizing:border-box;padding:12px 12px}
        .article-content .article-card-text{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;text-indent:2em;width:100%;max-height:60px;font-size:16px;line-height:1.2;text-align:left}
        .article-content .publish-info{margin:10px auto 0;position:relative;width:100%;height:auto;display:flex;justify-content:space-between;align-items:center}
        .article-content .publish-info span{display:flex;justify-content:center;align-items:center}
        .article-content .publish-info .icon-date,.article-content .publish-info .icon-view,.article-content .publish-info .icon-author{display:block;width:18px;height:18px}
        .article-content .publish-info .publish-date .update-text{margin-left:4px;font-size:14px;line-height:1.2;text-align:left;color:rgba(0,0,0,0.6)}
        .article-content .publish-info .publish-view .view-text{margin-left:4px;font-size:14px;line-height:1.2;text-align:left;color:rgba(0,0,0,0.6)}
        .article-content .publish-info .publish-author .author-text{margin-left:4px;font-size:14px;line-height:1.2;text-align:left;color:rgba(0,0,0,0.6);text-decoration:none}
        .article-tags{margin:0px auto 20px;position:relative;width:100%;height:auto;display:flex;justify-content:flex-start;align-items:center;box-sizing:border-box;padding:0 12px}
        .article-tags .article-tag-item{display:block;position:relative;text-decoration:none;margin-right:6px}
        .article-tags .article-tag-item .tag-text{display:block;font-size:14px;color:#fff;text-align:center;line-height:1.2;box-sizing:border-box;padding:4px 8px;background:#017780;border-radius:20px}
      }
        
      @media screen and (max-width: 1024px){
        .article-card{position:relative;overflow:hidden;max-width:420px;min-height:340px;border-radius:4px;box-shadow:0 10px 35px 2px rgba(0,0,0,0.15),0 5px 15px rgba(0,0,0,0.07),0 2px 5px -5px rgba(0,0,0,0.1);transition:box-shadow .2s ease-in-out}
        .article-card .article-link{display:block;position:relative;width:100%;height:220px}
        .article-card .article-link .article-card-cover{position:relative;background-color:#000;border-radius:8px;width:100%;height:100%}
        .article-card .article-link .article-responsive-img{display:block;position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:1}
        .article-card .article-link .article-card-title{position:absolute;bottom:12px;left:0;z-index:3;width:100%;height:auto;box-sizing:border-box;padding:0px 12px;font-size:30px;text-align:left;color:#fff;line-height:1.2;font-weight:bold}
        .article-card .article-card-status{position:absolute;top:0;left:0;width:100%;height:auto;z-index:3;display:flex;justify-content:flex-end;align-items:center}
        .article-card .article-card-status .card-status-text{display:block;font-size:14px;color:#fff;text-align:center;line-height:1.2;box-sizing:border-box;padding:1px 6px;border-radius:0 8px 0 8px;background:linear-gradient(45deg, #5c6fe6, #8899f5);display:block;margin-left:8px}
        .article-content{width:100%;position:relative;box-sizing:border-box;padding:12px 12px}
        .article-content .article-card-text{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;text-indent:2em;width:100%;max-height:60px;font-size:16px;line-height:1.2;text-align:left}
        .article-content .publish-info{margin:10px auto 0;position:relative;width:100%;height:auto;display:flex;justify-content:space-between;align-items:center}
        .article-content .publish-info span{display:flex;justify-content:center;align-items:center}
        .article-content .publish-info .icon-date,.article-content .publish-info .icon-view,.article-content .publish-info .icon-author{display:block;width:18px;height:18px}
        .article-content .publish-info .publish-date .update-text{margin-left:4px;font-size:14px;line-height:1.2;text-align:left;color:rgba(0,0,0,0.6)}
        .article-content .publish-info .publish-view .view-text{margin-left:4px;font-size:14px;line-height:1.2;text-align:left;color:rgba(0,0,0,0.6)}
        .article-content .publish-info .publish-author .author-text{margin-left:4px;font-size:14px;line-height:1.2;text-align:left;color:rgba(0,0,0,0.6);text-decoration:none}
        .article-tags{margin:0px auto 20px;position:relative;width:100%;height:auto;display:flex;justify-content:flex-start;align-items:center;box-sizing:border-box;padding:0 12px}
        .article-tags .article-tag-item{display:block;position:relative;text-decoration:none;margin-right:6px}
        .article-tags .article-tag-item .tag-text{display:block;font-size:14px;color:#fff;text-align:center;line-height:1.2;box-sizing:border-box;padding:4px 8px;background:#017780;border-radius:20px}
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
    addStyle(articleListCssRules);
  }
  // 创建文章列表dom并赋值
  createArticleCard(article) {
    const articleCard = document.createElement('div');
    articleCard.classList.add('article-card');
    const articleLink = document.createElement('a');
    articleLink.href = article.articleHref || 'javascript:void(0);';
    articleLink.classList.add('article-link');
    const articleCover = document.createElement('div');
    articleCover.classList.add('article-card-cover');
    const articleImage = document.createElement('img');
    articleImage.src = article.cover || '';
    articleImage.alt = article.title || '';
    articleImage.classList.add('article-responsive-img');
    const articleTitle = document.createElement('span');
    articleTitle.classList.add('article-card-title');
    articleTitle.textContent = article.title || '';
    articleCover.appendChild(articleImage);
    articleCover.appendChild(articleTitle);
    const articleStatus = document.createElement('div');
    articleStatus.classList.add('article-card-status');
    
    // 处理多个状态
    (article.status || []).forEach(status => {
      const statusText = document.createElement('span');
      statusText.classList.add('card-status-text');
      statusText.textContent = status;
      articleStatus.appendChild(statusText);
    });
    
    const articleContent = document.createElement('div');
    articleContent.classList.add('article-content');
    const articleText = document.createElement('div');
    articleText.classList.add('article-card-text');
    articleText.textContent = article.content || '';
    const publishInfo = document.createElement('div');
    publishInfo.classList.add('publish-info');
    const publishDate = document.createElement('span');
    publishDate.classList.add('publish-date');
    const dateIcon = this.createIcon('update_icon', 'icon-date');
    dateIcon.innerHTML = this.articleDateIcon;
    const updateText = document.createElement('span');
    updateText.classList.add('update-text');
    updateText.textContent = article.updateTime || '';
    publishDate.appendChild(dateIcon);
    publishDate.appendChild(updateText);
    const publishView = document.createElement('span');
    publishView.classList.add('publish-view');
    const viewIcon = this.createIcon('views_icon', 'icon-view');
    viewIcon.innerHTML = this.articleViewIcon;
    const viewText = document.createElement('span');
    viewText.classList.add('view-text');
    viewText.textContent = article.views || '';
    publishView.appendChild(viewIcon);
    publishView.appendChild(viewText);
    const publishAuthor = document.createElement('span');
    publishAuthor.classList.add('publish-author');
    const authorIcon = this.createIcon('icon_default_user', 'icon-author');
    authorIcon.innerHTML = this.articleAuthorIcon;
    const authorLink = document.createElement('a');
    authorLink.href = article.authorLink || 'javascript:void(0);';
    authorLink.classList.add('author-text');
    authorLink.textContent = article.author || '';
    publishAuthor.appendChild(authorIcon);
    publishAuthor.appendChild(authorLink);
    publishInfo.appendChild(publishDate);
    publishInfo.appendChild(publishView);
    publishInfo.appendChild(publishAuthor);
    articleContent.appendChild(articleText);
    articleContent.appendChild(publishInfo);
    const articleTags = document.createElement('div');
    articleTags.classList.add('article-tags');
    (article.tags || []).forEach(tag => {
      const tagItem = document.createElement('a');
      tagItem.href = tag.link || 'javascript:void(0);';
      tagItem.classList.add('article-tag-item');
      const tagText = document.createElement('span');
      tagText.classList.add('tag-text');
      tagText.textContent = tag.name || '';
      tagItem.appendChild(tagText);
      articleTags.appendChild(tagItem);
    });
    articleLink.appendChild(articleCover);
    articleLink.appendChild(articleStatus);
    articleCard.appendChild(articleLink);
    articleCard.appendChild(articleContent);
    articleCard.appendChild(articleTags);
    this.targetElement.appendChild(articleCard);
  }
  /**
   * 初始化文章列表和样式
   * 
   * 此方法在组件或页面初始化时调用，用于创建文章的样式和文章卡片
   * 它首先调用createArticleStyle方法来创建或应用文章的样式
   * 然后遍历articleList数组，为每个文章调用createArticleCard方法，创建文章卡片
   */
  init() {
    this.createArticleStyle();
    this.articleList.forEach(article => {
      this.createArticleCard(article);
    });
  }
  /**
   * 创建一个图标元素
   * 
   * 该函数用于生成一个带有特定类名和图标的<span>元素它接受图标的基础类名和图标类型作为参数，
   * 创建一个新的<span>元素，为其添加相应的类名，并设置其内部HTML为指定图标类型的对象中存储的图标
   * 
   * @param {string} iconClass - 图标的基础类名，用于指定图标样式的基础
   * @param {string} iconType - 图标的类型，用于确定具体的图标样式
   * @returns {HTMLElement} 返回一个创建好的<span>元素，该元素包含了指定的图标样式和内容
   */
  createIcon(iconClass, iconType) {
    // 创建一个新的<span>元素，这将用作图标容器
    const icon = document.createElement('span');
    
    // 为<span>元素添加基础类名'icon'，以及传入的图标基础类名和图标类型类名
    icon.classList.add('icon', iconClass, iconType);
    
    // 设置<span>元素的内部HTML为对象中与指定图标类型对应的图标
    icon.innerHTML = this[`${iconType}`];
    
    // 返回创建好的图标元素
    return icon;
  }
}

// 导出全局变量
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCArticleCard;
} else {
  window.DC = window.DC || {};
  window.DC.ArticleCard = DCArticleCard;
}
