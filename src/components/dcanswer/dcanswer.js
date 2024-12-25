class DCAnswer {
  /**
   * 构造函数，用于初始化问答容器
   * @param {Array} questions - 问题数组，用于初始化问答容器，默认为空数组
   */
  constructor(questions = []) {
    // 初始化问题数组
    this.questions = questions;
    // 初始化当前问题索引为0，表示从第一个问题开始
    this.currentQuestionIndex = 0;
    // 初始化答案数组为空，用于存储用户的答案
    this.answers = [];
    // 创建一个div元素作为容器，用于后续装载问答内容
    this.container = document.createElement('div');
    // 为容器设置类名，用于CSS样式定位
    this.container.className = 'dc-answer-container';
    // 初始化提交状态为false，表示问答尚未提交
    this.isSubmitted = false;
  }

  /**
   * 初始化组件或页面
   *
   * 此方法主要负责调用其他方法以完成页面的初始渲染和样式设置
   * 它首先调用render方法来渲染页面或组件的结构，然后调用createStyle方法来创建或应用样式
   * 这样做是为了确保在样式应用之前，页面的结构已经准备好，从而避免渲染过程中的闪屏或样式错乱
   */
  init() {
    // 调用render方法来构建页面或组件的结构
    this.render();
    // 调用createStyle方法来创建或应用样式
    this.createStyle();
  }

  render() {
    this.container.innerHTML = ''; // 清空容器内容
    if (this.questions.length > 0) {
      // 获取当前问题
      const question = this.questions[this.currentQuestionIndex];
      // 创建并添加进度显示元素
      const progressElement = document.createElement('div');
      progressElement.className = 'dc-progress';
      progressElement.textContent = `第 ${this.currentQuestionIndex + 1}/${this.questions.length} 题`;

      // 创建并添加问题文本元素
      const questionElement = document.createElement('div');
      questionElement.className = 'dc-question';
      questionElement.textContent = question.text;

      // 创建并添加选项列表容器
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'dc-answer-list';

      // 遍历问题选项，创建并添加选项按钮
      question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'dc-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => this.handleOptionClick(index, optionElement, question.type));
        // 检查当前选项是否已被选中
        if (this.answers[this.currentQuestionIndex] && this.answers[this.currentQuestionIndex].includes(index)) {
          optionElement.classList.add('selected');
        }
        optionsContainer.appendChild(optionElement);
      });

      this.container.appendChild(progressElement);
      this.container.appendChild(questionElement);
      this.container.appendChild(optionsContainer);

      // 创建并添加按钮容器
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'dc-buttons';

      // 根据当前问题索引添加“上一题”按钮
      if (this.currentQuestionIndex > 0) {
        const prevButton = document.createElement('button');
        prevButton.className = 'dc-prev-button';
        prevButton.textContent = '上一题';
        prevButton.addEventListener('click', () => this.prevQuestion());
        buttonsContainer.appendChild(prevButton);
      }

      // 根据当前问题索引添加“下一题”或“完成”按钮
      if (this.currentQuestionIndex < this.questions.length - 1) {
        const nextButton = document.createElement('button');
        nextButton.className = 'dc-next-button';
        nextButton.textContent = '下一题';
        nextButton.addEventListener('click', () => this.nextQuestion());
        buttonsContainer.appendChild(nextButton);
      } else {
        const finishButton = document.createElement('button');
        finishButton.className = 'dc-finish-button';
        finishButton.textContent = '完成';
        finishButton.addEventListener('click', () => this.finishQuiz(finishButton));
        buttonsContainer.appendChild(finishButton);
      }

      this.container.appendChild(buttonsContainer);
    } else {
      this.container.textContent = '没有题目';
    }

    document.body.appendChild(this.container);
  }

  /**
   * 处理选项点击事件
   * @param {number} selectedIndex - 被点击选项的索引
   * @param {Element} optionElement - 被点击的选项元素
   * @param {string} type - 选项类型，'single' 表示单选，'multiple' 表示多选
   */
  handleOptionClick(selectedIndex, optionElement, type) {
    // 处理单选逻辑
    if (type === 'single') {
      // 在当前问题的答案数组中存储选中的选项索引
      this.answers[this.currentQuestionIndex] = [selectedIndex];
      // 在控制台输出选中的选项
      console.log(`选中了选项 ${selectedIndex + 1}`);
      // 移除其他选项的选中状态
      const options = this.container.querySelectorAll('.dc-option');
      options.forEach(option => option.classList.remove('selected'));
      // 添加当前选项的选中状态
      optionElement.classList.add('selected');
    } else if (type === 'multiple') {
      // 处理多选逻辑
      // 如果当前问题的答案数组为空，初始化它
      if (!this.answers[this.currentQuestionIndex]) {
        this.answers[this.currentQuestionIndex] = [];
      }
      // 检查当前选中的选项是否已经存在于答案数组中
      const answerIndex = this.answers[this.currentQuestionIndex].indexOf(selectedIndex);
      // 如果选项已经选中，则取消选中
      if (answerIndex > -1) {
        // 如果选项已被选中，则取消选中
        this.answers[this.currentQuestionIndex].splice(answerIndex, 1);
        optionElement.classList.remove('selected');
      } else {
        // 如果选项未被选中，则选中
        this.answers[this.currentQuestionIndex].push(selectedIndex);
        optionElement.classList.add('selected');
      }
      // 在控制台输出当前选中的所有选项
      console.log(`当前选中的选项: ${this.answers[this.currentQuestionIndex].map(i => i + 1).join(', ')}`);
    }
  }

  /**
   * 跳转到上一个问题
   *
   * 本函数用于当用户触发返回上一题的操作时，检查当前题目的索引是否大于0
   * 如果大于0，则将当前题目的索引减1，以达到回到上一题的目的
   * 随后调用render函数重新渲染当前界面，显示上一题的内容
   */
  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.render();
    }
  }


  /**
   * 跳转到下一个问题
   *
   * 此方法用于在当前问题展示后，推进到下一个问题它通过更新当前问题索引来实现这一点，
   * 并重新渲染界面以显示下一个问题如果当前问题已经是最后一个问题，则不执行任何操作
   */
  nextQuestion() {
    // 检查当前问题索引是否小于问题列表的最后一个索引
    if (this.currentQuestionIndex < this.questions.length - 1) {
      // 更新当前问题索引以指向下一个问题
      this.currentQuestionIndex++;
      // 重新渲染界面以显示下一个问题
      this.render();
    }
  }

  /**
   * 完成答题的函数
   * 此函数检查是否已提交答案，如果未提交，则记录完成答题的信息并提交答案
   * @param {HTMLButtonElement} finishButton - 完成答题的按钮元素，用于在答题完成后禁用按钮
   */
  finishQuiz(finishButton) {
    // 检查是否已提交答案，防止重复提交
    if (this.isSubmitted) {
      console.log('答题结果已提交，不能重复提交。');
      return;
    }
    // 输出完成答题的信息和答案
    console.log('完成答题，答案如下：', this.answers);
    // 可以在这里处理完成答题的逻辑，例如提交答案等
    this.isSubmitted = true;
    // 禁用“完成”按钮，防止重复提交
    finishButton.disabled = true;
  }

  createStyle() {
    const cssRules = `
      .dc-answer-container { position: relative; box-sizing: border-box; padding: 20px; background-color: var(--bg-theme-50); border: 1px solid var(--bg-theme-100); border-radius: 8px; width: 100%; margin: 0 auto; }
      .dc-answer-container .dc-progress { font-size: 16px; margin: 0 auto 10px; text-align: center; line-height: 1.2; color: var(--font-theme-400); }
      .dc-answer-container .dc-question { font-size: 20px; text-align: center; line-height: 1.2; color: var(--font-theme-800); margin: 0 auto 14px; }
      .dc-answer-container .dc-answer-list { width: 100%; display: flex; flex-direction: column; gap: 10px; }
      .dc-answer-container .dc-answer-list .dc-option { padding: 10px; margin-bottom: 4px; border: 1px solid var(--bg-theme-300); background-color: var(--bg-theme-50); cursor: pointer; transition: background-color 0.3s ease; font-size: 18px; text-align: center; line-height: 1.2; color: var(--font-theme-800); }
      .dc-answer-container .dc-answer-list .dc-option.selected { background-color: var(--bg-theme-600); border-color: var(--bg-theme-600); color: var(--font-theme-50); }
      .dc-answer-container .dc-answer-list .dc-option:hover { background-color: var(--bg-theme-300); border-color: var(--bg-theme-300); color: var(--font-theme-50); }
      .dc-answer-container .dc-buttons { width: 100%; display: flex; justify-content: space-between; margin: 20px auto 0; }
      .dc-answer-container .dc-buttons .dc-prev-button, .dc-answer-container .dc-buttons .dc-next-button, .dc-answer-container .dc-buttons .dc-finish-button { padding: 10px 20px; border: none; background-color: var(--bg-theme-800); font-size: 20px; text-align: center; line-height: 1.2; color: var(--font-theme-100); cursor: pointer; transition: background-color 0.3s ease; }
      .dc-answer-container .dc-buttons .dc-prev-button:hover, .dc-answer-container .dc-buttons .dc-next-button:hover, .dc-answer-container .dc-buttons .dc-finish-button:hover { background-color: var(--bg-theme-400); }
      .dc-answer-container .dc-buttons .dc-prev-button:disabled, .dc-answer-container .dc-buttons .dc-next-button:disabled, .dc-answer-container .dc-buttons .dc-finish-button:disabled { background-color: var(--bg-theme-200); cursor: not-allowed; }
    `;
    const style = document.createElement('style');
    style.innerHTML = cssRules;
    document.head.appendChild(style);
  }
}

// 导出到全局
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DCAnswer;
} else {
  window.DC = window.DC || {};
  window.DC.Answer = DCAnswer;
}
