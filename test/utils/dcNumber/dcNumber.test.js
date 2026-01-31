/**
 * dcNumber 工具类单元测试
 * @author DC Team
 * @version 1.0.0
 */

// 导入要测试的模块
const dcNumber = require('../../../src/utils/dcNumber.js')

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

  test('dcNumber 工具类存在', () => {
    return typeof dcNumber === 'function'
  })

  // 方法存在性测试
  console.log('\n=== 方法存在性测试 ===')

  test('format 方法存在', () => {
    return typeof dcNumber.format === 'function'
  })

  test('toChinese 方法存在', () => {
    return typeof dcNumber.toChinese === 'function'
  })

  test('calculate 方法存在', () => {
    return typeof dcNumber.calculate === 'function'
  })

  test('clamp 方法存在', () => {
    return typeof dcNumber.clamp === 'function'
  })

  test('sqrt 方法存在', () => {
    return typeof dcNumber.sqrt === 'function'
  })

  test('random 方法存在', () => {
    return typeof dcNumber.random === 'function'
  })

  test('pad 方法存在', () => {
    return typeof dcNumber.pad === 'function'
  })

  test('isInteger 方法存在', () => {
    return typeof dcNumber.isInteger === 'function'
  })

  test('percentage 方法存在', () => {
    return typeof dcNumber.percentage === 'function'
  })

  test('toFileSize 方法存在', () => {
    return typeof dcNumber.toFileSize === 'function'
  })

  test('round 方法存在', () => {
    return typeof dcNumber.round === 'function'
  })

  test('toRoman 方法存在', () => {
    return typeof dcNumber.toRoman === 'function'
  })

  test('isPrime 方法存在', () => {
    return typeof dcNumber.isPrime === 'function'
  })

  test('factorial 方法存在', () => {
    return typeof dcNumber.factorial === 'function'
  })

  test('sum 方法存在', () => {
    return typeof dcNumber.sum === 'function'
  })

  test('subtract 方法存在', () => {
    return typeof dcNumber.subtract === 'function'
  })

  test('multiply 方法存在', () => {
    return typeof dcNumber.multiply === 'function'
  })

  test('divide 方法存在', () => {
    return typeof dcNumber.divide === 'function'
  })

  test('count 方法存在', () => {
    return typeof dcNumber.count === 'function'
  })

  // 功能测试
  console.log('\n=== 功能测试 ===')

  // format 方法测试
  test('format 方法能正确格式化数字', () => {
    return dcNumber.format(12345.6789) === '12,345.68'
  })

  test('format 方法能自定义小数位数', () => {
    return dcNumber.format(12345.6789, 3) === '12,345.679'
  })

  test('format 方法能自定义分隔符', () => {
    return dcNumber.format(12345.6789, 2, ',', '.') === '12.345,68'
  })

  test('format 方法能处理非数字输入', () => {
    return dcNumber.format('12345') === '12,345.00'
  })

  // toChinese 方法测试
  test('toChinese 方法能转换整数', () => {
    return dcNumber.toChinese(1234) === '壹仟贰佰叁拾肆元整'
  })

  test('toChinese 方法能转换小数', () => {
    return dcNumber.toChinese(1234.56) === '壹仟贰佰叁拾肆元伍角陆分'
  })

  test('toChinese 方法能处理零', () => {
    return dcNumber.toChinese(0) === '零元整'
  })

  test('toChinese 方法能处理负数', () => {
    return dcNumber.toChinese(-1234) === '负壹仟贰佰叁拾肆元整'
  })

  // calculate 方法测试
  test('calculate 方法能正确执行加法', () => {
    return dcNumber.calculate(0.1, 0.2, 'add') === 0.3
  })

  test('calculate 方法能正确执行减法', () => {
    return dcNumber.calculate(1, 0.1, 'subtract') === 0.9
  })

  test('calculate 方法能正确执行乘法', () => {
    return dcNumber.calculate(0.1, 0.2, 'multiply') === 0.02
  })

  test('calculate 方法能正确执行除法', () => {
    return dcNumber.calculate(0.3, 0.1, 'divide') === 3
  })

  // clamp 方法测试
  test('clamp 方法能限制数字在范围内', () => {
    return dcNumber.clamp(15, 0, 10) === 10
  })

  test('clamp 方法能保持数字在范围内', () => {
    return dcNumber.clamp(5, 0, 10) === 5
  })

  test('clamp 方法能限制数字在最小范围', () => {
    return dcNumber.clamp(-5, 0, 10) === 0
  })

  // sqrt 方法测试
  test('sqrt 方法能计算平方根', () => {
    return dcNumber.sqrt(9) === 3
  })

  test('sqrt 方法能处理非负数', () => {
    try {
      dcNumber.sqrt(-1)
      return false
    } catch (error) {
      return true
    }
  })

  // random 方法测试
  test('random 方法能生成随机小数', () => {
    const result = dcNumber.random(0, 1)
    return result >= 0 && result < 1
  })

  test('random 方法能生成随机整数', () => {
    const result = dcNumber.random(1, 10, true)
    return Number.isInteger(result) && result >= 1 && result < 10
  })

  // pad 方法测试
  test('pad 方法能补零', () => {
    return dcNumber.pad(5, 3) === '005'
  })

  test('pad 方法能处理长度足够的数字', () => {
    return dcNumber.pad(123, 2) === '123'
  })

  // isInteger 方法测试
  test('isInteger 方法能正确识别整数', () => {
    return dcNumber.isInteger(5) === true
  })

  test('isInteger 方法能正确识别非整数', () => {
    return dcNumber.isInteger(5.5) === false
  })

  // percentage 方法测试
  test('percentage 方法能计算百分比', () => {
    return dcNumber.percentage(25, 100) === '25.00%'
  })

  test('percentage 方法能处理自定义小数位数', () => {
    return dcNumber.percentage(3, 15, 1) === '20.0%'
  })

  test('percentage 方法能处理零总数', () => {
    return dcNumber.percentage(5, 0) === '0%'
  })

  // toFileSize 方法测试
  test('toFileSize 方法能转换字节为KB', () => {
    return dcNumber.toFileSize(1024) === '1.00 KB'
  })

  test('toFileSize 方法能转换字节为MB', () => {
    return dcNumber.toFileSize(1048576) === '1.00 MB'
  })

  test('toFileSize 方法能转换字节为GB', () => {
    return dcNumber.toFileSize(1073741824) === '1.00 GB'
  })

  // round 方法测试
  test('round 方法能四舍五入', () => {
    return dcNumber.round(1.2345, 2) === 1.23
  })

  test('round 方法能正确处理进位', () => {
    return dcNumber.round(1.235, 2) === 1.24
  })

  // toRoman 方法测试
  test('toRoman 方法能转换数字为罗马数字', () => {
    return dcNumber.toRoman(1994) === 'MCMXCIV'
  })

  test('toRoman 方法能处理边界值', () => {
    return dcNumber.toRoman(1) === 'I' && dcNumber.toRoman(3999) === 'MMMCMXCIX'
  })

  test('toRoman 方法能处理超出范围的值', () => {
    return dcNumber.toRoman(0) === '' && dcNumber.toRoman(4000) === ''
  })

  // isPrime 方法测试
  test('isPrime 方法能识别质数', () => {
    return dcNumber.isPrime(2) === true && dcNumber.isPrime(3) === true && dcNumber.isPrime(17) === true
  })

  test('isPrime 方法能识别非质数', () => {
    return dcNumber.isPrime(4) === false && dcNumber.isPrime(15) === false && dcNumber.isPrime(1) === false
  })

  // factorial 方法测试
  test('factorial 方法能计算阶乘', () => {
    return dcNumber.factorial(5) === 120
  })

  test('factorial 方法能处理零', () => {
    return dcNumber.factorial(0) === 1
  })

  test('factorial 方法能处理负数', () => {
    return isNaN(dcNumber.factorial(-1))
  })

  // 基本算术方法测试
  test('sum 方法能计算和', () => {
    return dcNumber.sum(5, 3) === 8
  })

  test('subtract 方法能计算差', () => {
    return dcNumber.subtract(10, 3) === 7
  })

  test('multiply 方法能计算积', () => {
    return dcNumber.multiply(5, 3) === 15
  })

  test('divide 方法能计算商', () => {
    return dcNumber.divide(10, 2) === 5
  })

  test('count 方法能执行加法', () => {
    return dcNumber.count(5, 3, '+') === 8
  })

  test('count 方法能执行减法', () => {
    return dcNumber.count(10, 3, '-') === 7
  })

  test('count 方法能执行乘法', () => {
    return dcNumber.count(5, 3, '*') === 15
  })

  test('count 方法能执行除法', () => {
    return dcNumber.count(10, 2, '/') === 5
  })

  // 边界情况测试
  console.log('\n=== 边界情况测试 ===')

  test('format 方法能处理大数字', () => {
    return typeof dcNumber.format(123456789.123456) === 'string'
  })

  test('calculate 方法能处理零除法', () => {
    try {
      dcNumber.calculate(1, 0, 'divide')
      return false
    } catch (error) {
      return true
    }
  })

  test('calculate 方法能处理不支持的运算类型', () => {
    try {
      dcNumber.calculate(1, 2, 'invalid')
      return false
    } catch (error) {
      return true
    }
  })

  test('random 方法能处理相等的 min 和 max', () => {
    return dcNumber.random(5, 5) === 5
  })

  test('percentage 方法能处理小数', () => {
    return typeof dcNumber.percentage(0.5, 1) === 'string'
  })

  test('toFileSize 方法能处理零字节', () => {
    return dcNumber.toFileSize(0) === '0 Bytes'
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