/**
 * dcObject 工具类测试
 */

// 假设在浏览器环境中运行，window.DC 已注册
if (typeof window === 'undefined') {
    // 在非浏览器环境中，需要模拟 window 对象
    global.window = {};
    global.window.DC = {};
    // 导入 dcObject 模块
    const dcObject = require('../../../src/utils/dcObject');
    global.window.DC.Object = dcObject;
}

const assert = require('assert').strict;

describe('dcObject 工具类测试', function() {
    describe('deepClone 方法测试', function() {
        it('应该正确深拷贝普通对象', function() {
            const original = {
                name: 'John',
                age: 30,
                address: {
                    city: 'New York',
                    zip: 10001
                },
                hobbies: ['reading', 'coding']
            };

            const cloned = DC.Object.deepClone(original);
            assert.deepStrictEqual(cloned, original);

            // 修改克隆对象，原始对象不应受影响
            cloned.address.city = 'Boston';
            assert.strictEqual(original.address.city, 'New York');
            assert.strictEqual(cloned.address.city, 'Boston');
        });

        it('应该正确深拷贝日期对象', function() {
            const original = new Date('2023-01-01');
            const cloned = DC.Object.deepClone(original);
            assert.deepStrictEqual(cloned, original);
            assert.notStrictEqual(cloned, original); // 应该是不同的对象引用
        });

        it('应该正确深拷贝正则表达式', function() {
            const original = /test/gi;
            const cloned = DC.Object.deepClone(original);
            assert.deepStrictEqual(cloned, original);
            assert.notStrictEqual(cloned, original); // 应该是不同的对象引用
        });

        it('应该正确处理 null 和基本类型', function() {
            assert.strictEqual(DC.Object.deepClone(null), null);
            assert.strictEqual(DC.Object.deepClone(42), 42);
            assert.strictEqual(DC.Object.deepClone('test'), 'test');
            assert.strictEqual(DC.Object.deepClone(true), true);
        });
    });

    describe('entries 方法测试', function() {
        it('应该正确返回对象的键值对', function() {
            const obj = { a: 1, b: 2, c: 3 };
            const entries = DC.Object.entries(obj);
            assert.deepStrictEqual(entries, Object.entries(obj));
        });

        it('应该对非对象输入抛出错误', function() {
            assert.throws(() => DC.Object.entries(null), Error);
            assert.throws(() => DC.Object.entries(42), Error);
            assert.throws(() => DC.Object.entries('test'), Error);
        });
    });

    describe('merge 方法测试', function() {
        it('应该正确合并多个对象', function() {
            const obj1 = { a: 1, b: { c: 2 } };
            const obj2 = { b: { d: 3 }, e: 4 };
            const obj3 = { f: 5 };

            const merged = DC.Object.merge(obj1, obj2, obj3);
            assert.deepStrictEqual(merged, {
                a: 1,
                b: { c: 2, d: 3 },
                e: 4,
                f: 5
            });
        });

        it('应该正确处理数组合并', function() {
            const obj1 = { hobbies: ['reading'] };
            const obj2 = { hobbies: ['coding'] };

            const merged = DC.Object.merge(obj1, obj2);
            assert.deepStrictEqual(merged.hobbies, ['reading', 'coding']);
        });

        it('应该忽略非对象参数', function() {
            const obj1 = { a: 1 };
            const obj2 = null;
            const obj3 = 42;

            const merged = DC.Object.merge(obj1, obj2, obj3);
            assert.deepStrictEqual(merged, { a: 1 });
        });
    });

    describe('get 方法测试', function() {
        it('应该正确获取对象指定路径的值', function() {
            const obj = { a: { b: { c: 42 } } };
            assert.strictEqual(DC.Object.get(obj, 'a.b.c'), 42);
        });

        it('应该在路径不存在时返回默认值', function() {
            const obj = { a: { b: { c: 42 } } };
            assert.strictEqual(DC.Object.get(obj, 'a.b.d', 'default'), 'default');
        });

        it('应该在对象为 null 或 undefined 时返回默认值', function() {
            assert.strictEqual(DC.Object.get(null, 'a.b.c', 'default'), 'default');
            assert.strictEqual(DC.Object.get(undefined, 'a.b.c', 'default'), 'default');
        });
    });

    describe('set 方法测试', function() {
        it('应该正确设置对象指定路径的值', function() {
            const obj = { a: { b: {} } };
            DC.Object.set(obj, 'a.b.c', 42);
            assert.strictEqual(obj.a.b.c, 42);
        });

        it('应该在路径不存在时创建嵌套对象', function() {
            const obj = {};
            DC.Object.set(obj, 'a.b.c.d', 42);
            assert.strictEqual(obj.a.b.c.d, 42);
        });

        it('应该在对象为 null 或 undefined 时返回原对象', function() {
            assert.strictEqual(DC.Object.set(null, 'a.b.c', 42), null);
            assert.strictEqual(DC.Object.set(undefined, 'a.b.c', 42), undefined);
        });
    });

    describe('unset 方法测试', function() {
        it('应该正确删除对象指定路径的属性', function() {
            const obj = { a: { b: { c: 42 } } };
            const result = DC.Object.unset(obj, 'a.b.c');
            assert.strictEqual(result, true);
            assert.strictEqual(obj.a.b.c, undefined);
            assert(!('c' in obj.a.b));
        });

        it('应该在路径不存在时返回 false', function() {
            const obj = { a: { b: {} } };
            const result = DC.Object.unset(obj, 'a.b.c');
            assert.strictEqual(result, false);
        });

        it('应该在对象为 null 或 undefined 时返回 false', function() {
            assert.strictEqual(DC.Object.unset(null, 'a.b.c'), false);
            assert.strictEqual(DC.Object.unset(undefined, 'a.b.c'), false);
        });
    });

    describe('has 方法测试', function() {
        it('应该正确检查对象是否包含指定路径', function() {
            const obj = { a: { b: { c: 42 } } };
            assert.strictEqual(DC.Object.has(obj, 'a.b.c'), true);
            assert.strictEqual(DC.Object.has(obj, 'a.b.d'), false);
        });

        it('应该在对象为 null 或 undefined 时返回 false', function() {
            assert.strictEqual(DC.Object.has(null, 'a.b.c'), false);
            assert.strictEqual(DC.Object.has(undefined, 'a.b.c'), false);
        });
    });

    describe('pick 方法测试', function() {
        it('应该正确选择对象的指定属性', function() {
            const obj = { a: 1, b: 2, c: 3, d: 4 };
            const picked = DC.Object.pick(obj, ['a', 'c']);
            assert.deepStrictEqual(picked, { a: 1, c: 3 });
        });

        it('应该在对象为 null 或 undefined 时返回空对象', function() {
            assert.deepStrictEqual(DC.Object.pick(null, ['a', 'c']), {});
            assert.deepStrictEqual(DC.Object.pick(undefined, ['a', 'c']), {});
        });

        it('应该在 keys 不是数组时返回空对象', function() {
            const obj = { a: 1, b: 2 };
            assert.deepStrictEqual(DC.Object.pick(obj, 'a'), {});
            assert.deepStrictEqual(DC.Object.pick(obj, null), {});
        });
    });

    describe('omit 方法测试', function() {
        it('应该正确忽略对象的指定属性', function() {
            const obj = { a: 1, b: 2, c: 3, d: 4 };
            const omitted = DC.Object.omit(obj, ['b', 'd']);
            assert.deepStrictEqual(omitted, { a: 1, c: 3 });
        });

        it('应该在对象为 null 或 undefined 时返回空对象', function() {
            assert.deepStrictEqual(DC.Object.omit(null, ['b', 'd']), {});
            assert.deepStrictEqual(DC.Object.omit(undefined, ['b', 'd']), {});
        });

        it('应该在 keys 不是数组时返回原对象的副本', function() {
            const obj = { a: 1, b: 2 };
            const result = DC.Object.omit(obj, 'b');
            assert.deepStrictEqual(result, { a: 1, b: 2 });
            assert.notStrictEqual(result, obj); // 应该返回副本
        });
    });

    describe('flatten 方法测试', function() {
        it('应该正确扁平化对象', function() {
            const obj = {
                a: 1,
                b: {
                    c: 2,
                    d: {
                        e: 3
                    }
                }
            };

            const flattened = DC.Object.flatten(obj);
            assert.deepStrictEqual(flattened, {
                a: 1,
                'b.c': 2,
                'b.d.e': 3
            });
        });

        it('应该在对象为 null 或 undefined 时返回空对象', function() {
            assert.deepStrictEqual(DC.Object.flatten(null), {});
            assert.deepStrictEqual(DC.Object.flatten(undefined), {});
        });
    });

    describe('toQueryString 方法测试', function() {
        it('应该正确将对象转换为查询字符串', function() {
            const obj = { name: 'John', age: 30 };
            const queryString = DC.Object.toQueryString(obj);
            assert.strictEqual(queryString, 'name=John&age=30');
        });

        it('应该正确处理数组参数', function() {
            const obj = { name: 'John', hobbies: ['reading', 'coding'] };
            const queryString = DC.Object.toQueryString(obj);
            assert.strictEqual(queryString, 'name=John&hobbies=reading&hobbies=coding');
        });

        it('应该在对象为 null 或 undefined 时返回空字符串', function() {
            assert.strictEqual(DC.Object.toQueryString(null), '');
            assert.strictEqual(DC.Object.toQueryString(undefined), '');
        });
    });

    describe('fromQueryString 方法测试', function() {
        it('应该正确将查询字符串转换为对象', function() {
            const queryString = 'name=John&age=30';
            const obj = DC.Object.fromQueryString(queryString);
            assert.deepStrictEqual(obj, { name: 'John', age: '30' });
        });

        it('应该正确处理重复参数', function() {
            const queryString = 'name=John&hobbies=reading&hobbies=coding';
            const obj = DC.Object.fromQueryString(queryString);
            assert.deepStrictEqual(obj, { name: 'John', hobbies: ['reading', 'coding'] });
        });

        it('应该在查询字符串为 null 或 undefined 时返回空对象', function() {
            assert.deepStrictEqual(DC.Object.fromQueryString(null), {});
            assert.deepStrictEqual(DC.Object.fromQueryString(undefined), {});
        });
    });

    describe('isEqual 方法测试', function() {
        it('应该正确比较两个相等的对象', function() {
            const obj1 = { a: 1, b: { c: 2 } };
            const obj2 = { a: 1, b: { c: 2 } };
            assert.strictEqual(DC.Object.isEqual(obj1, obj2), true);
        });

        it('应该正确比较两个不相等的对象', function() {
            const obj1 = { a: 1, b: { c: 2 } };
            const obj2 = { a: 1, b: { c: 3 } };
            assert.strictEqual(DC.Object.isEqual(obj1, obj2), false);
        });

        it('应该正确处理基本类型比较', function() {
            assert.strictEqual(DC.Object.isEqual(42, 42), true);
            assert.strictEqual(DC.Object.isEqual('test', 'test'), true);
            assert.strictEqual(DC.Object.isEqual(42, '42'), false);
        });
    });

    describe('paths 方法测试', function() {
        it('应该正确获取对象的所有键路径', function() {
            const obj = {
                a: 1,
                b: {
                    c: 2,
                    d: {
                        e: 3
                    }
                }
            };

            const paths = DC.Object.paths(obj);
            assert.deepStrictEqual(paths, ['a', 'b', 'b.c', 'b.d', 'b.d.e']);
        });

        it('应该在对象为 null 或 undefined 时返回空数组', function() {
            assert.deepStrictEqual(DC.Object.paths(null), []);
            assert.deepStrictEqual(DC.Object.paths(undefined), []);
        });
    });

    describe('rename 方法测试', function() {
        it('应该正确重命名对象的属性', function() {
            const obj = { name: 'John', age: 30, city: 'New York' };
            const mapping = { name: 'fullName', city: 'location' };

            const renamed = DC.Object.rename(obj, mapping);
            assert.deepStrictEqual(renamed, {
                fullName: 'John',
                age: 30,
                location: 'New York'
            });
        });

        it('应该在对象为 null 或 undefined 时返回原对象', function() {
            const mapping = { name: 'fullName' };
            assert.strictEqual(DC.Object.rename(null, mapping), null);
            assert.strictEqual(DC.Object.rename(undefined, mapping), undefined);
        });

        it('应该在映射为 null 或 undefined 时返回原对象', function() {
            const obj = { name: 'John' };
            assert.strictEqual(DC.Object.rename(obj, null), obj);
            assert.strictEqual(DC.Object.rename(obj, undefined), obj);
        });
    });

    describe('filter 方法测试', function() {
        it('应该正确过滤对象的属性', function() {
            const obj = { a: 1, b: 2, c: 3, d: 4 };
            const predicate = (value) => value > 2;

            const filtered = DC.Object.filter(obj, predicate);
            assert.deepStrictEqual(filtered, { c: 3, d: 4 });
        });

        it('应该在对象为 null 或 undefined 时返回空对象', function() {
            const predicate = (value) => value > 2;
            assert.deepStrictEqual(DC.Object.filter(null, predicate), {});
            assert.deepStrictEqual(DC.Object.filter(undefined, predicate), {});
        });

        it('应该在 predicate 不是函数时返回空对象', function() {
            const obj = { a: 1, b: 2, c: 3 };
            assert.deepStrictEqual(DC.Object.filter(obj, null), {});
            assert.deepStrictEqual(DC.Object.filter(obj, 'not a function'), {});
        });
    });
});
