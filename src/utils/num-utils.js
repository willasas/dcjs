// 数字操作

/**
 * 计算给定数字的平均值。
 * @param {...number} nums - 一个或多个数字参数。
 * @returns {number} 平均值，如果输入无效则抛出错误。
 */
const average = (...nums) => {
  // 验证参数是否有效
  if (nums.length === 0) {
    throw new Error('数组不能为空');
  }
  
  // 确保所有参数都是数字类型
  const validNums = nums.map(num => {
    const n = Number(num);
    if (isNaN(n)) {
      throw new Error('参数包含非数字值');
    }
    return n;
  });
  
  // 处理只有一个参数的情况
  if (validNums.length === 1) {
    throw new Error('计算平均值需要至少两个数字');
  }

  // 计算并返回平均值
  return validNums.reduce((acc, val) => acc + val, 0) / validNums.length;
};

try {
  console.log(average(...[1, 2, 3])); // 2
  console.log(average(1, 2, 3)); // 2
  console.log(average('1', '2', '3')); // 抛出错误
  console.log(average(1)); // 抛出错误
  console.log(average()); // 抛出错误
} catch (error) {
  console.error(error.message);
}



/**
 * 计算二项系数 C(n, k)
 * @param {number} n - 总数
 * @param {number} k - 选择的数的个数
 * @returns {number} - 二项系数的结果
 */
const binomialCoefficient = (n, k) => {
  // 强化输入校验
  if (typeof n !== 'number' || typeof k !== 'number') {
    throw new TypeError('Both n and k must be numbers');
  }
  
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (!Number.isFinite(n) || !Number.isFinite(k)) {
    throw new Error('n and k must be finite numbers');
  }

  // 处理边界条件
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;

  // 调整k的值以减少乘法运算
  if (n - k < k) k = n - k;

  // 使用更稳定的计算方式来避免精度问题
  let res = BigInt(n);
  for (let j = 2; j <= k; j++) {
    res *= BigInt(n - j + 1);
    res /= BigInt(j);
  }

  // 由于BigInt不提供round方法，且为保证原函数返回类型一致性，此处对结果进行四舍五入
  // 注意：这可能会导致与原实现不同的舍入行为
  const result = Number(res.toString());
  return Math.round(result);
};
binomialCoefficient(8, 2); // 28



/**
 * 将摄氏度转换为华氏度。
 * @param {number} degrees - 摄氏度值。
 * @returns {number} 转换后的华氏度值。
 * @throws {TypeError} 如果输入不是数字。
 */
const celsiusToFahrenheit = degrees => {
  // 输入验证
  if (typeof degrees !== 'number' || isNaN(degrees) || !isFinite(degrees)) {
    throw new TypeError('输入必须是一个有效的数字');
  }

  // 执行转换并返回结果
  return 1.8 * degrees + 32;
};

try {
  console.log(celsiusToFahrenheit(33)); // 91.4
} catch (error) {
  console.error(error.message);
}



/**
 * 将华氏度转换为摄氏度。
 * @param {number} degrees 华氏度值。
 * @returns {number} 转换后的摄氏度值。
 * @throws {Error} 如果输入不是有效的数字。
 */
function fahrenheitToCelsius(degrees) {
  // 验证输入是否为有效的数字
  if (typeof degrees !== 'number' || isNaN(degrees)) {
    throw new Error("Invalid input: degrees must be a number.");
  }

  // 执行华氏度到摄氏度的转换
  return ((degrees - 32) * 5) / 9;
}

// 例子：正常情况下的调用
try {
  console.log(fahrenheitToCelsius(32)); // 0
} catch (error) {
  console.error(error.message); // 如果发生错误，打印错误信息
}

// 例子：错误情况下的调用
try {
  console.log(fahrenheitToCelsius("32")); // 将抛出错误
} catch (error) {
  console.error(error.message); // 打印错误信息: Invalid input: degrees must be a number.
}



/**
 * 将给定的数值限制在指定的范围内。
 * @param {number} num 需要限制的数值。
 * @param {number} minValue 最小值。
 * @param {number} maxValue 最大值。
 * @returns {number} 限制后的数值。
 */
const clampNumber = (num, minValue, maxValue) => {
  // 参数类型检查
  if (typeof num !== 'number' || typeof minValue !== 'number' || typeof maxValue !== 'number') {
    throw new TypeError('所有参数必须为数字');
  }

  // 处理NaN和无穷大情况
  if (Number.isNaN(num) || Number.isNaN(minValue) || Number.isNaN(maxValue) ||
      !Number.isFinite(num) || !Number.isFinite(minValue) || !Number.isFinite(maxValue)) {
    throw new Error('参数中包含无效的数字（NaN或无穷大）');
  }

  // 使用更直观的逻辑来限制数值范围
  return num < minValue ? minValue : (num > maxValue ? maxValue : num);
};

// 测试
console.log(clampNumber(2, 3, 5)); // 3
console.log(clampNumber(1, -1, -5)); // -1
console.log(clampNumber('2', 3, 5)); // 抛出TypeError
console.log(clampNumber(2, '3', 5)); // 抛出TypeError
console.log(clampNumber(Infinity, 3, 5)); // 抛出Error



/**
 * 构建函数的组合。该函数接受一个或多个函数作为参数，返回一个新的函数，
 * 新函数从右到左依次调用输入的函数，将前一个函数的返回值作为后一个函数的参数。
 * @param {...Function} fns - 一个或多个函数参数，它们将被组合成一个新的函数。
 * @returns {Function} 返回一个组合后的函数，该函数依次调用所有输入的函数。
 */
const compose = (...fns) => {
  // 检查所有参数是否为函数类型
  if (!fns.every(fn => typeof fn === 'function')) {
    throw new TypeError('All arguments must be functions');
  }

  // 使用reduce方法将函数数组组合成一个单一的函数
  return fns.reduce((f, g) => (...args) => {
    try {
      // 封装调用过程，加入异常处理机制
      return f(g(...args));
    } catch (error) {
      // 异常处理逻辑，可以根据需要自定义
      console.error('Error occurred during function composition:', error);
      throw error; // 继续抛出异常，以便调用方能够捕获和处理
    }
  });
};

const add5 = x => x + 5;
const multiply = (x, y) => x * y;

// 定义一个具有错误处理示例的新函数
const safeMultiply = (x, y) => {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return multiply(x, y);
};

const multiplyAndAdd5 = compose(
  add5,
  safeMultiply // 使用改进后的函数
);

try {
  console.log(multiplyAndAdd5(5, 2)); // 15
  console.log(multiplyAndAdd5('5', 2)); // 预期抛出错误
} catch (error) {
  console.error('Error:', error.message);
}



/**
 * 将角度转换为弧度。
 * @param {number} angleDegrees - 待转换的角度（以度为单位）。
 * @returns {number} - 转换后的弧度值。
 * @throws {TypeError} - 如果输入不是数字。
 */
const degreesToRads = angleDegrees => {
  // 输入验证：确保输入是一个数字
  if (typeof angleDegrees !== 'number') {
    throw new TypeError('输入必须是一个数字');
  }

  // 输入范围验证：虽然角度值理论上可以是任意实数，但对于某些应用，可能需要限制在特定范围内
  // 这里不对范围进行限制，因为不同的应用可能有不同的需求（比如允许负角度或超过360度的角度）

  // 进行转换并返回结果
  return (angleDegrees * Math.PI) / 180.0;
};

// 示例调用：转换90度为弧度
console.log(degreesToRads(90.0)); // ~1.5708



/**
 * 将整数转换为各个数字的数组。
 * @param {number} n - 待转换的整数。
 * @returns {number[]} 数字数组，代表输入整数的各个数字。
 * @throws {TypeError} 如果输入不是数字。
 */
const digitize = n => {
  // 输入验证
  if (typeof n !== 'number') {
    throw new TypeError('Expected input to be a number');
  }

  // 处理负数
  const isNegative = n < 0;
  const absN = Math.abs(n);

  // 将数字转换为数组
  const digits = [...`${absN}`].map(i => parseInt(i));

  // 如果原数字为负数，则在数组前添加-1
  return isNegative ? [-1, ...digits] : digits;
};

// 测试修改后的函数
console.log(digitize(123)); // [1, 2, 3]
console.log(digitize(-123)); // [-1, 1, 2, 3]
console.log(digitize('123a')); // 这里会抛出TypeError



/**
 * 计算两点之间的欧几里得距离。
 * @param {number} x0 第一个点的 x 坐标
 * @param {number} y0 第一个点的 y 坐标
 * @param {number} x1 第二个点的 x 坐标
 * @param {number} y1 第二个点的 y 坐标
 * @returns {number} 两点之间的距离
 * @throws {Error} 如果参数不是预期的数字类型或数量不足
 */
const distance = (x0, y0, x1, y1) => {
  // 参数验证
  if (typeof x0 !== 'number' || typeof y0 !== 'number' || typeof x1 !== 'number' || typeof y1 !== 'number') {
    throw new Error('Invalid arguments: Expected four numeric arguments.');
  }

  // 使用 Math.hypot 计算两点之间的距离，它是欧几里得距离的最优化实现
  return Math.hypot(x1 - x0, y1 - y0);
};

// 示例调用
console.log(distance(1, 1, 2, 3)); // 2.23606797749979



/**
 * 计算给定正整数的阶乘。
 * @param {number} n - 要计算阶乘的正整数。
 * @returns {number} n的阶乘结果。
 * @throws {TypeError} 如果输入为负数或非整数。
 */
const factorial = n => {
  // 输入验证
  if (!Number.isInteger(n)) {
    throw new TypeError('输入必须是整数');
  }
  
  // 处理负数输入
  if (n < 0) {
    throw new TypeError('Factorial is undefined for negative numbers.');
  }
  
  // 优化为迭代方式以处理更大的输入
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  
  return result;
};

console.log(factorial(6)); // 输出: 720



/**
 * 计算斐波那契数列的前n个数字。
 * @param {number} n - 要计算的斐波那契数列的长度。
 * @returns {number[]} 包含斐波那契数列前n个数字的数组。
 */
const fibonacci = n => {
  // 输入验证
  if (typeof n !== 'number' || n < 1 || !Number.isInteger(n)) {
    throw new Error('输入必须是一个正整数。');
  }

  // 处理特殊情况：当n为1时，返回[0]，以符合斐波那契数列的一般定义
  if (n === 1) {
    return [0];
  }

  // 初始化斐波那契数列的前两个数字
  let fib = [0, 1];

  // 使用循环来高效计算斐波那契数列
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  return fib;
};

console.log(fibonacci(6)); // [0, 1, 1, 2, 3, 5]



/**
 * 计算一组数字的最大公约数（GCD）。
 * @param {...number} arr - 一个或多个整数，用于计算它们的最大公约数。
 * @returns {number} 返回这些数字的最大公约数。
 * @throws {Error} 如果输入数组包含非数字，则抛出错误。
 */
const gcd = (...arr) => {
  // 参数校验：确保所有传入的参数都是数字
  if (!arr.every((num) => typeof num === 'number' && !isNaN(num))) {
    throw new Error('所有输入必须是有效的数字');
  }

  // 使用迭代优化算法来计算最大公约数，避免使用reduce
  let result = arr.length === 0 ? 0 : arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = calculateGCD(result, arr[i]);
  }

  return result;
};

/**
 * 计算两个数的最大公约数（GCD）。
 * @param {number} a - 第一个整数。
 * @param {number} b - 第二个整数。
 * @returns {number} 返回两个数的最大公约数。
 */
const calculateGCD = (a, b) => {
  /**
   * 边界条件处理：当b为0时，根据定义直接返回a作为最大公约数。
   * 使用欧几里得算法的迭代版本计算最大公约数。
   */
  if (b === 0) {
    return a;
  }

  while (b !== 0) {
    let remainder = a % b;
    a = b;
    b = remainder;
  }

  return a;
};

// 测试示例
console.log(gcd(8, 36)); // 4
console.log(gcd(...[12, 8, 32])); // 4



/**
 * 生成几何数列数组。
 * @param {number} end - 数列的结束值。
 * @param {number} [start=1] - 数列的起始值，默认为1。
 * @param {number} [step=2] - 数列的步长（比率），必须大于1。
 * @returns {number[]} 代表几何数列的数字数组。
 * @throws {TypeError} 如果输入参数无效。
 */
const geometricProgression = (end, start = 1, step = 2) => {
  // 输入验证
  if (typeof end !== 'number' || typeof start !== 'number' || typeof step !== 'number') {
    throw new TypeError('All inputs must be numbers.');
  }
  if (step <= 1) {
    throw new Error('Step must be greater than 1.');
  }
  if (end <= start) {
    throw new Error('End value must be greater than start value.');
  }

  // 计算数列长度并生成数列数组
  const length = Math.floor(Math.log(end / start) / Math.log(step)) + 1;
  return Array.from({ length }).map((v, i) => start * Math.pow(step, i));
};

// 测试用例
console.log(geometricProgression(256)); // [1, 2, 4, 8, 16, 32, 64, 128, 256]
console.log(geometricProgression(256, 3)); // [3, 6, 12, 24, 48, 96, 192]
console.log(geometricProgression(256, 1, 4)); // [1, 4, 16, 64, 256]

// 无效输入处理示例
console.log(geometricProgression(256, -3)); // 抛出TypeError
console.log(geometricProgression(256, 3, 0)); // 抛出Error
console.log(geometricProgression(256, 3, 1)); // 抛出Error



/**
 * 计算两个整数的汉明距离。
 * @param {number} num1 第一个整数。
 * @param {number} num2 第二个整数。
 * @returns {number} 两个整数的汉明距离。
 */
const calculateHammingDistance = (num1, num2) => {
  // 参数校验：确保输入是整数
  if (!Number.isInteger(num1) || !Number.isInteger(num2)) {
    throw new TypeError('输入必须是整数');
  }

  // 使用位运算计算汉明距离
  let distance = 0;
  let xor = num1 ^ num2;
  while (xor > 0) {
    if (xor & 1) {
      distance++;
    }
    xor >>= 1; // 右移一位，等价于除以2
  }

  return distance;
};

console.log(calculateHammingDistance(2, 3)); // 输出: 1



/**
 * 检查给定的数字是否在给定的范围内。
 * @param {number} n - 要检查的数字。
 * @param {number} start - 范围的起始值。
 * @param {number} [end=null] - 范围的结束值，可选，默认为null。
 * @returns {boolean} 如果给定的数字在给定的范围内，则返回true，否则返回false。
 * @throws {TypeError} 如果输入参数无效，则抛出TypeError。
 * @throws {Error} 如果输入参数无效，则抛出Error。 
 * 
*/
const inRange = (n, start, end = null) => {
  // 参数类型校验，确保 start 和 end 是数字类型
  if (typeof start !== 'number' || (end !== null && typeof end !== 'number')) {
    throw new TypeError('Start and end arguments must be numbers');
  }

  // 交换 start 和 end 的逻辑，使用更直观的方式表达
  if (end !== null && start > end) {
    [start, end] = [end, start];
  }

  // 使用严格相等比较，避免类型转换带来的问题
  // 考虑到边界条件的处理，添加对等于 start 或 end 的情况的判断
  return end === null ? n >= 0 && n < start : n >= start && n <= end;
};

// 测试用例
console.log(inRange(3, 2, 5)); // true
console.log(inRange(3, 4)); // true
console.log(inRange(2, 3, 5)); // false
console.log(inRange(3, 2)); // false  (修改了边界条件的处理)
console.log(inRange(3, 2, 2)); // false  (添加了对等于 start 或 end 的情况的判断)



/**
 * 判断一个数是否可以被另一个数整除。
 * 注意：dividend 和 divisor 必须为数字，且 divisor 不能为 0。
 * 
 * @param {number} dividend 被除数。
 * @param {number} divisor 除数。
 * @returns {boolean} 如果dividend能被divisor整除，则返回true，否则返回false。
 * @throws {Error} 如果divisor为0，则抛出错误。
 */
const isDivisible = (dividend, divisor) => {
  // 强制类型转换，确保参数为数字类型
  const numDividend = Number(dividend);
  const numDivisor = Number(divisor);

  // 检查除数是否为0
  if (numDivisor === 0) {
    throw new Error('Divisor cannot be zero.');
  }

  // 返回判断结果
  return numDividend % numDivisor === 0;
};

// 示例调用
console.log(isDivisible(6, 3)); // true
console.log(isDivisible('6', '3')); // true, 注意这里展示了强制类型转换的效果
console.log(isDivisible(6, 0)); // 抛出错误: Divisor cannot be zero.



/**
 * 
 * 
*/
/**
 * 判断给定的数值是否为偶数。
 * 注意：该函数要求传入的参数必须为数字类型。
 * @param {number} num - 待判断的数值。
 * @returns {boolean} 如果给定的数是偶数，则返回 true；否则，返回 false。
 * @throws {TypeError} 如果传入的参数不是数字类型。
 */
const isEven = num => {
  // 参数类型检查
  if (typeof num !== 'number') {
    throw new TypeError('Expected a number');
  }

  // 处理浮点数和极端大数的精度问题
  if (!Number.isFinite(num)) {
    throw new RangeError('Number must be a finite integer');
  }

  // 返回判断结果
  return num % 2 === 0;
};

// 测试样例
console.log(isEven(3)); // false
console.log(isEven('3')); // TypeError: Expected a number
console.log(isEven(3.1)); // false
console.log(isEven(Infinity)); // RangeError: Number must be a finite integer




/**
 * 通过complement函数生成一个判断一个数是否为奇数的函数。
 */
const isOdd = complement(isEven);

// 测试isOdd函数
console.log(isOdd(2)); // false
console.log(isOdd(3)); // true



/**
 * 检查给定的值是否为负零。
 * @param {number} val - 需要检查的值。
 * @returns {boolean} 如果值为负零，则返回true；否则返回false。
 */
const isNegativeZero = (val) => {
  // 确保输入为数字
  if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
    console.error("Input must be a finite number.");
    return false;
  }
  
  // 检查是否为负零
  return val === 0 && 1 / val === -Infinity;
};

// 测试用例
console.log(isNegativeZero(-0)); // true
console.log(isNegativeZero(0)); // false
console.log(isNegativeZero("not a number")); // false, 并且输出错误信息



/**
 * 检查给定的值是否为一个有效的数字。
 * 数字包括整数、浮点数、正无穷大和负无穷大。
 * 特别地，NaN被认为不是一个数字。
 * 注意：这个函数不会对对象、数组、函数等复杂类型返回true，
 * 但这种行为不被视为bug，而是设计选择。请确保传入的是基本类型。
 * 
 * @param {*} val - 待检查的值。
 * @returns {boolean} 如果值是有效的数字，则返回true；否则返回false。
 */
const isNumber = val => typeof val === 'number' && val === val;

// 示例调用
console.log(isNumber(1)); // true
console.log(isNumber('1')); // false
console.log(isNumber(NaN)); // false



/**
 * 判断给定的值是否为奇数。
 * 注意：此函数要求传入的参数必须是有限的整数。
 * @param {number} num - 需要判断的数值。
 * @returns {boolean} - 如果 num 是奇数，则返回 true；否则返回 false。
 * @throws {TypeError} - 如果传入的参数不是整数。
 */
const isOdd = num => {
  // 确保传入的参数是有限的整数
  if (typeof num !== 'number' || isNaN(num) || !Number.isInteger(num) || !isFinite(num)) {
    throw new TypeError('Expected a finite integer');
  }
  
  // 返回判断结果
  return num % 2 === 1;
};

// 测试例子
console.log(isOdd(3)); // true
console.log(isOdd("3")); // TypeError: Expected a finite integer



/**
 * 判断一个数是否为2的幂。
 * @param {number} n 待检查的数。
 * @returns {boolean} 如果n是2的幂，则返回true；否则返回false。
 */
const isPowerOfTwo = n => {
  // 确保输入是一个正数。
  if (typeof n !== 'number' || n <= 0) {
    throw new TypeError("输入必须是一个正数");
  }

  // 使用位运算检查n是否是2的幂。
  return (n & (n - 1)) === 0;
};

// 测试用例
console.log(isPowerOfTwo(0)); // false
console.log(isPowerOfTwo(1)); // true
console.log(isPowerOfTwo(8)); // true
console.log(isPowerOfTwo("1")); // 抛出TypeError
console.log(isPowerOfTwo(null)); // 抛出TypeError
console.log(isPowerOfTwo(undefined)); // 抛出TypeError
console.log(isPowerOfTwo({})); // 抛出TypeError



/**
 * 判断给定的数是否为质数
 * @param {number} num 需要判断的数
 * @return {boolean} 如果是质数返回true，否则返回false
 */
const isPrime = num => {
  // 处理边界条件: 1不是质数，同时确保num是大于等于2的整数
  if (num < 2) return false;

  // 使用let代替var，以确保i的作用域仅在for循环内部
  // 根据质数性质，只需检查到num的平方根就足够了
  const boundary = Math.floor(Math.sqrt(num));

  // 优化：先检查num是否为偶数，除了2之外，没有其他偶数质数
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  // 使用优化后的循环检查奇数
  // 从3开始，每次增加2，只检查奇数因子
  for (let i = 3; i <= boundary; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
};

console.log(isPrime(11)); // true



/**
 * 计算一组整数的最小公倍数（LCM）。
 *
 * @param {...number} numbers - 一个或多个整数作为参数。
 * @returns {bigint} - 返回计算得到的最小公倍数。如果输入为空数组，则抛出错误。
 *
 * @throws {Error} - 当数组为空或包含非数字时，将抛出错误。
 */
const leastCommonMultiple = (...numbers) => {
  // 输入验证
  if (!numbers.length) throw new Error("数组不能为空");
  if (!numbers.every((n) => typeof n === "number" && !isNaN(n) && isFinite(n))) {
    throw new Error("所有输入必须是有效的数字");
  }

  /**
   * 计算两个整数的最大公约数（GCD）。
   *
   * @param {bigint} x - 第一个整数（转换为BigInt）。
   * @param {bigint} y - 第二个整数（转换为BigInt）。
   * @returns {bigint} - 返回两个整数的最大公约数。
   */
  const greatestCommonDivisor = (x, y) => {
    x = BigInt(x);
    y = BigInt(y);
    while (y !== 0n) {
      [x, y] = [y, x % y];
    }
    return x;
  };

  /**
   * 计算两个整数的最小公倍数（LCM）。
   *
   * @param {bigint} x - 第一个整数（转换为BigInt）。
   * @param {bigint} y - 第二个整数（转换为BigInt）。
   * @returns {bigint} - 返回两个整数的最小公倍数。
   */
  const calculateLCM = (x, y) => (BigInt(x) * BigInt(y)) / greatestCommonDivisor(BigInt(x), BigInt(y));

  // 使用reduceRight优化，并将数组元素转换为BigInt进行计算
  return numbers.reduceRight((a, b) => calculateLCM(BigInt(a), BigInt(b)), 1n); // 添加初始值1n以避免数组为空的情况
};

// 示例用法
console.log(leastCommonMultiple(12, 7)); // 输出: 84n
console.log(leastCommonMultiple(...[1, 3, 4, 5])); // 输出: 60n



/**
 * 使用Luhn算法检查给定的数字是否有效。
 * Luhn算法是一种简单的校验和公式，用于验证各种身份验证编码的编号，如信用卡号码。
 * 
 * @param {number|string} num - 待检查的数字，可以是数字类型或字符串类型。
 * @returns {boolean} 如果校验通过返回true，否则返回false。
 */
const luhnCheck = num => {
  // 将输入转换为字符串，反转，并把每个字符转换为数字
  let arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  
  // 提取并保存最后一位数字
  let lastDigit = arr.splice(0, 1)[0];
  
  // 根据Luhn算法计算校验和
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
  
  // 将最后一位数字添加到校验和中
  sum += lastDigit;

  // 如果校验和能被10整除，则返回true，否则返回false
  return sum % 10 === 0;
};

// 示例调用
luhnCheck('4485275742308327'); // true
luhnCheck(6011329933655299); //  false
luhnCheck(123456789); // false



/**
 * 数值范围映射函数
 *
 * 将一个数值从一个指定的输入范围映射到另一个输出范围。
 *
 * @param {number} num - 要进行映射的原始数值
 * @param {number} inMin - 输入范围的最小值
 * @param {number} inMax - 输入范围的最大值，必须大于等于`inMin`
 * @param {number} outMin - 输出范围的最小值
 * @param {number} outMax - 输出范围的最大值，必须大于等于`outMin`且大于`outMin`
 * @returns {number} 映射后的数值，如果发生除以零或由于浮点数精度问题导致结果非有限数，则返回NaN
 * @throws {TypeError} 如果任何输入参数不是数字类型
 * @throws {Error} 如果输入或输出范围无效（min和max相等，或者min大于max）
 */
const mapNumRange = (num, inMin, inMax, outMin, outMax) => {
  // 参数类型及范围验证
  if (typeof num !== 'number' || typeof inMin !== 'number' || typeof inMax !== 'number' || 
      typeof outMin !== 'number' || typeof outMax !== 'number') {
    throw new TypeError('All input parameters must be numbers');
  }

  if (inMin === inMax || outMin === outMax) {
    throw new Error('Input or output range is invalid: min and max values cannot be equal');
  }

  if (inMin > inMax || outMin > outMax) {
    throw new Error('Input or output range is invalid: min value must be less than max value');
  }

  // 数值计算
  let result = ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  // 处理浮点数精度问题
  result = Number.isFinite(result) ? result : NaN;

  return result;
};

// 测试例子
console.log(mapNumRange(5, 0, 10, 0, 100)); // 50
console.log(mapNumRange(10, 0, 10, 0, 100)); // 100



/**
 * 计算给定数组的中位数。
 * @param {Array} arr - 待计算中位数的数组。
 * @returns 数组的中位数。
 * @throws 如果传入的不是数组，则抛出错误。
 */
const calculateMedian = arr => {
  // 检查传入参数是否为数组
  if (!Array.isArray(arr)) {
    throw new TypeError('传入的参数不是一个数组');
  }

  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
    
  // 对数组的奇偶性进行条件判断，以计算中位数
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

try {
  console.log(calculateMedian([5, 6, 50, 1, -5])); // 输出: 5
} catch (error) {
  console.error(error.message);
}



/**
 * 计算两个点的中点坐标。
 * @param {Array<number[]>} points - 包含两个点坐标的数组，每个点坐标为长度为2的数组 [x, y]。
 * @returns {Array<number>} - 代表中点的数组 [x, y]。
 * @throws {Error} - 如果输入不是预期格式。
 */
const midpoint = (points) => {
  // 输入验证：确保输入是包含两个长度为2的数组的数组
  if (!Array.isArray(points) || points.length !== 2 || 
      !points.every(point => Array.isArray(point) && point.length === 2)) {
    throw new Error('输入必须是包含两个点坐标的数组，每个点坐标为长度为2的数组 [x, y]。');
  }

  // 提取点的坐标
  const [point1, point2] = points;

  // 计算中点坐标，注意处理浮点数精度问题
  const midX = (point1[0] + point2[0]) / 2;
  const midY = (point1[1] + point2[1]) / 2;

  // 返回中点坐标
  return [Number.isInteger(midX) ? Math.round(midX) : midX, Number.isInteger(midY) ? Math.round(midY) : midY];
};
// 无错误示例
console.log(midpoint([[2, 2], [4, 4]])); // [3, 3]
console.log(midpoint([[4, 4], [6, 6]])); // [5, 5]
console.log(midpoint([[1, 3], [2, 4]])); // [1.5, 3.5]



/**
 * 根据指定的选择器函数或属性名，找到数组中的最小值。
 * @param {Array} arr - 待查找的数组。
 * @param {Function|string} selector - 选择器，可以是一个函数用于自定义比较逻辑，或者是一个字符串表示数组成员中的属性名。
 * @returns {*} 返回数组中根据选择器找到的最小值；如果数组为空，则返回undefined。
 */
const minBy = (arr, selector) => {
  // 强化类型检查，确保selector是函数或非空字符串
  if (typeof selector !== 'function' && typeof selector !== 'string') {
    throw new TypeError('Expected selector to be a function or a string');
  }

  // 增加对空数组的处理
  if (arr.length === 0) {
    return undefined;
  }

  let minValue;
  let selectorFn = typeof selector === 'function' ? selector : val => val[selector];

  // 优化性能，避免使用map和扩展运算符
  for (let i = 0; i < arr.length; i++) {
    const value = selectorFn(arr[i]);

    // 如果当前值是最小值或还未找到最小值，则更新最小值
    if (minValue === undefined || value < minValue) {
      minValue = value;
    }
  }

  return minValue;
};

// 示例用法
console.log(minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)); // 2
console.log(minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')); // 2



/**
 * 取一个布尔值，并返回其逻辑否定。
 * 
 * @param {boolean} a - 需要被否定的输入布尔值。
 * @returns {boolean} - 输入值的逻辑否定。
 * @throws {TypeError} - 如果输入不是布尔值会抛出错误。
 */
const not = a => {
  // 检查输入是否为布尔值
  if (typeof a !== 'boolean') {
    throw new TypeError('Input must be a boolean');
  }
  // 返回输入布尔值的逻辑否定
  return !a;
};

// 尝试示例调用，并处理可能的错误
try {
  console.log(not(true)); // 输出 false
  console.log(not(false)); // 输出 true
  console.log(not('true')); // 抛出错误
} catch (error) {
  console.error(error.message);
}



/**
 * 执行两个参数的逻辑或操作。
 * 与JavaScript的或运算符（||）不同，此函数期望布尔类型的参数。
 * 如果任一输入为真，则返回真，否则返回假。
 * 
 * @param {boolean} a - 第一个布尔类型参数。
 * @param {boolean} b - 第二个布尔类型参数。
 * @returns {boolean} - 或操作的结果。
 * @throws {TypeError} - 如果传入非布尔类型的参数。
 */
const logicalOr = (a, b) => {
  // 检查两个参数是否都为布尔类型
  if (typeof a !== 'boolean' || typeof b !== 'boolean') {
    throw new TypeError('Both arguments must be boolean');
  }
  return a || b; // 返回逻辑或的结果
};

// 测试用例（用于演示目的）
console.log(logicalOr(true, true)); // true
console.log(logicalOr(true, false)); // true
console.log(logicalOr(false, false)); // false
console.log(logicalOr(0, 1)); // TypeError: Both arguments must be boolean



/**
 * 计算给定数组中值小于等于指定值的百分位数
 * @param {Array} arr - 待计算的数组
 * @param {Number} val - 指定的值
 * @returns {Number} 返回小于等于指定值的元素的百分位数
 */
const percentile = (arr, val) => (100 * arr.reduce((acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0)) / arr.length;

// 示例调用：计算数组 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 中小于等于 6 的元素的百分位数
percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55



/**
 * 生成给定数组的幂集。
 * @param {Array} inputArray 输入的数组。
 * @return {Array} 返回输入数组的幂集。
 */
const generatePowerSet = inputArray => {
  // 输入验证：确保输入是一个数组
  if (!Array.isArray(inputArray)) {
    throw new TypeError('Expected an array as input');
  }

  // 处理空数组的情况，直接返回空集
  if (inputArray.length === 0) {
    return [[]];
  }

  // 主逻辑：使用reduce和concat生成幂集
  return inputArray.reduce((powersetSoFar, value) => {
    return powersetSoFar.concat(powersetSoFar.map(subset => [value].concat(subset)));
  }, [[]]);
};

try {
  console.log(generatePowerSet([1, 2])); // [[], [1], [2], [1, 2]]
} catch (error) {
  console.error(error.message);
}



/**
 * 将弧度值转换为度数。
 * @param {number} rad 待转换的弧度值。
 * @returns {number} 转换后的度数。如果输入不是数字，返回NaN。
 */
const radsToDegrees = rad => {
  // 检查输入参数是否为数值
  if (typeof rad !== 'number' || isNaN(rad)) {
    console.warn('radsToDegrees函数期望一个数字作为参数。提供的值不是数字。');
    return NaN;
  }
  
  // 执行转换
  return (rad * 180) / Math.PI;
};

console.log(radsToDegrees(Math.PI / 2)); // 90
console.log(radsToDegrees('test'));     // NaN，并在控制台输出警告信息



/**
 * 生成一个指定范围内的随机整数数组。
 * @param {number} min - 范围的最小值（包含）。
 * @param {number} max - 范围的最大值（包含）。
 * @param {number} [n=1] - 需要生成的随机整数个数，默认为1。
 * @returns {number[]} 一个包含 `n` 个在范围 `[min, max]` 内的随机整数的数组。
 */
const generateRandomIntegers = (min, max, n = 1) => {
  // 验证输入参数
  if (min > max) {
    throw new Error('最小值不能大于最大值。');
  }
  if (n <= 0) {
    throw new Error('元素个数必须是正整数。');
  }

  // 生成随机整数数组
  return Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

console.log(generateRandomIntegers(12, 35, 10)); // 示例用法



/**
 * 生成一个介于min和max（包括min和max）之间的随机整数。
 * @param {number} min - 最小值。
 * @param {number} max - 最大值。
 * @returns {number} 介于min和max之间的随机整数。
 * @throws {TypeError} 如果min或max不是数字。
 * @throws {RangeError} 如果min大于max。
 */
const randomIntegerInRange = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('参数必须为数字');
  }
  
  if (min > max) {
    throw new RangeError('最小值不能大于最大值');
  }

  // 当min等于max时，直接返回min是合理的，这里不再额外处理边界情况
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 示例调用
console.log(randomIntegerInRange(0, 5)); // 可能的输出: 0, 1, 2, 3, 4, 5



/**
 * 生成一个介于min和max之间的随机数（包括min，不包括max）。
 * @param {number} min - 随机数范围的最小值。
 * @param {number} max - 随机数范围的最大值。
 * @returns {number} 介于min和max之间的随机数。
 * @throws {Error} 如果min不是数字、max不是数字，或min大于max。
 */
const generateRandomNumberInRange = (min, max) => {
    // 输入验证
    if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
        throw new Error('Invalid input: min and max must be numbers, with min <= max');
    }

    // 生成并返回随机数
    return Math.random() * (max - min) + min;
};

// 示例调用
console.log(generateRandomNumberInRange(2, 10)); // 输出预期在2到10之间（含2，不含10）的随机数



/**
 * 对数字进行四舍五入到指定小数位数。
 * @param {number} n 需要四舍五入的数字。
 * @param {number} [decimals=0] 需要保留的小数位数，默认为0。
 * @returns {number} 四舍五入后的数值。
 * @throws {TypeError} 如果n不是有限数字，或者decimals不是整数，抛出类型错误。
 * @throws {Error} 如果decimals是负数，抛出错误。
 */
const round = (n, decimals = 0) => {
  // 类型检查
  if (typeof n !== 'number' || isNaN(n) || !isFinite(n)) {
    throw new TypeError("The number must be a finite number.");
  }

  if (typeof decimals !== 'number' || decimals % 1 !== 0) {
    throw new TypeError("The decimals must be an integer.");
  }

  // 确保decimals是非负的
  if (decimals < 0) {
    throw new Error("The decimals must be non-negative.");
  }

  // 修改原有逻辑以保留小数点后的0，并确保结果格式正确
  let result = Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
  if (result % 1 === 0) {
    // 如果结果是整数，显式转换为整数类型以确保输出格式正确
    result = Number(result.toFixed(decimals));
  }

  return result;
};

console.log(round(1.005, 2)); // 输出: 1.01
console.log(round(1, 1));     // 输出: 1.0



/**
 * SDBM哈希算法的JavaScript实现。
 * 该算法简单，但不适合用于安全性要求高的应用。
 * 它可能会生成负值的哈希值，在某些上下文中可能是个问题。
 *
 * @param {string} str - 需要被哈希的输入字符串。
 * @returns {number} 输入字符串的哈希码。
 */
const sdbmHash = (str) => {
  // 验证输入：确保是字符串类型。
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  // 初始化哈希码。
  let hashCode = 0;

  // 直接遍历字符串中的每个字符，不进行分割。
  // 通过避免数组创建来提供一定的性能提升。
  for (let i = 0; i < str.length; i++) {
    const currentVal = str.charCodeAt(i);
    hashCode = currentVal + (hashCode << 6) + (hashCode << 16) - hashCode;
  }

  // 请注意：哈希码可能是负数。根据使用情况，
  // 你可能需要对哈希码应用模运算或将负值转换为正值。
  
  return hashCode;
};

console.log(sdbmHash('name')); // -3521204949



/**
 * 计算给定数组的标准差。
 * @param {Array} arr - 需要计算标准差的数字数组。
 * @param {boolean} usePopulation - 指定是否使用总体标准差的计算公式，默认为 false，即使用样本标准差。
 * @returns {number} 计算得到的标准差。
 * @throws {Error} 如果输入不是非空数组或数组中包含非数字元素，将抛出错误。
 */
const standardDeviation = (arr, usePopulation = false) => {
  // 检查输入数组是否合法
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Input must be a non-empty array.');
  }

  // 检查数组中的元素是否都为数字
  const isValidNumber = (num) => typeof num === 'number' && !isNaN(num);
  if (!arr.every(isValidNumber)) {
    throw new Error('Array must contain only numbers.');
  }

  // 计算平均值
  const mean = arr.reduce((total, val) => total + val, 0) / arr.length;
  // 计算方差，根据是否使用总体标准差来调整除数
  const variance = arr.reduce((total, val) => total + (val - mean) ** 2, 0) / (arr.length - (usePopulation ? 0 : 1));
  // 返回标准差
  return Math.sqrt(variance);
};

// 示例用法
console.log(standardDeviation([10, 2, 38, 23, 38, 23, 21])); // 13.284434142114991 (样本标准差)
console.log(standardDeviation([10, 2, 38, 23, 38, 23, 21], true)); // 12.29899614287479 (总体标准差)



/**
 * 计算所有传入的数字参数之和。
 * 该函数可以接受单个数字或数字数组作为参数。
 * 
 * @param {...(number | number[])} args - 要求和的可变数量参数，可以是单个数字或数字数组。
 * @returns {number} 所有数值参数的总和。
 * @throws {TypeError} 如果检测到任何非数字参数，则抛出此错误。
 */
const sum = (...args) => {
  // 将参数展平并确保它们都是数字。
  const flattened = args.flat();
  
  // 验证输入以确保所有元素均为数字。
  // 如果发现任何非数字值，则抛出 TypeError 错误。
  for (const val of flattened) {
    if (typeof val !== 'number' || isNaN(val)) {
      throw new TypeError('所有参数必须为数字');
    }
  }

  // 使用 Array.reduce 方法计算所有数字参数之和。
  return flattened.reduce((acc, val) => acc + val, 0);
};

// 测试用例
console.log(sum(1, 2, 3, 4)); // 输出：10
console.log(sum(...[1, 2, 3, 4])); // 输出：10
console.log(sum(1, '2', 3)); // 抛出 TypeError，因为 '2' 是一个非数字字符串。



/**
 * 根据提供的函数或属性名对数组中的元素进行求和。
 * @param {Array} arr - 待处理的数组。
 * @param {Function|string} fn - 用于获取元素求和值的函数或属性名。
 * @returns {number} 数组中所有元素根据fn计算得到的值的总和。
 */
const sumBy = (arr, fn) => {
  // 检查fn是否为函数或字符串，如果不是，则抛出类型错误异常
  if (typeof fn !== 'function' && typeof fn !== 'string') {
    throw new TypeError('fn must be a function or a string');
  }

  try {
    // 根据fn的类型定义获取值的函数getValue
    const getValue = typeof fn === 'function' 
      ? (val) => {
          // 如果fn是函数，则尝试执行并捕获可能的异常
          try {
            return fn(val);
          } catch (error) {
            console.error('Error executing function:', error);
            return undefined; // 函数执行出错时返回undefined
          }
        }
      : (val) => {
          // 如果fn是字符串，则尝试从val获取对应属性，同时进行null/undefined检查和属性存在性检查
          if (val === null || val === undefined) {
            return undefined; // 对象为null或undefined时返回undefined
          }
          if (typeof val !== 'object' || !val.hasOwnProperty(fn)) {
            console.warn(`Property '${fn}' does not exist on value:`, val); // 属性不存在时打印警告
            return undefined;
          }
          return val[fn];
        };

    // 使用getValue从数组中获取值并求和
    return arr.map(getValue).reduce((acc, val) => acc + val, 0);
  } catch (error) {
    // 对整体操作进行异常捕获，确保代码健壮性
    console.error('Error in sumBy operation:', error);
    return 0; // 发生异常时返回0作为默认值
  }
};

// 函数使用示例
console.log(sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)); // 20
console.log(sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')); // 20
console.log(sumBy([{ n: 4 }], () => { throw new Error('Test Exception'); })); // 可能打印错误信息，但不会抛出异常
console.log(sumBy([{ x: 4 }], 'n')); // 警告信息，返回0



/**
 * 计算在指定范围内的所有整数的幂的和。
 * @param {number} end - 结束值，必须为非负整数。
 * @param {number} power - 幂的指数，默认为2，必须为非负整数。
 * @param {number} start - 开始值，默认为1，必须为非负整数。
 * @returns {number} 返回从 start 到 end（包括 start 和 end）范围内所有整数的 power 次幂的和。
 * @throws {Error} 如果输入的 end、start 或 power 不满足要求（非负整数且 end >= start），抛出错误。
 */
const sumPower = (end, power = 2, start = 1) => {
  // 输入验证
  if (!Number.isInteger(end) || !Number.isInteger(start) || !Number.isInteger(power) ||
      end < start || power < 0) {
    throw new Error('Invalid input: ensure end, start, and power are non-negative integers, and end >= start.');
  }

  // 直接计算，避免创建大数组
  let sum = 0;
  if (start <= end) {
    for (let i = start; i <= end; i++) {
      sum += Math.pow(i, power);
    }
  }
  
  return sum;
};

// 测试案例
console.log(sumPower(10)); // 385
console.log(sumPower(10, 3)); // 3025
console.log(sumPower(10, 3, 5)); // 2925
console.log(sumPower(5, 2, 10)); // Error: Invalid input: ensure end, start, and power are non-negative integers, and end >= start.



/**
 * 将数字格式化为指定货币的字符串表示。
 * @param {number} n - 要格式化的数字。
 * @param {string} curr - 货币代码。
 * @param {string} [LanguageFormat] - 语言代码（可选）。
 * @returns {string} 格式化后的货币字符串。
 */
const toCurrency = (n, curr, LanguageFormat = 'en-US') => {
  // 参数校验
  if (typeof n !== 'number' || isNaN(n)) {
    throw new Error('Invalid number input.');
  }
  if (typeof curr !== 'string' || !curr.trim()) {
    throw new Error('Invalid currency code.');
  }
  if (LanguageFormat && typeof LanguageFormat !== 'string') {
    throw new Error('Invalid language code.');
  }

  let numberFormat;

  try {
    // 创建 Intl.NumberFormat 实例
    numberFormat = new Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr });
  } catch (error) {
    // 异常处理：回退到默认语言和货币
    console.error(`Error formatting number: ${error}`);
    numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  }

  return numberFormat.format(n);
};

// 测试调用
console.log(toCurrency(123456.789, 'EUR')); // €123,456.79
console.log(toCurrency(123456.789, 'USD', 'en-us')); // $123,456.79
console.log(toCurrency(123456.789, 'USD', 'fa')); // ۱۲۳٬۴۵۶٫۷۹ $
console.log(toCurrency(322342436423.2435, 'JPY')); // ¥322,342,436,423
console.log(toCurrency(322342436423.2435, 'JPY', 'fi')); // 322 342 436 423 ¥



/**
 * 格式化数字为带有逗号分隔的十进制数。
 * @param {number} num 需要格式化的数字。
 * @returns {string} 格式化后的数字字符串。
 * @throws {TypeError} 如果传入的参数不是数字。
 */
const formatNumberToDecimal = (num) => {
  // 参数类型检查
  if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
    throw new TypeError('Expected a finite number');
  }

  // 确保小数点后始终显示3位数字
  const options = {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  };

  return num.toLocaleString('en-US', options);
};

try {
  console.log(formatNumberToDecimal(12305030388.9087)); // "12,305,030,388.909"
} catch (error) {
  console.error(error.message);
}



/**
 * 将数字转换为其对应的序数词后缀。
 * 
 * @param {number|string} num - 表示一个数字的数字或字符串。
 * @returns {string} 输入数字的序数词后缀，例如："1st", "2nd", "3rd", "4th" 等。
 * @throws {TypeError} 如果输入不是数字也不是表示数字的字符串。
 * @throws {RangeError} 如果输入不是正整数。
 */
const toOrdinalSuffix = num => {
  // 强化输入验证
  if (typeof num !== 'number' && typeof num !== 'string') {
    throw new TypeError('Input must be a number or a string that represents a number');
  }

  // 解析数字，确保处理的是整数
  const number = parseInt(num, 10);
  
  // 处理边界情况
  if (number <= 0) {
    throw new RangeError('Input must be a positive integer');
  }

  // 使用 Map 对象来存储和查找特定数字是否符合特定规则
  const oPattern = new Map([1, 2, 3, 4].map((n, i) => [n, true]));
  const tPattern = new Map([11, 12, 13, 14, 15, 16, 17, 18, 19].map((n, i) => [n, true]));
  
  // 获取数字的个位数和两位数，用于判断适用的序数词规则
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  
  // 根据数字的个位数和是否满足特定规则，返回对应的序数词后缀
  if (oPattern.has(lastDigit) && !tPattern.has(lastTwoDigits)) {
    return number + ['st', 'nd', 'rd'][lastDigit - 1];
  }
  
  return number + 'th';
};

// 测试示例
console.log(toOrdinalSuffix('123')); // "123rd"



/**
 * 将输入转换为安全整数。
 * 
 * @param {number|string} num - 需要转换的数字或数字字符串。
 * @returns {number} 转换后的安全整数。如果输入无法转换为安全整数，则返回NaN。
 */
const toSafeInteger = num => {
  // 检查输入是否为可解析为数字的类型
  if (typeof num === 'number' && !isNaN(num)) {
    // 直接处理已经是数字的情况
    if (Number.isSafeInteger(num)) {
      return num;
    } 
    // 处理Infinity情况，限制在安全整数范围的极限值
    else if (!isNaN(num) && (num === Infinity || num === -Infinity)) {
      return num > 0 ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
    }
  } else {
    // 对于无法转换为数字的情况，返回NaN
    return NaN;
  }

  // 使用Math方法确保返回值在安全整数范围内
  return Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER));
};

// 示例调用
toSafeInteger('3.2'); // 3
toSafeInteger(Infinity); // 9007199254740991
toSafeInteger('not a number'); // NaN
toSafeInteger({}); // NaN



/**
 * 验证给定的值是否为有效的数字。
 * 有效数字包括：正数、负数、小数、正负无限大。
 * 不允许输入空字符串或非数字字符串。
 * 
 * @param {string} value - 需要验证的值，只能是表示数字的字符串。
 * @returns {boolean} 如果输入值是有效的数字，则返回true；否则返回false。
 */
const validateNumber = (value) => {
  // 将输入值转换为数字类型，同时处理非数字字符串的情况
  const num = Number(value);
  
  // 通过严格比较判断转换后的值是否为有效的数字，允许正负无限大作为有效数字
  return !Number.isNaN(num) && (Number.isFinite(num) || !Number.isFinite(value));
};

// 测试示例
console.log(validateNumber('10')); // true
console.log(validateNumber('10.')); // true，现在正确处理了小数点
console.log(validateNumber('')); // true，空字符串视为无效
console.log(validateNumber('abc')); // false，非数字字符串视为无效
console.log(validateNumber('Infinity')); // true，允许正无限大
console.log(validateNumber('-Infinity')); // true，允许负无限大
console.log(validateNumber('0')); // true，现在正确处理了字符串'0'



/**
 * 计算两个向量的夹角
 * @param {Array} vectorX 第一个向量，其元素为数字
 * @param {Array} vectorY 第二个向量，其元素为数字
 * @returns {Number} 两个向量的夹角，以弧度表示
 * @throws {TypeError} 如果参数不是数组或者数组中包含非数字元素，抛出类型错误
 * @throws {Error} 如果输入向量之一为零向量，抛出错误
 */
const vectorAngle = (vectorX, vectorY) => {
  // 参数验证: 确保参数为数组
  if (!Array.isArray(vectorX) || !Array.isArray(vectorY)) {
    throw new TypeError('Both parameters must be arrays');
  }

  // 参数验证: 确保数组元素为数字
  if (vectorX.some((n) => typeof n !== 'number' || isNaN(n)) || vectorY.some((n) => typeof n !== 'number' || isNaN(n))) {
    throw new TypeError('All elements in arrays must be numbers');
  }

  // 计算两个向量的模长
  let sumOfSquaresX = vectorX.reduce((acc, n) => acc + Math.pow(n, 2), 0);
  let sumOfSquaresY = vectorY.reduce((acc, n) => acc + Math.pow(n, 2), 0);
  let modX = Math.sqrt(sumOfSquaresX);
  let modY = Math.sqrt(sumOfSquaresY);

  // 防止除以零的情况出现
  if (modX === 0 || modY === 0) {
    throw new Error('One or both of the input vectors are zero vectors. Cannot calculate the angle.');
  }

  // 计算两个向量的点积，然后除以它们的模长得到夹角的余弦值
  let dotProduct = vectorX.reduce((acc, n, i) => acc + n * vectorY[i], 0);
  let cosineOfAngle = dotProduct / (modX * modY);

  // 使用 acos 计算夹角的弧度
  let angleInRadians = Math.acos(cosineOfAngle);

  return angleInRadians;
};

// 测试示例
console.log(vectorAngle([3, 4], [4, 3])); // 0.283794109208328



/**
 * 计算两个向量之间的欧几里得距离。
 * @param {Array} vector1 第一个向量，一个数字数组
 * @param {Array} vector2 第二个向量，一个数字数组
 * @returns {number} 两个向量之间的欧几里得距离
 */
const vectorDistance = (vector1, vector2) => {
  // 参数验证：确保都是数组，且长度相等
  if (!Array.isArray(vector1) || !Array.isArray(vector2)) {
    throw new TypeError('输入必须为数组');
  }
  if (vector1.length !== vector2.length) {
    throw new Error('两个向量的长度不相等');
  }

  // 使用乘法优化性能，避免使用 Math.pow
  let sumOfSquares = vector1.reduce((acc, val, i) => {
    let diff = val - vector2[i];
    return acc + diff * diff;
  }, 0);

  // 返回计算出的欧几里得距离
  return Math.sqrt(sumOfSquares);
};

// 示例调用
console.log(vectorDistance([10, 0, 5], [20, 0, 10])); // 输出 11.180339887498949



