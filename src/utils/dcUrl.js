/**
 * URL处理工具类
 */
class dcUrl {
    constructor() {}

    /**
     * 解析URL
     * @param {string} url - URL字符串
     * @returns {Object} 解析后的URL对象
     */
    static parse(url) {
        const parser = document.createElement('a');
        parser.href = url;

        return {
            protocol: parser.protocol.replace(':', ''),
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            hash: parser.hash,
            query: this.parseQuery(parser.search)
        };
    }

    /**
     * 解析查询字符串
     * @param {string} queryString - 查询字符串
     * @returns {Object} 查询参数对象
     */
    static parseQuery(queryString) {
        const query = {};
        const search = queryString.replace(/^\?/, '');
        
        if (!search) return query;

        search.split('&').forEach(pair => {
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
     * 构建URL
     * @param {string} baseUrl - 基础URL
     * @param {Object} params - 查询参数
     * @returns {string} 完整URL
     */
    static build(baseUrl, params = {}) {
        const url = new URL(baseUrl);
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => url.searchParams.append(key, v));
            } else if (value !== null && value !== undefined) {
                url.searchParams.set(key, value);
            }
        });
        return url.toString();
    }

    /**
     * 获取URL参数
     * @param {string} name - 参数名
     * @param {string} [url] - URL字符串，默认为当前页面URL
     * @returns {string|null} 参数值
     */
    static getParam(name, url) {
        const search = url 
            ? new URL(url).searchParams 
            : new URLSearchParams(window.location.search);
        return search.get(name);
    }

    /**
     * 获取所有URL参数
     * @param {string} [url] - URL字符串，默认为当前页面URL
     * @returns {Object} 参数对象
     */
    static getParams(url) {
        const search = url 
            ? new URL(url).searchParams 
            : new URLSearchParams(window.location.search);
        const params = {};
        for (const [key, value] of search.entries()) {
            if (key in params) {
                params[key] = Array.isArray(params[key])
                    ? [...params[key], value]
                    : [params[key], value];
            } else {
                params[key] = value;
            }
        }
        return params;
    }

    /**
     * 修改URL参数
     * @param {string} url - URL字符串
     * @param {Object} updates - 要更新的参数
     * @returns {string} 新的URL
     */
    static updateParams(url, updates) {
        const parsedUrl = new URL(url);
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                parsedUrl.searchParams.delete(key);
            } else if (Array.isArray(value)) {
                parsedUrl.searchParams.delete(key);
                value.forEach(v => parsedUrl.searchParams.append(key, v));
            } else {
                parsedUrl.searchParams.set(key, value);
            }
        });
        return parsedUrl.toString();
    }

    /**
     * 删除URL参数
     * @param {string} url - URL字符串
     * @param {string|string[]} params - 要删除的参数名
     * @returns {string} 新的URL
     */
    static removeParams(url, params) {
        const parsedUrl = new URL(url);
        const paramsToRemove = Array.isArray(params) ? params : [params];
        paramsToRemove.forEach(param => {
            parsedUrl.searchParams.delete(param);
        });
        return parsedUrl.toString();
    }

    /**
     * 获取URL的文件扩展名
     * @param {string} url - URL字符串
     * @returns {string} 文件扩展名
     */
    static getExtension(url) {
        try {
            const pathname = new URL(url).pathname;
            const match = pathname.match(/\.([^.]+)$/);
            return match ? match[1].toLowerCase() : '';
        } catch {
            return '';
        }
    }

    /**
     * 检查URL是否为绝对路径
     * @param {string} url - URL字符串
     * @returns {boolean} 是否为绝对路径
     */
    static isAbsolute(url) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    }

    /**
     * 合并URL路径
     * @param {...string} paths - URL路径片段
     * @returns {string} 合并后的URL
     */
    static join(...paths) {
        return paths
            .map(path => path.replace(/^\/+|\/+$/g, ''))
            .filter(Boolean)
            .join('/');
    }

    /**
     * 标准化URL
     * @param {string} url - URL字符串
     * @returns {string} 标准化后的URL
     */
    static normalize(url) {
        try {
            return new URL(url).toString();
        } catch {
            return url;
        }
    }

    /**
     * 检查URL是否有效
     * @param {string} url - URL字符串
     * @returns {boolean} 是否有效
     */
    static isValid(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 获取URL的域名
     * @param {string} url - URL字符串
     * @returns {string} 域名
     */
    static getDomain(url) {
        try {
            return new URL(url).hostname;
        } catch {
            return '';
        }
    }

    /**
     * 获取相对路径
     * @param {string} from - 源路径
     * @param {string} to - 目标路径
     * @returns {string} 相对路径
     */
    static getRelativePath(from, to) {
        const fromParts = from.split('/').filter(Boolean);
        const toParts = to.split('/').filter(Boolean);

        const length = Math.min(fromParts.length, toParts.length);
        let commonLength = 0;

        for (let i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) break;
            commonLength++;
        }

        const upCount = fromParts.length - commonLength;
        const relativeParts = [...Array(upCount).fill('..'), ...toParts.slice(commonLength)];

        return relativeParts.join('/');
    }
}
const dcUrl = new dcUrl();