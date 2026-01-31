/**
 * dcCrypto 测试用例
 */
const dcCrypto = require('../../../src/utils/dcCrypto');

describe('dcCrypto', () => {
  // Mock crypto 对象
  beforeEach(() => {
    global.crypto = {
      subtle: {
        digest: jest.fn((algorithm, data) => {
          // 模拟 SHA-256 哈希
          return Promise.resolve(new ArrayBuffer(32));
        }),
        importKey: jest.fn((format, keyData, algorithm, extractable, usages) => {
          return Promise.resolve({});
        }),
        encrypt: jest.fn((algorithm, key, data) => {
          return Promise.resolve(new ArrayBuffer(16));
        }),
        decrypt: jest.fn((algorithm, key, data) => {
          return Promise.resolve(new TextEncoder().encode('test message'));
        }),
        sign: jest.fn((algorithm, key, data) => {
          return Promise.resolve(new ArrayBuffer(32));
        })
      },
      getRandomValues: jest.fn((array) => {
        for (let i = 0; i < array.length; i++) {
          array[i] = Math.floor(Math.random() * 256);
        }
        return array;
      }),
      randomUUID: jest.fn(() => '123e4567-e89b-12d3-a456-426614174000')
    };

    global.btoa = jest.fn((str) => {
      return Buffer.from(str, 'binary').toString('base64');
    });

    global.atob = jest.fn((str) => {
      return Buffer.from(str, 'base64').toString('binary');
    });

    global.TextEncoder = jest.fn(() => ({
      encode: jest.fn((str) => {
        const buffer = new ArrayBuffer(str.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < str.length; i++) {
          view[i] = str.charCodeAt(i);
        }
        return view;
      })
    }));

    global.TextDecoder = jest.fn(() => ({
      decode: jest.fn((buffer) => {
        return 'test message';
      })
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('md5', () => {
    test('MD5加密', () => {
      const result = dcCrypto.md5('test');
      expect(typeof result).toBe('string');
      expect(result.length).toBe(32);
    });
  });

  describe('sha256', () => {
    test('SHA-256加密', async () => {
      const result = await dcCrypto.sha256('test');
      expect(typeof result).toBe('string');
      expect(result.length).toBe(64);
    });
  });

  describe('base64Encode', () => {
    test('Base64编码', () => {
      const result = dcCrypto.base64Encode('test');
      expect(typeof result).toBe('string');
    });
  });

  describe('base64Decode', () => {
    test('Base64解码', () => {
      const encoded = dcCrypto.base64Encode('test');
      const result = dcCrypto.base64Decode(encoded);
      expect(typeof result).toBe('string');
    });

    test('无效的Base64字符串', () => {
      const result = dcCrypto.base64Decode('invalid');
      expect(result).toBe('');
    });
  });

  describe('aesEncrypt', () => {
    test('AES加密', async () => {
      const result = await dcCrypto.aesEncrypt('test message', 'password');
      expect(typeof result).toBe('string');
    });

    test('空消息', async () => {
      console.error = jest.fn();
      const result = await dcCrypto.aesEncrypt('', 'password');
      expect(console.error).toHaveBeenCalledWith('消息和密码不能为空');
      expect(result).toBe('');
    });

    test('空密码', async () => {
      console.error = jest.fn();
      const result = await dcCrypto.aesEncrypt('test message', '');
      expect(console.error).toHaveBeenCalledWith('消息和密码不能为空');
      expect(result).toBe('');
    });
  });

  describe('aesDecrypt', () => {
    test('AES解密', async () => {
      const encrypted = await dcCrypto.aesEncrypt('test message', 'password');
      const result = await dcCrypto.aesDecrypt(encrypted, 'password');
      expect(typeof result).toBe('string');
    });

    test('空加密消息', async () => {
      console.error = jest.fn();
      const result = await dcCrypto.aesDecrypt('', 'password');
      expect(console.error).toHaveBeenCalledWith('加密消息和密码不能为空');
      expect(result).toBe('');
    });

    test('空密码', async () => {
      console.error = jest.fn();
      const result = await dcCrypto.aesDecrypt('encrypted', '');
      expect(console.error).toHaveBeenCalledWith('加密消息和密码不能为空');
      expect(result).toBe('');
    });
  });

  describe('generatePassword', () => {
    test('生成随机密码', () => {
      const result = dcCrypto.generatePassword();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(32);
    });

    test('生成指定长度的密码', () => {
      const length = 16;
      const result = dcCrypto.generatePassword(length);
      expect(typeof result).toBe('string');
      expect(result.length).toBe(length);
    });
  });

  describe('generateKey', () => {
    test('生成随机密钥', () => {
      const result = dcCrypto.generateKey();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(32);
    });

    test('生成指定长度的密钥', () => {
      const length = 16;
      const result = dcCrypto.generateKey(length);
      expect(typeof result).toBe('string');
      expect(result.length).toBe(length);
    });
  });

  describe('uuid', () => {
    test('生成UUID', () => {
      const result = dcCrypto.uuid();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(36);
    });
  });

  describe('hmacSha256', () => {
    test('HMAC-SHA256签名', async () => {
      const result = await dcCrypto.hmacSha256('test message', 'key');
      expect(typeof result).toBe('string');
      expect(result.length).toBe(64);
    });
  });

  describe('secureRandom', () => {
    test('生成安全的随机数', () => {
      const result = dcCrypto.secureRandom(1, 10);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });
  });

  describe('hashPassword', () => {
    test('生成密码哈希', async () => {
      const result = await dcCrypto.hashPassword('password');
      expect(typeof result).toBe('string');
      expect(result.split(':').length).toBe(2);
    });
  });

  describe('verifyPassword', () => {
    test('验证密码哈希', async () => {
      const hash = await dcCrypto.hashPassword('password');
      const result = await dcCrypto.verifyPassword('password', hash);
      expect(typeof result).toBe('boolean');
    });

    test('验证错误的密码', async () => {
      const hash = await dcCrypto.hashPassword('password');
      const result = await dcCrypto.verifyPassword('wrong', hash);
      expect(typeof result).toBe('boolean');
    });
  });
});
