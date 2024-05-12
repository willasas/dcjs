// 时间日期相关

/**
 * 计算给定日期是一年中的第几天。
 * 使用本地时间进行计算。
 * 
 * @param {Date} date - 需要计算的日期对象。
 * @returns {number} - 一年中给定日期对应的天数。
 */
const dayOfYear = (date) => {
  // 验证输入是否为有效的Date对象
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Date object provided.');
  }

  // 使用缓存减少重复Date对象的创建
  const yearStart = new Date(date.getFullYear(), 0, 0);
  
  // 计算两个日期之间的总毫秒数并转换为天数
  const diffInMs = date.getTime() - yearStart.getTime();
  const dayCount = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return dayCount;
};

// 测试示例
console.log(dayOfYear(new Date())); // 输出当前日期是一年中的第几天



/**
 * 格式化给定的毫秒数为易读的时间字符串。
 *
 * @param {number} ms - 需要格式化的毫秒数。必须是数字类型，非数字输入将抛出错误。
 * @returns {string} - 返回一个由逗号分隔的时间单位组成的字符串，如 '1 day, 2 hours, 3 minutes'。
 */
const formatDuration = (ms) => {
  // 参数类型检查
  if (typeof ms !== 'number') {
    throw new TypeError('Input must be a number');
  }

  // 处理负值
  if (ms < 0) {
    ms = -ms;
  }

  /**
   * 时间单位与对应的毫秒数映射表
   * @type {{day: number, hour: number, minute: number, second: number, millisecond: number}}
   */
  const timeUnits = {
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000,
    millisecond: 1,
  };

  const time = {
    day: Math.floor(ms / timeUnits.day),
    hour: Math.floor(ms / timeUnits.hour) % 24,
    minute: Math.floor(ms / timeUnits.minute) % 60,
    second: Math.floor(ms / timeUnits.second) % 60,
    millisecond: Math.floor(ms / timeUnits.millisecond) % 1000,
  };

  // 简化复数形式的处理
  const appendS = (val) => val !== 1 ? 's' : '';

  /**
   * 将时间对象转换为格式化后的时间字符串
   * @param {[string, number][]} entries - 时间对象的键值对数组
   * @returns {string} - 格式化后的时间字符串
   */
  const formatTimeEntries = (entries) =>
    entries
      .filter(([_, val]) => val !== 0)
      .map(([key, val]) => `${val} ${key}${appendS(val)}`)
      .join(', ');

  return formatTimeEntries(Object.entries(time));
};

console.log(formatDuration(1001)); // '1 second, 1 millisecond'
console.log(formatDuration(34325055574)); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'



/**
 * 从一个Date对象中提取时间，格式为"hh:mm:ss"。
 * @param {Date} date - 一个Date对象。
 * @returns {string} - 时间字符串，格式为"hh:mm:ss"。
 * @throws {Error} - 如果传入的不是有效的Date对象，则抛出错误。
 */
const getColonTimeFromDate = date => {
  // 输入验证：确保传入的是有效的Date对象
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Date');
  }

  // 考虑时区问题，但保持函数接口不变，即不增加时区参数
  // 提取时间字符串，并确保格式的稳定性
  const timeString = date.toTimeString();
  
  // 确保提取的时间字符串符合预期格式
  if (timeString.length < 8 || !/:/.test(timeString)) {
    throw new Error('Unexpected time string format');
  }

  // 返回切片后的的时间字符串
  return timeString.slice(0, 8);
};

// 测试示例（保持不变）
console.log(getColonTimeFromDate(new Date())); // "hh:mm:ss"



/**
 * 计算两个日期之间的天数差异。
 * @param {Date} dateInitial - 开始日期。
 * @param {Date} dateFinal - 结束日期。
 * @returns {number} 两个日期之间的天数差异。
 */
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => {
  // 验证输入是否为有效日期
  if (!(dateInitial instanceof Date) || !(dateFinal instanceof Date)) {
    throw new Error('输入必须为Date对象');
  }
  
  // 验证日期是否有效（不晚于1970年1月1日）
  if (dateInitial.getTime() < 0 || dateFinal.getTime() < 0) {
    throw new Error('输入的日期无效');
  }
  
  // 计算天数差异
  const diffInMs = dateFinal.getTime() - dateInitial.getTime();
  const diffInDays = diffInMs / (1000 * 3600 * 24);

  // 对结果进行四舍五入以处理浮点数精度问题
  return Math.round(diffInDays);
};

try {
  console.log(
    getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22'))
  ); // 9
} catch (error) {
  console.error(error.message);
}



/**
 * 将24小时制的整数时间转换为12小时格式的时间字符串（例如：13 -> '1pm'）。
 *
 * @param {number} num - 一个表示24小时制时间的整数，范围应在0到24之间（包括0和24）。
 * @returns {string} - 转换后的12小时格式时间字符串，包含'am'或'pm'后缀。
 * @throws {Error} - 如果传入的参数不是整数，或者不在有效的时间范围内，则抛出错误。
 */
const convertHourTo12HourFormat = num => {
  // 参数校验：确保是整数且在0到24之间
  if (typeof num !== 'number' || !Number.isInteger(num) || num < 0 || num > 24) {
    throw new Error('Invalid input: please provide a valid hour (0-24)');
  }

  // 使用变量减少重复计算和提高代码可读性
  const remainder = num % 12;
  const meridiem = num >= 12 ? 'pm' : 'am';

  // 根据计算结果返回对应的12小时制字符串
  return remainder === 0 ? 12 + meridiem : remainder + meridiem;
};

try {
  console.log(convertHourTo12HourFormat(0)); // "12am"
  console.log(convertHourTo12HourFormat(11)); // "11am"
  console.log(convertHourTo12HourFormat(13)); // "1pm"
  console.log(convertHourTo12HourFormat(25)); // 将抛出错误
} catch (error) {
  console.error(error.message);
}



/**
 * 计算两个日期之间的月份数差异。
 * @param {Date} dateInitial - 开始日期。
 * @param {Date} dateFinal - 结束日期。
 * @returns {number} 两个日期之间的月份数。
 * @throws {Error} 如果输入不是有效的Date对象。
 */
const getMonthsDiffBetweenDates = (dateInitial, dateFinal) => {
  // 输入验证：确保都是Date对象
  if (!(dateInitial instanceof Date) || !(dateFinal instanceof Date)) {
    throw new Error('Invalid input: both arguments must be Date objects.');
  }
  // 确保日期有效，即不是NaN
  if (isNaN(dateInitial.getTime()) || isNaN(dateFinal.getTime())) {
    throw new Error('Invalid input: at least one of the Date objects is invalid.');
  }

  // 计算月份数差异
  const yearDiff = dateFinal.getFullYear() - dateInitial.getFullYear();
  const monthDiff = dateFinal.getMonth() - dateInitial.getMonth();
  return Math.max(yearDiff * 12 + monthDiff, 0);
};

// 示例调用，与原代码相同
getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4



/**
 * 比较两个日期对象，判断第一个日期是否在第二个日期之后。
 * @param {Date} dateA - 第一个日期对象。
 * @param {Date} dateB - 第二个日期对象。
 * @returns {boolean} 如果dateA在dateB之后，则返回true；否则返回false。
 */
const isAfterDate = (dateA, dateB) => {
  // 参数校验：确保传入的是有效的日期对象
  if (!(dateA instanceof Date) || !(dateB instanceof Date) || isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
    throw new Error('传入的参数不是有效的日期对象');
  }

  // 使用getTime()确保比较是基于UTC时间戳的，从而避免时区差异的影响
  return dateA.getTime() > dateB.getTime();
};

// 示例调用
try {
  console.log(isAfterDate(new Date(2010, 9, 21), new Date(2010, 9, 20))); // true
} catch (error) {
  console.error(error.message);
}



/**
 * 比较两个日期对象，确定第一个日期是否早于第二个日期。
 * 注意：月份的索引是从0开始的（1月是0，2月是1，以此类推）。
 * 输入的日期对象将被转换为UTC时间进行比较，以避免时区差异的影响。
 * 时间部分将被忽略，仅比较日期。
 * 
 * @param {Date} dateA - 第一个日期对象
 * @param {Date} dateB - 第二个日期对象
 * @returns {boolean} 如果dateA早于dateB，则返回true；否则返回false
 */
const isBeforeDate = (dateA, dateB) => {
  // 输入验证：确保dateA和dateB都是Date对象
  if (!(dateA instanceof Date) || !(dateB instanceof Date)) {
    throw new TypeError('参数必须是Date对象');
  }

  // 将日期转换为UTC时间并清除时间部分，仅保留日期
  const utcDateA = new Date(Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate()));
  const utcDateB = new Date(Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate()));

  // 比较两个UTC日期对象
  return utcDateA < utcDateB;
};

// 示例使用
console.log(isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21))); // true



/**
 * 判断给定的年份是否是闰年。
 * 使用数学逻辑判断，提高了直观性和性能。
 * 添加了输入验证，增强了代码的健壮性。
 * 
 * @param {number} year 需要判断的年份。
 * @returns {boolean} 如果给定年份是闰年，则返回true；否则返回false。
 * @throws {Error} 如果输入不是正整数，则抛出错误。
 */
const isLeapYear = year => {
  // 输入验证
  if (typeof year !== 'number' || !Number.isInteger(year) || year < 0) {
    throw new Error('Invalid input: year must be a positive integer.');
  }

  // 使用数学逻辑判断闰年
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// 测试示例
console.log(isLeapYear(2019)); // false
console.log(isLeapYear(2020)); // true



/**
 * 比较两个日期是否相同。
 * 注意：月份的索引是从0开始的，即1月对应索引0。
 * 使用此函数时，请确保传入的是有效的Date对象。
 * 
 * @param {Date} dateA - 第一个日期对象。
 * @param {Date} dateB - 第二个日期对象。
 * @returns {boolean} - 如果两个日期相同则返回true，否则返回false。
 */
const isSameDate = (dateA, dateB) => {
  // 参数有效性检查
  if (!(dateA instanceof Date) || !(dateB instanceof Date)) {
    throw new Error('isSameDate函数需要两个Date对象作为参数');
  }
  
  // 考虑时区问题，使用toLocaleDateString进行比较
  // 注意：这将根据本地地区格式化日期，不涉及时区转换
  return dateA.toLocaleDateString() === dateB.toLocaleDateString();
};

try {
  console.log(isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20))); // true
} catch (error) {
  console.error(error.message);
}



/**
 * 判断给定日期是否为工作日（周一至周五）。
 * 默认使用当前日期和UTC时区进行判断。
 *
 * @param {Date} [date=new Date()] - 要检查的日期，默认为当前日期。
 * @param {string} [timezone="UTC"] - 用于确定日期的工作日属性的时区，默认为 UTC。
 * @returns {boolean} 如果给定日期是工作日，则返回 true，否则返回 false。
 */
const isWorkday = (date = new Date(), timezone = "UTC") => {
  // 使用 Date.UTC 年、月、日参数创建一个UTC日期，避免时区影响
  const getDayInUTC = () => new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).getDay();
  
  // 获取当前日期在指定时区下是周几
  const dayOfWeek = getDayInUTC();
  
  // 工作日定义为周一到周五
  const isWorkdayFlag = (dayOfWeek >= 1 && dayOfWeek <= 5);
  
  return isWorkdayFlag;
};

// 示例：检查默认日期（当前日期）是否为工作日
console.log(isWorkday()); // 可能输出 true 或 false，取决于当前UTC日期

// 示例：检查指定日期和时区是否为工作日
console.log(isWorkday(new Date(2023, 3, 14), "UTC")); // 检查2023年4月14日是否为工作日，以UTC时区为准



/**
 * 检查给定的日期是否是周末。
 * 使用 [0, 6] 包含来判断是否是周末，其中 0 表示周日，6 表示周六。
 * @param {Date} t - 要检查的日期对象。如果未提供，则使用当前日期。
 * @returns {boolean} - 如果给定日期是周末，则返回 true，否则返回 false。
 */
const isWeekend = (t = new Date()) => {
  // 增强类型检查，确保传入的是Date对象
  if (!(t instanceof Date)) {
    throw new TypeError('Expected a Date object');
  }

  // 使用更直观的方式检查是否是周末
  return [0, 6].includes(t.getDay());
};

// 示例调用
console.log(isWeekend()); // 使用当前日期作为默认参数
console.log(isWeekend(new Date('2023-04-01'))); // 指定日期进行检查



/**
 * 获取给定日期数组中的最晚日期。
 * @param {Date[]} dates - 日期数组。
 * @returns {Date} - 数组中最晚的日期。
 * @throws {Error} - 如果输入不是数组或包含非日期对象。
 */
const maxDate = dates => {
  // 参数验证：确保输入是一个数组
  if (!Array.isArray(dates)) {
    throw new Error('输入必须是一个日期数组');
  }

  // 找到数组中最新的日期
  let max;
  for (let i = 0; i < dates.length; i++) {
    // 参数验证：确保数组中的每个元素都是日期对象
    if (!(dates[i] instanceof Date) || isNaN(dates[i].getTime())) {
      throw new Error('数组中包含非日期对象');
    }

    // 初始化max或者更新max为更晚的日期
    if (max === undefined || dates[i].getTime() > max.getTime()) {
      max = dates[i];
    }
  }

  // 返回最晚的日期
  return max;
};

const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9)
];

try {
  console.log(maxDate(array).toUTCString()); // Sun, 11 Mar 2018 16:00:00 GMT
} catch (error) {
  console.error(error.message);
}



/**
 * 寻找给定日期数组中的最小日期。
 * @param {Date[]} dates - 日期数组
 * @returns {Date} 数组中的最小日期，如果输入不合法则抛出TypeError
 */
const minDate = (dates) => {
  // 参数验证
  if (!Array.isArray(dates)) {
    throw new TypeError('输入必须是数组');
  }
  if (dates.some(date => !(date instanceof Date) || isNaN(date.getTime()))) {
    throw new TypeError('数组中包含非日期对象');
  }

  // 边界条件处理
  if (dates.length === 0) {
    return new Date(NaN); // 返回一个无效的Date对象表示无有效日期
  }

  // 使用循环寻找最小日期，以提高性能
  let min = dates[0];
  for (let i = 1; i < dates.length; i++) {
    if (dates[i].getTime() < min.getTime()) {
      min = dates[i];
    }
  }
  
  return min;
};

const array2 = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9)
];

try {
  console.log(minDate(array2)); // 2016-01-09T00:00:00.000Z
} catch (error) {
  console.error(error.message);
}



/**
 * 获取当前日期的次日，返回格式为YYYY-MM-DD的字符串。
 * 该方法基于UTC时区计算日期，因此不受运行时区影响。
 * 
 * @return {string} 格式为YYYY-MM-DD的日期字符串。
 */
const tomorrow = () => {
  // 使用Date构造函数创建日期对象，自动使用UTC时区。
  let t = new Date();
  // 将日期设置为当前日期的次日
  t.setDate(t.getDate() + 1);
  // 使用toLocaleDateString转换日期，确保结果是按照年-月-日的格式，且基于UTC时区。
  // 这里我们指定'en-US'地区设置以获得一致的结果，无论代码运行在哪个地区。
  return t.toLocaleDateString('en-US', {timeZone: 'UTC'});
};

tomorrow(); // 3/11/2024



const yesterday = () => {
  // 使用Date.UTC来确保时区一致性，获取当前时间的UTC时间戳
  let t = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1));
  // 将日期转换为ISO格式字符串，确保日期的格式一致性
  return t.toISOString().split('T')[0];
};
yesterday(); // 2024-03-09



