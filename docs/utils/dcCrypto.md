# dcCrypto

加密工具类，提供丰富的加密和安全相关功能，包括 MD5、SHA-256、Base64、AES、随机密码生成、UUID 生成、HMAC 签名、安全随机数、密码哈希等。

## 安装

将 `dcCrypto.js` 文件引入到项目中：

```html
<script src="path/to/dcCrypto.js"></script>
```

## API 参考

### 1. md5(message)

MD5加密

- **参数**：
  - `message`：要加密的消息
- **返回值**：MD5哈希值

**示例**：

```javascript
const hash = DC.Crypto.md5('test');
console.log(hash); // 5d41402abc4b2a76b9719d911017c592
```

### 2. sha256(message)

SHA-256加密

- **参数**：
  - `message`：要加密的消息
- **返回值**：SHA-256哈希值

**示例**：

```javascript
DC.Crypto.sha256('test').then(hash => {
  console.log(hash); // 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
});
```

### 3. base64Encode(str)

Base64编码

- **参数**：
  - `str`：要编码的字符串
- **返回值**：Base64编码字符串

**示例**：

```javascript
const encoded = DC.Crypto.base64Encode('test');
console.log(encoded); // dGVzdA==
```

### 4. base64Decode(str)

Base64解码

- **参数**：
  - `str`：要解码的Base64字符串
- **返回值**：解码后的字符串

**示例**：

```javascript
const decoded = DC.Crypto.base64Decode('dGVzdA==');
console.log(decoded); // test
```

### 5. aesEncrypt(message, password)

AES加密

- **参数**：
  - `message`：要加密的消息
  - `password`：密码
- **返回值**：加密后的字符串

**示例**：

```javascript
DC.Crypto.aesEncrypt('test message', 'password').then(encrypted => {
  console.log(encrypted);
});
```

### 6. aesDecrypt(encryptedMessage, password)

AES解密

- **参数**：
  - `encryptedMessage`：加密的消息
  - `password`：密码
- **返回值**：解密后的字符串

**示例**：

```javascript
DC.Crypto.aesDecrypt(encryptedMessage, 'password').then(decrypted => {
  console.log(decrypted); // test message
});
```

### 7. generatePassword(length)

生成随机密码

- **参数**：
  - `length`：密码长度，默认为 `32`
- **返回值**：随机密码

**示例**：

```javascript
const password = DC.Crypto.generatePassword(16);
console.log(password); // 随机生成的16位密码
```

### 8. generateKey(length)

生成随机密钥

- **参数**：
  - `length`：密钥长度，默认为 `32`
- **返回值**：随机密钥

**示例**：

```javascript
const key = DC.Crypto.generateKey(32);
console.log(key); // 随机生成的32位密钥
```

### 9. uuid()

生成UUID

- **参数**：无
- **返回值**：UUID

**示例**：

```javascript
const id = DC.Crypto.uuid();
console.log(id); // 例如：123e4567-e89b-12d3-a456-426614174000
```

### 10. hmacSha256(message, key)

HMAC-SHA256签名

- **参数**：
  - `message`：要签名的消息
  - `key`：密钥
- **返回值**：签名

**示例**：

```javascript
DC.Crypto.hmacSha256('test message', 'key').then(signature => {
  console.log(signature);
});
```

### 11. secureRandom(min, max)

生成安全的随机数

- **参数**：
  - `min`：最小值
  - `max`：最大值
- **返回值**：随机数

**示例**：

```javascript
const random = DC.Crypto.secureRandom(1, 100);
console.log(random); // 1-100之间的随机数
```

### 12. hashPassword(password)

生成密码哈希

- **参数**：
  - `password`：密码
- **返回值**：哈希值

**示例**：

```javascript
DC.Crypto.hashPassword('password').then(hash => {
  console.log(hash); // 例如：salt:hash
});
```

### 13. verifyPassword(password, hash)

验证密码哈希

- **参数**：
  - `password`：密码
  - `hash`：哈希值
- **返回值**：是否匹配

**示例**：

```javascript
DC.Crypto.verifyPassword('password', hash).then(isMatch => {
  console.log(isMatch); // true 或 false
});
```

## 浏览器兼容性

- Chrome ≥ 60
- Firefox ≥ 60
- Safari ≥ 11
- Edge ≥ 79

## 注意事项

1. 部分功能（如 AES 加密/解密、HMAC 签名）依赖于 Web Crypto API，需要在安全上下文（HTTPS 或 localhost）中运行
2. MD5 算法安全性较低，仅适用于非安全场景
3. 生成的密码和密钥应妥善保管，避免泄露
4. 密码哈希应存储在安全的地方，不可明文存储密码
5. 安全随机数生成适用于需要高安全性的场景

## 示例

查看 `examples/utils/dcCrypto/index.html` 获取交互式示例。

## 测试

运行 `npm test test/utils/dcCrypto/dcCrypto.test.js` 查看测试结果。
