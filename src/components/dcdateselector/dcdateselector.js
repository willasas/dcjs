/**
 * 日期选择器类
 */
class DCDateSelector {
    /**
     * 构造函数
     * @param {Object} options - 配置选项
     * @param {HTMLElement} [options.container=document.body] - 容器元素
     * @param {Function} [options.onSelect=() => {}] - 选择回调函数
     */
    constructor(options = {}) {
        // 配置参数
        this.container = options.container || document.body;
        this.onSelect = options.onSelect || function() {};

        // 初始化日期数据
        this.initDateData();

        // 生成DOM结构
        this.render();

        // 创建样式
        this.createStyle();

        // 绑定事件
        this.bindEvents();
    }

    /**
     * 初始化日期数据
     */
    initDateData() {
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth() + 1;
        this.currentDay = today.getDate();

        // 生成年份列表（1900-当前年+20年）
        const startYear = 1900;
        const endYear = this.currentYear + 20;
        this.years = Array.from(
            { length: endYear - startYear + 1 },
            (_, i) => startYear + i
        );

        // 月份列表（1-12月）
        this.months = Array.from({ length: 12 }, (_, i) => i + 1);

        // 日期列表（根据当前年月动态计算）
        this.days = this.generateDays(this.currentYear, this.currentMonth);
    }

    /**
     * 生成日期列表（根据年月动态计算）
     * @param {number} year - 年份
     * @param {number} month - 月份
     * @returns {number[]} 日期列表
     */
    generateDays(year, month) {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }

    // 渲染组件
    render() {
        // 创建DOM结构
        this.element = document.createElement('div');
        this.element.className = 'dc-date-selector';
        this.element.innerHTML = `
            <div class="picker-wrapper">
                <select class="picker-select years"></select>
                <select class="picker-select months"></select>
                <select class="picker-select days"></select>
            </div>
        `;

        // 填充年份下拉选项
        this.populateSelect('.years', this.years, '年', this.currentYear);

        // 填充月份下拉选项
        this.populateSelect('.months', this.months, '月', this.currentMonth);

        // 填充日期下拉选项
        this.populateSelect('.days', this.days, '日', this.currentDay);

        this.container.appendChild(this.element);

        // 高亮初始选择
        this.highlightSelectedItems();
    }

    createStyle() {
      const cssRules = `
        .dc-date-selector { position: relative; width: 100%; height: auto; box-sizing: border-box; padding: 10px 4px; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
        .dc-date-selector .picker-wrapper { display: flex; gap: 10px; justify-content: space-between; }
        .dc-date-selector .picker-select { flex: 1; height: 40px; padding: 5px; font-size: 16px; border: 1px solid #ddd; border-radius: 4px; outline: none; transition: border-color 0.3s, box-shadow 0.3s; }
        .dc-date-selector .picker-select:focus { border-color: #1890ff; box-shadow: 0 0 4px rgba(24, 144, 255, 0.3); }
        .dc-date-selector .picker-select option { padding: 5px; }
      `;
      const style = document.createElement('style');
      style.innerHTML = cssRules;
      document.head.appendChild(style);
    }

    /**
     * 填充下拉框选项
     * @param {string} selector - 选择器
     * @param {number[]} values - 值列表
     * @param {string} suffix - 后缀
     * @param {number} initialValue - 初始值
     */
    populateSelect(selector, values, suffix, initialValue) {
        const selectElement = this.element.querySelector(selector);
        selectElement.innerHTML = values.map(value => `
            <option value="${value}">${value}${suffix}</option>
        `).join('');
        selectElement.value = initialValue;
    }

    // 绑定事件
    bindEvents() {
        const yearSelect = this.element.querySelector('.years');
        const monthSelect = this.element.querySelector('.months');
        const daySelect = this.element.querySelector('.days');

        // 统一处理下拉框变化事件
        const handleSelectChange = (event) => {
            const target = event.target;
            if (target.classList.contains('years')) {
                this.currentYear = parseInt(target.value, 10);
            } else if (target.classList.contains('months')) {
                this.currentMonth = parseInt(target.value, 10);
            } else if (target.classList.contains('days')) {
                this.currentDay = parseInt(target.value, 10);
            }
            this.updateDays();
            this.triggerSelection();
        };

        yearSelect.addEventListener('change', handleSelectChange);
        monthSelect.addEventListener('change', handleSelectChange);
        daySelect.addEventListener('change', handleSelectChange);
    }

    /**
     * 更新日期选项
     */
    updateDays() {
        const yearSelect = this.element.querySelector('.years');
        const monthSelect = this.element.querySelector('.months');
        const daySelect = this.element.querySelector('.days');

        const selectedYear = parseInt(yearSelect.value, 10);
        const selectedMonth = parseInt(monthSelect.value, 10);
        const newDays = this.generateDays(selectedYear, selectedMonth);

        daySelect.innerHTML = newDays.map(d => `
            <option value="${d}">${d}日</option>
        `).join('');

        // 如果当前日期超出范围，重置为最大值
        if (this.currentDay > newDays.length) {
            this.currentDay = newDays[newDays.length - 1];
        }
        daySelect.value = this.currentDay;
    }

    // 触发选择回调
    triggerSelection() {
        const selectedDate = new Date(this.currentYear, this.currentMonth - 1, this.currentDay);
        this.onSelect({
            year: this.currentYear,
            month: this.currentMonth,
            day: this.currentDay,
            date: selectedDate
        });
    }

    /**
     * 获取选中日期
     * @returns {Object} 选中日期对象
     */
    getSelectedDate() {
        return {
            year: this.currentYear,
            month: this.currentMonth,
            day: this.currentDay,
            date: new Date(this.currentYear, this.currentMonth - 1, this.currentDay)
        };
    }

    /**
     * 高亮显示当前选中的年月日
     */
    highlightSelectedItems() {
        const yearSelect = this.element.querySelector('.years');
        const monthSelect = this.element.querySelector('.months');
        const daySelect = this.element.querySelector('.days');

        yearSelect.value = this.currentYear;
        monthSelect.value = this.currentMonth;
        daySelect.value = this.currentDay;
    }
}

// 全局导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DCDateSelector;
} else {
    window.DC = window.DC || {};
    window.DC.DateSelector = DCDateSelector;
}