// 检查当前浏览器是否支持Wake Lock API
const isWakeLockSupported = 'wakeLock' in navigator && 'request' in navigator.wakeLock;

// 请求屏幕保持唤醒状态
let wakeLock = null;

const requestScreenWakeLock = async () => {
  if (!isWakeLockSupported) {
    console.error('当前浏览器不支持屏幕唤醒锁定。');
    return;
  }
  
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('屏幕保持唤醒状态成功！');
  } catch (err) {
    console.error(`错误：${err.name}, 消息：${err.message}`);
  }
};

// 释放屏幕唤醒锁
const releaseScreenWakeLock = async () => {
  if (wakeLock && typeof wakeLock.release === 'function') {
    await wakeLock.release();
    wakeLock = null;
    console.log('屏幕唤醒锁已释放');
  }
};

// 监听唤醒锁的释放
const addWakeLockReleaseListener = () => {
  if (wakeLock && typeof wakeLock.addEventListener === 'function') {
    wakeLock.addEventListener('release', () => {
      console.log('屏幕唤醒锁已被释放');
    });
  }
};

// 在文档的可见性发生变化时重新获取唤醒锁
const handleVisibilityChange = async () => {
  if (document.visibilityState === 'visible' && !wakeLock) {
    await requestScreenWakeLock();
  }
};

// 初始化：请求屏幕唤醒锁、添加释放监听和处理文档可见性变化
document.addEventListener('DOMContentLoaded', async () => {
  await requestScreenWakeLock();
  addWakeLockReleaseListener();
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

// 清理：移除监听器和释放唤醒锁
const cleanup = async () => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  await releaseScreenWakeLock();
};

// 假设存在一个合适的时机来调用cleanup函数，例如在单页面应用的组件卸载时
// cleanup();