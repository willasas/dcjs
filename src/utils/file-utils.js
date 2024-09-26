// 文件操作

const fs = require('fs').promises; // 使用fs的异步API

// 增加了路径验证的简单实现，这里假定传入的路径应该是绝对路径
// 在实际应用中，可能需要更复杂的安全性检查
const isValidPath = (path) => {
  return path.startsWith('/') || path.startsWith('./') || path.startsWith('../');
};

async function createDirIfNotExists(dir) {
  // 路径验证
  if (!isValidPath(dir)) {
    throw new Error(`Invalid path: ${dir}`);
  }

  try {
    // 检查目录是否存在，如果不存在，则创建它
    if (!(await fs.stat(dir)).isDirectory()) {
      await fs.mkdir(dir);
    }
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
    // 根据不同的错误类型进行处理，这里只是一个简单的示例
    if (error.code === 'EACCES') {
      console.error('Permission denied');
    } else if (error.code === 'ENOENT') {
      console.error('Directory does not exist');
    }
  }
}

// 调用示例
createDirIfNotExists('test'); // 创建目录'test'，如果它不存在的话



/**
 * 从用户选择的文件中读取内容，并将其以文本形式显示在页面上。
 * DOM:
 * <input type="file" id="fileInput" />
 * <button onclick="readFile()">Read File</button>
 * <pre id="output"></pre>
 * 
 */
function readFile() {
  // 获取文件选择器元素并获取所选文件
  const inputElement = document.getElementById('fileInput');
  const file = inputElement.files[0];
  // 如果没有选择文件，则提醒用户并返回
  if (!file) {
    alert('Please select a file first.');
    return;
  }

  // 创建一个FileReader对象来读取文件
  const reader = new FileReader();
  // 当文件读取完成时的处理逻辑
  reader.onload = (event) => {
    try {
      // 获取文件内容并按行分割
      const textContent = event.target.result;
      const lines = textContent.split('\n');
      // 调用函数以显示文件内容的每一行
      displayLines(lines);
    } catch (err) {
      // 如果在处理文件内容时出现错误，则在控制台中记录错误
      console.error(`Error reading file: ${err}`);
    }
  };
  
  // 当文件读取失败时的处理逻辑
  reader.onerror = (event) => {
    console.error(`File reading error: ${event.target.error}`);
  };

  // 使用readAsText方法读取文件内容，指定字符编码为UTF-8
  reader.readAsText(file, 'UTF-8');
}

/**
 * 将提供的行数组显示在页面的输出元素中。
 * @param {string[]} lines - 要显示的文本行数组。
 */
function displayLines(lines) {
  // 获取输出元素并设置其文本内容为行数组的JSON字符串表示，以美化格式显示
  const outputElement = document.getElementById('output');
  outputElement.textContent = JSON.stringify(lines, null, 2);
}



const isBrowser = typeof window !== 'undefined';
/**
 * 将路径字符串中的 "~/" 替换成指定的默认家目录路径。
 * 仅在非浏览器环境下支持处理Windows路径。
 * 
 * @param {string} str 输入的路径字符串
 * @return {string} 替换后的路径字符串
 * @throws {TypeError} 当输入不是字符串时抛出类型错误
 * @throws 任何在路径替换过程中发生的错误
 */
const untildify = (str) => {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string as input');
  }

  // 使用正则表达式匹配以 "~/" 开头的路径
  const tildeRegex = /^~\//;
  
  // 判断是否在浏览器环境且是Windows系统，给出警告并返回原字符串
  if (!isBrowser && process.platform === 'win32') {
    console.warn('Untildify does not support Windows paths in the browser environment.');
    return str;
  }
  
  try {
    // 替换路径中的 "~/" 为默认家目录路径
    return str.replace(tildeRegex, '/Users/username/');
  } catch (error) {
    console.error('Error processing input:', error);
    throw error; // 重新抛出异常
  }
};



/**
 * 下载一个链接的文件
 *
 * @param {string} link 文件的URL
 * @param {string} [name] 文件名，默认为URL的最后一部分
 */
function download(link, name) {
  if (!name) {
    name = link.slice(link.lastIndexOf('/') + 1);
  }

  const eleLink = document.createElement('a');
  eleLink.download = name;
  eleLink.style.display = 'none';
  eleLink.href = link;
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}



// 使用download函数,假设你有一个文件URL
const url = 'http://example.com/path/to/your/file.pdf';
// 调用download函数，提供URL和文件名
download(url, 'myFile.pdf');



/**
 * 浏览器下载静态文件（如DOM、JSON文件等）
 *
 * @param {string} name 文件名
 * @param {*} content 文件内容，可以是字符串或其他类型，会自动转换为Blob
 */
function downloadFile(name, content) {
  if (typeof name === 'undefined') {
    throw new Error('The first parameter "name" is required');
  }
  if (typeof content === 'undefined') {
    throw new Error('The second parameter "content" is required');
  }

  // 如果内容不是Blob，将其转换为Blob
  const blob = content instanceof Blob ? content : new Blob([content]);

  // 创建一个URL表示Blob对象
  const link = URL.createObjectURL(blob);
  download(link, name);
}



// 使用downloadFile函数
// 假设你有JSON内容要下载
const jsonData = { key: 'value' };
const jsonString = JSON.stringify(jsonData);
// 调用downloadFile函数，提供文件名和内容
downloadFile('data.json', jsonString);

// 或从url中获取内容
fetch('http://example.com/api/data')
  .then(response => response.text())
  .then(data => downloadFile('data.txt', data))
  .catch(error => console.error('Error fetching data:', error));



/**
 * 浏览器下载base64的图片文件（仅支持pc端）
 *
 * @param {string} base64ImgContent 要下载的base64的字符串
 * @param {string} saveFileName 下载时候的文件名称
 */
function saveBase64Image(base64ImgContent, saveFileName) {
  // 检查输入是否有效
  if (!base64ImgContent || !saveFileName) {
    console.error('Invalid input: base64ImgContent or saveFileName is missing.');
    return;
  }

  // 内部函数用于将 Base64 字符串转换为 Blob
  function base64ToBlob(code) {
    try {
      var parts = code.split(';base64,');
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    } catch (error) {
      console.error('Error converting Base64 to Blob:', error);
      return null;
    }
  }

  // 转换 Base64 字符串为 Blob
  var blob = base64ToBlob(base64ImgContent);
  if (!blob) {
    console.error('Failed to create Blob from Base64.');
    return;
  }

  // 创建下载链接并触发点击事件
  var aLink = document.createElement('a');
  aLink.download = saveFileName;
  aLink.href = URL.createObjectURL(blob);

  // 触发点击事件
  if (document.createEvent) {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    aLink.dispatchEvent(evt);
  } else if (aLink.fireEvent) {
    aLink.fireEvent('onclick');
  }

  // 清理资源
  setTimeout(function() {
    URL.revokeObjectURL(aLink.href);
  }, 100);
}
  
// 示例调用
saveBase64Image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADh...', 'example.png');
  
