/**
 * DCLottery 抽奖组件类
 * @class DCLottery
 * @description 一个简单的JavaScript抽奖组件，支持方形和圆形两种抽奖界面，支持自定义奖项数量和位置
 */
class DCLottery {
    /**
     * @private
     * @description 私有工具方法集合
     */
    utils = {
        /**
         * 添加CSS规则
         * @param {string} selector - CSS选择器
         * @param {Object|string} styleObj - CSS样式对象或字符串
         * @param {number} [pos=0] - 插入位置
         */
        addRule(selector, styleObj, pos = 0) {
            try {
                // 查找或创建具有特定data属性的<style>元素
                let styleSheet = document.querySelector('style[data-dclottery]');
                
                if (!styleSheet) {
                    styleSheet = document.createElement('style');
                    styleSheet.setAttribute('data-dclottery', 'true');
                    document.head.appendChild(styleSheet);
                }

                // 根据styleObj参数类型生成CSS规则文本
                let cssText = '';
                if (typeof styleObj === 'string') {
                    cssText = styleObj.trim();
                } else if (typeof styleObj === 'object') {
                    cssText = Object.entries(styleObj)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join('; ');
                }

                // 构造完整的CSS规则
                const rule = selector.startsWith('@keyframes') 
                    ? `${selector} { ${cssText} }`
                    : `${selector} { ${cssText} }`;

                // 将CSS规则插入到<style>元素的sheet中
                if (styleSheet.sheet) {
                    styleSheet.sheet.insertRule(rule, pos);
                }
            } catch (error) {
                console.error('Failed to add CSS rule:', error);
            }
        },

        /**
         * 检测浏览器类型
         * @returns {string} 浏览器类型
         */
        getBrowser() {
            // 获取浏览器的用户代理字符串
            const ua = window.navigator.userAgent;
            // 检查是否包含Edge特定字符串
            if (ua.includes("Edge")) return "edge";
            // 检查是否包含Firefox特定字符串
            if (ua.includes("Firefox")) return "FF";
            // 检查是否包含Opera特定字符串
            if (ua.includes("Opera")) return "Opera";
            // 检查是否包含IE或Trident特定字符串
            if (ua.includes("MSIE") || ua.includes("Trident/")) {
                // 尝试匹配IE或Trident的版本号
                const version = ua.match(/(?:MSIE |rv:)(\d+\.\d)/)?.[1];
                // 如果匹配到版本号，则返回对应的IE版本
                if (version) return `IE${Math.floor(Number(version))}`;
            }
            // 如果都不是，则返回'other'表示其他浏览器
            return "other";
        },

        /**
         * 检测是否为移动设备
         * @returns {boolean}
         */
        isMobile() {
            return /iphone|ios|android|mini|mobile|mobi|Nokia|Symbian|iPod|iPad|Windows\s+Phone|MQQBrowser|wp7|wp8|UCBrowser7|UCWEB|360\s+Aphone\s+Browser|blackberry/i.test(navigator.userAgent);
        },

        /**
         * 缩放抽奖配置
         * @param {Object} config - 配置对象
         * @param {number} zoom - 缩放比例
         */
        zoom(config, zoom) {
          // 遍历配置对象的每个属性
            for (const [key, value] of Object.entries(config)) {
              // 如果属性值是数字且属性名不是'total'，则将值乘以缩放比例  
              if (typeof value === 'number' && key !== 'total') {
                config[key] = value * zoom;
              } else if (key === 'position') {
                config[key] = value.split(',').map(pos => {
                  // 分割位置信息，并将每个坐标乘以缩放比例
                  const [x, y] = pos.split('_');
                  return `${x * zoom}_${y * zoom}`;
                })
                .join(',');
              }
            }
        },

        /**
         * 检测CSS前缀
         * @returns {{js: string, css: string}} CSS前缀信息
         */
        detectCSSPrefix() {
            // 获取计算样式函数
            const getStyle = window.getComputedStyle;
            // 定义CSS前缀和对应的JS前缀
            const prefixes = {
                '-webkit-': 'webkit',
                '-moz-': 'Moz',
                '-ms-': 'ms',
                '-o-': 'O'
            };
            // 如果没有获取计算样式函数，返回空前缀
            if (!getStyle) return { js: '', css: '' };
            // 创建一个元素并获取其计算样式
            const style = getStyle(document.createElement('div'), null);
            // 定义正则表达式以匹配CSS前缀
            const rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            // 遍历计算样式的属性，寻找匹配的前缀
            for (const key in style) {
                const prefix = key.match(rxPrefixes) || 
                    (+key === +key && style[key].match(rxPrefixes));
                
                // 如果找到匹配的前缀
                if (prefix) {
                    const rawPrefix = prefix[0];
                    // 如果前缀以'-'开头，返回对应的CSS和JS前缀
                    if (rawPrefix.startsWith('-')) {
                        return {
                            css: rawPrefix,
                            js: prefixes[rawPrefix]
                        };
                    }
                    // 否则构造并返回前缀
                    return {
                        css: `-${rawPrefix.toLowerCase()}-`,
                        js: rawPrefix
                    };
                }
            }
            // 如果未找到匹配的前缀，返回空前缀
            return { js: '', css: '' };
        },

        /**
         * 单位转换
         * @param {number} value - 需要转换的值
         * @param {string} unit - 目标单位
         * @returns {string} 转换后的值
         */
        convertUnit(value, unit) {
            // 如果单位是rem，则将值转换为rem
            if (unit === 'rem') {
                return `${(value / 100).toFixed(2)}rem`;
            } else if (unit === 'vw') {
                // 如果单位是vw，则将值转换为vw
                return `${(value / window.innerWidth * 100).toFixed(2)}vw`;
            }
            // 否则返回px单位的值
            return `${value}px`;
        },

        /**
         * 转换所有配置项的单位
         * @param {Object} config - 配置对象
         */
        convertAllUnits(config) {
          // 定义需要转换单位的配置属性列表
          const numberProps = [
              'width', 'height', 'sbtnx', 'sbtny', 'sbtnw', 'sbtnh',
              'boxw', 'boxh', 'bx', 'by', 'sx', 'sy', 'position'
          ];
          // 遍历配置属性列表，转换每个属性的单位
          numberProps.forEach(prop => {
              // 检查配置属性是否为数字类型，如果是则转换其单位
              if (typeof config[prop] === 'number') {
                  config[prop] = this.convertUnit(config[prop], config.unit);
              }
          });
          // 如果配置了位置属性且单位不是像素，则转换位置属性的单位
          if (config.position && config.unit !== 'px') {
            // 分割并转换每个位置坐标，然后重新组合成新的位置属性  
            config.position = config.position.split(',').map(pos => {
              // 分割单个位置坐标并转换为数字类型
              const [x, y] = pos.split('_').map(Number);
              // 转换单个位置坐标的单位并重新组合
              return `${this.convertUnit(x, config.unit).replace(config.unit, '')}_${this.convertUnit(y, config.unit).replace(config.unit, '')}`;
            }).join(',');
          }
        }
    };

    /**
     * @private
     * @description 默认配置
     * 
     */
    defaultConfig = {
      // 抽奖界面灯光效果图片URL
        lighturl: '',
        // 开始按钮图片URL
        starturl: '',
        // 抽奖容器宽度
        width: 800,
        // 抽奖容器高度
        height: 660,
        // 总奖项数量
        total: 18,
        // 开始按钮在容器中的X坐标
        sbtnx: 239,
        // 开始按钮在容器中的Y坐标
        sbtny: 130,
        // 开始按钮宽度
        sbtnw: 320,
        // 开始按钮高度
        sbtnh: 100,
        // 奖项的宽度
        boxw: 100,
        // 奖项的高度
        boxh: 100,
        // 奖项在容器中的位置，格式为："x1_y1,x2_y2,..."
        position: "0_0,128_20,238_20,348_19,459_19,568_19,679_19,19_129,128.8_129,568_129,678_129,19_240,128_240,238_240,349_240,459_239,569_239,679_239",
        // 抽奖容器ID
        contentId: 'swfcontent',
        // 点击开始按钮时触发的事件
        onClickRollEvent: () => {},
        // 抽奖完成时触发的事件
        onCompleteRollEvent: () => {},
        // 旋转半径
        r: null,
        // 抽奖背景图片URL
        b: '',
        // 开始抽奖按钮图片URL
        s: '',
        // 背景图片在容器中的X坐标
        bx: 0,
        // 背景图片在容器中的Y坐标
        by: 0,
        // 开始抽奖按钮在容器中的X坐标
        sx: 0,
        // 开始抽奖按钮在容器中的Y坐标
        sy: 0,
        // 单位（px、rem、vw，默认px）
        unit: "px",
        // 是否响应式布局
        isResponsive: 1,
        // 抽奖形状（方形：square、圆形：circle）
        shape: 'square',
        // 奖品列表配置
        prizes: [],
        // 奖品显示配置
        prizeConfig: {
            // 字体大小
            fontSize: '14px',
            // 字体颜色
            fontColor: '#333',
            // 背景颜色
            bgColor: '#fff',
            // 内边距
            padding: '10px',
            // 文字对齐方式
            textAlign: 'center'
        },
    };

    /**
     * 创建抽奖实例
     * @constructor
     * @param {Object} options - 配置选项
     */
    constructor(options = {}) {
      // 合并默认配置与自定义配置
      this.config = { ...this.defaultConfig, ...options };
        
      // 单位转换，如果配置中的单位不是默认的'px'，则进行单位转换
      if (this.config.unit !== 'px') {
        this.utils.convertAllUnits(this.config);
      }
      // 初始化抽奖实例
      this.init();
      // 添加抽奖状态标志，用于控制抽奖是否正在进行
      this.isRolling = false;
    }

    /**
     * 初始化抽奖组件
     * @private
     */
    init() {
      // 获取容器元素
      const container = document.getElementById(this.config.contentId);
      // 如果找不到容器元素，抛出错误
      if (!container) {
          throw new Error(`找不到容器元素: ${this.config.contentId}`);
      }
      // 如果是移动设备且配置了响应式布局，计算并应用缩放比例
      if (this.utils.isMobile() && this.config.isResponsive) {
          const zoom = container.parentNode.clientWidth / this.config.width || 1;
          this.utils.zoom(this.config, zoom);
      }
      // 初始化样式
      this.initStyles();
      // 初始化DOM结构
      this.initDOM();
      // 确保绑定事件
      this.bindEvents();
    }

    /**
     * 初始化样式
     * @private
     */
    initStyles() {
        // 获取配置信息和CSS前缀
        const { config } = this;
        const prefix = this.utils.detectCSSPrefix().css;
        const clsPre = config.contentId;

        // 添加动画关键帧
        this.utils.addRule(`@keyframes ${clsPre}_move`, `
            0% { opacity: 0; }
            100% { opacity: 1; }
        `);

        // 容器样式
        this.utils.addRule(`.${clsPre}_container`, {
            position: 'relative',
            width: typeof config.width === 'string' ? config.width : `${config.width}${config.unit}`,
            height: typeof config.height === 'string' ? config.height : `${config.height}${config.unit}`,
            margin: '0 auto'
        });

        // 奖品项样式
        this.utils.addRule(`.${clsPre}_prize`, {
            position: 'absolute',
            width: typeof config.boxw === 'string' ? config.boxw : `${config.boxw}${config.unit}`,
            height: typeof config.boxh === 'string' ? config.boxh : `${config.boxh}${config.unit}`,
            'box-sizing': 'border-box',
            'background-color': config.prizeConfig.bgColor,
            padding: config.prizeConfig.padding,
            'font-size': config.prizeConfig.fontSize,
            color: config.prizeConfig.fontColor,
            'text-align': config.prizeConfig.textAlign,
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'flex-direction': 'column',
            overflow: 'hidden'
        });

        // 奖品图片样式
        this.utils.addRule(`.${clsPre}_prize img`, {
            'max-width': '100%',
            'max-height': '60%',
            'margin-bottom': '5px'
        });

        // 开始按钮样式
        const btnStyle = {
            position: 'absolute',
            width: typeof config.sbtnw === 'string' ? config.sbtnw : `${config.sbtnw}${config.unit}`,
            height: typeof config.sbtnh === 'string' ? config.sbtnh : `${config.sbtnh}${config.unit}`,
            left: typeof config.sbtnx === 'string' ? config.sbtnx : `${config.sbtnx}${config.unit}`,
            top: typeof config.sbtny === 'string' ? config.sbtny : `${config.sbtny}${config.unit}`,
            cursor: 'pointer',
            background: `url(${config.starturl}) no-repeat`,
            'background-size': 'contain',
            'z-index': '2'
        };

        // 圆形模式特殊样式
        if (config.shape === 'circle') {
            Object.assign(btnStyle, {
                'border-radius': '50%',
                transform: 'translate(-50%, -50%)'
            });
        }

        this.utils.addRule(`.${clsPre}_start`, btnStyle);

        // 禁用状态样式
        this.utils.addRule(`.${clsPre}_start.disabled`, {
            cursor: 'not-allowed',
            opacity: '0.7',
            pointerEvents: 'none'
        });

        // 选中框样式
        const hoverStyle = {
          position: 'absolute',
          width: typeof config.boxw === 'string' ? config.boxw : `${config.boxw}${config.unit}`,
          height: typeof config.boxh === 'string' ? config.boxh : `${config.boxh}${config.unit}`,
          display: 'none', // 初始状态下隐藏
          'background-image': `url(${config.lighturl})`,
          'background-size': '100% 100%',
          'background-repeat': 'no-repeat',
          'z-index': '1',
          transition: 'all 0.3s ease-out'
        };

        // 圆形模式特殊样式
        if (config.shape === 'circle') {
            Object.assign(hoverStyle, {
                'border-radius': '50%'
            });
        }

        // 添加选中框样式
        this.utils.addRule(`.${clsPre}_hover`, hoverStyle);
    }

    /**
     * 初始化抽奖DOM结构
     * @private
     */
    initDOM() {
        // 获取配置信息
        const { config } = this;
        // 根据配置中的contentId获取容器元素
        const container = document.getElementById(config.contentId);
        // 使用contentId作为类名前缀，以确保样式和结构的唯一性
        const clsPre = config.contentId;

        // 构建HTML字符串，包含奖励项、开始按钮和移动框
        const html = `
            <div class="${clsPre}_container">
                ${this.generatePrizeItems()}
                <a href="javascript:;" class="${clsPre}_start"></a>
                <div class="${clsPre}_hover"></div>
            </div>
        `;

        // 将生成的HTML结构插入到容器中
        container.innerHTML = html;
        
        // 获取开始按钮和移动框的引用，以便后续操作
        this.startBtn = container.querySelector(`.${clsPre}_start`);
        this.moveBox = container.querySelector(`.${clsPre}_hover`);
    }

    /**
     * 生成奖品项HTML
     * @private
     * @returns {string} 奖品项HTML字符串
     */
    generatePrizeItems() {
      // 获取配置对象
      const { config } = this;
      // 将位置配置字符串分割为数组
      const positions = config.position.split(',');
      // 映射每个位置为对应的奖品HTML字符串
      return positions.map((pos, index) => {
        // 将位置字符串分割为x和y坐标
        const [x, y] = pos.split('_');
        // 获取对应位置的奖品信息，如果没有指定奖品，则使用默认名称
        const prize = config.prizes[index] || { name: `奖品${index + 1}` };
        // 将x和y坐标转换为CSS样式中的left和top值
        const left = typeof x === 'string' ? x : `${x}${config.unit}`;
        const top = typeof y === 'string' ? y : `${y}${config.unit}`;
        // 根据奖品和位置信息生成单个奖品项的HTML字符串
          return `
              <div class="${config.contentId}_prize" style="left: ${left}${config.unit}; top: ${top}${config.unit}; ${config.shape === 'circle' ? 'border-radius: 50%;' : ''}">
                  ${prize.image ? `<img src="${prize.image}" alt="${prize.name}">` : ''}
                  <span>${prize.name}</span>
              </div>
          `;
      }).join('');
    }

    /**
     * 绑定事件
     * @private
     */
    bindEvents() {
        // 使用箭头函数保持 this 上下文
        this.startBtn.addEventListener('click', () => {
          // 检查是否正在抽奖，以避免重复触发
          if (!this.isRolling) {  
            this.startLottery();
          }
        });
    }

    /**
     * 禁用抽奖按钮
     * @returns {boolean} 是否成功禁用
     */
    disable() {
      // 检查按钮是否已经被禁用
      if (this.startBtn.classList.contains('disabled')) {
        return false;
      }
      // 添加禁用类以禁用按钮
      this.startBtn.classList.add('disabled');
      return true;
    }

    /**
     * 启用抽奖按钮
     */
    enable() {
      this.startBtn.classList.remove('disabled');
    }

    /**
     * 重置抽奖状态
     */
    reset() {
        this.isRolling = false;
        this.enable();
        this.moveBox.style.display = 'none';
        this.moveBox.style.transition = 'none';
        this.moveBox.style.left = '';
        this.moveBox.style.top = '';
    }

    /**
     * 开始抽奖
     * @param {number} [index] - 指定中奖的奖品索引，不传则随机
     */
    startLottery(index) {
        if (this.isRolling) return; // 防止重复触发
        this.isRolling = true;
          
        if (this.disable()) {
            // 触发点击事件回调
            this.config.onClickRollEvent();

            // 如果指定了索引，使用指定索引，否则随机
            const prizeIndex = typeof index === 'number' ? 
                index : 
                Math.floor(Math.random() * this.config.total);

            // 开始动画
            this.runMarquee(prizeIndex);
        }
    }

    runMarquee(targetIndex) {
        const { config } = this;
        const positions = config.position.split(',').map(pos => pos.split('_').map(Number));
        const marqueeDuration = 3000; // 动画总时长
        const intervalTime = 100; // 每次移动间隔
        let currentIndex = 0;
        let intervalId;

        // 显示光效框并设置初始状态
        this.moveBox.style.cssText = `
            display: block;
            position: absolute;
            width: ${config.boxw}${config.unit};
            height: ${config.boxh}${config.unit};
            background-image: url(${config.lighturl});
            background-size: 100% 100%;
            background-repeat: no-repeat;
            z-index: 1;
            opacity: 1;
            transition: all 0.1s ease-out;
            ${config.shape === 'circle' ? 'border-radius: 50%;' : ''}
        `;

        // 设置初始位置
        const [firstX, firstY] = positions[0];
        this.moveBox.style.left = `${firstX}${config.unit}`;
        this.moveBox.style.top = `${firstY}${config.unit}`;

        // 开始跑马灯效果
        intervalId = setInterval(() => {
            const [x, y] = positions[currentIndex];
            this.moveBox.style.left = `${x}${config.unit}`;
            this.moveBox.style.top = `${y}${config.unit}`;
            currentIndex = (currentIndex + 1) % positions.length;
        }, intervalTime);

        // 停止跑马灯效果并定位到中奖位置
        setTimeout(() => {
            clearInterval(intervalId);
            this.stopRoll(targetIndex);
        }, marqueeDuration);
    }

    /**
     * 停止在指定奖项
     * @param {number} index - 奖项索引
     */
    stopRoll(index) {
        const { config } = this;
        const positions = config.position.split(',');
        
        // 确保索引在有效范围内
        const validIndex = Math.max(0, Math.min(index, positions.length - 1));
        const targetPos = positions[validIndex].split('_');
        
        // 计算位置时添加单位
        const left = `${targetPos[0]}${config.unit}`;
        const top = `${targetPos[1]}${config.unit}`;

        // 设置过渡效果和最终位置
        this.moveBox.style.transition = 'all 0.3s ease-out';
        this.moveBox.style.left = left;
        this.moveBox.style.top = top;

        // 延迟执行回调和启用按钮
        setTimeout(() => {
            const prize = config.prizes[validIndex] || { name: `奖品${validIndex + 1}` };
            this.config.onCompleteRollEvent(prize);
            this.enable();
            this.isRolling = false;
        }, 300);
    }
}

// 导出到全局
window.DC = window.DC || {};
window.DC.Lottery = DCLottery;