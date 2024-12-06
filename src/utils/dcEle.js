/**
 * DOM元素操作工具类
 */
class dcEle {
    constructor() {}

    // 元素创建方法
    /**
     * 从HTML字符串创建新的DOM元素
     * @param {string} str - HTML字符串
     * @returns {HTMLElement} 创建的DOM元素
     */
    static createElement(str) {
        const el = document.createElement('div');
        el.innerHTML = str.trim();
        const firstElement = el.firstElementChild;
        if (!firstElement) {
            console.error('提供的HTML字符串不包含任何元素');
            return document.createElement('div');
        }
        return firstElement;
    }

    /**
     * 通过标签名创建元素
     * @param {string} tagName - 元素标签名
     * @param {Object} [attributes] - 元素属性对象
     * @returns {HTMLElement} 创建的元素
     */
    static createElementByTag(tagName, attributes = {}) {
        if (typeof tagName !== 'string' || /[<>&]/.test(tagName)) {
            console.error('无效的标签名');
            return null;
        }
        const element = document.createElement(tagName);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else {
                element.setAttribute(key, value);
            }
        });
        return element;
    }

    // 元素查找方法
    /**
     * 查找单个元素
     * @param {string} selector - CSS选择器
     * @param {Element} [context=document] - 搜索上下文
     * @returns {Element|null} 找到的元素
     */
    static find(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (e) {
            console.error('无效的选择器:', selector);
            return null;
        }
    }

    /**
     * 查找多个元素
     * @param {string} selector - CSS选择器
     * @param {Element} [context=document] - 搜索上下文
     * @returns {Element[]} 找到的元素数组
     */
    static findAll(selector, context = document) {
        try {
            return Array.from(context.querySelectorAll(selector));
        } catch (e) {
            console.error('无效的选择器:', selector);
            return [];
        }
    }

    // 元素内容操作
    /**
     * 设置或获取元素的文本内容
     * @param {Element} element - 目标元素
     * @param {string} [text] - 要设置的文本，不提供则获取文本
     * @returns {string|undefined} 获取模式下返回文本内容
     */
    static text(element, text) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        if (text === undefined) {
            return element.textContent;
        }
        element.textContent = text;
    }

    /**
     * 设置或获取元素的HTML内容
     * @param {Element} element - 目标元素
     * @param {string} [html] - 要设置的HTML，不提供则获取HTML
     * @returns {string|undefined} 获取模式下返回HTML内容
     */
    static html(element, html) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        if (html === undefined) {
            return element.innerHTML;
        }
        element.innerHTML = html;
    }

    // 元素属性操作
    /**
     * 设置或获取元素的属性
     * @param {Element} element - 目标元素
     * @param {string} name - 属性名
     * @param {string} [value] - 属性值，不提供则获取属性
     * @returns {string|undefined} 获取模式下返回属性值
     */
    static attr(element, name, value) {
        if (!(element instanceof Element) || !name) {
            console.error('无效的元素或属性名');
            return;
        }
        if (value === undefined) {
            return element.getAttribute(name);
        }
        element.setAttribute(name, value);
    }

    /**
     * 移除元素的属性
     * @param {Element} element - 目标元素
     * @param {string} name - 属性名
     */
    static removeAttr(element, name) {
        if (!(element instanceof Element) || !name) {
            console.error('无效的元素或属性名');
            return;
        }
        element.removeAttribute(name);
    }

    // 样式操作
    /**
     * 添加类名
     * @param {Element} element - 元素ID或类名
     * @param {...string} classNames - 要添加的类名
     */
    static addClass(element, ...classNames) {
        // if (!(element instanceof Element)) {
        //     console.error('无效的元素');
        //     return;
        // }
        // element.classList.add(...classNames);

        if (!element || !classNames.length) {
            throw new Error('Element identifier and class names must be provided');
        }
        const elements = document.querySelectorAll(`#${element}, .${element}`);
        if (elements.length === 0) {
            throw new Error(`No elements found with identifier: ${element}`);
        }
        elements.forEach(element => {
            if (element.classList) {
                element.classList.add(...classNames);
            } else {
                const currentClasses = element.className.split(' ');
                classNames.forEach(className => {
                    if (!currentClasses.includes(className)) {
                        currentClasses.push(className);
                    }
                });
                element.className = currentClasses.join(' ');
            }
        });
    }

    /**
     * 移除类名
     * @param {Element} element - 目标元素
     * @param {...string} classNames - 要移除的类名
     */
    static removeClass(element, ...classNames) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        element.classList.remove(...classNames);
    }

    /**
     * 切换类名
     * @param {Element} element - 目标元素
     * @param {string} className - 要切换的类名
     * @param {boolean} [force] - 强制添加或移除
     */
    static toggleClass(element, className, force) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        element.classList.toggle(className, force);
    }

    /**
     * 设置或获取元素的样式
     * @param {Element} element - 目标元素
     * @param {string|Object} property - 样式属性名或样式对象
     * @param {string} [value] - 样式值
     * @returns {string|undefined} 获取模式下返回样式值
     */
    static css(element, property, value) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        if (typeof property === 'object') {
            Object.assign(element.style, property);
            return;
        }
        if (value === undefined) {
            return getComputedStyle(element)[property];
        }
        element.style[property] = value;
    }

    // 元素操作
    /**
     * 插入元素到目标元素之前
     * @param {Element} newElement - 要插入的元素
     * @param {Element} referenceElement - 参考元素
     */
    static insertBefore(newElement, referenceElement) {
        if (!(newElement instanceof Element) || !(referenceElement instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        referenceElement.parentNode?.insertBefore(newElement, referenceElement);
    }

    /**
     * 插入元素到目标元素之后
     * @param {Element} newElement - 要插入的元素
     * @param {Element} referenceElement - 参考元素
     */
    static insertAfter(newElement, referenceElement) {
        if (!(newElement instanceof Element) || !(referenceElement instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        referenceElement.parentNode?.insertBefore(newElement, referenceElement.nextSibling);
    }

    /**
     * 将元素添加到父元素的末尾
     * @param {Element} parent - 父元素
     * @param {Element} child - 子元素
     */
    static append(parent, child) {
        if (!(parent instanceof Element) || !(child instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        parent.appendChild(child);
    }

    /**
     * 将元素添加到父元素的开头
     * @param {Element} parent - 父元素
     * @param {Element} child - 子元素
     */
    static prepend(parent, child) {
        if (!(parent instanceof Element) || !(child instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        parent.insertBefore(child, parent.firstChild);
    }

    /**
     * 移除元素
     * @param {Element} element - 要移除的元素
     */
    static remove(element) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        element.parentNode?.removeChild(element);
    }

    /**
     * 清空元素的内容
     * @param {Element} element - 要清空的元素
     */
    static empty(element) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    /**
     * 克隆元素
     * @param {Element} element - 要克隆的元素
     * @param {boolean} [deep=true] - 是否深度克隆
     * @returns {Element} 克隆的元素
     */
    static clone(element, deep = true) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return null;
        }
        return element.cloneNode(deep);
    }

    /**
     * 替换元素
     * @param {Element} oldElement - 要替换的元素
     * @param {Element} newElement - 新元素
     */
    static replace(oldElement, newElement) {
        if (!(oldElement instanceof Element) || !(newElement instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        oldElement.parentNode?.replaceChild(newElement, oldElement);
    }

    /**
     * 检查元素是否匹配选择器
     * @param {Element} element - 要检查的元素
     * @param {string} selector - CSS选择器
     * @returns {boolean} 是否匹配
     */
    static matches(element, selector) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return false;
        }
        return element.matches(selector);
    }

    /**
     * 获取元素的位置和尺寸信息
     * @param {Element} element - 目标元素
     * @returns {DOMRect} 元素的位置和尺寸信息
     */
    static getBoundingRect(element) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return null;
        }
        return element.getBoundingClientRect();
    }

    /**
     * 检查元素是否可见
     * @param {Element} element - 目标元素
     * @returns {boolean} 元素是否可见
     */
    static isVisible(element) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return false;
        }
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }

    /**
     * 设置元素的显示状态
     * @param {Element} element - 目标元素
     * @param {boolean} visible - 是否显示
     */
    static setVisible(element, visible) {
        if (!(element instanceof Element)) {
            console.error('无效的元素');
            return;
        }
        element.style.display = visible ? '' : 'none';
    }

    /**
     * 从HTML字符串创建新的DOM元素
     * @param {string} str - HTML字符串
     * @returns {HTMLElement} 创建的DOM元素
     */
    static createElement(str) {
        const el = document.createElement('div');
        el.innerHTML = str;
        const firstElement = el.firstElementChild;
        if (!firstElement) {
            console.error('提供的HTML字符串不包含任何元素.');
            return document.createElement('div');
        }
        return firstElement;
    }

    /**
     * 通过标签名创建元素
     * @param {string} tagName - 元素标签名
     * @returns {HTMLElement|null} 创建的元素或null（如果无效）
     */
    static createElementByTagName(tagName) {
        if (typeof tagName !== 'string' || /[<>&]/.test(tagName)) {
            console.warn('Invalid tag name provided.');
            return null;
        }
        try {
            return document.createElement(tagName);
        } catch (error) {
            console.error(`Error creating element: ${error}`);
            return null;
        }
    }

    /**
     * 创建带有类和ID的元素
     * @param {string} elementTag - 元素标签名
     * @param {string} cssClassName - CSS类名
     * @param {string} htmlId - HTML ID
     * @returns {HTMLElement} 创建的元素
     */
    static createElementWithClassAndId(elementTag, cssClassName, htmlId) {
        if (typeof elementTag !== 'string' || typeof cssClassName !== 'string' || typeof htmlId !== 'string') {
            throw new TypeError('参数必须为字符串类型');
        }
        if (document.getElementById(htmlId)) {
            throw new Error(`ID "${htmlId}" 已经存在`);
        }
        let element = document.createElement(elementTag);
        element.className = cssClassName;
        element.id = htmlId;
        return element;
    }

    /**
     * 将元素添加到文档主体
     * @param {Element} element - 要添加的元素
     */
    static addToBody(element) {
        if (!(element instanceof Element)) {
            console.error('Invalid element provided');
            return;
        }
        document.body.appendChild(element);
    }

    /**
     * 检查元素是否包含另一个元素
     * @param {Element} parent - 父元素
     * @param {Element} child - 子元素
     * @returns {boolean} 如果父元素包含子元素，则为true
     */
    static elementContains(parent, child) {
        if (!(parent instanceof Element) || !(child instanceof Element)) {
            return false;
        }
        return parent !== child && parent.contains(child);
    }

    /**
     * 检查元素是否具有某个类
     * @param {Element} el - 要检查的元素
     * @param {string} className - 要检查的类名
     * @returns {boolean} 如果元素具有该类，则为true
     */
    static hasClass(el, className) {
        if (!el || !className) return false;
        if (el.classList) return el.classList.contains(className);
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }

    /**
     * 为元素添加类
     * @param {string} elementIdentifier - 元素ID或类名
     * @param {string} classNameToAdd - 要添加的类名
     */
    static addClass(elementIdentifier, classNameToAdd) {
        if (!elementIdentifier || !classNameToAdd) {
            throw new Error('Element identifier and class name must be provided');
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(classNameToAdd)) {
            throw new Error('Invalid class name format');
        }
        const elements = document.querySelectorAll(`#${elementIdentifier}, .${elementIdentifier}`);
        if (elements.length === 0) {
            throw new Error(`No elements found with identifier: ${elementIdentifier}`);
        }
        elements.forEach(element => {
            if (element.classList) {
                element.classList.add(classNameToAdd);
            } else {
                const currentClasses = element.className.split(' ');
                if (!currentClasses.includes(classNameToAdd)) {
                    element.className += ' ' + classNameToAdd;
                }
            }
        });
    }

    /**
     * 从元素中删除类
     * @param {string} eleId - 元素ID或类名
     * @param {string} eleClassName - 要删除的类名
     */
    static removeClass(eleId, eleClassName) {
        const elements = document.querySelectorAll(`#${eleId}, .${eleId}`);
        elements.forEach(element => {
            if (element.classList) {
                element.classList.remove(eleClassName);
            } else {
                element.className = element.className
                    .replace(new RegExp('(^|\\b)' + eleClassName.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
                    .trim();
            }
        });
    }

    /**
     * 切换元素的类
     * @param {Element} el - 要切换类的元素
     * @param {string} className - 要切换的类名
     * @returns {boolean} 如果类被添加，则为true，如果类被删除，则为false
     */
    static toggleClass(el, className) {
        if (!el || !className || !(el instanceof Element)) return;
        if (el.classList) {
            el.classList.toggle(className);
            return el.classList.contains(className);
        }
        const classes = el.className.split(' ');
        const existingIndex = classes.indexOf(className);
        if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
            el.className = classes.join(' ');
            return false;
        } else {
            classes.push(className);
            el.className = classes.join(' ');
            return true;
        }
    }

    /**
     * 设置元素的样式
     * @param {Element} el - 要设置样式的元素
     * @param {string} ruleName - 样式规则名
     * @param {string} val - 样式值
     */
    static setStyle(el, ruleName, val) {
        if (!el || !ruleName) return;
        if (el.style) {
            try {
                el.style[ruleName] = val;
            } catch (e) {
                console.error(`Error setting style "${ruleName}": ${e.message}`);
            }
        }
    }

    /**
     * 添加样式表到文档
     * @param {string} styleRule - CSS样式规则
     */
    static addSheet(styleRule) {
        if (!styleRule) return;
        try {
            const styleEl = document.createElement('style');
            styleEl.type = 'text/css';
            if (styleEl.styleSheet) {
                styleEl.styleSheet.cssText = styleRule;
            } else {
                styleEl.appendChild(document.createTextNode(styleRule));
            }
            document.getElementsByTagName('head')[0].appendChild(styleEl);
        } catch (e) {
            console.error('Error adding stylesheet:', e);
        }
    }

    /**
     * 为元素添加内联样式（通过ID）
     * @param {string} eleId - 元素ID
     * @param {string} eleCss - CSS样式文本
     */
    static addInlineStyleById(eleId, eleCss) {
        const element = document.getElementById(eleId);
        if (element && eleCss) {
            element.style.cssText += eleCss;
        }
    }

    /**
     * 为元素添加内联样式（通过类名）
     * @param {string} eleClass - 元素类名
     * @param {string} eleCss - CSS样式文本
     */
    static addInlineStyleByClass(eleClass, eleCss) {
        const elements = document.getElementsByClassName(eleClass);
        if (elements && eleCss) {
            Array.from(elements).forEach(element => {
                element.style.cssText += eleCss;
            });
        }
    }

    /**
     * 设置元素的文本内容（通过ID或类名）
     * @param {string} ele - 元素ID或类名
     * @param {string} eleText - 要设置的文本内容
     */
    static setTextContentByIdOrClassName(ele, eleText) {
        const elements = document.querySelectorAll(`#${ele}, .${ele}`);
        if (elements.length === 0) {
            throw new Error(`No elements found with identifier: ${ele}`);
        }
        elements.forEach(element => {
            element.textContent = eleText;
        });
    }

    /**
     * 设置选项卡切换功能
     * @param {string} headSelector - 选项卡头部选择器
     * @param {string} bodySelector - 选项卡内容选择器
     */
    static setupTabSwitching(headSelector, bodySelector) {
        const heads = document.querySelectorAll(headSelector);
        const bodies = document.querySelectorAll(bodySelector);
        
        if (heads.length !== bodies.length) {
            console.error('Tab headers and bodies count mismatch');
            return;
        }

        heads.forEach((head, index) => {
            head.addEventListener('click', () => {
                heads.forEach(h => h.classList.remove('active'));
                bodies.forEach(b => b.classList.remove('active'));
                
                head.classList.add('active');
                bodies[index].classList.add('active');
            });
        });
    }
}

window.DC = window.DC || {};
window.DC.Ele = dcEle;