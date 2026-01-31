const dprettylog = require('../../../src/utils/dprettylog');

// Mock console methods
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleGroupCollapsed = console.groupCollapsed;
const originalConsoleGroupEnd = console.groupEnd;

// Mock navigator object
global.navigator = {
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

describe('dprettylog', () => {
  let logOutput = [];
  let errorOutput = [];
  let warnOutput = [];

  beforeEach(() => {
    // Reset output arrays
    logOutput = [];
    errorOutput = [];
    warnOutput = [];

    // Mock console methods to capture output
    console.log = (...args) => {
      logOutput.push(args);
      originalConsoleLog(...args);
    };

    console.error = (...args) => {
      errorOutput.push(args);
      originalConsoleError(...args);
    };

    console.warn = (...args) => {
      warnOutput.push(args);
      originalConsoleWarn(...args);
    };

    console.groupCollapsed = (...args) => {
      logOutput.push(['groupCollapsed', ...args]);
      if (originalConsoleGroupCollapsed) {
        originalConsoleGroupCollapsed(...args);
      }
    };

    console.groupEnd = () => {
      logOutput.push(['groupEnd']);
      if (originalConsoleGroupEnd) {
        originalConsoleGroupEnd();
      }
    };
  });

  afterEach(() => {
    // Restore original console methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.groupCollapsed = originalConsoleGroupCollapsed;
    console.groupEnd = originalConsoleGroupEnd;
  });

  describe('info method', () => {
    test('should log info message with correct format', () => {
      dprettylog.info('Test info message');
      expect(logOutput.length).toBeGreaterThan(0);
    });

    test('should handle empty message', () => {
      dprettylog.info('');
      expect(errorOutput.length).toBeGreaterThan(0);
    });
  });

  describe('error method', () => {
    test('should log error message with correct format', () => {
      dprettylog.error('Test error message');
      expect(logOutput.length).toBeGreaterThan(0);
    });
  });

  describe('warning method', () => {
    test('should log warning message with correct format', () => {
      dprettylog.warning('Test warning message');
      expect(logOutput.length).toBeGreaterThan(0);
    });
  });

  describe('success method', () => {
    test('should log success message with correct format', () => {
      dprettylog.success('Test success message');
      expect(logOutput.length).toBeGreaterThan(0);
    });
  });

  describe('table method', () => {
    test('should log table data with correct format', () => {
      const testData = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 }
      ];
      dprettylog.table(testData);
      expect(logOutput.length).toBeGreaterThan(1); // Should have header and row logs
    });

    test('should warn for empty data', () => {
      dprettylog.table([]);
      expect(warnOutput.length).toBeGreaterThan(0);
    });

    test('should warn for non-array data', () => {
      dprettylog.table({});
      expect(warnOutput.length).toBeGreaterThan(0);
    });
  });

  describe('picture method', () => {
    test('should handle empty URL', () => {
      dprettylog.picture('');
      expect(warnOutput.length).toBeGreaterThan(0);
    });

    test('should handle invalid URL', () => {
      // This will trigger onerror handler
      dprettylog.picture('invalid-url');
      // Wait for async operation
      return new Promise(resolve => {
        setTimeout(() => {
          expect(errorOutput.length).toBeGreaterThan(0);
          resolve();
        }, 100);
      });
    });
  });

  describe('environment method', () => {
    test('should log environment information as table', () => {
      dprettylog.environment();
      expect(logOutput.length).toBeGreaterThan(1); // Should have table output
    });

    test('should detect Chrome browser', () => {
      global.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
      dprettylog.environment();
      expect(logOutput.length).toBeGreaterThan(1);
    });

    test('should detect Firefox browser', () => {
      global.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0';
      dprettylog.environment();
      expect(logOutput.length).toBeGreaterThan(1);
    });

    test('should detect Edge browser', () => {
      global.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59';
      dprettylog.environment();
      expect(logOutput.length).toBeGreaterThan(1);
    });

    test('should detect Safari browser', () => {
      global.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15';
      dprettylog.environment();
      expect(logOutput.length).toBeGreaterThan(1);
    });
  });
});