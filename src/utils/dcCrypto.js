/**
 * 加密工具类
 */
class dcCrypto {
    constructor() {}

    /**
     * MD5加密
     * @param {string} message - 要加密的消息
     * @returns {string} MD5哈希值
     */
    static md5(message) {
        /**
         * 将一个32位无符号整数按指定位数向左循环移位
         * 
         * @param {number} value - 待移位的32位无符号整数
         * @param {number} shift - 循环左移的位数
         * @returns {number} - 移位后的32位无符号整数
         */
        function rotateLeft(value, shift) {
            // 向左移位，高位超出部分会丢失，右移操作，为与左移操作丢失的高位部分进行合并做准备，最后将左移后的值与右移后的值进行按位或操作，以实现循环移位的效果
            return (value << shift) | (value >>> (32 - shift));
        }

        /**
         * 执行两个无符号整数的加法。
         * 该函数通过考虑整数的高比特位来确保在JavaScript数字表示下的正确结果。
         * @param {number} x - 第一个无符号整数。
         * @param {number} y - 第二个无符号整数。
         * @returns {number} - 两个无符号整数相加的结果。
         */        
        function addUnsigned(x, y) {
            // 提取x和y的最高有效位（符号位）
            const x8 = (x & 0x80000000);
            const y8 = (y & 0x80000000);
            // 提取x和y的次高有效位
            const x4 = (x & 0x40000000);
            const y4 = (y & 0x40000000);
            // 计算x和y的低30位的和
            const result = (x & 0x3FFFFFFF) + (y & 0x3FFFFFFF);
            // 如果x和y的次高有效位都设置，则调整结果的符号位并返回
            if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8;
            // 如果x或y的次高有效位设置
            if (x4 | y4) {
                // 如果结果的次高有效位设置，调整结果并返回
                if (result & 0x40000000) return result ^ 0xC0000000 ^ x8 ^ y8;
                // 否则，仅调整符号位并返回
                else return result ^ 0x40000000 ^ x8 ^ y8;
            } else return result ^ x8 ^ y8;
        }


        /**
         * MD5哈希算法中的逻辑函数F。
         * 返回(x AND y) OR ((NOT x) AND z)的结果。
         * @param {number} x - 第一个输入值。
         * @param {number} y - 第二个输入值。
         * @param {number} z - 第三个输入值。
         * @returns {number} - 计算结果。
         */
        function F(x, y, z) { return (x & y) | ((~x) & z); }

        /**
         * MD5哈希算法中的逻辑函数G。
         * 返回(x AND z) OR (y AND (NOT z))的结果。
         * @param {number} x - 第一个输入值。
         * @param {number} y - 第二个输入值。
         * @param {number} z - 第三个输入值。
         * @returns {number} - 计算结果。
         */
        function G(x, y, z) { return (x & z) | (y & (~z)); }

        /**
         * MD5哈希算法中的逻辑函数H。
         * 返回x XOR y XOR z的结果。
         * @param {number} x - 第一个输入值。
         * @param {number} y - 第二个输入值。
         * @param {number} z - 第三个输入值。
         * @returns {number} - 计算结果。
         */
        function H(x, y, z) { return (x ^ y ^ z); }

        /**
         * MD5哈希算法中的逻辑函数I。
         * 返回y XOR (x OR (NOT z))的结果。
         * @param {number} x - 第一个输入值。
         * @param {number} y - 第二个输入值。
         * @param {number} z - 第三个输入值。
         * @returns {number} - 计算结果。
         */
        function I(x, y, z) { return (y ^ (x | (~z))); }

        /**
         * MD5哈希算法中的FF函数。
         * @param {number} a - 输入值a。
         * @param {number} b - 输入值b。
         * @param {number} c - 输入值c。
         * @param {number} d - 输入值d。
         * @param {number} x - 输入值x。
         * @param {number} s - 旋转位数。
         * @param {number} ac - 常量值ac。
         * @returns {number} - 计算结果。
         */
        function FF(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        /**
         * MD5哈希算法中的GG函数。
         * @param {number} a - 输入值a。
         * @param {number} b - 输入值b。
         * @param {number} c - 输入值c。
         * @param {number} d - 输入值d。
         * @param {number} x - 输入值x。
         * @param {number} s - 旋转位数。
         * @param {number} ac - 常量值ac。
         * @returns {number} - 计算结果。
         */
        function GG(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        /**
         * MD5哈希算法中的HH函数。
         * @param {number} a - 输入值a。
         * @param {number} b - 输入值b。
         * @param {number} c - 输入值c。
         * @param {number} d - 输入值d。
         * @param {number} x - 输入值x。
         * @param {number} s - 旋转位数。
         * @param {number} ac - 常量值ac。
         * @returns {number} - 计算结果。
         */
        function HH(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        /**
         * MD5哈希算法中的II函数。
         * @param {number} a - 输入值a。
         * @param {number} b - 输入值b。
         * @param {number} c - 输入值c。
         * @param {number} d - 输入值d。
         * @param {number} x - 输入值x。
         * @param {number} s - 旋转位数。
         * @param {number} ac - 常量值ac。
         * @returns {number} - 计算结果。
         */
        function II(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }

        /**
         * 将字符串转换为32位整数数组。
         * @param {string} str - 输入字符串。
         * @returns {number[]} - 32位整数数组。
         */
        function stringToWordArray(str) {
            const wordArray = [];
            let messageLength = str.length;
            for (let i = 0; i < messageLength; i++) {
                wordArray[i >> 2] |= (str.charCodeAt(i) & 0xFF) << ((i % 4) * 8);
            }
            return wordArray;
        }

        /**
         * 将32位整数转换为十六进制字符串。
         * @param {number} word - 32位整数。
         * @returns {string} - 十六进制字符串。
         */
        function wordToHex(word) {
            let hex = '';
            for (let j = 0; j <= 3; j++) {
                const byte = (word >>> (j * 8)) & 0xFF;
                hex += ((byte < 16) ? '0' : '') + byte.toString(16);
            }
            return hex;
        }

        // 主要MD5计算逻辑
        const x = stringToWordArray(message);
        let a = 0x67452301;
        let b = 0xEFCDAB89;
        let c = 0x98BADCFE;
        let d = 0x10325476;

        for (let k = 0; k < x.length; k += 16) {
            const AA = a;
            const BB = b;
            const CC = c;
            const DD = d;

            // Round 1
            a = FF(a, b, c, d, x[k + 0], 7, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], 12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], 17, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE);
            // ... 更多轮次

            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }
        // 将整数 a,b,c,d 转换为十六进制字符串。然后，通过 + 运算符将这些十六进制字符串连接起来，最终返回一个表示MD5哈希值的完整十六进制字符串。
        return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    }

    /**
     * SHA-256加密
     * @param {string} message - 要加密的消息
     * @returns {string} SHA-256哈希值
     */
    static sha256(message) {
        const utf8 = new TextEncoder().encode(message);
        return crypto.subtle.digest('SHA-256', utf8)
            .then(hashBuffer => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            });
    }

    /**
     * Base64编码
     * @param {string} str - 要编码的字符串
     * @returns {string} Base64编码字符串
     */
    static base64Encode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            (match, p1) => String.fromCharCode('0x' + p1)));
    }

    /**
     * Base64解码
     * @param {string} str - 要解码的Base64字符串
     * @returns {string} 解码后的字符串
     */
    static base64Decode(str) {
        try {
            return decodeURIComponent(atob(str).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''));
        } catch {
            return '';
        }
    }

    /**
     * AES加密
     * @param {string} message - 要加密的消息
     * @param {string} password - 密码
     * @returns {Promise<string>} 加密后的字符串
     */
    static async aesEncrypt(message, password) {
        if (!message || !password) {
            console.error('消息和密码不能为空');
            return '';
        }

        try {
            const encoder = new TextEncoder();
            const messageData = encoder.encode(message);
            
            // 生成密钥
            const key = await this.generateAESKey(password);
            
            // 生成随机IV
            const iv = crypto.getRandomValues(new Uint8Array(12));
            
            // 加密数据
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                messageData
            );
            
            // 组合IV和加密数据
            const encryptedArray = new Uint8Array(encrypted);
            const result = new Uint8Array(iv.length + encryptedArray.length);
            result.set(iv);
            result.set(encryptedArray, iv.length);
            
            // 转换为Base64
            return btoa(String.fromCharCode.apply(null, result));
        } catch (error) {
            console.error('AES加密失败:', error);
            return '';
        }
    }

    /**
     * AES解密
     * @param {string} encryptedMessage - 加密的消息
     * @param {string} password - 密码
     * @returns {Promise<string>} 解密后的字符串
     */
    static async aesDecrypt(encryptedMessage, password) {
        if (!encryptedMessage || !password) {
            console.error('加密消息和密码不能为空');
            return '';
        }

        try {
            // Base64解码
            const data = new Uint8Array(
                atob(encryptedMessage).split('').map(c => c.charCodeAt(0))
            );
            
            // 提取IV和加密数据
            const iv = data.slice(0, 12);
            const encrypted = data.slice(12);
            
            // 生成密钥
            const key = await this.generateAESKey(password);
            
            // 解密数据
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                key,
                encrypted
            );
            
            return new TextDecoder().decode(decrypted);
        } catch (error) {
            console.error('AES解密失败:', error);
            return '';
        }
    }

    /**
     * 生成AES密钥
     * @param {string} password - 密码
     * @returns {Promise<CryptoKey>} 生成的密钥
     */
    static async generateAESKey(password) {
        if (!password) {
            throw new Error('密码不能为空');
        }

        const encoder = new TextEncoder();
        const passwordData = encoder.encode(password);
        
        // 使用 SHA-256 生成固定长度的密钥材料
        const keyMaterial = await crypto.subtle.digest('SHA-256', passwordData);
        
        return crypto.subtle.importKey(
            'raw',
            keyMaterial.slice(0, 32), // 使用256位(32字节)密钥
            { name: 'AES-GCM' },
            false,
            ['encrypt', 'decrypt']
        );
    }

    /**
     * 生成随机密码
     * @param {number} [length=32] - 密码长度
     * @returns {string} 随机密码
     */
    static generatePassword(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(array[i] % chars.length);
        }
        return password;
    }

    /**
     * 生成随机密钥
     * @param {number} [length=32] - 密钥长度
     * @returns {string} 随机密钥
     */
    static generateKey(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(array[i] % chars.length);
        }
        return password;
    }

    /**
     * 生成UUID
     * @returns {string} UUID
     */
    static uuid() {
        return crypto.randomUUID();
    }

    /**
     * HMAC-SHA256签名
     * @param {string} message - 要签名的消息
     * @param {string} key - 密钥
     * @returns {string} 签名
     */
    static async hmacSha256(message, key) {
        const encoder = new TextEncoder();
        const keyBuffer = await crypto.subtle.importKey(
            'raw',
            encoder.encode(key),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );

        const signature = await crypto.subtle.sign(
            'HMAC',
            keyBuffer,
            encoder.encode(message)
        );

        return Array.from(new Uint8Array(signature))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    /**
     * 生成安全的随机数
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @returns {number} 随机数
     */
    static secureRandom(min, max) {
        const range = max - min;
        const bytesNeeded = Math.ceil(Math.log2(range) / 8);
        const maxValue = Math.pow(256, bytesNeeded);
        const array = new Uint8Array(bytesNeeded);

        while (true) {
            crypto.getRandomValues(array);
            let value = 0;
            for (let i = 0; i < bytesNeeded; i++) {
                value = (value << 8) + array[i];
            }
            if (value < maxValue - (maxValue % range)) {
                return min + (value % range);
            }
        }
    }

    /**
     * 生成密码哈希
     * @param {string} password - 密码
     * @returns {string} 哈希值
     */
    static async hashPassword(password) {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const passwordBuffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest(
            'SHA-256',
            new Uint8Array([...salt, ...passwordBuffer])
        );
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return `${saltHex}:${hashHex}`;
    }

    /**
     * 验证密码哈希
     * @param {string} password - 密码
     * @param {string} hash - 哈希值
     * @returns {boolean} 是否匹配
     */
    static async verifyPassword(password, hash) {
        try {
            const [saltHex, hashHex] = hash.split(':');
            const salt = new Uint8Array(saltHex.match(/.{2}/g).map(byte => parseInt(byte, 16)));
            const passwordBuffer = new TextEncoder().encode(password);
            const hashBuffer = await crypto.subtle.digest(
                'SHA-256',
                new Uint8Array([...salt, ...passwordBuffer])
            );
            const newHashHex = Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
            return newHashHex === hashHex;
        } catch {
            return false;
        }
    }
}

window.DC = window.DC || {};
window.DC.Crypto = dcCrypto;