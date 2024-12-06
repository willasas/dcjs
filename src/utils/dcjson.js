/**
 * 处理JSON相关操作的工具类。
 */
class DCJson {
  /**
   * 检查一个字符串是否是有效的JSON格式。
   * @param {string} str - 需要验证的字符串
   * @returns {boolean} 如果输入字符串是有效的JSON格式，则返回true；否则返回false，并在控制台输出相应的错误信息。
   */
  static isValidJSON(str) {
    if (typeof str !== 'string') {
      console.error('Expected a string as input.');
      return false;
    }

    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.error('Invalid JSON syntax:', e);
        return false;
      } else {
        console.error('An unexpected error occurred:', e);
        return false;
      }
    }
  }

  /**
   * 将JSON对象数组转换为CSV格式字符串。
   * @param {Array<Object>} data - 要转换为CSV的数据源，每个元素是一个包含属性名与值的对象。
   * @param {Array<string>} columns - CSV文件中的列名列表，必须与数据对象中的属性名称相对应。
   * @param {string} [delimiter=','] - 分隔符，默认为逗号 ','。
   * @returns {string} 返回转换后的CSV格式字符串。
   */
  static jsonToCsv(data, columns, delimiter = ',') {
    if (!Array.isArray(data) || !Array.isArray(columns) || typeof delimiter !== 'string') {
      throw new Error('Invalid input parameters');
    }

    if (columns.length === 0) {
      throw new Error('Columns array must not be empty');
    }

    const escapeCSVValue = (value) => {
      if (value === null || value === undefined) {
        return '';
      }
      return `"${value.toString().replace(/"/g, '""')}"`;
    };

    const headerRow = columns.join(delimiter);
    const rows = data.map(obj => {
      return columns.reduce((acc, key) => {
        const value = obj[key] !== undefined ? obj[key] : '';
        return `${acc}${acc.length ? delimiter : ''}${escapeCSVValue(value)}`;
      }, '');
    });

    return [headerRow, ...rows].join('\n');
  }

  /**
   * 合并多个JSON对象。
   * @param {...Object} jsonObjects - 需要合并的JSON对象。
   * @returns {Object} 返回合并后的JSON对象。
   */
  static mergeJsonObjects(...jsonObjects) {
    return Object.assign({}, ...jsonObjects);
  }

  /**
   * 深拷贝一个JSON对象。
   * @param {Object} jsonObject - 需要拷贝的JSON对象。
   * @returns {Object} 返回深拷贝后的JSON对象。
   */
  static deepCopyJson(jsonObject) {
    return JSON.parse(JSON.stringify(jsonObject));
  }
}

window.DC = window.DC || {};
window.DC.Json = DCJson;