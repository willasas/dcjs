/**
 * dcString 工具类单元测试
 * @author DC Team
 * @version 1.0.0
 */

// 导入要测试的模块
const dcString = require('../../../src/utils/dcString.js')

// 测试套件
function runTests() {
  let passedTests = 0
  let totalTests = 0

  // 测试辅助函数
  function test(description, testFunction) {
    totalTests++
    try {
      const result = testFunction()
      if (result) {
        console.log(`✓ ${description}`)
        passedTests++
      } else {
        console.error(`✗ ${description}`)
      }
    } catch (error) {
      console.error(`✗ ${description}: ${error.message}`)
    }
  }

  // 基本功能测试
  console.log('=== 基本功能测试 ===')

  test('dcString 工具类存在', () => {
    return typeof dcString === 'object'
  })

  test('capitalize 方法存在', () => {
    return typeof dcString.capitalize === 'function'
  })

  test('toCamelCase 方法存在', () => {
    return typeof dcString.toCamelCase === 'function'
  })

  test('toSnakeCase 方法存在', () => {
    return typeof dcString.toSnakeCase === 'function'
  })

  test('toKebabCase 方法存在', () => {
    return typeof dcString.toKebabCase === 'function'
  })

  test('truncate 方法存在', () => {
    return typeof dcString.truncate === 'function'
  })

  test('reverse 方法存在', () => {
    return typeof dcString.reverse === 'function'
  })

  test('stripHtml 方法存在', () => {
    return typeof dcString.stripHtml === 'function'
  })

  test('escapeHtml 方法存在', () => {
    return typeof dcString.escapeHtml === 'function'
  })

  test('unescapeHtml 方法存在', () => {
    return typeof dcString.unescapeHtml === 'function'
  })

  test('random 方法存在', () => {
    return typeof dcString.random === 'function'
  })

  test('byteLength 方法存在', () => {
    return typeof dcString.byteLength === 'function'
  })

  test('template 方法存在', () => {
    return typeof dcString.template === 'function'
  })

  test('contains 方法存在', () => {
    return typeof dcString.contains === 'function'
  })

  // 字符串转换测试
  console.log('\n=== 字符串转换测试 ===')

  test('capitalize("hello") 应该返回 "Hello"', () => {
    return dcString.capitalize('hello') === 'Hello'
  })

  test('capitalize("HELLO") 应该返回 "Hello"', () => {
    return dcString.capitalize('HELLO') === 'Hello'
  })

  test('toCamelCase("hello-world") 应该返回 "helloWorld"', () => {
    return dcString.toCamelCase('hello-world') === 'helloWorld'
  })

  test('toCamelCase("hello-world", true) 应该返回 "HelloWorld"', () => {
    return dcString.toCamelCase('hello-world', true) === 'HelloWorld'
  })

  test('toSnakeCase("helloWorld") 应该返回 "hello_world"', () => {
    return dcString.toSnakeCase('helloWorld') === 'hello_world'
  })

  test('toKebabCase("helloWorld") 应该返回 "hello-world"', () => {
    return dcString.toKebabCase('helloWorld') === 'hello-world'
  })

  // 字符串处理测试
  console.log('\n=== 字符串处理测试 ===')

  test('truncate("hello world", 5) 应该返回 "hello..."', () => {
    return dcString.truncate('hello world', 5) === 'hello...'
  })

  test('truncate("hello", 10) 应该返回 "hello"', () => {
    return dcString.truncate('hello', 10) === 'hello'
  })

  test('reverse("hello") 应该返回 "olleh"', () => {
    return dcString.reverse('hello') === 'olleh'
  })

  test('stripHtml("<p>hello</p>") 应该返回 "hello"', () => {
    return dcString.stripHtml('<p>hello</p>') === 'hello'
  })

  test('stripHtml("<div><p>hello</p></div>") 应该返回 "hello"', () => {
    return dcString.stripHtml('<div><p>hello</p></div>') === 'hello'
  })

  test('escapeHtml("<script>") 应该返回 "&lt;script&gt;"', () => {
    return dcString.escapeHtml('<script>') === '&lt;script&gt;'
  })

  test('unescapeHtml("&lt;script&gt;") 应该返回 "<script>"', () => {
    return dcString.unescapeHtml('&lt;script&gt;') === '<script>'
  })

  // 字符串验证测试
  console.log('\n=== 字符串验证测试 ===')

  test('contains("hello world", "world") 应该返回 true', () => {
    return dcString.contains('hello world', 'world') === true
  })

  test('contains("Hello World", "world", false) 应该返回 true', () => {
    return dcString.contains('Hello World', 'world', false) === true
  })

  test('contains("hello world", ["hello", "world"]) 应该返回 true', () => {
    return dcString.contains('hello world', ['hello', 'world']) === true
  })

  test('contains("hello world", ["test", "world"]) 应该返回 true', () => {
    return dcString.contains('hello world', ['test', 'world']) === true
  })

  test('contains("hello world", ["test", "example"]) 应该返回 false', () => {
    return dcString.contains('hello world', ['test', 'example']) === false
  })

  test('template("Hello ${name}", {name: "World"}) 应该返回 "Hello World"', () => {
    return dcString.template('Hello ${name}', { name: 'World' }) === 'Hello World'
  })

  test('template("Hello ${name}, ${greeting}", {name: "World", greeting: "Good morning"}) 应该返回 "Hello World, Good morning"', () => {
    return dcString.template('Hello ${name}, ${greeting}', { name: 'World', greeting: 'Good morning' }) === 'Hello World, Good morning'
  })

  // 字符串工具测试
  console.log('\n=== 字符串工具测试 ===')

  test('byteLength("hello") 应该返回 5', () => {
    return dcString.byteLength('hello') === 5
  })

  test('byteLength("你好") 应该返回 4', () => {
    return dcString.byteLength('你好') === 4
  })

  test('random(5) 应该返回长度为5的字符串', () => {
    return dcString.random(5).length === 5
  })

  test('random(10, "abc") 应该返回只包含abc的长度为10的字符串', () => {
    const str = dcString.random(10, 'abc')
    return str.length === 10 && /^[abc]+$/.test(str)
  })

  // 边界情况测试
  console.log('\n=== 边界情况测试 ===')

  test('capitalize("") 应该返回 ""', () => {
    return dcString.capitalize('') === ''
  })

  test('toCamelCase("") 应该返回 ""', () => {
    return dcString.toCamelCase('') === ''
  })

  test('toSnakeCase("") 应该返回 ""', () => {
    return dcString.toSnakeCase('') === ''
  })

  test('toKebabCase("") 应该返回 ""', () => {
    return dcString.toKebabCase('') === ''
  })

  test('truncate("", 5) 应该返回 ""', () => {
    return dcString.truncate('', 5) === ''
  })

  test('reverse("") 应该返回 ""', () => {
    return dcString.reverse('') === ''
  })

  test('stripHtml("") 应该返回 ""', () => {
    return dcString.stripHtml('') === ''
  })

  test('escapeHtml("") 应该返回 ""', () => {
    return dcString.escapeHtml('') === ''
  })

  test('unescapeHtml("") 应该返回 ""', () => {
    return dcString.unescapeHtml('') === ''
  })

  test('contains("", "test") 应该返回 false', () => {
    return dcString.contains('', 'test') === false
  })

  test('contains("hello", "") 应该返回 true', () => {
    return dcString.contains('hello', '') === true
  })

  test('byteLength("") 应该返回 0', () => {
    return dcString.byteLength('') === 0
  })

  test('random(0) 应该返回空字符串', () => {
    return dcString.random(0) === ''
  })

  // 输出测试结果
  console.log(`\n=== 测试完成 ===`)
  console.log(`总测试数: ${totalTests}`)
  console.log(`通过测试: ${passedTests}`)
  console.log(`失败测试: ${totalTests - passedTests}`)
  console.log(`通过率: ${((passedTests / totalTests) * 100).toFixed(2)}%`)

  return {
    total: totalTests,
    passed: passedTests,
    failed: totalTests - passedTests,
    passRate: (passedTests / totalTests) * 100,
  }
}

// 如果直接运行此文件，则执行测试
if (require.main === module) {
  runTests()
}

// 导出测试函数
module.exports = runTests
