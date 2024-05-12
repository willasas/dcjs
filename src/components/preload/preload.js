/**
 * 图片预加载
 * 
 * 本模块提供了一个图片预加载的功能，支持通过回调函数对加载完成、进度和错误进行处理。
 * 可以通过构造函数 Preload 传入图片数组和选项进行初始化。
 */
(function() {
    // 确定全局对象，兼容多种环境
    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    // 工具方法模块
    var Util = {
        extend: function(target) {
            // 混合多个对象的属性到目标对象
            for (var i = 1, len = arguments.length; i < len; i++) {
                for (var prop in arguments[i]) {
                    if (arguments[i].hasOwnProperty(prop)) {
                        target[prop] = arguments[i][prop];
                    }
                }
            }
            return target;
        },
        isArray: Array.isArray,
        isValidListener: function(listener) {
            // 检查监听器是否有效（函数或含有有效监听器属性的对象）
            return typeof listener === 'function' ||
                (listener && typeof listener === 'object' && Util.isValidListener(listener.listener));
        },
        indexOf: function(array, item) {
            // 返回指定元素在数组中的索引，若不存在则返回-1
            return array.indexOf ? array.indexOf(item) : -1;
        }
    };

    /**
     * 图片预加载类
     * @param {Array} pics 图片地址数组
     * @param {Object} options 配置选项，可选
     * @throws {Error} 如果pics参数不是数组类型，则抛出错误
     */
    function Preload(pics, options) {
        if (!Util.isArray(pics)) {
            throw new Error('pics must be an array type');
        }

        this.pics = pics;
        this.options = Util.extend({}, this.constructor.defaultOptions, options);
        this.index = this.failNum = 0;

        // 如果没有图片则直接执行完成回调
        if (this.pics.length === 0) {
            this.options.complete(0, 0);
            return;
        }

        this.init();
    }

    // 版本号
    Preload.VERSION = '1.0.0';

    Preload.defaultOptions = {
        complete: function() {}, // 加载完成的回调函数
        progress: function() {}, // 加载进度的回调函数
        error: function() {} // 添加错误处理回调
    };

    var proto = Preload.prototype;

    /**
     * 初始化函数，开始加载图片
    */
    proto.init = function() {
        var self = this;
        var loadPromises = [];

        this.pics.forEach(function(src) {
            loadPromises.push(self.loadImg(src));
        });

        Promise.all(loadPromises)
            .then(function() {
                self.options.complete(self.pics.length - self.failNum, self.failNum);
            })
            .catch(function() {
                // 如果有图片加载失败，调用错误处理回调
                self.options.error();
            });
    };

    /**
     * 加载单张图片
     * @param  {String} src 图片地址
     * @return {Promise} 图片加载完成的Promise对象
     */
    proto.loadImg = function(src) {
        var self = this;
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                // 防止重复加载
                img.onload = null;
                self.progress(src, 'success');
                resolve();
            };
            img.onerror = function() {
                // 防止重复调用
                img.onerror = null;
                self.progress(src, 'fail');
                reject();
            };
            img.src = src;
        });
    };

    /**
     * 更新加载进度
     * 
     * @param {string} src 图片地址
     * @param {string} type 加载状态：'success' 或 'fail'
     */
    proto.progress = function(src, type) {
        if (type === 'fail') this.failNum++;
        this.index++;
        this.options.progress(this.index, this.pics.length, type);

        if (this.index === this.pics.length) {
            this.options.complete(this.pics.length - this.failNum, this.failNum);
        }
    };

    // 模块导出，兼容 CommonJS 和全局变量
    if (typeof exports !== 'undefined' && !exports.nodeType) {
        if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
            exports.Preload = Preload;
        }
        exports.Preload = Preload;
    } else {
        root.Preload = Preload;
    };
}());


// 示例
var pics = ['../../assets/illustration-01.png', '../../assets/illustration-02.png', '../../assets/illustration-03.png', '../../assets/illustration-04.png'];
var options = {
    complete: function(successfulCount, failedCount) {
        console.log('Loading complete: ' + successfulCount + ' loaded, ' + failedCount + ' failed.');
    },
    progress: function(currentIndex, total, status) {
        console.log('Loading progress: ' + currentIndex + ' of ' + total + ' (' + status + ')');
    },
    error: function() {
        console.log('An error occurred during image loading.');
    }
};
var preloadInstance = new Preload(pics, options);