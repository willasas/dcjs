// dcCrypto 工具类单元测试

// 导入要测试的模块
const dcCrypto = require('../../../src/utils/dcCrypto.js');

// 测试套件
function runTests() {
  let passedTests = 0;
  let totalTests = 0;

  // 测试辅助函数
  function test(description, testFunction) {
    totalTests++;
    try {
      const result = testFunction();
      if (result) {
        console.log(`✓ ${description}`);
        passedTests++;
      } else {
        console.error(`✗ ${description}`);
      }
    } catch (error) {
      console.error(`✗ ${description}: ${error.message}`);
    }
  }

  // 加密解密测试
  test('encrypt: 正常文本加密', () => {
    const plaintext = 'Hello World';
    const password = 'secret123';
    const encrypted = dcCrypto.encrypt(plaintext, password);
    
    // 检查加密结果是否为非空字符串
    return typeof encrypted === 'string' && encrypted.length > 0 && encrypted !== plaintext;
  });

  test('decrypt: 正常文本解密', () => {
    const plaintext = 'Hello World';
    const password = 'secret123';
    const encrypted = dcCrypto.encrypt(plaintext, password);
    const decrypted = dcCrypto.decrypt(encrypted, password);
    
    return decrypted === plaintext;
  });

  test('encrypt/decrypt: 复杂文本处理', () => {
    const plaintext = '这是一段包含中文、数字123和特殊字符!@#的文本';
    const password = 'complexPassword!@#';
    const encrypted = dcCrypto.encrypt(plaintext, password);
    const decrypted = dcCrypto.decrypt(encrypted, password);
    
    return decrypted === plaintext;
  });

  // 边界情况测试
  test('encrypt: 空文本处理', () => {
    const plaintext = '';
    const password = 'secret123';
    const encrypted = dcCrypto.encrypt(plaintext, password);
    const decrypted = dcCrypto.decrypt(encrypted, password);
    
    return decrypted === plaintext;
  });

  test('encrypt: 空密码处理', () => {
    const plaintext = 'Hello World';
    const password = '';
    const encrypted = dcCrypto.encrypt(plaintext, password);
    const decrypted = dcCrypto.decrypt(encrypted, password);
    
    return decrypted === plaintext;
  });

  test('decrypt: 无效密文处理', () => {
    const invalidCiphertext = 'invalid-cipher-text';
    const password = 'secret123';
    let errorOccurred = false;
    
    try {
      dcCrypto.decrypt(invalidCiphertext, password);
    } catch (error) {
      errorOccurred = true;
    }
    
    return errorOccurred;
  });

  // 安全性测试
  test('encrypt: 相同文本不同密码产生不同密文', () => {
    const plaintext = 'Hello World';
    const password1 = 'password1';
    const password2 = 'password2';
    
    const encrypted1 = dcCrypto.encrypt(plaintext, password1);
    const encrypted2 = dcCrypto.encrypt(plaintext, password2);
    
    return encrypted1 !== encrypted2;
  });

  test('decrypt: 正确密码才能解密', () => {
    const plaintext = 'Hello World';
    const correctPassword = 'correct123';
    const wrongPassword = 'wrong123';
    
    const encrypted = dcCrypto.encrypt(plaintext, correctPassword);
    let errorOccurred = false;
    
    try {
      dcCrypto.decrypt(encrypted, wrongPassword);
    } catch (error) {
      errorOccurred = true;
    }
    
    return errorOccurred;
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}