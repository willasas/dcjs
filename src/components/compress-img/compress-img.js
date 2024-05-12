// 创建元素
const elementsToAppend = [
  { tag: 'input', type: 'file', id: 'imageInput', accept: 'image/*' },
  { tag: 'div', id: 'preview' },
  { tag: 'div', id: 'compressedPreview' },
];
// 将元素添加到body中
elementsToAppend.forEach(({ tag, ...attrs }) => {
  const element = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => element[key] = value);
  document.body.appendChild(element);
});


// 首先确保已安装 Azure Blob Storage SDK for JavaScript
// 可以通过 npm 安装：
// $ npm install @azure/storage-blob
// const { BlobServiceClient } = require('@azure/storage-blob');

// async function uploadToServer(blob, containerName, blobName) {
//   // 获取连接字符串（从环境变量或配置文件中读取）
//   const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

//   // 创建 BlobServiceClient 实例
//   const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

//   // 获取容器客户端
//   const containerClient = blobServiceClient.getContainerClient(containerName);

//   // 创建一个块Blob客户端
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//   // 将 Blob 数据上传到 Azure 存储
//   try {
//     await blockBlobClient.uploadData(blob);
//     console.log(`Image uploaded successfully to ${blobName}`);
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error;
//   }
// }


// 为输入图像字段添加事件监听器，以便在选择新图像时进行预览和处理
document.getElementById('imageInput')?.addEventListener('change', async (event) => {
  const input = event.target;
  // 如果没有文件被选中，则不执行任何操作
  if (!input.files || !input.files[0] || !/\.(jpg|jpeg|png|gif)$/i.test(input.files[0].name)) {
    alert('请选择一个有效的图像文件(.jpg, .jpeg, .png, .gif)');
    return;
  }

  try {
    const file = input.files[0];
    // 读取并预览原始图片
    const result = await readImg(file); 
    const { img, width, height } = result;

    // 创建并配置一个新的img元素以显示预览
    const previewImage = document.createElement('img');
    previewImage.src = img.src; // 设置图像源
    previewImage.width = width; // 设置宽度
    previewImage.height = height; // 设置高度
    document.getElementById('preview')?.appendChild(previewImage); // 将其添加到预览区域
  
    // 压缩图片并预览压缩后的图片
    const compressedResult = await compareImg(img, 'image/jpeg', 800, 600, .8);
    const compressedBlob = compressedResult;

    const imageUrl = URL.createObjectURL(compressedBlob);
    const newImageElement = document.createElement('img');
    newImageElement.src = imageUrl;
    document.getElementById('compressedPreview').appendChild(newImageElement);

    // 假设你已经有了压缩后的 Blob 对象和容器名、Blob 名称
    // const containerName = 'your-container-name';
    // const blobName = 'compressed-image.jpg';

    // await uploadToServer(compressedBlob, containerName, blobName);
  } catch (error) {
    console.error('Failed to load the image:', error); // 控制台记录错误
    alert('无法加载图像，请检查文件是否有效或重试！'); // 向用户显示错误信息
  }
});


/**
 * 读取图片并返回一个包含图片对象、宽度和高度的结果
 * @param file 用户选择的图像文件
 * @returns 返回一个Promise，该Promise解析为包含img对象、宽度和高度的对象
 */
function readImg(file) {
    return new Promise(function (resolve, reject) {
        var img = new Image(); // 创建一个新的图像对象
        var reader = new FileReader(); // 创建一个文件读取器用于读取图像数据

        // 当文件读取器完成加载时，设置图像的src
        reader.onload = function (e) {
            img.src = e.target.result;
        };

        // 文件读取器错误处理
        reader.onerror = function (e) {
            reject(new Error("FileReader failed to read the image: ".concat(e)));
        };

        // 开始读取图像数据
        reader.readAsDataURL(file);

        // 图像加载成功时的处理
        img.onload = function () {
            var naturalWidth = img.naturalWidth, naturalHeight = img.naturalHeight;
            resolve({ img: img, width: naturalWidth, height: naturalHeight });
        };

        // 图像加载失败时的处理
        img.onerror = function (e) {
            reject(new Error("Failed to load the image: ".concat(e)));
        };

        // 图像加载完成后清理资源
        img.onloadend = function () {
            reader.onload = null;
            reader.onerror = null;
            img.onload = null;
            img.onerror = null;
            img = null;
            reader = null;
        };
    });
}

/**
 * 压缩图片
 * @param img 被压缩的img对象
 * @param type 压缩后转换的文件类型
 * @param mx 触发压缩的图片最大宽度限制
 * @param mh 触发压缩的图片最大高度限制
 * @param quality 图片质量（可选，默认为1）
 * @returns 返回一个Promise，解析为压缩后的图像Blob
 */
function compareImg(img, type, mx, mh, quality) {
    if (quality === void 0) { quality = 1; }
    return new Promise(function (resolve, reject) {
        var canvas = document.createElement('canvas'); // 创建一个画布用于绘制图像
        var context = canvas.getContext('2d');
        var originWidth = img.width, originHeight = img.height;
        // 计算目标尺寸以适应最大宽度和高度限制
        var maxWidth = mx;
        var maxHeight = mh;
        var targetWidth = originWidth;
        var targetHeight = originHeight;
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > 1) {
                // 如果图像宽度大于高度，则按宽度限制调整大小
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            }
            else {
                // 如果图像高度大于宽度，则按高度限制调整大小
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
        }
        canvas.width = targetWidth; // 设置画布宽度
        canvas.height = targetHeight; // 设置画布高度
        // 清除画布区域以准备绘制
        context === null || context === void 0 ? void 0 : context.clearRect(0, 0, targetWidth, targetHeight);
        // 在画布上绘制图像
        context === null || context === void 0 ? void 0 : context.drawImage(img, 0, 0, targetWidth, targetHeight);
        // 将绘制后的图像转换为Blob对象
        canvas.toBlob(function (bolb) {
            resolve(bolb);
        }, type || 'image/png', quality);
    });
}