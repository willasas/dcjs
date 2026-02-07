/**
 * dcSearch 测试文件
 * 测试搜索工具的所有主要功能
 */

// 加载 dcSearch
if (typeof window === 'undefined') {
    // Node.js 环境
    const DC = {};
    require('../../../src/utils/dcSearch.js');
    global.DC = DC;
}

// 测试数据
const testData = [
    {
        id: 1,
        title: 'JavaScript 基础教程',
        content: '这是一本关于 JavaScript 基础知识的教程，涵盖变量、函数、对象、数组等核心概念。',
        description: 'JavaScript 入门指南'
    },
    {
        id: 2,
        title: 'Python 进阶指南',
        content: 'Python 高级特性和最佳实践，包括装饰器、生成器、上下文管理器等。',
        description: 'Python 高级编程技巧'
    },
    {
        id: 3,
        title: 'React 组件开发',
        content: 'React 组件设计和开发技巧，包括状态管理、生命周期、Hooks 等。',
        description: 'React 前端开发'
    },
    {
        id: 4,
        title: 'Node.js 后端开发',
        content: '使用 Node.js 构建高性能后端服务，包括 Express 框架、MongoDB 数据库等。',
        description: 'Node.js 服务端编程'
    },
    {
        id: 5,
        title: 'CSS 布局技巧',
        content: '现代 CSS 布局技术，包括 Flexbox、Grid、响应式设计等。',
        description: 'CSS 前端样式'
    }
];

// 测试用例
const testCases = [
    {
        name: '基本搜索测试',
        query: 'JavaScript',
        expectedCount: 1
    },
    {
        name: '部分匹配搜索测试',
        query: 'Java',
        expectedCount: 1
    },
    {
        name: '多结果搜索测试',
        query: '前端',
        expectedCount: 2 // React 和 CSS
    },
    {
        name: '无结果搜索测试',
        query: 'PHP',
        expectedCount: 0
    },
    {
        name: '搜索建议测试',
        query: 'J',
        expectedContains: ['JavaScript', 'Java']
    }
];

// 测试函数
function runTests() {
    console.log('开始测试 dcSearch...');
    console.log('===================================');
    
    // 初始化 Search
    const search = new DC.Search();
    let passedTests = 0;
    let totalTests = 0;
    
    // 测试索引创建
    console.log('\n1. 测试索引创建：');
    console.log('------------------------');
    
    try {
        search.createIndex('documents', testData, {
            fields: ['title', 'content', 'description']
        });
        passedTests++;
        totalTests++;
        console.log('✓ 索引创建测试 - 通过');
        console.log(`  索引名称: documents`);
        console.log(`  数据项数: ${testData.length}`);
    } catch (error) {
        totalTests++;
        console.log('✗ 索引创建测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');
    
    // 测试索引信息获取
    console.log('2. 测试索引信息获取：');
    console.log('------------------------');
    
    try {
        const info = search.getIndexInfo('documents');
        totalTests++;
        if (info && info.name === 'documents' && info.itemCount === testData.length) {
            passedTests++;
            console.log('✓ 索引信息获取测试 - 通过');
            console.log(`  索引名称: ${info.name}`);
            console.log(`  项目数量: ${info.itemCount}`);
            console.log(`  索引字段: ${info.fields.join(', ')}`);
        } else {
            console.log('✗ 索引信息获取测试 - 失败');
            console.log(`  期望: 名称=documents, 项目数量=${testData.length}`);
            console.log(`  实际: 名称=${info?.name}, 项目数量=${info?.itemCount}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 索引信息获取测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');
    
    // 测试搜索功能
    console.log('3. 测试搜索功能：');
    console.log('------------------------');
    
    testCases.forEach(testCase => {
        totalTests++;
        try {
            const results = search.search('documents', testCase.query);
            
            if (testCase.expectedCount !== undefined) {
                if (results.length === testCase.expectedCount) {
                    passedTests++;
                    console.log(`✓ ${testCase.name} - 通过`);
                    console.log(`  查询: "${testCase.query}"`);
                    console.log(`  期望结果数: ${testCase.expectedCount}`);
                    console.log(`  实际结果数: ${results.length}`);
                } else {
                    console.log(`✗ ${testCase.name} - 失败`);
                    console.log(`  查询: "${testCase.query}"`);
                    console.log(`  期望结果数: ${testCase.expectedCount}`);
                    console.log(`  实际结果数: ${results.length}`);
                }
            } else if (testCase.expectedContains) {
                const hasExpectedResults = testCase.expectedContains.some(expected => 
                    results.some(result => 
                        result.title.includes(expected) || 
                        result.content.includes(expected) || 
                        result.description.includes(expected)
                    )
                );
                
                if (hasExpectedResults) {
                    passedTests++;
                    console.log(`✓ ${testCase.name} - 通过`);
                    console.log(`  查询: "${testCase.query}"`);
                    console.log(`  期望包含: ${testCase.expectedContains.join(', ')}`);
                    console.log(`  实际结果: ${results.map(r => r.title).join(', ')}`);
                } else {
                    console.log(`✗ ${testCase.name} - 失败`);
                    console.log(`  查询: "${testCase.query}"`);
                    console.log(`  期望包含: ${testCase.expectedContains.join(', ')}`);
                    console.log(`  实际结果: ${results.map(r => r.title).join(', ')}`);
                }
            }
        } catch (error) {
            console.log(`✗ ${testCase.name} - 失败`);
            console.log(`  查询: "${testCase.query}"`);
            console.log(`  错误: ${error.message}`);
        }
        console.log('');
    });
    
    // 测试搜索建议
    console.log('4. 测试搜索建议功能：');
    console.log('------------------------');
    
    try {
        const suggestions = search.getSuggestions('documents', 'J');
        totalTests++;
        if (Array.isArray(suggestions) && suggestions.length > 0) {
            passedTests++;
            console.log('✓ 搜索建议测试 - 通过');
            console.log(`  查询前缀: "J"`);
            console.log(`  建议结果: ${suggestions.join(', ')}`);
        } else {
            console.log('✗ 搜索建议测试 - 失败');
            console.log(`  查询前缀: "J"`);
            console.log(`  期望: 非空数组`);
            console.log(`  实际: ${suggestions.length} 个建议`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 搜索建议测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');
    
    // 测试搜索选项
    console.log('5. 测试搜索选项功能：');
    console.log('------------------------');
    
    try {
        const results = search.search('documents', '前端', {
            limit: 1
        });
        totalTests++;
        if (results.length === 1) {
            passedTests++;
            console.log('✓ 搜索选项测试 - 通过');
            console.log(`  查询: "前端"`);
            console.log(`  限制结果数: 1`);
            console.log(`  实际结果数: ${results.length}`);
        } else {
            console.log('✗ 搜索选项测试 - 失败');
            console.log(`  查询: "前端"`);
            console.log(`  限制结果数: 1`);
            console.log(`  实际结果数: ${results.length}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 搜索选项测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');
    
    // 测试删除索引
    console.log('6. 测试删除索引功能：');
    console.log('------------------------');
    
    try {
        const deleted = search.deleteIndex('documents');
        totalTests++;
        if (deleted) {
            passedTests++;
            console.log('✓ 删除索引测试 - 通过');
            console.log(`  索引名称: documents`);
            console.log(`  删除结果: 成功`);
        } else {
            console.log('✗ 删除索引测试 - 失败');
            console.log(`  索引名称: documents`);
            console.log(`  删除结果: 失败`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 删除索引测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');
    
    // 测试静态搜索方法
    console.log('7. 测试静态搜索方法：');
    console.log('------------------------');
    
    try {
        const results = DC.Search.search(testData, 'JavaScript');
        totalTests++;
        if (results.length > 0) {
            passedTests++;
            console.log('✓ 静态搜索方法测试 - 通过');
            console.log(`  查询: "JavaScript"`);
            console.log(`  结果数: ${results.length}`);
            console.log(`  结果: ${results.map(r => r.title).join(', ')}`);
        } else {
            console.log('✗ 静态搜索方法测试 - 失败');
            console.log(`  查询: "JavaScript"`);
            console.log(`  期望: 至少一个结果`);
            console.log(`  实际: ${results.length} 个结果`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 静态搜索方法测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');
    
    // 测试清除所有索引
    console.log('8. 测试清除所有索引功能：');
    console.log('------------------------');
    
    try {
        // 先重新创建索引
        search.createIndex('documents1', testData);
        search.createIndex('documents2', testData);
        
        // 清除所有索引
        const result = search.clearAllIndexes();
        totalTests++;
        if (result) {
            passedTests++;
            console.log('✓ 清除所有索引测试 - 通过');
            console.log(`  操作结果: 成功`);
        } else {
            console.log('✗ 清除所有索引测试 - 失败');
            console.log(`  操作结果: 失败`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 清除所有索引测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');
    
    // 输出测试结果
    console.log('===================================');
    console.log(`测试完成: ${passedTests}/${totalTests} 个测试通过`);
    console.log('===================================');
    
    if (passedTests === totalTests) {
        console.log('🎉 所有测试通过！');
        return true;
    } else {
        console.log('❌ 部分测试失败！');
        return false;
    }
}

// 运行测试
if (typeof window !== 'undefined') {
    // 浏览器环境
    window.runDcSearchTests = runTests;
    console.log('dcSearch 测试已加载，运行 runDcSearchTests() 开始测试');
} else {
    // Node.js 环境
    runTests();
}

// 导出测试函数（用于 Node.js 环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runTests };
}