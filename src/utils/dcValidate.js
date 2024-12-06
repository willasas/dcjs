/**
 * 验证工具类
 */
class dcValidate {
    constructor() {}

    /**
     * 判断是否为空
     * @param {*} value - 要检查的值
     * @returns {boolean} - 如果为空返回true，否则返回false
     */
    static isEmpty(value) {
        return value === undefined || value === null || value === '' ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'object' && Object.keys(value).length === 0);
    }

    /**
     * 判断是否为数字
     * @param {*} value - 要检查的值
     * @returns {boolean} - 如果是数字返回true，否则返回false
     */
    static isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    /**
     * 判断是否为整数
     * @param {*} value - 要检查的值
     * @returns {boolean} - 如果是整数返回true，否则返回false
     */
    static isInteger(value) {
        return Number.isInteger(value);
    }

    /**
     * 验证是否为有效的手机号码
     * @param {string} phone - 要验证的手机号码
     * @returns {boolean} 如果是有效的手机号码，则为 true
     */
    static isPhone(phone) {
        const phonePattern = /^\+?[1-9]\d{1,14}$/; // 适用于国际格式的手机号码
        return phonePattern.test(phone);
    }

    /**
     * 验证是否为有效的电子邮件地址
     * @param {string} email - 要验证的电子邮件地址
     * @returns {boolean} 如果是有效的电子邮件地址，则为 true
     */
    static isEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    /**
     * 判断是否为URL
     * @param {string} value - 要检查的URL
     * @returns {boolean} - 如果是有效的URL返回true，否则返回false
     */
    static isUrl(value) {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 判断是否为身份证号
     * @param {string} value - 要检查的身份证号
     * @returns {boolean} - 如果是有效的身份证号返回true，否则返回false
     */
    static isIdCard(value) {
        return /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(value);
    }

    /**
     * 判断是否为日期
     * @param {*} value - 要检查的值
     * @returns {boolean} - 如果是有效的日期返回true，否则返回false
     */
    static isDate(value) {
        if (value instanceof Date) return !isNaN(value);
        if (typeof value === 'string') {
            const date = new Date(value);
            return !isNaN(date);
        }
        return false;
    }

    /**
     * 判断是否为对象
     * @param {*} value - 要检查的值
     * @returns {boolean} - 如果是对象返回true，否则返回false
     */
    static isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    /**
     * 判断是否为数组
     * @param {*} value - 要检查的值
     * @returns {boolean} - 如果是数组返回true，否则返回false
     */
    static isArray(value) {
        return Array.isArray(value);
    }

    /**
     * 判断字符串长度是否在指定范围内
     * @param {string} value - 要检查的字符串
     * @param {number} min - 最小长度
     * @param {number} max - 最大长度
     * @returns {boolean} - 如果在范围内返回true，否则返回false
     */
    static isLengthBetween(value, min, max) {
        if (typeof value !== 'string') return false;
        const length = value.length;
        return length >= min && length <= max;
    }

    /**
     * 判断是否为中文字符
     * @param {string} value - 要检查的字符串
     * @returns {boolean} - 如果是中文字符返回true，否则返回false
     */
    static isChinese(value) {
        return /^[\u4e00-\u9fa5]+$/.test(value);
    }

    /**
     * 判断是否为密码（至少包含数字和字母，长度8-16位）
     * @param {string} value - 要检查的密码
     * @returns {boolean} - 如果是有效的密码返回true，否则返回false
     */
    static isPassword(value) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value);
    }
};

window.DC = window.DC || {};
window.DC.Validate = dcValidate;
