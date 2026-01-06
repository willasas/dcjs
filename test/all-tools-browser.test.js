// dcjs 库所有工具类的浏览器测试用例

// 等待页面加载完成后再执行测试
document.addEventListener('DOMContentLoaded', function() {
  // 确保库已加载
  if (!window.DC) {
    console.error('DC库未正确加载');
    return;
  }

  // 创建测试结果容器
  const testContainer = document.createElement('div');
  testContainer.id = 'test-results';
  testContainer.style.cssText = `
    font-family: Arial, sans-serif;
    padding: 20px;
    margin: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-height: 80vh;
    overflow-y: auto;
  `;
  document.body.appendChild(testContainer);

  // 添加测试标题
  const title = document.createElement('h1');
  title.textContent = 'DCJS 工具库测试结果';
  testContainer.appendChild(title);

  // 测试结果计数器
  let passedTests = 0;
  let totalTests = 0;

  // 记录测试结果的函数
  function addTestResult(testName, passed, details = '') {
    totalTests++;
    if (passed) passedTests++;
    
    const resultDiv = document.createElement('div');
    resultDiv.style.cssText = `
      padding: 10px;
      margin: 5px 0;
      border-radius: 4px;
      background-color: ${passed ? '#e8f5e9' : '#ffebee'};
      border: 1px solid ${passed ? '#4caf50' : '#f44336'};
    `;
    
    resultDiv.innerHTML = `
      <strong>${passed ? '✓' : '✗'} ${testName}</strong>
      ${details ? '<br><small>' + details + '</small>' : ''}
    `;
    
    testContainer.appendChild(resultDiv);
  }

  // 运行所有测试
  function runTests() {
    console.log('开始运行DCJS工具库测试...');

    // DC.Array 测试
    try {
      const uniqueResult = DC.Array.unique([1, 2, 2, 3, 3, 4]);
      addTestResult('DC.Array.unique', JSON.stringify(uniqueResult) === JSON.stringify([1, 2, 3, 4]), `结果: ${JSON.stringify(uniqueResult)}`);
    } catch (e) {
      addTestResult('DC.Array.unique', false, `错误: ${e.message}`);
    }

    try {
      const flattenResult = DC.Array.flatten([1, [2, [3, 4]]]);
      addTestResult('DC.Array.flatten', JSON.stringify(flattenResult) === JSON.stringify([1, 2, 3, 4]), `结果: ${JSON.stringify(flattenResult)}`);
    } catch (e) {
      addTestResult('DC.Array.flatten', false, `错误: ${e.message}`);
    }

    // DC.String 测试
    try {
      const trimResult = DC.String.trim('  hello  ');
      addTestResult('DC.String.trim', trimResult === 'hello', `结果: "${trimResult}"`);
    } catch (e) {
      addTestResult('DC.String.trim', false, `错误: ${e.message}`);
    }

    try {
      const capitalizeResult = DC.String.capitalize('hello');
      addTestResult('DC.String.capitalize', capitalizeResult === 'Hello', `结果: "${capitalizeResult}"`);
    } catch (e) {
      addTestResult('DC.String.capitalize', false, `错误: ${e.message}`);
    }

    // DC.Number 测试
    try {
      const isEvenResult = DC.Number.isEven(4);
      addTestResult('DC.Number.isEven(4)', isEvenResult === true, `结果: ${isEvenResult}`);
    } catch (e) {
      addTestResult('DC.Number.isEven(4)', false, `错误: ${e.message}`);
    }

    try {
      const isEvenResult2 = DC.Number.isEven(5);
      addTestResult('DC.Number.isEven(5)', isEvenResult2 === false, `结果: ${isEvenResult2}`);
    } catch (e) {
      addTestResult('DC.Number.isEven(5)', false, `错误: ${e.message}`);
    }

    // DC.Date 测试
    try {
      const date = new Date('2023-01-01');
      const formatResult = DC.Date.format(date, 'YYYY-MM-DD');
      addTestResult('DC.Date.format', formatResult === '2023-01-01', `结果: "${formatResult}"`);
    } catch (e) {
      addTestResult('DC.Date.format', false, `错误: ${e.message}`);
    }

    // DC.Url 测试
    try {
      const parseResult = DC.Url.parse('https://example.com/path?a=1#section');
      const passed = parseResult && parseResult.hostname === 'example.com';
      addTestResult('DC.Url.parse', passed, `结果: hostname = "${parseResult ? parseResult.hostname : 'N/A'}"`);
    } catch (e) {
      addTestResult('DC.Url.parse', false, `错误: ${e.message}`);
    }

    // DC.Validate 测试
    try {
      const emailResult = DC.Validate.isEmail('test@example.com');
      addTestResult('DC.Validate.isEmail', emailResult === true, `结果: ${emailResult}`);
    } catch (e) {
      addTestResult('DC.Validate.isEmail', false, `错误: ${e.message}`);
    }

    // DC.Element 测试
    try {
      const div = document.createElement('div');
      DC.Element.addClass(div, 'test-class');
      const hasClass = div.classList.contains('test-class');
      addTestResult('DC.Element.addClass', hasClass === true, `结果: 元素有 test-class 类 = ${hasClass}`);
    } catch (e) {
      addTestResult('DC.Element.addClass', false, `错误: ${e.message}`);
    }

    // DC.Function 测试
    try {
      const throttledFn = DC.Function.throttle(() => {
        // 模拟一个函数
      }, 100);
      addTestResult('DC.Function.throttle', typeof throttledFn === 'function', `结果: 返回了函数 = ${typeof throttledFn}`);
    } catch (e) {
      addTestResult('DC.Function.throttle', false, `错误: ${e.message}`);
    }

    // DC.QRCode 测试
    try {
      const qrCode = new DC.QRCode();
      const result = qrCode.generate('test content');
      const passed = typeof result === 'string' && result.startsWith('data:image');
      addTestResult('DC.QRCode.generate', passed, `结果: 生成了 ${result.length} 字符的data URL`);
    } catch (e) {
      addTestResult('DC.QRCode.generate', false, `错误: ${e.message}`);
    }

    // DC.NetworkChecker 测试
    try {
      const networkChecker = new DC.NetworkChecker();
      addTestResult('DC.NetworkChecker 创建实例', typeof networkChecker === 'object', `结果: 创建了对象 = ${typeof networkChecker}`);
    } catch (e) {
      addTestResult('DC.NetworkChecker 创建实例', false, `错误: ${e.message}`);
    }

    // 添加测试摘要
    const summaryDiv = document.createElement('div');
    summaryDiv.style.cssText = `
      padding: 15px;
      margin: 15px 0;
      background-color: #e3f2fd;
      border-radius: 4px;
      font-weight: bold;
    `;
    summaryDiv.textContent = `测试摘要: ${passedTests}/${totalTests} 个测试通过`;
    testContainer.insertBefore(summaryDiv, testContainer.firstChild);

    console.log(`测试完成: ${passedTests}/${totalTests} 个测试通过`);
  }

  // 延迟执行测试，确保所有脚本都已加载
  setTimeout(runTests, 100);
});