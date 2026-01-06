/**
 * dcRegexp 类包含一组常用的正则表达式，用于验证各种格式的数据。
 * @class
 */
class dcRegexp {
  constructor() {}

  /**
   * 获取匹配数字的正则表达式。
   * @returns {RegExp} 匹配数字的正则表达式。
   */
  static get NUMBER() {
    return /^-?[0-9]+$/
  }

  /**
   * 获取匹配 n 位数字的正则表达式。
   * @param {number} n - 数字的位数。
   * @returns {RegExp} 匹配 n 位数字的正则表达式。
   */
  static nDigits(n) {
    return new RegExp(`^\\d{${n}}$`)
  }

  /**
   * 获取匹配至少 n 位数字的正则表达式。
   * @param {number} n - 数字的最小位数。
   * @returns {RegExp} 匹配至少 n 位数字的正则表达式。
   */
  static atLeastNDigits(n) {
    return new RegExp(`^\\d{${n},}$`)
  }

  /**
   * 获取匹配 m 到 n 位数字的正则表达式。
   * @param {number} m - 数字的最小位数。
   * @param {number} n - 数字的最大位数。
   * @returns {RegExp} 匹配 m 到 n 位数字的正则表达式。
   */
  static mToNDigits(m, n) {
    return new RegExp(`^\\d{${m},${n}}$`)
  }

  /**
   * 获取匹配零和非零开头的数字的正则表达式。
   * @returns {RegExp} 匹配零和非零开头的数字的正则表达式。
   */
  static get ZERO_OR_NON_ZERO_START_NUMBER() {
    return /^(0|[1-9][0-9]*)$/
  }

  /**
   * 获取匹配非零开头的最多带两位小数的数字的正则表达式。
   * @returns {RegExp} 匹配非零开头的最多带两位小数的数字的正则表达式。
   */
  static get NON_ZERO_START_NUMBER_WITH_TWO_DECIMALS() {
    return /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/
  }

  /**
   * 获取匹配带1-2位小数的正数或负数的正则表达式。
   * @returns {RegExp} 匹配带1-2位小数的正数或负数的正则表达式。
   */
  static get NUMBER_WITH_ONE_TO_TWO_DECIMALS() {
    return /^(\-)?\d+(\.\d{1,2})?$/
  }

  /**
   * 获取匹配正数、负数、和小数的正则表达式。
   * @returns {RegExp} 匹配正数、负数、和小数的正则表达式。
   */
  static get NUMBER_OR_DECIMAL() {
    return /^(\-|\+)?\d+(\.\d+)?$/
  }

  /**
   * 获取匹配有两位小数的正实数的正则表达式。
   * @returns {RegExp} 匹配有两位小数的正实数的正则表达式。
   */
  static get POSITIVE_NUMBER_WITH_TWO_DECIMALS() {
    return /^[0-9]+(\.[0-9]{2})?$/
  }

  /**
   * 获取匹配有1~3位小数的正实数的正则表达式。
   * @returns {RegExp} 匹配有1~3位小数的正实数的正则表达式。
   */
  static get POSITIVE_NUMBER_WITH_ONE_TO_THREE_DECIMALS() {
    return /^[0-9]+(\.[0-9]{1,3})?$/
  }

  /**
   * 获取匹配非零的正整数的正则表达式。
   * @returns {RegExp} 匹配非零的正整数的正则表达式。
   */
  static get NON_ZERO_POSITIVE_INTEGER() {
    return /^[1-9]\d*$/
  }

  /**
   * 获取匹配非零的负整数的正则表达式。
   * @returns {RegExp} 匹配非零的负整数的正则表达式。
   */
  static get NON_ZERO_NEGATIVE_INTEGER() {
    return /^-[1-9]\d*$/
  }

  /**
   * 获取匹配非负整数的正则表达式。
   * @returns {RegExp} 匹配非负整数的正则表达式。
   */
  static get NON_NEGATIVE_INTEGER() {
    return /^\d+$/
  }

  /**
   * 获取匹配非正整数的正则表达式。
   * @returns {RegExp} 匹配非正整数的正则表达式。
   */
  static get NON_POSITIVE_INTEGER() {
    return /^-[1-9]\d*|0$/
  }

  /**
   * 获取匹配非负浮点数的正则表达式。
   * @returns {RegExp} 匹配非负浮点数的正则表达式。
   */
  static get NON_NEGATIVE_FLOAT() {
    return /^\d+(\.\d+)?$/
  }

  /**
   * 获取匹配非正浮点数的正则表达式。
   * @returns {RegExp} 匹配非正浮点数的正则表达式。
   */
  static get NON_POSITIVE_FLOAT() {
    return /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/
  }

  /**
   * 获取匹配正浮点数的正则表达式。
   * @returns {RegExp} 匹配正浮点数的正则表达式。
   */
  static get POSITIVE_FLOAT() {
    return /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/
  }

  /**
   * 获取匹配负浮点数的正则表达式。
   * @returns {RegExp} 匹配负浮点数的正则表达式。
   */
  static get NEGATIVE_FLOAT() {
    return /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/
  }

  /**
   * 获取匹配浮点数的正则表达式。
   * @returns {RegExp} 匹配浮点数的正则表达式。
   */
  static get FLOAT() {
    return /^(-?\d+)(\.\d+)?$/
  }

  /**
   * 获取匹配汉字的正则表达式。
   * @returns {RegExp} 匹配汉字的正则表达式。
   */
  static get CHINESE_CHARACTERS() {
    return /^[\u4e00-\u9fa5]{0,}$/
  }

  /**
   * 获取匹配英文和数字的正则表达式。
   * @returns {RegExp} 匹配英文和数字的正则表达式。
   */
  static get ENGLISH_AND_NUMBERS() {
    return /^[A-Za-z0-9]+$/
  }

  /**
   * 获取匹配长度为3-20的所有字符的正则表达式。
   * @returns {RegExp} 匹配长度为3-20的所有字符的正则表达式。
   */
  static get LENGTH_3_TO_20() {
    return /^.{3,20}$/
  }

  /**
   * 获取匹配由26个英文字母组成的字符串的正则表达式。
   * @returns {RegExp} 匹配由26个英文字母组成的字符串的正则表达式。
   */
  static get ENGLISH_LETTERS() {
    return /^[A-Za-z]+$/
  }

  /**
   * 获取匹配由26个大写英文字母组成的字符串的正则表达式。
   * @returns {RegExp} 匹配由26个大写英文字母组成的字符串的正则表达式。
   */
  static get UPPERCASE_ENGLISH_LETTERS() {
    return /^[A-Z]+$/
  }

  /**
   * 获取匹配由26个小写英文字母组成的字符串的正则表达式。
   * @returns {RegExp} 匹配由26个小写英文字母组成的字符串的正则表达式。
   */
  static get LOWERCASE_ENGLISH_LETTERS() {
    return /^[a-z]+$/
  }

  /**
   * 获取匹配由数字和26个英文字母组成的字符串的正则表达式。
   * @returns {RegExp} 匹配由数字和26个英文字母组成的字符串的正则表达式。
   */
  static get NUMBERS_AND_ENGLISH_LETTERS() {
    return /^[A-Za-z0-9]+$/
  }

  /**
   * 获取匹配由数字、26个英文字母或者下划线组成的字符串的正则表达式。
   * @returns {RegExp} 匹配由数字、26个英文字母或者下划线组成的字符串的正则表达式。
   */
  static get WORD_CHARACTERS() {
    return /^\w+$/
  }

  /**
   * 获取匹配中文、英文、数字包括下划线的正则表达式。
   * @returns {RegExp} 匹配中文、英文、数字包括下划线的正则表达式。
   */
  static get CHINESE_ENGLISH_NUMBERS_AND_UNDERSCORE() {
    return /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
  }

  /**
   * 获取匹配中文、英文、数字但不包括下划线等符号的正则表达式。
   * @returns {RegExp} 匹配中文、英文、数字但不包括下划线等符号的正则表达式。
   */
  static get CHINESE_ENGLISH_NUMBERS_NO_SYMBOLS() {
    return /^[\u4E00-\u9FA5A-Za-z0-9]+$/
  }

  /**
   * 获取匹配Email地址的正则表达式。
   * @returns {RegExp} 匹配Email地址的正则表达式。
   */
  static get EMAIL() {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  }

  /**
   * 获取匹配域名的正则表达式。
   * @returns {RegExp} 匹配域名的正则表达式。
   */
  static get DOMAIN() {
    return /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
  }

  /**
   * 获取匹配Internet URL的正则表达式。
   * @returns {RegExp} 匹配Internet URL的正则表达式。
   */
  static get INTERNET_URL() {
    return /[a-zA-Z]+:\/\/[^\s]*/
  }

  /**
   * 获取匹配手机号码的正则表达式。
   * @returns {RegExp} 匹配手机号码的正则表达式。
   */
  static get CHINA_MOBILE_PHONE() {
    return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
  }

  /**
   * 获取匹配电话号码的正则表达式。
   * @returns {RegExp} 匹配电话号码的正则表达式。
   */
  static get TELEPHONE_NUMBER() {
    return /^(\(\d{3,4}-\)|\d{3,4}-)?\d{7,8}$/
  }

  /**
   * 获取匹配国内电话号码的正则表达式。
   * @returns {RegExp} 匹配国内电话号码的正则表达式。
   */
  static get CHINA_TELEPHONE_NUMBER() {
    return /\d{3}-\d{8}|\d{4}-\d{7}/
  }

  /**
   * 获取匹配身份证号的正则表达式。
   * @returns {RegExp} 匹配身份证号的正则表达式。
   */
  static get ID_CARD_NUMBER() {
    return /^\d{15}|\d{18}$/
  }

  /**
   * 获取匹配短身份证号码的正则表达式。
   * @returns {RegExp} 匹配短身份证号码的正则表达式。
   */
  static get SHORT_ID_CARD_NUMBER() {
    return /^([0-9]){7,18}(x|X)?$/
  }

  /**
   * 获取匹配账号是否合法的正则表达式。
   * @returns {RegExp} 匹配账号是否合法的正则表达式。
   */
  static get VALID_ACCOUNT() {
    return /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
  }

  /**
   * 获取匹配密码的正则表达式。
   * @returns {RegExp} 匹配密码的正则表达式。
   */
  static get PASSWORD() {
    return /^[a-zA-Z]\w{5,17}$/
  }

  /**
   * 获取匹配强密码的正则表达式。
   * @returns {RegExp} 匹配强密码的正则表达式。
   */
  static get STRONG_PASSWORD() {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
  }

  /**
   * 获取匹配日期格式的正则表达式。
   * @returns {RegExp} 匹配日期格式的正则表达式。
   */
  static get DATE_FORMAT() {
    return /^\d{4}-\d{1,2}-\d{1,2}$/
  }

  /**
   * 获取匹配一年的12个月的正则表达式。
   * @returns {RegExp} 匹配一年的12个月的正则表达式。
   */
  static get MONTH() {
    return /^(0?[1-9]|1[0-2])$/
  }

  /**
   * 获取匹配一个月的31天的正则表达式。
   * @returns {RegExp} 匹配一个月的31天的正则表达式。
   */
  static get DAY() {
    return /^((0?[1-9])|((1|2)[0-9])|30|31)$/
  }

  /**
   * 获取匹配xml文件的正则表达式。
   * @returns {RegExp} 匹配xml文件的正则表达式。
   */
  static get XML_FILE() {
    return /^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/
  }

  /**
   * 获取匹配中文字符的正则表达式。
   * @returns {RegExp} 匹配中文字符的正则表达式。
   */
  static get CHINESE_CHARACTER() {
    return /[\u4e00-\u9fa5]/
  }

  /**
   * 获取匹配双字节字符的正则表达式。
   * @returns {RegExp} 匹配双字节字符的正则表达式。
   */
  static get DOUBLE_BYTE_CHARACTER() {
    return /[^\x00-\xff]/
  }

  /**
   * 获取匹配空白行的正则表达式。
   * @returns {RegExp} 匹配空白行的正则表达式。
   */
  static get BLANK_LINE() {
    return /\n\s*\r/
  }

  /**
   * 获取匹配首尾空白字符的正则表达式。
   * @returns {RegExp} 匹配首尾空白字符的正则表达式。
   */
  static get LEADING_OR_TRAILING_WHITESPACE() {
    return /^\s*|\s*$/
  }

  /**
   * 获取匹配腾讯QQ号的正则表达式。
   * @returns {RegExp} 匹配腾讯QQ号的正则表达式。
   */
  static get QQ_NUMBER() {
    return /[1-9][0-9]{4,}/
  }

  /**
   * 获取匹配中国邮政编码的正则表达式。
   * @returns {RegExp} 匹配中国邮政编码的正则表达式。
   */
  static get CHINA_POSTAL_CODE() {
    return /[1-9]\d{5}(?!\d)/
  }

  /**
   * 获取匹配IP地址的正则表达式。
   * @returns {RegExp} 匹配IP地址的正则表达式。
   */
  static get IP_ADDRESS() {
    return /\d+\.\d+\.\d+\.\d+/
  }

  /**
   * 获取匹配IP-v4地址的正则表达式。
   * @returns {RegExp} 匹配IP-v4地址的正则表达式。
   */
  static get IPV4_ADDRESS() {
    return /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d?d)\\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?d)\b/
  }

  /**
   * 获取匹配子网掩码的正则表达式。
   * @returns {RegExp} 匹配子网掩码的正则表达式。
   */
  static get SUBNET_MASK() {
    return /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?d)\\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?d))/
  }

  /**
   * 获取匹配校验日期的正则表达式。
   * @returns {RegExp} 匹配校验日期的正则表达式。
   */
  static get VALIDATE_DATE() {
    return /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/
  }
}

window.DC = window.DC || {}
window.DC.RegExp = dcRegexp
