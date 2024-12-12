/**
 * DCSearch 站内搜索组件类
 * @class DCSearch
 * @description 一个简单的JavaScript站内搜索组件，支持模糊查找和精确查找
 */
class DCSearch {
    /**
     * @private
     * @description 默认配置
     */
    constructor(options = {}) {
        // 将默认配置移到构造函数中
        const defaultConfig = Object.freeze({
            container: null,           // 搜索容器元素
            data: [],                 // 搜索数据源
            placeholder: '请输入关键词搜索', // 搜索框占位符
            searchFields: ['title', 'content', 'tags'], // 搜索字段
            searchMode: 'fuzzy',      // 搜索模式: fuzzy(模糊)/exact(精确)
            debounceTime: 300,        // 防抖时间(ms)
            maxResults: 10,           // 最大结果数
            highlight: true,          // 是否高亮关键词
            caseSensitive: false,     // 是否区分大小写
            onSearch: null,           // 搜索回调
            onSelect: null,           // 选择结果回调
            noResultText: '未找到相关结果' // 无结果提示文本
        });

        this.config = { ...defaultConfig, ...options };
        this.searchTimer = null;
        this.currentKeyword = '';
        this.init();
    }

    /**
     * 初始化搜索组件
     * @private
     */
    init() {
        this.createStyle();
        this.createElements();
        this.bindEvents();
    }

    /**
     * 创建样式
     * @private
     */
    createStyle() {
      const cssRules = `
        .dc-search { width: 100%; position: relative; display: flex; align-items: center; padding: 10px; box-sizing: border-box; }
        .dc-search .dc-search-input-wrapper { flex: 1; position: relative; display: flex; align-items: center; }
        .dc-search .dc-search-input { width: 100%; height: 40px; padding: 0 40px 0 15px; font-size: 14px; border: 1px solid #dcdfe6; border-radius: 4px; background: #fff; transition: all 0.3s; }
        .dc-search .dc-search-input:focus { outline: none; border-color: #409eff; box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2); }
        .dc-search .dc-search-input:focus + .dc-search-icon .icon_search path { stroke: #409eff; }
        .dc-search .dc-search-input::placeholder { color: #909399; }
        .dc-search .dc-search-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; pointer-events: none; }
        .dc-search .dc-search-icon .icon_search path { transition: stroke 0.3s; }
        .dc-search .dc-search-mode { margin-left: 10px; height: 40px; padding: 0 15px; font-size: 14px; color: #409eff; background: transparent; border: 1px solid #409eff; border-radius: 4px; cursor: pointer; transition: all 0.3s; }
        .dc-search .dc-search-mode:hover { color: #fff; background: #409eff; }
        .dc-search .dc-search-results { position: absolute; top: 100%; left: 0; right: 0; max-height: 400px; margin-top: 5px; background: #fff; border: 1px solid #dcdfe6; border-radius: 4px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); overflow-y: auto; z-index: 100; }
        .dc-search .dc-search-results::-webkit-scrollbar { width: 6px; height: 6px; }
        .dc-search .dc-search-results::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
        .dc-search .dc-search-results::-webkit-scrollbar-thumb:hover { background: #999; }
        .dc-search .dc-search-results .dc-search-result-item { display: block; padding: 10px 15px; cursor: pointer; transition: background 0.3s; text-decoration: none; color: inherit; }
        .dc-search .dc-search-results .dc-search-result-item:hover { background: #f5f7fa; }
        .dc-search .dc-search-results .dc-search-result-item .dc-search-result-title { font-size: 16px; color: #303133; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .dc-search .dc-search-results .dc-search-result-item .dc-search-result-content { font-size: 14px; color: #606266; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; }
        .dc-search .dc-search-results .dc-search-no-result { padding: 20px; text-align: center; color: #909399; font-size: 14px; }
        .dc-search .dc-search-highlight { color: #409eff; font-weight: bold; }

        @media screen and (max-width: 1024px) { .dc-search .dc-search-icon { width: 16px; height: 16px; right: 10px; }
          .dc-search .dc-search-input { padding-right: 35px; }
          .dc-search .dc-search-input { height: 36px; font-size: 14px; }
          .dc-search .dc-search-mode { height: 36px; padding: 0 12px; font-size: 14px; }
          .dc-search .dc-search-results .dc-search-result-item { padding: 8px 12px; }
          .dc-search .dc-search-results .dc-search-result-item .dc-search-result-title { font-size: 14px; }
          .dc-search .dc-search-results .dc-search-result-item .dc-search-result-content { font-size: 12px; } 
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
      addStyle(cssRules);
    }

    /**
     * 创建DOM元素
     * @private
     */
    createElements() {
        // 创建搜索容器
        this.container = document.createElement('div');
        this.container.className = 'dc-search';

        // 创建搜索框容器
        const searchInputWrapper = document.createElement('div');
        searchInputWrapper.className = 'dc-search-input-wrapper';

        // 创建搜索框
        this.searchInput = document.createElement('input');
        this.searchInput.type = 'text';
        this.searchInput.className = 'dc-search-input';
        this.searchInput.placeholder = this.config.placeholder;

        // 创建搜索图标
        const searchIcon = document.createElement('div');
        searchIcon.className = 'dc-search-icon';
        searchIcon.innerHTML = `<svg class="icon icon_search" width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/><path d="M33.2216 33.2217L41.7069 41.707" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/></svg>`;

        // 组装搜索框和图标
        searchInputWrapper.appendChild(this.searchInput);
        searchInputWrapper.appendChild(searchIcon);

        // 创建搜索模式切换按钮
        this.modeToggle = document.createElement('button');
        this.modeToggle.className = 'dc-search-mode';
        this.modeToggle.textContent = this.config.searchMode === 'fuzzy' ? '模糊' : '精确';

        // 创建结果容器
        this.resultContainer = document.createElement('div');
        this.resultContainer.className = 'dc-search-results';

        // 组装DOM
        this.container.appendChild(searchInputWrapper);
        this.container.appendChild(this.modeToggle);
        this.container.appendChild(this.resultContainer);

        // 添加到指定容器
        const parentElement = this.config.container 
            ? (typeof this.config.container === 'string' 
                ? document.querySelector(this.config.container) 
                : this.config.container)
            : document.body;
            
        parentElement.appendChild(this.container);
    }

    /**
     * 绑定事件
     * @private
     */
    bindEvents() {
        // 搜索框输入事件
        this.searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.trim();
            this.currentKeyword = keyword;
            
            // 防抖处理
            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
            }
            
            this.searchTimer = setTimeout(() => {
                this.search(keyword);
            }, this.config.debounceTime);
        });

        // 搜索模式切换
        this.modeToggle.addEventListener('click', () => {
            this.config.searchMode = this.config.searchMode === 'fuzzy' ? 'exact' : 'fuzzy';
            this.modeToggle.textContent = this.config.searchMode === 'fuzzy' ? '模糊' : '精确';
            if (this.currentKeyword) {
                this.search(this.currentKeyword);
            }
        });

        // 结果点击事件
        this.resultContainer.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.dc-search-result-item');
            if (resultItem && typeof this.config.onSelect === 'function') {
                const index = parseInt(resultItem.dataset.index);
                this.config.onSelect(this.config.data[index], index);
            }
        });
    }

    /**
     * 执行搜索
     * @private
     * @param {string} keyword - 搜索关键词
     */
    search(keyword) {
        if (!keyword) {
            this.clearResults();
            return;
        }

        let results = [];
        const searchFields = this.config.searchFields;
        
        if (this.config.searchMode === 'fuzzy') {
            results = this.fuzzySearch(keyword, searchFields);
        } else {
            results = this.exactSearch(keyword, searchFields);
        }

        this.displayResults(results, keyword);

        if (typeof this.config.onSearch === 'function') {
            this.config.onSearch(keyword, results);
        }
    }

    /**
     * 模糊搜索
     * @private
     * @param {string} keyword - 搜索关键词
     * @param {Array} fields - 搜索字段
     * @returns {Array} 搜索结果
     */
    fuzzySearch(keyword, fields) {
        const results = [];
        const searchKeyword = this.config.caseSensitive ? keyword : keyword.toLowerCase();

        this.config.data.forEach((item, index) => {
            for (const field of fields) {
                const fieldValue = this.config.caseSensitive 
                    ? String(item[field] || '')
                    : String(item[field] || '').toLowerCase();
                
                if (fieldValue.includes(searchKeyword)) {
                    results.push({ ...item, index });
                    break;
                }
            }
        });

        return results.slice(0, this.config.maxResults);
    }

    /**
     * 精确搜索
     * @private
     * @param {string} keyword - 搜索关键词
     * @param {Array} fields - 搜索字段
     * @returns {Array} 搜索结果
     */
    exactSearch(keyword, fields) {
        const results = [];
        const searchKeyword = this.config.caseSensitive ? keyword : keyword.toLowerCase();

        this.config.data.forEach((item, index) => {
            for (const field of fields) {
                const fieldValue = this.config.caseSensitive 
                    ? String(item[field] || '')
                    : String(item[field] || '').toLowerCase();
                
                if (fieldValue === searchKeyword) {
                    results.push({ ...item, index });
                    break;
                }
            }
        });

        return results.slice(0, this.config.maxResults);
    }

    /**
     * 显示搜索结果
     * @private
     * @param {Array} results - 搜索结果
     * @param {string} keyword - 搜索关键词
     */
    displayResults(results, keyword) {
        this.resultContainer.innerHTML = '';

        if (results.length === 0) {
            const noResult = document.createElement('div');
            noResult.className = 'dc-search-no-result';
            noResult.textContent = this.config.noResultText;
            this.resultContainer.appendChild(noResult);
            return;
        }

        const fragment = document.createDocumentFragment();

        results.forEach(result => {
            // 创建链接容器
            const resultLink = document.createElement('a');
            resultLink.className = 'dc-search-result-item';
            resultLink.href = result.url || 'javascript:;'; // 使用数据中的url或默认为javascript:;
            resultLink.dataset.index = result.index;

            // 标题
            const title = document.createElement('div');
            title.className = 'dc-search-result-title';
            title.innerHTML = this.config.highlight 
                ? this.highlightKeyword(result.title, keyword)
                : result.title;

            // 内容预览
            const content = document.createElement('div');
            content.className = 'dc-search-result-content';
            content.innerHTML = this.config.highlight 
                ? this.highlightKeyword(this.getContentPreview(result.content), keyword)
                : this.getContentPreview(result.content);

            resultLink.appendChild(title);
            resultLink.appendChild(content);
            fragment.appendChild(resultLink);
        });

        this.resultContainer.appendChild(fragment);
    }

    /**
     * 获取内容预览
     * @private
     * @param {string} content - 完整内容
     * @returns {string} 预览内容
     */
    getContentPreview(content) {
        const maxLength = 100;
        if (!content) return '';
        return content.length > maxLength 
            ? content.substring(0, maxLength) + '...'
            : content;
    }

    /**
     * 高亮关键词
     * @private
     * @param {string} text - 原始文本
     * @param {string} keyword - 关键词
     * @returns {string} 高亮后的文本
     */
    highlightKeyword(text, keyword) {
        if (!text || !keyword) return text;
        
        const regex = new RegExp(keyword, this.config.caseSensitive ? 'g' : 'gi');
        return text.replace(regex, match => `<span class="dc-search-highlight">${match}</span>`);
    }

    /**
     * 清空搜索结果
     * @public
     */
    clearResults() {
        this.resultContainer.innerHTML = '';
    }

    /**
     * 设置搜索数据
     * @public
     * @param {Array} data - 搜索数据
     */
    setData(data) {
        this.config.data = data;
        if (this.currentKeyword) {
            this.search(this.currentKeyword);
        }
    }

    /**
     * 获取当前搜索模式
     * @public
     * @returns {string} 搜索模式
     */
    getSearchMode() {
        return this.config.searchMode;
    }

    /**
     * 设置搜索模式
     * @public
     * @param {string} mode - 搜索模式
     */
    setSearchMode(mode) {
        if (mode === 'fuzzy' || mode === 'exact') {
            this.config.searchMode = mode;
            this.modeToggle.textContent = mode === 'fuzzy' ? '模糊' : '精确';
            if (this.currentKeyword) {
                this.search(this.currentKeyword);
            }
        }
    }
}

// 导出到全局
window.DC = window.DC || {};
window.DC.Search = DCSearch;