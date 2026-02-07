// 简单的构建脚本
const fs = require('fs')
const path = require('path')

// 读取文件内容
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
    return ''
  }
}

// 解析导入语句
function parseImports(content) {
  const importRegex = /import\s+['"]([^'"]+)['"]/g
  const imports = []
  let match
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1])
  }
  return imports
}

// 递归构建文件内容
function buildFile(filePath, visited = new Set()) {
  if (visited.has(filePath)) {
    return ''
  }
  visited.add(filePath)

  const content = readFile(filePath)
  const imports = parseImports(content)

  let result = content
  for (const importPath of imports) {
    let resolvedPath = path.resolve(path.dirname(filePath), importPath)
    // 如果文件不存在，尝试添加.js扩展名
    if (!fs.existsSync(resolvedPath)) {
      resolvedPath += '.js'
    }
    if (fs.existsSync(resolvedPath)) {
      result += '\n' + buildFile(resolvedPath, visited)
    }
  }

  return result
}

// 构建项目
function build() {
  const entryPoint = path.resolve(__dirname, 'src/index.js')
  const outputPath = path.resolve(__dirname, 'dist/dc.js')

  console.log('Building project...')
  console.log('Entry point:', entryPoint)
  console.log('Output path:', outputPath)

  const content = buildFile(entryPoint)

  try {
    // 确保dist目录存在
    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    }

    // 写入输出文件
    fs.writeFileSync(outputPath, content)
    console.log('Build completed successfully!')
    console.log('Output file size:', fs.statSync(outputPath).size, 'bytes')
  } catch (error) {
    console.error('Error writing output file:', error.message)
  }
}

// 运行构建
build()
