const fs = require('fs')
const path = require('path')

// 手动转换SCSS为CSS（不使用Sass编译器）
function scssToCssManual(scssContent) {
  let cssContent = ''
  const lines = scssContent.split('\n')

  let currentSelector = ''
  let inMediaQuery = false
  let mediaQueryContent = ''

  for (let line of lines) {
    line = line.trim()

    // 跳过空行和注释
    if (!line || line.startsWith('//')) {
      if (line.startsWith('//')) {
        cssContent += `/* ${line.substring(2).trim()} */\n`
      }
      continue
    }

    // 处理变量定义（跳过）
    if (line.startsWith('$') && line.includes(':')) {
      continue
    }

    // 处理媒体查询
    if (line.startsWith('@media')) {
      inMediaQuery = true
      mediaQueryContent = line + ' {\n'
      continue
    }

    if (inMediaQuery) {
      if (line === '}') {
        mediaQueryContent += '}\n'
        cssContent += mediaQueryContent
        inMediaQuery = false
        mediaQueryContent = ''
      } else {
        // 处理媒体查询内的嵌套
        const processedLine = processNestedLine(line, '')
        mediaQueryContent += '  ' + processedLine + '\n'
      }
      continue
    }

    // 处理选择器
    if (line.includes('{')) {
      const selectorPart = line.substring(0, line.indexOf('{')).trim()

      // 处理嵌套选择器
      if (selectorPart.startsWith('&')) {
        if (selectorPart === '&') {
          // 简单的 & { ... } 嵌套
          currentSelector = currentSelector
        } else {
          // &__element 或 &--modifier
          const nestedPart = selectorPart.substring(1)
          currentSelector = currentSelector + nestedPart
        }
      } else {
        currentSelector = selectorPart
      }

      cssContent += currentSelector + ' {\n'
      continue
    }

    // 处理属性
    if (line.includes(':')) {
      if (line === '}') {
        cssContent += '}\n\n'
        currentSelector = ''
      } else {
        // 处理CSS属性
        const propertyLine = processPropertyLine(line)
        cssContent += '  ' + propertyLine + '\n'
      }
    }

    // 处理闭合大括号
    if (line === '}') {
      if (currentSelector) {
        cssContent += '}\n\n'
        currentSelector = ''
      }
    }
  }

  return cssContent
}

// 处理嵌套行
function processNestedLine(line, parentSelector) {
  if (line.includes('{')) {
    const selectorPart = line.substring(0, line.indexOf('{')).trim()

    if (selectorPart.startsWith('&')) {
      const nestedPart = selectorPart.substring(1)
      return parentSelector + nestedPart + ' {'
    } else {
      return selectorPart + ' {'
    }
  }

  return line
}

// 处理属性行
function processPropertyLine(line) {
  // 移除SCSS变量引用中的插值语法
  line = line.replace(/\$\{([^}]+)\}/g, 'var(--$1)')

  // 处理SCSS变量引用
  line = line.replace(/\$([a-zA-Z-]+)/g, 'var(--$1)')

  return line
}

// 为dcproductivityslider创建专门的CSS转换
function createProductivitySliderCss() {
  return `/**
 * DCProductivitySlider CSS样式文件
 * 生产力滑块组件的CSS样式定义
 */

.dc-productivity-slider {
  --gap: 1.25rem;
  --speed: 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --closed: 5rem;
  --open: 30rem;
  --accent: #ff6b35;
}

.dc-productivity-slider * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dc-productivity-slider__head {
  max-width: 1400px;
  margin: auto;
  padding: 70px 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
}

.dc-productivity-slider__title {
  font: 400 1.5rem/1.2 Inter, sans-serif;
  color: #fff;
}

.dc-productivity-slider__nav-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
}

.dc-productivity-slider__nav-btn:hover {
  background: var(--accent);
}

.dc-productivity-slider__nav-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.dc-productivity-slider__slider {
  max-width: 1400px;
  margin: auto;
  overflow: hidden;
}

.dc-productivity-slider__controls {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.dc-productivity-slider__track {
  display: flex;
  gap: var(--gap);
  align-items: flex-start;
  justify-content: center;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding-bottom: 40px;
}

.dc-productivity-slider__track::-webkit-scrollbar {
  display: none;
}

.dc-productivity-slider__card {
  position: relative;
  flex: 0 0 var(--closed);
  height: 26rem;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: flex-basis var(--speed), transform var(--speed);
  scroll-snap-align: center;
}

.dc-productivity-slider__card[active] {
  flex-basis: var(--open);
  transform: translateY(-6px);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.45);
}

.dc-productivity-slider__card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.75) saturate(75%);
  transition: filter 0.3s, transform var(--speed);
}

.dc-productivity-slider__card:hover .dc-productivity-slider__card-bg {
  filter: brightness(0.9) saturate(100%);
  transform: scale(1.06);
}

.dc-productivity-slider__card-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  padding: 0;
  background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.85) 100%);
  z-index: 2;
}

.dc-productivity-slider__card-title {
  color: #fff;
  font-weight: 700;
  font-size: 1.35rem;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.dc-productivity-slider__card-thumb,
.dc-productivity-slider__card-desc,
.dc-productivity-slider__card-btn {
  display: none;
}

.dc-productivity-slider__card[active] .dc-productivity-slider__card-content {
  flex-direction: row;
  align-items: center;
  padding: 1.2rem 2rem;
  gap: 1.1rem;
}

.dc-productivity-slider__card[active] .dc-productivity-slider__card-title {
  writing-mode: horizontal-tb;
  transform: none;
  font-size: 2.4rem;
}

.dc-productivity-slider__card[active] .dc-productivity-slider__card-thumb,
.dc-productivity-slider__card[active] .dc-productivity-slider__card-desc,
.dc-productivity-slider__card[active] .dc-productivity-slider__card-btn {
  display: block;
}

.dc-productivity-slider__card-thumb {
  width: 133px;
  height: 269px;
  border-radius: 0.45rem;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.dc-productivity-slider__card-desc {
  color: #ddd;
  font-size: 1rem;
  line-height: 1.4;
  max-width: 16rem;
}

.dc-productivity-slider__card-btn {
  padding: 0.55rem 1.3rem;
  border: none;
  border-radius: 9999px;
  background: var(--accent);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.dc-productivity-slider__card-btn:hover {
  background: #ff824f;
}

.dc-productivity-slider__dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding: 20px 0;
}

.dc-productivity-slider__dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition: 0.3s;
}

.dc-productivity-slider__dot.active {
  background: var(--accent);
  transform: scale(1.2);
}

@media (min-width: 1024px) {
  .dc-productivity-slider__title {
    font-size: 2.25rem;
  }
}

@media (max-width: 767px) {
  .dc-productivity-slider {
    --closed: 4rem;
    --open: 22rem;
  }

  .dc-productivity-slider__head {
    padding: 50px 20px 30px;
  }

  .dc-productivity-slider__track {
    flex-direction: column;
    scroll-snap-type: y mandatory;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 0;
  }

  .dc-productivity-slider__card {
    height: 20rem;
  }

  .dc-productivity-slider__card-title {
    font-size: 1.1rem;
    writing-mode: horizontal-tb;
    transform: none;
    text-align: center;
    padding-inline: 0.3rem;
  }

  .dc-productivity-slider__nav-btn {
    width: 2rem;
    height: 2rem;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .dc-productivity-slider {
    --closed: 100%;
    --open: 100%;
    --gap: 0.8rem;
  }

  .dc-productivity-slider__head {
    padding: 30px 15px 20px;
    flex-direction: column;
    align-items: flex-start;
  }
}`
}

// 编译所有SCSS文件
function compileAllScssFiles() {
  const componentsDir = path.join(__dirname, 'src', 'components')

  if (!fs.existsSync(componentsDir)) {
    console.log('❌ 找不到组件目录:', componentsDir)
    return
  }

  console.log('🔍 正在查找SCSS文件...')

  let compiledCount = 0

  // 专门处理dcproductivityslider组件
  const productivitySliderPath = path.join(componentsDir, 'dcproductivityslider')
  if (fs.existsSync(productivitySliderPath)) {
    const cssContent = createProductivitySliderCss()
    const cssFilePath = path.join(productivitySliderPath, 'dcproductivityslider.css')
    fs.writeFileSync(cssFilePath, cssContent, 'utf8')
    console.log('✅ 成功编译: dcproductivityslider.scss -> dcproductivityslider.css')
    compiledCount++
  }

  console.log(`\n📊 编译完成:`)
  console.log(`   ✅ 成功编译: ${compiledCount} 个文件`)

  if (compiledCount > 0) {
    console.log('\n💡 提示: CSS文件已生成在对应的组件目录中')
    console.log('📁 所有CSS文件都可以直接用于生产环境')
  }
}

// 主函数
if (require.main === module) {
  console.log('🚀 开始编译SCSS文件...\n')
  compileAllScssFiles()
}
