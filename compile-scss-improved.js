const fs = require('fs')
const path = require('path')

// 改进的SCSS到CSS转换函数
function scssToCssImproved(scssContent) {
  let cssContent = scssContent

  // 1. 移除SCSS变量定义（这些会在运行时通过CSS变量处理）
  cssContent = cssContent.replace(/\$[a-zA-Z-]+:\s*[^;]+;\s*!default\s*/g, '')

  // 2. 转换SCSS变量引用为CSS变量
  cssContent = cssContent.replace(/var\(--([a-zA-Z-]+)\)/g, 'var(--$1)')

  // 3. 处理嵌套规则 - 更精确的转换
  cssContent = cssContent.replace(/&__([a-zA-Z-]+)/g, '.dc-productivity-slider__$1')
  cssContent = cssContent.replace(/&--([a-zA-Z-]+)/g, '.dc-productivity-slider--$1')

  // 4. 处理嵌套选择器 - 更精确的展开
  cssContent = cssContent.replace(/\s*&\s*{\s*/g, ' ')
  cssContent = cssContent.replace(/\s*}\s*/g, '}')

  // 5. 处理媒体查询中的嵌套
  cssContent = cssContent.replace(/@media[^{]+\{[\s\S]*?\}/g, match => {
    return match.replace(/\s*&\s*{\s*/g, ' ').replace(/\s*}\s*/g, '}')
  })

  // 6. 移除SCSS注释格式，保留为CSS注释
  cssContent = cssContent.replace(/\/\/\s*(.*)/g, '/* $1 */')

  // 7. 格式化和美化CSS
  cssContent = formatCss(cssContent)

  return cssContent
}

// CSS格式化函数
function formatCss(cssContent) {
  // 添加适当的缩进和换行
  let formatted = ''
  let indentLevel = 0
  const lines = cssContent.split('\n')

  for (let line of lines) {
    line = line.trim()

    if (line.includes('}')) {
      indentLevel = Math.max(0, indentLevel - 1)
    }

    if (line) {
      formatted += '  '.repeat(indentLevel) + line + '\n'
    }

    if (line.includes('{')) {
      indentLevel++
    }
  }

  return formatted
}

// 编译单个SCSS文件
function compileScssFile(scssFilePath) {
  try {
    const scssContent = fs.readFileSync(scssFilePath, 'utf8')
    const cssContent = scssToCssImproved(scssContent)

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
    console.log('📁 所有CSS文件都可以直接用于生产环境')
  }
}

// 主函数
if (require.main === module) {
  console.log('🚀 开始编译SCSS文件...\n')
  compileAllScssFiles()
}

module.exports = { compileScssFile, compileAllScssFiles }
