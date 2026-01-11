const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 获取当前日期，格式为YYYYMMDD
function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

// 获取package.json中的版本号
function getVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  return packageJson.version
}

// 重命名构建文件
function renameBuildFiles() {
  const version = getVersion()
  const date = getCurrentDate()
  const distDir = path.join(__dirname, '../dist')

  // 检查dist目录是否存在
  if (!fs.existsSync(distDir)) {
    console.error('dist目录不存在，请先运行构建命令')
    process.exit(1)
  }

  // 查找构建文件
  const files = fs.readdirSync(distDir)

  files.forEach(file => {
    const filePath = path.join(distDir, file)
    const stats = fs.statSync(filePath)

    if (stats.isFile()) {
      // 获取文件扩展名
      const ext = path.extname(file)
      const basename = path.basename(file, ext)

      // 如果是主要的JS或CSS文件，则重命名
      if (basename === 'index' || basename === 'dc') {
        const newName = `dc-${version}-${date}${ext}`
        const newPath = path.join(distDir, newName)

        try {
          fs.renameSync(filePath, newPath)
          console.log(`文件已重命名: ${file} -> ${newName}`)
        } catch (error) {
          console.error(`重命名文件失败: ${error.message}`)
        }
      }
    }
  })
}

// 运行构建命令
function runBuild() {
  try {
    console.log('开始构建...')
    execSync('npm run build', { stdio: 'inherit' })
    console.log('构建完成')

    console.log('开始重命名构建文件...')
    renameBuildFiles()
    console.log('重命名完成')

    console.log('构建流程完成！')
  } catch (error) {
    console.error(`构建失败: ${error.message}`)
    process.exit(1)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  runBuild()
}

module.exports = {
  renameBuildFiles,
  runBuild,
}
