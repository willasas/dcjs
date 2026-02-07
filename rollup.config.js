import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js', // 入口文件
  output: {
    file: 'dist/dc.js', // 输出文件
    format: 'iife', // 立即执行函数表达式，适合浏览器环境
    name: 'DC', // 全局变量名
    sourcemap: false // 关闭源码映射
  },
  plugins: [
    terser() // 压缩代码
  ]
};
