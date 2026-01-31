/**
 * @file dcjson.test.js
 * @description JSON工具类测试
 * @author DC.js Team
 * @version 1.0.0
 */

const DCJson = require('../../../src/utils/dcjson')

describe('DCJson', () => {
  describe('isValidJSON', () => {
    test('should return true for valid JSON string', () => {
      const validJson = '{"name": "test", "value": 123}'
      expect(DCJson.isValidJSON(validJson)).toBe(true)
    })

    test('should return false for invalid JSON string', () => {
      const invalidJson = '{"name": "test", "value": 123' // 缺少闭合括号
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      expect(DCJson.isValidJSON(invalidJson)).toBe(false)
      expect(consoleErrorSpy).toHaveBeenCalled()
      consoleErrorSpy.mockRestore()
    })

    test('should return false for non-string input', () => {
      const nonStringInput = { name: 'test' }
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      expect(DCJson.isValidJSON(nonStringInput)).toBe(false)
      expect(consoleErrorSpy).toHaveBeenCalled()
      consoleErrorSpy.mockRestore()
    })

    test('should handle empty string', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      expect(DCJson.isValidJSON('')).toBe(false)
      expect(consoleErrorSpy).toHaveBeenCalled()
      consoleErrorSpy.mockRestore()
    })
  })

  describe('jsonToCsv', () => {
    test('should convert JSON array to CSV string', () => {
      const data = [
        { name: 'John', age: 30, city: 'New York' },
        { name: 'Jane', age: 25, city: 'London' }
      ]
      const columns = ['name', 'age', 'city']
      const csv = DCJson.jsonToCsv(data, columns)
      
      expect(typeof csv).toBe('string')
      expect(csv).toContain('name,age,city')
      expect(csv).toContain('"John","30","New York"')
      expect(csv).toContain('"Jane","25","London"')
    })

    test('should handle custom delimiter', () => {
      const data = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 }
      ]
      const columns = ['name', 'age']
      const csv = DCJson.jsonToCsv(data, columns, ';')
      
      expect(typeof csv).toBe('string')
      expect(csv).toContain('name;age')
      expect(csv).toContain('"John";"30"')
    })

    test('should handle null and undefined values', () => {
      const data = [
        { name: 'John', age: null, city: undefined },
        { name: 'Jane', age: 25, city: 'London' }
      ]
      const columns = ['name', 'age', 'city']
      const csv = DCJson.jsonToCsv(data, columns)
      
      expect(typeof csv).toBe('string')
      expect(csv).toContain('"John","",""')
      expect(csv).toContain('"Jane","25","London"')
    })

    test('should handle missing properties', () => {
      const data = [
        { name: 'John', age: 30 },
        { name: 'Jane' }
      ]
      const columns = ['name', 'age', 'city']
      const csv = DCJson.jsonToCsv(data, columns)
      
      expect(typeof csv).toBe('string')
      expect(csv).toContain('"John","30",""')
      expect(csv).toContain('"Jane","",""')
    })

    test('should handle empty data array', () => {
      const data = []
      const columns = ['name', 'age']
      const csv = DCJson.jsonToCsv(data, columns)
      
      expect(typeof csv).toBe('string')
      expect(csv).toBe('name,age')
    })

    test('should throw error for invalid input parameters', () => {
      expect(() => {
        DCJson.jsonToCsv('not an array', ['name', 'age'])
      }).toThrow('Invalid input parameters')

      expect(() => {
        DCJson.jsonToCsv([{ name: 'John' }], 'not an array')
      }).toThrow('Invalid input parameters')

      expect(() => {
        DCJson.jsonToCsv([{ name: 'John' }], ['name'], 123)
      }).toThrow('Invalid input parameters')
    })

    test('should throw error for empty columns array', () => {
      expect(() => {
        DCJson.jsonToCsv([{ name: 'John' }], [])
      }).toThrow('Columns array must not be empty')
    })
  })

  describe('mergeJsonObjects', () => {
    test('should merge multiple JSON objects', () => {
      const obj1 = { name: 'John', age: 30 }
      const obj2 = { city: 'New York', country: 'USA' }
      const obj3 = { job: 'Engineer', salary: 100000 }
      
      const merged = DCJson.mergeJsonObjects(obj1, obj2, obj3)
      
      expect(typeof merged).toBe('object')
      expect(merged.name).toBe('John')
      expect(merged.age).toBe(30)
      expect(merged.city).toBe('New York')
      expect(merged.country).toBe('USA')
      expect(merged.job).toBe('Engineer')
      expect(merged.salary).toBe(100000)
    })

    test('should handle overlapping properties', () => {
      const obj1 = { name: 'John', age: 30, city: 'Boston' }
      const obj2 = { city: 'New York', country: 'USA' }
      
      const merged = DCJson.mergeJsonObjects(obj1, obj2)
      
      expect(typeof merged).toBe('object')
      expect(merged.name).toBe('John')
      expect(merged.age).toBe(30)
      expect(merged.city).toBe('New York') // Should be overwritten by obj2
      expect(merged.country).toBe('USA')
    })

    test('should handle no input objects', () => {
      const merged = DCJson.mergeJsonObjects()
      expect(typeof merged).toBe('object')
      expect(Object.keys(merged).length).toBe(0)
    })

    test('should handle single input object', () => {
      const obj1 = { name: 'John', age: 30 }
      const merged = DCJson.mergeJsonObjects(obj1)
      
      expect(typeof merged).toBe('object')
      expect(merged.name).toBe('John')
      expect(merged.age).toBe(30)
    })
  })

  describe('deepCopyJson', () => {
    test('should deep copy JSON object', () => {
      const original = {
        name: 'John',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'New York',
          zip: 10001
        },
        hobbies: ['reading', 'gaming', 'coding']
      }
      
      const copy = DCJson.deepCopyJson(original)
      
      expect(typeof copy).toBe('object')
      expect(copy).toEqual(original)
      expect(copy).not.toBe(original) // Should be a different reference
      expect(copy.address).not.toBe(original.address) // Should be a different reference
      expect(copy.hobbies).not.toBe(original.hobbies) // Should be a different reference
    })

    test('should handle nested objects', () => {
      const original = {
        level1: {
          level2: {
            level3: {
              value: 42
            }
          }
        }
      }
      
      const copy = DCJson.deepCopyJson(original)
      
      expect(typeof copy).toBe('object')
      expect(copy.level1.level2.level3.value).toBe(42)
      expect(copy.level1).not.toBe(original.level1)
      expect(copy.level1.level2).not.toBe(original.level1.level2)
      expect(copy.level1.level2.level3).not.toBe(original.level1.level2.level3)
    })

    test('should handle arrays', () => {
      const original = {
        numbers: [1, 2, 3, 4, 5],
        strings: ['a', 'b', 'c'],
        objects: [{ id: 1 }, { id: 2 }]
      }
      
      const copy = DCJson.deepCopyJson(original)
      
      expect(typeof copy).toBe('object')
      expect(copy.numbers).toEqual([1, 2, 3, 4, 5])
      expect(copy.strings).toEqual(['a', 'b', 'c'])
      expect(copy.objects).toEqual([{ id: 1 }, { id: 2 }])
      expect(copy.numbers).not.toBe(original.numbers)
      expect(copy.strings).not.toBe(original.strings)
      expect(copy.objects).not.toBe(original.objects)
    })

    test('should handle empty object', () => {
      const original = {}
      const copy = DCJson.deepCopyJson(original)
      
      expect(typeof copy).toBe('object')
      expect(Object.keys(copy).length).toBe(0)
      expect(copy).not.toBe(original)
    })

    test('should handle null input', () => {
      const original = null
      const copy = DCJson.deepCopyJson(original)
      expect(copy).toBeNull()
    })
  })
})
