# dcFunction 文档

## 概述

dcFunction 是一个功能强大的函数工具类，提供了丰富的函数操作和增强功能，包括函数防抖、节流、柯里化、组合、记忆化、重试等多种实用功能，以及一些DOM操作和数据处理工具。

## 功能特性

- 函数防抖和节流
- 函数柯里化和组合
- 函数记忆化
- 函数重试和超时
- 函数并发限制
- 函数重载和装饰器
- 异步函数串行和并行执行
- DOM操作工具
- 数据处理工具

## 方法

### 函数增强方法

#### debounce(fn, delay, immediate = false)

函数防抖，延迟执行函数，在指定时间内多次调用只执行最后一次。

**参数**:
- `fn` (Function): 要执行的函数
- `delay` (Number): 延迟时间（毫秒）
- `immediate` (Boolean): 是否立即执行

**返回值**: Function - 防抖后的函数

#### throttle(fn, delay)

函数节流，限制函数执行频率，在指定时间内只执行一次。

**参数**:
- `fn` (Function): 要执行的函数
- `delay` (Number): 延迟时间（毫秒）

**返回值**: Function - 节流后的函数

#### curry(fn)

函数柯里化，将多参数函数转换为一系列单参数函数。

**参数**:
- `fn` (Function): 要柯里化的函数

**返回值**: Function - 柯里化后的函数

#### compose(...fns)

函数组合，从右到左组合多个函数。

**参数**:
- `...fns` (Function[]): 要组合的函数

**返回值**: Function - 组合后的函数

#### pipe(...fns)

函数管道，从左到右组合多个函数。

**参数**:
- `...fns` (Function[]): 要管道化的函数

**返回值**: Function - 管道化后的函数

#### memoize(fn, resolver)

函数记忆化，缓存函数执行结果，避免重复计算。

**参数**:
- `fn` (Function): 要记忆化的函数
- `resolver` (Function): 缓存键生成函数

**返回值**: Function - 记忆化后的函数

#### retry(fn, times = 3, delay = 300)

函数重试，在函数执行失败时自动重试。

**参数**:
- `fn` (Function): 要重试的函数
- `times` (Number): 重试次数
- `delay` (Number): 重试延迟（毫秒）

**返回值**: Function - 包装后的函数

#### timeout(fn, timeout)

函数超时，在指定时间内未完成则抛出错误。

**参数**:
- `fn` (Function): 要包装的函数
- `timeout` (Number): 超时时间（毫秒）

**返回值**: Function - 包装后的函数

#### retryUntil(fn, interval = 1000, timeout = 0)

函数重试直到成功，在函数执行失败时持续重试。

**参数**:
- `fn` (Function): 要重试的函数
- `interval` (Number): 重试间隔（毫秒）
- `timeout` (Number): 超时时间（毫秒）

**返回值**: Promise - Promise对象

#### limitConcurrency(fn, limit)

函数限制并发，限制函数的并发执行数量。

**参数**:
- `fn` (Function): 要限制的函数
- `limit` (Number): 并发限制数

**返回值**: Function - 限制后的函数

#### overload()

函数重载，根据参数类型选择不同的实现。

**返回值**: Object - 重载函数对象，包含addImpl和implementation方法

#### decorate(fn, ...decorators)

函数装饰器，使用多个装饰器装饰函数。

**参数**:
- `fn` (Function): 要装饰的函数
- `...decorators` (Function[]): 装饰器函数

**返回值**: Function - 装饰后的函数

#### series(...fns)

异步函数串行执行，按顺序执行多个异步函数。

**参数**:
- `...fns` (Function[]): 要执行的异步函数

**返回值**: Function - 包装后的函数

#### parallel(...fns)

异步函数并行执行，同时执行多个异步函数。

**参数**:
- `...fns` (Function[]): 要执行的异步函数

**返回值**: Function - 包装后的函数

#### once(fn)

创建一个只执行一次的函数，后续调用返回第一次的执行结果。

**参数**:
- `fn` (Function): 要包装的函数

**返回值**: Function - 包装后的函数

#### delay(fn, delay, ...args)

延迟执行函数，在指定时间后执行函数。

**参数**:
- `fn` (Function): 要延迟的函数
- `delay` (Number): 延迟时间（毫秒）
- `...args` (*[]): 函数参数

**返回值**: Promise - Promise对象

#### measure(fn)

函数执行时间测量，测量函数执行时间并输出日志。

**参数**:
- `fn` (Function): 要测量的函数

**返回值**: Function - 包装后的函数

### 实用工具方法

#### elo(ratings, kFactor = 32, selfRating)

计算ELO等级分，用于排名系统。

**参数**:
- `ratings` (Number[]): 等级分数组
- `kFactor` (Number): K因子（默认32）
- `selfRating` (Number): 自身等级分（可选）

**返回值**: Number[] - 更新后的等级分数组

#### escapeHTML(str)

转义HTML特殊字符，防止XSS攻击。

**参数**:
- `str` (String): 要转义的字符串

**返回值**: String - 转义后的字符串

#### hasFlags(...flags)

检查命令行参数中是否包含指定的标志。

**参数**:
- `...flags` (String[]): 要检查的标志

**返回值**: Boolean - 如果包含任一标志则返回true

#### renderDataList(data, container, template)

使用模板渲染数据列表。

**参数**:
- `data` (Array): 要渲染的数据数组
- `container` (String|Element): 容器元素或选择器
- `template` (Function): 渲染模板函数

#### renderElement(config, container)

根据配置渲染DOM元素。

**参数**:
- `config` (Object): 元素配置
  - `type` (String|Function): 元素类型或组件函数
  - `props` (Object): 元素属性
- `container` (Element): 容器元素

**返回值**: Element - 渲染的元素

#### insertBefore(el, htmlString)

在指定元素之前插入HTML。

**参数**:
- `el` (Element): 目标元素
- `htmlString` (String): 要插入的HTML字符串

## 使用示例

### 函数防抖和节流

```javascript
// 防抖函数示例
const debouncedFunction = DC.Function.debounce(() => {
  console.log('防抖函数执行');
}, 1000);

// 节流函数示例
const throttledFunction = DC.Function.throttle(() => {
  console.log('节流函数执行');
}, 1000);

// 使用示例
window.addEventListener('scroll', () => {
  debouncedFunction(); // 滚动结束后1秒执行
  throttledFunction(); // 每1秒最多执行一次
});
```

### 函数柯里化和组合

```javascript
// 柯里化函数示例
const add = DC.Function.curry((a, b, c) => a + b + c);
const add5 = add(5);
const add5And3 = add5(3);
console.log(add5And3(2)); // 输出: 10

// 函数组合示例
const double = x => x * 2;
const square = x => x * x;
const doubleThenSquare = DC.Function.compose(square, double);
console.log(doubleThenSquare(5)); // 输出: 100

// 函数管道示例
const squareThenDouble = DC.Function.pipe(square, double);
console.log(squareThenDouble(5)); // 输出: 50
```

### 函数记忆化

```javascript
// 记忆化函数示例
const fibonacci = DC.Function.memoize(n => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// 第一次计算会较慢
console.log(fibonacci(40)); // 输出: 102334155

// 第二次计算会很快（从缓存中获取）
console.log(fibonacci(40)); // 输出: 102334155
```

### 函数重试和超时

```javascript
// 重试函数示例
const fetchData = DC.Function.retry(async () => {
  const response = await fetch('https://api.example.com/data');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}, 3, 1000);

// 超时函数示例
const fetchWithTimeout = DC.Function.timeout(fetchData, 5000);

// 使用示例
fetchWithTimeout()
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error));
```

### 异步函数执行

```javascript
// 异步函数串行执行
const asyncFn1 = () => Promise.resolve(1);
const asyncFn2 = (x) => Promise.resolve(x * 2);
const asyncFn3 = (x) => Promise.resolve(x + 3);

const serialFn = DC.Function.series(asyncFn1, asyncFn2, asyncFn3);
serialFn().then(result => console.log('Serial result:', result)); // 输出: 5

// 异步函数并行执行
const parallelFn = DC.Function.parallel(asyncFn1, asyncFn2.bind(null, 2), asyncFn3.bind(null, 3));
parallelFn().then(results => console.log('Parallel results:', results)); // 输出: [1, 4, 6]
```

### 函数重载

```javascript
// 函数重载示例
const calculator = DC.Function.overload()
  .addImpl((a, b) => a + b, 'number', 'number')
  .addImpl((str1, str2) => str1 + str2, 'string', 'string')
  .addImpl((arr1, arr2) => [...arr1, ...arr2], 'array', 'array');

console.log(calculator.implementation(1, 2)); // 输出: 3
console.log(calculator.implementation('Hello', ' World')); // 输出: Hello World
console.log(calculator.implementation([1, 2], [3, 4])); // 输出: [1, 2, 3, 4]
```

### DOM操作工具

```javascript
// 渲染数据列表
const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

DC.Function.renderDataList(
  data,
  '#list-container',
  item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    return li;
  }
);

// 渲染元素
DC.Function.renderElement(
  {
    type: 'div',
    props: {
      className: 'container',
      children: [
        {
          type: 'h1',
          props: {
            nodeValue: 'Hello DCJS'
          }
        },
        {
          type: 'button',
          props: {
            nodeValue: 'Click Me',
            onClick: () => console.log('Button clicked')
          }
        }
      ]
    }
  },
  document.getElementById('app')
);
```

## 注意事项

1. 函数防抖和节流适用于处理频繁触发的事件，如滚动、 resize、输入等
2. 函数记忆化适用于计算密集型函数，缓存结果提高性能
3. 函数重试和超时适用于网络请求等可能失败的操作
4. 函数并发限制适用于控制并发请求数量，避免请求过多导致服务器压力
5. 异步函数执行方法适用于处理多个异步操作的执行顺序
6. DOM操作方法需要在浏览器环境中使用

## 浏览器兼容性

- 现代浏览器（Chrome, Firefox, Safari, Edge）
- Node.js 环境

## 错误处理

- 大部分方法会对参数进行类型检查，抛出相应的错误信息
- 异步方法会返回Promise，应使用try/catch或.catch()方法捕获错误
- 函数重载在找不到匹配的实现时会抛出错误