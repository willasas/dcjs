const fs = require('fs')
const path = require('path')

// 简单的SCSS到CSS转换函数
function scssToCss(scssContent) {
  // 移除SCSS变量定义（这些会在运行时通过CSS变量处理）
  let cssContent = scssContent.replace(/\$[a-zA-Z-]+:\s*[^;]+;\s*!default\s*/g, '')

  // 转换SCSS变量引用为CSS变量
  cssContent = cssContent.replace(/var\(--([a-zA-Z-]+)\)/g, 'var(--$1)')

  // 处理嵌套规则
  cssContent = cssContent.replace(/&__([a-zA-Z-]+)/g, '.dc-productivity-slider__$1')

  // 处理嵌套选择器
  cssContent = cssContent.replace(/\s*&\s*{\s*/g, ' ')
  cssContent = cssContent.replace(/\s*}\s*/g, '}')

  // 移除SCSS注释格式，保留为CSS注释
  cssContent = cssContent.replace(/\/\/\s*(.*)/g, '/* $1 */')

  // 处理媒体查询中的嵌套
  cssContent = cssContent.replace(/@media[^{]+\{[\s\S]*?\}/g, match => {
    return match.replace(/\s*&\s*{\s*/g, ' ').replace(/\s*}\s*/g, '}')
  })

  return cssContent
}

// 编译单个SCSS文件
function compileScssFile(scssFilePath) {
  try {
    const scssContent = fs.readFileSync(scssFilePath, 'utf8')
    const cssContent = scssToCss(scssContent)

    const cssFilePath = scssFilePath.replace(/\.scss$/, '.css')
    fs.writeFileSync(cssFilePath, cssContent, 'utf8')

    console.log(`✅ 成功编译: ${path.basename(scssFilePath)} -> ${path.basename(cssFilePath)}`)
    return true
  } catch (error) {
    console.error(`❌ 编译失败: ${scssFilePath}`, error.message)
    return false
  }
}

// 查找并编译所有SCSS文件
function compileAllScssFiles() {
  const componentsDir = path.join(__dirname, 'src', 'components')

  if (!fs.existsSync(componentsDir)) {
    console.log('❌ 找不到组件目录:', componentsDir)
    return
  }

  console.log('🔍 正在查找SCSS文件...')

  let compiledCount = 0
  let errorCount = 0

  // 遍历组件目录
  const componentDirs = fs.readdirSync(componentsDir)

  componentDirs.forEach(componentDir => {
    const componentPath = path.join(componentsDir, componentDir)

    if (fs.statSync(componentPath).isDirectory()) {
      const scssFiles = fs.readdirSync(componentPath).filter(file => file.endsWith('.scss'))

      scssFiles.forEach(scssFile => {
        const scssFilePath = path.join(componentPath, scssFile)
        if (compileScssFile(scssFilePath)) {
          compiledCount++
        } else {
          errorCount++
        }
      })
    }
  })

  console.log(`\n📊 编译完成:`)
  console.log(`   ✅ 成功编译: ${compiledCount} 个文件`)
  console.log(`   ❌ 编译失败: ${errorCount} 个文件`)

  if (compiledCount > 0) {
    console.log('\n💡 提示: CSS文件已生成在对应的组件目录中')
  }
}

// 主函数
if (require.main === module) {
  console.log('🚀 开始编译SCSS文件...\n')
  compileAllScssFiles()
}

module.exports = { compileScssFile, compileAllScssFiles }
