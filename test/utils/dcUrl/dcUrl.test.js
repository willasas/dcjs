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
           parsed.host === 'www.example.com:8080' &&
           parsed.pathname === '/path/to/page' &&
           parsed.search === '?param1=value1&param2=value2' &&
           parsed.hash === '#section';
  });

  test('parse: 解析HTTP URL', () => {
    const url = 'http://example.com/path?query=value';
    const parsed = dcUrl.parse(url);
    
    return parsed.protocol === 'http:' &&
           parsed.host === 'example.com' &&
           parsed.pathname === '/path' &&
           parsed.search === '?query=value';
  });

  test('parse: 解析无效URL', () => {
    const parsed = dcUrl.parse('invalid-url');
    
    return parsed === null;
  });

  // 查询字符串解析测试
  test('parseQuery: 解析查询字符串', () => {
    const queryString = 'name=John&age=30&city=New+York';
    const params = dcUrl.parseQuery(queryString);
    
    return params.name === 'John' &&
           params.age === '30' &&
           params.city === 'New York';
  });

  test('parseQuery: 处理重复参数', () => {
    const queryString = 'tag=javascript&tag=typescript&tag=react';
    const params = dcUrl.parseQuery(queryString);
    
    return Array.isArray(params.tag) && params.tag.length === 3 && params.tag[0] === 'javascript';
  });

  test('parseQuery: 处理空查询字符串', () => {
    const params = dcUrl.parseQuery('');
    
    return Object.keys(params).length === 0;
  });

  test('parseQuery: 处理特殊字符', () => {
    const queryString = 'special=%21%40%23%24%25%5E%26%2A';
    const params = dcUrl.parseQuery(queryString);
    
    return params.special === '!@#$%^&*';
  });

  // URL构建测试
  test('build: 构建完整URL', () => {
    const options = {
      protocol: 'https',
      host: 'www.example.com',
      path: '/path/to/page'
    };
    
    const built = dcUrl.build(options);
    const expected = 'https://www.example.com/path/to/page';
    
    return built === expected;
  });

  test('build: 构建带路径的URL', () => {
    const options = {
      protocol: 'http',
      host: 'example.com',
      path: '/home'
    };
    
    const built = dcUrl.build(options);
    const expected = 'http://example.com/home';
    
    return built === expected;
  });

  test('build: 构建无路径的URL', () => {
    const options = {
      protocol: 'https',
      host: 'example.com'
    };
    
    const built = dcUrl.build(options);
    const expected = 'https://example.com';
    
    return built === expected;
  });

  test('build: 缺少必需参数', () => {
    try {
      dcUrl.build({ protocol: 'https' });
      return false;
    } catch (error) {
      return error.message === 'Protocol and host are required to build a URL';
    }
  });

  // URL参数测试
  test('getParam: 获取URL参数', () => {
    const url = 'https://example.com/page?name=John&age=30';
    const name = dcUrl.getParam('name', url);
    const age = dcUrl.getParam('age', url);
    const nonexistent = dcUrl.getParam('nonexistent', url);
    
    return name === 'John' && age === '30' && nonexistent === null;
  });

  test('getParams: 获取所有URL参数', () => {
    const url = 'https://example.com/page?name=John&age=30&hobbies=reading&hobbies=coding';
    const params = dcUrl.getParams(url);
    
    return params.name === 'John' && params.age === '30' && Array.isArray(params.hobbies) && params.hobbies.length === 2;
  });

  test('updateParams: 更新URL参数', () => {
    const url = 'https://example.com/page?name=John&age=30';
    const newUrl = dcUrl.updateParams(url, { age: '31', city: 'New York' });
    
    return newUrl.includes('age=31') && newUrl.includes('city=New%20York');
  });

  test('updateParams: 删除URL参数', () => {
    const url = 'https://example.com/page?name=John&age=30';
    const newUrl = dcUrl.updateParams(url, { age: null });
    
    return newUrl === 'https://example.com/page?name=John';
  });

  test('removeParams: 删除URL参数', () => {
    const url = 'https://example.com/page?name=John&age=30&city=New%20York';
    const newUrl = dcUrl.removeParams(url, 'age');
    
    return newUrl === 'https://example.com/page?name=John&city=New%20York';
  });

  test('removeParams: 删除多个URL参数', () => {
    const url = 'https://example.com/page?name=John&age=30&city=New%20York';
    const newUrl = dcUrl.removeParams(url, ['age', 'city']);
    
    return newUrl === 'https://example.com/page?name=John';
  });

  // 文件扩展名测试
  test('getExtension: 获取文件扩展名', () => {
    const url = 'https://example.com/image.jpg';
    const extension = dcUrl.getExtension(url);
    
    return extension === 'jpg';
  });

  test('getExtension: 无文件扩展名', () => {
    const url = 'https://example.com/page';
    const extension = dcUrl.getExtension(url);
    
    return extension === '';
  });

  test('getExtension: 无效URL', () => {
    const extension = dcUrl.getExtension('invalid-url');
    
    return extension === '';
  });

  // 绝对路径检查测试
  test('isAbsolute: 检查绝对路径', () => {
    const url1 = 'https://example.com';
    const url2 = 'http://example.com/path';
    const url3 = '/path';
    const url4 = 'relative/path';
    
    return dcUrl.isAbsolute(url1) && dcUrl.isAbsolute(url2) && !dcUrl.isAbsolute(url3) && !dcUrl.isAbsolute(url4);
  });

  // 路径合并测试
  test('join: 合并路径', () => {
    const result = dcUrl.join('https://example.com', 'path', 'to', 'resource');
    const expected = 'https://example.com/path/to/resource';
    
    return result === expected;
  });

  test('join: 合并带斜杠的路径', () => {
    const result = dcUrl.join('https://example.com/', '/path/', '/to/', '/resource/');
    const expected = 'https://example.com/path/to/resource';
    
    return result === expected;
  });

  // URL标准化测试
  test('normalize: 标准化URL', () => {
    const url = 'https://example.com/path/../page';
    const normalized = dcUrl.normalize(url);
    
    return normalized === 'https://example.com/page';
  });

  test('normalize: 无效URL', () => {
    const url = 'invalid-url';
    const normalized = dcUrl.normalize(url);
    
    return normalized === 'invalid-url';
  });

  // URL验证测试
  test('isValid: 验证有效URL', () => {
    const url = 'https://example.com';
    return dcUrl.isValid(url);
  });

  test('isValid: 验证无效URL', () => {
    const url = 'invalid-url';
    return !dcUrl.isValid(url);
  });

  // 域名获取测试
  test('getDomain: 获取域名', () => {
    const url = 'https://subdomain.example.com/path';
    const domain = dcUrl.getDomain(url);
    
    return domain === 'subdomain.example.com';
  });

  test('getDomain: 无效URL', () => {
    const domain = dcUrl.getDomain('invalid-url');
    
    return domain === '';
  });

  // 相对路径测试
  test('getRelativePath: 获取相对路径', () => {
    const from = '/path/to/source';
    const to = '/path/to/target/file.html';
    const relativePath = dcUrl.getRelativePath(from, to);
    
    return relativePath === '../target/file.html';
  });

  test('getRelativePath: 相同路径', () => {
    const from = '/path/to/file';
    const to = '/path/to/file';
    const relativePath = dcUrl.getRelativePath(from, to);
    
    return relativePath === '';
  });

  console.log(`\n测试结果: ${passedTests}/${totalTests} 通过`);
  return passedTests === totalTests;
}

if (require.main === module) {
  runTests();
}