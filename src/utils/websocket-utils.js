class WebSocketClient {
    // WebSocket 链接 URL
    url = '';
    // WebSocket 实例
    socket = null;
    // 重连尝试次数
    reconnectAttempts = 0;
    // 最大重连尝试次数
    maxReconnectAttempts = 5;
    // 重连尝试间隔时间 (ms)
    reconnectInterval = 10000; // 10 seconds
    // 心跳间隔时间 (ms)
    heartbeatInterval = 1000 * 30;
    // 心跳计时器 ID
    heartbeatTimer = undefined;
    // 彻底终止 WebSocket 连接的标志
    stopWs = false;

    constructor(url) {
        this.url = url;
    }

    // 生命周期钩子
    onopen(callBack) {
        this.addEventListener('open', callBack);
    }
    onmessage(callBack) {
        this.addEventListener('message', callBack);
    }
    onclose(callBack) {
        this.addEventListener('close', callBack);
    }
    onerror(callBack) {
        this.addEventListener('error', callBack);
    }

    // 消息发送
    send(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error('[WebSocket] 未连接');
            // 触发错误事件，供外部处理
            this.dispatchEvent('error', new Error('WebSocket 未连接'));
        }
    }

    // 初始化连接
    connect() {
        if (this.reconnectAttempts === 0) {
            this.log('WebSocket', `初始化连接中...          ${this.url}`);
        }
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            return;
        }
        this.socket = new WebSocket(this.url);

        // WebSocket 连接成功
        this.socket.onopen = event => {
            this.stopWs = false;
            this.reconnectAttempts = 0;
            this.startHeartbeat();
            this.log('WebSocket', `连接成功,等待服务端数据推送[onopen]...     ${this.url}`);
            this.dispatchEvent('open', event);
        };

        this.socket.onmessage = event => {
            this.dispatchEvent('message', event);
            this.startHeartbeat();
        };

        this.socket.onclose = event => {
            if (this.reconnectAttempts === 0) {
                this.log('WebSocket', `连接断开[onclose]...    ${this.url}`);
            }
            if (!this.stopWs) {
                this.handleReconnect();
            }
            this.dispatchEvent('close', event);
        };

        this.socket.onerror = event => {
            this.log('WebSocket', `连接异常[onerror]...    ${this.url}`);
            this.dispatchEvent('error', event);
        };
    }

    // 断网重连逻辑
    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            this.log('WebSocket', `尝试重连... (${this.reconnectAttempts}/${this.maxReconnectAttempts})       ${this.url}`);
            setTimeout(() => this.connect(), this.reconnectInterval);
        } else {
            this.closeHeartbeat();
            this.log('WebSocket', `最大重连失败次数达到，终止重连: ${this.url}`);
        }
    }

    // 关闭连接
    close() {
        if (this.socket) {
            this.stopWs = true;
            this.socket.close();
            this.socket = null;
            this.clearEventListeners();
        }
        this.closeHeartbeat();
    }

    // 开始心跳检测 -> 定时发送心跳消息
    startHeartbeat() {
        if (this.stopWs) return;
        if (this.heartbeatTimer) {
            this.closeHeartbeat();
        }
        this.heartbeatTimer = setInterval(() => {
            if (this.socket) {
                this.socket.send(JSON.stringify({ type: 'heartBeat', data: {} }));
                this.log('WebSocket', '送心跳数据...');
            } else {
                console.error('[WebSocket] 未连接');
                // 如果 socket 不存在，则触发错误事件
                this.dispatchEvent('error', new Error('WebSocket 未连接'));
            }
        }, this.heartbeatInterval);
    }

    // 关闭心跳
    closeHeartbeat() {
        clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = undefined;
    }

    // 清除事件监听器
    addEventListener(type, listener) {
        if (!this[`_${type}`]) this[`_${type}`] = [];
        this[`_${type}`].push(listener);
    }

    removeEventListener(type, listener) {
        if (!this[`_${type}`]) return;
        const index = this[`_${type}`].indexOf(listener);
        if (index > -1) this[`_${type}`].splice(index, 1);
    }

    dispatchEvent(type, data) {
        const listenerArray = this[`_${type}`] || [];
        listenerArray.forEach(listener => listener.call(this, data));
    }

    log(title, text) {
        if (!Log.console || import.meta.env.MODE === 'production') return;
        const color = '#ff4d4f';
        console.log(
            `%c ${title} %c ${text} %c`,
            `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
            `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
            'background:transparent'
        );
    }

    closeConsole() {
        Log.console = false;
    }
}

class Log {
    static console = true;

    closeConsole() {
        Log.console = false;
    }
}

// 导出WebSocketClient
export default WebSocketClient;
