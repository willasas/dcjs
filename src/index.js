// index.js
import initGoogleAnalytics from './utils/ga';
import WebSocketClient from './utils/websocket-utils';

// Replace 'UA-190966-1' with your actual Google Analytics account ID
initGoogleAnalytics('UA-190966-1');

// 使用websocket
// 创建 WebSocketClient 实例
const wsClient = new WebSocketClient('wss://your-websocket-url');

// 添加事件监听器
wsClient.onopen = (event) => {
  console.log('WebSocket 连接已打开:', event);
};

wsClient.onmessage = (event) => {
  console.log('收到消息:', event.data);
};

wsClient.onclose = (event) => {
  console.log('WebSocket 连接已关闭:', event);
};

wsClient.onerror = (event) => {
  console.error('WebSocket 错误:', event);
};

// 初始化连接
wsClient.connect();

// 发送消息
wsClient.send('Hello, Server!');

// 关闭websocket连接
wsClient.close();