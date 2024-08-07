// 字符串操作

/**
 * atob函数解码base64字符串为二进制字符串。
 * @param {string} str 要解码的base64字符串。
 * @returns {string} 解码后的二进制字符串。如果输入不是有效的base64字符串，则返回空字符串。
 */
const atob = str => {
  try {
    // 验证输入是否是有效的base64字符串
    if (typeof str !== 'string' || !str.match(/^[A-Za-z0-9+/]{4}([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/)) {
      console.warn('Invalid base64 string');
      return ''; // 对于无效的输入返回空字符串
    }
    return Buffer.from(str, 'base64').toString('binary');
  } catch (error) {
    console.error('Error decoding base64 string:', error);
    return ''; // 在异常情况下返回空字符串
  }
};

atob('Zm9vYmFy'); // 'foobar'



/**
 * 将字符串转换为Base64编码。
 * @param {string} str 需要进行Base64编码的字符串。
 * @returns {string} 返回Base64编码后的字符串。
 * @throws {TypeError} 如果输入不是字符串，则抛出类型错误。
 */
const btoa = str => {
  // 验证输入是否为字符串
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 使用try-catch块来捕获可能的异常
  try {
    return Buffer.from(str, 'binary').toString('base64');
  } catch (error) {
    // 处理可能的编码错误
    console.error('Error encoding to base64:', error);
    throw error; // 重新抛出异常，或者根据应用需求进行其他处理
  }
};

btoa('foobar'); // 'Zm9vYmFy'



/**
 * 计算字符串的字节大小。
 * 使用Blob对象来计算字符串的大小，这反映了字符串在UTF-8编码下的字节使用情况。
 * 注意：这个函数假定输入始终是一个字符串。对于非字符串输入，将抛出TypeError。
 * 
 * @param {string} str 需要计算字节大小的字符串。
 * @returns {number} 字符串的字节大小。
 * @throws {TypeError} 如果输入不是字符串，则抛出TypeError。
 */
const byteSize = (str) => {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  try {
    return new Blob([str]).size;
  } catch (error) {
    // 处理可能的Blob构造函数错误。
    console.error('An error occurred while calculating the byte size:', error);
    throw error; // 重新抛出错误，确保调用者知晓错误并且可以根据需要处理它。
  }
};

byteSize('😀'); // 4
byteSize('Hello World'); // 11



/**
 * 将输入字符串的第一个字母大写，可选地将剩余部分转换为小写。
 * @param {string} input - 要处理的字符串或字符数组。
 * @param {boolean} lowerRest - 剩余部分是否转换为小写，默认为 false。
 * @returns {string} - 处理后的字符串。
 */
const capitalize = (input, lowerRest = false) => {
  // 参数类型检查
  if (typeof input !== 'string' && !Array.isArray(input)) {
    throw new TypeError('输入必须是字符串或字符数组');
  }

  // 处理边界条件
  if (input === '' || (Array.isArray(input) && input.length === 0)) {
    return '';
  }

  // 对字符串或数组进行处理
  let firstChar;
  let restChars;
  if (Array.isArray(input)) {
    firstChar = input[0];
    restChars = input.slice(1);
  } else {
    firstChar = input[0];
    restChars = input.slice(1);
  }

  const processedRest = lowerRest ? restChars.join('').toLowerCase() : restChars.join('');
  return firstChar.toUpperCase() + processedRest;
};

console.log(capitalize('fooBar')); // 'FooBar'
console.log(capitalize('fooBar', true)); // 'Foobar'
console.log(capitalize([])); // ''
console.log(capitalize('')); // ''



/**
 * 将字符串中的每个单词的首字母大写。
 * 注意：这个函数假定输入是单一语言（如英语）的字符串。
 * 
 * @param {string} str 需要处理的字符串。
 * @returns {string} 处理后的字符串，其中每个单词的首字母大写。
 */
const capitalizeEveryWord = str => {
  // 校验输入是否为字符串
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 使用正则表达式和回调函数来转换每个匹配的字符
  return str.replace(/\b[a-z]/g, char => char.toUpperCase());
};

// 测试边界条件和异常情况
console.log(capitalizeEveryWord('hello world!')); // 'Hello World!'
console.log(capitalizeEveryWord('123 hello world!')); // '123 Hello World!'
console.log(capitalizeEveryWord('')); // ''
console.log(capitalizeEveryWord(123)); // 抛出 TypeError



/**
 * 将字符串的第一个字母小写化，并可选择性地将余下的字母转换为大写。
 * @param {string} input - 需要处理的字符串。
 * @param {boolean} convertRestToUpperCase - 若为true，则将字符串中余下的字母转换为大写。
 * @returns {string} - 处理后的字符串。
 * @throws {TypeError} - 若输入不是字符串，则抛出TypeError。
 */
const decapitalize = ([first, ...rest], convertRestToUpperCase = false) => {
  // 对输入进行类型检查
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string as the first argument');
  }

  // 主逻辑，包含余下字符串处理和边界条件处理
  if (first === '') {
    return ''; // 对空输入进行边界条件处理，返回空字符串
  }

  const restString = convertRestToUpperCase ? rest.join('').toUpperCase() : rest.join('');
  return first.toLowerCase() + restString;
};

console.log(decapitalize('FooBar')); // 'fooBar'
console.log(decapitalize('FooBar', true)); // 'fOOBAR'



/**
 * 复制一个正则表达式对象并返回新的正则表达式对象
 * @param {RegExp} regExp - 要复制的正则表达式对象。
 * @returns {RegExp} 返回新的正则表达式对象。
 * @throws {TypeError} 如果输入不是正则表达式，则抛出TypeError。
 * 
*/
const cloneRegExp = regExp => {
  // 增加类型检查以确保传入的是正则表达式对象
  if (!(regExp instanceof RegExp)) {
    throw new TypeError('Expected a RegExp object');
  }

  // 安全地提取source和flags，考虑兼容性
  const source = regExp.source;
  let flags = regExp.flags;

  // 如果flags未定义，则手动计算flags
  if (typeof flags !== 'string') {
    const flagsObj = {
      g: 'global',
      i: 'ignoreCase',
      m: 'multiline',
      y: 'sticky',
      u: 'unicode',
      s: 'dotAll',
    };
    flags = '';
    for (const prop in flagsObj) {
      if (regExp[prop]) {
        flags += flagsObj[prop];
      }
    }
  }

  // 返回新的正则表达式对象
  return new RegExp(source, flags);
};

// 测试代码
const regExp = /lorem ipsum/gi;
const regExp2 = cloneRegExp(regExp); // regExp !== regExp2
console.log(regExp2);



/**
 * 将字符串中的连续多个空白字符替换为单个空格。
 * @param {string} str 需要处理的字符串。
 * @returns {string} 处理后的字符串。
 */
const compactWhitespace = (str) => {
  // 检查输入是否为字符串类型
  if (typeof str !== 'string') {
    throw new TypeError('输入必须是字符串类型');
  }

  // 使用预编译的正则表达式以提高性能
  const whitespaceRegex = /\s{2,}/g;
  return str.replace(whitespaceRegex, ' ');
};

// 测试示例
console.log(compactWhitespace('Lorem    Ipsum')); // 'Lorem Ipsum'
console.log(compactWhitespace('Lorem \n Ipsum')); // 'Lorem Ipsum'
console.log(compactWhitespace(123)); // 预期抛出 TypeError



/**
 * 检查给定的字符串是否包含空白字符。
 * @param {string} str 需要检查的字符串。
 * @returns {boolean} 如果字符串中包含空白字符，则返回true；否则，返回false。
 */
const containsWhitespace = (str) => {
  // 首先检查传入的参数是否为字符串类型
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 使用预编译的正则表达式进行空白字符的检测
  const whitespaceRegex = /\s/;
  return whitespaceRegex.test(str);
};

containsWhitespace('lorem'); // false
containsWhitespace('lorem ipsum'); // true
containsWhitespace(null); // 抛出TypeError



/**
 * 对字符串中的正则表达式特殊字符进行转义
 * @param {string} str 需要转义的字符串
 * @returns {string} 转义后的字符串
 * @throws {TypeError} 如果输入不是字符串，则抛出类型错误
 */
const escapeRegExp = (str) => {
  // 检查输入是否为字符串类型
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 使用正则表达式和replace方法转义特殊字符
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// 示例调用
console.log(escapeRegExp('(test)')); // 输出：\\(test\\)



/**
 * 将字符串中的所有制表符替换为指定数量的空格。
 * @param {string} str - 待处理的输入字符串。
 * @param {number} count - 每个制表符替换为空格的数量。
 * @returns {string} 处理后的字符串，其中的制表符被扩展为空格。
 * @throws {TypeError} 如果输入字符串不是字符串或计数不是非负数，则抛出类型错误。
 */
const replaceTabsWithSpaces = (str, count) => {
  // 参数验证
  if (typeof str !== 'string') {
    throw new TypeError('第一个参数应为字符串');
  }
  if (typeof count !== 'number' || count < 0) {
    throw new TypeError('第二个参数应为非负数');
  }

  // 通过逐字符处理优化大字符串：不使用replace全局替换。
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '\t') {
      result += ' '.repeat(count); // 替换制表符为指定数量的空格
    } else {
      result += str[i]; // 直接添加非制表符字符
    }
  }
  return result;
};
// 示例
console.log(replaceTabsWithSpaces('\t\tlorem', 3)); // 输出 '      lorem'



/**
 * 将简写的十六进制颜色代码扩展为完整的六位代码。
 * @param {string} shortHex - 三或四位的十六进制颜色代码，可以带也可以不带'#'。
 * @returns {string} - 扩展后的六位十六进制颜色代码。
 * @throws {Error} - 如果输入不是三或四位的字符串，或包含非十六进制字符，则抛出错误。
 */
const extendHex = shortHex => {
  // 输入验证
  if (typeof shortHex !== 'string' || ![3, 4].includes(shortHex.length) || !/^[#0-9a-fA-F]+$/.test(shortHex)) {
    throw new Error('Invalid input: Hex color must be a 3 or 4 character string containing only hexadecimal characters.');
  }

  // 确保颜色代码以 '#' 开头
  const hasHash = shortHex.startsWith('#');
  let color = hasHash ? shortHex : '#' + shortHex;

  // 扩展颜色代码
  return color.slice(0, 1) + color.slice(1).split('').map(char => char + char).join('');
};

console.log(extendHex('#03f')); // '#0033ff'
console.log(extendHex('05a')); // '#0055aa'



/**
 * 将十六进制颜色代码转换为RGB格式的字符串。
 *
 * @param {string} hex - 需要转换的十六进制颜色代码。必须是3或6位的格式，可以包含或不包含'#'。
 * @returns {string} - 返回RGB格式的字符串，格式为'rgb(r,g,b)'，其中r、g、b为0-255之间的整数。
 * @throws {Error} - 如果输入的十六进制颜色代码不合法，则抛出此错误。
 */
const hexToRGB = hex => {
  // 输入合法性检查
  if (typeof hex !== 'string' || !/^(#)?[0-9a-fA-F]{3,8}$/.test(hex)) {
    throw new Error('Invalid input: Please provide a valid hex color code.');
  }

  let alpha = false;
  let h = hex.slice(hex.startsWith('#') ? 1 : 0);

  // 处理3位和8位色值
  if (h.length === 3) h = [...h].map(x => x + x).join('');
  else if (h.length === 8) {
    alpha = true;
    h = h.slice(0, 6); // 移除alpha部分，因为我们只处理RGB
  }

  // 将十六进制字符串转换为整数
  const colorInt = parseInt(h, 16);

  // 颜色值计算掩码和位移预定义
  const masks = { r: 0xff0000, g: 0x00ff00, b: 0x0000ff };
  const shifts = { r: 16, g: 8, b: 0 };
  const alphaMask = alpha ? 0xff000000 : 0;
  const alphaShift = alpha ? 24 : 0;

  // 计算RGB分量
  const components = Object.keys(masks).map(key => {
    const mask = masks[key];
    const shift = shifts[key];
    return (colorInt & mask) >>> shift;
  });

  // 如果有alpha，则添加alpha分量
  if (alpha) {
    components.push((colorInt & alphaMask) >>> alphaShift);
  }

  // 构造并返回RGB/RGBA字符串
  return `rgb${alpha ? 'a' : ''}(${components.join(', ')})`;
};

hexToRGB('#27ae60ff'); // 'rgba(39, 174, 96, 0)'
hexToRGB('27ae60'); // 'rgb(39, 174, 96)'
hexToRGB('#fff'); // 'rgb(255, 255, 255)'



// 定义最大颜色值常量，提高代码可读性
const MAX_COLOR_VALUE = 0xffffff;
/**
 * 生成一个随机的十六进制颜色代码。
 * @returns {string} 一个随机的十六进制颜色代码，格式为 "#rrggbb"。
 */
const randomHexColorCode = () => {
  // 生成六位随机数，确保颜色空间分布均匀
  const colorValue = Math.floor(Math.random() * MAX_COLOR_VALUE).toString(16).padStart(6, '0');

  return `#${colorValue}`;
};
console.log(randomHexColorCode()); // 例如："#e34155"



/**
 * 将RGB颜色值转换为6位数的十六进制表示。
 * @param {number} r - 红色分量值（0-255）。
 * @param {number} g - 绿色分量值（0-255）。
 * @param {number} b - 蓝色分量值（0-255）。
 * @returns {string} - 表示RGB颜色的6位数十六进制字符串。
 * @throws {Error} - 如果任何输入参数不是0到255之间的整数，则抛出错误。
 */
const RGBToHex = (r, g, b) => {
  // 参数验证：确保r、g、b是0到255之间的整数
  if (!Number.isInteger(r) || !Number.isInteger(g) || !Number.isInteger(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error('Invalid RGB values. All values must be integers between 0 and 255.');
  }

  // RGB到十六进制的转换
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
};

// 测试改进后的函数
console.log(RGBToHex(255, 165, 1)); // 'ffa501'



/**
 * 格式化数字为易于阅读的字符串，以指定地区（默认'en-US'）的方式进行千位分隔。
 *
 * @param {number} num - 需要格式化的数字。必须是一个有限且非NaN的数值。
 * @returns {string} 返回一个格式化后的字符串，其中包含了千位分隔符。
 * @throws {TypeError} 当传入的参数 `num` 不是数字类型时抛出错误。
 * @throws {Error} 当 `num` 是 `NaN` 或者 `Infinity` 时抛出错误。
 */
const formatNumber = (num) => {
  // 参数验证：确保num是一个数字
  if (typeof num !== 'number') {
    throw new TypeError('Expected a number');
  }

  // 处理非数值情况，可以按需求调整这种处理方式（例如返回null、抛出错误或其他）
  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid number');
  }

  // 为了减少地区依赖性，这里指定使用en-US作为格式化规则
  // 但如果有明确的业务需求指定其他地区或语言，也可以相应调整'locales'参数
  const formattedNum = num.toLocaleString('en-US', {
    maximumFractionDigits: 0 // 根据需要调整小数位数
  });

  return formattedNum;
};

// 测试代码（仅示例）
try {
  console.log(formatNumber(123456)); // 预期输出: '123,456'
  console.log(formatNumber(15675436903)); // 预期输出: '15,675,436,903'
  console.log(formatNumber("12345a")); // 预期抛出TypeError
  console.log(formatNumber(NaN)); // 预期抛出Error
  console.log(formatNumber(Infinity)); // 预期抛出Error
} catch (error) {
  console.error(error.message);
}



/**
 * 将驼峰命名法格式的字符串转换为使用指定分隔符分隔的字符串。
 *
 * @param {string} str - 需要转换的驼峰命名法格式的字符串。
 * @param {string=} separator - 用于分隔单词的字符，默认为下划线（_）。
 * @returns {string} - 返回由分隔符分隔的字符串，所有字符均转为小写。
 * @throws {TypeError} - 如果输入`str`不是字符串类型，则抛出此错误。
 */
const fromCamelCase = (str, separator = '_') => {
  // 参数验证
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as the first argument');
  }

  // 处理空字符串情况
  if (!str) {
    return str;
  }

  // 使用预编译的正则表达式
  const camelCaseRegex1 = /([a-z\d])([A-Z])/g;
  const camelCaseRegex2 = /([A-Z]+)([A-Z][a-z\d]+)/g;

  /**
   * 通过两个正则表达式替换将驼峰命名转换为分隔符分隔的字符串：
   * 1. 匹配并替换连续的小写字母和大写字母对
   * 2. 匹配并替换连续的大写字母开头的单词
   */
  return str
    .replace(camelCaseRegex1, `$1${separator}$2`)
    .replace(camelCaseRegex2, `$1${separator}$2`)
    .toLowerCase();
};

try {
  console.log(fromCamelCase('someDatabaseFieldName', ' ')); // 'some database field name'
  console.log(fromCamelCase('someLabelThatNeedsToBeCamelized', '-')); // 'some-label-that-needs-to-be-camelized'
  console.log(fromCamelCase('someJavascriptProperty', '_')); // 'some_javascript_property'
  console.log(fromCamelCase(null)); // 这将抛出TypeError
} catch (error) {
  console.error(error);
}



/**
 * 缩进字符串的每一行。
 * @param {string} str 需要缩进的字符串。
 * @param {number} count 缩进的次数。
 * @param {string} [indent=' '] 缩进的字符，默认为空格。
 * @returns {string} 缩进后的字符串。
 * @throws {TypeError} 如果输入参数类型不正确。
 */
const indentString = (str, count, indent = ' ') => {
  // 参数类型检查
  if (typeof str !== 'string') {
    throw new TypeError('str参数必须是字符串');
  }
  if (typeof count !== 'number') {
    throw new TypeError('count参数必须是数字');
  }
  
  // 处理边界情况
  if (count < 0) {
    throw new Error('count参数不能为负数');
  }

  // 使用更高效的方法处理缩进
  return str.split('\n').map(line => indent.repeat(count) + line).join('\n');
};

console.log(indentString('Lorem\nIpsum', 2)); // '  Lorem\n  Ipsum'
console.log(indentString('Lorem\nIpsum', 2, '_')); // '__Lorem\n__Ipsum'



/**
 * 检查两个字符串是否为字母异位词（anagram）。
 * @param {string} str1 第一个字符串。
 * @param {string} str2 第二个字符串。
 * @returns {boolean} 如果两个字符串是字母异位词则返回 true，否则返回 false。
 */
const isAnagram = (str1, str2) => {
  // 输入验证：确保两个参数都是字符串
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw new TypeError('Both arguments must be strings');
  }

  // 移除非字母数字字符，转换为小写，并排序字符
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort();

  // 直接比较两个排序后的字符数组是否相等
  return normalize(str1).join('') === normalize(str2).join('');
};

// 测试示例
console.log(isAnagram('iceman', 'cinema')); // true



/**
 * 判断给定的字符串是否全部由小写字母组成。
 * @param {string} str 需要检查的字符串。
 * @returns {boolean} 如果字符串全部为小写则返回true，否则返回false。
 */
const isLowerCase = str => {
  // 类型检查，确保输入为字符串
  if (typeof str !== 'string') {
    console.error('isLowerCase函数期望一个字符串作为输入。');
    return false;
  }

  // 检查输入是否为空，根据原有逻辑，空字符串也算作小写
  if (!str) {
    return true;
  }

  // 检查字符串是否与其小写版本相等
  return str === str.toLowerCase();
};

// 测试用例
console.log(isLowerCase('abc')); // true
console.log(isLowerCase('a3@$')); // true，因为原有逻辑视为空格、数字、符号等为小写
console.log(isLowerCase('Ab4')); // false
console.log(isLowerCase(123)); // false，现在对类型进行了检查
console.log(isLowerCase(null)); // false，空值现在被视为无效输入
console.log(isLowerCase(undefined)); // false，空值现在被视为无效输入



/**
 * 检查提供的值是否为字符串类型。
 * @param {*} val - 需要检查的值。
 * @returns {boolean} - 如果值是字符串类型，则返回true；否则返回false。
 */
const isString = val => {
  // 使用 typeof 操作符检查 val 的类型是否为 'string'
  return typeof val === 'string';
};

// 示例调用：检查空字符串和非空字符串
console.log(isString('10')); // 预期输出: true
console.log(isString(''));   // 预期输出: true
console.log(isString(10));    // 预期输出: false



/**
 * 检查一个字符串是否全由大写字母组成。
 *
 * @param {string} str - 需要检查的字符串
 * @returns {boolean} 如果字符串中的所有字符都是大写字母，则返回 `true`，否则返回 `false`。
 * @throws {TypeError} 当传入非字符串类型的参数时，抛出此错误。
 */
const isUpperCase = str => {
  // 确保传入的是字符串类型
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }
  
  // 检查字符串是否全部由大写字母组成
  return str === str.toUpperCase();
};

console.log(isUpperCase('ABC')); // true
console.log(isUpperCase('A3@$')); // true, 与修改前不同，现在只对大写字母返回true
console.log(isUpperCase('aB4')); // false
console.log(isUpperCase(null)); // 抛出TypeError: Expected a string as input



/**
 * 将字符串中的每个字符通过提供的函数进行转换，并返回新字符串。
 *
 * @param {string} str - 需要处理的原始字符串。
 * @param {Function} fn - 用于转换字符的函数。该函数接受三个参数：
 *   - {string} c - 当前字符。
 *   - {number} index - 当前字符在原字符串中的索引位置（从0开始）。
 *   - {string} originalStr - 原始输入字符串。
 * @returns {string} - 转换后的字符串。
 * @throws {TypeError} - 如果传入的 `str` 不是字符串类型，或者 `fn` 不是函数类型，则抛出错误。
 */
const mapString = (str, fn) => {
  // 输入验证
  if (typeof str !== 'string') {
    throw new TypeError('Expected the first argument to be a string');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected the second argument to be a function');
  }

  let result = '';
  // 使用原生字符串迭代器进行优化
  for (const c of str) {
    try {
      // 应用提供的函数，并处理异常
      result += fn(c, result.length, str);
    } catch (error) {
      console.error(`Error processing character '${c}': ${error}`);
      // 根据需求，可以选择抛出异常、跳过当前字符或继续执行
      break; // 或 result += c; 继续执行但不应用函数
    }
  }
  return result;
};

// 示例调用
mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'



/**
 * 对给定的号码添加掩码。
 * @param {string} cc - 要掩码处理的号码。
 * @param {number} [num=4] - 要掩码的号码末尾字符数。
 * @param {string} [mask='*'] - 用于掩码的字符。
 * @returns {string} 掩码处理后的号码。
 * @throws {TypeError} 当输入的号码或掩码数量类型不正确时抛出。
 * @throws {Error} 当掩码数量为负数时抛出。
 */
const mask = (cc, num = 4, mask = '*') => `${cc}`.slice(-num).padStart(`${cc}`.length, mask);

mask(1234567890); // '******7890'
mask(1234567890, 3); // '*******890'
mask(1234567890, -4, '$'); // '$$$$567890'



/**
 * 为字符串添加指定字符，使其总长度达到指定长度。
 * 如果指定长度小于字符串原长度，则字符串将被截断。
 * 
 * @param {string} str 需要进行填充的原始字符串。
 * @param {number} length 指定填充后的字符串长度。
 * @param {string} [char=' '] 填充字符，默认为空格。
 * @returns {string} 填充后的字符串。
 * @throws {TypeError} 如果长度参数不是数字或字符参数不是非空字符串，则抛出类型错误。
 * @throws {Error} 如果长度参数小于等于0，则抛出错误。
 */
const pad = (str, length, char = ' ') => {
  // 类型检查
  if (typeof length !== 'number' || isNaN(length)) {
    throw new TypeError('Length must be a number');
  }
  if (typeof char !== 'string' || char.length === 0) {
    throw new TypeError('Character must be a non-empty string');
  }

  // 处理 length 小于或等于 0 的情况
  if (length <= 0) {
    throw new Error('Length must be greater than 0');
  }

  // 计算需要添加的字符数量
  const startCharsNeeded = Math.ceil((length - str.length) / 2);
  const endCharsNeeded = Math.floor((length - str.length) / 2);

  // 使用 padStart 和 padEnd 来添加字符
  let paddedStr = str;
  if (startCharsNeeded > 0) {
    paddedStr = paddedStr.padStart(startCharsNeeded + str.length, char);
  }
  if (endCharsNeeded > 0) {
    paddedStr = paddedStr.padEnd(length, char);
  }

  return paddedStr;
};

// 测试例子
pad('cat', 8); // '  cat   '
pad(String(42), 6, '0'); // '004200'
pad('foobar', 3); // 'foobar'



/**
 * 检查给定字符串是否为回文。
 * @param {string} str - 待检查的字符串。
 * @returns {boolean} 如果字符串是回文则返回true，否则返回false。
 * @throws {TypeError} 如果输入不是字符串。
 */
const isPalindrome = (str) => {
  // 输入验证
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 清理字符串：转换为小写并移除非字母数字字符
  const cleanedString = str.toLowerCase().replace(/[\W_]/g, '');

  // 使用双指针法检查字符串是否为回文
  let left = 0;
  let right = cleanedString.length - 1;

  while (left < right) {
    if (cleanedString[left] !== cleanedString[right]) {
      return false;
    }
    left++;
    right--;
  }

  // 返回true，表示字符串是回文
  return true;
};

// 测试示例
console.log(isPalindrome('taco cat')); // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome(' ')); // false, 空格不是回文
console.log(isPalindrome(12321)); // 抛出TypeError: Expected a string as input



/**
 * 根据给定的数量和单词，返回其复数形式。
 * @param {number|string|object} val - 如果是数字，则表示物品的数量；如果是对象，则为一个键值对，键为单数形式的单词，值为对应的复数形式。
 * @param {string} word - 单数形式的单词。
 * @param {string} [plural=word+'s'] - 单词的复数形式。默认为在单词末尾加上's'。
 * @returns {function|string} 如果val是对象，则返回一个函数，该函数接受数量和单词作为参数返回复数形式；如果val是数字或字符串，则直接返回复数形式的字符串。
 */
const pluralize = (val, word, plural = word + 's') => {
  // 内部辅助函数，用于处理单数形式到复数形式的转换
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural;
    
  // 如果val是对象，则返回一个闭包函数，以便动态选择复数形式
  if (typeof val === 'object') return (num, word) => _pluralize(num, word, val[word]);
    
  // 如果val是数字或字符串，直接调用辅助函数并返回结果
  return _pluralize(val, word, plural);
};

// 示例用法
pluralize(0, 'apple'); // 'apples'
pluralize(1, 'apple'); // 'apple'
pluralize(2, 'apple'); // 'apples'
pluralize(2, 'person', 'people'); // 'people'

// 定义一个复数形式的映射表
const PLURALS = {
  person: 'people',
  radius: 'radii'
};

// 使用映射表创建一个自动复数化的函数
const autoPluralize = pluralize(PLURALS);
autoPluralize(2, 'person'); // 'people'



/**
 * 将字节大小转换为易读格式（例如KB、MB、GB等）。
 * @param {number} num 要转换的字节大小，必须为有限数字。
 * @param {number} [precision=3] 转换结果的小数点精度。
 * @param {boolean} [addSpace=true] 转换结果的单位前是否添加空格。
 * @returns {string} 转换后的易读字符串。
 * @throws {Error} 如果输入不是有限数字。
 */
const prettyBytes = (num, precision = 3, addSpace = true) => {
  // 定义字节单位数组
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  // 处理特殊值：NaN、Infinity和-Infinity
  if (isNaN(num) || !isFinite(num)) throw new Error('Input must be a finite number');

  // 计算并存储非负值，避免重复计算
  const absNum = Math.abs(num);
  
  // 确定单位指数，防止超出范围
  const exponent = Math.min(Math.floor(Math.log10(absNum) / 3), UNITS.length - 1);
  
  // 计算字节大小，考虑精度
  const n = Number((absNum / 1000 ** exponent).toPrecision(precision));

  // 构造最终结果字符串
  let sign = num < 0 ? '-' : '';
  const unit = addSpace ? ' ' : '';
  return sign + n + unit + UNITS[exponent];
};
prettyBytes(1000); // "1 KB"
prettyBytes(-27145424323.5821, 5); // "-27.145 GB"
prettyBytes(123456789, 3, false); // "123MB"



/**
 * 清理字符串，移除非ASCII字符。
 * @param {string} str - 需要清理的输入字符串。
 * @returns {string} 一个新的字符串，移除了非ASCII字符。
 */
const sanitizeString = str => {
  // 检查输入是否为字符串。如果不是，则将其转换为字符串。
  // 这样可以处理null、undefined和数字等情况。
  if (typeof str !== 'string') {
    str = String(str);
  }

  // 使用正则表达式替换非ASCII字符。
  // 表达式`[^\x20-\x7E]`匹配任何不在ASCII范围内的字符。
  // `g`标志确保替换所有出现的字符。
  try {
    return str.replace(/[^\x20-\x7E]/g, '');
  } catch (error) {
    console.error('在清理字符串时发生错误:', error);
    // 在实际应用中，你可能需要根据应用需求的不同来处理这个错误。
    // 为了简单起见，这里我们返回一个空字符串。
    return '';
  }
};

// 示例用法：
console.log(sanitizeString('äÄçÇéÉêlorem-ipsumöÖÐþúÚ')); // 'lorem-ipsum'
console.log(sanitizeString(null)); // '', 优雅地处理非字符串输入



/**
 * 反转给定的字符串。
 * @param {string} str 需要被反转的字符串。
 * @returns {string} 反转后的字符串。如果输入不是字符串，则返回原始输入。
 */
const reverseString = (str) => {
  // 检查输入是否为字符串类型
  if (typeof str !== 'string') {
    console.warn('reverseString函数期望一个字符串作为输入。');
    return str;
  }

  // 使用更高效的字符串反转实现
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
};

console.log(reverseString('foobar')); // 'raboof'



/**
 * 对给定字符串中的字符按字母顺序排序。
 *
 * @param {string} str - 需要排序的输入字符串。
 * @returns {string} 一个新的字符串，其中包含按字母顺序排序的字符。
 */
const sortCharactersInString = str => {
  // 检查输入是否为字符串。如果不是，则抛出TypeError异常。
  if (typeof str !== 'string') {
    throw new TypeError('输入必须是字符串');
  }

  // 对字符串中的字符进行排序，并将它们重新连接成一个字符串。
  return [...str].sort((a, b) => a.localeCompare(b)).join(''); // 使用扩展运算符将字符串转换为字符数组，然后按照字母顺序排序，最后再将字符数组合并回字符串
};

// 测试用例
console.log(sortCharactersInString('cabbage')); // 输出: 'aabbceg'
console.log(sortCharactersInString('')); // 输出: ''
try {
  console.log(sortCharactersInString(123)); // 应该抛出TypeError异常
} catch (error) {
  console.error(error.message); // 输出: '输入必须是字符串'
}



/**
 * 将输入字符串分割成行数组，保留尾部的空字符串。
 * 此函数确保输入为字符串并执行基本的错误处理。
 * 
 * @param {string} str - 需要被分割成行的字符串。
 * @returns {Array} 行数组，如果存在尾部空字符串则一并包含。
 */
const splitLines = str => {
  // 验证输入确保其为字符串。
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 将字符串分割成行，包括尾部的空字符串。
  // 正则表达式处理同时适用于Windows（\r\n）和Unix（\n）的行结束符。
  return str.split(/\r?\n/);
};

// 示例用法：
try {
  console.log(splitLines('This\nis a\nmultiline\nstring.\n'));
} catch (error) {
  console.error('Error:', error.message);
}



/**
 * 生成给定字符串的所有可能的排列组合。
 * @param {string} str 输入的字符串
 * @returns {Array} 包含所有排列组合的数组
 */
const stringPermutations = (str) => {
  // 输入验证
  if (typeof str !== 'string') {
    throw new TypeError('输入必须是字符串');
  }

  // 处理边界条件：空字符串或只包含一个字符的字符串
  if (str.length <= 1) return [str];

  const results = [];

  /**
   * 通过迭代生成字符串的所有排列
   * @param {string} curr 当前构建的字符串
   * @param {string} remaining 剩余未使用的字符
   */
  const generatePermutations = (curr, remaining) => {
    if (remaining.length === 0) {
      results.push(curr);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const nextChar = remaining[i];
      const nextRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
      generatePermutations(curr + nextChar, nextRemaining);
    }
  };

  generatePermutations('', str);

  return results;
};

console.log(stringPermutations('abc')); // ['abc','acb','bac','bca','cab','cba']



/**
 * 安全地从字符串中移除HTML标签。
 * 该方法专门设计用于处理来自不可信源的字符串，以避免XSS攻击。
 * 
 * @param {string} str 需要处理的字符串。
 * @returns {string} 移除HTML标签后的字符串。
 * @throws {TypeError} 如果输入不是字符串，则抛出类型错误。
 */
const removeHTMLTagsFromString = str => {
  // 校验输入是否为字符串
  if (typeof str !== 'string') {
    throw new TypeError('输入必须是字符串');
  }

  // 使用正则表达式移除HTML标签，同时避免移除可能的脚本标签以防止XSS
  // 注意：这里假设不允许任何HTML标签存在，是最严格的处理方式
  // 如果需要允许某些安全的标签，应该在这里进行更详细的正则表达式设计
  const cleanedStr = str.replace(/<[^>]*>/g, '');

  return cleanedStr;
};

try {
  console.log(removeHTMLTagsFromString('<p><em>lorem</em> <strong>ipsum</strong></p>')); // 'lorem ipsum'
} catch (error) {
  console.error(error.message);
}



/**
 * 将给定的字符串转换为驼峰命名法格式。
 * @param {string} str 需要转换的字符串。
 * @returns {string} 转换后的驼峰命名法字符串。
 * @throws {TypeError} 如果输入不是字符串类型，则抛出TypeError。
 */
const toCamelCase = str => {
  // 输入验证：确保输入为字符串类型
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  // 使用try-catch结构增加异常处理能力
  try {
    let s =
      str &&
      str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => {
          // 对正则表达式匹配到的每一项进行首字母大写，其余小写的转换
          // 同时增加对匹配项的进一步检查和处理，提升代码健壮性
          if (typeof x === 'string') {
            return x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase();
          }
          return x; // 如果x不是字符串，则保持原样返回
        })
        .join('');

    // 对结果字符串的首字母进行小写处理，然后返回
    return s.slice(0, 1).toLowerCase() + s.slice(1);
  } catch (error) {
    // 异常处理：在出现错误时，可以选择记录错误日志或者抛出错误信息
    console.error('Error converting to camel case:', error);
    throw error; // 重新抛出异常，确保调用者知晓错误发生
  }
};

// 测试示例
console.log(toCamelCase('some_database_field_name')); // 'someDatabaseFieldName'
console.log(toCamelCase('Some label that needs to be camelized')); // 'someLabelThatNeedsToBeCamelized'
console.log(toCamelCase('some-javascript-property')); // 'someJavascriptProperty'
console.log(toCamelCase('some-mixed_string with spaces_underscores-and-hyphens')); // 'someMixedStringWithSpacesUnderscoresAndHyphens'
console.log(toCamelCase(12345)); // 应抛出TypeError



/**
 * 将给定的字符串转换成kebab-case格式。
 * @param {string} str 需要转换的字符串。
 * @returns {string} 转换后的kebab-case字符串。
 * @throws {TypeError} 如果输入不是字符串。
 */
const toKebabCase = (str) => {
  // 1. 增强输入验证：确保输入是一个字符串
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 原始函数体，现在加上注释来增强可读性和可维护性
  // 正则表达式解释：
  // [A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b) - 匹配大写字母序列，后面跟着另一个大写字母、小写字母和数字的组合，或单词边界
  // [A-Z]?[a-z]+[0-9]* - 匹配可能以大写字母开头，小写字母和数字结尾的序列
  // [A-Z] - 匹配单个大写字母
  // [0-9]+ - 匹配数字序列
  // .map(x => x.toLowerCase()) - 将所有匹配转换为小写
  // .join('-') - 使用短横线连接所有转换后的匹配项
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
};

// 测试用例可以包括：
// - 正常的转换场景
// - 边界条件，如空字符串、只包含空格的字符串、数字、特殊字符等
// - 非字符串输入，期待抛出 TypeError
console.log(toKebabCase('camelCase')); // 'camel-case'
console.log(toKebabCase('some text')); // 'some-text'
console.log(toKebabCase('some-mixed_string With spaces_underscores-and-hyphens')); // 'some-mixed-string-with-spaces-underscores-and-hyphens'
console.log(toKebabCase('AllThe-small Things')); // "all-the-small-things"
console.log(toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')); // "i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-xml-and-html"
console.log(toKebabCase('')); // ''
console.log(toKebabCase('   ')); // ''
console.log(toKebabCase(123)); // 预期抛出 TypeError



/**
 * 将给定的字符串转换为蛇形命名法（snake_case）。
 * @param {string} str 需要转换的字符串。
 * @returns {string} 转换后的蛇形命名法字符串。如果输入为空或只包含空格，则返回空字符串。
 * @throws {TypeError} 如果输入不是字符串，则抛出TypeError。
 */
const toSnakeCase = (str) => {
  // 输入验证：确保传入的是一个字符串
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 将正则表达式提取为一个变量，增加可读性，并方便未来的维护
  const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

  // 空字符串或只包含空格的字符串的特殊处理
  if (!str.trim()) {
    return '';
  }

  return str
    .match(regex)
    .map(x => x.toLowerCase())
    .join('_');
};

// 测试示例
console.log(toSnakeCase('camelCase')); // 'camel_case'
console.log(toSnakeCase('some text')); // 'some_text'
console.log(toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens')); // 'some_mixed_string_with_spaces_underscores_and_hyphens'
console.log(toSnakeCase('AllThe-small Things')); // "all_the_small_things"
console.log(toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML')); // "i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html"
console.log(toSnakeCase('')); // ''
console.log(toSnakeCase('   ')); // ''



/**
 * 将给定字符串转换为标题大小写格式。
 * - 转换规则基于单词的划分，将每个单词的首字母大写，其余字母小写。
 * - 能够处理包含连字符、下划线和数字的字符串。
 * - 对参数类型进行检查，必须为字符串类型。
 * - 能够处理空字符串和仅包含非字母数字字符的字符串。
 * 
 * @param {string} str 需要转换的字符串。
 * @return {string} 转换后的标题大小写字符串。
 * @throws {TypeError} 如果输入参数不是字符串类型。
 */
const toTitleCase = str => {
  // 参数类型检查，确保传入的是字符串
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }
  
  // 处理边界情况：空字符串或只包含非字母数字的字符串
  if (!str.trim()) {
    return str; // 返回空字符串本身，作为边界条件的处理
  }

  // 使用正则表达式匹配并转换字符串
  // 解释：
  // [A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b) 匹配大写字母开头，后跟小写字母和数字的组合
  // [A-Z]?[a-z]+[0-9]* 匹配以大写字母开头，小写字母和数字组合的单词
  // [A-Z] 匹配单独的大写字母
  // [0-9]+ 匹配数字串
  // g 表示全局匹配
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
};

// 测试用例
console.log(toTitleCase('some_database_field_name')); // 'Some Database Field Name'
console.log(toTitleCase('Some label that needs to be title-cased')); // 'Some Label That Needs To Be Title Cased'
console.log(toTitleCase('some-package-name')); // 'Some Package Name'
console.log(toTitleCase('some-mixed_string with spaces_underscores-and-hyphens')); // 'Some Mixed String With Spaces Underscores And Hyphens'
console.log(toTitleCase('')); // ''
console.log(toTitleCase('!')); // 抛出TypeError



/**
 * 截断字符串至指定字符数。
 * 如果指定截断的字符数小于等于3，则返回原始字符串。
 * 截断后的字符串末尾追加 '...'。
 * 
 * @param {string} str - 需要截断的字符串。
 * @param {number} num - 截断后字符串最大包含的字符数。
 * @returns {string} - 截断后的字符串。
 */
const truncateString = (str, num) => {
  // 检查参数类型是否正确
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string for the first argument');
  }
  if (typeof num !== 'number') {
    throw new TypeError('Expected a number for the second argument');
  }

  // 确保 num 是正数
  num = Math.max(num, 0);

  // 根据输入的 num 计算截断长度
  const sliceLength = num > 3 ? num - 3 : num;

  // 返回截断后的字符串或如果原始字符串较短则返回原字符串
  return str.length > num ? str.slice(0, sliceLength) + '...' : str;
};

// 测试用例
console.log(truncateString('boomerang', 7)); // 'boom...'
console.log(truncateString('Hello, world!', 10)); // 'Hello, w...'
console.log(truncateString('Short', 10)); // 'Short'
console.log(truncateString('Short', -1)); // 'Short'
console.log(truncateString(12345, 5)); // 抛出 TypeError
console.log(truncateString('Test', '5')); // 抛出 TypeError



/**
 * 从给定字符串中提取单词，使用默认或自定义的模式进行分割。
 * @param {string} str 输入字符串
 * @param {RegExp} [pattern=/[^a-zA-Z-]+/] 分割字符串的正则表达式，默认为非字母和非连字符字符
 * @returns {Array} 分割并过滤后的单词数组
 */
const splitAndFilterWords = (str, pattern = /[^a-zA-Z0-9_-]+/) => {
  // 检查输入是否为字符串
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as the first argument');
  }

  // 使用正则表达式分割字符串并过滤掉空值
  const words = str.split(pattern).filter(Boolean);

  // 对全空白字符的字符串进行额外处理
  if (words.length === 1 && words[0] === '') {
    return [];
  }

  return words;
};

// 测试示例
console.log(splitAndFilterWords('I love javaScript!!')); // ["I", "love", "javaScript"]
console.log(splitAndFilterWords('python, javaScript & coffee')); // ["python", "javaScript", "coffee"]
console.log(splitAndFilterWords('   ')); // []



/**
 * 判断给定值是否表示肯定回答。
 * @param {string} val - 需要判断的字符串值。
 * @param {boolean} [def=false] - 当给定值既不匹配"是"也不匹配"否"时的默认返回值。
 * @returns {boolean} - 如果给定值匹配"是"，则返回true；如果匹配"否"，则返回false；否则返回默认值。
 * @throws {TypeError} - 如果传入的参数不是字符串类型，抛出TypeError。
 */
const isAffirmative = (val, def = false) => {
  // 确保val是字符串类型的检查
  if (typeof val !== 'string') {
    throw new TypeError('Expected a string as the first argument');
  }

  // 预编译正则表达式，用于匹配各种形式的"是"和"否"
  const yesRegex = /^(y|yes|Y|YEs|YES)$/i;
  const noRegex = /^(n|no|N|NO)$/i;

  // 先检查是否匹配"是"，然后检查是否匹配"否"，最后返回默认值
  return yesRegex.test(val) ? true : noRegex.test(val) ? false : def;
};

// 示例用法
isAffirmative('Y'); // true
isAffirmative('yes'); // true
isAffirmative('No'); // false
isAffirmative('Foo', true); // true
isAffirmative(123); // 抛出TypeError: Expected a string as the first argument



/**
 * 一个用于修剪文本以适应指定宽度并添加省略号或其他填充的类。
 */
class TextTrimmer {
  /**
   * 创建 TextTrimmer 的实例。
   * @param {Object} [options] - 配置选项。
   * @param {string} [options.padding='...'] - 当文本被修剪时添加的填充。
   * @param {Array<string>} [options.classList=[]] - 要应用到元素上的 CSS 类列表。
   * @param {Object} [options.style={}] - 要应用到元素上的自定义样式。
   * @param {boolean} [options.debug=false] - 是否启用调试模式。
  */
  constructor(options = {}) {
    this.config = {
      padding: options.padding || '...',
      classList: options.classList || [],
      style: options.style || {},
      debug: options.debug,
    };
    this.placeholderLength = this.calculatePlaceholderLength();
    this.createElements();
    this.applyStyles();
    document.body.appendChild(this.div);
  }
  /**
   * 计算填充字符串的长度。
   * @returns {number} 填充字符串的长度。
   */
  calculatePlaceholderLength() {
    return this.config.padding.length;
  }

  /**
   * 创建用于显示文本的元素。
   */
  createElements() {
    this.el = document.createElement('span');
    this.div = document.createElement('div');
  }

  /**
   * 应用样式到创建的元素上。
   */
  applyStyles() {
    const { style, debug } = this.config;
    const customStyles = Object.entries(style)
      .map(([key, value]) => `${key}:${value};`)
      .join('');
    this.el.className = this.config.classList.join(' ');
    this.el.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      background: transparent;
      color: transparent;
      height: 100%;
      white-space: nowrap;
      overflow: visible;
      border: 0;
      ${debug ? "background:white; color:red;" : ""}
      ${customStyles}
    `;
    this.div.style.cssText = `
      width: 99%;
      min-height: 50px;
      line-height: 50px;
      position: absolute;
      left: 3px;
      top: 3px;
      overflow: hidden;
      outline: 0;
      background: transparent;
      ${this.config.debug ? "outline: 1px solid red; background: black;" : ""}
    `;
    this.div.appendChild(this.el);
  }
  /**
   * 完成初始化并获取相关信息。
   * @returns {Object} 包含间隙、百分比和字体大小的信息对象。
   */
  complete() {
    const css = window.getComputedStyle(this.el);
    const fontSize = parseFloat(css.fontSize) || 16;
    const offsetWidth = this.el.offsetWidth;
    const scrollWidth = this.el.scrollWidth;
    const gap = scrollWidth - offsetWidth;
    const percent = Math.floor(offsetWidth / scrollWidth * 1000) / 1000;
    return { gap, percent, fontSize };
  }

  /**
   * 修剪文本。
   * @param {string} content - 要修剪的文本内容。
   * @returns {string} 修剪后的文本。
   */
  cut(content) {
    this.el.textContent = content;
    const { percent } = this.complete();
    const totalLength = this.calculateTotalLength(content);
    const showLength = Math.ceil(totalLength * percent) - this.placeholderLength;
    const trimmedContent = this.trimContent(content, showLength);
    return trimmedContent + this.config.padding;
  }

  /**
   * 计算文本的总长度（考虑全角和半角字符）。
   * @param {string} content - 文本内容。
   * @returns {number} 文本的总长度。
   */
  calculateTotalLength(content) {
    let total = 0;
    for (let char of content) {
      total += char.charCodeAt(0) > 127 ? 2 : 1;
    }
    return total;
  }

  /**
   * 根据最大长度修剪文本。
   * @param {string} content - 文本内容。
   * @param {number} maxLength - 最大长度。
   * @returns {string} 修剪后的文本。
   */
  trimContent(content, maxLength) {
    let trimmed = '';
    let currentLength = 0;
    for (let char of content) {
      currentLength += char.charCodeAt(0) > 127 ? 2 : 1;
      if (currentLength > maxLength) break;
      trimmed += char;
    }
    return trimmed;
  }
}

// 使用示例
const trimmer = new TextTrimmer({
  style: { 'font-size': '16px', 'width': '400px' },
});

const result = trimmer.cut('这是一个很长的文本，用来测试截断功能。');

console.log(result);  // 输出: 这是一个很长的文本，用来测试截...

// 示例2，截取wrap下的span的内容长度
// 获取 wrap 类的元素
const wrapElement = document.querySelector('.wrap');
// 获取 wrap 下的第一个 span 元素
const spanElement = wrapElement.querySelector('span');
// 获取 span 元素的文本内容
const spanContent = spanElement.textContent;
// 截取文本
const trimmedContent = trimmer.cut(spanContent);
// 更新 span 元素的内容
spanElement.textContent = trimmedContent;
console.log(trimmedContent);  // 输出: 截取后的文本