import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist', // 输出目录
    lib: {
      entry: 'src/index.js', // 入口文件
      name: 'DC', // 全局变量名
      formats: ['iife'], // 立即执行函数表达式，适合浏览器环境
      fileName: 'dc', // 输出文件名
    },
    minify: true, // 压缩代码
  },
})
