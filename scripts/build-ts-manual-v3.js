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
  // 1. 创建一个简单的包装器，直接使用JavaScript版本的组件
  console.log('1. 创建包装器...')

  // 读取JavaScript版本的文件
  const dcArrayContent = fs.readFileSync(path.join(__dirname, '../src/utils/dcArray.js'), 'utf8')
  const dcStringContent = fs.readFileSync(path.join(__dirname, '../src/utils/dcString.js'), 'utf8')
  const dcProgressBarContent = fs.readFileSync(path.join(__dirname, '../src/components/dcprogressbar/dcprogressbar.js'), 'utf8')

  // 处理dcProgressBar内容，移除全局注册部分并修正类名
  const processedProgressBarContent = dcProgressBarContent
    .replace(/\/\/ 全局命名空间[\s\S]*?window\.DC\.ProgressBar = DCProgressBar[\s\S]*?}/, '')
    .replace(/class DCProgressBar/g, 'class dcProgressBar')
    .replace(/new DCProgressBar/g, 'new dcProgressBar')

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
  // 添加方法别名以保持兼容性
  dcString.camelCase = dcString.toCamelCase;
  dcString.kebabCase = dcString.toKebabCase;
  global.DC.String = dcString;

  ${processedProgressBarContent}
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
