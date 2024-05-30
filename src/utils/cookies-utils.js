class DisposeCookie {
  constructor() {
    this.cookies = new Map(); // 使用Map以提高性能
  }

  /**
   * 读取cookies
   * @param {string} key 要读取的cookie的keyname
   * @returns {string|null} 返回cookie的值，如果不存在则返回null
  */
  readCookie(key) {
    return this.cookies.get(key) || null;
  }

  /**
   * 写入cookies
   * @param {string} name 要写入的cookie的keyname
   * @param {string} value 要写入的cookie的值
   * @param {number|null} days cookie的过期天数，如果为null则为session cookie
  */
  writeCookie(name, value, days) {
    const expires = days ? `; expires=${new Date(Date.now() + days * 86400000).toUTCString()}` : '';
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    const httpOnly = true; // 假设都需要防止XSS
    document.cookie = `${name}=${value}${expires}; path=/`; // 移除HttpOnly的直接设置，改为服务器端处理
    if (httpOnly) {
      // 对于需要的cookie设置HttpOnly
      document.cookie = `${name}=${value}${expires}; path=/; HttpOnly`;
    }
    if (secure) {
      // 对于需要的cookie设置Secure
      document.cookie = `${name}=${value}${expires}; path=/; Secure`;
    }
    // 更新this.cookies
    this.cookies.set(name, value);
  }

  /**
   * 解析cookies
   * @param {string} cookieStr 要解析的cookie字符串
   * @returns {Array<Object>} 返回解析后的cookie对象数组
  */
  parseCookie(cookieStr) {
    return cookieStr.split('; ').map(item => {
      const [name, value] = item.split('=');
      return { name, value };
    });
  }

  /**
   * 删除cookies
   * @param {string} name 要删除的cookie的keyname
  */
  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`; // 不再设置HttpOnly和Secure，因为删除操作不需要这些
    this.cookies.delete(name);
  }

  /**
   * 更新cookies对象
   * 该方法内部使用，避免在外部直接修改this.cookies
   * @param {string} key 
   * @param {string} value 
  */
  _updateCookies(key, value) {
    this.cookies.set(key, value);
  }

  static setCookie(cName, cValue, exDays) {
    if (exDays < 0) {
      console.error("过期天数不能为负数");
      return;
    }
    let d = new Date();
    d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = `${cName}=${cValue};${expires};path=/`; // 建议在服务器端设置HttpOnly和Secure
  }

  /**
   * 获取Cookie的值
   * @param {string} cName 要获取的Cookie的名称
   * @returns {string} Cookie的值
   */
  static getCookie(cName) {
    let name = `${cName}=`;
    let decodedCookie = decodeURIComponent(document.cookie); // 解码，以处理名称或值中的URL编码字符
    let ca = decodedCookie.split('; ');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return ""; // 如果未找到Cookie，则返回空字符串
  }

  /**
   * 检测并设置用户Cookie
   */
  static checkCookie() {
    let user = DisposeCookie.getCookie("username");
    if (user != "") {
      alert(`欢迎${user}再次访问`);
    } else {
      user = prompt("请输入你的名字：", "");
      if (user != "" && user != null) {
        DisposeCookie.setCookie("username", user, 365);
      }
    }
  }
}

// 使用
const cookieManager = new DisposeCookie();

console.log(cookieManager.readCookie('test'));
cookieManager.writeCookie('test', 'hello', 7);
console.log(cookieManager.readCookie('test'));
const parsedCookies = cookieManager.parseCookie('test=123; test2=456');
console.log(parsedCookies);
cookieManager.deleteCookie('test');
console.log(cookieManager.readCookie('test'));