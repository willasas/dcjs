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
    static async md5(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('MD5', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * SHA-256加密
     * @param {string} message - 要加密的消息
     * @returns {string} SHA-256哈希值
     */
    static async sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
     * @param {string} key - 密钥
     * @returns {string} 加密后的字符串
     */
    static async aesEncrypt(message, key) {
        const keyBuffer = await this._getKeyFromPassword(key);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encoder = new TextEncoder();
        const messageBuffer = encoder.encode(message);

        const cipher = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            keyBuffer,
            messageBuffer
        );

        const result = new Uint8Array(iv.length + cipher.byteLength);
        result.set(iv);
        result.set(new Uint8Array(cipher), iv.length);

        return btoa(String.fromCharCode(...result));
    }

    /**
     * AES解密
     * @param {string} encryptedMessage - 加密的消息
     * @param {string} key - 密钥
     * @returns {string} 解密后的字符串
     */
    static async aesDecrypt(encryptedMessage, key) {
        try {
            const keyBuffer = await this._getKeyFromPassword(key);
            const encryptedData = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));
            const iv = encryptedData.slice(0, 12);
            const cipher = encryptedData.slice(12);

            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                keyBuffer,
                cipher
            );

            return new TextDecoder().decode(decrypted);
        } catch {
            return '';
        }
    }

    /**
     * 生成随机密钥
     * @param {number} [length=32] - 密钥长度
     * @returns {string} 随机密钥
     */
    static generateKey(length = 32) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * 生成UUID
     * @returns {string} UUID
     */
    static uuid() {
        return crypto.randomUUID();
    }

    /**
     * 从密码生成密钥
     * @private
     * @param {string} password - 密码
     * @returns {Promise<CryptoKey>} 密钥
     */
    static async _getKeyFromPassword(password) {
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
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
const dcCrypto = new dcCrypto();