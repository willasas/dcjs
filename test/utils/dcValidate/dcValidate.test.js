/**
 * dcValidate 工具类测试
 */

// 假设在浏览器环境中运行，window.DC 已注册
if (typeof window === 'undefined') {
    // 在非浏览器环境中，需要模拟 window 对象
    global.window = {};
    global.window.DC = {};
    // 导入 dcValidate 模块
    const dcValidate = require('../../../src/utils/dcValidate');
    global.window.DC.Validate = dcValidate;
}

const assert = require('assert').strict;

describe('dcValidate 工具类测试', function() {
    describe('isEmpty 方法测试', function() {
        it('应该正确识别空值', function() {
            assert.strictEqual(DC.Validate.isEmpty(undefined), true);
            assert.strictEqual(DC.Validate.isEmpty(null), true);
            assert.strictEqual(DC.Validate.isEmpty(''), true);
            assert.strictEqual(DC.Validate.isEmpty([]), true);
            assert.strictEqual(DC.Validate.isEmpty({}), true);
        });
        
        it('应该正确识别非空值', function() {
            assert.strictEqual(DC.Validate.isEmpty('Hello'), false);
            assert.strictEqual(DC.Validate.isEmpty([1, 2, 3]), false);
            assert.strictEqual(DC.Validate.isEmpty({ name: 'John' }), false);
            assert.strictEqual(DC.Validate.isEmpty(0), false);
            assert.strictEqual(DC.Validate.isEmpty(false), false);
        });
    });
    
    describe('isNumber 方法测试', function() {
        it('应该正确识别数字', function() {
            assert.strictEqual(DC.Validate.isNumber(42), true);
            assert.strictEqual(DC.Validate.isNumber(0), true);
            assert.strictEqual(DC.Validate.isNumber(-10), true);
            assert.strictEqual(DC.Validate.isNumber(3.14), true);
        });
        
        it('应该正确识别非数字', function() {
            assert.strictEqual(DC.Validate.isNumber(NaN), false);
            assert.strictEqual(DC.Validate.isNumber('42'), false);
            assert.strictEqual(DC.Validate.isNumber(null), false);
            assert.strictEqual(DC.Validate.isNumber(undefined), false);
            assert.strictEqual(DC.Validate.isNumber([]), false);
            assert.strictEqual(DC.Validate.isNumber({}), false);
        });
    });
    
    describe('isInteger 方法测试', function() {
        it('应该正确识别整数', function() {
            assert.strictEqual(DC.Validate.isInteger(42), true);
            assert.strictEqual(DC.Validate.isInteger(0), true);
            assert.strictEqual(DC.Validate.isInteger(-10), true);
        });
        
        it('应该正确识别非整数', function() {
            assert.strictEqual(DC.Validate.isInteger(42.5), false);
            assert.strictEqual(DC.Validate.isInteger('42'), false);
            assert.strictEqual(DC.Validate.isInteger(null), false);
            assert.strictEqual(DC.Validate.isInteger(undefined), false);
            assert.strictEqual(DC.Validate.isInteger([]), false);
            assert.strictEqual(DC.Validate.isInteger({}), false);
        });
    });
    
    describe('isPhone 方法测试', function() {
        it('应该正确识别有效的手机号码', function() {
            assert.strictEqual(DC.Validate.isPhone('+15551234567'), true);
            assert.strictEqual(DC.Validate.isPhone('15551234567'), true);
            assert.strictEqual(DC.Validate.isPhone('+8613800138000'), true);
        });
        
        it('应该正确识别无效的手机号码', function() {
            assert.strictEqual(DC.Validate.isPhone('123'), false);
            assert.strictEqual(DC.Validate.isPhone('abc'), false);
            assert.strictEqual(DC.Validate.isPhone(''), false);
            assert.strictEqual(DC.Validate.isPhone(null), false);
            assert.strictEqual(DC.Validate.isPhone(undefined), false);
        });
    });
    
    describe('isEmail 方法测试', function() {
        it('应该正确识别有效的电子邮件地址', function() {
            assert.strictEqual(DC.Validate.isEmail('user@example.com'), true);
            assert.strictEqual(DC.Validate.isEmail('user.name@example.co.uk'), true);
            assert.strictEqual(DC.Validate.isEmail('user+tag@example.com'), true);
        });
        
        it('应该正确识别无效的电子邮件地址', function() {
            assert.strictEqual(DC.Validate.isEmail('user@'), false);
            assert.strictEqual(DC.Validate.isEmail('@example.com'), false);
            assert.strictEqual(DC.Validate.isEmail('user@.com'), false);
            assert.strictEqual(DC.Validate.isEmail('abc'), false);
            assert.strictEqual(DC.Validate.isEmail(''), false);
            assert.strictEqual(DC.Validate.isEmail(null), false);
            assert.strictEqual(DC.Validate.isEmail(undefined), false);
        });
    });
    
    describe('isUrl 方法测试', function() {
        it('应该正确识别有效的 URL', function() {
            assert.strictEqual(DC.Validate.isUrl('https://www.example.com'), true);
            assert.strictEqual(DC.Validate.isUrl('http://example.com/path'), true);
            assert.strictEqual(DC.Validate.isUrl('ftp://ftp.example.com'), true);
        });
        
        it('应该正确识别无效的 URL', function() {
            assert.strictEqual(DC.Validate.isUrl('www.example.com'), false);
            assert.strictEqual(DC.Validate.isUrl('example.com'), false);
            assert.strictEqual(DC.Validate.isUrl('abc'), false);
            assert.strictEqual(DC.Validate.isUrl(''), false);
            assert.strictEqual(DC.Validate.isUrl(null), false);
            assert.strictEqual(DC.Validate.isUrl(undefined), false);
        });
    });
    
    describe('isIdCard 方法测试', function() {
        it('应该正确识别有效的身份证号', function() {
            assert.strictEqual(DC.Validate.isIdCard('110101199001011234'), true);
            assert.strictEqual(DC.Validate.isIdCard('11010119900101123X'), true);
        });
        
        it('应该正确识别无效的身份证号', function() {
            assert.strictEqual(DC.Validate.isIdCard('1101011990010112'), false);
            assert.strictEqual(DC.Validate.isIdCard('1101011990010112345'), false);
            assert.strictEqual(DC.Validate.isIdCard('abc123456789012345'), false);
            assert.strictEqual(DC.Validate.isIdCard(''), false);
            assert.strictEqual(DC.Validate.isIdCard(null), false);
            assert.strictEqual(DC.Validate.isIdCard(undefined), false);
        });
    });
    
    describe('isDate 方法测试', function() {
        it('应该正确识别有效的日期', function() {
            assert.strictEqual(DC.Validate.isDate(new Date()), true);
            assert.strictEqual(DC.Validate.isDate('2023-01-01'), true);
            assert.strictEqual(DC.Validate.isDate('2023/01/01'), true);
        });
        
        it('应该正确识别无效的日期', function() {
            assert.strictEqual(DC.Validate.isDate('invalid-date'), false);
            assert.strictEqual(DC.Validate.isDate('2023-02-30'), false);
            assert.strictEqual(DC.Validate.isDate(42), false);
            assert.strictEqual(DC.Validate.isDate(null), false);
            assert.strictEqual(DC.Validate.isDate(undefined), false);
        });
    });
    
    describe('isObject 方法测试', function() {
        it('应该正确识别对象', function() {
            assert.strictEqual(DC.Validate.isObject({}), true);
            assert.strictEqual(DC.Validate.isObject({ name: 'John' }), true);
        });
        
        it('应该正确识别非对象', function() {
            assert.strictEqual(DC.Validate.isObject(null), false);
            assert.strictEqual(DC.Validate.isObject([]), false);
            assert.strictEqual(DC.Validate.isObject('{}'), false);
            assert.strictEqual(DC.Validate.isObject(42), false);
            assert.strictEqual(DC.Validate.isObject('string'), false);
            assert.strictEqual(DC.Validate.isObject(undefined), false);
        });
    });
    
    describe('isArray 方法测试', function() {
        it('应该正确识别数组', function() {
            assert.strictEqual(DC.Validate.isArray([]), true);
            assert.strictEqual(DC.Validate.isArray([1, 2, 3]), true);
        });
        
        it('应该正确识别非数组', function() {
            assert.strictEqual(DC.Validate.isArray({}), false);
            assert.strictEqual(DC.Validate.isArray('[]'), false);
            assert.strictEqual(DC.Validate.isArray(42), false);
            assert.strictEqual(DC.Validate.isArray('string'), false);
            assert.strictEqual(DC.Validate.isArray(null), false);
            assert.strictEqual(DC.Validate.isArray(undefined), false);
        });
    });
    
    describe('isLengthBetween 方法测试', function() {
        it('应该正确识别长度在范围内的字符串', function() {
            assert.strictEqual(DC.Validate.isLengthBetween('Hello', 3, 10), true);
            assert.strictEqual(DC.Validate.isLengthBetween('Hi', 2, 5), true);
            assert.strictEqual(DC.Validate.isLengthBetween('Hello World', 5, 15), true);
            assert.strictEqual(DC.Validate.isLengthBetween('', 0, 0), true);
        });
        
        it('应该正确识别长度不在范围内的字符串', function() {
            assert.strictEqual(DC.Validate.isLengthBetween('Hi', 3, 10), false);
            assert.strictEqual(DC.Validate.isLengthBetween('Hello World', 3, 10), false);
            assert.strictEqual(DC.Validate.isLengthBetween('', 1, 5), false);
        });
        
        it('应该正确处理非字符串输入', function() {
            assert.strictEqual(DC.Validate.isLengthBetween(42, 3, 10), false);
            assert.strictEqual(DC.Validate.isLengthBetween([], 3, 10), false);
            assert.strictEqual(DC.Validate.isLengthBetween({}, 3, 10), false);
            assert.strictEqual(DC.Validate.isLengthBetween(null, 3, 10), false);
            assert.strictEqual(DC.Validate.isLengthBetween(undefined, 3, 10), false);
        });
    });
    
    describe('isChinese 方法测试', function() {
        it('应该正确识别仅包含中文字符的字符串', function() {
            assert.strictEqual(DC.Validate.isChinese('你好'), true);
            assert.strictEqual(DC.Validate.isChinese('中文测试'), true);
        });
        
        it('应该正确识别包含非中文字符的字符串', function() {
            assert.strictEqual(DC.Validate.isChinese('Hello'), false);
            assert.strictEqual(DC.Validate.isChinese('中文123'), false);
            assert.strictEqual(DC.Validate.isChinese('中文English'), false);
            assert.strictEqual(DC.Validate.isChinese(''), false);
        });
        
        it('应该正确处理非字符串输入', function() {
            assert.strictEqual(DC.Validate.isChinese(42), false);
            assert.strictEqual(DC.Validate.isChinese([]), false);
            assert.strictEqual(DC.Validate.isChinese({}, 3, 10), false);
            assert.strictEqual(DC.Validate.isChinese(null), false);
            assert.strictEqual(DC.Validate.isChinese(undefined), false);
        });
    });
    
    describe('isPassword 方法测试', function() {
        it('应该正确识别有效的密码', function() {
            assert.strictEqual(DC.Validate.isPassword('Password123'), true);
            assert.strictEqual(DC.Validate.isPassword('Pass1234'), true);
            assert.strictEqual(DC.Validate.isPassword('12345678Abc'), true);
        });
        
        it('应该正确识别无效的密码', function() {
            assert.strictEqual(DC.Validate.isPassword('password'), false);
            assert.strictEqual(DC.Validate.isPassword('12345678'), false);
            assert.strictEqual(DC.Validate.isPassword('Pass123'), false);
            assert.strictEqual(DC.Validate.isPassword('Password12345678'), false);
            assert.strictEqual(DC.Validate.isPassword(''), false);
        });
        
        it('应该正确处理非字符串输入', function() {
            assert.strictEqual(DC.Validate.isPassword(42), false);
            assert.strictEqual(DC.Validate.isPassword([]), false);
            assert.strictEqual(DC.Validate.isPassword({}, 3, 10), false);
            assert.strictEqual(DC.Validate.isPassword(null), false);
            assert.strictEqual(DC.Validate.isPassword(undefined), false);
        });
    });
});
