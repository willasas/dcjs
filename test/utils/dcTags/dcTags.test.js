/**
 * dcTags 测试文件
 * 测试标签管理工具的所有主要功能
 */

// 加载 dcTags
if (typeof window === 'undefined') {
    // Node.js 环境
    const DC = {};
    require('../../../src/utils/dcTags.js');
    global.DC = DC;
}

// 测试函数
function runTests() {
    console.log('开始测试 dcTags...');
    console.log('===================================');

    // 初始化 Tags
    const tags = new DC.Tags();
    let passedTests = 0;
    let totalTests = 0;

    // 测试添加单个标签
    console.log('\n1. 测试添加单个标签：');
    console.log('------------------------');

    try {
        tags.addTag('JavaScript', {
            color: '#f59e0b',
            description: 'JavaScript 相关内容'
        });
        passedTests++;
        totalTests++;
        console.log('✓ 添加单个标签测试 - 通过');
        console.log(`  标签名称: JavaScript`);
        console.log(`  标签颜色: #f59e0b`);
    } catch (error) {
        totalTests++;
        console.log('✗ 添加单个标签测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试获取标签
    console.log('2. 测试获取标签：');
    console.log('------------------------');

    try {
        const tag = tags.getTag('JavaScript');
        totalTests++;
        if (tag && tag.name === 'JavaScript' && tag.color === '#f59e0b') {
            passedTests++;
            console.log('✓ 获取标签测试 - 通过');
            console.log(`  标签名称: ${tag.name}`);
            console.log(`  标签颜色: ${tag.color}`);
        } else {
            console.log('✗ 获取标签测试 - 失败');
            console.log(`  期望: 名称=JavaScript, 颜色=#f59e0b`);
            console.log(`  实际: 名称=${tag?.name}, 颜色=${tag?.color}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 获取标签测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试批量添加标签
    console.log('3. 测试批量添加标签：');
    console.log('------------------------');

    try {
        tags.addTags([
            'Python',
            {
                name: 'React',
                color: '#61dafb',
                description: 'React 相关内容'
            },
            {
                name: 'Node.js',
                color: '#339933',
                description: 'Node.js 相关内容'
            }
        ]);
        const allTags = tags.getAllTags();
        totalTests++;
        if (allTags.length === 4) { // JavaScript + 3 个新标签
            passedTests++;
            console.log('✓ 批量添加标签测试 - 通过');
            console.log(`  期望标签数: 4`);
            console.log(`  实际标签数: ${allTags.length}`);
            console.log(`  标签列表: ${allTags.map(tag => tag.name).join(', ')}`);
        } else {
            console.log('✗ 批量添加标签测试 - 失败');
            console.log(`  期望标签数: 4`);
            console.log(`  实际标签数: ${allTags.length}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 批量添加标签测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试检查标签是否存在
    console.log('4. 测试检查标签是否存在：');
    console.log('------------------------');

    try {
        const exists = tags.hasTag('JavaScript');
        const notExists = tags.hasTag('PHP');
        totalTests++;
        if (exists && !notExists) {
            passedTests++;
            console.log('✓ 检查标签是否存在测试 - 通过');
            console.log(`  标签 "JavaScript" 存在: ${exists}`);
            console.log(`  标签 "PHP" 存在: ${notExists}`);
        } else {
            console.log('✗ 检查标签是否存在测试 - 失败');
            console.log(`  标签 "JavaScript" 存在: ${exists}`);
            console.log(`  标签 "PHP" 存在: ${notExists}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 检查标签是否存在测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试为项目添加标签
    console.log('5. 测试为项目添加标签：');
    console.log('------------------------');

    try {
        tags.addTagsToItem('item1', 'JavaScript');
        tags.addTagsToItem('item1', ['React', 'Node.js']);
        tags.addTagsToItem('item2', ['JavaScript', 'Python']);
        const item1Tags = tags.getItemTags('item1');
        const item2Tags = tags.getItemTags('item2');
        totalTests++;
        if (item1Tags.length === 3 && item2Tags.length === 2) {
            passedTests++;
            console.log('✓ 为项目添加标签测试 - 通过');
            console.log(`  item1 标签数: ${item1Tags.length}`);
            console.log(`  item1 标签: ${item1Tags.join(', ')}`);
            console.log(`  item2 标签数: ${item2Tags.length}`);
            console.log(`  item2 标签: ${item2Tags.join(', ')}`);
        } else {
            console.log('✗ 为项目添加标签测试 - 失败');
            console.log(`  item1 期望标签数: 3, 实际: ${item1Tags.length}`);
            console.log(`  item2 期望标签数: 2, 实际: ${item2Tags.length}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 为项目添加标签测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试从项目中删除标签
    console.log('6. 测试从项目中删除标签：');
    console.log('------------------------');

    try {
        tags.removeTagsFromItem('item1', 'React');
        const item1Tags = tags.getItemTags('item1');
        totalTests++;
        if (item1Tags.length === 2 && !item1Tags.includes('React')) {
            passedTests++;
            console.log('✓ 从项目中删除标签测试 - 通过');
            console.log(`  item1 期望标签数: 2`);
            console.log(`  item1 实际标签数: ${item1Tags.length}`);
            console.log(`  item1 标签: ${item1Tags.join(', ')}`);
        } else {
            console.log('✗ 从项目中删除标签测试 - 失败');
            console.log(`  item1 期望标签数: 2, 实际: ${item1Tags.length}`);
            console.log(`  item1 标签: ${item1Tags.join(', ')}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 从项目中删除标签测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试替换项目标签
    console.log('7. 测试替换项目标签：');
    console.log('------------------------');

    try {
        tags.setItemTags('item1', ['Python', 'React']);
        const item1Tags = tags.getItemTags('item1');
        totalTests++;
        if (item1Tags.length === 2 && item1Tags.includes('Python') && item1Tags.includes('React')) {
            passedTests++;
            console.log('✓ 替换项目标签测试 - 通过');
            console.log(`  item1 期望标签数: 2`);
            console.log(`  item1 实际标签数: ${item1Tags.length}`);
            console.log(`  item1 标签: ${item1Tags.join(', ')}`);
        } else {
            console.log('✗ 替换项目标签测试 - 失败');
            console.log(`  item1 期望标签数: 2, 实际: ${item1Tags.length}`);
            console.log(`  item1 标签: ${item1Tags.join(', ')}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 替换项目标签测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试获取项目标签详情
    console.log('8. 测试获取项目标签详情：');
    console.log('------------------------');

    try {
        const item1TagDetails = tags.getItemTagDetails('item1');
        totalTests++;
        if (item1TagDetails.length === 2) {
            passedTests++;
            console.log('✓ 获取项目标签详情测试 - 通过');
            console.log(`  item1 标签详情数: ${item1TagDetails.length}`);
            item1TagDetails.forEach(tag => {
                console.log(`  - ${tag.name} (${tag.color})`);
            });
        } else {
            console.log('✗ 获取项目标签详情测试 - 失败');
            console.log(`  期望详情数: 2, 实际: ${item1TagDetails.length}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 获取项目标签详情测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试搜索标签
    console.log('9. 测试搜索标签：');
    console.log('------------------------');

    try {
        const results = tags.searchTags('Java');
        totalTests++;
        if (results.length > 0 && results.some(tag => tag.name === 'JavaScript')) {
            passedTests++;
            console.log('✓ 搜索标签测试 - 通过');
            console.log(`  搜索关键词: "Java"`);
            console.log(`  结果数: ${results.length}`);
            console.log(`  结果: ${results.map(tag => tag.name).join(', ')}`);
        } else {
            console.log('✗ 搜索标签测试 - 失败');
            console.log(`  搜索关键词: "Java"`);
            console.log(`  结果数: ${results.length}`);
            console.log(`  结果: ${results.map(tag => tag.name).join(', ')}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 搜索标签测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试按标签获取项目
    console.log('10. 测试按标签获取项目：');
    console.log('------------------------');

    try {
        const javaScriptItems = tags.getItemsByTag('JavaScript');
        totalTests++;
        if (javaScriptItems.length === 1 && javaScriptItems.includes('item2')) {
            passedTests++;
            console.log('✓ 按标签获取项目测试 - 通过');
            console.log(`  标签: "JavaScript"`);
            console.log(`  项目数: ${javaScriptItems.length}`);
            console.log(`  项目: ${javaScriptItems.join(', ')}`);
        } else {
            console.log('✗ 按标签获取项目测试 - 失败');
            console.log(`  标签: "JavaScript"`);
            console.log(`  期望项目数: 1, 实际: ${javaScriptItems.length}`);
            console.log(`  项目: ${javaScriptItems.join(', ')}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 按标签获取项目测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试获取标签统计
    console.log('11. 测试获取标签统计：');
    console.log('------------------------');

    try {
        const stats = tags.getTagStats();
        totalTests++;
        if (Array.isArray(stats) && stats.length > 0) {
            passedTests++;
            console.log('✓ 获取标签统计测试 - 通过');
            console.log(`  统计标签数: ${stats.length}`);
            stats.forEach(stat => {
                console.log(`  - ${stat.name}: 使用 ${stat.count} 次`);
            });
        } else {
            console.log('✗ 获取标签统计测试 - 失败');
            console.log(`  期望: 非空数组`);
            console.log(`  实际: ${stats.length} 个统计项`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 获取标签统计测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试导出数据
    console.log('12. 测试导出数据：');
    console.log('------------------------');

    try {
        const data = tags.exportData();
        totalTests++;
        if (data && Array.isArray(data.tags) && Array.isArray(data.itemTags)) {
            passedTests++;
            console.log('✓ 导出数据测试 - 通过');
            console.log(`  导出标签数: ${data.tags.length}`);
            console.log(`  导出项目标签关联数: ${data.itemTags.length}`);
        } else {
            console.log('✗ 导出数据测试 - 失败');
            console.log(`  导出数据缺少必要字段`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 导出数据测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试导入数据
    console.log('13. 测试导入数据：');
    console.log('------------------------');

    try {
        // 先导出数据
        const exportData = tags.exportData();

        // 清除所有标签
        tags.clear();

        // 导入数据
        tags.importData(exportData);

        const allTags = tags.getAllTags();
        const item1Tags = tags.getItemTags('item1');
        totalTests++;
        if (allTags.length > 0 && item1Tags.length > 0) {
            passedTests++;
            console.log('✓ 导入数据测试 - 通过');
            console.log(`  导入后标签数: ${allTags.length}`);
            console.log(`  item1 标签数: ${item1Tags.length}`);
        } else {
            console.log('✗ 导入数据测试 - 失败');
            console.log(`  导入后标签数: ${allTags.length}`);
            console.log(`  item1 标签数: ${item1Tags.length}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 导入数据测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试删除标签
    console.log('14. 测试删除标签：');
    console.log('------------------------');

    try {
        const deleted = tags.removeTag('JavaScript');
        const exists = tags.hasTag('JavaScript');
        totalTests++;
        if (deleted && !exists) {
            passedTests++;
            console.log('✓ 删除标签测试 - 通过');
            console.log(`  删除结果: ${deleted}`);
            console.log(`  标签是否存在: ${exists}`);
        } else {
            console.log('✗ 删除标签测试 - 失败');
            console.log(`  删除结果: ${deleted}`);
            console.log(`  标签是否存在: ${exists}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 删除标签测试 - 失败');
        console.log(`  错误: ${error.message}`);
    }
    console.log('');

    // 测试清除所有标签
    console.log('15. 测试清除所有标签：');
    console.log('------------------------');

    try {
        tags.clear();
        const allTags = tags.getAllTags();
        const item1Tags = tags.getItemTags('item1');
        totalTests++;
        if (allTags.length === 0 && item1Tags.length === 0) {
            passedTests++;
            console.log('✓ 清除所有标签测试 - 通过');
            console.log(`  清除后标签数: ${allTags.length}`);
            console.log(`  item1 标签数: ${item1Tags.length}`);
        } else {
            console.log('✗ 清除所有标签测试 - 失败');
            console.log(`  清除后标签数: ${allTags.length}`);
            console.log(`  item1 标签数: ${item1Tags.length}`);
        }
    } catch (error) {
        totalTests++;
        console.log('✗ 清除所有标签测试 - 失败');
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
    window.runDcTagsTests = runTests;
    console.log('dcTags 测试已加载，运行 runDcTagsTests() 开始测试');
} else {
    // Node.js 环境
    runTests();
}

// 导出测试函数（用于 Node.js 环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runTests };
}