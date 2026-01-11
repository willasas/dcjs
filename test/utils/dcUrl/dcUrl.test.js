// dcUrl 工具类单元测试

// 导入要测试的模块
const dcUrl = require('../../../src/utils/dcUrl.js');

// 测试套件
function runTests() {
  let passedTests = 0;
  let totalTests = 0;

  // 测试辅助函数
  function test(description, testFunction) {
    totalTests++;
    try {
      const result = testFunction();
      if (result) {
        console.log(`✓ ${description}`);
        passedTests++;
      } else {
        console.error(`✗ ${description}`);
      }
    } catch (error) {
      console.error(`✗ ${description}: ${error.message}`);
    }
  }

  // URL解析测试
  test('parse: 解析标准URL', () => {
    const url = 'https://www.example.com:8080/path/to/page?param1=value1&param2=value2#section';
    const parsed = dcUrl.parse(url);
    
    return parsed.protocol === 'https:' &&
           parsed.hostname === 'www.example.com' &&
           parsed.port === '8080' &&
           parsed.pathname === '/path/to/page' &&
           parsed.search === '?param1=value1&param2=value2' &&
           parsed.hash === '#section';
  });

  test('parse: 解析HTTP URL', () => {
    const url = 'http://example.com/path?query=value';
    const parsed = dcUrl.parse(url);
    
    return parsed.protocol === 'http:' &&
           parsed.hostname === 'example.com' &&
           !parsed.port &&
           parsed.pathname === '/path' &&
           parsed.search === '?query=value';
  });

  test('parse: 解析带用户信息的URL', () => {
    const url = 'https://username:password@example.com';
    const parsed = dcUrl.parse(url);
    
    return parsed.protocol === 'https:' &&
           parsed.auth === 'username:password' &&
           parsed.hostname === 'example.com';
  });

  test('parse: 解析相对路径', () => {
    const url = '/path/to/resource';
    const parsed = dcUrl.parse(url);
    
    return !parsed.protocol &&
           !parsed.hostname &&
           parsed.pathname === '/path/to/resource';
  });

  test('parse: 解析空字符串', () => {
    const parsed = dcUrl.parse('');
    
    return !parsed.protocol &&
           !parsed.hostname &&
           !parsed.pathname &&
           !parsed.search &&
           !parsed.hash;
  });

  test('parse: 解析无效URL', () => {
    const parsed = dcUrl.parse('invalid-url');
    
    return !parsed.hostname &&
           !parsed.pathname;
  });

  // URL构建测试
  test('build: 构建完整URL', () => {
    const parts = {
      protocol: 'https:',
      auth: 'username:password',
      hostname: 'www.example.com',
      port: '8080',
      pathname: '/path/to/page',
      search: '?param1=value1&param2=value2',
      hash: '#section'
    };
    
    const built = dcUrl.build(parts);
    const expected = 'https://username:password@www.example.com:8080/path/to/page?param1=value1&param2=value2#section';
    
    return built === expected;
  });

  test('build: 构建简单URL', () => {
    const parts = {
      protocol: 'http:',
      hostname: 'example.com',
      pathname: '/home'
    };
    
    const built = dcUrl.build(parts);
    const expected = 'http://example.com/home';
    
    return built === expected;
  });

  test('build: 构建无协议URL', () => {
    const parts = {
      hostname: 'example.com',
      pathname: '/path'
    };
    
    const built = dcUrl.build(parts);
    const expected = '//example.com/path';
    
    return built === expected;
  });

  test('build: 构建相对路径', () => {
    const parts = {
      pathname: '/relative/path'
    };
    
    const built = dcUrl.build(parts);
    const expected = '/relative/path';
    
    return built === expected;
  });

  // 查询参数处理测试
  test('getQueryParams: 解析查询参数', () => {
    const url = 'https://example.com/page?name=John&age=30&city=New+York';
    const params = dcUrl.getQueryParams(url);
    
    return params.name === 'John' &&
           params.age === '30' &&
           params.city === 'New York';
  });

  test('getQueryParams: 处理重复参数', () => {
    const url = 'https://example.com/page?tag=javascript&tag=typescript&tag=react';
    const params = dcUrl.getQueryParams(url);
    
    // 假设我们只取第一个值或返回数组
    return Array.isArray(params.tag) ? 
           (params.tag.length === 3 && params.tag[0] === 'javascript') : 
           params.tag === 'javascript';
  });

  test('getQueryParams: 处理空查询字符串', () => {
    const url = 'https://example.com/page';
    const params = dcUrl.getQueryParams(url);
    
    return Object.keys(params).length === 0;
  });

  test('getQueryParams: 处理特殊字符', () => {
    const url = 'https://example.com/page?special=%21%40%23%24%25%5E%26%2A';
    const params = dcUrl.getQueryParams(url);
    
    return params.special === '!@#$%^&*';
  });

  // 参数添加和修改测试
  test('addQueryParam: 添加新参数', () => {
    const url = 'https://example.com/page?existing=value';
    const newUrl = dcUrl.addQueryParam(url, 'newParam', 'newValue');
    const expected = 'https://example.com/page?existing=value&newParam=newValue';
    
    return newUrl === expected;
  });

  test('addQueryParam: 修改现有参数', () => {
    const url = 'https://example.com/page?existing=value';
    const newUrl = dcUrl.addQueryParam(url, 'existing', 'newValue');
    const expected = 'https://example.com/page?existing=newValue';
    
    return newUrl === expected;
  });

  test('addQueryParam: 处理特殊字符', () => {
    const url = 'https://example.com/page';
    const newUrl = dcUrl.addQueryParam(url, 'param', 'value with spaces & special chars!');
    const expected = 'https://example.com/page?param=value%20with%20spaces%20%26%20special%20chars%21';
    
    return newUrl === expected;
  });

  // 边界情况测试
  test('parse: 解析仅协议的URL', () => {
    const url = 'https:';
    const parsed = dcUrl.parse(url);
    
    return parsed.protocol === 'https:' &&
           !parsed.hostname &&
           !parsed.pathname;
  });

  test('parse: 解析仅主机名的URL', () => {
    const url = 'example.com';
    const parsed = dcUrl.parse(url);
    
    return parsed.hostname === 'example.com';
  });

  test('build: 空部件对象', () => {
    const built = dcUrl.build({});
    
    return built === '';
  });

  test('build: 只有搜索参数', () => {
    const parts = {
      search: '?param=value'
    };
    
    const built = dcUrl.build(parts);
    const expected = '?param=value';
    
    return built === expected;
  });

  test('build: 只有哈希', () => {
    const parts = {
      hash: '#section'
    };
    
    const built = dcUrl.build(parts);
    const expected = '#section';
    
    return built === expected;
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}