# dcDom 工具类

## 概述
`dcDom` 是一个轻量级的DOM操作工具库，提供了一套简洁的API来简化JavaScript中的DOM查询、创建、修改和事件处理操作。它旨在减少原生DOM API的复杂性，提高开发效率。

## 功能特性
- **链式调用**: 支持方法链式调用，代码更简洁
- **跨浏览器兼容**: 兼容各种现代浏览器
- **性能优化**: 高效的DOM操作算法
- **错误处理**: 合理处理边界情况和异常输入
- **类型安全**: 对输入参数进行验证
- **无依赖**: 纯JavaScript实现，不依赖其他库

## 引入方式

### 方式1: 通过script标签引入
```html
<script src="dist/dc.js"></script>
```

### 方式2: 通过模块导入
```javascript
import { dcDom } from './src/utils/dcDom.js';
```

## API文档

### query(selector)
通过CSS选择器查找单个元素。

**参数**:
- `selector` (string): CSS选择器字符串

**返回值**:
- (Element | null): 找到的元素，如果未找到则返回null

**示例**:
```javascript
// 获取ID为testDiv的元素
dcDom.query('#testDiv');

// 获取第一个类名为test-class的元素
dcDom.query('.test-class');

// 获取页面上的第一个div元素
dcDom.query('div');

// 获取指定父元素下的子元素
dcDom.query('#container .child-item');
```

### queryAll(selector)
通过CSS选择器查找所有匹配的元素。

**参数**:
- `selector` (string): CSS选择器字符串

**返回值**:
- (NodeList): 包含所有匹配元素的NodeList

**示例**:
```javascript
// 获取所有类名为multi-test的元素
dcDom.queryAll('.multi-test');

// 获取容器内的所有段落元素
dcDom.queryAll('#container p');

// 获取所有input元素
dcDom.queryAll('input');

// 遍历所有匹配的元素
const elements = dcDom.queryAll('.item');
elements.forEach(element => {
    console.log(element.textContent);
});
```

### createElement(tagName, attributes, children)
创建一个新的DOM元素。

**参数**:
- `tagName` (string): 要创建的元素标签名
- `attributes` (object, 可选): 元素属性对象
- `children` (array, 可选): 子元素数组或文本内容数组

**返回值**:
- (Element): 创建的新元素

**示例**:
```javascript
// 创建简单的div元素
dcDom.createElement('div');

// 创建带属性的input元素
const input = dcDom.createElement('input', {
    type: 'text',
    name: 'username',
    id: 'username-input',
    placeholder: '请输入用户名'
});

// 创建带文本内容的p元素
dcDom.createElement('p', {}, ['这是一段文本']);

// 创建复杂的嵌套结构
const container = dcDom.createElement('div', {
    id: 'main-container',
    class: 'container'
}, [
    dcDom.createElement('h1', {}, ['标题']),
    dcDom.createElement('p', { class: 'content' }, ['内容']),
    dcDom.createElement('button', {
        class: 'btn btn-primary',
        onclick: 'alert("点击了按钮")'
    }, ['点击我'])
]);

// 将创建的元素添加到页面
document.body.appendChild(container);
```

### attr(element, name, value)
获取或设置元素的属性。

**参数**:
- `element` (Element): 目标元素
- `name` (string | object): 属性名或属性对象
- `value` (any, 可选): 属性值（当name为字符串时）


**返回值**:
- (string | void): 获取属性时返回属性值，设置属性时无返回值

**示例**:
```javascript
// 获取元素的id属性
const id = dcDom.attr(element, 'id');
console.log(id); // 输出元素的ID

// 设置单个属性
const div = document.createElement('div');
dcDom.attr(div, 'data-role', 'container');
dcDom.attr(div, 'title', '这是一个提示');

// 设置多个属性
const button = document.createElement('button');
dcDom.attr(button, {
    'class': 'btn btn-primary',
    'type': 'submit',
    'disabled': 'disabled'
});

// 移除属性（设置为null或空字符串）
dcDom.attr(div, 'data-role', '');
```

### removeAttr(element, name)
移除元素的指定属性。

**参数**:
- `element` (Element): 目标元素
- `name` (string): 要移除的属性名

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 移除元素的data属性
dcDom.removeAttr(element, 'data-temp');

// 移除禁用状态
dcDom.removeAttr(button, 'disabled');

// 注意：不能直接移除某些内置属性如class、style等，应该使用相应的方法
```

### css(element, property, value)
获取或设置元素的CSS样式。

**参数**:
- `element` (Element): 目标元素
- `property` (string | object): CSS属性名或属性对象
- `value` (string, 可选): 样式值（当property为字符串时）


**返回值**:
- (string | void): 获取样式时返回样式值，设置样式时无返回值

**示例**:
```javascript
// 获取元素的颜色样式
const color = dcDom.css(element, 'color');
console.log(color); // 输出颜色值

// 设置单个样式
const div = document.createElement('div');
dcDom.css(div, 'color', 'red');
dcDom.css(div, 'font-size', '16px');

// 注意：CSS属性名使用驼峰命名法，如fontSize而不是font-size

// 设置多个样式
const box = document.createElement('div');
dcDom.css(box, {
    width: '200px',
    height: '100px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px'
});

// 设置响应式样式
function updateStyles() {
    const width = window.innerWidth;
    if (width < 768) {
        dcDom.css(element, 'fontSize', '14px');
    } else {
        dcDom.css(element, 'fontSize', '16px');
    }
}

window.addEventListener('resize', updateStyles);
```

### addClass(element, className)
为元素添加一个或多个类名。

**参数**:
- `element` (Element): 目标元素
- `className` (string): 类名字符串，多个类名用空格分隔

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 添加单个类
const div = document.getElementById('myDiv');
dcDom.addClass(div, 'highlight');

// 添加多个类
dcDom.addClass(div, 'active visible');

// 条件性添加类
if (condition) {
    dcDom.addClass(element, 'success');
} else {
    dcDom.addClass(element, 'error');
}

// 动态添加类
function setStatus(element, status) {
    dcDom.removeClass(element, 'success error warning'); // 先移除旧类
    dcDom.addClass(element, status); // 再添加新类
}
```

### removeClass(element, className)
从元素中移除一个或多个类名。

**参数**:
- `element` (Element): 目标元素
- `className` (string): 类名字符串，多个类名用空格分隔

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 移除单个类
const div = document.getElementById('myDiv');
dcDom.removeClass(div, 'highlight');

// 移除多个类
dcDom.removeClass(div, 'active visible');

// 移除所有特定前缀的类
function removePrefixClasses(element, prefix) {
    const classes = Array.from(element.classList);
    const toRemove = classes.filter(cls => cls.startsWith(prefix));
    if (toRemove.length > 0) {
        dcDom.removeClass(element, toRemove.join(' '));
    }
}

// 使用示例
dcDom.removeClass(element, 'theme-*'); // 这需要自定义实现
```

### toggleClass(element, className)
切换元素的类名（存在则移除，不存在则添加）。

**参数**:
- `element` (Element): 目标元素
- `className` (string): 要切换的类名

**返回值**:
- (boolean): 切换后的状态，true表示添加了类，false表示移除了类

**示例**:
```javascript
// 切换高亮类
const button = document.getElementById('toggleBtn');
dcDom.on(button, 'click', () => {
    const isActive = dcDom.toggleClass(element, 'active');
    console.log(isActive ? '激活状态' : '非激活状态');
});

// 实现主题切换
const themeToggle = document.getElementById('theme-toggle');
dcDom.on(themeToggle, 'click', () => {
    const isDark = dcDom.toggleClass(document.body, 'dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 多状态切换
function cycleStates(element) {
    // 移除所有状态类
    dcDom.removeClass(element, 'state-a state-b state-c');
    
    // 根据当前状态切换到下一个
    if (dcDom.hasClass(element, 'state-a')) {
        dcDom.addClass(element, 'state-b');
    } else if (dcDom.hasClass(element, 'state-b')) {
        dcDom.addClass(element, 'state-c');
    } else {
        dcDom.addClass(element, 'state-a');
    }
}
```

### hasClass(element, className)
检查元素是否包含指定的类名。

**参数**:
- `element` (Element): 目标元素
- `className` (string): 要检查的类名

**返回值**:
- (boolean): 如果元素包含该类名则返回true，否则返回false

**示例**:
```javascript
// 检查元素状态
const element = document.getElementById('myElement');
if (dcDom.hasClass(element, 'active')) {
    console.log('元素处于激活状态');
}

// 条件性操作
if (!dcDom.hasClass(element, 'processed')) {
    processElement(element);
    dcDom.addClass(element, 'processed');
}

// 表单验证
function validateForm() {
    const inputs = dcDom.queryAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            if (!dcDom.hasClass(input, 'error')) {
                dcDom.addClass(input, 'error');
                dcDom.attr(input, 'title', '此字段不能为空');
            }
            isValid = false;
        } else {
            dcDom.removeClass(input, 'error');
        }
    });
    
    return isValid;
}
```

### append(parent, child)
将子元素添加到父元素的末尾。

**参数**:
- `parent` (Element): 父元素
- `child` (Element | string): 要添加的子元素或HTML字符串

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 添加单个元素
const container = document.getElementById('container');
const newDiv = dcDom.createElement('div', {}, ['新内容']);
dcDom.append(container, newDiv);

// 添加多个元素
const items = ['苹果', '香蕉', '橙子'];
items.forEach(item => {
    const li = dcDom.createElement('li', {}, [item]);
    dcDom.append(container, li);
});

// 动态加载内容
function loadMoreItems() {
    fetch('/api/items')
        .then(response => response.json())
        .then(items => {
            items.forEach(item => {
                const itemElement = createItemElement(item);
                dcDom.append(container, itemElement);
            });
        });
}
```

### prepend(parent, child)
将子元素添加到父元素的开头。

**参数**:
- `parent` (Element): 父元素
- `child` (Element | string): 要添加的子元素或HTML字符串

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 在开头添加通知
const notifications = document.getElementById('notifications');
const newNotification = dcDom.createElement('div', {
    class: 'notification'
}, ['新的通知']);
dcDom.prepend(notifications, newNotification);

// 实现消息列表，最新消息在最上面
function addMessage(message) {
    const messageElement = createMessageElement(message);
    dcDom.prepend(messageList, messageElement);
}

// 添加系统消息
function addSystemMessage(text) {
    const systemMsg = dcDom.createElement('div', {
        class: 'system-message'
    }, [`[${new Date().toLocaleTimeString()}] ${text}`]);
    dcDom.prepend(chatContainer, systemMsg);
}
```

### before(target, element)
在目标元素之前插入一个元素。

**参数**:
- `target` (Element): 目标元素
- `element` (Element | string): 要插入的元素或HTML字符串

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 在现有元素前插入
const existingElement = document.getElementById('existing');
const newElement = dcDom.createElement('div', {}, ['新元素']);
dcDom.before(existingElement, newElement);

// 实现可折叠内容
function makeCollapsible(element) {
    const toggleButton = dcDom.createElement('button', {
        class: 'collapse-toggle'
    }, ['展开/收起']);
    
    // 在元素前插入切换按钮
    dcDom.before(element, toggleButton);
    
    // 绑定事件
    dcDom.on(toggleButton, 'click', () => {
        dcDom.toggleClass(element, 'collapsed');
    });
}

// 插入分隔线
function insertDivider(target) {
    const divider = dcDom.createElement('hr', {
        class: 'section-divider'
    });
    dcDom.before(target, divider);
}
```

### after(target, element)
在目标元素之后插入一个元素。

**参数**:
- `target` (Element): 目标元素
- `element` (Element | string): 要插入的元素或HTML字符串

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 在现有元素后插入
const existingElement = document.getElementById('existing');
const newElement = dcDom.createElement('div', {}, ['后续内容']);
dcDom.after(existingElement, newElement);

// 实现评论回复
function addReply(commentElement, replyContent) {
    const replyElement = createReplyElement(replyContent);
    dcDom.after(commentElement, replyElement);
}

// 添加页脚信息
function addFooterInfo(target) {
    const footer = dcDom.createElement('div', {
        class: 'footer-info'
    }, [`最后更新: ${new Date().toLocaleString()}`]);
    dcDom.after(target, footer);
}
```

### remove(element)
从DOM中移除指定的元素。

**参数**:
- `element` (Element): 要移除的元素

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 移除单个元素
const elementToRemove = document.getElementById('temp-element');
dcDom.remove(elementToRemove);

// 移除多个元素
const tempElements = dcDom.queryAll('.temp');
tempElements.forEach(element => {
    dcDom.remove(element);
});

// 条件性移除
function cleanup() {
    const oldItems = dcDom.queryAll('.old-item');
    oldItems.forEach(item => {
        if (shouldRemove(item)) {
            dcDom.remove(item);
        }
    });
}

// 移除事件监听器后移除元素
function safeRemove(element) {
    // 先移除事件监听器
    dcDom.off(element, 'click');
    dcDom.off(element, 'mouseover');
    
    // 再移除元素
    dcDom.remove(element);
}
```

### empty(element)
清空元素的所有子内容。

**参数**:
- `element` (Element): 要清空的元素

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 清空容器
const container = document.getElementById('container');
dcDom.empty(container);

// 重置表单
function resetForm() {
    const form = document.getElementById('myForm');
    dcDom.empty(form);
    // 或者只清空特定区域
    dcDom.empty(dcDom.query('#form-messages'));
}

// 更新列表内容
function updateList(newItems) {
    const list = document.getElementById('item-list');
    
    // 先清空旧内容
    dcDom.empty(list);
    
    // 再添加新内容
    newItems.forEach(item => {
        const itemElement = createItemElement(item);
        dcDom.append(list, itemElement);
    });
}

// 清空临时数据
function clearTempData() {
    dcDom.empty(dcDom.query('#temp-storage'));
}
```

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
dcDom.on(button, 'click', function(e) {
    console.log('按钮被点击');
    // e是事件对象
});

// 绑定多个事件
const input = document.getElementById('myInput');
dcDom.on(input, 'focus', function() {
    dcDom.addClass(this, 'focused');
});
dcDom.on(input, 'blur', function() {
    dcDom.removeClass(this, 'focused');
});

// 事件委托
const list = document.getElementById('item-list');
dcDom.on(list, 'click', function(e) {
    // 检查点击的是哪个子元素
    if (e.target.tagName === 'LI') {
        console.log('点击了列表项:', e.target.textContent);
    }
});

// 键盘事件
dcDom.on(document, 'keydown', function(e) {
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
dcDom.on(button, 'click', clickHandler);

// 移除事件
dcDom.off(button, 'click', clickHandler);

// 移除所有事件
// 注意：需要保存处理器引用才能正确移除
class EventHandler {
    constructor() {
        this.handlers = new Map();
    }
    
    add(element, event, handler) {
        dcDom.on(element, event, handler);
        
        // 保存引用以便后续移除
        const key = `${element.id || element.tagName}_${event}`;
        if (!this.handlers.has(key)) {
            this.handlers.set(key, []);
        }
        this.handlers.get(key).push({ element, event, handler });
    }
    
    remove(element, event, handler) {
        dcDom.off(element, event, handler);
    }
    
    removeAll() {
        this.handlers.forEach(handlers => {
            handlers.forEach(({ element, event, handler }) => {
                dcDom.off(element, event, handler);
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
dcDom.once(initButton, 'click', function() {
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
        dcDom.once(document, 'click', function() {
            dcDom.remove(tip);
            localStorage.setItem('seen-tip', 'true');
        });
    }
}

// 单次动画效果
const animateOnce = document.getElementById('animate-once');
dcDom.once(animateOnce, 'mouseenter', function() {
    dcDom.addClass(this, 'animated');
    setTimeout(() => {
        dcDom.removeClass(this, 'animated');
    }, 1000);
});
```

### trigger(element, event)
手动触发元素的指定事件。

**参数**:
- `element` (Element): 目标元素
- `event` (string): 事件类型

**返回值**:
- (void): 无返回值

**示例**:
```javascript
// 触发点击事件
const button = document.getElementById('myButton');
// 绑定事件
dcDom.on(button, 'click', function() {
    console.log('按钮被点击');
});

// 手动触发
dcDom.trigger(button, 'click');

// 表单验证触发
const form = document.getElementById('myForm');
dcDom.on(form, 'validate', function() {
    const isValid = validateForm();
    if (!isValid) {
        dcDom.addClass(this, 'invalid');
    } else {
        dcDom.removeClass(this, 'invalid');
    }
});

// 手动触发验证
dcDom.trigger(form, 'validate');

// 自定义事件通信
const cart = document.getElementById('cart');
dcDom.on(cart, 'itemAdded', function(e, item) {
    updateCartDisplay(item);
    showNotification(`已添加 ${item.name} 到购物车`);
});

// 添加商品时触发事件
function addItemToCart(item) {
    addToCart(item);
    dcDom.trigger(cart, 'itemAdded', item);
}
```

## 使用示例

### 基础使用
```javascript
// 创建一个动态的用户卡片
function createUserCard(user) {
    // 创建外层容器
    const card = dcDom.createElement('div', {
        class: 'user-card',
        'data-user-id': user.id
    });
    
    // 创建头像
    const avatar = dcDom.createElement('img', {
        class: 'avatar',
        src: user.avatar || 'default-avatar.png',
        alt: `头像 - ${user.name}`
    });
    
    // 创建信息容器
    const info = dcDom.createElement('div', {
        class: 'user-info'
    });
    
    // 添加用户名
    const name = dcDom.createElement('h3', {
        class: 'user-name'
    }, [user.name]);
    
    // 添加用户简介
    const bio = dcDom.createElement('p', {
        class: 'user-bio'
    }, [user.bio || '暂无简介']);
    
    // 组装
    dcDom.append(info, name);
    dcDom.append(info, bio);
    dcDom.append(card, avatar);
    dcDom.append(card, info);
    
    // 添加交互
    dcDom.on(card, 'mouseenter', function() {
        dcDom.addClass(this, 'hovered');
    });
    
    dcDom.on(card, 'mouseleave', function() {
        dcDom.removeClass(this, 'hovered');
    });
    
    return card;
}

// 使用示例
const user = {
    id: 1,
    name: 'Alice',
    bio: '前端开发者',
    avatar: 'alice.jpg'
};

const userCard = createUserCard(user);
document.body.appendChild(userCard);
```

### 动态列表管理
```javascript
// 列表管理器
class ListManager {
    constructor(containerId) {
        this.container = dcDom.query(containerId);
        this.items = [];
        this.render();
    }
    
    addItem(content) {
        // 创建项目元素
        const item = dcDom.createElement('div', {
            class: 'list-item'
        });
        
        // 创建内容
        const contentSpan = dcDom.createElement('span', {
            class: 'item-content'
        }, [content]);
        
        // 创建删除按钮
        const deleteBtn = dcDom.createElement('button', {
            class: 'delete-btn'
        }, ['×']);
        
        // 绑定删除事件
        dcDom.on(deleteBtn, 'click', () => {
            this.removeItem(item);
        });
        
        // 组装
        dcDom.append(item, contentSpan);
        dcDom.append(item, deleteBtn);
        
        // 添加到容器
        dcDom.append(this.container, item);
        
        // 保存引用
        this.items.push({
            element: item,
            content: content
        });
        
        return item;
    }
    
    removeItem(element) {
        // 从数组中移除
        this.items = this.items.filter(item => item.element !== element);
        
        // 从DOM中移除
        dcDom.remove(element);
    }
    
    clear() {
        // 移除所有事件监听器
        this.items.forEach(item => {
            dcDom.off(item.element, 'click');
        });
        
        // 清空容器
        dcDom.empty(this.container);
        
        // 清空数组
        this.items = [];
    }
    
    render() {
        // 渲染初始状态
        if (this.items.length === 0) {
            const emptyMsg = dcDom.createElement('div', {
                class: 'empty-message'
            }, ['暂无项目']);
            dcDom.append(this.container, emptyMsg);
        }
    }
}

// 使用示例
const list = new ListManager('#todo-list');
list.addItem('学习JavaScript');
list.addItem('练习编程');
list.addItem('阅读文档');
```

### 模态框组件
```javascript
// 模态框类
class Modal {
    constructor(options = {}) {
        this.options = Object.assign({
            title: '模态框',
            content: '',
            closable: true,
            closeOnEsc: true,
            closeOnClickOutside: true,
            onOpen: null,
            onClose: null
        }, options);
        
        this.isOpen = false;
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        // 创建遮罩层
        this.overlay = dcDom.createElement('div', {
            class: 'modal-overlay'
        });
        
        // 创建模态框容器
        this.modal = dcDom.createElement('div', {
            class: 'modal-container'
        });
        
        // 创建头部
        this.header = dcDom.createElement('div', {
            class: 'modal-header'
        });
        
        // 创建标题
        this.title = dcDom.createElement('h2', {
            class: 'modal-title'
        }, [this.options.title]);
        
        // 创建关闭按钮
        this.closeBtn = dcDom.createElement('button', {
            class: 'modal-close'
        }, ['×']);
        
        // 创建内容区
        this.content = dcDom.createElement('div', {
            class: 'modal-content'
        });
        
        // 如果内容是字符串，则直接设置文本
        if (typeof this.options.content === 'string') {
            dcDom.append(this.content, this.options.content);
        } else if (this.options.content instanceof Element) {
            // 如果是元素，则添加
            dcDom.append(this.content, this.options.content);
        }
        
        // 组装
        dcDom.append(this.header, this.title);
        if (this.options.closable) {
            dcDom.append(this.header, this.closeBtn);
        }
        dcDom.append(this.modal, this.header);
        dcDom.append(this.modal, this.content);
        dcDom.append(this.overlay, this.modal);
    }
    
    bindEvents() {
        // 绑定关闭按钮事件
        if (this.options.closable) {
            dcDom.on(this.closeBtn, 'click', () => {
                this.close();
            });
        }
        
        // 绑定遮罩层点击事件
        if (this.options.closeOnClickOutside) {
            dcDom.on(this.overlay, 'click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }
        
        // 绑定ESC键事件
        if (this.options.closeOnEsc) {
            dcDom.on(document, 'keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        }
    }
    
    open() {
        if (!this.isOpen) {
            // 添加到页面
            document.body.appendChild(this.overlay);
            
            // 触发打开动画
            setTimeout(() => {
                dcDom.addClass(this.modal, 'open');
                dcDom.addClass(this.overlay, 'show');
            }, 10);
            
            this.isOpen = true;
            
            // 调用回调
            if (typeof this.options.onOpen === 'function') {
                this.options.onOpen.call(this);
            }
        }
    }
    
    close() {
        if (this.isOpen) {
            // 触发关闭动画
            dcDom.removeClass(this.modal, 'open');
            dcDom.removeClass(this.overlay, 'show');
            
            // 延迟移除元素
            setTimeout(() => {
                if (this.overlay.parentNode) {
                    dcDom.remove(this.overlay);
                }
            }, 300);
            
            this.isOpen = false;
            
            // 调用回调
            if (typeof this.options.onClose === 'function') {
                this.options.onClose.call(this);
            }
        }
    }
}

// 使用示例
const modal = new Modal({
    title: '欢迎',
    content: '这是使用dcDom创建的模态框',
    onOpen: function() {
        console.log('模态框已打开');
    },
    onClose: function() {
        console.log('模态框已关闭');
    }
});

// 绑定触发按钮
const openBtn = dcDom.query('#open-modal');
dcDom.on(openBtn, 'click', () => {
    modal.open();
});
```

## 注意事项
- **性能考虑**: 频繁的DOM操作会影响性能，建议批量操作
- **内存泄漏**: 移除元素前应先移除事件监听器，避免内存泄漏
- **浏览器兼容性**: 虽然大多数现代浏览器都支持，但在IE等老版本浏览器中可能需要polyfill
- **安全性**: 动态插入HTML时要注意XSS攻击，建议对用户输入进行转义
- **事件委托**: 对于大量动态元素，建议使用事件委托来提高性能
- **文档碎片**: 大量DOM操作时可以使用DocumentFragment来减少重排
- **异步操作**: DOM操作通常是同步的，但某些情况下（如动画）可能需要异步处理

## 常见问题

**Q: 如何处理动态创建元素的事件绑定？**
A: 有几种方法：

1. **立即绑定**: 创建元素后立即绑定事件
```javascript
const button = dcDom.createElement('button', {}, ['点击我']);
dcDom.on(button, 'click', () => {
    alert('按钮被点击');
});
```

2. **事件委托**: 为父容器绑定事件，利用事件冒泡
```javascript
// 为列表容器绑定事件
const list = dcDom.query('#item-list');
dcDom.on(list, 'click', function(e) {
    // 检查点击的是哪个子元素
    if (e.target.tagName === 'BUTTON') {
        console.log('点击了按钮:', e.target.textContent);
    }
});
```

3. **使用once方法**: 一次性事件
```javascript
// 只执行一次的初始化
const initBtn = dcDom.createElement('button', {}, ['初始化']);
dcDom.once(initBtn, 'click', function() {
    initializeApp();
    dcDom.addClass(this, 'initialized');
});
```

**Q: 如何实现元素的淡入淡出效果？**
A: 可以结合css方法和定时器实现：
```javascript
// 淡入效果
function fadeIn(element, duration = 300) {
    dcDom.css(element, 'opacity', 0);
    dcDom.css(element, 'display', 'block');
    
    let start = null;
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        dcDom.css(element, 'opacity', progress);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
}

// 淡出效果
function fadeOut(element, duration = 300) {
    let start = null;
    const opacity = parseFloat(dcDom.css(element, 'opacity')) || 1;
    
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const currentOpacity = opacity * (1 - progress);
        dcDom.css(element, 'opacity', currentOpacity);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 动画完成后隐藏元素
            dcDom.css(element, 'display', 'none');
        }
    };
    
    requestAnimationFrame(animate);
}

// 使用示例
fadeIn(document.getElementById('myElement'), 500);
fadeOut(document.getElementById('myElement'), 500);
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
    dcDom.on(element, 'mousedown', function(e) {
        isDragging = true;
        
        // 计算鼠标相对于元素的偏移
        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        // 防止文本选中
        e.preventDefault();
    });
    
    // mousemove事件
    dcDom.on(document, 'mousemove', function(e) {
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
    dcDom.on(document, 'mouseup', function() {
        isDragging = false;
    });
}

// 使用示例
makeDraggable(dcDom.query('#draggable-box'));
```

**Q: 如何实现无限滚动？**
A: 可以监听滚动事件，当接近底部时加载更多内容：
```javascript
function setupInfiniteScroll(containerSelector, loadMoreCallback) {
    const container = dcDom.query(containerSelector);
    
    // 滚动事件处理函数
    function handleScroll() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 当滚动到底部附近时（距离底部100px内）
        if (scrollTop + windowHeight >= documentHeight - 100) {
            // 移除事件监听器，防止重复触发
            dcDom.off(window, 'scroll', handleScroll);
            
            // 调用加载更多回调
            loadMoreCallback(function() {
                // 加载完成，重新绑定事件
                dcDom.on(window, 'scroll', handleScroll);
            });
        }
    }
    
    // 绑定滚动事件
    dcDom.on(window, 'scroll', handleScroll);
}

// 使用示例
setupInfiniteScroll('#content-container', function(done) {
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
        done();
    }, 1000);
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
dcDom.on('#scroll-to-target', 'click', () => {
    smoothScrollTo(targetElement, -20, 800);
});
```