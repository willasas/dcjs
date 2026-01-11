const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 获取当前日期
const today = new Date()
const dateString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')

// 获取版本号
const packageJson = require('../package.json')
const version = packageJson.version

console.log('开始构建TypeScript版本...')

try {
  // 1. 使用Parcel构建TypeScript版本
  console.log('1. 使用Parcel构建TypeScript版本...')
  execSync('npx parcel build src/index.ts --dist-dir dist --no-source-maps --no-cache', { stdio: 'inherit', cwd: path.join(__dirname, '..') })

  // 2. 重命名构建文件
  console.log('2. 重命名构建文件...')
  const sourceFile = path.join(__dirname, '../dist/dc.js')
  const targetFile = path.join(__dirname, `../dist/dc-${version}-${dateString}-ts.js`)

  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile)
    console.log(`TypeScript版本构建完成: ${targetFile}`)
  } else {
    console.error('构建失败: 找不到构建文件')
  }

  console.log('TypeScript版本构建完成!')
} catch (error) {
  console.error('构建失败:', error.message)
  process.exit(1)
}
