/**
 * 浏览器工具类
 */
class dcBrowser {
    constructor() {}

    /**
     * 加载CSS文件
     * @param {string} url - CSS文件的URL
     * @param {string} [type='link'] - 元素类型（默认为'link'）
     */
    static loadCss(url, type = 'link') {
        if (typeof url !== 'string') {
            console.error('URL must be a string');
            return;
        }

        const link = document.createElement(type);
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    /**
     * 加载JavaScript文件
     * @param {string} url - JavaScript文件的URL
     * @param {string} [type='script'] - 元素类型（默认为'script'）
     */
    static loadJs(url, type = 'script') {
        if (typeof url !== 'string') {
            console.error('URL must be a string');
            return;
        }

        const script = document.createElement(type);
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    /**
     * 预加载单个资源（CSS或JS）
     * @param {string} cssFile - CSS文件URL
     * @param {string} jsFile - JavaScript文件URL
     */
    static preloadResourcesSingle(cssFile, jsFile) {
        if (cssFile) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = cssFile;
            document.head.appendChild(link);
        }

        if (jsFile) {
            const script = document.createElement('link');
            script.rel = 'preload';
            script.as = 'script';
            script.href = jsFile;
            document.head.appendChild(script);
        }
    }

    /**
     * 预加载多个资源
     * @param {string[]} cssFiles - CSS文件URL数组
     * @param {string[]} jsFiles - JavaScript文件URL数组
     */
    static preloadResources(cssFiles = [], jsFiles = []) {
        cssFiles.forEach(file => this.preloadSingleFile(file, 'style'));
        jsFiles.forEach(file => this.preloadSingleFile(file, 'script'));
    }

    /**
     * 预加载单个文件
     * @param {string} file - 文件URL
     * @param {string} type - 资源类型（'style'或'script'）
     */
    static preloadSingleFile(file, type) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = type;
        link.href = file;
        document.head.appendChild(link);
    }

    /**
     * 获取或设置cookie
     * @param {string} name - cookie名称
     * @param {string} [value] - cookie值（如果设置）
     * @param {number} [days] - cookie有效天数（如果设置）
     * @returns {string|undefined} 如果只是获取，则返回cookie值
     */
    static cookie(name, value, days) {
        if (typeof value === 'undefined') {
            // Get cookie
            const cookieArr = document.cookie.split(';');
            for (let i = 0; i < cookieArr.length; i++) {
                const cookiePair = cookieArr[i].split('=');
                if (name === cookiePair[0].trim()) {
                    return decodeURIComponent(cookiePair[1]);
                }
            }
            return null;
        } else {
            // Set cookie
            let expires = '';
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
        }
    }

    /**
     * 请求元素全屏显示
     * @param {Element} element - 要全屏显示的元素
     */
    static requestFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    /**
     * 退出全屏模式
     */
    static exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    /**
     * 检查是否处于全屏模式
     * @returns {boolean} 如果处于全屏模式则返回true
     */
    static isFullscreen() {
        return !!(
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        );
    }

    /**
     * 创建事件中心
     * @returns {Object} 包含on、off、emit方法的事件中心对象
     */
    static createEventHub() {
        return {
            hub: Object.create(null),
            
            emit(event, data) {
                (this.hub[event] || []).forEach(handler => handler(data));
            },
            
            on(event, handler) {
                if (!this.hub[event]) this.hub[event] = [];
                this.hub[event].push(handler);
            },
            
            off(event, handler) {
                const i = (this.hub[event] || []).findIndex(h => h === handler);
                if (i > -1) this.hub[event].splice(i, 1);
                if (this.hub[event]?.length === 0) delete this.hub[event];
            }
        };
    }

    /**
     * 获取浏览器信息
     * @returns {Object} 浏览器信息对象
     */
    static getBrowserInfo() {
        const ua = navigator.userAgent;
        const browser = {
            name: '',
            version: '',
            engine: '',
            system: '',
            device: 'desktop'
        };

        // 检测浏览器名称和版本
        if (ua.indexOf('Edge') > -1) {
            browser.name = 'Edge';
            browser.version = ua.match(/Edge\/([\d.]+)/)[1];
        } else if (ua.indexOf('Firefox') > -1) {
            browser.name = 'Firefox';
            browser.version = ua.match(/Firefox\/([\d.]+)/)[1];
        } else if (ua.indexOf('Chrome') > -1) {
            browser.name = 'Chrome';
            browser.version = ua.match(/Chrome\/([\d.]+)/)[1];
        } else if (ua.indexOf('Safari') > -1) {
            browser.name = 'Safari';
            browser.version = ua.match(/Version\/([\d.]+)/)[1];
        } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
            browser.name = 'IE';
            browser.version = ua.match(/(MSIE\s|rv:)([\d.]+)/)[2];
        }

        // 检测渲染引擎
        if (ua.indexOf('Gecko') > -1) {
            browser.engine = 'Gecko';
        } else if (ua.indexOf('WebKit') > -1) {
            browser.engine = 'WebKit';
        } else if (ua.indexOf('Trident') > -1) {
            browser.engine = 'Trident';
        }

        // 检测操作系统
        if (ua.indexOf('Windows') > -1) {
            browser.system = 'Windows';
        } else if (ua.indexOf('Mac') > -1) {
            browser.system = 'MacOS';
        } else if (ua.indexOf('Linux') > -1) {
            browser.system = 'Linux';
        } else if (ua.indexOf('Android') > -1) {
            browser.system = 'Android';
            browser.device = 'mobile';
        } else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) {
            browser.system = 'iOS';
            browser.device = 'mobile';
        }

        return browser;
    }

    /**
     * 检查浏览器是否支持某个特性
     * @param {string} feature - 特性名称
     * @returns {boolean} 是否支持
     */
    static supports(feature) {
        const features = {
            webp: () => {
                const elem = document.createElement('canvas');
                return elem.getContext && elem.getContext('2d') ?
                    elem.toDataURL('image/webp').indexOf('data:image/webp') === 0 : false;
            },
            webgl: () => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGLRenderingContext && 
                        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                } catch (e) {
                    return false;
                }
            },
            webgl2: () => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
                } catch (e) {
                    return false;
                }
            },
            touch: () => {
                return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            },
            geolocation: () => {
                return 'geolocation' in navigator;
            },
            localStorage: () => {
                try {
                    return 'localStorage' in window && window.localStorage !== null;
                } catch (e) {
                    return false;
                }
            },
            sessionStorage: () => {
                try {
                    return 'sessionStorage' in window && window.sessionStorage !== null;
                } catch (e) {
                    return false;
                }
            },
            indexedDB: () => {
                return !!window.indexedDB;
            },
            webWorker: () => {
                return !!window.Worker;
            },
            serviceWorker: () => {
                return 'serviceWorker' in navigator;
            },
            webSocket: () => {
                return 'WebSocket' in window;
            },
            fetch: () => {
                return 'fetch' in window;
            },
            canvas: () => {
                const elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            },
            svg: () => {
                return !!document.createElementNS && 
                    !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
            },
            webAudio: () => {
                return !!(window.AudioContext || window.webkitAudioContext);
            },
            webRTC: () => {
                return !!(window.RTCPeerConnection || window.mozRTCPeerConnection || 
                    window.webkitRTCPeerConnection);
            }
        };

        return features[feature] ? features[feature]() : false;
    }

    /**
     * 检查是否是移动设备
     * @returns {boolean} 是否是移动设备
     */
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * 检查是否是平板设备
     * @returns {boolean} 是否是平板设备
     */
    static isTablet() {
        return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
    }

    /**
     * 获取屏幕方向
     * @returns {string} 屏幕方向
     */
    static getOrientation() {
        if (window.screen && window.screen.orientation) {
            return window.screen.orientation.type;
        }
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    }

    /**
     * 获取网络连接信息
     * @returns {Object} 网络连接信息
     */
    static getConnection() {
        const connection = navigator.connection || navigator.mozConnection || 
            navigator.webkitConnection || navigator.msConnection;
        
        if (!connection) {
            return {
                online: navigator.onLine,
                type: 'unknown',
                effectiveType: 'unknown'
            };
        }

        return {
            online: navigator.onLine,
            type: connection.type || 'unknown',
            effectiveType: connection.effectiveType || 'unknown',
            downlink: connection.downlink,
            downlinkMax: connection.downlinkMax,
            rtt: connection.rtt,
            saveData: connection.saveData
        };
    }

    /**
     * 获取电池状态
     * @returns {Promise<Object>} 电池状态信息
     */
    static async getBatteryInfo() {
        if (!('getBattery' in navigator)) {
            return null;
        }

        try {
            const battery = await navigator.getBattery();
            return {
                charging: battery.charging,
                level: battery.level,
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * 获取硬件信息
     * @returns {Object} 硬件信息
     */
    static getHardwareInfo() {
        return {
            cores: navigator.hardwareConcurrency || 1,
            memory: navigator.deviceMemory || 'unknown',
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            maxTouchPoints: navigator.maxTouchPoints || 0
        };
    }

    /**
     * 获取屏幕信息
     * @returns {Object} 屏幕信息
     */
    static getScreenInfo() {
        return {
            width: window.screen.width,
            height: window.screen.height,
            availWidth: window.screen.availWidth,
            availHeight: window.screen.availHeight,
            colorDepth: window.screen.colorDepth,
            pixelDepth: window.screen.pixelDepth,
            orientation: this.getOrientation(),
            devicePixelRatio: window.devicePixelRatio || 1
        };
    }

    /**
     * 获取地理位置
     * @returns {Promise<Object>} 地理位置信息
     */
    static getGeolocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed,
                        timestamp: position.timestamp
                    });
                },
                error => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        });
    }

    /**
     * 检查浏览器是否支持某个CSS属性
     * @param {string} property - CSS属性名
     * @returns {boolean} 是否支持
     */
    static supportsCSSProperty(property) {
        return property in document.documentElement.style;
    }

    /**
     * 检查浏览器是否支持某个媒体查询
     * @param {string} query - 媒体查询字符串
     * @returns {boolean} 是否支持
     */
    static supportsMediaQuery(query) {
        return window.matchMedia(query).matches;
    }

    /**
     * 获取浏览器性能信息
     * @returns {Object} 性能信息
     */
    static getPerformance() {
        if (!window.performance) {
            return null;
        }

        const timing = performance.timing;
        const navigation = performance.navigation;

        return {
            // 页面加载时间
            loadTime: timing.loadEventEnd - timing.navigationStart,
            // DOM解析时间
            domParseTime: timing.domComplete - timing.domLoading,
            // 首字节时间
            ttfb: timing.responseStart - timing.navigationStart,
            // DNS解析时间
            dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
            // TCP连接时间
            tcpTime: timing.connectEnd - timing.connectStart,
            // 白屏时间
            whiteScreenTime: timing.domLoading - timing.navigationStart,
            // DOM Ready时间
            domReadyTime: timing.domContentLoadedEventEnd - timing.navigationStart,
            // 导航类型
            navigationType: navigation.type,
            // 重定向次数
            redirectCount: navigation.redirectCount
        };
    }

    /**
     * 获取当前页面的可见性状态
     * @returns {string} 可见性状态
     */
    static getVisibilityState() {
        if (typeof document.hidden !== 'undefined') {
            return document.visibilityState;
        }
        return 'unknown';
    }

    /**
     * 监听页面可见性变化
     * @param {Function} callback - 回调函数
     * @returns {Function} 取消监听的函数
     */
    static onVisibilityChange(callback) {
        const handler = () => {
            callback(this.getVisibilityState());
        };

        document.addEventListener('visibilitychange', handler);

        return () => {
            document.removeEventListener('visibilitychange', handler);
        };
    }

    /**
     * 检查浏览器是否在线
     * @returns {boolean} 是否在线
     */
    static isOnline() {
        return navigator.onLine;
    }

    /**
     * 监听在线状态变化
     * @param {Function} onlineCallback - 在线回调
     * @param {Function} offlineCallback - 离线回调
     * @returns {Function} 取消监听的函数
     */
    static onConnectionChange(onlineCallback, offlineCallback) {
        window.addEventListener('online', onlineCallback);
        window.addEventListener('offline', offlineCallback);

        return () => {
            window.removeEventListener('online', onlineCallback);
            window.removeEventListener('offline', offlineCallback);
        };
    }

    /**
     * 获取当前页面的URL参数
     * @returns {Object} URL参数对象
     */
    static getUrlParams() {
        const params = {};
        const searchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        return params;
    }

    /**
     * 检查浏览器是否支持全屏
     * @returns {boolean} 是否支持全屏
     */
    static supportsFullscreen() {
        return document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled;
    }

    /**
     * 请求全屏
     * @param {HTMLElement} element - 要全屏的元素
     * @returns {Promise} 全屏请求的Promise
     */
    static requestFullscreen(element) {
        const requestMethod = element.requestFullscreen ||
            element.webkitRequestFullscreen ||
            element.mozRequestFullScreen ||
            element.msRequestFullscreen;

        if (requestMethod) {
            return requestMethod.call(element);
        }
        return Promise.reject(new Error('Fullscreen not supported'));
    }

    /**
     * 退出全屏
     * @returns {Promise} 退出全屏的Promise
     */
    static exitFullscreen() {
        const exitMethod = document.exitFullscreen ||
            document.webkitExitFullscreen ||
            document.mozCancelFullScreen ||
            document.msExitFullscreen;

        if (exitMethod) {
            return exitMethod.call(document);
        }
        return Promise.reject(new Error('Fullscreen not supported'));
    }

    /**
     * 检查是否支持某个Web API
     * @param {string} api - API名称
     * @returns {boolean} 是否支持
     */
    static supportsWebAPI(api) {
        return api in window;
    }
}
const dcBrowser = new dcBrowser();