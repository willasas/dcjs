/**
 * 对象处理工具类
 */
class dcObject {
    constructor() {}

    /**
     * 深拷贝对象
     * @param {*} obj - 输入对象
     * @returns {*} 深拷贝后的对象
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        
        // 处理日期对象
        if (obj instanceof Date) return new Date(obj);
        
        // 处理正则表达式
        if (obj instanceof RegExp) return new RegExp(obj);
        
        // 处理数组
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepClone(item));
        }
        
        // 处理普通对象
        const cloned = {};
        Object.keys(obj).forEach(key => {
            cloned[key] = this.deepClone(obj[key]);
        });
        
        return cloned;
    }

    /**
     * 获取对象的键值对
     * @param {Object} obj - 要处理的对象
     * @returns {Array} 键值对数组
     */
    static entries(obj) {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error('Input must be a non-null object');
        }
        return Object.entries(obj);
    }

    /**
     * 合并对象
     * @param {...Object} objects - 要合并的对象列表
     * @returns {Object} 合并后的对象
     */
    static merge(...objects) {
        return objects.reduce((merged, obj) => {
            if (obj === null || typeof obj !== 'object') return merged;
            
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                if (value === null || typeof value !== 'object') {
                    merged[key] = value;
                } else if (Array.isArray(value)) {
                    merged[key] = Array.isArray(merged[key])
                        ? [...merged[key], ...value]
                        : [...value];
                } else {
                    merged[key] = this.merge(merged[key] || {}, value);
                }
            });
            
            return merged;
        }, {});
    }

    /**
     * 获取对象指定路径的值
     * @param {Object} obj - 输入对象
     * @param {string} path - 属性路径
     * @param {*} [defaultValue] - 默认值
     * @returns {*} 属性值
     */
    static get(obj, path, defaultValue) {
        if (!obj || !path) return defaultValue;
        
        const keys = path.split('.');
        let result = obj;
        
        for (const key of keys) {
            if (result === null || typeof result !== 'object') {
                return defaultValue;
            }
            result = result[key];
            if (result === undefined) {
                return defaultValue;
            }
        }
        
        return result;
    }

    /**
     * 设置对象指定路径的值
     * @param {Object} obj - 输入对象
     * @param {string} path - 属性路径
     * @param {*} value - 要设置的值
     * @returns {Object} 修改后的对象
     */
    static set(obj, path, value) {
        if (!obj || !path) return obj;
        
        const keys = path.split('.');
        let current = obj;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current)) {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = value;
        return obj;
    }

    /**
     * 删除对象指定路径的值
     * @param {Object} obj - 输入对象
     * @param {string} path - 属性路径
     * @returns {boolean} 是否删除成功
     */
    static unset(obj, path) {
        if (!obj || !path) return false;
        
        const keys = path.split('.');
        let current = obj;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current)) return false;
            current = current[key];
        }
        
        return delete current[keys[keys.length - 1]];
    }

    /**
     * 检查对象是否包含指定路径
     * @param {Object} obj - 输入对象
     * @param {string} path - 属性路径
     * @returns {boolean} 是否包含
     */
    static has(obj, path) {
        if (!obj || !path) return false;
        
        const keys = path.split('.');
        let current = obj;
        
        for (const key of keys) {
            if (current === null || typeof current !== 'object') {
                return false;
            }
            if (!(key in current)) {
                return false;
            }
            current = current[key];
        }
        
        return true;
    }

    /**
     * 选择对象的指定属性
     * @param {Object} obj - 输入对象
     * @param {string[]} keys - 属性名数组
     * @returns {Object} 新对象
     */
    static pick(obj, keys) {
        if (!obj || !Array.isArray(keys)) return {};
        
        return keys.reduce((picked, key) => {
            if (key in obj) {
                picked[key] = obj[key];
            }
            return picked;
        }, {});
    }

    /**
     * 忽略对象的指定属性
     * @param {Object} obj - 输入对象
     * @param {string[]} keys - 属性名数组
     * @returns {Object} 新对象
     */
    static omit(obj, keys) {
        if (!obj) return {};
        if (!Array.isArray(keys)) return { ...obj };
        
        return Object.keys(obj).reduce((omitted, key) => {
            if (!keys.includes(key)) {
                omitted[key] = obj[key];
            }
            return omitted;
        }, {});
    }

    /**
     * 扁平化对象
     * @param {Object} obj - 输入对象
     * @param {string} [prefix=''] - 前缀
     * @returns {Object} 扁平化后的对象
     */
    static flatten(obj, prefix = '') {
        if (!obj) return {};
        
        return Object.keys(obj).reduce((flattened, key) => {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;
            
            if (value === null || typeof value !== 'object') {
                flattened[newKey] = value;
            } else if (!Array.isArray(value)) {
                Object.assign(flattened, this.flatten(value, newKey));
            } else {
                flattened[newKey] = value;
            }
            
            return flattened;
        }, {});
    }

    /**
     * 对象转查询字符串
     * @param {Object} obj - 输入对象
     * @returns {string} 查询字符串
     */
    static toQueryString(obj) {
        if (!obj) return '';
        
        return Object.entries(obj)
            .filter(([_, value]) => value !== null && value !== undefined)
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return value
                        .map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
                        .join('&');
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            })
            .join('&');
    }

    /**
     * 查询字符串转对象
     * @param {string} queryString - 查询字符串
     * @returns {Object} 转换后的对象
     */
    static fromQueryString(queryString) {
        if (!queryString) return {};
        
        const query = {};
        const pairs = queryString.replace(/^\?/, '').split('&');
        
        pairs.forEach(pair => {
            if (!pair) return;
            const [key, value] = pair.split('=').map(decodeURIComponent);
            
            if (key in query) {
                query[key] = Array.isArray(query[key])
                    ? [...query[key], value]
                    : [query[key], value];
            } else {
                query[key] = value;
            }
        });
        
        return query;
    }

    /**
     * 比较两个对象是否相等
     * @param {Object} obj1 - 第一个对象
     * @param {Object} obj2 - 第二个对象
     * @returns {boolean} 是否相等
     */
    static isEqual(obj1, obj2) {
        if (obj1 === obj2) return true;
        if (!obj1 || !obj2) return false;
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
        
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        
        if (keys1.length !== keys2.length) return false;
        
        return keys1.every(key => {
            const val1 = obj1[key];
            const val2 = obj2[key];
            
            if (val1 === val2) return true;
            if (!val1 || !val2) return false;
            if (typeof val1 !== 'object' || typeof val2 !== 'object') return false;
            
            return this.isEqual(val1, val2);
        });
    }

    /**
     * 获取对象的所有键路径
     * @param {Object} obj - 输入对象
     * @param {string} [prefix=''] - 前缀
     * @returns {string[]} 键路径数组
     */
    static paths(obj, prefix = '') {
        if (!obj || typeof obj !== 'object') return [];
        
        return Object.keys(obj).reduce((paths, key) => {
            const value = obj[key];
            const newPath = prefix ? `${prefix}.${key}` : key;
            
            paths.push(newPath);
            
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                paths.push(...this.paths(value, newPath));
            }
            
            return paths;
        }, []);
    }

    /**
     * 对象属性重命名
     * @param {Object} obj - 输入对象
     * @param {Object} mapping - 属性映射
     * @returns {Object} 重命名后的对象
     */
    static rename(obj, mapping) {
        if (!obj || !mapping) return obj;
        
        return Object.keys(obj).reduce((renamed, key) => {
            const newKey = mapping[key] || key;
            renamed[newKey] = obj[key];
            return renamed;
        }, {});
    }

    /**
     * 过滤对象属性
     * @param {Object} obj - 输入对象
     * @param {Function} predicate - 过滤函数
     * @returns {Object} 过滤后的对象
     */
    static filter(obj, predicate) {
        if (!obj || typeof predicate !== 'function') return {};
        
        return Object.keys(obj).reduce((filtered, key) => {
            if (predicate(obj[key], key, obj)) {
                filtered[key] = obj[key];
            }
            return filtered;
        }, {});
    }
}

window.DC = window.DC || {};
window.DC.Object = dcObject;