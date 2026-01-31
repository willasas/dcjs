/**
 * 文件上传组件
 */
class DCFileUpload {
    /**
     * 构造函数
     * @param {Object} options - 配置选项
     * @param {HTMLElement} [options.container=document.body] - 容器元素
     * @param {string} [options.accept='*'] - 接受的文件类型
     * @param {number} [options.maxSize=5242880] - 最大文件大小（字节）
     * @param {number} [options.maxFiles=1] - 最大文件数量
     * @param {string} [options.uploadUrl=''] - 上传URL
     * @param {Function} [options.onUploadStart=() => {}] - 上传开始回调
     * @param {Function} [options.onUploadProgress=() => {}] - 上传进度回调
     * @param {Function} [options.onUploadSuccess=() => {}] - 上传成功回调
     * @param {Function} [options.onUploadError=() => {}] - 上传失败回调
     * @param {Function} [options.onFileSelect=() => {}] - 文件选择回调
     */
    constructor(options = {}) {
        // 配置参数
        this.container = options.container || document.body;
        this.accept = options.accept || '*';
        this.maxSize = options.maxSize || 5 * 1024 * 1024; // 默认5MB
        this.maxFiles = options.maxFiles || 1;
        this.uploadUrl = options.uploadUrl || '';
        this.onUploadStart = options.onUploadStart || function() {};
        this.onUploadProgress = options.onUploadProgress || function() {};
        this.onUploadSuccess = options.onUploadSuccess || function() {};
        this.onUploadError = options.onUploadError || function() {};
        this.onFileSelect = options.onFileSelect || function() {};

        // 上传文件列表
        this.files = [];

        // 生成DOM结构
        this.render();

        // 创建样式
        this.createStyle();

        // 绑定事件
        this.bindEvents();
    }

    /**
     * 渲染组件
     */
    render() {
        // 创建DOM结构
        this.element = document.createElement('div');
        this.element.className = 'dc-file-upload';
        this.element.innerHTML = `
            <div class="upload-area">
                <input type="file" class="file-input" ${this.maxFiles > 1 ? 'multiple' : ''} accept="${this.accept}">
                <div class="upload-content">
                    <div class="upload-icon">📁</div>
                    <div class="upload-text">
                        <p class="upload-title">点击或拖拽文件到此处上传</p>
                        <p class="upload-hint">支持 ${this.accept === '*' ? '所有文件' : this.accept}，最大 ${(this.maxSize / 1024 / 1024).toFixed(1)}MB</p>
                    </div>
                </div>
            </div>
            <div class="file-list"></div>
            <button class="upload-btn" disabled>上传文件</button>
        `;

        this.container.appendChild(this.element);
    }

    /**
     * 创建样式
     */
    createStyle() {
        const cssRules = `
            .dc-file-upload {
                position: relative;
                width: 100%;
                box-sizing: border-box;
            }
            
            .upload-area {
                position: relative;
                width: 100%;
                height: 200px;
                border: 2px dashed #d9d9d9;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
                background-color: #fafafa;
            }
            
            .upload-area:hover {
                border-color: #1890ff;
                background-color: #e6f7ff;
            }
            
            .file-input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
                z-index: 1;
            }
            
            .upload-content {
                text-align: center;
            }
            
            .upload-icon {
                font-size: 48px;
                margin-bottom: 16px;
            }
            
            .upload-title {
                font-size: 16px;
                color: #333;
                margin: 0 0 8px 0;
            }
            
            .upload-hint {
                font-size: 14px;
                color: #999;
                margin: 0;
            }
            
            .file-list {
                margin-top: 20px;
            }
            
            .file-item {
                display: flex;
                align-items: center;
                padding: 12px;
                border: 1px solid #f0f0f0;
                border-radius: 4px;
                margin-bottom: 10px;
                background-color: #fff;
            }
            
            .file-info {
                flex: 1;
                overflow: hidden;
            }
            
            .file-name {
                font-size: 14px;
                color: #333;
                margin: 0 0 4px 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .file-size {
                font-size: 12px;
                color: #999;
                margin: 0;
            }
            
            .file-progress {
                width: 100px;
                height: 6px;
                background-color: #f0f0f0;
                border-radius: 3px;
                overflow: hidden;
                margin: 0 12px;
            }
            
            .file-progress-bar {
                height: 100%;
                background-color: #1890ff;
                border-radius: 3px;
                transition: width 0.3s;
            }
            
            .file-status {
                font-size: 12px;
                margin-right: 12px;
            }
            
            .file-status.success {
                color: #52c41a;
            }
            
            .file-status.error {
                color: #ff4d4f;
            }
            
            .file-remove {
                font-size: 14px;
                color: #999;
                cursor: pointer;
                padding: 4px;
            }
            
            .file-remove:hover {
                color: #ff4d4f;
            }
            
            .upload-btn {
                margin-top: 20px;
                padding: 10px 24px;
                background-color: #1890ff;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s;
            }
            
            .upload-btn:hover {
                background-color: #40a9ff;
            }
            
            .upload-btn:disabled {
                background-color: #f5f5f5;
                color: #d9d9d9;
                cursor: not-allowed;
            }
        `;
        
        const style = document.createElement('style');
        style.innerHTML = cssRules;
        document.head.appendChild(style);
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        const fileInput = this.element.querySelector('.file-input');
        const uploadArea = this.element.querySelector('.upload-area');
        const uploadBtn = this.element.querySelector('.upload-btn');

        // 文件选择事件
        fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files);
        });

        // 拖拽事件
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#1890ff';
            uploadArea.style.backgroundColor = '#e6f7ff';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#d9d9d9';
            uploadArea.style.backgroundColor = '#fafafa';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#d9d9d9';
            uploadArea.style.backgroundColor = '#fafafa';
            this.handleFileSelect(e.dataTransfer.files);
        });

        // 上传按钮事件
        uploadBtn.addEventListener('click', () => {
            this.uploadFiles();
        });
    }

    /**
     * 处理文件选择
     * @param {FileList} files - 文件列表
     */
    handleFileSelect(files) {
        const selectedFiles = Array.from(files);
        
        // 检查文件数量
        if (selectedFiles.length > this.maxFiles) {
            alert(`最多只能选择 ${this.maxFiles} 个文件`);
            return;
        }

        // 检查文件大小和类型
        const validFiles = selectedFiles.filter(file => {
            // 检查文件大小
            if (file.size > this.maxSize) {
                alert(`${file.name} 文件大小超过限制`);
                return false;
            }

            // 检查文件类型
            if (this.accept !== '*') {
                const fileType = file.type || '';
                const acceptTypes = this.accept.split(',').map(type => type.trim());
                const isValidType = acceptTypes.some(acceptType => {
                    if (acceptType.endsWith('*')) {
                        return fileType.startsWith(acceptType.replace('*', ''));
                    }
                    return fileType === acceptType;
                });

                if (!isValidType) {
                    alert(`${file.name} 文件类型不支持`);
                    return false;
                }
            }

            return true;
        });

        // 更新文件列表
        this.files = validFiles;
        this.renderFileList();

        // 启用/禁用上传按钮
        this.toggleUploadBtn();

        // 触发文件选择回调
        this.onFileSelect(validFiles);
    }

    /**
     * 渲染文件列表
     */
    renderFileList() {
        const fileListElement = this.element.querySelector('.file-list');
        fileListElement.innerHTML = '';

        this.files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <p class="file-name">${file.name}</p>
                    <p class="file-size">${(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <div class="file-progress">
                    <div class="file-progress-bar" style="width: 0%"></div>
                </div>
                <div class="file-status"></div>
                <div class="file-remove" data-index="${index}">×</div>
            `;
            fileListElement.appendChild(fileItem);
        });

        // 绑定删除事件
        const removeButtons = fileListElement.querySelectorAll('.file-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeFile(index);
            });
        });
    }

    /**
     * 移除文件
     * @param {number} index - 文件索引
     */
    removeFile(index) {
        this.files.splice(index, 1);
        this.renderFileList();
        this.toggleUploadBtn();
    }

    /**
     * 切换上传按钮状态
     */
    toggleUploadBtn() {
        const uploadBtn = this.element.querySelector('.upload-btn');
        uploadBtn.disabled = this.files.length === 0;
    }

    /**
     * 上传文件
     */
    uploadFiles() {
        if (this.files.length === 0) return;

        // 触发上传开始回调
        this.onUploadStart(this.files);

        this.files.forEach((file, index) => {
            this.uploadFile(file, index);
        });
    }

    /**
     * 上传单个文件
     * @param {File} file - 文件对象
     * @param {number} index - 文件索引
     */
    uploadFile(file, index) {
        // 模拟上传过程
        const fileItem = this.element.querySelectorAll('.file-item')[index];
        const progressBar = fileItem.querySelector('.file-progress-bar');
        const statusElement = fileItem.querySelector('.file-status');

        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            
            // 触发进度回调
            this.onUploadProgress({
                file,
                progress,
                index
            });

            if (progress >= 100) {
                clearInterval(interval);
                
                // 模拟上传成功
                setTimeout(() => {
                    statusElement.className = 'file-status success';
                    statusElement.textContent = '成功';
                    
                    // 触发上传成功回调
                    this.onUploadSuccess({
                        file,
                        index,
                        response: { success: true, url: `http://example.com/uploads/${file.name}` }
                    });
                }, 500);
            }
        }, 100);
    }

    /**
     * 获取选中的文件
     * @returns {File[]} 文件列表
     */
    getFiles() {
        return this.files;
    }

    /**
     * 清空文件列表
     */
    clearFiles() {
        this.files = [];
        this.renderFileList();
        this.toggleUploadBtn();
    }

    /**
     * 销毁组件
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// 全局导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DCFileUpload;
} else {
    window.DC = window.DC || {};
    window.DC.FileUpload = DCFileUpload;
}
