/**
 * 日期时间工具类
 */
class dcDate {
    constructor() {}

    /**
     * 格式化日期
     * @param {Date|string|number} date - 日期对象、字符串或时间戳
     * @param {string} format - 格式字符串
     * @returns {string} 格式化后的日期字符串
     */
    static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
        const d = this.parseDate(date);
        if (!d) return '';

        const tokens = {
            'Y+': d.getFullYear(),
            'M+': d.getMonth() + 1,
            'D+': d.getDate(),
            'H+': d.getHours(),
            'h+': d.getHours() % 12 || 12,
            'm+': d.getMinutes(),
            's+': d.getSeconds(),
            'S+': d.getMilliseconds(),
            'Q+': Math.floor((d.getMonth() + 3) / 3),
            'W': ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
        };

        for (const key in tokens) {
            if (new RegExp(`(${key})`).test(format)) {
                const value = tokens[key].toString();
                format = format.replace(RegExp.$1,
                    RegExp.$1.length === 1 ? value : value.padStart(RegExp.$1.length, '0')
                );
            }
        }

        return format;
    }

    /**
     * 解析日期
     * @param {Date|string|number} date - 日期对象、字符串或时间戳
     * @returns {Date|null} 日期对象
     */
    static parseDate(date) {
        if (!date) return null;
        if (date instanceof Date) return date;
        if (typeof date === 'number') return new Date(date);
        if (typeof date === 'string') {
            // 尝试解析多种日期格式
            const formats = [
                /^\d{4}-\d{1,2}-\d{1,2}$/,                     // YYYY-MM-DD
                /^\d{4}\/\d{1,2}\/\d{1,2}$/,                   // YYYY/MM/DD
                /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}$/,    // YYYY-MM-DD HH:mm
                /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/, // YYYY-MM-DD HH:mm:ss
                /^\d{4}年\d{1,2}月\d{1,2}日$/                  // YYYY年MM月DD日
            ];

            const cleanDate = date.trim();
            for (const format of formats) {
                if (format.test(cleanDate)) {
                    const d = new Date(cleanDate.replace(/年|月|日/g, '/'));
                    if (!isNaN(d.getTime())) return d;
                }
            }
        }
        return null;
    }

    /**
     * 获取相对时间描述
     * @param {Date|string|number} date - 日期对象、字符串或时间戳
     * @param {Date} [baseDate=new Date()] - 基准日期
     * @returns {string} 相对时间描述
     */
    static getRelativeTime(date, baseDate = new Date()) {
        const d = this.parseDate(date);
        if (!d) return '';

        const base = this.parseDate(baseDate);
        const diff = base.getTime() - d.getTime();
        const absDiff = Math.abs(diff);
        const future = diff < 0;

        const units = [
            { value: 365 * 24 * 60 * 60 * 1000, unit: '年' },
            { value: 30 * 24 * 60 * 60 * 1000, unit: '个月' },
            { value: 7 * 24 * 60 * 60 * 1000, unit: '周' },
            { value: 24 * 60 * 60 * 1000, unit: '天' },
            { value: 60 * 60 * 1000, unit: '小时' },
            { value: 60 * 1000, unit: '分钟' },
            { value: 1000, unit: '秒' }
        ];

        for (const { value, unit } of units) {
            if (absDiff >= value) {
                const amount = Math.floor(absDiff / value);
                return `${future ? amount : amount}${unit}${future ? '后' : '前'}`;
            }
        }

        return '刚刚';
    }

    /**
     * 获取日期范围
     * @param {string} range - 范围类型
     * @param {Date} [date=new Date()] - 基准日期
     * @returns {[Date, Date]} 日期范围
     */
    static getDateRange(range, date = new Date()) {
        const d = this.parseDate(date);
        if (!d) return [null, null];

        const startDate = new Date(d);
        const endDate = new Date(d);

        switch (range.toLowerCase()) {
            case 'today':
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'yesterday':
                startDate.setDate(d.getDate() - 1);
                startDate.setHours(0, 0, 0, 0);
                endDate.setDate(d.getDate() - 1);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'thisweek':
                startDate.setDate(d.getDate() - d.getDay());
                startDate.setHours(0, 0, 0, 0);
                endDate.setDate(startDate.getDate() + 6);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'thismonth':
                startDate.setDate(1);
                startDate.setHours(0, 0, 0, 0);
                endDate.setMonth(d.getMonth() + 1, 0);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'thisyear':
                startDate.setMonth(0, 1);
                startDate.setHours(0, 0, 0, 0);
                endDate.setMonth(11, 31);
                endDate.setHours(23, 59, 59, 999);
                break;
            default:
                return [null, null];
        }

        return [startDate, endDate];
    }

    /**
     * 添加时间
     * @param {Date|string|number} date - 日期对象、字符串或时间戳
     * @param {number} amount - 添加的数量
     * @param {string} unit - 单位（years|months|days|hours|minutes|seconds）
     * @returns {Date} 新的日期对象
     */
    static add(date, amount, unit) {
        const d = this.parseDate(date);
        if (!d) return null;

        const newDate = new Date(d);
        switch (unit.toLowerCase()) {
            case 'years':
                newDate.setFullYear(d.getFullYear() + amount);
                break;
            case 'months':
                newDate.setMonth(d.getMonth() + amount);
                break;
            case 'days':
                newDate.setDate(d.getDate() + amount);
                break;
            case 'hours':
                newDate.setHours(d.getHours() + amount);
                break;
            case 'minutes':
                newDate.setMinutes(d.getMinutes() + amount);
                break;
            case 'seconds':
                newDate.setSeconds(d.getSeconds() + amount);
                break;
        }

        return newDate;
    }

    /**
     * 计算两个日期之间的差异
     * @param {Date|string|number} date1 - 第一个日期
     * @param {Date|string|number} date2 - 第二个日期
     * @param {string} unit - 单位（years|months|days|hours|minutes|seconds）
     * @returns {number} 差异值
     */
    static diff(date1, date2, unit) {
        const d1 = this.parseDate(date1);
        const d2 = this.parseDate(date2);
        if (!d1 || !d2) return null;

        const diffMs = d2.getTime() - d1.getTime();
        switch (unit.toLowerCase()) {
            case 'years':
                return d2.getFullYear() - d1.getFullYear();
            case 'months':
                return (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
            case 'days':
                return Math.floor(diffMs / (24 * 60 * 60 * 1000));
            case 'hours':
                return Math.floor(diffMs / (60 * 60 * 1000));
            case 'minutes':
                return Math.floor(diffMs / (60 * 1000));
            case 'seconds':
                return Math.floor(diffMs / 1000);
            default:
                return diffMs;
        }
    }

    /**
     * 判断是否为闰年
     * @param {number} year - 年份
     * @returns {boolean} 是否为闰年
     */
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    /**
     * 获取月份的天数
     * @param {number} year - 年份
     * @param {number} month - 月份（1-12）
     * @returns {number} 天数
     */
    static getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    /**
     * 获取日期是一年中的第几周
     * @param {Date|string|number} date - 日期对象、字符串或时间戳
     * @returns {number} 周数
     */
    static getWeekOfYear(date) {
        const d = this.parseDate(date);
        if (!d) return null;

        const start = new Date(d.getFullYear(), 0, 1);
        const diff = d - start + (start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000;
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.floor(diff / oneWeek) + 1;
    }

    /**
     * 获取两个日期之间的所有日期
     * @param {Date|string|number} startDate - 开始日期
     * @param {Date|string|number} endDate - 结束日期
     * @returns {Date[]} 日期数组
     */
    static getDatesBetween(startDate, endDate) {
        const start = this.parseDate(startDate);
        const end = this.parseDate(endDate);
        if (!start || !end) return [];

        const dates = [];
        const current = new Date(start);

        while (current <= end) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return dates;
    }

    /**
     * 获取日期的季度
     * @param {Date|string|number} date - 日期对象、字符串或时间戳
     * @returns {number} 季度（1-4）
     */
    static getQuarter(date) {
        const d = this.parseDate(date);
        if (!d) return null;
        return Math.floor(d.getMonth() / 3) + 1;
    }

    /**
     * 创建日期时间选择器
     * @param {HTMLElement} container - 容器元素
     * @param {Object} options - 配置选项
     * @returns {Object} 日期时间选择器对象
     */
    static createDatePicker(container, options = {}) {
        const defaultOptions = {
            format: 'YYYY-MM-DD',
            defaultDate: new Date(),
            minDate: null,
            maxDate: null,
            onChange: null
        };

        const config = { ...defaultOptions, ...options };
        const picker = document.createElement('div');
        picker.className = 'dc-datepicker';
        container.appendChild(picker);

        // 实现日期选择器的UI和交互逻辑
        // ...

        return {
            getValue() {
                // 获取选中的日期
            },
            setValue(date) {
                // 设置日期
            },
            destroy() {
                // 销毁选择器
                container.removeChild(picker);
            }
        };
    }
}
window.dcDate = new dcDate();