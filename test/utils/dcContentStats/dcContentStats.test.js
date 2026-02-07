/**
 * dcContentStats 测试文件
 * 测试文本分析工具的所有主要功能
 */

// 加载 dcContentStats
if (typeof window === 'undefined') {
    // Node.js 环境
    const DC = {};
    require('../../../src/utils/dcContentStats.js');
    global.DC = DC;
}

// 测试用例
const testCases = [
    {
        name: '基本统计测试',
        text: 'Hello, world! This is a test sentence.',
        expected: {
            words: 7,
            sentences: 2,
            paragraphs: 1
        }
    },
    {
        name: '多行文本测试',
        text: 'Hello world.\n\nThis is a new paragraph.',
        expected: {
            words: 7,
            sentences: 2,
            paragraphs: 2
        }
    },
    {
        name: '空文本测试',
        text: '',
        expected: {
            words: 0,
            sentences: 0,
            paragraphs: 0
        }
    },
    {
        name: '只有空格的文本测试',
        text: '   \n   \n   ',
        expected: {
            words: 0,
            sentences: 0,
            paragraphs: 3
        }
    }
];

// 测试函数
function runTests() {
    console.log('开始测试 dcContentStats...');
    console.log('===================================');
    
    // 初始化 ContentStats
    const stats = new DC.ContentStats();
    let passedTests = 0;
    let totalTests = 0;
    
    // 测试基本统计功能
    console.log('\n1. 测试基本统计功能：');
    console.log('------------------------');
    
    testCases.forEach(testCase => {
        totalTests++;
        const result = stats.analyze(testCase.text);
        const passed = 
            result.words === testCase.expected.words &&
            result.sentences === testCase.expected.sentences &&
            result.paragraphs === testCase.expected.paragraphs;
        
        if (passed) {
            passedTests++;
            console.log(`✓ ${testCase.name} - 通过`);
            console.log(`  文本: "${testCase.text.replace(/\n/g, '\\n')}"`);
            console.log(`  期望: 单词=${testCase.expected.words}, 句子=${testCase.expected.sentences}, 段落=${testCase.expected.paragraphs}`);
            console.log(`  实际: 单词=${result.words}, 句子=${result.sentences}, 段落=${result.paragraphs}`);
        } else {
            console.log(`✗ ${testCase.name} - 失败`);
            console.log(`  文本: "${testCase.text.replace(/\n/g, '\\n')}"`);
            console.log(`  期望: 单词=${testCase.expected.words}, 句子=${testCase.expected.sentences}, 段落=${testCase.expected.paragraphs}`);
            console.log(`  实际: 单词=${result.words}, 句子=${result.sentences}, 段落=${result.paragraphs}`);
        }
        console.log('');
    });
    
    // 测试字符统计功能
    console.log('2. 测试字符统计功能：');
    console.log('------------------------');
    
    const charTestText = 'Hello, world!';
    const charResult = stats.analyze(charTestText);
    const expectedTotalChars = 13; // 包括标点和空格
    const expectedCharsWithoutSpaces = 11; // 不包括空格
    
    totalTests++;
    if (charResult.totalCharacters === expectedTotalChars && charResult.charactersWithoutSpaces === expectedCharsWithoutSpaces) {
        passedTests++;
        console.log('✓ 字符统计测试 - 通过');
        console.log(`  文本: "${charTestText}"`);
        console.log(`  期望: 总字符数=${expectedTotalChars}, 不含空格字符数=${expectedCharsWithoutSpaces}`);
        console.log(`  实际: 总字符数=${charResult.totalCharacters}, 不含空格字符数=${charResult.charactersWithoutSpaces}`);
    } else {
        console.log('✗ 字符统计测试 - 失败');
        console.log(`  文本: "${charTestText}"`);
        console.log(`  期望: 总字符数=${expectedTotalChars}, 不含空格字符数=${expectedCharsWithoutSpaces}`);
        console.log(`  实际: 总字符数=${charResult.totalCharacters}, 不含空格字符数=${charResult.charactersWithoutSpaces}`);
    }
    console.log('');
    
    // 测试单词频率功能
    console.log('3. 测试单词频率功能：');
    console.log('------------------------');
    
    const freqTestText = 'Hello world. Hello test. Hello world.';
    const freqResult = stats.analyze(freqTestText);
    const helloFreq = freqResult.wordFrequency.find(item => item.word === 'hello');
    const worldFreq = freqResult.wordFrequency.find(item => item.word === 'world');
    
    totalTests++;
    if (helloFreq && helloFreq.count === 3 && worldFreq && worldFreq.count === 2) {
        passedTests++;
        console.log('✓ 单词频率测试 - 通过');
        console.log(`  文本: "${freqTestText}"`);
        console.log(`  期望: hello=3, world=2`);
        console.log(`  实际: hello=${helloFreq.count}, world=${worldFreq.count}`);
    } else {
        console.log('✗ 单词频率测试 - 失败');
        console.log(`  文本: "${freqTestText}"`);
        console.log(`  期望: hello=3, world=2`);
        console.log(`  实际: hello=${helloFreq ? helloFreq.count : 0}, world=${worldFreq ? worldFreq.count : 0}`);
    }
    console.log('');
    
    // 测试平均长度功能
    console.log('4. 测试平均长度功能：');
    console.log('------------------------');
    
    const avgTestText = 'Hello world test';
    const avgResult = stats.analyze(avgTestText);
    const expectedAvgWordLength = (5 + 5 + 4) / 3; // (Hello + world + test) / 3
    
    totalTests++;
    if (Math.abs(avgResult.averageWordLength - expectedAvgWordLength) < 0.01) {
        passedTests++;
        console.log('✓ 平均单词长度测试 - 通过');
        console.log(`  文本: "${avgTestText}"`);
        console.log(`  期望: ${expectedAvgWordLength.toFixed(2)}`);
        console.log(`  实际: ${avgResult.averageWordLength.toFixed(2)}`);
    } else {
        console.log('✗ 平均单词长度测试 - 失败');
        console.log(`  文本: "${avgTestText}"`);
        console.log(`  期望: ${expectedAvgWordLength.toFixed(2)}`);
        console.log(`  实际: ${avgResult.averageWordLength.toFixed(2)}`);
    }
    console.log('');
    
    // 测试阅读时间功能
    console.log('5. 测试阅读时间功能：');
    console.log('------------------------');
    
    const timeTestText = 'Hello '.repeat(200); // 200个单词
    const timeResult = stats.analyze(timeTestText);
    const expectedMinutes = Math.ceil(200 / 200); // 假设每分钟200个单词
    
    totalTests++;
    if (timeResult.readingTime.minutes >= expectedMinutes - 1 && timeResult.readingTime.minutes <= expectedMinutes + 1) {
        passedTests++;
        console.log('✓ 阅读时间测试 - 通过');
        console.log(`  单词数: 200`);
        console.log(`  期望: 约 ${expectedMinutes} 分钟`);
        console.log(`  实际: ${timeResult.readingTime.minutes} 分钟 ${timeResult.readingTime.seconds} 秒`);
    } else {
        console.log('✗ 阅读时间测试 - 失败');
        console.log(`  单词数: 200`);
        console.log(`  期望: 约 ${expectedMinutes} 分钟`);
        console.log(`  实际: ${timeResult.readingTime.minutes} 分钟 ${timeResult.readingTime.seconds} 秒`);
    }
    console.log('');
    
    // 测试句子提取功能
    console.log('6. 测试句子提取功能：');
    console.log('------------------------');
    
    const sentenceTestText = 'Hello world. This is a test. Another sentence here.';
    const sentenceResult = stats.analyze(sentenceTestText);
    const expectedSentences = 3;
    
    totalTests++;
    if (sentenceResult.sentencesList.length === expectedSentences) {
        passedTests++;
        console.log('✓ 句子提取测试 - 通过');
        console.log(`  文本: "${sentenceTestText}"`);
        console.log(`  期望句子数: ${expectedSentences}`);
        console.log(`  实际句子数: ${sentenceResult.sentencesList.length}`);
        console.log(`  提取的句子: ${sentenceResult.sentencesList.join(' | ')}`);
    } else {
        console.log('✗ 句子提取测试 - 失败');
        console.log(`  文本: "${sentenceTestText}"`);
        console.log(`  期望句子数: ${expectedSentences}`);
        console.log(`  实际句子数: ${sentenceResult.sentencesList.length}`);
    }
    console.log('');
    
    // 测试完整分析功能
    console.log('7. 测试完整分析功能：');
    console.log('------------------------');
    
    const fullTestText = 'Hello, world! This is a test paragraph.\n\nThis is another paragraph with more sentences.';
    const fullResult = stats.analyze(fullTestText);
    
    totalTests++;
    if (fullResult && 
        typeof fullResult.words === 'number' &&
        typeof fullResult.sentences === 'number' &&
        typeof fullResult.paragraphs === 'number' &&
        typeof fullResult.totalCharacters === 'number' &&
        typeof fullResult.charactersWithoutSpaces === 'number' &&
        Array.isArray(fullResult.wordFrequency) &&
        typeof fullResult.averageWordsPerSentence === 'number' &&
        typeof fullResult.averageSentencesPerParagraph === 'number' &&
        typeof fullResult.averageWordLength === 'number' &&
        typeof fullResult.readingTime === 'object' &&
        typeof fullResult.speakingTime === 'object' &&
        Array.isArray(fullResult.sentencesList)
    ) {
        passedTests++;
        console.log('✓ 完整分析测试 - 通过');
        console.log(`  文本: "${fullTestText.replace(/\n/g, '\\n')}"`);
        console.log(`  分析结果包含所有必要字段`);
    } else {
        console.log('✗ 完整分析测试 - 失败');
        console.log(`  分析结果缺少必要字段`);
        console.log(`  结果: ${JSON.stringify(fullResult, null, 2)}`);
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
    window.runDcContentStatsTests = runTests;
    console.log('dcContentStats 测试已加载，运行 runDcContentStatsTests() 开始测试');
} else {
    // Node.js 环境
    runTests();
}

// 导出测试函数（用于 Node.js 环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runTests };
}