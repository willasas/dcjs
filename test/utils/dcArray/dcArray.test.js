/**
 * dcArray 测试用例
 */
const dcArray = require('../../../src/utils/dcArray');

describe('dcArray', () => {
  describe('unique', () => {
    test('基本数组去重', () => {
      const arr = [1, 2, 2, 3, 4, 4, 5];
      const result = dcArray.unique(arr);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('对象数组去重', () => {
      const arr = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 1, name: 'a' }
      ];
      const result = dcArray.unique(arr, 'id');
      expect(result).toEqual([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' }
      ]);
    });

    test('非数组输入', () => {
      const result = dcArray.unique('not an array');
      expect(result).toEqual([]);
    });
  });

  describe('flatten', () => {
    test('扁平化数组', () => {
      const arr = [1, [2, [3, 4], 5], 6];
      const result = dcArray.flatten(arr);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('指定深度扁平化', () => {
      const arr = [1, [2, [3, 4], 5], 6];
      const result = dcArray.flatten(arr, 1);
      expect(result).toEqual([1, 2, [3, 4], 5, 6]);
    });

    test('非数组输入', () => {
      const result = dcArray.flatten('not an array');
      expect(result).toEqual([]);
    });
  });

  describe('groupBy', () => {
    test('按字符串键分组', () => {
      const arr = [
        { name: 'a', group: '1' },
        { name: 'b', group: '1' },
        { name: 'c', group: '2' }
      ];
      const result = dcArray.groupBy(arr, 'group');
      expect(result).toEqual({
        '1': [
          { name: 'a', group: '1' },
          { name: 'b', group: '1' }
        ],
        '2': [{ name: 'c', group: '2' }]
      });
    });

    test('按函数分组', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = dcArray.groupBy(arr, item => item % 2 === 0 ? 'even' : 'odd');
      expect(result).toEqual({
        odd: [1, 3, 5],
        even: [2, 4]
      });
    });

    test('非数组输入', () => {
      const result = dcArray.groupBy('not an array', 'key');
      expect(result).toEqual({});
    });
  });

  describe('sort', () => {
    test('基本数组排序', () => {
      const arr = [3, 1, 4, 1, 5, 9];
      const result = dcArray.sort(arr);
      expect(result).toEqual([1, 1, 3, 4, 5, 9]);
    });

    test('对象数组排序', () => {
      const arr = [
        { name: 'c' },
        { name: 'a' },
        { name: 'b' }
      ];
      const result = dcArray.sort(arr, 'name');
      expect(result).toEqual([
        { name: 'a' },
        { name: 'b' },
        { name: 'c' }
      ]);
    });

    test('降序排序', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = dcArray.sort(arr, null, true);
      expect(result).toEqual([5, 4, 3, 2, 1]);
    });

    test('非数组输入', () => {
      const result = dcArray.sort('not an array');
      expect(result).toEqual([]);
    });
  });

  describe('intersection', () => {
    test('基本数组交集', () => {
      const arr1 = [1, 2, 3, 4];
      const arr2 = [3, 4, 5, 6];
      const result = dcArray.intersection(arr1, arr2);
      expect(result).toEqual([3, 4]);
    });

    test('对象数组交集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
      const result = dcArray.intersection(arr1, arr2, 'id');
      expect(result).toEqual([{ id: 2 }, { id: 3 }]);
    });

    test('非数组输入', () => {
      const result = dcArray.intersection('not an array', [1, 2, 3]);
      expect(result).toEqual([]);
    });
  });

  describe('difference', () => {
    test('基本数组差集', () => {
      const arr1 = [1, 2, 3, 4];
      const arr2 = [3, 4, 5, 6];
      const result = dcArray.difference(arr1, arr2);
      expect(result).toEqual([1, 2]);
    });

    test('对象数组差集', () => {
      const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
      const result = dcArray.difference(arr1, arr2, 'id');
      expect(result).toEqual([{ id: 1 }]);
    });

    test('非数组输入', () => {
      const result = dcArray.difference('not an array', [1, 2, 3]);
      expect(result).toEqual([]);
    });
  });

  describe('union', () => {
    test('基本数组合并', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [3, 4, 5];
      const result = dcArray.union(arr1, arr2);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('对象数组合并', () => {
      const arr1 = [{ id: 1 }, { id: 2 }];
      const arr2 = [{ id: 2 }, { id: 3 }];
      const result = dcArray.union(arr1, arr2, 'id');
      expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });

    test('非数组输入', () => {
      const result = dcArray.union('not an array', [1, 2, 3]);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('chunk', () => {
    test('数组切片', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const result = dcArray.chunk(arr, 3);
      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    test('非数组输入', () => {
      const result = dcArray.chunk('not an array', 2);
      expect(result).toEqual([]);
    });

    test('无效切片大小', () => {
      const arr = [1, 2, 3];
      const result = dcArray.chunk(arr, 0);
      expect(result).toEqual([]);
    });
  });

  describe('shuffle', () => {
    test('数组洗牌', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = dcArray.shuffle(arr);
      expect(result).toHaveLength(5);
      expect(result).toEqual(expect.arrayContaining(arr));
    });

    test('非数组输入', () => {
      const result = dcArray.shuffle('not an array');
      expect(result).toEqual([]);
    });
  });

  describe('random', () => {
    test('获取单个随机元素', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = dcArray.random(arr);
      expect(arr).toContain(result);
    });

    test('获取多个随机元素', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = dcArray.random(arr, 3);
      expect(result).toHaveLength(3);
      result.forEach(item => {
        expect(arr).toContain(item);
      });
    });

    test('非数组输入', () => {
      const result = dcArray.random('not an array');
      expect(result).toBeNull();
    });

    test('空数组输入', () => {
      const result = dcArray.random([], 2);
      expect(result).toEqual([]);
    });
  });

  describe('reverse', () => {
    test('反转数组', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = dcArray.reverse(arr);
      expect(result).toEqual([5, 4, 3, 2, 1]);
    });

    test('非数组输入', () => {
      expect(() => {
        dcArray.reverse('not an array');
      }).toThrow('Input must be an array');
    });
  });

  describe('sum', () => {
    test('基本数组求和', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = dcArray.sum(arr);
      expect(result).toBe(15);
    });

    test('对象数组求和', () => {
      const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
      const result = dcArray.sum(arr, 'value');
      expect(result).toBe(6);
    });

    test('非数组输入', () => {
      const result = dcArray.sum('not an array');
      expect(result).toBe(0);
    });
  });

  describe('average', () => {
    test('基本数组平均值', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = dcArray.average(arr);
      expect(result).toBe(3);
    });

    test('对象数组平均值', () => {
      const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
      const result = dcArray.average(arr, 'value');
      expect(result).toBe(2);
    });

    test('非数组输入', () => {
      const result = dcArray.average('not an array');
      expect(result).toBe(0);
    });
  });

  describe('max', () => {
    test('基本数组最大值', () => {
      const arr = [1, 5, 3, 9, 2];
      const result = dcArray.max(arr);
      expect(result).toBe(9);
    });

    test('对象数组最大值', () => {
      const arr = [{ value: 1 }, { value: 5 }, { value: 3 }];
      const result = dcArray.max(arr, 'value');
      expect(result).toBe(5);
    });

    test('非数组输入', () => {
      const result = dcArray.max('not an array');
      expect(result).toBeNull();
    });
  });

  describe('min', () => {
    test('基本数组最小值', () => {
      const arr = [1, 5, 3, 9, 2];
      const result = dcArray.min(arr);
      expect(result).toBe(1);
    });

    test('对象数组最小值', () => {
      const arr = [{ value: 1 }, { value: 5 }, { value: 3 }];
      const result = dcArray.min(arr, 'value');
      expect(result).toBe(1);
    });

    test('非数组输入', () => {
      const result = dcArray.min('not an array');
      expect(result).toBeNull();
    });
  });

  describe('toTree', () => {
    test('数组转树形结构', () => {
      const arr = [
        { id: 1, parentId: null },
        { id: 2, parentId: 1 },
        { id: 3, parentId: 1 },
        { id: 4, parentId: 2 }
      ];
      const result = dcArray.toTree(arr);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0].children).toHaveLength(2);
    });

    test('非数组输入', () => {
      const result = dcArray.toTree('not an array');
      expect(result).toEqual([]);
    });
  });

  describe('fromTree', () => {
    test('树形结构转数组', () => {
      const tree = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [{ id: 4 }]
            },
            { id: 3 }
          ]
        }
      ];
      const result = dcArray.fromTree(tree);
      expect(result).toHaveLength(4);
      expect(result.map(item => item.id)).toEqual([1, 2, 4, 3]);
    });

    test('非数组输入', () => {
      const result = dcArray.fromTree('not an array');
      expect(result).toEqual([]);
    });
  });
});
