/**
 * @file dcDailyQuote.js
 * @description 每日一言工具类 - 每天展示一句《千字文》并支持语音朗读
 * @author DC.js Team
 * @version 1.0.0
 */

'use strict'

/**
 * 每日一言工具类
 * @class DailyQuote
 */
class DailyQuote {
  /**
   * 构造函数
   * @param {Object} options 配置选项
   * @param {HTMLElement|string} options.container 容器元素或选择器
   * @param {string} options.language 朗读语言 ('zh-CN', 'zh-TW')
   * @param {number} options.rate 朗读语速 (0.1-10)
   * @param {number} options.pitch 音调 (0-2)
   * @param {boolean} options.autoPlay 是否自动朗读
   * @param {Function} options.onQuoteChange 语句切换回调
   * @param {Function} options.onError 错误回调
   */
  constructor(options = {}) {
    this.options = {
      container: null,
      language: 'zh-CN',
      rate: 1,
      pitch: 1,
      autoPlay: false,
      onQuoteChange: null,
      onError: null,
      ...options,
    }

    // 千字文全文内容
    this.quotes = [
      '天地玄黄，宇宙洪荒。',
      '日月盈昃，辰宿列张。',
      '寒来暑往，秋收冬藏。',
      '闰余成岁，律吕调阳。',
      '云腾致雨，露结为霜。',
      '金生丽水，玉出昆冈。',
      '剑号巨阙，珠称夜光。',
      '果珍李柰，菜重芥姜。',
      '海咸河淡，鳞潜羽翔。',
      '龙师火帝，鸟官人皇。',
      '始制文字，乃服衣裳。',
      '推位让国，有虞陶唐。',
      '吊民伐罪，周发殷汤。',
      '坐朝问道，垂拱平章。',
      '爱育黎首，臣伏戎羌。',
      '遐迩一体，率宾归王。',
      '鸣凤在竹，白驹食场。',
      '化被草木，赖及万方。',
      '盖此身发，四大五常。',
      '恭惟鞠养，岂敢毁伤。',
      '女慕贞洁，男效才良。',
      '知过必改，得能莫忘。',
      '罔谈彼短，靡恃己长。',
      '信使可覆，器欲难量。',
      '墨悲丝染，诗赞羔羊。',
      '景行维贤，克念作圣。',
      '德建名立，形端表正。',
      '空谷传声，虚堂习听。',
      '祸因恶积，福缘善庆。',
      '尺璧非宝，寸阴是竞。',
      '资父事君，曰严与敬。',
      '孝当竭力，忠则尽命。',
      '临深履薄，夙兴温凊。',
      '似兰斯馨，如松之盛。',
      '川流不息，渊澄取映。',
      '容止若思，言辞安定。',
      '笃初诚美，慎终宜令。',
      '荣业所基，籍甚无竟。',
      '学优登仕，摄职从政。',
      '存以甘棠，去而益咏。',
      '乐殊贵贱，礼别尊卑。',
      '上和下睦，夫唱妇随。',
      '外受傅训，入奉母仪。',
      '诸姑伯叔，犹子比儿。',
      '孔怀兄弟，同气连枝。',
      '交友投分，切磨箴规。',
      '仁慈隐恻，造次弗离。',
      '节义廉退，颠沛匪亏。',
      '性静情逸，心动神疲。',
      '守真志满，逐物意移。',
      '坚持雅操，好爵自縻。',
      '都邑华夏，东西二京。',
      '背邙面洛，浮渭据泾。',
      '宫殿盘郁，楼观飞惊。',
      '图写禽兽，画彩仙灵。',
      '丙舍旁启，甲帐对楹。',
      '肆筵设席，鼓瑟吹笙。',
      '升阶纳陛，弁转疑星。',
      '右通广内，左达承明。',
      '既集坟典，亦聚群英。',
      '杜稿钟隶，漆书壁经。',
      '府罗将相，路侠槐卿。',
      '户封八县，家给千兵。',
      '高冠陪辇，驱毂振缨。',
      '世禄侈富，车驾肥轻。',
      '策功茂实，勒碑刻铭。',
      '磻溪伊尹，佐时阿衡。',
      '奄宅曲阜，微旦孰营。',
      '桓公匡合，济弱扶倾。',
      '绮回汉惠，说感武丁。',
      '俊乂密勿，多士寔宁。',
      '晋楚更霸，赵魏困横。',
      '假途灭虢，践土会盟。',
      '何遵约法，韩弊烦刑。',
      '起翦颇牧，用军最精。',
      '宣威沙漠，驰誉丹青。',
      '九州禹迹，百郡秦并。',
      '岳宗泰岱，禅主云亭。',
      '雁门紫塞，鸡田赤城。',
      '昆池碣石，巨野洞庭。',
      '旷远绵邈，岩岫杳冥。',
      '治本于农，务兹稼穑。',
      '俶载南亩，我艺黍稷。',
      '税熟贡新，劝赏黜陟。',
      '孟轲敦素，史鱼秉直。',
      '庶几中庸，劳谦谨敕。',
      '聆音察理，鉴貌辨色。',
      '贻厥嘉猷，勉其祗植。',
      '省躬讥诫，宠增抗极。',
      '殆辱近耻，林皋幸即。',
      '两疏见机，解组谁逼。',
      '索居闲处，沉默寂寥。',
      '求古寻论，散虑逍遥。',
      '欣奏累遣，戚谢欢招。',
      '渠荷的历，园莽抽条。',
      '枇杷晚翠，梧桐蚤凋。',
      '陈根委翳，落叶飘摇。',
      '游鹍独运，凌摩绛霄。',
      '耽读玩市，寓目囊箱。',
      '易輶攸畏，属耳垣墙。',
      '具膳餐饭，适口充肠。',
      '饱饫烹宰，饥厌糟糠。',
      '亲戚故旧，老少异粮。',
      '妾御绩纺，侍巾帷房。',
      '纨扇圆絜，银烛炜煌。',
      '昼眠夕寐，蓝笋象床。',
      '弦歌酒宴，接杯举觞。',
      '矫手顿足，悦豫且康。',
      '嫡后嗣续，祭祀烝尝。',
      '稽颡再拜，悚惧恐惶。',
      '笺牒简要，顾答审详。',
      '骸垢想浴，执热愿凉。',
      '驴骡犊特，骇跃超骧。',
      '诛斩贼盗，捕获叛亡。',
      '布射僚丸，嵇琴阮啸。',
      '恬笔伦纸，钧巧任钓。',
      '释纷利俗，竝皆佳妙。',
      '毛施淑姿，工颦妍笑。',
      '年矢每催，曦晖朗曜。',
      '璇玑悬斡，晦魄环照。',
      '指薪修祜，永绥吉劭。',
      '矩步引领，俯仰廊庙。',
      '束带矜庄，徘徊瞻眺。',
      '孤陋寡闻，愚蒙等诮。',
      '谓语助者，焉哉乎也。',
    ]

    this.currentIndex = 0
    this.speechSynthesis = window.speechSynthesis || null
    this.currentUtterance = null

    // 初始化
    this._init()
  }

  /**
   * 初始化方法
   * @private
   */
  _init() {
    try {
      // 获取今日索引
      this.currentIndex = this._getTodayIndex()

      // 创建DOM结构
      if (this.options.container) {
        this._render()
      }

      // 自动播放
      if (this.options.autoPlay && this.speechSynthesis) {
        setTimeout(() => this.speak(), 1000)
      }
    } catch (error) {
      this._handleError('初始化失败', error)
    }
  }

  /**
   * 获取今日对应的语句索引
   * @private
   * @returns {number} 索引值
   */
  _getTodayIndex() {
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const dayOfYear = Math.floor((today - startOfYear) / (24 * 60 * 60 * 1000))
    return dayOfYear % this.quotes.length
  }

  /**
   * 渲染DOM结构
   * @private
   */
  _render() {
    const container = typeof this.options.container === 'string' ? document.querySelector(this.options.container) : this.options.container

    if (!container) {
      throw new Error('容器元素未找到')
    }

    container.innerHTML = `
      <div class="dc-daily-quote">
        <div class="quote-content">${this.getCurrentQuote()}</div>
        <div class="quote-info">
          <span class="quote-index">第 ${this.currentIndex + 1} 句</span>
          <span class="quote-total">共 ${this.quotes.length} 句</span>
        </div>
        <div class="quote-controls">
          <button class="quote-btn quote-prev" title="上一句">◀</button>
          <button class="quote-btn quote-play" title="朗读">🔊</button>
          <button class="quote-btn quote-next" title="下一句">▶</button>
        </div>
      </div>
    `

    // 绑定事件
    this._bindEvents(container)
  }

  /**
   * 绑定事件监听器
   * @private
   * @param {HTMLElement} container 容器元素
   */
  _bindEvents(container) {
    const prevBtn = container.querySelector('.quote-prev')
    const playBtn = container.querySelector('.quote-play')
    const nextBtn = container.querySelector('.quote-next')

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previous())
    }

    if (playBtn) {
      playBtn.addEventListener('click', () => this.speak())
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next())
    }
  }

  /**
   * 获取当前语句
   * @returns {string} 当前语句内容
   */
  getCurrentQuote() {
    return this.quotes[this.currentIndex]
  }

  /**
   * 获取当前索引
   * @returns {number} 当前索引
   */
  getCurrentIndex() {
    return this.currentIndex
  }

  /**
   * 切换到下一句
   */
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.quotes.length
    this._updateDisplay()
    this._triggerCallback()
  }

  /**
   * 切换到上一句
   */
  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.quotes.length) % this.quotes.length
    this._updateDisplay()
    this._triggerCallback()
  }

  /**
   * 更新显示内容
   * @private
   */
  _updateDisplay() {
    const container = typeof this.options.container === 'string' ? document.querySelector(this.options.container) : this.options.container

    if (container) {
      const contentEl = container.querySelector('.quote-content')
      const indexEl = container.querySelector('.quote-index')

      if (contentEl) {
        contentEl.textContent = this.getCurrentQuote()
      }
      if (indexEl) {
        indexEl.textContent = `第 ${this.currentIndex + 1} 句`
      }
    }
  }

  /**
   * 触发回调函数
   * @private
   */
  _triggerCallback() {
    if (typeof this.options.onQuoteChange === 'function') {
      this.options.onQuoteChange({
        index: this.currentIndex,
        quote: this.getCurrentQuote(),
        total: this.quotes.length,
      })
    }
  }

  /**
   * 朗读当前语句
   */
  speak() {
    if (!this.speechSynthesis) {
      this._handleError('浏览器不支持语音合成')
      return
    }

    // 停止当前朗读
    this.stop()

    try {
      const utterance = new SpeechSynthesisUtterance(this.getCurrentQuote())
      utterance.lang = this.options.language
      utterance.rate = this.options.rate
      utterance.pitch = this.options.pitch

      utterance.onend = () => {
        this.currentUtterance = null
      }

      utterance.onerror = event => {
        this._handleError('朗读出错', event.error)
      }

      this.currentUtterance = utterance
      this.speechSynthesis.speak(utterance)
    } catch (error) {
      this._handleError('朗读失败', error)
    }
  }

  /**
   * 停止朗读
   */
  stop() {
    if (this.speechSynthesis && this.currentUtterance) {
      this.speechSynthesis.cancel()
      this.currentUtterance = null
    }
  }

  /**
   * 暂停朗读
   */
  pause() {
    if (this.speechSynthesis) {
      this.speechSynthesis.pause()
    }
  }

  /**
   * 恢复朗读
   */
  resume() {
    if (this.speechSynthesis) {
      this.speechSynthesis.resume()
    }
  }

  /**
   * 设置朗读语言
   * @param {string} language 语言代码
   */
  setLanguage(language) {
    this.options.language = language
  }

  /**
   * 设置朗读语速
   * @param {number} rate 语速 (0.1-10)
   */
  setRate(rate) {
    this.options.rate = Math.max(0.1, Math.min(10, rate))
  }

  /**
   * 设置音调
   * @param {number} pitch 音调 (0-2)
   */
  setPitch(pitch) {
    this.options.pitch = Math.max(0, Math.min(2, pitch))
  }

  /**
   * 获取可用的语音列表
   * @returns {Array} 语音对象数组
   */
  getVoices() {
    return this.speechSynthesis ? this.speechSynthesis.getVoices() : []
  }

  /**
   * 设置特定语音
   * @param {string} voiceName 语音名称
   */
  setVoice(voiceName) {
    if (!this.speechSynthesis) return

    const voices = this.getVoices()
    const targetVoice = voices.find(voice => voice.name === voiceName)

    if (targetVoice && this.currentUtterance) {
      this.currentUtterance.voice = targetVoice
    }
  }

  /**
   * 处理错误
   * @private
   * @param {string} message 错误信息
   * @param {any} error 错误对象
   */
  _handleError(message, error = null) {
    console.error('[DailyQuote]', message, error)

    if (typeof this.options.onError === 'function') {
      this.options.onError({ message, error })
    }
  }

  /**
   * 销毁实例
   */
  destroy() {
    this.stop()

    const container = typeof this.options.container === 'string' ? document.querySelector(this.options.container) : this.options.container

    if (container) {
      container.innerHTML = ''
    }

    this.options = null
    this.quotes = null
    this.currentIndex = 0
  }
}

// 添加默认样式
const defaultStyles = `
  <style>
  .dc-daily-quote {
    font-family: 'Microsoft YaHei', 'SimHei', sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }

  .quote-content {
    font-size: 24px;
    text-align: center;
    margin-bottom: 15px;
    line-height: 1.6;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }

  .quote-info {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 20px;
  }

  .quote-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .quote-btn {
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 10px 15px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .quote-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  .quote-btn:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .dc-daily-quote {
      padding: 15px;
      margin: 10px;
    }

    .quote-content {
      font-size: 20px;
    }

    .quote-btn {
      width: 40px;
      height: 40px;
      padding: 8px 12px;
      font-size: 14px;
    }
  }
  </style>
`

// 注入默认样式
if (typeof document !== 'undefined' && !document.querySelector('#dc-daily-quote-styles')) {
  const styleElement = document.createElement('div')
  styleElement.id = 'dc-daily-quote-styles'
  styleElement.innerHTML = defaultStyles
  document.head.appendChild(styleElement)
}

// 注册到全局DC对象
if (typeof window !== 'undefined') {
  window.DC = window.DC || {}
  window.DC.DailyQuote = DailyQuote
}

// CommonJS 模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DailyQuote
}
