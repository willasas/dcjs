const fs = require('fs')
const path = require('path')

// 工具类列表
const utils = [
  'dcArray',
  'dcDate',
  'dcDevice',
  'dcDom',
  'dcEvent',
  'dcFile',
  'dcHttp',
  'dcJson',
  'dcLocalStorage',
  'dcMath',
  'dcNetwork',
  'dcNumber',
  'dcObject',
  'dcRandom',
  'dcStorage',
  'dcString',
  'dcUrl',
  'dcValidate',
  'dcWeb',
]

// 组件列表
const components = [
  'animate/dcanimator',
  'article/dcarticlecard',
  'button/dcbutton',
  'card/dccard',
  'carousel/dccarousel',
  'checkbox/dccheckbox',
  'date/dcdatetime',
  'dialog/dcdialog',
  'divider/dcdivider',
  'dropdown/dcdropdown',
  'form/dcform',
  'grid/dcgrid',
  'image/dcimage',
  'input/dcinput',
  'list/dclist',
  'loading/dcloading',
  'modal/dcmodal',
  'nav/dcnav',
  'pagination/dcpagination',
  'panel/dcpanel',
  'progressbar/dcprogressbar',
  'radio/dcradio',
  'select/dcselect',
  'slider/dcslider',
  'switch/dcswitch',
  'table/dctable',
  'tabs/dctabs',
  'tag/dctag',
  'textarea/dctextarea',
  'tooltip/dctooltip',
  'tree/dctree',
  'upload/dcupload',
]

// 创建目录（如果不存在）
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// 生成工具类测试用例
function generateUtilTest(utilName) {
  const testDir = path.join(__dirname, '../test/utils', utilName)
  ensureDirExists(testDir)

  const testFile = path.join(testDir, `${utilName}.test.js`)
  if (!fs.existsSync(testFile)) {
    const testContent = `
// ${utilName} 工具类测试用例
describe('${utilName}', () => {
    // 基本功能测试
    test('应该正确初始化', () => {
        expect(DC.${utilName}).toBeDefined();
    });

    // 添加更多测试用例...
});
`
    fs.writeFileSync(testFile, testContent)
    console.log(`创建测试文件: ${testFile}`)
  }

  const testHtmlFile = path.join(testDir, `${utilName}.html`)
  if (!fs.existsSync(testHtmlFile)) {
    const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${utilName} 测试页面</title>
    <link rel="stylesheet" href="../../../dist/dc-1.0.0-2026-01-07.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .test-section {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .controls {
            margin: 15px 0;
        }
        button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        button:hover {
            background-color: #45a049;
        }
        .result {
            margin-top: 10px;
            padding: 10px;
            background-color: #e9f7ef;
            border-radius: 3px;
            border-left: 4px solid #4CAF50;
            font-family: monospace;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>${utilName} 工具类测试</h1>

    <div class="test-section">
        <h2>基本功能测试</h2>
        <div class="controls">
            <button onclick="testBasicFunction()">测试基本功能</button>
        </div>
        <div class="result" id="basic-result">测试结果将显示在这里</div>
    </div>

    <script src="../../../dist/dc-1.0.0-2026-01-07.js"></script>
    <script>
        function testBasicFunction() {
            try {
                // 添加测试代码
                document.getElementById('basic-result').textContent = '测试通过';
            } catch (error) {
                document.getElementById('basic-result').textContent = '测试失败: ' + error.message;
            }
        }
    </script>
</body>
</html>
`
    fs.writeFileSync(testHtmlFile, htmlContent)
    console.log(`创建测试HTML: ${testHtmlFile}`)
  }
}

// 生成组件测试用例
function generateComponentTest(componentPath) {
  const componentName = path.basename(componentPath)
  const testDir = path.join(__dirname, '../test/components', componentName)
  ensureDirExists(testDir)

  const testFile = path.join(testDir, `${componentName}.test.js`)
  if (!fs.existsSync(testFile)) {
    const testContent = `
// ${componentName} 组件测试用例
describe('${componentName}', () => {
    // 基本功能测试
    test('应该正确初始化', () => {
        expect(DC.${componentName}).toBeDefined();
    });

    // 添加更多测试用例...
});
`
    fs.writeFileSync(testFile, testContent)
    console.log(`创建测试文件: ${testFile}`)
  }

  const testHtmlFile = path.join(testDir, `${componentName}.html`)
  if (!fs.existsSync(testHtmlFile)) {
    const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${componentName} 组件测试页面</title>
    <link rel="stylesheet" href="../../../dist/dc-1.0.0-2026-01-07.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .test-section {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .controls {
            margin: 15px 0;
        }
        button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        button:hover {
            background-color: #45a049;
        }
        .result {
            margin-top: 10px;
            padding: 10px;
            background-color: #e9f7ef;
            border-radius: 3px;
            border-left: 4px solid #4CAF50;
            font-family: monospace;
            font-size: 14px;
        }
        .component-container {
            margin: 15px 0;
            padding: 15px;
            border: 1px dashed #ccc;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>${componentName} 组件测试</h1>

    <div class="test-section">
        <h2>基本功能测试</h2>
        <div class="component-container" id="component-container"></div>
        <div class="controls">
            <button onclick="testBasicFunction()">测试基本功能</button>
        </div>
        <div class="result" id="basic-result">测试结果将显示在这里</div>
    </div>

    <script src="../../../dist/dc-1.0.0-2026-01-07.js"></script>
    <script>
        function testBasicFunction() {
            try {
                // 添加测试代码
                document.getElementById('basic-result').textContent = '测试通过';
            } catch (error) {
                document.getElementById('basic-result').textContent = '测试失败: ' + error.message;
            }
        }
    </script>
</body>
</html>
`
    fs.writeFileSync(testHtmlFile, htmlContent)
    console.log(`创建测试HTML: ${testHtmlFile}`)
  }
}

// 生成工具类文档
function generateUtilDoc(utilName) {
  const docDir = path.join(__dirname, '../docs')
  ensureDirExists(docDir)

  const docFile = path.join(docDir, `${utilName}.md`)
  if (!fs.existsSync(docFile)) {
    const docContent = `
# ${utilName} 工具类

## 概述
\`${utilName}\` 是 DC 框架中的工具类，提供了一系列实用的工具方法。

## 安装与引入
\`\`\`javascript
// JavaScript 版本
import { ${utilName} } from './dist/dc-1.0.0-2026-01-07.js';

// 或者直接使用
DC.${utilName}.methodName();
\`\`\`

## API 文档

### 基本方法

#### \`methodName(param1, param2)\`
- **参数**:
  - \`param1\` (类型): 参数描述
  - \`param2\` (类型): 参数描述
- **返回值**: 返回值描述
- **示例**:
  \`\`\`javascript
  const result = DC.${utilName}.methodName(param1, param2);
  console.log(result);
  \`\`\`

## 使用示例

### 基本使用
\`\`\`javascript
// 基本使用示例
const result = DC.${utilName}.methodName();
console.log(result);
\`\`\`

## 注意事项
1. 注意事项1
2. 注意事项2

## 测试
- 单元测试文件: \`test/utils/${utilName}/${utilName}.test.js\`
- 测试页面: \`test/utils/${utilName}/${utilName}.html\`
- 示例页面: \`examples/utils/${utilName}/index.html\`

## 版本历史
- v1.0.0: 初始版本
`
    fs.writeFileSync(docFile, docContent)
    console.log(`创建文档: ${docFile}`)
  }
}

// 生成组件文档
function generateComponentDoc(componentPath) {
  const componentName = path.basename(componentPath)
  const docDir = path.join(__dirname, '../docs')
  ensureDirExists(docDir)

  const docFile = path.join(docDir, `${componentName}.md`)
  if (!fs.existsSync(docFile)) {
    const docContent = `
# ${componentName} 组件

## 概述
\`${componentName}\` 是 DC 框架中的UI组件，提供了丰富的交互功能。

## 安装与引入
\`\`\`javascript
// JavaScript 版本
import { ${componentName} } from './dist/dc-1.0.0-2026-01-07.js';

// 或者直接使用
const component = new DC.${componentName}({
    // 配置选项
});
\`\`\`

## 基本用法

### 创建组件
\`\`\`javascript
const component = new DC.${componentName}({
    container: '#container',
    // 其他配置选项
});
\`\`\`

## API 文档

### 构造函数选项

#### \`option\`
- \`container\` (string|HTMLElement): 组件容器选择器或DOM元素
- 其他选项...

### 方法

#### \`methodName(param1, param2)\`
- **参数**:
  - \`param1\` (类型): 参数描述
  - \`param2\` (类型): 参数描述
- **返回值**: 返回值描述
- **示例**:
  \`\`\`javascript
  component.methodName(param1, param2);
  \`\`\`

## 使用示例

### 基本使用
\`\`\`html
<div id="container"></div>

<script>
const component = new DC.${componentName}({
    container: '#container'
});
</script>
\`\`\`

## 注意事项
1. 注意事项1
2. 注意事项2

## 测试
- 单元测试文件: \`test/components/${componentName}/${componentName}.test.js\`
- 测试页面: \`test/components/${componentName}/${componentName}.html\`
- 示例页面: \`examples/components/${componentPath}/index.html\`

## 版本历史
- v1.0.0: 初始版本
`
    fs.writeFileSync(docFile, docContent)
    console.log(`创建文档: ${docFile}`)
  }
}

// 生成工具类示例页面
function generateUtilExample(utilName) {
  const exampleDir = path.join(__dirname, '../examples/utils', utilName)
  ensureDirExists(exampleDir)

  const exampleFile = path.join(exampleDir, 'index.html')
  if (!fs.existsSync(exampleFile)) {
    const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${utilName} 工具类示例</title>
    <link rel="stylesheet" href="../../dist/dc-1.0.0-2026-01-07.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .example {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .example h3 {
            margin-top: 0;
            color: #555;
        }
        .controls {
            margin: 15px 0;
        }
        input {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 300px;
            margin-right: 10px;
        }
        button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        button:hover {
            background-color: #45a049;
        }
        .code-block {
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin: 15px 0;
            overflow-x: auto;
            font-family: monospace;
            font-size: 14px;
        }
        .result {
            margin-top: 10px;
            padding: 10px;
            background-color: #e9f7ef;
            border-radius: 3px;
            border-left: 4px solid #4CAF50;
            font-family: monospace;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>${utilName} 工具类示例</h1>

    <div class="example">
        <h3>基本用法示例</h3>
        <div class="controls">
            <button onclick="testBasicExample()">测试基本功能</button>
        </div>
        <div class="result" id="result">结果将显示在这里</div>

        <div class="code-block">
// 基本用法示例
const result = DC.${utilName}.methodName(param);
console.log(result);
        </div>
    </div>

    <script src="../../dist/dc-1.0.0-2026-01-07.js"></script>
    <script>
        function testBasicExample() {
            try {
                // 添加示例代码
                document.getElementById('result').textContent = '示例执行成功';
            } catch (error) {
                document.getElementById('result').textContent = '示例执行失败: ' + error.message;
            }
        }
    </script>
</body>
</html>
`
    fs.writeFileSync(exampleFile, htmlContent)
    console.log(`创建示例: ${exampleFile}`)
  }
}

// 生成组件示例页面
function generateComponentExample(componentPath) {
  const componentName = path.basename(componentPath)
  const exampleDir = path.join(__dirname, '../examples/components', componentPath)
  ensureDirExists(exampleDir)

  const exampleFile = path.join(exampleDir, 'index.html')
  if (!fs.existsSync(exampleFile)) {
    const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${componentName} 组件示例</title>
    <link rel="stylesheet" href="../../../dist/dc-1.0.0-2026-01-07.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .example {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .example h3 {
            margin-top: 0;
            color: #555;
        }
        .controls {
            margin: 15px 0;
        }
        button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        button:hover {
            background-color: #45a049;
        }
        .code-block {
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin: 15px 0;
            overflow-x: auto;
            font-family: monospace;
            font-size: 14px;
        }
        .result {
            margin-top: 10px;
            padding: 10px;
            background-color: #e9f7ef;
            border-radius: 3px;
            border-left: 4px solid #4CAF50;
            font-family: monospace;
            font-size: 14px;
        }
        .component-container {
            margin: 15px 0;
            padding: 15px;
            border: 1px dashed #ccc;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>${componentName} 组件示例</h1>

    <div class="example">
        <h3>基本用法示例</h3>
        <div class="component-container" id="component-container"></div>
        <div class="controls">
            <button onclick="testBasicExample()">测试基本功能</button>
        </div>
        <div class="result" id="result">结果将显示在这里</div>

        <div class="code-block">
// 基本用法示例
const component = new DC.${componentName}({
    container: '#component-container'
});
        </div>
    </div>

    <script src="../../../dist/dc-1.0.0-2026-01-07.js"></script>
    <script>
        let component;

        function testBasicExample() {
            try {
                // 添加示例代码
                component = new DC.${componentName}({
                    container: '#component-container'
                });

                document.getElementById('result').textContent = '示例执行成功';
            } catch (error) {
                document.getElementById('result').textContent = '示例执行失败: ' + error.message;
            }
        }
    </script>
</body>
</html>
`
    fs.writeFileSync(exampleFile, htmlContent)
    console.log(`创建示例: ${exampleFile}`)
  }
}

// 主函数
function main() {
  console.log('开始生成测试用例、示例页面和文档...')

  // 生成工具类相关文件
  utils.forEach(utilName => {
    generateUtilTest(utilName)
    generateUtilDoc(utilName)
    generateUtilExample(utilName)
  })

  // 生成组件相关文件
  components.forEach(componentPath => {
    generateComponentTest(componentPath)
    generateComponentDoc(componentPath)
    generateComponentExample(componentPath)
  })

  console.log('生成完成！')
}

// 执行主函数
main()
