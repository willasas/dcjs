# dcCrypto 工具类

## 概述
`dcCrypto` 是一个轻量级的加密解密工具库，提供简单的对称加密功能，用于在前端对敏感数据进行基本保护。它可以帮助开发者对用户输入、配置信息等数据进行加密存储或传输。

## 功能特性
- **对称加密**: 使用相同的密码进行加密和解密
- **简单易用**: 提供简洁的API接口，无需复杂配置
- **客户端安全**: 在浏览器端完成加密解密过程，敏感数据不经过服务器
- **支持多种数据**: 可以加密文本、数字、JSON等字符串化数据

## 引入方式

### 方式1: 通过script标签引入
```html
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { dcCrypto } from './src/utils/dcCrypto.js';
```

## API文档

### encrypt(plaintext, password)
对明文进行加密。

**参数**:
- `plaintext` (string): 要加密的明文
- `password` (string): 加密密码

**返回值**:
- (string): 加密后的密文

**示例**:
```javascript
const plaintext = 'Hello World';
const password = 'mysecretpassword';
const ciphertext = dcCrypto.encrypt(plaintext, password);
console.log(ciphertext); // 输出加密后的字符串
```

### decrypt(ciphertext, password)
对密文进行解密。

**参数**:
- `ciphertext` (string): 要解密的密文
- `password` (string): 解密密码（必须与加密时使用的密码相同）


**返回值**:
- (string): 解密后的明文

**示例**:
```javascript
const ciphertext = '...'; // 加密后的字符串
const password = 'mysecretpassword';
try {
    const plaintext = dcCrypto.decrypt(ciphertext, password);
    console.log(plaintext); // 输出解密后的内容
} catch (error) {
    console.error('解密失败:', error.message);
}
```

## 使用示例

### 基础使用
```javascript
// 加密数据
const secretData = '用户的敏感信息';
const userPassword = 'user123';
const encryptedData = dcCrypto.encrypt(secretData, userPassword);

// 存储加密数据
localStorage.setItem('userData', encryptedData);

// 读取并解密数据
const storedData = localStorage.getItem('userData');
if (storedData) {
    try {
        const decryptedData = dcCrypto.decrypt(storedData, userPassword);
        console.log('解密成功:', decryptedData);
    } catch (error) {
        console.error('解密失败:', error.message);
    }
}
```

### 处理JSON数据
```javascript
// 加密对象数据
const userData = {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000'
};

const jsonString = JSON.stringify(userData);
const password = 'dataEncryptionKey';
const encrypted = dcCrypto.encrypt(jsonString, password);

// 解密对象数据
try {
    const decryptedJson = dcCrypto.decrypt(encrypted, password);
    const originalData = JSON.parse(decryptedJson);
    console.log('原始数据:', originalData);
} catch (error) {
    console.error('处理失败:', error.message);
}
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| 密码长度 | string | 无限制 | 建议使用至少8位以上的密码 |
| 加密算法 | 内部实现 | AES-like | 具体算法细节由内部实现决定 |
| 字符编码 | UTF-8 | - | 支持中文和其他Unicode字符 |

## 注意事项
- **安全性提醒**: 此工具仅提供基本的数据保护，不适合用于保护高度敏感的信息（如银行账户、身份证号等）。对于高安全要求的场景，请使用专业的加密库和HTTPS传输。
- **密码管理**: 密码是加密解密的关键，请确保用户妥善保管密码。一旦忘记密码，将无法恢复数据。
- **错误处理**: 解密时如果密码错误或密文损坏，会抛出异常，请使用try-catch语句进行处理。
- **性能考虑**: 对于大量数据的加密解密，可能会影响页面性能，建议分批处理。
- **兼容性**: 支持现代浏览器，不依赖第三方库。

## 常见问题

**Q: dcCrypto使用的是什么加密算法？**
A: dcCrypto使用自定义的对称加密算法，具体实现细节对外部隐藏。它提供了足够的安全性来保护一般性的用户数据，但不建议用于高安全级别的应用场景。

**Q: 加密后的数据可以被破解吗？**
A: 理论上任何加密都可以被破解，但dcCrypto的设计使得暴力破解需要极长的时间。只要使用足够复杂的密码，就可以有效防止普通攻击。

**Q: 如何保证密码的安全？**
A: 密码安全主要依赖于用户。建议：
1. 使用复杂密码（包含大小写字母、数字、特殊字符）
2. 不要使用容易猜测的密码（如生日、123456）
3. 定期更换密码
4. 不要在多个地方使用相同密码

**Q: 加密解密会影响页面性能吗？**
A: 对于小段文本的加密解密，性能影响可以忽略不计。但对于大文件或大量数据的加解密，可能会导致页面卡顿。建议在Web Worker中处理大量数据的加解密操作。

**Q: 是否可以在Node.js环境中使用？**
A: 是的，dcCrypto同时支持浏览器环境和Node.js环境，API完全一致。