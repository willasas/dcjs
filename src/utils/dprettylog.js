// 定义日志信息的颜色色值
const LOG_LEVELS = {
    info: '#909399',
    error: '#F56C6C',
    warning: '#E6A23C',
    success: '#67C23A',
};

/**
 * 定义一个prettyLog函数，用于在控制台中进行格式化的日志记录。
 * 提供了多种日志记录方法（info、error、warning、success）及特殊日志记录方法（table、picture、environment）。
 */
const dprettylog = () => {
    /**
     * 检查给定值是否为空（null、undefined或空字符串）。
     * @param {*} value - 需要检查的值。
     * @returns {boolean} 如果值为空则返回true，否则返回false。
     */
    const isEmpty = (value) => value == null || value === undefined || value === '';

    /**
     * 获取当前时间戳的ISO格式字符串。
     * @returns {string} 当前的时间戳字符串。
     */
    const getCurrentTimestamp = () => new Date().toISOString();

    /**
     * 以美化的方式打印日志信息。
     * @param {string} level - 日志级别。
     * @param {string} message - 日志消息内容。
     * @param {string} color - 日志颜色代码（六位十六进制）。
     */
    const prettyPrint = (level, message, color) => {
        if (isEmpty(level) || isEmpty(message) || !/^#[0-9A-F]{6}$/i.test(color)) {
            console.error('Invalid input for prettyPrint');
            return;
        }

        const timestamp = getCurrentTimestamp();
        console.log(
            // 美化输出格式设置
            `%c ${level.toUpperCase()} %c [%s] %c ${message} %c`,
            `color: #fff; background-color: ${color}; padding: 1px; border-radius: 2px; font-weight: bold;`, // Level with darker background
            `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px; color: #fff;`, // Timestamp with darker background
            timestamp,
            `color: #333; background-color: transparent; padding: 1px;border: 1px solid ${color};`,
            'background:transparent'
        );
    };

    // 简化调用prettyPrint的函数
    // 默认使用info级别
    const info = (message) => prettyPrint('info', message, LOG_LEVELS.info);
    // 默认使用error级别
    const error = (message) => prettyPrint('error', message, LOG_LEVELS.error);
    // 默认使用warning级别
    const warning = (message) => prettyPrint('warning', message, LOG_LEVELS.warning);
    // 默认使用success级别
    const success = (message) => prettyPrint('success', message, LOG_LEVELS.success);

    // 添加一个以表格形式打印数据的函数
    const table = (data) => {
        // 确保数据是有效的且非空
        if (!Array.isArray(data) || data.length === 0) {
            console.warn('Invalid or empty data provided for table.');
            return;
        }

        const columnNames = Object.keys(data[0]).map((key, index) => data[0][key] !== undefined ? key : `column${index + 1}`);
        const columnCount = columnNames.length;

        let headerLog = '';
        columnNames.forEach((columnName) => {
            headerLog += `%c${columnName.padEnd(15)} `;
        });
        console.log(headerLog, ...columnNames.map(() => `color: white; background-color: black; padding: 2px 10px;`));

        data.forEach((row) => {
            let rowDataLog = '';
            columnNames.forEach((columnName) => {
                const valueStr = String(row[columnName] !== undefined ? row[columnName] : ''); // Ensure conversion to string for missing values
                rowDataLog += `%c${valueStr.padEnd(15)} `;
            });
            console.log(rowDataLog, ...columnNames.map(() => `color: black; background-color: lightgray; padding: 2px 10px;`));
        });
    };

    // 图片日志功能
    const picture = (url, scale = 1, color = LOG_LEVELS.info) => {
        if (isEmpty(url)) {
            console.warn('No URL provided for picture log.');
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const c = document.createElement('canvas');
            const ctx = c.getContext('2d');
            if (ctx) {
                c.width = img.width;
                c.height = img.height;
                ctx.drawImage(img, 0, 0);
                const dataUri = c.toDataURL('image/png');

                // 获取图片基本信息
                const imageName = url.split('/').pop(); // Simple extraction of filename as image name
                const imageSize = `${(img.width * img.height / 1024).toFixed(2)}KB`; // Approximate calculation of image size
                
                // Handle potential errors during console operations
                try {
                    console.groupCollapsed(`Image Details: ${imageName}`);
                    console.log(
                        `%cImage: ${imageName} | Format: PNG | Dimensions: ${img.width}x${img.height} | Size: ${imageSize}`,
                        `color: #fff; background:${color}; padding: 2px 10px; border-radius: 3px;`
                    );
                    console.log(
                        `%c Preview`,
                        `font-size: 1px;
                        padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
                        background-image: url(${dataUri});
                        background-repeat: no-repeat;
                        background-size: ${img.width * scale}px ${img.height * scale}px;
                        color: transparent;
                        `
                    );
                    console.groupEnd();
                } catch (e) {
                    console.error('Error displaying image in console:', e);
                }
            }
        };
        img.onerror = () => console.error('Failed to load image at:', url);
        img.src = url;
    };

    // 打印环境信息到表格
    const environment = () => {
        const userAgent = navigator.userAgent;
        let browserName = 'Unknown Browser';
        let fullVersion = 'Unknown Version';

        // Determine browser name and version
        if (userAgent.indexOf("Chrome") > -1) {
            browserName = 'Google Chrome';
            fullVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)[1];
        } else if (userAgent.indexOf("Firefox") > -1) {
            browserName = 'Mozilla Firefox';
            fullVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)[1];
        } else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) {
            browserName = 'Internet Explorer';
            fullVersion = userAgent.match(/MSIE (\d+\.\d+);/)[1] || userAgent.match(/rv:(\d+\.\d+)./)[1];
        } else if (userAgent.indexOf("Edge") > -1) {
            browserName = 'Microsoft Edge';
            fullVersion = userAgent.match(/Edge\/(\d+\.\d+)/)[1];
        } else if (userAgent.indexOf("Safari") > -1) {
            browserName = 'Apple Safari';
            fullVersion = userAgent.match(/Version\/(\d+\.\d+)/)[1];
        }

        // Prepare data for the table
        const environmentData = [
            { Key: 'Browser Name', Value: browserName },
            { Key: 'Version', Value: fullVersion },
            { Key: 'User Agent', Value: userAgent.substring(0, 100) + (userAgent.length > 100 ? '...' : '') } // Truncate for readability
        ];

        table(environmentData);
    };

    // 返回所有日志方法及特殊功能方法
    return {
        info,
        error,
        warning,
        success,
        picture,
        table,
        environment
    };
};

// 创建prettyLog实例
const dplog = dprettylog();
