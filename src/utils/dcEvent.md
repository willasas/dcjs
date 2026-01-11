# dcEvent 工具类

## 概述
`dcEvent` 是一个轻量级的事件管理工具库，提供了一套简洁的API来简化JavaScript中的事件绑定、解绑、触发和代理操作。它旨在减少原生DOM API的复杂性，提高开发效率，并支持事件命名空间和一次性事件等高级功能。

## 功能特性
- **链式调用**: 支持方法链式调用，代码更简洁
- **跨浏览器兼容**: 兼容各种现代浏览器
- **性能优化**: 高效的事件处理算法
- **错误处理**: 合理处理边界情况和异常输入
- **类型安全**: 对输入参数进行验证
- **无依赖**: 纯JavaScript实现，不依赖其他库
- **事件命名空间**: 支持按命名空间批量管理事件
- **事件代理**: 支持事件委托，适用于动态内容
- **一次性事件**: 支持只触发一次的事件
- **数据传递**: 支持在事件触发时传递数据

## 引入方式

### 方式1: 通过script标签引入
```html
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { dcEvent } from './src/utils/dcEvent.js';
```

## API文档

### on(element, event, handler)
为元素绑定事件监听器。

**参数**:
- `element` (Element): 目标元素
- `event` (string): 事件类型（如'click', 'mouseover'等）
- `handler` (function): 事件处理器函数

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 绑定点击事件
const button = document.getElementById('myButton');
dcEvent.on(button, 'click', function(e) {
    console.log('按钮被点击');
    // e是事件对象
});

// 绑定多个事件
const input = document.getElementById('myInput');
dcEvent.on(input, 'focus', function() {
    dcDom.addClass(this, 'focused');
});
dcEvent.on(input, 'blur', function() {
    dcDom.removeClass(this, 'focused');
});

// 事件委托
const list = document.getElementById('item-list');
dcEvent.on(list, 'click', function(e) {
    // 检查点击的是哪个子元素
    if (e.target.tagName === 'LI') {
        console.log('点击了列表项:', e.target.textContent);
    }
});

// 键盘事件
dcEvent.on(document, 'keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
```

### off(element, event, handler)
移除元素的事件监听器。

**参数**:
- `element` (Element): 目标元素
- `event` (string): 事件类型
- `handler` (function): 要移除的事件处理器函数

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 移除事件监听器
const button = document.getElementById('myButton');
const clickHandler = function() {
    console.log('按钮被点击');
};

// 绑定事件
dcEvent.on(button, 'click', clickHandler);

// 移除事件
dcEvent.off(button, 'click', clickHandler);

// 移除所有事件
// 注意：需要保存处理器引用才能正确移除
class EventHandler {
    constructor() {
        this.handlers = new Map();
    }
    
    add(element, event, handler) {
        dcEvent.on(element, event, handler);
        
        // 保存引用以便后续移除
        const key = `${element.id || element.tagName}_${event}`;
        if (!this.handlers.has(key)) {
            this.handlers.set(key, []);
        }
        this.handlers.get(key).push({ element, event, handler });
    }
    
    remove(element, event, handler) {
        dcEvent.off(element, event, handler);
    }
    
    removeAll() {
        this.handlers.forEach(handlers => {
            handlers.forEach(({ element, event, handler }) => {
                dcEvent.off(element, event, handler);
            });
        });
        this.handlers.clear();
    }
}
```

### once(element, event, handler)
为元素绑定一次性事件监听器（触发一次后自动移除）。

**参数**:
- `element` (Element): 目标元素
- `event` (string): 事件类型
- `handler` (function): 事件处理器函数

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 一次性初始化
const initButton = document.getElementById('init-btn');
dcEvent.once(initButton, 'click', function() {
    initializeApp();
    dcDom.addClass(this, 'initialized');
    console.log('应用已初始化');
});

// 第一次访问提示
function showFirstTimeTip() {
    if (!localStorage.getItem('seen-tip')) {
        const tip = dcDom.createElement('div', {
            class: 'first-time-tip'
        }, ['欢迎使用我们的应用！']);
        dcDom.append(document.body, tip);
        
        // 点击任意位置关闭
        dcEvent.once(document, 'click', function() {
            dcDom.remove(tip);
            localStorage.setItem('seen-tip', 'true');
        });
    }
}

// 单次动画效果
const animateOnce = document.getElementById('animate-once');
dcEvent.once(animateOnce, 'mouseenter', function() {
    dcDom.addClass(this, 'animated');
    setTimeout(() => {
        dcDom.removeClass(this, 'animated');
    }, 1000);
});
```

### trigger(element, event, data)
手动触发元素的指定事件。

**参数**:
- `element` (Element): 目标元素
- `event` (string): 事件类型
- `data` (any, 可选): 要传递给事件处理器的数据

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 触发点击事件
const button = document.getElementById('myButton');
// 绑定事件
dcEvent.on(button, 'click', function() {
    console.log('按钮被点击');
});

// 手动触发
dcEvent.trigger(button, 'click');

// 表单验证触发
const form = document.getElementById('myForm');
dcEvent.on(form, 'validate', function() {
    const isValid = validateForm();
    if (!isValid) {
        dcDom.addClass(this, 'invalid');
    } else {
        dcDom.removeClass(this, 'invalid');
    }
});

// 手动触发验证
dcEvent.trigger(form, 'validate');

// 自定义事件通信
const cart = document.getElementById('cart');
dcEvent.on(cart, 'itemAdded', function(e, item) {
    updateCartDisplay(item);
    showNotification(`已添加 ${item.name} 到购物车`);
});

// 添加商品时触发事件
function addItemToCart(item) {
    addToCart(item);
    dcEvent.trigger(cart, 'itemAdded', item);
}
```

### delegate(container, selector, event, handler)
为容器内的匹配元素绑定事件代理。

**参数**:
- `container` (Element): 容器元素
- `selector` (string): CSS选择器，用于匹配要代理的子元素
- `event` (string): 事件类型
- `handler` (function): 事件处理器函数

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 为列表容器绑定事件代理
const list = document.getElementById('item-list');
dcEvent.delegate(list, 'li', 'click', function(e) {
    console.log('点击了列表项:', e.target.textContent);
});

// 为表格行绑定事件代理
const table = document.getElementById('data-table');
dcEvent.delegate(table, 'tr', 'click', function(e) {
    console.log('点击了表格行:', e.target.rowIndex);
});

// 为动态内容绑定事件
// 即使后来添加的元素也会响应事件
dcEvent.delegate(document, '.dynamic-button', 'click', function(e) {
    console.log('点击了动态按钮:', e.target.textContent);
});

// 实现可编辑单元格
const grid = document.getElementById('grid');
dcEvent.delegate(grid, '.cell', 'dblclick', function(e) {
    const cell = e.target;
    const input = dcDom.createElement('input', {
        type: 'text',
        value: cell.textContent
    });
    
    dcDom.empty(cell);
    dcDom.append(cell, input);
    input.focus();
    
    // 失焦时保存
    const saveEdit = () => {
        cell.textContent = input.value;
        dcDom.remove(input);
    };
    
    dcEvent.once(input, 'blur', saveEdit);
    dcEvent.once(input, 'keydown', function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
});
```

### undelegate(container, selector, event, handler)
移除容器内的事件代理。

**参数**:
- `container` (Element): 容器元素
- `selector` (string): CSS选择器
- `event` (string): 事件类型
- `handler` (function): 要移除的事件处理器函数

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 创建事件处理器
const clickHandler = function(e) {
    console.log('点击了:', e.target.textContent);
};

// 绑定事件代理
dcEvent.delegate(document, '.proxy-button', 'click', clickHandler);

// ... 一些操作之后 ...

// 移除事件代理
dcEvent.undelegate(document, '.proxy-button', 'click', clickHandler);

// 移除特定容器的所有代理事件
const container = document.getElementById('myContainer');
const allHandlers = container._delegates; // 假设我们保存了引用
if (allHandlers) {
    Object.keys(allHandlers).forEach(id => {
        const { selector, event, handler } = allHandlers[id];
        dcEvent.undelegate(container, selector, event, handler);
    });
}
```

### onNamespace(element, namespace, events)
为元素绑定命名空间事件。

**参数**:
- `element` (Element): 目标元素
- `namespace` (string): 命名空间
- `events` (object): 事件映射对象，键为事件类型，值为处理器函数

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 为UI模块绑定事件
const uiModule = document.getElementById('ui-module');
dcEvent.onNamespace(uiModule, 'ui', {
    'click': function() {
        console.log('UI模块被点击');
    },
    'mouseenter': function() {
        dcDom.addClass(this, 'hovered');
    },
    'mouseleave': function() {
        dcDom.removeClass(this, 'hovered');
    }
});

// 为数据模块绑定事件
const dataModule = document.getElementById('data-module');
dcEvent.onNamespace(dataModule, 'data', {
    'load': function(e, data) {
        console.log('数据加载完成:', data);
    },
    'save': function(e, data) {
        console.log('数据保存成功:', data);
    }
});

// 使用命名空间的好处是可以批量管理相关事件
// 当模块销毁时，可以一次性移除所有相关事件
dcEvent.offNamespace(uiModule, 'ui');
```

### offNamespace(element, namespace)
移除元素的命名空间事件。

**参数**:
- `element` (Element): 目标元素
- `namespace` (string): 要移除的命名空间

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 创建模块
class Module {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        // 绑定命名空间事件
        dcEvent.onNamespace(this.element, 'module', {
            'click': () => this.handleClick(),
            'resize': () => this.handleResize()
        });
    }
    
    handleClick() {
        console.log('模块被点击');
    }
    
    handleResize() {
        console.log('窗口大小改变');
    }
    
    destroy() {
        // 销毁时移除所有命名空间事件
        dcEvent.offNamespace(this.element, 'module');
        
        // 清理其他资源
        this.element = null;
    }
}

// 使用示例
const module = new Module(document.getElementById('myModule'));

// 当不再需要模块时
timeout(() => {
    module.destroy(); // 会自动移除所有事件监听器
}, 5000);
```

## 使用示例

### 基础使用
```javascript
// 创建一个简单的事件驱动的计数器
function createCounter() {
    // 创建外层容器
    const counter = dcDom.createElement('div', {
        class: 'counter'
    });
    
    // 创建显示区域
    const display = dcDom.createElement('div', {
        class: 'counter-display'
    }, ['0']);
    
    // 创建按钮
    const incrementBtn = dcDom.createElement('button', {
        class: 'counter-btn increment'
    }, ['+']);
    
    const decrementBtn = dcDom.createElement('button', {
        class: 'counter-btn decrement'
    }, ['-']);
    
    // 创建重置按钮
    const resetBtn = dcDom.createElement('button', {
        class: 'counter-btn reset'
    }, ['重置']);
    
    // 初始化计数值
    let count = 0;
    
    // 更新显示
    function updateDisplay() {
        display.textContent = count;
    }
    
    // 绑定事件
    dcEvent.on(incrementBtn, 'click', () => {
        count++;
        updateDisplay();
        // 触发自定义事件
        dcEvent.trigger(counter, 'change', { count });
    });
    
    dcEvent.on(decrementBtn, 'click', () => {
        count--;
        updateDisplay();
        // 触发自定义事件
        dcEvent.trigger(counter, 'change', { count });
    });
    
    dcEvent.on(resetBtn, 'click', () => {
        count = 0;
        updateDisplay();
        // 触发自定义事件
        dcEvent.trigger(counter, 'reset', { count });
    });
    
    // 组装
    dcDom.append(counter, display);
    dcDom.append(counter, incrementBtn);
    dcDom.append(counter, decrementBtn);
    dcDom.append(counter, resetBtn);
    
    return counter;
}

// 使用示例
const counter = createCounter();
document.body.appendChild(counter);

// 监听计数器变化
dcEvent.on(counter, 'change', (e, data) => {
    console.log('计数器值改变:', data.count);
});

dcEvent.on(counter, 'reset', (e, data) => {
    console.log('计数器已重置:', data.count);
});
```

### 模块化事件管理
```javascript
// 应用程序模块
class AppModule {
    constructor(config = {}) {
        this.config = Object.assign({
            debug: false,
            autoInit: true
        }, config);
        
        this.modules = new Map();
        this.initialized = false;
        
        if (this.config.autoInit) {
            this.init();
        }
    }
    
    init() {
        if (this.initialized) return;
        
        // 注册核心模块
        this.registerModule('ui', new UiModule());
        this.registerModule('data', new DataModule());
        this.registerModule('network', new NetworkModule());
        
        // 绑定全局事件
        this.bindGlobalEvents();
        
        this.initialized = true;
        
        if (this.config.debug) {
            console.log('应用已初始化');
        }
    }
    
    registerModule(name, module) {
        if (this.modules.has(name)) {
            console.warn(`模块 ${name} 已存在，将被覆盖`);
        }
        
        this.modules.set(name, module);
        
        // 触发模块注册事件
        dcEvent.trigger(window, 'app.module.registered', { name, module });
        
        if (this.config.debug) {
            console.log(`模块 ${name} 已注册`);
        }
    }
    
    bindGlobalEvents() {
        // 全局键盘快捷键
        dcEvent.on(document, 'keydown', (e) => {
            // Ctrl+S 保存
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                dcEvent.trigger(window, 'app.save');
            }
            
            // Ctrl+Z 撤销
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                dcEvent.trigger(window, 'app.undo');
            }
        });
        
        // 窗口大小改变
        dcEvent.on(window, 'resize', () => {
            dcEvent.trigger(window, 'app.resize', {
                width: window.innerWidth,
                height: window.innerHeight
            });
        });
        
        // 页面可见性改变
        dcEvent.on(document, 'visibilitychange', () => {
            dcEvent.trigger(window, 'app.visibilitychange', {
                visible: !document.hidden
            });
        });
    }
    
    destroy() {
        if (!this.initialized) return;
        
        // 移除所有全局事件
        dcEvent.off(document);
        dcEvent.off(window);
        
        // 销毁所有模块
        this.modules.forEach((module, name) => {
            if (typeof module.destroy === 'function') {
                module.destroy();
            }
            
            dcEvent.trigger(window, 'app.module.destroyed', { name, module });
        });
        
        this.modules.clear();
        this.initialized = false;
        
        if (this.config.debug) {
            console.log('应用已销毁');
        }
    }
}

// UI模块
class UiModule {
    constructor() {
        this.init();
    }
    
    init() {
        // 绑定UI相关事件
        dcEvent.onNamespace(document, 'ui', {
            'click': this.handleClick.bind(this),
            'scroll': this.handleScroll.bind(this)
        });
        
        // 绑定特定元素的事件
        dcEvent.delegate(document, '.modal', 'click', this.handleModalClick.bind(this));
        dcEvent.delegate(document, '.dropdown', 'click', this.handleDropdownClick.bind(this));
    }
    
    handleClick(e) {
        // 处理通用点击事件
        if (e.target.classList.contains('btn-primary')) {
            console.log('点击了主按钮');
        }
    }
    
    handleScroll() {
        // 处理滚动事件
        const scrollTop = window.pageYOffset;
        if (scrollTop > 100) {
            dcDom.addClass(document.body, 'scrolled');
        } else {
            dcDom.removeClass(document.body, 'scrolled');
        }
    }
    
    handleModalClick(e) {
        // 处理模态框点击
        if (e.target.classList.contains('modal-close')) {
            this.closeModal(e.currentTarget);
        }
    }
    
    handleDropdownClick(e) {
        // 处理下拉菜单点击
        const dropdown = e.currentTarget;
        dcDom.toggleClass(dropdown, 'open');
    }
    
    closeModal(modal) {
        dcDom.removeClass(modal, 'show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    destroy() {
        // 移除所有UI事件
        dcEvent.offNamespace(document, 'ui');
        
        // 移除代理事件
        // 这里需要具体实现，假设我们有引用
        console.log('UI模块已销毁');
    }
}

// 数据模块
class DataModule {
    constructor() {
        this.data = {};
        this.init();
    }
    
    init() {
        // 绑定数据相关事件
        dcEvent.on(window, 'app.save', this.saveData.bind(this));
        dcEvent.on(window, 'app.load', this.loadData.bind(this));
        dcEvent.on(window, 'app.reset', this.resetData.bind(this));
    }
    
    saveData() {
        // 保存数据逻辑
        localStorage.setItem('appData', JSON.stringify(this.data));
        console.log('数据已保存');
        
        // 触发保存完成事件
        dcEvent.trigger(window, 'app.save.complete', { timestamp: Date.now() });
    }
    
    loadData() {
        // 加载数据逻辑
        const savedData = localStorage.getItem('appData');
        if (savedData) {
            this.data = JSON.parse(savedData);
            console.log('数据已加载');
            
            // 触发加载完成事件
            dcEvent.trigger(window, 'app.load.complete', { data: this.data });
        }
    }
    
    resetData() {
        // 重置数据
        this.data = {};
        localStorage.removeItem('appData');
        console.log('数据已重置');
        
        // 触发重置完成事件
        dcEvent.trigger(window, 'app.reset.complete');
    }
    
    getData(key) {
        return key ? this.data[key] : this.data;
    }
    
    setData(key, value) {
        this.data[key] = value;
        // 触发数据更新事件
        dcEvent.trigger(window, 'app.data.update', { key, value });
    }
    
    destroy() {
        // 移除所有数据事件
        dcEvent.off(window, 'app.save');
        dcEvent.off(window, 'app.load');
        dcEvent.off(window, 'app.reset');
        
        console.log('数据模块已销毁');
    }
}

// 网络模块
class NetworkModule {
    constructor() {
        this.init();
    }
    
    init() {
        // 绑定网络相关事件
        dcEvent.on(window, 'app.save', this.syncData.bind(this));
        dcEvent.on(window, 'app.load', this.fetchData.bind(this));
    }
    
    syncData() {
        // 同步数据到服务器
        console.log('正在同步数据...');
        
        fetch('/api/sync', {
            method: 'POST',
            body: JSON.stringify({ data: window.app.getData() }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(result => {
            console.log('数据同步成功');
            dcEvent.trigger(window, 'app.sync.success', result);
        })
        .catch(error => {
            console.error('数据同步失败:', error);
            dcEvent.trigger(window, 'app.sync.error', error);
        });
    }
    
    fetchData() {
        // 从服务器获取数据
        console.log('正在获取数据...');
        
        fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            console.log('数据获取成功');
            dcEvent.trigger(window, 'app.fetch.success', data);
        })
        .catch(error => {
            console.error('数据获取失败:', error);
            dcEvent.trigger(window, 'app.fetch.error', error);
        });
    }
    
    destroy() {
        // 移除所有网络事件
        dcEvent.off(window, 'app.save');
        dcEvent.off(window, 'app.load');
        
        console.log('网络模块已销毁');
    }
}

// 初始化应用
window.app = new AppModule({ debug: true });

// 应用启动后加载数据
setTimeout(() => {
    dcEvent.trigger(window, 'app.load');
}, 100);
```

### 事件代理实现无限滚动
```javascript
// 无限滚动实现
class InfiniteScroll {
    constructor(containerSelector, loadMoreCallback, options = {}) {
        this.container = typeof containerSelector === 'string' 
            ? document.querySelector(containerSelector)
            : containerSelector;
        
        if (!this.container) {
            throw new Error('找不到容器元素');
        }
        
        this.loadMoreCallback = loadMoreCallback;
        this.options = Object.assign({
            threshold: 100, // 距离底部多少像素时触发加载
            loadingText: '加载中...',
            finishedText: '没有更多内容',
            loading: false,
            hasMore: true
        }, options);
        
        this.loadingIndicator = null;
        this.init();
    }
    
    init() {
        // 创建加载指示器
        this.createLoadingIndicator();
        
        // 绑定滚动事件
        dcEvent.on(window, 'scroll', this.handleScroll.bind(this));
        
        // 绑定窗口大小改变事件
        dcEvent.on(window, 'resize', this.handleScroll.bind(this));
        
        // 初始检查
        this.checkLoadNeeded();
        
        console.log('无限滚动已初始化');
    }
    
    createLoadingIndicator() {
        this.loadingIndicator = dcDom.createElement('div', {
            class: 'infinite-scroll-loading'
        }, [this.options.loadingText]);
        
        dcDom.append(this.container, this.loadingIndicator);
    }
    
    handleScroll() {
        if (this.options.loading || !this.options.hasMore) return;
        
        this.checkLoadNeeded();
    }
    
    checkLoadNeeded() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 当滚动到底部附近时
        if (scrollTop + windowHeight >= documentHeight - this.options.threshold) {
            this.loadMore();
        }
    }
    
    loadMore() {
        if (this.options.loading || !this.options.hasMore) return;
        
        this.options.loading = true;
        this.showLoading(true);
        
        // 调用加载回调
        this.loadMoreCallback((success, hasMore) => {
            // 加载完成
            this.options.loading = false;
            this.options.hasMore = hasMore !== false;
            this.showLoading(false);
            
            // 再次检查是否需要加载更多
            this.checkLoadNeeded();
            
            // 触发加载完成事件
            dcEvent.trigger(this.container, 'loadmore.complete', {
                success: success,
                hasMore: this.options.hasMore
            });
        });
    }
    
    showLoading(show) {
        if (this.loadingIndicator) {
            this.loadingIndicator.textContent = show 
                ? this.options.loadingText 
                : (this.options.hasMore ? this.options.loadingText : this.options.finishedText);
            
            if (!show) {
                // 如果没有更多内容，禁用
                this.loadingIndicator.style.opacity = '0.5';
            }
        }
    }
    
    destroy() {
        // 移除所有事件
        dcEvent.off(window, 'scroll');
        dcEvent.off(window, 'resize');
        
        // 移除加载指示器
        if (this.loadingIndicator && this.loadingIndicator.parentNode) {
            this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
        }
        
        console.log('无限滚动已销毁');
    }
}

// 使用示例
const infiniteScroll = new InfiniteScroll('#content-container', function(done) {
    // 模拟异步加载
    setTimeout(() => {
        // 添加新内容
        for (let i = 0; i < 10; i++) {
            const item = dcDom.createElement('div', {
                class: 'content-item'
            }, [`内容项 ${Math.random().toString(36).substr(2, 9)}`]);
            dcDom.append(dcDom.query('#content-container'), item);
        }
        
        // 通知加载完成
        done(true, Math.random() > 0.3); // 70%概率还有更多内容
    }, 1000);
});

// 监听加载完成事件
dcEvent.on('#content-container', 'loadmore.complete', function(e, data) {
    console.log('加载完成:', data);
    
    if (!data.success) {
        alert('加载失败，请重试');
    }
});
```

## 注意事项
- **性能考虑**: 频繁的事件操作会影响性能，建议批量操作
- **内存泄漏**: 移除元素前应先移除事件监听器，避免内存泄漏
- **浏览器兼容性**: 虽然大多数现代浏览器都支持，但在IE等老版本浏览器中可能需要polyfill
- **事件冒泡**: 理解事件冒泡机制，合理使用stopPropagation()
- **事件捕获**: 了解事件捕获和冒泡阶段的区别
- **内存管理**: 对于长期运行的应用，注意及时清理不再需要的事件监听器
- **命名空间冲突**: 合理规划命名空间，避免冲突
- **调试困难**: 大量事件监听器可能导致调试困难，建议添加调试信息

## 常见问题

**Q: 如何处理动态创建元素的事件绑定？**
A: 有几种方法：

1. **立即绑定**: 创建元素后立即绑定事件
```javascript
const button = dcDom.createElement('button', {}, ['点击我']);
dcEvent.on(button, 'click', () => {
    alert('按钮被点击');
});
```

2. **事件委托**: 为父容器绑定事件，利用事件冒泡
```javascript
// 为列表容器绑定事件
const list = dcDom.query('#item-list');
dcEvent.delegate(list, 'button', 'click', function(e) {
    // 检查点击的是哪个子元素
    console.log('点击了按钮:', e.target.textContent);
});
```

3. **使用once方法**: 一次性事件
```javascript
// 只执行一次的初始化
const initBtn = dcDom.createElement('button', {}, ['初始化']);
dcEvent.once(initBtn, 'click', function() {
    initializeApp();
    dcDom.addClass(this, 'initialized');
});
```

**Q: 如何实现元素的平滑滚动到指定位置？**
A: 可以使用window.scrollTo配合requestAnimationFrame实现：
```javascript
function smoothScrollTo(element, offset = 0, duration = 500) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    // 缓动函数
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// 使用示例
const targetElement = dcDom.query('#target-section');
dcEvent.on('#scroll-to-target', 'click', () => {
    smoothScrollTo(targetElement, -20, 800);
});
```

**Q: 如何检测元素是否在视口中？**
A: 可以使用getBoundingClientRect方法：
```javascript
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 使用示例
const myElement = dcDom.query('#myElement');
if (isElementInViewport(myElement)) {
    console.log('元素在视口中');
} else {
    console.log('元素不在视口中');
}

// 监听滚动事件
window.addEventListener('scroll', () => {
    if (isElementInViewport(myElement)) {
        dcDom.addClass(myElement, 'visible');
    } else {
        dcDom.removeClass(myElement, 'visible');
    }
});
```

**Q: 如何实现拖拽功能？**
A: 可以结合mousedown、mousemove和mouseup事件实现：
```javascript
function makeDraggable(element) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    
    // 设置元素可拖拽
    dcDom.css(element, 'position', 'absolute');
    dcDom.css(element, 'cursor', 'move');
    
    // mousedown事件
    dcEvent.on(element, 'mousedown', function(e) {
        isDragging = true;
        
        // 计算鼠标相对于元素的偏移
        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        // 防止文本选中
        e.preventDefault();
    });
    
    // mousemove事件
    dcEvent.on(document, 'mousemove', function(e) {
        if (isDragging) {
            // 计算新位置
            const left = e.clientX - offsetX;
            const top = e.clientY - offsetY;
            
            // 设置新位置
            dcDom.css(element, 'left', left + 'px');
            dcDom.css(element, 'top', top + 'px');
        }
    });
    
    // mouseup事件
    dcEvent.on(document, 'mouseup', function() {
        isDragging = false;
    });
}

// 使用示例
makeDraggable(dcDom.query('#draggable-box'));
```

**Q: 如何实现主题切换？**
A: 可以结合事件系统和CSS类来实现：
```javascript
// 主题管理器
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'light';
        this.init();
    }
    
    init() {
        // 应用当前主题
        this.applyTheme(this.currentTheme);
        
        // 绑定主题切换事件
        dcEvent.on(window, 'theme.change', this.handleThemeChange.bind(this));
    }
    
    getStoredTheme() {
        return localStorage.getItem('theme');
    }
    
    storeTheme(theme) {
        localStorage.setItem('theme', theme);
    }
    
    applyTheme(theme) {
        // 移除旧主题类
        dcDom.removeClass(document.body, 'theme-light', 'theme-dark', 'theme-blue');
        
        // 添加新主题类
        dcDom.addClass(document.body, `theme-${theme}`);
        
        // 更新当前主题
        this.currentTheme = theme;
        
        // 存储到本地
        this.storeTheme(theme);
        
        // 触发主题改变事件
        dcEvent.trigger(window, 'theme.changed', { theme });
    }
    
    handleThemeChange(e, data) {
        const theme = data.theme;
        if (theme && theme !== this.currentTheme) {
            this.applyTheme(theme);
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        dcEvent.trigger(window, 'theme.change', { theme: newTheme });
    }
}

// 初始化主题管理器
const themeManager = new ThemeManager();

// 绑定切换按钮
const themeToggle = document.getElementById('theme-toggle');
dcEvent.on(themeToggle, 'click', () => {
    themeManager.toggleTheme();
});

// 监听主题改变
dcEvent.on(window, 'theme.changed', (e, data) => {
    console.log('主题已切换到:', data.theme);
    // 可以在这里更新UI，如切换按钮图标等
});
```

**Q: 如何实现组件间的通信？**
A: 可以使用事件系统作为中介：
```javascript
// 组件间通信示例

class ComponentA {
    constructor() {
        this.init();
    }
    
    init() {
        // 发送消息
        dcEvent.on('#send-message', 'click', () => {
            const message = document.getElementById('message-input').value;
            
            // 触发全局事件
            dcEvent.trigger(window, 'message.sent', {
                sender: 'ComponentA',
                message: message,
                timestamp: Date.now()
            });
        });
    }
}

class ComponentB {
    constructor() {
        this.init();
    }
    
    init() {
        // 接收消息
        dcEvent.on(window, 'message.sent', (e, data) => {
            const messageList = document.getElementById('message-list');
            const item = dcDom.createElement('div', {
                class: 'message-item'
            }, [
                `<strong>${data.sender}</strong>: ${data.message} (${new Date(data.timestamp).toLocaleTimeString()})`
            ]);
            
            dcDom.append(messageList, item);
            
            // 滚动到底部
            messageList.scrollTop = messageList.scrollHeight;
        });
    }
}

// 初始化组件
const componentA = new ComponentA();
const componentB = new ComponentB();
```

**Q: 如何实现防抖和节流？**
A: 可以结合事件系统和定时器实现：
```javascript
// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 使用示例：搜索框防抖
const searchInput = document.getElementById('search-input');
const debouncedSearch = debounce(function(value) {
    console.log('执行搜索:', value);
    // 执行实际的搜索逻辑
}, 300);

dcEvent.on(searchInput, 'input', function(e) {
    debouncedSearch(e.target.value);
});

// 使用示例：窗口大小改变节流
const throttledResize = throttle(function() {
    console.log('调整布局:', window.innerWidth, window.innerHeight);
    // 执行布局调整逻辑
}, 100);

dcEvent.on(window, 'resize', throttledResize);
```

**Q: 如何实现页面状态管理？**
A: 可以使用事件系统结合状态模式：
```javascript
// 页面状态管理器
class PageStateManager {
    constructor() {
        this.states = new Map();
        this.currentState = null;
        this.history = [];
        this.maxHistory = 50;
        this.init();
    }
    
    init() {
        // 绑定状态改变事件
        dcEvent.on(window, 'state.change', this.handleStateChange.bind(this));
        
        // 绑定浏览器前进后退事件
        dcEvent.on(window, 'popstate', this.handlePopState.bind(this));
    }
    
    defineState(name, config) {
        this.states.set(name, {
            enter: config.enter || (() => {}),
            exit: config.exit || (() => {}),
            template: config.template || '',
            data: config.data || {}
        });
    }
    
    changeState(stateName, data = {}) {
        const newState = this.states.get(stateName);
        if (!newState) {
            console.error('未知状态:', stateName);
            return;
        }
        
        // 保存历史
        if (this.currentState) {
            this.history.push({
                state: this.currentState,
                data: this.getCurrentData()
            });
            
            // 限制历史长度
            if (this.history.length > this.maxHistory) {
                this.history.shift();
            }
        }
        
        // 触发状态改变事件
        dcEvent.trigger(window, 'state.changing', {
            from: this.currentState,
            to: stateName,
            data: data
        });
        
        // 退出当前状态
        if (this.currentState) {
            const currentState = this.states.get(this.currentState);
            currentState.exit.call(this, data);
        }
        
        // 进入新状态
        this.currentState = stateName;
        newState.enter.call(this, data);
        
        // 更新URL
        const url = `?state=${stateName}`;
        history.pushState({ state: stateName, data: data }, '', url);
        
        // 触发状态改变完成事件
        dcEvent.trigger(window, 'state.changed', {
            state: stateName,
            data: data
        });
    }
    
    handleStateChange(e, data) {
        this.changeState(data.state, data.data);
    }
    
    handlePopState(e) {
        if (e.state && e.state.state) {
            this.changeState(e.state.state, e.state.data);
        }
    }
    
    getCurrentData() {
        // 获取当前状态数据
        return this.states.get(this.currentState)?.data || {};
    }
    
    goBack() {
        if (this.history.length > 0) {
            const previous = this.history.pop();
            this.changeState(previous.state, previous.data);
            history.back();
        }
    }
}

// 使用示例
const pageState = new PageStateManager();

// 定义状态
pageState.defineState('home', {
    enter: function() {
        console.log('进入首页');
        // 显示首页内容
    },
    exit: function() {
        console.log('离开首页');
        // 隐藏首页内容
    }
});

pageState.defineState('profile', {
    enter: function(data) {
        console.log('进入个人资料页:', data.userId);
        // 显示个人资料
    },
    exit: function() {
        console.log('离开个人资料页');
        // 隐藏个人资料
    }
});

// 绑定导航链接
const homeLink = document.getElementById('home-link');
dcEvent.on(homeLink, 'click', (e) => {
    e.preventDefault();
    pageState.changeState('home');
});

const profileLink = document.getElementById('profile-link');
dcEvent.on(profileLink, 'click', (e) => {
    e.preventDefault();
    pageState.changeState('profile', { userId: 123 });
});

// 监听状态改变
dcEvent.on(window, 'state.changed', (e, data) => {
    console.log('页面状态已改变:', data.state);
    // 可以在这里更新导航栏高亮等
});
```