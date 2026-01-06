const fs = require('fs');
const path = require('path');

// 定义工具类文件列表
const toolFiles = [
  'dcArray.js',
  'dcBrowser.js',
  'dcCrypto.js',
  'dcDate.js',
  'dcEle.js',
  'dcFiles.js',
  'dcFunction.js',
  'dcMedia.js',
  'dcNetworkChecker.js',
  'dcNumber.js',
  'dcObject.js',
  'dcString.js',
  'dcUrl.js',
  'dcValidate.js',
  'dcplatform.js',  // 注意：文件名是dcplatform.js，但类名是DCPlatform
  'dcregexp.js',
  'dcadapt.js',
  'dchttps.js',
  'dcinfinitescroller.js',
  'dcjson.js',
  'dclottery.js',
  'dcwaterfall.js',
  'dprettylog.js',
  'sampleadapt.js',
  'dcqrcode.js'
];

// 读取所有工具类文件内容
const distDir = path.join(__dirname, 'dist');
const srcDir = path.join(__dirname, 'src', 'utils');

// 确保dist目录存在
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// 创建库的主文件内容
let bundleContent = '// dcjs - 前端工具库\n';
bundleContent += '// 生成时间: ' + new Date().toISOString() + '\n\n';

// 添加全局DC对象初始化
bundleContent += '(function(global) {\n';
bundleContent += '  // 初始化全局DC对象\n';
bundleContent += '  global.DC = global.DC || {};\n\n';

// 读取并添加每个工具类文件的内容
for (const file of toolFiles) {
  const filePath = path.join(srcDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 添加文件注释
    bundleContent += `  // 工具类文件: ${file}\n`;
    
    // 处理内容，移除全局导出部分并直接添加到bundle中
    const lines = content.split('\n');
    let inExportSection = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // 检查是否是导出部分的开始
      if (line.startsWith('window.DC = window.DC || {};')) {
        inExportSection = true;
        continue; // 跳过这行
      }
      
      // 检查是否是导出部分
      if (line.includes('window.DC.') && line.includes('=')) {
        // 提取类名和属性名
        const match = line.match(/window\.DC\.(\w+)\s*=\s*(\w+);?/);
        if (match) {
          const [, propName, className] = match;
          bundleContent += `  global.DC.${propName} = ${className};\n`;
        }
        continue; // 跳过这行
      }
      
      // 如果不在导出部分，则添加原内容
      if (!inExportSection) {
        bundleContent += '  ' + lines[i] + '\n';
      }
      
      // 检查导出部分是否结束
      if (line.startsWith('// export default') || line.includes('export default')) {
        inExportSection = false;
      }
    }
    
    bundleContent += '\n';
  } else {
    console.warn(`警告: 文件不存在 ${filePath}`);
  }
}

bundleContent += '})(typeof window !== \'undefined\' ? window : this);\n';

// 写入构建后的文件
const outputPath = path.join(distDir, 'dc.js');
fs.writeFileSync(outputPath, bundleContent);

console.log(`构建完成: ${outputPath}`);
console.log(`文件大小: ${bundleContent.length} 字节`);