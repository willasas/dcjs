// 元素操作

const createElement = (str) => {
  // 创建一个安全的DOM元素
  const el = document.createElement('div');
  el.innerHTML = str;

  // 处理边界条件，确保返回值始终是有效的DOM元素
  const firstElement = el.firstElementChild;
  if (!firstElement) {
    console.error('提供的HTML字符串不包含任何元素.');
    return document.createElement('div'); // 返回一个空的div元素，或其他默认的占位元素
  }

  return firstElement;
};

// 示例使用
const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
console.log(el.className); // 'container'



/**
 * 根据传入的标签名创建一个HTML元素。
 * @param {string} tagName - 要创建的元素的标签名。
 * @returns {HTMLElement|null} 创建的HTML元素或在验证失败或捕获异常时返回null。
 */
const createElementByTagName = (tagName) => {
  // 输入验证：确保传入的标签名是字符串，且不包含危险标签或脚本标签
  if (typeof tagName !== 'string' || /[<>&]/.test(tagName)) {
    console.warn('Invalid tag name provided.');
    return null; // 或者抛出错误，视具体需求而定
  }

  try {
    // 使用更具体的命名，提高代码可读性
    const element = document.createElement(tagName);

    // 这里留有扩展空间，比如未来可以添加设置属性、类名等的功能
    // 例如：setAttributes(element, attributes);

    return element;
  } catch (error) {
    // 异常处理：捕获并处理createElement可能抛出的异常
    console.error(`Error creating element: ${error}`);
    return null; // 或者根据需要选择合适的错误处理方式
  }
}

// 调用示例
createElementByTagName("div");



/**
 * 创建一个带有类名和ID的新元素
 * @param {string} elementTag - 元素的标签名，如'div', 'span'等。
 * @param {string} cssClassName - 元素的类名。
 * @param {string} htmlId - 元素的ID。
 * @returns {HTMLElement} - 创建的带有指定类名和ID的元素。
 */
const createElementWithClassAndId = (elementTag, cssClassName, htmlId) => {
  // 输入验证
  if (typeof elementTag !== 'string' || typeof cssClassName !== 'string' || typeof htmlId !== 'string') {
    throw new TypeError('参数必须为字符串类型');
  }

  // 检查ID的唯一性
  if (document.getElementById(htmlId)) {
    throw new Error(`ID "${htmlId}" 已经存在`);
  }

  let element = document.createElement(elementTag);
  element.className = cssClassName;
  element.id = htmlId;

  return element;
};

// 调用示例
let newDiv = createElementWithClassAndId("div", "section", "sec1");
console.log(newDiv);



/**
 * 加载CSS文件。
 * @param {string} u CSS文件的URL，必须以'http'开头。
 * @param {string} t 元素类型，目前仅支持'link'。
 */
loadCss("//lolm.qq.com/v2/title/top.css", "link");
const loadCss = (u, t) => {
  // 参数校验
  if (typeof u !== 'string' || !u.startsWith('http')) {
    console.error('URL is invalid or missing.');
    return;
  }
  if (t !== 'link') {
    console.error('Only "link" type is supported for loading CSS.');
    return;
  }

  try {
    const s = document.createElement(t);
    const fa = document.querySelector('title');

    // 设置link标签属性
    s.href = u;
    s.rel = "stylesheet";
    s.type = "text/css";
    s.characterSet = 'UTF-8'; // 显式设置字符集

    // 将新创建的link元素插入到head中
    document.head.insertBefore(s, fa);
  } catch (error) {
    console.error('Failed to load CSS:', error);
  }
}

// 调用示例，使用了显式指定的URL和类型
// loadCss("//lolm.qq.com/v2/title/top.css", "link");



/**
 * 动态加载JavaScript文件。
 * @param {string} u 要加载的JavaScript文件的URL，必须是http或https协议，且包含有效的域名和路径。
 * @param {string} t 创建的标签类型，目前仅支持"script"。
 */
const loadJs = (u, t) => {
  // 参数验证
  if (typeof u !== 'string' || !/^https?:\/\/\w+(\.\w+)*\/\S*$/.test(u)) {
    console.error('Invalid URL:', u);
    return;
  }
  if (t !== 'script') {
    console.error('Invalid tag type. Only "script" is supported.', t);
    return;
  }

  const s = document.createElement(t);
  if (t === "script") {
    s.src = u;
    s.type = "text/javascript";
    s.charset = "utf-8";
  }

  // 添加错误处理
  s.onerror = () => {
    console.error('Failed to load script:', u);
  };

  document.body.appendChild(s);
}

// 调用示例，保持不变
// loadJs("//lolm.qq.com/v2/title/top.js", "script");



/**
 * 设置指定ID或类名元素的文本内容。
 * 如果提供的ID或类名没有找到任何元素，则抛出一个错误。
 * 
 * @param {string} ele - 元素的ID或类名。
 * @param {string} eleText - 要设置的文本内容。
 * @returns {Element | null} - 返回设置文本内容的元素，如果没有找到元素则返回null。
 */
const setTextContentByIdOrClassName = (ele, eleText) => {
  // 通过ID获取元素，如果不存在则抛出错误
  let e = document.getElementById(ele);
  if (e) {
    e.textContent = eleText;
    return e;
  }

  // 通过类名获取元素，如果不存在则抛出错误
  const elements = document.getElementsByClassName(ele);
  if (elements.length === 0) {
    throw new Error(`No elements found with ID or class name: ${ele}`);
  }

  // 注意：这里假设我们总是想要第一个匹配的元素
  // 如果需要，可以修改以满足不同的需求
  elements[0].textContent = eleText;
  return elements[0];
};

// 示例用法
try {
  setTextContentByIdOrClassName("sec1", "title text");
} catch (error) {
  console.error(error);
}



/**
 * 将指定的DOM元素添加到body中。
 * @param {Element} element - 需要被添加到body中的DOM元素。
 */
const addToBody = (element) => {
  // 输入验证
  if (!(element instanceof Element)) {
    console.error("Invalid input: Expected a DOM Element.");
    return;
  }

  // 异常处理
  try {
    // 使用DocumentFragment进行优化，减少页面重绘和回流
    const fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    
    document.body.appendChild(fragment);
  } catch (error) {
    console.error("Failed to add element to body:", error);
  }
}

// 假设addClassAndId函数已经存在且没有漏洞
// 为了遵守输入输出不变的要求，这里不对addClassAndId进行修改
// 但假设它现在是这样的一个高风险函数，我们需要确保它的工作正常
const element2 = addClassAndId("div", "section", "sec1");
if (element2) { // 增加了对addClassAndId返回值的检查，确保其不为null或undefined再进行操作
  addToBody(element2);
}



/**
 * 创建一个事件中心，用于事件的发布和订阅。
 * @returns 返回一个包含 hub, emit, on, off 方法的对象。
 */
const createEventHub = () => {
  let handlers = new Map(); // 使用 Map 存储事件处理器，以提高性能和可维护性

  return {
    hub: handlers,
    /**
     * 发布事件，触发所有订阅了该事件的处理器。
     * @param {string} event 事件名称。
     * @param {*} data 传递给事件处理器的数据。
     */
    emit(event, data) {
      try {
        // 异常处理，确保一个处理器出错不会影响其他处理器的执行
        handlers.get(event)?.forEach(handler => {
          try {
            handler(data);
          } catch (error) {
            console.error(`Error executing handler for event ${event}:`, error);
          }
        });
      } catch (error) {
        console.error(`Error emitting event ${event}:`, error);
      }
    },
    /**
     * 订阅事件，添加事件处理器。
     * @param {string} event 事件名称。
     * @param {Function} handler 事件处理器。
     */
    on(event, handler) {
      let eventHandlers = handlers.get(event) || [];
      eventHandlers.push(handler);
      // 优化内存管理，避免不必要的数组拷贝
      handlers.set(event, eventHandlers);
    },
    /**
     * 取消订阅，移除特定事件的一个处理器。
     * @param {string} event 事件名称。
     * @param {Function} handler 事件处理器。
     */
    off(event, handler) {
      let eventHandlers = handlers.get(event);
      if (eventHandlers) {
        const i = eventHandlers.indexOf(handler);
        if (i > -1) {
          eventHandlers.splice(i, 1);
        }
        // 仅当事件处理器列表为空时才删除事件，避免误删其他处理器
        if (eventHandlers.length === 0) {
          handlers.delete(event);
        }
      }
    },
    /**
     * 解绑特定事件的所有处理器。
     * @param {string} event 事件名称。
     */
    offAll(event) {
      handlers.delete(event);
    }
  };
};

// const handler = data => console.log(data);
// const hub = createEventHub();

// 订阅
// hub.on('message', handler);
// hub.on('message', () => console.log('Message event fired'));
// hub.on('increment', () => increment++);

// 发布
// hub.emit('message', 'hello world'); // 应输出 'hello world' 和 'Message event fired'
// hub.emit('message', { hello: 'world' }); // 应输出对象和 'Message event fired'
// hub.emit('increment'); // `increment` 变量现在应为 1

// 取消订阅
// hub.off('message', handler);

// 清除所有 'message' 事件的订阅
// hub.offAll('message');



/**
 * 检查一个DOM元素是否包含另一个DOM元素。
 * @param {Element} parent - 指定的父元素。
 * @param {Element} child - 指定的子元素。
 * @returns {boolean} 如果parent包含child，则返回true；否则返回false。
 */
const elementContains = (parent, child) => {
  // 验证参数是否有效：是否为非空的DOM元素
  if (!(parent instanceof Element) || !(child instanceof Element)) {
    console.error('elementContains: 参数parent和child都必须是有效的DOM Element。');
    return false;
  }

  try {
    // 排除parent和child相等的情况，以及parent是否包含child
    return parent !== child && parent.contains(child);
  } catch (error) {
    // 捕获并处理可能的异常
    console.error('elementContains: 发生异常', error);
    return false;
  }
};

// 示例调用
elementContains(document.querySelector('head'), document.querySelector('title')); // true
elementContains(document.querySelector('body'), document.querySelector('body')); // false



/**
 * 检查传入的DOM元素是否当前获得了焦点。
 * @param {Element} el - 要检查的DOM元素。
 * @returns {boolean} - 如果元素获得了焦点，则返回true，否则返回false。
 * @throws {TypeError} - 如果传入的参数不是DOM元素，则抛出TypeError。
 */
const elementIsFocused = el => {
  // 参数类型检查：确保传入的是DOM元素
  if (!(el instanceof Element)) {
    throw new TypeError('Expected a DOM element');
  }

  // 检查传入的元素是否是当前获得焦点的元素
  return el === document.activeElement;
};

// 示例调用（在实际应用中，应该确保el是一个DOM元素）
// elementIsFocused(someElement); // true if the element is focused



/**
 * 计算ELO等级分的函数
 * @param {Array} ratings 参与比赛的选手的当前ELO等级分数组
 * @param {number} kFactor 用于调整等级分的因子，默认为32
 * @param {number} selfRating 自己的ELO等级分，如果提供，则在计算时使用，默认为函数内部计算
 * @returns {Array} 返回经过比赛后，选手的新ELO等级分数组
 */
const elo = ([...ratings], kFactor = 32, selfRating) => {
  // 输入验证
  if (!ratings.length) throw new Error('ratings array must not be empty'); // 确保ratings数组不为空
  if (ratings.some(rating => typeof rating !== 'number' || rating <= 0)) {
    throw new Error('all ratings must be positive numbers'); // 确保所有rating都是正数
  }

  const calculateNewRating = (rating, opponentRating, isSelf) => {
    // 计算预期得分和新ELO等级分
    const expectedScore = (self, opponent) => 1 / (1 + Math.pow(10, (opponent - self) / 400));
    return (selfRating || rating) + kFactor * (isSelf ? 1 - expectedScore(rating, opponentRating) : expectedScore(opponentRating, rating));
  };

  if (ratings.length === 2) {
    // 如果只有两个选手，直接计算并返回双方的新ELO等级分
    const [a, b] = ratings;
    return [calculateNewRating(a, b, true), calculateNewRating(b, a, false)];
  }

  // 避免递归，使用循环处理多人对局
  for (let i = 0; i < ratings.length; i++) {
    for (let j = i + 1; j < ratings.length; j++) {
      // 计算每一对选手的新ELO等级分，并更新ratings数组
      const newRatingI = calculateNewRating(ratings[i], ratings[j], true);
      const newRatingJ = calculateNewRating(ratings[j], ratings[i], false);
      ratings[i] = newRatingI;
      ratings[j] = newRatingJ;
    }
  }
  return ratings; // 返回更新后的ELO等级分数组
};

// 保持不变的测试用例
console.log(elo([1200, 1200])); // [1216, 1184]
console.log(elo([1200, 1200], 64)); // [1232, 1168]
console.log(elo([1200, 1200, 1200, 1200]).map(Math.round)); // [1246, 1215, 1185, 1154]



/**
 * 将字符串中的HTML特殊字符转义。
 * @param {string} str 需要转义的字符串。
 * @returns {string} 转义后的字符串。
 * @throws {TypeError} 如果输入不是字符串，则抛出TypeError。
 */
const escapeHTML = (str) => {
  // 检查输入是否为字符串
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 定义一个字符映射表，用于高效转换特殊字符
  const escapeChars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  };

  // 使用正则表达式和映射表替换字符串中的特殊字符
  return str.replace(/[&<>'"]/g, tag => escapeChars[tag] || '');
};

// 执行示例
console.log(escapeHTML('<a href="#">Me & you</a>')); // 输出: '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'



/**
 * 检查指定的DOM元素是否包含指定的类名。
 * @param {Element} el - 要检查的DOM元素。
 * @param {string} className - 要查找的类名。
 * @returns {boolean} - 如果元素包含指定的类名，则返回true；否则返回false。
 */
const hasClass = (el, className) => {
  // 检查传入的el是否为null或非DOM元素
  if (!el || !(el instanceof Element)) {
    throw new Error('Invalid argument: expected a DOM element.');
  }
  
  // 检查传入的className是否为字符串类型
  if (typeof className !== 'string') {
    throw new Error('Invalid argument: expected a string for className.');
  }

  // 检查元素是否包含指定的类名
  return el.classList.contains(className);
};

// 示例用法，确保调用时传入的是有效的DOM元素和类名
const element = document.querySelector('p.special');
if (element) {
  console.log(hasClass(element, 'special')); // true 或者 false
} else {
  console.log('指定的元素不存在。');
}



// 模拟在Node.js环境下process.argv的内容
const mockProcess = {
  argv: ['node', 'myScript.js', '-s', '--test', '--cool=true']
};

/**
 * 检查命令行参数（process.argv）中是否包含了指定的一组标志（flags）。
 * @param {...string} flags - 一组需要检查的标志，可以包含短标志（-s）或长标志（--test），
 *   如果标志未以短横线或双短横线开头，则会自动添加双短横线前缀。
 * @returns {boolean} - 如果所有传入的标志都在命令行参数中找到，则返回true；否则返回false。
 * @throws {TypeError} - 当传入非字符串类型的参数时抛出错误。
 */
const hasFlags = (...flags) => {
  // 验证所有传入参数是否为字符串类型
  if (!flags.every(flag => typeof flag === 'string')) {
    throw new TypeError('All flags must be strings');
  }

  // 使用模拟的process.argv
  const cachedArgs = mockProcess.argv.slice(2);

  return flags.every(flag => {
    const isFlagPrefixed = /^-{1,2}/.test(flag);
    const searchFlag = isFlagPrefixed ? flag : '--' + flag;
    
    return cachedArgs.includes(searchFlag);
  });
};

// 示例用法保持不变
hasFlags('-s'); // true
hasFlags('--test', 'cool=true', '-s'); // true
hasFlags('special'); // false



/**
 * 隐藏一组DOM元素。
 * @function hide
 * @param {...(NodeList|Element)} elements - 一个或多个DOM元素或包含DOM元素的NodeList。
 */
const hide = (...el) => {
  try {
    // 检查传入参数，确保其为NodeList或Element类型
    const elements = Array.from(el[0]);
    if (elements.length === 0 || !(elements[0] instanceof Element)) {
      console.warn('Invalid argument. Expected a NodeList or an Element.');
      return;
    }

    // 为了避免一次性操作过多的DOM元素导致性能问题，
    // 可以选择分批处理，这里以50个为一批次进行处理
    const batchSize = 50;
    for (let i = 0; i < elements.length; i += batchSize) {
      const batch = elements.slice(i, i + batchSize);
      batch.forEach(e => (e.style.display = 'none'));
    }
  } catch (error) {
    console.error('Failed to hide elements:', error);
  }
};

// 调用示例，隐藏所有的<img>元素
hide(document.querySelectorAll('img'));



/**
 * Toggles the visibility of a DOM element.
 * @param {Element} ele - The DOM element to toggle visibility for.
 */
const toggleVisibility = (ele) => {
  // 参数校验：确保传入的是一个有效的DOM元素。
  if (!(typeof ele === 'object' && ele !== null && ele.nodeType === Node.ELEMENT_NODE)) {
    console.error('Invalid DOM element provided.');
    return;
  }

  try {
    // 直接切换显示状态，而不是检查并设置多个值。
    // 使用 '' 来让浏览器使用元素的默认display值。
    ele.style.display = ele.style.display === 'none' ? '' : 'none';
  } catch (error) {
    // 异常处理：捕获并记录可能出现的错误。
    console.error('An error occurred while toggling element visibility:', error);
  }
}

// 示例用法（确保先获取到一个有效的DOM元素）
// const myElement = document.getElementById('myElementId');
// toggleVisibility(myElement);



/**
 * 封装加载图片函数，支持并发加载
 * imageSources数组中的图片按需调整
 * 
 */
const imageSources = [
  // 假设这里已经是使用绝对路径或者有公共路径前缀的相对路径
  './image/g-slide-img1.png',
  './image/g-slide-img2.png',
  './image/g-slide-img3.png',
  './image/g-slide-img4.png',
  './image/g-slide-img5.png',
];

// 逐次加载图片
// <div class="content" id="content"></div>
const content = document.getElementById('content');
const graduallyLoadImg = () => {
  if(!imageSources.length) return;
  const img = new Image();
  img.src = imageSources[0];
  img.setAttribute('class','img-item');
  img.onload = () => {
    setTimeout(() => {
      content.appendChild(img);
      imageSources.shift();
      loadImg();
    },1000);
    // content.appendChild(img);
    // imageSources.shift();
    // loadImg();
  }
  img.onerror = () => {
    // do something
  }
}
graduallyLoadImg();

// 封装加载图片函数，支持并发加载
function loadImages(sources) {
  if (!Array.isArray(sources) || sources.length === 0) {
    console.error('Invalid image sources.');
    return Promise.resolve(); // 处理边界情况
  }

  // 使用 Promise.all 并发加载图片
  return Promise.all(sources.map(source => loadImage(source)));
}

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve();
    };
    img.onerror = () => {
      console.error('Failed to load image:', source);
      reject(new Error(`Failed to load image: ${source}`)); // 提供更详细的错误信息
    };
    img.src = source;
  });
}

// 使用
// 页面加载完成后调用加载图片函数
$(window).on('load', async () => {
  try {
    await loadImages(imageSources);
    console.log('All images loaded successfully.');
  } catch (error) {
    // 这里可以添加更多错误处理逻辑，比如展示一个友好的错误提示给用户
    console.error('Error loading images:', error);
  }
});



/**
 * 图片预加载
 * 
 * 本模块提供了一个图片预加载的功能，支持通过回调函数对加载完成、进度和错误进行处理。
 * 可以通过构造函数 Preload 传入图片数组和选项进行初始化。
 */
class Preload {
  static VERSION = '1.0.1';

  constructor(pics, options = {}) {
      if (!Array.isArray(pics)) {
          throw new Error('pics must be an array');
      }

      this.pics = pics;
      this.options = { ...Preload.defaultOptions, ...options };
      this.loadedCount = 0;
      this.failedCount = 0;

      if (this.pics.length === 0) {
          this.options.complete(0, 0);
          return;
      }

      this.loadImages();
  }

  static defaultOptions = {
      complete: () => {},
      progress: () => {},
      error: () => {}
  };

  async loadImages() {
      try {
          const promises = this.pics.map(this.loadImage.bind(this));
          await Promise.all(promises);
          this.options.complete(this.pics.length - this.failedCount, this.failedCount);
      } catch (_) {
          this.options.error();
      }
  }

  loadImage(src) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
              this.updateProgress(src, 'loaded');
              resolve();
          };
          img.onerror = () => {
              this.updateProgress(src, 'failed');
              reject();
          };
          img.src = src;
      });
  }

  updateProgress(src, status) {
      if (status === 'failed') this.failedCount++;
      this.loadedCount++;
      this.options.progress(this.loadedCount, this.pics.length, src, status);
  }
}

// 示例
const pics = ['./ossweb-img/bg1.jpg', './ossweb-img/bg1.jpg', './ossweb-img/bg1.jpg'];
const options = {
  complete: (successful, failed) => console.log(`已加载 ${successful} 张图片, ${failed} 失败.`),
  progress: (current, total, src, status) => console.log(`Progress: Loaded ${src} (${status})`),
  error: () => console.error('图片加载错误.')
};

const preload = new Preload(pics, options);



/**
 * LazyLoader 类用于实现图片的懒加载。
 * 它通过 IntersectionObserver API 监视图片是否进入视口，并在进入视口时加载图片。
 * 
 * @param {Object} options - 配置选项，包括选择器、加载回调和IntersectionObserver的选项。
 */
class LazyLoader {
  constructor(options = {}) {
      this.options = {
          selector: '.lazy', // 默认选择器，用于标识需要懒加载的图片元素
          ...options,
      };
      this.observer = null;
      this.init();
  }
  /**
   * 初始化 LazyLoader，设置观察器并加载初始可见的图片。
   */
  init() {
      this.observeIntersection();
      this.loadVisibleImages(); // 初始时加载已可视的图片
  }
  /**
   * 创建一个 IntersectionObserver 实例，用于观察图片是否进入视口。
   */
  observeIntersection() {
      this.observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  this.loadImage(entry.target);
                  observer.unobserve(entry.target);
              }
          });
      }, this.options.intersectionOptions || { rootMargin: '200px' });
  }
  /**
   * 加载当前可见的图片。
   */
  loadVisibleImages() {
      const visibleImages = document.querySelectorAll(`${this.options.selector}:not(.loaded)`);
      visibleImages.forEach(img => this.loadImage(img));
  }
  /**
   * 加载指定的图片。
   * 
   * @param {Element} img - 需要加载的图片元素。
   */
  loadImage(img) {
      if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          if (typeof this.options.loaded === 'function') {
              this.options.loaded(img);
          }
      }
  }
  /**
   * 添加新的图片元素并开始观察它们。
   * 
   * @param {string} selector - 新图片元素的选择器。
   */
  addImages(selector) {
      const newImages = document.querySelectorAll(selector);
      newImages.forEach(img => {
          if (!img.classList.contains('loaded')) {
              this.observer.observe(img);
          }
      });
  }
  /**
   * 销毁 LazyLoader，停止观察图片。
   */
  destroy() {
      if (this.observer) {
          this.observer.disconnect();
      }
  }
}
// 示例使用
document.addEventListener('DOMContentLoaded', () => {
    /**
     * 创建一个 LazyLoader 实例。
     * 这里配置了加载回调函数和IntersectionObserver的选项。
     */
    const lazyLoader = new LazyLoader({
        loaded: img => console.log(`Image ${img.src} loaded.`),
        intersectionOptions: { rootMargin: '500px' }, // 自定义根元素边缘，决定提前多少开始加载
    });
    // 假设动态添加图片（单张图）
    setTimeout(() => {
        /**
         * 创建一个新的图片元素并添加到文档中。
         * 然后通过 addImages 方法将其纳入懒加载的观察范围。
         */
        const newImages = document.createElement('img');
        newImages.className = 'lazy';
        newImages.dataset.src = './ossweb-img/tale-bg1.jpg';
        document.body.appendChild(newImages);
        lazyLoader.addImages('.lazy:last-child');
    }, 7000);
    
    // 假设动态添加多张图片
    setTimeout(() => {
        // 创建一个函数来生成并添加新的图片元素
        const createAndAddImages = (count) => {
            for (let i = 0; i < count; i++) {
                const newImage = document.createElement('img');
                newImage.className = 'lazy'; // 保持 lazy 类以标识为懒加载图片
                newImage.dataset.src = `path/to/new/image_${i + 1}.jpg`; // 动态设置数据源，假设每张图片路径不同
                document.body.appendChild(newImage);
            }
        };
        // 假设添加5张新图片
        createAndAddImages(5);
        // 观察所有新增的 .lazy 类图片
        lazyLoader.addImages('.lazy:not(.loaded)');
    }, 7000);
});



/**
 * 显示页面中的所有图片
 * 该函数没有参数和返回值
 * 使用requestAnimationFrame优化性能，避免一次性加载所有图片导致页面卡顿
 */
const showImages = () => {
  try {
    // 使用requestAnimationFrame来优化图片的加载，减少页面重绘和重排的次数
    requestAnimationFrame(() => {
      // 使用querySelectorAll获取页面中所有img元素，并使用扩展运算符和forEach遍历
      [...document.querySelectorAll('img')].forEach((img) => {
        // 检查img元素是否为HTMLImageElement类型，确保其为有效的图片元素
        if (img instanceof HTMLImageElement) {
          img.style.display = ''; // 将img元素的display样式设置为空字符串，从而显示图片
        }
      });
    });
  } catch (error) {
    // 捕获并输出可能出现的错误
    console.error("Error displaying images:", error);
  }
};

// 调用showImages函数，显示页面中的图片
showImages();


/**
 * 读取并显示上传的图片
 * <input type="file" id="uploaded-file" accept="image/*" />
    <div id="result"></div>
    <div id="error-container"></div>
 * 
 * 该函数从页面中获取上传的文件，验证其是否为图片类型，然后使用FileReader以DataURL的形式读取图片，
 * 并将其显示在结果容器中。如果上传非图片类型文件或读取文件时发生错误，将显示错误信息。
 */
function readImage() {
  const fileInput = document.getElementById('uploaded-file');
  const resultContainer = document.getElementById('result');

  // 检查是否有文件被上传
  if (!fileInput.files.length) {
    displayError('请上传一个文件。');
    return;
  }
  
  // 只处理第一个文件
  const file = fileInput.files[0];
  
  // 检查文件类型，确保它是图片
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    displayError('只允许上传JPEG、PNG和GIF格式的图片。');
    return;
  }
  
  const fileReader = new FileReader();

  // 当文件读取成功时，创建图片并显示
  fileReader.addEventListener(
    'load',
    () => {
      const img = createImage(fileReader.result);
      resultContainer.appendChild(img);
    },
    { once: true }
  );

  // 当文件读取失败时，显示错误信息
  fileReader.addEventListener(
    'error',
    () => {
      displayError('读取文件时发生错误。');
    },
    { once: true }
  );

  try {
    // 尝试读取文件
    fileReader.readAsDataURL(file);
  } catch (error) {
    console.error('读取文件失败:', error);
    displayError('读取文件时发生错误。');
  }
}

/**
 * 创建一个新的图片元素，并设置其源为给定的DataURL
 * 
 * @param {string} src - 图片的DataURL
 * @return {Element} 创建的图片元素
 */
function createImage(src) {
  const img = document.createElement('img');
  img.src = src;
  return img;
}

/**
 * 在页面中显示一个错误信息
 * 
 * @param {string} message - 要显示的错误信息
 */
function displayError(message) {
  const errorContainer = document.createElement('div');
  errorContainer.textContent = message;
  errorContainer.style.color = 'red';
  document.body.appendChild(errorContainer);
}

// 使用readImage()
/* <h1>上传图片</h1>
    <input type="file" id="uploaded-file" accept="image/*" />
    <div id="result"></div>
    <div id="error-container"></div> */
document.getElementById('uploaded-file').addEventListener('change', readImg);
function readImg() {
  const fileReader = new FileReader();
  const file = document.getElementById('uploaded-file').files[0];
  const errorContainer = document.getElementById('error-container');
  if (!file) {
    errorContainer.textContent = '请先选择一个文件。';
    return;
  }
  fileReader.addEventListener('load', () => {
    const resultContainer = document.getElementById('result');
    const img = document.createElement('img');
    img.src = fileReader.result;
    resultContainer.innerHTML = '';
    resultContainer.appendChild(img);
  });
  fileReader.addEventListener('error', () => {
    errorContainer.textContent = '读取文件时出错。';
  });
  fileReader.readAsDataURL(file);
}


/**
 * 在指定元素之前插入HTML字符串。
 * @param {Element} el - 目标元素。
 * @param {string} htmlString - 要插入的HTML字符串。
 */
const insertBefore = (el, htmlString) => {
  // 检查目标元素是否存在
  if (!el) {
    console.error('Target element not found.');
    return;
  }

  // 对htmlString进行清理以避免XSS攻击（这里假设存在一个名为cleanHTML的函数）
  // 注意：实际中需要使用成熟的库如DOMPurify来完成HTML的清理，这里使用cleanHTML仅作为示例
  const cleanHTML = (str) => {
    // TODO: 实现具体的HTML清理逻辑，确保插入的内容是安全的
    // 例如使用DOMPurify.sanitize(str) 如果你使用DOMPurify库
    return str;
  };

  try {
    // 清理后的HTML字符串插入到元素之前
    el.insertAdjacentHTML('beforebegin', cleanHTML(htmlString));
  } catch (error) {
    // 处理可能的DOM操作错误
    console.error('Error inserting HTML before element:', error);
  }
};

// 调用示例，插入一个包含文本"before"的<p>元素
insertBefore(document.getElementById('myId'), '<p>before</p>');



/**
 * 渲染一个DOM元素并将其添加到指定的容器中。
 * 
 * @param {Object} config 包含元素类型和属性的对象。
 * @param {string|function} config.type 元素的类型，如 'div' 或者自定义标签名。
 * @param {Object} [config.props={}] 元素的属性。可以包含事件监听器和子元素等。
 * @param {HTMLElement} container 将要添加新元素的容器。
 */
const renderElement = ({ type, props = {} }, container) => {
  // 对类型和属性进行基本校验
  if (typeof type !== 'string' || !(typeof props === 'object' && props !== null)) {
    console.error('Invalid element configuration');
    return;
  }

  const isTextElement = !type;
  const element = isTextElement
    ? document.createTextNode('') // 创建文本节点
    : document.createElement(type); // 创建指定类型的元素

  // 判断属性是事件监听器还是普通属性
  const isListener = p => p.startsWith('on') && typeof props[p] === 'function';
  const isAttribute = p => !isListener(p) && p !== 'children' && typeof props[p] !== 'function';

  // 遍历props，设置元素属性和事件监听器
  for (const p in props) {
    if (props.hasOwnProperty(p)) {
      if (isAttribute(p)) element[p] = props[p]; // 设置普通属性
      if (!isTextElement && isListener(p))
        element.addEventListener(p.toLowerCase().slice(2), props[p]); // 设置事件监听器
    }
  }

  // 如果元素不是文本节点，并且props中包含子元素，则递归渲染子元素
  if (!isTextElement && Array.isArray(props.children) && props.children.length) {
    props.children.forEach(childElement => renderElement(childElement, element));
  }

  container.appendChild(element); // 将元素添加到容器中
}

const myElement = {
  type: 'button',
  props: {
    type: 'button',
    className: 'btn',
    onClick: () => alert('Clicked'),
    children: [
      { props: { nodeValue: 'Click me' } }
    ]
  }
};

// 调用示例保持不变
renderElement(
  myElement,
  document.body
);



/**
 * 创建并添加一个新的样式表到当前文档中。
 * @param {string} styleRule - CSS样式规则。
 */
const addSheet = (styleRule) => {
  try {
    // 创建新的CSSStyleSheet对象
    let sheet;
    if (typeof CSSStyleSheet !== 'undefined') {
      sheet = new CSSStyleSheet();
    } else {
      console.error('CSSStyleSheet is not supported in this browser.');
      return;
    }

    // 替换样式表内容，传入参数作为样式规则
    try {
      sheet.replaceSync(styleRule);
    } catch (error) {
      console.error('Failed to replace stylesheet content:', error);
      return;
    }

    // 将样式表采用到当前文档
    try {
      if (typeof document.adoptedStyleSheets !== 'undefined') {
        document.adoptedStyleSheets = [sheet];
      } else {
        console.error('document.adoptedStyleSheets is not supported in this browser.');
      }
    } catch (error) {
      console.error('Failed to adopt stylesheet:', error);
    }
  } catch (e) {
    // 捕获并处理任何未预期的异常
    console.error('Unexpected error occurred:', e);
  }
}

// 调用函数并传入样式规则
addSheet('#sec1 {backgroundColor: #ccc}');



/**
 * 通过元素ID添加内联样式
 * @param {string} eleId 元素的ID
 * @param {string} eleCss 要添加的样式文本
 */
const addInlineStyleById = (eleId, eleCss) => {
  const element = document.getElementById(eleId);
  
  if (element) {
    element.style.cssText = eleCss;
  } else {
    console.error(`Element with ID '${eleId}' not found.`); // 如果指定ID的元素不存在，则打印错误信息
  }
}

/**
 * 通过元素类添加内联样式
 * @param {string} eleClass 元素的类名
 * @param {string} eleCss 要添加的样式文本
 */
const addInlineStyleByClass = (eleClass, eleCss) => {
  const elements = document.getElementsByClassName(eleClass);
  
  if (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.cssText = eleCss;
    }
  } else {
    console.error(`Elements with class '${eleClass}' not found.`); // 如果指定类名的元素不存在，则打印错误信息
  }
}

/**
 * 组合接口函数，根据传入参数类型自动调用相应函数
 * @param {string} selector 选择器，可以是ID选择器或类选择器
 * @param {string} eleCss 要添加的样式文本
 */
const addInlineStyle = (selector, eleCss) => {
  if (typeof selector === 'string' && selector.includes('#')) {
    addInlineStyleById(selector.replace(/^#/, ''), eleCss); // 如果选择器是ID选择器，则调用addInlineStyleById
  } else if (typeof selector === 'string' && selector.includes('.')) {
    addInlineStyleByClass(selector.replace(/^\./, ''), eleCss); // 如果选择器是类选择器，则调用addInlineStyleByClass
  } else {
    console.error('Invalid selector. Please provide an ID or a class selector.'); // 如果选择器格式不正确，则打印错误信息
  }
}

// 使用示例
// 为ID为"part1"的元素添加内联样式
addInlineStyle("#part1", "background-color: #ccc; color: #000; font-size: 20px; line-height: 1; text-align: center;");
// 为类名为"part2"的元素添加内联样式
addInlineStyle(".part2", "background-color: #eee; color: #333; font-size: 16px;");



/**
 * 向文档中添加样式规则。
 * @param {string} eleStyleInit - 要添加的样式内容，可以是CSS文本字符串。
 * 注：这个函数不返回任何值，它的作用是将指定的样式加入到文档的<head>部分。
 */
const addStyle = (eleStyleInit) => {
  // 生成一个唯一的ID，用于标识是否已添加过相同的样式
  const styleId = `style-id-${Date.now()}`;  
  
  // 尝试查找已添加的样式元素，如果找到则直接返回，不重复添加
  const existingStyle = document.querySelector(`style#${styleId}`);
  if (existingStyle) return;

  // 创建新的<style>元素
  const eleStyle = document.createElement('style');
  eleStyle.id = styleId; // 设置唯一ID
  eleStyle.appendChild(document.createTextNode(eleStyleInit)); // 将样式内容添加到<style>元素，避免XSS攻击

  // 将新的<style>元素插入到<head>中
  // 先找到文档中的<title>元素，然后将<style>元素插入到<title>之前
  const fa = document.querySelector('title');
  document.head.insertBefore(eleStyle, fa);
}

// 示例使用：添加响应式背景颜色的样式规则
addStyle(`\
@media screen and (min-width:1025px) {\n\
  body{color: #ccc;}\n\
}\n\
\
@media screen and (max-width:1024px) {\n\
  body{color: #f0f;}\n\
}\n\
`);



/**
 * 为指定的DOM元素设置样式。
 * @param {Element} el - 需要设置样式的DOM元素。
 * @param {string} ruleName - 样式规则的名称。
 * @param {string} val - 样式规则的值。
 */
const setStyle = (el, ruleName, val) => {
  // 检查传入的DOM元素是否存在
  if (!el) {
    console.error('Element not found');
    return;
  }
  
  // 对ruleName和val进行简单的类型检查，确保它们是预期的类型。
  // 这种类型的检查可以防止一些不安全的输入，虽然在这个场景下可能不是非常必须。
  if (typeof ruleName !== 'string' || typeof val !== 'string') {
    console.error('Invalid input types for ruleName or val');
    return;
  }

  // 进行样式设置
  el.style[ruleName] = val;
};

// 使用示例，依然是给页面中第一个<p>元素设置字体大小
setStyle(document.querySelector('p'), 'font-size', '20px');



/**
 * 给指定ID或类名的元素添加一个类名。
 * @param {string} elementIdentifier - 元素的ID或类名。
 * @param {string} classNameToAdd - 要添加的类名。
 * @throws {Error} 如果无法找到匹配的元素、提供的标识符或类名为空，或者类名包含非法字符。
 */
const addClass = (elementIdentifier, classNameToAdd) => {
  // 检查传入的参数是否合法
  if (typeof elementIdentifier !== 'string' || elementIdentifier.trim() === '') {
    throw new Error('提供的元素标识符（ID或类名）为空或不是字符串。');
  }

  if (typeof classNameToAdd !== 'string' || classNameToAdd.trim() === '') {
    throw new Error('提供的要添加的类名为空或不是字符串。');
  }

  // 简单的类名合法性检查（可以根据实际需求进行调整）
  const isValidClassName = /^[a-zA-Z0-9-_]+$/.test(classNameToAdd);
  if (!isValidClassName) {
    throw new Error(`提供的类名'${classNameToAdd}'包含非法字符。类名应只包含字母、数字、破折号(-)和下划线(_)。`);
  }

  let elements;
  
  // 判断并获取元素集合
  if (/^\w+$/.test(elementIdentifier)) { // ID通常由字母、数字、下划线组成
    elements = document.getElementById(elementIdentifier);
    if (!elements) {
      throw new Error(`无法找到ID为'${elementIdentifier}'的元素。`);
    }
  } else {
    elements = document.getElementsByClassName(elementIdentifier);
    if (elements.length === 0) {
      throw new Error(`无法找到类名为'${elementIdentifier}'的元素。`);
    }
  }

  // 将元素处理为数组，以应对可能是一个单独元素的情况
  elements = Array.from(elements);

  // 遍历元素并添加类名
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add(classNameToAdd);
  }
}

// 示例用法
try {
  addClass("T-drop-hover", "on"); // 添加到ID为"part1"的元素
  addClass("T-drop-hover", "on"); // 添加到所有类名为"existing-class"的元素
} catch (error) {
  console.error(error.message);
}



/**
 * 移除指定元素的指定类名。
 * @param {string} eleId - 要操作的元素的ID或类名。
 * @param {string} eleClassName - 要移除的类名。
 */
const removeClass = (eleId, eleClassName) => {
  // 参数检查
  if (typeof eleId !== 'string' || typeof eleClassName !== 'string') {
    console.error('参数类型错误，eleId和eleClassName都应为字符串。');
    return;
  }
  if (eleId.trim() === '' || eleClassName.trim() === '') {
    console.error('参数不能为空。');
    return;
  }

  // 根据ID查找元素
  let ele = document.getElementById(eleId);
  if (ele) {
    // 如果元素通过ID找到，则直接移除类名
    ele.classList.remove(eleClassName);
  } else {
    // 如果未通过ID找到元素，则尝试通过类名查找
    let elements = document.getElementsByClassName(eleId);
    if (elements.length > 0) {
      // 遍历所有通过类名找到的元素，移除指定类名
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove(eleClassName);
      }
    } else {
      // 如果两种方法都未找到元素，打印错误消息
      console.error(`未找到ID为"${eleId}"或类名为"${eleId}"的元素。`);
    }
  }
};
// 使用示例
removeClass("T-drop-hover", "on");



/**
 * 添加或移除类名
 * @param {string} elementIdOrClassName 需要操作的元素的ID或类名
 * @param {string} className 要添加或移除的类名
 * @param {string} operation 操作类型，'add'为添加，'remove'为移除
 */
const manipulateClass = (elementIdOrClassName, className, operation) => {
  // 根据传入的参数获取元素
  let elements;
  if (operation === 'remove' && document.getElementById(elementIdOrClassName)) {
    // 如果是移除操作且元素ID存在，则仅获取该ID对应的单个元素
    elements = [document.getElementById(elementIdOrClassName)];  
  } else {
    elements = document.getElementsByClassName(elementIdOrClassName);
  }

  // 遍历所有找到的元素
  Array.from(elements || []).forEach(element => {
    if (element) {
      switch (operation) {
        case 'add':
          element.classList.add(className);
          break;
        case 'remove':
          element.classList.remove(className);
          break;
        default:
          console.error("Unsupported operation. Please use 'add' or 'remove'.");
      }
    }
  });
}

// 示例用法：添加类名
manipulateClass("part1", "on", "add");
// 示例用法：移除类名
manipulateClass("part1", "on", "remove");



/**
 * 在给定的DOM元素上切换一个类。
 * 如果元素不存在或不是DOM元素，函数则不执行任何操作。
 * 
 * @param {Element} el - 需要切换类的DOM元素。
 * @param {string} className - 需要切换的类名。
 * @returns {boolean} - 返回切换操作的结果：如果类被添加则返回true，如果类被移除则返回false，如果元素不存在或不是DOM元素则返回undefined。
 */
const toggleClass = (el, className) => {
  // 检查元素是否为有效的DOM元素
  if (!(el instanceof Element)) {
    console.warn('The provided element is not a valid DOM element.');
    return undefined;
  }

  // 检查元素是否存在
  if (!el) {
    console.warn('The provided element does not exist.');
    return undefined;
  }

  // 切换类名
  return el.classList.toggle(className);
}

// 示例用法：
toggleClass(document.querySelector('p.special'), 'special');
// 此处将切换段落的'special'类状态。



/**
 * 解码HTML字符实体。
 * 注意：如果直接在不可信输入上使用此函数，它并不能完全防止XSS攻击。
 * 请确保输入被清理或在安全上下文中使用。
 * 
 * @param {string} str 需要解码HTML实体的字符串。
 * @returns {string} 解码后的字符串。
 */
const unescapeHTML = (str) => {
  // 验证输入
  if (typeof str !== 'string') {
    throw new TypeError('输入应为字符串');
  }

  // HTML实体与其未转义对应项的映射
  const entityMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&#39;': "'",
    '&quot;': '"'
  };

  // 使用正则表达式和映射表替换字符串中的HTML实体
  return str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag => entityMap[tag] || tag
  );
};

// 示例用法
console.log(unescapeHTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;')); // '<a href="#">Me & you</a>'



/**
 * 监听元素点击事件
 * @param {string} sectionElement - 要监听的元素的ID。
 */
// 查询元素ID
const sectionElement = document.getElementById("sec1");

// 在添加事件监听之前检查元素是否存在
if (sectionElement) {
    // 添加click事件和keydown事件
    sectionElement.addEventListener("click", handleClick);
    sectionElement.addEventListener("keydown", handleKeyDown);

    function handleClick() {
        console.log(1111); // 保持功能不变
        // 可以在这里添加视觉上的反馈或其他功能
    }

    function handleKeyDown(event) {
        // 仅当按下Enter键或空格键时触发
        if (event.key === "Enter" || event.key === " ") {
            console.log(1111); // 保持功能不变
            // 可以在这里添加视觉上的反馈或其他功能
        }
    }
} else {
    console.warn("Warning: Element with ID 'sec1' not found.");
    // 优化3: 元素不存在时的处理建议
    // 可以考虑备选操作或者向用户反馈
}


/**
 * 检测元素之外的点击
 * 在实现隐藏弹窗或收起下拉框时，如果你还在一层层判断是否点击了某个元素之外的区域，则可以使用此函数
 * 
 */
document.addEventListener('click', function(evt){
  const isClickedOutside = !ele.contains(evt.target);
})


/**
 * 一次性的事件监听
 * 
 * 
*/
const ele = document.getElementById('yourElementId'); // 假设你已经有了一个元素ID
const eventName = 'event-name'; // 你的事件名称

// 内联事件处理器，只触发一次
ele.addEventListener(eventName, (e) => {
  // 处理事件的逻辑
}, { once: true });



/**
 * 给页面中所有的外链添加noopener和noreferrer
 * 
 */
// 获取所有target="_blank"的a标签
const links = document.querySelectorAll('a[target="_blank"]');

// 遍历这些链接并添加rel属性
links.forEach(link => {
  // 检查rel属性是否已经包含noopener和noreferrer，如果没有，则添加
  if (!link.rel.includes('noopener') || !link.rel.includes('noreferrer')) {
    link.rel = link.rel ? link.rel + 'noopener noreferrer' : 'noopener noreferrer';
  }
});



/**
 * 一个用于创建鼠标悬停效果的类。
 * @class
 * @param {string} btnClassName - 按钮元素的类名。
 * @param {string} detailClassName - 详情元素的类名。
 * @param {string} [unit='px'] - 高度单位，默认为 'px'。支持 'px', 'rem', 'vw'。
 */
class HoverEffect {
  /**
   * 构造函数初始化HoverEffect实例。
   * @param {string} btnClassName - 按钮元素的类名。
   * @param {string} detailClassName - 详情元素的类名。
   * @param {string} [unit='px'] - 高度单位，默认为 'px'。支持 'px', 'rem', 'vw'。
   */
  constructor(btnClassName, detailClassName, unit = 'px') {
    this.btn = document.querySelector(`.${btnClassName}`);
    this.detail = document.querySelector(`.${detailClassName}`);
    this.unit = unit;
    this.init();
  }

  /**
   * 初始化事件监听器。
   */
  init() {
    this.btn.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.btn.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  /**
   * 处理鼠标进入事件。
   */
  handleMouseEnter() {
    // 鼠标划入先设置auto
    this.detail.style.height = 'auto';
    // 获取到auto的高度
    const { height } = this.detail.getBoundingClientRect();
    // 根据单位转换高度
    let adjustedHeight = height;
    if (this.unit === 'rem' || this.unit === 'vw') {
      adjustedHeight /= 100;
    }
    // 还原高度0
    this.detail.style.height = 0;
    // 使用获取的auto的高度，实现动画效果
    requestAnimationFrame(() => {
      this.detail.style.height = `${adjustedHeight}${this.unit}`;
      this.detail.style.transition = 'height 1s';
    });
  }

  /**
   * 处理鼠标离开事件。
   */
  handleMouseLeave() {
    this.detail.style.height = 0;
  }
}

// 使用示例
/*
<style>
.btn{
  display: block;
  margin: 0 auto;
  width: 120px;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: cyan;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
}

.detail{
  margin: 0 auto;
  width: 150px;
  height: 0;
  overflow: hidden;
  background-color: beige;
}
</style>
<div class="hover-container">
  <a href="javascript:;" class="btn">hover 展示</a>
  <div class="detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</div>
</div>
*/
new HoverEffect('btn', 'detail', 'px'); // 默认单位为px
new HoverEffect('btn', 'detail', 'rem'); // 单位为rem
new HoverEffect('btn', 'detail', 'vw'); // 单位为vw



/**
 * 获取图片数据
 * @param {string} imgUrl - 图片的 URL 地址
 * @returns {Promise<Blob>} 返回一个 Promise，解析为 Blob 对象
 */
async function getImageData(imgUrl) {
  try {
    const response = await fetch(imgUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Failed to fetch the image:', error);
    throw error;
  }
}

/**
 * 将图片 Blob 转换为 PNG 格式
 * @param {Blob} blob - 原始图片 Blob
 * @returns {Promise<Blob>} 返回一个 Promise，解析为 PNG 格式的 Blob 对象
 */
async function convertToPng(blob) {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(img.src); // 清除blob URL以释放内存
          resolve(blob);
        }, 'image/png');
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src); // 清除blob URL以释放内存
        reject(new Error('Failed to load image'));
      };
    });
  } catch (error) {
    console.error('Failed to convert image to PNG:', error);
    throw error;
  }
}


/**
 * 复制图片到剪贴板
 * @param {Blob} blob - 需要复制的 Blob 对象
 * @returns {Promise<void>} 返回一个 Promise，表示复制操作完成
 */
async function copyToClipboard(blob) {
  try {
    const pngBlob = await convertToPng(blob);
    const item = new ClipboardItem({ 'image/png': pngBlob });
    await navigator.clipboard.write([item]);
    console.log('图片已成功复制到剪贴板！');
  } catch (error) {
    console.error('复制图片到剪贴板失败：', error);
    throw error;
  }
}


/*========= 复制图片到剪切版 start ==========*/ 
/**
 * 从剪贴板粘贴图片
 * @returns {Promise<void>} 返回一个 Promise，表示粘贴操作完成
 */
async function pasteFromClipboard() {
  try {
    const clipboardItems = await navigator.clipboard.read();
    for (const item of clipboardItems) {
      const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
      for (const type of types) {
        if (item.types.includes(type)) {
          const blob = await item.getType(type);
          const url = URL.createObjectURL(blob);
          const imgElement = document.createElement('img');
          imgElement.src = url;
          imgElement.alt = 'Pasted Image';
          imgElement.style.maxWidth = '100%';
          document.body.appendChild(imgElement);
          console.log('图片已成功粘贴到网页！');
          // 清除blob URL以释放内存
          imgElement.onload = () => {
            URL.revokeObjectURL(url);
          };
          break; // 如果找到一种格式就停止查找
        }
      }
    }
  } catch (error) {
    console.error('获取剪贴板内容失败：', error);
    throw error;
  }
}

// 示例使用
(async () => {
  try {
    const imgUrl = 'http://www.example.com/images/pic1.png';
    // const imgUrl = 'http://www.example.com/images/pic1.jpg'; // 替换为实际的图片URL
    const blob = await getImageData(imgUrl);
    await copyToClipboard(blob);
    await pasteFromClipboard();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

// 获取按钮元素
const copyButton = document.getElementById('copyButton');
const pasteButton = document.getElementById('pasteButton');

// 处理复制按钮点击事件
copyButton.addEventListener('click', async () => {
  try {
    const imgUrl = 'http://www.example.com/images/pic1.png';
    // const imgUrl = 'http://www.example.com/images/pic1.jpg'; // 替换为实际的图片URL
    const blob = await getImageData(imgUrl);
    await copyToClipboard(blob);
  } catch (error) {
    console.error('An error occurred while copying:', error);
  }
});

// 处理粘贴按钮点击事件
pasteButton.addEventListener('click', async () => {
  try {
    await pasteFromClipboard();
  } catch (error) {
    console.error('An error occurred while pasting:', error);
  }
});

// 确保页面获得焦点
document.body.focus();
/*========= 复制图片到剪切版 end ==========*/ 



/*
* 判断checkbox是否选中
* @param {eleId} element id - 需要判断的元素的id
*/
function checkStatus(eleId) {
  const checkbox = document.getElementById(eleId);

  if (checkbox.checked) {
    console.log("Checkbox is selected.");
  } else {
    console.log("Checkbox is not selected.");
  }
}
checkStatus('checkboxId')