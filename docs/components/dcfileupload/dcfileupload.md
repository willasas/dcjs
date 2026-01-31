# DCFileUpload 组件

## 1. 组件介绍

DCFileUpload 是一个功能强大的文件上传组件，支持单文件上传、多文件上传、拖拽上传等功能。它提供了丰富的配置选项和回调函数，可以满足各种文件上传场景的需求。

### 1.1 主要功能

- 支持点击和拖拽上传文件
- 支持单文件和多文件上传
- 支持文件类型限制
- 支持文件大小限制
- 实时显示上传进度
- 支持自定义上传回调
- 美观的默认样式
- 响应式设计，适配不同屏幕尺寸

### 1.2 应用场景

- 表单中的文件附件上传
- 图片上传和预览
- 文档上传和管理
- 任何需要用户上传文件的场景

## 2. API 文档

### 2.1 构造函数

```javascript
new DC.FileUpload(options)
```

#### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| options | Object | {} | 配置选项 |
| options.container | HTMLElement | document.body | 容器元素，文件上传组件将被添加到此元素中 |
| options.accept | string | '*' | 接受的文件类型，例如 'image/*'、'application/pdf' 等 |
| options.maxSize | number | 5242880 | 最大文件大小（字节），默认 5MB |
| options.maxFiles | number | 1 | 最大文件数量 |
| options.uploadUrl | string | '' | 上传URL，目前为预留参数，实际上传逻辑需要自定义 |
| options.onUploadStart | Function | () => {} | 上传开始回调 |
| options.onUploadProgress | Function | () => {} | 上传进度回调 |
| options.onUploadSuccess | Function | () => {} | 上传成功回调 |
| options.onUploadError | Function | () => {} | 上传失败回调 |
| options.onFileSelect | Function | () => {} | 文件选择回调 |

### 2.2 方法

#### getFiles()

获取当前选中的文件列表。

**返回值**：
- File[]: 文件对象数组

#### clearFiles()

清空当前选中的文件列表。

#### destroy()

销毁文件上传组件，移除 DOM 元素。

## 3. 使用示例

### 3.1 基础使用

```javascript
// 引入 DCFileUpload
// <script src="path/to/dcfileupload.js"></script>

// 初始化文件上传组件
const fileUpload = new DC.FileUpload({
    container: document.getElementById('upload-container'),
    onFileSelect: (files) => {
        console.log('选择了文件:', files);
    },
    onUploadSuccess: (data) => {
        console.log('文件上传成功:', data);
    }
});
```

### 3.2 图片上传

```javascript
// 初始化图片上传组件
const imageUpload = new DC.FileUpload({
    container: document.getElementById('image-upload'),
    accept: 'image/*',
    maxSize: 2 * 1024 * 1024, // 2MB
    onFileSelect: (files) => {
        console.log('选择了图片:', files);
    },
    onUploadSuccess: (data) => {
        console.log('图片上传成功:', data);
        // 可以在这里显示图片预览
    }
});
```

### 3.3 多文件上传

```javascript
// 初始化多文件上传组件
const multipleUpload = new DC.FileUpload({
    container: document.getElementById('multiple-upload'),
    maxFiles: 3,
    maxSize: 1 * 1024 * 1024, // 1MB per file
    onFileSelect: (files) => {
        console.log('选择了多个文件:', files);
    },
    onUploadStart: (files) => {
        console.log('开始上传', files.length, '个文件');
    },
    onUploadSuccess: (data) => {
        console.log('文件上传成功:', data.file.name);
    }
});
```

### 3.4 自定义回调

```javascript
// 初始化带自定义回调的文件上传组件
const customUpload = new DC.FileUpload({
    container: document.getElementById('custom-upload'),
    onFileSelect: (files) => {
        console.log('选择了文件:', files);
        // 可以在这里验证文件
    },
    onUploadStart: (files) => {
        console.log('开始上传:', files);
        // 可以在这里显示加载动画
    },
    onUploadProgress: (data) => {
        console.log('上传进度:', data.file.name, data.progress, '%');
        // 可以在这里更新进度条
    },
    onUploadSuccess: (data) => {
        console.log('上传成功:', data);
        // 可以在这里显示成功消息
    },
    onUploadError: (data) => {
        console.log('上传失败:', data);
        // 可以在这里显示错误消息
    }
});
```

## 4. 样式说明

### 4.1 默认样式

DCFileUpload 会自动创建以下默认样式：

```css
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
```

### 4.2 自定义样式

如果需要自定义样式，可以通过覆盖默认 CSS 类来实现：

```css
/* 自定义上传区域样式 */
.dc-file-upload .upload-area {
    height: 150px;
    border-color: #ccc;
}

.dc-file-upload .upload-area:hover {
    border-color: #52c41a;
    background-color: #f6ffed;
}

/* 自定义文件项样式 */
.dc-file-upload .file-item {
    border-color: #e8e8e8;
}

/* 自定义上传按钮样式 */
.dc-file-upload .upload-btn {
    background-color: #52c41a;
}

.dc-file-upload .upload-btn:hover {
    background-color: #73d13d;
}

/* 自定义进度条样式 */
.dc-file-upload .file-progress-bar {
    background-color: #52c41a;
}
```

## 5. 最佳实践

### 5.1 性能优化

- **合理设置文件大小限制**：根据实际需求设置合适的文件大小限制，避免用户上传过大的文件导致服务器压力过大。
- **合理设置文件数量限制**：对于多文件上传，设置合理的文件数量限制，避免同时上传过多文件导致浏览器卡顿。
- **使用合适的文件类型限制**：根据实际需求设置合适的文件类型限制，避免用户上传不支持的文件类型。
- **优化回调函数**：回调函数中避免执行复杂的操作，以免影响用户体验。

### 5.2 安全性

- **服务端验证**：客户端验证只是为了提高用户体验，服务端仍需要进行严格的文件验证，包括文件类型、文件大小、文件内容等。
- **文件命名**：上传到服务器的文件应该重新命名，避免文件名冲突和安全问题。
- **文件存储**：上传的文件应该存储在安全的位置，避免直接暴露在 web 根目录下。
- **病毒扫描**：对于用户上传的文件，应该进行病毒扫描，确保系统安全。

### 5.3 兼容性

- DCFileUpload 使用原生 JavaScript 实现，不依赖任何第三方库，兼容所有现代浏览器。
- 对于 IE 11 等老旧浏览器，可能需要添加一些 polyfill 来支持 ES6 特性。
- 拖拽上传功能在某些老旧浏览器中可能不支持，组件会自动降级为点击上传。

### 5.4 无障碍性

- 所有表单元素都有适当的标签和描述。
- 支持键盘导航和屏幕阅读器。
- 聚焦状态有明显的视觉反馈。
- 错误信息有明确的提示。

### 5.5 常见问题

#### 问题：文件上传失败

**可能原因**：
- 文件大小超过限制。
- 文件类型不支持。
- 网络连接问题。
- 服务器端错误。

**解决方案**：
- 检查文件大小和类型是否符合要求。
- 检查网络连接是否正常。
- 检查服务器端是否有错误。

#### 问题：拖拽上传不工作

**可能原因**：
- 浏览器不支持拖拽功能。
- 拖拽区域有其他元素阻止了拖拽事件。

**解决方案**：
- 尝试使用点击上传方式。
- 检查是否有其他元素阻止了拖拽事件。

#### 问题：上传进度不显示

**可能原因**：
- 上传速度过快，进度条显示不明显。
- 浏览器不支持 XMLHttpRequest 的 progress 事件。

**解决方案**：
- 对于小文件，进度条可能显示不明显，这是正常现象。
- 对于不支持 progress 事件的浏览器，组件会自动降级为只显示上传状态。

## 6. 版本历史

### 1.0.0

- 初始版本
- 支持点击和拖拽上传文件
- 支持单文件和多文件上传
- 支持文件类型和大小限制
- 实时显示上传进度
- 支持自定义上传回调
- 美观的默认样式

## 7. 贡献指南

如果您发现了 bug 或有新的功能建议，欢迎提交 issue 或 pull request。

### 开发流程

1. Fork 本仓库
2. 创建 feature 分支
3. 提交代码
4. 运行测试
5. 提交 pull request

### 代码规范

- 遵循 ES6 语法规范
- 代码风格保持一致
- 为新功能添加测试用例
- 为新功能添加文档

## 8. 许可证

DCFileUpload 组件采用 MIT 许可证，详见 [LICENSE](../../../LICENSE) 文件。
