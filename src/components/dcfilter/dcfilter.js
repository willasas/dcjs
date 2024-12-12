/**
 * DCFilter 筛选器组件类
 * @class DCFilter
 * @description 一个通用的筛选器组件，支持多级分类筛选、组合查询等功能
 */
class DCFilter {
    /**
     * @private
     * @description 默认配置
     */
    constructor(options = {}) {
        // 默认配置
        const defaultConfig = Object.freeze({
            container: null,           // 容器元素
            data: [],                 // 筛选结果数据源
            categories: [],           // 筛选分类配置
            resultContainer: null,    // 结果容器
            defaultValue: 'all',      // 默认选中值
            multiple: true,           // 是否支持多选
            mobileBreakpoint: 1024,    // 移动端断点
            onFilter: null,           // 筛选回调
            onReset: null,            // 重置回调
            noResultText: '暂无相关内容', // 无结果提示文本
            allText: '全部',           // "全部"选项的文本
            maxSelection: 3,        // 每个分类最多可选数量
            autoCollapse: true,     // 移动端是否自动收起其他展开的分类
            showSelectedCount: true // 是否显示已选数量
        });

        this.config = { ...defaultConfig, ...options };
        this.currentFilters = new Map(); // 当前选中的筛选条件
        this.isMobile = window.innerWidth <= this.config.mobileBreakpoint;
        this.init();
    }

    /**
     * 初始化筛选器
     * @private
     */
    init() {
        this.createElements();
        this.bindEvents();
        this.initDefaultFilters();
    }

    /**
     * 创建DOM元素
     * @private
     */
    createElements() {
        // 创建筛选器容器
        this.container = document.createElement('div');
        this.container.className = 'dc-filter';
        if (this.isMobile) {
            this.container.classList.add('dc-filter-mobile');
        }

        // 创建分类组
        this.config.categories.forEach(category => {
            const categoryGroup = this.createCategoryGroup(category);
            this.container.appendChild(categoryGroup);
        });

        // 添加到指定容器
        const parentElement = this.config.container 
            ? (typeof this.config.container === 'string' 
                ? document.querySelector(this.config.container) 
                : this.config.container)
            : document.body;
            
        parentElement.appendChild(this.container);
    }

    /**
     * 创建分类组
     * @private
     * @param {Object} category - 分类配置
     * @returns {HTMLElement} 分类组元素
     */
    createCategoryGroup(category) {
        const group = document.createElement('div');
        group.className = 'dc-filter-group';
        
        // 创建父级分类
        const parent = document.createElement('div');
        parent.className = 'dc-filter-parent';
        parent.textContent = category.name;

        // 添加展开/折叠图标
        const iconDown = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconDown.setAttribute('class', 'icon icon_down');
        iconDown.setAttribute('width', '100%');
        iconDown.setAttribute('height', '100%');
        iconDown.setAttribute('viewBox', '0 0 48 48');
        iconDown.setAttribute('fill', 'none');
        iconDown.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        iconDown.innerHTML = '<path d="M36 18L24 30L12 18" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>';

        const iconUp = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconUp.setAttribute('class', 'icon icon_up');
        iconUp.setAttribute('width', '100%');
        iconUp.setAttribute('height', '100%');
        iconUp.setAttribute('viewBox', '0 0 48 48');
        iconUp.setAttribute('fill', 'none');
        iconUp.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        iconUp.innerHTML = '<path d="M13 30L25 18L37 30" stroke="#333" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"/>';

        parent.appendChild(iconDown);
        parent.appendChild(iconUp);
        
        // 创建子分类容器
        const children = document.createElement('div');
        children.className = 'dc-filter-children';
        
        // 添加"全部"选项
        const allOption = document.createElement('span');
        allOption.className = 'dc-filter-item active';
        allOption.dataset.value = this.config.defaultValue;
        allOption.dataset.parent = category.key;
        allOption.textContent = this.config.allText;
        children.appendChild(allOption);
        
        // 添加子分类选项
        category.children.forEach(child => {
            const item = document.createElement('span');
            item.className = 'dc-filter-item';
            item.dataset.value = child.value;
            item.dataset.parent = category.key;
            item.textContent = child.name;
            children.appendChild(item);
        });
        
        group.appendChild(parent);
        group.appendChild(children);
        return group;
    }

    /**
     * 绑定事件
     * @private
     */
    bindEvents() {
        // 使用防抖处理窗口resize事件
        const debounce = (fn, delay) => {
            let timer = null;
            return function(...args) {
                if(timer) clearTimeout(timer);
                timer = setTimeout(() => fn.apply(this, args), delay);
            }
        };

        // 移动端父级分类点击事件
        this.container.addEventListener('click', (e) => {
            if (this.isMobile) {
                const parent = e.target.closest('.dc-filter-parent');
                if (parent) {
                    const group = parent.closest('.dc-filter-group');
                    if (group) {
                        // 如果配置了自动收起，则关闭其他展开的分类
                        if (this.config.autoCollapse) {
                            const groups = this.container.querySelectorAll('.dc-filter-group');
                            groups.forEach(g => {
                                if (g !== group && g.classList.contains('expanded')) {
                                    g.classList.remove('expanded');
                                }
                            });
                        }
                        
                        // 切换当前分类的展开状态
                        group.classList.toggle('expanded');
                    }
                    return; // 阻止事件冒泡
                }
            }
        });

        // 筛选项点击事件
        this.container.addEventListener('click', (e) => {
            const item = e.target.closest('.dc-filter-item');
            if (!item) return;

            const parent = item.dataset.parent;
            const value = item.dataset.value;
            this.updateFilter(parent, value, item);
        });

        // 使用防抖处理resize事件
        window.addEventListener('resize', debounce(() => {
            const isMobile = window.innerWidth <= this.config.mobileBreakpoint;
            if (this.isMobile !== isMobile) {
                this.isMobile = isMobile;
                this.container.classList.toggle('dc-filter-mobile', isMobile);
                
                // 切换到PC端时，重置所有展开状态
                if (!isMobile) {
                    const groups = this.container.querySelectorAll('.dc-filter-group');
                    groups.forEach(group => group.classList.remove('expanded'));
                }
            }
        }, 200));
    }

    /**
     * 初始化默认筛选条件
     * @private
     */
    initDefaultFilters() {
        this.config.categories.forEach(category => {
            this.currentFilters.set(category.key, [this.config.defaultValue]);
        });
        this.applyFilters();
    }

    /**
     * 更新筛选条件
     * @private
     * @param {string} parent - 父级分类key
     * @param {string} value - 选中值
     * @param {HTMLElement} item - 选中的元素
     */
    updateFilter(key, value, item) {
      if (!this.config.multiple) {
          // 单选模式
          this.currentFilters.set(key, [value]);
          const items = this.container.querySelectorAll(`[data-parent="${key}"]`);
          items.forEach(i => i.classList.toggle('active', i === item));
      } else {
          // 多选模式
          let values = this.currentFilters.get(key) || [this.config.defaultValue];
          
          if (value === this.config.defaultValue) {
              // 点击"全部"选项
              values = [this.config.defaultValue];
          } else {
              // 检查是否超过最大选择数量
              if (values.length >= this.config.maxSelection && 
                  !values.includes(value) && 
                  !values.includes(this.config.defaultValue)) {
                  console.warn(`每个分类最多选择${this.config.maxSelection}项`);
                  return;
              }

              // 更新选中值
              values = values.filter(v => v !== this.config.defaultValue);
              const index = values.indexOf(value);
              if (index > -1) {
                  values.splice(index, 1);
              } else {
                  values.push(value);
              }
              if (values.length === 0) {
                  values = [this.config.defaultValue];
              }
          }

          this.currentFilters.set(key, values);
          
          // 更新UI
          const items = this.container.querySelectorAll(`[data-parent="${key}"]`);
          items.forEach(i => {
              i.classList.toggle('active', 
                  values.includes(i.dataset.value) || 
                  (values.includes(this.config.defaultValue) && i.dataset.value === this.config.defaultValue)
              );
          });

          // 显示已选数量
          if (this.config.showSelectedCount) {
              const count = values.includes(this.config.defaultValue) ? 0 : values.length;
              const parent = item.closest('.dc-filter-group').querySelector('.dc-filter-parent');
              const countEl = parent.querySelector('.selected-count') || document.createElement('span');
              countEl.className = 'selected-count';
              countEl.textContent = count > 0 ? `(${count})` : '';
              parent.appendChild(countEl);
          }
      }

      // 移动端自动收起其他展开的分类
      if (this.isMobile && this.config.autoCollapse) {
          const currentGroup = item.closest('.dc-filter-group');
          const groups = this.container.querySelectorAll('.dc-filter-group');
          groups.forEach(group => {
              if (group !== currentGroup) {
                  group.classList.remove('expanded');
              }
          });
      }

      this.applyFilters();
    }

    /**
     * 应用筛选条件
     * @private
     */
    applyFilters() {
        const results = this.config.data.filter(item => {
            return Array.from(this.currentFilters.entries()).every(([key, values]) => {
                if (values.includes(this.config.defaultValue)) return true;
                return values.includes(item[key]);
            });
        });

        this.displayResults(results);

        if (typeof this.config.onFilter === 'function') {
            this.config.onFilter(results, Object.fromEntries(this.currentFilters));
        }
    }

    /**
     * 显示筛选结果
     * @private
     * @param {Array} results - 筛选结果
     */
    displayResults(results) {
        if (!this.config.resultContainer) return;

        const container = typeof this.config.resultContainer === 'string'
            ? document.querySelector(this.config.resultContainer)
            : this.config.resultContainer;

        if (!container) return;

        container.innerHTML = '';

        if (results.length === 0) {
            const noResult = document.createElement('div');
            noResult.className = 'dc-filter-no-result';
            noResult.textContent = this.config.noResultText;
            container.appendChild(noResult);
            return;
        }

        // 这里可以自定义结果的展示方式
        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'dc-filter-result-item';
            item.textContent = result.title || result.name;
            container.appendChild(item);
        });
    }

    /**
     * 重置筛选条件
     * @public
     */
    reset() {
        // 重置选中状态
        const items = this.container.querySelectorAll('.dc-filter-item');
        items.forEach(item => {
            item.classList.toggle('active', item.dataset.value === this.config.defaultValue);
        });

        // 置筛选条件
        this.initDefaultFilters();

        if (typeof this.config.onReset === 'function') {
            this.config.onReset();
        }
    }

    /**
     * 获取当前筛选条件
     * @public
     * @returns {Object} 当前筛选条件
     */
    getCurrentFilters() {
        return Object.fromEntries(this.currentFilters);
    }

    /**
     * 设置筛选条件
     * @public
     * @param {Object} filters - 筛选条件
     */
    setFilters(filters) {
        Object.entries(filters).forEach(([key, values]) => {
            if (!Array.isArray(values)) values = [values];
            this.currentFilters.set(key, values);

            // 更新UI
            const items = this.container.querySelectorAll(`[data-parent="${key}"]`);
            items.forEach(item => {
                item.classList.toggle('active', 
                    values.includes(item.dataset.value) || 
                    (values.includes(this.config.defaultValue) && item.dataset.value === this.config.defaultValue)
                );
            });
        });

        this.applyFilters();
    }
}

// 导出到全局
window.DC = window.DC || {};
window.DC.Filter = DCFilter; 
