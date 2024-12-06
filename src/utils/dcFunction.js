/**
 * 通用函数工具类
 */
class dcFunction {
    constructor() {}

    /**
     * 计算ELO等级分
     * @param {number[]} ratings - 等级分数组
     * @param {number} kFactor - K因子（默认32）
     * @param {number} [selfRating] - 自身等级分（可选）
     * @returns {number[]} 更新后的等级分数组
     */
    static elo(ratings, kFactor = 32, selfRating) {
        const n = ratings.length;
        const newRatings = [...ratings];
        
        for (let i = 0; i < n; i++) {
            let delta = 0;
            for (let j = 0; j < n; j++) {
                if (i === j) continue;
                const expectedScore = 1 / (1 + Math.pow(10, (ratings[j] - ratings[i]) / 400));
                const actualScore = i < j ? 1 : 0;
                delta += kFactor * (actualScore - expectedScore);
            }
            newRatings[i] = Math.round(ratings[i] + delta);
        }
        
        return newRatings;
    }

    /**
     * 转义HTML特殊字符
     * @param {string} str - 要转义的字符串
     * @returns {string} 转义后的字符串
     */
    static escapeHTML(str) {
        if (typeof str !== 'string') {
            throw new TypeError('Input must be a string');
        }
        
        const escapeChars = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        
        return str.replace(/[&<>"']/g, char => escapeChars[char]);
    }

    /**
     * 检查命令行参数中是否包含指定的标志
     * @param {...string} flags - 要检查的标志
     * @returns {boolean} 如果包含任一标志则返回true
     */
    static hasFlags(...flags) {
        if (!flags.length) return false;
        if (!process?.argv) return false;
        
        const processFlags = process.argv.slice(2);
        
        return flags.every(flag => {
            if (!flag.startsWith('-')) {
                flag = '--' + flag;
            }
            return processFlags.includes(flag);
        });
    }

    /**
     * 使用模板渲染数据列表
     * @param {Array} data - 要渲染的数据数组
     * @param {string|Element} container - 容器元素或选择器
     * @param {Function} template - 渲染模板函数
     */
    static renderDataList(data, container, template) {
        if (!Array.isArray(data)) {
            console.error('Data must be an array');
            return;
        }

        const containerElement = typeof container === 'string' ? document.querySelector(container) : container;
        if (!containerElement) {
            console.error('Container element not found');
            return;
        }

        const fragment = document.createDocumentFragment();
        data.forEach(item => {
            const element = template(item);
            if (element) {
                fragment.appendChild(element);
            }
        });

        containerElement.appendChild(fragment);
    }

    /**
     * 根据配置渲染DOM元素
     * @param {Object} config - 元素配置
     * @param {string} config.type - 元素类型
     * @param {Object} config.props - 元素属性
     * @param {Element} container - 容器元素
     * @returns {Element} 渲染的元素
     */
    static renderElement(config, container) {
        if (!config || !container) {
            console.error('Config and container are required');
            return;
        }

        const element = typeof config.type === 'function'
            ? config.type(config.props)
            : document.createElement(config.type);

        // Set properties
        Object.entries(config.props).forEach(([key, value]) => {
            if (key === 'children') {
                value.forEach(child => {
                    const childElement = child.type
                        ? this.renderElement(child, element)
                        : document.createTextNode(child.props.nodeValue);
                    element.appendChild(childElement);
                });
            } else if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                element[key] = value;
            }
        });

        container.appendChild(element);
        return element;
    }

    /**
     * 在指定元素之前插入HTML
     * @param {Element} el - 目标元素
     * @param {string} htmlString - 要插入的HTML字符串
     */
    static insertBefore(el, htmlString) {
        if (!el || !htmlString) {
            console.error('Element and HTML string are required');
            return;
        }

        try {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
            const fragment = document.createDocumentFragment();
            
            while (tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
            }
            
            el.parentNode.insertBefore(fragment, el);
        } catch (e) {
            console.error('Error inserting HTML:', e);
        }
    }

    /**
     * 函数防抖
     * @param {Function} fn - 要执行的函数
     * @param {number} delay - 延迟时间（毫秒）
     * @param {boolean} [immediate=false] - 是否立即执行
     * @returns {Function} 防抖后的函数
     */
    static debounce(fn, delay, immediate = false) {
        let timer = null;
        return function (...args) {
            const context = this;

            if (timer) clearTimeout(timer);

            if (immediate && !timer) {
                fn.apply(context, args);
            }

            timer = setTimeout(() => {
                if (!immediate) {
                    fn.apply(context, args);
                }
                timer = null;
            }, delay);
        };
    }

    /**
     * 函数节流
     * @param {Function} fn - 要执行的函数
     * @param {number} delay - 延迟时间（毫秒）
     * @returns {Function} 节流后的函数
     */
    static throttle(fn, delay) {
        let timer = null;
        let lastTime = 0;

        return function (...args) {
            const context = this;
            const now = Date.now();

            if (now - lastTime >= delay) {
                fn.apply(context, args);
                lastTime = now;
            } else if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                    lastTime = Date.now();
                    timer = null;
                }, delay - (now - lastTime));
            }
        };
    }

    /**
     * 函数柯里化
     * @param {Function} fn - 要柯里化的函数
     * @returns {Function} 柯里化后的函数
     */
    static curry(fn) {
        const arity = fn.length;

        return function curried(...args) {
            if (args.length >= arity) {
                return fn.apply(this, args);
            }

            return function (...moreArgs) {
                return curried.apply(this, [...args, ...moreArgs]);
            };
        };
    }

    /**
     * 函数组合
     * @param {...Function} fns - 要组合的函数
     * @returns {Function} 组合后的函数
     */
    static compose(...fns) {
        if (fns.length === 0) return arg => arg;
        if (fns.length === 1) return fns[0];

        return fns.reduce((a, b) => (...args) => a(b(...args)));
    }

    /**
     * 函数管道
     * @param {...Function} fns - 要管道化的函数
     * @returns {Function} 管道化后的函数
     */
    static pipe(...fns) {
        if (fns.length === 0) return arg => arg;
        if (fns.length === 1) return fns[0];

        return fns.reduce((a, b) => (...args) => b(a(...args)));
    }

    /**
     * 函数记忆化
     * @param {Function} fn - 要记忆化的函数
     * @param {Function} [resolver] - 缓存键生成函数
     * @returns {Function} 记忆化后的函数
     */
    static memoize(fn, resolver) {
        const memoized = function (...args) {
            const key = resolver ? resolver.apply(this, args) : JSON.stringify(args);
            const cache = memoized.cache;

            if (cache.has(key)) {
                return cache.get(key);
            }

            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        };

        memoized.cache = new Map();
        return memoized;
    }

    /**
     * 函数重试
     * @param {Function} fn - 要重试的函数
     * @param {number} times - 重试次数
     * @param {number} delay - 重试延迟（毫秒）
     * @returns {Function} 包装后的函数
     */
    static retry(fn, times = 3, delay = 300) {
        return async function (...args) {
            let error;
            for (let i = 0; i < times; i++) {
                try {
                    return await fn.apply(this, args);
                } catch (err) {
                    error = err;
                    if (i < times - 1) {
                        await new Promise(resolve => setTimeout(resolve, delay));
                    }
                }
            }
            throw error;
        };
    }

    /**
     * 函数超时
     * @param {Function} fn - 要包装的函数
     * @param {number} timeout - 超时时间（毫秒）
     * @returns {Function} 包装后的函数
     */
    static timeout(fn, timeout) {
        return async function (...args) {
            return Promise.race([
                fn.apply(this, args),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Function timeout')), timeout)
                )
            ]);
        };
    }

    /**
     * 函数重试直到成功
     * @param {Function} fn - 要重试的函数
     * @param {number} interval - 重试间隔（毫秒）
     * @param {number} timeout - 超时时间（毫秒）
     * @returns {Promise} Promise对象
     */
    static retryUntil(fn, interval = 1000, timeout = 0) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const attempt = async () => {
                try {
                    const result = await fn();
                    resolve(result);
                } catch (error) {
                    const elapsed = Date.now() - startTime;
                    if (timeout && elapsed >= timeout) {
                        reject(new Error('Retry timeout'));
                        return;
                    }
                    setTimeout(attempt, interval);
                }
            };
            attempt();
        });
    }

    /**
     * 函数限制并发
     * @param {Function} fn - 要限制的函数
     * @param {number} limit - 并发限制数
     * @returns {Function} 限制后的函数
     */
    static limitConcurrency(fn, limit) {
        const queue = [];
        let running = 0;

        const runNext = async () => {
            if (running >= limit || queue.length === 0) return;

            running++;
            const { args, resolve, reject } = queue.shift();

            try {
                const result = await fn.apply(this, args);
                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
                running--;
                runNext();
            }
        };

        return function (...args) {
            return new Promise((resolve, reject) => {
                queue.push({ args, resolve, reject });
                runNext();
            });
        };
    }

    /**
     * 函数重载
     * @returns {Function} 重载函数
     */
    static overload() {
        const fns = new Map();

        return {
            addImpl(fn, ...types) {
                fns.set(types.join(','), fn);
                return this;
            },
            
            implementation(...args) {
                const types = args.map(arg => 
                    arg === null ? 'null' : 
                    Array.isArray(arg) ? 'array' : 
                    typeof arg
                ).join(',');

                const fn = fns.get(types);
                if (!fn) {
                    throw new Error(`No implementation found for types: ${types}`);
                }

                return fn.apply(this, args);
            }
        };
    }

    /**
     * 函数装饰器
     * @param {Function} fn - 要装饰的函数
     * @param {...Function} decorators - 装饰器函数
     * @returns {Function} 装饰后的函数
     */
    static decorate(fn, ...decorators) {
        return decorators.reduce((decorated, decorator) => decorator(decorated), fn);
    }

    /**
     * 异步函数串行执行
     * @param {...Function} fns - 要执行的异步函数
     * @returns {Promise} Promise对象
     */
    static series(...fns) {
        return async function (...args) {
            let result = args;
            for (const fn of fns) {
                result = [await fn.apply(this, result)];
            }
            return result[0];
        };
    }

    /**
     * 异步函数并行执行
     * @param {...Function} fns - 要执行的异步函数
     * @returns {Promise} Promise对象
     */
    static parallel(...fns) {
        return function (...args) {
            return Promise.all(fns.map(fn => fn.apply(this, args)));
        };
    }

    /**
     * 创建一个只执行一次的函数
     * @param {Function} fn - 要包装的函数
     * @returns {Function} 包装后的函数
     */
    static once(fn) {
        let called = false;
        let result;

        return function (...args) {
            if (!called) {
                called = true;
                result = fn.apply(this, args);
            }
            return result;
        };
    }

    /**
     * 延迟执行函数
     * @param {Function} fn - 要延迟的函数
     * @param {number} delay - 延迟时间（毫秒）
     * @param {...*} args - 函数参数
     * @returns {Promise} Promise对象
     */
    static delay(fn, delay, ...args) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(fn.apply(this, args));
            }, delay);
        });
    }

    /**
     * 函数执行时间测量
     * @param {Function} fn - 要测量的函数
     * @returns {Function} 包装后的函数
     */
    static measure(fn) {
        return function (...args) {
            const start = performance.now();
            const result = fn.apply(this, args);
            const end = performance.now();
            console.log(`Function execution time: ${end - start}ms`);
            return result;
        };
    }
}

window.DC = window.DC || {};
window.DC.Function = dcFunction;