const fs = require('fs')
const path = require('path')

// 获取当前日期
const today = new Date()
const dateString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')

// 获取版本号
const packageJson = require('../package.json')
const version = packageJson.version

console.log('开始构建TypeScript版本...')

try {
  // 1. 创建一个简单的包装器，将TypeScript代码包装成可执行的JavaScript
  console.log('1. 创建包装器...')

  // 读取并处理TypeScript文件
  const processTSFile = filePath => {
    let content = fs.readFileSync(filePath, 'utf8')

    // 移除类型注解
    content = content.replace(/:\s*[^=,\)\{]+/g, '')
    content = content.replace(/<[^>]+>/g, '')

    // 替换export default为const
    content = content.replace(/export default/g, 'const')

    // 移除import语句
    content = content.replace(/import\s+.*?from\s+['"][^'"]*['"];?\s*/g, '')

    return content
  }

  // 处理dcArray
  let dcArrayContent = processTSFile(path.join(__dirname, '../src/utils/dcArray.ts'))
  // 修复类名
  dcArrayContent = dcArrayContent.replace(/class DCArray/g, 'class dcArray')

  // 处理dcString
  let dcStringContent = processTSFile(path.join(__dirname, '../src/utils/dcString.ts'))
  // 修复类名
  dcStringContent = dcStringContent.replace(/class DCString/g, 'class dcString')

  // 处理dcProgressBar
  let dcProgressBarContent = processTSFile(path.join(__dirname, '../src/components/dcprogressbar/dcprogressbar.ts'))
  // 修复类名
  dcProgressBarContent = dcProgressBarContent.replace(/class DCProgressBar/g, 'class dcProgressBar')

  // 创建包装器
  const wrapper = `
// DC.js - TypeScript版本
// 生成时间: ${new Date().toISOString()}

(function(global) {
  // 初始化全局DC对象
  global.DC = global.DC || {};

  ${dcArrayContent}
  global.DC.Array = dcArray;

  ${dcStringContent}
  global.DC.String = dcString;

  ${dcProgressBarContent}
  global.DC.ProgressBar = dcProgressBar;

})(typeof window !== 'undefined' ? window : this);
`

  // 2. 写入构建文件
  console.log('2. 写入构建文件...')
  const targetFile = path.join(__dirname, `../dist/dc-${version}-${dateString}-ts.js`)
  fs.writeFileSync(targetFile, wrapper)

  console.log(`TypeScript版本构建完成: ${targetFile}`)
} catch (error) {
  console.error('构建失败:', error.message)
  process.exit(1)
}
