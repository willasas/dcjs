/**
 * 数组处理工具类
 */
class dcArray {
    constructor() {}

    /**
     * 数组去重
     * @param {Array} arr - 输入数组
     * @param {string} [key] - 对象数组去重时的键名
     * @returns {Array} 去重后的数组
     */
    static unique(arr, key) {
        if (!Array.isArray(arr)) return [];
        if (key) {
            const seen = new Set();
            return arr.filter(item => {
                const value = item[key];
                if (seen.has(value)) return false;
                seen.add(value);
                return true;
            });
        }
        return [...new Set(arr)];
    }

    /**
     * 数组扁平化
     * @param {Array} arr - 输入数组
     * @param {number} [depth=Infinity] - 扁平化深度
     * @returns {Array} 扁平化后的数组
     */
    static flatten(arr, depth = Infinity) {
        if (!Array.isArray(arr)) return [];
        return arr.flat(depth);
    }

    /**
     * 数组分组
     * @param {Array} arr - 输入数组
     * @param {string|Function} key - 分组依据
     * @returns {Object} 分组后的对象
     */
    static groupBy(arr, key) {
        if (!Array.isArray(arr)) return {};
        return arr.reduce((groups, item) => {
            const groupKey = typeof key === 'function' ? key(item) : item[key];
            (groups[groupKey] = groups[groupKey] || []).push(item);
            return groups;
        }, {});
    }

    /**
     * 数组排序
     * @param {Array} arr - 输入数组
     * @param {string|Function} [key] - 排序依据
     * @param {boolean} [desc=false] - 是否降序
     * @returns {Array} 排序后的数组
     */
    static sort(arr, key, desc = false) {
        if (!Array.isArray(arr)) return [];
        const sorted = [...arr];
        
        sorted.sort((a, b) => {
            let valueA = typeof key === 'function' ? key(a) : (key ? a[key] : a);
            let valueB = typeof key === 'function' ? key(b) : (key ? b[key] : b);

            if (typeof valueA === 'string') valueA = valueA.toLowerCase();
            if (typeof valueB === 'string') valueB = valueB.toLowerCase();

            if (valueA < valueB) return desc ? 1 : -1;
            if (valueA > valueB) return desc ? -1 : 1;
            return 0;
        });

        return sorted;
    }

    /**
     * 数组交集
     * @param {Array} arr1 - 第一个数组
     * @param {Array} arr2 - 第二个数组
     * @param {string} [key] - 对象数组比较的键名
     * @returns {Array} 交集数组
     */
    static intersection(arr1, arr2, key) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
        
        if (key) {
            const set = new Set(arr2.map(item => item[key]));
            return arr1.filter(item => set.has(item[key]));
        }
        
        return arr1.filter(item => arr2.includes(item));
    }

    /**
     * 数组差集
     * @param {Array} arr1 - 第一个数组
     * @param {Array} arr2 - 第二个数组
     * @param {string} [key] - 对象数组比较的键名
     * @returns {Array} 差集数组
     */
    static difference(arr1, arr2, key) {
        if (!Array.isArray(arr1)) return [];
        if (!Array.isArray(arr2)) return arr1;

        if (key) {
            const set = new Set(arr2.map(item => item[key]));
            return arr1.filter(item => !set.has(item[key]));
        }

        return arr1.filter(item => !arr2.includes(item));
    }

    /**
     * 数组并集
     * @param {Array} arr1 - 第一个数组
     * @param {Array} arr2 - 第二个数组
     * @param {string} [key] - 对象数组比较的键名
     * @returns {Array} 并集数组
     */
    static union(arr1, arr2, key) {
        if (!Array.isArray(arr1) && !Array.isArray(arr2)) return [];
        if (!Array.isArray(arr1)) return arr2;
        if (!Array.isArray(arr2)) return arr1;

        if (key) {
            const combined = [...arr1, ...arr2];
            return this.unique(combined, key);
        }

        return [...new Set([...arr1, ...arr2])];
    }

    /**
     * 数组切片
     * @param {Array} arr - 输入数组
     * @param {number} size - 切片大小
     * @returns {Array} 切片数组
     */
    static chunk(arr, size) {
        if (!Array.isArray(arr) || size < 1) return [];
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }

    /**
     * 数组洗牌
     * @param {Array} arr - 输入数组
     * @returns {Array} 打乱后的数组
     */
    static shuffle(arr) {
        if (!Array.isArray(arr)) return [];
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * 获取数组中的随机元素
     * @param {Array} arr - 输入数组
     * @param {number} [count=1] - 获取元素的数量
     * @returns {*|Array} 随机元素或元素数组
     */
    static random(arr, count = 1) {
        if (!Array.isArray(arr) || arr.length === 0) return count === 1 ? null : [];
        if (count === 1) return arr[Math.floor(Math.random() * arr.length)];
        
        const shuffled = this.shuffle(arr);
        return shuffled.slice(0, Math.min(count, arr.length));
    }

    /**
     * 反转数组
     * @param {Array} arr - 要反转的数组
     * @returns {Array} 反转后的数组
     */
    static reverse(arr) {
        if (!Array.isArray(arr)) {
            throw new Error('Input must be an array');
        }
        return arr.reverse();
    }

    /**
     * 数组求和
     * @param {Array} arr - 输入数组
     * @param {string|Function} [key] - 对象数组求和的键名或函数
     * @returns {number} 求和结果
     */
    static sum(arr, key) {
        if (!Array.isArray(arr)) return 0;
        return arr.reduce((sum, item) => {
            const value = typeof key === 'function' ? key(item) : (key ? item[key] : item);
            return sum + (Number(value) || 0);
        }, 0);
    }

    /**
     * 数组平均值
     * @param {Array} arr - 输入数组
     * @param {string|Function} [key] - 对象数组求平均值的键名或函数
     * @returns {number} 平均值
     */
    static average(arr, key) {
        if (!Array.isArray(arr) || arr.length === 0) return 0;
        return this.sum(arr, key) / arr.length;
    }

    /**
     * 数组最大值
     * @param {Array} arr - 输入数组
     * @param {string|Function} [key] - 对象数组求最大值的键名或函数
     * @returns {*} 最大值
     */
    static max(arr, key) {
        if (!Array.isArray(arr) || arr.length === 0) return null;
        if (key) {
            return arr.reduce((max, item) => {
                const value = typeof key === 'function' ? key(item) : item[key];
                return value > max ? value : max;
            }, typeof key === 'function' ? key(arr[0]) : arr[0][key]);
        }
        return Math.max(...arr);
    }

    /**
     * 数组最小值
     * @param {Array} arr - 输入数组
     * @param {string|Function} [key] - 对象数组求最小值的键名或函数
     * @returns {*} 最小值
     */
    static min(arr, key) {
        if (!Array.isArray(arr) || arr.length === 0) return null;
        if (key) {
            return arr.reduce((min, item) => {
                const value = typeof key === 'function' ? key(item) : item[key];
                return value < min ? value : min;
            }, typeof key === 'function' ? key(arr[0]) : arr[0][key]);
        }
        return Math.min(...arr);
    }

    /**
     * 数组转树形结构
     * @param {Array} arr - 输入数组
     * @param {Object} options - 配置选项
     * @param {string} [options.id='id'] - ID字段名
     * @param {string} [options.parentId='parentId'] - 父ID字段名
     * @param {string} [options.children='children'] - 子节点字段名
     * @returns {Array} 树形结构数组
     */
    static toTree(arr, options = {}) {
        if (!Array.isArray(arr)) return [];
        
        const {
            id = 'id',
            parentId = 'parentId',
            children = 'children'
        } = options;

        const map = {};
        const roots = [];

        // 创建节点映射
        arr.forEach(node => {
            map[node[id]] = { ...node, [children]: [] };
        });

        // 构建树形结构
        arr.forEach(node => {
            const parent = map[node[parentId]];
            if (parent) {
                parent[children].push(map[node[id]]);
            } else {
                roots.push(map[node[id]]);
            }
        });

        return roots;
    }

    /**
     * 树形结构转数组
     * @param {Array} tree - 树形结构数组
     * @param {string} [childrenKey='children'] - 子节点字段名
     * @returns {Array} 扁平化数组
     */
    static fromTree(tree, childrenKey = 'children') {
        if (!Array.isArray(tree)) return [];
        
        const result = [];
        const stack = [...tree];

        while (stack.length) {
            const node = stack.pop();
            const children = node[childrenKey];
            
            const clonedNode = { ...node };
            delete clonedNode[childrenKey];
            result.push(clonedNode);

            if (Array.isArray(children)) {
                stack.push(...children);
            }
        }

        return result;
    }
}

window.DC = window.DC || {};
window.DC.Array = dcArray;