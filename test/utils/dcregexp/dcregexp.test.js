/**
 * dcRegexp 工具类测试
 */
const dcRegexp = require('../../../src/utils/dcregexp')

describe('dcRegexp 工具类测试', () => {
  // 测试数字相关正则表达式
  describe('数字相关正则表达式', () => {
    test('NUMBER 正则表达式', () => {
      expect(dcRegexp.NUMBER.test('123')).toBe(true)
      expect(dcRegexp.NUMBER.test('-123')).toBe(true)
      expect(dcRegexp.NUMBER.test('abc')).toBe(false)
      expect(dcRegexp.NUMBER.test('123.45')).toBe(false)
    })

    test('nDigits 方法', () => {
      const regex = dcRegexp.nDigits(3)
      expect(regex.test('123')).toBe(true)
      expect(regex.test('12')).toBe(false)
      expect(regex.test('1234')).toBe(false)
    })

    test('atLeastNDigits 方法', () => {
      const regex = dcRegexp.atLeastNDigits(3)
      expect(regex.test('123')).toBe(true)
      expect(regex.test('1234')).toBe(true)
      expect(regex.test('12')).toBe(false)
    })

    test('mToNDigits 方法', () => {
      const regex = dcRegexp.mToNDigits(2, 4)
      expect(regex.test('12')).toBe(true)
      expect(regex.test('123')).toBe(true)
      expect(regex.test('1234')).toBe(true)
      expect(regex.test('1')).toBe(false)
      expect(regex.test('12345')).toBe(false)
    })

    test('ZERO_OR_NON_ZERO_START_NUMBER 正则表达式', () => {
      expect(dcRegexp.ZERO_OR_NON_ZERO_START_NUMBER.test('0')).toBe(true)
      expect(dcRegexp.ZERO_OR_NON_ZERO_START_NUMBER.test('123')).toBe(true)
      expect(dcRegexp.ZERO_OR_NON_ZERO_START_NUMBER.test('0123')).toBe(false)
      expect(dcRegexp.ZERO_OR_NON_ZERO_START_NUMBER.test('-123')).toBe(false)
    })

    test('NON_ZERO_START_NUMBER_WITH_TWO_DECIMALS 正则表达式', () => {
      expect(dcRegexp.NON_ZERO_START_NUMBER_WITH_TWO_DECIMALS.test('123')).toBe(true)
      expect(dcRegexp.NON_ZERO_START_NUMBER_WITH_TWO_DECIMALS.test('123.45')).toBe(true)
      expect(dcRegexp.NON_ZERO_START_NUMBER_WITH_TWO_DECIMALS.test('0')).toBe(false)
      expect(dcRegexp.NON_ZERO_START_NUMBER_WITH_TWO_DECIMALS.test('0.45')).toBe(false)
      expect(dcRegexp.NON_ZERO_START_NUMBER_WITH_TWO_DECIMALS.test('123.456')).toBe(false)
    })

    test('NUMBER_WITH_ONE_TO_TWO_DECIMALS 正则表达式', () => {
      expect(dcRegexp.NUMBER_WITH_ONE_TO_TWO_DECIMALS.test('123')).toBe(true)
      expect(dcRegexp.NUMBER_WITH_ONE_TO_TWO_DECIMALS.test('123.4')).toBe(true)
      expect(dcRegexp.NUMBER_WITH_ONE_TO_TWO_DECIMALS.test('123.45')).toBe(true)
      expect(dcRegexp.NUMBER_WITH_ONE_TO_TWO_DECIMALS.test('-123')).toBe(true)
      expect(dcRegexp.NUMBER_WITH_ONE_TO_TWO_DECIMALS.test('-123.45')).toBe(true)
      expect(dcRegexp.NUMBER_WITH_ONE_TO_TWO_DECIMALS.test('123.456')).toBe(false)
    })

    test('NUMBER_OR_DECIMAL 正则表达式', () => {
      expect(dcRegexp.NUMBER_OR_DECIMAL.test('123')).toBe(true)
      expect(dcRegexp.NUMBER_OR_DECIMAL.test('123.45')).toBe(true)
      expect(dcRegexp.NUMBER_OR_DECIMAL.test('-123')).toBe(true)
      expect(dcRegexp.NUMBER_OR_DECIMAL.test('+123')).toBe(true)
      expect(dcRegexp.NUMBER_OR_DECIMAL.test('abc')).toBe(false)
    })

    test('POSITIVE_NUMBER_WITH_TWO_DECIMALS 正则表达式', () => {
      expect(dcRegexp.POSITIVE_NUMBER_WITH_TWO_DECIMALS.test('123')).toBe(true)
      expect(dcRegexp.POSITIVE_NUMBER_WITH_TWO_DECIMALS.test('123.45')).toBe(true)
      expect(dcRegexp.POSITIVE_NUMBER_WITH_TWO_DECIMALS.test('-123')).toBe(false)
      expect(dcRegexp.POSITIVE_NUMBER_WITH_TWO_DECIMALS.test('123.456')).toBe(false)
    })

    test('POSITIVE_NUMBER_WITH_ONE_TO_THREE_DECIMALS 正则表达式', () => {
      expect(dcRegexp.POSITIVE_NUMBER_WITH_ONE_TO_THREE_DECIMALS.test('123')).toBe(true)
      expect(dcRegexp.POSITIVE_NUMBER_WITH_ONE_TO_THREE_DECIMALS.test('123.4')).toBe(true)
      expect(dcRegexp.POSITIVE_NUMBER_WITH_ONE_TO_THREE_DECIMALS.test('123.45')).toBe(true)
      expect(dcRegexp.POSITIVE_NUMBER_WITH_ONE_TO_THREE_DECIMALS.test('123.456')).toBe(true)
      expect(dcRegexp.POSITIVE_NUMBER_WITH_ONE_TO_THREE_DECIMALS.test('123.4567')).toBe(false)
      expect(dcRegexp.POSITIVE_NUMBER_WITH_ONE_TO_THREE_DECIMALS.test('-123')).toBe(false)
    })

    test('NON_ZERO_POSITIVE_INTEGER 正则表达式', () => {
      expect(dcRegexp.NON_ZERO_POSITIVE_INTEGER.test('123')).toBe(true)
      expect(dcRegexp.NON_ZERO_POSITIVE_INTEGER.test('0')).toBe(false)
      expect(dcRegexp.NON_ZERO_POSITIVE_INTEGER.test('-123')).toBe(false)
      expect(dcRegexp.NON_ZERO_POSITIVE_INTEGER.test('123.45')).toBe(false)
    })

    test('NON_ZERO_NEGATIVE_INTEGER 正则表达式', () => {
      expect(dcRegexp.NON_ZERO_NEGATIVE_INTEGER.test('-123')).toBe(true)
      expect(dcRegexp.NON_ZERO_NEGATIVE_INTEGER.test('0')).toBe(false)
      expect(dcRegexp.NON_ZERO_NEGATIVE_INTEGER.test('123')).toBe(false)
      expect(dcRegexp.NON_ZERO_NEGATIVE_INTEGER.test('-123.45')).toBe(false)
    })

    test('NON_NEGATIVE_INTEGER 正则表达式', () => {
      expect(dcRegexp.NON_NEGATIVE_INTEGER.test('123')).toBe(true)
      expect(dcRegexp.NON_NEGATIVE_INTEGER.test('0')).toBe(true)
      expect(dcRegexp.NON_NEGATIVE_INTEGER.test('-123')).toBe(false)
      expect(dcRegexp.NON_NEGATIVE_INTEGER.test('123.45')).toBe(false)
    })

    test('NON_POSITIVE_INTEGER 正则表达式', () => {
      expect(dcRegexp.NON_POSITIVE_INTEGER.test('-123')).toBe(true)
      expect(dcRegexp.NON_POSITIVE_INTEGER.test('0')).toBe(true)
      expect(dcRegexp.NON_POSITIVE_INTEGER.test('123')).toBe(false)
      expect(dcRegexp.NON_POSITIVE_INTEGER.test('-123.45')).toBe(false)
    })

    test('NON_NEGATIVE_FLOAT 正则表达式', () => {
      expect(dcRegexp.NON_NEGATIVE_FLOAT.test('123')).toBe(true)
      expect(dcRegexp.NON_NEGATIVE_FLOAT.test('123.45')).toBe(true)
      expect(dcRegexp.NON_NEGATIVE_FLOAT.test('0')).toBe(true)
      expect(dcRegexp.NON_NEGATIVE_FLOAT.test('-123')).toBe(false)
    })

    test('NON_POSITIVE_FLOAT 正则表达式', () => {
      expect(dcRegexp.NON_POSITIVE_FLOAT.test('-123')).toBe(true)
      expect(dcRegexp.NON_POSITIVE_FLOAT.test('-123.45')).toBe(true)
      expect(dcRegexp.NON_POSITIVE_FLOAT.test('0')).toBe(true)
      expect(dcRegexp.NON_POSITIVE_FLOAT.test('123')).toBe(false)
    })

    test('POSITIVE_FLOAT 正则表达式', () => {
      expect(dcRegexp.POSITIVE_FLOAT.test('123.45')).toBe(true)
      expect(dcRegexp.POSITIVE_FLOAT.test('0.45')).toBe(true)
      expect(dcRegexp.POSITIVE_FLOAT.test('123')).toBe(false)
      expect(dcRegexp.POSITIVE_FLOAT.test('-123.45')).toBe(false)
    })

    test('NEGATIVE_FLOAT 正则表达式', () => {
      expect(dcRegexp.NEGATIVE_FLOAT.test('-123.45')).toBe(true)
      expect(dcRegexp.NEGATIVE_FLOAT.test('-0.45')).toBe(true)
      expect(dcRegexp.NEGATIVE_FLOAT.test('123.45')).toBe(false)
      expect(dcRegexp.NEGATIVE_FLOAT.test('-123')).toBe(false)
    })

    test('FLOAT 正则表达式', () => {
      expect(dcRegexp.FLOAT.test('123.45')).toBe(true)
      expect(dcRegexp.FLOAT.test('-123.45')).toBe(true)
      expect(dcRegexp.FLOAT.test('123')).toBe(true)
      expect(dcRegexp.FLOAT.test('abc')).toBe(false)
    })
  })

  // 测试字符相关正则表达式
  describe('字符相关正则表达式', () => {
    test('CHINESE_CHARACTERS 正则表达式', () => {
      expect(dcRegexp.CHINESE_CHARACTERS.test('中文')).toBe(true)
      expect(dcRegexp.CHINESE_CHARACTERS.test('中文123')).toBe(false)
      expect(dcRegexp.CHINESE_CHARACTERS.test('123')).toBe(false)
    })

    test('ENGLISH_AND_NUMBERS 正则表达式', () => {
      expect(dcRegexp.ENGLISH_AND_NUMBERS.test('abc123')).toBe(true)
      expect(dcRegexp.ENGLISH_AND_NUMBERS.test('abc')).toBe(true)
      expect(dcRegexp.ENGLISH_AND_NUMBERS.test('123')).toBe(true)
      expect(dcRegexp.ENGLISH_AND_NUMBERS.test('abc123_')).toBe(false)
      expect(dcRegexp.ENGLISH_AND_NUMBERS.test('中文')).toBe(false)
    })

    test('LENGTH_3_TO_20 正则表达式', () => {
      expect(dcRegexp.LENGTH_3_TO_20.test('abc')).toBe(true)
      expect(dcRegexp.LENGTH_3_TO_20.test('abcdefghijklmnopqrst')).toBe(true)
      expect(dcRegexp.LENGTH_3_TO_20.test('ab')).toBe(false)
      expect(dcRegexp.LENGTH_3_TO_20.test('abcdefghijklmnopqrstu')).toBe(false)
    })

    test('ENGLISH_LETTERS 正则表达式', () => {
      expect(dcRegexp.ENGLISH_LETTERS.test('abc')).toBe(true)
      expect(dcRegexp.ENGLISH_LETTERS.test('ABC')).toBe(true)
      expect(dcRegexp.ENGLISH_LETTERS.test('abc123')).toBe(false)
      expect(dcRegexp.ENGLISH_LETTERS.test('中文')).toBe(false)
    })

    test('UPPERCASE_ENGLISH_LETTERS 正则表达式', () => {
      expect(dcRegexp.UPPERCASE_ENGLISH_LETTERS.test('ABC')).toBe(true)
      expect(dcRegexp.UPPERCASE_ENGLISH_LETTERS.test('abc')).toBe(false)
      expect(dcRegexp.UPPERCASE_ENGLISH_LETTERS.test('ABC123')).toBe(false)
    })

    test('LOWERCASE_ENGLISH_LETTERS 正则表达式', () => {
      expect(dcRegexp.LOWERCASE_ENGLISH_LETTERS.test('abc')).toBe(true)
      expect(dcRegexp.LOWERCASE_ENGLISH_LETTERS.test('ABC')).toBe(false)
      expect(dcRegexp.LOWERCASE_ENGLISH_LETTERS.test('abc123')).toBe(false)
    })

    test('NUMBERS_AND_ENGLISH_LETTERS 正则表达式', () => {
      expect(dcRegexp.NUMBERS_AND_ENGLISH_LETTERS.test('abc123')).toBe(true)
      expect(dcRegexp.NUMBERS_AND_ENGLISH_LETTERS.test('abc')).toBe(true)
      expect(dcRegexp.NUMBERS_AND_ENGLISH_LETTERS.test('123')).toBe(true)
      expect(dcRegexp.NUMBERS_AND_ENGLISH_LETTERS.test('中文')).toBe(false)
    })

    test('WORD_CHARACTERS 正则表达式', () => {
      expect(dcRegexp.WORD_CHARACTERS.test('abc123_')).toBe(true)
      expect(dcRegexp.WORD_CHARACTERS.test('abc')).toBe(true)
      expect(dcRegexp.WORD_CHARACTERS.test('123')).toBe(true)
      expect(dcRegexp.WORD_CHARACTERS.test('中文')).toBe(false)
      expect(dcRegexp.WORD_CHARACTERS.test('abc 123')).toBe(false)
    })

    test('CHINESE_ENGLISH_NUMBERS_AND_UNDERSCORE 正则表达式', () => {
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_AND_UNDERSCORE.test('中文abc123_')).toBe(true)
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_AND_UNDERSCORE.test('中文')).toBe(true)
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_AND_UNDERSCORE.test('abc')).toBe(true)
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_AND_UNDERSCORE.test('123')).toBe(true)
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_AND_UNDERSCORE.test('中文 abc')).toBe(false)
    })

    test('CHINESE_ENGLISH_NUMBERS_NO_SYMBOLS 正则表达式', () => {
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_NO_SYMBOLS.test('中文abc123')).toBe(true)
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_NO_SYMBOLS.test('中文')).toBe(true)
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_NO_SYMBOLS.test('abc')).toBe(true)
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_NO_SYMBOLS.test('123')).toBe(true)
      expect(dcRegexp.CHINESE_ENGLISH_NUMBERS_NO_SYMBOLS.test('中文_abc')).toBe(false)
    })
  })

  // 测试常用格式正则表达式
  describe('常用格式正则表达式', () => {
    test('EMAIL 正则表达式', () => {
      expect(dcRegexp.EMAIL.test('test@example.com')).toBe(true)
      expect(dcRegexp.EMAIL.test('test.email@example.com')).toBe(true)
      expect(dcRegexp.EMAIL.test('test@example.co.uk')).toBe(true)
      expect(dcRegexp.EMAIL.test('test')).toBe(false)
      expect(dcRegexp.EMAIL.test('test@')).toBe(false)
      expect(dcRegexp.EMAIL.test('@example.com')).toBe(false)
    })

    test('DOMAIN 正则表达式', () => {
      expect(dcRegexp.DOMAIN.test('example.com')).toBe(true)
      expect(dcRegexp.DOMAIN.test('sub.example.com')).toBe(true)
      expect(dcRegexp.DOMAIN.test('example')).toBe(false)
      expect(dcRegexp.DOMAIN.test('123.456.789.0')).toBe(false)
    })

    test('INTERNET_URL 正则表达式', () => {
      expect(dcRegexp.INTERNET_URL.test('https://example.com')).toBe(true)
      expect(dcRegexp.INTERNET_URL.test('http://example.com')).toBe(true)
      expect(dcRegexp.INTERNET_URL.test('ftp://example.com')).toBe(true)
      expect(dcRegexp.INTERNET_URL.test('example.com')).toBe(false)
    })

    test('CHINA_MOBILE_PHONE 正则表达式', () => {
      expect(dcRegexp.CHINA_MOBILE_PHONE.test('13812345678')).toBe(true)
      expect(dcRegexp.CHINA_MOBILE_PHONE.test('15912345678')).toBe(true)
      expect(dcRegexp.CHINA_MOBILE_PHONE.test('18812345678')).toBe(true)
      expect(dcRegexp.CHINA_MOBILE_PHONE.test('12345678901')).toBe(false)
      expect(dcRegexp.CHINA_MOBILE_PHONE.test('1381234567')).toBe(false)
    })

    test('TELEPHONE_NUMBER 正则表达式', () => {
      expect(dcRegexp.TELEPHONE_NUMBER.test('010-12345678')).toBe(true)
      expect(dcRegexp.TELEPHONE_NUMBER.test('(010)-12345678')).toBe(true)
      expect(dcRegexp.TELEPHONE_NUMBER.test('12345678')).toBe(true)
      expect(dcRegexp.TELEPHONE_NUMBER.test('1234567')).toBe(false)
    })

    test('CHINA_TELEPHONE_NUMBER 正则表达式', () => {
      expect(dcRegexp.CHINA_TELEPHONE_NUMBER.test('010-12345678')).toBe(true)
      expect(dcRegexp.CHINA_TELEPHONE_NUMBER.test('021-1234567')).toBe(true)
      expect(dcRegexp.CHINA_TELEPHONE_NUMBER.test('12345678')).toBe(false)
    })

    test('ID_CARD_NUMBER 正则表达式', () => {
      expect(dcRegexp.ID_CARD_NUMBER.test('110101199001011234')).toBe(true)
      expect(dcRegexp.ID_CARD_NUMBER.test('11010119900101123')).toBe(true)
      expect(dcRegexp.ID_CARD_NUMBER.test('1101011990010112345')).toBe(false)
    })

    test('SHORT_ID_CARD_NUMBER 正则表达式', () => {
      expect(dcRegexp.SHORT_ID_CARD_NUMBER.test('110101199001011234')).toBe(true)
      expect(dcRegexp.SHORT_ID_CARD_NUMBER.test('11010119900101123X')).toBe(true)
      expect(dcRegexp.SHORT_ID_CARD_NUMBER.test('1101011990010112345')).toBe(false)
    })

    test('VALID_ACCOUNT 正则表达式', () => {
      expect(dcRegexp.VALID_ACCOUNT.test('user123')).toBe(true)
      expect(dcRegexp.VALID_ACCOUNT.test('u12345')).toBe(true)
      expect(dcRegexp.VALID_ACCOUNT.test('1user')).toBe(false)
      expect(dcRegexp.VALID_ACCOUNT.test('user')).toBe(false)
      expect(dcRegexp.VALID_ACCOUNT.test('user1234567890123456')).toBe(false)
    })

    test('PASSWORD 正则表达式', () => {
      expect(dcRegexp.PASSWORD.test('Password123')).toBe(true)
      expect(dcRegexp.PASSWORD.test('p123456')).toBe(true)
      expect(dcRegexp.PASSWORD.test('123456')).toBe(false)
      expect(dcRegexp.PASSWORD.test('password')).toBe(true)
      expect(dcRegexp.PASSWORD.test('p12345')).toBe(false)
    })

    test('STRONG_PASSWORD 正则表达式', () => {
      expect(dcRegexp.STRONG_PASSWORD.test('Password123')).toBe(true)
      expect(dcRegexp.STRONG_PASSWORD.test('P1234567')).toBe(true)
      expect(dcRegexp.STRONG_PASSWORD.test('password123')).toBe(false)
      expect(dcRegexp.STRONG_PASSWORD.test('PASSWORD123')).toBe(false)
      expect(dcRegexp.STRONG_PASSWORD.test('Pass123')).toBe(false)
    })

    test('DATE_FORMAT 正则表达式', () => {
      expect(dcRegexp.DATE_FORMAT.test('2023-01-01')).toBe(true)
      expect(dcRegexp.DATE_FORMAT.test('2023-1-1')).toBe(true)
      expect(dcRegexp.DATE_FORMAT.test('2023/01/01')).toBe(false)
      expect(dcRegexp.DATE_FORMAT.test('2023-01')).toBe(false)
    })

    test('MONTH 正则表达式', () => {
      expect(dcRegexp.MONTH.test('01')).toBe(true)
      expect(dcRegexp.MONTH.test('12')).toBe(true)
      expect(dcRegexp.MONTH.test('1')).toBe(true)
      expect(dcRegexp.MONTH.test('13')).toBe(false)
    })

    test('DAY 正则表达式', () => {
      expect(dcRegexp.DAY.test('01')).toBe(true)
      expect(dcRegexp.DAY.test('31')).toBe(true)
      expect(dcRegexp.DAY.test('1')).toBe(true)
      expect(dcRegexp.DAY.test('32')).toBe(false)
    })

    test('XML_FILE 正则表达式', () => {
      expect(dcRegexp.XML_FILE.test('example.xml')).toBe(true)
      expect(dcRegexp.XML_FILE.test('example.XML')).toBe(true)
      expect(dcRegexp.XML_FILE.test('example.txt')).toBe(false)
    })

    test('CHINESE_CHARACTER 正则表达式', () => {
      expect(dcRegexp.CHINESE_CHARACTER.test('中文')).toBe(true)
      expect(dcRegexp.CHINESE_CHARACTER.test('abc')).toBe(false)
      expect(dcRegexp.CHINESE_CHARACTER.test('123')).toBe(false)
    })

    test('DOUBLE_BYTE_CHARACTER 正则表达式', () => {
      expect(dcRegexp.DOUBLE_BYTE_CHARACTER.test('中文')).toBe(true)
      expect(dcRegexp.DOUBLE_BYTE_CHARACTER.test('abc')).toBe(false)
    })

    test('BLANK_LINE 正则表达式', () => {
      expect(dcRegexp.BLANK_LINE.test('\n\r')).toBe(true)
      expect(dcRegexp.BLANK_LINE.test('\n  \r')).toBe(true)
      expect(dcRegexp.BLANK_LINE.test('\nabc\r')).toBe(false)
    })

    test('LEADING_OR_TRAILING_WHITESPACE 正则表达式', () => {
      expect(dcRegexp.LEADING_OR_TRAILING_WHITESPACE.test(' abc')).toBe(true)
      expect(dcRegexp.LEADING_OR_TRAILING_WHITESPACE.test('abc ')).toBe(true)
      expect(dcRegexp.LEADING_OR_TRAILING_WHITESPACE.test('abc')).toBe(false)
    })

    test('QQ_NUMBER 正则表达式', () => {
      expect(dcRegexp.QQ_NUMBER.test('12345')).toBe(true)
      expect(dcRegexp.QQ_NUMBER.test('1234')).toBe(false)
      expect(dcRegexp.QQ_NUMBER.test('012345')).toBe(false)
    })

    test('CHINA_POSTAL_CODE 正则表达式', () => {
      expect(dcRegexp.CHINA_POSTAL_CODE.test('100000')).toBe(true)
      expect(dcRegexp.CHINA_POSTAL_CODE.test('10000')).toBe(false)
      expect(dcRegexp.CHINA_POSTAL_CODE.test('1000000')).toBe(false)
    })

    test('IP_ADDRESS 正则表达式', () => {
      expect(dcRegexp.IP_ADDRESS.test('192.168.1.1')).toBe(true)
      expect(dcRegexp.IP_ADDRESS.test('255.255.255.255')).toBe(true)
      expect(dcRegexp.IP_ADDRESS.test('300.1.1.1')).toBe(true) // 注意：这个正则表达式不验证IP地址的范围
    })

    test('IPV4_ADDRESS 正则表达式', () => {
      expect(dcRegexp.IPV4_ADDRESS.test('192.168.1.1')).toBe(true)
      expect(dcRegexp.IPV4_ADDRESS.test('255.255.255.255')).toBe(true)
    })

    test('SUBNET_MASK 正则表达式', () => {
      expect(dcRegexp.SUBNET_MASK.test('255.255.255.0')).toBe(true)
      expect(dcRegexp.SUBNET_MASK.test('192.168.1.1')).toBe(true)
    })

    test('VALIDATE_DATE 正则表达式', () => {
      expect(dcRegexp.VALIDATE_DATE.test('2023-01-01')).toBe(true)
      expect(dcRegexp.VALIDATE_DATE.test('2023-02-29')).toBe(false) // 非闰年
      expect(dcRegexp.VALIDATE_DATE.test('2020-02-29')).toBe(true) // 闰年
      expect(dcRegexp.VALIDATE_DATE.test('2023-13-01')).toBe(false)
      expect(dcRegexp.VALIDATE_DATE.test('2023-01-32')).toBe(false)
    })
  })
})
