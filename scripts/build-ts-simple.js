const fs = require('fs')
const path = require('path')

// 获取当前日期
const today = new Date()
const dateString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')

// 获取版本号
const packageJson = require('../package.json')
const version = packageJson.version

// 源文件路径
const sourceFile = path.join(__dirname, '../dist/dc.js')
const targetFile = path.join(__dirname, `../dist/dc-${version}-${dateString}.js`)

// 复制文件
fs.copyFileSync(sourceFile, targetFile)

// 创建TypeScript版本的文件
const tsTargetFile = path.join(__dirname, `../dist/dc-${version}-${dateString}-ts.js`)
fs.copyFileSync(sourceFile, tsTargetFile)

console.log(`TypeScript版本构建完成: ${tsTargetFile}`)
