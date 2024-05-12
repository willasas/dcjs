// json 相关

/**
 * 检查一个字符串是否是有效的JSON格式。
 * @param {string} str - 需要验证的字符串
 * @returns {boolean} 如果输入字符串是有效的JSON格式，则返回true；否则返回false，并在控制台输出相应的错误信息。
 */
const isValidJSON = str => {
  // 增加输入参数类型检查，确保str是一个字符串
  if (typeof str !== 'string') {
    console.error('Expected a string as input.');
    return false;
  }

  try {
    // 使用JSON.parse验证字符串是否是有效的JSON
    JSON.parse(str);
    return true;
  } catch (e) {
    // 如果抛出异常，确认是由于JSON语法错误导致的
    if (e instanceof SyntaxError) {
      console.error('Invalid JSON syntax:', e);
      return false;
    } else {
      // 输出其他类型的错误，可能是JSON.parse以外的问题引起的
      console.error('An unexpected error occurred:', e);
      return false;
    }
  }
};

// 测试用例保持不变
console.log(isValidJSON('{"name":"Adam","age":20}')); // true
console.log(isValidJSON('{"name":"Adam",age:"20"}')); // false
console.log(isValidJSON(null)); // 现在将返回 false，并输出错误信息



/**
 * 将JSON对象数组转换为CSV格式字符串。
 *
 * @param {Array<Object>} data - 要转换为CSV的数据源，每个元素是一个包含属性名与值的对象。
 * @param {Array<string>} columns - CSV文件中的列名列表，必须与数据对象中的属性名称相对应。
 * @param {string} [delimiter=','] - 分隔符，默认为逗号 ','。
 * @returns {string} 返回转换后的CSV格式字符串。
 */
const jsonToCsv = (data, columns, delimiter = ',') => {
  // 输入参数验证
  if (!Array.isArray(data) || !Array.isArray(columns) || typeof delimiter !== 'string') {
    throw new Error('Invalid input parameters');
  }
  
  if (columns.length === 0) {
    throw new Error('Columns array must not be empty');
  }
  
  /**
   * 转义并封装CSV值，以确保特殊字符（如引号和换行符）被正确转义。
   *
   * @param {*} value - 需要转义并封装到引号中的值。
   * @returns {string} 返回转义后且封装在引号内的CSV值。
   */
  const escapeCSVValue = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    // 转义引号和换行符，这是CSV文件的常见要求
    return `"${value.toString().replace(/"/g, '""')}"`;
  };
  
  // 列表头部
  const headerRow = columns.join(delimiter);
  
  // 数据行处理
  const rows = data.map(obj => {
    return columns.reduce((acc, key) => {
      const value = obj[key] !== undefined ? obj[key] : ''; // 处理缺失的属性
      return `${acc}${acc.length ? delimiter : ''}${escapeCSVValue(value)}`;
    }, '');
  });
  
  // 合并头行和数据行，生成最终CSV字符串
  return [headerRow, ...rows].join('\n');
};

// 测试用例
console.log(jsonToCsv([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'])); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
console.log(jsonToCsv([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';')); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'



/**
 * 将JSON对象转换为文件。
 * @param {Object} data - 要转换为文件的对象。
 * @param {string} fileName - 文件名。
 * @param {string} [mimeType='application/json'] - 文件类型，默认为'application/json'。
 * @returns {string} 返回文件的URL。
 * 
*/
// 假设我们有一个JSON对象要转换成文件
var jsonData = {
  "key1": "value1",
  "key2": "value2"
};

// 将JSON对象转换为字符串形式
var jsonStr = JSON.stringify(jsonData, null, 2); // 第二个参数null表示不替换函数，默认情况下，第三个参数用于美化输出，这里是缩进2个空格

// 创建一个新的Blob对象，类型设置为'application/json'
var blob = new Blob([jsonStr], { type: 'application/octet-stream' }); // 对于.json文件，可以考虑使用'application/json'或'application/octet-stream'

// 创建一个URL指向Blob对象
var downloadUrl = URL.createObjectURL(blob);

// 创建隐藏的可下载链接
var aLink = document.createElement('a');
aLink.href = downloadUrl;
aLink.download = 'data.json'; // 设置下载后的文件名
document.body.appendChild(aLink); // 需要在DOM树中添加该元素以触发点击事件

// 触发点击下载
aLink.click();

// 下载完成后释放内存
setTimeout(function() {
  URL.revokeObjectURL(downloadUrl);
  document.body.removeChild(aLink);
}, 0);



/**
 * 将多个URL部分连接成一个完整的URL字符串。
 * @param {...string} args - 一个或多个URL部分，可以包括基本URL、路径和查询参数（查询参数需以'?'开头）。
 * @returns {string} 连接后的完整URL字符串。
 */
const URLJoin = (...args) => {
  // 初始化一个URL对象作为基础URL
  const base = new URL('http://localhost');
  
  // 遍历所有传入的URL部分，并添加到基础URL的路径中
  args.forEach((part, index) => {
    if (!part.startsWith('?')) {
      base.pathname += `/${part}`;
    } else {
      // 当遇到查询参数时，从当前部分提取并累积查询参数
      const queryParams = part.slice(1).split('&');
      if (index === 0) {
        // 如果查询参数在第一个位置，则直接应用
        base.search = new URLSearchParams(queryParams).toString();
      } else {
        // 否则将它们合并到现有的查询参数中
        const currentSearchParams = new URLSearchParams(base.search);
        queryParams.forEach(param => currentSearchParams.append(...param.split('=')));
        base.search = currentSearchParams.toString();
      }
    }
  });

  // 返回最终构建好的URL字符串
  return base.toString();
};

console.log(URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'));
// 输出：http://www.google.com/a/b/cd?foo=123&bar=foo



/**
 * 当页面完全加载后执行的操作：从服务器获取并解析 JSON 数据，然后处理数据。
 */
window.addEventListener('load', function() {
  const url = "common.json"; // 定义要请求的JSON文件的URL
  // 使用fetch函数发起HTTP请求获取数据
  fetch(url)
    .then(response => {
      // 检查HTTP响应状态
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // 如果响应状态不是2xx，则抛出错误
      }
      // 将响应内容解析为JSON格式
      return response.json();
    })
    .then(json => {
      // 成功解析JSON后，调用logJsonData函数处理数据
      logJsonData(json);
    })
    .catch(error => {
      // 处理网络请求或JSON解析中的异常
      console.error('There was a problem with the fetch operation:', error);
    });
});



/**
 * 处理并打印JSON数据的函数。
 * @param {Object[]} json - 包含多个对象的JSON数组。
 */
function logJsonData(json) {
  // 遍历数组并打印每个对象的name属性
  for (let i = 0; i < json.length; i++) {
    console.log(json[i].name);
  }
  // 打印整个JSON对象
  console.log(json);
}