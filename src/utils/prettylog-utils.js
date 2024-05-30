/**
 * 定义一个功能丰富的日志工具，提供不同类型的日志输出，仅在非生产环境中生效。
 * 1.在ts中使用配置tsconfig.json如下：
 *    {
     "compilerOptions": {
       "module": "esnext",
       "target": "esnext",
       "lib": ["esnext", "dom"],
       "moduleResolution": "node"
     }
   }
 * 2. 然后，将import.meta.env替换为process.env.NODE_ENV，并确保在运行时设置环境变量NODE_ENV。
 */
const prettyLog = () => {
    // const isProduction = import.meta.env.MODE === 'production'; // 判断是否处于生产环境

    /**
     * 检查给定值是否为空
     * @param {any} value - 待检查的值
     * @returns {boolean} - 如果值为空，返回true，否则返回false
     */
    const isEmpty = (value) => {
        return value == null || value === undefined || value === '';
    };

    /**
     * 格式化并输出彩色日志
     * @param {string} title - 日志标题
     * @param {string} text - 日志正文
     * @param {string} color - 输出的颜色
     */
    const prettyPrint = (title, text, color) => {
        // if (isProduction) return;
        console.log(
            `%c ${title} %c ${text} %c`,
            `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
            `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
            'background:transparent'
        );
    };

    // 定义不同类型的日志方法
    const info = (textOrTitle, content = '') => {
        const title = isEmpty(content) ? 'Info' : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, '#909399');
    };
    const error = (textOrTitle, content = '') => {
        const title = isEmpty(content) ? 'Error' : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, '#F56C6C');
    };
    const warning = (textOrTitle, content = '') => {
        const title = isEmpty(content) ? 'Warning' : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, '#E6A23C');
    };
    const success = (textOrTitle, content = '') => {
        const title = isEmpty(content) ? 'Success ' : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, '#67C23A');
    };

    /**
     * 输出表格日志
     */
    const table = () => {
        const data = [
            { id: 1, name: 'Alice', age: 25 },
            { id: 2, name: 'Bob', age: 30 },
            { id: 3, name: 'Charlie', age: 35 }
        ];

        console.log(
            '%c id%c name%c age',
            'color: white; background-color: black; padding: 2px 10px;',
            'color: white; background-color: black; padding: 2px 10px;',
            'color: white; background-color: black; padding: 2px 10px;'
        );

        data.forEach((row) => {
            console.log(
                `%c ${row.id} %c ${row.name} %c ${row.age} `,
                'color: black; background-color: lightgray; padding: 2px 10px;',
                'color: black; background-color: lightgray; padding: 2px 10px;',
                'color: black; background-color: lightgray; padding: 2px 10px;'
            );
        });
    };

    /**
     * 输出图片日志
     * @param {string} url - 图片URL
     * @param {number} scale - 图片缩放比例，默认为1
     */
    const picture = (url, scale = 1) => {
        // if (isProduction) return;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const c = document.createElement('canvas');
            const ctx = c.getContext('2d');
            if (ctx) {
                c.width = img.width;
                c.height = img.height;
                ctx.fillStyle = 'red';
                ctx.fillRect(0, 0, c.width, c.height);
                ctx.drawImage(img, 0, 0);
                const dataUri = c.toDataURL('image/png');

                console.log(
                    `%c sup?`,
                    `font-size: 1px;
                    padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
                    background-image: url(${dataUri});
                    background-repeat: no-repeat;
                    background-size: ${img.width * scale}px ${img.height * scale}px;
                    color: transparent;
                    `
                );
            }
        };
        img.src = url;
    };

    // 返回日志方法对象
    return {
        info,
        error,
        warning,
        success,
        picture,
        table
    };
};

// 创建日志对象
const log = prettyLog();

// 示例日志输出
log.warning('警告', '这是一条警告信息');
log.error('错误', '这是一条错误信息');
log.info('基础提示', '这是一条普通信息');
log.success('成功', '这是一条成功信息');
log.table();
log.picture('https://picsum.photos/200/300');