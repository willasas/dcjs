/**
 * 文件操作工具类
 */
class dcFiles {
    constructor() {}

    /**
     * 从文件输入框读取文件
     * @param {HTMLInputElement} input - 文件输入元素
     * @returns {File[]} 文件数组
     */
    static getFiles(input) {
        if (!(input instanceof HTMLInputElement)) {
            console.error('无效的文件输入元素');
            return [];
        }
        return Array.from(input.files || []);
    }

    /**
     * 读取文件内容
     * @param {File} file - 要读取的文件
     * @param {string} [readAs='text'] - 读取方式：'text', 'dataURL', 'arrayBuffer', 'binaryString'
     * @returns {Promise<string|ArrayBuffer>} 文件内容
     */
    static readFile(file, readAs = 'text') {
        return new Promise((resolve, reject) => {
            if (!(file instanceof File)) {
                reject(new Error('无效的文件对象'));
                return;
            }

            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('读取文件失败'));

            switch (readAs) {
                case 'text':
                    reader.readAsText(file);
                    break;
                case 'dataURL':
                    reader.readAsDataURL(file);
                    break;
                case 'arrayBuffer':
                    reader.readAsArrayBuffer(file);
                    break;
                case 'binaryString':
                    reader.readAsBinaryString(file);
                    break;
                default:
                    reader.readAsText(file);
            }
        });
    }

    /**
     * 读取图片文件并返回Data URL
     * @param {File} file - 要读取的图片文件
     * @returns {Promise<string>} 图片Data URL
     */
    static readImage(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('没有提供文件'));
                return;
            }

            if (!file.type.startsWith('image/')) {
                reject(new Error('文件不是图片'));
                return;
            }

            this.readFile(file, 'dataURL')
                .then(resolve)
                .catch(reject);
        });
    }

    /**
     * 从URL或Data URL创建图片元素
     * @param {string} src - 图片URL或Data URL
     * @returns {Promise<HTMLImageElement>} 图片元素
     */
    static createImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('加载图片失败'));
            img.src = src;
        });
    }

    /**
     * 加载多个图片
     * @param {string[]} sources - 图片URL数组
     * @returns {Promise<HTMLImageElement[]>} 加载完成的图片数组
     */
    static loadImages(sources) {
        if (!Array.isArray(sources)) {
            return Promise.reject(new Error('sources必须是数组'));
        }
        return Promise.all(sources.map(src => this.createImage(src)));
    }

    /**
     * 将文件转换为指定大小的Blob对象
     * @param {File} file - 要转换的文件
     * @param {number} maxSize - 最大大小（字节）
     * @returns {Promise<Blob>} 转换后的Blob对象
     */
    static resizeFile(file, maxSize) {
        return new Promise((resolve, reject) => {
            if (file.size <= maxSize) {
                resolve(file);
                return;
            }

            if (file.type.startsWith('image/')) {
                this.readImage(file)
                    .then(dataUrl => this.createImage(dataUrl))
                    .then(img => {
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;
                        
                        // 计算缩放比例
                        const ratio = Math.sqrt(maxSize / file.size);
                        width *= ratio;
                        height *= ratio;

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        // 转换为Blob
                        canvas.toBlob(
                            blob => resolve(blob),
                            file.type,
                            0.9
                        );
                    })
                    .catch(reject);
            } else {
                reject(new Error('不支持的文件类型'));
            }
        });
    }

    /**
     * 下载文件
     * @param {Blob|string} content - 文件内容或URL
     * @param {string} filename - 文件名
     */
    static downloadFile(content, filename) {
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);

        if (content instanceof Blob) {
            link.href = URL.createObjectURL(content);
        } else {
            link.href = content;
        }

        link.download = filename;
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            if (content instanceof Blob) {
                URL.revokeObjectURL(link.href);
            }
        }, 100);
    }

    /**
     * 预览图片
     * @param {File} file - 图片文件
     * @returns {Promise<string>} 预览URL
     */
    static previewImage(file) {
        return new Promise((resolve, reject) => {
            if (!file.type.startsWith('image/')) {
                reject(new Error('不是图片文件'));
                return;
            }

            const url = URL.createObjectURL(file);
            resolve(url);

            // 自动在适当的时候释放URL
            const img = new Image();
            img.onload = () => URL.revokeObjectURL(url);
            img.src = url;
        });
    }

    /**
     * 图片预加载类
     */
    static Preload = class {
        static VERSION = '1.0.1';
        static defaultOptions = {
            complete: () => {},
            progress: () => {},
            error: () => {}
        };

        /**
         * 创建预加载实例
         * @param {string[]} pics - 要预加载的图片URL数组
         * @param {Object} options - 配置选项
         */
        constructor(pics, options = {}) {
            if (!Array.isArray(pics)) {
                throw new Error('pics必须是数组');
            }

            this.pics = pics;
            this.options = { ...Preload.defaultOptions, ...options };
            this.index = 0;
            this.total = pics.length;
            this.successCount = 0;
            this.errorCount = 0;

            this.start();
        }

        start() {
            this.pics.forEach((src, index) => {
                const img = new Image();
                img.onload = () => this.onLoad(src, index);
                img.onerror = () => this.onError(src, index);
                img.src = src;
            });
        }

        onLoad(src, index) {
            this.successCount++;
            this.options.progress(this.successCount + this.errorCount, this.total, src, 'success');
            this.checkComplete();
        }

        onError(src, index) {
            this.errorCount++;
            this.options.error(src);
            this.options.progress(this.successCount + this.errorCount, this.total, src, 'error');
            this.checkComplete();
        }

        checkComplete() {
            if (this.successCount + this.errorCount === this.total) {
                this.options.complete(this.successCount, this.errorCount);
            }
        }
    };

    /**
     * 图片懒加载类
     */
    static LazyLoader = class {
        /**
         * 创建懒加载实例
         * @param {Object} options - 配置选项
         */
        constructor(options = {}) {
            this.options = {
                selector: '.lazy',
                threshold: 0.1,
                rootMargin: '50px',
                ...options
            };

            this.init();
        }

        init() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(
                    entries => this.handleIntersection(entries),
                    {
                        threshold: this.options.threshold,
                        rootMargin: this.options.rootMargin
                    }
                );

                this.observe();
            } else {
                this.loadAllImages();
            }
        }

        observe() {
            document.querySelectorAll(this.options.selector).forEach(img => {
                if (img.dataset.src) {
                    this.observer.observe(img);
                }
            });
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }

        loadImage(img) {
            const src = img.dataset.src;
            if (!src) return;

            img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy');
        }

        loadAllImages() {
            document.querySelectorAll(this.options.selector).forEach(img => {
                this.loadImage(img);
            });
        }

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }

        refresh() {
            this.observe();
        }
    };
}

window.DC = window.DC || {};
window.DC.Files = dcFiles;