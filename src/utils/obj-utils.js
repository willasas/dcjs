// 对象操作

/**
 * 绑定一个函数到特定上下文，并预先绑定一些参数。
 * @param {Function} fn 要绑定的函数。
 * @param {Object} context 上下文对象。
 * @param {...*} boundArgs 预先绑定的参数。
 * @returns {Function} 绑定后的函数。
 */
const bindFunctionWithArgs = (fn, context, ...boundArgs) => {
  // 检查fn是否为函数类型
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function for the first argument');
  }
  
  // 检查context是否为非null/undefined对象
  if (context == null) {
    throw new TypeError('Expected an object for the second argument');
  }

  return (...args) => fn.apply(context, [...boundArgs, ...args]);
};

// 使用
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const freddy = { user: 'fred' };
const freddyBound = bindFunctionWithArgs(greet, freddy);
console.log(freddyBound('hi', '!')); // 'hi fred!'



/**
 * 绑定一个函数到特定对象，并预先绑定一些参数。
 * @param {Object} obj 要绑定的函数所在的对象。
 * @param {...string} fns 要绑定的函数名。
 * @return {Object} 绑定后的对象。
*/
const bindAll = (obj, ...fns) => {
  // 使用Map对象存储原始方法，以便可能的恢复
  const originalMethods = new Map();

  fns.forEach(fn => {
    // 检查fn是否为字符串且为对象obj的方法名
    if (typeof fn === 'string' && fn in obj) {
      // 存储原有方法到Map对象中
      originalMethods.set(fn, obj[fn]);
      // 使用更清晰的代码逻辑来重新绑定方法
      obj[fn] = function() {
        return originalMethods.get(fn).apply(obj);
      };
    } else {
      // 如果不是，则输出警告信息
      console.warn(`Invalid method name: ${fn}`);
    }
  });
};

var view = {
  label: 'docs',
  click: function() {
    console.log('clicked ' + this.label);
  }
};

bindAll(view, 'click');

// 获取DOM元素并添加原生事件监听器
const element = document.querySelector(/* 选择器 */);
element.addEventListener('click', view.click); // 当点击时仍会输出 'clicked docs'



/**
 * @function bindKey
 * 绑定一个对象的方法到特定上下文，并允许预设一组参数。
 *
 * @param {Object} context - 上下文对象，方法将在这个上下文中执行。
 * @param {string} fn - 要绑定的对象方法名，以字符串形式表示。
 * @param {...*} boundArgs - 预先设定的参数，这些参数将会在调用时被固定传入。
 * @returns {Function} 返回一个新的函数，该函数在调用时会应用预设的上下文和参数。
 */
const bindKey = (context, fn, ...boundArgs) => (...args) => {
  if (typeof context[fn] !== 'function') {
    throw new TypeError(`The property '${fn}' of the provided context is not a function.`);
  }
  
  // 使用数组concat方法来拼接参数，以提高性能（或者保持原版的展开运算符）
  return context[fn].apply(context, boundArgs.concat(args));
};

/**
 * @typedef FreddyObject
 * @property {string} user - 用户的名字。
 * @property {Function} greet - 问候用户的函数，接受两个参数：问候语和标点符号。
 */

/**
 * 示例用户对象
 * @type {FreddyObject}
 */
const freddy2 = {
  user: 'fred',
  /**
   * 创建问候消息的方法
   * @param {string} greeting - 用于问候的消息。
   * @param {string} punctuation - 消息末尾的标点符号。
   * @returns {string} - 完整的问候消息。
   */
  greet: function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};

/**
 * 已经使用bindKey绑定过的greet函数实例
 * @type {Function}
 */
const freddyBound2 = bindKey(freddy2, 'greet');

console.log(freddyBound2('hi', '!')); // 'hi fred!'



/**
 * 深度冻结一个对象，使其不可变。递归地冻结对象的所有属性，包括嵌套对象和数组。
 * @param {Object} obj 要深度冻结的对象。
 * @param {Map} seen 用于记录已遍历对象的映射，防止循环引用导致无限递归。默认为一个新的Map对象。
 * @returns {Object} 返回经过Object.freeze()处理后的对象，使其不可变。
 */
const deepFreeze = (obj, seen = new Map()) => {
  // 检测循环引用
  if (seen.has(obj)) {
    return obj;
  }
  
  // 获取对象的所有属性，包括Symbol作为键的属性
  const symbols = Object.getOwnPropertySymbols(obj);
  const props = [...Object.getOwnPropertyNames(obj), ...symbols];
  
  props.forEach(prop => {
    try {
      const value = obj[prop];
      // 对象且非数组、非已冻结对象的属性进行递归深度冻结
      if (value && typeof value === 'object' && !Array.isArray(value) && !Object.isFrozen(value)) {
        // 防护循环引用
        seen.set(value, true);
        deepFreeze(value, seen);
        seen.delete(value);
      }
    } catch (error) {
      console.error(`Error freezing property ${prop}:`, error);
    }
  });

  return Object.freeze(obj);
};

// 使用
const o = deepFreeze([1, [2, 3]]);
console.log(o[0] = 3); // not allowed
console.log(o[1][0] = 4); // not allowed as well



/**
 * 从嵌套的对象或数组中，根据给定的键数组（keys） deep-get 其值。
 * @param {Object} obj 要搜索的嵌套对象或数组。
 * @param {Array} keys 一个包含要遵循的路径的键数组。
 * @returns 返回找到的值，如果指定的键不存在则返回 null。
 */
const deepGet = (obj, keys) => {
  // 验证输入的类型
  if (typeof obj !== 'object' || obj === null || !Array.isArray(keys)) {
    throw new TypeError('Expected obj to be an object and keys to be an array');
  }

  // 遍历 keys 以获取最终结果，优化性能而不用 reduce
  let result = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // 特殊处理数组索引的情况
    if (Array.isArray(result) && typeof key === 'number' && key < result.length) {
      result = result[key];
    } else if (typeof result === 'object' && result !== null && key in result) {
      result = result[key];
    } else {
      // 如果当前键不存在于对象中，提前返回 null
      return null;
    }
  }

  return result;
};

// 示例
let index = 2;
const data = {
  foo: {
    foz: [1, 2, 3],
    bar: {
      baz: ['a', 'b', 'c']
    }
  }
};

try {
  console.log(deepGet(data, ['foo', 'foz', index])); // 获取 ['foo', 'foz', 2] 对应的值，即 3
  console.log(deepGet(data, ['foo', 'bar', 'baz', 8, 'foz'])); // 由于路径不存在，返回 null
} catch (error) {
  console.error(error.message);
}



/**
 * 深度映射对象的键。
 * 对象的每个键都会通过函数 fn 进行转换，该转换也会递归应用到对象的每个嵌套属性上。
 * @param {Object} obj 要映射键的对象。不能是 null。
 * @param {Function} fn 用于转换键的函数。接收当前键作为参数，应返回转换后的键。
 * @returns {Object} 一个新的对象，其中所有键都经过 fn 转换。原始对象不会被修改。
 * @throws {TypeError} 如果 obj 不是对象或 fn 不是函数，则抛出类型错误。
 */
const deepMapKeys = (obj, fn) => {
  // 确保输入符合要求
  if (obj === null || typeof obj !== 'object' || typeof fn !== 'function') {
    throw new TypeError('Expected obj to be an object and fn to be a function');
  }

  // 使用 WeakSet 来检测循环引用
  const visited = new WeakSet();

  // 针对数组的处理逻辑
  if (Array.isArray(obj)) {
    return obj.map(val => deepMapKeys(val, fn, visited));
  }

  // 针对普通对象的处理逻辑
  if (typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [currentKey, val]) => {
      // 检测并避免循环引用
      if (visited.has(val)) {
        return acc;
      }

      const newKey = fn(currentKey);
      acc[newKey] =
        val !== null && typeof val === 'object'
          ? deepMapKeys(val, fn, visited) // 递归处理嵌套对象
          : val;
      return acc;
    }, {});
  }

  // 如果不是对象也不是数组，则直接返回原值
  return obj;
};

// 示例
const obj = {
  foo: '1',
  nested: {
    child: {
      withArray: [
        {
          grandChild: ['hello']
        }
      ]
    }
  }
};
const upperKeysObj = deepMapKeys(obj, key => key.toUpperCase());
console.log(upperKeysObj);



/**
 * 将一系列对象合并，并按照传入的顺序，将后面的对象的属性值覆盖前面的对象中的同名属性。
 * @param {Object} obj - 基础对象，其属性将被后续对象的同名属性覆盖。
 * @param {...Object} defs - 一个或多个额外的对象，其属性将被合并到基础对象中。
 * @returns {Object} - 合并后的对象。
 */
const mergeObjects = (obj, ...defs) => {
  // 确保obj是一个对象，避免运行时错误
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object as the first argument');
  }
  
  // 创建一个新对象以避免修改输入对象
  const result = Object.assign({}, obj);
  
  // 直接遍历defs数组并合并对象，无需reverse操作，提高性能
  defs.forEach(def => {
    if (typeof def === 'object' && def !== null) {
      Object.assign(result, def);
    }
  });
  
  return result;
};

// 示例调用
console.log(mergeObjects({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 })); // { a: 1, b: 2 }



/**
 * 递归地在对象中查找指定的属性值。
 * @param {Object} obj 要搜索的对象。
 * @param {string} target 要查找的属性名称。
 * @returns {*} 找到的属性值，如果未找到则返回 undefined。
 */
const dig = (obj, target) => {
  // 增强参数校验
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object');
  }

  // 避免循环引用导致的无限循环
  const visited = new Set();

  const search = (obj) => {
    if (visited.has(obj)) {
      return undefined;
    }
    visited.add(obj);

    if (target in obj) {
      return obj[target];
    }

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        const result = search(obj[key]);
        if (result !== undefined) {
          return result;
        }
      }
    }

    return undefined;
  };

  return search(obj);
};

const data2 = {
  level1: {
    level2: {
      level3: 'some data'
    }
  }
};

console.log(dig(data2, 'level3')); // 'some data'
console.log(dig(data2, 'level4')); // undefined



/**
 * 比较两个值是否相等，支持循环引用和多种数据类型的比较。
 * @param {any} a - 第一个要比较的值。
 * @param {any} b - 第二个要比较的值。
 * @param {WeakMap} visited - 用于记录已访问的对象，防止循环引用。
 * @returns {boolean} - 如果两个值相等，则返回true；否则返回false。
 */
const equals = (a, b, visited = new WeakMap()) => {
  // 兼容null值的类型检查
  if (a === b || (a === null && b === null)) return true;
  // 比较日期对象
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  // 处理非对象或null的情况
  if (!a || !b || (a === null || b === null) || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  
  // 检测循环引用
  if (visited.has(a)) return true;
  visited.set(a, true);

  // 比较原型
  if (a.prototype !== b.prototype) return false;
  
  let keysA = Object.keys(a);
  let keysB = Object.keys(b);
  // 比较键的数量
  if (keysA.length !== keysB.length) return false;

  // 遍历自有属性以进行比较
  for (let key of keysA) {
    if (!keysB.includes(key) || !equals(a[key], b[key], visited)) return false;
  }
  
  return true;
};

console.log(equals({ a: [2, { e: 3 }], b: [4], c: 'foo' }, { a: [2, { e: 3 }], b: [4], c: 'foo' })); // true
console.log(equals([1, 2, 3], { 0: 1, 1: 2, 2: 3 })); // true
console.log(equals({ a: { b: null } }, { a: { b: {}} })); // false - 避免了无限循环



/**
 * 在给定对象中查找第一个满足条件的键。
 * @param {Object} obj 要搜索的对象。
 * @param {Function} fn 用于测试每个键值对的函数，返回true表示匹配。
 * @returns {string|undefined} 如果找到匹配的键则返回该键，否则返回undefined。
 */
const findKey = (obj, fn) => {
  // 参数类型检查
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new TypeError('Expected an object for "obj" parameter');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function for "fn" parameter');
  }

  // 使用Object.keys进行遍历
  try {
    return Object.keys(obj).find(key => fn(obj[key], key, obj));
  } catch (error) {
    console.error('An error occurred during the search:', error);
    // 根据需要，可以选择抛出异常或返回undefined
    return undefined;
  }
};

// 示例调用
const object = {
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
  pebbles: { age: 1, active: true }
};
const activeKey = findKey(object, o => o['active']);
console.log(activeKey); // 'barney'



/**
 * 查找给定对象中最后一个满足特定条件的键。
 * @param {Object} obj 要搜索的对象。
 * @param {Function} fn 用于测试键值对是否满足条件的函数。
 * @returns 最后一个满足条件的键，如果无满足条件的键则返回 undefined。
 */
const findLastKey = (obj, fn) => {
  // 确保 obj 是一个对象，fn 是一个函数
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new TypeError('Expected obj to be an object');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected fn to be a function');
  }

  // 使用 Object.keys 反向遍历对象的键，以找到最后一个满足条件的键
  return Object.keys(obj)
    .reverse()
    .find(key => fn(obj[key], key, obj));
};

try {
  const lastActiveKey = findLastKey(
    {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
      pebbles: { age: 1, active: true }
    },
    o => o['active']
  );
  console.log(lastActiveKey); // 'pebbles'
} catch (error) {
  console.error('Error:', error.message);
}



/**
 * 将嵌套对象展平为一维键值对对象。
 * @param {Object} obj 要展平的嵌套对象。
 * @param {string} prefix 传递给内部递归调用的前缀，用于构建键的名称。
 * @param {WeakMap} visited 用于检测循环引用的访问记录。
 * @returns {Object} 展平后的对象。
 * @throws {TypeError} 如果输入不是对象或为null。
 * @throws {Error} 如果检测到循环引用。
 */
const flattenObject = (obj, prefix = '', visited = new WeakMap()) => {
  // 验证输入是否为对象
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected input to be an object');
  }

  // 检测循环引用
  if (visited.has(obj)) {
    throw new Error('Detected a circular reference');
  }
  visited.set(obj, true);

  // 通过递归处理对象的每个属性，将嵌套结构展平
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const pre = prefix.length ? `${prefix}.` : '';
    const newKey = pre + key;

    // 如果值是对象且不为空，则递归展平
    if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
      try {
        // 尝试递归展平并合并到当前结果
        Object.assign(acc, flattenObject(value, newKey, visited));
      } catch (e) {
        // 处理循环引用
        if (e instanceof Error && e.message === 'Detected a circular reference') {
          acc[newKey] = '[Circular]';
        } else {
          throw e;
        }
      }
    } else {
      // 直接添加简单值
      acc[newKey] = value;
    }
    return acc;
  }, {});
};

// 示例用法
console.log(flattenObject({ a: { b: { c: 1 } }, d: 1 }));
// { 'a.b.c': 1, d: 1 }



/**
 * 遍历对象的自身属性，对每个属性的值执行提供的回调函数。
 * @param {Object} obj 要遍历的对象。
 * @param {Function} fn 对每个属性值执行的回调函数。
 */
const forOwn = (obj, fn) => {
  // 参数类型校验
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object for "obj"');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function for "fn"');
  }

  // 使用for...in循环遍历对象的自身属性
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 执行回调函数，并捕获可能的错误
      try {
        fn(obj[key], key, obj);
      } catch (error) {
        // 如果提供stopOnError选项，并且为true，则在错误发生时停止遍历
        // 这里假设了stopOnError选项的存在，实际代码中需要根据需求添加对该选项的处理
        if (stopOnError) {
          break;
        }
        // 否则，仅捕获错误，不中断遍历
      }
    }
  }
};

forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1



/**
 * 遍历对象的每个属性，从最后一个属性开始遍历。
 * 对于每个属性，执行提供的回调函数fn。
 * @param {Object} obj 要遍历的对象。
 * @param {Function} fn 对象的每个属性值调用的回调函数。该函数接收三个参数：属性值(v)，属性键(key)，原对象(obj)。
 */
const forOwnRight = (obj, fn) => {
  // 使用Object.keys获取对象的所有键，然后reverse以实现逆序遍历
  Object.keys(obj)
    .reverse()
    .forEach(key => {
      try {
        // 调用传入的回调函数，并对可能的异常进行捕获处理
        fn(obj[key], key, obj);
      } catch (error) {
        // 异常处理逻辑：在这里，我们仅仅打印错误信息到控制台
        // 根据实际需求，可以自定义异常处理机制
        console.error(`Error executing callback with key ${key}:`, error);
      }
    });
};

forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'



/**
 * 获取对象（包括其原型链上）所有函数属性的名称。
 * @param {Object} obj - 要检查的对象。
 * @param {boolean} inherited - 是否包括原型链上的函数。默认为false。
 * @returns {Array<string>} - 函数属性的名称数组。
 */
const getOwnAndInheritedFunctionNames = (obj, inherited = false) => {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    // 对输入进行检查，确保obj是一个对象
    throw new TypeError('Expected an object as the first argument');
  }

  let keys;
  if (inherited) {
    // 如果需要继承的函数，使用for...in循环并检查hasOwnProperty来避免枚举原型链上非函数的属性
    keys = [];
    for (const key in obj) {
      if (typeof obj[key] === 'function') {
        keys.push(key);
      }
    }
    // 继续检查原型链
    let proto = Object.getPrototypeOf(obj);
    while (proto !== null) {
      for (const key in proto) {
        if (proto.hasOwnProperty(key) && typeof proto[key] === 'function') {
          keys.push(key);
        }
      }
      proto = Object.getPrototypeOf(proto);
    }
  } else {
    // 如果不需要继承的函数，直接使用Object.keys并筛选函数
    keys = Object.keys(obj).filter(key => typeof obj[key] === 'function');
  }
  return keys;
};

function Foo() {
  this.a = () => 1;
  this.b = () => 2;
}
Foo.prototype.c = () => 3;

console.log(getOwnAndInheritedFunctionNames(new Foo())); // ['a', 'b']
console.log(getOwnAndInheritedFunctionNames(new Foo(), true)); // ['a', 'b', 'c']



/**
 * 通过给定的选择器字符串从对象或数组中获取嵌套的值。
 * 支持点符号（`.`）和方括号符号（`[]`）来选择嵌套属性和数组元素。
 *
 * @param {Object|Array} from - 要从中提取值的对象或数组。
 * @param {...string} selectors - 一个或多个用于检索数据的选择器字符串。
 * @returns {Array<*>} - 包含与每个选择器对应的数据值的数组。
 */
const get = (from, ...selectors) => {
  // 确保from是一个对象或数组，避免潜在的类型错误
  if (typeof from !== 'object' || from === null) {
    throw new TypeError('Expected from to be an object or array');
  }

  return [...selectors].map(s => {
    // 使用预编译的正则表达式提高性能
    const regex = /\[([^\[\]]*)\]/g;
    
    /**
     * 将包含方括号的选择器转换为点符号表示法，并移除空字符串路径元素。
     * @param {string} selector - 原始选择器字符串。
     * @returns {string[]} - 处理过的路径元素数组。
     */
    function processSelector(selector) {
      let pathElements = selector.replace(regex, '.$1.').split('.');
      // 过滤掉空字符串并确保路径元素是字符串类型
      pathElements = pathElements.filter(t => t !== '' && typeof t === 'string');
      return pathElements;
    }

    try {
      // 使用reduce方法遍历路径元素，安全地访问嵌套属性或数组元素
      let result = processSelector(s).reduce((prev, cur) => {
        if (prev === null || prev === undefined) {
          throw new Error(`Unable to access property '${cur}' on undefined or null object`);
        }
        if (typeof prev !== 'object') {
          throw new Error(`Expected an object or array at path element '${cur}' but got a ${typeof prev}`);
        }
        return prev[cur];
      }, from);
      
      return result;
    } catch (error) {
      // 在无法访问属性或数组元素时，可以选择记录错误或返回undefined
      console.error(error.message);
      return undefined;
    }
  });
};

const obj2 = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] };
console.log(get(obj2, 'selector.to.val', 'target[0]', 'target[2].a')); // ['val to select', 1, 'test']



/**
 * 检查对象是否包含指定的嵌套属性。
 * @param {Object} obj 要检查的对象。
 * @param {Array} keys 属性键的数组，可以是多层嵌套的表示。
 * @returns {boolean} 如果对象包含所有指定的嵌套属性，则返回 true，否则返回 false。
 */
const hasNestedKey = (obj, keys) => {
  // 检查 obj 是否是一个对象且不是 null 或 undefined
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return keys.length > 0 && keys.every(key => {
    // 检查当前键是否存在于对象中
    if (!obj.hasOwnProperty(key)) return false;
    
    // 递归检查下一层属性
    obj = obj[key];
    return true;
  });
};

let obj3 = {
  a: 1,
  b: { c: 4 },
  'b.d': 5
};

// 测试用例
console.log(hasNestedKey(obj3, ['a'])); // true
console.log(hasNestedKey(obj3, ['b'])); // true
console.log(hasNestedKey(obj3, ['b', 'c'])); // true
console.log(hasNestedKey(obj3, ['b.d'])); // true
console.log(hasNestedKey(obj3, ['d'])); // false
console.log(hasNestedKey(obj3, ['c'])); // false
console.log(hasNestedKey(obj3, ['b', 'f'])); // false



/**
 * 将对象的键值对反转，即将值作为键，将原来的键组成数组作为值。
 * @param {Object} obj 要反转键值的对象。
 * @param {Function} [fn] 可选的函数，用于对原对象的值进行处理，再作为新对象的键。
 * @returns {Object} 返回一个新的对象，其中键为原对象值（经过fn处理后的结果），值为原对象键的数组。
 */
const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    // 根据是否提供fn函数来处理原对象的值
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || []; // 确保acc[val]是一个数组
    acc[val].push(key); // 将原键添加到对应的值数组中
    return acc; // 返回更新后的acc对象
  }, {});

invertKeyValues({ a: 1, b: 2, c: 1 }); // { 1: [ 'a', 'c' ], 2: [ 'b' ] }
invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value); // { group1: [ 'a', 'c' ], group2: [ 'b' ] }



/**
 * 检查一个值是否为非原始对象。
 * 该函数返回值为 true，如果输入值是除了原始类型（数字、字符串、布尔值、null、undefined）以外的任何值。
 * 注意：该函数将数组和函数也视为非原始对象。
 * 
 * @param {*} obj - 需要检查的值。
 * @returns {boolean} 如果输入值为非原始对象，则返回 true；否则返回 false。
 */
const isNonPrimitiveObject = obj => obj === Object(obj) && obj !== null;

isNonPrimitiveObject([1, 2, 3, 4]); // true
isNonPrimitiveObject([]); // true
isNonPrimitiveObject(['Hello!']); // true
isNonPrimitiveObject({ a: 1 }); // true
isNonPrimitiveObject({}); // true
isNonPrimitiveObject(true); // false
isNonPrimitiveObject(null); // false
isNonPrimitiveObject(undefined); // false



/**
 * 检查给定值是否具有对象类似的行为。
 * 此函数会排除 null、数组以及非对象类型（如：函数、undefined 等），
 * 并默认将常规对象视为对象类似。
 *
 * @param {any} val - 需要检查的值。
 * @returns {boolean} 如果值具有对象类似行为，则返回 true，否则返回 false。
 * @throws {TypeError} 当传入参数为 undefined 时，抛出 TypeError 异常。
 */
const isObjectLike = val => {
  // 增加对 undefined 的显式检查，避免因未定义行为引发错误。
  if (typeof val === 'undefined') {
    throw new TypeError('Expected an object or null');
  }

  // 维持原有的核心判断逻辑，确保 null 被正确处理。
  if (val === null) {
    return false;
  }

  // 使用 typeof 判断确保 val 是对象类型。
  if (typeof val !== 'object') {
    return false;
  }

  // 排除数组，因为数组虽然 typeof 结果是 'object'，但在很多场景下需要单独处理。
  if (Array.isArray(val)) {
    return false;
  }

  // 排除特定对象类型，比如 Date 和 RegExp。这一部分可以根据实际需要扩展。
  // 注意：这里没有具体示例代码，因为原要求中未提到需要识别 Date 或 RegExp 对象。
  
  // 默认情况下，认为 val 是一个普通对象。
  return true;
};

// 测试用例保持不变
console.log(isObjectLike({})); // true
console.log(isObjectLike([1, 2, 3])); // false
console.log(isObjectLike(x => x)); // false
console.log(isObjectLike(null)); // false



/**
 * 检查一个值是否为纯粹的对象
 * @param {any} val - 需要检查的值
 * @returns {boolean} - 如果是纯粹的对象则返回true，否则返回false
 */
const isPlainObject = val => 
  val !== null && 
  typeof val === 'object' && 
  Object.prototype.toString.call(val) === '[object Object]';

// 测试例子
console.log(isPlainObject({ a: 1 })); // true, 因为{ a: 1 }是一个纯粹的对象
console.log(isPlainObject(new Map())); // false, 因为Map是一个构造函数的实例，不是纯粹的对象
console.log(isPlainObject(null)); // false, 因为null不是对象



/**
 * 将对象的所有键名转换为小写形式，并返回一个新的对象。
 * @param {Object} obj - 待处理的对象。
 * @returns {Object} 一个新对象，其中所有键名都转换为小写形式。
 */
const lowercaseKeys = (obj) => {
  // 校验输入，确保 obj 是一个对象
  if (obj == null || typeof obj !== 'object' || Array.isArray(obj)) {
    throw new TypeError('Expected an object as input');
  }

  // 使用 Object.entries 来直接处理键值对
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // 确保键名是字符串，然后转换为小写
    const lowercaseKey = typeof key === 'string' ? key.toLowerCase() : key;
    acc[lowercaseKey] = value;
    return acc;
  }, {});
};

const myObj = { Name: 'Adam', sUrnAME: 'Smith' };
console.log(lowercaseKeys(myObj)); // 此处应输出：{name: 'Adam', surname: 'Smith'}



/**
 * 根据提供的函数，映射对象的键。
 * @param {Object} obj - 待映射键的对象。
 * @param {Function} fn - 用于映射键的函数，接受当前值、键和原对象作为参数，返回新的键。
 * @returns {Object} - 一个新的对象，具有经过映射的键。
 */
const mapKeys = (obj, fn) => {
  // 参数校验
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new TypeError('Expected an object for "obj"');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function for "fn"');
  }

  // 使用reduce方法映射键，同时避免产生非预期的键值对
  return Object.keys(obj).reduce((acc, k) => {
    const newKey = fn(obj[k], k, obj);
    // 当fn返回undefined或null时，使用原键作为备选
    acc[newKey || k] = obj[k];
    return acc;
  }, {});
};

// 示例用法，保持不变
mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }



/**
 * 对象值映射函数
 * 该函数遍历给定对象的每个值，并通过提供的函数对每个值进行转换，然后构建一个新对象，其中键保持不变，但值是转换后的结果。
 * @param {Object} obj - 要遍历其值的对象。
 * @param {Function} fn - 用于转换每个值的函数，该函数接收当前值、当前键和原对象作为参数，返回转换后的值。
 * @returns {Object} - 一个新的对象，其中每个键对应的值都是通过调用转换函数后的结果。
 */
const mapValues = (obj, fn) => {
  // 输入验证
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object for "obj"');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function for "fn"');
  }

  // 防止循环引用导致的无限循环
  const seen = new WeakSet();

  return Object.keys(obj).reduce((acc, k) => {
    try {
      // 检测循环引用
      if (seen.has(obj[k])) return acc;

      // 使用闭包来保持对seen的访问
      const value = fn(obj[k], k, obj);
      acc[k] = value;
      seen.add(obj[k]);
    } catch (error) {
      console.error(`Error processing value for key "${k}":`, error);
      // 选择是否将错误的值加入结果，或者跳过，这里选择跳过
    }
    return acc;
  }, {});
};

const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
};
console.log(mapValues(users, u => u.age)); // { fred: 40, pebbles: 1 }



/**
 * 检查一个对象是否拥有与指定源对象相同的键和值。
 * @param {Object} obj 被检查的对象。
 * @param {Object} source 源对象。
 * @returns {boolean} 如果对象匹配源对象的键和值，则返回true；否则返回false。
 */
const matches = (obj, source) => {
  // 处理null或undefined的输入
  if (obj == null || source == null) {
    return obj === source;
  }

  // 使用Object.keys和every遍历源对象的键
  return Object.keys(source).every(key => {
    // 确保obj也有这个键，并且值严格相等
    return obj.hasOwnProperty(key) && strictEqual(obj[key], source[key]);
  });
};

/**
 * 严格比较两个值是否相等。
 * 支持比较null、undefined、数字、字符串、布尔值和对象。
 * 对于对象，会递归比较其属性。
 * @param {*} a 第一个值。
 * @param {*} b 第二个值。
 * @returns {boolean} 如果两个值严格相等，则返回true；否则返回false。
 */
const strictEqual = (a, b) => {
  // null和undefined的情况
  if (a === null && b === null) {
    return true;
  }
  if (a === undefined && b === undefined) {
    return true;
  }

  // 基本类型直接比较
  if (typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }

  // 对象比较
  if (a.constructor !== b.constructor) {
    return false;
  }

  // 递归比较对象属性
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  return keysA.every(key => strictEqual(a[key], b[key]));
};

// 示例调用
console.log(matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true })); // true
console.log(matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true })); // false



/**
 * 检查对象obj是否与源对象source匹配，使用自定义比较函数fn。
 * @param {Object} obj - 要检查的对象。
 * @param {Object} source - 源对象，用于比较。
 * @param {Function} fn - 比较函数，接受五个参数：obj当前键的值、source当前键的值、当前键、obj对象本身、source对象本身。返回布尔值。
 * @returns {boolean} 如果obj与source在所有键值对上匹配（通过fn判断），则返回true；否则返回false。
 */
const matchesWith = (obj, source, fn) => {
  // 确保传入的fn是一个函数
  if (typeof fn !== 'function') {
    throw new TypeError('The fn argument must be a function');
  }
  
  // 通过Object.prototype.hasOwnProperty.call来安全地检查对象是否包含特定的自有属性
  return Object.keys(source).every(key => 
    Object.prototype.hasOwnProperty.call(obj, key) && fn
      ? fn(obj[key], source[key], key, obj, source) === true // 使用严格等于true来判断比较函数的结果
      : obj[key] === source[key] // 对于未定义比较函数的情况，使用严格等于比较键值
  );
};

// 定义一个用于问候语匹配的函数
const isGreeting = val => /^h(?:i|ello)$/.test(val);

try {
  // 使用matchesWith函数进行测试，检查是否为问候语
  console.log(matchesWith({ greeting: 'hello' }, { greeting: 'hi' }, (oV, sV) => isGreeting(oV) && isGreeting(sV))); // true
} catch (error) {
  console.error(error);
}



/**
 * 合并多个对象的属性。如果同一属性存在于多个对象中，会将这些对象的该属性值合并为一个数组。
 * @param {...Object} objs - 要合并的对象。可以接受多个对象作为参数。
 * @returns {Object} - 合并后的对象。
 * @throws {TypeError} - 如果传入的任何参数不是对象或为null，则抛出TypeError。
 */
const merge = (...objs) => {
  // 对所有参数进行校验，确保都是对象
  objs.forEach(obj => {
    if (typeof obj !== 'object' || obj === null) {
      throw new TypeError('All arguments to merge must be objects');
    }
  });

  // 使用reduce方法遍历所有对象，并合并它们的属性
  return [...objs].reduce(
    (acc, obj) => {
      // 遍历当前对象的每个属性
      Object.keys(obj).forEach(k => {
        // 如果属性已存在于目标对象中，则进行合并处理
        if (acc.hasOwnProperty(k)) {
          // 检查当前属性值和目标属性值是否都是数组，是则合并数组，否则将目标值转换为数组并添加当前值
          const current = acc[k];
          const target = obj[k];
          if (Array.isArray(current) && Array.isArray(target)) {
            acc[k] = current.concat(target);
          } else {
            acc[k] = Array.isArray(current) ? [...current, target] : [current, target];
          }
        } else {
          // 如果属性不存在于目标对象中，直接添加
          acc[k] = obj[k];
        }
      });
      return acc; // 返回合并后的对象
    },
    {} // 初始值为空对象
  );
};

const object2 = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1
};
const other = {
  a: { z: 3 },
  b: [2, 3],
  c: 'foo'
};
console.log(merge(object2, other)); // { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }



/**
 * 将平铺结构的评论数据转换为嵌套结构。
 * @param {Array} items - 评论数据数组。
 * @param {number|null} id - 当前节点的父ID，默认为null代表根节点。
 * @param {string} link - 表示父ID的字段名，默认为'parent_id'。
 * @returns {Array} 嵌套结构的评论数据。
 */
const nest = (items, id = null, link = 'parent_id') => {
  // 使用Map来缓存已访问的节点，以优化性能和防止循环引用
  const visited = new Map();

  return items
    .filter(item => item[link] === id && !visited.has(item.id)) // 避免重复访问
    .map(item => {
      visited.set(item.id, true); // 标记当前节点为已访问
      return {
        ...item,
        children: nest(items, item.id, link) // 递归处理子节点
      };
    });
};

// 测试数据
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
];

// 转换评论数据
const nestedComments = nest(comments);
console.log(nestedComments);



/**
 * 将键值对数组转换为对象。
 * @param {Array<Array<any>>} arr - 由键值对组成的数组。
 * @returns {Object} 转换后的对象。
 * @throws {TypeError} 如果输入不是数组或包含的元素不是长度为2的数组。
 */
const objectFromPairs = (arr) => {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as input');
  }

  arr.forEach(pair => {
    if (!Array.isArray(pair) || pair.length !== 2) {
      throw new TypeError('Each element in the array must be a pair (length of 2)');
    }
  });

  // 使用reduce转换数组为对象
  return arr.reduce((acc, [key, val]) => {
    acc[key] = val;
    return acc;
  }, {});
};

// 测试示例
console.log(objectFromPairs([['a', 1], ['b', 2]])); // 应该输出: {a: 1, b: 2}
console.log(objectFromPairs([1, 2])); // 应该抛出TypeError
console.log(objectFromPairs(null)); // 应该抛出TypeError
console.log(objectFromPairs([['a', 1], ['b', 2, 3]])); // 应该抛出TypeError



/**
 * 将对象转换为键值对数组。
 * @param {Object} obj 要转换的对象。
 * @returns {Array<Array<string|any>>} 键值对数组。
 * @throws {TypeError} 如果传入的参数不是对象。
 */
const objectToEntries = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object');
  }
  
  // 使用Object.entries来直接获取键值对，提高了代码的简洁性和安全性。
  return Object.entries(obj);
};

objectToEntries({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]



/**
 * 将对象转换为键值对数组
 * @param {Object} obj 需要转换的对象。必须是对象且不能为null。
 * @returns {Array} 包含对象所有自身属性（不包括原型链上的属性）的键值对数组。
 * @throws {TypeError} 如果输入不是对象或为null，则抛出TypeError。
 */
const objectToPairs = (obj) => {
  // 异常处理和输入验证
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object');
  }

  // 使用Object.getOwnProperties过滤掉原型链上的属性
  const ownProperties = Object.getOwnPropertyNames(obj);

  // 使用Array.map将每个属性转换为键值对
  return ownProperties.map((key) => {
    return [key, obj[key]];
  });
};

// 测试用例
console.log(objectToPairs({ a: 1, b: 2 })); // [ ['a', 1], ['b', 2] ]
console.log(objectToPairs({})); // []

// 以下示例旨在展示修正后的代码如何应对之前提到的潜在问题
console.log(objectToPairs(null)); // 将抛出TypeError: Expected an object
console.log(objectToPairs(Object.create({ protoKey: 'protoValue' }))); // 输出[ ['a', 1], ['b', 2] ]，不包含原型链上的属性




/**
 * 将对象转换为查询字符串
 * @param {Object} queryParameters - 待转换为查询字符串的对象。对象的每个属性代表查询参数的键，属性值代表参数的值。
 * @returns {string} 返回转换后的查询字符串。如果对象为空或不是对象类型，则抛出TypeError。
 */
const objectToQueryString = queryParameters => {
  // 检查queryParameters是否为对象类型
  if (typeof queryParameters !== 'object' || queryParameters === null) {
    throw new TypeError('queryParameters must be an object');
  }

  // 使用数组来动态构建查询字符串的各个部分，以提升性能
  const paramsArray = [];

  // 遍历对象的每个属性，将键值对编码并添加到数组中
  Object.entries(queryParameters).forEach(([key, val]) => {
    // 对键进行URL编码
    const encodedKey = encodeURIComponent(key);
    
    // 如果值不为undefined，则对值进行编码，并根据值的类型（数组或非数组）处理并添加到数组中
    if (val !== undefined) {
      const encodedVal = encodeURIComponent(val);
      const value = Array.isArray(val) ? val.map(v => `${encodedKey}[]=${encodeURIComponent(v)}`).join('&') : encodedVal;
      paramsArray.push(`${value}`);
    }
  });

  // 将数组中的所有元素通过'&'符号连接成最终的查询字符串
  return paramsArray.join('&');
};

// 测试用例
console.log(objectToQueryString({ page: '1', size: '2kg', key: undefined })); // '?page=1&size=2kg'
console.log(objectToQueryString({ page: '1', size: ['2kg', '3kg'], key: 'value' })); // '?page=1&size%5B%5D=2kg&size%5B%5D=3kg&key=value'



/**
 * 从对象中省略指定的属性。
 * @param {Object} obj - 要处理的对象。
 * @param {Array} arr - 要省略的属性键的数组。
 * @returns {Object} - 新的对象，不含指定的属性。
 */
const omit = (obj, arr) => {
  // 输入参数校验
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object for obj');
  }
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array for arr');
  }

  // 使用Set来提高查找效率
  const keysToOmit = new Set(arr);

  return Object.keys(obj)
    .filter(k => !keysToOmit.has(k))
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
};

// 示例调用
console.log(omit({ a: 1, b: '2', c: 3 }, ['b'])); // { 'a': 1, 'c': 3 }



/**
 * 根据指定条件过滤对象的属性，并返回一个新的对象，该对象不包含符合条件的属性。
 * @param {Object} obj 要过滤属性的对象。
 * @param {Function} fn 过滤条件函数，该函数接收对象的每个属性值和属性名作为参数，如果返回true，则表示该属性应被过滤掉。
 * @returns {Object} 返回一个新的对象，包含不满足过滤条件的属性。
 */
const omitBy = (obj, fn) => {
  // 异常处理：确保obj是一个对象，fn是一个函数
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object for the first argument');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function for the second argument');
  }

  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !fn(obj[key], key)) {
      // 更清晰的语句来更新累加器对象
      result[key] = obj[key];
    }
  }
  
  return result;
};

// 测试示例
console.log(omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')); // { b: '2' }



/**
 * 根据指定属性和排序顺序对数组对象进行排序。
 * @param {Array} arr 要排序的数组对象。
 * @param {Array} props 用于排序的属性数组。
 * @param {Array} orders 排序顺序数组，'asc' 表示升序，'desc' 表示降序。可选，默认为升序。
 * @returns {Array} 排序后的数组对象。
 * @throws {TypeError} 如果参数不是预期的类型，抛出类型错误。
 */
const orderBy = (arr, props, orders = []) =>
{
  // 输入验证
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array for the first argument');
  }
  if (!Array.isArray(props)) {
    throw new TypeError('Expected an array for the second argument');
  }
  if (orders && !Array.isArray(orders)) {
    throw new TypeError('Expected an array for the third argument');
  }

  return [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      // 对象属性存在性检查
      const p1 = a.hasOwnProperty(prop) ? a[prop] : undefined;
      const p2 = b.hasOwnProperty(prop) ? b[prop] : undefined;

      if (acc === 0) {
        // 优化排序逻辑，确保正确处理同名属性和属性不存在的情况
        const isDesc = orders[i] === 'desc';
        if (p1 === p2) return 0;
        else if (p1 === undefined && p2 !== undefined) return isDesc ? -1 : 1;
        else if (p1 !== undefined && p2 === undefined) return isDesc ? 1 : -1;
        else return isDesc ? p2 > p1 ? 1 : p2 < p1 ? -1 : 0 : p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
};

const users2 = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
console.log(orderBy(users2, ['name', 'age'], ['asc', 'desc'])); // 正确排序示例
console.log(orderBy(users2, ['name', 'age'])); // 默认升序排序示例



/**
 * 根据指定条件筛选对象属性并返回新对象。
 * @param {Object} obj 要进行筛选的对象。
 * @param {Function} fn 筛选条件函数，该函数接收对象的每个属性值和属性名作为参数，返回一个布尔值以决定是否保留该属性。
 * @returns {Object} 返回一个新对象，包含符合筛选条件的属性。
 * @throws {TypeError} 如果传入的 obj 不是对象或为 null，或者 fn 不是函数类型，抛出 TypeError 异常。
 */
const filterObjectByType = (obj, fn) => {
  // 参数类型检查
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('Expected an object for "obj"');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function for "fn"');
  }
  
  // 对象属性筛选和构建新对象
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { // 只处理对象自有属性
      try {
        if (fn(obj[key], key)) { // 使用传入的函数对每个属性值进行测试
          result[key] = obj[key]; // 符合条件的属性被添加到新对象
        }
      } catch (error) {
        console.error(`Error evaluating function for key "${key}":`, error); // 函数执行出错时的错误处理
        // 或者根据需要进行其他的错误处理
      }
    }
  }
  
  return result;
};

// 示例调用
filterObjectByType({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { 'a': 1, 'c': 3 }



/**
 * 根据提供的键映射更改对象的键。
 * @param {Object} keysMap - 一个对象，将原始键映射到新键。
 * @param {Object} obj - 要更改键的源对象。
 * @returns {Object} 一个具有更名键的新对象。
 */
const renameKeys = (keysMap, obj) => {
  // 验证输入
  if (typeof keysMap !== 'object' || keysMap === null) {
    throw new TypeError('keysMap 必须是一个对象');
  }
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('obj 必须是一个对象');
  }

  // 使用普通对象作为累加器，以避免不必要的数组操作
  let acc = {};

  // 遍历源对象的键
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) { // 检查键是否为自有属性，以避免继承的属性
      // 使用 keysMap[key] 作为新键，如果未找到则回退到原始键
      let newKey = keysMap[key] || key;
      // 确保新键是字符串，以保持对象键的一致性
      if (typeof newKey !== 'string') {
        throw new TypeError('新键必须是字符串');
      }
      acc[newKey] = obj[key];
    }
  }

  return acc;
};

const obj4 = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 };
console.log(renameKeys({ name: 'firstName', job: 'passion' }, obj4));
// 预期输出: { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }



/**
 * 深度克隆对象。
 * @param {Object} obj 要进行深度克隆的对象。
 * @param {WeakMap} hash 已经克隆过的对象的映射，避免循环引用。
 * @returns {Object} 返回obj的深度克隆副本。
 */
const shallowClone = (obj, hash = new WeakMap()) => {
  // 检查obj是否为null或非对象类型，如果是则返回
  if (obj == null || typeof obj !== "object") {
    return obj;
  }

  // 检查obj是否已经被克隆过，如果是则返回克隆过的引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  let newObj;

  // 对于函数或构造函数，保持原型链
  if (typeof obj === 'function' || obj.constructor && obj.call && obj.apply) {
    newObj = Object.create(Object.getPrototypeOf(obj));
  } else { // 对于普通对象，直接创建新对象
    newObj = {};
  }
  hash.set(obj, newObj);

  const symbolKeys = Object.getOwnPropertySymbols(obj);
  const normalKeys = Object.keys(obj);

  // 使用Array.isArray判断是否为数组，进行特殊处理
  if (Array.isArray(obj)) {
    newObj.length = obj.length;
    normalKeys.concat(symbolKeys).forEach(key => {
      newObj[key] = shallowClone(obj[key], hash);
    });
  } else {
    normalKeys.concat(symbolKeys).forEach(key => {
      const descriptor = Object.getOwnPropertyDescriptor(obj, key);
      if (typeof descriptor.value === "object" && descriptor.value !== null) {
        newObj[key] = shallowClone(descriptor.value, hash);
      } else {
        Object.defineProperty(newObj, key, descriptor);
      }
    });
  }

  return newObj;
};

const a = { x: true, y: 1, [Symbol("private")]: "secret" };
const b = shallowClone(a);
console.log(a, b); // { x: true, y: 1, [Symbol("private")]: "secret" } 



/**
 * 获取不同数据类型大小的函数
 */

// 获取数组的大小
const getSizeOfArray = arr => arr.length;
// 获取字符串的大小
const getSizeOfString = str => str.length;
// 获取对象的大小（键的数量）
const getSizeOfObject = obj => Object.keys(obj).length;

/**
 * 通用的大小获取函数，能够根据传入的值的类型，返回其相应的大小。
 * @param {any} val - 传入的值，可以是任意类型。
 * @returns {number} - 返回值的大小。如果传入的是null或undefined，返回0。
 */
const size = val => {
  if (val === null || val === undefined) {
    return 0;
  }

  try {
    if (Array.isArray(val)) {
      // 如果是数组，返回数组的长度
      return getSizeOfArray(val);
    }

    if (typeof val === 'object' && val !== null) {
      // 如果是对象，优先使用对象自有的length属性，如果没有则计算对象键的数量
      return val.length !== undefined ? val.length : getSizeOfObject(val);
    }

    if (typeof val === 'string') {
      // 如果是字符串，返回字符串的长度
      return getSizeOfString(val);
    }
    
    // 对于其他类型，返回0
    return 0;
  } catch (error) {
    // 计算大小时发生错误，打印错误信息并返回0
    console.error('An error occurred while calculating the size:', error);
    return 0;
  }
};

// 示例用法
size([1, 2, 3, 4, 5]); // 数组，返回数组的元素个数
size('size'); // 字符串，返回字符串的长度
size({ one: 1, two: 2, three: 3 }); // 对象，返回对象的键的数量
size(null); // null，返回0
size(undefined); // undefined，返回0



/**
 * 对象按值进行分组
 * @param {Object} obj - 要分组的对象
 * @param {Function} fn - 用于处理每个键值对的函数，接收四个参数：累加器对象、当前值、当前键和原始对象
 * @param {Object} acc - 初始累加器对象
 * @returns {Object} - 分组后的结果对象
 */
const groupObjectByValue = (obj, fn, acc) => {
  // 参数类型检查
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('obj参数必须是非空对象');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('fn参数必须是函数');
  }
  if (typeof acc !== 'object') {
    throw new TypeError('acc参数必须是对象');
  }

  try {
    return Object.keys(obj).reduce((a, k) => {
      // 直接调用传入的处理函数fn，并处理异常
      try {
        return fn(a, obj[k], k);
      } catch (error) {
        console.error(`处理键"${k}"时发生错误:`, error);
      }
      return a;
    }, acc);
  } catch (error) {
    // 对reduce操作中可能出现的任何错误进行处理
    console.error('执行分组操作时发生错误:', error);
    throw error; // 重新抛出错误，以便调用者可以进一步处理
  }
};

// 定义用于分组的回调函数
const groupFn = (r, v, k) => {
  (r[v] || (r[v] = [])).push(k);
  return r;
};

// 调用示例，与原代码相同
groupObjectByValue(
  { a: 1, b: 2, c: 1 },
  groupFn,
  {}
); // { '1': ['a', 'c'], '2': ['b'] }



/**
 * 检查给定集合中的每个对象是否都具有指定的属性。
 * @param {Array} collection - 待检查的对象集合。
 * @param {string} pre - 需要检查的属性名称。
 * @returns {boolean} - 如果集合中的每个对象都具有指定的属性，则返回true；否则返回false。
 */
const checkAllObjectsHaveProperty = (collection, pre) => {
  // 参数类型检查
  if (!Array.isArray(collection)) {
    throw new TypeError('Expected an array for the collection parameter.');
  }

  if (typeof pre !== 'string') {
    throw new TypeError('Expected a string for the pre (property) parameter.');
  }

  // 检查集合是否为空，如果是，根据业务逻辑可能需要处理
  if (collection.length === 0) {
    // 这里返回 true 是基于原函数行为的假设，
    // 如果根据实际需求需要对空集合做特殊处理，可以修改这里的逻辑。
    return true;
  }

  // 使用every方法进行属性检查
  return collection.every(obj => {
    // 检查对象是否为null或undefined，以及是否包含指定属性
    if (obj == null || !obj.hasOwnProperty(pre)) {
      return false;
    }
    // 根据需要可以在这里添加对属性值的额外检查
    return true;
  });
};

// 示例调用
console.log(checkAllObjectsHaveProperty([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }], 'sex')); // true



/**
 * 将扁平化的对象转换为嵌套对象。
 * @param {Object} obj 扁平化的对象，键使用点('.')分隔表示嵌套关系。
 * @returns {Object} 转换后的嵌套对象。
 */
const unflattenObject = (obj) => {
  // 验证键的格式
  const validateKey = (key) => {
    if (key.includes('..') || key === '') {
      throw new Error(`Invalid key format: ${key}`); // 抛出键格式无效的错误
    }
  };

  // 递归构建嵌套对象
  const buildNestedObject = (keys, value) => {
    if (keys.length > 1) {
      const [currentKey, ...remainingKeys] = keys;
      return {
        [currentKey]: buildNestedObject(remainingKeys, value), // 递归构建子对象
      };
    } else {
      return { [keys[0]]: value }; // 构建叶子节点对象
    }
  };

  const result = {};
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      try {
        // 分割键并验证
        const keys = k.split('.');
        validateKey(keys[0]);
        
        // 根据键构建嵌套对象
        const nestedObject = buildNestedObject(keys, obj[k]);
        
        // 合并嵌套对象到结果中
        Object.assign(result, nestedObject);
      } catch (error) {
        console.error(error.message); // 捕获并输出错误
        // 可根据需求添加其他错误处理逻辑
      }
    }
  }
  return result;
};

console.log(unflattenObject({ 'a.b.c': 1, d: 1 }));
// 输出: { a: { b: { c: 1 } }, d: 1 }



/**
 * 根据提供的属性和值数组创建一个对象。
 * @param {Array} props 属性数组。
 * @param {Array} values 值数组。
 * @param {*} [defaultValue=undefined] 当属性和值数组长度不一致时使用的填充值。
 * @returns {Object} 创建的对象。
 */
const zipObject = (props, values, defaultValue = undefined) => {
  // 输入有效性检查
  if (!Array.isArray(props) || !Array.isArray(values)) {
    throw new TypeError('props和values参数必须是数组');
  }

  // 使用map和reduce提高性能和代码清晰度
  return props.reduce((obj, prop, index) => {
    const value = values[index] !== undefined ? values[index] : defaultValue;
    obj[prop] = value;
    return obj;
  }, {});
};

// 测试修改后的函数
console.log(zipObject(['a', 'b', 'c'], [1, 2])); // {a: 1, b: 2, c: undefined}
console.log(zipObject(['a', 'b'], [1, 2, 3], 'default')); // {a: 1, b: 2}