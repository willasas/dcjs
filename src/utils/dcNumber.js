/**
 * 数字处理工具类
 */
class dcNumber {
    constructor() {}

    /**
     * 格式化数字
     * @param {number} num - 需要格式化的数字
     * @param {number} [decimals=2] - 小数位数
     * @param {string} [decPoint='.'] - 小数点符号
     * @param {string} [thousandsSep=','] - 千分位分隔符
     * @returns {string} 格式化后的数字字符串
     */
    static format(num, decimals = 2, decPoint = '.', thousandsSep = ',') {
        num = Number(num);
        if (isNaN(num)) return '0';

        num = num.toFixed(decimals);
        const parts = num.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);

        return parts.join(decPoint);
    }

    /**
     * 将数字转换为中文大写金额
     * @param {number} num - 数字
     * @returns {string} 中文大写金额
     */
    static toChinese(num) {
        const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        const units = ['', '拾', '佰', '仟'];
        const bigUnits = ['', '万', '亿', '兆'];
        const decUnits = ['角', '分'];

        if (isNaN(num)) return '零元整';
        if (num === 0) return '零元整';

        let strNum = Math.abs(num).toFixed(2);
        let integerPart = Math.floor(num).toString();
        let decimalPart = strNum.slice(-2);

        // 处理整数部分
        let result = '';
        let zeroCount = 0;
        let bigUnitIndex = 0;

        while (integerPart.length > 0) {
            const section = integerPart.slice(-4);
            integerPart = integerPart.slice(0, -4);

            let sectionResult = '';
            for (let i = 0; i < section.length; i++) {
                const digit = parseInt(section[i]);
                if (digit === 0) {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) sectionResult += '零';
                    zeroCount = 0;
                    sectionResult += digits[digit] + units[section.length - 1 - i];
                }
            }

            if (sectionResult) {
                result = sectionResult + bigUnits[bigUnitIndex] + result;
            }
            bigUnitIndex++;
        }

        result += '元';

        // 处理小数部分
        if (decimalPart === '00') {
            result += '整';
        } else {
            for (let i = 0; i < 2; i++) {
                const digit = parseInt(decimalPart[i]);
                if (digit !== 0) {
                    result += digits[digit] + decUnits[i];
                }
            }
        }

        return num < 0 ? `负${result}` : result;
    }

    /**
     * 数字精确计算
     * @param {number} num1 - 第一个数
     * @param {number} num2 - 第二个数
     * @param {string} operation - 运算类型（add|subtract|multiply|divide）
     * @returns {number} 计算结果
     */
    static calculate(num1, num2, operation) {
        const precision = 1e10;
        const n1 = Math.round(num1 * precision);
        const n2 = Math.round(num2 * precision);

        switch (operation) {
            case 'add':
                return (n1 + n2) / precision;
            case 'subtract':
                return (n1 - n2) / precision;
            case 'multiply':
                return (n1 * n2) / (precision * precision);
            case 'divide':
                if (n2 === 0) throw new Error('除数不能为零');
                return n1 / n2;
            default:
                throw new Error('不支持的运算类型');
        }
    }

    /**
     * 数字范围限制
     * @param {number} num - 数字
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @returns {number} 限制后的数字
     */
    static clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }

    /**
     * 计算平方根
     * @param {number} num - 要计算平方根的数字
     * @returns {number} 平方根
     */
    static sqrt(num) {
        if (typeof num !== 'number' || num < 0) {
            throw new Error('Input must be a non-negative number');
        }
        return Math.sqrt(num);
    }

    /**
     * 生成指定范围内的随机数
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @param {boolean} [isInteger=false] - 是否为整数
     * @returns {number} 随机数
     */
    static random(min, max, isInteger = false) {
        const rand = Math.random() * (max - min) + min;
        return isInteger ? Math.floor(rand) : rand;
    }

    /**
     * 数字补零
     * @param {number} num - 数字
     * @param {number} length - 目标长度
     * @returns {string} 补零后的字符串
     */
    static pad(num, length) {
        return String(num).padStart(length, '0');
    }

    /**
     * 判断是否为整数
     * @param {number} num - 数字
     * @returns {boolean} 是否为整数
     */
    static isInteger(num) {
        return Number.isInteger(num);
    }

    /**
     * 计算百分比
     * @param {number} num - 数字
     * @param {number} total - 总数
     * @param {number} [decimals=2] - 小数位数
     * @returns {string} 百分比字符串
     */
    static percentage(num, total, decimals = 2) {
        if (total === 0) return '0%';
        return (num / total * 100).toFixed(decimals) + '%';
    }

    /**
     * 数字转换为文件大小
     * @param {number} bytes - 字节数
     * @param {number} [decimals=2] - 小数位数
     * @returns {string} 文件大小字符串
     */
    static toFileSize(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
    }

    /**
     * 数字四舍五入
     * @param {number} num - 数字
     * @param {number} decimals - 小数位数
     * @returns {number} 四舍五入后的数字
     */
    static round(num, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round(num * factor) / factor;
    }

    /**
     * 数字转换为罗马数字
     * @param {number} num - 数字（1-3999）
     * @returns {string} 罗马数字
     */
    static toRoman(num) {
        if (num < 1 || num > 3999) return '';

        const roman = {
            M: 1000, CM: 900, D: 500, CD: 400,
            C: 100, XC: 90, L: 50, XL: 40,
            X: 10, IX: 9, V: 5, IV: 4, I: 1
        };

        let result = '';
        for (const key in roman) {
            while (num >= roman[key]) {
                result += key;
                num -= roman[key];
            }
        }

        return result;
    }

    /**
     * 判断是否为质数
     * @param {number} num - 数字
     * @returns {boolean} 是否为质数
     */
    static isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;

        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }

        return true;
    }

    /**
     * 计算阶乘
     * @param {number} num - 数字
     * @returns {number} 阶乘结果
     */
    static factorial(num) {
        if (num < 0) return NaN;
        if (num === 0) return 1;

        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }

        return result;
    }
}

window.DC = window.DC || {};
window.DC.Number = dcNumber;