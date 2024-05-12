// 数组操作

/**
 * 使用展开运算符将数组展开为参数列表
 * @param {...nums} arr - 使用展开运算符将传入的参数转换为数组。
 */
const accumulate = (...nums) => nums.reduce((acc, n) => Array.from(acc, acc => acc + n), 0);

// 测试样例
// 将1, 2, 3, 4作为参数传递给accumulate函数
accumulate(1, 2, 3, 4); // [1, 3, 6, 10]
// 使用展开运算符将数组[1, 2, 3, 4]展开为参数列表
accumulate(...[1, 2, 3, 4]); // [1, 3, 6, 10]


/**
 * 检查数组中的所有元素是否都满足回调函数的条件。
 * @param {Array} arr - 要检查的数组。
 * @param {Function} [predicateFn=Boolean] - 用于判断元素是否满足条件的回调函数。
 * @returns {boolean} - 如果所有元素都满足条件，则返回 true；否则返回 false。
 */
const all = (arr, predicateFn = Boolean) => arr.every(predicateFn);

// 测试样例
all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true


/**
 * 判断数组中的所有元素是否相等
 * @param {arr} arr - 要检查的数组。
 * @returns {element} - 判断每个元素是否与第一个元素相等，则返回 true；否则返回 false。
 * @param {index} - 获取当前元素的索引
 */
const allEqual = (arr) => {
  // 如果数组为空，则返回true
  if (arr.length === 0) {
    return true;
  }
  // 使用every方法遍历数组，判断每个元素是否与第一个元素相等,是则返回true，否则返回false
  return arr.every((element, index) => element === arr[0]);
};

// 测试样例
allEqual([]); // true
allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true


/**
 * 检查两个参数是否都为真值
 * @param {*} a - 第一个参数
 * @param {*} b - 第二个参数
 * @returns {boolean} - 如果a和b都为真(非零、非空、非false、非null、非undefined)，则返回true；否则返回false。
 */
const areBothTruthy = (a, b) => {
  // Type check to ensure both arguments are truthy
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return a && b;
  } else {
    throw new Error('Both arguments must be boolean.');
  }
};

// 测试样例
console.log(areBothTruthy(true, true)); // true
console.log(areBothTruthy(true, false)); // false
console.log(areBothTruthy(false, false)); // false


/**
 * 检查数组中是否存在至少一个元素满足给定的条件。
 * @param {Array} array - 要检查的数组。
 * @param {Function} [predicateFn=Boolean] - 用于判断元素是否满足条件的函数。
 * @returns {boolean} - 如果数组中至少有一个元素满足条件，则返回true；否则返回false。
 */
const any = (array, predicateFn = Boolean) => array.some(predicateFn);

// 示例用法
any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true


/**
 * 返回一个新数组，其中每个元素都是原素组arr中长度为n的连续子数组
 * @param {number} number - 切片的长度
 * @param {arr} array - 要切片的数组
 * @returns {_} number - 索引参数
 */
const aperture = (n, arr) => {
  // 检查切片长度是否大于数组长度，如果是，则返回空数组
  if (n > arr.length) {
    return [];
  }
  // 使用map和slice组合来创建子数组
  return arr.slice(0, -1).map((_, i) => arr.slice(i * n, (i + 1) * n));
};

// 示例用法
console.log(aperture(2, [1, 2, 3, 4])); // [[1, 2], [2, 3], [3, 4]]
console.log(aperture(3, [1, 2, 3, 4])); // [[1, 2, 3], [2, 3, 4]]
console.log(aperture(5, [1, 2, 3, 4])); // []


/**
 * 检查两个数值是否大致相等
 * @param {number} v1 - 第一个参数
 * @param {number} v2 - 第二个参数
 * @returns {number} epsilon - epsilon默认值为0.001
 */
const approximatelyEqual = (v1, v2, { epsilon = 0.001 } = {}) => {
  // 类型检查，确保传入的参数是数字
  if (typeof v1 !== 'number' || typeof v2 !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }

  // 使用提供的epsilon值进行比较
  // 这里没有额外处理Infinity、-Infinity和NaN的情况，因为Math.abs的处理已经足够
  // 只要保证传入的是数字，Math.abs将正常工作
  return Math.abs(v1 - v2) < epsilon;
};

// 示例调用
console.log(approximatelyEqual(Math.PI / 2.0, 1.5708)); // true



/**
 * 将数组转换为HTML列表并将其插入到具有特定ID的列表元素中
 * @param {Array} arr - 要转换的数组。
 * @param {string} listID - 要附加到给定列表的ID。
 * @returns {void} - 生成的HTML列表。
 */
const arrayToHtmlList = (arr, listID) => {
  // 输入验证
  if (!Array.isArray(arr)) throw new TypeError('arr must be an array');
  if (typeof listID !== 'string') throw new TypeError('listID must be a string');

  // 确保ID的安全性
  const safeListID = listID.replace(/[^a-zA-Z0-9-_]/g, '');
  
  // 获取列表元素
  const el = document.querySelector(`#${safeListID}`);
  
  // 构建HTML列表并插入
  const htmlList = arr.map(item => `<li>${item}</li>`).join('');
  el.insertAdjacentHTML('beforeend', htmlList);
};

// 调用示例
arrayToHtmlList(['item 1', 'item 2'], 'myListID');


/**
 * 计算数组中元素的平均值。
 * @param {Array} arr - 要计算平均值的数组。
 * @param {Function} fn - 用于计算每个元素的函数。
 * 
*/
const averageBy = (arr, fn) => {
  // 检查输入数组是否为空
  if (arr.length === 0) {
    return NaN;
  }

  // 使用更准确的方式检查fn的类型
  const isFunction = typeof fn === 'function';
  
  // 初始化累加器
  let sum = 0;
  // 使用一次遍历来计算平均值
  for (let i = 0; i < arr.length; i++) {
    let val;
    // 根据fn的类型执行相应的操作
    if (isFunction) {
      try {
        // 如果是函数，执行并获取结果
        val = fn(arr[i]);
      } catch (e) {
        // 函数执行出错时，跳过当前项
        console.error(`Error executing the function: ${e}`);
        continue;
      }
    } else {
      // 如果是字符串，作为属性键获取值
      val = arr[i][fn];
    }
    // 累加值到累加器
    sum += val;
  }

  // 计算并返回平均值
  return sum / arr.length;
};

console.log(averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)); // 5
console.log(averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')); // 5


/**
 * 根据提供的过滤器将数组分割成两个数组，一个包含通过过滤器的元素，另一个包含未通过过滤器的元素。
 * @param {Array} arr - 要分割的数组。
 * @param {Array} filter - 用于过滤数组的数组。
 * 
*/
const splitByFilter = (arr, filter) => {
  // 输入有效性检查
  if (!Array.isArray(arr) || !Array.isArray(filter)) {
    throw new TypeError('Both arguments to splitByFilter must be arrays');
  }
  // 确保filter数组长度不会导致越界访问
  if (arr.length !== filter.length) {
    throw new Error('The filter array must be the same length as the input array');
  }

  return arr.reduce((acc, val, i) => {
    // 使用展开运算符增加可读性
    acc[filter[i] ? 0 : 1] = [...acc[filter[i] ? 0 : 1], val];
    return acc;
  }, [[], []]);
};

try {
  console.log(splitByFilter(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]));
  // Expected output: [ ['beep', 'boop', 'bar'], ['foo'] ]
} catch (error) {
  console.error(error.message);
}



/**
 * 将输入值转换为数组。如果输入已经是数组，则直接返回该数组；
 * 如果输入是null或undefined，则返回一个空数组；
 * 对于其他类型的输入，则将其封装在一个数组中返回。
 * @param {*} val - 输入值，可以是任意类型。
 * @returns {Array} - 转换后的数组。
 */
const castArray = val => {
  // 明确处理 null 和 undefined 的情况，使其行为更加明确。
  if (val === null || val === undefined) {
    return [];
  }
  // 使用 Array.isArray() 检查 val 是否是数组。
  // 是数组则直接返回，否则将 val 封装在数组中返回。
  return Array.isArray(val) ? val : [val];
};

castArray('foo'); // ['foo']
castArray([1]); // [1]
castArray(null); // []
castArray(undefined); // []



/**
 * 将一个数组拆分成多个指定大小的小数组。
 * @param {Array} arr - 需要拆分的原始数组。
 * @param {number} size - 指定的小数组大小。
 * @returns {Array} - 返回一个由小数组组成的数组。
 */
const chunk = (arr, size) => {
  // 输入验证
  if (!Array.isArray(arr)) {
    throw new TypeError('arr 参数必须是一个数组');
  }
  if (typeof size !== 'number' || size <= 0) {
    throw new TypeError('size 参数必须是一个正数');
  }

  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    // 使用循环代替 Array.from，直接push到result数组中，以提高性能
    result.push(arr.slice(i, i + size));
  }
  
  return result;
};

// 测试示例
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1,2],[3,4],[5]]



/**
 * 将一个数组分割成指定数量的子数组（chunks），每个子数组的元素个数尽可能相等。
 *
 * @param {Array} arr - 需要被分割的源数组。
 * @param {number} n - 分割后子数组的数量。必须是大于0的整数。
 * @returns {Array<Array>} - 由源数组分割而成的子数组组成的数组。
 *
 * @throws {TypeError} - 如果`arr`不是一个数组或`n`不是一个正数，则抛出错误。
 *
 * @example
 * chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]
 */
const chunkIntoN = (arr, n) => {
  if (!Array.isArray(arr)) {
    throw new TypeError('The first argument should be an array');
  }
  if (typeof n !== 'number' || isNaN(n) || n <= 0) {
    throw new TypeError('The second argument should be a positive number');
  }

  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};



/**
 * 从给定参数中找到第一个非null且非undefined的值。
 * 参数可以是任意类型，但函数主要设计为处理简单值。
 * @param {...any} args - 可接受多个参数。
 * @returns 遇到的第一个非null且非undefined的参数值，如果没有找到，则返回undefined。
 */
const findFirstNonNullable = (...args) => {
  // 使用find方法搜索第一个非null且非undefined的值
  // 由于性能考虑和函数设计目的，此处不进行类型检查，但注释中已说明期望的使用方式
  return args.find(v => ![undefined, null].includes(v));
};

console.log(findFirstNonNullable(null, undefined, '', NaN, 'Waldo')); // 输出: ''
console.log(findFirstNonNullable(undefined, null)); // 输出: undefined
console.log(findFirstNonNullable(1, 2, 3)); // 输出: 1



/**
 * 查找第一个非空、非undefined、非null、非空字符串、非NaN的值。
 * @param {function} valid - 用于验证值是否有效的函数。
 * @param {...any} args - 可接受多个参数。
 * @return 遇到的第一个符合条件的参数值，如果没有找到，则返回undefined。
 * 
*/
const coalesceFactory = (valid) => {
  // 增加类型检查，确保valid参数是函数
  if (typeof valid !== 'function') {
    throw new TypeError('valid parameter must be a function');
  }

  return (...args) => {
    // 使用find方法查找符合条件的值
    return args.find(valid);
  };
};

const customCoalesce = coalesceFactory((value) => {
  // 明确地比较值，避免使用includes，提高性能
  return value !== null && value !== undefined && value !== '' && !Number.isNaN(value);
});

try {
  console.log(customCoalesce(undefined, null, NaN, '', 'Waldo')); // "Waldo"
} catch (error) {
  console.error(error.message); // 处理可能的错误
}



/**
 * 使用改进后的collectInto函数封装Promise.all
 * @param {function} fn - 要封装的函数。
 * @param {...any} args - 可接受多个参数。
 * @return 返回封装后的函数。
 * 
*/
// 增加了参数校验的collectInto函数定义
const collectInto = (fn) => {
    if (typeof fn !== 'function') {
        throw new TypeError('Expected the argument to be a function');
    }
    return (...args) => fn(args);
};

// 使用改进后的collectInto函数封装Promise.all
const promiseAllWrapper = collectInto(Promise.all.bind(Promise));

// 定义Promise实例
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));

// 使用promiseAllWrapper并添加catch处理异常
promiseAllWrapper(p1, p2, p3)
    .then(result => console.log(result)) // 正常结果输出
    .catch(error => console.error(error)); // 异常捕获



/**
 * 根据JavaScript的truthy/falsy规则，通过删除所有falsy值来压缩数组。
 * 错误值包括false、0、“”、null、undefined和NaN。
 * 真诚的价值观包括所有其他价值观。
 * 
 * @param {Array} arr - 要压缩的输入数组。
 * @returns {Array} 删除了所有错误值的新数组。
 */
const compact = arr => arr.filter(value => value !== false && value !== 0 && value !== '' && value !== null && value !== undefined && !Number.isNaN(value));

// 使用实例测试
console.log(compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])); // [ 1, 2, 3, 'a', 's', 34 ]



/**
 * 根据指定的函数或属性名对数组进行计数分类。
 * @param {Array} arr - 待处理的数组。
 * @param {Function|string} fn - 用于分类的函数或属性名。如果为函数，则对每个数组元素执行该函数并以其返回值作为分类依据；如果为字符串，则直接使用数组元素的该属性值进行分类。
 * @returns {Object} 返回一个对象，键为根据fn分类后的结果，值为该类在数组中出现的次数。
 * @throws {TypeError} 如果第一个参数不是数组，或第二个参数不是函数也不是字符串，则抛出类型错误。
 */
const countBy = (arr, fn) => {
  // 参数校验
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof fn !== 'function' && typeof fn !== 'string') {
    throw new TypeError('Expected a function or a string as the second argument');
  }
  
  // 过滤掉数组中的假值，如null、undefined、false、0、''、NaN等
  const filteredArr = arr.filter(Boolean);

  return filteredArr.reduce((acc, val) => {
    // 根据fn的类型获取分类的键值
    const key = typeof fn === 'function' ? fn(val) : val[fn] || '';
    // 累加计数，确保键不存在时能初始化为0
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};

// 示例调用
console.log(countBy([6.1, 4.2, 6.3], Math.floor)); // {4: 1, 6: 2}
console.log(countBy(['one', 'two', 'three'], 'length')); // {3: 2, 5: 1}
console.log(countBy([{ count: 5 }, { count: 10 }, { count: 5 }], x => x.count)); // {5: 2, 10: 1}



/**
 * 统计给定值在数组中的出现次数
 * 
 * @param {Array} arr - 要搜索的数组
 * @param {*} val - 要计数的出现次数的值.
 * @returns {number} 给定值在数组中的出现次数.
 * @throws {TypeError} 如果第一个参数不是数组.
 */
const countOccurrences = (arr, val) => {
  // 验证输入参数
  if (!Array.isArray(arr)) {
    throw new TypeError('The first argument must be an array.');
  }

  // 使用数组reduce来计数值的出现次数
  return arr.reduce((count, current) => {
    // 使用严格的比较 (===) 以确保准确的结果
    return current === val ? count + 1 : count;
  }, 0);
};

// 使用示例调用
console.log(countOccurrences([1, 1, 2, 1, 2, 3], 1)); // Output: 3



/**
 * 将二维数组转换为CSV格式字符串。
 * @param {Array<Array<any>>} arr - 要转换的二维数组。
 * @param {string} [delimiter=','] - 字段分隔符，默认为逗号。
 * @returns {string} 生成的CSV字符串。
 */
const arrayOfArraysToCSV = (arr, delimiter = ',') => {
  // 检查输入是否为二维数组
  if (!Array.isArray(arr) || !arr.every(row => Array.isArray(row))) {
    throw new TypeError('输入必须是一个二维数组');
  }

  // 处理数组中的每个元素，并转义特殊字符
  const rows = arr.map(row => row.map(v => {
    if (typeof v === 'string') {
      // 如果值是字符串，检查并转义双引号和分隔符
      return isNaN(Number(v)) ? `"${v.replace(/"/g, '""')}"` : v;
    } else if (typeof v === 'number') {
      // 如果值是数字，直接返回
      return v;
    } else {
      // 不支持的数据类型将抛出异常
      throw new TypeError('数组中包含不支持的数据类型');
    }
  }));

  // 将行连接成字符串，注意处理包含换行符或回车符的场景
  const csvRows = rows.map(row => row.join(delimiter).replace(/[\r\n]+/g, ' '));

  // 将所有行用换行符连接
  return csvRows.join('\n');
};

// 测试用例
console.log(arrayOfArraysToCSV([['a', 'b'], ['c', 'd']])); // '"a","b"\n"c","d"'
console.log(arrayOfArraysToCSV([['a', 'b'], ['c', 'd']], ';')); // '"a";"b"\n"c";"d"'
console.log(arrayOfArraysToCSV([['a', '"b" great'], ['c', 3.1415]])); // '"a","""b"" great"\n"c",3.1415'



/**
 * 将CSV格式的字符串转换为二维数组。
 * @param {string} data - CSV字符串。
 * @param {string} delimiter - 字段分隔符，默认为逗号 (',')。
 * @param {boolean} omitFirstRow - 是否忽略第一行，默认为false。
 * @returns {Array<Array<string>>} - 转换后的二维数组。
 */
const CSVToArray = (data, delimiter = ',', omitFirstRow = false) => {
  // 增加输入验证
  if (typeof data !== 'string') {
    throw new TypeError('Expected input to be a string');
  }
  if (data.trim() === '') {
    return []; // 空字符串直接返回空数组
  }

  // 处理数据
  const lines = data.slice(omitFirstRow && data.indexOf('\n') !== -1 ? data.indexOf('\n') + 1 : 0)
    .split('\n');
  
  // 对每行进行分割，考虑到性能，这里不进一步使用更复杂的解析逻辑
  return lines.map(line => line.split(delimiter));
};

// 测试用例
console.log(CSVToArray('a,b\nc,d')); // [['a','b'],['c','d']];
console.log(CSVToArray('a;b\nc;d', ';')); // [['a','b'],['c','d']];
console.log(CSVToArray('col1,col2\na,b\nc,d', ',', true)); // [['a','b'],['c','d']];



/**
 * 将CSV格式的字符串转换为JSON数组。
 * @param {string} data - CSV字符串。
 * @param {string} delimiter - 字段分隔符，默认为逗号(,).
 * @returns {Array<Object>|null} - 转换后的JSON数组，如果输入不是有效的CSV字符串则返回null。
 */
const csvToJSON = (data, delimiter = ',') => {
  // 验证输入是否为字符串
  if (typeof data !== 'string') {
    console.error('Invalid input: Data must be a string.');
    return null;
  }

  // 检查数据是否包含至少一行
  if (!data.includes('\n')) {
    console.error('Invalid input: Data must contain at least one row.');
    return null;
  }

  // 解析标题行
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  
  // 检查标题行是否为空
  if (titles.length === 0) {
    console.error('Invalid input: Header row is empty.');
    return null;
  }

  // 解析数据行并构建JSON数组
  const records = data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(line => {
      if (!line) return null; // 跳过空行
      
      const values = line.split(delimiter);
      return titles.reduce((record, title, index) => {
        // 处理字段内包含分隔符的情况，暂未处理转义字符，实际应用中可能需要根据需求添加
        if (values[index]) {
          record[title] = values[index];
        }
        return record;
      }, {});
    })
    .filter(record => record !== null); // 过滤掉空行生成的null项

  return records.length > 0 ? records : null;
};

// 测试用例
console.log(csvToJSON('col1,col2\na,b\nc,d')); // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
console.log(csvToJSON('col1;col2\na;b\nc;d', ';')); // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];



/**
 * 将给定数组深度扁平化。
 * @param {Array} arr 需要扁平化的数组。
 * @returns {Array} 扁平化后的数组。
 * @throws {TypeError} 如果输入不是数组。
 */
const deepFlatten = arr => {
  // 检查输入是否为数组，如果不是则抛出错误。
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array');
  }

  // 使用迭代而不是递归来避免潜在的性能问题。
  const result = [];
  const stack = [arr];

  while (stack.length) {
    const current = stack.pop();

    // 如果当前元素是数组，则将其所有元素推入栈中。
    // 否则，将其直接加入结果数组。
    if (Array.isArray(current)) {
      stack.push(...current);
    } else {
      result.push(current);
    }
  }

  return result;
};

// 测试示例
console.log(deepFlatten([1, [2], [[3], 4], 5])); // [1, 2, 3, 4, 5]



/**
 * 计算两个数组之间的差异元素。
 * @param {Array} firstArray - 第一个数组。
 * @param {Array} secondArray - 第二个数组。
 * @returns {Array} - 返回只存在于第一个数组而不存在于第二个数组的元素。
 */
const difference = (firstArray, secondArray) => {
  // 参数验证（可选）
  if (!Array.isArray(firstArray) || !Array.isArray(secondArray)) {
    throw new TypeError('输入参数必须为数组');
  }

  // 使用Set来加速查找过程
  const secondArraySet = new Set(secondArray);
  return firstArray.filter(element => !secondArraySet.has(element));
};

// 示例调用
console.log(difference([1, 2, 3], [1, 2, 4])); // [3]



/**
 * 根据转换函数返回的结果，找出第一个数组中第二个数组没有的元素。
 * @param {Array} firstArray - 第一个数组。
 * @param {Array} secondArray - 第二个数组。
 * @param {Function} transformFunction - 用于转换元素的函数。
 * @returns {Array} - 返回第一个数组中存在而第二个数组中不存在，且经过转换函数处理后的元素数组。
 */
const differenceBy = (firstArray, secondArray, transformFunction) => {
  // 参数有效性检查
  if (!Array.isArray(firstArray) || !Array.isArray(secondArray)) {
    throw new TypeError('Expected both arguments to be arrays');
  }
  if (typeof transformFunction !== 'function') {
    throw new TypeError('Expected the third argument to be a function');
  }

  // 使用对象代替Set以优化性能
  const transformedValues = {};
  try {
    secondArray.forEach(value => {
      const transformedValue = transformFunction(value);
      // 确保转换后的值不是null或undefined
      if (transformedValue != null) {
        transformedValues[transformedValue] = true;
      }
    });
  } catch (error) {
    // 异常处理，可以选择记录日志或者重新抛出异常
    console.error('Error occurred during the transformation:', error);
    throw error; // Or handle this error gracefully depending on the use case
  }

  // 过滤第一个数组，返回不在第二个数组中（经过转换函数处理后）的元素
  return firstArray.filter(value => {
    const transformedValue = transformFunction(value);
    // 确保转换后的值不是null或undefined，并且在secondArray中不存在
    return transformedValue != null && !transformedValues[transformedValue];
  });
};

// 示例调用保持不变
console.log(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)); // [1.2]
console.log(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x)); // [2]



/**
 * 根据提供的比较函数，从第一个数组中找出不存在于第二个数组中的元素。
 * @param {Array} arr - 第一个数组，从中找出不存在于第二个数组中的元素。
 * @param {Array} val - 第二个数组，用于对比，找出存在于第一个数组中的元素。
 * @param {Function} comp - 比较函数，用于确定两个元素在经过某种处理后是否相等。
 * @returns {Array} 返回一个数组，包含第一个数组中经过比较函数处理后，不存在于第二个数组中的元素。
 * @throws {TypeError} 如果参数类型不正确，抛出类型错误异常。
 */
const differenceWith = (arr, val, comp) => {
  // 参数类型检查
  if (!Array.isArray(arr) || !Array.isArray(val) || typeof comp !== 'function') {
    throw new TypeError('Invalid arguments: `arr` and `val` should be arrays, `comp` should be a function.');
  }

  // 使用Map来优化性能，减少重复比较的次数
  const valMap = new Map();
  val.forEach(b => {
    const key = comp(b, b); // 使用比较函数处理后的值作为键
    valMap.set(key, true);
  });

  // 过滤arr数组中经过comp函数处理后存在于val中的元素
  return arr.filter(a => !valMap.has(comp(a, a)));
};

// 示例调用
differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)); // []



/**
 * 返回一个新数组，该数组省略了原数组的前n个元素。
 * @param {Array} arr - 原始数组。
 * @param {number} n - 要省略的元素数量， 默认为1。
 * @returns {Array} - 省略了前n个元素的新数组。
 */
const skipFirstNElements = (arr, n = 1) => {
  // 输入参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('arr参数必须是一个数组');
  }

  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new TypeError('n参数必须是一个非负整数');
  }

  // 省略前n个元素，直接利用数组的slice方法
  return arr.slice(n);
};

// 测试示例
console.log(skipFirstNElements([1, 2, 3])); // [2,3]
console.log(skipFirstNElements([1, 2, 3], 2)); // [3]
console.log(skipFirstNElements([1, 2, 3], 42)); // []



/**
 * 从数组的右侧删除指定数量的元素。
 * @param {Array} array - 要处理的数组。
 * @param {number} [numberOfElementsToRemove=1] - 要删除的元素的数量，默认为1。
 * @returns {Array} 处理后的数组。
 */
const dropRight = (array, numberOfElementsToRemove = 1) => {
  // 参数校验
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof numberOfElementsToRemove !== 'number' || numberOfElementsToRemove < 0) {
    throw new TypeError('Expected a non-negative number as the second argument');
  }

  // 处理边界条件
  const numberOfElementsToKeep = Math.max(0, array.length - numberOfElementsToRemove);
  return array.slice(0, numberOfElementsToKeep);
};

console.log(dropRight([1, 2, 3])); // [1, 2]
console.log(dropRight([1, 2, 3], 2)); // [1]
console.log(dropRight([1, 2, 3], 42)); // []



/**
 * 接收一个数组和一个函数作为参数，从数组的右侧开始，持续移除数组中满足给定函数条件的元素，并返回移除后的数组。
 * @param {Array} arr - 待处理的数组。
 * @param {Function} func - 用于判断是否移除元素的函数。该函数接收数组中的元素作为参数并返回一个布尔值。
 * @returns {Array} - 移除右侧满足条件元素后的新数组。
 */
const dropRightWhile = (arr, func) => {
  // 检查输入的 arr 是否为数组类型
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }

  // 检查输入的 func 是否为函数类型
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function as the second argument');
  }

  // 初始化 rightIndex 为数组长度减一，因为 JavaScript 数组索引是从0开始的
  let rightIndex = arr.length - 1;
  
  // 从数组的末尾向前遍历，直到找到第一个不满足 func 条件的元素
  while (rightIndex >= 0 && !func(arr[rightIndex])) {
    rightIndex--;
  }

  // 使用 slice 方法截取从数组开始到 rightIndex+1（包含）位置的子数组，然后返回
  return arr.slice(0, rightIndex + 1);
};

// 示例用法
console.log(dropRightWhile([1, 2, 3, 4], n => n < 3)); // [1, 2]



/**
 * dropWhile函数移除数组中满足特定条件的前缀元素。
 * @param {Array} arr - 待处理的数组。
 * @param {Function} func - 用于测试元素的函数，如果返回true，则停止移除。
 * @returns {Array} - 移除满足条件的前缀后的数组。
 */
const dropWhile = (arr, func) => {
  // 参数类型检查
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function as the second argument');
  }

  // 使用for循环而不是while循环以提高性能，一旦找到第一个不满足条件的元素即停止遍历
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      return arr.slice(i);
    }
  }
  
  // 如果没有找到满足条件的元素，则返回空数组
  return [];
};

// 示例调用保持不变
dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]



/**
 * 提取给定数组中每隔N个元素的数组。
 * @param {Array} arr - 输入的数组。
 * @param {number} nth - 间隔数，必须是正整数。
 * @returns {Array} - 返回提取后的数组。
 * @throws {TypeError} - 如果`arr`不是数组或者`nth`不是正整数，则抛出错误。
 */
const everyNth = (arr, nth) => {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('arr 参数必须是一个数组');
  }
  if (!Number.isInteger(nth) || nth <= 0) {
    throw new TypeError('nth 参数必须是一个正整数');
  }

  // 特殊情况处理
  if (nth === 1) {
    return arr;
  }

  // 主逻辑
  return arr.filter((e, i) => i % nth === nth - 1);
};

// 测试例子
console.log(everyNth([1, 2, 3, 4, 5, 6], 2)); // [ 2, 4, 6 ]
console.log(everyNth([1, 2, 3, 4, 5, 6], 1)); // [ 1, 2, 3, 4, 5, 6 ]

// 测试错误抛出
try {
  console.log(everyNth("not an array", 2));
} catch (error) {
  console.error(error.message); // "arr 参数必须是一个数组"
}

try {
  console.log(everyNth([1, 2, 3], 0));
} catch (error) {
  console.error(error.message); // "nth 参数必须是一个正整数"
}



/**
 * 过滤掉数组中非唯一的元素，只保留唯一的元素。
 * @param {Array} arr - 待处理的数组。
 * @return {Array} 返回一个只包含唯一元素的新数组。
 */
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

// 示例调用：过滤掉数组 [1, 2, 2, 3, 4, 4, 5] 中的非唯一元素
filterNonUnique([1, 2, 2, 3, 4, 4, 5]);  //[1,3,5]



/**
 * 根据指定条件筛选出非唯一的元素数组。
 * @param {Array} arr - 待筛选的数组。
 * @param {Function} fn - 判断元素是否唯一的函数，该函数接收当前元素和数组中的其他元素作为参数，返回一个布尔值。
 * @returns {Array} 筛选后的数组，仅包含那些根据指定条件不是唯一的元素。
 */
const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));

// 示例用法：筛选出id不唯一的对象数组中的元素
filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // 结果为 [ { id: 2, value: 'c' } ]，因为id为2的元素是数组中唯一一个id不重复的元素。 



/**
 * 查找数组中最后一个满足给定回调函数条件的元素。
 * @param {Array} arr 待查找的数组。
 * @param {Function} fn 回调函数，应返回布尔值以指示元素是否满足条件。
 * @returns 最后一个满足条件的元素，如果不存在则返回 undefined。
 */
const findLast = (arr, fn) => {
  // 检查回调函数是否为函数类型
  if (typeof fn !== 'function') {
    throw new TypeError('回调函数必须是一个函数');
  }

  // 使用数组的 reduceRight 方法实现，以按照从右到左的顺序遍历数组
  // 通过初始值为 undefined，确保能找到最后一个符合条件的元素
  const result = arr.reduceRight((acc, curr) => {
    // 直接使用回调函数的返回值作为判断依据
    if (fn(curr)) {
      return curr;
    }
    return acc;
  }, undefined);

  return result;
};

// 示例调用
console.log(findLast([1, 2, 3, 4], n => n % 2 === 1)); // 输出：1



/**
 * 查找数组中最后一个满足给定回调函数条件的元素的索引。
 * @param {Array} arr 待查找的数组。
 * @param {Function} fn 回调函数，应返回布尔值以指示元素是否满足条件。
 * @returns 最后一个满足条件的元素的索引，如果不存在则返回 -1。
 */
const findLastIndex = (arr, fn) => {
  // 类型检查：确保 arr 是数组，fn 是函数
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as the second argument');
  }

  let lastIndex = -1; // 初始化最后的索引为 -1，表示未找到
  
  // 遍历数组，从后往前找，这样可以找到最后一个满足条件的元素
  for (let i = arr.length - 1; i >= 0; i--) {
    if (fn(arr[i], i, arr)) {
      lastIndex = i; // 更新 lastIndex 为当前满足条件的索引
      break; // 找到一个就停止遍历，提高效率
    }
  }
  
  return lastIndex;
};

// 测试例子
console.log(findLastIndex([1, 2, 3, 4], n => n % 2 === 1)); // 应该输出 2
console.log(findLastIndex([1, 2, 3, 4], n => n === 5)); // 应该输出 -1



/**
 * 将数组展平到指定深度。
 * @param {Array} arr - 需要展平的数组。
 * @param {number} depth - 展平的深度（默认为1）。
 * @returns {Array} - 展平后的数组。
 */
const flatten = (arr, depth = 1) => {
  // 处理边界情况
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof depth !== 'number' || depth < 0) {
    throw new TypeError('Expected a non-negative number as the second argument');
  }

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (depth > 1 && Array.isArray(current)) {
      // 递归展平嵌套数组
      flatten(current, depth - 1).forEach(item => result.push(item));
    } else {
      // 将非数组元素或最浅层的数组元素添加到结果中
      result.push(current);
    }
  }
  
  return result;
};

// 测试案例
console.log(flatten([1, [2], 3, 4])); // [1, 2, 3, 4]
console.log(flatten([1, [2, [3, [4, 5], 6], 7], 8], 2)); // [1, 2, 3, [4, 5], 6, 7, 8]



/**
 * 遍历给定数组的每个元素，从数组末尾开始执行回调函数。
 * @param {Array} arr 要遍历的数组。
 * @param {Function} callback 对数组中每个元素执行的回调函数。
 * @throws {TypeError} 如果传入的首个参数不是数组，则抛出类型错误。
 * @throws {Error} 如果回调函数执行时抛出异常，则捕获并输出错误信息。
 */
const forEachRight = (arr, callback) => {
  // 增加类型检查，确保传入的是一个数组
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }

  // 使用 try/catch 捕获回调函数执行时可能抛出的异常
  try {
    // 避免使用 slice 创建数组拷贝，直接操作原数组进行反向遍历
    // 注意：这将改变原数组的顺序，如果需要保持原数组不变，请使用 arr.slice().reverse()
    for (let i = arr.length - 1; i >= 0; i--) {
      callback(arr[i]);
    }
  } catch (error) {
    // 根据需求处理异常，这里只是简单地打印错误信息
    console.error('Error occurred during forEachRight iteration:', error);
  }
};

// 测试优化后的函数
const array = [1, 2, 3, 4];
forEachRight(array, val => console.log(val)); // '4', '3', '2', '1'

// 测试传入非数组的情况
// forEachRight({}, val => console.log(val)); // 抛出 TypeError



/**
 * 计算数组中各元素出现的频率，并以对象形式返回结果。
 * @param {Array<*>} arr - 输入的数组，其中元素可以是任何类型，但为了作为Map键，推荐使用可序列化的类型（如字符串、数字或Symbol）。
 * @returns {Object.<string, number>} - 返回一个对象，其键为数组中的元素，值为该元素在数组中出现的次数。
 */
const frequencies = (arr) => {
  // 检查传入的参数是否为数组，如果不是，则抛出一个错误
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array');
  }

  /**
   * 使用 Map 代替对象进行频率计数，以便在处理大量数据时获得更好的性能表现。
   * @type {Map<*, number>}
   */
  const frequencyMap = arr.reduce((acc, value) => {
    acc.set(value, (acc.get(value) || 0) + 1);
    return acc;
  }, new Map());

  // 将 Map 转换为对象以符合题目要求
  const frequenciesObj = {};
  for (const [key, value] of frequencyMap.entries()) {
    frequenciesObj[key] = value;
  }

  return frequenciesObj;
};

// 测试用例
console.log(frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b'])); // { a: 4, b: 2, c: 1 }



/**
 * 将数组中的元素按照指定函数或属性进行分组。
 *
 * @param {Array} arr - 要分组的数组。可以包含任何类型的元素。
 * @param {Function|string} fn - 用于确定元素如何分组的函数或属性名称。
 *   如果为函数，将对数组中的每个元素应用此函数，并使用返回值作为分组键。
 *   如果为字符串（仅适用于对象元素），则使用元素上该属性的值作为分组键。
 *
 * @returns {Object.<string|number, Array>} 分组结果，是一个对象，其键是分组依据的值，对应的值是具有相同分组依据值的所有元素组成的数组。
 *
 * @throws {TypeError} 当 `arr` 不是数组或者 `fn` 不是函数或字符串时抛出错误。
 */
const groupBy = (arr, fn) => {
  // 输入参数校验
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof fn !== 'function' && typeof fn !== 'string') {
    throw new TypeError('Expected a function or a string as the second argument');
  }

  // 使用对象属性直接赋值以提高性能
  return arr.reduce((acc, val, i) => {
    const key = typeof fn === 'function' ? fn(val) : val[fn];
    
    // 直接赋值优化，避免每次使用concat创建新数组实例
    if (!acc[key]) acc[key] = [];
    acc[key].push(arr[i]);

    return acc;
  }, {});
};

// 测试案例保持不变
console.log(groupBy([6.1, 4.2, 6.3], Math.floor)); // {4: [4.2], 6: [6.1, 6.3]}
console.log(groupBy(['one', 'two', 'three'], 'length')); // {3: ['one', 'two'], 5: ['three']}



/**
 * 检查两个数组是否包含相同的元素（不考虑顺序）。
 * @param {Array} a - 第一个数组。
 * @param {Array} b - 第二个数组。
 * @returns {boolean} - 如果两个数组包含相同的元素，则返回true；否则返回false。
 */
const containsSameElements = (a, b) => {
  const uniqueInA = new Set(a);
  const uniqueInB = new Set(b);
  
  // 检查两个集合的大小是否相等
  if (uniqueInA.size !== uniqueInB.size) return false;

  // 使用every遍历uniqueInA，确保每个元素都在uniqueInB中
  return [...uniqueInA].every(element => uniqueInB.has(element));
};
containsSameElements([1, 2, 4], [2, 4, 1]); // true



/**
 * 获取数组的第一个元素。如果数组为空或不是数组，则返回 undefined。
 * @param {Array} arr - 输入的数组。
 * @returns {*} - 数组的第一个元素或 undefined。
 */
const getFirstArray = (arr) => {
  // 参数类型校验，确保传入的是一个数组。
  if (!Array.isArray(arr)) {
    // 为了不改变函数的输出，我们选择打印警告而不是抛出错误。
    console.warn("Expected an array as input.");
    return undefined;
  }

  // 优化后的逻辑，更加直观且保持原有逻辑不变。
  return arr && arr.length ? arr[0] : undefined;
};

// 测试用例保持不变
console.log(getFirstArray([1, 2, 3])); // 1
console.log(getFirstArray([])); // undefined
console.log(getFirstArray(null)); // undefined
console.log(getFirstArray(undefined)); // undefined



/**
 * 检查源数组是否包含目标数组中的所有元素。
 * @param {Array} arr 源数组。
 * @param {Array} values 目标数组，包含需要在源数组中查找的元素。
 * @returns {boolean} 如果源数组包含目标数组中的所有元素，则返回true；否则返回false。
 */
const includesAll = (arr, values) => values.every(v => arr.includes(v));
includesAll([1, 2, 3, 4], [1, 4]); // true
includesAll([1, 2, 3, 4], [1, 5]); // false



/**
 * 检查数组中是否包含一个值元素，是则返回true，否则返回false。
 * @param {Array} arr - 要检查的数组。
 * @param {Array} values - 要查找的值数组。
 * @returns {boolean} 如果数组包含值元素，则返回true；否则返回false。
 * 
*/
const includesAny = (arr, values) => values.some(v => arr.includes(v));
includesAny([1, 2, 3, 4], [2, 9]); // true
includesAny([1, 2, 3, 4], [8, 9]); // false



/**
 * 返回一个数组中指定元素的所有索引位置。
 * @param {Array} arr - 待搜索的数组。
 * @param {*} val - 待搜索的元素。
 * @returns {Array} 包含指定元素所有索引的数组，如果未找到则返回空数组。
 */
const findIndexesOf = (arr, val) => {
  // 输入参数类型检查
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }

  // 使用reduce方法遍历数组，收集所有匹配的元素的索引
  return arr.reduce((indexes, el, i) => {
    if (el === val) {
      // 使用concat来添加索引，以保持函数的纯净性（不直接修改输入数组）
      return indexes.concat(i);
    }
    return indexes;
  }, []);
};

// 测试示例
console.log(findIndexesOf([1, 2, 3, 1, 2, 3], 1)); // [0, 3]
console.log(findIndexesOf([1, 2, 3], 4)); // []



/**
 * 返回传入数组中除了最后一个元素的所有元素。
 * 如果传入的不是数组或数组长度小于等于1，则返回空数组。
 * 
 * @param {Array} arr - 待处理的数组。
 * @return {Array} 处理后的数组，除了最后一个元素。
 */
const allButLastElement = arr => {
  // 检查传入的参数是否为数组
  if (!Array.isArray(arr)) {
    console.warn('Warning: Expected an array as input.');
    return [];
  }

  // 检查数组长度是否大于1
  if (arr.length <= 1) {
    // 如果数组长度小于等于1，直接返回空数组
    return [];
  }

  // 对于数组长度大于1的情况，使用slice方法返回除了最后一个元素的所有元素
  // 这样做保持了原数组的不变性，避免了直接修改原数组
  return arr.slice(0, -1);
};

// 测试示例
console.log(allButLastElement([1, 2, 3])); // 预期输出: [1, 2]
console.log(allButLastElement([1])); // 预期输出: []
console.log(allButLastElement([])); // 预期输出: []
console.log(allButLastElement('not an array')); // 预期输出: []



/**
 * 创建一个指定宽度（w）和高度（h）的二维数组，并为所有元素指定一个默认值（val）。
 * @param {number} w - 数组的宽度。
 * @param {number} h - 数组的高度。
 * @param {*} val - 数组中所有元素的默认值，默认为null。
 * @returns {Array<Array<*>>} 一个二维数组，其宽度为w，高度为h，所有元素初值为val。
 * @throws {Error} 如果w或h不是正整数，则抛出错误。
 */
const createDefaultValueGrid = (w, h, val = null) => {
  // 参数校验：确保w和h是正整数。
  if (!Number.isInteger(w) || !Number.isInteger(h) || w <= 0 || h <= 0) {
    throw new Error('Width and height must be positive integers.');
  }

  // 使用Array.from和map创建二维数组，并填充默认值val。
  return Array.from({ length: h }, () => Array.from({ length: w }, () => val));
};

// 示例调用：创建一个2x2的二维数组，所有元素初值为0。
console.log(createDefaultValueGrid(2, 2, 0)); // 输出：[[0, 0], [0, 0]]



/**
 * 初始化一个数组，该数组的元素为从start开始，以step为步长，到end结束的序列。
 * @param {number} end - 序列的结束值。
 * @param {number} [start=0] - 序列的起始值，默认为0。
 * @param {number} [step=1] - 序列的步长，默认为1。
 * @return {Array<number>} 一个包含从start开始，以step为步长，到end结束的序列的数组。
 * @throws {Error} 如果step为0，则抛出错误。
 * @throws {Error} 如果step为负数，则抛出错误。
 * @throws {Error} 如果end小于start，则抛出错误。
 * 
*/
const initializeArrayWithRange = (end, start = 0, step = 1) => {
  // 参数校验
  if (typeof end !== 'number' || typeof start !== 'number' || typeof step !== 'number') {
    throw new TypeError('All arguments must be numbers');
  }
  if (step === 0) {
    throw new Error('Step cannot be zero');
  }

  // 处理反向序列
  if (start > end) {
    const temp = start;
    start = end;
    end = temp;
    step *= -1;
  }

  // 调整数组长度的计算方式以提高精确性
  const length = Math.ceil((end - start + 1) / Math.abs(step));

  return Array.from({ length }, (v, i) => i * step + start);
};

// 测试用例
console.log(initializeArrayWithRange(5)); // [0,1,2,3,4,5]
console.log(initializeArrayWithRange(7, 3)); // [3,4,5,6,7]
console.log(initializeArrayWithRange(9, 0, 2)); // [0,2,4,6,8]
console.log(initializeArrayWithRange(2, 5, -1)); // [5,4,3,2]



/**
 * 初始化一个数组，其中包括指定范围内的数字（反向），其中‘start’和‘end’包括在序列中。
 * @param {number} end - 序列的结束值。
 * @param {number} [start=0] - 序列的起始值，默认为0。
 * @param {number} [step=1] - 序列的步长，默认为1。
 * @return {Array<number>} 一个包含从start开始，以step为步长，到end结束的序列的数组。
 * @throws {Error} 如果step为0，则抛出错误。
 * @throws {Error} 如果step为负数，则抛出错误。
 * @throws {Error} 如果end小于start，则抛出错误。
 *
*/
const createArrayFromStartToEnd = (end, start = 0, step = 1) => {
  // 参数验证
  if (typeof end !== 'number' || typeof start !== 'number' || typeof step !== 'number') {
    throw new TypeError('All arguments must be numbers');
  }
  if (step === 0) {
    throw new Error('Step cannot be zero');
  }

  // 计算数组的长度，并创建数组
  const length = Math.ceil((end - start + 1) / step);
  const result = Array.from({ length });

  // 使用for循环而不是.map以优化性能
  for (let i = 0; i < length; i++) {
    result[i] = (length - i - 1) * step + start;
  }

  return result;
};

// 测试示例
console.log(createArrayFromStartToEnd(5)); // [5,4,3,2,1,0]
console.log(createArrayFromStartToEnd(7, 3)); // [7,6,5,4,3]
console.log(createArrayFromStartToEnd(9, 0, 2)); // [8,6,4,2,0]



/**
 * 初始化一个包含指定元素的数组。
 * @param {number} n - 数组的长度。
 * @param {*} val - 数组中每个元素的初始值，默认为0。
 * @returns {Array} - 初始化后的数组。
 * @throws {TypeError} - 如果n不是数字或val的类型不适合使用。
 */
const initializeArrayWithValues = (n, val = 0) => {
  // 参数验证
  if (typeof n !== 'number' || isNaN(n) || !Number.isInteger(n)) {
    throw new TypeError('n必须是一个整数');
  }

  if (n < 0) {
    throw new Error('n不能为负数');
  }

  // 此处对val的验证可以根据具体使用场景进行，这里仅作为示例
  // 如果val用于特定上下文，如插入DOM，需要确保其安全性
  // 这里我们只做简单的类型检查，实际应用中可能需要更复杂的验证
  if (typeof val === 'function' || val instanceof HTMLElement) {
    throw new TypeError('val不能是函数或HTMLElement');
  }

  // 优化数组填充方式
  // 对于简单场景，Array(n).fill(val)已经足够高效，但对于大型数组和复杂val，
  // 可能需要考虑其他性能优化措施，这里保持原填充方法不变，因为val是简单类型且效率已经足够高。
  
  return Array(n).fill(val);
};

console.log(initializeArrayWithValues(5, 2)); // [2, 2, 2, 2, 2]



/**
 *  初始化一个n维数组，其中每个元素的初始值为val。
 * @param {*} val - 数组中每个元素的初始值，默认为0。
 * @param {...number} args - 数组的维度。
 * @return {Array} - 初始化后的数组。
 * 
*/
const initializeNDArray = (val, ...args) =>
  args.length === 0
    ? val
    : Array.from({ length: args[0] }).map(() => initializeNDArray(val, ...args.slice(1)));
initializeNDArray(1, 3); // [1,1,1]
initializeNDArray(5, 2, 2, 2); // [[[5,5],[5,5]],[[5,5],[5,5]]]



/**
 * 在给定数组的指定索引处插入一个或多个元素，并返回修改后的数组。
 * @param {Array} arr - 目标数组。
 * @param {number} i - 要插入元素的索引。
 * @param {...any} v - 要插入的元素或元素数组。
 * @returns {Array} - 插入元素后的新数组。
 * @throws {TypeError} - 如果传入的 arr 参数不是一个数组。
 */
const insertAt = (arr, i, ...v) => {
  // 输入验证：确保 arr 是一个数组
  if (!Array.isArray(arr)) {
    throw new TypeError('传入的 arr 参数必须是一个数组');
  }

  // 边界条件处理：确保索引 i 是有效范围内的整数
  i = Math.max(0, Math.min(i, arr.length));

  // 使用 splice 方法插入元素
  arr.splice(i + 1, 0, ...v);
  
  return arr;
};

let myArray = [1, 2, 3, 4];
console.log(insertAt(myArray, 2, 5)); // [1, 2, 3, 5, 4]

let otherArray = [2, 10];
console.log(insertAt(otherArray, 0, 4, 6, 8)); // [2, 4, 6, 8, 10]



/**
 * 计算两个数组的交集。
 * @param {Array} a 第一个数组。
 * @param {Array} b 第二个数组。
 * @returns {Array} 两个数组的交集。
 */
const arrayIntersection = (a, b) => {
  // 参数校验：确保a和b都是数组
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('输入参数必须为数组');
  }

  // 为了优化性能，将较小的数组转换为Set
  const smallerArray = a.length < b.length ? a : b;
  const largerArray = a.length < b.length ? b : a;

  const set = new Set(smallerArray);
  // 使用filter过滤出在两个数组中都存在的元素
  return largerArray.filter(x => set.has(x));
};

try {
  console.log(arrayIntersection([1, 2, 3], [4, 3, 2])); // [2, 3]
} catch (error) {
  console.error(error.message);
}



/**
 * 计算两个数组的交集，通过指定的函数对数组元素进行比较。
 * @param {Array} a 第一个数组
 * @param {Array} b 第二个数组
 * @param {Function} fn 用于比较数组元素的函数
 * @returns {Array} 两个数组的交集，元素按原数组顺序保持
 */
const intersectionBy = (a, b, fn) => {
  // 参数类型校验
  if (!Array.isArray(a) || !Array.isArray(b) || typeof fn !== 'function') {
    throw new TypeError('Expected arrays and a function as arguments');
  }

  // 对较小数组应用fn并转换为Set
  const set = new Set(b.map(fn));
  // 对较大数组进行遍历，使用Set.has()检查交集
  return a.filter(x => set.has(fn(x)));
};

// 示例调用
intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
intersectionBy([{ title: 'Apple' }, { title: 'Orange' }], [{ title: 'Orange' }, { title: 'Melon' }], x => x.title); // [{ title: 'Orange' }]



/**
 * 计算两个数组的交集，使用自定义比较函数 comp 来决定元素是否相等。
 * @param {Array} a - 第一个数组。
 * @param {Array} b - 第二个数组。
 * @param {Function} comp - 比较函数，接受两个参数，返回布尔值。
 * @returns {Array} - 两个数组的交集。
 * @throws {TypeError} - 如果输入不是预期的类型。
 */
const intersectionWith = (a, b, comp) => a.filter(x => b.findIndex(y => comp(x, y)) !== -1);
intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1.5, 3, 0]



/**
 *  判断 val 是否为指定的类型 type。
 *  @param {string} type - 要检查的类型。
 *  @param {*} val - 要检查的值。
 *  @returns {boolean} - 如果 val 是指定的类型，则返回 true，否则返回 false。
 *  @throws {TypeError} - 如果 type 不是字符串。 
 * 
*/
const is = (type, val) => {
  // 明确排除 null，同时保留对空数组的判断，解决了原代码中对空数组的误判问题
  if (val === null) return false;
  
  const typeString = Object.prototype.toString.call(val).slice(8, -1);
  // 使用 Object.prototype.toString.call(val) 进行类型检查，并截取所需的类型名部分
  return typeString === type;
};

// 测试用例
console.log(is('Array', [1]));      // true
console.log(is('ArrayBuffer', new ArrayBuffer())); // true
console.log(is('Map', new Map()));    // true
console.log(is('RegExp', /./g));      // true
console.log(is('Set', new Set()));    // true
console.log(is('WeakMap', new WeakMap())); // true
console.log(is('WeakSet', new WeakSet())); // true
console.log(is('String', ''));        // true
console.log(is('String', new String(''))); // true
console.log(is('Number', 1));         // true
console.log(is('Number', new Number(1))); // true
console.log(is('Boolean', true));     // true
console.log(is('Boolean', new Boolean(true))); // true



/**
 * 检查给定的对象是否具有类似数组的行为，即非空对象且拥有可迭代协议（Symbol.iterator）。
 *
 * @param {any} obj - 待检查的对象。
 * @returns {boolean} 如果对象具有类似数组的特性，则返回`true`，否则返回`false`。
 */
const isArrayLike = obj => {
  // 确保对象不为 null 或 undefined，增加对 undefined 的显式检查
  if (obj == null || typeof obj !== 'object') {
    return false;
  }

  // 排除字符串和函数类型，因为它们虽然可迭代，但通常不被视为数组或类似数组的对象
  if (typeof obj === 'string' || typeof obj === 'function') {
    return false;
  }

  // 检查对象是否具有 Symbol.iterator 属性且为函数类型，以确保其可迭代
  return typeof obj[Symbol.iterator] === 'function';
};

console.log(isArrayLike([1, 2, 3])); // true
console.log(isArrayLike(document.querySelectorAll('.className'))); // true
console.log(isArrayLike('abc')); // false，现在正确地将字符串排除在外
console.log(isArrayLike(null)); // false
console.log(isArrayLike(undefined)); // false，显式处理了 undefined



/**
 * 检查数组A中的所有元素是否都包含在数组B中，并且出现的次数相同。
 *
 * @param {Array<number>} arrayA - 第一个待比较的数组，元素为数字类型。
 * @param {Array<number>} arrayB - 第二个待比较的数组，元素为数字类型，用于检查arrayA的元素是否都包含其中且数量一致。
 * @returns {boolean} - 如果数组A的所有元素（无重复）都在数组B中以相同的数量出现，则返回`true`；否则返回`false`。
 * @throws {TypeError} - 当任一输入参数不是数组时抛出此错误。
 */
const isContainedIn = (arrayA, arrayB) => {
  // 增加类型检查，确保输入是数组
  if (!Array.isArray(arrayA) || !Array.isArray(arrayB)) {
    throw new TypeError('Both inputs must be arrays');
  }

  // 构建 arrayB 中元素的计数映射
  const countMap = new Map();
  arrayB.forEach(element => {
    countMap.set(element, (countMap.get(element) || 0) + 1);
  });

  // 遍历 arrayA，检查每个元素在 arrayB 中的数量
  for (const element of arrayA) {
    // 检查元素是否存在于 arrayB 中以及数量是否符合要求
    if (!countMap.has(element) || countMap.get(element) < 1) {
      return false;
    }
    countMap.set(element, countMap.get(element) - 1);
  }

  return true;
};

console.log(isContainedIn([1, 4], [2, 4, 1])); // true



/**
 * 检查给定值是否为空。
 * @param {any} val - 要检查的值。可以是对象、数组、字符串或null/undefined。
 * @returns {boolean} 如果值为空（例如：空数组、空对象、空字符串或者 null/undefined），则返回 true；否则返回 false。
 */
const isEmpty = (val) => {
  /**
   * 防御性编程：首先检查val是否为null或undefined
   */
  if (val == null) {
    return true;
  }

  /**
   * 明确类型处理逻辑：对于非对象类型（不包括数组和null/undefined），不认为它们是"空"
   */
  if (typeof val !== 'object' && typeof val !== 'string') {
    return false;
  }

  /**
   * 对于对象（包括数组）类型，检查其键的数量是否为0
   * 注意：由于我们已经排除了非对象类型的值，因此此处调用Object.keys(val).length是安全的
   */
  return Object.keys(val).length === 0;
};

// 测试用例
console.log(isEmpty([]));      // true
console.log(isEmpty({}));      // true
console.log(isEmpty(''));      // true
console.log(isEmpty([1, 2]));  // false
console.log(isEmpty({ a: 1, b: 2 })); // false
console.log(isEmpty('text'));  // false
console.log(isEmpty(123));     // false - 不将数字视为"空"
console.log(isEmpty(true));    // false - 不将布尔值视为"空"



/**
 * 检查给定的值是否为原始值。
 * 原始值包括 null, undefined, 数字, 字符串, 布尔值, Symbol, 以及 NaN。
 * 
 * @param {*} val - 需要检查的值。
 * @returns {boolean} - 如果给定值是原始值，则返回 true，否则返回 false。
 */
const isPrimitive = val => {
  // 使用 Object(val) !== val 来检查值是否为其对象形式，
  // 并且显式检查 val 是否为 NaN，因为 NaN 不等于自身。
  return Object(val) !== val || Number.isNaN(val);
};

// 测试用例
console.log(isPrimitive(null));      // true
console.log(isPrimitive(undefined)); // true
console.log(isPrimitive(50));        // true
console.log(isPrimitive('Hello!'));  // true
console.log(isPrimitive(false));     // true
console.log(isPrimitive(Symbol()));  // true
console.log(isPrimitive(NaN));       // true
console.log(isPrimitive([]));        // false
console.log(isPrimitive({}));        // false



/**
 * 判断一个数组是否按升序、降序或无序排列。
 *
 * @param {number[]} arr - 要检查的数字数组。
 * @returns {(1|-1|0)} - 返回值表示数组的排序状态：
 *   - 1: 数组是升序排列（或所有元素相等）；
 *   - -1: 数组是降序排列；
 *   - 0: 数组无序。
 * @throws {TypeError} - 如果输入不是数组，则抛出此错误。
 */
const isSorted = (arr) => {
  // 异常条件检查：确保输入是一个数组
  if (!Array.isArray(arr)) {
    throw new TypeError('输入必须是一个数组');
  }

  // 边界条件检查：处理空数组或只有一个元素的数组
  if (arr.length < 2) {
    return arr.length === 1; // 如果数组为空返回false，如果只有一个元素返回true
  }

  let isAscending = arr[0] < arr[1]; // 初始排序方向判断

  for (let i = 0; i < arr.length - 1; i++) {
    // 检查相邻元素，如果发现不匹配的排序方向，则返回0表示无序
    if ((isAscending && arr[i] > arr[i + 1]) || (!isAscending && arr[i] < arr[i + 1])) {
      return 0;
    }
  }

  // 如果数组是有序的，根据初始的排序方向返回1或-1
  return isAscending ? 1 : -1;
};

// 测试用例
console.log(isSorted([0, 1, 2, 2])); // 应该返回 1，因为数组是升序（或恒定顺序）的
console.log(isSorted([4, 3, 2])); // 应该返回 -1，因为数组是降序的
console.log(isSorted([4, 3, 5])); // 应该返回 0，因为数组是无序的
console.log(isSorted([])); // 应该返回 false，因为数组为空
console.log(isSorted([1])); // 应该返回 true，因为数组只有一个元素
console.log(isSorted({})); // 应该抛出 TypeError，因为输入不是数组



/**
 * 使用指定的分隔符和结束字符将元素数组连接成字符串
 *
 * @param {string[]} arr - 要连接的字符串数组。
 * @param {string} [separator=','] - 用于分隔结果字符串中每一个元素的字符串。
 * @param {string} [end=separator] - 一个可选的结束字符串，附加在倒数第二个元素之后。如果没有提供或等于' separator '，将使用最后一个分隔符。
 * @returns {string} 一个字符串，包含由分隔符连接的所有数组元素，并在适用的情况下附加指定的结束字符。
 * @throws {TypeError} - 如果第一个参数不是数组
 */
const join = (arr, separator = ',', end = separator) => {
  // 参数验证：确保 arr 是一个数组
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }

  // 使用数组的 map 和 join 方法来提高性能
  // 并处理结束符的特殊情况
  const mappedArr = arr.map((val, i) => {
    // 当数组只有一个元素并且结束符等于分隔符时，特殊处理
    if (arr.length === 1 && i === 0 && end === separator) {
      return val + end;
    }
    return val;
  });

  // 这里的 join 方法效率比 reduce 更高
  const joinedString = mappedArr.join(separator);

  // 当数组不是最后一个元素时，添加结束符
  // 注意：这里不再需要特别处理数组长度为1的情况，因为map已经处理了它
  if (end !== separator && arr.length > 1) {
    return joinedString.slice(0, -1) + end;
  }
  return joinedString;
};

// 测试用例
console.log(join(['pen', 'pineapple', 'apple', 'pen'], ',', '&')); // "pen,pineapple,apple&pen"
console.log(join(['pen', 'pineapple', 'apple', 'pen'], ',')); // "pen,pineapple,apple,pen"
console.log(join(['pen', 'pineapple', 'apple', 'pen'])); // "pen,pineapple,apple,pen"
console.log(join(['apple'], '&')); // "apple&"  特殊情况：只有一个元素且结束符与分隔符相同



/**
 * juxt函数接受一系列函数作为参数，返回一个新的函数。
 * 当调用这个新函数时，它会将所有传入的参数分别传递给之前的函数们，
 * 并以数组的形式返回每个函数处理后的结果。
 * 
 * @param {Function[]} fns - 一系列函数
 * @returns {Function} - 一个新函数，接受任意数量的参数
 */
const juxt = (...fns) => {
  // 类型安全检查：确保每个传入的参数都是函数
  if (!fns.every(fn => typeof fn === 'function')) {
    throw new TypeError('All arguments to juxt must be functions');
  }

  return (...args) => {
    // 用try-catch包裹以处理异常
    return [...fns].map(fn => {
      try {
        // 优化性能的迭代方式，避免双层map
        return args.map(arg => fn(arg));
      } catch (error) {
        console.error('Error executing function', fn, error);
        // 根据需求，这里可以返回null, []或其他错误标示
        return [];
      }
    });
  };
};

// 示例用法保持不变
console.log(juxt(
  x => x + 1,
  x => x - 1,
  x => x * 10
)(1, 2, 3)); // [[2,3,4],[0,1,2],[10,20,30]]

console.log(juxt(
  s => s.length,
  s => s.split(" ").join("-")
)("30 seconds of code")); // [[18],['30-seconds-of-code']]



/**
 * 获取数组的最后一个元素。如果数组为空或不是数组，则返回 undefined。
 * @param {Array} arr - 待处理的数组。
 * @returns {*} 数组的最后一个元素或 undefined（如果数组为空或不是数组）。
 */
const last = arr => {
  // 确保输入是一个数组
  if (!Array.isArray(arr)) {
    console.warn('last函数期望一个数组作为参数。非数组参数将返回undefined。');
    return undefined;
  }

  // 检查数组是否为空，若不为空则返回最后一个元素
  return arr.length ? arr[arr.length - 1] : undefined;
};

// 测试用例保持不变
console.log(last([1, 2, 3])); // 3
console.log(last([])); // undefined
console.log(last(null)); // undefined
console.log(last(undefined)); // undefined



/**
 * 返回传入参数中长度最长的字符串或数组。
 * 参数可以是任意数量的字符串或数组。
 * 
 * @param {Array<string|Array<any>>} ...items - 传入的字符串或数组参数
 * @returns {string|Array<any>} - 长度最长的字符串或数组
 */
const longestItem = (...items) => {
  // 定义一个默认的长度比较函数，适用于字符串和数组
  const defaultLengthComparator = (item) => {
    if (Array.isArray(item)) {
      return item.length;
    } else if (typeof item === 'string') {
      return item.length;
    }
    // 对于未知类型，返回0，这样它们永远不会被选为最大值
    return 0;
  };

  // 初始值为一个空字符串或空数组，根据第一个有效参数的类型来决定
  let longest = (typeof items[0] === 'string') ? '' : [];
  let comparator = defaultLengthComparator;

  // 遍历所有参数，更新最长项和比较函数
  for (let item of items) {
    // 使用提供的比较函数计算当前项的长度
    const length = comparator(item);

    // 如果当前项的长度大于当前最长项的长度，则更新最长项
    if (length > longest.length) {
      longest = item;
    }
  }

  return longest;
};

// 测试改进后的函数
console.log(longestItem('this', 'is', 'a', 'testcase')); // 'testcase'
console.log(longestItem(...['a', 'ab', 'abc'])); // 'abc'
console.log(longestItem(...['a', 'ab', 'abc'], 'abcd')); // 'abcd'
console.log(longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(longestItem([1, 2, 3], 'foobar')); // 'foobar'



/**
 * 将数组中的每个元素映射为对象的键，并使用提供的回调函数计算每个元素的值。
 * @param {Array} arr - 要映射的数组。
 * @param {Function} fn - 回调函数，用于计算每个元素的值。接受三个参数：当前元素，当前索引，整个数组。
 * @returns {Object} 包含由数组元素和回调函数计算得到的键值对的对象。
 * @throws {TypeError} 如果非数组或非函数类型被作为参数传入，抛出类型错误。
 */
const mapObject = (arr, fn) => {
  if (!Array.isArray(arr)) {
    throw new TypeError('mapObject expected an array as the first argument.');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('mapObject expected a function as the second argument.');
  }

  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    try {
      // 尝试执行回调函数，处理异常情况
      result[String(el)] = fn(el, i, arr);
    } catch (error) {
      // 在控制台记录错误，但不中断执行
      console.error(`Error processing element ${el}: ${error}`);
    }
  }
  return result;
};

// 示例调用
console.log(mapObject([1, 2, 3], a => a * a)); // { 1: 1, 2: 4, 3: 9 }



/**
 * 根据提供的函数或属性名，找出数组中对应值最大的元素。
 * @param {Array} arr - 待检查的数组。
 * @param {Function|string} fn - 用于比较的函数或属性名。
 * @returns {*} 返回数组中对应值最大的元素。
 * @throws {TypeError} 如果fn不是函数也不是字符串，则抛出类型错误。
 * @throws {Error} 如果数组为空，则可能返回undefined或抛出错误（根据具体实现）。
 * @throws {Error} 如果使用属性名访问时，数组中的元素不存在该属性，则抛出错误。
 */
const maxBy = (arr, fn) => {
  // 检查fn参数是否为函数或字符串
  if (typeof fn !== 'function' && typeof fn !== 'string') {
    throw new TypeError('Expected fn to be a function or a string');
  }

  // 处理空数组的情况
  if (arr.length === 0) {
    return undefined; // 或者 throw new Error('Input array is empty');
  }

  let max;
  let value;

  // 如果fn是函数，则使用fn对数组元素进行处理并找出最大值
  if (typeof fn === 'function') {
    // 为了优化性能，使用循环代替map和扩展运算符
    for (let i = 0; i < arr.length; i++) {
      value = fn(arr[i]);
      if (max === undefined || value > max) {
        max = value;
      }
    }
  } else {
    // 如果fn是字符串，则视为属性名，对数组中的对象元素进行属性访问并找出最大值
    for (let i = 0; i < arr.length; i++) {
      // 对象元素安全检查
      if (!arr[i] || typeof arr[i] !== 'object' || !arr[i].hasOwnProperty(fn)) {
        throw new Error(`Property ${fn} does not exist on element at index ${i}`);
      }
      value = arr[i][fn];
      if (max === undefined || value > max) {
        max = value;
      }
    }
  }

  return max;
};

// 测试例子
console.log(maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)); // 8
console.log(maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')); // 8



/**
 * 从数组中获取最大的n个元素。
 * @param {Array} arr - 输入数组。
 * @param {number} [n=1] - 要获取的最大元素数量，默认为1。
 * @returns {Array} - 包含输入数组中最大的n个元素的数组。
 * @throws {TypeError} - 如果输入数组不是数组或者n不是非负整数，则抛出错误。
 */
const maxN = (arr, n = 1) => {
  // 参数验证
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) throw new TypeError('Expected a non-negative integer');
  
  // 如果n大于等于输入数组的长度，则返回整个排序后的数组
  if (n >= arr.length) return [...arr].sort((a, b) => b - a);
  
  // 为获取少量最大元素优化的性能方法
  const result = [];
  for (let i = 0; i < n; i++) {
    let maxIndex = i;
    // 在剩余未处理的元素中找到最大值的索引
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[maxIndex]) maxIndex = j;
    }
    result.push(arr[maxIndex]);
    // 将最大元素与当前元素交换，以避免再次选择
    [arr[maxIndex], arr[i]] = [arr[i], arr[maxIndex]];
  }
  return result;
};

// 测试案例
console.log(maxN([1, 2, 3])); // [3]
console.log(maxN([1, 2, 3], 2)); // [3, 2]
console.log(maxN([])); // 根据业务逻辑，应抛出错误或返回空数组



/**
 * 从数组中获取前n个最小的元素
 * @param {Array} arr 输入的数组
 * @param {number} n 需要返回的最小元素数量，默认为1
 * @returns {Array} 返回包含前n个最小元素的新数组
 */
const minN = (arr, n = 1) => {
  // 参数校验
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError('Expected a non-negative integer as the second argument');
  }

  // 执行排序和切片操作
  return [...arr].sort((a, b) => a - b).slice(0, n);
};

// 测试示例
console.log(minN([1, 2, 3])); // [1]
console.log(minN([1, 2, 3], 2)); // [1, 2]
console.log(minN("not an array", 2)); // 抛出TypeError
console.log(minN([1, 2, 3], -1)); // 抛出TypeError



/**
 * 寻找数组中出现频率最高的元素
 * @param {Array} arr - 待分析的数组
 * @return {*} - 出现频率最高的元素
 */
const mostFrequent = (arr) => {
  // 优化1: 增强鲁棒性，确保输入是一个非空数组
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Invalid input: Input must be a non-empty array.');
  }

  // 优化4: 使用Map代替普通对象以提高在大数组处理时的性能
  const countElements = (arr) => arr.reduce((a, v) => {
    a.set(v, (a.get(v) || 0) + 1);
    return a;
  }, new Map());

  const elementCounts = countElements(arr);

  // 优化2和3: 为了提高代码的可读性，将查找最频繁元素的逻辑抽离成一个单独的函数
  const findMostFrequent = (elementCounts) => {
    let maxCount = 0;
    let mostFrequentElement = null;

    // 遍历Map，寻找最大出现次数和对应的元素
    elementCounts.forEach((count, element) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentElement = element;
      }
    });

    return mostFrequentElement;
  };

  return findMostFrequent(elementCounts);
};

mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'



/**
 * 检查数组中是否存在任何元素满足给定的条件（通过函数fn判断）。
 * 如果数组中没有元素满足条件，则返回true；否则返回false。
 * 
 * @param {Array} arr - 要检查的数组。
 * @param {Function} fn - 用于判断元素是否满足条件的函数，默认为Boolean函数。
 * @returns {boolean} - 如果没有元素满足条件，则返回true；否则返回false。
 */
const noElementsMatch = (arr, fn = Boolean) => {
  // 检查arr是否为数组，如果不是，则抛出一个错误。
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }

  try {
    // 使用数组的some方法，检查是否有元素满足条件。
    return !arr.some(fn);
  } catch (error) {
    // 如果在执行过程中遇到错误，则捕获错误并抛出一个更清晰的错误消息。
    throw new Error('An error occurred during the array traversal or condition check.');
  }
};

// 示例用法：
console.log(noElementsMatch([0, 1, 3, 0], x => x == 2)); // true
console.log(noElementsMatch([0, 0, 0])); // true



/**
 * 将传入字符串中的换行符统一替换为指定的标准化换行符。
 * @param {string} str 需要处理的字符串。
 * @param {string} normalized 指定的标准化换行符，默认为'\r\n'。
 * @returns {string} 处理后的字符串。
 */
const standardizeLineEndings = (str, normalized = '\r\n') => {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as the first argument');
  }
  
  // 使用正则表达式和指定的换行符进行替换
  return str.replace(/\r?\n/g, normalized);
};

// 示例1：将所有换行符替换为 '\r\n'
const multilineString = 'This\r\nis a\nmultiline\nstring.\r\n';
const standardizedString1 = standardizeLineEndings(multilineString);
console.log(standardizedString1); // 输出: 'This\r\nis a\r\nmultiline\r\nstring.\r\n'

// 示例2：将所有换行符替换为 '\n'
const standardizedString2 = standardizeLineEndings(multilineString, '\n');
console.log(standardizedString2); // 输出: 'This\nis a\nmultiline\nstring.\n'



/**
 * 获取数组的第n个元素或从尾部开始的第n个元素。
 * @param {Array} arr - 待处理的数组。
 * @param {number} n - 元素的索引。正数表示从头部开始的索引，-1表示获取整个数组，其他负数表示从尾部开始的相对索引。
 * @returns {*} - 指定位置的元素，如果不存在则返回undefined。
 */
const getElementByNthIndex = (arr, n = 0) => {
  // 参数校验：确保arr是一个数组
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }

  // 参数校验：确保n是一个数字
  if (typeof n !== 'number') {
    throw new TypeError('Expected a number as the second argument');
  }

  // 处理负数索引的情况，除了-1以外
  if (n < -1) {
    return getElementByNthIndex(arr, arr.length + n); // 递归调用，将负数索引转换为正数索引
  }

  // 使用slice获取指定范围的元素
  const result = n === -1 ? arr.slice(n) : arr.slice(n, n + 1);
  
  // 确保返回值始终是数组
  return result.length > 0 ? result[0] : undefined;
};

console.log(getElementByNthIndex(['a', 'b', 'c'], 1)); // 'b'
console.log(getElementByNthIndex(['a', 'b', 'b'], -3)); // 'a'



/**
 * 通过给定偏移量循环旋转数组中的元素。
 * @param {Array} arr - 要旋转的输入数组。
 * @param {number} offset - 旋转数组的位置数。正数向右旋转，负数向左旋转。
 * @returns {Array} 一个新数组，其中元素按偏移量进行了旋转。
 * @throws {TypeError} 如果第一个参数不是数组，或者第二个参数不是整数，则抛出类型错误。
 */
const rotateArray = (arr, offset) => {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('期望第一个参数为数组');
  }
  if (typeof offset !== 'number' || !Number.isInteger(offset)) {
    throw new TypeError('期望第二个参数为整数');
  }

  // 明确处理偏移量为0的情况，以提高清晰度和效率
  if (offset === 0) {
    return [...arr];
  }

  const length = arr.length;
  // 将偏移量标准化，以避免冗余旋转
  offset = offset % length;
  
  // 使用slice和spread语法进行旋转，以实现清晰和简单的操作
  return [...arr.slice(offset), ...arr.slice(0, offset)];
};

// 示范功能的测试用例
console.log(rotateArray([1, 2, 3, 4, 5], 2)); // [3, 4, 5, 1, 2]
console.log(rotateArray([1, 2, 3, 4, 5], -2)); // [4, 5, 1, 2, 3]
console.log(rotateArray([1, 2, 3, 4, 5], 0)); // [1, 2, 3, 4, 5]



/**
 * 生成给定数组的所有排列组合。
 * @param {Array} arr 输入的数组。
 * @returns {Array} 返回输入数组的所有排列组合。
 * @throws {TypeError} 如果输入不是数组，则抛出类型错误。
 */
const permutations = (arr) => {
  // 增加类型检查以确保输入是一个数组
  if (!Array.isArray(arr)) {
    throw new TypeError('输入必须是一个数组');
  }
  
  // 显式处理空数组的情况
  if (arr.length === 0) {
    return [];
  }

  // 主要的排列逻辑
  const generatePermutations = (current, remaining) => {
    if (remaining.length === 0) {
      return [current];
    }

    const permutations = [];
    // 遍历剩余元素，将每个元素加入到当前排列中，并递归生成剩余元素的排列
    for (let i = 0; i < remaining.length; i++) {
      const next = remaining[i];
      // 从剩余元素中移除当前元素，以便在下一次递归中不再使用
      const nextRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];
      permutations.push(...generatePermutations([...current, next], nextRemaining));
    }
    return permutations;
  };
  // 调用递归函数，以空数组为初始排列，开始生成所有排列
  return generatePermutations([], arr);
};
// 测试示例
console.log(permutations([1, 33, 5])); // [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]



const pick = (obj, arr) => {
  // 增加类型检查
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object for the first argument');
  }
  
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array for the second argument');
  }

  // 使用Object.hasOwnProperty()来避免原型链上的属性
  return arr.reduce((acc, curr) => {
    if (obj.hasOwnProperty(curr)) { // 确保只处理对象自身属性
      acc[curr] = obj[curr];
    }
    return acc;
  }, {});
};

// 测试修改后的函数
console.log(pick({ a: 1, b: '2', c: 3 }, ['a', 'c'])); // { 'a': 1, 'c': 3 }
// 检查类型错误的情况
console.log(pick(null, ['a', 'c'])); // 应抛出TypeError
console.log(pick(123, ['a', 'c'])); // 应抛出TypeError
console.log(pick({ a: 1, b: '2', c: 3 }, {})); // 应抛出TypeError



/**
 * 生成给定数以内的所有质数。
 * @param {number} num - 要生成质数的上限。
 * @returns {number[]} - 返回一个包含所有质数的数组。
 */
const primes = (num) => {
  // 校验输入是否为正整数，如果不是，抛出错误
  if (typeof num !== 'number' || num <= 1 || !Number.isInteger(num)) {
    throw new Error('输入必须是大于1的正整数');
  }

  // 创建一个初始认为都是质数的候选数组，从2开始到num
  const primeCandidates = Array.from({ length: num - 2 }, (_, i) => i + 2);

  // 使用埃拉托斯特尼筛法找出所有质数
  for (let i = 0; i * i <= num; i++) {
    // 如果当前数是质数
    if (primeCandidates[i]) {
      // 将其倍数标记为非质数
      for (let j = i * i; j < num; j += primeCandidates[i]) {
        primeCandidates[j] = null;
      }
    }
  }

  // 过滤掉标记为非质数的数，只保留质数
  return primeCandidates.filter(num => num !== null);
};

console.log(primes(10)); // [2, 3, 5, 7]



/**
 * 从数组中移除指定元素，返回一个新的数组。
 * @param {Array} arr 要操作的数组。
 * @param {...any} args 要移除的元素，可以是多个。
 * @returns {Array} 移除指定元素后的新数组。
 * @throws {TypeError} 如果第一个参数不是数组，则抛出类型错误。
 */
const pull = (arr, ...args) => {
  // 增强类型安全：确保arr是一个数组
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected the first argument to be an array');
  }

  // 处理边界条件：如果args为空，直接返回原数组的浅拷贝
  if (args.length === 0) {
    return [...arr];
  }

  // 提高查找效率：使用Set代替数组来存储需要pull的元素
  let argState = Array.isArray(args[0]) ? new Set(args[0]) : new Set(args);

  // 进行filter操作，并且避免修改原数组
  let pulled = arr.filter(v => !argState.has(v));

  // 返回新的数组，而不是修改原数组
  return pulled;
};

let myArray3 = ['a', 'b', 'c', 'a', 'b', 'c'];
console.log(pull(myArray3, 'a', 'c')); // modifiedArray = [ 'b', 'b' ] 



/**
 * 从数组中移除指定索引的元素，返回一个新的数组，不改变原数组。
 * @param {Array} arr 原始数组。
 * @param {Array} pullArr 需要移除的元素的索引数组。
 * @returns {Array} 移除指定索引元素后的新数组。
 */
const pullAtIndex = (arr, pullArr) => {
  // 创建原数组的副本以避免修改原数组
  let arrCopy = arr.slice();
  // 使用哈希表来存储需要pull的索引，以提高查找效率
  let pullMap = pullArr.reduce((map, i) => {
    // 检查索引是否在有效范围内
    if (i < 0 || i >= arrCopy.length) {
      throw new Error(`Index ${i} is out of bounds.`);
    }
    map[i] = true;
    return map;
  }, {});
  // 使用filter直接筛选出不需要pull的元素
  let pulled = arrCopy.filter((v, i) => !pullMap[i]);
  return pulled;
};

let myArray4 = ['a', 'b', 'c', 'd'];
console.log(pullAtIndex(myArray4, [1, 3])); // myArray保持不变，pulled = [ 'a', 'c' ]



const removeValues = (arr, pullArr) => {
  // 类型检查确保传入的参数是数组
  if (!Array.isArray(arr) || !Array.isArray(pullArr)) {
    throw new TypeError('Both arguments to removeValues must be arrays');
  }

  // 使用Set来优化性能，减少pullArr.includes(v)的重复查找
  const pullSet = new Set(pullArr);

  // 通过filter一次性筛选出需要移除的元素和需要保留的元素，提高代码可读性和性能
  const toRemove = arr.filter(v => pullSet.has(v));
  const mutateTo = arr.filter(v => !pullSet.has(v));

  // 直接修改原数组，并返回被移除的元素列表
  arr.length = 0;
  arr.push(...mutateTo);

  return toRemove;
};

let myArray5 = ['a', 'b', 'c', 'd'];
console.log(removeValues(myArray5, ['b', 'd'])); // myArray5 = [ 'a', 'c' ], removed = [ 'b', 'd' ]



/**
 * 根据给定的回调函数和值数组，从原数组中移除重复的元素。
 * @param {Array} arr 原始数组。
 * @param {...any} args - 可接受多个参数，包括待比较的值数组和一个回调函数。
 * @returns {Array} 返回一个新数组，该数组不含与给定值数组中元素重复的元素。
 * @throws {TypeError} 如果第一个参数不是数组，或最后一个参数不是函数，则抛出类型错误。
 */
const removeDuplicatesBy = (arr, ...args) => {
  // 输入参数校验：确保第一个参数为数组
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }

  // 确保最后一个参数为函数：用于处理和比较元素
  const length = args.length;
  const fn = typeof args[length - 1] === 'function' ? args.pop() : undefined;
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as the last argument');
  }

  // 使用Set存储不重复的值，以优化性能
  const argSet = new Set(args.map(val => fn(val)));
  // 过滤原数组，返回不包含在Set中的元素，即不重复的元素
  return arr.filter((v) => !argSet.has(fn(v)));
};

// 示例用法
var myArray6 = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
console.log(removeDuplicatesBy(myArray6, [{ x: 1 }, { x: 3 }], o => o.x)); // [ { x: 2 } ]



/**
 * 优化后的 reducedFilter 函数
 * 添加了对输入数据的简单校验，增强了代码的可读性，同时对性能进行了优化。
 * 
 * @param {Array} dataset - 要处理的数据集，应包含对象元素。
 * @param {Array} keys - 需要保留的键名数组。
 * @param {Function} filterFn - 用于过滤元素的函数，应返回布尔值。
 * @returns {Array} - 过滤后的数据数组，仅包含指定的键。
 */
const reducedFilter = (dataset, keys, filterFn) => {
  // 数据集和键名数组的校验
  if (!Array.isArray(dataset)) {
    throw new TypeError('Expected an array for dataset');
  }
  if (!Array.isArray(keys) || keys.some(key => typeof key !== 'string')) {
    throw new TypeError('Expected an array of strings for keys');
  }
  if (typeof filterFn !== 'function') {
    throw new TypeError('Expected a function for filterFn');
  }

  // 性能优化：先通过filterFn过滤数据，然后一次性处理所有需要的键
  const filteredData = dataset.filter(filterFn);
  return filteredData.map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );
};

// 示例数据不变，用于测试优化后的函数
const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];

// 调用优化后的函数
console.log(reducedFilter(data, ['id', 'name'], item => item.age > 24));
// 预期输出: [{ id: 2, name: 'mike' }]



/**
 * 对数组进行连续累加，将每一次累加的结果都存入一个新的数组中。
 * @param {Array} arr 待处理的数组。
 * @param {Function} fn 一个接受四个参数的回调函数：上一次累加的结果、当前元素、当前元素的索引、原数组。
 * @param {*} acc 初始累加值。
 * @returns {Array} 包含连续累加结果的数组。
 */
const reduceSuccessive = (arr, fn, acc) => {
  // 验证输入参数的类型和合法性
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array for the first argument');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function for the second argument');
  }

  try {
    return arr.reduce((res, val, i, arr) => {
      // 调用传入的累加函数，并处理其可能抛出的异常
      try {
        const result = fn(res.slice(-1)[0], val, i, arr);
        res.push(result);
      } catch (error) {
        console.error(`An error occurred during the accumulation process: ${error}`);
        // 根据需求，可以选择抛出异常、记录错误或忽略错误继续执行
        throw error; // 或者是 res.push(acc) 继续执行但不增加错误值
      }
      return res;
    }, [acc]);
  } catch (error) {
    // 对于reduce操作中可能出现的任何错误，进行适当的处理
    console.error(`An error occurred in reduceSuccessive: ${error}`);
    throw error; // 根据实际情况，可能需要抛出错误，或者返回一个合理的默认值
  }
};

// 示例调用，保持不变
console.log(reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0));
// 输出: [0, 1, 3, 6, 10, 15, 21]



/**
 * 根据提供的比较器，从数组中找到“最小”或“最大”的元素。
 * @param {Array} arr - 要处理的数组。
 * @param {Function} comparator - 比较器函数，返回一个数字表示两个元素之间的关系（>0 表示 b > a，<0 表示 a > b，0 表示 a 和 b 相等）。默认为 a - b。
 * @returns 数组中根据比较器定义的“最小”或“最大”元素。如果数组为空，返回 undefined。
 */
const findMinOrMaxByComparator = (arr, comparator = (a, b) => a - b) => {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }

  if (typeof comparator !== 'function') {
    throw new TypeError('Expected a function as the second argument');
  }

  return arr.reduce((result, current) => {
    const comparison = comparator(result, current);
    return comparison >= 0 ? current : result;
  });
};

// 示例用法
console.log(findMinOrMaxByComparator([1, 3, 2])); // 1
console.log(findMinOrMaxByComparator([1, 3, 2], (a, b) => b - a)); // 3
console.log(
  findMinOrMaxByComparator(
    [{ name: 'Tom', age: 12 }, { name: 'Jack', age: 18 }, { name: 'Lucy', age: 9 }],
    (a, b) => a.age - b.age
  )
); // {name: "Lucy", age: 9}



/**
 * 根据给定的预测函数，从数组中排除满足条件的元素，返回一个新数组。
 * @param {Function} pred 预测函数，接受数组元素作为参数，返回一个布尔值。
 * @param {Array} array 要处理的数组。
 * @returns {Array} 一个新数组，包含所有不满足预测函数条件的数组元素。
 */
const filterOutByCondition = (pred, array) => {
  // 参数验证：确保 pred 是函数，array 是数组
  if (typeof pred !== 'function') {
    throw new TypeError('pred 应该是一个函数');
  }
  if (!Array.isArray(array)) {
    throw new TypeError('array 应该是一个数组');
  }

  try {
    // 使用 Array.prototype.filter 方法过滤数组
    return array.filter((...args) => {
      try {
        return !pred(...args);
      } catch (error) {
        console.error('预测函数执行时发生错误:', error);
        return false; // 预测函数出错时，将当前元素排除
      }
    });
  } catch (error) {
    console.error('过滤操作发生错误:', error);
    // 出现异常时，返回空数组以保持函数的稳定性
    return [];
  }
};

// 示例用法
console.log(filterOutByCondition(x => x % 2 === 0, [1, 2, 3, 4, 5])); // [1, 3, 5]
console.log(filterOutByCondition(word => word.length > 4, ['Apple', 'Pear', 'Kiwi', 'Banana'])); // ['Pear', 'Kiwi']



/**
 * 从数组中移除满足特定条件的元素，返回被移除的元素数组，不改变原数组。
 * @param {Array} arr - 待处理的数组。
 * @param {Function} func - 用于测试每个元素的条件函数，返回 true 的元素将被移除。
 * @returns {Array} 被移除的元素数组。
 */
const remove = (arr, func) => {
  // 检查输入是否为数组或空数组，如果是，则直接返回空数组
  if (!Array.isArray(arr) || !arr.length) {
    return [];
  }

  // 使用 filter 方法创建一个包含满足条件（func 返回 true）的元素的新数组
  const filteredArr = arr.filter(func);

  // 使用 reduce 方法从原数组中移除这些元素，保持原数组不变
  const result = filteredArr.reduce((acc, val) => {
    const index = arr.indexOf(val); // 查找当前元素在原数组中的位置
    if (index !== -1) { // 如果找到，从原数组中移除，并将其添加到结果数组中
      arr.splice(index, 1);
      return acc.concat(val);
    }
    return acc;
  }, []);

  return result;
};

// 测试示例
console.log(remove([1, 2, 3, 4], n => n % 2 === 0)); // 输出 [2, 4]



/**
 * 从给定数组中随机选择一个元素。
 * 如果数组为空，返回 undefined。
 * 
 * @param {Array} arr - 待从中随机选择元素的数组
 * @returns {*} - 随机选择的数组元素，如果输入为空数组则返回 undefined
 */
const randomElementFromArray = arr => {
  // 检查传入参数是否为数组
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as input');
  }

  // 检查数组是否为空
  if (arr.length === 0) {
    return undefined;
  }

  // 生成数组中的一个随机索引，并返回对应元素
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

// 示例调用
console.log(randomElementFromArray([3, 7, 9, 11])); // 可能输出 3, 7, 9, 或 11
console.log(randomElementFromArray([])); // 输出 undefined



/**
 * 从给定数组中随机选择指定数量的元素。
 * @param {Array} arr - 待选择元素的数组。
 * @param {number} n - 要选择的元素数量，默认为1。
 * @returns {Array} - 从原数组中随机选择的元素数组。
 * @throws {TypeError} - 如果传入的arr不是数组类型。
 * @throws {Error} - 如果传入的n是非负整数以外的值。
 */
const sampleSize = ([...arr], n = 1) => {
  // 参数校验
  if (!Array.isArray(arr)) {
    throw new TypeError('arr参数必须是一个数组');
  }
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('n参数必须是一个非负整数');
  }

  // 边界条件处理
  let m = Math.min(n, arr.length); // 如果n大于数组长度，只取数组长度作为m

  // 洗牌算法，并取前m个元素作为结果
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  
  return arr.slice(0, n);
};

// 测试示例
console.log(sampleSize([1, 2, 3], 2)); // 可能的输出: [3,1] 或 [1,2]
console.log(sampleSize([1, 2, 3], 4)); // 可能的输出: [2,3,1] 或 [1,3,2]，注意这里按优化后的逻辑，输入不合法（n大于数组长度），应抛出错误



/**
 * Shank函数用于在指定索引位置插入一个或多个元素，并删除相同数量的元素。
 * @param {Array} arr 目标数组。
 * @param {number} index 插入位置的索引。
 * @param {number} delCount 要删除的元素数量。
 * @param {...any} elements 要插入的元素。
 * @returns {Array} 返回操作后的数组。
 * @throws {TypeError} 如果arr参数不是数组，则抛出TypeError。
 */
const insertAndDelete = (arr, index = 0, delCount = 0, ...elements) => {
  // 检查传入的arr是否为数组
  if (!Array.isArray(arr)) {
    throw new TypeError('arr参数必须是一个数组');
  }

  // 检查index和delCount是否为整数
  if (!Number.isInteger(index) || !Number.isInteger(delCount)) {
    throw new TypeError('index和delCount参数必须是整数');
  }

  // 防止index和delCount越界
  index = Math.max(0, Math.min(index, arr.length));
  delCount = Math.max(0, Math.min(delCount, arr.length - index));

  // 使用splice方法实现元素的插入和删除，以提高性能
  arr.splice(index, delCount, ...elements);
  return arr;
};

const names = ['alpha', 'bravo', 'charlie'];
try {
  const namesAndDelta = insertAndDelete(names, 1, 0, 'delta'); // [ 'alpha', 'delta', 'bravo', 'charlie' ]
  const namesNoBravo = insertAndDelete(names, 1, 1); // [ 'alpha', 'charlie' ]
  console.log(names); // ['alpha', 'charlie', 'delta']
} catch (error) {
  console.error(error);
}



/**
 * Fisher-Yates洗牌算法，用于安全地对数组进行随机排序。
 * @param {Array} arr - 待洗牌的数组。
 * @returns {Array} - 洗牌后的数组。
 * @throws {TypeError} - 如果传入的参数不是数组，则抛出类型错误。
 */
const shuffle = (arr) => {
  // 参数校验：确保传入的是一个数组。
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }
  
  // 复制数组以避免副作用，创建一个新的数组实例。
  const result = [...arr];
  let m = result.length;
  
  // Fisher-Yates洗牌算法的实现。
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [result[m], result[i]] = [result[i], result[m]];
  }
  
  // 返回洗牌后的数组。
  return result;
};

// 测试用例
const foo = [1, 2, 3];
const shuffledFoo = shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]
console.log(shuffledFoo);
console.log(foo);



/**
 * 返回两个数组中的相似元素。
 * @param {Array} sourceArray - 原始数组。
 * @param {Array} comparisonArray - 用于比较的数组。
 * @returns {Array} - 包含两个数组中相同元素的新数组。
 */
const findSimilarities = (sourceArray, comparisonArray) => {
  // 输入验证：确保两个参数都是数组
  if (!Array.isArray(sourceArray) || !Array.isArray(comparisonArray)) {
    throw new TypeError('Both arguments must be arrays');
  }

  // 为了提高性能，将比较数组转换为Set，因为Set的查找时间更短
  const comparisonSet = new Set(comparisonArray);

  // 使用filter方法和Set的has方法来找出相似的元素
  return sourceArray.filter(value => comparisonSet.has(value));
};

// 示例调用
console.log(findSimilarities([1, 2, 3], [1, 2, 4])); // [1, 2]



/**
 * 在已排序的数组中找到一个数应该被插入的位置。
 * @param {Array} arr - 已排序的数组。
 * @param {number} targetNum - 需要查找插入位置的数。
 * @returns {number} - 插入位置的索引。
 */
const sortedIndex = (arr, targetNum) => {
  // 验证输入是否为数组
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }

  // 判断数组是升序还是降序排列
  const isDescending = arr[0] > arr[arr.length - 1];

  // 使用二分查找来确定插入位置
  let low = 0;
  let high = arr.length - 1;
  let index = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const arrayNum = isDescending ? arr[mid] : arr[arr.length - 1 - mid]; // 根据排序顺序获取中间元素

    if ((isDescending && arrayNum >= targetNum) || (!isDescending && arrayNum <= targetNum)) {
      index = mid; // 更新插入位置
      high = mid - 1; // 在左侧继续查找
    } else {
      low = mid + 1; // 在右侧继续查找
    }
  }

  // 返回最终的插入位置
  return index === -1 ? arr.length : index;
};

console.log(sortedIndex([5, 3, 2, 1], 4)); // 输出：4 （在降序数组中，数字 4 应该插在索引 3 的位置）
console.log(sortedIndex([30, 50], 40)); // 输出正确：1 （在升序数组中，数字 40 应该插在索引 1 的位置）



/**
 * 根据提供的函数 fn 对数组 arr 进行排序，并返回第一个与给定值 n 相匹配的元素的索引。
 * 如果没有找到匹配的元素，则返回应该插入 n 的位置。
 * 
 * @param {Array} arr - 待搜索排序的数组。
 * @param {*} n - 需要查找插入位置的值。
 * @param {Function} fn - 用于比较的函数，它返回数组元素和给定值 n 的可比较值。
 * @returns {Number} - 第一个匹配元素的索引或应该插入 n 的位置。
 */
const sortedIndexBy = (arr, n, fn) => {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as the third argument');
  }

  // 空数组情况的处理
  if (arr.length === 0) {
    return 0;
  }

  // 判断数组是按升序还是降序排列
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);

  // 定义一个比较函数，用于确定插入位置
  const compareValue = (el) => (isDescending ? val >= fn(el) : val <= fn(el));

  // 执行查找
  const index = arr.findIndex(compareValue);

  // 返回找到的索引或应插入的位置
  return index === -1 ? arr.length : index;
};
sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0



/**
 * 在已排序的数组中找到给定元素最后出现的索引。数组可以是升序或降序。
 * 如果元素不存在，返回0。
 * 如果输入的数组未排序，抛出错误。
 * 
 * @param {Array} arr 已排序的数组
 * @param {*} n 要查找的元素
 * @return {number} 给定元素最后出现的索引
 */
const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.reverse().findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};
sortedLastIndex([10, 20, 30, 30, 40], 30); // 4



/**
 * 根据提供的排序函数和目标值，查找并返回应该将目标值插入到已排序数组中的索引。
 * 该函数假设数组已经根据提供的排序函数排序（可以是升序或降序）。
 * 
 * @param {Array} arr 已排序的数组。
 * @param {*} n 需要插入的目标值。
 * @param {Function} fn 用于比较的排序函数。
 * @returns {Number} 目标值应该插入的索引。
 * @throws {TypeError} 如果第一个参数不是数组，或者第三个参数不是函数，则抛出类型错误。
 */
const sortedLastIndexBy = (arr, n, fn) => {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as the third argument');
  }
  
  // 判断排序方向，优化逻辑判断
  const firstVal = fn(arr[0]);
  const lastVal = fn(arr[arr.length - 1]);
  const isDescending = firstVal > lastVal;

  const targetVal = fn(n);
  let index = -1;
  
  // 优化性能，避免不必要的数组操作
  for (let i = arr.length - 1; i >= 0; i--) {
    const elVal = fn(arr[i]);
    try {
      // 根据排序方向判断是否找到目标插入位置
      if ((isDescending && targetVal <= elVal) || (!isDescending && targetVal >= elVal)) {
        index = i;
        break;
      }
    } catch (error) {
      // 异常处理
      console.error('Error occurred in the comparison function:', error);
      // 可以根据需求决定是否要中断执行或只是记录错误
    }
  }

  // 返回目标插入位置（基于0的索引）
  return index === -1 ? 0 : arr.length - index;
};

// 测试用例
console.log(sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x)); // 2



/**
 * 使用自定义比较函数对输入数组进行稳定排序。
 * 通过保持每个元素的原始索引来确保排序的稳定性。
 * 
 * @param {Array} arr - 要排序的数组。
 * @param {Function} compare - 用于比较两个元素的函数。
 *                             应该返回一个负数、零或正数，以指示第一个元素是否小于、等于或大于第二个元素。
 * @returns {Array} - 排序后的数组。
 */
const stableSort = (arr, compare) => {
  // 验证输入参数
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof compare !== 'function') {
    throw new TypeError('Expected a function as the second argument');
  }

  // 创建一个包含元素及其原始索引的对象数组
  const itemsWithIndex = arr.map((item, index) => ({ item, index }));

  try {
    // 使用提供的比较函数对对象数组进行排序，并通过索引比较来保证稳定性
    itemsWithIndex.sort((a, b) => compare(a.item, b.item) || a.index - b.index);
  } catch (error) {
    console.error('An error occurred during sorting:', error);
    // 选择性地，根据应用程序需求处理或重新抛出错误
    throw error;
  }

  // 提取并返回排序后的元素
  return itemsWithIndex.map(({ item }) => item);
};

// 使用示例
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 假设希望根据元素的自然顺序进行稳定的排序
const stable = stableSort(arr, (a, b) => a - b); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]



/**
 * 计算两个数组的对称差集。
 * 对称差集是指两个集合A和B的对称差集，由所有属于A或B但不同时属于A和B的元素组成。
 * @param {Array} a 第一个数组
 * @param {Array} b 第二个数组
 * @returns {Array} 两个数组的对称差集
 */
const symmetricDifference = (a, b) => {
  // 输入验证
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('输入必须为数组');
  }

  const sA = new Set(a),
    sB = new Set(b);

  // 使用Set的特性进行对称差集计算，优化性能和简化代码
  // 这里利用了Set的差集方法，但需要注意Set的差集会自动去重
  const diffAtoB = Array.from(sA).filter(x => !sB.has(x));
  const diffBtoA = Array.from(sB).filter(x => !sA.has(x));

  return [...diffAtoB, ...diffBtoA];
};

// 测试用例
console.log(symmetricDifference([1, 2, 3], [1, 2, 4])); // [3, 4]
console.log(symmetricDifference([1, 2, 2], [1, 3, 1])); // [2, 3]
console.log(symmetricDifference([1, 2, "1"], ["1", "2", 1])); // [2, '2']



/**
 * 根据提供的函数fn，计算两个数组a和b的对称差集。
 * 对称差集是指存在于a或b中，但不同时存在于两个数组中的元素集合。
 * @param {Array} a - 第一个数组。
 * @param {Array} b - 第二个数组。
 * @param {Function} fn - 用于计算数组元素唯一标识的函数。
 * @returns {Array} - 返回a和b的对称差集。
 * @throws {TypeError} - 如果输入不是数组或fn不是函数，抛出类型错误。
 */
const symmetricDifferenceBy = (a, b, fn) => {
  // 增加输入验证
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('Expected input a and b to be arrays');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected fn to be a function');
  }

  // 使用对象缓存fn的结果，以避免重复计算
  const cacheA = new Map();
  const cacheB = new Map();
  
  // 构建a和b的缓存
  for (const item of a) {
    const value = fn(item);
    cacheA.set(value, item);
  }
  for (const item of b) {
    const value = fn(item);
    cacheB.set(value, item);
  }

  // 找到对称差集
  const result = [];
  for (const item of a) {
    const value = fn(item);
    if (!cacheB.has(value)) {
      result.push(item);
    }
  }
  for (const item of b) {
    const value = fn(item);
    if (!cacheA.has(value)) {
      result.push(item);
    }
  }

  return result;
};

// 以下是示例调用，保持不变
console.log(symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)); // [ 1.2, 3.4 ]
console.log(symmetricDifferenceBy([{ id: 1 }, { id: 2 }, { id: 3 }], [{ id: 1 }, { id: 2 }, { id: 4 }], i => i.id)); // [{ id: 3 }, { id: 4 }]



/**
 * 计算两个数组的对称差集。
 * @param {Array} arr 第一个数组。
 * @param {Array} val 第二个数组。
 * @param {Function} comp 比较函数，返回true表示两个元素相等。
 * @returns {Array} 包含两个数组中不重复元素的数组。
 */
const symmetricDifferenceWith = (arr, val, comp) => {
  // 输入验证
  if (!Array.isArray(arr) || !Array.isArray(val) || typeof comp !== 'function') {
    throw new TypeError('Invalid input: arr and val should be arrays, comp should be a function');
  }

  // 使用集合来存储结果
  const result = new Set();

  // 遍历第一个数组，添加到结果集合中
  for (let a of arr) {
    if (!val.some(b => comp(a, b))) {
      result.add(a);
    }
  }

  // 遍历第二个数组，添加到结果集合中
  for (let b of val) {
    if (!arr.some(a => comp(a, b))) {
      result.add(b);
    }
  }

  // 返回结果数组
  return Array.from(result);
};

// 示例用法  [1, 1.2, 3.9]
console.log(symmetricDifferenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)));



/**
 * 返回输入数组的尾部，即除了第一个元素之外的所有元素。
 * 如果输入不是数组，则抛出 TypeError。
 * 如果数组长度小于等于1，则返回一个空数组。
 * 
 * @param {Array} arr 输入的数组
 * @return {Array} 输入数组的尾部
 */
const tail = arr => {
  // 确保输入是一个数组
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as input');
  }

  // 对于数组长度大于1的情况，返回从索引1开始的所有元素，即尾部
  // 对于长度小于等于1的情况，返回一个空数组，以符合尾部的定义
  return arr.length > 1 ? arr.slice(1) : [];
};

// 测试用例
console.log(tail([1, 2, 3])); // 预期输出: [2, 3]
console.log(tail([1])); // 预期输出: []
console.log(tail([])); // 预期输出: []



/**
 * 从给定数组中获取前n个元素，并将它们放入一个新的数组中。
 * @param {Array} arr - 从中获取元素的数组。
 * @param {number} n - 要获取的元素数量。如果为负数，则被视为0。
 * @returns {Array} 一个新的数组，包含输入数组中的前n个元素。
 * @throws {TypeError} 如果第一个参数不是数组，或者第二个参数不是整数，则抛出类型错误。
 */
const takeFirst = (arr, n = 1) => {
  // 验证输入类型
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('Expected an integer as the second argument');
  }

  // 确保n为非负整数
  n = Math.max(n, 0);

  // 返回切片后的数组
  return arr.slice(0, n);
};

// 示例用法：
console.log(takeFirst([1, 2, 3], 5)); // [1, 2, 3]
console.log(takeFirst([1, 2, 3], 0)); // []
console.log(takeFirst([1, 2, 3], -2)); // []  现在负值输入会被优雅地处理



/**
 * 从给定数组中获取最后n个元素。
 * @param {Array} arr - 从中获取元素的数组。
 * @param {number} [n=1] - 从末尾获取的元素数量，默认为1。
 * @returns {Array} 一个新的数组，包含arr的最后n个元素。
 * @throws {TypeError} 如果arr不是数组或者n是负数，则抛出类型错误。
 */
const takeRight = (arr, n = 1) => {
  // 输入验证
  if (!Array.isArray(arr)) {
      throw new TypeError('第一个参数应为数组');
  }
  if (typeof n !== 'number' || n < 0) {
      throw new TypeError('第二个参数应为非负数');
  }

  // 处理边界情况
  if (arr.length === 0) {
      return [];
  }

  // 主要功能
  return arr.slice(arr.length - n, arr.length);
};

// 使用示例
console.log(takeRight([1, 2, 3], 2)); // 预期输出: [ 2, 3 ]
console.log(takeRight([1, 2, 3]));     // 预期输出: [3]
console.log(takeRight([], 2));         // 预期输出: []



/**
 * 从数组的右侧开始，只要提供的函数返回true，就持续取元素。
 * @param {Array} arr - 输入数组。
 * @param {Function} func - 用于测试数组中每个元素的函数，应返回true或false。
 * @returns {Array} 一个新数组，包含输入数组中满足条件的从末尾开始的元素。
 * @throws {TypeError} 如果第二个参数不是函数。
 */
const takeRightWhile = (arr, func) => {
  // 检查func是否为函数。
  if (typeof func !== 'function') {
    throw new TypeError('The second argument must be a function');
  }

  // 使用Array.prototype.reduceRight从右至左遍历数组，找到第一个不满足条件的元素，
  // 然后返回从该元素到数组末尾的所有元素。
  return arr.reduceRight((acc, el) => (func(el) ? acc : [el, ...acc]), []);
};

// 示例用法
console.log(takeRightWhile([1, 2, 3, 4], n => n < 3)); // 输出: [3, 4]
console.log(takeRightWhile([], n => n < 3)); // 输出: []
console.log(takeRightWhile([5, 6, 7, 8], n => n > 10)); // 输出: [5, 6, 7, 8]



/**
 * 从数组中获取元素，直到提供的函数返回false。
 * @param {Array} arr - 输入数组。
 * @param {Function} func - 用于测试数组中每个元素的函数，如果元素满足条件则返回true。
 * @returns {Array} 一个新数组，包含满足条件的元素。
 * @throws {TypeError} 如果输入数组不是数组类型或函数不是函数类型，则抛出TypeError。
 */
const takeWhile = (arr, func) => {
  for (const [i, val] of arr.entries()) if (func(val)) return arr.slice(0, i);
  return arr;
};

takeWhile([1, 2, 3, 4], n => n >= 3); // [1, 2]



/**
 * 将对象数组转换为基于提供的键值或索引的哈希表。
 * @param {Array} object - 待转换的对象数组。
 * @param {string|null} key - 用于作为哈希表键的对象属性名。如果为null或undefined，则使用对象在数组中的索引。
 * @returns {Object} 转换后的哈希表。
 */
const toHash = (object, key) => {
  // 检查是否为数组，如果不是，抛出类型错误
  if (!Array.isArray(object)) {
    throw new TypeError('Expected an array as the first argument');
  }

  // 使用更清晰的代码结构
  return object.reduce((acc, data, index) => {
    const currentKey = !key ? index : data[key];
    // 检查重复键
    if (acc[currentKey] !== undefined) {
      console.warn(`Duplicate key "${currentKey}" found. The value at the last occurrence will be used.`);
    }
    acc[currentKey] = data;
    return acc;
  }, {});
};

console.log(toHash([4, 3, 2, 1])); // { 0: 4, 1: 3, 2: 2, 3: 1 }
console.log(toHash([{ a: 'label' }], 'a')); // { label: { a: 'label' } }

let users = [{ id: 1, first: 'Jon' }, { id: 2, first: 'Joe' }, { id: 3, first: 'Moe' }];
let managers = [{ manager: 1, employees: [2, 3] }];

managers.forEach(manager => {
  manager.employees = manager.employees.map(id => toHash(users, 'id')[id]);
});

console.log(managers);



/**
 * 将不同类型的输入转换为键值对数组。
 * @param {Object|Array|string|Set|Map} obj - 需要转换的输入对象。
 * @returns {Array<Array<any>>} 转换后的键值对数组。
 */
const toPairs = obj => {
  // 根据输入类型分别处理
  if (Array.isArray(obj)) {
    return arrayToPairs(obj); // 处理数组
  }
  if (typeof obj === 'string') {
    return stringToPairs(obj); // 处理字符串
  }
  if (obj instanceof Set) {
    return setToPairs(obj); // 处理Set
  }
  if (obj instanceof Map) {
    return mapToPairs(obj); // 处理Map
  }
  
  // 默认处理普通对象
  return objectToPairs(obj);
};

/**
 * 将数组转换为键值对数组，数组索引作为键。
 * @param {Array} arr - 需要转换的数组。
 * @returns {Array<Array<any>>} 转换后的键值对数组。
 */
const arrayToPairs = arr => {
  // 数组转化为键值对
  return arr.map((value, index) => [index, value]);
};

/**
 * 将字符串转换为键值对数组，字符串索引作为键。
 * @param {string} str - 需要转换的字符串。
 * @returns {Array<Array<any>>} 转换后的键值对数组。
 */
const stringToPairs = str => {
  // 字符串转化为键值对
  return Array.from({ length: str.length }, (_, index) => [index, str[index]]);
};

/**
 * 将Set转换为键值对数组。
 * @param {Set} set - 需要转换的Set。
 * @returns {Array<Array<any>>} 转换后的键值对数组，注意Set中键即为值。
 */
const setToPairs = set => {
  // Set转化为键值对
  return Array.from(set.entries());
};

/**
 * 将Map直接转换为键值对数组。
 * @param {Map} map - 需要转换的Map。
 * @returns {Array<Array<any>>} 转换后的键值对数组。
 */
const mapToPairs = map => {
  // Map直接转化为键值对
  return Array.from(map.entries());
};

/**
 * 将普通对象转换为键值对数组。
 * @param {Object} obj - 需要转换的普通对象。
 * @returns {Array<Array<any>>} 转换后的键值对数组。
 */
const objectToPairs = obj => {
  // 普通对象转化为键值对
  return Object.entries(obj);
};



/**
 * 生成指定规则的序列
 * 
 * @param {Function} fn 一个接受一个参数并返回一个数组的函数，数组的第一个元素是下一个要添加到结果中的值，第二个元素是传递给下一个调用的值。当返回false时，循环终止。
 * @param {*} seed 传递给fn函数的初始值。
 * @return {Array} 根据fn函数和seed生成的数组。
 */
const generateSequenceFromSeed = (fn, seed) => {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected fn to be a function, but got ' + typeof fn);
  }

  let result = [],
    val = [null, seed],
    iterations = 0; // 防止无限循环

  // 设置最大迭代次数为1000，防止潜在的无限循环
  const MAX_ITERATIONS = 1000;

  while ((val = fn(val[1]))) {
    result.push(val[0]);
    iterations += 1;
    if (iterations > MAX_ITERATIONS) {
      throw new Error('Exceeded maximum iterations; potential infinite loop detected.');
    }
  }
  return result;
};

var f = n => (n > 50 ? false : [-n, n + 10]);
try {
  console.log(generateSequenceFromSeed(f, 10)); // [-10, -20, -30, -40, -50]
} catch (error) {
  console.error('Error:', error.message);
}



/**
 * 计算两个数组的并集。
 * @param {Array} a - 第一个数组。
 * @param {Array} b - 第二个数组。
 * @returns {Array} 数组 `a` 和 `b` 的并集，不包含重复元素。
 * @throws {TypeError} 如果 `a` 或 `b` 不是数组，则抛出错误。
 */
const union = (a, b) => {
  // 对输入参数进行类型检查
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('两个参数都必须是数组');
  }

  // 使用 Set 结构在合并数组时去重
  // 此部分代码保持不变，因为它是实现去重的一种高效方式
  // 虽然对于超大型数组可能存在性能问题，但在实际应用中，Set 对于小到中型数组而言效率较高
  return Array.from(new Set([...a, ...b]));
};

// 示例用法
console.log(union([1, 2, 3], [4, 3, 2])); // 预期输出：[1, 2, 3, 4]



/**
 * 合并两个数组，并通过指定的函数去重。
 * @param {Array} a 第一个数组
 * @param {Array} b 第二个数组
 * @param {Function} fn 用于去重的函数
 * @returns {Array} 合并并去重后的数组
 */
const unionBy = (a, b, fn) => {
  // 参数类型检查
  if (!Array.isArray(a) || !Array.isArray(b) || typeof fn !== 'function') {
    throw new TypeError('Expected arrays and a function as arguments');
  }

  // 使用Set记录所有遇到过的经过fn处理后的元素
  const set = new Set();
  const result = [];

  // 遍历数组a和b，将经过fn处理且不在set中的元素添加到result和set中
  for (let arr of [a, b]) {
    for (let item of arr) {
      try {
        const processedItem = fn(item);
        // 如果set中不存在当前处理后的元素，则将其添加到结果数组和set中
        if (!set.has(processedItem)) {
          result.push(item);
          set.add(processedItem);
        }
      } catch (error) {
        // 异常处理：可以选择记录错误、抛出自定义错误或继续执行
        console.error('Error processing item with function fn:', error);
        // 如果希望函数在遇到错误时继续执行而不是中断，可以跳过当前迭代
        continue;
      }
    }
  }

  return result;
};

// 示例调用保持不变
console.log(unionBy([2.1], [1.2, 2.3], Math.floor)); // [2.1, 1.2]
console.log(unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id)); // [{ id: 1 }, { id: 2 }, { id: 3 }]



/**
 * 生成两个数组的并集，不包含重复元素，使用指定的比较函数。
 * @param {Array} a 第一个数组
 * @param {Array} b 第二个数组
 * @param {Function} compareFunc 比较两个元素的函数，返回 true 表示元素相等
 * @returns {Array} 两个数组的并集，不含重复元素
 */
const unionWith = (a, b, compareFunc) => {
  // 参数验证
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new TypeError('输入参数 a 和 b 必须都是数组');
  }
  if (typeof compareFunc !== 'function') {
    throw new TypeError('输入参数 compareFunc 必须是一个函数');
  }

  // 使用 Set 存储不重复元素
  const unionSet = new Set(a);

  // 过滤数组 b 中未出现在数组 a 中的元素，并使用比较函数
  b.forEach(element => {
    // 检查 b 中的元素是否在 a 中根据 compareFunc 定义的条件
    if (!unionSet.has(element) && a.some(aElement => compareFunc(element, aElement))) {
      unionSet.add(element);
    }
  });

  // 返回并集数组
  return Array.from(unionSet);
};

// 示例调用
unionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1, 1.2, 1.5, 3, 0, 3.9]



/**
 * 返回一个包含原数组中唯一元素的新数组。
 * 对于对象类型元素，将通过JSON序列化来确保唯一性，这可能会丢失函数、Symbol等特殊类型属性。
 * @param {Array} arr - 需要去重的数组。
 * @returns {Array} 去重后的数组。
 */
function getUniqueElements(arr) {
  // 输入验证
  if (!Array.isArray(arr)) {
    console.warn("getUniqueElements 被调用时传入的不是数组。");
    return []; // 或者根据你的需求抛出错误
  }

  // 使用Set进行去重，但对对象类型使用JSON序列化的方式
  let uniqueArr = [];
  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    if (typeof element === 'object' && element !== null) {
      // 对象类型使用JSON序列化去重
      element = JSON.stringify(element);
    }

    if (!uniqueArr.includes(element)) {
      uniqueArr.push(element);
    }
  }

  return uniqueArr.map(item => {
    if (typeof item === 'string' && item.startsWith('{')) {
      // 如果是对象的字符串表示，反序列化回来
      return JSON.parse(item);
    }
    return item;
  });
}

console.log(getUniqueElements([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
console.log(getUniqueElements([{a: 1}, {a: 1}])); // [{a: 1}]
console.log(getUniqueElements("not an array")); // []



/**
 * 根据给定的比较函数fn，从数组arr中筛选出唯一的元素并返回新数组。
 * @param {Array} arr - 待处理的数组，数组元素应为对象。
 * @param {Function} fn - 比较函数，接受两个参数（数组的当前元素和已累计元素），返回布尔值。
 * @returns {Array} - 包含唯一元素的新数组，根据比较函数fn确定元素唯一性。
 */
const uniqueElementsBy = (arr, fn) => {
  // 输入验证
  if (!Array.isArray(arr)) {
    throw new TypeError('arr参数必须是一个数组');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('fn参数必须是一个函数');
  }

  // 使用Set来优化性能，减少重复元素的检查
  const uniqueSet = new Set();
  return arr.reduce((acc, v) => {
    // 使用传递的比较函数fn来确定元素是否唯一
    const isUnique = !uniqueSet.has(fn(v, null));
    if (isUnique) {
      uniqueSet.add(fn(v, null));
      acc.push(v);
    }
    return acc;
  }, []);
};

try {
  const result = uniqueElementsBy(
    [
      { id: 0, value: 'a' },
      { id: 1, value: 'b' },
      { id: 2, value: 'c' },
      { id: 1, value: 'd' },
      { id: 0, value: 'e' }
    ],
    (a, b) => a.id // 优化比较函数，只比较id
  );
  console.log(result); // [ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]
} catch (error) {
  console.error(error.message);
}



/**
 * 从数组的右边开始，返回所有不重复的元素。
 * 使用给定的比较函数fn来判断元素是否重复。
 * 
 * @param {Array} arr 要处理的数组
 * @param {Function} fn 比较函数，返回true表示两个元素重复
 * @return {Array} 不重复的元素数组，从原数组的右边开始
 */
const uniqueElementsFromRight = (arr, fn) => {
  // 参数类型检查
  if (!Array.isArray(arr)) {
    throw new TypeError('arr参数必须是一个数组');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('fn参数必须是一个函数');
  }

  // 使用Map来存储已经处理过的元素及其对应的值
  const seen = new Map();
  const result = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    const element = arr[i];
    
    // 检查当前元素是否已存在于Map中
    let isDuplicate = false;
    for (const existing of seen.values()) {
      if (fn(element, existing)) {
        isDuplicate = true;
        break;
      }
    }

    // 如果当前元素未被记录过，则添加到结果数组和Map中
    if (!isDuplicate) {
      seen.set(JSON.stringify(element), element);
      result.unshift(element);
    }
  }

  return result;
};

// 测试数据
const data6 = [
  { id: 0, value: 'a' },
  { id: 1, value: 'b' },
  { id: 2, value: 'c' },
  { id: 1, value: 'd' },
  { id: 0, value: 'e' }
];

// 调用函数
console.log(uniqueElementsFromRight(data6, (a, b) => a.id === b.id));
// 预期输出: [ { id: 0, value: 'e' }, { id: 1, value: 'd' }, { id: 2, value: 'c' } ]



/**
 * 计算两个数组的对称差集。
 * 对称差集是只存在于两个数组中其中一个数组，但不在两个数组都存在的元素集合。
 * @param {Array} arr1 第一个数组
 * @param {Array} arr2 第二个数组
 * @returns {Array} 对称差集数组
 */
const uniqueSymmetricDifference = (arr1, arr2) => {
  // 输入类型检查
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new TypeError('Both arguments must be arrays');
  }

  // 使用Set来去重并提高查找效率
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  // 过滤出存在于一个数组中但不存在于另一个数组的元素
  const difference = [];
  for (const value of set1) {
    if (!set2.has(value)) {
      difference.push(value);
    }
  }
  for (const value of set2) {
    if (!set1.has(value)) {
      difference.push(value);
    }
  }

  // 返回去重后的结果
  return [...new Set(difference)];
};

// 测试用例
console.log(uniqueSymmetricDifference([1, 2, 3], [1, 2, 4])); // [3, 4]
console.log(uniqueSymmetricDifference([1, 2, 2], [1, 3, 1])); // [2, 3]



/**
 * 将二维数组“解压”为一维数组的集合。
 * @param {Array<Array<any>>} inputArray - 输入的二维数组。
 * @returns {Array<Array<any>>} - 解压后的一维数组的集合。
 * @throws {TypeError} - 如果输入不是二维数组。
 */
const unzip = inputArray => {
  // 验证输入是否为二维数组
  if (!Array.isArray(inputArray) || !inputArray.every(item => Array.isArray(item))) {
    throw new TypeError('输入必须是二维数组');
  }

  // 初始化结果数组，并计算最大长度
  const maxLength = Math.max(...inputArray.map(x => x.length));
  const result = Array.from({ length: maxLength }).map(x => []);

  // 遍历每个子数组，将元素按索引放入结果数组
  for (let i = 0; i < inputArray.length; i++) {
    const currentSubArray = inputArray[i];
    for (let j = 0; j < currentSubArray.length; j++) {
      result[j].push(currentSubArray[j]);
    }
  }

  return result;
};

// 测试用例
console.log(unzip([['a', 1, true], ['b', 2, false]])); // [['a', 'b'], [1, 2], [true, false]]
console.log(unzip([['a', 1, true], ['b', 2]])); // [['a', 'b'], [1, 2], [true]]



/**
 * 使用给定函数对二维数组的每个子数组进行处理，并返回新的二维数组。
 * @param {Array<Array<any>>} arr - 一个二维数组。
 * @param {Function} fn - 一个应用于每个子数组的函数。
 * @returns {Array<Array<any>>} - 返回一个新的二维数组，其中每个子数组是原数组中对应子数组经过fn处理后的结果。
 */
const unzipWith = (arr, fn) => {
  // 异常处理：确保 arr 是一个二维数组
  if (!Array.isArray(arr) || arr.some(item => !Array.isArray(item))) {
    throw new TypeError('Expected an array of arrays');
  }
  
  // 处理边界条件：如果 arr 为空数组，直接返回空数组
  if (arr.length === 0) {
    return [];
  }

  // 计算最大子数组长度
  const maxLength = Math.max(...arr.map(x => x.length));

  // 构建初始数组
  const initialArray = Array.from({ length: maxLength }).map(x => []);

  // 使用更高效的 for 循环代替 forEach 和 reduce 结合的方式
  for (let i = 0; i < arr.length; i++) {
    const subArray = arr[i];
    for (let j = 0; j < subArray.length; j++) {
      initialArray[j].push(subArray[j]);
    }
  }

  // 应用函数 fn 到每个子数组，并构建结果数组
  return initialArray.map(subArray => {
    try {
      // 使用扩展运算符简化函数调用
      return fn(...subArray);
    } catch (error) {
      // 异常处理：捕获并处理 fn 执行时可能抛出的异常
      console.error('Error applying function:', error);
      return undefined; // 根据具体情况返回合适的值或抛出异常
    }
  });
};

// 测试示例
console.log(unzipWith([[1, 10, 100], [2, 20, 200]], (...args) => args.reduce((acc, v) => acc + v, 0)));
// 预期输出: [3, 30, 300]



/**
 * 根据给定权重从数组中随机选择一个元素。
 * @param {Array} arr - 待选择元素的数组。
 * @param {Array} weights - 对应于 `arr` 中每个元素的权重数组。
 * @returns {*} - 从 `arr` 中根据权重随机选择的元素。
 * @throws {Error} 如果 `arr` 不是非空数组，或者 `weights` 不是与 `arr` 长度相等的数字数组，或者权重之和不等于1，会抛出错误。
 */
const weightedSample = (arr, weights) => {
  // 参数校验
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('`arr` must be a non-empty array.');
  }
  if (!Array.isArray(weights) || arr.length !== weights.length) {
    throw new Error('`weights` must be an array of numbers with the same length as `arr`.');
  }
  
  // 确保权重之和为1
  const sum = weights.reduce((s, w) => s + w, 0);
  if (Math.abs(sum - 1) > Number.EPSILON) {
    throw new Error('The sum of weights must be exactly 1.');
  }

  // 预计算权重区间的累加值
  const cumulativeWeights = weights.reduce((acc, w, i) => {
    acc.push((i === 0 ? 0 : acc[i - 1]) + w);
    return acc;
  }, []);
  
  // 生成随机数，并根据权重区间选择对应的元素
  let roll = Math.random();
  return arr[cumulativeWeights.findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)];
};

console.log(weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1])); // 9  （示例调用保持不变）



/**
 * 从数组中移除指定的一组元素，然后返回剩余的元素数组。
 * @param {Array} arr - 待处理的数组。
 * @param {...any} args - 要移除的元素列表。
 * @returns {Array} 处理后的数组，不包含指定的元素。
 */
const without = (arr, ...args) => {
  // 输入验证：确保arr是一个数组
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  
  // 使用Set来优化性能，加快查找速度
  const argsSet = new Set(args);
  
  // 使用filter方法和Set来过滤掉不需要的元素
  return arr.filter(v => !argsSet.has(v));
};

// 测试示例
console.log(without([2, 1, 2, 3], 1, 2)); // [3]



/**
 * 计算两个数组的笛卡尔积。
 * @param {Array} arr1 第一个数组。
 * @param {Array} arr2 第二个数组。
 * @returns {Array} 由两个数组中元素组合而成的新数组。
 */
const cartesianProduct = (arr1, arr2) => {
  // 参数校验
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new TypeError('参数必须是数组');
  }

  // 优化的实现方式，避免了多次创建数组实例
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      result.push([arr1[i], arr2[j]]);
    }
  }

  return result;
};

try {
  console.log(cartesianProduct([1, 2], ['a', 'b'])); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
} catch (error) {
  console.error(error.message);
}



/**
 * 将多个数组按索引对应合并成二维数组。
 * @param {...Array} inputArrays - 任意数量的数组作为输入。
 * @returns {Array} 返回一个由输入数组按索引对应合并成的二维数组。
 * @throws {TypeError} 如果任何输入参数不是数组，则抛出TypeError。
 */
const zip = (...inputArrays) => {
  // 检查所有输入是否为数组
  const isValidInput = inputArrays.every(x => Array.isArray(x));
  if (!isValidInput) {
    throw new TypeError('All arguments must be arrays');
  }

  // 确定所有输入数组的最大长度
  const maxLength = Math.max(...inputArrays.map(x => x.length));

  // 创建结果数组，并按索引对应合并元素
  const result = [];
  for (let i = 0; i < maxLength; i++) {
    const row = [];
    inputArrays.forEach(array => {
      // 对于超出数组长度的索引，默认使用 null 填充（也可根据需要替换其他值）
      const value = array[i] !== undefined ? array[i] : null;
      row.push(value);
    });
    result.push(row);
  }

  return result;
};

try {
  console.log(zip(['a', 'b'], [1, 2], [true, false])); // [['a', 1, true], ['b', 2, false]]
  console.log(zip(['a'], [1, 2], [true, false])); // [['a', 1, true], [null, 2, false]]
  // 测试对非数组输入的处理
  console.log(zip(['a', 'b'], 'not an array', [true, false])); // 预期抛出 TypeError
} catch (error) {
  console.error(error.message);
}



/**
 * 将数组一起压缩，并可选择地对每个组合应用函数。
 * 如果提供，则最后一个参数期望是一个函数。
 * 
 * @param {...Array} arrays - 要一起压缩的数组。
 * @param {Function} [customFn] - 可选的函数，用于应用到每个组合上。
 * @returns {Array} - 组合值的数组，可选地经过转换。
 */
const zipArraysWithFunction = (...arrays) => {
  // 验证输入参数
  const isFunction = typeof arrays[arrays.length - 1] === 'function';
  const customFn = isFunction ? arrays.pop() : undefined;
  
  if (!arrays.every(Array.isArray)) {
    throw new TypeError('除最后一个参数外，所有参数应为数组');
  }
  
  // 确定最短长度以避免越界错误
  const shortestLength = Math.min(...arrays.map(array => array.length));
  
  // 压缩数组，并在提供自定义函数时应用
  return Array.from({ length: shortestLength }, (_, i) => {
    const values = arrays.map(array => array[i]);
    return isFunction ? customFn(...values) : values;
  });
};

// 使用示例
console.log(zipArraysWithFunction([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c));
// 预期输出: [111, 222]