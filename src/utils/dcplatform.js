/**
 * 环境判断工具类
 * 提供各种环境检测方法
 */
class dcPlatform {
    constructor() {
        // 缓存 userAgent，避免重复获取
        this.ua = navigator.userAgent.toLowerCase();
        this.platform = navigator.platform.toLowerCase();
        
        // 初始化时进行一次检测
        this._initDetection();
    }

    /**
     * 初始化检测
     * @private
     */
    _initDetection() {
        // 设备检测结果缓存
        this._cache = {
            isPC: this._detectPC(),
            isMobile: this._detectMobile(),
            isTablet: this._detectTablet(),
            isQQ: this._detectQQ(),
            isWeChat: this._detectWeChat(),
            isInGame: this._detectInGame(),
            isWeChatMiniProgram: this._detectWeChatMiniProgram(),
            isAlipayMiniProgram: this._detectAlipayMiniProgram(),
            isQQMiniProgram: this._detectQQMiniProgram(),
            isWebkit: this._detectWebkit(),
            isOpera: this._detectOpera(),
            isMozilla: this._detectMozilla(),
            isChrome: this._detectChrome(),
            isFirefox: this._detectFirefox(),
            isSafari: this._detectSafari(),
            isQQApp: this._detectQQApp(),
            isWeChatApp: this._detectWeChatApp(),
            isQQMobileBrowser: this._detectQQMobileBrowser(),
            isQQBrowser: this._detectQQBrowser(),
            isIPad: this._detectIPad(),
            isIPhone: this._detectIPhone(),
            isIPod: this._detectIPod(),
            isAndroid: this._detectAndroid(),
            isIOS: this._detectIOS(),
            isFullscreen: this._detectFullscreen(),
            isTV: this._detectTV()
        };
    }

    /**
     * 检测是否为PC端
     * @private
     */
    _detectPC() {
        return !this._detectMobile() && !this._detectTablet();
    }

    /**
     * 检测是否为移动端
     * @private
     */
    _detectMobile() {
        return /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(this.ua);
    }

    /**
     * 检测是否为平板设备
     * @private
     */
    _detectTablet() {
        return /ipad|tablet/i.test(this.ua) || 
               (this._detectAndroid() && !/mobile/i.test(this.ua));
    }

    /**
     * 检测是否为QQ环境
     * @private
     */
    _detectQQ() {
        return /qq\//i.test(this.ua);
    }

    /**
     * 检测是否为微信环境
     * @private
     */
    _detectWeChat() {
        return /micromessenger/i.test(this.ua);
    }

    /**
     * 检测是否为游戏内
     * @private
     */
    _detectInGame() {
        return /ingame/i.test(this.ua);
    }

    /**
     * 检测是否为微信小程序
     * @private
     */
    _detectWeChatMiniProgram() {
        return typeof window !== 'undefined' && 
               window.__wxjs_environment === 'miniprogram';
    }

    /**
     * 检测是否为支付宝小程序
     * @private
     */
    _detectAlipayMiniProgram() {
        return /alipay/i.test(this.ua) && /miniprogram/i.test(this.ua);
    }

    /**
     * 检测是否为QQ小程序
     * @private
     */
    _detectQQMiniProgram() {
        return /qq/i.test(this.ua) && /miniprogram/i.test(this.ua);
    }

    /**
     * 检测是否为webkit内核浏览器
     * @private
     */
    _detectWebkit() {
        return /webkit/i.test(this.ua);
    }

    /**
     * 检测是否为Opera浏览器
     * @private
     */
    _detectOpera() {
        return /opera|opr/i.test(this.ua);
    }

    /**
     * 检测是否为Mozilla浏览器
     * @private
     */
    _detectMozilla() {
        return /mozilla/i.test(this.ua) && !/webkit|gecko/i.test(this.ua);
    }

    /**
     * 检测是否为Chrome浏览器
     * @private
     */
    _detectChrome() {
        return /chrome/i.test(this.ua) && !/edge|opr/i.test(this.ua);
    }

    /**
     * 检测是否为Firefox浏览器
     * @private
     */
    _detectFirefox() {
        return /firefox/i.test(this.ua);
    }

    /**
     * 检测是否为Safari浏览器
     * @private
     */
    _detectSafari() {
        return /safari/i.test(this.ua) && !/chrome|android/i.test(this.ua);
    }

    /**
     * 检测是否为QQ App
     * @private
     */
    _detectQQApp() {
        return /qq\//i.test(this.ua) && !/micromessenger/i.test(this.ua);
    }

    /**
     * 检测是否为微信App
     * @private
     */
    _detectWeChatApp() {
        return /micromessenger/i.test(this.ua);
    }

    /**
     * 检测是否为QQ手机端浏览器
     * @private
     */
    _detectQQMobileBrowser() {
        return /MQQBrowser/i.test(this.ua);
    }

    /**
     * 检测是否为QQ浏览器
     * @private
     */
    _detectQQBrowser() {
        return /\sQQBrowser/i.test(this.ua);
    }

    /**
     * 检测是否为iPad
     * @private
     */
    _detectIPad() {
        return /ipad/i.test(this.ua) || 
               (/macintosh/i.test(this.ua) && 'ontouchend' in document);
    }

    /**
     * 检测是否为iPhone
     * @private
     */
    _detectIPhone() {
        return /iphone/i.test(this.ua);
    }

    /**
     * 检测是否为iPod
     * @private
     */
    _detectIPod() {
        return /ipod/i.test(this.ua);
    }

    /**
     * 检测是否为Android设备
     * @private
     */
    _detectAndroid() {
        return /android/i.test(this.ua);
    }

    /**
     * 检测是否为iOS设备
     * @private
     */
    _detectIOS() {
        return /ipad|iphone|ipod/i.test(this.ua) ||
               (/macintosh/i.test(this.ua) && 'ontouchend' in document);
    }

    /**
     * 检测是否为全屏模式
     * @private
     */
    _detectFullscreen() {
        return !!(document.fullscreenElement ||
                 document.webkitFullscreenElement ||
                 document.mozFullScreenElement ||
                 document.msFullscreenElement);
    }

    /**
     * 检测是否为TV设备
     * @private
     */
    _detectTV() {
        return /smart-tv|smarttv|tv|webos|viera|netcast|nettv|roku|dlnadoc|ce-html/i.test(this.ua);
    }

    // 公共访问方法
    isPC() { return this._cache.isPC; }
    isMobile() { return this._cache.isMobile; }
    isTablet() { return this._cache.isTablet; }
    isQQ() { return this._cache.isQQ; }
    isWeChat() { return this._cache.isWeChat; }
    isInGame() { return this._cache.isInGame; }
    isWeChatMiniProgram() { return this._cache.isWeChatMiniProgram; }
    isAlipayMiniProgram() { return this._cache.isAlipayMiniProgram; }
    isQQMiniProgram() { return this._cache.isQQMiniProgram; }
    isWebkit() { return this._cache.isWebkit; }
    isOpera() { return this._cache.isOpera; }
    isMozilla() { return this._cache.isMozilla; }
    isChrome() { return this._cache.isChrome; }
    isFirefox() { return this._cache.isFirefox; }
    isSafari() { return this._cache.isSafari; }
    isQQApp() { return this._cache.isQQApp; }
    isWeChatApp() { return this._cache.isWeChatApp; }
    isQQMobileBrowser() { return this._cache.isQQMobileBrowser; }
    isQQBrowser() { return this._cache.isQQBrowser; }
    isIPad() { return this._cache.isIPad; }
    isIPhone() { return this._cache.isIPhone; }
    isIPod() { return this._cache.isIPod; }
    isAndroid() { return this._cache.isAndroid; }
    isIOS() { return this._cache.isIOS; }
    isTV() { return this._cache.isTV; }

    /**
     * 检查是否为全屏模式（实时检测）
     */
    isFullscreen() {
        return this._detectFullscreen();
    }

    /**
     * 获取当前设备类型
     * @returns {string} 设备类型：'mobile' | 'tablet' | 'pc' | 'tv'
     */
    getDeviceType() {
        if (this.isTV()) return 'tv';
        if (this.isTablet()) return 'tablet';
        if (this.isMobile()) return 'mobile';
        return 'pc';
    }

    /**
     * 获取操作系统信息
     * @returns {string} 操作系统类型
     */
    getOS() {
        if (this.isIOS()) return 'ios';
        if (this.isAndroid()) return 'android';
        if (/windows/i.test(this.platform)) return 'windows';
        if (/mac/i.test(this.platform)) return 'mac';
        if (/linux/i.test(this.platform)) return 'linux';
        return 'unknown';
    }

    /**
     * 获取浏览器信息
     * @returns {string} 浏览器类型
     */
    getBrowser() {
        if (this.isQQBrowser()) return 'qq';
        if (this.isChrome()) return 'chrome';
        if (this.isFirefox()) return 'firefox';
        if (this.isSafari()) return 'safari';
        if (this.isOpera()) return 'opera';
        if (this.isMozilla()) return 'mozilla';
        return 'unknown';
    }
}

// 创建单例实例
const dcPlatform = new dcPlatform();

// 导出工具类
export default dcPlatform;
