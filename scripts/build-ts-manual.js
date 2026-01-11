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
  // 1. 读取TypeScript入口文件内容
  console.log('1. 读取TypeScript入口文件...')
  const indexTsPath = path.join(__dirname, '../src/index.ts')
  const indexTsContent = fs.readFileSync(indexTsPath, 'utf8')

  // 2. 创建一个简单的包装器，将TypeScript代码包装成可执行的JavaScript
  console.log('2. 创建包装器...')
  const wrapper = `
// DC.js - TypeScript版本
// 生成时间: ${new Date().toISOString()}

(function(global) {
  // 初始化全局DC对象
  global.DC = global.DC || {};

  // 导入并注册dcArray
  ${fs.readFileSync(path.join(__dirname, '../src/utils/dcArray.ts'), 'utf8').replace(/export default/g, 'const dcArray =')}
  global.DC.Array = dcArray;

  // 导入并注册dcString
  ${fs.readFileSync(path.join(__dirname, '../src/utils/dcString.ts'), 'utf8').replace(/export default/g, 'const dcString =')}
  global.DC.String = dcString;

  // 导入并注册dcProgressBar
  ${fs.readFileSync(path.join(__dirname, '../src/components/dcprogressbar/dcprogressbar.ts'), 'utf8').replace(/export default/g, 'const dcProgressBar =')}
  global.DC.ProgressBar = dcProgressBar;

})(typeof window !== 'undefined' ? window : this);
`

  // 3. 写入构建文件
  console.log('3. 写入构建文件...')
  const targetFile = path.join(__dirname, `../dist/dc-${version}-${dateString}-ts.js`)
  fs.writeFileSync(targetFile, wrapper)

  console.log(`TypeScript版本构建完成: ${targetFile}`)
} catch (error) {
  console.error('构建失败:', error.message)
  process.exit(1)
}
