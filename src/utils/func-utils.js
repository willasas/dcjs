// 函数操作

/**
 * 创建一个接受指定数量参数的函数。
 * @param {Function} fn 原始函数。
 * @param {number} n 传递给原始函数的参数数量。
 * @returns {Function} 返回一个新的函数，该函数接受任意数量的参数，但只将前n个参数传递给原始函数。
 */
const ary = (fn, n) => {
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new TypeError('n必须是一个非负整数');
  }

  return (...args) => {
    // 确保传递给原始函数的参数都是数字
    const validArgs = args.slice(0, n).filter(arg => typeof arg === 'number');
    return fn(...validArgs);
  };
};

/**
 * 使用 ary 函数创建一个只取前两个最大值的函数。
 */
const firstTwoMax = ary(Math.max, 2);

const input = [[2, 6, 'a'], [6, 4, 8], [10]];
const result = input.map(x => {
  // 如果子数组长度小于2，打印一条消息并返回undefined
  if (x.length < 2) {
    console.warn('子数组长度小于2，无法找到最大值');
    return undefined;
  }
  // 使用 firstTwoMax 函数
  return firstTwoMax(...x);
});

console.log(result); // [6, 6, 10]



/**
 * 安全地执行函数，并捕获异常。
 * 
 * @param {Function} fn 要执行的函数。
 * @param {...any} args 要传递给函数的参数。
 * 
*/
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    // 为了保留原始异常类型信息，这里不做类型转换
    // 但可以通过添加一个属性来记录原始异常类型
    if (!(e instanceof Error)) {
      e = new Error(`Non-error object thrown: ${e}`);
      e.originalType = typeof e;
    }
    return e;
  }
};

/**
 * 验证选择器是否安全。
 * @param {string} selector 选择器。
*/
function isValidSelector(selector) {
  // 这里可以添加更复杂的选择器验证逻辑
  // 例如，判断是否包含危险字符或是否符合预期的格式
  // 这里仅作为示例，实际应用中需要更严格的安全策略
  const validSelectors = ['>_', '.class', '#id'];
  return validSelectors.includes(selector);
}

// 使用let进行变量声明，并改进错误处理逻辑
let elements;
const selector = '>_>';
if (isValidSelector(selector)) {
  elements = attempt(() => document.querySelectorAll(selector));
  if (elements instanceof Error) {
    // 明确记录错误情况
    console.error(`Error querying elements with selector ${selector}:`, elements);
    elements = []; // 将错误情况下的elements设置为空数组
  }
} else {
  console.warn(`Selector ${selector} is not valid or safe. Using empty array instead.`);
  elements = [];
}



/**
 * 此函数接受一个二元函数作为参数，然后返回一个新的二元函数。返回的这个新函数在调用时会将原二次函数应用到传入的两个参数上
 * @param {*} fn - 要包装的二元函数。
 * 
*/
function binary(fn) {
  return function(a, b) {
    if (typeof fn !== 'function') {
      throw new TypeError('Expected a function');
    }
    return fn(Number(a), Number(b));
  };
}

try {
  ['2', '1', '0'].map(binary(Math.max)); // [2, 1, 2]
} catch (error) {
  console.error(error);
}



/**
 * 将两个函数组合成一个新的函数，新函数只有当两个输入函数都返回true时才返回true。
 * @param {Function} f - 需要组合的第一个函数。
 * @param {Function} g - 需要组合的第二个函数。
 * @returns {Function} 一个组合了f和g行为的新函数。
 */
const andFn = (f, g) => {
  if (typeof f !== 'function' || typeof g !== 'function') {
    throw new TypeError('Both arguments must be functions');
  }

  return (...args) => {
    try {
      return f(...args) && g(...args);
    } catch (error) {
      console.error('An error occurred:', error);
      return false;
    }
  };
};

const isEven3 = num => Number.isInteger(num) && num % 2 === 0; // 改进以处理NaN
const isPositive = num => num > 0;
const isPositiveEven = andFn(isEven3, isPositive);

console.log(isPositiveEven(4)); // true
console.log(isPositiveEven(-2)); // false
console.log(isPositiveEven(NaN)); // false

// 示例：使用`andFn`创建更具描述性的函数名称，并添加类型检查和错误处理功能。



/**
 * 使用闭包和函数柯里化来简化Promise链式调用，对上下文安全性和函数存在性的检查
 * @param {string} key - 要在上下文中查找的函数名称。
 * @param {...*} args - 传递给目标方法的参数列表。
 * @returns {function(Object): *} - 如果上下文有效且方法存在，则返回一个接受上下文对象作为参数并调用指定方法的函数；否则抛出错误。
 * @throws {Error} 当上下文不是对象或为空，或者当指定的key不是上下文中的一个函数时，则抛出错误。
 * 
 */ 
const safeCall = (key, ...args) => context => {
  if (typeof context !== 'object' || context === null) {
    throw new Error('Context must be an object.');
  }
  if (typeof context[key] !== 'function') {
    throw new Error(`Method "${key}" is not a function on the context.`);
  }
  return context[key](...args);
};

// 使用Promise链，增加了catch来处理异常
Promise.resolve([1, 2, 3])
  .then(safeCall('map', x => 2 * x))
  .then(result => console.log(result)) // [ 2, 4, 6 ]
  .catch(error => console.error(error));

// 使用bind的方式，同样增加了异常处理
const safeMap = safeCall.bind(null, 'map');
Promise.resolve([1, 2, 3])
  .then(safeMap(x => 2 * x))
  .then(result => console.log(result)) // [ 2, 4, 6 ]
  .catch(error => console.error(error));



/**
 * 用于顺序执行一组异步函数的工具函数。每个函数在执行完毕后调用下一个函数，
 * 直到最后一个函数执行完成。
 *
 * @param {Function[]} fns - 需要按顺序执行的异步函数数组，每个函数要么接受一个回调函数作为参数，
 *                            要么是无参数的（对于最后一个函数）。
 *
 * @example
 * chainAsync([
 *   next => {
 *     console.log('0 seconds');
 *     setTimeout(next, 1000);
 *   },
 *   next => {
 *     console.log('1 second');
 *     setTimeout(next, 1000);
 *   },
 *   () => {
 *     console.log('2 second');
 *   }
 * ]);
 */
const chainAsync = (fns) => {
  if (!Array.isArray(fns)) {
    throw new TypeError('Invalid input: Expecting an array of functions.');
  }

  let curr = 0;

  /**
   * 执行当前索引指向的函数，并递归调用下一个函数。
   */
  const execute = () => {
    const fn = fns[curr];

    if (typeof fn !== 'function') {
      throw new Error('Invalid function in the chain.');
    }

    try {
      if (curr < fns.length - 1) {
        // 如果不是最后一个函数，调用该函数并传入下个函数的引用
        fn(() => execute());
      } else {
        // 如果是最后一个函数，直接执行它
        fn();
      }
    } catch (error) {
      console.error('Error executing the function:', error);
      // 可以根据需要决定是否在此处结束或继续执行后续函数
    }

    curr++;
  };

  // 开始执行链式调用
  execute();
};



/**
 * 根据指定的属性和谓词条件创建一个检查函数。
 * @param {Function} predicate - 用于检查属性的谓词函数。
 * @param {string} prop - 要检查的对象属性名称。
 * @returns {Function} 一个函数，接收一个对象作为参数，并根据谓词和属性值返回布尔值。
 */
const checkProp = (predicate, prop) => {
  if (typeof predicate !== 'function') {
    throw new TypeError('Expected a function for predicate');
  }

  return obj => {
    if (typeof obj !== 'object' || obj === null) {
      throw new TypeError('Expected an object');
    }
    
    // 确保属性存在，否则返回 false
    if (!(prop in obj)) {
      return false;
    }

    try {
      return !!predicate(obj[prop]);
    } catch (error) {
      console.error('Error executing the predicate function:', error);
      return false;
    }
  };
};

// 示例用法
const lengthIs4 = checkProp(l => l === 4, 'length');
console.log(lengthIs4([])); // false
console.log(lengthIs4([1, 2, 3, 4])); // true
console.log(lengthIs4(new Set([1, 2, 3, 4]))); // false (Set uses Size, not length)

const session = { user: {} };
const validUserSession = checkProp(u => u.active && !u.disabled, 'user');

console.log(validUserSession(session)); // false

session.user.active = true;
console.log(validUserSession(session)); // true

const noLength = checkProp(l => l === undefined, 'length');
console.log(noLength([])); // false
console.log(noLength({})); // true
console.log(noLength(new Set())); // true



/**
 * 返回一个函数，该函数对输入的函数fn的结果取反。
 * @param {Function} fn - 待取反结果的函数。
 * @returns {Function} - 返回一个新的函数，该函数接受任意参数，执行原函数fn并对其结果取反。
 */
const complement = fn => {
  // 验证参数fn是否为函数
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as the argument');
  }

  return (...args) => {
    try {
      // 尝试执行原函数，并对其结果取反
      return !fn(...args);
    } catch (error) {
      // 异常处理，可以选择记录错误日志或者重新抛出异常
      console.error('Error executing the function:', error);
      // 这里选择重新抛出异常，以便调用者可以对其进行处理
      throw error;
    }
  };
};



/**
 * 组合给定的函数，从右到左执行，形成一个新的复合函数。
 * @param {Function[]} fns - 要组合的函数数组
 * @returns {Function} - 组合后的复合函数
 */
const composeRight = (...fns) => {
  // 对输入函数进行校验
  if (!fns.every(fn => typeof fn === 'function')) {
    throw new TypeError('所有参数必须是函数');
  }

  return fns.reduce((f, g) => {
    // 为了增强可读性，这里使用了具名函数
    const composed = (...args) => {
      try {
        // 执行函数g，并传入f的结果作为参数
        return g(f(...args));
      } catch (error) {
        // 异常处理，可以根据需要自定义
        console.error('执行函数g时发生错误', error);
        throw error; // 重新抛出异常，允许调用者处理
      }
    };
    return composed;
  });
};

/**
 * 两个数相加。
 * @param {number} x - 第一个加数
 * @param {number} y - 第二个加数
 * @returns {number} - 和
 */
const safeAdd = (x, y) => {
  // 对参数进行校验
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('两个参数必须都是数字');
  }
  return x + y;
};

/**
 * 计算一个数的平方。
 * @param {number} x - 要平方的数
 * @returns {number} - 平方结果
 */
const safeSquare = x => {
  // 对参数进行校验
  if (typeof x !== 'number') {
    throw new TypeError('参数必须是数字');
  }
  return x * x;
};

// 通过composeRight组合safeAdd和safeSquare函数
const addAndSquare = composeRight(safeAdd, safeSquare);

try {
  console.log(addAndSquare(1, 2)); // 9
} catch (error) {
  // 错误处理示例
  console.error('发生错误', error);
}



/**
 * converge函数接受一个converger函数和一组函数fns,返回一个新的函数，这个新函数接受任意参数，将这些参数传递给fns中的每个函数，然后把每个函数的结果
 * 作为参数传递给converger函数。
 * 
 * 
*/
const converge = (converger, fns) => (...args) => {
  // 参数验证：确保converger是一个函数，fns是一个数组
  if (typeof converger !== 'function') {
    throw new TypeError('converger must be a function');
  }
  if (!Array.isArray(fns)) {
    throw new TypeError('fns must be an array');
  }

  // 异常处理：捕获并处理每个映射函数可能抛出的异常
  try {
    // 对fns中的每个函数应用args，并将结果传递给converger
    return converger(...fns.map(fn => {
      try {
        return fn.apply(null, args);
      } catch (error) {
        console.error(`Error executing function: ${error}`);
        // 根据需求，这里可以决定是抛出异常还是返回特定的错误值
        throw error; // 或者是 return null; 或者其他处理方式
      }
    }));
  } catch (error) {
    console.error(`Error converging results: ${error}`);
    // 同样，这里需要根据实际需求决定如何处理converger执行中的异常
    throw error; // 或者 return null; 或者其他处理方式
  }
};

const averageArr = converge((a, b) => a / b, [
  arr => {
    // 对传入的数组进行非空检查
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('Input must be a non-empty array');
    }
    return arr.reduce((a, v) => a + v, 0);
  },
  arr => arr.length
]);

try {
  console.log(averageArr([1, 2, 3, 4, 5, 6, 7])); // 4
  console.log(averageArr([])); // 这里将抛出异常，因为传入了空数组
} catch (error) {
  console.error(`Error: ${error}`);
}



/**
 * Curry 一个函数
 * @param {Function} fn - 需要 curry的函数.
 * @param {number} [arity=fn.length] - curried后函数接受的参数个数 
 * @param {...any} args - 为 curried 函数预填充的参数
 * @returns {Function} 一个 curried 函数.
 */
function curry(fn, arity = fn.length, ...args) {
  // 验证输入参数
  if (typeof fn !== 'function') {
    throw new TypeError('Expected the first argument to be a function');
  }
  if (typeof arity !== 'number' || arity <= 0 || !Number.isInteger(arity)) {
    throw new TypeError('Arity must be a positive integer');
  }

  // 执行Curry
  while (args.length < arity) {
    return function partial(...rest) {
      // 递归调用curry, 逐渐填充参数
      return curry(fn, arity, ...args, ...rest);
    };
  }
  // 当参数足够时，调用原始函数
  return fn(...args);
}

// 示例
console.log(curry(Math.pow)(2)(10)); // 1024
console.log(curry(Math.min, 3)(10)(50)(2)); // 2



/**
 * 定义防抖函数，保持模块化
 * @param {Function} fn - 需要防抖的函数.
 * @param {number} [ms=0] - 防抖的间隔时间.
 * @returns {Function} 一个防抖函数.
 * 
*/ 
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// 使用一个函数来管理事件的添加和移除，提高可维护性
function manageResizeEvent(addOrRemove) {
  const handleResize = debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250);

  if (addOrRemove === 'add') {
    window.addEventListener('resize', handleResize);
  } else if (addOrRemove === 'remove') {
    window.removeEventListener('resize', handleResize);
  }
}

// 添加事件监听器
manageResizeEvent('add');

// 假设在一个组件的卸载过程中调用以下代码来移除事件监听器
// manageResizeEvent('remove');


/**
 * 深度克隆一个对象或数组，包括嵌套的对象和数组。
 * 解决循环引用问题，并能正确处理特殊类型的值（如RegExp、Function）。
 *
 * @param {any} obj - 要深度克隆的任意类型值，可以是对象、数组或其他基础类型。
 * @param {Map<any, any>=} visited - 内部使用的映射，用于跟踪已访问过的对象以处理循环引用，默认为空新映射。
 * @returns {any} - 克隆后的对象或数组，与原对象具有相同的结构和内容，但不共享任何引用。
 */
const deepClone = (obj, visited = new Map()) => {
  // 处理循环引用
  if (visited.has(obj)) {
    return visited.get(obj);
  }

  if (obj === null) return null;
  
  // 检查obj是否为特殊对象类型
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  if (typeof obj === 'function') {
    return obj.bind();
  }

  let clone;

  if (Array.isArray(obj)) {
    clone = [];
    visited.set(obj, clone); // 添加到已访问对象映射
    
    obj.forEach((item, index) => {
      clone[index] = typeof item === 'object' && item !== null ? deepClone(item, visited) : item;
    });

    // 处理数组长度
    if (obj.length === clone.length) {
      Object.defineProperty(clone, 'length', {
        value: obj.length,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  } else {
    clone = Object.assign({}, obj);
    visited.set(obj, clone); // 添加到已访问对象映射
    
    Object.keys(clone).forEach(key => {
      clone[key] = typeof obj[key] === 'object' && obj[key] !== null ? deepClone(obj[key], visited) : obj[key];
    });
  }

  return clone;
};
// 使用
const a = { foo: 'bar', obj: { a: 1, b: 2 }, regExp: /abc/g, func: function() {} };
const b = deepClone(a);

console.log(a !== b, a.obj !== b.obj, a.regExp !== b.regExp, a.func !== b.func); // true true true true



/**
 * 延时执行函数，让其在当前执行栈清空后执行，以允许浏览器进行必要的更新。
 * @param {Function} fn 待延时执行的函数
 * @param {...any} args 函数的参数
 * @returns {void}
 */
const defer = (fn, ...args) => {
  if (typeof fn !== 'function') {
    console.error('Expected the first argument to be a function');
    return;
  }
  
  try {
    setTimeout(() => {
      try {
        fn(...args);
      } catch (error) {
        console.error('Error executing deferred function:', error);
      }
    }, 1); // 延时1毫秒执行
  } catch (error) {
    console.error('Error setting up deferred execution:', error);
  }
};

// 优化后的使用示例
defer(console.log, 'a'); // 正确使用 defer
console.log('b'); // 

// 示例B: 适用场景说明，注意实际应用中需根据功能调整
document.querySelector('#someElement').innerHTML = 'Hello';
defer(longRunningFunction); // 浏览器将先更新HTML，然后在下一次事件循环中运行longRunningFunction



/**
 * 延迟执行指定的函数。
 * @param {Function} fn - 要延迟执行的函数。
 * @param {number} wait - 延迟的毫秒数。
 * @param {...any} args - 传递给函数的参数。
 * @returns {Function} 一个取消函数，调用后会取消延迟执行的函数。
 */
const delay = (fn, wait, ...args) => {
  try {
    // 设置一个定时器，以便在指定的等待时间后执行函数
    const timeout = setTimeout(() => {
      fn(...args);
    }, wait);

    // 返回一个函数，调用该函数会清除定时器，即取消延迟执行
    return () => {
      clearTimeout(timeout);
    };
  } catch (error) {
    // 如果发生异常，将其记录到控制台
    console.error('Error in delay function:', error);
  }
};

// 示例：延迟1秒后打印文本 'later'
// 同时展示了如何通过返回的取消函数来取消延迟执行的操作
const logTextLater = delay(
  (text) => console.log(text), // 使用箭头函数简化语法
  1000,
  'later'
);

// 取消延迟执行的示例代码段
// logTextLater(); // 调用此取消函数将取消延迟的console.log

// 请注意，由于此版本的delay函数增加了异常处理和返回取消函数的功能，因此在调用时需要对返回值进行适当的处理。



/**
 * 组合多个布尔判断函数，返回一个新的函数，该函数只要有任何一个原函数返回true，即返回true。
 * @param {Function[]} funcs - 多个布尔判断函数组成的数组
 * @returns {Function} - 组合后的判断函数
 */
const combinePredicates = (...funcs) => {
  // 确保传入的是函数数组
  if (!funcs.every(func => typeof func === 'function')) {
    throw new TypeError('所有参数必须是函数');
  }

  return (...args) => {
    // 依次调用所有函数并检查结果
    return funcs.some(func => func(...args));
  };
};

// 定义具体的判断函数，并增加对输入类型的检查
const isEven2 = num => {
  const value = Number(num);
  return Number.isInteger(value) && value % 2 === 0;
};

const isPositive2 = num => {
  const value = Number(num);
  return Number.isFinite(value) && value > 0;
};

// 使用新的combinePredicates函数组合判断函数
const isPositiveOrEven = combinePredicates(isPositive2, isEven2);

console.log(isPositiveOrEven(4)); // true
console.log(isPositiveOrEven(3)); // true
console.log(isPositiveOrEven(-4)); // true
console.log(isPositiveOrEven('4')); // false
console.log(isPositiveOrEven(null)); // false



/**
 * 一个用于反转函数参数顺序的高阶函数。
 * @param {Function} fn - 需要被反转参数顺序的函数。
 * @returns {Function} - 参数顺序被反转的新函数。
 */
const reverseArguments = fn => {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected an argument of type function');
  }
  return (...args) => fn(...args.reverse());
};

let sourceObject = { name: 'John Smith' };
let targetObject = {};
/**
 * 基于 Object.assign 并利用 reverseArguments 函数，
 * 创建一个合并对象属性的函数，但是会首先将源对象作为最后一个参数。
 */
const mergeObjectsReverse = reverseArguments(Object.assign);
/**
 * 绑定 mergeObjectsReverse 函数，固定第一个参数为 sourceObject。
 * 通过这种方式调用，可以方便地将 sourceObject 的属性合并到其他对象上。
 */
const mergeFromSource = mergeObjectsReverse.bind(null, sourceObject);

try {
  targetObject = mergeFromSource(targetObject); // == targetObject
  console.log(targetObject); // 展示合并后的对象
} catch (error) {
  console.error('Error merging objects:', error);
}

// 等同于直接使用 Object.assign
try {
  targetObject = {}; // 重置目标对象
  Object.assign(targetObject, sourceObject); // == targetObject
  console.log(targetObject); // 展示合并后的对象
} catch (error) {
  console.error('Error merging objects:', error);
}



/**
 * 打印函数名到控制台并返回该函数
 * @param {Function} fn - 要打印名称的函数
 * @return {Function} 返回传入的函数本身
 */
const logFunctionNameAndReturn = fn => {
  // 检查传入的参数是否为函数
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as an argument');
  }

  // 使用更广泛支持的console.log代替console.debug
  console.log(fn.name);

  // 返回传入的函数本身
  return fn;
};

logFunctionNameAndReturn(Math.max); // max (logged to console)



/**
 * 获取一个对象的类型。
 * @param {any} v - 要获取类型的值
 * @return {string} 返回类型标识
 * 
*/
const getType = v => {
  // 直接使用 Object.prototype.toString 方法来获取最准确的类型标识
  // 使用 try-catch 来处理潜在的异常情况
  try {
    return Object.prototype.toString.call(v).slice(8, -1);
  } catch (error) {
    // 在发生异常时，返回 'Unknown' 类型
    console.error("Error occurred while getting type:", error);
    return 'Unknown';
  }
};

console.log(getType(new Set([1, 2, 3]))); // 'Set'
console.log(getType(undefined));         // 'Undefined'
console.log(getType(null));              // 'Null'
console.log(getType(123));               // 'Number'
console.log(getType('test'));            // 'String'
console.log(getType(true));              // 'Boolean'
console.log(getType(new Date()));        // 'Date'
console.log(getType(Symbol('sym')));     // 'Symbol'
console.log(getType(BigInt(123456)));    // 'BigInt'



// 需先安装npm install subtle-crypto-browserify库
// 使用subtle-crypto-browserify库作为浏览器环境下crypto的替代品
const subtleCrypto = require('subtle-crypto-browserify');

async function computeSHA256Hash(val) {
  if (typeof val !== 'string') {
    throw new Error('输入值必须是字符串类型。');
  }
  
  const buffer = new TextEncoder().encode(val);
  const hashBuffer = await subtleCrypto.digest({name: 'SHA-256'}, buffer);
  const hashedValue = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  return hashedValue;
}

(async () => {
  try {
    const result = await computeSHA256Hash(JSON.stringify({
      a: 'a',
      b: [1, 2, 3, 4],
      foo: { c: 'bar' },
    }));
    
    console.log(result); // '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'
  } catch (error) {
    console.error('计算SHA256散列值时发生错误:', error);
  }
})();



/**
 * 计算函数的运行频率
 *  @param {Function} fn - 要测试的函数
 *  @param {number} [iterations=100] - 测量函数运行次数
 *  @return {number} 返回函数的运行频率，以毫秒为单位
*/
const hz = (fn, iterations = 100) => {
  const before = performance.now();
  let result;
  // "热身"过程，运行函数一次以预编译代码
  try {
    result = fn();
  } catch (error) {
    console.error("Error during warm-up:", error);
    return -1; // 使用-1作为错误标记
  }

  // 进行实际的测量
  const warmupEnd = performance.now();
  for (let i = 0; i < iterations; i++) {
    try {
      result = fn();
    } catch (error) {
      console.error("Error during measurement:", error);
      return -1; // 出现异常，结束测量
    }
  }
  return (1000 * iterations) / (performance.now() - warmupEnd);
};

// 生成测试用的数组
const numbers = Array(10000).fill().map((_, i) => i);

// 使用闭包存储函数结果，以避免重复编译
const sumReduce = (() => {
  let acc = 0;
  return () => numbers.reduce((a, n) => (acc = a + n), 0);
})();

const sumForLoop = (() => {
  let sum = 0;
  return () => {
    for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    return sum;
  };
})();

// 执行测试并打印结果
const testSumReduce = () => console.log(Math.round(hz(sumReduce)));
const testSumForLoop = () => console.log(Math.round(hz(sumForLoop)));

// 热身运行以编译代码
testSumReduce();
testSumForLoop();

// 真正的性能测试
console.log("SumReduce performance test:");
testSumReduce();
console.log("SumForLoop performance test:");
testSumForLoop();



/**
 * 检查传入的值是否为异步函数。
 * 使用 Object.prototype.toString.call 方法来确定函数类型，
 * 因为它提供了可靠的类型检查手段。
 * 
 * @param {*} val - 待检查的值。
 * @returns {boolean} - 如果传入的值是异步函数，则返回 true，否则返回 false。
 */
const isAsyncFunction = val => {
  // 确保传入的是一个函数。
  if (typeof val !== 'function') {
    return false;
  }

  // 使用 Object.prototype.toString.call 来检查函数类型。
  // '[object AsyncFunction]' 是异步函数在 JavaScript 引擎中的标记。
  return Object.prototype.toString.call(val) === '[object AsyncFunction]';
};

// 示例调用保持不变
isAsyncFunction(function() {}); // false
isAsyncFunction(async function() {}); // true



/**
 * 检查提供的值是否为JavaScript的原生布尔类型。
 * @param {*} val - 待检查的值。
 * @returns {boolean} 如果值为原生的true或false，则返回true；否则返回false。
 */
const isNativeBoolean = val => val === true || val === false;

// 测试示例
console.log(isNativeBoolean(null)); // false
console.log(isNativeBoolean(false)); // true
console.log(isNativeBoolean(undefined)); // false
console.log(isNativeBoolean(new Boolean(false))); // false



// 检查传入的值是否为Node.js的Duplex流。
const isDuplexStream = (val) => {
  // 确保运行在Node.js环境中
  if (typeof require !== 'function' || !global.process) {
    throw new Error('This function requires Node.js environment');
  }

  // 使用try-catch处理潜在的运行时错误
  try {
    // 检查val是否为null或非对象
    if (val === null || typeof val !== 'object') {
      return false;
    }

    // 确认val是否为Duplex流
    const requiredMethods = ['pipe', '_read', '_write'];
    const requiredStates = ['_readableState', '_writableState'];
    
    // 检查必要的方法是否存在
    for (let method of requiredMethods) {
      if (typeof val[method] !== 'function') {
        return false;
      }
    }

    // 检查必要的状态是否存在且为对象
    for (let state of requiredStates) {
      if (typeof val[state] !== 'object') {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('An error occurred:', error);
    return false;
  }
};

const Stream = require('stream');
console.log(isDuplexStream(new Stream.Duplex())); // true



/**
 * 检查提供的值是否为一个JavaScript函数。
 * @param {*} val - 需要检查的值。
 * @returns {boolean} - 如果值是函数，则返回true；否则返回false。
 */
const isFunction = val => {
  // 为了提高代码的健壮性，这里对null和undefined进行额外的检查。
  // 这样可以避免在尝试获取`val`的类型时抛出TypeError。
  if (val === null || val === undefined) {
    throw new TypeError('Expected a value, but received null or undefined.');
  }

  // 使用typeof操作符检查val的类型是否为'function'。
  return typeof val === 'function';
};

// 示例调用
console.log(isFunction('x')); // false
console.log(isFunction(x => x)); // true
try {
  console.log(isFunction(null)); // 抛出TypeError
} catch (e) {
  console.error(e.message);
}



/**
 * 检查传入的值是否为生成器函数。
 * @param {Function} val - 待检查的函数。
 * @returns {boolean} 如果是生成器函数则返回 true，否则返回 false。
 * @throws {TypeError} 如果传入的不是函数类型。
 */
const isGeneratorFunction = val => {
  // 首先检查传入的值是否为函数类型
  if (typeof val !== 'function') {
    throw new TypeError('Expected a function');
  }
  // 使用 Object.prototype.toString.call 来判断是否为生成器函数
  return Object.prototype.toString.call(val) === '[object GeneratorFunction]';
};

// 示例调用：
// 正确的用法
console.log(isGeneratorFunction(function*() {})); // true
console.log(isGeneratorFunction(function() {})); // false

// 错误的用法（将抛出 TypeError）
console.log(isGeneratorFunction({})); // 抛出 "Expected a function"
console.log(isGeneratorFunction('generator function')); // 抛出 "Expected a function"



/**
 * 检查给定的值是否为 null 或 undefined。
 * @param {any} val - 需要检查的值。
 * @returns {boolean} - 如果值为 null 或 undefined，返回 true；否则返回 false。
 */
const isNil = val => val === undefined || val === null;

// 检查 null 值
isNil(null); // true
// 检查 undefined 值
isNil(undefined); // true
// 检查其他值，例如空字符串
isNil(''); // false



/**
 * 检查给定的值是否为null、undefined、空数组、空对象或空字符串。
 * @param {any} val - 需要检查的值。
 * @returns {boolean} - 如果值为null、undefined、空数组、空对象或空字符串，则返回true；否则返回false。
 */
const isNilOrEmpty = val => {
  // 检查val是否为对象，确保不是null或undefined（因为它们不能调用Object.keys）
  if (val !== null && typeof val === 'object') {
    // 如果是数组，检查数组是否为空
    if (Array.isArray(val)) {
      return val.length === 0;
    }
    // 如果是对象，检查对象是否有属性
    return Object.keys(val).length === 0;
  }
  // 检查val是否为字符串
  if (typeof val === 'string') {
    // 检查字符串是否经过trim后为空
    return val.trim().length === 0;
  }
  // 对于非对象非字符串类型，或者null和undefined，调用isNil检查是否为null或undefined
  // （这里假设isNil函数已经定义并正确处理了null和undefined情况）
  return isNil(val);
};


// 测试用例
console.log(isNilOrEmpty('')); // true
console.log(isNilOrEmpty([])); // true
console.log(isNilOrEmpty({})); // true
console.log(isNilOrEmpty(null)); // true
console.log(isNilOrEmpty(undefined)); // true
console.log(isNilOrEmpty(0)); // false
console.log(isNilOrEmpty(false)); // false



/**
 * 检查给定的值是否为 null。
 * 由于 JavaScript 的特性，通常使用 '===' 运算符来严格区分 null 和 undefined，
 * 但在这个函数的用途中，我们只关心值是否为 null 或 undefined。
 * 因此，使用 '==' 运算符可以同时覆盖这两种情况，提高函数的通用性， 
 * 而不牺牲其原有功能。
 * 
 * @param {*} val - 待检查的值。
 * @returns {boolean} - 如果值为 null 或 undefined，则返回 true，否则返回 false。
 */
const isNullish = val => val == null; // 使用 '==' 来同时检查 null 和 undefined。
isNullish(null);      // true
isNullish(undefined); // true



/**
 * 检查一个对象是否类似Promise。
 * 即检查该对象是否非空，且是对象或函数类型，并且拥有then方法。
 * @param {any} obj - 待检查的对象。
 * @returns {boolean} - 如果对象类似Promise，则返回true；否则返回false。
 */
const isPromiseLike = obj => {
  // 确保对象非空
  if (obj === null) {
    return false;
  }

  // 使用typeof检查obj的类型，确保其为对象或函数
  // 并且，额外确保obj具有then方法，这是Promise的关键特征
  return (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

// 用例展示
console.log(isPromiseLike({
  then: function() {
    return '';
  }
})); // true
console.log(isPromiseLike(null)); // false
console.log(isPromiseLike({})); // false



/**
 * 检查给定的值是否为Symbol类型。
 * @param {*} val - 待检查的值。
 * @returns {boolean} 如果值是Symbol类型，则返回true；否则返回false。
 */
const isSymbol = (val) => {
  // 异常处理：确保输入值不会导致运行时错误。
  if (val === null || val === undefined) {
    console.warn('isSymbol函数收到了null或undefined作为输入。');
    return false;
  }
  
  // 使用typeof操作符检查val的类型。
  return typeof val === 'symbol';
};

isSymbol(Symbol('x')); // true



/**
 * 检查一个值是否不是undefined。
 * 由于JavaScript的特性，直接比较undefined可能涉及类型问题，
 * 使用此函数可以更明确地进行未定义值的检查。
 * @param {*} val - 需要检查的值。
 * @returns {boolean} - 如果值不是undefined，则返回true，否则返回false。
 */
const defined = val => typeof val !== 'undefined';
defined(undefined); // false



/**
 * 缓存函数的结果，从而对于重复的参数调用能提高性能。
 * @param {Function} fn - 需要被缓存结果的函数。
 * @returns {Function} 输入函数的缓存版本。
 */
const memoize = fn => {
  // 验证输入是否为函数。
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as argument');
  }

  const cache = new Map(); // 使用 Map 作为缓存容器。
  
  /**
   * 缓存的函数。
   * @param {*} val - 缓存函数的参数。
   * @returns {*} 原始函数调用的结果。
   */
  const cached = function(val) {
    // 尝试从缓存获取值，如果未找到则计算它。
    let result = cache.get(val);
    if (result === undefined) {
      try {
        // 调用原始函数并捕获错误。
        result = fn.call(this, val);
      } catch (error) {
        console.error(`An error occurred in the memoized function: ${error}`);
        throw error; // 记录错误后重新抛出。
      }
      // 将结果缓存起来。
      cache.set(val, result);
    }
    return result; // 返回结果。
  };

  // 将缓存绑定到缓存过的函数上，以便于检查或清除缓存。
  cached.cache = cache;

  return cached; // 返回缓存过的函数。
};

// 使用示例，假定有一个寻找给定单词的全部字母异位词的函数。
// 实际上，这里将是实际寻找异位词逻辑的实现。
const anagrams = word => {
  // 用于示例目的的占位符实现。
  // 实际上，这里将实现真正的字母异位词查找逻辑。
  return [...new Set(word.split('').sort().join('').split(''))];
};

// 使用 memoize 函数缓存 anagrams 函数的结果。
const anagramsCached = memoize(anagrams);

// 第一次调用可能需要一些时间进行计算。
anagramsCached('javascript');
// 第二次调用将很快返回，因为结果从缓存中获取。
anagramsCached('javascript');

// 检查缓存的异位词映射。
console.log(anagramsCached.cache);



/**
 * 测试并找出执行效率最高的函数。
 * @param {Array<Function>} fns 一个包含多个函数的数组，这些函数将被测试执行效率。
 * @param {number} iterations 每个函数重复执行的次数，默认为10000次。
 * @returns {Promise<number>} 执行效率最高的函数的索引。
 * @throws {Error} 如果传入的fns不是数组或者数组为空，抛出错误。
 * @throws {Error} 如果所有函数执行均出错，抛出错误。
 */
const mostPerformant = async (fns, iterations = 10000) => {
  // 检查传入的fns是否为数组且不为空
  if (!Array.isArray(fns) || fns.length === 0) {
    throw new Error('函数数组不能为空');
  }

  // 并行测试所有函数的执行时间
  const timeMap = await Promise.all(
    fns.map(async (fn, index) => {
      try {
        const before = performance.now();
        // 循环执行函数并记录总执行时间
        for (let i = 0; i < iterations; i++) {
          fn();
        }
        return { index, time: performance.now() - before };
      } catch (error) {
        console.error(`函数 ${index} 执行出错:`, error);
        return { index, time: -1 }; // 出错的函数标记为负数时间
      }
    })
  );

  // 过滤出执行成功且时间不为负数的函数
  const validTimes = timeMap.filter(({ time }) => time > 0);
  if (validTimes.length === 0) {
    throw new Error('所有函数执行均出错');
  }

  // 找到执行时间最短的函数索引
  const minTime = Math.min(...validTimes.map(({ time }) => time));
  const shortestFunctionIndex = validTimes.findIndex(({ time }) => time === minTime);

  return shortestFunctionIndex;
};

// 使用示例
mostPerformant([
  async () => {
    // 示例函数1
    [1, 2, 3, 4, 5, 6, 7, 8, 9, '10'].every(el => typeof el === 'number');
  },
  async () => {
    // 示例函数2
    [1, '2', 3, 4, 5, 6, 7, 8, 9, 10].every(el => typeof el === 'number');
  }
]).then(index => {
  console.log(`最高效的函数索引: ${index}`);
}).catch(error => {
  console.error(error);
});



/**
 * 返回一个新函数，该函数会否定传入函数的执行结果。
 * @param {Function} func - 需要被否定的函数。
 * @returns {Function} - 返回一个否定原函数结果的新函数。
 */
const negate = (func) => {
  /**
   * 返回对传入参数否定结果的函数。
   * @param {...*} args - 函数接收的任意参数。
   * @returns {boolean} - 返回与原函数结果相反的布尔值。
   */
  return (...args) => {
    try {
      // 执行原函数，并处理可能的错误。
      return !func(...args);
    } catch (error) {
      // 错误处理：可以针对不同情况定制错误处理策略。
      console.error("执行被否定函数时发生错误:", error);
      // 根据需求，这里可以选择抛出错误，或者返回一个默认值。
      throw error; // 或者 return false; 依赖具体场景。
    }
  };
};

// 使用示例：过滤出数组中的奇数。
const numbers2 = [1, 2, 3, 4, 5, 6];
const isEven4 = n => n % 2 === 0; // 定义一个判断偶数的函数。
const filteredNumbers = numbers2.filter(negate(isEven4)); // 使用negate函数来过滤出奇数。
console.log(filteredNumbers); // [ 1, 3, 5 ]



/**
 * 返回一个函数，该函数接受任意数量的参数，然后返回这些参数中第 n 个参数的值。
 * @param {number} n - 指定要返回的参数的索引。
 * @returns {Function} - 返回一个新函数，该函数接受任意数量的参数。
 * @throws {TypeError} - 如果 n 不是整数，则抛出错误。
 */
const nthArg = n => {
  // 参数验证：确保 n 是一个整数
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('n must be an integer');
  }

  // 返回一个新函数
  return (...args) => {
    // 处理负索引的情况
    const index = n >= 0 ? n : args.length + n;
    
    // 检查索引是否在有效范围内
    if (index < 0 || index >= args.length) {
      return undefined; // 索引无效时，返回 undefined
    }

    // 直接返回指定索引的参数值
    return args[index];
  };
};

// 测试 nthArg 函数
const third = nthArg(2);
console.log(third(1, 2, 3)); // 3
console.log(third(1, 2)); // undefined

const last = nthArg(-1);
console.log(last(1, 2, 3, 4, 5)); // 5



/**
 * 生成一个只执行一次的函数。
 * @param {Function} fn 要执行的函数。
 * @param {Object} context 函数执行时的上下文（this值）。
 * @returns {Function} 返回一个新函数，该函数最多只执行一次原函数，并确保执行时的上下文为指定的context。
 */
const once = (fn, context) => {
  let called = false;
  // 使用bind来确保当fn被调用时，其上下文（this值）是预设的context
  const boundFn = fn.bind(context);
  return function(...args) {
    if (called) return;
    called = true;
    // 在尝试执行函数时添加异常处理
    try {
      // 使用apply以保留函数的原始this值和参数列表
      return boundFn(...args);
    } catch (error) {
      // 在控制台记录错误，避免因一次失败的执行阻塞后续的事件处理
      console.error('Error executing the function:', error);
    }
  };
};

// 定义待执行的函数，并指定其执行上下文
const startApp = function(event) {
  console.log(this, event); // document.body, MouseEvent
};

// 将startApp函数与document.body绑定，并确保它只在第一次点击时执行
document.body.addEventListener('click', once(startApp, document.body));



/**
 * 创建一个新的函数，该函数接受多个函数作为参数，并返回一个新的函数，
 * 新函数可以接受任意数量的参数，然后依次调用传入的函数，并传递给它们相同的参数。
 * 如果所有传入的函数都是函数类型，则返回一个新的函数；否则抛出TypeError。
 * @param {...Function} fns - 一个或多个函数。
 * @returns {Function} 返回一个新的函数，该函数接受任意数量的参数，
 *                     然后依次调用传入的所有函数，并返回它们的结果数组。
 */
const over = (...fns) => {
  // 参数验证：确保所有传入的项都是函数类型
  if (!fns.every(fn => typeof fn === 'function')) {
    throw new TypeError('All arguments to over must be functions');
  }

  return (...args) => {
    // 错误处理：对每个函数调用添加 try-catch 支持
    return fns.map(fn => {
      try {
        // 提供一个可选的 this 上下文参数，以便调用方可以控制 this 的值
        // 注意：这里为了保持函数的输入输出不变，依然使用 null 作为 this 的值
        // 如果需要支持 this 上下文，可以调整为 over(fnContext, ...fns) 并在调用 apply 时使用 fnContext
        return fn.apply(null, args);
      } catch (error) {
        console.error(`Error executing function: ${error}`);
        // 出现错误时，返回 undefined 或其他默认值
        return undefined;
      }
    });
  };
};

// 示例调用：
const minMax = over(Math.min, Math.max);
console.log(minMax(1, 2, 3, 4, 5)); // [1,5]



/**
 * 创建一个新的函数，该函数在调用原始函数之前对原始函数的参数应用转换。
 * @param {Function} fn - 需要带有转换参数后调用的原始函数。
 * @param {Array<Function>} transforms - 一个转换函数数组，应用于`fn`的参数。
 * 每个转换函数应接受一个参数并返回其转换后的值。
 * @returns {Function} 一个新的函数，该函数接受与`fn`相同的参数，应用转换后调用`fn`。
 * @throws {Error} 如果转换函数的数量与`fn`期望的参数数量不匹配。
 */
const overArgs = (fn, transforms) => {
  // 检查转换函数数量是否与原函数期望的参数数量一致
  if (fn.length !== transforms.length) {
    throw new Error("The number of transformation functions does not match the number of arguments expected by the original function.");
  }

  // 返回一个新函数，该函数在调用原函数前对参数应用转换
  return (...args) => {
    try {
      // 对参数应用转换并调用原函数
      return fn(...args.map((val, i) => {
        // 应用转换函数
        return transforms[i](val);
      }));
    } catch (error) {
      // 错误处理：记录错误信息
      console.error("Error applying transformations:", error);
      // 根据需求重新抛出错误或返回默认值
      throw error;
    }
  };
};

// 使用示例：
const square = n => n * n; // 期望一个数字，返回一个数字
const double = n => n * 2; // 同上
const fn = overArgs((x, y) => [x, y], [square, double]);
console.log(fn(9, 3)); // [81, 6]



/**
 * partial函数：创建一个部分应用的函数。
 * @param {Function} fn - 要部分应用的函数。
 * @param {...*} partials - 要预填的参数。
 * @returns {Function} - 部分应用后的函数。
 */
const partial = (fn, ...partials) => {
  // 参数校验：确保fn是一个函数。
  if (typeof fn !== 'function') {
    throw new TypeError('Expected the first argument to be a function');
  }

  return (...args) => {
    try {
      // 使用apply调用函数，以支持传入数组作为参数。
      return fn.apply(null, partials.concat(args));
    } catch (error) {
      // 异常处理：可在此添加更具体的错误处理逻辑。
      console.error('Error occurred in partially applied function:', error);
      throw error; // 继续抛出异常，以便调用者也可以处理。
    }
  };
};

const greet2 = (greeting, name) => greeting + ' ' + name + '!'; // 示例函数
const greetHello = partial(greet2, 'Hello'); // 部分应用
greetHello('John'); // 'Hello John!'



/**
 * partialRight函数用于将一个函数的参数部分右移，并用给定的参数预填充。
 * @param {Function} fn - 原始函数
 * @param {...*} partials - 预填充的参数
 * @returns {Function} - 部分应用后的函数
 */
const partialRight = (fn, ...partials) => {
  // 类型检查，确保fn是一个函数
  if (typeof fn !== 'function') {
    throw new TypeError('Expected the first argument to be a function');
  }
  
  return (...args) => {
    try {
      // 调用原始函数，将args和partials拼接后传递给fn
      return fn(...args, ...partials);
    } catch (error) {
      // 异常处理，可以选择记录日志或者重新抛出异常
      console.error('Error occurred in partialRight:', error);
      throw error; // 重新抛出异常，允许调用者处理
    }
  };
};

const greet = (greeting, name) => greeting + ' ' + name + '!'; // 示例函数
const greetJohn = partialRight(greet, 'John'); // 部分应用示例
greetJohn('Hello'); // 'Hello John!'



/**
 * 根据提供的回调函数对数组进行分区。
 * @param {Array} arr - 待分区的数组。
 * @param {Function} fn - 用于决定元素去向的回调函数，返回true的元素放在第一个数组，否则放在第二个数组。
 * @returns {Array[]} - 一个包含两个数组的数组，第一个数组包含所有使回调函数返回true的元素，第二个数组包含所有使回调函数返回false的元素。
 */
const partitionArray = (arr, fn) => {
  // 检查`fn`是否为函数类型
  if (typeof fn !== 'function') {
    throw new TypeError('Expected the second argument to be a function');
  }
  
  // 检查`arr`是否为数组类型
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected the first argument to be an array');
  }

  return arr.reduce(
    (acc, val, i, arr) => {
      try {
        // 使用try-catch捕获`fn`执行时可能抛出的异常
        acc[fn(val, i, arr) ? 0 : 1].push(val);
      } catch (error) {
        console.error(`Error executing the callback function: ${error}`);
        // 选择是继续执行还是终止操作，这里选择继续
      }
      return acc;
    },
    [[], []]
  );
};

const users = [{ user: 'barney', age: 36, active: false }, { user: 'fred', age: 40, active: true }];
console.log(partitionArray(users, o => o.active));
// [[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]]



/**
 * 根据给定的回调函数将数组分割成多个子数组。
 * @param {Array} arr 要分割的数组。
 * @param {Function} fn 决定元素分组的回调函数。
 * @returns {Array} 分割后的子数组。
 */
const partitionBy = (arr, fn) => {
  // 输入参数校验
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as the second argument');
  }
  
  let res = [];
  let last = undefined;

  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    try {
      const next = fn(v, i, arr);
      
      if (next !== last) {
        res.push([v]);
      } else {
        res[res.length - 1].push(v);
      }

      last = next;
    } catch (error) {
      console.error('Error occurred in the callback function:', error);
      // 选择是继续执行还是中断，这里选择继续
    }
  }

  return res;
};

const numbers3 = [1, 1, 3, 3, 4, 5, 5, 5];

console.log(partitionBy(numbers3, n => n % 2 === 0)); // [[1, 1, 3, 3], [4], [5, 5, 5]]
console.log(partitionBy(numbers3, n => n)); // [[1, 1], [3, 3], [4], [5, 5, 5]]



/**
 * 创建一个组合异步函数的工具函数。
 * 此函数接收多个异步函数作为参数，它们将被依次（左到右）应用于给定的初始参数。
 * 每个函数的输出将作为下一个函数的输入。
 * 所有函数必须是异步函数或返回一个Promise。
 * 
 * @param {Function[]} fns - 一个或多个异步函数。
 * @returns {Function} 返回一个函数，此函数接收一个参数作为初始值，然后依次通过所有给定的异步函数。
 */
const pipeAsyncFunctions = (...fns) => {
  // 检查所有参数是否为函数
  if (!fns.every(fn => typeof fn === 'function')) {
    throw new TypeError('All arguments to pipeAsyncFunctions must be functions');
  }
  return arg => {
    try {
      // 使用reduce方法组合异步函数，依次执行
      return fns.reduce(async (p, f) => {
        try {
          // 等待前一个函数的Promise解析，然后应用当前函数
          return await p.then(f);
        } catch (error) {
          // 如果执行中出现错误，打印错误并重新抛出，确保错误不被吞没
          console.error('Error executing function', error);
          throw error;
        }
      }, Promise.resolve(arg)); // 初始值为解析为arg的Promise
    } catch (error) {
      // 处理reduce过程可能抛出的任何错误
      console.error('Error in pipeAsyncFunctions execution', error);
      throw error; // 可选地，你可能想在这里返回一个被拒绝的Promise
    }
  };
};

/**
 * 示例：创建一个异步求和函数。
 * 此函数展示了如何使用pipeAsyncFunctions来组合异步操作。
 */
const sum = pipeAsyncFunctions(
  x => x + 1, // 简单的同步加法
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)), // 异步加法，带有延迟
  x => x + 3, // 另一个同步加法
  async x => (await x) + 4 // 在这里等待Promise解析后再进行加法
);

(async() => {
  try {
    // 执行sum函数并打印结果，演示了如何使用pipeAsyncFunctions组合的异步函数。
    console.log(await sum(5)); // 15 (after one second)
  } catch (error) {
    // 错误处理
    console.error('Error executing sum:', error);
  }
})();



/**
 * 组合多个函数形成一个管道，依次将第一个函数的输出作为第二个函数的输入，依此类推。
 * @param {...Function} fns - 要组合的函数列表
 * @returns {Function} 组合后的函数
 */
const pipeFunctions = (...fns) => {
  // 确保传入的是函数数组
  if (!fns.every(fn => typeof fn === 'function')) {
    throw new TypeError('所有参数必须是函数');
  }

  return fns.reduce((prevFn, currFn) => {
    // 包装函数以提供额外的错误处理
    return (...args) => {
      try {
        // 调用前一个函数，并将结果作为参数传递给当前函数
        return currFn(prevFn(...args));
      } catch (error) {
        // 可以根据需要自定义错误处理逻辑
        console.error(`执行 ${currFn.name} 时出错:`, error);
        throw error; // 重新抛出错误以允许调用者处理
      }
    };
  });
};

const add5 = x => x + 5;
const multiply = (x, y) => x * y;

// 使用pipeFunctions组合函数
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
console.log(multiplyAndAdd5(5, 2)); // 15



/**
 * 将接受回调的函数转换为返回Promise的函数。
 * @param {Function} func 需要被转换的函数。
 * @returns {Function} 返回一个新的函数，该函数接受与原函数相同的参数，但返回一个Promise。
 */
const promisify = func => {
  // 参数校验：确保传入的是一个函数
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  return (...args) => {
    return new Promise((resolve, reject) => {
      // 确保有足够数量的参数供原函数使用，并且最后一个参数是回调函数（如果存在）
      const callbackIndex = func.length - 1;
      const lastArg = args[callbackIndex];
      let cbWrapper;

      if (typeof lastArg === 'function') {
        // 如果最后一个参数是回调，则直接使用
        cbWrapper = lastArg;
      } else {
        // 否则，创建一个空的回调函数
        cbWrapper = (err, result) => err ? reject(err) : resolve(result);
      }

      try {
        func(...args.slice(0, callbackIndex), cbWrapper);
      } catch (error) {
        reject(error);
      }
    });
  };
};

// 延迟指定时间后返回Promise。
const delay2 = promisify((d, cb) => {
  // 参数校验：确保延迟时间是数字且大于等于0
  if (typeof d !== 'number' || d < 0) {
    throw new TypeError('Expected a non-negative number for delay');
  }
  setTimeout(cb, d);
});

// 使用示例
delay2(2000).then(() => console.log('Hi!')).catch(error => {
  console.error('An error occurred:', error);
});



/**
 * 将函数的参数按照指定的新顺序重新排列。
 * @param {Function} fn - 原函数。
 * @param {Array<number>} indexes - 参数的新顺序。
 * @returns {Function} - 一个新函数，按照新顺序调用原函数的参数。
 */
const rearg = (fn, indexes) => {
  // 校验原函数参数数量和索引数组长度是否一致
  const originalParamCount = fn.length;
  if (indexes.length !== originalParamCount) {
    throw new Error(`原函数期望 ${originalParamCount} 个参数，但索引数组提供了 ${indexes.length} 个。`);
  }

  // 检查索引数组是否包含重复项
  const uniqueIndexes = new Set(indexes);
  if (uniqueIndexes.size !== indexes.length) {
    throw new Error('索引数组包含重复项，每个参数只能映射一次。');
  }

  return (...args) => {
    // 使用解构赋值来简化参数的重新排列，以提高代码的可读性和性能
    const argsInNewOrder = indexes.map(index => args[index]);
    return fn(...argsInNewOrder);
  };
};

var rearged = rearg(
  function(a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);

try {
  rearged('b', 'c', 'a'); // ['a', 'b', 'c']
} catch (error) {
  console.error(error.message);
}



/**
 * 顺序执行一系列 Promise 函数。
 * @param {Array<function(): Promise>} ps - 一个包含要执行的 Promise 函数的数组。
 * @returns {Promise} - 表示所有 Promise 函数都已按顺序执行完成的 Promise。
 */
const runPromisesInSeries = ps => {
  // 检查输入数组是否为空，如果是则直接返回一个已解决的 Promise
  if (ps.length === 0) {
    return Promise.resolve();
  }

  // 使用 reduce 方法按顺序执行每个 Promise 函数
  return ps.reduce((p, next) => {
    // 为每个 Promise 添加异常处理
    return p.then(() => next().catch(error => {
      console.error('Promise execution error:', error);
      // 在捕获异常后，继续执行下一个 Promise，而不是中断整个序列
      return Promise.resolve();
    }));
  }, Promise.resolve());
};

/**
 * 延迟指定时间后返回一个 Promise。
 * @param {number} d - 延迟时间，以毫秒为单位。
 * @returns {Promise} - 表示延迟已完成的 Promise。
 */
const delay3 = d => new Promise(resolve => setTimeout(resolve, d));

// 示例：顺序执行两个延迟 Promise
runPromisesInSeries([() => delay(1000), () => delay3(2000)]);


/**
 * 等待指定的毫秒数。
 * @param {number} ms - 要等待的毫秒数。
 * @returns {Promise} 如果输入有效，返回一个Promise对象，该Promise在指定的毫秒数后解决；如果输入无效，返回一个拒绝的Promise。
 */
const sleep = (ms) => {
  // 输入验证
  if (typeof ms !== 'number' || ms < 0) {
    return Promise.reject(new Error('Invalid input: ms must be a non-negative number.'));
  }
  
  return new Promise((resolve) => {
    // 异常处理
    try {
      setTimeout(resolve, ms);
    } catch (error) {
      // 在这里处理setTimeout可能抛出的异常，例如：
      console.error('Error during sleep:', error);
      throw error; // 继续向上传播异常
    }
  });
};

/**
 * 一个异步函数，演示了如何使用sleep函数。
 */
async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.");
  try {
    await sleep(1000);
    console.log('I woke up after 1 second.');
  } catch (error) {
    // 在这里处理sleepyWork中await sleep可能抛出的异常
    console.error('Error while sleeping:', error);
  }
}

// 示例：调用sleepyWork函数
sleepyWork();



/**
 * 节流函数生成器。
 * 函数`fn`将在给定的时间间隔`wait`内被限制调用次数，保证不会频繁触发。
 * @param {Function} fn 需要被节流的函数。
 * @param {number} wait 设置的时间间隔，单位为毫秒。
 * @returns {Function} 返回一个经过节流处理的函数。
 */
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;

  // 返回一个封装了节流逻辑的函数
  return function() {
    const context = this,
      args = arguments;
    
    // 如果之前设置的定时器存在且是数字类型，则清除定时器
    if (lastFn && typeof lastFn === 'number') {
      clearTimeout(lastFn);
    }

    if (!inThrottle) {
      // 如果当前不在节流期内，则执行原函数
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      // 如果在节流期内，重新设置定时器，以便在等待时间过后执行函数
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
          inThrottle = false; // 重新允许调用
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

/**
 * 处理窗口大小改变的函数，示例用途：打印窗口的宽度和高度。
 */
const handleResize = () => {
  console.log(window.innerWidth);
  console.log(window.innerHeight);
};

// 使用throttle函数封装handleResize，并添加到window的resize事件监听器上
const throttledHandleResize = throttle(handleResize, 250);
window.addEventListener('resize', throttledHandleResize);

// 注：代码中提供了如何添加事件监听器的示例，如果需要移除监听器，可以使用以下方式：
// window.removeEventListener('resize', throttledHandleResize);



/**
 * 该函数执行指定次数的回调操作。
 * @param {number} n - 回调函数需要被调用的次数。
 * @param {function} fn - 需要执行的回调函数。
 * @param {object} [context=undefined] - 回调函数执行时的上下文对象，默认为undefined。
 */
const times = (n, fn, context = undefined) => {
  // 检查回调函数是否为函数类型
  if (typeof fn !== 'function') {
    throw new TypeError('The second argument should be a function');
  }

  let i = 0;
  try {
    // 通过循环执行回调函数，直到either n次执行完成或回调函数返回false
    while (i < n && fn.call(context, i) !== false) {
      i++;
    }
  } catch (error) {
    // 捕获并记录回调函数执行过程中的错误
    console.error('An error occurred during the execution of the callback function:', error);
  }
};

// 使用let定义变量以避免提升
let output = '';
// 通过times函数累计字符串输出
times(5, i => (output += i));
// 输出累计的结果
console.log(output); // 01234



/**
 * 测量一个回调函数的执行时间，并返回该函数的执行结果。
 * @param {Function} callback - 需要测量执行时间的函数。
 * @returns {*} - 回调函数的返回值。
 */
const timeTaken = callback => {
  console.time('timeTaken');
  let result;
  try {
    result = callback();
  } catch (error) {
    console.error('回调函数执行出错:', error);
    throw error; // 重新抛出异常，以便外部代码可以处理
  } finally {
    console.timeEnd('timeTaken');
  }
  return result;
};

// 示例调用，保持功能和内部字符串不变
timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms



/**
 * 创建一个仅接受一个参数的函数，该函数尝试对给定值应用提供的函数并返回结果。
 * 如果应用函数的结果是数字，则返回该结果；如果结果是非数字，则返回 null。
 * @param {Function} fn - 将要应用到给定值上的函数。
 * @returns {Function} 一个新函数，该函数接受一个值作为参数，并尝试应用提供的函数。
 */
const unary = fn => val => {
  try {
    const result = fn(val); // 尝试用提供的函数处理值
    return isNaN(result) ? null : result; // 如果结果是数字，返回结果；否则返回 null
  } catch (e) {
    console.error(e); // 捕获并记录异常
    return null; // 返回 null 以指示操作失败
  }
};

// 使用 unary 函数创建一个将字符串转换为数字的映射
['6', '8', 'a', '010'].map(unary(val => parseInt(val, 10))); // [6, 8, null, 10]



/**
 * 反柯里化函数，将一个柯里化的函数转换为非柯里化的函数。
 * @param {Function} fn - 需要被反柯里化的函数。
 * @param {number} n - 指定需要一次性传入的参数数量，默认为1。
 * @returns {Function} 返回一个新函数，该函数接受一系列参数后，一次性调用原函数。
 */
const uncurry = (fn, n = 1) => {
  // 检查参数fn是否为函数
  if (typeof fn !== 'function') {
    throw new TypeError('Expected the first argument to be a function');
  }
  
  // 检查n是否为正整数
  if (!Number.isInteger(n) || n < 1) {
    throw new TypeError('Expected the second argument to be a positive integer');
  }

  // 返回一个能够一次性调用原函数的函数
  return (...args) => {
    const next = acc => args => args.reduce((x, y) => x(y), acc);
    
    // 检查参数数量是否满足要求
    if (n > args.length) {
      throw new RangeError(`Expected at least ${n} arguments, but received ${args.length}`);
    }
    
    // 执行反柯里化操作
    return next(fn)(args.slice(0, n));
  };
};

// 示例：创建一个柯里化的加法函数，然后进行反柯里化
const add = x => y => z => x + y + z;
const uncurriedAdd = uncurry(add, 3);

try {
  console.log(uncurriedAdd(1, 2, 3)); // 输出6
} catch (error) {
  console.error(error.message);
}



/**
 * 封装了一个条件判断逻辑，根据条件判定是否执行特定操作。
 * @param {Function} predicate - 判断条件的函数。
 * @param {Function} action - 条件满足时执行的操作。
 * @returns {Function} 返回一个函数，该函数接受一个参数x，并根据predicate的判断结果执行对应操作。
 */
const conditionalProcessor = (predicate, action) => {
  // 参数类型检查
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate必须是一个函数');
  }
  if (typeof action !== 'function') {
    throw new TypeError('action必须是一个函数');
  }
  return x => {
    // 进一步的参数检查
    if (typeof x !== 'number') {
      throw new TypeError('函数期望一个数字作为参数');
    }
    try {
      // 条件判断和操作执行
      return predicate(x) ? action(x) : x;
    } catch (error) {
      // 异常处理
      console.error('执行条件操作时发生错误:', error);
      throw error; // 重新抛出异常，允许调用者处理
    }
  };
};

/**
 * 用于将偶数乘以2的函数。
 * @param {number} x - 输入的数字。
 * @returns {number} 如果x是偶数，则返回x的两倍；否则返回x本身。
 */
const multiplyEvenNumbersByTwo = conditionalProcessor(
  x => x % 2 === 0, // 条件：判断是否为偶数
  x => x * 2 // 操作：将x乘以2
);

console.log(multiplyEvenNumbersByTwo(2)); // 4
console.log(multiplyEvenNumbersByTwo(1)); // 1
console.log(multiplyEvenNumbersByTwo('2')); // TypeError: 函数期望一个数字作为参数



